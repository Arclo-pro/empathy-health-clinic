import { useQuery } from "@tanstack/react-query";
import { Loader2, Mail, Phone } from "lucide-react";
import { Link } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { TeamMember } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import forestBg from "@assets/stock_images/misty_forest_morning_dffbe3b2.jpg";
import { trackEvent } from "@/lib/analytics";

export default function TeamPage() {
  const { data: teamMembers, isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team-members"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Female Therapists & Psychiatrists Orlando FL | Winter Park"
        description="Female therapists and psychiatrists in Orlando and Winter Park, FL. Compassionate women's mental health care for anxiety, depression, trauma & more. Call 386-848-8751."
        keywords={["female therapist Orlando", "female psychiatrist Orlando FL", "women therapists Winter Park", "female mental health professionals Orlando", "women's therapy Orlando", "female counselor Orlando"]}
        canonicalPath="/team"
      />
      <SiteHeader />
      <main className="flex-1">
        <div className="relative py-20 px-4">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${forestBg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
          </div>
          <div className="container mx-auto max-w-6xl relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 text-white" data-testid="text-page-title">
              Female Therapists & Psychiatrists in Orlando, FL
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Compassionate female therapists and psychiatrists serving Orlando, Winter Park, and Central Florida. Expert women's mental health care for anxiety, depression, trauma, and relationship challenges. Same-week appointments available.
            </p>
          </div>
        </div>

        <section className="py-16 md:py-20 bg-card border-y">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-sans font-bold text-foreground mb-6 text-center">Expert Mental Health Professionals</h2>
              
              <p className="text-foreground leading-relaxed mb-6">
                At Empathy Health Clinic, our team consists of board-certified psychiatrists, licensed therapists, psychiatric nurse practitioners, and mental health counselors who share a common commitment to providing exceptional, compassionate care. Each member of our team brings specialized expertise in treating a wide range of mental health conditions, from common concerns like <Link href="/anxiety-disorders" className="text-primary hover:underline font-medium">anxiety</Link> and <Link href="/depression" className="text-primary hover:underline font-medium">depression</Link> to more complex conditions requiring specialized treatment approaches.
              </p>

              <h3 className="text-2xl font-sans font-semibold text-foreground mb-4 mt-8">Our Collaborative Approach to Care</h3>
              
              <p className="text-foreground leading-relaxed mb-6">
                What sets Empathy Health Clinic apart is our collaborative treatment model. Our psychiatrists and therapists work together as a unified team, consulting with one another to ensure you receive comprehensive, coordinated care. When appropriate, your treatment plan may include both <Link href="/medication-management" className="text-primary hover:underline font-medium">medication management</Link> from one of our psychiatrists and regular <Link href="/therapy" className="text-primary hover:underline font-medium">therapy sessions</Link> with a licensed therapist. This integrated approach often produces better outcomes than either treatment alone.
              </p>

              <p className="text-foreground leading-relaxed mb-6">
                Our providers communicate regularly to discuss your progress and adjust your treatment plan as needed. This means you benefit from multiple expert perspectives while maintaining a cohesive, well-coordinated treatment experience. We believe that the best mental health care happens when clinicians work together, sharing their unique insights and expertise to support your healing journey.
              </p>

              <h3 className="text-2xl font-sans font-semibold text-foreground mb-4 mt-8">Experience and Credentials You Can Trust</h3>
              
              <p className="text-foreground leading-relaxed mb-6">
                Every member of our clinical team holds advanced degrees and maintains active licenses in good standing. Our psychiatrists are board-certified by the American Board of Psychiatry and Neurology, and our therapists hold master's degrees or higher in counseling, psychology, or social work. Beyond their formal credentials, our providers bring years of hands-on clinical experience treating diverse patient populations and mental health conditions.
              </p>

              <p className="text-foreground leading-relaxed mb-6">
                We prioritize ongoing professional development to ensure our team stays current with the latest research, treatment innovations, and best practices in mental health care. Our providers regularly attend conferences, complete continuing education courses, and engage in peer consultation to sharpen their clinical skills. This commitment to excellence means you receive evidence-based care that reflects the most current understanding of mental health treatment.
              </p>

              <h3 className="text-2xl font-sans font-semibold text-foreground mb-4 mt-8">Finding the Right Provider for Your Needs</h3>
              
              <p className="text-foreground leading-relaxed mb-6">
                We understand that the therapeutic relationship is fundamental to successful treatment outcomes. That's why we take care to match you with a provider whose expertise, personality, and approach align with your specific needs and preferences. During your initial consultation, we'll discuss your concerns and goals to help you find the best fit within our team. Whether you're seeking treatment for <Link href="/adhd" className="text-primary hover:underline font-medium">ADHD</Link>, <Link href="/ptsd" className="text-primary hover:underline font-medium">PTSD</Link>, relationship challenges, or other mental health concerns, we have experienced providers ready to support you.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
                Meet Our Providers
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Click on any provider to learn more about their background, specialties, and approach to care
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {teamMembers?.map((member, index) => (
                <Link
                  key={member.id}
                  href={`/team/${member.slug}`}
                  className="block"
                  data-testid={`link-team-member-${index}`}
                  onClick={() => trackEvent('team_member_click', 'engagement', 'Team Page', member.name)}
                >
                  <div
                    className="bg-card border rounded-lg hover-elevate transition-all duration-200 cursor-pointer h-full"
                    data-testid={`team-member-card-${index}`}
                  >
                    <div className="aspect-square rounded-t-lg bg-muted flex items-center justify-center p-4">
                      <Avatar className="w-full h-full rounded-none">
                        <AvatarImage 
                          src={member.image} 
                          alt={member.name} 
                          className="object-contain w-full h-full" 
                        />
                        <AvatarFallback className="text-4xl rounded-none">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-sans font-bold text-foreground mb-2">
                        {member.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {member.credentials}
                      </p>
                      <span className="text-primary font-medium hover:underline">
                        View Profile →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background border-t">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-6">
                  Schedule Your First Appointment
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Connect with one of our female therapists or psychiatrists in Orlando. We'll match you with the right provider for your needs and schedule your first appointment—often within the same week.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Call Us Directly</p>
                      <a href="tel:3868488751" className="text-primary hover:underline text-lg font-medium" data-testid="link-phone">386-848-8751</a>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Email Our Team</p>
                      <a href="mailto:providers@empathyhealthclinic.com" className="text-primary hover:underline" data-testid="link-email">providers@empathyhealthclinic.com</a>
                    </div>
                  </div>
                </div>
              </div>
              <div id="contact-form">
                <LeadCaptureForm therapyName="Team Consultation" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-card border-t">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-6">
              Same-Week Appointments in Orlando
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our female therapists and psychiatrists are accepting new patients in Orlando, Winter Park, and surrounding areas. Most insurance plans accepted.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                asChild 
                data-testid="button-schedule"
                onClick={() => trackEvent('phone_click', 'conversion', 'Team Page Phone', '386-848-8751')}
              >
                <a href="tel:3868488751" className="gap-2">
                  <Phone className="h-5 w-5" />
                  Call 386-848-8751
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                data-testid="button-email"
                onClick={() => trackEvent('email_click', 'conversion', 'Team Page Email')}
              >
                <a href="mailto:providers@empathyhealthclinic.com" className="gap-2">
                  <Mail className="h-5 w-5" />
                  Email Us
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
