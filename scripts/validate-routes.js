#!/usr/bin/env node

/**
 * Route Validation Script
 * 
 * This script validates that all defined routes in the application are accessible.
 * Run this before deploying to production to ensure no 404 errors.
 * 
 * Usage:
 *   node scripts/validate-routes.js           # Validate against local dev server
 *   node scripts/validate-routes.js --prod    # Validate against production URL
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Configuration
const DEV_URL = 'http://localhost:5000';
const PROD_URL = 'https://empathyhealthclinic.com';
const ROUTES_FILE = path.join(__dirname, '../routes/allRoutes.json');

// Core static routes that must always work (critical paths)
const CRITICAL_ROUTES = [
  '/',
  '/team',
  '/services',
  '/insurance',
  '/about',
  '/blog',
  '/request-appointment',
  '/thank-you',
  '/privacy-policy',
  '/what-we-treat',
  '/psychiatrist-orlando',
  '/anxiety-therapy',
  '/depression-counseling',
];

// Routes to skip (dynamic routes, admin routes, etc.)
const SKIP_PATTERNS = [
  /^\/admin/,           // Admin routes require auth
  /^\/auth/,            // Auth routes
  /^\/blog\/.+/,        // Individual blog posts (dynamic)
  /^\/team\/.+/,        // Individual team members (dynamic)
  /^\/locations\/.+/,   // Dynamic location routes
  /^\/conditions\//,    // Programmatic SEO pages
  /^\/insurance\//,     // Insurance condition pages
  /^\/compare\//,       // Comparison pages
  /^\/symptoms\//,      // Symptom pages
];

function shouldSkipRoute(route) {
  return SKIP_PATTERNS.some(pattern => pattern.test(route));
}

async function checkRoute(baseUrl, route, timeout = 10000) {
  return new Promise((resolve) => {
    const url = `${baseUrl}${route}`;
    const protocol = url.startsWith('https') ? https : http;
    
    const req = protocol.get(url, { timeout }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve({ route, status: res.statusCode, redirect: res.headers.location, ok: true });
        return;
      }
      
      // Check for success (200-299) or soft 404 (page loads but shows not found)
      const ok = res.statusCode >= 200 && res.statusCode < 400;
      resolve({ route, status: res.statusCode, ok });
    });
    
    req.on('error', (err) => {
      resolve({ route, status: 0, error: err.message, ok: false });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({ route, status: 0, error: 'Timeout', ok: false });
    });
  });
}

async function validateRoutes(isProd = false) {
  const baseUrl = isProd ? PROD_URL : DEV_URL;
  console.log(`\n🔍 Validating routes against: ${baseUrl}\n`);
  
  // Load routes from manifest
  let allRoutes = [];
  try {
    const routeData = JSON.parse(fs.readFileSync(ROUTES_FILE, 'utf-8'));
    allRoutes = routeData.routes || [];
  } catch (err) {
    console.error('❌ Failed to load routes manifest:', err.message);
    console.log('Using critical routes only...\n');
    allRoutes = CRITICAL_ROUTES;
  }
  
  // Filter routes
  const staticRoutes = allRoutes.filter(r => !shouldSkipRoute(r));
  console.log(`📋 Total routes in manifest: ${allRoutes.length}`);
  console.log(`📋 Static routes to validate: ${staticRoutes.length}`);
  console.log(`📋 Skipped (dynamic/admin): ${allRoutes.length - staticRoutes.length}\n`);
  
  // Validate critical routes first
  console.log('🚨 Checking CRITICAL routes...\n');
  const criticalResults = [];
  for (const route of CRITICAL_ROUTES) {
    const result = await checkRoute(baseUrl, route);
    criticalResults.push(result);
    const icon = result.ok ? '✅' : '❌';
    console.log(`  ${icon} ${route} - ${result.status}${result.error ? ` (${result.error})` : ''}`);
  }
  
  const criticalFailed = criticalResults.filter(r => !r.ok);
  if (criticalFailed.length > 0) {
    console.log(`\n❌ CRITICAL ROUTES FAILED: ${criticalFailed.length}`);
    criticalFailed.forEach(r => console.log(`   - ${r.route}: ${r.status} ${r.error || ''}`));
  }
  
  // Validate remaining static routes in batches
  const remainingRoutes = staticRoutes.filter(r => !CRITICAL_ROUTES.includes(r));
  if (remainingRoutes.length > 0) {
    console.log(`\n📦 Checking ${remainingRoutes.length} additional routes...\n`);
    
    const batchSize = 10;
    const allResults = [...criticalResults];
    
    for (let i = 0; i < remainingRoutes.length; i += batchSize) {
      const batch = remainingRoutes.slice(i, i + batchSize);
      const results = await Promise.all(batch.map(route => checkRoute(baseUrl, route)));
      allResults.push(...results);
      
      const failed = results.filter(r => !r.ok);
      if (failed.length > 0) {
        failed.forEach(r => console.log(`  ❌ ${r.route} - ${r.status}${r.error ? ` (${r.error})` : ''}`));
      } else {
        console.log(`  ✅ Batch ${Math.floor(i / batchSize) + 1}: ${batch.length} routes OK`);
      }
    }
    
    // Summary
    const allFailed = allResults.filter(r => !r.ok);
    const allPassed = allResults.filter(r => r.ok);
    
    console.log('\n' + '='.repeat(50));
    console.log('📊 VALIDATION SUMMARY');
    console.log('='.repeat(50));
    console.log(`✅ Passed: ${allPassed.length}`);
    console.log(`❌ Failed: ${allFailed.length}`);
    console.log(`📋 Total checked: ${allResults.length}`);
    
    if (allFailed.length > 0) {
      console.log('\n❌ FAILED ROUTES:');
      allFailed.forEach(r => console.log(`   ${r.route}: ${r.status} ${r.error || ''}`));
      process.exit(1);
    } else {
      console.log('\n✅ All routes validated successfully!');
      process.exit(0);
    }
  } else {
    if (criticalFailed.length > 0) {
      process.exit(1);
    }
    console.log('\n✅ All critical routes validated!');
  }
}

// Run validation
const isProd = process.argv.includes('--prod');
validateRoutes(isProd).catch(err => {
  console.error('Validation failed:', err);
  process.exit(1);
});
