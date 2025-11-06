import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, Monitor, Shield, Calendar, Clock, Video, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import type { TeamMember } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import TrustFactors from "@/components/TrustFactors";
import HeroBackground from "@/components/HeroBackground";
import heroImage from "@assets/stock_images/professional_healthc_955227e9.jpg";
import { trackEvent } from "@/lib/analytics";

export default function VirtualTherapy() {
  const { data: allTeamMembers, isLoading: loadingTeam } = useQuery<TeamMember[]>({
    queryKey: ["/api/team-members"],
  });

  // Filter out Dr. Glenn from virtual visits
  const teamMembers = allTeamMembers?.filter(member => member.slug !== 'dr-robert-glenn');
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Virtual Psychiatry & Therapy Services - Empathy Health Clinic",
    "description": "Online psychiatry and therapy services throughout Florida. Secure telehealth appointments for medication management, therapy, and mental health treatment.",
    "provider": {
      "@type": "MedicalClinic",
      "name": "Empathy Health Clinic",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2153 Park Center Drive",
        "addressLocality": "Winter Park",
        "addressRegion": "FL",
        "postalCode": "32792"
      },
      "telephone": "386-848-8751"
    },
    "areaServed": "Florida"
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Virtual Psychiatry & Therapy Florida | Telehealth Mental Health"
        description="Online psychiatry and therapy throughout Florida. Secure telehealth appointments for medication management, counseling, and mental health treatment. Same-week availability. Most insurance accepted."
        keywords={["virtual psychiatry Florida", "telehealth psychiatry", "online therapy Florida", "virtual mental health", "telepsychiatry Orlando", "online psychiatrist Florida", "blue cross blue shield telehealth psychiatry", "cigna therapy online", "virtual EMDR therapy"]}
        canonicalPath="/virtual-therapy"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroBackground imageSrc={heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            Virtual Psychiatry & Therapy Across Florida
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            Get professional mental health care from home. Secure, convenient telehealth appointments with licensed psychiatrists and therapists throughout Florida.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="default" 
              size="lg" 
              asChild 
              data-testid="button-hero-cta"
              onClick={() => trackEvent('virtual_therapy_hero_cta', 'conversion', 'Virtual Therapy Page')}
            >
              <a href="#contact-form">Schedule Virtual Appointment</a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="bg-background/20 backdrop-blur-sm border-white/30 text-white hover:bg-background/30"
              data-testid="button-hero-phone"
              onClick={() => trackEvent('phone_click', 'conversion', 'Virtual Therapy Page - Hero')}
            >
              <a href="tel:386-848-8751">Call 386-848-8751</a>
            </Button>
          </div>
        </HeroBackground>

        <div className="bg-primary text-primary-foreground py-3">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center justify-center gap-2 text-sm md:text-base font-medium">
              <Monitor className="h-5 w-5" />
              <span>Serving All of Florida | Most Insurance Accepted | HIPAA-Secure Platform</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Professional Mental Health Care from Anywhere in Florida
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Empathy Health Clinic brings expert psychiatric care and therapy directly to you through secure telehealth appointments. Whether you're in Orlando, Miami, Tampa, Jacksonville, or anywhere in Florida, you can access the same high-quality mental health treatment from the comfort and privacy of your home.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    Our virtual psychiatry and therapy services are just as effective as in-person visits, offering convenience without compromising quality of care. All sessions are conducted through HIPAA-compliant video platforms to protect your privacy and confidentiality.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Virtual Services We Offer
                </h2>
                <div className="prose prose-lg max-w-none">
                  <ul className="space-y-3 text-foreground">
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Psychiatric Medication Management</strong> - Prescription and monitoring of psychiatric medications for depression, anxiety, ADHD, bipolar disorder, and more</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Online Therapy & Counseling</strong> - CBT, DBT, trauma therapy, grief counseling, and other evidence-based therapies</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Virtual EMDR Therapy</strong> - Trauma and PTSD treatment via secure telehealth</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>ADHD Evaluations</strong> - Comprehensive ADHD testing and diagnosis online</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Follow-Up Care</strong> - Ongoing psychiatric follow-ups and medication adjustments</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Crisis Support</strong> - Urgent mental health consultations when you need help fast</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Benefits of Virtual Psychiatry & Therapy
                </h2>
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Save Time</h3>
                      <p className="text-sm text-muted-foreground">No commute, no waiting room. Log in from home, work, or anywhere.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Flexible Scheduling</h3>
                      <p className="text-sm text-muted-foreground">Evening and weekend appointments available</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Privacy & Comfort</h3>
                      <p className="text-sm text-muted-foreground">Receive care in the privacy of your own space</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Monitor className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">HIPAA Secure</h3>
                      <p className="text-sm text-muted-foreground">Fully encrypted, compliant video platform</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  How Virtual Appointments Work
                </h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">1. Schedule Your Appointment</h3>
                    <p className="text-muted-foreground">Contact us by phone or complete the form below to schedule your virtual visit. We'll confirm your appointment time and send you secure video link instructions.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">2. Join from Any Device</h3>
                    <p className="text-muted-foreground">Use your smartphone, tablet, or computer. No special software needed - just click the secure link we provide.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">3. Meet with Your Provider</h3>
                    <p className="text-muted-foreground">Your psychiatrist or therapist will conduct your appointment just like an in-person visit - discussing symptoms, creating treatment plans, and answering questions.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">4. Follow-Up Care</h3>
                    <p className="text-muted-foreground">Prescriptions are sent electronically to your pharmacy. Schedule follow-ups as needed - all from the comfort of home.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Does insurance cover virtual psychiatry?</h3>
                    <p className="text-muted-foreground">Yes! Most insurance plans, including Blue Cross Blue Shield, Cigna, Aetna, and UnitedHealthcare, cover telehealth psychiatry and therapy services. Contact us to verify your benefits.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Can I get prescriptions through virtual visits?</h3>
                    <p className="text-muted-foreground">Absolutely. Our psychiatrists can prescribe and manage medications for depression, anxiety, ADHD, bipolar disorder, and other conditions during virtual appointments. Prescriptions are sent directly to your pharmacy.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Is virtual therapy as effective as in-person?</h3>
                    <p className="text-muted-foreground">Research shows that telehealth therapy and psychiatry are just as effective as in-person treatment for most conditions. Many patients prefer the convenience and comfort of virtual care.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Who can I see for virtual appointments in Florida?</h3>
                    <p className="text-muted-foreground">All Florida residents can access our virtual psychiatry and therapy services. Our providers are licensed in Florida and available statewide.</p>
                  </div>
                </div>
              </section>

              <section id="virtual-visit">
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Start Your Virtual Visit
                </h2>
                <p className="text-muted-foreground mb-6">
                  Click on your provider's card below to enter their virtual waiting room. Make sure you have a scheduled appointment before joining.
                </p>
                
                {loadingTeam ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 mb-8">
                    {teamMembers?.map((member, index) => (
                      <a
                        key={member.id}
                        href={member.doxyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                        data-testid={`link-provider-${index}`}
                        onClick={() => trackEvent('virtual_visit_click', 'conversion', 'Virtual Therapy Provider', member.name)}
                      >
                        <div
                          className="bg-card border rounded-lg hover-elevate transition-all duration-200 cursor-pointer flex gap-4 p-4"
                          data-testid={`provider-card-${index}`}
                        >
                          <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                            <Avatar className="w-full h-full rounded-lg">
                              <AvatarImage 
                                src={member.image} 
                                alt={member.name} 
                                className="object-cover w-full h-full" 
                              />
                              <AvatarFallback className="text-2xl rounded-lg">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-sans font-bold text-foreground mb-1">
                              {member.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              {member.credentials}
                            </p>
                            <span className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                              <Video className="h-4 w-4" />
                              Start Virtual Visit →
                            </span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </section>
            </div>

            <div className="md:col-span-1 space-y-6">

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Related Services
                </h3>
                <div className="space-y-3">
                  <Link 
                    href="/emdr-therapy" 
                    className="block text-primary hover:underline underline-offset-2"
                    data-testid="link-emdr"
                  >
                    → Virtual EMDR Therapy
                  </Link>
                  <Link 
                    href="/adhd-treatment-winter-park" 
                    className="block text-primary hover:underline underline-offset-2"
                    data-testid="link-adhd"
                  >
                    → ADHD Treatment
                  </Link>
                  <Link 
                    href="/anxiety-therapy" 
                    className="block text-primary hover:underline underline-offset-2"
                    data-testid="link-anxiety"
                  >
                    → Anxiety Therapy
                  </Link>
                  <Link 
                    href="/depression-counseling" 
                    className="block text-primary hover:underline underline-offset-2"
                    data-testid="link-depression"
                  >
                    → Depression Counseling
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-sans font-bold text-foreground mb-3">
                Why Choose Empathy Health Clinic
              </h2>
              <p className="text-muted-foreground">
                Professional, secure telehealth mental health care
              </p>
            </div>
            <TrustFactors variant="compact" limit={4} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
