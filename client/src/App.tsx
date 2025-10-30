import { useEffect, lazy, Suspense } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAnalytics } from "@/hooks/use-analytics";
import { Loader2 } from "lucide-react";
import Home from "@/pages/Home";
import Insurance from "@/pages/Insurance";
import Therapy from "@/pages/Therapy";
import TeamPage from "@/pages/TeamPage";
import TeamMemberDetail from "@/pages/TeamMemberDetail";
import ServicesPage from "@/pages/ServicesPage";
import RequestAppointment from "@/pages/RequestAppointment";
import VirtualVisit from "@/pages/VirtualVisit";
import NewPatients from "@/pages/NewPatients";
import AffordableCare from "@/pages/AffordableCare";
import StressManagement from "@/pages/StressManagement";
import AltamonteSprings from "@/pages/AltamonteSprings";
import WinterPark from "@/pages/WinterPark";
import Orlando from "@/pages/Orlando";
import PsychotherapistOrlando from "@/pages/PsychotherapistOrlando";
import ThankYou from "@/pages/ThankYou";
import LocationDetail from "@/pages/LocationDetail";
import PageBySlug from "@/pages/PageBySlug";
import NotFound from "@/pages/not-found";

const Admin = lazy(() => import("@/pages/Admin"));
const AnalyticsDashboard = lazy(() => import("@/pages/AnalyticsDashboard"));
const SEOOptimization = lazy(() => import("@/pages/SEOOptimization"));
const GoogleAdsPerformance = lazy(() => import("@/pages/GoogleAdsPerformance"));
const LeadInsights = lazy(() => import("@/pages/LeadInsights"));
const BlogListingPage = lazy(() => import("@/pages/BlogListingPage"));
const BlogDetailPage = lazy(() => import("@/pages/BlogDetailPage"));
const StickyMobileCTA = lazy(() => import("@/components/StickyMobileCTA"));

function Router() {
  const [location] = useLocation();
  useAnalytics();
  
  // Don't show sticky CTA on admin pages, thank you page, or request appointment page
  const showStickyCTA = !location.startsWith('/admin') && 
                        location !== '/thank-you' && 
                        location !== '/request-appointment';
  
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/admin">
          <Suspense fallback={<LoadingFallback />}>
            <Admin />
          </Suspense>
        </Route>
        <Route path="/admin/analytics">
          <Suspense fallback={<LoadingFallback />}>
            <AnalyticsDashboard />
          </Suspense>
        </Route>
        <Route path="/admin/seo">
          <Suspense fallback={<LoadingFallback />}>
            <SEOOptimization />
          </Suspense>
        </Route>
        <Route path="/admin/google-ads">
          <Suspense fallback={<LoadingFallback />}>
            <GoogleAdsPerformance />
          </Suspense>
        </Route>
        <Route path="/admin/lead-insights">
          <Suspense fallback={<LoadingFallback />}>
            <LeadInsights />
          </Suspense>
        </Route>
        <Route path="/insurance" component={Insurance} />
        <Route path="/therapy" component={Therapy} />
        <Route path="/team" component={TeamPage} />
        <Route path="/team/:slug" component={TeamMemberDetail} />
        <Route path="/services" component={ServicesPage} />
        <Route path="/request-appointment" component={RequestAppointment} />
        <Route path="/virtual-visit" component={VirtualVisit} />
        <Route path="/new-patients" component={NewPatients} />
        <Route path="/affordable-care" component={AffordableCare} />
        <Route path="/stress-management" component={StressManagement} />
        <Route path="/psychotherapist-orlando" component={PsychotherapistOrlando} />
        <Route path="/locations/altamonte-springs" component={AltamonteSprings} />
        <Route path="/locations/winter-park" component={WinterPark} />
        <Route path="/locations/orlando" component={Orlando} />
        <Route path="/thank-you" component={ThankYou} />
        <Route path="/blog">
          <Suspense fallback={<LoadingFallback />}>
            <BlogListingPage />
          </Suspense>
        </Route>
        <Route path="/blog/:slug">
          <Suspense fallback={<LoadingFallback />}>
            <BlogDetailPage />
          </Suspense>
        </Route>
        <Route path="/locations/:slug" component={LocationDetail} />
        <Route path="/:slug" component={PageBySlug} />
        <Route component={NotFound} />
      </Switch>
      {showStickyCTA && (
        <Suspense fallback={null}>
          <StickyMobileCTA />
        </Suspense>
      )}
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

function App() {
  useEffect(() => {
    const loadAnalytics = () => {
      Promise.all([
        import("@/lib/analytics"),
        import("@/lib/web-vitals-tracker"),
        import("@/lib/utm-tracker")
      ]).then(([analytics, webVitals, utm]) => {
        analytics.initGA();
        webVitals.initWebVitals();
        utm.initUTMTracking();
      }).catch((error) => {
        console.error('Failed to load analytics:', error);
      });
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => loadAnalytics());
    } else {
      setTimeout(() => loadAnalytics(), 1000);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
