import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { SiteContent } from "@shared/schema";
import heroImage from "@assets/image_1761931549596.png";
import HeroLeadForm from "@/components/HeroLeadForm";
import zocdocLogo from "@assets/logo_lockup_positive_rgb_1761921702261.png";
import googleLogo from "@assets/google-wordmark.webp";
import healthgradesLogo from "@assets/healthgrades-logo.png";
import yelpLogo from "@assets/image_1761925935867.png";

export default function HeroSection() {
  const { data: content } = useQuery<SiteContent>({
    queryKey: ["/api/site-content"],
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
      </div>
      
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="max-w-3xl pr-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-medium text-white mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/95 leading-relaxed mb-6">
            {subtitle}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mb-8 text-white/95">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm md:text-base font-medium">Licensed Florida Clinicians</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm md:text-base font-medium">In-Person & Telehealth</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm md:text-base font-medium">Same-Week Appointments</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm md:text-base font-medium">Most Insurance Accepted</span>
            </div>
          </div>
          
          <div className="mb-8 w-full">
            <HeroLeadForm />
          </div>
          
          <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 max-w-sm shadow-xl">
            <div className="text-center mb-3">
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">4.8 EXCELLENT</div>
              <div className="flex justify-center items-center gap-2 mb-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <img src={googleLogo} alt="Google" className="h-4 w-auto object-contain" data-testid="badge-google" />
              </div>
            </div>
            <div className="border-t pt-3">
              <p className="text-foreground text-sm italic mb-1 text-center">
                "Absolutely wonderful experience!"
              </p>
              <p className="text-muted-foreground text-xs text-center">
                — Current Patient
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
