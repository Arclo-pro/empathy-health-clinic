#!/usr/bin/env tsx
/**
 * Optimize Existing Landing Page
 * 
 * Automatically improves existing pages based on SERP analysis.
 * Uses GPT-4o to enhance content, titles, and meta descriptions.
 */

import { parseArgs } from "node:util";
import fs from "fs/promises";
import path from "path";
import { glob } from "glob";

interface OptimizationSuggestions {
  improvedTitle: string;
  improvedMetaDescription: string;
  contentAdditions: string[];
  internalLinks: string[];
  h2Suggestions: string[];
}

async function generateOptimizations(url: string, query: string, position: number): Promise<OptimizationSuggestions> {
  const openaiKey = process.env.OPENAI_API_KEY;
  
  if (!openaiKey) {
    throw new Error("OPENAI_API_KEY environment variable not set");
  }

  const prompt = `Optimize a landing page currently ranking #${position} for "${query}":

URL: ${url}

Provide SEO improvements to move from position ${position} to top 3:

1. Improved title tag (60 chars max, include query naturally)
2. Improved meta description (155 chars, compelling, include query)
3. 3-5 content section suggestions (H2 headings) to add
4. 5 internal linking opportunities (related pages to link to)
5. Keywords to naturally incorporate

Return as JSON:
{
  "improvedTitle": "...",
  "improvedMetaDescription": "...",
  "contentAdditions": ["section 1", "section 2", ...],
  "internalLinks": ["/related-page-1", "/related-page-2", ...],
  "h2Suggestions": ["heading 1", "heading 2", ...]
}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${openaiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are an expert SEO specialist focused on ranking improvements." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}

async function findPageFile(url: string): Promise<string | null> {
  // Convert URL to file path pattern
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

async function applyOptimizations(filePath: string, optimizations: OptimizationSuggestions): Promise<void> {
  let content = await fs.readFile(filePath, "utf-8");
  
  // Update title tag
  content = content.replace(
    /<title>(.*?)<\/title>/,
    `<title>${optimizations.improvedTitle} | Empathy Health Clinic</title>`
  );
  
  // Update meta description
  content = content.replace(
    /<meta name="description" content="(.*?)" \/>/,
    `<meta name="description" content="${optimizations.improvedMetaDescription}" />`
  );
  
  // Add comment with suggestions for manual review
  const suggestions = `
{/*
  AUTO-OPTIMIZATION SUGGESTIONS (Review & Implement):
  
  Content Additions:
${optimizations.contentAdditions.map((s, i) => `  ${i + 1}. ${s}`).join('\n')}
  
  H2 Headings to Add:
${optimizations.h2Suggestions.map((h, i) => `  ${i + 1}. ${h}`).join('\n')}
  
  Internal Links to Add:
${optimizations.internalLinks.map((l, i) => `  ${i + 1}. ${l}`).join('\n')}
*/}`;
  
  // Insert suggestions after Helmet closing tag
  content = content.replace('</Helmet>', `</Helmet>${suggestions}`);
  
  await fs.writeFile(filePath, content);
}

async function main() {
  try {
    const { values } = parseArgs({
      options: {
        url: { type: "string" },
        query: { type: "string" },
        position: { type: "string" }
      }
    });

    const url = values.url || '';
    const query = values.query || '';
    const position = parseInt(values.position || '0');

    if (!url || !query) {
      console.error("Usage: optimize-landing.ts --url <url> --query <query> --position <position>");
      process.exit(1);
    }

    console.log(`Optimizing ${url} for "${query}" (current position: #${position})...`);

    // Generate optimization suggestions
    const optimizations = await generateOptimizations(url, query, position);

    // Find the page file
    const filePath = await findPageFile(url);
    
    if (!filePath) {
      console.error(`❌ Could not find page file for ${url}`);
      process.exit(1);
    }

    console.log(`Found page file: ${filePath}`);

    // Apply optimizations
    await applyOptimizations(filePath, optimizations);

    console.log(`✅ Optimized ${url}`);
    console.log(`   Title: ${optimizations.improvedTitle}`);
    console.log(`   Meta: ${optimizations.improvedMetaDescription}`);
    console.log(`   Added ${optimizations.contentAdditions.length} content suggestions`);

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

main();
