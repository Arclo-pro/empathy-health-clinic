import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, MapPin, Phone, Clock, Star, CheckCircle, Brain, Shield, Calendar, Users, Video, Award, Pill } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import HeroBackground from "@/components/HeroBackground";
import ShortContactForm from "@/components/ShortContactForm";
import heroImage from "@assets/stock_images/professional_healthc_955227e9.jpg";
import { trackEvent } from "@/lib/analytics";

export default function MedicationManagementOrlando() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "Empathy Health Clinic - Medication Management Orlando FL",
    "description": "Expert psychiatric medication management in Orlando, FL. Board-certified psychiatrists providing medication prescribing, monitoring, and optimization for depression, anxiety, ADHD, bipolar, and more.",
    "url": "https://empathyhealthclinic.com/medication-management-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "areaServed": [
      { "@type": "City", "name": "Orlando" },
      { "@type": "City", "name": "Winter Park" },
      { "@type": "City", "name": "Altamonte Springs" },
      { "@type": "City", "name": "Lake Mary" },
      { "@type": "City", "name": "Maitland" }
    ],
    "medicalSpecialty": "Psychiatric Medication Management"
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Medication Management Orlando Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Medication Management Orlando FL | Psychiatric Medication Specialists"
        description="Expert psychiatric medication management in Orlando, FL. Board-certified psychiatrists specializing in medication prescribing and monitoring for depression, anxiety, ADHD, bipolar disorder. Call 386-848-8751."
        keywords={["medication management orlando", "psychiatric medication orlando", "medication management orlando fl", "psychiatrist medication orlando", "psych meds orlando", "medication prescribing orlando", "mental health medication orlando"]}
        canonicalPath="/medication-management-orlando"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Psychiatric Medication Management in Orlando
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Board-certified psychiatrists providing expert medication management for mental health conditions in Orlando. Comprehensive medication prescribing, monitoring, and optimization for depression, anxiety, ADHD, bipolar disorder, and more.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              className="bg-green-600 hover:bg-green-700 text-white"
              data-testid="button-hero-cta"
              onClick={() => trackEvent('medication_management_orlando_hero_cta', 'conversion', 'Medication Management Orlando Page')}
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
                <span>Medication Specialists</span>
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
                  <h3 className="font-semibold text-foreground mb-1">Call or Text</h3>
                  <a 
                    href="tel:386-848-8751" 
                    className="text-lg font-bold text-primary hover:underline"
                    data-testid="link-phone"
                    onClick={handlePhoneClick}
                  >
                    386-848-8751
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Same-week medication appointments
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
                    Accepting new patients
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
                  Expert Psychiatric Medication Management in Orlando
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Psychiatric medication management is a specialized medical service provided by board-certified psychiatrists to prescribe, monitor, and optimize medications for mental health conditions. At our <Link href="/psychiatry-clinic-orlando" className="text-primary hover:underline font-medium">psychiatry clinic in Orlando</Link>, our psychiatrists provide comprehensive medication management for adults experiencing depression, anxiety, ADHD, bipolar disorder, and other psychiatric conditions that benefit from medication treatment.
                  </p>
                  <p className="text-foreground leading-relaxed mb-4">
                    Unlike primary care physicians or nurse practitioners, psychiatrists are medical doctors with extensive specialized training in psychopharmacology - the science of how psychiatric medications work in the brain. Our Orlando medication management psychiatrists understand the complexities of psychiatric medications, how to select the right medication for your specific symptoms, how to optimize dosing for maximum benefit with minimal side effects, and how to manage medication combinations when needed.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    We accept most major insurance plans and offer both in-person medication management appointments at our Winter Park office (convenient to Orlando, Lake Mary, Altamonte Springs, and Maitland) and secure telepsychiatry visits throughout Florida. Same-week appointments are typically available for new patients seeking medication management services.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Conditions We Treat with Medication Management
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Our Orlando psychiatrists provide medication management for:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <ul className="space-y-2 text-foreground">
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Depression</strong> - SSRIs, SNRIs, atypical antidepressants, and other medications</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Anxiety Disorders</strong> - GAD, panic disorder, social anxiety, phobias, OCD</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>ADHD</strong> - Stimulants and non-stimulant medications for focus and attention</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Bipolar Disorder</strong> - Mood stabilizers and comprehensive bipolar medication management</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Insomnia</strong> - Sleep medications and treatment of psychiatric causes of sleep problems</span>
                      </li>
                    </ul>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>PTSD</strong> - Medication management for trauma-related symptoms</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Psychotic Disorders</strong> - Antipsychotic medication management</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>OCD</strong> - Specialized medication approaches for obsessive-compulsive disorder</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Eating Disorders</strong> - Medication for co-occurring depression, anxiety, or OCD</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Other Psychiatric Conditions</strong> - Personalized medication management plans</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Our Medication Management Services
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Brain className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Initial Medication Evaluation</h3>
                      <p className="text-muted-foreground">
                        Comprehensive 45-60 minute initial appointment to review your symptoms, psychiatric history, previous medications tried, medical conditions, current medications, and treatment goals. We develop a personalized medication treatment plan based on evidence-based practices and your unique needs.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Pill className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Medication Prescribing & Optimization</h3>
                      <p className="text-muted-foreground">
                        Expert selection of psychiatric medications based on your specific diagnosis, symptoms, and circumstances. We start medications at appropriate doses, adjust dosing based on response and tolerability, and make medication changes when needed to optimize your treatment outcomes.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Shield className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Ongoing Monitoring & Follow-Up</h3>
                      <p className="text-muted-foreground">
                        Regular medication management appointments (typically 20-30 minutes) to monitor treatment response, assess for side effects, track symptom improvement, adjust medications as needed, and ensure you're getting optimal benefit from your psychiatric medications. Frequency based on stability - monthly initially, then every 2-3 months.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Users className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Collaborative Care Coordination</h3>
                      <p className="text-muted-foreground">
                        Communication with your therapist, primary care physician, and other providers when appropriate. We believe in integrated care and work collaboratively to ensure all aspects of your treatment are aligned and supporting your mental health goals.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  What to Expect During Medication Management
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Understanding the medication management process helps you get the most from treatment:
                  </p>
                  <ul className="space-y-2 text-foreground mb-4">
                    <li className="flex gap-2"><span className="text-primary">•</span> <strong>Initial Evaluation (45-60 min):</strong> Comprehensive assessment of symptoms, history, and medication planning</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> <strong>Medication Start:</strong> Begin at safe starting dose with clear instructions on how to take the medication</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> <strong>Early Follow-ups (20-30 min):</strong> Monthly visits initially to monitor response, side effects, and adjust dosing</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> <strong>Optimization Phase:</strong> Fine-tuning dosage or trying different medications if needed to find what works best</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> <strong>Maintenance Phase:</strong> Once stable, less frequent visits (every 2-3 months) to maintain progress</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> <strong>Ongoing Support:</strong> Access to your psychiatrist between visits if urgent medication questions arise</li>
                  </ul>
                  <p className="text-foreground leading-relaxed">
                    Most psychiatric medications take several weeks to reach full effectiveness, so patience and regular follow-up are important for achieving optimal results.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Why Choose Our Orlando Medication Management Services?
                </h2>
                <div className="prose prose-lg max-w-none">
                  <ul className="space-y-3 text-foreground">
                    <li className="flex gap-3">
                      <Award className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Board-Certified Psychiatrists</strong> - Our medication management is provided by board-certified psychiatrists with extensive training in psychopharmacology. Psychiatrists have more specialized training in psychiatric medications than any other type of healthcare provider.</span>
                    </li>
                    <li className="flex gap-3">
                      <Calendar className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Same-Week Appointments</strong> - Fast access to medication management services in Orlando. We understand that when you're ready to start treatment or need medication adjustments, waiting weeks isn't acceptable.</span>
                    </li>
                    <li className="flex gap-3">
                      <Brain className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Personalized Treatment Plans</strong> - We don't believe in one-size-fits-all medication management. Your medication plan is tailored to your specific symptoms, medical history, lifestyle, previous medication experiences, and treatment preferences.</span>
                    </li>
                    <li className="flex gap-3">
                      <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Evidence-Based Prescribing</strong> - We use medications proven effective in clinical research and follow best practice guidelines. Our treatment recommendations are based on science, not marketing or sales incentives.</span>
                    </li>
                    <li className="flex gap-3">
                      <Video className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Flexible Visit Options</strong> - Choose between in-person medication management visits or convenient telehealth appointments. Both provide the same quality psychiatric care and medication prescribing services.</span>
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
                    <h3 className="font-semibold text-foreground mb-2">What is medication management?</h3>
                    <p className="text-muted-foreground">
                      Medication management is the process of prescribing, monitoring, and adjusting psychiatric medications to treat mental health conditions. It includes the initial evaluation, selecting appropriate medications, monitoring for effectiveness and side effects, adjusting dosages, and ongoing follow-up care. Psychiatrists are the most qualified providers for psychiatric medication management.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Can I do medication management without therapy?</h3>
                    <p className="text-muted-foreground">
                      Yes, many people benefit from medication management alone, especially for conditions like ADHD, bipolar disorder, or when depression/anxiety symptoms are primarily biological rather than situational. However, research shows that combining medication with therapy often provides the best outcomes for many conditions. We can discuss what combination of treatments might work best for you.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">How often will I need medication management appointments?</h3>
                    <p className="text-muted-foreground">
                      Initially, appointments are typically monthly to closely monitor your response and adjust medications as needed. Once you're stable on medication, appointments usually occur every 2-3 months for ongoing medication management. The frequency can be adjusted based on your stability and needs.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Can you prescribe controlled substances like Adderall or Xanax?</h3>
                    <p className="text-muted-foreground">
                      Yes, our board-certified psychiatrists can prescribe controlled substances including ADHD medications (Adderall, Vyvanse, etc.) and anti-anxiety medications (Xanax, Klonopin, etc.) when medically appropriate. All prescribing follows strict medical guidelines, DEA regulations, and Florida state requirements.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Will my insurance cover medication management?</h3>
                    <p className="text-muted-foreground">
                      Most major insurance plans cover psychiatric medication management appointments with a psychiatrist. We accept Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, Humana, and many other insurance plans. Contact our office to verify coverage for your specific plan.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">What if my current medications aren't working well?</h3>
                    <p className="text-muted-foreground">
                      Many Orlando residents come to us for second opinions or because their current medications aren't providing adequate symptom relief or are causing bothersome side effects. We can review your current medications, make adjustments, try different medications, or optimize your treatment plan to achieve better results.
                    </p>
                  </div>
                </div>
              </section>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Schedule Medication Management</h3>
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
                    <Link href="/psychiatrist-orlando" className="block text-sm text-primary hover:underline">
                      Psychiatrist Orlando
                    </Link>
                    <Link href="/anxiety-psychiatrist-orlando" className="block text-sm text-primary hover:underline">
                      Anxiety Psychiatrist Orlando
                    </Link>
                    <Link href="/adhd-psychiatrist-orlando" className="block text-sm text-primary hover:underline">
                      ADHD Psychiatrist Orlando
                    </Link>
                    <Link href="/telepsychiatry-orlando" className="block text-sm text-primary hover:underline">
                      Telepsychiatry Orlando
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
                Schedule Medication Management Appointment
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
