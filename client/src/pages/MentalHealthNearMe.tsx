import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, Heart, Shield, Calendar, Brain, Stethoscope, MapPin, Phone, Clock, Star, CheckCircle } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import HeroBackground from "@/components/HeroBackground";
import heroImage from "@assets/stock_images/calm_peaceful_therap_b118766b.jpg";
import { trackEvent } from "@/lib/analytics";
import TherapyFAQ from "@/components/TherapyFAQ";

export default function MentalHealthNearMe() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Empathy Health Clinic - Mental Health Services",
    "description": "Comprehensive mental health services in Winter Park and Orlando, FL. Psychiatry, therapy, and counseling for anxiety, depression, ADHD, and more.",
    "medicalSpecialty": ["Psychiatry", "Psychology", "Mental Health"],
    "provider": {
      "@type": "MedicalClinic",
      "name": "Empathy Health Clinic",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1155 Louisiana Ave Suite 202",
        "addressLocality": "Winter Park",
        "addressRegion": "FL",
        "postalCode": "32789"
      },
      "telephone": "386-848-8751"
    },
    "areaServed": ["Orlando", "Winter Park", "Altamonte Springs", "Maitland", "Central Florida"]
  };

  const faqs = [
    {
      question: "What mental health services are available near me?",
      answer: "At Empathy Health Clinic in Winter Park, we offer comprehensive mental health services including psychiatry, therapy, and counseling. Our services include psychiatric evaluations, medication management, individual therapy, couples counseling, and specialized treatment for anxiety, depression, ADHD, bipolar disorder, PTSD, and more."
    },
    {
      question: "How do I find mental health help near me?",
      answer: "Finding the right mental health care starts with understanding your needs. If you need medication management, a psychiatrist can help. If you prefer talk therapy, a licensed therapist or counselor is the right choice. At Empathy Health Clinic, we offer both services and can help you determine the best treatment approach. Call 386-848-8751 for a consultation."
    },
    {
      question: "Does insurance cover mental health services?",
      answer: "Yes, most insurance plans cover mental health services. We accept major insurance plans including Cigna, Aetna, Blue Cross Blue Shield, and UMR. Coverage typically includes psychiatric appointments and therapy sessions. Call 386-848-8751 to verify your specific benefits."
    },
    {
      question: "How quickly can I be seen for mental health care?",
      answer: "We offer same-week appointments for new patients. Many people can be seen within 3-5 business days. If you're experiencing a mental health crisis, please call us immediately at 386-848-8751 or go to your nearest emergency room."
    },
    {
      question: "What's the difference between a psychiatrist and therapist?",
      answer: "Psychiatrists are medical doctors who specialize in mental health. They can diagnose conditions, prescribe medications, and provide medication management. Therapists (counselors, psychologists) provide talk therapy and help you develop coping strategies. Many people benefit from seeing both—a psychiatrist for medication and a therapist for ongoing support."
    },
    {
      question: "Do you offer virtual mental health appointments?",
      answer: "Yes, we offer telehealth appointments for both psychiatry and therapy. Virtual sessions are convenient, private, and just as effective as in-person care. You can meet with your provider from the comfort of your home via secure video."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Mental Health Near Me | Orlando & Winter Park FL"
        description="Mental health services near you in Orlando & Winter Park, FL. Psychiatry, therapy, counseling for anxiety, depression, ADHD. Same-week appointments. Call 386-848-8751."
        keywords={["mental health near me", "mental health services near me", "mental health clinic near me", "mental health Orlando", "mental health Winter Park", "psychiatrist near me", "therapist near me", "mental health help near me", "mental health care Orlando"]}
        canonicalPath="/mental-health-near-me"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Mental Health Services Near You in Orlando
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Comprehensive mental health care close to home. Our board-certified psychiatrists and licensed therapists provide expert treatment for anxiety, depression, ADHD, bipolar disorder, and more. Serving Orlando, Winter Park, and Central Florida.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              data-testid="button-hero-cta"
              onClick={() => trackEvent('mental_health_hero_cta', 'conversion', 'Mental Health Near Me Page')}
            >
              <a href="#contact-form">Get Started Today</a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="bg-background/20 backdrop-blur-sm border-white/30 text-white hover:bg-background/30"
              data-testid="button-hero-phone"
              onClick={() => trackEvent('phone_click', 'conversion', 'Mental Health Near Me Page - Hero')}
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
                <span>Same-Week Appointments Available</span>
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
                  <h3 className="font-semibold text-foreground mb-1">Our Winter Park Location</h3>
                  <p className="text-sm text-muted-foreground">
                    1155 Louisiana Ave Suite 202<br />
                    Winter Park, FL 32789
                  </p>
                  <a 
                    href="https://maps.google.com/?q=1155+Louisiana+Ave+Suite+202+Winter+Park+FL+32789" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline mt-1 inline-block"
                    data-testid="link-directions"
                  >
                    Get Directions →
                  </a>
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
                  >
                    386-848-8751
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Same-week appointments available
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3" data-testid="hours-info">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Office Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Mon-Fri: 9:00 AM - 6:00 PM<br />
                    Telehealth available
                  </p>
                  <p className="text-sm text-primary mt-1 font-medium">
                    <CheckCircle2 className="h-4 w-4 inline mr-1" />
                    Accepting new patients
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InsuranceSection />

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Comprehensive Mental Health Care Near You
                </h2>
                <p className="text-foreground leading-relaxed mb-4">
                  When you're searching for <strong>mental health near me</strong>, you deserve a clinic that offers complete care under one roof. At Empathy Health Clinic in Winter Park, we provide both psychiatry and therapy services, making it easy to get the comprehensive treatment you need.
                </p>
                <p className="text-foreground leading-relaxed mb-4">
                  Our team includes board-certified psychiatrists who specialize in medication management and licensed therapists trained in evidence-based treatments. Whether you need help managing symptoms with medication, talk therapy to develop coping skills, or both, we're here for you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Mental Health Conditions We Treat
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Anxiety Disorders",
                    "Depression",
                    "ADHD",
                    "Bipolar Disorder",
                    "PTSD & Trauma",
                    "OCD",
                    "Panic Disorder",
                    "Social Anxiety",
                    "Insomnia",
                    "Mood Disorders",
                    "Stress & Burnout",
                    "Grief & Loss"
                  ].map((condition, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{condition}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Our Mental Health Services
                </h2>
                <div className="space-y-4">
                  <div className="bg-card border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Stethoscope className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Psychiatry Services</h3>
                        <p className="text-sm text-muted-foreground">
                          Board-certified psychiatrists providing psychiatric evaluations, diagnosis, and medication management. Expert treatment for anxiety, depression, ADHD, bipolar disorder, and more.
                        </p>
                        <Link href="/psychiatrist-orlando" className="text-sm text-primary hover:underline mt-2 inline-block">
                          Learn about psychiatry →
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Brain className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Therapy & Counseling</h3>
                        <p className="text-sm text-muted-foreground">
                          Licensed therapists offering individual therapy, couples counseling, and specialized treatment using CBT, DBT, EMDR, and other evidence-based approaches.
                        </p>
                        <Link href="/therapy" className="text-sm text-primary hover:underline mt-2 inline-block">
                          Learn about therapy →
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Heart className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Specialized Treatment</h3>
                        <p className="text-sm text-muted-foreground">
                          EMDR for trauma, TMS for treatment-resistant depression, ADHD testing and treatment, and specialized care for complex mental health conditions.
                        </p>
                        <Link href="/emdr-therapy" className="text-sm text-primary hover:underline mt-2 inline-block">
                          Learn about specialized treatment →
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Telehealth Services</h3>
                        <p className="text-sm text-muted-foreground">
                          Virtual psychiatry and therapy appointments for Florida residents. Get expert mental health care from the comfort of your home via secure video.
                        </p>
                        <Link href="/virtual-therapy" className="text-sm text-primary hover:underline mt-2 inline-block">
                          Learn about telehealth →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Why Choose Empathy Health Clinic?
                </h2>
                <ul className="space-y-3">
                  {[
                    "Board-certified psychiatrists and licensed therapists",
                    "Comprehensive care: psychiatry and therapy under one roof",
                    "Same-week appointments for new patients",
                    "Most major insurance plans accepted",
                    "Telehealth options for convenient access",
                    "Evidence-based treatments with proven results",
                    "Compassionate, patient-centered approach"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Areas We Serve
                </h2>
                <p className="text-foreground leading-relaxed mb-4">
                  Our mental health clinic serves clients throughout Central Florida:
                </p>
                <div className="grid sm:grid-cols-3 gap-2">
                  {[
                    "Orlando",
                    "Winter Park",
                    "Altamonte Springs",
                    "Maitland",
                    "Casselberry",
                    "Longwood",
                    "Lake Mary",
                    "Sanford",
                    "Oviedo"
                  ].map((city, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-foreground text-sm">{city}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <div id="contact-form" className="bg-card border rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Schedule Your Appointment
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Take the first step toward better mental health. Call us to schedule your appointment.
                </p>
                <div className="space-y-3">
                  <Button 
                    className="w-full" 
                    size="lg" 
                    asChild
                    data-testid="button-sidebar-call"
                    onClick={() => trackEvent('phone_click', 'conversion', 'Mental Health Near Me Page - Sidebar')}
                  >
                    <a href="tel:386-848-8751">
                      <Phone className="h-4 w-4 mr-2" />
                      Call 386-848-8751
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="lg" 
                    asChild
                    data-testid="button-sidebar-appointment"
                  >
                    <Link href="/request-appointment">
                      <Calendar className="h-4 w-4 mr-2" />
                      Request Appointment
                    </Link>
                  </Button>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-muted-foreground text-center">
                    Most insurance accepted including Cigna, Aetna, BCBS, UMR
                  </p>
                </div>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/psychiatrist-orlando" className="text-sm text-primary hover:underline" data-testid="link-psychiatrist">
                      Psychiatrist Orlando →
                    </Link>
                  </li>
                  <li>
                    <Link href="/therapy" className="text-sm text-primary hover:underline" data-testid="link-therapy">
                      Therapy Services →
                    </Link>
                  </li>
                  <li>
                    <Link href="/counselor-near-me" className="text-sm text-primary hover:underline" data-testid="link-counselor">
                      Counselor Near Me →
                    </Link>
                  </li>
                  <li>
                    <Link href="/anxiety-therapy" className="text-sm text-primary hover:underline" data-testid="link-anxiety">
                      Anxiety Treatment →
                    </Link>
                  </li>
                  <li>
                    <Link href="/depression-counseling" className="text-sm text-primary hover:underline" data-testid="link-depression">
                      Depression Treatment →
                    </Link>
                  </li>
                  <li>
                    <Link href="/adhd-psychiatrist-orlando" className="text-sm text-primary hover:underline" data-testid="link-adhd">
                      ADHD Treatment →
                    </Link>
                  </li>
                  <li>
                    <Link href="/insurance" className="text-sm text-primary hover:underline" data-testid="link-insurance">
                      Insurance Information →
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <TherapyFAQ faqs={faqs} heading="Mental Health FAQs" />
        </div>

        <TrustFactors />
        <ReviewsAndBadges />
      </main>
      <SiteFooter />
    </div>
  );
}
