import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { CheckCircle2, MapPin, Phone, Clock, Star, CheckCircle, Brain, Shield, Calendar, Users, Video, Award, Heart, MessageCircle, Target, Lightbulb } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import HeroBackground from "@/components/HeroBackground";
import ShortContactForm from "@/components/ShortContactForm";
const heroImage = "/site-assets/stock_images/professional_healthc_955227e9.webp";
import { trackEvent } from "@/lib/analytics";

export default function TherapistMaitland() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.empathyhealthclinic.com/#website",
        "url": "https://www.empathyhealthclinic.com/",
        "name": "Empathy Health Clinic",
        "inLanguage": "en"
      },
      {
        "@type": ["MedicalBusiness", "MedicalClinic", "Psychologist"],
        "@id": "https://www.empathyhealthclinic.com/#organization",
        "name": "Empathy Health Clinic - Therapist in Maitland, FL",
        "url": "https://www.empathyhealthclinic.com/",
        "telephone": "+1-386-848-8751",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "2281 Lee Road Suite 102",
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
        "medicalSpecialty": [
          "Psychotherapy",
          "MentalHealth",
          "Psychology",
          "Counseling"
        ],
        "areaServed": [
          {
            "@type": "City",
            "name": "Maitland",
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
            "name": "Orlando"
          },
          {
            "@type": "City",
            "name": "Altamonte Springs"
          },
          {
            "@type": "City",
            "name": "Lake Mary"
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
        "image": "https://www.empathyhealthclinic.com" + heroImage,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "127"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://www.empathyhealthclinic.com/therapist-maitland/#webpage",
        "url": "https://www.empathyhealthclinic.com/therapist-maitland",
        "name": "Therapist in Maitland, FL | Licensed Counselors | Empathy Health Clinic",
        "isPartOf": {
          "@id": "https://www.empathyhealthclinic.com/#website"
        },
        "inLanguage": "en",
        "about": {
          "@id": "https://www.empathyhealthclinic.com/#organization"
        },
        "description": "Expert therapists and counselors serving Maitland, FL. Licensed mental health professionals specializing in anxiety, depression, trauma, relationship counseling, and family therapy. Same-week appointments available.",
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://www.empathyhealthclinic.com" + heroImage
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.empathyhealthclinic.com/therapist-maitland/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What types of therapy do you offer in Maitland?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our Maitland therapists provide evidence-based therapy including Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), EMDR for trauma, psychodynamic therapy, couples counseling, family therapy, grief counseling, and stress management. We tailor our approach to each client's unique needs and goals."
            }
          },
          {
            "@type": "Question",
            "name": "How quickly can I see a therapist in Maitland?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most clients can schedule their first therapy session within the same week. We understand that when you're ready to start therapy, timely access to care is important. Call us at 386-848-8751 to schedule your appointment."
            }
          },
          {
            "@type": "Question",
            "name": "Do you accept insurance for therapy in Maitland?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We accept most major insurance plans including Medicare, Medicaid, Blue Cross Blue Shield, Cigna, Aetna, United Healthcare, UMR, and many others. We also offer self-pay options for those without insurance coverage. Contact us to verify your specific plan."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer telehealth therapy for Maitland residents?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We offer secure telehealth therapy sessions for Maitland residents and clients throughout Florida. Virtual therapy provides convenient, flexible access to care from the comfort of your home while maintaining the same quality of treatment as in-person sessions."
            }
          },
          {
            "@type": "Question",
            "name": "What conditions do your Maitland therapists treat?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our licensed therapists treat anxiety disorders, depression, PTSD and trauma, relationship issues, grief and loss, stress management, life transitions, self-esteem concerns, anger management, eating disorders, OCD, panic disorder, social anxiety, and family conflicts. We provide specialized care for individuals, couples, and families."
            }
          },
          {
            "@type": "Question",
            "name": "What should I expect in my first therapy session?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Your first session is an opportunity to get to know your therapist and discuss your concerns, goals, and history. Your therapist will ask questions to understand your needs and together you'll develop a personalized treatment plan. First sessions typically last 50-60 minutes and are confidential."
            }
          },
          {
            "@type": "Question",
            "name": "Are your Maitland therapists licensed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. All our therapists are licensed mental health professionals in Florida, including Licensed Clinical Social Workers (LCSWs), Licensed Mental Health Counselors (LMHCs), and Licensed Marriage and Family Therapists (LMFTs). They have advanced degrees and specialized training in evidence-based therapeutic approaches."
            }
          },
          {
            "@type": "Question",
            "name": "Where is your therapy office located near Maitland?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our office is conveniently located at 2281 Lee Road Suite 102 in Winter Park, just minutes from Maitland. We serve clients throughout the greater Orlando area including Maitland, Winter Park, Altamonte Springs, Lake Mary, and surrounding communities. Telehealth options are also available."
            }
          }
        ]
      }
    ]
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', { location: 'therapist_maitland_page' });
  };

  const handleHeroCTA = () => {
    trackEvent('therapist_maitland_hero_cta', { category: 'conversion' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Maitland Therapist | Licensed Counselors | Same-Week Apts"
        description="Maitland therapist accepting new patients. Licensed counselors for anxiety, depression & trauma. 5 min from Maitland. Same-week appointments. 386-848-8751."
        keywords={[
          "maitland therapist",
          "therapist maitland",
          "therapist in maitland fl",
          "maitland fl therapist",
          "counselor maitland",
          "maitland counseling",
          "therapy maitland fl",
          "mental health therapist maitland",
          "licensed therapist maitland"
        ]}
        canonicalPath="/therapist-maitland"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Maitland Therapist
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Looking for a Maitland therapist? Our licensed counselors are just 5 minutes from Maitland City Center. We provide evidence-based therapy for anxiety, depression, trauma, and relationship issues. Same-week appointments available—most Maitland residents see a therapist within days.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              className=""
              data-testid="button-hero-cta"
              onClick={handleHeroCTA}
            >
              <a href="#contact-form">Schedule First Session</a>
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
                <span>Licensed Mental Health Professionals</span>
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
                  <h3 className="font-semibold text-foreground mb-1">Serving Maitland</h3>
                  <p className="text-sm text-muted-foreground">
                    2281 Lee Rd Suite 102<br />
                    Winter Park, FL 32810<br />
                    Near Maitland City Center
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
                  <h3 className="font-semibold text-foreground mb-1">Schedule Today</h3>
                  <a 
                    href="tel:386-848-8751" 
                    className="text-lg font-bold text-primary hover:underline"
                    data-testid="link-phone"
                    onClick={handlePhoneClick}
                  >
                    386-848-8751
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Accepting new clients
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3" data-testid="hours-info">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Flexible Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Mon-Sun: 9:00 AM - 7:00 PM<br />
                    In-person & telehealth available
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
                Therapy Services in Maitland
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our licensed therapists provide comprehensive mental health counseling tailored to your unique needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover-elevate" data-testid="service-individual-therapy">
                <CardHeader>
                  <MessageCircle className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Individual Therapy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    One-on-one counseling sessions using evidence-based approaches like CBT, DBT, and psychodynamic therapy to address your personal mental health concerns and goals.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate" data-testid="service-anxiety-therapy">
                <CardHeader>
                  <Brain className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Anxiety Therapy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Specialized treatment for generalized anxiety, panic disorder, social anxiety, and phobias using proven cognitive-behavioral techniques and mindfulness strategies.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate" data-testid="service-depression-therapy">
                <CardHeader>
                  <Heart className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Depression Counseling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Compassionate support for depression, helping you develop coping strategies, improve mood, and rediscover joy and purpose in your life.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate" data-testid="service-trauma-therapy">
                <CardHeader>
                  <Shield className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Trauma & PTSD Therapy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Trauma-focused treatment including EMDR therapy to help you process traumatic experiences, reduce symptoms, and reclaim your sense of safety and well-being.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate" data-testid="service-couples-therapy">
                <CardHeader>
                  <Users className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Couples Counseling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Relationship therapy to improve communication, resolve conflicts, rebuild trust, and strengthen your connection with your partner.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate" data-testid="service-family-therapy">
                <CardHeader>
                  <Heart className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Family Therapy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Family counseling to address conflicts, improve family dynamics, enhance communication, and support healthy relationships among family members.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate" data-testid="service-grief-counseling">
                <CardHeader>
                  <Heart className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Grief & Loss Counseling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Compassionate support through bereavement and loss, helping you process grief, honor your loved one, and find your path forward.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate" data-testid="service-stress-management">
                <CardHeader>
                  <Target className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Stress Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Learn practical skills to manage work stress, life transitions, and daily pressures through mindfulness, relaxation techniques, and healthy coping strategies.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate" data-testid="service-telehealth">
                <CardHeader>
                  <Video className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Telehealth Therapy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Convenient, secure online therapy sessions from the comfort of your home, providing the same quality care as in-person visits with greater flexibility.
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
                  Why Maitland Residents Choose Us
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Maitland families and professionals trust our licensed therapists for compassionate, effective care—just minutes from downtown Maitland, Lake Lily, and I-4.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Award className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Licensed & Experienced</h3>
                      <p className="text-muted-foreground">
                        All our therapists are licensed professionals (LCSW, LMHC, LMFT) with specialized training in evidence-based therapeutic approaches.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Heart className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Compassionate Care</h3>
                      <p className="text-muted-foreground">
                        We provide a safe, non-judgmental space where you can explore your thoughts and feelings with empathy and understanding.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Lightbulb className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Evidence-Based Approaches</h3>
                      <p className="text-muted-foreground">
                        We use proven therapeutic methods including CBT, DBT, EMDR, and psychodynamic therapy tailored to your specific needs.
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
                      <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
                      <p className="text-muted-foreground">
                        Same-week appointments available with evening and weekend hours to accommodate your busy schedule.
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
                      <h3 className="text-xl font-semibold mb-2">In-Person & Online Options</h3>
                      <p className="text-muted-foreground">
                        Choose between in-person sessions at our convenient Winter Park location or secure telehealth appointments from home.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div id="contact-form" className="bg-background border rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-2">Start Your Therapy Journey</h3>
                <p className="text-muted-foreground mb-6">
                  Take the first step toward positive change. Fill out the form below and we'll contact you to schedule your first session.
                </p>
                <ShortContactForm source="Therapist Maitland Page" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4">
                Issues We Help With
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our Maitland therapists provide expert support for a wide range of mental health concerns
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Anxiety Disorders",
                "Depression",
                "Trauma & PTSD",
                "Relationship Issues",
                "Grief & Loss",
                "Stress Management",
                "Life Transitions",
                "Self-Esteem Issues",
                "Anger Management",
                "Eating Disorders",
                "OCD",
                "Panic Disorder",
                "Social Anxiety",
                "Family Conflicts",
                "Work Stress",
                "Identity Issues"
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
                <h3 className="text-lg font-semibold mb-3">What types of therapy do you offer in Maitland?</h3>
                <p className="text-muted-foreground">
                  Our Maitland therapists provide evidence-based therapy including Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), EMDR for trauma, psychodynamic therapy, couples counseling, family therapy, grief counseling, and stress management. We tailor our approach to each client's unique needs and goals.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-background">
                <h3 className="text-lg font-semibold mb-3">How quickly can I see a therapist in Maitland?</h3>
                <p className="text-muted-foreground">
                  Most clients can schedule their first therapy session within the same week. We understand that when you're ready to start therapy, timely access to care is important. Call us at 386-848-8751 to schedule your appointment.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-background">
                <h3 className="text-lg font-semibold mb-3">Do you accept insurance for therapy in Maitland?</h3>
                <p className="text-muted-foreground">
                  Yes. We accept most major insurance plans including Medicare, Medicaid, Blue Cross Blue Shield, Cigna, Aetna, United Healthcare, UMR, and many others. We also offer self-pay options for those without insurance coverage. Contact us to verify your specific plan.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-background">
                <h3 className="text-lg font-semibold mb-3">Do you offer telehealth therapy for Maitland residents?</h3>
                <p className="text-muted-foreground">
                  Yes. We offer secure telehealth therapy sessions for Maitland residents and clients throughout Florida. Virtual therapy provides convenient, flexible access to care from the comfort of your home while maintaining the same quality of treatment as in-person sessions.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-background">
                <h3 className="text-lg font-semibold mb-3">What should I expect in my first therapy session?</h3>
                <p className="text-muted-foreground">
                  Your first session is an opportunity to get to know your therapist and discuss your concerns, goals, and history. Your therapist will ask questions to understand your needs and together you'll develop a personalized treatment plan. First sessions typically last 50-60 minutes and are confidential.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-background">
                <h3 className="text-lg font-semibold mb-3">Are your Maitland therapists licensed?</h3>
                <p className="text-muted-foreground">
                  Yes. All our therapists are licensed mental health professionals in Florida, including Licensed Clinical Social Workers (LCSWs), Licensed Mental Health Counselors (LMHCs), and Licensed Marriage and Family Therapists (LMFTs). They have advanced degrees and specialized training in evidence-based therapeutic approaches.
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
              Ready to Begin Therapy?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Taking the first step toward therapy is an act of courage. Our Maitland therapists are here to support you on your journey to wellness.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                asChild
                data-testid="button-cta-appointment"
              >
                <a href="#contact-form">Schedule First Session</a>
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
      </main>

      <SiteFooter />
    </div>
  );
}
