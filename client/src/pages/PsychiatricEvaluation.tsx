import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Phone, Mail, Clock, FileText, Stethoscope, Award, Calendar, Shield } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import ShortContactForm from "@/components/ShortContactForm";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import { trackEvent } from "@/lib/analytics";

export default function PsychiatricEvaluation() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "Psychiatrist", "LocalBusiness"],
    "name": "Psychiatric Evaluation - Empathy Health Clinic",
    "description": "Comprehensive psychiatric evaluations in Winter Park & Orlando, FL. Expert mental health assessments by board-certified psychiatrists for accurate diagnosis and treatment planning. Same-week appointments available.",
    "url": "https://empathyhealthclinic.com/psychiatric-evaluation",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1155 Louisiana Ave Suite 202",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32789",
      "addressCountry": "US"
    },
    "medicalSpecialty": "Psychiatry",
    "areaServed": ["Winter Park", "Orlando", "Maitland", "Altamonte Springs"]
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Psych Evaluation Orlando | Same-Week Appointments"
        description="Psych evaluation in Orlando by board-certified psychiatrists. Mental health assessment for ADHD, anxiety, depression. Same-week appointments. 386-848-8751."
        keywords={["psych evaluation", "psych evaluation near me", "psychiatric evaluation near me", "mental health evaluation", "psychiatric assessment orlando", "psychiatric evaluation orlando fl", "mental health assessment near me", "psychiatrist evaluation"]}
        canonicalPath="/psychiatric-evaluation"
        jsonLd={jsonLd}
      />
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 border-b">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-6" data-testid="text-page-title">
                Psych Evaluation in Orlando
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                Need a psych evaluation? Our board-certified psychiatrists in Orlando provide comprehensive mental health assessments for anxiety, depression, ADHD, bipolar disorder, and more. Same-week appointments available—get an accurate diagnosis and personalized treatment plan.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-foreground">Board-Certified Psychiatrists</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-foreground">60-90 Minute Evaluations</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-foreground">Same-Week Appointments</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" asChild data-testid="button-hero-call">
                  <a 
                    href="tel:3868488751" 
                    className="flex items-center justify-center gap-2"
                    onClick={() => trackEvent('phone_click', 'conversion', 'Psychiatric Evaluation Hero')}
                  >
                    <Phone className="h-5 w-5" />
                    Call (386) 848-8751
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild data-testid="button-hero-request">
                  <Link 
                    href="/request-appointment" 
                    className="flex items-center justify-center gap-2"
                    onClick={() => trackEvent('appointment_request', 'conversion', 'Psychiatric Evaluation Hero')}
                  >
                    <Mail className="h-5 w-5" />
                    Request Evaluation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content with Sidebar */}
        <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2">
            <div className="mb-16">
              <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-6">What is a Psychiatric Evaluation?</h2>
            
            <p className="text-foreground leading-relaxed mb-6">
              A psychiatric evaluation, also called a mental health evaluation or psych evaluation, is a comprehensive assessment conducted by a board-certified psychiatrist to diagnose mental health conditions and develop an effective treatment plan. During your evaluation at Empathy Health Clinic in Winter Park and Orlando, your psychiatrist will review your symptoms, medical history, family mental health history, and current medications to accurately diagnose conditions like <Link href="/depression" className="text-primary hover:underline font-medium">depression</Link>, <Link href="/anxiety-disorders" className="text-primary hover:underline font-medium">anxiety</Link>, <Link href="/adhd-treatment" className="text-primary hover:underline font-medium">ADHD</Link>, <Link href="/bipolar-disorder" className="text-primary hover:underline font-medium">bipolar disorder</Link>, PTSD, and other mental health disorders.
            </p>

            <p className="text-foreground leading-relaxed mb-6">
              Whether you're seeking a psychiatric evaluation for the first time, need an ADHD assessment, want a second opinion, or require a treatment-resistant case review, our experienced psychiatrists provide thorough, compassionate evaluations. We accept most major insurance plans and offer both in-person appointments at our Winter Park location and secure telehealth evaluations. Call (386) 848-8751 to schedule your same-week psychiatric evaluation.
            </p>

            <h3 className="text-2xl font-sans font-semibold text-foreground mb-4 mt-8">What to Expect During Your Psychiatric Evaluation</h3>
            
            <p className="text-foreground leading-relaxed mb-4">
              Your initial psychiatric evaluation typically lasts 60-90 minutes and includes:
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  <strong>Detailed Symptom Review:</strong> Discussion of your current mental health symptoms including mood, anxiety, sleep patterns, appetite, energy levels, concentration, and how symptoms affect your daily functioning
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  <strong>Medical & Psychiatric History:</strong> Review of past mental health treatment, previous diagnoses, medications tried, hospitalizations, and family history of mental health conditions
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  <strong>Mental Status Examination:</strong> Professional assessment of your thought processes, mood, behavior, cognitive function, and overall mental state
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  <strong>Diagnostic Assessment:</strong> Use of standardized screening tools and diagnostic criteria (DSM-5) to accurately identify mental health conditions
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  <strong>Treatment Plan Development:</strong> Personalized recommendations including medication options, therapy referrals, lifestyle modifications, and follow-up care
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  <strong>Questions & Discussion:</strong> Time for you to ask questions, express concerns, and collaborate on your treatment goals
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-sans font-semibold text-foreground mb-4 mt-8">Conditions We Evaluate</h3>
            
            <p className="text-foreground leading-relaxed mb-4">
              Our board-certified psychiatrists provide comprehensive evaluations for:
            </p>

            <div className="grid md:grid-cols-2 gap-3 mb-8">
              <div className="flex gap-2 items-start">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Depression & Mood Disorders</span>
              </div>
              <div className="flex gap-2 items-start">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Anxiety & Panic Disorders</span>
              </div>
              <div className="flex gap-2 items-start">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">ADHD (Adults & Adolescents)</span>
              </div>
              <div className="flex gap-2 items-start">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Bipolar Disorder (Type I & II)</span>
              </div>
              <div className="flex gap-2 items-start">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">OCD & Related Disorders</span>
              </div>
              <div className="flex gap-2 items-start">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">PTSD & Trauma</span>
              </div>
              <div className="flex gap-2 items-start">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Eating Disorders</span>
              </div>
              <div className="flex gap-2 items-start">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Substance Use Disorders</span>
              </div>
              <div className="flex gap-2 items-start">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Psychotic Disorders</span>
              </div>
              <div className="flex gap-2 items-start">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Personality Disorders</span>
              </div>
            </div>
              </div>
            </div>

            {/* Types of Evaluations */}
            <div className="mb-16">
              <h2 className="text-3xl font-sans font-bold text-foreground mb-8">Types of Psychiatric Evaluations We Provide</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="hover-elevate active-elevate-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Initial Diagnostic Evaluation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Comprehensive 60-90 minute first-time psychiatric assessment for new patients. Includes full symptom review, medical history, diagnostic testing, and personalized treatment plan development.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover-elevate active-elevate-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Stethoscope className="h-5 w-5 text-primary" />
                      ADHD Testing & Diagnosis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Specialized evaluation for ADHD in adults and adolescents using standardized diagnostic tools, symptom questionnaires, and comprehensive clinical assessment. Includes medication recommendations if appropriate.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover-elevate active-elevate-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Second Opinion Consultation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Expert review of your current diagnosis and treatment plan. Provides alternative perspectives, confirms diagnoses, or suggests different treatment approaches if previous treatments haven't been effective.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover-elevate active-elevate-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Treatment-Resistant Case Review
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      In-depth evaluation for patients who haven't responded to standard treatments. Explores alternative diagnoses, advanced treatment options, and comprehensive care coordination.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-sans font-bold text-foreground mb-8 text-center">Frequently Asked Questions About Psychiatric Evaluations</h2>
              
              <div className="space-y-6">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">How much does a psychiatric evaluation cost?</h3>
                  <p className="text-muted-foreground mb-3">
                    Most psychiatric evaluations are covered by insurance. At Empathy Health Clinic, we accept major insurance plans including Blue Cross Blue Shield, UnitedHealthcare, Cigna, Aetna, Humana, and Medicare. With insurance, copays typically range from $0-$100 for an initial evaluation depending on your specific plan. For self-pay patients without insurance, initial psychiatric evaluations start at $300-400. We'll verify your insurance coverage and explain your out-of-pocket costs before your appointment. Call (386) 848-8751 to check your coverage.
                  </p>
                  <Button variant="outline" asChild data-testid="button-faq-call">
                    <a href="tel:3868488751" onClick={() => trackEvent('phone_click', 'conversion', 'Psych Eval FAQ')}>
                      <Phone className="h-4 w-4 mr-2" />
                      Verify Insurance: (386) 848-8751
                    </a>
                  </Button>
                </div>

                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">Do I need a referral for a psychiatric evaluation?</h3>
                  <p className="text-muted-foreground">
                    In most cases, you do NOT need a referral to schedule a psychiatric evaluation at Empathy Health Clinic. You can call us directly to make an appointment. However, some insurance plans (particularly HMO plans) may require a referral from your primary care physician for coverage. Check with your insurance provider or call our office and we'll help you determine if a referral is needed. If you're paying out-of-pocket, no referral is required.
                  </p>
                </div>

                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">How should I prepare for my psychiatric evaluation?</h3>
                  <p className="text-muted-foreground">
                    To make the most of your evaluation: (1) Write down your current symptoms, when they started, and how they affect your daily life; (2) Bring a list of all current medications including dosages; (3) Gather any relevant medical records or previous mental health treatment summaries; (4) Note your family history of mental health conditions; (5) Write down questions or concerns you want to discuss; (6) Be honest and open about your symptoms—everything discussed is confidential. There's no need to stress about preparation—our psychiatrists will guide you through the process.
                  </p>
                </div>

                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">Will I get a diagnosis at my first appointment?</h3>
                  <p className="text-muted-foreground">
                    In most cases, yes. Our board-certified psychiatrists can typically provide a diagnosis during your initial 60-90 minute evaluation. However, some complex cases may require follow-up assessments, additional screening tools, or review of outside medical records before finalizing a diagnosis. If medication is recommended, your psychiatrist can prescribe it at your first visit and you'll leave with a clear treatment plan and next steps. Follow-up appointments are typically scheduled within 2-4 weeks to monitor progress.
                  </p>
                </div>

                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">Can I do a psychiatric evaluation via telehealth?</h3>
                  <p className="text-muted-foreground">
                    Yes! We offer comprehensive psychiatric evaluations via secure telehealth video appointments. Telehealth evaluations are just as thorough as in-person visits and are covered by most insurance plans. You can meet with your psychiatrist from the comfort of your home using a smartphone, tablet, or computer. Telehealth is especially convenient for busy schedules, transportation challenges, or if you prefer the privacy of a virtual appointment. Most insurance plans now cover telehealth evaluations at the same rate as in-person visits.
                  </p>
                </div>

                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">How quickly can I get a psychiatric evaluation?</h3>
                  <p className="text-muted-foreground">
                    We typically have same-week appointments available for psychiatric evaluations. Most new patients get scheduled within 2-5 business days. If you're experiencing urgent symptoms or a mental health crisis, please mention this when you call (386) 848-8751) and we'll do our best to accommodate you sooner. For non-urgent evaluations, you can also request an appointment online and our staff will contact you within 24 hours to schedule. We prioritize fast access because we understand that mental health needs can't wait.
                  </p>
                </div>

                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">What's the difference between a psychiatric evaluation and a psychological evaluation?</h3>
                  <p className="text-muted-foreground mb-3">
                    A <strong>psychiatric evaluation</strong> is conducted by a psychiatrist (medical doctor) and focuses on diagnosing mental health conditions and developing medication-based treatment plans. It's typically 60-90 minutes and includes medical history review. A <strong>psychological evaluation</strong> is conducted by a psychologist (PhD or PsyD) and often involves extensive testing (IQ tests, personality assessments) that can take several hours over multiple sessions. Psychological evaluations are used for learning disabilities, cognitive assessments, or complex diagnostic questions. At Empathy Health Clinic, our psychiatrists provide psychiatric evaluations, and we can refer you for psychological testing if needed.
                  </p>
                  <Button asChild data-testid="button-faq-request">
                    <Link href="/request-appointment" onClick={() => trackEvent('appointment_request', 'conversion', 'Psych Eval FAQ')}>
                      Schedule Your Evaluation
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>{/* End Main Content Column */}

          {/* Sticky Sidebar - Right Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card className="border-2 border-primary/20">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="text-2xl">Schedule Your Evaluation</CardTitle>
                  <CardDescription>Same-week appointments. Most insurance accepted.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ShortContactForm service="Psychiatric Evaluation" />
                </CardContent>
              </Card>
              
              {/* Quick Contact Info */}
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Call Us</h4>
                    <a 
                      href="tel:3868488751" 
                      className="text-2xl font-bold text-primary hover:underline block"
                      data-testid="sidebar-phone"
                      onClick={() => trackEvent('phone_click', 'conversion', 'Psych Eval Sidebar')}
                    >
                      386-848-8751
                    </a>
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-2">Location</h4>
                    <p className="text-sm text-muted-foreground">
                      1155 Louisiana Ave Suite 202<br />
                      Winter Park, FL 32789
                    </p>
                    <a 
                      href="https://maps.google.com/?q=1155+Louisiana+Ave+Suite+202+Winter+Park+FL+32789" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline mt-2 inline-block"
                    >
                      Get Directions →
                    </a>
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-2">Evaluation Length</h4>
                    <p className="text-sm text-muted-foreground">
                      Initial evaluations: 60-90 minutes<br />
                      Telehealth & in-person available
                    </p>
                  </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>{/* End Grid */}

        {/* Mid-Page CTA */}
        <div className="bg-primary/5 border-y py-12 my-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-4">Ready to Get an Accurate Diagnosis?</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Schedule your comprehensive psychiatric evaluation today. Board-certified psychiatrists. Same-week appointments. Most insurance accepted.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild data-testid="button-mid-cta-call">
                <a href="tel:3868488751" className="flex items-center justify-center gap-2" onClick={() => trackEvent('phone_click', 'conversion', 'Psych Eval Mid-CTA')}>
                  <Phone className="h-5 w-5" />
                  Call (386) 848-8751
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-mid-cta-request">
                <Link href="/request-appointment" className="flex items-center justify-center gap-2" onClick={() => trackEvent('appointment_request', 'conversion', 'Psych Eval Mid-CTA')}>
                  <Mail className="h-5 w-5" />
                  Request Evaluation
                </Link>
              </Button>
            </div>
          </div>
        </div>
        </div>

        {/* Trust Factors & Insurance */}
        <TrustFactors />
        <InsuranceSection />
      </main>

      <SiteFooter />
    </div>
  );
}
