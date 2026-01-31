import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, MapPin, Phone, Clock, Star, CheckCircle, Brain, Shield, Calendar, Users, Video, Award } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import HeroBackground from "@/components/HeroBackground";
import ShortContactForm from "@/components/ShortContactForm";
import LocalizedContent from "@/components/LocalizedContent";
import InternalLinkBlock from "@/components/InternalLinkBlock";
import { AuthoritativeSourcesBlock } from "@/components/AuthoritativeSource";
const heroImage = "/site-assets/stock_images/professional_healthc_955227e9.webp";
import { trackEvent } from "@/lib/analytics";

export default function PsychiatristApopka() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "Empathy Health Clinic - Psychiatrist Apopka FL",
    "description": "Board-certified psychiatrists serving Apopka, FL. Medication management, psychiatric evaluations, ADHD, anxiety, depression treatment. Same-week appointments. Most insurance accepted.",
    "url": "https://www.empathyhealthclinic.com/locations/apopka",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "areaServed": [
      { "@type": "City", "name": "Apopka" },
      { "@type": "City", "name": "Orlando" },
      { "@type": "City", "name": "Winter Park" },
      { "@type": "City", "name": "Lake Mary" },
      { "@type": "City", "name": "Maitland" }
    ],
    "medicalSpecialty": "Psychiatry",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Psychiatric Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalTherapy",
            "name": "Medication Management"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalTherapy",
            "name": "Psychiatric Evaluation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalTherapy",
            "name": "Telepsychiatry"
          }
        }
      ]
    }
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Psychiatrist Apopka Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Psychiatrist Apopka FL | Board-Certified | Empathy Health Clinic"
        description="Top-rated psychiatrists serving Apopka, FL. Same-week appointments for medication management, ADHD, anxiety, depression treatment. Convenient to I-4. Most insurance accepted. Call 386-848-8751."
        keywords={["psychiatrist apopka", "psychiatrist apopka fl", "apopka psychiatrist", "psychiatrists near apopka", "best psychiatrist apopka", "apopka fl psychiatrist", "psychiatry apopka"]}
        canonicalPath="/locations/apopka"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Psychiatrist Apopka, FL
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Expert psychiatric care serving Apopka and surrounding areas. Board-certified psychiatrists providing medication management, psychiatric evaluations, and comprehensive mental health treatment. Same-week appointments available.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              className=""
              data-testid="button-hero-cta"
              onClick={() => trackEvent('apopka_hero_cta', 'conversion', 'Psychiatrist Apopka Page')}
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

        {/* Key Benefits Bar */}
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
                <span>Board-Certified Psychiatrists</span>
              </div>
              <div className="hidden lg:block h-6 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Same-Week Appointments</span>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Contact Banner */}
        <section className="py-8 bg-primary/5 border-y">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3" data-testid="location-info">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Serving Apopka</h3>
                  <p className="text-sm text-muted-foreground">
                    2281 Lee Rd Suite 102<br />
                    Winter Park, FL 32810<br />
                    (Convenient to I-4 & 436)
                  </p>
                  <a 
                    href="https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810" 
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
                    onClick={handlePhoneClick}
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
                    Telehealth & in-person available
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

        {/* Insurance Section */}
        <InsuranceSection />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              
              <section>
                <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                  Expert Psychiatric Care Serving Apopka, FL
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Finding quality psychiatric care in Apopka just became easier. At Empathy Health Clinic, our board-certified psychiatrists provide comprehensive mental health services to residents of Apopka and surrounding Seminole County communities. Located just minutes from I-4 and SR 436, our Winter Park office offers convenient access for Apopka patients.
                  </p>
                  <p className="text-foreground leading-relaxed mb-4">
                    Our psychiatrists specialize in medication management, psychiatric evaluations, and evidence-based treatment for anxiety, depression, ADHD, bipolar disorder, and other mental health conditions. We understand that Apopka residents need accessible, high-quality psychiatric care without long waits or complicated referral processes.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    We accept most major insurance plans and offer both in-person visits (convenient to Apopka via I-4) and secure telepsychiatry appointments. Same-week appointments are typically available for new patients from Apopka and the surrounding areas.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Mental Health Conditions We Treat
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Our Apopka psychiatrists provide expert treatment for:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <ul className="space-y-2 text-foreground">
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Anxiety Disorders</strong> - GAD, panic disorder, social anxiety, phobias</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Depression</strong> - Major depression, persistent depressive disorder</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>ADHD</strong> - Adult and adolescent attention-deficit hyperactivity disorder</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Bipolar Disorder</strong> - Type I, Type II, cyclothymic disorder</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>OCD</strong> - Obsessive-compulsive disorder</span>
                      </li>
                    </ul>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>PTSD & Trauma</strong> - Post-traumatic stress disorder</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Insomnia & Sleep Disorders</strong> - Sleep-related mental health issues</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Eating Disorders</strong> - Anorexia, bulimia, binge eating disorder</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Personality Disorders</strong> - Borderline, avoidant, and others</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Schizophrenia & Psychotic Disorders</strong></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Psychiatric Services for Apopka Residents
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Brain className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Medication Management</h3>
                      <p className="text-muted-foreground">
                        Expert psychiatric medication prescribing and monitoring. Our psychiatrists carefully evaluate your symptoms to develop personalized medication plans with regular follow-ups ensuring optimal results with minimal side effects.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Shield className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Comprehensive Psychiatric Evaluations</h3>
                      <p className="text-muted-foreground">
                        Thorough diagnostic assessments by board-certified psychiatrists. We take the time to understand your symptoms, history, and concerns to provide accurate diagnoses and effective treatment recommendations.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Video className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Telepsychiatry Services</h3>
                      <p className="text-muted-foreground">
                        Convenient online psychiatry appointments from your Apopka home. Our HIPAA-compliant telehealth platform provides the same quality care as in-person visits with added convenience.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Why Apopka Residents Choose Empathy Health Clinic
                </h2>
                <div className="prose prose-lg max-w-none">
                  <ul className="space-y-3 text-foreground">
                    <li className="flex gap-3">
                      <Award className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Board-Certified Expertise</strong> - All psychiatrists are board-certified by the American Board of Psychiatry and Neurology, ensuring you receive the highest standard of psychiatric care.</span>
                    </li>
                    <li className="flex gap-3">
                      <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Convenient Location</strong> - Just minutes from Apopka via I-4, with easy access from SR 436, making your appointments stress-free.</span>
                    </li>
                    <li className="flex gap-3">
                      <Calendar className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Fast Appointment Access</strong> - Same-week appointments typically available. We understand that when you need psychiatric help, waiting weeks isn't an option.</span>
                    </li>
                    <li className="flex gap-3">
                      <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Personalized Treatment Plans</strong> - Your treatment plan is tailored to your unique symptoms, goals, lifestyle, and preferences - no one-size-fits-all approach.</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Most Insurance Accepted</strong> - We accept Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, Humana, and many other major insurance plans.</span>
                    </li>
                    <li className="flex gap-3">
                      <Video className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>In-Person & Telehealth Options</strong> - Choose the appointment type that works best for your schedule. Both options provide the same high-quality care.</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">How far is your office from Apopka?</h3>
                    <p className="text-muted-foreground">
                      Our Winter Park office is approximately 10-15 minutes from Apopka via I-4 or SR 436. We're conveniently located just off I-4, making it easy for Apopka residents to reach us for appointments.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">How quickly can I get an appointment?</h3>
                    <p className="text-muted-foreground">
                      We typically offer same-week appointments for new patients from Apopka. Call us at 386-848-8751 and our scheduling team will find the earliest available appointment with one of our psychiatrists.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Do I need a referral to see a psychiatrist?</h3>
                    <p className="text-muted-foreground">
                      No referral is required. You can schedule directly with our office. However, some insurance plans may require a referral for coverage, so check with your insurance provider.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">What insurance do you accept?</h3>
                    <p className="text-muted-foreground">
                      We accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, Humana, and more. Contact our office to verify coverage for your specific plan.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Do you offer telehealth appointments?</h3>
                    <p className="text-muted-foreground">
                      Yes! We offer secure, HIPAA-compliant telepsychiatry appointments perfect for Apopka residents. Meet with your psychiatrist from home via video call while receiving the same quality care as in-person visits.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Can you prescribe ADHD medications?</h3>
                    <p className="text-muted-foreground">
                      Yes, our board-certified psychiatrists can prescribe controlled substances when medically appropriate, including stimulant medications for ADHD and anti-anxiety medications. All prescribing follows strict medical guidelines and Florida regulations.
                    </p>
                  </div>
                </div>
              </section>

              {/* Localized Neighborhood Content */}
              <LocalizedContent 
                city="Apopka" 
                neighborhoods={["Downtown Apopka", "Rock Springs Ridge", "Wekiva Springs", "Ocoee", "Lockhart"]}
                nearbyLandmarks={["Wekiwa Springs State Park", "Kelly Park", "Northwest Recreation Complex", "Apopka Amphitheater"]}
                highways={["US 441", "SR 436", "SR 429", "Apopka-Vineland Road"]}
                description="Growing northwest Orange County community surrounded by natural springs and outdoor recreation"
                driveTimeMinutes={18}
                slug="/locations/apopka"
              />

              {/* Internal Links Section */}
              <InternalLinkBlock 
                category="services"
                excludePaths={["/locations/apopka"]}
                title="Explore Our Services in Apopka Area"
              />

              {/* Authoritative Sources */}
              <AuthoritativeSourcesBlock 
                sources={[
                  { source: "NIMH", topic: "Mental Health Information" },
                  { source: "APA", topic: "Finding a Psychiatrist" },
                  { source: "NIH", topic: "Mental Health Resources" }
                ]}
              />

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Schedule an Appointment</h3>
                  <div className="space-y-4">
                    <Button 
                      className="w-full" 
                      size="lg"
                      asChild
                      data-testid="button-sidebar-call"
                      onClick={handlePhoneClick}
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
                      <Link href="/request-appointment">Request Appointment</Link>
                    </Button>
                  </div>
                  <div className="mt-6 pt-6 border-t space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-muted-foreground">
                        2281 Lee Rd Suite 102<br />
                        Winter Park, FL 32810
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-muted-foreground">
                        Mon-Fri: 9:00 AM - 6:00 PM
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-muted-foreground">
                        Accepting Apopka patients
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-3">Related Services</h3>
                  <div className="space-y-2">
                    <Link href="/psychiatrist-orlando" className="block text-sm text-primary hover:underline font-medium">
                      Psychiatrist Orlando
                    </Link>
                    <Link href="/psychiatrist-near-me" className="block text-sm text-primary hover:underline">
                      Psychiatrist Near Me
                    </Link>
                    <Link href="/adhd-testing-orlando" className="block text-sm text-primary hover:underline">
                      ADHD Testing
                    </Link>
                    <Link href="/anxiety-therapy" className="block text-sm text-primary hover:underline">
                      Anxiety Treatment
                    </Link>
                    <Link href="/services" className="block text-sm text-primary hover:underline">
                      Medication Management
                    </Link>
                    <Link href="/virtual-therapy" className="block text-sm text-primary hover:underline">
                      Virtual Therapy
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <section className="py-16 bg-muted" id="contact-form">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-sans font-bold text-foreground mb-4">
                Schedule Your Psychiatry Appointment
              </h2>
              <p className="text-lg text-muted-foreground">
                Serving Apopka residents. Same-week appointments available. Most insurance accepted.
              </p>
            </div>
            <ShortContactForm />
          </div>
        </section>

        {/* Trust Factors */}
        <TrustFactors />
        
        {/* Reviews and Badges */}
        <ReviewsAndBadges />
      </main>
      <SiteFooter />
    </div>
  );
}
