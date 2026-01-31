import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, Brain, Shield, Calendar, Award, Star, CheckCircle } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import HeroBackground from "@/components/HeroBackground";
import { AuthoritativeSourcesBlock } from "@/components/AuthoritativeSource";
const heroImage = "/site-assets/stock_images/calm_peaceful_therap_3749281a.webp";
import { trackEvent } from "@/lib/analytics";
import TherapyFAQ from "@/components/TherapyFAQ";

export default function EMDRTherapy() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    "name": "EMDR Therapy",
    "description": "Eye Movement Desensitization and Reprocessing (EMDR) therapy for trauma, PTSD, anxiety, and emotional distress in Winter Park, FL. Evidence-based treatment with licensed professionals.",
    "provider": {
      "@type": "MedicalClinic",
      "name": "Empathy Health Clinic",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2153 Park Center Drive",
        "addressLocality": "Winter Park",
        "addressRegion": "FL",
        "postalCode": "32792"
      },
      "telephone": "386-848-8751"
    },
    "areaServed": ["Orlando", "Winter Park", "Altamonte Springs", "Maitland", "Lake Mary"]
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="EMDR Therapy Winter Park FL | Trauma Treatment Orlando"
        description="EMDR therapy for PTSD, trauma, anxiety in Winter Park, FL. Evidence-based treatment by licensed professionals. Same-week appointments. Most insurance accepted. Call 386-848-8751."
        keywords={["EMDR therapy Winter Park FL", "EMDR therapy Orlando", "EMDR therapy near me", "EMDR for PTSD", "EMDR for trauma", "trauma therapy Orlando FL", "EMDR for childhood trauma", "eye movement therapy Florida"]}
        canonicalPath="/emdr-therapy"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            EMDR Therapy in Winter Park, FL
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Proven trauma treatment that helps you process difficult memories and reduce emotional distress. Evidence-based EMDR therapy by licensed professionals.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              className=""
              data-testid="button-hero-cta"
              onClick={() => trackEvent('emdr_hero_cta', 'conversion', 'EMDR Page')}
            >
              <a href="#contact-form">Start Your Healing Journey</a>
            </Button>
            <Button 
              size="lg" 
              asChild 
              className=""
              data-testid="button-hero-phone"
              onClick={() => trackEvent('phone_click', 'conversion', 'EMDR Page - Hero')}
            >
              <a href="tel:3868488751">Call 386-848-8751</a>
            </Button>
          </div>
        </HeroBackground>

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
                  What Is EMDR Therapy?
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Eye Movement Desensitization and Reprocessing (EMDR) is a proven psychotherapy approach that helps people heal from trauma, PTSD, and distressing life experiences. EMDR therapy uses bilateral stimulation (eye movements, taps, or sounds) to help your brain process traumatic memories in a way that reduces their emotional impact.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    Unlike traditional talk therapy, EMDR doesn't require you to discuss your trauma in detail. Instead, it allows your brain's natural healing process to work more effectively, helping you move past traumatic experiences that may be holding you back.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  What Can EMDR Therapy Treat?
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    EMDR therapy is highly effective for treating a wide range of mental health conditions and traumatic experiences:
                  </p>
                  <ul className="space-y-3 text-foreground">
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Post-Traumatic Stress Disorder (PTSD)</strong> - Combat trauma, accidents, assault, natural disasters</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Childhood Trauma</strong> - Abuse, neglect, or adverse childhood experiences (ACEs)</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Anxiety Disorders</strong> - Panic attacks, phobias, social anxiety, generalized anxiety</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Depression</strong> - Especially when linked to traumatic life events</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Grief and Loss</strong> - Processing difficult losses and bereavement</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Performance Anxiety</strong> - Test anxiety, sports performance, public speaking</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  How EMDR Therapy Works
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    EMDR therapy follows a structured 8-phase approach developed by Dr. Francine Shapiro. During sessions, your therapist will:
                  </p>
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2">1. History Taking & Preparation</h3>
                      <p className="text-muted-foreground">Your therapist learns about your trauma history and teaches you coping techniques.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2">2. Assessment & Targeting</h3>
                      <p className="text-muted-foreground">Together, you identify specific memories and negative beliefs to target.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2">3. Desensitization & Reprocessing</h3>
                      <p className="text-muted-foreground">Using bilateral stimulation (eye movements, taps), you process the traumatic memory while your brain creates new, adaptive associations.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2">4. Installation & Body Scan</h3>
                      <p className="text-muted-foreground">Positive beliefs are strengthened and any residual physical tension is addressed.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Why Choose Empathy Health Clinic for EMDR?
                </h2>
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">EMDR-Trained Therapists</h3>
                      <p className="text-sm text-muted-foreground">Licensed professionals with specialized EMDR certification</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Same-Week Appointments</h3>
                      <p className="text-sm text-muted-foreground">Fast access to care when you need it most</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Insurance Accepted</h3>
                      <p className="text-sm text-muted-foreground">Most major insurance plans accepted, including Blue Cross Blue Shield, Cigna, Aetna</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Brain className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Telehealth Available</h3>
                      <p className="text-sm text-muted-foreground">Virtual EMDR sessions for your convenience</p>
                    </div>
                  </div>
                </div>
              </section>

            </div>

            <div className="md:col-span-1 space-y-6">

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Related Services
                </h3>
                <div className="space-y-3">
                  <Link 
                    href="/trauma-therapy-orlando" 
                    className="block text-primary hover:underline underline-offset-2"
                    data-testid="link-trauma-therapy"
                  >
                    → Trauma Therapy
                  </Link>
                  <Link 
                    href="/psychiatrist-winter-park" 
                    className="block text-primary hover:underline underline-offset-2"
                    data-testid="link-ptsd"
                  >
                    → PTSD Treatment
                  </Link>
                  <Link 
                    href="/anxiety-therapy" 
                    className="block text-primary hover:underline underline-offset-2"
                    data-testid="link-anxiety"
                  >
                    → Anxiety Therapy
                  </Link>
                  <Link 
                    href="/depression-counseling" 
                    className="block text-primary hover:underline underline-offset-2"
                    data-testid="link-depression"
                  >
                    → Depression Counseling
                  </Link>
                  <Link 
                    href="/virtual-therapy" 
                    className="block text-primary hover:underline underline-offset-2"
                    data-testid="link-virtual"
                  >
                    → Virtual Therapy Options
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-sans font-bold text-foreground mb-3">
                Why Choose Empathy Health Clinic
              </h2>
              <p className="text-muted-foreground">
                Professional, compassionate EMDR therapy you can trust
              </p>
            </div>
            <TrustFactors variant="compact" limit={4} />
          </div>
        </div>

        {/* FAQ Section */}
        <TherapyFAQ 
          pageTitle="EMDR Therapy"
          customFaqs={[
            {
              question: "Is EMDR therapy safe?",
              answer: "Yes, EMDR is recognized by the American Psychiatric Association, the World Health Organization, and the Department of Veterans Affairs as an effective treatment for trauma. It's been extensively researched and proven safe when conducted by trained professionals."
            },
            {
              question: "How long does EMDR therapy take?",
              answer: "EMDR can produce results faster than traditional talk therapy. Some people experience significant relief in 3-6 sessions, while complex trauma may require 8-12 sessions or more. Your therapist will create a personalized treatment plan."
            },
            {
              question: "Does EMDR work for childhood trauma?",
              answer: "Absolutely. EMDR is highly effective for processing childhood trauma, abuse, neglect, and adverse childhood experiences (ACEs). Many clients report significant healing from long-standing childhood wounds."
            },
            {
              question: "Can EMDR be done online/virtually?",
              answer: "Yes! Virtual EMDR is just as effective as in-person sessions. We offer secure telehealth appointments throughout Florida for your convenience."
            },
            {
              question: "Does insurance cover EMDR therapy?",
              answer: "Most insurance plans cover EMDR therapy as it's classified as psychotherapy. We accept Blue Cross Blue Shield, Cigna, Aetna, UnitedHealthcare, and other major insurers. Contact us to verify your benefits."
            }
          ]}
        />

        {/* Authoritative Sources for YMYL Compliance */}
        <div className="container mx-auto px-4 max-w-4xl">
          <AuthoritativeSourcesBlock 
            variant="section"
            sources={[
              { source: "APA", topic: "EMDR Therapy" },
              { source: "NIMH", topic: "Post-Traumatic Stress Disorder" },
              { source: "NIH", topic: "EMDR for Trauma" }
            ]}
          />
        </div>

        {/* Trust Badges */}
        <ReviewsAndBadges />
      </main>
      <SiteFooter />
    </div>
  );
}
