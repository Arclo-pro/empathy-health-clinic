import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Brain, Heart, Shield, Users, CheckCircle, Phone, Mail, Target, Zap, AlertCircle } from "lucide-react";
const meditationBg = "/site-assets/stock_images/meditation_mindfulne_859e45be.webp";
import { trackEvent } from "@/lib/analytics";
import TherapyFAQ from "@/components/TherapyFAQ";
import InternalLinkBlock from "@/components/InternalLinkBlock";

export default function StressManagement() {
  const handlePhoneClick = () => {
    trackEvent('phone_click', 'conversion', 'Stress Management Page', '386-848-8751');
  };

  const handleEmailClick = () => {
    trackEvent('email_click', 'conversion', 'Stress Management Page');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Stress Management Counseling Winter Park FL | Stress Therapy"
        description="Expert stress management counseling in Winter Park, FL. Learn coping strategies for work stress, chronic stress, and burnout. Evidence-based stress therapy. Call 386-848-8751."
        keywords={["stress management counseling", "stress therapy Winter Park", "stress counseling Orlando", "workplace stress therapy", "burnout treatment", "chronic stress help", "stress management near me"]}
        canonicalPath="/stress-management"
      />
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative py-20 px-4">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${meditationBg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
          </div>
          <div className="container mx-auto max-w-6xl relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/90 mb-4">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 text-white" data-testid="text-page-title">
              Stress Management Counseling
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Take control of stress before it controls you. Our licensed therapists in Winter Park, FL provide evidence-based stress management strategies to help you find balance and peace.
            </p>
          </div>
        </div>

        {/* What We Treat Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
                Types of Stress We Address
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Whether you're dealing with work pressure, life transitions, or chronic stress, we provide specialized support
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card data-testid="card-workplace-stress">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Workplace Stress</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    High-pressure jobs, difficult colleagues, deadline stress, work-life balance issues, and career transitions. Learn to set boundaries and manage job-related anxiety.
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="card-chronic-stress">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <AlertCircle className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Chronic Stress</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Long-term stress affecting your health, sleep, and relationships. We help you identify stress triggers and develop sustainable coping mechanisms.
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="card-burnout">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Burnout & Exhaustion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Feeling emotionally drained, overwhelmed, or exhausted by demands. We provide strategies to restore energy and prevent future burnout.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Evidence-Based Approaches Section */}
        <section className="py-16 md:py-20 bg-card border-y">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">
                Evidence-Based Stress Management Strategies
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our therapists use proven techniques to help you manage stress effectively
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Cognitive Behavioral Therapy (CBT)</h3>
                    <p className="text-muted-foreground">Identify and change stress-inducing thought patterns and develop healthier responses to stressors</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Mindfulness-Based Stress Reduction</h3>
                    <p className="text-muted-foreground">Learn meditation and mindfulness techniques to stay present and reduce stress reactivity</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Relaxation Techniques</h3>
                    <p className="text-muted-foreground">Progressive muscle relaxation, deep breathing exercises, and guided imagery for immediate stress relief</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Time Management & Prioritization</h3>
                    <p className="text-muted-foreground">Develop practical skills to manage overwhelming schedules and competing demands</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Stress Physiology Education</h3>
                    <p className="text-muted-foreground">Understand how stress affects your body and brain to better manage physical symptoms</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Boundary Setting Skills</h3>
                    <p className="text-muted-foreground">Learn to say no, set healthy limits, and protect your time and energy</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Problem-Solving Strategies</h3>
                    <p className="text-muted-foreground">Develop effective approaches to tackle stressors rather than avoiding them</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Lifestyle Modifications</h3>
                    <p className="text-muted-foreground">Optimize sleep, exercise, nutrition, and social connections to build stress resilience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Signs You May Need Help Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-8 text-center">
              Signs You May Benefit from Stress Management Counseling
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-foreground">Feeling overwhelmed by daily responsibilities</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-foreground">Difficulty sleeping or constant fatigue</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-foreground">Frequent headaches, muscle tension, or stomach issues</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-foreground">Irritability, anger, or mood swings</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-foreground">Difficulty concentrating or making decisions</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-foreground">Using alcohol, food, or other substances to cope</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-foreground">Withdrawing from friends and activities</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-foreground">Constant worry or racing thoughts</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-foreground">Changes in appetite or weight</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-foreground">Feeling like stress is affecting your health</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What to Expect Section */}
        <section className="py-16 md:py-20 bg-card border-y">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-8 text-center">
              What to Expect from Stress Management Therapy
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Comprehensive Stress Assessment</h3>
                  <p className="text-muted-foreground">
                    Your therapist will assess your stress levels, identify triggers, and understand how stress manifests in your life (physically, emotionally, and behaviorally).
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Personalized Treatment Plan</h3>
                  <p className="text-muted-foreground">
                    Together, you'll create a customized plan combining the most effective techniques for your specific stressors and goals.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Learn Practical Coping Skills</h3>
                  <p className="text-muted-foreground">
                    Develop a toolkit of stress management techniques you can use immediately, including breathing exercises, thought reframing, and relaxation strategies.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Build Long-Term Resilience</h3>
                  <p className="text-muted-foreground">
                    Beyond immediate relief, you'll develop sustainable habits and perspectives that prevent stress from overwhelming you in the future.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-8 text-center">
              Why Choose Empathy Health Clinic for Stress Management
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Licensed Mental Health Professionals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our therapists are licensed, experienced specialists in stress management and evidence-based therapeutic techniques.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Compassionate, Judgment-Free Care</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We create a safe, supportive environment where you can openly discuss stressors without fear of judgment.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Insurance & Flexible Payment Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We accept most major insurance plans and offer sliding scale fees to make stress management counseling accessible.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Convenient Winter Park Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Located in Winter Park, FL serving Orlando and surrounding communities. In-person and telehealth options available.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-4">
              Take the First Step Toward a Calmer Life
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Don't let stress control your life. Contact our Winter Park stress management specialists today to learn effective coping strategies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild
                size="lg"
                data-testid="button-call-now"
              >
                <a href="tel:3868488751" onClick={handlePhoneClick}>
                  <Phone className="h-5 w-5 mr-2" />
                  Call 386-848-8751
                </a>
              </Button>

              <Button 
                asChild
                variant="outline"
                size="lg"
                data-testid="button-email"
              >
                <a href="mailto:providers@empathyhealthclinic.com" onClick={handleEmailClick}>
                  <Mail className="h-5 w-5 mr-2" />
                  Email Us
                </a>
              </Button>

              <Button 
                asChild
                variant="outline"
                size="lg"
                data-testid="button-request-appointment"
              >
                <Link href="/request-appointment">
                  Request Appointment
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <TherapyFAQ pageTitle="Stress Management" />

        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <InternalLinkBlock 
              category="conditions"
              title="Related Conditions We Treat"
              variant="list"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
