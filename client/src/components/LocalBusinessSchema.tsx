import { useEffect } from "react";
import { buildLocalBusinessSchema } from "@/lib/structuredData";

interface LocalBusinessSchemaProps {
  city: string;
  serviceType: "psychiatry" | "therapy";
  name: string;
  description: string;
  slug: string;
}

export default function LocalBusinessSchema({ 
  city, 
  serviceType, 
  description,
  slug 
}: LocalBusinessSchemaProps) {
  useEffect(() => {
    const localBusinessSchema = buildLocalBusinessSchema({
      city,
      serviceType,
      description,
      slug
    });

    let script = document.querySelector(`script[type="application/ld+json"][data-schema="local-business-${slug}"]`);
    
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-schema', `local-business-${slug}`);
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(localBusinessSchema);

    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [city, serviceType, description, slug]);

  return null;
}
