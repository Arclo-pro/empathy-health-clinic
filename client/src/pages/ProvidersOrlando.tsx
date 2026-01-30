import { useQuery } from "@tanstack/react-query";
import { Loader2, Mail, Phone, ArrowRight, MapPin, Clock, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import type { TeamMember } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
const forestBg = "/site-assets/stock_images/misty_forest_morning_dffbe3b2.jpg";
import { trackEvent } from "@/lib/analytics";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Empathy Health Clinic - Orlando Mental Health Providers",
  "description": "Board-certified psychiatrists and licensed therapists in Orlando, FL. Same-week appointments available. Most insurance accepted.",
  "url": "https://empathyhealthclinic.com/providers/orlando",
  "telephone": "+1-386-848-8751",
  "email": "providers@empathyhealthclinic.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2281 Lee Rd Suite 102",
    "addressLocality": "Winter Park",
    "addressRegion": "FL",
    "postalCode": "32789",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "28.5997",
    "longitude": "-81.3644"
  },
  "areaServed": [
    { "@type": "City", "name": "Orlando", "containedInPlace": { "@type": "State", "name": "Florida" } },
    { "@type": "City", "name": "Winter Park", "containedInPlace": { "@type": "State", "name": "Florida" } },
    { "@type": "City", "name": "Altamonte Springs", "containedInPlace": { "@type": "State", "name": "Florida" } }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    }
  ],
  "priceRange": "$$",
  "medicalSpecialty": ["Psychiatry", "Psychology", "Mental Health"]
};

export default function ProvidersOrlando() {
  const { data: teamMembers, isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team-members"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Orlando Mental Health Providers | Psychiatrists"
        description="Board-certified psychiatrists and licensed therapists in Orlando, FL. Same-week appointments available. Most insurance accepted. Call 386-848-8751."
        keywords={["Orlando psychiatrists", "Orlando therapists", "mental health providers Orlando FL", "psychiatrists accepting new patients Orlando", "therapists Winter Park", "mental health Altamonte Springs"]}
        canonicalPath="/providers/orlando"
        jsonLd={localBusinessSchema}
      />
      <SiteHeader />
      <main className="flex-1">
        <div className="relative py-20 px-4">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${forestBg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
          </div>
          <div className="container mx-auto max-w-6xl relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 text-white" data-testid="text-page-title">
              Orlando Psychiatrists & Therapists
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Board-certified psychiatrists and licensed therapists serving Orlando, Winter Park, and Altamonte Springs. Same-week appointments available.
            </p>
          </div>
        </div>

        <section className="py-12 bg-card border-b">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg border">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Serving Central Florida</h3>
                  <p className="text-sm text-muted-foreground">Orlando, Winter Park, Altamonte Springs & surrounding areas</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg border">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Same-Week Appointments</h3>
                  <p className="text-sm text-muted-foreground">New patients often seen within days</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg border">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Insurance Accepted</h3>
                  <p className="text-sm text-muted-foreground">Most major insurance plans accepted</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 bg-background border-b">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <h2 className="text-xl font-sans font-bold text-foreground mb-4 text-center">Related Resources</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/providers"
                className="block p-4 bg-card border rounded-lg hover-elevate text-center"
                data-testid="link-all-providers"
                onClick={() => trackEvent('internal_link_click', 'navigation', 'Providers Orlando Page', '/providers')}
              >
                <span className="font-medium text-foreground">All Providers</span>
                <ArrowRight className="h-4 w-4 mx-auto mt-2 text-primary" />
              </Link>
              <Link
                href="/psychiatrist-orlando"
                className="block p-4 bg-card border rounded-lg hover-elevate text-center"
                data-testid="link-psychiatrist-orlando"
                onClick={() => trackEvent('internal_link_click', 'navigation', 'Providers Orlando Page', '/psychiatrist-orlando')}
              >
                <span className="font-medium text-foreground">Psychiatrist Orlando</span>
                <ArrowRight className="h-4 w-4 mx-auto mt-2 text-primary" />
              </Link>
              <Link
                href="/services"
                className="block p-4 bg-card border rounded-lg hover-elevate text-center"
                data-testid="link-services"
                onClick={() => trackEvent('internal_link_click', 'navigation', 'Providers Orlando Page', '/services')}
              >
                <span className="font-medium text-foreground">Our Services</span>
                <ArrowRight className="h-4 w-4 mx-auto mt-2 text-primary" />
              </Link>
              <Link
                href="/insurance"
                className="block p-4 bg-card border rounded-lg hover-elevate text-center"
                data-testid="link-insurance"
                onClick={() => trackEvent('internal_link_click', 'navigation', 'Providers Orlando Page', '/insurance')}
              >
                <span className="font-medium text-foreground">Insurance Accepted</span>
                <ArrowRight className="h-4 w-4 mx-auto mt-2 text-primary" />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
                Meet Our Orlando Providers
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Click on any provider to learn more about their background, specialties, and approach to care
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {teamMembers?.map((member, index) => (
                <Link
                  key={member.id}
                  href={`/team/${member.slug}`}
                  className="block"
                  data-testid={`link-provider-${index}`}
                  onClick={() => trackEvent('provider_click', 'engagement', 'Providers Orlando Page', member.name)}
                >
                  <div
                    className="bg-card border rounded-lg hover-elevate transition-all duration-200 cursor-pointer h-full"
                    data-testid={`provider-card-${index}`}
                  >
                    <div className="aspect-[4/5] rounded-t-lg overflow-hidden bg-muted">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover object-top"
                          width="300"
                          height="375"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                          <span className="text-5xl font-semibold text-primary/40">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-sans font-bold text-foreground mb-2">
                        {member.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {member.credentials}
                      </p>
                      <span className="text-primary font-medium hover:underline">
                        View Profile →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-card border-y">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-sans font-bold text-foreground mb-6 text-center">Mental Health Care in Orlando</h2>
              
              <p className="text-foreground leading-relaxed mb-6">
                Our team of board-certified psychiatrists and licensed therapists provides comprehensive mental health care to residents of <strong>Orlando</strong>, <strong>Winter Park</strong>, <strong>Altamonte Springs</strong>, and surrounding Central Florida communities. We specialize in treating anxiety, depression, ADHD, PTSD, bipolar disorder, and other mental health conditions.
              </p>

              <p className="text-foreground leading-relaxed mb-6">
                Located conveniently in Winter Park, our clinic offers both in-person and telehealth appointments for patients throughout the Orlando metro area. Whether you're seeking medication management, psychotherapy, or a combination of both, our collaborative approach ensures you receive personalized care tailored to your unique needs.
              </p>

              <p className="text-foreground leading-relaxed">
                New patients are typically seen within the same week. We accept most major insurance plans and offer affordable self-pay options. Contact us today to schedule your first appointment with one of our Orlando mental health providers.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-6">
              Schedule Your Appointment Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our Orlando psychiatrists and therapists are accepting new patients. Most insurance plans accepted.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                asChild 
                data-testid="button-schedule"
                onClick={() => trackEvent('phone_click', 'conversion', 'Providers Orlando Page Phone', '386-848-8751')}
              >
                <a href="tel:3868488751" className="gap-2">
                  <Phone className="h-5 w-5" />
                  Call 386-848-8751
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                data-testid="button-email"
                onClick={() => trackEvent('email_click', 'conversion', 'Providers Orlando Page Email')}
              >
                <a href="mailto:providers@empathyhealthclinic.com" className="gap-2">
                  <Mail className="h-5 w-5" />
                  Email Us
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
