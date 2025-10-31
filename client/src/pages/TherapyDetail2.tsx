import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Therapy } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import TrustFactors from "@/components/TrustFactors";
import forestBg from "@assets/stock_images/misty_forest_morning_3efbbc1d.jpg";
import HeroBackground from "@/components/HeroBackground";
import SEOHead from "@/components/SEOHead";
import FAQSchema from "@/components/FAQSchema";

export default function TherapyDetail() {
  const [, params] = useRoute("/:slug");
  const slug = params?.slug || "";

  const { data: therapy, isLoading, error } = useQuery<Therapy>({
    queryKey: ["/api/therapies/slug", slug],
    queryFn: async () => {
      const response = await fetch(`/api/therapies/slug/${slug}`);
      if (!response.ok) {
        throw new Error("Therapy not found");
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

  if (error || !therapy) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-2xl font-bold text-foreground mb-4">Therapy Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find the therapy service you're looking for.
          </p>
          <Button asChild data-testid="button-back-to-therapies">
            <Link href="/therapy">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Therapies
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const createMetaDescription = (title: string): string => {
    const phone = "Call 386-848-8751.";
    const location = "Winter Park, FL";
    
    const longDesc = `${title} therapy services at Empathy Health Clinic in ${location}. Mental health care & treatment for disorders. ${phone}`;
    if (longDesc.length <= 155) {
      return longDesc;
    }
    
    const mediumDesc = `${title} therapy services at Empathy Clinic, ${location}. Mental health care & disorder treatment. ${phone}`;
    if (mediumDesc.length <= 155) {
      return mediumDesc;
    }
    
    const shortDesc = `Mental health therapy services - ${title}. Empathy Clinic disorder treatment & care. ${phone}`;
    if (shortDesc.length <= 155) {
      return shortDesc;
    }
    
    const minDesc = `Mental health therapy services. Disorder treatment & care. Empathy Clinic, ${location}. ${phone}`;
    return minDesc;
  };

  const parsedFaqs = (() => {
    try {
      return JSON.parse(therapy.faqs || '[]');
    } catch {
      return [];
    }
  })();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title={`${therapy.title} Winter Park FL | Empathy Health`}
        description={createMetaDescription(therapy.title)}
        keywords={[therapy.title, `${therapy.title} Winter Park`, "therapist Winter Park FL", "counseling Orlando", "therapy Florida"]}
        canonicalPath={`/${therapy.slug}`}
      />
      <FAQSchema faqs={parsedFaqs} />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={forestBg}>
          <Link 
            href="/therapy" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors" 
            data-testid="link-back-to-therapies"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Therapies
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            {therapy.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed" data-testid="text-hero-description">
            {therapy.heroDescription}
          </p>
        </HeroBackground>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  About {therapy.title}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed" data-testid="text-description">
                    {therapy.description}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Who Can Benefit
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed" data-testid="text-who-can-benefit">
                    {therapy.whoCanBenefit}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  What to Expect
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed" data-testid="text-what-to-expect">
                    {therapy.whatToExpect}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {(() => {
                    try {
                      const faqs = JSON.parse(therapy.faqs || '[]');
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
                      <strong className="text-foreground">Evidence-Based Therapy:</strong>
                      <span className="text-muted-foreground"> We use scientifically validated therapeutic approaches proven effective</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">Personalized Care Plans:</strong>
                      <span className="text-muted-foreground"> Every therapy plan is tailored to your unique needs and goals</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">Compassionate Support:</strong>
                      <span className="text-muted-foreground"> Our team provides empathetic, judgment-free care throughout your journey</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">Ongoing Monitoring:</strong>
                      <span className="text-muted-foreground"> Regular check-ins ensure your therapy remains effective as you progress</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="md:col-span-1">
              <LeadCaptureForm therapyName={therapy.title} />
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
                    Ready to Begin Therapy?
                  </h2>
                  <p className="text-foreground/70 text-lg max-w-xl mx-auto">
                    Take the first step toward positive change. Schedule your appointment today.
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
                      <CheckCircle2 className="h-5 w-5" />
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

          <div className="mt-16 pt-16 border-t">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-sans font-bold text-foreground mb-3">
                Why Choose Empathy Health Clinic
              </h2>
              <p className="text-muted-foreground">
                Professional, compassionate care you can trust
              </p>
            </div>
            <TrustFactors variant="compact" limit={4} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
