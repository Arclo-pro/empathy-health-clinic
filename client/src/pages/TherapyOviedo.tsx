import { Link } from "wouter";
import { Phone, MapPin, Clock, CheckCircle, Star, Calendar, Shield, Award, Heart, Brain, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function TherapyOviedo() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness", "HealthAndBeautyBusiness"],
    "name": "Empathy Health Clinic - Therapy Oviedo",
    "description": "Professional therapy services for Oviedo, FL residents. Licensed therapists providing CBT, EMDR, anxiety treatment, depression counseling, and more. Same-week appointments available.",
    "url": "https://www.empathyhealthclinic.com/therapy-oviedo",
    "telephone": "+1-386-848-8751",
    "email": "info@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1155 Louisiana Ave Suite 202",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32789",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.5997,
      "longitude": -81.3392
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Oviedo",
        "containedInPlace": {
          "@type": "State",
          "name": "Florida"
        }
      },
      {
        "@type": "City",
        "name": "Winter Springs"
      },
      {
        "@type": "City",
        "name": "Geneva"
      },
      {
        "@type": "City",
        "name": "Chuluota"
      }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card", "Insurance"],
    "medicalSpecialty": ["Psychiatry", "Psychology", "Mental Health Counseling"],
    "availableService": [
      {
        "@type": "MedicalTherapy",
        "name": "Individual Therapy",
        "description": "One-on-one therapy sessions with licensed therapists"
      },
      {
        "@type": "MedicalTherapy",
        "name": "Cognitive Behavioral Therapy",
        "description": "Evidence-based therapy for anxiety and depression"
      },
      {
        "@type": "MedicalTherapy",
        "name": "EMDR Therapy",
        "description": "Specialized trauma treatment"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Where is your therapy office for Oviedo residents?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our office is located at 1155 Louisiana Ave Suite 202 in Winter Park, FL - just a short 15-minute drive from Oviedo via FL-417. We also offer convenient telehealth therapy sessions for Oviedo residents who prefer virtual appointments."
        }
      },
      {
        "@type": "Question",
        "name": "What types of therapy do you offer for Oviedo patients?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer comprehensive therapy services including Cognitive Behavioral Therapy (CBT), EMDR for trauma, individual therapy, couples counseling, family therapy, and specialized treatment for anxiety, depression, PTSD, and other mental health conditions."
        }
      },
      {
        "@type": "Question",
        "name": "Do you accept insurance for therapy in Oviedo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, and Humana. Many Oviedo patients pay only their copay for therapy sessions. Contact us to verify your specific coverage."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can I get a therapy appointment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer same-week appointments for new patients from Oviedo and surrounding areas. Many patients can be seen within 2-3 days of calling. We understand that when you need help, waiting weeks isn't an option."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer virtual therapy for Oviedo residents?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer secure telehealth therapy sessions through a HIPAA-compliant video platform. This is a convenient option for Oviedo residents who prefer therapy from the comfort of home or have busy schedules."
        }
      },
      {
        "@type": "Question",
        "name": "What should I expect at my first therapy session?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your first session is an intake appointment where your therapist will learn about your concerns, history, and goals. It's a safe, confidential space to share what you're experiencing. Together, you'll develop a personalized treatment plan. Sessions typically last 50-60 minutes."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Therapy Oviedo FL | Therapist Near Oviedo | Same-Week"
        description="Therapy for Oviedo, FL residents. Licensed therapists for anxiety, depression, trauma, couples counseling. In-person & telehealth. Same-week appointments. Call 386-848-8751."
        keywords={["therapy oviedo", "therapy oviedo fl", "therapist oviedo", "therapist oviedo fl", "counseling oviedo", "counselor oviedo fl", "mental health oviedo", "anxiety therapist oviedo", "depression counseling oviedo", "couples therapy oviedo"]}
        canonicalPath="/therapy-oviedo"
        jsonLd={[jsonLd, faqSchema]}
      />
      <SiteHeader />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-[#1a3a2f] text-white py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a2f] via-[#2d5a47] to-[#1a3a2f] opacity-90" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-[#E48F66]">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="font-medium">4.8 Rating from 127+ Reviews</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Therapy for Oviedo, FL Residents
                </h1>
                <p className="text-xl text-gray-200 max-w-xl">
                  Professional therapy services for the Oviedo community. Our licensed therapists provide compassionate, evidence-based care for anxiety, depression, trauma, and more.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="tel:386-848-8751">
                    <Button size="lg" className="bg-[#E48F66] hover:bg-[#d07d54] text-white font-semibold px-8" data-testid="button-call-hero">
                      <Phone className="mr-2 h-5 w-5" />
                      Call 386-848-8751
                    </Button>
                  </a>
                  <Link href="/request-appointment">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8" data-testid="button-book-hero">
                      <Calendar className="mr-2 h-5 w-5" />
                      Book Appointment
                    </Button>
                  </Link>
                </div>
                <div className="flex flex-wrap gap-6 pt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#E48F66]" />
                    <span>Same-Week Appointments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#E48F66]" />
                    <span>Most Insurance Accepted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#E48F66]" />
                    <span>15 Min from Oviedo</span>
                  </div>
                </div>
              </div>

              {/* Lead Capture Form */}
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Start Therapy Today</h2>
                <p className="text-gray-600 mb-6">Request an appointment - we serve Oviedo residents.</p>
                <LeadCaptureForm therapyName="Therapy Oviedo" />
              </div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="bg-white border-b py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#2E5E4E]" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-[#2E5E4E]" />
                <span>Licensed Therapists</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-[#2E5E4E]" />
                <span>127+ 5-Star Reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#2E5E4E]" />
                <span>Same-Week Availability</span>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover-elevate">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 bg-[#2E5E4E]/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-[#2E5E4E]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Office Location</h3>
                    <p className="text-gray-600">1155 Louisiana Ave Suite 202</p>
                    <p className="text-gray-600">Winter Park, FL 32789</p>
                    <p className="text-sm text-gray-500 mt-1">15 min from Oviedo via FL-417</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 bg-[#2E5E4E]/10 rounded-lg">
                    <Phone className="h-6 w-6 text-[#2E5E4E]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Schedule Today</h3>
                    <a href="tel:386-848-8751" className="text-[#E48F66] hover:underline font-medium" data-testid="link-phone-contact">
                      386-848-8751
                    </a>
                    <p className="text-gray-600 text-sm mt-1">Call to book your appointment</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 bg-[#2E5E4E]/10 rounded-lg">
                    <Clock className="h-6 w-6 text-[#2E5E4E]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Office Hours</h3>
                    <p className="text-gray-600">Monday - Friday</p>
                    <p className="text-gray-600">9:00 AM - 5:00 PM</p>
                    <p className="text-sm text-gray-500 mt-1">Telehealth evenings available</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Insurance Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-6">Insurance Accepted for Oviedo Patients</h2>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {["Aetna", "Blue Cross Blue Shield", "Cigna", "UnitedHealthcare", "Humana", "Medicare"].map((insurance) => (
                <span key={insurance} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
                  {insurance}
                </span>
              ))}
            </div>
            <p className="text-gray-600">
              Most patients pay only their copay. <Link href="/insurance" className="text-[#E48F66] hover:underline">View all accepted insurance</Link>
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                
                {/* Introduction */}
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Therapy Services for Oviedo Residents</h2>
                  <p className="text-gray-700 leading-relaxed">
                    If you're searching for therapy in Oviedo, FL, Empathy Health Clinic is here to help. Our Winter Park office is conveniently located just 15 minutes from Oviedo, and we also offer telehealth sessions for those who prefer virtual appointments.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Our licensed therapists understand the unique needs of the Oviedo community. Whether you're dealing with stress from work, relationship challenges, anxiety, depression, or past trauma, we provide personalized, evidence-based therapy to help you feel better and live more fully.
                  </p>
                </div>

                {/* Therapy Services */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Therapy Services for Oviedo</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="hover-elevate">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                            <Brain className="h-6 w-6 text-[#E48F66]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-2">Individual Therapy</h3>
                            <p className="text-gray-600 text-sm">One-on-one sessions tailored to your unique needs and goals.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover-elevate">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                            <Sparkles className="h-6 w-6 text-[#E48F66]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-2">Anxiety & Depression</h3>
                            <p className="text-gray-600 text-sm">Evidence-based treatment for anxiety disorders and depression.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover-elevate">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                            <Shield className="h-6 w-6 text-[#E48F66]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-2">Trauma & PTSD</h3>
                            <p className="text-gray-600 text-sm">Specialized EMDR and trauma-focused therapy for healing.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover-elevate">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                            <Heart className="h-6 w-6 text-[#E48F66]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-2">Couples Counseling</h3>
                            <p className="text-gray-600 text-sm">Strengthen relationships and improve communication.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover-elevate">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                            <Brain className="h-6 w-6 text-[#E48F66]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-2">CBT Therapy</h3>
                            <p className="text-gray-600 text-sm">Change negative thought patterns with cognitive behavioral therapy.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover-elevate">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                            <MessageCircle className="h-6 w-6 text-[#E48F66]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-2">Telehealth Therapy</h3>
                            <p className="text-gray-600 text-sm">Convenient virtual sessions from anywhere in Oviedo.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Conditions We Treat */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Conditions We Treat for Oviedo Patients</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "Anxiety & Panic Attacks",
                      "Depression",
                      "PTSD & Trauma",
                      "Relationship Issues",
                      "Grief & Loss",
                      "Stress & Burnout",
                      "OCD",
                      "Life Transitions",
                      "Self-Esteem Issues",
                      "Anger Management",
                      "Work Stress",
                      "Family Conflicts"
                    ].map((condition) => (
                      <div key={condition} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-[#2E5E4E] flex-shrink-0" />
                        <span className="text-gray-700">{condition}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why Choose Us */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Oviedo Residents Choose Us</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-[#2E5E4E] rounded-full">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Convenient Location</h3>
                        <p className="text-gray-600 text-sm">Just 15 minutes from Oviedo via FL-417.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-[#2E5E4E] rounded-full">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Same-Week Appointments</h3>
                        <p className="text-gray-600 text-sm">Get help when you need it, not weeks later.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-[#2E5E4E] rounded-full">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Telehealth Available</h3>
                        <p className="text-gray-600 text-sm">Virtual therapy from the comfort of your Oviedo home.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-[#2E5E4E] rounded-full">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Insurance Accepted</h3>
                        <p className="text-gray-600 text-sm">We work with most major insurance plans.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Areas Near Oviedo */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Serving Oviedo & Nearby Communities</h2>
                  <p className="text-gray-700 mb-4">
                    We provide therapy services to residents throughout Oviedo and surrounding Seminole County areas:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Oviedo", "Winter Springs", "Geneva", "Chuluota", "Alafaya", "UCF Area", "Waterford Lakes", "Tuskawilla", "Casselberry", "Winter Park", "Maitland", "Sanford"].map((area) => (
                      <span key={area} className="px-3 py-1 bg-[#2E5E4E]/10 text-[#2E5E4E] rounded-full text-sm">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* FAQs */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions - Therapy in Oviedo</h2>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left">Where is your therapy office for Oviedo residents?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Our office is located at 1155 Louisiana Ave Suite 202 in Winter Park, FL - just a short 15-minute drive from Oviedo via FL-417. We also offer convenient telehealth therapy sessions for Oviedo residents who prefer virtual appointments.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left">What types of therapy do you offer for Oviedo patients?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        We offer comprehensive therapy services including Cognitive Behavioral Therapy (CBT), EMDR for trauma, individual therapy, couples counseling, family therapy, and specialized treatment for anxiety, depression, PTSD, and other mental health conditions.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left">Do you accept insurance for therapy in Oviedo?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Yes, we accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, and Humana. Many Oviedo patients pay only their copay for therapy sessions. Contact us to verify your specific coverage.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-left">How quickly can I get a therapy appointment?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        We offer same-week appointments for new patients from Oviedo and surrounding areas. Many patients can be seen within 2-3 days of calling. We understand that when you need help, waiting weeks isn't an option.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-left">Do you offer virtual therapy for Oviedo residents?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Yes, we offer secure telehealth therapy sessions through a HIPAA-compliant video platform. This is a convenient option for Oviedo residents who prefer therapy from the comfort of home or have busy schedules.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                      <AccordionTrigger className="text-left">What should I expect at my first therapy session?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Your first session is an intake appointment where your therapist will learn about your concerns, history, and goals. It's a safe, confidential space to share what you're experiencing. Together, you'll develop a personalized treatment plan. Sessions typically last 50-60 minutes.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* CTA Section */}
                <div className="bg-[#1a3a2f] rounded-2xl p-8 text-center text-white">
                  <h2 className="text-2xl font-bold mb-4">Ready to Start Therapy in Oviedo?</h2>
                  <p className="text-gray-200 mb-6 max-w-xl mx-auto">
                    Take the first step toward better mental health. Our therapy team is ready to help Oviedo residents thrive.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <a href="tel:386-848-8751">
                      <Button size="lg" className="bg-[#E48F66] hover:bg-[#d07d54] text-white" data-testid="button-call-cta">
                        <Phone className="mr-2 h-5 w-5" />
                        Call 386-848-8751
                      </Button>
                    </a>
                    <Link href="/request-appointment">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-book-cta">
                        Book Online
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Links */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">Therapy Services</h3>
                    <div className="space-y-2">
                      <Link href="/therapy" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-therapy">
                        All Therapy Services
                      </Link>
                      <Link href="/cognitive-behavioral-therapy" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-cbt">
                        CBT Therapy
                      </Link>
                      <Link href="/emdr-therapy" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-emdr">
                        EMDR Therapy
                      </Link>
                      <Link href="/couples-counseling" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-couples">
                        Couples Therapy
                      </Link>
                      <Link href="/anxiety-therapy" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-anxiety">
                        Anxiety Therapy
                      </Link>
                      <Link href="/depression-counseling" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-depression">
                        Depression Counseling
                      </Link>
                      <Link href="/virtual-therapy" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-virtual">
                        Telehealth Therapy
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Insurance Links */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">Insurance Information</h3>
                    <div className="space-y-2">
                      <Link href="/aetna-mental-health-coverage" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-aetna">
                        Aetna Coverage
                      </Link>
                      <Link href="/bcbs-mental-health-coverage" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-bcbs">
                        BCBS Coverage
                      </Link>
                      <Link href="/cigna-mental-health-coverage" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-cigna">
                        Cigna Coverage
                      </Link>
                      <Link href="/insurance" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-insurance">
                        All Insurance Plans
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Card */}
                <Card className="bg-[#2E5E4E] text-white">
                  <CardContent className="p-6 text-center">
                    <Phone className="h-8 w-8 mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">Oviedo Therapy</h3>
                    <p className="text-gray-200 text-sm mb-4">Same-week appointments available</p>
                    <a href="tel:386-848-8751">
                      <Button className="w-full bg-[#E48F66] hover:bg-[#d07d54] text-white" data-testid="button-call-sidebar">
                        Call 386-848-8751
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
