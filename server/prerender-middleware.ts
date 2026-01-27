/**
 * Prerender Middleware for HTML Requests
 * 
 * This middleware serves pre-rendered static HTML for all requests that accept text/html.
 * This ensures crawlers (and all browsers) see fully rendered content without JavaScript.
 * 
 * PERFORMANCE: All HTML files are loaded into memory on startup to avoid blocking
 * the event loop with synchronous filesystem reads during request handling.
 * This is critical for deployment health checks to pass quickly.
 * 
 * Generate prerendered files with: npx tsx scripts/prerender-puppeteer.ts
 */

import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

// Paths that should NOT be prerendered
const EXCLUDED_PATHS = [
  '/api/',
  '/admin',
  '/login',
  '/auth',
  '/.well-known',
  '/assets/',
  '/attached_assets/',
  '/site-assets/',
  '/blog-assets/',
  '/static/',
  '/images/',
  '/fonts/',
  '/favicon',
  '/src/',
  '/@vite/',
  '/@react-refresh',
  '/@replit/',
  '/@fs/',
  '/node_modules/',
];

// File extensions that are not HTML pages
const EXCLUDED_EXTENSIONS = [
  '.js', '.jsx', '.ts', '.tsx', '.mjs', '.mts',
  '.css', '.json', '.xml', '.txt', '.ico', '.png', '.jpg', '.jpeg', 
  '.gif', '.svg', '.webp', '.woff', '.woff2', '.ttf', '.eot', '.map'
];

// Specific files to exclude (SEO-critical files that have their own routes)
const EXCLUDED_FILES = [
  '/sitemap.xml',
  '/sitemap_index.xml',
  '/image-sitemap.xml',
  '/robots.txt',
];

/**
 * Check if the request accepts HTML content
 */
function acceptsHtml(acceptHeader: string): boolean {
  if (!acceptHeader) return false;
  return acceptHeader.includes('text/html') || acceptHeader.includes('*/*');
}

/**
 * Check if the path should be excluded from prerendering
 */
function isExcludedPath(pathname: string): boolean {
  // Check excluded path prefixes
  if (EXCLUDED_PATHS.some(prefix => pathname.startsWith(prefix))) {
    return true;
  }
  
  // Check specific excluded files
  if (EXCLUDED_FILES.includes(pathname)) {
    return true;
  }
  
  // Check file extensions
  if (EXCLUDED_EXTENSIONS.some(ext => pathname.endsWith(ext))) {
    return true;
  }
  
  return false;
}

/**
 * Normalize a URL path to a cache key
 * e.g., "/" -> "/", "/foo" -> "/foo", "/foo/" -> "/foo"
 */
function normalizePath(pathname: string): string {
  if (pathname === '/' || pathname === '') {
    return '/';
  }
  // Remove trailing slash for consistency
  return pathname.replace(/\/$/, '');
}

/**
 * Load all prerendered HTML files into memory
 * This runs once on startup to avoid blocking fs reads during requests
 */
function loadPrerenderedCache(prerenderedDir: string): Map<string, Buffer> {
  const cache = new Map<string, Buffer>();
  
  if (!fs.existsSync(prerenderedDir)) {
    return cache;
  }
  
  const loadDir = (dir: string, urlPrefix: string = '') => {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const itemPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        loadDir(itemPath, urlPrefix + '/' + item.name);
      } else if (item.name === 'index.html') {
        // /foo/index.html -> /foo
        const urlPath = urlPrefix || '/';
        const html = fs.readFileSync(itemPath);
        cache.set(normalizePath(urlPath), html);
      } else if (item.name.endsWith('.html')) {
        // Legacy: foo.html -> /foo (for backward compatibility)
        const baseName = item.name.replace('.html', '');
        const urlPath = urlPrefix + '/' + baseName;
        const html = fs.readFileSync(itemPath);
        cache.set(normalizePath(urlPath), html);
      }
    }
  };
  
  loadDir(prerenderedDir);
  return cache;
}

/**
 * Create the prerender middleware
 * @param prerenderedDir - Path to the directory containing prerendered HTML files
 */
export function createPrerenderMiddleware(prerenderedDir: string) {
  // Load all HTML into memory on startup - critical for fast health checks
  const htmlCache = loadPrerenderedCache(prerenderedDir);
  const dirExists = htmlCache.size > 0;
  
  if (!dirExists) {
    console.log('⚠️  Prerender middleware: No prerendered files found.');
    console.log('   Run: npx tsx scripts/prerender-puppeteer.ts');
  } else {
    console.log(`✅ Prerender middleware: ${htmlCache.size} prerendered pages cached in memory`);
  }
  
  return function prerenderMiddleware(req: Request, res: Response, next: NextFunction) {
    // Only handle GET requests
    if (req.method !== 'GET') {
      return next();
    }
    
    // Skip prerender for puppeteer prerender script (to get fresh React rendering)
    // This header is set by scripts/prerender-puppeteer.ts
    if (req.get('X-Prerender-Bypass') === 'true') {
      return next();
    }
    
    const pathname = req.path;
    const acceptHeader = req.get('accept') || '';
    
    // Skip excluded paths
    if (isExcludedPath(pathname)) {
      return next();
    }
    
    // Check if request accepts HTML
    if (!acceptsHtml(acceptHeader)) {
      return next();
    }
    
    // Check if we have prerendered content
    if (!dirExists) {
      return next();
    }
    
    // Look up in memory cache (no filesystem access!)
    const cacheKey = normalizePath(pathname);
    const cachedHtml = htmlCache.get(cacheKey);
    
    if (!cachedHtml) {
      // No prerendered file, fall through to SPA
      return next();
    }
    
    // Serve prerendered HTML from memory
    console.log(`📄 Serving prerendered: ${pathname}`);
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-Prerendered', 'true');
    
    // Cache headers - static pages can be cached longer
    if (pathname.startsWith('/blog/')) {
      res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour for blog
    } else {
      res.setHeader('Cache-Control', 'public, max-age=7200'); // 2 hours for static
    }
    
    res.setHeader('Vary', 'Accept-Encoding, Accept');
    
    res.send(cachedHtml);
  };
}

/**
 * Debug endpoint to check prerender status
 */
export function prerenderStatusHandler(prerenderedDir: string) {
  // Cache the file list on startup
  const files: string[] = [];
  
  if (fs.existsSync(prerenderedDir)) {
    const collectFiles = (dir: string, prefix: string = '') => {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      for (const item of items) {
        const itemPath = path.join(dir, item.name);
        if (item.isDirectory()) {
          collectFiles(itemPath, prefix + '/' + item.name);
        } else if (item.name === 'index.html') {
          files.push(prefix || '/');
        } else if (item.name.endsWith('.html')) {
          files.push(prefix + '/' + item.name.replace('.html', ''));
        }
      }
    };
    collectFiles(prerenderedDir);
  }
  
  return function(req: Request, res: Response) {
    const acceptHeader = req.get('accept') || '';
    
    res.json({
      available: files.length > 0,
      count: files.length,
      files: files.slice(0, 50), // Limit response size
      totalFiles: files.length,
      requestAcceptsHtml: acceptsHtml(acceptHeader),
      acceptHeader,
    });
  };
}
