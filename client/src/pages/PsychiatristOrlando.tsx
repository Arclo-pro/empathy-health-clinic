import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, MapPin, Phone, Clock, Star, CheckCircle, Brain, Shield, Calendar, Users, Video, Award, Building2, Pill, Clock3, Heart, Zap, ThumbsUp, Quote } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import HeroBackground from "@/components/HeroBackground";
import ShortContactForm from "@/components/ShortContactForm";
import heroImage from "@assets/stock_images/professional_healthc_955227e9.jpg";
import { trackEvent } from "@/lib/analytics";
import { useState, useEffect } from "react";

const testimonials = [
  {
    text: "Dr. Morrow truly listens and takes the time to understand my needs. My anxiety has improved significantly since starting treatment at Empathy Health Clinic.",
    author: "Sarah M.",
    location: "Orlando, FL",
    rating: 5
  },
  {
    text: "After struggling to find a psychiatrist in Orlando, I found Empathy Health Clinic. They got me in the same week and the care has been exceptional.",
    author: "Michael T.",
    location: "Winter Park, FL",
    rating: 5
  },
  {
    text: "The medication management here is thorough and personalized. They actually check in on how I'm doing and adjust as needed. Highly recommend!",
    author: "Jennifer L.",
    location: "Maitland, FL",
    rating: 5
  },
  {
    text: "As someone with ADHD, finding the right psychiatrist was crucial. The team here is knowledgeable and compassionate. Best decision I made for my mental health.",
    author: "David R.",
    location: "Altamonte Springs, FL",
    rating: 5
  }
];

export default function PsychiatristOrlando() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MedicalClinic", "Psychiatrist", "LocalBusiness"],
        "@id": "https://empathyhealthclinic.com/psychiatrist-orlando/#organization",
        "name": "Psychiatrist Orlando - Empathy Health Clinic",
        "url": "https://empathyhealthclinic.com/psychiatrist-orlando",
        "telephone": "+1-386-848-8751",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "2281 Lee Road Suite 102",
          "addressLocality": "Orlando",
          "addressRegion": "FL",
          "postalCode": "32810",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.59544,
          "longitude": -81.36537
        },
        "medicalSpecialty": ["Psychiatry", "MedicationManagement", "MentalHealth"],
        "areaServed": [
          { "@type": "City", "name": "Orlando", "containedInPlace": { "@type": "State", "name": "Florida" } },
          { "@type": "City", "name": "Winter Park" },
          { "@type": "City", "name": "Maitland" },
          { "@type": "City", "name": "Altamonte Springs" },
          { "@type": "City", "name": "Lake Mary" },
          { "@type": "City", "name": "Downtown Orlando" },
          { "@type": "City", "name": "College Park" }
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        ],
        "priceRange": "$$",
        "paymentAccepted": ["BCBS", "Cigna", "UMR", "Medicare", "Aetna", "United Healthcare"],
        "sameAs": [
          "https://www.psychologytoday.com/us/psychiatrists/empathy-health-clinic-winter-park-fl",
          "https://www.healthgrades.com/group-directory/fl-florida/winter-park/empathy-health-clinic",
          "https://www.zocdoc.com/practice/empathy-health-clinic"
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
            "name": "How do I choose the right psychiatrist in Orlando?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "When choosing a psychiatrist in Orlando, look for board certification, experience with your specific condition, convenient location, insurance acceptance, and appointment availability. At Empathy Health Clinic, all our psychiatrists are board-certified and experienced in treating a wide range of mental health conditions."
            }
          },
          {
            "@type": "Question",
            "name": "How quickly can I see a psychiatrist in Orlando?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "At Empathy Health Clinic, we offer same-week appointments for new patients. Many people can schedule their first appointment within 3-5 business days."
            }
          },
          {
            "@type": "Question",
            "name": "What insurance do Orlando psychiatrists accept?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We accept most major insurance including Blue Cross Blue Shield, UMR, Medicare, Aetna, Cigna, and many others. Contact our office to verify your specific coverage."
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
        title="Psychiatrist Orlando | Top-Rated Mental Health Care"
        description="Board-certified psychiatrist in Orlando, FL. Expert treatment for anxiety, depression, ADHD, bipolar disorder. Same-week appointments. BCBS, Cigna, Medicare accepted. Call (386) 848-8751."
        keywords={["psychiatrist orlando", "psychiatrist orlando fl", "orlando psychiatrist", "best psychiatrist orlando", "psychiatrist near me orlando", "anxiety psychiatrist orlando", "adhd psychiatrist orlando", "medication management orlando", "mental health orlando"]}
        canonicalPath="/psychiatrist-orlando"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Top Psychiatrist in Orlando, FL
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6 max-w-3xl" data-testid="text-hero-description">
            Board-certified psychiatrists serving Orlando and Central Florida. Expert medication management for anxiety, depression, ADHD, and bipolar disorder. Same-week appointments available.
          </p>
          
          <div className="flex flex-wrap gap-3 mb-8 text-white/95">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <Clock3 className="h-5 w-5 text-green-300" />
              <span className="font-semibold">Same-Week Appointments</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <Award className="h-5 w-5 text-green-300" />
              <span className="font-semibold">Board-Certified</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <Shield className="h-5 w-5 text-green-300" />
              <span className="font-semibold">Most Insurance Accepted</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-6 h-auto shadow-xl"
              asChild
              data-testid="button-schedule-hero"
            >
              <Link href="/request-appointment">Schedule Appointment</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/95 hover:bg-white text-gray-900 border-2 border-white font-semibold text-lg px-8 py-6 h-auto backdrop-blur-sm shadow-xl"
              asChild
              onClick={handlePhoneClick}
              data-testid="button-call-hero"
            >
              <a href="tel:+13868488751">
                <Phone className="h-5 w-5 mr-2" />
                Call: 386-848-8751
              </a>
            </Button>
          </div>
        </HeroBackground>

        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4 text-foreground">
                Why Orlando Patients Choose Empathy Health Clinic
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                See how we compare to other psychiatric practices in Orlando. We're committed to providing the best possible care with minimal wait times and transparent communication.
              </p>
            </div>

            <div className="overflow-x-auto mb-12">
              <table className="w-full bg-card border border-card-border rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-primary/10 border-b border-card-border">
                    <th className="text-left p-4 font-bold text-foreground">Feature</th>
                    <th className="text-center p-4 font-bold text-primary">Empathy Health Clinic</th>
                    <th className="text-center p-4 font-bold text-muted-foreground">Other Orlando Practices</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-card-border">
                    <td className="p-4 text-foreground font-medium">Wait Time for New Patients</td>
                    <td className="p-4 text-center">
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-semibold">Same Week</span>
                    </td>
                    <td className="p-4 text-center text-muted-foreground">2-6 weeks typical</td>
                  </tr>
                  <tr className="border-b border-card-border bg-muted/30">
                    <td className="p-4 text-foreground font-medium">Board-Certified Psychiatrists</td>
                    <td className="p-4 text-center"><CheckCircle2 className="h-6 w-6 text-green-600 mx-auto" /></td>
                    <td className="p-4 text-center text-muted-foreground">Varies</td>
                  </tr>
                  <tr className="border-b border-card-border">
                    <td className="p-4 text-foreground font-medium">Insurance Accepted</td>
                    <td className="p-4 text-center">
                      <span className="text-green-700 dark:text-green-300 font-semibold">BCBS, Cigna, UMR, Medicare, Aetna, UHC</span>
                    </td>
                    <td className="p-4 text-center text-muted-foreground">Limited plans</td>
                  </tr>
                  <tr className="border-b border-card-border bg-muted/30">
                    <td className="p-4 text-foreground font-medium">Telepsychiatry Available</td>
                    <td className="p-4 text-center"><CheckCircle2 className="h-6 w-6 text-green-600 mx-auto" /></td>
                    <td className="p-4 text-center text-muted-foreground">Sometimes</td>
                  </tr>
                  <tr className="border-b border-card-border">
                    <td className="p-4 text-foreground font-medium">Weekend & Evening Hours</td>
                    <td className="p-4 text-center"><CheckCircle2 className="h-6 w-6 text-green-600 mx-auto" /></td>
                    <td className="p-4 text-center text-muted-foreground">Rarely</td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="p-4 text-foreground font-medium">Collaborative Care with Therapists</td>
                    <td className="p-4 text-center"><CheckCircle2 className="h-6 w-6 text-green-600 mx-auto" /></td>
                    <td className="p-4 text-center text-muted-foreground">Limited</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-8 text-center text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Ready to Experience the Difference?</h3>
              <p className="text-lg mb-6 text-white/95">
                Join hundreds of Orlando patients who trust Empathy Health Clinic for their mental health care.
              </p>
              <Button 
                size="lg" 
                className="bg-white text-green-700 hover:bg-white/95 font-bold text-lg px-10 py-6 h-auto shadow-lg"
                asChild
                data-testid="button-cta-comparison"
              >
                <Link href="/request-appointment">Book Your Appointment</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4 text-foreground text-center">
              Meet Your Orlando Psychiatrists
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Our experienced team is dedicated to providing compassionate, personalized psychiatric care to Orlando and Central Florida communities.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border border-card-border rounded-xl p-8">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="bg-primary/10 w-32 h-32 rounded-full flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                    <Award className="h-16 w-16 text-primary" />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-foreground mb-1">Dr. Marna Morrow, MD</h3>
                    <p className="text-primary font-semibold mb-3">Board-Certified Adult Psychiatrist</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Dr. Morrow has served the Orlando community for over a decade, specializing in medication management for anxiety, depression, ADHD, and bipolar disorder. She is known for her thorough evaluations and patient-centered approach.
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs px-3 py-1 rounded-full">Board Certified</span>
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-3 py-1 rounded-full">American Board of Psychiatry</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <strong>Education:</strong> Medical Degree, Psychiatry Residency<br />
                      <strong>Specialties:</strong> ADHD, Anxiety, Depression, Bipolar Disorder
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-card-border rounded-xl p-8">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="bg-primary/10 w-32 h-32 rounded-full flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                    <Award className="h-16 w-16 text-primary" />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-foreground mb-1">Dr. Rachelle Astudillo, PMHNP-BC</h3>
                    <p className="text-primary font-semibold mb-3">Psychiatric Nurse Practitioner</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Dr. Astudillo brings a wealth of experience in psychiatric mental health nursing. She provides comprehensive psychiatric evaluations and medication management for adults and adolescents in the Orlando area.
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs px-3 py-1 rounded-full">PMHNP-BC</span>
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-3 py-1 rounded-full">ANCC Board Certified</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <strong>Education:</strong> MSN, Psychiatric-Mental Health<br />
                      <strong>Specialties:</strong> Adults, Adolescents, Telehealth
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-8 text-foreground text-center">
              What Orlando Patients Say About Us
            </h2>
            
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-card border border-card-border rounded-2xl p-8 md:p-12 text-center">
                <Quote className="h-12 w-12 text-primary/30 mx-auto mb-6" />
                <p className="text-xl md:text-2xl text-foreground italic mb-6 leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="font-bold text-foreground">{testimonials[currentTestimonial].author}</p>
                <p className="text-sm text-muted-foreground">{testimonials[currentTestimonial].location}</p>
              </div>
              
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                    data-testid={`button-testimonial-${index}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4 text-foreground text-center">
              Psychiatric Services in Orlando
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Comprehensive mental health care for Orlando, Winter Park, and surrounding Central Florida communities.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <Link href="/adhd-testing-orlando" className="bg-card border border-card-border rounded-xl p-6 hover-elevate group">
                <Brain className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">ADHD Treatment</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive ADHD evaluation and medication management for adults and children in Orlando.
                </p>
              </Link>

              <Link href="/anxiety-therapy" className="bg-card border border-card-border rounded-xl p-6 hover-elevate group">
                <Heart className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Anxiety Treatment</h3>
                <p className="text-sm text-muted-foreground">
                  Evidence-based treatment for generalized anxiety, panic disorder, social anxiety, and phobias.
                </p>
              </Link>

              <Link href="/depression-counseling" className="bg-card border border-card-border rounded-xl p-6 hover-elevate group">
                <Zap className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Depression Treatment</h3>
                <p className="text-sm text-muted-foreground">
                  Personalized medication management and support for major depression and mood disorders.
                </p>
              </Link>

              <Link href="/bipolar-psychiatrist-orlando" className="bg-card border border-card-border rounded-xl p-6 hover-elevate group">
                <Pill className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Bipolar Disorder</h3>
                <p className="text-sm text-muted-foreground">
                  Expert care for bipolar I, bipolar II, and cyclothymic disorder with mood stabilization.
                </p>
              </Link>

              <Link href="/medication-management" className="bg-card border border-card-border rounded-xl p-6 hover-elevate group">
                <Shield className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Medication Management</h3>
                <p className="text-sm text-muted-foreground">
                  Ongoing medication monitoring and adjustments for optimal mental health outcomes.
                </p>
              </Link>

              <Link href="/virtual-therapy" className="bg-card border border-card-border rounded-xl p-6 hover-elevate group">
                <Video className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Telepsychiatry</h3>
                <p className="text-sm text-muted-foreground">
                  Convenient virtual psychiatric appointments from anywhere in Florida.
                </p>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4 text-foreground text-center">
              Orlando Neighborhoods We Serve
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Conveniently located to serve all of Orlando and Central Florida. Our office is easily accessible from I-4, and we offer telepsychiatry for added convenience.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { name: "Downtown Orlando", href: "/psychiatrist-orlando" },
                { name: "Winter Park", href: "/locations/winter-park" },
                { name: "College Park", href: "/psychiatrist-orlando" },
                { name: "Mills 50", href: "/psychiatrist-orlando" },
                { name: "Baldwin Park", href: "/psychiatrist-orlando" },
                { name: "Thornton Park", href: "/psychiatrist-orlando" },
                { name: "Colonialtown", href: "/psychiatrist-orlando" },
                { name: "Maitland", href: "/psychiatrist-orlando" },
                { name: "Altamonte Springs", href: "/locations/altamonte-springs" },
                { name: "Lake Mary", href: "/psychiatrist-orlando" },
                { name: "Sanford", href: "/psychiatrist-orlando" },
                { name: "Apopka", href: "/locations/apopka" },
                { name: "Kissimmee", href: "/locations/kissimmee" },
                { name: "Dr. Phillips", href: "/psychiatrist-orlando" },
                { name: "MetroWest", href: "/psychiatrist-orlando" },
                { name: "Ocoee", href: "/psychiatrist-orlando" }
              ].map((area) => (
                <Link key={area.name} href={area.href} className="bg-card border border-card-border rounded-lg p-3 text-center hover-elevate">
                  <span className="text-sm font-medium text-foreground">{area.name}</span>
                </Link>
              ))}
            </div>

            <div className="bg-card border border-card-border rounded-xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Building2 className="h-6 w-6 text-primary" />
                    Our Orlando Office
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    <strong>Empathy Health Clinic</strong><br />
                    2281 Lee Road Suite 102<br />
                    Orlando, FL 32810
                  </p>
                  <p className="text-muted-foreground mb-4">
                    <Phone className="h-4 w-4 inline mr-2" />
                    <a href="tel:+13868488751" className="text-primary hover:underline font-semibold">(386) 848-8751</a>
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    <Clock className="h-4 w-4 inline mr-2" />
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    <span className="ml-6">Telehealth available evenings & weekends</span>
                  </p>
                  <Button 
                    className="w-full"
                    asChild
                    data-testid="button-get-directions"
                  >
                    <a href="https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Orlando+FL+32810" target="_blank" rel="noopener noreferrer">
                      <MapPin className="h-4 w-4 mr-2" />
                      Get Directions
                    </a>
                  </Button>
                </div>
                <div>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5!2d-81.36537!3d28.59544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e77000e9d9a8b3%3A0x123456789!2s2281+Lee+Rd+Suite+102%2C+Orlando%2C+FL+32810!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '300px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Psychiatrist Orlando - Empathy Health Clinic Location"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <InsuranceSection className="py-16 px-4 bg-muted/50" />

        <ReviewsAndBadges />

        <section className="py-12 px-4 bg-background">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-sans font-bold mb-8 text-foreground text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <div className="bg-card border border-card-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">How do I choose the right psychiatrist in Orlando?</h3>
                <p className="text-muted-foreground">Look for board certification, experience with your specific condition, insurance acceptance, and appointment availability. At Empathy Health Clinic, all our psychiatrists are board-certified with same-week appointments available.</p>
              </div>
              <div className="bg-card border border-card-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">How quickly can I see a psychiatrist in Orlando?</h3>
                <p className="text-muted-foreground">We offer same-week appointments for new patients. Many patients can schedule within 3-5 business days. Call (386) 848-8751 to schedule.</p>
              </div>
              <div className="bg-card border border-card-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">What insurance do you accept?</h3>
                <p className="text-muted-foreground">We accept most major insurance including Blue Cross Blue Shield, Cigna, UMR, Medicare, Aetna, United Healthcare, and many others.</p>
              </div>
              <div className="bg-card border border-card-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">Do you offer telepsychiatry in Orlando?</h3>
                <p className="text-muted-foreground">Yes, we offer secure HIPAA-compliant video appointments for patients throughout Florida. Same quality care with added convenience.</p>
              </div>
            </div>
          </div>
        </section>

        <TrustFactors />

        <section className="py-16 px-4 bg-gradient-to-br from-primary to-primary/80">
          <div className="container mx-auto max-w-4xl text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Your Mental Health Journey in Orlando
            </h2>
            <p className="text-xl mb-8 text-white/95">
              Board-certified psychiatrists accepting new patients. Same-week appointments available.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/95 font-bold text-lg px-10 py-6 h-auto shadow-xl"
                asChild
                data-testid="button-final-cta"
              >
                <Link href="/request-appointment">Book Your Appointment</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-10 py-6 h-auto"
                asChild
                onClick={handlePhoneClick}
                data-testid="button-final-phone"
              >
                <a href="tel:+13868488751">
                  <Phone className="h-5 w-5 mr-2" />
                  386-848-8751
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
