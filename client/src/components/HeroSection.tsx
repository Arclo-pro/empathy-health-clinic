import { Button } from "@/components/ui/button";
import { Phone, Star } from "lucide-react";
import { SiGoogle } from "react-icons/si";
import { useQuery } from "@tanstack/react-query";
import type { SiteContent } from "@shared/schema";
import heroImageFallback from "@assets/generated_images/Calming_clinic_waiting_room_883e95f7.png";

export default function HeroSection() {
  const { data: content } = useQuery<SiteContent>({
    queryKey: ["/api/site-content"],
  });

  const heroImage = content?.heroImage || heroImageFallback;
  const title = content?.heroTitle || "Healing Begins with Empathy";
  const subtitle = content?.heroSubtitle || "Psychiatry, Psychotherapy & Counseling Clinic in Winter Park, Orlando, Florida";
  const reviewCount = content?.reviewCount || 65;
  const reviewRating = content?.reviewRating || "EXCELLENT";

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          backgroundColor: '#2d5f4a'
        }}
        onError={(e) => {
          console.error('Hero image failed to load:', heroImage);
          e.currentTarget.style.backgroundImage = `url(${heroImageFallback})`;
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </div>
      
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-white mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/95 leading-relaxed mb-8 max-w-2xl">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground border border-primary-border px-8 py-6 text-lg rounded-full backdrop-blur-md"
              data-testid="button-request-appointment"
              onClick={() => console.log('Request appointment clicked')}
            >
              Request Appointment
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg rounded-full backdrop-blur-md bg-white/10 text-white border-white/30"
              data-testid="button-call-now"
              onClick={() => console.log('Call now clicked')}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </Button>
          </div>
          
          <div className="flex items-center gap-3 text-white/95">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-full">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-medium">{reviewRating}</span>
            </div>
            <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded">
              <span className="text-xl font-bold" style={{ color: '#4285F4' }}>G</span>
              <span className="text-xl font-bold" style={{ color: '#EA4335' }}>o</span>
              <span className="text-xl font-bold" style={{ color: '#FBBC05' }}>o</span>
              <span className="text-xl font-bold" style={{ color: '#4285F4' }}>g</span>
              <span className="text-xl font-bold" style={{ color: '#34A853' }}>l</span>
              <span className="text-xl font-bold" style={{ color: '#EA4335' }}>e</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
