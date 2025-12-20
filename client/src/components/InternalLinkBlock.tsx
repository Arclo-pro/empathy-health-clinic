import { Link } from "wouter";
import { ArrowRight, ChevronRight } from "lucide-react";

interface InternalLink {
  href: string;
  label: string;
  description?: string;
}

const LINK_CATEGORIES = {
  services: [
    { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando", description: "Board-certified psychiatric care" },
    { href: "/psychiatrist-near-me", label: "Psychiatrist Near Me", description: "Find psychiatric care nearby" },
    { href: "/mental-health-near-me", label: "Mental Health Clinic Orlando", description: "Comprehensive mental health care" },
    { href: "/medication-management-orlando", label: "Medication Management Orlando", description: "Psychiatric medication expertise" },
    { href: "/new-patients", label: "Psychiatrist Accepting New Patients", description: "Now accepting new patients" },
    { href: "/services", label: "Medication Management", description: "Expert psychiatric medication care" },
    { href: "/therapy", label: "Therapy Services", description: "Licensed therapists and counselors" },
    { href: "/psychiatric-evaluation", label: "Psychiatric Evaluations", description: "Comprehensive mental health assessments" },
    { href: "/telepsychiatry-orlando", label: "Telepsychiatry Orlando", description: "Online psychiatry appointments" },
    { href: "/virtual-therapy", label: "Virtual Therapy", description: "Online therapy from home" },
  ],
  conditions: [
    { href: "/psychiatrist-for-anxiety-near-me", label: "Anxiety Psychiatrist Near Me", description: "Expert anxiety medication management" },
    { href: "/psychiatrist-for-depression-near-me", label: "Depression Psychiatrist Near Me", description: "Specialized depression treatment" },
    { href: "/anxiety-psychiatrist-orlando", label: "Anxiety Psychiatrist Orlando", description: "Orlando anxiety specialists" },
    { href: "/depression-psychiatrist-orlando", label: "Depression Psychiatrist Orlando", description: "Orlando depression specialists" },
    { href: "/adhd-psychiatrist-orlando", label: "ADHD Psychiatrist Orlando", description: "Adult and child ADHD specialists" },
    { href: "/anxiety-therapy", label: "Anxiety Treatment", description: "GAD, panic disorder, social anxiety" },
    { href: "/depression-counseling", label: "Depression Treatment", description: "Evidence-based depression care" },
    { href: "/ptsd-psychiatrist-orlando", label: "PTSD Treatment", description: "Trauma-focused therapy and medication" },
    { href: "/trauma-psychiatrist-orlando", label: "Trauma Psychiatrist Orlando", description: "Trauma specialist psychiatry" },
    { href: "/ocd-psychiatrist-orlando", label: "OCD Psychiatrist Orlando", description: "Obsessive-compulsive disorder treatment" },
    { href: "/insomnia-psychiatrist-orlando", label: "Insomnia Psychiatrist Orlando", description: "Sleep disorder treatment" },
    { href: "/stress-management", label: "Stress Management", description: "Stress reduction and coping strategies" },
  ],
  treatments: [
    { href: "/cognitive-behavioral-therapy", label: "CBT Therapy", description: "Cognitive behavioral therapy" },
    { href: "/emdr-therapy", label: "EMDR Therapy", description: "Trauma processing treatment" },
    { href: "/tms-treatment", label: "TMS Treatment", description: "Transcranial magnetic stimulation" },
    { href: "/couples-counseling", label: "Couples Counseling", description: "Relationship therapy" },
  ],
  locations: [
    { href: "/psychiatrist-orlando", label: "Orlando Psychiatry", description: "Central Florida psychiatric care" },
    { href: "/psychiatrist-winter-park", label: "Winter Park", description: "Main clinic location" },
    { href: "/locations/altamonte-springs", label: "Altamonte Springs", description: "Serving Seminole County" },
    { href: "/locations/kissimmee", label: "Kissimmee", description: "Osceola County mental health" },
    { href: "/locations/apopka", label: "Apopka", description: "Northwest Orlando area" },
  ],
  insurance: [
    { href: "/psychiatrist-orlando-accepts-bcbs", label: "Psychiatrist Orlando Accepts BCBS", description: "BCBS accepted" },
    { href: "/psychiatrist-orlando-accepts-aetna", label: "Psychiatrist Orlando Accepts Aetna", description: "Aetna insurance accepted" },
    { href: "/psychiatrist-orlando-accepts-cigna", label: "Psychiatrist Orlando Accepts Cigna", description: "Cigna coverage accepted" },
    { href: "/psychiatrist-orlando-accepts-umr", label: "Psychiatrist Orlando Accepts UMR", description: "UMR insurance accepted" },
    { href: "/psychiatrist-orlando-accepts-united-healthcare", label: "United Healthcare Psychiatrist", description: "UHC coverage accepted" },
    { href: "/medicare-psychiatrist-orlando", label: "Medicare Psychiatrist Orlando", description: "Medicare accepted" },
    { href: "/insurance", label: "All Insurance Providers", description: "See all accepted plans" },
  ],
  nearMe: [
    { href: "/psychiatrist-near-me", label: "Psychiatrist Near Me", description: "Find a psychiatrist near you" },
    { href: "/psychiatrist-for-anxiety-near-me", label: "Psychiatrist for Anxiety Near Me", description: "Anxiety psychiatry nearby" },
    { href: "/psychiatrist-for-depression-near-me", label: "Psychiatrist for Depression Near Me", description: "Depression psychiatry nearby" },
    { href: "/mental-health-near-me", label: "Mental Health Clinic Near Me", description: "Mental health care nearby" },
    { href: "/therapy-near-me", label: "Therapy Near Me", description: "Find therapy services nearby" },
    { href: "/counselor-near-me", label: "Counselor Near Me", description: "Licensed counselors nearby" },
    { href: "/psychiatrist-near-ucf", label: "Psychiatrist Near UCF", description: "UCF area psychiatry" },
  ],
};

interface InternalLinkBlockProps {
  category?: keyof typeof LINK_CATEGORIES;
  links?: InternalLink[];
  title?: string;
  variant?: "cards" | "list" | "inline" | "sidebar";
  limit?: number;
  excludePaths?: string[];
  className?: string;
}

export default function InternalLinkBlock({ 
  category, 
  links: customLinks,
  title,
  variant = "list", 
  limit,
  excludePaths = [],
  className = "" 
}: InternalLinkBlockProps) {
  let links = customLinks || (category ? LINK_CATEGORIES[category] : []);
  
  if (excludePaths.length > 0) {
    links = links.filter(link => !excludePaths.includes(link.href));
  }
  
  if (limit) {
    links = links.slice(0, limit);
  }

  if (links.length === 0) return null;

  if (variant === "inline") {
    return (
      <span className={className}>
        {links.map((link, idx) => (
          <span key={link.href}>
            <Link href={link.href} className="text-primary hover:underline">
              {link.label}
            </Link>
            {idx < links.length - 1 && ", "}
          </span>
        ))}
      </span>
    );
  }

  if (variant === "sidebar") {
    return (
      <div className={`space-y-2 ${className}`} data-testid="internal-links-sidebar">
        {title && (
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            {title}
          </h3>
        )}
        {links.map(link => (
          <Link 
            key={link.href}
            href={link.href}
            className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors py-1"
            data-testid={`link-sidebar-${link.href.replace(/\//g, '-')}`}
          >
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
            {link.label}
          </Link>
        ))}
      </div>
    );
  }

  if (variant === "cards") {
    return (
      <div className={`space-y-4 ${className}`} data-testid="internal-links-cards">
        {title && (
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {links.map(link => (
            <Link 
              key={link.href}
              href={link.href}
              className="flex items-start gap-3 p-3 bg-card border rounded-lg hover-elevate transition-all"
              data-testid={`link-card-${link.href.replace(/\//g, '-')}`}
            >
              <ArrowRight className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
              <div>
                <span className="font-medium text-foreground">{link.label}</span>
                {link.description && (
                  <p className="text-sm text-muted-foreground mt-0.5">{link.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`} data-testid="internal-links-list">
      {title && (
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      )}
      <ul className="space-y-2">
        {links.map(link => (
          <li key={link.href} className="flex items-start gap-2">
            <ArrowRight className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
            <div>
              <Link 
                href={link.href}
                className="text-primary hover:underline font-medium"
                data-testid={`link-list-${link.href.replace(/\//g, '-')}`}
              >
                {link.label}
              </Link>
              {link.description && (
                <span className="text-muted-foreground"> - {link.description}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RelatedServicesBlock({ 
  currentPath,
  title = "Related Services",
  className = "" 
}: { 
  currentPath: string;
  title?: string;
  className?: string;
}) {
  const allLinks = [
    ...LINK_CATEGORIES.services,
    ...LINK_CATEGORIES.conditions,
    ...LINK_CATEGORIES.treatments,
  ];
  
  const relatedLinks = allLinks.filter(link => link.href !== currentPath).slice(0, 5);
  
  return (
    <InternalLinkBlock 
      links={relatedLinks} 
      title={title}
      variant="list" 
      className={className}
    />
  );
}

export { LINK_CATEGORIES };
