import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { SiteContent } from "@shared/schema";
import logoImage from "@assets/image_1761618219825.png";

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: content } = useQuery<SiteContent>({
    queryKey: ["/api/site-content"],
  });

  const phone = content?.footerPhone || "386-848-8751";

  const navItems = [
    { label: "Services", href: "/services" },
    { label: "Team", href: "/team" },
    { label: "Insurance", href: "/insurance" }
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/95 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          <div className="flex items-center">
            <a 
              href="/" 
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              data-testid="link-logo"
            >
              <img 
                src={logoImage} 
                alt="Empathy Health Clinic" 
                className="h-10 md:h-12 w-auto"
              />
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
                  if (item.href.startsWith('#')) {
                    e.preventDefault();
                    console.log(`Navigate to ${item.label}`);
                  }
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              asChild
              data-testid="link-header-phone"
            >
              <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="flex items-center gap-1.5">
                <Phone className="h-4 w-4" />
                <span>{phone}</span>
              </a>
            </Button>
            <Button
              variant="ghost"
              asChild
              data-testid="button-virtual-visit"
            >
              <a href="/virtual-visit">
                Virtual Visit
              </a>
            </Button>
            <Button
              variant="ghost"
              asChild
              data-testid="button-admin-link"
            >
              <a href="https://www.charmhealth.com/ehr/sign-in.html" target="_blank" rel="noopener noreferrer">
                Patient Portal
              </a>
            </Button>
            <Button
              className="rounded-full px-6"
              data-testid="button-header-appointment"
              onClick={() => window.location.href = '/request-appointment'}
            >
              Request Appointment
            </Button>
          </div>
          
          <div className="flex md:hidden items-center gap-2">
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
            <a 
              href={`tel:${phone.replace(/[^0-9]/g, '')}`}
              className="flex items-center justify-center gap-2 text-primary font-semibold text-xl py-3 border-b border-border"
              data-testid="link-mobile-phone"
            >
              <Phone className="h-6 w-6" />
              <span>{phone}</span>
            </a>
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block text-base font-medium text-foreground hover:text-primary py-2"
                data-testid={`link-mobile-nav-${index}`}
                onClick={(e) => {
                  if (item.href.startsWith('#')) {
                    e.preventDefault();
                    console.log(`Navigate to ${item.label}`);
                  }
                  setMobileMenuOpen(false);
                }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/virtual-visit"
              className="block text-base font-medium text-foreground hover:text-primary py-2"
              data-testid="link-mobile-virtual-visit"
              onClick={() => setMobileMenuOpen(false)}
            >
              Virtual Visit
            </a>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              data-testid="button-mobile-patient-portal"
              onClick={() => {
                window.open('https://www.charmhealth.com/ehr/sign-in.html', '_blank');
                setMobileMenuOpen(false);
              }}
            >
              Patient Portal
            </Button>
            <Button
              size="lg"
              className="w-full rounded-full"
              data-testid="button-mobile-appointment"
              onClick={() => {
                window.location.href = '/request-appointment';
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
