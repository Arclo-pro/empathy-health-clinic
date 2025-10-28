import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { InsuranceProvider } from "@shared/schema";

export default function InsuranceSection() {
  const { data: providers } = useQuery<InsuranceProvider[]>({
    queryKey: ["/api/insurance-providers"],
  });

  const visibleProviders = providers?.slice(0, 8);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-medium text-center mb-8 md:mb-10">
          Accepted Insurance Providers
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
          {visibleProviders?.map((provider, index) => {
            const isUMR = provider.name.toLowerCase().includes('umr');
            return (
              <Link
                key={provider.id}
                href={`/${provider.slug}`}
                className={`aspect-square rounded-xl ${isUMR ? '' : 'border border-border'} bg-card flex flex-col items-center justify-center hover-elevate transition-transform duration-200 hover:scale-[1.02] p-6 cursor-pointer`}
                data-testid={`insurance-${index}`}
              >
              <img 
                src={provider.logo} 
                alt={provider.name}
                className="w-full h-full object-contain"
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
            </Link>
            );
          })}
        </div>
        
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
