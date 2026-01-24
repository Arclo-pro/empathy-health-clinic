import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, MapPin, Phone, Clock, Star, CheckCircle, Brain, Shield, Calendar, Users, Video, Award, Heart } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import HeroBackground from "@/components/HeroBackground";
import ShortContactForm from "@/components/ShortContactForm";
const heroImage = "/site-assets/stock_images/professional_healthc_955227e9.jpg";
import { trackEvent } from "@/lib/analytics";

export default function AnxietyPsychiatristOrlando() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
        "@id": "https://empathyhealthclinic.com/anxiety-psychiatrist-orlando#organization",
        "name": "Empathy Health Clinic - Anxiety Psychiatrist Orlando FL",
        "parentOrganization": {
          "@id": "https://empathyhealthclinic.com/#organization"
        },
        "description": "Board-certified anxiety psychiatrists in Orlando, FL specializing in anxiety disorder treatment, panic disorder, social anxiety, GAD, and phobias. Medication management and comprehensive care.",
        "url": "https://empathyhealthclinic.com/anxiety-psychiatrist-orlando",
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
        "medicalSpecialty": "Psychiatry - Anxiety Specialist"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What does an anxiety psychiatrist do?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An anxiety psychiatrist is a medical doctor who specializes in diagnosing and treating anxiety disorders through medication management. They can prescribe anti-anxiety medications like SSRIs, SNRIs, and other medications to help reduce anxiety symptoms."
            }
          },
          {
            "@type": "Question",
            "name": "What medications do anxiety psychiatrists prescribe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Anxiety psychiatrists commonly prescribe SSRIs (like Zoloft, Lexapro), SNRIs (like Effexor, Cymbalta), buspirone, and in some cases benzodiazepines for short-term relief. The best medication depends on your specific symptoms and medical history."
            }
          },
          {
            "@type": "Question",
            "name": "How quickly can I see an anxiety psychiatrist in Orlando?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "At Empathy Health Clinic, we offer same-week appointments for new anxiety patients. Most people can schedule their first appointment within 3-5 business days. Call (386) 848-8751 to check availability."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between anxiety therapy and psychiatric treatment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Therapy focuses on talk-based treatments like CBT to change thought patterns and behaviors. Psychiatric treatment focuses on medication management to address the biological aspects of anxiety. Many patients benefit from combining both approaches."
            }
          },
          {
            "@type": "Question",
            "name": "Does insurance cover anxiety psychiatrist visits?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, most insurance plans cover psychiatric visits for anxiety treatment. At Empathy Health Clinic, we accept BCBS, Aetna, Cigna, United Healthcare, Medicare, and many other plans. Your typical copay is $20-50 per session."
            }
          },
          {
            "@type": "Question",
            "name": "Can an anxiety psychiatrist treat panic attacks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, anxiety psychiatrists are experts in treating panic disorder and panic attacks. They can prescribe medications that reduce the frequency and intensity of panic attacks and help prevent them from occurring."
            }
          }
        ]
      }
    ]
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Anxiety Psychiatrist Orlando Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Anxiety Psychiatrist Orlando | #1 Rated 2025"
        description="Anxiety psychiatrist Orlando - #1 rated specialists for panic, GAD, social anxiety & phobias. Same-week appointments, most insurance accepted. 4.8★ rating. Call (386) 848-8751."
        keywords={["anxiety psychiatrist orlando", "anxiety psychiatrist orlando fl", "anxiety doctor orlando", "orlando anxiety psychiatrist", "panic disorder psychiatrist orlando", "social anxiety doctor orlando", "GAD treatment orlando", "anxiety medication management orlando", "OCD psychiatrist orlando", "best anxiety psychiatrist orlando"]}
        canonicalPath="/anxiety-psychiatrist-orlando"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Anxiety Psychiatrist Orlando
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Board-certified psychiatrists specializing in anxiety disorder treatment for adults in Orlando. Expert medication management for panic disorder, social anxiety, GAD, and phobias. Get relief from anxiety today.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              className=""
              data-testid="button-hero-cta"
              onClick={() => trackEvent('anxiety_psychiatrist_orlando_hero_cta', 'conversion', 'Anxiety Psychiatrist Orlando Page')}
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
                <span>Anxiety Specialists</span>
              </div>
              <div className="hidden lg:block h-6 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Same-Week Appointments</span>
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
                    Same-week anxiety appointments
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
                    Accepting new anxiety patients
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Section */}
        <InsuranceSection />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              
              <section>
                <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                  Expert Anxiety Treatment in Orlando, FL
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Living with anxiety can feel overwhelming, affecting every aspect of your daily life. At our <Link href="/psychiatrist-orlando" className="text-primary hover:underline font-medium">Orlando psychiatry clinic</Link>, our board-certified psychiatrists specialize in comprehensive anxiety disorder treatment, providing evidence-based medication management and psychiatric care for adults experiencing panic attacks, social anxiety, generalized anxiety disorder (GAD), phobias, and other anxiety conditions.
                  </p>
                  <p className="text-foreground leading-relaxed mb-4">
                    Our Orlando anxiety psychiatrists understand that anxiety disorders are among the most common mental health conditions, affecting millions of Americans. Whether you're experiencing panic attacks at work, avoiding social situations due to social anxiety, struggling with constant worry from GAD, or feeling held back by specific phobias, we provide personalized treatment plans tailored to your unique symptoms and goals.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    We accept most major insurance plans and offer both in-person appointments at our Winter Park office (convenient to Orlando, Lake Mary, Altamonte Springs, and Maitland) and secure telepsychiatry options throughout Florida. Same-week appointments are typically available because we know that when anxiety is impacting your life, you shouldn't have to wait weeks for help.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Anxiety Disorders We Treat in Orlando
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Our anxiety psychiatrists have expertise treating all types of anxiety disorders:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <ul className="space-y-2 text-foreground">
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Generalized Anxiety Disorder (GAD)</strong> - Persistent, excessive worry about various aspects of daily life</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Panic Disorder</strong> - Recurrent panic attacks and fear of future attacks</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Social Anxiety Disorder</strong> - Intense fear of social situations and being judged by others</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Specific Phobias</strong> - Intense fear of specific objects or situations</span>
                      </li>
                    </ul>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Agoraphobia</strong> - Fear of situations where escape might be difficult</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Health Anxiety</strong> - Excessive worry about having a serious illness</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Performance Anxiety</strong> - Fear related to performing or speaking in front of others</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Post-Traumatic Stress Disorder (PTSD)</strong> - Anxiety following traumatic events</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Our Anxiety Treatment Services
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Brain className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Comprehensive Anxiety Evaluations</h3>
                      <p className="text-muted-foreground">
                        Thorough psychiatric assessments to accurately diagnose your specific anxiety disorder. Our Orlando psychiatrists use validated assessment tools and clinical interviews to understand your symptoms, triggers, and how anxiety affects your daily functioning.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Shield className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Anxiety Medication Management</h3>
                      <p className="text-muted-foreground">
                        Expert prescribing and monitoring of anxiety medications including SSRIs, SNRIs, non-benzodiazepine options, beta-blockers, and when appropriate, short-term relief medications. We carefully select medications based on your specific anxiety symptoms, medical history, and treatment goals while minimizing side effects.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Heart className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Panic Attack Treatment</h3>
                      <p className="text-muted-foreground">
                        Specialized treatment for panic disorder and panic attacks. We help you understand what triggers your panic attacks, provide medications to reduce their frequency and intensity, and develop strategies to manage them when they occur.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Users className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Integrated Treatment Approach</h3>
                      <p className="text-muted-foreground">
                        Collaborative care working with your therapist for combined medication and therapy. Research shows that combining psychiatric medication management with cognitive-behavioral therapy (CBT) often provides the best outcomes for anxiety disorders.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Common Anxiety Symptoms We Address
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Our Orlando anxiety psychiatrists treat the full range of anxiety symptoms:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Physical Symptoms:</h3>
                      <ul className="space-y-2 text-foreground">
                        <li className="flex gap-2"><span className="text-primary">•</span> Rapid heartbeat or palpitations</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Chest tightness or pain</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Shortness of breath</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Trembling or shaking</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Sweating or hot flashes</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Nausea or stomach upset</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Dizziness or lightheadedness</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Mental & Emotional Symptoms:</h3>
                      <ul className="space-y-2 text-foreground">
                        <li className="flex gap-2"><span className="text-primary">•</span> Excessive worry or fear</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Racing thoughts</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Difficulty concentrating</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Feeling on edge or restless</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Irritability</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Sleep problems</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Avoidance of situations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Anxiety Medications We Prescribe
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Our anxiety psychiatrists in Orlando have expertise with all FDA-approved anxiety medications:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-card p-4 rounded-lg border">
                      <h3 className="font-semibold text-foreground mb-2">Long-Term Anxiety Medications:</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li>• SSRIs (Lexapro, Zoloft, Prozac, Paxil)</li>
                        <li>• SNRIs (Effexor, Cymbalta, Pristiq)</li>
                        <li>• Non-benzodiazepine anti-anxiety medications</li>
                        <li>• Hydroxyzine (Vistaril)</li>
                        <li>• Beta-blockers for performance anxiety</li>
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                      <h3 className="font-semibold text-foreground mb-2">As-Needed Anxiety Medications:</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li>• Benzodiazepines (Xanax, Klonopin, Ativan)</li>
                        <li>• Propranolol for situational anxiety</li>
                        <li>• Gabapentin for certain anxiety types</li>
                      </ul>
                      <p className="text-xs text-muted-foreground mt-2">
                        Note: Benzodiazepines prescribed carefully due to dependence risk
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Why Choose Our Orlando Anxiety Psychiatrists?
                </h2>
                <div className="prose prose-lg max-w-none">
                  <ul className="space-y-3 text-foreground">
                    <li className="flex gap-3">
                      <Award className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Anxiety Disorder Expertise</strong> - Our board-certified psychiatrists have specialized training and extensive experience treating all types of anxiety disorders in Orlando adults. We understand the nuances of different anxiety presentations and how to optimize treatment.</span>
                    </li>
                    <li className="flex gap-3">
                      <Calendar className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Fast Access to Care</strong> - Same-week appointments available because we know anxiety doesn't wait. When panic attacks or severe anxiety are disrupting your life, you need help quickly, not in 6-8 weeks.</span>
                    </li>
                    <li className="flex gap-3">
                      <Brain className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Evidence-Based Treatment</strong> - We use medications and approaches proven effective in clinical research. Our treatment recommendations are based on the latest scientific evidence and best practices in anxiety psychiatry.</span>
                    </li>
                    <li className="flex gap-3">
                      <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Personalized Medication Plans</strong> - No two people experience anxiety the same way. We tailor medication selection and dosing to your specific symptoms, medical history, lifestyle, and treatment preferences.</span>
                    </li>
                    <li className="flex gap-3">
                      <Video className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Flexible Appointment Options</strong> - Choose between in-person visits at our Winter Park office or convenient telehealth appointments. Both provide the same quality psychiatric care for your anxiety.</span>
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
                    <h3 className="font-semibold text-foreground mb-2">How do I know if I need to see an anxiety psychiatrist?</h3>
                    <p className="text-muted-foreground">
                      Consider seeing an anxiety psychiatrist if anxiety is significantly impacting your daily life, work, relationships, or quality of life. Signs you may benefit include: frequent panic attacks, avoiding situations due to anxiety, constant worry that's hard to control, physical symptoms like rapid heartbeat or chest tightness, or if anxiety symptoms don't improve with therapy alone.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">What's the difference between an anxiety psychiatrist and a therapist?</h3>
                    <p className="text-muted-foreground">
                      Psychiatrists are medical doctors who can prescribe anxiety medications and provide medical treatment. Therapists provide talk therapy and counseling but cannot prescribe medications. Many Orlando patients benefit from both - seeing a psychiatrist for medication management and a therapist for cognitive-behavioral therapy (CBT) or other anxiety-focused therapy.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Will I have to take anxiety medication forever?</h3>
                    <p className="text-muted-foreground">
                      Not necessarily. Treatment duration varies by individual and anxiety type. Some people benefit from medication for several months to a year, especially when combined with therapy. Others may need longer-term treatment. We regularly reassess your progress and work together to determine the right treatment duration for your situation.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">How quickly do anxiety medications work?</h3>
                    <p className="text-muted-foreground">
                      It depends on the medication type. SSRIs and SNRIs typically take 4-6 weeks to reach full effectiveness, though some improvement may be noticed within 2-3 weeks. Some medications work within 30-60 minutes for acute relief but are typically used short-term. Non-benzodiazepine options take 2-4 weeks to work. We'll discuss timeline expectations when prescribing.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Do you prescribe Xanax or other benzodiazepines for anxiety?</h3>
                    <p className="text-muted-foreground">
                      Yes, our board-certified psychiatrists can prescribe benzodiazepines like Xanax, Klonopin, and Ativan when medically appropriate. However, due to dependence risks, we typically reserve these for specific situations like severe panic attacks or short-term use while waiting for other medications to take effect. We follow careful prescribing guidelines and monitoring protocols.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">How quickly can I see an anxiety psychiatrist in Orlando?</h3>
                    <p className="text-muted-foreground">
                      We typically offer same-week appointments for new anxiety patients. Call us at 386-848-8751 and our scheduling team will find the earliest available appointment with one of our anxiety specialist psychiatrists in Orlando.
                    </p>
                  </div>
                </div>
              </section>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Schedule Anxiety Evaluation</h3>
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
                    <Link href="/anxiety-therapy" className="block text-sm text-primary hover:underline font-medium">
                      Anxiety Therapy & Counseling
                    </Link>
                    <Link href="/psychiatrist-orlando" className="block text-sm text-primary hover:underline">
                      Psychiatrist Orlando
                    </Link>
                    <Link href="/psychiatrist-near-me" className="block text-sm text-primary hover:underline">
                      Psychiatrist Near Me
                    </Link>
                    <Link href="/adhd-testing-orlando" className="block text-sm text-primary hover:underline">
                      ADHD Testing
                    </Link>
                    <Link href="/services" className="block text-sm text-primary hover:underline">
                      Medication Management
                    </Link>
                    <Link href="/virtual-therapy" className="block text-sm text-primary hover:underline">
                      Virtual Therapy
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

        {/* Contact Form Section */}
        <section className="py-16 bg-muted" id="contact-form">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-sans font-bold text-foreground mb-4">
                Schedule Your Anxiety Treatment Appointment
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
