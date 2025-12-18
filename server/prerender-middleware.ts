/**
 * Prerender Middleware for HTML Requests
 * 
 * This middleware serves pre-rendered static HTML for all requests that accept text/html.
 * This ensures crawlers (and all browsers) see fully rendered content without JavaScript.
 * 
 * Key change: Uses Accept header (content negotiation) instead of user-agent detection.
 * This makes crawling work "out of the box" with default Screaming Frog settings.
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

// Specific files to exclude
const EXCLUDED_FILES = [
  '/sitemap.xml',
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
 * Convert a URL path to the corresponding prerendered file path
 * Uses /foo/index.html format for clean URLs
 * e.g., "/" -> "index.html"
 *       "/foo" -> "foo/index.html"
 *       "/foo/bar" -> "foo/bar/index.html"
 */
function pathToFilePath(prerenderedDir: string, pathname: string): string {
  if (pathname === '/' || pathname === '') {
    return path.join(prerenderedDir, 'index.html');
  }
  
  // Remove leading slash, create directory structure
  const cleanPath = pathname.replace(/^\//, '').replace(/\/$/, '');
  return path.join(prerenderedDir, cleanPath, 'index.html');
}

/**
 * Legacy path format for backward compatibility
 * e.g., "/foo" -> "foo.html"
 */
function pathToLegacyFilePath(prerenderedDir: string, pathname: string): string {
  if (pathname === '/' || pathname === '') {
    return path.join(prerenderedDir, 'index.html');
  }
  
  const cleanPath = pathname.replace(/^\//, '').replace(/\//g, '-');
  return path.join(prerenderedDir, `${cleanPath}.html`);
}

/**
 * Create the prerender middleware
 * @param prerenderedDir - Path to the directory containing prerendered HTML files
 */
export function createPrerenderMiddleware(prerenderedDir: string) {
  const dirExists = fs.existsSync(prerenderedDir);
  
  if (!dirExists) {
    console.log('⚠️  Prerender middleware: No prerendered files found.');
    console.log('   Run: npx tsx scripts/prerender-puppeteer.ts');
  } else {
    // Count HTML files in directory tree
    let fileCount = 0;
    const countHtml = (dir: string) => {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      for (const item of items) {
        if (item.isDirectory()) {
          countHtml(path.join(dir, item.name));
        } else if (item.name.endsWith('.html')) {
          fileCount++;
        }
      }
    };
    countHtml(prerenderedDir);
    console.log(`✅ Prerender middleware: ${fileCount} prerendered pages available`);
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
    
    // Check if prerendered directory exists
    if (!dirExists) {
      return next();
    }
    
    // Try new format first (/foo/index.html), then legacy (foo.html)
    let filePath = pathToFilePath(prerenderedDir, pathname);
    
    if (!fs.existsSync(filePath)) {
      // Try legacy format for backward compatibility
      filePath = pathToLegacyFilePath(prerenderedDir, pathname);
    }
    
    if (!fs.existsSync(filePath)) {
      // No prerendered file, fall through to SPA
      return next();
    }
    
    // Serve prerendered HTML
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
    
    const html = fs.readFileSync(filePath, 'utf-8');
    res.send(html);
  };
}

/**
 * Debug endpoint to check prerender status
 */
export function prerenderStatusHandler(prerenderedDir: string) {
  return function(req: Request, res: Response) {
    const acceptHeader = req.get('accept') || '';
    
    let fileCount = 0;
    const files: string[] = [];
    
    if (fs.existsSync(prerenderedDir)) {
      const collectFiles = (dir: string, prefix: string = '') => {
        const items = fs.readdirSync(dir, { withFileTypes: true });
        for (const item of items) {
          if (item.isDirectory()) {
            collectFiles(path.join(dir, item.name), `${prefix}${item.name}/`);
          } else if (item.name.endsWith('.html')) {
            files.push(`${prefix}${item.name}`);
            fileCount++;
          }
        }
      };
      collectFiles(prerenderedDir);
    }
    
    res.json({
      status: 'ok',
      prerenderEnabled: fileCount > 0,
      prerenderedPages: fileCount,
      prerenderedDir,
      acceptHeader,
      acceptsHtml: acceptsHtml(acceptHeader),
      sampleFiles: files.slice(0, 20),
    });
  };
}
