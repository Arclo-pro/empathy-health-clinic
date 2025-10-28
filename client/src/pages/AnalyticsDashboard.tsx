import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { queryClient } from "@/lib/queryClient";
import { isGAActive, trackEvent } from "@/lib/analytics";
import { 
  RefreshCw, 
  TrendingUp, 
  Activity, 
  Users, 
  Phone, 
  FileText, 
  Video,
  Eye,
  Clock,
  Zap,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { useLocation } from "wouter";

interface DashboardData {
  pageViews: {
    total: number;
    last7Days: number;
    last30Days: number;
    topPages: { path: string; count: number }[];
  };
  events: {
    total: number;
    summary: { eventType: string; count: number }[];
    recent: any[];
  };
  vitals: { metricName: string; avgValue: number; rating: string }[];
  conversions: {
    totalLeads: number;
    formSubmissions: number;
    phoneClicks: number;
    virtualVisitRequests: number;
  };
}

function getWebVitalRating(metricName: string, value: number): { rating: string; color: string; percentage: number } {
  const thresholds: Record<string, { good: number; needsImprovement: number; max: number }> = {
    LCP: { good: 2500, needsImprovement: 4000, max: 6000 },
    INP: { good: 200, needsImprovement: 500, max: 1000 },
    CLS: { good: 0.1, needsImprovement: 0.25, max: 0.5 },
    FCP: { good: 1800, needsImprovement: 3000, max: 5000 },
    TTFB: { good: 800, needsImprovement: 1800, max: 3000 }
  };

  const threshold = thresholds[metricName];
  if (!threshold) return { rating: 'unknown', color: 'bg-muted', percentage: 0 };

  let rating: string;
  let color: string;
  let percentage: number;

  if (value <= threshold.good) {
    rating = 'good';
    color = 'bg-green-500';
    percentage = (value / threshold.good) * 33;
  } else if (value <= threshold.needsImprovement) {
    rating = 'needs-improvement';
    color = 'bg-yellow-500';
    percentage = 33 + ((value - threshold.good) / (threshold.needsImprovement - threshold.good)) * 33;
  } else {
    rating = 'poor';
    color = 'bg-red-500';
    percentage = 66 + Math.min(((value - threshold.needsImprovement) / (threshold.max - threshold.needsImprovement)) * 34, 34);
  }

  return { rating, color, percentage: Math.min(percentage, 100) };
}

function formatWebVitalValue(metricName: string, value: number): string {
  if (metricName === 'CLS') {
    return value.toFixed(3);
  }
  return `${Math.round(value)}ms`;
}

export default function AnalyticsDashboard() {
  const [, setLocation] = useLocation();
  const gaActive = isGAActive();
  const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  const { data, isLoading, refetch } = useQuery<DashboardData>({
    queryKey: ['/api/analytics/dashboard'],
  });

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['/api/analytics/dashboard'] });
    refetch();
  };

  const handleTestGA = () => {
    trackEvent('test_analytics_tracking', 'admin', 'Dashboard Test');
    alert('Test event sent! Check your Google Analytics dashboard.');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Activity className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-sans font-medium" data-testid="text-page-title">
              Analytics Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Site health, web vitals, and user engagement metrics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleRefresh}
              data-testid="button-refresh"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button
              variant="outline"
              onClick={() => setLocation("/admin")}
              data-testid="button-back-admin"
            >
              Back to Admin
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Google Analytics Status */}
        <Card data-testid="card-ga-status">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Google Analytics Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                {gaActive ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500" data-testid="icon-ga-active" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-yellow-500" data-testid="icon-ga-inactive" />
                )}
                <div>
                  <p className="font-medium" data-testid="text-ga-status">
                    {gaActive ? 'Active & Tracking' : 'Not Configured'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {gaActive 
                      ? `Measurement ID: ${gaMeasurementId?.substring(0, 8)}...` 
                      : 'Set VITE_GA_MEASUREMENT_ID to enable tracking'
                    }
                  </p>
                </div>
              </div>
              {gaActive && (
                <Button variant="outline" onClick={handleTestGA} data-testid="button-test-ga">
                  Test Tracking
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Core Web Vitals */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Core Web Vitals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.vitals && data.vitals.length > 0 ? (
              data.vitals.map((vital) => {
                const { rating, color, percentage } = getWebVitalRating(vital.metricName, vital.avgValue);
                const formattedValue = formatWebVitalValue(vital.metricName, vital.avgValue);

                return (
                  <Card key={vital.metricName} data-testid={`card-vital-${vital.metricName}`}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-medium flex items-center justify-between">
                        <span>{vital.metricName}</span>
                        <Badge 
                          variant={rating === 'good' ? 'default' : rating === 'needs-improvement' ? 'secondary' : 'destructive'}
                          data-testid={`badge-rating-${vital.metricName}`}
                        >
                          {rating}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {vital.metricName === 'LCP' && 'Largest Contentful Paint'}
                        {vital.metricName === 'INP' && 'Interaction to Next Paint'}
                        {vital.metricName === 'CLS' && 'Cumulative Layout Shift'}
                        {vital.metricName === 'FCP' && 'First Contentful Paint'}
                        {vital.metricName === 'TTFB' && 'Time to First Byte'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-3xl font-bold" data-testid={`text-value-${vital.metricName}`}>
                        {formattedValue}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Performance</span>
                          <span>{Math.round(percentage)}%</span>
                        </div>
                        <Progress 
                          value={percentage} 
                          className="h-2" 
                          data-testid={`progress-${vital.metricName}`}
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Card className="md:col-span-2 lg:col-span-3">
                <CardContent className="py-12 text-center">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    No web vitals data available yet. Data will appear as users visit the site.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Page Views & Conversions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Page Views Summary */}
          <Card data-testid="card-page-views">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Eye className="h-4 w-4" />
                Page Views
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total (All Time)</p>
                <p className="text-3xl font-bold" data-testid="text-total-views">
                  {data?.pageViews.total.toLocaleString() || 0}
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last 7 Days</span>
                  <span className="font-semibold" data-testid="text-views-7d">
                    {data?.pageViews.last7Days.toLocaleString() || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last 30 Days</span>
                  <span className="font-semibold" data-testid="text-views-30d">
                    {data?.pageViews.last30Days.toLocaleString() || 0}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Leads */}
          <Card data-testid="card-leads">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-4 w-4" />
                Total Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Captured Leads</p>
                <p className="text-3xl font-bold" data-testid="text-total-leads">
                  {data?.conversions.totalLeads.toLocaleString() || 0}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Total Events */}
          <Card data-testid="card-total-events">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4" />
                Total Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-sm text-muted-foreground mb-2">All Tracked Events</p>
                <p className="text-3xl font-bold" data-testid="text-total-events">
                  {data?.events.total.toLocaleString() || 0}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conversions & Events */}
        <Card data-testid="card-conversions">
          <CardHeader>
            <CardTitle>Conversions & Events</CardTitle>
            <CardDescription>User interactions and conversion tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-lg border hover-elevate" data-testid="stat-form-submissions">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{data?.conversions.formSubmissions || 0}</p>
                  <p className="text-sm text-muted-foreground">Form Submissions</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg border hover-elevate" data-testid="stat-phone-clicks">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{data?.conversions.phoneClicks || 0}</p>
                  <p className="text-sm text-muted-foreground">Phone Clicks</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg border hover-elevate" data-testid="stat-virtual-visits">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Video className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{data?.conversions.virtualVisitRequests || 0}</p>
                  <p className="text-sm text-muted-foreground">Virtual Visit Requests</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg border hover-elevate" data-testid="stat-other-events">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {(data?.events.total || 0) - 
                     (data?.conversions.formSubmissions || 0) - 
                     (data?.conversions.phoneClicks || 0) - 
                     (data?.conversions.virtualVisitRequests || 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Other Events</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Pages */}
        {data?.pageViews.topPages && data.pageViews.topPages.length > 0 && (
          <Card data-testid="card-top-pages">
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>Most visited pages on your site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.pageViews.topPages.map((page, index) => (
                  <div 
                    key={page.path} 
                    className="flex items-center justify-between gap-4 p-3 rounded-lg border hover-elevate"
                    data-testid={`page-stat-${index}`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <Badge variant="outline" className="shrink-0">
                        {index + 1}
                      </Badge>
                      <span className="text-sm font-medium truncate">{page.path || '/'}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-sm text-muted-foreground">{page.count} views</span>
                      <div className="w-24">
                        <Progress 
                          value={(page.count / (data.pageViews.topPages[0]?.count || 1)) * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Activity */}
        {data?.events.recent && data.events.recent.length > 0 && (
          <Card data-testid="card-recent-activity">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest tracked events (last 20)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {data.events.recent.slice(0, 20).map((event, index) => (
                  <div 
                    key={event.id || index} 
                    className="flex items-center justify-between gap-4 p-3 rounded-lg border text-sm"
                    data-testid={`event-${index}`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium truncate">{event.eventType}</p>
                        {event.eventLabel && (
                          <p className="text-xs text-muted-foreground truncate">{event.eventLabel}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Badge variant="outline">{event.eventCategory}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(event.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
