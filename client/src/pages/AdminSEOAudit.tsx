import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Home, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ExternalLink,
  Activity,
  Smartphone,
  Monitor,
  Search
} from "lucide-react";
import { useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { format } from "date-fns";

interface AuditRun {
  id: number;
  scheduleType: string;
  startedAt: string;
  completedAt: string | null;
  status: string;
  totalUrls: number;
  processedUrls: number;
}

interface AuditUrlResult {
  id: number;
  runId: number;
  url: string;
  pageType: string;
  mobileScore: number | null;
  desktopScore: number | null;
  mobileSeoScore: number | null;
  desktopSeoScore: number | null;
  labMetrics: any;
  gscStatus: any;
  opportunities: any;
  checkedAt: string;
}

interface AuditIssue {
  id: number;
  runId: number;
  url: string;
  category: string;
  severity: string;
  title: string;
  description: string;
  evidence: any;
  recommendation: string;
  status: string;
}

interface AuditResults {
  run: AuditRun;
  urls: AuditUrlResult[];
  issues: AuditIssue[];
  summary: {
    totalUrls: number;
    criticalIssues: number;
    highIssues: number;
    mediumIssues: number;
    lowIssues: number;
    avgMobileScore: number;
    avgDesktopScore: number;
  };
}

function getScoreColor(score: number | null): string {
  if (score === null) return "text-muted-foreground";
  if (score >= 90) return "text-green-600 dark:text-green-400";
  if (score >= 50) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
}

function getScoreBadgeVariant(score: number | null): "default" | "secondary" | "destructive" | "outline" {
  if (score === null) return "outline";
  if (score >= 90) return "default";
  if (score >= 50) return "secondary";
  return "destructive";
}

function getSeverityBadgeVariant(severity: string): "default" | "secondary" | "destructive" | "outline" {
  switch (severity) {
    case "critical": return "destructive";
    case "high": return "destructive";
    case "medium": return "secondary";
    default: return "outline";
  }
}

export default function AdminSEOAudit() {
  const [, setLocation] = useLocation();

  const { data: runs, isLoading: runsLoading } = useQuery<AuditRun[]>({
    queryKey: ["/api/seo-audit/runs"],
  });

  const latestRun = runs?.[0];

  const { data: latestResults, isLoading: resultsLoading } = useQuery<AuditResults>({
    queryKey: ["/api/seo-audit/runs", latestRun?.id],
    enabled: !!latestRun?.id,
  });

  const runAuditMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/seo-audit/run", { scheduleType: "manual" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/seo-audit/runs"] });
    },
  });

  const isLoading = runsLoading || resultsLoading;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-sans font-medium">SEO Audit Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              PageSpeed Insights & GSC URL Inspection results
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="default"
              onClick={() => runAuditMutation.mutate()}
              disabled={runAuditMutation.isPending}
              data-testid="button-run-audit"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${runAuditMutation.isPending ? 'animate-spin' : ''}`} />
              {runAuditMutation.isPending ? "Running Audit..." : "Run Manual Audit"}
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

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {latestRun?.status === "running" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 animate-pulse text-primary" />
                Audit In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress: {latestRun.processedUrls} / {latestRun.totalUrls} URLs</span>
                  <span>{Math.round((latestRun.processedUrls / latestRun.totalUrls) * 100)}%</span>
                </div>
                <Progress value={(latestRun.processedUrls / latestRun.totalUrls) * 100} />
              </div>
            </CardContent>
          </Card>
        )}

        {latestResults && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Mobile Score</p>
                      <p className={`text-3xl font-bold ${getScoreColor(latestResults.summary.avgMobileScore)}`}>
                        {Math.round(latestResults.summary.avgMobileScore)}
                      </p>
                    </div>
                    <Smartphone className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Desktop Score</p>
                      <p className={`text-3xl font-bold ${getScoreColor(latestResults.summary.avgDesktopScore)}`}>
                        {Math.round(latestResults.summary.avgDesktopScore)}
                      </p>
                    </div>
                    <Monitor className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Critical Issues</p>
                      <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                        {latestResults.summary.criticalIssues}
                      </p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">URLs Audited</p>
                      <p className="text-3xl font-bold">
                        {latestResults.summary.totalUrls}
                      </p>
                    </div>
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="issues" className="space-y-4">
              <TabsList>
                <TabsTrigger value="issues" data-testid="tab-issues">
                  Issues ({latestResults.issues.length})
                </TabsTrigger>
                <TabsTrigger value="urls" data-testid="tab-urls">
                  URL Results ({latestResults.urls.length})
                </TabsTrigger>
                <TabsTrigger value="history" data-testid="tab-history">
                  Audit History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="issues" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      Critical & High Priority Issues
                    </CardTitle>
                    <CardDescription>
                      Issues that need immediate attention
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {latestResults.issues.filter(i => i.severity === 'critical' || i.severity === 'high').length === 0 ? (
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>No critical or high priority issues found.</AlertDescription>
                      </Alert>
                    ) : (
                      <div className="space-y-3">
                        {latestResults.issues
                          .filter(i => i.severity === 'critical' || i.severity === 'high')
                          .slice(0, 20)
                          .map((issue) => (
                            <div
                              key={issue.id}
                              className="p-4 border rounded-lg space-y-2"
                              data-testid={`issue-${issue.id}`}
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge variant={getSeverityBadgeVariant(issue.severity)}>
                                      {issue.severity}
                                    </Badge>
                                    <Badge variant="outline">{issue.category}</Badge>
                                  </div>
                                  <h4 className="font-medium">{issue.title}</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {issue.description}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <code className="text-xs bg-muted px-2 py-1 rounded">
                                  {issue.url.replace('https://www.empathyhealthclinic.com', '')}
                                </code>
                                <a
                                  href={issue.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="h-3 w-3 text-muted-foreground hover:text-primary" />
                                </a>
                              </div>
                              <p className="text-sm text-primary mt-2">
                                {issue.recommendation}
                              </p>
                            </div>
                          ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Medium & Low Priority Issues</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {latestResults.issues.filter(i => i.severity === 'medium' || i.severity === 'low').length === 0 ? (
                      <Alert>
                        <AlertDescription>No medium or low priority issues.</AlertDescription>
                      </Alert>
                    ) : (
                      <div className="space-y-3">
                        {latestResults.issues
                          .filter(i => i.severity === 'medium' || i.severity === 'low')
                          .slice(0, 15)
                          .map((issue) => (
                            <div
                              key={issue.id}
                              className="p-3 border rounded-lg flex items-start justify-between gap-4"
                              data-testid={`issue-${issue.id}`}
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <Badge variant={getSeverityBadgeVariant(issue.severity)} className="text-xs">
                                    {issue.severity}
                                  </Badge>
                                  <span className="text-sm font-medium truncate">{issue.title}</span>
                                </div>
                                <code className="text-xs text-muted-foreground">
                                  {issue.url.replace('https://www.empathyhealthclinic.com', '')}
                                </code>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="urls" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>URL Performance Results</CardTitle>
                    <CardDescription>
                      PageSpeed Insights scores for each audited URL
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {latestResults.urls.map((url) => (
                        <div
                          key={url.id}
                          className="p-4 border rounded-lg"
                          data-testid={`url-result-${url.id}`}
                        >
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <code className="text-sm font-mono break-all">
                                  {url.url.replace('https://www.empathyhealthclinic.com', '')}
                                </code>
                                <a
                                  href={url.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary flex-shrink-0" />
                                </a>
                              </div>
                              <Badge variant="outline" className="text-xs">{url.pageType}</Badge>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-center">
                                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                                  <Smartphone className="h-3 w-3" />
                                  Mobile
                                </div>
                                <Badge variant={getScoreBadgeVariant(url.mobileScore)}>
                                  {url.mobileScore ?? 'N/A'}
                                </Badge>
                              </div>
                              <div className="text-center">
                                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                                  <Monitor className="h-3 w-3" />
                                  Desktop
                                </div>
                                <Badge variant={getScoreBadgeVariant(url.desktopScore)}>
                                  {url.desktopScore ?? 'N/A'}
                                </Badge>
                              </div>
                              {url.gscStatus && (
                                <div className="text-center">
                                  <div className="text-xs text-muted-foreground mb-1">Index</div>
                                  <Badge variant={url.gscStatus.verdict === 'PASS' ? 'default' : 'destructive'}>
                                    {url.gscStatus.verdict === 'PASS' ? 'Indexed' : 'Not Indexed'}
                                  </Badge>
                                </div>
                              )}
                            </div>
                          </div>
                          {url.labMetrics && (
                            <div className="mt-3 pt-3 border-t flex flex-wrap gap-4 text-xs">
                              <div>
                                <span className="text-muted-foreground">LCP:</span>{' '}
                                <span className={getScoreColor(url.labMetrics.lcp < 2500 ? 90 : url.labMetrics.lcp < 4000 ? 60 : 30)}>
                                  {(url.labMetrics.lcp / 1000).toFixed(1)}s
                                </span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">FID:</span>{' '}
                                <span>{url.labMetrics.fid ?? 'N/A'}ms</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">CLS:</span>{' '}
                                <span className={getScoreColor(url.labMetrics.cls < 0.1 ? 90 : url.labMetrics.cls < 0.25 ? 60 : 30)}>
                                  {url.labMetrics.cls?.toFixed(3)}
                                </span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">TBT:</span>{' '}
                                <span>{url.labMetrics.tbt}ms</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Audit History</CardTitle>
                    <CardDescription>
                      Previous audit runs and their status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!runs || runs.length === 0 ? (
                      <Alert>
                        <AlertDescription>No audit runs yet. Run a manual audit to get started.</AlertDescription>
                      </Alert>
                    ) : (
                      <div className="space-y-3">
                        {runs.map((run) => (
                          <div
                            key={run.id}
                            className="p-4 border rounded-lg flex items-center justify-between gap-4 flex-wrap"
                            data-testid={`audit-run-${run.id}`}
                          >
                            <div className="flex items-center gap-3">
                              {run.status === 'completed' ? (
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                              ) : run.status === 'running' ? (
                                <Clock className="h-5 w-5 text-primary animate-pulse" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                              )}
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">Run #{run.id}</span>
                                  <Badge variant="outline">{run.scheduleType}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {format(new Date(run.startedAt), 'MMM d, yyyy h:mm a')}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-sm text-right">
                                <p>{run.processedUrls} / {run.totalUrls} URLs</p>
                                <p className="text-muted-foreground capitalize">{run.status}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}

        {!latestResults && !isLoading && (
          <Card>
            <CardContent className="py-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Audit Data Yet</h3>
              <p className="text-muted-foreground mb-4">
                Run a manual audit to check your site's SEO performance
              </p>
              <Button
                onClick={() => runAuditMutation.mutate()}
                disabled={runAuditMutation.isPending}
                data-testid="button-run-first-audit"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${runAuditMutation.isPending ? 'animate-spin' : ''}`} />
                Run First Audit
              </Button>
            </CardContent>
          </Card>
        )}

        {isLoading && (
          <Card>
            <CardContent className="py-12 text-center">
              <RefreshCw className="h-8 w-8 text-muted-foreground mx-auto mb-4 animate-spin" />
              <p className="text-muted-foreground">Loading audit data...</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
