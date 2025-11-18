import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, MapPin, Phone, Clock, Star, CheckCircle, Brain, Shield, Calendar, Users, Video, Award, Monitor } from "lucide-react";
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

export default function TelepsychiatryOrlando() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "@id": "https://empathyhealthclinic.com/telepsychiatry-orlando#organization",
    "name": "Empathy Health Clinic - Telepsychiatry Orlando FL",
    "parentOrganization": {
      "@id": "https://empathyhealthclinic.com/#organization"
    },
    "description": "Board-certified telepsychiatry services in Orlando, FL. Virtual psychiatrist appointments for medication management, psychiatric evaluations, and mental health treatment from home.",
    "url": "https://empathyhealthclinic.com/telepsychiatry-orlando",
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
    "medicalSpecialty": "Telepsychiatry"
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Telepsychiatry Orlando Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Telepsychiatry Orlando FL | Online Psychiatrist | Virtual Mental Health"
        description="Top-rated telepsychiatry services in Orlando, FL. See a board-certified psychiatrist online for medication management, psychiatric evaluations, ADHD, anxiety, depression treatment. Call 386-848-8751."
        keywords={["telepsychiatry orlando", "online psychiatrist orlando", "virtual psychiatrist orlando fl", "telehealth psychiatry orlando", "online mental health orlando", "virtual psychiatry florida", "online psychiatrist florida"]}
        canonicalPath="/telepsychiatry-orlando"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Telepsychiatry Services in Orlando, FL
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Board-certified psychiatrists providing virtual mental health care in Orlando. Online psychiatrist appointments for medication management, psychiatric evaluations, and comprehensive treatment from the comfort of your home.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              className="bg-green-600 hover:bg-green-700 text-white"
              data-testid="button-hero-cta"
              onClick={() => trackEvent('telepsychiatry_orlando_hero_cta', 'conversion', 'Telepsychiatry Orlando Page')}
            >
              <a href="#contact-form">Request Video Appointment</a>
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
                <span>100% Virtual Appointments</span>
              </div>
              <div className="hidden lg:block h-6 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>HIPAA-Compliant Platform</span>
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
                  <h3 className="font-semibold text-foreground mb-1">Serving Orlando Residents</h3>
                  <p className="text-sm text-muted-foreground">
                    Virtual appointments from<br />
                    anywhere in Orlando metro<br />
                    (Based in Winter Park, FL 32810)
                  </p>
                  <p className="text-sm text-primary mt-1 font-medium">
                    No travel required
                  </p>
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
                    Same-week virtual appointments
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3" data-testid="hours-info">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Office Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Mon-Fri: 9:00 AM - 6:00 PM<br />
                    100% telehealth available
                  </p>
                  <p className="text-sm text-primary mt-1 font-medium">
                    <CheckCircle2 className="h-4 w-4 inline mr-1" />
                    Accepting new telehealth patients
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
                  Expert Telepsychiatry Services for Orlando Residents
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Telepsychiatry brings board-certified psychiatric care directly to your home in Orlando. At our <Link href="/psychiatry-clinic-orlando" className="text-primary hover:underline font-medium">Orlando psychiatric clinic</Link>, our online psychiatrists provide the same comprehensive mental health services as traditional in-person visits - psychiatric evaluations, medication management, and treatment for depression, anxiety, ADHD, bipolar disorder, and other mental health conditions - all through secure, HIPAA-compliant video appointments.
                  </p>
                  <p className="text-foreground leading-relaxed mb-4">
                    Whether you live in Orlando, Winter Park, Lake Mary, Altamonte Springs, or Maitland, telepsychiatry eliminates the need to drive to appointments, sit in waiting rooms, or take extended time off work. Our virtual psychiatry platform is easy to use, private, and allows you to meet with your psychiatrist from wherever you feel most comfortable - your home, office, or even your parked car during a lunch break.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    Research shows that telepsychiatry is equally effective as in-person psychiatric care for most conditions, while offering greater convenience, flexibility, and access to care. We accept most major insurance plans for telehealth visits, and same-week virtual appointments are typically available for Orlando residents seeking psychiatric care.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Conditions We Treat via Telepsychiatry
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Our Orlando telepsychiatrists provide virtual treatment for the full range of mental health conditions:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <ul className="space-y-2 text-foreground">
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Depression</strong> - Major depression, persistent depressive disorder, postpartum depression</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Anxiety Disorders</strong> - GAD, panic disorder, social anxiety, phobias</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>ADHD</strong> - Adult and adolescent attention-deficit hyperactivity disorder</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Bipolar Disorder</strong> - Bipolar I, bipolar II, mood stabilization</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>OCD</strong> - Obsessive-compulsive disorder medication management</span>
                      </li>
                    </ul>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>PTSD & Trauma</strong> - Post-traumatic stress disorder</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Insomnia</strong> - Sleep disorders related to mental health</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Eating Disorders</strong> - Medication for co-occurring conditions</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Personality Disorders</strong> - Medication management component of treatment</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Other Psychiatric Conditions</strong> - Comprehensive virtual care</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Our Telepsychiatry Services
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Brain className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Virtual Psychiatric Evaluations</h3>
                      <p className="text-muted-foreground">
                        Comprehensive initial psychiatric assessments conducted via secure video call. Our Orlando telepsychiatrists perform thorough diagnostic evaluations including symptom review, psychiatric history, and treatment planning - all from the comfort of your home.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Shield className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Online Medication Management</h3>
                      <p className="text-muted-foreground">
                        Expert psychiatric medication prescribing and monitoring via telehealth. We can prescribe all psychiatric medications including antidepressants, anti-anxiety medications, ADHD medications, mood stabilizers, and antipsychotics. E-prescriptions sent directly to your Orlando pharmacy.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Video className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">HIPAA-Compliant Video Platform</h3>
                      <p className="text-muted-foreground">
                        Secure, private, and user-friendly telehealth technology. Our HIPAA-compliant video platform is easy to access from your smartphone, tablet, or computer. No special software downloads required - just click a link and join your appointment.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Calendar className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Flexible Appointment Scheduling</h3>
                      <p className="text-muted-foreground">
                        Convenient appointment times including early morning, evening, and weekend availability. Telepsychiatry offers greater scheduling flexibility since there's no commute time. Same-week appointments typically available for Orlando residents.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Benefits of Telepsychiatry in Orlando
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Why Orlando residents choose telepsychiatry services:
                  </p>
                  <ul className="space-y-2 text-foreground">
                    <li className="flex gap-2"><span className="text-primary">•</span> <strong>Eliminate Commute Time:</strong> No driving to appointments in Orlando traffic, no parking hassles, no time wasted in waiting rooms</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> <strong>Convenience & Flexibility:</strong> Meet with your psychiatrist from home, work, or anywhere private with internet access</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> <strong>Same Quality of Care:</strong> Research shows telepsychiatry is equally effective as in-person care for most psychiatric conditions</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> <strong>Increased Privacy:</strong> No risk of seeing someone you know in a waiting room. Attend appointments discreetly from your location</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> <strong>Better Access:</strong> Faster appointment availability and easier to fit appointments into busy work schedules</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> <strong>Continuity of Care:</strong> Continue seeing your psychiatrist even if you travel, move temporarily, or can't leave home due to illness</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> <strong>Reduced No-Shows:</strong> Virtual appointments eliminate transportation barriers and make it easier to keep appointments</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  How Telepsychiatry Works
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Getting started with our Orlando telepsychiatry services is simple:
                  </p>
                  <ol className="space-y-2 text-foreground mb-4">
                    <li className="flex gap-2"><span className="text-primary font-semibold">1.</span> <span><strong>Schedule Appointment:</strong> Call 386-848-8751 or request online to schedule your video appointment</span></li>
                    <li className="flex gap-2"><span className="text-primary font-semibold">2.</span> <span><strong>Complete Intake:</strong> Fill out brief online forms before your first appointment</span></li>
                    <li className="flex gap-2"><span className="text-primary font-semibold">3.</span> <span><strong>Technology Check:</strong> Ensure you have a smartphone, tablet, or computer with camera, microphone, and internet access</span></li>
                    <li className="flex gap-2"><span className="text-primary font-semibold">4.</span> <span><strong>Join Appointment:</strong> At appointment time, click the secure video link sent to you via email or text</span></li>
                    <li className="flex gap-2"><span className="text-primary font-semibold">5.</span> <span><strong>Meet with Psychiatrist:</strong> Have your appointment from the privacy of your chosen location</span></li>
                    <li className="flex gap-2"><span className="text-primary font-semibold">6.</span> <span><strong>Receive Treatment:</strong> Get prescriptions e-sent to your Orlando pharmacy and schedule follow-up appointments</span></li>
                  </ol>
                  <p className="text-foreground leading-relaxed">
                    Technical support is available if you have any difficulties accessing your video appointment.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Why Choose Our Orlando Telepsychiatry Services?
                </h2>
                <div className="prose prose-lg max-w-none">
                  <ul className="space-y-3 text-foreground">
                    <li className="flex gap-3">
                      <Award className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Board-Certified Psychiatrists</strong> - All telepsychiatry appointments are with board-certified psychiatrists, not nurse practitioners or physician assistants. You receive the same expert psychiatric care as in-person visits.</span>
                    </li>
                    <li className="flex gap-3">
                      <Monitor className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Easy-to-Use Technology</strong> - Our HIPAA-compliant telehealth platform is simple and user-friendly. No technical expertise required - if you can make a video call, you can attend your telepsychiatry appointment.</span>
                    </li>
                    <li className="flex gap-3">
                      <Calendar className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Same-Week Availability</strong> - Fast access to virtual psychiatric care in Orlando. We understand that when you need help, waiting weeks isn't acceptable. Same-week telepsychiatry appointments typically available.</span>
                    </li>
                    <li className="flex gap-3">
                      <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Full Prescribing Authority</strong> - Our telepsychiatrists can prescribe all psychiatric medications including controlled substances like ADHD medications and anti-anxiety medications when medically appropriate.</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Insurance Accepted</strong> - Most major insurance plans cover telepsychiatry services. We accept Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, Humana, and many other plans for virtual appointments.</span>
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
                    <h3 className="font-semibold text-foreground mb-2">Is telepsychiatry as effective as in-person appointments?</h3>
                    <p className="text-muted-foreground">
                      Yes. Multiple research studies show that telepsychiatry is equally effective as traditional in-person psychiatric care for most conditions including depression, anxiety, ADHD, and bipolar disorder. The quality of care is the same - only the delivery method changes.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Can you prescribe medications via telepsychiatry?</h3>
                    <p className="text-muted-foreground">
                      Yes, our board-certified psychiatrists can prescribe all psychiatric medications including controlled substances during telepsychiatry appointments. Prescriptions are sent electronically to your Orlando pharmacy of choice for convenient pickup.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">What technology do I need for a telepsychiatry appointment?</h3>
                    <p className="text-muted-foreground">
                      You need a smartphone, tablet, or computer with a camera, microphone, and reliable internet connection. Our platform works on most devices without needing to download special software. A private, quiet location with good lighting is recommended.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Does insurance cover telepsychiatry?</h3>
                    <p className="text-muted-foreground">
                      Most major insurance plans cover telepsychiatry appointments at the same rate as in-person visits. We accept Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, Humana, and many other insurance plans for virtual psychiatric care. Contact our office to verify your coverage.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Is telepsychiatry private and secure?</h3>
                    <p className="text-muted-foreground">
                      Yes. We use HIPAA-compliant, encrypted video technology that protects your privacy and confidentiality. Your appointments are as private and secure as in-person visits. We recommend attending from a private location where you won't be overheard.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Can I switch between in-person and telepsychiatry visits?</h3>
                    <p className="text-muted-foreground">
                      Absolutely. Many Orlando patients use a combination of in-person and virtual appointments based on their schedule and preferences. You can choose telepsychiatry for routine follow-ups and in-person visits when preferred.
                    </p>
                  </div>
                </div>
              </section>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Schedule Virtual Appointment</h3>
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
                      <Video className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-muted-foreground">
                        100% virtual appointments<br />
                        from anywhere in Orlando
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
                    <Link href="/medication-management-orlando" className="block text-sm text-primary hover:underline">
                      Medication Management Orlando
                    </Link>
                    <Link href="/anxiety-psychiatrist-orlando" className="block text-sm text-primary hover:underline">
                      Anxiety Psychiatrist Orlando
                    </Link>
                    <Link href="/adhd-psychiatrist-orlando" className="block text-sm text-primary hover:underline">
                      ADHD Psychiatrist Orlando
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
                Schedule Your Telepsychiatry Appointment
              </h2>
              <p className="text-lg text-muted-foreground">
                Same-week virtual appointments available. Most insurance accepted.
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
