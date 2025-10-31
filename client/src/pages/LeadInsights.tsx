import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import type { Lead } from "@shared/schema";
import { TrendingUp, TrendingDown, Users, CheckCircle, XCircle, Phone, FileText, Calendar } from "lucide-react";

export default function LeadInsights() {
  const { data: leads, isLoading } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading insights...</p>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const totalLeads = leads?.length || 0;
  const signedUpLeads = leads?.filter(l => l.status === "signed_up").length || 0;
  const rejectedLeads = leads?.filter(l => l.status === "rejected").length || 0;
  const newLeads = leads?.filter(l => l.status === "new").length || 0;
  const conversionRate = totalLeads > 0 ? ((signedUpLeads / totalLeads) * 100).toFixed(1) : "0";

  // Form performance
  const shortFormLeads = leads?.filter(l => l.formType === "short" || l.formType === "hero") || [];
  const longFormLeads = leads?.filter(l => l.formType === "long") || [];
  const phoneLeads = leads?.filter(l => l.formType === "phone") || [];

  const shortFormConverted = shortFormLeads.filter(l => l.status === "signed_up").length;
  const longFormConverted = longFormLeads.filter(l => l.status === "signed_up").length;
  const phoneConverted = phoneLeads.filter(l => l.status === "signed_up").length;

  const shortFormConversionRate = shortFormLeads.length > 0 ? ((shortFormConverted / shortFormLeads.length) * 100).toFixed(1) : "0";
  const longFormConversionRate = longFormLeads.length > 0 ? ((longFormConverted / longFormLeads.length) * 100).toFixed(1) : "0";
  const phoneConversionRate = phoneLeads.length > 0 ? ((phoneConverted / phoneLeads.length) * 100).toFixed(1) : "0";

  // Rejection reasons
  const rejectionReasons = leads?.filter(l => l.rejectionReason)
    .reduce((acc, lead) => {
      const reason = lead.rejectionReason || "Unknown";
      acc[reason] = (acc[reason] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const topRejectionReasons = Object.entries(rejectionReasons || {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // UTM analysis
  const utmSourceStats = leads?.reduce((acc, lead) => {
    const source = lead.utmSource || "Direct";
    if (!acc[source]) {
      acc[source] = { total: 0, converted: 0 };
    }
    acc[source].total++;
    if (lead.status === "signed_up") {
      acc[source].converted++;
    }
    return acc;
  }, {} as Record<string, { total: number; converted: number }>);

  const topUTMSources = Object.entries(utmSourceStats || {})
    .map(([source, stats]) => ({
      source,
      ...stats,
      rate: stats.total > 0 ? ((stats.converted / stats.total) * 100).toFixed(1) : "0",
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  // Service popularity
  const serviceStats = leads?.reduce((acc, lead) => {
    const service = lead.service || "Unknown";
    if (!acc[service]) {
      acc[service] = { total: 0, converted: 0 };
    }
    acc[service].total++;
    if (lead.status === "signed_up") {
      acc[service].converted++;
    }
    return acc;
  }, {} as Record<string, { total: number; converted: number }>);

  const topServices = Object.entries(serviceStats || {})
    .map(([service, stats]) => ({
      service,
      ...stats,
      rate: stats.total > 0 ? ((stats.converted / stats.total) * 100).toFixed(1) : "0",
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  // Recent leads (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentLeads = leads?.filter(l => new Date(l.createdAt) >= sevenDaysAgo) || [];
  const recentConverted = recentLeads.filter(l => l.status === "signed_up").length;
  const recentConversionRate = recentLeads.length > 0 ? ((recentConverted / recentLeads.length) * 100).toFixed(1) : "0";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Lead Insights</h1>
            <p className="text-muted-foreground">Analyze conversion patterns and identify opportunities</p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalLeads}</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                {parseFloat(conversionRate) >= 50 ? 
                  <TrendingUp className="h-4 w-4 text-green-500" /> : 
                  <TrendingDown className="h-4 w-4 text-red-500" />
                }
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{conversionRate}%</div>
                <p className="text-xs text-muted-foreground">
                  {signedUpLeads} of {totalLeads} signed up
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Leads</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{newLeads}</div>
                <p className="text-xs text-muted-foreground">Awaiting contact</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last 7 Days</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{recentLeads.length}</div>
                <p className="text-xs text-muted-foreground">
                  {recentConversionRate}% conversion rate
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="forms" className="space-y-6">
            <TabsList>
              <TabsTrigger value="forms">Form Performance</TabsTrigger>
              <TabsTrigger value="sources">Traffic Sources</TabsTrigger>
              <TabsTrigger value="rejections">Rejection Reasons</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
            </TabsList>

            <TabsContent value="forms" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Form Type Performance</CardTitle>
                  <CardDescription>Compare conversion rates across different lead capture forms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">Long Form</p>
                          <p className="text-sm text-muted-foreground">{longFormLeads.length} leads</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{longFormConversionRate}%</p>
                        <p className="text-sm text-muted-foreground">{longFormConverted} converted</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">Short Form</p>
                          <p className="text-sm text-muted-foreground">{shortFormLeads.length} leads</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{shortFormConversionRate}%</p>
                        <p className="text-sm text-muted-foreground">{shortFormConverted} converted</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Phone className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">Phone Inquiries</p>
                          <p className="text-sm text-muted-foreground">{phoneLeads.length} leads</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{phoneConversionRate}%</p>
                        <p className="text-sm text-muted-foreground">{phoneConverted} converted</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sources" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Traffic Sources</CardTitle>
                  <CardDescription>Which marketing channels drive the most conversions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topUTMSources.map((source, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-semibold">{source.source}</p>
                          <p className="text-sm text-muted-foreground">{source.total} total leads</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-primary">{source.rate}%</p>
                          <p className="text-sm text-muted-foreground">{source.converted} converted</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rejections" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Rejection Reasons</CardTitle>
                  <CardDescription>Why leads don't convert - opportunities for improvement</CardDescription>
                </CardHeader>
                <CardContent>
                  {topRejectionReasons.length > 0 ? (
                    <div className="space-y-4">
                      {topRejectionReasons.map(([reason, count], index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                              <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                            </div>
                            <p className="font-semibold">{reason}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold">{count}</p>
                            <p className="text-sm text-muted-foreground">
                              {((count / rejectedLeads) * 100).toFixed(1)}% of rejections
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No rejection data yet</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Service Popularity</CardTitle>
                  <CardDescription>Most requested services and their conversion rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topServices.map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-semibold">{service.service}</p>
                          <p className="text-sm text-muted-foreground">{service.total} requests</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-primary">{service.rate}%</p>
                          <p className="text-sm text-muted-foreground">{service.converted} converted</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
