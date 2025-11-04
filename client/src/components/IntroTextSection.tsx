export default function IntroTextSection() {
  return (
    <section id="intro-text" className="py-10 md:py-12 bg-background">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground" data-testid="text-intro-paragraph">
          At Empathy Health Clinic, our mission is to provide compassionate, evidence-based mental health care for individuals and families in Winter Park, Orlando, and throughout Florida. 
          We specialize in psychiatry, therapy, and counseling with a focus on understanding the person behind the diagnosis. 
          Whether you prefer in-person sessions or secure telehealth visits, our licensed clinicians are here to help you find balance and healing.
        </p>
      </div>
    </section>
  );
}
