import { Brain, Heart, Users, Activity } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { Treatment } from "@shared/schema";

const iconMap: Record<string, any> = {
  Brain,
  Heart,
  Users,
  Activity,
};

export default function TreatmentsSection() {
  const { data: treatments } = useQuery<Treatment[]>({
    queryKey: ["/api/treatments"],
  });

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatments?.map((treatment, index) => {
            const Icon = iconMap[treatment.icon] || Brain;
            return (
              <div
                key={treatment.id}
                className="rounded-2xl border border-card-border bg-background p-8 hover-elevate transition-transform duration-200 hover:scale-[1.02]"
                data-testid={`treatment-${index}`}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-foreground">
                  {treatment.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  {treatment.shortDescription}
                </p>
                <Link
                  href={`/${treatment.slug}`}
                  className="inline-flex items-center text-primary font-medium hover:underline"
                  data-testid={`link-treatment-${index}`}
                >
                  Learn More →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
