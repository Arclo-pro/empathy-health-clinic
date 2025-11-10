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
}: SEOHeadProps) {
  useEffect(() => {
    document.title = title;

    /**
     * Normalize path for canonical URL:
     * - Strips tracking parameters (fbclid, utm_*, hsa_*, etc.)
     * - Normalizes slashes and trailing slashes
     * - Handles malformed URLs gracefully
     */
    const normalizePath = (path: string): string => {
      if (!path) return '/';
      
      try {
        // Strip query parameters entirely from canonical URLs
        let cleanPath = path.split('?')[0].split('#')[0];
        
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
    const normalizedPath = normalizePath(canonicalPath || window.location.pathname);
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

    // Preload critical LCP image for better performance
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

      const preloadLink = document.querySelector('link[rel="preload"][data-seo-head="true"]');
      if (preloadLink && preloadLink.parentNode) {
        preloadLink.parentNode.removeChild(preloadLink);
      }
    };
  }, [title, description, keywords, ogImage, canonicalPath, type, publishedDate, modifiedDate, author, jsonLd, preloadImage]);

  return null;
}
