import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "lucide-react";
import type { Treatment } from "@shared/schema";
import { InsurancePrequalification, validateInsurancePrequalification, type InsuranceType } from "./InsurancePrequalification";

export default function HeroLeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [hpWebsite, setHpWebsite] = useState(""); // Honeypot field
  const [insuranceType, setInsuranceType] = useState<InsuranceType>("");
  const [medicationAcknowledged, setMedicationAcknowledged] = useState(false);
  const [prequalError, setPrequalError] = useState<string | null>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const { data: treatments } = useQuery<Treatment[]>({
    queryKey: ["/api/treatments"],
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
        service: service || "General Inquiry",
        formType: "hero",
        source: window.location.pathname,
        smsOptIn: "false",
        hp_website: hpWebsite, // Honeypot field
        insuranceType: insuranceType,
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

    // Validate insurance prequalification
    const prequalValidation = validateInsurancePrequalification(insuranceType, medicationAcknowledged);
    if (prequalValidation) {
      setPrequalError(prequalValidation);
      return;
    }
    setPrequalError(null);

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

  const topServices = treatments?.slice(0, 8) || [];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 md:p-6 w-full"
      data-testid="form-hero-lead"
    >
      {/* Honeypot field - hidden from users, catches bots */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="hp_website_hero">Website</label>
        <input
          type="text"
          id="hp_website_hero"
          name="hp_website"
          value={hpWebsite}
          onChange={(e) => setHpWebsite(e.target.value)}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      {/* Clarity Message */}
      <p className="text-xs text-gray-600 mb-4 text-center">
        We serve commercial insurance and self-pay patients and do not accept Medicaid or Sunshine Health.
      </p>

      <div className="flex flex-col md:flex-row gap-3 md:gap-2 mb-4">
        {/* Name Input */}
        <div className="flex-1 min-w-0">
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="h-12 border-0 bg-white/50 md:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder:text-muted-foreground/70 rounded-xl md:rounded-none"
            data-testid="input-hero-name"
            required
          />
        </div>

        {/* Email Input */}
        <div className="flex-1 min-w-0">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="h-12 border-0 bg-white/50 md:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder:text-muted-foreground/70 rounded-xl md:rounded-none"
            data-testid="input-hero-email"
            required
          />
        </div>

        {/* Phone Input */}
        <div className="flex-1 min-w-0">
          <Input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            className="h-12 border-0 bg-white/50 md:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder:text-muted-foreground/70 rounded-xl md:rounded-none"
            data-testid="input-hero-phone"
            required
          />
        </div>

        {/* Service Select */}
        <div className="flex-1 min-w-0">
          <Select value={service} onValueChange={setService}>
            <SelectTrigger 
              className="h-12 border-0 bg-white/50 md:bg-transparent focus:ring-0 focus:ring-offset-0 text-base rounded-xl md:rounded-none"
              data-testid="select-hero-service"
            >
              <SelectValue placeholder="Select Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="General Inquiry">General Inquiry</SelectItem>
              {topServices.map((treatment) => (
                <SelectItem key={treatment.id} value={treatment.title}>
                  {treatment.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

      </div>

      {/* Insurance Pre-qualification */}
      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 mb-4">
        <InsurancePrequalification
          insuranceType={insuranceType}
          onInsuranceTypeChange={(value) => {
            setInsuranceType(value);
            setPrequalError(null);
          }}
          medicationAcknowledged={medicationAcknowledged}
          onMedicationAcknowledgedChange={(value) => {
            setMedicationAcknowledged(value);
            setPrequalError(null);
          }}
          compact={true}
        />
      </div>

      {prequalError && (
        <p className="text-sm text-red-600 mb-4 text-center" data-testid="text-prequal-error-hero">
          {prequalError}
        </p>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        disabled={submitLead.isPending}
        className="h-12 px-8 bg-primary text-primary-foreground border border-primary-border rounded-full whitespace-nowrap font-semibold w-full"
        data-testid="button-hero-submit"
      >
        <Calendar className="w-5 h-5 mr-2" />
        {submitLead.isPending ? "Submitting..." : "Book Now"}
      </Button>
    </form>
  );
}
