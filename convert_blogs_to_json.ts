import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface BlogFrontmatter {
  title: string;
  slug: string;
  date: string;
  excerpt?: string;
  featured_image?: string;
}

function parseFrontmatter(content: string): { frontmatter: BlogFrontmatter; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    throw new Error('No frontmatter found');
  }
  
  const [, frontmatterStr, bodyContent] = match;
  const frontmatter: any = {};
  
  frontmatterStr.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Remove quotes
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      
      frontmatter[key] = value;
    }
  });
  
  return { frontmatter: frontmatter as BlogFrontmatter, content: bodyContent.trim() };
}

function categorizePost(title: string, content: string): string {
  const titleLower = title.toLowerCase();
  const contentLower = content.toLowerCase();
  
  // Check for therapy-related content
  if (titleLower.includes('therapy') || titleLower.includes('counseling') || titleLower.includes('dbt') || titleLower.includes('cbt') || titleLower.includes('emdr')) {
    return 'Therapy';
  }
  
  // Check for wellness content
  if (titleLower.includes('wellness') || titleLower.includes('self-care') || titleLower.includes('mindfulness') || titleLower.includes('nutrition') || titleLower.includes('health')) {
    return 'Wellness';
  }
  
  // Default to Mental Health
  return 'Mental Health';
}

async function convertBlogsToJson() {
  const blogsDir = path.join(__dirname, 'blogs');
  const files = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md') && f !== 'index.md');
  
  console.log(`Converting ${files.length} blog posts to JSON...`);
  
  const blogPosts: any[] = [];
  
  for (const file of files) {
    try {
      const filePath = path.join(blogsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      
      const { frontmatter, content } = parseFrontmatter(fileContent);
      
      // Determine category
      const category = categorizePost(frontmatter.title, content);
      
      // Create blog post object
      const blogPost = {
        title: frontmatter.title,
        slug: frontmatter.slug,
        excerpt: frontmatter.excerpt || content.substring(0, 200).replace(/\n/g, ' ').trim() + '...',
        content: content,
        publishedDate: frontmatter.date,
        category: category,
        featuredImage: frontmatter.featured_image || '',
        author: 'Empathy Health Clinic',
        metaTitle: frontmatter.title,
        metaDescription: frontmatter.excerpt || content.substring(0, 160).replace(/\n/g, ' ').trim(),
        keywords: [],
        order: 0,
      };
      
      blogPosts.push(blogPost);
      console.log(`✓ ${frontmatter.title} [${category}]`);
    } catch (error) {
      console.error(`✗ Failed to convert ${file}:`, error);
    }
  }
  
  // Sort by date (newest first)
  blogPosts.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
  
  // Write to JSON file
  const outputPath = path.join(__dirname, 'server', 'blog-posts-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(blogPosts, null, 2));
  
  console.log(`\n✅ Done! Converted ${blogPosts.length} posts to ${outputPath}`);
}

convertBlogsToJson().catch(console.error);
