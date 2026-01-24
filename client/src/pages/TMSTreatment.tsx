import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, Brain, Shield, Calendar, Award, Star, CheckCircle, Zap, Clock, Users, Activity } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import HeroBackground from "@/components/HeroBackground";
import { AuthoritativeSourcesBlock } from "@/components/AuthoritativeSource";
const heroImage = "/site-assets/stock_images/calm_peaceful_therap_3749281a.jpg";
import { trackEvent } from "@/lib/analytics";

export default function TMSTreatment() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    "name": "TMS Therapy",
    "description": "Transcranial Magnetic Stimulation (TMS) therapy for treatment-resistant depression, anxiety, and OCD in Orlando, FL. FDA-approved, non-invasive brain stimulation treatment.",
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
    "areaServed": ["Orlando", "Winter Park", "Altamonte Springs", "Maitland", "Lake Mary"]
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="TMS Therapy Orlando FL | Transcranial Magnetic Stimulation Treatment"
        description="TMS therapy for treatment-resistant depression in Orlando, FL. FDA-approved, non-invasive brain stimulation. No downtime, minimal side effects. Most insurance accepted. Call 386-848-8751."
        keywords={["TMS therapy Orlando", "transcranial magnetic stimulation", "TMS treatment Orlando FL", "treatment-resistant depression", "TMS for depression", "TMS therapy near me", "brain stimulation therapy", "TMS Orlando Florida"]}
        canonicalPath="/tms-treatment"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            TMS Therapy in Orlando, FL
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            FDA-approved brain stimulation therapy for treatment-resistant depression. Non-invasive, medication-free treatment with proven results.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              className=""
              data-testid="button-hero-cta"
              onClick={() => trackEvent('tms_hero_cta', 'conversion', 'TMS Page')}
            >
              <a href="#contact-form">Get Started with TMS</a>
            </Button>
            <Button 
              size="lg" 
              asChild 
              className=""
              data-testid="button-hero-phone"
              onClick={() => trackEvent('phone_click', 'conversion', 'TMS Page - Hero')}
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
                  What Is TMS Therapy?
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Transcranial Magnetic Stimulation (TMS) is an FDA-approved, non-invasive treatment for treatment-resistant depression and other mental health conditions. TMS uses focused magnetic pulses to stimulate specific areas of the brain that regulate mood, similar to an MRI machine but targeted to treat depression.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    Unlike medications that affect your entire body, TMS directly targets the brain regions responsible for depression. The treatment is performed in our office, requires no anesthesia or sedation, and allows you to return to your normal activities immediately after each session.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Who Is TMS Therapy For?
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    TMS therapy is particularly effective for people who haven't found relief from traditional treatments. It may be right for you if:
                  </p>
                  <ul className="space-y-3 text-foreground">
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Treatment-Resistant Depression</strong> - You've tried multiple antidepressants without adequate relief</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Medication Side Effects</strong> - Antidepressants cause unbearable side effects or don't work for you</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Major Depressive Disorder</strong> - Diagnosed with MDD and seeking effective treatment options</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Anxiety Disorders</strong> - Generalized anxiety disorder, panic disorder, or social anxiety</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>OCD (Obsessive-Compulsive Disorder)</strong> - FDA-approved for OCD treatment</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Postpartum Depression</strong> - Safe, medication-free option for new mothers</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  How TMS Therapy Works
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    TMS therapy uses magnetic fields to stimulate nerve cells in regions of the brain involved in mood regulation. Here's what to expect:
                  </p>
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2">1. Initial Consultation & Brain Mapping</h3>
                      <p className="text-muted-foreground">Your provider determines the precise location and strength of magnetic pulses needed for your treatment.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2">2. Treatment Sessions</h3>
                      <p className="text-muted-foreground">You sit in a comfortable chair while a magnetic coil is positioned against your scalp. The device delivers focused magnetic pulses to stimulate brain cells. Each session lasts 20-40 minutes.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2">3. Treatment Schedule</h3>
                      <p className="text-muted-foreground">Standard TMS treatment involves 5 sessions per week for 4-6 weeks (20-30 total sessions). You remain awake and alert during treatment and can drive yourself home.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2">4. Ongoing Monitoring</h3>
                      <p className="text-muted-foreground">Your progress is closely monitored throughout treatment with regular assessments to track improvement in symptoms.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Benefits of TMS Therapy
                </h2>
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">FDA-Approved</h3>
                      <p className="text-sm text-muted-foreground">Cleared for treatment-resistant depression and OCD with proven safety and efficacy</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Non-Invasive</h3>
                      <p className="text-sm text-muted-foreground">No surgery, no anesthesia, no sedation required</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">No Downtime</h3>
                      <p className="text-sm text-muted-foreground">Return to work and normal activities immediately after each session</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Activity className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Minimal Side Effects</h3>
                      <p className="text-sm text-muted-foreground">No weight gain, sexual dysfunction, or cognitive impairment</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Why Choose Empathy Health Clinic for TMS?
                </h2>
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Expert TMS Providers</h3>
                      <p className="text-sm text-muted-foreground">Board-certified psychiatrists with extensive TMS experience</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Flexible Scheduling</h3>
                      <p className="text-sm text-muted-foreground">Morning, afternoon, and evening appointments to fit your schedule</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Insurance Coverage</h3>
                      <p className="text-sm text-muted-foreground">Most major insurance plans cover TMS therapy - we'll verify your benefits</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Comprehensive Care</h3>
                      <p className="text-sm text-muted-foreground">Integrated with therapy and medication management for complete treatment</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Frequently Asked Questions About TMS
                </h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Does TMS therapy hurt?</h3>
                    <p className="text-muted-foreground">TMS is generally well-tolerated. You may feel a tapping sensation on your scalp during treatment, and some patients experience mild scalp discomfort or headache during the first few sessions. These side effects typically decrease as you continue treatment. The procedure is not painful and requires no anesthesia.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">How long does it take to see results from TMS?</h3>
                    <p className="text-muted-foreground">Most patients begin noticing improvement after 2-4 weeks of treatment (10-20 sessions). Some experience results sooner, while others may take the full 6-week course to achieve optimal benefits. Clinical studies show that 50-60% of patients experience significant improvement, with about one-third achieving complete remission.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Is TMS therapy covered by insurance?</h3>
                    <p className="text-muted-foreground">Yes! TMS is covered by most major insurance plans including Medicare, Blue Cross Blue Shield, Cigna, Aetna, and UnitedHealthcare when criteria are met (typically 2+ failed antidepressant trials). We will verify your insurance benefits and help you understand your coverage before starting treatment.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Can I continue taking my medications during TMS?</h3>
                    <p className="text-muted-foreground">Yes, you can continue taking your current antidepressant medications during TMS therapy. In fact, some patients find that TMS enhances the effectiveness of their medications. Your psychiatrist will work with you to determine the best treatment approach, which may include adjusting medications during or after TMS.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">How long do TMS results last?</h3>
                    <p className="text-muted-foreground">Clinical studies show that many patients maintain their improvement for a year or longer after completing TMS treatment. If symptoms return, maintenance TMS sessions or a repeat treatment course can be effective. Your provider will work with you on a long-term management plan.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">What are the side effects of TMS?</h3>
                    <p className="text-muted-foreground">TMS has minimal side effects compared to antidepressants. The most common side effects are mild scalp discomfort or headache during treatment, which typically resolve after the first week. Unlike medications, TMS does not cause weight gain, sexual dysfunction, sedation, or memory problems. Serious side effects are extremely rare.</p>
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
                    href="/depression-treatment" 
                    className="block text-primary hover:underline underline-offset-2"
                    data-testid="link-depression-treatment"
                  >
                    → Depression Treatment
                  </Link>
                  <Link 
                    href="/anxiety-therapy" 
                    className="block text-primary hover:underline underline-offset-2"
                    data-testid="link-anxiety-therapy"
                  >
                    → Anxiety Therapy
                  </Link>
                  <Link 
                    href="/services" 
                    className="block text-primary hover:underline underline-offset-2"
                    data-testid="link-medication-management"
                  >
                    → Medication Management
                  </Link>
                  <Link 
                    href="/psychiatrist-orlando" 
                    className="block text-primary hover:underline underline-offset-2"
                    data-testid="link-psychiatrist-orlando"
                  >
                    → Psychiatrist Orlando
                  </Link>
                  <Link 
                    href="/virtual-therapy" 
                    className="block text-primary hover:underline underline-offset-2"
                    data-testid="link-virtual-therapy"
                  >
                    → Virtual Therapy
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
                Advanced TMS therapy with compassionate, expert care
              </p>
            </div>
            <TrustFactors variant="compact" limit={4} />
          </div>
        </div>

        {/* Authoritative Sources for YMYL Compliance */}
        <div className="container mx-auto px-4 max-w-4xl">
          <AuthoritativeSourcesBlock 
            variant="section"
            sources={[
              { source: "NIMH", topic: "Brain Stimulation Therapies" },
              { source: "APA", topic: "Transcranial Magnetic Stimulation" },
              { source: "NIH", topic: "TMS for Depression" }
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