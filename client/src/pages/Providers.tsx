import { useQuery } from "@tanstack/react-query";
import { Loader2, Mail, Phone, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import type { TeamMember } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
const forestBg = "/site-assets/stock_images/misty_forest_morning_dffbe3b2.jpg";
import { trackEvent } from "@/lib/analytics";

export default function Providers() {
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
        title="Mental Health Providers Orlando FL | Psychiatrists"
        description="Find psychiatrists, therapists, and psychiatric nurse practitioners in Orlando and Central Florida. Board-certified providers accepting new patients. Call 386-848-8751."
        keywords={["mental health providers Orlando", "psychiatrists Orlando FL", "therapists Orlando", "psychiatric nurse practitioners Orlando", "mental health professionals Central Florida"]}
        canonicalPath="/providers"
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
              Mental Health Providers in Orlando
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Board-certified psychiatrists, licensed therapists, and psychiatric nurse practitioners dedicated to your mental wellness. Find the right provider for your needs in Orlando and Central Florida.
            </p>
          </div>
        </div>

        <section className="py-12 bg-card border-b">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-sans font-bold text-foreground mb-6 text-center">Find Care Near You</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/providers/orlando"
                className="block p-4 bg-background border rounded-lg hover-elevate text-center"
                data-testid="link-providers-orlando"
                onClick={() => trackEvent('internal_link_click', 'navigation', 'Providers Page', '/providers/orlando')}
              >
                <span className="font-medium text-foreground">Orlando Providers</span>
                <ArrowRight className="h-4 w-4 mx-auto mt-2 text-primary" />
              </Link>
              <Link
                href="/psychiatrist-orlando"
                className="block p-4 bg-background border rounded-lg hover-elevate text-center"
                data-testid="link-psychiatrist-orlando"
                onClick={() => trackEvent('internal_link_click', 'navigation', 'Providers Page', '/psychiatrist-orlando')}
              >
                <span className="font-medium text-foreground">Psychiatrist Hub</span>
                <ArrowRight className="h-4 w-4 mx-auto mt-2 text-primary" />
              </Link>
              <Link
                href="/team"
                className="block p-4 bg-background border rounded-lg hover-elevate text-center"
                data-testid="link-team"
                onClick={() => trackEvent('internal_link_click', 'navigation', 'Providers Page', '/team')}
              >
                <span className="font-medium text-foreground">Meet Our Team</span>
                <ArrowRight className="h-4 w-4 mx-auto mt-2 text-primary" />
              </Link>
              <Link
                href="/services"
                className="block p-4 bg-background border rounded-lg hover-elevate text-center"
                data-testid="link-services"
                onClick={() => trackEvent('internal_link_click', 'navigation', 'Providers Page', '/services')}
              >
                <span className="font-medium text-foreground">Our Services</span>
                <ArrowRight className="h-4 w-4 mx-auto mt-2 text-primary" />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
                Our Mental Health Providers
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
                  data-testid={`link-provider-${index}`}
                  onClick={() => trackEvent('provider_click', 'engagement', 'Providers Page', member.name)}
                >
                  <div
                    className="bg-card border rounded-lg hover-elevate transition-all duration-200 cursor-pointer h-full"
                    data-testid={`provider-card-${index}`}
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

        <section className="py-16 bg-card border-t">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-6">
              Same-Week Appointments Available
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our providers are accepting new patients in Orlando, Winter Park, and throughout Central Florida. Most insurance plans accepted.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                asChild 
                data-testid="button-schedule"
                onClick={() => trackEvent('phone_click', 'conversion', 'Providers Page Phone', '386-848-8751')}
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
                onClick={() => trackEvent('email_click', 'conversion', 'Providers Page Email')}
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
