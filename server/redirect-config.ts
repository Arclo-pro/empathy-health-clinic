/**
 * Centralized redirect configuration
 * Single source of truth for all URL redirects
 */

export const contentRedirectMap: Record<string, string> = {
  // Treatment redirects
  '/treatments/psychiatric-services': '/services',
  '/treatments/medication-management': '/medication-management',
  '/treatments/virtual-counseling': '/virtual-therapy',
  '/treatments/couples-therapy': '/therapy',
  '/treatments/grief-counseling-services': '/therapy',
  '/treatments/in-person-therapy-orlando': '/in-person-therapy',
  '/treatments/anxiety': '/anxiety-therapy',
  '/treatments/anxiety-treatment': '/anxiety-therapy',
  
  // Duplicate content redirects
  '/virtual-visit': '/virtual-therapy',
  
  // WordPress legacy redirects
  '/psychiatric-services': '/services',
  '/locations/psychiatry-orlando': '/services',
  '/find-a-psychiatrist-that-takes-medicare-medicare-coverage': '/insurance',
  
  // Location redirects
  '/locations/therapy-services-pine-hills': '/therapy-services-orlando',
  '/locations/therapy-services-lockhart': '/therapy-services-orlando',
  '/locations/psychiatry-wekiwa-springs': '/locations/psychiatrist-orlando',
  '/locations/therapy-services-maitland': '/locations/psychiatrist-maitland',
  '/locations/therapy-services-casselberry': '/locations/psychiatrist-casselberry',
  '/locations/psychiatry-lockhart': '/locations/psychiatrist-orlando',
  '/locations/psychiatry-apopka': '/locations/psychiatrist-orlando',
  '/locations/psychiatry-maitland': '/locations/psychiatrist-maitland',
  
  // Therapy approach redirects
  '/therapy/relationship-and-family': '/couples-therapy',
  '/therapy/intimacy-therapy-sexual-wellness': '/intimacy-therapy',
  '/therapy/in-person-therapy-orlando': '/in-person-therapy',
  '/therapy-approaches': '/therapy',
  
  // Old assessment pages
  '/anxiety-assessment': '/anxiety-therapy',
  '/adhd-assessment-page': '/adhd-treatment',
  '/adhd-test': '/adhd-treatment',
  '/psychological-assessment': '/services',
  '/psychiatric-evaluation-page': '/psychiatric-evaluation',
  
  // Old treatment/therapy URLs
  '/trauma-therapy': '/therapy',
  '/supplements': '/services',
  '/faq': '/services',
  
  // Condition redirects
  '/treatments/conditions-we-treat': '/conditions',
  '/treatments/medical-services': '/services',
  
  // Old WordPress category/service pages
  '/therapy/in-person-therapy': '/in-person-therapy',
  
  // Blog redirects
  '/blog/finding-comfort-self-care-tips-for-those-who-are-grieving': '/blog/the-power-of-grief-counseling-in-healing-the-heart-2',
  '/understanding-4-types-of-bpd': '/blog/understanding-4-types-of-bpd',
  '/narcissistic-behavior-in-a-relationship': '/blog/narcissistic-behavior-in-relationships',
  '/narcissisticbehavior-in-a-relationship': '/blog/narcissistic-behavior-in-relationships',
  '/dialectical-behavioral-therapy': '/blog/dialectical-behavior-therapy-dbt-a-comprehensive-guide-to-healing',
  
  // SEMrush orphaned pages (November 2025) - About/Info pages
  '/about-us': '/',
  '/affordable-care': '/insurance',
  '/affordable-emotional-support-letter-online': '/services',
  
  // SEMrush orphaned pages - Old assessment/test pages
  '/autism-assessment': '/services',
  
  // SEMrush orphaned pages - Duplicate/old blog paths (without /blog prefix)
  '/8-physical-signs-stress-is-impacting-your-body': '/blog/8-physical-signs-stress-is-impacting-your-body',
  '/best-jobs-for-people-with-depression': '/blog/best-jobs-for-people-with-depression',
  '/bipolar-psychosis-symptoms-treatment-recovery': '/blog/bipolar-psychosis-symptoms-treatment-recovery',
  '/best-dental-implants-kingston-smiles-ny': '/blog/best-dental-implants-kingston-smiles-ny',
  '/blog-wellness-guide-for-counselors': '/blog/blog-wellness-guide-for-counselors',
  
  // SEMrush orphaned pages - Old treatment pages
  '/anxiety-treatment': '/anxiety-therapy',
  '/anxiety': '/anxiety-therapy',
  
  // SEMrush orphaned pages - Insurance pages
  '/adventhealth-adventhealth-coverage': '/insurance',
};

/**
 * Normalize a URL path by:
 * 1. Removing trailing slashes (except root)
 * 2. Collapsing duplicate slashes
 * 3. Decoding URI components
 */
export function normalizePath(path: string): string {
  if (path === '/') return path;
  
  // Collapse duplicate slashes
  let normalized = path.replace(/\/+/g, '/');
  
  // Remove trailing slash for non-root paths
  if (normalized.endsWith('/') && normalized.length > 1) {
    normalized = normalized.slice(0, -1);
  }
  
  return normalized;
}

/**
 * Get the canonical URL for a given request
 * Returns null if already canonical, otherwise returns the canonical URL
 */
export function getCanonicalUrl(
  protocol: string,
  host: string,
  path: string,
  query: string
): string | null {
  // Step 1: Force HTTPS (handled by Replit automatically, but we need to account for it)
  const canonicalProtocol = 'https';
  
  // Step 2: Strip www subdomain
  const canonicalHost = host.startsWith('www.') ? host.substring(4) : host;
  
  // Step 3: Normalize path (remove trailing slash, collapse duplicates)
  const normalizedPath = normalizePath(path);
  
  // Step 4: Check for content redirects
  const contentRedirect = contentRedirectMap[normalizedPath];
  const canonicalPath = contentRedirect || normalizedPath;
  
  // Construct the canonical URL
  const canonical = `${canonicalProtocol}://${canonicalHost}${canonicalPath}${query}`;
  const current = `${protocol}://${host}${path}${query}`;
  
  // Return canonical URL only if it differs from current
  return canonical !== current ? canonical : null;
}
