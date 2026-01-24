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
const heroImage = "/site-assets/stock_images/professional_healthc_955227e9.jpg";
import { trackEvent } from "@/lib/analytics";

export default function PsychiatristWinterGarden() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "Empathy Health Clinic - Psychiatrist Winter Garden FL",
    "description": "Board-certified psychiatrists serving Winter Garden, FL. Medication management, psychiatric evaluations, ADHD, anxiety, depression treatment. Same-week appointments. Most insurance accepted.",
    "url": "https://empathyhealthclinic.com/psychiatrist-winter-garden",
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
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.59544,
      "longitude": -81.36537
    },
    "areaServed": [
      { "@type": "City", "name": "Winter Garden" },
      { "@type": "City", "name": "Windermere" },
      { "@type": "City", "name": "Ocoee" }
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
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "paymentAccepted": ["BCBS", "Cigna", "UMR", "Medicare", "Aetna", "United Healthcare"]
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Psychiatrist Winter Garden Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Psychiatrist Winter Garden FL | Board-Certified | Same-Week"
        description="Top-rated psychiatrist serving Winter Garden, FL and Windermere area. Board-certified psychiatrists for medication management, ADHD, anxiety, depression. Same-week appointments. BCBS, Cigna, Aetna, Medicare accepted. Call (386) 848-8751."
        keywords={["psychiatrist winter garden", "winter garden psychiatrist", "winter garden fl psychiatrist", "psychiatrists near winter garden", "best psychiatrist winter garden", "windermere psychiatrist", "psychiatry winter garden", "medication management winter garden"]}
        canonicalPath="/psychiatrist-winter-garden"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Psychiatrist Winter Garden, FL
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Board-certified psychiatrists serving Winter Garden, Windermere, and West Orange County. Expert medication management, psychiatric evaluations, and comprehensive mental health treatment. Same-week appointments available.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              className=""
              data-testid="button-hero-cta"
              onClick={() => trackEvent('winter_garden_hero_cta', 'conversion', 'Psychiatrist Winter Garden Page')}
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

        <section className="py-8 bg-primary/5 border-y">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3" data-testid="location-info">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Serving Winter Garden</h3>
                  <p className="text-sm text-muted-foreground">
                    2281 Lee Rd Suite 102<br />
                    Winter Park, FL 32810<br />
                    (Easy access via 429 & I-4)
                  </p>
                  <a 
                    href="https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline mt-1 inline-block"
                    data-testid="link-directions"
                  >
                    Get Directions
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

        <InsuranceSection />

        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              
              <section>
                <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                  Expert Psychiatrist Serving Winter Garden, FL
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Looking for a trusted <Link href="/psychiatrist-orlando" className="text-primary hover:underline">psychiatrist</Link> near Winter Garden? Empathy Health Clinic provides expert psychiatric care to Winter Garden residents, including those in Windermere, Ocoee, and the greater West Orange County area.
                  </p>
                  <p className="text-foreground leading-relaxed mb-4">
                    Our board-certified psychiatrists specialize in <Link href="/services" className="text-primary hover:underline">medication management</Link>, psychiatric evaluations, and evidence-based treatment for <Link href="/anxiety-therapy" className="text-primary hover:underline">anxiety</Link>, depression, <Link href="/adhd-testing-orlando" className="text-primary hover:underline">ADHD</Link>, bipolar disorder, and other mental health conditions. Winter Garden's growing community deserves access to quality psychiatric care.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    We accept most major insurance plans and offer both in-person visits and secure <Link href="/virtual-therapy" className="text-primary hover:underline">telehealth</Link> appointments - perfect for busy families. Same-week appointments are typically available for new patients.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Mental Health Conditions We Treat
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Our psychiatrists serving Winter Garden provide expert treatment for:
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
                  Psychiatric Services for Winter Garden
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
                        Convenient online psychiatry appointments from your Winter Garden home. Our HIPAA-compliant telehealth platform provides the same quality care as in-person visits with added convenience.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Why Winter Garden Residents Choose Empathy Health Clinic
                </h2>
                <div className="prose prose-lg max-w-none">
                  <ul className="space-y-3 text-foreground">
                    <li className="flex gap-3">
                      <Award className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Board-Certified Expertise</strong> - All psychiatrists are board-certified by the American Board of Psychiatry and Neurology, ensuring you receive the highest standard of psychiatric care.</span>
                    </li>
                    <li className="flex gap-3">
                      <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Convenient Access from Winter Garden</strong> - Easy drive via 429 and I-4. Our Winter Park location is accessible from Winter Garden, Windermere, and Ocoee.</span>
                    </li>
                    <li className="flex gap-3">
                      <Calendar className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Fast Appointment Access</strong> - Same-week appointments typically available. We understand that when you need psychiatric help, waiting weeks is not an option.</span>
                    </li>
                    <li className="flex gap-3">
                      <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Personalized Treatment Plans</strong> - Your treatment plan is tailored to your unique symptoms, goals, lifestyle, and preferences - no one-size-fits-all approach.</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Most Insurance Accepted</strong> - We accept <Link href="/psychiatrist-orlando-accepts-aetna" className="text-primary hover:underline">Aetna</Link>, <Link href="/psychiatrist-orlando-accepts-bcbs" className="text-primary hover:underline">Blue Cross Blue Shield</Link>, <Link href="/psychiatrist-orlando-accepts-cigna" className="text-primary hover:underline">Cigna</Link>, <Link href="/psychiatrist-orlando-accepts-united-healthcare" className="text-primary hover:underline">UnitedHealthcare</Link>, and many other major insurance plans.</span>
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
                    <h3 className="font-semibold text-foreground mb-2">Do you have an office in Winter Garden?</h3>
                    <p className="text-muted-foreground">
                      Our main office is located at 2281 Lee Road Suite 102, Winter Park, FL 32810. We serve Winter Garden residents through both in-person appointments (easy access via 429) and convenient telepsychiatry services.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">How quickly can I get an appointment?</h3>
                    <p className="text-muted-foreground">
                      We typically offer same-week appointments for new patients. Call us at 386-848-8751 and our scheduling team will find the earliest available appointment with one of our psychiatrists.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Do you offer telehealth for Winter Garden patients?</h3>
                    <p className="text-muted-foreground">
                      Yes! Many Winter Garden and Windermere patients prefer our telepsychiatry services. Meet with your psychiatrist from home via secure video call while receiving the same quality care as in-person visits.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">What insurance do you accept?</h3>
                    <p className="text-muted-foreground">
                      We accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, UMR, Medicare, and more. Contact our office to verify coverage for your specific plan.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Do I need a referral to see a psychiatrist?</h3>
                    <p className="text-muted-foreground">
                      No referral is required. You can schedule directly with our office. However, some insurance plans may require a referral for coverage, so check with your insurance provider.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Do you serve patients from Windermere and Ocoee?</h3>
                    <p className="text-muted-foreground">
                      Absolutely! We proudly serve patients throughout West Orange County including Winter Garden, Windermere, Ocoee, and surrounding communities with flexible scheduling and telehealth options.
                    </p>
                  </div>
                </div>
              </section>

              <LocalizedContent 
                city="Winter Garden" 
                neighborhoods={["Downtown Winter Garden", "Windermere", "Ocoee", "Horizon West", "Oakland"]}
                nearbyLandmarks={["West Orange Trail", "Downtown Winter Garden", "Hamlin Town Center", "Windermere Country Club"]}
                highways={["429", "Florida's Turnpike", "SR 50", "SR 535"]}
                description="Charming community known for historic downtown and West Orange Trail, served by our expert psychiatric team"
                driveTimeMinutes={25}
                slug="/psychiatrist-winter-garden"
              />

              <InternalLinkBlock 
                category="locations"
                excludePaths={["/psychiatrist-winter-garden"]}
                title="Explore Our Psychiatric Services Near Winter Garden"
              />

              <AuthoritativeSourcesBlock 
                sources={[
                  { source: "NIMH", topic: "Mental Health Information" },
                  { source: "APA", topic: "Finding a Psychiatrist" },
                  { source: "NIH", topic: "Mental Health Resources" }
                ]}
              />

            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                <div className="bg-card border rounded-lg p-6" id="contact-form">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Schedule an Appointment</h3>
                  <ShortContactForm 
                    service="Psychiatrist Winter Garden"
                    className="mb-4"
                  />
                  <div className="space-y-4 pt-4 border-t">
                    <Button 
                      className="w-full" 
                      size="lg"
                      variant="outline"
                      asChild
                      data-testid="button-sidebar-call"
                      onClick={handlePhoneClick}
                    >
                      <a href="tel:386-848-8751">
                        <Phone className="h-4 w-4 mr-2" />
                        Call 386-848-8751
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Related Services</h3>
                  <div className="space-y-2">
                    <Link href="/psychiatrist-orlando" className="block text-sm text-primary hover:underline font-medium">Psychiatrist Orlando</Link>
                    <Link href="/psychiatrist-near-me" className="block text-sm text-primary hover:underline">Psychiatrist Near Me</Link>
                    <Link href="/services" className="block text-sm text-primary hover:underline">Medication Management</Link>
                    <Link href="/anxiety-therapy" className="block text-sm text-primary hover:underline">Anxiety Therapy</Link>
                    <Link href="/adhd-testing-orlando" className="block text-sm text-primary hover:underline">ADHD Testing</Link>
                    <Link href="/virtual-therapy" className="block text-sm text-primary hover:underline">Virtual Therapy</Link>
                    <Link href="/psychiatric-evaluation" className="block text-sm text-primary hover:underline">Psychiatric Evaluation</Link>
                  </div>
                </div>

                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Nearby Locations</h3>
                  <div className="space-y-2">
                    <Link href="/psychiatrist-orlando" className="block text-sm text-primary hover:underline font-medium">Psychiatrist Orlando</Link>
                    <Link href="/psychiatrist-winter-park" className="block text-sm text-primary hover:underline">Winter Park</Link>
                    <Link href="/locations/apopka" className="block text-sm text-primary hover:underline">Apopka</Link>
                    <Link href="/psychiatrist-downtown-orlando" className="block text-sm text-primary hover:underline">Downtown Orlando</Link>
                  </div>
                </div>

                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Insurance Accepted</h3>
                  <div className="space-y-2">
                    <Link href="/psychiatrist-orlando-accepts-bcbs" className="block text-sm text-primary hover:underline">Blue Cross Blue Shield</Link>
                    <Link href="/psychiatrist-orlando-accepts-cigna" className="block text-sm text-primary hover:underline">Cigna</Link>
                    <Link href="/psychiatrist-orlando-accepts-aetna" className="block text-sm text-primary hover:underline">Aetna</Link>
                    <Link href="/psychiatrist-orlando-accepts-united-healthcare" className="block text-sm text-primary hover:underline">United Healthcare</Link>
                    <Link href="/therapist-accepts-umr" className="block text-sm text-primary hover:underline">UMR</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ReviewsAndBadges />
        <TrustFactors />

        <section className="py-16 px-4 bg-gradient-to-br from-primary to-primary/80">
          <div className="container mx-auto max-w-4xl text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to See a Psychiatrist Near Winter Garden?
            </h2>
            <p className="text-xl mb-8 text-white/95">
              Board-certified psychiatrists accepting new patients. Same-week appointments available with telehealth options for Winter Garden residents.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/95 font-bold text-lg px-10 py-6 h-auto shadow-xl"
                asChild
                data-testid="button-final-cta"
              >
                <Link href="/request-appointment">Book Your Appointment</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-10 py-6 h-auto"
                asChild
                onClick={handlePhoneClick}
                data-testid="button-final-phone"
              >
                <a href="tel:+13868488751">
                  <Phone className="h-5 w-5 mr-2" />
                  386-848-8751
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
