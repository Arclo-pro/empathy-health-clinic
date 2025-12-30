import type { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';

/**
 * Asset Proxy Middleware
 * 
 * Enables serving images from an external CDN while maintaining the same public URLs.
 * This allows removing large image assets from git while preserving SEO.
 * 
 * Environment Variables:
 *   EXTERNAL_ASSET_URL     - CDN base URL (e.g., https://cdn.example.com)
 *   ASSET_PROXY_MODE       - "cdn-first" (default when CDN set) or "local-first"
 *   ASSET_REDIRECT_PERMANENT - "true" to use 301 instead of 302
 * 
 * Modes:
 *   - No EXTERNAL_ASSET_URL: Serve from local attached_assets/ (default)
 *   - cdn-first: Redirect to CDN, fall through to local only if CDN not configured
 *   - local-first: Serve local if file exists, redirect to CDN only if missing
 * 
 * URL Mapping (preserves querystrings):
 *   /attached_assets/stock_images/photo.jpg?v=123
 *   → https://cdn.example.com/attached_assets/stock_images/photo.jpg?v=123
 * 
 * Cache Headers:
 *   - 302 redirects: 10 minute cache (safe for testing)
 *   - 301 redirects: 1 year cache (after verification)
 */

// Configuration
const EXTERNAL_ASSET_URL = process.env.EXTERNAL_ASSET_URL?.replace(/\/$/, '') || '';
const ASSET_PROXY_MODE = process.env.ASSET_PROXY_MODE || (EXTERNAL_ASSET_URL ? 'cdn-first' : 'local');
const USE_PERMANENT_REDIRECT = process.env.ASSET_REDIRECT_PERMANENT === 'true';
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

// Cache durations
const CACHE_TEMPORARY = 'public, max-age=600';       // 10 min for 302
const CACHE_PERMANENT = 'public, max-age=31536000';  // 1 year for 301

// Supported image extensions (case-insensitive)
const IMAGE_EXTENSIONS = new Set([
  '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico', '.bmp', '.tiff', '.tif'
]);

function isImageFile(filePath: string): boolean {
  const ext = path.extname(filePath).toLowerCase();
  return IMAGE_EXTENSIONS.has(ext);
}

function devLog(message: string): void {
  if (IS_DEVELOPMENT) {
    console.log(`[Assets] ${message}`);
  }
}

/**
 * Check if a local file exists
 */
function localFileExists(localAssetPath: string, reqPath: string): boolean {
  const relativePath = reqPath.replace('/attached_assets/', '');
  const localPath = path.join(localAssetPath, relativePath);
  return fs.existsSync(localPath);
}

/**
 * Build CDN URL preserving querystring
 */
function buildCdnUrl(reqPath: string, queryString: string): string {
  const baseUrl = `${EXTERNAL_ASSET_URL}${reqPath}`;
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * Send redirect response with appropriate headers
 */
function sendRedirect(res: Response, cdnUrl: string): void {
  const statusCode = USE_PERMANENT_REDIRECT ? 301 : 302;
  const cacheControl = USE_PERMANENT_REDIRECT ? CACHE_PERMANENT : CACHE_TEMPORARY;
  
  res.set('Cache-Control', cacheControl);
  res.set('X-Asset-Source', 'cdn-redirect');
  res.redirect(statusCode, cdnUrl);
}

/**
 * Creates the asset proxy middleware
 * @param localAssetPath - Local path to attached_assets directory
 */
export function createAssetProxyMiddleware(localAssetPath: string) {
  return function assetProxyMiddleware(req: Request, res: Response, next: NextFunction) {
    // Only handle /attached_assets/* requests
    if (!req.path.startsWith('/attached_assets/')) {
      return next();
    }

    // Only process image files - other assets (docs, etc) always serve locally
    if (!isImageFile(req.path)) {
      return next();
    }

    // Mode: local (no CDN configured)
    if (!EXTERNAL_ASSET_URL || ASSET_PROXY_MODE === 'local') {
      return next();
    }

    // Mode: local-first (serve local if exists, CDN as fallback)
    if (ASSET_PROXY_MODE === 'local-first') {
      if (localFileExists(localAssetPath, req.path)) {
        devLog(`local-first: serving local file ${req.path}`);
        return next();
      }
      // File missing locally, redirect to CDN
      const cdnUrl = buildCdnUrl(req.path, req.query ? new URLSearchParams(req.query as any).toString() : '');
      devLog(`local-first: redirecting to CDN ${cdnUrl}`);
      return sendRedirect(res, cdnUrl);
    }

    // Mode: cdn-first (default when EXTERNAL_ASSET_URL set)
    // Always redirect to CDN, no local fallback check
    const queryString = Object.keys(req.query).length > 0 
      ? new URLSearchParams(req.query as Record<string, string>).toString() 
      : '';
    const cdnUrl = buildCdnUrl(req.path, queryString);
    devLog(`cdn-first: redirecting ${req.path} → ${cdnUrl}`);
    return sendRedirect(res, cdnUrl);
  };
}

/**
 * Log asset serving configuration on startup
 */
export function logAssetConfig(): void {
  if (!EXTERNAL_ASSET_URL) {
    console.log('[Assets] Local mode: serving from attached_assets/');
    return;
  }

  console.log(`[Assets] CDN enabled: ${EXTERNAL_ASSET_URL}`);
  console.log(`[Assets] Mode: ${ASSET_PROXY_MODE}`);
  console.log(`[Assets] Redirect: ${USE_PERMANENT_REDIRECT ? '301 (permanent)' : '302 (temporary)'}`);
}

/**
 * Get current asset configuration for diagnostics
 */
export function getAssetConfig() {
  return {
    externalUrl: EXTERNAL_ASSET_URL || null,
    mode: ASSET_PROXY_MODE,
    permanentRedirect: USE_PERMANENT_REDIRECT,
    cacheControl: USE_PERMANENT_REDIRECT ? CACHE_PERMANENT : CACHE_TEMPORARY,
  };
}
