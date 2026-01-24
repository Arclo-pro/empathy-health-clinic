import { Shield, Award, Calendar, Heart, Users, CheckCircle, Lock, Sparkles } from "lucide-react";

const psychologyTodayLogo = "/site-assets/logos/psychologytoday.webp";
const goodTherapyLogo = "/site-assets/logos/goodtherapy-alt.webp";

interface TrustFactor {
  icon?: React.ElementType;
  logo?: string;
  title: string;
  description: string;
}

const trustFactors: TrustFactor[] = [
  {
    icon: Award,
    title: "Licensed Professionals",
    description: "Board-certified psychiatrists and licensed therapists"
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Your privacy and confidentiality are protected"
  },
  {
    icon: CheckCircle,
    title: "Insurance Accepted",
    description: "We accept most major insurance plans"
  },
  {
    icon: Calendar,
    title: "Same-Week Appointments",
    description: "Fast access to care when you need it most"
  },
  {
    logo: psychologyTodayLogo,
    title: "Featured on Psychology Today",
    description: "Verified provider directory listing"
  },
  {
    logo: goodTherapyLogo,
    title: "Listed on GoodTherapy",
    description: "Trusted mental health resource platform"
  },
  {
    icon: Sparkles,
    title: "Evidence-Based Treatment",
    description: "Scientifically proven therapeutic approaches"
  },
  {
    icon: Heart,
    title: "Compassionate Care",
    description: "Non-judgmental, patient-centered approach"
  },
  {
    icon: Users,
    title: "10+ Years Experience",
    description: "Trusted by thousands of patients in Central Florida"
  },
  {
    icon: Lock,
    title: "Secure Telehealth",
    description: "Convenient virtual appointments available"
  }
];

interface TrustFactorsProps {
  variant?: "grid" | "compact";
  limit?: number;
}

export default function TrustFactors({ variant = "grid", limit }: TrustFactorsProps) {
  const displayedFactors = limit ? trustFactors.slice(0, limit) : trustFactors;

  if (variant === "compact") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6" data-testid="trust-factors-compact">
        {displayedFactors.map((factor, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center"
            data-testid={`trust-factor-${index}`}
          >
            <div className="p-3 bg-primary/10 rounded-lg mb-3">
              {factor.logo ? (
                <img 
                  src={factor.logo} 
                  alt={factor.title}
                  className="h-6 w-auto object-contain"
                  width={120}
                  height={24}
                />
              ) : factor.icon ? (
                <factor.icon className="h-6 w-6 text-primary" />
              ) : null}
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">
              {factor.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {factor.description}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="trust-factors-grid">
      {displayedFactors.map((factor, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center p-6 bg-card border rounded-lg hover-elevate"
          data-testid={`trust-factor-${index}`}
        >
          <div className="p-4 bg-primary/10 rounded-full mb-4 flex items-center justify-center min-h-[4rem]">
            {factor.logo ? (
              <img 
                src={factor.logo} 
                alt={factor.title}
                className="h-8 w-auto object-contain max-w-[8rem]"
                width={128}
                height={32}
              />
            ) : factor.icon ? (
              <factor.icon className="h-8 w-8 text-primary" />
            ) : null}
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {factor.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {factor.description}
          </p>
        </div>
      ))}
    </div>
  );
}
