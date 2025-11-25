import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-gradient-to-t from-background via-background to-transparent pb-4 pt-6 px-4">
        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-primary text-primary-foreground border border-primary-border h-14 text-base font-semibold shadow-lg"
            data-testid="button-sticky-appointment"
            asChild
          >
            <a href="/request-appointment">Request Appointment</a>
          </Button>
          <Button 
            variant="outline"
            className="h-14 px-6 shadow-lg"
            data-testid="button-sticky-call"
            asChild
          >
            <a href="tel:3868488751" className="flex items-center">
              <Phone className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
