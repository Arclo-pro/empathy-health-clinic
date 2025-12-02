import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLocation } from "wouter";
import { ArrowLeft, Search, RefreshCw, Download, TrendingUp, TrendingDown, Minus, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RankingResult {
  keyword: string;
  position: number | null;
  url: string | null;
  competitor_positions?: {
    [domain: string]: number | null;
  };
  lastChecked?: string;
  error?: string;
}

const KEYWORDS = [
  "psychiatrist orlando",
  "psychiatry orlando",
  "psychiatrist winter park",
  "psychiatry winter park",
  "psychiatrist near me",
  "psychiatry near me",
  "mental health psychiatrist orlando",
  "mental health clinic orlando",
  "psychiatric clinic orlando",
  "psychiatric services orlando",
  "psychiatric evaluation orlando",
  "psychiatric assessment orlando",
  "psychiatric medication orlando",
  "psychiatrist accepting new patients orlando",
  "psychiatry accepting new patients orlando",
  "same day psychiatrist orlando",
  "same day psychiatry orlando",
  "walk in psychiatrist orlando",
  "urgent psychiatrist orlando",
  "emergency psychiatrist orlando",
  "telepsychiatry orlando",
  "online psychiatrist orlando",
  "online psychiatry orlando",
  "online psychiatrist florida",
  "online psychiatry florida",
  "virtual psychiatrist orlando",
  "virtual psychiatry orlando",
  "best psychiatrist orlando",
  "top rated psychiatrist orlando",
  "adult psychiatrist orlando",
  "family psychiatrist orlando",
  "medication management orlando",
  "medication management psychiatry orlando",
  "mental health medication orlando",
  "anxiety psychiatrist orlando",
  "anxiety treatment orlando",
  "anxiety therapy orlando",
  "anxiety medication orlando",
  "adhd psychiatrist orlando",
  "adhd psychiatry orlando",
  "adhd evaluation orlando",
  "adhd testing orlando",
  "adhd treatment orlando",
  "adhd medication orlando",
  "depression psychiatrist orlando",
  "depression psychiatry orlando",
  "depression treatment orlando",
  "depression medication orlando",
  "bipolar psychiatrist orlando",
  "bipolar psychiatry orlando",
  "bipolar treatment orlando",
  "ptsd psychiatrist orlando",
  "ptsd psychiatry orlando",
  "ptsd treatment orlando",
  "ocd psychiatrist orlando",
  "ocd psychiatry orlando",
  "schizophrenia psychiatrist orlando",
  "schizophrenia treatment orlando",
  "panic attack psychiatrist orlando",
  "panic disorder psychiatrist orlando",
  "insomnia psychiatrist orlando",
  "sleep medication psychiatrist orlando",
  "mental health doctor orlando",
  "behavioral health orlando psychiatrist",
  "psychiatrist orlando accepts insurance",
  "psychiatry orlando accepts insurance",
  "psychiatrist orlando accepts cigna",
  "psychiatry orlando accepts cigna",
  "psychiatrist orlando accepts aetna",
  "psychiatry orlando accepts aetna",
  "psychiatrist orlando accepts bcbs",
  "psychiatry orlando accepts bcbs",
  "psychiatrist orlando accepts umr",
  "psychiatry orlando accepts umr",
  "psychiatrist orlando accepts united healthcare",
  "psychiatry orlando accepts united healthcare",
  "psychiatrist orlando accepts medicare",
  "psychiatry orlando accepts medicare",
  "psychiatrist orlando accepts medicaid",
  "psychiatry orlando accepts medicaid",
  "local psychiatrist orlando",
  "affordable psychiatrist orlando",
  "low cost psychiatrist orlando",
  "private psychiatrist orlando",
  "psychiatrist near ucf",
  "psychiatrist near lake nona",
  "psychiatrist near winter park",
  "psychiatrist near downtown orlando",
  "mental health provider orlando",
  "psychiatrist for anxiety near me",
  "psychiatrist for depression near me",
  "psychiatrist specializing in adhd orlando",
  "psychiatrist specializing in anxiety orlando",
  "psychiatrist specializing in depression orlando",
  "trauma psychiatrist orlando",
];

export default function AdminSERP() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [rankings, setRankings] = useState<Map<string, RankingResult>>(new Map());
  const [isChecking, setIsChecking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState<"keyword" | "position">("keyword");

  useEffect(() => {
    const saved = localStorage.getItem("serp_rankings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setRankings(new Map(Object.entries(parsed)));
      } catch (e) {
        console.error("Failed to load saved rankings:", e);
      }
    }
  }, []);

  const saveRankings = (newRankings: Map<string, RankingResult>) => {
    const obj = Object.fromEntries(newRankings);
    localStorage.setItem("serp_rankings", JSON.stringify(obj));
  };

  const checkSingleKeyword = async (keyword: string): Promise<RankingResult> => {
    try {
      const response = await fetch(`/api/serp/ranking?q=${encodeURIComponent(keyword)}`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || "Failed to fetch ranking");
      }
      
      return {
        keyword,
        position: data.position,
        url: data.url,
        competitor_positions: data.competitor_positions,
        lastChecked: new Date().toISOString(),
      };
    } catch (error: any) {
      return {
        keyword,
        position: null,
        url: null,
        error: error.message,
        lastChecked: new Date().toISOString(),
      };
    }
  };

  const checkAllKeywords = async () => {
    setIsChecking(true);
    setProgress(0);
    
    const newRankings = new Map(rankings);
    
    for (let i = 0; i < KEYWORDS.length; i++) {
      const keyword = KEYWORDS[i];
      setCurrentKeyword(keyword);
      setProgress(((i + 1) / KEYWORDS.length) * 100);
      
      const result = await checkSingleKeyword(keyword);
      newRankings.set(keyword, result);
      setRankings(new Map(newRankings));
      saveRankings(newRankings);
      
      if (i < KEYWORDS.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    }
    
    setIsChecking(false);
    setCurrentKeyword("");
    toast({
      title: "Rankings Updated",
      description: `Checked ${KEYWORDS.length} keywords successfully.`,
    });
  };

  const checkSelectedKeywords = async (keywords: string[]) => {
    setIsChecking(true);
    setProgress(0);
    
    const newRankings = new Map(rankings);
    
    for (let i = 0; i < keywords.length; i++) {
      const keyword = keywords[i];
      setCurrentKeyword(keyword);
      setProgress(((i + 1) / keywords.length) * 100);
      
      const result = await checkSingleKeyword(keyword);
      newRankings.set(keyword, result);
      setRankings(new Map(newRankings));
      saveRankings(newRankings);
      
      if (i < keywords.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    }
    
    setIsChecking(false);
    setCurrentKeyword("");
    toast({
      title: "Rankings Updated",
      description: `Checked ${keywords.length} keywords successfully.`,
    });
  };

  const exportCSV = () => {
    const headers = ["Keyword", "Position", "URL", "Healing Psychiatry", "MyMindCare", "Orlando Health", "Last Checked"];
    const rows = KEYWORDS.map(keyword => {
      const data = rankings.get(keyword);
      return [
        keyword,
        data?.position ?? "Not checked",
        data?.url ?? "",
        data?.competitor_positions?.["healingpsychiatryflorida.com"] ?? "",
        data?.competitor_positions?.["mymindcarecenter.com"] ?? "",
        data?.competitor_positions?.["orlandohealth.com"] ?? "",
        data?.lastChecked ? new Date(data.lastChecked).toLocaleString() : "",
      ].join(",");
    });
    
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `serp_rankings_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const filteredKeywords = KEYWORDS.filter(k => 
    k.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedKeywords = [...filteredKeywords].sort((a, b) => {
    if (sortBy === "position") {
      const posA = rankings.get(a)?.position ?? 999;
      const posB = rankings.get(b)?.position ?? 999;
      return posA - posB;
    }
    return a.localeCompare(b);
  });

  const getPositionBadge = (position: number | null | undefined) => {
    if (position === null || position === undefined) {
      return <Badge variant="outline" className="bg-muted">Not checked</Badge>;
    }
    if (position <= 3) {
      return <Badge className="bg-green-600 text-white">{position}</Badge>;
    }
    if (position <= 10) {
      return <Badge className="bg-blue-600 text-white">{position}</Badge>;
    }
    if (position <= 20) {
      return <Badge className="bg-yellow-600 text-white">{position}</Badge>;
    }
    return <Badge variant="destructive">{position}+</Badge>;
  };

  const stats = {
    top3: KEYWORDS.filter(k => {
      const pos = rankings.get(k)?.position;
      return pos !== null && pos !== undefined && pos <= 3;
    }).length,
    top10: KEYWORDS.filter(k => {
      const pos = rankings.get(k)?.position;
      return pos !== null && pos !== undefined && pos <= 10;
    }).length,
    top20: KEYWORDS.filter(k => {
      const pos = rankings.get(k)?.position;
      return pos !== null && pos !== undefined && pos <= 20;
    }).length,
    notRanking: KEYWORDS.filter(k => {
      const data = rankings.get(k);
      return data && data.position === null && !data.error;
    }).length,
    checked: KEYWORDS.filter(k => rankings.has(k)).length,
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/admin")}
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-sans font-medium">SERP Rankings Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={exportCSV}
              disabled={stats.checked === 0}
              data-testid="button-export"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button
              onClick={checkAllKeywords}
              disabled={isChecking}
              data-testid="button-check-all"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isChecking ? "animate-spin" : ""}`} />
              {isChecking ? "Checking..." : "Check All Rankings"}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {isChecking && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-2">
                <RefreshCw className="w-5 h-5 animate-spin text-primary" />
                <span className="font-medium">Checking: {currentKeyword}</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                {Math.round(progress)}% complete ({Math.round(progress / 100 * KEYWORDS.length)}/{KEYWORDS.length} keywords)
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Rate limited to avoid API throttling. Estimated time: {Math.round((KEYWORDS.length - Math.round(progress / 100 * KEYWORDS.length)) * 1.5 / 60)} minutes remaining.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-green-600">{stats.top3}</div>
              <div className="text-sm text-muted-foreground">Top 3</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-blue-600">{stats.top10}</div>
              <div className="text-sm text-muted-foreground">Top 10</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-yellow-600">{stats.top20}</div>
              <div className="text-sm text-muted-foreground">Top 20</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-red-600">{stats.notRanking}</div>
              <div className="text-sm text-muted-foreground">Not in Top 20</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold">{stats.checked}/{KEYWORDS.length}</div>
              <div className="text-sm text-muted-foreground">Checked</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle>100 Target Keywords</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Filter keywords..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="pl-9 w-64"
                    data-testid="input-filter"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortBy(sortBy === "keyword" ? "position" : "keyword")}
                  data-testid="button-sort"
                >
                  Sort by: {sortBy === "keyword" ? "Keyword" : "Position"}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-medium">Keyword</th>
                    <th className="text-center py-3 px-2 font-medium">Position</th>
                    <th className="text-left py-3 px-2 font-medium hidden md:table-cell">Ranking URL</th>
                    <th className="text-center py-3 px-2 font-medium hidden lg:table-cell">Competitors</th>
                    <th className="text-center py-3 px-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedKeywords.map((keyword) => {
                    const data = rankings.get(keyword);
                    return (
                      <tr key={keyword} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2">
                          <span className="font-medium">{keyword}</span>
                          {data?.lastChecked && (
                            <div className="text-xs text-muted-foreground">
                              {new Date(data.lastChecked).toLocaleDateString()}
                            </div>
                          )}
                        </td>
                        <td className="text-center py-3 px-2">
                          {getPositionBadge(data?.position)}
                        </td>
                        <td className="py-3 px-2 hidden md:table-cell">
                          {data?.url ? (
                            <a 
                              href={data.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:underline text-xs truncate block max-w-xs"
                            >
                              {data.url.replace("https://empathyhealthclinic.com", "")}
                            </a>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="py-3 px-2 hidden lg:table-cell">
                          {data?.competitor_positions && (
                            <div className="flex gap-2 justify-center text-xs">
                              {Object.entries(data.competitor_positions).map(([domain, pos]) => (
                                <span key={domain} className="text-muted-foreground">
                                  {domain.split(".")[0]}: {pos ?? "-"}
                                </span>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="text-center py-3 px-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => checkSelectedKeywords([keyword])}
                            disabled={isChecking}
                            data-testid={`button-check-${keyword.replace(/\s+/g, "-")}`}
                          >
                            <RefreshCw className="w-3 h-3" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-600 text-white">1-3</Badge>
                <span className="text-sm">Top 3 (Excellent)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-600 text-white">4-10</Badge>
                <span className="text-sm">Page 1 (Good)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-yellow-600 text-white">11-20</Badge>
                <span className="text-sm">Page 2 (Needs Work)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="destructive">20+</Badge>
                <span className="text-sm">Not in Top 20</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-muted">-</Badge>
                <span className="text-sm">Not Checked</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
