import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Loader2, CheckCircle2, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import type { TeamMember } from "@shared/schema";

export default function TeamMemberDetail() {
  const [, params] = useRoute("/team/:slug");
  const slug = params?.slug || "";

  const { data: member, isLoading } = useQuery<TeamMember>({
    queryKey: ["/api/team-members/slug", slug],
    queryFn: async () => {
      const response = await fetch(`/api/team-members/slug/${slug}`);
      if (!response.ok) throw new Error("Team member not found");
      return response.json();
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Provider Not Found</h1>
            <Button asChild>
              <Link href="/team">Back to Team</Link>
            </Button>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      
      <main className="flex-1">
        <div className="relative bg-gradient-to-br from-primary/5 to-background py-16 md:py-24 border-b">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="aspect-square rounded-2xl overflow-hidden border-2 border-primary/10 shadow-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    data-testid="img-provider-photo"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3" data-testid="text-provider-name">
                  {member.name}
                </h1>
                <p className="text-xl text-primary font-medium mb-6" data-testid="text-provider-credentials">
                  {member.credentials}
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed mb-8" data-testid="text-provider-bio">
                  {member.bio}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" asChild data-testid="button-schedule-appointment">
                    <Link href="/request-appointment">
                      <Calendar className="h-5 w-5 mr-2" />
                      Schedule Appointment
                    </Link>
                  </Button>
                  {member.doxyUrl && (
                    <Button size="lg" variant="outline" asChild data-testid="button-virtual-visit">
                      <a href={member.doxyUrl} target="_blank" rel="noopener noreferrer">
                        Start Virtual Visit
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                Areas of Specialization
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed" data-testid="text-specialties">
                {member.specialties}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                Education & Training
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed" data-testid="text-education">
                {member.education}
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              Treatment Approach
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed" data-testid="text-approach">
              {member.approach}
            </p>
          </div>
        </div>

        <div className="border-t bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              Schedule your appointment with {member.name.split(' ')[0]} today. We offer same-week appointments and accept most major insurance plans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <Button size="lg" className="flex-1" asChild data-testid="button-request-appointment-cta">
                <Link href="/request-appointment">
                  Request Appointment
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="flex-1" asChild data-testid="button-call-now-cta">
                <a href="tel:3868488751" className="flex items-center justify-center gap-2">
                  <Phone className="h-5 w-5" />
                  <span>Call (386) 848-8751</span>
                </a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-foreground/70">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Same-week appointments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Most insurance accepted</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Virtual visits available</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
