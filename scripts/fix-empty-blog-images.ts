import fs from 'fs';
import path from 'path';

interface BlogPost {
  title: string;
  featuredImage: string;
}

// Get all available stock images
function getStockImages(): string[] {
  const stockDir = path.join('attached_assets', 'stock_images');
  const files = fs.readdirSync(stockDir);
  return files
    .filter(f => f.match(/\.(jpg|png|webp)$/i))
    .map(f => `/attached_assets/stock_images/${f}`);
}

function fixEmptyImages() {
  console.log('🔍 Finding blog posts with empty featured images...\n');
  
  const blogPostsPath = 'server/blog-posts-data.json';
  const posts: BlogPost[] = JSON.parse(fs.readFileSync(blogPostsPath, 'utf-8'));
  
  // Get all currently used images
  const usedImages = new Set(posts.map(p => p.featuredImage).filter(Boolean));
  
  // Get all available stock images
  const allStockImages = getStockImages();
  
  // Find unused stock images
  const unusedImages = allStockImages.filter(img => !usedImages.has(img));
  
  console.log(`📊 Total stock images: ${allStockImages.length}`);
  console.log(`📊 Used stock images: ${allStockImages.length - unusedImages.length}`);
  console.log(`📊 Unused stock images: ${unusedImages.length}\n`);
  
  // Find posts with empty featured images
  const emptyPosts = posts.filter(p => !p.featuredImage);
  
  console.log(`Found ${emptyPosts.length} posts with empty featured images\n`);
  
  if (emptyPosts.length === 0) {
    console.log('✅ All posts have featured images!');
    return;
  }
  
  if (unusedImages.length < emptyPosts.length) {
    console.log('❌ Not enough unused stock images!');
    return;
  }
  
  // Assign unused images to empty posts
  emptyPosts.forEach((post, index) => {
    post.featuredImage = unusedImages[index];
    console.log(`✅ "${post.title.substring(0, 60)}..."`);
    console.log(`   New: ${path.basename(unusedImages[index])}\n`);
  });
  
  // Save updated blog posts
  fs.writeFileSync(blogPostsPath, JSON.stringify(posts, null, 2));
  
  console.log(`\n✨ Complete! Updated ${emptyPosts.length} blog posts`);
  console.log(`💾 Saved to ${blogPostsPath}`);
}

fixEmptyImages();
