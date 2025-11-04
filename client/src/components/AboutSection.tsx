export default function AboutSection() {
  return (
    <section id="about-empathy-health-clinic" className="py-12 md:py-16 lg:py-20 bg-card border-y">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-medium text-center mb-8 md:mb-10" data-testid="text-about-heading">
          About Empathy Health Clinic
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-lg md:text-xl leading-relaxed text-foreground" data-testid="text-about-paragraph-1">
            At Empathy Health Clinic, our mission is to provide compassionate, evidence-based mental health care for individuals and families in Winter Park, Orlando, and throughout Florida. We specialize in psychiatry, therapy, and counseling with a focus on understanding the person behind the diagnosis. Whether you prefer in-person sessions or secure telehealth visits, our licensed clinicians are here to help you find balance and healing.
          </p>
          
          <p className="text-lg md:text-xl leading-relaxed text-foreground" data-testid="text-about-paragraph-2">
            We treat anxiety, depression, ADHD, and relationship challenges through personalized, evidence-based care. We accept most major insurance plans and offer both in-person and telehealth appointments—helping you heal, grow, and thrive with treatment options tailored to your needs.
          </p>
        </div>
      </div>
    </section>
  );
}
