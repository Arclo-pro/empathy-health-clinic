/**
 * Unified Canonicalization Middleware
 * Handles all URL normalization in a single redirect to prevent redirect chains
 */

import type { Request, Response, NextFunction } from 'express';
import { getCanonicalUrl } from './redirect-config';

/**
 * Middleware that issues a single 301 redirect to the canonical URL if needed
 * Combines: www removal, trailing slash removal, and content redirects
 */
export function canonicalizationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Only apply to GET and HEAD requests (safe methods)
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return next();
  }
  
  // Skip API routes - they don't need canonicalization
  if (req.path.startsWith('/api/')) {
    return next();
  }
  
  // Skip Vite dev server routes (development only)
  if (req.path.startsWith('/@') || req.path.startsWith('/src/') || req.path.startsWith('/node_modules/')) {
    return next();
  }
  
  // Skip if already processing a redirect (prevent loops)
  if (req.headers['x-redirect-processed']) {
    return next();
  }
  
  const protocol = req.protocol || (req.secure ? 'https' : 'http');
  const host = req.headers.host || '';
  const path = req.path;
  const query = req.url.slice(path.length); // Preserve query string
  
  // Get the canonical URL
  const canonicalUrl = getCanonicalUrl(protocol, host, path, query);
  
  if (canonicalUrl) {
    // Mark this request as processed to prevent infinite loops
    res.setHeader('X-Redirect-Processed', '1');
    
    // Issue a single 301 redirect to the canonical URL
    return res.redirect(301, canonicalUrl);
  }
  
  // URL is already canonical, continue to next middleware
  next();
}
