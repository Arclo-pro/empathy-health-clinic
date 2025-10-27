import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Condition, SiteContent } from "@shared/schema";

export default function ConditionsSection() {
  const { data: conditions } = useQuery<Condition[]>({
    queryKey: ["/api/conditions"],
  });

  const { data: content } = useQuery<SiteContent>({
    queryKey: ["/api/site-content"],
  });

  const phone = content?.footerPhone || "386-848-8751";

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-card">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-center mb-6">
          Trusted Therapist & Psychiatrist Orlando for All Mental Health Needs
        </h2>
        <p className="text-lg md:text-xl text-center text-muted-foreground mb-12 max-w-4xl mx-auto">
          Our mental health clinic providers specialize in over 150 conditions and disorders. In addition to traditional, one-on-one sessions, we also offer couples therapy to help address relationship and communication issues.
        </p>
        
        <div className="max-w-3xl mx-auto mb-12">
          <h3 className="text-xl md:text-2xl font-semibold mb-6 text-foreground">
            We can help you treat and manage the following:
          </h3>
          <ul className="space-y-4">
            {conditions?.map((condition, index) => (
              <li key={condition.id} className="flex gap-3" data-testid={`condition-${index}`}>
                <span className="text-primary mt-1">•</span>
                <span className="text-base text-foreground leading-relaxed">{condition.description}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="px-8 py-6 text-lg rounded-full"
            data-testid="button-call-clinic"
            onClick={() => console.log(`Call clicked: ${phone}`)}
          >
            <Phone className="w-5 h-5 mr-2" />
            {phone}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-6 text-lg rounded-full"
            data-testid="button-book-appointment"
            onClick={() => console.log('Book appointment clicked')}
          >
            Book an Appointment
          </Button>
        </div>
      </div>
    </section>
  );
}
