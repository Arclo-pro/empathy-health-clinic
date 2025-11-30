import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { trackEvent } from "@/lib/analytics";
import type { TeamMember } from "@shared/schema";

export default function TeamSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: teamMembers } = useQuery<TeamMember[]>({
    queryKey: ["/api/team-members"],
  });

  const visibleMembers = isExpanded ? teamMembers : teamMembers?.slice(0, 8);
  const hasMore = (teamMembers?.length ?? 0) > 8;

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-medium text-center mb-8 md:mb-10">
          Meet the Team
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {visibleMembers?.map((member, index) => (
            <Link
              key={member.id}
              href={`/team/${member.slug}`}
              className="text-center space-y-4 block"
              data-testid={`link-team-member-${index}`}
              onClick={() => trackEvent('team_member_click', 'engagement', 'Team Section', member.name)}
            >
              <div className="aspect-square rounded-xl border border-border bg-card flex flex-col items-center justify-center hover-elevate transition-transform duration-200 hover:scale-[1.02] p-6 cursor-pointer">
                <img 
                  src={member.image} 
                  alt={`${member.name} ${member.credentials} - Mental Health Provider Orlando FL - Empathy Health Clinic`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                  fetchpriority={index < 4 ? 'high' : 'auto'}
                  width={400}
                  height={400}
                  style={{ aspectRatio: "1/1" }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.parentElement?.querySelector('p');
                    if (fallback) {
                      fallback.classList.remove('hidden');
                      fallback.classList.add('flex');
                    }
                  }}
                />
                <p className="text-sm md:text-base font-medium text-center text-muted-foreground hidden items-center justify-center h-full">
                  Photo Placeholder
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {member.credentials}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsExpanded(!isExpanded)}
              className="gap-2"
              data-testid="button-toggle-team"
            >
              {isExpanded ? (
                <>
                  Show Less
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Show More Team Members
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
