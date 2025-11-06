import { z } from "zod";

const CLARITY_API_TOKEN = process.env.CLARITY_API_TOKEN;
const CLARITY_PROJECT_ID = "u21s08irgz";
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours (to respect 10 calls/day limit)

interface ClarityCache {
  data: any;
  timestamp: number;
}

let cache: ClarityCache | null = null;

/**
 * Fetch data from Microsoft Clarity API with intelligent caching
 * Rate limit: 10 calls per day, so we cache for 24 hours
 */
export async function fetchClarityData(endpoint: string): Promise<any> {
  if (!CLARITY_API_TOKEN) {
    throw new Error("CLARITY_API_TOKEN environment variable not set");
  }

  const cacheKey = `clarity_${endpoint}`;
  
  // Check if cached data is still valid
  if (cache && cache.timestamp && Date.now() - cache.timestamp < CACHE_DURATION_MS) {
    console.log(`[Clarity API] Using cached data (age: ${Math.round((Date.now() - cache.timestamp) / 1000 / 60)} minutes)`);
    return cache.data;
  }

  console.log(`[Clarity API] Fetching fresh data from endpoint: ${endpoint}`);
  
  try {
    const response = await fetch(
      `https://www.clarity.ms/api/v1/projects/${CLARITY_PROJECT_ID}/${endpoint}`,
      {
        headers: {
          'Authorization': `Bearer ${CLARITY_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Clarity API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    
    // Update cache
    cache = {
      data,
      timestamp: Date.now(),
    };

    console.log(`[Clarity API] Data fetched and cached successfully`);
    return data;
  } catch (error) {
    console.error('[Clarity API] Error fetching data:', error);
    throw error;
  }
}

/**
 * Get 404 errors and dead link data from Clarity
 */
export async function getClarityDeadLinks(): Promise<any> {
  try {
    // Note: Clarity's API structure may vary - this is a placeholder
    // You may need to adjust based on actual API response structure
    const data = await fetchClarityData('errors');
    return data;
  } catch (error) {
    console.error('[Clarity] Error fetching dead links:', error);
    return null;
  }
}

/**
 * Get page performance metrics from Clarity
 */
export async function getClarityPageMetrics(): Promise<any> {
  try {
    const data = await fetchClarityData('pages');
    return data;
  } catch (error) {
    console.error('[Clarity] Error fetching page metrics:', error);
    return null;
  }
}

/**
 * Force clear the cache (for testing or manual refresh)
 */
export function clearClarityCache(): void {
  cache = null;
  console.log('[Clarity API] Cache cleared');
}

/**
 * Get cache status
 */
export function getCacheStatus(): { cached: boolean; age?: number } {
  if (!cache || !cache.timestamp) {
    return { cached: false };
  }
  
  const ageMinutes = Math.round((Date.now() - cache.timestamp) / 1000 / 60);
  return {
    cached: true,
    age: ageMinutes,
  };
}
