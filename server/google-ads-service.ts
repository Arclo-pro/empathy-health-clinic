import { GoogleAdsApi, services } from 'google-ads-api';
import crypto from 'crypto';

interface GoogleAdsConfig {
  client_id: string;
  client_secret: string;
  developer_token: string;
}

interface GoogleAdsClient {
  customer_id: string;
  refresh_token: string;
}

interface StoredState {
  value: string;
  expiresAt: number;
}

const config: GoogleAdsConfig = {
  client_id: process.env.GOOGLE_ADS_CLIENT_ID || '',
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET || '',
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '',
};

const clientConfig: GoogleAdsClient = {
  // Remove dashes from customer ID if present (e.g., 123-456-7890 -> 1234567890)
  customer_id: (process.env.GOOGLE_ADS_CUSTOMER_ID || '').replace(/-/g, ''),
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN || '',
};

// In-memory store for OAuth state parameters (CSRF protection)
// States expire after 10 minutes
const stateStore = new Map<string, StoredState>();

// Clean up expired states every 5 minutes
setInterval(() => {
  const now = Date.now();
  Array.from(stateStore.entries()).forEach(([key, state]) => {
    if (state.expiresAt < now) {
      stateStore.delete(key);
    }
  });
}, 5 * 60 * 1000);

export function generateOAuthState(): string {
  const state = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + (10 * 60 * 1000); // 10 minutes
  stateStore.set(state, { value: state, expiresAt });
  return state;
}

export function validateOAuthState(state: string): boolean {
  const stored = stateStore.get(state);
  if (!stored) {
    return false;
  }
  
  // Check if expired
  if (stored.expiresAt < Date.now()) {
    stateStore.delete(state);
    return false;
  }
  
  // Valid - delete after use (single-use token)
  stateStore.delete(state);
  return true;
}

export function getOAuthUrl(redirectUri: string, state: string): string {
  const params = new URLSearchParams({
    client_id: config.client_id,
    redirect_uri: redirectUri,
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
    scope: 'https://www.googleapis.com/auth/adwords',
    state: state, // CSRF protection
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function exchangeCodeForToken(code: string, redirectUri: string): Promise<{
  access_token: string;
  refresh_token: string;
  expires_in: number;
}> {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id: config.client_id,
      client_secret: config.client_secret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to exchange code for token: ${error}`);
  }

  return response.json();
}

export function isConfigured(): boolean {
  return !!(
    config.client_id &&
    config.client_secret &&
    config.developer_token &&
    clientConfig.customer_id &&
    clientConfig.refresh_token
  );
}

export function hasBasicConfig(): boolean {
  return !!(
    config.client_id &&
    config.client_secret &&
    config.developer_token &&
    clientConfig.customer_id
  );
}

export async function getConversionData(startDate: string, endDate: string) {
  if (!isConfigured()) {
    throw new Error('Google Ads API not fully configured');
  }

  const client = new GoogleAdsApi({
    client_id: config.client_id,
    client_secret: config.client_secret,
    developer_token: config.developer_token,
  });

  const customer = client.Customer({
    customer_id: clientConfig.customer_id,
    refresh_token: clientConfig.refresh_token,
  });

  try {
    console.log(`📊 Google Ads: Fetching conversions from ${startDate} to ${endDate}`);
    
    // Query campaign performance with conversions
    // Use campaign resource to get conversion data aggregated by campaign
    const query = `
      SELECT
        segments.date,
        campaign.name,
        campaign.id,
        metrics.conversions,
        metrics.conversions_value,
        metrics.all_conversions,
        metrics.all_conversions_value,
        metrics.cost_micros
      FROM campaign
      WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
        AND campaign.status = 'ENABLED'
      ORDER BY segments.date DESC
    `;

    // Add 30 second timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Google Ads API request timed out after 30 seconds')), 30000);
    });

    const results = await Promise.race([
      customer.query(query),
      timeoutPromise
    ]) as any[];

    console.log(`✅ Google Ads: Received ${results.length} conversion records`);
    
    return results.map((row: any) => ({
      date: row.segments?.date,
      conversionAction: 'Campaign Conversions',
      conversions: row.metrics?.conversions || 0,
      conversionsValue: row.metrics?.conversions_value || 0,
      allConversions: row.metrics?.all_conversions || 0,
      allConversionsValue: row.metrics?.all_conversions_value || 0,
      campaign: row.campaign?.name,
      campaignId: row.campaign?.id,
      costMicros: row.metrics?.cost_micros || 0,
      cost: (row.metrics?.cost_micros || 0) / 1000000, // Convert micros to dollars
    }));
  } catch (error: any) {
    console.error('❌ Google Ads API Error:', {
      message: error.message,
      code: error.code,
      details: error.details,
      stack: error.stack?.substring(0, 500)
    });
    throw new Error(`Failed to fetch Google Ads data: ${error.message}`);
  }
}

export async function getCampaignPerformance(startDate: string, endDate: string) {
  if (!isConfigured()) {
    throw new Error('Google Ads API not fully configured');
  }

  const client = new GoogleAdsApi({
    client_id: config.client_id,
    client_secret: config.client_secret,
    developer_token: config.developer_token,
  });

  const customer = client.Customer({
    customer_id: clientConfig.customer_id,
    refresh_token: clientConfig.refresh_token,
  });

  try {
    const query = `
      SELECT
        campaign.name,
        campaign.id,
        campaign.status,
        metrics.impressions,
        metrics.clicks,
        metrics.conversions,
        metrics.conversions_value,
        metrics.cost_micros,
        metrics.ctr,
        metrics.average_cpc
      FROM campaign
      WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
        AND campaign.status = 'ENABLED'
      ORDER BY metrics.conversions DESC
    `;

    const results = await customer.query(query);
    
    return results.map((row: any) => ({
      campaignName: row.campaign?.name,
      campaignId: row.campaign?.id,
      status: row.campaign?.status,
      impressions: row.metrics?.impressions || 0,
      clicks: row.metrics?.clicks || 0,
      conversions: row.metrics?.conversions || 0,
      conversionsValue: row.metrics?.conversions_value || 0,
      cost: (row.metrics?.cost_micros || 0) / 1000000,
      ctr: row.metrics?.ctr || 0,
      averageCpc: (row.metrics?.average_cpc || 0) / 1000000,
      conversionRate: row.metrics?.clicks > 0 
        ? (row.metrics?.conversions || 0) / row.metrics.clicks * 100 
        : 0,
      costPerConversion: row.metrics?.conversions > 0
        ? (row.metrics?.cost_micros || 0) / 1000000 / row.metrics.conversions
        : 0,
    }));
  } catch (error: any) {
    console.error('Google Ads API Error:', error);
    throw new Error(`Failed to fetch campaign data: ${error.message}`);
  }
}

export async function testConnection(): Promise<{ success: boolean; message: string; accountName?: string }> {
  if (!isConfigured()) {
    return {
      success: false,
      message: 'Missing configuration. Please complete OAuth setup to get refresh token.',
    };
  }

  try {
    const client = new GoogleAdsApi({
      client_id: config.client_id,
      client_secret: config.client_secret,
      developer_token: config.developer_token,
    });

    const customer = client.Customer({
      customer_id: clientConfig.customer_id,
      refresh_token: clientConfig.refresh_token,
    });

    // Simple query to test connection
    const query = `
      SELECT
        customer.descriptive_name,
        customer.id
      FROM customer
      LIMIT 1
    `;

    const results = await customer.query(query);
    const account = results[0];

    return {
      success: true,
      message: 'Successfully connected to Google Ads',
      accountName: account?.customer?.descriptive_name || 'Unknown',
    };
  } catch (error: any) {
    console.error('Google Ads connection error:', error);
    const errorMessage = error?.message || error?.errors?.[0]?.message || JSON.stringify(error) || 'Unknown error';
    return {
      success: false,
      message: `Connection failed: ${errorMessage}`,
    };
  }
}
