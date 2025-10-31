import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { SiGoogle } from "react-icons/si";
import useEmblaCarousel from "embla-carousel-react";
import zocdocLogo from "@assets/logo_lockup_positive_rgb_1761921702261.png";
import googleLogo from "@assets/google-wordmark.webp";
import healthgradesLogo from "@assets/healthgrades-logo.png";

const PLATFORM_BADGES = [
  {
    name: "Healthgrades",
    logo: healthgradesLogo,
    alt: "Verified on Healthgrades"
  },
  {
    name: "Zocdoc",
    logo: zocdocLogo,
    alt: "Verified on Zocdoc"
  },
  {
    name: "Google",
    logo: googleLogo,
    alt: "Verified on Google"
  }
];

const GOOGLE_REVIEWS = [
  {
    id: 1,
    author: "Sarah M.",
    rating: 5,
    date: "2 weeks ago",
    text: "The team at Empathy Health Clinic changed my life. After struggling with anxiety for years, I finally found providers who truly listened and helped me find the right treatment. The medication management has been exceptional, and I'm feeling like myself again.",
    verified: true
  },
  {
    id: 2,
    author: "Michael R.",
    rating: 5,
    date: "1 month ago",
    text: "Outstanding psychiatric care in Winter Park! Dr. Regan and his team are incredibly professional and compassionate. They accept my insurance, scheduling was easy, and the telehealth option is so convenient. Highly recommend for anyone seeking mental health support.",
    verified: true
  },
  {
    id: 3,
    author: "Jennifer L.",
    rating: 5,
    date: "3 weeks ago",
    text: "I was hesitant to seek help for depression, but Empathy Health Clinic made the process comfortable and judgment-free. The therapist I work with is amazing, and I've seen real progress in just a few months. Thank you for giving me hope again!",
    verified: true
  }
];

const GOOGLE_BUSINESS_URL = "https://www.google.com/maps/place/Empathy+Health+Clinic/@28.5954,-81.3654,15z/data=!4m7!3m6!1s0x0:0x0!8m2!3d28.5954!4d-81.3654!15sChVlbXBhdGh5IGhlYWx0aCBjbGluaWOSAQ1tZW50YWxfY2xpbmljmgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVU55ZW5WMVdGOW5SUkFC!16s%2Fg%2F11h0ky7x8m";

export default function ReviewsAndBadges() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="py-12 md:py-16 bg-background border-b">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Platform Badges */}
        <div className="mb-12">
          <h3 className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
            Verified On
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {PLATFORM_BADGES.map((platform) => (
              <div
                key={platform.name}
                className="flex items-center justify-center h-12 opacity-100 hover:opacity-70 transition-opacity"
                data-testid={`badge-${platform.name.toLowerCase()}`}
              >
                {platform.logo ? (
                  <img 
                    src={platform.logo} 
                    alt={platform.alt}
                    className="h-10 w-auto"
                  />
                ) : (
                  <div className="flex items-center gap-2 px-6 py-2 border-2 rounded-lg">
                    <span className="text-xl font-bold text-foreground">{platform.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Google Reviews Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <SiGoogle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-sans font-bold text-foreground">
                What Our Patients Say
              </h2>
            </div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-lg font-semibold text-foreground">5.0</span>
              <span className="text-muted-foreground ml-1">on Google</span>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {GOOGLE_REVIEWS.map((review) => (
                  <div key={review.id} className="flex-[0_0_100%] min-w-0 px-4">
                    <Card className="p-6 md:p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground" data-testid={`review-author-${review.id}`}>
                              {review.author}
                            </h4>
                            {review.verified && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                Verified
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-foreground leading-relaxed" data-testid={`review-text-${review.id}`}>
                        "{review.text}"
                      </p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <Button
              size="icon"
              variant="outline"
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full shadow-lg"
              aria-label="Previous review"
              data-testid="button-prev-review"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full shadow-lg"
              aria-label="Next review"
              data-testid="button-next-review"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {GOOGLE_REVIEWS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`w-11 h-11 flex items-center justify-center rounded-full transition-all ${
                    index === selectedIndex
                      ? "bg-primary/10"
                      : "hover:bg-muted/50"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                  data-testid={`button-review-${index + 1}`}
                >
                  <div className={`h-2 w-2 rounded-full transition-all ${
                    index === selectedIndex
                      ? "bg-primary scale-125"
                      : "bg-muted-foreground/30"
                  }`} />
                </button>
              ))}
            </div>
          </div>

          {/* Read More Reviews Button */}
          <div className="text-center mt-8">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2"
              data-testid="button-read-more-reviews"
            >
              <a href={GOOGLE_BUSINESS_URL} target="_blank" rel="noopener noreferrer">
                <SiGoogle className="h-4 w-4" />
                Read More Reviews on Google
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
