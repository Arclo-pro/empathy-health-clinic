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
  topic: z.string().min(5, "Topic must be at least 5 characters"),
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
  const [generatedBlog, setGeneratedBlog] = useState<GeneratedBlogResult | null>(null);
  const { toast } = useToast();

  const form = useForm<BlogGenerationFormData>({
    resolver: zodResolver(blogGenerationSchema),
    defaultValues: {
      topic: "",
      keywords: "",
      city: "Orlando",
      imageStyle: "calming nature, peaceful mental health",
    },
  });

  const onSubmit = async (data: BlogGenerationFormData) => {
    setGenerating(true);
    setGeneratedBlog(null);

    try {
      const response = await apiRequest("POST", "/api/generate-blog", data);
      const responseData = await response.json() as { success: boolean; data: GeneratedBlogResult; message: string };

      if (responseData.success && responseData.data) {
        setGeneratedBlog(responseData.data);
        toast({
          title: "✅ Blog Generated Successfully!",
          description: responseData.message,
        });
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Blog generation error:", error);
      toast({
        title: "❌ Generation Failed",
        description: error instanceof Error ? error.message : "An error occurred while generating the blog",
        variant: "destructive",
      });
    } finally {
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
          <Card>
            <CardHeader>
              <CardTitle>Blog Configuration</CardTitle>
              <CardDescription>
                Enter details about the blog post you want to generate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blog Topic*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Understanding Anxiety Disorders in Orlando"
                            data-testid="input-blog-topic"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The main subject of your blog post
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Exactly 2,000 words (±5 tolerance)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Meta description 150-160 characters</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Global image deduplication (no repeats)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>100% unique anchor text on all links</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>HIPAA-compliant professional content</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Validated links (no 404s)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Local SEO for Orlando/Winter Park</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>SEO score ≥80 for auto-publish</span>
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

              {/* Publish Button */}
              <Button
                onClick={handlePublish}
                disabled={publishing || generatedBlog.seoScore < 80}
                className="w-full"
                size="lg"
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
                    SEO Score Too Low (Need ≥80)
                  </>
                )}
              </Button>

              {generatedBlog.seoScore >= 80 && (
                <div className="text-sm text-green-600 dark:text-green-400 text-center">
                  ✅ This blog meets all quality standards and is ready to publish!
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
