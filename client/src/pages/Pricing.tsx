import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { DollarSign, Heart, Shield, CheckCircle, Phone, Mail, Calendar, Users } from "lucide-react";
const forestBg = "/site-assets/stock_images/misty_forest_morning_c7552d0a.jpg";
import { trackEvent } from "@/lib/analytics";

export default function Pricing() {
  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Pricing Page', '386-848-8751');
  };

  const handleEmailClick = () => {
    trackEvent('email_click', 'conversion', 'Pricing Page');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="In-Person Psychiatry & Therapy Pricing Winter Park FL | Empathy Health Clinic"
        description="Transparent pricing for in-person psychiatry and therapy services at our Winter Park, FL clinic. Face-to-face care, insurance accepted, sliding scale fees available. Call 386-848-8751."
        keywords={["psychiatry pricing Winter Park", "in-person therapy Winter Park", "face-to-face mental health care", "psychiatrist fees Winter Park", "therapy rates Florida", "affordable mental health care"]}
        canonicalPath="/pricing"
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
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 text-white" data-testid="text-page-title">
              Transparent Pricing for In-Person Mental Health Care
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Quality in-person psychiatric services and therapy at our Winter Park, FL clinic with clear pricing, insurance acceptance, and flexible payment options to fit your budget.
            </p>
          </div>
        </div>

        {/* Pricing Overview Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
                Affordable In-Person Mental Health Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Face-to-face care at our Winter Park clinic. We work with most insurance plans and offer flexible payment options to make quality mental health care accessible.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card data-testid="card-insurance-pricing">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Insurance Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    We accept most major insurance plans. Your out-of-pocket cost will depend on your specific plan's copay and deductible.
                  </p>
                  <ul className="space-y-2 mb-4 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      Blue Cross Blue Shield
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      Aetna & UnitedHealthcare
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      Cigna & Medicare
                    </li>
                  </ul>
                  <Link href="/insurance">
                    <Button variant="outline" className="w-full" data-testid="button-view-insurance-pricing">
                      View All Insurance Plans
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card data-testid="card-self-pay">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Self-Pay Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    For patients without insurance or those who prefer to pay out-of-pocket, we offer competitive self-pay rates.
                  </p>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-foreground">Initial Evaluation</span>
                      <span className="font-semibold text-foreground">$200-300</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-foreground">Follow-up Visit</span>
                      <span className="font-semibold text-foreground">$150-200</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-foreground">Therapy Session</span>
                      <span className="font-semibold text-foreground">$120-180</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    *Exact pricing varies by provider and service complexity
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="card-sliding-scale-pricing">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Sliding Scale Fees</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    We believe financial constraints shouldn't prevent you from getting the care you need. Income-based sliding scale fees available.
                  </p>
                  <ul className="space-y-2 mb-4 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      Based on household income
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      No one turned away for inability to pay
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      Confidential financial review
                    </li>
                  </ul>
                  <p className="text-xs text-muted-foreground">
                    Contact us to discuss your situation
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Service Pricing Details */}
        <section className="py-16 md:py-20 bg-card border-y">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-8 text-center">
              Mental Health Services We Offer
            </h2>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Psychiatric Evaluations & Medication Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">
                    In-person psychiatric assessments and ongoing medication management at our Winter Park clinic with board-certified psychiatrists. Face-to-face appointments include diagnosis, treatment planning, and medication monitoring services.
                  </p>
                  <div className="flex items-center justify-between bg-primary/5 p-3 rounded-lg">
                    <span className="text-sm font-medium text-foreground">Typical Insurance Copay</span>
                    <span className="font-semibold text-foreground">$20-50</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Individual Therapy & Counseling
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">
                    In-person evidence-based therapy at our clinic including Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), EMDR, and more with licensed therapists. All sessions conducted face-to-face.
                  </p>
                  <div className="flex items-center justify-between bg-primary/5 p-3 rounded-lg">
                    <span className="text-sm font-medium text-foreground">Typical Insurance Copay</span>
                    <span className="font-semibold text-foreground">$15-40</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Couples & Family Therapy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">
                    In-person specialized therapy for relationships and family dynamics at our Winter Park clinic. Face-to-face sessions to strengthen communication, resolve conflicts, and build healthier relationships.
                  </p>
                  <div className="flex items-center justify-between bg-primary/5 p-3 rounded-lg">
                    <span className="text-sm font-medium text-foreground">Typical Insurance Copay</span>
                    <span className="font-semibold text-foreground">$20-50</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 p-6 bg-primary/10 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">All Services Provided In-Person at Our Winter Park Clinic</h3>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>Face-to-face care:</strong> All psychiatric evaluations, medication management, and therapy sessions are conducted in person at our clinic located at 2281 Lee Rd #102, Winter Park, FL 32810. We believe in the value of direct, personal interaction for the highest quality mental health care.
              </p>
              <h3 className="font-semibold text-foreground mb-2 mt-4">Good Faith Estimate</h3>
              <p className="text-sm text-muted-foreground">
                Under federal law, you have the right to receive a "Good Faith Estimate" of expected charges for medical services. We will provide this estimate before your first visit and can discuss payment options during your consultation.
              </p>
            </div>
          </div>
        </section>

        {/* Payment & Billing Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-8 text-center">
              Flexible Payment Options
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods Accepted</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      All major credit cards
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      Debit cards
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      HSA/FSA cards
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      Cash or check
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Plans Available</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      Customized monthly plans
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      No interest charges
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      Flexible terms to fit your budget
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      Discuss during consultation
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-sans font-bold text-foreground mb-4">Insurance Verification & Billing</h3>
              <p className="text-foreground leading-relaxed mb-4">
                We verify your insurance coverage before your first appointment so you know exactly what to expect regarding costs. Our team handles all insurance billing and claims submission, making the process seamless for you. We'll work directly with your insurance company to maximize your benefits.
              </p>
              <p className="text-foreground leading-relaxed">
                If you have questions about pricing, insurance coverage, or payment options, our friendly staff is here to help. We're committed to transparency and will always discuss costs upfront so there are no surprises.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Schedule your appointment today and take the first step toward better mental health. We'll discuss pricing and payment options during your consultation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                asChild
                size="lg"
                data-testid="button-request-appointment-pricing"
              >
                <Link href="/request-appointment">
                  Request Appointment
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                data-testid="button-call-pricing"
              >
                <a href="tel:3868488751" onClick={handlePhoneClick}>
                  <Phone className="h-5 w-5 mr-2" />
                  Call 386-848-8751
                </a>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-muted-foreground">
              <a 
                href="tel:3868488751"
                className="flex items-center gap-2 hover:text-primary transition-colors"
                onClick={handlePhoneClick}
                data-testid="link-phone-pricing"
              >
                <Phone className="h-4 w-4" />
                386-848-8751
              </a>
              <a 
                href="mailto:providers@empathyhealthclinic.com"
                className="flex items-center gap-2 hover:text-primary transition-colors"
                onClick={handleEmailClick}
                data-testid="link-email-pricing"
              >
                <Mail className="h-4 w-4" />
                providers@empathyhealthclinic.com
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
