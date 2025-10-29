import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  TrendingUp, 
  Link as LinkIcon, 
  FileText, 
  ExternalLink,
  Search,
  Target,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Lightbulb
} from "lucide-react";
import { Link } from "wouter";

interface ContentItem {
  id: string;
  title: string;
  slug: string;
  pageTitle?: string;
}

export default function SEOOptimization() {
  const { data: treatments } = useQuery<ContentItem[]>({
    queryKey: ["/api/treatments"],
  });

  const { data: therapies } = useQuery<ContentItem[]>({
    queryKey: ["/api/therapies"],
  });

  const { data: conditions } = useQuery<ContentItem[]>({
    queryKey: ["/api/conditions"],
  });

  const { data: insuranceProviders } = useQuery<ContentItem[]>({
    queryKey: ["/api/insurance-providers"],
  });

  const { data: blogPosts } = useQuery<any[]>({
    queryKey: ["/api/blog-posts"],
  });

  // Calculate internal linking stats
  const totalServicePages = (treatments?.length || 0) + (therapies?.length || 0) + (conditions?.length || 0);
  const totalPages = totalServicePages + (insuranceProviders?.length || 0) + (blogPosts?.length || 0);

  // Content gap opportunities (common mental health searches)
  const contentGaps = [
    {
      keyword: "online therapy orlando",
      opportunity: "High",
      action: "Optimize /virtual-visit page with more telehealth keywords",
      priority: 1,
    },
    {
      keyword: "same day psychiatrist appointment",
      opportunity: "High",
      action: "Add 'Urgent Care' or 'Same-Day Appointments' section to homepage",
      priority: 1,
    },
    {
      keyword: "does insurance cover therapy",
      opportunity: "Medium",
      action: "Create comprehensive blog post about mental health insurance coverage",
      priority: 2,
    },
    {
      keyword: "anxiety treatment winter park",
      opportunity: "Medium",
      action: "Add location-specific content to /anxiety-treatment page",
      priority: 2,
    },
    {
      keyword: "child psychiatrist orlando",
      opportunity: "High",
      action: "Create dedicated 'Child & Adolescent Services' landing page if offered",
      priority: 1,
    },
    {
      keyword: "couples therapy orlando",
      opportunity: "Medium",
      action: "Ensure couples/relationship counseling has dedicated page",
      priority: 2,
    },
  ];

  // Internal linking opportunities
  const linkingOpportunities = [
    {
      from: "Blog Posts",
      to: "Service Pages",
      count: blogPosts?.length || 0,
      recommendation: "Add 2-3 links from each blog post to relevant treatment/therapy/condition pages",
    },
    {
      from: "Condition Pages",
      to: "Insurance Pages",
      count: conditions?.length || 0,
      recommendation: "Add 'Check your insurance coverage' links to all condition pages",
    },
    {
      from: "Treatment Pages",
      to: "Blog Posts",
      count: treatments?.length || 0,
      recommendation: "Link to 2-3 relevant blog posts from each treatment page ('Learn more about...')",
    },
    {
      from: "Insurance Pages",
      to: "Service Pages",
      count: insuranceProviders?.length || 0,
      recommendation: "Link to top 5 covered treatments/therapies from each insurance page",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-sans font-medium">SEO Optimization</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Improve search rankings and drive more organic traffic
            </p>
          </div>
          <Link href="/admin">
            <Button variant="outline" data-testid="button-back-to-admin">
              Back to Admin
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-sans font-bold">{totalPages}</div>
              <p className="text-xs text-muted-foreground mt-1">Indexed content</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Service Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-sans font-bold">{totalServicePages}</div>
              <p className="text-xs text-muted-foreground mt-1">Treatments, therapies, conditions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Blog Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-sans font-bold">{blogPosts?.length || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">Content articles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Search Console</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-sans font-bold text-green-600 dark:text-green-400">✓</div>
              <p className="text-xs text-muted-foreground mt-1">Verified & tracking</p>
            </CardContent>
          </Card>
        </div>

        {/* Search Console Access */}
        <Alert>
          <Search className="h-4 w-4" />
          <AlertTitle className="font-sans font-semibold">Review Your Search Console Data</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-3">
              Your site is verified in Google Search Console with <strong>19,797 total search clicks</strong>. 
              Access your performance data to identify optimization opportunities:
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button variant="default" size="sm" data-testid="button-open-gsc">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Google Search Console
                </Button>
              </a>
              <a
                href="/SEO_OPTIMIZATION_GUIDE.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button variant="outline" size="sm" data-testid="button-view-guide">
                  <FileText className="h-4 w-4 mr-2" />
                  View Complete SEO Guide
                </Button>
              </a>
            </div>
          </AlertDescription>
        </Alert>

        {/* Content Gaps */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <CardTitle className="font-sans">Content Gap Opportunities</CardTitle>
            </div>
            <CardDescription>
              Keywords you're likely "almost ranking" for based on typical mental health searches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contentGaps.map((gap, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  data-testid={`content-gap-${index}`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge 
                        variant={gap.opportunity === "High" ? "default" : "secondary"}
                        data-testid={`badge-opportunity-${index}`}
                      >
                        {gap.opportunity} Opportunity
                      </Badge>
                      <span className="font-medium">&quot;{gap.keyword}&quot;</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      <Lightbulb className="h-4 w-4 inline mr-1" />
                      {gap.action}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      Priority {gap.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <Alert className="mt-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="font-sans font-semibold">Verify These in Search Console</AlertTitle>
              <AlertDescription>
                These are common high-value keywords for mental health services in Orlando. 
                Check your actual Search Console data to see which ones you're ranking for in positions 11-30, 
                then prioritize those for optimization.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Internal Linking Opportunities */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-primary" />
              <CardTitle className="font-sans">Internal Linking Strategy</CardTitle>
            </div>
            <CardDescription>
              Strengthen your site architecture by connecting related pages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {linkingOpportunities.map((opportunity, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border"
                  data-testid={`linking-opportunity-${index}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 font-medium">
                      <span>{opportunity.from}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      <span>{opportunity.to}</span>
                    </div>
                    <Badge variant="secondary">
                      {opportunity.count} pages
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {opportunity.recommendation}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-sans font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                Already Implemented
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                <li>✓ Blog posts link to related articles</li>
                <li>✓ Condition pages link to relevant treatments and therapies</li>
                <li>✓ Treatment/therapy pages link back to overview pages</li>
                <li>✓ 301 redirects preserve old WordPress URLs</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Quick Action Checklist */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle className="font-sans">Week 1 Action Checklist</CardTitle>
            </div>
            <CardDescription>
              Start here for immediate SEO improvements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <input type="checkbox" className="mt-1" data-testid="checkbox-action-1" />
                <div className="flex-1">
                  <p className="font-medium">Export Search Console data</p>
                  <p className="text-sm text-muted-foreground">
                    Download top 20 pages by clicks and keywords in positions 11-30
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <input type="checkbox" className="mt-1" data-testid="checkbox-action-2" />
                <div className="flex-1">
                  <p className="font-medium">Update 3 high-performing pages</p>
                  <p className="text-sm text-muted-foreground">
                    Refresh content, add internal links, update FAQ sections
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <input type="checkbox" className="mt-1" data-testid="checkbox-action-3" />
                <div className="flex-1">
                  <p className="font-medium">Add 10 new internal links</p>
                  <p className="text-sm text-muted-foreground">
                    Link from blog posts to service pages and vice versa
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <input type="checkbox" className="mt-1" data-testid="checkbox-action-4" />
                <div className="flex-1">
                  <p className="font-medium">Identify top 5 content gaps</p>
                  <p className="text-sm text-muted-foreground">
                    List keywords you're almost ranking for and decide: optimize existing or create new
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <input type="checkbox" className="mt-1" data-testid="checkbox-action-5" />
                <div className="flex-1">
                  <p className="font-medium">Create 1-2 new blog posts</p>
                  <p className="text-sm text-muted-foreground">
                    Target "almost ranking" keywords from your Search Console data
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="font-sans">Resources & Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="/SEO_OPTIMIZATION_GUIDE.md"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-medium">Complete SEO Guide</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive guide covering Search Console review, content strategy, and technical SEO
                  </p>
                </div>
              </a>

              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <ExternalLink className="h-5 w-5 text-primary" />
                    <span className="font-medium">Google Search Console</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Access your search performance data, rankings, and optimization opportunities
                  </p>
                </div>
              </a>

              <Link href="/admin/analytics">
                <div className="p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span className="font-medium">Analytics Dashboard</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Monitor Core Web Vitals, page views, and conversion metrics
                  </p>
                </div>
              </Link>

              <Link href="/admin">
                <div className="p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-medium">Content Editor</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Update treatments, therapies, conditions, and blog posts
                  </p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

