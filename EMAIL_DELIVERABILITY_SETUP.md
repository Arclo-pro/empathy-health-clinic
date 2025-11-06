# 📧 Email Deliverability Setup Guide
## Fix Lead Gen Emails Going to Spam

**Current Issue**: Emails from `noreply@empathyhealthclinic.com` are landing in spam folders because the domain lacks proper authentication.

**Solution**: Set up SPF, DKIM, and DMARC records to authenticate your domain with SendGrid.

---

## ✅ Code Improvements (Already Done)

I've updated your email configuration with these improvements:

1. **Added Sender Name**: Emails now show "Empathy Health Clinic" instead of just the email address
2. **Added Reply-To**: Recipients can reply to `providers@empathyhealthclinic.com`
3. **Improved Subject Lines**: More professional and attention-grabbing

---

## 🔧 DNS Authentication Setup (Action Required)

### Step 1: SendGrid Domain Authentication

This is the **MOST IMPORTANT** step and handles SPF + DKIM automatically.

1. **Log into SendGrid Dashboard**
   - Go to https://app.sendgrid.com
   - Navigate to **Settings** → **Sender Authentication**

2. **Authenticate Your Domain**
   - Click **"Authenticate Your Domain"**
   - Domain: `empathyhealthclinic.com`
   - Choose: **"I don't have a host provider"** or **"Other Host"** (for GoDaddy)
   - Use automated security: **Yes** ✅
   - Branded links: **Optional** (recommended for click tracking)

3. **SendGrid Generates DNS Records**
   
   You'll get 3 CNAME records like this (exact values will differ):
   
   ```
   Type: CNAME
   Host: em1234.empathyhealthclinic.com
   Value: u1234567.wl123.sendgrid.net
   TTL: 3600
   
   Type: CNAME
   Host: s1._domainkey.empathyhealthclinic.com
   Value: s1.domainkey.u1234567.wl123.sendgrid.net
   TTL: 3600
   
   Type: CNAME
   Host: s2._domainkey.empathyhealthclinic.com
   Value: s2.domainkey.u1234567.wl123.sendgrid.net
   TTL: 3600
   ```

---

### Step 2: Add DNS Records in GoDaddy

1. **Access GoDaddy DNS Manager**
   - Log into https://dcc.godaddy.com
   - Select **empathyhealthclinic.com**
   - Click **DNS** → **Manage Zones**

2. **Add SendGrid's CNAME Records**
   
   For each of the 3 CNAME records from SendGrid:
   
   - Click **"Add"**
   - **Type**: CNAME
   - **Host**: Copy from SendGrid (e.g., `em1234` or `s1._domainkey`)
     - **Note**: Remove `.empathyhealthclinic.com` if GoDaddy auto-appends it
   - **Points to**: Copy full value from SendGrid
   - **TTL**: 1 Hour (or 600 seconds)
   - Click **Save**

3. **Add SPF Record** (if not already present)
   
   Check if you already have an SPF record:
   - Look for TXT record with host `@` containing `v=spf1`
   
   If **NO existing SPF record**:
   ```
   Type: TXT
   Host: @
   Value: v=spf1 include:sendgrid.net ~all
   TTL: 1 Hour
   ```
   
   If **SPF record already exists**:
   ```
   Update existing value to include SendGrid:
   v=spf1 include:sendgrid.net include:_spf.google.com ~all
   ```

4. **Add DMARC Record** (Recommended)
   
   ```
   Type: TXT
   Host: _dmarc
   Value: v=DMARC1; p=none; rua=mailto:providers@empathyhealthclinic.com
   TTL: 1 Hour
   ```

---

### Step 3: Verify DNS Records

1. **Wait for DNS Propagation** (30 minutes to 48 hours)
   - Most changes take 1-4 hours
   - Full propagation: up to 48 hours

2. **Verify in SendGrid**
   - Return to SendGrid → Settings → Sender Authentication
   - Click **"Verify"** next to `empathyhealthclinic.com`
   - Should show **"Verified"** ✅ with green checkmark

3. **Check DNS Propagation** (Optional)
   
   Use these tools to verify records are live:
   - https://mxtoolbox.com/SuperTool.aspx
   - https://dnschecker.org
   
   Search for:
   - `empathyhealthclinic.com` (SPF record)
   - `_dmarc.empathyhealthclinic.com` (DMARC record)
   - `s1._domainkey.empathyhealthclinic.com` (DKIM record)

---

## 📊 Expected Results

### Before Authentication:
- ❌ Emails go to spam/junk folder
- ❌ Gmail shows "via sendgrid.net"
- ❌ Low sender reputation

### After Authentication:
- ✅ Emails land in inbox
- ✅ Shows "from empathyhealthclinic.com"
- ✅ Higher sender reputation
- ✅ Better open rates (30-50% improvement typical)

---

## 🧪 Testing Email Deliverability

1. **Send Test Email**
   - Submit a test lead through your contact form
   - Check both Gmail and Outlook inboxes

2. **Check Email Headers**
   
   In Gmail:
   - Open the email
   - Click three dots (⋮) → **Show original**
   - Look for:
     ```
     spf=pass
     dkim=pass
     dmarc=pass
     ```

3. **Use Email Testing Tools**
   - https://www.mail-tester.com
   - Send test to address provided
   - Should score 8/10 or higher

---

## 🔍 Troubleshooting

### SendGrid Won't Verify Domain
- **Wait 24-48 hours** - DNS propagation takes time
- **Check TTL values** - Should be 3600 seconds (1 hour)
- **Verify exact CNAME values** - One character wrong breaks everything
- **Remove domain suffix** - If GoDaddy auto-appends domain, just use subdomain part

### Emails Still Going to Spam
- **Check sender reputation**: https://senderscore.org
- **Review email content** - Avoid spam trigger words
- **Warm up your domain** - Send gradually increasing volume
- **Monitor bounce rates** - High bounces hurt reputation

### SPF Record Conflicts
- **Only ONE SPF record allowed per domain**
- If you have multiple mail providers, combine them:
  ```
  v=spf1 include:sendgrid.net include:_spf.google.com ~all
  ```

---

## 📈 Best Practices

1. **Monitor Email Analytics**
   - Track open rates, bounces, spam complaints in SendGrid
   - Aim for: <5% bounce rate, <0.1% spam complaints

2. **Keep Email Lists Clean**
   - Remove invalid/bounced emails
   - Use double opt-in for newsletter signups

3. **Regular Testing**
   - Test deliverability monthly
   - Check spam folder placement

4. **Maintain Sender Reputation**
   - Don't send sudden volume spikes
   - Respond to unsubscribe requests
   - Keep engagement high (opens/clicks)

---

## 🆘 Need Help?

Contact SendGrid Support:
- Dashboard → Help → Submit a Support Request
- Include: Domain name, verification screenshots

Or contact your web developer to assist with DNS changes.

---

## Summary Checklist

- [ ] Log into SendGrid → Authenticate Domain
- [ ] Copy 3 CNAME records from SendGrid
- [ ] Add CNAMEs to GoDaddy DNS
- [ ] Add/update SPF TXT record
- [ ] Add DMARC TXT record
- [ ] Wait 24-48 hours for DNS propagation
- [ ] Verify domain in SendGrid
- [ ] Send test emails
- [ ] Check email headers for SPF/DKIM/DMARC pass
- [ ] Monitor deliverability over next week

**Estimated Time**: 30 minutes setup + 24-48 hours DNS propagation

---

*Last Updated: November 2025*
