import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import * as Icons from "lucide-react";
import type { Therapy } from "@shared/schema";

export default function TherapyPage() {
  const { data: therapies, isLoading } = useQuery<Therapy[]>({
    queryKey: ["/api/therapies"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const sortedTherapies = therapies?.sort((a, b) => a.order - b.order) || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Therapy Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Evidence-based therapeutic approaches tailored to your unique needs. 
            Explore our comprehensive therapy services to find the right path for your healing journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {sortedTherapies.map((therapy) => {
            const IconComponent = (Icons as any)[therapy.icon] || Icons.Heart;
            
            return (
              <Link key={therapy.id} href={`/${therapy.slug}`} data-testid={`link-therapy-${therapy.id}`}>
                <Card className="h-full hover-elevate active-elevate-2 cursor-pointer transition-all">
                  <CardHeader className="flex flex-col items-center text-center space-y-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2" data-testid={`text-therapy-title-${therapy.id}`}>
                        {therapy.title}
                      </CardTitle>
                      <CardDescription data-testid={`text-therapy-description-${therapy.id}`}>
                        {therapy.shortDescription}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button variant="outline" className="w-full" data-testid={`button-learn-more-${therapy.id}`}>
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="bg-card rounded-lg p-8 border">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
              Start Your Healing Journey Today
            </h2>
            <p className="text-muted-foreground mb-6">
              Every journey begins with a single step. Our experienced therapists are here to guide you 
              through evidence-based treatments tailored to your unique needs.
            </p>
            <Button variant="default" size="lg" asChild data-testid="button-schedule-consultation">
              <Link href="/#contact">Schedule a Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
