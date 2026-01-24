const zocdocLogo = "/site-assets/logos/zocdoc.webp";
const googleLogo = "/site-assets/logos/google.webp";
const healthgradesLogo = "/site-assets/logos/healthgrades.webp";
const yelpLogo = "/site-assets/logos/yelp.webp";
const goodTherapyLogo = "/site-assets/logos/goodtherapy.webp";
const scoreMyReviewsLogo = "/site-assets/logos/scoremyreviews.webp";

const PLATFORM_BADGES = [
  {
    name: "Healthgrades",
    logo: healthgradesLogo,
    alt: "Verified on Healthgrades",
    url: "https://www.healthgrades.com/group-directory/fl-florida/winter-park/empathy-health-clinic-yy3df4x"
  },
  {
    name: "Zocdoc",
    logo: zocdocLogo,
    alt: "Verified on Zocdoc",
    url: "https://www.zocdoc.com/practice/empathy-health-clinic-134285"
  },
  {
    name: "Google",
    logo: googleLogo,
    alt: "Verified on Google",
    url: "https://www.google.com/maps/place/Empathy+Health+Clinic/@28.5970,-81.3614,17z/"
  },
  {
    name: "Yelp",
    logo: yelpLogo,
    alt: "Verified on Yelp",
    url: "https://www.yelp.com/biz/empathy-health-clinic-winter-park"
  },
  {
    name: "GoodTherapy",
    logo: goodTherapyLogo,
    alt: "GoodTherapy Verified Credentials",
    url: "https://www.goodtherapy.org/therapists/profile/empathy-health-clinic"
  },
  {
    name: "ScoreMyReviews",
    logo: scoreMyReviewsLogo,
    alt: "Score My Reviews",
    url: "https://scoremyreviews.com/empathy-health-clinic"
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
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  platform.name === "Healthgrades"
                    ? "h-24 w-48 md:h-30 md:w-60 flex items-center justify-center transition-all opacity-100 hover:opacity-70"
                    : "h-12 w-24 md:h-14 md:w-28 flex items-center justify-center transition-all opacity-100 hover:opacity-70"
                }
                data-testid={`badge-${platform.name.toLowerCase()}`}
                aria-label={`View our profile on ${platform.name}`}
              >
                <img 
                  src={platform.logo} 
                  alt={platform.alt}
                  className="max-h-full max-w-full object-contain"
                  width={platform.name === "Healthgrades" ? 240 : 112}
                  height={platform.name === "Healthgrades" ? 120 : 56}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
