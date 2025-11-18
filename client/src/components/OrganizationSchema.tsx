import { useEffect } from "react";

export default function OrganizationSchema() {
  useEffect(() => {
    const baseUrl = window.location.origin;
    
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": ["MedicalOrganization", "MedicalClinic", "Psychiatrist"],
      "@id": "https://empathyhealthclinic.com/#organization",
      "name": "Empathy Health Clinic",
      "description": "Compassionate mental health care and psychiatric services in Florida. Expert treatment for anxiety, depression, and other mental health conditions.",
      "url": baseUrl,
      "logo": `${baseUrl}/attached_assets/stock_images/peaceful_green_fores_98e1a8d8.jpg`,
      "image": `${baseUrl}/attached_assets/stock_images/peaceful_green_fores_98e1a8d8.jpg`,
      "telephone": "+1-386-848-8751",
      "email": "providers@empathyhealthclinic.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2281 Lee Rd Suite 102",
        "addressLocality": "Orlando",
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
          "name": "Orlando",
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
          "name": "Lake Mary",
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
        }
      ],
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
            "Friday",
            "Saturday"
          ],
          "opens": "09:00",
          "closes": "17:00"
        }
      ],
      "medicalSpecialty": "Psychiatric",
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
      "sameAs": [
        "https://www.facebook.com/profile.php?id=100083226165903",
        "https://x.com/clinicempathy12",
        "https://www.instagram.com/empathyhealthfl/?hl=en",
        "https://www.tiktok.com/@empathy.health.cl",
        "https://www.linkedin.com/company/empathy-health-clinic/",
        "https://www.youtube.com/@EmpathyHealthClinic"
      ]
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
