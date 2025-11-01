import fs from 'fs';
import path from 'path';

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedDate: string;
  category: string;
  featuredImage: string;
  author: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  order: number;
}

// Normalize image path to get base image (ignore size variations)
function getBaseImage(imagePath: string): string {
  if (!imagePath) return '';
  
  // Remove size variations like -150x150, -300x200, -1024x576, etc.
  return imagePath
    .replace(/-\d+x\d+\.(jpg|png|webp)/, '.$1')
    .replace(/-scaled\.(jpg|png|webp)/, '.$1');
}

// Get all available stock images
function getStockImages(): string[] {
  const stockDir = path.join('attached_assets', 'stock_images');
  if (!fs.existsSync(stockDir)) {
    return [];
  }
  
  const files = fs.readdirSync(stockDir);
  return files
    .filter(f => f.match(/\.(jpg|png|webp)$/i))
    .map(f => `/attached_assets/stock_images/${f}`);
}

function fixDuplicateImages() {
  console.log('🔍 Analyzing blog post images for duplicates...\n');
  
  // Load blog posts
  const blogPostsPath = 'server/blog-posts-data.json';
  const posts: BlogPost[] = JSON.parse(fs.readFileSync(blogPostsPath, 'utf-8'));
  
  console.log(`Found ${posts.length} blog posts\n`);
  
  // Track base images and their usage
  const imageUsage = new Map<string, number>();
  const postsByImage = new Map<string, BlogPost[]>();
  
  // Analyze current image usage
  for (const post of posts) {
    const baseImage = getBaseImage(post.featuredImage);
    if (baseImage) {
      const count = imageUsage.get(baseImage) || 0;
      imageUsage.set(baseImage, count + 1);
      
      if (!postsByImage.has(baseImage)) {
        postsByImage.set(baseImage, []);
      }
      postsByImage.get(baseImage)!.push(post);
    }
  }
  
  // Find duplicates
  const duplicates = Array.from(imageUsage.entries())
    .filter(([, count]) => count > 1)
    .sort((a, b) => b[1] - a[1]);
  
  console.log(`📊 Found ${duplicates.length} images used multiple times:`);
  duplicates.forEach(([img, count]) => {
    console.log(`   ${path.basename(img)}: used ${count} times`);
  });
  console.log('');
  
  // Get available stock images
  const stockImages = getStockImages();
  console.log(`📸 Available stock images: ${stockImages.length}\n`);
  
  if (stockImages.length === 0) {
    console.log('❌ No stock images found! Please add images to attached_assets/stock_images/');
    return;
  }
  
  let stockImageIndex = 0;
  let updatedCount = 0;
  
  // Fix duplicates - keep the first occurrence, replace others with unique stock images
  for (const [baseImage, usageCount] of duplicates) {
    const postsWithThisImage = postsByImage.get(baseImage)!;
    
    // Keep the first post with this image, update the rest
    for (let i = 1; i < postsWithThisImage.length; i++) {
      if (stockImageIndex < stockImages.length) {
        const oldImage = postsWithThisImage[i].featuredImage;
        postsWithThisImage[i].featuredImage = stockImages[stockImageIndex];
        
        console.log(`✅ "${postsWithThisImage[i].title.substring(0, 60)}..."`);
        console.log(`   Old: ${path.basename(oldImage)}`);
        console.log(`   New: ${path.basename(stockImages[stockImageIndex])}\n`);
        
        stockImageIndex++;
        updatedCount++;
      } else {
        console.log(`⚠️  Ran out of stock images! Need ${duplicates.reduce((sum, [, count]) => sum + count - 1, 0)} total, have ${stockImages.length}`);
        break;
      }
    }
    
    if (stockImageIndex >= stockImages.length) break;
  }
  
  // Save updated blog posts
  fs.writeFileSync(blogPostsPath, JSON.stringify(posts, null, 2));
  
  console.log(`\n✨ Complete!`);
  console.log(`   Updated: ${updatedCount} blog posts with unique images`);
  console.log(`   Stock images used: ${stockImageIndex} of ${stockImages.length}`);
  console.log(`\n💾 Saved to ${blogPostsPath}`);
  console.log(`\n⚠️  Note: Server restart required to see changes in the app!`);
}

fixDuplicateImages();
