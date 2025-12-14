import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, MapPin, Phone, Clock, Star, Brain, Shield, Calendar, Users, Video, Award, Building2, Pill, Clock3, Heart, Zap, ChevronRight, Stethoscope } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import HeroBackground from "@/components/HeroBackground";
import ShortContactForm from "@/components/ShortContactForm";
import heroImage from "@assets/stock_images/professional_healthc_955227e9.jpg";
import { trackEvent } from "@/lib/analytics";

const services = [
  {
    icon: Brain,
    title: "ADHD Treatment",
    description: "Comprehensive evaluation and medication management for adults and children with attention deficit hyperactivity disorder.",
    href: "/adhd-testing-orlando",
    conditions: ["Inattention", "Hyperactivity", "Impulsivity", "Focus issues"]
  },
  {
    icon: Heart,
    title: "Anxiety Treatment",
    description: "Evidence-based treatment for generalized anxiety, panic disorder, social anxiety, and phobias using medication and therapeutic approaches.",
    href: "/anxiety-treatment",
    conditions: ["Generalized anxiety", "Panic attacks", "Social anxiety", "Phobias"]
  },
  {
    icon: Zap,
    title: "Depression Treatment",
    description: "Personalized medication management and support for major depression, persistent depressive disorder, and mood disorders.",
    href: "/depression-treatment",
    conditions: ["Major depression", "Dysthymia", "Mood disorders", "Seasonal depression"]
  },
  {
    icon: Pill,
    title: "Bipolar Disorder",
    description: "Expert care for bipolar I, bipolar II, and cyclothymic disorder with mood stabilization through carefully managed medication.",
    href: "/bipolar-psychiatrist-orlando",
    conditions: ["Bipolar I", "Bipolar II", "Cyclothymia", "Mood swings"]
  },
  {
    icon: Shield,
    title: "PTSD & Trauma",
    description: "Trauma-informed psychiatric care including medication management and coordination with trauma therapists for comprehensive healing.",
    href: "/ptsd-psychiatrist-orlando",
    conditions: ["PTSD", "Trauma recovery", "Anxiety from trauma", "Nightmares"]
  },
  {
    icon: Stethoscope,
    title: "Medication Management",
    description: "Ongoing medication monitoring, adjustments, and optimization for existing psychiatric conditions and treatment plans.",
    href: "/medication-management",
    conditions: ["Med checks", "Dosage adjustments", "Side effect management", "Refills"]
  }
];

export default function PsychiatryNearMe() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MedicalBusiness", "MedicalClinic", "LocalBusiness"],
        "@id": "https://empathyhealthclinic.com/psychiatry-near-me/#organization",
        "name": "Psychiatry Near Me - Empathy Health Clinic",
        "url": "https://empathyhealthclinic.com/psychiatry-near-me",
        "telephone": "+1-386-848-8751",
        "email": "providers@empathyhealthclinic.com",
        "description": "Comprehensive psychiatry services near you in Orlando and Central Florida. Expert medication management and psychiatric evaluations.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "2281 Lee Road Suite 102",
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
        "medicalSpecialty": ["Psychiatry", "MentalHealth", "MedicationManagement"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Psychiatry Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "ADHD Treatment" } },
            { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Anxiety Treatment" } },
            { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Depression Treatment" } },
            { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Bipolar Disorder Treatment" } },
            { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Medication Management" } },
            { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Psychiatric Evaluation" } }
          ]
        },
        "areaServed": [
          { "@type": "City", "name": "Orlando" },
          { "@type": "City", "name": "Winter Park" },
          { "@type": "City", "name": "Maitland" },
          { "@type": "City", "name": "Altamonte Springs" },
          { "@type": "City", "name": "Kissimmee" },
          { "@type": "City", "name": "Apopka" }
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        ],
        "priceRange": "$$",
        "paymentAccepted": ["BCBS", "Cigna", "UMR", "Medicare", "Aetna", "United Healthcare"],
        "isAcceptingNewPatients": true
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What psychiatry services are available near me?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Empathy Health Clinic offers comprehensive psychiatry services including ADHD treatment, anxiety treatment, depression care, bipolar disorder management, medication management, and psychiatric evaluations. We serve Orlando, Winter Park, and surrounding Central Florida areas."
            }
          },
          {
            "@type": "Question",
            "name": "How do I find a good psychiatry practice near me?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Look for board-certified psychiatrists, check insurance acceptance, read patient reviews, and verify appointment availability. At Empathy Health Clinic, we offer same-week appointments with board-certified providers and accept most major insurance plans."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between psychiatry and therapy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Psychiatry focuses on the medical treatment of mental health conditions, primarily through medication management. Therapy (counseling) focuses on talk-based treatment. Many patients benefit from both psychiatry for medication and therapy for counseling support."
            }
          },
          {
            "@type": "Question",
            "name": "Do psychiatry services accept insurance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, most psychiatry services accept insurance. Empathy Health Clinic accepts BCBS, Cigna, UMR, Medicare, Aetna, United Healthcare, and many other major insurance plans."
            }
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Psychiatry Services",
        "serviceType": "Mental Health Care",
        "provider": {
          "@type": "MedicalClinic",
          "name": "Empathy Health Clinic"
        },
        "areaServed": { "@type": "City", "name": "Orlando" },
        "description": "Comprehensive psychiatric services including medication management, psychiatric evaluations, and treatment for anxiety, depression, ADHD, bipolar disorder, and more."
      }
    ]
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Psychiatry Near Me Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Psychiatry Near Me | Same-Week Appointments | Orlando FL 2025"
        description="Looking for psychiatry near me? Find comprehensive psychiatric services in Orlando, FL. Board-certified psychiatrists for ADHD, anxiety, depression. Same-week appointments available. Most insurance accepted. Call (386) 848-8751."
        keywords={["psychiatry near me", "psychiatry services near me", "find psychiatry near me", "psychiatry clinic near me", "psychiatry orlando", "psychiatric services orlando", "mental health psychiatry near me", "best psychiatry near me", "psychiatry accepting new patients", "psychiatry same day appointment"]}
        canonicalPath="/psychiatry-near-me"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <nav className="bg-muted/50 py-3 px-4 border-b border-card-border" aria-label="Breadcrumb">
          <div className="container mx-auto max-w-6xl">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <ChevronRight className="h-4 w-4" />
              <li><Link href="/services" className="hover:text-primary">Services</Link></li>
              <ChevronRight className="h-4 w-4" />
              <li className="text-foreground font-medium">Psychiatry Near Me</li>
            </ol>
          </div>
        </nav>

        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Psychiatry Services Near You
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6 max-w-3xl" data-testid="text-hero-description">
            Comprehensive psychiatric care in Orlando and Central Florida. Expert medication management for anxiety, depression, ADHD, bipolar disorder, and more. Same-week appointments with board-certified psychiatrists.
          </p>
          
          <div className="flex flex-wrap gap-3 mb-8 text-white/95">
            <div className="flex items-center gap-2 bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-green-400/30">
              <Calendar className="h-5 w-5 text-green-300" />
              <span className="font-semibold">Accepting New Patients</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <Clock3 className="h-5 w-5 text-green-300" />
              <span className="font-semibold">Same-Day Psychiatric Care</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <Shield className="h-5 w-5 text-green-300" />
              <span className="font-semibold">Most Insurance Accepted</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-6 h-auto shadow-xl"
              asChild
              data-testid="button-schedule-hero"
            >
              <Link href="/request-appointment">Schedule Appointment</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/95 hover:bg-white text-gray-900 border-2 border-white font-semibold text-lg px-8 py-6 h-auto backdrop-blur-sm shadow-xl"
              asChild
              onClick={handlePhoneClick}
              data-testid="button-call-hero"
            >
              <a href="tel:+13868488751">
                <Phone className="h-5 w-5 mr-2" />
                Call: 386-848-8751
              </a>
            </Button>
          </div>
        </HeroBackground>

        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4 text-foreground">
                Our Approach to Psychiatry
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                At Empathy Health Clinic, we believe in personalized, evidence-based psychiatric care. Our board-certified psychiatrists take the time to understand your unique needs and develop treatment plans that work for your life.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-card border border-card-border rounded-xl p-8 text-center">
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Patient-Centered Care</h3>
                <p className="text-muted-foreground">
                  We listen first. Your symptoms, goals, and preferences guide our treatment recommendations. You're always part of the decision-making process.
                </p>
              </div>

              <div className="bg-card border border-card-border rounded-xl p-8 text-center">
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Evidence-Based Methods</h3>
                <p className="text-muted-foreground">
                  Our psychiatrists use proven, research-backed treatments and stay current with the latest advances in psychiatric medicine.
                </p>
              </div>

              <div className="bg-card border border-card-border rounded-xl p-8 text-center">
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Compassionate Support</h3>
                <p className="text-muted-foreground">
                  Mental health treatment requires trust. We provide a judgment-free environment where you can openly discuss your challenges.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4 text-foreground">
                Psychiatry Services We Offer
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Comprehensive psychiatric care for a wide range of mental health conditions. Click on any service to learn more.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Link 
                  key={service.title}
                  href={service.href}
                  className="bg-card border border-card-border rounded-xl p-6 hover-elevate group"
                >
                  <service.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.conditions.map((condition) => (
                      <span key={condition} className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
                        {condition}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gradient-to-br from-green-600 to-green-700">
          <div className="container mx-auto max-w-4xl text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Accepting New Patients
            </h2>
            <p className="text-xl mb-8 text-white/95">
              Same-week appointments available with our board-certified psychiatrists. Don't wait to get the care you need.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-green-700 hover:bg-white/95 font-bold text-lg px-10 py-6 h-auto shadow-xl"
                asChild
                data-testid="button-cta-banner"
              >
                <Link href="/request-appointment">Schedule Your Appointment</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-10 py-6 h-auto"
                asChild
                onClick={handlePhoneClick}
                data-testid="button-phone-banner"
              >
                <a href="tel:+13868488751">
                  <Phone className="h-5 w-5 mr-2" />
                  386-848-8751
                </a>
              </Button>
            </div>
          </div>
        </section>

        <InsuranceSection className="py-16 px-4 bg-background" />

        <section className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4 text-foreground text-center">
              Find Psychiatry Near You
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              We serve Orlando, Winter Park, and all of Central Florida with convenient in-person and telehealth appointments.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <Link href="/psychiatrist-orlando" className="bg-card border border-card-border rounded-lg p-4 hover-elevate">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="font-semibold text-foreground">Orlando</span>
                    </div>
                  </Link>
                  <Link href="/locations/winter-park" className="bg-card border border-card-border rounded-lg p-4 hover-elevate">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="font-semibold text-foreground">Winter Park</span>
                    </div>
                  </Link>
                  <Link href="/locations/altamonte-springs" className="bg-card border border-card-border rounded-lg p-4 hover-elevate">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="font-semibold text-foreground">Altamonte Springs</span>
                    </div>
                  </Link>
                  <Link href="/locations/kissimmee" className="bg-card border border-card-border rounded-lg p-4 hover-elevate">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="font-semibold text-foreground">Kissimmee</span>
                    </div>
                  </Link>
                  <Link href="/locations/apopka" className="bg-card border border-card-border rounded-lg p-4 hover-elevate">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="font-semibold text-foreground">Apopka</span>
                    </div>
                  </Link>
                  <Link href="/virtual-therapy" className="bg-primary/10 border border-primary/20 rounded-lg p-4 hover-elevate">
                    <div className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="font-semibold text-primary">Telehealth</span>
                    </div>
                  </Link>
                </div>

                <div className="bg-card border border-card-border rounded-lg p-6">
                  <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Main Office Location
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    <strong>Empathy Health Clinic</strong><br />
                    2281 Lee Road Suite 102<br />
                    Orlando, FL 32810
                  </p>
                  <p className="text-muted-foreground mb-4">
                    <Phone className="h-4 w-4 inline mr-1" />
                    <a href="tel:+13868488751" className="text-primary hover:underline">(386) 848-8751</a>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 inline mr-1" />
                    Monday - Friday: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>

              <div className="bg-card border border-card-border rounded-xl overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5!2d-81.36537!3d28.59544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e77000e9d9a8b3%3A0x123456789!2s2281+Lee+Rd+Suite+102%2C+Orlando%2C+FL+32810!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Psychiatry Near Me - Empathy Health Clinic Location"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <ReviewsAndBadges />

        <section className="py-12 px-4 bg-background">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-sans font-bold mb-8 text-foreground text-center">
              Frequently Asked Questions About Psychiatry
            </h2>
            
            <div className="space-y-4">
              <div className="bg-card border border-card-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">What psychiatry services are available near me?</h3>
                <p className="text-muted-foreground">Empathy Health Clinic offers comprehensive psychiatry services including ADHD treatment, anxiety treatment, depression care, bipolar disorder management, medication management, and psychiatric evaluations. We serve Orlando, Winter Park, and surrounding Central Florida areas.</p>
              </div>
              <div className="bg-card border border-card-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">How do I find a good psychiatry practice near me?</h3>
                <p className="text-muted-foreground">Look for board-certified psychiatrists, check insurance acceptance, read patient reviews, and verify appointment availability. At Empathy Health Clinic, we offer same-week appointments with board-certified providers and accept most major insurance plans.</p>
              </div>
              <div className="bg-card border border-card-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">What's the difference between psychiatry and therapy?</h3>
                <p className="text-muted-foreground">Psychiatry focuses on the medical treatment of mental health conditions, primarily through medication management. Therapy (counseling) focuses on talk-based treatment. Many patients benefit from both psychiatry for medication and therapy for counseling support.</p>
              </div>
              <div className="bg-card border border-card-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">Do psychiatry services accept insurance?</h3>
                <p className="text-muted-foreground">Yes, most psychiatry services accept insurance. We accept BCBS, Cigna, UMR, Medicare, Aetna, United Healthcare, and many other major insurance plans.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 bg-muted/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-sans font-bold mb-6 text-foreground text-center">
              Explore Related Services
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/psychiatrist-near-me" className="bg-primary/5 border-2 border-primary rounded-lg p-4 text-center hover-elevate">
                <h3 className="font-semibold text-primary text-sm">Psychiatrist Near Me</h3>
              </Link>
              <Link href="/psychiatrist-orlando" className="bg-card border border-card-border rounded-lg p-4 text-center hover-elevate">
                <h3 className="font-semibold text-foreground text-sm">Psychiatrist Orlando</h3>
              </Link>
              <Link href="/services" className="bg-card border border-card-border rounded-lg p-4 text-center hover-elevate">
                <h3 className="font-semibold text-foreground text-sm">Medication Management</h3>
              </Link>
              <Link href="/psychiatric-evaluation" className="bg-card border border-card-border rounded-lg p-4 text-center hover-elevate">
                <h3 className="font-semibold text-foreground text-sm">Psychiatric Evaluation</h3>
              </Link>
              <Link href="/therapy" className="bg-card border border-card-border rounded-lg p-4 text-center hover-elevate">
                <h3 className="font-semibold text-foreground text-sm">Therapy Services</h3>
              </Link>
              <Link href="/virtual-therapy" className="bg-card border border-card-border rounded-lg p-4 text-center hover-elevate">
                <h3 className="font-semibold text-foreground text-sm">Telepsychiatry</h3>
              </Link>
              <Link href="/anxiety-therapy" className="bg-card border border-card-border rounded-lg p-4 text-center hover-elevate">
                <h3 className="font-semibold text-foreground text-sm">Anxiety Treatment</h3>
              </Link>
              <Link href="/depression-counseling" className="bg-card border border-card-border rounded-lg p-4 text-center hover-elevate">
                <h3 className="font-semibold text-foreground text-sm">Depression Treatment</h3>
              </Link>
            </div>
          </div>
        </section>

        <TrustFactors />

        <section className="py-16 px-4 bg-gradient-to-br from-primary to-primary/80">
          <div className="container mx-auto max-w-4xl text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Started with Psychiatry Today
            </h2>
            <p className="text-xl mb-8 text-white/95">
              Don't wait to get the mental health care you deserve. Same-week appointments available.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/95 font-bold text-lg px-10 py-6 h-auto shadow-xl"
                asChild
                data-testid="button-final-cta"
              >
                <Link href="/request-appointment">Book Your Appointment</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-10 py-6 h-auto"
                asChild
                onClick={handlePhoneClick}
                data-testid="button-final-phone"
              >
                <a href="tel:+13868488751">
                  <Phone className="h-5 w-5 mr-2" />
                  386-848-8751
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
