import * as fs from 'fs';
import * as path from 'path';

const SITE_ASSETS = './public/site-assets';
const BLOG_ASSETS = './public/blog-assets';
const CLIENT_SRC = './client/src';

interface ValidationResult {
  file: string;
  image: string;
  exists: boolean;
}

function findImageReferences(dir: string): ValidationResult[] {
  const results: ValidationResult[] = [];
  
  function scanDir(currentDir: string) {
    const items = fs.readdirSync(currentDir);
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.includes('node_modules')) {
        scanDir(fullPath);
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        
        const siteAssetMatches = content.match(/\/site-assets\/[^"'\s\)\`]+/g) || [];
        const blogAssetMatches = content.match(/\/blog-assets\/[^"'\s\)\`]+/g) || [];
        
        for (const img of [...siteAssetMatches, ...blogAssetMatches]) {
          const cleanPath = img.split('?')[0];
          const localPath = `./public${cleanPath}`;
          results.push({
            file: fullPath,
            image: cleanPath,
            exists: fs.existsSync(localPath)
          });
        }
      }
    }
  }
  
  scanDir(dir);
  return results;
}

const results = findImageReferences(CLIENT_SRC);
const missing = results.filter(r => !r.exists);
const unique = [...new Map(missing.map(m => [m.image, m])).values()];

console.log('\n=== IMAGE VALIDATION REPORT ===\n');
console.log(`Total image references: ${results.length}`);
console.log(`Missing images: ${unique.length}`);

if (unique.length > 0) {
  console.log('\nMissing files:');
  unique.forEach(m => console.log(`  - ${m.image} (referenced in ${m.file})`));
  process.exit(1);
} else {
  console.log('\nAll referenced images exist.');
  process.exit(0);
}
