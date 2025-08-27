import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useQuery } from "@tanstack/react-query";
import { Check, Truck, Shield, Clock, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@shared/schema";

export default function Pricing() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const cargoBoxes = products?.filter(p => p.category === 'cargo_box') || [];
  const bikeCarriers = products?.filter(p => p.category === 'bike_carrier') || [];

  const deliveryOptions = [
    {
      name: "Pickup in Brampton",
      price: "Free",
      description: "Pick up and return at our Brampton warehouse",
      features: ["Free pickup and return", "Flexible timing", "Installation guidance"]
    },
    {
      name: "Standard Delivery",
      price: "$49.99",
      description: "Delivery within 20km of Brampton",
      features: ["Door-to-door service", "Same-day available", "Installation included"]
    },
    {
      name: "Extended Delivery", 
      price: "$89.99",
      description: "Delivery 20-50km from Brampton",
      features: ["Extended coverage area", "Scheduled delivery", "Full setup service"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-primary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              No hidden fees, no surprises. Quality gear at competitive rates for your Greater Toronto Area adventures.
            </p>
          </div>
        </section>

        {/* Rental Rates */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">Rental Rates</h2>
              <p className="text-lg text-muted-foreground">
                Daily rates for our premium gear. Multi-day discounts available.
              </p>
            </div>

            {isLoading ? (
              <div className="grid md:grid-cols-2 gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-32 bg-muted rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-12">
                {/* Cargo Boxes */}
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Roof Cargo Boxes</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {cargoBoxes.map((product) => (
                      <Card key={product.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{product.name}</CardTitle>
                              <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                            </div>
                            <Badge variant="secondary" className="ml-2">Cargo Box</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-2xl font-bold text-primary">
                                ${product.dailyRate}/day
                              </div>
                              <div className="text-sm text-muted-foreground">
                                ${product.securityDeposit} security deposit
                              </div>
                            </div>
                            <a
                              href={`/products/${product.id}`}
                              className="btn-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
                              data-testid={`button-view-${product.id}`}
                            >
                              View Details
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Bike Carriers */}
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Bike Carriers</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {bikeCarriers.map((product) => (
                      <Card key={product.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{product.name}</CardTitle>
                              <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                            </div>
                            <Badge variant="secondary" className="ml-2">Bike Carrier</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-2xl font-bold text-primary">
                                ${product.dailyRate}/day
                              </div>
                              <div className="text-sm text-muted-foreground">
                                ${product.securityDeposit} security deposit
                              </div>
                            </div>
                            <a
                              href={`/products/${product.id}`}
                              className="btn-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
                              data-testid={`button-view-${product.id}`}
                            >
                              View Details
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Delivery Options */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">Delivery & Pickup Options</h2>
              <p className="text-lg text-muted-foreground">
                Choose the option that works best for your schedule and location.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {deliveryOptions.map((option, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                      <Truck className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{option.name}</CardTitle>
                    <div className="text-2xl font-bold text-primary mt-2">{option.price}</div>
                    <p className="text-sm text-muted-foreground mt-2">{option.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {option.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              {/* What's Included */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">What's Included</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground">Full Insurance Coverage</h4>
                      <p className="text-sm text-muted-foreground">Comprehensive coverage for peace of mind</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground">Flexible Rental Periods</h4>
                      <p className="text-sm text-muted-foreground">Daily, weekly, or custom duration rentals</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground">24/7 Support</h4>
                      <p className="text-sm text-muted-foreground">Help when you need it, even on weekends</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Notes */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Important Notes</h3>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">Security Deposits</h4>
                    <p>Refundable security deposits are charged to ensure equipment is returned in good condition. Deposits are fully refunded within 3-5 business days after return.</p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">Multi-Day Discounts</h4>
                    <p>Extended rental periods (7+ days) qualify for special rates. Contact us for custom quotes on long-term rentals.</p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">Cancellation Policy</h4>
                    <p>Free cancellation up to 24 hours before your rental start date. Same-day cancellations may incur a service fee.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Adventure?</h2>
            <p className="text-xl mb-8 opacity-90">
              Browse our gear and book your rental today. No membership fees, no hidden costs.
            </p>
            <a 
              href="/products" 
              className="inline-flex items-center bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:transform hover:-translate-y-1 shadow-lg"
              data-testid="button-browse-gear"
            >
              Browse Our Gear
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}