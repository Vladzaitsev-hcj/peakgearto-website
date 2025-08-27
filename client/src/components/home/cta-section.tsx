import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function CTASection() {
  const serviceAreas = [
    "Brampton", "Toronto", "Mississauga", "Markham", 
    "Richmond Hill", "Vaughan", "Burlington"
  ];

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready for Your Next Adventure?</h2>
        <p className="text-xl mb-8 opacity-90">
          Browse our premium selection of roof boxes and bike carriers. 
          Quality gear, competitive prices, and exceptional service.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <button className="btn-primary px-8 py-4 rounded-lg font-semibold text-lg" data-testid="button-browse-all-products">
              Browse All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Link>
          <button className="border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-foreground hover:text-primary transition-all" data-testid="button-contact-us">
            Contact Us
          </button>
        </div>
        
        {/* Service Areas */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <p className="text-sm opacity-75 mb-2">Proudly serving the Greater Toronto Area</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {serviceAreas.map((area, index) => (
              <span key={area}>
                {area}
                {index < serviceAreas.length - 1 && " • "}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
