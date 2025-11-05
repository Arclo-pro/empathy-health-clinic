import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Loader2, FileText, PawPrint, Brain, Stethoscope, ArrowRight, MapPin, Phone, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { Treatment, Therapy } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import HeroLeadForm from "@/components/HeroLeadForm";
import forestBg from "@assets/stock_images/calm_forest_trees_me_0c56a0e8.jpg";
import { trackEvent } from "@/lib/analytics";

export default function ServicesPage() {
  const { data: treatments, isLoading: treatmentsLoading } = useQuery<Treatment[]>({
    queryKey: ["/api/treatments"],
  });
  
  const { data: therapies, isLoading: therapiesLoading } = useQuery<Therapy[]>({
    queryKey: ["/api/therapies"],
  });

  const isLoading = treatmentsLoading || therapiesLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const featuredServices = [
    {
      icon: Stethoscope,
      title: "Psychiatric Evaluations",
      description: "Comprehensive mental health assessments conducted by licensed psychiatrists. We evaluate symptoms, medical history, and provide accurate diagnoses to guide your treatment plan.",
      features: [
        "Initial diagnostic evaluations",
        "Medication management assessments",
        "Second opinion consultations",
        "Treatment progress evaluations"
      ],
      link: "/psychiatric-evaluation"
    },
    {
      icon: Brain,
      title: "Medication Management",
      description: "Expert psychiatric medication management with ongoing monitoring and adjustments. Our psychiatrists work with you to find the right medications to manage your symptoms effectively.",
      features: [
        "Personalized medication plans",
        "Regular monitoring and adjustments",
        "Side effect management",
        "Coordination with other providers"
      ],
      link: "/medication-management"
    },
    {
      icon: FileText,
      title: "Psychotherapy & Counseling",
      description: "Evidence-based therapy approaches delivered by licensed therapists. Individual, couples, and family therapy sessions tailored to your specific needs and goals.",
      features: [
        "Cognitive Behavioral Therapy (CBT)",
        "Dialectical Behavior Therapy (DBT)",
        "Trauma-focused therapy",
        "Individual and couples counseling"
      ],
      link: "/therapy"
    },
    {
      icon: PawPrint,
      title: "ESA Letters",
      description: "Emotional Support Animal (ESA) letters for housing and travel. Our licensed mental health professionals evaluate your need for an ESA and provide legitimate documentation.",
      features: [
        "Housing accommodation letters",
        "Legitimate clinical evaluation",
        "Same-week appointments available",
        "Compliant with Fair Housing Act"
      ],
      link: "/esa-letter"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Mental Health Clinic Near You | Winter Park & Orlando FL"
        description="Local mental health clinic serving Winter Park & Orlando. Board-certified psychiatrists & therapists near you. Same-week appointments, in-person & telehealth. 1155 Louisiana Ave Suite 202. Call 386-848-8751."
        keywords={["mental health clinic near me", "mental health clinic Winter Park", "mental health clinic Orlando", "psychiatric clinic near me", "therapy near me", "psychiatrist near me", "mental health services near me"]}
        canonicalPath="/services"
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
              Mental Health Clinic in Winter Park & Orlando, FL
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Full-service mental health clinic with board-certified psychiatrists and licensed therapists. Medication management, psychiatric evaluations, CBT, DBT, EMDR, and therapy services in Winter Park and Orlando. Comprehensive care tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Button 
                size="lg" 
                asChild 
                data-testid="button-hero-request-appointment"
                onClick={() => trackEvent('appointment_request', 'conversion', 'Services Page - Hero CTA')}
              >
                <Link href="/request-appointment" className="flex items-center justify-center gap-2">
                  <Mail className="h-5 w-5" />
                  Request Appointment
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20 text-white hover:text-white"
                asChild 
                data-testid="button-hero-call"
                onClick={() => trackEvent('phone_click', 'conversion', 'Services Page - Hero CTA')}
              >
                <a href="tel:3868488751" className="flex items-center justify-center gap-2">
                  <Phone className="h-5 w-5" />
                  Call (386) 848-8751
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Location & Contact Banner - Optimized for "mental health clinic near me" */}
        <section className="py-8 bg-primary/5 border-y">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3" data-testid="location-info">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Our Winter Park Location</h3>
                  <p className="text-sm text-muted-foreground">
                    1155 Louisiana Ave Suite 202<br />
                    Winter Park, FL 32789
                  </p>
                  <a 
                    href="https://maps.google.com/?q=1155+Louisiana+Ave+Suite+202+Winter+Park+FL+32789" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline mt-1 inline-block"
                    data-testid="link-directions"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3" data-testid="contact-info">
                <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Call or Text</h3>
                  <a 
                    href="tel:386-848-8751" 
                    className="text-lg font-bold text-primary hover:underline"
                    data-testid="link-phone"
                  >
                    386-848-8751
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Same-week appointments available
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3" data-testid="hours-info">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Office Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Mon-Fri: 9:00 AM - 6:00 PM<br />
                    Telehealth available
                  </p>
                  <p className="text-sm text-primary mt-1 font-medium">
                    <CheckCircle2 className="h-4 w-4 inline mr-1" />
                    Accepting new patients
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Form Section */}
        <section className="py-12 bg-background border-b">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <HeroLeadForm />
          </div>
        </section>

        <section className="py-16 md:py-20 bg-card border-y">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-sans font-bold text-foreground mb-6 text-center">Your Trusted Mental Health Clinic in Winter Park & Orlando</h2>
              
              <p className="text-foreground leading-relaxed mb-6">
                Empathy Health Clinic is a full-service mental health clinic serving Winter Park, Orlando, and Central Florida. Our clinic provides comprehensive psychiatric services including medication management, psychiatric evaluations, CBT, DBT, EMDR, and specialized therapy. Our board-certified psychiatrists and licensed therapists work collaboratively to deliver personalized care for <Link href="/anxiety-disorders" className="text-primary hover:underline font-medium">anxiety</Link>, <Link href="/depression" className="text-primary hover:underline font-medium">depression</Link>, <Link href="/adhd" className="text-primary hover:underline font-medium">ADHD</Link>, trauma, bipolar disorder, and relationship challenges. As your local mental health clinic, we're here to support your journey toward better mental health.
              </p>

              <h3 className="text-2xl font-sans font-semibold text-foreground mb-4 mt-8">Our Treatment Philosophy</h3>
              
              <p className="text-foreground leading-relaxed mb-6">
                Our Winter Park clinic serving the Orlando area offers a collaborative approach where psychiatrists and therapists work together to create integrated treatment plans combining medication management with therapeutic interventions like Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), and EMDR for trauma. This ensures comprehensive care tailored to your unique needs, rather than a one-size-fits-all approach.
              </p>

              <p className="text-foreground leading-relaxed mb-6">
                We take time to understand your specific situation before recommending treatment. With both <Link href="/virtual-counseling-services" className="text-primary hover:underline font-medium">telehealth</Link> and <Link href="/in-person-therapy" className="text-primary hover:underline font-medium">in-person sessions</Link> available at our Winter Park location, quality mental health care is accessible and convenient for patients throughout the Orlando area. Same-week appointments are often available for new patients—when you're ready to seek help, you shouldn't have to wait weeks to get started.
              </p>

              <h3 className="text-2xl font-sans font-semibold text-foreground mb-4 mt-8">What Sets Us Apart</h3>
              
              <p className="text-foreground leading-relaxed mb-6">
                Our Winter Park team serving the greater Orlando area includes board-certified psychiatrists, licensed therapists, and mental health professionals who bring years of experience treating depression, anxiety, ADHD, bipolar disorder, PTSD, and other conditions. We accept most major <Link href="/insurance" className="text-primary hover:underline font-medium">insurance plans</Link> including Aetna, Blue Cross Blue Shield, Cigna, Humana, UnitedHealthcare, and Medicare, making quality psychiatric and therapy services financially accessible.
              </p>

              <p className="text-foreground leading-relaxed mb-6">
                We understand that seeking mental health treatment can feel overwhelming, which is why we've designed our Winter Park practice to be welcoming, supportive, and stigma-free. From your first phone call to ongoing treatment sessions, you'll experience compassionate care that makes you feel heard and valued. Call 386-848-8751 to schedule with a psychiatrist or therapist in Winter Park or Orlando today.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
                Featured Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive psychiatric services, therapy, and specialized mental health care
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
              {featuredServices.map((service, index) => (
                <Link 
                  key={index} 
                  href={service.link} 
                  data-testid={`featured-service-link-${index}`}
                  onClick={() => trackEvent('featured_service_click', 'engagement', 'Services Page', service.title)}
                >
                  <Card className="hover-elevate cursor-pointer h-full" data-testid={`featured-service-${index}`}>
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <service.icon className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-sans">{service.title}</CardTitle>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-4">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4">
                        <span className="text-primary font-medium hover:underline">
                          Learn more →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-card border-y">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
                Why Choose Us
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Professional care you can trust
              </p>
            </div>
            <TrustFactors variant="compact" />
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Brain className="h-10 w-10 text-primary" />
                <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground">
                  Therapy Services
                </h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Evidence-based therapeutic approaches delivered by licensed professionals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {therapies?.slice(0, 6).map((therapy, index) => (
                <Link 
                  key={therapy.id} 
                  href={`/${therapy.slug}`} 
                  data-testid={`therapy-link-${index}`}
                  onClick={() => trackEvent('therapy_service_click', 'engagement', 'Services Page - Therapies', therapy.title)}
                >
                  <Card className="h-full hover-elevate cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-xl font-sans flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                        {therapy.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3">
                        {therapy.description}
                      </p>
                      <div className="mt-4">
                        <span className="text-primary font-medium hover:underline">
                          Learn more →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {therapies && therapies.length > 6 && (
              <div className="text-center mt-8">
                <Button size="lg" variant="outline" asChild data-testid="button-view-all-therapies">
                  <Link href="/therapy">
                    View All Therapy Services
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
                Treatment Programs
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Specialized treatment programs for specific mental health conditions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {treatments?.map((treatment, index) => (
                <Link 
                  key={treatment.id} 
                  href={`/${treatment.slug}`} 
                  data-testid={`treatment-link-${index}`}
                  onClick={() => trackEvent('treatment_click', 'engagement', 'Services Page - Treatments', treatment.title)}
                >
                  <Card className="h-full hover-elevate cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-xl font-sans">
                        {treatment.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3">
                        {treatment.description}
                      </p>
                      <div className="mt-4">
                        <span className="text-primary font-medium hover:underline">
                          Learn more →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-card border-t">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Take the first step toward better mental health. Schedule a consultation with our experienced team today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild data-testid="button-schedule-cta">
                <a href="tel:3868488751">
                  Call 386-848-8751
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-insurance-cta">
                <Link href="/insurance">
                  Check Insurance Coverage
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
