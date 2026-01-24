import * as fs from 'fs';
import * as path from 'path';

const ATTACHED_ASSETS = './attached_assets';
const SITE_ASSETS = './public/site-assets';
const BLOG_ASSETS = './public/blog-assets';

interface MigrationReport {
  copied: string[];
  missing: string[];
  updated: string[];
}

function findImageReferences(dir: string, extensions: string[]): Map<string, string[]> {
  const refs = new Map<string, string[]>();
  
  function scanDir(currentDir: string) {
    const items = fs.readdirSync(currentDir);
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.includes('node_modules') && !item.startsWith('.')) {
        scanDir(fullPath);
      } else if (extensions.some(ext => item.endsWith(ext))) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const matches = content.match(/\/attached_assets\/[^"'\s\)]+/g);
        if (matches) {
          refs.set(fullPath, [...new Set(matches)]);
        }
      }
    }
  }
  
  scanDir(dir);
  return refs;
}

function verifyMigration(): MigrationReport {
  const report: MigrationReport = { copied: [], missing: [], updated: [] };
  
  const siteAssetsLogos = fs.readdirSync(path.join(SITE_ASSETS, 'logos'));
  const siteAssetsStock = fs.existsSync(path.join(SITE_ASSETS, 'stock_images')) 
    ? fs.readdirSync(path.join(SITE_ASSETS, 'stock_images'))
    : [];
  
  report.copied = [
    ...siteAssetsLogos.map(f => `logos/${f}`),
    ...siteAssetsStock.map(f => `stock_images/${f}`)
  ];
  
  const refs = findImageReferences('./client/src', ['.tsx', '.ts', '.css']);
  refs.forEach((images, file) => {
    images.forEach(img => {
      const relativePath = img.replace('/attached_assets/', '');
      const inSiteAssets = 
        fs.existsSync(path.join(SITE_ASSETS, relativePath)) ||
        fs.existsSync(path.join(SITE_ASSETS, 'stock_images', path.basename(relativePath)));
      
      if (!inSiteAssets) {
        report.missing.push(`${file}: ${img}`);
      }
    });
  });
  
  return report;
}

const report = verifyMigration();
console.log('\n=== ASSET MIGRATION REPORT ===\n');
console.log(`Copied to site-assets: ${report.copied.length} files`);
console.log(`Missing references: ${report.missing.length}`);

if (report.missing.length > 0) {
  console.log('\nMissing files:');
  report.missing.slice(0, 20).forEach(m => console.log(`  - ${m}`));
  if (report.missing.length > 20) {
    console.log(`  ... and ${report.missing.length - 20} more`);
  }
}

console.log('\nNext steps: Update code references from /attached_assets/ to /site-assets/');
