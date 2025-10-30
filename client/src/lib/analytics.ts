declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    gtagReady?: Promise<void>;
  }
}

let gtagReadyResolve: (() => void) | null = null;
if (typeof window !== 'undefined') {
  window.gtagReady = new Promise((resolve) => {
    gtagReadyResolve = resolve;
  });
}

export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  const adsConversionId = import.meta.env.VITE_GOOGLE_ADS_ID;

  if (!measurementId) {
    console.warn('⚠️ Google Analytics: Missing VITE_GA_MEASUREMENT_ID environment variable');
    return;
  }

  console.log('✅ Google Analytics: Initializing with Measurement ID:', measurementId.substring(0, 8) + '...');

  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  
  // CRITICAL: Attach onload/onerror BEFORE appending to prevent race condition
  script1.onload = () => {
    // Wait a brief moment for gtag to be defined
    setTimeout(() => {
      if (window.gtag) {
        console.log('✅ Google Analytics: gtag configured');
        if (adsConversionId) {
          console.log('✅ Google Ads: Conversion tracking initialized');
        }
        if (gtagReadyResolve) {
          gtagReadyResolve();
        }
      } else {
        console.error('❌ Google Analytics: Script loaded but gtag not defined');
        if (gtagReadyResolve) {
          gtagReadyResolve(); // Resolve anyway to unblock
        }
      }
    }, 100);
  };
  
  script1.onerror = () => {
    console.error('❌ Google Analytics: Failed to load gtag script');
    if (gtagReadyResolve) {
      // Resolve anyway to prevent conversions from hanging forever
      gtagReadyResolve();
    }
  };
  
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}');
    ${adsConversionId ? `gtag('config', '${adsConversionId}');` : ''}
  `;
  document.head.appendChild(script2);
  
  console.log('✅ Google Analytics: Scripts loaded');
  if (adsConversionId) {
    console.log('✅ Google Ads: Conversion ID configured:', adsConversionId);
  }
};

export const trackPageView = (url: string) => {
  if (typeof window === 'undefined') return;
  
  // Track to Google Analytics
  if (window.gtag) {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (measurementId) {
      window.gtag('config', measurementId, {
        page_path: url
      });
    }
  }
  
  // Extract UTM parameters from current URL
  const searchParams = new URLSearchParams(window.location.search);
  const utmData = {
    utmSource: searchParams.get('utm_source') || undefined,
    utmMedium: searchParams.get('utm_medium') || undefined,
    utmCampaign: searchParams.get('utm_campaign') || undefined,
    utmTerm: searchParams.get('utm_term') || undefined,
    utmContent: searchParams.get('utm_content') || undefined,
  };
  
  // Track to backend API with UTM data
  fetch('/api/analytics/page-view', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path: url,
      userAgent: navigator.userAgent,
      referrer: document.referrer || undefined,
      ...utmData
    }),
    keepalive: true
  }).catch(() => {
    // Silent fail - analytics shouldn't break the app
  });
};

export const trackEvent = (
  action: string, 
  category?: string, 
  label?: string, 
  value?: string
) => {
  if (typeof window === 'undefined') return;
  
  // Track to Google Analytics
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
    console.log('📊 GA Event:', { action, category, label, value });
  } else {
    console.warn('⚠️ Google Analytics: gtag not loaded, event not sent:', action);
  }
  
  // Track Google Ads conversions for key events
  if (category === 'conversion') {
    if (action === 'phone_click') {
      trackPhoneClick(value || '');
    } else if (action === 'form_submission') {
      trackFormSubmission();
    }
  }
  
  // Track to backend API
  const path = window.location.pathname;
  fetch('/api/analytics/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventType: action,
      eventCategory: category || 'general',
      eventLabel: label,
      value: value,
      path: path
    }),
    keepalive: true
  }).catch(() => {
    // Silent fail - analytics shouldn't break the app
  });
};

export const isGAActive = (): boolean => {
  return typeof window !== 'undefined' && 
         !!window.gtag && 
         !!import.meta.env.VITE_GA_MEASUREMENT_ID;
};

export const trackGoogleAdsConversion = async (conversionLabel: string, value?: number) => {
  if (typeof window === 'undefined') return;
  
  const adsConversionId = import.meta.env.VITE_GOOGLE_ADS_ID;
  
  if (!adsConversionId || !conversionLabel) {
    console.warn('⚠️ Google Ads: Missing conversion ID or label');
    return;
  }

  // Wait for gtag to be ready with timeout
  if (window.gtagReady) {
    const timeoutPromise = new Promise<void>((_, reject) => {
      setTimeout(() => reject(new Error('gtag timeout')), 5000);
    });
    
    try {
      await Promise.race([window.gtagReady, timeoutPromise]);
    } catch (e) {
      console.warn('⚠️ Google Ads: gtag initialization timeout (5s)');
      return;
    }
  }

  if (!window.gtag) {
    console.warn('⚠️ Google Ads: gtag not loaded after waiting');
    return;
  }

  window.gtag('event', 'conversion', {
    'send_to': `${adsConversionId}/${conversionLabel}`,
    'value': value || 1.0,
    'currency': 'USD'
  });

  console.log('📊 Google Ads Conversion:', {
    conversionId: adsConversionId,
    label: conversionLabel,
    value: value || 1.0
  });
};

export const trackPhoneClick = (phoneNumber: string) => {
  const phoneLabel = import.meta.env.VITE_GOOGLE_ADS_PHONE_LABEL;
  
  if (phoneLabel) {
    trackGoogleAdsConversion(phoneLabel);
    console.log('📞 Google Ads: Phone click conversion tracked', phoneNumber);
  }
};

export const trackFormSubmission = () => {
  const formLabel = import.meta.env.VITE_GOOGLE_ADS_FORM_LABEL;
  
  if (formLabel) {
    trackGoogleAdsConversion(formLabel);
    console.log('📝 Google Ads: Form submission conversion tracked');
  }
};
