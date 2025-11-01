import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
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

// 301 Redirect: www to non-www (preserves SEO & domain authority)
app.use((req, res, next) => {
  const host = req.headers.host || '';
  
  // Check if the request is coming from www subdomain
  if (host.startsWith('www.')) {
    // Get the protocol (http or https)
    const protocol = req.protocol || (req.secure ? 'https' : 'http');
    
    // Remove 'www.' from the host
    const newHost = host.substring(4);
    
    // Construct the new URL
    const newUrl = `${protocol}://${newHost}${req.originalUrl}`;
    
    // Send 301 permanent redirect
    return res.redirect(301, newUrl);
  }
  
  next();
});

// 410 Gone: Legacy WordPress URLs that no longer exist
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
  
  next();
});

// 301 Redirects: Old WordPress URLs to preserve backlink SEO value
app.use((req, res, next) => {
  const redirectMap: Record<string, string> = {
    // Grief self-care article → existing grief counseling post
    '/blog/finding-comfort-self-care-tips-for-those-who-are-grieving': '/blog/the-power-of-grief-counseling-in-healing-the-heart-2',
    '/blog/finding-comfort-self-care-tips-for-those-who-are-grieving/': '/blog/the-power-of-grief-counseling-in-healing-the-heart-2',
    
    // BPD article → new comprehensive BPD guide
    '/understanding-4-types-of-bpd': '/blog/understanding-4-types-of-bpd',
    '/understanding-4-types-of-bpd/': '/blog/understanding-4-types-of-bpd',
    
    // Narcissistic behavior articles → new narcissism guide
    '/narcissistic-behavior-in-a-relationship': '/blog/narcissistic-behavior-in-relationships',
    '/narcissistic-behavior-in-a-relationship/': '/blog/narcissistic-behavior-in-relationships',
    '/narcissisticbehavior-in-a-relationship': '/blog/narcissistic-behavior-in-relationships',
    '/narcissisticbehavior-in-a-relationship/': '/blog/narcissistic-behavior-in-relationships',
  };

  const redirectTo = redirectMap[req.path];
  if (redirectTo) {
    return res.redirect(301, redirectTo);
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
