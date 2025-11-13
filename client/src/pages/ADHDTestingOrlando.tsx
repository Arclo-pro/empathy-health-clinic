import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, MapPin, Phone, Clock, Star, CheckCircle, Brain, Shield, Calendar, ClipboardCheck, Award, FileCheck } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import HeroBackground from "@/components/HeroBackground";
import ShortContactForm from "@/components/ShortContactForm";
import heroImage from "@assets/stock_images/professional_healthc_955227e9.jpg";
import { trackEvent } from "@/lib/analytics";

export default function ADHDTestingOrlando() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness"],
    "name": "Empathy Health Clinic - ADHD Testing Orlando FL",
    "description": "Professional ADHD testing and evaluation in Orlando, FL. Comprehensive assessments for adults and teens. Same-week appointments. Most insurance accepted including BCBS, Aetna, Cigna.",
    "url": "https://empathyhealthclinic.com/adhd-testing-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "areaServed": [
      { "@type": "City", "name": "Orlando" },
      { "@type": "City", "name": "Winter Park" },
      { "@type": "City", "name": "Altamonte Springs" }
    ],
    "medicalSpecialty": "Psychiatry"
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'ADHD Testing Orlando Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="ADHD Testing Orlando FL | Adult & Teen ADHD Evaluation | Empathy Health"
        description="Professional ADHD testing in Orlando, FL. Comprehensive evaluations for adults and teens. Board-certified psychiatrists. Same-week appointments. Insurance accepted. Call 386-848-8751."
        keywords={["adhd testing orlando", "adhd testing", "adhd testing near me", "adhd evaluation orlando", "adult adhd testing orlando", "adhd assessment orlando", "adhd diagnosis orlando"]}
        canonicalPath="/adhd-testing-orlando"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            ADHD Testing & Evaluation in Orlando, FL
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Professional ADHD testing for adults and teens in Orlando. Comprehensive evaluations by board-certified psychiatrists. Get clarity, accurate diagnosis, and personalized treatment recommendations. Same-week appointments available.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              data-testid="button-hero-cta"
              onClick={() => trackEvent('adhd_testing_hero_cta', 'conversion', 'ADHD Testing Orlando Page')}
            >
              <a href="#contact-form">Schedule ADHD Testing</a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="bg-background/20 backdrop-blur-sm border-white/30 text-white"
              data-testid="button-hero-phone"
              onClick={handlePhoneClick}
            >
              <a href="tel:386-848-8751">Call 386-848-8751</a>
            </Button>
          </div>
        </HeroBackground>

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
                <span>Board-Certified Psychiatrists</span>
              </div>
              <div className="hidden lg:block h-6 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Same-Week Testing Available</span>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Contact Banner */}
        <section className="py-8 bg-primary/5 border-y">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3" data-testid="location-info">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Our Orlando Location</h3>
                  <p className="text-sm text-muted-foreground">
                    2281 Lee Rd Suite 102<br />
                    Winter Park, FL 32810<br />
                    (Serving Orlando metro area)
                  </p>
                  <a 
                    href="https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline mt-1 inline-block"
                    data-testid="link-directions"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3" data-testid="contact-info">
                <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Call to Schedule Testing</h3>
                  <a 
                    href="tel:386-848-8751" 
                    className="text-lg font-bold text-primary hover:underline"
                    data-testid="link-phone"
                    onClick={handlePhoneClick}
                  >
                    386-848-8751
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Same-week appointments available
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3" data-testid="hours-info">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Office Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Mon-Fri: 9:00 AM - 6:00 PM<br />
                    In-person & telehealth testing
                  </p>
                  <p className="text-sm text-primary mt-1 font-medium">
                    <CheckCircle2 className="h-4 w-4 inline mr-1" />
                    Accepting new patients
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              
              <section>
                <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                  Professional ADHD Testing in Orlando
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Wondering if you have ADHD? At Empathy Health Clinic, our board-certified psychiatrists provide comprehensive ADHD testing and evaluation for adults and teenagers in Orlando. Our diagnostic process combines clinical interviews, standardized assessments, and symptom rating scales to provide accurate ADHD diagnoses and personalized treatment recommendations.
                  </p>
                  <p className="text-foreground leading-relaxed mb-4">
                    Many adults with ADHD go undiagnosed for years, struggling with focus, organization, time management, and impulsivity without understanding why. Our ADHD testing process provides clarity and opens the door to effective treatment options including medication, therapy, and lifestyle strategies.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    We accept most major insurance plans for ADHD testing, including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, and Humana. Same-week testing appointments are typically available.
                  </p>
                </div>
              </section>

              {/* What's Included Section */}
              <section className="bg-primary/5 border rounded-lg p-6">
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  What's Included in ADHD Testing
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <ClipboardCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Comprehensive Clinical Interview (60-90 minutes)</h3>
                      <p className="text-muted-foreground text-sm">
                        Detailed discussion of your symptoms, medical history, childhood behavior patterns, academic/work performance, and how ADHD symptoms impact your daily life. We review your developmental history and family history of ADHD or other mental health conditions.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <FileCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">ADHD Symptom Rating Scales</h3>
                      <p className="text-muted-foreground text-sm">
                        Standardized questionnaires (such as ASRS, Conners, or Vanderbilt scales) that measure inattention, hyperactivity, and impulsivity symptoms. These evidence-based tools help quantify symptom severity and track changes over time.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Brain className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Differential Diagnosis Assessment</h3>
                      <p className="text-muted-foreground text-sm">
                        Evaluation to rule out other conditions that can mimic ADHD symptoms, including anxiety disorders, depression, bipolar disorder, sleep disorders, thyroid problems, or learning disabilities. Accurate differential diagnosis ensures you receive the right treatment.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Award className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Diagnosis & Treatment Plan</h3>
                      <p className="text-muted-foreground text-sm">
                        Clear explanation of your diagnosis (ADHD-Inattentive, ADHD-Hyperactive/Impulsive, or ADHD-Combined type), comprehensive written report, and personalized treatment recommendations including medication options, therapy referrals, and lifestyle strategies.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Timeline Section */}
              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  ADHD Testing Timeline & Process
                </h2>
                <div className="space-y-4">
                  <div className="bg-card border rounded-lg p-4" data-testid="step-timeline-01">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Initial Consultation (Week 1)</h3>
                        <p className="text-muted-foreground text-sm">
                          Schedule your first appointment. Same-week slots typically available. Bring any previous psychological testing, school records, or performance reviews that document attention difficulties.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-lg p-4" data-testid="step-timeline-02">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Testing Appointment (60-90 minutes)</h3>
                        <p className="text-muted-foreground text-sm">
                          Complete clinical interview, symptom rating scales, and behavioral assessments. Your psychiatrist will gather comprehensive information about your symptoms, history, and functional impairments.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-lg p-4" data-testid="step-timeline-03">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Results & Diagnosis (Same Day or Within 1 Week)</h3>
                        <p className="text-muted-foreground text-sm">
                          Receive your diagnosis, detailed explanation of findings, written report, and personalized treatment plan. If ADHD is diagnosed, we can often start treatment the same day.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-lg p-4" data-testid="step-timeline-04">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                        4
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Treatment & Follow-Up (Ongoing)</h3>
                        <p className="text-muted-foreground text-sm">
                          Begin ADHD treatment if diagnosed. Monthly follow-ups to monitor medication effectiveness, adjust dosages, and track symptom improvement. Coordination with therapists if combined treatment is recommended.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Evaluation vs Treatment Section */}
              <section className="bg-card border rounded-lg p-6">
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  ADHD Evaluation vs. ADHD Treatment: What's the Difference?
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                        <ClipboardCheck className="h-5 w-5 text-primary" />
                        ADHD Evaluation/Testing
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex gap-2"><span className="text-primary">•</span> <span>Diagnostic assessment to determine if you have ADHD</span></li>
                        <li className="flex gap-2"><span className="text-primary">•</span> <span>Clinical interviews and rating scales</span></li>
                        <li className="flex gap-2"><span className="text-primary">•</span> <span>Typically 1-2 appointments</span></li>
                        <li className="flex gap-2"><span className="text-primary">•</span> <span>Results in formal diagnosis</span></li>
                        <li className="flex gap-2"><span className="text-primary">•</span> <span>Covered by most insurance as diagnostic visit</span></li>
                        <li className="flex gap-2"><span className="text-primary">•</span> <span>Provides treatment recommendations</span></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary" />
                        ADHD Treatment
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex gap-2"><span className="text-primary">•</span> <span>Ongoing care after ADHD diagnosis</span></li>
                        <li className="flex gap-2"><span className="text-primary">•</span> <span>Medication management (stimulants, non-stimulants)</span></li>
                        <li className="flex gap-2"><span className="text-primary">•</span> <span>Monthly follow-up appointments</span></li>
                        <li className="flex gap-2"><span className="text-primary">•</span> <span>Dosage adjustments and monitoring</span></li>
                        <li className="flex gap-2"><span className="text-primary">•</span> <span>Covered by insurance as treatment visits</span></li>
                        <li className="flex gap-2"><span className="text-primary">•</span> <span>May include therapy coordination</span></li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-foreground mt-4">
                    <strong>Bottom line:</strong> Testing/evaluation gives you the diagnosis. Treatment is the ongoing care that helps you manage ADHD symptoms. Most patients complete testing first, then transition to regular treatment appointments if ADHD is diagnosed.
                  </p>
                </div>
              </section>

              {/* Who We Test Section */}
              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Who We Test for ADHD
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-primary/5 border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">Adult ADHD Testing (Ages 18+)</h3>
                    <p className="text-muted-foreground mb-4">
                      Many adults with ADHD weren't diagnosed as children. We specialize in adult ADHD evaluation, recognizing that symptoms often manifest differently in adults than in children.
                    </p>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> College students struggling with focus</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> Professionals with productivity issues</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> Adults with chronic disorganization</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> Anyone suspecting undiagnosed ADHD</li>
                    </ul>
                  </div>

                  <div className="bg-primary/5 border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">Teen ADHD Testing (Ages 13-17)</h3>
                    <p className="text-muted-foreground mb-4">
                      Adolescent ADHD testing helps identify attention difficulties that impact academic performance, social relationships, and emotional regulation during critical teenage years.
                    </p>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> Academic underachievement</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> Homework completion struggles</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> Impulsive behavior concerns</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> High school transition difficulties</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Insurance Section */}
              <section className="bg-card border rounded-lg p-6">
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Insurance Coverage for ADHD Testing
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    ADHD testing is typically covered by most insurance plans as a diagnostic psychiatric evaluation. We accept the following insurance providers:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground"><strong>Blue Cross Blue Shield</strong> - All BCBS plans</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground"><strong>Aetna</strong> - Most Aetna plans</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground"><strong>Cigna</strong> - All Cigna plans</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground"><strong>UnitedHealthcare</strong> - UHC plans</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground"><strong>Humana</strong> - Most Humana plans</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground"><strong>Medicare</strong> - Medicare Advantage plans</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    <strong>What to expect:</strong> Most insurance plans cover ADHD testing as a diagnostic visit, typically requiring a copay or coinsurance. We recommend calling your insurance provider before your appointment to verify your behavioral health benefits and any out-of-pocket costs. Our office can provide you with the necessary diagnostic codes (F90.0, F90.1, F90.2) to verify coverage.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">How long does ADHD testing take?</h3>
                    <p className="text-muted-foreground">
                      The initial ADHD evaluation appointment typically lasts 60-90 minutes. You'll receive preliminary results during that visit, with a complete written report available within 1 week.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Do I need a referral for ADHD testing?</h3>
                    <p className="text-muted-foreground">
                      No referral is required to schedule ADHD testing at our clinic. However, some insurance plans may require a referral for coverage, so check with your insurance provider beforehand.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">What should I bring to my ADHD testing appointment?</h3>
                    <p className="text-muted-foreground">
                      Bring your insurance card, photo ID, list of current medications, and any previous psychological testing, school records, or performance reviews that document attention difficulties. If possible, have a family member or close friend who knows you well provide input on your symptoms.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Can ADHD testing be done via telehealth?</h3>
                    <p className="text-muted-foreground">
                      Yes! We offer telehealth ADHD testing appointments. The clinical interview and rating scales can be completed effectively via secure video call, making testing convenient for busy adults and teens.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">What if the test shows I don't have ADHD?</h3>
                    <p className="text-muted-foreground">
                      If testing doesn't confirm ADHD, we'll provide alternative explanations for your symptoms and recommend appropriate treatment. Many conditions can mimic ADHD (anxiety, depression, sleep disorders), and accurate diagnosis ensures you get the right help.
                    </p>
                  </div>
                </div>
              </section>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Schedule ADHD Testing</h3>
                  <div className="space-y-4">
                    <Button 
                      className="w-full" 
                      size="lg"
                      asChild
                      data-testid="button-sidebar-call"
                      onClick={handlePhoneClick}
                    >
                      <a href="tel:386-848-8751">
                        <Phone className="h-4 w-4 mr-2" />
                        Call 386-848-8751
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      size="lg"
                      asChild
                      data-testid="button-sidebar-appointment"
                    >
                      <Link href="/request-appointment">Request Appointment</Link>
                    </Button>
                  </div>
                  <div className="mt-6 pt-6 border-t space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-muted-foreground">
                        2281 Lee Rd Suite 102<br />
                        Winter Park, FL 32810
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-muted-foreground">
                        Mon-Fri: 9:00 AM - 6:00 PM
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-muted-foreground">
                        Same-week testing available
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-3">Related Services</h3>
                  <div className="space-y-2">
                    <Link href="/adhd-psychiatrist-orlando" className="block text-sm text-primary hover:underline">
                      ADHD Treatment Orlando
                    </Link>
                    <Link href="/psychiatrist-orlando" className="block text-sm text-primary hover:underline">
                      Psychiatrist Orlando
                    </Link>
                    <Link href="/child-psychiatrist-orlando" className="block text-sm text-primary hover:underline">
                      Teen Psychiatrist
                    </Link>
                    <Link href="/medication-management-orlando" className="block text-sm text-primary hover:underline">
                      Medication Management
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <section className="py-16 bg-muted" id="contact-form">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-sans font-bold text-foreground mb-4">
                Schedule Your ADHD Testing Appointment
              </h2>
              <p className="text-lg text-muted-foreground">
                Same-week appointments available. Most insurance accepted.
              </p>
            </div>
            <ShortContactForm />
          </div>
        </section>

        {/* Trust Factors */}
        <TrustFactors />
        
        {/* Reviews and Badges */}
        <ReviewsAndBadges />
      </main>
      <SiteFooter />
    </div>
  );
}
