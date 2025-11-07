import healthgradesLogo from "@assets/healthgrades-logo.png";
import zocdocLogo from "@assets/logo_lockup_positive_rgb_1761921702261.png";
import googleLogo from "@assets/google-wordmark.webp";
import yelpLogo from "@assets/image_1761925935867.png";

const VERIFICATION_BADGES = [
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

export default function VerifiedOnBadge() {
  return (
    <div className="inline-flex items-center gap-3 bg-white dark:bg-card px-6 py-3 rounded-full shadow-sm border border-border">
      <span className="text-sm font-semibold text-foreground whitespace-nowrap">
        Verified On
      </span>
      <div className="flex items-center gap-3">
        {VERIFICATION_BADGES.map((platform) => (
          <div
            key={platform.name}
            className="flex items-center justify-center w-auto"
            data-testid={`verified-badge-${platform.name.toLowerCase()}`}
          >
            <img 
              src={platform.logo} 
              alt={platform.alt}
              className={`object-contain opacity-90 ${
                platform.name === "Healthgrades" 
                  ? "h-15" 
                  : platform.name === "Zocdoc"
                  ? "h-5"
                  : "h-4"
              }`}
              width={platform.name === "Healthgrades" ? 120 : platform.name === "Zocdoc" ? 80 : 52}
              height={platform.name === "Healthgrades" ? 60 : platform.name === "Zocdoc" ? 20 : 16}
              style={{ 
                maxHeight: platform.name === "Healthgrades" ? "60px" : platform.name === "Google" ? "16px" : "20px",
                width: "auto"
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
