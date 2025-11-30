import { useEffect } from "react";

const BRAND_SUFFIX = "Empathy Health Clinic";
const MAX_TITLE_LENGTH = 60;
const MAX_DESCRIPTION_LENGTH = 160;
const MIN_DESCRIPTION_LENGTH = 80;

/**
 * Normalize title to Title Case for consistency
 * Handles common lowercase words that should stay lowercase
 */
function toTitleCase(str: string): string {
  const lowercaseWords = new Set(['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'by', 'in', 'of']);
  
  return str.split(' ').map((word, index) => {
    // Keep first word capitalized, check for lowercase words
    if (index === 0 || !lowercaseWords.has(word.toLowerCase())) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return word.toLowerCase();
  }).join(' ');
}

/**
 * Ensure title has brand suffix, proper casing, and is within length limits
 * - Normalizes to Title Case
 * - Adds "| Empathy Health Clinic" if missing
 * - Trims to 60 characters max with ellipsis
 */
function formatTitle(title: string): string {
  // Extract main title (before any brand suffix)
  const mainTitle = title.replace(/\s*[\|\-]\s*Empathy.*$/i, '').trim();
  
  // Apply title case to the main title only (not brand suffix)
  const normalizedMain = toTitleCase(mainTitle);
  
  // Always add the brand suffix (normalized main title + brand)
  let fullTitle = `${normalizedMain} | ${BRAND_SUFFIX}`;
  
  // Trim if over max length
  if (fullTitle.length > MAX_TITLE_LENGTH) {
    // Try to preserve the brand by trimming the main title
    const brandPart = ` | ${BRAND_SUFFIX}`;
    const mainTitleMaxLength = MAX_TITLE_LENGTH - brandPart.length - 1; // -1 for ellipsis
    
    if (mainTitleMaxLength > 20) {
      // Enough room for meaningful title + brand
      const trimmedMain = normalizedMain.length > mainTitleMaxLength 
        ? normalizedMain.slice(0, mainTitleMaxLength).trim() + '…'
        : normalizedMain;
      fullTitle = `${trimmedMain}${brandPart}`;
    } else {
      // Just trim the whole thing
      fullTitle = fullTitle.slice(0, MAX_TITLE_LENGTH - 1).trim() + '…';
    }
  }
  
  return fullTitle;
}

/**
 * Trim meta description to optimal length for Google SERP
 * - Max 160 characters with ellipsis if truncated
 * - Tries to end at word boundary for readability
 */
function trimDescription(description: string): string {
  if (!description || description.length <= MAX_DESCRIPTION_LENGTH) {
    return description || '';
  }
  
  // Find the last space before the limit to avoid cutting words
  const trimPoint = description.lastIndexOf(' ', MAX_DESCRIPTION_LENGTH - 1);
  const cutoff = trimPoint > 100 ? trimPoint : MAX_DESCRIPTION_LENGTH - 1;
  
  return description.slice(0, cutoff).trim() + '…';
}

/**
 * Generate fallback meta description when none provided
 * Uses title to create a contextual, YMYL-compliant description
 */
function generateFallbackDescription(title: string): string {
  const cleanTitle = title.replace(/\s*[\|\-]\s*Empathy.*$/i, '').trim();
  return `${cleanTitle}. Expert psychiatric care in Orlando, FL. Same-week appointments. Insurance accepted. Safe, compassionate treatment.`;
}

/**
 * Format meta description for SEO compliance
 * - Ensures non-empty description with fallback
 * - Trims to max 160 characters
 * - Validates minimum length for quality
 */
function formatDescription(description: string, title: string): string {
  // Use fallback if description is empty or too short
  let finalDescription = description && description.trim().length >= MIN_DESCRIPTION_LENGTH
    ? description.trim()
    : generateFallbackDescription(title);
  
  // Trim to max length
  return trimDescription(finalDescription);
}

// ============ CANONICAL CONFIGURATION ============

/**
 * Orlando cluster pages that should canonicalize to the primary ranking page
 * These pages all target "psychiatrist orlando" keywords and would cannibalize each other
 */
const CANONICAL_CONSOLIDATION_PATHS: Record<string, string> = {
  "/psychiatry-orlando": "/psychiatrist-orlando",
  "/psychiatry-clinic-orlando": "/psychiatrist-orlando",
  "/anxiety-psychiatrist-orlando": "/psychiatrist-orlando",
  "/medication-management-orlando": "/psychiatrist-orlando",
  "/adhd-psychiatrist-orlando": "/psychiatrist-orlando",
  "/same-day-psychiatrist-orlando": "/psychiatrist-orlando",
  "/bipolar-psychiatrist-orlando": "/psychiatrist-orlando",
  "/child-psychiatrist-orlando": "/psychiatrist-orlando",
  "/telepsychiatry-orlando": "/psychiatrist-orlando",
  "/psychiatrist-near-me": "/psychiatrist-orlando",
  "/psychiatric-evaluation-orlando": "/psychiatrist-orlando",
};

/**
 * Pages that MUST be self-canonical (never consolidate)
 * These are EXACT path matches or start-with patterns to avoid substring false positives
 * Example: "/ptsd" should not match "/about-ptsd-treatment"
 */
const SELF_CANONICAL_EXACT_PATHS = [
  '/winter-park', '/lake-mary', '/altamonte-springs', '/sanford', 
  '/kissimmee', '/apopka', '/maitland', '/casselberry', '/oviedo',
  '/depression-counseling', '/anxiety-therapy', '/adhd-testing-orlando', 
  '/ocd-treatment', '/ptsd-treatment', '/emdr-therapy', '/tms-treatment',
  '/trauma-specialist', '/stress-management', '/couples-counseling',
  '/virtual-therapy', '/virtual-visit', '/teletherapy',
  '/counselor-near-me', '/therapist-near-me', '/mental-health-near-me',
  '/female-therapist-orlando', '/black-psychiatrist-orlando', '/psychotherapist-orlando',
];

/**
 * Path prefixes for self-canonical pages (match start of path)
 */
const SELF_CANONICAL_PREFIXES = [
  '/insurance', '/accepts-', '/psychiatrist-winter-park', '/psychiatrist-lake-mary',
  '/psychiatrist-altamonte', '/psychiatrist-sanford', '/psychiatrist-kissimmee',
  '/psychiatrist-apopka', '/psychiatrist-maitland', '/psychiatrist-casselberry',
  '/therapist-winter-park', '/therapist-lake-mary', '/therapist-altamonte',
];

/**
 * Noindex utility pages that should NOT have canonical tags
 */
const NOINDEX_PATHS = [
  '/admin', '/login', '/privacy-policy', '/privacy', '/terms',
  '/medical-disclaimer', '/thank-you', '/appointment-confirmed',
  '/404', '/not-found', '/examples', '/test'
];

/**
 * Check if a path should be self-canonical (never consolidated)
 * Uses exact path matching and prefix matching to avoid false positives
 */
function isSelfCanonicalPath(path: string): boolean {
  const normalizedPath = path.toLowerCase().replace(/\/$/, ''); // Remove trailing slash
  
  // Check exact path matches
  if (SELF_CANONICAL_EXACT_PATHS.some(exactPath => normalizedPath === exactPath)) {
    return true;
  }
  
  // Check prefix matches (path starts with pattern)
  if (SELF_CANONICAL_PREFIXES.some(prefix => normalizedPath.startsWith(prefix))) {
    return true;
  }
  
  return false;
}

/**
 * Check if a path is a noindex utility page (skip canonical)
 */
function isNoindexPage(path: string): boolean {
  const normalizedPath = path.toLowerCase();
  return NOINDEX_PATHS.some(pattern => normalizedPath.startsWith(pattern));
}

/**
 * Check if path is a paginated URL (blog pagination)
 */
function isPaginatedPath(path: string, search: string): boolean {
  return search.includes('page=') || path.includes('page=');
}

/**
 * Get the base path for pagination (strip page parameter)
 */
function getBasePaginationPath(path: string): string {
  return path.split('?')[0].split('#')[0];
}

// ============ KEYWORD PROCESSING ============

const MAX_KEYWORDS = 7;
const MIN_KEYWORDS = 3;

const UTILITY_PAGE_PATHS = [
  '/admin', '/login', '/privacy', '/privacy-policy', '/terms', 
  '/medical-disclaimer', '/thank-you', '/appointment-confirmed',
  '/404', '/not-found'
];

const LOCAL_PAGE_PATTERNS = [
  'orlando', 'winter-park', 'altamonte', 'lake-mary', 'sanford',
  'kissimmee', 'apopka', 'maitland', 'casselberry'
];

const GEO_KEYWORD_MAP: Record<string, string[]> = {
  'orlando': ['orlando fl', 'orlando florida', 'central florida'],
  'winter-park': ['winter park fl', 'winter park florida', 'orlando area'],
  'altamonte': ['altamonte springs fl', 'altamonte springs florida', 'orlando area'],
  'lake-mary': ['lake mary fl', 'lake mary florida', 'seminole county'],
  'sanford': ['sanford fl', 'sanford florida', 'seminole county'],
  'kissimmee': ['kissimmee fl', 'kissimmee florida', 'osceola county'],
  'apopka': ['apopka fl', 'apopka florida', 'orange county'],
  'maitland': ['maitland fl', 'maitland florida', 'orlando area'],
  'casselberry': ['casselberry fl', 'casselberry florida', 'seminole county'],
};

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'up', 'about', 'into', 'through', 'during',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
  'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might',
  'must', 'shall', 'can', 'need', 'our', 'your', 'we', 'you', 'they', 'it'
]);

/**
 * Check if path is a utility page that should NOT have keywords
 */
function isUtilityPage(path: string): boolean {
  const normalizedPath = path.toLowerCase();
  return UTILITY_PAGE_PATHS.some(utilPath => 
    normalizedPath.startsWith(utilPath) || normalizedPath === utilPath
  );
}

/**
 * Check if page is canonicalized to another URL (should suppress keywords)
 * Only applies to pages that are in consolidation map AND not self-canonical
 */
function isCanonicalSuppressed(path: string): boolean {
  const normalizedPath = path.toLowerCase();
  return Object.keys(CANONICAL_CONSOLIDATION_PATHS).includes(normalizedPath) && 
         !isSelfCanonicalPath(normalizedPath);
}

/**
 * Check if path is a local/geo page that needs location keywords
 */
function isLocalPage(path: string): boolean {
  const normalizedPath = path.toLowerCase();
  return LOCAL_PAGE_PATTERNS.some(pattern => normalizedPath.includes(pattern));
}

/**
 * Get path-specific geo keywords based on the location in the URL
 */
function getGeoKeywords(path: string): string[] {
  const normalizedPath = path.toLowerCase();
  
  for (const pattern of LOCAL_PAGE_PATTERNS) {
    if (normalizedPath.includes(pattern)) {
      return GEO_KEYWORD_MAP[pattern] || ['orlando fl', 'central florida'];
    }
  }
  
  return ['orlando fl', 'central florida'];
}

/**
 * Generate fallback keywords from page title
 */
function generateFallbackKeywords(title: string, path: string): string[] {
  const cleanTitle = title.replace(/\s*[\|\-]\s*Empathy.*$/i, '').trim().toLowerCase();
  
  // Extract meaningful words from title
  const words = cleanTitle.split(/\s+/).filter(word => 
    word.length > 2 && !STOP_WORDS.has(word)
  );
  
  const keywords: string[] = [];
  
  // Add the main topic phrase
  if (words.length >= 2) {
    keywords.push(words.slice(0, 3).join(' '));
  }
  
  // Add individual important words
  words.slice(0, 3).forEach(word => {
    if (!keywords.includes(word)) {
      keywords.push(word);
    }
  });
  
  // Add path-specific geo keywords for local pages
  if (isLocalPage(path)) {
    const geoTerms = getGeoKeywords(path);
    geoTerms.slice(0, 2).forEach(geo => {
      if (!keywords.includes(geo)) {
        keywords.push(geo);
      }
    });
  }
  
  // Always add core service keywords
  keywords.push('psychiatrist orlando');
  keywords.push('mental health');
  
  return keywords;
}

/**
 * Format and normalize keywords for SEO compliance
 * - Skips utility and canonicalized pages
 * - Generates fallback if empty
 * - Normalizes to lowercase, comma-separated
 * - Enforces 3-7 keyword limit
 * - Removes duplicates
 * - Backfills to meet minimum count
 */
function formatKeywords(
  keywords: string[] | undefined, 
  title: string, 
  path: string
): string | undefined {
  // Skip keywords for utility pages
  if (isUtilityPage(path)) {
    return undefined;
  }
  
  // Skip keywords for canonicalized pages to prevent cannibalization
  if (isCanonicalSuppressed(path)) {
    return undefined;
  }
  
  // Get keywords array (use fallback if empty or insufficient)
  let keywordList = keywords && keywords.length >= MIN_KEYWORDS 
    ? keywords 
    : generateFallbackKeywords(title, path);
  
  // Normalize: lowercase, trim, remove empty
  keywordList = keywordList
    .map(k => k.toLowerCase().replace(/;/g, ',').trim())
    .filter(k => k.length > 0);
  
  // Remove duplicates
  keywordList = [...new Set(keywordList)];
  
  // Backfill if below minimum count
  if (keywordList.length < MIN_KEYWORDS) {
    // Add path-specific geo keywords first
    const geoTerms = getGeoKeywords(path);
    for (const geo of geoTerms) {
      if (keywordList.length >= MIN_KEYWORDS) break;
      if (!keywordList.includes(geo)) {
        keywordList.push(geo);
      }
    }
    
    // Add core service keywords if still needed
    const coreKeywords = ['psychiatrist orlando', 'mental health', 'therapy orlando', 'counseling orlando'];
    for (const core of coreKeywords) {
      if (keywordList.length >= MIN_KEYWORDS) break;
      if (!keywordList.includes(core)) {
        keywordList.push(core);
      }
    }
  }
  
  // Enforce max keyword limit (3-7)
  if (keywordList.length > MAX_KEYWORDS) {
    keywordList = keywordList.slice(0, MAX_KEYWORDS);
  }
  
  return keywordList.length > 0 ? keywordList.join(', ') : undefined;
}

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalPath?: string;
  type?: "website" | "article";
  publishedDate?: string;
  modifiedDate?: string;
  author?: string;
  jsonLd?: object;
  pageDesignType?: string;
  preloadImage?: string;
  breadcrumbTitle?: string;
}

export default function SEOHead({
  title,
  description,
  keywords,
  ogImage,
  canonicalPath,
  type = "website",
  publishedDate,
  modifiedDate,
  author,
  jsonLd,
  pageDesignType,
  preloadImage,
  breadcrumbTitle,
}: SEOHeadProps) {
  useEffect(() => {
    // Format title: add brand suffix, enforce max length
    const formattedTitle = formatTitle(title);
    document.title = formattedTitle;
    
    // Format description: fallback for empty, trim to max length
    const formattedDescription = formatDescription(description, title);

    /**
     * Normalize path for canonical URL:
     * - Handles absolute URLs by extracting pathname
     * - Strips tracking parameters (fbclid, utm_*, hsa_*, etc.)
     * - Normalizes slashes and trailing slashes
     * - Handles malformed URLs gracefully
     */
    const normalizePath = (path: string): string => {
      if (!path) return '/';
      
      try {
        let cleanPath = path;
        
        // If absolute URL, extract pathname only
        if (path.startsWith('http://') || path.startsWith('https://')) {
          try {
            const url = new URL(path);
            cleanPath = url.pathname;
          } catch {
            // Malformed absolute URL - fallback to root
            console.warn('SEO: Malformed absolute URL:', path);
            return '/';
          }
        }
        
        // Strip query parameters and fragments entirely from canonical URLs
        cleanPath = cleanPath.split('?')[0].split('#')[0];
        
        // Normalize multiple slashes
        cleanPath = cleanPath.replace(/\/+/g, '/');
        
        // Ensure leading slash
        if (!cleanPath.startsWith('/')) {
          cleanPath = '/' + cleanPath;
        }
        
        // Remove trailing slash (except for root)
        if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
          cleanPath = cleanPath.slice(0, -1);
        }
        
        // Trim whitespace and decode
        cleanPath = decodeURIComponent(cleanPath.trim());
        
        // Validate it's a proper path
        if (!cleanPath || cleanPath === ' ' || !cleanPath.startsWith('/')) {
          return '/';
        }
        
        return cleanPath;
      } catch (e) {
        // Fallback for malformed URLs
        console.warn('SEO: Invalid canonical path:', path);
        return '/';
      }
    };

    const preferredDomain = "https://empathyhealthclinic.com";
    const currentSearch = window.location.search;
    const rawPath = canonicalPath || window.location.pathname;
    
    // Check pagination BEFORE normalizing (normalizePath strips query params)
    const isPaginated = isPaginatedPath(rawPath, currentSearch);
    
    // Normalize the path (strips query params, trailing slashes, etc.)
    let normalizedPath = normalizePath(rawPath);
    
    // For paginated URLs, canonical should point to base path (e.g., /blog)
    // Query params are already stripped by normalizePath, so just use base path
    
    // Determine if this page should have a canonical tag at all
    // Noindex utility pages and paginated pages should NOT be indexed
    const isNoindex = isNoindexPage(normalizedPath);
    const shouldHaveCanonical = !isNoindex;
    
    // Apply canonical consolidation ONLY if NOT a self-canonical page
    // Self-canonical pages (location, insurance, condition pages) must stay self-canonical
    if (!isSelfCanonicalPath(normalizedPath) && CANONICAL_CONSOLIDATION_PATHS[normalizedPath]) {
      normalizedPath = CANONICAL_CONSOLIDATION_PATHS[normalizedPath];
    }
    
    const canonicalUrl = `${preferredDomain}${normalizedPath}`;
    const currentUrl = canonicalUrl;
    const defaultOgImage = ogImage || `${preferredDomain}/attached_assets/stock_images/peaceful_green_fores_98e1a8d8.jpg`;

    // Set robots based on page type:
    // - noindex for utility pages (admin, privacy-policy, etc.)
    // - noindex for paginated pages (they point to base canonical)
    const shouldNoindex = isNoindex || isPaginated;
    const robotsContent = shouldNoindex ? "noindex, follow" : "index, follow";
    
    const metaTags = [
      { name: "description", content: formattedDescription },
      { name: "robots", content: robotsContent },
      { property: "og:title", content: formattedTitle },
      { property: "og:description", content: formattedDescription },
      { property: "og:image", content: defaultOgImage },
      { property: "og:url", content: currentUrl },
      { property: "og:type", content: type },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: formattedTitle },
      { name: "twitter:description", content: formattedDescription },
      { name: "twitter:image", content: defaultOgImage },
    ];

    const searchConsoleVerification = import.meta.env.VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION;
    if (searchConsoleVerification) {
      metaTags.push({ name: "google-site-verification", content: searchConsoleVerification });
    }

    // Format keywords: normalize, dedupe, enforce limits, skip utility pages
    const currentPath = normalizePath(window.location.pathname);
    const formattedKeywords = formatKeywords(keywords, title, currentPath);
    if (formattedKeywords) {
      metaTags.push({ name: "keywords", content: formattedKeywords });
    }

    if (author) {
      metaTags.push({ name: "author", content: author });
    }

    if (publishedDate) {
      metaTags.push({ property: "article:published_time", content: publishedDate });
    }

    if (modifiedDate) {
      metaTags.push({ property: "article:modified_time", content: modifiedDate });
    }

    if (pageDesignType) {
      metaTags.push({ name: "page-design-type", content: pageDesignType });
    }

    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let element = document.querySelector(selector);

      if (!element) {
        element = document.createElement("meta");
        if (name) element.setAttribute("name", name);
        if (property) element.setAttribute("property", property);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    });

    // Handle canonical tag - skip for noindex pages, insert BEFORE OG tags for SEO priority
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (shouldHaveCanonical) {
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        // Insert canonical early in head, before OG/social meta tags for SEO priority
        const firstMetaTag = document.querySelector('meta[property^="og:"]') || 
                            document.querySelector('meta[name="twitter:"]') ||
                            document.head.firstChild;
        if (firstMetaTag) {
          document.head.insertBefore(canonicalLink, firstMetaTag);
        } else {
          document.head.appendChild(canonicalLink);
        }
      }
      canonicalLink.setAttribute("href", currentUrl);
    } else if (canonicalLink) {
      // Remove canonical from noindex pages
      canonicalLink.remove();
      canonicalLink = null;
    }

    // Preload critical LCP image for better performance with responsive images
    let preloadLink = document.querySelector('link[rel="preload"][data-seo-head="true"]');
    if (preloadImage) {
      if (!preloadLink) {
        preloadLink = document.createElement("link");
        preloadLink.setAttribute("rel", "preload");
        preloadLink.setAttribute("as", "image");
        preloadLink.setAttribute("fetchpriority", "high");
        preloadLink.setAttribute("data-seo-head", "true");
        document.head.appendChild(preloadLink);
      }
      preloadLink.setAttribute("href", preloadImage);
      
      // Add responsive image hints for better performance on mobile
      if (preloadImage.includes('unsplash.com')) {
        // ULTRA-AGGRESSIVE compression for sub-2.5s LCP: Match BlogDetailPage settings
        const mobileImage = preloadImage.replace(/w=\d+&h=\d+&q=\d+/, 'w=640&h=300&q=55');
        const tabletImage = preloadImage.replace(/w=\d+&h=\d+&q=\d+/, 'w=1024&h=400&q=58');
        preloadLink.setAttribute("imagesrcset", `${mobileImage} 640w, ${tabletImage} 1024w, ${preloadImage} 1200w`);
        preloadLink.setAttribute("imagesizes", "(max-width: 768px) 640px, (max-width: 1024px) 1024px, 1200px");
      }
    } else if (preloadLink) {
      preloadLink.remove();
      preloadLink = null;
    }

    // Add JSON-LD structured data
    let jsonLdScript = document.querySelector('script[type="application/ld+json"][data-seo-head="true"]');
    if (jsonLd) {
      if (!jsonLdScript) {
        jsonLdScript = document.createElement("script");
        jsonLdScript.setAttribute("type", "application/ld+json");
        jsonLdScript.setAttribute("data-seo-head", "true");
        document.head.appendChild(jsonLdScript);
      }
      jsonLdScript.textContent = JSON.stringify(jsonLd);
    } else if (jsonLdScript) {
      jsonLdScript.remove();
      jsonLdScript = null;
    }

    // Add Breadcrumb JSON-LD schema for SEO
    let breadcrumbScript = document.querySelector('script[type="application/ld+json"][data-breadcrumb="true"]');
    const pageTitle = breadcrumbTitle || title.split(' | ')[0].split(' - ')[0];
    const currentPagePath = normalizePath(window.location.pathname);
    const actualPageUrl = `${preferredDomain}${currentPagePath}`;
    
    // Only add breadcrumbs for non-homepage pages
    if (currentPagePath !== '/') {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": preferredDomain
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": pageTitle,
            "item": actualPageUrl
          }
        ]
      };
      
      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement("script");
        breadcrumbScript.setAttribute("type", "application/ld+json");
        breadcrumbScript.setAttribute("data-breadcrumb", "true");
        document.head.appendChild(breadcrumbScript);
      }
      breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
    } else if (breadcrumbScript) {
      breadcrumbScript.remove();
      breadcrumbScript = null;
    }

    return () => {
      metaTags.forEach(({ name, property }) => {
        const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
        const element = document.querySelector(selector);
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });

      if (canonicalLink && canonicalLink.parentNode) {
        canonicalLink.parentNode.removeChild(canonicalLink);
      }

      if (jsonLdScript && jsonLdScript.parentNode) {
        jsonLdScript.parentNode.removeChild(jsonLdScript);
      }

      if (breadcrumbScript && breadcrumbScript.parentNode) {
        breadcrumbScript.parentNode.removeChild(breadcrumbScript);
      }

      const preloadLink = document.querySelector('link[rel="preload"][data-seo-head="true"]');
      if (preloadLink && preloadLink.parentNode) {
        preloadLink.parentNode.removeChild(preloadLink);
      }
    };
  }, [title, description, keywords, ogImage, canonicalPath, type, publishedDate, modifiedDate, author, jsonLd, preloadImage, breadcrumbTitle]);

  return null;
}
