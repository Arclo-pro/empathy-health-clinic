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

// Fix malformed nested links
function fixMalformedLinks(content: string): string {
  // Pattern to match malformed links like [text](https://www.[keyword](url)...)
  // Replace with just the outer link structure, removing the nested part
  let fixed = content;
  
  // Fix pattern: [text](https://www.[text](url) -> keep original external URL
  const malformedPattern = /\[([^\]]+)\]\((https?:\/\/[^\)]*)\[([^\]]+)\]\(([^\)]+)\)([^\)]*)\)/g;
  
  fixed = fixed.replace(malformedPattern, (match, text1, urlStart, nestedText, nestedUrl, urlEnd) => {
    // If the nested URL is more complete, use it
    if (nestedUrl.startsWith('http')) {
      return `[${text1}](${nestedUrl})`;
    }
    // Otherwise try to reconstruct the URL
    return `[${text1}](${urlStart}${urlEnd})`;
  });
  
  return fixed;
}

// Main execution
function fixBlogs() {
  console.log('Loading blog posts...');
  const blogPosts: BlogPost[] = JSON.parse(
    fs.readFileSync('server/blog-posts-data.json', 'utf-8')
  );

  console.log(`Fixing ${blogPosts.length} blog posts...`);
  let postsFixed = 0;

  const fixedPosts = blogPosts.map((post, index) => {
    const originalContent = post.content;
    const fixedContent = fixMalformedLinks(post.content);
    
    if (fixedContent !== originalContent) {
      postsFixed++;
      console.log(`✓ Fixed: ${post.title} (${index + 1}/${blogPosts.length})`);
    }

    return {
      ...post,
      content: fixedContent
    };
  });

  console.log(`\nWriting fixed blog posts to file...`);
  fs.writeFileSync(
    'server/blog-posts-data.json',
    JSON.stringify(fixedPosts, null, 2),
    'utf-8'
  );

  console.log(`\n✅ Complete!`);
  console.log(`Total posts: ${blogPosts.length}`);
  console.log(`Posts fixed: ${postsFixed}`);
}

fixBlogs();
