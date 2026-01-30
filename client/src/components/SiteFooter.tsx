import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Phone, Calendar } from "lucide-react";
import { SiFacebook, SiInstagram, SiX, SiTiktok, SiLinkedin, SiYoutube } from "react-icons/si";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import type { SiteContent } from "@shared/schema";
import { trackEvent } from "@/lib/analytics";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function SiteFooter() {
  const [location] = useLocation();
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const { data: content } = useQuery<SiteContent>({
    queryKey: ["/api/site-content"],
  });

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      return await apiRequest("POST", "/api/newsletter/subscribe", { email });
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "You'll receive our weekly mental health newsletter.",
      });
      setEmail("");
    },
    onError: (error: Error) => {
      toast({
        title: "Subscription failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const phone = content?.footerPhone || "386-848-8751";
  const emailAddress = content?.footerEmail || "providers@empathyhealthclinic.com";
  const address = content?.footerAddress || "2281 Lee Rd Suite 102, Winter Park FL";

  const quickLinks = [
    { label: "Services", href: "/services" },
    { label: "Insurance", href: "/insurance" },
    { label: "Team", href: "/team" },
    { label: "Blog", href: "/blog" },
    { label: "Virtual Visit", href: "/virtual-therapy" },
    { label: "Request Appointment", href: "/request-appointment" }
  ];

  const legalLinks = [
    { label: "About Us", href: "/team" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Medical Disclaimer", href: "/medical-disclaimer" },
    { label: "HIPAA Notice", href: "/hipaa" },
    { label: "No Surprises Act", href: "/no-surprises-act" },
    { label: "Cookies Policy", href: "/cookies-policy" },
    { label: "Careers", href: "/careers" },
  ];

  const servicesLinks = [
    { label: "Psychiatric Evaluation", href: "/psychiatric-evaluation" },
    { label: "Medication Management", href: "/medication-management-orlando" },
    { label: "PTSD Treatment", href: "/ptsd-psychiatrist-orlando" },
    { label: "Stress Management", href: "/stress-management" },
    { label: "CBT Therapy", href: "/cognitive-behavioral-therapy" },
    { label: "EMDR Therapy", href: "/emdr-therapy" }
  ];

  const locationLinks = [
    { label: "Winter Park", href: "/psychiatrist-winter-park" },
    { label: "Altamonte Springs", href: "/locations/altamonte-springs" },
    { label: "Kissimmee", href: "/locations/kissimmee" },
    { label: "Orlando", href: "/psychiatrist-orlando" },
    { label: "Apopka", href: "/locations/apopka" },
    { label: "View All Locations", href: "/services" }
  ];

  const orlandoServicesLinks = [
    { label: "Psychiatrist Orlando", href: "/psychiatrist-orlando", primary: true },
    { label: "Psychiatry Orlando", href: "/psychiatry-orlando", primary: true },
    { label: "ADHD Psychiatrist Orlando", href: "/adhd-psychiatrist-orlando", primary: true },
    { label: "Psychiatrist Near Me", href: "/psychiatrist-near-me", primary: true },
    { label: "Medication Management", href: "/medication-management-orlando" },
    { label: "Anxiety Psychiatrist", href: "/anxiety-psychiatrist-orlando" },
    { label: "Depression Treatment", href: "/depression-treatment" },
    { label: "PTSD Treatment", href: "/ptsd-psychiatrist-orlando" },
    { label: "Urgent Psychiatric Care", href: "/urgent-psychiatric-care-orlando" },
    { label: "Telepsychiatry Orlando", href: "/telepsychiatry-orlando" },
    { label: "Psychiatrist Winter Park", href: "/psychiatrist-winter-park" },
    { label: "Accepts BCBS", href: "/psychiatrist-orlando-accepts-bcbs" },
    { label: "Accepts Cigna", href: "/psychiatrist-orlando-accepts-cigna" },
    { label: "Accepts Aetna", href: "/psychiatrist-orlando-accepts-aetna" },
    { label: "Accepts UMR", href: "/therapist-accepts-umr" },
    { label: "Accepts UHC", href: "/psychiatrist-orlando-accepts-united-healthcare" }
  ];

  return (
    <footer className="bg-card border-t border-card-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        {/* Orlando Psychiatry Services Band */}
        <div className="mb-12 pb-12 border-b border-card-border">
          <h3 className="text-2xl font-sans font-semibold mb-6 text-foreground text-center">
            Orlando Psychiatry Services
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {orlandoServicesLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`px-4 py-3 rounded-md text-sm text-center hover-elevate transition-colors ${
                  link.primary 
                    ? 'bg-primary/10 border-2 border-primary text-primary font-semibold hover:bg-primary/20' 
                    : 'bg-background border border-muted text-foreground hover:bg-primary/5 hover:border-primary'
                }`}
                data-testid={`link-footer-orlando-${index}`}
                aria-label={`${link.label} in Orlando Florida`}
                onClick={() => trackEvent('orlando_service_click', 'conversion', `Footer Orlando - ${link.label}`)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
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
                  className="text-base text-foreground hover:text-primary break-all"
                  data-testid="link-footer-email"
                >
                  {emailAddress}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div className="text-base text-foreground">
                  <p>{address}</p>
                  <p className="text-sm text-primary/90 font-medium mt-1">Serving Orlando, Winter Park & Central Florida</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-card-border">
              <h4 className="text-sm font-semibold text-foreground mb-2">Office Hours</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Monday - Saturday: 9:00 AM - 5:00 PM</p>
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
            <h3 className="text-xl font-semibold mb-4 text-foreground">Services</h3>
            <ul className="space-y-3">
              {servicesLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-base text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`link-footer-service-${index}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Locations</h3>
            <ul className="space-y-3">
              {locationLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-base text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`link-footer-location-${index}`}
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
              Get mental health tips & updates. We respect your privacy — no spam.
            </p>
            <div className="flex gap-2 mb-6">
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
                disabled={subscribeMutation.isPending || !email.trim()}
                onClick={() => {
                  if (email.trim()) {
                    subscribeMutation.mutate(email.trim());
                  }
                }}
              >
                {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>
            
            <div className="pt-4 border-t border-card-border">
              <h4 className="text-sm font-semibold text-foreground mb-3">Connect With Us</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.zocdoc.com/practice/empathy-health-clinic-75267"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-zocdoc"
                  aria-label="Book on ZocDoc"
                >
                  <Calendar className="w-6 h-6" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100083226165903"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-facebook"
                  aria-label="Facebook"
                >
                  <SiFacebook className="w-6 h-6" />
                </a>
                <a
                  href="https://x.com/clinicempathy12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-twitter"
                  aria-label="Twitter/X"
                >
                  <SiX className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/empathyhealthfl/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-instagram"
                  aria-label="Instagram"
                >
                  <SiInstagram className="w-6 h-6" />
                </a>
                <a
                  href="https://www.tiktok.com/@empathy.health.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-tiktok"
                  aria-label="TikTok"
                >
                  <SiTiktok className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/company/empathy-health-clinic/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-linkedin"
                  aria-label="LinkedIn"
                >
                  <SiLinkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://www.youtube.com/@EmpathyHealthClinic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-youtube"
                  aria-label="YouTube"
                >
                  <SiYoutube className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Section - Hide on homepage and request-appointment page (both have LocationSection) */}
        {location !== '/request-appointment' && location !== '/' && (
          <div className="pt-8 border-t border-card-border">
            <h3 className="text-xl font-semibold mb-6 text-foreground text-center">Visit Our Clinic</h3>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.0746!2d-81.3503!3d28.5947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e77b3b0c9c0001%3A0x1!2s2281%20Lee%20Rd%20%23102%2C%20Winter%20Park%2C%20FL%2032810!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Empathy Health Clinic Location Map"
                  data-testid="map-embed-footer"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Location</h4>
                  <p className="text-muted-foreground">{address}</p>
                  <p className="text-muted-foreground">Winter Park, FL 32810</p>
                </div>
                <div>
                  <Button 
                    asChild
                    variant="outline"
                    data-testid="button-get-directions"
                    onClick={() => trackEvent('directions_click', 'conversion', 'Footer Directions')}
                  >
                    <a 
                      href="https://www.google.com/maps/dir/?api=1&destination=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Get Directions
                    </a>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Serving Winter Park, Orlando, Altamonte Springs, and surrounding Central Florida areas.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="pt-8 border-t border-card-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Empathy Health Clinic. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {legalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground/70 mb-2 text-center">
            Licensed mental health providers | FL License # | Psychiatrist Orlando FL
          </p>
          <p className="text-xs text-muted-foreground/60 text-center">
            Empathy Health Clinic provides mental wellness and behavioral health services. We do not sell or advertise prescription drugs online.
          </p>
        </div>
      </div>
    </footer>
  );
}
