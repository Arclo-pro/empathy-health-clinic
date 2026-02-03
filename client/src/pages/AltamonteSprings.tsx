import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MapPin, Phone, Mail, Clock, Shield, Users, Heart, CheckCircle, Stethoscope, Brain } from "lucide-react";
const healthcareBg = "/site-assets/stock_images/healthcare_professio_70df12ba.webp";
import { trackEvent } from "@/lib/analytics";

export default function AltamonteSprings() {
  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Altamonte Springs Page', '386-848-8751');
  };

  const handleEmailClick = () => {
    trackEvent('email_click', 'conversion', 'Altamonte Springs Page');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Psychiatrist Altamonte Springs FL | Mental Health Therapy"
        description="Expert psychiatrists & therapists serving Altamonte Springs, FL. Depression, anxiety, ADHD treatment. Insurance accepted. Call 386-848-8751."
        keywords={["psychiatrist Altamonte Springs", "therapist Altamonte Springs FL", "mental health Altamonte Springs", "anxiety treatment Altamonte", "depression therapy Altamonte Springs", "psychiatry near Altamonte"]}
        canonicalPath="/locations/altamonte-springs"
        preloadImage={healthcareBg}
      />
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative py-20 px-4">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${healthcareBg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
          </div>
          <div className="container mx-auto max-w-6xl relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/90 mb-4">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 text-white" data-testid="text-page-title">
              Serving Altamonte Springs
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Empathy Health Clinic provides comprehensive mental health care to residents of Altamonte Springs. Just 10 minutes away in Winter Park, our experienced psychiatrists and therapists are here to support your wellbeing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                className=""
                data-testid="button-call-now-hero"
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
                className="bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20"
                data-testid="button-request-appointment-hero"
              >
                <Link href="/request-appointment">
                  Request Appointment
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Location & Contact Info */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
                Convenient Location Near Altamonte Springs
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're located just 10 minutes from Altamonte Springs in Winter Park, easily accessible via I-4
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card data-testid="card-address">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Our Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground font-medium mb-2">
                    2281 Lee Rd Suite 102
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Winter Park, FL 32810
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Just 10 minutes from Altamonte Springs via I-4 South
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="card-hours">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Office Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday:</span>
                      <span className="text-foreground font-medium">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday:</span>
                      <span className="text-foreground font-medium">By Appointment</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday:</span>
                      <span className="text-foreground font-medium">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="card-contact">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <a 
                      href="tel:3868488751" 
                      className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                      onClick={handlePhoneClick}
                      data-testid="link-phone"
                    >
                      <Phone className="h-4 w-4" />
                      <span className="font-medium">386-848-8751</span>
                    </a>
                    <a 
                      href="mailto:providers@empathyhealthclinic.com" 
                      className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                      onClick={handleEmailClick}
                      data-testid="link-email"
                    >
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">providers@empathyhealthclinic.com</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map Embed */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.0746!2d-81.3503!3d28.5947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e77b3b0c9c0001%3A0x1!2s2281%20Lee%20Rd%20%23102%2C%20Winter%20Park%2C%20FL%2032810!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Empathy Health Clinic Location Map"
                data-testid="map-embed"
              />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-20 bg-card border-y">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
                Mental Health Services for Altamonte Springs Residents
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive psychiatric and therapy services close to home
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Stethoscope className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Psychiatric Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Psychiatric evaluations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Medication management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Treatment for depression & anxiety</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>ADHD diagnosis and treatment</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Individual Therapy</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Cognitive Behavioral Therapy (CBT)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Trauma-focused therapy (EMDR)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Stress management counseling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Grief and loss counseling</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Specialized Care</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Couples therapy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Family counseling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Telehealth appointments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Flexible scheduling options</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button 
                asChild
                size="lg"
                data-testid="button-view-all-services"
              >
                <Link href="/services">
                  View All Services
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-8 text-center">
              Why Altamonte Springs Residents Choose Empathy Health Clinic
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">Convenient Location - Just 10 Minutes Away</h3>
                  <p className="text-muted-foreground">
                    Easy access from Altamonte Springs via I-4 South. Our Winter Park office provides quality care without a long commute.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">Licensed, Experienced Providers</h3>
                  <p className="text-muted-foreground">
                    Our psychiatrists and therapists are fully licensed mental health professionals with extensive experience treating anxiety, depression, trauma, and more.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">Insurance Accepted & Affordable Options</h3>
                  <p className="text-muted-foreground">
                    We accept most major insurance plans including Blue Cross Blue Shield, Aetna, UnitedHealthcare, Cigna, and Medicare. Sliding scale fees available for those without insurance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">Telehealth & In-Person Options</h3>
                  <p className="text-muted-foreground">
                    Choose between convenient virtual appointments from home or in-person visits at our comfortable Winter Park office.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">Evidence-Based Treatment</h3>
                  <p className="text-muted-foreground">
                    We use proven, evidence-based approaches including CBT, DBT, EMDR, and comprehensive psychiatric medication management tailored to your needs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">Compassionate, Personalized Care</h3>
                  <p className="text-muted-foreground">
                    We treat every patient as an individual with unique needs, providing judgment-free support in a welcoming, confidential environment.
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
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Serving Altamonte Springs and the greater Orlando area. Contact us today to schedule your appointment with a psychiatrist or therapist.
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
