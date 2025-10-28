import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home, Phone } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import { trackEvent } from "@/lib/analytics";

export default function ThankYou() {
  useEffect(() => {
    // Track conversion event
    trackEvent("form_submission");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Thank You | Empathy Health Clinic"
        description="Thank you for contacting Empathy Health Clinic. A team member will reach out within 24 hours."
      />
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-12 md:py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-4">
              Thank You for Reaching Out
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              Your request has been successfully submitted.
            </p>
          </div>

          <div className="bg-card border rounded-xl p-8 md:p-10 mb-8">
            <h2 className="text-2xl font-sans font-semibold text-foreground mb-4">
              What Happens Next?
            </h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">We'll Review Your Information</h3>
                  <p className="text-muted-foreground">Our team will carefully review your request and match you with the right provider.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">We'll Call You Within 24 Hours</h3>
                  <p className="text-muted-foreground">A member of our team will contact you to schedule your appointment and answer any questions.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Get Started on Your Journey</h3>
                  <p className="text-muted-foreground">We'll guide you through the process and help you take the first step toward better mental health.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
            <p className="text-base text-foreground mb-2 font-medium">
              Need Immediate Assistance?
            </p>
            <p className="text-muted-foreground mb-4">
              If you have an urgent concern, please call us directly.
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground border border-primary-border"
              data-testid="button-call-from-thank-you"
              asChild
            >
              <a href="tel:3868488751" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call (386) 848-8751
              </a>
            </Button>
          </div>

          <Button
            variant="outline"
            size="lg"
            data-testid="button-back-home"
            asChild
          >
            <a href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Back to Homepage
            </a>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
