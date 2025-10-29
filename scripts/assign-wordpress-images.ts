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

// Map month numbers to batch directory names
const monthToBatch: Record<string, string> = {
  '2025-01': 'blog_images_batch_01',
  '2025-02': 'blog_images_batch_02',
  '2025-03': 'blog_images_batch_03',
  '2025-04': 'blog_images_batch_04',
  '2025-05': 'blog_images_batch_05',
  '2025-06': 'blog_images_batch_06',
  '2025-07': 'blog_images_batch_07',
  '2025-08': 'blog_images_batch_08',
  '2025-09': 'blog_images_batch_09',
  '2025-10': 'blog_images_batch_10',
  '2024-03': 'blog_images_batch_2024_03',
  '2024-04': 'blog_images_batch_2024_04',
  '2024-05': 'blog_images_batch_2024_05',
  '2024-06': 'blog_images_batch_2024_06',
  '2024-07': 'blog_images_batch_2024_07',
  '2024-08': 'blog_images_batch_2024_08',
  '2024-09': 'blog_images_batch_2024_09',
  '2024-10': 'blog_images_batch_2024_10',
  '2024-11': 'blog_images_batch_2024_11',
  '2024-12': 'blog_images_batch_2024_12',
};

function isValidBlogImage(filename: string): boolean {
  const lowerName = filename.toLowerCase();
  
  // Exclude insurance company logos
  const excludePatterns = [
    'adventhealth',
    'aetna',
    'cigna',
    'blue-cross',
    'medicare',
    'tricare',
    'umr',
    'first-health',
    'curative',
    'logo.svg',
    'logo-',
    '-logo',
    'screenshot',
    'team.jpg',
    'google-logo',
    'clip-path-group', // UI elements
    'arrow.', // UI elements
    '432377474_', // Social media images
  ];
  
  // Check if filename contains any exclude patterns
  for (const pattern of excludePatterns) {
    if (lowerName.includes(pattern)) {
      return false;
    }
  }
  
  // Prefer actual blog content images
  const preferredPatterns = [
    'pexels-',
    'blog-image-',
    'qtq80-',
    'therapy',
    'counseling',
    'mental',
    'health',
    'wellness',
    'meditation',
    'self-care',
    'yoga',
    'journal',
    'updated-image-',
    'generated-image-',
    'seo-',
  ];
  
  // If it contains a preferred pattern, it's definitely good
  for (const pattern of preferredPatterns) {
    if (lowerName.includes(pattern)) {
      return true;
    }
  }
  
  // For other images, exclude very small thumbnails (likely icons)
  if (lowerName.includes('-150x150') || lowerName.includes('-50x') || lowerName.includes('-52.')) {
    return false;
  }
  
  return true; // Allow other images by default
}

function getImagesFromBatch(batchName: string): string[] {
  const batchPath = path.join('attached_assets', batchName);
  
  if (!fs.existsSync(batchPath)) {
    return [];
  }

  const images: string[] = [];
  
  // Recursively find all images in the batch directory
  function findImages(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory() && entry.name !== '__MACOSX') {
        findImages(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (['.jpg', '.jpeg', '.png'].includes(ext) && isValidBlogImage(entry.name)) {
          // Make path relative to project root with forward slashes
          const relativePath = '/' + fullPath.split(path.sep).join('/');
          images.push(relativePath);
        }
      }
    }
  }
  
  findImages(batchPath);
  return images;
}

function assignWordPressImages() {
  console.log('📸 Starting WordPress image assignment...\n');
  
  // Load blog posts
  const blogPostsPath = 'server/blog-posts-data.json';
  const posts: BlogPost[] = JSON.parse(fs.readFileSync(blogPostsPath, 'utf-8'));
  
  console.log(`Found ${posts.length} blog posts\n`);
  
  // Create a mapping of month -> images
  const imagesByMonth: Record<string, string[]> = {};
  
  for (const [month, batchName] of Object.entries(monthToBatch)) {
    const images = getImagesFromBatch(batchName);
    if (images.length > 0) {
      imagesByMonth[month] = images;
      console.log(`${month}: ${images.length} images from ${batchName}`);
    }
  }
  
  console.log(`\n📊 Total months with images: ${Object.keys(imagesByMonth).length}\n`);
  
  // Track image usage to ensure we don't reuse images too frequently
  const imageUsageCount: Record<string, number> = {};
  
  let updated = 0;
  let skipped = 0;
  
  // Update blog posts with WordPress images
  for (const post of posts) {
    const publishMonth = post.publishedDate.substring(0, 7); // Get YYYY-MM
    
    if (imagesByMonth[publishMonth] && imagesByMonth[publishMonth].length > 0) {
      const availableImages = imagesByMonth[publishMonth];
      
      // Find the least-used image from this month
      let selectedImage = availableImages[0];
      let minUsage = imageUsageCount[selectedImage] || 0;
      
      for (const img of availableImages) {
        const usage = imageUsageCount[img] || 0;
        if (usage < minUsage) {
          selectedImage = img;
          minUsage = usage;
        }
      }
      
      // Update the post
      post.featuredImage = selectedImage;
      imageUsageCount[selectedImage] = (imageUsageCount[selectedImage] || 0) + 1;
      updated++;
      
      console.log(`✅ ${post.title.substring(0, 50)}... → ${path.basename(selectedImage)}`);
    } else {
      skipped++;
      console.log(`⏭️  ${post.title.substring(0, 50)}... (no images for ${publishMonth})`);
    }
  }
  
  // Save updated blog posts
  fs.writeFileSync(blogPostsPath, JSON.stringify(posts, null, 2));
  
  console.log(`\n✨ Complete!`);
  console.log(`   Updated: ${updated} posts`);
  console.log(`   Skipped: ${skipped} posts (no matching images)`);
  console.log(`\n💾 Saved to ${blogPostsPath}`);
}

assignWordPressImages();
