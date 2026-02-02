/**
 * Sync Vercel Redirects
 *
 * Reads the contentRedirectMap from redirect-config.ts and generates
 * the vercel.json redirects array. This ensures redirects work in
 * production on Vercel (where Express middleware doesn't run for page requests).
 *
 * Run: npx tsx scripts/sync-vercel-redirects.ts
 * Also runs automatically as part of the build via vercel-build script.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { contentRedirectMap } from '../server/redirect-config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const vercelJsonPath = path.resolve(__dirname, '..', 'vercel.json');

interface VercelRedirect {
  source: string;
  destination: string;
  permanent: boolean;
}

interface VercelRewrite {
  source: string;
  destination: string;
}

interface VercelConfig {
  buildCommand: string;
  outputDirectory: string;
  trailingSlash: boolean;
  headers: any[];
  redirects: VercelRedirect[];
  rewrites: VercelRewrite[];
  [key: string]: any;
}

async function getBlogSlugsFromDatabase(): Promise<string[]> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.log('⚠️  DATABASE_URL not set, skipping blog slug sync');
    return [];
  }

  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(dbUrl);
    const result = await sql`SELECT slug FROM blog_posts WHERE status = 'published'`;
    const slugs = result.map((row: any) => row.slug as string);
    console.log(`📚 Found ${slugs.length} published blog posts in database`);
    return slugs;
  } catch (err) {
    console.error('⚠️  Failed to query blog slugs from database:', err);
    return [];
  }
}

async function main() {
  console.log('🔄 Syncing redirects to vercel.json...');

  // Read existing vercel.json
  const existingConfig = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf-8'));

  // Build redirects array from the content redirect map
  const redirects: VercelRedirect[] = [];

  // Add all content redirects
  for (const [source, destination] of Object.entries(contentRedirectMap)) {
    redirects.push({
      source,
      destination,
      permanent: true,
    });
  }

  // Add blog slug redirects (root-level /{slug} → /blog/{slug})
  // These are auto-detected from the database to handle the dynamic blog slug checker
  // that only works in Express middleware (not in Vercel production)
  const blogSlugs = await getBlogSlugsFromDatabase();
  const existingSources = new Set(redirects.map(r => r.source));

  for (const slug of blogSlugs) {
    const source = `/${slug}`;
    // Don't add if there's already an explicit redirect for this path
    if (!existingSources.has(source)) {
      redirects.push({
        source,
        destination: `/blog/${slug}`,
        permanent: true,
      });
    }
  }

  // Build the new vercel.json config
  const newConfig: VercelConfig = {
    buildCommand: existingConfig.buildCommand || 'npm run build',
    outputDirectory: existingConfig.outputDirectory || 'dist/public',
    trailingSlash: false,
    headers: existingConfig.headers || [],
    redirects,
    rewrites: [
      // SEO files must go through the serverless function (dynamically generated)
      { source: '/robots.txt', destination: '/api/index' },
      { source: '/sitemap.xml', destination: '/api/index' },
      { source: '/sitemap_index.xml', destination: '/api/index' },
      { source: '/image-sitemap.xml', destination: '/api/index' },
      // API routes
      { source: '/api/:path*', destination: '/api/index' },
      // SPA catch-all (serves index.html for client-side routing)
      { source: '/:path*', destination: '/index.html' },
    ],
  };

  // Write the updated vercel.json
  fs.writeFileSync(vercelJsonPath, JSON.stringify(newConfig, null, 2) + '\n');

  console.log(`✅ Synced ${redirects.length} redirects to vercel.json`);
  console.log(`   - ${Object.keys(contentRedirectMap).length} from contentRedirectMap`);
  console.log(`   - ${redirects.length - Object.keys(contentRedirectMap).length} blog slug auto-redirects`);
  console.log(`   - trailingSlash: false (Vercel CDN strips trailing slashes with 308)`);
  console.log(`   - Switched from routes to redirects/rewrites (recommended Vercel pattern)`);

  // Warn if approaching Vercel's redirect limit
  if (redirects.length > 900) {
    console.warn(`⚠️  WARNING: ${redirects.length}/1024 redirects used. Approaching Vercel limit.`);
  }
}

main().catch(console.error);
