import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  CheckCircle2,
  Mail,
  Calendar,
  User
} from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Lead, AnalyticsEvent } from "@shared/schema";

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

interface FormConversionMetrics {
  shortFormStarts: number;
  shortFormSubmissions: number;
  longFormStarts: number;
  longFormSubmissions: number;
  shortFormDropOffRate: number;
  longFormDropOffRate: number;
  totalDropOffRate: number;
}

export default function AnalyticsDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState<string>("today");
  const gaActive = isGAActive();
  const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  const { data, isLoading, refetch } = useQuery<DashboardData>({
    queryKey: ['/api/analytics/dashboard', timeRange],
    queryFn: async () => {
      const response = await fetch(`/api/analytics/dashboard?timeRange=${timeRange}`);
      if (!response.ok) throw new Error('Failed to fetch analytics');
      return response.json();
    },
  });

  const { data: formMetrics } = useQuery<FormConversionMetrics>({
    queryKey: ['/api/analytics/forms', timeRange],
    queryFn: async () => {
      const response = await fetch(`/api/analytics/forms?timeRange=${timeRange}`);
      if (!response.ok) throw new Error('Failed to fetch form metrics');
      return response.json();
    },
  });

  const { data: leads, isLoading: leadsLoading } = useQuery<Lead[]>({
    queryKey: ['/api/leads'],
  });

  const [selectedEvent, setSelectedEvent] = useState<AnalyticsEvent | null>(null);

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['/api/analytics/dashboard'] });
    queryClient.invalidateQueries({ queryKey: ['/api/analytics/forms'] });
    queryClient.invalidateQueries({ queryKey: ['/api/leads'] });
    refetch();
  };

  const handleTestGA = () => {
    trackEvent('test_analytics_tracking', 'admin', 'Dashboard Test', 'manual_test');
    
    const gtagLoaded = typeof window.gtag !== 'undefined';
    const measurementIdConfigured = !!gaMeasurementId;
    
    toast({
      title: "✅ Test Event Sent!",
      description: (
        <div className="space-y-2 mt-2" data-testid="toast-ga-test">
          <div className="font-semibold">Configuration Status:</div>
          <div className="text-sm space-y-1">
            <div>• GA Measurement ID: {measurementIdConfigured ? '✓ Configured' : '✗ Missing'}</div>
            <div>• gtag loaded: {gtagLoaded ? '✓ Yes' : '✗ No'}</div>
            <div>• GA Active: {gaActive ? '✓ Yes' : '✗ No'}</div>
          </div>
          <div className="text-sm text-muted-foreground mt-3 pt-2 border-t">
            Check GA4 Realtime reports to see this event appear within 60 seconds.
          </div>
        </div>
      ),
      duration: 8000,
    });
    
    console.log('📊 GA Configuration Test Results:', {
      measurementId: gaMeasurementId?.substring(0, 10) + '...',
      gtagLoaded,
      gaActive,
      testEventSent: true
    });
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
          <div className="flex items-center gap-3 flex-wrap">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]" data-testid="select-time-range">
                <Clock className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
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

        {/* Google Search Console Status */}
        <Card data-testid="card-gsc-status">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Google Search Console Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                {import.meta.env.VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500" data-testid="icon-gsc-configured" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-yellow-500" data-testid="icon-gsc-not-configured" />
                )}
                <div>
                  <p className="font-medium" data-testid="text-gsc-status">
                    {import.meta.env.VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION 
                      ? 'Verification Meta Tag Configured' 
                      : 'Not Configured'
                    }
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {import.meta.env.VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION 
                      ? 'Site ready for Google Search Console verification' 
                      : 'Add VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION to enable SEO monitoring'
                    }
                  </p>
                </div>
              </div>
              {import.meta.env.VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION && (
                <Button 
                  variant="outline" 
                  onClick={() => window.open('https://search.google.com/search-console', '_blank')}
                  data-testid="button-open-gsc"
                >
                  Open Search Console
                </Button>
              )}
            </div>
            {!import.meta.env.VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION && (
              <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
                <p className="font-medium mb-2">Setup Instructions:</p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>Visit Google Search Console and add your property</li>
                  <li>Choose "HTML tag" verification method</li>
                  <li>Copy the verification code from the meta tag</li>
                  <li>Add it to Replit Secrets as VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION</li>
                  <li>Publish your site and verify in Search Console</li>
                </ol>
              </div>
            )}
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
                <p className="text-sm text-muted-foreground">
                  {timeRange === 'today' ? 'Today' : timeRange === '7d' ? 'Last 7 Days' : timeRange === '30d' ? 'Last 30 Days' : 'Total (All Time)'}
                </p>
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

        {/* Form Conversion Metrics */}
        {formMetrics && (
          <Card data-testid="card-form-metrics">
            <CardHeader>
              <CardTitle>Form Conversion Metrics</CardTitle>
              <CardDescription>Short vs long form submissions and drop-off rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Form Type Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Short Form */}
                  <div className="p-4 rounded-lg border">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Short Contact Form
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Started</span>
                        <span className="font-semibold" data-testid="text-short-form-starts">
                          {formMetrics.shortFormStarts}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Submitted</span>
                        <span className="font-semibold" data-testid="text-short-form-submissions">
                          {formMetrics.shortFormSubmissions}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Drop-off Rate</span>
                        <Badge 
                          variant={formMetrics.shortFormDropOffRate < 30 ? 'default' : formMetrics.shortFormDropOffRate < 60 ? 'secondary' : 'destructive'}
                          data-testid="badge-short-form-dropoff"
                        >
                          {formMetrics.shortFormDropOffRate.toFixed(1)}%
                        </Badge>
                      </div>
                      <Progress 
                        value={formMetrics.shortFormDropOffRate} 
                        className="h-2"
                        data-testid="progress-short-form-dropoff"
                      />
                    </div>
                  </div>

                  {/* Long Form */}
                  <div className="p-4 rounded-lg border">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Long Contact Form
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Started</span>
                        <span className="font-semibold" data-testid="text-long-form-starts">
                          {formMetrics.longFormStarts}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Submitted</span>
                        <span className="font-semibold" data-testid="text-long-form-submissions">
                          {formMetrics.longFormSubmissions}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Drop-off Rate</span>
                        <Badge 
                          variant={formMetrics.longFormDropOffRate < 30 ? 'default' : formMetrics.longFormDropOffRate < 60 ? 'secondary' : 'destructive'}
                          data-testid="badge-long-form-dropoff"
                        >
                          {formMetrics.longFormDropOffRate.toFixed(1)}%
                        </Badge>
                      </div>
                      <Progress 
                        value={formMetrics.longFormDropOffRate} 
                        className="h-2"
                        data-testid="progress-long-form-dropoff"
                      />
                    </div>
                  </div>
                </div>

                {/* Overall Conversion */}
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Overall Form Performance
                    </h3>
                    <Badge 
                      variant={formMetrics.totalDropOffRate < 30 ? 'default' : formMetrics.totalDropOffRate < 60 ? 'secondary' : 'destructive'}
                      data-testid="badge-total-dropoff"
                    >
                      {formMetrics.totalDropOffRate.toFixed(1)}% drop-off
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold">{formMetrics.shortFormStarts + formMetrics.longFormStarts}</p>
                      <p className="text-xs text-muted-foreground">Total Started</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{formMetrics.shortFormSubmissions + formMetrics.longFormSubmissions}</p>
                      <p className="text-xs text-muted-foreground">Total Submitted</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{formMetrics.shortFormSubmissions}</p>
                      <p className="text-xs text-muted-foreground">Short Forms</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{formMetrics.longFormSubmissions}</p>
                      <p className="text-xs text-muted-foreground">Long Forms</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
        {(() => {
          const filteredRecentEvents = data?.events.recent?.filter((e: any) => e.eventType !== 'virtual_visit_click') || [];
          return filteredRecentEvents.length > 0 && (
            <Card data-testid="card-recent-activity">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest tracked events (excluding virtual visits from current clients)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredRecentEvents.slice(0, 20).map((event, index) => (
                  <div 
                    key={event.id || index} 
                    className="flex items-center justify-between gap-4 p-3 rounded-lg border text-sm cursor-pointer hover-elevate active-elevate-2"
                    onClick={() => setSelectedEvent(event)}
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
          );
        })()}

        {/* Event Details Dialog */}
        <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Event Details
              </DialogTitle>
              <DialogDescription>
                Complete information about this tracked event
              </DialogDescription>
            </DialogHeader>
            
            {selectedEvent && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Event Type</p>
                    <p className="text-base font-semibold" data-testid="dialog-event-type">
                      {selectedEvent.eventType}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Category</p>
                    <Badge variant="outline" data-testid="dialog-event-category">
                      {selectedEvent.eventCategory}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Timestamp</p>
                    <p className="text-base" data-testid="dialog-event-timestamp">
                      {new Date(selectedEvent.timestamp).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Page Path</p>
                    <p className="text-base font-mono text-sm" data-testid="dialog-event-path">
                      {selectedEvent.path}
                    </p>
                  </div>
                </div>

                <Separator />

                {selectedEvent.eventLabel && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Event Label</p>
                    <p className="text-base" data-testid="dialog-event-label">
                      {selectedEvent.eventLabel}
                    </p>
                  </div>
                )}

                {selectedEvent.value && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Value</p>
                    <p className="text-base" data-testid="dialog-event-value">
                      {selectedEvent.value}
                    </p>
                  </div>
                )}

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Event ID</p>
                  <p className="text-xs font-mono text-muted-foreground" data-testid="dialog-event-id">
                    {selectedEvent.id}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Lead Submissions */}
        <Card data-testid="card-lead-submissions">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Lead Submissions
            </CardTitle>
            <CardDescription className="flex items-center gap-4 flex-wrap">
              <span>
                All form submissions from your website (most recent first)
              </span>
              {leads && leads.length > 0 && (() => {
                // Use local timezone (clinic's timezone) for "today" calculation
                const now = new Date();
                const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                const todayLeads = leads.filter(l => {
                  const leadDate = new Date(l.createdAt);
                  return leadDate >= todayStart;
                });
                return (
                  <Badge variant="secondary" className="ml-auto" data-testid="badge-today-leads">
                    {todayLeads.length} today · {leads.length} total
                  </Badge>
                );
              })()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {leadsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Activity className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : !leads || leads.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No lead submissions yet
              </div>
            ) : (
              <div className="space-y-4">
                {leads.map((lead, index) => (
                  <div 
                    key={lead.id} 
                    className="p-4 rounded-lg border hover-elevate"
                    data-testid={`lead-${index}`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold" data-testid={`lead-name-${index}`}>
                            {lead.firstName} {lead.lastName}
                          </p>
                          <Badge variant="outline" className="mt-1" data-testid={`lead-form-type-${index}`}>
                            {lead.formType === 'long' ? 'Full Application' : 'Quick Contact'}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(lead.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Email:</span>
                        <a 
                          href={`mailto:${lead.email}`} 
                          className="text-primary hover:underline"
                          data-testid={`lead-email-${index}`}
                        >
                          {lead.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Phone:</span>
                        <a 
                          href={`tel:${lead.phone}`} 
                          className="text-primary hover:underline"
                          data-testid={`lead-phone-${index}`}
                        >
                          {lead.phone}
                        </a>
                      </div>
                      {lead.service && (
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Service:</span>
                          <span data-testid={`lead-service-${index}`}>{lead.service}</span>
                        </div>
                      )}
                      {lead.smsOptIn === 'true' && (
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">SMS Opt-in</Badge>
                        </div>
                      )}
                    </div>

                    {lead.formType === 'long' && (
                      <>
                        <Separator className="my-3" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          {lead.conditions && lead.conditions !== '[]' && (
                            <div>
                              <span className="text-muted-foreground font-medium">Conditions:</span>
                              <p className="mt-1" data-testid={`lead-conditions-${index}`}>
                                {JSON.parse(lead.conditions).join(', ')}
                              </p>
                            </div>
                          )}
                          {lead.symptoms && lead.symptoms !== '[]' && (
                            <div>
                              <span className="text-muted-foreground font-medium">Symptoms:</span>
                              <p className="mt-1" data-testid={`lead-symptoms-${index}`}>
                                {JSON.parse(lead.symptoms).join(', ')}
                              </p>
                            </div>
                          )}
                          {lead.medications && (
                            <div>
                              <span className="text-muted-foreground font-medium">Medications:</span>
                              <p className="mt-1" data-testid={`lead-medications-${index}`}>
                                {lead.medications}
                              </p>
                            </div>
                          )}
                          {lead.preferredDay && (
                            <div>
                              <span className="text-muted-foreground font-medium">Preferred Day:</span>
                              <p className="mt-1" data-testid={`lead-preferred-day-${index}`}>
                                {lead.preferredDay}
                              </p>
                            </div>
                          )}
                          {lead.paymentMethod && (
                            <div>
                              <span className="text-muted-foreground font-medium">Payment:</span>
                              <p className="mt-1" data-testid={`lead-payment-${index}`}>
                                {lead.paymentMethod === 'insurance' ? 'Insurance' : 'Self-Pay'}
                              </p>
                            </div>
                          )}
                          {lead.insuranceProvider && (
                            <div>
                              <span className="text-muted-foreground font-medium">Insurance Provider:</span>
                              <p className="mt-1" data-testid={`lead-insurance-${index}`}>
                                {lead.insuranceProvider}
                              </p>
                            </div>
                          )}
                          {lead.insuredName && (
                            <div>
                              <span className="text-muted-foreground font-medium">Insured Name:</span>
                              <p className="mt-1">{lead.insuredName}</p>
                            </div>
                          )}
                          {lead.insuredDob && (
                            <div>
                              <span className="text-muted-foreground font-medium">Insured DOB:</span>
                              <p className="mt-1">{lead.insuredDob}</p>
                            </div>
                          )}
                          {lead.memberId && (
                            <div>
                              <span className="text-muted-foreground font-medium">Member ID:</span>
                              <p className="mt-1">{lead.memberId}</p>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
