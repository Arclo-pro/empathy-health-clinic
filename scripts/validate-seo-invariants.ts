/**
 * SEO Invariants Validator
 * 
 * Validates all prerendered HTML files for SEO compliance:
 * 1. Canonical - Must be self-referencing for indexable pages
 * 2. H1 - Exactly one H1 per indexable page
 * 3. Title - Unique and within character limits
 * 4. Body outlinks - Must have internal links in main content
 * 5. Noindex - Only on explicitly allowed pages
 * 6. Hreflang - Bidirectional return links if used
 * 
 * Usage: npx tsx scripts/validate-seo-invariants.ts
 */

import fs from 'fs';
import path from 'path';

const PRERENDERED_DIR = path.join(process.cwd(), 'dist', 'prerendered');
const DOMAIN = 'https://empathyhealthclinic.com';

// Pages that SHOULD be noindex (allowlist)
const NOINDEX_ALLOWLIST = [
  '/admin', '/login', '/auth', '/config', '/debug',
  '/privacy-policy', '/privacy', '/terms', '/medical-disclaimer',
  '/thank-you', '/appointment-confirmed', '/success', '/confirmation',
  '/404', '/not-found', '/examples', '/test', '/demo',
  // Intentionally consolidated pages (redirect via CANONICAL_CONSOLIDATION_PATHS)
  '/psychiatry-orlando', '/psychiatry-clinic-orlando',
  '/locations/winter-park', // Consolidated to /psychiatrist-winter-park
];

// Minimum internal links in body content
const MIN_BODY_OUTLINKS = 3;

// Maximum title length
const MAX_TITLE_LENGTH = 70;

interface PageValidation {
  path: string;
  issues: string[];
  canonical?: string;
  title?: string;
  h1Count: number;
  bodyLinkCount: number;
  hasNoindex: boolean;
  hreflangAlternates: string[];
}

interface ValidationSummary {
  total: number;
  passed: number;
  failed: number;
  issues: {
    canonical: string[];
    h1: string[];
    title: string[];
    outlinks: string[];
    noindex: string[];
    hreflang: string[];
  };
}

function getFilePath(urlPath: string): string {
  if (urlPath === '/') {
    return path.join(PRERENDERED_DIR, 'index.html');
  }
  const cleanPath = urlPath.replace(/^\//, '').replace(/\/$/, '');
  return path.join(PRERENDERED_DIR, cleanPath, 'index.html');
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

function validatePage(urlPath: string): PageValidation {
  const filePath = getFilePath(urlPath);
  const issues: string[] = [];
  
  if (!fs.existsSync(filePath)) {
    return {
      path: urlPath,
      issues: ['File not found'],
      h1Count: 0,
      bodyLinkCount: 0,
      hasNoindex: false,
      hreflangAlternates: [],
    };
  }
  
  const html = fs.readFileSync(filePath, 'utf-8');
  
  // Extract canonical
  const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  const canonical = canonicalMatch?.[1];
  
  // Extract title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const title = titleMatch?.[1];
  
  // Count H1 tags
  const h1Matches = html.match(/<h1[^>]*>/gi) || [];
  const h1Count = h1Matches.length;
  
  // Count internal links in body (not header/footer)
  // Look for links in main content area, fallback to full HTML minus header/footer
  let mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  let mainContent = mainMatch?.[1] || '';
  
  // Fallback: if no <main> tag, use content between header and footer
  if (!mainContent) {
    // Remove header section
    let content = html.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
    // Remove footer section
    content = content.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');
    // Remove nav section
    content = content.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '');
    // Remove head section
    content = content.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');
    mainContent = content;
  }
  
  const bodyLinks = mainContent.match(/<a[^>]+href=["']\/[^"']*["']/gi) || [];
  const bodyLinkCount = bodyLinks.length;
  
  // Check for noindex
  const hasNoindex = /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html) ||
                     /<meta[^>]+content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots["']/i.test(html);
  
  // Extract hreflang alternates
  const hreflangMatches = html.matchAll(/<link[^>]+rel=["']alternate["'][^>]+hreflang=["'][^"']+["'][^>]+href=["']([^"']+)["']/gi);
  const hreflangAlternates = [...hreflangMatches].map(m => m[1]);
  
  // Validation checks
  const isNoindexAllowed = NOINDEX_ALLOWLIST.some(p => urlPath.startsWith(p));
  const isConsolidatedPage = NOINDEX_ALLOWLIST.includes(urlPath);
  
  // 1. Canonical check - must be self-referencing (skip for consolidated pages)
  if (canonical && !isConsolidatedPage) {
    const expectedCanonical = `${DOMAIN}${urlPath === '/' ? '' : urlPath}`;
    const normalizedCanonical = canonical.replace(/\/$/, '');
    const normalizedExpected = expectedCanonical.replace(/\/$/, '');
    
    if (normalizedCanonical !== normalizedExpected && !hasNoindex) {
      issues.push(`Canonical mismatch: ${canonical} (expected ${expectedCanonical})`);
    }
  } else if (!hasNoindex && !isConsolidatedPage) {
    issues.push('Missing canonical tag');
  }
  
  // 2. H1 check - exactly one
  if (h1Count === 0 && !hasNoindex) {
    issues.push('Missing H1 tag');
  } else if (h1Count > 1) {
    issues.push(`Multiple H1 tags (${h1Count})`);
  }
  
  // 3. Title check
  if (!title) {
    issues.push('Missing title tag');
  } else if (title.length > MAX_TITLE_LENGTH) {
    issues.push(`Title too long (${title.length} chars)`);
  }
  
  // 4. Body outlinks check
  if (bodyLinkCount < MIN_BODY_OUTLINKS && !hasNoindex) {
    issues.push(`Low body outlinks (${bodyLinkCount}, need ${MIN_BODY_OUTLINKS}+)`);
  }
  
  // 5. Noindex check - only allowed on specific pages
  if (hasNoindex && !isNoindexAllowed) {
    issues.push('Unexpected noindex directive');
  }
  
  return {
    path: urlPath,
    issues,
    canonical,
    title,
    h1Count,
    bodyLinkCount,
    hasNoindex,
    hreflangAlternates,
  };
}

function validateHreflangReciprocity(validations: PageValidation[]): string[] {
  const issues: string[] = [];
  const pageAlternates = new Map<string, string[]>();
  const pageCanonicals = new Map<string, string>();
  
  // Build maps of page -> alternates and page -> canonical
  for (const v of validations) {
    if (v.hreflangAlternates.length > 0) {
      pageAlternates.set(v.path, v.hreflangAlternates);
    }
    if (v.canonical) {
      pageCanonicals.set(v.path, v.canonical);
    }
  }
  
  // Check reciprocity - only for self-canonical pages
  for (const [pagePath, alternates] of pageAlternates) {
    // Skip pages that have canonical pointing to a different URL (consolidated pages)
    const canonical = pageCanonicals.get(pagePath);
    if (canonical) {
      const canonicalPath = canonical.replace(DOMAIN, '').replace(/\/$/, '') || '/';
      if (canonicalPath !== pagePath) {
        // This page canonicalizes elsewhere, skip hreflang reciprocity check
        continue;
      }
    }
    
    for (const alt of alternates) {
      const altPath = alt.replace(DOMAIN, '').replace(/\/$/, '') || '/';
      
      // Skip if hreflang points to same page (self-referencing is OK)
      if (altPath === pagePath) continue;
      
      const altAlternates = pageAlternates.get(altPath);
      
      if (!altAlternates) {
        issues.push(`${pagePath}: hreflang alternate ${altPath} has no return links`);
      } else {
        const pageUrl = `${DOMAIN}${pagePath === '/' ? '' : pagePath}`;
        const hasReturn = altAlternates.some(a => 
          a.replace(/\/$/, '') === pageUrl.replace(/\/$/, '')
        );
        if (!hasReturn) {
          issues.push(`${pagePath}: hreflang alternate ${altPath} missing return link`);
        }
      }
    }
  }
  
  return issues;
}

function checkTitleUniqueness(validations: PageValidation[]): string[] {
  const issues: string[] = [];
  const titleMap = new Map<string, string[]>();
  
  for (const v of validations) {
    if (v.title && !v.hasNoindex) {
      const normalizedTitle = v.title.toLowerCase().trim();
      const existing = titleMap.get(normalizedTitle) || [];
      existing.push(v.path);
      titleMap.set(normalizedTitle, existing);
    }
  }
  
  for (const [title, paths] of titleMap) {
    if (paths.length > 1) {
      issues.push(`Duplicate title "${title.slice(0, 50)}..." on: ${paths.slice(0, 3).join(', ')}${paths.length > 3 ? ` (+${paths.length - 3} more)` : ''}`);
    }
  }
  
  return issues;
}

async function main() {
  console.log('\n🔍 SEO Invariants Validator\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  if (!fs.existsSync(PRERENDERED_DIR)) {
    console.log('❌ Prerendered directory not found');
    console.log('   Run: npx tsx scripts/prerender-puppeteer.ts');
    process.exit(1);
  }
  
  const paths = getAllPrerenderedPaths();
  console.log(`📋 Validating ${paths.length} pages\n`);
  
  const validations: PageValidation[] = [];
  const summary: ValidationSummary = {
    total: paths.length,
    passed: 0,
    failed: 0,
    issues: {
      canonical: [],
      h1: [],
      title: [],
      outlinks: [],
      noindex: [],
      hreflang: [],
    },
  };
  
  // Validate each page
  for (const urlPath of paths) {
    const validation = validatePage(urlPath);
    validations.push(validation);
    
    if (validation.issues.length === 0) {
      summary.passed++;
    } else {
      summary.failed++;
      
      // Categorize issues
      for (const issue of validation.issues) {
        if (issue.includes('Canonical') || issue.includes('canonical')) {
          summary.issues.canonical.push(`${urlPath}: ${issue}`);
        } else if (issue.includes('H1')) {
          summary.issues.h1.push(`${urlPath}: ${issue}`);
        } else if (issue.includes('Title') || issue.includes('title')) {
          summary.issues.title.push(`${urlPath}: ${issue}`);
        } else if (issue.includes('outlinks')) {
          summary.issues.outlinks.push(`${urlPath}: ${issue}`);
        } else if (issue.includes('noindex')) {
          summary.issues.noindex.push(`${urlPath}: ${issue}`);
        }
      }
    }
  }
  
  // Check hreflang reciprocity
  const hreflangIssues = validateHreflangReciprocity(validations);
  summary.issues.hreflang = hreflangIssues;
  
  // Check title uniqueness
  const titleDuplicates = checkTitleUniqueness(validations);
  summary.issues.title.push(...titleDuplicates);
  
  // Print summary
  console.log('📊 VALIDATION SUMMARY\n');
  
  const categories = [
    { name: 'Canonical Issues', issues: summary.issues.canonical },
    { name: 'H1 Issues', issues: summary.issues.h1 },
    { name: 'Title Issues', issues: summary.issues.title },
    { name: 'Body Outlinks', issues: summary.issues.outlinks },
    { name: 'Noindex Issues', issues: summary.issues.noindex },
    { name: 'Hreflang Issues', issues: summary.issues.hreflang },
  ];
  
  let hasHighPriorityIssues = false;
  
  for (const cat of categories) {
    const icon = cat.issues.length === 0 ? '✅' : '❌';
    console.log(`${icon} ${cat.name}: ${cat.issues.length}`);
    
    if (cat.issues.length > 0) {
      hasHighPriorityIssues = true;
      // Show first 5 issues
      cat.issues.slice(0, 5).forEach(issue => {
        console.log(`   - ${issue}`);
      });
      if (cat.issues.length > 5) {
        console.log(`   ... and ${cat.issues.length - 5} more`);
      }
    }
  }
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📈 Total: ${summary.total} pages`);
  console.log(`✅ Passed: ${summary.passed}`);
  console.log(`❌ Failed: ${summary.failed}`);
  
  if (hasHighPriorityIssues) {
    console.log('\n⚠️  SEO issues detected - fix before publishing\n');
    // Don't exit with error yet - just warn
    // process.exit(1);
  } else {
    console.log('\n✅ All SEO invariants passed\n');
  }
  
  // Write detailed report
  const reportPath = path.join(process.cwd(), 'seo-validation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    summary: {
      total: summary.total,
      passed: summary.passed,
      failed: summary.failed,
    },
    issues: summary.issues,
  }, null, 2));
  console.log(`📄 Detailed report: ${reportPath}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
