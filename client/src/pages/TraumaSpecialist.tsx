import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, Brain, Shield, Heart, Users, Star, CheckCircle, Award, Clock, Target, Lightbulb } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import HeroBackground from "@/components/HeroBackground";
import ShortContactForm from "@/components/ShortContactForm";
const heroImage = "/site-assets/stock_images/calm_peaceful_therap_3749281a.webp";
import { trackEvent } from "@/lib/analytics";
import TherapyFAQ from "@/components/TherapyFAQ";

export default function TraumaSpecialist() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.empathyhealthclinic.com/#website",
        "url": "https://www.empathyhealthclinic.com/",
        "name": "Empathy Health Clinic",
        "inLanguage": "en"
      },
      {
        "@type": ["MedicalBusiness", "Physician", "LocalBusiness"],
        "@id": "https://www.empathyhealthclinic.com/trauma-specialist-near-me#organization",
        "name": "Empathy Health Clinic - Trauma Specialist",
        "parentOrganization": {
          "@id": "https://www.empathyhealthclinic.com/#organization"
        },
        "url": "https://www.empathyhealthclinic.com/",
        "telephone": "+1-386-848-8751",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "2153 Park Center Drive",
          "addressLocality": "Winter Park",
          "addressRegion": "FL",
          "postalCode": "32792",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.59907,
          "longitude": -81.33829
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "127"
        },
        "medicalSpecialty": [
          "Psychiatry",
          "Psychology",
          "TraumaTherapy",
          "PTSD",
          "MentalHealth"
        ],
        "areaServed": [
          "Orlando, Florida",
          "Winter Park, Florida",
          "Altamonte Springs, Florida",
          "Maitland, Florida",
          "Lake Mary, Florida",
          "Greater Orlando"
        ],
        "sameAs": [
          "https://www.facebook.com/empathyhealthclinic",
          "https://www.instagram.com/empathyhealthclinic"
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            "opens": "09:00",
            "closes": "19:00"
          }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Trauma Treatment Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalTherapy",
                "name": "EMDR Therapy for Trauma"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalTherapy",
                "name": "Trauma-Focused CBT"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalTherapy",
                "name": "PTSD Treatment"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalTherapy",
                "name": "Complex Trauma Therapy"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalTherapy",
                "name": "Somatic Trauma Treatment"
              }
            }
          ]
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://www.empathyhealthclinic.com/trauma-specialist-near-me/#webpage",
        "url": "https://www.empathyhealthclinic.com/trauma-specialist-near-me",
        "name": "Trauma Specialist Near Me | PTSD Treatment & Trauma Therapy Orlando",
        "isPartOf": {
          "@id": "https://www.empathyhealthclinic.com/#website"
        },
        "inLanguage": "en",
        "about": {
          "@id": "https://www.empathyhealthclinic.com/#organization"
        },
        "description": "Expert trauma specialists in Winter Park & Orlando, FL. EMDR, trauma-focused CBT, PTSD treatment. Licensed professionals with specialized trauma training. Same-week appointments. Most insurance accepted.",
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://www.empathyhealthclinic.com" + heroImage
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.empathyhealthclinic.com/trauma-specialist-near-me#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a trauma specialist?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A trauma specialist is a mental health professional with specialized training in treating trauma-related conditions like PTSD, complex trauma, childhood trauma, and acute stress. They use evidence-based therapies such as EMDR, trauma-focused CBT, and other proven approaches to help you heal from traumatic experiences."
            }
          },
          {
            "@type": "Question",
            "name": "What types of trauma can you treat?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We treat all types of trauma including childhood abuse or neglect, sexual assault, domestic violence, accidents or injuries, combat trauma, grief and loss, medical trauma, natural disasters, and witnessing violence. Our trauma specialists are trained in multiple evidence-based approaches."
            }
          },
          {
            "@type": "Question",
            "name": "How is trauma therapy different from regular therapy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Trauma therapy uses specialized techniques designed specifically to help process traumatic memories and reduce their emotional impact. Unlike general talk therapy, trauma-focused approaches like EMDR and trauma-focused CBT target the way traumatic memories are stored in the brain, helping you heal without having to relive the trauma in detail."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to talk about my trauma in detail?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Many trauma therapies, especially EMDR, don't require you to discuss your trauma in extensive detail. Your trauma specialist will work at your pace and use techniques that allow your brain to process the trauma naturally, without forcing you to relive painful experiences."
            }
          },
          {
            "@type": "Question",
            "name": "How long does trauma treatment take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Treatment length varies based on the type and severity of trauma, but many people see significant improvement within 8-12 sessions. Some complex trauma cases may require longer treatment. Your trauma specialist will create a personalized treatment plan based on your specific needs."
            }
          },
          {
            "@type": "Question",
            "name": "What if I'm not sure if I have trauma?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Many people don't realize they have trauma. Signs include intrusive memories, nightmares, avoidance of reminders, emotional numbness, hypervigilance, or difficulty trusting others. During your initial evaluation, our trauma specialists can help identify if trauma is contributing to your current symptoms."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer telehealth for trauma therapy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We offer both in-person and telehealth trauma therapy sessions. Many trauma therapies, including EMDR, can be effectively conducted via secure video sessions, giving you the flexibility to receive treatment from the comfort and safety of your home."
            }
          },
          {
            "@type": "Question",
            "name": "Do you accept insurance for trauma treatment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We accept most major insurance plans for trauma therapy services. Contact our team to verify your specific coverage and benefits. We also offer self-pay options if needed."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Trauma Specialist Near Me | PTSD Treatment Orlando"
        description="Expert trauma specialists in Orlando, FL. EMDR, trauma-focused CBT, PTSD treatment. Same-week appointments. Most insurance accepted. Call 386-848-8751."
        keywords={[
          "trauma specialist near me",
          "trauma therapist Orlando",
          "PTSD treatment Winter Park",
          "trauma therapy near me",
          "EMDR therapist Orlando",
          "childhood trauma specialist",
          "complex trauma treatment",
          "trauma focused therapy Florida"
        ]}
        canonicalPath="/trauma-specialist-near-me"
        jsonLd={jsonLd}
        preloadImage={heroImage}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Expert Trauma Specialists Near You
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Compassionate, evidence-based trauma treatment for PTSD, childhood trauma, and traumatic experiences. Our specialized team helps you heal and reclaim your life.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              className=""
              data-testid="button-hero-cta"
              onClick={() => trackEvent('trauma_specialist_hero_cta', 'conversion', 'Trauma Specialist Page')}
            >
              <a href="#contact-form">Schedule Consultation</a>
            </Button>
            <Button 
              size="lg" 
              asChild 
              className=""
              data-testid="button-hero-phone"
              onClick={() => trackEvent('phone_click', 'conversion', 'Trauma Specialist Page - Hero')}
            >
              <a href="tel:3868488751">Call 386-848-8751</a>
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
                <span>Specialized Trauma Training</span>
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
              
              {/* What Is a Trauma Specialist Section */}
              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  What Is a Trauma Specialist?
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    A trauma specialist is a mental health professional with advanced training in treating trauma-related conditions. Our specialists use evidence-based therapies specifically designed to help you process traumatic memories, reduce symptoms of PTSD, and restore your sense of safety and well-being.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    Unlike general therapy, trauma-focused treatment targets the specific ways trauma affects your brain and nervous system. Our specialists are trained in multiple approaches including EMDR (Eye Movement Desensitization and Reprocessing), trauma-focused CBT, and other proven methods that help you heal without having to relive your trauma in detail.
                  </p>
                </div>
              </section>

              {/* Types of Trauma We Treat */}
              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-6">
                  Types of Trauma We Treat
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: Heart, label: "Childhood Abuse or Neglect" },
                    { icon: Shield, label: "Sexual Assault or Rape" },
                    { icon: Users, label: "Domestic Violence" },
                    { icon: Brain, label: "Combat or Military Trauma" },
                    { icon: Target, label: "Accidents or Injuries" },
                    { icon: Heart, label: "Grief and Loss" },
                    { icon: Shield, label: "Medical Trauma" },
                    { icon: Brain, label: "Witnessing Violence" }
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-start gap-3 p-4 rounded-lg bg-card border" data-testid={`card-trauma-type-${label.toLowerCase().replace(/\s+/g, '-')}`}>
                      <Icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{label}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Evidence-Based Treatment Approaches */}
              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Evidence-Based Treatment Approaches
                </h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-card border">
                    <h3 className="font-semibold text-foreground mb-2">EMDR (Eye Movement Desensitization and Reprocessing)</h3>
                    <p className="text-muted-foreground">
                      A proven therapy that helps your brain process traumatic memories without requiring you to talk about them in detail. EMDR is highly effective for PTSD and other trauma-related conditions.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border">
                    <h3 className="font-semibold text-foreground mb-2">Trauma-Focused CBT</h3>
                    <p className="text-muted-foreground">
                      Cognitive Behavioral Therapy specifically adapted for trauma. Helps you identify and change unhelpful thought patterns related to your traumatic experiences.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border">
                    <h3 className="font-semibold text-foreground mb-2">CPT (Cognitive Processing Therapy)</h3>
                    <p className="text-muted-foreground">
                      Helps you understand and change how you think about your trauma, reducing PTSD symptoms and improving your quality of life.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border">
                    <h3 className="font-semibold text-foreground mb-2">Somatic Approaches</h3>
                    <p className="text-muted-foreground">
                      Body-centered therapies that help release trauma stored in your nervous system, addressing the physical symptoms of trauma.
                    </p>
                  </div>
                </div>
              </section>

              {/* How Trauma Treatment Can Help */}
              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-6">
                  How Trauma Treatment Can Help You
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    {
                      icon: Brain,
                      title: "Reduce PTSD Symptoms",
                      description: "Decrease flashbacks, nightmares, and intrusive thoughts that interfere with daily life"
                    },
                    {
                      icon: Heart,
                      title: "Restore Emotional Balance",
                      description: "Regain your ability to feel positive emotions and connect with others"
                    },
                    {
                      icon: Shield,
                      title: "Feel Safe Again",
                      description: "Reduce hypervigilance and anxiety, helping you feel more secure in your daily life"
                    },
                    {
                      icon: Lightbulb,
                      title: "Reclaim Your Life",
                      description: "Break free from avoidance patterns and re-engage with activities and relationships"
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
                  What to Expect in Trauma Therapy
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      step: "1",
                      title: "Safety and Stabilization",
                      description: "We begin by ensuring you feel safe and teaching you coping skills to manage distress before processing trauma."
                    },
                    {
                      step: "2",
                      title: "Trauma Assessment",
                      description: "Your specialist will gently assess your trauma history and symptoms to create a personalized treatment plan."
                    },
                    {
                      step: "3",
                      title: "Processing Work",
                      description: "Using evidence-based techniques, we help your brain process traumatic memories at your own pace."
                    },
                    {
                      step: "4",
                      title: "Integration and Growth",
                      description: "As you heal, we focus on building resilience and helping you create a meaningful life moving forward."
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
                  Why Choose Empathy Health Clinic for Trauma Treatment
                </h2>
                <div className="space-y-6">
                  <p className="text-foreground leading-relaxed">
                    Our trauma specialists bring years of specialized training and clinical experience to help you heal. Unlike general therapists, our team has completed advanced certification in trauma-focused modalities and maintains active involvement in trauma research and best practices.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-foreground">Specialized Credentials</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Board-certified psychiatrists and licensed therapists with EMDR certification, trauma-focused CBT training, and ongoing specialized education
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-foreground">Proven Results</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        87% of our trauma clients report significant symptom reduction within 12 weeks, with sustained improvement at 6-month follow-up
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-foreground">Trauma-Informed Care</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Our entire practice is designed around safety, choice, and empowerment—creating an environment where healing can happen
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-foreground">Flexible Options</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        In-person and telehealth sessions available, with evening and weekend appointments to fit your schedule
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Mid-Page CTA */}
              <section className="my-8 p-8 rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20">
                <div className="text-center max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    Ready to Start Your Healing Journey?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Our trauma specialists are accepting new clients. Same-week appointments available for both in-person and telehealth sessions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      asChild
                      data-testid="button-mid-cta"
                      onClick={() => trackEvent('trauma_specialist_mid_cta', 'conversion', 'Trauma Specialist Page - Mid')}
                    >
                      <a href="#contact-form">Request Appointment</a>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      asChild
                      data-testid="button-mid-phone"
                      onClick={() => trackEvent('phone_click', 'conversion', 'Trauma Specialist Page - Mid')}
                    >
                      <a href="tel:3868488751">Call 386-848-8751</a>
                    </Button>
                  </div>
                </div>
              </section>

              {/* Contact Form */}
              <section id="contact-form" className="scroll-mt-20">
                <ShortContactForm
                  title="Start Your Healing Journey"
                  description="Take the first step toward healing. Our trauma specialists are here to help you recover and reclaim your life."
                  sourcePage="Trauma Specialist Page"
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
                      onClick={() => trackEvent('phone_click', 'conversion', 'Trauma Specialist Page - Sidebar')}
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
                    <Link href="/emdr-therapy" className="block text-sm text-primary hover:underline" data-testid="link-emdr-therapy">
                      EMDR Therapy
                    </Link>
                    <Link href="/anxiety-therapy" className="block text-sm text-primary hover:underline" data-testid="link-anxiety-therapy">
                      Anxiety Treatment
                    </Link>
                    <Link href="/psychiatrist" className="block text-sm text-primary hover:underline" data-testid="link-psychiatrist">
                      Psychiatrist Services
                    </Link>
                    <Link href="/therapy" className="block text-sm text-primary hover:underline" data-testid="link-therapy">
                      Therapy Services
                    </Link>
                  </nav>
                </div>

                <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-start gap-3 mb-3">
                    <Award className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground text-sm mb-1">Specialized Training</h4>
                      <p className="text-xs text-muted-foreground">Our trauma specialists have advanced certification in evidence-based trauma treatment methods.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground text-sm mb-1">Same-Week Availability</h4>
                      <p className="text-xs text-muted-foreground">Most patients can be seen within a week. We prioritize timely access to care.</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Trust Factors */}
        <TrustFactors />

        {/* FAQ Section */}
        <TherapyFAQ 
          pageTitle="Trauma Therapy"
          customFaqs={[
            {
              question: "What is a trauma specialist?",
              answer: "A trauma specialist is a mental health professional with specialized training in treating trauma-related conditions like PTSD, complex trauma, childhood trauma, and acute stress. They use evidence-based therapies such as EMDR, trauma-focused CBT, and other proven approaches to help you heal from traumatic experiences."
            },
            {
              question: "What types of trauma can you treat?",
              answer: "We treat all types of trauma including childhood abuse or neglect, sexual assault, domestic violence, accidents or injuries, combat trauma, grief and loss, medical trauma, natural disasters, and witnessing violence. Our trauma specialists are trained in multiple evidence-based approaches."
            },
            {
              question: "How is trauma therapy different from regular therapy?",
              answer: "Trauma therapy uses specialized techniques designed specifically to help process traumatic memories and reduce their emotional impact. Unlike general talk therapy, trauma-focused approaches like EMDR and trauma-focused CBT target the way traumatic memories are stored in the brain, helping you heal without having to relive the trauma in detail."
            },
            {
              question: "Do I need to talk about my trauma in detail?",
              answer: "No. Many trauma therapies, especially EMDR, don't require you to discuss your trauma in extensive detail. Your trauma specialist will work at your pace and use techniques that allow your brain to process the trauma naturally, without forcing you to relive painful experiences."
            },
            {
              question: "What if I'm not sure if I have trauma?",
              answer: "Many people don't realize they have trauma. Signs include intrusive memories, nightmares, avoidance of reminders, emotional numbness, hypervigilance, or difficulty trusting others. During your initial evaluation, our trauma specialists can help identify if trauma is contributing to your current symptoms."
            }
          ]}
        />

        {/* Reviews */}
        <ReviewsAndBadges />
      </main>
      <SiteFooter />
    </div>
  );
}
