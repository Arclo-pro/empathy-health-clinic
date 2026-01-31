import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Phone, Clock, MapPin, Shield, Star, Award, Calendar, Brain, Heart, Stethoscope, Video, ArrowRight } from "lucide-react";
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

export default function MentalHealthNearMe() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "https://www.empathyhealthclinic.com" },
    { name: "Services", url: "https://www.empathyhealthclinic.com/services" },
    { name: "Mental Health Near Me", url: "https://www.empathyhealthclinic.com/mental-health-near-me" }
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbSchema,
      {
        "@type": ["MedicalBusiness", "LocalBusiness", "MedicalClinic"],
        "name": "Mental Health Services Near Me - Empathy Health Clinic",
        "description": "Comprehensive mental health services in Orlando & Winter Park, FL. Psychiatry, therapy, and counseling for anxiety, depression, ADHD, and more. Same-week appointments available.",
        "url": "https://www.empathyhealthclinic.com/mental-health-near-me",
        "telephone": "+1-386-848-8751",
        "email": "providers@empathyhealthclinic.com",
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
        "medicalSpecialty": ["Psychiatry", "Psychology", "Mental Health", "Counseling"],
        "priceRange": "$$",
        "areaServed": [
          { "@type": "City", "name": "Orlando" },
          { "@type": "City", "name": "Winter Park" },
          { "@type": "City", "name": "Maitland" },
          { "@type": "City", "name": "Altamonte Springs" },
          { "@type": "City", "name": "Lake Mary" }
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
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What mental health services are available near me?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "At Empathy Health Clinic in Winter Park, we offer comprehensive mental health services including psychiatry, therapy, and counseling. Our services include psychiatric evaluations, medication management, individual therapy, couples counseling, and specialized treatment for anxiety, depression, ADHD, bipolar disorder, PTSD, and more."
            }
          },
          {
            "@type": "Question",
            "name": "How quickly can I get mental health care near me?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer same-week appointments for new patients. Most patients can schedule within 3-5 business days. Call 386-848-8751 to check current availability."
            }
          },
          {
            "@type": "Question",
            "name": "Does insurance cover mental health services?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, most insurance plans cover mental health services. We accept major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, UMR, and Medicare. Most patients pay only their copay of $20-50 per session."
            }
          }
        ]
      }
    ]
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Mental Health Near Me Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Mental Health Clinic Orlando | Near Me | 2026"
        description="Mental health clinic Orlando providing comprehensive care. Board-certified psychiatrists & therapists with same-week appointments for anxiety, depression, ADHD. BCBS, Cigna accepted. Call 386-848-8751."
        keywords={["mental health clinic orlando", "mental health near me", "mental health services near me", "mental health clinic near me", "mental health orlando", "mental health winter park", "psychiatrist near me", "therapist near me", "mental health help near me"]}
        canonicalPath="/mental-health-near-me"
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
                  Mental Health Clinic Orlando
                </h1>
                
                {/* SEO Intro Paragraph - Keyword in first sentence */}
                <p className="text-xl text-gray-200 max-w-xl">
                  <strong>If you're searching for mental health near you,</strong> our board-certified psychiatrists and licensed therapists provide <strong>same-week appointments</strong> for anxiety, depression, ADHD, and more. Comprehensive care under one roof with in-person and telehealth options.
                </p>

                {/* Why Choose Us - Quick Trust Signals */}
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <h2 className="text-lg font-semibold mb-4 text-[#E48F66]">Why Choose Our Mental Health Clinic</h2>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#E48F66] flex-shrink-0" />
                      <span>Same-week appointments available</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#E48F66] flex-shrink-0" />
                      <span>Board-certified psychiatrists & licensed therapists</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#E48F66] flex-shrink-0" />
                      <span>In-person & telehealth options</span>
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule Mental Health Care</h2>
                <p className="text-gray-600 mb-6">Request an appointment with our mental health team. Same-week availability.</p>
                <LeadCaptureForm therapyName="Mental Health Services" />
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
                  <h3 className="font-bold text-lg">Our Mental Health Clinic</h3>
                  <p className="text-white/90">1155 Louisiana Ave Suite 202</p>
                  <p className="text-white/90">Winter Park, FL 32789</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <Phone className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Schedule Care</h3>
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
                <span>Board-Certified Providers</span>
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

        {/* Conditions We Treat */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Mental Health Conditions We Treat</h2>
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
              Our board-certified psychiatrists and licensed therapists provide comprehensive treatment for:
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                "Anxiety disorders",
                "Depression",
                "ADHD",
                "Bipolar disorder",
                "PTSD & trauma",
                "OCD",
                "Panic disorder",
                "Social anxiety",
                "Stress & burnout"
              ].map((condition) => (
                <div key={condition} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-[#2E5E4E] flex-shrink-0" />
                  <span className="text-gray-700">{condition}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mental Health Services */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Our Mental Health Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/psychiatric-services">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="p-3 bg-[#E48F66]/10 rounded-lg w-fit mb-4">
                      <Stethoscope className="h-6 w-6 text-[#E48F66]" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Psychiatry</h3>
                    <p className="text-gray-600 text-sm">Board-certified psychiatrists for medication management and psychiatric evaluations.</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/therapy">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="p-3 bg-[#E48F66]/10 rounded-lg w-fit mb-4">
                      <Brain className="h-6 w-6 text-[#E48F66]" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Therapy</h3>
                    <p className="text-gray-600 text-sm">Licensed therapists offering CBT, DBT, EMDR, and other evidence-based treatments.</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/couples-counseling">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="p-3 bg-[#E48F66]/10 rounded-lg w-fit mb-4">
                      <Heart className="h-6 w-6 text-[#E48F66]" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Couples Counseling</h3>
                    <p className="text-gray-600 text-sm">Marriage and relationship therapy using Gottman Method and EFT.</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/virtual-therapy">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="p-3 bg-[#E48F66]/10 rounded-lg w-fit mb-4">
                      <Video className="h-6 w-6 text-[#E48F66]" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Telehealth</h3>
                    <p className="text-gray-600 text-sm">Secure virtual appointments for psychiatry and therapy from anywhere in Florida.</p>
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
            <p className="text-center text-gray-600 mb-6">People also search for:</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <Link href="/psychiatrist-near-me" data-testid="link-related-psychiatrist">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-center justify-between">
                    <span className="font-medium text-[#2E5E4E]">Psychiatrist Near Me</span>
                    <ArrowRight className="h-4 w-4 text-[#E48F66]" />
                  </CardContent>
                </Card>
              </Link>
              <Link href="/therapy-near-me" data-testid="link-related-therapy">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-center justify-between">
                    <span className="font-medium text-[#2E5E4E]">Therapy Near Me</span>
                    <ArrowRight className="h-4 w-4 text-[#E48F66]" />
                  </CardContent>
                </Card>
              </Link>
              <Link href="/counselor-near-me" data-testid="link-related-counselor">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-center justify-between">
                    <span className="font-medium text-[#2E5E4E]">Counselor Near Me</span>
                    <ArrowRight className="h-4 w-4 text-[#E48F66]" />
                  </CardContent>
                </Card>
              </Link>
              <Link href="/mental-health-services-orlando" data-testid="link-related-services-orlando">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-center justify-between">
                    <span className="font-medium text-[#2E5E4E]">Mental Health Orlando</span>
                    <ArrowRight className="h-4 w-4 text-[#E48F66]" />
                  </CardContent>
                </Card>
              </Link>
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Comprehensive Mental Health Care Near You</h2>
                  <p className="text-gray-700 leading-relaxed">
                    When you're searching for mental health near me, you deserve a clinic that offers complete care under one roof. At Empathy Health Clinic in Winter Park, we provide both psychiatry and therapy services, making it easy to get the comprehensive treatment you need.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Our team includes board-certified psychiatrists who specialize in medication management and licensed therapists trained in evidence-based treatments. Whether you need help managing symptoms with medication, talk therapy to develop coping skills, or both, we're here for you.
                  </p>
                </div>

                {/* Why Choose Us */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Empathy Health Clinic?</h2>
                  <div className="space-y-3">
                    {[
                      "Board-certified psychiatrists and licensed therapists",
                      "Comprehensive care: psychiatry and therapy under one roof",
                      "Same-week appointments for new patients",
                      "Most major insurance plans accepted",
                      "Telehealth options for convenient access",
                      "Evidence-based treatments with proven results"
                    ].map((benefit) => (
                      <div key={benefit} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                        <CheckCircle className="h-5 w-5 text-[#2E5E4E] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Areas Served */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Areas We Serve</h2>
                  <div className="flex flex-wrap gap-2">
                    {["Orlando", "Winter Park", "Maitland", "Altamonte Springs", "Casselberry", "Longwood", "Lake Mary", "Sanford", "Oviedo", "College Park", "Downtown Orlando"].map((area) => (
                      <span key={area} className="px-3 py-1 bg-[#2E5E4E]/10 text-[#2E5E4E] rounded-full text-sm">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* FAQs */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Mental Health FAQs</h2>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left">What mental health services are available near me?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        At Empathy Health Clinic, we offer comprehensive mental health services including psychiatry, therapy, and counseling. Our services include psychiatric evaluations, medication management, individual therapy, couples counseling, and specialized treatment for anxiety, depression, ADHD, bipolar disorder, PTSD, and more.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left">How do I find mental health help near me?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Finding the right mental health care starts with understanding your needs. If you need medication management, a psychiatrist can help. If you prefer talk therapy, a licensed therapist is the right choice. At Empathy Health Clinic, we offer both services and can help you determine the best treatment approach.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left">Does insurance cover mental health services?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Yes, most insurance plans cover mental health services. We accept major insurance plans including Cigna, Aetna, Blue Cross Blue Shield, UMR, and Medicare. Coverage typically includes psychiatric appointments and therapy sessions. Most patients pay $20-50 per session.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-left">How quickly can I be seen for mental health care?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        We offer same-week appointments for new patients. Many people can be seen within 3-5 business days. If you're experiencing a mental health crisis, please call us immediately at (386) 848-8751 or go to your nearest emergency room.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-left">Do you offer virtual mental health appointments?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Yes, we offer telehealth appointments for both psychiatry and therapy. Virtual sessions are convenient, private, and just as effective as in-person care. You can meet with your provider from the comfort of your home via secure video.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* CTA Section */}
                <div className="bg-[#1a3a2f] rounded-2xl p-8 text-center text-white">
                  <h2 className="text-2xl font-bold mb-4">Start Mental Health Care Today</h2>
                  <p className="text-gray-200 mb-2">Same-week appointments. Most insurance accepted.</p>
                  <p className="text-gray-200 mb-6">Board-certified providers ready to help you thrive.</p>
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
                    <h3 className="font-bold text-lg mb-2">Schedule Mental Health Care</h3>
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

                {/* Services Links */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">Mental Health Services</h3>
                    <div className="space-y-2">
                      <Link href="/psychiatrist-orlando" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline">
                        Psychiatrist Orlando
                      </Link>
                      <Link href="/therapy" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline">
                        Therapy Services
                      </Link>
                      <Link href="/anxiety-therapy" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline">
                        Anxiety Treatment
                      </Link>
                      <Link href="/depression-counseling" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline">
                        Depression Treatment
                      </Link>
                      <Link href="/adhd-testing-orlando" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline">
                        ADHD Testing
                      </Link>
                      <Link href="/virtual-therapy" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline">
                        Virtual Therapy
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
                        Get Directions
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* People Also Search For Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">People Also Search For</h2>
            <div className="space-y-10">
              <InternalLinkBlock 
                category="services" 
                variant="cards" 
                title="Mental Health Services"
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
      </main>

      <SiteFooter />
    </div>
  );
}
