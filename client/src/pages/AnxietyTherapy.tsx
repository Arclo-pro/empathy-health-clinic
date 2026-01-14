import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, Heart, Shield, Calendar, Brain, AlertCircle, MapPin, Phone, Clock, Star, CheckCircle } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import HeroBackground from "@/components/HeroBackground";
import { AuthoritativeSourcesBlock } from "@/components/AuthoritativeSource";
const heroImage = "/attached_assets/stock_images/calm_peaceful_therap_b118766b.jpg";
import { trackEvent } from "@/lib/analytics";
import TherapyFAQ from "@/components/TherapyFAQ";

export default function AnxietyTherapy() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    "name": "Anxiety Counseling & Treatment",
    "description": "Anxiety counseling and psychiatric treatment in Winter Park and Orlando, FL. Evidence-based treatment for generalized anxiety, panic disorder, social anxiety, and phobias.",
    "provider": {
      "@type": "MedicalClinic",
      "name": "Empathy Health Clinic",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2153 Park Center Drive",
        "addressLocality": "Winter Park",
        "addressRegion": "FL",
        "postalCode": "32792"
      },
      "telephone": "386-848-8751"
    },
    "areaServed": ["Orlando", "Winter Park", "Altamonte Springs", "Maitland", "Central Florida"]
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Anxiety Treatment Near You | Orlando & Winter Park FL"
        description="Anxiety counseling near you in Orlando & Winter Park. Expert treatment for panic attacks, generalized anxiety, social anxiety. Same-day appointments. 1155 Louisiana Ave Suite 202. Call 386-848-8751."
        keywords={["anxiety treatment near me", "anxiety counseling near me", "anxiety counseling Orlando", "anxiety therapy near me", "panic attack treatment near me", "anxiety treatment Winter Park", "anxiety therapist near me"]}
        canonicalPath="/anxiety-therapy"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Anxiety Counseling & Treatment in Orlando
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Break free from anxiety and reclaim your peace of mind. Expert anxiety counseling and crisis support for panic attacks, generalized anxiety, and social anxiety. Compassionate counselors and psychiatrists serving Orlando and Winter Park.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              className=""
              data-testid="button-hero-cta"
              onClick={() => trackEvent('anxiety_hero_cta', 'conversion', 'Anxiety Page')}
            >
              <a href="#contact-form">Start Your Recovery Today</a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="bg-background/20 backdrop-blur-sm border-white/30 text-white hover:bg-background/30"
              data-testid="button-hero-phone"
              onClick={() => trackEvent('phone_click', 'conversion', 'Anxiety Page - Hero')}
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

        {/* Location & Contact Banner - Optimized for "anxiety treatment near me" */}
        <section className="py-8 bg-primary/5 border-y">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3" data-testid="location-info">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Our Winter Park Location</h3>
                  <p className="text-sm text-muted-foreground">
                    1155 Louisiana Ave Suite 202<br />
                    Winter Park, FL 32789
                  </p>
                  <a 
                    href="https://maps.google.com/?q=1155+Louisiana+Ave+Suite+202+Winter+Park+FL+32789" 
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
                  >
                    386-848-8751
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Same-day appointments available
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3" data-testid="hours-info">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Office Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Mon-Fri: 9:00 AM - 6:00 PM<br />
                    Telehealth available
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

        {/* Insurance Section */}
        <InsuranceSection />

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2 space-y-8">
              <section className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mb-8">
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <h2 className="text-2xl font-sans font-bold text-foreground">
                    Need Immediate Help for Anxiety or Panic Attacks?
                  </h2>
                </div>
                <p className="text-foreground leading-relaxed mb-2">
                  <strong>Same-day crisis support available.</strong> If you're experiencing severe anxiety, panic attacks, or feel overwhelmed, our Orlando counselors can see you today. We understand that when anxiety becomes overwhelming, waiting weeks for help isn't an option.
                </p>
                <p className="text-sm text-muted-foreground mb-4 italic">
                  If this is a life-threatening emergency, please call 911 or the 988 Suicide & Crisis Lifeline immediately.
                </p>
                <div className="flex gap-4">
                  <Button 
                    asChild 
                    size="lg"
                    data-testid="button-crisis-call"
                    onClick={() => trackEvent('crisis_phone_click', 'conversion', 'Anxiety Page - Crisis')}
                  >
                    <a href="tel:386-848-8751">Call 386-848-8751 Now</a>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline"
                    size="lg"
                    data-testid="button-crisis-form"
                  >
                    <a href="#contact-form">Request Same-Day Appointment</a>
                  </Button>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Expert Anxiety Counseling in Orlando
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Our <Link href="/psychiatrist-orlando" className="text-primary hover:underline font-medium">Orlando anxiety therapists and psychiatric providers</Link> offer personalized care for individuals seeking support with generalized anxiety, social anxiety, panic symptoms, and worry-related concerns. As part of our comprehensive <Link href="/psychiatrist-orlando" className="text-primary hover:underline font-medium">psychiatry clinic in Orlando</Link>, we provide integrated mental health services combining therapy, medication management, and crisis support.
                  </p>
                  <p className="text-foreground leading-relaxed mb-4">
                    Anxiety disorders are the most common mental health condition in the United States, affecting millions of people. While everyone experiences worry or fear sometimes, anxiety disorders involve excessive, persistent anxiety that interferes with daily life.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    The good news? Anxiety is highly treatable. At Empathy Health Clinic, our experienced anxiety counselors and psychiatrists in Orlando use proven, evidence-based treatments to help you manage anxiety symptoms, reduce worry, and regain control of your life.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Types of Anxiety Disorders We Treat
                </h2>
                <div className="prose prose-lg max-w-none">
                  <ul className="space-y-3 text-foreground">
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Generalized Anxiety Disorder (GAD)</strong> - Chronic, excessive worry about everyday things</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Panic Disorder</strong> - Recurrent panic attacks with intense fear and physical symptoms</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Social Anxiety Disorder</strong> - Intense fear of social situations and being judged by others</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Specific Phobias</strong> - Extreme fear of particular objects or situations (heights, flying, animals, etc.)</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Health Anxiety</strong> - Excessive worry about having or developing serious illness</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Obsessive-Compulsive Disorder (OCD)</strong> - Intrusive thoughts and repetitive behaviors</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Post-Traumatic Stress Disorder (PTSD)</strong> - Anxiety following traumatic events</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Common Anxiety Symptoms
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Anxiety affects both your mind and body. Common symptoms include:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <ul className="space-y-2 text-foreground">
                      <li className="flex gap-2"><span className="text-primary">•</span> Excessive worry or fear</li>
                      <li className="flex gap-2"><span className="text-primary">•</span> Racing thoughts</li>
                      <li className="flex gap-2"><span className="text-primary">•</span> Difficulty concentrating</li>
                      <li className="flex gap-2"><span className="text-primary">•</span> Restlessness or feeling on edge</li>
                      <li className="flex gap-2"><span className="text-primary">•</span> Irritability</li>
                      <li className="flex gap-2"><span className="text-primary">•</span> Sleep problems</li>
                    </ul>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex gap-2"><span className="text-primary">•</span> Rapid heartbeat</li>
                      <li className="flex gap-2"><span className="text-primary">•</span> Sweating or trembling</li>
                      <li className="flex gap-2"><span className="text-primary">•</span> Shortness of breath</li>
                      <li className="flex gap-2"><span className="text-primary">•</span> Muscle tension</li>
                      <li className="flex gap-2"><span className="text-primary">•</span> Nausea or stomach problems</li>
                      <li className="flex gap-2"><span className="text-primary">•</span> Avoidance of feared situations</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Evidence-Based Anxiety Treatment
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    We offer comprehensive anxiety treatment using proven methods:
                  </p>
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Cognitive Behavioral Therapy (CBT)</h3>
                      <p className="text-muted-foreground">The gold standard for anxiety treatment. CBT helps you identify and change anxious thoughts and behaviors. Includes exposure therapy for phobias and panic disorder.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Medication Management</h3>
                      <p className="text-muted-foreground">Our psychiatrists prescribe anti-anxiety medications (SSRIs, SNRIs, benzodiazepines when appropriate) tailored to your symptoms. We carefully monitor effectiveness and adjust as needed.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Mindfulness-Based Therapy</h3>
                      <p className="text-muted-foreground">Learn mindfulness and relaxation techniques to manage anxiety in the moment and reduce overall stress levels.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2">EMDR for Trauma-Related Anxiety</h3>
                      <p className="text-muted-foreground">If your anxiety stems from trauma or PTSD, EMDR therapy can help process traumatic memories and reduce anxiety symptoms.</p>
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
                      <h3 className="font-semibold text-foreground mb-1">Anxiety Specialists</h3>
                      <p className="text-sm text-muted-foreground">Expert psychiatrists and therapists trained in anxiety treatment</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Same-Day Crisis Support</h3>
                      <p className="text-sm text-muted-foreground">Immediate help when anxiety is overwhelming</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Insurance Accepted</h3>
                      <p className="text-sm text-muted-foreground">Most major insurance plans cover anxiety treatment</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Telehealth Available</h3>
                      <p className="text-sm text-muted-foreground">Virtual appointments from the comfort of home</p>
                    </div>
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
                    href="/anxiety-psychiatrist-orlando" 
                    className="block text-primary hover:underline underline-offset-2 font-medium"
                    data-testid="link-anxiety-psychiatrist"
                  >
                    → Anxiety Psychiatrist Orlando
                  </Link>
                  <Link 
                    href="/depression-counseling" 
                    className="block text-primary hover:underline underline-offset-2"
                    data-testid="link-depression"
                  >
                    → Depression Counseling
                  </Link>
                  <Link 
                    href="/emdr-therapy" 
                    className="block text-primary hover:underline underline-offset-2"
                    data-testid="link-emdr"
                  >
                    → EMDR Therapy (for Trauma)
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
                Expert, compassionate anxiety treatment
              </p>
            </div>
            <TrustFactors variant="compact" limit={4} />
          </div>
        </div>

        {/* FAQ Section */}
        <TherapyFAQ 
          pageTitle="Anxiety Therapy"
          customFaqs={[
            {
              question: "How long does anxiety treatment take?",
              answer: "Many people notice improvement within 6-8 weeks of starting treatment. CBT typically involves 12-16 sessions, though some people benefit from longer-term therapy. Medication can begin working within 2-4 weeks."
            },
            {
              question: "Are anti-anxiety medications addictive?",
              answer: "SSRIs and SNRIs (first-line anxiety medications) are not addictive. Benzodiazepines can be habit-forming with long-term use, so we prescribe them carefully and typically for short periods during acute anxiety."
            },
            {
              question: "Will I need medication for anxiety?",
              answer: "Not necessarily. Mild to moderate anxiety often responds well to therapy alone. Medication is typically recommended for moderate to severe anxiety or when therapy alone isn't enough. Your psychiatrist will recommend the best approach for you."
            },
            {
              question: "Can anxiety be cured?",
              answer: "While anxiety may not be 'cured,' it can be effectively managed. Most people with anxiety disorders see significant improvement with treatment and learn skills to manage symptoms long-term."
            }
          ]}
        />

        {/* Authoritative Sources for YMYL Compliance */}
        <div className="container mx-auto px-4 max-w-4xl">
          <AuthoritativeSourcesBlock 
            variant="section"
            sources={[
              { source: "NIMH", topic: "Anxiety Disorders" },
              { source: "APA", topic: "What Are Anxiety Disorders?" },
              { source: "NIH", topic: "Generalized Anxiety Disorder" }
            ]}
          />
        </div>

        {/* Trust Badges */}
        <ReviewsAndBadges />
      </main>
      <SiteFooter />
    </div>
  );
}
