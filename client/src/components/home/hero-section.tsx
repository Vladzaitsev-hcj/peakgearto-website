import { ArrowRight, Shield, Truck, Star } from "lucide-react";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')"
        }}
      />
      <div className="absolute inset-0 hero-gradient" />
      
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Gear Up for Your Next{' '}
          <span className="text-accent">GTA Adventure</span>
        </h1>
        <p className="text-xl sm:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto">
          Premium roof boxes and bike carriers delivered to your door. 
          Explore the outdoors with confidence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/products">
            <button className="btn-primary px-8 py-4 rounded-lg font-semibold text-lg shadow-lg" data-testid="button-browse-gear">
              Browse Our Gear
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Link>
          <button className="btn-secondary px-8 py-4 rounded-lg font-semibold text-lg" data-testid="button-learn-more">
            Learn More
          </button>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-200">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent" />
            <span>Fully Insured</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-accent" />
            <span>Free Brampton Pickup</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-accent" />
            <span>500+ Happy Customers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
