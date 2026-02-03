import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Brain, CheckCircle, Phone, Clock, Users, Award } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
const forestBg = "/site-assets/stock_images/misty_forest_morning_dffbe3b2.webp";
import { trackEvent } from "@/lib/analytics";

const symptoms = [
  "Difficulty focusing on tasks or conversations",
  "Easily distracted by unrelated thoughts or stimuli",
  "Forgetting appointments, deadlines, or daily tasks",
  "Difficulty organizing tasks and managing time",
  "Restlessness or difficulty sitting still",
  "Impulsive decision-making or interrupting others",
  "Difficulty completing projects or following through",
  "Procrastination and avoidance of mentally demanding tasks"
];

const treatments = [
  {
    title: "Comprehensive ADHD Evaluation",
    description: "Thorough psychiatric assessment including clinical interviews, symptom scales, and review of developmental history to provide accurate diagnosis."
  },
  {
    title: "Medication Management",
    description: "Expert prescription and monitoring of ADHD medications including stimulants and non-stimulant options, tailored to your unique needs."
  },
  {
    title: "Behavioral Therapy",
    description: "Evidence-based strategies to improve focus, organization, time management, and develop coping skills for daily challenges."
  },
  {
    title: "Ongoing Support & Monitoring",
    description: "Regular follow-up appointments to track progress, adjust treatment as needed, and address any concerns or side effects."
  }
];

const faqs = [
  {
    question: "How is ADHD diagnosed in adults?",
    answer: "Adult ADHD diagnosis involves a comprehensive psychiatric evaluation that includes reviewing your symptoms, developmental history, and how ADHD affects your daily life. Our psychiatrists use validated assessment tools and clinical interviews to provide an accurate diagnosis. We also rule out other conditions that may mimic ADHD symptoms."
  },
  {
    question: "What medications are used to treat ADHD?",
    answer: "ADHD medications fall into two main categories: stimulants (such as Adderall, Vyvanse, Ritalin, and Concerta) and non-stimulants (such as Strattera, Wellbutrin, and Intuniv). Our psychiatrists will work with you to find the most effective medication with the fewest side effects for your situation."
  },
  {
    question: "Can adults be diagnosed with ADHD for the first time?",
    answer: "Yes, many adults are diagnosed with ADHD for the first time, especially those who developed strong coping mechanisms in childhood. As life demands increase with career, family, and other responsibilities, ADHD symptoms often become more apparent and disruptive."
  },
  {
    question: "How long does ADHD treatment take to show results?",
    answer: "Many patients notice improvements within the first few weeks of starting medication, though finding the optimal dose may take some adjustment. Behavioral therapy benefits typically build over several months as you learn and practice new skills."
  },
  {
    question: "Do you treat ADHD in children and adolescents?",
    answer: "Yes, our team includes providers experienced in treating ADHD across all age groups, including children, adolescents, and adults. We take a family-centered approach when treating younger patients."
  },
  {
    question: "Will I need to take medication forever?",
    answer: "ADHD is a lifelong condition, but treatment needs can change over time. Some patients benefit from long-term medication, while others may reduce or discontinue medication as they develop effective coping strategies. Your psychiatrist will work with you to determine the best ongoing treatment plan."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalCondition",
  "name": "Attention Deficit Hyperactivity Disorder (ADHD)",
  "alternateName": "ADHD",
  "description": "ADHD is a neurodevelopmental disorder characterized by inattention, hyperactivity, and impulsivity that affects daily functioning.",
  "possibleTreatment": [
    {
      "@type": "MedicalTherapy",
      "name": "Medication Management",
      "description": "Stimulant and non-stimulant medications to manage ADHD symptoms"
    },
    {
      "@type": "MedicalTherapy", 
      "name": "Behavioral Therapy",
      "description": "Evidence-based therapy to develop coping skills and improve functioning"
    }
  ],
  "signOrSymptom": [
    "Difficulty focusing",
    "Impulsivity",
    "Hyperactivity",
    "Disorganization"
  ]
};

export default function WhatWeTreatADHD() {
  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'WhatWeTreatADHD', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="ADHD Treatment Orlando FL | Adult & Child ADHD Psychiatrist"
        description="Expert ADHD diagnosis and treatment in Orlando, FL. Board-certified psychiatrists specializing in adult and child ADHD. Medication management & therapy. Call 386-848-8751."
        keywords={["ADHD treatment Orlando", "ADHD psychiatrist Orlando FL", "adult ADHD treatment", "child ADHD specialist Orlando", "ADHD medication management", "ADHD diagnosis Orlando"]}
        canonicalPath="/what-we-treat/adhd"
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
              <Brain className="h-5 w-5 text-white" />
              <span className="text-white/90 text-sm font-medium">ADHD Treatment</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 text-white" data-testid="text-page-title">
              ADHD Treatment in Orlando, FL
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Comprehensive ADHD evaluation, diagnosis, and treatment for adults and children. Our board-certified psychiatrists provide personalized care to help you thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild data-testid="button-hero-appointment">
                <Link href="/request-appointment">Schedule ADHD Evaluation</Link>
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
              What is ADHD?
            </h2>
            <div className="prose prose-lg max-w-none text-foreground">
              <p className="leading-relaxed mb-6">
                Attention Deficit Hyperactivity Disorder (ADHD) is a neurodevelopmental condition that affects both children and adults. It's characterized by persistent patterns of inattention, hyperactivity, and impulsivity that interfere with daily functioning and development.
              </p>
              <p className="leading-relaxed mb-6">
                ADHD is not a character flaw or a lack of willpower—it's a brain-based condition that responds well to proper treatment. With the right combination of medication, therapy, and support, people with ADHD can lead successful, fulfilling lives.
              </p>
              <p className="leading-relaxed">
                At Empathy Health Clinic, our <Link href="/team" className="text-primary hover:underline font-medium">experienced psychiatrists</Link> specialize in diagnosing and treating ADHD in patients of all ages. We take a comprehensive approach that addresses your unique symptoms and life circumstances.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4 text-center">
              Common ADHD Symptoms
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              ADHD symptoms can vary widely between individuals. If you experience several of these symptoms regularly, you may benefit from a professional evaluation.
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
              Our ADHD Treatment Approach
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              We provide comprehensive, evidence-based ADHD treatment tailored to your unique needs.
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
              Why Choose Empathy Health Clinic for ADHD Treatment?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Board-Certified Experts</h3>
                <p className="text-muted-foreground">Our psychiatrists have specialized training in ADHD diagnosis and treatment.</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Same-Week Appointments</h3>
                <p className="text-muted-foreground">Don't wait months for care. We offer prompt scheduling for new patients.</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">All Ages Welcome</h3>
                <p className="text-muted-foreground">We treat children, adolescents, and adults with ADHD using age-appropriate approaches.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-card border-y">
          <div className="container mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions About ADHD Treatment
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
              Get Expert ADHD Treatment Today
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Take the first step toward better focus and improved quality of life. Schedule your ADHD evaluation with our experienced team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild data-testid="button-cta-appointment">
                <Link href="/request-appointment">Schedule Evaluation</Link>
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
