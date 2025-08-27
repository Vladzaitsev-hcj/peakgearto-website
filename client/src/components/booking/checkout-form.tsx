import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Shield, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import type { Product } from "@shared/schema";

interface CheckoutFormProps {
  product: Product;
  bookingDetails: {
    startDate: string;
    endDate: string;
    days: number;
    deliveryOption: string;
    deliveryFee: number;
    totalCost: number;
    notes?: string;
  };
  onPaymentSuccess: () => void;
}

export default function CheckoutForm({ product, bookingDetails, onPaymentSuccess }: CheckoutFormProps) {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [isProcessing, setIsProcessing] = useState(false);

  const processPaymentMutation = useMutation({
    mutationFn: async (paymentData: any) => {
      // Simulate PayPal payment processing
      setIsProcessing(true);
      
      // Create the booking first
      const bookingResponse = await apiRequest("POST", "/api/bookings", {
        productId: product.id,
        startDate: bookingDetails.startDate,
        endDate: bookingDetails.endDate,
        totalCost: (bookingDetails.totalCost - parseFloat(product.securityDeposit)).toString(),
        deliveryOption: bookingDetails.deliveryOption,
        deliveryFee: bookingDetails.deliveryFee.toString(),
        notes: bookingDetails.notes || '',
        paymentStatus: 'paid',
        status: 'confirmed'
      });

      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return bookingResponse;
    },
    onSuccess: () => {
      toast({
        title: "Payment Successful!",
        description: "Your booking has been confirmed. You'll receive a confirmation email shortly.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      onPaymentSuccess();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Payment Failed",
        description: error.message || "Payment could not be processed. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsProcessing(false);
    }
  });

  const handlePayment = () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in Required",
        description: "Please sign in to complete payment.",
        variant: "destructive",
      });
      return;
    }

    const paymentData = {
      method: paymentMethod,
      amount: bookingDetails.totalCost,
      currency: 'CAD',
      description: `Rental: ${product.name}`,
    };

    processPaymentMutation.mutate(paymentData);
  };

  const dailyCost = bookingDetails.days * parseFloat(product.dailyRate);
  const securityDeposit = parseFloat(product.securityDeposit);

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={product.images?.[0] || 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg"
              data-testid="img-checkout-product"
            />
            <div>
              <h3 className="font-semibold" data-testid="text-checkout-product-name">{product.name}</h3>
              <p className="text-sm text-muted-foreground">
                {format(new Date(bookingDetails.startDate), 'MMM dd')} - {format(new Date(bookingDetails.endDate), 'MMM dd, yyyy')}
              </p>
              <p className="text-sm text-muted-foreground" data-testid="text-checkout-duration">
                {bookingDetails.days} day{bookingDetails.days !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Rental Cost ({bookingDetails.days} days)</span>
              <span data-testid="text-checkout-rental-cost">${dailyCost.toFixed(2)}</span>
            </div>
            {bookingDetails.deliveryFee > 0 && (
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span data-testid="text-checkout-delivery-fee">${bookingDetails.deliveryFee.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Security Deposit</span>
              <span data-testid="text-checkout-security-deposit">${securityDeposit.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span data-testid="text-checkout-total">${bookingDetails.totalCost.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-800">Security Deposit</p>
                <p className="text-blue-700">
                  ${securityDeposit} will be refunded after equipment return in good condition.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
              <RadioGroupItem value="paypal" id="paypal" data-testid="radio-paypal" />
              <Label htmlFor="paypal" className="flex items-center gap-3 cursor-pointer">
                <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">
                  PayPal
                </div>
                <span>Secure payment with PayPal</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
              <RadioGroupItem value="card" id="card" disabled />
              <Label htmlFor="card" className="flex items-center gap-3 cursor-not-allowed">
                <div className="bg-gray-400 text-white px-3 py-1 rounded text-sm">
                  Card
                </div>
                <span>Credit/Debit Card (Coming Soon)</span>
              </Label>
            </div>
          </RadioGroup>

          {paymentMethod === 'paypal' && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800">PayPal Payment</p>
                  <p className="text-yellow-700">
                    You'll be redirected to PayPal to complete your secure payment.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Button */}
      <Card>
        <CardContent className="pt-6">
          <Button
            onClick={handlePayment}
            disabled={processPaymentMutation.isPending || isProcessing}
            className="w-full btn-primary py-4 font-semibold text-lg"
            data-testid="button-complete-payment"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Processing Payment...
              </div>
            ) : (
              `Pay ${bookingDetails.totalCost.toFixed(2)} CAD`
            )}
          </Button>

          <div className="mt-4 text-center">
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                <span>SSL Encrypted</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-2">
            By completing your purchase, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
