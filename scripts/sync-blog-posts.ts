/**
 * Sync Blog Posts Script
 *
 * This script syncs blog posts from the JSON file to the PostgreSQL database.
 * It only adds posts that don't already exist (matched by slug).
 *
 * Usage: npx tsx scripts/sync-blog-posts.ts
 */

import { db } from "../server/db";
import { blogPosts } from "../shared/schema";
import { eq } from "drizzle-orm";
import blogPostsData from "../server/blog-posts-data.json";

interface BlogPostData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedDate: string;
  category: string;
  featuredImage?: string;
  author: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  order: number;
  isFeatured?: boolean;
  status?: string;
}

async function syncBlogPosts() {
  console.log("🔄 Starting blog post sync...\n");

  // Get all existing posts from database
  const existingPosts = await db.select({ slug: blogPosts.slug }).from(blogPosts);
  const existingSlugs = new Set(existingPosts.map(p => p.slug));

  console.log(`📊 Found ${existingPosts.length} existing posts in database`);
  console.log(`📄 Found ${blogPostsData.length} posts in JSON file\n`);

  // Find posts that need to be added
  const postsToAdd: BlogPostData[] = (blogPostsData as BlogPostData[]).filter(
    post => !existingSlugs.has(post.slug)
  );

  if (postsToAdd.length === 0) {
    console.log("✅ All posts are already in the database. Nothing to sync.");
    return;
  }

  console.log(`📝 Found ${postsToAdd.length} new posts to add:\n`);

  // Show which posts will be added
  const postsByMonth: Record<string, BlogPostData[]> = {};
  for (const post of postsToAdd) {
    const date = new Date(post.publishedDate);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!postsByMonth[monthKey]) {
      postsByMonth[monthKey] = [];
    }
    postsByMonth[monthKey].push(post);
  }

  for (const [month, posts] of Object.entries(postsByMonth).sort()) {
    console.log(`  ${month}: ${posts.length} posts`);
  }
  console.log();

  // Insert new posts with status = "published"
  let added = 0;
  let errors = 0;

  for (const post of postsToAdd) {
    try {
      await db.insert(blogPosts).values({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        publishedDate: post.publishedDate,
        category: post.category,
        featuredImage: post.featuredImage || null,
        author: post.author || "Empathy Health Clinic",
        metaTitle: post.metaTitle || post.title,
        metaDescription: post.metaDescription || post.excerpt,
        keywords: post.keywords || [],
        order: post.order || 0,
        isFeatured: post.isFeatured || false,
        status: "published", // Ensure status is set
      });
      added++;
      console.log(`  ✓ Added: ${post.title}`);
    } catch (error) {
      errors++;
      console.error(`  ✗ Failed to add "${post.title}":`, error);
    }
  }

  console.log(`\n✅ Sync complete!`);
  console.log(`   Added: ${added}`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Total posts in database: ${existingPosts.length + added}`);
}

syncBlogPosts()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Sync failed:", error);
    process.exit(1);
  });
