import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Loader2, ArrowLeft, Calendar, User, Share2, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useMemo } from "react";
import type { BlogPost } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import FAQSchema from "@/components/FAQSchema";
import forestBg from "@assets/stock_images/misty_forest_morning_c7552d0a.jpg";

function optimizeUnsplashUrl(url: string, width: number, height: number, quality: number = 60): string {
  if (!url || !url.includes('unsplash.com')) {
    return url;
  }
  
  const separator = url.includes('?') ? '&' : '?';
  // ULTRA-AGGRESSIVE COMPRESSION: quality 60 for sub-2.5s LCP, webp format, aggressive compression
  return `${url}${separator}w=${width}&h=${height}&q=${quality}&fm=webp&fit=crop&auto=format&dpr=1`;
}

function stripHtmlTags(text: string): string {
  let cleaned = text;
  
  // Remove GPT response artifacts (meta-commentary about the content)
  cleaned = cleaned.replace(/^Here is.*?:[\s\n]*/i, '');
  cleaned = cleaned.replace(/^The updated.*?:[\s\n]*/i, '');
  cleaned = cleaned.replace(/^I've.*?:[\s\n]*/i, '');
  cleaned = cleaned.replace(/^Below is.*?:[\s\n]*/i, '');
  
  // Remove code fences (```html, ```, etc.)
  cleaned = cleaned.replace(/```html[\s\n]*/gi, '');
  cleaned = cleaned.replace(/```[\s\n]*/g, '');
  
  // Convert HTML tags to markdown
  cleaned = cleaned
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<p[^>]*>/gi, '')
    .replace(/<strong[^>]*>/gi, '**')
    .replace(/<\/strong>/gi, '**')
    .replace(/<b[^>]*>/gi, '**')
    .replace(/<\/b>/gi, '**')
    .replace(/<em[^>]*>/gi, '_')
    .replace(/<\/em>/gi, '_')
    .replace(/<i[^>]*>/gi, '_')
    .replace(/<\/i>/gi, '_')
    .replace(/<a[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/<h1[^>]*>/gi, '# ')
    .replace(/<\/h1>/gi, '\n')
    .replace(/<h2[^>]*>/gi, '## ')
    .replace(/<\/h2>/gi, '\n')
    .replace(/<h3[^>]*>/gi, '### ')
    .replace(/<\/h3>/gi, '\n')
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<ul[^>]*>|<\/ul>|<ol[^>]*>|<\/ol>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
  
  // Clean up excessive newlines
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  cleaned = cleaned.trim();
  
  return cleaned;
}

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
    
    if (isExternal) {
      parts.push(
        <a
          key={match.index}
          href={linkUrl}
          className="text-primary hover:text-primary/80 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkText}
        </a>
      );
    } else {
      parts.push(
        <Link
          key={match.index}
          href={linkUrl}
          className="text-primary hover:text-primary/80 underline"
        >
          {linkText}
        </Link>
      );
    }
    
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

function extractFAQs(content: string): Array<{ question: string; answer: string }> {
  const faqs: Array<{ question: string; answer: string }> = [];
  const lines = content.split('\n');
  
  let currentQuestion = '';
  let currentAnswer: string[] = [];
  let inFAQSection = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.match(/^##\s*(FAQ|Frequently Asked Questions|Common Questions)/i)) {
      inFAQSection = true;
      continue;
    }
    
    if (inFAQSection) {
      if (line.startsWith('###')) {
        if (currentQuestion && currentAnswer.length > 0) {
          faqs.push({
            question: currentQuestion,
            answer: currentAnswer.join(' ').replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
          });
        }
        currentQuestion = line.replace(/^###\s*/, '').replace(/[*#]/g, '').trim();
        currentAnswer = [];
      } else if (line && !line.startsWith('#')) {
        currentAnswer.push(line);
      } else if (line.startsWith('##') && currentQuestion) {
        break;
      }
    }
  }
  
  if (currentQuestion && currentAnswer.length > 0) {
    faqs.push({
      question: currentQuestion,
      answer: currentAnswer.join(' ').replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    });
  }
  
  return faqs;
}

export default function BlogDetailPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";
  const { toast } = useToast();

  // Single optimized query with related posts from server
  const { data, isLoading, error } = useQuery<{ post: BlogPost; relatedPosts: BlogPost[] }>({
    queryKey: [`/api/blog-posts/slug/${slug}`],
    enabled: !!slug,
  });

  const blogPost = data?.post;
  const relatedPosts = data?.relatedPosts || [];

  // Memoize expensive text processing to prevent re-computation on every render
  const detectedFAQs = useMemo(() => 
    blogPost ? extractFAQs(blogPost.content) : [],
    [blogPost?.content]
  );

  // Memoize the entire content rendering - this is a MASSIVE performance optimization
  // Processing thousands of lines on every render was causing the 16s LCP
  const renderedContent = useMemo(() => {
    if (!blogPost) return null;
    
    const cleanedContent = stripHtmlTags(blogPost.content);
    const lines = cleanedContent.split('\n');
    const elements: JSX.Element[] = [];
    let currentParagraph: string[] = [];
    let inList = false;
    let listItems: JSX.Element[] = [];
    let paragraphCount = 0;
    let h2Count = 0;
    
    const flushParagraph = (index: number) => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(' ');
        elements.push(
          <p key={`p-${index}`} className="text-foreground leading-relaxed my-4">
            {renderTextWithLinks(text)}
          </p>
        );
        paragraphCount++;
        
        // Inline CTA after 3-4 paragraphs
        if (paragraphCount === 3) {
          elements.push(
            <div key="inline-cta" className="my-8 p-4 bg-muted/50 border-l-4 border-primary rounded-r-lg" data-testid="inline-cta">
              <p className="text-foreground mb-2">
                <strong className="text-primary">Did you know?</strong> Evidence-based therapy can significantly improve symptoms of anxiety, depression, and stress.
              </p>
              <Link href="/cognitive-behavioral-therapy" className="text-primary hover:text-primary/80 underline font-medium">
                Learn more about CBT therapy →
              </Link>
            </div>
          );
        }
        
        currentParagraph = [];
      }
    };
    
    const flushList = (index: number) => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`ul-${index}`} className="list-disc pl-6 space-y-2 my-4">
            {listItems}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      
      // Skip empty lines
      if (!trimmed) {
        flushParagraph(index);
        flushList(index);
        return;
      }
      
      // H1 Headings (skip, already in hero)
      if (trimmed.match(/^#\s+/)) {
        flushParagraph(index);
        flushList(index);
        return;
      }
      
      // H2 Headings
      if (trimmed.match(/^##\s+/)) {
        flushParagraph(index);
        flushList(index);
        const heading = trimmed.replace(/^##\s+/, '');
        elements.push(
          <h2 key={`h2-${index}`} className="text-2xl font-sans font-bold mt-8 mb-4 text-foreground">
            {renderTextWithLinks(heading)}
          </h2>
        );
        h2Count++;
        
        // Mid-page conversion CTA after 3rd H2 section (~60% through)
        if (h2Count === 3) {
          elements.push(
            <div key="mid-cta" className="my-12 p-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl text-center shadow-lg" data-testid="mid-page-cta">
              <h3 className="text-3xl font-bold mb-4 text-white">Ready to Start Therapy?</h3>
              <p className="text-lg mb-8 text-white/95 max-w-2xl mx-auto">
                Take the first step toward feeling better. Our Orlando therapists specialize in evidence-based treatment for anxiety, depression, and more.
              </p>
              <Button asChild size="lg" className="bg-white text-green-700 hover:bg-white/95 font-semibold shadow-md" data-testid="button-mid-cta">
                <Link href="/request-appointment">Schedule Your Appointment</Link>
              </Button>
              <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-white/95">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  Licensed Therapists
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  HIPAA Secure
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  Insurance Accepted
                </span>
              </div>
            </div>
          );
        }
        
        return;
      }
      
      // H3 Headings
      if (trimmed.match(/^###\s+/)) {
        flushParagraph(index);
        flushList(index);
        const heading = trimmed.replace(/^###\s+/, '');
        elements.push(
          <h3 key={`h3-${index}`} className="text-xl font-sans font-semibold mt-6 mb-3 text-foreground">
            {renderTextWithLinks(heading)}
          </h3>
        );
        return;
      }

      // List items
      if (trimmed.match(/^-\s+/)) {
        flushParagraph(index);
        inList = true;
        // Remove list marker and checkbox syntax
        let text = trimmed.replace(/^-\s*/, '').replace(/^\[\s*\]\s*/, '').replace(/^\[x\]\s*/i, '');
        if (text) {
          listItems.push(
            <li key={`li-${index}`} className="text-foreground">
              {renderTextWithLinks(text)}
            </li>
          );
        }
        return;
      }

      // Regular text - accumulate into paragraph
      if (!inList) {
        currentParagraph.push(trimmed);
      } else {
        flushList(index);
        currentParagraph.push(trimmed);
      }
    });
    
    // Flush any remaining content
    flushParagraph(lines.length);
    flushList(lines.length);
    
    return elements;
  }, [blogPost?.content]);

  useEffect(() => {
    if (blogPost) {
      const canonicalSlug = blogPost.canonicalSlug || blogPost.slug;
      const jsonLd: any = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blogPost.metaTitle || blogPost.title,
        "author": {
          "@type": "Person",
          "name": blogPost.author,
          "url": window.location.origin,
          "affiliation": {
            "@type": "MedicalOrganization",
            "name": "Empathy Health Clinic"
          },
          "knowsAbout": ["Mental Health", "Psychiatry", "Psychology", "Psychotherapy"]
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
          "@id": `${window.location.origin}/blog/${canonicalSlug}`
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
      <div className="min-h-screen flex flex-col bg-background">
        <SiteHeader />
        <main className="flex-1">
          {/* Hero Skeleton */}
          <div className="relative py-16 px-4 min-h-[400px] bg-muted">
            <div className="container mx-auto max-w-4xl">
              <div className="h-4 w-32 bg-muted-foreground/20 rounded mb-6 animate-pulse" />
              <div className="h-12 w-3/4 bg-muted-foreground/20 rounded mb-4 animate-pulse" />
              <div className="h-4 w-64 bg-muted-foreground/20 rounded animate-pulse" />
            </div>
          </div>
          {/* Content Skeleton */}
          <div className="container mx-auto px-4 py-12 max-w-7xl">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-6 w-full bg-muted rounded animate-pulse" />
                <div className="h-6 w-full bg-muted rounded animate-pulse" />
                <div className="h-6 w-5/6 bg-muted rounded animate-pulse" />
                <div className="h-6 w-full bg-muted rounded animate-pulse" />
                <div className="h-6 w-4/5 bg-muted rounded animate-pulse" />
                <div className="h-6 w-full bg-muted rounded animate-pulse" />
                <div className="h-6 w-3/4 bg-muted rounded animate-pulse" />
                <div className="mt-8 h-8 w-2/3 bg-muted rounded animate-pulse" />
                <div className="h-6 w-full bg-muted rounded animate-pulse" />
                <div className="h-6 w-5/6 bg-muted rounded animate-pulse" />
                <div className="h-6 w-full bg-muted rounded animate-pulse" />
                <div className="h-6 w-4/5 bg-muted rounded animate-pulse" />
              </div>
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-8 min-h-[600px]">
                  <div className="h-64 w-full bg-muted rounded-lg animate-pulse" />
                  <div className="h-48 w-full bg-muted rounded-lg animate-pulse" />
                </div>
              </aside>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h2 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h2>
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

  // ULTRA-AGGRESSIVE image optimization for sub-2.5s LCP target
  // Mobile: 640px width, 300px height, quality 55 (maximum compression for mobile)
  // Tablet: 1024px width, 400px height, quality 58 (balanced for tablet)
  // Desktop: 1200px width, 500px height, quality 60 (webp allows excellent quality at 60)
  const heroImageMobile = blogPost.featuredImage 
    ? optimizeUnsplashUrl(blogPost.featuredImage, 640, 300, 55)
    : forestBg;
  
  const heroImageTablet = blogPost.featuredImage 
    ? optimizeUnsplashUrl(blogPost.featuredImage, 1024, 400, 58)
    : forestBg;
  
  const optimizedHeroImage = blogPost.featuredImage 
    ? optimizeUnsplashUrl(blogPost.featuredImage, 1200, 500, 60)
    : forestBg;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title={blogPost.metaTitle || `${blogPost.title} | Empathy Health Clinic`}
        description={
          blogPost.metaDescription || 
          blogPost.excerpt || 
          stripHtmlTags(blogPost.content).slice(0, 200).trim()
        }
        keywords={blogPost.keywords ?? undefined}
        ogImage={blogPost.ogImage || blogPost.featuredImage || undefined}
        canonicalPath={`/blog/${blogPost.canonicalSlug || blogPost.slug}`}
        type="article"
        publishedDate={blogPost.publishedDate}
        modifiedDate={blogPost.lastUpdated || blogPost.publishedDate}
        author={blogPost.author}
        preloadImage={optimizedHeroImage}
      />
      {detectedFAQs.length > 0 && <FAQSchema faqs={detectedFAQs} />}
      <SiteHeader />
      <main className="flex-1">
        <div className="relative py-12 md:py-16 px-4 min-h-[300px] md:min-h-[400px] overflow-hidden">
          <img
            src={optimizedHeroImage}
            srcSet={`${heroImageMobile} 640w, ${heroImageTablet} 1024w, ${optimizedHeroImage} 1200w`}
            sizes="(max-width: 768px) 640px, (max-width: 1024px) 1024px, 1200px"
            alt={`${blogPost.title} - Mental Health Blog - Empathy Health Clinic Orlando FL`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(1.3)', aspectRatio: "1200/500" }}
            loading="eager"
            fetchpriority="high"
            decoding="async"
            width={1200}
            height={500}
            data-testid="img-blog-hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
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
              <Link href={`/blog?category=${encodeURIComponent(blogPost.category)}`} data-testid="link-category">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 cursor-pointer hover:bg-white/30 transition-colors" data-testid="badge-category">
                  {blogPost.category}
                </Badge>
              </Link>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold mb-6 text-white" data-testid="text-blog-title">
              {blogPost.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <Link href="/team" className="flex items-center gap-2 hover:text-white transition-colors" data-testid="link-blog-author">
                <User className="h-5 w-5" />
                <span>{blogPost.author}</span>
              </Link>
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
              {/* Hero CTA - Lead Capture Optimized */}
              <div className="mb-8 bg-primary/5 border border-primary/20 rounded-lg p-6 text-center" data-testid="hero-cta">
                <p className="text-lg text-foreground mb-4 font-medium">
                  Struggling with anxiety, depression, or stress? Our licensed therapists in Orlando are here to help.
                </p>
                <Button asChild size="lg" className="" data-testid="button-hero-cta">
                  <Link href="/request-appointment">Book a Free Consultation</Link>
                </Button>
              </div>

              <article 
                className="prose prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80"
                data-testid="article-content"
              >
                {renderedContent}
              </article>

              {/* Testimonial Block - Trust & Social Proof */}
              <section className="mt-12 p-8 bg-card border border-card-border rounded-lg" data-testid="testimonial-block">
                <h3 className="text-2xl font-sans font-bold mb-6 text-foreground text-center">What Our Patients Say</h3>
                <blockquote className="text-center mb-6">
                  <p className="text-lg italic text-muted-foreground mb-4">
                    "The therapy I received at Empathy Health Clinic helped me take control of my anxiety and feel like myself again. The therapists are compassionate and truly understand what I'm going through."
                  </p>
                  <cite className="text-sm font-medium text-foreground">— Verified Patient</cite>
                </blockquote>
                <p className="text-center">
                  <Link href="/request-appointment" className="text-primary hover:text-primary/80 font-medium underline">
                    Schedule a consultation
                  </Link>
                  {' '}and begin your journey to wellness today.
                </p>
              </section>

              {relatedPosts.length > 0 && (
                <section className="mt-16 pt-16 border-t" data-testid="section-related-articles">
                  <h2 className="text-3xl font-sans font-bold mb-8 text-foreground">Related Articles</h2>
                  <div className="grid md:grid-cols-2 gap-6 min-h-[300px]">
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

              {/* Professional Mental Health Support - Internal Links Section */}
              <section className="mt-12 pt-12 border-t" data-testid="section-related-resources">
                <h3 className="text-2xl md:text-3xl font-sans font-bold text-foreground mb-8 text-center">
                  Professional Mental Health Support
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Link href="/services" className="p-6 border rounded-lg hover-elevate cursor-pointer group" data-testid="link-resource-services">
                    <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      Our Services
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive mental health services including therapy, psychiatry, and counseling
                    </p>
                  </Link>
                  <Link href="/therapy" className="p-6 border rounded-lg hover-elevate cursor-pointer group" data-testid="link-resource-therapy">
                    <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      Therapy Options
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Evidence-based therapeutic approaches tailored to your needs
                    </p>
                  </Link>
                  <Link href="/team" className="p-6 border rounded-lg hover-elevate cursor-pointer group" data-testid="link-resource-team">
                    <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      Meet Our Team
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Licensed, experienced mental health professionals dedicated to your care
                    </p>
                  </Link>
                  <Link href="/blog" className="p-6 border rounded-lg hover-elevate cursor-pointer group" data-testid="link-resource-blog">
                    <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      Mental Health Blog
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Expert insights and resources on mental health topics
                    </p>
                  </Link>
                  <Link href="/virtual-therapy" className="p-6 border rounded-lg hover-elevate cursor-pointer group" data-testid="link-resource-virtual">
                    <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      Virtual Therapy
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Convenient telehealth sessions from the comfort of home
                    </p>
                  </Link>
                  <Link href="/request-appointment" className="p-6 border rounded-lg hover-elevate cursor-pointer group" data-testid="link-resource-appointment">
                    <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      Request Appointment
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Schedule your first consultation with our compassionate team
                    </p>
                  </Link>
                </div>
              </section>

              {/* Final CTA - Always Present */}
              <section className="mt-12 p-10 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg text-center" data-testid="final-cta">
                <h3 className="text-3xl font-sans font-bold mb-4 text-foreground">Take the First Step Toward Healing</h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Empathy Health Clinic offers personalized, evidence-based therapy for adults and teens in Orlando and Winter Park. Start your journey to wellness today.
                </p>
                <Button asChild size="lg" className="" data-testid="button-final-cta">
                  <Link href="/request-appointment">Book Your Appointment Now</Link>
                </Button>
              </section>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8 min-h-[600px]">
                <Card data-testid="card-author-bio">
                  <CardHeader>
                    <CardTitle className="text-xl font-sans">About the Author</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Link href="/team" className="flex items-center gap-3 hover-elevate rounded-lg p-2 -m-2 transition-colors" data-testid="link-author-bio">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{blogPost.author}</p>
                        <p className="text-sm text-muted-foreground">Mental Health Expert</p>
                      </div>
                    </Link>
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
