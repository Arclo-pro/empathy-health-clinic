import approachImage from "@assets/generated_images/Therapy_consultation_session_e4985de5.png";
import { useQuery } from "@tanstack/react-query";
import type { SiteContent } from "@shared/schema";

export default function ApproachSection() {
  const { data: content } = useQuery<SiteContent>({
    queryKey: ["/api/site-content"],
  });

  const aboutText = content?.aboutText || "At Empathy Health Clinic, our mission is to serve the community of Orlando, FL, with a range of affordable mental health services. Whether you need to speak with a professional or seek more comprehensive treatment, we can guide you toward the best solution for your needs and well-being.";

  const steps = [
    {
      number: "1",
      title: "Initial Consultation",
      description: "We begin with a comprehensive assessment to understand your unique needs and concerns."
    },
    {
      number: "2",
      title: "Personalized Treatment Plan",
      description: "Our team develops a tailored approach combining therapy, medication management, and holistic care."
    },
    {
      number: "3",
      title: "Ongoing Support",
      description: "Regular sessions and continuous monitoring to ensure your progress and adjust treatment as needed."
    }
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-center mb-12 md:mb-16">
          Our Approach, Step by Step
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <img
              src={approachImage}
              alt="Therapy session"
              className="rounded-xl w-full object-cover"
            />
          </div>
          
          <div className="order-1 lg:order-2 space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4" data-testid={`step-${index}`}>
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 max-w-4xl mx-auto">
          <p className="text-lg md:text-xl leading-relaxed text-center text-foreground">
            {aboutText}
          </p>
        </div>
      </div>
    </section>
  );
}
