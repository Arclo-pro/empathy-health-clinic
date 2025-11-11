# Daily SEO Pipeline - Ping Automation Setup

## Overview
This setup uses your **always-on** Replit app with a ping service (UptimeRobot or cron-job.org) to trigger the daily SEO pipeline.

**Endpoint created:** `GET /api/seo/trigger-daily-pipeline`

---

## 🔐 Step 1: Set Up Security Secret

1. Open **Secrets** in Replit (Tools → Secrets or `Cmd+K` → "Secrets")
2. Click **"New Secret"**
3. Add:
   - **Key:** `SEO_PIPELINE_SECRET`
   - **Value:** Generate a random string (e.g., `seo_2025_xyz_abc_random_key_123`)
4. Click **"Add Secret"**

**Important:** Keep this secret safe! It prevents unauthorized pipeline triggers.

---

## 🧪 Step 2: Test the Endpoint Locally

Test that the endpoint works:

```bash
# Test with your secret key
curl "https://your-repl-name.repl.co/api/seo/trigger-daily-pipeline?key=YOUR_SECRET_KEY"

# Expected response:
# {
#   "success": true,
#   "message": "SEO pipeline triggered",
#   "timestamp": "2025-11-11T19:45:00.000Z"
# }
```

Replace:
- `your-repl-name.repl.co` with your actual Repl URL
- `YOUR_SECRET_KEY` with the value you set in secrets

---

## 📊 Step 3: Choose a Ping Service

### **Option A: UptimeRobot (Recommended - Free)**

1. **Sign up:** Go to [uptimerobot.com](https://uptimerobot.com) (free plan: 50 monitors)

2. **Create Monitor:**
   - Click **"+ Add New Monitor"**
   - Monitor Type: **HTTP(s)**
   - Friendly Name: `Empathy SEO Daily Pipeline`
   - URL: `https://your-repl-name.repl.co/api/seo/trigger-daily-pipeline?key=YOUR_SECRET_KEY`
   - Monitoring Interval: **24 hours** (or custom)
   - Monitor Timeout: **60 seconds**
   - Alert Contacts: Add your email (optional)

3. **Set Schedule:**
   - Under **"Advanced Settings"**
   - Custom HTTP Headers: (leave empty)
   - Expected Status Code: `200`

4. **Click "Create Monitor"**

**Cost:** FREE (up to 50 monitors)

---

### **Option B: cron-job.org (More Flexible)**

1. **Sign up:** Go to [cron-job.org](https://cron-job.org) (free plan available)

2. **Create Cron Job:**
   - Click **"Create cronjob"**
   - Title: `Empathy SEO Daily Pipeline`
   - URL: `https://your-repl-name.repl.co/api/seo/trigger-daily-pipeline?key=YOUR_SECRET_KEY`
   - Schedule: 
     - Every **1 day** at **02:00** (2 AM)
     - Or use cron expression: `0 2 * * *`
   - Enabled: ✅ Yes

3. **Advanced Settings:**
   - Timeout: **60 seconds**
   - Expected HTTP Status: **200**
   - Notifications: Email on failure (optional)

4. **Click "Create"**

**Cost:** FREE (up to 10 cron jobs on free plan)

---

## 🚀 Step 4: Deploy with Reserved VM

Your Repl needs to be **always on** for this to work:

### **Using Reserved VM Deployment:**

1. Click **"Publish"** in Replit
2. Select **"Reserved VM Deployments"**
3. Click **"Set up your published app"**
4. Configure:
   - **VM Size:** Small (512 MB RAM, 0.5 vCPU) - Usually sufficient
   - **Port:** `5000` (already configured)
   - **Build Command:** (leave empty)
   - **Run Command:** `npm run dev`
5. Click **"Publish"**

**Cost:** Starts at ~$7/month for Small VM

**Note:** Your existing web app will continue running, and the ping endpoint is now part of it.

---

## ✅ Verification

### Test End-to-End:

1. **Trigger manually via URL:**
   ```
   https://your-deployed-app.repl.co/api/seo/trigger-daily-pipeline?key=YOUR_SECRET_KEY
   ```

2. **Check server logs** (in Replit console):
   ```
   🚀 Daily SEO Pipeline triggered via ping
   ================================================================================
   EMPATHY HEALTH SEO DAILY PIPELINE - 2025-11-11 19:45 UTC
   ================================================================================
   ...
   ✅ Daily SEO Pipeline completed successfully
   ```

3. **Check email:**
   - Within 2-3 minutes, you should receive the SEO report at `kevin.mease@gmail.com`

---

## 📋 What Happens Daily

**Trigger:** UptimeRobot/cron-job.org pings your endpoint at 2 AM EST

**Endpoint Response:** Returns immediately (200 OK)

**Background Process:**
1. Downloads latest Screaming Frog crawl from iCloud
2. Fetches Google Search Console data
3. Checks SERP rankings for 12 Orlando keywords
4. Merges and prioritizes SEO tasks
5. Emails report to your team

**Total Time:** ~60-90 seconds

---

## 🔧 Troubleshooting

### Issue: Endpoint returns 401 Unauthorized
**Fix:** Check that your `SEO_PIPELINE_SECRET` matches in both:
- Replit Secrets
- UptimeRobot/cron-job.org URL

### Issue: Pipeline doesn't run
**Fix:** Check server logs for errors:
```bash
# In Replit shell
tail -f /tmp/logs/*.log
```

### Issue: Email not received
**Fix:** Verify `SENDGRID_API_KEY` is set and valid

### Issue: iCloud fetch fails
**Fix:** Verify `ICLOUD_SF_URL` secret is set and link is accessible

---

## 💰 Cost Comparison

| Method | Cost | Pros | Cons |
|--------|------|------|------|
| **Scheduled Deployment** | ~$0.30/month | Cheapest, built-in | Separate from web app |
| **Reserved VM + Ping** | ~$7/month | Integrated with app | More expensive |

**Recommendation:** 
- If you're already using Reserved VM for your website → Use ping approach (no extra cost)
- If you're using Autoscale/Static deployment → Use Scheduled Deployments instead

---

## 📊 Monitoring

### UptimeRobot Dashboard:
- View trigger history
- Get alerts if endpoint fails
- Track response times

### Replit Deployment Logs:
- Click **Deployments** → Your deployment → **Logs**
- See real-time pipeline output

### Email Reports:
- Daily SEO report sent to your team
- Includes top 10 priorities
- SERP position tracking

---

## 🔒 Security Best Practices

1. ✅ **Use strong secret key** (20+ random characters)
2. ✅ **Don't share the ping URL** publicly
3. ✅ **Monitor access logs** for unauthorized attempts
4. ✅ **Rotate secret key** periodically (update both Replit + ping service)

---

## 🎯 Next Steps

1. ✅ **Set SEO_PIPELINE_SECRET** in Replit Secrets
2. ✅ **Test endpoint** manually with curl
3. ✅ **Set up UptimeRobot** or cron-job.org monitor
4. ✅ **Deploy with Reserved VM** (if not already)
5. ✅ **Verify first run** tomorrow at 2 AM

---

## Alternative: Use Scheduled Deployments Instead

If you don't need the ping approach, **Scheduled Deployments** are more cost-effective:

**Pros:**
- Cheaper (~$0.30/month vs ~$7/month)
- Purpose-built for scheduled tasks
- No external ping service needed

**Cons:**
- Separate from your main web app
- Less flexible timing options

See `DAILY_AUTOMATION_SETUP.md` for Scheduled Deployment setup instructions.

---

*Last Updated: November 11, 2025*  
*Maintained by: Replit SEO Pipeline*
