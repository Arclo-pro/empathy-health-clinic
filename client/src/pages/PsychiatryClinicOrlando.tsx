import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, MapPin, Phone, Clock, Star, CheckCircle, Brain, Shield, Calendar, Users, Video, Award, Building2 } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import HeroBackground from "@/components/HeroBackground";
import ShortContactForm from "@/components/ShortContactForm";
import heroImage from "@assets/stock_images/professional_healthc_955227e9.jpg";
import { trackEvent } from "@/lib/analytics";

export default function PsychiatryClinicOrlando() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://empathyhealthclinic.com/#website",
        "url": "https://empathyhealthclinic.com/",
        "name": "Empathy Health Clinic",
        "inLanguage": "en"
      },
      {
        "@type": ["MedicalClinic", "Psychiatrist", "LocalBusiness"],
        "@id": "https://empathyhealthclinic.com/#organization",
        "name": "Empathy Health Clinic - Psychiatry Clinic Orlando",
        "url": "https://empathyhealthclinic.com/",
        "telephone": "+1-386-848-8751",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "2281 Lee Road Suite 102",
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
        "medicalSpecialty": [
          "Psychiatry",
          "MentalHealth",
          "Psychotherapy"
        ],
        "areaServed": [
          {
            "@type": "City",
            "name": "Orlando",
            "containedInPlace": {
              "@type": "State",
              "name": "Florida"
            }
          },
          {
            "@type": "City",
            "name": "Winter Park",
            "containedInPlace": {
              "@type": "State",
              "name": "Florida"
            }
          },
          {
            "@type": "City",
            "name": "Altamonte Springs"
          },
          {
            "@type": "City",
            "name": "Lake Mary"
          },
          {
            "@type": "City",
            "name": "Maitland"
          }
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            "opens": "09:00",
            "closes": "19:00"
          }
        ],
        "priceRange": "$$",
        "image": "https://empathyhealthclinic.com" + heroImage
      },
      {
        "@type": "WebPage",
        "@id": "https://empathyhealthclinic.com/psychiatry-clinic-orlando/#webpage",
        "url": "https://empathyhealthclinic.com/psychiatry-clinic-orlando",
        "name": "Psychiatry Clinic in Orlando | Empathy Health Clinic",
        "isPartOf": {
          "@id": "https://empathyhealthclinic.com/#website"
        },
        "inLanguage": "en",
        "about": {
          "@id": "https://empathyhealthclinic.com/#organization"
        },
        "description": "Leading psychiatry clinic in Orlando, FL. Board-certified psychiatrists, comprehensive mental health services, medication management. Same-week appointments. Most insurance accepted.",
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://empathyhealthclinic.com" + heroImage
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://empathyhealthclinic.com/psychiatry-clinic-orlando/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What services does your psychiatry clinic in Orlando offer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our Orlando psychiatry clinic offers comprehensive mental health services including psychiatric evaluations, medication management, ADHD treatment, anxiety disorder treatment, depression treatment, bipolar disorder management, telepsychiatry services, and integrated care coordination with therapists and other providers."
            }
          },
          {
            "@type": "Question",
            "name": "Do you accept insurance at your Orlando psychiatry clinic?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Empathy Health Clinic accepts most major insurance plans including Medicare, Cigna, Blue Cross Blue Shield, UMR, Aetna, United Healthcare, and many others. Contact our clinic to verify your specific insurance coverage."
            }
          },
          {
            "@type": "Question",
            "name": "How quickly can I get an appointment at your psychiatry clinic?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most patients can schedule appointments within the same week. We prioritize timely access to psychiatric care for patients experiencing mental health challenges in the Orlando area."
            }
          }
        ]
      }
    ]
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Psychiatry Clinic Orlando Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Psychiatric Clinic Orlando FL | 2025"
        description="Looking for a psychiatric clinic in Orlando? Top-rated psychiatry clinic with board-certified psychiatrists. Anxiety, depression, ADHD, bipolar treatment. Same-week appointments. 4.8★ rating. BCBS, Cigna, Medicare. Call (386) 848-8751."
        keywords={["psychiatric clinic orlando", "psychiatry clinic orlando", "orlando psychiatry clinic", "mental health clinic orlando", "psychiatry clinic orlando fl", "orlando mental health clinic", "best psychiatric clinic orlando", "psychiatry practice orlando", "psychiatry services orlando"]}
        canonicalPath="/psychiatry-clinic-orlando"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Psychiatry Clinic in Orlando
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Leading psychiatry clinic serving Orlando and Central Florida. Our team of board-certified psychiatrists provides comprehensive mental health services including medication management, psychiatric evaluations, and specialized treatment for anxiety, depression, ADHD, bipolar disorder, and more.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              className=""
              data-testid="button-hero-cta"
              onClick={() => trackEvent('psychiatry_clinic_orlando_hero_cta', 'conversion', 'Psychiatry Clinic Orlando Page')}
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
                <span>Established Psychiatry Clinic</span>
              </div>
              <div className="hidden lg:block h-6 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Comprehensive Services</span>
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
                  <h3 className="font-semibold text-foreground mb-1">Orlando Clinic Location</h3>
                  <p className="text-sm text-muted-foreground">
                    2281 Lee Rd Suite 102<br />
                    Orlando, FL 32810<br />
                    (Greater Orlando metro area)
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
                  <h3 className="font-semibold text-foreground mb-1">Call Our Clinic</h3>
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
                  <h3 className="font-semibold text-foreground mb-1">Clinic Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Mon-Sun: 9:00 AM - 7:00 PM<br />
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
                  About Our Orlando Psychiatry Clinic
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    When you're searching for a trusted psychiatry clinic in Orlando, you need more than just a provider - you need a comprehensive mental health partner. Empathy Health Clinic is a leading mental health clinic in Orlando providing expert psychiatric care to patients throughout Central Florida. Our psychiatry clinic serves Orlando, Winter Park, Lake Nona, Baldwin Park, Downtown Orlando, and surrounding communities with a full range of psychiatric services designed to help you achieve lasting mental wellness.
                  </p>
                  <p className="text-foreground leading-relaxed mb-4">
                    Our Orlando psychiatry clinic is staffed by board-certified psychiatrists with extensive experience treating <Link href="/anxiety-therapy" className="text-primary hover:underline font-medium">anxiety disorders</Link>, <Link href="/depression-counseling" className="text-primary hover:underline font-medium">depression</Link>, <Link href="/adhd-testing-orlando" className="text-primary hover:underline font-medium">ADHD</Link>, <Link href="/psychiatrist-orlando" className="text-primary hover:underline font-medium">bipolar disorder</Link>, <Link href="/ptsd-treatment" className="text-primary hover:underline font-medium">PTSD</Link>, <Link href="/ocd-treatment" className="text-primary hover:underline font-medium">OCD</Link>, and other mental health conditions. We provide personalized, evidence-based psychiatric care that addresses your unique needs and goals.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    What sets our psychiatry clinic apart is our commitment to accessible, patient-centered care. We offer same-week appointments, accept most major insurance plans including Medicare, and provide both in-person visits at our Orlando-area office and convenient <Link href="/virtual-therapy" className="text-primary hover:underline font-medium">telepsychiatry services</Link>. Your mental health matters, and we're here to make getting help as easy as possible.
                  </p>
                </div>
              </section>

              <section className="bg-primary/5 border rounded-lg p-6">
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4 flex items-center gap-3">
                  <Building2 className="h-7 w-7 text-primary" />
                  Why Choose Our Orlando Psychiatry Clinic
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-1">Board-Certified Psychiatrists</h3>
                      <p className="text-sm text-muted-foreground">Experienced psychiatric physicians with advanced training</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-1">Comprehensive Services</h3>
                      <p className="text-sm text-muted-foreground">Full-spectrum psychiatric care under one roof</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-1">Same-Week Appointments</h3>
                      <p className="text-sm text-muted-foreground">Quick access to psychiatric care when you need it</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-1">Insurance Accepted</h3>
                      <p className="text-sm text-muted-foreground">Most major insurance plans including Medicare</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-1">Telehealth Available</h3>
                      <p className="text-sm text-muted-foreground">Virtual appointments from your Orlando home</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-1">Patient-Centered Care</h3>
                      <p className="text-sm text-muted-foreground">Personalized treatment plans tailored to you</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Comprehensive Psychiatric Services at Our Orlando Clinic
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Brain className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">
                        <Link href="/services" className="text-foreground hover:text-primary transition-colors">
                          Psychiatric Medication Management
                        </Link>
                      </h3>
                      <p className="text-muted-foreground">
                        Expert psychiatric medication prescribing and ongoing monitoring. Our Orlando clinic psychiatrists carefully evaluate your symptoms, medical history, and treatment goals to develop personalized medication plans. Regular follow-ups ensure optimal results with minimal side effects.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Shield className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Comprehensive Psychiatric Evaluations</h3>
                      <p className="text-muted-foreground">
                        Our Orlando clinic provides thorough psychiatric evaluations conducted by board-certified psychiatrists. Each psychiatric evaluation in Orlando includes a comprehensive assessment of your symptoms, medical history, and concerns to provide accurate diagnoses and effective treatment recommendations tailored to your unique needs.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Video className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">
                        <Link href="/virtual-therapy" className="text-foreground hover:text-primary transition-colors">
                          Telepsychiatry Services
                        </Link>
                      </h3>
                      <p className="text-muted-foreground">
                        Convenient online psychiatry appointments from anywhere in Orlando. Our telehealth psychiatrist services in Orlando use a HIPAA-compliant platform to provide the same quality psychiatric care as in-person clinic visits, with added convenience and flexibility for busy schedules.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Users className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Integrated Mental Health Care</h3>
                      <p className="text-muted-foreground">
                        Our Orlando psychiatry clinic collaborates with therapists, primary care physicians, and other providers to deliver comprehensive, coordinated mental health care that addresses all aspects of your wellbeing.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Calendar className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">
                        <Link href="/same-day-psychiatrist-orlando" className="text-foreground hover:text-primary transition-colors">
                          Same-Day Appointments Available
                        </Link>
                      </h3>
                      <p className="text-muted-foreground">
                        When you're experiencing a mental health crisis or urgent psychiatric need, our Orlando clinic often has same-day or next-day appointment availability. We prioritize timely access to care.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Mental Health Conditions Treated at Our Orlando Clinic
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Our board-certified psychiatrists at Empathy Health Clinic provide expert treatment for a wide range of psychiatric conditions affecting adults and adolescents in the Orlando area:
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

            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div id="contact-form">
                <ShortContactForm />
              </div>

              {/* Related Services */}
              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-semibold text-lg text-foreground mb-4">Our Specialty Services</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/psychiatrist-orlando" className="text-primary hover:underline font-medium text-sm">
                      Psychiatrist Orlando →
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1">Board-certified psychiatric care</p>
                  </li>
                  <li>
                    <Link href="/adhd-testing-orlando" className="text-primary hover:underline font-medium text-sm">
                      ADHD Testing →
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1">Expert ADHD diagnosis and treatment</p>
                  </li>
                  <li>
                    <Link href="/anxiety-therapy" className="text-primary hover:underline font-medium text-sm">
                      Anxiety Therapy →
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1">Comprehensive anxiety disorder care</p>
                  </li>
                  <li>
                    <Link href="/depression-counseling" className="text-primary hover:underline font-medium text-sm">
                      Depression Counseling →
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1">Evidence-based depression treatment</p>
                  </li>
                  <li>
                    <Link href="/services" className="text-primary hover:underline font-medium text-sm">
                      Medication Management →
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1">Psychiatric medication services</p>
                  </li>
                  <li>
                    <Link href="/virtual-therapy" className="text-primary hover:underline font-medium text-sm">
                      Virtual Therapy →
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1">Virtual psychiatry appointments</p>
                  </li>
                </ul>
              </div>

              {/* Service Areas */}
              <div className="bg-primary/5 border rounded-lg p-6">
                <h3 className="font-semibold text-lg text-foreground mb-3">Orlando Communities We Serve</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Our Orlando psychiatry clinic proudly serves patients throughout Central Florida and the Greater Orlando area:
                </p>
                <ul className="text-sm text-foreground space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Downtown Orlando</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Winter Park</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Lake Nona</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Baldwin Park</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Thornton Park</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Altamonte Springs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Lake Mary</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Maitland</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Apopka, FL</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Factors */}
        <TrustFactors />
        
        {/* Reviews and Badges */}
        <ReviewsAndBadges />
      </main>
      <SiteFooter />
    </div>
  );
}
