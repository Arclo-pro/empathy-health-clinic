import { Suspense, lazy } from "react";
import { useQuery } from "@tanstack/react-query";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import InsuranceSection from "@/components/InsuranceSection";
import TrustFactors from "@/components/TrustFactors";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import ApproachSection from "@/components/ApproachSection";
import ComparisonSection from "@/components/ComparisonSection";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import ShortContactForm from "@/components/ShortContactForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MapPin, Phone, Mail, Clock, Shield, Users, Heart, CheckCircle, Stethoscope, Brain, Star } from "lucide-react";
const healthcareBg = "/site-assets/stock_images/healthcare_professio_70df12ba.jpg";
import { trackEvent } from "@/lib/analytics";

const TeamSection = lazy(() => import("@/components/TeamSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));

// Curated Orlando Team Section - showing first 4 providers
function OrlandoTeamSection() {
  const { data: teamMembers } = useQuery<{ id: string; name: string; credentials: string; image: string; }[]>({
    queryKey: ["/api/team-members"],
  });

  const featuredMembers = teamMembers?.slice(0, 4); // Show first 4 providers

  return (
    <section className="py-16 md:py-20 bg-card border-y">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-center mb-4">
          Meet Our Providers
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Board-certified psychiatrists and licensed therapists serving the Orlando area
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {featuredMembers?.map((member, index) => (
            <div
              key={member.id}
              className="text-center space-y-4"
              data-testid={`team-member-${index}`}
            >
              <div className="aspect-square rounded-xl border border-border bg-card flex flex-col items-center justify-center hover-elevate transition-transform duration-200 hover:scale-[1.02] p-6">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={400}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.parentElement?.querySelector('p');
                    if (fallback) {
                      fallback.classList.remove('hidden');
                      fallback.classList.add('flex');
                    }
                  }}
                />
                <p className="text-sm md:text-base font-medium text-center text-muted-foreground hidden items-center justify-center h-full">
                  Photo Placeholder
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {member.credentials}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            asChild
            variant="outline"
            size="lg"
            data-testid="button-view-all-team"
          >
            <Link href="/team">
              View All Providers
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Convenient locations serving Orlando and Central Florida | Telehealth throughout Florida
          </p>
        </div>
      </div>
    </section>
  );
}

// Curated Orlando Testimonials - showing first 3 reviews
function OrlandoTestimonialsSection() {
  const { data: testimonials } = useQuery<{ id: string; name: string; rating: number; text: string; date: string; verified: boolean; }[]>({
    queryKey: ["/api/testimonials"],
  });

  const featuredTestimonials = testimonials?.slice(0, 3); // Show first 3 testimonials

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-center mb-3">
          Our Testimonials
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-10">
          Real reviews from patients who've received care at Empathy Health Clinic
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {featuredTestimonials?.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="rounded-xl border bg-card p-6 hover-elevate transition-all"
              data-testid={`testimonial-${index}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                  index % 6 === 0 ? 'bg-blue-500' :
                  index % 6 === 1 ? 'bg-purple-500' :
                  index % 6 === 2 ? 'bg-pink-500' :
                  index % 6 === 3 ? 'bg-green-500' :
                  index % 6 === 4 ? 'bg-orange-500' : 'bg-teal-500'
                }`}>
                  {testimonial.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-muted text-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                "{testimonial.text}"
              </p>
              {testimonial.verified && (
                <div className="flex items-center gap-1 text-xs text-primary">
                  <CheckCircle className="h-3 w-3" />
                  <span>Verified Patient</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Trusted by hundreds of patients in Orlando and Central Florida
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Orlando() {
  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Orlando Page', '386-848-8751');
  };

  const handleEmailClick = () => {
    trackEvent('email_click', 'conversion', 'Orlando Page');
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Empathy Health Clinic - Psychiatrist in Orlando, FL",
    "description": "Board-certified psychiatrists providing expert psychiatric care in Orlando, FL. Specializing in depression, anxiety, ADHD, PTSD, and comprehensive mental health treatment.",
    "url": "https://empathyhealthclinic.com/locations/orlando",
    "telephone": "386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Orlando",
      "addressRegion": "FL",
      "addressCountry": "US"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "$$",
    "paymentAccepted": "Cash, Credit Card, Insurance",
    "areaServed": {
      "@type": "City",
      "name": "Orlando"
    }
  };

  const medicalClinicSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Empathy Health Clinic - Psychiatrist in Orlando, FL",
    "description": "Board-certified psychiatrists providing expert psychiatric care in Orlando, FL. Specializing in depression, anxiety, ADHD, PTSD, and comprehensive mental health treatment.",
    "url": "https://empathyhealthclinic.com/locations/orlando",
    "telephone": "386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Orlando",
      "addressRegion": "FL",
      "addressCountry": "US"
    },
    "medicalSpecialty": "Psychiatry",
    "availableService": [
      {
        "@type": "MedicalTherapy",
        "name": "Psychiatric Evaluation and Treatment"
      },
      {
        "@type": "MedicalTherapy",
        "name": "Medication Management"
      },
      {
        "@type": "MedicalTherapy",
        "name": "Psychotherapy and Counseling"
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Psychiatrist in Orlando, FL | Board-Certified Psychiatric Services"
        description="Top-rated psychiatrist in Orlando, FL. Board-certified psychiatric care for depression, anxiety, ADHD, PTSD & more. Same-week appointments. Insurance accepted. Call 386-848-8751."
        keywords={["psychiatrist Orlando", "psychiatrist in Orlando FL", "Orlando psychiatrist", "psychiatry Orlando", "psychiatrist near me Orlando", "anxiety psychiatrist Orlando", "depression psychiatrist Orlando", "ADHD psychiatrist Orlando", "psychiatry services Orlando"]}
        canonicalPath="/locations/orlando"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalClinicSchema) }}
      />
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative py-20 px-4">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${healthcareBg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
          </div>
          <div className="container mx-auto max-w-6xl relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/90 mb-4">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 text-white" data-testid="text-page-title">
              Psychiatrist Orlando
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Board-certified psychiatrists and licensed therapists providing compassionate, evidence-based psychiatric care in Orlando. Specializing in depression, anxiety, ADHD, PTSD, and comprehensive mental health treatment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                className=""
                data-testid="button-call-now-hero"
              >
                <a href="tel:3868488751" onClick={handlePhoneClick}>
                  <Phone className="h-5 w-5 mr-2" />
                  Call 386-848-8751
                </a>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                data-testid="button-request-appointment-hero"
              >
                <Link href="/request-appointment">
                  Request Appointment
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <section className="py-16 bg-muted" id="contact-form">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-sans font-bold text-foreground mb-4">
                Schedule Your Orlando Psychiatry Appointment
              </h2>
              <p className="text-lg text-muted-foreground">
                Board-certified psychiatrists serving Orlando and Central Florida. Same-week appointments available for medication management, psychiatric evaluations, and comprehensive mental health care. Most insurance accepted.
              </p>
            </div>
            <ShortContactForm />
          </div>
        </section>

        {/* Key Benefits Bar */}
        <section className="py-8 bg-card border-b">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-lg font-semibold text-foreground">4.8</span>
                <span className="text-sm text-muted-foreground">Google Reviews</span>
              </div>
              <div className="hidden lg:block h-6 w-px bg-border" />
              <VerifiedOnBadge />
              <div className="hidden lg:block h-6 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Same-Week Appointments Available</span>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Section */}
        <InsuranceSection />

        <div className="border-t" />

        {/* Location & Contact Info */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
                Convenient Location Near Orlando
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're located just minutes from downtown Orlando in nearby Winter Park, easily accessible via I-4
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card data-testid="card-address">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Our Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground font-medium mb-2">
                    2281 Lee Rd Suite 102
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Winter Park, FL 32810
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Just minutes from Orlando via I-4 North
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="card-hours">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Office Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Saturday:</span>
                      <span className="text-foreground font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday:</span>
                      <span className="text-foreground font-medium">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="card-contact">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <a 
                      href="tel:3868488751" 
                      className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                      onClick={handlePhoneClick}
                      data-testid="link-phone"
                    >
                      <Phone className="h-4 w-4" />
                      <span className="font-medium">386-848-8751</span>
                    </a>
                    <a 
                      href="mailto:providers@empathyhealthclinic.com" 
                      className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                      onClick={handleEmailClick}
                      data-testid="link-email"
                    >
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">providers@empathyhealthclinic.com</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map Embed */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.0746!2d-81.3503!3d28.5947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e77b3b0c9c0001%3A0x1!2s2281%20Lee%20Rd%20%23102%2C%20Winter%20Park%2C%20FL%2032810!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Empathy Health Clinic Location Map"
                data-testid="map-embed"
              />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-20 bg-card border-y">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
                Psychiatry Services in Orlando, FL
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our board-certified psychiatrists provide comprehensive psychiatric care for Orlando residents
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Stethoscope className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Psychiatric Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Full psychiatric evaluations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Medication management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Depression & anxiety treatment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>ADHD diagnosis & management</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Individual Therapy</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Cognitive Behavioral Therapy (CBT)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Trauma therapy (EMDR)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Stress management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Grief counseling</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Specialized Care</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Couples therapy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Family counseling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Telehealth appointments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Flexible scheduling</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button 
                asChild
                size="lg"
                data-testid="button-view-all-services"
              >
                <Link href="/services">
                  View All Services
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Trust Factors Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
                Why Choose Our Orlando Psychiatrists
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Board-certified psychiatric care in Orlando with a commitment to excellence and compassion
              </p>
            </div>
            <TrustFactors />
          </div>
        </section>

        {/* Trust Badges */}
        <ReviewsAndBadges />

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-8 text-center">
              Why Choose Our Psychiatrists in Orlando, FL
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">Convenient Psychiatry Services Near Orlando</h3>
                  <p className="text-muted-foreground">
                    Easy access from downtown Orlando, Lake Nona, Dr. Phillips, and surrounding areas. Our Winter Park psychiatric clinic is just minutes away via I-4.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">Board-Certified Psychiatrists</h3>
                  <p className="text-muted-foreground">
                    Our Orlando-area psychiatrists are board-certified, fully licensed psychiatric professionals with extensive experience in medication management and psychiatric treatment.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">Insurance Accepted & Affordable Care</h3>
                  <p className="text-muted-foreground">
                    We accept most major insurance plans including Blue Cross Blue Shield, Aetna, UnitedHealthcare, Cigna, and Medicare. Affordable self-pay rates available.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">Telehealth & In-Person Options</h3>
                  <p className="text-muted-foreground">
                    Choose between secure virtual appointments from home or in-person visits at our comfortable Winter Park office.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">Evidence-Based Treatment Approaches</h3>
                  <p className="text-muted-foreground">
                    We use proven, research-backed therapies including CBT, DBT, EMDR, and comprehensive psychiatric medication management.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">Compassionate, Personalized Care</h3>
                  <p className="text-muted-foreground">
                    Every patient receives individualized treatment tailored to their unique needs in a supportive, confidential environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <ComparisonSection />

        {/* Our Approach Step by Step */}
        <ApproachSection />

        {/* Meet Our Orlando Providers - Featured Team */}
        <Suspense fallback={<div className="py-20" />}>
          <OrlandoTeamSection />
          
          {/* Testimonials - Featured Reviews */}
          <div className="border-t" />
          <OrlandoTestimonialsSection />
        </Suspense>

        {/* Contact CTA Section */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-4">
              Ready to Begin Your Mental Health Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Serving the Orlando area and beyond. Contact us today to schedule your first appointment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild
                size="lg"
                className=""
                data-testid="button-call-now"
              >
                <a href="tel:3868488751" onClick={handlePhoneClick}>
                  <Phone className="h-5 w-5 mr-2" />
                  Call 386-848-8751
                </a>
              </Button>

              <Button 
                asChild
                variant="outline"
                size="lg"
                data-testid="button-email"
              >
                <a href="mailto:providers@empathyhealthclinic.com" onClick={handleEmailClick}>
                  <Mail className="h-5 w-5 mr-2" />
                  Email Us
                </a>
              </Button>

              <Button 
                asChild
                size="lg"
                className=""
                data-testid="button-request-appointment"
              >
                <Link href="/request-appointment">
                  Request Appointment
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
