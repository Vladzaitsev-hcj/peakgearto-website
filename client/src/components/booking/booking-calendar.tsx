import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Truck, MapPin } from "lucide-react";
import { addDays, differenceInDays, format } from "date-fns";
import type { Product } from "@shared/schema";

interface BookingCalendarProps {
  product: Product;
}

export default function BookingCalendar({ product }: BookingCalendarProps) {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [deliveryOption, setDeliveryOption] = useState<string>('pickup');
  const [notes, setNotes] = useState('');

  // Restore booking state from session storage when component loads
  useEffect(() => {
    const savedBookingState = sessionStorage.getItem('bookingState');
    if (savedBookingState) {
      try {
        const { startDate: savedStartDate, endDate: savedEndDate, deliveryOption: savedDelivery, notes: savedNotes, productId } = JSON.parse(savedBookingState);
        
        // Only restore if it's for the same product
        if (productId === product.id) {
          if (savedStartDate) setStartDate(new Date(savedStartDate));
          if (savedEndDate) setEndDate(new Date(savedEndDate));
          if (savedDelivery) setDeliveryOption(savedDelivery);
          if (savedNotes) setNotes(savedNotes);
          
          // Clear the saved state after restoring
          sessionStorage.removeItem('bookingState');
        }
      } catch (error) {
        console.log('Error restoring booking state:', error);
      }
    }
  }, [product.id]);

  // Helper function to save current booking state
  const saveBookingState = () => {
    const bookingState = {
      productId: product.id,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      deliveryOption,
      notes
    };
    sessionStorage.setItem('bookingState', JSON.stringify(bookingState));
  };

  // Check waiver status
  const { data: waiverStatus } = useQuery({
    queryKey: ["/api/waivers/check"],
    enabled: isAuthenticated,
  });

  const createBookingMutation = useMutation({
    mutationFn: async (bookingData: any) => {
      await apiRequest("POST", "/api/bookings", bookingData);
    },
    onSuccess: () => {
      toast({
        title: "Booking Created!",
        description: "Your rental has been booked successfully. You'll receive a confirmation email shortly.",
      });
      // Reset form
      setStartDate(undefined);
      setEndDate(undefined);
      setDeliveryOption('pickup');
      setNotes('');
      // Invalidate bookings cache
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          // Store the current booking state and page URL to redirect back after login
          saveBookingState();
          sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
          window.location.href = "/auth";
        }, 500);
        return;
      }
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const signWaiverMutation = useMutation({
    mutationFn: async () => {
      const waiverContent = `
EQUIPMENT RENTAL WAIVER AND RELEASE OF LIABILITY

I, the undersigned, acknowledge that I am renting equipment from Peak Gear TO and agree to the following terms:

1. I accept full responsibility for the rented equipment and will return it in the same condition.
2. I agree to pay for any damage or loss of the equipment.
3. I release Peak Gear TO from any liability for injury or damage resulting from the use of this equipment.
4. I confirm that I am over 18 years of age and legally able to enter into this agreement.

By digitally signing below, I acknowledge that I have read and understand this waiver.
      `;
      
      await apiRequest("POST", "/api/waivers", {
        waiverContent,
      });
    },
    onSuccess: () => {
      toast({
        title: "Waiver Signed",
        description: "Thank you for signing the waiver. You can now proceed with your booking.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/waivers/check"] });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    },
    onError: (error) => {
      toast({
        title: "Waiver Error",
        description: "Failed to sign waiver. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deliveryOptions = [
    { value: 'pickup', label: 'Pickup in Brampton (Free)', fee: 0 },
    { value: 'standard_delivery', label: 'Standard Delivery (within 20km)', fee: 49.99 },
    { value: 'extended_delivery', label: 'Extended Delivery (20-50km)', fee: 89.99 },
  ];

  const selectedDeliveryOption = deliveryOptions.find(option => option.value === deliveryOption);
  const days = startDate && endDate ? differenceInDays(endDate, startDate) + 1 : 0;
  const dailyCost = days * parseFloat(product.dailyRate);
  const deliveryFee = selectedDeliveryOption?.fee || 0;
  const securityDeposit = parseFloat(product.securityDeposit);
  const totalCost = dailyCost + deliveryFee + securityDeposit;

  const handleBooking = () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in Required",
        description: "Please sign in to make a booking.",
        variant: "destructive",
      });
      setTimeout(() => {
        // Store the current booking state and page URL to redirect back after login
        saveBookingState();
        sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
        window.location.href = "/auth";
      }, 500);
      return;
    }

    if (!waiverStatus || !(waiverStatus as any)?.signed) {
      toast({
        title: "Waiver Required",
        description: "Please sign the waiver before making a booking.",
        variant: "destructive",
      });
      return;
    }

    if (!startDate || !endDate) {
      toast({
        title: "Dates Required",
        description: "Please select your rental dates.",
        variant: "destructive",
      });
      return;
    }

    const bookingData = {
      productId: product.id,
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
      totalCost: (dailyCost + deliveryFee).toString(),
      deliveryOption,
      deliveryFee: deliveryFee.toString(),
      notes: notes.trim(),
    };

    createBookingMutation.mutate(bookingData);
  };

  const handleSignWaiver = () => {
    if (!isAuthenticated) {
      // Store the current booking state and page URL to redirect back after login
      saveBookingState();
      sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
      window.location.href = "/auth";
      return;
    }
    signWaiverMutation.mutate();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Select Dates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Rental Period</Label>
              <div className="space-y-4 mt-2">
                <div>
                  <Label className="text-xs text-muted-foreground block mb-2">Start Date</Label>
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border w-full"
                    data-testid="calendar-start-date"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground block mb-2">End Date</Label>
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) => !startDate || date <= startDate}
                    className="rounded-md border w-full"
                    data-testid="calendar-end-date"
                  />
                </div>
              </div>
            </div>

            {startDate && endDate && (
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Rental Period:</strong> {days} day{days !== 1 ? 's' : ''}
                </p>
                <p className="text-sm">
                  {format(startDate, 'MMM dd, yyyy')} - {format(endDate, 'MMM dd, yyyy')}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Booking Details */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Delivery Options */}
          <div>
            <Label className="text-sm font-medium mb-2 block">
              <Truck className="h-4 w-4 inline mr-1" />
              Pickup & Delivery
            </Label>
            <Select value={deliveryOption} onValueChange={setDeliveryOption}>
              <SelectTrigger data-testid="select-delivery-option">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {deliveryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label} {option.fee > 0 && `(+$${option.fee})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Special Instructions (Optional)</Label>
            <Textarea
              placeholder="Any special requirements or delivery instructions..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[80px]"
              data-testid="textarea-notes"
            />
          </div>

          {/* Cost Breakdown */}
          {startDate && endDate && (
            <div className="space-y-2">
              <h4 className="font-semibold">Cost Breakdown</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Rental ({days} day{days !== 1 ? 's' : ''} × ${product.dailyRate})</span>
                  <span data-testid="text-daily-cost">${dailyCost.toFixed(2)}</span>
                </div>
                {deliveryFee > 0 && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span data-testid="text-delivery-fee">${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Security Deposit (refundable)</span>
                  <span data-testid="text-security-deposit-breakdown">${securityDeposit.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span data-testid="text-total-cost">${totalCost.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Waiver Section */}
          {isAuthenticated && (!waiverStatus || !(waiverStatus as any)?.signed) && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Waiver Required</h4>
              <p className="text-sm text-yellow-700 mb-3">
                You must sign our liability waiver before making your first booking.
              </p>
              <Button
                onClick={handleSignWaiver}
                disabled={signWaiverMutation.isPending}
                variant="outline"
                size="sm"
                data-testid="button-sign-waiver"
              >
                {signWaiverMutation.isPending ? "Signing..." : "Sign Waiver"}
              </Button>
            </div>
          )}

          {/* Book Button */}
          <Button
            onClick={handleBooking}
            disabled={
              !startDate || 
              !endDate || 
              createBookingMutation.isPending ||
              (isAuthenticated && (!waiverStatus || !(waiverStatus as any)?.signed))
            }
            className="w-full btn-primary py-3 font-semibold"
            data-testid="button-book-rental"
          >
            {createBookingMutation.isPending 
              ? "Creating Booking..." 
              : !isAuthenticated 
                ? "Sign In to Book" 
                : "Book This Rental"}
          </Button>

          {!isAuthenticated && (
            <p className="text-xs text-muted-foreground text-center">
              You'll need to create an account to complete your booking
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
