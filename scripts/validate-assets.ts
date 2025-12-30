#!/usr/bin/env npx tsx
/**
 * Validate Assets Script
 * 
 * Checks that all referenced images in the application are accessible.
 * Validates both local files and CDN URLs (if EXTERNAL_ASSET_URL is set).
 * 
 * Sources checked:
 * - Blog posts (featuredImage field)
 * - Image sitemap entries
 * - Asset manifest (if generated)
 * 
 * Usage:
 *   npx tsx scripts/validate-assets.ts
 *   npx tsx scripts/validate-assets.ts --cdn  # Force CDN validation
 */

import fs from 'fs';
import path from 'path';

interface ValidationResult {
  url: string;
  source: string;
  status: 'ok' | 'missing' | 'error';
  details?: string;
}

const ATTACHED_ASSETS_DIR = path.resolve(process.cwd(), 'attached_assets');
const BLOG_POSTS_FILE = path.resolve(process.cwd(), 'server/blog-posts-data.json');
const MANIFEST_FILE = path.resolve(process.cwd(), 'scripts/asset-manifest.json');

const EXTERNAL_ASSET_URL = process.env.EXTERNAL_ASSET_URL;
const FORCE_CDN = process.argv.includes('--cdn');
const SAMPLE_SIZE = parseInt(process.env.SAMPLE_SIZE || '50', 10);

async function checkUrlExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

function checkLocalFile(relativePath: string): boolean {
  const fullPath = path.join(ATTACHED_ASSETS_DIR, relativePath);
  return fs.existsSync(fullPath);
}

async function validateUrl(url: string, source: string): Promise<ValidationResult> {
  // Extract relative path from URL
  const relativePath = url.replace('/attached_assets/', '');
  
  if (EXTERNAL_ASSET_URL || FORCE_CDN) {
    // Validate against CDN
    const cdnUrl = EXTERNAL_ASSET_URL 
      ? `${EXTERNAL_ASSET_URL.replace(/\/$/, '')}${url}`
      : `https://cdn.example.com${url}`; // Placeholder for --cdn flag
    
    if (!EXTERNAL_ASSET_URL && FORCE_CDN) {
      return {
        url,
        source,
        status: 'error',
        details: 'EXTERNAL_ASSET_URL not set (use --cdn with env var)'
      };
    }
    
    const exists = await checkUrlExists(cdnUrl);
    return {
      url,
      source,
      status: exists ? 'ok' : 'missing',
      details: exists ? `CDN: ${cdnUrl}` : `Not found at CDN: ${cdnUrl}`
    };
  } else {
    // Validate against local files
    const exists = checkLocalFile(relativePath);
    return {
      url,
      source,
      status: exists ? 'ok' : 'missing',
      details: exists ? 'Local file exists' : `Missing: ${relativePath}`
    };
  }
}

function extractBlogImageUrls(): string[] {
  if (!fs.existsSync(BLOG_POSTS_FILE)) {
    console.log('Blog posts file not found, skipping...');
    return [];
  }
  
  const content = fs.readFileSync(BLOG_POSTS_FILE, 'utf-8');
  const blogPosts = JSON.parse(content);
  
  const urls: string[] = [];
  for (const post of blogPosts) {
    if (post.featuredImage && post.featuredImage.startsWith('/attached_assets/')) {
      urls.push(post.featuredImage);
    }
  }
  
  return urls;
}

function extractManifestUrls(): string[] {
  if (!fs.existsSync(MANIFEST_FILE)) {
    console.log('Asset manifest not found. Run: npx tsx scripts/generate-asset-manifest.ts');
    return [];
  }
  
  const content = fs.readFileSync(MANIFEST_FILE, 'utf-8');
  const manifest = JSON.parse(content);
  
  return manifest.assets.map((a: any) => a.publicUrl);
}

async function main() {
  console.log('===========================================');
  console.log('Asset Validation');
  console.log('===========================================\n');
  
  if (EXTERNAL_ASSET_URL) {
    console.log(`Mode: CDN Validation`);
    console.log(`CDN URL: ${EXTERNAL_ASSET_URL}\n`);
  } else if (FORCE_CDN) {
    console.log('Error: --cdn flag requires EXTERNAL_ASSET_URL environment variable');
    process.exit(1);
  } else {
    console.log('Mode: Local File Validation');
    console.log(`Path: ${ATTACHED_ASSETS_DIR}\n`);
  }
  
  // Collect URLs to validate
  const urlsToValidate: Map<string, string> = new Map();
  
  // Blog post images
  console.log('Collecting blog post images...');
  const blogUrls = extractBlogImageUrls();
  for (const url of blogUrls) {
    urlsToValidate.set(url, 'blog_post');
  }
  console.log(`  Found ${blogUrls.length} blog images`);
  
  // Manifest images (sample)
  console.log('Collecting manifest images...');
  const manifestUrls = extractManifestUrls();
  // Sample for speed - checking all 13k would be slow for CDN
  const sampledManifest = manifestUrls.length > SAMPLE_SIZE
    ? manifestUrls.sort(() => Math.random() - 0.5).slice(0, SAMPLE_SIZE)
    : manifestUrls;
  for (const url of sampledManifest) {
    if (!urlsToValidate.has(url)) {
      urlsToValidate.set(url, 'manifest');
    }
  }
  console.log(`  Found ${manifestUrls.length} total, sampling ${sampledManifest.length}`);
  
  console.log(`\nValidating ${urlsToValidate.size} unique URLs...`);
  console.log('-------------------------------------------');
  
  // Validate URLs
  const results: ValidationResult[] = [];
  let okCount = 0;
  let missingCount = 0;
  let errorCount = 0;
  
  const entries = Array.from(urlsToValidate.entries());
  
  for (let i = 0; i < entries.length; i++) {
    const [url, source] = entries[i];
    
    const result = await validateUrl(url, source);
    results.push(result);
    
    if (result.status === 'ok') {
      okCount++;
    } else if (result.status === 'missing') {
      missingCount++;
      console.log(`MISSING: ${url}`);
      if (result.details) console.log(`         ${result.details}`);
    } else {
      errorCount++;
      console.log(`ERROR: ${url}`);
      if (result.details) console.log(`       ${result.details}`);
    }
    
    // Progress indicator
    if ((i + 1) % 50 === 0) {
      console.log(`  Progress: ${i + 1}/${entries.length}`);
    }
  }
  
  console.log('');
  console.log('===========================================');
  console.log('Results Summary');
  console.log('===========================================');
  console.log(`Total checked: ${results.length}`);
  console.log(`  OK:      ${okCount}`);
  console.log(`  Missing: ${missingCount}`);
  console.log(`  Errors:  ${errorCount}`);
  console.log('');
  
  if (missingCount === 0 && errorCount === 0) {
    console.log('All assets validated successfully!');
    process.exit(0);
  } else {
    console.log('Some assets are missing or have errors.');
    console.log('Review the output above for details.');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Validation failed:', err);
  process.exit(1);
});
