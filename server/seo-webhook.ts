/**
 * SEO Task Implementation Webhook Endpoint
 * 
 * INSTALLATION INSTRUCTIONS FOR MAIN WEBSITE:
 * 1. Copy this file to: server/api/seo/implement.ts (or appropriate location)
 * 2. Add SEO_WEBHOOK_SECRET to your Replit Secrets
 * 3. Ensure TypeScript implementation scripts exist in scripts/ directory
 * 4. Deploy the endpoint
 * 
 * This endpoint receives prioritized SEO tasks from the scheduler and
 * automatically implements them using your existing TypeScript scripts.
 */

import { Request, Response } from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface SEOTask {
  target_query: string;
  action: string;
  priority_score: number;
  serp_position?: string;
  suggested_url?: string;
  tech_issues?: string;
}

interface WebhookPayload {
  tasks: SEOTask[];
  timestamp: string;
  source: string;
}

function authenticateWebhook(req: Request, res: Response, next: Function) {
  const authHeader = req.headers['authorization'];
  const secret = process.env.SEO_WEBHOOK_SECRET;
  
  if (!secret) {
    console.error('SEO_WEBHOOK_SECRET not configured');
    return res.status(500).json({ error: 'Webhook not configured' });
  }
  
  if (!authHeader || authHeader !== `Bearer ${secret}`) {
    console.warn('Unauthorized webhook attempt');
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  next();
}

export async function handleSEOImplementation(req: Request, res: Response) {
  try {
    const payload: WebhookPayload = req.body;
    
    if (!payload.tasks || !Array.isArray(payload.tasks)) {
      return res.status(400).json({ error: 'Invalid payload: tasks array required' });
    }
    
    console.log(`📥 Received ${payload.tasks.length} SEO tasks from ${payload.source}`);
    
    const results = {
      implemented: [] as any[],
      failed: [] as any[],
      skipped: [] as any[]
    };
    
    for (const task of payload.tasks) {
      try {
        const result = await implementTask(task);
        
        if (result.success) {
          results.implemented.push({
            task: task.target_query,
            action: task.action,
            output: result.output
          });
        } else if (result.skipped) {
          results.skipped.push({
            task: task.target_query,
            reason: result.reason
          });
        } else {
          results.failed.push({
            task: task.target_query,
            error: result.error
          });
        }
      } catch (error) {
        results.failed.push({
          task: task.target_query,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
    
    if (results.implemented.length > 0) {
      try {
        await execAsync('git add .');
        const commitMsg = `[AUTO-SEO] Implemented ${results.implemented.length} tasks via webhook`;
        await execAsync(`git commit -m "${commitMsg}"`);
        console.log(`✅ Committed ${results.implemented.length} implementations`);
      } catch (error) {
        console.warn('Git commit failed (may be no changes):', error);
      }
    }
    
    return res.status(200).json({
      success: true,
      summary: {
        total: payload.tasks.length,
        implemented: results.implemented.length,
        failed: results.failed.length,
        skipped: results.skipped.length
      },
      details: results,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

async function implementTask(task: SEOTask): Promise<{
  success: boolean;
  skipped?: boolean;
  reason?: string;
  output?: string;
  error?: string;
}> {
  const { action, target_query, suggested_url, serp_position } = task;
  
  console.log(`🔧 Processing: ${action} - ${target_query}`);
  
  try {
    switch (action) {
      case 'create-landing':
        return await createLandingPage(target_query, suggested_url || '');
      
      case 'improve-landing':
        return await improveLandingPage(target_query, suggested_url || '', serp_position);
      
      case 'supporting-blog':
        return {
          success: false,
          skipped: true,
          reason: 'Supporting blog creation not yet implemented'
        };
      
      case 'fix-tech-issue':
        return await fixTechnicalIssue(task);
      
      default:
        return {
          success: false,
          skipped: true,
          reason: `Unknown action type: ${action}`
        };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

async function createLandingPage(query: string, url: string) {
  const queryLower = query.toLowerCase();
  
  if (queryLower.includes('cigna') || queryLower.includes('bcbs') || 
      queryLower.includes('umr') || queryLower.includes('aetna')) {
    return await createInsuranceLanding(query, url);
  } else if (queryLower.includes('orlando')) {
    return await createOrlandoServiceLanding(query, url);
  }
  
  return {
    success: false,
    skipped: true,
    reason: 'Unknown page type'
  };
}

async function createInsuranceLanding(query: string, url: string) {
  const queryLower = query.toLowerCase();
  let provider = '';
  let slug = '';
  
  if (queryLower.includes('cigna')) {
    provider = 'Cigna';
    slug = 'psychiatrist-orlando-takes-cigna';
  } else if (queryLower.includes('bcbs') || queryLower.includes('blue cross')) {
    provider = 'Blue Cross Blue Shield (BCBS)';
    slug = 'psychiatrist-orlando-takes-bcbs';
  } else if (queryLower.includes('umr')) {
    provider = 'UMR';
    slug = 'psychiatrist-orlando-takes-umr';
  } else if (queryLower.includes('aetna')) {
    provider = 'Aetna';
    slug = 'psychiatrist-orlando-takes-aetna';
  }
  
  if (!provider) {
    return { success: false, skipped: true, reason: 'Unknown insurance provider' };
  }
  
  try {
    const cmd = `npx tsx scripts/create-insurance-landing.ts --provider "${provider}" --slug "${slug}"`;
    const { stdout, stderr } = await execAsync(cmd, { timeout: 60000 });
    
    return {
      success: true,
      output: stdout || `Created ${slug} landing page`
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Script execution failed'
    };
  }
}

async function createOrlandoServiceLanding(query: string, url: string) {
  return {
    success: false,
    skipped: true,
    reason: 'Orlando service pages require manual creation'
  };
}

async function improveLandingPage(query: string, url: string, position?: string) {
  const urlPath = new URL(url).pathname.replace(/\/$/, '');
  
  try {
    const cmd = `npx tsx scripts/optimize-landing.ts --url "${urlPath}" --query "${query}" --position "${position || 'unknown'}"`;
    const { stdout, stderr } = await execAsync(cmd, { timeout: 60000 });
    
    return {
      success: true,
      output: stdout || `Optimized ${urlPath}`
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Optimization failed'
    };
  }
}

async function fixTechnicalIssue(task: SEOTask) {
  return {
    success: false,
    skipped: true,
    reason: 'Technical issue fixes not yet implemented via webhook'
  };
}

export function setupSEOWebhook(app: any) {
  app.post('/api/seo/implement', (req: Request, res: Response) => {
    authenticateWebhook(req, res, () => handleSEOImplementation(req, res));
  });
}
