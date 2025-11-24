import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FAQSchema from "@/components/FAQSchema";

export interface FAQ {
  question: string;
  answer: string;
}

interface TherapyFAQProps {
  pageTitle?: string;
  customFaqs?: FAQ[];
  includeDefaultFaqs?: boolean;
}

export default function TherapyFAQ({ 
  pageTitle = "Therapy", 
  customFaqs = [],
  includeDefaultFaqs = true 
}: TherapyFAQProps) {
  const defaultFaqs = [
    {
      question: "What is therapy and how does it work?",
      answer: "Therapy (also called counseling or psychotherapy) is a collaborative process in which a trained mental-health professional helps you explore your thoughts, feelings and behaviors to improve emotional wellbeing. Sessions are typically confidential conversations that create a safe, non-judgmental space to identify patterns, build coping strategies and set goals."
    },
    {
      question: "Do I need a diagnosed mental illness to see a therapist?",
      answer: "No. Counseling can help anyone facing sadness, anxiety, relationship issues, grief, stress, life transitions or any concern causing distress. You don't need a formal diagnosis to benefit from speaking with a professional."
    },
    {
      question: "How do I know when it's time to see a therapist?",
      answer: "Consider seeking therapy if you're not feeling like yourself, your relationships are suffering, your emotions feel out of control or you're changing aspects of your life to accommodate your feelings. Therapy can also be helpful if you simply want to better understand yourself and grow."
    },
    {
      question: "What happens during the first session?",
      answer: "The first appointment is often an intake evaluation—a structured conversation where you discuss why you're seeking therapy, your history and goals. This helps match you with the right therapist and establishes a plan for treatment."
    },
    {
      question: "How is a therapist chosen for me?",
      answer: "After the intake, your provider considers your needs and preferences and pairs you with a therapist whose training and style fit those needs. Don't hesitate to request a different therapist if the first match doesn't feel right; rapport and comfort are important."
    },
    {
      question: "How long are therapy sessions and how long will I need to go?",
      answer: "Individual sessions usually last 45–60 minutes. The overall length of therapy varies—from a few sessions to many months—depending on your goals, progress and personal preferences. Your therapist will work with you to create a plan."
    },
    {
      question: "Will I be prescribed medication?",
      answer: "Most talk therapy does not involve medication. Some evidence-based approaches (e.g., cognitive therapy) assign homework between sessions but do not prescribe drugs. If medication might help, your therapist can refer you to a psychiatrist or medical provider."
    },
    {
      question: "Does therapy include homework?",
      answer: "Many therapists assign activities such as journaling, practicing new coping skills, or completing worksheets. These exercises reinforce what you discuss in sessions and help you apply new skills to daily life."
    },
    {
      question: "How much does therapy cost and will my insurance cover it?",
      answer: "Costs depend on the provider's credentials and the type of service (individual therapy vs. evaluations, etc.). Many practices accept major insurance plans; those with out-of-network benefits can often seek reimbursement. Always ask your therapist or your insurance company about coverage, reimbursement percentages and whether pre-authorization is needed."
    },
    {
      question: "What payment methods are accepted?",
      answer: "Most providers accept major credit or debit cards. Payment is usually due at the time of service. Check with the clinic's policies for details."
    },
    {
      question: "What is your cancellation or no-show policy?",
      answer: "Therapists typically require 24–48 hours' notice for cancellations. Appointments not canceled within the required window may incur a fee, which often must be paid before the next session."
    },
    {
      question: "Is therapy confidential?",
      answer: "Yes. Sessions are private, and therapists are legally bound to protect your confidentiality. Exceptions exist if there is a risk of harm to yourself or others, or in cases of abuse, as therapists must comply with mandatory reporting laws."
    },
    {
      question: "Do you offer virtual therapy?",
      answer: "Many therapists provide telehealth sessions via secure video. If you prefer in-person sessions, you can discuss availability and safety protocols with the clinic."
    },
    {
      question: "Do you provide couples or family therapy?",
      answer: "Ask your clinic whether they offer couples counseling, family therapy or group therapy. Many centers provide these services to address relationship dynamics."
    },
    {
      question: "What types of issues can therapy help with?",
      answer: "Counseling can assist with emotional difficulties such as anxiety, depression, anger, relationship problems, grief, stress and other personal concerns."
    },
    {
      question: "What therapy services do you not provide?",
      answer: "Each clinic has a scope of services. For instance, some community clinics focus on talk therapy but may not provide intensive psychiatric care or certain specialized treatments. It's best to ask directly if you're seeking a specific type of service."
    },
    {
      question: "What are the credentials behind a therapist's name?",
      answer: "The letters after a therapist's name indicate their training and licensure. MA/MS/MEd shows a master's degree; PhD/PsyD/EdD shows a doctoral degree; LPC and LCSW indicate licensed professional counselors or clinical social workers."
    }
  ];

  // Merge custom FAQs with default FAQs based on includeDefaultFaqs flag
  const allFaqs = includeDefaultFaqs 
    ? [...customFaqs, ...defaultFaqs]
    : customFaqs;

  return (
    <>
      <FAQSchema faqs={allFaqs} />
      <section className="py-16 md:py-20 bg-muted">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
              Frequently Asked Questions About {pageTitle}
            </h2>
            <p className="text-lg text-muted-foreground">
              Get answers to common questions about therapy services and what to expect
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {allFaqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border rounded-lg px-6"
              data-testid={`faq-item-${index}`}
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
