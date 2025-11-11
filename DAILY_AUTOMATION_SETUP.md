# Daily SEO Pipeline - Automation Setup Guide

## Overview
The `daily_seo_pipeline.py` script orchestrates your complete SEO workflow:
1. Fetches Google Search Console data
2. Updates SERP rankings via Serper.dev API
3. Parses Screaming Frog technical audit
4. Merges all data and prioritizes tasks
5. Emails summary report via SendGrid

---

## Setup: Replit Scheduled Deployment

### Step 1: Configure Environment Variables
Add these to your Replit Secrets (already configured):
- ✅ `SENDGRID_API_KEY` - Already set
- ✅ `GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT_JSON` - Already set
- ✅ `SITE_URL` - Set to `https://empathyhealthclinic.com`

**Additional (optional):**
- `EMAIL_TO` - Comma-separated recipients (default: `providers@empathyhealthclinic.com,kevin.mease@gmail.com`)
- `EMAIL_FROM` - From address (default: `seo@empathyhealthclinic.com`)
- `CITY` - Target city (default: `Orlando, Florida, United States`)

### Step 2: Create Scheduled Deployment

1. **Click "Publish"** in your Replit workspace
2. **Select "Scheduled Deployments"**
3. **Configure Schedule:**
   - **Natural Language:** `"Every day at 2 AM EST"`
   - **OR Cron Expression:** `0 7 * * *` (2 AM EST = 7 AM UTC)

4. **Set Commands:**
   - **Build Command:** (leave empty, dependencies already installed)
   - **Run Command:** 
     ```bash
     python3 daily_seo_pipeline.py
     ```

5. **Set Timeout:** `600` seconds (10 minutes)

6. **Add Environment Variables:**
   - All secrets are automatically inherited from your Replit project

7. **Click "Publish"**

---

## What the Pipeline Does

### Daily Workflow
```
┌─────────────────────────────────────────────────────┐
│  1. GSC Data Fetch (main.py)                       │
│     ↓ tasks.csv                                     │
│                                                      │
│  2. SERP Ranking Check (step2_serp_update_tasks.py)│
│     ↓ tasks_enriched.csv + serp_ranks.csv          │
│                                                      │
│  3. Tech Audit (step3_parse_sf_exports.py)         │
│     ↓ tech_audit.csv                               │
│                                                      │
│  4. Merge & Prioritize (step4_merge...)            │
│     ↓ tasks_final.csv                              │
│                                                      │
│  5. Email Report (SendGrid)                         │
│     ✉️ Daily summary to team                        │
└─────────────────────────────────────────────────────┘
```

### Email Report Format
```
📊 TOP 10 PRIORITY TASKS
================================================================================

1. [  1.8] improve-landing      | psychiatrist orlando accepts cigna
   Position: 9         | Issues: none

2. [  1.8] improve-landing      | psychiatrist orlando accepts bcbs
   Position: 7         | Issues: none

3. [ -2.4] create-landing       | anxiety psychiatrist orlando
   Position: Not in top 20 | Issues: thin-content

...

📁 FILES GENERATED
================================================================================
✓ tasks.csv                      (183 rows)
✓ tasks_enriched.csv             (12 rows)
✓ serp_ranks.csv                 (12 rows)
✓ tech_audit.csv                 (87 rows)
✓ tasks_final.csv                (12 rows)
```

---

## Manual Execution (Testing)

Before setting up automation, test manually:

```bash
# Test the full pipeline
python3 daily_seo_pipeline.py

# Or run individual steps:
python3 main.py                              # Step 1: GSC
python3 step2_serp_update_tasks.py           # Step 2: SERP
python3 step3_parse_sf_exports.py            # Step 3: Tech Audit
python3 step4_merge_and_prioritize_simple.py # Step 4: Prioritize
```

---

## Screaming Frog Integration

### Option A: Upload Weekly (Manual)
1. Run Screaming Frog crawl on `https://empathyhealthclinic.com`
2. Export as `Internal > All` CSV
3. Upload to `attached_assets/internal_all_[timestamp].csv`
4. Update path in `step3_parse_sf_exports.py` if needed

### Option B: Automated (Advanced)
Use Screaming Frog Command Line:
```bash
# On your local machine with SF CLI installed
screaming-frog-cli --crawl https://empathyhealthclinic.com \
  --export-tabs "Internal:All" \
  --output-folder ./exports

# Then upload to Replit or sync via GitHub
```

---

## Monitoring & Troubleshooting

### Check Deployment Logs
1. Go to **Deployments** tab in Replit
2. Click on your scheduled deployment
3. View **Logs** to see pipeline output

### Common Issues

**Issue:** "No tasks generated"  
**Fix:** Ensure GSC data is fresh (`main.py` ran successfully)

**Issue:** "Email not sent"  
**Fix:** Verify `SENDGRID_API_KEY` is set and `EMAIL_TO` is configured

**Issue:** "SERP API rate limit"  
**Fix:** Serper.dev has daily limits; reduce check frequency if needed

**Issue:** "Tech audit empty"  
**Fix:** Upload fresh Screaming Frog export to `attached_assets/`

### View Generated Files
Access via Replit shell:
```bash
# View top 10 tasks
head -20 tasks_final.csv

# Check task count by action
cut -d',' -f2 tasks_final.csv | sort | uniq -c
```

---

## Cost Estimate

**Daily API Calls:**
- Google Search Console: FREE
- Serper.dev SERP checks: ~12 queries × $0.001 = **$0.01/day** ($0.30/month)
- SendGrid emails: 1 email/day = FREE (100 emails/day limit)

**Total:** ~**$0.30/month** for daily automation

---

## Next Steps

1. ✅ **Test manually:** Run `python3 daily_seo_pipeline.py` to verify
2. ✅ **Set up scheduled deployment** following steps above
3. ✅ **Upload Screaming Frog export** weekly for tech audits
4. ✅ **Review tasks_final.csv** daily and tackle top priorities

---

## Advanced: Slack Integration (Optional)

To send reports to Slack instead of/in addition to email:

1. Create Slack Incoming Webhook
2. Add `SLACK_WEBHOOK_URL` to Replit Secrets
3. Modify `daily_seo_pipeline.py` to send to Slack:

```python
import requests

SLACK_WEBHOOK = os.getenv("SLACK_WEBHOOK_URL")
if SLACK_WEBHOOK:
    requests.post(SLACK_WEBHOOK, json={
        "text": f"📊 SEO Daily Report - {datetime.now().strftime('%Y-%m-%d')}",
        "blocks": [{"type": "section", "text": {"type": "mrkdwn", "text": msg_text}}]
    })
```

---

*Last Updated: November 11, 2025*  
*Maintained by: Replit SEO Pipeline*
