import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Phone, Clock, MapPin, Shield, Star, Award, Calendar, Heart, Users, MessageCircle, ArrowRight } from "lucide-react";
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

export default function CouplesCounseling() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "https://www.empathyhealthclinic.com" },
    { name: "Therapy", url: "https://www.empathyhealthclinic.com/therapy" },
    { name: "Couples Counseling", url: "https://www.empathyhealthclinic.com/couples-counseling" }
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MedicalBusiness", "LocalBusiness"],
        "name": "Couples Counseling Orlando - Empathy Health Clinic",
        "description": "Licensed marriage and couples therapists in Orlando providing Gottman Method, EFT, and evidence-based relationship counseling. Same-week appointments available.",
        "url": "https://www.empathyhealthclinic.com/couples-counseling",
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
        "medicalSpecialty": ["Marriage Counseling", "Couples Therapy", "Relationship Counseling"],
        "priceRange": "$$",
        "areaServed": [
          { "@type": "City", "name": "Orlando" },
          { "@type": "City", "name": "Winter Park" },
          { "@type": "City", "name": "Maitland" },
          { "@type": "City", "name": "Altamonte Springs" }
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
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
            "name": "What is couples counseling and how does it work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Couples counseling is therapy that helps partners improve their relationship by addressing communication issues, resolving conflicts, and strengthening emotional bonds. Our therapists use evidence-based approaches like Emotionally Focused Therapy (EFT) and the Gottman Method."
            }
          },
          {
            "@type": "Question",
            "name": "How quickly can we schedule couples counseling?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer same-week appointments for couples. Most couples can schedule within 3-5 business days. Call 386-848-8751 to check current availability."
            }
          },
          {
            "@type": "Question",
            "name": "Does insurance cover couples counseling?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Many insurance plans cover couples counseling. We accept Cigna, Aetna, BCBS, UMR, and others. Most patients pay only their copay of $20-50 per session."
            }
          }
        ]
      },
      breadcrumbSchema
    ]
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Couples Counseling Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Couples Counseling Orlando | Marriage Therapy | Same-Week Appointments"
        description="Looking for couples counseling in Orlando? Licensed marriage therapists offering Gottman Method & EFT. Rebuild trust & communication. Same-week appointments. Call 386-848-8751."
        keywords={["couples counseling near me", "couples counseling orlando", "marriage counseling near me", "marriage counseling orlando", "couples therapy near me", "relationship counseling orlando", "marriage therapist orlando"]}
        canonicalPath="/couples-counseling"
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
                  <span className="font-medium">4.8 Rating from 120+ Couples</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" data-testid="text-page-title">
                  Couples Counseling Orlando
                </h1>
                
                {/* SEO Intro Paragraph - Keyword in first sentence */}
                <p className="text-xl text-gray-200 max-w-xl">
                  <strong>If you're searching for couples counseling in Orlando,</strong> our licensed marriage therapists provide <strong>same-week appointments</strong> using proven methods like Gottman and EFT. Rebuild communication, restore trust, and strengthen your relationship with expert guidance.
                </p>

                {/* Why Choose Us - Quick Trust Signals */}
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <h2 className="text-lg font-semibold mb-4 text-[#E48F66]">Why Choose Our Couples Therapists</h2>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#E48F66] flex-shrink-0" />
                      <span>Same-week appointments for couples</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#E48F66] flex-shrink-0" />
                      <span>Gottman Method & EFT trained therapists</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#E48F66] flex-shrink-0" />
                      <span>In-person & telehealth sessions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#E48F66] flex-shrink-0" />
                      <span>Most insurance accepted (BCBS, Aetna, Cigna, UHC)</span>
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule Couples Counseling</h2>
                <p className="text-gray-600 mb-6">Request an appointment for you and your partner. Same-week availability.</p>
                <LeadCaptureForm therapyName="Couples Counseling" />
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
                  <h3 className="font-bold text-lg">Our Counseling Location</h3>
                  <p className="text-white/90">1155 Louisiana Ave Suite 202</p>
                  <p className="text-white/90">Winter Park, FL 32789</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <Phone className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Schedule Couples Therapy</h3>
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
                  <p className="text-white/90">Mon - Fri: 9AM - 6PM</p>
                  <p className="text-white/70 text-sm">Evening telehealth available</p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-center text-white/80">
                <strong>Serving:</strong> Orlando, Winter Park, Maitland, Altamonte Springs, Casselberry, Lake Mary, Longwood, and surrounding areas
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
                {["Blue Cross Blue Shield", "Aetna", "Cigna", "UnitedHealthcare", "UMR", "Humana"].map((insurance) => (
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
                <span>Licensed Marriage Therapists</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#2E5E4E]" />
                <span>Gottman & EFT Trained</span>
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

        {/* Issues We Address */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Issues We Address in Couples Counseling</h2>
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
              Our licensed therapists help couples work through a wide range of relationship challenges:
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                "Communication problems",
                "Trust & infidelity issues",
                "Intimacy & connection",
                "Conflict resolution",
                "Parenting disagreements",
                "Financial stress",
                "Life transitions",
                "Premarital counseling",
                "Blended family challenges"
              ].map((issue) => (
                <div key={issue} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-[#2E5E4E] flex-shrink-0" />
                  <span className="text-gray-700">{issue}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Our Approach to Relationship Therapy</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                      <Heart className="h-6 w-6 text-[#E48F66]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Emotionally Focused Therapy (EFT)</h3>
                      <p className="text-gray-600 text-sm">Research-backed approach that helps couples identify negative patterns and build secure emotional bonds. 70-75% success rate.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                      <MessageCircle className="h-6 w-6 text-[#E48F66]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Gottman Method</h3>
                      <p className="text-gray-600 text-sm">Based on decades of research, teaches practical skills for managing conflict, increasing intimacy, and building friendship.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                      <Users className="h-6 w-6 text-[#E48F66]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Collaborative Approach</h3>
                      <p className="text-gray-600 text-sm">We work with both partners equally, helping you develop shared goals and solutions for your unique relationship.</p>
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
            <div className="space-y-8 max-w-5xl mx-auto">
              <InternalLinkBlock 
                category="treatments" 
                variant="cards" 
                excludePaths={["/couples-counseling"]}
                title="Related Treatments"
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Expert Couples Counseling in Orlando & Winter Park</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Every relationship faces challenges. Whether you're dealing with communication breakdowns, trust issues, intimacy concerns, or simply want to strengthen your bond, our licensed couples therapists in Orlando are here to help. At Empathy Health Clinic, we provide a safe, non-judgmental space where both partners can be heard and work toward a healthier relationship.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Our approach to couples counseling combines evidence-based techniques from Emotionally Focused Therapy (EFT), the Gottman Method, and other proven modalities. We help couples develop practical communication skills, resolve long-standing conflicts, and rebuild emotional connection.
                  </p>
                </div>

                {/* Benefits */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits of Couples Therapy</h2>
                  <div className="space-y-3">
                    {[
                      "Improved communication and ability to express needs effectively",
                      "Better conflict resolution skills and reduced arguments",
                      "Deeper emotional intimacy and connection",
                      "Restored trust after betrayal or infidelity",
                      "Stronger partnership for parenting and family life",
                      "Tools for navigating major life transitions together"
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
                    {["Orlando", "Winter Park", "Maitland", "Altamonte Springs", "Casselberry", "Longwood", "Lake Mary", "Sanford", "Oviedo", "College Park"].map((area) => (
                      <span key={area} className="px-3 py-1 bg-[#2E5E4E]/10 text-[#2E5E4E] rounded-full text-sm">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* FAQs */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Couples Counseling FAQs</h2>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left">What is couples counseling and how does it work?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Couples counseling is therapy that helps partners improve their relationship by addressing communication issues, resolving conflicts, and strengthening emotional bonds. Sessions typically involve both partners meeting with a licensed therapist to discuss challenges, learn new skills, and work toward shared goals.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left">When should couples consider marriage counseling?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Couples should consider counseling when experiencing ongoing conflicts, communication breakdowns, trust issues, intimacy problems, or major life transitions. You don't need to be in crisis—many couples seek therapy to strengthen an already good relationship.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left">How long does couples therapy typically take?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        The duration varies based on your specific needs and goals. Some couples see improvement in 8-12 sessions, while others benefit from longer-term therapy. Many couples notice positive changes within the first few weeks.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-left">Does insurance cover couples counseling?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Many insurance plans cover couples counseling, including Cigna, Aetna, BCBS, and UMR. Coverage varies by plan, so we recommend calling (386) 848-8751 to verify your specific benefits. Most patients pay $20-50 per session.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-left">Do you offer virtual couples counseling?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Yes, we offer telehealth couples counseling sessions for Florida residents. Virtual sessions are just as effective as in-person therapy and offer added convenience. Many couples prefer attending sessions from home together.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* CTA Section */}
                <div className="bg-[#1a3a2f] rounded-2xl p-8 text-center text-white">
                  <h2 className="text-2xl font-bold mb-4">Start Couples Counseling Today</h2>
                  <p className="text-gray-200 mb-2">Same-week appointments. Most insurance accepted.</p>
                  <p className="text-gray-200 mb-6">Licensed marriage therapists ready to help your relationship thrive.</p>
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
                    <h3 className="font-bold text-lg mb-2">Schedule Couples Therapy</h3>
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

                {/* Related Services Links */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">Therapy Services</h3>
                    <div className="space-y-2">
                      <Link href="/therapy" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline">
                        All Therapy Services
                      </Link>
                      <Link href="/anxiety-therapy" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline">
                        Anxiety Therapy
                      </Link>
                      <Link href="/depression-counseling" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline">
                        Depression Counseling
                      </Link>
                      <Link href="/virtual-therapy" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline">
                        Virtual Therapy
                      </Link>
                      <Link href="/emdr-therapy" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline">
                        EMDR Therapy
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
      </main>

      <SiteFooter />
    </div>
  );
}
