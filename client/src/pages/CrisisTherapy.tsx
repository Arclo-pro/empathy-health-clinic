import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, Phone, Clock, AlertCircle, Shield } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import HeroBackground from "@/components/HeroBackground";
const heroImage = "/site-assets/stock_images/calm_peaceful_therap_c2e99a65.webp";
import { trackEvent } from "@/lib/analytics";
import TherapyFAQ from "@/components/TherapyFAQ";

export default function CrisisTherapy() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "EmergencyService", "LocalBusiness"],
    "name": "Empathy Health Clinic - Crisis Counseling & Urgent Mental Health Care",
    "description": "Urgent mental health support and crisis counseling in Winter Park, FL. Same-day appointments available for mental health emergencies, suicidal thoughts, panic attacks, and acute distress.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "telephone": "+1-386-848-8751",
    "url": window.location.origin,
    "priceRange": "$$",
    "image": `${window.location.origin}/site-assets/stock_images/peaceful_green_fores_98e1a8d8.webp`,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.5983",
      "longitude": "-81.3492"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/empathyhealthclinic",
      "https://www.instagram.com/empathyhealthclinic",
      "https://www.linkedin.com/company/empathyhealthclinic"
    ],
    "serviceType": "Crisis Mental Health Counseling",
    "areaServed": ["Orlando", "Winter Park", "Altamonte Springs", "Maitland", "Central Florida"]
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Crisis Counseling Orlando FL | Urgent Mental Health Care"
        description="Urgent mental health support in Orlando and Winter Park, FL. Same-day crisis counseling appointments. Help for suicidal thoughts, panic attacks, acute anxiety. Call 386-848-8751 now."
        keywords={["crisis counseling Orlando FL", "urgent therapy appointment", "same day therapy session", "mental health emergency Orlando", "crisis intervention Winter Park", "urgent psychiatric care", "same day psychiatrist Orlando"]}
        canonicalPath="/crisis-therapy"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <div className="bg-destructive/90 backdrop-blur-sm border-2 border-destructive-foreground/30 rounded-lg p-4 mb-6 max-w-2xl">
            <div className="flex gap-3 items-start">
              <AlertCircle className="h-6 w-6 text-destructive-foreground flex-shrink-0 mt-0.5" />
              <div className="text-destructive-foreground">
                <p className="font-semibold mb-1">If you are experiencing a life-threatening emergency:</p>
                <p className="text-sm">Call 911 or go to your nearest emergency room immediately.</p>
                <p className="text-sm mt-2">National Suicide & Crisis Lifeline: <strong>988</strong></p>
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Crisis Counseling & Urgent Mental Health Care
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            When you're in crisis, every moment matters. Get same-day mental health support from licensed professionals who understand what you're going through.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="default" 
              size="lg" 
              asChild 
              data-testid="button-hero-phone"
              onClick={() => trackEvent('phone_click', 'conversion', 'Crisis Page - Hero')}
            >
              <a href="tel:386-848-8751" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Call Now: 386-848-8751
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="bg-background/20 backdrop-blur-sm border-white/30 text-white hover:bg-background/30"
              data-testid="button-hero-cta"
              onClick={() => trackEvent('crisis_hero_cta', 'conversion', 'Crisis Page')}
            >
              <a href="#contact-form">Request Urgent Appointment</a>
            </Button>
          </div>
        </HeroBackground>

        <div className="bg-primary text-primary-foreground py-3">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center justify-center gap-2 text-sm md:text-base font-medium flex-wrap text-center">
              <Clock className="h-5 w-5" />
              <span>Same-Day & Next-Day Appointments | Telehealth Available | Crisis Support When You Need It</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Immediate Mental Health Support in Central Florida
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Mental health crises don't wait for convenient times. Whether you're experiencing severe anxiety, depression, suicidal thoughts, panic attacks, or overwhelming emotional distress, Empathy Health Clinic provides rapid access to professional crisis counseling and psychiatric care.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    Our experienced psychiatrists and therapists offer same-day or next-day appointments to help you through your most difficult moments. We provide compassionate, non-judgmental support to stabilize your situation and create a path forward.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  When to Seek Crisis Mental Health Support
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Don't wait until things get worse. Contact us immediately if you're experiencing:
                  </p>
                  <ul className="space-y-3 text-foreground">
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Suicidal Thoughts or Self-Harm Urges</strong> - Thinking about ending your life or hurting yourself</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Severe Panic Attacks</strong> - Overwhelming fear, chest pain, difficulty breathing</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Acute Depression</strong> - Sudden worsening of depression symptoms, inability to function</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Trauma Response</strong> - Recent traumatic event causing severe emotional distress</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Medication Emergency</strong> - Severe side effects or ineffective psychiatric medications</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Psychotic Symptoms</strong> - Hallucinations, delusions, or losing touch with reality</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Substance Abuse Crisis</strong> - Dangerous substance use affecting mental health</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  How Our Crisis Support Works
                </h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">1. Contact Us Immediately</h3>
                    <p className="text-muted-foreground">Call <a href="tel:386-848-8751" className="text-primary hover:underline">386-848-8751</a> or fill out the urgent appointment form below. Let us know you need crisis support.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">2. Same-Day Assessment</h3>
                    <p className="text-muted-foreground">We prioritize crisis appointments and typically can see you the same day or within 24 hours, either in-person or via secure telehealth.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">3. Immediate Intervention</h3>
                    <p className="text-muted-foreground">Our psychiatrist or therapist will assess your situation, provide crisis counseling, adjust medications if needed, and create a safety plan.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">4. Ongoing Support</h3>
                    <p className="text-muted-foreground">We'll schedule follow-up appointments and connect you with ongoing therapy or psychiatric care to prevent future crises.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Why Choose Empathy Health Clinic for Crisis Care
                </h2>
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Rapid Access</h3>
                      <p className="text-sm text-muted-foreground">Same-day and next-day crisis appointments available</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Licensed Professionals</h3>
                      <p className="text-sm text-muted-foreground">Board-certified psychiatrists and crisis-trained therapists</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Telehealth Option</h3>
                      <p className="text-sm text-muted-foreground">Virtual crisis appointments from home if needed</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Insurance Accepted</h3>
                      <p className="text-sm text-muted-foreground">Most major insurance plans accepted for crisis services</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-200 dark:border-amber-900 rounded-lg p-6">
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4 flex items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-500" />
                  Additional Crisis Resources
                </h2>
                <div className="space-y-3 text-foreground">
                  <p><strong>National Suicide & Crisis Lifeline:</strong> Call or text <strong>988</strong> (available 24/7)</p>
                  <p><strong>Crisis Text Line:</strong> Text HOME to <strong>741741</strong></p>
                  <p><strong>National Domestic Violence Hotline:</strong> <strong>1-800-799-7233</strong></p>
                  <p><strong>SAMHSA National Helpline:</strong> <strong>1-800-662-4357</strong> (mental health & substance abuse)</p>
                  <p className="text-sm text-muted-foreground pt-3 border-t border-amber-200 dark:border-amber-900">
                    These free resources provide 24/7 support. For psychiatric evaluation and medication management, contact Empathy Health Clinic at 386-848-8751.
                  </p>
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
                    href="/depression-counseling" 
                    className="block text-primary hover:underline underline-offset-2"
                    data-testid="link-depression"
                  >
                    → Depression Counseling
                  </Link>
                  <Link 
                    href="/anxiety-therapy" 
                    className="block text-primary hover:underline underline-offset-2"
                    data-testid="link-anxiety"
                  >
                    → Anxiety Therapy
                  </Link>
                  <Link 
                    href="/emdr-therapy" 
                    className="block text-primary hover:underline underline-offset-2"
                    data-testid="link-emdr"
                  >
                    → Trauma Therapy (EMDR)
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
                Compassionate crisis care when you need it most
              </p>
            </div>
            <TrustFactors variant="compact" limit={4} />
          </div>
        </div>

        {/* FAQ Section */}
        <TherapyFAQ pageTitle="Crisis Therapy" />
      </main>
      <SiteFooter />
    </div>
  );
}
