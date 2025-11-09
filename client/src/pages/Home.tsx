import { lazy, Suspense } from "react";
import { Link } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
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
        title="Empathy Health Clinic | Psychiatry, Therapy & Counseling in Winter Park FL"
        description="Expert psychiatry & therapy in Winter Park, FL serving Orlando, Lake Mary & Altamonte Springs. Same-week appointments, medication management & counseling. Most insurance accepted."
        keywords={["psychiatrist Winter Park", "mental health Winter Park FL", "therapy Winter Park", "psychiatric services Florida", "anxiety treatment Orlando", "depression treatment Florida"]}
        canonicalPath="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": ["MedicalClinic", "Psychiatrist", "LocalBusiness"],
          "@id": "https://empathyhealthclinic.com/#organization",
          "name": "Empathy Health Clinic",
          "alternateName": "Empathy Health",
          "description": "Mental health clinic providing psychiatric services, therapy, and medication management in Winter Park, Florida.",
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
