import { useState } from "react";
import { Star } from "lucide-react";
import { SiGoogle } from "react-icons/si";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { InsuranceProvider } from "@shared/schema";

export const heroImage = "/site-assets/hero-sunset-florida.webp";

const serviceOptions = [
  "Psychiatry",
  "Therapy / Counseling",
  "Medication Management",
  "ADHD Treatment",
  "Anxiety Treatment",
  "Depression Treatment",
  "Couples Therapy",
  "Virtual Therapy",
  "Other",
];

export default function HeroSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const { data: insuranceProviders } = useQuery<InsuranceProvider[]>({
    queryKey: ["/api/insurance-providers"],
  });

  const submitLead = useMutation({
    mutationFn: async () => {
      const nameParts = name.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : firstName;

      const res = await apiRequest("POST", "/api/leads", {
        firstName,
        lastName,
        email: email.trim(),
        phone: phone.trim(),
        service: service || "General Inquiry",
        formType: "hero",
        source: window.location.pathname,
        smsOptIn: "false",
      });
      return res;
    },
    onSuccess: () => {
      setLocation('/thank-you');
    },
    onError: (error: Error) => {
      console.error("Hero form submission error:", error.message);
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

  const topInsurance = insuranceProviders?.slice(0, 4) || [];

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
                <SiGoogle className="w-5 h-5 text-white" />
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-yellow-400/60 text-yellow-400/60'}`} 
                    />
                  ))}
                </div>
                <span className="font-semibold text-lg">4.8</span>
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
                      alt={`${provider.name} mental health coverage accepted`}
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
                  <div>
                    <label htmlFor="hero-name-mobile" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <Input
                      id="hero-name-mobile"
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      className="h-11 bg-gray-50 border-gray-200 rounded-lg text-base placeholder:text-gray-400"
                      data-testid="input-hero-name-mobile"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="hero-email-mobile" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input
                      id="hero-email-mobile"
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className="h-11 bg-gray-50 border-gray-200 rounded-lg text-base placeholder:text-gray-400"
                      data-testid="input-hero-email-mobile"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="hero-phone-mobile" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <Input
                      id="hero-phone-mobile"
                      type="tel"
                      name="phone"
                      placeholder="(386) 555-1234"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="tel"
                      className="h-11 bg-gray-50 border-gray-200 rounded-lg text-base placeholder:text-gray-400"
                      data-testid="input-hero-phone-mobile"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="hero-service-mobile" className="block text-sm font-medium text-gray-700 mb-1">Service Interested In</label>
                    <Select value={service} onValueChange={setService}>
                      <SelectTrigger 
                        id="hero-service-mobile"
                        className="h-11 bg-gray-50 border-gray-200 rounded-lg text-base"
                        data-testid="select-hero-service-mobile"
                      >
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={submitLead.isPending}
                    className="w-full h-11 text-white border-0 rounded-lg text-base font-semibold"
                    data-testid="button-hero-submit-mobile"
                  >
                    {submitLead.isPending ? "Booking..." : "Book Appointment"}
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
                <div>
                  <label htmlFor="hero-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <Input
                    id="hero-name"
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    className="h-12 bg-gray-50 border-gray-200 rounded-lg text-base placeholder:text-gray-400"
                    data-testid="input-hero-name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="hero-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input
                    id="hero-email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="h-12 bg-gray-50 border-gray-200 rounded-lg text-base placeholder:text-gray-400"
                    data-testid="input-hero-email"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="hero-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <Input
                    id="hero-phone"
                    type="tel"
                    name="phone"
                    placeholder="(386) 555-1234"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    className="h-12 bg-gray-50 border-gray-200 rounded-lg text-base placeholder:text-gray-400"
                    data-testid="input-hero-phone"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="hero-service" className="block text-sm font-medium text-gray-700 mb-1">Service Interested In</label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger 
                      id="hero-service"
                      className="h-12 bg-gray-50 border-gray-200 rounded-lg text-base"
                      data-testid="select-hero-service"
                    >
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button
                  type="submit"
                  disabled={submitLead.isPending}
                  className="w-full h-12 text-white border-0 rounded-lg text-base font-semibold"
                  data-testid="button-hero-submit"
                >
                  {submitLead.isPending ? "Booking..." : "Book Appointment"}
                </Button>
              </form>

              {/* Rating */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <SiGoogle className="w-5 h-5 text-[#4285F4]" />
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
                      alt={`${provider.name} psychiatry coverage accepted`}
                      className="max-h-full max-w-full object-contain"
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
