import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { initGA } from "@/lib/analytics";
import { initWebVitals } from "@/lib/web-vitals-tracker";
import { initUTMTracking } from "@/lib/utm-tracker";
import { useAnalytics } from "@/hooks/use-analytics";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import AnalyticsDashboard from "@/pages/AnalyticsDashboard";
import SEOOptimization from "@/pages/SEOOptimization";
import Insurance from "@/pages/Insurance";
import Therapy from "@/pages/Therapy";
import TeamPage from "@/pages/TeamPage";
import TeamMemberDetail from "@/pages/TeamMemberDetail";
import ServicesPage from "@/pages/ServicesPage";
import RequestAppointment from "@/pages/RequestAppointment";
import VirtualVisit from "@/pages/VirtualVisit";
import BlogListingPage from "@/pages/BlogListingPage";
import BlogDetailPage from "@/pages/BlogDetailPage";
import LocationDetail from "@/pages/LocationDetail";
import NewPatients from "@/pages/NewPatients";
import AffordableCare from "@/pages/AffordableCare";
import StressManagement from "@/pages/StressManagement";
import AltamonteSprings from "@/pages/AltamonteSprings";
import ThankYou from "@/pages/ThankYou";
import PageBySlug from "@/pages/PageBySlug";
import NotFound from "@/pages/not-found";

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
        <Route path="/admin" component={Admin} />
        <Route path="/admin/analytics" component={AnalyticsDashboard} />
        <Route path="/admin/seo" component={SEOOptimization} />
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
        <Route path="/locations/altamonte-springs" component={AltamonteSprings} />
        <Route path="/thank-you" component={ThankYou} />
        <Route path="/blog" component={BlogListingPage} />
        <Route path="/blog/:slug" component={BlogDetailPage} />
        <Route path="/locations/:slug" component={LocationDetail} />
        <Route path="/:slug" component={PageBySlug} />
        <Route component={NotFound} />
      </Switch>
      {showStickyCTA && <StickyMobileCTA />}
    </>
  );
}

function App() {
  useEffect(() => {
    initGA();
    initWebVitals();
    initUTMTracking();
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
