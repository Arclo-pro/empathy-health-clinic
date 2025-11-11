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
  'healingpsychiatryflorida.com',
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
    
    console.log(`🔍 SERP API call for "${query}"`);
    const response = await axios.post(
      'https://google.serper.dev/search',
      {
        q: query,
        gl: 'us',
        hl: 'en',
        location: CITY,
        num: 20,
      },
      {
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (response.status !== 200) {
      throw new Error(`Serper API returned status ${response.status}`);
    }
    
    const data = response.data;
    const organic: OrganicResult[] = [];
    
    for (let i = 0; i < (data.organic || []).length; i++) {
      const result = data.organic[i];
      organic.push({
        position: i + 1,
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
    console.error('SERP API Error:', error.response?.data || error.message);
    throw new Error(`Failed to fetch ranking: ${error.message}`);
  }
}

export async function checkOrlandoKeywordRankings() {
  const targetKeywords = [
    'psychiatry orlando fl',
    'psychiatrist orlando',
    'adhd evaluation near me',
    'anxiety psychiatrist orlando',
    'child psychiatrist orlando',
    'telepsychiatry orlando',
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
