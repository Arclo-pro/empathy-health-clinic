import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Shield, 
  Users, 
  Brain, 
  CheckCircle, 
  Star,
  Award,
  Clock,
  Target,
  Lightbulb,
  Phone
} from "lucide-react";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import InsuranceSection from "@/components/InsuranceSection";
import ShortContactForm from "@/components/ShortContactForm";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import { trackEvent } from "@/lib/analytics";

export default function FemaleTherapistOrlando() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.empathyhealthclinic.com/#website",
        "url": "https://www.empathyhealthclinic.com/",
        "name": "Empathy Health Clinic",
        "description": "Mental Health & Psychiatry Services in Orlando",
        "publisher": {
          "@id": "https://www.empathyhealthclinic.com/#organization"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://www.empathyhealthclinic.com/female-therapist-orlando#webpage",
        "url": "https://www.empathyhealthclinic.com/female-therapist-orlando",
        "name": "Female Therapist Orlando | Women's Mental Health Specialists",
        "isPartOf": {
          "@id": "https://www.empathyhealthclinic.com/#website"
        },
        "about": {
          "@id": "https://www.empathyhealthclinic.com/#organization"
        },
        "description": "Find a compassionate female therapist in Orlando specializing in women's mental health. Board-certified therapists offering anxiety, depression, trauma, and relationship therapy."
      },
      {
        "@type": ["Physician", "MedicalBusiness"],
        "@id": "https://www.empathyhealthclinic.com/#organization",
        "name": "Empathy Health Clinic",
        "image": "https://www.empathyhealthclinic.com/logo.png",
        "url": "https://www.empathyhealthclinic.com/female-therapist-orlando",
        "telephone": "+1-386-848-8751",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "1000 W Broadway St Suite 103",
          "addressLocality": "Oviedo",
          "addressRegion": "FL",
          "postalCode": "32765",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.6697,
          "longitude": -81.2084
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "18:00"
          }
        ],
        "sameAs": [
          "https://www.facebook.com/empathyhealthclinic",
          "https://www.instagram.com/empathyhealthclinic"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "127"
        },
        "medicalSpecialty": ["Psychiatry", "Psychotherapy", "Mental Health Counseling"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Female Therapist Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalTherapy",
                "name": "Women's Mental Health Therapy",
                "description": "Therapy services provided by female therapists specializing in women's mental health issues"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalTherapy",
                "name": "Anxiety Treatment for Women",
                "description": "Evidence-based anxiety treatment with female therapists"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalTherapy",
                "name": "Depression Therapy for Women",
                "description": "Depression treatment with female mental health specialists"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalTherapy",
                "name": "Trauma Therapy for Women",
                "description": "Trauma-focused therapy with female trauma specialists"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalTherapy",
                "name": "Postpartum Support",
                "description": "Specialized support for postpartum depression and anxiety"
              }
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Why choose a female therapist?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Many women feel more comfortable discussing sensitive topics with a female therapist, especially issues related to reproductive health, relationships, trauma, or women's health. Female therapists often bring lived experience understanding women's unique challenges including hormonal changes, pregnancy, motherhood, and societal pressures that affect mental health."
            }
          },
          {
            "@type": "Question",
            "name": "What issues do your female therapists specialize in?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our female therapists specialize in anxiety, depression, trauma and PTSD, relationship issues, postpartum depression and anxiety, women's life transitions, body image and eating concerns, work-life balance, and stress management. They use evidence-based approaches tailored to women's mental health needs."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer telehealth appointments with female therapists?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. All of our female therapists offer both in-person sessions at our Orlando-area office and secure telehealth appointments. This gives you the flexibility to choose the format that works best for your schedule and comfort level."
            }
          },
          {
            "@type": "Question",
            "name": "How quickly can I see a female therapist?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We typically offer same-week appointments with our female therapists. During your initial call, we'll match you with a therapist whose expertise aligns with your needs and schedule your first appointment as soon as possible."
            }
          },
          {
            "@type": "Question",
            "name": "Do you accept insurance for therapy with female therapists?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We accept most major insurance plans for therapy services. Our team will verify your insurance coverage and explain your benefits before your first appointment. We also offer self-pay options with competitive rates."
            }
          },
          {
            "@type": "Question",
            "name": "What should I expect in my first session?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Your first session is a safe space to share your concerns and goals. Your female therapist will ask questions to understand your history, current challenges, and what you hope to achieve in therapy. Together, you'll create a personalized treatment plan that respects your pace and preferences."
            }
          },
          {
            "@type": "Question",
            "name": "Are your female therapists licensed and experienced?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. All of our female therapists are fully licensed mental health professionals with advanced degrees and specialized training in evidence-based therapies. They maintain active licenses in Florida and engage in ongoing professional development to provide the highest quality care."
            }
          },
          {
            "@type": "Question",
            "name": "Can I request a specific female therapist?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We'll work with you to find the best match based on your preferences, needs, and the therapist's areas of expertise. If you have specific requirements or preferences, let us know during your initial contact and we'll accommodate your request whenever possible."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <SEOHead
        title="Female Therapist Orlando | Same-Week Appointments"
        description="Female therapist in Orlando accepting new patients. Licensed women therapists for anxiety, depression & trauma. In-person & telehealth. 386-848-8751."
        keywords={[
          "female therapist Orlando",
          "women therapist Orlando",
          "female counselor Orlando",
          "women's mental health Orlando",
          "female psychologist Orlando",
          "therapy for women Orlando",
          "Orlando female therapist"
        ]}
        canonicalPath="/female-therapist-orlando"
        jsonLd={jsonLd}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 via-background to-background border-b">
          <div className="container mx-auto px-4 py-16 max-w-6xl">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-4">
                Female Therapist in Orlando
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Looking for a female therapist in Orlando? Our licensed women therapists specialize in anxiety, depression, trauma, postpartum, and relationship issues. Same-week appointments available—in-person or telehealth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg" 
                  asChild
                  data-testid="button-hero-cta"
                  onClick={() => trackEvent('female_therapist_orlando_hero_cta', 'conversion', 'Female Therapist Orlando Page - Hero')}
                >
                  <a href="#contact-form">Request Appointment</a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild
                  data-testid="button-hero-phone"
                  onClick={() => trackEvent('phone_click', 'conversion', 'Female Therapist Orlando Page - Hero')}
                >
                  <a href="tel:3868488751">
                    <Phone className="mr-2 h-5 w-5" />
                    Call 386-848-8751
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="border-b bg-card">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
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
                <span>Licensed Female Therapists</span>
              </div>
              <div className="hidden lg:block h-6 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Same-Week Appointments</span>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Section */}
        <InsuranceSection />

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2 space-y-8">
              
              {/* Why Choose a Female Therapist Section */}
              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Why Choose a Female Therapist in Orlando?
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Many women find it easier to open up to a female therapist, especially when discussing sensitive topics like reproductive health, relationships, trauma, body image, or motherhood. Our female therapists bring not only professional expertise but also lived experience understanding the unique pressures, challenges, and transitions that women face.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    Whether you're navigating anxiety, depression, life transitions, relationship difficulties, or trauma recovery, our female therapists create a safe, judgment-free space where you can be completely yourself. They understand the complexities of balancing career, family, and personal well-being while managing the emotional and physical changes that come with different life stages.
                  </p>
                </div>
              </section>

              {/* Issues We Help With */}
              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-6">
                  Issues Our Female Therapists Specialize In
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: Brain, label: "Anxiety & Stress" },
                    { icon: Heart, label: "Depression" },
                    { icon: Shield, label: "Trauma & PTSD" },
                    { icon: Users, label: "Relationship Issues" },
                    { icon: Heart, label: "Postpartum Depression" },
                    { icon: Target, label: "Life Transitions" },
                    { icon: Brain, label: "Body Image Concerns" },
                    { icon: Lightbulb, label: "Work-Life Balance" }
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-start gap-3 p-4 rounded-lg bg-card border" data-testid={`card-issue-${label.toLowerCase().replace(/\s+/g, '-')}`}>
                      <Icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{label}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Therapy Approaches */}
              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Evidence-Based Therapy Approaches
                </h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-card border">
                    <h3 className="font-semibold text-foreground mb-2">Cognitive Behavioral Therapy (CBT)</h3>
                    <p className="text-muted-foreground">
                      Identify and change negative thought patterns that contribute to anxiety, depression, and other mental health challenges.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border">
                    <h3 className="font-semibold text-foreground mb-2">EMDR for Trauma</h3>
                    <p className="text-muted-foreground">
                      Process traumatic experiences and reduce their emotional impact without having to discuss details extensively.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border">
                    <h3 className="font-semibold text-foreground mb-2">Acceptance and Commitment Therapy (ACT)</h3>
                    <p className="text-muted-foreground">
                      Build psychological flexibility and learn to live a meaningful life aligned with your values.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border">
                    <h3 className="font-semibold text-foreground mb-2">Mindfulness-Based Approaches</h3>
                    <p className="text-muted-foreground">
                      Develop present-moment awareness to reduce stress, manage emotions, and improve overall well-being.
                    </p>
                  </div>
                </div>
              </section>

              {/* Benefits Section */}
              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-6">
                  How Female Therapy Can Help You
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    {
                      icon: Shield,
                      title: "Safe, Judgment-Free Space",
                      description: "Discuss sensitive topics with a therapist who understands women's unique experiences"
                    },
                    {
                      icon: Heart,
                      title: "Gender-Specific Understanding",
                      description: "Work with therapists who understand hormonal changes, reproductive health, and women's life stages"
                    },
                    {
                      icon: Users,
                      title: "Relationship Support",
                      description: "Navigate relationship challenges, boundaries, and communication with expert guidance"
                    },
                    {
                      icon: Lightbulb,
                      title: "Personal Growth",
                      description: "Build confidence, assertiveness, and emotional resilience while honoring your authentic self"
                    }
                  ].map(({ icon: Icon, title, description }) => (
                    <div key={title} className="flex gap-4" data-testid={`benefit-${title.toLowerCase().replace(/\s+/g, '-')}`}>
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                        <p className="text-sm text-muted-foreground">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* What to Expect Section */}
              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-6">
                  What to Expect in Therapy with a Female Therapist
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      step: "1",
                      title: "Initial Consultation",
                      description: "Share your concerns, goals, and preferences in a confidential, welcoming environment."
                    },
                    {
                      step: "2",
                      title: "Personalized Treatment Plan",
                      description: "Your therapist will collaborate with you to create a plan that addresses your unique needs and respects your pace."
                    },
                    {
                      step: "3",
                      title: "Regular Sessions",
                      description: "Meet weekly or bi-weekly to work through challenges, develop coping strategies, and track your progress."
                    },
                    {
                      step: "4",
                      title: "Ongoing Support",
                      description: "As you grow and heal, your therapist adjusts your treatment to support your evolving needs and goals."
                    }
                  ].map(({ step, title, description }) => (
                    <div key={step} className="flex gap-4 p-4 rounded-lg bg-card border" data-testid={`step-${step}`}>
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-semibold">
                          {step}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                        <p className="text-sm text-muted-foreground">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Why Choose Empathy Health Clinic */}
              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-6">
                  Why Choose Empathy Health Clinic for Female Therapy
                </h2>
                <div className="space-y-6">
                  <p className="text-foreground leading-relaxed">
                    Our female therapists are highly trained, licensed professionals who specialize in women's mental health. They bring compassion, clinical expertise, and a deep understanding of the challenges women face in today's world.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-foreground">Licensed Professionals</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        All therapists hold advanced degrees and active Florida licenses with specialized training in women's mental health
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-foreground">Compassionate Care</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Client-centered approach that prioritizes your comfort, safety, and therapeutic goals
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-foreground">Flexible Scheduling</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        In-person and telehealth options with evening and weekend appointments available
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-foreground">Evidence-Based Methods</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Proven therapeutic approaches tailored to your specific needs and preferences
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Mid-Page CTA */}
              <section className="my-8 p-8 rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20">
                <div className="text-center max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    Ready to Start Therapy with a Female Therapist?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Our compassionate female therapists are accepting new clients in Orlando. Same-week appointments available for in-person and telehealth sessions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      asChild
                      data-testid="button-mid-cta"
                      onClick={() => trackEvent('female_therapist_orlando_mid_cta', 'conversion', 'Female Therapist Orlando Page - Mid')}
                    >
                      <a href="#contact-form">Request Appointment</a>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      asChild
                      data-testid="button-mid-phone"
                      onClick={() => trackEvent('phone_click', 'conversion', 'Female Therapist Orlando Page - Mid')}
                    >
                      <a href="tel:3868488751">Call 386-848-8751</a>
                    </Button>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      question: "Why choose a female therapist?",
                      answer: "Many women feel more comfortable discussing sensitive topics with a female therapist, especially issues related to reproductive health, relationships, trauma, or women's health. Female therapists often bring lived experience understanding women's unique challenges including hormonal changes, pregnancy, motherhood, and societal pressures that affect mental health."
                    },
                    {
                      question: "What issues do your female therapists specialize in?",
                      answer: "Our female therapists specialize in anxiety, depression, trauma and PTSD, relationship issues, postpartum depression and anxiety, women's life transitions, body image and eating concerns, work-life balance, and stress management. They use evidence-based approaches tailored to women's mental health needs."
                    },
                    {
                      question: "Do you offer telehealth appointments with female therapists?",
                      answer: "Yes. All of our female therapists offer both in-person sessions at our Orlando-area office and secure telehealth appointments. This gives you the flexibility to choose the format that works best for your schedule and comfort level."
                    },
                    {
                      question: "How quickly can I see a female therapist?",
                      answer: "We typically offer same-week appointments with our female therapists. During your initial call, we'll match you with a therapist whose expertise aligns with your needs and schedule your first appointment as soon as possible."
                    },
                    {
                      question: "Do you accept insurance for therapy with female therapists?",
                      answer: "Yes. We accept most major insurance plans for therapy services. Our team will verify your insurance coverage and explain your benefits before your first appointment. We also offer self-pay options with competitive rates."
                    },
                    {
                      question: "What should I expect in my first session?",
                      answer: "Your first session is a safe space to share your concerns and goals. Your female therapist will ask questions to understand your history, current challenges, and what you hope to achieve in therapy. Together, you'll create a personalized treatment plan that respects your pace and preferences."
                    },
                    {
                      question: "Are your female therapists licensed and experienced?",
                      answer: "Yes. All of our female therapists are fully licensed mental health professionals with advanced degrees and specialized training in evidence-based therapies. They maintain active licenses in Florida and engage in ongoing professional development to provide the highest quality care."
                    },
                    {
                      question: "Can I request a specific female therapist?",
                      answer: "Yes. We'll work with you to find the best match based on your preferences, needs, and the therapist's areas of expertise. If you have specific requirements or preferences, let us know during your initial contact and we'll accommodate your request whenever possible."
                    }
                  ].map(({ question, answer }, index) => (
                    <div key={index} className="p-4 rounded-lg bg-card border" data-testid={`faq-${index + 1}`}>
                      <h3 className="font-semibold text-foreground mb-2">{question}</h3>
                      <p className="text-muted-foreground text-sm">{answer}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Contact Form */}
              <section id="contact-form" className="scroll-mt-20">
                <ShortContactForm
                  title="Connect with a Female Therapist"
                  description="Take the first step toward better mental health. Our female therapists are here to support your journey."
                  sourcePage="Female Therapist Orlando Page"
                />
              </section>

            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="sticky top-6 space-y-6">
                <div className="p-6 rounded-lg bg-card border">
                  <h3 className="font-semibold text-foreground mb-4">Quick Contact</h3>
                  <div className="space-y-3">
                    <Button 
                      asChild 
                      className="w-full"
                      data-testid="button-sidebar-phone"
                      onClick={() => trackEvent('phone_click', 'conversion', 'Female Therapist Orlando Page - Sidebar')}
                    >
                      <a href="tel:3868488751">Call 386-848-8751</a>
                    </Button>
                    <Button 
                      asChild 
                      variant="outline" 
                      className="w-full"
                      data-testid="button-sidebar-contact"
                    >
                      <a href="#contact-form">Request Appointment</a>
                    </Button>
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-card border">
                  <h3 className="font-semibold text-foreground mb-4">Related Services</h3>
                  <nav className="space-y-2">
                    <Link href="/anxiety-therapy" className="block text-sm text-primary hover:underline" data-testid="link-anxiety-therapy">
                      Anxiety Treatment
                    </Link>
                    <Link href="/depression-treatment" className="block text-sm text-primary hover:underline" data-testid="link-depression-treatment">
                      Depression Therapy
                    </Link>
                    <Link href="/trauma-specialist-near-me" className="block text-sm text-primary hover:underline" data-testid="link-trauma-specialist">
                      Trauma Specialist
                    </Link>
                    <Link href="/therapy" className="block text-sm text-primary hover:underline" data-testid="link-therapy">
                      All Therapy Services
                    </Link>
                  </nav>
                </div>

                <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-start gap-3 mb-3">
                    <Heart className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground text-sm mb-1">Women's Mental Health Focus</h4>
                      <p className="text-xs text-muted-foreground">Our female therapists specialize in the unique mental health challenges women face.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 mb-3">
                    <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground text-sm mb-1">Flexible Options</h4>
                      <p className="text-xs text-muted-foreground">In-person and telehealth appointments available to fit your lifestyle.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground text-sm mb-1">Licensed & Experienced</h4>
                      <p className="text-xs text-muted-foreground">All therapists are fully licensed with specialized training in evidence-based care.</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </>
  );
}
