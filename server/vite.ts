import express, { type Express, type Request, type Response, type NextFunction } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";
import { contentRedirectMap } from "./redirect-config";
import { isValidContentSlug, isValidLocationSlug, isValidTeamMemberSlug, isBlogPostSlug } from "./storage";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    // Skip SEO files - they have their own routes in routes.ts
    // If they reach here, return 404 instead of serving HTML
    if (req.path.match(/\.(xml|txt)$/) && !req.path.startsWith('/assets/')) {
      return res.status(404).send('Not Found');
    }

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

/**
 * Valid static routes in the application
 * These are routes that always exist and should be served the SPA
 */
const VALID_STATIC_ROUTES = new Set([
  '/',
  '/auth',
  '/admin',
  '/admin/analytics',
  '/admin/seo',
  '/admin/google-ads',
  '/admin/google-ads-setup',
  '/admin/lead-insights',
  '/admin/link-monitor',
  '/admin/blog',
  '/admin/blog-seo',
  '/admin/semrush',
  '/admin/utm-tracker',
  '/admin/email-failures',
  '/admin/serp',
  '/admin/seo-audit',
  '/insurance',
  '/cigna-cigna-coverage',
  '/aetna-aetna-coverage',
  '/medicare-medicare-coverage',
  '/blue-cross-blue-shield-blue-cross-blue-shield-coverage',
  '/therapy',
  '/team',
  '/providers',
  '/providers/orlando',
  '/services',
  '/request-appointment',
  '/new-patients',
  '/pricing',
  '/affordable-care',
  '/stress-management',
  '/psychotherapist-orlando',
  '/mental-health-services-orlando',
  '/therapist-maitland',
  '/locations/altamonte-springs',
  '/locations/winter-park',
  '/psychiatrist-winter-park',
  '/psychiatrist-lake-nona',
  '/psychiatrist-winter-garden',
  '/psychiatrist-casselberry',
  '/psychiatrist-longwood',
  '/psychiatrist-downtown-orlando',
  '/locations/kissimmee',
  '/locations/apopka',
  '/locations/orlando',
  '/thank-you',
  '/blog',
  '/emdr-therapy',
  '/tms-treatment',
  '/trauma-specialist-near-me',
  '/female-therapist-orlando',
  '/black-psychiatrist-orlando',
  '/virtual-therapy',
  '/crisis-therapy',
  '/depression-counseling',
  '/depression-treatment',
  '/anxiety-therapy',
  '/anxiety-treatment',
  '/cognitive-behavioral-therapy',
  '/couples-counseling',
  '/counselor-near-me',
  '/mental-health-near-me',
  '/therapy-near-me',
  '/counseling-orlando',
  '/therapy-oviedo',
  '/psychiatrist',
  '/psychiatric-services',
  '/psychiatric-evaluation',
  '/psychiatrist-orlando',
  '/psychiatry-clinic-orlando',
  '/psychiatrist-near-me',
  '/psychiatry-near-me',
  '/adhd-psychiatrist-orlando',
  '/anxiety-psychiatrist-orlando',
  '/bipolar-psychiatrist-orlando',
  '/depression-psychiatrist-orlando',
  '/ptsd-psychiatrist-orlando',
  '/urgent-psychiatric-care-orlando',
  '/psychiatrist-orlando-accepts-umr',
  '/medication-management-orlando',
  '/telepsychiatry-orlando',
  '/same-day-psychiatrist-orlando',
  '/psychiatrist-for-anxiety-near-me',
  '/psychiatrist-for-depression-near-me',
  '/psychiatric-evaluation-orlando',
  '/therapist-orlando',
  '/mental-health-clinic-orlando',
  '/medicare-therapy-orlando',
  '/medicare-psychiatrist-orlando',
  '/psychologist-orlando',
  '/therapist-accepts-umr',
  '/therapist-accepts-oscar-health',
  '/psychiatrist-orlando-accepts-bcbs',
  '/psychiatrist-orlando-accepts-cigna',
  '/psychiatrist-orlando-accepts-aetna',
  '/psychiatrist-orlando-accepts-united-healthcare',
  '/psychiatry-orlando',
  '/ocd-psychiatrist-orlando',
  '/schizophrenia-psychiatrist-orlando',
  '/insomnia-psychiatrist-orlando',
  '/sunshine-health-therapy',
  '/adhd-testing-orlando',
  '/psychiatrist-accepting-new-patients-orlando',
  '/online-psychiatrist-orlando',
  '/best-psychiatrist-orlando',
  '/online-psychiatrist-florida',
  '/mental-health-doctor-orlando',
  '/trauma-psychiatrist-orlando',
  '/psychiatrist-near-ucf',
  '/blue-cross-blue-shield-therapy-orlando',
  '/telehealth',
  '/adult-adhd-treatment-orlando',
  '/suboxone-treatment-orlando',
  '/medicaid-psychiatrist-orlando',
  '/psychiatrists-orlando',
  '/psychology-orlando',
  '/about',
  '/privacy-policy',
  '/medical-disclaimer',
  '/what-we-treat',
  '/what-we-treat/adhd',
  '/what-we-treat/anxiety',
  '/what-we-treat/depression',
  '/what-we-treat/bipolar-disorder',
  '/what-we-treat/ptsd',
  '/what-we-treat/ocd',
  '/contact-us',
  '/in-person-therapy',
  '/intimacy-therapy',
  '/lgbtq-therapy',
  '/therapy-services-orlando',
  '/adhd-treatment',
  '/bipolar-disorder-treatment',
  '/ocd-treatment',
  '/ptsd-treatment',
]);

/**
 * Valid dynamic route patterns
 * For /team/:slug, /blog/:slug, /locations/:slug we validate against database caches
 * Other patterns use regex matching
 */
const VALID_DYNAMIC_REGEX_PATTERNS = [
  /^\/conditions\/[\w-]+\/[\w-]+$/, // /conditions/:condition/:type
  /^\/insurance\/[\w-]+\/[\w-]+$/,  // /insurance/:provider/:condition
  /^\/compare\/[\w-]+$/,        // /compare/:comparison
  /^\/symptoms\/[\w-]+$/,       // /symptoms/:symptom
];

/**
 * Validate dynamic routes with database-backed slug checking
 * Returns true if the slug exists in the database
 */
function isValidDynamicRoute(normalizedPath: string): boolean {
  // /blog/:slug - validate against blog slug cache
  const blogMatch = normalizedPath.match(/^\/blog\/([\w-]+)$/);
  if (blogMatch) {
    return isBlogPostSlug(blogMatch[1]);
  }

  // /team/:slug - validate against team member cache
  const teamMatch = normalizedPath.match(/^\/team\/([\w-]+)$/);
  if (teamMatch) {
    return isValidTeamMemberSlug(teamMatch[1]);
  }

  // /locations/:slug - validate against location cache
  const locationMatch = normalizedPath.match(/^\/locations\/([\w-]+)$/);
  if (locationMatch) {
    return isValidLocationSlug(locationMatch[1]);
  }

  // Check remaining regex patterns
  return VALID_DYNAMIC_REGEX_PATTERNS.some(pattern => pattern.test(normalizedPath));
}

/**
 * WordPress legacy URL patterns that should return 410 Gone
 * These are URLs that existed on the old WordPress site but have no equivalent
 */
const WORDPRESS_LEGACY_PATTERNS = [
  /^\/\d{4}\/\d{2}\/[\w-]+$/,   // /2025/10/post-name (date-based posts)
  /^\/\d{4}\/\d{2}\/\d{2}\/$/,  // /2025/10/06/ (date archives)
  /^\/tag\/[\w-]+$/,            // /tag/tagname
  /^\/author\/[\w-]+$/,         // /author/authorname
  /^\/page\/\d+$/,              // /page/2 (pagination)
  /^\/feed\/?$/,                // /feed or /feed/
  /^\/[\w-]+\/feed\/?$/,        // /postname/feed
  /^\/comments\/feed\/?$/,      // /comments/feed
  /^\/attachment\/[\w-]+$/,     // /attachment/filename
  /^\/media\/\d+$/,             // /media/123
];

/**
 * Check if a URL path is a valid route that should be served the SPA
 */
function isValidRoute(urlPath: string): boolean {
  // Normalize path - remove trailing slash except for root
  const normalizedPath = urlPath === '/' ? '/' : urlPath.replace(/\/$/, '');

  // Check static routes first (most common)
  if (VALID_STATIC_ROUTES.has(normalizedPath)) {
    return true;
  }

  // Check if it's a redirect target (these are valid even if not in static routes)
  if (Object.values(contentRedirectMap).includes(normalizedPath)) {
    return true;
  }

  // Check dynamic patterns (with database-backed slug validation)
  if (isValidDynamicRoute(normalizedPath)) {
    return true;
  }

  // Check single-segment paths against known database content slugs
  // This prevents soft 404s by only serving the SPA for URLs with real content
  if (/^\/[\w-]+$/.test(normalizedPath)) {
    const slug = normalizedPath.slice(1);

    // Validate against database content caches
    if (isValidContentSlug(slug)) {
      return true;
    }

    // Check if it's a blog post at root level (will be redirected to /blog/:slug)
    if (isBlogPostSlug(slug)) {
      return true;
    }

    // Not a known content slug - return false to trigger 404
    return false;
  }

  return false;
}

/**
 * Check if a URL is a WordPress legacy URL that should return 410 Gone
 */
function isWordPressLegacyUrl(urlPath: string): boolean {
  const normalizedPath = urlPath.replace(/\/$/, '') || '/';
  return WORDPRESS_LEGACY_PATTERNS.some(pattern => pattern.test(normalizedPath));
}

/**
 * Check if a URL matches a prerendered page
 */
function hasPrerenderedPage(urlPath: string, prerenderedDir: string): boolean {
  const normalizedPath = urlPath === '/' ? '' : urlPath.replace(/\/$/, '');
  const prerenderedPath = path.join(prerenderedDir, normalizedPath, 'index.html');
  return fs.existsSync(prerenderedPath);
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");
  const prerenderedDir = path.resolve(import.meta.dirname, "..", "dist/prerendered");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // Route validation middleware - returns 404/410 for invalid routes
  // This prevents soft 404s by not serving the SPA for non-existent pages
  app.use("*", (req: Request, res: Response, next: NextFunction) => {
    const urlPath = req.path;

    // Skip validation for API routes (handled elsewhere)
    if (urlPath.startsWith('/api/')) {
      return next();
    }

    // Skip validation for static assets (but not XML/TXT - they have explicit routes)
    if (urlPath.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|map|json)$/)) {
      return next();
    }

    // SEO files (sitemap.xml, robots.txt) should have been handled by their routes
    // If they reach here, return 404 - don't serve index.html for these
    if (urlPath.match(/\.(xml|txt)$/) && !urlPath.startsWith('/assets/')) {
      log(`404 Not Found: ${urlPath} (SEO file not handled by route)`);
      return res.status(404).send('Not Found');
    }

    // Return 410 Gone for WordPress legacy URLs
    if (isWordPressLegacyUrl(urlPath)) {
      log(`410 Gone: ${urlPath} (WordPress legacy URL)`);
      return res.status(410).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="robots" content="noindex">
          <title>Page Removed | Empathy Health Clinic</title>
        </head>
        <body>
          <h1>This page has been removed</h1>
          <p>This page was part of our old website and is no longer available.</p>
          <p><a href="/">Return to our homepage</a></p>
        </body>
        </html>
      `);
    }

    // Check if there's a prerendered page for this URL
    if (hasPrerenderedPage(urlPath, prerenderedDir)) {
      // If prerendered exists, serve the SPA (prerender middleware handles actual serving)
      return next();
    }

    // Check if this is a valid route
    if (isValidRoute(urlPath)) {
      // Valid route - serve the SPA
      return next();
    }

    // Invalid route - return 404
    log(`404 Not Found: ${urlPath} (no matching route)`);
    return res.status(404).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="robots" content="noindex">
        <title>Page Not Found | Empathy Health Clinic</title>
      </head>
      <body>
        <h1>Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <p><a href="/">Return to our homepage</a></p>
      </body>
      </html>
    `);
  });

  // Fall through to index.html for valid routes
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
