import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LongContactForm from "@/components/LongContactForm";
import OfficeMap from "@/components/OfficeMap";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function RequestAppointment() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <SiteHeader />
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Schedule Your Appointment
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Take the first step toward better mental health. Complete this brief form and we'll contact you within 24 hours.
              </p>
            </div>
            <LongContactForm />
            
            <div className="mt-16 pt-16 border-t">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Visit Our Office
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <OfficeMap />
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-start gap-3 mb-4">
                      <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Address</h3>
                        <p className="text-muted-foreground">2281 Lee Rd Suite 102</p>
                        <p className="text-muted-foreground">Winter Park, FL 32810</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-start gap-3 mb-4">
                      <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                        <a 
                          href="tel:3868488751" 
                          className="text-primary hover:underline"
                        >
                          386-848-8751
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-start gap-3 mb-4">
                      <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Email</h3>
                        <a 
                          href="mailto:providers@empathyhealthclinic.com" 
                          className="text-primary hover:underline"
                        >
                          providers@empathyhealthclinic.com
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Office Hours</h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                          <p>Saturday: By Appointment</p>
                          <p>Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
