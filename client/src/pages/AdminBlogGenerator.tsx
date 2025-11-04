import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, CheckCircle2, AlertCircle, FileText, Image, Link, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { apiRequest, queryClient } from "@/lib/queryClient";

const blogGenerationSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  keywords: z.string().min(3, "Keywords are required (comma separated)"),
  city: z.string().optional(),
  imageStyle: z.string().optional(),
});

type BlogGenerationFormData = z.infer<typeof blogGenerationSchema>;

interface GeneratedBlogResult {
  title: string;
  slug: string;
  metaDescription: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt: string;
  contentImages: Array<{ url: string; alt: string; description: string }>;
  internalLinks: string[];
  externalLinks: string[];
  seoScore: number;
  wordCount: number;
  validationResults: {
    wordCountValid: boolean;
    metaDescriptionValid: boolean;
    h1Count: number;
    internalLinkCount: number;
    externalLinkCount: number;
    uniqueAnchorText: boolean;
  };
}

export default function AdminBlogGenerator() {
  const [generating, setGenerating] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [generatingTitle, setGeneratingTitle] = useState(false);
  const [autoGenerating, setAutoGenerating] = useState(false);
  const [improving, setImproving] = useState(false);
  const [improvementRequest, setImprovementRequest] = useState("");
  const [generatedBlog, setGeneratedBlog] = useState<GeneratedBlogResult | null>(null);
  const { toast } = useToast();

  const form = useForm<BlogGenerationFormData>({
    resolver: zodResolver(blogGenerationSchema),
    defaultValues: {
      title: "",
      keywords: "",
      city: "Orlando",
      imageStyle: "calming nature, peaceful mental health",
    },
  });

  const generateTitle = async () => {
    const keywords = form.getValues("keywords");
    const city = form.getValues("city");

    if (!keywords) {
      toast({
        title: "Keywords Required",
        description: "Please enter keywords first to generate a title",
        variant: "destructive",
      });
      return;
    }

    setGeneratingTitle(true);

    try {
      const response = await apiRequest("POST", "/api/generate-title", { keywords, city });
      const responseData = await response.json() as { success: boolean; title: string };

      if (responseData.success && responseData.title) {
        form.setValue("title", responseData.title);
        toast({
          title: "✨ Title Generated!",
          description: "Click 'Regenerate' for a different option",
        });
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Title generation error:", error);
      toast({
        title: "❌ Title Generation Failed",
        description: error instanceof Error ? error.message : "An error occurred while generating the title",
        variant: "destructive",
      });
    } finally {
      setGeneratingTitle(false);
    }
  };

  const onSubmit = async (data: BlogGenerationFormData) => {
    setGenerating(true);
    setGeneratedBlog(null);

    try {
      console.log("🚀 Starting blog generation...");
      
      // Use 'title' instead of 'topic' in the request
      const response = await apiRequest("POST", "/api/generate-blog", {
        topic: data.title,  // Backend still expects 'topic'
        keywords: data.keywords,
        city: data.city,
        imageStyle: data.imageStyle,
      });
      
      console.log("📥 Received response, parsing JSON...");
      const responseData = await response.json() as { success: boolean; data: GeneratedBlogResult; message: string };
      console.log("✅ Response parsed:", { success: responseData.success, hasData: !!responseData.data });

      if (responseData.success && responseData.data) {
        setGeneratedBlog(responseData.data);
        
        // Show success toast even if score is below 80 (user's idea: show everything and allow revisions)
        const scoreStatus = responseData.data.seoScore >= 80 
          ? "✅ Ready to publish!" 
          : "⚠️ Needs improvement";
        
        toast({
          title: `Blog Generated! ${scoreStatus}`,
          description: `SEO Score: ${responseData.data.seoScore}/100, Word Count: ${responseData.data.wordCount}`,
          variant: responseData.data.seoScore >= 80 ? "default" : "destructive",
        });
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("❌ Blog generation error:", error);
      toast({
        title: "❌ Generation Failed",
        description: error instanceof Error ? error.message : "An error occurred while generating the blog",
        variant: "destructive",
      });
    } finally {
      console.log("🏁 Generation complete, resetting state");
      setGenerating(false);
    }
  };

  const handlePublish = async () => {
    if (!generatedBlog) return;

    setPublishing(true);

    try {
      const response = await apiRequest("POST", "/api/publish-generated-blog", {
        ...generatedBlog,
        keywords: form.getValues("keywords").split(",").map(k => k.trim()),
      });
      const responseData = await response.json() as { success: boolean; message: string };

      if (responseData.success) {
        toast({
          title: "✅ Blog Published!",
          description: "Your blog is now live on the website",
        });

        // Invalidate blog posts cache
        queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });

        // Reset form and generated blog
        form.reset();
        setGeneratedBlog(null);
      } else {
        throw new Error("Publishing failed");
      }
    } catch (error) {
      console.error("Blog publishing error:", error);
      toast({
        title: "❌ Publishing Failed",
        description: error instanceof Error ? error.message : "An error occurred while publishing the blog",
        variant: "destructive",
      });
    } finally {
      setPublishing(false);
    }
  };

  const handleImproveBlog = async () => {
    if (!generatedBlog || !improvementRequest.trim()) {
      toast({
        title: "⚠️ Missing Information",
        description: "Please enter specific improvements you'd like to make",
        variant: "destructive",
      });
      return;
    }

    setImproving(true);

    try {
      console.log("🔧 Requesting blog improvements...");
      
      const response = await apiRequest("POST", "/api/improve-blog", {
        currentBlog: generatedBlog,
        improvementInstructions: improvementRequest,
        keywords: form.getValues("keywords"),
      });
      
      const responseData = await response.json() as { success: boolean; data: GeneratedBlogResult; message: string };

      if (responseData.success && responseData.data) {
        setGeneratedBlog(responseData.data);
        setImprovementRequest(""); // Clear the improvement field
        
        const scoreChange = responseData.data.seoScore - generatedBlog.seoScore;
        const scoreEmoji = scoreChange > 0 ? "📈" : scoreChange < 0 ? "📉" : "➡️";
        
        toast({
          title: `✅ Blog Improved! ${scoreEmoji}`,
          description: `New Score: ${responseData.data.seoScore}/100 (${scoreChange >= 0 ? '+' : ''}${scoreChange} points)`,
        });
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("❌ Blog improvement error:", error);
      toast({
        title: "❌ Improvement Failed",
        description: error instanceof Error ? error.message : "An error occurred while improving the blog",
        variant: "destructive",
      });
    } finally {
      setImproving(false);
    }
  };

  const handleAutoGenerate = async () => {
    setAutoGenerating(true);
    setGeneratedBlog(null);

    try {
      toast({
        title: "🤖 Analyzing Site...",
        description: "Identifying strategic blog opportunities based on your services and existing content",
      });

      const response = await fetch("/api/auto-generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const responseData = await response.json();

      if (response.ok && responseData.success && responseData.data) {
        setGeneratedBlog(responseData.data);
        
        // Update form with auto-suggested values
        form.setValue("title", responseData.suggestion.topic);
        form.setValue("keywords", responseData.suggestion.keywords);

        toast({
          title: "✅ Strategic Blog Generated!",
          description: `Topic: "${responseData.suggestion.topic}" | Score: ${responseData.data.seoScore}/100`,
        });
      } else if (response.status === 400 && responseData.error) {
        // Quality gate failure - show detailed feedback
        const score = responseData.seoScore || 0;
        const topIssues = responseData.issues?.slice(0, 3) || [];
        
        toast({
          title: `⚠️ Quality Gate Failed (${score}/100)`,
          description: topIssues.length > 0 
            ? `Top issues: ${topIssues.join(", ")}`
            : responseData.error,
          variant: "destructive",
        });
      } else {
        throw new Error(responseData.error || "Invalid response from server");
      }
    } catch (error) {
      console.error("Auto-generation error:", error);
      toast({
        title: "❌ Auto-Generation Failed",
        description: error instanceof Error ? error.message : "An error occurred during autonomous blog generation",
        variant: "destructive",
      });
    } finally {
      setAutoGenerating(false);
    }
  };

  const getSEOScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-primary" />
          AI Blog Generator
        </h1>
        <p className="text-muted-foreground text-lg">
          Generate SEO-optimized, HIPAA-compliant blogs following all 32 best practices
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Input Form */}
        <div>
          {/* Auto-Generate Banner */}
          <Card className="mb-6 border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Autonomous Blog Generator
              </CardTitle>
              <CardDescription>
                Let AI analyze your site and automatically select the best topic, keywords, and create an SEO-optimized blog
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleAutoGenerate}
                disabled={autoGenerating || generating}
                className="w-full"
                size="lg"
                data-testid="button-auto-generate"
              >
                {autoGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing & Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Auto-Generate Strategic Blog
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Zero input required • Identifies content gaps • Aligns with your services
              </p>
            </CardContent>
          </Card>

          <Separator className="my-6" />
          <p className="text-center text-sm text-muted-foreground mb-6">OR</p>

          <Card>
            <CardHeader>
              <CardTitle>Manual Configuration</CardTitle>
              <CardDescription>
                Choose your own topic and keywords
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="keywords"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Keywords*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="anxiety therapy, mental health Orlando, psychiatrist Winter Park"
                            data-testid="input-keywords"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Comma-separated keywords to target (primary keyword first)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blog Title*</FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input
                              placeholder="Click 'Generate Title' to create a catchy title"
                              data-testid="input-blog-title"
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={generateTitle}
                            disabled={generatingTitle}
                            data-testid="button-generate-title"
                            className="whitespace-nowrap"
                          >
                            {generatingTitle ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                              </>
                            ) : field.value ? (
                              <>
                                <Sparkles className="mr-2 h-4 w-4" />
                                Regenerate
                              </>
                            ) : (
                              <>
                                <Sparkles className="mr-2 h-4 w-4" />
                                Generate Title
                              </>
                            )}
                          </Button>
                        </div>
                        <FormDescription>
                          AI-generated clickbait title from your keywords
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City/Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Orlando, Winter Park, Lake Mary, etc."
                            data-testid="input-city"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Target location for local SEO (optional)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imageStyle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image Style</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="calming forest, peaceful nature, modern clinic"
                            data-testid="input-image-style"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Describe the style of images you want (optional)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={generating}
                    data-testid="button-generate-blog"
                  >
                    {generating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Blog...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Blog
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Quality Standards Card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">32 Automated Quality Standards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {/* Critical Standards (-20 to -25 points) */}
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Meta description 150-160 characters (-25 pts)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Exactly 2,000 words (±5 tolerance) (-25 pts)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Exactly one H1 tag (-20 pts)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>No placeholder text or brackets (-15 pts)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Authoritative links (NIMH, APA, SAMHSA) (-15 pts)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Local SEO: Orlando/Winter Park 2+ mentions (-12 pts)</span>
              </div>
              
              {/* Important Standards (-7 to -10 points) */}
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>100% unique anchor text on all links (-10 pts)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Primary keyword in title (-8 pts)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Primary keyword in meta description (-8 pts)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>At least 4 internal links (-8 pts)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>At least 3 external links (-8 pts)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Clear call-to-action (CTA) (-8 pts)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Keyword density 0.5-3% (-7 pts)</span>
              </div>
              
              {/* Standard Checks (-3 to -5 points) */}
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>At least 6 H2 subheadings (-5 pts)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Primary keyword in first paragraph (-5 pts)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Title length ≤60 characters (-5 pts)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Proper HTML structure (p, h2, h3 tags) (-5 pts)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Valid internal link paths (-5 pts)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Adult content indicator (18+) (-5 pts)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Proper heading hierarchy (H3 under H2) (-3 pts)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Multiple H3 subheadings for depth (-3 pts)</span>
              </div>
              
              {/* Image & Technical Standards */}
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Global image deduplication (no repeats)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Professional image search queries</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>High-quality featured image</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Multiple content images (3+)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Alt text for all images</span>
              </div>
              
              {/* Link & Content Quality */}
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Validated links (no 404s)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>HIPAA-compliant professional content</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Professional tone and empathy</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Citations from authoritative sources</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Target audience: Adults 18+ seeking treatment</span>
              </div>
              
              {/* Publication Standard */}
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="font-medium">SEO score ≥80 for auto-publish</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Results */}
        <div>
          {generatedBlog ? (
            <div className="space-y-4">
              {/* SEO Score Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      SEO Score
                    </CardTitle>
                    <Badge variant={getScoreBadgeVariant(generatedBlog.seoScore)} className="text-lg px-3 py-1">
                      {generatedBlog.seoScore}/100
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Word Count</span>
                      <span className={generatedBlog.validationResults.wordCountValid ? "text-green-500" : "text-red-500"}>
                        {generatedBlog.wordCount} words
                        {generatedBlog.validationResults.wordCountValid ? " ✓" : " ✗"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Meta Description</span>
                      <span className={generatedBlog.validationResults.metaDescriptionValid ? "text-green-500" : "text-red-500"}>
                        {generatedBlog.metaDescription.length} chars
                        {generatedBlog.validationResults.metaDescriptionValid ? " ✓" : " ✗"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>H1 Tags</span>
                      <span className={generatedBlog.validationResults.h1Count === 1 ? "text-green-500" : "text-red-500"}>
                        {generatedBlog.validationResults.h1Count}
                        {generatedBlog.validationResults.h1Count === 1 ? " ✓" : " ✗"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Internal Links</span>
                      <span className={generatedBlog.validationResults.internalLinkCount >= 4 ? "text-green-500" : "text-yellow-500"}>
                        {generatedBlog.validationResults.internalLinkCount}
                        {generatedBlog.validationResults.internalLinkCount >= 4 ? " ✓" : " ⚠"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>External Links</span>
                      <span className={generatedBlog.validationResults.externalLinkCount >= 3 ? "text-green-500" : "text-yellow-500"}>
                        {generatedBlog.validationResults.externalLinkCount}
                        {generatedBlog.validationResults.externalLinkCount >= 3 ? " ✓" : " ⚠"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Blog Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Generated Blog
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Title</div>
                    <div className="font-semibold">{generatedBlog.title}</div>
                  </div>

                  <Separator />

                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Meta Description</div>
                    <div className="text-sm">{generatedBlog.metaDescription}</div>
                  </div>

                  <Separator />

                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Slug</div>
                    <code className="text-sm bg-muted px-2 py-1 rounded">{generatedBlog.slug}</code>
                  </div>

                  <Separator />

                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                      <Image className="w-4 h-4" />
                      Featured Image
                    </div>
                    {generatedBlog.featuredImage && (
                      <img
                        src={generatedBlog.featuredImage}
                        alt={generatedBlog.featuredImageAlt}
                        className="rounded-lg w-full h-48 object-cover"
                      />
                    )}
                  </div>

                  <Separator />

                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                      <Link className="w-4 h-4" />
                      Links
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Internal:</span> {generatedBlog.internalLinks.length}
                      </div>
                      <div>
                        <span className="font-medium">External:</span> {generatedBlog.externalLinks.length}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Request Improvements Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Request Improvements</CardTitle>
                  <CardDescription>
                    Ask for specific changes or improvements to this blog
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea
                    placeholder="Example: Add more statistics about treatment effectiveness, expand the section on coping strategies, make the tone more empathetic..."
                    value={improvementRequest}
                    onChange={(e) => setImprovementRequest(e.target.value)}
                    className="min-h-[100px]"
                    data-testid="input-improvement-request"
                  />
                  <Button
                    onClick={handleImproveBlog}
                    disabled={improving || !improvementRequest.trim()}
                    className="w-full"
                    variant="outline"
                    data-testid="button-improve-blog"
                  >
                    {improving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Improving Blog...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Apply Improvements
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    💡 Unlimited revisions available • Changes tracked • Previous version preserved
                  </p>
                </CardContent>
              </Card>

              {/* Publish Button */}
              <Button
                onClick={handlePublish}
                disabled={publishing}
                className="w-full"
                size="lg"
                variant={generatedBlog.seoScore >= 80 ? "default" : "destructive"}
                data-testid="button-publish-blog"
              >
                {publishing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publishing...
                  </>
                ) : generatedBlog.seoScore >= 80 ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Publish to Website
                  </>
                ) : (
                  <>
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Publish Anyway (Score: {generatedBlog.seoScore}/100)
                  </>
                )}
              </Button>

              {generatedBlog.seoScore >= 80 ? (
                <div className="text-sm text-green-600 dark:text-green-400 text-center">
                  ✅ This blog meets all quality standards and is ready to publish!
                </div>
              ) : (
                <div className="text-sm text-orange-600 dark:text-orange-400 text-center">
                  ⚠️ Blog is below the recommended quality threshold (80). Consider using "Apply Improvements" first.
                </div>
              )}
            </div>
          ) : (
            <Card className="h-full flex items-center justify-center min-h-[400px]">
              <CardContent className="text-center text-muted-foreground">
                <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Generate a blog to see results here</p>
                <p className="text-sm mt-2">
                  Fill in the form and click "Generate Blog"
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
