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

// Internal link mappings
const internalLinks = [
  { url: '/psychiatric-evaluation', variants: ['psychiatric evaluation', 'psychiatric evaluations', 'mental health evaluation', 'psychiatric assessment'], priority: 1 },
  { url: '/medication-management', variants: ['medication management', 'medication monitoring'], priority: 1 },
  { url: '/anxiety-treatment', variants: ['anxiety treatment', 'treating anxiety'], priority: 2 },
  { url: '/depression-treatment', variants: ['depression treatment', 'treating depression'], priority: 2 },
  { url: '/adhd-treatment', variants: ['ADHD treatment', 'treating ADHD'], priority: 2 },
  { url: '/bipolar-disorder-treatment', variants: ['bipolar disorder treatment', 'bipolar treatment'], priority: 2 },
  { url: '/ocd-treatment', variants: ['OCD treatment', 'treating OCD'], priority: 2 },
  { url: '/ptsd-treatment', variants: ['PTSD treatment', 'treating PTSD', 'trauma treatment'], priority: 2 },
  { url: '/cognitive-behavioral-therapy', variants: ['cognitive behavioral therapy', 'CBT'], priority: 1 },
  { url: '/grief-counseling-services', variants: ['grief counseling', 'grief therapy'], priority: 2 },
  { url: '/emdr-therapy', variants: ['EMDR therapy', 'EMDR'], priority: 2 },
  { url: '/couples-therapy', variants: ['couples therapy', 'couples counseling', 'relationship therapy'], priority: 2 },
  { url: '/virtual-counseling-services', variants: ['virtual counseling', 'online therapy', 'telehealth therapy', 'virtual therapy'], priority: 1 },
  { url: '/anxiety-disorders', variants: ['anxiety disorder', 'anxiety disorders', 'generalized anxiety disorder', 'panic disorder'], priority: 1 },
  { url: '/depression', variants: ['major depressive disorder', 'clinical depression'], priority: 1 },
  { url: '/bipolar-disorder', variants: ['bipolar disorder', 'bipolar'], priority: 1 },
  { url: '/ptsd-trauma', variants: ['post-traumatic stress disorder', 'traumatic stress'], priority: 1 },
  { url: '/adhd-attention-deficit-hyperactivity-disorder', variants: ['attention deficit hyperactivity disorder', 'attention deficit disorder'], priority: 1 },
  { url: '/ocd-obsessive-compulsive-disorder', variants: ['obsessive-compulsive disorder'], priority: 1 },
  { url: '/eating-disorders', variants: ['eating disorder', 'eating disorders'], priority: 1 },
  { url: '/substance-use-disorders-addiction', variants: ['substance abuse', 'substance use disorder'], priority: 1 },
  { url: '/postpartum-depression-perinatal-mood-disorders', variants: ['postpartum depression', 'perinatal mood disorder'], priority: 1 },
];

function addLinksToContent(content: string, postTitle: string): string {
  let result = content;
  const linked = new Set<string>();
  
  // Sort by priority
  const sorted = [...internalLinks].sort((a, b) => b.priority - a.priority);
  
  for (const link of sorted) {
    for (const variant of link.variants) {
      // Skip if already linked or in title
      if (linked.has(variant.toLowerCase())) continue;
      if (postTitle.toLowerCase().includes(variant.toLowerCase())) continue;
      
      // Create regex that:
      // 1. Matches word boundaries
      // 2. NOT preceded by [ or ( (start of link)
      // 3. NOT followed by ] or ) (end of link part)
      // 4. NOT inside a markdown link using negative lookbehind for recent ](
      const safeVariant = variant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      
      // Simple approach: find first match that's clearly not inside a link
      const regex = new RegExp(
        `(?<!\\[)(?<!\\()\\b(${safeVariant})\\b(?!\\])(?!\\))(?![^\\[]*\\]\\()`,
        'i'
      );
      
      const match = result.match(regex);
      if (match && match.index !== undefined) {
        const matchedText = match[1];
        const before = result.substring(0, match.index);
        const after = result.substring(match.index + matchedText.length);
        
        // Double-check: is there an unclosed [ or ( before this match?
        const recentText = before.slice(-100); // Last 100 chars
        const openBrackets = (recentText.match(/\[/g) || []).length;
        const closeBrackets = (recentText.match(/\]/g) || []).length;
        const openParens = (recentText.match(/\(/g) || []).length;
        const closeParens = (recentText.match(/\)/g) || []).length;
        
        // If brackets/parens are balanced in recent text, safe to link
        if (openBrackets === closeBrackets && openParens === closeParens) {
          result = before + `[${matchedText}](${link.url})` + after;
          linked.add(variant.toLowerCase());
          break; // Only link once per keyword
        }
      }
    }
  }
  
  return result;
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
