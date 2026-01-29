/**
 * Build-time sitemap generator
 *
 * Queries the Neon database for all content types and generates
 * a comprehensive sitemap.xml with every indexable URL.
 *
 * Run after vite build so output goes to dist/public/sitemap.xml
 * Falls back to static pages if DATABASE_URL is not available.
 */
import { neon } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";

const BASE_URL = "https://www.empathyhealthclinic.com";

const NOINDEX_PATHS = [
  '/admin', '/login', '/auth', '/config', '/debug',
  '/examples', '/test', '/preview',
  '/privacy', '/terms', '/disclaimer',
  '/thank-you', '/confirmed', '/appointment-confirmed',
  '/404', '/500', '/error',
  '/search', '/filter',
  '/api', '/attachment', '/uploads', '/media',
  '/wp-includes', '/wp-content', '/wp-admin',
];

const CANONICAL_CONSOLIDATION_PATHS: Record<string, string> = {
  '/psychiatry-orlando': '/psychiatrist-orlando',
  '/psychiatry-clinic-orlando': '/psychiatrist-orlando',
};

function shouldInclude(urlPath: string): boolean {
  const normalized = urlPath.toLowerCase().replace(/\/+$/, '');
  if (NOINDEX_PATHS.some(p => normalized.startsWith(p))) return false;
  if (normalized in CANONICAL_CONSOLIDATION_PATHS) return false;
  if (normalized.includes('page=')) return false;
  if (normalized.includes('?')) return false;
  if (normalized.includes('attachment')) return false;
  if (normalized.includes('wp-')) return false;
  return true;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const today = new Date().toISOString().split('T')[0];

const STATIC_PAGES = [
  { path: '/', changefreq: 'daily', priority: 1.0 },
  { path: '/services', changefreq: 'weekly', priority: 0.9 },
  { path: '/psychiatrist-orlando', changefreq: 'weekly', priority: 0.95 },
  { path: '/therapist-orlando', changefreq: 'weekly', priority: 0.85 },
  { path: '/team', changefreq: 'weekly', priority: 0.85 },
  { path: '/insurance', changefreq: 'weekly', priority: 0.8 },
  { path: '/blog', changefreq: 'daily', priority: 0.8 },
  { path: '/new-patients', changefreq: 'weekly', priority: 0.8 },
  { path: '/virtual-therapy', changefreq: 'weekly', priority: 0.8 },
  { path: '/request-appointment', changefreq: 'weekly', priority: 0.85 },
  { path: '/therapy', changefreq: 'weekly', priority: 0.8 },
  { path: '/psychotherapist-orlando', changefreq: 'weekly', priority: 0.8 },
  { path: '/couples-counseling', changefreq: 'weekly', priority: 0.75 },
  { path: '/counselor-near-me', changefreq: 'weekly', priority: 0.75 },
  { path: '/mental-health-near-me', changefreq: 'weekly', priority: 0.75 },
  { path: '/therapy-near-me', changefreq: 'weekly', priority: 0.75 },
  { path: '/psychiatrist-near-me', changefreq: 'weekly', priority: 0.9 },
  { path: '/counseling-orlando', changefreq: 'weekly', priority: 0.75 },
  { path: '/adhd-psychiatrist-orlando', changefreq: 'weekly', priority: 0.85 },
  { path: '/anxiety-psychiatrist-orlando', changefreq: 'weekly', priority: 0.85 },
  { path: '/depression-psychiatrist-orlando', changefreq: 'weekly', priority: 0.85 },
  { path: '/bipolar-psychiatrist-orlando', changefreq: 'weekly', priority: 0.85 },
  { path: '/telepsychiatry-orlando', changefreq: 'weekly', priority: 0.85 },
  { path: '/same-day-psychiatrist-orlando', changefreq: 'weekly', priority: 0.85 },
  { path: '/medication-management-orlando', changefreq: 'weekly', priority: 0.8 },
  { path: '/ptsd-psychiatrist-orlando', changefreq: 'weekly', priority: 0.85 },
  { path: '/urgent-psychiatric-care-orlando', changefreq: 'weekly', priority: 0.85 },
  { path: '/psychiatrist-orlando-accepts-umr', changefreq: 'weekly', priority: 0.8 },
  { path: '/anxiety-therapy', changefreq: 'weekly', priority: 0.8 },
  { path: '/depression-counseling', changefreq: 'weekly', priority: 0.8 },
  { path: '/cognitive-behavioral-therapy', changefreq: 'monthly', priority: 0.75 },
  { path: '/emdr-therapy', changefreq: 'monthly', priority: 0.8 },
  { path: '/tms-treatment', changefreq: 'monthly', priority: 0.8 },
  { path: '/adhd-testing-orlando', changefreq: 'weekly', priority: 0.85 },
  { path: '/depression-treatment', changefreq: 'weekly', priority: 0.8 },
  { path: '/psychiatric-services', changefreq: 'weekly', priority: 0.8 },
  { path: '/psychiatrist-winter-park', changefreq: 'weekly', priority: 0.8 },
  { path: '/therapy-oviedo', changefreq: 'monthly', priority: 0.7 },
  { path: '/therapist-maitland', changefreq: 'monthly', priority: 0.7 },
  { path: '/providers', changefreq: 'weekly', priority: 0.85 },
  { path: '/providers/orlando', changefreq: 'weekly', priority: 0.85 },
  { path: '/what-we-treat', changefreq: 'weekly', priority: 0.9 },
  { path: '/what-we-treat/adhd', changefreq: 'weekly', priority: 0.85 },
  { path: '/what-we-treat/anxiety', changefreq: 'weekly', priority: 0.85 },
  { path: '/what-we-treat/depression', changefreq: 'weekly', priority: 0.85 },
  { path: '/what-we-treat/bipolar-disorder', changefreq: 'weekly', priority: 0.85 },
  { path: '/what-we-treat/ptsd', changefreq: 'weekly', priority: 0.85 },
  { path: '/what-we-treat/ocd', changefreq: 'weekly', priority: 0.85 },
  { path: '/psychiatrist-lake-nona', changefreq: 'weekly', priority: 0.8 },
  { path: '/psychiatrist-winter-garden', changefreq: 'weekly', priority: 0.8 },
  { path: '/psychiatrist-casselberry', changefreq: 'weekly', priority: 0.8 },
  { path: '/psychiatrist-longwood', changefreq: 'weekly', priority: 0.8 },
  { path: '/psychiatrist-downtown-orlando', changefreq: 'weekly', priority: 0.85 },
  { path: '/telehealth', changefreq: 'weekly', priority: 0.85 },
  { path: '/adult-adhd-treatment-orlando', changefreq: 'weekly', priority: 0.85 },
  { path: '/suboxone-treatment-orlando', changefreq: 'weekly', priority: 0.8 },
  { path: '/medicaid-psychiatrist-orlando', changefreq: 'weekly', priority: 0.8 },
  { path: '/psychiatrist-orlando-accepts-cigna', changefreq: 'monthly', priority: 0.7 },
  { path: '/psychiatrist-orlando-accepts-aetna', changefreq: 'monthly', priority: 0.7 },
  { path: '/medicare-psychiatrist-orlando', changefreq: 'monthly', priority: 0.7 },
  { path: '/blue-cross-blue-shield-therapy-orlando', changefreq: 'monthly', priority: 0.7 },
];

async function generateSitemap(): Promise<void> {
  const addedUrls = new Set<string>();

  function addUrl(urlPath: string, changefreq: string, priority: number, lastmod?: string): string {
    const fullUrl = `${BASE_URL}${urlPath}`;
    if (addedUrls.has(fullUrl)) return '';
    if (!shouldInclude(urlPath)) return '';
    addedUrls.add(fullUrl);

    let xml = `  <url>\n`;
    xml += `    <loc>${escapeXml(fullUrl)}</loc>\n`;
    if (lastmod) {
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
    }
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority.toFixed(1)}</priority>\n`;
    xml += `  </url>\n`;
    return xml;
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Static pages
  for (const page of STATIC_PAGES) {
    xml += addUrl(page.path, page.changefreq, page.priority, today);
  }

  // Dynamic content from database
  if (process.env.DATABASE_URL) {
    console.log('  Querying database for dynamic content...');
    try {
      const sql = neon(process.env.DATABASE_URL);

      const [treatments, therapies, conditions, insuranceProviders, blogPosts, locations, teamMembers] = await Promise.all([
        sql`SELECT slug FROM treatments ORDER BY "order"`,
        sql`SELECT slug FROM therapies ORDER BY "order"`,
        sql`SELECT slug FROM conditions ORDER BY "order"`,
        sql`SELECT slug FROM insurance_providers ORDER BY "order"`,
        sql`SELECT slug, published_at, updated_at FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC`,
        sql`SELECT slug FROM locations ORDER BY title`,
        sql`SELECT slug FROM team_members ORDER BY "order", name`,
      ]);

      console.log(`  Found: ${treatments.length} treatments, ${therapies.length} therapies, ${conditions.length} conditions`);
      console.log(`  Found: ${insuranceProviders.length} insurance providers, ${blogPosts.length} blog posts`);
      console.log(`  Found: ${locations.length} locations, ${teamMembers.length} team members`);

      treatments.forEach((t: any) => { xml += addUrl(`/${t.slug}`, 'monthly', 0.7, today); });
      therapies.forEach((t: any) => { xml += addUrl(`/${t.slug}`, 'monthly', 0.7, today); });
      conditions.forEach((c: any) => { xml += addUrl(`/${c.slug}`, 'monthly', 0.7, today); });
      insuranceProviders.forEach((p: any) => { xml += addUrl(`/${p.slug}`, 'monthly', 0.6, today); });
      blogPosts.forEach((post: any) => {
        const lastMod = post.updated_at || post.published_at;
        const lastModStr = lastMod ? new Date(lastMod).toISOString().split('T')[0] : today;
        xml += addUrl(`/blog/${post.slug}`, 'weekly', 0.5, lastModStr);
      });
      locations.forEach((l: any) => { xml += addUrl(`/locations/${l.slug}`, 'monthly', 0.7, today); });
      teamMembers.forEach((m: any) => { xml += addUrl(`/team/${m.slug}`, 'monthly', 0.7, today); });
    } catch (error) {
      console.error('  WARNING: Database query failed, using static pages only:', error);
    }
  } else {
    console.log('  WARNING: DATABASE_URL not set, sitemap will only contain static pages');
  }

  xml += '</urlset>\n';

  // Write to dist/public (overwrites the static file copied by Vite)
  const outDir = path.resolve(process.cwd(), 'dist', 'public');
  if (!fs.existsSync(outDir)) {
    console.log(`  WARNING: ${outDir} does not exist yet, writing to public/ instead`);
    fs.writeFileSync(path.resolve(process.cwd(), 'public', 'sitemap.xml'), xml);
  } else {
    fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml);
  }

  console.log(`  Sitemap generated: ${addedUrls.size} URLs`);
}

// Also generate image sitemap
async function generateImageSitemap(): Promise<void> {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

  let imageCount = 0;

  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      const teamMembers = await sql`SELECT name, slug, image FROM team_members WHERE image IS NOT NULL ORDER BY "order", name`;
      teamMembers.forEach((member: any) => {
        if (member.image) {
          const imageUrl = member.image.startsWith('http') ? member.image : `${BASE_URL}${member.image}`;
          xml += `  <url>\n`;
          xml += `    <loc>${BASE_URL}/team/${escapeXml(member.slug)}</loc>\n`;
          xml += `    <image:image>\n`;
          xml += `      <image:loc>${escapeXml(imageUrl)}</image:loc>\n`;
          xml += `      <image:title>${escapeXml(member.name)} - Empathy Health Clinic</image:title>\n`;
          xml += `    </image:image>\n`;
          xml += `  </url>\n`;
          imageCount++;
        }
      });
    } catch (error) {
      console.error('  WARNING: Image sitemap DB query failed:', error);
    }
  }

  xml += '</urlset>\n';

  const outDir = path.resolve(process.cwd(), 'dist', 'public');
  if (fs.existsSync(outDir)) {
    fs.writeFileSync(path.join(outDir, 'image-sitemap.xml'), xml);
  }
  console.log(`  Image sitemap generated: ${imageCount} images`);
}

async function main() {
  console.log('Generating sitemaps...');
  await generateSitemap();
  await generateImageSitemap();
  console.log('Sitemap generation complete.');
}

main().catch((err) => {
  console.error('Sitemap generation failed (non-blocking):', err);
  process.exit(0); // Never block the build
});
