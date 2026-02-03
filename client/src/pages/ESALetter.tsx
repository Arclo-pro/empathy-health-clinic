import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, Heart, Shield, Calendar, Award, Star, CheckCircle, FileText, Home, Plane, Clock, Users } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import HeroBackground from "@/components/HeroBackground";
import { AuthoritativeSourcesBlock } from "@/components/AuthoritativeSource";
import { trackEvent } from "@/lib/analytics";

const heroImage = "/site-assets/stock_images/calm_peaceful_therap_3749281a.webp";

export default function ESALetter() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MedicalBusiness", "LocalBusiness"],
        "name": "Empathy Health Clinic - ESA Letter Services",
        "description": "Legitimate ESA letters from licensed mental health professionals in Winter Park, FL. Proper clinical evaluation for emotional support animal documentation for housing accommodations.",
        "url": "https://www.empathyhealthclinic.com/esa-letter",
        "telephone": "+1-386-848-8751",
        "email": "providers@empathyhealthclinic.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "1155 Louisiana Ave Suite 202",
          "addressLocality": "Winter Park",
          "addressRegion": "FL",
          "postalCode": "32789",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.5997,
          "longitude": -81.3392
        },
        "areaServed": [
          { "@type": "City", "name": "Orlando", "containedInPlace": { "@type": "State", "name": "Florida" } },
          { "@type": "City", "name": "Winter Park" },
          { "@type": "City", "name": "Maitland" },
          { "@type": "City", "name": "Altamonte Springs" },
          { "@type": "City", "name": "Lake Mary" },
          { "@type": "City", "name": "Casselberry" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is an ESA letter legitimate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Our ESA letters are provided by licensed mental health professionals after a proper clinical evaluation. They comply with Fair Housing Act requirements and are recognized for housing accommodations."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between an ESA and a service dog?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Service dogs are trained to perform specific tasks for people with disabilities and have public access rights. ESAs provide emotional support and companionship but don't require special training and have different legal protections — primarily for housing accommodations under the Fair Housing Act."
            }
          },
          {
            "@type": "Question",
            "name": "Will my landlord have to accept my ESA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Under the Fair Housing Act, landlords must make reasonable accommodations for ESAs, even in no-pet housing. However, you need a legitimate ESA letter from a licensed healthcare provider who has evaluated you. There may be exceptions for certain housing types."
            }
          },
          {
            "@type": "Question",
            "name": "How long does an ESA letter last?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ESA letters are typically valid for one year. We recommend annual re-evaluation to ensure your ESA continues to provide therapeutic benefit and to maintain current documentation."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="ESA Letter Winter Park FL | Emotional Support Animal Letter"
        description="Get a legitimate ESA letter from licensed mental health professionals in Winter Park, FL. Proper clinical evaluation for emotional support animal housing accommodations. Call 386-848-8751."
        keywords={["ESA letter", "emotional support animal letter", "ESA letter Orlando", "ESA letter Winter Park FL", "emotional support animal documentation", "ESA evaluation", "ESA letter Florida", "legitimate ESA letter"]}
        canonicalPath="/esa-letter"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Emotional Support Animal (ESA) Letter
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Get your legitimate ESA letter from licensed mental health professionals in Winter Park, FL. Proper documentation for housing accommodations.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              asChild
              className=""
              data-testid="button-hero-cta"
              onClick={() => trackEvent('esa_hero_cta', 'conversion', 'ESA Letter Page')}
            >
              <a href="#contact-form">Get Your ESA Letter</a>
            </Button>
            <Button
              size="lg"
              asChild
              className=""
              data-testid="button-hero-phone"
              onClick={() => trackEvent('phone_click', 'conversion', 'ESA Letter Page - Hero')}
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
                <span>Licensed Mental Health Professionals</span>
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
                  What Is an ESA Letter?
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    An Emotional Support Animal (ESA) can be an invaluable part of your mental health journey, offering comfort and stability during challenging times. For individuals living with conditions such as anxiety, depression, PTSD, or other emotional disorders, an ESA provides a consistent source of companionship and support that can enhance emotional well-being.
                  </p>
                  <p className="text-foreground leading-relaxed mb-4">
                    At Empathy Health Clinic in Winter Park, we understand how vital these connections can be in promoting healing and improving your overall quality of life. Our licensed mental health professionals specialize in evaluating whether an ESA could complement your treatment plan, ensuring that this option aligns with your specific needs and therapeutic goals.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    If an ESA is deemed appropriate for you, we provide legitimate ESA letters that meet the legal requirements outlined in the Fair Housing Act. These letters grant you the ability to keep your support animal in housing, even in situations where pets are typically restricted.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Who Can Benefit from an ESA?
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Our ESA letter service helps individuals with diagnosed mental health conditions where an emotional support animal would provide therapeutic benefit:
                  </p>
                  <ul className="space-y-3 text-foreground">
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Anxiety Disorders</strong> — Generalized anxiety, social anxiety, or panic disorder</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Depression</strong> — Major depressive disorder or persistent depressive disorder</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>PTSD</strong> — Post-traumatic stress disorder from trauma or adverse experiences</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Panic Disorder</strong> — Recurring panic attacks and related anxiety</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Other Emotional Conditions</strong> — Where an ESA would provide genuine therapeutic benefit</span>
                    </li>
                  </ul>
                  <p className="text-foreground leading-relaxed mt-4">
                    You must have a legitimate mental health condition and a genuine need for an ESA — we do not provide letters for convenience or to bypass pet policies.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  What to Expect During Your ESA Evaluation
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2">1. Clinical Assessment</h3>
                      <p className="text-muted-foreground">Meet with a licensed mental health professional to discuss your mental health condition, treatment history, and how an emotional support animal would specifically help your symptoms.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2">2. Clinical Determination</h3>
                      <p className="text-muted-foreground">Your provider evaluates whether an ESA is clinically appropriate for your specific situation, ensuring the recommendation aligns with your therapeutic goals.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2">3. ESA Letter Issuance</h3>
                      <p className="text-muted-foreground">If clinically appropriate, we provide a legitimate ESA letter that includes all required elements for housing accommodations under the Fair Housing Act.</p>
                    </div>
                  </div>
                  <p className="text-foreground leading-relaxed mt-4">
                    The process typically takes one appointment. Our team works with you to ensure your ESA letter is tailored to your situation, offering peace of mind and the ability to access the support you need.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Benefits of an Emotional Support Animal
                </h2>
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Emotional Comfort</h3>
                      <p className="text-sm text-muted-foreground">Reduce feelings of loneliness and provide a calming, stabilizing presence</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Home className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Housing Protection</h3>
                      <p className="text-sm text-muted-foreground">Fair Housing Act protections allow ESAs in no-pet housing</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Legitimate Documentation</h3>
                      <p className="text-sm text-muted-foreground">Proper clinical evaluation from licensed mental health professionals</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Legally Compliant</h3>
                      <p className="text-sm text-muted-foreground">Letters meet all Fair Housing Act requirements</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Frequently Asked Questions About ESA Letters
                </h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Is an ESA letter legitimate?</h3>
                    <p className="text-muted-foreground">Yes! Our ESA letters are provided by licensed mental health professionals after a proper clinical evaluation. They comply with Fair Housing Act requirements and are recognized for housing accommodations.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">What's the difference between an ESA and a service dog?</h3>
                    <p className="text-muted-foreground">Service dogs are trained to perform specific tasks for people with disabilities and have public access rights. ESAs provide emotional support and companionship but don't require special training and have different legal protections — primarily for housing accommodations under the Fair Housing Act.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Will my landlord have to accept my ESA?</h3>
                    <p className="text-muted-foreground">Under the Fair Housing Act, landlords must make reasonable accommodations for ESAs, even in no-pet housing. However, you need a legitimate ESA letter from a licensed healthcare provider who has evaluated you. There may be exceptions for certain housing types.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">How long does an ESA letter last?</h3>
                    <p className="text-muted-foreground">ESA letters are typically valid for one year. We recommend annual re-evaluation to ensure your ESA continues to provide therapeutic benefit and to maintain current documentation.</p>
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
                    href="/anxiety-therapy"
                    className="block text-primary hover:underline underline-offset-2"
                  >
                    → Anxiety Therapy
                  </Link>
                  <Link
                    href="/depression-treatment"
                    className="block text-primary hover:underline underline-offset-2"
                  >
                    → Depression Treatment
                  </Link>
                  <Link
                    href="/ptsd-treatment"
                    className="block text-primary hover:underline underline-offset-2"
                  >
                    → PTSD Treatment
                  </Link>
                  <Link
                    href="/psychiatrist-orlando"
                    className="block text-primary hover:underline underline-offset-2"
                  >
                    → Psychiatrist Orlando
                  </Link>
                  <Link
                    href="/services"
                    className="block text-primary hover:underline underline-offset-2"
                  >
                    → All Services
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
                Licensed professionals providing legitimate ESA evaluations with compassionate care
              </p>
            </div>
            <TrustFactors variant="compact" limit={4} />
          </div>
        </div>

        {/* Authoritative Sources for YMYL Compliance */}
        <div className="container mx-auto px-4 max-w-4xl">
          <AuthoritativeSourcesBlock
            variant="section"
            sources={[
              { source: "HUD", topic: "Fair Housing Act - Assistance Animals" },
              { source: "APA", topic: "Emotional Support Animals" },
              { source: "NIMH", topic: "Mental Health and Animal-Assisted Therapy" }
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
