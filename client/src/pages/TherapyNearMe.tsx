import { Link } from "wouter";
import { Phone, MapPin, Clock, CheckCircle, Star, Calendar, Shield, Award, Heart, Brain, MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { buildBreadcrumbSchema } from "@/lib/structuredData";
import InternalLinkBlock from "@/components/InternalLinkBlock";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackEvent } from "@/lib/analytics";

export default function TherapyNearMe() {
  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Therapy Near Me Page', '386-848-8751');
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness", "HealthAndBeautyBusiness"],
    "name": "Empathy Health Clinic - Therapy Services",
    "description": "Professional therapy services near you in Orlando & Winter Park, FL. Licensed therapists providing CBT, EMDR, DBT, trauma therapy, and more. Same-week appointments available.",
    "url": "https://www.empathyhealthclinic.com/therapy-near-me",
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
      { "@type": "City", "name": "Orlando", "containedInPlace": { "@type": "State", "name": "Florida" } },
      { "@type": "City", "name": "Winter Park" },
      { "@type": "City", "name": "Maitland" },
      { "@type": "City", "name": "Altamonte Springs" },
      { "@type": "City", "name": "Casselberry" },
      { "@type": "City", "name": "Lake Mary" },
      { "@type": "City", "name": "Longwood" },
      { "@type": "City", "name": "Sanford" }
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
      { "@type": "MedicalTherapy", "name": "Cognitive Behavioral Therapy (CBT)", "description": "Evidence-based therapy for anxiety, depression, and behavioral issues" },
      { "@type": "MedicalTherapy", "name": "EMDR Therapy", "description": "Specialized trauma treatment using eye movement desensitization" },
      { "@type": "MedicalTherapy", "name": "Individual Therapy", "description": "One-on-one therapy sessions tailored to your needs" },
      { "@type": "MedicalTherapy", "name": "Couples Therapy", "description": "Relationship counseling for couples" }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5"
    },
    "hasCredential": [
      { "@type": "EducationalOccupationalCredential", "credentialCategory": "LMHC" },
      { "@type": "EducationalOccupationalCredential", "credentialCategory": "LCSW" }
    ]
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

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "https://www.empathyhealthclinic.com" },
    { name: "Services", url: "https://www.empathyhealthclinic.com/services" },
    { name: "Therapy Near Me", url: "https://www.empathyhealthclinic.com/therapy-near-me" }
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Therapy Near Me | Orlando & Winter Park FL | Same-Week Appointments"
        description="Looking for therapy near me? Our licensed Orlando and Winter Park therapists offer same-week appointments, in-person and telehealth therapy. Most insurance accepted. Call 386-848-8751."
        keywords={["therapy near me", "therapy near me orlando", "therapy services near me", "find therapy near me", "therapy orlando", "therapy winter park", "cbt therapy near me", "emdr therapy near me", "trauma therapy near me", "couples therapy near me", "individual therapy near me", "affordable therapy near me"]}
        canonicalPath="/therapy-near-me"
        jsonLd={[jsonLd, faqSchema, breadcrumbSchema]}
      />
      <SiteHeader />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-[#1a3a2f] text-white py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a2f] via-[#2d5a47] to-[#1a3a2f] opacity-90" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-[#E48F66]">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="font-medium">4.8★ Rating from 120+ Patients</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Therapy Near Me in Orlando & Winter Park
                </h1>
                
                {/* SEO Intro Paragraph - Keyword in first sentence */}
                <p className="text-xl text-gray-200 max-w-xl">
                  <strong>If you're searching for "therapy near me,"</strong> our licensed Orlando and Winter Park therapists provide <strong>same-week appointments</strong> with in-person and telehealth options covered by most insurance plans. We offer evidence-based care for anxiety, depression, trauma, and life challenges—right here in Central Florida.
                </p>

                {/* Why Choose Us - Quick Trust Signals */}
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <h2 className="text-lg font-semibold mb-4 text-[#E48F66]">Why Choose Our Local Therapy Services</h2>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#E48F66] flex-shrink-0" />
                      <span>Same-week appointments available</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#E48F66] flex-shrink-0" />
                      <span>Licensed LMHC & LCSW therapists</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#E48F66] flex-shrink-0" />
                      <span>In-person & telehealth therapy</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#E48F66] flex-shrink-0" />
                      <span>Most insurance accepted (BCBS, Aetna, Cigna, UHC, Medicare)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#E48F66] flex-shrink-0" />
                      <span>Convenient Winter Park / Orlando location</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a href="tel:386-848-8751" onClick={handlePhoneClick}>
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
              </div>

              {/* Lead Capture Form */}
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Therapy Near You</h2>
                <p className="text-gray-600 mb-6">Request an appointment with our therapy team today. Same-week availability.</p>
                <LeadCaptureForm therapyName="Therapy Near Me" />
              </div>
            </div>
          </div>
        </section>

        {/* Location Block - MANDATORY for local search */}
        <section className="bg-[#2E5E4E] text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <MapPin className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Our Therapy Location Near You</h3>
                  <p className="text-white/90">1155 Louisiana Ave Suite 202</p>
                  <p className="text-white/90">Winter Park, FL 32789</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <Phone className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Schedule Therapy</h3>
                  <a href="tel:386-848-8751" onClick={handlePhoneClick} className="text-[#E48F66] hover:underline text-xl font-bold" data-testid="link-phone-location">
                    386-848-8751
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <Clock className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Hours</h3>
                  <p className="text-white/90">Mon - Fri: 9AM - 5PM</p>
                  <p className="text-white/70 text-sm">Evening telehealth available</p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-center text-white/80">
                <strong>Serving:</strong> Orlando, Winter Park, Maitland, Altamonte Springs, Casselberry, Lake Mary, Longwood, Sanford, and surrounding areas
              </p>
            </div>
          </div>
        </section>

        {/* Insurance Section - Above the Fold Importance */}
        <section className="py-10 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Insurance Accepted</h2>
              <div className="flex flex-wrap justify-center gap-3 mb-4">
                {["Blue Cross Blue Shield", "Aetna", "Cigna", "UnitedHealthcare", "Optum", "AdventHealth", "Medicare"].map((insurance) => (
                  <span key={insurance} className="px-4 py-2 bg-[#2E5E4E]/10 text-[#2E5E4E] rounded-full text-sm font-medium">
                    {insurance}
                  </span>
                ))}
              </div>
              <p className="text-gray-700">
                Your copay is typically <strong>$20–$50 per session</strong> depending on your plan.<br />
                We verify benefits before your appointment so you know exactly what to expect.
              </p>
              <Link href="/insurance" className="inline-flex items-center gap-1 text-[#E48F66] hover:underline mt-2" data-testid="link-all-insurance">
                View all accepted insurance plans <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="bg-gray-50 py-6">
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
                <span>120+ 5-Star Reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#2E5E4E]" />
                <span>Same-Week Availability</span>
              </div>
            </div>
          </div>
        </section>

        {/* Therapy Services Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Therapy Services We Offer</h2>
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
              Our therapists specialize in evidence-based treatment for a wide range of mental health concerns:
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                "Anxiety & panic attacks",
                "Depression & mood issues",
                "Trauma & PTSD",
                "Relationship challenges",
                "Grief & loss",
                "Stress & burnout",
                "OCD",
                "Anger management",
                "Self-esteem issues"
              ].map((service) => (
                <div key={service} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-[#2E5E4E] flex-shrink-0" />
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet with a Therapist Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Meet with a Therapist Near You</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                      <Brain className="h-6 w-6 text-[#E48F66]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Cognitive Behavioral Therapy (CBT)</h3>
                      <p className="text-gray-600 text-sm">Evidence-based approach to change negative thought patterns and behaviors.</p>
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
                      <h3 className="font-semibold text-lg mb-2">EMDR Therapy for Trauma</h3>
                      <p className="text-gray-600 text-sm">Specialized trauma treatment using eye movement desensitization.</p>
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
                      <h3 className="font-semibold text-lg mb-2">DBT-Informed Therapy</h3>
                      <p className="text-gray-600 text-sm">Skills-based approach for emotional regulation and distress tolerance.</p>
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
                      <h3 className="font-semibold text-lg mb-2">Couples & Marriage Counseling</h3>
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
                      <Calendar className="h-6 w-6 text-[#E48F66]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Online Therapy Anywhere in Florida</h3>
                      <p className="text-gray-600 text-sm">Convenient virtual sessions from home through secure telehealth.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* People Also Search For - Internal Links Block */}
        <section className="py-12 bg-white border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">People Also Search For</h2>
            <div className="space-y-10 max-w-6xl mx-auto">
              <InternalLinkBlock 
                category="services" 
                variant="cards" 
                title="Related Services"
              />
              <InternalLinkBlock 
                category="conditions" 
                variant="cards" 
                title="Conditions We Treat"
              />
              <InternalLinkBlock 
                category="insurance" 
                variant="cards" 
                title="Insurance Accepted"
              />
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                
                {/* Introduction */}
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Find Professional Therapy Near You in Orlando</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Searching for "therapy near me" is the first step toward better mental health. At Empathy Health Clinic, we make finding quality therapy simple and accessible. Our licensed therapists in Orlando and Winter Park provide compassionate, evidence-based treatment to help you overcome life's challenges.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Whether you're dealing with anxiety, depression, trauma, relationship problems, or simply want to improve your overall well-being, we have therapy services tailored to your needs. With same-week appointments and both in-person and telehealth options, getting the help you deserve has never been easier.
                  </p>
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
                  <h2 className="text-2xl font-bold mb-4">Start Therapy Near You</h2>
                  <p className="text-gray-200 mb-2">Same-week appointments. Most insurance accepted.</p>
                  <p className="text-gray-200 mb-6">Take the first step toward better mental health today.</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <a href="tel:386-848-8751" onClick={handlePhoneClick}>
                      <Button size="lg" className="bg-[#E48F66] hover:bg-[#d07d54] text-white" data-testid="button-call-cta">
                        <Phone className="mr-2 h-5 w-5" />
                        Call 386-848-8751
                      </Button>
                    </a>
                    <Link href="/request-appointment">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-book-cta">
                        Book Appointment Online
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Contact */}
                <Card className="bg-[#2E5E4E] text-white">
                  <CardContent className="p-6 text-center">
                    <Phone className="h-8 w-8 mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">Start Therapy Near You</h3>
                    <p className="text-gray-200 text-sm mb-4">Same-week appointments available</p>
                    <a href="tel:386-848-8751" onClick={handlePhoneClick}>
                      <Button className="w-full bg-[#E48F66] hover:bg-[#d07d54] text-white" data-testid="button-call-sidebar">
                        Call 386-848-8751
                      </Button>
                    </a>
                    <Link href="/request-appointment">
                      <Button variant="outline" className="w-full mt-3 border-white text-white hover:bg-white/10" data-testid="button-book-sidebar">
                        Book Online
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Therapy Services Links */}
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

                {/* Location Card */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">Our Location</h3>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-[#2E5E4E] flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">1155 Louisiana Ave Suite 202</p>
                        <p className="text-gray-600">Winter Park, FL 32789</p>
                        <p className="text-sm text-gray-500 mt-2">Near Orlando, easy parking available</p>
                      </div>
                    </div>
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
