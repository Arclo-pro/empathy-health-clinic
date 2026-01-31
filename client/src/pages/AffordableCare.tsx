import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { DollarSign, Heart, Shield, Users, CheckCircle, Phone, Mail } from "lucide-react";
const forestBg = "/site-assets/stock_images/misty_forest_morning_c7552d0a.webp";
import { trackEvent } from "@/lib/analytics";

export default function AffordableCare() {
  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Affordable Care Page', '386-848-8751');
  };

  const handleEmailClick = () => {
    trackEvent('email_click', 'conversion', 'Affordable Care Page');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Affordable Therapy Winter Park FL | Sliding Scale Fees"
        description="Affordable mental health care in Winter Park, FL. Sliding scale fees, insurance accepted, payment plans available. Quality therapy accessible to all. Call 386-848-8751."
        keywords={["affordable therapy Winter Park", "sliding scale therapy Florida", "low cost mental health Orlando", "affordable psychiatrist Winter Park", "payment plans therapy", "uninsured mental health care"]}
        canonicalPath="/affordable-care"
      />
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative py-20 px-4">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${forestBg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
          </div>
          <div className="container mx-auto max-w-6xl relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/90 mb-4">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 text-white" data-testid="text-page-title">
              Affordable Mental Health Care
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Quality mental health care should be accessible to everyone. We offer flexible payment options, sliding scale fees, and work with most major insurance providers in Winter Park, FL.
            </p>
          </div>
        </div>

        {/* Payment Options Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
                Making Mental Health Care Accessible
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We believe everyone deserves access to quality mental health care, regardless of their financial situation
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card data-testid="card-insurance">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Insurance Accepted</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    We accept most major insurance plans including Blue Cross Blue Shield, Aetna, UnitedHealthcare, Cigna, Medicare, and more.
                  </p>
                  <Link href="/insurance">
                    <Button variant="outline" className="w-full" data-testid="button-view-insurance">
                      View Insurance Plans
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card data-testid="card-sliding-scale">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Sliding Scale Fees</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    For uninsured patients, we offer income-based sliding scale fees to ensure mental health care remains accessible and affordable.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Contact us to discuss your situation
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="card-payment-plans">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Flexible Payment Plans</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    We work with patients to create payment plans that fit your budget, ensuring treatment isn't delayed due to cost concerns.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ask about our options during your consultation
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="py-16 md:py-20 bg-card border-y">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-8 text-center">
              Affordable Services We Provide
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Psychiatric Evaluations</h3>
                  <p className="text-muted-foreground">Comprehensive mental health assessments with sliding scale options available</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Individual Therapy</h3>
                  <p className="text-muted-foreground">Evidence-based therapy including CBT, DBT, and EMDR at affordable rates</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Medication Management</h3>
                  <p className="text-muted-foreground">Ongoing psychiatric care with flexible payment options</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Couples & Family Therapy</h3>
                  <p className="text-muted-foreground">Relationship counseling with income-based pricing available</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Telehealth Services</h3>
                  <p className="text-muted-foreground">Convenient virtual appointments at the same affordable rates</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-8 text-center">
              Getting Started with Affordable Care
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Contact Us</h3>
                  <p className="text-muted-foreground">
                    Call or email us to discuss your needs and financial situation. We'll explain all available payment options during your initial conversation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Review Your Options</h3>
                  <p className="text-muted-foreground">
                    We'll help you understand insurance coverage, sliding scale eligibility, or payment plan options based on your individual circumstances.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Schedule Your Appointment</h3>
                  <p className="text-muted-foreground">
                    Once we've determined the best payment approach for you, we'll schedule your first appointment with one of our experienced providers.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Begin Your Care</h3>
                  <p className="text-muted-foreground">
                    Start your mental health journey without worrying about cost. We're here to support your wellbeing, not create financial stress.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-4">
              Don't Let Cost Be a Barrier to Care
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us today to discuss affordable mental health care options in Winter Park, FL. We're committed to finding a solution that works for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild
                size="lg"
                data-testid="button-call-now"
              >
                <a href="tel:3868488751" onClick={handlePhoneClick}>
                  <Phone className="h-5 w-5 mr-2" />
                  Call 386-848-8751
                </a>
              </Button>

              <Button 
                asChild
                variant="outline"
                size="lg"
                data-testid="button-email"
              >
                <a href="mailto:providers@empathyhealthclinic.com" onClick={handleEmailClick}>
                  <Mail className="h-5 w-5 mr-2" />
                  Email Us
                </a>
              </Button>

              <Button 
                asChild
                variant="outline"
                size="lg"
                data-testid="button-request-appointment"
              >
                <Link href="/request-appointment">
                  Request Appointment
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
