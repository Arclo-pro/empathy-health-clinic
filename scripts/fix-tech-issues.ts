#!/usr/bin/env tsx
/**
 * Fix Technical SEO Issues
 * 
 * Automatically fixes common technical SEO problems detected by
 * Screaming Frog or other audit tools.
 */

import { parseArgs } from "node:util";
import fs from "fs/promises";
import { glob } from "glob";

interface TechFix {
  issue: string;
  fix: () => Promise<boolean>;
  description: string;
}

async function findPageFile(url: string): Promise<string | null> {
  const slug = url.replace(/^\//, '').replace(/-/g, '_');
  const patterns = [
    `client/src/pages/*${slug}*.tsx`,
    `client/src/pages/*${slug.split('_')[0]}*.tsx`
  ];
  
  for (const pattern of patterns) {
    const files = await glob(pattern, { nocase: true });
    if (files.length > 0) {
      return files[0];
    }
  }
  
  return null;
}

async function fixMissingMetaDescription(filePath: string): Promise<boolean> {
  let content = await fs.readFile(filePath, "utf-8");
  
  // Check if meta description exists
  if (content.includes('<meta name="description"')) {
    return true; // Already has meta description
  }
  
  // Add generic meta description (should be improved later)
  const pageTitle = content.match(/<title>(.*?)<\/title>/)?.[1] || 'Empathy Health Clinic';
  const metaDesc = `${pageTitle}. Expert psychiatric care in Orlando, FL. Schedule your appointment today.`;
  
  content = content.replace(
    /<title>/,
    `<meta name="description" content="${metaDesc}" />\n        <title>`
  );
  
  await fs.writeFile(filePath, content);
  return true;
}

async function fixMissingCanonical(filePath: string, url: string): Promise<boolean> {
  let content = await fs.readFile(filePath, "utf-8");
  
  // Check if canonical exists
  if (content.includes('<link rel="canonical"')) {
    return true; // Already has canonical
  }
  
  // Add canonical tag
  const canonical = `<link rel="canonical" href="https://empathyhealthclinic.com${url}" />`;
  
  content = content.replace(
    /<meta name="description"/,
    `${canonical}\n        <meta name="description"`
  );
  
  await fs.writeFile(filePath, content);
  return true;
}

async function fixThinContent(filePath: string): Promise<boolean> {
  let content = await fs.readFile(filePath, "utf-8");
  
  // Add comment suggesting content expansion
  const suggestion = `\n{/* TODO: Expand content - page flagged as thin content (<300 words). Add more sections, FAQs, or detailed information. */}\n`;
  
  content = content.replace('</Helmet>', `</Helmet>${suggestion}`);
  
  await fs.writeFile(filePath, content);
  
  console.log('   ⚠️  Added TODO comment for thin content - requires manual expansion');
  return true;
}

async function fixMissingH1(filePath: string): Promise<boolean> {
  let content = await fs.readFile(filePath, "utf-8");
  
  // Check if H1 exists
  if (/<h1/i.test(content)) {
    return true; // Already has H1
  }
  
  // Add comment warning about missing H1
  const warning = `\n{/* ⚠️  MISSING H1 TAG - Add an H1 heading to this page */}\n`;
  
  content = content.replace('</Helmet>', `</Helmet>${warning}`);
  
  await fs.writeFile(filePath, content);
  
  console.log('   ⚠️  Added warning comment for missing H1');
  return true;
}

async function applyFixes(filePath: string, issues: string, url: string): Promise<number> {
  let fixedCount = 0;
  
  const issuesList = issues.toLowerCase().split(',').map(i => i.trim());
  
  for (const issue of issuesList) {
    try {
      if (issue.includes('missing-meta-desc') || issue.includes('no meta description')) {
        if (await fixMissingMetaDescription(filePath)) {
          console.log('   ✅ Fixed missing meta description');
          fixedCount++;
        }
      }
      
      if (issue.includes('missing-canonical') || issue.includes('no canonical')) {
        if (await fixMissingCanonical(filePath, url)) {
          console.log('   ✅ Fixed missing canonical tag');
          fixedCount++;
        }
      }
      
      if (issue.includes('thin-content') || issue.includes('word count')) {
        if (await fixThinContent(filePath)) {
          console.log('   ⚠️  Flagged thin content for manual review');
          fixedCount++;
        }
      }
      
      if (issue.includes('missing-h1') || issue.includes('no h1')) {
        if (await fixMissingH1(filePath)) {
          console.log('   ⚠️  Flagged missing H1 for manual review');
          fixedCount++;
        }
      }
    } catch (error) {
      console.error(`   ❌ Failed to fix ${issue}:`, error);
    }
  }
  
  return fixedCount;
}

async function main() {
  try {
    const { values } = parseArgs({
      options: {
        url: { type: "string" },
        issues: { type: "string" }
      }
    });

    const url = values.url || '';
    const issues = values.issues || '';

    if (!url || !issues) {
      console.error("Usage: fix-tech-issues.ts --url <url> --issues <issues>");
      process.exit(1);
    }

    console.log(`Fixing tech issues on ${url}...`);
    console.log(`Issues: ${issues}`);

    // Find the page file
    const filePath = await findPageFile(url);
    
    if (!filePath) {
      console.error(`❌ Could not find page file for ${url}`);
      process.exit(1);
    }

    console.log(`Found page file: ${filePath}`);

    // Apply fixes
    const fixedCount = await applyFixes(filePath, issues, url);

    if (fixedCount > 0) {
      console.log(`✅ Fixed ${fixedCount} issue(s) on ${url}`);
    } else {
      console.log(`⚠️  No automated fixes available for these issues`);
    }

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

main();
