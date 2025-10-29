import * as fs from 'fs';

interface BlogPost {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  publishedDate: string;
  category: string;
}

interface LinkMapping {
  url: string;
  priority: number;
  variants: string[];
}

// Internal link mappings - keywords to URLs
const internalLinks: Record<string, LinkMapping> = {
  // Treatments
  'psychiatric-evaluation': { url: '/psychiatric-evaluation', priority: 1, variants: ['psychiatric evaluation', 'psychiatric evaluations', 'mental health evaluation', 'mental health assessment', 'psychiatric assessment'] },
  'medication-management': { url: '/medication-management', priority: 1, variants: ['medication management', 'medication monitoring'] },
  'depression-treatment': { url: '/depression-treatment', priority: 2, variants: ['depression treatment', 'treating depression', 'treatment for depression'] },
  'anxiety-treatment': { url: '/anxiety-treatment', priority: 2, variants: ['anxiety treatment', 'treating anxiety', 'treatment for anxiety'] },
  'adhd-treatment': { url: '/adhd-treatment', priority: 2, variants: ['ADHD treatment', 'treating ADHD', 'treatment for ADHD'] },
  'bipolar-disorder-treatment': { url: '/bipolar-disorder-treatment', priority: 2, variants: ['bipolar disorder treatment', 'bipolar treatment', 'treating bipolar disorder'] },
  'ocd-treatment': { url: '/ocd-treatment', priority: 2, variants: ['OCD treatment', 'treating OCD', 'obsessive-compulsive disorder treatment'] },
  'ptsd-treatment': { url: '/ptsd-treatment', priority: 2, variants: ['PTSD treatment', 'treating PTSD', 'post-traumatic stress disorder treatment', 'trauma treatment'] },
  
  // Therapies  
  'cognitive-behavioral-therapy': { url: '/cognitive-behavioral-therapy', priority: 1, variants: ['cognitive behavioral therapy', 'CBT', 'cognitive behaviour therapy', 'cognitive-behavioral therapy'] },
  'grief-counseling-services': { url: '/grief-counseling-services', priority: 2, variants: ['grief counseling', 'grief therapy', 'bereavement counseling'] },
  'anger-management': { url: '/anger-management', priority: 2, variants: ['anger management', 'anger therapy'] },
  'emdr-therapy': { url: '/emdr-therapy', priority: 2, variants: ['EMDR therapy', 'EMDR', 'eye movement desensitization'] },
  'couples-therapy': { url: '/couples-therapy', priority: 2, variants: ['couples therapy', 'couples counseling', 'relationship therapy', 'marriage therapy'] },
  'lgbtq-therapy': { url: '/lgbtq-therapy', priority: 2, variants: ['LGBTQ therapy', 'LGBTQ counseling', 'LGBTQ+ therapy'] },
  'virtual-counseling-services': { url: '/virtual-counseling-services', priority: 1, variants: ['virtual counseling', 'online therapy', 'telehealth therapy', 'teletherapy', 'virtual therapy'] },
  
  // Conditions
  'anxiety-disorders': { url: '/anxiety-disorders', priority: 1, variants: ['anxiety disorder', 'anxiety disorders', 'generalized anxiety disorder', 'GAD', 'panic disorder'] },
  'depression': { url: '/depression', priority: 1, variants: ['major depressive disorder', 'clinical depression', 'depressive disorder'] },
  'bipolar-disorder': { url: '/bipolar-disorder', priority: 1, variants: ['bipolar disorder', 'bipolar', 'manic depression'] },
  'ptsd-trauma': { url: '/ptsd-trauma', priority: 1, variants: ['PTSD', 'post-traumatic stress disorder', 'traumatic stress'] },
  'adhd-attention-deficit-hyperactivity-disorder': { url: '/adhd-attention-deficit-hyperactivity-disorder', priority: 1, variants: ['ADHD', 'attention deficit hyperactivity disorder', 'attention deficit disorder', 'ADD'] },
  'ocd-obsessive-compulsive-disorder': { url: '/ocd-obsessive-compulsive-disorder', priority: 1, variants: ['OCD', 'obsessive-compulsive disorder'] },
  'eating-disorders': { url: '/eating-disorders', priority: 1, variants: ['eating disorder', 'eating disorders', 'anorexia', 'bulimia'] },
  'substance-use-disorders-addiction': { url: '/substance-use-disorders-addiction', priority: 1, variants: ['substance abuse', 'addiction', 'substance use disorder'] },
  'postpartum-depression-perinatal-mood-disorders': { url: '/postpartum-depression-perinatal-mood-disorders', priority: 1, variants: ['postpartum depression', 'perinatal mood disorder'] },
};

// External authoritative links
const externalLinks: Record<string, { url: string; variants: string[] }> = {
  'nimh': { url: 'https://www.nimh.nih.gov/', variants: ['National Institute of Mental Health'] },
  'apa': { url: 'https://www.apa.org/', variants: ['American Psychological Association'] },
  'nami': { url: 'https://www.nami.org/', variants: ['National Alliance on Mental Illness'] },
  'samhsa': { url: 'https://www.samhsa.gov/', variants: ['Substance Abuse and Mental Health Services Administration'] },
};

// Parse markdown to identify existing links and protect them
function parseMarkdownLinks(content: string): Array<{ start: number; end: number; full: string }> {
  const links: Array<{ start: number; end: number; full: string }> = [];
  const linkRegex = /\[([^\]]+)\]\(([^\)]+)\)/g;
  
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    links.push({
      start: match.index,
      end: match.index + match[0].length,
      full: match[0]
    });
  }
  
  return links;
}

// Check if a position is inside an existing link
function isInsideLink(pos: number, links: Array<{ start: number; end: number }>): boolean {
  return links.some(link => pos >= link.start && pos < link.end);
}

function addLinksToContent(content: string, postTitle: string): string {
  // Parse existing links first
  const existingLinks = parseMarkdownLinks(content);
  const linkedKeywords = new Set<string>();
  
  // Track what's already linked (extract link text)
  existingLinks.forEach(link => {
    const textMatch = link.full.match(/\[([^\]]+)\]/);
    if (textMatch) {
      linkedKeywords.add(textMatch[1].toLowerCase());
    }
  });
  
  let updatedContent = content;
  let offset = 0; // Track offset as we add links
  
  // Sort by priority
  const sortedInternalLinks = Object.entries(internalLinks).sort((a, b) => b[1].priority - a[1].priority);
  
  // Add internal links
  for (const [key, linkData] of sortedInternalLinks) {
    for (const variant of linkData.variants) {
      // Skip if already used
      if (linkedKeywords.has(variant.toLowerCase())) continue;
      
      // Skip if in title (avoid self-reference)
      if (postTitle.toLowerCase().includes(variant.toLowerCase())) continue;
      
      // Find the variant in content
      const searchRegex = new RegExp(`\\b(${variant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'i');
      const match = content.match(searchRegex);
      
      if (match && match.index !== undefined) {
        const matchPos = match.index;
        
        // Check if this position is inside an existing link
        if (!isInsideLink(matchPos, existingLinks)) {
          const matchedText = match[1];
          const beforeMatch = updatedContent.substring(0, matchPos + offset);
          const afterMatch = updatedContent.substring(matchPos + offset + matchedText.length);
          
          updatedContent = beforeMatch + `[${matchedText}](${linkData.url})` + afterMatch;
          
          // Update offset for next replacement
          offset += `[](${linkData.url})`.length;
          
          // Update existing links positions
          const newLinkLength = `[${matchedText}](${linkData.url})`.length;
          const addedLength = newLinkLength - matchedText.length;
          existingLinks.forEach(link => {
            if (link.start > matchPos) {
              link.start += addedLength;
              link.end += addedLength;
            }
          });
          
          // Add new link to tracking
          existingLinks.push({
            start: matchPos + offset - addedLength,
            end: matchPos + offset - addedLength + newLinkLength,
            full: `[${matchedText}](${linkData.url})`
          });
          
          linkedKeywords.add(variant.toLowerCase());
          break; // Only link one variant per post
        }
      }
    }
  }
  
  // Add 1-2 external links
  let externalLinksAdded = 0;
  const maxExternalLinks = 2;
  
  for (const [key, linkData] of Object.entries(externalLinks)) {
    if (externalLinksAdded >= maxExternalLinks) break;
    
    for (const variant of linkData.variants) {
      if (linkedKeywords.has(variant.toLowerCase())) continue;
      
      const searchRegex = new RegExp(`\\b(${variant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'i');
      const match = content.match(searchRegex);
      
      if (match && match.index !== undefined) {
        const matchPos = match.index;
        
        if (!isInsideLink(matchPos, existingLinks)) {
          const matchedText = match[1];
          const beforeMatch = updatedContent.substring(0, matchPos + offset);
          const afterMatch = updatedContent.substring(matchPos + offset + matchedText.length);
          
          updatedContent = beforeMatch + `[${matchedText}](${linkData.url})` + afterMatch;
          
          offset += `[](${linkData.url})`.length;
          
          const newLinkLength = `[${matchedText}](${linkData.url})`.length;
          const addedLength = newLinkLength - matchedText.length;
          existingLinks.forEach(link => {
            if (link.start > matchPos) {
              link.start += addedLength;
              link.end += addedLength;
            }
          });
          
          existingLinks.push({
            start: matchPos + offset - addedLength,
            end: matchPos + offset - addedLength + newLinkLength,
            full: `[${matchedText}](${linkData.url})`
          });
          
          linkedKeywords.add(variant.toLowerCase());
          externalLinksAdded++;
          break;
        }
      }
    }
  }
  
  return updatedContent;
}

// Main execution
function processBlogs() {
  console.log('Loading blog posts...');
  const blogPosts: BlogPost[] = JSON.parse(
    fs.readFileSync('server/blog-posts-data.json', 'utf-8')
  );

  console.log(`Processing ${blogPosts.length} blog posts...`);
  let postsUpdated = 0;

  const updatedPosts = blogPosts.map((post, index) => {
    const originalContent = post.content;
    const updatedContent = addLinksToContent(post.content, post.title);
    
    if (updatedContent !== originalContent) {
      postsUpdated++;
      console.log(`✓ Updated: ${post.title} (${index + 1}/${blogPosts.length})`);
    } else {
      console.log(`- Skipped: ${post.title} (${index + 1}/${blogPosts.length})`);
    }

    return {
      ...post,
      content: updatedContent
    };
  });

  console.log(`\nWriting updated blog posts to file...`);
  fs.writeFileSync(
    'server/blog-posts-data.json',
    JSON.stringify(updatedPosts, null, 2),
    'utf-8'
  );

  console.log(`\n✅ Complete!`);
  console.log(`Total posts: ${blogPosts.length}`);
  console.log(`Posts updated: ${postsUpdated}`);
  console.log(`Posts unchanged: ${blogPosts.length - postsUpdated}`);
}

processBlogs();
