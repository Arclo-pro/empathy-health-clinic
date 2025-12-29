#!/usr/bin/env node
/**
 * Fix Prerender Assets - Compatibility Wrapper
 * 
 * This file exists for backward compatibility with build tools that expect
 * fix-prerender-assets.ts. It simply executes the canonical .mjs version.
 * 
 * The actual implementation is in fix-prerender-assets.mjs which runs with
 * plain Node.js (no tsx required) for reliable deployment.
 * 
 * Usage: npx tsx scripts/fix-prerender-assets.ts
 * Or directly: node scripts/fix-prerender-assets.mjs
 */

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mjsScript = path.join(__dirname, 'fix-prerender-assets.mjs');

console.log('🔄 Delegating to fix-prerender-assets.mjs...\n');

try {
  execSync(`node "${mjsScript}"`, { 
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..')
  });
} catch (error: any) {
  console.error('❌ fix-prerender-assets.mjs failed');
  process.exit(error.status || 1);
}
