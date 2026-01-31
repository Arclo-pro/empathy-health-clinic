import { Link } from "wouter";
import { Phone, MapPin, Clock, CheckCircle, Star, Calendar, Shield, Award, Heart, Users, Brain, MessageCircle } from "lucide-react";
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

export default function CounselingOrlando() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness", "HealthAndBeautyBusiness"],
    "name": "Empathy Health Clinic - Counseling Orlando",
    "description": "Professional counseling services in Orlando, FL. Licensed counselors providing therapy for anxiety, depression, trauma, relationships, and more. Same-week appointments available.",
    "url": "https://www.empathyhealthclinic.com/counseling-orlando",
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
        "name": "Individual Counseling",
        "description": "One-on-one therapy sessions with licensed counselors"
      },
      {
        "@type": "MedicalTherapy",
        "name": "Cognitive Behavioral Therapy",
        "description": "Evidence-based therapy for anxiety and depression"
      },
      {
        "@type": "MedicalTherapy",
        "name": "Trauma Counseling",
        "description": "Specialized therapy for trauma and PTSD"
      }
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "license",
        "name": "Licensed Mental Health Counselor (LMHC)"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "license",
        "name": "Licensed Clinical Social Worker (LCSW)"
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
        "name": "What types of counseling do you offer in Orlando?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer individual counseling, couples counseling, family therapy, and group therapy. Our Orlando counselors specialize in treating anxiety, depression, trauma, PTSD, relationship issues, stress management, grief, and life transitions using evidence-based approaches like CBT, DBT, and EMDR."
        }
      },
      {
        "@type": "Question",
        "name": "How much does counseling cost in Orlando?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Counseling costs vary based on your insurance coverage. We accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, and UnitedHealthcare. Many patients pay only their copay, typically $20-50 per session. We also offer affordable self-pay rates for those without insurance."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can I get a counseling appointment in Orlando?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer same-week appointments for new patients seeking counseling in Orlando. Many patients can be seen within 2-3 days of calling. We understand that when you need help, waiting weeks isn't an option."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer virtual counseling for Orlando residents?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer secure telehealth counseling sessions for Orlando and all Florida residents. Virtual counseling is conducted through a HIPAA-compliant video platform, allowing you to receive professional counseling from the comfort of your home."
        }
      },
      {
        "@type": "Question",
        "name": "What should I expect at my first counseling session?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your first counseling session is an intake appointment where your counselor will learn about your concerns, history, and goals. It's a safe, confidential space to share what's on your mind. Together, you'll develop a personalized treatment plan. Sessions typically last 50-60 minutes."
        }
      },
      {
        "@type": "Question",
        "name": "How do I know if I need counseling?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Consider counseling if you're experiencing persistent sadness or anxiety, difficulty coping with daily life, relationship problems, grief, trauma, or simply want to improve your mental well-being. Counseling is beneficial for anyone seeking personal growth, not just those in crisis."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Counseling Orlando FL | Licensed Counselors Near You"
        description="Professional counseling in Orlando, FL. Licensed counselors for anxiety, depression, trauma, relationships. Same-week appointments. Most insurance accepted. Call 386-848-8751."
        keywords={["counseling orlando", "counseling orlando fl", "orlando counseling", "counseling services orlando", "mental health counseling orlando", "licensed counselor orlando", "therapist orlando", "counseling near me orlando", "professional counseling orlando", "orlando mental health counseling"]}
        canonicalPath="/counseling-orlando"
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
                  Counseling in Orlando, FL
                </h1>
                <p className="text-xl text-gray-200 max-w-xl">
                  Professional counseling services for individuals, couples, and families. Our licensed Orlando counselors help you overcome challenges and build a more fulfilling life.
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
                    <span>Virtual & In-Person</span>
                  </div>
                </div>
              </div>

              {/* Lead Capture Form */}
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Start Your Journey Today</h2>
                <p className="text-gray-600 mb-6">Schedule a counseling appointment with our Orlando team.</p>
                <LeadCaptureForm therapyName="Counseling Orlando" />
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
                <span>Licensed Counselors</span>
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

        {/* Location & Contact Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover-elevate">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 bg-[#2E5E4E]/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-[#2E5E4E]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Orlando Office</h3>
                    <p className="text-gray-600">1155 Louisiana Ave Suite 202</p>
                    <p className="text-gray-600">Winter Park, FL 32789</p>
                    <p className="text-sm text-gray-500 mt-1">Serving Orlando & Central FL</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 bg-[#2E5E4E]/10 rounded-lg">
                    <Phone className="h-6 w-6 text-[#2E5E4E]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Contact Us</h3>
                    <a href="tel:386-848-8751" className="text-[#E48F66] hover:underline font-medium" data-testid="link-phone-contact">
                      386-848-8751
                    </a>
                    <p className="text-gray-600 text-sm mt-1">Call to schedule your appointment</p>
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
                    <p className="text-sm text-gray-500 mt-1">Telehealth available evenings</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Insurance Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-6">Insurance Accepted for Orlando Counseling</h2>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {["Aetna", "Blue Cross Blue Shield", "Cigna", "UnitedHealthcare", "Humana", "Medicare"].map((insurance) => (
                <span key={insurance} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
                  {insurance}
                </span>
              ))}
            </div>
            <p className="text-gray-600">
              Most patients pay only their copay. <Link href="/insurance" className="text-[#E48F66] hover:underline">View all accepted insurance plans</Link>
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Counseling Services in Orlando</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Finding the right counselor in Orlando can feel overwhelming. At Empathy Health Clinic, we make it easy to connect with licensed mental health counselors who truly understand your needs. Our Orlando counseling team provides compassionate, evidence-based therapy to help you navigate life's challenges and achieve lasting positive change.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Whether you're struggling with anxiety, depression, relationship issues, or simply seeking personal growth, our counselors are here to support you. We offer both in-person sessions at our Winter Park location and convenient telehealth appointments for Orlando area residents.
                  </p>
                </div>

                {/* Counseling Services */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Orlando Counseling Services</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="hover-elevate">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                            <Brain className="h-6 w-6 text-[#E48F66]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-2">Individual Counseling</h3>
                            <p className="text-gray-600 text-sm">One-on-one therapy tailored to your unique needs, goals, and challenges.</p>
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
                            <p className="text-gray-600 text-sm">Strengthen your relationship, improve communication, and resolve conflicts.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover-elevate">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                            <Users className="h-6 w-6 text-[#E48F66]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-2">Family Therapy</h3>
                            <p className="text-gray-600 text-sm">Improve family dynamics, communication, and heal together as a unit.</p>
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
                            <h3 className="font-semibold text-lg mb-2">Virtual Counseling</h3>
                            <p className="text-gray-600 text-sm">Convenient telehealth sessions from anywhere in Florida.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Conditions We Treat */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Conditions Our Orlando Counselors Treat</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "Anxiety & Panic Disorders",
                      "Depression",
                      "Trauma & PTSD",
                      "Relationship Issues",
                      "Grief & Loss",
                      "Stress Management",
                      "Life Transitions",
                      "Self-Esteem Issues",
                      "Anger Management",
                      "Work-Life Balance",
                      "Family Conflicts",
                      "Personal Growth"
                    ].map((condition) => (
                      <div key={condition} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-[#2E5E4E] flex-shrink-0" />
                        <span className="text-gray-700">{condition}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Treatment Approaches */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Evidence-Based Counseling Approaches</h2>
                  <p className="text-gray-700 mb-6">
                    Our Orlando counselors are trained in proven therapeutic techniques that help you achieve real, lasting results:
                  </p>
                  <div className="space-y-4">
                    <div className="p-4 border-l-4 border-[#E48F66] bg-gray-50">
                      <h3 className="font-semibold text-lg mb-1">Cognitive Behavioral Therapy (CBT)</h3>
                      <p className="text-gray-600 text-sm">Identify and change negative thought patterns that affect your mood and behavior.</p>
                    </div>
                    <div className="p-4 border-l-4 border-[#E48F66] bg-gray-50">
                      <h3 className="font-semibold text-lg mb-1">EMDR Therapy</h3>
                      <p className="text-gray-600 text-sm">Process and heal from traumatic experiences effectively.</p>
                    </div>
                    <div className="p-4 border-l-4 border-[#E48F66] bg-gray-50">
                      <h3 className="font-semibold text-lg mb-1">Dialectical Behavior Therapy (DBT)</h3>
                      <p className="text-gray-600 text-sm">Build skills for emotional regulation, mindfulness, and interpersonal effectiveness.</p>
                    </div>
                    <div className="p-4 border-l-4 border-[#E48F66] bg-gray-50">
                      <h3 className="font-semibold text-lg mb-1">Solution-Focused Brief Therapy</h3>
                      <p className="text-gray-600 text-sm">Focus on solutions and achieving your goals efficiently.</p>
                    </div>
                  </div>
                </div>

                {/* Why Choose Us */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Our Orlando Counseling Team</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-[#2E5E4E] rounded-full">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Licensed Professionals</h3>
                        <p className="text-gray-600 text-sm">All counselors are fully licensed LMHCs and LCSWs in Florida.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-[#2E5E4E] rounded-full">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Same-Week Appointments</h3>
                        <p className="text-gray-600 text-sm">Don't wait weeks to get help. We prioritize quick access.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-[#2E5E4E] rounded-full">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Insurance Accepted</h3>
                        <p className="text-gray-600 text-sm">We work with most major insurance plans to keep costs low.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-[#2E5E4E] rounded-full">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Convenient Location</h3>
                        <p className="text-gray-600 text-sm">Easy access from Orlando, Winter Park, and surrounding areas.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Areas Served */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Counseling for Greater Orlando</h2>
                  <p className="text-gray-700 mb-4">
                    We provide professional counseling services to residents throughout the Orlando metropolitan area, including:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Orlando", "Winter Park", "Maitland", "Altamonte Springs", "Casselberry", "Longwood", "Lake Mary", "Sanford", "Oviedo", "College Park", "Downtown Orlando", "Baldwin Park"].map((area) => (
                      <span key={area} className="px-3 py-1 bg-[#2E5E4E]/10 text-[#2E5E4E] rounded-full text-sm">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* FAQs */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions About Orlando Counseling</h2>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left">What types of counseling do you offer in Orlando?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        We offer individual counseling, couples counseling, family therapy, and group therapy. Our Orlando counselors specialize in treating anxiety, depression, trauma, PTSD, relationship issues, stress management, grief, and life transitions using evidence-based approaches like CBT, DBT, and EMDR.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left">How much does counseling cost in Orlando?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Counseling costs vary based on your insurance coverage. We accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, and UnitedHealthcare. Many patients pay only their copay, typically $20-50 per session. We also offer affordable self-pay rates for those without insurance.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left">How quickly can I get a counseling appointment in Orlando?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        We offer same-week appointments for new patients seeking counseling in Orlando. Many patients can be seen within 2-3 days of calling. We understand that when you need help, waiting weeks isn't an option.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-left">Do you offer virtual counseling for Orlando residents?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Yes, we offer secure telehealth counseling sessions for Orlando and all Florida residents. Virtual counseling is conducted through a HIPAA-compliant video platform, allowing you to receive professional counseling from the comfort of your home.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-left">What should I expect at my first counseling session?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Your first counseling session is an intake appointment where your counselor will learn about your concerns, history, and goals. It's a safe, confidential space to share what's on your mind. Together, you'll develop a personalized treatment plan. Sessions typically last 50-60 minutes.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                      <AccordionTrigger className="text-left">How do I know if I need counseling?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Consider counseling if you're experiencing persistent sadness or anxiety, difficulty coping with daily life, relationship problems, grief, trauma, or simply want to improve your mental well-being. Counseling is beneficial for anyone seeking personal growth, not just those in crisis.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* CTA Section */}
                <div className="bg-[#1a3a2f] rounded-2xl p-8 text-center text-white">
                  <h2 className="text-2xl font-bold mb-4">Ready to Start Counseling in Orlando?</h2>
                  <p className="text-gray-200 mb-6 max-w-xl mx-auto">
                    Take the first step toward better mental health. Our Orlando counseling team is here to help you thrive.
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
                    <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                    <div className="space-y-2">
                      <Link href="/therapy" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-therapy">
                        Therapy Services
                      </Link>
                      <Link href="/couples-counseling" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-couples">
                        Couples Counseling
                      </Link>
                      <Link href="/anxiety-therapy" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-anxiety">
                        Anxiety Therapy
                      </Link>
                      <Link href="/depression-counseling" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-depression">
                        Depression Counseling
                      </Link>
                      <Link href="/cognitive-behavioral-therapy" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-cbt">
                        CBT Therapy
                      </Link>
                      <Link href="/emdr-therapy" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-emdr">
                        EMDR Therapy
                      </Link>
                      <Link href="/virtual-therapy" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-telehealth">
                        Virtual Counseling
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Insurance Quick Links */}
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
                    <h3 className="font-bold text-lg mb-2">Schedule Today</h3>
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
