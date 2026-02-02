/**
 * Soft 404 Monitor
 *
 * Validates that all URLs in the site resolve correctly:
 * - Redirect URLs return 301/308 (not 200)
 * - Valid pages return 200 with meaningful content
 * - Invalid URLs return 404 (not 200 with "not found" content)
 *
 * Run: npx tsx scripts/monitor-soft-404s.ts [--production] [--verbose]
 *
 * Options:
 *   --production  Check against https://www.empathyhealthclinic.com (default: localhost:5000)
 *   --verbose     Show all results, not just problems
 *   --fix         Output suggested additions to redirect-config.ts
 */

import { contentRedirectMap, normalizePath } from '../server/redirect-config.js';

const args = process.argv.slice(2);
const isProduction = args.includes('--production');
const isVerbose = args.includes('--verbose');
const isFix = args.includes('--fix');

const BASE_URL = isProduction
  ? 'https://www.empathyhealthclinic.com'
  : 'http://localhost:5000';

interface CheckResult {
  url: string;
  status: number;
  redirectLocation?: string;
  issue?: string;
  contentLength?: number;
}

async function checkUrl(urlPath: string): Promise<CheckResult> {
  const fullUrl = `${BASE_URL}${urlPath}`;

  try {
    const response = await fetch(fullUrl, {
      method: 'HEAD',
      redirect: 'manual', // Don't follow redirects - we want to see the 301
      headers: {
        'User-Agent': 'Soft404Monitor/1.0',
      },
    });

    const result: CheckResult = {
      url: urlPath,
      status: response.status,
      contentLength: parseInt(response.headers.get('content-length') || '0'),
    };

    if (response.status >= 300 && response.status < 400) {
      result.redirectLocation = response.headers.get('location') || undefined;
    }

    return result;
  } catch (err: any) {
    return {
      url: urlPath,
      status: 0,
      issue: `Fetch error: ${err.message}`,
    };
  }
}

async function checkRedirects(): Promise<CheckResult[]> {
  console.log('🔍 Checking redirect URLs...');
  const results: CheckResult[] = [];
  const entries = Object.entries(contentRedirectMap);

  // Check in batches of 10
  for (let i = 0; i < entries.length; i += 10) {
    const batch = entries.slice(i, i + 10);
    const batchResults = await Promise.all(
      batch.map(([source]) => checkUrl(source))
    );

    for (const result of batchResults) {
      if (result.status === 200) {
        result.issue = 'SOFT 404: Redirect URL returns 200 instead of 301';
      } else if (result.status !== 301 && result.status !== 308) {
        result.issue = `Unexpected status ${result.status} (expected 301/308)`;
      }
      results.push(result);
    }

    if (isVerbose && i % 50 === 0) {
      console.log(`  Checked ${i + batch.length}/${entries.length} redirects...`);
    }
  }

  return results;
}

async function checkTrailingSlashes(): Promise<CheckResult[]> {
  console.log('🔍 Checking trailing slash handling...');
  const testPaths = [
    '/blog/how-to-be-productive/',
    '/anxiety-therapy/',
    '/psychiatrist-orlando/',
    '/services/',
    '/team/',
    '/insurance/',
  ];

  const results: CheckResult[] = [];
  for (const urlPath of testPaths) {
    const result = await checkUrl(urlPath);
    if (result.status === 200) {
      result.issue = 'SOFT 404: Trailing slash URL returns 200 instead of 308 redirect';
    } else if (result.status !== 308 && result.status !== 301) {
      result.issue = `Unexpected status ${result.status} for trailing slash (expected 308)`;
    }
    results.push(result);
  }

  return results;
}

async function checkWwwRedirects(): Promise<CheckResult[]> {
  if (!isProduction) {
    console.log('⏭️  Skipping www redirect check (only works in production)');
    return [];
  }

  console.log('🔍 Checking www redirect handling...');
  const testPaths = ['/', '/services', '/blog', '/psychiatrist-orlando'];
  const results: CheckResult[] = [];

  for (const urlPath of testPaths) {
    const fullUrl = `https://empathyhealthclinic.com${urlPath}`;
    try {
      const response = await fetch(fullUrl, { method: 'HEAD', redirect: 'manual' });
      const result: CheckResult = {
        url: `(non-www) ${urlPath}`,
        status: response.status,
        redirectLocation: response.headers.get('location') || undefined,
      };

      if (response.status === 200) {
        result.issue = 'Non-www URL returns 200 instead of redirect to www';
      } else if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get('location') || '';
        if (!location.includes('www.empathyhealthclinic.com')) {
          result.issue = `Redirect doesn\'t point to www: ${location}`;
        }
      }
      results.push(result);
    } catch (err: any) {
      results.push({
        url: `(non-www) ${urlPath}`,
        status: 0,
        issue: `Fetch error: ${err.message}`,
      });
    }
  }

  return results;
}

async function checkSamplePages(): Promise<CheckResult[]> {
  console.log('🔍 Checking sample valid pages...');
  const validPages = [
    '/',
    '/services',
    '/blog',
    '/psychiatrist-orlando',
    '/anxiety-therapy',
    '/team',
    '/insurance',
  ];

  const results: CheckResult[] = [];
  for (const urlPath of validPages) {
    const result = await checkUrl(urlPath);
    if (result.status !== 200) {
      result.issue = `Valid page returned ${result.status} instead of 200`;
    }
    results.push(result);
  }

  return results;
}

async function checkInvalidPages(): Promise<CheckResult[]> {
  console.log('🔍 Checking invalid page handling...');
  const invalidPages = [
    '/this-page-does-not-exist-xyz123',
    '/blog/nonexistent-post-abc456',
    '/treatments/fake-treatment-789',
  ];

  const results: CheckResult[] = [];
  for (const urlPath of invalidPages) {
    const fullUrl = `${BASE_URL}${urlPath}`;
    try {
      // Use GET for invalid pages to check content
      const response = await fetch(fullUrl, {
        redirect: 'manual',
        headers: { 'User-Agent': 'Soft404Monitor/1.0' },
      });

      const result: CheckResult = {
        url: urlPath,
        status: response.status,
      };

      if (response.status === 200) {
        const text = await response.text();
        const looksLikeNotFound = text.includes('Page Not Found') ||
                                    text.includes('not found') ||
                                    text.includes('404') ||
                                    text.length < 1000;
        if (looksLikeNotFound) {
          result.issue = 'SOFT 404: Invalid URL returns 200 with "not found" content';
        } else {
          result.issue = 'SOFT 404: Invalid URL returns 200 with content (SPA catch-all)';
        }
      }
      results.push(result);
    } catch (err: any) {
      results.push({
        url: urlPath,
        status: 0,
        issue: `Fetch error: ${err.message}`,
      });
    }
  }

  return results;
}

async function main() {
  console.log(`\n📊 Soft 404 Monitor - ${isProduction ? 'PRODUCTION' : 'LOCAL'}`);
  console.log(`   Target: ${BASE_URL}`);
  console.log('');

  const allResults: CheckResult[] = [];

  // Run all checks
  allResults.push(...await checkSamplePages());
  allResults.push(...await checkTrailingSlashes());
  allResults.push(...await checkWwwRedirects());
  allResults.push(...await checkRedirects());
  allResults.push(...await checkInvalidPages());

  // Report results
  const issues = allResults.filter(r => r.issue);
  const ok = allResults.filter(r => !r.issue);

  console.log('\n' + '='.repeat(60));
  console.log('RESULTS');
  console.log('='.repeat(60));
  console.log(`✅ Passed: ${ok.length}`);
  console.log(`❌ Issues: ${issues.length}`);
  console.log(`📊 Total checked: ${allResults.length}`);
  console.log('');

  if (issues.length > 0) {
    console.log('ISSUES:');
    console.log('-'.repeat(60));
    for (const issue of issues) {
      console.log(`  ${issue.status} ${issue.url}`);
      console.log(`     → ${issue.issue}`);
      if (issue.redirectLocation) {
        console.log(`     → Location: ${issue.redirectLocation}`);
      }
    }
  }

  if (isVerbose && ok.length > 0) {
    console.log('\nPASSED:');
    console.log('-'.repeat(60));
    for (const result of ok) {
      console.log(`  ${result.status} ${result.url}${result.redirectLocation ? ` → ${result.redirectLocation}` : ''}`);
    }
  }

  if (isFix && issues.length > 0) {
    console.log('\nSUGGESTED FIXES:');
    console.log('-'.repeat(60));
    const softIssues = issues.filter(i => i.issue?.includes('SOFT 404') && i.status === 200);
    if (softIssues.length > 0) {
      console.log('Add to contentRedirectMap in server/redirect-config.ts:');
      for (const issue of softIssues) {
        if (issue.url.startsWith('/blog/')) {
          console.log(`  '${issue.url}': '/blog',  // Blog post not found`);
        } else {
          console.log(`  '${issue.url}': '/services',  // TODO: Choose appropriate destination`);
        }
      }
    }
  }

  console.log('');

  // Exit with error code if issues found
  if (issues.length > 0) {
    process.exit(1);
  }
}

main().catch(console.error);
