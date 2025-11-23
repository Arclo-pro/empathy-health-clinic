import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Shield, 
  Users, 
  Brain, 
  CheckCircle, 
  Award,
  Clock,
  Target,
  Phone,
  Stethoscope,
  BookOpen,
  UserCheck
} from "lucide-react";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import InsuranceSection from "@/components/InsuranceSection";
import ShortContactForm from "@/components/ShortContactForm";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import { trackEvent } from "@/lib/analytics";

export default function BlackPsychiatristOrlando() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://empathyhealthclinic.com/#website",
        "url": "https://empathyhealthclinic.com/",
        "name": "Empathy Health Clinic",
        "description": "Mental Health & Psychiatry Services in Orlando",
        "publisher": {
          "@id": "https://empathyhealthclinic.com/#organization"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://empathyhealthclinic.com/black-psychiatrist-orlando#webpage",
        "url": "https://empathyhealthclinic.com/black-psychiatrist-orlando",
        "name": "Black Psychiatrist Orlando | Culturally Competent Mental Health Care",
        "isPartOf": {
          "@id": "https://empathyhealthclinic.com/#website"
        },
        "about": {
          "@id": "https://empathyhealthclinic.com/#organization"
        },
        "description": "Find a culturally competent Black psychiatrist in Orlando. Board-certified psychiatrists providing mental health care with understanding of cultural experiences, racial trauma, and community-specific needs."
      },
      {
        "@type": ["Physician", "MedicalBusiness"],
        "@id": "https://empathyhealthclinic.com/#organization",
        "name": "Empathy Health Clinic",
        "image": "https://empathyhealthclinic.com/logo.png",
        "url": "https://empathyhealthclinic.com/black-psychiatrist-orlando",
        "telephone": "+1-386-848-8751",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "1000 W Broadway St Suite 103",
          "addressLocality": "Oviedo",
          "addressRegion": "FL",
          "postalCode": "32765",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.6697,
          "longitude": -81.2084
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "18:00"
          }
        ],
        "sameAs": [
          "https://www.facebook.com/empathyhealthclinic",
          "https://www.instagram.com/empathyhealthclinic"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "127"
        },
        "medicalSpecialty": ["Psychiatry", "Mental Health", "Cultural Psychiatry"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Culturally Competent Psychiatry Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalTherapy",
                "name": "Culturally Competent Psychiatric Care",
                "description": "Mental health treatment with understanding of African American cultural experiences and community needs"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalTherapy",
                "name": "Racial Trauma Treatment",
                "description": "Specialized care for race-based stress and trauma with culturally informed approaches"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalTherapy",
                "name": "Medication Management",
                "description": "Psychiatric medication management with consideration of cultural factors and community health disparities"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalTherapy",
                "name": "Depression & Anxiety Treatment",
                "description": "Evidence-based treatment for depression and anxiety in the Black community"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalTherapy",
                "name": "ADHD Evaluation & Treatment",
                "description": "Comprehensive ADHD assessment and treatment with cultural competency"
              }
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Why is it important to see a Black psychiatrist?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A Black psychiatrist brings lived experience and cultural understanding that can be crucial for effective mental health care. They understand the unique stressors facing the Black community, including systemic racism, microaggressions, and intergenerational trauma. This cultural competency allows for more accurate diagnosis, better rapport, and treatment approaches that honor your cultural identity and experiences."
            }
          },
          {
            "@type": "Question",
            "name": "Do you have Black psychiatrists on staff?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our practice is committed to providing culturally competent mental health care for the Black community in Orlando. We work with board-certified psychiatrists who have specialized training in cultural psychiatry and understand the mental health needs of African American patients. Contact us to discuss your specific preferences and we'll match you with a provider who best meets your needs."
            }
          },
          {
            "@type": "Question",
            "name": "What is racial trauma and how is it treated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Racial trauma refers to the psychological and emotional injury caused by experiences of racism, discrimination, and microaggressions. Symptoms can include anxiety, depression, hypervigilance, and PTSD-like responses. Treatment involves trauma-informed care that acknowledges these experiences, validates your reality, and uses evidence-based approaches like CBT, EMDR, and culturally adapted therapies to process and heal from race-based stress."
            }
          },
          {
            "@type": "Question",
            "name": "How do you address mental health stigma in the Black community?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We understand that mental health stigma is particularly strong in many Black communities due to historical trauma, medical mistrust, and cultural beliefs about strength and resilience. Our culturally competent approach respects these concerns while providing a safe, confidential space to address mental health. We emphasize that seeking help is a sign of strength, and we work to build trust through transparency, respect, and understanding of cultural values."
            }
          },
          {
            "@type": "Question",
            "name": "Do you accept insurance for psychiatric services?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We accept most major insurance plans including Medicaid, Medicare, and private insurance. We believe mental health care should be accessible to everyone and will work with you to verify coverage and maximize your benefits. We also offer self-pay options with competitive rates for those without insurance."
            }
          },
          {
            "@type": "Question",
            "name": "What conditions do you treat?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We provide comprehensive psychiatric care for depression, anxiety disorders, PTSD and trauma, ADHD, bipolar disorder, grief and loss, stress-related disorders, and race-based traumatic stress. We use evidence-based treatments including medication management, psychotherapy, and culturally adapted interventions tailored to your unique needs."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer telehealth appointments?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We offer secure telehealth appointments that allow you to receive care from the comfort and privacy of your home. This can be especially helpful for those with transportation challenges, busy schedules, or who prefer the convenience of virtual visits. Both in-person and telehealth appointments provide the same high-quality, culturally competent care."
            }
          },
          {
            "@type": "Question",
            "name": "How quickly can I get an appointment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We understand that mental health concerns require timely attention. We typically offer appointments within the same week, with urgent cases seen even sooner. When you call, we'll assess your needs and schedule you as quickly as possible with a psychiatrist who can provide culturally competent care."
            }
          },
          {
            "@type": "Question",
            "name": "What makes your practice culturally competent?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our psychiatrists receive ongoing training in cultural competency and understand the unique mental health challenges facing the Black community. We recognize the impact of systemic racism, acknowledge historical medical trauma, and create a safe space where your cultural identity is respected and valued. We use evidence-based treatments adapted to honor your cultural background and life experiences."
            }
          },
          {
            "@type": "Question",
            "name": "How do you handle medication management for Black patients?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We take a culturally informed approach to medication management, considering factors like genetic variations in medication metabolism that can affect African Americans differently, potential health disparities, and cultural beliefs about medication. We provide thorough education about medications, involve you in all treatment decisions, and monitor your response closely to ensure safe, effective treatment tailored to your individual needs."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <SEOHead
        title="Black Psychiatrist Orlando | Culturally Competent Mental Health Care"
        description="Find a culturally competent Black psychiatrist in Orlando. Board-certified psychiatrists providing mental health care with understanding of cultural experiences, racial trauma, and community-specific needs. Same-week appointments available."
        keywords={[
          "black psychiatrist Orlando",
          "African American psychiatrist Orlando",
          "black mental health Orlando",
          "culturally competent psychiatrist Orlando",
          "black therapist Orlando",
          "racial trauma treatment Orlando",
          "black doctor Orlando mental health"
        ]}
        canonicalPath="/black-psychiatrist-orlando"
        jsonLd={jsonLd}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 via-background to-background border-b">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Award className="w-4 h-4" />
                Culturally Competent Mental Health Care
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Black Psychiatrist in Orlando
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Board-certified psychiatrists providing culturally competent mental health care with understanding of your unique experiences, cultural background, and community needs.
              </p>

              <div className="flex flex-wrap gap-4 justify-center mb-12">
                <Button 
                  size="lg" 
                  onClick={() => {
                    trackEvent('black_psychiatrist_orlando_hero_cta', { location: 'hero_section' });
                    const element = document.getElementById('contact-form');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  data-testid="button-hero-cta"
                  className="text-lg px-8"
                >
                  Schedule Appointment
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  asChild
                  data-testid="button-hero-call"
                  className="text-lg px-8"
                >
                  <a 
                    href="tel:+13868488751"
                    onClick={() => trackEvent('phone_click', { location: 'hero_black_psychiatrist_orlando' })}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    (386) 848-8751
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 justify-center text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Same-Week Appointments</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Cultural Competency</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Insurance Accepted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Telehealth Available</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <VerifiedOnBadge variant="compact" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-5 h-5 text-primary" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="w-5 h-5 text-primary" />
                <span>Board Certified</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-5 h-5 text-primary" />
                <span>Serving Orlando Community</span>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Why Cultural Competency Matters */}
              <section>
                <h2 className="text-3xl font-bold mb-6">Why Culturally Competent Mental Health Care Matters</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                  <p>
                    Mental health care is most effective when your provider understands your cultural background, lived experiences, and the unique challenges you face. For Black individuals in Orlando, finding a psychiatrist who brings cultural competency can make a significant difference in diagnosis accuracy, treatment effectiveness, and overall comfort in therapy.
                  </p>
                  <p>
                    Our psychiatrists understand the impact of systemic racism, microaggressions, and intergenerational trauma on mental health. We recognize that your experiences as a Black person in America shape your mental health needs, and we provide care that acknowledges and addresses these realities rather than dismissing them.
                  </p>
                  <p>
                    We're committed to creating a safe, judgment-free space where you can discuss mental health concerns without fear of stigma or cultural misunderstanding. Whether you're dealing with racial trauma, everyday stress, depression, anxiety, or other mental health challenges, we're here to provide compassionate, evidence-based care that honors your identity and experiences.
                  </p>
                </div>
              </section>

              {/* Specialized Services */}
              <section>
                <h2 className="text-3xl font-bold mb-6">Mental Health Services for the Black Community</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-6 hover-elevate">
                    <Brain className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-3">Racial Trauma Treatment</h3>
                    <p className="text-muted-foreground">
                      Specialized care for race-based stress and trauma using evidence-based approaches that validate your experiences and promote healing.
                    </p>
                  </div>

                  <div className="border rounded-lg p-6 hover-elevate">
                    <Stethoscope className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-3">Medication Management</h3>
                    <p className="text-muted-foreground">
                      Culturally informed psychiatric medication management considering genetic factors and health disparities affecting African Americans.
                    </p>
                  </div>

                  <div className="border rounded-lg p-6 hover-elevate">
                    <Heart className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-3">Depression & Anxiety Care</h3>
                    <p className="text-muted-foreground">
                      Comprehensive treatment for depression and anxiety with understanding of cultural factors and community-specific stressors.
                    </p>
                  </div>

                  <div className="border rounded-lg p-6 hover-elevate">
                    <Target className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-3">ADHD Evaluation</h3>
                    <p className="text-muted-foreground">
                      Thorough ADHD assessment and treatment addressing diagnostic disparities in the Black community.
                    </p>
                  </div>

                  <div className="border rounded-lg p-6 hover-elevate">
                    <Shield className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-3">PTSD & Trauma Care</h3>
                    <p className="text-muted-foreground">
                      Trauma-informed treatment for PTSD, including race-based traumatic stress and historical trauma.
                    </p>
                  </div>

                  <div className="border rounded-lg p-6 hover-elevate">
                    <BookOpen className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-3">Stress Management</h3>
                    <p className="text-muted-foreground">
                      Tools and strategies for managing everyday stress, work-related pressures, and unique cultural stressors.
                    </p>
                  </div>
                </div>
              </section>

              {/* Our Approach */}
              <section>
                <h2 className="text-3xl font-bold mb-6">Our Culturally Competent Approach</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserCheck className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Cultural Understanding</h3>
                      <p className="text-muted-foreground">
                        We recognize and validate the unique mental health challenges facing the Black community, including systemic racism, microaggressions, and cultural pressures. Your experiences are real, and we're here to help you navigate them.
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
                      <h3 className="text-xl font-semibold mb-2">Safe, Judgment-Free Space</h3>
                      <p className="text-muted-foreground">
                        We understand mental health stigma in the Black community and work to create an environment where you feel comfortable seeking help. Everything discussed is confidential and handled with cultural sensitivity.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Brain className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Evidence-Based Treatment</h3>
                      <p className="text-muted-foreground">
                        We use proven psychiatric treatments adapted to honor your cultural identity, including medication management, therapy, and holistic approaches that respect community values and beliefs.
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
                      <h3 className="text-xl font-semibold mb-2">Whole-Person Care</h3>
                      <p className="text-muted-foreground">
                        We consider the intersection of your mental health with physical health, spirituality, family dynamics, and community connections, providing comprehensive care that addresses all aspects of your wellbeing.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Mid-page CTA */}
              <section className="bg-primary/5 border rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to Start Your Mental Health Journey?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Take the first step toward better mental health with culturally competent psychiatric care. Same-week appointments available.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button 
                    size="lg"
                    onClick={() => {
                      trackEvent('black_psychiatrist_orlando_mid_cta', { location: 'mid_page' });
                      const element = document.getElementById('contact-form');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    data-testid="button-mid-cta"
                  >
                    Schedule Now
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    asChild
                    data-testid="button-mid-call"
                  >
                    <a 
                      href="tel:+13868488751"
                      onClick={() => trackEvent('phone_click', { location: 'mid_cta_black_psychiatrist_orlando' })}
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      (386) 848-8751
                    </a>
                  </Button>
                </div>
              </section>

              {/* Why Choose Us */}
              <section>
                <h2 className="text-3xl font-bold mb-6">Why Choose Empathy Health Clinic</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Board-Certified Psychiatrists</h3>
                      <p className="text-muted-foreground text-sm">
                        Our psychiatrists are fully licensed with specialized training in cultural competency and mental health disparities.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Community Understanding</h3>
                      <p className="text-muted-foreground text-sm">
                        Deep understanding of the Orlando Black community's unique needs, challenges, and cultural strengths.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Accessible Care</h3>
                      <p className="text-muted-foreground text-sm">
                        Same-week appointments, telehealth options, and acceptance of most insurance plans including Medicaid and Medicare.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Comprehensive Services</h3>
                      <p className="text-muted-foreground text-sm">
                        Full range of psychiatric services from evaluation to ongoing medication management and therapy.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section>
                <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <details className="border rounded-lg p-6 hover-elevate group" data-testid="faq-why-black-psychiatrist">
                    <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                      Why is it important to see a Black psychiatrist?
                      <span className="text-primary ml-2">+</span>
                    </summary>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      A Black psychiatrist brings lived experience and cultural understanding that can be crucial for effective mental health care. They understand the unique stressors facing the Black community, including systemic racism, microaggressions, and intergenerational trauma. This cultural competency allows for more accurate diagnosis, better rapport, and treatment approaches that honor your cultural identity and experiences.
                    </p>
                  </details>

                  <details className="border rounded-lg p-6 hover-elevate group" data-testid="faq-staff">
                    <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                      Do you have Black psychiatrists on staff?
                      <span className="text-primary ml-2">+</span>
                    </summary>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      Our practice is committed to providing culturally competent mental health care for the Black community in Orlando. We work with board-certified psychiatrists who have specialized training in cultural psychiatry and understand the mental health needs of African American patients. Contact us to discuss your specific preferences and we'll match you with a provider who best meets your needs.
                    </p>
                  </details>

                  <details className="border rounded-lg p-6 hover-elevate group" data-testid="faq-racial-trauma">
                    <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                      What is racial trauma and how is it treated?
                      <span className="text-primary ml-2">+</span>
                    </summary>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      Racial trauma refers to the psychological and emotional injury caused by experiences of racism, discrimination, and microaggressions. Symptoms can include anxiety, depression, hypervigilance, and PTSD-like responses. Treatment involves trauma-informed care that acknowledges these experiences, validates your reality, and uses evidence-based approaches like CBT, EMDR, and culturally adapted therapies to process and heal from race-based stress.
                    </p>
                  </details>

                  <details className="border rounded-lg p-6 hover-elevate group" data-testid="faq-stigma">
                    <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                      How do you address mental health stigma in the Black community?
                      <span className="text-primary ml-2">+</span>
                    </summary>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      We understand that mental health stigma is particularly strong in many Black communities due to historical trauma, medical mistrust, and cultural beliefs about strength and resilience. Our culturally competent approach respects these concerns while providing a safe, confidential space to address mental health. We emphasize that seeking help is a sign of strength, and we work to build trust through transparency, respect, and understanding of cultural values.
                    </p>
                  </details>

                  <details className="border rounded-lg p-6 hover-elevate group" data-testid="faq-insurance">
                    <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                      Do you accept insurance for psychiatric services?
                      <span className="text-primary ml-2">+</span>
                    </summary>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      Yes. We accept most major insurance plans including Medicaid, Medicare, and private insurance. We believe mental health care should be accessible to everyone and will work with you to verify coverage and maximize your benefits. We also offer self-pay options with competitive rates for those without insurance.
                    </p>
                  </details>

                  <details className="border rounded-lg p-6 hover-elevate group" data-testid="faq-conditions">
                    <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                      What conditions do you treat?
                      <span className="text-primary ml-2">+</span>
                    </summary>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      We provide comprehensive psychiatric care for depression, anxiety disorders, PTSD and trauma, ADHD, bipolar disorder, grief and loss, stress-related disorders, and race-based traumatic stress. We use evidence-based treatments including medication management, psychotherapy, and culturally adapted interventions tailored to your unique needs.
                    </p>
                  </details>

                  <details className="border rounded-lg p-6 hover-elevate group" data-testid="faq-telehealth">
                    <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                      Do you offer telehealth appointments?
                      <span className="text-primary ml-2">+</span>
                    </summary>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      Yes. We offer secure telehealth appointments that allow you to receive care from the comfort and privacy of your home. This can be especially helpful for those with transportation challenges, busy schedules, or who prefer the convenience of virtual visits. Both in-person and telehealth appointments provide the same high-quality, culturally competent care.
                    </p>
                  </details>

                  <details className="border rounded-lg p-6 hover-elevate group" data-testid="faq-appointment-time">
                    <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                      How quickly can I get an appointment?
                      <span className="text-primary ml-2">+</span>
                    </summary>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      We understand that mental health concerns require timely attention. We typically offer appointments within the same week, with urgent cases seen even sooner. When you call, we'll assess your needs and schedule you as quickly as possible with a psychiatrist who can provide culturally competent care.
                    </p>
                  </details>

                  <details className="border rounded-lg p-6 hover-elevate group" data-testid="faq-cultural-competency">
                    <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                      What makes your practice culturally competent?
                      <span className="text-primary ml-2">+</span>
                    </summary>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      Our psychiatrists receive ongoing training in cultural competency and understand the unique mental health challenges facing the Black community. We recognize the impact of systemic racism, acknowledge historical medical trauma, and create a safe space where your cultural identity is respected and valued. We use evidence-based treatments adapted to honor your cultural background and life experiences.
                    </p>
                  </details>

                  <details className="border rounded-lg p-6 hover-elevate group" data-testid="faq-medication">
                    <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                      How do you handle medication management for Black patients?
                      <span className="text-primary ml-2">+</span>
                    </summary>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      We take a culturally informed approach to medication management, considering factors like genetic variations in medication metabolism that can affect African Americans differently, potential health disparities, and cultural beliefs about medication. We provide thorough education about medications, involve you in all treatment decisions, and monitor your response closely to ensure safe, effective treatment tailored to your individual needs.
                    </p>
                  </details>
                </div>
              </section>

              {/* Insurance Section */}
              <section id="insurance">
                <InsuranceSection />
              </section>

              {/* Contact Form */}
              <section id="contact-form" className="scroll-mt-20">
                <div className="border rounded-lg p-8 bg-card">
                  <h2 className="text-2xl font-bold mb-4">Schedule Your Appointment</h2>
                  <p className="text-muted-foreground mb-6">
                    Take the first step toward culturally competent mental health care. Fill out the form below and we'll contact you within 24 hours.
                  </p>
                  <ShortContactForm source="black_psychiatrist_orlando_page" />
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                {/* Quick Contact */}
                <div className="border rounded-lg p-6 bg-card">
                  <h3 className="font-semibold text-lg mb-4">Get Help Today</h3>
                  <div className="space-y-4">
                    <Button 
                      className="w-full" 
                      size="lg"
                      asChild
                      data-testid="button-sidebar-call"
                    >
                      <a 
                        href="tel:+13868488751"
                        onClick={() => trackEvent('phone_click', { location: 'sidebar_black_psychiatrist_orlando' })}
                      >
                        <Phone className="w-5 h-5 mr-2" />
                        (386) 848-8751
                      </a>
                    </Button>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        trackEvent('black_psychiatrist_orlando_sidebar_cta', { location: 'sidebar' });
                        const element = document.getElementById('contact-form');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      data-testid="button-sidebar-form"
                    >
                      Request Appointment
                    </Button>
                  </div>
                  <div className="mt-6 pt-6 border-t space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Office Hours</div>
                        <div className="text-muted-foreground">Mon-Fri: 8am-6pm</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Same-Week Appointments</div>
                        <div className="text-muted-foreground">Available for new patients</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Related Services */}
                <div className="border rounded-lg p-6 bg-card">
                  <h3 className="font-semibold text-lg mb-4">Related Services</h3>
                  <div className="space-y-3">
                    <Link href="/psychiatry-clinic-orlando" className="block text-sm text-primary hover:underline" data-testid="link-psychiatry-clinic">
                      → Psychiatry Clinic Orlando
                    </Link>
                    <Link href="/psychiatrist-orlando" className="block text-sm text-primary hover:underline" data-testid="link-psychiatrist">
                      → Psychiatrist Orlando
                    </Link>
                    <Link href="/trauma-specialist-near-me" className="block text-sm text-primary hover:underline" data-testid="link-trauma">
                      → Trauma Specialist
                    </Link>
                    <Link href="/adhd-psychiatrist-orlando" className="block text-sm text-primary hover:underline" data-testid="link-adhd">
                      → ADHD Psychiatrist Orlando
                    </Link>
                    <Link href="/anxiety-psychiatrist-orlando" className="block text-sm text-primary hover:underline" data-testid="link-anxiety">
                      → Anxiety Psychiatrist Orlando
                    </Link>
                    <Link href="/telepsychiatry-orlando" className="block text-sm text-primary hover:underline" data-testid="link-telepsychiatry">
                      → Telepsychiatry Orlando
                    </Link>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="border rounded-lg p-6 bg-card">
                  <h3 className="font-semibold text-lg mb-4">Why Trust Us</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium">Board Certified</div>
                        <div className="text-muted-foreground">Licensed psychiatrists with cultural competency training</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium">HIPAA Compliant</div>
                        <div className="text-muted-foreground">Your privacy is protected</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium">Community Focused</div>
                        <div className="text-muted-foreground">Serving Orlando's diverse communities</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
