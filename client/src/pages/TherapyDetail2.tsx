import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Loader2, ArrowLeft, CheckCircle2, Star, CheckCircle, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Therapy } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
const forestBg = "/site-assets/stock_images/misty_forest_morning_3efbbc1d.webp";
import HeroBackground from "@/components/HeroBackground";
import SEOHead from "@/components/SEOHead";
import FAQSchema from "@/components/FAQSchema";
import { trackEvent } from "@/lib/analytics";
import TextUsButton from "@/components/TextUsButton";

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
          <h2 className="text-2xl font-bold text-foreground mb-4">Therapy Not Found</h2>
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

  const getMetaDescription = (): string => {
    const maxLength = 155;
    
    // Get description from database or generate fallback
    const desc = therapy.description || createMetaDescription(therapy.title);
    
    // Strip HTML tags and normalize whitespace
    const plainText = desc.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    
    // Truncate if needed
    if (plainText.length <= maxLength) {
      return plainText;
    }
    
    return plainText.substring(0, maxLength - 3) + '...';
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title={therapy.pageTitle || `${therapy.title} Winter Park FL | Empathy Health`}
        description={getMetaDescription()}
        keywords={[therapy.title, `${therapy.title} Winter Park`, "therapist Winter Park FL", "counseling Orlando", "therapy Florida"]}
        canonicalPath={`/${therapy.slug}`}
      />
      <FAQSchema faqs={parsedFaqs} />
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative py-20 px-4">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${forestBg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
          </div>
          
          <div className="container mx-auto max-w-6xl relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 text-white" data-testid="text-hero-title">
              {therapy.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8" data-testid="text-hero-description">
              {therapy.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Button 
                size="lg" 
                className=""
                asChild 
                data-testid="button-hero-request-appointment"
                onClick={() => trackEvent('appointment_request', 'conversion', `${therapy.title} Page - Hero CTA`)}
              >
                <Link href="/request-appointment" className="flex items-center justify-center gap-2">
                  <Mail className="h-5 w-5" />
                  Request Appointment
                </Link>
              </Button>
              <TextUsButton 
                variant="hero" 
                size="lg" 
                location={`hero-${therapy.slug}`}
              />
              <Button 
                size="lg" 
                className=""
                asChild 
                data-testid="button-hero-call"
              >
                <a 
                  href="tel:3868488751" 
                  className="flex items-center justify-center gap-2"
                  onClick={() => trackEvent('phone_click', 'conversion', `${therapy.title} Page - Hero CTA`)}
                >
                  <Phone className="h-5 w-5" />
                  Call (386) 848-8751
                </a>
              </Button>
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

        {/* Insurance Section */}
        <InsuranceSection />

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
                  <Button size="lg" className="gap-2" asChild data-testid="button-call-now">
                    <a 
                      href="tel:3868488751"
                      onClick={() => trackEvent('phone_click', 'conversion', `${therapy.title} Page - CTA`)}
                    >
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

          <div className="mt-16 pt-16 border-t">
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-foreground mb-8 text-center">
              Explore Our Services
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/services" className="p-6 border rounded-lg hover-elevate cursor-pointer group">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  All Services
                </h3>
                <p className="text-sm text-muted-foreground">
                  Browse our complete range of mental health services
                </p>
              </Link>
              <Link href="/therapy" className="p-6 border rounded-lg hover-elevate cursor-pointer group">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  Therapy Services
                </h3>
                <p className="text-sm text-muted-foreground">
                  Individual, group, and family therapy options
                </p>
              </Link>
              <Link href="/team" className="p-6 border rounded-lg hover-elevate cursor-pointer group">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  Meet Our Team
                </h3>
                <p className="text-sm text-muted-foreground">
                  Experienced, licensed mental health professionals
                </p>
              </Link>
              <Link href="/blog" className="p-6 border rounded-lg hover-elevate cursor-pointer group">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  Mental Health Resources
                </h3>
                <p className="text-sm text-muted-foreground">
                  Educational articles and guides on mental health topics
                </p>
              </Link>
              <Link href="/virtual-therapy" className="p-6 border rounded-lg hover-elevate cursor-pointer group">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  Virtual Therapy
                </h3>
                <p className="text-sm text-muted-foreground">
                  Convenient telehealth sessions from home
                </p>
              </Link>
              <Link href="/request-appointment" className="p-6 border rounded-lg hover-elevate cursor-pointer group">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  Request Appointment
                </h3>
                <p className="text-sm text-muted-foreground">
                  Schedule your first consultation today
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <ReviewsAndBadges />
      </main>
      <SiteFooter />
    </div>
  );
}
