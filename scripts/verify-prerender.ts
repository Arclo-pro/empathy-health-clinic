/**
 * Verify Prerender Completeness
 * 
 * This script checks that every route in routes/allRoutes.json has a corresponding
 * prerendered snapshot file. Fails with exit code 1 if any are missing.
 * 
 * Usage: npx tsx scripts/verify-prerender.ts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const MANIFEST_PATH = path.join(rootDir, 'routes/allRoutes.json');
const PRERENDER_DIR = path.join(rootDir, 'dist/prerendered');

interface RouteManifest {
  totalRoutes: number;
  staticRoutes: number;
  blogRoutes: number;
  generatedAt: string;
  routes: string[];
}

/**
 * Convert route to expected snapshot filepath
 * "/" -> "dist/prerendered/index.html"
 * "/foo" -> "dist/prerendered/foo/index.html"
 * "/foo/bar" -> "dist/prerendered/foo/bar/index.html"
 */
function routeToFilePath(route: string): string {
  if (route === '/' || route === '') {
    return path.join(PRERENDER_DIR, 'index.html');
  }
  const cleanPath = route.replace(/^\//, '').replace(/\/$/, '');
  return path.join(PRERENDER_DIR, cleanPath, 'index.html');
}

function main() {
  console.log('===========================================');
  console.log('Prerender Manifest Verification');
  console.log('===========================================\n');

  // Check manifest exists
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error('ERROR: Route manifest not found:', MANIFEST_PATH);
    console.error('Run: npx tsx scripts/buildRouteManifest.ts');
    process.exit(1);
  }

  // Check prerender directory exists
  if (!fs.existsSync(PRERENDER_DIR)) {
    console.error('ERROR: Prerender directory not found:', PRERENDER_DIR);
    console.error('Run: npx tsx scripts/prerender-puppeteer.ts');
    process.exit(1);
  }

  // Load manifest
  const manifest: RouteManifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
  console.log(`Manifest: ${manifest.totalRoutes} routes (${manifest.staticRoutes} static, ${manifest.blogRoutes} blog)`);
  console.log(`Generated: ${manifest.generatedAt}\n`);

  const missing: string[] = [];
  const present: string[] = [];
  const lowQuality: { route: string; links: number }[] = [];

  const MIN_LINKS = 5; // Minimum links for quality check (except /contact)

  for (const route of manifest.routes) {
    const filePath = routeToFilePath(route);
    
    if (!fs.existsSync(filePath)) {
      missing.push(route);
    } else {
      present.push(route);
      
      // Quality check - count links
      const html = fs.readFileSync(filePath, 'utf-8');
      const links = (html.match(/<a [^>]*href="\/[a-zA-Z]/gi) || []).length;
      
      if (links < MIN_LINKS && route !== '/contact') {
        lowQuality.push({ route, links });
      }
    }
  }

  // Report results
  console.log(`Present: ${present.length}/${manifest.routes.length}`);
  console.log(`Missing: ${missing.length}`);
  console.log(`Low quality (< ${MIN_LINKS} links): ${lowQuality.length}\n`);

  if (missing.length > 0) {
    console.log('Missing snapshots:');
    missing.slice(0, 20).forEach(r => console.log(`  - ${r}`));
    if (missing.length > 20) {
      console.log(`  ... and ${missing.length - 20} more`);
    }
    console.log('');
  }

  if (lowQuality.length > 0) {
    console.log('Low quality snapshots (may need regeneration):');
    lowQuality.slice(0, 10).forEach(({ route, links }) => {
      console.log(`  - ${route}: ${links} links`);
    });
    if (lowQuality.length > 10) {
      console.log(`  ... and ${lowQuality.length - 10} more`);
    }
    console.log('');
  }

  // Final verdict
  console.log('===========================================');
  if (missing.length === 0) {
    console.log('PASS: All routes have prerendered snapshots');
    
    if (lowQuality.length > 0) {
      console.log(`WARNING: ${lowQuality.length} routes have low link counts`);
    }
    
    process.exit(0);
  } else {
    console.log(`FAIL: ${missing.length} routes missing snapshots`);
    console.log('Run: npx tsx scripts/prerender-puppeteer.ts');
    process.exit(1);
  }
}

main();
