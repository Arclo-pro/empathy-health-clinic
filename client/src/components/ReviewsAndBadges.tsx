import zocdocLogo from "@assets/logo_lockup_positive_rgb_1761921702261.png";
import googleLogo from "@assets/google-wordmark.webp";
import healthgradesLogo from "@assets/healthgrades-logo.png";

const PLATFORM_BADGES = [
  {
    name: "Healthgrades",
    logo: healthgradesLogo,
    alt: "Verified on Healthgrades",
    height: "h-12"
  },
  {
    name: "Zocdoc",
    logo: zocdocLogo,
    alt: "Verified on Zocdoc",
    height: "h-10"
  },
  {
    name: "Google",
    logo: googleLogo,
    alt: "Verified on Google",
    height: "h-10"
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
                className="flex items-center justify-center h-14 opacity-100 hover:opacity-70 transition-opacity"
                data-testid={`badge-${platform.name.toLowerCase()}`}
              >
                {platform.logo ? (
                  <img 
                    src={platform.logo} 
                    alt={platform.alt}
                    className={`${platform.height} w-auto`}
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
      </div>
    </section>
  );
}
