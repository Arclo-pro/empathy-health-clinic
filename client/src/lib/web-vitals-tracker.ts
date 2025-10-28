import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from 'web-vitals';

export interface WebVitalsMetrics {
  cls: number | null;
  inp: number | null;
  lcp: number | null;
  fcp: number | null;
  ttfb: number | null;
}

let vitalsData: WebVitalsMetrics = {
  cls: null,
  inp: null,
  lcp: null,
  fcp: null,
  ttfb: null,
};

const sendToBackend = (metric: Metric) => {
  const body = JSON.stringify({
    metricName: metric.name,
    value: String(metric.value),
    rating: metric.rating,
    metricId: metric.id,
    navigationType: metric.navigationType || 'navigate',
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics/vitals', body);
  } else {
    fetch('/api/analytics/vitals', {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
    }).catch(console.error);
  }
};

export const initWebVitals = () => {
  onCLS((metric) => {
    vitalsData.cls = metric.value;
    sendToBackend(metric);
  });

  onINP((metric) => {
    vitalsData.inp = metric.value;
    sendToBackend(metric);
  });

  onLCP((metric) => {
    vitalsData.lcp = metric.value;
    sendToBackend(metric);
  });

  onFCP((metric) => {
    vitalsData.fcp = metric.value;
    sendToBackend(metric);
  });

  onTTFB((metric) => {
    vitalsData.ttfb = metric.value;
    sendToBackend(metric);
  });
};

export const getWebVitals = (): WebVitalsMetrics => {
  return { ...vitalsData };
};
