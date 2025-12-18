/**
 * Asset Integrity Verification Script
 * 
 * Ensures atomic deploys by verifying all assets referenced in prerendered HTML
 * actually exist in the production build. This prevents "blank page" and "unstyled"
 * issues caused by HTML pointing to hashed assets that don't exist.
 * 
 * Checks:
 * 1. All CSS/JS bundles referenced in HTML exist in dist/public/assets/
 * 2. Asset hashes are consistent across all HTML files
 * 3. Critical assets (main CSS, main JS) are present
 * 
 * Usage: npx tsx scripts/verify-asset-integrity.ts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const PRERENDER_DIR = path.join(rootDir, 'dist/prerendered');
const PUBLIC_DIR = path.join(rootDir, 'dist/public');
const ASSETS_DIR = path.join(PUBLIC_DIR, 'assets');

interface AssetReference {
  type: 'css' | 'js' | 'image' | 'other';
  path: string;
  foundIn: string[];
}

interface VerificationResult {
  success: boolean;
  totalFiles: number;
  assetReferences: Map<string, AssetReference>;
  missingAssets: string[];
  inconsistentAssets: { asset: string; versions: string[] }[];
  criticalAssetsMissing: string[];
}

function walkDir(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

function extractAssetReferences(html: string): string[] {
  const assets: string[] = [];
  
  // Extract JS script sources
  const scriptMatches = html.matchAll(/src="(\/assets\/[^"]+)"/g);
  for (const match of scriptMatches) {
    assets.push(match[1]);
  }
  
  // Extract CSS hrefs
  const cssMatches = html.matchAll(/href="(\/assets\/[^"]+\.css[^"]*)"/g);
  for (const match of cssMatches) {
    assets.push(match[1]);
  }
  
  return assets;
}

function getAssetType(assetPath: string): 'css' | 'js' | 'image' | 'other' {
  if (assetPath.endsWith('.css')) return 'css';
  if (assetPath.endsWith('.js')) return 'js';
  if (/\.(png|jpg|jpeg|gif|svg|webp|ico)$/i.test(assetPath)) return 'image';
  return 'other';
}

function verifyAssets(): VerificationResult {
  console.log('🔍 Asset Integrity Verification\n');
  console.log('━'.repeat(50));
  
  // Check directories exist
  if (!fs.existsSync(PRERENDER_DIR)) {
    console.error('❌ Prerender directory not found:', PRERENDER_DIR);
    process.exit(1);
  }
  
  if (!fs.existsSync(PUBLIC_DIR)) {
    console.error('❌ Public directory not found:', PUBLIC_DIR);
    console.error('   Run "npm run build" first');
    process.exit(1);
  }
  
  // Get all available assets
  const availableAssets = new Set<string>();
  if (fs.existsSync(ASSETS_DIR)) {
    const assetFiles = fs.readdirSync(ASSETS_DIR);
    for (const file of assetFiles) {
      availableAssets.add(`/assets/${file}`);
    }
  }
  
  console.log(`📦 Available assets in dist/public/assets: ${availableAssets.size}`);
  
  // Get all HTML files
  const htmlFiles = walkDir(PRERENDER_DIR);
  console.log(`📄 Prerendered HTML files: ${htmlFiles.length}\n`);
  
  // Collect all asset references
  const assetReferences = new Map<string, AssetReference>();
  
  for (const htmlFile of htmlFiles) {
    const html = fs.readFileSync(htmlFile, 'utf-8');
    const assets = extractAssetReferences(html);
    const relativePath = htmlFile.replace(PRERENDER_DIR, '');
    
    for (const asset of assets) {
      if (!assetReferences.has(asset)) {
        assetReferences.set(asset, {
          type: getAssetType(asset),
          path: asset,
          foundIn: []
        });
      }
      assetReferences.get(asset)!.foundIn.push(relativePath);
    }
  }
  
  // Check for missing assets
  const missingAssets: string[] = [];
  for (const [assetPath] of assetReferences) {
    if (!availableAssets.has(assetPath)) {
      missingAssets.push(assetPath);
    }
  }
  
  // Check for critical assets (main CSS and JS)
  const criticalAssetsMissing: string[] = [];
  const hasMainCSS = Array.from(assetReferences.keys()).some(a => a.includes('index') && a.endsWith('.css'));
  const hasMainJS = Array.from(assetReferences.keys()).some(a => a.includes('index') && a.endsWith('.js'));
  
  if (!hasMainCSS) {
    criticalAssetsMissing.push('Main CSS bundle (index-*.css)');
  }
  if (!hasMainJS) {
    criticalAssetsMissing.push('Main JS bundle (index-*.js)');
  }
  
  // Check for inconsistent asset versions (different hashes across HTML files)
  const assetPatterns = new Map<string, Set<string>>();
  for (const [assetPath] of assetReferences) {
    // Extract base name without hash (e.g., "index" from "index-ABC123.js")
    const baseName = assetPath.replace(/\/assets\//, '').replace(/-[a-zA-Z0-9]+\./, '.');
    if (!assetPatterns.has(baseName)) {
      assetPatterns.set(baseName, new Set());
    }
    assetPatterns.get(baseName)!.add(assetPath);
  }
  
  const inconsistentAssets: { asset: string; versions: string[] }[] = [];
  for (const [baseName, versions] of assetPatterns) {
    if (versions.size > 1) {
      inconsistentAssets.push({
        asset: baseName,
        versions: Array.from(versions)
      });
    }
  }
  
  const success = missingAssets.length === 0 && 
                  criticalAssetsMissing.length === 0 && 
                  inconsistentAssets.length === 0;
  
  return {
    success,
    totalFiles: htmlFiles.length,
    assetReferences,
    missingAssets,
    inconsistentAssets,
    criticalAssetsMissing
  };
}

function printResults(result: VerificationResult): void {
  console.log('━'.repeat(50));
  console.log('📊 VERIFICATION RESULTS\n');
  
  // Asset summary by type
  const byType = { css: 0, js: 0, image: 0, other: 0 };
  for (const [, ref] of result.assetReferences) {
    byType[ref.type]++;
  }
  
  console.log('Asset references found:');
  console.log(`  CSS:    ${byType.css}`);
  console.log(`  JS:     ${byType.js}`);
  console.log(`  Images: ${byType.image}`);
  console.log(`  Other:  ${byType.other}`);
  console.log('');
  
  // Critical assets check
  if (result.criticalAssetsMissing.length > 0) {
    console.log('❌ CRITICAL ASSETS MISSING:');
    for (const asset of result.criticalAssetsMissing) {
      console.log(`   - ${asset}`);
    }
    console.log('');
  }
  
  // Missing assets
  if (result.missingAssets.length > 0) {
    console.log(`❌ MISSING ASSETS (${result.missingAssets.length}):`);
    for (const asset of result.missingAssets.slice(0, 10)) {
      const ref = result.assetReferences.get(asset);
      console.log(`   - ${asset}`);
      console.log(`     Referenced in: ${ref?.foundIn.slice(0, 3).join(', ')}${(ref?.foundIn.length || 0) > 3 ? '...' : ''}`);
    }
    if (result.missingAssets.length > 10) {
      console.log(`   ... and ${result.missingAssets.length - 10} more`);
    }
    console.log('');
  }
  
  // Inconsistent assets
  if (result.inconsistentAssets.length > 0) {
    console.log(`⚠️  INCONSISTENT ASSET VERSIONS (${result.inconsistentAssets.length}):`);
    for (const { asset, versions } of result.inconsistentAssets) {
      console.log(`   - ${asset}:`);
      for (const version of versions) {
        console.log(`     • ${version}`);
      }
    }
    console.log('');
    console.log('   This indicates HTML files reference different asset hashes.');
    console.log('   Regenerate prerendered files: python3 scripts/fix-prerender-assets.py');
    console.log('');
  }
  
  // Final verdict
  console.log('━'.repeat(50));
  
  if (result.success) {
    console.log('✅ ASSET INTEGRITY VERIFIED');
    console.log('   All referenced assets exist and are consistent.');
    console.log('   Safe for atomic deploy!\n');
  } else {
    console.log('❌ ASSET INTEGRITY FAILED');
    console.log('   Fix issues above before deploying.');
    console.log('');
    console.log('   Quick fix: python3 scripts/fix-prerender-assets.py');
    console.log('   Then run: npx tsx scripts/verify-asset-integrity.ts\n');
    process.exit(1);
  }
}

// Run verification
const result = verifyAssets();
printResults(result);
