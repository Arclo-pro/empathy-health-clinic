import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { trackPageView } from '../lib/analytics';

export const useAnalytics = () => {
  const [location] = useLocation();
  const prevLocationRef = useRef<string | null>(null);
  const initialLoadTracked = useRef(false);
  
  useEffect(() => {
    // Track initial page load
    if (!initialLoadTracked.current) {
      trackPageView(location);
      prevLocationRef.current = location;
      initialLoadTracked.current = true;
      return;
    }
    
    // Track subsequent navigation
    if (location !== prevLocationRef.current) {
      trackPageView(location);
      prevLocationRef.current = location;
    }
  }, [location]);
};
