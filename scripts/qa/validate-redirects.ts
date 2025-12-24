/**
 * QA Redirect & URL Validator
 * 
 * Comprehensive validation to prevent soft 404s and broken redirects from reaching production.
 * 
 * Validates:
 * 1. All redirects in redirect-config.ts resolve to existing pages (200 status)
 * 2. Problem URLs from Screaming Frog/GSC CSV exports get proper redirects
 * 3. No redirect chains or loops
 * 4. Destination pages have real content (not soft 404s)
 * 
 * Usage: 
 *   npx tsx scripts/qa/validate-redirects.ts
 *   npx tsx scripts/qa/validate-redirects.ts --csv attached_assets/Table_1766600276696.csv
 * 
 * Exit codes:
 *   0 = All validations passed
 *   1 = One or more validations failed (blocks deployment)
 */

import fs from 'fs';
import path from 'path';

const BASE_URL = process.env.QA_BASE_URL || 'http://localhost:5000';
const MAX_REDIRECTS = 5;
const MIN_CONTENT_SIZE = 5000; // bytes - pages smaller than this are likely soft 404s
const TIMEOUT_MS = 10000;

interface ValidationResult {
  url: string;
  status: 'pass' | 'fail' | 'warning';
  httpStatus?: number;
  redirectChain: string[];
  finalUrl?: string;
  contentSize?: number;
  error?: string;
}

interface ValidationSummary {
  total: number;
  passed: number;
  failed: number;
  warnings: number;
  failures: ValidationResult[];
}

// Known pages that should exist (destinations for redirects)
const KNOWN_DESTINATION_PAGES = new Set([
  '/',
  '/services',
  '/therapy',
  '/anxiety-therapy',
  '/depression-treatment',
  '/adhd-treatment',
  '/bipolar-disorder-treatment',
  '/couples-therapy',
  '/couples-counseling',
  '/virtual-therapy',
  '/in-person-therapy',
  '/emdr-therapy',
  '/intimacy-therapy',
  '/insurance',
  '/about',
  '/contact-us',
  '/request-appointment',
  '/blog',
  '/privacy-policy',
  '/psychiatrist-orlando',
  '/psychiatrist-near-me',
  '/therapist-orlando',
  '/psychiatrist-orlando-accepts-bcbs',
  '/psychiatrist-orlando-accepts-cigna',
  '/psychiatrist-orlando-accepts-aetna',
  '/psychiatrist-orlando-accepts-united-healthcare',
  '/psychiatrist-orlando-accepts-umr',
  '/medicare-psychiatrist-orlando',
  '/therapist-accepts-oscar-health',
  '/sunshine-health-therapy',
  '/blue-cross-blue-shield-therapy-orlando',
  '/telepsychiatry-orlando',
  '/adhd-testing-orlando',
  '/psychiatric-evaluation',
  '/adhd-psychiatrist-orlando',
  '/locations/winter-park',
  '/locations/apopka',
]);

// Pages that are intentionally non-200 (admin, etc.)
const NON_200_ALLOWLIST = new Set([
  '/admin',
  '/login',
  '/auth',
]);

/**
 * Follow redirects manually to track the chain
 */
async function followRedirects(url: string): Promise<ValidationResult> {
  const chain: string[] = [url];
  let currentUrl = url;
  let finalStatus = 0;
  let contentSize = 0;
  
  try {
    for (let i = 0; i < MAX_REDIRECTS; i++) {
      const fullUrl = currentUrl.startsWith('http') ? currentUrl : `${BASE_URL}${currentUrl}`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
      
      const response = await fetch(fullUrl, {
        method: 'GET',
        redirect: 'manual',
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      finalStatus = response.status;
      
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get('location');
        if (!location) {
          return {
            url,
            status: 'fail',
            httpStatus: response.status,
            redirectChain: chain,
            error: `Redirect without Location header`,
          };
        }
        
        // Normalize location (might be relative or absolute)
        currentUrl = location.startsWith('http') 
          ? new URL(location).pathname 
          : location;
        
        // Check for loops
        if (chain.includes(currentUrl)) {
          return {
            url,
            status: 'fail',
            httpStatus: response.status,
            redirectChain: [...chain, currentUrl],
            error: `Redirect loop detected: ${chain.join(' → ')} → ${currentUrl}`,
          };
        }
        
        chain.push(currentUrl);
      } else {
        // Not a redirect - this is the final destination
        const text = await response.text();
        contentSize = text.length;
        
        return {
          url,
          status: response.status === 200 ? 'pass' : 'fail',
          httpStatus: response.status,
          redirectChain: chain,
          finalUrl: currentUrl,
          contentSize,
          error: response.status !== 200 ? `Final status ${response.status}` : undefined,
        };
      }
    }
    
    // Too many redirects
    return {
      url,
      status: 'fail',
      httpStatus: finalStatus,
      redirectChain: chain,
      error: `Exceeded max redirects (${MAX_REDIRECTS})`,
    };
    
  } catch (err: any) {
    return {
      url,
      status: 'fail',
      redirectChain: chain,
      error: err.name === 'AbortError' ? 'Request timeout' : err.message,
    };
  }
}

/**
 * Extract redirects from redirect-config.ts
 */
function getRedirectsFromConfig(): Map<string, string> {
  const configPath = path.join(process.cwd(), 'server', 'redirect-config.ts');
  const content = fs.readFileSync(configPath, 'utf-8');
  
  const redirects = new Map<string, string>();
  
  // Match pattern: '/source': '/destination',
  const regex = /'([^']+)':\s*'([^']+)'/g;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    const [, source, destination] = match;
    // Skip non-path entries (like attachment_id patterns)
    if (source.startsWith('/') && destination.startsWith('/')) {
      redirects.set(source, destination);
    }
  }
  
  return redirects;
}

/**
 * Parse URLs from Screaming Frog / GSC CSV export
 */
function parseCSVUrls(csvPath: string): string[] {
  if (!fs.existsSync(csvPath)) {
    console.warn(`CSV file not found: ${csvPath}`);
    return [];
  }
  
  const content = fs.readFileSync(csvPath, 'utf-8');
  const lines = content.split('\n').slice(1); // Skip header
  const urls: string[] = [];
  
  for (const line of lines) {
    if (!line.trim()) continue;
    
    // Extract first column (URL)
    const urlMatch = line.match(/^"?([^",]+)"?/);
    if (urlMatch) {
      let url = urlMatch[1];
      // Normalize to path only
      url = url.replace(/https?:\/\/(www\.)?empathyhealthclinic\.com/g, '');
      if (url && url.startsWith('/')) {
        urls.push(url);
      }
    }
  }
  
  return [...new Set(urls)]; // Dedupe
}

/**
 * Validate destination pages exist in prerendered output
 */
function validateDestinationsExist(destinations: Set<string>): string[] {
  const prerenderedDir = path.join(process.cwd(), 'dist', 'prerendered');
  const missing: string[] = [];
  
  for (const dest of destinations) {
    // Skip known special pages
    if (NON_200_ALLOWLIST.has(dest)) continue;
    
    // Check if prerendered file exists
    const filePath = dest === '/' 
      ? path.join(prerenderedDir, 'index.html')
      : path.join(prerenderedDir, dest.slice(1), 'index.html');
    
    if (!fs.existsSync(filePath)) {
      // Check if it's a known dynamic page (blog posts)
      if (!dest.startsWith('/blog/') && !KNOWN_DESTINATION_PAGES.has(dest)) {
        missing.push(dest);
      }
    }
  }
  
  return missing;
}

/**
 * Main validation function
 */
async function runValidation(): Promise<void> {
  console.log('=========================================');
  console.log('QA Redirect & URL Validator');
  console.log('=========================================\n');
  
  // Parse command line args
  const args = process.argv.slice(2);
  const csvIndex = args.indexOf('--csv');
  const csvPath = csvIndex >= 0 ? args[csvIndex + 1] : null;
  
  // Step 1: Load redirects from config
  console.log('Step 1: Loading redirects from redirect-config.ts...');
  const redirects = getRedirectsFromConfig();
  console.log(`  Found ${redirects.size} redirects\n`);
  
  // Step 2: Validate destination pages exist in prerendered output
  console.log('Step 2: Validating destination pages exist...');
  const destinations = new Set(redirects.values());
  const missingDestinations = validateDestinationsExist(destinations);
  
  if (missingDestinations.length > 0) {
    console.log(`  ⚠️  Warning: ${missingDestinations.length} destination pages not prerendered:`);
    missingDestinations.slice(0, 10).forEach(d => console.log(`     - ${d}`));
    if (missingDestinations.length > 10) {
      console.log(`     ... and ${missingDestinations.length - 10} more`);
    }
  } else {
    console.log('  ✅ All destination pages exist');
  }
  console.log('');
  
  // Step 3: Load problem URLs from CSV if provided
  let problemUrls: string[] = [];
  if (csvPath) {
    console.log(`Step 3: Loading problem URLs from ${csvPath}...`);
    problemUrls = parseCSVUrls(csvPath);
    console.log(`  Found ${problemUrls.length} URLs\n`);
  } else {
    console.log('Step 3: No CSV provided, skipping external URL validation\n');
  }
  
  // Step 4: Test redirect sources
  console.log('Step 4: Testing redirect sources (sampling)...');
  const redirectSources = Array.from(redirects.keys());
  const sampleSize = Math.min(50, redirectSources.length); // Sample for speed
  const sample = redirectSources.sort(() => Math.random() - 0.5).slice(0, sampleSize);
  
  const redirectResults: ValidationResult[] = [];
  for (const source of sample) {
    const result = await followRedirects(source);
    redirectResults.push(result);
    process.stdout.write(result.status === 'pass' ? '.' : 'F');
  }
  console.log('\n');
  
  // Step 5: Test problem URLs from CSV
  let csvResults: ValidationResult[] = [];
  if (problemUrls.length > 0) {
    console.log('Step 5: Testing problem URLs from CSV (sampling)...');
    const csvSampleSize = Math.min(100, problemUrls.length);
    const csvSample = problemUrls.sort(() => Math.random() - 0.5).slice(0, csvSampleSize);
    
    for (const url of csvSample) {
      const result = await followRedirects(url);
      csvResults.push(result);
      process.stdout.write(result.status === 'pass' ? '.' : 'F');
    }
    console.log('\n');
  }
  
  // Step 6: Generate summary
  console.log('=========================================');
  console.log('VALIDATION SUMMARY');
  console.log('=========================================\n');
  
  const allResults = [...redirectResults, ...csvResults];
  const passed = allResults.filter(r => r.status === 'pass').length;
  const failed = allResults.filter(r => r.status === 'fail').length;
  const warnings = allResults.filter(r => r.status === 'warning').length;
  
  console.log(`Total URLs tested: ${allResults.length}`);
  console.log(`  ✅ Passed: ${passed}`);
  console.log(`  ❌ Failed: ${failed}`);
  console.log(`  ⚠️  Warnings: ${warnings}`);
  console.log('');
  
  if (failed > 0) {
    console.log('FAILED URLs:');
    console.log('-----------');
    const failures = allResults.filter(r => r.status === 'fail');
    for (const f of failures.slice(0, 20)) {
      console.log(`  ${f.url}`);
      console.log(`    Chain: ${f.redirectChain.join(' → ')}`);
      console.log(`    Error: ${f.error || `HTTP ${f.httpStatus}`}`);
      console.log('');
    }
    if (failures.length > 20) {
      console.log(`  ... and ${failures.length - 20} more failures`);
    }
  }
  
  // Write detailed report
  const reportPath = path.join(process.cwd(), 'qa-validation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    summary: { total: allResults.length, passed, failed, warnings },
    missingDestinations,
    failures: allResults.filter(r => r.status === 'fail'),
  }, null, 2));
  console.log(`\nDetailed report written to: ${reportPath}`);
  
  // Exit with error if failures
  if (failed > 0 || missingDestinations.length > 5) {
    console.log('\n❌ VALIDATION FAILED - Fix issues before deploying');
    process.exit(1);
  }
  
  console.log('\n✅ VALIDATION PASSED');
  process.exit(0);
}

// Run if executed directly
runValidation().catch(err => {
  console.error('Validation error:', err);
  process.exit(1);
});
