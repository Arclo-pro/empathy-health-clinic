import pandas as pd
from caas_jupyter_tools import display_dataframe_to_user

# Path to your uploaded Screaming Frog export
CSV_PATH = "attached_assets/internal_all_1762887563969.csv"

# Read the CSV
df = pd.read_csv(CSV_PATH)

# Normalize column names
df.columns = [c.strip().lower() for c in df.columns]

# Identify the common Screaming Frog columns
url_col = next((c for c in df.columns if "address" in c or "url" in c), None)
status_col = next((c for c in df.columns if "status" in c), None)
title_col = next((c for c in df.columns if "title" in c), None)
h1_col = next((c for c in df.columns if "h1" in c), None)
meta_col = next((c for c in df.columns if "meta" in c), None)
word_col = next((c for c in df.columns if "word" in c and "count" in c), None)

core_cols = [x for x in [url_col, status_col, title_col, h1_col, meta_col, word_col] if x]
df_core = df[core_cols].copy()
df_core.rename(columns={
    url_col: "url",
    status_col: "status",
    title_col: "title",
    h1_col: "h1",
    meta_col: "meta_desc",
    word_col: "wordcount"
}, inplace=True)

# Add issue flags
def flag(row):
    issues = []
    if pd.notna(row.get("status")) and row["status"] >= 400:
        issues.append("http-error")
    if not row.get("title"): issues.append("missing-title")
    if not row.get("h1"): issues.append("missing-h1")
    if not row.get("meta_desc"): issues.append("missing-meta")
    if pd.notna(row.get("wordcount")) and row["wordcount"] < 500:
        issues.append("thin-content")
    return ",".join(issues)

df_core["issues"] = df_core.apply(flag, axis=1)
df_core.to_csv("tech_audit.csv", index=False)

display_dataframe_to_user("Parsed Screaming Frog Crawl (tech audit)", df_core.head(20))
print(f"✅ Wrote tech_audit.csv with {len(df_core)} pages")
