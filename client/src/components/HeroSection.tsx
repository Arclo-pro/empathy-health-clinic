import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { SiteContent, InsuranceProvider } from "@shared/schema";
import heroImage from "@assets/image_1761934471053.png";
import empathyLogo from "@assets/image_1761934454982.png";
import HeroLeadForm from "@/components/HeroLeadForm";
import zocdocLogo from "@assets/logo_lockup_positive_rgb_1761921702261.png";
import googleLogo from "@assets/google-wordmark.webp";
import healthgradesLogo from "@assets/healthgrades-logo.png";
import yelpLogo from "@assets/image_1761925935867.png";

export default function HeroSection() {
  const { data: content } = useQuery<SiteContent>({
    queryKey: ["/api/site-content"],
  });

  const { data: insuranceProviders } = useQuery<InsuranceProvider[]>({
    queryKey: ["/api/insurance-providers"],
  });

  const title = content?.heroTitle || "Healing Begins with Empathy";
  const subtitle = content?.heroSubtitle || "Psychiatry, Psychotherapy & Counseling Clinic in Winter Park, Orlando, Florida";
  const reviewCount = content?.reviewCount || 65;
  const reviewRating = content?.reviewRating || "EXCELLENT";

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroImage}
          alt="Empathy Health Clinic - Peaceful healing environment"
          className="w-full h-full object-cover"
          width={1920}
          height={800}
          loading="eager"
          decoding="sync"
          style={{ backgroundColor: '#2d5f4a', objectPosition: '75% center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
      </div>
      
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo */}
          <div className="flex justify-center">
            <img 
              src={empathyLogo} 
              alt="Empathy Health Clinic" 
              className="h-64 md:h-80 w-auto drop-shadow-lg -mb-16"
            />
          </div>
          
          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-medium text-white mb-2 drop-shadow-lg">
            {title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/95 mb-10 drop-shadow font-light max-w-3xl mx-auto">
            {subtitle}
          </p>
          
          {/* Lead Form */}
          <div className="mb-10 w-full max-w-5xl mx-auto">
            <HeroLeadForm />
          </div>
          
          {/* Trust Factors */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-white">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-white" />
              <span className="text-sm md:text-base font-medium drop-shadow">Licensed Florida Clinicians</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-white" />
              <span className="text-sm md:text-base font-medium drop-shadow">In-Person & Telehealth</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-white" />
              <span className="text-sm md:text-base font-medium drop-shadow">Same-Week Appointments</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-white" />
              <span className="text-sm md:text-base font-medium drop-shadow">Most Insurance Accepted</span>
            </div>
          </div>
          
          {/* Rating and Insurance Cards */}
          <div className="flex flex-wrap justify-center items-center gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg px-6 py-3 shadow-md">
              <div className="flex items-center justify-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-black stroke-[1.5]" />
                  ))}
                </div>
                <span className="text-foreground font-semibold text-sm">4.8 EXCELLENT</span>
                <img src={googleLogo} alt="Google" className="h-3 w-auto object-contain" data-testid="badge-google" style={{ filter: 'saturate(1.3) contrast(1.1)' }} />
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg px-6 py-3 shadow-md">
              <div className="flex items-center gap-3">
                <span className="text-foreground font-semibold text-sm">Most Insurances Accepted</span>
                {insuranceProviders?.slice(0, 3).map((provider) => (
                  <img
                    key={provider.id}
                    src={provider.logo}
                    alt={provider.name}
                    className="h-6 w-auto object-contain"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
