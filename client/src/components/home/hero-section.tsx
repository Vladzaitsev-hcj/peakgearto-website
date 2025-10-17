import { ArrowRight, Shield, Truck, Star } from "lucide-react";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url(/images/hero-background.jpg)'}} />
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-primary/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      
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
          <button 
            onClick={() => {
              const howItWorksSection = document.getElementById('how-it-works');
              if (howItWorksSection) {
                howItWorksSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn-secondary px-8 py-4 rounded-lg font-semibold text-lg" 
            data-testid="button-learn-more"
          >
            Learn More
          </button>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-200">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent" />
            <span>Quality Equipment</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-accent" />
            <span>Free Pickup Available</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-accent" />
            <span>GTA Wide Service</span>
          </div>
        </div>
      </div>
    </section>
  );
}
