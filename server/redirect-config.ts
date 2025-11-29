/**
 * Centralized redirect configuration
 * Single source of truth for all URL redirects
 */

// Import blog slug cache checker (will be set at runtime)
let blogSlugChecker: ((slug: string) => boolean) | null = null;

export function setBlogSlugChecker(checker: (slug: string) => boolean): void {
  blogSlugChecker = checker;
}

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
  '/bipolar-disorder': '/bipolar-disorder-treatment',
  '/depression': '/depression-treatment',
  
  // Old WordPress category/service pages
  '/therapy/in-person-therapy': '/in-person-therapy',
  
  // Blog redirects - slug changes (old slug → new slug)
  '/blog/finding-comfort-self-care-tips-for-those-who-are-grieving': '/blog/the-power-of-grief-counseling-in-healing-the-heart-2',
  '/narcissistic-behavior-in-a-relationship': '/blog/narcissistic-behavior-in-relationships',
  '/narcissisticbehavior-in-a-relationship': '/blog/narcissistic-behavior-in-relationships',
  '/dialectical-behavioral-therapy': '/blog/dialectical-behavior-therapy-dbt-a-comprehensive-guide-to-healing',
  '/blog-wellness-guide-for-counselors': '/blog/wellness-guide-for-counselors',
  '/breaking-the-cycle-a-guide-to-overcoming-toxic-relationship-patterns': '/blog/how-to-leave-toxic-relationship',
  
  // Note: /{slug} → /blog/{slug} redirects (where slug is identical) are handled automatically 
  // by dynamic blog slug checker. No need to list them here (prevents Google canonical confusion).
  
  // SEMrush orphaned pages (November 2025) - About/Info pages
  '/about-us': '/',
  '/about': '/',
  '/affordable-care': '/insurance',
  '/affordable-emotional-support-letter-online': '/services',
  
  // SEMrush orphaned pages - Old assessment/test pages
  '/autism-assessment': '/services',
  
  // SEMrush orphaned pages - Old treatment pages
  '/anxiety-treatment': '/anxiety-therapy',
  '/anxiety': '/anxiety-therapy',
  '/treatments/therapy-treatment': '/therapy',
  '/treatments/concentration-and-focus': '/adhd-treatment',
  '/concentration-and-focus': '/adhd-treatment',
  
  // SEMrush orphaned pages - Insurance pages
  '/adventhealth-adventhealth-coverage': '/insurance',
  
  // Google Search Console - Legacy URLs (November 2025)
  '/therapy-services-orlando-mental-health-support': '/therapy-services-orlando',
  '/hm05': '/services',
  
  // Google Search Console - Page with redirect errors (November 2025)
  // Home page variants
  '/home': '/',
  
  // Treatment page redirects
  '/treatments/adhd': '/adhd-treatment',
  '/treatments/bipolar-disorder': '/bipolar-disorder-treatment',
  '/treatments/therapy-services': '/therapy',
  '/adhd': '/adhd-treatment',
  
  // Therapy subcategory redirects
  '/therapy/lgbt-therapy-services': '/therapy',
  
  // Location service redirects
  '/locations/therapy-services-apopka': '/therapy-services-orlando',
  '/locations/therapy-services-oviedo': '/therapy-services-orlando',
  '/locations/therapy-services-richmond-heights': '/therapy-services-orlando',
  '/locations/psychiatry-winter-park': '/locations/psychiatrist-winter-park',
  
  // Pricing and contact pages
  '/pricing': '/insurance',
  '/contact': '/contact-us',
  
  // Medication management
  '/medication-management': '/services',
  
  // WordPress author and tag pages - redirect to blog
  '/author/rachelleandreaastudillo': '/blog',
  '/author/reganalex30': '/blog',
  '/tag/adhd-diagnostic-evaluation': '/blog',
  '/tag/best-ai-scribes-for-doctors': '/blog',
  '/tag/stress-management': '/blog',
  '/tag/psychiatrist-orlando-fl': '/blog',
  '/tag/continuing-education-for-nurses': '/blog',
  '/tag/psychiatry-technology': '/blog',
  
  // WordPress date archives - redirect to blog
  '/2025/09/25': '/blog',
  '/2025/09/27': '/blog',
  '/2025/09/28': '/blog',
  '/2025/09/29': '/blog',
  '/2025/09/30': '/blog',
  
  // Query parameter pages
  '/treatments/adhd-treatment': '/adhd-treatment',
  
  // Treatment/therapy pages
  '/therapy-treatment': '/therapy',
  '/treatments/orlando-marriage-counseling-services': '/couples-therapy',
  '/treatments/intimacy-therapy-sexual-wellness': '/intimacy-therapy',
  
  // Location pages
  '/locations/therapy-services-lockhart': '/therapy-services-orlando',
  '/locations/psychiatry-oviedo': '/locations/psychiatrist-orlando',
  
  // Tag pages
  '/tag/housing-accommodation-rights': '/blog',
  '/tag/neuroscience-research': '/blog',
  
  // Date archives
  '/2025/10/01': '/blog',
  '/2025/10/06': '/blog',
  
  // Resources page
  '/resources': '/blog',
  
  // Google Search Console - Canonical tag issues (November 2025)
  // Blog post doesn't exist in system, redirect to blog listing
  '/blog/varicose-veins-and-mental-health': '/blog',
  
  // Google Search Console - Soft 404 Fixes (November 23, 2025)
  // LGBT/Therapy Services
  '/lgbt-therapy-services': '/therapy',
  '/treatments/lgbt-therapy-services': '/therapy',
  '/orlando-couples-therapy': '/couples-therapy',
  
  // Location pages - redirect to main therapy services
  '/locations': '/services',
  '/locations/therapy-services-orlando-2': '/therapy-services-orlando',
  '/locations/therapy-services-wekiwa-springs': '/therapy-services-orlando',
  '/locations/therapy-services-aloma': '/therapy-services-orlando',
  '/locations/therapy-services-shores': '/therapy-services-orlando',
  '/locations/psychiatrist-winter-park': '/locations/psychiatrist-winter-park',
  '/therapy-services-orlando': '/therapy-services-orlando',
  
  // Therapy modality pages
  '/therapy/in-person-therapy-2': '/in-person-therapy',
  '/therapy/emdr': '/emdr-therapy',
  '/therapy/dialectical-behavioral-therapy': '/therapy',
  '/therapy/therapy-approaches': '/therapy',
  '/therapy/toxic-relationship-therapy': '/couples-therapy',
  '/cbt-therapy': '/therapy',
  
  // Condition pages
  '/ptsd': '/anxiety-therapy',
  '/post-traumatic-stress-disorder-ptsd': '/anxiety-therapy',
  '/conditions/post-traumatic-stress-disorder-ptsd': '/anxiety-therapy',
  '/ocd': '/anxiety-therapy',
  '/relationship-issues': '/couples-therapy',
  '/conditions/relationship-issues': '/couples-therapy',
  '/conditions': '/services',
  
  // Treatment pages
  '/treatments': '/services',
  '/telehealth-psychiatry': '/virtual-therapy',
  '/intensive-outpatient': '/services',
  '/family-therapy': '/therapy',
  '/group-therapy': '/therapy',
  '/therapy-services': '/therapy',
  '/crisis-support': '/services',
  '/intimacy-therapy-sexual-wellness': '/couples-therapy',
  '/orlando-marriage-counseling-services': '/couples-therapy',
  
  // Insurance provider pages - redirect to main insurance page
  '/find-a-psychiatrist-that-takes-blue-cross-blue-shield-bcbs-coverage': '/insurance',
  '/find-a-psychiatrist-that-takes-curative-health-insurance-curative-coverage': '/insurance',
  '/find-a-psychiatrist-that-takes-adventhealth-adventhealth-coverage': '/insurance',
  '/find-a-psychiatrist-that-takes-optum-optum-coverage': '/insurance',
  '/find-a-psychiatrist-that-takes-aetna-aetna-coverage': '/insurance',
  '/find-a-psychiatrist-that-takes-first-health-network-first-health-coverage': '/insurance',
  '/find-a-psychiatrist-that-takes-cigna-healthcare-cigna-coverage': '/insurance',
  
  
  // Old treatment structure redirects
  '/treatments/[bipolar](/bipolar-disorder': '/bipolar-disorder-treatment',
  '/treatments/bipolar-disorder-therapy/photo-by-transly-translation-agency': '/bipolar-disorder-treatment',
  
  // WordPress/legacy pages
  '/health-wellness-blog': '/blog',
  '/hipaa': '/privacy-policy',
  '/blog/narcissistic-personality-disorder-treatment': '/blog',
  
  // ESA letter page
  '/florida-esa-letter-get-your-emotional-support-animal-letter-empathy-health-clinic-2': '/services',
  
  // Google Search Console - Crawled but not indexed (November 2025)
  // Malformed URL redirects
  '/how-[emdr](/emdr-therapy': '/emdr-therapy',
  
  // Blog feed URLs that should not exist
  '/top-5-ai-scribes-psychiatrists-are-actually-using-in-2025/feed': '/blog',
  '/blog/acls-discount-codes-foreign-trained-healthcare-workers': '/blog',
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
 * Query parameters that should be stripped for SEO purposes
 * These are tracking/analytics parameters that don't affect page content
 */
const STRIP_QUERY_PARAMS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'ref', 'fbclid', 'gclid', 'msclkid', 'dclid',
  'mc_cid', 'mc_eid', 'oly_enc_id', 'oly_anon_id',
  '_ga', '_gl', 'hsCtaTracking', 'hsa_acc', 'hsa_cam', 'hsa_grp', 'hsa_ad', 'hsa_src', 'hsa_tgt', 'hsa_kw', 'hsa_mt', 'hsa_net', 'hsa_ver',
];

/**
 * Strip tracking query parameters for clean canonical URLs
 */
function stripTrackingParams(query: string): string {
  if (!query || query === '?' || !query.startsWith('?')) {
    return '';
  }
  
  const params = new URLSearchParams(query.slice(1));
  const cleanParams = new URLSearchParams();
  
  for (const [key, value] of params.entries()) {
    // Keep parameter if it's not in the strip list
    if (!STRIP_QUERY_PARAMS.includes(key.toLowerCase())) {
      cleanParams.set(key, value);
    }
  }
  
  const cleanQuery = cleanParams.toString();
  return cleanQuery ? `?${cleanQuery}` : '';
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
  // Step 1: Force HTTPS (but skip for localhost in development)
  const isLocalhost = host.includes('localhost') || host.includes('127.0.0.1');
  const canonicalProtocol = isLocalhost ? protocol : 'https';
  
  // Step 2: Strip www subdomain
  const canonicalHost = host.startsWith('www.') ? host.substring(4) : host;
  
  // Step 3: Normalize path (remove trailing slash, collapse duplicates)
  const normalizedPath = normalizePath(path);
  
  // Step 4: Strip tracking query parameters
  const cleanQuery = stripTrackingParams(query);
  
  // Step 5: Check for content redirects in the map
  let canonicalPath = contentRedirectMap[normalizedPath];
  
  // Step 6: Check if this is a blog post slug (dynamic redirect)
  if (!canonicalPath && blogSlugChecker) {
    const segments = normalizedPath.split('/').filter(s => s.length > 0);
    
    // Only check single-segment paths (e.g., /foo but not /foo/bar)
    if (segments.length === 1) {
      const slug = segments[0];
      
      // Check if this slug matches a blog post
      if (blogSlugChecker(slug)) {
        canonicalPath = `/blog/${slug}`;
      }
    }
  }
  
  // If no redirect found, use the normalized path
  if (!canonicalPath) {
    canonicalPath = normalizedPath;
  }
  
  // Construct the canonical URL
  const canonical = `${canonicalProtocol}://${canonicalHost}${canonicalPath}${cleanQuery}`;
  const current = `${protocol}://${host}${path}${query}`;
  
  // Return canonical URL only if it differs from current
  return canonical !== current ? canonical : null;
}
