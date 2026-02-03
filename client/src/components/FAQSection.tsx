import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FAQSchema from "./FAQSchema";

export interface FAQItem {
  question: string;
  answer: string;
}

/** Default FAQs for general clinic pages */
const DEFAULT_FAQS: FAQItem[] = [
  {
    question: "Do you offer online therapy?",
    answer: "Yes, Empathy Health Clinic offers secure telehealth appointments so you can meet with your psychiatrist or therapist from home anywhere in Florida."
  },
  {
    question: "What insurance do you accept?",
    answer: "We accept most major commercial insurance providers, including Aetna, Cigna, United Healthcare, BlueCross BlueShield, Medicare, Tricare, UMR, and Oscar Health. We also welcome self-pay patients."
  },
  {
    question: "Do you accept Medicaid or Sunshine Health?",
    answer: "We are not able to accept Medicaid or Sunshine Health plans at this time. We serve patients with commercial/PPO insurance, Medicare, and self-pay options. If you have questions about your coverage, please call us at (386) 848-8751."
  },
  {
    question: "Do you prescribe Xanax or other benzodiazepines?",
    answer: "We do not prescribe benzodiazepines (such as Xanax, Klonopin, or Ativan) as a primary treatment. Our psychiatrists focus on evidence-based treatments including SSRIs, SNRIs, and other medications that provide effective, sustainable relief for anxiety and related conditions. We work with each patient to find the most appropriate treatment plan for their individual needs."
  },
  {
    question: "How quickly can I get an appointment?",
    answer: "We offer same-week appointments for new patients. Call us at (386) 848-8751 or request an appointment online to schedule."
  },
  {
    question: "What conditions do you treat?",
    answer: "We specialize in anxiety, depression, ADHD, bipolar disorder, PTSD, OCD, insomnia, and other mental health conditions. Our board-certified providers create personalized treatment plans."
  },
  {
    question: "What is the difference between a psychiatrist and a therapist?",
    answer: "A psychiatrist is a medical doctor who can prescribe medication and provide medication management. A therapist provides talk therapy and counseling. We offer both services at Empathy Health Clinic."
  }
];

/** Service-specific FAQ sets for common conditions */
export const SERVICE_FAQS: Record<string, FAQItem[]> = {
  anxiety: [
    {
      question: "What are the symptoms of anxiety disorder?",
      answer: "Common symptoms include excessive worry, restlessness, difficulty concentrating, irritability, muscle tension, and sleep problems. Physical symptoms may include rapid heartbeat, sweating, and shortness of breath."
    },
    {
      question: "What treatments are available for anxiety in Orlando?",
      answer: "We offer comprehensive anxiety treatment including medication management (SSRIs, SNRIs), cognitive behavioral therapy (CBT), and lifestyle counseling. Our psychiatrists create personalized treatment plans."
    },
    {
      question: "How long does anxiety treatment take?",
      answer: "Treatment duration varies by individual. Many patients see improvement within 4-6 weeks with medication. Therapy typically involves 8-16 sessions. Our goal is to help you manage symptoms and improve quality of life."
    },
    {
      question: "Can anxiety be treated without medication?",
      answer: "Yes, therapy alone can be effective for mild to moderate anxiety. CBT is highly effective. However, many patients benefit from a combination of therapy and medication for best results."
    }
  ],
  depression: [
    {
      question: "What are the signs of depression?",
      answer: "Signs include persistent sadness, loss of interest in activities, changes in appetite or sleep, fatigue, difficulty concentrating, feelings of worthlessness, and thoughts of death or suicide. If you're experiencing these, please reach out."
    },
    {
      question: "What depression treatments do you offer in Orlando?",
      answer: "We offer medication management (antidepressants), psychotherapy, TMS treatment for treatment-resistant depression, and lifestyle interventions. Our approach is personalized to your needs."
    },
    {
      question: "How effective is depression treatment?",
      answer: "With proper treatment, 80-90% of people with depression eventually respond well. Most patients see improvement within 4-8 weeks of starting treatment. We monitor progress and adjust as needed."
    },
    {
      question: "What's the difference between sadness and clinical depression?",
      answer: "Sadness is a normal emotion that passes. Clinical depression persists for weeks, significantly impacts daily functioning, and includes multiple symptoms. If symptoms last more than 2 weeks, seek professional help."
    }
  ],
  adhd: [
    {
      question: "How is ADHD diagnosed in adults?",
      answer: "Adult ADHD diagnosis involves comprehensive evaluation including clinical interviews, symptom assessments, developmental history, and ruling out other conditions. We offer thorough ADHD testing in Orlando."
    },
    {
      question: "What ADHD medications do you prescribe?",
      answer: "We prescribe both stimulant (Adderall, Vyvanse, Ritalin) and non-stimulant (Strattera, Wellbutrin) medications based on individual needs, medical history, and treatment goals."
    },
    {
      question: "Can adults develop ADHD?",
      answer: "ADHD is a neurodevelopmental condition present from childhood, but many adults are diagnosed later in life. Symptoms may have been overlooked or compensated for during youth."
    },
    {
      question: "Do you require previous records for ADHD treatment?",
      answer: "While prior records are helpful, they're not required. We conduct comprehensive evaluations. If you've never been diagnosed, we can perform initial ADHD testing and assessment."
    }
  ],
  ptsd: [
    {
      question: "What is PTSD and who can develop it?",
      answer: "PTSD (Post-Traumatic Stress Disorder) can develop after experiencing or witnessing traumatic events. It affects veterans, first responders, abuse survivors, accident victims, and others exposed to trauma."
    },
    {
      question: "What PTSD treatments do you offer?",
      answer: "We offer EMDR therapy, trauma-focused CBT, medication management, and comprehensive trauma treatment. Our trauma specialists create safe, personalized treatment plans."
    },
    {
      question: "How long does PTSD treatment take?",
      answer: "PTSD treatment varies by individual and trauma type. EMDR typically requires 6-12 sessions. Many patients see significant improvement within 3-6 months of consistent treatment."
    },
    {
      question: "Can PTSD be cured?",
      answer: "While PTSD is a chronic condition, it is highly treatable. Most patients experience significant symptom reduction and improved quality of life with proper treatment."
    }
  ],
  medication: [
    {
      question: "What is psychiatric medication management?",
      answer: "Medication management involves working with a psychiatrist to find the right medications, dosages, and combinations for your mental health condition. We monitor effectiveness and adjust as needed."
    },
    {
      question: "How often will I need medication management appointments?",
      answer: "Initially, appointments may be monthly to monitor progress. Once stable, visits typically occur every 2-3 months. We're always available for concerns between appointments."
    },
    {
      question: "Do you prescribe controlled substances?",
      answer: "Yes, when clinically appropriate, our psychiatrists can prescribe controlled medications including ADHD medications and anxiety medications. We follow best practices and monitor carefully."
    },
    {
      question: "Can I do medication management via telehealth?",
      answer: "Yes, we offer convenient telepsychiatry appointments for medication management. You can meet with your psychiatrist from home anywhere in Florida."
    }
  ]
};

interface FAQSectionProps {
  /** Custom FAQs to display. If not provided, uses default FAQs */
  faqs?: FAQItem[];
  /** Service type to use predefined FAQs */
  serviceType?: keyof typeof SERVICE_FAQS;
  /** Section title */
  title?: string;
  /** Include FAQ schema markup for SEO */
  includeSchema?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Background variant */
  variant?: "default" | "muted";
}

export default function FAQSection({
  faqs,
  serviceType,
  title = "Frequently Asked Questions",
  includeSchema = true,
  className = "",
  variant = "default"
}: FAQSectionProps) {
  // Determine which FAQs to use
  let displayFaqs: FAQItem[];
  if (faqs) {
    displayFaqs = faqs;
  } else if (serviceType && SERVICE_FAQS[serviceType]) {
    displayFaqs = SERVICE_FAQS[serviceType];
  } else {
    displayFaqs = DEFAULT_FAQS;
  }

  const bgClass = variant === "muted" ? "bg-muted/30" : "bg-background";

  return (
    <>
      {includeSchema && <FAQSchema faqs={displayFaqs} />}
      <section id="faq" className={`py-12 md:py-16 lg:py-20 ${bgClass} ${className}`}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-medium text-center mb-8 md:mb-12" data-testid="text-faq-heading">
            {title}
          </h2>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {displayFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger
                  className="text-left text-lg md:text-xl font-medium"
                  data-testid={`trigger-faq-${index}`}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent
                  className="text-base md:text-lg text-muted-foreground leading-relaxed"
                  data-testid={`text-faq-answer-${index}`}
                >
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
