import { useEffect } from "react";
import { buildFAQSchema } from "@/lib/structuredData";

interface FAQSchemaProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export default function FAQSchema({ faqs }: FAQSchemaProps) {
  useEffect(() => {
    const faqSchema = buildFAQSchema(faqs);
    
    if (!faqSchema) {
      return;
    }

    let script = document.querySelector('script[type="application/ld+json"][data-schema="faq"]');
    
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-schema', 'faq');
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(faqSchema);

    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [faqs]);

  return null;
}
