import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Shield, Phone } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { getUTMDataForLead } from "@/lib/utm-tracker";

const leadFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  therapyInterest: z.string().optional(),
  message: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

interface LeadCaptureFormProps {
  therapyName?: string;
}

export function LeadCaptureForm({ therapyName }: LeadCaptureFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [, setLocation] = useLocation();

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      therapyInterest: therapyName || "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: LeadFormData) => {
      // Split name into firstName and lastName
      const nameParts = data.name.trim().split(' ');
      const firstName = nameParts[0] || data.name;
      const lastName = nameParts.slice(1).join(' ') || ' ';
      
      // Get UTM parameters for Google Ads attribution
      const utmData = getUTMDataForLead();
      
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email: data.email,
          phone: data.phone,
          service: data.therapyInterest || therapyName || '',
          formType: "short",
          smsOptIn: "false",
          conditions: '[]',
          symptoms: '[]',
          // Include UTM tracking data and click IDs
          landingPage: utmData.landingPage,
          utmSource: utmData.utmSource,
          utmMedium: utmData.utmMedium,
          utmCampaign: utmData.utmCampaign,
          utmTerm: utmData.utmTerm,
          utmContent: utmData.utmContent,
          gclid: utmData.gclid, // Google Ads Click ID
          fbclid: utmData.fbclid, // Facebook Click ID
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit lead");
      }
      return response.json();
    },
    onSuccess: () => {
      trackEvent('form_submission', 'conversion', 'Lead Capture Form', therapyName);
      setLocation('/thank-you');
    },
  });

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 rounded-lg p-6">
        <div className="bg-white dark:bg-card rounded-lg p-6 md:p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Request Received!
          </h3>
          
          <p className="text-muted-foreground mb-6">
            Thank you for reaching out. We'll contact you within 24 hours to confirm your appointment.
          </p>

          <div className="bg-background border rounded-lg p-4 mb-6 text-left">
            <h4 className="font-semibold text-foreground mb-3">What Happens Next?</h4>
            <div className="space-y-2 text-sm">
              <div className="flex gap-3">
                <span className="text-primary font-bold">1.</span>
                <span className="text-muted-foreground">Our team reviews your request</span>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-bold">2.</span>
                <span className="text-muted-foreground">We call you to schedule within 24 hours</span>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-bold">3.</span>
                <span className="text-muted-foreground">You attend your first session</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" asChild>
              <a href="tel:3868488751">
                Call (386) 848-8751
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/">
                Return to Home
              </a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 rounded-lg p-6 sticky top-4">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Start Your Healing Journey Today
        </h3>
        <p className="text-muted-foreground text-sm">
          Schedule a confidential consultation with our expert therapists
        </p>
      </div>

      <div className="bg-white dark:bg-card rounded-lg p-4 mb-5 border">
        <div className="flex items-start gap-3 mb-3">
          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-foreground font-medium">Most Insurance Accepted</p>
            <p className="text-xs text-muted-foreground">Verify your coverage today</p>
          </div>
        </div>
        <div className="flex items-start gap-3 mb-3">
          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-foreground font-medium">Same-Week Appointments</p>
            <p className="text-xs text-muted-foreground">Get help when you need it</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-foreground font-medium">Licensed Professionals</p>
            <p className="text-xs text-muted-foreground">Expert, compassionate care</p>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-medium">Full Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Smith"
                    {...field}
                    autoComplete="name"
                    className="bg-white dark:bg-background"
                    data-testid="input-lead-name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-medium">Email Address *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                    autoComplete="email"
                    className="bg-white dark:bg-background"
                    data-testid="input-lead-email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-medium">Phone Number *</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="(386) 555-1234"
                    {...field}
                    autoComplete="tel"
                    className="bg-white dark:bg-background"
                    data-testid="input-lead-phone"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-medium">
                  Additional Information (Optional)
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your needs or preferred appointment times..."
                    className="resize-none bg-white dark:bg-background min-h-[80px]"
                    {...field}
                    value={field.value || ""}
                    data-testid="input-lead-message"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={mutation.isPending}
            data-testid="button-submit-lead"
          >
            {mutation.isPending ? (
              "Submitting..."
            ) : (
              <>
                <Phone className="h-4 w-4 mr-2" />
                Request Appointment
              </>
            )}
          </Button>

          {mutation.isError && (
            <p className="text-sm text-destructive text-center">
              Something went wrong. Please try again or call us directly.
            </p>
          )}
        </form>
      </Form>

      <div className="mt-5 pt-5 border-t">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2 text-xs font-medium text-foreground">
            <Shield className="h-4 w-4 text-primary" />
            <span>HIPAA-Compliant | Secure | We'll call you within 24 hours</span>
          </div>
          <p className="text-xs text-muted-foreground">Your privacy is protected by federal law</p>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground mb-2">Prefer to talk now?</p>
        <Button variant="outline" className="w-full" asChild data-testid="button-call-now">
          <a href="tel:3868488751" className="flex items-center justify-center gap-2">
            <Phone className="h-4 w-4" />
            Call 386-848-8751
          </a>
        </Button>
      </div>
    </div>
  );
}
