import { Brain, Heart, Users, Activity } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Service } from "@shared/schema";

const iconMap: Record<string, any> = {
  Brain,
  Heart,
  Users,
  Activity,
};

export default function ServicesSection() {
  const { data: services } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service, index) => {
            const Icon = iconMap[service.icon] || Brain;
            return (
              <div
                key={service.id}
                className="rounded-2xl border border-card-border bg-background p-8 hover-elevate transition-transform duration-200 hover:scale-[1.02]"
                data-testid={`service-${index}`}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-foreground">
                  {service.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>
                <a
                  href={service.link}
                  className="inline-flex items-center text-primary font-medium hover:underline"
                  data-testid={`link-service-${index}`}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(`Learn more about ${service.title}`);
                  }}
                >
                  Learn More →
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
