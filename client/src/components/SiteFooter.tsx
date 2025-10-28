import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { SiteContent } from "@shared/schema";
import { trackEvent } from "@/lib/analytics";

export default function SiteFooter() {
  const [email, setEmail] = useState("");

  const { data: content } = useQuery<SiteContent>({
    queryKey: ["/api/site-content"],
  });

  const phone = content?.footerPhone || "386-848-8751";
  const emailAddress = content?.footerEmail || "provider@empathyhealthclinic.com";
  const address = content?.footerAddress || "2281 Lee Rd Suite 102, Winter Park FL";

  const quickLinks = [
    { label: "Services", href: "/services" },
    { label: "Insurance", href: "/insurance" },
    { label: "Team", href: "/team" },
    { label: "Blog", href: "/blog" },
    { label: "Virtual Visit", href: "/virtual-visit" },
    { label: "Request Appointment", href: "/request-appointment" }
  ];

  return (
    <footer className="bg-card border-t border-card-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-sans font-medium mb-4 text-foreground">
              Empathy Health Clinic
            </h3>
            <p className="text-base text-muted-foreground mb-6">
              Healing Begins with Empathy
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <a 
                  href={`tel:${phone.replace(/[^0-9]/g, '')}`} 
                  className="text-base text-foreground hover:text-primary"
                  data-testid="link-footer-phone"
                  onClick={() => trackEvent('phone_click', 'conversion', 'Footer Phone', phone)}
                >
                  {phone}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <a 
                  href={`mailto:${emailAddress}`} 
                  className="text-base text-foreground hover:text-primary"
                  data-testid="link-footer-email"
                >
                  {emailAddress}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div className="text-base text-foreground">
                  <p>{address}</p>
                  <p className="text-sm text-muted-foreground mt-1">Orlando, FL 32810</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-card-border">
              <h4 className="text-sm font-semibold text-foreground mb-2">Office Hours</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p>Saturday: By Appointment</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-base text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`link-footer-quick-${index}`}
                    onClick={() => {
                      if (link.label === 'Virtual Visit') {
                        trackEvent('virtual_visit_click', 'conversion', 'Footer Virtual Visit');
                      }
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Stay Connected</h3>
            <p className="text-base text-muted-foreground mb-4">
              Subscribe to our newsletter for mental health tips and updates.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg"
                data-testid="input-newsletter-email"
              />
              <Button
                className="rounded-lg"
                data-testid="button-subscribe"
                onClick={() => {
                  console.log('Subscribe:', email);
                  setEmail("");
                }}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-card-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Empathy Health Clinic. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60 mt-3">
            Empathy Health Clinic provides mental wellness and behavioral health services. We do not sell or advertise prescription drugs online.
          </p>
        </div>
      </div>
    </footer>
  );
}
