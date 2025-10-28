import { useEffect } from "react";

export default function OrganizationSchema() {
  useEffect(() => {
    const baseUrl = window.location.origin;
    
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": ["MedicalOrganization", "LocalBusiness"],
      "name": "Empathy Health Clinic",
      "description": "Compassionate mental health care and psychiatric services in Florida. Expert treatment for anxiety, depression, and other mental health conditions.",
      "url": baseUrl,
      "logo": `${baseUrl}/attached_assets/stock_images/peaceful_green_fores_98e1a8d8.jpg`,
      "image": `${baseUrl}/attached_assets/stock_images/peaceful_green_fores_98e1a8d8.jpg`,
      "telephone": "+1-386-848-8751",
      "email": "providers@empathyhealthclinic.com",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US",
        "addressRegion": "FL"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "addressCountry": "US"
      },
      "areaServed": {
        "@type": "State",
        "name": "Florida"
      },
      "priceRange": "$$",
      "currenciesAccepted": "USD",
      "paymentAccepted": "Insurance, Credit Card",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "09:00",
          "closes": "17:00"
        }
      ],
      "medicalSpecialty": [
        "Psychiatry",
        "Psychology",
        "MentalHealth"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Mental Health Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalProcedure",
              "name": "Psychiatric Evaluation"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalProcedure",
              "name": "Medication Management"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalTherapy",
              "name": "Psychotherapy"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalTherapy",
              "name": "Cognitive Behavioral Therapy"
            }
          }
        ]
      },
      "sameAs": []
    };

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
