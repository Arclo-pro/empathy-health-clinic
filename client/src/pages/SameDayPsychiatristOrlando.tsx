import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, MapPin, Phone, Clock, Star, CheckCircle, Brain, Shield, Calendar, Users, Video, Award, Zap } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import HeroBackground from "@/components/HeroBackground";
import ShortContactForm from "@/components/ShortContactForm";
const heroImage = "/site-assets/stock_images/professional_healthc_955227e9.webp";
import { trackEvent } from "@/lib/analytics";

export default function SameDayPsychiatristOrlando() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "@id": "https://www.empathyhealthclinic.com/same-day-psychiatrist-orlando#organization",
    "name": "Empathy Health Clinic - Same Day Psychiatrist Orlando FL",
    "parentOrganization": {
      "@id": "https://www.empathyhealthclinic.com/#organization"
    },
    "description": "Same-day psychiatrist appointments in Orlando, FL. Urgent psychiatric care for depression, anxiety, panic attacks, medication management. Board-certified psychiatrists available today.",
    "url": "https://www.empathyhealthclinic.com/same-day-psychiatrist-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Orlando",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.59544,
      "longitude": -81.36537
    },
    "areaServed": [
      { "@type": "City", "name": "Orlando" },
      { "@type": "City", "name": "Winter Park" },
      { "@type": "City", "name": "Altamonte Springs" },
      { "@type": "City", "name": "Lake Mary" },
      { "@type": "City", "name": "Maitland" }
    ],
    "medicalSpecialty": "Urgent Psychiatry - Same-Day Appointments"
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Same Day Psychiatrist Orlando Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Same Day Psychiatrist Orlando FL | Urgent Psychiatric Care Today"
        description="Same-day psychiatrist appointments in Orlando, FL. Board-certified psychiatrists available today for urgent mental health care, medication management, panic attacks, crisis. Call 386-848-8751."
        keywords={["same day psychiatrist orlando", "urgent psychiatrist orlando", "psychiatrist today orlando", "same day psychiatric appointment orlando", "walk in psychiatrist orlando", "emergency psychiatrist orlando", "psychiatrist same day orlando fl"]}
        canonicalPath="/same-day-psychiatrist-orlando"
        jsonLd={jsonLd}
        preloadImage={heroImage}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Same-Day Psychiatrist Orlando
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Need to see a psychiatrist today in Orlando? Board-certified psychiatrists available for urgent same-day appointments. Fast access to psychiatric care for depression, anxiety, panic attacks, medication management, and mental health crises.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              className=""
              data-testid="button-hero-cta"
              onClick={() => trackEvent('same_day_psychiatrist_orlando_hero_cta', 'conversion', 'Same Day Psychiatrist Orlando Page')}
            >
              <a href="tel:386-848-8751">Call for Same-Day Appointment</a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="bg-background/20 backdrop-blur-sm border-white/30 text-white hover:bg-background/30"
              data-testid="button-hero-phone"
              onClick={handlePhoneClick}
            >
              <a href="#contact-form">Request Urgent Appointment</a>
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
                <span>Same-Day Appointments</span>
              </div>
              <div className="hidden lg:block h-6 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Urgent Care Available</span>
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
                  <h3 className="font-semibold text-foreground mb-1">Call for Same-Day Appointment</h3>
                  <a 
                    href="tel:386-848-8751" 
                    className="text-lg font-bold text-primary hover:underline"
                    data-testid="link-phone"
                    onClick={handlePhoneClick}
                  >
                    386-848-8751
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Urgent appointments available today
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
                    Same-day slots available
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
                  Urgent Same-Day Psychiatric Care in Orlando
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    When you're experiencing a mental health crisis or urgent psychiatric symptoms, waiting weeks to see a psychiatrist isn't an option. At our <Link href="/psychiatrist-orlando" className="text-primary hover:underline font-medium">mental health clinic in Orlando</Link>, we understand that mental health emergencies require prompt attention. That's why we offer same-day psychiatrist appointments for Orlando residents who need urgent psychiatric care.
                  </p>
                  <p className="text-foreground leading-relaxed mb-4">
                    Our board-certified psychiatrists provide same-day appointments for severe depression, panic attacks, anxiety crises, medication emergencies, suicidal thoughts (but call 988 for imminent risk), acute mood episodes, ADHD medication concerns, and other urgent psychiatric needs. Whether you need a same-day evaluation, urgent medication adjustment, or crisis intervention, our Orlando psychiatrists are here to help you get the immediate care you need.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    We accept most major insurance plans for urgent psychiatric appointments and offer both in-person same-day visits at our Winter Park office (convenient to Orlando, Lake Mary, Altamonte Springs, and Maitland) and urgent telepsychiatry appointments for faster access. Call us today at 386-848-8751 to schedule your same-day psychiatrist appointment in Orlando.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  When to Seek Same-Day Psychiatric Care
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Consider calling for a same-day psychiatrist appointment if you're experiencing:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <ul className="space-y-2 text-foreground">
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Severe Depression:</strong> Worsening depressive symptoms, inability to function, thoughts of self-harm</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Panic Attacks:</strong> Frequent or severe panic attacks interfering with daily life</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Anxiety Crisis:</strong> Overwhelming anxiety that's become unmanageable</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Medication Problems:</strong> Severe side effects, medication not working, ran out of essential psychiatric medications</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Mood Episodes:</strong> Acute manic or depressive episodes in bipolar disorder</span>
                      </li>
                    </ul>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Suicidal Thoughts:</strong> New or worsening thoughts of suicide (call 988 for crisis intervention)</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>ADHD Crisis:</strong> Urgent need for ADHD medication evaluation or refill</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Sleep Crisis:</strong> Severe insomnia affecting your functioning and wellbeing</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Acute Psychosis:</strong> New hallucinations, delusions, or disorganized thinking</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Rapid Deterioration:</strong> Quick worsening of any psychiatric condition</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    <strong>Important:</strong> If you're in immediate danger or having thoughts of harming yourself or others, call 911 or go to your nearest emergency room. For suicide crisis support, call or text 988 (Suicide & Crisis Lifeline).
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Our Same-Day Psychiatry Services
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Zap className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Urgent Psychiatric Evaluations</h3>
                      <p className="text-muted-foreground">
                        Same-day comprehensive psychiatric assessments for Orlando residents experiencing mental health crises or urgent psychiatric symptoms. We evaluate your current symptoms, assess risk, review psychiatric history, and develop an immediate treatment plan to address your urgent needs.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Shield className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Emergency Medication Management</h3>
                      <p className="text-muted-foreground">
                        Urgent medication prescribing, adjustments, or changes when you're having a psychiatric emergency. Whether your current medications aren't working, you're experiencing severe side effects, or you've run out of essential psychiatric medications, we provide same-day medication solutions.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Video className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Urgent Telepsychiatry Appointments</h3>
                      <p className="text-muted-foreground">
                        Virtual same-day psychiatrist appointments for even faster access. If you can't make it to our office, we can often see you the same day via secure video call. Perfect when you're too anxious to leave home or need immediate care but can't travel.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Brain className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Crisis Intervention & Safety Planning</h3>
                      <p className="text-muted-foreground">
                        Immediate psychiatric intervention for mental health crises. We help stabilize acute symptoms, develop safety plans, provide crisis resources, and determine if higher level of care (such as intensive outpatient or inpatient treatment) is needed.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  How to Get a Same-Day Psychiatrist Appointment in Orlando
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Getting urgent psychiatric care is simple:
                  </p>
                  <ol className="space-y-2 text-foreground mb-4">
                    <li className="flex gap-2"><span className="text-primary font-semibold">1.</span> <span><strong>Call Our Office:</strong> Contact us at 386-848-8751 and let our team know you need a same-day appointment</span></li>
                    <li className="flex gap-2"><span className="text-primary font-semibold">2.</span> <span><strong>Describe Your Situation:</strong> Briefly explain your urgent psychiatric needs so we can triage appropriately</span></li>
                    <li className="flex gap-2"><span className="text-primary font-semibold">3.</span> <span><strong>Choose Appointment Type:</strong> Select in-person (at our Winter Park office near Orlando) or virtual telepsychiatry appointment</span></li>
                    <li className="flex gap-2"><span className="text-primary font-semibold">4.</span> <span><strong>Same-Day Appointment:</strong> We'll schedule you with one of our board-certified psychiatrists the same day when possible</span></li>
                    <li className="flex gap-2"><span className="text-primary font-semibold">5.</span> <span><strong>Get Immediate Help:</strong> Meet with your psychiatrist, receive evaluation, get prescriptions if needed, and develop a treatment plan</span></li>
                  </ol>
                  <p className="text-foreground leading-relaxed">
                    While we make every effort to accommodate same-day requests, availability depends on demand. Call as early in the day as possible for best same-day availability. Virtual telepsychiatry appointments often have more same-day availability than in-person visits.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Why Choose Our Same-Day Psychiatry Services?
                </h2>
                <div className="prose prose-lg max-w-none">
                  <ul className="space-y-3 text-foreground">
                    <li className="flex gap-3">
                      <Award className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Board-Certified Psychiatrists</strong> - Urgent care provided by board-certified psychiatrists, not nurse practitioners or physician assistants. You receive expert psychiatric care even for same-day appointments.</span>
                    </li>
                    <li className="flex gap-3">
                      <Zap className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Fast Access When You Need It</strong> - We understand that mental health crises can't wait. We prioritize urgent cases and make same-day appointments available for Orlando residents experiencing psychiatric emergencies.</span>
                    </li>
                    <li className="flex gap-3">
                      <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Full Prescribing Authority</strong> - Our psychiatrists can prescribe all psychiatric medications including controlled substances during same-day appointments when medically appropriate. Emergency prescriptions sent electronically to your Orlando pharmacy.</span>
                    </li>
                    <li className="flex gap-3">
                      <Video className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>In-Person or Virtual Options</strong> - Choose between same-day in-person appointments at our Winter Park office or urgent telepsychiatry appointments for even faster access to care.</span>
                    </li>
                    <li className="flex gap-3">
                      <Users className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Continuity of Care</strong> - After your urgent same-day appointment, we provide ongoing psychiatric follow-up to ensure your mental health stabilizes and you continue to improve.</span>
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
                    <h3 className="font-semibold text-foreground mb-2">Can I really see a psychiatrist the same day in Orlando?</h3>
                    <p className="text-muted-foreground">
                      Yes! We reserve appointment slots specifically for urgent same-day cases. While same-day availability isn't guaranteed every day, we make every effort to see urgent patients within 24 hours. Call 386-848-8751 as early in the day as possible for best same-day availability.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">What qualifies as urgent enough for a same-day psychiatrist appointment?</h3>
                    <p className="text-muted-foreground">
                      Common urgent situations include: severe worsening of depression or anxiety, new suicidal thoughts, panic attacks that are overwhelming, medication emergencies (severe side effects or ran out), acute mood episodes in bipolar disorder, or any psychiatric symptom that's significantly impacting your safety or functioning.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Will insurance cover a same-day psychiatrist appointment?</h3>
                    <p className="text-muted-foreground">
                      Yes, most insurance plans cover urgent psychiatric appointments the same way they cover regularly scheduled appointments. We accept Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, Humana, and many other insurance plans. Your same-day appointment will be billed as a standard psychiatric evaluation or medication management visit.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Can you prescribe medications during a same-day appointment?</h3>
                    <p className="text-muted-foreground">
                      Absolutely. Our board-certified psychiatrists can prescribe all psychiatric medications including antidepressants, anti-anxiety medications, ADHD medications, mood stabilizers, and antipsychotics during same-day appointments when medically appropriate. Prescriptions are sent electronically to your Orlando pharmacy for immediate pickup.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Is telepsychiatry faster for same-day appointments?</h3>
                    <p className="text-muted-foreground">
                      Often yes. Virtual telepsychiatry appointments typically have more same-day availability because there's no commute time and scheduling is more flexible. If you need to be seen urgently, telepsychiatry is often the fastest option for same-day psychiatric care in Orlando.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">What if I'm having a true psychiatric emergency?</h3>
                    <p className="text-muted-foreground">
                      If you're in immediate danger, having thoughts of harming yourself or others, or experiencing a severe psychiatric emergency, call 911 or go to your nearest emergency room. For suicide crisis support, call or text 988. Our same-day appointments are for urgent but non-emergency psychiatric needs.
                    </p>
                  </div>
                </div>
              </section>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Get Same-Day Appointment</h3>
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
                        Call 386-848-8751 Now
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      size="lg"
                      asChild
                      data-testid="button-sidebar-appointment"
                    >
                      <Link href="/request-appointment">Request Urgent Appointment</Link>
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
                    <Link href="/psychiatrist-orlando" className="block text-sm text-primary hover:underline font-medium">
                      Psychiatrist Orlando
                    </Link>
                    <Link href="/psychiatrist-near-me" className="block text-sm text-primary hover:underline">
                      Psychiatrist Near Me
                    </Link>
                    <Link href="/anxiety-therapy" className="block text-sm text-primary hover:underline">
                      Anxiety Therapy
                    </Link>
                    <Link href="/services" className="block text-sm text-primary hover:underline">
                      Medication Management
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
                Request Same-Day Psychiatrist Appointment
              </h2>
              <p className="text-lg text-muted-foreground">
                Urgent appointments available. Most insurance accepted.
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
