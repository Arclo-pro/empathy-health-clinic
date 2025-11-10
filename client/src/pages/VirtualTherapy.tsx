import { Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { CheckCircle2, Monitor, Shield, Calendar, Clock, Video, Loader2, Phone, Star, CheckCircle, Users, Brain, Stethoscope } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import type { TeamMember } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import heroImage from "@assets/stock_images/professional_healthc_955227e9.jpg";
import { trackEvent } from "@/lib/analytics";

const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));

export default function VirtualTherapy() {
  const { data: allTeamMembers, isLoading: loadingTeam } = useQuery<TeamMember[]>({
    queryKey: ["/api/team-members"],
  });

  const { data: testimonials } = useQuery<{ id: string; name: string; rating: number; text: string; date: string; verified: boolean; }[]>({
    queryKey: ["/api/testimonials"],
  });

  // Filter out Dr. Glenn from virtual visits
  const teamMembers = allTeamMembers?.filter(member => member.slug !== 'dr-robert-glenn');
  const featuredMembers = teamMembers?.slice(0, 4);
  const featuredTestimonials = testimonials?.slice(0, 3);

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Virtual Therapy Page', '386-848-8751');
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "MedicalBusiness"],
    "name": "Empathy Health Clinic - Virtual Psychiatry & Therapy Services",
    "description": "Online psychiatry and therapy services throughout Florida. Secure telehealth appointments for medication management, therapy, and mental health treatment.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "telephone": "+1-386-848-8751",
    "url": window.location.origin,
    "availableService": {
      "@type": "MedicalTherapy",
      "name": "Virtual Psychiatry and Therapy"
    },
    "areaServed": {
      "@type": "State",
      "name": "Florida"
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Virtual Psychiatry & Therapy Florida | Telehealth Mental Health"
        description="Online psychiatry and therapy throughout Florida. Secure telehealth appointments for medication management, counseling, and mental health treatment. Same-week availability. Most insurance accepted."
        keywords={["virtual psychiatry Florida", "telehealth psychiatry", "online therapy Florida", "virtual mental health", "telepsychiatry Orlando", "online psychiatrist Florida", "blue cross blue shield telehealth psychiatry", "cigna therapy online", "virtual EMDR therapy"]}
        canonicalPath="/virtual-therapy"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative py-20 px-4">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
          </div>
          <div className="container mx-auto max-w-6xl relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/90 mb-4">
              <Monitor className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 text-white" data-testid="text-page-title">
              Virtual Psychiatry & Therapy Across Florida
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Get professional mental health care from home. Secure, convenient telehealth appointments with licensed psychiatrists and therapists throughout Florida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white"
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
                <span>Serving All of Florida</span>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Section */}
        <InsuranceSection />

        {/* Services Section */}
        <section className="py-16 md:py-20 bg-card border-y">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
                Comprehensive Virtual Mental Health Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Expert psychiatric and therapy services from the comfort of your home
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Stethoscope className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Virtual Psychiatry</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Psychiatric evaluations online</span>
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
                  <CardTitle>Online Therapy</CardTitle>
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
                  <CardTitle>Telehealth Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>HIPAA-secure video platform</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Evening & weekend appointments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>No travel required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Same-week availability</span>
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

        {/* Team Section */}
        <section className="py-16 md:py-20 bg-background border-y">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-center mb-4">
              Meet Our Virtual Providers
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Board-certified psychiatrists and licensed therapists available via secure telehealth
            </p>
            
            {loadingTeam ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
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
                    Telehealth appointments available throughout Florida
                  </p>
                </div>
              </>
            )}
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
                Professional, secure telehealth mental health care
              </p>
            </div>
            <TrustFactors />
          </div>
        </section>

        {/* Trust Badges */}
        <ReviewsAndBadges />

        {/* Testimonials Section */}
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
                Trusted by hundreds of patients throughout Florida
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-card border-y">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
              Ready to Start Virtual Therapy?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Schedule your secure telehealth appointment today. Same-week availability with board-certified psychiatrists and licensed therapists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                data-testid="button-cta-phone"
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
                data-testid="button-cta-appointment"
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
