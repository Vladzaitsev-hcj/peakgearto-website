import { Search, CalendarCheck, Route, RotateCcw } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      icon: Search,
      title: "Browse Gear",
      description: "Explore our selection of premium roof boxes and bike carriers. Filter by size, compatibility, and price."
    },
    {
      number: 2,
      icon: CalendarCheck,
      title: "Book & Sign",
      description: "Select your dates, create an account, and digitally sign our simple waiver. Secure your gear instantly."
    },
    {
      number: 3,
      icon: Route,
      title: "Adventure Awaits",
      description: "Pick up in Brampton or choose delivery. We'll install your gear and ensure everything's secure."
    },
    {
      number: 4,
      icon: RotateCcw,
      title: "Easy Return",
      description: "Return your gear clean and undamaged. We handle the rest and refund your security deposit."
    }
  ];

  return (
    <section className="py-20 bg-secondary" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting your adventure gear is simple. Four easy steps and you're ready to explore.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div key={step.number} className="text-center group">
                <div className="step-number mx-auto mb-6">{step.number}</div>
                <div className="mb-4">
                  <IconComponent className="h-10 w-10 text-primary mb-4 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
