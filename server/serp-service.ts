import axios from 'axios';

interface OrganicResult {
  position: number;
  link: string;
  title: string;
  snippet?: string;
}

interface RankingResult {
  position: number | null;
  url: string | null;
  top10: OrganicResult[];
  competitor_positions?: { [domain: string]: number | null };
}

interface CachedRanking {
  data: RankingResult;
  timestamp: number;
}

const DOMAIN = 'empathyhealthclinic.com';
const CITY = 'Orlando, Florida, United States';
const COMPETITORS = [
  'mymindcarecenter.com',
  'orlandohealth.com',
];

// In-memory cache with 15-minute TTL
const serpCache = new Map<string, CachedRanking>();
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

function normalizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    // Remove www, convert to lowercase, normalize pathname
    const host = parsed.hostname.replace(/^www\./, '').toLowerCase();
    const path = parsed.pathname.replace(/\/$/, '') || '/';
    return `${host}${path}`;
  } catch {
    return url.toLowerCase();
  }
}

export function urlsMatch(url1: string, url2: string): boolean {
  return normalizeUrl(url1) === normalizeUrl(url2);
}

export async function getGoogleRanking(query: string, useCache = true): Promise<RankingResult> {
  try {
    // Check cache first
    if (useCache) {
      const cached = serpCache.get(query);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
        console.log(`✅ SERP Cache hit for "${query}"`);
        return cached.data;
      }
    }
    
    const apiKey = process.env.SERP_API_KEY;
    
    if (!apiKey) {
      throw new Error('SERP_API_KEY not found in environment');
    }
    
    console.log(`🔍 SerpAPI call for "${query}" (key prefix: ${apiKey.substring(0, 8)}...)`);
    
    // Using SerpAPI (serpapi.com) - GET request with query params
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        api_key: apiKey,
        engine: 'google',
        q: query,
        location: CITY,
        google_domain: 'google.com',
        gl: 'us',
        hl: 'en',
        num: 20,
      },
    });
    
    if (response.status !== 200) {
      throw new Error(`SerpAPI returned status ${response.status}`);
    }
    
    const data = response.data;
    const organic: OrganicResult[] = [];
    
    // SerpAPI returns organic_results (not organic)
    const organicResults = data.organic_results || [];
    for (let i = 0; i < organicResults.length; i++) {
      const result = organicResults[i];
      organic.push({
        position: result.position || (i + 1),
        link: result.link || '',
        title: result.title || '',
        snippet: result.snippet || '',
      });
    }
    
    let position: number | null = null;
    let url: string | null = null;
    
    for (const result of organic) {
      if (result.link.includes(DOMAIN)) {
        position = result.position;
        url = result.link;
        break;
      }
    }
    
    const competitor_positions: { [domain: string]: number | null } = {};
    for (const competitor of COMPETITORS) {
      const competitorResult = organic.find((r) => r.link.includes(competitor));
      competitor_positions[competitor] = competitorResult ? competitorResult.position : null;
    }
    
    const result: RankingResult = {
      position,
      url,
      top10: organic.slice(0, 10),
      competitor_positions,
    };
    
    // Cache the result
    serpCache.set(query, { data: result, timestamp: Date.now() });
    
    return result;
  } catch (error: any) {
    const status = error.response?.status;
    const responseData = error.response?.data;
    console.error(`❌ SERP API Error (status ${status}):`, responseData || error.message);
    
    if (status === 403) {
      throw new Error(`SERP API 403 Forbidden - Check API key is valid and has credits. Response: ${JSON.stringify(responseData)}`);
    } else if (status === 429) {
      throw new Error(`SERP API rate limited (429). Wait and try again.`);
    }
    throw new Error(`Failed to fetch ranking: status code ${status || 'unknown'} - ${error.message}`);
  }
}

export async function checkOrlandoKeywordRankings() {
  const targetKeywords = [
    // Core service keywords (high priority)
    'psychiatrist orlando',
    'psychiatry orlando',
    'child psychiatrist orlando',
    'adhd psychiatrist orlando',
    'anxiety psychiatrist orlando',
    'bipolar psychiatrist orlando',
    
    // Service modifiers
    'medication management orlando',
    'telepsychiatry orlando',
    'same day psychiatrist orlando',
    
    // Insurance-specific (currently ranking)
    'psychiatrist orlando accepts cigna',
    'psychiatrist orlando accepts bcbs',
    'psychiatrist orlando accepts umr',
  ];
  
  const results = [];
  
  for (const keyword of targetKeywords) {
    try {
      const ranking = await getGoogleRanking(keyword);
      results.push({
        keyword,
        position: ranking.position,
        url: ranking.url,
        competitors: ranking.competitor_positions,
        top3: ranking.top10.slice(0, 3).map((r) => ({
          position: r.position,
          domain: new URL(r.link).hostname,
          title: r.title,
        })),
      });
      
      // Rate limiting: wait 1 second between requests
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error: any) {
      console.error(`Failed to check ranking for "${keyword}":`, error.message);
      results.push({
        keyword,
        error: error.message,
      });
    }
  }
  
  return {
    success: true,
    timestamp: new Date().toISOString(),
    results,
  };
}
