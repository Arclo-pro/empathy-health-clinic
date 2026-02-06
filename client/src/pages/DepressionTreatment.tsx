import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, Heart, Shield, Calendar, Brain, Star, CheckCircle, MapPin, Phone, Clock, Users, Pill, Sparkles, Activity, Award, ThumbsUp, ArrowRight, Quote } from "lucide-react";
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
const heroImage = "/site-assets/stock_images/calm_peaceful_therap_ae20056a.webp";
import { trackEvent } from "@/lib/analytics";

export default function DepressionTreatment() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalCondition",
        "@id": "https://www.empathyhealthclinic.com/depression-treatment/#condition",
        "name": "Depression",
        "alternateName": ["Major Depressive Disorder", "Clinical Depression", "MDD"],
        "description": "Depression is a serious mental health condition characterized by persistent feelings of sadness, hopelessness, and loss of interest in activities. It affects how you feel, think, and handle daily activities.",
        "code": {
          "@type": "MedicalCode",
          "code": "F32",
          "codingSystem": "ICD-10"
        },
        "signOrSymptom": [
          "Persistent sadness or low mood",
          "Loss of interest or pleasure in activities",
          "Changes in appetite or weight",
          "Sleep disturbances",
          "Fatigue or loss of energy",
          "Feelings of worthlessness or guilt",
          "Difficulty concentrating",
          "Thoughts of death or suicide"
        ],
        "possibleTreatment": [
          {
            "@type": "MedicalTherapy",
            "name": "Antidepressant Medication",
            "description": "FDA-approved medications including SSRIs, SNRIs, and other antidepressants to help regulate brain chemistry"
          },
          {
            "@type": "MedicalTherapy",
            "name": "Psychotherapy",
            "description": "Evidence-based therapy approaches including CBT and interpersonal therapy"
          },
          {
            "@type": "MedicalTherapy",
            "name": "TMS Therapy",
            "description": "Transcranial Magnetic Stimulation for treatment-resistant depression"
          }
        ]
      },
      {
        "@type": ["MedicalClinic", "LocalBusiness", "MedicalOrganization"],
        "@id": "https://www.empathyhealthclinic.com/depression-treatment/#organization",
        "name": "Empathy Health Clinic - Depression Treatment Orlando",
        "description": "Expert depression treatment in Orlando, FL. Board-certified psychiatrists providing medication management, therapy coordination, and comprehensive care for major depression and mood disorders.",
        "url": "https://www.empathyhealthclinic.com/depression-treatment",
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
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "17:00"
          }
        ],
        "medicalSpecialty": ["Psychiatry", "MentalHealth"],
        "areaServed": [
          { "@type": "City", "name": "Orlando" },
          { "@type": "City", "name": "Winter Park" },
          { "@type": "City", "name": "Altamonte Springs" },
          { "@type": "City", "name": "Kissimmee" }
        ],
        "isAcceptingNewPatients": true
      },
      {
        "@type": "Physician",
        "@id": "https://www.empathyhealthclinic.com/depression-treatment/#physician",
        "name": "Dr. Marna Morrow",
        "description": "Founder and lead psychiatrist specializing in depression treatment with over 15 years of experience in mood disorders.",
        "medicalSpecialty": "Psychiatry",
        "worksFor": { "@id": "https://www.empathyhealthclinic.com/depression-treatment/#organization" },
        "knowsAbout": ["Depression", "Major Depressive Disorder", "Treatment-Resistant Depression", "Medication Management"]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How long does depression treatment take to work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Antidepressant medications typically take 2-4 weeks to begin showing effects, with full benefits often seen at 6-8 weeks. Your psychiatrist will monitor your progress and adjust treatment as needed. Therapy combined with medication often produces faster, more lasting results."
            }
          },
          {
            "@type": "Question",
            "name": "What types of depression do you treat?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We treat all forms of depression including Major Depressive Disorder (MDD), Persistent Depressive Disorder (Dysthymia), Seasonal Affective Disorder (SAD), Postpartum Depression, Bipolar Depression, and Treatment-Resistant Depression. Our board-certified psychiatrists develop personalized treatment plans for each condition."
            }
          },
          {
            "@type": "Question",
            "name": "Do you accept insurance for depression treatment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, United Healthcare, and many others. Our team can verify your benefits before your first appointment. We also offer self-pay options for those without insurance."
            }
          },
          {
            "@type": "Question",
            "name": "What should I expect at my first depression treatment appointment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Your initial evaluation lasts about 60 minutes. Our psychiatrist will review your symptoms, medical history, and any previous treatments. Together, you'll develop a personalized treatment plan that may include medication, therapy referrals, and lifestyle recommendations. Same-week appointments are often available."
            }
          },
          {
            "@type": "Question",
            "name": "Can I get depression treatment via telehealth?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we offer secure video appointments for depression treatment throughout Florida. Telepsychiatry is just as effective as in-person care and provides convenient access to our board-certified psychiatrists from your home or office."
            }
          },
          {
            "@type": "Question",
            "name": "What if my current depression medication isn't working?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Treatment-resistant depression is one of our specialties. We offer medication optimization, combination therapies, and advanced treatments like TMS (Transcranial Magnetic Stimulation) for patients who haven't responded to traditional antidepressants. Our psychiatrists are experienced in finding solutions when first-line treatments fall short."
            }
          }
        ]
      }
    ]
  };

  const symptoms = [
    { icon: Heart, title: "Persistent Sadness", description: "Feeling sad, empty, or hopeless most of the day, nearly every day" },
    { icon: Activity, title: "Loss of Interest", description: "Diminished interest or pleasure in activities you once enjoyed" },
    { icon: Clock, title: "Sleep Problems", description: "Insomnia or sleeping too much, difficulty waking up" },
    { icon: Sparkles, title: "Low Energy", description: "Fatigue, tiredness, or loss of energy nearly every day" },
    { icon: Brain, title: "Concentration Issues", description: "Difficulty thinking, concentrating, or making decisions" },
    { icon: Users, title: "Social Withdrawal", description: "Avoiding friends, family, and social activities" }
  ];

  const treatmentModalities = [
    {
      icon: Pill,
      title: "Medication Management",
      description: "Our psychiatrists prescribe and carefully monitor FDA-approved antidepressants including SSRIs (Prozac, Lexapro), SNRIs (Effexor, Cymbalta), and other medications tailored to your specific symptoms and needs.",
      features: ["Personalized medication selection", "Regular dosage optimization", "Side effect management", "Drug interaction screening"]
    },
    {
      icon: Heart,
      title: "Therapy Coordination",
      description: "We coordinate with licensed therapists to provide comprehensive care combining medication with evidence-based psychotherapy approaches like Cognitive Behavioral Therapy (CBT) and Interpersonal Therapy.",
      features: ["CBT for negative thought patterns", "Interpersonal therapy", "Mindfulness-based approaches", "Integrated treatment planning"]
    },
    {
      icon: Sparkles,
      title: "TMS Therapy",
      description: "For treatment-resistant depression, we offer Transcranial Magnetic Stimulation (TMS) - an FDA-approved, non-invasive treatment that uses magnetic pulses to stimulate areas of the brain involved in mood regulation.",
      features: ["FDA-approved treatment", "Non-invasive procedure", "No medication side effects", "Covered by most insurance"]
    }
  ];

  const testimonials = [
    {
      quote: "After years of struggling with depression, I finally found a treatment that works. Dr. Morrow took the time to understand my situation and found the right medication combination. I feel like myself again.",
      author: "Michael R.",
      location: "Orlando, FL",
      condition: "Major Depression"
    },
    {
      quote: "The team at Empathy Health Clinic changed my life. They were patient, understanding, and never gave up on finding a solution for my treatment-resistant depression. TMS therapy was a game-changer for me.",
      author: "Jennifer S.",
      location: "Winter Park, FL",
      condition: "Treatment-Resistant Depression"
    },
    {
      quote: "I was hesitant to try medication, but the psychiatrist explained everything clearly and addressed all my concerns. The combination of therapy and medication management has helped me get my life back on track.",
      author: "David L.",
      location: "Altamonte Springs, FL",
      condition: "Persistent Depressive Disorder"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Depression Treatment in Orlando | Empathy Health Clinic"
        description="Expert depression treatment in Orlando, FL. Medication management, therapy, and TMS for major depression. Insurance accepted. Same-week appointments. Call 386-848-8751."
        keywords={["depression treatment orlando", "depression treatment", "depression treatment near me", "depression doctor orlando", "depression medication orlando", "major depression treatment", "clinical depression treatment", "depression psychiatrist orlando"]}
        canonicalPath="/depression-treatment"
        jsonLd={jsonLd}
        preloadImage={heroImage}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Depression Treatment in Orlando
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Comprehensive, compassionate care for depression from board-certified psychiatrists. We help you find the right treatment - whether that's medication, therapy, or advanced options like TMS - so you can feel like yourself again.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              data-testid="button-hero-cta"
              onClick={() => trackEvent('depression_treatment_hero_cta', 'conversion', 'Depression Treatment Page')}
            >
              <a href="#contact-form">Book an Evaluation for Depression</a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="bg-background/20 backdrop-blur-sm border-white/30 text-white"
              data-testid="button-hero-phone"
              onClick={() => trackEvent('phone_click', 'conversion', 'Depression Treatment Page - Hero')}
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
                <span>Depression Specialists</span>
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
                  <h3 className="font-semibold text-foreground mb-1">Orlando Location</h3>
                  <p className="text-sm text-muted-foreground">
                    2281 Lee Rd Suite 102<br />
                    Orlando, FL 32810
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3" data-testid="phone-info">
                <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Call Us Today</h3>
                  <a href="tel:386-848-8751" className="text-sm text-primary hover:underline">386-848-8751</a>
                </div>
              </div>
              <div className="flex items-start gap-3" data-testid="hours-info">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Office Hours</h3>
                  <p className="text-sm text-muted-foreground">Mon-Fri: 9am - 5pm<br />Telehealth Available</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InsuranceSection />

        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-sans font-bold mb-6 text-foreground">
                  Understanding Depression
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Depression is more than just feeling sad - it's a serious medical condition that affects how you think, feel, and function. At Empathy Health Clinic, we understand that depression looks different for everyone, and we tailor our treatment approach to your unique needs.
                </p>
                <p className="text-muted-foreground mb-6">
                  Depression can be caused by a combination of genetic, biological, environmental, and psychological factors. Life events like trauma, loss, or chronic stress can trigger depression, as can medical conditions and certain medications. The good news is that depression is highly treatable - most people who seek help experience significant improvement.
                </p>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
                  <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Why Choose Us for Depression Treatment?
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span>Board-certified psychiatrists specializing in mood disorders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span>Evidence-based treatment protocols with proven results</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span>TMS therapy for treatment-resistant cases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span>Same-week appointments and telehealth options</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-6">Common Signs of Depression</h3>
                <div className="grid gap-4">
                  {symptoms.map((symptom, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-card border border-card-border rounded-xl">
                      <div className="bg-primary/10 rounded-lg p-2">
                        <symptom.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{symptom.title}</h4>
                        <p className="text-sm text-muted-foreground">{symptom.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4 italic">
                  If you're experiencing several of these symptoms for more than two weeks, it may be time to seek professional help. Depression is treatable, and you don't have to face it alone.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4 text-foreground text-center">
              Our Depression Treatment Approach
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              We offer comprehensive, evidence-based treatment options tailored to your unique needs and goals.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {treatmentModalities.map((modality, index) => (
                <div key={index} className="bg-card border border-card-border rounded-xl p-6">
                  <div className="bg-primary/10 rounded-lg p-3 w-fit mb-4">
                    <modality.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{modality.title}</h3>
                  <p className="text-muted-foreground mb-4">{modality.description}</p>
                  <ul className="space-y-2">
                    {modality.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4 text-foreground text-center">
              Patient Success Stories
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Real experiences from patients who found relief through our depression treatment program.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-card border border-card-border rounded-xl p-6">
                  <Quote className="h-8 w-8 text-primary/30 mb-4" />
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-full p-2">
                      <ThumbsUp className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location} - {testimonial.condition}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4 text-foreground text-center">
              Meet Our Depression Specialists
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Our board-certified psychiatrists specialize in treating depression and mood disorders.
            </p>
            <div className="bg-card border border-card-border rounded-xl p-8 max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-primary/10 rounded-full p-4 flex-shrink-0">
                  <Award className="h-12 w-12 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Dr. Marna Morrow, MD</h3>
                  <p className="text-primary font-medium mb-3">Founder & Lead Psychiatrist</p>
                  <p className="text-muted-foreground mb-4">
                    Dr. Morrow is a board-certified psychiatrist with over 15 years of experience specializing in mood disorders and depression treatment. She founded Empathy Health Clinic with a mission to provide compassionate, personalized psychiatric care to the Orlando community.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">Board Certified</span>
                    <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">Depression Specialist</span>
                    <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">TMS Certified</span>
                    <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">15+ Years Experience</span>
                  </div>
                  <div className="mt-4">
                    <a 
                      href="https://www.psychologytoday.com/us/psychiatrists/empathy-health-clinic-llc-orlando-fl/1121969" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      View Profile on Psychology Today <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-8 text-foreground text-center">
              Frequently Asked Questions About Depression Treatment
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-card border border-card-border rounded-xl p-6">
                <h3 className="font-bold text-foreground mb-3">How long does depression treatment take to work?</h3>
                <p className="text-sm text-muted-foreground">
                  Antidepressant medications typically take 2-4 weeks to begin showing effects, with full benefits often seen at 6-8 weeks. Your psychiatrist will monitor your progress and adjust treatment as needed.
                </p>
              </div>
              <div className="bg-card border border-card-border rounded-xl p-6">
                <h3 className="font-bold text-foreground mb-3">What types of depression do you treat?</h3>
                <p className="text-sm text-muted-foreground">
                  We treat all forms including Major Depressive Disorder, Persistent Depressive Disorder, Seasonal Affective Disorder, Postpartum Depression, and Treatment-Resistant Depression.
                </p>
              </div>
              <div className="bg-card border border-card-border rounded-xl p-6">
                <h3 className="font-bold text-foreground mb-3">Do you accept insurance for depression treatment?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, we accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, United Healthcare, and many others. We also offer self-pay options.
                </p>
              </div>
              <div className="bg-card border border-card-border rounded-xl p-6">
                <h3 className="font-bold text-foreground mb-3">What should I expect at my first appointment?</h3>
                <p className="text-sm text-muted-foreground">
                  Your initial evaluation lasts about 60 minutes. Our psychiatrist will review your symptoms, medical history, and develop a personalized treatment plan.
                </p>
              </div>
              <div className="bg-card border border-card-border rounded-xl p-6">
                <h3 className="font-bold text-foreground mb-3">Can I get depression treatment via telehealth?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, we offer secure video appointments throughout Florida. Telepsychiatry is just as effective as in-person care and provides convenient access from your home.
                </p>
              </div>
              <div className="bg-card border border-card-border rounded-xl p-6">
                <h3 className="font-bold text-foreground mb-3">What if my current medication isn't working?</h3>
                <p className="text-sm text-muted-foreground">
                  Treatment-resistant depression is one of our specialties. We offer medication optimization, combination therapies, and advanced treatments like TMS Therapy.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-8 text-foreground text-center">
              Related Mental Health Services
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <Link href="/depression-psychiatrist-orlando" className="bg-card border border-card-border rounded-xl p-6 hover-elevate group">
                <Brain className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Depression Psychiatrist Orlando</h3>
                <p className="text-sm text-muted-foreground">Board-certified psychiatrists specializing in depression medication</p>
              </Link>
              <Link href="/anxiety-therapy" className="bg-card border border-card-border rounded-xl p-6 hover-elevate group">
                <Heart className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Anxiety Treatment</h3>
                <p className="text-sm text-muted-foreground">Treatment for GAD, panic disorder, and social anxiety</p>
              </Link>
              <Link href="/bipolar-psychiatrist-orlando" className="bg-card border border-card-border rounded-xl p-6 hover-elevate group">
                <Activity className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Bipolar Disorder</h3>
                <p className="text-sm text-muted-foreground">Expert care for bipolar I, II, and mood stabilization</p>
              </Link>
              <Link href="/tms-treatment" className="bg-card border border-card-border rounded-xl p-6 hover-elevate group">
                <Sparkles className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">TMS Therapy</h3>
                <p className="text-sm text-muted-foreground">Advanced treatment for treatment-resistant depression</p>
              </Link>
            </div>
          </div>
        </section>

        <AuthoritativeSourcesBlock sources={[
          { name: "NIMH", title: "Depression Overview", url: "https://www.nimh.nih.gov/health/topics/depression" },
          { name: "APA", title: "What Is Depression?", url: "https://www.psychiatry.org/patients-families/depression/what-is-depression" },
          { name: "NIH", title: "Depression Treatment", url: "https://www.ncbi.nlm.nih.gov/books/NBK559078/" }
        ]} />

        <section id="contact-form" className="py-16 px-4 bg-primary/5 scroll-mt-16">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-3xl font-sans font-bold mb-4 text-foreground text-center">
              Start Your Depression Treatment Today
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-8">
              Take the first step toward feeling better. Schedule your evaluation with one of our depression specialists.
            </p>
            <ShortContactForm 
              source="depression-treatment"
              showInsuranceField={true}
            />
          </div>
        </section>

        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-sans font-bold mb-6 text-foreground text-center">
              Orlando Areas We Serve for Depression Treatment
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {["Downtown Orlando", "Winter Park", "College Park", "Baldwin Park", "Thornton Park", "Maitland", "Altamonte Springs", "Casselberry", "Longwood", "Lake Mary", "Sanford", "Apopka", "Ocoee", "Kissimmee", "MetroWest", "Dr. Phillips"].map((area) => (
                <span key={area} className="bg-muted px-4 py-2 rounded-full text-sm text-muted-foreground">
                  {area}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.4721!2d-81.36537!3d28.59544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e77162d!2s2281+Lee+Rd+Suite+102%2C+Orlando%2C+FL+32810!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Empathy Health Clinic Orlando Location"
              />
            </div>
          </div>
        </section>

        <TrustFactors />
        <ReviewsAndBadges />
      </main>
      <SiteFooter />
    </div>
  );
}
