import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Heart, CheckCircle, Phone, Clock, Users, Award } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
const forestBg = "/site-assets/stock_images/misty_forest_morning_dffbe3b2.webp";
import { trackEvent } from "@/lib/analytics";

const symptoms = [
  "Intrusive memories, flashbacks, or nightmares about the trauma",
  "Avoiding people, places, or situations that remind you of the event",
  "Negative changes in mood—feeling detached, hopeless, or emotionally numb",
  "Hypervigilance and being easily startled",
  "Difficulty sleeping or concentrating",
  "Irritability, angry outbursts, or aggressive behavior",
  "Feelings of guilt, shame, or self-blame",
  "Loss of interest in activities you used to enjoy"
];

const treatments = [
  {
    title: "Trauma-Focused Therapy",
    description: "Evidence-based approaches including Cognitive Processing Therapy (CPT) and Prolonged Exposure (PE) to process traumatic memories safely."
  },
  {
    title: "EMDR Therapy",
    description: "Eye Movement Desensitization and Reprocessing helps the brain reprocess traumatic memories to reduce their emotional impact."
  },
  {
    title: "Medication Management",
    description: "When appropriate, medications like SSRIs and prazosin can help manage symptoms including anxiety, depression, and nightmares."
  },
  {
    title: "Integrated Care",
    description: "Combination of therapy and psychiatric care, coordinated by our team to address all aspects of PTSD recovery."
  }
];

const faqs = [
  {
    question: "What causes PTSD?",
    answer: "PTSD can develop after experiencing or witnessing a traumatic event such as combat, assault, accidents, natural disasters, or other life-threatening situations. Not everyone who experiences trauma develops PTSD—factors like the severity of the event, personal history, and available support all play a role."
  },
  {
    question: "How long after a trauma can PTSD develop?",
    answer: "PTSD symptoms typically begin within 3 months of the traumatic event, but they can sometimes appear years later. Symptoms must last more than a month and be severe enough to interfere with daily life to be diagnosed as PTSD."
  },
  {
    question: "What is EMDR therapy and how does it work?",
    answer: "EMDR (Eye Movement Desensitization and Reprocessing) is a therapy that uses bilateral stimulation (typically eye movements) while you recall traumatic memories. This helps the brain process the trauma differently, reducing the emotional intensity of the memories. It's been extensively researched and is highly effective for PTSD."
  },
  {
    question: "What medications help with PTSD?",
    answer: "SSRIs like sertraline (Zoloft) and paroxetine (Paxil) are FDA-approved for PTSD and can help with depression, anxiety, and sleep problems. Prazosin is often used for trauma-related nightmares. Your psychiatrist will recommend medications based on your specific symptoms."
  },
  {
    question: "How long does PTSD treatment take?",
    answer: "Treatment duration varies, but many people see significant improvement within 12-16 weeks of trauma-focused therapy. Some patients benefit from longer-term treatment, especially for complex trauma. Our goal is lasting recovery, not just symptom management."
  },
  {
    question: "Can PTSD be cured?",
    answer: "While 'cure' may not be the right term, PTSD is highly treatable. Many people recover fully and no longer meet criteria for PTSD after treatment. Others learn to manage symptoms effectively and live fulfilling lives. Early treatment generally leads to better outcomes."
  },
  {
    question: "Do you treat veterans with PTSD?",
    answer: "Yes, we have experience treating veterans and active-duty military personnel with combat-related PTSD. We understand the unique challenges of military trauma and provide a safe, supportive environment for healing."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalCondition",
  "name": "Post-Traumatic Stress Disorder",
  "alternateName": ["PTSD", "Post-Traumatic Stress"],
  "description": "PTSD is a mental health condition triggered by experiencing or witnessing a traumatic event, characterized by flashbacks, nightmares, severe anxiety, and uncontrollable thoughts about the event.",
  "possibleTreatment": [
    {
      "@type": "MedicalTherapy",
      "name": "EMDR Therapy",
      "description": "Eye Movement Desensitization and Reprocessing for trauma processing"
    },
    {
      "@type": "MedicalTherapy",
      "name": "Trauma-Focused Therapy",
      "description": "Evidence-based therapies including CPT and Prolonged Exposure"
    }
  ],
  "signOrSymptom": [
    "Flashbacks",
    "Nightmares",
    "Hypervigilance",
    "Avoidance"
  ]
};

export default function WhatWeTreatPTSD() {
  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'WhatWeTreatPTSD', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="PTSD Treatment Orlando FL | Trauma Therapy & Psychiatry"
        description="Expert PTSD and trauma treatment in Orlando, FL. EMDR therapy, trauma-focused therapy, and medication management. Board-certified psychiatrists. Call 386-848-8751."
        keywords={["PTSD treatment Orlando", "trauma therapy Orlando FL", "EMDR therapy Orlando", "trauma psychiatrist Orlando", "PTSD therapist Orlando", "veteran PTSD treatment"]}
        canonicalPath="/what-we-treat/ptsd"
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
              <Heart className="h-5 w-5 text-white" />
              <span className="text-white/90 text-sm font-medium">PTSD & Trauma Treatment</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 text-white" data-testid="text-page-title">
              PTSD Treatment in Orlando, FL
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Heal from trauma with compassionate, evidence-based care. Our experienced team offers EMDR, trauma-focused therapy, and psychiatric support to help you reclaim your life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild data-testid="button-hero-appointment">
                <Link href="/request-appointment">Start Trauma Treatment</Link>
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
              What is PTSD?
            </h2>
            <div className="prose prose-lg max-w-none text-foreground">
              <p className="leading-relaxed mb-6">
                Post-Traumatic Stress Disorder (PTSD) is a mental health condition that can develop after experiencing or witnessing a terrifying event. While it's normal to have difficulty coping after trauma, PTSD involves symptoms that persist for months or years and significantly interfere with daily life.
              </p>
              <p className="leading-relaxed mb-6">
                PTSD can affect anyone—veterans, survivors of assault, accident victims, first responders, and others who have experienced trauma. The good news is that PTSD is treatable, and most people who receive proper care experience significant improvement.
              </p>
              <p className="leading-relaxed">
                At Empathy Health Clinic, our <Link href="/team" className="text-primary hover:underline font-medium">trauma-informed team</Link> provides a safe, supportive environment for healing. We use evidence-based treatments including EMDR, trauma-focused therapy, and medication management when appropriate.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4 text-center">
              Common PTSD Symptoms
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              PTSD symptoms fall into four categories: intrusive memories, avoidance, negative changes in thinking and mood, and changes in physical and emotional reactions.
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
              Our PTSD Treatment Approach
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              We offer evidence-based trauma treatments proven effective for PTSD recovery.
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
              Why Choose Us for PTSD Treatment?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Trauma-Informed Care</h3>
                <p className="text-muted-foreground">Our entire team is trained in trauma-informed approaches to ensure your safety and comfort.</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Timely Access</h3>
                <p className="text-muted-foreground">We understand the urgency of trauma. Get started with treatment quickly.</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Integrated Treatment</h3>
                <p className="text-muted-foreground">Therapy and psychiatric care work together for comprehensive recovery.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-card border-y">
          <div className="container mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions About PTSD Treatment
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
              <Link href="/emdr-therapy">
                <Button variant="outline" size="sm" data-testid="link-emdr">EMDR Therapy</Button>
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
              Begin Your Healing Journey Today
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Trauma doesn't have to define your future. Our compassionate team is here to help you heal and move forward with your life.
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
