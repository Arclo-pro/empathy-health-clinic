import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, MapPin, Phone, Clock, Star, CheckCircle, Brain, Shield, Calendar, Users, Video, Award, Heart, Pill } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import HeroBackground from "@/components/HeroBackground";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { LocalizedContentMultiple } from "@/components/LocalizedContent";
const heroImage = "/attached_assets/stock_images/professional_healthc_955227e9.jpg";
import { trackEvent } from "@/lib/analytics";

export default function SchizophreniaPsychiatristOrlando() {
  const faqSchema = {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What medications do you prescribe for schizophrenia in Orlando?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our Orlando schizophrenia psychiatrists prescribe a range of antipsychotic medications including second-generation antipsychotics (Risperdal, Zyprexa, Seroquel, Abilify, Latuda, Vraylar), first-generation antipsychotics when appropriate, and long-acting injectable antipsychotics (LAIs) for patients who prefer monthly injections over daily pills. We personalize medication selection based on your symptoms, side effect profile, and treatment goals."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can I see a schizophrenia psychiatrist in Orlando?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "At Empathy Health Clinic, we offer same-week appointments for adults seeking schizophrenia treatment in Orlando. We understand the importance of timely psychiatric care and prioritize getting you seen quickly. Call (386) 848-8751 to schedule."
        }
      },
      {
        "@type": "Question",
        "name": "Do you accept insurance for schizophrenia treatment in Orlando?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, Medicare, and many others. Most patients pay only their copay of $20-50 per session for schizophrenia medication management."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between first-generation and second-generation antipsychotics?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "First-generation (typical) antipsychotics like Haldol primarily target positive symptoms but may cause more movement-related side effects. Second-generation (atypical) antipsychotics like Abilify, Risperdal, and Latuda target both positive and negative symptoms with generally fewer movement side effects, though they may have metabolic effects. Our Orlando psychiatrists will discuss which option is best for your specific situation."
        }
      },
      {
        "@type": "Question",
        "name": "Do you coordinate care with my therapist or case manager?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, collaborative care is essential for optimal schizophrenia treatment outcomes. With your permission, we coordinate with your therapist, case manager, primary care physician, and other healthcare providers to ensure comprehensive, integrated care for your mental health needs."
        }
      },
      {
        "@type": "Question",
        "name": "What are long-acting injectable antipsychotics (LAIs)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Long-acting injectable antipsychotics are medications given by injection once every 2-4 weeks or even less frequently, instead of taking daily pills. LAIs can improve medication adherence and provide more stable symptom control. Options include injectable forms of Risperdal, Abilify, Invega, and others. Our Orlando psychiatrists can discuss if LAIs might be right for you."
        }
      }
    ]
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
        "@id": "https://empathyhealthclinic.com/schizophrenia-psychiatrist-orlando#organization",
        "name": "Empathy Health Clinic - Schizophrenia Psychiatrist Orlando FL",
        "parentOrganization": {
          "@id": "https://empathyhealthclinic.com/#organization"
        },
        "description": "Board-certified schizophrenia psychiatrists in Orlando, FL specializing in schizophrenia treatment, antipsychotic medication management, and comprehensive psychiatric care for adults.",
        "url": "https://empathyhealthclinic.com/schizophrenia-psychiatrist-orlando",
        "telephone": "+1-386-848-8751",
        "email": "providers@empathyhealthclinic.com",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "2281 Lee Rd Suite 102",
          "addressLocality": "Orlando",
          "addressRegion": "FL",
          "postalCode": "32810",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.59544,
          "longitude": -81.36537
        },
        "areaServed": [
          { "@type": "City", "name": "Orlando" },
          { "@type": "City", "name": "Winter Park" },
          { "@type": "City", "name": "Altamonte Springs" },
          { "@type": "City", "name": "Lake Mary" },
          { "@type": "City", "name": "Maitland" }
        ],
        "medicalSpecialty": "Psychiatry - Schizophrenia Specialist"
      },
      faqSchema
    ]
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Schizophrenia Psychiatrist Orlando Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Schizophrenia Psychiatrist Orlando FL | Expert Treatment 2025"
        description="Schizophrenia psychiatrist Orlando FL - expert schizophrenia treatment Orlando with antipsychotic medication management. Same-week appointments, insurance accepted. Compassionate care. Call (386) 848-8751."
        keywords={["schizophrenia psychiatrist orlando", "schizophrenia treatment orlando", "schizophrenia psychiatrist orlando fl", "schizophrenia doctor orlando", "antipsychotic medication management orlando", "psychosis treatment orlando", "schizophrenia medication orlando", "best schizophrenia psychiatrist orlando"]}
        canonicalPath="/schizophrenia-psychiatrist-orlando"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Schizophrenia Psychiatrist Orlando FL
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Board-certified psychiatrists specializing in schizophrenia treatment for adults in Orlando. Expert antipsychotic medication management with compassionate, stigma-free care. Get the support you deserve.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              className=""
              data-testid="button-hero-cta"
              onClick={() => trackEvent('schizophrenia_psychiatrist_orlando_hero_cta', 'conversion', 'Schizophrenia Psychiatrist Orlando Page')}
            >
              <a href="#contact-form">Request Appointment</a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="bg-background/20 backdrop-blur-sm border-white/30 text-white hover:bg-background/30"
              data-testid="button-hero-phone"
              onClick={handlePhoneClick}
            >
              <a href="tel:386-848-8751">Call (386) 848-8751</a>
            </Button>
          </div>
        </HeroBackground>

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
                <span>Schizophrenia Specialists</span>
              </div>
              <div className="hidden lg:block h-6 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Same-Week Appointments</span>
              </div>
            </div>
          </div>
        </section>

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
                  <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                  <a 
                    href="tel:386-848-8751" 
                    className="text-lg font-bold text-primary hover:underline"
                    data-testid="link-phone"
                    onClick={handlePhoneClick}
                  >
                    (386) 848-8751
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Same-week schizophrenia appointments
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3" data-testid="hours-info">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Office Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Mon-Fri: 9:00 AM - 6:00 PM<br />
                    Telehealth & in-person available
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

        <InsuranceSection />

        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              
              <section>
                <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                  Expert Schizophrenia Treatment in Orlando, FL
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Living with schizophrenia requires specialized psychiatric care from providers who understand this complex condition. At our <Link href="/psychiatrist-orlando" className="text-primary hover:underline font-medium">Orlando psychiatry clinic</Link>, our board-certified psychiatrists specialize in comprehensive schizophrenia treatment for adults, providing expert antipsychotic medication management and compassionate, stigma-free care.
                  </p>
                  <p className="text-foreground leading-relaxed mb-4">
                    Our Orlando schizophrenia psychiatrists work closely with each patient to develop personalized treatment plans that address both positive symptoms (hallucinations, delusions, disorganized thinking) and negative symptoms (reduced motivation, social withdrawal, flat affect). We believe in treating the whole person, not just the diagnosis, and are committed to helping you achieve stability and improved quality of life.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    We accept most major insurance plans and offer both in-person appointments at our Winter Park office (convenient to Orlando, Lake Mary, Altamonte Springs, and Maitland) and secure telepsychiatry options throughout Florida. Same-week appointments are typically available because we understand that timely access to psychiatric care is essential for managing schizophrenia effectively.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Our Schizophrenia Treatment Services
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Brain className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Comprehensive Psychiatric Evaluations</h3>
                      <p className="text-muted-foreground">
                        Thorough psychiatric assessments to accurately evaluate your symptoms, medical history, and current functioning. Our Orlando psychiatrists take time to understand your unique experience with schizophrenia to develop the most effective treatment approach.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Pill className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Antipsychotic Medication Management</h3>
                      <p className="text-muted-foreground">
                        Expert prescribing and monitoring of antipsychotic medications including second-generation antipsychotics (Abilify, Risperdal, Zyprexa, Seroquel, Latuda, Vraylar), first-generation antipsychotics, and long-acting injectable antipsychotics (LAIs). We carefully select medications based on symptom presentation, side effect profile, and your preferences.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Shield className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Ongoing Medication Monitoring</h3>
                      <p className="text-muted-foreground">
                        Regular follow-up appointments to monitor medication effectiveness, manage side effects, and adjust treatment as needed. We track metabolic health, movement symptoms, and overall response to ensure optimal outcomes while minimizing adverse effects.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Users className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Coordination with Care Team</h3>
                      <p className="text-muted-foreground">
                        Collaborative care with your therapist, case manager, primary care physician, and family members (with your permission). Effective schizophrenia treatment often involves a team approach, and we prioritize communication to ensure comprehensive, coordinated care.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Heart className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Compassionate, Stigma-Free Care</h3>
                      <p className="text-muted-foreground">
                        A supportive, non-judgmental environment where you are treated with dignity and respect. We understand the challenges and stigma that often accompany schizophrenia and are committed to providing care that empowers you on your recovery journey.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Antipsychotic Medications We Prescribe
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Our schizophrenia psychiatrists in Orlando have expertise with all FDA-approved antipsychotic medications:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-card p-4 rounded-lg border">
                      <h3 className="font-semibold text-foreground mb-2">Second-Generation (Atypical) Antipsychotics:</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li>• Aripiprazole (Abilify)</li>
                        <li>• Risperidone (Risperdal)</li>
                        <li>• Olanzapine (Zyprexa)</li>
                        <li>• Quetiapine (Seroquel)</li>
                        <li>• Lurasidone (Latuda)</li>
                        <li>• Cariprazine (Vraylar)</li>
                        <li>• Paliperidone (Invega)</li>
                        <li>• Ziprasidone (Geodon)</li>
                        <li>• Clozapine (Clozaril) for treatment-resistant cases</li>
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                      <h3 className="font-semibold text-foreground mb-2">Long-Acting Injectable (LAI) Options:</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li>• Abilify Maintena (monthly)</li>
                        <li>• Aristada (monthly/every 2 months)</li>
                        <li>• Risperdal Consta (bi-weekly)</li>
                        <li>• Invega Sustenna (monthly)</li>
                        <li>• Invega Trinza (every 3 months)</li>
                        <li>• Invega Hafyera (every 6 months)</li>
                      </ul>
                      <p className="text-xs text-muted-foreground mt-2">
                        LAIs can improve adherence and provide more stable symptom control
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Schizophrenia Symptoms We Treat
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Our Orlando schizophrenia psychiatrists address the full spectrum of symptoms:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Positive Symptoms:</h3>
                      <ul className="space-y-2 text-foreground">
                        <li className="flex gap-2"><span className="text-primary">•</span> Auditory hallucinations (hearing voices)</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Visual hallucinations</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Delusions (paranoid, grandiose, referential)</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Disorganized thinking and speech</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Disorganized or catatonic behavior</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Negative Symptoms:</h3>
                      <ul className="space-y-2 text-foreground">
                        <li className="flex gap-2"><span className="text-primary">•</span> Reduced emotional expression (flat affect)</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Decreased motivation (avolition)</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Social withdrawal</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Reduced speech output (alogia)</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Difficulty experiencing pleasure (anhedonia)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Why Choose Our Orlando Schizophrenia Psychiatrists?
                </h2>
                <div className="prose prose-lg max-w-none">
                  <ul className="space-y-3 text-foreground">
                    <li className="flex gap-3">
                      <Award className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Schizophrenia Expertise</strong> - Our board-certified psychiatrists have specialized training and extensive experience treating schizophrenia and related psychotic disorders in Orlando adults. We understand the complexities of this condition and how to optimize treatment.</span>
                    </li>
                    <li className="flex gap-3">
                      <Calendar className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Same-Week Appointments</strong> - Fast access to care because we know that timely psychiatric treatment is essential for managing schizophrenia. Don't wait weeks or months for an appointment.</span>
                    </li>
                    <li className="flex gap-3">
                      <Brain className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Evidence-Based Treatment</strong> - We use medications and approaches proven effective in clinical research, including the latest antipsychotic options and long-acting injectables. Our recommendations are based on current best practices in schizophrenia psychiatry.</span>
                    </li>
                    <li className="flex gap-3">
                      <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Personalized Medication Plans</strong> - No two people experience schizophrenia the same way. We tailor medication selection, dosing, and monitoring to your specific symptoms, side effect sensitivity, and treatment goals.</span>
                    </li>
                    <li className="flex gap-3">
                      <Video className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Flexible Appointment Options</strong> - Choose between in-person visits at our Winter Park office or convenient telehealth appointments. Both provide the same quality psychiatric care for your schizophrenia.</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">What medications do you prescribe for schizophrenia?</h3>
                    <p className="text-muted-foreground">
                      We prescribe a range of antipsychotic medications including second-generation antipsychotics (Abilify, Risperdal, Zyprexa, Seroquel, Latuda, Vraylar), first-generation antipsychotics when appropriate, and long-acting injectable antipsychotics (LAIs). We personalize medication selection based on your symptoms, side effect profile, and treatment goals.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">How quickly can I see a schizophrenia psychiatrist in Orlando?</h3>
                    <p className="text-muted-foreground">
                      We offer same-week appointments for adults seeking schizophrenia treatment in Orlando. Call (386) 848-8751 and our scheduling team will find the earliest available appointment with one of our psychiatrists.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Do you accept insurance for schizophrenia treatment?</h3>
                    <p className="text-muted-foreground">
                      Yes, we accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, Medicare, and many others. Most patients pay only their copay of $20-50 per session for schizophrenia medication management.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">What are long-acting injectable antipsychotics (LAIs)?</h3>
                    <p className="text-muted-foreground">
                      Long-acting injectable antipsychotics are medications given by injection every 2 weeks to 6 months, instead of taking daily pills. LAIs can improve medication adherence and provide more stable symptom control. Our psychiatrists can discuss if LAIs might be a good option for you.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Do you coordinate care with my therapist or case manager?</h3>
                    <p className="text-muted-foreground">
                      Yes, collaborative care is essential for optimal schizophrenia treatment. With your permission, we coordinate with your therapist, case manager, primary care physician, and other healthcare providers to ensure comprehensive, integrated care.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Is your practice stigma-free and supportive?</h3>
                    <p className="text-muted-foreground">
                      Absolutely. We understand that schizophrenia is often misunderstood and stigmatized. Our entire team is committed to providing compassionate, non-judgmental care in a welcoming environment where you are treated with dignity and respect.
                    </p>
                  </div>
                </div>
              </section>

            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Schedule Schizophrenia Evaluation</h3>
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
                        Call (386) 848-8751
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
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-3">Related Services</h3>
                  <div className="space-y-2">
                    <Link href="/psychiatrist-orlando" className="block text-sm text-primary hover:underline font-medium">
                      Psychiatrist Orlando
                    </Link>
                    <Link href="/psychiatrist-near-me" className="block text-sm text-primary hover:underline">
                      Psychiatrist Near Me
                    </Link>
                    <Link href="/medication-management-orlando" className="block text-sm text-primary hover:underline">
                      Medication Management Orlando
                    </Link>
                    <Link href="/bipolar-psychiatrist-orlando" className="block text-sm text-primary hover:underline">
                      Bipolar Disorder Treatment
                    </Link>
                    <Link href="/telepsychiatry-orlando" className="block text-sm text-primary hover:underline">
                      Telepsychiatry Orlando
                    </Link>
                    <Link href="/services" className="block text-sm text-primary hover:underline">
                      All Services
                    </Link>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-3">Insurance Accepted</h3>
                  <div className="space-y-2">
                    <Link href="/psychiatrist-orlando-accepts-cigna" className="block text-sm text-primary hover:underline">
                      Cigna Psychiatrist Orlando
                    </Link>
                    <Link href="/psychiatrist-orlando-accepts-bcbs" className="block text-sm text-primary hover:underline">
                      BCBS Psychiatrist Orlando
                    </Link>
                    <Link href="/psychiatrist-orlando-accepts-aetna" className="block text-sm text-primary hover:underline">
                      Aetna Psychiatrist Orlando
                    </Link>
                    <Link href="/medicare-psychiatrist-orlando" className="block text-sm text-primary hover:underline">
                      Medicare Psychiatrist Orlando
                    </Link>
                    <Link href="/psychiatrist-orlando-accepts-united-healthcare" className="block text-sm text-primary hover:underline">
                      United Healthcare Psychiatrist
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-sans font-bold text-foreground mb-8 text-center">
              Serving Orlando & Central Florida Communities
            </h2>
            <LocalizedContentMultiple 
              cities={["orlando", "winter-park"]} 
              variant="compact" 
            />
          </div>
        </section>

        <section className="py-16 bg-muted" id="contact-form">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-sans font-bold text-foreground mb-4">
                Schedule Your Schizophrenia Treatment Appointment
              </h2>
              <p className="text-lg text-muted-foreground">
                Same-week appointments available. Most insurance accepted. Adults 18+ only.
              </p>
            </div>
            <LeadCaptureForm therapyName="Schizophrenia Treatment" />
          </div>
        </section>

        <TrustFactors />
        
        <ReviewsAndBadges />
      </main>
      <SiteFooter />
    </div>
  );
}
