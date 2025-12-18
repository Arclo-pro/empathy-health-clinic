/**
 * JS-Disabled Smoke Test
 * 
 * This script verifies that pages render meaningful content without JavaScript.
 * Critical for SEO because crawlers often don't execute JS reliably.
 * 
 * Tests:
 * 1. Content renders without JS (not blank page)
 * 2. Internal links are present in HTML
 * 3. Critical elements exist (header, main content, footer)
 * 4. CSS is loaded (has style references)
 * 
 * Usage: npx tsx scripts/js-disabled-smoke-test.ts [--deployed]
 * 
 * Options:
 *   --deployed  Test against deployed URL instead of localhost
 */

import puppeteer from 'puppeteer';
import fs from 'fs';

const BASE_URL = process.env.TEST_URL || 'http://localhost:5000';
const IS_DEPLOYED = process.argv.includes('--deployed');

interface TestResult {
  url: string;
  passed: boolean;
  hasContent: boolean;
  hasLinks: boolean;
  hasHeader: boolean;
  hasMainContent: boolean;
  hasCSS: boolean;
  linkCount: number;
  contentLength: number;
  errors: string[];
}

interface TestSummary {
  passed: number;
  failed: number;
  results: TestResult[];
}

// Sample of pages to test (representative of different page types)
const TEST_PAGES = [
  '/',                          // Homepage
  '/psychiatrist-orlando',      // Service page
  '/services',                  // Services index
  '/team',                      // Team page
  '/insurance',                 // Insurance page
  '/blog',                      // Blog index
  '/contact',                   // Contact page
  '/therapy-services',          // Therapy services
  '/conditions',                // Conditions page
  '/psychiatrist-near-me',      // High-intent landing
];

async function testPage(browser: any, url: string): Promise<TestResult> {
  const page = await browser.newPage();
  const errors: string[] = [];
  
  try {
    // Disable JavaScript
    await page.setJavaScriptEnabled(false);
    
    // Navigate to page
    await page.goto(`${BASE_URL}${url}`, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
    
    // Get page content
    const html = await page.content();
    const contentLength = html.length;
    
    // Check for content (not just React shell)
    const bodyContent = await page.evaluate(() => {
      const root = document.getElementById('root');
      return root ? root.textContent?.trim() || '' : document.body.textContent?.trim() || '';
    });
    const hasContent = bodyContent.length > 200;
    
    if (!hasContent) {
      errors.push(`Content too short: ${bodyContent.length} chars (need 200+)`);
    }
    
    // Check for internal links
    const links = await page.evaluate(() => {
      const anchors = document.querySelectorAll('a[href^="/"]');
      return anchors.length;
    });
    const hasLinks = links >= 5;
    
    if (!hasLinks) {
      errors.push(`Too few links: ${links} (need 5+)`);
    }
    
    // Check for header
    const hasHeader = await page.evaluate(() => {
      return !!(document.querySelector('header') || 
                document.querySelector('nav') || 
                document.querySelector('[role="banner"]'));
    });
    
    if (!hasHeader) {
      errors.push('Missing header/nav element');
    }
    
    // Check for main content area
    const hasMainContent = await page.evaluate(() => {
      return !!(document.querySelector('main') || 
                document.querySelector('[role="main"]') ||
                document.querySelector('article') ||
                document.querySelector('section'));
    });
    
    if (!hasMainContent) {
      errors.push('Missing main content area');
    }
    
    // Check for CSS reference
    const hasCSS = await page.evaluate(() => {
      const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
      return cssLinks.length > 0;
    });
    
    if (!hasCSS) {
      errors.push('No CSS stylesheet linked');
    }
    
    const passed = hasContent && hasLinks && hasHeader && hasMainContent && hasCSS;
    
    return {
      url,
      passed,
      hasContent,
      hasLinks,
      hasHeader,
      hasMainContent,
      hasCSS,
      linkCount: links,
      contentLength,
      errors
    };
    
  } catch (error: any) {
    return {
      url,
      passed: false,
      hasContent: false,
      hasLinks: false,
      hasHeader: false,
      hasMainContent: false,
      hasCSS: false,
      linkCount: 0,
      contentLength: 0,
      errors: [error.message]
    };
  } finally {
    await page.close();
  }
}

async function runTests(): Promise<TestSummary> {
  console.log('🧪 JS-Disabled Smoke Test\n');
  console.log('━'.repeat(50));
  console.log(`📍 Testing: ${BASE_URL}`);
  console.log(`📋 Pages: ${TEST_PAGES.length}`);
  console.log(`🔧 JavaScript: DISABLED\n`);
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const results: TestResult[] = [];
  
  for (const url of TEST_PAGES) {
    process.stdout.write(`  Testing ${url}... `);
    const result = await testPage(browser, url);
    results.push(result);
    
    if (result.passed) {
      console.log(`✅ (${result.linkCount} links, ${Math.round(result.contentLength/1024)}KB)`);
    } else {
      console.log(`❌ ${result.errors.join(', ')}`);
    }
  }
  
  await browser.close();
  
  return {
    passed: results.filter(r => r.passed).length,
    failed: results.filter(r => !r.passed).length,
    results
  };
}

function printSummary(summary: TestSummary): void {
  console.log('\n' + '━'.repeat(50));
  console.log('📊 TEST SUMMARY\n');
  
  console.log(`✅ Passed: ${summary.passed}/${summary.results.length}`);
  console.log(`❌ Failed: ${summary.failed}/${summary.results.length}`);
  
  if (summary.failed > 0) {
    console.log('\nFailed pages:');
    for (const result of summary.results.filter(r => !r.passed)) {
      console.log(`  ${result.url}:`);
      for (const error of result.errors) {
        console.log(`    - ${error}`);
      }
    }
  }
  
  console.log('\n' + '━'.repeat(50));
  
  if (summary.failed === 0) {
    console.log('✅ ALL PAGES RENDER WITHOUT JAVASCRIPT');
    console.log('   Crawlers will see meaningful content.\n');
  } else {
    console.log('❌ SOME PAGES FAIL WITHOUT JAVASCRIPT');
    console.log('   Crawlers may see blank or broken pages.');
    console.log('   Fix prerendered HTML or check prerender script.\n');
    process.exit(1);
  }
}

// Main
async function main() {
  // Check if server is running (unless testing deployed)
  if (!IS_DEPLOYED) {
    try {
      const response = await fetch(`${BASE_URL}/`);
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Server not running at', BASE_URL);
      console.error('   Start the server first or use --deployed flag');
      process.exit(1);
    }
  }
  
  const summary = await runTests();
  printSummary(summary);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
