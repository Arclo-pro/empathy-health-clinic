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
    // Use longer timeout (30s) for React apps that may take time to hydrate
    await page.waitForFunction(() => {
      const root = document.getElementById('root');
      if (!root) return false;
      
      // Check for actual React content - be more lenient
      const hasNav = root.querySelector('nav') || root.querySelector('header');
      const hasMain = root.querySelector('main') || root.querySelector('[role="main"]');
      const hasFooter = root.querySelector('footer');
      const hasLinks = root.querySelectorAll('a[href]').length > 3;
      
      // Content should be substantial (more than just fallback)
      const textContent = root.textContent || '';
      const hasSubstantialContent = textContent.length > 200;
      
      return (hasNav || hasMain || hasFooter || hasLinks) && hasSubstantialContent;
    }, { timeout: 30000 }); // 30 second timeout
  } catch (e) {
    // Fall back to simpler check if React content check times out
    console.log('    ⚠️ Full content check timed out, trying extended wait...');
    // Wait longer before giving up - give React time to render
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // One more check - see if there's ANY content in root
    try {
      await page.waitForFunction(() => {
        const root = document.getElementById('root');
        return root && (root.textContent || '').length > 100;
      }, { timeout: 5000 });
    } catch {
      console.log('    ⚠️ Minimal content check also failed');
    }
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
    // Remove Replit dev banner script
    .replace(/<script[^>]*src="\/@replit\/[^"]*"[^>]*><\/script>/g, '')
    // Remove Cloudflare challenge iframe
    .replace(/<script>\(function\(\)\{function c\(\)[\s\S]*?<\/script>/g, '')
    // Remove inline script for tracking params
    .replace(/<script>\s*\(function\(\)\s*\{\s*const qs[\s\S]*?<\/script>/g, '')
    // Remove replit dev metadata attributes
    .replace(/ data-replit-metadata="[^"]*"/g, '')
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
    
    // Run validation to ensure all files have production assets
    console.log('🔍 Running post-prerender validation...\n');
    const validationResult = validatePrerenderedFiles();
    if (!validationResult.success) {
      console.error(`\n❌ Validation failed: ${validationResult.missingCSS.length} files missing CSS, ${validationResult.missingJS.length} files missing JS`);
      console.error('   Run: python3 scripts/fix-prerender-assets.py');
      process.exit(1);
    }
    console.log('✅ All prerendered files validated successfully!\n');
    
  } finally {
    await browser.close();
  }
}

/**
 * Validate that all prerendered files have production CSS and JS assets
 * 
 * This function throws if production build is not found - validation should
 * never be skipped as it's the last line of defense before deployment.
 */
function validatePrerenderedFiles(): { success: boolean; missingCSS: string[]; missingJS: string[] } {
  const prodIndexPath = path.resolve(rootDir, 'dist/public/index.html');
  
  if (!fs.existsSync(prodIndexPath)) {
    throw new Error('Production build not found during validation. This should never happen.');
  }
  
  const prodHtml = fs.readFileSync(prodIndexPath, 'utf-8');
  
  const cssMatch = prodHtml.match(/href="(\/assets\/index[^"]*\.css)"/);
  const jsMatch = prodHtml.match(/src="(\/assets\/index[^"]*\.js)"/);
  
  if (!cssMatch || !jsMatch) {
    throw new Error('Production assets not found during validation. This should never happen.');
  }
  
  const cssHref = cssMatch[1];
  const jsHref = jsMatch[1];
  
  const missingCSS: string[] = [];
  const missingJS: string[] = [];
  
  function walkDir(dir: string) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.html')) {
        const content = fs.readFileSync(filePath, 'utf-8');
        if (!content.includes(cssHref)) {
          missingCSS.push(filePath);
        }
        if (!content.includes(jsHref)) {
          missingJS.push(filePath);
        }
      }
    }
  }
  
  walkDir(OUTPUT_DIR);
  
  return {
    success: missingCSS.length === 0 && missingJS.length === 0,
    missingCSS,
    missingJS
  };
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
