import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, Heart, Shield, Calendar, Brain, Users, MapPin, Phone, Clock, Star, CheckCircle } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import HeroBackground from "@/components/HeroBackground";
const heroImage = "/site-assets/stock_images/calm_peaceful_therap_b118766b.webp";
import { trackEvent } from "@/lib/analytics";
import TherapyFAQ from "@/components/TherapyFAQ";

export default function CounselorNearMe() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Empathy Health Clinic - Licensed Counselors",
    "description": "Licensed professional counselors in Winter Park and Orlando, FL providing expert mental health counseling for anxiety, depression, trauma, and more.",
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
      question: "How do I find a good counselor near me?",
      answer: "Look for licensed counselors with experience treating your specific concerns. At Empathy Health Clinic, our counselors are licensed professionals (LMHCs, LCSWs) with specialized training in evidence-based therapies. We offer free phone consultations to help you find the right fit. Call 386-848-8751 to speak with our team."
    },
    {
      question: "What's the difference between a counselor and a therapist?",
      answer: "The terms are often used interchangeably. Licensed Professional Counselors (LPCs) and Licensed Mental Health Counselors (LMHCs) have master's degrees and specialized training in mental health treatment. Our counselors use evidence-based approaches like CBT, DBT, and EMDR to help clients achieve their goals."
    },
    {
      question: "How much does counseling cost near me?",
      answer: "Counseling costs vary based on your insurance coverage. We accept most major insurance plans including Cigna, Aetna, BCBS, and UMR. With insurance, you typically pay only your copay ($10-50). Call 386-848-8751 to verify your benefits before your first appointment."
    },
    {
      question: "How quickly can I see a counselor?",
      answer: "At Empathy Health Clinic, we offer same-week appointments for new patients. Many people can be seen within 3-5 business days. We understand that when you need help, waiting weeks isn't an option. Call 386-848-8751 to schedule."
    },
    {
      question: "Do you offer virtual counseling appointments?",
      answer: "Yes, we offer telehealth counseling sessions for Florida residents. Virtual counseling is just as effective as in-person sessions and offers added convenience. You can meet with your counselor from the comfort of your home via secure video."
    },
    {
      question: "What should I expect in my first counseling session?",
      answer: "Your first session is an opportunity to share your concerns and goals. Your counselor will ask questions to understand your situation, discuss your history, and begin developing a personalized treatment plan. It's a collaborative process focused on your needs."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Counselor Near Me | Orlando & Winter Park FL Counseling"
        description="Find a licensed counselor near you in Orlando & Winter Park, FL. Expert mental health counseling for anxiety, depression, trauma. Same-week appointments. Call 386-848-8751."
        keywords={["counselor near me", "counselors near me", "counseling near me", "mental health counselor near me", "licensed counselor Orlando", "counselor Winter Park FL", "therapist near me", "find a counselor", "local counselor Orlando"]}
        canonicalPath="/counselor-near-me"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Licensed Counselors Near You in Orlando
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Find compassionate, experienced counselors near you. Our licensed mental health professionals provide expert counseling for anxiety, depression, trauma, relationships, and more. Serving Orlando, Winter Park, and Central Florida.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              data-testid="button-hero-cta"
              onClick={() => trackEvent('counselor_hero_cta', 'conversion', 'Counselor Near Me Page')}
            >
              <a href="#contact-form">Find Your Counselor</a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="bg-background/20 backdrop-blur-sm border-white/30 text-white hover:bg-background/30"
              data-testid="button-hero-phone"
              onClick={() => trackEvent('phone_click', 'conversion', 'Counselor Near Me Page - Hero')}
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
                  <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
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
                  Find a Licensed Counselor Near You in Orlando
                </h2>
                <p className="text-foreground leading-relaxed mb-4">
                  When you're searching for a <strong>counselor near me</strong>, you want someone who truly understands what you're going through. At Empathy Health Clinic in Winter Park, our licensed mental health counselors provide compassionate, professional care for individuals facing life's challenges.
                </p>
                <p className="text-foreground leading-relaxed mb-4">
                  Our team of experienced counselors specializes in evidence-based treatments including Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), and EMDR for trauma. Whether you're dealing with anxiety, depression, relationship issues, or major life transitions, we're here to help you heal and grow.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  What Our Counselors Can Help With
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Anxiety & Panic Attacks",
                    "Depression & Mood Issues",
                    "Trauma & PTSD",
                    "Relationship Problems",
                    "Grief & Loss",
                    "Life Transitions",
                    "Stress Management",
                    "Self-Esteem Issues",
                    "Work-Life Balance",
                    "Family Conflict",
                    "Anger Management",
                    "Coping Skills"
                  ].map((issue, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{issue}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Why Choose Our Counselors?
                </h2>
                <div className="space-y-4">
                  <div className="bg-card border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Licensed & Experienced</h3>
                        <p className="text-sm text-muted-foreground">
                          All our counselors are licensed mental health professionals (LMHCs, LCSWs) with years of experience treating a wide range of mental health concerns.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Brain className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Evidence-Based Approaches</h3>
                        <p className="text-sm text-muted-foreground">
                          We use proven therapeutic techniques including CBT, DBT, EMDR, and solution-focused therapy to help you achieve lasting results.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Heart className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Compassionate Care</h3>
                        <p className="text-sm text-muted-foreground">
                          We create a warm, non-judgmental environment where you can feel safe exploring your thoughts and emotions. Your comfort and privacy are our priority.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Convenient Access</h3>
                        <p className="text-sm text-muted-foreground">
                          With same-week appointments, telehealth options, and a central Winter Park location serving all of Orlando, getting help has never been easier.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Areas We Serve
                </h2>
                <p className="text-foreground leading-relaxed mb-4">
                  Our counselors serve clients throughout Central Florida, including:
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
                <p className="text-muted-foreground text-sm mt-4">
                  Can't make it to our office? We offer telehealth counseling for Florida residents.
                </p>
              </section>
            </div>

            <div className="space-y-6">
              <div id="contact-form" className="bg-card border rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Schedule Your First Session
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Take the first step toward feeling better. Call us to schedule your counseling appointment.
                </p>
                <div className="space-y-3">
                  <Button 
                    className="w-full" 
                    size="lg" 
                    asChild
                    data-testid="button-sidebar-call"
                    onClick={() => trackEvent('phone_click', 'conversion', 'Counselor Near Me Page - Sidebar')}
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
                    <Link href="/therapy" className="text-sm text-primary hover:underline" data-testid="link-therapy">
                      All Therapy Services →
                    </Link>
                  </li>
                  <li>
                    <Link href="/therapist-orlando" className="text-sm text-primary hover:underline" data-testid="link-therapist-orlando">
                      Therapist Orlando →
                    </Link>
                  </li>
                  <li>
                    <Link href="/anxiety-therapy" className="text-sm text-primary hover:underline" data-testid="link-anxiety-therapy">
                      Anxiety Counseling →
                    </Link>
                  </li>
                  <li>
                    <Link href="/depression-counseling" className="text-sm text-primary hover:underline" data-testid="link-depression">
                      Depression Counseling →
                    </Link>
                  </li>
                  <li>
                    <Link href="/couples-counseling" className="text-sm text-primary hover:underline" data-testid="link-couples">
                      Couples Counseling →
                    </Link>
                  </li>
                  <li>
                    <Link href="/virtual-therapy" className="text-sm text-primary hover:underline" data-testid="link-virtual">
                      Virtual Counseling →
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

          <TherapyFAQ faqs={faqs} heading="Counseling FAQs" />
        </div>

        <TrustFactors />
        <ReviewsAndBadges />
      </main>
      <SiteFooter />
    </div>
  );
}
