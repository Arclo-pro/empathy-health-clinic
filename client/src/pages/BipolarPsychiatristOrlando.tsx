import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, MapPin, Phone, Clock, Star, CheckCircle, Brain, Shield, Calendar, Users, Video, Award, Activity } from "lucide-react";
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

export default function BipolarPsychiatristOrlando() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "Empathy Health Clinic - Bipolar Psychiatrist Orlando FL",
    "description": "Board-certified psychiatrists specializing in bipolar disorder treatment in Orlando, FL. Expert medication management for bipolar I, bipolar II, and mood stabilization.",
    "url": "https://empathyhealthclinic.com/bipolar-psychiatrist-orlando",
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
    "medicalSpecialty": "Psychiatry - Bipolar Disorder Specialist"
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Bipolar Psychiatrist Orlando Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Bipolar Psychiatrist Orlando FL | Bipolar Disorder Treatment Specialist"
        description="Expert bipolar disorder psychiatrists in Orlando, FL. Specialized treatment for bipolar I, bipolar II, mood stabilization, and mania/depression management. Same-week appointments. Call 386-848-8751."
        keywords={["bipolar psychiatrist orlando", "bipolar disorder orlando", "bipolar psychiatrist orlando fl", "orlando bipolar doctor", "mood stabilization orlando", "bipolar medication orlando", "manic depression orlando", "bipolar specialist orlando"]}
        canonicalPath="/bipolar-psychiatrist-orlando"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Bipolar Disorder Psychiatrists in Orlando
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Board-certified psychiatrists specializing in bipolar disorder treatment in Orlando. Expert medication management for mood stabilization, mania, depression, and comprehensive care for bipolar I, bipolar II, and cyclothymic disorder.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              className="bg-green-600 hover:bg-green-700 text-white"
              data-testid="button-hero-cta"
              onClick={() => trackEvent('bipolar_psychiatrist_orlando_hero_cta', 'conversion', 'Bipolar Psychiatrist Orlando Page')}
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
                <span>Bipolar Disorder Specialists</span>
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
                    Same-week bipolar appointments
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
                    Accepting new bipolar patients
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
                  Expert Bipolar Disorder Treatment in Orlando, FL
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Bipolar disorder is a complex mental health condition characterized by significant mood swings including emotional highs (mania or hypomania) and lows (depression). At our <Link href="/psychiatry-clinic-orlando" className="text-primary hover:underline font-medium">Orlando psychiatry clinic</Link>, our board-certified psychiatrists specialize in comprehensive bipolar disorder treatment, providing expert medication management and psychiatric care to help you achieve mood stability and improve your quality of life.
                  </p>
                  <p className="text-foreground leading-relaxed mb-4">
                    Our Orlando bipolar psychiatrists understand that living with bipolar disorder can be challenging - the unpredictable mood episodes can impact your relationships, work performance, and daily functioning. Whether you've been recently diagnosed with bipolar I, bipolar II, or cyclothymic disorder, or you're seeking better mood stabilization with your current treatment, we provide personalized, evidence-based psychiatric care tailored to your unique needs.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    We accept most major insurance plans and offer both in-person appointments at our Winter Park office (convenient to Orlando, Lake Mary, Altamonte Springs, and Maitland) and secure telepsychiatry options throughout Florida. Same-week appointments are typically available because we know that when mood episodes are impacting your life, timely access to expert psychiatric care is essential.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Types of Bipolar Disorder We Treat
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Our bipolar disorder specialists in Orlando provide expert treatment for all types:
                  </p>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground"><strong>Bipolar I Disorder</strong> - Characterized by at least one manic episode (lasting 7+ days or requiring hospitalization). May include depressive episodes and periods of normal mood. Manic episodes involve elevated mood, increased energy, decreased need for sleep, and sometimes risky behaviors.</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground"><strong>Bipolar II Disorder</strong> - Involves at least one hypomanic episode (less severe than full mania) and at least one major depressive episode. People with Bipolar II often spend more time in depressive episodes, which can be severely debilitating.</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground"><strong>Cyclothymic Disorder</strong> - Chronic fluctuating mood disturbance involving numerous periods of hypomanic symptoms and depressive symptoms (less severe than major depression) lasting at least 2 years in adults.</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground"><strong>Rapid Cycling Bipolar</strong> - A pattern of bipolar disorder where the person experiences four or more mood episodes within one year. This requires specialized medication management strategies.</span>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Our Bipolar Disorder Treatment Services
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Brain className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Comprehensive Bipolar Evaluations</h3>
                      <p className="text-muted-foreground">
                        Thorough diagnostic assessment to accurately identify bipolar disorder type and severity. We review your mood episode history, family psychiatric history, symptom patterns, and previous treatments to develop an accurate diagnosis and effective treatment plan.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Shield className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Mood Stabilization Medication Management</h3>
                      <p className="text-muted-foreground">
                        Expert prescribing and monitoring of mood stabilizers, atypical antipsychotics, and other medications proven effective for bipolar disorder. We carefully select medications based on your specific bipolar type, symptom patterns, and treatment history to achieve optimal mood stability.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Activity className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Acute Episode Management</h3>
                      <p className="text-muted-foreground">
                        Treatment for acute manic, hypomanic, or depressive episodes. We provide urgent appointments when you're experiencing a mood episode, adjust medications quickly to stabilize mood, and help prevent hospitalization when possible through intensive outpatient management.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Users className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Long-Term Maintenance Care</h3>
                      <p className="text-muted-foreground">
                        Ongoing medication management and monitoring to maintain mood stability and prevent future episodes. Regular follow-ups to track mood patterns, adjust medications as needed, monitor for side effects, and support your long-term wellness and functioning.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Recognizing Bipolar Disorder Symptoms
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Understanding bipolar symptoms is crucial for diagnosis and treatment:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Manic/Hypomanic Symptoms:</h3>
                      <ul className="space-y-2 text-foreground">
                        <li className="flex gap-2"><span className="text-primary">•</span> Abnormally elevated or irritable mood</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Increased energy and activity levels</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Decreased need for sleep</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Racing thoughts and rapid speech</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Grandiose beliefs or inflated self-esteem</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Increased risky or impulsive behavior</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Distractibility and poor judgment</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Depressive Episode Symptoms:</h3>
                      <ul className="space-y-2 text-foreground">
                        <li className="flex gap-2"><span className="text-primary">•</span> Persistent sad or empty mood</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Loss of interest in activities</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Fatigue or loss of energy</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Sleep problems (too much or too little)</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Feelings of worthlessness or guilt</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Difficulty concentrating</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Suicidal thoughts or ideation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Medications We Prescribe for Bipolar Disorder
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Our bipolar psychiatrists in Orlando have expertise with all evidence-based bipolar medications:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-card p-4 rounded-lg border">
                      <h3 className="font-semibold text-foreground mb-2">Mood Stabilizers:</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li>• Lithium (gold standard for bipolar)</li>
                        <li>• Valproate (Depakote)</li>
                        <li>• Lamotrigine (Lamictal)</li>
                        <li>• Carbamazepine (Tegretol)</li>
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                      <h3 className="font-semibold text-foreground mb-2">Atypical Antipsychotics:</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li>• Quetiapine (Seroquel)</li>
                        <li>• Lurasidone (Latuda)</li>
                        <li>• Aripiprazole (Abilify)</li>
                        <li>• Olanzapine (Zyprexa)</li>
                        <li>• Cariprazine (Vraylar)</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Note: Many people with bipolar disorder benefit from combination therapy using multiple medications to achieve optimal mood stability.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Why Choose Our Bipolar Psychiatrists in Orlando?
                </h2>
                <div className="prose prose-lg max-w-none">
                  <ul className="space-y-3 text-foreground">
                    <li className="flex gap-3">
                      <Award className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Bipolar Disorder Expertise</strong> - Our board-certified psychiatrists have specialized experience treating bipolar disorder and understand the complexities of achieving mood stabilization. We stay current on the latest research and treatment approaches for bipolar I, bipolar II, and rapid cycling patterns.</span>
                    </li>
                    <li className="flex gap-3">
                      <Calendar className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Urgent Access for Mood Episodes</strong> - Same-week appointments available, including urgent visits when you're experiencing a manic or depressive episode. We understand that bipolar episodes require prompt intervention and medication adjustment.</span>
                    </li>
                    <li className="flex gap-3">
                      <Brain className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Comprehensive Medication Management</strong> - Expertise with all mood stabilizers and atypical antipsychotics. We're skilled at finding the right medication or combination of medications for your specific bipolar presentation while minimizing side effects.</span>
                    </li>
                    <li className="flex gap-3">
                      <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Close Monitoring & Lab Work</strong> - Regular monitoring including blood work when appropriate (lithium levels, valproate levels, metabolic panels). We ensure medications are at therapeutic levels and track for potential side effects.</span>
                    </li>
                    <li className="flex gap-3">
                      <Users className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Collaborative Treatment Approach</strong> - We work with your therapist, encourage involvement of supportive family members when appropriate, and coordinate care to provide comprehensive bipolar disorder treatment beyond just medication.</span>
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
                    <h3 className="font-semibold text-foreground mb-2">How is bipolar disorder diagnosed?</h3>
                    <p className="text-muted-foreground">
                      Bipolar disorder is diagnosed through comprehensive psychiatric evaluation including detailed history of mood episodes, family psychiatric history, symptom assessment, and ruling out other conditions. We look for patterns of manic/hypomanic and depressive episodes. Accurate diagnosis is crucial as treatment differs significantly from unipolar depression.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Is medication always necessary for bipolar disorder?</h3>
                    <p className="text-muted-foreground">
                      For most people with bipolar disorder, medication is a cornerstone of effective treatment. Research shows that mood stabilizers and other psychiatric medications significantly reduce the frequency and severity of mood episodes. While therapy is important, medication is typically essential for achieving mood stability and preventing future episodes.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Will I need to take medication forever?</h3>
                    <p className="text-muted-foreground">
                      Bipolar disorder is a chronic condition, and most people benefit from ongoing medication to maintain mood stability and prevent future episodes. Research shows that discontinuing medication significantly increases the risk of relapse. However, treatment can be adjusted over time, and we work with you to find the most effective medication regimen with minimal side effects.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">What are common side effects of bipolar medications?</h3>
                    <p className="text-muted-foreground">
                      Side effects vary by medication. Lithium may cause hand tremor, increased thirst, or weight gain. Valproate can cause weight gain or hair changes. Atypical antipsychotics may cause metabolic changes or sedation. We carefully select medications considering side effect profiles, monitor closely, and adjust treatment to minimize bothersome side effects while maintaining mood stability.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Can you help if my current bipolar medications aren't working well?</h3>
                    <p className="text-muted-foreground">
                      Absolutely. If you're still experiencing mood episodes, having significant side effects, or feel your current medications aren't providing adequate mood stabilization, we can review your treatment, adjust medications, try different combinations, or switch to alternative mood stabilizers that may work better for you.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">How quickly can I see a bipolar psychiatrist in Orlando?</h3>
                    <p className="text-muted-foreground">
                      We typically offer same-week appointments for new bipolar patients. If you're experiencing an acute mood episode, please let our scheduling team know so we can prioritize your appointment. Call 386-848-8751 to schedule.
                    </p>
                  </div>
                </div>
              </section>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Schedule Bipolar Treatment</h3>
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
                    <Link href="/medication-management-orlando" className="block text-sm text-primary hover:underline">
                      Medication Management Orlando
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
                Schedule Your Bipolar Treatment Appointment
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
