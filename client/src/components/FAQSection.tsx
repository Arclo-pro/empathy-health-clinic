import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  return (
    <section id="faq" className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-medium text-center mb-8 md:mb-12" data-testid="text-faq-heading">
          Frequently Asked Questions
        </h2>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left text-lg md:text-xl font-medium" data-testid="trigger-faq-online-therapy">
              Do you offer online therapy?
            </AccordionTrigger>
            <AccordionContent className="text-base md:text-lg text-muted-foreground leading-relaxed" data-testid="text-faq-online-therapy-answer">
              Yes, Empathy Health Clinic offers secure telehealth appointments so you can meet with your psychiatrist or therapist from home anywhere in Florida.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left text-lg md:text-xl font-medium" data-testid="trigger-faq-insurance">
              What insurance do you accept?
            </AccordionTrigger>
            <AccordionContent className="text-base md:text-lg text-muted-foreground leading-relaxed" data-testid="text-faq-insurance-answer">
              We accept most major insurance providers, including Aetna, Cigna, United Healthcare, and BlueCross BlueShield.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
