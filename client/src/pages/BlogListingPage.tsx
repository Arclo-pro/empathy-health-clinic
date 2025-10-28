import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useState } from "react";
import { Loader2, Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import forestBg from "@assets/stock_images/peaceful_green_fores_98e1a8d8.jpg";

const CATEGORIES = ["All", "Mental Health", "Wellness", "Therapy"];

export default function BlogListingPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts?.filter(post => post.category === selectedCategory);
  
  const featuredPost = filteredPosts?.[0];
  const regularPosts = filteredPosts?.slice(1) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Mental Health Blog | Empathy Health Clinic"
        description="Expert insights, guidance, and resources for mental health, wellness, and personal growth. Written by mental health professionals for everyone seeking support and understanding."
        keywords={["mental health blog", "therapy advice", "wellness tips", "mental health resources", "psychiatric care", "counseling insights"]}
        canonicalPath="/blog"
        type="website"
      />
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-6 text-white" data-testid="text-page-title">
              Mental Health Blog
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Expert insights, guidance, and resources for mental health, wellness, and personal growth. 
              Written by mental health professionals for everyone seeking support and understanding.
            </p>
          </div>
        </div>

        <section className="py-12 md:py-16 bg-background border-b">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-sm font-medium text-muted-foreground">Filter by category:</span>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer hover-elevate"
                    onClick={() => setSelectedCategory(category)}
                    data-testid={`badge-filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {featuredPost && (
              <div className="mb-12" data-testid="featured-post">
                <h2 className="text-2xl font-serif font-medium mb-6 text-foreground">Featured Article</h2>
                <Link href={`/blog/${featuredPost.slug}`}>
                  <Card className="hover-elevate cursor-pointer">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-8">
                        <Badge variant="secondary" className="mb-4" data-testid="badge-featured-category">
                          {featuredPost.category}
                        </Badge>
                        <CardTitle className="text-3xl font-serif font-medium mb-4 leading-tight" data-testid="text-featured-title">
                          {featuredPost.title}
                        </CardTitle>
                        <p className="text-muted-foreground mb-6 text-lg leading-relaxed line-clamp-3" data-testid="text-featured-excerpt">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{featuredPost.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(featuredPost.publishedDate).toLocaleDateString('en-US', { 
                              month: 'long', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{Math.ceil(featuredPost.content.split(' ').length / 200)} min read</span>
                          </div>
                        </div>
                        <Button data-testid="button-featured-read-more">
                          Read Full Article
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                      <div 
                        className="hidden md:block bg-cover bg-center min-h-[300px] rounded-r-lg"
                        style={{ backgroundImage: `url(${forestBg})` }}
                      />
                    </div>
                  </Card>
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-serif font-medium mb-8 text-foreground">
              {selectedCategory === "All" ? "All Articles" : `${selectedCategory} Articles`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts?.map((post, index) => (
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
                          Read full article about {post.title.toLowerCase()}
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {(!filteredPosts || filteredPosts.length === 0) && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  {selectedCategory === "All" 
                    ? "No blog posts available yet. Check back soon!" 
                    : `No ${selectedCategory.toLowerCase()} articles available yet.`}
                </p>
              </div>
            )}

            {filteredPosts && filteredPosts.length === 1 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {selectedCategory === "All" 
                    ? "More articles coming soon!" 
                    : `More ${selectedCategory.toLowerCase()} articles coming soon!`}
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
