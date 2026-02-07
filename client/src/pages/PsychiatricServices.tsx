import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Phone, Clock, MapPin, Shield, Star, Award, Calendar, Brain, Heart, Pill, Video, ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackEvent } from "@/lib/analytics";
import { buildBreadcrumbSchema } from "@/lib/structuredData";
import InternalLinkBlock from "@/components/InternalLinkBlock";

export default function PsychiatricServices() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "https://www.empathyhealthclinic.com" },
    { name: "Services", url: "https://www.empathyhealthclinic.com/services" },
    { name: "Psychiatric Services", url: "https://www.empathyhealthclinic.com/psychiatric-services" }
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MedicalBusiness", "Psychiatrist", "LocalBusiness"],
        "name": "Empathy Health Clinic - Psychiatric Services",
        "description": "Board-certified psychiatrists in Orlando & Winter Park, FL. Comprehensive psychiatric care including medication management, psychiatric evaluations, and mental health treatment. Same-week appointments available.",
        "url": "https://www.empathyhealthclinic.com/psychiatric-services",
        "telephone": "+1-386-848-8751",
        "email": "providers@empathyhealthclinic.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "2281 Lee Rd Suite 102",
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
        "medicalSpecialty": ["Psychiatry", "Mental Health", "Medication Management"],
        "priceRange": "$$",
        "areaServed": [
          { "@type": "City", "name": "Orlando", "containedInPlace": { "@type": "State", "name": "Florida" } },
          { "@type": "City", "name": "Winter Park" },
          { "@type": "City", "name": "Maitland" },
          { "@type": "City", "name": "Altamonte Springs" },
          { "@type": "City", "name": "Lake Mary" },
          { "@type": "City", "name": "Casselberry" }
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "17:00"
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "120",
          "bestRating": "5"
        },
        "hasCredential": [
          { "@type": "EducationalOccupationalCredential", "credentialCategory": "Board Certified Psychiatrist" },
          { "@type": "EducationalOccupationalCredential", "credentialCategory": "PMHNP-BC" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What psychiatric services do you offer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer comprehensive psychiatric services including medication management, psychiatric evaluations, ADHD testing, anxiety and depression treatment, bipolar disorder care, and telepsychiatry. Our board-certified psychiatrists provide personalized care for a wide range of mental health conditions."
            }
          },
          {
            "@type": "Question",
            "name": "How quickly can I get an appointment for psychiatric services?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer same-week appointments for new patients. Most patients can schedule within 3-5 business days. Call 386-848-8751 to check current availability."
            }
          },
          {
            "@type": "Question",
            "name": "What insurance do you accept for psychiatric services?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, UMR, and Medicare. Most patients pay only their copay of $20-50 per session."
            }
          }
        ]
      },
      breadcrumbSchema
    ]
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Psychiatric Services Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Medication Management Orlando | Psychiatrist | 2026"
        description="Medication management Orlando at our psychiatric clinic Orlando. Board-certified psychiatrists with same-week appointments for anxiety, depression, ADHD. BCBS, Aetna, Cigna. Call 386-848-8751."
        keywords={["medication management orlando", "psychiatric clinic orlando", "psychiatric medication management", "medication management near me", "psychiatric services orlando", "psychiatrist medication management", "mental health medication orlando"]}
        canonicalPath="/psychiatric-services"
        jsonLd={jsonLd}
      />
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-[#1a3a2f] text-white py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a2f] via-[#2d5a47] to-[#1a3a2f] opacity-90" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-[#E48F66]">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="font-medium">4.8 Rating from 120+ Patients</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" data-testid="text-page-title">
                  Psychiatric Services in Orlando & Winter Park
                </h1>
                
                {/* SEO Intro Paragraph - Keyword in first sentence */}
                <p className="text-xl text-gray-200 max-w-xl">
                  <strong>If you're looking for psychiatric services near you,</strong> our board-certified psychiatrists provide <strong>same-week appointments</strong> with in-person and telehealth options covered by most major insurance. We offer comprehensive medication management, psychiatric evaluations, and mental health treatment—right here in Central Florida.
                </p>

                {/* Why Choose Us - Quick Trust Signals */}
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <h2 className="text-lg font-semibold mb-4 text-[#E48F66]">Why Choose Our Psychiatric Services</h2>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#E48F66] flex-shrink-0" />
                      <span>Same-week appointments available</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#E48F66] flex-shrink-0" />
                      <span>Board-certified psychiatrists</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#E48F66] flex-shrink-0" />
                      <span>In-person & telepsychiatry options</span>
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule Psychiatric Services</h2>
                <p className="text-gray-600 mb-6">Request an appointment with our psychiatric team. Same-week availability.</p>
                <LeadCaptureForm therapyName="Psychiatric Services" />
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
                  <h3 className="font-bold text-lg">Our Psychiatry Location</h3>
                  <p className="text-white/90">2281 Lee Rd Suite 102</p>
                  <p className="text-white/90">Winter Park, FL 32810</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <Phone className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Schedule Psychiatric Care</h3>
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
                {["Blue Cross Blue Shield", "Aetna", "Cigna", "UnitedHealthcare", "UMR", "Medicare", "Humana"].map((insurance) => (
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
                <Award className="h-5 w-5 text-[#2E5E4E]" />
                <span>Board-Certified Psychiatrists</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#2E5E4E]" />
                <span>HIPAA Compliant</span>
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

        {/* Psychiatric Services We Offer */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Psychiatric Services We Offer</h2>
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
              Our board-certified psychiatrists provide comprehensive mental health care for a wide range of conditions:
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                "Medication management",
                "Psychiatric evaluations",
                "ADHD testing & treatment",
                "Anxiety disorder treatment",
                "Depression treatment",
                "Bipolar disorder care",
                "OCD treatment",
                "PTSD treatment",
                "Telepsychiatry"
              ].map((service) => (
                <div key={service} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-[#2E5E4E] flex-shrink-0" />
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Treatment Options Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Our Psychiatric Care Options</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/services">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                        <Pill className="h-6 w-6 text-[#E48F66]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Medication Management</h3>
                        <p className="text-gray-600 text-sm">Expert psychiatric medication management with personalized treatment plans and ongoing monitoring.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/psychiatric-evaluation">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                        <Award className="h-6 w-6 text-[#E48F66]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Psychiatric Evaluations</h3>
                        <p className="text-gray-600 text-sm">Comprehensive diagnostic assessments to accurately diagnose and develop treatment plans.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/adhd-testing-orlando">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                        <Brain className="h-6 w-6 text-[#E48F66]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">ADHD Testing & Treatment</h3>
                        <p className="text-gray-600 text-sm">Comprehensive ADHD evaluation and medication management for adults and children.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/anxiety-therapy">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                        <Heart className="h-6 w-6 text-[#E48F66]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Anxiety Treatment</h3>
                        <p className="text-gray-600 text-sm">Evidence-based treatment for generalized anxiety, panic disorder, and social anxiety.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/depression-treatment">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                        <Shield className="h-6 w-6 text-[#E48F66]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Depression Treatment</h3>
                        <p className="text-gray-600 text-sm">Personalized medication management for major depression and mood disorders.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/virtual-therapy">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                        <Video className="h-6 w-6 text-[#E48F66]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Telepsychiatry</h3>
                        <p className="text-gray-600 text-sm">Convenient virtual psychiatric appointments from anywhere in Florida.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* People Also Search For - Internal Links Block */}
        <section className="py-12 bg-white border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">People Also Search For</h2>
            <div className="space-y-8 max-w-5xl mx-auto">
              <InternalLinkBlock 
                category="services" 
                variant="cards" 
                title="Related Psychiatric Services"
              />
              <InternalLinkBlock 
                category="conditions" 
                variant="cards" 
                title="Conditions We Treat"
              />
              <InternalLinkBlock 
                category="insurance" 
                variant="cards" 
                title="Insurance Information"
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Expert Psychiatric Services in Orlando & Winter Park</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Finding the right psychiatric services is essential for effective mental health care. At Empathy Health Clinic, our board-certified psychiatrists in Orlando and Winter Park provide comprehensive psychiatric services for adults and adolescents struggling with anxiety, depression, ADHD, bipolar disorder, and other mental health conditions.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Whether you're seeking psychiatric care for the first time or looking for a second opinion, we offer same-week appointments and personalized treatment plans tailored to your unique needs. Our team includes board-certified psychiatrists and psychiatric nurse practitioners working together to provide integrated mental health care.
                  </p>
                </div>

                {/* Areas Served */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Areas We Serve</h2>
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions About Psychiatric Services</h2>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left">What psychiatric services do you offer?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        We offer comprehensive psychiatric services including medication management, psychiatric evaluations, ADHD testing and treatment, anxiety and depression treatment, bipolar disorder care, OCD treatment, PTSD treatment, and telepsychiatry. Our board-certified psychiatrists provide personalized care for a wide range of mental health conditions.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left">How quickly can I get an appointment for psychiatric services?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        We offer same-week appointments for new patients seeking psychiatric services. Most patients can schedule within 3-5 business days. Call (386) 848-8751 to check current availability.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left">What insurance do you accept for psychiatric services?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        We accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, UMR, Medicare, and many others. Most patients pay only their copay of $20-50 per session.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-left">Do you offer telepsychiatry services?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Yes! We offer secure HIPAA-compliant video appointments for patients throughout Florida. Telepsychiatry is just as effective as in-person visits for medication management and psychiatric evaluations.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-left">What should I expect at my first psychiatric appointment?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Your initial psychiatric evaluation typically lasts 60-90 minutes. The psychiatrist will review your symptoms, medical history, family mental health history, and current medications. Based on this comprehensive assessment, your psychiatrist will provide a diagnosis and discuss treatment options.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* CTA Section */}
                <div className="bg-[#1a3a2f] rounded-2xl p-8 text-center text-white">
                  <h2 className="text-2xl font-bold mb-4">Start Psychiatric Services Today</h2>
                  <p className="text-gray-200 mb-2">Same-week appointments. Most insurance accepted.</p>
                  <p className="text-gray-200 mb-6">Board-certified psychiatrists ready to help you thrive.</p>
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
                    <h3 className="font-bold text-lg mb-2">Schedule Psychiatric Care</h3>
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

                {/* Psychiatry Services Links */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">Psychiatric Services</h3>
                    <div className="space-y-2">
                      <Link href="/services" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline">
                        Medication Management
                      </Link>
                      <Link href="/psychiatric-evaluation" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline">
                        Psychiatric Evaluation
                      </Link>
                      <Link href="/adhd-testing-orlando" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline">
                        ADHD Testing
                      </Link>
                      <Link href="/anxiety-therapy" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline">
                        Anxiety Treatment
                      </Link>
                      <Link href="/depression-treatment" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline">
                        Depression Treatment
                      </Link>
                      <Link href="/virtual-therapy" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline">
                        Telepsychiatry
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Insurance Quick Links */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">Insurance Information</h3>
                    <div className="space-y-2">
                      <Link href="/aetna-mental-health-coverage" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline">
                        Aetna Coverage
                      </Link>
                      <Link href="/bcbs-mental-health-coverage" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline">
                        BCBS Coverage
                      </Link>
                      <Link href="/cigna-mental-health-coverage" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline">
                        Cigna Coverage
                      </Link>
                      <Link href="/insurance" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline">
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
                        <p className="font-medium">2281 Lee Rd Suite 102</p>
                        <p className="text-gray-600">Winter Park, FL 32810</p>
                        <p className="text-sm text-gray-500 mt-2">Near Orlando, easy parking available</p>
                      </div>
                    </div>
                    <a 
                      href="https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block mt-4"
                    >
                      <Button variant="outline" className="w-full" data-testid="button-directions">
                        Get Directions
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
