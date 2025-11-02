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
        noHIPAAViolations: hipaaViolationsFound.length === 0,
        hipaaViolationsFound, // Include exact violations for feedback
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

    // Build the comprehensive prompt following all 32 standards
    const systemPrompt = `You are an expert medical content writer for Empathy Health Clinic, a mental health practice in Winter Park and Orlando, Florida specializing in adult mental health services (18+).

⚠️ CRITICAL: This content will be automatically validated. Blogs scoring below 90/100 will be rejected. Follow EVERY requirement EXACTLY.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MANDATORY REQUIREMENTS (AUTOMATIC VALIDATION):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 WORD COUNT (NON-NEGOTIABLE - WILL BE REJECTED IF WRONG):
✓ EXACTLY 2,000 words (±5 words maximum tolerance: 1995-2005 words)
✓ Word count calculation: strip ALL HTML tags, count remaining words
✓ MANDATORY STRUCTURE to reach 2000 words:
  - Introduction paragraph: 200-250 words (NOT in a section, just paragraphs before first H2)
  - EXACTLY 6-8 main sections with <h2> headings
  - Each H2 section: 250-350 words with multiple paragraphs
  - Each H2 should have 2-3 <h3> subsections  
  - Conclusion section: 200-250 words with final thoughts and CTA
✓ DO NOT write short 100-word sections - you will fail
✓ DO NOT skip sections - write ALL sections fully
✓ This is automatically validated - wrong word count = automatic rejection

📝 META DESCRIPTION (STRICTLY ENFORCED):
✓ EXACTLY 150-160 characters (not 149, not 161)
✓ MUST include primary keyword: "${keywords.split(',')[0].trim()}"
✓ Example length: "Discover evidence-based anxiety treatment options in Orlando. Expert therapists at Empathy Health Clinic provide personalized care for adults 18+." (159 chars)

🎯 HEADINGS (EXACT STRUCTURE REQUIRED):
✓ Exactly ONE <h1> tag (no more, no less)
✓ Minimum SIX <h2> tags for main sections
✓ Multiple <h3> tags under each <h2> for subsections
✓ Example structure:
  <h1>Main Title</h1>
  <h2>Section 1</h2>
  <h3>Subsection 1.1</h3>
  <h3>Subsection 1.2</h3>
  <h2>Section 2</h2>
  <h3>Subsection 2.1</h3>

🔗 INTERNAL LINKS (MINIMUM 4 REQUIRED):
✓ Use these exact paths ONLY:
  • /services
  • /emdr-therapy
  • /depression-counseling
  • /anxiety-therapy
  • /virtual-therapy
  • /crisis-therapy
  • /request-appointment
  • /team
  • /conditions
  • /treatments
✓ Each link MUST have 100% unique anchor text
✓ BAD: "learn more" used twice
✓ GOOD: "explore our services", "discover EMDR therapy", "schedule a consultation", "meet our team"

🔗 EXTERNAL LINKS (MINIMUM 3 AUTHORITATIVE SOURCES):
✓ MUST include links from these authoritative sources:
  • https://www.nimh.nih.gov/ (National Institute of Mental Health)
  • https://www.apa.org/ (American Psychological Association)
  • https://www.samhsa.gov/ (SAMHSA)
  • https://www.who.int/ (World Health Organization)
  • https://www.cdc.gov/ (CDC)
✓ Each link MUST have unique anchor text

✓ PATIENT REFERENCES:
Use natural, relatable language when discussing patient experiences:
  • "a patient", "an individual", "someone", "a person"
  • "individuals experiencing...", "people with...", "those who struggle with..."
  • "patients often report...", "many people find..."

📍 LOCAL SEO (REQUIRED):
✓ Mention "Orlando" at least TWICE
✓ Mention "Winter Park" at least ONCE
✓ Mention "adults" or "18+" at least ONCE
✓ Example: "Our Orlando-based clinic serves adults 18+ in Winter Park and surrounding areas"

🎯 KEYWORD OPTIMIZATION:
✓ Primary keyword "${keywords.split(',')[0].trim()}" in:
  • Title (first 30 characters preferred)
  • Meta description
  • First paragraph (first 150 words)
✓ Keyword density: 0.5-3% throughout content
✓ Natural placement - never forced or repetitive

📞 CALL-TO-ACTION (REQUIRED):
✓ MUST include CTA phrases:
  • "Contact us", "Schedule an appointment", "Call us today"
  • "Reach out for help", "Book your consultation"
  • "Request an appointment", "Connect with our team"

📸 IMAGE SEARCH QUERIES (CRITICAL - BRAND STANDARDS):
✗ NEVER use queries that might return:
  • Pills, medication, pharmaceuticals, or prescriptions
  • Overly sad, dark, or distressing imagery
  • People crying, in obvious distress, or looking severely depressed
  • Clinical settings with medical equipment
  • Isolation imagery (person alone in darkness)
✓ ALWAYS use queries focused on:
  • Hope, healing, growth, and recovery
  • Nature scenes (sunrise, peaceful landscapes, trees, water)
  • Professional therapy environments (bright, welcoming offices)
  • Wellness and self-care (meditation, mindfulness, peaceful moments)
  • Support and connection (warm, professional, uplifting)
✓ Example GOOD queries:
  • "peaceful nature healing sunrise hope"
  • "professional therapy office bright welcoming"
  • "wellness mindfulness calm serene"
  • "mental health recovery growth journey"
  • "supportive counseling warm environment"
  • "therapy session professional bright office"
✗ Example BAD queries (NEVER USE):
  • "depression medication pills" ❌
  • "sad person crying dark" ❌
  • "mental illness distress" ❌
  • "pharmaceutical treatment" ❌

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT (JSON):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{
  "title": "Under 60 chars, includes primary keyword, compelling",
  "metaDescription": "EXACTLY 150-160 characters including primary keyword",
  "slug": "url-friendly-slug-from-title",
  "excerpt": "First 200 characters from content",
  "content": "FULL 2000-word HTML article - see structure below",
  "featuredImageQuery": "peaceful nature healing sunrise hope mental wellness",
  "contentImageQueries": ["professional therapy office bright welcoming", "wellness mindfulness calm serene", "supportive counseling warm environment"],
  "internalLinks": ["/services", "/emdr-therapy", "/depression-counseling", "/request-appointment"],
  "externalLinks": ["https://www.nimh.nih.gov/health/topics/...", "https://www.apa.org/topics/...", "https://www.samhsa.gov/..."]
}

CONTENT STRUCTURE EXAMPLE:
<h1>Understanding ${topic}</h1>

<p>Opening paragraph with primary keyword "${keywords.split(',')[0].trim()}" in first 150 words. Mention Orlando and that services are for adults 18+.</p>

<h2>What Is [Topic]?</h2>
<h3>Definition and Overview</h3>
<p>Detailed content with <a href="/services">unique anchor text 1</a>...</p>
<h3>Common Symptoms</h3>
<p>More content...</p>

<h2>Evidence-Based Treatment Approaches</h2>
<h3>Cognitive Behavioral Therapy</h3>
<p>Content with <a href="https://www.nimh.nih.gov/health/topics/...">authoritative source</a>...</p>
<h3>Medication Management</h3>
<p>Content...</p>

<h2>How Therapy Helps</h2>
<h3>Building Coping Skills</h3>
<p>Content with <a href="/emdr-therapy">unique anchor text 2</a>...</p>
<h3>Long-term Benefits</h3>
<p>Content...</p>

<h2>Finding the Right Treatment</h2>
<h3>Assessment Process</h3>
<p>Content...</p>
<h3>Personalized Care Plans</h3>
<p>Content...</p>

<h2>What to Expect in Treatment</h2>
<h3>Initial Consultation</h3>
<p>Content with Winter Park mention...</p>
<h3>Ongoing Support</h3>
<p>Content...</p>

<h2>Getting Started with Treatment in Orlando</h2>
<h3>Why Choose Empathy Health Clinic</h3>
<p>Content with <a href="/request-appointment">schedule your consultation</a> CTA...</p>
<h3>Contact Information</h3>
<p>Final CTA: "Contact us today to begin your journey to mental wellness."</p>

INPUT PARAMETERS:
- Topic: ${topic}
- Primary Keyword: ${keywords.split(',')[0].trim()}
- All Keywords: ${keywords}
- Location: ${city || 'Orlando/Winter Park'}
- Image Style: ${imageStyle || 'calming, professional mental health'}

FINAL CHECKLIST BEFORE SUBMITTING:
☑ Exactly 2000 words (±5)
☑ Meta description 150-160 characters with keyword
☑ One H1, 6+ H2s, multiple H3s
☑ 4+ internal links, all unique anchor text
☑ 3+ authoritative external links
☑ "Orlando" mentioned 2+ times
☑ "Winter Park" mentioned 1+ time
☑ "adults" or "18+" mentioned
☑ NO patient identifiers (HIPAA)
☑ CTA included
☑ Keyword in title, meta, first paragraph`;

    try {
      console.log("🤖 Starting 3-step iterative blog generation...");
      
      let result: any;
      let score = 0;
      let validationResults: any;

      // STEP 1: Generate base content with focus on structure and word count
      console.log("📝 STEP 1/3: Generating base content (structure + 2000 words)...");
      const step1Prompt = `Generate a comprehensive blog post about: ${topic}

PRIMARY FOCUS FOR THIS STEP:
1. Create EXACTLY 2000 words (±5 words: 1995-2005 words total)
2. Proper heading structure: One H1, 6-8 H2 sections, multiple H3 subsections
3. Professional medical content about the topic
4. Natural, flowing paragraphs

Word Count Strategy to Reach 2000 Words:
- Introduction: 200-250 words
- 6-8 Main Sections (H2 headings): 250-350 words each
- Conclusion: 200-250 words
- Total: ~2000 words

Basic Requirements:
- Title under 60 characters
- Meta description 150-160 characters with keyword "${keywords.split(',')[0].trim()}"
- Include some internal links to /services, /request-appointment
- Mention Orlando and Winter Park
- NO patient names or ages (use "individuals", "a person", "someone")

Generate the base content now. Don't worry about perfection - we'll improve it in the next steps.`;

      const step1Completion = await getOpenAI().chat.completions.create({
        model: "gpt-4o",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: step1Prompt }
        ],
        temperature: 0.7,
        max_tokens: 16000,
      });

      result = JSON.parse(step1Completion.choices[0].message.content || "{}");
      
      // Validate step 1
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
      
      console.log(`   Step 1 Score: ${score}/100 | Word Count: ${validationResults.wordCount}`);
      console.log(`   Issues: ${validationResults.issues.slice(0, 3).join(', ')}`);

      // STEP 2: Review and enhance SEO elements
      console.log("🎯 STEP 2/3: Enhancing SEO elements (keywords, links, meta)...");
      const step2Prompt = `Review the blog you just created and improve the SEO elements.

CURRENT BLOG:
Title: ${result.title}
Meta Description: ${result.metaDescription}
Word Count: ${validationResults.wordCount}
Current Score: ${score}/100

CONTENT PREVIEW (first 500 chars):
${result.content.substring(0, 500)}...

ISSUES TO FIX:
${validationResults.issues.map((issue: string, i: number) => `${i + 1}. ${issue}`).join('\n')}

STEP 2 IMPROVEMENTS NEEDED:
1. Fix meta description to be EXACTLY 150-160 characters with keyword "${keywords.split(',')[0].trim()}"
2. Add 4+ internal links with UNIQUE anchor text:
   - Use /services, /emdr-therapy, /depression-counseling, /anxiety-therapy, /request-appointment, /team
   - Each link needs different anchor text (BAD: "learn more" twice; GOOD: "explore our services", "schedule consultation")
3. Add 3+ authoritative external links from NIMH, APA, SAMHSA with unique anchor text
4. Ensure primary keyword "${keywords.split(',')[0].trim()}" appears in: title, meta description, AND first paragraph
5. If word count is not 1995-2005, adjust content length accordingly
6. Check for any patient identifiers (names, ages, cities) and remove them - use only "individuals", "a person", "someone"

Return the IMPROVED blog with all SEO fixes applied. Keep the same general content but enhance the SEO elements.`;

      const step2Completion = await getOpenAI().chat.completions.create({
        model: "gpt-4o",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: step1Prompt },
          { role: "assistant", content: JSON.stringify(result) },
          { role: "user", content: step2Prompt }
        ],
        temperature: 0.5,
        max_tokens: 16000,
      });

      result = JSON.parse(step2Completion.choices[0].message.content || "{}");
      
      // Validate step 2
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
      
      console.log(`   Step 2 Score: ${score}/100 | Word Count: ${validationResults.wordCount}`);
      console.log(`   Remaining Issues: ${validationResults.issues.slice(0, 3).join(', ')}`);

      // STEP 3: Final polish for compliance and quality
      console.log("✨ STEP 3/3: Final polish (HIPAA, formatting, quality)...");
      const step3Prompt = `Final quality check and polish of your blog.

CURRENT STATUS:
Score: ${score}/100
Word Count: ${validationResults.wordCount}
Meta Length: ${result.metaDescription?.length || 0} chars

REMAINING ISSUES:
${validationResults.issues.map((issue: string, i: number) => `${i + 1}. ${issue}`).join('\n')}

FINAL POLISH CHECKLIST:
1. CRITICAL HIPAA CHECK: Scan for ANY patient identifiers:
   - Remove: "Sarah", "John", "35-year-old", "age 42", "patient from Orlando"
   - Use ONLY: "a patient", "an individual", "someone", "a person", "individuals experiencing..."
2. Word Count: If not 1995-2005 words, add or trim content as needed
3. Meta Description: Must be EXACTLY 150-160 characters (current: ${result.metaDescription?.length || 0})
4. Anchor Text: Verify ALL links have unique anchor text (no duplicates like "learn more" appearing twice)
5. CTAs: Add clear call-to-action phrases: "Contact us", "Schedule an appointment", "Request a consultation"
6. Local SEO: Verify "Orlando" appears 2+ times, "Winter Park" 1+ time, "adults" or "18+" mentioned
7. Formatting: Clean HTML, proper paragraph breaks, professional structure

Return the FINAL, polished, publication-ready blog that scores 90+/100.`;

      const step3Completion = await getOpenAI().chat.completions.create({
        model: "gpt-4o",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: step1Prompt },
          { role: "assistant", content: step1Completion.choices[0].message.content || "{}" },
          { role: "user", content: step2Prompt },
          { role: "assistant", content: JSON.stringify(result) },
          { role: "user", content: step3Prompt }
        ],
        temperature: 0.3, // Lower temperature for precise fixes
        max_tokens: 16000,
      });

      result = JSON.parse(step3Completion.choices[0].message.content || "{}");
      
      // Final validation
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
      
      console.log(`📊 3-Step Generation Complete! Score: ${score}/100 | Word Count: ${validationResults.wordCount}`);
      
      // ADDITIONAL IMPROVEMENT LOOP: Keep going until 80+ score
      let improvementAttempt = 0;
      const maxImprovementAttempts = 10; // Maximum 10 additional improvement rounds (was 5)
      const targetScore = 80;

      while (score < targetScore && improvementAttempt < maxImprovementAttempts) {
        improvementAttempt++;
        console.log(`🔄 IMPROVEMENT ROUND ${improvementAttempt}/${maxImprovementAttempts}: Current Score ${score}/100 → Target: ${targetScore}/100`);
        console.log(`   Issues to fix: ${validationResults.issues.slice(0, 5).join(', ')}`);

        const improvementPrompt = `Your blog currently scores ${score}/100. We need ${targetScore}/100 to publish.

CURRENT BLOG STATUS:
- Title: ${result.title}
- Meta Description (${result.metaDescription?.length || 0} chars): ${result.metaDescription}
- Word Count: ${validationResults.wordCount} words
- Current Score: ${score}/100

CRITICAL ISSUES BLOCKING PUBLICATION:
${validationResults.issues.map((issue: string, i: number) => `${i + 1}. ${issue}`).join('\n')}

SPECIFIC FIXES NEEDED:

${validationResults.issues.includes('Word count must be 2000±5 words') ? `
🔴 WORD COUNT ISSUE (CRITICAL):
Your blog has ${validationResults.wordCount} words. It MUST be between 1995-2005 words.
${validationResults.wordCount < 1995 ? `ADD ${1995 - validationResults.wordCount} more words by:
- Expanding each section with 2-3 more paragraphs
- Adding more detailed examples and explanations
- Creating additional H3 subsections under existing H2s` : `REMOVE ${validationResults.wordCount - 2005} words by:
- Trimming redundant paragraphs
- Making sentences more concise
- Removing repetitive content`}
` : ''}

${validationResults.issues.some((i: string) => i.includes('Meta description')) ? `
🔴 META DESCRIPTION ISSUE (CRITICAL):
Current length: ${result.metaDescription?.length || 0} characters
Required: EXACTLY 150-160 characters with keyword "${keywords.split(',')[0].trim()}"
${result.metaDescription?.length < 150 ? 'ADD more words to reach 150-160 chars' : 'TRIM to 150-160 chars'}
` : ''}

${validationResults.issues.some((i: string) => i.includes('Keyword density')) ? `
🔴 KEYWORD DENSITY ISSUE:
The primary keyword "${keywords.split(',')[0].trim()}" needs to appear more naturally throughout the content.
Add it to 2-3 more paragraphs in a natural way.
` : ''}

${validationResults.issues.some((i: string) => i.includes('anchor text')) ? `
🔴 DUPLICATE ANCHOR TEXT:
Each link MUST have unique anchor text. Don't use "learn more" twice.
Use: "explore our services", "schedule a consultation", "discover treatment options", "meet our team"
` : ''}


${validationResults.issues.some((i: string) => i.includes('first paragraph')) ? `
🔴 KEYWORD IN FIRST PARAGRAPH:
The primary keyword "${keywords.split(',')[0].trim()}" MUST appear in the first paragraph (first 150 words).
Add it naturally to the opening paragraph.
` : ''}

Return the IMPROVED blog with ALL issues fixed. This is attempt ${improvementAttempt + 3}/${maxImprovementAttempts + 3}.`;

        const improvementCompletion = await getOpenAI().chat.completions.create({
          model: "gpt-4o",
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `CRITICAL: Fix ALL issues to reach ${targetScore}/100. Current score: ${score}/100.

${improvementPrompt}

REMEMBER:
- Be VERBOSE and COMPREHENSIVE in each section to hit 2000 words
- Write 3-4 paragraphs per H2 section (250-350 words each)
- Include detailed examples, explanations, and guidance` }
          ],
          temperature: 0.3, // Lower temperature for more focused improvements
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
