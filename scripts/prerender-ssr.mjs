#!/usr/bin/env node
/**
 * Lightweight SSR Prerender Script
 *
 * Generates static HTML files for all routes using React's renderToString().
 * No Puppeteer or Chrome needed — runs entirely in Node.js.
 *
 * Prerequisites:
 *   1. Vite client build complete (dist/public/index.html exists)
 *   2. Vite SSR build complete (dist/server/entry-server.js exists)
 *
 * Usage: node scripts/prerender-ssr.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const PUBLIC_DIR = path.join(ROOT, 'dist', 'public');
const SSR_ENTRY = path.join(ROOT, 'dist', 'server', 'entry-server.js');
const TEMPLATE_PATH = path.join(PUBLIC_DIR, 'index.html');

// ============================================================
// Browser API Polyfills for SSR
// React components use window, matchMedia, localStorage, etc.
// These must be set BEFORE importing the SSR module.
// ============================================================
function installBrowserPolyfills() {
  // Storage polyfill
  const createStorage = () => {
    const store = new Map();
    return {
      getItem: (key) => store.get(key) ?? null,
      setItem: (key, value) => store.set(key, String(value)),
      removeItem: (key) => store.delete(key),
      clear: () => store.clear(),
      get length() { return store.size; },
      key: (index) => [...store.keys()][index] ?? null,
    };
  };

  // matchMedia polyfill — returns desktop-like defaults
  const matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });

  // Minimal window object for SSR
  const windowPolyfill = {
    location: {
      pathname: '/',
      search: '',
      hash: '',
      href: 'https://www.empathyhealthclinic.com/',
      origin: 'https://www.empathyhealthclinic.com',
      hostname: 'www.empathyhealthclinic.com',
      protocol: 'https:',
      host: 'www.empathyhealthclinic.com',
      port: '',
    },
    navigator: {
      userAgent: 'Node.js SSR Prerender',
      language: 'en-US',
      languages: ['en-US', 'en'],
    },
    matchMedia,
    localStorage: createStorage(),
    sessionStorage: createStorage(),
    innerWidth: 1280,
    innerHeight: 800,
    outerWidth: 1280,
    outerHeight: 800,
    screen: { width: 1280, height: 800, availWidth: 1280, availHeight: 800 },
    devicePixelRatio: 1,
    scrollX: 0,
    scrollY: 0,
    pageXOffset: 0,
    pageYOffset: 0,
    getComputedStyle: () => ({}),
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
    requestAnimationFrame: (cb) => setTimeout(cb, 0),
    cancelAnimationFrame: (id) => clearTimeout(id),
    requestIdleCallback: (cb) => setTimeout(cb, 0),
    cancelIdleCallback: (id) => clearTimeout(id),
    setTimeout: globalThis.setTimeout,
    clearTimeout: globalThis.clearTimeout,
    setInterval: globalThis.setInterval,
    clearInterval: globalThis.clearInterval,
    document: {
      createElement: () => ({ style: {}, setAttribute: () => {}, appendChild: () => {} }),
      createElementNS: () => ({ style: {}, setAttribute: () => {}, appendChild: () => {} }),
      querySelector: () => null,
      querySelectorAll: () => [],
      getElementById: () => null,
      getElementsByClassName: () => [],
      getElementsByTagName: () => [],
      head: { appendChild: () => {}, removeChild: () => {} },
      body: { appendChild: () => {}, removeChild: () => {} },
      documentElement: { style: {}, classList: { add: () => {}, remove: () => {} } },
      addEventListener: () => {},
      removeEventListener: () => {},
      cookie: '',
    },
    history: {
      pushState: () => {},
      replaceState: () => {},
      back: () => {},
      forward: () => {},
      go: () => {},
    },
    dataLayer: [],
    gtag: () => {},
    gtagReady: Promise.resolve(),
  };

  // Install on globalThis — use defineProperty for read-only globals (Node 25+)
  const define = (name, value) => {
    try {
      globalThis[name] = value;
    } catch {
      Object.defineProperty(globalThis, name, { value, writable: true, configurable: true });
    }
  };

  define('window', windowPolyfill);
  define('document', windowPolyfill.document);
  define('navigator', windowPolyfill.navigator);
  define('localStorage', windowPolyfill.localStorage);
  define('sessionStorage', windowPolyfill.sessionStorage);
  define('matchMedia', matchMedia);
  define('requestAnimationFrame', windowPolyfill.requestAnimationFrame);
  define('cancelAnimationFrame', windowPolyfill.cancelAnimationFrame);
  define('requestIdleCallback', windowPolyfill.requestIdleCallback);
  define('cancelIdleCallback', windowPolyfill.cancelIdleCallback);
  define('HTMLElement', class HTMLElement {});
  define('Element', class Element {});
  define('Node', class Node {});
  define('Event', class Event { constructor() {} });
  define('CustomEvent', class CustomEvent { constructor() {} });
  define('MutationObserver', class MutationObserver { observe() {} disconnect() {} });
  define('IntersectionObserver', class IntersectionObserver { observe() {} disconnect() {} unobserve() {} });
  define('ResizeObserver', class ResizeObserver { observe() {} disconnect() {} unobserve() {} });
}

// Install polyfills BEFORE loading any React code
installBrowserPolyfills();

// ============================================================
// Patch react-dom/server to handle missing getServerSnapshot
// React 18's server renderer throws if useSyncExternalStore is
// called without getServerSnapshot. Radix UI's Presence component
// triggers this. We directly patch the CJS file before importing.
// ============================================================
function patchReactDOMServer() {
  // renderToString comes from the legacy server files
  // NODE_ENV determines which file: production.min.js or development.js
  const cjsDir = path.join(ROOT, 'node_modules/react-dom/cjs');
  const filesToPatch = [
    'react-dom-server-legacy.node.production.min.js',
    'react-dom-server-legacy.node.development.js',
    'react-dom-server.node.production.min.js',
    'react-dom-server.node.development.js',
    'react-dom-server-legacy.browser.development.js',
    'react-dom-server.browser.development.js',
  ];

  const restoreFns = [];

  for (const filename of filesToPatch) {
    const filePath = path.join(cjsDir, filename);
    if (!fs.existsSync(filePath)) continue;

    const original = fs.readFileSync(filePath, 'utf-8');

    // Production minified check
    let patched = original.replace(
      'if(void 0===c)throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");',
      'if(void 0===c){c=b;}'
    );

    // Development readable check
    patched = patched.replace(
      /if\s*\(\s*getServerSnapshot\s*===\s*undefined\s*\)\s*\{[\s\S]*?throw\s+(?:new\s+)?Error\s*\(\s*['"]Missing getServerSnapshot[\s\S]*?\)\s*;?\s*\}/g,
      '{ if (getServerSnapshot === undefined) { getServerSnapshot = getSnapshot; } }'
    );

    if (patched !== original) {
      fs.writeFileSync(filePath, patched, 'utf-8');
      restoreFns.push(() => fs.writeFileSync(filePath, original, 'utf-8'));
    }
  }

  if (restoreFns.length > 0) {
    console.log(`  Patched ${restoreFns.length} react-dom/server files for SSR compatibility`);
    return () => {
      restoreFns.forEach(fn => fn());
      console.log('  Restored react-dom/server to original');
    };
  }

  console.warn('  WARNING: Could not patch any react-dom/server files');
  return null;
}

const restoreReactDOM = patchReactDOMServer();

async function main() {
  console.log('==========================================');
  console.log('SSR Prerender (Lightweight — No Puppeteer)');
  console.log('==========================================');
  console.log('');

  // Validate prerequisites
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error('ERROR: dist/public/index.html not found. Run vite build first.');
    process.exit(1);
  }
  if (!fs.existsSync(SSR_ENTRY)) {
    console.error('ERROR: dist/server/entry-server.js not found. Run vite build --config vite.config.ssr.ts first.');
    process.exit(1);
  }

  // Load SSR module (after polyfills are installed)
  console.log('Loading SSR module...');
  const ssrModule = await import(SSR_ENTRY);
  const { render, prerenderRoutes } = ssrModule;

  if (!render || !prerenderRoutes) {
    console.error('ERROR: entry-server.js must export render() and prerenderRoutes');
    process.exit(1);
  }

  console.log(`  Found ${prerenderRoutes.length} routes to prerender`);
  console.log('');

  // Read the built index.html template
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

  // Find the root div to inject SSR content into
  // The built template has: <div id="root">...noscript fallback...</div>\n  </body>
  const rootDivRegex = /(<div id="root">)([\s\S]*?)(<\/div>\s*<\/body>)/;
  if (!rootDivRegex.test(template)) {
    console.error('ERROR: Could not find <div id="root">...</div></body> in template');
    process.exit(1);
  }

  let successCount = 0;
  let errorCount = 0;

  for (const route of prerenderRoutes) {
    try {
      // Update window.location for each route
      globalThis.window.location.pathname = route;
      globalThis.window.location.href = `https://www.empathyhealthclinic.com${route}`;

      const html = render(route);
      if (!html || html.trim() === '') {
        console.warn(`  SKIP: ${route} (empty render output)`);
        continue;
      }

      // Inject SSR content into the template, replacing the noscript fallback
      const pageHtml = template.replace(rootDivRegex, `$1${html}$3`);

      // Determine output path
      let outPath;
      if (route === '/') {
        // Homepage — overwrite the existing index.html
        outPath = path.join(PUBLIC_DIR, 'index.html');
      } else {
        // Other routes — create {route}/index.html
        const routeDir = path.join(PUBLIC_DIR, route.replace(/^\//, ''));
        fs.mkdirSync(routeDir, { recursive: true });
        outPath = path.join(routeDir, 'index.html');
      }

      fs.writeFileSync(outPath, pageHtml, 'utf-8');
      successCount++;

      if (successCount % 20 === 0) {
        console.log(`  Prerendered ${successCount}/${prerenderRoutes.length} routes...`);
      }
    } catch (err) {
      errorCount++;
      console.warn(`  ERROR: ${route} — ${err.message}`);
    }
  }

  console.log('');
  console.log('==========================================');
  console.log('SSR Prerender Complete');
  console.log('==========================================');
  console.log(`  Success: ${successCount}/${prerenderRoutes.length}`);
  if (errorCount > 0) {
    console.log(`  Errors:  ${errorCount} (pages will fall back to SPA)`);
  }
  console.log(`  Output:  dist/public/{route}/index.html`);
  console.log('');
}

main()
  .catch((err) => {
    console.error('SSR Prerender failed:', err);
  })
  .finally(() => {
    // Always restore react-dom/server to original
    if (restoreReactDOM) restoreReactDOM();
    process.exit(0);
  });
