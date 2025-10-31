import { useEffect } from "react";

interface FAQSchemaProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export default function FAQSchema({ faqs }: FAQSchemaProps) {
  useEffect(() => {
    if (!faqs || faqs.length === 0) {
      return;
    }

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

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
