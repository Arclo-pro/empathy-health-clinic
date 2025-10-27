import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
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
        <InsuranceSection />
        <TreatmentsSection />
        <ApproachSection />
        <TeamSection />
        <ConditionsSection />
        <TestimonialsSection />
      </main>
      <SiteFooter />
    </div>
  );
}
