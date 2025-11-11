#!/usr/bin/env python3
"""
Orchestrates the full daily SEO pipeline and emails a summary.
Designed to run as a Replit Scheduled Deployment.
"""
import os, subprocess, csv, json
from datetime import datetime
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# ---- Config via environment variables ----
SITE_URL = os.getenv("SITE_URL", "https://empathyhealthclinic.com")
CITY     = os.getenv("CITY", "Orlando, Florida, United States")

EMAIL_TO   = os.getenv("EMAIL_TO", "providers@empathyhealthclinic.com,kevin.mease@gmail.com")
EMAIL_FROM = os.getenv("EMAIL_FROM", "seo@empathyhealthclinic.com")
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")

def run(cmd):
    """Run a command and print it"""
    print(">>", " ".join(cmd))
    try:
        subprocess.check_call(cmd)
        return True
    except subprocess.CalledProcessError as e:
        print(f"⚠️ Command failed: {e}")
        return False

def safe_read_csv(path):
    """Safely read CSV file"""
    if not os.path.exists(path):
        return []
    with open(path, 'r') as f:
        return list(csv.DictReader(f))

print("=" * 80)
print(f"EMPATHY HEALTH SEO DAILY PIPELINE - {datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}")
print("=" * 80)
print()

# 1) GSC → tasks.csv
print("Step 1: Fetching Google Search Console data...")
if os.path.exists("main.py"):
    run(["python3", "main.py"])
else:
    print("⚠️ main.py not found, skipping GSC fetch")

# 2) SERP ranks → tasks_enriched.csv + serp_ranks.csv
print("\nStep 2: Updating SERP rankings...")
if os.path.exists("step2_serp_update_tasks.py"):
    run(["python3", "step2_serp_update_tasks.py"])
else:
    print("⚠️ step2_serp_update_tasks.py not found, skipping SERP update")

# 3) Parse Screaming Frog export OR run tech audit
print("\nStep 3: Analyzing technical SEO signals...")
if os.path.exists("attached_assets/internal_all_1762887563969.csv"):
    # Use Screaming Frog export if available
    if os.path.exists("step3_parse_sf_exports.py"):
        run(["python3", "step3_parse_sf_exports.py"])
    else:
        print("⚠️ step3_parse_sf_exports.py not found")
elif os.path.exists("step3_tech_audit.py"):
    # Fallback to live tech audit
    run(["python3", "step3_tech_audit.py"])
else:
    print("⚠️ No tech audit script found, skipping")

# 4) Merge + prioritize → tasks_final.csv
print("\nStep 4: Merging and prioritizing tasks...")
if os.path.exists("step4_merge_and_prioritize_simple.py"):
    run(["python3", "step4_merge_and_prioritize_simple.py"])
elif os.path.exists("step4_merge_and_prioritize.py"):
    run(["python3", "step4_merge_and_prioritize.py"])
else:
    print("⚠️ No merge script found, skipping prioritization")

# 5) Build summary message
print("\nStep 5: Building summary report...")
summary = []
top_tasks = safe_read_csv("tasks_final.csv")[:10]

if top_tasks:
    summary.append("📊 TOP 10 PRIORITY TASKS")
    summary.append("=" * 80)
    summary.append("")
    
    for i, task in enumerate(top_tasks, 1):
        score = task.get('priority_score', '0')
        action = task.get('action', 'unknown')
        query = task.get('target_query', '')
        pos = task.get('serp_position', '-')
        issues = task.get('tech_issues', 'none')
        
        summary.append(f"{i}. [{score:>5}] {action:<20} | {query[:40]:<40}")
        summary.append(f"   Position: {pos:<10} | Issues: {issues}")
        summary.append("")
else:
    summary.append("⚠️ No tasks generated.")

# Add file status
summary.append("")
summary.append("📁 FILES GENERATED")
summary.append("=" * 80)
for f in ["tasks.csv", "tasks_enriched.csv", "serp_ranks.csv", "tech_audit.csv", "tasks_final.csv"]:
    if os.path.exists(f):
        rows = len(safe_read_csv(f))
        summary.append(f"✓ {f:<30} ({rows} rows)")
    else:
        summary.append(f"✗ {f:<30} (not found)")

msg_text = "\n".join(summary)
print("\n" + msg_text)

# 6) Send email notification via SendGrid
print("\nStep 6: Sending email notification...")
if SENDGRID_API_KEY and EMAIL_TO:
    try:
        subject = f"Empathy Health SEO Daily Report - {datetime.utcnow().strftime('%Y-%m-%d')}"
        
        # Build HTML email
        html_content = f"""
        <html>
        <body style="font-family: monospace; background-color: #f5f5f5; padding: 20px;">
            <div style="max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 5px;">
                <h1 style="color: #2563eb;">Empathy Health Clinic - SEO Daily Report</h1>
                <p style="color: #666;">Generated: {datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}</p>
                
                <pre style="background: #f8f9fa; padding: 20px; border-radius: 5px; overflow-x: auto;">
{msg_text}
                </pre>
                
                <hr style="margin: 30px 0;">
                <p style="color: #666; font-size: 12px;">
                    Automated by Replit SEO Pipeline<br>
                    Site: {SITE_URL}<br>
                    Target City: {CITY}
                </p>
            </div>
        </body>
        </html>
        """
        
        # Send via SendGrid
        message = Mail(
            from_email=EMAIL_FROM,
            to_emails=EMAIL_TO.split(","),
            subject=subject,
            html_content=html_content
        )
        
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        
        print(f"✅ Email sent successfully (Status: {response.status_code})")
        print(f"   Recipients: {EMAIL_TO}")
        
    except Exception as e:
        print(f"❌ Email error: {e}")
else:
    print("⚠️ SendGrid API key or EMAIL_TO not configured, skipping email")
    if not SENDGRID_API_KEY:
        print("   Missing: SENDGRID_API_KEY")
    if not EMAIL_TO:
        print("   Missing: EMAIL_TO")

print("\n" + "=" * 80)
print("PIPELINE COMPLETE")
print("=" * 80)
print(f"\n📋 Next: Review tasks_final.csv and tackle top priorities!")
