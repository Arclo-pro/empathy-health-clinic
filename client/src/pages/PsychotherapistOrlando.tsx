import { useQuery } from "@tanstack/react-query";
import { Phone, CheckCircle2, Clock, Shield, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import type { TeamMember, InsuranceProvider, Testimonial } from "@shared/schema";
import InternalLinkBlock from "@/components/InternalLinkBlock";

export default function PsychotherapistOrlando() {
  const { data: teamMembers } = useQuery<TeamMember[]>({
    queryKey: ["/api/team-members"],
  });

  const { data: insuranceProviders } = useQuery<InsuranceProvider[]>({
    queryKey: ["/api/insurance-providers"],
  });

  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const therapists = teamMembers || [];

  const localTestimonials = testimonials?.slice(0, 3) || [];

  const faqs = [
    {
      question: "How much does a psychotherapist cost in Orlando?",
      answer: "We accept most major insurance plans, making therapy affordable for Orlando residents. Self-pay rates start at $150 per session. We also offer sliding scale fees for qualifying patients. Contact us for a free insurance verification."
    },
    {
      question: "Do you offer virtual psychotherapy sessions?",
      answer: "Yes! We provide both in-person sessions at our Orlando area office and secure telehealth appointments throughout Florida. Virtual sessions offer the same quality care with added convenience."
    },
    {
      question: "What conditions do your psychotherapists treat?",
      answer: "Our licensed psychotherapists in Orlando specialize in treating anxiety, depression, PTSD, bipolar disorder, ADHD, OCD, relationship issues, stress management, grief, and more using evidence-based approaches."
    },
    {
      question: "How quickly can I see a psychotherapist?",
      answer: "Most new patients in the Orlando area can schedule their first appointment within 2-3 business days. We offer flexible scheduling including evening and weekend appointments."
    },
    {
      question: "Are your psychotherapists licensed in Florida?",
      answer: "Yes, all our psychotherapists are licensed and credentialed in Florida. Our team includes board-certified psychiatric nurse practitioners and licensed therapists with extensive experience treating Central Florida residents."
    }
  ];

  const approaches = [
    { name: "Cognitive Behavioral Therapy (CBT)", description: "Evidence-based approach for anxiety, depression, and trauma" },
    { name: "Dialectical Behavior Therapy (DBT)", description: "Effective for emotional regulation and relationship skills" },
    { name: "Psychodynamic Therapy", description: "Explores unconscious patterns and childhood experiences" },
    { name: "Solution-Focused Therapy", description: "Goal-oriented approach for practical problem-solving" },
    { name: "Mindfulness-Based Therapy", description: "Incorporates meditation and present-moment awareness" },
    { name: "Trauma-Informed Care", description: "Specialized treatment for PTSD and complex trauma" }
  ];

  const jsonLdFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const jsonLdLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Empathy Health Clinic - Psychotherapy Services Orlando",
    "image": "https://empathyhealthclinic.com/logo.png",
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
      "latitude": 28.610653,
      "longitude": -81.359379
    },
    "telephone": "+1-386-848-8751",
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "127"
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Psychotherapist Orlando | Licensed Therapy | Same-Week Apts"
        description="Psychotherapist in Orlando accepting new patients. Licensed therapists for anxiety, depression & trauma. Insurance accepted. Same-week apts. 386-848-8751."
        keywords={[
          "psychotherapist orlando",
          "psychotherapist orlando fl",
          "licensed psychotherapist orlando",
          "therapist orlando",
          "counseling orlando",
          "psychotherapy orlando",
          "mental health orlando",
          "orlando therapist"
        ]}
        canonicalPath="/psychotherapist-orlando"
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
      />

      <SiteHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 py-16 px-4 border-b">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center max-w-4xl mx-auto mb-8">
              <Badge className="mb-4" data-testid="badge-accepting-patients">
                <Clock className="h-3 w-3 mr-1" />
                Accepting New Patients - Most Seen Within 2-3 Days
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6" data-testid="text-hero-title">
                Psychotherapist in Orlando
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-6" data-testid="text-hero-subtitle">
                Need a psychotherapist in Orlando? Our licensed therapists provide evidence-based care for anxiety, depression, trauma & relationships. Same-week appointments available.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="font-medium">Most Insurance Accepted</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="font-medium">In-Person & Virtual Sessions</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="font-medium">HIPAA Compliant</span>
                </div>
              </div>
              
              <div className="flex justify-center items-center gap-4 mb-2">
                <Button size="lg" asChild data-testid="button-call-now">
                  <a href="tel:3868488751" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Call 386-848-8751
                  </a>
                </Button>
                <span className="text-muted-foreground font-medium">or</span>
              </div>
            </div>

            {/* Hero Lead Form - Above the Fold */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-card border rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-4 text-center">
                  Request Your First Appointment
                </h3>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Most new patients seen within 2-3 days • Free insurance verification
                </p>
              </div>
            </div>

            {/* Insurance Badges */}
            {insuranceProviders && insuranceProviders.length > 0 && (
              <div className="bg-card border rounded-lg p-6 max-w-4xl mx-auto">
                <p className="text-sm font-medium text-center mb-4 text-muted-foreground">
                  We Accept Most Major Insurance Plans Including:
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {insuranceProviders.slice(0, 8).map((provider) => (
                    <Badge key={provider.id} variant="secondary" data-testid={`badge-insurance-${provider.slug}`}>
                      {provider.name}
                    </Badge>
                  ))}
                  {insuranceProviders.length > 8 && (
                    <Badge variant="secondary">+{insuranceProviders.length - 8} more</Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Our Orlando Psychotherapists */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-why-choose-title">
                Why Choose Our Orlando Psychotherapists?
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our licensed psychotherapists provide comprehensive mental health care to the Orlando community with proven, evidence-based treatment approaches.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-2">Licensed & Credentialed</h3>
                      <p className="text-muted-foreground text-sm">
                        All psychotherapists are fully licensed in Florida and credentialed with major insurance providers.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-2">5-Star Rated Care</h3>
                      <p className="text-muted-foreground text-sm">
                        Trusted by hundreds of Orlando residents with consistently excellent reviews and outcomes.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-2">Flexible Scheduling</h3>
                      <p className="text-muted-foreground text-sm">
                        Evening and weekend appointments available. Most new patients seen within 2-3 days.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-2">Orlando Area Location</h3>
                      <p className="text-muted-foreground text-sm">
                        Conveniently located serving Orlando, Winter Park, and all of Central Florida.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-2">Insurance Accepted</h3>
                      <p className="text-muted-foreground text-sm">
                        We work with most major insurance plans to make quality psychotherapy affordable.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-2">Telehealth Available</h3>
                      <p className="text-muted-foreground text-sm">
                        Secure virtual sessions from the comfort of your home anywhere in Florida.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Orlando Psychotherapists */}
        {therapists.length > 0 && (
          <section className="py-16 px-4 bg-muted/30">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-team-title">
                  Meet Your Orlando Psychotherapists
                </h2>
                <p className="text-lg text-muted-foreground">
                  Experienced, compassionate mental health professionals dedicated to your wellbeing
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {therapists.map((member) => (
                  <Card key={member.id} className="hover-elevate" data-testid={`card-therapist-${member.id}`}>
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-3xl font-bold text-primary">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                        <p className="text-sm text-primary font-medium mb-2">{member.credentials}</p>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-4">{member.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Evidence-Based Therapeutic Approaches */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-approaches-title">
                Evidence-Based Psychotherapy Approaches We Use
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our Orlando psychotherapists are trained in scientifically-validated treatment methods proven to help with anxiety, depression, trauma, and other mental health conditions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {approaches.map((approach, index) => (
                <Card key={index} className="hover-elevate" data-testid={`card-approach-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-foreground mb-2">{approach.name}</h3>
                        <p className="text-muted-foreground text-sm">{approach.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What Our Orlando Patients Say */}
        {localTestimonials.length > 0 && (
          <section className="py-16 px-4 bg-muted/30">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-testimonials-title">
                  What Our Orlando Patients Say
                </h2>
                <p className="text-lg text-muted-foreground">
                  Real stories from Central Florida residents who've transformed their lives through psychotherapy
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {localTestimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="hover-elevate" data-testid={`card-testimonial-${testimonial.id}`}>
                    <CardContent className="p-6">
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                      <p className="font-medium text-foreground">— {testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">Orlando, FL</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-faq-title">
                Frequently Asked Questions About Psychotherapy in Orlando
              </h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="hover-elevate" data-testid={`card-faq-${index}`}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Location Map */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-location-title">
                Serving Orlando & Central Florida
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Conveniently located in the Winter Park area, serving Orlando and surrounding communities
              </p>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-medium">2281 Lee Rd Suite 102, Winter Park, FL 32810</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <Phone className="h-5 w-5 text-primary" />
                  <a href="tel:3868488751" className="font-medium hover:text-primary transition-colors">
                    386-848-8751
                  </a>
                </div>
                <p className="text-muted-foreground text-sm">
                  providers@empathyhealthclinic.com
                </p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0947843928326!2d-81.35937892421968!3d28.610653475683654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e7700b8b8b8b8b%3A0x1234567890abcdef!2s2281%20Lee%20Rd%20%23102%2C%20Winter%20Park%2C%20FL%2032810!5e0!3m2!1sen!2sus!4v1234567890123"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Empathy Health Clinic - 2281 Lee Rd Suite 102, Winter Park, FL 32810"
                data-testid="map-location"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="py-16 px-4 scroll-mt-24">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="text-form-title">
                  Schedule Your First Session with an Orlando Psychotherapist
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Take the first step toward better mental health. Our compassionate psychotherapists are here to help you navigate life's challenges with proven, evidence-based treatment.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Free Insurance Verification</p>
                      <p className="text-sm text-muted-foreground">We'll check your coverage before your first visit</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Fast Appointment Scheduling</p>
                      <p className="text-sm text-muted-foreground">Most patients seen within 2-3 business days</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Confidential & HIPAA Compliant</p>
                      <p className="text-sm text-muted-foreground">Your privacy is protected by federal law</p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 border-l-4 border-primary rounded-r-lg p-4">
                  <p className="text-sm font-medium text-foreground mb-2">
                    🎯 Most Insurance Plans Accepted
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We work with Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, Humana, Medicare, and more. Self-pay options also available.
                  </p>
                </div>
              </div>

              <div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <InternalLinkBlock 
              category="services"
              title="Related Services"
              variant="list"
            />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
