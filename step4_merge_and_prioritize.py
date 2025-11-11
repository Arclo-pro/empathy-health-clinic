import os, re
import pandas as pd
from urllib.parse import urlparse

# ---- Inputs (only the ones you have will be used) ----
TASKS_BASE = "tasks_enriched.csv" if os.path.exists("tasks_enriched.csv") else (
             "tasks.csv" if os.path.exists("tasks.csv") else None)
TECH_AUDIT = "tech_audit.csv"       # from Step 5
SERP_RANKS = "serp_ranks.csv" if os.path.exists("serp_ranks.csv") else None
GSC_PAGES  = "gsc_pages_queries.csv" if os.path.exists("gsc_pages_queries.csv") else None

# ---- Load defensively ----
def load_csv(path):
    return pd.read_csv(path) if path and os.path.exists(path) else pd.DataFrame()

tasks = load_csv(TASKS_BASE)
tech  = load_csv(TECH_AUDIT)
ranks = load_csv(SERP_RANKS)
gsc   = load_csv(GSC_PAGES)

# Normalize tech columns
if len(tech):
    tech.columns = [c.strip().lower() for c in tech.columns]
    # map common names
    url_col   = next((c for c in tech.columns if c in ("url","address")), None)
    status    = next((c for c in tech.columns if "status" in c), None)
    title     = next((c for c in tech.columns if "title" in c), None)
    h1        = next((c for c in tech.columns if re.match(r"h1", c)), None)
    meta_desc = next((c for c in tech.columns if "meta" in c and "desc" in c), None)
    wordcount = next((c for c in tech.columns if "word" in c and "count" in c), None)
    issues    = "issues" if "issues" in tech.columns else None

    tech = tech.rename(columns={
        url_col: "url", status: "status", title: "title",
        h1: "h1", meta_desc: "meta_desc", wordcount: "wordcount"
    })

# Normalize ranks
if len(ranks):
    ranks.columns = [c.strip().lower() for c in ranks.columns]
    ranks = ranks.rename(columns={"query":"target_query","position":"serp_position","url":"serp_url"})

# If tasks is empty, build a minimal frame so we can still emit tech fixes
if tasks.empty:
    tasks = pd.DataFrame(columns=["type","target_query","suggested_url","rationale",
                                  "serp_position","serp_url","refined_action","rank_on_wrong_url"])

# ---- Merge tech onto tasks by suggested_url (fall back to homepage match) ----
def norm(u):
    try:
        p = urlparse(str(u))
        return p._replace(fragment="", query="").geturl().rstrip("/")
    except Exception:
        return str(u)

if "suggested_url" in tasks.columns and not tech.empty:
    tasks["suggested_url_norm"] = tasks["suggested_url"].map(norm)
    tech["url_norm"] = tech["url"].map(norm)
    merged = tasks.merge(tech.add_prefix("tech_"), left_on="suggested_url_norm", right_on="tech_url_norm", how="left")
else:
    merged = tasks.copy()
    if not tech.empty:
        # no suggested_url—attach homepage metrics if present
        site = os.getenv("SITE_URL","https://empathyhealthclinic.com").rstrip("/")
        home_row = tech.loc[tech["url"].map(norm)==site, :].add_prefix("tech_")
        if len(home_row):
            for col in home_row.columns:
                merged[col] = home_row.iloc[0][col]

# Merge SERP ranks (if any)
if len(ranks):
    merged = merged.merge(ranks[["target_query","serp_position","serp_url"]], on="target_query", how="left", suffixes=("","_serp2"))
    merged["serp_position"] = merged["serp_position"].fillna(merged.get("serp_position_serp2"))
    merged["serp_url"] = merged["serp_url"].fillna(merged.get("serp_url_serp2"))
    merged = merged.drop(columns=[c for c in merged.columns if c.endswith("_serp2")])

# ---- Scoring: Impact / Effort / Priority ----
def impact(row):
    imp = 0
    # Position-based content opportunity
    pos = row.get("serp_position")
    if pd.notna(pos):
        if pos > 20: imp += 5
        elif 11 <= pos <= 20: imp += 4
        elif 4 <= pos <= 10: imp += 3
        elif pos <= 3: imp += 2
    # Tech issues bump
    issues = str(row.get("tech_issues",""))
    if "http-error" in issues: imp += 6
    if "slow-mobile" in issues or "high-LCP" in issues: imp += 3
    if "high-TBT" in issues or "high-CLS" in issues: imp += 2
    if "thin-content" in issues: imp += 2
    if "missing-title" in issues or "missing-h1" in issues or "missing-meta" in issues: imp += 2
    return imp

def effort(row):
    t = (row.get("refined_action") or row.get("type") or "").lower()
    if "create-landing" in t: return 3.0
    if "supporting-blog" in t: return 2.0
    if "improve-landing" in t: return 1.5
    if "tech-fix" in t:
        issues = str(row.get("tech_issues",""))
        return 2.5 if "http-error" in issues else 1.5
    return 1.0

merged["impact"] = merged.apply(impact, axis=1)
merged["effort"] = merged.apply(effort, axis=1)
merged["priority_score"] = (merged["impact"] - 0.8*merged["effort"]).round(2)

# Friendly labels
merged["action"] = merged.apply(
    lambda r: (r.get("refined_action") or r.get("type") or "improve-landing"), axis=1
)

# ---- Output ----
OUT = "tasks_final.csv"
cols = [c for c in [
    "priority_score","action","target_query","suggested_url",
    "serp_position","serp_url","rationale",
    "tech_url","tech_status","tech_title","tech_h1","tech_meta_desc","tech_wordcount","tech_issues"
] if c in merged.columns]
merged.sort_values(["priority_score"], ascending=False).to_csv(OUT, index=False)

# Also print a compact summary
summary = (merged.assign(issues=merged.get("tech_issues","").fillna(""))
           .groupby("action").size().reset_index(name="count").sort_values("count", ascending=False))
print("Wrote", OUT)
print(summary.to_string(index=False))
