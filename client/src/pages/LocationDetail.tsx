import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Loader2, ArrowLeft, Phone, MapPin, CheckCircle2, Clock, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Location } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ShortContactForm from "@/components/ShortContactForm";
import forestBg from "@assets/stock_images/peaceful_green_fores_8b0bc1d4.jpg";
import SEOHead from "@/components/SEOHead";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import OfficeMap from "@/components/OfficeMap";
import FAQSchema from "@/components/FAQSchema";

export default function LocationDetail() {
  const [, params] = useRoute("/locations/:slug");
  const slug = params?.slug || "";

  const { data: location, isLoading, error } = useQuery<Location>({
    queryKey: ["/api/locations/slug", slug],
    queryFn: async () => {
      const response = await fetch(`/api/locations/slug/${slug}`);
      if (!response.ok) {
        throw new Error("Location not found");
      }
      return response.json();
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !location) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h2 className="text-2xl font-bold text-foreground mb-4">Location Not Found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find the location page you're looking for.
          </p>
          <Button asChild data-testid="button-back-to-home">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const servicesOffered = (() => {
    try {
      return JSON.parse(location.servicesOffered || '[]');
    } catch {
      return [];
    }
  })();

  const faqs = (() => {
    try {
      return JSON.parse(location.faqs || '[]');
    } catch {
      return [];
    }
  })();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title={location.pageTitle}
        description={location.metaDescription}
        keywords={[location.city, location.serviceType, "mental health", "Florida", "therapy", "psychiatry", "counseling"]}
        canonicalPath={`/locations/${location.slug}`}
      />
      <LocalBusinessSchema 
        city={location.city}
        serviceType={location.serviceType}
        name={location.title}
        description={location.metaDescription}
        slug={location.slug}
      />
      {faqs.length > 0 && <FAQSchema faqs={faqs} />}
      <SiteHeader />
      <main className="flex-1">
        <div className="relative py-16 px-4">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${forestBg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
          </div>
          <div className="container mx-auto max-w-4xl relative z-10">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors" 
              data-testid="link-back-to-home"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-white" />
              <span className="text-white/90 text-lg">{location.city}, FL</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
              {location.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed" data-testid="text-hero-description">
              {location.heroDescription}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-6 mb-12 bg-card border rounded-lg p-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-sans font-bold text-foreground">Visit Our Office in {location.city}</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-foreground">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">Empathy Health Clinic</p>
                    <p className="text-sm text-muted-foreground">1751 W State Road 434, Longwood, FL 32750</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">Call Us Today</p>
                    <a href="tel:3868488751" className="text-primary hover:underline font-semibold text-lg" data-testid="link-phone-hero">
                      (386) 848-8751
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">Office Hours</p>
                    <p className="text-sm text-muted-foreground">Monday - Friday: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
              <Button size="lg" className="w-full gap-2 mt-4" asChild data-testid="button-schedule-hero">
                <Link href="/request-appointment">
                  Schedule Your Appointment
                </Link>
              </Button>
            </div>
            <div className="h-[300px] md:h-auto">
              <OfficeMap />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-12 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  About Our {location.city} Services
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed" data-testid="text-description">
                    {location.description}
                  </p>
                </div>
              </section>

              {servicesOffered.length > 0 && (
                <section className="bg-card border rounded-lg p-6">
                  <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                    Services We Offer in {location.city}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {servicesOffered.map((service: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{service}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Why Choose Empathy Health Clinic in {location.city}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed" data-testid="text-why-choose-us">
                    {location.whyChooseUs}
                  </p>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-card border rounded-lg">
                    <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-foreground mb-1">Same-Week Appointments</h3>
                    <p className="text-sm text-muted-foreground">Fast access to care</p>
                  </div>
                  <div className="text-center p-4 bg-card border rounded-lg">
                    <Building2 className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-foreground mb-1">Insurance Accepted</h3>
                    <p className="text-sm text-muted-foreground">Most plans covered</p>
                  </div>
                  <div className="text-center p-4 bg-card border rounded-lg">
                    <Phone className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-foreground mb-1">Telehealth Available</h3>
                    <p className="text-sm text-muted-foreground">Virtual visits offered</p>
                  </div>
                </div>
              </section>

              {faqs.length > 0 && (
                <section>
                  <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {faqs.map((faq: { question: string; answer: string }, index: number) => (
                      <div key={index} className="border-l-4 border-primary pl-4">
                        <h3 className="font-semibold text-foreground mb-2" data-testid={`text-faq-question-${index}`}>
                          {faq.question}
                        </h3>
                        <p className="text-muted-foreground" data-testid={`text-faq-answer-${index}`}>
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Serving {location.city} & Surrounding Areas
                </h2>
                <p className="text-foreground mb-4">
                  We're proud to serve {location.city}, FL and the surrounding Central Florida communities. Our convenient location and telehealth options make it easy to access quality mental health care when you need it.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white dark:bg-gray-800 border rounded-full text-sm text-foreground">
                    {location.city}
                  </span>
                  <span className="px-3 py-1 bg-white dark:bg-gray-800 border rounded-full text-sm text-foreground">
                    Winter Park
                  </span>
                  <span className="px-3 py-1 bg-white dark:bg-gray-800 border rounded-full text-sm text-foreground">
                    Orlando
                  </span>
                  <span className="px-3 py-1 bg-white dark:bg-gray-800 border rounded-full text-sm text-foreground">
                    Lake Mary
                  </span>
                  <span className="px-3 py-1 bg-white dark:bg-gray-800 border rounded-full text-sm text-foreground">
                    Sanford
                  </span>
                  <span className="px-3 py-1 bg-white dark:bg-gray-800 border rounded-full text-sm text-foreground">
                    Central Florida
                  </span>
                </div>
              </section>

              <section className="border rounded-lg p-6 bg-card">
                <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                  Additional Resources
                </h2>
                <p className="text-foreground mb-4">
                  Explore our full range of mental health services and learn more about how we can support your wellness journey.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" asChild data-testid="link-services">
                    <Link href="/services">
                      View All Services
                    </Link>
                  </Button>
                  <Button variant="outline" asChild data-testid="link-request-appointment">
                    <Link href="/request-appointment">
                      Request Appointment
                    </Link>
                  </Button>
                </div>
              </section>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-sans font-bold text-foreground mb-4">
                    Schedule Your Appointment
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Ready to get started? Contact us to schedule your appointment in {location.city}.
                  </p>
                  <div className="space-y-3 mb-6">
                    <Button size="lg" className="w-full gap-2" asChild data-testid="button-call-now">
                      <a href="tel:3868488751">
                        <Phone className="h-5 w-5" />
                        Call (386) 848-8751
                      </a>
                    </Button>
                    <Button size="lg" variant="outline" className="w-full" asChild data-testid="button-request-appointment">
                      <Link href="/request-appointment">
                        Request Appointment
                      </Link>
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Mon-Fri: 9:00 AM - 5:00 PM
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Serving {location.city}, FL
                    </p>
                  </div>
                </div>

                <ShortContactForm service={location.title} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
