import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Loader2, Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import forestBg from "@assets/stock_images/peaceful_green_fores_98e1a8d8.jpg";

export default function BlogListingPage() {
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="relative py-20 px-4">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${forestBg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
          </div>
          <div className="container mx-auto max-w-6xl relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 text-white" data-testid="text-page-title">
              Mental Health Blog
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Expert insights, guidance, and resources for mental health, wellness, and personal growth. 
              Written by mental health professionals for everyone seeking support and understanding.
            </p>
          </div>
        </div>

        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts?.map((post, index) => (
                <Link key={post.id} href={`/blog/${post.slug}`} data-testid={`blog-post-link-${index}`}>
                  <Card className="h-full hover-elevate cursor-pointer flex flex-col" data-testid={`blog-post-card-${index}`}>
                    <CardHeader className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" data-testid={`badge-category-${index}`}>
                          {post.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-sans leading-tight mb-3" data-testid={`text-blog-title-${index}`}>
                        {post.title}
                      </CardTitle>
                      <p className="text-muted-foreground line-clamp-3 text-sm" data-testid={`text-blog-excerpt-${index}`}>
                        {post.excerpt}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
                        <div className="flex items-center gap-1" data-testid={`text-blog-author-${index}`}>
                          <User className="h-4 w-4" />
                          <span className="truncate">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1" data-testid={`text-blog-date-${index}`}>
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <span className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                          Read article
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {(!blogPosts || blogPosts.length === 0) && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No blog posts available yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-card border-t">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-6">
              Need Professional Support?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              If you're struggling with mental health concerns, our compassionate team is here to help. 
              Schedule a consultation with our licensed mental health professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild data-testid="button-schedule-cta">
                <a href="tel:3868488751">
                  Call 386-848-8751
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-services-cta">
                <Link href="/services">
                  Explore Our Services
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
