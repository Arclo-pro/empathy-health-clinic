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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MapPin, Phone, Mail, Clock, Shield, Users, Heart, CheckCircle, Stethoscope, Brain, Star } from "lucide-react";
import healthcareBg from "@assets/stock_images/healthcare_professio_70df12ba.jpg";
import { trackEvent } from "@/lib/analytics";

const TeamSection = lazy(() => import("@/components/TeamSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));

// Curated Winter Park Team Section - showing first 4 providers
function WinterParkTeamSection() {
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
          Board-certified psychiatrists and licensed therapists available at our Winter Park office
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
            In-person appointments available at our Winter Park office | Telehealth throughout Florida
          </p>
        </div>
      </div>
    </section>
  );
}

// Curated Winter Park Testimonials - showing first 3 reviews
function WinterParkTestimonialsSection() {
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
            Trusted by hundreds of patients in Winter Park and Central Florida
          </p>
        </div>
      </div>
    </section>
  );
}

export default function WinterPark() {
  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Winter Park Page', '386-848-8751');
  };

  const handleEmailClick = () => {
    trackEvent('email_click', 'conversion', 'Winter Park Page');
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Empathy Health Clinic",
    "description": "Mental health clinic providing psychiatric services, therapy, and counseling in Winter Park, FL. Expert treatment for anxiety, depression, ADHD, and more.",
    "url": "https://empathyhealthclinic.com/locations/winter-park",
    "telephone": "386-848-8751",
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
      "latitude": "28.5947",
      "longitude": "-81.3503"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "priceRange": "$$",
    "paymentAccepted": "Cash, Credit Card, Insurance",
    "areaServed": {
      "@type": "City",
      "name": "Winter Park"
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Psychiatrist Winter Park FL | Mental Health Therapy & Counseling"
        description="Top-rated psychiatrists and therapists in Winter Park, FL. Expert treatment for depression, anxiety, ADHD, trauma. Insurance accepted. Call 386-848-8751 today."
        keywords={["psychiatrist Winter Park", "therapist Winter Park FL", "mental health Winter Park", "anxiety treatment Winter Park", "depression therapy Winter Park", "ADHD psychiatrist Winter Park", "counseling Winter Park FL"]}
        canonicalPath="/locations/winter-park"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 text-white" data-testid="text-page-title">
              Winter Park Psychiatry & Therapy
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Empathy Health Clinic is located in the heart of Winter Park, FL. Our experienced psychiatrists and therapists provide compassionate, evidence-based mental health care to help you thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                data-testid="button-call-now-hero"
              >
                <a href="tel:3868488751" onClick={handlePhoneClick}>
                  <Phone className="h-5 w-5 mr-2" />
                  Call 386-848-8751
                </a>
              </Button>
              <Button 
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white border-green-600"
                data-testid="button-request-appointment-hero"
              >
                <Link href="/request-appointment">
                  Request Appointment
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Key Benefits Bar */}
        <section className="py-8 bg-card border-b">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-lg font-semibold text-foreground">4.8</span>
                <span className="text-sm text-muted-foreground">Google Reviews</span>
              </div>
              <div className="hidden sm:block h-6 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Same-Week Appointments Available</span>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Section */}
        <InsuranceSection />

        {/* Trust Badges */}
        <ReviewsAndBadges />

        {/* Location & Contact Info */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
                Visit Our Winter Park Office
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Conveniently located on Lee Road, easily accessible from downtown Winter Park and surrounding areas
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
                    Near Park Avenue shopping district
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
                      <span className="text-muted-foreground">Monday - Friday:</span>
                      <span className="text-foreground font-medium">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday:</span>
                      <span className="text-foreground font-medium">By Appointment</span>
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

          </div>
        </section>

        {/* Verified On Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-center">
              <VerifiedOnBadge />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-20 bg-card border-y">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
                Comprehensive Mental Health Services in Winter Park
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Expert psychiatric and therapy services tailored to your unique needs
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
                      <span>Comprehensive psychiatric evaluations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Medication management & monitoring</span>
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
                      <span>EMDR for trauma & PTSD</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Stress & anxiety management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Grief & loss counseling</span>
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
                      <span>Couples & relationship therapy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Family counseling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Telehealth appointments available</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Same-day & flexible scheduling</span>
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
        <section className="py-16 md:py-20 bg-card border-y">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
                Why Choose Empathy Health Clinic
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Trusted mental health care with a commitment to excellence and compassion
              </p>
            </div>
            <TrustFactors />
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-8 text-center">
              Why Winter Park Residents Trust Empathy Health Clinic
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">Locally Owned & Community-Focused</h3>
                  <p className="text-muted-foreground">
                    We're a local Winter Park clinic dedicated to serving our community with personalized, compassionate care.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">Board-Certified Providers</h3>
                  <p className="text-muted-foreground">
                    Our psychiatrists and therapists are fully licensed, board-certified mental health professionals with years of experience.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">Most Insurance Plans Accepted</h3>
                  <p className="text-muted-foreground">
                    We accept Blue Cross Blue Shield, Aetna, UnitedHealthcare, Cigna, Medicare, and most major insurance plans. Affordable self-pay options available.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">Flexible Appointment Options</h3>
                  <p className="text-muted-foreground">
                    Choose between in-person visits at our Winter Park office or convenient telehealth appointments from the comfort of home.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">Evidence-Based, Holistic Treatment</h3>
                  <p className="text-muted-foreground">
                    We use proven, research-backed therapies (CBT, DBT, EMDR) and take a whole-person approach to mental wellness.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">Safe, Confidential Environment</h3>
                  <p className="text-muted-foreground">
                    Your privacy is our priority. All sessions are completely confidential and HIPAA-compliant in a welcoming, judgment-free space.
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

        {/* Meet Our Winter Park Providers - Featured Team */}
        <Suspense fallback={<div className="py-20" />}>
          <WinterParkTeamSection />
          
          {/* Testimonials - Featured Reviews */}
          <div className="border-t" />
          <WinterParkTestimonialsSection />
        </Suspense>

        {/* Contact CTA Section */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-4">
              Ready to Begin Your Mental Health Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Located in Winter Park, serving the greater Orlando area. Contact us today to schedule your first appointment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild
                size="lg"
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
                className="bg-green-600 hover:bg-green-700 text-white border-green-600"
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
