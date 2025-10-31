import TopBanner from "@/components/TopBanner";
import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import InsuranceLogosStrip from "@/components/InsuranceLogosStrip";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import TreatmentsSection from "@/components/TreatmentsSection";
import ApproachSection from "@/components/ApproachSection";
import TeamSection from "@/components/TeamSection";
import ConditionsSection from "@/components/ConditionsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LocationSection from "@/components/LocationSection";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import OrganizationSchema from "@/components/OrganizationSchema";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Empathy Health Clinic | Psychiatry, Therapy & Counseling in Winter Park FL"
        description="Expert psychiatry & therapy in Winter Park, FL. Comprehensive mental health care including medication management & counseling. Most insurance accepted."
        keywords={["psychiatrist Winter Park", "mental health Winter Park FL", "therapy Winter Park", "psychiatric services Florida", "anxiety treatment Orlando", "depression treatment Florida"]}
        canonicalPath="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
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
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "17:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": "Saturday",
              "opens": "00:00",
              "closes": "00:00",
              "description": "By Appointment"
            }
          ],
          "areaServed": {
            "@type": "City",
            "name": "Winter Park",
            "containedIn": {
              "@type": "State",
              "name": "Florida"
            }
          },
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
          }
        }}
      />
      <OrganizationSchema />
      <TopBanner />
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <ReviewsAndBadges />
        <InsuranceLogosStrip />
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
        <InsuranceSection />
        <TreatmentsSection />
        <ApproachSection />
        <div className="border-t" />
        <TeamSection />
        <ConditionsSection />
        <div className="border-t" />
        <TestimonialsSection />
        <div className="border-t" />
        <LocationSection />
      </main>
      <SiteFooter />
    </div>
  );
}
