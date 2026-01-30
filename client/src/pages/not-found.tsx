import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight } from "lucide-react";

const helpfulLinks = [
  { label: "Services", href: "/services", description: "View our psychiatric and therapy services" },
  { label: "Request Appointment", href: "/request-appointment", description: "Schedule a visit with our team" },
  { label: "Our Team", href: "/team", description: "Meet our board-certified providers" },
  { label: "Blog", href: "/blog", description: "Browse mental health articles and resources" },
  { label: "Insurance", href: "/insurance", description: "Check accepted insurance plans" },
  { label: "Contact Us", href: "/request-appointment", description: "Get in touch with our clinic" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Page Not Found | Empathy Health Clinic"
        description="The page you're looking for doesn't exist. Find psychiatry and therapy services, book appointments, or browse our mental health resources."
        canonicalPath="/404"
      />
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <AlertCircle className="h-16 w-16 text-muted-foreground/50" />
            </div>
            <h1 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              Sorry, the page you're looking for doesn't exist or may have been moved. Use the links below to find what you need.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <a href="/">Return to Homepage</a>
              </Button>
            </div>
          </div>

          <div className="border-t pt-10">
            <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
              Helpful Links
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {helpfulLinks.map((link) => (
                <a
                  key={link.href + link.label}
                  href={link.href}
                  className="group flex items-start gap-3 p-4 rounded-lg border bg-card hover:border-primary/40 hover:bg-primary/5 transition-colors"
                >
                  <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  <div>
                    <p className="font-medium text-foreground">{link.label}</p>
                    <p className="text-sm text-muted-foreground">{link.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Need help? Call us at{" "}
              <a href="tel:3868488751" className="text-primary hover:underline font-medium">
                (386) 848-8751
              </a>
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
