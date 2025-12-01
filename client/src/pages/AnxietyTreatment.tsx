import { Button } from "@/components/ui/button";
import { Heart, Shield, Calendar, Brain, MapPin, Phone, Clock, Star, CheckCircle } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import HeroBackground from "@/components/HeroBackground";
import { AuthoritativeSourcesBlock } from "@/components/AuthoritativeSource";
import heroImage from "@assets/stock_images/calm_peaceful_therap_b118766b.jpg";
import { trackEvent } from "@/lib/analytics";
import TherapyFAQ from "@/components/TherapyFAQ";
import ShortContactForm from "@/components/ShortContactForm";

export default function AnxietyTreatment() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness", "Psychiatrist"],
    "name": "Anxiety Treatment Orlando FL - Empathy Health Clinic",
    "description": "Comprehensive anxiety treatment in Orlando, FL. Psychiatric evaluation, medication management, and therapy for anxiety disorders.",
    "url": "https://empathyhealthclinic.com/anxiety-treatment",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Orlando",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.59544,
      "longitude": -81.36537
    },
    "areaServed": [
      { "@type": "City", "name": "Orlando" },
      { "@type": "City", "name": "Winter Park" },
      { "@type": "City", "name": "Altamonte Springs" }
    ],
    "medicalSpecialty": "Psychiatry - Anxiety Treatment"
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Anxiety Treatment Orlando Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Anxiety Treatment Orlando FL | Expert Psychiatric Care"
        description="Anxiety treatment Orlando - Board-certified psychiatrists for GAD, panic disorder, social anxiety. Medication management + therapy. Same-week appointments. Call 386-848-8751."
        keywords={["anxiety treatment orlando", "anxiety treatment orlando fl", "anxiety doctor orlando", "anxiety specialist orlando", "anxiety medication orlando", "panic disorder treatment orlando", "GAD treatment orlando", "social anxiety treatment orlando"]}
        canonicalPath="/anxiety-treatment"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Anxiety Treatment Orlando
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Comprehensive anxiety treatment by board-certified psychiatrists in Orlando. Expert medication management for generalized anxiety, panic disorder, social anxiety, and phobias. Get relief from anxiety with same-week appointments.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              data-testid="button-hero-cta"
              onClick={() => trackEvent('anxiety_treatment_hero_cta', 'conversion', 'Anxiety Treatment Orlando Page')}
            >
              <a href="#contact-form">Request Appointment</a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="bg-background/20 backdrop-blur-sm border-white/30 text-white hover:bg-background/30"
              data-testid="button-hero-phone"
              onClick={handlePhoneClick}
            >
              <a href="tel:386-848-8751">Call 386-848-8751</a>
            </Button>
          </div>
        </HeroBackground>

        <section className="py-8 bg-card border-b">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-lg font-semibold text-foreground">4.8</span>
                <span className="text-sm text-muted-foreground">Google Reviews</span>
              </div>
              <div className="hidden lg:block h-6 w-px bg-border" />
              <VerifiedOnBadge />
              <div className="hidden lg:block h-6 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Anxiety Specialists</span>
              </div>
              <div className="hidden lg:block h-6 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Same-Week Appointments</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 bg-primary/5 border-y">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3" data-testid="location-info">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Our Orlando Location</h3>
                  <p className="text-sm text-muted-foreground">
                    2281 Lee Rd Suite 102<br />
                    Winter Park, FL 32810<br />
                    (Serving Orlando metro area)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3" data-testid="contact-info">
                <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Call or Text</h3>
                  <a 
                    href="tel:386-848-8751" 
                    className="text-lg font-bold text-primary hover:underline"
                    data-testid="link-phone"
                    onClick={handlePhoneClick}
                  >
                    386-848-8751
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Same-week anxiety treatment appointments
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3" data-testid="hours-info">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Office Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Mon-Fri: 9:00 AM - 6:00 PM<br />
                    Telehealth & in-person available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Anxiety Treatment in Orlando: Expert Psychiatric Care
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-muted-foreground mb-4">
                    Anxiety disorders are among the most common mental health conditions, affecting millions of Americans. At Empathy Health Clinic, our board-certified psychiatrists in Orlando provide comprehensive anxiety treatment combining expert medication management with evidence-based therapeutic approaches.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Whether you're experiencing generalized anxiety, panic attacks, social anxiety, or specific phobias, our anxiety specialists can help you find relief with personalized treatment plans and same-week appointments.
                  </p>
                </div>

                <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">Anxiety Conditions We Treat in Orlando</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {[
                    "Generalized Anxiety Disorder (GAD)",
                    "Panic Disorder & Panic Attacks",
                    "Social Anxiety Disorder",
                    "Specific Phobias",
                    "Obsessive-Compulsive Disorder (OCD)",
                    "Health Anxiety",
                    "Performance Anxiety",
                    "Separation Anxiety (Adults)"
                  ].map((condition, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{condition}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">Our Anxiety Treatment Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-card border rounded-lg p-6">
                    <Brain className="h-8 w-8 text-primary mb-3" />
                    <h4 className="font-semibold text-foreground mb-2">Psychiatric Evaluation</h4>
                    <p className="text-sm text-muted-foreground">Comprehensive assessment to accurately diagnose your anxiety disorder and identify any co-occurring conditions.</p>
                  </div>
                  <div className="bg-card border rounded-lg p-6">
                    <Shield className="h-8 w-8 text-primary mb-3" />
                    <h4 className="font-semibold text-foreground mb-2">Medication Management</h4>
                    <p className="text-sm text-muted-foreground">Expert prescribing of anti-anxiety medications including SSRIs, SNRIs, buspirone, and targeted treatments.</p>
                  </div>
                  <div className="bg-card border rounded-lg p-6">
                    <Heart className="h-8 w-8 text-primary mb-3" />
                    <h4 className="font-semibold text-foreground mb-2">Therapy Integration</h4>
                    <p className="text-sm text-muted-foreground">Coordination with CBT and other evidence-based therapies for comprehensive anxiety treatment.</p>
                  </div>
                  <div className="bg-card border rounded-lg p-6">
                    <Calendar className="h-8 w-8 text-primary mb-3" />
                    <h4 className="font-semibold text-foreground mb-2">Ongoing Support</h4>
                    <p className="text-sm text-muted-foreground">Regular follow-ups to monitor progress, adjust medications, and ensure optimal anxiety relief.</p>
                  </div>
                </div>

                <AuthoritativeSourcesBlock sources={[
                  { source: "NIMH", topic: "Anxiety Disorders" },
                  { source: "APA", topic: "Anxiety Treatment Guidelines" }
                ]} />
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24" id="contact-form">
                  <ShortContactForm 
                    formType="anxiety_treatment"
                    heading="Schedule Anxiety Treatment"
                    subheading="Same-week appointments. Most insurance accepted."
                  />
                  <div className="mt-6 bg-card border rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-3">Related Services</h4>
                    <ul className="space-y-2">
                      <li><a href="/psychiatrist-orlando" className="text-primary hover:underline text-sm">Psychiatrist Orlando</a></li>
                      <li><a href="/anxiety-psychiatrist-orlando" className="text-primary hover:underline text-sm">Anxiety Psychiatrist Orlando</a></li>
                      <li><a href="/medication-management-orlando" className="text-primary hover:underline text-sm">Medication Management</a></li>
                      <li><a href="/anxiety-therapy" className="text-primary hover:underline text-sm">Anxiety Therapy</a></li>
                      <li><a href="/telepsychiatry-orlando" className="text-primary hover:underline text-sm">Telepsychiatry</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TrustFactors />
        <InsuranceSection />
        <TherapyFAQ />
        <ReviewsAndBadges />
      </main>
      <SiteFooter />
    </div>
  );
}
