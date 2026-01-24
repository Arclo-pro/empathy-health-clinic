import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Heart, Frown, Activity, AlertTriangle, RefreshCw, Phone, ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
const forestBg = "/site-assets/stock_images/misty_forest_morning_dffbe3b2.jpg";
import { trackEvent } from "@/lib/analytics";

const conditions = [
  {
    id: "adhd",
    name: "ADHD",
    icon: Brain,
    description: "Comprehensive ADHD evaluation, diagnosis, and treatment for adults and children. Medication management and behavioral strategies.",
    href: "/what-we-treat/adhd"
  },
  {
    id: "anxiety",
    name: "Anxiety",
    icon: AlertTriangle,
    description: "Expert treatment for generalized anxiety, panic disorder, social anxiety, and phobias. Therapy and medication options available.",
    href: "/what-we-treat/anxiety"
  },
  {
    id: "depression",
    name: "Depression",
    icon: Frown,
    description: "Personalized depression treatment including therapy, medication management, and support for treatment-resistant depression.",
    href: "/what-we-treat/depression"
  },
  {
    id: "bipolar",
    name: "Bipolar Disorder",
    icon: Activity,
    description: "Specialized care for Bipolar I and II disorders. Mood stabilization, medication management, and ongoing support.",
    href: "/what-we-treat/bipolar-disorder"
  },
  {
    id: "ptsd",
    name: "PTSD",
    icon: Heart,
    description: "Trauma-focused therapy and psychiatric care for PTSD. EMDR, cognitive processing therapy, and medication support.",
    href: "/what-we-treat/ptsd"
  },
  {
    id: "ocd",
    name: "OCD",
    icon: RefreshCw,
    description: "Evidence-based OCD treatment including ERP therapy, medication management, and comprehensive psychiatric care.",
    href: "/what-we-treat/ocd"
  }
];

export default function WhatWeTreat() {
  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'WhatWeTreat', '386-848-8751');
  };

  const handleConditionClick = (conditionName: string) => {
    trackEvent('condition_card_click', 'navigation', 'WhatWeTreat', conditionName);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Conditions We Treat | Mental Health Treatment Orlando FL"
        description="Comprehensive treatment for ADHD, anxiety, depression, bipolar disorder, PTSD, OCD and more. Board-certified psychiatrists in Orlando, FL. Call 386-848-8751."
        keywords={["mental health treatment Orlando", "ADHD treatment Orlando", "anxiety treatment Orlando FL", "depression psychiatrist Orlando", "bipolar disorder treatment", "PTSD therapy Orlando", "OCD treatment Orlando"]}
        canonicalPath="/what-we-treat"
      />
      <SiteHeader />
      <main className="flex-1">
        <div className="relative py-20 px-4">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${forestBg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
          </div>
          <div className="container mx-auto max-w-6xl relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 text-white" data-testid="text-page-title">
              Conditions We Treat
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Our board-certified psychiatrists and licensed therapists provide comprehensive, evidence-based treatment for a wide range of mental health conditions. We create personalized treatment plans that combine therapy, medication management, and ongoing support.
            </p>
          </div>
        </div>

        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4 text-center">
              Mental Health Conditions We Specialize In
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              Click on any condition below to learn more about our treatment approach and how we can help you or your loved one.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {conditions.map((condition) => (
                <Link 
                  key={condition.id} 
                  href={condition.href}
                  onClick={() => handleConditionClick(condition.name)}
                >
                  <Card 
                    className="h-full hover-elevate cursor-pointer transition-all duration-200"
                    data-testid={`card-condition-${condition.id}`}
                  >
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <condition.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {condition.name}
                        </h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {condition.description}
                      </p>
                      <div className="flex items-center text-primary font-medium">
                        Learn More <ArrowRight className="h-4 w-4 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-card border-y">
          <div className="container mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-6 text-center">
              Our Comprehensive Approach
            </h2>
            <div className="prose prose-lg max-w-none text-foreground">
              <p className="leading-relaxed mb-6">
                At Empathy Health Clinic, we understand that mental health conditions affect every aspect of your life. That's why we take a comprehensive, patient-centered approach to treatment that addresses your unique needs and goals.
              </p>
              <p className="leading-relaxed mb-6">
                Our <Link href="/team" className="text-primary hover:underline font-medium">experienced team</Link> of psychiatrists and therapists collaborate to provide integrated care. Whether you need <Link href="/services" className="text-primary hover:underline font-medium">medication management</Link>, therapy, or a combination of both, we'll work with you to develop a treatment plan that fits your life.
              </p>
              <p className="leading-relaxed">
                We accept most major insurance plans and offer both in-person appointments at our <Link href="/psychiatrist-orlando" className="text-primary hover:underline font-medium">Orlando clinic</Link> and convenient telehealth options for patients throughout Florida.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-8 text-center">
              Explore Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/services">
                <Card className="hover-elevate cursor-pointer h-full" data-testid="link-services">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-foreground mb-2">Our Services</h3>
                    <p className="text-muted-foreground">View all psychiatric and therapy services we offer</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/team">
                <Card className="hover-elevate cursor-pointer h-full" data-testid="link-team">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-foreground mb-2">Meet Our Team</h3>
                    <p className="text-muted-foreground">Board-certified psychiatrists and licensed therapists</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/psychiatrist-orlando">
                <Card className="hover-elevate cursor-pointer h-full" data-testid="link-psychiatrist-orlando">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-foreground mb-2">Orlando Psychiatry</h3>
                    <p className="text-muted-foreground">Learn about our Orlando psychiatric services</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-6">
              Ready to Start Your Mental Health Journey?
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Our compassionate team is here to help. Schedule an appointment today or call us to learn more about our treatment options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                asChild
                data-testid="button-request-appointment"
              >
                <Link href="/request-appointment">Request Appointment</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-transparent border-white/30 text-white hover:bg-white/10"
                asChild
                onClick={handlePhoneClick}
                data-testid="button-call-now"
              >
                <a href="tel:3868488751">
                  <Phone className="h-5 w-5 mr-2" />
                  Call 386-848-8751
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
