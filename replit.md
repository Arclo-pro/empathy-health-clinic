# Empathy Health Clinic - Content Management System

## Overview
This project delivers a modern, high-performance CMS and website for Empathy Health Clinic, aiming to streamline content management, enhance site performance, and provide SEO-optimized landing pages. The primary purpose is to improve online visibility and patient acquisition for mental health services, establishing the clinic as a leading provider.

## User Preferences
I want the agent to prioritize high-level features and architectural decisions. Please do not delve into granular implementation details unless specifically asked. I prefer a concise communication style. When making changes, focus on the most impactful elements first.

## Recent Changes (November 13, 2025)
- **Google Ads Tracking:** Added gclid/fbclid columns to leads table, updated forms to submit click IDs, deployed parameter preservation script to maintain UTM/GCLID across navigation
- **Blog Post Links:** Added external source links to ACLS blog (BLS, University of California, ACLSNow) plus internal service links
- **Google Search Console Fixes:** Added 85+ redirect rules for legacy URLs, WordPress paths, author/tag pages, and date archives (all validated working)
- **Services Page Layout:** Fixed hero section vertical overlap between description and HeroLeadForm by implementing flex column with space-y-8/10 spacing

## System Architecture
### UI/UX Decisions
The frontend is a responsive React SPA built with TypeScript, Tailwind CSS, and Shadcn UI. It features a professional healthcare design, full dark mode support, the Inter font, aggressive cross-linking, prominent trust factors, and high-conversion lead capture forms.

### Technical Implementations
- **Frontend:** React SPA with TypeScript, Tailwind CSS, Shadcn UI, TanStack Query, and Wouter for routing.
- **Backend:** Express.js REST API with hybrid storage (in-memory for content, PostgreSQL for analytics/leads) and Zod for validation.
- **Content Management:** Full CRUD operations via an admin panel for various content types.
- **SEO Features:** Comprehensive SEO implementation including unique meta tags, canonical tags, structured data, auto-generated XML sitemap, robots.txt, SEO-friendly URLs, and strategic internal linking.
- **Blog System:** Comprehensive blog with listing and individual post pages, SEO metadata, and AI Blog Generation.
- **Analytics System:** PostgreSQL-backed analytics tracking Core Web Vitals, GA4, Facebook Pixel, Microsoft Clarity, page views, conversion events, and Google Ads conversions, with a dedicated admin dashboard and Google Ads API integration.
- **SERP Ranking Analysis:** Real-time Google ranking tracker using Serper.dev API with 15-minute caching (40x performance improvement), URL normalization to prevent false "wrong URL" flags, competitor position tracking (healingpsychiatryflorida.com, mymindcarecenter.com, orlandohealth.com), and SEO task enrichment combining GSC impressions with live SERP positions.
- **Admin Dashboards:** Includes a Link & Performance Monitor, SEO Optimization Dashboard, Blog SEO Optimizer, and SEMrush Keyword Optimizer.
- **Performance Optimizations:** Mobile-first approach with code splitting, analytics deferral, resource hints, script optimization, and hero image preloading.
- **URL Management:** Unified canonicalization middleware combines www removal, trailing slash normalization, and content redirects, with a dynamic blog redirect system for legacy URLs.

### Feature Specifications
- **Core Pages:** Comprehensive landing pages for services, insurance providers, psychiatric treatments, therapy services, and conditions, including Google Ads and city-specific landing pages.
- **Orlando Landing Pages (November 2025):** 8 SEO-optimized Orlando-specific psychiatry landing pages (1,000-1,400 words each) with LocalBusiness/MedicalBusiness schema, Orlando location data (2281 Lee Rd Suite 102, Winter Park, FL 32810), and strategic internal linking:
  - /psychiatrist-orlando (general psychiatry)
  - /adhd-psychiatrist-orlando (ADHD diagnosis & treatment)
  - /anxiety-psychiatrist-orlando (anxiety disorder treatment)
  - /child-psychiatrist-orlando (pediatric psychiatry)
  - /bipolar-psychiatrist-orlando (bipolar disorder treatment)
  - /medication-management-orlando (psychiatric medication management)
  - /telepsychiatry-orlando (online psychiatry)
  - /same-day-psychiatrist-orlando (urgent psychiatric care)
  
  Internal linking: Homepage "Orlando Psychiatry Specialists" section (8 CTA cards) + Footer "Orlando Psychiatry Services" band (2×4 grid). Analytics tracking: orlando_service_click events.
- **Blog Section:** Over 170 SEO-optimized articles, with an AI Blog Generator in the admin panel.
- **Admin Panel:** CMS for content and lead management, analytics dashboard, link and performance monitoring, and Google Ads setup.
- **Lead Capture:** High-converting forms with automated email notifications, backend deduplication, and email failure tracking.
- **Trust Factors:** Integration of HIPAA compliance and other credibility indicators.
- **Accessibility:** Mobile responsiveness and dark mode.

### System Design Choices
The system uses an in-memory storage solution for simplified deployment, with data resetting on server restarts. The project structure is modular, separating client, server, and shared concerns. Content types are rigorously defined to support detailed and SEO-rich pages.

## External Dependencies
- **React:** Frontend library.
- **TypeScript:** Type safety.
- **Tailwind CSS:** Utility-first CSS framework.
- **Shadcn UI:** Reusable UI components.
- **TanStack Query:** Data fetching and caching.
- **Wouter:** Lightweight React router.
- **Express.js:** Backend framework.
- **Zod:** Schema validation.
- **SendGrid:** Email delivery service.
- **Google Ads API:** Paid conversion tracking and ROI analytics.
- **Serper.dev API:** Real-time SERP ranking checks for Orlando keywords.
- **web-vitals:** Core Web Vitals measurement.
- **Lucide-react:** Icon library.
- **OpenAI GPT-4o:** For AI blog generation.
- **PostgreSQL:** Database for analytics and leads.
- **Unsplash API:** For professional stock images.
- **Microsoft Clarity API:** Optional integration for enhanced link monitoring and dead link detection.

## SEO Automation Pipeline (November 2025)
Automated daily SEO workflow orchestrating GSC data, SERP tracking, tech audits, and task prioritization:

### Pipeline Components
- **main.py:** Fetches Google Search Console data and generates initial tasks.csv
- **step2_serp_update_tasks.py:** Checks live SERP rankings via Serper.dev API, enriches tasks with position data
- **step3_parse_sf_exports.py:** Parses Screaming Frog technical audit exports (internal_all.csv)
- **step4_merge_and_prioritize_simple.py:** Combines all data sources, calculates impact/effort scores, outputs tasks_final.csv
- **daily_seo_pipeline.py:** Full orchestration script with SendGrid email notifications

### Deployment Options
1. **Replit Scheduled Deployment:** Daily cron job (`0 7 * * *` = 2 AM EST) runs full pipeline
2. **Manual Execution:** Run `python3 daily_seo_pipeline.py` on-demand
3. **Continuous Integration:** Trigger via GitHub Actions or external scheduler

### Task Prioritization Algorithm
- **Impact Score:** Position-based opportunity (page 2+ = +5, page 1 bottom = +4) + tech issue severity (http-error = +6, performance issues = +2-3)
- **Effort Score:** create-landing = 3.0, supporting-blog = 2.0, improve-landing = 1.5, tech-fix = 1.5-2.5
- **Priority Score:** Impact - (0.8 × Effort)

### Autonomous Implementation System (November 2025)
**Fully autonomous SEO task executor** - The system automatically implements high-priority tasks without human intervention:

**Components:**
- **auto_implement_tasks.py:** Main orchestration engine with safety guardrails
- **create-insurance-landing.ts:** AI-powered landing page creation (7 insurance providers)
- **optimize-landing.ts:** Page optimization based on SERP analysis
- **fix-tech-issues.ts:** Automated technical SEO fixes

**Safety Features:**
- Git checkpoint before changes (rollback capability)
- Auto-commit with descriptive messages
- Max 3 tasks/day limit (conservative)
- Priority threshold 2.0 (high-value only)
- Complete audit trail via git diff in email
- Dry run mode for testing

**Capabilities:**
- Creates insurance provider landing pages (Cigna, BCBS, UMR, Aetna, United, Medicare, Medicaid)
- Optimizes existing pages (titles, meta descriptions, content expansion)
- Fixes technical issues (missing meta tags, canonical tags, H1s)
- Verifies page existence before creating
- Skips tasks that can't be safely automated

**Workflow Integration:**
1. Daily pipeline generates prioritized tasks
2. Autonomous engine implements top 3 tasks
3. Git commit with changes
4. Email report with implementation summary and git diff
5. Rollback available via `git reset --hard HEAD~1`

### Email Reports
Daily summary emails via SendGrid to providers@empathyhealthclinic.com, kevin.mease@gmail.com containing:
- **Autonomous Implementation Results:** Tasks implemented, failed, skipped with full git diff and rollback instructions
- Top 10 priority tasks with scores, actions, SERP positions
- Tech issue flags (http-error, slow-mobile, thin-content, missing SEO elements)
- File generation status (tasks.csv, serp_ranks.csv, tech_audit.csv, tasks_final.csv)

### Cost
~$0.30/month (Serper.dev SERP checks $0.001/query × ~12 queries/day + OpenAI API for autonomous content generation ~$0.05/day)