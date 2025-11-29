import { useEffect } from "react";

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
    document.title = title;

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
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: defaultOgImage },
      { property: "og:url", content: currentUrl },
      { property: "og:type", content: type },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
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
