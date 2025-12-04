export interface UTMParams {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;  // Google Ads Click ID
  fbclid?: string; // Facebook Click ID
}

export interface UTMData extends UTMParams {
  landingPage?: string;
}

const UTM_STORAGE_KEY = 'utm_params';
const UTM_EXPIRY_KEY = 'utm_expiry';
const UTM_LANDING_PAGE_KEY = 'utm_landing_page';
const UTM_EXPIRY_DAYS = 30; // Keep UTM data for 30 days

// Session-level storage for GCLID (persists during SPA navigation)
const GCLID_SESSION_KEY = 'gclid_session';
const FBCLID_SESSION_KEY = 'fbclid_session';

/**
 * Extract UTM parameters and click IDs from URL
 */
export const extractUTMParams = (url?: string): UTMParams => {
  const searchParams = url 
    ? new URL(url).searchParams 
    : new URLSearchParams(window.location.search);
  
  return {
    utmSource: searchParams.get('utm_source') || undefined,
    utmMedium: searchParams.get('utm_medium') || undefined,
    utmCampaign: searchParams.get('utm_campaign') || undefined,
    utmTerm: searchParams.get('utm_term') || undefined,
    utmContent: searchParams.get('utm_content') || undefined,
    gclid: searchParams.get('gclid') || undefined,  // Google Ads Click ID
    fbclid: searchParams.get('fbclid') || undefined, // Facebook Click ID
  };
};

/**
 * Check if UTM parameters or click IDs exist in URL
 */
export const hasUTMParams = (params: UTMParams): boolean => {
  return !!(params.utmSource || params.utmMedium || params.utmCampaign || params.utmTerm || params.utmContent || params.gclid || params.fbclid);
};

/**
 * Save click IDs (GCLID/FBCLID) to sessionStorage for current session
 * This ensures they persist across SPA navigation even if URL is stripped
 */
export const saveClickIdsToSession = (params: UTMParams): void => {
  if (typeof window === 'undefined') return;
  
  try {
    if (params.gclid) {
      sessionStorage.setItem(GCLID_SESSION_KEY, params.gclid);
      console.log('🎯 UTM Tracking: GCLID saved to session storage:', params.gclid.substring(0, 10) + '...');
    }
    if (params.fbclid) {
      sessionStorage.setItem(FBCLID_SESSION_KEY, params.fbclid);
      console.log('🎯 UTM Tracking: FBCLID saved to session storage');
    }
  } catch (e) {
    // sessionStorage might be unavailable in some contexts
    console.warn('⚠️ UTM Tracking: Could not save to sessionStorage');
  }
};

/**
 * Get click IDs from sessionStorage
 */
export const getSessionClickIds = (): { gclid?: string; fbclid?: string } => {
  if (typeof window === 'undefined') return {};
  
  try {
    return {
      gclid: sessionStorage.getItem(GCLID_SESSION_KEY) || undefined,
      fbclid: sessionStorage.getItem(FBCLID_SESSION_KEY) || undefined
    };
  } catch (e) {
    return {};
  }
};

/**
 * Save UTM parameters to localStorage with expiry
 */
export const saveUTMParams = (params: UTMParams, landingPage: string): void => {
  if (typeof window === 'undefined') return;
  
  // Only save if there are actual UTM parameters
  if (!hasUTMParams(params)) return;
  
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + UTM_EXPIRY_DAYS);
  
  localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(params));
  localStorage.setItem(UTM_EXPIRY_KEY, expiryDate.toISOString());
  localStorage.setItem(UTM_LANDING_PAGE_KEY, landingPage);
};

/**
 * Get saved UTM parameters from localStorage (first-touch attribution)
 */
export const getSavedUTMParams = (): UTMData | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(UTM_STORAGE_KEY);
    const expiry = localStorage.getItem(UTM_EXPIRY_KEY);
    const landingPage = localStorage.getItem(UTM_LANDING_PAGE_KEY);
    
    if (!stored || !expiry) return null;
    
    // Check if expired
    const expiryDate = new Date(expiry);
    if (new Date() > expiryDate) {
      // Expired, clear storage
      localStorage.removeItem(UTM_STORAGE_KEY);
      localStorage.removeItem(UTM_EXPIRY_KEY);
      localStorage.removeItem(UTM_LANDING_PAGE_KEY);
      return null;
    }
    
    const params = JSON.parse(stored) as UTMParams;
    return {
      ...params,
      landingPage: landingPage || undefined
    };
  } catch (error) {
    console.error('Error reading UTM params from storage:', error);
    return null;
  }
};

/**
 * Initialize UTM tracking on page load
 * Uses first-touch attribution for UTM params: saves the first UTM parameters seen
 * ALWAYS saves click IDs (GCLID/FBCLID) to sessionStorage for current session
 */
export const initUTMTracking = (): void => {
  if (typeof window === 'undefined') return;
  
  // Extract current UTM params from URL
  const currentParams = extractUTMParams();
  
  // ALWAYS save click IDs to session storage (critical for Google Ads tracking)
  // This ensures GCLID persists across SPA navigation during the same session
  if (currentParams.gclid || currentParams.fbclid) {
    saveClickIdsToSession(currentParams);
  }
  
  // If there are UTM params in the URL and none are saved yet
  if (hasUTMParams(currentParams)) {
    const saved = getSavedUTMParams();
    if (!saved) {
      // First visit with UTM params - save them!
      const landingPage = window.location.pathname;
      saveUTMParams(currentParams, landingPage);
      console.log('🎯 UTM Tracking: First-touch attribution saved', { ...currentParams, landingPage });
    }
  }
};

/**
 * Get UTM data for form submission (includes landing page)
 */
export const getUTMDataForLead = (): UTMData => {
  // Always use saved UTM params (first-touch attribution)
  const saved = getSavedUTMParams();
  if (saved) {
    return saved;
  }
  
  // Fallback: check current URL (shouldn't normally happen)
  const current = extractUTMParams();
  if (hasUTMParams(current)) {
    return {
      ...current,
      landingPage: window.location.pathname
    };
  }
  
  // No UTM data available
  return {};
};

/**
 * Clear UTM data (useful for testing)
 */
export const clearUTMData = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(UTM_STORAGE_KEY);
  localStorage.removeItem(UTM_EXPIRY_KEY);
  localStorage.removeItem(UTM_LANDING_PAGE_KEY);
};
