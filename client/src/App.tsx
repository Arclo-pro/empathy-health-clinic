import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import Insurance from "@/pages/Insurance";
import Therapy from "@/pages/Therapy";
import TeamPage from "@/pages/TeamPage";
import TeamMemberDetail from "@/pages/TeamMemberDetail";
import ServicesPage from "@/pages/ServicesPage";
import RequestAppointment from "@/pages/RequestAppointment";
import VirtualVisit from "@/pages/VirtualVisit";
import BlogListingPage from "@/pages/BlogListingPage";
import BlogDetailPage from "@/pages/BlogDetailPage";
import PageBySlug from "@/pages/PageBySlug";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={Admin} />
      <Route path="/insurance" component={Insurance} />
      <Route path="/therapy" component={Therapy} />
      <Route path="/team" component={TeamPage} />
      <Route path="/team/:slug" component={TeamMemberDetail} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/request-appointment" component={RequestAppointment} />
      <Route path="/virtual-visit" component={VirtualVisit} />
      <Route path="/blog" component={BlogListingPage} />
      <Route path="/blog/:slug" component={BlogDetailPage} />
      <Route path="/:slug" component={PageBySlug} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
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
