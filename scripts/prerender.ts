/**
 * Prerender Script for Static HTML Generation
 * 
 * This script generates static HTML files for all marketing pages at build time.
 * The pre-rendered HTML is served by Express for better SEO crawlability.
 * 
 * Usage: npx tsx scripts/prerender.ts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function prerender() {
  console.log('🚀 Starting prerender process...\n');
  
  // Read the client HTML template
  const templatePath = path.resolve(rootDir, 'dist/public/index.html');
  
  if (!fs.existsSync(templatePath)) {
    console.error('❌ Error: dist/public/index.html not found. Run `npm run build` first.');
    process.exit(1);
  }
  
  const template = fs.readFileSync(templatePath, 'utf-8');
  
  // Import the SSR entry point
  const { render, prerenderRoutes } = await import('../dist/server/entry-server.js');
  
  // Create prerendered output directory
  const outputDir = path.resolve(rootDir, 'dist/prerendered');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  console.log(`📄 Prerendering ${prerenderRoutes.length} routes...\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const route of prerenderRoutes) {
    try {
      // Render the route to HTML
      const appHtml = render(route);
      
      if (!appHtml) {
        console.log(`⏭️  Skipping ${route} (no component found)`);
        continue;
      }
      
      // Inject the rendered HTML into the template
      const html = template.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`
      );
      
      // Determine output file path
      const fileName = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
      const filePath = path.resolve(outputDir, fileName);
      
      // Ensure directory exists for nested routes
      const fileDir = path.dirname(filePath);
      if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, { recursive: true });
      }
      
      // Write the pre-rendered HTML
      fs.writeFileSync(filePath, html);
      console.log(`✅ ${route} → ${fileName}`);
      successCount++;
      
    } catch (error: any) {
      console.error(`❌ Error prerendering ${route}:`, error.message);
      errorCount++;
    }
  }
  
  console.log(`\n📊 Prerender complete!`);
  console.log(`   ✅ Success: ${successCount} pages`);
  console.log(`   ❌ Errors: ${errorCount} pages`);
  console.log(`   📁 Output: ${outputDir}`);
  
  // Generate manifest of prerendered routes
  const manifestPath = path.resolve(outputDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify({
    generatedAt: new Date().toISOString(),
    routes: prerenderRoutes,
    successCount,
    errorCount
  }, null, 2));
  
  console.log(`   📋 Manifest: ${manifestPath}\n`);
}

prerender().catch((error) => {
  console.error('Fatal error during prerendering:', error);
  process.exit(1);
});
