import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Loader2, FileText, PawPrint, Brain, Stethoscope, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Treatment, Therapy } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TrustFactors from "@/components/TrustFactors";
import forestBg from "@assets/stock_images/peaceful_green_fores_98e1a8d8.jpg";

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
      ]
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
      ]
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
      ]
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
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-white" data-testid="text-page-title">
              Our Services
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Comprehensive mental health care tailored to your unique needs. From psychiatric evaluations to specialized therapy and evidence-based treatments.
            </p>
          </div>
        </div>

        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Featured Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive psychiatric services, therapy, and specialized mental health care
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
              {featuredServices.map((service, index) => (
                <Card key={index} className="hover-elevate" data-testid={`featured-service-${index}`}>
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <service.icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-2xl font-serif">{service.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-card border-y">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
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
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                  Therapy Services
                </h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Evidence-based therapeutic approaches delivered by licensed professionals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {therapies?.slice(0, 6).map((therapy, index) => (
                <Link key={therapy.id} href={`/${therapy.slug}`} data-testid={`therapy-link-${index}`}>
                  <Card className="h-full hover-elevate cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-xl font-serif flex items-center gap-2">
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
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Treatment Programs
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Specialized treatment programs for specific mental health conditions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {treatments?.map((treatment, index) => (
                <Link key={treatment.id} href={`/${treatment.slug}`} data-testid={`treatment-link-${index}`}>
                  <Card className="h-full hover-elevate cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-xl font-serif">
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
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Take the first step toward better mental health. Schedule a consultation with our experienced team today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild data-testid="button-schedule-cta">
                <a href="tel:+14072038282">
                  Call (407) 203-8282
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
