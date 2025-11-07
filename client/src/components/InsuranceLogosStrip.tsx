import { useQuery } from "@tanstack/react-query";
import type { InsuranceProvider } from "@shared/schema";

export default function InsuranceLogosStrip() {
  const { data: providers } = useQuery<InsuranceProvider[]>({
    queryKey: ["/api/insurance-providers"],
  });

  const topProviders = providers?.slice(0, 6);

  return (
    <div className="border-y bg-card py-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-sm text-center text-muted-foreground mb-4 font-medium">
          Insurance Plans We Accept
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          {topProviders?.map((provider) => (
            <div 
              key={provider.id}
              className="h-12 w-24 md:h-14 md:w-28 flex items-center justify-center transition-all opacity-100 hover:opacity-70"
              data-testid={`logo-insurance-${provider.slug}`}
            >
              <img 
                src={provider.logo} 
                alt={`${provider.name} accepted`}
                className="max-h-full max-w-full object-contain"
                width={112}
                height={56}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
