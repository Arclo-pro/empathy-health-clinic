/**
 * Shared SEO Configuration
 * 
 * This module contains the SEO configuration that is used by both:
 * 1. The client-side SEOHead component (for dynamic meta tag management)
 * 2. The prerender script (for server-side meta tag injection)
 * 
 * This ensures consistency between the two and allows prerendering to work
 * even when React doesn't hydrate.
 */

export const SEO_DOMAIN = 'https://www.empathyhealthclinic.com';

/**
 * Canonical consolidation paths - pages that should point to a different canonical URL
 * Only thin synonym pages that would cannibalize each other
 */
export const CANONICAL_CONSOLIDATION_PATHS: Record<string, string> = {
  "/psychiatry-orlando": "/psychiatrist-orlando",
  "/psychiatry-clinic-orlando": "/psychiatrist-orlando",
};

/**
 * Noindex paths - pages that should have noindex robots directive and NO canonical tag
 * These pages should be excluded from search engine indexing
 */
export const NOINDEX_PATHS = [
  // Admin and auth pages
  '/admin', '/login', '/auth', '/config', '/debug',
  // Legal/utility pages
  '/privacy-policy', '/privacy', '/terms', '/medical-disclaimer',
  // Confirmation/thank-you pages
  '/thank-you', '/appointment-confirmed', '/success', '/confirmation',
  // Error pages
  '/404', '/not-found',
  // Development/test pages
  '/examples', '/test', '/demo',
  // Media/attachment pages (WordPress legacy)
  '/attachment', '/uploads', '/media',
];

/**
 * Self-canonical exact paths - pages that must ALWAYS be self-canonical (never consolidated)
 * These are high-volume SEO pages with unique search intent
 */
export const SELF_CANONICAL_EXACT_PATHS = [
  // High-volume SEO target pages (unique search intent)
  '/psychiatrist-near-me', '/psychiatrist-orlando', '/psychiatry-near-me',
  '/adhd-psychiatrist-orlando', '/anxiety-psychiatrist-orlando', '/depression-psychiatrist-orlando',
  '/telepsychiatry-orlando', '/bipolar-psychiatrist-orlando', '/child-psychiatrist-orlando',
  '/psychiatric-evaluation-orlando', '/mental-health-clinic-orlando', '/medication-management-orlando',
  '/psychiatrist-for-anxiety-near-me', '/psychiatrist-for-depression-near-me',
  '/same-day-psychiatrist-orlando',
  // Location pages
  '/winter-park', '/lake-mary', '/altamonte-springs', '/sanford', 
  '/kissimmee', '/apopka', '/maitland', '/casselberry', '/oviedo',
  // Treatment/therapy pages
  '/depression-counseling', '/anxiety-therapy', '/adhd-testing-orlando', 
  '/ocd-treatment', '/ptsd-treatment', '/emdr-therapy', '/tms-treatment',
  '/trauma-specialist', '/stress-management', '/couples-counseling',
  '/virtual-therapy', '/virtual-visit', '/teletherapy',
  // Near-me pages
  '/counselor-near-me', '/therapist-near-me', '/mental-health-near-me',
  // Specialty pages
  '/female-therapist-orlando', '/black-psychiatrist-orlando', '/psychotherapist-orlando',
];

/**
 * Self-canonical prefixes - path prefixes for pages that must be self-canonical
 */
export const SELF_CANONICAL_PREFIXES = [
  '/insurance', '/accepts-', '/psychiatrist-winter-park', '/psychiatrist-lake-mary',
  '/psychiatrist-altamonte', '/psychiatrist-sanford', '/psychiatrist-kissimmee',
  '/psychiatrist-apopka', '/psychiatrist-maitland', '/psychiatrist-casselberry',
  '/therapist-winter-park', '/therapist-lake-mary', '/therapist-altamonte',
  '/blog/', // All blog posts should be self-canonical
];

/**
 * Check if a path should be noindex
 */
export function isNoindexPath(path: string): boolean {
  const normalizedPath = path.toLowerCase();
  
  // Check explicit noindex paths (prefix match)
  if (NOINDEX_PATHS.some(pattern => normalizedPath.startsWith(pattern))) {
    return true;
  }
  
  // Tag archive pages (thin content)
  if (normalizedPath.includes('/tag/')) {
    return true;
  }
  
  // Author archive pages (thin content)
  if (normalizedPath.includes('/author/')) {
    return true;
  }
  
  // Paginated pages (noindex, canonical to base)
  if (normalizedPath.includes('/page/')) {
    return true;
  }
  
  return false;
}

/**
 * Check if a path should be self-canonical (never consolidated)
 */
export function isSelfCanonicalPath(path: string): boolean {
  const normalizedPath = path.toLowerCase().replace(/\/$/, '');
  
  // Check exact path matches
  if (SELF_CANONICAL_EXACT_PATHS.some(exactPath => normalizedPath === exactPath)) {
    return true;
  }
  
  // Check prefix matches
  if (SELF_CANONICAL_PREFIXES.some(prefix => normalizedPath.startsWith(prefix))) {
    return true;
  }
  
  return false;
}

/**
 * Get the canonical URL for a given path
 * Returns:
 * - null if the page should not have a canonical (noindex pages)
 * - consolidated target URL if the page should consolidate
 * - self-canonical URL otherwise
 */
export function getCanonicalUrl(path: string): string | null {
  const normalizedPath = path.replace(/\/$/, '') || '/';
  
  // Noindex pages should not have canonical tags
  if (isNoindexPath(normalizedPath)) {
    return null;
  }
  
  // Check if this page should consolidate to another URL
  if (!isSelfCanonicalPath(normalizedPath) && CANONICAL_CONSOLIDATION_PATHS[normalizedPath]) {
    const target = CANONICAL_CONSOLIDATION_PATHS[normalizedPath];
    return normalizedPath === '/' ? SEO_DOMAIN : `${SEO_DOMAIN}${target}`;
  }
  
  // Self-canonical
  return normalizedPath === '/' ? SEO_DOMAIN : `${SEO_DOMAIN}${normalizedPath}`;
}

/**
 * Get the robots meta content for a given path
 */
export function getRobotsContent(path: string): string {
  const normalizedPath = path.replace(/\/$/, '') || '/';
  
  if (isNoindexPath(normalizedPath)) {
    return 'noindex, follow';
  }
  
  return 'index, follow';
}
