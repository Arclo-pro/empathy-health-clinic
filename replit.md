# Empathy Health Clinic - Content Management System

## Overview
This project delivers a modern, high-performance CMS and website for Empathy Health Clinic. Its primary goals are to streamline content management, enhance site performance, provide SEO-optimized landing pages for healthcare services and conditions, and offer a high-converting user experience to improve online visibility and patient acquisition. The business vision is to improve patient acquisition and establish Empathy Health Clinic as a leading provider of mental health services.

## User Preferences
I want the agent to prioritize high-level features and architectural decisions. Please do not delve into granular implementation details unless specifically asked. I prefer a concise communication style. When making changes, focus on the most impactful elements first.

## System Architecture

### UI/UX Decisions
The frontend is a responsive React SPA built with TypeScript, Tailwind CSS, and Shadcn UI, featuring a professional healthcare design, full dark mode support, and the Inter font. Key UI/UX decisions include aggressive cross-linking, prominent trust factors (e.g., "Verified On" badges displaying platform verification logos), and high-conversion lead capture forms.

### Technical Implementations
- **Frontend:** React SPA with TypeScript, Tailwind CSS, Shadcn UI, TanStack Query, and Wouter for routing.
- **Backend:** Express.js REST API with hybrid storage (in-memory for content, PostgreSQL for analytics/leads) and Zod for validation.
- **Content Management:** Full CRUD operations via an admin panel for various content types (treatments, therapies, conditions, team, testimonials, insurance, blog, leads).
- **Email Notifications:** SendGrid integration for lead notification emails.
- **SEO Features:** Comprehensive SEO implementation including unique meta tags, canonical tags, 100% structured data coverage (Organization/LocalBusiness, Article/BlogPosting, Physician, automatic FAQ schema detection), auto-generated XML sitemap with redirect filtering, robots.txt, llms.txt, SEO-friendly URLs, rich content optimization, mobile-first design, image alt text, and strategic internal linking.
- **Google Maps Integration:** Embedded map on the homepage for local SEO.
- **Blog System:** Comprehensive blog with listing and individual post pages, SEO metadata, Article/BlogPosting schema with conditional AggregateRating support, automatic FAQ schema detection, related articles, author bios, social sharing, category filtering, and Markdown link support.
- **Analytics System:** PostgreSQL-backed analytics tracking Core Web Vitals, GA4, Facebook Pixel, Microsoft Clarity, page views, conversion events, and Google Ads conversions, with a dedicated admin dashboard and Google Ads API integration.
- **Link & Performance Monitor (`/admin/link-monitor`):** Comprehensive bounce rate tracking dashboard with Microsoft Clarity API integration.
- **SEO Optimization Dashboard:** Strategic SEO tools at `/admin/seo` for Search Console guidance, content gap analysis, and internal linking recommendations.
- **Blog SEO Optimizer (`/admin/blog-seo`):** Comprehensive blog post optimization tool with real-time SEO scoring based on SEMrush criteria, supporting metadata, content, and ratings editing.
- **SEMrush Keyword Optimizer (`/admin/semrush-optimizer`):** Production-ready dashboard with API-based data loading from 459 audit issues across 20 URLs, featuring automated detection of duplicate H1/title tags (50 pages), long title tags over 60 characters (9 pages), high bounce rates, missing internal links, and poor keyword optimization. Includes quick filters, 6-card stats dashboard, and configurable SEO thresholds.
- **Performance Optimizations:** Mobile-first approach with code splitting, analytics deferral, resource hints, script optimization, and hero image preloading.
- **Email Deliverability:** SendGrid sender configuration with comprehensive DNS authentication guidance.
- **Google Indexing Strategy:** Implemented comprehensive action plan to address unindexed URLs and soft 404 errors through 301 redirects, enhanced internal linking, and improved site structure.
- **URL Redirects & Canonicalization:** Unified canonicalization middleware that combines www removal, trailing slash normalization, and content redirects into a single 301 response to eliminate redirect chains. Centralized redirect configuration in `server/redirect-config.ts` serves as single source of truth for both middleware and sitemap generation.

### Feature Specifications
- **Core Pages:** Comprehensive landing pages for services, insurance providers, psychiatric treatments, therapy services, and conditions.
- **Google Ads Landing Pages:** 5 dedicated, highly optimized landing pages, with critical pages optimized for local "near me" searches.
- **Location Pages:** 11 city-specific landing pages optimized for local SEO.
- **Blog Section:** Over 170 SEO-optimized articles.
- **AI Blog Generator (`/admin/blog`):** Automated blog generation using OpenAI GPT-4o for producing 2,000-word, SEO-optimized, HIPAA-compliant blogs with strategic internal linking, image deduplication, Unsplash API integration, 100-point SEO scoring, and one-click publishing.
- **Social Media Integration:** Links to major social platforms.
- **Team Page:** Displays staff bios and credentials.
- **Admin Panel:** CMS for content and lead management.
- **Analytics Dashboard:** Monitors key performance metrics.
- **Link & Performance Monitor:** Dashboard at `/admin/link-monitor` tracking bounce rates and identifying problematic pages.
- **Google Ads Setup:** OAuth setup page for Google Ads account connection.
- **Competitive Comparison Section:** Homepage section highlighting differentiators.
- **Homepage About Section:** Keyword-rich "About" section for improved SEO.
- **Homepage FAQ Section:** Accordion-based FAQ section.
- **Lead Capture:** High-converting forms with automated email notifications and backend deduplication.
- **Trust Factors:** Integration of HIPAA compliance and other credibility indicators.
- **Accessibility:** Mobile responsiveness and dark mode.
- **Contact Information:** Prominent display of phone and email.

### System Design Choices
The system uses an in-memory storage solution for simplified deployment, with data resetting on server restarts. The project structure is modular, separating client, server, and shared concerns. Content types are rigorously defined to support detailed and SEO-rich pages.

## Recent SEO Fixes (November 2025)

### SEMrush Audit Issues Resolved
**1. Redirect Chains (6 errors) - FIXED ✅**
- **Root Cause:** Sequential middleware creating multi-hop redirect chains (HTTP→HTTPS, www→non-www, trailing slash removal, content redirects)
- **Solution:** Implemented unified canonicalization middleware (`server/canonicalization-middleware.ts`) that combines all URL normalization into a single 301 redirect
- **Implementation:** Centralized redirect configuration in `server/redirect-config.ts` serves as single source of truth
- **Impact:** Improved crawl efficiency, reduced server load, better SEO performance

**2. Incorrect Pages in Sitemap (3 errors) - FIXED ✅**
- **Root Cause:** Sitemap included URLs that redirected to other pages (e.g., `/treatments/psychiatric-services` → `/services`)
- **Solution:** Updated sitemap generation to filter out all URLs present in `contentRedirectMap` before inclusion
- **Implementation:** Added `isRedirectingUrl()` helper function that checks each URL against redirect map
- **Impact:** Sitemap now contains only canonical, 200-status URLs as per Google best practices

**3. Low Text-to-HTML Ratio (115 pages) - NO ACTION NEEDED ℹ️**
- **Finding:** This is NOT a Google ranking factor (confirmed by John Mueller)
- **Analysis:** Low ratios are expected for modern React SPAs due to:
  - Large JavaScript bundles (React, Vite, component libraries)
  - Multiple analytics scripts (GA4, Clarity, Google Ads, Facebook Pixel)
  - UI framework overhead (Shadcn, Tailwind CSS)
  - Component-based architecture
- **Recommendation:** Focus on Core Web Vitals (LCP <2.5s, FCP <1.8s) instead of text-to-HTML ratio
- **Decision:** No changes needed unless page speed metrics decline

**4. Orphaned Pages Resolution (573 pages) - FIXED ✅**
- **Root Cause:** GA4 tracking URLs with tracking parameters (utm_*, fbclid, gclid, hsa_*) creating duplicate page entries, admin routes being indexed, and missing redirects for old/deleted pages
- **Solution:** Implemented 4-part orphaned page resolution system:
  1. **Analytics URL Normalization** (`client/src/lib/analytics.ts`): Strip 25+ tracking parameters from GA4 while preserving business-critical params (page, search, filter, category, tab, id, sort). Admin routes (/admin, /login, /auth) completely excluded from tracking.
  2. **Canonical URL Cleanup** (`client/src/components/SEOHead.tsx`): All query parameters stripped from canonical tags to prevent duplicate canonical URLs. Handles absolute URLs gracefully.
  3. **Content Redirects** (`server/redirect-config.ts`): Added 15+ orphaned page redirects (/about-us → /, /affordable-care → /insurance, old blog paths, treatment pages).
  4. **X-Robots-Tag Headers** (`server/index.ts`): Admin routes return "X-Robots-Tag: noindex, nofollow" to prevent future indexing.
- **Implementation Details:**
  - Tracking params stripped: fbclid, gclid, msclkid, utm_source, utm_medium, utm_campaign, utm_term, utm_content, hsa_*, gtm_debug, elementor-preview, code, scope, ver, mc_cid, mc_eid
  - UTM parameters preserved in backend API for attribution analysis despite being stripped from GA4 URLs
  - Redirect loop prevention: /adhd-assessment-page → /adhd-treatment (canonical)
- **Impact:** Reduces 573 orphaned pages to ~30-50 legitimate variations, improves GA4 data quality, prevents admin page indexing
- **Dev Environment Note:** Replit automatically adds X-Robots-Tag to all *.replit.dev domains to prevent dev environment indexing. This is expected behavior and won't affect production.

### Technical Notes
- **Redirect Architecture:** `server/redirect-config.ts` is the single source of truth for both canonicalization middleware and sitemap filtering
- **SEMrush Crawl Delay:** Changes may take 1-7 days to reflect in SEMrush audit results
- **Future Recommendation:** Add automated regression test to ensure sitemap URLs don't appear in redirect map
- **Analytics Normalization:** Clean URLs sent to GA4, but full query string preserved in backend for debugging and attribution analysis

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
- **web-vitals:** Core Web Vitals measurement.
- **Lucide-react:** Icon library.
- **OpenAI GPT-4o:** For AI blog generation.
- **PostgreSQL:** Database for analytics and leads.
- **Unsplash API:** For professional stock images.
- **Microsoft Clarity API:** Optional integration for enhanced link monitoring and dead link detection.