import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Loader2, CheckCircle2, MapPin, Phone, Clock, Star, CheckCircle, Mail,
  // Commonly used therapy icons - curated list for bundle optimization
  Heart, Brain, Users, Shield, Activity, MessageCircle, Calendar, Award,
  Stethoscope, Target, Zap, AlertCircle, Pill, Video, Building2, Sparkles,
  Lightbulb, HandHeart, Smile, Frown, type LucideIcon
} from "lucide-react";

// Icon map for dynamic icon rendering - prevents importing all 1000+ lucide icons
const TherapyIconMap: Record<string, LucideIcon> = {
  Heart, Brain, Users, Shield, Activity, MessageCircle, Calendar, Award,
  Stethoscope, Target, Zap, AlertCircle, Pill, Video, Building2, Sparkles,
  Lightbulb, HandHeart, Smile, Frown, CheckCircle, CheckCircle2, Star, Clock
};
import type { Therapy } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import InsuranceSection from "@/components/InsuranceSection";
import ReviewsAndBadges from "@/components/ReviewsAndBadges";
import VerifiedOnBadge from "@/components/VerifiedOnBadge";
import ShortContactForm from "@/components/ShortContactForm";
import { trackEvent } from "@/lib/analytics";
const therapyImage = "/site-assets/stock_images/professional_therapy_f11c950a.webp";
import TherapyFAQ from "@/components/TherapyFAQ";
import TextUsButton from "@/components/TextUsButton";

export default function TherapyPage() {
  const { data: therapies, isLoading } = useQuery<Therapy[]>({
    queryKey: ["/api/therapies"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const sortedTherapies = therapies?.sort((a, b) => a.order - b.order) || [];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Therapist Near You | Winter Park & Orlando, FL"
        description="Licensed therapists in Winter Park & Orlando. Expert CBT, DBT, EMDR therapy. Same-week appointments, in-person & telehealth. Call 386-848-8751."
        keywords={["therapist near me", "good therapist near me", "therapist Winter Park", "therapist Orlando FL", "counselor near me", "therapy near me", "CBT therapist near me", "licensed therapist near me"]}
        canonicalPath="/therapy"
        preloadImage={therapyImage}
      />
      <SiteHeader />
      
      {/* Hero Section with Image */}
      <div className="relative py-20 px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${therapyImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 text-white" data-testid="text-page-title">
            Therapist in Winter Park & Orlando, FL
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Licensed therapists providing CBT, DBT, EMDR, trauma therapy, and couples counseling in Winter Park and Orlando. Evidence-based care tailored to your needs with flexible in-person and telehealth appointments.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Button 
              size="lg" 
              className=""
              asChild 
              data-testid="button-hero-request-appointment"
              onClick={() => trackEvent('appointment_request', 'conversion', 'Therapy Page - Hero CTA')}
            >
              <Link href="/request-appointment" className="flex items-center justify-center gap-2">
                <Mail className="h-5 w-5" />
                Request Appointment
              </Link>
            </Button>
            <TextUsButton 
              variant="hero" 
              size="lg" 
              location="hero-therapy"
            />
            <Button 
              size="lg" 
              className=""
              asChild 
              data-testid="button-hero-call"
              onClick={() => trackEvent('phone_click', 'conversion', 'Therapy Page - Hero CTA')}
            >
              <a href="tel:3868488751" className="flex items-center justify-center gap-2">
                <Phone className="h-5 w-5" />
                Call (386) 848-8751
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Key Benefits Bar */}
      <section className="py-8 bg-card border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-lg font-semibold text-foreground">4.8</span>
              <span className="text-sm text-muted-foreground">Google Reviews</span>
            </div>
            <div className="hidden lg:block h-6 w-px bg-border" />
            <VerifiedOnBadge />
            <div className="hidden lg:block h-6 w-px bg-border" />
            <div className="flex items-center gap-2 text-sm text-foreground">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>Same-Week Appointments Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact Banner - Optimized for "therapist near me" */}
      <section className="py-8 bg-primary/5 border-y">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3" data-testid="location-info">
              <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Our Winter Park Location</h3>
                <p className="text-sm text-muted-foreground">
                  1155 Louisiana Ave Suite 202<br />
                  Winter Park, FL 32789
                </p>
                <a 
                  href="https://maps.google.com/?q=1155+Louisiana+Ave+Suite+202+Winter+Park+FL+32789" 
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
                <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                <a 
                  href="tel:386-848-8751" 
                  className="text-lg font-bold text-primary hover:underline"
                  data-testid="link-phone"
                >
                  386-848-8751
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
                  Mon-Sat: 9:00 AM - 6:00 PM<br />
                  Telehealth available
                </p>
                <p className="text-sm text-primary mt-1 font-medium">
                  <CheckCircle2 className="h-4 w-4 inline mr-1" />
                  Accepting new clients
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Section */}
      <InsuranceSection />

      <div className="border-t" />

      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2">
            <div className="mb-16">
              <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-6">Professional Therapy Services in Winter Park & Orlando</h2>
            
            <p className="text-foreground leading-relaxed mb-6">
              When you need a trusted therapist in Winter Park or Orlando, FL, Empathy Health Clinic provides expert mental health therapy for adults, adolescents, and couples. Our licensed therapists specialize in evidence-based treatments including Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), EMDR for trauma, couples counseling, and anxiety/depression treatment. Whether you're facing <Link href="/anxiety-therapy" className="text-primary hover:underline font-medium">anxiety</Link>, <Link href="/depression-counseling" className="text-primary hover:underline font-medium">depression</Link>, relationship challenges, or trauma, therapy offers powerful tools for creating lasting positive change.
            </p>

            <p className="text-foreground leading-relaxed mb-6">
              At our Winter Park location serving the greater Orlando area, our licensed therapists utilize evidence-based approaches proven effective through decades of clinical research. We recognize that every person's journey is unique, which is why we tailor our therapeutic interventions to your specific needs and goals. With convenient telehealth appointments and same-week availability, accessing quality therapy in Winter Park and Orlando has never been easier.
            </p>

            <h3 className="text-2xl font-sans font-semibold text-foreground mb-4 mt-8">How Does Therapy Work?</h3>
            
            <p className="text-foreground leading-relaxed mb-6">
              Therapy begins with an initial assessment where you'll meet with your therapist to discuss your concerns, goals, and what you hope to achieve through treatment. Together, you'll develop a personalized treatment plan that outlines the therapeutic approach and frequency of sessions. Most clients attend weekly or bi-weekly sessions, though this can be adjusted based on your needs and progress.
            </p>

            <p className="text-foreground leading-relaxed mb-6">
              During therapy sessions, you'll work collaboratively with your therapist to identify patterns in your thoughts and behaviors, develop healthier coping strategies, process difficult emotions, and build skills for managing life's challenges. Therapy isn't about giving advice or telling you what to do—instead, it's about helping you discover your own insights, strengths, and solutions while providing professional guidance and support along the way.
            </p>

            <h3 className="text-2xl font-sans font-semibold text-foreground mb-4 mt-8">Benefits of Professional Therapy</h3>
            
            <p className="text-foreground leading-relaxed mb-4">
              Research consistently demonstrates that therapy can lead to significant improvements in mental health, relationships, and overall quality of life. Benefits often include:
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  Reduced symptoms of anxiety, depression, and other mental health conditions
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  Improved emotional regulation and healthier coping mechanisms for managing stress
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  Enhanced self-awareness and understanding of your thoughts, feelings, and behaviors
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  Stronger, more fulfilling relationships with family, friends, and romantic partners
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  Greater confidence, self-esteem, and ability to navigate life's challenges
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-sans font-semibold text-foreground mb-4 mt-8">Choosing the Right Therapeutic Approach</h3>
            
            <p className="text-foreground leading-relaxed mb-6">
              We offer a variety of evidence-based therapeutic modalities, each with unique strengths for addressing different concerns. <Link href="/cognitive-behavioral-therapy" className="text-primary hover:underline font-medium">Cognitive Behavioral Therapy (CBT)</Link> is highly effective for anxiety and depression, helping you identify and change unhelpful thought patterns. <Link href="/emdr-therapy" className="text-primary hover:underline font-medium">EMDR therapy</Link> is specifically designed for trauma processing, while <Link href="/couples-counseling" className="text-primary hover:underline font-medium">couples therapy</Link> focuses on improving communication and intimacy in relationships.
            </p>

            <p className="text-foreground leading-relaxed mb-6">
              Don't worry if you're unsure which type of therapy is right for you—during your initial consultation, we'll help you understand the different approaches and recommend the best fit based on your specific situation and goals. Many therapists integrate multiple therapeutic techniques to create a personalized treatment approach that addresses your unique needs. Our priority is ensuring you receive the most effective care possible, whether that's through individual therapy, couples counseling, or a combination of therapeutic interventions paired with <Link href="/services" className="text-primary hover:underline font-medium">medication management</Link> when appropriate.
            </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {sortedTherapies.map((therapy) => {
            const IconComponent = TherapyIconMap[therapy.icon] || Heart;
            
            return (
              <Link 
                key={therapy.id} 
                href={`/${therapy.slug}`} 
                data-testid={`link-therapy-${therapy.id}`}
                onClick={() => trackEvent('therapy_service_click', 'engagement', 'Therapy Page', therapy.title)}
              >
                <Card className="h-full hover-elevate active-elevate-2 cursor-pointer transition-all">
                  <CardHeader className="flex flex-col items-center text-center space-y-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2" data-testid={`text-therapy-title-${therapy.id}`}>
                        {therapy.title}
                      </CardTitle>
                      <CardDescription data-testid={`text-therapy-description-${therapy.id}`}>
                        {therapy.shortDescription}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button variant="outline" className="w-full" data-testid={`button-learn-more-${therapy.id}`}>
                      Learn More
                    </Button>
                  </CardContent>
                    </Card>
              </Link>
            );
          })}
            </div>

          </div>{/* End Main Content Column */}

          {/* Sticky Sidebar - Right Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card className="border-2 border-primary/20">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="text-2xl">Schedule Therapy Today</CardTitle>
                  <CardDescription>Same-week appointments available. Most insurance accepted.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ShortContactForm service="Therapy Services" />
                </CardContent>
              </Card>
              
              {/* Quick Contact Info */}
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Call Us</h4>
                    <a 
                      href="tel:3868488751" 
                      className="text-2xl font-bold text-primary hover:underline block"
                      data-testid="sidebar-phone"
                      onClick={() => trackEvent('phone_click', 'conversion', 'Therapy Sidebar')}
                    >
                      386-848-8751
                    </a>
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-2">Location</h4>
                    <p className="text-sm text-muted-foreground">
                      1155 Louisiana Ave Suite 202<br />
                      Winter Park, FL 32789
                    </p>
                    <a 
                      href="https://maps.google.com/?q=1155+Louisiana+Ave+Suite+202+Winter+Park+FL+32789" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline mt-2 inline-block"
                    >
                      Get Directions →
                    </a>
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-2">Hours</h4>
                    <p className="text-sm text-muted-foreground">
                      Mon-Sat: 9:00 AM - 6:00 PM<br />
                      Telehealth available
                    </p>
                  </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>{/* End Grid */}

        {/* Mid-Page CTA - Improves conversion */}
        <div className="bg-primary/5 border-y py-12 my-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-4">Ready to Take the First Step?</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Same-week appointments available. Most insurance accepted. Telehealth and in-person options.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild data-testid="button-mid-cta-call">
                <a href="tel:3868488751" className="flex items-center justify-center gap-2" onClick={() => trackEvent('phone_click', 'conversion', 'Therapy Mid-Page CTA')}>
                  <Phone className="h-5 w-5" />
                  Call (386) 848-8751
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-mid-cta-request">
                <Link href="/request-appointment" className="flex items-center justify-center gap-2" onClick={() => trackEvent('appointment_request', 'conversion', 'Therapy Mid-Page CTA')}>
                  <Mail className="h-5 w-5" />
                  Request Appointment
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <TherapyFAQ />

      {/* Trust Badges */}
      <ReviewsAndBadges />
      
      <SiteFooter />
    </div>
  );
}
