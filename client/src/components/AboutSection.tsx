export default function AboutSection() {
  return (
    <section id="about-empathy-health-clinic" className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-medium text-center mb-8 md:mb-10" data-testid="text-about-heading">
          About Empathy Health Clinic
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-lg md:text-xl leading-relaxed text-foreground" data-testid="text-about-paragraph-1">
            Empathy Health Clinic provides compassionate psychiatry, therapy, and counseling services in Winter Park, Florida. Our licensed clinicians specialize in treating anxiety, depression, ADHD, and relationship challenges through evidence-based care. We accept most major insurance plans and offer both in-person and telehealth appointments to make mental health care accessible to everyone.
          </p>
          
          <p className="text-lg md:text-xl leading-relaxed text-foreground" data-testid="text-about-paragraph-2">
            Our mission is to combine empathy with expertise—helping you heal, grow, and thrive with personalized treatment options tailored to your needs.
          </p>
        </div>
      </div>
    </section>
  );
}
