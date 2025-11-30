import { useEffect } from "react";
import type { TeamMember } from "@shared/schema";
import { buildPhysicianSchema } from "@/lib/structuredData";

interface PhysicianSchemaProps {
  teamMember: TeamMember;
}

export default function PhysicianSchema({ teamMember }: PhysicianSchemaProps) {
  useEffect(() => {
    if (!teamMember) {
      return;
    }

    const specialties = teamMember.specialties.split(',').map(s => s.trim());
    
    const physicianSchema = buildPhysicianSchema({
      name: teamMember.name,
      credentials: teamMember.credentials,
      image: teamMember.image,
      specialties: specialties,
      bio: teamMember.bio,
      slug: teamMember.slug,
      sameAs: []
    });

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
