import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import SEOFooterText from "@/components/SEOFooterText";
import LongContactForm from "@/components/LongContactForm";
import OfficeMap from "@/components/OfficeMap";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import InternalLinkBlock from "@/components/InternalLinkBlock";

export default function RequestAppointment() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <SEOHead
        title="Request Appointment | Empathy Health Clinic | Winter Park, FL"
        description="Schedule your mental health appointment online. Same-week appointments available for psychiatry, therapy, and counseling services. Contact us at 386-848-8751."
        keywords={["schedule appointment", "mental health appointment", "psychiatry appointment", "therapy appointment", "Winter Park FL", "mental health scheduling"]}
        canonicalPath="/request-appointment"
      />
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

        <section className="max-w-4xl mx-auto mt-16">
          <InternalLinkBlock 
            category="services"
            title="Related Services"
            variant="list"
          />
        </section>
      </main>
      <SEOFooterText>
        <p>
          Empathy Health Clinic provides comprehensive mental health services in Winter Park and Orlando, Florida. Our team of board-certified psychiatrists and licensed therapists specializes in treating anxiety, depression, ADHD, bipolar disorder, PTSD, and other mental health conditions. We offer both in-person appointments at our Winter Park office and secure telehealth sessions throughout Florida. Same-week appointments are available for new patients, and we accept most major insurance plans including Aetna, BlueCross BlueShield, Cigna, and UnitedHealthcare. Our psychiatrists provide medication management and psychiatric evaluations, while our therapists offer evidence-based counseling including cognitive behavioral therapy (CBT), dialectical behavior therapy (DBT), and EMDR trauma therapy. Schedule your confidential consultation today by completing the form above or calling our office directly.
        </p>
      </SEOFooterText>
      <SiteFooter />
    </div>
  );
}
