import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Loader2, ArrowLeft, Phone, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { InsuranceProvider, Condition } from "@shared/schema";
import forestBg from "@assets/stock_images/peaceful_green_fores_622c852f.jpg";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";

export default function ProviderCoverage() {
  const [, params] = useRoute("/:slug");
  const slug = params?.slug || "";

  const { data: provider, isLoading, error } = useQuery<InsuranceProvider>({
    queryKey: ["/api/insurance-providers/slug", slug],
    queryFn: async () => {
      const response = await fetch(`/api/insurance-providers/slug/${slug}`);
      if (!response.ok) {
        throw new Error("Provider not found");
      }
      return response.json();
    },
    enabled: !!slug,
  });

  const { data: conditions } = useQuery<Condition[]>({
    queryKey: ["/api/conditions"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !provider) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-2xl font-bold text-foreground mb-4">Provider Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find the insurance provider you're looking for.
          </p>
          <Button asChild data-testid="button-back-to-insurance">
            <Link href="/insurance">
              <ArrowLeft className="h-4 w-4 mr-2" />
              View All Providers
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${provider.name} Insurance Coverage | Empathy Health Clinic`}
        description={provider.heroDescription}
        keywords={[provider.name, "insurance coverage", "mental health insurance", "Florida psychiatry", "therapy insurance"]}
        canonicalPath={`/${provider.slug}`}
      />
      <SiteHeader />
      <div className="relative py-16 px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${forestBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20" />
        </div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <Link href="/insurance" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors" data-testid="link-back-to-insurance">
            <ArrowLeft className="h-4 w-4" />
            Back to All Insurance Providers
          </Link>
          <div className="flex items-center gap-6 mb-6">
            <div className="bg-white/95 rounded-lg p-4 h-24 w-32 flex items-center justify-center">
              <img
                src={provider.logo}
                alt={`${provider.name} logo`}
                className="max-h-16 max-w-full object-contain"
                data-testid="img-provider-logo"
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-sans font-bold mb-2 text-white" data-testid="text-hero-title">
                {provider.heroTitle}
              </h1>
            </div>
          </div>
          <p className="text-lg text-white/90 leading-relaxed" data-testid="text-hero-description">
            {provider.heroDescription}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                About {provider.name} Coverage
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground leading-relaxed" data-testid="text-description">
                  {provider.description}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                Coverage Details
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground leading-relaxed" data-testid="text-coverage-details">
                  {provider.coverageDetails}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                What We Treat
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {conditions?.map((condition) => (
                  <Link
                    key={condition.id}
                    href={`/${condition.slug}`}
                    className="flex items-start gap-2 hover-elevate active-elevate-2 rounded-md p-2 -ml-2 transition-all"
                    data-testid={`link-condition-${condition.slug}`}
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{condition.title}</span>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {(() => {
                  try {
                    const faqs = JSON.parse(provider.faqs || '[]');
                    return faqs.map((faq: { question: string; answer: string }, index: number) => (
                      <div key={index} className="border-l-4 border-primary pl-4">
                        <h3 className="font-semibold text-foreground mb-2" data-testid={`text-faq-question-${index}`}>
                          {faq.question}
                        </h3>
                        <p className="text-muted-foreground" data-testid={`text-faq-answer-${index}`}>
                          {faq.answer}
                        </p>
                      </div>
                    ));
                  } catch {
                    return null;
                  }
                })()}
              </div>
            </section>

            <section className="bg-card border rounded-lg p-6">
              <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                Our Services
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Psychiatric Evaluations:</strong>
                    <span className="text-muted-foreground"> Comprehensive assessment of your mental health needs</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Medication Management:</strong>
                    <span className="text-muted-foreground"> Expert prescribing and monitoring of psychiatric medications</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Individual Therapy:</strong>
                    <span className="text-muted-foreground"> Evidence-based counseling tailored to your needs</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Telehealth Options:</strong>
                    <span className="text-muted-foreground"> Convenient virtual appointments from home</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="md:col-span-1">
            <div className="bg-card border rounded-lg p-6 sticky top-4">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {provider.name === "Medicare" 
                  ? "Schedule a Medicare-Covered Appointment" 
                  : "Schedule an Appointment"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {provider.name === "Medicare"
                  ? "We accept all Medicare plans. Contact us today to schedule your Medicare-covered psychiatric appointment."
                  : `Ready to get started? Contact us today to verify your ${provider.name} benefits and schedule your first appointment.`}
              </p>
              <div className="space-y-3">
                <Button className="w-full" asChild data-testid="button-call-office">
                  <a href="tel:3868488751" className="flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4" />
                    Call 386-848-8751
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild data-testid="button-request-appointment">
                  <Link href="/request-appointment" className="flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" />
                    Request Appointment
                  </Link>
                </Button>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold text-foreground mb-3">Office Hours</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="text-foreground">9am - 5pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="text-foreground">By Appointment</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="text-foreground">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="contact-form" className="md:col-span-3 mt-16 scroll-mt-24">
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 rounded-xl p-8 md:p-12 shadow-lg">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 break-words">
                    {provider.name === "Medicare" 
                      ? "Schedule Your Medicare-Covered Appointment" 
                      : `Verify Your ${provider.name} Benefits`}
                  </h2>
                  <p className="text-foreground/70 text-lg max-w-xl mx-auto">
                    {provider.name === "Medicare"
                      ? "We accept Original Medicare, Medicare Advantage, and Medicare Supplement plans. Contact us today to schedule your appointment."
                      : "We'll verify your coverage and help you understand your benefits. Contact us today to get started."}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8 max-w-lg mx-auto">
                  <Button size="lg" className="gap-2 flex-1" asChild data-testid="button-request-appointment">
                    <Link href="/request-appointment">
                      Request Appointment
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2 flex-1" asChild data-testid="button-call-now">
                    <a href="tel:3868488751" className="flex items-center justify-center gap-2">
                      <Phone className="h-5 w-5" />
                      <span>Call (386) 848-8751</span>
                    </a>
                  </Button>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-foreground/70">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>In-network provider</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Same-week appointments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Fast benefits verification</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
