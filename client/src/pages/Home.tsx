import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import TreatmentsSection from "@/components/TreatmentsSection";
import ApproachSection from "@/components/ApproachSection";
import TeamSection from "@/components/TeamSection";
import ConditionsSection from "@/components/ConditionsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <section className="py-16 md:py-20 bg-card border-y">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
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
      </main>
      <SiteFooter />
    </div>
  );
}
