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
    let normalizedPath = normalizePath(canonicalPath || window.location.pathname);
    
    // Apply canonical consolidation for Orlando pages
    if (CANONICAL_CONSOLIDATION_PATHS[normalizedPath]) {
      normalizedPath = CANONICAL_CONSOLIDATION_PATHS[normalizedPath];
    }
    
    const canonicalUrl = `${preferredDomain}${normalizedPath}`;
    const currentUrl = canonicalUrl;
    const defaultOgImage = ogImage || `${preferredDomain}/attached_assets/stock_images/peaceful_green_fores_98e1a8d8.jpg`;

    const metaTags = [
      { name: "description", content: formattedDescription },
      { name: "robots", content: "index, follow" },
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

    if (keywords && keywords.length > 0) {
      metaTags.push({ name: "keywords", content: keywords.join(", ") });
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

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", currentUrl);

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
