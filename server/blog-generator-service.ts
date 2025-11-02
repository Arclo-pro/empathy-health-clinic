import OpenAI from "openai";
import { db } from "./db";
import { usedBlogImages } from "@shared/schema";
import { sql } from "drizzle-orm";

// This is using Replit's AI Integrations service, which provides OpenAI-compatible API access without requiring your own OpenAI API key.
// Lazy initialization of OpenAI client to ensure env vars are loaded
let openai: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!openai) {
    if (!process.env.AI_INTEGRATIONS_OPENAI_API_KEY || !process.env.AI_INTEGRATIONS_OPENAI_BASE_URL) {
      throw new Error("Replit AI Integrations not configured. Please ensure the OpenAI integration is set up.");
    }
    openai = new OpenAI({
      baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
    });
  }
  return openai;
}

interface BlogGenerationRequest {
  topic: string;
  keywords: string;
  city?: string;
  imageStyle?: string;
}

interface BlogGenerationResult {
  title: string;
  slug: string;
  metaDescription: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt: string;
  contentImages: Array<{ url: string; alt: string; description: string }>;
  internalLinks: string[];
  externalLinks: string[];
  seoScore: number;
  wordCount: number;
  validationResults: {
    wordCountValid: boolean;
    metaDescriptionValid: boolean;
    h1Count: number;
    internalLinkCount: number;
    externalLinkCount: number;
    uniqueAnchorText: boolean;
  };
}

export class BlogGeneratorService {
  /**
   * Fetch unique images from Unsplash that haven't been used in any blog
   * Handles race conditions by retrying if images are taken by concurrent requests
   */
  private async fetchUniqueImages(
    query: string,
    count: number,
    retryCount = 0
  ): Promise<Array<{ url: string; description: string }>> {
    const MAX_RETRIES = 3;
    
    try {
      // Get all previously used image URLs from database (with fresh read)
      const usedImages = await db.select({ imageUrl: usedBlogImages.imageUrl })
        .from(usedBlogImages);
      const usedUrls = new Set(usedImages.map(img => img.imageUrl));

      // Fetch more images than needed to account for duplicates
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`Unsplash API error: ${response.statusText}`);
      }

      const data = await response.json();
      const availableImages = data.results
        .filter((img: any) => !usedUrls.has(img.urls.regular))
        .slice(0, count)
        .map((img: any) => ({
          url: img.urls.regular,
          description: img.description || img.alt_description || query,
        }));

      // Immediately try to reserve these images in the database
      const successfullyReserved: Array<{ url: string; description: string }> = [];
      
      for (const img of availableImages) {
        try {
          // Try to insert - if it conflicts (another request took it), skip it
          await db.insert(usedBlogImages).values({
            imageUrl: img.url,
            description: img.description,
            altText: img.description,
            source: "unsplash",
          });
          // If insert succeeded, this image is ours
          successfullyReserved.push(img);
        } catch (error) {
          // Image was taken by another concurrent request, skip it
          console.log(`Image ${img.url} already taken, skipping`);
        }
        
        // Stop once we have enough images
        if (successfullyReserved.length >= count) {
          break;
        }
      }

      // If we didn't get enough unique images, retry with a fresh fetch
      if (successfullyReserved.length < count && retryCount < MAX_RETRIES) {
        console.log(`Only got ${successfullyReserved.length}/${count} images, retrying (attempt ${retryCount + 1}/${MAX_RETRIES})...`);
        const additionalNeeded = count - successfullyReserved.length;
        const additionalImages = await this.fetchUniqueImages(query, additionalNeeded, retryCount + 1);
        return [...successfullyReserved, ...additionalImages];
      }

      return successfullyReserved;
    } catch (error) {
      console.error("Error fetching Unsplash images:", error);
      
      // Fallback: Generate unique placeholder URLs using timestamp + random
      // Don't mark these as "used" since they're fallbacks
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(7);
      return Array(count).fill(null).map((_, i) => ({
        url: `/attached_assets/stock_images/fallback-${timestamp}-${randomId}-${i}.jpg`,
        description: query,
      }));
    }
  }

  /**
   * Generate a catchy, clickbait title from keywords using OpenAI
   */
  async generateTitle(keywords: string, city?: string): Promise<string> {
    const cityContext = city ? ` Focus on ${city}, Florida if relevant.` : '';
    
    const prompt = `Generate ONE engaging, clickbait-style blog title for a mental health clinic's blog.

Keywords: ${keywords}${cityContext}

Requirements:
- Make it attention-grabbing and emotionally compelling
- Use power words that evoke curiosity or emotion
- Keep it under 70 characters for SEO
- Make it actionable or question-based when possible
- Appeal to people seeking mental health help

Examples of good styles:
- "The Hidden Signs of [Condition] Most People Miss"
- "How to Know If It's [X] or [Y] — And When to Seek Help"
- "7 Surprising Ways [Treatment] Changes Your Life"
- "What Everyone Gets Wrong About [Topic]"

Return ONLY the title, nothing else.`;

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o", // Using gpt-4o - compatible with chat completions API via Replit AI Integrations
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.9, // Higher temperature for creative titles
      max_tokens: 100,
    });

    return completion.choices[0].message.content?.trim() || "Understanding Mental Health: A Complete Guide";
  }

  /**
   * Validate that all links are not broken (no 404s)
   */
  private async validateLinks(links: string[]): Promise<boolean> {
    try {
      const validationPromises = links.map(async (link) => {
        try {
          const response = await fetch(link, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
          return response.ok;
        } catch {
          return false;
        }
      });

      const results = await Promise.all(validationPromises);
      return results.every(result => result === true);
    } catch {
      return false;
    }
  }

  /**
   * Calculate SEO score based on 32 quality standards
   */
  private calculateSEOScore(
    content: string,
    metaDescription: string,
    title: string,
    internalLinks: string[],
    externalLinks: string[],
    keywords: string
  ): {
    score: number;
    validationResults: any;
  } {
    let score = 100;
    const issues: string[] = [];

    // Extract primary keyword (first keyword in the list)
    const primaryKeyword = keywords.split(',')[0]?.trim().toLowerCase() || '';

    // Critical: Meta description length (150-160 chars)
    if (metaDescription.length < 150 || metaDescription.length > 160) {
      score -= 25;
      issues.push("Meta description must be 150-160 characters");
    }

    // Critical: Word count (2000 ±5 words)
    const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;
    if (wordCount < 1995 || wordCount > 2005) {
      score -= 25;
      issues.push("Word count must be 2000±5 words");
    }

    // Critical: H1 tag check (exactly one)
    const h1Matches = content.match(/<h1[^>]*>/gi);
    const h1Count = h1Matches ? h1Matches.length : 0;
    if (h1Count !== 1) {
      score -= 20;
      issues.push("Must have exactly one H1 tag");
    }

    // Important: H2 tags (multiple subheadings for structure)
    const h2Matches = content.match(/<h2[^>]*>/gi);
    const h2Count = h2Matches ? h2Matches.length : 0;
    if (h2Count < 6) {
      score -= 5;
      issues.push("Should have at least 6 H2 subheadings for proper structure");
    }

    // Important: Internal links (minimum 4)
    if (internalLinks.length < 4) {
      score -= 8;
      issues.push("Must have at least 4 internal links");
    }

    // Important: External links (minimum 3)
    if (externalLinks.length < 3) {
      score -= 8;
      issues.push("Must have at least 3 external authoritative links");
    }

    // Verify unique anchor text
    const anchorTextSet = new Set<string>();
    const anchorMatches = Array.from(content.matchAll(/<a[^>]*>([^<]+)<\/a>/gi));
    let duplicateAnchors = false;
    for (const match of anchorMatches) {
      const anchorText = match[1].toLowerCase().trim();
      if (anchorTextSet.has(anchorText)) {
        duplicateAnchors = true;
        break;
      }
      anchorTextSet.add(anchorText);
    }
    if (duplicateAnchors) {
      score -= 10;
      issues.push("All anchor text must be unique - found duplicates");
    }

    // Title length (≤60 chars)
    if (title.length > 60) {
      score -= 5;
      issues.push("Title should be ≤60 characters");
    }

    // Primary keyword in title
    if (primaryKeyword && !title.toLowerCase().includes(primaryKeyword)) {
      score -= 8;
      issues.push("Title should include primary keyword");
    }

    // Primary keyword in meta description
    if (primaryKeyword && !metaDescription.toLowerCase().includes(primaryKeyword)) {
      score -= 8;
      issues.push("Meta description should include primary keyword");
    }

    // Primary keyword in first paragraph (first 300 chars)
    const firstParagraph = content.substring(0, 300).toLowerCase();
    if (primaryKeyword && !firstParagraph.includes(primaryKeyword)) {
      score -= 5;
      issues.push("Primary keyword should appear in first paragraph");
    }

    // HIPAA compliance checks disabled per user request
    let hipaaViolationsFound: string[] = [];

    // Check for local SEO mentions (Orlando, Winter Park, etc.)
    const localMentions = /(orlando|winter park|altamonte springs|maitland|casselberry|lake mary)/gi;
    const localMatches = content.match(localMentions);
    if (!localMatches || localMatches.length < 2) {
      score -= 5;
      issues.push("Should mention Orlando/Winter Park area at least twice for local SEO");
    }

    // Verify external links are from authoritative sources
    const authoritativeSources = ['nimh.nih.gov', 'apa.org', 'samhsa.gov', 'who.int', 'cdc.gov', 'mayoclinic.org', 'psychologytoday.com'];
    const hasAuthoritativeLink = externalLinks.some(link => 
      authoritativeSources.some(source => link.includes(source))
    );
    if (!hasAuthoritativeLink) {
      score -= 7;
      issues.push("Should include at least one link to authoritative sources (NIMH, APA, SAMHSA, etc.)");
    }

    // Check for proper HTML structure (paragraphs, no loose text)
    const hasLooseText = /<body[^>]*>[^<]*[a-zA-Z]{20,}|<\/h[123]>[^<]*[a-zA-Z]{20,}/i.test(content);
    if (hasLooseText) {
      score -= 5;
      issues.push("Content should be properly wrapped in HTML tags (p, h2, h3, etc.)");
    }

    // Check for placeholder text
    const placeholderText = /\[.*?\]|lorem ipsum|coming soon|todo|tbd|xxx|placeholder/i;
    if (placeholderText.test(content)) {
      score -= 15;
      issues.push("No placeholder text allowed - content must be complete");
    }

    // Validate keyword density (0.5-3%)
    let keywordDensity = 0;
    if (primaryKeyword && wordCount > 0) {
      const keywordRegex = new RegExp(primaryKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      const keywordMatches = content.match(keywordRegex);
      const keywordCount = keywordMatches ? keywordMatches.length : 0;
      keywordDensity = (keywordCount / wordCount) * 100;
      
      if (keywordDensity < 0.5 || keywordDensity > 3) {
        score -= 7;
        issues.push(`Keyword density should be 0.5-3% (currently ${keywordDensity.toFixed(2)}%)`);
      }
    }

    // Check for CTA (Call to Action) in content
    const ctaPatterns = /(contact us|call us|schedule|appointment|reach out|get help|book now|request|connect with)/i;
    if (!ctaPatterns.test(content)) {
      score -= 8;
      issues.push("Content should include a clear call-to-action");
    }

    // Validate internal link destinations (should point to actual pages)
    const validInternalPaths = [
      '/services', '/team', '/request-appointment', '/insurance', '/blog',
      '/emdr-therapy', '/depression-counseling', '/anxiety-therapy', '/virtual-therapy',
      '/crisis-therapy', '/treatments', '/therapies', '/conditions', '/locations'
    ];
    const invalidInternalLinks = internalLinks.filter(link => 
      !validInternalPaths.some(path => link.includes(path))
    );
    if (invalidInternalLinks.length > 0) {
      score -= 5;
      issues.push(`Some internal links point to invalid pages: ${invalidInternalLinks.join(', ')}`);
    }

    // Check for adult-only content indicators (18+) - Required for mental health clinic content
    const adultContentIndicators = /(adults?|18\+|over 18|18 and older|age 18)/i;
    const hasAdultIndicator = adultContentIndicators.test(content);
    if (!hasAdultIndicator) {
      score -= 5;
      issues.push("Content should specify it's for adults (18+) as per mental health clinic standards");
    }
    
    // Check H3 tags for proper hierarchy
    const h3Matches = content.match(/<h3[^>]*>/gi);
    const h3Count = h3Matches ? h3Matches.length : 0;
    
    // Verify heading hierarchy (H2s should be followed by H3s in sections)
    const hasProperHierarchy = h2Count > 0 && (h3Count === 0 || h3Count >= h2Count * 0.5);
    if (!hasProperHierarchy && h2Count > 0) {
      score -= 3;
      issues.push("Heading hierarchy should include H3 subheadings under H2 sections");
    }

    // HIPAA penalty disabled per user request

    // Enhanced penalty for missing authoritative links (total -15)
    if (!hasAuthoritativeLink) {
      score -= 8; // Additional penalty (total -15)
      issues.push("CRITICAL: Must include authoritative medical sources (NIMH, APA, SAMHSA, etc.)");
    }

    // Enhanced penalty for insufficient local SEO (total -12)
    if (!localMatches || localMatches.length < 2) {
      score -= 7; // Additional penalty (total -12)
      issues.push("CRITICAL: Must mention Orlando/Winter Park area at least twice");
    }

    if (issues.length > 0) {
      console.warn("⚠️  SEO/Quality Issues Found:", issues);
    }

    const finalScore = Math.max(0, score);
    
    // Log warning if score is below recommended threshold
    if (finalScore < 70) {
      console.error(`❌ QUALITY WARNING: Blog score ${finalScore}/100 is below recommended threshold of 70`);
      console.error(`   Issues found: ${issues.join(', ')}`);
    }

    return {
      score: finalScore,
      validationResults: {
        wordCountValid: wordCount >= 1995 && wordCount <= 2005,
        metaDescriptionValid: metaDescription.length >= 150 && metaDescription.length <= 160,
        h1Count,
        h2Count,
        h3Count,
        internalLinkCount: internalLinks.length,
        externalLinkCount: externalLinks.length,
        uniqueAnchorText: !duplicateAnchors,
        hasAuthoritativeLinks: hasAuthoritativeLink,
        primaryKeywordInTitle: primaryKeyword ? title.toLowerCase().includes(primaryKeyword) : true,
        primaryKeywordInMeta: primaryKeyword ? metaDescription.toLowerCase().includes(primaryKeyword) : true,
        primaryKeywordInFirstPara: primaryKeyword ? firstParagraph.includes(primaryKeyword) : true,
        keywordDensity: keywordDensity.toFixed(2) + '%',
        localSEOMentions: localMatches?.length || 0,
        noPlaceholders: !placeholderText.test(content),
        hasCTA: ctaPatterns.test(content),
        validInternalLinks: invalidInternalLinks.length === 0,
        hasProperHeadingHierarchy: hasProperHierarchy,
        hasAdultContentIndicator: hasAdultIndicator,
        wordCount,
        issues,
      },
    };
  }

  /**
   * Generate blog post using GPT-4 with all 32 best practices
   */
  async generateBlog(request: BlogGenerationRequest): Promise<BlogGenerationResult> {
    const { topic, keywords, city, imageStyle } = request;

    // Simplified system prompt (detailed requirements passed per-stage)
    const systemPrompt = `You are an expert medical content writer for Empathy Health Clinic, a mental health practice in Winter Park and Orlando, Florida specializing in adult mental health services (18+).

⚠️ TARGET: Blogs must score 80+/100 to publish. Follow all requirements precisely.`;

    try {
      console.log("🤖 Starting 3-STAGE blog generation (Planner → Drafter → Formatter)...");
      
      let result: any;
      let score = 0;
      let validationResults: any;

      // ═══════════════════════════════════════════════════════════════
      // STAGE 1: PLANNER - Create detailed outline with word budgets
      // ═══════════════════════════════════════════════════════════════
      console.log("📋 STAGE 1/3: Creating content plan with word-count budgets...");
      const plannerPrompt = `Create a detailed content outline for a mental health blog about: ${topic}

TARGET: Exactly 2000 words (±5 allowed: 1995-2005 total)
PRIMARY KEYWORD: ${keywords.split(',')[0].trim()}

INSTRUCTIONS:
1. Create 6-8 H2 sections relevant to "${topic}"
2. Each H2 should have 2 H3 subsections
3. Assign word budgets that sum to EXACTLY 2000 words:
   - Introduction: 220 words
   - Each H2 section: 280 words
   - Conclusion: 80 words
4. Calculate and verify total before output

OUTPUT JSON:
{
  "title": "Under 60 chars with keyword '${keywords.split(',')[0].trim()}'",
  "metaDescription": "Exactly 150-160 chars with keyword",
  "slug": "url-friendly-slug",
  "outline": [
    {"section": "intro", "wordBudget": 220, "notes": "Must include keyword in first paragraph, mention Orlando, mention 'adults 18+'"},
    {"section": "h2", "heading": "[Topic-Relevant Title]", "wordBudget": 280, "h3s": ["Subsection 1", "Subsection 2"], "notes": "Include internal link to /services"},
    {"section": "h2", "heading": "[Another Relevant Title]", "wordBudget": 280, "h3s": ["Subsection 1", "Subsection 2"], "notes": "Include external link to NIMH/APA/SAMHSA"}
    ... (5-7 more H2 sections)
    {"section": "conclusion", "wordBudget": 80, "notes": "Final CTA: Contact us, schedule appointment, mention Orlando"}
  ],
  "totalWordBudget": 2000,
  "requirements": {
    "internalLinks": ["Must link to: /services, /request-appointment, and 2 others (e.g., /emdr-therapy, /depression-counseling)"],
    "externalLinks": ["Must link to 3+ authoritative sources (NIMH, APA, SAMHSA, WHO, CDC)"],
    "localSEO": ["Orlando 2x", "Winter Park 1x", "adults/18+ 1x"],
    "uniqueAnchors": ["All link anchor texts must be unique - no duplicates"]
  }
}

MATH CHECK: Verify outline.wordBudget values sum to 1995-2005. Adjust if needed.`;

      const plannerCompletion = await getOpenAI().chat.completions.create({
        model: "gpt-4o",
        response_format: { type: "json_object" },
        messages: [
          { role: "user", content: plannerPrompt }
        ],
        temperature: 0.7,
        max_tokens: 3000,
      });

      const outline = JSON.parse(plannerCompletion.choices[0].message.content || "{}");
      console.log(`   ✓ Outline created: ${outline.outline?.length || 0} sections, ${outline.totalWordBudget || 0} word budget`);

      // ═══════════════════════════════════════════════════════════════
      // STAGE 2: DRAFTER - Write content following the outline
      // ═══════════════════════════════════════════════════════════════
      console.log("✍️  STAGE 2/3: Writing content section-by-section...");
      const drafterSystemPrompt = `You are a professional mental health content writer for Empathy Health Clinic in Winter Park, Florida.

QUALITY REQUIREMENTS:
✓ Target audience: Adults 18+ seeking mental health treatment in Orlando/Winter Park
✓ Tone: Professional, empathetic, authoritative
✓ Citations: Use authoritative sources (NIMH, APA, SAMHSA, WHO, CDC)
✓ Local SEO: Mention Orlando 2x, Winter Park 1x
✓ CTAs: Include clear calls-to-action (Contact us, Schedule appointment)
✓ Links: All anchor text must be unique (no "learn more" twice)
✓ Generic references only: "individuals", "a person", "someone", "many people" (NO patient names or ages)`;

      const drafterPrompt = `Write blog content following this outline EXACTLY. CRITICAL: You MUST hit the exact word budget for each section.

OUTLINE:
${JSON.stringify(outline, null, 2)}

WRITING PROCESS:
1. Write intro (${outline.outline.find((s: any) => s.section === 'intro')?.wordBudget || 220} words):
   - Include primary keyword "${keywords.split(',')[0].trim()}" in first paragraph
   - Mention Orlando and "adults 18+"
   
2. Write each H2 section (280 words each):
   - Follow word budget precisely
   - Include H3 subsections as specified
   - Add required links with unique anchor text
   
3. Write conclusion (80 words):
   - Final CTA with Orlando mention

WORD COUNT TRACKING:
After EACH section, verify word count:
- Count words in that section
- Report running total
- If off-target, adjust next section

EXAMPLE OUTPUT:
Intro: 220 words | Running total: 220
Section 1: 280 words | Running total: 500
Section 2: 280 words | Running total: 780
...
Conclusion: 80 words | Final total: 2000

RETURN JSON:
{
  "content": "<h1>...</h1><p>Intro content...</p><h2>Section 1</h2>...",
  "wordCountBySection": [
    {"section": "intro", "words": 220, "runningTotal": 220},
    {"section": "H2-1", "words": 280, "runningTotal": 500},
    ...
  ],
  "finalWordCount": 2000
}

START WRITING NOW. Hit those word budgets!`;

      const drafterCompletion = await getOpenAI().chat.completions.create({
        model: "gpt-4o",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: drafterSystemPrompt },
          { role: "user", content: drafterPrompt }
        ],
        temperature: 0.6,
        max_tokens: 16000,
      });

      const draftedContent = JSON.parse(drafterCompletion.choices[0].message.content || "{}");
      console.log(`   ✓ Content drafted: ${draftedContent.finalWordCount || 0} words`);

      // ═══════════════════════════════════════════════════════════════
      // STAGE 3: FORMATTER - Assemble final JSON with all elements
      // ═══════════════════════════════════════════════════════════════
      console.log("🎨 STAGE 3/3: Formatting final output with images and links...");
      const formatterPrompt = `Assemble the final blog post JSON output.

TITLE: ${outline.title}
META DESCRIPTION: ${outline.metaDescription}
SLUG: ${outline.slug}
CONTENT: ${draftedContent.content}

YOUR TASK: Create the final JSON output with all required fields.

CRITICAL REQUIREMENTS:
1. Extract internal links from content - ensure 4+ unique links
2. Extract external links from content - ensure 3+ authoritative links
3. Verify ALL anchor texts are unique (no duplicates)
4. Create excerpt (first 200 chars of content, plain text)
5. Generate image search queries (avoid pills, sadness; use hope, healing, nature themes)
6. Verify meta description is 150-160 chars with primary keyword "${keywords.split(',')[0].trim()}"

OUTPUT JSON:
{
  "title": "${outline.title}",
  "metaDescription": "150-160 char description",
  "slug": "${outline.slug}",
  "excerpt": "First 200 chars as plain text",
  "content": "${draftedContent.content}",
  "featuredImageQuery": "peaceful nature healing sunrise hope mental wellness",
  "contentImageQueries": ["professional therapy bright welcoming", "wellness mindfulness calm", "supportive healing environment"],
  "internalLinks": ["/services", "/emdr-therapy", "/depression-counseling", "/request-appointment"],
  "externalLinks": ["https://www.nimh.nih.gov/...", "https://www.apa.org/...", "https://www.samhsa.gov/..."]
}`;

      const formatterCompletion = await getOpenAI().chat.completions.create({
        model: "gpt-4o",
        response_format: { type: "json_object" },
        messages: [
          { role: "user", content: formatterPrompt }
        ],
        temperature: 0.3,
        max_tokens: 16000,
      });

      result = JSON.parse(formatterCompletion.choices[0].message.content || "{}");
      
      // Validate initial generation
      let validation = this.calculateSEOScore(
        result.content,
        result.metaDescription,
        result.title,
        result.internalLinks || [],
        result.externalLinks || [],
        keywords
      );
      score = validation.score;
      validationResults = validation.validationResults;
      
      console.log(`📊 3-STAGE Generation Complete! Score: ${score}/100 | Word Count: ${validationResults.wordCount}`);
      
      // ADDITIONAL IMPROVEMENT LOOP: Keep going until 80+ score
      let improvementAttempt = 0;
      const maxImprovementAttempts = 10; // Maximum 10 additional improvement rounds (was 5)
      const targetScore = 80;

      while (score < targetScore && improvementAttempt < maxImprovementAttempts) {
        improvementAttempt++;
        console.log(`🔄 IMPROVEMENT ROUND ${improvementAttempt}/${maxImprovementAttempts}: Current Score ${score}/100 → Target: ${targetScore}/100`);
        console.log(`   Top issues: ${validationResults.issues.slice(0, 3).join(', ')}`);

        // Build focused improvement prompt - only address failing validations
        let focusedFixes = '';
        
        // Priority 1: Word count (biggest penalty)
        if (validationResults.issues.includes('Word count must be 2000±5 words')) {
          const wordsNeeded = validationResults.wordCount < 1995 
            ? 1995 - validationResults.wordCount 
            : validationResults.wordCount - 2005;
          
          focusedFixes += `
1. WORD COUNT FIX (HIGHEST PRIORITY):
   Current: ${validationResults.wordCount} words | Required: 1995-2005 words
   ${validationResults.wordCount < 1995 
     ? `Action: ADD exactly ${wordsNeeded} words by expanding 2-3 existing sections with detailed examples and explanations`
     : `Action: REMOVE exactly ${wordsNeeded} words by trimming verbose phrases and redundant content`
   }
   After: Report new word count`;
        }
        
        // Priority 2: Meta description (25 point penalty)
        if (validationResults.issues.some((i: string) => i.includes('Meta description'))) {
          focusedFixes += `

2. META DESCRIPTION FIX:
   Current: ${result.metaDescription?.length || 0} chars | Required: 150-160 chars
   Current text: "${result.metaDescription}"
   Action: ${result.metaDescription?.length < 150 ? 'Expand' : 'Trim'} to exactly 150-160 chars, keep keyword "${keywords.split(',')[0].trim()}"`;
        }
        
        // Priority 3: Other issues
        const otherIssues = validationResults.issues.filter((i: string) => 
          !i.includes('Word count') && !i.includes('Meta description')
        );
        if (otherIssues.length > 0) {
          focusedFixes += `

3. OTHER FIXES:
${otherIssues.slice(0, 3).map((issue: string) => `   - ${issue}`).join('\n')}`;
        }

        const improvementPrompt = `TARGETED FIX REQUIRED - Current Score: ${score}/100 | Target: ${targetScore}/100

${focusedFixes}

INSTRUCTIONS:
1. Make ONLY the specific changes listed above
2. DO NOT rebuild the entire blog - make targeted edits
3. Report your changes: "Fixed [X], new word count: [Y]"
4. Return the complete updated blog JSON

Current blog to edit:
${JSON.stringify({ title: result.title, metaDescription: result.metaDescription, slug: result.slug, content: result.content, internalLinks: result.internalLinks, externalLinks: result.externalLinks, excerpt: result.excerpt, featuredImageQuery: result.featuredImageQuery, contentImageQueries: result.contentImageQueries }, null, 2)}`;

        const improvementCompletion = await getOpenAI().chat.completions.create({
          model: "gpt-4o",
          response_format: { type: "json_object" },
          messages: [
            { role: "user", content: improvementPrompt }
          ],
          temperature: 0.2, // Very low temperature for precise fixes
          max_tokens: 16000,
        });

        result = JSON.parse(improvementCompletion.choices[0].message.content || "{}");
        
        // Validate improvement
        validation = this.calculateSEOScore(
          result.content,
          result.metaDescription,
          result.title,
          result.internalLinks || [],
          result.externalLinks || [],
          keywords
        );
        score = validation.score;
        validationResults = validation.validationResults;
        
        console.log(`   → Improved to ${score}/100 | Word Count: ${validationResults.wordCount}`);
        
        if (score >= targetScore) {
          console.log(`✅ SUCCESS! Achieved target score of ${targetScore}/100 on improvement round ${improvementAttempt}`);
          break;
        }
      }

      if (score < targetScore) {
        console.log(`⚠️  Reached max improvement attempts. Final score: ${score}/100 (Target: ${targetScore}/100)`);
        console.log(`   Remaining Issues: ${validationResults.issues.join(', ')}`);
      } else {
        console.log(`🎉 Blog ready for publication! Final Score: ${score}/100`);
      }
      
      // Fetch unique images that haven't been used before
      // Images are automatically reserved in the database during fetch to prevent race conditions
      console.log("🖼️  Fetching unique images from Unsplash...");
      const featuredImages = await this.fetchUniqueImages(
        result.featuredImageQuery || imageStyle || "peaceful nature healing sunrise hope wellness",
        1
      );
      const contentImages = await this.fetchUniqueImages(
        result.contentImageQueries?.[0] || "professional therapy office bright welcoming calm",
        3
      );

      // Validate links
      console.log("🔗 Validating all links...");
      const allLinks = [...(result.internalLinks || []), ...(result.externalLinks || [])];
      const linksValid = await this.validateLinks(allLinks);
      
      if (!linksValid) {
        console.warn("⚠️  Some links may be broken");
      }

      console.log(`✅ Blog generated! Final SEO Score: ${score}/100`);

      return {
        title: result.title,
        slug: result.slug,
        metaDescription: result.metaDescription,
        content: result.content,
        excerpt: result.excerpt,
        featuredImage: featuredImages[0]?.url || "",
        featuredImageAlt: featuredImages[0]?.description || "",
        contentImages: contentImages.map(img => ({
          url: img.url,
          alt: img.description,
          description: img.description,
        })),
        internalLinks: result.internalLinks,
        externalLinks: result.externalLinks,
        seoScore: score,
        wordCount: validationResults.wordCount,
        validationResults,
      };
    } catch (error) {
      console.error("❌ Error generating blog:", error);
      throw new Error(`Blog generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const blogGeneratorService = new BlogGeneratorService();
