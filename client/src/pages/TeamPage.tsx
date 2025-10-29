import { useQuery } from "@tanstack/react-query";
import { Loader2, Mail, Phone } from "lucide-react";
import { Link } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { TeamMember } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import forestBg from "@assets/stock_images/misty_forest_morning_dffbe3b2.jpg";

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
              Our compassionate team of experienced psychiatrists, therapists, and mental health professionals is dedicated to providing exceptional care tailored to your unique needs.
            </p>
          </div>
        </div>

        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {teamMembers?.map((member, index) => (
                <Link
                  key={member.id}
                  href={`/team/${member.slug}`}
                  className="block"
                  data-testid={`link-team-member-${index}`}
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

        <section className="py-16 bg-card border-t">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-6">
              Start Your Journey to Better Mental Health
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our team is here to support you. Schedule a consultation to find the right therapist or psychiatrist for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild data-testid="button-schedule">
                <a href="tel:3868488751" className="gap-2">
                  <Phone className="h-5 w-5" />
                  Call 386-848-8751
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-email">
                <a href="mailto:provider@empathyhealthclinic.com" className="gap-2">
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
