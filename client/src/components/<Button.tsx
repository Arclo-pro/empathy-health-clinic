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

export default function HeroLeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
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

  const topServices = treatments?.slice(0, 8) || [];

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white/95 backdrop-blur-md rounded-2xl md:rounded-full shadow-2xl p-3 md:p-2 w-full"
      data-testid="form-hero-lead"
    >
      <div className="flex flex-col md:flex-row gap-3 md:gap-2">
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

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          disabled={submitLead.isPending}
          className="h-12 px-8 bg-primary text-primary-foreground border border-primary-border rounded-full whitespace-nowrap font-semibold w-full md:w-auto"
          data-testid="button-hero-submit"
        >
          <Calendar className="w-5 h-5 mr-2" />
          {submitLead.isPending ? "Submitting..." : "Book Now"}
        </Button>
      </div>
    </form>
  );
}
