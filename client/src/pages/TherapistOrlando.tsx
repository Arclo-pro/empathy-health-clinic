import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Phone, Clock, MapPin, Shield, Star, Award, Calendar, Brain, Heart, Users, Video, ArrowRight } from "lucide-react";
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

export default function TherapistOrlando() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "https://www.empathyhealthclinic.com" },
    { name: "Services", url: "https://www.empathyhealthclinic.com/services" },
    { name: "Therapist Orlando", url: "https://www.empathyhealthclinic.com/therapist-orlando" }
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbSchema,
      {
        "@type": ["MedicalBusiness", "LocalBusiness", "Psychologist"],
        "name": "Therapist Orlando FL - Empathy Health Clinic",
        "description": "Licensed therapists in Orlando providing CBT, DBT, EMDR therapy for anxiety, depression, trauma, and couples counseling. Same-week appointments available.",
        "url": "https://www.empathyhealthclinic.com/therapist-orlando",
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
        "medicalSpecialty": ["Psychology", "Counseling", "Psychotherapy"],
        "priceRange": "$$",
        "areaServed": [
          { "@type": "City", "name": "Orlando", "containedInPlace": { "@type": "State", "name": "Florida" } },
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
            "name": "What types of therapy do you offer in Orlando?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer CBT (Cognitive Behavioral Therapy), DBT (Dialectical Behavior Therapy), EMDR for trauma, individual therapy, couples counseling, and specialized treatment for anxiety, depression, ADHD, and PTSD."
            }
          },
          {
            "@type": "Question",
            "name": "How quickly can I see a therapist in Orlando?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer same-week appointments for new patients. Most patients can schedule within 3-5 business days. Call 386-848-8751 to check current availability."
            }
          },
          {
            "@type": "Question",
            "name": "What insurance do you accept for therapy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, UMR, and Medicare. Most patients pay only their copay of $20-50 per session."
            }
          }
        ]
      }
    ]
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Therapist Orlando Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Therapist Orlando FL | Licensed Counselors | Same-Week Appointments"
        description="Looking for a therapist in Orlando? Licensed therapists offering CBT, DBT, EMDR for anxiety, depression, trauma. Same-week appointments. Most insurance accepted. Call 386-848-8751."
        keywords={["therapist orlando", "therapist near me", "therapist orlando fl", "licensed therapist orlando", "counselor orlando", "therapy orlando fl", "orlando therapist", "therapists in orlando fl"]}
        canonicalPath="/therapist-orlando"
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
                  Therapist Orlando, FL
                </h1>
                
                {/* SEO Intro Paragraph - Keyword in first sentence */}
                <p className="text-xl text-gray-200 max-w-xl">
                  <strong>If you're searching for a therapist in Orlando,</strong> our licensed counselors provide <strong>same-week appointments</strong> for anxiety, depression, trauma, and relationship issues. In-person and telehealth options available, covered by most major insurance plans.
                </p>

                {/* Why Choose Us - Quick Trust Signals */}
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <h2 className="text-lg font-semibold mb-4 text-[#E48F66]">Why Choose Our Orlando Therapists</h2>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#E48F66] flex-shrink-0" />
                      <span>Same-week appointments available</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#E48F66] flex-shrink-0" />
                      <span>Licensed therapists (LMHC, LCSW, LPC)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#E48F66] flex-shrink-0" />
                      <span>In-person & telehealth options</span>
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule With a Therapist</h2>
                <p className="text-gray-600 mb-6">Request an appointment with one of our licensed therapists. Same-week availability.</p>
                <LeadCaptureForm therapyName="Therapy Services Orlando" />
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
                  <h3 className="font-bold text-lg">Our Orlando Therapy Location</h3>
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
                  <p className="text-white/90">Mon - Fri: 9AM - 6PM</p>
                  <p className="text-white/70 text-sm">Evening telehealth available</p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-center text-white/80">
                <strong>Serving:</strong> Orlando, Winter Park, Maitland, Altamonte Springs, Casselberry, Lake Mary, Longwood, College Park, and surrounding areas
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
                <span>Licensed Therapists (LMHC, LCSW)</span>
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

        {/* Therapy Services We Offer */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Therapy Services in Orlando</h2>
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
              Our licensed therapists provide evidence-based treatment for a wide range of mental health concerns:
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                "Individual therapy",
                "Couples counseling",
                "Anxiety treatment",
                "Depression counseling",
                "Trauma & PTSD therapy",
                "EMDR therapy",
                "CBT (Cognitive Behavioral)",
                "DBT skills training",
                "Grief counseling"
              ].map((service) => (
                <div key={service} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-[#2E5E4E] flex-shrink-0" />
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Treatment Specialties */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Our Therapy Specialties</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/anxiety-therapy">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                        <Brain className="h-6 w-6 text-[#E48F66]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Anxiety Therapy</h3>
                        <p className="text-gray-600 text-sm">CBT and exposure therapy for generalized anxiety, panic attacks, social anxiety, and phobias.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/depression-counseling">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                        <Heart className="h-6 w-6 text-[#E48F66]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Depression Counseling</h3>
                        <p className="text-gray-600 text-sm">Evidence-based therapy for major depression, persistent depressive disorder, and mood issues.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/emdr-therapy">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                        <Shield className="h-6 w-6 text-[#E48F66]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">EMDR Therapy</h3>
                        <p className="text-gray-600 text-sm">Specialized trauma treatment using Eye Movement Desensitization and Reprocessing.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/couples-counseling">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                        <Users className="h-6 w-6 text-[#E48F66]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Couples Counseling</h3>
                        <p className="text-gray-600 text-sm">Relationship therapy using Gottman Method and EFT to improve communication and connection.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/therapy">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#E48F66]/10 rounded-lg">
                        <Award className="h-6 w-6 text-[#E48F66]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Trauma & PTSD</h3>
                        <p className="text-gray-600 text-sm">Specialized treatment for trauma, PTSD, and complex trauma using evidence-based approaches.</p>
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
                        <h3 className="font-semibold text-lg mb-2">Telehealth Therapy</h3>
                        <p className="text-gray-600 text-sm">Convenient virtual therapy appointments from anywhere in Florida via secure video.</p>
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
            <div className="space-y-8 max-w-6xl mx-auto">
              <InternalLinkBlock 
                category="services" 
                variant="cards" 
                excludePaths={["/therapist-orlando"]}
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Expert Therapy Services in Orlando, FL</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Finding the right therapist in Orlando can feel overwhelming. At Empathy Health Clinic, our licensed therapists provide evidence-based counseling tailored to your unique needs. Whether you're struggling with anxiety, depression, relationship issues, or life transitions, we're here to help.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Our team of licensed mental health counselors (LMHC), licensed clinical social workers (LCSW), and licensed professional counselors (LPC) specialize in proven therapeutic approaches including Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), and EMDR for trauma.
                  </p>
                </div>

                {/* Conditions We Treat */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Conditions Our Orlando Therapists Treat</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      "Anxiety disorders",
                      "Depression",
                      "PTSD & trauma",
                      "Relationship issues",
                      "Stress & burnout",
                      "Grief & loss",
                      "Life transitions",
                      "Self-esteem issues",
                      "OCD",
                      "Panic attacks",
                      "Social anxiety",
                      "Work stress"
                    ].map((condition) => (
                      <div key={condition} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <CheckCircle className="h-4 w-4 text-[#2E5E4E] flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{condition}</span>
                      </div>
                    ))}
                  </div>
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left">What types of therapy do you offer in Orlando?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        We offer individual therapy, couples counseling, CBT (Cognitive Behavioral Therapy), DBT (Dialectical Behavior Therapy), EMDR for trauma, and specialized treatment for anxiety, depression, ADHD, and PTSD.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left">How quickly can I see a therapist in Orlando?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        We offer same-week appointments for new patients. Most patients can schedule within 3-5 business days. Call (386) 848-8751 to check current availability.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left">What insurance do you accept for therapy?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        We accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, UMR, Medicare, and many others. Most patients pay only their copay of $20-50 per session.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-left">Do you offer online therapy in Orlando?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Yes! We offer secure HIPAA-compliant video therapy appointments for patients throughout Florida. Telehealth sessions are just as effective as in-person therapy for most conditions.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-left">What should I expect at my first therapy appointment?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Your first session is typically 50-60 minutes. Your therapist will ask about your concerns, history, and goals for therapy. Together, you'll develop a treatment plan tailored to your needs. It's a safe space to share at your own pace.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* CTA Section */}
                <div className="bg-[#1a3a2f] rounded-2xl p-8 text-center text-white">
                  <h2 className="text-2xl font-bold mb-4">Start Therapy Today</h2>
                  <p className="text-gray-200 mb-2">Same-week appointments. Most insurance accepted.</p>
                  <p className="text-gray-200 mb-6">Licensed therapists ready to help you thrive.</p>
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
                    <h3 className="font-bold text-lg mb-2">Schedule Therapy</h3>
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
                      <Link href="/anxiety-therapy" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline">
                        Anxiety Therapy
                      </Link>
                      <Link href="/depression-counseling" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline">
                        Depression Counseling
                      </Link>
                      <Link href="/emdr-therapy" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline">
                        EMDR Therapy
                      </Link>
                      <Link href="/couples-counseling" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline">
                        Couples Counseling
                      </Link>
                      <Link href="/therapy" className="block p-2 hover:bg-gray-50 rounded text-[#2E5E4E] hover:underline">
                        Trauma & PTSD
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
      </main>

      <SiteFooter />
    </div>
  );
}
