import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Loader2, ArrowLeft, Calendar, User, Share2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ShortContactForm from "@/components/ShortContactForm";
import forestBg from "@assets/stock_images/peaceful_green_fores_98e1a8d8.jpg";

export default function BlogDetailPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";

  const { data: blogPost, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog-posts/slug", slug],
    queryFn: async () => {
      const response = await fetch(`/api/blog-posts/slug/${slug}`);
      if (!response.ok) {
        throw new Error("Blog post not found");
      }
      return response.json();
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find the blog post you're looking for.
          </p>
          <Button asChild data-testid="button-back-to-blog">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="relative py-16 px-4">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${forestBg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
          </div>
          <div className="container mx-auto max-w-4xl relative z-10">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors" 
              data-testid="link-back-to-blog"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
            <div className="mb-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30" data-testid="badge-category">
                {blogPost.category}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold mb-6 text-white" data-testid="text-blog-title">
              {blogPost.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-2" data-testid="text-blog-author">
                <User className="h-5 w-5" />
                <span>{blogPost.author}</span>
              </div>
              <div className="flex items-center gap-2" data-testid="text-blog-date">
                <Calendar className="h-5 w-5" />
                <span>{new Date(blogPost.publishedDate).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span>{Math.ceil(blogPost.content.split(' ').length / 200)} min read</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <article 
                className="prose prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80"
                data-testid="article-content"
              >
                {blogPost.content.split('\n\n').map((paragraph, index) => {
                  // Handle headings (lines starting with ##)
                  if (paragraph.startsWith('## ')) {
                    const heading = paragraph.replace('## ', '');
                    return (
                      <h2 key={index} className="text-2xl font-sans font-bold mt-8 mb-4 text-foreground">
                        {heading}
                      </h2>
                    );
                  }
                  
                  // Handle subheadings (lines starting with ###)
                  if (paragraph.startsWith('### ')) {
                    const heading = paragraph.replace('### ', '');
                    return (
                      <h3 key={index} className="text-xl font-sans font-bold mt-6 mb-3 text-foreground">
                        {heading}
                      </h3>
                    );
                  }

                  // Handle bullet lists
                  if (paragraph.includes('\n- ')) {
                    const items = paragraph.split('\n').filter(line => line.trim());
                    return (
                      <ul key={index} className="list-disc pl-6 space-y-2 my-4">
                        {items.map((item, i) => {
                          const text = item.replace(/^- /, '').replace(/^\*\*(.+?)\*\*:?/, '<strong>$1</strong>:');
                          return (
                            <li key={i} dangerouslySetInnerHTML={{ __html: text }} />
                          );
                        })}
                      </ul>
                    );
                  }

                  // Handle regular paragraphs with bold text
                  const formattedParagraph = paragraph
                    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.+?)\*/g, '<em>$1</em>');

                  return (
                    <p key={index} className="mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: formattedParagraph }} />
                  );
                })}
              </article>

              <div className="mt-12 pt-8 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Share this article</p>
                    <Button variant="outline" size="sm" data-testid="button-share">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                  <Button asChild data-testid="button-back-to-blog-bottom">
                    <Link href="/blog">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      More Articles
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="sticky top-4 space-y-6">
                <ShortContactForm data-testid="form-contact" />
                
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-lg font-sans font-bold text-foreground mb-4">
                    Get Professional Help
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you're struggling with mental health concerns, our team is here to support you.
                  </p>
                  <div className="space-y-3">
                    <Button className="w-full" asChild data-testid="button-call-sidebar">
                      <a href="tel:3868488751">
                        Call 386-848-8751
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full" asChild data-testid="button-services-sidebar">
                      <Link href="/services">
                        View Services
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-lg font-sans font-bold text-foreground mb-3">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Mental Health</Badge>
                    <Badge variant="secondary">Wellness</Badge>
                    <Badge variant="secondary">Therapy</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="py-16 bg-card border-t">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-6">
              Ready to Take the Next Step?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Schedule a consultation with our experienced mental health professionals today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild data-testid="button-schedule-cta">
                <a href="tel:3868488751">
                  Call 386-848-8751
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-insurance-cta">
                <Link href="/insurance">
                  Check Insurance Coverage
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
