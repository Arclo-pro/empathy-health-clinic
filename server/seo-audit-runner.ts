import { db } from './db';
import { auditRuns, auditRunUrls, auditIssues } from '@shared/schema';
import { runFullPageSpeedAudit, classifyPerformanceScore, classifyMetric, PageSpeedResult } from './pagespeed-service';
import { inspectUrl, classifyIndexStatus, UrlInspectionResult } from './gsc-service';
import { eq } from 'drizzle-orm';

const BASE_URL = 'https://empathyhealthclinic.com';

interface AuditConfig {
  scheduleType: 'manual' | 'nightly' | 'weekly';
  urlList?: string[];
  includePageSpeed?: boolean;
  includeGSC?: boolean;
}

interface UrlAuditResult {
  url: string;
  pageType: string;
  psiMobile?: PageSpeedResult;
  psiDesktop?: PageSpeedResult;
  gscInspection?: UrlInspectionResult;
  issues: AuditIssueData[];
}

interface AuditIssueData {
  category: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  evidence?: any;
  recommendation: string;
}

const PRIORITY_URLS = [
  { path: '/', type: 'homepage' },
  { path: '/services', type: 'services' },
  { path: '/therapy', type: 'services' },
  { path: '/team', type: 'team' },
  { path: '/insurance', type: 'insurance' },
  { path: '/blog', type: 'blog-listing' },
  { path: '/psychiatrist-orlando', type: 'landing-orlando' },
  { path: '/psychiatry-clinic-orlando', type: 'landing-orlando' },
  { path: '/anxiety-psychiatrist-orlando', type: 'landing-orlando' },
  { path: '/adhd-psychiatrist-orlando', type: 'landing-orlando' },
  { path: '/telepsychiatry-orlando', type: 'landing-orlando' },
  { path: '/same-day-psychiatrist-orlando', type: 'landing-orlando' },
  { path: '/child-psychiatrist-orlando', type: 'landing-orlando' },
  { path: '/psychiatrist-near-me', type: 'landing-near-me' },
  { path: '/therapy-near-me', type: 'landing-near-me' },
  { path: '/counselor-near-me', type: 'landing-near-me' },
  { path: '/mental-health-near-me', type: 'landing-near-me' },
  { path: '/adhd-treatment', type: 'condition' },
  { path: '/anxiety-therapy', type: 'condition' },
  { path: '/depression-treatment', type: 'condition' },
  { path: '/medication-management', type: 'treatment' },
  { path: '/psychiatric-evaluation', type: 'treatment' },
  { path: '/cognitive-behavioral-therapy', type: 'therapy' },
  { path: '/emdr-therapy', type: 'therapy' },
  { path: '/couples-counseling', type: 'therapy' },
  { path: '/virtual-therapy', type: 'therapy' },
  { path: '/insurance/cigna', type: 'insurance' },
  { path: '/insurance/aetna', type: 'insurance' },
  { path: '/insurance/bluecross-blueshield', type: 'insurance' },
  { path: '/insurance/united-healthcare', type: 'insurance' },
];

export async function runSEOAudit(config: AuditConfig): Promise<number> {
  const { scheduleType, urlList, includePageSpeed = true, includeGSC = true } = config;

  // Create audit run record
  const [auditRun] = await db.insert(auditRuns).values({
    scheduleType,
    status: 'running',
    totalUrls: 0,
    processedUrls: 0,
  }).returning();

  const runId = auditRun.id;

  try {
    const urlsToAudit = urlList 
      ? urlList.map(path => ({ path, type: 'custom' }))
      : PRIORITY_URLS;

    await db.update(auditRuns)
      .set({ totalUrls: urlsToAudit.length })
      .where(eq(auditRuns.id, runId));

    let processedCount = 0;

    for (const urlInfo of urlsToAudit) {
      const fullUrl = urlInfo.path.startsWith('http') ? urlInfo.path : `${BASE_URL}${urlInfo.path}`;
      
      try {
        const result = await auditSingleUrl(fullUrl, urlInfo.type, includePageSpeed, includeGSC);
        
        // Insert URL audit result
        await db.insert(auditRunUrls).values({
          runId,
          url: fullUrl,
          pageType: result.pageType,
          mobileScore: result.psiMobile?.performanceScore || null,
          desktopScore: result.psiDesktop?.performanceScore || null,
          mobileSeoScore: result.psiMobile?.seoScore || null,
          desktopSeoScore: result.psiDesktop?.seoScore || null,
          labMetrics: result.psiMobile?.labMetrics || null,
          gscStatus: result.gscInspection?.inspectionResult?.indexStatusResult || null,
          opportunities: result.psiMobile?.opportunities || null,
        });

        // Insert issues for this URL
        for (const issue of result.issues) {
          await db.insert(auditIssues).values({
            runId,
            url: fullUrl,
            category: issue.category,
            severity: issue.severity,
            title: issue.title,
            description: issue.description,
            evidence: issue.evidence || null,
            recommendation: issue.recommendation,
            status: 'open',
          });
        }

        processedCount++;
        await db.update(auditRuns)
          .set({ processedUrls: processedCount })
          .where(eq(auditRuns.id, runId));

        // Rate limiting between URLs (2 seconds)
        await new Promise(resolve => setTimeout(resolve, 2000));

      } catch (urlError: any) {
        console.error(`Failed to audit ${fullUrl}:`, urlError.message);
        
        await db.insert(auditIssues).values({
          runId,
          url: fullUrl,
          category: 'audit-error',
          severity: 'high',
          title: 'Audit Failed',
          description: `Failed to complete audit for this URL`,
          evidence: { error: urlError.message },
          recommendation: 'Review the error and retry the audit',
          status: 'open',
        });

        processedCount++;
        await db.update(auditRuns)
          .set({ processedUrls: processedCount })
          .where(eq(auditRuns.id, runId));
      }
    }

    // Mark audit as completed
    await db.update(auditRuns)
      .set({ 
        status: 'completed',
        completedAt: new Date(),
      })
      .where(eq(auditRuns.id, runId));

    return runId;

  } catch (error: any) {
    console.error('Audit run failed:', error.message);
    
    await db.update(auditRuns)
      .set({ 
        status: 'failed',
        completedAt: new Date(),
      })
      .where(eq(auditRuns.id, runId));

    throw error;
  }
}

async function auditSingleUrl(
  url: string, 
  pageType: string,
  includePageSpeed: boolean,
  includeGSC: boolean
): Promise<UrlAuditResult> {
  const issues: AuditIssueData[] = [];
  let psiMobile: PageSpeedResult | undefined;
  let psiDesktop: PageSpeedResult | undefined;
  let gscInspection: UrlInspectionResult | undefined;

  // Run PageSpeed Insights
  if (includePageSpeed) {
    const psiResult = await runFullPageSpeedAudit(url);
    psiMobile = psiResult.mobile;
    psiDesktop = psiResult.desktop;

    // Generate issues from PSI results
    issues.push(...generatePSIIssues(url, psiMobile, 'mobile'));
    issues.push(...generatePSIIssues(url, psiDesktop, 'desktop'));
  }

  // Run GSC URL Inspection
  if (includeGSC) {
    gscInspection = await inspectUrl(url);
    issues.push(...generateGSCIssues(url, gscInspection));
  }

  return {
    url,
    pageType,
    psiMobile,
    psiDesktop,
    gscInspection,
    issues,
  };
}

function generatePSIIssues(url: string, result: PageSpeedResult, strategy: string): AuditIssueData[] {
  const issues: AuditIssueData[] = [];

  if (result.error) {
    issues.push({
      category: 'psi-error',
      severity: 'high',
      title: `PageSpeed ${strategy} audit failed`,
      description: result.error,
      recommendation: 'Check if the URL is accessible and try again',
    });
    return issues;
  }

  // Performance score issues
  const perfClass = classifyPerformanceScore(result.performanceScore);
  if (perfClass === 'poor') {
    issues.push({
      category: 'performance',
      severity: 'critical',
      title: `Poor ${strategy} performance score: ${result.performanceScore}`,
      description: `The ${strategy} performance score is below 50, indicating serious performance issues.`,
      evidence: { score: result.performanceScore, labMetrics: result.labMetrics },
      recommendation: 'Address the top performance opportunities identified by PageSpeed Insights',
    });
  } else if (perfClass === 'needs-improvement') {
    issues.push({
      category: 'performance',
      severity: 'medium',
      title: `${strategy} performance needs improvement: ${result.performanceScore}`,
      description: `The ${strategy} performance score is between 50-89, indicating room for improvement.`,
      evidence: { score: result.performanceScore, labMetrics: result.labMetrics },
      recommendation: 'Optimize the top opportunities to improve Core Web Vitals',
    });
  }

  // SEO score issues
  if (result.seoScore !== null && result.seoScore < 90) {
    issues.push({
      category: 'seo',
      severity: result.seoScore < 70 ? 'high' : 'medium',
      title: `${strategy} SEO score: ${result.seoScore}`,
      description: `The ${strategy} SEO score indicates on-page SEO issues.`,
      evidence: { score: result.seoScore },
      recommendation: 'Review and fix on-page SEO issues identified by Lighthouse',
    });
  }

  // Core Web Vitals issues
  const lcpClass = classifyMetric('lcp', result.labMetrics.lcp);
  if (lcpClass === 'poor') {
    issues.push({
      category: 'cwv',
      severity: 'critical',
      title: `Poor LCP on ${strategy}: ${Math.round((result.labMetrics.lcp || 0) / 1000 * 10) / 10}s`,
      description: 'Largest Contentful Paint is above 4 seconds, indicating slow loading.',
      evidence: { lcp: result.labMetrics.lcp },
      recommendation: 'Optimize LCP by improving server response time, render-blocking resources, and image loading',
    });
  }

  const clsClass = classifyMetric('cls', result.labMetrics.cls);
  if (clsClass === 'poor') {
    issues.push({
      category: 'cwv',
      severity: 'high',
      title: `High CLS on ${strategy}: ${result.labMetrics.cls?.toFixed(3)}`,
      description: 'Cumulative Layout Shift is above 0.25, indicating significant layout instability.',
      evidence: { cls: result.labMetrics.cls },
      recommendation: 'Fix layout shifts by adding dimensions to images/embeds and avoiding late-loading content',
    });
  }

  const tbtClass = classifyMetric('tbt', result.labMetrics.tbt);
  if (tbtClass === 'poor') {
    issues.push({
      category: 'cwv',
      severity: 'high',
      title: `High TBT on ${strategy}: ${Math.round(result.labMetrics.tbt || 0)}ms`,
      description: 'Total Blocking Time is above 600ms, indicating main thread blocking issues.',
      evidence: { tbt: result.labMetrics.tbt },
      recommendation: 'Reduce JavaScript execution time by code splitting, lazy loading, and minimizing third-party scripts',
    });
  }

  // Top opportunities
  for (const opp of result.opportunities.slice(0, 3)) {
    if (opp.savings && opp.savings > 500) {
      issues.push({
        category: 'opportunity',
        severity: opp.savings > 2000 ? 'high' : 'medium',
        title: `${strategy}: ${opp.title}`,
        description: opp.description,
        evidence: { savings: opp.savings, displayValue: opp.displayValue },
        recommendation: `Potential savings: ${Math.round(opp.savings / 100) / 10}s`,
      });
    }
  }

  return issues;
}

function generateGSCIssues(url: string, result: UrlInspectionResult): AuditIssueData[] {
  const issues: AuditIssueData[] = [];

  if (result.error) {
    issues.push({
      category: 'gsc-error',
      severity: 'medium',
      title: 'GSC inspection failed',
      description: result.error,
      recommendation: 'Check GSC service account permissions',
    });
    return issues;
  }

  const indexStatus = classifyIndexStatus(result);
  
  if (indexStatus.status === 'not-indexed') {
    issues.push({
      category: 'indexing',
      severity: 'critical',
      title: 'Page not indexed',
      description: `This page is not indexed by Google: ${indexStatus.reason}`,
      evidence: result.inspectionResult?.indexStatusResult,
      recommendation: 'Review robots.txt, noindex directives, and request indexing in GSC',
    });
  }

  // Check for canonical mismatch
  const indexResult = result.inspectionResult?.indexStatusResult;
  if (indexResult?.googleCanonical && indexResult?.userCanonical) {
    if (indexResult.googleCanonical !== indexResult.userCanonical) {
      issues.push({
        category: 'canonical',
        severity: 'high',
        title: 'Canonical mismatch',
        description: `Google selected a different canonical: ${indexResult.googleCanonical}`,
        evidence: { 
          userCanonical: indexResult.userCanonical, 
          googleCanonical: indexResult.googleCanonical 
        },
        recommendation: 'Review canonical tag and consolidate duplicate content',
      });
    }
  }

  // Mobile usability issues
  const mobileResult = result.inspectionResult?.mobileUsabilityResult;
  if (mobileResult?.verdict === 'FAIL' && mobileResult.issues) {
    for (const issue of mobileResult.issues) {
      issues.push({
        category: 'mobile-usability',
        severity: issue.severity === 'error' ? 'high' : 'medium',
        title: `Mobile usability: ${issue.issueType}`,
        description: issue.message,
        recommendation: 'Fix mobile usability issues to improve mobile rankings',
      });
    }
  }

  return issues;
}

export async function getAuditRunStatus(runId: number) {
  const [run] = await db.select().from(auditRuns).where(eq(auditRuns.id, runId));
  return run;
}

export async function getAuditRunResults(runId: number) {
  const [run] = await db.select().from(auditRuns).where(eq(auditRuns.id, runId));
  const urls = await db.select().from(auditRunUrls).where(eq(auditRunUrls.runId, runId));
  const issues = await db.select().from(auditIssues).where(eq(auditIssues.runId, runId));

  return {
    run,
    urls,
    issues,
    summary: {
      totalUrls: urls.length,
      criticalIssues: issues.filter(i => i.severity === 'critical').length,
      highIssues: issues.filter(i => i.severity === 'high').length,
      mediumIssues: issues.filter(i => i.severity === 'medium').length,
      lowIssues: issues.filter(i => i.severity === 'low').length,
      avgMobileScore: urls.reduce((sum, u) => sum + (u.mobileScore || 0), 0) / urls.filter(u => u.mobileScore).length || 0,
      avgDesktopScore: urls.reduce((sum, u) => sum + (u.desktopScore || 0), 0) / urls.filter(u => u.desktopScore).length || 0,
    },
  };
}

export async function getLatestAuditRuns(limit = 10) {
  const runs = await db.select().from(auditRuns).orderBy(auditRuns.startedAt).limit(limit);
  return runs.reverse();
}
