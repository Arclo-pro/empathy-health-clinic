import { Star, Quote } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { SiGoogle } from "react-icons/si";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Testimonial } from "@shared/schema";

// Helper function to get initials from name
function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0].substring(0, 2).toUpperCase();
}

// Helper function to get consistent color for a name
function getAvatarColor(name: string): string {
  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-green-500",
    "bg-orange-500",
    "bg-teal-500",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

// Helper to format date as "X years ago" or "X months ago"
function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "today";
  } else if (diffDays === 1) {
    return "1 day ago";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
}

interface TestimonialsSectionProps {
  limit?: number;
}

export default function TestimonialsSection({ limit }: TestimonialsSectionProps = {}) {
  const { data: allTestimonials } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const testimonials = limit ? allTestimonials?.slice(0, limit) : allTestimonials;

  // Calculate aggregate rating from all testimonials
  const avgRating = allTestimonials?.length
    ? (allTestimonials.reduce((sum, t) => sum + t.rating, 0) / allTestimonials.length).toFixed(1)
    : "5.0";

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-center mb-3">
          Our Testimonials
        </h2>

        {/* Aggregate Google rating header */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <SiGoogle className="w-6 h-6 text-[#4285F4]" />
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-foreground">{avgRating}</span>
          </div>
          <span className="text-muted-foreground">
            from {allTestimonials?.length || 0}+ patient reviews
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials?.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="rounded-xl border bg-card p-6 hover-elevate transition-all flex flex-col"
              data-testid={`testimonial-${index}`}
            >
              {/* Decorative quote icon */}
              <Quote className="w-8 h-8 text-primary/20 mb-3 rotate-180" />

              {/* Review text */}
              <p className="text-sm leading-relaxed text-muted-foreground flex-1 mb-5">
                "{testimonial.text}"
              </p>

              {/* Divider */}
              <div className="border-t pt-4">
                {/* Reviewer info with stars and Google branding */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 shrink-0">
                    {testimonial.profileImage ? (
                      <AvatarImage src={testimonial.profileImage} alt={testimonial.name} />
                    ) : null}
                    <AvatarFallback className={`${getAvatarColor(testimonial.name)} text-white text-sm font-semibold`}>
                      {getInitials(testimonial.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < testimonial.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{formatTimeAgo(testimonial.date)}</span>
                    </div>
                  </div>
                  <SiGoogle className="w-5 h-5 text-[#4285F4] shrink-0" data-testid="google-icon" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
