import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      rating: 5,
      text: "Perfect service! The Thule box was clean, well-maintained, and delivered exactly on time. Made our Blue Mountain trip so much easier with all our gear organized.",
      author: "Sarah Mitchell",
      location: "Toronto, ON"
    },
    {
      rating: 5,
      text: "Great bike rack rental experience. The Yakima carrier held our mountain bikes securely during our Algonquin Park trip. Installation was quick and professional.",
      author: "Mike Chen",
      location: "Mississauga, ON"
    },
    {
      rating: 5,
      text: "Booking was super easy, gear was top quality, and the pricing was very reasonable. Will definitely use Peak Gear TO for our next camping adventure!",
      author: "Jennifer Park",
      location: "Brampton, ON"
    }
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">What Our Customers Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from real adventurers who trust Peak Gear TO for their outdoor gear needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <div className="flex items-center mb-4">
                <div className="flex text-accent">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-card-foreground mb-6 italic" data-testid={`text-testimonial-${index}`}>
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <div>
                  <h4 className="font-semibold text-card-foreground" data-testid={`text-author-${index}`}>
                    {testimonial.author}
                  </h4>
                  <p className="text-sm text-muted-foreground" data-testid={`text-location-${index}`}>
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
