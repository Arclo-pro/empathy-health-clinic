import { Link } from "wouter";
import { BookOpen, Brain, Heart, Shield, Users, Lightbulb } from "lucide-react";

const featuredResources = [
  {
    title: "Understanding Love Bombing",
    slug: "what-is-love-bombing",
    icon: Heart,
    description: "Recognize the signs of love bombing in relationships and protect yourself from manipulation.",
    category: "Relationships"
  },
  {
    title: "What Is a Mental Breakdown?",
    slug: "what-is-mental-breakdown",
    icon: Brain,
    description: "Learn about mental breakdown symptoms, causes, and when to seek professional help.",
    category: "Mental Health"
  },
  {
    title: "Crippling Anxiety Signs",
    slug: "signs-of-crippling-anxiety",
    icon: Shield,
    description: "Identify debilitating anxiety symptoms and discover effective treatment options.",
    category: "Anxiety"
  },
  {
    title: "Open Relationship Guide",
    slug: "open-relationship-guide",
    icon: Users,
    description: "Understanding open relationships, boundaries, and healthy communication strategies.",
    category: "Relationships"
  },
  {
    title: "Petulant BPD Explained",
    slug: "petulant-bpd-symptoms-and-treatment",
    icon: Brain,
    description: "Learn about petulant borderline personality disorder symptoms and treatment options.",
    category: "Mental Health"
  },
  {
    title: "ADHD Social Exhaustion",
    slug: "understanding-social-exhaustion-adhd-brain",
    icon: Lightbulb,
    description: "Understanding ADHD burnout, daily repetition challenges, and coping strategies.",
    category: "ADHD"
  },
  {
    title: "Therapy vs Counseling",
    slug: "deciphering-the-differences-therapy-vs-counseling",
    icon: BookOpen,
    description: "Discover the key differences between therapy and counseling to make the right choice.",
    category: "Mental Health"
  },
  {
    title: "Bipolar Psychosis Guide",
    slug: "bipolar-psychosis-symptoms-treatment-recovery",
    icon: Brain,
    description: "Understanding bipolar psychosis symptoms, treatment options, and recovery strategies.",
    category: "Mental Health"
  },
  {
    title: "Prodromal Symptoms",
    slug: "prodromal-stage-mental-health",
    icon: Shield,
    description: "Early warning signs of mental health conditions and when to seek help.",
    category: "Mental Health"
  },
  {
    title: "LTR Relationship Meaning",
    slug: "ltr-relationship-meaning-guide",
    icon: Heart,
    description: "What does LTR mean in relationships and how to build lasting connections.",
    category: "Relationships"
  },
  {
    title: "Reactive Attachment Disorder",
    slug: "reactive-attachment-disorder-in-adults",
    icon: Users,
    description: "Understanding RAD in adults, symptoms, causes, and treatment approaches.",
    category: "Mental Health"
  },
  {
    title: "Low Stress Careers",
    slug: "top-10-best-low-stress-jobs",
    icon: Lightbulb,
    description: "Discover the least stressful jobs that pay well and support mental health.",
    category: "Career & Wellness"
  },
  {
    title: "Understanding Nervous Breakdown",
    slug: "nervous-breakdown",
    icon: Brain,
    description: "Recognizing the signs of a nervous breakdown and finding professional support.",
    category: "Mental Health"
  },
  {
    title: "Nocturnal Panic Attacks",
    slug: "nocturnal-panic-attacks-night-treatment",
    icon: Shield,
    description: "Learn about nighttime panic attacks, their causes, and effective treatment strategies.",
    category: "Anxiety"
  },
  {
    title: "Types of Anxiety Disorders",
    slug: "types-of-anxiety-disorders-explained",
    icon: Shield,
    description: "Comprehensive guide to different anxiety disorders and their unique symptoms.",
    category: "Anxiety"
  },
  {
    title: "Psychotherapist vs Psychologist",
    slug: "what-is-a-psychotherapist-vs-psychologist",
    icon: BookOpen,
    description: "Understanding the differences between psychotherapists and psychologists.",
    category: "Mental Health"
  },
  {
    title: "How to Get Over Someone",
    slug: "how-to-get-over-someone-and-move-on-with-your-life",
    icon: Heart,
    description: "Practical strategies for healing after a breakup and moving forward with confidence.",
    category: "Relationships"
  },
  {
    title: "LGBTQIA2S+ Identity Guide",
    slug: "lgbtqia2s-identity-explained",
    icon: Users,
    description: "Understanding LGBTQIA2S+ identities and supporting mental health in the community.",
    category: "Mental Health"
  },
  {
    title: "Narcissistic Behavior in Relationships",
    slug: "narcissistic-behavior-in-a-relationship",
    icon: Heart,
    description: "Identifying narcissistic patterns and protecting yourself from emotional harm.",
    category: "Relationships"
  },
  {
    title: "Psychiatrist vs Psychologist",
    slug: "psychiatrist-vs-psychologist-whats-the-difference",
    icon: BookOpen,
    description: "Key differences between psychiatrists and psychologists to help you choose.",
    category: "Mental Health"
  },
  {
    title: "Psychotherapy vs Counseling",
    slug: "psychotherapy-vs-counseling-therapy-what-is-the-difference",
    icon: BookOpen,
    description: "Understanding the distinctions between psychotherapy and counseling therapy.",
    category: "Mental Health"
  },
  {
    title: "Attention-Seeking Behavior",
    slug: "signs-of-attention-seeking-behavior",
    icon: Users,
    description: "Recognizing attention-seeking behavior patterns and their underlying causes.",
    category: "Mental Health"
  },
  {
    title: "Functional Depression Guide",
    slug: "what-is-functional-depression",
    icon: Brain,
    description: "Understanding high-functioning depression and when to seek professional help.",
    category: "Mental Health"
  },
  {
    title: "What Is Time Blindness?",
    slug: "what-is-time-blindness",
    icon: Lightbulb,
    description: "Learn about time blindness in ADHD and strategies to manage it effectively.",
    category: "ADHD"
  }
];

export default function FeaturedResourcesSection() {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" data-testid="text-featured-resources-heading">
            Featured Mental Health Resources
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our comprehensive guides on mental health, relationships, and wellness. Written by our expert team to help you understand and navigate mental health challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredResources.map((resource) => {
            const IconComponent = resource.icon;
            return (
              <Link
                key={resource.slug}
                href={`/blog/${resource.slug}`}
                data-testid={`link-resource-${resource.slug}`}
              >
                <div className="group h-full p-6 border rounded-lg hover-elevate active-elevate-2 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-primary mb-2">
                        {resource.category}
                      </div>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {resource.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link href="/blog">
            <button
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover-elevate active-elevate-2"
              data-testid="button-view-all-articles"
            >
              <BookOpen className="h-5 w-5" />
              View All Articles
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
