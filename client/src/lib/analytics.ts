declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    gtagReady?: Promise<void>;
    fbq: (...args: any[]) => void;
    _fbq: any;
    clarity: (...args: any[]) => void;
  }
}

let gtagReadyResolve: (() => void) | null = null;
if (typeof window !== 'undefined') {
  window.gtagReady = new Promise((resolve) => {
    gtagReadyResolve = resolve;
  });
}

export const initMicrosoftClarity = () => {
  const clarityId = import.meta.env.VITE_CLARITY_PROJECT_ID;
  
  if (!clarityId) {
    console.warn('⚠️ Microsoft Clarity: Missing VITE_CLARITY_PROJECT_ID environment variable');
    return;
  }

  // Skip Clarity on admin pages to avoid recording internal admin work
  const currentPath = window.location.pathname;
  if (currentPath.startsWith('/admin') || currentPath.startsWith('/login')) {
    console.log('🔒 Microsoft Clarity: Skipping initialization on admin/login pages');
    return;
  }

  // Prevent duplicate script injection on hot reloads
  if (typeof window.clarity !== 'undefined') {
    console.log('⚠️ Microsoft Clarity: Already initialized, skipping duplicate injection');
    return;
  }

  console.log('✅ Microsoft Clarity: Initializing with Project ID:', clarityId.substring(0, 8) + '...');

  // Load Microsoft Clarity script
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.textContent = `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${clarityId}");
  `;
  document.head.appendChild(script);

  console.log('✅ Microsoft Clarity: Heatmaps and session recording initialized');
};

export const initFacebookPixel = () => {
  const pixelId = import.meta.env.VITE_FACEBOOK_PIXEL_ID;
  
  if (!pixelId) {
    console.warn('⚠️ Facebook Pixel: Missing VITE_FACEBOOK_PIXEL_ID environment variable');
    return;
  }

  console.log('✅ Facebook Pixel: Initializing with ID:', pixelId.substring(0, 8) + '...');

  // Load Facebook Pixel script
  const script = document.createElement('script');
  script.textContent = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${pixelId}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(script);

  // Add noscript fallback
  const noscript = document.createElement('noscript');
  const img = document.createElement('img');
  img.height = 1;
  img.width = 1;
  img.style.display = 'none';
  img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
  noscript.appendChild(img);
  document.head.appendChild(noscript);

  console.log('✅ Facebook Pixel: Tracking initialized');
};

export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  const adsConversionId = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID;

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
      if (typeof window.gtag === 'function') {
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

  // Track to Facebook Pixel
  if (window.fbq) {
    window.fbq('track', 'PageView');
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
  
  // Track Facebook Pixel events
  if (window.fbq && category === 'conversion') {
    if (action === 'form_submission') {
      window.fbq('track', 'Lead');
      console.log('📊 Facebook Pixel: Lead event tracked');
    } else if (action === 'phone_click') {
      window.fbq('track', 'Contact');
      console.log('📊 Facebook Pixel: Contact event tracked');
    }
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
  
  const adsConversionId = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID;
  
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
