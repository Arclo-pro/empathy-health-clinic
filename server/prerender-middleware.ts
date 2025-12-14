/**
 * Prerender Middleware
 * 
 * Serves pre-rendered static HTML files for marketing pages.
 * This allows search engines to crawl fully rendered content without JavaScript.
 * 
 * In production: Serves from dist/prerendered/{route}.html
 * Falls back to SPA if pre-rendered file doesn't exist
 */

import fs from 'fs';
import path from 'path';
import type { Request, Response, NextFunction } from 'express';

// Routes that have pre-rendered versions
const prerenderRoutes = new Set([
  "/",
  "/insurance",
  "/therapy",
  "/team",
  "/services",
  "/request-appointment",
  "/new-patients",
  "/pricing",
  "/affordable-care",
  "/stress-management",
  "/psychotherapist-orlando",
  "/mental-health-services-orlando",
  "/therapist-maitland",
  "/emdr-therapy",
  "/tms-treatment",
  "/trauma-specialist-near-me",
  "/female-therapist-orlando",
  "/black-psychiatrist-orlando",
  "/virtual-therapy",
  "/crisis-therapy",
  "/depression-counseling",
  "/depression-treatment",
  "/anxiety-therapy",
  "/anxiety-treatment",
  "/cognitive-behavioral-therapy",
  "/couples-counseling",
  "/counselor-near-me",
  "/mental-health-near-me",
  "/therapy-near-me",
  "/counseling-orlando",
  "/therapy-oviedo",
  "/psychiatrist",
  "/psychiatric-services",
  "/psychiatric-evaluation",
  "/psychiatrist-orlando",
  "/psychiatry-clinic-orlando",
  "/psychiatrist-near-me",
  "/psychiatry-near-me",
  "/adhd-psychiatrist-orlando",
  "/anxiety-psychiatrist-orlando",
  "/bipolar-psychiatrist-orlando",
  "/depression-psychiatrist-orlando",
  "/ptsd-psychiatrist-orlando",
  "/urgent-psychiatric-care-orlando",
  "/psychiatrist-orlando-accepts-umr",
  "/child-psychiatrist-orlando",
  "/medication-management-orlando",
  "/telepsychiatry-orlando",
  "/same-day-psychiatrist-orlando",
  "/psychiatrist-for-anxiety-near-me",
  "/psychiatrist-for-depression-near-me",
  "/psychiatric-evaluation-orlando",
  "/therapist-orlando",
  "/mental-health-clinic-orlando",
  "/medicare-therapy-orlando",
  "/medicare-psychiatrist-orlando",
  "/psychologist-orlando",
  "/therapist-accepts-umr",
  "/therapist-accepts-oscar-health",
  "/psychiatrist-orlando-accepts-bcbs",
  "/psychiatrist-orlando-accepts-cigna",
  "/psychiatrist-orlando-accepts-aetna",
  "/psychiatrist-orlando-accepts-united-healthcare",
  "/psychiatry-orlando",
  "/ocd-psychiatrist-orlando",
  "/schizophrenia-psychiatrist-orlando",
  "/insomnia-psychiatrist-orlando",
  "/sunshine-health-therapy",
  "/adhd-testing-orlando",
  "/trauma-psychiatrist-orlando",
  "/psychiatrist-near-ucf",
  "/best-psychiatrist-orlando",
  "/online-psychiatrist-orlando",
  "/online-psychiatrist-florida",
  "/mental-health-doctor-orlando",
  "/psychiatrist-accepting-new-patients-orlando",
]);

// Prerendered files directory
const prerenderDir = path.resolve(import.meta.dirname, '..', 'dist', 'prerendered');

// Check if prerendered files exist
const prerenderEnabled = fs.existsSync(prerenderDir);

/**
 * Middleware to serve pre-rendered HTML for marketing routes
 */
export function prerenderMiddleware(req: Request, res: Response, next: NextFunction): void {
  // Only serve prerendered content in production and for GET requests
  if (process.env.NODE_ENV !== 'production' || req.method !== 'GET') {
    return next();
  }
  
  // Skip if prerendering is not enabled
  if (!prerenderEnabled) {
    return next();
  }
  
  // Normalize path (remove trailing slash)
  const normalizedPath = req.path === '/' ? '/' : req.path.replace(/\/$/, '');
  
  // Check if this route has a prerendered version
  if (!prerenderRoutes.has(normalizedPath)) {
    return next();
  }
  
  // Skip for bots/crawlers that should see client-hydrated version
  const userAgent = req.headers['user-agent']?.toLowerCase() || '';
  
  // Construct path to prerendered HTML file
  const fileName = normalizedPath === '/' ? 'index.html' : `${normalizedPath.slice(1)}.html`;
  const filePath = path.join(prerenderDir, fileName);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.log(`[Prerender] No prerendered file for ${normalizedPath}, falling back to SPA`);
    return next();
  }
  
  // Serve the prerendered HTML
  console.log(`[Prerender] Serving pre-rendered: ${normalizedPath}`);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('X-Prerendered', 'true');
  
  // Cache for 1 hour (revalidate after)
  res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
  
  return res.sendFile(filePath);
}

/**
 * Check if prerendering is available
 */
export function isPrerenderingEnabled(): boolean {
  return prerenderEnabled;
}

/**
 * Get count of prerendered routes
 */
export function getPrerenderStats(): { enabled: boolean; routeCount: number; directory: string } {
  return {
    enabled: prerenderEnabled,
    routeCount: prerenderRoutes.size,
    directory: prerenderDir
  };
}
