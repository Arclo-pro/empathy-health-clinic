# Automated Blog Publishing System - Setup Guide

## Overview
Automated daily publishing system for 10 Orlando psychiatry SEO blog posts (Nov 14-23, 2025).

## Features
- ✅ Secure API endpoint with dedicated API key authentication
- ✅ Atomic transaction-based publishing (prevents race conditions)
- ✅ Publishes ONE post per day (earliest scheduled)
- ✅ Automatic sitemap regeneration after publish
- ✅ Public blog listing filters out draft/scheduled posts
- ✅ Florida-themed images from Unsplash
- ✅ Comprehensive SEO metadata (titles, descriptions, keywords)

## Required Setup

### 1. Set BLOG_PUBLISHER_SECRET Environment Variable

**In Replit Secrets UI:**
1. Go to Tools → Secrets
2. Add new secret:
   - Key: `BLOG_PUBLISHER_SECRET`
   - Value: (generate a secure random string, or use same as SESSION_SECRET for simplicity)

**Or via command line:**
```bash
# Generate a secure random secret
openssl rand -base64 64
```

### 2. Choose Automation Method

**Option A: External Scheduler (Recommended)**

Use cron-job.org or UptimeRobot to hit the endpoint daily:

```bash
# HTTP Request Configuration
URL: https://your-repl.repl.co/api/admin/publish-scheduled
Method: POST
Headers:
  x-api-key: [YOUR_BLOG_PUBLISHER_SECRET]
  Content-Type: application/json
Schedule: Every day at 9:00 AM EST
```

**Option B: Node-cron Script**

Run the provided `daily-blog-publisher.ts` script:
```bash
tsx daily-blog-publisher.ts
```

This runs automatically at 9 AM EST daily when the server is running.

### 3. Verify Scheduled Posts

Check database for scheduled posts:
```bash
curl http://localhost:5000/api/blog-posts?pageSize=20 | grep scheduled
```

All 10 Orlando posts should be scheduled for Nov 14-23, 2025.

## Manual Testing

Test the publishing endpoint manually:
```bash
curl -X POST http://localhost:5000/api/admin/publish-scheduled \
  -H "x-api-key: YOUR_SECRET_HERE" \
  -H "Content-Type: application/json"
```

Expected responses:
- `{"success":true,"message":"No posts due for publishing"}` - when no posts are ready
- `{"success":true,"post":{...}}` - when a post is published
- `{"error":"Unauthorized"}` - if API key is wrong
- `{"error":"Configuration error"}` - if BLOG_PUBLISHER_SECRET not set

## Blog Posts Scheduled

1. Nov 14: How to Choose the Right Psychiatrist in Orlando
2. Nov 15: What to Expect at Your First Psychiatry Appointment
3. Nov 16: Anxiety Treatment Options in Orlando
4. Nov 17: ADHD Support in Orlando
5. Nov 18: Online Psychiatry in Orlando
6. Nov 19: Understanding Depression
7. Nov 20: Orlando Mental Health Resources Guide
8. Nov 21: Common Psychiatry Questions
9. Nov 22: When to See a Psychiatrist
10. Nov 23: Therapy vs. Psychiatry in Orlando

## Security Features

- ✅ Dedicated BLOG_PUBLISHER_SECRET (no SESSION_SECRET fallback)
- ✅ Fails fast if secret not configured
- ✅ Validates API key before processing
- ✅ Transaction-based atomic updates (prevents concurrent publish races)
- ✅ SELECT FOR UPDATE LIMIT 1 ensures only one post published per request

## Troubleshooting

**"Configuration error" response:**
- Set BLOG_PUBLISHER_SECRET in Replit Secrets

**"No posts due for publishing":**
- Check current date/time (posts scheduled for Nov 14-23 at 9 AM EST)
- Verify posts exist in database with status='scheduled'

**All posts published at once:**
- This should NOT happen with the fixed transaction logic
- Contact support if this occurs
