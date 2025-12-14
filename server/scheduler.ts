import cron from 'node-cron';
import { exec } from 'child_process';
import { promisify } from 'util';
import { runSEOAudit } from './seo-audit-runner';

const execAsync = promisify(exec);

const NIGHTLY_PRIORITY_URLS = [
  '/',
  '/services',
  '/psychiatrist-orlando',
  '/psychiatry-clinic-orlando',
  '/anxiety-psychiatrist-orlando',
  '/telepsychiatry-orlando',
  '/psychiatrist-near-me',
  '/therapy-near-me',
  '/adhd-treatment',
  '/anxiety-therapy',
];

export function initializeScheduler() {
  console.log('Scheduler initialized');
  console.log('   SEO Pipeline: Daily at 2 AM ET');
  console.log('   Nightly Audit: Daily at 3 AM ET (10 priority URLs)');
  console.log('   Weekly Audit: Sundays at 4 AM ET (full site audit)');
  
  cron.schedule('0 7 * * *', async () => {
    const timestamp = new Date().toISOString();
    console.log(`\n[${timestamp}] Starting scheduled SEO pipeline...`);
    
    try {
      const { stdout, stderr } = await execAsync('python3 daily_seo_pipeline.py');
      
      if (stdout) {
        console.log('SEO Pipeline Output:');
        console.log(stdout);
      }
      
      if (stderr) {
        console.error('SEO Pipeline Warnings:');
        console.error(stderr);
      }
      
      console.log(`[${new Date().toISOString()}] SEO pipeline completed successfully`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] SEO pipeline failed:`, error);
    }
  }, {
    scheduled: true,
    timezone: "America/New_York"
  });

  cron.schedule('0 3 * * *', async () => {
    const timestamp = new Date().toISOString();
    console.log(`\n[${timestamp}] Starting nightly SEO audit (10 priority URLs)...`);
    
    try {
      const runId = await runSEOAudit({
        scheduleType: 'nightly',
        urlList: NIGHTLY_PRIORITY_URLS,
        includePageSpeed: true,
        includeGSC: true,
      });
      console.log(`[${new Date().toISOString()}] Nightly audit completed. Run ID: ${runId}`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Nightly audit failed:`, error);
    }
  }, {
    scheduled: true,
    timezone: "America/New_York"
  });

  cron.schedule('0 4 * * 0', async () => {
    const timestamp = new Date().toISOString();
    console.log(`\n[${timestamp}] Starting weekly full site SEO audit...`);
    
    try {
      const runId = await runSEOAudit({
        scheduleType: 'weekly',
        includePageSpeed: true,
        includeGSC: true,
      });
      console.log(`[${new Date().toISOString()}] Weekly audit completed. Run ID: ${runId}`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Weekly audit failed:`, error);
    }
  }, {
    scheduled: true,
    timezone: "America/New_York"
  });
  
  console.log('Scheduler is now running');
}
