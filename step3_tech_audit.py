# step3_tech_audit.py
import os, pandas as pd
from urllib.parse import urljoin
from psi import batch_psi
from crawl_light import audit_url

SITE = os.getenv("SITE_URL","https://empathyhealthclinic.com").rstrip("/")
TASKS_IN = "tasks_enriched.csv" if os.path.exists("tasks_enriched.csv") else "tasks.csv"
TECH_OUT = "tech_audit.csv"
TASKS_OUT = "tasks_with_tech.csv"

# 1) Build the URL set:
#    - top pages from GSC export (step1 wrote gsc_pages_queries.csv)
#    - ensure /services/* and homepage always included
urls = set()
if os.path.exists("gsc_pages_queries.csv"):
    gdf = pd.read_csv("gsc_pages_queries.csv")
    if "page" in gdf.columns:
        top = (gdf.groupby("page")["impressions"].sum().sort_values(ascending=False).head(60).index.tolist())
        for u in top: 
            if isinstance(u,str) and u.startswith("http"):
                urls.add(u)
urls.add(SITE+"/")
urls.add(SITE+"/services")
# Add common service slugs if present
for slug in ["psychiatry","adhd-psychiatry","anxiety-therapy","medication-management","telepsychiatry","therapy"]:
    urls.add(f"{SITE}/{slug}")

# Add 8 new Orlando pages
for slug in ["psychiatrist-orlando","adhd-psychiatrist-orlando","anxiety-psychiatrist-orlando",
             "child-psychiatrist-orlando","bipolar-psychiatrist-orlando","medication-management-orlando",
             "telepsychiatry-orlando","same-day-psychiatrist-orlando"]:
    urls.add(f"{SITE}/{slug}")

urls = [u for u in urls if u.startswith(SITE)]

# 2) PSI + crawl
psi_rows = batch_psi(urls, pause=1.5)
psi_df = pd.DataFrame(psi_rows)
crawl_rows = [audit_url(u) for u in urls]
crawl_df = pd.DataFrame(crawl_rows)

tech = psi_df.merge(crawl_df, on="url", how="outer")

# 3) Create fix flags
def flag(row):
    issues=[]
    if pd.notna(row.get("perf_score")) and row["perf_score"]<70: issues.append("slow-mobile")
    if pd.notna(row.get("lcp_ms")) and row["lcp_ms"]>3500: issues.append("high-LCP")
    if pd.notna(row.get("tbt_ms")) and row["tbt_ms"]>300: issues.append("high-TBT")
    if pd.notna(row.get("cls")) and row["cls"]>0.1: issues.append("high-CLS")
    if pd.notna(row.get("status")) and row["status"]>=400: issues.append("http-error")
    if not row.get("title"): issues.append("missing-title")
    if not row.get("h1"): issues.append("missing-h1")
    if not row.get("meta_desc"): issues.append("missing-meta")
    if row.get("wordcount",0)<500: issues.append("thin-content")
    return ",".join(issues)

tech["issues"] = tech.apply(flag, axis=1)
tech.to_csv(TECH_OUT, index=False)

# 4) Merge into tasks and append tech-fix tasks
tasks = pd.read_csv(TASKS_IN)
fix_rows=[]
for _, r in tech.iterrows():
    if r["issues"]:
        fix_rows.append({
            "type":"tech-fix",
            "target_query":"(n/a)",
            "suggested_url": r["url"],
            "rationale": f"Issues: {r['issues']}",
            "serp_position": None,
            "serp_url": None,
            "refined_action": "tech-fix",
            "rank_on_wrong_url": False
        })
fix_df = pd.DataFrame(fix_rows)
merged = pd.concat([tasks, fix_df], ignore_index=True)
merged.to_csv(TASKS_OUT, index=False)
print(f"Wrote {TECH_OUT} and {TASKS_OUT} with {len(fix_rows)} tech tasks")
