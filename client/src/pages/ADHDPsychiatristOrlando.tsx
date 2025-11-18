import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, MapPin, Phone, Clock, Star, CheckCircle, Brain, Shield, Calendar, Users, Video, Award, Focus } from "lucide-react";
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

export default function ADHDPsychiatristOrlando() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "Empathy Health Clinic - ADHD Psychiatrist Orlando FL",
    "description": "Board-certified ADHD psychiatrists in Orlando, FL specializing in adult and child ADHD diagnosis, medication management, and comprehensive treatment. Same-week appointments available.",
    "url": "https://empathyhealthclinic.com/adhd-psychiatrist-orlando",
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
    "medicalSpecialty": "Psychiatry - ADHD Specialist"
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'ADHD Psychiatrist Orlando Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="ADHD Psychiatrist Orlando FL | Adult & Child ADHD Specialists"
        description="Top-rated ADHD psychiatrists in Orlando, FL. Expert diagnosis, medication management, and comprehensive ADHD treatment for adults and children. Same-week appointments. Call 386-848-8751."
        keywords={["adhd psychiatrist orlando", "adhd doctor orlando", "adhd psychiatrist orlando fl", "orlando adhd psychiatrist", "adult adhd orlando", "child adhd orlando fl", "adhd specialist orlando", "add doctor orlando"]}
        canonicalPath="/adhd-psychiatrist-orlando"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            ADHD Psychiatrists in Orlando, FL
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Board-certified psychiatrists specializing in ADHD diagnosis and treatment for adults, adolescents, and children in Orlando. Expert medication management, comprehensive evaluations, and personalized care plans.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              className="bg-green-600 hover:bg-green-700 text-white"
              data-testid="button-hero-cta"
              onClick={() => trackEvent('adhd_psychiatrist_orlando_hero_cta', 'conversion', 'ADHD Psychiatrist Orlando Page')}
            >
              <a href="#contact-form">Request ADHD Evaluation</a>
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
                <span>ADHD Specialists</span>
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
                    Same-week ADHD evaluations
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
                    Accepting new ADHD patients
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
                  Expert ADHD Treatment in Orlando, FL
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    ADHD (Attention-Deficit/Hyperactivity Disorder) affects millions of adults and children, impacting focus, organization, time management, and daily functioning. At our <Link href="/psychiatry-clinic-orlando" className="text-primary hover:underline font-medium">Orlando psychiatry clinic</Link>, our board-certified psychiatrists specialize in comprehensive ADHD diagnosis, medication management, and treatment for patients of all ages.
                  </p>
                  <p className="text-foreground leading-relaxed mb-4">
                    Our ADHD specialists understand that every person's experience with ADHD is unique. Whether you're an adult seeking an ADHD evaluation for the first time, a parent concerned about your child's focus and behavior, or someone already diagnosed seeking better medication management, our Orlando psychiatrists provide personalized, evidence-based care.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    We accept most major insurance plans and offer both in-person appointments at our Winter Park office (convenient to Orlando, Lake Mary, Altamonte Springs, and Maitland) and secure telepsychiatry options. Same-week appointments are typically available.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Our ADHD Services in Orlando
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Brain className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Comprehensive ADHD Evaluations</h3>
                      <p className="text-muted-foreground">
                        Thorough diagnostic assessments using validated rating scales, clinical interviews, and symptom history review. We evaluate for both inattentive and hyperactive-impulsive presentations, as well as combined type ADHD.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Shield className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">ADHD Medication Management</h3>
                      <p className="text-muted-foreground">
                        Expert prescribing and monitoring of ADHD medications including stimulants (Adderall, Vyvanse, Ritalin, Concerta) and non-stimulants (Strattera, Intuniv, Qelbree). Regular follow-ups to optimize dosing and manage side effects.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Users className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Adult ADHD Diagnosis & Treatment</h3>
                      <p className="text-muted-foreground">
                        Many adults with ADHD were never diagnosed as children. Our psychiatrists specialize in adult ADHD evaluations, helping you understand symptoms and develop effective treatment strategies for work, relationships, and daily life.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Calendar className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Child & Adolescent ADHD Care</h3>
                      <p className="text-muted-foreground">
                        Comprehensive ADHD evaluations and treatment for children and teenagers. We work closely with parents, schools, and other providers to support your child's academic success and emotional wellbeing.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Common ADHD Symptoms We Treat
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    ADHD symptoms vary by age and individual, but common signs include:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Inattentive Symptoms:</h3>
                      <ul className="space-y-2 text-foreground">
                        <li className="flex gap-2"><span className="text-primary">•</span> Difficulty sustaining attention</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Frequent careless mistakes</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Trouble organizing tasks</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Easily distracted</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Forgetfulness in daily activities</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Losing important items</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Hyperactive-Impulsive Symptoms:</h3>
                      <ul className="space-y-2 text-foreground">
                        <li className="flex gap-2"><span className="text-primary">•</span> Fidgeting or restlessness</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Difficulty staying seated</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Excessive talking</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Interrupting others</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Difficulty waiting turn</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Acting without thinking</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Why Choose Our ADHD Psychiatrists in Orlando?
                </h2>
                <div className="prose prose-lg max-w-none">
                  <ul className="space-y-3 text-foreground">
                    <li className="flex gap-3">
                      <Award className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>ADHD Expertise</strong> - Our board-certified psychiatrists have extensive experience diagnosing and treating ADHD in adults, adolescents, and children. We stay current on the latest ADHD research and treatment approaches.</span>
                    </li>
                    <li className="flex gap-3">
                      <Calendar className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Fast Access to Care</strong> - Same-week appointments available for ADHD evaluations and medication management. We understand that when ADHD symptoms are impacting your life or your child's education, waiting isn't an option.</span>
                    </li>
                    <li className="flex gap-3">
                      <Brain className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Comprehensive Evaluations</strong> - Thorough diagnostic process including symptom rating scales, clinical interview, developmental history, and ruling out other conditions that can mimic ADHD.</span>
                    </li>
                    <li className="flex gap-3">
                      <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Medication Expertise</strong> - Experience with all ADHD medications including stimulants and non-stimulants. We find the right medication and dosage for your needs while minimizing side effects.</span>
                    </li>
                    <li className="flex gap-3">
                      <Users className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Collaborative Care</strong> - For children, we coordinate with schools and therapists. For adults, we work with your other healthcare providers to ensure comprehensive treatment.</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  ADHD Medications We Prescribe
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Our Orlando ADHD psychiatrists prescribe a range of FDA-approved medications:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-card p-4 rounded-lg border">
                      <h3 className="font-semibold text-foreground mb-2">Stimulant Medications:</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li>• Adderall / Adderall XR</li>
                        <li>• Vyvanse</li>
                        <li>• Ritalin / Concerta</li>
                        <li>• Focalin / Focalin XR</li>
                        <li>• Dexedrine</li>
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                      <h3 className="font-semibold text-foreground mb-2">Non-Stimulant Medications:</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li>• Strattera (atomoxetine)</li>
                        <li>• Intuniv (guanfacine)</li>
                        <li>• Kapvay (clonidine)</li>
                        <li>• Qelbree (viloxazine)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">How do I know if I or my child has ADHD?</h3>
                    <p className="text-muted-foreground">
                      ADHD is diagnosed through a comprehensive evaluation that includes symptom rating scales, clinical interview, developmental history, and ruling out other conditions. Our psychiatrists will conduct a thorough assessment during your appointment.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Can adults be diagnosed with ADHD?</h3>
                    <p className="text-muted-foreground">
                      Absolutely. Many adults with ADHD were never diagnosed as children. Symptoms may include chronic disorganization, difficulty completing tasks, forgetfulness, and problems with time management. Adult ADHD is very treatable.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Are ADHD medications safe?</h3>
                    <p className="text-muted-foreground">
                      ADHD medications have been extensively studied and used safely for decades when prescribed and monitored by a qualified psychiatrist. We carefully evaluate your health history, monitor for side effects, and adjust dosing to maximize benefits while minimizing risks.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Do you prescribe Adderall and other controlled substances?</h3>
                    <p className="text-muted-foreground">
                      Yes, our board-certified psychiatrists can prescribe stimulant medications including Adderall, Vyvanse, Ritalin, and Concerta when medically appropriate. All prescribing follows strict medical guidelines and Florida state regulations.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">How quickly can I see an ADHD psychiatrist in Orlando?</h3>
                    <p className="text-muted-foreground">
                      We typically offer same-week appointments for new ADHD evaluations. Call 386-848-8751 and our scheduling team will find the earliest available appointment.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Do you accept insurance for ADHD treatment?</h3>
                    <p className="text-muted-foreground">
                      Yes, we accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, and Humana. Contact our office to verify coverage for your specific plan.
                    </p>
                  </div>
                </div>
              </section>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Schedule ADHD Evaluation</h3>
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
                    <Link href="/child-psychiatrist-orlando" className="block text-sm text-primary hover:underline">
                      Child Psychiatrist Orlando
                    </Link>
                    <Link href="/anxiety-psychiatrist-orlando" className="block text-sm text-primary hover:underline">
                      Anxiety Psychiatrist Orlando
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
                Schedule Your ADHD Evaluation in Orlando
              </h2>
              <p className="text-lg text-muted-foreground">
                Same-week appointments for new patients. Most insurance accepted.
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
