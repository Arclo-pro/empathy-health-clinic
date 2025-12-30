import { CheckCircle2, Clock, Video, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ComparisonSection() {
  const comparisons = [
    {
      icon: Heart,
      title: "Personalized Care",
      empathy: "Dedicated providers who build long-term relationships with patients",
      competitor: "Large practice with rotating providers and limited continuity",
      color: "text-primary"
    },
    {
      icon: Clock,
      title: "Faster Access",
      empathy: "Same-week appointments available for new and existing patients",
      competitor: "Longer wait times, often weeks to months for initial appointments",
      color: "text-primary"
    },
    {
      icon: Video,
      title: "Telehealth Statewide",
      empathy: "Comprehensive telehealth services available throughout Florida",
      competitor: "Limited telehealth options with geographic restrictions",
      color: "text-primary"
    }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-foreground mb-4">
            Why Choose Empathy Health Clinic?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            See how we compare to other mental health providers in Central Florida
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {comparisons.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="border-2" data-testid={`comparison-card-${index}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className={`h-6 w-6 ${item.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-6">
                      {item.title}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                      <div className="flex items-start gap-3 mb-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm mb-1">Empathy Health Clinic</p>
                          <p className="text-sm text-foreground/80">{item.empathy}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 border border-border">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                          <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
                        </div>
                        <div>
                          <p className="font-semibold text-muted-foreground text-sm mb-1">Other Providers</p>
                          <p className="text-sm text-muted-foreground/70">{item.competitor}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            asChild
            data-testid="button-request-appointment-comparison"
          >
            <a href="/request-appointment">
              Request an Appointment Today
            </a>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Most insurance plans accepted • Same-week appointments available
          </p>
        </div>
      </div>
    </section>
  );
}
