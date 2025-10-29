import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Loader2, ArrowLeft, Calendar, User, Share2, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import type { BlogPost } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import forestBg from "@assets/stock_images/peaceful_green_fores_98e1a8d8.jpg";

function renderTextWithLinks(text: string) {
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const beforeText = text.substring(lastIndex, match.index);
      parts.push(...renderTextWithBold(beforeText));
    }
    
    const linkText = match[1];
    const linkUrl = match[2];
    const isExternal = linkUrl.startsWith('http');
    
    parts.push(
      <a
        key={match.index}
        href={linkUrl}
        className="text-primary hover:text-primary/80 underline"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {linkText}
      </a>
    );
    
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    parts.push(...renderTextWithBold(remainingText));
  }

  return parts.length > 0 ? parts : text;
}

function renderTextWithBold(text: string) {
  const parts: (string | JSX.Element)[] = [];
  const boldRegex = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    
    parts.push(
      <strong key={match.index}>
        {match[1]}
      </strong>
    );
    
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

export default function BlogDetailPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";
  const { toast } = useToast();

  const { data: blogPost, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/blog-posts/slug/${slug}`],
    enabled: !!slug,
  });

  const { data: allPosts } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const relatedPosts = allPosts
    ?.filter(post => post.slug !== slug && post.category === blogPost?.category)
    .slice(0, 3) || [];

  useEffect(() => {
    if (blogPost) {
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blogPost.metaTitle || blogPost.title,
        "author": {
          "@type": "Organization",
          "name": blogPost.author,
        },
        "datePublished": blogPost.publishedDate,
        "dateModified": blogPost.lastUpdated || blogPost.publishedDate,
        "image": blogPost.ogImage || blogPost.featuredImage || forestBg,
        "publisher": {
          "@type": "Organization",
          "name": "Empathy Health Clinic",
          "logo": {
            "@type": "ImageObject",
            "url": `${window.location.origin}/attached_assets/image_1761618219825.png`
          }
        },
        "description": blogPost.metaDescription || blogPost.excerpt,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${window.location.origin}/blog/${blogPost.slug}`
        }
      };

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(jsonLd);
      script.id = "blog-post-jsonld";
      document.head.appendChild(script);

      return () => {
        const existingScript = document.getElementById("blog-post-jsonld");
        if (existingScript) {
          document.head.removeChild(existingScript);
        }
      };
    }
  }, [blogPost]);

  const handleShare = async () => {
    const shareData = {
      title: blogPost?.title || "",
      text: blogPost?.excerpt || "",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast({
          title: "Shared successfully",
          description: "Thanks for sharing!",
        });
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Error sharing:", err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "The article link has been copied to your clipboard.",
        });
      } catch (err) {
        console.error("Failed to copy:", err);
        toast({
          title: "Unable to copy",
          description: "Please copy the URL from your browser.",
          variant: "destructive",
        });
      }
    }
  };

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

  const showLastUpdated = blogPost.lastUpdated && blogPost.lastUpdated !== blogPost.publishedDate;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title={blogPost.metaTitle || `${blogPost.title} | Empathy Health Clinic`}
        description={blogPost.metaDescription || blogPost.excerpt}
        keywords={blogPost.keywords ?? undefined}
        ogImage={blogPost.ogImage || blogPost.featuredImage || undefined}
        canonicalPath={`/blog/${blogPost.canonicalSlug || blogPost.slug}`}
        type="article"
        publishedDate={blogPost.publishedDate}
        modifiedDate={blogPost.lastUpdated || blogPost.publishedDate}
        author={blogPost.author}
      />
      <SiteHeader />
      <main className="flex-1">
        <div className="relative py-16 px-4">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${blogPost.featuredImage || forestBg})` }}
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
              {showLastUpdated && (
                <div className="flex items-center gap-2" data-testid="text-blog-last-updated">
                  <Clock className="h-5 w-5" />
                  <span>Updated {new Date(blogPost.lastUpdated!).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span>{Math.ceil(blogPost.content.split(' ').length / 200)} min read</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="text-white hover:bg-white/10"
                data-testid="button-share"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <article 
                className="prose prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80"
                data-testid="article-content"
              >
                {blogPost.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    const heading = paragraph.replace('## ', '');
                    return (
                      <h2 key={index} className="text-2xl font-sans font-bold mt-8 mb-4 text-foreground">
                        {renderTextWithLinks(heading)}
                      </h2>
                    );
                  }
                  
                  if (paragraph.startsWith('### ')) {
                    const heading = paragraph.replace('### ', '');
                    return (
                      <h3 key={index} className="text-xl font-sans font-semibold mt-6 mb-3 text-foreground">
                        {renderTextWithLinks(heading)}
                      </h3>
                    );
                  }

                  if (paragraph.includes('\n- ')) {
                    const items = paragraph.split('\n').filter(line => line.trim());
                    return (
                      <ul key={index} className="list-disc pl-6 space-y-2 my-4">
                        {items.map((item, i) => {
                          const text = item.replace(/^-\s*/, '');
                          if (!text) return null;
                          
                          return (
                            <li key={i} className="text-foreground">
                              {renderTextWithLinks(text)}
                            </li>
                          );
                        })}
                      </ul>
                    );
                  }

                  return (
                    <p key={index} className="text-foreground leading-relaxed my-4">
                      {renderTextWithLinks(paragraph)}
                    </p>
                  );
                })}
              </article>

              {relatedPosts.length > 0 && (
                <section className="mt-16 pt-16 border-t" data-testid="section-related-articles">
                  <h2 className="text-3xl font-sans font-bold mb-8 text-foreground">Related Articles</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {relatedPosts.map((post, index) => (
                      <Link key={post.id} href={`/blog/${post.slug}`} data-testid={`link-related-article-${index}`}>
                        <Card className="h-full hover-elevate cursor-pointer">
                          <CardHeader>
                            <Badge variant="secondary" className="w-fit mb-2" data-testid={`badge-related-category-${index}`}>
                              {post.category}
                            </Badge>
                            <CardTitle className="text-lg font-sans leading-tight" data-testid={`text-related-title-${index}`}>
                              {post.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                              {post.excerpt}
                            </p>
                            <span className="text-sm text-primary font-medium hover:underline">
                              Read more →
                            </span>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <Card data-testid="card-author-bio">
                  <CardHeader>
                    <CardTitle className="text-xl font-sans">About the Author</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{blogPost.author}</p>
                        <p className="text-sm text-muted-foreground">Mental Health Expert</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Our team of licensed mental health professionals brings years of clinical experience 
                      in psychiatry, psychotherapy, and counseling. We're dedicated to providing evidence-based 
                      insights to support your mental health journey.
                    </p>
                    <div className="pt-4 border-t">
                      <p className="text-xs text-muted-foreground mb-2">Licensed & Certified</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">LCSW</Badge>
                        <Badge variant="outline" className="text-xs">LPC</Badge>
                        <Badge variant="outline" className="text-xs">LMFT</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card data-testid="card-cta">
                  <CardHeader>
                    <CardTitle className="text-xl font-sans">Need Support?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      If you're struggling with mental health concerns, our compassionate team is here to help.
                    </p>
                    <Button className="w-full" asChild data-testid="button-cta-appointment">
                      <Link href="/request-appointment">
                        Schedule Consultation
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild data-testid="button-cta-call">
                      <a href="tel:3868488751">
                        Call 386-848-8751
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
