import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Mountain, Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const [location] = useLocation();

  const navigation = [
    { name: "Browse Gear", href: "/products" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer" data-testid="link-home">
              <Mountain className="text-primary text-2xl h-8 w-8" />
              <span className="text-xl font-bold text-primary">Peak Gear TO</span>
            </div>
          </Link>
          
          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span 
                  className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer"
                  data-testid={`link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
          
          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" data-testid="button-dashboard">
                    Dashboard
                  </Button>
                </Link>
                <span className="text-sm text-muted-foreground">
                  {user?.firstName || user?.email}
                </span>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = "/api/logout"}
                  data-testid="button-logout"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => window.location.href = "/api/login"}
                  data-testid="button-signin"
                >
                  Sign In
                </Button>
                <Button 
                  className="btn-primary px-4 py-2 rounded-lg font-medium"
                  onClick={() => window.location.href = "/api/login"}
                  data-testid="button-signup"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-border">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span 
                  className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid={`mobile-link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
            
            <div className="border-t border-border pt-4 pb-3">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link href="/dashboard">
                    <span 
                      className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary cursor-pointer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      data-testid="mobile-link-dashboard"
                    >
                      Dashboard
                    </span>
                  </Link>
                  <button 
                    className="block w-full text-left px-3 py-2 text-base font-medium text-foreground hover:text-primary"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.location.href = "/api/logout";
                    }}
                    data-testid="mobile-button-logout"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button 
                    className="block w-full text-left px-3 py-2 text-base font-medium text-foreground hover:text-primary"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.location.href = "/api/login";
                    }}
                    data-testid="mobile-button-signin"
                  >
                    Sign In
                  </button>
                  <button 
                    className="block w-full text-left px-3 py-2 text-base font-medium btn-primary rounded-lg"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.location.href = "/api/login";
                    }}
                    data-testid="mobile-button-signup"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
