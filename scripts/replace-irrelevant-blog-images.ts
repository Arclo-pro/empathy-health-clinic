import fs from 'fs';
import path from 'path';

interface BlogPost {
  title: string;
  featuredImage: string;
}

// Patterns that indicate irrelevant images
const IRRELEVANT_PATTERNS = [
  'logo', 'insurance', 'dental', 'screenshot', 'team.jpg',
  'arrow', 'clip-path', '432377474', '431608868', 'goodtherapy',
  'adventhealth', 'aetna', 'cigna', 'blue_cross', 'healthcare_insurance',
  'optum', 'oscar', 'humana', 'tricare', 'medicare'
];

function isIrrelevantImage(imagePath: string): boolean {
  const lowerPath = imagePath.toLowerCase();
  return IRRELEVANT_PATTERNS.some(pattern => lowerPath.includes(pattern));
}

// Get all available stock images
function getStockImages(): string[] {
  const stockDir = path.join('attached_assets', 'stock_images');
  const files = fs.readdirSync(stockDir);
  return files
    .filter(f => f.match(/\.(jpg|png|webp)$/i))
    .map(f => `/attached_assets/stock_images/${f}`);
}

function replaceIrrelevantImages() {
  console.log('🔍 Finding blog posts with irrelevant images...\n');
  
  const blogPostsPath = 'server/blog-posts-data.json';
  const posts: BlogPost[] = JSON.parse(fs.readFileSync(blogPostsPath, 'utf-8'));
  
  // Get all currently used images
  const usedImages = new Set(posts.map(p => p.featuredImage).filter(Boolean));
  
  // Get all available stock images  
  const allStockImages = getStockImages();
  
  // Filter out irrelevant stock images and already used images
  const goodStockImages = allStockImages
    .filter(img => !isIrrelevantImage(img))
    .filter(img => !usedImages.has(img));
  
  console.log(`📊 Total available stock images: ${allStockImages.length}`);
  console.log(`📊 Relevant unused stock images: ${goodStockImages.length}\n`);
  
  // Find posts with irrelevant images
  const irrelevantPosts = posts.filter(p => isIrrelevantImage(p.featuredImage));
  
  console.log(`Found ${irrelevantPosts.length} posts with irrelevant images:\n`);
  
  if (irrelevantPosts.length === 0) {
    console.log('✅ All posts have appropriate images!');
    return;
  }
  
  if (goodStockImages.length < irrelevantPosts.length) {
    console.log(`⚠️  Warning: Need ${irrelevantPosts.length} images but only have ${goodStockImages.length} available`);
  }
  
  let updated = 0;
  
  // Replace irrelevant images
  irrelevantPosts.forEach((post, index) => {
    if (index < goodStockImages.length) {
      const oldImage = post.featuredImage;
      post.featuredImage = goodStockImages[index];
      
      console.log(`✅ "${post.title.substring(0, 60)}..."`);
      console.log(`   Old: ${path.basename(oldImage)}`);
      console.log(`   New: ${path.basename(goodStockImages[index])}\n`);
      
      updated++;
    }
  });
  
  // Save updated blog posts
  fs.writeFileSync(blogPostsPath, JSON.stringify(posts, null, 2));
  
  console.log(`\n✨ Complete! Updated ${updated} blog posts`);
  console.log(`💾 Saved to ${blogPostsPath}`);
}

replaceIrrelevantImages();
