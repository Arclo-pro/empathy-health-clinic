import { useQuery } from "@tanstack/react-query";
import { Loader2, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { TeamMember } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import { trackEvent } from "@/lib/analytics";
const forestBg = "/site-assets/stock_images/peaceful_green_fores_0af17587.jpg";

export default function VirtualVisit() {
  const { data: allTeamMembers, isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team-members"],
  });

  // Filter out Dr. Glenn from virtual visits
  const teamMembers = allTeamMembers?.filter(member => member.slug !== 'dr-robert-glenn');

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
        title="Virtual Visit | Online Mental Health Services"
        description="Connect with your mental health provider from anywhere in Florida through our secure telehealth platform. Convenient online psychiatry and therapy appointments available."
        keywords={["telehealth", "virtual visit", "online therapy", "online psychiatry", "telepsychiatry", "remote mental health", "Florida telehealth"]}
        canonicalPath="/virtual-visit"
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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/90 mb-4">
              <Video className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 text-white" data-testid="text-page-title">
              Virtual Visit
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Connect with your provider from the comfort of your home through our secure telehealth platform. Select your provider below to start your visit.
            </p>
          </div>
        </div>

        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-sans font-bold text-foreground mb-4">
                Choose Your Provider
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Click on your provider's card to enter their virtual waiting room. Make sure you have a scheduled appointment before joining.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {teamMembers?.map((member, index) => (
                <a
                  key={member.id}
                  href={member.doxyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  data-testid={`link-provider-${index}`}
                  onClick={() => trackEvent('virtual_visit_click', 'conversion', 'Virtual Visit Provider', member.name)}
                >
                  <div
                    className="bg-card border rounded-lg hover-elevate transition-all duration-200 cursor-pointer h-full"
                    data-testid={`provider-card-${index}`}
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
                      <span className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                        <Video className="h-4 w-4" />
                        Start Virtual Visit →
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-card border-t">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-6">
              Need to Schedule an Appointment?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              If you don't have a scheduled appointment yet, contact us to book your virtual visit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild data-testid="button-request-appointment">
                <a href="/request-appointment">
                  Request Appointment
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-call-office">
                <a href="tel:3868488751">
                  Call (386) 848-8751
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
