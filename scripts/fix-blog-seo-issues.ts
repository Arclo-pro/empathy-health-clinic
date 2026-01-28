import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface BlogIndex {
  file: string;
  title: string;
  slug: string;
  topics: string[];
}

class BlogSEOFixer {
  private blogsDir: string;
  private blogIndex: BlogIndex[] = [];
  private fixedCount = {
    h1: 0,
    metaDescription: 0,
    images: 0,
    internalLinks: 0
  };

  constructor(blogsDir: string) {
    this.blogsDir = blogsDir;
  }

  /**
   * Build an index of all blogs for internal linking
   */
  async buildBlogIndex(): Promise<void> {
    const files = fs.readdirSync(this.blogsDir)
      .filter(file => file.endsWith('.md') && file !== 'index.md');

    for (const file of files) {
      try {
        const filePath = path.join(this.blogsDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data: frontmatter } = matter(content);

        const title = frontmatter.title || '';
        const slug = frontmatter.slug || file.replace('.md', '');

        // Extract topics from title and slug
        const topics = this.extractTopics(title + ' ' + slug);

        this.blogIndex.push({ file, title, slug, topics });
      } catch (error) {
        console.error(`Error indexing ${file}:`, error);
      }
    }

    console.log(`✅ Indexed ${this.blogIndex.length} blogs for internal linking\n`);
  }

  /**
   * Extract key topics from text for matching
   */
  private extractTopics(text: string): string[] {
    const keywords = [
      'anxiety', 'depression', 'adhd', 'bipolar', 'ptsd', 'ocd',
      'therapy', 'counseling', 'treatment', 'mental health',
      'cbt', 'dbt', 'emdr', 'couples', 'grief', 'stress',
      'orlando', 'winter park', 'florida',
      'mindfulness', 'medication', 'self-care'
    ];

    const lowerText = text.toLowerCase();
    return keywords.filter(keyword => lowerText.includes(keyword));
  }

  /**
   * Find related blogs for internal linking
   */
  private findRelatedBlogs(currentFile: string, currentTopics: string[], count: number = 5): BlogIndex[] {
    const related = this.blogIndex
      .filter(blog => blog.file !== currentFile)
      .map(blog => {
        const commonTopics = blog.topics.filter(topic => currentTopics.includes(topic));
        return { blog, score: commonTopics.length };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, count)
      .map(item => item.blog);

    return related;
  }

  /**
   * Fix all blogs
   */
  async fixAllBlogs(): Promise<void> {
    const files = fs.readdirSync(this.blogsDir)
      .filter(file => file.endsWith('.md') && file !== 'index.md');

    console.log(`🔧 Fixing SEO issues in ${files.length} blogs...\n`);

    for (const file of files) {
      const filePath = path.join(this.blogsDir, file);
      try {
        await this.fixBlogFile(filePath);
      } catch (error) {
        console.error(`❌ Error fixing ${file}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  }

  /**
   * Fix a single blog file
   */
  private async fixBlogFile(filePath: string): Promise<void> {
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsed = matter(content);
    const frontmatter = parsed.data;
    let markdown = parsed.content;
    let modified = false;

    const fileName = path.basename(filePath);
    const title = frontmatter.title || '';
    const slug = frontmatter.slug || '';

    // 1. Add H1 heading if missing
    const h1Count = (markdown.match(/^# /gm) || []).length;
    if (h1Count === 0 && title) {
      markdown = `# ${title}\n\n${markdown}`;
      this.fixedCount.h1++;
      modified = true;
    }

    // 2. Add meta description if missing
    if (!frontmatter.metaDescription && !frontmatter.excerpt) {
      const metaDesc = this.generateMetaDescription(markdown, title);
      frontmatter.metaDescription = metaDesc;
      this.fixedCount.metaDescription++;
      modified = true;
    } else if (!frontmatter.metaDescription && frontmatter.excerpt) {
      // Use excerpt as meta description if it exists
      frontmatter.metaDescription = frontmatter.excerpt.slice(0, 160);
      this.fixedCount.metaDescription++;
      modified = true;
    }

    // 3. Add featured image to content if missing
    const hasImages = /!\[([^\]]*)\]\(([^)]+)\)/.test(markdown);
    if (!hasImages && frontmatter.featured_image) {
      const altText = this.generateImageAltText(title);
      const imageMarkdown = `![${altText}](${frontmatter.featured_image})\n\n`;

      // Insert after first H1 or at the beginning
      const h1Match = markdown.match(/^# .+$/m);
      if (h1Match && h1Match.index !== undefined) {
        const insertPos = h1Match.index + h1Match[0].length + 1;
        markdown = markdown.slice(0, insertPos) + '\n' + imageMarkdown + markdown.slice(insertPos);
      } else {
        markdown = imageMarkdown + markdown;
      }

      this.fixedCount.images++;
      modified = true;
    }

    // 4. Add internal links if missing
    const internalLinksCount = (markdown.match(/\[([^\]]+)\]\((\/[^)]+)\)/g) || []).length;
    if (internalLinksCount < 3) {
      const topics = this.extractTopics(title + ' ' + markdown.slice(0, 500));
      const relatedBlogs = this.findRelatedBlogs(fileName, topics, 5);

      if (relatedBlogs.length > 0) {
        markdown = this.addInternalLinks(markdown, relatedBlogs);
        this.fixedCount.internalLinks++;
        modified = true;
      }
    }

    // Write changes if modified
    if (modified) {
      const newContent = matter.stringify(markdown, frontmatter);
      fs.writeFileSync(filePath, newContent);
    }
  }

  /**
   * Generate a meta description from content
   */
  private generateMetaDescription(markdown: string, title: string): string {
    // Remove markdown formatting and get first paragraph
    const cleanText = markdown
      .replace(/^#+ .+$/gm, '') // Remove headings
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '') // Remove images
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1') // Keep link text only
      .replace(/[*_`~]/g, '') // Remove formatting
      .trim();

    const firstParagraph = cleanText.split('\n\n')[0] || cleanText;

    // Create description with max 160 chars
    let description = firstParagraph.slice(0, 157);

    // Try to end at a word boundary
    if (description.length === 157) {
      const lastSpace = description.lastIndexOf(' ');
      if (lastSpace > 100) {
        description = description.slice(0, lastSpace) + '...';
      } else {
        description = description + '...';
      }
    }

    return description.trim();
  }

  /**
   * Generate alt text for image
   */
  private generateImageAltText(title: string): string {
    return title.length > 100 ? title.slice(0, 97) + '...' : title;
  }

  /**
   * Add internal links to markdown content
   */
  private addInternalLinks(markdown: string, relatedBlogs: BlogIndex[]): string {
    // Add a "Related Articles" section at the end
    const linksSection = '\n\n## Related Articles\n\n' +
      relatedBlogs.slice(0, 3).map(blog =>
        `- [${blog.title}](/blog/${blog.slug})`
      ).join('\n') + '\n';

    // Insert before any social media links or at the end
    const socialIndex = markdown.search(/Facebook|Twitter|LinkedIn/i);
    if (socialIndex !== -1) {
      return markdown.slice(0, socialIndex) + linksSection + '\n' + markdown.slice(socialIndex);
    }

    return markdown + linksSection;
  }

  /**
   * Print summary of fixes
   */
  printSummary(): void {
    console.log('\n\n📊 SEO FIXES SUMMARY\n');
    console.log('='.repeat(80));
    console.log(`✅ Added H1 headings: ${this.fixedCount.h1} blogs`);
    console.log(`✅ Added meta descriptions: ${this.fixedCount.metaDescription} blogs`);
    console.log(`✅ Added images: ${this.fixedCount.images} blogs`);
    console.log(`✅ Added internal links: ${this.fixedCount.internalLinks} blogs`);
    console.log('='.repeat(80));
    console.log('\n✨ All fixes complete!\n');
  }
}

async function main() {
  const blogsDir = path.join(__dirname, '../blogs');

  const fixer = new BlogSEOFixer(blogsDir);

  console.log('🚀 Starting blog SEO fixes...\n');

  // Build index first for internal linking
  await fixer.buildBlogIndex();

  // Fix all blogs
  await fixer.fixAllBlogs();

  // Print summary
  fixer.printSummary();
}

main().catch(console.error);
