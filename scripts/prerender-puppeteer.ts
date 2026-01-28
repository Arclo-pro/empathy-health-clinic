/**
 * Puppeteer-based Prerender Script
 * 
 * This script uses a headless browser to render each page with full JavaScript execution,
 * then captures the HTML for serving to search engine crawlers.
 * 
 * Now reads routes from routes/allRoutes.json manifest instead of hardcoded list.
 * Outputs files in /foo/index.html format for cleaner URL handling.
 * 
 * Usage: npx tsx scripts/prerender-puppeteer.ts
 */

import puppeteer, { Browser, Page } from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getCanonicalUrl, getRobotsContent, isNoindexPath } from '../shared/seoConfig';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Configuration
const BASE_URL = process.env.PRERENDER_URL || 'http://localhost:5000';
const OUTPUT_DIR = path.resolve(rootDir, 'dist/prerendered');
const MANIFEST_PATH = path.resolve(rootDir, 'routes/allRoutes.json');
const CONCURRENCY = parseInt(process.env.PRERENDER_CONCURRENCY || '10', 10); // 10 concurrent pages for fast builds
const TIMEOUT = 15000; // 15 seconds per page (faster timeout for priority mode)
const USE_PRIORITY_MODE = process.argv.includes('--priority');

console.log(`🔧 Prerender config: CONCURRENCY=${CONCURRENCY}, TIMEOUT=${TIMEOUT}ms, PRIORITY_MODE=${USE_PRIORITY_MODE}`);

interface RouteManifest {
  totalRoutes: number;
  staticRoutes: number;
  blogRoutes: number;
  generatedAt: string;
  routes: string[];
}

interface PrerenderResult {
  route: string;
  success: boolean;
  error?: string;
  htmlSize?: number;
  filePath?: string;
}

// Priority routes for fast deployment - high-value SEO pages (~50 critical pages)
// These are the MOST IMPORTANT pages for Google ranking and traffic
// Non-priority pages still work via React client-side rendering
const PRIORITY_ROUTES: string[] = [
  // Homepage & core navigation
  '/',
  '/about',
  '/contact',
  '/team',
  '/services',
  '/blog',
  '/faq',
  '/book-appointment',
  '/telehealth',
  '/insurance',
  '/conditions',
  
  // High-intent Orlando psychiatry keywords (main traffic drivers)
  '/psychiatrist-orlando',
  '/psychiatry-orlando',
  '/psychiatrist-near-me',
  '/best-psychiatrist-orlando',
  '/orlando-psychiatrist',
  
  // Condition-specific landing pages (high search volume)
  '/anxiety-psychiatrist-orlando',
  '/depression-psychiatrist-orlando',
  '/adhd-psychiatrist-orlando',
  '/bipolar-psychiatrist-orlando',
  '/ptsd-psychiatrist-orlando',
  '/ocd-psychiatrist-orlando',
  '/trauma-psychiatrist-orlando',
  '/schizophrenia-psychiatrist-orlando',
  
  // Treatment/service pages
  '/medication-management',
  '/psychiatric-evaluation',
  '/therapy-services',
  '/emdr-therapy',
  '/tms-treatment',
  '/anxiety-treatment',
  '/anxiety-therapy',
  '/adhd-testing-orlando',
  '/adult-adhd-treatment-orlando',
  
  // Location-based pages
  '/winter-park-psychiatrist',
  '/lake-mary-psychiatrist',
  '/altamonte-springs-psychiatrist',
  '/maitland-psychiatrist',
  
  // Legal/trust pages
  '/privacy-policy',
  '/terms-of-service',
  '/affordable-care',
];

function loadRouteManifest(): string[] {
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error('❌ Route manifest not found:', MANIFEST_PATH);
    console.error('   Run: npx tsx scripts/getStaticRoutes.ts && npx tsx scripts/getBlogRoutes.ts && npx tsx scripts/buildRouteManifest.ts');
    process.exit(1);
  }
  
  const manifest: RouteManifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
  console.log(`📋 Loaded manifest: ${manifest.totalRoutes} routes (${manifest.staticRoutes} static, ${manifest.blogRoutes} blog)`);
  
  // In priority mode, only return priority routes that exist in the manifest
  if (USE_PRIORITY_MODE) {
    const manifestRoutes = new Set(manifest.routes);
    const priorityRoutes = PRIORITY_ROUTES.filter(route => manifestRoutes.has(route));
    console.log(`⚡ Priority mode: ${priorityRoutes.length} priority routes (skipping ${manifest.totalRoutes - priorityRoutes.length} lower-priority routes)`);
    return priorityRoutes;
  }
  
  return manifest.routes;
}

/**
 * Convert route to file path in /foo/index.html format
 * "/" -> prerendered/index.html
 * "/foo" -> prerendered/foo/index.html
 * "/foo/bar" -> prerendered/foo/bar/index.html
 */
function routeToFilePath(route: string): string {
  if (route === '/' || route === '') {
    return path.join(OUTPUT_DIR, 'index.html');
  }
  
  // Remove leading slash, create directory structure
  const cleanPath = route.replace(/^\//, '');
  return path.join(OUTPUT_DIR, cleanPath, 'index.html');
}

async function waitForPageReady(page: Page): Promise<void> {
  // Fast wait for React to mount - optimized for build speed
  try {
    await page.waitForFunction(() => {
      const root = document.getElementById('root');
      if (!root) return false;
      // Check for basic content structure
      const hasContent = root.querySelectorAll('a[href]').length > 2 && (root.textContent || '').length > 100;
      return hasContent;
    }, { timeout: 8000 }); // 8 second timeout - reduced from 30s
  } catch {
    // Content check failed but continue - fixSeoTags will correct meta
  }
  
  // Brief network idle check - reduced from 10s to 3s
  await page.waitForNetworkIdle({ idleTime: 500, timeout: 3000 }).catch(() => {});
  
  // Minimal wait for React effects - reduced from 500ms to 200ms
  await new Promise(resolve => setTimeout(resolve, 200));
}

/**
 * Fix SEO meta tags in the HTML using the shared SEO configuration
 * This ensures correct canonical URLs and robots directives even when React doesn't hydrate
 * 
 * Logic:
 * - Uses shared/seoConfig.ts for canonical consolidation and noindex rules
 * - Replaces placeholder canonical with correct URL (self, consolidated target, or removes for noindex)
 * - Adds canonical tag if missing (critical for SEO)
 * - Sets correct robots meta content based on page type
 */
function fixSeoTags(html: string, route: string): string {
  const canonicalUrl = getCanonicalUrl(route);
  const robotsContent = getRobotsContent(route);
  
  let result = html;
  
  // Fix robots meta tag - add if missing
  if (result.includes('<meta name="robots"')) {
    result = result.replace(
      /<meta name="robots" content="[^"]*">/g,
      `<meta name="robots" content="${robotsContent}">`
    );
  } else if (result.includes('</head>')) {
    // Add robots meta if missing
    result = result.replace('</head>', `  <meta name="robots" content="${robotsContent}">\n  </head>`);
  }
  
  // Fix canonical tag based on page type
  // NOTE: Regex must handle both `>` and ` />` self-closing tag formats
  if (canonicalUrl === null) {
    // Noindex pages should NOT have canonical - remove it
    result = result.replace(/<link rel="canonical" href="[^"]*"\s*\/?>\s*/g, '');
  } else {
    // Check if canonical tag exists
    if (result.includes('<link rel="canonical"')) {
      // Replace existing canonical with correct URL
      // Handle both <link ... > and <link ... /> formats
      result = result.replace(
        /<link rel="canonical" href="[^"]*"\s*\/?>/g,
        `<link rel="canonical" href="${canonicalUrl}">`
      );
    } else if (result.includes('</head>')) {
      // Add canonical tag if missing (critical fix)
      result = result.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}">\n  </head>`);
    }
  }
  
  return result;
}

/**
 * Get production script/CSS tags from the built index.html
 * Returns { scripts: string, styles: string } to inject into prerendered HTML
 * 
 * IMPORTANT: Throws an error if production build is not found or assets are missing.
 * This ensures prerendered HTML always has production assets.
 */
function getProductionAssets(): { scripts: string; styles: string } {
  const prodIndexPath = path.resolve(rootDir, 'dist/public/index.html');
  
  if (!fs.existsSync(prodIndexPath)) {
    throw new Error(
      'Production build not found. Run "npm run build" before prerendering.\n' +
      'This ensures prerendered HTML includes production CSS and JS assets.'
    );
  }
  
  const prodHtml = fs.readFileSync(prodIndexPath, 'utf-8');
  
  // Extract production script tag(s) - looking for /assets/*.js
  const scriptMatches = prodHtml.match(/<script[^>]*src="\/assets\/[^"]*\.js"[^>]*><\/script>/g);
  const scripts = scriptMatches ? scriptMatches.join('\n    ') : '';
  
  // Extract production CSS link(s) - looking for /assets/*.css
  const styleMatches = prodHtml.match(/<link[^>]*href="\/assets\/[^"]*\.css"[^>]*>/g);
  const styles = styleMatches ? styleMatches.join('\n    ') : '';
  
  // Fail fast if assets are missing
  if (!scripts || !styles) {
    throw new Error(
      'Production assets not found in dist/public/index.html.\n' +
      `Scripts: ${scripts ? 'found' : 'MISSING'}\n` +
      `Styles: ${styles ? 'found' : 'MISSING'}\n` +
      'Rebuild with "npm run build" and try again.'
    );
  }
  
  return { scripts, styles };
}

// Cache production assets to avoid reading file multiple times
let cachedProductionAssets: { scripts: string; styles: string } | null = null;

function cleanHtml(html: string, route: string): string {
  // Get production assets (cached after first call)
  if (!cachedProductionAssets) {
    cachedProductionAssets = getProductionAssets();
  }
  const { scripts: prodScripts, styles: prodStyles } = cachedProductionAssets;
  
  let cleaned = html
    // Remove Vite HMR client script
    .replace(/<script type="module" src="\/@vite\/client"><\/script>/g, '')
    // Remove React refresh script
    .replace(/<script type="module">import \{ injectIntoGlobalHook \}[\s\S]*?<\/script>/g, '')
    // Remove Vite runtime error plugin script
    .replace(/<script type="module">\s*import \{ createHotContext \}[\s\S]*?<\/script>/g, '')
    // Remove any remaining /@vite/ or /@react-refresh references
    .replace(/<script[^>]*src="\/(@vite|@react-refresh)[^"]*"[^>]*><\/script>/g, '')
    // Remove development main.tsx script reference
    .replace(/<script[^>]*src="\/src\/main\.tsx[^"]*"[^>]*><\/script>/g, '')
    // Remove development modulepreload for main.tsx
    .replace(/<link[^>]*rel="modulepreload"[^>]*href="\/src\/[^"]*"[^>]*>/g, '')
    // Remove Cloudflare challenge iframe
    .replace(/<script>\(function\(\)\{function c\(\)[\s\S]*?<\/script>/g, '')
    // Remove inline script for tracking params
    .replace(/<script>\s*\(function\(\)\s*\{\s*const qs[\s\S]*?<\/script>/g, '')
    // Remove dev metadata attributes
    .replace(/ data-component-name="[^"]*"/g, '')
    // Add marker comment for debugging
    .replace('</head>', '<!-- Prerendered by Puppeteer -->\n</head>');
  
  // Inject production scripts before </body> if we have them and they're not already present
  if (prodScripts && !cleaned.includes(prodScripts)) {
    cleaned = cleaned.replace('</body>', `    ${prodScripts}\n  </body>`);
  }
  
  // Inject production styles in <head> if we have them and they're not already present
  if (prodStyles && !cleaned.includes(prodStyles)) {
    cleaned = cleaned.replace('</head>', `    ${prodStyles}\n  </head>`);
  }
  
  // Fix SEO meta tags (canonical, robots) using shared configuration
  cleaned = fixSeoTags(cleaned, route);
  
  return cleaned;
}

async function prerenderPage(browser: Browser, route: string): Promise<PrerenderResult> {
  const page = await browser.newPage();
  
  try {
    await page.setViewport({ width: 1280, height: 800 });
    
    // Block analytics/tracking for faster rendering
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const url = request.url();
      if (url.includes('googletagmanager') || 
          url.includes('google-analytics') ||
          url.includes('facebook.net') || 
          url.includes('clarity.ms') ||
          url.includes('doubleclick') ||
          url.includes('googleads') ||
          url.includes('ahrefs')) {
        request.abort();
      } else {
        request.continue();
      }
    });
    
    const url = `${BASE_URL}${route}`;
    console.log(`  📄 Rendering: ${route}`);
    
    // Set bypass header to get fresh React rendering instead of prerendered HTML
    await page.setExtraHTTPHeaders({
      'X-Prerender-Bypass': 'true'
    });
    
    await page.goto(url, { 
      waitUntil: 'domcontentloaded',
      timeout: TIMEOUT 
    });
    
    await waitForPageReady(page);
    
    // Get and clean the HTML
    let html = await page.content();
    html = cleanHtml(html, route);
    
    // Determine output file path using new format
    const filePath = routeToFilePath(route);
    
    // Ensure output directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Write the pre-rendered HTML
    fs.writeFileSync(filePath, html, 'utf-8');
    
    return {
      route,
      success: true,
      htmlSize: html.length,
      filePath: filePath.replace(OUTPUT_DIR, '')
    };
    
  } catch (error: any) {
    return {
      route,
      success: false,
      error: error.message
    };
  } finally {
    try {
      await page.close();
    } catch (closeError: any) {
      // Ignore page close errors - browser may have already disconnected
      console.log(`  ⚠️ Page close warning for ${route}: ${closeError.message}`);
    }
  }
}

const BROWSER_RESTART_INTERVAL = 30; // Restart browser every 30 pages for stability (increased for speed)
const MAX_RETRIES = 2; // Retry failed pages up to 2 times

async function prerenderPageWithRetry(browser: Browser, route: string): Promise<PrerenderResult> {
  let lastError: string = '';
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const result = await prerenderPage(browser, route);
    if (result.success) {
      return result;
    }
    lastError = result.error || 'Unknown error';
    if (attempt < MAX_RETRIES) {
      console.log(`  🔄 Retry ${attempt + 1}/${MAX_RETRIES} for ${route}`);
      await new Promise(resolve => setTimeout(resolve, 500)); // Brief pause before retry
    }
  }
  return { route, success: false, error: `Failed after ${MAX_RETRIES} retries: ${lastError}` };
}

async function prerenderBatch(browser: Browser, routes: string[]): Promise<PrerenderResult[]> {
  const results: PrerenderResult[] = [];
  
  for (let i = 0; i < routes.length; i += CONCURRENCY) {
    const batch = routes.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(
      batch.map(route => prerenderPageWithRetry(browser, route))
    );
    results.push(...batchResults);
    
    const progress = Math.min(i + CONCURRENCY, routes.length);
    const successCount = batchResults.filter(r => r.success).length;
    console.log(`  Progress: ${progress}/${routes.length} pages (${successCount}/${batch.length} succeeded)`);
  }
  
  return results;
}

async function launchBrowser(): Promise<Browser> {
  return puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-extensions',
      '--disable-background-networking',
      '--disable-sync',
      '--no-first-run',
      '--single-process',
      '--disable-accelerated-2d-canvas',
    ]
  });
}

async function prerenderWithBrowserRestart(routes: string[]): Promise<PrerenderResult[]> {
  const results: PrerenderResult[] = [];
  const chunks = [];
  
  // Split routes into chunks for browser restart
  for (let i = 0; i < routes.length; i += BROWSER_RESTART_INTERVAL) {
    chunks.push(routes.slice(i, i + BROWSER_RESTART_INTERVAL));
  }
  
  console.log(`📦 Processing ${routes.length} routes in ${chunks.length} chunks\n`);
  
  for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
    const chunk = chunks[chunkIndex];
    console.log(`\n🌐 Chunk ${chunkIndex + 1}/${chunks.length} (${chunk.length} pages)...`);
    
    const browser = await launchBrowser();
    try {
      const chunkResults = await prerenderBatch(browser, chunk);
      results.push(...chunkResults);
    } finally {
      try {
        await browser.close();
      } catch (e) {
        console.log('  ⚠️ Browser close warning');
      }
    }
    
    // Brief delay between chunks to let memory settle
    if (chunkIndex < chunks.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  return results;
}

async function main() {
  console.log('\n🚀 Puppeteer Prerender Starting...\n');
  console.log(`📍 Base URL: ${BASE_URL}`);
  console.log(`📁 Output: ${OUTPUT_DIR}`);
  
  // Check for --skip-existing flag (default: true for faster incremental builds)
  const skipExisting = !process.argv.includes('--force');
  
  let routes = loadRouteManifest();
  const totalRoutes = routes.length;
  
  // Filter out already-rendered pages unless --force is used
  if (skipExisting) {
    const existingCount = routes.filter(route => fs.existsSync(routeToFilePath(route))).length;
    routes = routes.filter(route => !fs.existsSync(routeToFilePath(route)));
    if (existingCount > 0) {
      console.log(`⏭️  Skipping ${existingCount} already-rendered pages (use --force to re-render all)`);
    }
  }
  
  console.log(`📄 Routes to prerender: ${routes.length}/${totalRoutes}\n`);
  
  // Exit early if all pages are already rendered
  if (routes.length === 0) {
    console.log('✅ All pages already prerendered! Use --force to re-render.\n');
    process.exit(0);
  }
  
  // Check if server is running
  try {
    const response = await fetch(`${BASE_URL}/`);
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }
  } catch (error: any) {
    console.error('❌ Error: Development server not running at', BASE_URL);
    console.error('   Start the server with: npm run dev');
    process.exit(1);
  }
  
  console.log('✅ Server is running\n');
  
  const startTime = Date.now();
  let results = await prerenderWithBrowserRestart(routes);
  
  // Retry failed routes once with fresh browser
  let failed = results.filter(r => !r.success);
  if (failed.length > 0 && failed.length <= 30) {
    console.log(`\n🔄 Retrying ${failed.length} failed routes...\n`);
    const retryRoutes = failed.map(f => f.route);
    const retryResults = await prerenderWithBrowserRestart(retryRoutes);
    
    // Replace failed results with retry results
    results = results.map(r => {
      if (!r.success) {
        const retry = retryResults.find(rr => rr.route === r.route);
        return retry || r;
      }
      return r;
    });
  }
  
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  
  const successful = results.filter(r => r.success);
  failed = results.filter(r => !r.success);
  
  console.log('\n📊 Prerender Complete!\n');
  console.log(`   ⏱️  Time: ${elapsed}s`);
  console.log(`   ✅ Success: ${successful.length} pages`);
  console.log(`   ❌ Failed: ${failed.length} pages`);
  
  if (failed.length > 0) {
    console.log('\n   Failed pages:');
    failed.forEach(f => console.log(`      - ${f.route}: ${f.error}`));
  }
  
  // Write manifest
  const manifest = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    totalRoutes: routes.length,
    successCount: successful.length,
    failedCount: failed.length,
    routes: results.map(r => ({
      path: r.route,
      success: r.success,
      size: r.htmlSize,
      filePath: r.filePath,
      error: r.error
    }))
  };
  
  const manifestPath = path.resolve(OUTPUT_DIR, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\n   📋 Manifest: ${manifestPath}\n`);
  
  // Fail build if any route failed
  if (failed.length > 0) {
    console.error(`\n❌ Build failed: ${failed.length} routes could not be prerendered`);
    process.exit(1);
  }
  
  // NOTE: Asset validation removed from here - it runs too early!
  // The fix-prerender-assets.ts script runs AFTER this, injecting production CSS/JS.
  // Asset validation is done in Step 9 via verify-asset-integrity.mjs.
  console.log('✅ Prerendering complete. Asset references will be fixed in next step.\n');
}

// NOTE: validatePrerenderedFiles() removed - validation now happens in 
// Step 9 via verify-asset-integrity.mjs, AFTER fix-prerender-assets runs.

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
