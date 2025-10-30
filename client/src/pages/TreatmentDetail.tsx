import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Loader2, ArrowLeft, Phone, Mail, CheckCircle2, Users, Clock, Shield, Calendar, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Treatment } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TrustFactors from "@/components/TrustFactors";
import ShortContactForm from "@/components/ShortContactForm";
import forestBg from "@assets/stock_images/calm_forest_trees_me_62fae749.jpg";
import HeroBackground from "@/components/HeroBackground";
import SEOHead from "@/components/SEOHead";

export default function TreatmentDetail() {
  const [, params] = useRoute("/:slug");
  const slug = params?.slug || "";

  const { data: treatment, isLoading, error } = useQuery<Treatment>({
    queryKey: ["/api/treatments/slug", slug],
    queryFn: async () => {
      const response = await fetch(`/api/treatments/slug/${slug}`);
      if (!response.ok) {
        throw new Error("Treatment not found");
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

  if (error || !treatment) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-2xl font-bold text-foreground mb-4">Treatment Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find the treatment service you're looking for.
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

  const createMetaDescription = (title: string): string => {
    const phone = "Call 386-848-8751.";
    const location = "Winter Park, FL";
    
    const longDesc = `Expert ${title} treatment services at Empathy Health Clinic in ${location}. Mental health care for psychiatric disorders. ${phone}`;
    if (longDesc.length <= 155) {
      return longDesc;
    }
    
    const mediumDesc = `${title} services at Empathy Clinic, ${location}. Mental health treatment & care for disorders. ${phone}`;
    if (mediumDesc.length <= 155) {
      return mediumDesc;
    }
    
    const shortDesc = `Mental health ${title.toLowerCase()} services - Empathy Clinic. Disorder treatment & care. ${phone}`;
    if (shortDesc.length <= 155) {
      return shortDesc;
    }
    
    const minDesc = `Mental health disorder treatment services & care. Empathy Clinic, ${location}. ${phone}`;
    return minDesc;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title={`${treatment.title} Winter Park FL | Empathy Health`}
        description={createMetaDescription(treatment.title)}
        keywords={[treatment.title, `${treatment.title} Winter Park`, `${treatment.title} Florida`, "psychiatric services Orlando", "mental health treatment Winter Park"]}
        canonicalPath={`/${treatment.slug}`}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={forestBg}>
          <Link 
            href="/#treatments" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors" 
            data-testid="link-back-to-home"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Treatments
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            {treatment.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed" data-testid="text-hero-description">
            {treatment.heroDescription}
          </p>
        </HeroBackground>

        {treatment.slug === 'adhd-treatment' && (
          <div className="bg-primary text-primary-foreground py-3">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="flex items-center justify-center gap-2 text-sm md:text-base font-medium">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Same-Week ADHD Testing Available | Most Insurance Accepted | Call 386-848-8751</span>
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  About {treatment.title}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed" data-testid="text-description">
                    {treatment.description}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Who Can Benefit
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed" data-testid="text-who-can-benefit">
                    {treatment.whoCanBenefit}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  What to Expect
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed" data-testid="text-what-to-expect">
                    {treatment.whatToExpect}
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
                      const faqs = JSON.parse(treatment.faqs || '[]');
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
                      <strong className="text-foreground">Evidence-Based Treatment:</strong>
                      <span className="text-muted-foreground"> We use scientifically validated therapeutic approaches proven effective for your condition</span>
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
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">Ongoing Monitoring:</strong>
                      <span className="text-muted-foreground"> Regular check-ins ensure your treatment remains effective as you progress</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="md:col-span-1">
              <div className="bg-primary/10 border-2 border-primary/40 rounded-lg p-8 sticky top-24 shadow-lg">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Get Started Today
                </h3>
                <p className="text-foreground/80 mb-6 text-base leading-relaxed">
                  Take the first step toward recovery. Our compassionate team is ready to help.
                </p>
                
                <div className="space-y-4 mb-6">
                  <Button 
                    size="lg" 
                    className="w-full text-lg font-semibold" 
                    onClick={() => {
                      const form = document.querySelector('#contact-form');
                      form?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    data-testid="button-scroll-to-form"
                  >
                    Request Appointment
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full text-lg font-semibold border-2" 
                    asChild 
                    data-testid="button-call-office"
                  >
                    <a href="tel:3868488751" className="flex items-center justify-center gap-2">
                      <Phone className="h-5 w-5" />
                      Call (386) 848-8751
                    </a>
                  </Button>
                </div>
                
                <div className="bg-card border-2 border-primary/20 rounded-lg p-5 space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-foreground">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                    </div>
                    <span className="font-medium">Most insurance accepted</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                    </div>
                    <span className="font-medium">Same-week appointments</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <Video className="h-5 w-5 text-primary flex-shrink-0" />
                    </div>
                    <span className="font-medium">Telehealth available</span>
                  </div>
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
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Ready to Start Treatment?
                  </h2>
                  <p className="text-foreground/70 text-lg max-w-xl mx-auto">
                    Complete the form below and we'll call you within 24 hours to schedule your appointment.
                  </p>
                </div>
                <div className="bg-background rounded-xl p-6 md:p-8 shadow-sm border">
                  <ShortContactForm />
                </div>
                <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-foreground/70">
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
