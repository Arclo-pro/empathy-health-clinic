import { useEffect } from "react";
import { buildOrganizationSchema } from "@/lib/structuredData";

export default function OrganizationSchema() {
  useEffect(() => {
    const organizationSchema = buildOrganizationSchema();

    let script = document.querySelector('script[type="application/ld+json"][data-schema="organization"]');
    
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-schema', 'organization');
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(organizationSchema);

    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
}
