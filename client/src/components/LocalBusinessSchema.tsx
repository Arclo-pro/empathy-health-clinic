import { useEffect } from "react";

interface LocalBusinessSchemaProps {
  city: string;
  serviceType: string;
  name: string;
  description: string;
  slug: string;
}

export default function LocalBusinessSchema({ 
  city, 
  serviceType, 
  name, 
  description,
  slug 
}: LocalBusinessSchemaProps) {
  useEffect(() => {
    const baseUrl = window.location.origin;
    
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": ["MedicalClinic", "Psychiatrist"],
      "@id": `${baseUrl}/locations/${slug}`,
      "name": `Empathy Health Clinic - ${city}`,
      "description": description,
      "url": `${baseUrl}/locations/${slug}`,
      "logo": `${baseUrl}/attached_assets/image_1761618219825.png`,
      "image": `${baseUrl}/attached_assets/stock_images/peaceful_green_fores_98e1a8d8.jpg`,
      "telephone": "+1-386-848-8751",
      "email": "providers@empathyhealthclinic.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2281 Lee Rd Suite 102",
        "addressLocality": "Winter Park",
        "addressRegion": "FL",
        "postalCode": "32810",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.59544,
        "longitude": -81.36537
      },
      "areaServed": [
        {
          "@type": "City",
          "name": city,
          "containedInPlace": {
            "@type": "State",
            "name": "Florida"
          }
        },
        {
          "@type": "City",
          "name": "Winter Park",
          "containedInPlace": {
            "@type": "State",
            "name": "Florida"
          }
        },
        {
          "@type": "City",
          "name": "Orlando",
          "containedInPlace": {
            "@type": "State",
            "name": "Florida"
          }
        },
        {
          "@type": "City",
          "name": "Altamonte Springs",
          "containedInPlace": {
            "@type": "State",
            "name": "Florida"
          }
        },
        {
          "@type": "City",
          "name": "Maitland",
          "containedInPlace": {
            "@type": "State",
            "name": "Florida"
          }
        },
        {
          "@type": "City",
          "name": "Casselberry",
          "containedInPlace": {
            "@type": "State",
            "name": "Florida"
          }
        },
        {
          "@type": "City",
          "name": "Lake Mary",
          "containedInPlace": {
            "@type": "State",
            "name": "Florida"
          }
        }
      ],
      "priceRange": "$$",
      "currenciesAccepted": "USD",
      "paymentAccepted": "Insurance, Credit Card, Cash",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "09:00",
          "closes": "17:00"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": serviceType === "psychiatry" ? "Psychiatric Services" : "Therapy & Counseling Services",
        "itemListElement": serviceType === "psychiatry" ? [
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
              "name": "Mental Health Treatment"
            }
          }
        ] : [
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
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalTherapy",
              "name": "Individual Counseling"
            }
          }
        ]
      },
      "medicalSpecialty": serviceType === "psychiatry" ? [
        "Psychiatry",
        "MentalHealth"
      ] : [
        "Psychology",
        "MentalHealth",
        "Counseling"
      ],
      "sameAs": [
        "https://www.facebook.com/profile.php?id=100083226165903",
        "https://x.com/clinicempathy12",
        "https://www.instagram.com/empathyhealthfl/?hl=en",
        "https://www.tiktok.com/@empathy.health.cl",
        "https://www.linkedin.com/company/empathy-health-clinic/",
        "https://www.youtube.com/@EmpathyHealthClinic"
      ]
    };

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
  }, [city, serviceType, name, description, slug]);

  return null;
}
