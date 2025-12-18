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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Configuration
const BASE_URL = process.env.PRERENDER_URL || 'http://localhost:5000';
const OUTPUT_DIR = path.resolve(rootDir, 'dist/prerendered');
const MANIFEST_PATH = path.resolve(rootDir, 'routes/allRoutes.json');
const CONCURRENCY = 6; // Number of parallel browser pages
const TIMEOUT = 20000; // 20 seconds per page

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
  
  // Wait for network to be mostly idle
  await page.waitForNetworkIdle({ idleTime: 1000, timeout: TIMEOUT });
  
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

function cleanHtml(html: string): string {
  return html
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
    
    await page.goto(url, { 
      waitUntil: 'domcontentloaded',
      timeout: TIMEOUT 
    });
    
    await waitForPageReady(page);
    
    // Get and clean the HTML
    let html = await page.content();
    html = cleanHtml(html);
    
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
  
  const routes = loadRouteManifest();
  console.log(`📄 Routes to prerender: ${routes.length}\n`);
  
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
