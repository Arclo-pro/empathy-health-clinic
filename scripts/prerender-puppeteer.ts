/**
 * Puppeteer-based Prerender Script
 * 
 * This script uses a headless browser to render each page with full JavaScript execution,
 * then captures the HTML for serving to search engine crawlers.
 * 
 * Unlike React SSR, this approach works with client-side hooks (useLayoutEffect, etc.)
 * because it actually runs the app in a real browser environment.
 * 
 * Usage: npx tsx scripts/prerender-puppeteer.ts
 */

import puppeteer, { Browser, Page } from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// All marketing routes to prerender (extracted from entry-server.tsx + sitemap)
const PRERENDER_ROUTES = [
  // Core pages
  "/",
  "/services",
  "/insurance",
  "/therapy",
  "/team",
  "/new-patients",
  "/virtual-therapy",
  "/request-appointment",
  "/blog",
  "/pricing",
  "/affordable-care",
  
  // Psychiatry pages
  "/psychiatrist",
  "/psychiatrist-orlando",
  "/psychiatry-orlando",
  "/psychiatry-clinic-orlando",
  "/psychiatrist-near-me",
  "/psychiatry-near-me",
  "/psychiatric-services",
  "/psychiatric-evaluation",
  "/psychiatric-evaluation-orlando",
  "/same-day-psychiatrist-orlando",
  "/urgent-psychiatric-care-orlando",
  "/child-psychiatrist-orlando",
  "/medication-management-orlando",
  "/telepsychiatry-orlando",
  "/best-psychiatrist-orlando",
  "/online-psychiatrist-orlando",
  "/online-psychiatrist-florida",
  "/mental-health-doctor-orlando",
  "/psychiatrist-accepting-new-patients-orlando",
  "/psychiatrist-near-ucf",
  
  // Condition-specific psychiatry
  "/adhd-psychiatrist-orlando",
  "/anxiety-psychiatrist-orlando",
  "/bipolar-psychiatrist-orlando",
  "/depression-psychiatrist-orlando",
  "/ptsd-psychiatrist-orlando",
  "/ocd-psychiatrist-orlando",
  "/schizophrenia-psychiatrist-orlando",
  "/insomnia-psychiatrist-orlando",
  "/trauma-psychiatrist-orlando",
  "/psychiatrist-for-anxiety-near-me",
  "/psychiatrist-for-depression-near-me",
  
  // Insurance-specific pages
  "/psychiatrist-orlando-accepts-umr",
  "/psychiatrist-orlando-accepts-bcbs",
  "/psychiatrist-orlando-accepts-cigna",
  "/psychiatrist-orlando-accepts-aetna",
  "/psychiatrist-orlando-accepts-united-healthcare",
  "/therapist-accepts-umr",
  "/therapist-accepts-oscar-health",
  "/sunshine-health-therapy",
  "/medicare-therapy-orlando",
  "/medicare-psychiatrist-orlando",
  
  // Therapy pages
  "/therapist-orlando",
  "/psychotherapist-orlando",
  "/psychologist-orlando",
  "/mental-health-services-orlando",
  "/mental-health-clinic-orlando",
  "/therapist-maitland",
  "/therapy-oviedo",
  "/counseling-orlando",
  "/female-therapist-orlando",
  "/black-psychiatrist-orlando",
  
  // Treatment pages
  "/depression-counseling",
  "/depression-treatment",
  "/anxiety-therapy",
  "/anxiety-treatment",
  "/stress-management",
  "/cognitive-behavioral-therapy",
  "/couples-counseling",
  "/emdr-therapy",
  "/tms-treatment",
  "/trauma-specialist-near-me",
  "/crisis-therapy",
  "/adhd-testing-orlando",
  
  // Near-me pages
  "/counselor-near-me",
  "/mental-health-near-me",
  "/therapy-near-me",
  
  // Conditions
  "/adhd-treatment",
  "/bipolar-disorder-treatment",
  "/ocd-treatment",
  "/ptsd-treatment",
  "/eating-disorder-treatment",
  "/lgbtq-therapy",
  "/intimacy-therapy",
  "/in-person-therapy",
  "/therapy-services-orlando",
  
  // Location pages
  "/locations/psychiatrist-orlando",
  "/locations/psychiatrist-winter-park",
  "/locations/psychiatrist-lake-mary",
  "/locations/psychiatrist-altamonte-springs",
  "/locations/psychiatrist-sanford",
  "/locations/psychiatrist-kissimmee",
  "/locations/psychiatrist-apopka",
  "/locations/psychiatrist-maitland",
  "/locations/psychiatrist-casselberry",
  "/winter-park",
  "/lake-mary",
  "/altamonte-springs",
  "/sanford",
  "/kissimmee",
  "/apopka",
  "/maitland",
  "/casselberry",
  "/oviedo",
];

// Configuration
const BASE_URL = process.env.PRERENDER_URL || 'http://localhost:5000';
const OUTPUT_DIR = path.resolve(rootDir, 'dist/prerendered');
const CONCURRENCY = 3; // Number of parallel browser pages
const TIMEOUT = 30000; // 30 seconds per page

interface PrerenderResult {
  route: string;
  success: boolean;
  error?: string;
  htmlSize?: number;
}

async function waitForPageReady(page: Page): Promise<void> {
  // Wait for React to mount - look for actual page content, not just fallback
  // The page should have navigation elements and main content
  await page.waitForFunction(() => {
    const root = document.getElementById('root');
    if (!root) return false;
    
    // Check for actual React content - look for common elements
    // that indicate the app has fully rendered
    const hasNav = root.querySelector('nav') || root.querySelector('header');
    const hasMain = root.querySelector('main') || root.querySelector('[role="main"]');
    const hasLinks = root.querySelectorAll('a[href]').length > 5;
    const hasButtons = root.querySelectorAll('button').length > 0;
    
    // Content should be substantial (more than just fallback)
    const textContent = root.textContent || '';
    const hasSubstantialContent = textContent.length > 500;
    
    return (hasNav || hasMain || hasLinks) && hasSubstantialContent;
  }, { timeout: TIMEOUT });
  
  // Wait for network to be mostly idle
  await page.waitForNetworkIdle({ idleTime: 1000, timeout: TIMEOUT });
  
  // Wait for SEOHead useEffect to set canonical and meta tags
  // This ensures canonical points to the current page, not homepage
  await page.waitForFunction(() => {
    const canonical = document.querySelector('link[rel="canonical"]');
    const path = window.location.pathname;
    
    // For noindex pages (admin, privacy, etc), canonical may be removed - that's OK
    // For regular pages, canonical should exist and NOT point to homepage (unless we're on homepage)
    if (path === '/') {
      return true; // Homepage canonical is correct
    }
    
    // Either no canonical (noindex page) or canonical matches current path
    if (!canonical) {
      // Check if this is a noindex page (has noindex in robots meta)
      const robotsMeta = document.querySelector('meta[name="robots"]');
      const isNoindex = robotsMeta && robotsMeta.getAttribute('content')?.includes('noindex');
      return isNoindex; // OK if noindex page has no canonical
    }
    
    const canonicalHref = canonical.getAttribute('href') || '';
    // Canonical should contain current path (not just homepage)
    return canonicalHref.includes(path);
  }, { timeout: 5000 }).catch(() => {
    // If timeout, just continue - may be a special page
    console.log('    ⚠️ Canonical check timed out, continuing...');
  });
  
  // Additional wait for any animations/transitions and lazy loading
  await new Promise(resolve => setTimeout(resolve, 1500));
}

async function prerenderPage(browser: Browser, route: string): Promise<PrerenderResult> {
  const page = await browser.newPage();
  
  try {
    // Set a desktop viewport for consistent rendering
    await page.setViewport({ width: 1280, height: 800 });
    
    // Block unnecessary resources for faster rendering (but keep essentials)
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const url = request.url();
      // Block only analytics and tracking - keep images/fonts for proper rendering
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
    
    // Get the full HTML
    let html = await page.content();
    
    // Clean up the HTML for SEO:
    // 1. Remove Vite dev scripts that won't work in production
    // 2. Keep structured data (JSON-LD)
    // 3. Remove Cloudflare challenge scripts
    html = html
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
      // Remove inline script for tracking params (not needed in static HTML)
      .replace(/<script>\s*\(function\(\)\s*\{\s*const qs[\s\S]*?<\/script>/g, '')
      // Remove replit dev metadata attributes (not needed in production)
      .replace(/ data-replit-metadata="[^"]*"/g, '')
      .replace(/ data-component-name="[^"]*"/g, '')
      // Add marker comment for debugging
      .replace('</head>', '<!-- Prerendered by Puppeteer -->\n</head>');
    
    // Determine output file path
    const fileName = route === '/' 
      ? 'index.html' 
      : `${route.replace(/^\//, '').replace(/\//g, '-')}.html`;
    const filePath = path.resolve(OUTPUT_DIR, fileName);
    
    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    
    // Write the pre-rendered HTML
    fs.writeFileSync(filePath, html, 'utf-8');
    
    return {
      route,
      success: true,
      htmlSize: html.length
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
    
    // Progress update
    const progress = Math.min(i + CONCURRENCY, routes.length);
    console.log(`  Progress: ${progress}/${routes.length} pages`);
  }
  
  return results;
}

async function main() {
  console.log('\n🚀 Puppeteer Prerender Starting...\n');
  console.log(`📍 Base URL: ${BASE_URL}`);
  console.log(`📁 Output: ${OUTPUT_DIR}`);
  console.log(`📄 Routes: ${PRERENDER_ROUTES.length} pages\n`);
  
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
    const results = await prerenderBatch(browser, PRERENDER_ROUTES);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    
    // Summary
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
      totalRoutes: PRERENDER_ROUTES.length,
      successCount: successful.length,
      failedCount: failed.length,
      routes: results.map(r => ({
        path: r.route,
        success: r.success,
        size: r.htmlSize,
        error: r.error
      }))
    };
    
    const manifestPath = path.resolve(OUTPUT_DIR, 'manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`\n   📋 Manifest: ${manifestPath}\n`);
    
  } finally {
    await browser.close();
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
