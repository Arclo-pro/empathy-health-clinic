import { useLocation } from "wouter";
import ConditionPageTemplate from "@/components/ConditionPageTemplate";
import { getConditionPageConfig } from "@/config/conditionPageConfigs";
import NotFound from "@/pages/not-found";

export default function ConditionPage() {
  const [location] = useLocation();
  const config = getConditionPageConfig(location);

  if (!config) {
    return <NotFound />;
  }

  return <ConditionPageTemplate config={config} />;
}
