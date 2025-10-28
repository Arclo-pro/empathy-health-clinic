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
import { useRef } from "react";

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
      toast({
        title: "Request Submitted!",
        description: "We'll contact you soon to schedule your appointment.",
      });
      form.reset();
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

  return (
    <div className={className}>
      <h3 className="text-2xl font-sans font-bold text-foreground mb-6">
        Request an Appointment
      </h3>
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

          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={submitLead.isPending}
            data-testid="button-submit-form"
          >
            {submitLead.isPending ? "Submitting..." : "Request Appointment"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
