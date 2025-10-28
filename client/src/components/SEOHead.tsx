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
}: SEOHeadProps) {
  useEffect(() => {
    document.title = title;

    const baseUrl = window.location.origin;
    const currentUrl = canonicalPath ? `${baseUrl}${canonicalPath}` : window.location.href;
    const defaultOgImage = ogImage || `${baseUrl}/attached_assets/stock_images/peaceful_green_fores_98e1a8d8.jpg`;

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
    };
  }, [title, description, keywords, ogImage, canonicalPath, type, publishedDate, modifiedDate, author]);

  return null;
}
