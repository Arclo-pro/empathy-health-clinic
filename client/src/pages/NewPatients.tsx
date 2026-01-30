import { Phone, Mail, Calendar, CheckCircle2, FileText, UserPlus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ShortContactForm from "@/components/ShortContactForm";
import SEOHead from "@/components/SEOHead";
const forestBg = "/site-assets/stock_images/peaceful_green_fores_98e1a8d8.jpg";
import InternalLinkBlock from "@/components/InternalLinkBlock";

export default function NewPatients() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Psychiatrist Accepting New Patients Orlando | 2026"
        description="Find a psychiatrist accepting new patients in Orlando, FL. Same-week appointments available for psychiatry, therapy & counseling. Board-certified providers, most insurance accepted. Call (386) 848-8751."
        keywords={["psychiatrist accepting new patients orlando", "psychiatrist accepting new patients", "new patient psychiatrist orlando", "psychiatrist taking new patients orlando", "mental health accepting new patients", "therapist accepting patients orlando"]}
        canonicalPath="/new-patients"
      />
      <SiteHeader />
      <main className="flex-1">
        <div className="relative py-20 px-4">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${forestBg})`, filter: 'brightness(1.3)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
          </div>
          <div className="container mx-auto max-w-4xl relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/90 mb-4">
              <UserPlus className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 text-white" data-testid="text-page-title">
              Psychiatrist Accepting New Patients in Orlando
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Looking for a <strong>psychiatrist accepting new patients in Orlando</strong>? Empathy Health Clinic offers same-week appointments for psychiatry, therapy, and counseling services throughout Central Florida. Board-certified providers with in-person and telehealth options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" asChild data-testid="button-call-now">
                <a href="tel:3868488751">
                  <Phone className="h-5 w-5" />
                  Call (386) 848-8751
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20" asChild data-testid="button-request-appointment">
                <a href="/request-appointment">
                  <Calendar className="h-5 w-5" />
                  Request Appointment
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-card border rounded-lg p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Same-Week Appointments
              </h3>
              <p className="text-muted-foreground">
                We typically offer appointments within the same week for new patients. Fast access to care when you need it most.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Most Insurance Accepted
              </h3>
              <p className="text-muted-foreground">
                We accept Aetna, Blue Cross Blue Shield, Cigna, Humana, UnitedHealthcare, and more. Self-pay options available.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Telehealth Available
              </h3>
              <p className="text-muted-foreground">
                Convenient virtual visits available for therapy and medication management. See your provider from home.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                How to Get Started
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Contact Us
                    </h3>
                    <p className="text-muted-foreground">
                      Call us at (386) 848-8751 or request an appointment online. Our friendly staff will help you schedule your first visit.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Complete Intake Forms
                    </h3>
                    <p className="text-muted-foreground">
                      We'll send you simple intake paperwork to complete before your first appointment. This helps us understand your needs.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Attend Your First Visit
                    </h3>
                    <p className="text-muted-foreground">
                      Meet with your provider for a comprehensive evaluation. We'll develop a personalized treatment plan together.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      4
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Begin Treatment
                    </h3>
                    <p className="text-muted-foreground">
                      Start your journey to better mental health with ongoing support from our experienced team.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Services for New Patients
              </h2>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Psychiatric Evaluations:</strong>
                    <span className="text-muted-foreground"> Comprehensive mental health assessments and diagnosis</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Medication Management:</strong>
                    <span className="text-muted-foreground"> Expert psychiatric medication management and monitoring</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Individual Therapy:</strong>
                    <span className="text-muted-foreground"> One-on-one counseling with licensed therapists</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Couples & Family Therapy:</strong>
                    <span className="text-muted-foreground"> Relationship and family counseling services</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Specialized Treatment:</strong>
                    <span className="text-muted-foreground"> CBT, EMDR, trauma therapy, and more</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-2">
                  Questions About Insurance?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Our staff can verify your insurance benefits before your first appointment. We'll help you understand your coverage and any out-of-pocket costs.
                </p>
                <Button variant="outline" asChild>
                  <a href="/insurance">View Insurance Plans</a>
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
                Ready to Schedule Your First Appointment?
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                Contact us today to get started. Our team is here to answer your questions and help you begin your mental health journey.
              </p>
              <ShortContactForm serviceName="New Patient Appointment" />
            </div>
          </div>
        </div>

        <section className="container mx-auto px-4 py-16 max-w-6xl">
          <InternalLinkBlock 
            category="services"
            title="Related Services"
            variant="list"
          />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
