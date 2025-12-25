import { google } from 'googleapis';

interface GSCRow {
  query: string;
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface SEOTask {
  type: 'create-landing' | 'improve-landing' | 'supporting-blog';
  target_query: string;
  suggested_url?: string;
  rationale: string;
  current_position?: number;
  current_ctr?: number;
  impressions?: number;
  serp_position?: number | null;
  serp_url?: string | null;
  rank_on_wrong_url?: boolean;
}

const ORLANDO_TARGETS = [
  "psychiatrist orlando",
  "psychiatry orlando",
  "child psychiatrist orlando",
  "adhd psychiatrist orlando",
  "anxiety psychiatrist orlando",
  "medication management orlando",
  "telepsychiatry orlando",
  "same day psychiatrist orlando",
  "psychiatrist orlando accepts cigna",
  "psychiatrist orlando accepts bcbs",
  "psychiatrist orlando accepts umr",
  "adhd evaluation near me",
  "adhd evaluation orlando",
  "psychiatrist near me",
  "therapy orlando",
];

export async function fetchGSCData(startDays = 28, endDays = 0): Promise<GSCRow[]> {
  try {
    const serviceAccountJson = process.env.GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT_JSON;
    
    if (!serviceAccountJson) {
      throw new Error('GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT_JSON not found');
    }
    
    const credentials = JSON.parse(serviceAccountJson);
    
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });
    
    const authClient = await auth.getClient();
    const searchconsole = google.searchconsole({
      version: 'v1',
      auth: authClient as any,
    });
    
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - endDays);
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - startDays);
    
    const siteUrl = 'sc-domain:empathyhealthclinic.com';
    const response = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        dimensions: ['query', 'page'],
        rowLimit: 25000,
        dimensionFilterGroups: [
          {
            filters: [
              {
                dimension: 'country',
                operator: 'equals',
                expression: 'usa',
              },
            ],
          },
        ],
      },
    });
    
    const rows: GSCRow[] = [];
    if (response.data.rows) {
      for (const row of response.data.rows) {
        const [query, page] = row.keys || [];
        rows.push({
          query: query || '',
          page: page || '',
          clicks: row.clicks || 0,
          impressions: row.impressions || 0,
          ctr: row.ctr || 0,
          position: row.position || 0,
        });
      }
    }
    
    return rows;
  } catch (error: any) {
    console.error('GSC Data Fetch Error:', error);
    throw new Error(`Failed to fetch GSC data: ${error.message}`);
  }
}

export function generateSEOTasks(gscData: GSCRow[]): SEOTask[] {
  const tasks: SEOTask[] = [];
  
  for (const targetQuery of ORLANDO_TARGETS) {
    const queryRows = gscData.filter((row) =>
      row.query.toLowerCase().includes(targetQuery.toLowerCase())
    );
    
    if (queryRows.length === 0) {
      tasks.push({
        type: 'create-landing',
        target_query: targetQuery,
        rationale: 'No visibility in GSC; create dedicated Orlando landing page',
      });
      continue;
    }
    
    const pageAggregates = new Map<string, {
      impressions: number;
      clicks: number;
      position: number[];
      ctr: number[];
    }>();
    
    for (const row of queryRows) {
      if (!pageAggregates.has(row.page)) {
        pageAggregates.set(row.page, {
          impressions: 0,
          clicks: 0,
          position: [],
          ctr: [],
        });
      }
      
      const agg = pageAggregates.get(row.page)!;
      agg.impressions += row.impressions;
      agg.clicks += row.clicks;
      agg.position.push(row.position);
      agg.ctr.push(row.ctr);
    }
    
    const topPages = Array.from(pageAggregates.entries())
      .map(([page, agg]) => ({
        page,
        impressions: agg.impressions,
        clicks: agg.clicks,
        position: agg.position.reduce((a, b) => a + b, 0) / agg.position.length,
        ctr: agg.ctr.reduce((a, b) => a + b, 0) / agg.ctr.length,
      }))
      .sort((a, b) => b.impressions - a.impressions);
    
    const topPage = topPages[0];
    
    if (topPage.position <= 10 && topPage.ctr < 0.04) {
      tasks.push({
        type: 'improve-landing',
        target_query: targetQuery,
        suggested_url: topPage.page,
        current_position: Math.round(topPage.position * 10) / 10,
        current_ctr: Math.round(topPage.ctr * 1000) / 10,
        impressions: topPage.impressions,
        rationale: `Position ${Math.round(topPage.position)} but CTR ${(topPage.ctr * 100).toFixed(1)}% <4% → rewrite title/H1/meta, add local proof & sticky CTA`,
      });
    } else if (topPage.position > 20) {
      tasks.push({
        type: 'create-landing',
        target_query: targetQuery,
        current_position: Math.round(topPage.position * 10) / 10,
        impressions: topPage.impressions,
        rationale: `Position ${Math.round(topPage.position)} >20 → need focused Orlando landing page`,
      });
    } else {
      tasks.push({
        type: 'supporting-blog',
        target_query: targetQuery,
        suggested_url: topPage.page,
        current_position: Math.round(topPage.position * 10) / 10,
        current_ctr: Math.round(topPage.ctr * 1000) / 10,
        impressions: topPage.impressions,
        rationale: `Position ${Math.round(topPage.position)} (11-20) → publish FAQ/blog + internal links to push into top 10`,
      });
    }
  }
  
  return tasks.sort((a, b) => {
    const order = { 'improve-landing': 1, 'supporting-blog': 2, 'create-landing': 3 };
    return (order[a.type] || 4) - (order[b.type] || 4);
  });
}

export async function runOrlandoSEOAnalysis(enrichWithSERP = false) {
  try {
    const gscData = await fetchGSCData(28, 0);
    const tasks = generateSEOTasks(gscData);
    
    let enrichedTasks = tasks;
    
    if (enrichWithSERP) {
      enrichedTasks = await enrichTasksWithSERPPositions(tasks);
    }
    
    return {
      success: true,
      data: {
        totalQueries: gscData.length,
        analyzedTargets: ORLANDO_TARGETS.length,
        tasks: enrichedTasks,
        dataRange: {
          start: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          end: new Date().toISOString().split('T')[0],
        },
      },
    };
  } catch (error: any) {
    console.error('Orlando SEO Analysis Error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

async function enrichTasksWithSERPPositions(tasks: SEOTask[]): Promise<SEOTask[]> {
  const { getGoogleRanking, urlsMatch } = await import('./serp-service');
  const enrichedTasks: SEOTask[] = [];
  
  for (const task of tasks) {
    try {
      const ranking = await getGoogleRanking(task.target_query);
      
      const enrichedTask: SEOTask = {
        ...task,
        serp_position: ranking.position,
        serp_url: ranking.url,
        rank_on_wrong_url: false,
      };
      
      // Check if ranking on wrong URL using normalized URL comparison
      if (ranking.position && task.suggested_url && ranking.url) {
        enrichedTask.rank_on_wrong_url = !urlsMatch(ranking.url, task.suggested_url);
      }
      
      // Refine action based on SERP position
      if (ranking.position !== null) {
        if (ranking.position <= 3) {
          // Already in top 3 - maintain position with supporting content
          enrichedTask.type = 'supporting-blog';
          enrichedTask.rationale = `Position ${ranking.position} (Top 3) - defend with supporting content and internal links`;
        } else if (ranking.position <= 10) {
          // Page 1 but not top 3 - optimize to climb higher
          enrichedTask.type = 'improve-landing';
          enrichedTask.rationale = `Position ${ranking.position} (Page 1) - optimize title/meta/content to push into Top 3`;
        } else {
          // Page 2+ - needs major work or new landing page
          if (enrichedTask.rank_on_wrong_url) {
            enrichedTask.type = 'create-landing';
            enrichedTask.rationale = `Position ${ranking.position} on wrong URL - create focused landing page for target query`;
          } else {
            enrichedTask.type = 'improve-landing';
            enrichedTask.rationale = `Position ${ranking.position} (Page 2+) - significantly improve content and on-page SEO`;
          }
        }
      }
      
      enrichedTasks.push(enrichedTask);
      
      // Rate limiting: wait 1.2 seconds between requests
      await new Promise((resolve) => setTimeout(resolve, 1200));
    } catch (error: any) {
      console.error(`Failed to enrich task for "${task.target_query}":`, error.message);
      enrichedTasks.push(task);
    }
  }
  
  return enrichedTasks;
}

// URL Inspection API Types
export interface UrlInspectionResult {
  url: string;
  inspectionResult: {
    indexStatusResult?: {
      verdict: 'VERDICT_UNSPECIFIED' | 'PASS' | 'PARTIAL' | 'FAIL' | 'NEUTRAL';
      coverageState: string;
      robotsTxtState: string;
      indexingState: string;
      lastCrawlTime?: string;
      pageFetchState: string;
      googleCanonical?: string;
      userCanonical?: string;
      referringUrls?: string[];
      crawledAs?: string;
    };
    mobileUsabilityResult?: {
      verdict: 'VERDICT_UNSPECIFIED' | 'PASS' | 'PARTIAL' | 'FAIL' | 'NEUTRAL';
      issues?: Array<{
        issueType: string;
        severity: string;
        message: string;
      }>;
    };
    richResultsResult?: {
      verdict: 'VERDICT_UNSPECIFIED' | 'PASS' | 'PARTIAL' | 'FAIL' | 'NEUTRAL';
      detectedItems?: Array<{
        richResultType: string;
        items: Array<{ name: string }>;
      }>;
    };
  };
  error?: string;
}

export async function inspectUrl(pageUrl: string): Promise<UrlInspectionResult> {
  const siteUrl = 'https://www.empathyhealthclinic.com';
  
  try {
    const serviceAccountJson = process.env.GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT_JSON;
    
    if (!serviceAccountJson) {
      throw new Error('GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT_JSON not found');
    }
    
    const credentials = JSON.parse(serviceAccountJson);
    
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });
    
    const authClient = await auth.getClient();
    const searchconsole = google.searchconsole({
      version: 'v1',
      auth: authClient as any,
    });
    
    const response = await searchconsole.urlInspection.index.inspect({
      requestBody: {
        inspectionUrl: pageUrl,
        siteUrl: siteUrl,
      },
    });
    
    return {
      url: pageUrl,
      inspectionResult: response.data.inspectionResult || {},
    };
  } catch (error: any) {
    console.error(`URL Inspection failed for ${pageUrl}:`, error.message);
    return {
      url: pageUrl,
      inspectionResult: {},
      error: error.message,
    };
  }
}

export async function batchInspectUrls(urls: string[], delayMs = 1000): Promise<UrlInspectionResult[]> {
  const results: UrlInspectionResult[] = [];
  
  for (let i = 0; i < urls.length; i++) {
    const result = await inspectUrl(urls[i]);
    results.push(result);
    
    // Rate limiting between requests
    if (i < urls.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  
  return results;
}

export function classifyIndexStatus(result: UrlInspectionResult): {
  status: 'indexed' | 'not-indexed' | 'error' | 'unknown';
  reason: string;
} {
  if (result.error) {
    return { status: 'error', reason: result.error };
  }
  
  const indexResult = result.inspectionResult?.indexStatusResult;
  if (!indexResult) {
    return { status: 'unknown', reason: 'No index status data' };
  }
  
  if (indexResult.verdict === 'PASS') {
    return { status: 'indexed', reason: indexResult.coverageState || 'Indexed' };
  }
  
  if (indexResult.verdict === 'FAIL') {
    return { 
      status: 'not-indexed', 
      reason: indexResult.coverageState || indexResult.indexingState || 'Not indexed' 
    };
  }
  
  return { 
    status: 'unknown', 
    reason: `Verdict: ${indexResult.verdict}, State: ${indexResult.coverageState}` 
  };
}
