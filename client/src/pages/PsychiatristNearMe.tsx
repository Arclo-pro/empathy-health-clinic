import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, MapPin, Phone, Clock, Star, CheckCircle, Brain, Shield, Calendar, Users, Video, Award, Building2, Pill, Clock3 } from "lucide-react";
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

export default function PsychiatristNearMe() {
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
        "@id": "https://empathyhealthclinic.com/psychiatrist-near-me/#organization",
        "name": "Empathy Health Clinic - Psychiatrist in Orlando & Winter Park",
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
          "MedicationManagement",
          "MentalHealth"
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
            "name": "Maitland"
          },
          {
            "@type": "City",
            "name": "Altamonte Springs"
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
        "image": "https://empathyhealthclinic.com" + heroImage,
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Psychiatric Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalProcedure",
                "name": "Medication Management"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalProcedure",
                "name": "Psychiatric Evaluation"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalProcedure",
                "name": "Mental Health Treatment"
              }
            }
          ]
        },
        "paymentAccepted": ["BCBS", "Cigna", "UMR", "Medicare", "Aetna", "United Healthcare"]
      },
      {
        "@type": "WebPage",
        "@id": "https://empathyhealthclinic.com/psychiatrist-near-me/#webpage",
        "url": "https://empathyhealthclinic.com/psychiatrist-near-me",
        "name": "Psychiatrist Near Me in Orlando & Winter Park | Appointments This Week",
        "isPartOf": {
          "@id": "https://empathyhealthclinic.com/#website"
        },
        "inLanguage": "en",
        "about": {
          "@id": "https://empathyhealthclinic.com/psychiatrist-near-me/#organization"
        },
        "description": "Need a psychiatrist near you? Board-certified psychiatrists in Orlando & Winter Park. Medication management, same-week appointments. Accepting BCBS, Cigna, UMR, Medicare. Call 386-848-8751.",
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://empathyhealthclinic.com" + heroImage
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://empathyhealthclinic.com/psychiatrist-near-me/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How quickly can I see a psychiatrist near me?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Appointments available this week. Most patients can schedule within 2-3 days for urgent needs. We prioritize timely access to psychiatric care in Orlando and Winter Park."
            }
          },
          {
            "@type": "Question",
            "name": "What insurance do you accept for psychiatrist visits?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We accept BCBS, Cigna, UMR, Medicare, Aetna, United Healthcare, and most major insurance plans. Contact us to verify your specific coverage."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer medication management services?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our board-certified psychiatrists specialize in medication management for anxiety, depression, ADHD, bipolar disorder, and other mental health conditions. We provide comprehensive medication evaluations, adjustments, and ongoing monitoring."
            }
          }
        ]
      }
    ]
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Psychiatrist Near Me Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Psychiatrist Near Me | Orlando & Winter Park FL | Same-Week"
        description="Find a psychiatrist near me in Orlando & Winter Park, FL. Board-certified psychiatrists accepting new patients. Medication management for anxiety, depression, ADHD. Same-week appointments. BCBS, Cigna, Aetna, Medicare. Call (386) 848-8751."
        keywords={["psychiatrist near me", "psychiatrist near me orlando", "find a psychiatrist near me", "psychiatrist accepting new patients near me", "psychiatrist orlando", "psychiatrist winter park", "medication management near me", "psychiatrist accepting medicare", "psychiatrist accepting cigna", "psychiatrist accepting aetna"]}
        canonicalPath="/psychiatrist-near-me"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Psychiatrist in Orlando & Winter Park
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6 max-w-3xl" data-testid="text-hero-description">
            Board-certified psychiatrists accepting new patients. Medication management for anxiety, depression, ADHD, and more. Same-week appointments available.
          </p>
          
          <div className="flex flex-wrap gap-3 mb-8 text-white/95">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <Clock3 className="h-5 w-5 text-green-300" />
              <span className="font-semibold">Appointments This Week</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <Pill className="h-5 w-5 text-green-300" />
              <span className="font-semibold">Medication Management</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <Shield className="h-5 w-5 text-green-300" />
              <span className="font-semibold">BCBS, Cigna, UMR, Medicare</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/95 hover:bg-white text-gray-900 border-2 border-white font-semibold text-lg px-8 py-6 h-auto backdrop-blur-sm shadow-xl"
              asChild
              onClick={handlePhoneClick}
              data-testid="button-call-now"
            >
              <a href="tel:+13868488751">
                <Phone className="h-5 w-5 mr-2" />
                Call: 386-848-8751
              </a>
            </Button>
          </div>

          <div className="max-w-2xl bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule Your Medication Consultation</h2>
            <p className="text-gray-700 mb-4">Fill out this quick form and we'll contact you today to schedule your appointment.</p>
            <ShortContactForm 
              service="Psychiatrist Near Me - Medication Management"
              className=""
            />
          </div>
        </HeroBackground>

        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4 text-foreground">
                Finding a Psychiatrist Near You Just Got Easier
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Skip the long wait times. Our board-certified psychiatrists in Orlando and Winter Park are accepting new patients with appointments available this week.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-card border border-card-border rounded-lg p-6 text-center hover-elevate">
                <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock3 className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Same-Week Appointments</h3>
                <p className="text-sm text-muted-foreground">Get the help you need quickly. Most patients scheduled within 2-3 days.</p>
              </div>

              <div className="bg-card border border-card-border rounded-lg p-6 text-center hover-elevate">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Pill className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Medication Management</h3>
                <p className="text-sm text-muted-foreground">Expert medication evaluations, adjustments, and ongoing monitoring.</p>
              </div>

              <div className="bg-card border border-card-border rounded-lg p-6 text-center hover-elevate">
                <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Insurance Accepted</h3>
                <p className="text-sm text-muted-foreground">BCBS, Cigna, UMR, Medicare, and most major insurance plans.</p>
              </div>

              <div className="bg-card border border-card-border rounded-lg p-6 text-center hover-elevate">
                <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Convenient Locations</h3>
                <p className="text-sm text-muted-foreground">Serving Orlando, Winter Park, Maitland, and surrounding areas.</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-8 text-center text-white mb-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Ready to Get Started?</h3>
              <p className="text-lg mb-6 text-white/95">
                Appointments available this week. Board-certified psychiatrists accepting new patients.
              </p>
              <Button 
                size="lg" 
                className="bg-white text-green-700 hover:bg-white/95 font-bold text-lg px-10 py-6 h-auto shadow-lg"
                asChild
                data-testid="button-cta-book"
              >
                <Link href="/request-appointment">Book Your Appointment Now</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-8 text-foreground text-center">
              Comprehensive Psychiatric Services
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-card border border-card-border rounded-lg p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg flex-shrink-0">
                    <Pill className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Medication Management</h3>
                    <p className="text-muted-foreground mb-4">
                      Our psychiatrists specialize in finding the right medication and dosage for your unique needs. We provide:
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Comprehensive medication evaluations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Medication adjustments and monitoring</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Side effect management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Coordination with therapy providers</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-card-border rounded-lg p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg flex-shrink-0">
                    <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Conditions We Treat</h3>
                    <p className="text-muted-foreground mb-4">
                      Expert psychiatric care for a wide range of mental health conditions:
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>Depression and mood disorders</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>Anxiety disorders and panic attacks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>ADHD in adults and children</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>Bipolar disorder</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card border border-card-border rounded-lg p-6">
                <Video className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-2">Telepsychiatry Available</h3>
                <p className="text-sm text-muted-foreground">
                  See your psychiatrist from home via secure video visits. Same quality care, more convenience.
                </p>
              </div>

              <div className="bg-card border border-card-border rounded-lg p-6">
                <Award className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-2">Board-Certified</h3>
                <p className="text-sm text-muted-foreground">
                  All our psychiatrists are board-certified with extensive experience in mental health treatment.
                </p>
              </div>

              <div className="bg-card border border-card-border rounded-lg p-6">
                <Users className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-2">Collaborative Care</h3>
                <p className="text-sm text-muted-foreground">
                  We coordinate with your therapist and other providers for comprehensive mental health care.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InsuranceSection className="py-16 px-4 bg-background" />

        <section className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-8 text-foreground text-center">
              Why Choose Us for Psychiatric Care?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Quick Access to Care</h3>
                    <p className="text-sm text-muted-foreground">
                      Same-week appointments available. We understand that when you need help, waiting weeks or months isn't an option.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Insurance Friendly</h3>
                    <p className="text-sm text-muted-foreground">
                      Accepting BCBS, Cigna, UMR, Medicare, and most major insurance plans. We handle the billing so you can focus on getting better.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Personalized Treatment</h3>
                    <p className="text-sm text-muted-foreground">
                      Every patient receives an individualized treatment plan tailored to their unique symptoms, goals, and lifestyle.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Convenient Locations</h3>
                    <p className="text-sm text-muted-foreground">
                      Easily accessible offices in Orlando and Winter Park, plus telepsychiatry options for those who prefer virtual visits.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Medication Expertise</h3>
                    <p className="text-sm text-muted-foreground">
                      Our psychiatrists stay current with the latest psychiatric medications and treatment approaches to provide you the best care.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Compassionate Care</h3>
                    <p className="text-sm text-muted-foreground">
                      We treat every patient with empathy, respect, and understanding. Your mental health journey is our priority.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ReviewsAndBadges />

        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-card border border-card-border rounded-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4 text-foreground">
                  Schedule Your Appointment Today
                </h2>
                <p className="text-lg text-muted-foreground">
                  Take the first step toward better mental health. Appointments available this week with board-certified psychiatrists in Orlando and Winter Park.
                </p>
              </div>
              
              <ShortContactForm 
                service="Psychiatrist Near Me - Bottom Form"
                className="max-w-2xl mx-auto"
              />
              
              <div className="text-center mt-8">
                <p className="text-sm text-muted-foreground mb-4">Prefer to call?</p>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="font-semibold"
                  asChild
                  onClick={handlePhoneClick}
                  data-testid="button-phone-bottom"
                >
                  <a href="tel:+13868488751">
                    <Phone className="h-5 w-5 mr-2" />
                    386-848-8751
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <TrustFactors />

        {/* Related Services Internal Links */}
        <section className="py-12 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-sans font-bold mb-6 text-foreground text-center">
              Explore Our Psychiatric Services
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/psychiatrist-orlando" className="bg-card border border-card-border rounded-lg p-4 text-center hover-elevate">
                <h3 className="font-semibold text-foreground text-sm">Psychiatrist Orlando</h3>
              </Link>
              <Link href="/psychiatrist-winter-park" className="bg-card border border-card-border rounded-lg p-4 text-center hover-elevate">
                <h3 className="font-semibold text-foreground text-sm">Psychiatrist Winter Park</h3>
              </Link>
              <Link href="/medication-management-orlando" className="bg-card border border-card-border rounded-lg p-4 text-center hover-elevate">
                <h3 className="font-semibold text-foreground text-sm">Medication Management</h3>
              </Link>
              <Link href="/anxiety-psychiatrist-orlando" className="bg-card border border-card-border rounded-lg p-4 text-center hover-elevate">
                <h3 className="font-semibold text-foreground text-sm">Anxiety Psychiatrist</h3>
              </Link>
              <Link href="/adhd-psychiatrist-orlando" className="bg-card border border-card-border rounded-lg p-4 text-center hover-elevate">
                <h3 className="font-semibold text-foreground text-sm">ADHD Psychiatrist</h3>
              </Link>
              <Link href="/telepsychiatry-orlando" className="bg-card border border-card-border rounded-lg p-4 text-center hover-elevate">
                <h3 className="font-semibold text-foreground text-sm">Telepsychiatry</h3>
              </Link>
              <Link href="/psychiatric-evaluation-orlando" className="bg-card border border-card-border rounded-lg p-4 text-center hover-elevate">
                <h3 className="font-semibold text-foreground text-sm">Psychiatric Evaluation</h3>
              </Link>
              <Link href="/same-day-psychiatrist-orlando" className="bg-card border border-card-border rounded-lg p-4 text-center hover-elevate">
                <h3 className="font-semibold text-foreground text-sm">Same-Day Psychiatrist</h3>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 bg-muted/50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-sans font-bold mb-8 text-foreground text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-card border border-card-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  How quickly can I see a psychiatrist near me?
                </h3>
                <p className="text-muted-foreground">
                  Appointments available this week. Most patients can schedule within 2-3 days for urgent needs. We prioritize timely access to psychiatric care in Orlando and Winter Park.
                </p>
              </div>

              <div className="bg-card border border-card-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  What insurance do you accept for psychiatrist visits?
                </h3>
                <p className="text-muted-foreground">
                  We accept BCBS (Blue Cross Blue Shield), Cigna, UMR, Medicare, Aetna, United Healthcare, and most major insurance plans. Contact us to verify your specific coverage.
                </p>
              </div>

              <div className="bg-card border border-card-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Do you offer medication management services?
                </h3>
                <p className="text-muted-foreground">
                  Yes, our board-certified psychiatrists specialize in medication management for anxiety, depression, ADHD, bipolar disorder, and other mental health conditions. We provide comprehensive medication evaluations, adjustments, and ongoing monitoring.
                </p>
              </div>

              <div className="bg-card border border-card-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  What's the difference between a psychiatrist and a therapist?
                </h3>
                <p className="text-muted-foreground">
                  Psychiatrists are medical doctors who can prescribe medication and provide medical treatment for mental health conditions. They specialize in medication management and psychiatric evaluations. Therapists provide talk therapy and counseling. Many patients benefit from seeing both a psychiatrist for medication management and a therapist for counseling.
                </p>
              </div>

              <div className="bg-card border border-card-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Do you offer telepsychiatry (virtual visits)?
                </h3>
                <p className="text-muted-foreground">
                  Yes, we offer secure telepsychiatry appointments for your convenience. See your psychiatrist from the comfort of your home via HIPAA-compliant video visits.
                </p>
              </div>

              <div className="bg-card border border-card-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Where are your offices located?
                </h3>
                <p className="text-muted-foreground">
                  Our main office is located at 2281 Lee Road Suite 102, Orlando, FL 32810, conveniently serving Orlando, Winter Park, Maitland, Altamonte Springs, and surrounding areas.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gradient-to-br from-green-600 to-green-700">
          <div className="container mx-auto max-w-4xl text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Don't Wait to Get the Help You Need
            </h2>
            <p className="text-xl mb-8 text-white/95">
              Board-certified psychiatrists in Orlando & Winter Park accepting new patients. Same-week appointments available.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-green-700 hover:bg-white/95 font-bold text-lg px-10 py-6 h-auto shadow-xl"
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
