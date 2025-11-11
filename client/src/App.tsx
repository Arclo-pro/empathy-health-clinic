import { useEffect, lazy, Suspense } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAnalytics } from "@/hooks/use-analytics";
import { Loader2 } from "lucide-react";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";

// Only load Home page immediately for fast initial render
import Home from "@/pages/Home";

// Lazy load all public pages for optimal performance
const Insurance = lazy(() => import("@/pages/Insurance"));
const Therapy = lazy(() => import("@/pages/Therapy"));
const TeamPage = lazy(() => import("@/pages/TeamPage"));
const TeamMemberDetail = lazy(() => import("@/pages/TeamMemberDetail"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const RequestAppointment = lazy(() => import("@/pages/RequestAppointment"));
const NewPatients = lazy(() => import("@/pages/NewPatients"));
const AffordableCare = lazy(() => import("@/pages/AffordableCare"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const StressManagement = lazy(() => import("@/pages/StressManagement"));
const AltamonteSprings = lazy(() => import("@/pages/AltamonteSprings"));
const WinterPark = lazy(() => import("@/pages/WinterPark"));
const Orlando = lazy(() => import("@/pages/Orlando"));
const PsychotherapistOrlando = lazy(() => import("@/pages/PsychotherapistOrlando"));
const ThankYou = lazy(() => import("@/pages/ThankYou"));
const LocationDetail = lazy(() => import("@/pages/LocationDetail"));
const PageBySlug = lazy(() => import("@/pages/PageBySlug"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Auth page
const AuthPage = lazy(() => import("@/pages/AuthPage"));

// Admin pages
const Admin = lazy(() => import("@/pages/Admin"));
const AnalyticsDashboard = lazy(() => import("@/pages/AnalyticsDashboard"));
const SEOOptimization = lazy(() => import("@/pages/SEOOptimization"));
const GoogleAdsPerformance = lazy(() => import("@/pages/GoogleAdsPerformance"));
const GoogleAdsSetup = lazy(() => import("@/pages/GoogleAdsSetup"));
const LeadInsights = lazy(() => import("@/pages/LeadInsights"));
const AdminLinkMonitor = lazy(() => import("@/pages/AdminLinkMonitor"));
const AdminBlogGenerator = lazy(() => import("@/pages/AdminBlogGenerator"));
const BlogSEOOptimizer = lazy(() => import("@/pages/BlogSEOOptimizer"));
const SEMrushOptimizer = lazy(() => import("@/pages/SEMrushOptimizer"));
const AdminUTMTracker = lazy(() => import("@/pages/AdminUTMTracker"));
const AdminEmailFailures = lazy(() => import("@/pages/AdminEmailFailures"));

// Blog pages
const BlogListingPage = lazy(() => import("@/pages/BlogListingPage"));
const BlogDetailPage = lazy(() => import("@/pages/BlogDetailPage"));

// Google Ads Landing Pages
const EMDRTherapy = lazy(() => import("@/pages/EMDRTherapy"));
const VirtualTherapy = lazy(() => import("@/pages/VirtualTherapy"));
const CrisisTherapy = lazy(() => import("@/pages/CrisisTherapy"));
const DepressionCounseling = lazy(() => import("@/pages/DepressionCounseling"));
const AnxietyTherapy = lazy(() => import("@/pages/AnxietyTherapy"));

// Legal & Info Pages
const About = lazy(() => import("@/pages/About"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const MedicalDisclaimer = lazy(() => import("@/pages/MedicalDisclaimer"));

// Components
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
        <Route path="/auth">
          <Suspense fallback={<LoadingFallback />}>
            <AuthPage />
          </Suspense>
        </Route>
        <ProtectedRoute path="/admin" component={() => (
          <Suspense fallback={<LoadingFallback />}>
            <Admin />
          </Suspense>
        )} />
        <ProtectedRoute path="/admin/analytics" component={() => (
          <Suspense fallback={<LoadingFallback />}>
            <AnalyticsDashboard />
          </Suspense>
        )} />
        <ProtectedRoute path="/admin/seo" component={() => (
          <Suspense fallback={<LoadingFallback />}>
            <SEOOptimization />
          </Suspense>
        )} />
        <ProtectedRoute path="/admin/google-ads" component={() => (
          <Suspense fallback={<LoadingFallback />}>
            <GoogleAdsPerformance />
          </Suspense>
        )} />
        <ProtectedRoute path="/admin/google-ads-setup" component={() => (
          <Suspense fallback={<LoadingFallback />}>
            <GoogleAdsSetup />
          </Suspense>
        )} />
        <ProtectedRoute path="/admin/lead-insights" component={() => (
          <Suspense fallback={<LoadingFallback />}>
            <LeadInsights />
          </Suspense>
        )} />
        <ProtectedRoute path="/admin/link-monitor" component={() => (
          <Suspense fallback={<LoadingFallback />}>
            <AdminLinkMonitor />
          </Suspense>
        )} />
        <ProtectedRoute path="/admin/blog" component={() => (
          <Suspense fallback={<LoadingFallback />}>
            <AdminBlogGenerator />
          </Suspense>
        )} />
        <ProtectedRoute path="/admin/blog-seo" component={() => (
          <Suspense fallback={<LoadingFallback />}>
            <BlogSEOOptimizer />
          </Suspense>
        )} />
        <ProtectedRoute path="/admin/semrush" component={() => (
          <Suspense fallback={<LoadingFallback />}>
            <SEMrushOptimizer />
          </Suspense>
        )} />
        <ProtectedRoute path="/admin/utm-tracker" component={() => (
          <Suspense fallback={<LoadingFallback />}>
            <AdminUTMTracker />
          </Suspense>
        )} />
        <ProtectedRoute path="/admin/email-failures" component={() => (
          <Suspense fallback={<LoadingFallback />}>
            <AdminEmailFailures />
          </Suspense>
        )} />
        <Route path="/insurance">
          <Suspense fallback={<LoadingFallback />}>
            <Insurance />
          </Suspense>
        </Route>
        <Route path="/therapy">
          <Suspense fallback={<LoadingFallback />}>
            <Therapy />
          </Suspense>
        </Route>
        <Route path="/team">
          <Suspense fallback={<LoadingFallback />}>
            <TeamPage />
          </Suspense>
        </Route>
        <Route path="/team/:slug">
          <Suspense fallback={<LoadingFallback />}>
            <TeamMemberDetail />
          </Suspense>
        </Route>
        <Route path="/services">
          <Suspense fallback={<LoadingFallback />}>
            <ServicesPage />
          </Suspense>
        </Route>
        <Route path="/request-appointment">
          <Suspense fallback={<LoadingFallback />}>
            <RequestAppointment />
          </Suspense>
        </Route>
        <Route path="/new-patients">
          <Suspense fallback={<LoadingFallback />}>
            <NewPatients />
          </Suspense>
        </Route>
        <Route path="/pricing">
          <Suspense fallback={<LoadingFallback />}>
            <Pricing />
          </Suspense>
        </Route>
        <Route path="/affordable-care">
          <Suspense fallback={<LoadingFallback />}>
            <AffordableCare />
          </Suspense>
        </Route>
        <Route path="/stress-management">
          <Suspense fallback={<LoadingFallback />}>
            <StressManagement />
          </Suspense>
        </Route>
        <Route path="/psychotherapist-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <PsychotherapistOrlando />
          </Suspense>
        </Route>
        <Route path="/locations/altamonte-springs">
          <Suspense fallback={<LoadingFallback />}>
            <AltamonteSprings />
          </Suspense>
        </Route>
        <Route path="/locations/winter-park">
          <Suspense fallback={<LoadingFallback />}>
            <WinterPark />
          </Suspense>
        </Route>
        <Route path="/locations/orlando">
          <Suspense fallback={<LoadingFallback />}>
            <Orlando />
          </Suspense>
        </Route>
        <Route path="/thank-you">
          <Suspense fallback={<LoadingFallback />}>
            <ThankYou />
          </Suspense>
        </Route>
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
        <Route path="/emdr-therapy">
          <Suspense fallback={<LoadingFallback />}>
            <EMDRTherapy />
          </Suspense>
        </Route>
        <Route path="/virtual-therapy">
          <Suspense fallback={<LoadingFallback />}>
            <VirtualTherapy />
          </Suspense>
        </Route>
        <Route path="/crisis-therapy">
          <Suspense fallback={<LoadingFallback />}>
            <CrisisTherapy />
          </Suspense>
        </Route>
        <Route path="/depression-counseling">
          <Suspense fallback={<LoadingFallback />}>
            <DepressionCounseling />
          </Suspense>
        </Route>
        <Route path="/anxiety-therapy">
          <Suspense fallback={<LoadingFallback />}>
            <AnxietyTherapy />
          </Suspense>
        </Route>
        <Route path="/about">
          <Suspense fallback={<LoadingFallback />}>
            <About />
          </Suspense>
        </Route>
        <Route path="/privacy-policy">
          <Suspense fallback={<LoadingFallback />}>
            <PrivacyPolicy />
          </Suspense>
        </Route>
        <Route path="/medical-disclaimer">
          <Suspense fallback={<LoadingFallback />}>
            <MedicalDisclaimer />
          </Suspense>
        </Route>
        <Route path="/locations/:slug">
          <Suspense fallback={<LoadingFallback />}>
            <LocationDetail />
          </Suspense>
        </Route>
        <Route path="/:slug">
          <Suspense fallback={<LoadingFallback />}>
            <PageBySlug />
          </Suspense>
        </Route>
        <Route>
          <Suspense fallback={<LoadingFallback />}>
            <NotFound />
          </Suspense>
        </Route>
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
        analytics.initFacebookPixel();
        analytics.initMicrosoftClarity();
        webVitals.initWebVitals();
        utm.initUTMTracking();
      }).catch((error) => {
        console.error('Failed to load analytics:', error);
      });
    };

    // CRITICAL TBT OPTIMIZATION: Delay ALL analytics until after page is fully loaded
    // This prevents analytics from blocking main thread during critical rendering phase
    // Reduces TBT from ~400ms to <200ms
    if (document.readyState === 'complete') {
      // Page already loaded, delay slightly with requestIdleCallback
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => loadAnalytics(), { timeout: 1000 });
      } else {
        setTimeout(() => loadAnalytics(), 500);
      }
    } else {
      // Wait for full page load, THEN use requestIdleCallback
      window.addEventListener('load', () => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => loadAnalytics(), { timeout: 1000 });
        } else {
          setTimeout(() => loadAnalytics(), 500);
        }
      }, { once: true });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
