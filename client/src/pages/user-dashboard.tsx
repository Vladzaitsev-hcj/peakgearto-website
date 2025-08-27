import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Package, Clock, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import type { Booking } from "@shared/schema";

export default function UserDashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();

  const { data: bookings, isLoading: bookingsLoading } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
    enabled: isAuthenticated,
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
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
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <Calendar className="h-4 w-4" />;
      case 'active': return <Package className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-dashboard-title">
              My Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Welcome back, {user?.firstName || user?.email}!
            </p>
          </div>

          {/* Account Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Account Status</h3>
                    <p className="text-sm text-muted-foreground">Active & Verified</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Package className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Total Bookings</h3>
                    <p className="text-sm text-muted-foreground" data-testid="text-total-bookings">
                      {bookings?.length || 0} rentals
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Waiver Status</h3>
                    <p className="text-sm text-muted-foreground">
                      {user?.waiverSigned ? 'Signed' : 'Pending'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>My Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              {bookingsLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-20 bg-muted rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : !bookings || bookings.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Bookings Yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Ready to start your next adventure? Browse our gear and make your first booking.
                  </p>
                  <a href="/products">
                    <button className="btn-primary px-6 py-3 rounded-lg font-medium" data-testid="button-browse-gear">
                      Browse Our Gear
                    </button>
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border border-border rounded-lg p-6 hover:bg-muted/50 transition-colors"
                      data-testid={`booking-${booking.id}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(booking.status)}
                          <div>
                            <h3 className="font-semibold" data-testid={`text-booking-id-${booking.id}`}>
                              Booking #{booking.id.slice(-8)}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Product ID: {booking.productId}
                            </p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(booking.status)} data-testid={`badge-status-${booking.id}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Start Date</span>
                          <p className="font-medium" data-testid={`text-start-date-${booking.id}`}>
                            {format(new Date(booking.startDate), "MMM dd, yyyy")}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">End Date</span>
                          <p className="font-medium" data-testid={`text-end-date-${booking.id}`}>
                            {format(new Date(booking.endDate), "MMM dd, yyyy")}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total Cost</span>
                          <p className="font-medium" data-testid={`text-total-cost-${booking.id}`}>
                            ${booking.totalCost}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Delivery</span>
                          <p className="font-medium" data-testid={`text-delivery-${booking.id}`}>
                            {booking.deliveryOption === 'pickup' ? 'Pickup' : 
                             booking.deliveryOption === 'standard_delivery' ? 'Standard Delivery' : 
                             'Extended Delivery'}
                          </p>
                        </div>
                      </div>

                      {booking.notes && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <span className="text-sm text-muted-foreground">Notes:</span>
                          <p className="text-sm mt-1" data-testid={`text-notes-${booking.id}`}>
                            {booking.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
