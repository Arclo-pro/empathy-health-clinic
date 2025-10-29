import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import * as Icons from "lucide-react";
import type { Therapy } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";

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
        title="Therapy Services | Empathy Health Clinic | Florida Counseling"
        description="Comprehensive therapy and counseling services including CBT, DBT, trauma-focused therapy, couples counseling, and more. Licensed therapists providing evidence-based care in Florida."
        keywords={["therapy", "counseling", "CBT", "DBT", "trauma therapy", "couples therapy", "Florida therapy", "mental health counseling"]}
        canonicalPath="/therapy"
      />
      <SiteHeader />
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-4">
            Therapy Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Evidence-based therapeutic approaches tailored to your unique needs. 
            Explore our comprehensive therapy services to find the right path for your healing journey.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-6">The Healing Power of Therapy</h2>
            
            <p className="text-foreground leading-relaxed mb-6">
              Therapy provides a safe, confidential space to explore your thoughts, feelings, and behaviors with a trained mental health professional. Whether you're facing a specific challenge like <Link href="/anxiety-disorders" className="text-primary hover:underline font-medium">anxiety</Link> or <Link href="/depression" className="text-primary hover:underline font-medium">depression</Link>, navigating a major life transition, or simply seeking personal growth, therapy offers powerful tools for understanding yourself better and creating lasting positive change.
            </p>

            <p className="text-foreground leading-relaxed mb-6">
              At Empathy Health Clinic, our licensed therapists utilize evidence-based therapeutic approaches proven effective through decades of clinical research. We recognize that every person's journey is unique, which is why we tailor our therapeutic interventions to your specific needs, goals, and circumstances. Our therapists are experienced in working with a wide range of mental health conditions and life challenges, from trauma recovery to relationship issues to stress management.
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
              We offer a variety of evidence-based therapeutic modalities, each with unique strengths for addressing different concerns. <Link href="/cognitive-behavioral-therapy" className="text-primary hover:underline font-medium">Cognitive Behavioral Therapy (CBT)</Link> is highly effective for anxiety and depression, helping you identify and change unhelpful thought patterns. <Link href="/emdr-therapy" className="text-primary hover:underline font-medium">EMDR therapy</Link> is specifically designed for trauma processing, while <Link href="/couples-therapy" className="text-primary hover:underline font-medium">couples therapy</Link> focuses on improving communication and intimacy in relationships.
            </p>

            <p className="text-foreground leading-relaxed mb-6">
              Don't worry if you're unsure which type of therapy is right for you—during your initial consultation, we'll help you understand the different approaches and recommend the best fit based on your specific situation and goals. Many therapists integrate multiple therapeutic techniques to create a personalized treatment approach that addresses your unique needs. Our priority is ensuring you receive the most effective care possible, whether that's through individual therapy, couples counseling, or a combination of therapeutic interventions paired with <Link href="/medication-management" className="text-primary hover:underline font-medium">medication management</Link> when appropriate.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {sortedTherapies.map((therapy) => {
            const IconComponent = (Icons as any)[therapy.icon] || Icons.Heart;
            
            return (
              <Link key={therapy.id} href={`/${therapy.slug}`} data-testid={`link-therapy-${therapy.id}`}>
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

        <div className="bg-card rounded-lg p-8 border">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
              Start Your Healing Journey Today
            </h2>
            <p className="text-muted-foreground mb-6">
              Every journey begins with a single step. Our experienced therapists are here to guide you 
              through evidence-based treatments tailored to your unique needs.
            </p>
            <Button variant="default" size="lg" asChild data-testid="button-schedule-consultation">
              <Link href="/#contact">Schedule a Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
