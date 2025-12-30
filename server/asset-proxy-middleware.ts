import type { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';

/**
 * Asset Proxy Middleware
 * 
 * Enables serving images from an external CDN while maintaining the same public URLs.
 * This allows removing large image assets from git while preserving SEO.
 * 
 * When EXTERNAL_ASSET_URL is set:
 *   - Requests to /attached_assets/* are redirected to CDN
 *   - Uses 302 redirect (temporary) to allow easy rollback
 *   - After verification, can switch to 301 (permanent)
 * 
 * When EXTERNAL_ASSET_URL is not set:
 *   - Falls through to express.static (current behavior)
 * 
 * Usage:
 *   EXTERNAL_ASSET_URL=https://cdn.example.com npm run dev
 * 
 * URL Mapping:
 *   /attached_assets/stock_images/photo.jpg
 *   → https://cdn.example.com/attached_assets/stock_images/photo.jpg
 */

const EXTERNAL_ASSET_URL = process.env.EXTERNAL_ASSET_URL;
const USE_PERMANENT_REDIRECT = process.env.ASSET_REDIRECT_PERMANENT === 'true';

// Supported image extensions (case-insensitive matching)
const IMAGE_EXTENSIONS = new Set([
  '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico', '.bmp', '.tiff', '.tif'
]);

function isImageFile(filePath: string): boolean {
  const ext = path.extname(filePath).toLowerCase();
  return IMAGE_EXTENSIONS.has(ext);
}

/**
 * Creates the asset proxy middleware
 * @param localAssetPath - Local path to attached_assets directory (for fallback checks)
 */
export function createAssetProxyMiddleware(localAssetPath: string) {
  return function assetProxyMiddleware(req: Request, res: Response, next: NextFunction) {
    // Only handle /attached_assets/* requests
    if (!req.path.startsWith('/attached_assets/')) {
      return next();
    }

    // If no external URL configured, fall through to static file serving
    if (!EXTERNAL_ASSET_URL) {
      return next();
    }

    // Only redirect image files - let other assets (docs, etc) be served locally
    if (!isImageFile(req.path)) {
      return next();
    }

    // Construct CDN URL
    const cdnUrl = `${EXTERNAL_ASSET_URL.replace(/\/$/, '')}${req.path}`;
    
    // Use 302 (temporary) by default for safe rollback
    // Switch to 301 after verification by setting ASSET_REDIRECT_PERMANENT=true
    const statusCode = USE_PERMANENT_REDIRECT ? 301 : 302;
    
    // Set cache headers for the redirect itself
    res.set('Cache-Control', USE_PERMANENT_REDIRECT 
      ? 'public, max-age=31536000' // 1 year for permanent
      : 'public, max-age=86400'    // 1 day for temporary
    );
    
    return res.redirect(statusCode, cdnUrl);
  };
}

/**
 * Middleware to serve local assets as fallback
 * This is called after the proxy middleware when no CDN is configured
 */
export function createLocalAssetFallback(localAssetPath: string) {
  return function localAssetFallback(req: Request, res: Response, next: NextFunction) {
    // Only handle /attached_assets/* requests
    if (!req.path.startsWith('/attached_assets/')) {
      return next();
    }

    // Check if file exists locally
    const relativePath = req.path.replace('/attached_assets/', '');
    const localPath = path.join(localAssetPath, relativePath);
    
    if (fs.existsSync(localPath)) {
      // Let express.static handle it
      return next();
    }

    // If external URL is configured but redirect failed to resolve,
    // we might want to check CDN here as a fallback
    // For now, just 404
    return next();
  };
}

/**
 * Log helper for asset serving diagnostics
 */
export function logAssetConfig() {
  if (EXTERNAL_ASSET_URL) {
    console.log(`[Assets] CDN mode enabled: ${EXTERNAL_ASSET_URL}`);
    console.log(`[Assets] Redirect type: ${USE_PERMANENT_REDIRECT ? '301 (permanent)' : '302 (temporary)'}`);
  } else {
    console.log('[Assets] Local mode: serving from attached_assets/');
  }
}
