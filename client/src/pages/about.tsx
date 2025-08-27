import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Shield, Truck, Star, Users, Award, MapPin } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-primary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              About Peak Gear TO
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're passionate about making outdoor adventures accessible to everyone in the Greater Toronto Area. 
              Since our founding, we've been the trusted choice for premium roof boxes and bike carriers.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Founded by outdoor enthusiasts who understand the challenges of transporting gear for weekend getaways, 
                  Peak Gear TO was born from a simple idea: make quality outdoor equipment rental easy and affordable for everyone.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Located in the heart of Brampton, we serve the entire Greater Toronto Area with premium roof cargo boxes 
                  and bike carriers from trusted brands like Thule, Yakima, and Kuat. Whether you're heading to Muskoka, 
                  Algonquin Park, or anywhere in Ontario, we've got the gear you need.
                </p>
              </div>
              <div className="bg-primary/10 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">Why Choose Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Fully insured equipment for your peace of mind</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Truck className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Free pickup and delivery in Brampton</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Premium brands you can trust</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Expert installation guidance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-primary/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-lg font-medium text-foreground mb-1">Happy Customers</div>
                <p className="text-sm text-muted-foreground">Trusted by adventurers across the GTA</p>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">2,000+</div>
                <div className="text-lg font-medium text-foreground mb-1">Successful Rentals</div>
                <p className="text-sm text-muted-foreground">Equipment safely delivered and returned</p>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">99%</div>
                <div className="text-lg font-medium text-foreground mb-1">Customer Satisfaction</div>
                <p className="text-sm text-muted-foreground">Based on customer reviews and feedback</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Location */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Location</h2>
            <div className="flex items-center justify-center gap-2 mb-6">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-lg text-muted-foreground">Serving the Greater Toronto Area from Brampton</span>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Centrally located in Brampton, we provide convenient pickup and delivery services throughout the GTA. 
              Our warehouse is stocked with premium gear ready for your next adventure.
            </p>
            <div className="bg-card border border-border rounded-lg p-6 max-w-md mx-auto">
              <h3 className="font-semibold text-foreground mb-3">Service Areas</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div>• Brampton</div>
                <div>• Mississauga</div>
                <div>• Toronto</div>
                <div>• Vaughan</div>
                <div>• Markham</div>
                <div>• Richmond Hill</div>
                <div>• Oakville</div>
                <div>• Burlington</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready for Your Next Adventure?</h2>
            <p className="text-xl mb-8 opacity-90">
              Browse our premium selection of roof boxes and bike carriers today.
            </p>
            <a 
              href="/products" 
              className="inline-flex items-center bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:transform hover:-translate-y-1 shadow-lg"
              data-testid="button-browse-products"
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