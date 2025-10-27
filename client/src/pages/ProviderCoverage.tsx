import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Loader2, ArrowLeft, Phone, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { InsuranceProvider } from "@shared/schema";

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
      <div className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link href="/insurance" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors" data-testid="link-back-to-insurance">
            <ArrowLeft className="h-4 w-4" />
            Back to All Insurance Providers
          </Link>
          <div className="flex items-center gap-6 mb-6">
            <div className="bg-background/95 rounded-lg p-4 h-24 w-32 flex items-center justify-center">
              <img
                src={provider.logo}
                alt={`${provider.name} logo`}
                className="max-h-16 max-w-full object-contain"
                data-testid="img-provider-logo"
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2" data-testid="text-hero-title">
                {provider.heroTitle}
              </h1>
            </div>
          </div>
          <p className="text-lg text-primary-foreground/90 leading-relaxed" data-testid="text-hero-description">
            {provider.heroDescription}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                About {provider.name} Coverage
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground leading-relaxed" data-testid="text-description">
                  {provider.description}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                Coverage Details
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground leading-relaxed" data-testid="text-coverage-details">
                  {provider.coverageDetails}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                What We Treat
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Depression & Mood Disorders</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Anxiety Disorders</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">ADHD & Focus Issues</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Bipolar Disorder</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">PTSD & Trauma</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Personality Disorders</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
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
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
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
                Schedule an Appointment
              </h3>
              <p className="text-muted-foreground mb-6">
                Ready to get started? Contact us today to verify your {provider.name} benefits and schedule your first appointment.
              </p>
              <div className="space-y-3">
                <Button className="w-full" asChild data-testid="button-call-office">
                  <a href="tel:4072604458" className="flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4" />
                    Call (407) 260-4458
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild data-testid="button-contact-us">
                  <Link href="/contact" className="flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" />
                    Contact Us
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
        </div>
      </div>
    </div>
  );
}
