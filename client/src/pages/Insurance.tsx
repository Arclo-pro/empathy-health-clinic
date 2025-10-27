import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, Phone, Mail } from "lucide-react";
import type { InsuranceProvider } from "@shared/schema";

export default function Insurance() {
  const { data: providers, isLoading } = useQuery<InsuranceProvider[]>({
    queryKey: ["/api/insurance-providers"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Insurance We Accept
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We work with most major insurance providers to make quality mental health care accessible. 
            Click on your insurance provider below to learn more about coverage details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {providers?.map((provider) => (
            <Link key={provider.id} href={`/${provider.slug}`} data-testid={`link-provider-${provider.id}`}>
              <Card className="h-full hover-elevate active-elevate-2 cursor-pointer transition-all">
                <CardHeader className="flex flex-col items-center text-center space-y-4 pb-4">
                  <div className="h-20 w-full flex items-center justify-center">
                    <img
                      src={provider.logo}
                      alt={`${provider.name} logo`}
                      className="max-h-16 max-w-full object-contain"
                      data-testid={`img-provider-logo-${provider.id}`}
                    />
                  </div>
                  <CardTitle className="text-xl" data-testid={`text-provider-name-${provider.id}`}>
                    {provider.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Button variant="outline" className="w-full" data-testid={`button-view-coverage-${provider.id}`}>
                    View Coverage Details
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="bg-card rounded-lg p-8 border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4 text-center">
              What to Expect with Insurance Coverage
            </h2>
            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-foreground">
                  Most insurance plans cover mental health services with similar benefits to medical care
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-foreground">
                  Typical copays range from $25-50 per session, depending on your specific plan
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-foreground">
                  We verify your benefits before your first appointment to avoid surprises
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-foreground">
                  Our team handles all insurance billing and claims on your behalf
                </p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
                Questions About Your Coverage?
              </h3>
              <p className="text-center text-muted-foreground mb-6">
                Our team is here to help verify your benefits and answer any insurance questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" asChild data-testid="button-call-office">
                  <a href="tel:4072604458" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Call (407) 260-4458
                  </a>
                </Button>
                <Button variant="outline" asChild data-testid="button-contact-us">
                  <Link href="/contact" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
