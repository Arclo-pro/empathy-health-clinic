import fs from 'fs';
import path from 'path';
import { storage } from './server/storage';

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
  if (titleLower.includes('wellness') || titleLower.includes('self-care') || titleLower.includes('mindfulness') || titleLower.includes('nutrition')) {
    return 'Wellness';
  }
  
  // Default to Mental Health
  return 'Mental Health';
}

async function importBlogs() {
  const blogsDir = path.join(__dirname, 'blogs');
  const files = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md') && f !== 'index.md');
  
  console.log(`Found ${files.length} blog posts to import`);
  
  let imported = 0;
  let skipped = 0;
  
  for (const file of files) {
    try {
      const filePath = path.join(blogsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      
      const { frontmatter, content } = parseFrontmatter(fileContent);
      
      // Skip if already exists
      const existingPosts = await storage.getBlogPosts();
      if (existingPosts.some(p => p.slug === frontmatter.slug)) {
        skipped++;
        continue;
      }
      
      // Determine category
      const category = categorizePost(frontmatter.title, content);
      
      // Create blog post
      const blogPost = await storage.createBlogPost({
        title: frontmatter.title,
        slug: frontmatter.slug,
        excerpt: frontmatter.excerpt || content.substring(0, 200) + '...',
        content: content,
        publishedDate: frontmatter.date,
        category: category,
        featuredImage: frontmatter.featured_image || '',
        author: 'Empathy Health Clinic',
        // SEO fields - will be enhanced later
        metaTitle: frontmatter.title,
        metaDescription: frontmatter.excerpt || content.substring(0, 160),
        keywords: [],
        order: 0,
      });
      
      imported++;
      console.log(`✓ Imported: ${frontmatter.title} [${category}]`);
    } catch (error) {
      console.error(`✗ Failed to import ${file}:`, error);
    }
  }
  
  console.log(`\n✅ Import complete!`);
  console.log(`   Imported: ${imported}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Total blog posts in system: ${(await storage.getBlogPosts()).length}`);
}

importBlogs().catch(console.error);
