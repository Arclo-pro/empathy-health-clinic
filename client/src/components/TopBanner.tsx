import { Phone } from "lucide-react";

export default function TopBanner() {
  return (
    <div className="md:static md:top-auto sticky top-0 z-50 bg-primary text-primary-foreground py-2 px-4 text-center text-sm border-b border-primary-foreground/10">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <span className="whitespace-nowrap">Same-Week Appointments Available</span>
        <span className="hidden sm:inline text-primary-foreground/60">|</span>
        <span className="whitespace-nowrap">Most Insurance Accepted</span>
        <span className="hidden sm:inline text-primary-foreground/60">|</span>
        <a
          href="tel:386-848-8751"
          className="whitespace-nowrap font-semibold hover-elevate active-elevate-2 inline-flex items-center gap-1 px-2 py-1 rounded"
          data-testid="link-phone-banner"
        >
          <Phone className="h-3.5 w-3.5" />
          Call Now: 386-848-8751
        </a>
      </div>
    </div>
  );
}
