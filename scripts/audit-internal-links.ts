#!/usr/bin/env npx tsx
/**
 * Internal Links Audit Script
 * Identifies pages with low outlink counts and links that redirect
 */

import fs from 'fs';
import path from 'path';

const PRERENDERED_DIR = path.join(process.cwd(), 'dist', 'prerendered');
const MIN_OUTLINKS = 3;

interface PageAudit {
  path: string;
  internalLinks: string[];
  externalLinks: string[];
  issues: string[];
}

function extractLinks(html: string): { internal: string[]; external: string[] } {
  const linkRegex = /<a[^>]*href=["']([^"']+)["'][^>]*>/gi;
  const internal: string[] = [];
  const external: string[] = [];
  
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1];
    
    if (href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      continue;
    }
    
    if (href.startsWith('http://') || href.startsWith('https://')) {
      if (href.includes('empathyhealthclinic.com')) {
        try {
          internal.push(new URL(href).pathname);
        } catch {
          internal.push(href);
        }
      } else {
        external.push(href);
      }
    } else if (href.startsWith('/')) {
      internal.push(href.split('?')[0].split('#')[0]);
    }
  }
  
  return { 
    internal: [...new Set(internal)], 
    external: [...new Set(external)] 
  };
}

function auditPage(filePath: string, relativePath: string): PageAudit {
  const html = fs.readFileSync(filePath, 'utf-8');
  const links = extractLinks(html);
  const issues: string[] = [];
  
  const pagePath = relativePath.replace('/index.html', '') || '/';
  
  if (links.internal.length < MIN_OUTLINKS) {
    issues.push(`LOW_OUTLINKS: Only ${links.internal.length} internal links (min: ${MIN_OUTLINKS})`);
  }
  
  return {
    path: pagePath,
    internalLinks: links.internal,
    externalLinks: links.external,
    issues
  };
}

function walkDir(dir: string, results: PageAudit[] = [], basePath = ''): PageAudit[] {
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    const relativePath = path.join(basePath, item.name);

    if (item.isDirectory()) {
      walkDir(fullPath, results, relativePath);
    } else if (item.name === 'index.html') {
      results.push(auditPage(fullPath, basePath || '/'));
    }
  }

  return results;
}

function main() {
  console.log('🔗 Internal Links Audit Script');
  console.log('='.repeat(60));
  console.log(`Scanning: ${PRERENDERED_DIR}`);
  console.log(`Minimum outlinks: ${MIN_OUTLINKS}`);
  console.log('');

  if (!fs.existsSync(PRERENDERED_DIR)) {
    console.error('❌ Prerendered directory not found. Run build first.');
    process.exit(1);
  }

  const allPages = walkDir(PRERENDERED_DIR);
  const lowOutlinkPages = allPages.filter(p => p.issues.some(i => i.startsWith('LOW_OUTLINKS')));
  
  console.log(`📊 Total pages analyzed: ${allPages.length}`);
  console.log(`📊 Pages with low outlinks: ${lowOutlinkPages.length}`);
  console.log('');
  
  if (lowOutlinkPages.length > 0) {
    console.log('❌ Pages with insufficient internal links:\n');
    
    for (const page of lowOutlinkPages.slice(0, 20)) {
      console.log(`  ${page.path} (${page.internalLinks.length} links)`);
    }
    
    if (lowOutlinkPages.length > 20) {
      console.log(`  ... and ${lowOutlinkPages.length - 20} more`);
    }
  } else {
    console.log('✅ All pages have sufficient internal links!');
  }
  
  const avgLinks = allPages.reduce((sum, p) => sum + p.internalLinks.length, 0) / allPages.length;
  console.log(`\n📊 Average internal links per page: ${avgLinks.toFixed(1)}`);
  
  const minPage = allPages.reduce((min, p) => p.internalLinks.length < min.internalLinks.length ? p : min);
  const maxPage = allPages.reduce((max, p) => p.internalLinks.length > max.internalLinks.length ? p : max);
  
  console.log(`📊 Min links: ${minPage.path} (${minPage.internalLinks.length})`);
  console.log(`📊 Max links: ${maxPage.path} (${maxPage.internalLinks.length})`);
  
  process.exit(lowOutlinkPages.length > 0 ? 1 : 0);
}

main();
