import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Briefcase, Heart, Pill, CreditCard, User, Shield, Calendar, Clock, Star, Building2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { getUTMDataForLead } from "@/lib/utm-tracker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { InsuranceProvider } from "@shared/schema";

const longFormSchema = z.object({
  service: z.string().min(1, "Please select a service"),
  concerns: z.array(z.string()).default([]),
  concernsOther: z.string().optional(),
  medications: z.string().optional(),
  paymentMethod: z.enum(["insurance", "self-pay"]),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  insuranceProvider: z.string().optional().default(""),
  insuredDob: z.string().optional().default(""),
  memberId: z.string().optional(),
}).superRefine((data, ctx) => {
  // Only require insurance fields when payment method is insurance
  if (data.paymentMethod === "insurance") {
    if (!data.insuranceProvider || data.insuranceProvider.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Insurance provider is required",
        path: ["insuranceProvider"],
      });
    }
    if (!data.insuredDob || data.insuredDob.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Date of birth is required",
        path: ["insuredDob"],
      });
    }
  }
});

type LongFormValues = z.infer<typeof longFormSchema>;

const SERVICES = [
  { value: "Psychiatric Services", label: "Psychiatric Services" },
  { value: "Therapy", label: "Therapy" },
  { value: "Medication Management", label: "Medication Management" },
];

const CONCERNS = [
  "Depression", 
  "Anxiety", 
  "Bipolar Disorder", 
  "ADHD", 
  "PTSD/Trauma",
  "OCD", 
  "Schizophrenia", 
  "Eating Disorders",
  "Relationship Issues",
  "Stress Management", 
  "Grief or Loss", 
  "Anger Management",
  "Self-Esteem Issues",
  "Other"
];

export default function LongContactForm() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const formStartedTracked = useRef(false);
  
  const { data: insuranceProviders } = useQuery<InsuranceProvider[]>({
    queryKey: ["/api/insurance-providers"],
  });
  
  const form = useForm<LongFormValues>({
    resolver: zodResolver(longFormSchema),
    defaultValues: {
      service: "",
      concerns: [],
      concernsOther: "",
      medications: "",
      paymentMethod: "insurance",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      insuranceProvider: "",
      insuredDob: "",
      memberId: "",
    },
  });

  const handleFormStarted = () => {
    if (!formStartedTracked.current) {
      formStartedTracked.current = true;
      trackEvent('form_started', 'engagement', 'Long Contact Form', 'long');
    }
  };

  const submitLead = useMutation({
    mutationFn: async (data: LongFormValues) => {
      const concerns = [...data.concerns];
      if (data.concernsOther) {
        concerns.push(data.concernsOther);
      }

      // Get UTM parameters for Google Ads attribution
      const utmData = getUTMDataForLead();

      return apiRequest("POST", "/api/leads", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        service: data.service,
        formType: "long",
        source: window.location.pathname,
        conditions: JSON.stringify(concerns),
        symptoms: JSON.stringify(concerns),
        medications: data.medications,
        paymentMethod: data.paymentMethod,
        insuranceProvider: data.insuranceProvider,
        insuredName: "",
        insuredDob: data.insuredDob,
        memberId: data.memberId,
        smsOptIn: "false",
        // Include UTM tracking data
        landingPage: utmData.landingPage,
        utmSource: utmData.utmSource,
        utmMedium: utmData.utmMedium,
        utmCampaign: utmData.utmCampaign,
        utmTerm: utmData.utmTerm,
        utmContent: utmData.utmContent,
      });
    },
    onSuccess: () => {
      trackEvent('form_submission', 'conversion', 'Long Contact Form', 'long');
      // Redirect to thank you page
      window.location.href = '/thank-you';
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit request. Please try again.",
      });
    },
  });

  const onSubmit = (data: LongFormValues) => {
    submitLead.mutate(data);
  };

  const nextStep = async () => {
    let fields: string[] = [];
    
    if (step === 1) {
      fields = ["firstName", "lastName", "email", "phone", "service"];
    } else if (step === 2) {
      fields = ["paymentMethod"];
      // If using insurance, also validate insurance fields
      if (form.getValues("paymentMethod") === "insurance") {
        fields.push("insuranceProvider", "insuredDob");
      }
    }
    
    const isValid = await form.trigger(fields as any);
    if (isValid) {
      // Track form started only when user advances from Step 1 to Step 2
      // This shows real intent to complete the form, not just curiosity
      if (step === 1) {
        handleFormStarted();
      }
      setStep(step + 1);
    }
  };

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  if (isSubmitted) {
    return (
      <div className="bg-background border-2 border-primary/20 rounded-2xl shadow-xl p-6 md:p-10">
        <div className="max-w-2xl mx-auto text-center py-8">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Request Received!
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for reaching out to Empathy Health Clinic. We've received your appointment request and will contact you within 24 hours to confirm your appointment.
          </p>

          <div className="bg-card border rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">What Happens Next?</h3>
            <div className="space-y-4 text-left">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Our team will review your request</p>
                  <p className="text-sm text-muted-foreground">We'll match you with the best provider for your needs</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">We'll call you to schedule</p>
                  <p className="text-sm text-muted-foreground">Expect a call within 24 hours during business hours</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Attend your first session</p>
                  <p className="text-sm text-muted-foreground">Take the first step toward better mental health</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Need immediate assistance?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" variant="outline" asChild>
                <a href="tel:3868488751">
                  Call (386) 848-8751
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/">
                  Return to Home
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background border-2 border-primary/20 rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-primary/10 border-b px-4 md:px-6 py-3">
        <div className="flex items-center justify-center gap-2 text-primary font-semibold">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">Same-Day Appointments Available • Most Patients Scheduled Within 24 Hours</span>
        </div>
      </div>
      
      {/* Trust Badges */}
      <div className="px-4 md:px-6 py-3 bg-card/50 border-b">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-xs">
          <div className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-foreground" />
            <span className="font-medium text-muted-foreground">HIPAA Secure</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5 px-1.5 py-0.5 bg-primary/10 rounded">
              <Star className="h-3 w-3 text-foreground fill-foreground" />
              <Star className="h-3 w-3 text-foreground fill-foreground" />
              <Star className="h-3 w-3 text-foreground fill-foreground" />
              <Star className="h-3 w-3 text-foreground fill-foreground" />
              <Star className="h-3 w-3 text-foreground fill-foreground" />
            </div>
            <span className="font-medium text-muted-foreground">5 Stars on Google</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-foreground" />
            <span className="font-medium text-muted-foreground">Serving Winter Park Patients</span>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-10">
        {/* Header with reassurance */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Request Your Appointment</h2>
          <p className="text-sm text-muted-foreground mb-3">Takes less than a minute to complete</p>
          <a 
            href="tel:386-848-8751"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            onClick={(e) => {
              e.preventDefault();
              // Track phone click
              fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  firstName: 'Phone',
                  lastName: 'Click',
                  email: 'phone-click@tracking.local',
                  phone: '386-848-8751',
                  service: 'Phone Contact',
                  formType: 'phone_click',
                  source: window.location.pathname,
                  paymentMethod: 'insurance',
                  smsOptIn: 'false',
                }),
                keepalive: true
              });
              window.location.href = 'tel:386-848-8751';
            }}
            data-testid="link-prefer-call"
          >
            Prefer to call? Tap here to speak with our team →
          </a>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-center mb-3">
            <span className="text-sm font-semibold text-foreground">
              Step {step} of {totalSteps}
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Basic Information</h3>
                  <p className="text-xs text-muted-foreground">Tell us about yourself</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="John" autoComplete="given-name" data-testid="input-first-name" />
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
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Doe" autoComplete="family-name" data-testid="input-last-name" />
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
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} placeholder="john@example.com" autoComplete="email" data-testid="input-email" />
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
                    <FormLabel>Phone *</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} placeholder="(555) 123-4567" autoComplete="tel" data-testid="input-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What service are you interested in? *</FormLabel>
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      {SERVICES.map((service) => (
                        <div
                          key={service.value}
                          onClick={() => field.onChange(service.value)}
                          className={`p-3 border-2 rounded-lg cursor-pointer transition-all hover-elevate ${
                            field.value === service.value
                              ? 'border-primary bg-primary/5'
                              : 'border-border bg-card hover:border-primary/50'
                          }`}
                          data-testid={`radio-service-${service.value}`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                              field.value === service.value
                                ? 'border-primary bg-primary'
                                : 'border-muted-foreground'
                            }`}>
                              {field.value === service.value && (
                                <CheckCircle2 className="h-2.5 w-2.5 text-primary-foreground" />
                              )}
                            </div>
                            <span className="text-sm font-medium">{service.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Preferences</h3>
                  <p className="text-xs text-muted-foreground">Help us personalize your care</p>
                </div>
              </div>

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method *</FormLabel>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div
                        onClick={() => field.onChange('insurance')}
                        className={`p-3 border-2 rounded-lg cursor-pointer transition-all hover-elevate ${
                          field.value === 'insurance'
                            ? 'border-primary bg-primary/5'
                            : 'border-border bg-card hover:border-primary/50'
                        }`}
                        data-testid="radio-payment-insurance"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            field.value === 'insurance'
                              ? 'border-primary bg-primary'
                              : 'border-muted-foreground'
                          }`}>
                            {field.value === 'insurance' && (
                              <CheckCircle2 className="h-2.5 w-2.5 text-primary-foreground" />
                            )}
                          </div>
                          <span className="text-sm font-medium">Insurance</span>
                        </div>
                      </div>
                      <div
                        onClick={() => field.onChange('self-pay')}
                        className={`p-3 border-2 rounded-lg cursor-pointer transition-all hover-elevate ${
                          field.value === 'self-pay'
                            ? 'border-primary bg-primary/5'
                            : 'border-border bg-card hover:border-primary/50'
                        }`}
                        data-testid="radio-payment-self-pay"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            field.value === 'self-pay'
                              ? 'border-primary bg-primary'
                              : 'border-muted-foreground'
                          }`}>
                            {field.value === 'self-pay' && (
                              <CheckCircle2 className="h-2.5 w-2.5 text-primary-foreground" />
                            )}
                          </div>
                          <span className="text-sm font-medium">Self-pay</span>
                        </div>
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              {form.watch("paymentMethod") === "insurance" && (
                <>
                  <FormField
                    control={form.control}
                    name="insuranceProvider"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Insurance Provider *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-insurance-provider">
                              <SelectValue placeholder="Select your insurance" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {insuranceProviders?.map((provider) => (
                              <SelectItem 
                                key={provider.id} 
                                value={provider.name}
                                data-testid={`select-option-${provider.slug}`}
                              >
                                {provider.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="insuredDob"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth *</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} autoComplete="bday" data-testid="input-insured-dob" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="memberId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Member ID (Optional)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="ID#" data-testid="input-member-id" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Review & Confirm</h3>
                  <p className="text-xs text-muted-foreground">Verify your information</p>
                </div>
              </div>
              
              <div className="bg-card border rounded-lg p-4 space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Contact Information</p>
                  <p className="font-medium">{form.watch("firstName")} {form.watch("lastName")}</p>
                  <p className="text-sm text-muted-foreground">{form.watch("email")}</p>
                  <p className="text-sm text-muted-foreground">{form.watch("phone")}</p>
                </div>

                <div className="border-t pt-3">
                  <p className="text-xs text-muted-foreground mb-1">Service Requested</p>
                  <p className="font-medium">{form.watch("service")}</p>
                </div>

                <div className="border-t pt-3">
                  <p className="text-xs text-muted-foreground mb-1">Payment Method</p>
                  <p className="font-medium capitalize">{form.watch("paymentMethod")}</p>
                  {form.watch("paymentMethod") === "insurance" && form.watch("insuranceProvider") && (
                    <p className="text-sm text-muted-foreground mt-1">{form.watch("insuranceProvider")}</p>
                  )}
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="text-sm font-medium text-foreground mb-2">What happens next?</p>
                <ul className="text-xs text-muted-foreground space-y-1.5">
                  <li>✓ We'll call you within 24 hours to schedule your appointment</li>
                  <li>✓ You'll be matched with the best provider for your needs</li>
                  <li>✓ Same-day appointments available for urgent cases</li>
                </ul>
              </div>
            </div>
          )}

          {/* Desktop buttons */}
          <div className="hidden md:flex justify-between pt-4 border-t">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
                data-testid="button-previous"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
            )}
            
            {step < 3 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="ml-auto"
                data-testid="button-next"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={submitLead.isPending}
                className="ml-auto"
                data-testid="button-submit"
              >
                {submitLead.isPending ? "Submitting..." : "Submit Request"}
              </Button>
            )}
          </div>

          {/* Mobile fixed buttons */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t shadow-lg z-50">
            <div className="flex gap-3 max-w-md mx-auto">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="flex-1"
                  data-testid="button-previous-mobile"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              )}
              
              {step < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className={step === 1 ? "w-full" : "flex-1"}
                  data-testid="button-next-mobile"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={submitLead.isPending}
                  className="flex-1"
                  data-testid="button-submit-mobile"
                >
                  {submitLead.isPending ? "Submitting..." : "Submit Request"}
                </Button>
              )}
            </div>
          </div>

          {/* Add padding on mobile to prevent content from hiding behind fixed button */}
          <div className="md:hidden h-20" />
          
          <div className="mt-6 pt-6 border-t">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                <Shield className="h-4 w-4 text-primary" />
                <span>HIPAA-Compliant | Secure | We'll call you within 24 hours</span>
              </div>
              <p className="text-xs text-muted-foreground">Your privacy is protected by federal law</p>
            </div>
          </div>
        </form>
      </Form>
      </div>
    </div>
  );
}
