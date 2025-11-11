import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SiteContentEditor from "@/components/admin/SiteContentEditor";
import TreatmentsEditor from "@/components/admin/TreatmentsEditor";
import TeamMembersEditor from "@/components/admin/TeamMembersEditor";
import TestimonialsEditor from "@/components/admin/TestimonialsEditor";
import InsuranceProvidersEditor from "@/components/admin/InsuranceProvidersEditor";
import TherapiesEditor from "@/components/admin/TherapiesEditor";
import ConditionsEditor from "@/components/admin/ConditionsEditor";
import NewsletterEditor from "@/components/admin/NewsletterEditor";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useLocation } from "wouter";

export default function Admin() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-sans font-medium">Patient Portal</h1>
          <Button
            variant="outline"
            onClick={() => setLocation("/")}
            data-testid="button-back-to-site"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Site
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6 flex flex-wrap gap-3">
          <Button
            variant="default"
            onClick={() => setLocation("/admin/analytics")}
            data-testid="button-analytics"
          >
            View Analytics Dashboard
          </Button>
          <Button
            variant="outline"
            onClick={() => setLocation("/admin/lead-insights")}
            data-testid="button-lead-insights"
          >
            Lead Insights
          </Button>
          <Button
            variant="outline"
            onClick={() => setLocation("/admin/link-monitor")}
            data-testid="button-link-monitor"
          >
            Link & Performance Monitor
          </Button>
          <Button
            variant="outline"
            onClick={() => setLocation("/admin/seo")}
            data-testid="button-seo-optimization"
          >
            SEO Optimization
          </Button>
          <Button
            variant="outline"
            onClick={() => setLocation("/admin/blog-seo")}
            data-testid="button-blog-seo"
          >
            Blog SEO Optimizer
          </Button>
          <Button
            variant="outline"
            onClick={() => setLocation("/admin/semrush")}
            data-testid="button-semrush"
          >
            SEMrush Keyword Optimizer
          </Button>
          <Button
            variant="outline"
            onClick={() => setLocation("/admin/utm-tracker")}
            data-testid="button-utm-tracker"
          >
            UTM Tracker (Clarity Fix)
          </Button>
          <Button
            variant="outline"
            onClick={() => setLocation("/admin/google-ads")}
            data-testid="button-google-ads"
          >
            Google Ads Performance
          </Button>
        </div>
        
        <Tabs defaultValue="site-content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-8 gap-2">
            <TabsTrigger value="site-content" data-testid="tab-site-content">
              Site Content
            </TabsTrigger>
            <TabsTrigger value="treatments" data-testid="tab-treatments">
              Treatments
            </TabsTrigger>
            <TabsTrigger value="therapies" data-testid="tab-therapies">
              Therapies
            </TabsTrigger>
            <TabsTrigger value="team" data-testid="tab-team">
              Team
            </TabsTrigger>
            <TabsTrigger value="testimonials" data-testid="tab-testimonials">
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="insurance" data-testid="tab-insurance">
              Insurance
            </TabsTrigger>
            <TabsTrigger value="conditions" data-testid="tab-conditions">
              Conditions
            </TabsTrigger>
            <TabsTrigger value="newsletter" data-testid="tab-newsletter">
              Newsletter
            </TabsTrigger>
          </TabsList>

          <TabsContent value="site-content">
            <SiteContentEditor />
          </TabsContent>

          <TabsContent value="treatments">
            <TreatmentsEditor />
          </TabsContent>

          <TabsContent value="therapies">
            <TherapiesEditor />
          </TabsContent>

          <TabsContent value="team">
            <TeamMembersEditor />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialsEditor />
          </TabsContent>

          <TabsContent value="insurance">
            <InsuranceProvidersEditor />
          </TabsContent>

          <TabsContent value="conditions">
            <ConditionsEditor />
          </TabsContent>

          <TabsContent value="newsletter">
            <NewsletterEditor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
