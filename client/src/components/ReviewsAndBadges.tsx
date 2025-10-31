import zocdocLogo from "@assets/logo_lockup_positive_rgb_1761921702261.png";
import googleLogo from "@assets/google-wordmark.webp";
import healthgradesLogo from "@assets/healthgrades-logo.png";
import goodTherapyLogo from "@assets/stock_images/goodtherapy_logo_off_4f39ac80.jpg";
import yelpLogo from "@assets/image_1761925935867.png";

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
    name: "GoodTherapy",
    logo: goodTherapyLogo,
    alt: "Verified on GoodTherapy"
  },
  {
    name: "Yelp",
    logo: yelpLogo,
    alt: "Verified on Yelp"
  }
];

export default function ReviewsAndBadges() {
  return (
    <section className="py-12 md:py-16 bg-background border-b">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Platform Badges */}
        <div>
          <h3 className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
            Verified On
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {PLATFORM_BADGES.map((platform) => (
              <div
                key={platform.name}
                className="flex items-center justify-center opacity-100 hover:opacity-70 transition-opacity"
                data-testid={`badge-${platform.name.toLowerCase()}`}
              >
                <img 
                  src={platform.logo} 
                  alt={platform.alt}
                  className="h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
