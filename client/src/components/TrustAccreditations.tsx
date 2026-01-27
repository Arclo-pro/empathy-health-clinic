import { Shield, Award, CheckCircle2, Building2, Heart, Clock } from "lucide-react";

/**
 * Professional accreditation and trust signal badges
 * Displays credentials, compliance certifications, and trust indicators
 * for YMYL (Your Money or Your Life) compliance
 */

interface AccreditationBadge {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ACCREDITATION_BADGES: AccreditationBadge[] = [
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: "HIPAA Compliant",
    description: "Protected health information"
  },
  {
    icon: <Award className="h-6 w-6 text-primary" />,
    title: "Florida Licensed",
    description: "Board-certified providers"
  },
  {
    icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
    title: "NPI Verified",
    description: "National Provider Identifier"
  },
  {
    icon: <Building2 className="h-6 w-6 text-primary" />,
    title: "In-Network",
    description: "Major insurance accepted"
  },
  {
    icon: <Heart className="h-6 w-6 text-primary" />,
    title: "Patient-Centered",
    description: "Compassionate care"
  },
  {
    icon: <Clock className="h-6 w-6 text-primary" />,
    title: "Same-Week Availability",
    description: "Appointments within days"
  }
];

interface TrustAccreditationsProps {
  variant?: "inline" | "grid" | "compact";
  limit?: number;
  className?: string;
  showTitle?: boolean;
}

export default function TrustAccreditations({
  variant = "grid",
  limit,
  className = "",
  showTitle = true
}: TrustAccreditationsProps) {
  const badges = limit ? ACCREDITATION_BADGES.slice(0, limit) : ACCREDITATION_BADGES;

  if (variant === "compact") {
    return (
      <div className={`flex flex-wrap items-center gap-4 ${className}`} data-testid="trust-accreditations-compact">
        {badges.map((badge) => (
          <div
            key={badge.title}
            className="flex items-center gap-2 text-sm text-muted-foreground"
            title={badge.description}
          >
            {badge.icon}
            <span className="font-medium">{badge.title}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={`py-4 border-y ${className}`} data-testid="trust-accreditations-inline">
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="flex items-center gap-2"
              title={badge.description}
            >
              {badge.icon}
              <div className="text-left">
                <p className="font-semibold text-sm text-foreground">{badge.title}</p>
                <p className="text-xs text-muted-foreground hidden md:block">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className={`py-8 bg-muted/30 ${className}`} data-testid="trust-accreditations-grid">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {showTitle && (
          <h3 className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
            Professional Standards & Accreditations
          </h3>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="flex flex-col items-center text-center p-4 bg-background rounded-lg border shadow-sm"
            >
              <div className="mb-3 p-2 bg-primary/10 rounded-full">
                {badge.icon}
              </div>
              <h4 className="font-semibold text-sm text-foreground mb-1">{badge.title}</h4>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Minimal trust badge strip for CTAs and forms
 * Shows key trust indicators in a compact horizontal layout
 */
export function TrustBadgeStrip({ className = "" }: { className?: string }) {
  const keyBadges = [
    { icon: <Shield className="h-4 w-4" />, text: "HIPAA Compliant" },
    { icon: <Award className="h-4 w-4" />, text: "Board-Certified" },
    { icon: <CheckCircle2 className="h-4 w-4" />, text: "Insurance Accepted" }
  ];

  return (
    <div className={`flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground ${className}`} data-testid="trust-badge-strip">
      {keyBadges.map((badge) => (
        <span key={badge.text} className="flex items-center gap-1">
          {badge.icon}
          {badge.text}
        </span>
      ))}
    </div>
  );
}

/**
 * Provider credentials component for team/provider pages
 */
export function ProviderCredentials({
  credentials,
  licenseNumber,
  npiNumber,
  className = ""
}: {
  credentials: string;
  licenseNumber?: string;
  npiNumber?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-3 text-sm ${className}`} data-testid="provider-credentials">
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
        <Award className="h-4 w-4" />
        {credentials}
      </span>
      {licenseNumber && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-muted text-muted-foreground rounded-full">
          <Shield className="h-4 w-4" />
          FL License: {licenseNumber}
        </span>
      )}
      {npiNumber && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-muted text-muted-foreground rounded-full">
          <CheckCircle2 className="h-4 w-4" />
          NPI: {npiNumber}
        </span>
      )}
    </div>
  );
}
