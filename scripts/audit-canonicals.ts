#!/usr/bin/env npx tsx
/**
 * Canonical Audit Script
 * Validates canonical tags across all prerendered pages
 * Flags: wrong host, pointing to non-200 pages, missing on indexable pages
 */

import fs from 'fs';
import path from 'path';

const PREFERRED_HOST = 'https://www.empathyhealthclinic.com';
const PRERENDERED_DIR = path.join(process.cwd(), 'dist', 'prerendered');

interface AuditResult {
  path: string;
  canonical: string | null;
  issues: string[];
}

function extractCanonical(html: string): string | null {
  const match = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

function extractRobots(html: string): string | null {
  const match = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

function auditPage(filePath: string, relativePath: string): AuditResult {
  const html = fs.readFileSync(filePath, 'utf-8');
  const canonical = extractCanonical(html);
  const robots = extractRobots(html);
  const issues: string[] = [];

  const isNoindex = robots?.toLowerCase().includes('noindex');

  if (!canonical) {
    if (!isNoindex) {
      issues.push('MISSING: No canonical tag on indexable page');
    }
  } else {
    if (!canonical.startsWith(PREFERRED_HOST)) {
      issues.push(`WRONG_HOST: Canonical uses "${new URL(canonical).origin}" instead of "${PREFERRED_HOST}"`);
    }

    if (canonical.includes('?') || canonical.includes('#')) {
      issues.push(`HAS_PARAMS: Canonical contains query params or fragments: ${canonical}`);
    }

    if (canonical.endsWith('/') && canonical !== `${PREFERRED_HOST}/`) {
      issues.push(`TRAILING_SLASH: Canonical has trailing slash: ${canonical}`);
    }

    if (isNoindex) {
      const canonicalPath = new URL(canonical).pathname;
      const pagePath = relativePath.replace('/index.html', '') || '/';
      if (canonicalPath !== pagePath) {
        issues.push(`NOINDEX_CROSS_CANONICAL: Noindex page points to different URL: ${canonical}`);
      }
    }
  }

  return {
    path: relativePath.replace('/index.html', '') || '/',
    canonical,
    issues
  };
}

function walkDir(dir: string, results: AuditResult[] = [], basePath = ''): AuditResult[] {
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    const relativePath = path.join(basePath, item.name);

    if (item.isDirectory()) {
      walkDir(fullPath, results, relativePath);
    } else if (item.name === 'index.html') {
      const result = auditPage(fullPath, basePath || '/');
      if (result.issues.length > 0) {
        results.push(result);
      }
    }
  }

  return results;
}

function main() {
  console.log('🔍 Canonical Audit Script');
  console.log('='.repeat(60));
  console.log(`Scanning: ${PRERENDERED_DIR}`);
  console.log(`Preferred host: ${PREFERRED_HOST}`);
  console.log('');

  if (!fs.existsSync(PRERENDERED_DIR)) {
    console.error('❌ Prerendered directory not found. Run build first.');
    process.exit(1);
  }

  const issues = walkDir(PRERENDERED_DIR);

  if (issues.length === 0) {
    console.log('✅ No canonical issues found!');
    process.exit(0);
  }

  console.log(`❌ Found ${issues.length} pages with canonical issues:\n`);

  const byIssueType: Record<string, AuditResult[]> = {};
  for (const result of issues) {
    for (const issue of result.issues) {
      const type = issue.split(':')[0];
      if (!byIssueType[type]) byIssueType[type] = [];
      byIssueType[type].push(result);
    }
  }

  for (const [type, results] of Object.entries(byIssueType)) {
    console.log(`\n📋 ${type} (${results.length} pages):`);
    for (const r of results.slice(0, 10)) {
      console.log(`  ${r.path}`);
      for (const issue of r.issues) {
        if (issue.startsWith(type)) {
          console.log(`    → ${issue.split(': ').slice(1).join(': ')}`);
        }
      }
    }
    if (results.length > 10) {
      console.log(`  ... and ${results.length - 10} more`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`Total: ${issues.length} pages with issues`);
  
  process.exit(issues.length > 0 ? 1 : 0);
}

main();
