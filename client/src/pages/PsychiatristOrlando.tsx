import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { CheckCircle, MapPin, Phone, Clock, Star, Brain, Shield, Calendar, Video, Award, Building2, Pill, Heart, Zap, ArrowRight } from "lucide-react";
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
import { LocalizedContentMultiple } from "@/components/LocalizedContent";
import ReviewSchema, { PAGE_TESTIMONIALS } from "@/components/ReviewSchema";
import TextUsButton from "@/components/TextUsButton";

export default function PsychiatristOrlando() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "https://empathyhealthclinic.com" },
    { name: "Services", url: "https://empathyhealthclinic.com/services" },
    { name: "Psychiatrist Orlando", url: "https://empathyhealthclinic.com/psychiatrist-orlando" }
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbSchema,
      {
        "@type": ["MedicalClinic", "Psychiatrist", "LocalBusiness"],
        "@id": "https://empathyhealthclinic.com/psychiatrist-orlando/#organization",
        "name": "Psychiatrist Orlando - Empathy Health Clinic",
        "url": "https://empathyhealthclinic.com/psychiatrist-orlando",
        "telephone": "+1-386-848-8751",
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
        "medicalSpecialty": ["Psychiatry", "MedicationManagement", "MentalHealth"],
        "areaServed": [
          { "@type": "City", "name": "Orlando", "containedInPlace": { "@type": "State", "name": "Florida" } },
          { "@type": "City", "name": "Winter Park" },
          { "@type": "City", "name": "Maitland" },
          { "@type": "City", "name": "Altamonte Springs" },
          { "@type": "City", "name": "Lake Mary" },
          { "@type": "City", "name": "Casselberry" },
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
        "paymentAccepted": ["BCBS", "Cigna", "UMR", "Medicare", "Aetna", "United Healthcare"],
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
        "@type": "Physician",
        "name": "Dr. Marna Morrow",
        "jobTitle": "Board-Certified Psychiatrist",
        "medicalSpecialty": "Psychiatry",
        "worksFor": { "@type": "MedicalClinic", "name": "Empathy Health Clinic" }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How quickly can I see a psychiatrist in Orlando?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "At Empathy Health Clinic, we offer same-week appointments for new patients. Many people can schedule their first psychiatrist appointment within 3-5 business days."
            }
          },
          {
            "@type": "Question",
            "name": "What insurance do Orlando psychiatrists accept?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We accept most major insurance including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, Medicare, and many others. Most patients pay only their copay of $20-50 per session."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer telepsychiatry in Orlando?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we offer secure HIPAA-compliant video appointments for patients throughout Florida. Same quality psychiatric care with added convenience from home."
            }
          }
        ]
      }
    ]
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Psychiatrist Orlando Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Psychiatrist Orlando FL | New Patients 2025"
        description="Psychiatrist Orlando and psychiatry Orlando services. Board-certified psychiatrists with same-week appointments for anxiety, depression, ADHD, bipolar. 4.8★ rating. BCBS, Cigna, Medicare. Call (386) 848-8751."
        keywords={["psychiatrist orlando", "psychiatry orlando", "psychiatrist orlando fl", "orlando psychiatrist", "psychiatry orlando fl", "best psychiatrist orlando", "top rated psychiatrist orlando", "psychiatrist near me orlando", "anxiety psychiatrist orlando", "adhd psychiatrist orlando", "depression psychiatrist orlando", "medication management orlando", "mental health orlando", "psychiatrist accepting new patients orlando"]}
        canonicalPath="/psychiatrist-orlando"
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
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" data-testid="text-hero-title">
                  Psychiatrist Orlando, FL
                </h1>
                
                {/* SEO Intro Paragraph - Keyword in first sentence */}
                <p className="text-xl text-gray-200 max-w-xl" data-testid="text-hero-description">
                  <strong>If you're searching for a psychiatrist in Orlando,</strong> our board-certified psychiatrists provide <strong>same-week appointments</strong> with in-person and telehealth options covered by most major insurance. We offer expert medication management for anxiety, depression, ADHD, and bipolar disorder—right here in Central Florida.
                </p>

                {/* Why Choose Us - Quick Trust Signals */}
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <h2 className="text-lg font-semibold mb-4 text-[#E48F66]">Why Choose Our Orlando Psychiatrists</h2>
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
                  <TextUsButton 
                    variant="hero" 
                    size="lg" 
                    location="hero-psychiatrist-orlando"
                  />
                  <Link href="/request-appointment">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8" data-testid="button-book-hero">
                      <Calendar className="mr-2 h-5 w-5" />
                      Book Appointment
                    </Button>
                  </Link>
                </div>

                <LocalizedContentMultiple 
                  variant="hero" 
                  title="Serving Central Florida" 
                  className="mt-6"
                />
              </div>

              {/* Lead Capture Form */}
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">See a Psychiatrist in Orlando</h2>
                <p className="text-gray-600 mb-6">Request an appointment with our psychiatric team. Same-week availability.</p>
                <LeadCaptureForm therapyName="Psychiatrist Orlando" />
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
                  <h3 className="font-bold text-lg">Our Orlando Psychiatry Location</h3>
                  <p className="text-white/90">1155 Louisiana Ave Suite 202</p>
                  <p className="text-white/90">Winter Park, FL 32789</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <Phone className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Schedule Psychiatry</h3>
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

        {/* SEO Internal Links - Above the Fold */}
        <section className="py-6 bg-background border-b" data-testid="seo-internal-links-above-fold">
          <div className="container mx-auto px-4 max-w-6xl">
            <InternalLinkBlock 
              category="locations" 
              title="Serving These Locations"
              variant="cards"
              limit={5}
              excludePaths={["/psychiatrist-orlando"]}
            />
          </div>
        </section>

        {/* Insurance Section - Above the Fold Importance */}
        <section className="py-10 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Insurance Accepted</h2>
              <div className="flex flex-wrap justify-center gap-3 mb-4">
                {["Blue Cross Blue Shield", "Aetna", "Cigna", "UnitedHealthcare", "UMR", "Medicare", "Optum"].map((insurance) => (
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

        {/* Psychiatric Services Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Psychiatric Services We Offer in Orlando</h2>
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
              Our psychiatrists specialize in evidence-based medication management for a wide range of mental health conditions:
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                "Anxiety disorders",
                "Depression & mood disorders",
                "ADHD (adult & child)",
                "Bipolar disorder",
                "PTSD & trauma",
                "OCD",
                "Panic disorder",
                "Medication management",
                "Psychiatric evaluations"
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
            <h2 className="text-3xl font-bold text-center mb-10">Meet with a Psychiatrist in Orlando</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/adhd-testing-orlando">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                        <Brain className="h-6 w-6 text-[#E48F66]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">ADHD Treatment Orlando</h3>
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
                        <h3 className="font-semibold text-lg mb-2">Anxiety Psychiatrist Orlando</h3>
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
                        <Zap className="h-6 w-6 text-[#E48F66]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Depression Psychiatrist Orlando</h3>
                        <p className="text-gray-600 text-sm">Personalized medication management for major depression and mood disorders.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/bipolar-psychiatrist-orlando">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                        <Pill className="h-6 w-6 text-[#E48F66]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Bipolar Disorder Treatment</h3>
                        <p className="text-gray-600 text-sm">Expert care for bipolar I, bipolar II, and cyclothymic disorder with mood stabilization.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/services">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                        <Shield className="h-6 w-6 text-[#E48F66]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Medication Management</h3>
                        <p className="text-gray-600 text-sm">Ongoing medication monitoring and adjustments for optimal mental health outcomes.</p>
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
                        <h3 className="font-semibold text-lg mb-2">Telepsychiatry Orlando</h3>
                        <p className="text-gray-600 text-sm">Convenient virtual psychiatric appointments from anywhere in Florida.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Related Services - Internal Links Block */}
        <section className="py-12 bg-white border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Related Services</h2>
            <p className="text-center text-gray-600 mb-8">People also search for:</p>
            <div className="space-y-10 max-w-5xl mx-auto">
              <InternalLinkBlock 
                category="services" 
                variant="cards" 
                title="Our Services"
                excludePaths={["/psychiatrist-orlando"]}
              />
              <InternalLinkBlock 
                category="conditions" 
                variant="cards" 
                title="Conditions We Treat"
              />
              <InternalLinkBlock 
                category="insurance" 
                variant="cards" 
                title="Accepted Insurance"
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Find a Psychiatrist in Orlando, FL</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Finding the right psychiatrist in Orlando can be challenging. At Empathy Health Clinic, we make it easy with same-week appointments, board-certified psychiatrists, and comprehensive care for a wide range of mental health conditions.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Our Orlando psychiatrists specialize in medication management for anxiety, depression, ADHD, bipolar disorder, and more. We take the time to understand your unique situation and develop a personalized treatment plan that works for you.
                  </p>
                </div>

                {/* Areas Served */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Orlando Areas We Serve</h2>
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions About Orlando Psychiatrists</h2>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left">How quickly can I see a psychiatrist in Orlando?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        At Empathy Health Clinic, we offer same-week appointments for new patients. Many patients can schedule their first appointment within 3-5 business days. Call (386) 848-8751 to check current availability.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left">What insurance do Orlando psychiatrists accept?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        We accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, UMR, Medicare, and many others. Most patients pay only their copay of $20-50 per session.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left">Do you offer telepsychiatry in Orlando?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Yes, we offer secure HIPAA-compliant video appointments for patients throughout Florida. You can receive the same quality psychiatric care from the comfort of your home.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-left">How do I choose the right psychiatrist in Orlando?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Look for board certification, experience with your specific condition, insurance acceptance, and appointment availability. At Empathy Health Clinic, all our psychiatrists are board-certified with extensive experience treating a wide range of mental health conditions.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-left">What should I expect at my first psychiatrist appointment?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Your first appointment is a comprehensive psychiatric evaluation lasting about 60 minutes. Your psychiatrist will review your history, discuss your symptoms, and work with you to develop a personalized treatment plan including any medication recommendations.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* CTA Section */}
                <div className="bg-[#1a3a2f] rounded-2xl p-8 text-center text-white">
                  <h2 className="text-2xl font-bold mb-4">Start Your Psychiatry Journey in Orlando</h2>
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
                    <h3 className="font-bold text-lg mb-2">See a Psychiatrist Today</h3>
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
                    <h3 className="font-bold text-lg mb-4">Psychiatry Services</h3>
                    <div className="space-y-2">
                      <Link href="/adhd-psychiatrist-orlando" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-adhd">
                        ADHD Psychiatrist
                      </Link>
                      <Link href="/anxiety-psychiatrist-orlando" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-anxiety">
                        Anxiety Psychiatrist
                      </Link>
                      <Link href="/depression-psychiatrist-orlando" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-depression">
                        Depression Psychiatrist
                      </Link>
                      <Link href="/bipolar-psychiatrist-orlando" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-bipolar">
                        Bipolar Psychiatrist
                      </Link>
                      <Link href="/medication-management-orlando" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-medication">
                        Medication Management
                      </Link>
                      <Link href="/telepsychiatry-orlando" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline" data-testid="link-telepsychiatry">
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
                    <a 
                      href="https://maps.google.com/?q=1155+Louisiana+Ave+Suite+202+Winter+Park+FL+32789" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block mt-4"
                    >
                      <Button variant="outline" className="w-full" data-testid="button-directions">
                        <Building2 className="h-4 w-4 mr-2" />
                        Get Directions
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <ReviewSchema 
          reviews={PAGE_TESTIMONIALS["psychiatrist-orlando"]} 
          pageIdentifier="psychiatrist-orlando" 
        />
      </main>

      <SiteFooter />
    </div>
  );
}
