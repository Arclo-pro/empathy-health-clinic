import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Loader2 } from "lucide-react";
import ProviderCoverage from "./ProviderCoverage";
import TreatmentDetail from "./TreatmentDetail";
import NotFound from "./not-found";

export default function PageBySlug() {
  const [, params] = useRoute("/:slug");
  const slug = params?.slug || "";

  const { data: insuranceProvider, isLoading: loadingInsurance } = useQuery({
    queryKey: ["/api/insurance-providers/slug", slug],
    queryFn: async () => {
      const response = await fetch(`/api/insurance-providers/slug/${slug}`);
      if (!response.ok) return null;
      return response.json();
    },
    enabled: !!slug,
    retry: false,
  });

  const { data: treatment, isLoading: loadingTreatment } = useQuery({
    queryKey: ["/api/treatments/slug", slug],
    queryFn: async () => {
      const response = await fetch(`/api/treatments/slug/${slug}`);
      if (!response.ok) return null;
      return response.json();
    },
    enabled: !!slug && !insuranceProvider,
    retry: false,
  });

  if (loadingInsurance || loadingTreatment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (insuranceProvider) {
    return <ProviderCoverage />;
  }

  if (treatment) {
    return <TreatmentDetail />;
  }

  return <NotFound />;
}
