import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { SiteContent } from "@shared/schema";
import logoImage from "@assets/image_1761920964846-optimized.webp";
import { trackEvent } from "@/lib/analytics";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px)");

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
        <div className="flex items-center justify-between h-36 lg:h-44">
          <div className="flex items-center">
            <a 
              href="/" 
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              data-testid="link-logo"
            >
              <img 
                src={logoImage} 
                alt="Empathy Health Clinic" 
                className="h-32 lg:h-40 w-auto"
                width={480}
                height={160}
              />
            </a>
          </div>
          
          {isDesktop && (
            <nav className="flex items-center space-x-6 xl:space-x-8">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-sm xl:text-base font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap"
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
          )}
          
          {isTablet && (
            <div className="flex items-center gap-3 lg:gap-4">
              {isDesktop && (
                <>
                  <a 
                    href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
                    data-testid="link-header-phone"
                    onClick={() => trackEvent('phone_click', 'conversion', 'Header Phone', phone)}
                  >
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{phone}</span>
                  </a>
                  <div className="h-6 w-px bg-border" />
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    data-testid="button-admin-link"
                  >
                    <a href="https://www.charmhealth.com/ehr/sign-in.html" target="_blank" rel="noopener noreferrer">
                      Patient Portal
                    </a>
                  </Button>
                </>
              )}
              <Button
                size="default"
                data-testid="button-header-appointment"
                onClick={() => window.location.href = '/request-appointment'}
                className="text-sm md:text-base"
              >
                Request Appointment
              </Button>
            </div>
          )}
          
          {!isDesktop && (
            <div className="flex items-center gap-2 md:gap-3">
              {isTablet && (
                <a 
                  href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                  className="flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
                  data-testid="link-header-phone-tablet"
                  onClick={() => trackEvent('phone_click', 'conversion', 'Header Phone Tablet', phone)}
                >
                  <Phone className="h-4 w-4" />
                  <span className="text-xs">{phone}</span>
                </a>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {mobileMenuOpen && !isDesktop && (
        <div className="border-t border-border bg-background">
          <div className="px-6 py-4 space-y-4">
            <a 
              href={`tel:${phone.replace(/[^0-9]/g, '')}`}
              className="flex items-center justify-center gap-2 text-primary font-semibold text-xl py-3 border-b border-border"
              data-testid="link-mobile-phone"
              onClick={() => trackEvent('phone_click', 'conversion', 'Mobile Header Phone', phone)}
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
              href="/virtual-therapy"
              className="block text-base font-medium text-foreground hover:text-primary py-2"
              data-testid="link-mobile-virtual-therapy"
              onClick={() => {
                trackEvent('virtual_therapy_click', 'conversion', 'Mobile Header Virtual Therapy');
                setMobileMenuOpen(false);
              }}
            >
              Virtual Therapy
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
