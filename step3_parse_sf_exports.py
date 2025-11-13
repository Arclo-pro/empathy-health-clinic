import os
import csv

# Path to Screaming Frog export (fetched from iCloud or manually uploaded)
CSV_PATH = "internal_all.csv" if os.path.exists("internal_all.csv") else "attached_assets/internal_all_1762887563969.csv"

# Read the CSV with flexible encoding
try:
    with open(CSV_PATH, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        rows = list(reader)
except UnicodeDecodeError:
    with open(CSV_PATH, 'r', encoding='latin-1') as f:
        reader = csv.DictReader(f)
        rows = list(reader)

if not rows:
    print("⚠️ No data rows in CSV")
    with open("tech_audit.csv", "w") as f:
        f.write("url,issues\n")
    exit(0)

# Normalize column names
normalized_rows = []
for row in rows:
    normalized_rows.append({k.strip().lower(): v for k, v in row.items()})

# Identify the common Screaming Frog columns
if normalized_rows:
    columns = normalized_rows[0].keys()
    url_col = next((c for c in columns if "address" in c or "url" in c), None)
    status_col = next((c for c in columns if "status" in c), None)
    title_col = next((c for c in columns if "title" in c), None)
    h1_col = next((c for c in columns if "h1" in c), None)
    meta_col = next((c for c in columns if "meta" in c and "description" in c), None)
    word_col = next((c for c in columns if "word" in c and "count" in c), None)
else:
    print("⚠️ No data in CSV")
    with open("tech_audit.csv", "w") as f:
        f.write("url,issues\n")
    exit(0)

# Add issue flags
def flag_issues(row):
    issues = []
    status = row.get(status_col, '')
    title = row.get(title_col, '')
    h1 = row.get(h1_col, '')
    meta_desc = row.get(meta_col, '')
    wordcount = row.get(word_col, '')
    
    # Check for HTTP errors
    if status and status.strip():
        try:
            if int(status) >= 400:
                issues.append("http-error")
        except ValueError:
            pass
    
    # Check for missing elements
    if not title or not title.strip():
        issues.append("missing-title")
    if not h1 or not h1.strip():
        issues.append("missing-h1")
    if not meta_desc or not meta_desc.strip():
        issues.append("missing-meta")
    
    # Check for thin content
    if wordcount and wordcount.strip():
        try:
            if int(wordcount) < 500:
                issues.append("thin-content")
        except ValueError:
            pass
    
    return ",".join(issues)

# Process rows and write to tech_audit.csv
with open("tech_audit.csv", "w", newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=["url", "status", "title", "h1", "meta_desc", "wordcount", "issues"])
    writer.writeheader()
    
    for row in normalized_rows:
        output_row = {
            "url": row.get(url_col, ''),
            "status": row.get(status_col, ''),
            "title": row.get(title_col, ''),
            "h1": row.get(h1_col, ''),
            "meta_desc": row.get(meta_col, ''),
            "wordcount": row.get(word_col, ''),
            "issues": flag_issues(row)
        }
        writer.writerow(output_row)

print(f"✅ Wrote tech_audit.csv with {len(normalized_rows)} pages")
print(f"   Found {sum(1 for r in normalized_rows if flag_issues(r))} pages with issues")
