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

interface KeywordData {
  keyword: string;
  volume: number; // Estimated monthly search volume
  priority: "critical" | "high" | "medium" | "low";
  category: "core" | "condition" | "insurance" | "location" | "service" | "intent";
  notes?: string;
}

// Keywords with estimated search volumes and priority scores
// All keywords are within 20-mile radius of Orlando or geo-targeted "near me" searches
const KEYWORD_DATA: KeywordData[] = [
  // CRITICAL - Highest volume, highest intent keywords
  { keyword: "psychiatrist near me", volume: 49500, priority: "critical", category: "intent", notes: "Top priority - highest intent" },
  { keyword: "psychiatrist orlando", volume: 2900, priority: "critical", category: "core", notes: "Primary geo target" },
  { keyword: "psychiatry orlando", volume: 720, priority: "critical", category: "core" },
  { keyword: "mental health clinic orlando", volume: 590, priority: "critical", category: "core" },
  { keyword: "psychiatric clinic orlando", volume: 390, priority: "critical", category: "core" },
  
  // HIGH - Strong volume or high conversion intent
  { keyword: "psychiatrist accepting new patients orlando", volume: 480, priority: "high", category: "intent", notes: "High conversion" },
  { keyword: "adhd psychiatrist orlando", volume: 590, priority: "high", category: "condition" },
  { keyword: "anxiety psychiatrist orlando", volume: 480, priority: "high", category: "condition" },
  { keyword: "depression psychiatrist orlando", volume: 390, priority: "high", category: "condition" },
  { keyword: "medication management orlando", volume: 480, priority: "high", category: "service" },
  { keyword: "telepsychiatry orlando", volume: 320, priority: "high", category: "service" },
  { keyword: "online psychiatrist orlando", volume: 390, priority: "high", category: "service" },
  { keyword: "best psychiatrist orlando", volume: 320, priority: "high", category: "intent" },
  { keyword: "psychiatrist winter park", volume: 260, priority: "high", category: "location" },
  { keyword: "same day psychiatrist orlando", volume: 210, priority: "high", category: "intent", notes: "Urgent care" },
  { keyword: "psychiatrist for anxiety near me", volume: 1300, priority: "high", category: "intent" },
  { keyword: "psychiatrist for depression near me", volume: 880, priority: "high", category: "intent" },
  
  // MEDIUM - Moderate volume, good intent
  { keyword: "psychiatric evaluation orlando", volume: 210, priority: "medium", category: "service" },
  { keyword: "psychiatric services orlando", volume: 170, priority: "medium", category: "service" },
  { keyword: "mental health psychiatrist orlando", volume: 170, priority: "medium", category: "core" },
  { keyword: "adhd testing orlando", volume: 320, priority: "medium", category: "condition" },
  { keyword: "adhd evaluation orlando", volume: 260, priority: "medium", category: "condition" },
  { keyword: "anxiety treatment orlando", volume: 320, priority: "medium", category: "condition" },
  { keyword: "depression treatment orlando", volume: 260, priority: "medium", category: "condition" },
  { keyword: "bipolar psychiatrist orlando", volume: 170, priority: "medium", category: "condition" },
  { keyword: "ptsd psychiatrist orlando", volume: 140, priority: "medium", category: "condition" },
  { keyword: "virtual psychiatrist orlando", volume: 170, priority: "medium", category: "service" },
  { keyword: "psychiatrist orlando accepts insurance", volume: 140, priority: "medium", category: "insurance" },
  { keyword: "psychiatrist orlando accepts bcbs", volume: 110, priority: "medium", category: "insurance" },
  { keyword: "psychiatrist orlando accepts cigna", volume: 90, priority: "medium", category: "insurance" },
  { keyword: "psychiatrist orlando accepts aetna", volume: 90, priority: "medium", category: "insurance" },
  { keyword: "psychiatrist orlando accepts united healthcare", volume: 90, priority: "medium", category: "insurance" },
  { keyword: "psychiatrist near ucf", volume: 110, priority: "medium", category: "location", notes: "College students" },
  { keyword: "psychiatrist near lake nona", volume: 70, priority: "medium", category: "location" },
  { keyword: "psychiatrist near downtown orlando", volume: 90, priority: "medium", category: "location" },
  { keyword: "trauma psychiatrist orlando", volume: 140, priority: "medium", category: "condition" },
  { keyword: "urgent psychiatrist orlando", volume: 110, priority: "medium", category: "intent" },
  { keyword: "walk in psychiatrist orlando", volume: 90, priority: "medium", category: "intent" },
  { keyword: "adult psychiatrist orlando", volume: 110, priority: "medium", category: "service" },
  { keyword: "mental health doctor orlando", volume: 210, priority: "medium", category: "core" },
  
  // LOW - Lower volume but still relevant
  { keyword: "psychiatry near me", volume: 1900, priority: "low", category: "intent" },
  { keyword: "psychiatry winter park", volume: 70, priority: "low", category: "location" },
  { keyword: "psychiatric assessment orlando", volume: 50, priority: "low", category: "service" },
  { keyword: "psychiatric medication orlando", volume: 70, priority: "low", category: "service" },
  { keyword: "psychiatry accepting new patients orlando", volume: 70, priority: "low", category: "intent" },
  { keyword: "same day psychiatry orlando", volume: 50, priority: "low", category: "intent" },
  { keyword: "emergency psychiatrist orlando", volume: 70, priority: "low", category: "intent" },
  { keyword: "online psychiatry orlando", volume: 70, priority: "low", category: "service" },
  { keyword: "online psychiatrist florida", volume: 260, priority: "low", category: "service" },
  { keyword: "online psychiatry florida", volume: 90, priority: "low", category: "service" },
  { keyword: "virtual psychiatry orlando", volume: 50, priority: "low", category: "service" },
  { keyword: "top rated psychiatrist orlando", volume: 70, priority: "low", category: "intent" },
  { keyword: "family psychiatrist orlando", volume: 50, priority: "low", category: "service" },
  { keyword: "medication management psychiatry orlando", volume: 50, priority: "low", category: "service" },
  { keyword: "mental health medication orlando", volume: 70, priority: "low", category: "service" },
  { keyword: "anxiety therapy orlando", volume: 170, priority: "low", category: "condition" },
  { keyword: "anxiety medication orlando", volume: 90, priority: "low", category: "condition" },
  { keyword: "adhd psychiatry orlando", volume: 50, priority: "low", category: "condition" },
  { keyword: "adhd treatment orlando", volume: 170, priority: "low", category: "condition" },
  { keyword: "adhd medication orlando", volume: 110, priority: "low", category: "condition" },
  { keyword: "depression psychiatry orlando", volume: 50, priority: "low", category: "condition" },
  { keyword: "depression medication orlando", volume: 70, priority: "low", category: "condition" },
  { keyword: "bipolar psychiatry orlando", volume: 30, priority: "low", category: "condition" },
  { keyword: "bipolar treatment orlando", volume: 70, priority: "low", category: "condition" },
  { keyword: "ptsd psychiatry orlando", volume: 30, priority: "low", category: "condition" },
  { keyword: "ptsd treatment orlando", volume: 90, priority: "low", category: "condition" },
  { keyword: "ocd psychiatrist orlando", volume: 70, priority: "low", category: "condition" },
  { keyword: "ocd psychiatry orlando", volume: 30, priority: "low", category: "condition" },
  { keyword: "schizophrenia psychiatrist orlando", volume: 50, priority: "low", category: "condition" },
  { keyword: "schizophrenia treatment orlando", volume: 50, priority: "low", category: "condition" },
  { keyword: "panic attack psychiatrist orlando", volume: 50, priority: "low", category: "condition" },
  { keyword: "panic disorder psychiatrist orlando", volume: 30, priority: "low", category: "condition" },
  { keyword: "insomnia psychiatrist orlando", volume: 50, priority: "low", category: "condition" },
  { keyword: "sleep medication psychiatrist orlando", volume: 30, priority: "low", category: "condition" },
  { keyword: "behavioral health orlando psychiatrist", volume: 50, priority: "low", category: "core" },
  { keyword: "psychiatry orlando accepts insurance", volume: 30, priority: "low", category: "insurance" },
  { keyword: "psychiatry orlando accepts cigna", volume: 20, priority: "low", category: "insurance" },
  { keyword: "psychiatry orlando accepts aetna", volume: 20, priority: "low", category: "insurance" },
  { keyword: "psychiatry orlando accepts bcbs", volume: 20, priority: "low", category: "insurance" },
  { keyword: "psychiatrist orlando accepts umr", volume: 30, priority: "low", category: "insurance" },
  { keyword: "psychiatry orlando accepts umr", volume: 10, priority: "low", category: "insurance" },
  { keyword: "psychiatry orlando accepts united healthcare", volume: 20, priority: "low", category: "insurance" },
  { keyword: "psychiatrist orlando accepts medicare", volume: 70, priority: "low", category: "insurance" },
  { keyword: "psychiatry orlando accepts medicare", volume: 20, priority: "low", category: "insurance" },
  { keyword: "psychiatrist orlando accepts medicaid", volume: 50, priority: "low", category: "insurance" },
  { keyword: "psychiatry orlando accepts medicaid", volume: 20, priority: "low", category: "insurance" },
  { keyword: "local psychiatrist orlando", volume: 50, priority: "low", category: "intent" },
  { keyword: "affordable psychiatrist orlando", volume: 70, priority: "low", category: "intent" },
  { keyword: "low cost psychiatrist orlando", volume: 50, priority: "low", category: "intent" },
  { keyword: "private psychiatrist orlando", volume: 50, priority: "low", category: "service" },
  { keyword: "psychiatrist near winter park", volume: 50, priority: "low", category: "location" },
  { keyword: "mental health provider orlando", volume: 90, priority: "low", category: "core" },
  { keyword: "psychiatrist specializing in adhd orlando", volume: 50, priority: "low", category: "condition" },
  { keyword: "psychiatrist specializing in anxiety orlando", volume: 50, priority: "low", category: "condition" },
  { keyword: "psychiatrist specializing in depression orlando", volume: 50, priority: "low", category: "condition" },
];

const KEYWORDS = KEYWORD_DATA.map(k => k.keyword);

export default function AdminSERP() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [rankings, setRankings] = useState<Map<string, RankingResult>>(new Map());
  const [isChecking, setIsChecking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState<"keyword" | "position" | "volume" | "priority">("priority");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

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

  const checkSingleKeyword = async (keyword: string, retries = 2): Promise<RankingResult> => {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);
        
        const response = await fetch(`/api/serp/ranking?q=${encodeURIComponent(keyword)}`, {
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        
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
        if (attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, 2000));
          continue;
        }
        return {
          keyword,
          position: null,
          url: null,
          error: error.message,
          lastChecked: new Date().toISOString(),
        };
      }
    }
    return {
      keyword,
      position: null,
      url: null,
      error: "Max retries exceeded",
      lastChecked: new Date().toISOString(),
    };
  };

  const checkAllKeywords = async () => {
    setIsChecking(true);
    setProgress(0);
    
    const newRankings = new Map(rankings);
    const BATCH_SIZE = 3; // Conservative batch size to respect API limits
    
    for (let i = 0; i < KEYWORDS.length; i += BATCH_SIZE) {
      const batch = KEYWORDS.slice(i, i + BATCH_SIZE);
      setCurrentKeyword(`Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.join(", ").substring(0, 50)}...`);
      
      const results = await Promise.all(batch.map(keyword => checkSingleKeyword(keyword)));
      
      results.forEach((result) => {
        newRankings.set(result.keyword, result);
      });
      
      setRankings(new Map(newRankings));
      saveRankings(newRankings);
      setProgress(((i + batch.length) / KEYWORDS.length) * 100);
      
      if (i + BATCH_SIZE < KEYWORDS.length) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // 5 second delay between batches
      }
    }
    
    setIsChecking(false);
    setCurrentKeyword("");
    toast({
      title: "Rankings Updated",
      description: `Checked ${KEYWORDS.length} keywords successfully.`,
    });
  };

  const checkUncheckedOnly = async () => {
    // Find keywords that either:
    // 1. Don't exist in rankings map
    // 2. Have an error
    // 3. Have null/undefined position (not found in search results)
    const unchecked = KEYWORDS.filter(k => {
      const ranking = rankings.get(k);
      if (!ranking) return true; // Not in map
      if (ranking.error) return true; // Has error
      if (ranking.position === null || ranking.position === undefined) return true; // No position data
      return false;
    });
    
    if (unchecked.length === 0) {
      toast({
        title: "All Checked",
        description: "All keywords have valid position data.",
      });
      return;
    }
    
    // Limit to 5 keywords at a time to avoid API overload
    const toCheck = unchecked.slice(0, 5);
    toast({
      title: "Checking Rankings",
      description: `Checking ${toCheck.length} of ${unchecked.length} unchecked keywords...`,
    });
    
    await checkSelectedKeywords(toCheck);
  };

  const clearCache = () => {
    localStorage.removeItem("serp_rankings");
    setRankings(new Map());
    toast({
      title: "Cache Cleared",
      description: "All saved rankings have been cleared.",
    });
  };

  const checkSelectedKeywords = async (keywords: string[]) => {
    setIsChecking(true);
    setProgress(0);
    
    const newRankings = new Map(rankings);
    const BATCH_SIZE = 3;
    let successCount = 0;
    let errorCount = 0;
    let lastError = "";
    
    for (let i = 0; i < keywords.length; i += BATCH_SIZE) {
      const batch = keywords.slice(i, i + BATCH_SIZE);
      setCurrentKeyword(`Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.join(", ").substring(0, 50)}...`);
      
      const results = await Promise.all(batch.map(keyword => checkSingleKeyword(keyword)));
      
      results.forEach((result) => {
        newRankings.set(result.keyword, result);
        if (result.error) {
          errorCount++;
          lastError = result.error;
        } else if (result.position !== null) {
          successCount++;
        }
      });
      
      setRankings(new Map(newRankings));
      saveRankings(newRankings);
      setProgress(((i + batch.length) / keywords.length) * 100);
      
      if (i + BATCH_SIZE < keywords.length) {
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
    
    setIsChecking(false);
    setCurrentKeyword("");
    
    if (errorCount > 0) {
      toast({
        title: "API Errors Occurred",
        description: `${errorCount} keywords failed. Error: ${lastError}. You may be out of API credits or rate limited.`,
        variant: "destructive",
      });
    } else if (successCount > 0) {
      toast({
        title: "Rankings Updated",
        description: `Found rankings for ${successCount} of ${keywords.length} keywords.`,
      });
    } else {
      toast({
        title: "No Rankings Found",
        description: `None of the ${keywords.length} keywords rank in top 20 results.`,
      });
    }
  };

  const exportCSV = () => {
    const headers = ["Keyword", "Volume", "Priority", "Category", "Position", "URL", "Healing Psychiatry", "MyMindCare", "Orlando Health", "Last Checked"];
    const rows = KEYWORD_DATA.map(kd => {
      const data = rankings.get(kd.keyword);
      return [
        kd.keyword,
        kd.volume,
        kd.priority,
        kd.category,
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

  const getKeywordData = (keyword: string): KeywordData | undefined => {
    return KEYWORD_DATA.find(k => k.keyword === keyword);
  };

  const filteredKeywords = KEYWORD_DATA.filter(kd => {
    const matchesText = kd.keyword.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = categoryFilter === "all" || kd.category === categoryFilter;
    const matchesPriority = priorityFilter === "all" || kd.priority === priorityFilter;
    return matchesText && matchesCategory && matchesPriority;
  }).map(kd => kd.keyword);

  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  
  const sortedKeywords = [...filteredKeywords].sort((a, b) => {
    const kdA = getKeywordData(a);
    const kdB = getKeywordData(b);
    
    if (sortBy === "position") {
      const posA = rankings.get(a)?.position ?? 999;
      const posB = rankings.get(b)?.position ?? 999;
      return posA - posB;
    }
    if (sortBy === "volume") {
      return (kdB?.volume ?? 0) - (kdA?.volume ?? 0);
    }
    if (sortBy === "priority") {
      const prioA = priorityOrder[kdA?.priority ?? "low"];
      const prioB = priorityOrder[kdB?.priority ?? "low"];
      if (prioA !== prioB) return prioA - prioB;
      return (kdB?.volume ?? 0) - (kdA?.volume ?? 0);
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
              onClick={clearCache}
              disabled={isChecking || stats.checked === 0}
              data-testid="button-clear"
            >
              Clear Cache
            </Button>
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
              variant="outline"
              onClick={checkUncheckedOnly}
              disabled={isChecking}
              data-testid="button-check-unchecked"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isChecking ? "animate-spin" : ""}`} />
              Check Unchecked Only
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
                Processing 3 keywords per batch with 5s delay. Estimated time: {Math.round(((KEYWORDS.length - Math.round(progress / 100 * KEYWORDS.length)) / 3) * 5 / 60)} minutes remaining.
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
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle>{KEYWORD_DATA.length} Target Keywords (Orlando 20mi radius)</CardTitle>
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
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-3 py-1.5 border rounded-md text-sm bg-background"
                  data-testid="select-priority"
                >
                  <option value="all">All Priorities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 border rounded-md text-sm bg-background"
                  data-testid="select-category"
                >
                  <option value="all">All Categories</option>
                  <option value="core">Core</option>
                  <option value="condition">Condition</option>
                  <option value="insurance">Insurance</option>
                  <option value="location">Location</option>
                  <option value="service">Service</option>
                  <option value="intent">Intent</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-1.5 border rounded-md text-sm bg-background"
                  data-testid="select-sort"
                >
                  <option value="priority">Sort: Priority</option>
                  <option value="volume">Sort: Volume</option>
                  <option value="position">Sort: Position</option>
                  <option value="keyword">Sort: A-Z</option>
                </select>
                <span className="text-sm text-muted-foreground ml-2">
                  Showing {filteredKeywords.length} of {KEYWORD_DATA.length} keywords
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-medium">Keyword</th>
                    <th className="text-center py-3 px-2 font-medium">Vol.</th>
                    <th className="text-center py-3 px-2 font-medium">Priority</th>
                    <th className="text-center py-3 px-2 font-medium hidden sm:table-cell">Category</th>
                    <th className="text-center py-3 px-2 font-medium">Position</th>
                    <th className="text-left py-3 px-2 font-medium hidden lg:table-cell">Ranking URL</th>
                    <th className="text-center py-3 px-2 font-medium hidden xl:table-cell">Competitors</th>
                    <th className="text-center py-3 px-2 font-medium">Check</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedKeywords.map((keyword) => {
                    const data = rankings.get(keyword);
                    const kd = getKeywordData(keyword);
                    const priorityColors = {
                      critical: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
                      high: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
                      medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
                      low: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
                    };
                    const categoryColors = {
                      core: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
                      condition: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                      insurance: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                      location: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
                      service: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
                      intent: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
                    };
                    return (
                      <tr key={keyword} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2">
                          <span className="font-medium">{keyword}</span>
                          {kd?.notes && (
                            <div className="text-xs text-muted-foreground">{kd.notes}</div>
                          )}
                        </td>
                        <td className="text-center py-3 px-2">
                          <span className="font-mono text-xs">{kd?.volume?.toLocaleString() ?? "-"}</span>
                        </td>
                        <td className="text-center py-3 px-2">
                          <Badge className={`text-xs ${priorityColors[kd?.priority ?? "low"]}`}>
                            {kd?.priority ?? "-"}
                          </Badge>
                        </td>
                        <td className="text-center py-3 px-2 hidden sm:table-cell">
                          <Badge variant="outline" className={`text-xs ${categoryColors[kd?.category ?? "core"]}`}>
                            {kd?.category ?? "-"}
                          </Badge>
                        </td>
                        <td className="text-center py-3 px-2">
                          {getPositionBadge(data?.position)}
                        </td>
                        <td className="py-3 px-2 hidden lg:table-cell">
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
                        <td className="py-3 px-2 hidden xl:table-cell">
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
