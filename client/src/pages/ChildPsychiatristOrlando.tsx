import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, MapPin, Phone, Clock, Star, CheckCircle, Brain, Shield, Calendar, Users, Video, Award, Baby } from "lucide-react";
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

export default function ChildPsychiatristOrlando() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "Empathy Health Clinic - Child Psychiatrist Orlando FL",
    "description": "Board-certified child and adolescent psychiatrists in Orlando, FL specializing in children's mental health, ADHD, anxiety, depression, behavioral issues, and medication management for kids and teens.",
    "url": "https://empathyhealthclinic.com/child-psychiatrist-orlando",
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
    "medicalSpecialty": "Child & Adolescent Psychiatry"
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Child Psychiatrist Orlando Page', '386-848-8751');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Child Psychiatrist Orlando FL | Pediatric Mental Health Specialists"
        description="Top-rated child and adolescent psychiatrists in Orlando, FL. Expert treatment for children's ADHD, anxiety, depression, behavioral issues. Family-focused care. Same-week appointments. Call 386-848-8751."
        keywords={["child psychiatrist orlando", "child psychiatrist orlando fl", "pediatric psychiatrist orlando", "adolescent psychiatrist orlando", "teen psychiatrist orlando", "child mental health orlando", "kids psychiatrist orlando", "child adhd orlando"]}
        canonicalPath="/child-psychiatrist-orlando"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Child Psychiatrist Orlando
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Board-certified child and adolescent psychiatrists specializing in children's mental health in Orlando. Expert diagnosis and medication management for ADHD, anxiety, depression, and behavioral issues in kids and teens.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              className=""
              data-testid="button-hero-cta"
              onClick={() => trackEvent('child_psychiatrist_orlando_hero_cta', 'conversion', 'Child Psychiatrist Orlando Page')}
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
                <span>Child & Adolescent Specialists</span>
              </div>
              <div className="hidden lg:block h-6 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Family-Focused Care</span>
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
                  <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                  <a 
                    href="tel:386-848-8751" 
                    className="text-lg font-bold text-primary hover:underline"
                    data-testid="link-phone"
                    onClick={handlePhoneClick}
                  >
                    386-848-8751
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Same-week child psychiatry appointments
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3" data-testid="hours-info">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Office Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Mon-Fri: 9:00 AM - 6:00 PM<br />
                    In-person & telehealth available
                  </p>
                  <p className="text-sm text-primary mt-1 font-medium">
                    <CheckCircle2 className="h-4 w-4 inline mr-1" />
                    Accepting new pediatric patients
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
                  Expert Child & Adolescent Psychiatry in Orlando
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    When your child is struggling with mental health challenges, finding the right psychiatric care is crucial. At our <Link href="/psychiatrist-orlando" className="text-primary hover:underline font-medium">Orlando psychiatry clinic</Link>, our board-certified child and adolescent psychiatrists provide comprehensive, compassionate mental health treatment for children and teenagers experiencing ADHD, anxiety, depression, behavioral issues, and other psychiatric conditions.
                  </p>
                  <p className="text-foreground leading-relaxed mb-4">
                    Our Orlando child psychiatrists understand the unique developmental needs of children and adolescents. We take a family-centered approach, working closely with parents, schools, and therapists to support your child's mental health and overall wellbeing. Whether your child is struggling with focus and hyperactivity, experiencing anxiety or mood changes, having behavioral outbursts, or facing other mental health concerns, we provide evidence-based psychiatric evaluations and medication management tailored to their age and specific needs.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    We accept most major insurance plans and offer both in-person appointments at our Winter Park office (convenient to Orlando, Lake Mary, Altamonte Springs, and Maitland) and secure telehealth options. Same-week appointments are typically available because we know that when your child needs help, waiting weeks or months is not acceptable.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Conditions We Treat in Children & Teens
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Our child and adolescent psychiatrists in Orlando have expertise treating:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <ul className="space-y-2 text-foreground">
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>ADHD</strong> - Attention-deficit hyperactivity disorder in children and teens</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Anxiety Disorders</strong> - GAD, separation anxiety, social anxiety, phobias, panic disorder</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Depression</strong> - Major depression, persistent depressive disorder</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Behavioral Disorders</strong> - Oppositional defiant disorder (ODD), conduct disorder</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Bipolar Disorder</strong> - Pediatric bipolar disorder and mood dysregulation</span>
                      </li>
                    </ul>
                    <ul className="space-y-2 text-foreground">
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Autism Spectrum Disorder</strong> - Co-occurring psychiatric conditions in autism</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>OCD</strong> - Obsessive-compulsive disorder in children</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Tic Disorders</strong> - Tourette syndrome, chronic tic disorders</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Trauma & PTSD</strong> - Post-traumatic stress in children and adolescents</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Eating Disorders</strong> - Anorexia, bulimia in adolescents</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Our Child Psychiatry Services
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Brain className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Comprehensive Pediatric Evaluations</h3>
                      <p className="text-muted-foreground">
                        Thorough psychiatric assessments designed for children and adolescents. Our evaluations include parent interviews, child/teen clinical interviews, developmental history, school functioning review, and age-appropriate diagnostic tools to accurately understand your child's mental health needs.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Shield className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Medication Management for Children</h3>
                      <p className="text-muted-foreground">
                        Safe, evidence-based medication treatment for children and adolescents. Our child psychiatrists carefully consider developmental factors, potential side effects, and family preferences when prescribing. We use the lowest effective doses and regularly monitor growth, development, and medication response.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Users className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Family-Centered Treatment</h3>
                      <p className="text-muted-foreground">
                        Collaborative care involving parents and family. We provide parent education about your child's diagnosis, teach behavioral strategies, and work as partners in your child's treatment. We believe parents are essential members of the treatment team.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-card rounded-lg border">
                    <Calendar className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">School Coordination & Support</h3>
                      <p className="text-muted-foreground">
                        Communication with schools and educational teams when appropriate. We can provide documentation for 504 plans or IEPs, collaborate with school psychologists and counselors, and help ensure your child gets needed academic accommodations.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Signs Your Child May Benefit from a Psychiatrist
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Consider scheduling an evaluation if your child is experiencing:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Behavioral Concerns:</h3>
                      <ul className="space-y-2 text-foreground">
                        <li className="flex gap-2"><span className="text-primary">•</span> Frequent tantrums or outbursts</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Defiant or aggressive behavior</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Difficulty controlling impulses</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Problems at school or home</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Inability to focus or sit still</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Emotional Symptoms:</h3>
                      <ul className="space-y-2 text-foreground">
                        <li className="flex gap-2"><span className="text-primary">•</span> Excessive worry or fearfulness</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Persistent sadness or irritability</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Social withdrawal or isolation</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Extreme mood swings</li>
                        <li className="flex gap-2"><span className="text-primary">•</span> Self-harm or suicidal thoughts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Why Choose Our Orlando Child Psychiatrists?
                </h2>
                <div className="prose prose-lg max-w-none">
                  <ul className="space-y-3 text-foreground">
                    <li className="flex gap-3">
                      <Award className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Specialized Pediatric Training</strong> - Our psychiatrists have specialized training in child and adolescent psychiatry beyond general psychiatry training. We understand developmental stages, age-appropriate symptoms, and how mental health conditions manifest differently in children and teens.
                    </span>
                    </li>
                    <li className="flex gap-3">
                      <Calendar className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Fast Access to Care</strong> - Same-week appointments available for new pediatric patients. When your child is struggling, you shouldn't have to wait months to see a child psychiatrist in Orlando.</span>
                    </li>
                    <li className="flex gap-3">
                      <Baby className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Child-Friendly Environment</strong> - Our office provides a comfortable, welcoming environment for children and teens. We use age-appropriate language, create a safe space for kids to express themselves, and help families feel at ease.</span>
                    </li>
                    <li className="flex gap-3">
                      <Users className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Collaborative Approach</strong> - We work as partners with parents, involve families in treatment decisions, coordinate with therapists and schools, and provide education and support to the whole family system.</span>
                    </li>
                    <li className="flex gap-3">
                      <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Safety-Focused Medication Management</strong> - When medications are needed, we prescribe conservatively using evidence-based approaches. We carefully monitor for side effects, track growth and development, and always consider non-medication options first when appropriate.</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  What to Expect at Your Child's First Appointment
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    The initial evaluation typically lasts 60 minutes and includes:
                  </p>
                  <ul className="space-y-2 text-foreground mb-4">
                    <li className="flex gap-2"><span className="text-primary">•</span> <strong>Parent Interview:</strong> Discussion of your concerns, child's symptoms, developmental history, family history, and current functioning</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> <strong>Child/Teen Clinical Interview:</strong> Age-appropriate conversation with your child to understand their perspective and assess symptoms</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> <strong>School & Social History:</strong> Review of academic performance, peer relationships, and behavior in different settings</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> <strong>Diagnosis & Treatment Plan:</strong> Clear explanation of findings, diagnosis if applicable, and comprehensive treatment recommendations</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> <strong>Parent Education:</strong> Information about the condition, treatment options, and strategies to support your child</li>
                  </ul>
                  <p className="text-foreground leading-relaxed">
                    Follow-up medication management visits are typically 20-30 minutes and occur monthly initially, then every 2-3 months once stable.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">At what age can my child see a psychiatrist?</h3>
                    <p className="text-muted-foreground">
                      Our child psychiatrists can evaluate children as young as 5-6 years old, though we most commonly work with school-age children, pre-teens, and teenagers. For very young children (under 5), we may recommend developmental or behavioral specialists first unless there are significant safety concerns.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Is medication always necessary for children?</h3>
                    <p className="text-muted-foreground">
                      No. Medication is one tool among many. For some conditions and severity levels, therapy, behavioral interventions, parent training, or school accommodations may be sufficient. When medications are recommended, it's because evidence suggests they can significantly help and the benefits outweigh risks. Treatment decisions are always made collaboratively with parents.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Are psychiatric medications safe for children?</h3>
                    <p className="text-muted-foreground">
                      Many psychiatric medications have been extensively studied and used safely in children when prescribed by experienced child psychiatrists. We use FDA-approved medications when available, start with low doses, monitor closely for side effects, track growth and development, and adjust treatment based on response. We discuss all risks and benefits with parents.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Do you prescribe ADHD medication for children?</h3>
                    <p className="text-muted-foreground">
                      Yes, our child psychiatrists prescribe ADHD medications (stimulants and non-stimulants) when appropriate after a thorough evaluation. ADHD medications have decades of safety data in children and can significantly improve focus, academic performance, and quality of life. We work closely with families and schools to monitor effectiveness.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Will I be present during my child's appointments?</h3>
                    <p className="text-muted-foreground">
                      For younger children, parents are typically present for the entire visit. For pre-teens and teenagers, we often split the appointment - part with parents for updates and part privately with the teen to build rapport and respect their autonomy. We always discuss confidentiality limits (safety concerns) with teens and families.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Do you work with schools and provide documentation?</h3>
                    <p className="text-muted-foreground">
                      Yes, with parent consent, we can communicate with school personnel, provide documentation for 504 plans or IEPs, and help advocate for appropriate accommodations. We understand that school success is crucial for children's mental health and overall wellbeing.
                    </p>
                  </div>
                </div>
              </section>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Schedule Child Psychiatry Appointment</h3>
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
                    <Link href="/psychiatrist-orlando" className="block text-sm text-primary hover:underline font-medium">
                      Psychiatrist Orlando
                    </Link>
                    <Link href="/psychiatrist-near-me" className="block text-sm text-primary hover:underline">
                      Psychiatrist Near Me
                    </Link>
                    <Link href="/adhd-testing-orlando" className="block text-sm text-primary hover:underline">
                      ADHD Testing
                    </Link>
                    <Link href="/anxiety-therapy" className="block text-sm text-primary hover:underline">
                      Anxiety Treatment
                    </Link>
                    <Link href="/medication-management" className="block text-sm text-primary hover:underline">
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
                Schedule Your Child's Psychiatry Appointment
              </h2>
              <p className="text-lg text-muted-foreground">
                Same-week appointments for children and teens. Most insurance accepted.
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
