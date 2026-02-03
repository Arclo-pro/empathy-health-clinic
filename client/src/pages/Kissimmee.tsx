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
const healthcareBg = "/site-assets/stock_images/healthcare_professio_70df12ba.webp";
import { trackEvent } from "@/lib/analytics";

const TeamSection = lazy(() => import("@/components/TeamSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));

function KissimmeeTeamSection() {
  const { data: teamMembers } = useQuery<{ id: string; name: string; credentials: string; image: string; }[]>({
    queryKey: ["/api/team-members"],
  });

  const featuredMembers = teamMembers?.slice(0, 4);

  return (
    <section className="py-16 md:py-20 bg-card border-y">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-center mb-4">
          Meet Our Providers
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Board-certified psychiatrists and licensed therapists serving Kissimmee and Osceola County
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
            Serving Kissimmee patients | Telehealth available throughout Florida
          </p>
        </div>
      </div>
    </section>
  );
}


export default function Kissimmee() {
  const handlePhoneClick = () => {
    trackEvent('phone_click', { location: 'kissimmee_page' });
  };

  const handleEmailClick = () => {
    trackEvent('email_click', { location: 'kissimmee_page' });
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Empathy Health Clinic - Kissimmee",
    "description": "Mental health clinic providing psychiatric services, therapy, and counseling serving Kissimmee, FL. Expert treatment for anxiety, depression, ADHD, and more.",
    "url": "https://www.empathyhealthclinic.com/locations/kissimmee",
    "telephone": "386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1000 W Broadway St Suite 103",
      "addressLocality": "Oviedo",
      "addressRegion": "FL",
      "postalCode": "32765",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.6697",
      "longitude": "-81.2084"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "$$",
    "paymentAccepted": "Cash, Credit Card, Insurance",
    "areaServed": [
      {
        "@type": "City",
        "name": "Kissimmee"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Osceola County"
      }
    ],
    "medicalSpecialty": [
      "Psychiatry",
      "Mental Health Counseling",
      "Psychotherapy"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Psychiatrist Kissimmee FL | Mental Health Therapy & Counseling"
        description="Top-rated psychiatrists and therapists serving Kissimmee, FL. Expert treatment for depression, anxiety, ADHD, trauma. Insurance accepted. Same-week appointments. Call 386-848-8751."
        keywords={[
          "psychiatrist Kissimmee FL",
          "therapist Kissimmee",
          "mental health Kissimmee",
          "therapy Kissimmee FL",
          "counseling Kissimmee",
          "psychiatry Kissimmee",
          "ADHD treatment Kissimmee",
          "anxiety therapy Kissimmee",
          "depression treatment Kissimmee"
        ]}
        canonicalPath="/locations/kissimmee"
        jsonLd={localBusinessSchema}
        preloadImage={healthcareBg}
      />

      <SiteHeader />

      <main className="flex-1">
        <section 
          className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${healthcareBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/60 to-background/80 backdrop-blur-[2px]"></div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-primary/90 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
                <MapPin className="w-4 h-4" />
                Serving Kissimmee & Osceola County
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 text-white">
                Psychiatrist in Kissimmee, FL
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Expert mental health care serving Kissimmee and Osceola County. Board-certified psychiatrists and licensed therapists providing compassionate treatment for anxiety, depression, ADHD, and more.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Button 
                  size="lg" 
                  asChild
                  className="bg-white text-foreground hover:bg-white/90"
                  data-testid="button-hero-appointment"
                >
                  <Link href="/request-appointment">
                    Schedule Appointment
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  asChild
                  className="border-white text-white hover:bg-white/10 backdrop-blur-sm"
                  data-testid="button-hero-call"
                >
                  <a 
                    href="tel:+13868488751"
                    onClick={handlePhoneClick}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    (386) 848-8751
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span>Same-Week Appointments</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span>Insurance Accepted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span>Telehealth Available</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-card border-y">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <VerifiedOnBadge variant="compact" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-5 h-5 text-primary" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-5 h-5 text-primary" />
                <span>Board Certified</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heart className="w-5 h-5 text-primary" />
                <span>Compassionate Care</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4">
                Comprehensive Mental Health Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We provide a full range of psychiatric and therapeutic services for patients throughout Kissimmee and Osceola County
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover-elevate">
                <CardHeader>
                  <Brain className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Psychiatric Evaluations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Comprehensive assessments to accurately diagnose mental health conditions and create personalized treatment plans.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardHeader>
                  <Stethoscope className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Medication Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Expert psychiatric medication management with ongoing monitoring to ensure optimal treatment outcomes.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardHeader>
                  <Heart className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Individual Therapy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Evidence-based psychotherapy including CBT, DBT, and trauma-focused approaches tailored to your needs.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardHeader>
                  <Brain className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>ADHD Treatment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Specialized care for children and adults with ADHD, including evaluation, medication, and behavioral strategies.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardHeader>
                  <Shield className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Anxiety & Depression</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Comprehensive treatment for anxiety disorders, depression, and mood disorders using proven methods.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardHeader>
                  <Users className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Telehealth Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Convenient virtual appointments from the comfort of your home throughout Florida.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-card">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-sans font-bold mb-6">
                  Why Choose Empathy Health Clinic?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We're dedicated to providing the highest quality mental health care to the Kissimmee community with compassion, expertise, and convenience.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Board-Certified Providers</h3>
                      <p className="text-muted-foreground">
                        Our psychiatrists and therapists are fully licensed and maintain the highest professional standards.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Same-Week Appointments</h3>
                      <p className="text-muted-foreground">
                        We understand mental health can't wait. Get the care you need quickly with appointments available within days.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Insurance Accepted</h3>
                      <p className="text-muted-foreground">
                        We accept most major insurance plans including Medicaid, Medicare, and private insurance to make care accessible.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Heart className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Personalized Treatment</h3>
                      <p className="text-muted-foreground">
                        Every patient receives an individualized treatment plan designed specifically for their unique needs and goals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6">Get Started Today</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Phone className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold">Call Us</h4>
                    </div>
                    <a 
                      href="tel:+13868488751" 
                      className="text-2xl font-bold text-primary hover:underline"
                      onClick={handlePhoneClick}
                      data-testid="link-phone"
                    >
                      (386) 848-8751
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Monday - Friday: 8:00 AM - 6:00 PM
                    </p>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold">Email Us</h4>
                    </div>
                    <a 
                      href="mailto:providers@empathyhealthclinic.com" 
                      className="text-primary hover:underline"
                      onClick={handleEmailClick}
                      data-testid="link-email"
                    >
                      providers@empathyhealthclinic.com
                    </a>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold">Main Office</h4>
                    </div>
                    <p className="text-muted-foreground">
                      1000 W Broadway St Suite 103<br />
                      Oviedo, FL 32765
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Conveniently located near Kissimmee
                    </p>
                  </div>

                  <Button 
                    asChild 
                    className="w-full" 
                    size="lg"
                    data-testid="button-schedule"
                  >
                    <Link href="/request-appointment">
                      Schedule Your Appointment
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <KissimmeeTeamSection />

        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4">
                Conditions We Treat
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our experienced team provides expert care for a wide range of mental health conditions
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Depression",
                "Anxiety Disorders",
                "ADHD",
                "Bipolar Disorder",
                "PTSD & Trauma",
                "OCD",
                "Panic Disorder",
                "Social Anxiety",
                "Grief & Loss",
                "Stress Management",
                "Sleep Disorders",
                "Relationship Issues"
              ].map((condition, index) => (
                <div 
                  key={index}
                  className="border rounded-lg p-4 text-center hover-elevate"
                  data-testid={`condition-${index}`}
                >
                  <CheckCircle className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="font-medium">{condition}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Suspense fallback={<div className="py-20" />}>
          <TestimonialsSection limit={3} />
        </Suspense>

        <section id="insurance" className="py-16 md:py-20 bg-card">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <InsuranceSection />
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-6">
              Serving the Kissimmee Community
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Empathy Health Clinic is proud to serve patients throughout Kissimmee, St. Cloud, Poinciana, and all of Osceola County. Whether you're seeking help for yourself or a loved one, our compassionate team is here to support your mental health journey.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                asChild
                data-testid="button-cta-appointment"
              >
                <Link href="/request-appointment">
                  Schedule an Appointment
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                asChild
                data-testid="button-cta-call"
              >
                <a 
                  href="tel:+13868488751"
                  onClick={handlePhoneClick}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call (386) 848-8751
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
