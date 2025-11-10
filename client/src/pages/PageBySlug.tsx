import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Loader2 } from "lucide-react";
import ProviderCoverage from "./ProviderCoverage";
import TreatmentDetail from "./TreatmentDetail";
import TherapyDetail2 from "./TherapyDetail2";
import ConditionDetail from "./ConditionDetail";
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
    enabled: !!slug,
    retry: false,
  });

  const { data: therapy, isLoading: loadingTherapy } = useQuery({
    queryKey: ["/api/therapies/slug", slug],
    queryFn: async () => {
      const response = await fetch(`/api/therapies/slug/${slug}`);
      if (!response.ok) return null;
      return response.json();
    },
    enabled: !!slug,
    retry: false,
  });

  const { data: condition, isLoading: loadingCondition } = useQuery({
    queryKey: ["/api/conditions/slug", slug],
    queryFn: async () => {
      const response = await fetch(`/api/conditions/slug/${slug}`);
      if (!response.ok) return null;
      return response.json();
    },
    enabled: !!slug,
    retry: false,
  });

  // Render as soon as we have a match, don't wait for all queries
  if (insuranceProvider) {
    return <ProviderCoverage />;
  }

  if (treatment) {
    return <TreatmentDetail />;
  }

  if (therapy) {
    return <TherapyDetail2 />;
  }

  if (condition) {
    return <ConditionDetail />;
  }

  // Only show loading if we're still waiting for queries and no match found
  if (loadingInsurance || loadingTreatment || loadingTherapy || loadingCondition) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // All queries completed with no match
  return <NotFound />;
}
