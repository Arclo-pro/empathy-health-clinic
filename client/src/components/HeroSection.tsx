import { useState } from "react";
import { Star } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { InsuranceProvider } from "@shared/schema";
import heroImage from "@assets/hero-sunset-florida.png";
import empathyLogo from "@assets/empathy-logo-optimized.webp";

export { heroImage };

export default function HeroSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const { data: insuranceProviders } = useQuery<InsuranceProvider[]>({
    queryKey: ["/api/insurance-providers"],
  });

  const submitLead = useMutation({
    mutationFn: async () => {
      const nameParts = name.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      return apiRequest("POST", "/api/leads", {
        firstName,
        lastName,
        email: email.trim(),
        phone: phone.trim(),
        service: "General Inquiry",
        formType: "hero",
        source: window.location.pathname,
        smsOptIn: "false",
      });
    },
    onSuccess: () => {
      setLocation('/thank-you');
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again or call us at (386) 848-8751.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name, email, and phone number.",
        variant: "destructive",
      });
      return;
    }

    submitLead.mutate();
  };

  const topInsurance = insuranceProviders?.slice(0, 3) || [];

  return (
    <section className="relative min-h-[100svh] md:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroImage}
          alt="Empathy Health Clinic - Peaceful sunset over calm water"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          loading="eager"
          fetchpriority="high"
          decoding="sync"
          style={{ backgroundColor: '#f5a26b', objectPosition: 'center center' }}
        />
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10" />
      </div>
      
      {/* Content Container */}
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
          
          {/* Left Side - Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Logo - Mobile only, centered */}
            <div className="flex justify-center lg:hidden mb-6">
              <img 
                src={empathyLogo} 
                alt="Empathy Health Clinic" 
                className="h-20 w-auto drop-shadow-lg"
                width={200}
                height={80}
                loading="eager"
                decoding="sync"
              />
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-medium text-white mb-2 drop-shadow-lg leading-tight">
              <span className="block">Psychiatry, Therapy</span>
              <span className="block">& Counseling</span>
            </h1>
            
            {/* Location Subheading */}
            <p className="text-2xl md:text-3xl lg:text-4xl font-sans font-light text-white/90 mb-8 drop-shadow-md">
              in Orlando, FL
            </p>

            {/* Mobile Trust Indicators */}
            <div className="lg:hidden space-y-4 mb-8">
              {/* Rating */}
              <div className="flex items-center justify-center gap-3 text-white">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-yellow-400/60 text-yellow-400/60'}`} 
                    />
                  ))}
                </div>
                <span className="font-semibold text-lg">4.8</span>
                <span className="font-medium">Google</span>
              </div>

              {/* Insurance Logos */}
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {topInsurance.map((provider) => (
                  <div 
                    key={provider.id}
                    className="h-8 w-20 flex items-center justify-center"
                  >
                    <img
                      src={provider.logo}
                      alt={provider.name}
                      className="max-h-full max-w-full object-contain brightness-0 invert opacity-90"
                      width={80}
                      height={32}
                      loading="eager"
                      decoding="sync"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Contact Form */}
            <div className="lg:hidden w-full max-w-sm mx-auto" id="mobile-contact-form">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                  Book an Appointment
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-3" data-testid="form-hero-lead-mobile">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    className="h-11 bg-gray-50 border-gray-200 rounded-lg text-base placeholder:text-gray-400"
                    data-testid="input-hero-name-mobile"
                    required
                  />
                  
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="h-11 bg-gray-50 border-gray-200 rounded-lg text-base placeholder:text-gray-400"
                    data-testid="input-hero-email-mobile"
                    required
                  />
                  
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    className="h-11 bg-gray-50 border-gray-200 rounded-lg text-base placeholder:text-gray-400"
                    data-testid="input-hero-phone-mobile"
                    required
                  />
                  
                  <Button
                    type="submit"
                    disabled={submitLead.isPending}
                    className="w-full h-11 bg-[#e07a4d] hover:bg-[#d16a3d] text-white border-0 rounded-lg text-base font-semibold"
                    data-testid="button-hero-submit-mobile"
                  >
                    {submitLead.isPending ? "Submitting..." : "Submit"}
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form Card (Desktop only) */}
          <div className="hidden lg:block w-full max-w-md" id="contact-form">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Book an Appointment
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-hero-lead">
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="h-12 bg-gray-50 border-gray-200 rounded-lg text-base placeholder:text-gray-400"
                  data-testid="input-hero-name"
                  required
                />
                
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="h-12 bg-gray-50 border-gray-200 rounded-lg text-base placeholder:text-gray-400"
                  data-testid="input-hero-email"
                  required
                />
                
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  className="h-12 bg-gray-50 border-gray-200 rounded-lg text-base placeholder:text-gray-400"
                  data-testid="input-hero-phone"
                  required
                />
                
                <Button
                  type="submit"
                  disabled={submitLead.isPending}
                  className="w-full h-12 bg-[#e07a4d] hover:bg-[#d16a3d] text-white border-0 rounded-lg text-base font-semibold"
                  data-testid="button-hero-submit"
                >
                  {submitLead.isPending ? "Submitting..." : "Submit"}
                </Button>
              </form>

              {/* Rating */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-yellow-400/60 text-yellow-400/60'}`} 
                    />
                  ))}
                </div>
                <span className="font-semibold text-gray-700">4.8</span>
              </div>

              {/* Insurance Logos */}
              <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
                {topInsurance.map((provider) => (
                  <div 
                    key={provider.id}
                    className="h-6 w-16 flex items-center justify-center"
                  >
                    <img
                      src={provider.logo}
                      alt={provider.name}
                      className="max-h-full max-w-full object-contain grayscale opacity-70"
                      width={64}
                      height={24}
                      loading="eager"
                      decoding="sync"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
