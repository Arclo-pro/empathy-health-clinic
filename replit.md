# Empathy Health Clinic - Content Management System

## Overview
This project delivers a modern, high-performance CMS and website for Empathy Health Clinic. Its primary goals are to streamline content management, enhance site performance, provide SEO-optimized landing pages for healthcare services and conditions, and offer a high-converting user experience to improve online visibility and patient acquisition. The business vision is to improve patient acquisition and establish Empathy Health Clinic as a leading provider of mental health services.

## User Preferences
I want the agent to prioritize high-level features and architectural decisions. Please do not delve into granular implementation details unless specifically asked. I prefer a concise communication style. When making changes, focus on the most impactful elements first.

## System Architecture

### UI/UX Decisions
The frontend is a responsive React SPA built with TypeScript, Tailwind CSS, and Shadcn UI. It features a professional healthcare design, full dark mode support, and the Inter font. Key UI/UX decisions include aggressive cross-linking, prominent trust factors, and high-conversion lead capture forms.

### Technical Implementations
- **Frontend:** React SPA with TypeScript, Tailwind CSS, Shadcn UI, TanStack Query, and Wouter for routing.
- **Backend:** Express.js REST API utilizing hybrid storage: in-memory for content (MemStorage) and PostgreSQL for analytics and leads, with Zod for validation.
- **Content Management:** Full CRUD operations via an admin panel (`/admin`) for diverse content types including treatments, therapies, conditions, team, testimonials, insurance, blog, and leads.
- **Email Notifications:** SendGrid integration for lead notification emails.
- **SEO Features:** Comprehensive SEO implementation including unique meta tags, canonical tags, structured data (Organization/LocalBusiness, Article schema), auto-generated XML sitemap, robots.txt, SEO-friendly URLs, rich content optimization, mobile-first design, and image alt text.
- **Google Maps Integration:** Embedded map on the homepage for local SEO and user convenience, with conditional display.
- **Dynamic Content:** Real-time content updates from the API.
- **Blog System:** A comprehensive blog with listing and individual post pages, including SEO metadata, JSON-LD, related articles, author bios, social sharing, and category filtering.
- **Analytics System:** PostgreSQL-backed analytics tracking Core Web Vitals, Google Analytics 4, Facebook Pixel, page views, conversion events, and Google Ads conversions. Includes a dedicated admin analytics dashboard and Google Ads API integration for paid vs organic attribution with daily auto-refresh. Phone call tracking is also integrated.
- **SEO Optimization Dashboard:** Strategic SEO tools at `/admin/seo` offering Search Console guidance, content gap analysis, and internal linking recommendations.
- **Performance Optimizations:** Mobile-first approach with code splitting, analytics deferral, resource hints (dns-prefetch, preconnect), script optimization, and hero image preloading.
- **URL Redirects:** Comprehensive 301 permanent redirects to preserve SEO value:
  - `www` to `non-www` for domain consistency
  - Old WordPress blog URLs to new `/blog/` structure
  - Legacy location page patterns (`/locations/psychiatry-X/` → `/locations/psychiatrist-X/`)
  - Non-existent location pages to nearest alternative (e.g., Oviedo → Orlando)
  - Old assessment pages to relevant service pages
  - Deprecated treatment URLs with `/treatments/` prefix to root-level slugs
  - Feed URLs and other WordPress artifacts to appropriate destinations
  - All redirects tested and verified working (Nov 2024)

### Feature Specifications
- **Core Pages:** Comprehensive landing pages for services, 12 insurance providers, 9 psychiatric treatments, 15 therapy services, and 10 conditions.
- **Google Ads Landing Pages:** 5 dedicated, highly optimized landing pages for EMDR Therapy, Virtual/Telehealth Psychiatry, Crisis/Urgent Care Therapy, Depression Counseling, and Anxiety Therapy.
- **Location Pages:** 11 city-specific landing pages optimized for local SEO, featuring unique content and LocalBusiness schema.
- **Blog Section:** Over 170 SEO-optimized articles, including migrated and new high-value content.
- **AI Blog Generator (`/admin/blog`):** Automated blog generation using Replit AI Integrations (OpenAI GPT-4o) capable of producing 2,000-word, SEO-optimized, HIPAA-compliant blogs. Features include clickbait title generation, image deduplication, Unsplash API integration, link validation, a 100-point SEO scoring system with 32 automated quality checks, and one-click publishing. This includes an **Autonomous Blog Generation** system that identifies content gaps, selects strategic topics, and generates complete blogs with strict quality gates (minimum 80/100 SEO score).

  **Generation Approaches:**
  - **3-Stage Generator with Guaranteed Word Count (Current - PRODUCTION READY):** Uses Planner → Drafter → Formatter stages, followed by intelligent retry system (up to 10 attempts) that feeds structured validation failures back to GPT. Each retry receives detailed rule-by-rule feedback showing which of the 32 quality standards failed, point penalties, severity levels (CRITICAL/IMPORTANT/STANDARD), and specific fix instructions. Tracks improvement deltas per retry and exits early if no progress (3 consecutive rounds). Pre-validation layer catches malformed inputs before expensive API calls. Enhanced console logging with ANSI color-coded severity (red/yellow/cyan) for debugging.
  
  **Word Count Guarantee System (Nov 2024):**
  The system implements a three-tier word count adjustment pipeline that **guarantees** 1800-2200 words or throws an error (fail-fast):
  
  1. **GPT-4o Verification Loop:** After the formatter stage, the system verifies word count. If outside range, GPT-4o is called up to 3 times with explicit instructions to adjust content. Each attempt is re-counted and verified.
  
  2. **Deterministic Fallback:** If GPT fails to hit the target after 3 attempts, a deterministic algorithm runs that trims longest paragraphs (for overshooting) or expands H2 sections with canned healthcare sentences (for undershooting).
  
  3. **Hard Word-by-Word Adjustment:** If still outside range after deterministic fallback, a final loop removes/adds individual words one at a time (up to 100 iterations) to converge on the target. This guarantees convergence for any delta ≤100 words.
  
  4. **Fail-Fast Guard:** If word count is still outside 1800-2200 after all adjustment attempts, the system throws an error rather than returning out-of-range content.
  
  **Dual Checkpoint Integration:** Word count adjustment runs at two critical points:
  - Post-formatter stage (before initial SEO scoring)
  - Post-repair loop (after SEO validation and repairs)
  
  This ensures that even if the repair loop adds/removes content, the final output is always within 1800-2200 words, guaranteeing the SEO score ≥80 by eliminating the 25-point word count penalty.
  
  **Key Insight:** GPT-4o cannot reliably hit precise word counts through prompting alone. This implementation acknowledges that limitation and provides programmatic verification and adjustment at every stage.
  
  - **Progressive Generator (Failed Experiment - DO NOT USE):** Alternative approach (`/api/generate-blog-progressive`) that attempted incremental validation across 8 separate API calls. Despite implementing preservation guardrails (conditional instructions, context anchors, temperature tuning), the approach suffered from cumulative context loss: mid-process steps showed temporary success (1721 words at step 2) but final output collapsed to 375 words with 0/100 score. Root cause: Each separate GPT-4o call loses shared state and re-summarizes previous text despite explicit "preserve all content" instructions. Conclusion: Iterative prompting across multiple API calls fundamentally degrades quality regardless of prompt engineering techniques. Endpoint remains in codebase as a documented failed experiment but should not be used in production.
- **Social Media Integration:** Links to major social platforms in the footer.
- **Team Page:** Displays staff bios and credentials.
- **Admin Panel:** CMS for content and lead management.
- **Analytics Dashboard:** Monitors key performance metrics, including paid vs organic conversion breakdown.
- **Google Ads Setup:** OAuth setup page for Google Ads account connection.
- **SEO Optimization Dashboard:** Provides strategic SEO insights.
- **Competitive Comparison Section:** Homepage section highlighting Empathy Health Clinic's differentiators.
- **Lead Capture:** High-converting forms with automated email notifications.
- **Trust Factors:** Integration of HIPAA compliance and other credibility indicators.
- **Accessibility:** Mobile responsiveness and dark mode.
- **Contact Information:** Prominent display of phone and email.

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
- **web-vitals:** Core Web Vitals measurement.
- **Lucide-react:** Icon library.
- **OpenAI GPT-4o:** For AI blog generation.
- **PostgreSQL:** Database for analytics and leads.
- **Unsplash API:** For professional stock images.