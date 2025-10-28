import { useQuery } from "@tanstack/react-query";
import { Loader2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TeamMember } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import forestBg from "@assets/stock_images/peaceful_green_fores_98e1a8d8.jpg";

export default function VirtualVisit() {
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
      <SiteHeader />
      <main className="flex-1">
        <div className="relative py-16 px-4">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${forestBg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20" />
          </div>
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/90 mb-4">
                <Video className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
                Virtual Visit
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto" data-testid="text-hero-description">
                Connect with your provider from the comfort of your home through our secure telehealth platform
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-foreground mb-4">
              Pick Your Provider
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select your provider below to start your virtual visit. Make sure you have a scheduled appointment before joining.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers?.map((member, index) => (
              <div
                key={member.id}
                className="rounded-2xl border border-card-border bg-card p-6 hover-elevate transition-transform duration-200"
                data-testid={`provider-card-${index}`}
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden mb-6 bg-muted">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    data-testid={`img-provider-${index}`}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-2" data-testid={`text-provider-name-${index}`}>
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6" data-testid={`text-provider-credentials-${index}`}>
                    {member.credentials}
                  </p>
                  <Button
                    size="lg"
                    className="w-full gap-2"
                    asChild
                    data-testid={`button-virtual-visit-${index}`}
                  >
                    <a href={member.doxyUrl} target="_blank" rel="noopener noreferrer">
                      <Video className="h-5 w-5" />
                      Start Virtual Visit
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-card border rounded-xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Need to Schedule an Appointment?
              </h3>
              <p className="text-muted-foreground mb-8">
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
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
