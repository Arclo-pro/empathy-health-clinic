import { useQuery } from "@tanstack/react-query";
import type { InsuranceProvider } from "@shared/schema";

export default function InsuranceSection() {
  const { data: providers } = useQuery<InsuranceProvider[]>({
    queryKey: ["/api/insurance-providers"],
  });

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-center mb-12 md:mb-16">
          Accepted Insurance Providers
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
          {providers?.map((provider, index) => (
            <div
              key={provider.id}
              className="aspect-square rounded-xl border border-border bg-card p-6 flex items-center justify-center hover-elevate transition-transform duration-200 hover:scale-[1.02]"
              data-testid={`insurance-${index}`}
            >
              <p className="text-sm md:text-base font-medium text-center text-card-foreground">
                {provider.name}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="text-primary font-medium hover:underline"
            data-testid="link-view-all-providers"
            onClick={(e) => {
              e.preventDefault();
              console.log('View all providers clicked');
            }}
          >
            View All Providers →
          </a>
        </div>
      </div>
    </section>
  );
}
