import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import BookingCalendar from "@/components/booking/booking-calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Car, Package, Shield } from "lucide-react";
import { Link } from "wouter";
import type { Product } from "@shared/schema";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["/api/products", id],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-32 mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-96 bg-muted rounded-lg"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                  <div className="h-24 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/products">
              <button className="btn-primary px-6 py-3 rounded-lg font-medium" data-testid="button-back-to-products">
                Back to Products
              </button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const specifications = product.specifications as any;
  const primaryImage = product.images?.[0] || 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/products">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8" data-testid="button-back">
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <img
                src={primaryImage}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg shadow-md mb-4"
                data-testid="img-product-primary"
              />
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.slice(1, 5).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.name} view ${index + 2}`}
                      className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                      data-testid={`img-product-${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <Badge variant="secondary" className="mb-2" data-testid="badge-category">
                  {product.category === 'cargo_box' ? 'Roof Box' : 'Bike Carrier'}
                </Badge>
                <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-product-name">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground" data-testid="text-product-description">
                  {product.description}
                </p>
              </div>

              {/* Pricing */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-3xl font-bold text-primary" data-testid="text-daily-rate">
                        ${product.dailyRate}/day
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-muted-foreground">Security Deposit</span>
                      <div className="text-lg font-semibold" data-testid="text-security-deposit">
                        ${product.securityDeposit}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Shield className="h-4 w-4 text-accent" />
                      <span>Quality Gear</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Package className="h-4 w-4 text-accent" />
                      <span>Professional Install</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Specifications */}
              {specifications && (
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                    <div className="space-y-2">
                      {specifications.dimensions && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Dimensions</span>
                          <span data-testid="text-dimensions">{specifications.dimensions}</span>
                        </div>
                      )}
                      {specifications.weight_capacity && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Weight Capacity</span>
                          <span data-testid="text-weight-capacity">{specifications.weight_capacity}</span>
                        </div>
                      )}
                      {specifications.capacity && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Capacity</span>
                          <span data-testid="text-capacity">{specifications.capacity}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Vehicle Compatibility */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Car className="h-5 w-5 text-primary" />
                    Vehicle Compatibility
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">
                        {product.category === 'cargo_box' ? 'Roof Box Requirements' : 'Bike Carrier Requirements'}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {product.category === 'cargo_box' 
                          ? 'Most cargo boxes require factory roof rails or aftermarket crossbars. Compatible with sedans, SUVs, wagons, and crossovers that have proper roof mounting points.'
                          : 'Bike carriers can be mounted on roof rails, trailer hitches (1.25" or 2"), or trunk/hatch areas. Installation method depends on your vehicle type and preferred mounting location.'
                        }
                      </p>
                    </div>
                    <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">Not Sure About Compatibility?</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        Our team will help ensure this equipment works perfectly with your vehicle. We provide free compatibility consultation and professional installation guidance.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <a 
                          href="/contact" 
                          className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          data-testid="button-compatibility-help"
                        >
                          Contact Us for Help
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>

          <Separator className="my-12" />

          {/* Booking Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Book Your Rental
            </h2>
            <BookingCalendar product={product} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
