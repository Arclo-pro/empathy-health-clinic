import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RefreshCw, CheckCircle, Phone, Clock, Users, Award } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
const forestBg = "/site-assets/stock_images/misty_forest_morning_dffbe3b2.jpg";
import { trackEvent } from "@/lib/analytics";

const symptoms = [
  "Intrusive, unwanted thoughts, images, or urges (obsessions)",
  "Repetitive behaviors or mental acts performed to reduce anxiety (compulsions)",
  "Excessive hand washing, cleaning, or fear of contamination",
  "Repeated checking (locks, appliances, safety)",
  "Need for symmetry, order, or exactness",
  "Intrusive thoughts about harm, religion, or taboo subjects",
  "Spending significant time on rituals—often an hour or more daily",
  "Distress when unable to perform compulsions"
];

const treatments = [
  {
    title: "Exposure and Response Prevention (ERP)",
    description: "The gold-standard therapy for OCD. Gradually face fears while resisting compulsions, rewiring the brain's response to anxiety triggers."
  },
  {
    title: "Medication Management",
    description: "SSRIs at higher doses are often effective for OCD. Your psychiatrist will work with you to find the right medication and dosage."
  },
  {
    title: "Cognitive Behavioral Therapy (CBT)",
    description: "Learn to identify and challenge the distorted thinking patterns that fuel obsessions and compulsions."
  },
  {
    title: "Comprehensive Care Coordination",
    description: "Our psychiatrists and therapists work together to provide integrated treatment addressing all aspects of OCD."
  }
];

const faqs = [
  {
    question: "What's the difference between OCD and being 'particular'?",
    answer: "Many people like things a certain way, but OCD involves obsessions (intrusive, unwanted thoughts that cause significant distress) and compulsions (behaviors performed to reduce that distress). OCD takes up significant time (often 1+ hours daily) and interferes with daily life, work, or relationships."
  },
  {
    question: "What is ERP therapy and why is it recommended for OCD?",
    answer: "ERP (Exposure and Response Prevention) is the most effective therapy for OCD. It involves gradually exposing yourself to feared situations while resisting the urge to perform compulsions. Over time, your brain learns that the feared outcomes don't happen and the anxiety naturally decreases. It's challenging but highly effective."
  },
  {
    question: "What medications help with OCD?",
    answer: "SSRIs like fluoxetine (Prozac), fluvoxamine (Luvox), sertraline (Zoloft), and paroxetine (Paxil) are FDA-approved for OCD and typically used at higher doses than for depression. Clomipramine (Anafranil) is also effective. Your psychiatrist will recommend the best option for you."
  },
  {
    question: "How long does OCD treatment take?",
    answer: "ERP therapy typically involves 12-20 sessions, though complex cases may require longer treatment. Medications usually take 8-12 weeks to show full effect for OCD (longer than for depression). Most patients see significant improvement with proper treatment."
  },
  {
    question: "Can OCD be cured?",
    answer: "While OCD is a chronic condition, it's highly treatable. Many people achieve significant reduction in symptoms to the point where OCD no longer significantly impacts their lives. Ongoing maintenance—whether through periodic therapy boosters or medication—helps maintain progress."
  },
  {
    question: "Do you treat 'pure O' OCD?",
    answer: "Yes, we treat all forms of OCD including 'pure O' (primarily obsessional OCD where compulsions are mostly mental rather than visible behaviors). This includes intrusive thoughts about harm, relationships, sexuality, religion, and other themes. ERP can be adapted for these presentations."
  },
  {
    question: "What if I've tried treatment before and it didn't work?",
    answer: "Many people with OCD receive inadequate treatment initially—often therapy that isn't ERP or medication at too low a dose. If previous treatment didn't help, we can evaluate what was tried and recommend evidence-based approaches that may be more effective."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalCondition",
  "name": "Obsessive-Compulsive Disorder",
  "alternateName": ["OCD"],
  "description": "OCD is a mental health disorder characterized by unwanted, intrusive thoughts (obsessions) and repetitive behaviors (compulsions) performed to reduce anxiety.",
  "possibleTreatment": [
    {
      "@type": "MedicalTherapy",
      "name": "Exposure and Response Prevention",
      "description": "Gold-standard therapy for OCD involving gradual exposure to fears"
    },
    {
      "@type": "MedicalTherapy",
      "name": "Medication Management",
      "description": "SSRIs and other medications to manage OCD symptoms"
    }
  ],
  "signOrSymptom": [
    "Obsessive thoughts",
    "Compulsive behaviors",
    "Anxiety",
    "Time-consuming rituals"
  ]
};

export default function WhatWeTreatOCD() {
  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'WhatWeTreatOCD', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="OCD Treatment Orlando FL | Psychiatrist & Therapy"
        description="Expert OCD treatment in Orlando, FL. ERP therapy, medication management, and comprehensive psychiatric care for obsessive-compulsive disorder. Call 386-848-8751."
        keywords={["OCD treatment Orlando", "OCD psychiatrist Orlando FL", "ERP therapy Orlando", "obsessive compulsive disorder treatment", "OCD therapist Orlando", "OCD medication management"]}
        canonicalPath="/what-we-treat/ocd"
        jsonLd={jsonLd}
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
              <RefreshCw className="h-5 w-5 text-white" />
              <span className="text-white/90 text-sm font-medium">OCD Treatment</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 text-white" data-testid="text-page-title">
              OCD Treatment in Orlando, FL
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Break free from obsessions and compulsions with evidence-based OCD treatment. Our specialized team offers ERP therapy, medication management, and comprehensive psychiatric care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild data-testid="button-hero-appointment">
                <Link href="/request-appointment">Start OCD Treatment</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-background/20 backdrop-blur-sm border-white/30 text-white"
                asChild
                onClick={handlePhoneClick}
                data-testid="button-hero-phone"
              >
                <a href="tel:3868488751">
                  <Phone className="h-5 w-5 mr-2" />
                  Call 386-848-8751
                </a>
              </Button>
            </div>
          </div>
        </div>

        <section className="py-16 md:py-20 bg-card border-y">
          <div className="container mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-6">
              What is OCD?
            </h2>
            <div className="prose prose-lg max-w-none text-foreground">
              <p className="leading-relaxed mb-6">
                Obsessive-Compulsive Disorder (OCD) is a mental health condition characterized by unwanted, intrusive thoughts (obsessions) and repetitive behaviors or mental acts (compulsions) performed to reduce the anxiety caused by those thoughts. OCD affects about 2-3% of the population and can be severely debilitating without proper treatment.
              </p>
              <p className="leading-relaxed mb-6">
                OCD is not about being "neat" or "organized"—it's a serious condition that causes significant distress and can consume hours of a person's day. Common themes include contamination fears, harm obsessions, religious/moral concerns, and the need for symmetry or exactness.
              </p>
              <p className="leading-relaxed">
                The good news is that OCD is highly treatable. At Empathy Health Clinic, our <Link href="/team" className="text-primary hover:underline font-medium">experienced team</Link> provides evidence-based OCD treatment including ERP therapy and medication management to help you regain control of your life.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4 text-center">
              Common OCD Symptoms
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              OCD manifests differently in each person. These are common signs that may indicate OCD is present.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {symptoms.map((symptom, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-card">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{symptom}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-card border-y">
          <div className="container mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4 text-center">
              Our OCD Treatment Approach
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              We use evidence-based treatments proven most effective for OCD.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {treatments.map((treatment, index) => (
                <Card key={index} data-testid={`card-treatment-${index}`}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">{treatment.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{treatment.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4 text-center">
              Why Choose Us for OCD Treatment?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">OCD Expertise</h3>
                <p className="text-muted-foreground">Our providers have specialized training in evidence-based OCD treatment.</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Prompt Access</h3>
                <p className="text-muted-foreground">Get started with treatment quickly—don't wait months for help.</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Integrated Approach</h3>
                <p className="text-muted-foreground">Therapy and medication work together for optimal outcomes.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-card border-y">
          <div className="container mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions About OCD Treatment
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} data-testid={`faq-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-12 bg-background border-b">
          <div className="container mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-2xl font-sans font-bold text-foreground mb-6 text-center">
              Related Conditions & Services
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/what-we-treat/anxiety">
                <Button variant="outline" size="sm" data-testid="link-anxiety">Anxiety Treatment</Button>
              </Link>
              <Link href="/what-we-treat/depression">
                <Button variant="outline" size="sm" data-testid="link-depression">Depression Treatment</Button>
              </Link>
              <Link href="/cognitive-behavioral-therapy">
                <Button variant="outline" size="sm" data-testid="link-cbt">CBT Therapy</Button>
              </Link>
              <Link href="/what-we-treat">
                <Button variant="outline" size="sm" data-testid="link-conditions">All Conditions</Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="sm" data-testid="link-services">Our Services</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-6">
              Take Control of OCD Today
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              You don't have to live controlled by obsessions and compulsions. Our experienced team is ready to help you break free and live the life you want.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild data-testid="button-cta-appointment">
                <Link href="/request-appointment">Schedule Appointment</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-transparent border-white/30 text-white hover:bg-white/10"
                asChild
                onClick={handlePhoneClick}
                data-testid="button-cta-phone"
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
