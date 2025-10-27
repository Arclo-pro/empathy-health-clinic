import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Loader2, ArrowLeft, Phone, Mail, CheckCircle2, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Treatment } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="bg-primary text-primary-foreground py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Link 
              href="/#treatments" 
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors" 
              data-testid="link-back-to-home"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Treatments
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4" data-testid="text-hero-title">
              {treatment.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed" data-testid="text-hero-description">
              {treatment.heroDescription}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                  About {treatment.title}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed" data-testid="text-description">
                    {treatment.description}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                  Who Can Benefit
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed" data-testid="text-who-can-benefit">
                    {treatment.whoCanBenefit}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                  What to Expect
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed" data-testid="text-what-to-expect">
                    {treatment.whatToExpect}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
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
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
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
              <div className="bg-card border rounded-lg p-6 sticky top-4">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Start Your Journey
                </h3>
                <p className="text-muted-foreground mb-6">
                  Ready to begin treatment? Contact us today to schedule your initial consultation and take the first step toward healing.
                </p>
                <div className="space-y-3">
                  <Button className="w-full" asChild data-testid="button-call-office">
                    <a href="tel:3868488751" className="flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4" />
                      Call (386) 848-8751
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full" asChild data-testid="button-contact-us">
                    <a href="mailto:info@empathyhealthclinic.com" className="flex items-center justify-center gap-2">
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
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
