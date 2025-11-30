import { useEffect } from "react";
import { buildInsurancePageSchema } from "@/lib/structuredData";

interface InsuranceSchemaProps {
  insuranceName: string;
  url: string;
}

export default function InsuranceSchema({ insuranceName, url }: InsuranceSchemaProps) {
  useEffect(() => {
    const insuranceSchema = buildInsurancePageSchema({
      insuranceName,
      url
    });

    const schemaId = `insurance-${insuranceName.toLowerCase().replace(/\s+/g, '-')}`;
    let script = document.querySelector(`script[type="application/ld+json"][data-schema="${schemaId}"]`);
    
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-schema', schemaId);
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(insuranceSchema);

    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [insuranceName, url]);

  return null;
}
