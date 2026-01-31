import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useQuery } from "@tanstack/react-query";
import { getSavedUTMParams, extractUTMParams, clearUTMData, type UTMData } from "@/lib/utm-tracker";
import { 
  CheckCircle2, 
  XCircle, 
  Copy, 
  ExternalLink, 
  RefreshCw,
  Trash2,
  AlertCircle,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Lead {
  id: number;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  createdAt: string;
  name?: string;
}

export default function AdminUTMTracker() {
  const [currentUTM, setCurrentUTM] = useState<UTMData | null>(null);
  const [testUrl, setTestUrl] = useState("");
  const [testResults, setTestResults] = useState<UTMData | null>(null);
  const { toast } = useToast();

  const { data: leads, refetch: refetchLeads } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
  });

  useEffect(() => {
    const saved = getSavedUTMParams();
    setCurrentUTM(saved);
  }, []);

  const handleClearUTM = () => {
    clearUTMData();
    setCurrentUTM(null);
    toast({
      title: "UTM data cleared",
      description: "Visit a page with UTM parameters to test tracking.",
    });
  };

  const handleTestUrl = () => {
    if (!testUrl) return;
    
    try {
      const params = extractUTMParams(testUrl);
      setTestResults(params);
      
      const hasParams = params.utmSource || params.utmMedium || params.utmCampaign;
      toast({
        title: hasParams ? "UTM parameters found!" : "No UTM parameters",
        description: hasParams 
          ? `Found ${Object.values(params).filter(Boolean).length} parameters`
          : "Add UTM parameters to your URL",
        variant: hasParams ? "default" : "destructive",
      });
    } catch (error) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL with https://",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "URL copied to clipboard",
    });
  };

  const googleAdsTemplate = "https://www.empathyhealthclinic.com/request-appointment?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}&utm_content={creative}";
  const manualTemplate = "https://www.empathyhealthclinic.com/request-appointment?utm_source=google&utm_medium=cpc&utm_campaign=psychiatry_orlando&utm_term=psychiatrist+orlando";

  const recentLeadsWithUTM = leads?.filter(lead => 
    lead.utmSource || lead.utmMedium || lead.utmCampaign
  ).slice(0, 10) || [];

  const paidSearchLeads = leads?.filter(lead => 
    lead.utmMedium === 'cpc' || lead.utmMedium === 'paidsearch'
  ).length || 0;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2" data-testid="heading-utm-tracker">
            UTM Parameter Tracker
          </h1>
          <p className="text-muted-foreground">
            Monitor and verify UTM tracking for Google Ads and Microsoft Clarity
          </p>
        </div>

        {/* Alert for Clarity Setup */}
        <Alert data-testid="alert-clarity-setup">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Microsoft Clarity Issue:</strong> Only {paidSearchLeads} paid search leads detected. 
            Most Google Ads traffic is appearing as "Direct" because UTM parameters are missing.
            <br />
            <strong>Solution:</strong> Add the URL template below to your Google Ads account settings.
          </AlertDescription>
        </Alert>

        {/* Current Session UTM */}
        <Card data-testid="card-current-utm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Current Session Attribution</CardTitle>
                <CardDescription>
                  UTM parameters saved for this browser (30-day first-touch)
                </CardDescription>
              </div>
              {currentUTM && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearUTM}
                  data-testid="button-clear-utm"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {currentUTM ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-medium">UTM Tracking Active</span>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {currentUTM.utmSource && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Source:</span>
                      <Badge variant="secondary" data-testid="badge-utm-source">
                        {currentUTM.utmSource}
                      </Badge>
                    </div>
                  )}
                  {currentUTM.utmMedium && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Medium:</span>
                      <Badge variant="secondary" data-testid="badge-utm-medium">
                        {currentUTM.utmMedium}
                      </Badge>
                    </div>
                  )}
                  {currentUTM.utmCampaign && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Campaign:</span>
                      <Badge variant="secondary" data-testid="badge-utm-campaign">
                        {currentUTM.utmCampaign}
                      </Badge>
                    </div>
                  )}
                  {currentUTM.utmTerm && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Term:</span>
                      <Badge variant="secondary" data-testid="badge-utm-term">
                        {currentUTM.utmTerm}
                      </Badge>
                    </div>
                  )}
                  {currentUTM.landingPage && (
                    <div className="flex items-center gap-2 md:col-span-2">
                      <span className="text-sm text-muted-foreground">Landing Page:</span>
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {currentUTM.landingPage}
                      </code>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <XCircle className="h-5 w-5" />
                <span>No UTM parameters detected. Visit a page with UTM parameters to test.</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Google Ads Configuration */}
        <Card data-testid="card-google-ads-config">
          <CardHeader>
            <CardTitle>Google Ads URL Template</CardTitle>
            <CardDescription>
              Add this to Google Ads → Settings → Account Settings → Tracking Template
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Automatic Template (Recommended)</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(googleAdsTemplate)}
                  data-testid="button-copy-auto-template"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
              <code className="block bg-muted p-3 rounded text-xs break-all">
                {googleAdsTemplate}
              </code>
              <p className="text-xs text-muted-foreground mt-2">
                Uses dynamic Google Ads parameters: {'{campaignid}'}, {'{keyword}'}, {'{creative}'}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Manual Template (Testing)</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(manualTemplate)}
                  data-testid="button-copy-manual-template"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
              <code className="block bg-muted p-3 rounded text-xs break-all">
                {manualTemplate}
              </code>
              <p className="text-xs text-muted-foreground mt-2">
                Use this for manual testing with static campaign names
              </p>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Important:</strong> After adding this template to Google Ads:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Wait 2-4 hours for Clarity to update</li>
                  <li>Test by clicking your own ad (use mobile/incognito)</li>
                  <li>Check this page to verify UTM parameters were captured</li>
                  <li>Clarity will now show sessions under "Paid Search" instead of "Direct"</li>
                </ul>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* URL Tester */}
        <Card data-testid="card-url-tester">
          <CardHeader>
            <CardTitle>Test URL Parameters</CardTitle>
            <CardDescription>
              Paste a URL to see what UTM parameters will be captured
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="https://www.empathyhealthclinic.com/request-appointment?utm_source=google&utm_medium=cpc..."
                value={testUrl}
                onChange={(e) => setTestUrl(e.target.value)}
                data-testid="input-test-url"
              />
              <Button onClick={handleTestUrl} data-testid="button-test-url">
                Test
              </Button>
            </div>

            {testResults && (
              <div className="border rounded-lg p-4 bg-muted/50">
                <h4 className="font-medium mb-3">Extracted Parameters:</h4>
                {testResults.utmSource || testResults.utmMedium || testResults.utmCampaign ? (
                  <div className="grid md:grid-cols-2 gap-3">
                    {testResults.utmSource && (
                      <div>
                        <span className="text-sm text-muted-foreground">utm_source:</span>
                        <p className="font-mono text-sm">{testResults.utmSource}</p>
                      </div>
                    )}
                    {testResults.utmMedium && (
                      <div>
                        <span className="text-sm text-muted-foreground">utm_medium:</span>
                        <p className="font-mono text-sm">{testResults.utmMedium}</p>
                      </div>
                    )}
                    {testResults.utmCampaign && (
                      <div>
                        <span className="text-sm text-muted-foreground">utm_campaign:</span>
                        <p className="font-mono text-sm">{testResults.utmCampaign}</p>
                      </div>
                    )}
                    {testResults.utmTerm && (
                      <div>
                        <span className="text-sm text-muted-foreground">utm_term:</span>
                        <p className="font-mono text-sm">{testResults.utmTerm}</p>
                      </div>
                    )}
                    {testResults.utmContent && (
                      <div>
                        <span className="text-sm text-muted-foreground">utm_content:</span>
                        <p className="font-mono text-sm">{testResults.utmContent}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No UTM parameters found in URL</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Leads with UTM */}
        <Card data-testid="card-recent-leads">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Leads with Attribution</CardTitle>
                <CardDescription>
                  Last 10 form submissions with UTM tracking data
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {paidSearchLeads} Paid
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetchLeads()}
                  data-testid="button-refresh-leads"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {recentLeadsWithUTM.length > 0 ? (
              <div className="space-y-3">
                {recentLeadsWithUTM.map((lead) => (
                  <div
                    key={lead.id}
                    className="border rounded-lg p-4 space-y-2"
                    data-testid={`lead-${lead.id}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{lead.name || `Lead #${lead.id}`}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {lead.utmSource && (
                        <Badge variant="secondary" className="text-xs">
                          Source: {lead.utmSource}
                        </Badge>
                      )}
                      {lead.utmMedium && (
                        <Badge variant="secondary" className="text-xs">
                          Medium: {lead.utmMedium}
                        </Badge>
                      )}
                      {lead.utmCampaign && (
                        <Badge variant="secondary" className="text-xs">
                          Campaign: {lead.utmCampaign}
                        </Badge>
                      )}
                      {lead.utmTerm && (
                        <Badge variant="secondary" className="text-xs">
                          Keyword: {lead.utmTerm}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No leads with UTM attribution yet</p>
                <p className="text-sm mt-2">
                  Leads will appear here once you configure Google Ads UTM parameters
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle>External Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              asChild
              data-testid="button-clarity-dashboard"
            >
              <a
                href="https://clarity.microsoft.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Microsoft Clarity Dashboard
              </a>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              asChild
              data-testid="button-google-ads"
            >
              <a
                href="https://ads.google.com/aw/settings/tracking"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Configure Google Ads Tracking
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
