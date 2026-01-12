import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, MapPin, Phone, Clock, Star, CheckCircle, Brain, Shield, Calendar, Users, Video, Award, Heart, Repeat } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import HeroBackground from "@/components/HeroBackground";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { LocalizedContentMultiple } from "@/components/LocalizedContent";
const heroImage = "/attached_assets/stock_images/professional_healthc_955227e9.jpg";
import { trackEvent } from "@/lib/analytics";

export default function OCDPsychiatristOrlando() {
  const faqSchema = {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What medications do OCD psychiatrists prescribe in Orlando?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "OCD psychiatrists typically prescribe serotonin reuptake inhibitors (SRIs) including SSRIs like fluoxetine (Prozac), sertraline (Zoloft), fluvoxamine (Luvox), and paroxetine (Paxil), as well as the tricyclic antidepressant clomipramine (Anafranil). For OCD, these medications are often prescribed at higher doses than for depression or other anxiety disorders. Our Orlando OCD psychiatrists work closely with you to find the right medication and dosage."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can I see an OCD psychiatrist in Orlando?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "At Empathy Health Clinic, we offer same-week appointments for new OCD patients in Orlando. Call (386) 848-8751 to schedule your psychiatric evaluation. We understand OCD symptoms can be debilitating and believe you shouldn't have to wait months for treatment."
        }
      },
      {
        "@type": "Question",
        "name": "Do you work with ERP therapists for OCD treatment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our OCD psychiatrists in Orlando collaborate with Exposure and Response Prevention (ERP) therapists to provide comprehensive OCD treatment. Research shows the combination of medication management and ERP therapy offers the best outcomes for OCD. We can coordinate care with your existing therapist or provide referrals to ERP specialists."
        }
      },
      {
        "@type": "Question",
        "name": "What types of OCD do you treat?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our Orlando OCD psychiatrists treat all subtypes of OCD including contamination OCD, checking OCD, symmetry and ordering OCD, harm OCD (intrusive thoughts about harming self or others), relationship OCD, religious/scrupulosity OCD, Pure O (primarily obsessional OCD), and other presentations. We understand the nuances of different OCD subtypes and tailor treatment accordingly."
        }
      },
      {
        "@type": "Question",
        "name": "How long does OCD medication take to work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SRI medications for OCD typically take 8-12 weeks to show full effectiveness, sometimes longer than for depression treatment. Some improvement may be noticed within 4-6 weeks. OCD often requires higher medication doses, and we carefully titrate dosing over time to maximize benefits while minimizing side effects. Patience is important as OCD medication response takes time."
        }
      },
      {
        "@type": "Question",
        "name": "Does insurance cover OCD psychiatry treatment in Orlando?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we accept most major insurance plans for OCD treatment including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, Medicare, and more. OCD is a recognized mental health condition covered by insurance. Contact us at (386) 848-8751 to verify your specific benefits."
        }
      }
    ]
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
        "@id": "https://empathyhealthclinic.com/ocd-psychiatrist-orlando#organization",
        "name": "Empathy Health Clinic - OCD Psychiatrist Orlando FL",
        "parentOrganization": {
          "@id": "https://empathyhealthclinic.com/#organization"
        },
        "description": "Board-certified OCD psychiatrists in Orlando, FL specializing in obsessive-compulsive disorder treatment. Expert medication management with SSRIs and SRIs at therapeutic doses. Same-week appointments available.",
        "url": "https://empathyhealthclinic.com/ocd-psychiatrist-orlando",
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
        "medicalSpecialty": "Psychiatry - OCD Specialist"
      },
      faqSchema
    ]
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'OCD Psychiatrist Orlando Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="OCD Psychiatrist Orlando FL | Obsessive-Compulsive Disorder Treatment"
        description="OCD psychiatrist Orlando - Expert OCD psychiatry Orlando specialists providing medication management for obsessive-compulsive disorder. Same-week appointments, insurance accepted. Call (386) 848-8751."
        keywords={["ocd psychiatrist orlando", "ocd psychiatry orlando", "ocd treatment orlando", "obsessive compulsive disorder psychiatrist orlando", "ocd medication management orlando", "ocd specialist orlando", "ocd doctor orlando", "orlando ocd psychiatrist"]}
        canonicalPath="/ocd-psychiatrist-orlando"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            OCD Psychiatrist Orlando FL
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Board-certified psychiatrists specializing in obsessive-compulsive disorder treatment for adults in Orlando. Expert OCD medication management with SSRIs and SRI medications at therapeutic doses. Break free from intrusive thoughts and compulsive behaviors.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              className=""
              data-testid="button-hero-cta"
              onClick={() => trackEvent('ocd_psychiatrist_orlando_hero_cta', 'conversion', 'OCD Psychiatrist Orlando Page')}
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
              <a href="tel:386-848-8751">Call (386) 848-8751</a>
            </Button>
          </div>
        </HeroBackground>

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
                <span>OCD Specialists</span>
              </div>
              <div className="hidden lg:block h-6 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Same-Week Appointments</span>
              </div>
            </div>
          </div>
        </section>

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
                  <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                  <a 
                    href="tel:386-848-8751" 
                    className="text-lg font-bold text-primary hover:underline"
                    data-testid="link-phone"
                    onClick={handlePhoneClick}
                  >
                    (386) 848-8751
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Same-week OCD appointments
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
                    Accepting new OCD patients
                  </p>
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
                <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                  Expert OCD Treatment in Orlando, FL
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Living with obsessive-compulsive disorder (OCD) can feel exhausting and isolating. The intrusive thoughts, the compulsive behaviors, the constant doubt - OCD affects every aspect of life. At our <Link href="/psychiatrist-orlando" className="text-primary hover:underline font-medium">Orlando psychiatry clinic</Link>, our board-certified psychiatrists specialize in comprehensive OCD treatment for adults, providing evidence-based medication management to help you regain control.
                  </p>
                  <p className="text-foreground leading-relaxed mb-4">
                    Our Orlando OCD psychiatrists understand that OCD is not about being "neat" or "organized" - it's a serious neurobiological condition that responds well to proper treatment. We have extensive experience with all OCD subtypes, from contamination fears and checking behaviors to intrusive thoughts and Pure O presentations. We work closely with <Link href="/what-we-treat/ocd" className="text-primary hover:underline font-medium">ERP therapists</Link> to provide coordinated care.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    We accept most major insurance plans and offer both in-person appointments at our Winter Park office (convenient to Orlando, Lake Mary, Altamonte Springs, and Maitland) and secure telepsychiatry options throughout Florida. Same-week appointments are typically available because we believe you shouldn't have to suffer while waiting months for help.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  OCD Subtypes We Treat in Orlando
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Our OCD psychiatrists have expertise treating all presentations of obsessive-compulsive disorder:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <ul className="space-y-2 text-foreground">
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Contamination OCD</strong> - Fear of germs, dirt, illness, or "spreading" contamination to others</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Checking OCD</strong> - Repeated checking of locks, appliances, or actions to prevent harm</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Symmetry & Ordering</strong> - Need for things to be "just right" or in a specific order</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Harm OCD</strong> - Intrusive thoughts about harming yourself or others</span>
                      </li>
                    </ul>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Pure O (Primarily Obsessional)</strong> - Distressing intrusive thoughts with mental compulsions</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Relationship OCD</strong> - Obsessive doubts about romantic relationships</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Religious/Scrupulosity OCD</strong> - Obsessions related to religious or moral issues</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Health Anxiety OCD</strong> - Obsessive fears about having serious illnesses</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Our OCD Psychiatry Services
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Brain className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Comprehensive OCD Evaluations</h3>
                      <p className="text-muted-foreground">
                        Thorough psychiatric assessments using validated tools like the Y-BOCS (Yale-Brown Obsessive Compulsive Scale) to accurately diagnose OCD and assess severity. Our Orlando psychiatrists take time to understand your specific obsessions, compulsions, and how OCD impacts your daily functioning.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Shield className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">OCD Medication Management</h3>
                      <p className="text-muted-foreground">
                        Expert prescribing and monitoring of SRI medications at therapeutic doses for OCD. Unlike depression treatment, OCD often requires higher SSRI doses and longer trial periods. We carefully titrate medications to find the optimal balance of effectiveness and tolerability for your OCD symptoms.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Repeat className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Collaboration with ERP Therapists</h3>
                      <p className="text-muted-foreground">
                        We work closely with Exposure and Response Prevention (ERP) therapists to provide comprehensive OCD treatment. Research shows that combining medication with ERP therapy provides the best outcomes. We coordinate care with your therapist and can provide referrals to ERP specialists in Orlando.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Users className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Treatment-Resistant OCD</h3>
                      <p className="text-muted-foreground">
                        For patients who haven't responded adequately to first-line treatments, we offer advanced strategies including medication augmentation, combination therapies, and consideration of newer treatment approaches. Our psychiatrists stay current with the latest OCD research and treatment options.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Common OCD Symptoms We Address
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Our Orlando OCD psychiatrists treat the full spectrum of obsessive-compulsive symptoms:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Obsessions:</h3>
                      <ul className="space-y-2 text-foreground">
                        <li className="flex gap-2"><span className="text-primary">•</span> Intrusive, unwanted thoughts</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Fear of contamination or germs</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Unwanted violent or sexual thoughts</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Excessive doubt ("Did I lock the door?")</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Need for symmetry or exactness</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Religious or moral obsessions</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Fear of causing harm to others</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Compulsions:</h3>
                      <ul className="space-y-2 text-foreground">
                        <li className="flex gap-2"><span className="text-primary">•</span> Excessive hand washing or cleaning</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Repeated checking behaviors</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Counting or mental rituals</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Ordering or arranging items</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Seeking reassurance from others</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Avoidance of triggers</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Mental reviewing or analysis</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  OCD Medications We Prescribe
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Our OCD psychiatrists in Orlando have expertise with all FDA-approved OCD medications and evidence-based augmentation strategies:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-card p-4 rounded-lg border">
                      <h3 className="font-semibold text-foreground mb-2">First-Line OCD Medications:</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li>• Fluoxetine (Prozac) - up to 80mg/day</li>
                        <li>• Sertraline (Zoloft) - up to 200mg/day</li>
                        <li>• Fluvoxamine (Luvox) - FDA-approved for OCD</li>
                        <li>• Paroxetine (Paxil) - up to 60mg/day</li>
                        <li>• Clomipramine (Anafranil) - gold standard SRI</li>
                        <li>• Escitalopram (Lexapro) - off-label for OCD</li>
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                      <h3 className="font-semibold text-foreground mb-2">Augmentation Strategies:</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li>• Low-dose antipsychotics (risperidone, aripiprazole)</li>
                        <li>• Glutamate modulators (memantine, NAC)</li>
                        <li>• SSRI + Clomipramine combinations</li>
                        <li>• For treatment-resistant cases</li>
                      </ul>
                      <p className="text-xs text-muted-foreground mt-2">
                        Note: OCD typically requires higher SSRI doses than depression
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Why Choose Our Orlando OCD Psychiatrists?
                </h2>
                <div className="prose prose-lg max-w-none">
                  <ul className="space-y-3 text-foreground">
                    <li className="flex gap-3">
                      <Award className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>OCD Expertise</strong> - Our board-certified psychiatrists understand OCD's unique medication requirements, including the need for higher doses and longer treatment trials. We know the difference between OCD subtypes and how to optimize treatment for each.</span>
                    </li>
                    <li className="flex gap-3">
                      <Calendar className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Fast Access to Care</strong> - Same-week appointments available because OCD symptoms don't wait. When intrusive thoughts and compulsions are consuming your life, you need help quickly.</span>
                    </li>
                    <li className="flex gap-3">
                      <Brain className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Evidence-Based Treatment</strong> - We use medications proven effective in clinical research for OCD. Our treatment recommendations follow IOCDF (International OCD Foundation) guidelines and latest scientific evidence.</span>
                    </li>
                    <li className="flex gap-3">
                      <Heart className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Collaborative Approach</strong> - We partner with ERP therapists because combined treatment works best. We also coordinate with your primary care provider and other mental health professionals.</span>
                    </li>
                    <li className="flex gap-3">
                      <Video className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Flexible Appointment Options</strong> - Choose between in-person visits at our Winter Park office or convenient telehealth appointments. Both provide the same quality psychiatric care for your OCD.</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Frequently Asked Questions About OCD Psychiatry
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">What medications do OCD psychiatrists prescribe?</h3>
                    <p className="text-muted-foreground">
                      OCD psychiatrists typically prescribe serotonin reuptake inhibitors (SRIs) including SSRIs like fluoxetine, sertraline, fluvoxamine, and paroxetine, as well as the tricyclic antidepressant clomipramine. For OCD, these medications are often prescribed at higher doses than for depression - sometimes 2-3 times higher. Our Orlando psychiatrists carefully titrate dosing to find your optimal treatment.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">How is OCD medication different from anxiety medication?</h3>
                    <p className="text-muted-foreground">
                      While SSRIs treat both OCD and anxiety, OCD typically requires higher doses and longer treatment duration. Unlike general anxiety, benzodiazepines (like Xanax) are not effective for OCD core symptoms. OCD also often requires 8-12 weeks or longer to see full medication benefits, compared to 4-6 weeks for depression or anxiety.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Do I need both medication and therapy for OCD?</h3>
                    <p className="text-muted-foreground">
                      Research shows that combining medication with Exposure and Response Prevention (ERP) therapy provides the best outcomes for most OCD patients. However, some people do well with medication alone, and others prefer to start with one treatment before adding another. We'll work with you to determine the best approach for your situation.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Will I need to take OCD medication forever?</h3>
                    <p className="text-muted-foreground">
                      Treatment duration varies by individual. Guidelines recommend continuing medication for at least 1-2 years after achieving good symptom control. Some patients successfully taper off medication, especially if they've completed ERP therapy. Others benefit from longer-term medication. We regularly reassess your progress and treatment needs.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">How quickly can I see an OCD psychiatrist in Orlando?</h3>
                    <p className="text-muted-foreground">
                      We typically offer same-week appointments for new OCD patients. Call us at (386) 848-8751 and our scheduling team will find the earliest available appointment with one of our OCD specialist psychiatrists in Orlando.
                    </p>
                  </div>
                </div>
              </section>

              <LocalizedContentMultiple 
                cities={["orlando", "winter-park"]}
                variant="full"
              />

            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Schedule OCD Evaluation</h3>
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
                        Call (386) 848-8751
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
                    <Link href="/psychiatrist-orlando" className="block text-sm text-primary hover:underline font-medium">
                      Psychiatrist Orlando
                    </Link>
                    <Link href="/what-we-treat/ocd" className="block text-sm text-primary hover:underline">
                      OCD Treatment
                    </Link>
                    <Link href="/anxiety-psychiatrist-orlando" className="block text-sm text-primary hover:underline">
                      Anxiety Psychiatrist Orlando
                    </Link>
                    <Link href="/services" className="block text-sm text-primary hover:underline">
                      Medication Management
                    </Link>
                    <Link href="/telepsychiatry-orlando" className="block text-sm text-primary hover:underline">
                      Telepsychiatry Orlando
                    </Link>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-3">Insurance Accepted</h3>
                  <div className="space-y-2">
                    <Link href="/psychiatrist-orlando-accepts-cigna" className="block text-sm text-primary hover:underline">
                      Cigna Psychiatrist Orlando
                    </Link>
                    <Link href="/psychiatrist-orlando-accepts-bcbs" className="block text-sm text-primary hover:underline">
                      BCBS Psychiatrist Orlando
                    </Link>
                    <Link href="/psychiatrist-orlando-accepts-aetna" className="block text-sm text-primary hover:underline">
                      Aetna Psychiatrist Orlando
                    </Link>
                    <Link href="/therapist-accepts-umr" className="block text-sm text-primary hover:underline">
                      UMR Psychiatrist Orlando
                    </Link>
                    <Link href="/psychiatrist-orlando-accepts-united-healthcare" className="block text-sm text-primary hover:underline">
                      United Healthcare Psychiatrist
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="py-16 bg-muted" id="contact-form">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-sans font-bold text-foreground mb-4">
                Schedule Your OCD Treatment Appointment
              </h2>
              <p className="text-lg text-muted-foreground">
                Same-week appointments available. Most insurance accepted. Adults 18+ only.
              </p>
            </div>
            <LeadCaptureForm therapyName="OCD Psychiatry" />
          </div>
        </section>

        <TrustFactors />
        
        <ReviewsAndBadges />
      </main>
      <SiteFooter />
    </div>
  );
}
