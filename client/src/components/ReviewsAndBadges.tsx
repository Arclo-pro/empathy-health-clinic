import zocdocLogo from "@assets/logo_lockup_positive_rgb_1761921702261.png";
import googleLogo from "@assets/google-wordmark.webp";
import healthgradesLogo from "@assets/healthgrades-logo.png";
import yelpLogo from "@assets/image_1761925935867.png";
import goodTherapyLogo from "@assets/image_1761927553793.png";
import scoreMyReviewsLogo from "@assets/image_1761927693804.png";

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
  },
  {
    name: "Yelp",
    logo: yelpLogo,
    alt: "Verified on Yelp"
  },
  {
    name: "GoodTherapy",
    logo: goodTherapyLogo,
    alt: "GoodTherapy Verified Credentials"
  },
  {
    name: "ScoreMyReviews",
    logo: scoreMyReviewsLogo,
    alt: "Score My Reviews"
  }
];

export default function ReviewsAndBadges() {
  return (
    <section className="pt-4 pb-12 md:pb-16 bg-background border-b">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Platform Badges */}
        <div>
          <h3 className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
            Verified On
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {PLATFORM_BADGES.map((platform) => (
              <div
                key={platform.name}
                className={
                  platform.name === "Healthgrades"
                    ? "h-24 w-48 md:h-30 md:w-60 flex items-center justify-center transition-all opacity-100 hover:opacity-70"
                    : "h-12 w-24 md:h-14 md:w-28 flex items-center justify-center transition-all opacity-100 hover:opacity-70"
                }
                data-testid={`badge-${platform.name.toLowerCase()}`}
              >
                <img 
                  src={platform.logo} 
                  alt={platform.alt}
                  className="max-h-full max-w-full object-contain"
                  width={platform.name === "Healthgrades" ? 240 : 112}
                  height={platform.name === "Healthgrades" ? 120 : 56}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
