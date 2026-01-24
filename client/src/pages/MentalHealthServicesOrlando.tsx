import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { CheckCircle2, MapPin, Phone, Clock, Star, CheckCircle, Brain, Shield, Calendar, Users, Video, Award, Heart, Stethoscope, MessageCircle } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import HeroBackground from "@/components/HeroBackground";
import ShortContactForm from "@/components/ShortContactForm";
import { LocalizedContentMultiple } from "@/components/LocalizedContent";
import InternalLinkBlock from "@/components/InternalLinkBlock";
const heroImage = "/site-assets/stock_images/professional_healthc_955227e9.jpg";
import { trackEvent } from "@/lib/analytics";
import ReviewSchema, { PAGE_TESTIMONIALS } from "@/components/ReviewSchema";

export default function MentalHealthServicesOrlando() {
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
        "name": "Empathy Health Clinic - Mental Health Services Orlando",
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
          "Psychotherapy",
          "Psychology"
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
            "name": "Winter Park"
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
          },
          {
            "@type": "City",
            "name": "Kissimmee"
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
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "127"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://empathyhealthclinic.com/mental-health-services-orlando/#webpage",
        "url": "https://empathyhealthclinic.com/mental-health-services-orlando",
        "name": "Mental Health Services Orlando | Comprehensive Care | Empathy Health Clinic",
        "isPartOf": {
          "@id": "https://empathyhealthclinic.com/#website"
        },
        "inLanguage": "en",
        "about": {
          "@id": "https://empathyhealthclinic.com/#organization"
        },
        "description": "Comprehensive mental health services in Orlando, FL. Expert psychiatrists, therapists, and counselors. Treatment for anxiety, depression, ADHD, trauma, and more. Same-week appointments available.",
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://empathyhealthclinic.com" + heroImage
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://empathyhealthclinic.com/mental-health-services-orlando/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What mental health services do you offer in Orlando?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer comprehensive mental health services including psychiatric evaluations, medication management, individual therapy, couples counseling, family therapy, ADHD treatment, anxiety and depression treatment, trauma therapy (EMDR), telepsychiatry, and crisis intervention. Our board-certified psychiatrists and licensed therapists provide evidence-based treatment tailored to each patient's needs."
            }
          },
          {
            "@type": "Question",
            "name": "How quickly can I get a mental health appointment in Orlando?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most patients can schedule appointments within the same week. We understand that mental health needs are urgent, so we prioritize timely access to care for all patients in the Orlando area."
            }
          },
          {
            "@type": "Question",
            "name": "Do you accept insurance for mental health services?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Empathy Health Clinic accepts most major insurance plans including Medicare, Medicaid, Cigna, Blue Cross Blue Shield, UMR, Aetna, United Healthcare, and many others. We also offer self-pay options. Contact us to verify your specific insurance coverage."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer telehealth mental health services?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We offer secure telehealth appointments throughout Florida for psychiatry and therapy services. Virtual appointments provide convenient access to mental health care from the comfort of your home."
            }
          },
          {
            "@type": "Question",
            "name": "What conditions do you treat?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We treat a wide range of mental health conditions including depression, anxiety disorders, ADHD, bipolar disorder, PTSD, OCD, panic disorder, social anxiety, eating disorders, personality disorders, substance use disorders, grief and loss, and stress-related conditions. Our team provides specialized care for children, adolescents, and adults."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between a psychiatrist and a therapist?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Psychiatrists are medical doctors who can prescribe medication and provide psychiatric evaluations and medication management. Therapists (psychologists, counselors, social workers) provide psychotherapy and counseling but typically cannot prescribe medication. At Empathy Health Clinic, we have both psychiatrists and therapists to provide comprehensive mental health care."
            }
          },
          {
            "@type": "Question",
            "name": "Do you provide mental health services for children and adolescents?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We provide specialized mental health services for children and adolescents, including ADHD evaluations and treatment, anxiety and depression treatment, behavioral therapy, and family therapy. Our providers are experienced in working with young patients and their families."
            }
          },
          {
            "@type": "Question",
            "name": "Where is your Orlando mental health clinic located?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our clinic is located at 2281 Lee Road Suite 102, Orlando (Winter Park area), FL 32810. We serve patients throughout the greater Orlando area including Winter Park, Altamonte Springs, Lake Mary, Maitland, and Kissimmee. Telehealth services are available throughout Florida."
            }
          }
        ]
      }
    ]
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', { location: 'mental_health_services_orlando_page' });
  };

  const handleHeroCTA = () => {
    trackEvent('mental_health_services_orlando_hero_cta', { category: 'conversion' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Mental Health Clinic Orlando | Psychiatry & Therapy | 2025"
        description="Top mental health clinic in Orlando, FL. Board-certified psychiatrists and licensed therapists. Expert treatment for anxiety, depression, ADHD, trauma. Same-week appointments. Most insurance accepted. Call 386-848-8751."
        keywords={[
          "mental health clinic orlando",
          "mental health clinic orlando fl",
          "orlando mental health clinic",
          "mental health services orlando",
          "psychiatrist orlando",
          "therapist orlando",
          "mental health center orlando",
          "psychiatric clinic orlando",
          "counseling clinic orlando"
        ]}
        canonicalPath="/mental-health-services-orlando"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Mental Health Services Orlando, FL
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Comprehensive mental health care for Orlando and Central Florida. Our team of board-certified psychiatrists, licensed therapists, and mental health counselors provides expert treatment for anxiety, depression, ADHD, trauma, and a wide range of mental health conditions.
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
          
          <LocalizedContentMultiple 
            variant="hero" 
            title="Serving Central Florida" 
            className="mt-6"
          />
        </HeroBackground>

        <section className="py-6 bg-background border-b" data-testid="seo-internal-links-above-fold">
          <div className="container mx-auto px-4 max-w-6xl">
            <InternalLinkBlock 
              category="services" 
              title="Our Mental Health Services"
              variant="cards"
              limit={6}
              excludePaths={["/mental-health-services-orlando"]}
            />
          </div>
        </section>

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
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Most Insurance Accepted</span>
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
                  <h3 className="font-semibold text-foreground mb-1">Orlando Location</h3>
                  <p className="text-sm text-muted-foreground">
                    2281 Lee Rd Suite 102<br />
                    Orlando, FL 32810<br />
                    (Winter Park area)
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
                  <h3 className="font-semibold text-foreground mb-1">Call Us Today</h3>
                  <a 
                    href="tel:386-848-8751" 
                    className="text-lg font-bold text-primary hover:underline"
                    data-testid="link-phone"
                    onClick={handlePhoneClick}
                  >
                    386-848-8751
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Accepting new patients
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3" data-testid="hours-info">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Office Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Mon-Sun: 9:00 AM - 7:00 PM<br />
                    Telehealth & in-person available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4">
                Comprehensive Mental Health Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our experienced team provides a full range of psychiatric and therapeutic services to support your mental health journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover-elevate" data-testid="service-psychiatric-evaluations">
                <CardHeader>
                  <Brain className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Psychiatric Evaluations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Comprehensive diagnostic assessments by board-certified psychiatrists to accurately identify mental health conditions and develop personalized treatment plans.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate" data-testid="service-medication-management">
                <CardHeader>
                  <Stethoscope className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Medication Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Expert psychiatric medication management with ongoing monitoring, dosage adjustments, and careful attention to side effects for optimal outcomes.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate" data-testid="service-individual-therapy">
                <CardHeader>
                  <MessageCircle className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Individual Therapy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Evidence-based psychotherapy including CBT, DBT, and psychodynamic approaches tailored to your unique needs and goals.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate" data-testid="service-couples-counseling">
                <CardHeader>
                  <Heart className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Couples & Family Therapy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Relationship counseling and family therapy to improve communication, resolve conflicts, and strengthen bonds between loved ones.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate" data-testid="service-adhd-treatment">
                <CardHeader>
                  <Brain className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>ADHD Treatment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Specialized ADHD evaluations and treatment for children and adults, including medication management and behavioral strategies.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate" data-testid="service-trauma-therapy">
                <CardHeader>
                  <Shield className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Trauma Therapy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Trauma-focused treatment including EMDR therapy for PTSD, childhood trauma, and traumatic experiences.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate" data-testid="service-anxiety-treatment">
                <CardHeader>
                  <Brain className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Anxiety Treatment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Comprehensive treatment for generalized anxiety, panic disorder, social anxiety, and phobias using proven therapeutic techniques.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate" data-testid="service-depression-treatment">
                <CardHeader>
                  <Heart className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Depression Treatment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Expert care for depression, including major depressive disorder, persistent depressive disorder, and seasonal affective disorder.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate" data-testid="service-telepsychiatry">
                <CardHeader>
                  <Video className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Telepsychiatry Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Secure, convenient telehealth appointments for psychiatry and therapy services available throughout Florida.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-card">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-sans font-bold mb-6">
                  Why Choose Empathy Health Clinic?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We're committed to providing exceptional mental health care with compassion, expertise, and personalized attention.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Award className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Expert Providers</h3>
                      <p className="text-muted-foreground">
                        Board-certified psychiatrists and licensed therapists with extensive experience treating a wide range of mental health conditions.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Same-Week Appointments</h3>
                      <p className="text-muted-foreground">
                        Mental health care when you need it. Most patients can schedule appointments within the same week.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Insurance Accepted</h3>
                      <p className="text-muted-foreground">
                        We accept most major insurance plans including Medicare, Medicaid, and private insurance to make care accessible.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Comprehensive Care</h3>
                      <p className="text-muted-foreground">
                        Complete mental health services under one roof - from psychiatric evaluations to ongoing therapy and medication management.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Video className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Flexible Options</h3>
                      <p className="text-muted-foreground">
                        Choose between in-person or telehealth appointments to fit your schedule and comfort level.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div id="contact-form" className="bg-background border rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-2">Request an Appointment</h3>
                <p className="text-muted-foreground mb-6">
                  Take the first step toward better mental health. Fill out the form below and we'll contact you to schedule your appointment.
                </p>
                <ShortContactForm source="Mental Health Services Orlando Page" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4">
                Conditions We Treat
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our experienced mental health professionals provide expert care for a wide range of conditions
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Depression",
                "Anxiety Disorders",
                "ADHD",
                "Bipolar Disorder",
                "PTSD & Trauma",
                "OCD",
                "Panic Disorder",
                "Social Anxiety",
                "Eating Disorders",
                "Personality Disorders",
                "Grief & Loss",
                "Stress Management",
                "Sleep Disorders",
                "Relationship Issues",
                "Substance Use Disorders",
                "Schizophrenia"
              ].map((condition, index) => (
                <div 
                  key={index}
                  className="border rounded-lg p-4 text-center hover-elevate"
                  data-testid={`condition-${index}`}
                >
                  <CheckCircle className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="font-medium text-sm">{condition}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-card">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <div className="border rounded-lg p-6 bg-background">
                <h3 className="text-lg font-semibold mb-3">What mental health services do you offer in Orlando?</h3>
                <p className="text-muted-foreground">
                  We offer comprehensive mental health services including psychiatric evaluations, medication management, individual therapy, couples counseling, family therapy, ADHD treatment, anxiety and depression treatment, trauma therapy (EMDR), telepsychiatry, and crisis intervention. Our board-certified psychiatrists and licensed therapists provide evidence-based treatment tailored to each patient's needs.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-background">
                <h3 className="text-lg font-semibold mb-3">How quickly can I get a mental health appointment in Orlando?</h3>
                <p className="text-muted-foreground">
                  Most patients can schedule appointments within the same week. We understand that mental health needs are urgent, so we prioritize timely access to care for all patients in the Orlando area.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-background">
                <h3 className="text-lg font-semibold mb-3">Do you accept insurance for mental health services?</h3>
                <p className="text-muted-foreground">
                  Yes. Empathy Health Clinic accepts most major insurance plans including Medicare, Medicaid, Cigna, Blue Cross Blue Shield, UMR, Aetna, United Healthcare, and many others. We also offer self-pay options. Contact us to verify your specific insurance coverage.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-background">
                <h3 className="text-lg font-semibold mb-3">Do you offer telehealth mental health services?</h3>
                <p className="text-muted-foreground">
                  Yes. We offer secure telehealth appointments throughout Florida for psychiatry and therapy services. Virtual appointments provide convenient access to mental health care from the comfort of your home.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-background">
                <h3 className="text-lg font-semibold mb-3">What is the difference between a psychiatrist and a therapist?</h3>
                <p className="text-muted-foreground">
                  Psychiatrists are medical doctors who can prescribe medication and provide psychiatric evaluations and medication management. Therapists (psychologists, counselors, social workers) provide psychotherapy and counseling but typically cannot prescribe medication. At Empathy Health Clinic, we have both psychiatrists and therapists to provide comprehensive mental health care.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-background">
                <h3 className="text-lg font-semibold mb-3">Do you provide mental health services for children and adolescents?</h3>
                <p className="text-muted-foreground">
                  Yes. We provide specialized mental health services for children and adolescents, including ADHD evaluations and treatment, anxiety and depression treatment, behavioral therapy, and family therapy. Our providers are experienced in working with young patients and their families.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="insurance" className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <InsuranceSection />
          </div>
        </section>

        <section className="py-16 md:py-20 bg-card">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-6">
              Ready to Start Your Mental Health Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Take the first step toward better mental health. Our compassionate team is here to support you every step of the way.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                asChild
                data-testid="button-cta-appointment"
              >
                <a href="#contact-form">Schedule Appointment</a>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                asChild
                data-testid="button-cta-call"
              >
                <a 
                  href="tel:+13868488751"
                  onClick={handlePhoneClick}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call (386) 848-8751
                </a>
              </Button>
            </div>
          </div>
        </section>

        <ReviewsAndBadges />

        <ReviewSchema 
          reviews={PAGE_TESTIMONIALS["mental-health-services-orlando"]} 
          pageIdentifier="mental-health-services-orlando" 
        />
      </main>

      <SiteFooter />
    </div>
  );
}
