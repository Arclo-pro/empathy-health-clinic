import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, Phone, Mail } from "lucide-react";
import type { InsuranceProvider } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import HeroLeadForm from "@/components/HeroLeadForm";
import { trackEvent } from "@/lib/analytics";
import heroImage from "@assets/stock_images/healthcare_insurance_a8872338.jpg";

export default function Insurance() {
  const { data: providers, isLoading } = useQuery<InsuranceProvider[]>({
    queryKey: ["/api/insurance-providers"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Insurance Accepted Winter Park FL | Empathy Health"
        description="Psychiatry & therapy insurance Winter Park, FL. We accept Aetna, BCBS, Cigna, UnitedHealthcare & more. Mental health parity benefits. Call 386-848-8751."
        keywords={["psychiatry insurance Winter Park", "therapy insurance Florida", "mental health insurance Winter Park", "Aetna Winter Park", "BCBS Florida", "UnitedHealthcare Orlando"]}
        canonicalPath="/insurance"
      />
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70" />
        
        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white mb-6">
            Insurance We Accept
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Find an in-network doctor from most insurance plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              asChild 
              className=""
              data-testid="button-hero-call"
              onClick={() => trackEvent('phone_click', 'conversion', 'Insurance Hero Phone', '386-848-8751')}
            >
              <a href="tel:3868488751" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Call 386-848-8751
              </a>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              asChild 
              data-testid="button-hero-appointment"
              onClick={() => trackEvent('appointment_click', 'conversion', 'Insurance Hero CTA')}
            >
              <Link href="/request-appointment" className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Request Appointment
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section className="py-12 bg-background border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <HeroLeadForm />
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Insurance Provider Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-8 text-center">
            Our Accepted Insurance Plans
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Click on your insurance provider below to learn more about coverage details and copay information.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers?.map((provider) => (
              <Link 
                key={provider.id} 
                href={`/${provider.slug}`} 
                data-testid={`link-provider-${provider.id}`}
                onClick={() => trackEvent('insurance_provider_click', 'engagement', 'Insurance Page', provider.name)}
              >
                <Card className="h-full hover-elevate active-elevate-2 cursor-pointer transition-all">
                  <CardHeader className="flex flex-col items-center text-center space-y-4 pb-4">
                    {provider.logo ? (
                      <div className={`h-20 w-full flex items-center justify-center ${
                        provider.name === 'UMR' ? 'bg-muted rounded-lg' : ''
                      }`}>
                        <img
                          src={provider.logo}
                          alt={`${provider.name} logo`}
                          className="max-h-16 max-w-full object-contain"
                          data-testid={`img-provider-logo-${provider.id}`}
                        />
                      </div>
                    ) : (
                      <CardTitle className="text-xl pt-2" data-testid={`text-provider-name-${provider.id}`}>
                        {provider.name}
                      </CardTitle>
                    )}
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button variant="outline" className="w-full" data-testid={`button-view-coverage-${provider.id}`}>
                      View Coverage Details
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Understanding Mental Health Insurance */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-6">Understanding Your Mental Health Insurance Benefits</h2>
            
            <p className="text-foreground leading-relaxed mb-6">
              Mental health care is an essential part of your overall wellness, and most insurance plans provide comprehensive coverage for psychiatric services and therapy. Thanks to the Mental Health Parity and Addiction Equity Act, insurance companies are required to cover mental health services with the same generosity as they cover medical and surgical care. This means that your mental health benefits should be comparable to your physical health benefits in terms of copays, deductibles, and visit limits.
            </p>

            <p className="text-foreground leading-relaxed mb-6">
              At Empathy Health Clinic, we accept most major insurance plans and work directly with your insurance provider to maximize your benefits. Our team verifies your coverage before your first appointment, so you know exactly what to expect regarding costs. We handle all insurance billing and claims submission, making the process seamless for you.
            </p>

            <h3 className="text-2xl font-sans font-semibold text-foreground mb-4 mt-8">What Mental Health Services Are Typically Covered?</h3>
            
            <p className="text-foreground leading-relaxed mb-4">
              Most insurance plans cover a wide range of mental health services, including:
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  <Link href="/psychiatric-evaluation" className="text-primary hover:underline font-medium">Psychiatric evaluations</Link> and diagnostic assessments to identify mental health conditions and create personalized treatment plans
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  <Link href="/medication-management" className="text-primary hover:underline font-medium">Medication management</Link> visits with psychiatrists to prescribe and monitor psychiatric medications
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  Individual <Link href="/therapy" className="text-primary hover:underline font-medium">therapy sessions</Link> including cognitive-behavioral therapy (CBT), dialectical behavior therapy (DBT), and other evidence-based approaches
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  Treatment for common mental health conditions like <Link href="/anxiety-disorders" className="text-primary hover:underline font-medium">anxiety</Link>, <Link href="/depression" className="text-primary hover:underline font-medium">depression</Link>, <Link href="/adhd" className="text-primary hover:underline font-medium">ADHD</Link>, and <Link href="/ptsd" className="text-primary hover:underline font-medium">PTSD</Link>
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  Crisis intervention services and urgent mental health care when you need immediate support
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-sans font-semibold text-foreground mb-4 mt-8">How to Maximize Your Insurance Benefits</h3>
            
            <p className="text-foreground leading-relaxed mb-6">
              Understanding how to use your mental health insurance benefits effectively can help you get the care you need while managing out-of-pocket costs. Before your first appointment, call your insurance provider to ask about your mental health benefits, including your copay amount, deductible requirements, and any prior authorization needs. When you schedule with us, our staff will also verify your benefits and explain what your insurance covers.
            </p>

            <p className="text-foreground leading-relaxed mb-6">
              Many insurance plans require you to meet an annual deductible before coverage begins, though some plans waive the deductible for mental health services. After meeting your deductible (if applicable), you'll typically pay a copay or coinsurance for each visit. Most patients pay between $25 and $50 per session, depending on their specific plan and whether they're seeing a psychiatrist or therapist.
            </p>

            <p className="text-foreground leading-relaxed mb-6">
              If you have questions about your coverage or need help understanding your benefits, our billing team is here to assist you. We believe that cost should never be a barrier to getting the mental health care you deserve, and we'll work with you to find solutions that make treatment accessible and affordable.
            </p>
          </div>
        </div>

        {/* What to Expect Card */}
        <div className="bg-card rounded-lg p-8 border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-sans font-bold text-foreground mb-4 text-center">
              What to Expect with Insurance Coverage
            </h2>
            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-foreground">
                  Most insurance plans cover mental health services with similar benefits to medical care
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-foreground">
                  Typical copays range from $25-50 per session, depending on your specific plan
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-foreground">
                  We verify your benefits before your first appointment to avoid surprises
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-foreground">
                  Our team handles all insurance billing and claims on your behalf
                </p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
                Questions About Your Coverage?
              </h3>
              <p className="text-center text-muted-foreground mb-6">
                Our team is here to help verify your benefits and answer any insurance questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="default" 
                  asChild 
                  data-testid="button-call-office"
                  onClick={() => trackEvent('phone_click', 'conversion', 'Insurance Page Phone', '386-848-8751')}
                >
                  <a href="tel:3868488751" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Call 386-848-8751
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  asChild 
                  data-testid="button-request-appointment"
                  onClick={() => trackEvent('appointment_click', 'conversion', 'Insurance Page CTA')}
                >
                  <Link href="/request-appointment" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Request Appointment
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
