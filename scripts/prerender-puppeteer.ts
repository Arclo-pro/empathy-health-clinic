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
const CONCURRENCY = 3; // Reduced concurrency to avoid memory issues
const TIMEOUT = 30000; // 30 seconds per page (increased for complex pages)

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

function loadRouteManifest(): string[] {
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error('❌ Route manifest not found:', MANIFEST_PATH);
    console.error('   Run: npx tsx scripts/getStaticRoutes.ts && npx tsx scripts/getBlogRoutes.ts && npx tsx scripts/buildRouteManifest.ts');
    process.exit(1);
  }
  
  const manifest: RouteManifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
  console.log(`📋 Loaded manifest: ${manifest.totalRoutes} routes (${manifest.staticRoutes} static, ${manifest.blogRoutes} blog)`);
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
  // Wait for React to mount - look for actual page content, not just fallback
  try {
    await page.waitForFunction(() => {
      const root = document.getElementById('root');
      if (!root) return false;
      
      // Check for actual React content
      const hasNav = root.querySelector('nav') || root.querySelector('header');
      const hasMain = root.querySelector('main') || root.querySelector('[role="main"]');
      const hasLinks = root.querySelectorAll('a[href]').length > 5;
      
      // Content should be substantial (more than just fallback)
      const textContent = root.textContent || '';
      const hasSubstantialContent = textContent.length > 500;
      
      return (hasNav || hasMain || hasLinks) && hasSubstantialContent;
    }, { timeout: TIMEOUT });
  } catch (e) {
    // Fall back to simpler check if React content check times out
    console.log('    ⚠️ Full content check timed out, trying minimal wait...');
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
  
  // Wait for network to be mostly idle (with shorter timeout)
  await page.waitForNetworkIdle({ idleTime: 1000, timeout: 10000 }).catch(() => {
    // Network might not be idle, continue anyway
  });
  
  // Wait for SEOHead useEffect to set canonical and meta tags
  await page.waitForFunction(() => {
    const canonical = document.querySelector('link[rel="canonical"]');
    const path = window.location.pathname;
    
    if (path === '/') return true;
    
    if (!canonical) {
      const robotsMeta = document.querySelector('meta[name="robots"]');
      const isNoindex = robotsMeta && robotsMeta.getAttribute('content')?.includes('noindex');
      return isNoindex;
    }
    
    const canonicalHref = canonical.getAttribute('href') || '';
    return canonicalHref.includes(path);
  }, { timeout: 5000 }).catch(() => {
    console.log('    ⚠️ Canonical check timed out, continuing...');
  });
  
  // Additional wait for animations/transitions
  await new Promise(resolve => setTimeout(resolve, 500));
}

/**
 * Fix SEO meta tags in the HTML using the shared SEO configuration
 * This ensures correct canonical URLs and robots directives even when React doesn't hydrate
 * 
 * Logic:
 * - Uses shared/seoConfig.ts for canonical consolidation and noindex rules
 * - Replaces placeholder canonical with correct URL (self, consolidated target, or removes for noindex)
 * - Sets correct robots meta content based on page type
 */
function fixSeoTags(html: string, route: string): string {
  const canonicalUrl = getCanonicalUrl(route);
  const robotsContent = getRobotsContent(route);
  
  let result = html;
  
  // Fix robots meta tag
  result = result.replace(
    /<meta name="robots" content="[^"]*">/g,
    `<meta name="robots" content="${robotsContent}">`
  );
  
  // Fix canonical tag based on page type
  if (canonicalUrl === null) {
    // Noindex pages should NOT have canonical - remove it
    result = result.replace(/<link rel="canonical" href="[^"]*">\s*/g, '');
  } else {
    // Replace placeholder canonical with correct URL
    result = result.replace(
      /<link rel="canonical" href="[^"]*">/g,
      `<link rel="canonical" href="${canonicalUrl}">`
    );
  }
  
  return result;
}

function cleanHtml(html: string, route: string): string {
  let cleaned = html
    // Remove Vite HMR client script
    .replace(/<script type="module" src="\/@vite\/client"><\/script>/g, '')
    // Remove React refresh script
    .replace(/<script type="module">import \{ injectIntoGlobalHook \}[\s\S]*?<\/script>/g, '')
    // Remove Vite runtime error plugin script
    .replace(/<script type="module">\s*import \{ createHotContext \}[\s\S]*?<\/script>/g, '')
    // Remove any remaining /@vite/ or /@react-refresh references
    .replace(/<script[^>]*src="\/(@vite|@react-refresh)[^"]*"[^>]*><\/script>/g, '')
    // Remove Cloudflare challenge iframe
    .replace(/<script>\(function\(\)\{function c\(\)[\s\S]*?<\/script>/g, '')
    // Remove inline script for tracking params
    .replace(/<script>\s*\(function\(\)\s*\{\s*const qs[\s\S]*?<\/script>/g, '')
    // Remove replit dev metadata attributes
    .replace(/ data-replit-metadata="[^"]*"/g, '')
    .replace(/ data-component-name="[^"]*"/g, '')
    // Add marker comment for debugging
    .replace('</head>', '<!-- Prerendered by Puppeteer -->\n</head>');
  
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
    await page.close();
  }
}

async function prerenderBatch(browser: Browser, routes: string[]): Promise<PrerenderResult[]> {
  const results: PrerenderResult[] = [];
  
  for (let i = 0; i < routes.length; i += CONCURRENCY) {
    const batch = routes.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(
      batch.map(route => prerenderPage(browser, route))
    );
    results.push(...batchResults);
    
    const progress = Math.min(i + CONCURRENCY, routes.length);
    console.log(`  Progress: ${progress}/${routes.length} pages`);
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
  console.log('🌐 Launching browser...\n');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ]
  });
  
  try {
    const startTime = Date.now();
    const results = await prerenderBatch(browser, routes);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    
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
    
  } finally {
    await browser.close();
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
