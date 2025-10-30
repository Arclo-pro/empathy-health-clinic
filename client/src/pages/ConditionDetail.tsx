import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Loader2, ArrowLeft, Phone, Mail, CheckCircle2, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Condition, Treatment, Therapy } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import forestBg from "@assets/stock_images/peaceful_green_fores_e64064d2.jpg";
import HeroBackground from "@/components/HeroBackground";
import SEOHead from "@/components/SEOHead";

export default function ConditionDetail() {
  const [, params] = useRoute("/:slug");
  const slug = params?.slug || "";

  const { data: condition, isLoading, error } = useQuery<Condition>({
    queryKey: ["/api/conditions/slug", slug],
    queryFn: async () => {
      const response = await fetch(`/api/conditions/slug/${slug}`);
      if (!response.ok) {
        throw new Error("Condition not found");
      }
      return response.json();
    },
    enabled: !!slug,
  });

  const { data: allTreatments } = useQuery<Treatment[]>({
    queryKey: ["/api/treatments"],
  });

  const { data: allTherapies } = useQuery<Therapy[]>({
    queryKey: ["/api/therapies"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !condition) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-2xl font-bold text-foreground mb-4">Condition Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find the condition you're looking for.
          </p>
          <Button asChild data-testid="button-back-to-home">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const relatedTreatmentSlugs = (() => {
    try {
      return JSON.parse(condition.relatedTreatments || '[]');
    } catch {
      return [];
    }
  })();

  const relatedTherapySlugs = (() => {
    try {
      return JSON.parse(condition.relatedTherapies || '[]');
    } catch {
      return [];
    }
  })();

  const relatedTreatments = allTreatments?.filter(t => 
    relatedTreatmentSlugs.includes(t.slug)
  ) || [];

  const relatedTherapies = allTherapies?.filter(t => 
    relatedTherapySlugs.includes(t.slug)
  ) || [];

  const createMetaDescription = (title: string): string => {
    const phone = "Call 386-848-8751.";
    const location = "Winter Park, FL";
    
    const longDesc = `${title} disorder treatment at Empathy Health Clinic in ${location}. Expert mental health care services for psychiatric disorders. ${phone}`;
    if (longDesc.length <= 155) {
      return longDesc;
    }
    
    const mediumDesc = `${title} disorder treatment at Empathy Clinic, ${location}. Mental health care services. ${phone}`;
    if (mediumDesc.length <= 155) {
      return mediumDesc;
    }
    
    const shortDesc = `Mental health disorder treatment services & care - ${title}. Empathy Clinic. ${phone}`;
    if (shortDesc.length <= 155) {
      return shortDesc;
    }
    
    const minDesc = `Mental health disorder treatment services & care. Empathy Clinic, ${location}. ${phone}`;
    return minDesc;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title={`${condition.title} Treatment Winter Park FL | Empathy`}
        description={createMetaDescription(condition.title)}
        keywords={[condition.title, `${condition.title} treatment Winter Park`, `${condition.title} therapy Florida`, "psychiatrist Orlando", "mental health Winter Park FL"]}
        canonicalPath={`/${condition.slug}`}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={forestBg}>
          <Link 
            href="/#conditions" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors" 
            data-testid="link-back-to-conditions"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Conditions
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            {condition.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed" data-testid="text-hero-description">
            {condition.heroDescription}
          </p>
        </HeroBackground>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  About {condition.title}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed" data-testid="text-description">
                    {condition.fullDescription}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Common Symptoms
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed" data-testid="text-symptoms">
                    {condition.symptoms}
                  </p>
                </div>
              </section>

              {(relatedTreatments.length > 0 || relatedTherapies.length > 0) && (
                <section>
                  <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                    Related Treatments & Therapies
                  </h2>
                  <div className="space-y-3">
                    {relatedTreatments.map((treatment) => (
                      <Link 
                        key={treatment.id} 
                        href={`/${treatment.slug}`}
                        className="block border rounded-lg p-4 hover-elevate active-elevate-2 transition-all"
                        data-testid={`link-treatment-${treatment.slug}`}
                      >
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">
                              {treatment.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {treatment.shortDescription}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                    {relatedTherapies.map((therapy) => (
                      <Link 
                        key={therapy.id} 
                        href={`/${therapy.slug}`}
                        className="block border rounded-lg p-4 hover-elevate active-elevate-2 transition-all"
                        data-testid={`link-therapy-${therapy.slug}`}
                      >
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">
                              {therapy.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {therapy.shortDescription}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {(() => {
                    try {
                      const faqs = JSON.parse(condition.faqs || '[]');
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
                  Our Approach
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">Comprehensive Evaluation:</strong>
                      <span className="text-muted-foreground"> We provide thorough assessments to understand your unique situation</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">Evidence-Based Treatment:</strong>
                      <span className="text-muted-foreground"> We use scientifically validated approaches proven effective for your condition</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">Personalized Care Plans:</strong>
                      <span className="text-muted-foreground"> Every treatment plan is tailored to your unique needs and goals</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">Compassionate Support:</strong>
                      <span className="text-muted-foreground"> Our team provides empathetic, judgment-free care throughout your journey</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="md:col-span-1">
              <div className="bg-card border rounded-lg p-6 sticky top-4">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Get Help Today
                </h3>
                <p className="text-muted-foreground mb-6">
                  Ready to start treatment? Contact us today to schedule your initial consultation and take the first step toward wellness.
                </p>
                <div className="space-y-3">
                  <Button className="w-full" asChild data-testid="button-call-office">
                    <a href="tel:3868488751" className="flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4" />
                      Call (386) 848-8751
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full" asChild data-testid="button-contact-us">
                    <a href="mailto:providers@empathyhealthclinic.com" className="flex items-center justify-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Us
                    </a>
                  </Button>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Office Hours
                  </h4>
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

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Insurance Accepted
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    We accept most major insurance plans including:
                  </p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• Blue Cross Blue Shield</div>
                    <div>• Aetna</div>
                    <div>• Cigna</div>
                    <div>• UnitedHealthcare</div>
                  </div>
                  <Button variant="ghost" className="px-0 mt-2" asChild>
                    <Link href="/insurance">
                      View all insurance providers →
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div id="contact-form" className="mt-16 scroll-mt-24">
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 rounded-xl p-8 md:p-12 shadow-lg">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Get Expert Help for {condition.title}
                  </h2>
                  <p className="text-foreground/70 text-lg max-w-xl mx-auto">
                    Our compassionate team is here to help you manage your symptoms and improve your quality of life.
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
                  <Button size="lg" className="gap-2" asChild data-testid="button-request-appointment">
                    <Link href="/request-appointment">
                      Request Appointment
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2" asChild data-testid="button-call-now">
                    <a href="tel:3868488751">
                      <Phone className="h-5 w-5" />
                      Call (386) 848-8751
                    </a>
                  </Button>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-foreground/70">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Most insurance accepted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Same-week appointments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Telehealth available</span>
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
