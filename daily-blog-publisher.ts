import cron from 'node-cron';
import axios from 'axios';

// Require dedicated BLOG_PUBLISHER_SECRET (no fallback)
const API_KEY = process.env.BLOG_PUBLISHER_SECRET;

if (!API_KEY) {
  console.error('❌ BLOG_PUBLISHER_SECRET environment variable not set');
  console.error('Please set BLOG_PUBLISHER_SECRET in Replit Secrets');
  process.exit(1);
}

const API_ENDPOINT = process.env.REPL_SLUG 
  ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co/api/admin/publish-scheduled`
  : 'http://localhost:5000/api/admin/publish-scheduled';

async function publishNextScheduledPost() {
  try {
    console.log(`🔍 [${new Date().toISOString()}] Checking for scheduled blog posts...`);
    
    const response = await axios.post(API_ENDPOINT, {}, {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });

    if (response.data.success) {
      if (response.data.post) {
        console.log(`✅ Published: "${response.data.post.title}" (${response.data.post.slug})`);
      } else {
        console.log(`ℹ️ ${response.data.message}`);
      }
    }
  } catch (error: any) {
    if (error.response) {
      console.error(`❌ Publishing failed: ${error.response.status} - ${error.response.data?.message || error.message}`);
    } else {
      console.error(`❌ Publishing error: ${error.message}`);
    }
  }
}

// Run every day at 9:00 AM EST
// Cron format: minute hour day month weekday
// 0 9 * * * = At 09:00 every day
cron.schedule('0 9 * * *', publishNextScheduledPost, {
  timezone: "America/New_York"
});

console.log('📅 Daily blog publisher started');
console.log('⏰ Scheduled to run at 9:00 AM EST every day');
console.log(`🔗 Endpoint: ${API_ENDPOINT}`);

// Run once immediately on startup for testing
publishNextScheduledPost();
