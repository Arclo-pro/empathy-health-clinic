import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { trackEvent } from "@/lib/analytics";

export default function LocationSection() {
  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Location Section', '386-848-8751');
  };

  const handleEmailClick = () => {
    trackEvent('email_click', 'conversion', 'Location Section');
  };

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
            Visit Our Winter Park Clinic
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conveniently located in Winter Park, serving the greater Orlando area
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Map */}
          <div className="order-2 md:order-1">
            <div className="rounded-lg overflow-hidden border shadow-sm h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1234567890!2d-81.36537!3d28.59544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e7700f5e5e5e5e%3A0x1234567890abcdef!2s2281%20Lee%20Rd%20Suite%20102%2C%20Winter%20Park%2C%20FL%2032810!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Empathy Health Clinic Location"
                data-testid="map-embed"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="order-1 md:order-2 space-y-6">
            <Card data-testid="card-location-info">
              <CardContent className="p-6 space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Address</h3>
                    <address className="text-muted-foreground not-italic" data-testid="text-address">
                      2281 Lee Rd Suite 102<br />
                      Winter Park, FL 32810
                    </address>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=2281+Lee+Rd+Suite+102,+Winter+Park,+FL+32810"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 text-sm underline mt-2 inline-block"
                      data-testid="link-directions"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Office Hours</h3>
                    <div className="text-muted-foreground space-y-1" data-testid="text-hours">
                      <p>Monday - Saturday: 9:00 AM - 5:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <a
                      href="tel:3868488751"
                      onClick={handlePhoneClick}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      data-testid="link-phone"
                    >
                      386-848-8751
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <a
                      href="mailto:providers@empathyhealthclinic.com"
                      onClick={handleEmailClick}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      data-testid="link-email"
                    >
                      providers@empathyhealthclinic.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Button */}
            <Button 
              asChild
              size="lg" 
              className="w-full"
              data-testid="button-request-appointment"
            >
              <Link href="/request-appointment">
                Request an Appointment
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
