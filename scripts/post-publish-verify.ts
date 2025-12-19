/**
 * Post-Publish Crawler Verification
 * 
 * Run this after publishing to verify crawlability is working correctly.
 * Fetches the live site and checks for:
 * 1. Homepage has sufficient links (>50)
 * 2. Critical routes return 200 with sufficient content
 * 3. No blocking robots directives
 * 
 * Usage: SITE_URL=https://empathyhealthclinic.com npx tsx scripts/post-publish-verify.ts
 */

const SITE_URL = process.env.SITE_URL || 'https://empathyhealthclinic.com';

interface RouteCheck {
  path: string;
  minLinks: number;
  minContentLength: number;
}

const CRITICAL_ROUTES: RouteCheck[] = [
  { path: '/', minLinks: 50, minContentLength: 100000 },
  { path: '/psychiatrist-orlando', minLinks: 40, minContentLength: 100000 },
  { path: '/blog', minLinks: 30, minContentLength: 100000 },
  { path: '/services', minLinks: 40, minContentLength: 100000 },
  { path: '/request-appointment', minLinks: 20, minContentLength: 50000 },
];

async function fetchHtml(url: string): Promise<{ status: number; html: string; error?: string }> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'PostPublishVerifier/1.0',
        'Accept': 'text/html',
      },
      redirect: 'follow',
    });
    const html = await response.text();
    return { status: response.status, html };
  } catch (error: any) {
    return { status: 0, html: '', error: error.message };
  }
}

function countLinks(html: string): number {
  return (html.match(/<a [^>]*href=/gi) || []).length;
}

function hasNoindexDirective(html: string): boolean {
  return /<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
}

async function checkRobotsTxt(): Promise<{ ok: boolean; error?: string }> {
  const { status, html, error } = await fetchHtml(`${SITE_URL}/robots.txt`);
  if (error) return { ok: false, error };
  if (status !== 200) return { ok: false, error: `Status ${status}` };
  if (html.includes('Disallow: /') && !html.includes('Disallow: /api')) {
    return { ok: false, error: 'robots.txt has blanket Disallow: /' };
  }
  return { ok: true };
}

async function verifyRoute(route: RouteCheck): Promise<{ passed: boolean; errors: string[] }> {
  const errors: string[] = [];
  const { status, html, error } = await fetchHtml(`${SITE_URL}${route.path}`);
  
  if (error) {
    errors.push(`Fetch error: ${error}`);
    return { passed: false, errors };
  }
  
  if (status !== 200) {
    errors.push(`Status: ${status} (expected 200)`);
  }
  
  const linkCount = countLinks(html);
  if (linkCount < route.minLinks) {
    errors.push(`Links: ${linkCount} (need ${route.minLinks}+)`);
  }
  
  if (html.length < route.minContentLength) {
    errors.push(`Content: ${Math.round(html.length / 1024)}KB (need ${Math.round(route.minContentLength / 1024)}KB+)`);
  }
  
  if (hasNoindexDirective(html)) {
    errors.push('Has noindex directive');
  }
  
  return { passed: errors.length === 0, errors };
}

async function main() {
  console.log('\n🔍 Post-Publish Crawler Verification\n');
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📍 Site: ${SITE_URL}`);
  console.log(`📋 Routes: ${CRITICAL_ROUTES.length}`);
  console.log();
  
  let allPassed = true;
  const results: { path: string; passed: boolean; errors: string[] }[] = [];
  
  // Check robots.txt first
  const robotsCheck = await checkRobotsTxt();
  if (!robotsCheck.ok) {
    console.log(`  robots.txt... ❌ ${robotsCheck.error}`);
    allPassed = false;
  } else {
    console.log(`  robots.txt... ✅`);
  }
  
  // Check each route
  for (const route of CRITICAL_ROUTES) {
    const result = await verifyRoute(route);
    results.push({ path: route.path, ...result });
    
    if (result.passed) {
      console.log(`  ${route.path}... ✅`);
    } else {
      console.log(`  ${route.path}... ❌`);
      result.errors.forEach(err => console.log(`    - ${err}`));
      allPassed = false;
    }
  }
  
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  
  if (allPassed) {
    console.log('✅ ALL CHECKS PASSED - Site is crawler-ready\n');
    process.exit(0);
  } else {
    console.log('❌ SOME CHECKS FAILED - Crawlers may have issues\n');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
