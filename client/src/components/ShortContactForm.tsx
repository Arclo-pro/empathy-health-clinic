import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { useRef, useState } from "react";
import { CheckCircle2, Shield, Lock, Calendar, Clock } from "lucide-react";

const shortFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  smsOptIn: z.boolean().default(false),
  service: z.string().optional(),
});

type ShortFormValues = z.infer<typeof shortFormSchema>;

interface ShortContactFormProps {
  service?: string;
  className?: string;
}

export default function ShortContactForm({ service, className = "" }: ShortContactFormProps) {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formStartedTracked = useRef(false);
  
  const form = useForm<ShortFormValues>({
    resolver: zodResolver(shortFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      smsOptIn: false,
      service: service || "",
    },
  });

  const handleFormStarted = () => {
    if (!formStartedTracked.current) {
      formStartedTracked.current = true;
      trackEvent('form_started', 'engagement', 'Short Contact Form', 'short');
    }
  };

  const submitLead = useMutation({
    mutationFn: async (data: ShortFormValues) => {
      return apiRequest("POST", "/api/leads", {
        ...data,
        smsOptIn: data.smsOptIn ? "true" : "false",
        formType: "short",
      });
    },
    onSuccess: () => {
      setIsSubmitted(true);
      trackEvent('form_submission', 'conversion', 'Short Contact Form', service);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit request. Please try again.",
      });
    },
  });

  const onSubmit = (data: ShortFormValues) => {
    submitLead.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className={className}>
        <div className="bg-card border-2 border-primary/20 rounded-2xl shadow-lg p-6 md:p-8 text-center">
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
    <div className={className}>
      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="bg-primary/10 border-b px-6 py-3">
          <div className="flex items-center justify-center gap-2 text-primary font-semibold">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Same-Day Appointments Available</span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-sans font-bold text-foreground mb-2">
            Request an Appointment
          </h3>
          <p className="text-muted-foreground text-sm mb-6">
            Most patients scheduled within 24 hours • All insurance accepted
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John" 
                          {...field}
                          onFocus={handleFormStarted}
                          data-testid="input-first-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Doe" 
                          {...field}
                          onFocus={handleFormStarted}
                          data-testid="input-last-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="john@example.com" 
                        {...field}
                        onFocus={handleFormStarted}
                        data-testid="input-email"
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
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input 
                        type="tel" 
                        placeholder="(386) 555-1234" 
                        {...field}
                        onFocus={handleFormStarted}
                        data-testid="input-phone"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="smsOptIn"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        data-testid="checkbox-sms-opt-in"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal cursor-pointer">
                        I agree to receive SMS notifications about my appointment
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        
        <div className="sticky bottom-0 bg-card border-t p-5">
          <div className="mb-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Lock className="h-3 w-3" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>100% Confidential</span>
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full text-lg font-semibold" 
            size="lg"
            disabled={submitLead.isPending}
            data-testid="button-submit-form"
            onClick={form.handleSubmit(onSubmit)}
          >
            {submitLead.isPending ? "Submitting..." : "Get Scheduled Today"}
          </Button>
          <p className="text-center text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Response within 24 hours • Same-day scheduling available</span>
          </p>
        </div>
      </div>
    </div>
  );
}
