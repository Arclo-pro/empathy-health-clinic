import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, Heart, Shield, Calendar, Brain, Star, CheckCircle } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import HeroBackground from "@/components/HeroBackground";
import heroImage from "@assets/stock_images/calm_peaceful_therap_ae20056a.jpg";
import { trackEvent } from "@/lib/analytics";
import FAQSchema from "@/components/FAQSchema";

export default function DepressionCounseling() {
  const faqs = [
    {
      question: "How long does depression treatment take?",
      answer: "Most people begin feeling better within 4-6 weeks of starting treatment. However, full recovery often takes 3-6 months or longer. Continuing treatment even after feeling better helps prevent relapse."
    },
    {
      question: "Do I need medication for depression?",
      answer: "Not always. Mild depression may respond to therapy alone. Moderate to severe depression typically benefits from a combination of medication and therapy. Your psychiatrist will recommend the best approach for your specific situation."
    },
    {
      question: "Will antidepressants change my personality?",
      answer: "No. Antidepressants don't change who you are - they help restore your brain chemistry to normal levels so you can feel like yourself again. Any concerning changes should be reported to your psychiatrist immediately."
    },
    {
      question: "What if my depression doesn't improve?",
      answer: "Some people need to try different medications or combinations to find what works. We also offer advanced treatments for treatment-resistant depression. Don't give up - there are many effective options available."
    }
  ];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Empathy Health Clinic",
    "description": "Depression counseling and psychiatric treatment in Winter Park and Orlando, FL. Evidence-based therapy, medication management, and comprehensive mental health care for depression.",
    "url": "https://empathyhealthclinic.com/depression-counseling",
    "telephone": "386-848-8751",
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
      "latitude": "28.5989",
      "longitude": "-81.3392"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "priceRange": "$$",
    "medicalSpecialty": "Psychiatry",
    "areaServed": ["Orlando", "Winter Park", "Altamonte Springs", "Maitland", "Central Florida"]
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Depression Counseling Orlando FL | Depression Treatment Winter Park"
        description="Depression counseling in Orlando and Winter Park, FL. Expert therapy and medication management for major depression, persistent depressive disorder, and mood disorders. Same-week appointments. Call 386-848-8751."
        keywords={["depression counseling Orlando FL", "depression counseling Winter Park FL", "depression treatment Orlando", "depression therapy Florida", "therapist for depression near me", "depression psychiatrist Orlando", "antidepressant medication management"]}
        canonicalPath="/depression-counseling"
        jsonLd={localBusinessSchema}
      />
      <FAQSchema faqs={faqs} />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Depression Counseling & Treatment in Orlando
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Compassionate, evidence-based care for depression. Our psychiatrists and therapists help you regain joy, energy, and hope through proven treatments that work.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              className="bg-green-600 hover:bg-green-700 text-white"
              data-testid="button-hero-cta"
              onClick={() => trackEvent('depression_hero_cta', 'conversion', 'Depression Page')}
            >
              <a href="#contact-form">Start Feeling Better Today</a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="bg-background/20 backdrop-blur-sm border-white/30 text-white hover:bg-background/30"
              data-testid="button-hero-phone"
              onClick={() => trackEvent('phone_click', 'conversion', 'Depression Page - Hero')}
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
                <span>Same-Week Appointments Available</span>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Section */}
        <InsuranceSection />

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  You Don't Have to Live with Depression
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Our <Link href="/psychiatrist-orlando" className="text-primary hover:underline font-medium">Orlando depression specialists</Link> help patients navigate low mood, loss of interest, difficulty concentrating, and other symptoms through individualized treatment plans that fit their needs. At our <Link href="/psychiatry-clinic-orlando" className="text-primary hover:underline font-medium">psychiatry clinic in Orlando</Link>, we offer comprehensive mental health services including psychiatric evaluations, medication management, and ongoing support.
                  </p>
                  <p className="text-foreground leading-relaxed mb-4">
                    Depression is more than just feeling sad - it's a serious medical condition that affects how you think, feel, and function in daily life. But here's the good news: depression is highly treatable. With the right combination of therapy, medication, and support, most people experience significant improvement.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    At Empathy Health Clinic, our experienced psychiatrists and therapists specialize in treating all forms of depression using evidence-based approaches proven to work. We create personalized treatment plans that address your unique symptoms, lifestyle, and goals.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Types of Depression We Treat
                </h2>
                <div className="prose prose-lg max-w-none">
                  <ul className="space-y-3 text-foreground">
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Major Depressive Disorder (MDD)</strong> - Persistent sadness, loss of interest, difficulty functioning</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Persistent Depressive Disorder (Dysthymia)</strong> - Long-term, chronic depression lasting two years or more</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Bipolar Depression</strong> - Depressive episodes as part of bipolar disorder</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Seasonal Affective Disorder (SAD)</strong> - Depression triggered by seasonal changes</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Postpartum Depression</strong> - Depression after childbirth</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Psychotic Depression</strong> - Depression with hallucinations or delusions</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Treatment-Resistant Depression</strong> - Depression that hasn't responded to standard treatments</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Signs & Symptoms of Depression
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Depression affects everyone differently, but common symptoms include:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <ul className="space-y-2 text-foreground">
                      <li className="flex gap-2"><span className="text-primary">•</span> Persistent sadness or emptiness</li>
                      <li className="flex gap-2"><span className="text-primary">•</span> Loss of interest in activities</li>
                      <li className="flex gap-2"><span className="text-primary">•</span> Fatigue and low energy</li>
                      <li className="flex gap-2"><span className="text-primary">•</span> Sleep problems (too much or too little)</li>
                      <li className="flex gap-2"><span className="text-primary">•</span> Changes in appetite or weight</li>
                    </ul>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex gap-2"><span className="text-primary">•</span> Difficulty concentrating</li>
                      <li className="flex gap-2"><span className="text-primary">•</span> Feelings of worthlessness or guilt</li>
                      <li className="flex gap-2"><span className="text-primary">•</span> Physical aches and pains</li>
                      <li className="flex gap-2"><span className="text-primary">•</span> Irritability or restlessness</li>
                      <li className="flex gap-2"><span className="text-primary">•</span> Thoughts of death or suicide</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Our Depression Treatment Approach
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    We offer comprehensive, personalized depression treatment combining multiple evidence-based approaches:
                  </p>
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Medication Management</h3>
                      <p className="text-muted-foreground">Our psychiatrists prescribe and monitor antidepressant medications (SSRIs, SNRIs, atypical antidepressants) tailored to your symptoms and medical history. We carefully adjust dosages to maximize benefits while minimizing side effects.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Cognitive Behavioral Therapy (CBT)</h3>
                      <p className="text-muted-foreground">CBT helps you identify and change negative thought patterns that contribute to depression. It's one of the most effective therapies for depression.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Interpersonal Therapy (IPT)</h3>
                      <p className="text-muted-foreground">IPT focuses on improving your relationships and communication patterns that may be contributing to depression.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Lifestyle & Wellness Support</h3>
                      <p className="text-muted-foreground">We provide guidance on exercise, sleep hygiene, nutrition, and stress management to support your recovery.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Why Choose Empathy Health Clinic
                </h2>
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Brain className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Expert Psychiatrists</h3>
                      <p className="text-sm text-muted-foreground">Board-certified psychiatrists specializing in depression treatment</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Same-Week Appointments</h3>
                      <p className="text-sm text-muted-foreground">Fast access to care when you're struggling</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Insurance Accepted</h3>
                      <p className="text-sm text-muted-foreground">Most major insurance plans cover depression treatment</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Compassionate Care</h3>
                      <p className="text-sm text-muted-foreground">Non-judgmental, empathetic support throughout your journey</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">How long does depression treatment take?</h3>
                    <p className="text-muted-foreground">Most people begin feeling better within 4-6 weeks of starting treatment. However, full recovery often takes 3-6 months or longer. Continuing treatment even after feeling better helps prevent relapse.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Do I need medication for depression?</h3>
                    <p className="text-muted-foreground">Not always. Mild depression may respond to therapy alone. Moderate to severe depression typically benefits from a combination of medication and therapy. Your psychiatrist will recommend the best approach for your specific situation.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Will antidepressants change my personality?</h3>
                    <p className="text-muted-foreground">No. Antidepressants don't change who you are - they help restore your brain chemistry to normal levels so you can feel like yourself again. Any concerning changes should be reported to your psychiatrist immediately.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">What if my depression doesn't improve?</h3>
                    <p className="text-muted-foreground">Some people need to try different medications or combinations to find what works. We also offer advanced treatments for treatment-resistant depression. Don't give up - there are many effective options available.</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="md:col-span-1 space-y-6">

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Related Services
                </h3>
                <div className="space-y-3">
                  <Link 
                    href="/anxiety-therapy" 
                    className="block text-primary hover:underline underline-offset-2"
                    data-testid="link-anxiety"
                  >
                    → Anxiety Therapy
                  </Link>
                  <Link 
                    href="/emdr-therapy" 
                    className="block text-primary hover:underline underline-offset-2"
                    data-testid="link-emdr"
                  >
                    → EMDR Therapy
                  </Link>
                  <Link 
                    href="/virtual-therapy" 
                    className="block text-primary hover:underline underline-offset-2"
                    data-testid="link-virtual"
                  >
                    → Virtual Therapy Options
                  </Link>
                  <Link 
                    href="/crisis-therapy" 
                    className="block text-primary hover:underline underline-offset-2"
                    data-testid="link-crisis"
                  >
                    → Crisis Support
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-sans font-bold text-foreground mb-3">
                Why Choose Empathy Health Clinic
              </h2>
              <p className="text-muted-foreground">
                Compassionate, expert depression treatment
              </p>
            </div>
            <TrustFactors variant="compact" limit={4} />
          </div>
        </div>

        {/* Trust Badges */}
        <ReviewsAndBadges />
      </main>
      <SiteFooter />
    </div>
  );
}
