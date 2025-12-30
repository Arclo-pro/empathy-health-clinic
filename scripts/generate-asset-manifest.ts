#!/usr/bin/env npx tsx
/**
 * Generate Asset Manifest
 * 
 * Creates a comprehensive inventory of all images in attached_assets/
 * with checksums for verification during CDN migration.
 * 
 * Output: scripts/asset-manifest.json
 * 
 * Usage:
 *   npx tsx scripts/generate-asset-manifest.ts
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

interface AssetEntry {
  path: string;           // Relative path from attached_assets/
  publicUrl: string;      // Public URL path (/attached_assets/...)
  size: number;           // File size in bytes
  md5: string;            // MD5 checksum for verification
  extension: string;      // File extension
  directory: string;      // Parent directory name
}

interface AssetManifest {
  generated: string;
  totalFiles: number;
  totalSizeBytes: number;
  totalSizeMB: string;
  assets: AssetEntry[];
  byDirectory: Record<string, number>;
  byExtension: Record<string, number>;
}

const ATTACHED_ASSETS_DIR = path.resolve(process.cwd(), 'attached_assets');
const OUTPUT_FILE = path.resolve(process.cwd(), 'scripts/asset-manifest.json');

// Image extensions to include
const IMAGE_EXTENSIONS = new Set([
  '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico', '.bmp', '.tiff', '.tif'
]);

function calculateMd5(filePath: string): string {
  // Skip MD5 by default for speed (13k+ files takes too long)
  // Enable with CALCULATE_MD5=true if needed for verification
  if (process.env.CALCULATE_MD5 !== 'true') {
    return 'skipped';
  }
  const content = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(content).digest('hex');
}

function walkDirectory(dir: string, basePath: string = ''): AssetEntry[] {
  const entries: AssetEntry[] = [];
  
  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    return entries;
  }

  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    const relativePath = path.join(basePath, item.name);
    
    if (item.isDirectory()) {
      // Recurse into subdirectories
      entries.push(...walkDirectory(fullPath, relativePath));
    } else if (item.isFile()) {
      const ext = path.extname(item.name).toLowerCase();
      
      // Only include image files
      if (IMAGE_EXTENSIONS.has(ext)) {
        const stats = fs.statSync(fullPath);
        const md5 = calculateMd5(fullPath);
        
        entries.push({
          path: relativePath,
          publicUrl: `/attached_assets/${relativePath}`,
          size: stats.size,
          md5: md5,
          extension: ext,
          directory: basePath || 'root'
        });
      }
    }
  }
  
  return entries;
}

function generateManifest(): AssetManifest {
  console.log('Scanning attached_assets directory...');
  console.log(`Path: ${ATTACHED_ASSETS_DIR}\n`);
  
  const assets = walkDirectory(ATTACHED_ASSETS_DIR);
  
  // Calculate totals
  const totalSizeBytes = assets.reduce((sum, a) => sum + a.size, 0);
  
  // Group by directory
  const byDirectory: Record<string, number> = {};
  for (const asset of assets) {
    byDirectory[asset.directory] = (byDirectory[asset.directory] || 0) + 1;
  }
  
  // Group by extension
  const byExtension: Record<string, number> = {};
  for (const asset of assets) {
    byExtension[asset.extension] = (byExtension[asset.extension] || 0) + 1;
  }
  
  const manifest: AssetManifest = {
    generated: new Date().toISOString(),
    totalFiles: assets.length,
    totalSizeBytes,
    totalSizeMB: (totalSizeBytes / (1024 * 1024)).toFixed(2),
    assets,
    byDirectory,
    byExtension
  };
  
  return manifest;
}

function main() {
  console.log('===========================================');
  console.log('Asset Manifest Generator');
  console.log('===========================================\n');
  
  const manifest = generateManifest();
  
  // Write manifest to file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
  
  console.log('Summary:');
  console.log('-------------------------------------------');
  console.log(`Total images: ${manifest.totalFiles}`);
  console.log(`Total size: ${manifest.totalSizeMB} MB`);
  console.log('');
  
  console.log('By Directory:');
  const sortedDirs = Object.entries(manifest.byDirectory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  for (const [dir, count] of sortedDirs) {
    console.log(`  ${dir}: ${count} files`);
  }
  if (Object.keys(manifest.byDirectory).length > 10) {
    console.log(`  ... and ${Object.keys(manifest.byDirectory).length - 10} more directories`);
  }
  console.log('');
  
  console.log('By Extension:');
  for (const [ext, count] of Object.entries(manifest.byExtension)) {
    console.log(`  ${ext}: ${count} files`);
  }
  console.log('');
  
  console.log(`Manifest written to: ${OUTPUT_FILE}`);
  console.log('');
  console.log('Next Steps:');
  console.log('1. Upload images to CDN (R2/S3/Cloudinary)');
  console.log('2. Set EXTERNAL_ASSET_URL environment variable');
  console.log('3. Run: npx tsx scripts/validate-assets.ts');
  console.log('===========================================');
}

main();
