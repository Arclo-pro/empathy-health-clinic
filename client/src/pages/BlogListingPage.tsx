import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useState } from "react";
import { Loader2, Calendar, User, ArrowRight, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@shared/schema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import forestBg from "@assets/stock_images/calm_forest_trees_me_c92dd644.jpg";

const CATEGORIES = ["Mental Health", "Wellness", "Therapy", "Anxiety", "Depression"];

interface BlogPostsResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export default function BlogListingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data: featuredData } = useQuery<BlogPostsResponse>({
    queryKey: ["/api/blog-posts", { featured: true }],
    queryFn: async () => {
      const response = await fetch("/api/blog-posts?featured=true");
      return response.json();
    }
  });

  const { data: latestData } = useQuery<BlogPostsResponse>({
    queryKey: ["/api/blog-posts", { page: 1, pageSize: 11 }],
    queryFn: async () => {
      const response = await fetch("/api/blog-posts?page=1&pageSize=11");
      return response.json();
    }
  });

  const { data: paginatedData, isLoading } = useQuery<BlogPostsResponse>({
    queryKey: ["/api/blog-posts", { category: selectedCategory, page: currentPage, pageSize: 12 }],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: "12"
      });
      if (selectedCategory) {
        params.append("category", selectedCategory);
      }
      const response = await fetch(`/api/blog-posts?${params}`);
      return response.json();
    }
  });

  const featuredPosts = featuredData?.posts || [];
  const featuredPostIds = new Set(featuredPosts.map(post => post.id));
  const latestPosts = (latestData?.posts || []).filter(post => !featuredPostIds.has(post.id)).slice(0, 9);
  const paginatedPosts = paginatedData?.posts || [];
  const totalPages = paginatedData?.totalPages || 1;

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading && !paginatedData) {
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
        description="Expert insights & resources for mental health, wellness & growth from mental health professionals. Support for anxiety, depression & more."
        keywords={["mental health blog", "therapy advice", "wellness tips", "mental health resources", "psychiatric care", "counseling insights"]}
        canonicalPath="/blog"
        type="website"
      />
      <SiteHeader />
      <main className="flex-1">
        <div className="relative py-20 px-4">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${forestBg})`, filter: 'brightness(1.3)' }}
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

        {featuredPosts.length > 0 && (
          <section className="py-12 md:py-16 bg-background border-b">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl font-sans font-bold mb-6 text-foreground">Featured Articles</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <Card className="hover-elevate cursor-pointer h-full flex flex-col" data-testid={`featured-post-${index}`}>
                      {post.featuredImage && (
                        <div 
                          className="h-56 bg-cover bg-center"
                          style={{ backgroundImage: `url(${post.featuredImage})` }}
                        />
                      )}
                      <div className="p-6 flex-1 flex flex-col">
                        <Badge variant="secondary" className="mb-4 w-fit" data-testid={`badge-featured-category-${index}`}>
                          {post.category}
                        </Badge>
                        <CardTitle className="text-2xl font-sans font-bold mb-3 leading-tight" data-testid={`text-featured-title-${index}`}>
                          {post.title}
                        </CardTitle>
                        <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3 flex-1" data-testid={`text-featured-excerpt-${index}`}>
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {latestPosts.length > 0 && (
          <section className="py-12 md:py-16 bg-background border-b">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl font-sans font-bold mb-6 text-foreground">Latest Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestPosts.map((post, index) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} data-testid={`latest-post-link-${index}`}>
                    <Card className="h-full hover-elevate cursor-pointer flex flex-col overflow-hidden" data-testid={`latest-post-card-${index}`}>
                      {post.featuredImage && (
                        <div 
                          className="h-48 bg-cover bg-center"
                          style={{ backgroundImage: `url(${post.featuredImage})` }}
                        />
                      )}
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
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <h2 className="text-2xl font-sans font-bold text-foreground">
                {selectedCategory ? `${selectedCategory} Articles` : "All Articles"}
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">Filter:</span>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={!selectedCategory ? "default" : "outline"}
                    className="cursor-pointer hover-elevate"
                    onClick={() => handleCategoryChange("")}
                    data-testid="badge-filter-all"
                  >
                    All Topics
                  </Badge>
                  {CATEGORIES.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="cursor-pointer hover-elevate"
                      onClick={() => handleCategoryChange(category)}
                      data-testid={`badge-filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : paginatedPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedPosts.map((post, index) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} data-testid={`paginated-post-link-${index}`}>
                      <Card className="h-full hover-elevate cursor-pointer flex flex-col overflow-hidden" data-testid={`paginated-post-card-${index}`}>
                        {post.featuredImage && (
                          <div 
                            className="h-48 bg-cover bg-center"
                            style={{ backgroundImage: `url(${post.featuredImage})` }}
                          />
                        )}
                        <CardHeader className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="secondary" data-testid={`badge-paginated-category-${index}`}>
                              {post.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl font-sans leading-tight mb-3" data-testid={`text-paginated-title-${index}`}>
                            {post.title}
                          </CardTitle>
                          <p className="text-muted-foreground line-clamp-3 text-sm" data-testid={`text-paginated-excerpt-${index}`}>
                            {post.excerpt}
                          </p>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
                            <div className="flex items-center gap-1" data-testid={`text-paginated-author-${index}`}>
                              <User className="h-4 w-4" />
                              <span className="truncate">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1" data-testid={`text-paginated-date-${index}`}>
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      data-testid="button-previous-page"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => handlePageChange(page)}
                              data-testid={`button-page-${page}`}
                            >
                              {page}
                            </Button>
                          );
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                          return <span key={page} className="px-2 text-muted-foreground">...</span>;
                        }
                        return null;
                      })}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      data-testid="button-next-page"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  {selectedCategory 
                    ? `No ${selectedCategory.toLowerCase()} articles available yet.` 
                    : "No articles available yet."}
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
