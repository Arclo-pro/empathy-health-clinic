import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Loader2 } from "lucide-react";
import ProviderCoverage from "./ProviderCoverage";
import TreatmentDetail from "./TreatmentDetail";
import TherapyDetail2 from "./TherapyDetail2";
import ConditionDetail from "./ConditionDetail";
import TeamMemberDetail from "./TeamMemberDetail";
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

  const { data: therapy, isLoading: loadingTherapy } = useQuery({
    queryKey: ["/api/therapies/slug", slug],
    queryFn: async () => {
      const response = await fetch(`/api/therapies/slug/${slug}`);
      if (!response.ok) return null;
      return response.json();
    },
    enabled: !!slug && !insuranceProvider && !treatment,
    retry: false,
  });

  const { data: condition, isLoading: loadingCondition } = useQuery({
    queryKey: ["/api/conditions/slug", slug],
    queryFn: async () => {
      const response = await fetch(`/api/conditions/slug/${slug}`);
      if (!response.ok) return null;
      return response.json();
    },
    enabled: !!slug && !insuranceProvider && !treatment && !therapy,
    retry: false,
  });

  const { data: teamMember, isLoading: loadingTeamMember } = useQuery({
    queryKey: ["/api/team-members/slug", slug],
    queryFn: async () => {
      const response = await fetch(`/api/team-members/slug/${slug}`);
      if (!response.ok) return null;
      return response.json();
    },
    enabled: !!slug && !insuranceProvider && !treatment && !therapy && !condition,
    retry: false,
  });

  if (loadingInsurance || loadingTreatment || loadingTherapy || loadingCondition || loadingTeamMember) {
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

  if (therapy) {
    return <TherapyDetail2 />;
  }

  if (condition) {
    return <ConditionDetail />;
  }

  if (teamMember) {
    return <TeamMemberDetail />;
  }

  return <NotFound />;
}
