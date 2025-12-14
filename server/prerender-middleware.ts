/**
 * Prerender Middleware for Search Engine Crawlers
 * 
 * This middleware detects search engine bots (Googlebot, Bingbot, etc.) and serves
 * them pre-rendered static HTML instead of the SPA shell. This ensures crawlers
 * can see all content and discover internal links.
 * 
 * How it works:
 * 1. Checks User-Agent for known crawler patterns
 * 2. If crawler detected, looks for prerendered HTML file
 * 3. If found, serves static HTML; otherwise falls through to SPA
 * 
 * Generate prerendered files with: npx tsx scripts/prerender-puppeteer.ts
 */

import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

// Known search engine and SEO tool user agents
const BOT_USER_AGENTS = [
  // Search engines
  'googlebot',
  'bingbot',
  'yandexbot',
  'duckduckbot',
  'slurp',           // Yahoo
  'baiduspider',
  'sogou',
  'exabot',
  'facebot',         // Facebook
  'ia_archiver',     // Alexa
  
  // SEO tools
  'screaming frog',
  'semrushbot',
  'ahrefsbot',
  'mj12bot',         // Majestic
  'dotbot',
  'rogerbot',        // Moz
  'sitebulb',
  
  // Social media crawlers
  'twitterbot',
  'linkedinbot',
  'pinterest',
  'slackbot',
  'whatsapp',
  'telegrambot',
  
  // Validators
  'w3c_validator',
  'w3c-checklink',
  
  // Generic patterns
  'bot',
  'spider',
  'crawl',
];

// Paths that should NOT be prerendered (dynamic content)
const EXCLUDED_PATHS = [
  '/api/',
  '/admin',
  '/login',
  '/auth',
  '/.well-known',
  '/sitemap.xml',
  '/robots.txt',
  '/assets/',
  '/attached_assets/',
];

// File extensions that are not HTML pages
const EXCLUDED_EXTENSIONS = [
  '.js', '.css', '.json', '.xml', '.txt', '.ico', '.png', '.jpg', '.jpeg', 
  '.gif', '.svg', '.webp', '.woff', '.woff2', '.ttf', '.eot', '.map'
];

/**
 * Check if the request is from a search engine crawler or SEO tool
 */
function isCrawler(userAgent: string): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some(bot => ua.includes(bot));
}

/**
 * Check if the path should be excluded from prerendering
 */
function isExcludedPath(pathname: string): boolean {
  // Check excluded path prefixes
  if (EXCLUDED_PATHS.some(prefix => pathname.startsWith(prefix))) {
    return true;
  }
  
  // Check file extensions
  if (EXCLUDED_EXTENSIONS.some(ext => pathname.endsWith(ext))) {
    return true;
  }
  
  return false;
}

/**
 * Convert a URL path to the corresponding prerendered file name
 * e.g., "/psychiatrist-orlando" -> "psychiatrist-orlando.html"
 *       "/" -> "index.html"
 *       "/locations/psychiatrist-orlando" -> "locations-psychiatrist-orlando.html"
 */
function pathToFileName(pathname: string): string {
  if (pathname === '/' || pathname === '') {
    return 'index.html';
  }
  
  // Remove leading slash and replace remaining slashes with hyphens
  const cleanPath = pathname.replace(/^\//, '').replace(/\//g, '-');
  return `${cleanPath}.html`;
}

/**
 * Create the prerender middleware
 * @param prerenderedDir - Path to the directory containing prerendered HTML files
 */
export function createPrerenderMiddleware(prerenderedDir: string) {
  // Check if prerendered directory exists
  const dirExists = fs.existsSync(prerenderedDir);
  
  if (!dirExists) {
    console.log('⚠️  Prerender middleware: No prerendered files found.');
    console.log('   Run: npx tsx scripts/prerender-puppeteer.ts');
  } else {
    const files = fs.readdirSync(prerenderedDir).filter(f => f.endsWith('.html'));
    console.log(`✅ Prerender middleware: ${files.length} prerendered pages available`);
  }
  
  return function prerenderMiddleware(req: Request, res: Response, next: NextFunction) {
    // Only handle GET requests
    if (req.method !== 'GET') {
      return next();
    }
    
    const pathname = req.path;
    const userAgent = req.get('user-agent') || '';
    
    // Debug: Log all requests to see if middleware is being reached
    const isCrawlerRequest = isCrawler(userAgent);
    console.log(`[Prerender] Path: ${pathname}, IsCrawler: ${isCrawlerRequest}, UA: ${userAgent.slice(0, 50)}`);
    
    // Skip excluded paths
    if (isExcludedPath(pathname)) {
      console.log(`[Prerender] Skipping excluded path: ${pathname}`);
      return next();
    }
    
    // Check if request is from a crawler
    if (!isCrawlerRequest) {
      return next();
    }
    
    // Check if prerendered directory exists
    if (!dirExists) {
      return next();
    }
    
    // Look for prerendered file
    const fileName = pathToFileName(pathname);
    const filePath = path.join(prerenderedDir, fileName);
    
    if (!fs.existsSync(filePath)) {
      // No prerendered file for this path, fall through to SPA
      console.log(`🔍 Crawler request (no prerender): ${pathname} [${userAgent.slice(0, 50)}...]`);
      return next();
    }
    
    // Serve prerendered HTML
    console.log(`🤖 Serving prerendered: ${pathname} → ${fileName}`);
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-Prerendered', 'true');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    
    const html = fs.readFileSync(filePath, 'utf-8');
    res.send(html);
  };
}

/**
 * Debug endpoint to check prerender status
 */
export function prerenderStatusHandler(prerenderedDir: string) {
  return function(req: Request, res: Response) {
    const userAgent = req.get('user-agent') || '';
    const isCrawlerRequest = isCrawler(userAgent);
    
    let fileCount = 0;
    let files: string[] = [];
    
    if (fs.existsSync(prerenderedDir)) {
      files = fs.readdirSync(prerenderedDir).filter(f => f.endsWith('.html'));
      fileCount = files.length;
    }
    
    res.json({
      status: 'ok',
      prerenderEnabled: fileCount > 0,
      prerenderedPages: fileCount,
      prerenderedDir,
      requestUserAgent: userAgent,
      isCrawlerDetected: isCrawlerRequest,
      detectedBots: BOT_USER_AGENTS.filter(bot => userAgent.toLowerCase().includes(bot)),
      sampleFiles: files.slice(0, 10),
    });
  };
}
