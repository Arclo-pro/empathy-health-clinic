import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckCircle, Phone, Clock, Users, Award } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
const forestBg = "/site-assets/stock_images/misty_forest_morning_dffbe3b2.webp";
import { trackEvent } from "@/lib/analytics";

const symptoms = [
  "Persistent worry that's difficult to control",
  "Restlessness or feeling on edge",
  "Difficulty concentrating or mind going blank",
  "Irritability and mood changes",
  "Muscle tension and physical discomfort",
  "Sleep disturbances or insomnia",
  "Panic attacks with rapid heartbeat and shortness of breath",
  "Avoidance of social situations or specific triggers"
];

const treatments = [
  {
    title: "Cognitive Behavioral Therapy (CBT)",
    description: "Evidence-based therapy that helps identify and change negative thought patterns and behaviors contributing to anxiety."
  },
  {
    title: "Medication Management",
    description: "When appropriate, our psychiatrists prescribe anti-anxiety medications, SSRIs, or other medications to help manage symptoms."
  },
  {
    title: "Exposure Therapy",
    description: "Gradual, controlled exposure to anxiety-provoking situations to reduce fear responses and build confidence."
  },
  {
    title: "Mindfulness & Relaxation",
    description: "Practical techniques including breathing exercises, progressive muscle relaxation, and mindfulness practices."
  }
];

const faqs = [
  {
    question: "What types of anxiety disorders do you treat?",
    answer: "We treat all types of anxiety disorders including Generalized Anxiety Disorder (GAD), panic disorder, social anxiety disorder, specific phobias, agoraphobia, and separation anxiety. Our psychiatrists and therapists have extensive experience treating the full spectrum of anxiety conditions."
  },
  {
    question: "How do I know if I have an anxiety disorder vs normal anxiety?",
    answer: "While everyone experiences anxiety occasionally, an anxiety disorder is characterized by persistent, excessive worry that interferes with daily activities, relationships, or work performance. If your anxiety is affecting your quality of life, lasting for extended periods, or causing physical symptoms, it may be time to seek professional help."
  },
  {
    question: "What medications are used for anxiety treatment?",
    answer: "Common medications for anxiety include SSRIs (like Lexapro and Zoloft), SNRIs (like Effexor and Cymbalta), benzodiazepines for short-term relief, and buspirone. Your psychiatrist will recommend the most appropriate medication based on your specific symptoms and medical history."
  },
  {
    question: "How long does anxiety treatment take?",
    answer: "Treatment duration varies depending on the severity of symptoms and individual response. Many patients notice improvement within 4-8 weeks of starting treatment. Therapy typically involves 12-20 sessions, though some patients benefit from longer-term support."
  },
  {
    question: "Can anxiety be cured completely?",
    answer: "While anxiety may not be 'cured' in the traditional sense, it can be effectively managed so that symptoms no longer significantly impact your life. Many patients achieve long-term remission with proper treatment and develop skills to manage anxiety independently."
  },
  {
    question: "Do you offer telehealth appointments for anxiety treatment?",
    answer: "Yes, we offer convenient telehealth appointments for patients throughout Florida. Virtual therapy and medication management sessions are highly effective for treating anxiety disorders and provide added flexibility for busy schedules."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalCondition",
  "name": "Anxiety Disorder",
  "alternateName": ["Generalized Anxiety Disorder", "GAD", "Panic Disorder", "Social Anxiety"],
  "description": "Anxiety disorders involve excessive fear or worry that interferes with daily activities and well-being.",
  "possibleTreatment": [
    {
      "@type": "MedicalTherapy",
      "name": "Cognitive Behavioral Therapy",
      "description": "Evidence-based therapy for anxiety disorders"
    },
    {
      "@type": "MedicalTherapy",
      "name": "Medication Management",
      "description": "SSRIs, SNRIs, and other medications to manage anxiety symptoms"
    }
  ],
  "signOrSymptom": [
    "Excessive worry",
    "Panic attacks",
    "Avoidance behavior",
    "Physical tension"
  ]
};

export default function WhatWeTreatAnxiety() {
  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'WhatWeTreatAnxiety', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Anxiety Treatment Orlando FL | Therapy & Medication"
        description="Expert anxiety treatment in Orlando, FL. Therapy and medication management for GAD, panic disorder, social anxiety & phobias. Board-certified psychiatrists. Call 386-848-8751."
        keywords={["anxiety treatment Orlando", "anxiety therapist Orlando FL", "panic disorder treatment", "social anxiety Orlando", "anxiety medication management", "GAD treatment Orlando"]}
        canonicalPath="/what-we-treat/anxiety"
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
              <AlertTriangle className="h-5 w-5 text-white" />
              <span className="text-white/90 text-sm font-medium">Anxiety Treatment</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 text-white" data-testid="text-page-title">
              Anxiety Treatment in Orlando, FL
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Find relief from anxiety with compassionate, evidence-based treatment. Our expert team provides therapy and medication management for all types of anxiety disorders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild data-testid="button-hero-appointment">
                <Link href="/request-appointment">Start Anxiety Treatment</Link>
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
              What is Anxiety?
            </h2>
            <div className="prose prose-lg max-w-none text-foreground">
              <p className="leading-relaxed mb-6">
                Anxiety disorders are among the most common mental health conditions, affecting over 40 million adults in the United States. While everyone experiences anxiety from time to time, anxiety disorders involve persistent, excessive fear or worry that doesn't go away and can worsen over time.
              </p>
              <p className="leading-relaxed mb-6">
                There are several types of anxiety disorders, including Generalized Anxiety Disorder (GAD), panic disorder, social anxiety disorder, and specific phobias. Each type has unique characteristics, but all respond well to proper treatment.
              </p>
              <p className="leading-relaxed">
                At Empathy Health Clinic, our <Link href="/team" className="text-primary hover:underline font-medium">board-certified psychiatrists</Link> and licensed therapists specialize in treating anxiety disorders using a combination of therapy, medication when appropriate, and practical coping strategies.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4 text-center">
              Common Anxiety Symptoms
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              Anxiety can manifest in many ways. If you regularly experience several of these symptoms, professional treatment can help.
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
              Our Anxiety Treatment Approach
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              We use evidence-based treatments proven effective for anxiety disorders.
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
              Why Choose Us for Anxiety Treatment?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Specialized Expertise</h3>
                <p className="text-muted-foreground">Our providers have advanced training in anxiety disorder treatment.</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Quick Access to Care</h3>
                <p className="text-muted-foreground">Same-week appointments available. Don't wait to get the help you need.</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Integrated Care</h3>
                <p className="text-muted-foreground">Our psychiatrists and therapists collaborate for comprehensive treatment.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-card border-y">
          <div className="container mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions About Anxiety Treatment
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
              <Link href="/what-we-treat/depression">
                <Button variant="outline" size="sm" data-testid="link-depression">Depression Treatment</Button>
              </Link>
              <Link href="/what-we-treat/ptsd">
                <Button variant="outline" size="sm" data-testid="link-ptsd">PTSD Treatment</Button>
              </Link>
              <Link href="/what-we-treat/ocd">
                <Button variant="outline" size="sm" data-testid="link-ocd">OCD Treatment</Button>
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
              Start Your Journey to Relief Today
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              You don't have to live with overwhelming anxiety. Our compassionate team is here to help you find peace and regain control of your life.
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
