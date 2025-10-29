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

// Internal link mappings - keywords to URLs
const internalLinks: Record<string, { url: string; priority: number; variants: string[] }> = {
  // Treatments
  'psychiatric-evaluation': { url: '/psychiatric-evaluation', priority: 1, variants: ['psychiatric evaluation', 'psychiatric evaluations', 'mental health evaluation', 'mental health assessment', 'psychiatric assessment'] },
  'medication-management': { url: '/medication-management', priority: 1, variants: ['medication management', 'medication monitoring', 'psychiatric medication', 'psychiatric medications', 'psychotropic medication'] },
  'depression-treatment': { url: '/depression-treatment', priority: 2, variants: ['depression treatment', 'treating depression', 'treatment for depression', 'depression therapy', 'depression medication'] },
  'anxiety-treatment': { url: '/anxiety-treatment', priority: 2, variants: ['anxiety treatment', 'treating anxiety', 'treatment for anxiety', 'anxiety therapy', 'anxiety medication'] },
  'adhd-treatment': { url: '/adhd-treatment', priority: 2, variants: ['ADHD treatment', 'treating ADHD', 'treatment for ADHD', 'ADHD therapy', 'ADHD medication', 'attention deficit'] },
  'bipolar-disorder-treatment': { url: '/bipolar-disorder-treatment', priority: 2, variants: ['bipolar disorder treatment', 'bipolar treatment', 'treating bipolar disorder', 'bipolar medication'] },
  'ocd-treatment': { url: '/ocd-treatment', priority: 2, variants: ['OCD treatment', 'treating OCD', 'obsessive-compulsive disorder treatment', 'treatment for OCD'] },
  'ptsd-treatment': { url: '/ptsd-treatment', priority: 2, variants: ['PTSD treatment', 'treating PTSD', 'post-traumatic stress disorder treatment', 'trauma treatment'] },
  
  // Therapies
  'cognitive-behavioral-therapy': { url: '/cognitive-behavioral-therapy', priority: 1, variants: ['cognitive behavioral therapy', 'CBT', 'cognitive behaviour therapy', 'cognitive-behavioral therapy'] },
  'grief-counseling-services': { url: '/grief-counseling-services', priority: 2, variants: ['grief counseling', 'grief therapy', 'bereavement counseling', 'loss counseling'] },
  'anger-management': { url: '/anger-management', priority: 2, variants: ['anger management', 'anger therapy', 'anger counseling', 'managing anger'] },
  'depression-therapy': { url: '/depression-therapy', priority: 2, variants: ['depression therapy', 'therapy for depression', 'depression counseling'] },
  'bipolar-disorder-therapy': { url: '/bipolar-disorder-therapy', priority: 2, variants: ['bipolar disorder therapy', 'bipolar therapy', 'therapy for bipolar'] },
  'ocd-therapy': { url: '/ocd-therapy', priority: 2, variants: ['OCD therapy', 'therapy for OCD', 'obsessive-compulsive disorder therapy'] },
  'emdr-therapy': { url: '/emdr-therapy', priority: 2, variants: ['EMDR therapy', 'EMDR', 'eye movement desensitization', 'trauma therapy'] },
  'couples-therapy': { url: '/couples-therapy', priority: 2, variants: ['couples therapy', 'couples counseling', 'relationship therapy', 'marriage therapy'] },
  'lgbtq-therapy': { url: '/lgbtq-therapy', priority: 2, variants: ['LGBTQ therapy', 'LGBTQ counseling', 'LGBTQ+ therapy', 'gender identity therapy'] },
  'virtual-counseling-services': { url: '/virtual-counseling-services', priority: 1, variants: ['virtual counseling', 'online therapy', 'telehealth therapy', 'teletherapy', 'virtual therapy'] },
  
  // Conditions
  'anxiety-disorders': { url: '/anxiety-disorders', priority: 1, variants: ['anxiety disorder', 'anxiety disorders', 'generalized anxiety disorder', 'GAD', 'social anxiety', 'panic disorder'] },
  'depression': { url: '/depression', priority: 1, variants: ['depression', 'major depressive disorder', 'clinical depression', 'depressive disorder'] },
  'bipolar-disorder': { url: '/bipolar-disorder', priority: 1, variants: ['bipolar disorder', 'bipolar', 'manic depression', 'manic-depressive'] },
  'ptsd-trauma': { url: '/ptsd-trauma', priority: 1, variants: ['PTSD', 'post-traumatic stress disorder', 'trauma', 'traumatic stress'] },
  'adhd-attention-deficit-hyperactivity-disorder': { url: '/adhd-attention-deficit-hyperactivity-disorder', priority: 1, variants: ['ADHD', 'attention deficit hyperactivity disorder', 'attention deficit disorder', 'ADD'] },
  'ocd-obsessive-compulsive-disorder': { url: '/ocd-obsessive-compulsive-disorder', priority: 1, variants: ['OCD', 'obsessive-compulsive disorder', 'obsessive compulsive'] },
  'eating-disorders': { url: '/eating-disorders', priority: 1, variants: ['eating disorder', 'eating disorders', 'anorexia', 'bulimia', 'binge eating'] },
  'substance-use-disorders-addiction': { url: '/substance-use-disorders-addiction', priority: 1, variants: ['substance abuse', 'addiction', 'substance use disorder', 'drug addiction', 'alcohol addiction'] },
  'postpartum-depression-perinatal-mood-disorders': { url: '/postpartum-depression-perinatal-mood-disorders', priority: 1, variants: ['postpartum depression', 'perinatal mood disorder', 'postpartum mood', 'postnatal depression'] },
};

// External authoritative links
const externalLinks: Record<string, { url: string; variants: string[] }> = {
  'nimh': { url: 'https://www.nimh.nih.gov/', variants: ['National Institute of Mental Health', 'NIMH'] },
  'apa': { url: 'https://www.apa.org/', variants: ['American Psychological Association', 'APA'] },
  'nami': { url: 'https://www.nami.org/', variants: ['National Alliance on Mental Illness', 'NAMI'] },
  'samhsa': { url: 'https://www.samhsa.gov/', variants: ['SAMHSA', 'Substance Abuse and Mental Health Services Administration'] },
  'cdc-mental-health': { url: 'https://www.cdc.gov/mentalhealth/', variants: ['CDC mental health', 'Centers for Disease Control'] },
  'mental-health-america': { url: 'https://www.mhanational.org/', variants: ['Mental Health America', 'MHA'] },
};

function addLinksToContent(content: string, postTitle: string): string {
  let updatedContent = content;
  const linkedTerms = new Set<string>(); // Track what we've already linked in this post
  
  // Track existing links to avoid re-linking
  const existingLinks = new Set<string>();
  const existingLinkMatches = content.match(/\[([^\]]+)\]\(([^\)]+)\)/g);
  if (existingLinkMatches) {
    existingLinkMatches.forEach(match => {
      const textMatch = match.match(/\[([^\]]+)\]/);
      if (textMatch) {
        existingLinks.add(textMatch[1].toLowerCase());
      }
    });
  }

  // Sort internal links by priority (higher priority first)
  const sortedInternalLinks = Object.entries(internalLinks).sort((a, b) => b[1].priority - a[1].priority);

  // Add internal links
  for (const [key, linkData] of sortedInternalLinks) {
    // Try each variant
    for (const variant of linkData.variants) {
      if (linkedTerms.has(variant.toLowerCase())) continue;
      if (existingLinks.has(variant.toLowerCase())) continue;
      
      // Don't link if it's in the title (avoid self-referencing)
      if (postTitle.toLowerCase().includes(variant.toLowerCase())) continue;

      // Create a regex to find the term (case insensitive, not already linked)
      // Negative lookbehind to avoid matching inside existing links
      const regex = new RegExp(
        `(?<!\\[)\\b(${variant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b(?!\\]|\\))`,
        'i'
      );

      const match = updatedContent.match(regex);
      if (match) {
        const matchedText = match[1];
        // Only link the first occurrence
        updatedContent = updatedContent.replace(
          regex,
          `[${matchedText}](${linkData.url})`
        );
        linkedTerms.add(variant.toLowerCase());
        break; // Only link one variant per post
      }
    }
  }

  // Add 1-2 external authoritative links
  let externalLinksAdded = 0;
  const maxExternalLinks = 2;
  
  for (const [key, linkData] of Object.entries(externalLinks)) {
    if (externalLinksAdded >= maxExternalLinks) break;
    
    for (const variant of linkData.variants) {
      if (linkedTerms.has(variant.toLowerCase())) continue;
      if (existingLinks.has(variant.toLowerCase())) continue;

      const regex = new RegExp(
        `(?<!\\[)\\b(${variant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b(?!\\]|\\))`,
        'i'
      );

      const match = updatedContent.match(regex);
      if (match) {
        const matchedText = match[1];
        updatedContent = updatedContent.replace(
          regex,
          `[${matchedText}](${linkData.url})`
        );
        linkedTerms.add(variant.toLowerCase());
        externalLinksAdded++;
        break;
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
