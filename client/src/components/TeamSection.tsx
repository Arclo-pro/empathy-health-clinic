import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TeamMember } from "@shared/schema";

export default function TeamSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: teamMembers } = useQuery<TeamMember[]>({
    queryKey: ["/api/team-members"],
  });

  const visibleMembers = isExpanded ? teamMembers : teamMembers?.slice(0, 8);
  const hasMore = (teamMembers?.length ?? 0) > 8;

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-center mb-12 md:mb-16">
          Meet the Team
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {visibleMembers?.map((member, index) => (
            <div
              key={member.id}
              className="text-center space-y-4"
              data-testid={`team-member-${index}`}
            >
              <Avatar className="w-full aspect-square rounded-lg mx-auto">
                <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                <AvatarFallback className="text-2xl rounded-lg">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {member.credentials}
                </p>
              </div>
            </div>
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
