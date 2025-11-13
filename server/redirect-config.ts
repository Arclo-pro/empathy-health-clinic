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
  '/blog-wellness-guide-for-counselors': '/blog/wellness-guide-for-counselors',
  
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
  
  // Old blog post paths (without /blog prefix)
  '/who-cheats-more-men-or-women': '/blog/who-cheats-more-men-or-women',
  '/ltr-relationship-meaning-guide': '/blog/ltr-relationship-meaning-guide',
  '/mood-disorder-questionnaire': '/blog/mood-disorder-questionnaire',
  '/overcoming-social-anxiety': '/blog/overcoming-social-anxiety',
  '/understanding-cognitive-behavioral-therapy-cbt-a-guide-to-mental-wellness': '/blog/understanding-cognitive-behavioral-therapy-cbt-a-guide-to-mental-wellness',
  '/practical-strategies-for-managing-anxiety-in-daily-life': '/blog/practical-strategies-for-managing-anxiety-in-daily-life',
  '/what-is-mental-breakdown': '/blog/what-is-mental-breakdown',
  
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
  
  // Google Search Console - Soft 404 errors (November 2025)
  // Blog posts without /blog prefix
  '/understanding-identity-exploration': '/blog/understanding-identity-exploration',
  '/can-you-pass-out-from-a-panic-attack': '/blog/can-you-pass-out-from-a-panic-attack',
  '/prodromal-stage-mental-health': '/blog/prodromal-stage-mental-health',
  '/jobs-for-people-with-anxiety': '/blog/jobs-for-people-with-anxiety',
  '/silent-panic-attacks-causes-symptoms-relief': '/blog/silent-panic-attacks-causes-symptoms-relief',
  '/bpd-vs-npd': '/blog/bpd-vs-npd',
  '/open-relationship-guide': '/blog/open-relationship-guide',
  '/how-to-leave-toxic-relationship': '/blog/how-to-leave-toxic-relationship',
  '/understanding-the-4-types-of-bpd': '/blog/understanding-the-4-types-of-bpd',
  '/is-more-espresso-less-depresso-true': '/blog/is-more-espresso-less-depresso-true',
  '/reactive-attachment-disorder-in-adults': '/blog/reactive-attachment-disorder-in-adults',
  '/what-is-time-blindness': '/blog/what-is-time-blindness',
  '/school-psychology-career-guide': '/blog/school-psychology-career-guide',
  '/understanding-adhd-masking': '/blog/understanding-adhd-masking',
  '/top-5-ai-scribes-psychiatrists-are-actually-using-in-2025': '/blog/top-5-ai-scribes-psychiatrists-are-actually-using-in-2025',
  '/bpd-men-guide': '/blog/bpd-men-guide',
  '/unburdened-the-key-to-mental-clarity': '/blog/unburdened-the-key-to-mental-clarity',
  '/overcoming-anxiety-with-cognitive-behavioral-therapy': '/blog/overcoming-anxiety-with-cognitive-behavioral-therapy',
  '/hidden-anxiety-treatment-dbt-skills-you-can-use-at-home': '/blog/hidden-anxiety-treatment-dbt-skills-you-can-use-at-home',
  '/cbt-therapy-improving-mental-health-in-winter-park': '/blog/cbt-therapy-improving-mental-health-in-winter-park',
  
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
  
  // Step 4: Check for content redirects in the map
  let canonicalPath = contentRedirectMap[normalizedPath];
  
  // Step 5: Check if this is a blog post slug (dynamic redirect)
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
  const canonical = `${canonicalProtocol}://${canonicalHost}${canonicalPath}${query}`;
  const current = `${protocol}://${host}${path}${query}`;
  
  // Return canonical URL only if it differs from current
  return canonical !== current ? canonical : null;
}
