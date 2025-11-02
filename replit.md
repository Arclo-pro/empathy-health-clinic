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
- **URL Redirects:** 301 permanent redirects for `www` to `non-www` and old WordPress blog URLs to preserve SEO value.

### Feature Specifications
- **Core Pages:** Comprehensive landing pages for services, 12 insurance providers, 9 psychiatric treatments, 15 therapy services, and 10 conditions.
- **Google Ads Landing Pages:** 5 dedicated, highly optimized landing pages for EMDR Therapy, Virtual/Telehealth Psychiatry, Crisis/Urgent Care Therapy, Depression Counseling, and Anxiety Therapy.
- **Location Pages:** 11 city-specific landing pages optimized for local SEO, featuring unique content and LocalBusiness schema.
- **Blog Section:** Over 170 SEO-optimized articles, including migrated and new high-value content.
- **AI Blog Generator (`/admin/blog`):** Automated blog generation using Replit AI Integrations (OpenAI GPT-4o) capable of producing 2,000-word, SEO-optimized, HIPAA-compliant blogs. Features include clickbait title generation, image deduplication, Unsplash API integration, link validation, a 100-point SEO scoring system with 32 automated quality checks, and one-click publishing. This includes an **Autonomous Blog Generation** system that identifies content gaps, selects strategic topics, and generates complete blogs with strict quality gates (minimum 80/100 SEO score).

  **Generation Approaches:**
  - **3-Stage Generator with Contextual Feedback Loop (Production):** Uses Planner → Drafter → Formatter stages, followed by intelligent retry system (up to 10 attempts) that feeds structured validation failures back to GPT. Each retry receives detailed rule-by-rule feedback showing which of the 32 quality standards failed, point penalties, severity levels (CRITICAL/IMPORTANT/STANDARD), and specific fix instructions. Tracks improvement deltas per retry and exits early if no progress (3 consecutive rounds). Pre-validation layer catches malformed inputs before expensive API calls. Enhanced console logging with ANSI color-coded severity (red/yellow/cyan) for debugging. **Consistently achieves 100/100 SEO scores with 1995-2005 word blogs.**
  
  **Prompt Engineering Insights (Critical for Maintenance):**
  - **Simplicity Over Micro-Management:** The drafter prompt works best when kept simple and focused on a single goal ("write a detailed, valuable 2000-word article") rather than over-constrained with conflicting instructions like "be precise" + "add detail" + "don't overshoot."
  - **Tested Progression:** Initial attempts at micro-management caused regressions: baseline 75/100 (1690 words) → "add more detail" 68/100 (2054 words, overshot) → "be precise" 38/100 (1443 words, major regression) → **simplified approach 100/100 (1998 words, perfect)**.
  - **Key Success Factors:** (1) Clear 2000-word target without contradictory guidance, (2) Natural language instructions for keyword density (2-3 mentions per section), (3) Let GPT work naturally, (4) Trust repair loop for refinement rather than trying to perfect initial draft.
  - **Keyword Density Repairs:** Enhanced with specific examples and calculations (e.g., "Add 'depression therapy' 3 more times. Examples: 'Understanding depression therapy', 'When considering depression therapy...'") to guide GPT-4o effectively.
  - **Anti-Pattern:** Avoid adding precise numerical constraints (e.g., "1998-2002 words exactly") as GPT-4o becomes overly conservative and undershoots. Better to set aspirational goal and rely on repair loop.
  
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