import { lazy, Suspense } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/SiteHeader";
import HeroSection, { heroImage } from "@/components/HeroSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import TreatmentsSection from "@/components/TreatmentsSection";
import ApproachSection from "@/components/ApproachSection";
import ComparisonSection from "@/components/ComparisonSection";
import FeaturedResourcesSection from "@/components/FeaturedResourcesSection";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import OrganizationSchema from "@/components/OrganizationSchema";

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
          "@id": "https://empathyhealthclinic.com/#organization",
          "name": "Empathy Health Clinic",
          "alternateName": "Empathy Health",
          "description": "Mental health clinic providing psychiatric services, therapy, and medication management serving Orlando and Winter Park, Florida.",
          "url": "https://empathyhealthclinic.com",
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
              "containedInPlace": {
                "@type": "State",
                "name": "Florida"
              }
            },
            {
              "@type": "City",
              "name": "Orlando",
              "containedInPlace": {
                "@type": "State",
                "name": "Florida"
              }
            },
            {
              "@type": "City",
              "name": "Lake Mary",
              "containedInPlace": {
                "@type": "State",
                "name": "Florida"
              }
            },
            {
              "@type": "City",
              "name": "Altamonte Springs",
              "containedInPlace": {
                "@type": "State",
                "name": "Florida"
              }
            }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Mental Health Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Psychiatric Evaluation"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Medication Management"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Therapy Services"
                }
              }
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
      <main className="flex-1">
        <HeroSection />

        {/* Orlando Psychiatry Specialists Section */}
        <section className="py-16 bg-muted">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
                Orlando Psychiatry Specialists
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Board-certified psychiatrists serving Orlando, Winter Park, Altamonte Springs, Lake Mary, and Maitland. Same-week appointments available.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Link href="/psychiatry-clinic-orlando" className="group" data-testid="link-orlando-clinic">
                <div className="p-6 bg-primary/5 border-2 border-primary rounded-lg text-center hover-elevate transition-all h-full" data-testid="card-orlando-clinic">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary">
                    Psychiatry Clinic Orlando
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Leading Orlando psychiatry clinic - comprehensive care
                  </p>
                </div>
              </Link>

              <Link href="/psychiatrist-orlando" className="group" data-testid="link-orlando-psychiatrist">
                <div className="p-6 bg-card border rounded-lg text-center hover-elevate transition-all h-full" data-testid="card-orlando-psychiatrist">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary">
                    Psychiatrist Orlando
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Expert medication management & psychiatric evaluations
                  </p>
                </div>
              </Link>

              <Link href="/adhd-psychiatrist-orlando" className="group" data-testid="link-orlando-adhd">
                <div className="p-6 bg-card border rounded-lg text-center hover-elevate transition-all h-full" data-testid="card-orlando-adhd">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary">
                    ADHD Psychiatrist
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Adult & child ADHD diagnosis and treatment
                  </p>
                </div>
              </Link>

              <Link href="/anxiety-psychiatrist-orlando" className="group" data-testid="link-orlando-anxiety">
                <div className="p-6 bg-card border rounded-lg text-center hover-elevate transition-all h-full" data-testid="card-orlando-anxiety">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary">
                    Anxiety Psychiatrist
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive anxiety & panic disorder treatment
                  </p>
                </div>
              </Link>

              <Link href="/bipolar-psychiatrist-orlando" className="group" data-testid="link-orlando-bipolar">
                <div className="p-6 bg-card border rounded-lg text-center hover-elevate transition-all h-full" data-testid="card-orlando-bipolar">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary">
                    Bipolar Psychiatrist
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Expert mood stabilization & bipolar treatment
                  </p>
                </div>
              </Link>

              <Link href="/medication-management-orlando" className="group" data-testid="link-orlando-medication">
                <div className="p-6 bg-card border rounded-lg text-center hover-elevate transition-all h-full" data-testid="card-orlando-medication">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary">
                    Medication Management
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Ongoing psychiatric medication optimization
                  </p>
                </div>
              </Link>

              <Link href="/telepsychiatry-orlando" className="group" data-testid="link-orlando-telepsychiatry">
                <div className="p-6 bg-card border rounded-lg text-center hover-elevate transition-all h-full" data-testid="card-orlando-telepsychiatry">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary">
                    Telepsychiatry
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Convenient online psychiatry appointments
                  </p>
                </div>
              </Link>

              <Link href="/same-day-psychiatrist-orlando" className="group" data-testid="link-orlando-same-day">
                <div className="p-6 bg-card border rounded-lg text-center hover-elevate transition-all h-full" data-testid="card-orlando-same-day">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary">
                    Same-Day Psychiatrist
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Urgent psychiatric care when you need it
                  </p>
                </div>
              </Link>
            </div>

            <div className="text-center">
              <Link href="/psychiatrist-orlando">
                <Button size="lg" data-testid="button-view-all-orlando">
                  View All Orlando Services
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <InsuranceSection />
        <section className="py-12 md:py-16 bg-card border-y">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
                Why Choose Empathy Health Clinic
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Trusted mental health care with a commitment to excellence and compassion
              </p>
            </div>
            <TrustFactors />
          </div>
        </section>
        <AboutSection />
        <TreatmentsSection />
        
        <section className="py-12 md:py-16 bg-background border-y">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
                Specialized Therapy Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Evidence-based therapeutic approaches to help you thrive
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link 
                href="/cognitive-behavioral-therapy" 
                className="group p-6 rounded-lg border border-border bg-card hover-elevate transition-all"
                data-testid="link-cbt-therapy"
              >
                <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  Cognitive Behavioral Therapy (CBT)
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Transform negative thought patterns and behaviors with proven CBT techniques
                </p>
                <span className="text-sm text-primary font-medium">Learn More →</span>
              </Link>

              <Link 
                href="/anger-management" 
                className="group p-6 rounded-lg border border-border bg-card hover-elevate transition-all"
                data-testid="link-anger-management"
              >
                <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  Anger Management
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Learn healthy ways to manage and express anger constructively
                </p>
                <span className="text-sm text-primary font-medium">Learn More →</span>
              </Link>

              <Link 
                href="/ptsd-treatment" 
                className="group p-6 rounded-lg border border-border bg-card hover-elevate transition-all"
                data-testid="link-ptsd-treatment"
              >
                <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  PTSD Treatment
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Specialized trauma therapy to help you heal and move forward
                </p>
                <span className="text-sm text-primary font-medium">Learn More →</span>
              </Link>

              <Link 
                href="/esa-letter" 
                className="group p-6 rounded-lg border border-border bg-card hover-elevate transition-all"
                data-testid="link-esa-letter"
              >
                <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  ESA Letter
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Get a legitimate emotional support animal letter from licensed professionals
                </p>
                <span className="text-sm text-primary font-medium">Learn More →</span>
              </Link>

              <Link 
                href="/concentration-and-focus-therapy" 
                className="group p-6 rounded-lg border border-border bg-card hover-elevate transition-all"
                data-testid="link-concentration-therapy"
              >
                <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  Focus & Concentration Therapy
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Improve attention, focus, and productivity through targeted interventions
                </p>
                <span className="text-sm text-primary font-medium">Learn More →</span>
              </Link>

              <Link 
                href="/virtual-counseling-services" 
                className="group p-6 rounded-lg border border-border bg-card hover-elevate transition-all"
                data-testid="link-virtual-counseling"
              >
                <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  Virtual Counseling
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Access quality mental health care from the comfort of your home
                </p>
                <span className="text-sm text-primary font-medium">Learn More →</span>
              </Link>

              <Link 
                href="/in-person-therapy" 
                className="group p-6 rounded-lg border border-border bg-card hover-elevate transition-all"
                data-testid="link-in-person-therapy"
              >
                <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  In-Person Therapy
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Face-to-face therapy sessions at our Winter Park location
                </p>
                <span className="text-sm text-primary font-medium">Learn More →</span>
              </Link>

              <Link 
                href="/services" 
                className="group p-6 rounded-lg border border-border bg-card hover-elevate transition-all"
                data-testid="link-view-all-services"
              >
                <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  View All Services
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Explore our complete range of mental health services
                </p>
                <span className="text-sm text-primary font-medium">See All →</span>
              </Link>
            </div>
          </div>
        </section>

        <ApproachSection />
        <div className="border-t" />
        <ComparisonSection />
        <ReviewsAndBadges />
        <div className="border-t" />
        <Suspense fallback={<div className="min-h-[2400px] py-20 bg-background" />}>
          <TestimonialsSection />
          <div className="border-t" />
          <TeamSection />
          <ConditionsSection />
          <div className="border-t" />
          <FAQSection />
          <div className="border-t" />
          <FeaturedResourcesSection />
          <div className="border-t" />
          <LocationSection />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
