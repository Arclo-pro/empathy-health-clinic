import { useEffect } from "react";
import type { TeamMember } from "@shared/schema";

interface PhysicianSchemaProps {
  teamMember: TeamMember;
}

export default function PhysicianSchema({ teamMember }: PhysicianSchemaProps) {
  useEffect(() => {
    if (!teamMember) {
      return;
    }

    const baseUrl = window.location.origin;
    
    const physicianSchema = {
      "@context": "https://schema.org",
      "@type": "Physician",
      "name": teamMember.name,
      "honorificSuffix": teamMember.credentials,
      "image": teamMember.image,
      "url": `${baseUrl}/team/${teamMember.slug}`,
      "description": teamMember.bio,
      "medicalSpecialty": teamMember.specialties.split(',').map(s => s.trim()),
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": teamMember.education
      },
      "worksFor": {
        "@type": "MedicalOrganization",
        "name": "Empathy Health Clinic",
        "url": baseUrl,
        "telephone": "+1-386-848-8751",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Winter Park",
          "addressRegion": "FL",
          "addressCountry": "US"
        }
      },
      "knowsAbout": teamMember.specialties.split(',').map(s => s.trim())
    };

    let script = document.querySelector('script[type="application/ld+json"][data-schema="physician"]');
    
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-schema', 'physician');
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(physicianSchema);

    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [teamMember]);

  return null;
}
