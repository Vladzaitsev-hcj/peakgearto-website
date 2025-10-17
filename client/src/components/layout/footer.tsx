import { Mountain, Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "Browse Products", href: "/products" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "About Us", href: "/about" },
  ];

  const supportLinks = [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ];

  const serviceAreas = [
    "Brampton", "Toronto", "Mississauga", "Markham", 
    "Richmond Hill", "Vaughan", "Burlington"
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Mountain className="text-primary text-xl h-6 w-6" />
              <span className="text-lg font-bold text-primary">Peak Gear TO</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Premium roof boxes and bike carriers for your GTA adventures. 
              Quality gear, competitive prices.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-accent transition-colors"
                data-testid="link-facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-accent transition-colors"
                data-testid="link-instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-accent transition-colors"
                data-testid="link-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-accent transition-colors"
                    data-testid={`link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-accent transition-colors"
                    data-testid={`link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-4">Contact</h3>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                <a href="mailto:info@peakgearto.com" className="hover:text-accent transition-colors" data-testid="text-email">
                  info@peakgearto.com
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Service Areas */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground mb-2">
              Proudly serving the Greater Toronto Area
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              {serviceAreas.map((area, index) => (
                <span key={area} className="text-muted-foreground">
                  {area}
                  {index < serviceAreas.length - 1 && " • "}
                </span>
              ))}
            </div>
          </div>
          
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Peak Gear TO. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
