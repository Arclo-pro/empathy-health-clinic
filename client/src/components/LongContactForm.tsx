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
import { CheckCircle2, Briefcase, Heart, Pill, CreditCard, User, Shield, Calendar, Clock } from "lucide-react";
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
  preferredDay: z.string().optional(),
  paymentMethod: z.enum(["insurance", "self-pay"]),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  insuranceProvider: z.string().optional(),
  insuredDob: z.string().optional(),
  memberId: z.string().optional(),
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

const DAYS = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
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
      preferredDay: "",
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
        conditions: JSON.stringify(concerns),
        symptoms: JSON.stringify(concerns),
        medications: data.medications,
        preferredDay: data.preferredDay,
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
    const fields = step === 1 ? ["service"] : step === 2 ? ["concerns"] : step === 3 ? ["medications", "preferredDay"] : [];
    const isValid = await form.trigger(fields as any);
    if (isValid) setStep(step + 1);
  };

  const totalSteps = 5;
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
      <div className="bg-primary/10 border-b px-6 py-3">
        <div className="flex items-center justify-center gap-2 text-primary font-semibold">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">Same-Day Appointments Available • Most Patients Scheduled Within 24 Hours</span>
        </div>
      </div>
      <div className="p-6 md:p-10">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              Step {step} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}% Complete
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
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Choose Your Service</h3>
                  <p className="text-sm text-muted-foreground">Select the type of care you're interested in</p>
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg mb-4 block">Preferred Service *</FormLabel>
                    <div className="grid grid-cols-1 gap-3">
                      {SERVICES.map((service) => (
                        <div
                          key={service.value}
                          onClick={() => {
                            handleFormStarted();
                            field.onChange(service.value);
                          }}
                          className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover-elevate ${
                            field.value === service.value
                              ? 'border-primary bg-primary/5 shadow-md'
                              : 'border-border bg-card hover:border-primary/50'
                          }`}
                          data-testid={`radio-service-${service.value}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                              field.value === service.value
                                ? 'border-primary bg-primary'
                                : 'border-muted-foreground'
                            }`}>
                              {field.value === service.value && (
                                <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                              )}
                            </div>
                            <span className={`font-medium ${
                              field.value === service.value ? 'text-foreground' : 'text-foreground'
                            }`}>
                              {service.label}
                            </span>
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
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Mental Health Information</h3>
                  <p className="text-sm text-muted-foreground">Help us understand your needs</p>
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="concerns"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-lg">
                      What brings you to therapy? (Select all that apply)
                    </FormLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                      {CONCERNS.map((concern) => (
                        <FormField
                          key={concern}
                          control={form.control}
                          name="concerns"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(concern)}
                                  onCheckedChange={(checked) => {
                                    const newValue = checked
                                      ? [...(field.value || []), concern]
                                      : field.value?.filter((value) => value !== concern);
                                    field.onChange(newValue);
                                  }}
                                  data-testid={`checkbox-concern-${concern}`}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {concern}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </FormItem>
                )}
              />

              {form.watch("concerns")?.includes("Other") && (
                <FormField
                  control={form.control}
                  name="concernsOther"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Please specify</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Specify..." data-testid="input-concerns-other" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Pill className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Medical Details</h3>
                  <p className="text-sm text-muted-foreground">Tell us about your current treatment</p>
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="medications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Medications</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="List any medications you are currently taking..." 
                        {...field} 
                        data-testid="textarea-medications"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-3 block">Preferred Day of Week</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {DAYS.map((day) => (
                        <div
                          key={day}
                          onClick={() => field.onChange(day)}
                          className={`p-3 border-2 rounded-lg cursor-pointer text-center transition-all hover-elevate ${
                            field.value === day
                              ? 'border-primary bg-primary/5 shadow-sm'
                              : 'border-border bg-card hover:border-primary/50'
                          }`}
                          data-testid={`radio-day-${day}`}
                        >
                          <span className={`text-sm font-medium ${
                            field.value === day ? 'text-primary' : 'text-foreground'
                          }`}>
                            {day}
                          </span>
                        </div>
                      ))}
                    </div>
                  </FormItem>
                )}
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Payment Information</h3>
                  <p className="text-sm text-muted-foreground">How would you like to pay?</p>
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg mb-4 block">Payment Method *</FormLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div
                        onClick={() => field.onChange('insurance')}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover-elevate ${
                          field.value === 'insurance'
                            ? 'border-primary bg-primary/5 shadow-md'
                            : 'border-border bg-card hover:border-primary/50'
                        }`}
                        data-testid="radio-payment-insurance"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            field.value === 'insurance'
                              ? 'border-primary bg-primary'
                              : 'border-muted-foreground'
                          }`}>
                            {field.value === 'insurance' && (
                              <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                            )}
                          </div>
                          <span className="font-medium">Insurance</span>
                        </div>
                      </div>
                      <div
                        onClick={() => field.onChange('self-pay')}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover-elevate ${
                          field.value === 'self-pay'
                            ? 'border-primary bg-primary/5 shadow-md'
                            : 'border-border bg-card hover:border-primary/50'
                        }`}
                        data-testid="radio-payment-self-pay"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            field.value === 'self-pay'
                              ? 'border-primary bg-primary'
                              : 'border-muted-foreground'
                          }`}>
                            {field.value === 'self-pay' && (
                              <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                            )}
                          </div>
                          <span className="font-medium">Self-pay</span>
                        </div>
                      </div>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Contact Information</h3>
                  <p className="text-sm text-muted-foreground">We'll use this to reach out to you</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input {...field} data-testid="input-first-name" />
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
                        <Input {...field} data-testid="input-last-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone *</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} data-testid="input-phone" />
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
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} data-testid="input-email" />
                    </FormControl>
                    <FormMessage />
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
                        <FormLabel>Insurance Provider</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-insurance-provider">
                              <SelectValue placeholder="Select your insurance provider" />
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
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="insuredDob"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth of Insured</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} data-testid="input-insured-dob" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="memberId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Member ID#</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-member-id" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
          )}

          <div className="flex justify-between pt-6 border-t">
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
            
            {step < 5 ? (
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
                {submitLead.isPending ? "Submitting..." : "Submit"}
              </Button>
            )}
          </div>
          
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
