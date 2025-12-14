import { useQuery } from "@tanstack/react-query";
import { Loader2, Mail, Phone } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import type { TeamMember } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
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
              Meet Our Team
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Board-certified psychiatrists, licensed therapists, and mental health counselors dedicated to your wellness. Our experienced team provides compassionate, collaborative care in Winter Park and Orlando.
            </p>
          </div>
        </div>

        <section className="py-16 md:py-20 bg-card border-y">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-sans font-bold text-foreground mb-6 text-center">Expert, Collaborative Care</h2>
              
              <p className="text-foreground leading-relaxed mb-6">
                Our team of board-certified psychiatrists, licensed therapists, and psychiatric nurse practitioners work together to provide comprehensive mental health care. Each provider brings specialized expertise in treating <Link href="/anxiety-disorders" className="text-primary hover:underline font-medium">anxiety</Link>, <Link href="/depression" className="text-primary hover:underline font-medium">depression</Link>, <Link href="/adhd" className="text-primary hover:underline font-medium">ADHD</Link>, <Link href="/ptsd" className="text-primary hover:underline font-medium">PTSD</Link>, and other conditions.
              </p>

              <p className="text-foreground leading-relaxed mb-6">
                What sets us apart is our collaborative approach. Our providers consult with one another to ensure you receive coordinated care. When appropriate, your treatment may combine <Link href="/services" className="text-primary hover:underline font-medium">medication management</Link> with <Link href="/therapy" className="text-primary hover:underline font-medium">therapy sessions</Link> for better outcomes. We'll help match you with the right provider for your needs during your initial consultation.
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
                    <div className="aspect-[4/5] rounded-t-lg overflow-hidden bg-muted">
                      {member.image ? (
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover object-top" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                          <span className="text-5xl font-semibold text-primary/40">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
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
