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
import LocalizedContent from "@/components/LocalizedContent";
import InternalLinkBlock from "@/components/InternalLinkBlock";
import { AuthoritativeSourcesBlock } from "@/components/AuthoritativeSource";
import heroImage from "@assets/stock_images/professional_healthc_955227e9.jpg";
import { trackEvent } from "@/lib/analytics";

export default function PsychiatristDowntownOrlando() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "Empathy Health Clinic - Psychiatrist Downtown Orlando FL",
    "description": "Board-certified psychiatrists serving Downtown Orlando, FL. Medication management, psychiatric evaluations, ADHD, anxiety, depression treatment. Same-week appointments. Most insurance accepted.",
    "url": "https://empathyhealthclinic.com/psychiatrist-downtown-orlando",
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
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.59544,
      "longitude": -81.36537
    },
    "areaServed": [
      { "@type": "City", "name": "Downtown Orlando" },
      { "@type": "City", "name": "SODO" },
      { "@type": "City", "name": "College Park" }
    ],
    "medicalSpecialty": "Psychiatry",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Psychiatric Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "MedicalTherapy", "name": "Medication Management" } },
        { "@type": "Offer", "itemOffered": { "@type": "MedicalTherapy", "name": "Psychiatric Evaluation" } },
        { "@type": "Offer", "itemOffered": { "@type": "MedicalTherapy", "name": "Telepsychiatry" } }
      ]
    },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "09:00", "closes": "18:00" }
    ],
    "paymentAccepted": ["BCBS", "Cigna", "UMR", "Medicare", "Aetna", "United Healthcare"]
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Psychiatrist Downtown Orlando Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Psychiatrist Downtown Orlando FL | Same-Week Apts"
        description="Top-rated psychiatrist serving Downtown Orlando, FL, SODO, and Thornton Park. Board-certified psychiatrists for medication management, ADHD, anxiety, depression. Same-week appointments. BCBS, Cigna, Aetna, Medicare accepted. Call (386) 848-8751."
        keywords={["psychiatrist downtown orlando", "downtown orlando psychiatrist", "orlando downtown psychiatrist", "psychiatrists near downtown orlando", "best psychiatrist downtown orlando", "sodo psychiatrist", "thornton park psychiatrist", "psychiatry downtown orlando"]}
        canonicalPath="/psychiatrist-downtown-orlando"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Psychiatrist Downtown Orlando, FL
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Board-certified psychiatrists serving Downtown Orlando, SODO, Thornton Park, and College Park. Expert medication management, psychiatric evaluations, and comprehensive mental health treatment. Same-week appointments available.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild data-testid="button-hero-cta" onClick={() => trackEvent('downtown_orlando_hero_cta', 'conversion', 'Psychiatrist Downtown Orlando Page')}>
              <a href="#contact-form">Request Appointment</a>
            </Button>
            <Button variant="outline" size="lg" asChild className="bg-background/20 backdrop-blur-sm border-white/30 text-white hover:bg-background/30" data-testid="button-hero-phone" onClick={handlePhoneClick}>
              <a href="tel:386-848-8751">Call 386-848-8751</a>
            </Button>
          </div>
        </HeroBackground>

        <section className="py-8 bg-card border-b">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex">{[...Array(5)].map((_, i) => (<Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />))}</div>
                <span className="text-lg font-semibold text-foreground">4.8</span>
                <span className="text-sm text-muted-foreground">Google Reviews</span>
              </div>
              <div className="hidden lg:block h-6 w-px bg-border" />
              <VerifiedOnBadge />
              <div className="hidden lg:block h-6 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm text-foreground"><CheckCircle className="h-4 w-4 text-primary" /><span>Board-Certified Psychiatrists</span></div>
              <div className="hidden lg:block h-6 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm text-foreground"><CheckCircle className="h-4 w-4 text-primary" /><span>Same-Week Appointments</span></div>
            </div>
          </div>
        </section>

        <section className="py-8 bg-primary/5 border-y">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3" data-testid="location-info">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Serving Downtown Orlando</h3>
                  <p className="text-sm text-muted-foreground">2281 Lee Rd Suite 102<br />Winter Park, FL 32810<br />(Quick access via I-4 from Downtown)</p>
                  <a href="https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline mt-1 inline-block" data-testid="link-directions">Get Directions</a>
                </div>
              </div>
              <div className="flex items-start gap-3" data-testid="contact-info">
                <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                  <a href="tel:386-848-8751" className="text-lg font-bold text-primary hover:underline" data-testid="link-phone" onClick={handlePhoneClick}>386-848-8751</a>
                  <p className="text-sm text-muted-foreground mt-1">Same-week appointments available</p>
                </div>
              </div>
              <div className="flex items-start gap-3" data-testid="hours-info">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Office Hours</h3>
                  <p className="text-sm text-muted-foreground">Mon-Fri: 9:00 AM - 6:00 PM<br />Telehealth & in-person available</p>
                  <p className="text-sm text-primary mt-1 font-medium"><CheckCircle2 className="h-4 w-4 inline mr-1" />Accepting new patients</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InsuranceSection />

        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h2 className="text-3xl font-sans font-bold text-foreground mb-6">Expert Psychiatrist Serving Downtown Orlando, FL</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">Looking for a trusted <Link href="/psychiatrist-orlando" className="text-primary hover:underline">psychiatrist</Link> near Downtown Orlando? Empathy Health Clinic provides expert psychiatric care to Downtown Orlando residents, including those in SODO, Thornton Park, College Park, and the greater Central Orlando area.</p>
                  <p className="text-foreground leading-relaxed mb-4">Our board-certified psychiatrists specialize in <Link href="/services" className="text-primary hover:underline">medication management</Link>, psychiatric evaluations, and evidence-based treatment for <Link href="/anxiety-therapy" className="text-primary hover:underline">anxiety</Link>, depression, <Link href="/adhd-testing-orlando" className="text-primary hover:underline">ADHD</Link>, bipolar disorder, and other mental health conditions. Downtown Orlando professionals deserve accessible, quality psychiatric care.</p>
                  <p className="text-foreground leading-relaxed">We accept most major insurance plans and offer both in-person visits and secure <Link href="/virtual-therapy" className="text-primary hover:underline">telehealth</Link> appointments - perfect for busy downtown professionals. Same-week appointments are typically available for new patients.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">Mental Health Conditions We Treat</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <ul className="space-y-2 text-foreground">
                    <li className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /><span><strong>Anxiety Disorders</strong> - GAD, panic disorder, social anxiety</span></li>
                    <li className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /><span><strong>Depression</strong> - Major depression, persistent depressive disorder</span></li>
                    <li className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /><span><strong>ADHD</strong> - Adult and adolescent ADHD</span></li>
                    <li className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /><span><strong>Bipolar Disorder</strong> - Type I, Type II</span></li>
                    <li className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /><span><strong>OCD</strong> - Obsessive-compulsive disorder</span></li>
                  </ul>
                  <ul className="space-y-2 text-foreground">
                    <li className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /><span><strong>PTSD & Trauma</strong> - Post-traumatic stress disorder</span></li>
                    <li className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /><span><strong>Insomnia & Sleep Disorders</strong></span></li>
                    <li className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /><span><strong>Eating Disorders</strong></span></li>
                    <li className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /><span><strong>Personality Disorders</strong></span></li>
                    <li className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /><span><strong>Schizophrenia & Psychotic Disorders</strong></span></li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">Psychiatric Services for Downtown Orlando</h2>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-card rounded-lg border"><Brain className="h-8 w-8 text-primary flex-shrink-0 mt-1" /><div><h3 className="font-semibold text-lg text-foreground mb-2">Medication Management</h3><p className="text-muted-foreground">Expert psychiatric medication prescribing and monitoring with personalized medication plans.</p></div></div>
                  <div className="flex gap-4 p-4 bg-card rounded-lg border"><Shield className="h-8 w-8 text-primary flex-shrink-0 mt-1" /><div><h3 className="font-semibold text-lg text-foreground mb-2">Comprehensive Psychiatric Evaluations</h3><p className="text-muted-foreground">Thorough diagnostic assessments by board-certified psychiatrists for accurate diagnoses.</p></div></div>
                  <div className="flex gap-4 p-4 bg-card rounded-lg border"><Video className="h-8 w-8 text-primary flex-shrink-0 mt-1" /><div><h3 className="font-semibold text-lg text-foreground mb-2">Telepsychiatry Services</h3><p className="text-muted-foreground">Convenient online psychiatry - perfect for busy Downtown Orlando professionals.</p></div></div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">Why Downtown Orlando Residents Choose Empathy Health Clinic</h2>
                <ul className="space-y-3 text-foreground">
                  <li className="flex gap-3"><Award className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" /><span><strong>Board-Certified Expertise</strong> - All psychiatrists are board-certified by the American Board of Psychiatry and Neurology.</span></li>
                  <li className="flex gap-3"><MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" /><span><strong>Convenient Access</strong> - Quick drive via I-4 from Downtown Orlando, SODO, and Thornton Park.</span></li>
                  <li className="flex gap-3"><Calendar className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" /><span><strong>Fast Appointment Access</strong> - Same-week appointments typically available.</span></li>
                  <li className="flex gap-3"><CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" /><span><strong>Most Insurance Accepted</strong> - Aetna, BCBS, Cigna, UnitedHealthcare, and more.</span></li>
                  <li className="flex gap-3"><Video className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" /><span><strong>In-Person & Telehealth Options</strong> - Telehealth perfect for busy downtown professionals.</span></li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div><h3 className="font-semibold text-foreground mb-2">Do you have an office in Downtown Orlando?</h3><p className="text-muted-foreground">Our office is at 2281 Lee Road Suite 102, Winter Park, FL 32810 - just 10 minutes from Downtown via I-4. We also offer telepsychiatry for downtown professionals.</p></div>
                  <div><h3 className="font-semibold text-foreground mb-2">How quickly can I get an appointment?</h3><p className="text-muted-foreground">We typically offer same-week appointments for new patients. Call 386-848-8751 to schedule.</p></div>
                  <div><h3 className="font-semibold text-foreground mb-2">Do you offer telehealth?</h3><p className="text-muted-foreground">Yes! Many Downtown Orlando professionals prefer our telepsychiatry services via secure video call.</p></div>
                  <div><h3 className="font-semibold text-foreground mb-2">What insurance do you accept?</h3><p className="text-muted-foreground">We accept Aetna, BCBS, Cigna, UnitedHealthcare, UMR, Medicare, and more.</p></div>
                  <div><h3 className="font-semibold text-foreground mb-2">Do I need a referral?</h3><p className="text-muted-foreground">No referral required. Schedule directly with our office.</p></div>
                  <div><h3 className="font-semibold text-foreground mb-2">Do you serve SODO and College Park?</h3><p className="text-muted-foreground">Yes! We serve all Downtown Orlando neighborhoods including SODO, Thornton Park, College Park, and more.</p></div>
                  <div><h3 className="font-semibold text-foreground mb-2">Can busy professionals use telehealth?</h3><p className="text-muted-foreground">Absolutely! Our telepsychiatry is ideal for Downtown Orlando professionals who want quality care during lunch or after work.</p></div>
                </div>
              </section>

              <LocalizedContent city="Downtown Orlando" neighborhoods={["SODO", "Thornton Park", "College Park", "Parramore", "Lake Eola Heights"]} nearbyLandmarks={["Lake Eola Park", "Amway Center", "Dr. Phillips Center", "Church Street District"]} highways={["I-4", "SR 408", "Orange Avenue", "Mills Avenue"]} description="Vibrant urban core of Orlando with easy access to our psychiatric care team" driveTimeMinutes={10} slug="/psychiatrist-downtown-orlando" />
              <InternalLinkBlock category="locations" excludePaths={["/psychiatrist-downtown-orlando"]} title="Explore Our Psychiatric Services Near Downtown Orlando" />
              <AuthoritativeSourcesBlock sources={[{ source: "NIMH", topic: "Mental Health Information" }, { source: "APA", topic: "Finding a Psychiatrist" }, { source: "NIH", topic: "Mental Health Resources" }]} />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                <div className="bg-card border rounded-lg p-6" id="contact-form">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Schedule an Appointment</h3>
                  <ShortContactForm service="Psychiatrist Downtown Orlando" className="mb-4" />
                  <div className="space-y-4 pt-4 border-t">
                    <Button className="w-full" size="lg" variant="outline" asChild data-testid="button-sidebar-call" onClick={handlePhoneClick}><a href="tel:386-848-8751"><Phone className="h-4 w-4 mr-2" />Call 386-848-8751</a></Button>
                  </div>
                </div>
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Related Services</h3>
                  <div className="space-y-2">
                    <Link href="/psychiatrist-orlando" className="block text-sm text-primary hover:underline font-medium">Psychiatrist Orlando</Link>
                    <Link href="/psychiatrist-near-me" className="block text-sm text-primary hover:underline">Psychiatrist Near Me</Link>
                    <Link href="/services" className="block text-sm text-primary hover:underline">Medication Management</Link>
                    <Link href="/anxiety-therapy" className="block text-sm text-primary hover:underline">Anxiety Therapy</Link>
                    <Link href="/adhd-testing-orlando" className="block text-sm text-primary hover:underline">ADHD Testing</Link>
                  </div>
                </div>
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Nearby Locations</h3>
                  <div className="space-y-2">
                    <Link href="/psychiatrist-orlando" className="block text-sm text-primary hover:underline font-medium">Psychiatrist Orlando</Link>
                    <Link href="/psychiatrist-winter-park" className="block text-sm text-primary hover:underline">Winter Park</Link>
                    <Link href="/psychiatrist-lake-nona" className="block text-sm text-primary hover:underline">Lake Nona</Link>
                    <Link href="/locations/kissimmee" className="block text-sm text-primary hover:underline">Kissimmee</Link>
                  </div>
                </div>
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Insurance Accepted</h3>
                  <div className="space-y-2">
                    <Link href="/psychiatrist-orlando-accepts-bcbs" className="block text-sm text-primary hover:underline">Blue Cross Blue Shield</Link>
                    <Link href="/psychiatrist-orlando-accepts-cigna" className="block text-sm text-primary hover:underline">Cigna</Link>
                    <Link href="/psychiatrist-orlando-accepts-aetna" className="block text-sm text-primary hover:underline">Aetna</Link>
                    <Link href="/psychiatrist-orlando-accepts-united-healthcare" className="block text-sm text-primary hover:underline">United Healthcare</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ReviewsAndBadges />
        <TrustFactors />

        <section className="py-16 px-4 bg-gradient-to-br from-primary to-primary/80">
          <div className="container mx-auto max-w-4xl text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to See a Psychiatrist Near Downtown Orlando?</h2>
            <p className="text-xl mb-8 text-white/95">Board-certified psychiatrists accepting new patients. Same-week appointments available.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/95 font-bold text-lg px-10 py-6 h-auto shadow-xl" asChild data-testid="button-final-cta"><Link href="/request-appointment">Book Your Appointment</Link></Button>
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-10 py-6 h-auto" asChild onClick={handlePhoneClick} data-testid="button-final-phone"><a href="tel:+13868488751"><Phone className="h-5 w-5 mr-2" />386-848-8751</a></Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
