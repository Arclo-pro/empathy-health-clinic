import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MapPin, Phone, Clock, Star, CheckCircle, CheckCircle2 } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import HeroBackground from "@/components/HeroBackground";
import ShortContactForm from "@/components/ShortContactForm";
import { trackEvent } from "@/lib/analytics";
import type { LandingPageConfig } from "@/types/landingPage";

interface LandingPageTemplateProps {
  config: LandingPageConfig;
}

export default function LandingPageTemplate({ config }: LandingPageTemplateProps) {
  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', config.analytics.pageName, config.location.phoneDisplay);
  };

  const handleCtaClick = (ctaType: string) => {
    trackEvent(`${config.analytics.conversionCategory}_${ctaType}`, 'conversion', config.analytics.pageName);
  };


  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title={config.seo.title}
        description={config.seo.description}
        keywords={config.seo.keywords}
        canonicalPath={config.seo.canonicalPath}
        jsonLd={config.jsonLd}
      />
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <HeroBackground imageSrc={config.hero.heroImage}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 text-white" data-testid="text-hero-title">
            {config.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl" data-testid="text-hero-description">
            {config.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              asChild 
              variant="default"
              data-testid="button-hero-cta"
              onClick={() => handleCtaClick('hero_cta')}
            >
              <a href="#contact-form">{config.hero.ctaPrimary}</a>
            </Button>
            {config.hero.ctaSecondary && (
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="bg-background/20 backdrop-blur-sm border-white/30 text-white"
                data-testid="button-hero-phone"
                onClick={handlePhoneClick}
              >
                <a href={`tel:${config.location.phone}`}>{config.hero.ctaSecondary}</a>
              </Button>
            )}
          </div>
        </HeroBackground>

        {/* Proof Bar */}
        {config.proofBar && (
          <section className="py-8 bg-card border-b">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-6 flex-wrap">
                {config.proofBar.googleRating && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-lg font-semibold text-foreground">{config.proofBar.googleRating}</span>
                      <span className="text-sm text-muted-foreground">Google Reviews</span>
                    </div>
                    <div className="hidden lg:block h-6 w-px bg-border" />
                  </>
                )}
                {config.proofBar.showVerifiedBadge && (
                  <>
                    <VerifiedOnBadge />
                    <div className="hidden lg:block h-6 w-px bg-border" />
                  </>
                )}
                {config.proofBar.highlights?.map((highlight, idx) => (
                  <div key={idx}>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>{highlight}</span>
                    </div>
                    {idx < (config.proofBar.highlights?.length || 0) - 1 && (
                      <div className="hidden lg:block h-6 w-px bg-border" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Location & Contact Banner */}
        <section className="py-8 bg-primary/5 border-y">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3" data-testid="location-info">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{config.location.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {config.location.address}<br />
                    {config.location.city}, {config.location.state} {config.location.zip}
                  </p>
                  <a 
                    href={config.location.mapUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline mt-1 inline-block"
                    data-testid="link-directions"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3" data-testid="contact-info">
                <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Call or Text</h3>
                  <a 
                    href={`tel:${config.location.phone}`}
                    className="text-lg font-bold text-primary hover:underline"
                    data-testid="link-phone"
                    onClick={handlePhoneClick}
                  >
                    {config.location.phoneDisplay}
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Same-week appointments available
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3" data-testid="hours-info">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Office Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    {config.location.hours}
                  </p>
                  <p className="text-sm text-primary mt-1 font-medium">
                    <CheckCircle2 className="h-4 w-4 inline mr-1" />
                    Accepting new patients
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Section */}
        <InsuranceSection />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              
              {/* Introduction */}
              <section>
                <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
                  {config.content.mainHeading}
                </h2>
                {config.content.introduction && config.content.introduction.length > 0 && (
                  <div className="prose prose-lg max-w-none">
                    {config.content.introduction.map((paragraph, idx) => (
                      <p key={idx} className="text-foreground leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </section>

              {/* Conditions Section */}
              {config.content.conditions && config.content.conditions.length > 0 && (
                <section>
                  <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                    {config.content.conditionsHeading || "Conditions We Treat"}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {config.content.conditions.map((condition, idx) => (
                      <div key={idx} className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-foreground">{condition.name}</span>
                          {condition.description && (
                            <span className="text-muted-foreground"> - {condition.description}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Services Section */}
              {config.content.services && config.content.services.length > 0 && (
                <section>
                  <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                    {config.content.servicesHeading || "Our Services"}
                  </h2>
                  <div className="space-y-4">
                    {config.content.services.map((service, idx) => {
                      const IconComponent = service.icon;
                      return (
                        <div key={idx} className="flex gap-4 p-4 bg-card rounded-lg border">
                          <IconComponent className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="font-semibold text-lg text-foreground mb-2">{service.title}</h3>
                            <p className="text-muted-foreground">{service.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Why Choose Section */}
              {config.content.whyChoosePoints && config.content.whyChoosePoints.length > 0 && (
                <section>
                  <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                    {config.content.whyChooseHeading || "Why Choose Us?"}
                  </h2>
                  <div className="space-y-4">
                    {config.content.whyChoosePoints.map((point, idx) => {
                      const IconComponent = point.icon;
                      return (
                        <div key={idx} className="flex gap-4 p-4 bg-card rounded-lg border">
                          <IconComponent className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="font-semibold text-lg text-foreground mb-2">{point.title}</h3>
                            <p className="text-muted-foreground">{point.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* FAQs */}
              {config.faqs && config.faqs.length > 0 && (
                <section>
                  <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {config.faqs.map((faq, idx) => (
                      <div key={idx}>
                        <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-6">
                <div className="bg-card rounded-lg border p-6" id="contact-form">
                  <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                    {config.sidebar.formHeading}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {config.sidebar.formSubheading}
                  </p>
                  <ShortContactForm formType={config.sidebar.formType} />
                </div>

                {config.sidebar.quickLinks && config.sidebar.quickLinks.length > 0 && (
                  <div className="bg-primary/5 rounded-lg border p-6">
                    <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
                    <div className="space-y-2">
                      {config.sidebar.quickLinks.map((link, idx) => (
                        <Link key={idx} href={link.href} className="block text-sm text-primary hover:underline">
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <ReviewsAndBadges />
      </main>
      <SiteFooter />
    </div>
  );
}
