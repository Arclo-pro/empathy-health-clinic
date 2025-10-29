declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (!measurementId) {
    console.warn('⚠️ Google Analytics: Missing VITE_GA_MEASUREMENT_ID environment variable');
    return;
  }

  console.log('✅ Google Analytics: Initializing with Measurement ID:', measurementId.substring(0, 8) + '...');

  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}');
    console.log('✅ Google Analytics: gtag configured');
  `;
  document.head.appendChild(script2);
  
  console.log('✅ Google Analytics: Scripts loaded');
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
  
  // Track to backend API
  fetch('/api/analytics/page-view', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path: url,
      userAgent: navigator.userAgent,
      referrer: document.referrer || undefined
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
