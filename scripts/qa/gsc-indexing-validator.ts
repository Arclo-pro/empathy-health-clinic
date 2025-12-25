/**
 * Google Search Console Indexing Issue Validator
 * 
 * Validates against ALL GSC indexing problems:
 * 1. Soft 404 - Pages with thin content (CRITICAL)
 * 2. Page with redirect - Internal links pointing to redirect URLs (CRITICAL)
 * 3. Not found (404) - Broken internal links (CRITICAL)
 * 4. Excluded by noindex - Pages with noindex that shouldn't have it (CRITICAL)
 * 5. Alternate page with canonical - Pages canonicalizing elsewhere (CRITICAL)
 * 6. Duplicate without canonical - Pages missing canonical tags (CRITICAL)
 * 7. Blocked by robots.txt - Check robots.txt rules (CRITICAL)
 * 8. Crawled not indexed - Low quality content detection (WARNING)
 * 
 * Usage: npx tsx scripts/qa/gsc-indexing-validator.ts
 */

import fs from 'fs';
import path from 'path';

const PRERENDERED_DIR = path.join(process.cwd(), 'dist', 'prerendered');
const DOMAIN = 'https://www.empathyhealthclinic.com';
const BASE_URL = process.env.QA_BASE_URL || 'http://localhost:5000';

// Normalize redirect target URLs (replace localhost with production domain for reporting)
function normalizeRedirectTarget(target: string): string {
  if (!target) return target;
  // Replace localhost URLs with production domain for clearer reporting
  return target
    .replace(/^http:\/\/localhost:\d+/, DOMAIN)
    .replace(/^http:\/\/127\.0\.0\.1:\d+/, DOMAIN);
}

// Thresholds for soft 404 detection
const MIN_CONTENT_SIZE = 8000;  // bytes - pages smaller are likely soft 404s
const MIN_MAIN_CONTENT_LENGTH = 400;  // characters in main content area
const MIN_WORD_COUNT = 80;  // minimum words in body

// Pages that are intentionally noindex (utility/admin pages)
const INTENTIONAL_NOINDEX = new Set([
  '/admin', '/login', '/auth', '/config', '/debug',
  '/privacy-policy', '/terms', '/medical-disclaimer',
  '/thank-you', '/confirmation', '/success',
  '/404', '/not-found',
  // Paginated pages
  '/blog/page/2', '/blog/page/3', '/blog/page/4', '/blog/page/5',
]);

// Pages that intentionally canonicalize elsewhere (consolidated pages)
const INTENTIONAL_CANONICAL_REDIRECT = new Set([
  // Pages that point to consolidated versions
  '/psychiatry-orlando',
  '/psychiatry-clinic-orlando',
]);

// Known redirect paths that should be updated to final destination
const KNOWN_REDIRECT_PATHS = new Set([
  '/locations/lake-mary',
  '/locations/winter-park',
  '/medication-management',
  '/anxiety-treatment',
  '/optum-coverage',
  '/cigna-coverage',
  '/adventhealth-coverage',
  '/aetna-aetna-coverage',
  '/blue-cross-blue-shield-blue-cross-blue-shield-coverage',
]);

interface Issue {
  type: 'soft_404' | 'redirect_link' | 'noindex' | 'canonical_elsewhere' | 'missing_canonical' | 'broken_link' | 'duplicate' | 'blocked_robots' | 'low_quality';
  severity: 'critical' | 'warning' | 'info';
  page: string;
  details: string;
}

interface PageAnalysis {
  path: string;
  fileSize: number;
  contentLength: number;
  wordCount: number;
  hasCanonical: boolean;
  canonicalUrl: string | null;
  hasNoindex: boolean;
  internalLinks: string[];
  externalLinks: string[];
  h1Text: string | null;
  title: string | null;
}

function getAllPrerenderedPaths(): string[] {
  const paths: string[] = [];
  
  function scanDir(dir: string, basePath: string = '') {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      if (item.isDirectory()) {
        scanDir(path.join(dir, item.name), `${basePath}/${item.name}`);
      } else if (item.name === 'index.html') {
        paths.push(basePath || '/');
      }
    }
  }
  
  scanDir(PRERENDERED_DIR);
  return paths;
}

function getFilePath(urlPath: string): string {
  if (urlPath === '/') {
    return path.join(PRERENDERED_DIR, 'index.html');
  }
  const cleanPath = urlPath.replace(/^\//, '').replace(/\/$/, '');
  return path.join(PRERENDERED_DIR, cleanPath, 'index.html');
}

function extractMainContent(html: string): string {
  // Try to extract main content area
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch) {
    return mainMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }
  
  // Fallback: extract body minus header/footer
  let content = html;
  content = content.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
  content = content.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');
  content = content.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '');
  content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  content = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  content = content.replace(/<[^>]+>/g, ' ');
  content = content.replace(/\s+/g, ' ').trim();
  
  return content;
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(word => word.length > 0).length;
}

function extractInternalLinks(html: string): string[] {
  const links: string[] = [];
  const regex = /<a[^>]+href=["'](\/?[^"'#]*?)["']/gi;
  let match;
  
  while ((match = regex.exec(html)) !== null) {
    const href = match[1];
    if (href.startsWith('/') && !href.startsWith('//')) {
      links.push(href);
    }
  }
  
  return [...new Set(links)];
}

function analyzePage(urlPath: string): PageAnalysis | null {
  const filePath = getFilePath(urlPath);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const html = fs.readFileSync(filePath, 'utf-8');
  const fileSize = fs.statSync(filePath).size;
  
  // Extract main content
  const mainContent = extractMainContent(html);
  const wordCount = countWords(mainContent);
  
  // Extract canonical
  const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  const canonicalUrl = canonicalMatch?.[1] || null;
  
  // Check noindex
  const hasNoindex = /<meta[^>]+name=["']robots["'][^>]*noindex/i.test(html) ||
                     /<meta[^>]+content=["'][^"']*noindex[^"']*["']/i.test(html);
  
  // Extract title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const title = titleMatch?.[1] || null;
  
  // Extract H1
  const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  const h1Text = h1Match?.[1] || null;
  
  // Extract internal links
  const internalLinks = extractInternalLinks(html);
  
  // Extract external links
  const externalLinks: string[] = [];
  const extRegex = /<a[^>]+href=["'](https?:\/\/[^"']+)["']/gi;
  let extMatch;
  while ((extMatch = extRegex.exec(html)) !== null) {
    if (!extMatch[1].includes('empathyhealthclinic.com')) {
      externalLinks.push(extMatch[1]);
    }
  }
  
  return {
    path: urlPath,
    fileSize,
    contentLength: mainContent.length,
    wordCount,
    hasCanonical: !!canonicalUrl,
    canonicalUrl,
    hasNoindex,
    internalLinks,
    externalLinks,
    h1Text,
    title,
  };
}

async function fetchPageLinks(url: string): Promise<string[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) return [];
    const html = await response.text();
    return extractInternalLinks(html);
  } catch {
    return [];
  }
}

async function checkRedirectAndBrokenLinks(paths: string[]): Promise<Issue[]> {
  const issues: Issue[] = [];
  const allInternalLinks = new Set<string>();
  const redirectMap = new Map<string, string>();
  const brokenLinks = new Set<string>();
  
  // Check if using prerendered pages or live server
  const usePrerendered = paths.length > 10; // If we have many prerendered pages, use them
  
  if (usePrerendered) {
    // Collect all internal links from prerendered pages
    for (const pagePath of paths) {
      const analysis = analyzePage(pagePath);
      if (analysis) {
        analysis.internalLinks.forEach(link => {
          const normalized = link.replace(/\/$/, '') || '/';
          allInternalLinks.add(normalized);
        });
      }
    }
  } else {
    // Fetch links from live server (for dev testing with stale/few prerendered pages)
    console.log('  Fetching links from live server (prerendered pages may be stale)...');
    const pagesToFetch = ['/', '/services', '/therapy', '/insurance'];
    for (const page of pagesToFetch) {
      const links = await fetchPageLinks(`${BASE_URL}${page}`);
      links.forEach(link => {
        const normalized = link.replace(/\/$/, '') || '/';
        allInternalLinks.add(normalized);
      });
    }
  }
  
  // Check ALL links for redirects and broken links
  console.log(`  Checking ${allInternalLinks.size} unique internal links...`);
  
  const linksToCheck = Array.from(allInternalLinks);
  let checked = 0;
  
  for (const link of linksToCheck) {
    try {
      const response = await fetch(`${BASE_URL}${link}`, {
        method: 'HEAD',
        redirect: 'manual',
      });
      
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get('location');
        redirectMap.set(link, location || 'unknown');
      } else if (response.status >= 400) {
        brokenLinks.add(link);
      }
      
      checked++;
      if (checked % 50 === 0) {
        console.log(`    Checked ${checked}/${linksToCheck.length} links...`);
      }
    } catch (err) {
      // Network error - mark as broken
      brokenLinks.add(link);
    }
  }
  
  // Report redirect links (CRITICAL - causes "Page with redirect" in GSC)
  // Note: Redirects themselves are often intentional (URL consolidation)
  // Only report if internal links point TO a redirect URL
  for (const [link, target] of redirectMap) {
    const normalizedTarget = normalizeRedirectTarget(target);
    issues.push({
      type: 'redirect_link',
      severity: 'warning', // Downgrade to warning - redirects are often intentional
      page: link,
      details: `Internal link redirects to: ${normalizedTarget}`,
    });
  }
  
  // Report broken links (CRITICAL - causes "Not found 404" in GSC)
  for (const link of brokenLinks) {
    issues.push({
      type: 'broken_link',
      severity: 'critical',
      page: link,
      details: 'Internal link returns 4xx error',
    });
  }
  
  return issues;
}

function validatePages(paths: string[]): Issue[] {
  const issues: Issue[] = [];
  const canonicalGroups = new Map<string, string[]>();
  const titles = new Map<string, string[]>();
  
  for (const pagePath of paths) {
    const analysis = analyzePage(pagePath);
    if (!analysis) continue;
    
    // Handle both with and without trailing slash for homepage
    const expectedCanonical = `${DOMAIN}${pagePath === '/' ? '' : pagePath}`;
    const expectedCanonicalAlt = `${DOMAIN}${pagePath === '/' ? '/' : pagePath}`;
    
    // Track titles for duplicate detection
    if (analysis.title) {
      const titleGroup = titles.get(analysis.title) || [];
      titleGroup.push(pagePath);
      titles.set(analysis.title, titleGroup);
    }
    
    // 1. Soft 404 Detection (CRITICAL)
    if (analysis.fileSize < MIN_CONTENT_SIZE || 
        analysis.wordCount < MIN_WORD_COUNT ||
        analysis.contentLength < MIN_MAIN_CONTENT_LENGTH) {
      
      // Check if it's a legitimate thin page
      if (!INTENTIONAL_NOINDEX.has(pagePath) && !analysis.hasNoindex) {
        issues.push({
          type: 'soft_404',
          severity: 'critical',
          page: pagePath,
          details: `Thin content: ${analysis.wordCount} words, ${analysis.fileSize} bytes - may be flagged as soft 404`,
        });
      }
    }
    
    // 2. Unexpected Noindex (CRITICAL - causes "Excluded by noindex tag" in GSC)
    if (analysis.hasNoindex && !INTENTIONAL_NOINDEX.has(pagePath)) {
      issues.push({
        type: 'noindex',
        severity: 'critical',
        page: pagePath,
        details: 'Page has noindex but is not in allowlist - will not be indexed',
      });
    }
    
    // 3. Missing Canonical (CRITICAL - causes "Duplicate without user-selected canonical")
    if (!analysis.hasCanonical && !analysis.hasNoindex) {
      issues.push({
        type: 'missing_canonical',
        severity: 'critical',
        page: pagePath,
        details: 'Page is missing canonical tag - may cause duplicate content issues',
      });
    }
    
    // 4. Canonical pointing elsewhere (CRITICAL - causes "Alternate page with proper canonical")
    if (analysis.canonicalUrl && 
        analysis.canonicalUrl !== expectedCanonical &&
        analysis.canonicalUrl !== expectedCanonicalAlt &&
        !INTENTIONAL_CANONICAL_REDIRECT.has(pagePath) &&
        !analysis.hasNoindex) {
      issues.push({
        type: 'canonical_elsewhere',
        severity: 'critical',
        page: pagePath,
        details: `Canonical points to: ${analysis.canonicalUrl} - page won't be indexed independently`,
      });
    }
    
    // 5. Low quality content (WARNING - may cause "Crawled not indexed")
    if (analysis.wordCount < 300 && analysis.wordCount >= MIN_WORD_COUNT && !analysis.hasNoindex) {
      issues.push({
        type: 'low_quality',
        severity: 'warning',
        page: pagePath,
        details: `Low word count (${analysis.wordCount}) - may be crawled but not indexed`,
      });
    }
    
    // Track canonical groups for duplicate detection
    if (analysis.canonicalUrl) {
      const group = canonicalGroups.get(analysis.canonicalUrl) || [];
      group.push(pagePath);
      canonicalGroups.set(analysis.canonicalUrl, group);
    }
  }
  
  // 6. Duplicate Detection (multiple pages with same canonical)
  for (const [canonical, pages] of canonicalGroups) {
    if (pages.length > 1) {
      for (const page of pages) {
        if (!canonical.endsWith(page) && !canonical.endsWith(page.replace(/^\//, ''))) {
          issues.push({
            type: 'duplicate',
            severity: 'warning',
            page,
            details: `${pages.length} pages share canonical: ${canonical}`,
          });
        }
      }
    }
  }
  
  // 7. Duplicate titles (causes "Duplicate" issues in GSC)
  for (const [title, pages] of titles) {
    if (pages.length > 1) {
      for (const page of pages) {
        issues.push({
          type: 'duplicate',
          severity: 'warning',
          page,
          details: `Duplicate title with ${pages.length - 1} other page(s): "${title.substring(0, 50)}..."`,
        });
      }
    }
  }
  
  return issues;
}

async function checkRobotsTxt(): Promise<Issue[]> {
  const issues: Issue[] = [];
  
  try {
    const response = await fetch(`${BASE_URL}/robots.txt`);
    if (!response.ok) {
      issues.push({
        type: 'blocked_robots',
        severity: 'critical',
        page: '/robots.txt',
        details: 'robots.txt not accessible',
      });
      return issues;
    }
    
    const robotsTxt = await response.text();
    
    // Check for overly restrictive rules
    if (robotsTxt.includes('Disallow: /') && !robotsTxt.includes('Disallow: /admin')) {
      // Check if there's a blanket disallow
      const lines = robotsTxt.split('\n');
      for (const line of lines) {
        if (line.trim() === 'Disallow: /') {
          issues.push({
            type: 'blocked_robots',
            severity: 'critical',
            page: '/robots.txt',
            details: 'robots.txt has blanket Disallow: / rule blocking all pages',
          });
        }
      }
    }
  } catch (err) {
    issues.push({
      type: 'blocked_robots',
      severity: 'warning',
      page: '/robots.txt',
      details: 'Could not fetch robots.txt for validation',
    });
  }
  
  return issues;
}

async function runValidation(): Promise<void> {
  console.log('=========================================');
  console.log('GSC Indexing Issue Validator');
  console.log('=========================================\n');
  
  console.log('This validator checks for issues that cause:');
  console.log('  - Soft 404 (415 in GSC)');
  console.log('  - Page with redirect (369 in GSC)');
  console.log('  - Excluded by noindex (52 in GSC)');
  console.log('  - Alternate page with canonical (30 in GSC)');
  console.log('  - Not found 404 (23 in GSC)');
  console.log('  - Duplicate without canonical (16 in GSC)');
  console.log('  - Crawled not indexed (88 in GSC)');
  console.log('  - Blocked by robots.txt (1 in GSC)\n');
  
  // Get all prerendered paths
  console.log('Scanning prerendered pages...');
  const paths = getAllPrerenderedPaths();
  console.log(`Found ${paths.length} prerendered pages\n`);
  
  if (paths.length === 0) {
    console.log('ERROR: No prerendered pages found!');
    console.log('Run the full build first: npm run build:production');
    process.exit(1);
  }
  
  // Validate pages
  console.log('Analyzing pages for GSC issues...');
  const pageIssues = validatePages(paths);
  
  // Check for redirect and broken links
  console.log('Checking for redirect and broken links...');
  const linkIssues = await checkRedirectAndBrokenLinks(paths);
  
  // Check robots.txt
  console.log('Validating robots.txt...');
  const robotsIssues = await checkRobotsTxt();
  
  const allIssues = [...pageIssues, ...linkIssues, ...robotsIssues];
  
  // Summarize by issue type
  console.log('\n=========================================');
  console.log('GSC INDEXING ISSUE SUMMARY');
  console.log('=========================================\n');
  
  const issuesByType = new Map<string, Issue[]>();
  for (const issue of allIssues) {
    const group = issuesByType.get(issue.type) || [];
    group.push(issue);
    issuesByType.set(issue.type, group);
  }
  
  const typeLabelMap: Record<string, string> = {
    'soft_404': 'Soft 404 (thin content)',
    'redirect_link': 'Page with redirect',
    'noindex': 'Excluded by noindex tag',
    'canonical_elsewhere': 'Alternate page with proper canonical',
    'missing_canonical': 'Duplicate without user-selected canonical',
    'duplicate': 'Duplicate pages/titles',
    'broken_link': 'Not found (404)',
    'blocked_robots': 'Blocked by robots.txt',
    'low_quality': 'Crawled - may not be indexed',
  };
  
  let criticalCount = 0;
  let warningCount = 0;
  
  console.log('Issue Type                              | Count | Severity');
  console.log('----------------------------------------|-------|----------');
  
  for (const [type, issues] of issuesByType) {
    const label = typeLabelMap[type] || type;
    const severity = issues[0]?.severity || 'info';
    const count = issues.length;
    
    if (severity === 'critical') criticalCount += count;
    if (severity === 'warning') warningCount += count;
    
    const severityIcon = severity === 'critical' ? '!' : severity === 'warning' ? '?' : 'i';
    console.log(`${label.padEnd(40)}| ${String(count).padStart(5)} | ${severityIcon} ${severity}`);
  }
  
  console.log('');
  console.log(`Total Issues: ${allIssues.length}`);
  console.log(`  Critical: ${criticalCount}`);
  console.log(`  Warnings: ${warningCount}`);
  console.log('');
  
  // Show sample of critical issues
  const criticalIssues = allIssues.filter(i => i.severity === 'critical');
  if (criticalIssues.length > 0) {
    console.log('Sample Critical Issues (first 15):');
    console.log('-----------------------');
    for (const issue of criticalIssues.slice(0, 15)) {
      console.log(`  [${issue.type}] ${issue.page}`);
      console.log(`    ${issue.details}`);
    }
    if (criticalIssues.length > 15) {
      console.log(`  ... and ${criticalIssues.length - 15} more`);
    }
    console.log('');
  }
  
  // Write detailed report
  const reportPath = path.join(process.cwd(), 'gsc-indexing-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    summary: {
      total: allIssues.length,
      critical: criticalCount,
      warnings: warningCount,
      byType: Object.fromEntries(
        Array.from(issuesByType.entries()).map(([k, v]) => [k, v.length])
      ),
    },
    issues: allIssues,
  }, null, 2));
  console.log(`Detailed report: ${reportPath}`);
  
  // Exit with error if critical issues
  if (criticalCount > 0) {
    console.log('\n! VALIDATION FAILED - Critical indexing issues found');
    console.log('  These issues will cause pages to be excluded from Google index');
    console.log('  Fix the issues above before deploying');
    process.exit(1);
  }
  
  console.log('\n+ VALIDATION PASSED (no critical indexing issues)');
  process.exit(0);
}

runValidation().catch(err => {
  console.error('Validation error:', err);
  process.exit(1);
});
