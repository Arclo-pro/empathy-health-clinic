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
import { AuthoritativeSourcesBlock } from "@/components/AuthoritativeSource";
const heroImage = "/site-assets/stock_images/professional_healthc_955227e9.jpg";
import { trackEvent } from "@/lib/analytics";

export default function ADHDTestingOrlando() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalTest",
        "@id": "https://empathyhealthclinic.com/adhd-testing-orlando/#test",
        "name": "ADHD Testing & Evaluation",
        "alternateName": ["ADHD Assessment", "ADHD Evaluation", "Attention Deficit Hyperactivity Disorder Testing"],
        "description": "Comprehensive ADHD testing for adults 18+ including clinical interviews, standardized rating scales (ASRS, Conners), and differential diagnosis to accurately identify ADHD and co-occurring conditions.",
        "usesDevice": [
          { "@type": "MedicalDevice", "name": "ASRS (Adult ADHD Self-Report Scale)" },
          { "@type": "MedicalDevice", "name": "Conners Adult ADHD Rating Scales" },
          { "@type": "MedicalDevice", "name": "Vanderbilt Assessment Scales" }
        ],
        "normalRange": "Used to diagnose ADHD-Inattentive, ADHD-Hyperactive/Impulsive, or ADHD-Combined presentations",
        "affectedBy": ["Age", "Medical history", "Current medications", "Co-occurring conditions"],
        "usedToDiagnose": {
          "@type": "MedicalCondition",
          "name": "Attention Deficit Hyperactivity Disorder",
          "alternateName": ["ADHD", "ADD"],
          "code": {
            "@type": "MedicalCode",
            "code": "F90",
            "codingSystem": "ICD-10"
          }
        }
      },
      {
        "@type": ["MedicalClinic", "LocalBusiness", "MedicalOrganization"],
        "@id": "https://empathyhealthclinic.com/adhd-testing-orlando/#organization",
        "name": "Empathy Health Clinic - ADHD Testing Winter Park & Orlando",
        "description": "Professional ADHD testing and evaluation in Winter Park and Orlando, FL. Board-certified psychiatrists providing comprehensive assessments for adults 18+. Same-week appointments. Most insurance accepted.",
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
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.59544,
          "longitude": -81.36537
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "17:00"
          }
        ],
        "medicalSpecialty": ["Psychiatry", "ADHD"],
        "areaServed": [
          { "@type": "City", "name": "Orlando" },
          { "@type": "City", "name": "Winter Park" },
          { "@type": "City", "name": "Altamonte Springs" },
          { "@type": "City", "name": "Maitland" },
          { "@type": "City", "name": "Casselberry" }
        ],
        "isAcceptingNewPatients": true,
        "availableService": {
          "@type": "MedicalTest",
          "@id": "https://empathyhealthclinic.com/adhd-testing-orlando/#test"
        }
      },
      {
        "@type": "Physician",
        "@id": "https://empathyhealthclinic.com/adhd-testing-orlando/#physician",
        "name": "Dr. Marna Morrow",
        "description": "Board-certified psychiatrist specializing in ADHD evaluation and treatment with expertise in adult ADHD diagnosis.",
        "medicalSpecialty": "Psychiatry",
        "worksFor": { "@id": "https://empathyhealthclinic.com/adhd-testing-orlando/#organization" },
        "knowsAbout": ["ADHD Diagnosis", "Adult ADHD", "ADHD Medication Management", "Stimulant Medications", "Non-Stimulant ADHD Treatment"]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How long does ADHD testing take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The initial ADHD evaluation appointment typically lasts 60-90 minutes. You'll receive preliminary results during that visit, with a complete written report available within 1 week. If ADHD is diagnosed, treatment can often begin the same day."
            }
          },
          {
            "@type": "Question",
            "name": "How much does ADHD testing cost in Orlando?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ADHD testing is typically covered by most insurance plans as a diagnostic psychiatric evaluation. With insurance, you'll typically pay your standard specialist copay or coinsurance. We accept Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, and many other plans. For self-pay patients, contact us for current rates."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need a referral for ADHD testing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No referral is required to schedule ADHD testing at our Winter Park clinic. However, some insurance plans may require a referral for coverage, so check with your insurance provider beforehand."
            }
          },
          {
            "@type": "Question",
            "name": "What should I bring to my ADHD testing appointment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Bring your insurance card, photo ID, list of current medications, and any previous psychological testing, school records, or performance reviews that document attention difficulties. If possible, have a family member or close friend who knows you well provide input on your symptoms."
            }
          },
          {
            "@type": "Question",
            "name": "Can ADHD testing be done via telehealth?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! We offer telehealth ADHD testing appointments throughout Florida. The clinical interview and rating scales can be completed effectively via secure video call, making testing convenient for busy adults in Orlando and surrounding areas."
            }
          },
          {
            "@type": "Question",
            "name": "What happens if the test shows I don't have ADHD?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If testing doesn't confirm ADHD, we'll provide alternative explanations for your symptoms and recommend appropriate treatment. Many conditions can mimic ADHD (anxiety, depression, sleep disorders), and accurate diagnosis ensures you get the right help."
            }
          },
          {
            "@type": "Question",
            "name": "Do you test adults who were never diagnosed as children?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely! Many adults with ADHD weren't diagnosed as children. We specialize in adult ADHD evaluation (18+), recognizing that symptoms often manifest differently in adults. Late diagnosis is common and our psychiatrists have extensive experience identifying ADHD in adults."
            }
          }
        ]
      }
    ]
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'ADHD Testing Orlando Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="ADHD Psychiatrist Orlando | Testing & Treatment 2026"
        description="ADHD psychiatrist Orlando providing comprehensive testing & treatment for adults 18+. Board-certified specialists. Same-week appointments. BCBS, Aetna, Cigna accepted. Call 386-848-8751."
        keywords={["adhd psychiatrist orlando", "adhd testing orlando", "adhd testing", "adhd testing near me", "adhd evaluation", "adhd testing winter park", "adult adhd testing", "adhd assessment orlando", "adhd diagnosis orlando", "add testing orlando", "adhd doctor orlando"]}
        canonicalPath="/adhd-testing-orlando"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            ADHD Testing & Evaluation Orlando
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Professional ADHD testing for adults 18+ in Orlando. Comprehensive evaluations by board-certified psychiatrists. Get clarity, accurate diagnosis, and personalized treatment recommendations. Same-week appointments available.
          </p>
          <div className="flex flex-wrap gap-4" data-testid="hero-cta-cluster">
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
              <div className="flex items-center gap-2" data-testid="benefit-google-reviews">
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
              <div className="flex items-center gap-2 text-sm text-foreground" data-testid="benefit-board-certified">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Board-Certified Psychiatrists</span>
              </div>
              <div className="hidden lg:block h-6 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm text-foreground" data-testid="benefit-same-week">
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
                    Wondering if you have ADHD? At Empathy Health Clinic, our board-certified psychiatrists provide comprehensive ADHD testing and evaluation for adults 18+ in Orlando. Our diagnostic process combines clinical interviews, standardized assessments, and symptom rating scales to provide accurate ADHD diagnoses and personalized treatment recommendations.
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
                  <div className="flex gap-3" data-testid="card-service-clinical-interview">
                    <ClipboardCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Comprehensive Clinical Interview (60-90 minutes)</h3>
                      <p className="text-muted-foreground text-sm">
                        Detailed discussion of your symptoms, medical history, childhood behavior patterns, academic/work performance, and how ADHD symptoms impact your daily life. We review your developmental history and family history of ADHD or other mental health conditions.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3" data-testid="card-service-rating-scales">
                    <FileCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">ADHD Symptom Rating Scales</h3>
                      <p className="text-muted-foreground text-sm">
                        Standardized questionnaires (such as ASRS, Conners, or Vanderbilt scales) that measure inattention, hyperactivity, and impulsivity symptoms. These evidence-based tools help quantify symptom severity and track changes over time.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3" data-testid="card-service-differential-diagnosis">
                    <Brain className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Differential Diagnosis Assessment</h3>
                      <p className="text-muted-foreground text-sm">
                        Evaluation to rule out other conditions that can mimic ADHD symptoms, including anxiety disorders, depression, bipolar disorder, sleep disorders, thyroid problems, or learning disabilities. Accurate differential diagnosis ensures you receive the right treatment.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3" data-testid="card-service-treatment-plan">
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
                    <div data-testid="comparison-evaluation">
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
                    <div data-testid="comparison-treatment">
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
                  <div className="bg-primary/5 border rounded-lg p-6" data-testid="card-audience-adults">
                    <h3 className="text-xl font-semibold text-foreground mb-3">Adult ADHD Testing (Ages 18+)</h3>
                    <p className="text-muted-foreground mb-4">
                      Many adults with ADHD weren't diagnosed in childhood. We specialize in adult ADHD evaluation (18+), recognizing that symptoms often manifest differently in adults and that late diagnosis is increasingly common.
                    </p>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> College students struggling with focus</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> Professionals with productivity issues</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> Adults with chronic disorganization</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> Anyone suspecting undiagnosed ADHD</li>
                    </ul>
                  </div>

                  <div className="bg-primary/5 border rounded-lg p-6" data-testid="card-audience-late-diagnosis">
                    <h3 className="text-xl font-semibold text-foreground mb-3">Late-Diagnosed Adult ADHD</h3>
                    <p className="text-muted-foreground mb-4">
                      Many adults discover they have ADHD later in life. Our specialists understand the unique challenges of late diagnosis and provide comprehensive evaluations.
                    </p>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> Career transition difficulties</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> Relationship challenges</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> Lifelong patterns of disorganization</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> Executive function struggles</li>
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
                    <div className="flex gap-2" data-testid="insurance-bcbs">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground"><strong>Blue Cross Blue Shield</strong> - All BCBS plans</span>
                    </div>
                    <div className="flex gap-2" data-testid="insurance-aetna">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground"><strong>Aetna</strong> - Most Aetna plans</span>
                    </div>
                    <div className="flex gap-2" data-testid="insurance-cigna">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground"><strong>Cigna</strong> - All Cigna plans</span>
                    </div>
                    <div className="flex gap-2" data-testid="insurance-uhc">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground"><strong>UnitedHealthcare</strong> - UHC plans</span>
                    </div>
                    <div className="flex gap-2" data-testid="insurance-humana">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground"><strong>Humana</strong> - Most Humana plans</span>
                    </div>
                    <div className="flex gap-2" data-testid="insurance-medicare">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground"><strong>Medicare</strong> - Medicare Advantage plans</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    <strong>What to expect:</strong> Most insurance plans cover ADHD testing as a diagnostic visit, typically requiring a copay or coinsurance. We recommend calling your insurance provider before your appointment to verify your behavioral health benefits and any out-of-pocket costs. Our office can provide you with the necessary diagnostic codes (F90.0, F90.1, F90.2) to verify coverage.
                  </p>
                </div>
              </section>

              <section className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  After Your ADHD Diagnosis – Treatment Options
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Once you receive your ADHD diagnosis, the next step is starting an effective treatment plan. Our board-certified psychiatrists specialize in ADHD medication management, including stimulant and non-stimulant options tailored to your specific needs.
                  </p>
                  <p className="text-foreground leading-relaxed mb-4">
                    Treatment typically begins with a follow-up appointment where we discuss medication options, set treatment goals, and create a personalized care plan. Many patients see significant improvement in focus, organization, and daily functioning within weeks of starting treatment.
                  </p>
                  <div className="mt-6">
                    <Link 
                      href="/adhd-psychiatrist-orlando" 
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                      data-testid="link-adhd-treatment"
                    >
                      <Brain className="h-5 w-5" />
                      Start Treatment with Our ADHD Specialists
                    </Link>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div data-testid="faq-item-01">
                    <h3 className="font-semibold text-foreground mb-2">How long does ADHD testing take?</h3>
                    <p className="text-muted-foreground">
                      The initial ADHD evaluation appointment typically lasts 60-90 minutes. You'll receive preliminary results during that visit, with a complete written report available within 1 week.
                    </p>
                  </div>
                  <div data-testid="faq-item-02">
                    <h3 className="font-semibold text-foreground mb-2">Do I need a referral for ADHD testing?</h3>
                    <p className="text-muted-foreground">
                      No referral is required to schedule ADHD testing at our clinic. However, some insurance plans may require a referral for coverage, so check with your insurance provider beforehand.
                    </p>
                  </div>
                  <div data-testid="faq-item-03">
                    <h3 className="font-semibold text-foreground mb-2">What should I bring to my ADHD testing appointment?</h3>
                    <p className="text-muted-foreground">
                      Bring your insurance card, photo ID, list of current medications, and any previous psychological testing, school records, or performance reviews that document attention difficulties. If possible, have a family member or close friend who knows you well provide input on your symptoms.
                    </p>
                  </div>
                  <div data-testid="faq-item-04">
                    <h3 className="font-semibold text-foreground mb-2">Can ADHD testing be done via telehealth?</h3>
                    <p className="text-muted-foreground">
                      Yes! We offer telehealth ADHD testing appointments. The clinical interview and rating scales can be completed effectively via secure video call, making testing convenient for busy adults.
                    </p>
                  </div>
                  <div data-testid="faq-item-05">
                    <h3 className="font-semibold text-foreground mb-2">What if the test shows I don't have ADHD?</h3>
                    <p className="text-muted-foreground">
                      If testing doesn't confirm ADHD, we'll provide alternative explanations for your symptoms and recommend appropriate treatment. Many conditions can mimic ADHD (anxiety, depression, sleep disorders), and accurate diagnosis ensures you get the right help.
                    </p>
                  </div>
                  <div data-testid="faq-item-06">
                    <h3 className="font-semibold text-foreground mb-2">How much does ADHD testing cost?</h3>
                    <p className="text-muted-foreground">
                      ADHD testing is typically covered by insurance as a diagnostic psychiatric evaluation. With insurance, you'll pay your standard specialist copay or coinsurance. We accept BCBS, Aetna, Cigna, UnitedHealthcare, and many other plans. Contact us for self-pay rates.
                    </p>
                  </div>
                  <div data-testid="faq-item-07">
                    <h3 className="font-semibold text-foreground mb-2">Do you test adults who were never diagnosed?</h3>
                    <p className="text-muted-foreground">
                      Absolutely! We specialize in adult ADHD evaluation (18+). Many adults with ADHD were never diagnosed in childhood, and late diagnosis is increasingly common. Our psychiatrists have extensive experience identifying ADHD in adults.
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-card border rounded-lg p-6">
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Meet Your ADHD Testing Specialist
                </h2>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="bg-primary/10 rounded-full p-4 h-fit flex-shrink-0">
                    <Award className="h-12 w-12 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Dr. Marna Morrow, MD</h3>
                    <p className="text-primary font-medium mb-3">Founder & Lead Psychiatrist</p>
                    <p className="text-muted-foreground mb-4">
                      Dr. Morrow is a board-certified psychiatrist with extensive experience in ADHD evaluation and treatment. She founded Empathy Health Clinic to provide thorough, compassionate ADHD testing that goes beyond simple questionnaires to deliver accurate diagnoses and personalized treatment plans.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">Board Certified</span>
                      <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">Adult ADHD Specialist</span>
                      <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">Medication Management Expert</span>
                      <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">15+ Years Experience</span>
                    </div>
                    <a 
                      href="https://www.psychologytoday.com/us/psychiatrists/empathy-health-clinic-llc-orlando-fl/1121969" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                      data-testid="link-psychology-today"
                    >
                      View Profile on Psychology Today →
                    </a>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  ADHD Educational Resources
                </h2>
                <p className="text-muted-foreground mb-4">
                  Learn more about ADHD from these authoritative sources. Understanding ADHD can help you prepare for your evaluation and make informed treatment decisions.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <a 
                    href="https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-card border rounded-lg p-4 hover-elevate group"
                    data-testid="link-resource-nimh"
                  >
                    <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">NIMH: ADHD Overview</h4>
                    <p className="text-sm text-muted-foreground">Comprehensive information from the National Institute of Mental Health</p>
                  </a>
                  <a 
                    href="https://www.cdc.gov/adhd/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-card border rounded-lg p-4 hover-elevate group"
                    data-testid="link-resource-cdc"
                  >
                    <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">CDC: ADHD Facts</h4>
                    <p className="text-sm text-muted-foreground">Statistics, research, and resources from the CDC</p>
                  </a>
                  <a 
                    href="https://chadd.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-card border rounded-lg p-4 hover-elevate group"
                    data-testid="link-resource-chadd"
                  >
                    <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">CHADD: ADHD Support</h4>
                    <p className="text-sm text-muted-foreground">National resource for ADHD education and advocacy</p>
                  </a>
                  <a 
                    href="https://www.psychiatry.org/patients-families/adhd" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-card border rounded-lg p-4 hover-elevate group"
                    data-testid="link-resource-apa"
                  >
                    <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">APA: What Is ADHD?</h4>
                    <p className="text-sm text-muted-foreground">Patient guide from the American Psychiatric Association</p>
                  </a>
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
                    <Link href="/adhd-psychiatrist-orlando" className="block text-sm text-primary hover:underline font-medium">
                      ADHD Psychiatrist Orlando
                    </Link>
                    <Link href="/psychiatrist-orlando" className="block text-sm text-primary hover:underline">
                      Psychiatrist Orlando
                    </Link>
                    <Link href="/services" className="block text-sm text-primary hover:underline">
                      ADHD Medication Management
                    </Link>
                    <Link href="/anxiety-therapy" className="block text-sm text-primary hover:underline">
                      Anxiety Treatment
                    </Link>
                    <Link href="/depression-treatment" className="block text-sm text-primary hover:underline">
                      Depression Treatment
                    </Link>
                    <Link href="/psychiatry-near-me" className="block text-sm text-primary hover:underline">
                      Psychiatry Near Me
                    </Link>
                  </div>
                </div>
                
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-3">Winter Park & Orlando Locations</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our clinic is conveniently located in Winter Park, serving patients throughout the Orlando metro area including:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Winter Park", "Orlando", "Maitland", "Altamonte Springs", "Casselberry", "Longwood"].map((area) => (
                      <span key={area} className="bg-muted px-2 py-1 rounded text-xs text-muted-foreground">{area}</span>
                    ))}
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

        {/* Authoritative Sources for YMYL Compliance */}
        <div className="container mx-auto px-4 max-w-4xl">
          <AuthoritativeSourcesBlock 
            variant="section"
            sources={[
              { source: "NIMH", topic: "Attention-Deficit/Hyperactivity Disorder" },
              { source: "APA", topic: "What Is ADHD?" },
              { source: "NIH", topic: "ADHD Diagnosis and Treatment" }
            ]}
          />
        </div>

        {/* Trust Factors */}
        <TrustFactors />
        
        {/* Reviews and Badges */}
        <ReviewsAndBadges />
      </main>
      <SiteFooter />
    </div>
  );
}
