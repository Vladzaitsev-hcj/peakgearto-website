import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Clock, Truck, Shield, CreditCard, Calendar, Car } from "lucide-react";

export default function FAQ() {
  const faqCategories = [
    {
      title: "Booking & Reservations",
      icon: <Calendar className="h-5 w-5" />,
      questions: [
        {
          question: "How far in advance should I book?",
          answer: "We recommend booking at least 24-48 hours in advance, especially during peak seasons (summer months and long weekends). However, same-day rentals are often available - just give us a call to check availability."
        },
        {
          question: "Can I modify or cancel my booking?",
          answer: "Yes! You can cancel your booking free of charge up to 24 hours before your rental start date. For modifications, contact us as soon as possible and we'll do our best to accommodate changes based on availability."
        },
        {
          question: "Do I need to sign a waiver?",
          answer: "Yes, all renters must sign our digital liability waiver before their first booking. This is a one-time requirement and can be completed during the booking process on our website."
        },
        {
          question: "What happens if the weather is bad?",
          answer: "Our equipment is designed for all weather conditions. However, if severe weather makes travel unsafe, we offer flexible rescheduling options at no extra charge."
        }
      ]
    },
    {
      title: "Equipment & Compatibility",
      icon: <Car className="h-5 w-5" />,
      questions: [
        {
          question: "How do I know if equipment will fit my vehicle?",
          answer: "Each product listing includes detailed compatibility information. Our cargo boxes and bike carriers are designed to fit most vehicles with roof rails or crossbars. If you're unsure, contact us with your vehicle make, model, and year."
        },
        {
          question: "Do you provide installation instructions?",
          answer: "Yes! We provide detailed installation guides and videos for all equipment. For delivery orders, our team can install the equipment for you. For pickups, we'll show you how to properly install and secure everything."
        },
        {
          question: "What if my vehicle doesn't have roof rails?",
          answer: "Many of our bike carriers can be mounted on trailer hitches or trunks. We also rent roof rail systems for vehicles that don't have them. Contact us to discuss the best solution for your vehicle."
        },
        {
          question: "Can I get a different size if the first one doesn't fit?",
          answer: "Absolutely! If you discover compatibility issues, we'll exchange the equipment for a different size or type at no extra charge, subject to availability."
        }
      ]
    },
    {
      title: "Delivery & Pickup",
      icon: <Truck className="h-5 w-5" />,
      questions: [
        {
          question: "What areas do you deliver to?",
          answer: "We offer free pickup from our Brampton warehouse. Standard delivery ($49.99) covers within 20km of Brampton, and extended delivery ($89.99) covers 20-50km. This includes most of the Greater Toronto Area."
        },
        {
          question: "How does delivery work?",
          answer: "Our delivery team will bring the equipment to your location, install it on your vehicle, and provide a brief tutorial. At the end of your rental, we'll return to pick up the equipment at the agreed time."
        },
        {
          question: "Can I pick up equipment myself?",
          answer: "Yes! Pickup from our Brampton warehouse is always free. Our team will help load the equipment and show you how to install it properly."
        },
        {
          question: "What if I need to return equipment early or late?",
          answer: "Early returns don't receive refunds, but late returns are charged an additional day's fee. Contact us if you need to adjust your return time - we're usually quite flexible with timing."
        }
      ]
    },
    {
      title: "Pricing & Payment",
      icon: <CreditCard className="h-5 w-5" />,
      questions: [
        {
          question: "How is rental pricing calculated?",
          answer: "Pricing is based on daily rates plus delivery fees (if applicable) and a refundable security deposit. Multi-day rentals receive better daily rates. Check our Pricing page for detailed information."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Payment is processed securely at the time of booking."
        },
        {
          question: "When is the security deposit returned?",
          answer: "Security deposits are fully refunded within 3-5 business days after equipment is returned in good condition. The refund goes back to your original payment method."
        },
        {
          question: "Are there any hidden fees?",
          answer: "No hidden fees! Our pricing is transparent. You'll pay the daily rental rate, delivery fee (if applicable), and security deposit. That's it. Any additional charges would only apply for damage or late returns."
        }
      ]
    },
    {
      title: "Insurance & Liability",
      icon: <Shield className="h-5 w-5" />,
      questions: [
        {
          question: "Is the equipment insured?",
          answer: "Yes, all our equipment is covered by comprehensive insurance. However, renters are responsible for any damage or loss during the rental period, which is why we collect a security deposit."
        },
        {
          question: "What happens if the equipment is damaged?",
          answer: "Minor wear and tear is expected and covered. For significant damage, repair costs will be deducted from your security deposit. We'll provide a detailed damage assessment and quote before any charges."
        },
        {
          question: "Am I liable for theft?",
          answer: "Yes, renters are responsible for equipment security. We recommend always locking cargo boxes and removing bike carriers when leaving your vehicle unattended. Your auto insurance may provide coverage - check with your provider."
        },
        {
          question: "What if the equipment causes damage to my vehicle?",
          answer: "When properly installed and used according to our instructions, our equipment should not damage your vehicle. However, Peak Gear TO is not responsible for vehicle damage. We recommend checking with your auto insurance provider."
        }
      ]
    },
    {
      title: "General Information",
      icon: <HelpCircle className="h-5 w-5" />,
      questions: [
        {
          question: "How long has Peak Gear TO been in business?",
          answer: "Peak Gear TO has been serving the Greater Toronto Area's outdoor enthusiasts for several years, building a reputation for quality equipment and excellent customer service."
        },
        {
          question: "Do you offer corporate or group discounts?",
          answer: "Yes! We offer special rates for corporate events, group camping trips, and extended rentals (7+ days). Contact us directly to discuss your needs and get a custom quote."
        },
        {
          question: "Can I rent equipment for someone else?",
          answer: "The person picking up or receiving the equipment must be the same person who made the booking and signed the waiver. This is for security and liability reasons."
        },
        {
          question: "What if I have a problem during my rental?",
          answer: "We provide 24/7 support during your rental period. You can reach us by phone, email, or through our website chat. We're here to help ensure your adventure goes smoothly!"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-primary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <HelpCircle className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Find quick answers to common questions about renting outdoor gear from Peak Gear TO.
            </p>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <Card key={categoryIndex} className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {category.icon}
                      </div>
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq, faqIndex) => (
                        <AccordionItem 
                          key={faqIndex} 
                          value={`${categoryIndex}-${faqIndex}`}
                          data-testid={`faq-item-${categoryIndex}-${faqIndex}`}
                        >
                          <AccordionTrigger className="text-left hover:no-underline">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Still Have Questions?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Can't find the answer you're looking for? Our friendly team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="inline-flex items-center bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors"
                data-testid="button-contact-us"
              >
                Contact Us
              </a>
              <a 
                href="tel:+14165556327" 
                className="inline-flex items-center bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-semibold transition-colors"
                data-testid="button-call-us"
              >
                <Clock className="h-4 w-4 mr-2" />
                Call (416) 555-GEAR
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Available 7 days a week • 24/7 support during active rentals
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}