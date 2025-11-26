import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, Heart, Shield, Calendar, Users, MessageCircle, MapPin, Phone, Clock, Star, CheckCircle } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import HeroBackground from "@/components/HeroBackground";
import heroImage from "@assets/stock_images/calm_peaceful_therap_b118766b.jpg";
import { trackEvent } from "@/lib/analytics";
import TherapyFAQ from "@/components/TherapyFAQ";

export default function CouplesCounseling() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    "name": "Couples Counseling & Marriage Therapy",
    "description": "Couples counseling and marriage therapy in Winter Park and Orlando, FL. Evidence-based relationship therapy to improve communication, resolve conflicts, and strengthen your bond.",
    "provider": {
      "@type": "MedicalClinic",
      "name": "Empathy Health Clinic",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1155 Louisiana Ave Suite 202",
        "addressLocality": "Winter Park",
        "addressRegion": "FL",
        "postalCode": "32789"
      },
      "telephone": "386-848-8751"
    },
    "areaServed": ["Orlando", "Winter Park", "Altamonte Springs", "Maitland", "Central Florida"]
  };

  const faqs = [
    {
      question: "What is couples counseling and how does it work?",
      answer: "Couples counseling is a form of therapy that helps partners improve their relationship by addressing communication issues, resolving conflicts, and strengthening emotional bonds. Sessions typically involve both partners meeting with a licensed therapist to discuss challenges, learn new skills, and work toward shared goals. Our therapists use evidence-based approaches like Emotionally Focused Therapy (EFT) and the Gottman Method."
    },
    {
      question: "When should couples consider marriage counseling?",
      answer: "Couples should consider counseling when experiencing ongoing conflicts, communication breakdowns, trust issues, intimacy problems, or major life transitions. You don't need to be in crisis—many couples seek therapy to strengthen an already good relationship. Early intervention often leads to better outcomes, so don't wait until problems become severe."
    },
    {
      question: "How long does couples therapy typically take?",
      answer: "The duration varies based on your specific needs and goals. Some couples see improvement in 8-12 sessions, while others benefit from longer-term therapy. We'll create a personalized treatment plan during your first session and adjust as needed. Many couples notice positive changes within the first few weeks."
    },
    {
      question: "Does insurance cover couples counseling?",
      answer: "Many insurance plans cover couples counseling, including Cigna, Aetna, BCBS, and UMR. Coverage varies by plan, so we recommend calling our office at 386-848-8751 to verify your specific benefits. We'll help you understand your coverage and maximize your insurance benefits."
    },
    {
      question: "Can couples counseling help save a marriage?",
      answer: "Research shows that couples counseling can be highly effective when both partners are committed to the process. Studies indicate that 70% of couples who complete therapy report significant improvements in their relationship. Even if the relationship ends, therapy can help couples separate respectfully and co-parent effectively."
    },
    {
      question: "Do you offer virtual couples counseling?",
      answer: "Yes, we offer telehealth couples counseling sessions for Florida residents. Virtual sessions are just as effective as in-person therapy and offer added convenience. Many couples prefer the flexibility of attending sessions from home together."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Couples Counseling Orlando | Marriage Therapy Near Me"
        description="Couples counseling in Orlando & Winter Park, FL. Expert marriage therapy, relationship counseling. Rebuild trust & communication. Same-week appointments. Call 386-848-8751."
        keywords={["couples counseling near me", "couples counseling Orlando", "marriage counseling near me", "marriage counseling Orlando", "couples therapy near me", "relationship counseling Orlando", "marriage therapist Orlando", "couples therapist Winter Park", "premarital counseling Orlando"]}
        canonicalPath="/couples-counseling"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Couples Counseling & Marriage Therapy in Orlando
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Rebuild connection, improve communication, and strengthen your relationship. Expert couples counseling and marriage therapy from licensed therapists serving Orlando and Winter Park.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              data-testid="button-hero-cta"
              onClick={() => trackEvent('couples_hero_cta', 'conversion', 'Couples Counseling Page')}
            >
              <a href="#contact-form">Schedule Your First Session</a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="bg-background/20 backdrop-blur-sm border-white/30 text-white hover:bg-background/30"
              data-testid="button-hero-phone"
              onClick={() => trackEvent('phone_click', 'conversion', 'Couples Counseling Page - Hero')}
            >
              <a href="tel:386-848-8751">Call 386-848-8751</a>
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
                <span>Same-Week Appointments Available</span>
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
                  <h3 className="font-semibold text-foreground mb-1">Our Winter Park Location</h3>
                  <p className="text-sm text-muted-foreground">
                    1155 Louisiana Ave Suite 202<br />
                    Winter Park, FL 32789
                  </p>
                  <a 
                    href="https://maps.google.com/?q=1155+Louisiana+Ave+Suite+202+Winter+Park+FL+32789" 
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
                    Telehealth available
                  </p>
                  <p className="text-sm text-primary mt-1 font-medium">
                    <CheckCircle2 className="h-4 w-4 inline mr-1" />
                    Accepting new couples
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InsuranceSection />

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Expert Couples Counseling in Orlando & Winter Park
                </h2>
                <p className="text-foreground leading-relaxed mb-4">
                  Every relationship faces challenges. Whether you're dealing with communication breakdowns, trust issues, intimacy concerns, or simply want to strengthen your bond, our licensed couples therapists in Orlando are here to help. At Empathy Health Clinic, we provide a safe, non-judgmental space where both partners can be heard and work toward a healthier relationship.
                </p>
                <p className="text-foreground leading-relaxed mb-4">
                  Our approach to <strong>couples counseling</strong> combines evidence-based techniques from Emotionally Focused Therapy (EFT), the Gottman Method, and other proven modalities. We help couples develop practical communication skills, resolve long-standing conflicts, and rebuild emotional connection.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Issues We Address in Marriage Counseling
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Communication Problems",
                    "Trust & Infidelity Issues",
                    "Intimacy & Connection",
                    "Conflict Resolution",
                    "Parenting Disagreements",
                    "Financial Stress",
                    "Life Transitions",
                    "Premarital Counseling",
                    "Blended Family Challenges",
                    "Relationship Anxiety",
                    "Emotional Distance",
                    "Anger & Resentment"
                  ].map((issue, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{issue}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Our Approach to Relationship Therapy
                </h2>
                <div className="space-y-4">
                  <div className="bg-card border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Heart className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Emotionally Focused Therapy (EFT)</h3>
                        <p className="text-sm text-muted-foreground">
                          A research-backed approach that helps couples identify negative interaction patterns and build secure emotional bonds. EFT has a 70-75% success rate for relationship improvement.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <MessageCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Gottman Method</h3>
                        <p className="text-sm text-muted-foreground">
                          Based on decades of research, the Gottman Method teaches couples practical skills for managing conflict, increasing intimacy, and building friendship within the relationship.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Collaborative Problem-Solving</h3>
                        <p className="text-sm text-muted-foreground">
                          We work with both partners equally, helping you develop shared goals and find solutions that work for your unique relationship dynamics.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Benefits of Couples Therapy
                </h2>
                <ul className="space-y-3">
                  {[
                    "Improved communication and ability to express needs effectively",
                    "Better conflict resolution skills and reduced arguments",
                    "Deeper emotional intimacy and connection",
                    "Restored trust after betrayal or infidelity",
                    "Stronger partnership for parenting and family life",
                    "Tools for navigating major life transitions together",
                    "Prevention of small issues from becoming major problems"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="space-y-6">
              <div id="contact-form" className="bg-card border rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Schedule Your First Session
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Take the first step toward a stronger relationship. Call us to schedule your couples counseling appointment.
                </p>
                <div className="space-y-3">
                  <Button 
                    className="w-full" 
                    size="lg" 
                    asChild
                    data-testid="button-sidebar-call"
                    onClick={() => trackEvent('phone_click', 'conversion', 'Couples Counseling Page - Sidebar')}
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
                    <Link href="/request-appointment">
                      <Calendar className="h-4 w-4 mr-2" />
                      Request Appointment
                    </Link>
                  </Button>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-muted-foreground text-center">
                    Most insurance accepted including Cigna, Aetna, BCBS, UMR
                  </p>
                </div>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/therapy" className="text-sm text-primary hover:underline" data-testid="link-therapy">
                      All Therapy Services →
                    </Link>
                  </li>
                  <li>
                    <Link href="/virtual-therapy" className="text-sm text-primary hover:underline" data-testid="link-virtual-therapy">
                      Virtual Therapy Options →
                    </Link>
                  </li>
                  <li>
                    <Link href="/anxiety-therapy" className="text-sm text-primary hover:underline" data-testid="link-anxiety-therapy">
                      Anxiety Therapy →
                    </Link>
                  </li>
                  <li>
                    <Link href="/depression-counseling" className="text-sm text-primary hover:underline" data-testid="link-depression">
                      Depression Counseling →
                    </Link>
                  </li>
                  <li>
                    <Link href="/insurance" className="text-sm text-primary hover:underline" data-testid="link-insurance">
                      Insurance Information →
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <TherapyFAQ faqs={faqs} heading="Couples Counseling FAQs" />
        </div>

        <TrustFactors />
        <ReviewsAndBadges />
      </main>
      <SiteFooter />
    </div>
  );
}
