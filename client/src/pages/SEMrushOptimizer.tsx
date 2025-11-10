import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Home, Search, TrendingUp, AlertCircle, CheckCircle2, Download, Upload, ArrowUp, ArrowDown, Link as LinkIcon } from "lucide-react";
import { useLocation } from "wouter";
import type { BlogPost } from "@shared/schema";

interface SEMrushData {
  url: string;
  priority: number;
  keywords: string[];
  issues: string[];
}

interface SEMrushIssue {
  url: string;
  keyword: string;
  priority: number;
  issues: string[];
  missingKeywordIn: string[];
  hasHighBounceRate: boolean;
  hasLowTimeOnPage: boolean;
  missingInternalLinks: boolean;
}

interface PageOptimization {
  url: string;
  slug: string;
  currentTitle: string;
  currentMetaTitle: string;
  currentMetaDescription: string;
  currentH1: string;
  currentKeywords: string[];
  targetKeywords: string[];
  priority: number;
  issues: string[];
  optimizationScore: number;
}

function calculateOptimizationScore(post: BlogPost, targetKeyword: string): number {
  let score = 100;
  
  const title = (post.metaTitle || post.title).toLowerCase();
  const content = post.content.toLowerCase();
  const keyword = targetKeyword.toLowerCase();
  
  if (!title.includes(keyword)) score -= 25;
  
  const h1Match = content.match(/^#\s+(.+)$/m);
  const h1 = h1Match ? h1Match[1].toLowerCase() : '';
  if (!h1.includes(keyword)) score -= 20;
  
  if (!post.metaDescription || post.metaDescription.length < 120) score -= 15;
  if (!post.metaDescription?.toLowerCase().includes(keyword)) score -= 15;
  
  const keywordMatches = (content.match(new RegExp(keyword.replace(/\s+/g, '\\s+'), 'gi')) || []).length;
  const wordCount = post.content.split(/\s+/).length;
  const density = (keywordMatches / wordCount) * 100;
  if (density < 0.5 || density > 2.5) score -= 25;
  
  return Math.max(0, score);
}

export default function SEMrushOptimizer() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"priority" | "score">("priority");
  const [editMode, setEditMode] = useState(false);
  const [editedPost, setEditedPost] = useState<Partial<BlogPost>>({});

  const { data: response, isLoading } = useQuery<{ posts: BlogPost[] }>({
    queryKey: ["/api/blog-posts"],
  });

  const { data: semrushResponse, isLoading: isLoadingSemrush } = useQuery<{ data: SEMrushData[] }>({
    queryKey: ["/api/semrush-data"],
  });

  const updateMutation = useMutation({
    mutationFn: async (data: { id: string; updates: Partial<BlogPost> }) => {
      return await apiRequest("PATCH", `/api/blog-posts/${data.id}`, data.updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      toast({
        title: "Success",
        description: "Blog post optimized successfully",
      });
      setEditMode(false);
      setEditedPost({});
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const posts = response?.posts || [];
  const semrushData = semrushResponse?.data || [];

  const pageOptimizations: PageOptimization[] = useMemo(() => {
    let unmatchedCount = 0;
    
    const results = semrushData.map(data => {
      let normalizedPath = data.url;
      try {
        const urlObj = new URL(data.url, 'https://empathyhealthclinic.com');
        normalizedPath = urlObj.pathname.toLowerCase().trim().replace(/\/$/, '');
      } catch {
        normalizedPath = data.url.toLowerCase().trim().replace(/\/$/, '');
      }
      
      const issue = {
        url: normalizedPath,
        keyword: data.keywords[0] || '',
        priority: data.priority,
        issues: data.issues.map(i => 
          i.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        ),
        missingKeywordIn: data.issues.filter(i => i.startsWith('keyword_missing')).map(i => i.replace('keyword_missing_in_', '')),
        hasHighBounceRate: data.issues.includes('high_bounce_rate'),
        hasLowTimeOnPage: data.issues.includes('low_time_on_page'),
        missingInternalLinks: data.issues.includes('missing_internal_links')
      };
      
      const slug = normalizedPath.replace(/^\/blog\//, '').replace(/^\//, '');
      const post = posts.find(p => 
        p.slug === slug || 
        `/blog/${p.slug}` === normalizedPath ||
        p.slug === normalizedPath.replace(/^\//, '')
      );
      
      if (!post) {
        unmatchedCount++;
        console.log(`⚠️ SEMrush URL not matched: ${data.url} → ${normalizedPath} (slug: ${slug})`);
        
        return {
          url: issue.url,
          slug,
          currentTitle: "",
          currentMetaTitle: "",
          currentMetaDescription: "",
          currentH1: "",
          currentKeywords: [],
          targetKeywords: data.keywords,
          priority: issue.priority,
          issues: issue.issues,
          optimizationScore: 0
        };
      }

      const h1Match = post.content.match(/^#\s+(.+)$/m);
      const h1 = h1Match ? h1Match[1] : '';

      return {
        url: issue.url,
        slug: post.slug,
        currentTitle: post.title,
        currentMetaTitle: post.metaTitle || post.title,
        currentMetaDescription: post.metaDescription || post.excerpt,
        currentH1: h1,
        currentKeywords: post.keywords || [],
        targetKeywords: data.keywords,
        priority: issue.priority,
        issues: issue.issues,
        optimizationScore: calculateOptimizationScore(post, data.keywords[0] || '')
      };
    });
    
    if (unmatchedCount > 0) {
      console.log(`ℹ️ Total unmatched SEMrush URLs: ${unmatchedCount} out of ${semrushData.length}`);
    }
    
    return results.filter(opt => 
      opt.currentTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opt.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opt.targetKeywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [posts, semrushData, searchQuery]);

  const sortedOptimizations = useMemo(() => {
    return [...pageOptimizations].sort((a, b) => {
      if (sortBy === "priority") {
        return b.priority - a.priority;
      }
      return a.optimizationScore - b.optimizationScore;
    });
  }, [pageOptimizations, sortBy]);

  const selectedOptimization = selectedUrl ? pageOptimizations.find(o => o.url === selectedUrl) : null;
  const selectedPost = selectedOptimization ? posts.find(p => p.slug === selectedOptimization.slug) : null;

  const handleOptimize = (url: string) => {
    setSelectedUrl(url);
    const optimization = pageOptimizations.find(o => o.url === url);
    const post = posts.find(p => p.slug === optimization?.slug);
    
    if (post && optimization) {
      setEditedPost({
        title: post.title,
        metaTitle: post.metaTitle || post.title,
        metaDescription: post.metaDescription || post.excerpt,
        keywords: post.keywords || [],
        content: post.content
      });
      setEditMode(true);
    }
  };

  const handleSave = () => {
    if (!selectedPost) return;
    updateMutation.mutate({
      id: selectedPost.id,
      updates: editedPost
    });
  };

  const handleExportCSV = () => {
    const headers = ["Priority", "URL", "Target Keyword", "Current Score", "Issues", "Title", "Meta Title", "Meta Description", "H1"];
    const rows = sortedOptimizations.map(opt => [
      opt.priority.toFixed(2),
      opt.url,
      opt.targetKeywords.join("; "),
      opt.optimizationScore.toString(),
      opt.issues.join("; "),
      opt.currentTitle,
      opt.currentMetaTitle,
      opt.currentMetaDescription,
      opt.currentH1
    ]);
    
    const csv = [headers, ...rows].map(row => 
      row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(",")
    ).join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `semrush-optimization-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export Complete",
      description: "SEMrush optimization data exported to CSV",
    });
  };

  const averageScore = pageOptimizations.length > 0
    ? pageOptimizations.reduce((sum, opt) => sum + opt.optimizationScore, 0) / pageOptimizations.length
    : 0;

  const issuesByType = useMemo(() => {
    const issues = {
      highBounceRate: 0,
      lowTimeOnPage: 0,
      missingLinks: 0,
      poorOptimization: 0
    };
    
    pageOptimizations.forEach(opt => {
      if (opt.issues.includes("High bounce rate")) issues.highBounceRate++;
      if (opt.issues.includes("Low time on page")) issues.lowTimeOnPage++;
      if (opt.issues.includes("Missing internal links")) issues.missingLinks++;
      if (opt.optimizationScore < 60) issues.poorOptimization++;
    });
    
    return issues;
  }, [pageOptimizations]);

  if (isLoading || isLoadingSemrush) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Loading SEMrush data...</p>
        </div>
      </div>
    );
  }

  if (editMode && selectedPost && selectedOptimization) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-md z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-sans font-medium">Optimize: {selectedOptimization.currentTitle}</h1>
              <p className="text-sm text-muted-foreground">Target: {selectedOptimization.targetKeywords.join(", ")}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setEditMode(false);
                  setSelectedUrl(null);
                }}
                data-testid="button-cancel"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={updateMutation.isPending}
                data-testid="button-save"
              >
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Metadata</CardTitle>
                  <CardDescription>Optimize title tags and meta descriptions for target keyword</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Meta Title</Label>
                    <Input
                      value={editedPost.metaTitle || ""}
                      onChange={(e) => setEditedPost({...editedPost, metaTitle: e.target.value})}
                      placeholder="Include target keyword in title"
                      data-testid="input-meta-title"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {editedPost.metaTitle?.length || 0}/60 characters
                    </p>
                  </div>

                  <div>
                    <Label>Meta Description</Label>
                    <Textarea
                      value={editedPost.metaDescription || ""}
                      onChange={(e) => setEditedPost({...editedPost, metaDescription: e.target.value})}
                      placeholder="Include target keyword naturally"
                      rows={3}
                      data-testid="textarea-meta-description"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {editedPost.metaDescription?.length || 0}/160 characters
                    </p>
                  </div>

                  <div>
                    <Label>Target Keywords (comma-separated)</Label>
                    <Input
                      value={editedPost.keywords?.join(", ") || ""}
                      onChange={(e) => setEditedPost({...editedPost, keywords: e.target.value.split(",").map(k => k.trim())})}
                      placeholder="love bombing meaning, love bombing definition"
                      data-testid="input-keywords"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Optimization</CardTitle>
                  <CardDescription>Ensure H1 and body content include target keyword</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label>Content Preview (First 500 characters)</Label>
                    <Textarea
                      value={editedPost.content?.slice(0, 500) || ""}
                      onChange={(e) => setEditedPost({...editedPost, content: e.target.value + (selectedPost.content.slice(500) || "")})}
                      rows={10}
                      data-testid="textarea-content-preview"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Edit the opening to include target keyword in first paragraph
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Optimization Checklist</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    {editedPost.metaTitle?.toLowerCase().includes(selectedOptimization.targetKeywords[0].toLowerCase()) ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium text-sm">Keyword in Title</p>
                      <p className="text-xs text-muted-foreground">Include "{selectedOptimization.targetKeywords[0]}" in title</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    {editedPost.metaDescription?.toLowerCase().includes(selectedOptimization.targetKeywords[0].toLowerCase()) ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium text-sm">Keyword in Meta Description</p>
                      <p className="text-xs text-muted-foreground">Include "{selectedOptimization.targetKeywords[0]}" naturally</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    {(editedPost.metaDescription?.length || 0) >= 120 && (editedPost.metaDescription?.length || 0) <= 160 ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium text-sm">Meta Description Length</p>
                      <p className="text-xs text-muted-foreground">120-160 characters recommended</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    {editedPost.content?.toLowerCase().includes(selectedOptimization.targetKeywords[0].toLowerCase()) ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium text-sm">Keyword in Content</p>
                      <p className="text-xs text-muted-foreground">Include naturally throughout article</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SEMrush Issues</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {selectedOptimization.issues.map((issue, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{issue}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-sans font-medium">SEMrush Keyword Optimizer</h1>
            <p className="text-sm text-muted-foreground">Bulk optimization for {pageOptimizations.length} priority pages</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleExportCSV}
              data-testid="button-export-csv"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button
              variant="outline"
              onClick={() => setLocation("/admin")}
              data-testid="button-back-to-admin"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Admin
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(averageScore)}%</div>
              <p className="text-xs text-muted-foreground mt-1">Keyword optimization</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">High Bounce Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{issuesByType.highBounceRate}</div>
              <p className="text-xs text-muted-foreground mt-1">Pages affected</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Missing Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{issuesByType.missingLinks}</div>
              <p className="text-xs text-muted-foreground mt-1">Need internal links</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Poor Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{issuesByType.poorOptimization}</div>
              <p className="text-xs text-muted-foreground mt-1">Score below 60%</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by URL or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={sortBy === "priority" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("priority")}
              data-testid="button-sort-priority"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Priority
            </Button>
            <Button
              variant={sortBy === "score" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("score")}
              data-testid="button-sort-score"
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              Score
            </Button>
          </div>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Priority</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Target Keyword</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Issues</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedOptimizations.map((opt) => (
                <TableRow key={opt.url}>
                  <TableCell>
                    <Badge variant={opt.priority >= 0.5 ? "destructive" : opt.priority >= 0.3 ? "default" : "secondary"}>
                      {opt.priority.toFixed(2)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{opt.url}</TableCell>
                  <TableCell>{opt.targetKeywords.join(", ")}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            opt.optimizationScore >= 80 ? "bg-green-600" :
                            opt.optimizationScore >= 60 ? "bg-yellow-600" :
                            "bg-red-600"
                          }`}
                          style={{ width: `${opt.optimizationScore}%` }}
                        />
                      </div>
                      <span className="text-sm">{opt.optimizationScore}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {opt.issues.map((issue, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {issue.replace("High bounce rate", "Bounce").replace("Low time on page", "Time").replace("Missing internal links", "Links")}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOptimize(opt.url)}
                      disabled={!opt.currentTitle}
                      data-testid={`button-optimize-${opt.slug}`}
                    >
                      Optimize
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
