import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { canonicalizationMiddleware } from "./canonicalization-middleware";
import { createPrerenderMiddleware, prerenderStatusHandler } from "./prerender-middleware";
import path from "path";

const app = express();

app.use(compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
  level: 6,
  threshold: 1024
}));

// Security Headers Middleware
// Required for YMYL medical website compliance and vulnerability scanning
app.use((req, res, next) => {
  // Prevent clickjacking attacks
  res.setHeader("X-Frame-Options", "DENY");
  // Prevent MIME-type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");
  // Control referrer information sent with requests
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  // XSS Protection (legacy, but required for some security scanners)
  res.setHeader("X-XSS-Protection", "0");
  // Content Security Policy - allows necessary external resources
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self' https: data: blob:; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://connect.facebook.net https://www.clarity.ms https://*.clarity.ms; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com data:; " +
    "img-src 'self' https: data: blob:; " +
    "connect-src 'self' https: wss:; " +
    "frame-src 'self' https://www.google.com https://www.youtube.com https://player.vimeo.com;"
  );
  // Permissions Policy (formerly Feature Policy)
  res.setHeader(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=(), payment=(self)"
  );
  next();
});

// 410 Gone: Legacy WordPress URLs that no longer exist
// IMPORTANT: This must run BEFORE canonicalization middleware to prevent redirects
// We want these URLs to return 410 immediately, not redirect first
app.use((req, res, next) => {
  // Block old WordPress admin, login, and content URLs with 410 Gone
  // 410 tells search engines these resources are permanently removed
  if (
    req.path.startsWith('/wp-content/') ||
    req.path.startsWith('/wp-includes/') ||
    req.path.startsWith('/wp-admin/') ||
    req.path === '/wp-login.php' ||
    req.path.match(/^\/wp-.*\.php$/)
  ) {
    return res.status(410).send('Gone - This WordPress resource no longer exists after site migration.');
  }
  
  // Block Replit dev/workspace iframes from being tracked
  if (req.path.includes('__replco') || req.path.includes('workspace_iframe')) {
    return res.status(404).send('Not Found');
  }
  
  // Block Vite/Replit dev paths in production only - these should never be indexed
  // Screaming Frog reported these as accessible in production crawls
  // In development, Vite needs these paths to serve client-side HMR assets
  if (process.env.NODE_ENV === 'production') {
    if (
      req.path.startsWith('/@vite/') ||
      req.path.startsWith('/@replit/') ||
      req.path.startsWith('/@fs/') ||
      req.path.startsWith('/@id/') ||
      req.path.startsWith('/__vite') ||
      req.path === '/@vite/client'
    ) {
      return res.status(404).send('Not Found');
    }
  }
  
  next();
});

// Unified canonicalization middleware
// Handles www removal, trailing slash removal, and content redirects in ONE redirect
// This prevents redirect chains that hurt SEO and crawl budget
app.use(canonicalizationMiddleware);

// X-Robots-Tag: Exclude admin routes, static assets, and legacy WordPress archives from search engine indexing
// Prevents orphaned pages from appearing in GA4/SEMrush
// NOTE: /tag/ and /author/ URLs are NOT blocked here because they 301 redirect to /blog
// The redirect itself handles duplicate content prevention - no need for noindex
// 
// NOTE: In development (*.replit.dev domains), Replit infrastructure automatically
// adds "X-Robots-Tag: none, noindex, noarchive, nofollow, nositelinkssearchbox, noimageindex"
// to ALL pages. This is expected behavior to prevent dev environments from being indexed.
// When published to production (custom domain), this middleware ensures ONLY admin routes
// and date archives are excluded from indexing while public pages remain indexable.
app.use((req, res, next) => {
  const path = req.path.toLowerCase();
  
  // Admin, auth, and utility pages
  if (
    path.startsWith('/admin') || 
    path.startsWith('/login') || 
    path.startsWith('/auth') ||
    path.startsWith('/config') ||
    path.startsWith('/debug') ||
    path.startsWith('/examples') ||
    path.startsWith('/test') ||
    path.startsWith('/api/') ||
    path.match(/^\/\d{4}\/\d{2}\/\d{2}\//)  // WordPress date archives like /2025/10/06/
  ) {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  }
  
  // Static assets (JSON, CSV, JS, CSS) - but NOT sitemaps or HTML
  // These should never appear in search results
  if (
    (path.endsWith('.json') && !path.includes('sitemap')) ||
    path.endsWith('.csv') ||
    (path.endsWith('.js') && !path.startsWith('/assets/')) ||
    (path.endsWith('.css') && !path.startsWith('/assets/'))
  ) {
    res.setHeader('X-Robots-Tag', 'noindex');
  }
  
  // Attachment/media pages (WordPress legacy)
  if (
    path.includes('/attachment/') ||
    path.includes('/uploads/') ||
    path.match(/\/media\/\d+/)
  ) {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  }
  
  next();
});

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Prerender middleware serves static HTML to search engine crawlers
// MUST be registered synchronously BEFORE the async IIFE to ensure it runs before Vite dev middleware
const prerenderedDir = path.resolve(import.meta.dirname, "..", "dist/prerendered");
app.use(createPrerenderMiddleware(prerenderedDir));

// Debug endpoint to check prerender status
app.get('/api/prerender-status', prerenderStatusHandler(prerenderedDir));

(async () => {
  const server = await registerRoutes(app);

  // Serve static files from attached_assets directory
  const attachedAssetsPath = path.resolve(import.meta.dirname, "..", "attached_assets");
  app.use("/attached_assets", express.static(attachedAssetsPath));

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();

// Global error handlers to prevent server crashes
process.on('unhandledRejection', (reason: any, promise) => {
  console.error('⚠️ Unhandled Promise Rejection:', reason);
  console.error('Promise:', promise);
  // Log the error but don't crash the server
});

process.on('uncaughtException', (error: Error) => {
  console.error('⚠️ Uncaught Exception:', error);
  // For uncaught exceptions, we should log and potentially restart gracefully
  // but for now just log to prevent crashes during development
});
