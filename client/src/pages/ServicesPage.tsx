import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Loader2, FileText, PawPrint, Brain, Stethoscope, ArrowRight, MapPin, Phone, Clock, CheckCircle2, Mail, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { Treatment, Therapy } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import HeroLeadForm from "@/components/HeroLeadForm";
const forestBg = "/site-assets/stock_images/calm_forest_trees_me_0c56a0e8.webp";
import { trackEvent } from "@/lib/analytics";
import TextUsButton from "@/components/TextUsButton";

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
      link: "/services"
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
      link: "/services"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Mental Health Clinic Near You | Winter Park & Orlando FL"
        description="Local mental health clinic serving Winter Park & Orlando. Board-certified psychiatrists & therapists near you. Same-week appointments, in-person & telehealth. 2281 Lee Rd Suite 102. Call 386-848-8751."
        keywords={["mental health clinic near me", "mental health clinic Winter Park", "mental health clinic Orlando", "psychiatric clinic near me", "therapy near me", "psychiatrist near me", "mental health services near me"]}
        canonicalPath="/services"
        preloadImage={forestBg}
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
            <div className="flex flex-col space-y-8 md:space-y-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white" data-testid="text-page-title">
                Mental Health Clinic in Winter Park & Orlando, FL
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Full-service mental health clinic with board-certified psychiatrists and licensed therapists. Medication management, psychiatric evaluations, CBT, DBT, EMDR, and therapy services in Winter Park and Orlando. Comprehensive care tailored to your needs.
              </p>
              
              {/* Hero Lead Form */}
              <div className="w-full max-w-5xl mx-auto">
                <HeroLeadForm />
              </div>

              {/* Phone/Text Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  size="lg" 
                  className=""
                  asChild 
                  data-testid="button-hero-call"
                  onClick={() => trackEvent('phone_click', 'conversion', 'Services Page - Hero CTA')}
                >
                  <a href="tel:3868488751" className="flex items-center justify-center gap-2">
                    <Phone className="h-5 w-5" />
                    Call (386) 848-8751
                  </a>
                </Button>
                <TextUsButton 
                  variant="hero" 
                  size="lg" 
                  location="hero-services"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Key Benefits Bar */}
        <section className="py-8 bg-card border-b">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-lg font-semibold text-foreground">4.8</span>
                <span className="text-sm text-muted-foreground">Google Reviews</span>
              </div>
              <div className="hidden lg:block h-6 w-px bg-border" />
              <VerifiedOnBadge />
              <div className="hidden lg:block h-6 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Same-Week Appointments Available</span>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Contact Banner - Optimized for "mental health clinic near me" */}
        <section className="py-8 bg-primary/5 border-y">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3" data-testid="location-info">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Our Winter Park Location</h3>
                  <p className="text-sm text-muted-foreground">
                    2281 Lee Rd Suite 102<br />
                    Winter Park, FL 32810
                  </p>
                  <a 
                    href="https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810" 
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
                  <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
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
                    Mon-Sat: 9:00 AM - 6:00 PM<br />
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

        {/* Insurance Section */}
        <InsuranceSection />

        <section className="py-16 md:py-20 bg-card border-y">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-sans font-bold text-foreground mb-6 text-center">Your Trusted Mental Health Clinic in Winter Park & Orlando</h2>
              
              <p className="text-foreground leading-relaxed mb-6">
                Empathy Health Clinic is a full-service <Link href="/mental-health-clinic-orlando" className="text-primary hover:underline font-medium">mental health clinic</Link> serving Winter Park, Orlando, and Central Florida. Whether you're searching for a <Link href="/psychiatrist-near-me" className="text-primary hover:underline font-medium">psychiatrist near me</Link> or <Link href="/psychiatry-near-me" className="text-primary hover:underline font-medium">psychiatry near me</Link>, our clinic provides comprehensive psychiatric services including medication management, psychiatric evaluations, CBT, DBT, EMDR, and specialized therapy. Our <Link href="/psychiatrist-orlando" className="text-primary hover:underline font-medium">board-certified psychiatrists</Link> and licensed therapists work collaboratively to deliver personalized care for <Link href="/psychiatrist-for-anxiety-near-me" className="text-primary hover:underline font-medium">anxiety</Link>, <Link href="/psychiatrist-for-depression-near-me" className="text-primary hover:underline font-medium">depression</Link>, <Link href="/adhd-psychiatrist-orlando" className="text-primary hover:underline font-medium">ADHD</Link>, trauma, bipolar disorder, and relationship challenges. As your local <Link href="/psychiatrist-orlando" className="text-primary hover:underline font-medium">psychiatry clinic in Orlando</Link>, we're here to support your journey toward better mental health.
              </p>

              <h3 className="text-2xl font-sans font-semibold text-foreground mb-4 mt-8">Our Treatment Philosophy</h3>
              
              <p className="text-foreground leading-relaxed mb-6">
                Our Winter Park clinic serving the Orlando area offers a collaborative approach where psychiatrists and therapists work together to create integrated treatment plans combining medication management with therapeutic interventions like Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), and EMDR for trauma. This ensures comprehensive care tailored to your unique needs, rather than a one-size-fits-all approach.
              </p>

              <p className="text-foreground leading-relaxed mb-6">
                We take time to understand your specific situation before recommending treatment. With both <Link href="/telepsychiatry-orlando" className="text-primary hover:underline font-medium">telepsychiatry</Link> and <Link href="/in-person-therapy" className="text-primary hover:underline font-medium">in-person sessions</Link> available at our Winter Park location, quality mental health care is accessible and convenient for patients throughout the Orlando area. Our <Link href="/online-psychiatrist-orlando" className="text-primary hover:underline font-medium">online psychiatry</Link> services make it easy to get care from home. Same-week appointments are often available for new patients—when you're ready to seek help, you shouldn't have to wait weeks to get started.
              </p>

              <h3 className="text-2xl font-sans font-semibold text-foreground mb-4 mt-8">What Sets Us Apart</h3>
              
              <p className="text-foreground leading-relaxed mb-6">
                Our Winter Park team serving the greater Orlando area includes board-certified psychiatrists, licensed therapists, and <Link href="/mental-health-doctor-orlando" className="text-primary hover:underline font-medium">mental health doctors</Link> who bring years of experience treating depression, anxiety, ADHD, bipolar disorder, PTSD, and other conditions. Looking for the <Link href="/best-psychiatrist-orlando" className="text-primary hover:underline font-medium">best psychiatrist in Orlando</Link>? We accept most major <Link href="/insurance" className="text-primary hover:underline font-medium">insurance plans</Link> including Aetna, Blue Cross Blue Shield, Cigna, Humana, UnitedHealthcare, and Medicare, making quality <Link href="/medication-management-orlando" className="text-primary hover:underline font-medium">medication management</Link> and therapy services financially accessible.
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
              {therapies?.map((therapy, index) => (
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

        {/* Priority SEO Internal Links Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-sans font-bold text-foreground mb-3">
                Find Your Mental Health Specialist
              </h2>
              <p className="text-muted-foreground">
                Browse our specialized psychiatric and therapy services
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <Link href="/psychiatrist-near-me" className="group">
                <div className="p-4 bg-card border rounded-lg text-center hover-elevate transition-all h-full">
                  <span className="text-sm font-medium text-foreground group-hover:text-primary">Psychiatrist Near Me</span>
                </div>
              </Link>
              <Link href="/psychiatrist-orlando" className="group">
                <div className="p-4 bg-card border rounded-lg text-center hover-elevate transition-all h-full">
                  <span className="text-sm font-medium text-foreground group-hover:text-primary">Psychiatrist Orlando</span>
                </div>
              </Link>
              <Link href="/anxiety-psychiatrist-orlando" className="group">
                <div className="p-4 bg-card border rounded-lg text-center hover-elevate transition-all h-full">
                  <span className="text-sm font-medium text-foreground group-hover:text-primary">Anxiety Psychiatrist</span>
                </div>
              </Link>
              <Link href="/depression-psychiatrist-orlando" className="group">
                <div className="p-4 bg-card border rounded-lg text-center hover-elevate transition-all h-full">
                  <span className="text-sm font-medium text-foreground group-hover:text-primary">Depression Psychiatrist</span>
                </div>
              </Link>
              <Link href="/adhd-psychiatrist-orlando" className="group">
                <div className="p-4 bg-card border rounded-lg text-center hover-elevate transition-all h-full">
                  <span className="text-sm font-medium text-foreground group-hover:text-primary">ADHD Psychiatrist</span>
                </div>
              </Link>
              <Link href="/telepsychiatry-orlando" className="group">
                <div className="p-4 bg-card border rounded-lg text-center hover-elevate transition-all h-full">
                  <span className="text-sm font-medium text-foreground group-hover:text-primary">Telepsychiatry</span>
                </div>
              </Link>
              <Link href="/psychiatric-services" className="group">
                <div className="p-4 bg-card border rounded-lg text-center hover-elevate transition-all h-full">
                  <span className="text-sm font-medium text-foreground group-hover:text-primary">Medication Management</span>
                </div>
              </Link>
              <Link href="/psychiatric-evaluation-orlando" className="group">
                <div className="p-4 bg-card border rounded-lg text-center hover-elevate transition-all h-full">
                  <span className="text-sm font-medium text-foreground group-hover:text-primary">Psychiatric Evaluation</span>
                </div>
              </Link>
              <Link href="/best-psychiatrist-orlando" className="group">
                <div className="p-4 bg-card border rounded-lg text-center hover-elevate transition-all h-full">
                  <span className="text-sm font-medium text-foreground group-hover:text-primary">Best Psychiatrist</span>
                </div>
              </Link>
              <Link href="/psychiatrist-winter-park" className="group">
                <div className="p-4 bg-card border rounded-lg text-center hover-elevate transition-all h-full">
                  <span className="text-sm font-medium text-foreground group-hover:text-primary">Winter Park</span>
                </div>
              </Link>
              <Link href="/new-patients" className="group">
                <div className="p-4 bg-card border rounded-lg text-center hover-elevate transition-all h-full">
                  <span className="text-sm font-medium text-foreground group-hover:text-primary">New Patients</span>
                </div>
              </Link>
              <Link href="/online-psychiatrist-orlando" className="group">
                <div className="p-4 bg-card border rounded-lg text-center hover-elevate transition-all h-full">
                  <span className="text-sm font-medium text-foreground group-hover:text-primary">Online Psychiatrist</span>
                </div>
              </Link>
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

        {/* Trust Badges */}
        <ReviewsAndBadges />
      </main>
      <SiteFooter />
    </div>
  );
}
