import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface SEOIssue {
  severity: 'critical' | 'warning' | 'info';
  category: string;
  message: string;
}

interface BlogAuditResult {
  file: string;
  title: string;
  slug: string;
  wordCount: number;
  issues: SEOIssue[];
  seoScore: number;
}

interface AuditSummary {
  totalBlogs: number;
  criticalIssues: number;
  warnings: number;
  averageScore: number;
  failedBlogs: string[];
  topIssues: { [key: string]: number };
}

class BlogSEOAuditor {
  private blogsDir: string;
  private results: BlogAuditResult[] = [];

  constructor(blogsDir: string) {
    this.blogsDir = blogsDir;
  }

  async auditAllBlogs(): Promise<void> {
    const files = fs.readdirSync(this.blogsDir)
      .filter(file => file.endsWith('.md') && file !== 'index.md');

    console.log(`\n🔍 Auditing ${files.length} blog posts for SEO compliance...\n`);

    for (const file of files) {
      const filePath = path.join(this.blogsDir, file);
      try {
        const result = await this.auditBlogFile(filePath);
        this.results.push(result);
      } catch (error) {
        console.error(`❌ Error processing ${file}: ${error instanceof Error ? error.message : String(error)}`);
        // Add a failed result for this blog
        this.results.push({
          file,
          title: 'ERROR: Could not parse file',
          slug: '',
          wordCount: 0,
          issues: [{
            severity: 'critical',
            category: 'File Error',
            message: `YAML parsing error: ${error instanceof Error ? error.message : String(error)}`
          }],
          seoScore: 0
        });
      }
    }
  }

  private async auditBlogFile(filePath: string): Promise<BlogAuditResult> {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content: markdown } = matter(content);
    const issues: SEOIssue[] = [];

    const title = frontmatter.title || '';
    const slug = frontmatter.slug || '';
    const metaDescription = frontmatter.metaDescription || frontmatter.excerpt || '';
    const wordCount = this.countWords(markdown);

    // 1. Content Length Check
    if (wordCount < 800) {
      issues.push({
        severity: 'critical',
        category: 'Content Length',
        message: `Word count is ${wordCount}, minimum is 800 words`
      });
    } else if (wordCount < 1200) {
      issues.push({
        severity: 'warning',
        category: 'Content Length',
        message: `Word count is ${wordCount}, target is 1200-2500 words`
      });
    }

    // 2. H1 Checks
    const h1Count = (markdown.match(/^# /gm) || []).length;
    if (h1Count === 0) {
      issues.push({
        severity: 'critical',
        category: 'H1',
        message: 'Missing H1 heading'
      });
    } else if (h1Count > 1) {
      issues.push({
        severity: 'critical',
        category: 'H1',
        message: `Multiple H1 headings found (${h1Count}), should have exactly 1`
      });
    }

    // 3. Title Length Check
    if (!title) {
      issues.push({
        severity: 'critical',
        category: 'Meta Title',
        message: 'Missing title in frontmatter'
      });
    } else {
      if (title.length < 50) {
        issues.push({
          severity: 'warning',
          category: 'Meta Title',
          message: `Title is ${title.length} characters, recommended 50-60`
        });
      } else if (title.length > 60) {
        issues.push({
          severity: 'warning',
          category: 'Meta Title',
          message: `Title is ${title.length} characters, recommended 50-60`
        });
      }
    }

    // 4. Meta Description Check
    if (!metaDescription) {
      issues.push({
        severity: 'critical',
        category: 'Meta Description',
        message: 'Missing meta description'
      });
    } else {
      if (metaDescription.length < 140) {
        issues.push({
          severity: 'warning',
          category: 'Meta Description',
          message: `Meta description is ${metaDescription.length} characters, recommended 140-160`
        });
      } else if (metaDescription.length > 160) {
        issues.push({
          severity: 'warning',
          category: 'Meta Description',
          message: `Meta description is ${metaDescription.length} characters, recommended 140-160`
        });
      }
    }

    // 5. Heading Structure
    const h2Count = (markdown.match(/^## /gm) || []).length;
    if (h2Count < 2) {
      issues.push({
        severity: 'warning',
        category: 'Heading Structure',
        message: `Only ${h2Count} H2 headings found, consider adding more for better structure`
      });
    }

    // 6. Internal Links Check
    const internalLinks = (markdown.match(/\[([^\]]+)\]\((\/[^)]+)\)/g) || []).length;
    if (internalLinks < 3) {
      issues.push({
        severity: 'critical',
        category: 'Internal Linking',
        message: `Only ${internalLinks} internal links found, minimum is 3-5`
      });
    } else if (internalLinks > 10) {
      issues.push({
        severity: 'info',
        category: 'Internal Linking',
        message: `${internalLinks} internal links found, ensure they're natural and valuable`
      });
    }

    // 7. Images Check
    const images = (markdown.match(/!\[([^\]]*)\]\(([^)]+)\)/g) || []);
    const imageCount = images.length;
    const expectedImages = Math.floor(wordCount / 400);

    if (imageCount === 0) {
      issues.push({
        severity: 'critical',
        category: 'Images',
        message: 'No images found in content'
      });
    } else if (imageCount < expectedImages) {
      issues.push({
        severity: 'warning',
        category: 'Images',
        message: `Only ${imageCount} images for ${wordCount} words, consider adding more (target: 1 per 300-500 words)`
      });
    }

    // 8. Alt Text Check
    const imagesWithoutAlt = images.filter(img => {
      const altMatch = img.match(/!\[([^\]]*)\]/);
      return !altMatch || !altMatch[1] || altMatch[1].trim().length === 0;
    });

    if (imagesWithoutAlt.length > 0) {
      issues.push({
        severity: 'critical',
        category: 'Images',
        message: `${imagesWithoutAlt.length} images missing alt text`
      });
    }

    // 9. URL Structure Check
    if (!slug) {
      issues.push({
        severity: 'critical',
        category: 'URL Structure',
        message: 'Missing slug in frontmatter'
      });
    } else {
      if (slug.includes('_')) {
        issues.push({
          severity: 'warning',
          category: 'URL Structure',
          message: 'Slug contains underscores, use hyphens instead'
        });
      }
      if (slug.length > 60) {
        issues.push({
          severity: 'warning',
          category: 'URL Structure',
          message: `Slug is ${slug.length} characters, keep it short and keyword-focused`
        });
      }
    }

    // 10. Featured Image Check
    if (!frontmatter.featured_image) {
      issues.push({
        severity: 'warning',
        category: 'Featured Image',
        message: 'Missing featured image'
      });
    }

    // 11. Readability Checks
    const longParagraphs = this.checkParagraphLength(markdown);
    if (longParagraphs > wordCount * 0.3) {
      issues.push({
        severity: 'warning',
        category: 'Readability',
        message: 'Many long paragraphs detected, consider breaking them up'
      });
    }

    // 12. List Usage
    const listItems = (markdown.match(/^[\s]*[-*+]\s/gm) || []).length;
    if (listItems < 3) {
      issues.push({
        severity: 'info',
        category: 'Readability',
        message: 'Few bullet lists found, consider using lists for better readability'
      });
    }

    // 13. Featured Snippet Optimization
    const hasNumberedList = /^\d+\.\s/m.test(markdown);
    const hasTable = /\|[^\n]+\|/m.test(markdown);
    if (!hasNumberedList && !hasTable && wordCount > 1000) {
      issues.push({
        severity: 'info',
        category: 'Featured Snippet',
        message: 'Consider adding numbered lists or tables for featured snippet optimization'
      });
    }

    const seoScore = this.calculateSEOScore(issues, wordCount, internalLinks, imageCount);

    return {
      file: path.basename(filePath),
      title,
      slug,
      wordCount,
      issues,
      seoScore
    };
  }

  private countWords(text: string): number {
    const cleanText = text
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
      .replace(/[#*_`~]/g, '')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`[^`]+`/g, '')
      .trim();

    return cleanText.split(/\s+/).filter(word => word.length > 0).length;
  }

  private checkParagraphLength(markdown: string): number {
    const paragraphs = markdown.split(/\n\n+/);
    let longParagraphWords = 0;

    for (const para of paragraphs) {
      const words = this.countWords(para);
      if (words > 100) {
        longParagraphWords += words;
      }
    }

    return longParagraphWords;
  }

  private calculateSEOScore(issues: SEOIssue[], wordCount: number, internalLinks: number, imageCount: number): number {
    let score = 100;

    for (const issue of issues) {
      if (issue.severity === 'critical') {
        score -= 10;
      } else if (issue.severity === 'warning') {
        score -= 5;
      } else if (issue.severity === 'info') {
        score -= 2;
      }
    }

    if (wordCount >= 1200 && wordCount <= 2500) score += 5;
    if (internalLinks >= 3 && internalLinks <= 8) score += 5;
    if (imageCount > 0) score += 5;

    return Math.max(0, Math.min(100, score));
  }

  generateSummary(): AuditSummary {
    const summary: AuditSummary = {
      totalBlogs: this.results.length,
      criticalIssues: 0,
      warnings: 0,
      averageScore: 0,
      failedBlogs: [],
      topIssues: {}
    };

    let totalScore = 0;

    for (const result of this.results) {
      totalScore += result.seoScore;

      for (const issue of result.issues) {
        if (issue.severity === 'critical') {
          summary.criticalIssues++;
        } else if (issue.severity === 'warning') {
          summary.warnings++;
        }

        const key = `${issue.category}: ${issue.message}`;
        summary.topIssues[key] = (summary.topIssues[key] || 0) + 1;
      }

      const hasCritical = result.issues.some(i => i.severity === 'critical');
      if (result.seoScore < 70 || hasCritical) {
        summary.failedBlogs.push(result.file);
      }
    }

    summary.averageScore = Math.round(totalScore / this.results.length);

    return summary;
  }

  printResults(): void {
    console.log('\n📊 SEO AUDIT RESULTS\n');
    console.log('='.repeat(80));

    const sortedResults = [...this.results].sort((a, b) => a.seoScore - b.seoScore);

    for (const result of sortedResults) {
      const scoreEmoji = result.seoScore >= 90 ? '🟢' : result.seoScore >= 70 ? '🟡' : '🔴';

      console.log(`\n${scoreEmoji} ${result.title}`);
      console.log(`   File: ${result.file}`);
      console.log(`   Score: ${result.seoScore}/100 | Words: ${result.wordCount}`);

      if (result.issues.length > 0) {
        console.log(`   Issues:`);
        for (const issue of result.issues) {
          const icon = issue.severity === 'critical' ? '❌' : issue.severity === 'warning' ? '⚠️' : 'ℹ️';
          console.log(`     ${icon} [${issue.category}] ${issue.message}`);
        }
      } else {
        console.log(`   ✅ No issues found!`);
      }
    }

    console.log('\n' + '='.repeat(80));
  }

  printSummary(): void {
    const summary = this.generateSummary();

    console.log('\n\n📈 AUDIT SUMMARY\n');
    console.log('='.repeat(80));
    console.log(`Total Blogs Audited: ${summary.totalBlogs}`);
    console.log(`Average SEO Score: ${summary.averageScore}/100`);
    console.log(`Critical Issues: ${summary.criticalIssues}`);
    console.log(`Warnings: ${summary.warnings}`);
    console.log(`Failed Blogs (score < 70 or critical issues): ${summary.failedBlogs.length}`);

    if (summary.failedBlogs.length > 0) {
      console.log(`\n🔴 Blogs Requiring Immediate Attention:`);
      for (const blog of summary.failedBlogs.slice(0, 10)) {
        console.log(`   - ${blog}`);
      }
      if (summary.failedBlogs.length > 10) {
        console.log(`   ... and ${summary.failedBlogs.length - 10} more`);
      }
    }

    console.log(`\n📋 Top 10 Most Common Issues:`);
    const sortedIssues = Object.entries(summary.topIssues)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    for (const [issue, count] of sortedIssues) {
      console.log(`   ${count}x - ${issue}`);
    }

    console.log('\n' + '='.repeat(80));
  }

  exportToJSON(outputPath: string): void {
    const summary = this.generateSummary();
    const report = {
      timestamp: new Date().toISOString(),
      summary,
      results: this.results
    };

    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
    console.log(`\n✅ Full audit report exported to: ${outputPath}`);
  }
}

async function main() {
  const blogsDir = path.join(__dirname, '../blogs');
  const outputPath = path.join(__dirname, '../seo-audit-report.json');

  const auditor = new BlogSEOAuditor(blogsDir);
  await auditor.auditAllBlogs();
  auditor.printResults();
  auditor.printSummary();
  auditor.exportToJSON(outputPath);

  console.log('\n✨ Audit complete!\n');
}

main().catch(console.error);
