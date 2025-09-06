import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Mountain, Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/auth/user"], null);
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
      setLocation("/");
    },
    onError: () => {
      toast({
        title: "Sign out failed",
        description: "There was an error signing you out.",
        variant: "destructive",
      });
    },
  });

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
                  onClick={() => logoutMutation.mutate()}
                  disabled={logoutMutation.isPending}
                  data-testid="button-logout"
                >
                  {logoutMutation.isPending ? "Signing out..." : "Sign Out"}
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth">
                  <Button 
                    variant="ghost"
                    data-testid="button-signin"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button 
                    className="btn-primary px-4 py-2 rounded-lg font-medium"
                    data-testid="button-signup"
                  >
                    Sign Up
                  </Button>
                </Link>
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
                      logoutMutation.mutate();
                    }}
                    disabled={logoutMutation.isPending}
                    data-testid="mobile-button-logout"
                  >
                    {logoutMutation.isPending ? "Signing out..." : "Sign Out"}
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link href="/auth">
                    <span 
                      className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary cursor-pointer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      data-testid="mobile-button-signin"
                    >
                      Sign In
                    </span>
                  </Link>
                  <Link href="/auth">
                    <span 
                      className="block px-3 py-2 text-base font-medium btn-primary rounded-lg cursor-pointer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      data-testid="mobile-button-signup"
                    >
                      Sign Up
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
