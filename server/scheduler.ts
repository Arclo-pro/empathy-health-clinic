import cron from 'node-cron';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export function initializeScheduler() {
  // Run SEO pipeline daily at 2 AM EST (7 AM UTC)
  // Cron format: minute hour day month weekday
  const cronSchedule = '0 7 * * *'; // 7 AM UTC = 2 AM EST
  
  console.log('📅 SEO Automation Scheduler initialized');
  console.log('   Schedule: Every day at 2 AM EST (7 AM UTC)');
  console.log('   Next run will execute: python3 daily_seo_pipeline.py');
  
  cron.schedule(cronSchedule, async () => {
    const timestamp = new Date().toISOString();
    console.log(`\n🚀 [${timestamp}] Starting scheduled SEO pipeline...`);
    
    try {
      const { stdout, stderr } = await execAsync('python3 daily_seo_pipeline.py');
      
      if (stdout) {
        console.log('✅ SEO Pipeline Output:');
        console.log(stdout);
      }
      
      if (stderr) {
        console.error('⚠️ SEO Pipeline Warnings:');
        console.error(stderr);
      }
      
      console.log(`✅ [${new Date().toISOString()}] SEO pipeline completed successfully`);
    } catch (error) {
      console.error(`❌ [${new Date().toISOString()}] SEO pipeline failed:`, error);
    }
  }, {
    scheduled: true,
    timezone: "America/New_York"
  });
  
  console.log('✅ Scheduler is now running');
}
