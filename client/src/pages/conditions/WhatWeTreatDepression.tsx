import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Frown, CheckCircle, Phone, Clock, Users, Award } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
const forestBg = "/site-assets/stock_images/misty_forest_morning_dffbe3b2.webp";
import { trackEvent } from "@/lib/analytics";

const symptoms = [
  "Persistent feelings of sadness, emptiness, or hopelessness",
  "Loss of interest in activities you once enjoyed",
  "Changes in appetite and weight (increase or decrease)",
  "Sleep disturbances—insomnia or sleeping too much",
  "Fatigue and decreased energy",
  "Difficulty concentrating or making decisions",
  "Feelings of worthlessness or excessive guilt",
  "Thoughts of death or suicide"
];

const treatments = [
  {
    title: "Psychotherapy",
    description: "Evidence-based talk therapy including CBT, interpersonal therapy, and psychodynamic approaches to address the root causes of depression."
  },
  {
    title: "Antidepressant Medication",
    description: "When appropriate, our psychiatrists prescribe and carefully monitor medications like SSRIs, SNRIs, and other antidepressants."
  },
  {
    title: "Treatment-Resistant Depression Care",
    description: "For patients who haven't responded to standard treatments, we offer advanced options and personalized medication strategies."
  },
  {
    title: "Integrated Care Approach",
    description: "Combination of therapy and medication management, coordinated between our psychiatrists and therapists for optimal outcomes."
  }
];

const faqs = [
  {
    question: "What's the difference between sadness and clinical depression?",
    answer: "Sadness is a normal human emotion that typically passes with time. Clinical depression (Major Depressive Disorder) is a medical condition characterized by persistent symptoms lasting at least two weeks that significantly impair daily functioning. Depression doesn't necessarily have an external cause and doesn't improve without treatment."
  },
  {
    question: "What medications are used to treat depression?",
    answer: "Common antidepressants include SSRIs (Prozac, Zoloft, Lexapro), SNRIs (Effexor, Cymbalta), bupropion (Wellbutrin), and others. Your psychiatrist will recommend the best option based on your symptoms, medical history, and potential side effects. It often takes 4-6 weeks to feel the full effect of antidepressants."
  },
  {
    question: "How long will I need to take antidepressants?",
    answer: "Treatment duration varies by individual. Many people take antidepressants for 6-12 months after symptoms improve to prevent relapse. Some patients benefit from longer-term medication, especially those with recurrent depression. Your psychiatrist will work with you to determine the right timeline."
  },
  {
    question: "Can therapy alone treat depression?",
    answer: "For mild to moderate depression, therapy alone can be effective. Cognitive Behavioral Therapy (CBT) and other evidence-based therapies have strong track records. However, moderate to severe depression often benefits from combining therapy with medication for best results."
  },
  {
    question: "What is treatment-resistant depression?",
    answer: "Treatment-resistant depression refers to depression that hasn't adequately improved after trying at least two different antidepressants. We have experience treating complex, difficult-to-treat depression with advanced strategies including medication optimization, combination approaches, and specialized therapies."
  },
  {
    question: "Do you offer same-day appointments for depression?",
    answer: "We prioritize getting patients the care they need promptly. While same-day availability varies, we typically offer appointments within the same week for new patients experiencing depression. For urgent situations, please call our office directly."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalCondition",
  "name": "Major Depressive Disorder",
  "alternateName": ["Depression", "Clinical Depression", "MDD"],
  "description": "Major Depressive Disorder is a mood disorder causing persistent feelings of sadness, hopelessness, and loss of interest that affects daily functioning.",
  "possibleTreatment": [
    {
      "@type": "MedicalTherapy",
      "name": "Psychotherapy",
      "description": "Talk therapy including CBT and other evidence-based approaches"
    },
    {
      "@type": "MedicalTherapy",
      "name": "Antidepressant Medication",
      "description": "SSRIs, SNRIs, and other medications to manage depression symptoms"
    }
  ],
  "signOrSymptom": [
    "Persistent sadness",
    "Loss of interest",
    "Fatigue",
    "Sleep disturbances"
  ]
};

export default function WhatWeTreatDepression() {
  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'WhatWeTreatDepression', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Depression Treatment Orlando FL | Psychiatrist & Therapy"
        description="Expert depression treatment in Orlando, FL. Psychiatrist-led care including therapy and medication management. Treatment for major depression and treatment-resistant cases. Call 386-848-8751."
        keywords={["depression treatment Orlando", "depression psychiatrist Orlando FL", "major depression treatment", "antidepressant medication Orlando", "depression therapy Orlando", "treatment-resistant depression"]}
        canonicalPath="/what-we-treat/depression"
        jsonLd={jsonLd}
        preloadImage={forestBg}
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
              <Frown className="h-5 w-5 text-white" />
              <span className="text-white/90 text-sm font-medium">Depression Treatment</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 text-white" data-testid="text-page-title">
              Depression Treatment in Orlando, FL
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Find hope and healing with compassionate, evidence-based depression treatment. Our board-certified psychiatrists and therapists are here to help you recover.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild data-testid="button-hero-appointment">
                <Link href="/request-appointment">Start Treatment Today</Link>
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
              What is Depression?
            </h2>
            <div className="prose prose-lg max-w-none text-foreground">
              <p className="leading-relaxed mb-6">
                Depression (Major Depressive Disorder) is more than just feeling sad—it's a serious medical condition that affects how you think, feel, and handle daily activities. Depression is one of the most common mental health conditions, affecting over 16 million American adults each year.
              </p>
              <p className="leading-relaxed mb-6">
                The good news is that depression is highly treatable. With the right combination of therapy, medication, and support, most people with depression experience significant improvement. Early treatment leads to better outcomes.
              </p>
              <p className="leading-relaxed">
                At Empathy Health Clinic, our <Link href="/team" className="text-primary hover:underline font-medium">experienced psychiatrists</Link> and therapists work together to provide comprehensive depression care. We understand that each person's experience with depression is unique, and we tailor treatment to your specific needs.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4 text-center">
              Common Depression Symptoms
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              Depression affects people differently. If you've experienced several of these symptoms most days for two weeks or more, it may be time to seek help.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {symptoms.map((symptom, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-card">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{symptom}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-amber-900 dark:text-amber-200 text-center font-medium">
                If you're having thoughts of suicide, please call the National Suicide Prevention Lifeline at 988 or go to your nearest emergency room.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-card border-y">
          <div className="container mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4 text-center">
              Our Depression Treatment Approach
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              We offer comprehensive, personalized treatment plans for depression.
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
              Why Choose Us for Depression Treatment?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Expert Care Team</h3>
                <p className="text-muted-foreground">Board-certified psychiatrists with specialized depression treatment experience.</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Prompt Appointments</h3>
                <p className="text-muted-foreground">We understand urgency—get seen within the week, not months.</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Collaborative Approach</h3>
                <p className="text-muted-foreground">Our psychiatrists and therapists work together for integrated care.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-card border-y">
          <div className="container mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions About Depression Treatment
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
              <Link href="/what-we-treat/bipolar-disorder">
                <Button variant="outline" size="sm" data-testid="link-bipolar">Bipolar Disorder</Button>
              </Link>
              <Link href="/what-we-treat/ptsd">
                <Button variant="outline" size="sm" data-testid="link-ptsd">PTSD Treatment</Button>
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
              You Don't Have to Face Depression Alone
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Take the first step toward feeling better. Our compassionate team is ready to help you on your path to recovery.
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
