import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Our Team", href: "#team" },
    { label: "Insurance", href: "#insurance" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/95 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          <div className="flex items-center">
            <a 
              href="#" 
              className="text-xl md:text-2xl font-serif font-medium text-foreground"
              data-testid="link-logo"
              onClick={(e) => {
                e.preventDefault();
                console.log('Logo clicked');
              }}
            >
              Empathy Health Clinic
            </a>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-base font-medium text-foreground hover:text-primary transition-colors"
                data-testid={`link-nav-${index}`}
                onClick={(e) => {
                  e.preventDefault();
                  console.log(`Navigate to ${item.label}`);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              onClick={() => window.location.href = '/admin'}
              data-testid="button-admin-link"
            >
              Admin
            </Button>
            <Button
              size="lg"
              className="rounded-full px-6"
              data-testid="button-header-appointment"
              onClick={() => console.log('Request appointment from header')}
            >
              Request Appointment
            </Button>
          </div>
          
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block text-base font-medium text-foreground hover:text-primary py-2"
                data-testid={`link-mobile-nav-${index}`}
                onClick={(e) => {
                  e.preventDefault();
                  console.log(`Navigate to ${item.label}`);
                  setMobileMenuOpen(false);
                }}
              >
                {item.label}
              </a>
            ))}
            <Button
              size="lg"
              className="w-full rounded-full"
              data-testid="button-mobile-appointment"
              onClick={() => {
                console.log('Request appointment from mobile menu');
                setMobileMenuOpen(false);
              }}
            >
              Request Appointment
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
