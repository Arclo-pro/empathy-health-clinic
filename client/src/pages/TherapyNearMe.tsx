import { Link } from "wouter";
import { Phone, MapPin, Clock, CheckCircle, Star, Calendar, Shield, Award, Heart, Brain, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function TherapyNearMe() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness", "HealthAndBeautyBusiness"],
    "name": "Empathy Health Clinic - Therapy Services",
    "description": "Professional therapy services near you in Orlando & Winter Park, FL. Licensed therapists providing CBT, EMDR, DBT, trauma therapy, and more. Same-week appointments available.",
    "url": "https://empathyhealthclinic.com/therapy-near-me",
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
        "name": "Cognitive Behavioral Therapy (CBT)",
        "description": "Evidence-based therapy for anxiety, depression, and behavioral issues"
      },
      {
        "@type": "MedicalTherapy",
        "name": "EMDR Therapy",
        "description": "Specialized trauma treatment using eye movement desensitization"
      },
      {
        "@type": "MedicalTherapy",
        "name": "Individual Therapy",
        "description": "One-on-one therapy sessions tailored to your needs"
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
        "name": "What types of therapy do you offer near me?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer a comprehensive range of therapy services including Cognitive Behavioral Therapy (CBT), EMDR for trauma, Dialectical Behavior Therapy (DBT), couples therapy, family therapy, and individual therapy. Our licensed therapists specialize in treating anxiety, depression, PTSD, relationship issues, and more."
        }
      },
      {
        "@type": "Question",
        "name": "How do I find therapy near me in Orlando?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Empathy Health Clinic is conveniently located at 1155 Louisiana Ave Suite 202 in Winter Park, serving Orlando and surrounding areas. We also offer telehealth therapy for all Florida residents. Call 386-848-8751 to schedule your first appointment."
        }
      },
      {
        "@type": "Question",
        "name": "How much does therapy cost near me?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Therapy costs depend on your insurance coverage. We accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, and UnitedHealthcare. Many patients only pay their copay ($20-50 per session). We also offer competitive self-pay rates."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get same-day or same-week therapy appointments?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We understand that when you need therapy, you need it soon. We offer same-week appointments for new patients, and many can be seen within 2-3 days. Call us to check current availability."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer online therapy near me?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer secure telehealth therapy sessions through a HIPAA-compliant video platform. Virtual therapy is available to all Florida residents, allowing you to receive professional therapy from home, work, or anywhere with internet access."
        }
      },
      {
        "@type": "Question",
        "name": "How do I know if therapy is right for me?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Therapy can benefit anyone dealing with stress, anxiety, depression, relationship challenges, trauma, life transitions, or anyone seeking personal growth. If you're struggling to cope with daily life or want to improve your mental well-being, therapy can help."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Therapy Near Me | Orlando & Winter Park FL | Same-Week"
        description="Find therapy near you in Orlando & Winter Park, FL. CBT, EMDR, trauma therapy, couples counseling. Licensed therapists, same-week appointments. Call 386-848-8751."
        keywords={["therapy near me", "therapy near me orlando", "therapy services near me", "find therapy near me", "therapy orlando", "therapy winter park", "cbt therapy near me", "emdr therapy near me", "trauma therapy near me", "couples therapy near me", "individual therapy near me", "affordable therapy near me"]}
        canonicalPath="/therapy-near-me"
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
                  Therapy Near Me in Orlando & Winter Park
                </h1>
                <p className="text-xl text-gray-200 max-w-xl">
                  Professional therapy services close to you. Our licensed therapists provide evidence-based treatment for anxiety, depression, trauma, and more with same-week availability.
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
                    <span>In-Person & Telehealth</span>
                  </div>
                </div>
              </div>

              {/* Lead Capture Form */}
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Therapy Near You</h2>
                <p className="text-gray-600 mb-6">Request an appointment with our therapy team today.</p>
                <LeadCaptureForm 
                  source="therapy-near-me-hero"
                  buttonText="Request Appointment"
                />
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
                    <h3 className="font-semibold text-lg mb-1">Therapy Location</h3>
                    <p className="text-gray-600">1155 Louisiana Ave Suite 202</p>
                    <p className="text-gray-600">Winter Park, FL 32789</p>
                    <p className="text-sm text-gray-500 mt-1">Near Orlando, easy parking</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 bg-[#2E5E4E]/10 rounded-lg">
                    <Phone className="h-6 w-6 text-[#2E5E4E]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Schedule Therapy</h3>
                    <a href="tel:386-848-8751" className="text-[#E48F66] hover:underline font-medium" data-testid="link-phone-contact">
                      386-848-8751
                    </a>
                    <p className="text-gray-600 text-sm mt-1">Call to book your session</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 bg-[#2E5E4E]/10 rounded-lg">
                    <Clock className="h-6 w-6 text-[#2E5E4E]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Therapy Hours</h3>
                    <p className="text-gray-600">Monday - Friday</p>
                    <p className="text-gray-600">9:00 AM - 5:00 PM</p>
                    <p className="text-sm text-gray-500 mt-1">Evening telehealth available</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Insurance Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-6">Insurance Accepted for Therapy</h2>
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Find Professional Therapy Near You</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Searching for "therapy near me" is the first step toward better mental health. At Empathy Health Clinic, we make finding quality therapy simple and accessible. Our licensed therapists in Orlando and Winter Park provide compassionate, evidence-based treatment to help you overcome life's challenges.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Whether you're dealing with anxiety, depression, trauma, relationship problems, or simply want to improve your overall well-being, we have therapy services tailored to your needs. With same-week appointments and both in-person and telehealth options, getting the help you deserve has never been easier.
                  </p>
                </div>

                {/* Types of Therapy */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Types of Therapy Available Near You</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="hover-elevate">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                            <Brain className="h-6 w-6 text-[#E48F66]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-2">Cognitive Behavioral Therapy</h3>
                            <p className="text-gray-600 text-sm">Evidence-based therapy to change negative thought patterns and behaviors.</p>
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
                            <h3 className="font-semibold text-lg mb-2">EMDR Therapy</h3>
                            <p className="text-gray-600 text-sm">Specialized trauma treatment using eye movement desensitization.</p>
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
                            <h3 className="font-semibold text-lg mb-2">Couples & Marriage Therapy</h3>
                            <p className="text-gray-600 text-sm">Strengthen relationships, improve communication, resolve conflicts.</p>
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
                            <Shield className="h-6 w-6 text-[#E48F66]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-2">Trauma Therapy</h3>
                            <p className="text-gray-600 text-sm">Specialized treatment for PTSD, childhood trauma, and complex trauma.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover-elevate">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                            <Calendar className="h-6 w-6 text-[#E48F66]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-2">Telehealth Therapy</h3>
                            <p className="text-gray-600 text-sm">Convenient virtual sessions from anywhere in Florida.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* What We Treat */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">What Our Therapy Treats</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "Anxiety & Panic Attacks",
                      "Depression",
                      "PTSD & Trauma",
                      "Relationship Issues",
                      "Grief & Loss",
                      "Stress & Burnout",
                      "OCD",
                      "Phobias",
                      "Self-Esteem Issues",
                      "Life Transitions",
                      "Anger Management",
                      "Work-Related Stress"
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Our Therapy Services</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-[#2E5E4E] rounded-full">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Licensed Therapists</h3>
                        <p className="text-gray-600 text-sm">All therapists are fully licensed LMHCs and LCSWs in Florida.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-[#2E5E4E] rounded-full">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Same-Week Appointments</h3>
                        <p className="text-gray-600 text-sm">Get therapy when you need it, not weeks from now.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-[#2E5E4E] rounded-full">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Evidence-Based Methods</h3>
                        <p className="text-gray-600 text-sm">Proven therapeutic approaches with real results.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-[#2E5E4E] rounded-full">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Convenient Options</h3>
                        <p className="text-gray-600 text-sm">In-person and telehealth therapy to fit your schedule.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Areas Served */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Therapy Near You: Areas We Serve</h2>
                  <p className="text-gray-700 mb-4">
                    We provide therapy services to residents throughout Central Florida:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Orlando", "Winter Park", "Maitland", "Altamonte Springs", "Casselberry", "Longwood", "Lake Mary", "Sanford", "Oviedo", "College Park", "Downtown Orlando", "Baldwin Park", "Dr. Phillips", "Windermere"].map((area) => (
                      <span key={area} className="px-3 py-1 bg-[#2E5E4E]/10 text-[#2E5E4E] rounded-full text-sm">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* FAQs */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions About Therapy Near Me</h2>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left">What types of therapy do you offer near me?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        We offer a comprehensive range of therapy services including Cognitive Behavioral Therapy (CBT), EMDR for trauma, Dialectical Behavior Therapy (DBT), couples therapy, family therapy, and individual therapy. Our licensed therapists specialize in treating anxiety, depression, PTSD, relationship issues, and more.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left">How do I find therapy near me in Orlando?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Empathy Health Clinic is conveniently located at 1155 Louisiana Ave Suite 202 in Winter Park, serving Orlando and surrounding areas. We also offer telehealth therapy for all Florida residents. Call 386-848-8751 to schedule your first appointment.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left">How much does therapy cost near me?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Therapy costs depend on your insurance coverage. We accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, and UnitedHealthcare. Many patients only pay their copay ($20-50 per session). We also offer competitive self-pay rates.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-left">Can I get same-day or same-week therapy appointments?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Yes! We understand that when you need therapy, you need it soon. We offer same-week appointments for new patients, and many can be seen within 2-3 days. Call us to check current availability.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-left">Do you offer online therapy near me?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Yes, we offer secure telehealth therapy sessions through a HIPAA-compliant video platform. Virtual therapy is available to all Florida residents, allowing you to receive professional therapy from home, work, or anywhere with internet access.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                      <AccordionTrigger className="text-left">How do I know if therapy is right for me?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Therapy can benefit anyone dealing with stress, anxiety, depression, relationship challenges, trauma, life transitions, or anyone seeking personal growth. If you're struggling to cope with daily life or want to improve your mental well-being, therapy can help.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* CTA Section */}
                <div className="bg-[#1a3a2f] rounded-2xl p-8 text-center text-white">
                  <h2 className="text-2xl font-bold mb-4">Start Therapy Near You Today</h2>
                  <p className="text-gray-200 mb-6 max-w-xl mx-auto">
                    Take the first step toward better mental health. Our therapy team is ready to help you thrive.
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
                      <Link href="/cognitive-behavioral-therapy" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-cbt">
                        CBT Therapy
                      </Link>
                      <Link href="/emdr-therapy" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-emdr">
                        EMDR Therapy
                      </Link>
                      <Link href="/couples-counseling" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-couples">
                        Couples Therapy
                      </Link>
                      <Link href="/trauma-specialist-near-me" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-trauma">
                        Trauma Therapy
                      </Link>
                      <Link href="/anxiety-therapy" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-anxiety">
                        Anxiety Therapy
                      </Link>
                      <Link href="/depression-counseling" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-depression">
                        Depression Therapy
                      </Link>
                      <Link href="/virtual-therapy" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-telehealth">
                        Telehealth Therapy
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
                    <h3 className="font-bold text-lg mb-2">Find Therapy Today</h3>
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
