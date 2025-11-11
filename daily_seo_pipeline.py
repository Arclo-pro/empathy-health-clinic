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

# 2.5) Fetch latest Screaming Frog crawl from iCloud
print("\nStep 2.5: Fetching latest Screaming Frog crawl from iCloud...")
if os.path.exists("fetch_sf_crawl.py"):
    if run(["python3", "fetch_sf_crawl.py"]):
        print("✅ Fresh Screaming Frog data downloaded")
    else:
        print("⚠️ iCloud fetch failed, will use existing data if available")
else:
    print("⚠️ fetch_sf_crawl.py not found, skipping iCloud download")

# 3) Parse Screaming Frog export OR run tech audit
print("\nStep 3: Analyzing technical SEO signals...")
if os.path.exists("internal_all.csv"):
    # Use freshly downloaded or existing Screaming Frog export
    if os.path.exists("step3_parse_sf_exports.py"):
        run(["python3", "step3_parse_sf_exports.py"])
    else:
        print("⚠️ step3_parse_sf_exports.py not found")
elif os.path.exists("attached_assets/internal_all_1762887563969.csv"):
    # Fallback to old uploaded export
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

# 4.5) AUTONOMOUS IMPLEMENTATION - Automatically implement high-priority tasks
print("\nStep 4.5: Autonomously implementing high-priority tasks...")
implementation_summary = {}
if os.path.exists("auto_implement_tasks.py"):
    if run(["python3", "auto_implement_tasks.py"]):
        # Read implementation summary if it exists
        if os.path.exists("implementation_summary.json"):
            try:
                with open("implementation_summary.json", 'r') as f:
                    implementation_summary = json.load(f)
                print(f"✅ Autonomous implementation complete:")
                print(f"   Implemented: {implementation_summary.get('implemented', 0)}")
                print(f"   Failed: {implementation_summary.get('failed', 0)}")
            except Exception as e:
                print(f"⚠️ Could not read implementation summary: {e}")
    else:
        print("⚠️ Autonomous implementation failed")
else:
    print("⚠️ auto_implement_tasks.py not found, skipping autonomous implementation")

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
        # Add autonomous implementation summary to email
        auto_impl_section = ""
        if implementation_summary:
            auto_impl_section = f"""
                <h2 style="color: #2563eb; margin-top: 30px;">🤖 Autonomous Implementation</h2>
                <div style="background: #f0f9ff; padding: 15px; border-radius: 5px; border-left: 4px solid #2563eb;">
                    <p><strong>Implemented:</strong> {implementation_summary.get('implemented', 0)}</p>
                    <p><strong>Failed:</strong> {implementation_summary.get('failed', 0)}</p>
                    <p><strong>Skipped:</strong> {implementation_summary.get('skipped', 0)}</p>
                    
                    {f'''
                    <h3 style="margin-top: 20px;">✅ Successfully Implemented:</h3>
                    <ul>
                        {"".join(f"<li>{task.get('action')}: {task.get('query')}</li>" for task in implementation_summary.get('details', {}).get('implemented', []))}
                    </ul>
                    ''' if implementation_summary.get('details', {}).get('implemented') else ''}
                    
                    {f'''
                    <h3 style="margin-top: 20px;">❌ Failed to Implement:</h3>
                    <ul>
                        {"".join(f"<li>{task.get('action')}: {task.get('query')}</li>" for task in implementation_summary.get('details', {}).get('failed', []))}
                    </ul>
                    ''' if implementation_summary.get('details', {}).get('failed') else ''}
                    
                    {f'''
                    <h3 style="margin-top: 20px;">📝 Git Changes:</h3>
                    <pre style="background: #1f2937; color: #10b981; padding: 15px; border-radius: 5px; overflow-x: auto; font-size: 11px; max-height: 400px;">{implementation_summary.get('git_diff', 'No changes')[:3000]}</pre>
                    <p style="color: #666; font-size: 12px;">
                        🔄 Rollback: <code>git reset --hard HEAD~1</code>
                    </p>
                    ''' if implementation_summary.get('git_diff') else ''}
                </div>
            """
        
        subject = f"Empathy Health SEO Daily Report - {datetime.utcnow().strftime('%Y-%m-%d')}"
        if implementation_summary.get('implemented', 0) > 0:
            subject += f" [{implementation_summary.get('implemented')} tasks implemented]"
        
        # Build HTML email
        html_content = f"""
        <html>
        <body style="font-family: monospace; background-color: #f5f5f5; padding: 20px;">
            <div style="max-width: 900px; margin: 0 auto; background: white; padding: 30px; border-radius: 5px;">
                <h1 style="color: #2563eb;">Empathy Health Clinic - SEO Daily Report</h1>
                <p style="color: #666;">Generated: {datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}</p>
                
                {auto_impl_section}
                
                <h2 style="color: #2563eb; margin-top: 30px;">📊 Recommended Tasks</h2>
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
