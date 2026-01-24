import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, MapPin, Phone, Clock, Star, CheckCircle, Brain, Shield, Calendar, Users, Video, Award, Heart, AlertTriangle } from "lucide-react";
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
const heroImage = "/site-assets/stock_images/professional_healthc_955227e9.jpg";
import { trackEvent } from "@/lib/analytics";

export default function TraumaPsychiatristOrlando() {
  const faqSchema = {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a trauma psychiatrist?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A trauma psychiatrist is a medical doctor specializing in treating trauma-related mental health conditions including PTSD, complex trauma, and acute stress disorder. They provide comprehensive psychiatric evaluations, medication management, and work collaboratively with trauma therapists to provide complete care for adults affected by traumatic experiences."
        }
      },
      {
        "@type": "Question",
        "name": "What medications do trauma psychiatrists prescribe for PTSD?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Trauma psychiatrists prescribe FDA-approved medications for PTSD including SSRIs like sertraline (Zoloft) and paroxetine (Paxil), SNRIs like venlafaxine (Effexor), and prazosin for trauma-related nightmares. Treatment is personalized based on your specific symptoms and medical history."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can I see a trauma psychiatrist in Orlando?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "At Empathy Health Clinic, we offer same-week appointments for new trauma and PTSD patients. We understand that trauma symptoms can be debilitating, so we prioritize getting you care quickly. Call (386) 848-8751 to schedule your appointment."
        }
      },
      {
        "@type": "Question",
        "name": "Do you accept insurance for trauma psychiatry in Orlando?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, UMR, and Medicare. Most patients pay only their copay of $20-50 per session for trauma psychiatry services."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between trauma therapy and trauma psychiatry?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Trauma therapy (provided by therapists) focuses on talk therapy approaches like EMDR and cognitive processing therapy. Trauma psychiatry (provided by psychiatrists) focuses on medication management for PTSD symptoms. Many patients benefit from both approaches working together - medication to reduce symptom intensity while therapy addresses underlying trauma."
        }
      },
      {
        "@type": "Question",
        "name": "Can prazosin help with PTSD nightmares?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, prazosin is an effective medication for reducing trauma-related nightmares and improving sleep in PTSD patients. Our Orlando trauma psychiatrists frequently prescribe prazosin as part of comprehensive PTSD treatment. It works by blocking certain stress hormones that contribute to nightmare frequency and intensity."
        }
      }
    ]
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
        "@id": "https://empathyhealthclinic.com/trauma-psychiatrist-orlando#organization",
        "name": "Empathy Health Clinic - Trauma Psychiatrist Orlando FL",
        "parentOrganization": {
          "@id": "https://empathyhealthclinic.com/#organization"
        },
        "description": "Board-certified trauma psychiatrists in Orlando, FL specializing in PTSD treatment, trauma-related disorders, and evidence-based medication management for adults affected by traumatic experiences.",
        "url": "https://empathyhealthclinic.com/trauma-psychiatrist-orlando",
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
        "medicalSpecialty": "Psychiatry - Trauma & PTSD Specialist"
      },
      faqSchema
    ]
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Trauma Psychiatrist Orlando Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Trauma Psychiatrist Orlando FL | PTSD & Trauma Treatment"
        description="Trauma psychiatrist Orlando - expert PTSD treatment and trauma-informed psychiatric care for adults. Same-week appointments, most insurance accepted. Call (386) 848-8751."
        keywords={["trauma psychiatrist orlando", "trauma psychiatrist orlando fl", "ptsd psychiatrist orlando", "ptsd treatment orlando", "trauma doctor orlando", "ptsd medication management orlando", "trauma therapy orlando", "complex ptsd treatment orlando", "best trauma psychiatrist orlando"]}
        canonicalPath="/trauma-psychiatrist-orlando"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Trauma Psychiatrist Orlando FL
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Board-certified psychiatrists specializing in trauma-informed care and PTSD treatment for adults in Orlando. Expert medication management with evidence-based treatments. Begin healing from trauma today.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              className=""
              data-testid="button-hero-cta"
              onClick={() => trackEvent('trauma_psychiatrist_orlando_hero_cta', 'conversion', 'Trauma Psychiatrist Orlando Page')}
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
              <a href="tel:386-848-8751">Call 386-848-8751</a>
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
                <span>Trauma & PTSD Specialists</span>
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
                    Get Directions
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
                    386-848-8751
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Same-week trauma appointments
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
                    Accepting new PTSD patients
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
                  Expert Trauma & PTSD Treatment in Orlando, FL
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Living with the effects of trauma can feel isolating and overwhelming. At our <Link href="/psychiatrist-orlando" className="text-primary hover:underline font-medium">Orlando psychiatry clinic</Link>, our board-certified psychiatrists specialize in trauma-informed psychiatric care, providing evidence-based medication management for adults experiencing PTSD, complex trauma, acute stress disorder, and other trauma-related conditions.
                  </p>
                  <p className="text-foreground leading-relaxed mb-4">
                    Our Orlando trauma psychiatrists understand that trauma affects everyone differently. Whether you're experiencing flashbacks, nightmares, hypervigilance, emotional numbness, or difficulty with relationships after a traumatic event, we provide personalized treatment plans tailored to your unique symptoms and healing journey. We serve adults 18 and older seeking compassionate, specialized care.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    We accept most major insurance plans and offer both in-person appointments at our Winter Park office (convenient to Orlando, Lake Mary, Altamonte Springs, and Maitland) and secure <Link href="/telepsychiatry-orlando" className="text-primary hover:underline">telepsychiatry</Link> options throughout Florida. Same-week appointments are typically available because we know that when trauma symptoms are affecting your life, you shouldn't have to wait weeks for help.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Trauma & PTSD Conditions We Treat in Orlando
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Our trauma psychiatrists have expertise treating all types of trauma-related conditions:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <ul className="space-y-2 text-foreground">
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Post-Traumatic Stress Disorder (PTSD)</strong> - Symptoms following traumatic events including flashbacks, nightmares, and hypervigilance</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Complex PTSD</strong> - Trauma from prolonged, repeated experiences such as childhood abuse or domestic violence</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Acute Stress Disorder</strong> - Short-term trauma response occurring within a month of the event</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Adjustment Disorders</strong> - Difficulty coping after significant life changes or stressors</span>
                      </li>
                    </ul>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Trauma-Related Depression</strong> - Depressive symptoms stemming from traumatic experiences</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Trauma-Related Anxiety</strong> - Anxiety disorders triggered or worsened by trauma</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Trauma-Related Insomnia</strong> - Sleep disturbances and nightmares related to trauma</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Dissociative Symptoms</strong> - Feeling disconnected from yourself or surroundings after trauma</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Our Trauma Psychiatry Services
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Brain className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Comprehensive Trauma Evaluations</h3>
                      <p className="text-muted-foreground">
                        Thorough psychiatric assessments to accurately diagnose PTSD and trauma-related conditions. Our Orlando psychiatrists use validated assessment tools like the PCL-5 and clinical interviews to understand your trauma history, current symptoms, and how they affect your daily functioning.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Shield className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">PTSD Medication Management</h3>
                      <p className="text-muted-foreground">
                        Expert prescribing and monitoring of evidence-based PTSD medications including SSRIs (sertraline, paroxetine), SNRIs (venlafaxine), and prazosin for trauma-related nightmares. We carefully select medications based on your specific symptoms, medical history, and treatment goals.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <AlertTriangle className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Nightmare & Sleep Treatment</h3>
                      <p className="text-muted-foreground">
                        Specialized treatment for trauma-related nightmares and insomnia. Prazosin has shown significant effectiveness in reducing nightmare frequency and improving sleep quality for PTSD patients. We also address hyperarousal symptoms that interfere with restful sleep.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Users className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Collaboration with Trauma Therapists</h3>
                      <p className="text-muted-foreground">
                        We work closely with trauma therapists providing <Link href="/emdr-therapy" className="text-primary hover:underline">EMDR</Link>, cognitive processing therapy (CPT), and prolonged exposure therapy. Research shows that combining psychiatric medication management with trauma-focused therapy often provides the best outcomes for PTSD recovery.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Common PTSD Symptoms We Treat
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Our Orlando trauma psychiatrists treat the full range of PTSD and trauma symptoms:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Intrusion Symptoms:</h3>
                      <ul className="space-y-2 text-foreground">
                        <li className="flex gap-2"><span className="text-primary">•</span> Flashbacks and intrusive memories</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Recurring nightmares</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Intense distress at trauma reminders</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Physical reactions to triggers</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Avoidance & Mood Symptoms:</h3>
                      <ul className="space-y-2 text-foreground">
                        <li className="flex gap-2"><span className="text-primary">•</span> Avoiding trauma-related thoughts or situations</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Emotional numbness or detachment</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Negative beliefs about self or world</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Difficulty experiencing positive emotions</li>
                      </ul>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 mt-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Hyperarousal Symptoms:</h3>
                      <ul className="space-y-2 text-foreground">
                        <li className="flex gap-2"><span className="text-primary">•</span> Hypervigilance and being easily startled</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Irritability or angry outbursts</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Difficulty concentrating</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Sleep disturbances</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Dissociative Symptoms:</h3>
                      <ul className="space-y-2 text-foreground">
                        <li className="flex gap-2"><span className="text-primary">•</span> Feeling detached from yourself</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Feeling like things aren't real</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Memory gaps related to trauma</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Emotional disconnection</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  PTSD Medications We Prescribe
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Our trauma psychiatrists in Orlando have expertise with all FDA-approved and evidence-based PTSD medications:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-card p-4 rounded-lg border">
                      <h3 className="font-semibold text-foreground mb-2">First-Line PTSD Medications:</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li>• Sertraline (Zoloft) - FDA-approved for PTSD</li>
                        <li>• Paroxetine (Paxil) - FDA-approved for PTSD</li>
                        <li>• Venlafaxine (Effexor XR) - Effective SNRI</li>
                        <li>• Fluoxetine (Prozac) - Strong evidence base</li>
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                      <h3 className="font-semibold text-foreground mb-2">Targeted Symptom Medications:</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li>• Prazosin - For nightmares and sleep</li>
                        <li>• Trazodone - For trauma-related insomnia</li>
                        <li>• Hydroxyzine - For acute anxiety</li>
                        <li>• Propranolol - For hyperarousal symptoms</li>
                      </ul>
                      <p className="text-xs text-muted-foreground mt-2">
                        Medications selected based on your specific symptom profile
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Why Choose Our Orlando Trauma Psychiatrists?
                </h2>
                <div className="prose prose-lg max-w-none">
                  <ul className="space-y-3 text-foreground">
                    <li className="flex gap-3">
                      <Award className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Trauma-Informed Expertise</strong> - Our board-certified psychiatrists have specialized training in trauma and PTSD treatment for adults. We create a safe, non-judgmental environment where healing can begin.</span>
                    </li>
                    <li className="flex gap-3">
                      <Calendar className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Fast Access to Care</strong> - Same-week appointments available because we know trauma symptoms can be debilitating. When PTSD is disrupting your life, you need help quickly.</span>
                    </li>
                    <li className="flex gap-3">
                      <Brain className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Evidence-Based Treatment</strong> - We use medications proven effective in clinical research. Our treatment follows VA/DoD and APA guidelines for PTSD treatment.</span>
                    </li>
                    <li className="flex gap-3">
                      <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Personalized Medication Plans</strong> - No two trauma survivors are the same. We tailor medication selection to your specific symptoms, trauma history, and treatment preferences.</span>
                    </li>
                    <li className="flex gap-3">
                      <Video className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Flexible Appointment Options</strong> - Choose between in-person visits at our Winter Park office or convenient telehealth appointments. Both provide the same quality psychiatric care.</span>
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
                    <h3 className="font-semibold text-foreground mb-2">What is a trauma psychiatrist?</h3>
                    <p className="text-muted-foreground">
                      A trauma psychiatrist is a medical doctor specializing in treating trauma-related mental health conditions including PTSD, complex trauma, and acute stress disorder. They provide comprehensive psychiatric evaluations, medication management, and work collaboratively with trauma therapists to provide complete care for adults affected by traumatic experiences.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">What medications help with PTSD?</h3>
                    <p className="text-muted-foreground">
                      FDA-approved medications for PTSD include sertraline (Zoloft) and paroxetine (Paxil), both SSRIs. Venlafaxine (Effexor), an SNRI, is also effective. Prazosin is commonly prescribed for trauma-related nightmares. Our <Link href="/psychiatrist-orlando" className="text-primary hover:underline">Orlando psychiatrists</Link> will work with you to find the best medication approach for your symptoms.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Can prazosin help with PTSD nightmares?</h3>
                    <p className="text-muted-foreground">
                      Yes, prazosin is an effective medication for reducing trauma-related nightmares and improving sleep in PTSD patients. It works by blocking certain stress hormones that contribute to nightmare frequency and intensity. Many patients experience significant improvement in sleep quality within weeks of starting treatment.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Do I need both a psychiatrist and therapist for PTSD?</h3>
                    <p className="text-muted-foreground">
                      Many patients benefit from both. A trauma psychiatrist manages medications that reduce symptom intensity, while a trauma therapist provides therapy approaches like <Link href="/emdr-therapy" className="text-primary hover:underline">EMDR</Link> or cognitive processing therapy to address the underlying trauma. We collaborate closely with trauma therapists to provide comprehensive care.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">How long does PTSD medication treatment take?</h3>
                    <p className="text-muted-foreground">
                      Treatment duration varies by individual. Most patients take PTSD medications for at least 6-12 months, though some benefit from longer-term treatment. We regularly reassess your progress and work together to determine the right treatment duration for your recovery.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">How quickly can I see a trauma psychiatrist in Orlando?</h3>
                    <p className="text-muted-foreground">
                      We typically offer same-week appointments for new trauma and PTSD patients. Call us at 386-848-8751 and our scheduling team will find the earliest available appointment with one of our trauma specialist psychiatrists in Orlando.
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-muted rounded-lg p-6">
                <LocalizedContentMultiple 
                  variant="chips"
                  cities={["Orlando", "Winter Park", "Altamonte Springs", "Maitland", "Lake Mary", "Sanford"]}
                  title="Serving Trauma & PTSD Patients Throughout Central Florida"
                />
              </section>

            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Schedule Trauma Evaluation</h3>
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
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-3">Related Services</h3>
                  <div className="space-y-2">
                    <Link href="/psychiatrist-orlando" className="block text-sm text-primary hover:underline font-medium">
                      Psychiatrist Orlando
                    </Link>
                    <Link href="/ptsd-psychiatrist-orlando" className="block text-sm text-primary hover:underline">
                      PTSD Psychiatrist Orlando
                    </Link>
                    <Link href="/emdr-therapy" className="block text-sm text-primary hover:underline">
                      EMDR Therapy
                    </Link>
                    <Link href="/anxiety-psychiatrist-orlando" className="block text-sm text-primary hover:underline">
                      Anxiety Psychiatrist Orlando
                    </Link>
                    <Link href="/depression-psychiatrist-orlando" className="block text-sm text-primary hover:underline">
                      Depression Psychiatrist Orlando
                    </Link>
                    <Link href="/services" className="block text-sm text-primary hover:underline">
                      All Mental Health Services
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
                    <Link href="/therapist-accepts-umr" className="block text-sm text-primary hover:underline">
                      UMR Psychiatrist Orlando
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

        <section className="py-16 bg-muted" id="contact-form">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-sans font-bold text-foreground mb-4">
                Schedule Your Trauma & PTSD Consultation
              </h2>
              <p className="text-lg text-muted-foreground">
                Same-week appointments available. Most insurance accepted.
              </p>
            </div>
            <LeadCaptureForm therapyName="Trauma & PTSD Treatment" />
          </div>
        </section>

        <TrustFactors />
        
        <ReviewsAndBadges />
      </main>
      <SiteFooter />
    </div>
  );
}
