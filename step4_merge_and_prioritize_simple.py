#!/usr/bin/env python3
"""
Simplified merge & prioritize without pandas dependency.
Combines tasks, tech audit, and SERP data into prioritized tasks_final.csv
"""
import os, csv, re
from urllib.parse import urlparse
from collections import defaultdict

# ---- Input files ----
TASKS_BASE = "tasks_enriched.csv" if os.path.exists("tasks_enriched.csv") else (
             "tasks.csv" if os.path.exists("tasks.csv") else None)
TECH_AUDIT = "tech_audit.csv"
SERP_RANKS = "serp_ranks.csv" if os.path.exists("serp_ranks.csv") else None

# ---- Load CSV files ----
def load_csv(path):
    if not path or not os.path.exists(path):
        return []
    with open(path, 'r') as f:
        return list(csv.DictReader(f))

tasks = load_csv(TASKS_BASE)
tech = load_csv(TECH_AUDIT)
ranks = load_csv(SERP_RANKS)

print(f"Loaded: {len(tasks)} tasks, {len(tech)} tech audits, {len(ranks)} SERP ranks")

# ---- Normalize URLs ----
def norm_url(u):
    try:
        p = urlparse(str(u))
        return p._replace(fragment="", query="").geturl().rstrip("/")
    except:
        return str(u)

# Index tech audit by URL
tech_by_url = {}
for row in tech:
    url = norm_url(row.get("url", ""))
    if url:
        tech_by_url[url] = {
            "tech_url": row.get("url", ""),
            "tech_status": row.get("status", ""),
            "tech_title": row.get("title", ""),
            "tech_h1": row.get("h1", ""),
            "tech_meta_desc": row.get("meta_desc", ""),
            "tech_wordcount": row.get("wordcount", ""),
            "tech_issues": row.get("issues", "")
        }

# Index SERP ranks by query
ranks_by_query = {}
for row in ranks:
    query = row.get("query", "") or row.get("target_query", "")
    if query:
        ranks_by_query[query.lower()] = {
            "serp_position": row.get("position", "") or row.get("serp_position", ""),
            "serp_url": row.get("url", "") or row.get("serp_url", "")
        }

# ---- Merge data ----
merged = []
for task in tasks:
    row = dict(task)
    
    # Merge tech data
    suggested_url = norm_url(task.get("suggested_url", ""))
    if suggested_url in tech_by_url:
        row.update(tech_by_url[suggested_url])
    
    # Merge SERP data
    query = (task.get("target_query") or "").lower()
    if query in ranks_by_query:
        if not row.get("serp_position"):
            row["serp_position"] = ranks_by_query[query]["serp_position"]
        if not row.get("serp_url"):
            row["serp_url"] = ranks_by_query[query]["serp_url"]
    
    merged.append(row)

# ---- Calculate impact/effort/priority ----
def calc_impact(row):
    imp = 0
    
    # SERP position opportunity
    try:
        pos = int(row.get("serp_position", 0) or 0)
        if pos > 20: imp += 5
        elif 11 <= pos <= 20: imp += 4
        elif 4 <= pos <= 10: imp += 3
        elif 1 <= pos <= 3: imp += 2
    except:
        pass
    
    # Tech issues
    issues = row.get("tech_issues", "")
    if "http-error" in issues: imp += 6
    if "slow-mobile" in issues or "high-LCP" in issues: imp += 3
    if "high-TBT" in issues or "high-CLS" in issues: imp += 2
    if "thin-content" in issues: imp += 2
    if "missing-title" in issues or "missing-h1" in issues or "missing-meta" in issues: imp += 2
    
    return imp

def calc_effort(row):
    action = (row.get("refined_action") or row.get("type") or "").lower()
    if "create-landing" in action: return 3.0
    if "supporting-blog" in action: return 2.0
    if "improve-landing" in action: return 1.5
    if "tech-fix" in action:
        issues = row.get("tech_issues", "")
        return 2.5 if "http-error" in issues else 1.5
    return 1.0

for row in merged:
    imp = calc_impact(row)
    eff = calc_effort(row)
    row["impact"] = imp
    row["effort"] = eff
    row["priority_score"] = round(imp - 0.8 * eff, 2)
    row["action"] = row.get("refined_action") or row.get("type") or "improve-landing"

# ---- Sort by priority ----
merged.sort(key=lambda x: x.get("priority_score", 0), reverse=True)

# ---- Write tasks_final.csv ----
fieldnames = [
    "priority_score", "action", "target_query", "suggested_url",
    "serp_position", "serp_url", "rationale",
    "tech_url", "tech_status", "tech_title", "tech_h1", 
    "tech_meta_desc", "tech_wordcount", "tech_issues",
    "impact", "effort"
]

with open("tasks_final.csv", "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction='ignore')
    writer.writeheader()
    for row in merged:
        writer.writerow(row)

print(f"\n✓ Wrote tasks_final.csv ({len(merged)} tasks)")

# ---- Print summary ----
action_counts = defaultdict(int)
for row in merged:
    action_counts[row.get("action", "unknown")] += 1

print("\nTask Breakdown by Action:")
for action, count in sorted(action_counts.items(), key=lambda x: x[1], reverse=True):
    print(f"  {action}: {count}")

# Show top 5 priorities
print("\nTop 5 Priorities:")
print("-" * 100)
for i, row in enumerate(merged[:5], 1):
    score = row.get("priority_score", 0)
    action = row.get("action", "")
    query = row.get("target_query", "")
    url = row.get("suggested_url", "")
    issues = row.get("tech_issues", "none")
    print(f"{i}. [{score:>5.1f}] {action:<20} | {query:<30} | issues: {issues}")

print("\n" + "=" * 100)
print("Next: Open tasks_final.csv and work through top priorities!")
