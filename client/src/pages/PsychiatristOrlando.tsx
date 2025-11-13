import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, MapPin, Phone, Clock, Star, CheckCircle, Brain, Shield, Calendar, Users, Video, Award } from "lucide-react";
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

export default function PsychiatristOrlando() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "Empathy Health Clinic - Psychiatrist Orlando FL",
    "description": "Board-certified psychiatrists in Orlando, FL providing medication management, psychiatric evaluations, and comprehensive mental health treatment for anxiety, depression, ADHD, bipolar disorder, and more.",
    "url": "https://empathyhealthclinic.com/psychiatrist-orlando",
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
    "medicalSpecialty": "Psychiatry",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Psychiatric Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalTherapy",
            "name": "Medication Management"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalTherapy",
            "name": "Psychiatric Evaluation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalTherapy",
            "name": "Telepsychiatry"
          }
        }
      ]
    }
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Psychiatrist Orlando Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Psychiatrist Orlando FL | Board-Certified Psychiatrists | Empathy Health"
        description="Top-rated psychiatrists in Orlando, FL. Same-week appointments for medication management, psychiatric evaluations, ADHD, anxiety, depression treatment. Most insurance accepted. Call 386-848-8751."
        keywords={["psychiatrist orlando", "psychiatrist orlando fl", "orlando psychiatrist", "psychiatrists in orlando fl", "psychiatrist near me orlando", "best psychiatrist orlando", "orlando fl psychiatrist", "psychiatry orlando"]}
        canonicalPath="/psychiatrist-orlando"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Board-Certified Psychiatrists in Orlando, FL
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Expert psychiatric care for adults and adolescents in Orlando. Medication management, psychiatric evaluations, and comprehensive mental health treatment. Same-week appointments available, telehealth options, and most insurance accepted.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              className="bg-green-600 hover:bg-green-700 text-white"
              data-testid="button-hero-cta"
              onClick={() => trackEvent('psychiatrist_orlando_hero_cta', 'conversion', 'Psychiatrist Orlando Page')}
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
                <span>Board-Certified Psychiatrists</span>
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
                    Same-week appointments available
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
                  Expert Psychiatric Care in Orlando, FL
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    When you're struggling with your mental health, finding the right psychiatrist matters. At Empathy Health Clinic, we understand that reaching out for help takes courage - and we're here to support you every step of the way. Our board-certified psychiatrists provide compassionate, evidence-based mental health care for adults and adolescents throughout Orlando, Winter Park, Altamonte Springs, Lake Mary, and Maitland.
                  </p>
                  <p className="text-foreground leading-relaxed mb-4">
                    Whether you're experiencing persistent <Link href="/anxiety-therapy" className="text-primary hover:underline font-medium">anxiety</Link>, overwhelming <Link href="/depression-counseling" className="text-primary hover:underline font-medium">depression</Link>, difficulty with focus and attention (ADHD), mood swings, or other mental health challenges, you don't have to navigate this alone. Our Orlando psychiatrists specialize in medication management, comprehensive psychiatric evaluations, and personalized treatment plans designed around your unique needs and goals.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    We make getting help easier. Same-week appointments are typically available, we accept most major insurance plans, and you can choose between in-person visits at our Winter Park office or secure telepsychiatry appointments from the comfort of your home. Your path to feeling better starts here.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Conditions We Treat in Orlando
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Our Orlando psychiatrists have expertise treating a comprehensive range of mental health conditions:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <ul className="space-y-2 text-foreground">
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Anxiety Disorders</strong> - GAD, panic disorder, social anxiety, phobias</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Depression</strong> - Major depression, persistent depressive disorder</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>ADHD</strong> - Adult and adolescent attention-deficit hyperactivity disorder</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Bipolar Disorder</strong> - Type I, Type II, cyclothymic disorder</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>OCD</strong> - Obsessive-compulsive disorder</span>
                      </li>
                    </ul>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>PTSD & Trauma</strong> - Post-traumatic stress disorder</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Insomnia & Sleep Disorders</strong> - Sleep-related mental health issues</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Eating Disorders</strong> - Anorexia, bulimia, binge eating disorder</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Personality Disorders</strong> - Borderline, avoidant, and others</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Schizophrenia & Psychotic Disorders</strong></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Our Psychiatric Services in Orlando
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Brain className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Medication Management</h3>
                      <p className="text-muted-foreground">
                        Expert psychiatric medication prescribing and monitoring. Our Orlando psychiatrists carefully evaluate your symptoms, medical history, and treatment goals to develop a personalized medication plan. Regular follow-ups ensure optimal results with minimal side effects.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Shield className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Comprehensive Psychiatric Evaluations</h3>
                      <p className="text-muted-foreground">
                        Thorough diagnostic assessments conducted by board-certified psychiatrists. We take the time to understand your symptoms, history, and concerns to provide accurate diagnoses and effective treatment recommendations.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Video className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Telepsychiatry Services</h3>
                      <p className="text-muted-foreground">
                        Convenient online psychiatry appointments from the comfort of your Orlando home. Our HIPAA-compliant telehealth platform provides the same quality psychiatric care as in-person visits, with added convenience and flexibility.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Users className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Integrated Care Coordination</h3>
                      <p className="text-muted-foreground">
                        Collaborative approach working with your therapist, primary care physician, and other providers. We believe in comprehensive mental health care that addresses all aspects of your wellbeing.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* ADHD Psychiatry Section */}
              <section className="bg-primary/5 border rounded-lg p-6">
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  ADHD Psychiatrist in Orlando: Expert Diagnosis & Treatment
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Struggling with focus, organization, or impulsivity? Our Orlando psychiatrists specialize in adult and adolescent <Link href="/adhd-psychiatrist-orlando" className="text-primary hover:underline font-medium">ADHD diagnosis and treatment</Link>. We provide comprehensive ADHD evaluations, medication management (including stimulants like Adderall, Vyvanse, and Ritalin), and ongoing support to help you thrive.
                  </p>
                  <p className="text-foreground leading-relaxed mb-4">
                    ADHD symptoms often include difficulty concentrating, disorganization, procrastination, forgetfulness, restlessness, and impulsive decision-making. If you've struggled with these issues since childhood or recently suspect ADHD might be affecting your work, relationships, or daily life, a psychiatric evaluation can provide clarity and effective treatment options.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <Button size="lg" asChild data-testid="button-adhd-cta">
                      <Link href="/request-appointment" onClick={() => trackEvent('appointment_request', 'conversion', 'Psychiatrist Orlando - ADHD Section')}>
                        Schedule ADHD Evaluation
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild data-testid="button-adhd-call">
                      <a href="tel:3868488751" onClick={handlePhoneClick}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call About ADHD Treatment
                      </a>
                    </Button>
                  </div>
                </div>
              </section>

              {/* Anxiety Treatment Section */}
              <section className="bg-card border rounded-lg p-6">
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Anxiety Psychiatrist Orlando: Comprehensive Anxiety Disorder Treatment
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Living with constant worry, panic attacks, or overwhelming anxiety? Our Orlando psychiatrists provide expert treatment for all types of <Link href="/anxiety-psychiatrist-orlando" className="text-primary hover:underline font-medium">anxiety disorders</Link> including generalized anxiety disorder (GAD), panic disorder, social anxiety, and phobias.
                  </p>
                  <p className="text-foreground leading-relaxed mb-4">
                    We offer evidence-based anxiety treatments including anti-anxiety medications (SSRIs, SNRIs, buspirone, and when appropriate, benzodiazepines), medication management, and coordination with therapists for combined medication and therapy approaches. Many patients experience significant anxiety relief within 4-6 weeks of starting treatment.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm"><strong>Generalized Anxiety Disorder (GAD)</strong> - Persistent worry and tension</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm"><strong>Panic Disorder</strong> - Unexpected panic attacks and fear of future attacks</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm"><strong>Social Anxiety</strong> - Fear of social situations and judgment</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm"><strong>Specific Phobias</strong> - Intense fear of specific objects or situations</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <Button size="lg" asChild data-testid="button-anxiety-cta">
                      <Link href="/request-appointment" onClick={() => trackEvent('appointment_request', 'conversion', 'Psychiatrist Orlando - Anxiety Section')}>
                        Get Anxiety Treatment
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild data-testid="button-anxiety-call">
                      <a href="tel:3868488751" onClick={handlePhoneClick}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call About Anxiety Medication
                      </a>
                    </Button>
                  </div>
                </div>
              </section>

              {/* ESA Letter Section */}
              <section className="bg-primary/5 border rounded-lg p-6">
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Emotional Support Animal (ESA) Letters in Orlando
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Need an ESA letter for housing or travel? Our board-certified psychiatrists can evaluate your mental health condition and provide legitimate Emotional Support Animal (ESA) letters when medically appropriate. ESA letters allow individuals with diagnosed mental health conditions to keep their emotional support animal in no-pet housing and, in some cases, travel with their animal.
                  </p>
                  <p className="text-foreground leading-relaxed mb-4">
                    To qualify for an ESA letter, you must have a diagnosed mental health condition (such as anxiety, depression, PTSD, or other psychiatric disorders) that substantially limits one or more major life activities, and your psychiatrist must determine that an emotional support animal would provide therapeutic benefit. Our psychiatrists conduct thorough evaluations and only provide ESA letters when clinically justified.
                  </p>
                  <div className="bg-card border rounded-lg p-4 mb-4">
                    <p className="text-sm text-muted-foreground mb-2"><strong className="text-foreground">What's Included in Your ESA Letter:</strong></p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex gap-2"><span className="text-primary">•</span> Official letterhead from our licensed psychiatrist</li>
                      <li className="flex gap-2"><span className="text-primary">•</span> Confirmation of your mental health condition requiring an ESA</li>
                      <li className="flex gap-2"><span className="text-primary">•</span> Psychiatrist's license number and contact information</li>
                      <li className="flex gap-2"><span className="text-primary">•</span> Valid for housing accommodation requests under Fair Housing Act</li>
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button size="lg" asChild data-testid="button-esa-cta">
                      <Link href="/request-appointment" onClick={() => trackEvent('appointment_request', 'conversion', 'Psychiatrist Orlando - ESA Section')}>
                        Schedule ESA Evaluation
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild data-testid="button-esa-call">
                      <a href="tel:3868488751" onClick={handlePhoneClick}>
                        <Phone className="h-4 w-4 mr-2" />
                        Ask About ESA Letters
                      </a>
                    </Button>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Why Choose Our Orlando Psychiatrists?
                </h2>
                <div className="prose prose-lg max-w-none">
                  <ul className="space-y-3 text-foreground">
                    <li className="flex gap-3">
                      <Award className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Board-Certified Expertise</strong> - All of our psychiatrists are board-certified by the American Board of Psychiatry and Neurology, ensuring you receive the highest standard of psychiatric care in Orlando.</span>
                    </li>
                    <li className="flex gap-3">
                      <Calendar className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Fast Appointment Access</strong> - Same-week appointments typically available for new patients. We understand that when you need psychiatric help, waiting weeks or months isn't an option.</span>
                    </li>
                    <li className="flex gap-3">
                      <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Personalized Treatment Plans</strong> - We don't believe in one-size-fits-all psychiatry. Your treatment plan is tailored to your unique symptoms, goals, lifestyle, and preferences.</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Most Insurance Accepted</strong> - We accept Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, Humana, and many other major insurance plans serving Orlando residents.</span>
                    </li>
                    <li className="flex gap-3">
                      <Video className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>In-Person & Telehealth Options</strong> - Choose the appointment type that works best for your schedule and preferences. Both options provide the same high-quality psychiatric care.</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  What to Expect at Your First Appointment
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Your first appointment with one of our Orlando psychiatrists typically lasts 45-60 minutes. During this comprehensive psychiatric evaluation, your psychiatrist will:
                  </p>
                  <ul className="space-y-2 text-foreground mb-4">
                    <li className="flex gap-2"><span className="text-primary">•</span> Review your symptoms, medical history, and mental health history</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> Discuss your treatment goals and preferences</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> Conduct a thorough diagnostic assessment</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> Provide a diagnosis and explain your condition</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> Develop a personalized treatment plan</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> Answer all your questions about medications, side effects, and treatment options</li>
                  </ul>
                  <p className="text-foreground leading-relaxed">
                    Follow-up medication management appointments are typically 20-30 minutes and occur monthly or as needed based on your treatment progress.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">How quickly can I see a psychiatrist in Orlando?</h3>
                    <p className="text-muted-foreground">
                      We typically offer same-week appointments for new patients. Call us at 386-848-8751 and our scheduling team will find the earliest available appointment with one of our Orlando psychiatrists.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Do I need a referral to see a psychiatrist?</h3>
                    <p className="text-muted-foreground">
                      No referral is required. You can schedule directly with our office. However, some insurance plans may require a referral for coverage, so it's worth checking with your insurance provider.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">What insurance plans do you accept in Orlando?</h3>
                    <p className="text-muted-foreground">
                      We accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, Humana, and more. Contact our office to verify coverage for your specific plan.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">What's the difference between a psychiatrist and a therapist?</h3>
                    <p className="text-muted-foreground">
                      Psychiatrists are medical doctors (MD or DO) who can prescribe medications and provide medical treatment for mental health conditions. Therapists provide counseling and psychotherapy but cannot prescribe medications. Many patients benefit from seeing both - a psychiatrist for medication management and a therapist for talk therapy.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Do you offer telehealth appointments in Orlando?</h3>
                    <p className="text-muted-foreground">
                      Yes! We offer secure, HIPAA-compliant telepsychiatry appointments for Orlando residents. This allows you to meet with your psychiatrist from home via video call while receiving the same quality care as in-person visits.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Can you prescribe controlled substances for ADHD or anxiety?</h3>
                    <p className="text-muted-foreground">
                      Yes, our board-certified psychiatrists can prescribe controlled substances when medically appropriate, including stimulant medications for ADHD and benzodiazepines for anxiety. All prescribing follows strict medical guidelines and Florida state regulations.
                    </p>
                  </div>
                </div>
              </section>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Schedule an Appointment</h3>
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
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-muted-foreground">
                        Accepting new patients
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-3">Related Services</h3>
                  <div className="space-y-2">
                    <Link href="/adhd-psychiatrist-orlando" className="block text-sm text-primary hover:underline">
                      ADHD Psychiatrist Orlando
                    </Link>
                    <Link href="/anxiety-psychiatrist-orlando" className="block text-sm text-primary hover:underline">
                      Anxiety Psychiatrist Orlando
                    </Link>
                    <Link href="/child-psychiatrist-orlando" className="block text-sm text-primary hover:underline">
                      Child Psychiatrist Orlando
                    </Link>
                    <Link href="/telepsychiatry-orlando" className="block text-sm text-primary hover:underline">
                      Telepsychiatry Orlando
                    </Link>
                    <Link href="/medication-management-orlando" className="block text-sm text-primary hover:underline">
                      Medication Management Orlando
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
                Schedule Your Psychiatry Appointment in Orlando
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
