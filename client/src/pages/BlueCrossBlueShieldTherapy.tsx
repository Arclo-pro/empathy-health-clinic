import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, MapPin, Phone, Clock, Star, CheckCircle, Shield, Calendar, Users, DollarSign } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import HeroBackground from "@/components/HeroBackground";
import ShortContactForm from "@/components/ShortContactForm";
const heroImage = "/site-assets/stock_images/professional_healthc_955227e9.jpg";
import { trackEvent } from "@/lib/analytics";

export default function BlueCrossBlueShieldTherapy() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness"],
    "name": "Empathy Health Clinic - Blue Cross Blue Shield Therapy Orlando",
    "description": "Find BCBS-covered therapists in Orlando, FL. Blue Cross Blue Shield therapy services including individual counseling, family therapy, and mental health treatment. Verify coverage and copays.",
    "url": "https://empathyhealthclinic.com/blue-cross-blue-shield-therapy-orlando",
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
      { "@type": "City", "name": "Winter Park" }
    ],
    "paymentAccepted": "Blue Cross Blue Shield Insurance"
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'BCBS Therapy Orlando Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="BCBS Therapy Orlando | Blue Cross Therapists"
        description="Find Blue Cross Blue Shield therapists in Orlando, FL. BCBS-covered therapy for anxiety, depression, trauma. Verify copays and coverage. Same-week appointments. Call 386-848-8751."
        keywords={["blue cross blue shield therapy orlando", "bcbs therapist orlando", "therapist that takes blue cross blue shield orlando", "blue cross blue shield counseling orlando", "bcbs therapy near me"]}
        canonicalPath="/blue-cross-blue-shield-therapy-orlando"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Blue Cross Blue Shield Therapy in Orlando
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Find BCBS-covered therapists in Orlando. We accept all Blue Cross Blue Shield plans. Professional therapy for anxiety, depression, trauma, and more. Verify your coverage and copay. Same-week appointments available.
          </p>
          <div className="flex flex-wrap gap-4" data-testid="hero-cta-cluster">
            <Button 
              size="lg" 
              asChild 
              data-testid="button-hero-cta"
              onClick={() => trackEvent('bcbs_therapy_hero_cta', 'conversion', 'BCBS Therapy Orlando Page')}
            >
              <a href="#contact-form">Request Appointment</a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="bg-background/20 backdrop-blur-sm border-white/30 text-white"
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
              <div className="flex items-center gap-2" data-testid="benefit-google-reviews">
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
              <div className="flex items-center gap-2 text-sm text-foreground" data-testid="benefit-bcbs-plans">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>All BCBS Plans Accepted</span>
              </div>
              <div className="hidden lg:block h-6 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm text-foreground" data-testid="benefit-same-week">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Same-Week Appointments</span>
              </div>
            </div>
          </div>
        </section>

        {/* BCBS Logo & Coverage Banner */}
        <section className="py-8 bg-primary/5 border-y">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-6">
              <div className="inline-block bg-white rounded-lg p-6 shadow-sm mb-4">
                <div className="text-4xl font-bold text-blue-700">BCBS</div>
                <div className="text-sm text-muted-foreground mt-1">Blue Cross Blue Shield</div>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">We Accept All BCBS Plans</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Whether you have Blue Cross Blue Shield PPO, HMO, Blue Choice, or Blue Advantage, our therapists are in-network with all BCBS plans serving Orlando residents.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              
              <section>
                <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                  BCBS-Covered Therapists in Orlando
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Looking for a therapist covered by your Blue Cross Blue Shield insurance in Orlando? Empathy Health Clinic is an in-network provider with all BCBS plans, making quality mental health care accessible and affordable for Orlando residents with Blue Cross Blue Shield coverage.
                  </p>
                  <p className="text-foreground leading-relaxed mb-4">
                    Our licensed therapists (LCSWs, LMHCs, and LMFTs) provide evidence-based therapy for anxiety, depression, trauma, relationship issues, and more. We handle all insurance verification and billing, so you only pay your BCBS copay or coinsurance - no surprise bills.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    Same-week appointments available for new BCBS patients. Both in-person therapy at our Winter Park office and telehealth therapy options available throughout Florida.
                  </p>
                </div>
              </section>

              {/* Therapists Covered by BCBS */}
              <section className="bg-card border rounded-lg p-6">
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Our BCBS-Covered Therapists
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground mb-4">
                    All of our licensed therapists accept Blue Cross Blue Shield insurance and are credentialed with BCBS as in-network providers:
                  </p>
                  <div className="space-y-3">
                    <div className="flex gap-3" data-testid="card-credential-lcsw">
                      <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Licensed Clinical Social Workers (LCSW)</h3>
                        <p className="text-sm text-muted-foreground">
                          Master's-level therapists specializing in individual therapy, family therapy, and evidence-based treatments for anxiety, depression, and trauma.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3" data-testid="card-credential-lmhc">
                      <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Licensed Mental Health Counselors (LMHC)</h3>
                        <p className="text-sm text-muted-foreground">
                          Professional counselors providing CBT, DBT, and solution-focused therapy for adults, teens, and couples.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3" data-testid="card-credential-lmft">
                      <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Licensed Marriage & Family Therapists (LMFT)</h3>
                        <p className="text-sm text-muted-foreground">
                          Specialists in couples therapy, family counseling, and relationship issues - all covered by BCBS when medically necessary.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Services Covered by BCBS */}
              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Therapy Services Covered by Blue Cross Blue Shield
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-primary/5 border rounded-lg p-4" data-testid="card-service-individual">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      Individual Therapy
                    </h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Anxiety & panic disorder treatment</li>
                      <li>• Depression counseling</li>
                      <li>• Trauma & PTSD therapy (EMDR)</li>
                      <li>• Stress management</li>
                      <li>• Life transitions & adjustment</li>
                    </ul>
                  </div>

                  <div className="bg-primary/5 border rounded-lg p-4" data-testid="card-service-family">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      Family & Couples Therapy
                    </h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Marriage counseling</li>
                      <li>• Family therapy</li>
                      <li>• Parent-child relationship issues</li>
                      <li>• Couples conflict resolution</li>
                      <li>• Premarital counseling</li>
                    </ul>
                  </div>

                  <div className="bg-primary/5 border rounded-lg p-4" data-testid="card-service-specialized">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      Specialized Therapy
                    </h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Cognitive Behavioral Therapy (CBT)</li>
                      <li>• Dialectical Behavior Therapy (DBT)</li>
                      <li>• EMDR for trauma</li>
                      <li>• Grief & loss counseling</li>
                      <li>• Substance abuse counseling</li>
                    </ul>
                  </div>

                  <div className="bg-primary/5 border rounded-lg p-4" data-testid="card-service-telehealth">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      Telehealth Therapy
                    </h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Online therapy sessions</li>
                      <li>• HIPAA-compliant video platform</li>
                      <li>• Same BCBS coverage as in-person</li>
                      <li>• Convenient for busy schedules</li>
                      <li>• Available throughout Florida</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* BCBS Copays & Coverage */}
              <section className="bg-card border rounded-lg p-6">
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  What Blue Cross Blue Shield Pays for Therapy
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Blue Cross Blue Shield typically covers mental health therapy services, but your out-of-pocket costs depend on your specific BCBS plan. Here's what to expect:
                  </p>
                  
                  <div className="bg-primary/5 border rounded-lg p-4 mb-4">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      Typical BCBS Patient Costs
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center" data-testid="row-copay-ppo">
                        <span className="text-muted-foreground">BCBS PPO Copay:</span>
                        <span className="font-semibold text-foreground">$20 - $50 per session</span>
                      </div>
                      <div className="flex justify-between items-center" data-testid="row-copay-hmo">
                        <span className="text-muted-foreground">BCBS HMO Copay:</span>
                        <span className="font-semibold text-foreground">$10 - $30 per session</span>
                      </div>
                      <div className="flex justify-between items-center" data-testid="row-copay-hdhp">
                        <span className="text-muted-foreground">BCBS High Deductible Plans:</span>
                        <span className="font-semibold text-foreground">Deductible applies, then coinsurance</span>
                      </div>
                      <div className="flex justify-between items-center" data-testid="row-copay-sessions">
                        <span className="text-muted-foreground">Sessions Covered:</span>
                        <span className="font-semibold text-foreground">Typically 20-30 sessions/year</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <p className="text-sm text-foreground">
                      <strong>Important:</strong> Copays and coverage vary by BCBS plan. We'll verify your specific benefits before your first appointment and let you know your exact copay amount. Call us at 386-848-8751 for a free insurance verification.
                    </p>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">What BCBS Covers:</h3>
                  <ul className="space-y-2 text-foreground">
                    <li className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Individual therapy sessions (typically 45-60 minutes)</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Family therapy and couples counseling when medically necessary</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Telehealth therapy (same coverage as in-person)</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Evidence-based treatments like CBT, DBT, and EMDR</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Treatment for diagnosed mental health conditions</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* How to Use Your BCBS Coverage */}
              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  How to Use Your BCBS Coverage for Therapy
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4" data-testid="step-coverage-01">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Call to Schedule</h3>
                      <p className="text-muted-foreground text-sm">
                        Contact us at 386-848-8751. Let us know you have Blue Cross Blue Shield insurance. We'll check if you need a referral (most BCBS plans don't require one for therapy).
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4" data-testid="step-coverage-02">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Insurance Verification</h3>
                      <p className="text-muted-foreground text-sm">
                        We'll verify your BCBS benefits before your first appointment and tell you your exact copay, deductible status, and number of covered sessions.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4" data-testid="step-coverage-03">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Attend Your Session</h3>
                      <p className="text-muted-foreground text-sm">
                        Come to your therapy appointment (in-person or telehealth). Bring your BCBS insurance card and photo ID. Pay only your copay at time of service.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4" data-testid="step-coverage-04">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">We Handle Billing</h3>
                      <p className="text-muted-foreground text-sm">
                        We file all claims with BCBS directly. You'll receive an Explanation of Benefits (EOB) from BCBS showing what they paid. No surprise bills - you only pay your copay.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div data-testid="faq-item-01">
                    <h3 className="font-semibold text-foreground mb-2">Do you accept all Blue Cross Blue Shield plans?</h3>
                    <p className="text-muted-foreground">
                      Yes! We're in-network with all Blue Cross Blue Shield plans, including BCBS PPO, HMO, Blue Choice, Blue Advantage, and BCBS Federal Employee Program (FEP). We also accept BCBS plans from other states for telehealth therapy.
                    </p>
                  </div>
                  <div data-testid="faq-item-02">
                    <h3 className="font-semibold text-foreground mb-2">Do I need a referral from my doctor?</h3>
                    <p className="text-muted-foreground">
                      Most BCBS plans do not require a referral for therapy. However, some HMO plans may require one. We'll check your specific plan requirements when you call to schedule.
                    </p>
                  </div>
                  <div data-testid="faq-item-03">
                    <h3 className="font-semibold text-foreground mb-2">How do I find out my BCBS copay?</h3>
                    <p className="text-muted-foreground">
                      Call us at 386-848-8751 with your BCBS member ID, and we'll verify your benefits and tell you your exact copay before your first appointment. You can also check your BCBS insurance card or call the number on the back.
                    </p>
                  </div>
                  <div data-testid="faq-item-04">
                    <h3 className="font-semibold text-foreground mb-2">Does BCBS cover telehealth therapy?</h3>
                    <p className="text-muted-foreground">
                      Yes! Blue Cross Blue Shield covers telehealth therapy sessions at the same rate as in-person visits. You'll pay the same copay whether you choose in-person or online therapy.
                    </p>
                  </div>
                  <div data-testid="faq-item-05">
                    <h3 className="font-semibold text-foreground mb-2">How many therapy sessions does BCBS cover?</h3>
                    <p className="text-muted-foreground">
                      BCBS typically covers 20-30 outpatient therapy sessions per year, though some plans offer more. We'll verify your specific session limit when we check your benefits.
                    </p>
                  </div>
                </div>
              </section>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Verify Your BCBS Coverage</h3>
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
                      <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-muted-foreground">
                        All BCBS plans accepted
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-muted-foreground">
                        Free insurance verification
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-muted-foreground">
                        Same-week appointments
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-3">Other Insurance Pages</h3>
                  <div className="space-y-2">
                    <Link href="/insurance" className="block text-sm text-primary hover:underline">
                      All Insurance Plans
                    </Link>
                    <Link href="/medicare-therapy-orlando" className="block text-sm text-primary hover:underline">
                      Medicare Therapy
                    </Link>
                    <Link href="/therapist-accepts-umr" className="block text-sm text-primary hover:underline">
                      UMR Insurance Therapy
                    </Link>
                    <Link href="/therapy" className="block text-sm text-primary hover:underline">
                      Therapy Services
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
                Schedule BCBS-Covered Therapy
              </h2>
              <p className="text-lg text-muted-foreground">
                We'll verify your Blue Cross Blue Shield benefits and schedule your first appointment.
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
