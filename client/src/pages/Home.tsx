import { lazy, Suspense } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/SiteHeader";
import HeroSection, { heroImage } from "@/components/HeroSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import InsuranceSection from "@/components/InsuranceSection";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import OrganizationSchema from "@/components/OrganizationSchema";
import { 
  Stethoscope, Heart, Frown, Pill, Brain, Activity,
  ClipboardList, Phone, Calendar
} from "lucide-react";

const TeamSection = lazy(() => import("@/components/TeamSection"));
const ConditionsSection = lazy(() => import("@/components/ConditionsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const LocationSection = lazy(() => import("@/components/LocationSection"));

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Empathy Health Clinic | Psychiatry Clinic in Orlando FL"
        description="Leading psychiatry clinic in Orlando, FL. Board-certified psychiatrists, same-week appointments, medication management & counseling. Serving Orlando, Winter Park & Central Florida. Most insurance accepted."
        keywords={["psychiatry clinic orlando", "psychiatrist Orlando", "orlando psychiatry clinic", "mental health clinic Orlando FL", "therapy Orlando", "psychiatric services Orlando", "anxiety treatment Orlando", "depression treatment Orlando"]}
        canonicalPath="/"
        preloadImage={heroImage}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": ["MedicalClinic", "Psychiatrist", "LocalBusiness"],
          "@id": "https://www.empathyhealthclinic.com/#organization",
          "name": "Empathy Health Clinic",
          "alternateName": "Empathy Health",
          "description": "Mental health clinic providing psychiatric services, therapy, and medication management serving Orlando and Winter Park, Florida.",
          "url": "https://www.empathyhealthclinic.com",
          "telephone": "+13868488751",
          "email": "providers@empathyhealthclinic.com",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "2281 Lee Rd Suite 102",
            "addressLocality": "Winter Park",
            "addressRegion": "FL",
            "postalCode": "32810",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 28.59544,
            "longitude": -81.36537
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "09:00",
              "closes": "17:00"
            }
          ],
          "areaServed": [
            {
              "@type": "City",
              "name": "Winter Park",
              "containedInPlace": { "@type": "State", "name": "Florida" }
            },
            {
              "@type": "City",
              "name": "Orlando",
              "containedInPlace": { "@type": "State", "name": "Florida" }
            },
            {
              "@type": "City",
              "name": "Lake Mary",
              "containedInPlace": { "@type": "State", "name": "Florida" }
            },
            {
              "@type": "City",
              "name": "Altamonte Springs",
              "containedInPlace": { "@type": "State", "name": "Florida" }
            }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Mental Health Services",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Psychiatric Evaluation" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Medication Management" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Therapy Services" } }
            ]
          },
          "sameAs": [
            "https://www.facebook.com/profile.php?id=100083226165903",
            "https://x.com/clinicempathy12",
            "https://www.instagram.com/empathyhealthfl/?hl=en",
            "https://www.tiktok.com/@empathy.health.cl",
            "https://www.linkedin.com/company/empathy-health-clinic/",
            "https://www.youtube.com/@EmpathyHealthClinic"
          ]
        }}
      />
      <OrganizationSchema />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {/* A) HERO */}
        <HeroSection />

        {/* B) TRUST STRIP - Reviews + Insurance */}
        <ReviewsAndBadges />
        <InsuranceSection />

        {/* C) HOW IT WORKS - 3 Simple Steps */}
        <section className="py-12 md:py-16 bg-background">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Getting started is easy. We'll guide you every step of the way.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center" data-testid="step-1">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <ClipboardList className="w-8 h-8 text-primary" />
                </div>
                <div className="text-sm font-medium text-primary mb-2">Step 1</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Request an Appointment</h3>
                <p className="text-muted-foreground">Fill out our simple online form or call us directly. We respond within 24 hours.</p>
              </div>
              <div className="text-center" data-testid="step-2">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <div className="text-sm font-medium text-primary mb-2">Step 2</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">We'll Reach Out</h3>
                <p className="text-muted-foreground">Our team will call or text to confirm your appointment and answer any questions.</p>
              </div>
              <div className="text-center" data-testid="step-3">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <div className="text-sm font-medium text-primary mb-2">Step 3</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Your First Visit</h3>
                <p className="text-muted-foreground">Meet with your psychiatrist in-person or via telehealth. Same-week appointments available.</p>
              </div>
            </div>
          </div>
        </section>

        {/* D) CORE SERVICES - 6 Key Items */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-orange-50/50 to-orange-100/30 dark:from-orange-950/20 dark:to-orange-900/10">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
                Psychiatry & Mental Health Services in Orlando
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Board-certified psychiatrists and licensed therapists providing comprehensive care for anxiety, depression, ADHD, and more
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/services" className="group" data-testid="link-medication-management">
                <div className="flex items-center gap-4 p-6 bg-white dark:bg-card rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12),0_8px_24px_rgba(0,0,0,0.08)] hover:scale-[1.02] transition-all duration-200 h-full">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Pill className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary">Medication Management</h3>
                    <p className="text-sm text-muted-foreground">Expert psychiatric medication care</p>
                  </div>
                </div>
              </Link>

              <Link href="/anxiety-therapy" className="group" data-testid="link-anxiety-treatment">
                <div className="flex items-center gap-4 p-6 bg-white dark:bg-card rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12),0_8px_24px_rgba(0,0,0,0.08)] hover:scale-[1.02] transition-all duration-200 h-full">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary">Anxiety Treatment</h3>
                    <p className="text-sm text-muted-foreground">Anxiety & panic disorder care</p>
                  </div>
                </div>
              </Link>

              <Link href="/depression-counseling" className="group" data-testid="link-depression-treatment">
                <div className="flex items-center gap-4 p-6 bg-white dark:bg-card rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12),0_8px_24px_rgba(0,0,0,0.08)] hover:scale-[1.02] transition-all duration-200 h-full">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Frown className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary">Depression Treatment</h3>
                    <p className="text-sm text-muted-foreground">Evidence-based depression care</p>
                  </div>
                </div>
              </Link>

              <Link href="/ptsd-psychiatrist-orlando" className="group" data-testid="link-ptsd-treatment">
                <div className="flex items-center gap-4 p-6 bg-white dark:bg-card rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12),0_8px_24px_rgba(0,0,0,0.08)] hover:scale-[1.02] transition-all duration-200 h-full">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary">PTSD Treatment</h3>
                    <p className="text-sm text-muted-foreground">Specialized trauma therapy</p>
                  </div>
                </div>
              </Link>

              <Link href="/adhd-psychiatrist-orlando" className="group" data-testid="link-adhd-treatment">
                <div className="flex items-center gap-4 p-6 bg-white dark:bg-card rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12),0_8px_24px_rgba(0,0,0,0.08)] hover:scale-[1.02] transition-all duration-200 h-full">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary">ADHD Treatment</h3>
                    <p className="text-sm text-muted-foreground">Focus & attention management</p>
                  </div>
                </div>
              </Link>

              <Link href="/bipolar-disorder-treatment-orlando" className="group" data-testid="link-bipolar-treatment">
                <div className="flex items-center gap-4 p-6 bg-white dark:bg-card rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12),0_8px_24px_rgba(0,0,0,0.08)] hover:scale-[1.02] transition-all duration-200 h-full">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary">Bipolar Disorder</h3>
                    <p className="text-sm text-muted-foreground">Comprehensive mood stabilization</p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="text-center mt-8">
              <Link href="/services">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8" data-testid="button-view-all-services">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* E) CONDITIONS TREATED */}
        <Suspense fallback={<div className="min-h-[300px] py-16 bg-card" />}>
          <ConditionsSection />
        </Suspense>

        {/* E2) SPECIALIZED TREATMENT AREAS - SEO Keyword Clusters */}
        <section className="py-12 md:py-16 bg-background">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
                Specialized Mental Health Treatment in Orlando
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Expert care for the conditions that affect you most. Our board-certified psychiatrists and licensed therapists offer evidence-based treatment tailored to your needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Anxiety Treatment Orlando */}
              <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Anxiety Treatment Orlando
                </h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive care for generalized anxiety, panic disorder, social anxiety, and phobias. Our psychiatrists provide medication management while coordinating with therapists for CBT and other evidence-based approaches.
                </p>
                <ul className="space-y-2 mb-4 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    Panic disorder & GAD treatment
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    Social anxiety therapy
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    Same-week appointments
                  </li>
                </ul>
                <Link href="/anxiety-therapy">
                  <Button variant="outline" className="w-full">
                    Learn About Anxiety Treatment
                  </Button>
                </Link>
              </div>

              {/* ADHD Psychiatrist Orlando */}
              <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  ADHD Psychiatrist Orlando
                </h3>
                <p className="text-muted-foreground mb-4">
                  Expert ADHD evaluation and treatment for adults and adolescents. Our psychiatrists specialize in accurate diagnosis, medication management, and comprehensive ADHD care that helps you regain focus.
                </p>
                <ul className="space-y-2 mb-4 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    Adult ADHD evaluation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    Medication management
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    In-person & telehealth options
                  </li>
                </ul>
                <Link href="/adhd-psychiatrist-orlando">
                  <Button variant="outline" className="w-full">
                    Learn About ADHD Treatment
                  </Button>
                </Link>
              </div>

              {/* Telepsychiatry Florida */}
              <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Telepsychiatry Florida
                </h3>
                <p className="text-muted-foreground mb-4">
                  Access board-certified psychiatrists from anywhere in Florida through secure video appointments. Same quality care as in-person visits, with the convenience of staying home.
                </p>
                <ul className="space-y-2 mb-4 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    HIPAA-compliant video visits
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    Statewide Florida coverage
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    Evening appointments available
                  </li>
                </ul>
                <Link href="/online-psychiatrist-florida">
                  <Button variant="outline" className="w-full">
                    Learn About Telepsychiatry
                  </Button>
                </Link>
              </div>
            </div>

            {/* Additional High-Value Keywords Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <Link href="/depression-treatment" className="group">
                <div className="p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors text-center">
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Depression Treatment Orlando</p>
                </div>
              </Link>
              <Link href="/ptsd-psychiatrist-orlando" className="group">
                <div className="p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors text-center">
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">PTSD Treatment Orlando</p>
                </div>
              </Link>
              <Link href="/bipolar-psychiatrist-orlando" className="group">
                <div className="p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors text-center">
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Bipolar Disorder Treatment</p>
                </div>
              </Link>
              <Link href="/ocd-psychiatrist-orlando" className="group">
                <div className="p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors text-center">
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">OCD Treatment Orlando</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* F) PROVIDER/CLINIC CREDIBILITY */}
        <AboutSection />
        <Suspense fallback={<div className="min-h-[400px] py-16 bg-background" />}>
          <TeamSection />
        </Suspense>

        {/* G) TESTIMONIALS */}
        <Suspense fallback={<div className="min-h-[400px] py-16 bg-card" />}>
          <TestimonialsSection />
        </Suspense>

        {/* H) FAQ */}
        <FAQSection includeSchema={true} />

        {/* I) LOCATION + HOURS */}
        <Suspense fallback={<div className="min-h-[400px] py-16 bg-background" />}>
          <LocationSection />
        </Suspense>

        {/* J) FINAL CTA */}
        <section className="py-12 md:py-16 bg-primary">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-white mb-4">
              Ready to Take the First Step?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Same-week appointments available. Most insurance accepted. Start your journey to better mental health today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-appointment">
                <Button size="lg" variant="secondary" className="px-8 text-lg" data-testid="button-final-cta-appointment">
                  Request Appointment
                </Button>
              </Link>
              <a href="tel:+13868488751">
                <Button size="lg" variant="outline" className="px-8 text-lg border-white text-white hover:bg-white/10" data-testid="button-final-cta-call">
                  Call (386) 848-8751
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
