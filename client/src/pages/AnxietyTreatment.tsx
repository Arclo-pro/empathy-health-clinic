import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Heart, Shield, Calendar, Brain, MapPin, Phone, Clock, Star, CheckCircle, CheckCircle2, AlertCircle, Activity, Users, Sparkles, Pill, Award, Quote, ThumbsUp, ArrowRight, ClipboardCheck } from "lucide-react";
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
const heroImage = "/site-assets/stock_images/calm_peaceful_therap_b118766b.webp";
import { trackEvent } from "@/lib/analytics";

export default function AnxietyTreatment() {
  const [quizAnswers, setQuizAnswers] = useState<Record<number, boolean>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalCondition",
        "@id": "https://www.empathyhealthclinic.com/anxiety-treatment/#gad",
        "name": "Generalized Anxiety Disorder",
        "alternateName": ["GAD", "Chronic Anxiety"],
        "description": "A mental health disorder characterized by persistent and excessive worry about various aspects of life, often accompanied by physical symptoms like restlessness, fatigue, and muscle tension.",
        "code": {
          "@type": "MedicalCode",
          "code": "F41.1",
          "codingSystem": "ICD-10"
        },
        "signOrSymptom": [
          "Excessive worry about everyday matters",
          "Difficulty controlling worry",
          "Restlessness or feeling on edge",
          "Fatigue",
          "Difficulty concentrating",
          "Muscle tension",
          "Sleep problems"
        ]
      },
      {
        "@type": "MedicalCondition",
        "@id": "https://www.empathyhealthclinic.com/anxiety-treatment/#panic",
        "name": "Panic Disorder",
        "description": "An anxiety disorder characterized by recurrent, unexpected panic attacks - sudden episodes of intense fear accompanied by physical symptoms like racing heart, shortness of breath, and chest pain.",
        "code": {
          "@type": "MedicalCode",
          "code": "F41.0",
          "codingSystem": "ICD-10"
        },
        "signOrSymptom": [
          "Sudden intense fear or discomfort",
          "Racing or pounding heartbeat",
          "Sweating",
          "Trembling or shaking",
          "Shortness of breath",
          "Chest pain",
          "Fear of losing control or dying"
        ]
      },
      {
        "@type": "MedicalCondition",
        "@id": "https://www.empathyhealthclinic.com/anxiety-treatment/#social",
        "name": "Social Anxiety Disorder",
        "alternateName": ["Social Phobia"],
        "description": "An intense, persistent fear of being watched and judged by others in social or performance situations that causes significant distress and impairs daily functioning.",
        "code": {
          "@type": "MedicalCode",
          "code": "F40.10",
          "codingSystem": "ICD-10"
        }
      },
      {
        "@type": ["MedicalClinic", "LocalBusiness", "MedicalOrganization"],
        "@id": "https://www.empathyhealthclinic.com/anxiety-treatment/#organization",
        "name": "Empathy Health Clinic - Anxiety Treatment Orlando",
        "description": "Expert anxiety treatment in Orlando, FL. Board-certified psychiatrists providing comprehensive care for generalized anxiety, panic disorder, social anxiety, and phobias.",
        "url": "https://www.empathyhealthclinic.com/anxiety-treatment",
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
        "medicalSpecialty": ["Psychiatry", "AnxietyDisorders"],
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
        "@id": "https://www.empathyhealthclinic.com/anxiety-treatment/#physician",
        "name": "Dr. Marna Morrow",
        "description": "Board-certified psychiatrist specializing in anxiety disorders with expertise in medication management and evidence-based treatments.",
        "medicalSpecialty": "Psychiatry",
        "worksFor": { "@id": "https://www.empathyhealthclinic.com/anxiety-treatment/#organization" },
        "knowsAbout": ["Generalized Anxiety Disorder", "Panic Disorder", "Social Anxiety", "Medication Management", "CBT Coordination"]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are the signs I need professional help for anxiety?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You should seek professional help if anxiety interferes with daily activities, relationships, or work; if you experience frequent panic attacks; if you avoid situations due to fear; if you have persistent physical symptoms like racing heart or insomnia; or if self-help strategies haven't provided relief. Our Orlando psychiatrists can help determine if your symptoms warrant treatment."
            }
          },
          {
            "@type": "Question",
            "name": "What medications are used to treat anxiety?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Common anxiety medications include SSRIs, SNRIs, and non-benzodiazepine anti-anxiety medications. Our psychiatrists carefully select medications based on your specific anxiety disorder, symptoms, medical history, and lifestyle. We monitor your progress and adjust as needed."
            }
          },
          {
            "@type": "Question",
            "name": "How quickly can I get an appointment for anxiety treatment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer same-week appointments for anxiety treatment at our Orlando location. We understand that anxiety can be debilitating and waiting weeks for help isn't acceptable. Call 386-848-8751 to schedule your initial evaluation, or request an appointment online."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer telehealth for anxiety treatment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we offer secure video appointments for anxiety treatment throughout Florida. Telehealth is particularly helpful for patients with social anxiety or those who find it difficult to leave home. Our virtual visits are just as comprehensive as in-person appointments."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between GAD, panic disorder, and social anxiety?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Generalized Anxiety Disorder (GAD) involves persistent, excessive worry about everyday matters. Panic Disorder is characterized by sudden, intense panic attacks with physical symptoms. Social Anxiety is a fear of social situations and being judged by others. Each requires different treatment approaches, which is why accurate diagnosis is crucial."
            }
          },
          {
            "@type": "Question",
            "name": "Is anxiety treatment covered by insurance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, United Healthcare, and many others. Anxiety treatment is typically covered as mental health care. Our team can verify your benefits before your first appointment."
            }
          }
        ]
      }
    ]
  };

  const anxietyDisorders = [
    {
      name: "Generalized Anxiety Disorder (GAD)",
      description: "Persistent, excessive worry about various aspects of daily life - work, health, family, finances - that's difficult to control and occurs more days than not for at least 6 months.",
      symptoms: ["Constant worry and tension", "Restlessness or feeling on edge", "Difficulty concentrating", "Sleep problems", "Muscle tension", "Fatigue"]
    },
    {
      name: "Panic Disorder",
      description: "Recurring, unexpected panic attacks - sudden surges of intense fear that peak within minutes, causing overwhelming physical symptoms and fear of having more attacks.",
      symptoms: ["Racing heart or palpitations", "Shortness of breath", "Chest pain or discomfort", "Dizziness or lightheadedness", "Fear of dying or losing control", "Sweating and trembling"]
    },
    {
      name: "Social Anxiety Disorder",
      description: "Intense fear of social situations where you might be judged, embarrassed, or humiliated. This goes beyond normal shyness and significantly impacts work, school, and relationships.",
      symptoms: ["Fear of being judged negatively", "Avoiding social situations", "Physical symptoms in social settings", "Difficulty making eye contact", "Fear of public speaking", "Worrying for days before events"]
    },
    {
      name: "Phobias",
      description: "Intense, irrational fear of specific objects, situations, or activities that poses little actual danger but provokes anxiety and avoidance behavior.",
      symptoms: ["Immediate anxiety when exposed to trigger", "Avoidance of feared situations", "Recognition that fear is excessive", "Significant life interference", "Physical panic symptoms", "Anticipatory anxiety"]
    }
  ];

  const treatments = [
    {
      icon: Pill,
      title: "Medication Management",
      description: "Our psychiatrists prescribe and monitor anti-anxiety medications including SSRIs, SNRIs, and other targeted treatments. We carefully adjust dosages to maximize effectiveness while minimizing side effects.",
      medications: ["SSRIs (Lexapro, Prozac)", "SNRIs (Effexor, Cymbalta)", "Non-benzodiazepine anti-anxiety medications", "Beta-blockers for performance anxiety"]
    },
    {
      icon: Brain,
      title: "CBT Coordination",
      description: "We coordinate with therapists trained in Cognitive Behavioral Therapy (CBT), the gold standard for anxiety treatment. CBT helps you identify and change negative thought patterns and develop coping skills.",
      benefits: ["Identify anxious thought patterns", "Challenge irrational beliefs", "Develop coping strategies", "Gradual exposure to fears"]
    },
    {
      icon: Shield,
      title: "Comprehensive Evaluation",
      description: "Accurate diagnosis is crucial. We conduct thorough psychiatric evaluations to identify the specific type of anxiety disorder and any co-occurring conditions like depression or ADHD.",
      includes: ["Detailed symptom assessment", "Medical history review", "Rule out physical causes", "Identify co-occurring conditions"]
    }
  ];

  const testimonials = [
    {
      quote: "I suffered from panic attacks for years before finding Empathy Health Clinic. Dr. Morrow found the right medication for me and within weeks, I felt like a completely different person. I haven't had a panic attack in months.",
      author: "Sarah M.",
      location: "Orlando, FL",
      condition: "Panic Disorder"
    },
    {
      quote: "My social anxiety was so severe I could barely leave my house. The combination of medication and therapy recommendations from my psychiatrist here has been life-changing. I'm actually enjoying social events now.",
      author: "James T.",
      location: "Winter Park, FL",
      condition: "Social Anxiety"
    },
    {
      quote: "The telehealth option was perfect for my anxiety. I didn't have to stress about going to an appointment, and my psychiatrist was incredibly understanding and professional. Highly recommend for anyone struggling with anxiety.",
      author: "Amanda K.",
      location: "Altamonte Springs, FL",
      condition: "Generalized Anxiety"
    }
  ];

  const quizQuestions = [
    "Do you often feel restless, on edge, or keyed up?",
    "Do you find it difficult to control your worrying?",
    "Do you frequently experience racing heart, sweating, or trembling without physical exertion?",
    "Do you avoid certain situations or places because of fear?",
    "Does anxiety interfere with your work, relationships, or daily activities?",
    "Do you have trouble sleeping due to worry or racing thoughts?",
    "Do you experience sudden episodes of intense fear that peak within minutes?"
  ];

  const handleQuizAnswer = (index: number, answer: boolean) => {
    setQuizAnswers(prev => ({ ...prev, [index]: answer }));
  };

  const getQuizScore = () => {
    return Object.values(quizAnswers).filter(Boolean).length;
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Anxiety Treatment Orlando Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Anxiety Treatment in Orlando | Empathy Health Clinic"
        description="Expert anxiety treatment in Orlando, FL. Board-certified psychiatrists for GAD, panic disorder, social anxiety. Same-week appointments. Call 386-848-8751."
        keywords={["anxiety treatment", "anxiety treatment orlando", "anxiety treatment near me", "anxiety doctor orlando", "anxiety specialist orlando", "anxiety medication orlando", "panic disorder treatment", "GAD treatment", "social anxiety treatment"]}
        canonicalPath="/anxiety-treatment"
        jsonLd={jsonLd}
        preloadImage={heroImage}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Anxiety Treatment in Orlando
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Comprehensive anxiety treatment by board-certified psychiatrists. Expert medication management for generalized anxiety, panic disorder, social anxiety, and phobias. Get relief with same-week appointments.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              data-testid="button-hero-cta"
              onClick={() => trackEvent('anxiety_treatment_hero_cta', 'conversion', 'Anxiety Treatment Page')}
            >
              <a href="#contact-form">Request Anxiety Evaluation</a>
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
                  <a href="tel:386-848-8751" className="text-sm text-primary hover:underline" onClick={handlePhoneClick}>386-848-8751</a>
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
                  Understanding Anxiety Disorders
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Anxiety disorders are the most common mental health conditions in the United States, affecting over 40 million adults each year. While everyone experiences anxiety occasionally, anxiety disorders involve persistent, excessive fear or worry that interferes with daily activities.
                </p>
                <p className="text-muted-foreground mb-6">
                  The good news is that anxiety disorders are highly treatable. With proper diagnosis and a personalized treatment plan combining medication and therapy, most people experience significant improvement in their symptoms and quality of life.
                </p>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
                  <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Why Choose Empathy Health Clinic for Anxiety Treatment?
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span>Board-certified psychiatrists specializing in anxiety disorders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span>Evidence-based medication management with careful monitoring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span>Coordination with CBT therapists for comprehensive care</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span>Telehealth options for patients with social anxiety</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span>Same-week appointments when you need help fast</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-card border border-card-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <ClipboardCheck className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Anxiety Self-Assessment</h3>
                    <p className="text-sm text-muted-foreground">This is not a diagnostic tool - consult a professional for proper evaluation</p>
                  </div>
                </div>
                
                {!showQuizResult ? (
                  <>
                    <div className="space-y-4 mb-6">
                      {quizQuestions.map((question, index) => (
                        <div key={index} className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm text-foreground mb-2">{question}</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleQuizAnswer(index, true)}
                              className={`px-4 py-1 text-sm rounded-full transition-colors ${
                                quizAnswers[index] === true 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                              }`}
                              data-testid={`button-quiz-yes-${index}`}
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => handleQuizAnswer(index, false)}
                              className={`px-4 py-1 text-sm rounded-full transition-colors ${
                                quizAnswers[index] === false 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                              }`}
                              data-testid={`button-quiz-no-${index}`}
                            >
                              No
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button 
                      onClick={() => setShowQuizResult(true)}
                      className="w-full"
                      disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                      data-testid="button-quiz-submit"
                    >
                      See Results
                    </Button>
                  </>
                ) : (
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-4 ${
                      getQuizScore() >= 4 ? 'text-orange-500' : 
                      getQuizScore() >= 2 ? 'text-yellow-500' : 'text-green-500'
                    }`}>
                      {getQuizScore()} / {quizQuestions.length}
                    </div>
                    <p className="text-muted-foreground mb-6">
                      {getQuizScore() >= 4 
                        ? "Your responses suggest you may be experiencing significant anxiety symptoms. We recommend scheduling an evaluation with one of our psychiatrists."
                        : getQuizScore() >= 2
                        ? "You may be experiencing some anxiety symptoms. Consider speaking with a mental health professional for guidance."
                        : "Your responses suggest lower levels of anxiety, but if you're concerned, speaking with a professional can provide clarity."}
                    </p>
                    <div className="flex flex-col gap-3">
                      <Button asChild data-testid="button-quiz-cta">
                        <a href="#contact-form">Schedule an Evaluation</a>
                      </Button>
                      <button 
                        onClick={() => {
                          setShowQuizResult(false);
                          setQuizAnswers({});
                        }}
                        className="text-sm text-primary hover:underline"
                        data-testid="button-quiz-retake"
                      >
                        Retake Assessment
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4 text-foreground text-center">
              Types of Anxiety Disorders We Treat
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Each anxiety disorder requires a unique treatment approach. Our psychiatrists are experienced in diagnosing and treating all types.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {anxietyDisorders.map((disorder, index) => (
                <div key={index} className="bg-card border border-card-border rounded-xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">{disorder.name}</h3>
                  <p className="text-muted-foreground mb-4">{disorder.description}</p>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Common Symptoms:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {disorder.symptoms.map((symptom, sIndex) => (
                      <div key={sIndex} className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4 text-foreground text-center">
              Our Anxiety Treatment Approach
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              We use evidence-based treatments tailored to your specific anxiety disorder and individual needs.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {treatments.map((treatment, index) => (
                <div key={index} className="bg-card border border-card-border rounded-xl p-6">
                  <div className="bg-primary/10 rounded-lg p-3 w-fit mb-4">
                    <treatment.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{treatment.title}</h3>
                  <p className="text-muted-foreground mb-4">{treatment.description}</p>
                  <ul className="space-y-2">
                    {(treatment.medications || treatment.benefits || treatment.includes)?.map((item, iIndex) => (
                      <li key={iIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4 text-foreground text-center">
              Patient Success Stories
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Real experiences from Orlando patients who found relief through our anxiety treatment program.
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

        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-8 text-foreground text-center">
              Frequently Asked Questions About Anxiety Treatment
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-card border border-card-border rounded-xl p-6">
                <h3 className="font-bold text-foreground mb-3">What are the signs I need professional help for anxiety?</h3>
                <p className="text-sm text-muted-foreground">
                  Seek help if anxiety interferes with daily activities, work, or relationships; if you experience frequent panic attacks; if you avoid situations due to fear; or if self-help hasn't provided relief.
                </p>
              </div>
              <div className="bg-card border border-card-border rounded-xl p-6">
                <h3 className="font-bold text-foreground mb-3">What medications are used to treat anxiety?</h3>
                <p className="text-sm text-muted-foreground">
                  Common medications include SSRIs (Lexapro, Prozac), SNRIs (Effexor, Cymbalta), and non-benzodiazepine anti-anxiety medications. We personalize treatment to your needs.
                </p>
              </div>
              <div className="bg-card border border-card-border rounded-xl p-6">
                <h3 className="font-bold text-foreground mb-3">How quickly can I get an anxiety treatment appointment?</h3>
                <p className="text-sm text-muted-foreground">
                  We offer same-week appointments for anxiety treatment. We understand that waiting weeks for help isn't acceptable when you're struggling. Call 386-848-8751 to schedule.
                </p>
              </div>
              <div className="bg-card border border-card-border rounded-xl p-6">
                <h3 className="font-bold text-foreground mb-3">Do you offer telehealth for anxiety treatment?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, we offer secure video appointments throughout Florida. Telehealth is particularly helpful for patients with social anxiety or those who find it difficult to leave home.
                </p>
              </div>
              <div className="bg-card border border-card-border rounded-xl p-6">
                <h3 className="font-bold text-foreground mb-3">What's the difference between GAD, panic disorder, and social anxiety?</h3>
                <p className="text-sm text-muted-foreground">
                  GAD involves persistent worry about everyday matters. Panic Disorder features sudden, intense panic attacks. Social Anxiety is fear of social situations and being judged. Each requires different treatment approaches.
                </p>
              </div>
              <div className="bg-card border border-card-border rounded-xl p-6">
                <h3 className="font-bold text-foreground mb-3">Is anxiety treatment covered by insurance?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, we accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, and United Healthcare. Our team can verify your benefits before your first appointment.
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
              <Link href="/depression-treatment" className="bg-card border border-card-border rounded-xl p-6 hover-elevate group">
                <Heart className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Depression Treatment</h3>
                <p className="text-sm text-muted-foreground">Medication management for major depression</p>
              </Link>
              <Link href="/ptsd-psychiatrist-orlando" className="bg-card border border-card-border rounded-xl p-6 hover-elevate group">
                <Shield className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">PTSD Treatment</h3>
                <p className="text-sm text-muted-foreground">Trauma-informed psychiatric care</p>
              </Link>
              <Link href="/services" className="bg-card border border-card-border rounded-xl p-6 hover-elevate group">
                <Pill className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Medication Management</h3>
                <p className="text-sm text-muted-foreground">Ongoing monitoring and optimization</p>
              </Link>
              <Link href="/psychiatry-near-me" className="bg-card border border-card-border rounded-xl p-6 hover-elevate group">
                <Brain className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Psychiatry Services</h3>
                <p className="text-sm text-muted-foreground">Full range of psychiatric care</p>
              </Link>
            </div>
          </div>
        </section>

        <AuthoritativeSourcesBlock sources={[
          { name: "NIMH", title: "Anxiety Disorders", url: "https://www.nimh.nih.gov/health/topics/anxiety-disorders" },
          { name: "APA", title: "What Are Anxiety Disorders?", url: "https://www.psychiatry.org/patients-families/anxiety-disorders/what-are-anxiety-disorders" },
          { name: "ADAA", title: "Anxiety & Depression Association", url: "https://adaa.org/understanding-anxiety" }
        ]} />

        <section id="contact-form" className="py-16 px-4 bg-primary/5 scroll-mt-16">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-3xl font-sans font-bold mb-4 text-foreground text-center">
              Start Your Anxiety Treatment Today
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-8">
              Take the first step toward relief. Schedule your evaluation with one of our anxiety specialists.
            </p>
            <ShortContactForm 
              source="anxiety-treatment"
              showInsuranceField={true}
            />
          </div>
        </section>

        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-sans font-bold mb-6 text-foreground text-center">
              Orlando Areas We Serve for Anxiety Treatment
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
