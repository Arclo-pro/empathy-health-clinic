import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Phone, Mail, Clock, MapPin, Shield, Users, Star, Award, Calendar } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import ShortContactForm from "@/components/ShortContactForm";
import TrustFactors from "@/components/TrustFactors";
import InsuranceSection from "@/components/InsuranceSection";
import { trackEvent } from "@/lib/analytics";

export default function PsychiatricServices() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "Psychiatrist", "LocalBusiness"],
    "name": "Empathy Health Clinic - Psychiatric Services",
    "description": "Board-certified psychiatrists in Winter Park & Orlando, FL. Comprehensive psychiatric care including medication management, psychiatric evaluations, and mental health treatment. Same-week appointments available.",
    "url": "https://empathyhealthclinic.com/psychiatric-services",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1155 Louisiana Ave Suite 202",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32789",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.5946",
      "longitude": "-81.3370"
    },
    "medicalSpecialty": ["Psychiatry", "Mental Health"],
    "priceRange": "$$",
    "areaServed": ["Winter Park", "Orlando", "Maitland", "Altamonte Springs", "Oviedo"]
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Psychiatrist Near Me | Board-Certified Psychiatrists in Winter Park & Orlando FL"
        description="Find the best psychiatrist near you. Board-certified psychiatrists in Winter Park & Orlando specializing in medication management, psychiatric evaluations, anxiety, depression, ADHD, bipolar disorder. Same-week appointments. Most insurance accepted. Call 386-848-8751."
        keywords={["psychiatrist near me", "best psychiatrist near me", "psychiatrist winter park", "psychiatrist orlando", "psychiatric services near me", "mental health psychiatrist", "medication management psychiatrist", "psychiatric nurse practitioner orlando", "find a psychiatrist near me"]}
        canonicalPath="/psychiatric-services"
        jsonLd={jsonLd}
      />
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 border-b">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-6" data-testid="text-page-title">
                Board-Certified Psychiatrists Near You
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                Expert psychiatric care in Winter Park & Orlando, FL. Our board-certified psychiatrists specialize in comprehensive mental health treatment, medication management, and psychiatric evaluations. Same-week appointments available for new patients.
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-foreground">4.8 Google Rating</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-foreground">Board-Certified Psychiatrists</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-foreground">Same-Week Appointments</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" asChild data-testid="button-hero-call">
                  <a 
                    href="tel:3868488751" 
                    className="flex items-center justify-center gap-2"
                    onClick={() => trackEvent('phone_click', 'conversion', 'Psychiatric Services Hero')}
                  >
                    <Phone className="h-5 w-5" />
                    Call (386) 848-8751
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild data-testid="button-hero-request">
                  <Link 
                    href="/request-appointment" 
                    className="flex items-center justify-center gap-2"
                    onClick={() => trackEvent('appointment_request', 'conversion', 'Psychiatric Services Hero')}
                  >
                    <Mail className="h-5 w-5" />
                    Request Appointment
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content with Sidebar */}
        <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2">
            <div className="mb-16">
              <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-6">Expert Psychiatric Services in Winter Park & Orlando</h2>
            
            <p className="text-foreground leading-relaxed mb-6">
              Finding the right psychiatrist near you is essential for effective mental health care. At Empathy Health Clinic, our board-certified psychiatrists in Winter Park and Orlando provide comprehensive psychiatric services for adults and adolescents struggling with <Link href="/anxiety-disorders" className="text-primary hover:underline font-medium">anxiety</Link>, <Link href="/depression" className="text-primary hover:underline font-medium">depression</Link>, <Link href="/adhd-treatment" className="text-primary hover:underline font-medium">ADHD</Link>, <Link href="/bipolar-disorder" className="text-primary hover:underline font-medium">bipolar disorder</Link>, and other mental health conditions. Whether you're seeking a psychiatrist for the first time or looking for a second opinion, we offer same-week appointments and personalized treatment plans tailored to your unique needs.
            </p>

            <p className="text-foreground leading-relaxed mb-6">
              Our team includes board-certified psychiatrists, psychiatric nurse practitioners, and licensed therapists working together to provide integrated mental health care. We accept most major insurance plans including Blue Cross Blue Shield, UnitedHealthcare, Cigna, Aetna, and Medicare. Both in-person and <Link href="/telepsychiatry-orlando" className="text-primary hover:underline font-medium">telehealth appointments</Link> are available for your convenience. Call us today at (386) 848-8751 to schedule with the best psychiatrist near you.
            </p>

            <h3 className="text-2xl font-sans font-semibold text-foreground mb-4 mt-8">Why Choose Our Psychiatrists?</h3>
            
            <ul className="space-y-4 mb-8">
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  <strong>Board-Certified Expertise:</strong> All our psychiatrists are board-certified with extensive experience treating anxiety disorders, depression, ADHD, bipolar disorder, OCD, PTSD, and complex mental health conditions
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  <strong>Same-Week Appointments:</strong> We understand mental health needs can't wait. Most new patients get appointments within 2-5 business days. Call for urgent availability
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  <strong>Comprehensive Care Approach:</strong> Our psychiatrists work alongside licensed therapists to provide both medication management and psychotherapy, ensuring holistic treatment
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  <strong>Flexible Options:</strong> Choose between in-person visits at our Winter Park office or secure telehealth appointments from the comfort of your home
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  <strong>Insurance-Friendly:</strong> We accept most major insurance plans with transparent pricing. Our staff will verify your coverage and explain your out-of-pocket costs upfront
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  <strong>Evidence-Based Treatment:</strong> We use the latest research and FDA-approved medications, regularly monitoring your progress and adjusting treatment for optimal results
                </span>
              </li>
            </ul>
              </div>
            </div>

            {/* Services Grid */}
            <div className="mb-16">
              <h2 className="text-3xl font-sans font-bold text-foreground mb-8">Our Psychiatric Services</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="hover-elevate active-elevate-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Medication Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Expert psychiatric medication management with personalized treatment plans. Our psychiatrists carefully select, monitor, and adjust medications to effectively manage your symptoms while minimizing side effects.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />Antidepressant management (SSRIs, SNRIs)</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />Anti-anxiety medication (benzodiazepines, buspirone)</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />ADHD stimulant & non-stimulant medications</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />Mood stabilizers for bipolar disorder</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />Antipsychotic medications when appropriate</li>
                    </ul>
                    <Button variant="outline" className="mt-4 w-full" asChild data-testid="button-med-management">
                      <Link href="/medication-management">
                        Learn More About Medication Management
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover-elevate active-elevate-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Psychiatric Evaluations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Comprehensive diagnostic psychiatric evaluations to accurately assess your mental health. Our psychiatrists conduct thorough assessments including symptom review, medical history, and diagnostic testing.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />Initial diagnostic evaluations (60-90 minutes)</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />ADHD testing and diagnosis</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />Anxiety and depression assessments</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />Second opinion consultations</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />Treatment-resistant case reviews</li>
                    </ul>
                    <Button variant="outline" className="mt-4 w-full" asChild data-testid="button-evaluation">
                      <Link href="/psychiatric-evaluation">
                        Schedule a Psychiatric Evaluation
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover-elevate active-elevate-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Integrated Mental Health Care
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Collaborative treatment combining psychiatry and psychotherapy. Our psychiatrists work alongside licensed therapists to provide comprehensive care addressing both biological and psychological aspects of mental health.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />Combined medication + therapy approach</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />Care coordination between providers</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />Regular progress monitoring and adjustments</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />Therapy referrals (CBT, DBT, EMDR)</li>
                    </ul>
                    <Button variant="outline" className="mt-4 w-full" asChild data-testid="button-therapy">
                      <Link href="/therapy">
                        Explore Therapy Services
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover-elevate active-elevate-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Ongoing Psychiatric Care
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Long-term psychiatric care with consistent medication monitoring and mental health support. Regular follow-up appointments to track progress, manage side effects, and optimize your treatment plan.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />Monthly or quarterly medication reviews</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />Symptom tracking and adjustments</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />Lab work monitoring when needed</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />Crisis support and medication changes</li>
                    </ul>
                    <Button variant="outline" className="mt-4 w-full" asChild data-testid="button-request">
                      <Link href="/request-appointment">
                        Become a Patient
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-sans font-bold text-foreground mb-8 text-center">Frequently Asked Questions About Psychiatrists</h2>
              
              <div className="space-y-6">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">What's the difference between a psychiatrist and a therapist?</h3>
                  <p className="text-muted-foreground mb-3">
                    Psychiatrists are medical doctors (MDs or DOs) who specialize in mental health. They can prescribe medications, order lab tests, and provide medical treatment for mental health conditions. Therapists (psychologists, counselors, social workers) provide talk therapy but cannot prescribe medications. At Empathy Health Clinic, our psychiatrists and therapists work together to provide comprehensive care—medication management from our psychiatrists combined with psychotherapy from our licensed therapists.
                  </p>
                  <Button variant="outline" asChild data-testid="button-faq-schedule">
                    <a href="tel:3868488751" onClick={() => trackEvent('phone_click', 'conversion', 'Psychiatric Services FAQ')}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call to Learn More: (386) 848-8751
                    </a>
                  </Button>
                </div>

                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">How do I know if I need to see a psychiatrist?</h3>
                  <p className="text-muted-foreground">
                    You should consider seeing a psychiatrist if you're experiencing persistent mental health symptoms that interfere with daily life, such as: ongoing sadness or depression lasting more than two weeks, severe anxiety or panic attacks, difficulty concentrating or completing tasks (ADHD symptoms), extreme mood swings, thoughts of self-harm, or if previous therapy alone hasn't been effective. Psychiatrists are especially helpful when medication may be beneficial for managing symptoms like depression, anxiety, ADHD, bipolar disorder, or OCD. Many people see a psychiatrist for medication management while also working with a therapist for talk therapy.
                  </p>
                </div>

                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">How much does it cost to see a psychiatrist in Orlando?</h3>
                  <p className="text-muted-foreground">
                    Most psychiatry appointments are covered by insurance. At Empathy Health Clinic, we accept major insurance plans including Blue Cross Blue Shield, UnitedHealthcare, Cigna, Aetna, Humana, and Medicare. With insurance, typical copays range from $0-$75 per visit depending on your plan. Initial psychiatric evaluations (60-90 minutes) may have a higher copay than follow-up medication management visits (15-30 minutes). For self-pay patients without insurance, initial evaluations start at $300-400, with follow-up visits starting at $150-250. Call us to verify your specific insurance coverage and out-of-pocket costs: (386) 848-8751.
                  </p>
                </div>

                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">Are your psychiatrists board-certified?</h3>
                  <p className="text-muted-foreground">
                    Yes! All psychiatrists at Empathy Health Clinic are board-certified by the American Board of Psychiatry and Neurology. Board certification means they've completed medical school, a 4-year psychiatry residency, and passed rigorous national exams demonstrating expertise in diagnosing and treating mental health conditions. Our team also includes psychiatric nurse practitioners who work under physician supervision. Board certification ensures you're receiving care from highly trained mental health professionals who stay current with the latest evidence-based treatments.
                  </p>
                </div>

                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">Do you offer telehealth psychiatry appointments?</h3>
                  <p className="text-muted-foreground">
                    Yes! We offer secure telehealth psychiatry appointments through HIPAA-compliant video platforms. Telepsychiatry is just as effective as in-person visits for medication management, psychiatric evaluations, and follow-up care. You can meet with your psychiatrist from the comfort of your home via smartphone, tablet, or computer. Most insurance plans now cover telehealth at the same rate as in-person visits. Telepsychiatry is especially convenient for busy schedules, those with transportation challenges, or patients who prefer the privacy of virtual appointments.
                  </p>
                </div>

                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">How quickly can I get an appointment with a psychiatrist?</h3>
                  <p className="text-muted-foreground">
                    We typically have same-week appointments available for new patients seeking psychiatric care. Most new patients get scheduled within 2-5 business days. If you're experiencing a mental health crisis or urgent symptoms, please mention this when you call (386) 848-8751) and we'll do our best to accommodate you sooner. For non-urgent appointments, you can also request an appointment online and our staff will contact you within 24 hours to schedule. We understand that mental health needs can't wait—that's why we prioritize fast access to our psychiatrists.
                  </p>
                </div>

                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">What conditions do your psychiatrists treat?</h3>
                  <p className="text-muted-foreground">
                    Our board-certified psychiatrists treat a wide range of mental health conditions including: depression (major depressive disorder, persistent depressive disorder), anxiety disorders (generalized anxiety, social anxiety, panic disorder), ADHD (attention-deficit/hyperactivity disorder) in adults and adolescents, bipolar disorder (type I and II), OCD (obsessive-compulsive disorder), PTSD (post-traumatic stress disorder), eating disorders, sleep disorders related to mental health, and substance use disorders. We also provide psychiatric care for treatment-resistant conditions that haven't responded to standard treatments.
                  </p>
                </div>

                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">What should I expect during my first psychiatrist appointment?</h3>
                  <p className="text-muted-foreground mb-3">
                    Your initial psychiatric evaluation typically lasts 60-90 minutes. The psychiatrist will review your symptoms, medical history, family mental health history, current medications, and discuss what's bringing you in for care. They'll ask detailed questions about your mood, sleep, appetite, energy levels, concentration, and how symptoms affect your daily life. Based on this comprehensive assessment, your psychiatrist will provide a diagnosis and discuss treatment options, which may include medication, therapy referrals, or a combination approach. You'll leave with a clear treatment plan and next steps. Bring a list of current medications and any relevant medical records to your first appointment.
                  </p>
                  <Button asChild data-testid="button-faq-request">
                    <Link href="/request-appointment" onClick={() => trackEvent('appointment_request', 'conversion', 'Psychiatric Services FAQ')}>
                      Request Your First Appointment
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>{/* End Main Content Column */}

          {/* Sticky Sidebar - Right Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card className="border-2 border-primary/20">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="text-2xl">Schedule Psychiatric Care</CardTitle>
                  <CardDescription>Same-week appointments. Most insurance accepted.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ShortContactForm service="Psychiatric Services" />
                </CardContent>
              </Card>
              
              {/* Quick Contact Info */}
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Call or Text</h4>
                    <a 
                      href="tel:3868488751" 
                      className="text-2xl font-bold text-primary hover:underline block"
                      data-testid="sidebar-phone"
                      onClick={() => trackEvent('phone_click', 'conversion', 'Psychiatric Services Sidebar')}
                    >
                      386-848-8751
                    </a>
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-2">Location</h4>
                    <p className="text-sm text-muted-foreground">
                      1155 Louisiana Ave Suite 202<br />
                      Winter Park, FL 32789
                    </p>
                    <a 
                      href="https://maps.google.com/?q=1155+Louisiana+Ave+Suite+202+Winter+Park+FL+32789" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline mt-2 inline-block"
                    >
                      Get Directions →
                    </a>
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-2">Hours</h4>
                    <p className="text-sm text-muted-foreground">
                      Mon-Sat: 9:00 AM - 6:00 PM<br />
                      Telehealth & in-person available
                    </p>
                  </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>{/* End Grid */}

        {/* Mid-Page CTA */}
        <div className="bg-primary/5 border-y py-12 my-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-4">Ready to Find the Best Psychiatrist Near You?</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Same-week appointments available. Board-certified psychiatrists. Most insurance accepted. Telehealth and in-person options.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild data-testid="button-mid-cta-call">
                <a href="tel:3868488751" className="flex items-center justify-center gap-2" onClick={() => trackEvent('phone_click', 'conversion', 'Psychiatric Services Mid-CTA')}>
                  <Phone className="h-5 w-5" />
                  Call (386) 848-8751
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-mid-cta-request">
                <Link href="/request-appointment" className="flex items-center justify-center gap-2" onClick={() => trackEvent('appointment_request', 'conversion', 'Psychiatric Services Mid-CTA')}>
                  <Mail className="h-5 w-5" />
                  Request Appointment
                </Link>
              </Button>
            </div>
          </div>
        </div>
        </div>

        {/* Trust Factors & Insurance */}
        <TrustFactors />
        <InsuranceSection />
      </main>

      <SiteFooter />
    </div>
  );
}
