import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import type { InsuranceProvider } from "@shared/schema";

export default function InsuranceSection() {
  const { data: providers } = useQuery<InsuranceProvider[]>({
    queryKey: ["/api/insurance-providers"],
  });

  const visibleProviders = providers?.slice(0, 5);
  const totalCount = providers?.length || 0;

  return (
    <section className="py-8 md:py-10 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans font-medium mb-3">
            Find an in-network provider from most insurance plans
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Add your insurance to see in-network mental health providers
          </p>
        </div>
        
        <div className="flex items-center gap-4 mb-6 overflow-x-auto pb-4">
          {visibleProviders?.map((provider, index) => {
            const isUMR = provider.name.toLowerCase().includes('umr');
            return (
              <Link
                key={provider.id}
                href={`/${provider.slug}`}
                className={`flex-shrink-0 w-40 h-24 rounded-lg ${isUMR ? '' : 'border border-border'} bg-card flex items-center justify-center hover-elevate transition-all duration-200 p-4 cursor-pointer`}
                data-testid={`insurance-${index}`}
              >
                <img 
                  src={provider.logo} 
                  alt={provider.name}
                  className="max-w-full max-h-full object-contain"
                  width={160}
                  height={96}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.parentElement?.querySelector('p');
                    if (fallback) {
                      fallback.classList.remove('hidden');
                      fallback.classList.add('flex');
                    }
                  }}
                />
                <p className="text-sm font-medium text-center text-card-foreground hidden items-center justify-center h-full">
                  {provider.name}
                </p>
              </Link>
            );
          })}
          
          <Link 
            href="/insurance" 
            className="flex-shrink-0 text-primary font-medium hover:underline whitespace-nowrap ml-2"
            data-testid="link-view-all-providers"
          >
            See all ({totalCount}+)
          </Link>
        </div>
      </div>
    </section>
  );
}
