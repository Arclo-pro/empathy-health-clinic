import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertLeadSchema } from "@shared/schema";
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

const leadFormSchema = insertLeadSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

interface LeadCaptureFormProps {
  therapyName?: string;
}

export function LeadCaptureForm({ therapyName }: LeadCaptureFormProps) {
  const [submitted, setSubmitted] = useState(false);

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
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to submit lead");
      }
      return response.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
    },
  });

  if (submitted) {
    return (
      <div className="bg-primary/5 border-2 border-primary rounded-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-primary rounded-full p-3">
            <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h3 className="text-2xl font-semibold text-foreground mb-3">
          Thank You!
        </h3>
        <p className="text-muted-foreground mb-4">
          We've received your information and will contact you within 24 hours to schedule your appointment.
        </p>
        <p className="text-sm text-muted-foreground">
          Need immediate assistance? Call us at{" "}
          <a href="tel:3868488751" className="text-primary font-semibold hover:underline">
            386-848-8751
          </a>
        </p>
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
            className="w-full text-lg py-6"
            disabled={mutation.isPending}
            data-testid="button-submit-lead"
          >
            {mutation.isPending ? (
              "Submitting..."
            ) : (
              <>
                <Phone className="h-5 w-5 mr-2" />
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
        <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground">
          <Shield className="h-4 w-4" />
          <p>Your information is secure and confidential</p>
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
