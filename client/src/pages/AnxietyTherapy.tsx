import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, Heart, Shield, Calendar, Brain, AlertCircle } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import TrustFactors from "@/components/TrustFactors";
import HeroBackground from "@/components/HeroBackground";
import heroImage from "@assets/stock_images/calm_peaceful_therap_b118766b.jpg";
import { trackEvent } from "@/lib/analytics";

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
        title="Anxiety Counseling Orlando FL | Anxiety Treatment Winter Park"
        description="Anxiety counseling in Orlando and Winter Park, FL. Expert treatment for panic attacks, generalized anxiety, social anxiety. Same-day crisis support available. CBT, medication management. Call 386-848-8751."
        keywords={["anxiety counseling Orlando", "anxiety counseling Winter Park FL", "anxiety treatment Florida", "anxiety counselor near me", "panic attack treatment Orlando", "social anxiety counseling", "crisis anxiety support Orlando"]}
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
              variant="default" 
              size="lg" 
              asChild 
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

        <div className="bg-primary text-primary-foreground py-3">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center justify-center gap-2 text-sm md:text-base font-medium">
              <Heart className="h-5 w-5" />
              <span>Same-Day Crisis Support | Most Insurance Accepted | In-Person & Telehealth Options</span>
            </div>
          </div>
        </div>

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

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">How long does anxiety treatment take?</h3>
                    <p className="text-muted-foreground">Many people notice improvement within 6-8 weeks of starting treatment. CBT typically involves 12-16 sessions, though some people benefit from longer-term therapy. Medication can begin working within 2-4 weeks.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Are anti-anxiety medications addictive?</h3>
                    <p className="text-muted-foreground">SSRIs and SNRIs (first-line anxiety medications) are not addictive. Benzodiazepines can be habit-forming with long-term use, so we prescribe them carefully and typically for short periods during acute anxiety.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Will I need medication for anxiety?</h3>
                    <p className="text-muted-foreground">Not necessarily. Mild to moderate anxiety often responds well to therapy alone. Medication is typically recommended for moderate to severe anxiety or when therapy alone isn't enough. Your psychiatrist will recommend the best approach for you.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Can anxiety be cured?</h3>
                    <p className="text-muted-foreground">While anxiety may not be "cured," it can be effectively managed. Most people with anxiety disorders see significant improvement with treatment and learn skills to manage symptoms long-term.</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="md:col-span-1 space-y-6">
              <div id="contact-form">
                <LeadCaptureForm therapyName="Anxiety Counseling" />
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Related Services
                </h3>
                <div className="space-y-3">
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
      </main>
      <SiteFooter />
    </div>
  );
}
