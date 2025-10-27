import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { InsuranceProvider } from "@shared/schema";

export default function InsuranceSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: providers } = useQuery<InsuranceProvider[]>({
    queryKey: ["/api/insurance-providers"],
  });

  const visibleProviders = isExpanded ? providers : providers?.slice(0, 4);
  const hasMore = (providers?.length ?? 0) > 4;

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-center mb-12 md:mb-16">
          Accepted Insurance Providers
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
          {visibleProviders?.map((provider, index) => (
            <div
              key={provider.id}
              className="aspect-square rounded-xl border border-border bg-card overflow-hidden flex flex-col items-center justify-center hover-elevate transition-transform duration-200 hover:scale-[1.02]"
              data-testid={`insurance-${index}`}
            >
              <img 
                src={provider.logo} 
                alt={provider.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement?.querySelector('p');
                  if (fallback) {
                    fallback.classList.remove('hidden');
                    fallback.classList.add('flex');
                  }
                }}
              />
              <p className="text-sm md:text-base font-medium text-center text-card-foreground hidden items-center justify-center h-full p-6">
                {provider.name}
              </p>
            </div>
          ))}
        </div>
        
        {hasMore && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsExpanded(!isExpanded)}
              className="gap-2"
              data-testid="button-toggle-insurance"
            >
              {isExpanded ? (
                <>
                  Show Less
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Show More Providers
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
        
        <div className="text-center mt-8">
          <Link 
            href="/insurance" 
            className="text-primary font-medium hover:underline"
            data-testid="link-view-all-providers"
          >
            View All Providers →
          </Link>
        </div>
      </div>
    </section>
  );
}
