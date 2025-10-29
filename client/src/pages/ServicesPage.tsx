import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Loader2, FileText, PawPrint, Brain, Stethoscope, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Treatment, Therapy } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
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
        title="Mental Health Services | Empathy Health Clinic | Florida"
        description="Comprehensive mental health services including psychiatric evaluations, medication management, therapy, counseling, and ESA letters. Expert care from licensed providers in Florida."
        keywords={["mental health services", "psychiatric services", "therapy services", "medication management", "psychiatric evaluation", "ESA letters", "Florida mental health"]}
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
              Our Services
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Comprehensive mental health care tailored to your unique needs. From psychiatric evaluations to specialized therapy and evidence-based treatments.
            </p>
          </div>
        </div>

        <section className="py-16 md:py-20 bg-card border-y">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-sans font-bold text-foreground mb-6 text-center">Comprehensive Mental Health Care in Florida</h2>
              
              <p className="text-foreground leading-relaxed mb-6">
                At Empathy Health Clinic, we provide comprehensive mental health services that address the full spectrum of psychiatric and psychological needs. Our integrated approach combines psychiatric medication management, evidence-based therapy, and specialized treatment programs to deliver personalized care that produces lasting results. Whether you're seeking help for <Link href="/anxiety-disorders" className="text-primary hover:underline font-medium">anxiety</Link>, <Link href="/depression" className="text-primary hover:underline font-medium">depression</Link>, <Link href="/adhd" className="text-primary hover:underline font-medium">ADHD</Link>, trauma, or relationship challenges, our experienced team is here to support your journey toward better mental health.
              </p>

              <h3 className="text-2xl font-sans font-semibold text-foreground mb-4 mt-8">Our Treatment Philosophy</h3>
              
              <p className="text-foreground leading-relaxed mb-6">
                We believe that effective mental health treatment requires a holistic approach that addresses both the biological and psychological aspects of mental health conditions. Our psychiatrists and therapists work collaboratively to create integrated treatment plans that may combine medication management with therapeutic interventions for optimal outcomes. This collaborative model ensures that you receive comprehensive care tailored to your unique needs, rather than a one-size-fits-all approach.
              </p>

              <p className="text-foreground leading-relaxed mb-6">
                Every person's mental health journey is different, which is why we take time to truly understand your specific situation, goals, and preferences before recommending treatment. We offer both <Link href="/virtual-counseling-services" className="text-primary hover:underline font-medium">virtual visits</Link> and <Link href="/in-person-therapy" className="text-primary hover:underline font-medium">in-person sessions</Link>, making quality mental health care accessible and convenient for patients throughout Florida. Our providers stay current with the latest research and treatment approaches, ensuring you receive evidence-based care that reflects best practices in the field.
              </p>

              <h3 className="text-2xl font-sans font-semibold text-foreground mb-4 mt-8">What Sets Us Apart</h3>
              
              <p className="text-foreground leading-relaxed mb-6">
                At Empathy Health Clinic, we pride ourselves on providing exceptional mental health care that prioritizes your comfort, privacy, and wellbeing. Our team includes board-certified psychiatrists, licensed therapists, and mental health professionals who bring years of experience and genuine compassion to their work. We accept most major <Link href="/insurance" className="text-primary hover:underline font-medium">insurance plans</Link>, making quality mental health care financially accessible for more patients.
              </p>

              <p className="text-foreground leading-relaxed mb-6">
                We understand that seeking mental health treatment can feel overwhelming, which is why we've designed our practice to be welcoming, supportive, and stigma-free. From your first phone call to ongoing treatment sessions, you'll experience a level of care and attention that makes you feel heard, understood, and valued. Same-week appointments are often available for new patients, because we believe that when you're ready to seek help, you shouldn't have to wait weeks to get started.
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
