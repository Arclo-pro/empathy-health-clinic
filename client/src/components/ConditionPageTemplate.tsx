import { Link } from "wouter";
import { ChevronRight, ArrowUpRight, MapPin, Phone, Clock } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import ShortContactForm from "@/components/ShortContactForm";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ConditionPageConfig } from "@/config/conditionPageConfigs";

interface ConditionPageTemplateProps {
  config: ConditionPageConfig;
}

function generatePlaceholderContent(heading: string, pageType: string): string {
  const paragraphs: Record<string, string> = {
    'condition-treatment': 'Our experienced team provides personalized care tailored to your unique needs. We combine evidence-based approaches with compassionate support to help you achieve meaningful improvements in your daily life.',
    'condition-location': 'Serving the Central Florida community with comprehensive mental health care. We offer flexible scheduling, including same-week appointments and convenient telehealth options for those who prefer virtual visits.',
    'insurance-condition': 'Understanding your insurance coverage is an important step in accessing care. We work with you to help verify benefits and provide transparent information about costs and payment options.',
    'comparison': 'Making informed decisions about your mental health care starts with understanding your options. We provide clear, honest guidance to help you choose the path that fits your needs and goals.',
    'symptom': 'When symptoms affect your daily life, getting the right support matters. Our team helps you understand what you are experiencing and creates a personalized plan for relief and recovery.',
  };
  
  return paragraphs[pageType] || paragraphs['condition-treatment'];
}

export default function ConditionPageTemplate({ config }: ConditionPageTemplateProps) {
  const allInternalLinks = [
    ...(config.internalLinks.up ? [{ href: config.internalLinks.up, label: 'Related Condition Hub' }] : []),
    ...(config.internalLinks.siblings?.map(href => ({ href, label: formatLinkLabel(href) })) || []),
    ...(config.internalLinks.down?.map(href => ({ href, label: formatLinkLabel(href) })) || []),
    ...(config.internalLinks.cross?.map(href => ({ href, label: formatLinkLabel(href) })) || []),
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title={config.title}
        description={config.description}
        keywords={config.keywords}
        canonicalPath={config.path}
      />
      <SiteHeader />
      
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors" data-testid="breadcrumb-home">
                    Home
                  </Link>
                </li>
                <ChevronRight className="h-4 w-4" />
                {config.pageType === 'condition-treatment' || config.pageType === 'condition-location' ? (
                  <>
                    <li>
                      <Link href="/what-we-treat" className="hover:text-primary transition-colors">
                        Conditions
                      </Link>
                    </li>
                    <ChevronRight className="h-4 w-4" />
                  </>
                ) : config.pageType === 'insurance-condition' ? (
                  <>
                    <li>
                      <Link href="/insurance" className="hover:text-primary transition-colors">
                        Insurance
                      </Link>
                    </li>
                    <ChevronRight className="h-4 w-4" />
                  </>
                ) : config.pageType === 'comparison' ? (
                  <>
                    <li>
                      <span className="text-muted-foreground">Compare</span>
                    </li>
                    <ChevronRight className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <li>
                      <span className="text-muted-foreground">Symptoms</span>
                    </li>
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
                <li className="text-foreground font-medium">{config.h1.split(':')[0]}</li>
              </ol>
            </nav>
            
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
              data-testid="text-page-h1"
            >
              {config.h1}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8">
              {config.description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild data-testid="button-hero-cta">
                <a href="#contact-form">Request an Appointment</a>
              </Button>
              <Button variant="outline" size="lg" asChild data-testid="button-hero-phone">
                <a href="tel:386-848-8751">
                  <Phone className="h-4 w-4 mr-2" />
                  Call 386-848-8751
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Info Bar */}
        <section className="py-6 bg-card border-y">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Winter Park, FL</p>
                  <p className="text-sm text-muted-foreground">Serving Central Florida</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Same-Week Appointments</p>
                  <p className="text-sm text-muted-foreground">Flexible scheduling available</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">In-Person & Telehealth</p>
                  <p className="text-sm text-muted-foreground">Choose what works for you</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content - Outline Sections */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Content Column */}
              <div className="lg:col-span-2 space-y-12">
                {config.outline.map((heading, index) => (
                  <article key={index} className="prose prose-lg max-w-none" data-testid={`section-${index}`}>
                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                      {heading}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {generatePlaceholderContent(heading, config.pageType)}
                    </p>
                  </article>
                ))}

                {/* FAQ Section */}
                {config.faqs.length > 0 && (
                  <article className="mt-12" data-testid="faq-section">
                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
                      Frequently Asked Questions
                    </h2>
                    <Accordion type="single" collapsible className="w-full">
                      {config.faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`faq-${index}`}>
                          <AccordionTrigger 
                            className="text-left text-lg font-medium"
                            data-testid={`faq-question-${index}`}
                          >
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent 
                            className="text-muted-foreground text-base leading-relaxed"
                            data-testid={`faq-answer-${index}`}
                          >
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </article>
                )}
              </div>

              {/* Sidebar - Contact Form */}
              <aside className="lg:col-span-1">
                <div 
                  id="contact-form" 
                  className="sticky top-24 bg-card rounded-lg border p-6 shadow-sm"
                  data-testid="sidebar-contact-form"
                >
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Request an Appointment
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Same-week appointments available. We will contact you within 24 hours.
                  </p>
                  <ShortContactForm service={config.h1} />
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Internal Links Section */}
        {allInternalLinks.length > 0 && (
          <section className="py-12 bg-muted/30 border-t" data-testid="internal-links-section">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Related Resources
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {allInternalLinks.slice(0, 9).map((link, index) => (
                  <Link 
                    key={index}
                    href={link.href}
                    className="flex items-center justify-between p-4 bg-card rounded-lg border hover-elevate transition-all group"
                    data-testid={`internal-link-${index}`}
                  >
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {link.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Take the Next Step?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our compassionate team is here to help. Schedule an appointment today and start your journey toward better mental health.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild data-testid="button-footer-cta">
                <Link href="/request-appointment">Request Appointment</Link>
              </Button>
              <Button variant="outline" size="lg" asChild data-testid="button-footer-phone">
                <a href="tel:386-848-8751">Call 386-848-8751</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function formatLinkLabel(href: string): string {
  const segments = href.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1] || '';
  
  return lastSegment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
