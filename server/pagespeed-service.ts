import axios from 'axios';

const PSI_API_KEY = process.env.GCP_PSI_API_KEY;
const PSI_API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

export interface LabMetrics {
  fcp: number | null;
  lcp: number | null;
  tbt: number | null;
  cls: number | null;
  si: number | null;
  tti: number | null;
}

export interface AuditOpportunity {
  id: string;
  title: string;
  description: string;
  score: number | null;
  displayValue?: string;
  numericValue?: number;
  savings?: number;
}

export interface PageSpeedResult {
  url: string;
  strategy: 'mobile' | 'desktop';
  performanceScore: number | null;
  seoScore: number | null;
  accessibilityScore: number | null;
  bestPracticesScore: number | null;
  labMetrics: LabMetrics;
  opportunities: AuditOpportunity[];
  diagnostics: AuditOpportunity[];
  error?: string;
}

export async function runPageSpeedAudit(
  url: string,
  strategy: 'mobile' | 'desktop' = 'mobile'
): Promise<PageSpeedResult> {
  if (!PSI_API_KEY) {
    return {
      url,
      strategy,
      performanceScore: null,
      seoScore: null,
      accessibilityScore: null,
      bestPracticesScore: null,
      labMetrics: { fcp: null, lcp: null, tbt: null, cls: null, si: null, tti: null },
      opportunities: [],
      diagnostics: [],
      error: 'GCP_PSI_API_KEY not configured',
    };
  }

  try {
    const params = new URLSearchParams({
      url: url,
      key: PSI_API_KEY,
      strategy: strategy,
      category: 'performance',
    });
    params.append('category', 'seo');
    params.append('category', 'accessibility');
    params.append('category', 'best-practices');

    const response = await axios.get(`${PSI_API_URL}?${params.toString()}`, {
      timeout: 120000,
    });

    const data = response.data;
    const categories = data.lighthouseResult?.categories || {};
    const audits = data.lighthouseResult?.audits || {};

    const labMetrics: LabMetrics = {
      fcp: audits['first-contentful-paint']?.numericValue || null,
      lcp: audits['largest-contentful-paint']?.numericValue || null,
      tbt: audits['total-blocking-time']?.numericValue || null,
      cls: audits['cumulative-layout-shift']?.numericValue || null,
      si: audits['speed-index']?.numericValue || null,
      tti: audits['interactive']?.numericValue || null,
    };

    const opportunities: AuditOpportunity[] = [];
    const diagnostics: AuditOpportunity[] = [];

    const opportunityIds = [
      'render-blocking-resources',
      'unused-css-rules',
      'unused-javascript',
      'modern-image-formats',
      'offscreen-images',
      'uses-optimized-images',
      'uses-responsive-images',
      'uses-text-compression',
      'uses-rel-preconnect',
      'server-response-time',
      'redirects',
      'uses-rel-preload',
      'efficient-animated-content',
      'duplicated-javascript',
      'legacy-javascript',
      'preload-lcp-image',
      'total-byte-weight',
      'unminified-css',
      'unminified-javascript',
    ];

    const diagnosticIds = [
      'dom-size',
      'critical-request-chains',
      'long-tasks',
      'font-display',
      'bootup-time',
      'mainthread-work-breakdown',
      'third-party-summary',
      'largest-contentful-paint-element',
      'layout-shift-elements',
      'uses-passive-event-listeners',
      'no-document-write',
      'viewport',
    ];

    for (const id of opportunityIds) {
      const audit = audits[id];
      if (audit && audit.score !== null && audit.score < 1) {
        opportunities.push({
          id,
          title: audit.title || id,
          description: audit.description || '',
          score: audit.score,
          displayValue: audit.displayValue,
          numericValue: audit.numericValue,
          savings: audit.details?.overallSavingsMs,
        });
      }
    }

    for (const id of diagnosticIds) {
      const audit = audits[id];
      if (audit && audit.score !== null && audit.score < 1) {
        diagnostics.push({
          id,
          title: audit.title || id,
          description: audit.description || '',
          score: audit.score,
          displayValue: audit.displayValue,
          numericValue: audit.numericValue,
        });
      }
    }

    return {
      url,
      strategy,
      performanceScore: categories.performance?.score !== undefined
        ? Math.round(categories.performance.score * 100)
        : null,
      seoScore: categories.seo?.score !== undefined
        ? Math.round(categories.seo.score * 100)
        : null,
      accessibilityScore: categories.accessibility?.score !== undefined
        ? Math.round(categories.accessibility.score * 100)
        : null,
      bestPracticesScore: categories['best-practices']?.score !== undefined
        ? Math.round(categories['best-practices'].score * 100)
        : null,
      labMetrics,
      opportunities: opportunities.sort((a, b) => (b.savings || 0) - (a.savings || 0)),
      diagnostics,
    };
  } catch (error: any) {
    console.error(`PageSpeed audit failed for ${url}:`, error.message);
    return {
      url,
      strategy,
      performanceScore: null,
      seoScore: null,
      accessibilityScore: null,
      bestPracticesScore: null,
      labMetrics: { fcp: null, lcp: null, tbt: null, cls: null, si: null, tti: null },
      opportunities: [],
      diagnostics: [],
      error: error.response?.data?.error?.message || error.message,
    };
  }
}

export async function runFullPageSpeedAudit(url: string): Promise<{
  mobile: PageSpeedResult;
  desktop: PageSpeedResult;
}> {
  const [mobile, desktop] = await Promise.all([
    runPageSpeedAudit(url, 'mobile'),
    runPageSpeedAudit(url, 'desktop'),
  ]);

  return { mobile, desktop };
}

export function classifyPerformanceScore(score: number | null): 'good' | 'needs-improvement' | 'poor' | 'unknown' {
  if (score === null) return 'unknown';
  if (score >= 90) return 'good';
  if (score >= 50) return 'needs-improvement';
  return 'poor';
}

export function classifyMetric(
  metricName: keyof LabMetrics,
  value: number | null
): 'good' | 'needs-improvement' | 'poor' | 'unknown' {
  if (value === null) return 'unknown';

  const thresholds: Record<keyof LabMetrics, { good: number; poor: number }> = {
    fcp: { good: 1800, poor: 3000 },
    lcp: { good: 2500, poor: 4000 },
    tbt: { good: 200, poor: 600 },
    cls: { good: 0.1, poor: 0.25 },
    si: { good: 3400, poor: 5800 },
    tti: { good: 3800, poor: 7300 },
  };

  const threshold = thresholds[metricName];
  if (!threshold) return 'unknown';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}
