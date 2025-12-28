import { useState, useEffect, Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { SiteContent } from "@shared/schema";
import { trackEvent } from "@/lib/analytics";

const logoImage = "/attached_assets/image_1761920964846-optimized.webp";

interface HeaderErrorBoundaryState {
  hasError: boolean;
}

class HeaderErrorBoundary extends Component<{ children: ReactNode }, HeaderErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): HeaderErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Header error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <a href="/" className="flex items-center">
                <img src={logoImage} alt="Empathy Health Clinic" className="h-16 w-auto" />
              </a>
              <nav className="flex items-center gap-4">
                <a href="/psychiatrist-orlando" className="text-gray-800 hover:text-orange-500">Psychiatrist Orlando</a>
                <a href="/services" className="text-gray-800 hover:text-orange-500">Services</a>
                <a href="/team" className="text-gray-800 hover:text-orange-500">Team</a>
                <a href="/insurance" className="text-gray-800 hover:text-orange-500">Insurance</a>
              </nav>
              <div className="flex items-center gap-3">
                <a href="tel:3868488751" className="flex items-center gap-1 text-amber-800 bg-amber-100 px-3 py-1.5 rounded">
                  <Phone className="h-4 w-4" />
                  386-848-8751
                </a>
                <a href="/request-appointment" className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500">
                  Request Appointment
                </a>
              </div>
            </div>
          </div>
        </header>
      );
    }
    return this.props.children;
  }
}

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

function SiteHeaderContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px)");

  const { data: content } = useQuery<SiteContent>({
    queryKey: ["/api/site-content"],
  });

  const phone = content?.footerPhone || "386-848-8751";

  const navItems = [
    { label: "Psychiatrist Orlando", href: "/psychiatrist-orlando" },
    { label: "Services", href: "/services" },
    { label: "Team", href: "/team" },
    { label: "Insurance", href: "/insurance" }
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/95 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          <div className="flex items-center">
            <a 
              href="/" 
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              data-testid="link-logo"
            >
              <img 
                src={logoImage} 
                alt="Empathy Health Clinic" 
                className="h-16 lg:h-20 w-auto"
                width={240}
                height={80}
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
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-800/50 transition-colors font-semibold"
                    data-testid="link-header-phone"
                    aria-label="Call Empathy Health Clinic at 386-848-8751"
                    onClick={() => trackEvent('phone_click', 'conversion', 'Header Phone', phone)}
                  >
                    <Phone className="h-5 w-5" />
                    <span className="text-base">{phone}</span>
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
                  className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors underline decoration-primary/50"
                  data-testid="link-header-phone-tablet"
                  aria-label="Call Empathy Health Clinic at 386-848-8751"
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
              className="flex items-center justify-center gap-2 text-primary font-semibold text-xl py-3 border-b border-border underline decoration-primary/50"
              data-testid="link-mobile-phone"
              aria-label="Call Empathy Health Clinic at 386-848-8751"
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
              data-testid="link-mobile-virtual-visit"
              onClick={() => {
                trackEvent('virtual_visit_click', 'conversion', 'Mobile Header Virtual Visit');
                setMobileMenuOpen(false);
              }}
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

export default function SiteHeader() {
  return (
    <HeaderErrorBoundary>
      <SiteHeaderContent />
    </HeaderErrorBoundary>
  );
}
