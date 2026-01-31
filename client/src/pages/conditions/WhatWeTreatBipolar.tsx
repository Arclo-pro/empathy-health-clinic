import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Activity, CheckCircle, Phone, Clock, Users, Award } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
const forestBg = "/site-assets/stock_images/misty_forest_morning_dffbe3b2.webp";
import { trackEvent } from "@/lib/analytics";

const symptoms = [
  "Manic episodes: elevated mood, increased energy, reduced need for sleep",
  "Depressive episodes: persistent sadness, hopelessness, low energy",
  "Rapid speech and racing thoughts during manic episodes",
  "Impulsive behaviors: overspending, risky decisions, increased activity",
  "Irritability and agitation",
  "Difficulty concentrating and making decisions",
  "Changes in sleep patterns—sleeping too much or too little",
  "Withdrawal from friends, family, and regular activities"
];

const treatments = [
  {
    title: "Mood Stabilizers",
    description: "Medications like lithium, valproate, and lamotrigine that help prevent the extreme highs and lows of bipolar disorder."
  },
  {
    title: "Atypical Antipsychotics",
    description: "Medications that can help manage manic episodes and stabilize mood when combined with mood stabilizers."
  },
  {
    title: "Psychotherapy",
    description: "CBT, psychoeducation, and family therapy to help understand the condition, recognize triggers, and develop coping strategies."
  },
  {
    title: "Ongoing Monitoring",
    description: "Regular appointments to monitor symptoms, adjust medications, and provide support to maintain stability."
  }
];

const faqs = [
  {
    question: "What's the difference between Bipolar I and Bipolar II?",
    answer: "Bipolar I is characterized by manic episodes lasting at least 7 days (or requiring hospitalization) and may include depressive episodes. Bipolar II involves hypomanic episodes (less severe than full mania) and depressive episodes. Both require professional treatment, and our psychiatrists have experience with all bipolar spectrum disorders."
  },
  {
    question: "How is bipolar disorder diagnosed?",
    answer: "Diagnosis involves a comprehensive psychiatric evaluation including detailed discussion of your symptoms, mood history, family history, and ruling out other conditions. There's no blood test for bipolar disorder—diagnosis is based on clinical assessment by an experienced psychiatrist."
  },
  {
    question: "What medications are used to treat bipolar disorder?",
    answer: "Common treatments include mood stabilizers (lithium, valproate, lamotrigine), atypical antipsychotics (quetiapine, olanzapine, aripiprazole), and sometimes antidepressants used carefully with a mood stabilizer. Your psychiatrist will create a personalized medication plan."
  },
  {
    question: "Will I need to take medication for life?",
    answer: "Bipolar disorder is a chronic condition that typically requires long-term treatment. Most patients benefit from ongoing medication to prevent mood episodes. The goal is to find the most effective regimen with minimal side effects to maintain stability and quality of life."
  },
  {
    question: "Can bipolar disorder be managed without medication?",
    answer: "While lifestyle changes, therapy, and support are important components of treatment, medication is typically necessary for managing bipolar disorder effectively. Stopping medication without guidance often leads to relapse. Our team works with you to find treatments that work for your life."
  },
  {
    question: "What should I do if I think I'm having a manic or depressive episode?",
    answer: "Contact our office as soon as possible so we can assess your symptoms and adjust treatment if needed. Having an action plan in place for mood episodes is part of effective bipolar management. For emergencies or suicidal thoughts, call 988 or go to your nearest ER."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalCondition",
  "name": "Bipolar Disorder",
  "alternateName": ["Bipolar I", "Bipolar II", "Manic Depression"],
  "description": "Bipolar disorder is a mental health condition characterized by extreme mood swings including emotional highs (mania or hypomania) and lows (depression).",
  "possibleTreatment": [
    {
      "@type": "MedicalTherapy",
      "name": "Mood Stabilizers",
      "description": "Medications like lithium to prevent extreme mood swings"
    },
    {
      "@type": "MedicalTherapy",
      "name": "Psychotherapy",
      "description": "Therapy to help manage symptoms and develop coping strategies"
    }
  ],
  "signOrSymptom": [
    "Manic episodes",
    "Depressive episodes",
    "Mood swings",
    "Impulsive behavior"
  ]
};

export default function WhatWeTreatBipolar() {
  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'WhatWeTreatBipolar', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Bipolar Disorder Treatment Orlando FL | Expert Psychiatry"
        description="Expert bipolar disorder treatment in Orlando, FL. Board-certified psychiatrists specializing in Bipolar I & II, mood stabilizers, and comprehensive psychiatric care. Call 386-848-8751."
        keywords={["bipolar disorder treatment Orlando", "bipolar psychiatrist Orlando FL", "mood stabilizers Orlando", "Bipolar I treatment", "Bipolar II treatment", "manic depression Orlando"]}
        canonicalPath="/what-we-treat/bipolar-disorder"
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
              <Activity className="h-5 w-5 text-white" />
              <span className="text-white/90 text-sm font-medium">Bipolar Disorder Treatment</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 text-white" data-testid="text-page-title">
              Bipolar Disorder Treatment in Orlando, FL
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Specialized psychiatric care for bipolar disorder. Our experienced team helps you achieve mood stability and improved quality of life through comprehensive treatment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild data-testid="button-hero-appointment">
                <Link href="/request-appointment">Schedule Evaluation</Link>
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
              What is Bipolar Disorder?
            </h2>
            <div className="prose prose-lg max-w-none text-foreground">
              <p className="leading-relaxed mb-6">
                Bipolar disorder is a mental health condition characterized by extreme mood swings that include emotional highs (mania or hypomania) and lows (depression). These mood episodes are more intense than typical mood fluctuations and can significantly impact daily life, relationships, and work.
              </p>
              <p className="leading-relaxed mb-6">
                There are several types of bipolar disorder, including Bipolar I (characterized by severe manic episodes), Bipolar II (characterized by hypomanic and depressive episodes), and Cyclothymic Disorder. Each type requires specialized treatment, and accurate diagnosis is essential for effective management.
              </p>
              <p className="leading-relaxed">
                At Empathy Health Clinic, our <Link href="/team" className="text-primary hover:underline font-medium">board-certified psychiatrists</Link> have extensive experience diagnosing and treating bipolar spectrum disorders. We work closely with you to develop a treatment plan that promotes long-term stability.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4 text-center">
              Signs and Symptoms of Bipolar Disorder
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              Bipolar disorder symptoms vary between manic and depressive episodes. Recognition of these patterns is key to getting appropriate help.
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
              Our Bipolar Disorder Treatment Approach
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              We provide comprehensive, evidence-based treatment for all types of bipolar disorder.
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
              Why Choose Us for Bipolar Treatment?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Specialized Expertise</h3>
                <p className="text-muted-foreground">Our psychiatrists have specific training in mood disorders and bipolar spectrum conditions.</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Responsive Care</h3>
                <p className="text-muted-foreground">Quick access for urgent concerns and regular follow-ups to maintain stability.</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Long-Term Partnership</h3>
                <p className="text-muted-foreground">We're committed to your ongoing wellness, not just crisis management.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-card border-y">
          <div className="container mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions About Bipolar Treatment
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
              <Link href="/what-we-treat/anxiety">
                <Button variant="outline" size="sm" data-testid="link-anxiety">Anxiety Treatment</Button>
              </Link>
              <Link href="/what-we-treat">
                <Button variant="outline" size="sm" data-testid="link-conditions">All Conditions</Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="sm" data-testid="link-services">Our Services</Button>
              </Link>
              <Link href="/team">
                <Button variant="outline" size="sm" data-testid="link-team">Meet Our Team</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-6">
              Achieve Mood Stability with Expert Care
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Living well with bipolar disorder is possible with the right treatment. Our experienced team is here to help you find balance and thrive.
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
