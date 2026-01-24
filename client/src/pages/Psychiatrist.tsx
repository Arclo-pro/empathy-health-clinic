import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, MapPin, Phone, Clock, Star, CheckCircle, Brain, Shield, Calendar, Users, Video, Award, Heart, Pill, Stethoscope, MessageSquare, TrendingUp, Activity, Zap, ThumbsUp } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import HeroBackground from "@/components/HeroBackground";
import ShortContactForm from "@/components/ShortContactForm";
const heroImage = "/site-assets/stock_images/professional_healthc_955227e9.jpg";
import { trackEvent } from "@/lib/analytics";

export default function Psychiatrist() {
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
        "@type": ["Physician", "MedicalBusiness", "Psychiatrist", "MedicalClinic"],
        "@id": "https://empathyhealthclinic.com/psychiatrist#organization",
        "name": "Empathy Health Clinic - Board-Certified Psychiatrists",
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
          "PsychiatricEvaluation",
          "MentalHealth",
          "AdultPsychiatry",
          "AdolescentPsychiatry"
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
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "127",
          "bestRating": "5",
          "worstRating": "1"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Psychiatric Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalProcedure",
                "name": "Medication Management",
                "description": "Ongoing psychiatric medication evaluation and adjustment for optimal mental health outcomes"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalProcedure",
                "name": "Psychiatric Evaluation",
                "description": "Comprehensive mental health assessment and diagnosis"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalProcedure",
                "name": "Mental Health Treatment",
                "description": "Evidence-based treatment for depression, anxiety, ADHD, bipolar disorder, and other conditions"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalProcedure",
                "name": "Telepsychiatry",
                "description": "Virtual psychiatric appointments for convenient access to care"
              }
            }
          ]
        },
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
        "paymentAccepted": ["BCBS", "Cigna", "UMR", "Medicare", "Aetna", "United Healthcare", "Most Major Insurance"]
      },
      {
        "@type": "WebPage",
        "@id": "https://empathyhealthclinic.com/psychiatrist/#webpage",
        "url": "https://empathyhealthclinic.com/psychiatrist",
        "name": "Psychiatrist Near Me | Mental Health Treatment & Medication Management",
        "isPartOf": {
          "@id": "https://empathyhealthclinic.com/#website"
        },
        "inLanguage": "en",
        "about": {
          "@id": "https://empathyhealthclinic.com/psychiatrist#organization"
        },
        "description": "Board-certified psychiatrists providing mental health treatment, medication management, and psychiatric evaluations. Same-week appointments, telehealth available, most insurance accepted. Call 386-848-8751.",
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://empathyhealthclinic.com" + heroImage
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://empathyhealthclinic.com/psychiatrist/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the difference between a psychiatrist and a therapist?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A psychiatrist is a medical doctor (MD or DO) who can diagnose mental health conditions, prescribe medications, and provide medical treatment. A therapist (psychologist, counselor, or social worker) provides talk therapy but cannot prescribe medications. At Empathy Health Clinic, we offer both psychiatry and therapy services."
            }
          },
          {
            "@type": "Question",
            "name": "How quickly can I see a psychiatrist?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most patients can schedule an appointment within the same week. We prioritize timely access to psychiatric care and offer flexible scheduling including evenings and weekends."
            }
          },
          {
            "@type": "Question",
            "name": "Do you accept insurance for psychiatric services?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we accept most major insurance plans including BCBS, Cigna, UMR, Medicare, Aetna, and United Healthcare. Contact us to verify your specific coverage."
            }
          },
          {
            "@type": "Question",
            "name": "What conditions do psychiatrists treat?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our board-certified psychiatrists treat a wide range of mental health conditions including depression, anxiety disorders, ADHD, bipolar disorder, PTSD, OCD, panic disorder, and other psychiatric conditions."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer telepsychiatry (virtual appointments)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we offer secure telepsychiatry appointments for your convenience. Virtual visits are available for initial evaluations, medication management, and follow-up appointments."
            }
          },
          {
            "@type": "Question",
            "name": "What should I expect at my first psychiatrist appointment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Your first appointment typically lasts 60-90 minutes and includes a comprehensive psychiatric evaluation. Your psychiatrist will review your medical history, current symptoms, and concerns to develop a personalized treatment plan that may include medication, therapy referrals, or other interventions."
            }
          },
          {
            "@type": "Question",
            "name": "How does medication management work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Medication management involves regular follow-up appointments (typically every 1-3 months) where your psychiatrist monitors your response to medication, adjusts dosages as needed, manages side effects, and ensures optimal treatment outcomes."
            }
          },
          {
            "@type": "Question",
            "name": "Can I see a psychiatrist for medication refills?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we provide ongoing medication management including prescription refills. Regular follow-up appointments ensure safe and effective medication use and allow your psychiatrist to make adjustments as needed."
            }
          },
          {
            "@type": "Question",
            "name": "Do you treat adolescents and teens?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our psychiatrists provide specialized care for adolescents (ages 13+) and adults. We understand the unique mental health needs of younger patients and work collaboratively with families."
            }
          },
          {
            "@type": "Question",
            "name": "Is psychiatric care confidential?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all psychiatric services are strictly confidential and HIPAA-compliant. We maintain the highest standards of privacy and only share information with your consent, except in rare cases required by law (such as imminent danger to self or others)."
            }
          }
        ]
      }
    ]
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Psychiatrist Page', '386-848-8751');
  };

  const handleHeroCTA = () => {
    trackEvent('psychiatrist_hero_cta', 'conversion', 'Psychiatrist Page');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Psychiatrist Near Me | Mental Health Treatment & Medication Management"
        description="Board-certified psychiatrists providing expert mental health treatment, medication management, and psychiatric evaluations. Same-week appointments available. Telehealth options. Most insurance accepted including BCBS, Cigna, Medicare. Call 386-848-8751 today."
        keywords={["psychiatrist", "psychiatrist near me", "psychiatric services", "mental health psychiatrist", "medication management psychiatrist", "psychiatrist orlando", "board certified psychiatrist", "telepsychiatry", "psychiatric evaluation"]}
        canonicalPath="/psychiatrist"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Psychiatrist in Orlando
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Expert psychiatric care for adults and adolescents. Comprehensive medication management, psychiatric evaluations, and personalized mental health treatment. Same-week appointments available with telehealth options.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              className=""
              data-testid="button-hero-cta"
              onClick={handleHeroCTA}
            >
              <a href="#contact-form">Schedule Appointment</a>
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
                <span>Same-Week Appointments</span>
              </div>
              <div className="hidden lg:block h-6 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Video className="h-4 w-4 text-primary" />
                <span>Telehealth Available</span>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Section */}
        <InsuranceSection />

        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* What Does a Psychiatrist Do Section */}
              <section>
                <h2 className="text-2xl md:text-3xl font-sans font-bold text-foreground mb-6" data-testid="heading-what-psychiatrist-does">
                  What Does a Psychiatrist Do?
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    A psychiatrist is a medical doctor specializing in mental health who can diagnose, treat, and help prevent mental health disorders. Unlike therapists or counselors, psychiatrists can prescribe medications and provide medical interventions for mental health conditions.
                  </p>
                  <p className="text-foreground leading-relaxed mb-4">
                    At Empathy Health Clinic, our board-certified psychiatrists combine medical expertise with compassionate care to provide:
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Comprehensive Psychiatric Evaluations</strong> - Thorough assessment of your mental health, symptoms, and history</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Medication Management</strong> - Prescribing and monitoring psychiatric medications for optimal results</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Treatment Planning</strong> - Developing personalized care plans tailored to your needs</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Ongoing Support</strong> - Regular follow-up appointments to track progress and adjust treatment</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Collaborative Care</strong> - Working with therapists, primary care doctors, and other providers</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Conditions We Treat Section */}
              <section>
                <h2 className="text-2xl md:text-3xl font-sans font-bold text-foreground mb-6" data-testid="heading-conditions-we-treat">
                  Conditions We Treat
                </h2>
                <p className="text-foreground leading-relaxed mb-6">
                  Our board-certified psychiatrists have extensive experience treating a wide range of mental health conditions:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 rounded-lg border bg-card" data-testid="condition-depression">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Brain className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Depression</h3>
                      <p className="text-sm text-muted-foreground">Major depressive disorder, persistent depression, and mood disorders</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-lg border bg-card" data-testid="condition-anxiety">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Anxiety Disorders</h3>
                      <p className="text-sm text-muted-foreground">Generalized anxiety, panic disorder, social anxiety, phobias</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-lg border bg-card" data-testid="condition-adhd">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">ADHD</h3>
                      <p className="text-sm text-muted-foreground">Adult and adolescent ADHD evaluation and treatment</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-lg border bg-card" data-testid="condition-bipolar">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Bipolar Disorder</h3>
                      <p className="text-sm text-muted-foreground">Bipolar I, Bipolar II, and cyclothymic disorder</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-lg border bg-card" data-testid="condition-ptsd">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">PTSD & Trauma</h3>
                      <p className="text-sm text-muted-foreground">Post-traumatic stress disorder and trauma-related conditions</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-lg border bg-card" data-testid="condition-ocd">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Brain className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">OCD</h3>
                      <p className="text-sm text-muted-foreground">Obsessive-compulsive disorder and related conditions</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-lg border bg-card" data-testid="condition-insomnia">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Sleep Disorders</h3>
                      <p className="text-sm text-muted-foreground">Insomnia, sleep-wake disorders, and sleep disturbances</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-lg border bg-card" data-testid="condition-other">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">And More</h3>
                      <p className="text-sm text-muted-foreground">Eating disorders, personality disorders, psychotic disorders</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* How Psychiatry Can Help You Section */}
              <section>
                <h2 className="text-2xl md:text-3xl font-sans font-bold text-foreground mb-6" data-testid="heading-how-psychiatry-helps">
                  How Psychiatry Can Help You
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-6">
                    Psychiatric care offers comprehensive, medical-based treatment for mental health conditions. Here's how working with a psychiatrist can make a difference:
                  </p>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Pill className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">Medication When You Need It</h3>
                        <p className="text-muted-foreground">
                          Psychiatric medications can be highly effective for many mental health conditions. Your psychiatrist will carefully prescribe, monitor, and adjust medications to ensure optimal results with minimal side effects.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Brain className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">Medical Expertise</h3>
                        <p className="text-muted-foreground">
                          As medical doctors, psychiatrists understand the biological basis of mental health conditions and can identify medical issues that may contribute to symptoms.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">Evidence-Based Treatment</h3>
                        <p className="text-muted-foreground">
                          Our psychiatrists use proven, research-backed treatment approaches to help you achieve lasting improvement in your mental health and quality of life.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">Collaborative Care</h3>
                        <p className="text-muted-foreground">
                          We work closely with your other healthcare providers, including therapists and primary care doctors, to ensure coordinated, comprehensive care.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Our Approach Section */}
              <section>
                <h2 className="text-2xl md:text-3xl font-sans font-bold text-foreground mb-6" data-testid="heading-our-approach">
                  Our Approach to Psychiatric Care
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-lg border bg-card" data-testid="approach-personalized">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Personalized Treatment Plans</h3>
                    <p className="text-muted-foreground">
                      Every patient is unique. We develop individualized treatment plans based on your specific symptoms, goals, and preferences.
                    </p>
                  </div>

                  <div className="p-6 rounded-lg border bg-card" data-testid="approach-compassionate">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <ThumbsUp className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Compassionate, Judgment-Free Care</h3>
                    <p className="text-muted-foreground">
                      We provide a safe, supportive environment where you can openly discuss your mental health without fear of judgment.
                    </p>
                  </div>

                  <div className="p-6 rounded-lg border bg-card" data-testid="approach-accessible">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Video className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Accessible & Convenient</h3>
                    <p className="text-muted-foreground">
                      With same-week appointments and telepsychiatry options, getting the care you need has never been easier.
                    </p>
                  </div>

                  <div className="p-6 rounded-lg border bg-card" data-testid="approach-ongoing">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Ongoing Support</h3>
                    <p className="text-muted-foreground">
                      Mental health treatment is a journey. We provide continuous support with regular follow-ups to ensure your progress.
                    </p>
                  </div>
                </div>
              </section>

              {/* What to Expect Section */}
              <section>
                <h2 className="text-2xl md:text-3xl font-sans font-bold text-foreground mb-6" data-testid="heading-what-to-expect">
                  What to Expect at Your First Appointment
                </h2>
                <p className="text-foreground leading-relaxed mb-6">
                  Your first visit with a psychiatrist is an important step in your mental health journey. Here's what typically happens:
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 rounded-lg border bg-card" data-testid="step-intake">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">Initial Intake (10-15 minutes)</h3>
                      <p className="text-muted-foreground text-sm">
                        Complete necessary paperwork and provide your medical history. You can complete intake forms online before your visit to save time.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-lg border bg-card" data-testid="step-evaluation">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">Comprehensive Evaluation (45-60 minutes)</h3>
                      <p className="text-muted-foreground text-sm">
                        Your psychiatrist will discuss your current symptoms, mental health history, medical history, medications, and life circumstances. This helps create an accurate diagnosis.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-lg border bg-card" data-testid="step-diagnosis">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">Diagnosis & Treatment Plan (15-20 minutes)</h3>
                      <p className="text-muted-foreground text-sm">
                        Your psychiatrist will explain their diagnostic impressions and discuss treatment options, including medications, therapy, lifestyle changes, and other interventions.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-lg border bg-card" data-testid="step-followup">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">Follow-Up Planning (5-10 minutes)</h3>
                      <p className="text-muted-foreground text-sm">
                        Schedule your next appointment (typically in 2-4 weeks for medication adjustments) and discuss how to contact the clinic if questions arise.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-sm text-foreground">
                    <strong>Total Time:</strong> Plan for 60-90 minutes for your first appointment. Follow-up visits are typically 15-30 minutes.
                  </p>
                </div>
              </section>

              {/* FAQ Section */}
              <section>
                <h2 className="text-2xl md:text-3xl font-sans font-bold text-foreground mb-6" data-testid="heading-faq">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <details className="group rounded-lg border bg-card overflow-hidden" data-testid="faq-psychiatrist-vs-therapist">
                    <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold text-foreground hover:bg-accent/50 transition-colors">
                      <span>What is the difference between a psychiatrist and a therapist?</span>
                      <CheckCircle2 className="h-5 w-5 text-primary group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6 text-muted-foreground">
                      <p>
                        A psychiatrist is a medical doctor (MD or DO) who can diagnose mental health conditions, prescribe medications, and provide medical treatment. A therapist (psychologist, counselor, or social worker) provides talk therapy but cannot prescribe medications. At Empathy Health Clinic, we offer both psychiatry and therapy services, and many patients benefit from seeing both.
                      </p>
                    </div>
                  </details>

                  <details className="group rounded-lg border bg-card overflow-hidden" data-testid="faq-how-quickly">
                    <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold text-foreground hover:bg-accent/50 transition-colors">
                      <span>How quickly can I see a psychiatrist?</span>
                      <CheckCircle2 className="h-5 w-5 text-primary group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6 text-muted-foreground">
                      <p>
                        Most patients can schedule an appointment within the same week. We understand that when you're struggling with mental health symptoms, timely access to care is critical. We offer flexible scheduling including evenings and weekends.
                      </p>
                    </div>
                  </details>

                  <details className="group rounded-lg border bg-card overflow-hidden" data-testid="faq-insurance">
                    <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold text-foreground hover:bg-accent/50 transition-colors">
                      <span>Do you accept insurance for psychiatric services?</span>
                      <CheckCircle2 className="h-5 w-5 text-primary group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6 text-muted-foreground">
                      <p>
                        Yes, we accept most major insurance plans including BCBS, Cigna, UMR, Medicare, Aetna, and United Healthcare. We recommend contacting us to verify your specific coverage and benefits.
                      </p>
                    </div>
                  </details>

                  <details className="group rounded-lg border bg-card overflow-hidden" data-testid="faq-conditions">
                    <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold text-foreground hover:bg-accent/50 transition-colors">
                      <span>What conditions do psychiatrists treat?</span>
                      <CheckCircle2 className="h-5 w-5 text-primary group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6 text-muted-foreground">
                      <p>
                        Our board-certified psychiatrists treat a wide range of mental health conditions including depression, anxiety disorders, ADHD, bipolar disorder, PTSD, OCD, panic disorder, insomnia, eating disorders, and other psychiatric conditions.
                      </p>
                    </div>
                  </details>

                  <details className="group rounded-lg border bg-card overflow-hidden" data-testid="faq-telepsychiatry">
                    <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold text-foreground hover:bg-accent/50 transition-colors">
                      <span>Do you offer telepsychiatry (virtual appointments)?</span>
                      <CheckCircle2 className="h-5 w-5 text-primary group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6 text-muted-foreground">
                      <p>
                        Yes, we offer secure telepsychiatry appointments for your convenience. Virtual visits are available for initial evaluations, medication management, and follow-up appointments. This allows you to receive quality psychiatric care from the comfort of your home.
                      </p>
                    </div>
                  </details>

                  <details className="group rounded-lg border bg-card overflow-hidden" data-testid="faq-first-appointment">
                    <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold text-foreground hover:bg-accent/50 transition-colors">
                      <span>What should I expect at my first psychiatrist appointment?</span>
                      <CheckCircle2 className="h-5 w-5 text-primary group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6 text-muted-foreground">
                      <p>
                        Your first appointment typically lasts 60-90 minutes and includes a comprehensive psychiatric evaluation. Your psychiatrist will review your medical history, current symptoms, and concerns to develop a personalized treatment plan that may include medication, therapy referrals, or other interventions.
                      </p>
                    </div>
                  </details>

                  <details className="group rounded-lg border bg-card overflow-hidden" data-testid="faq-medication-management">
                    <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold text-foreground hover:bg-accent/50 transition-colors">
                      <span>How does medication management work?</span>
                      <CheckCircle2 className="h-5 w-5 text-primary group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6 text-muted-foreground">
                      <p>
                        Medication management involves regular follow-up appointments (typically every 1-3 months) where your psychiatrist monitors your response to medication, adjusts dosages as needed, manages side effects, and ensures optimal treatment outcomes. This ongoing care is essential for safe and effective medication use.
                      </p>
                    </div>
                  </details>

                  <details className="group rounded-lg border bg-card overflow-hidden" data-testid="faq-medication-refills">
                    <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold text-foreground hover:bg-accent/50 transition-colors">
                      <span>Can I see a psychiatrist for medication refills?</span>
                      <CheckCircle2 className="h-5 w-5 text-primary group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6 text-muted-foreground">
                      <p>
                        Yes, we provide ongoing medication management including prescription refills. Regular follow-up appointments ensure safe and effective medication use and allow your psychiatrist to make adjustments as needed based on your progress and any side effects you may experience.
                      </p>
                    </div>
                  </details>

                  <details className="group rounded-lg border bg-card overflow-hidden" data-testid="faq-adolescents">
                    <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold text-foreground hover:bg-accent/50 transition-colors">
                      <span>Do you treat adolescents and teens?</span>
                      <CheckCircle2 className="h-5 w-5 text-primary group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6 text-muted-foreground">
                      <p>
                        Yes, our psychiatrists provide specialized care for adolescents (ages 13+) and adults. We understand the unique mental health needs of younger patients and work collaboratively with families to provide the best possible care.
                      </p>
                    </div>
                  </details>

                  <details className="group rounded-lg border bg-card overflow-hidden" data-testid="faq-confidentiality">
                    <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold text-foreground hover:bg-accent/50 transition-colors">
                      <span>Is psychiatric care confidential?</span>
                      <CheckCircle2 className="h-5 w-5 text-primary group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6 text-muted-foreground">
                      <p>
                        Yes, all psychiatric services are strictly confidential and HIPAA-compliant. We maintain the highest standards of privacy and only share information with your consent, except in rare cases required by law (such as imminent danger to self or others). Your trust and privacy are paramount to us.
                      </p>
                    </div>
                  </details>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Contact Form */}
                <div id="contact-form">
                  <ShortContactForm service="Psychiatry" />
                </div>

                {/* Related Services */}
                <div className="bg-card border rounded-lg p-6" data-testid="related-services">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Related Services</h3>
                  <div className="space-y-3">
                    <Link href="/psychiatrist-orlando">
                      <a className="block p-3 rounded-lg border border-primary/50 bg-primary/5 hover:border-primary transition-colors" data-testid="link-psychiatrist-orlando">
                        <div className="flex items-center gap-3">
                          <Brain className="h-5 w-5 text-primary" />
                          <span className="font-medium text-primary">Psychiatrist Orlando</span>
                        </div>
                      </a>
                    </Link>
                    <Link href="/services">
                      <a className="block p-3 rounded-lg border hover:border-primary transition-colors" data-testid="link-medication-management">
                        <div className="flex items-center gap-3">
                          <Pill className="h-5 w-5 text-primary" />
                          <span className="font-medium text-foreground">Medication Management</span>
                        </div>
                      </a>
                    </Link>
                    <Link href="/virtual-therapy">
                      <a className="block p-3 rounded-lg border hover:border-primary transition-colors" data-testid="link-telepsychiatry">
                        <div className="flex items-center gap-3">
                          <Video className="h-5 w-5 text-primary" />
                          <span className="font-medium text-foreground">Virtual Therapy</span>
                        </div>
                      </a>
                    </Link>
                    <Link href="/therapy">
                      <a className="block p-3 rounded-lg border hover:border-primary transition-colors" data-testid="link-therapy">
                        <div className="flex items-center gap-3">
                          <MessageSquare className="h-5 w-5 text-primary" />
                          <span className="font-medium text-foreground">Therapy Services</span>
                        </div>
                      </a>
                    </Link>
                    <Link href="/adhd-testing-orlando">
                      <a className="block p-3 rounded-lg border hover:border-primary transition-colors" data-testid="link-adhd">
                        <div className="flex items-center gap-3">
                          <Brain className="h-5 w-5 text-primary" />
                          <span className="font-medium text-foreground">ADHD Testing</span>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="bg-card border rounded-lg p-6" data-testid="trust-indicators">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Why Choose Us</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Board-Certified Psychiatrists</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Same-Week Appointments</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Most Insurance Accepted</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Telehealth Available</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">HIPAA Compliant & Confidential</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Personalized Treatment Plans</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Factors Section */}
        <TrustFactors />

        {/* Reviews Section */}
        <ReviewsAndBadges />
      </main>
      <SiteFooter />
    </div>
  );
}
