# Empathy Health Clinic - Content Management System

## Overview
This project delivers a modern, high-performance CMS and website for Empathy Health Clinic. Its primary purpose is to streamline content management, enhance site performance, improve online visibility, and drive patient acquisition for mental health services. The system supports SEO-optimized landing pages, comprehensive analytics, and automated SEO workflows to establish the clinic as a leading provider.

## User Preferences
I want the agent to prioritize high-level features and architectural decisions. Please do not delve into granular implementation details unless specifically asked. I prefer a concise communication style. When making changes, focus on the most impactful elements first.

## System Architecture
### UI/UX Decisions
The frontend is a responsive React SPA built with TypeScript, Tailwind CSS, and Shadcn UI. It features a professional healthcare design, full dark mode support, aggressive cross-linking, prominent trust factors, and high-conversion lead capture forms.

### Technical Implementations
- **Frontend Stack:** React SPA with TypeScript, Tailwind CSS, Shadcn UI, TanStack Query, and Wouter for routing.
- **Backend Stack:** Express.js REST API with hybrid storage (in-memory for content, PostgreSQL for analytics/leads) and Zod for validation.
- **Content Management:** Full CRUD operations via an admin panel for various content types, including a comprehensive blog system with AI Blog Generation.
- **SEO Features:** Comprehensive SEO implementation with unique meta tags, canonical tags, structured data, auto-generated XML sitemap, robots.txt, SEO-friendly URLs, strategic internal linking, real-time Google ranking tracking, competitor analysis, and an autonomous SEO task executor.
- **SEO Webhook Endpoint:** Automated SEO task implementation via `/api/seo/implement` webhook for executing landing page creation and optimization.
- **Analytics System:** PostgreSQL-backed analytics tracking Core Web Vitals, GA4, Facebook Pixel, Microsoft Clarity, page views, conversion events, and Google Ads conversions, with an admin dashboard.
- **Admin Dashboards:** Includes a Link & Performance Monitor, SEO Optimization Dashboard, Blog SEO Optimizer, and SEMrush Keyword Optimizer.
- **Performance Optimizations:** Mobile-first approach with code splitting, analytics deferral, resource hints, script optimization, and hero image preloading. Includes JavaScript optimization techniques like Gzip compression and dynamic script guards.
- **URL Management:** Unified canonicalization middleware for www removal, trailing slash normalization, content redirects, and query parameter stripping. Dynamic blog redirect system with SEO-safe slug normalization.
- **SEO Tag Optimization:** Enforced character limits and Title Case normalization for titles and meta descriptions. Meta keywords are limited and normalized with geo-specific terms. H1/H2 tags are centrally formatted, enforce character limits, Title Case, and include contextual suffixes to prevent keyword cannibalization.
- **Security Hardening:** YMYL-compliant security headers and rate limiting for form submissions and API endpoints.
- **Robots Directives & Indexing Control:** Comprehensive robots directive system via `SEOHead.tsx` noindex logic, X-Robots-Tag headers, and `robots.txt` rules. Includes pagination noindex and hreflang internationalization.
- **Structured Data Architecture:** Unified schema generation (`StructuredDataBuilder`) for Organization, LocalBusiness, Physician, FAQ, Article, Insurance, Breadcrumb, WebPage, MedicalWebPage, MedicalProcedure, MedicalTherapy, Review, and AggregateRating schemas, with duplicate prevention.
- **YMYL Content Audit Implementation:** Comprehensive YMYL compliance via reusable components for authoritative sources (citations to NIMH, APA, NIH), localized content, and contextual internal linking.

### Feature Specifications
- **Core Pages:** Comprehensive landing pages for services, insurance providers, psychiatric treatments, therapy services, and conditions, including Google Ads and city-specific landing pages.
- **Orlando Landing Pages:** Nine SEO-optimized Orlando-specific psychiatry landing pages with LocalBusiness/MedicalBusiness schema and strategic internal linking, targeting "Psychiatry Clinic in Orlando" as a primary goal.
- **High-Intent Landing Pages:** Optimized pages for high-volume keywords like "psychiatrist near me" and condition-specific searches (anxiety, depression) in Orlando, featuring above-the-fold forms and appointment messaging.
- **Treatment Landing Pages:** Dedicated pages for treatments like EMDR therapy and TMS treatment, detailing FAQs, evidence, and coverage.
- **Lead Capture:** High-converting forms with automated email notifications and backend deduplication.
- **Trust Factors:** Integration of HIPAA compliance and other credibility indicators.
- **Accessibility:** Mobile responsiveness and dark mode.
- **Redirect Management:** Comprehensive redirect configuration to resolve legacy URLs and soft 404 errors.

### System Design Choices
The system uses an in-memory storage solution for simplified deployment, with data resetting on server restarts. The project structure is modular, separating client, server, and shared concerns. Content types are rigorously defined to support detailed and SEO-rich pages. An automated SEO pipeline and an autonomous implementation system continuously optimize the site.

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
- **Serper.dev API:** Real-time SERP ranking checks.
- **web-vitals:** Core Web Vitals measurement.
- **Lucide-react:** Icon library.
- **OpenAI GPT-4o:** For AI blog generation.
- **PostgreSQL:** Database for analytics and leads.
- **Unsplash API:** For professional stock images.
- **Microsoft Clarity API:** Optional integration for enhanced link monitoring.

## Recent Changes
### December 14, 2025 - Screaming Frog SEO Fixes
- **Fixed Canonical Tags**: Removed hardcoded canonical from `client/index.html`; prerender script now waits for SEOHead to set correct canonical before capturing HTML
- **Fixed /same-day-psychiatrist-orlando**: Removed from CANONICAL_CONSOLIDATION_PATHS, added to SELF_CANONICAL_EXACT_PATHS for independent ranking with index,follow
- **Blocked Vite Dev Paths in Production**: Added production-only 404 middleware for /@vite/, /@replit/, /@fs/, /@id/, /__vite paths
- **Updated Internal Links**: Fixed 25+ files pointing to 301 redirect URLs to use final destinations:
  - `/medication-management` → `/services`
  - `/anxiety-treatment` → `/anxiety-therapy`
  - `/trauma-therapy` → `/therapy`
  - `/locations/psychiatrist-orlando` → `/psychiatrist-orlando`
  - `/about` → `/team`

### December 17, 2025 - Universal HTML-Only Crawlability (VERIFIED COMPLETE)
- **Goal**: Make site fully crawlable in "HTML-only" mode for SEO tools like Screaming Frog
- **Status**: **VERIFIED COMPLETE** - All 280 routes prerendered, all acceptance tests passing
- **Acceptance Test Results**:
  - A1: Homepage 130 internal links in View Source (>50 required)
  - A2: Title, meta description, canonical all present
  - A3: Key pages /psychiatrist-orlando (87), /services (100), /team (53) all pass
  - B3: 280 prerendered files (>100 required)
  - C3: Content-Type text/html; charset=utf-8
- **Key Change**: Uses Accept header content negotiation - serves prerendered HTML to ALL text/html requests
- **Route Manifest System**:
  - `scripts/getStaticRoutes.ts` - Extracts static routes from App.tsx
  - `scripts/getBlogRoutes.ts` - Extracts blog slugs from cache
  - `scripts/buildRouteManifest.ts` - Combines into `routes/allRoutes.json` (278 routes)
- **Infrastructure**:
  - `scripts/prerender-puppeteer.ts` - Puppeteer script using route manifest
  - `server/prerender-middleware.ts` - Express middleware with file-exists check → serve snapshot → SPA fallback
  - `scripts/seo-smoke-test.sh` - Automated smoke test for CI/CD (run with `./scripts/seo-smoke-test.sh`)
  - `dist/prerendered/` - 280 pre-rendered HTML files with full React content
- **How It Works**:
  1. Route manifest pipeline: staticRoutes.json + blogRoutes.json → allRoutes.json
  2. Puppeteer visits all routes, waits for React to render (links >= 5), captures full HTML
  3. Middleware serves prerendered HTML to ANY request with Accept: text/html
  4. Crawler parses `<a href="/...">` links in raw HTML - no JavaScript needed
- **Verification Commands**:
  - `./scripts/seo-smoke-test.sh` - Full acceptance test suite
  - `curl -s http://localhost:5000/ | grep -oP '<a [^>]*href="/[a-zA-Z]' | wc -l` - Link count
- **Regeneration Commands** (run after React app changes):
  1. `npx puppeteer browsers install chrome` - Install Chrome (required)
  2. `npx tsx scripts/buildRouteManifest.ts` - Regenerate route manifest
  3. `npx tsx scripts/prerender-puppeteer.ts` - Regenerate prerendered HTML
- **Critical Note**: Always regenerate prerendered HTML after React app changes - stale files cause crawlability issues

### December 6, 2025 - Historical SERP Ranking Tracking
- **Database Table**: Added `keyword_ranking_history` table for persistent storage of ranking snapshots
- **API Endpoints**: 
  - `POST /api/serp/ranking-history/batch` - Saves multiple rankings with validation (400/200/207/500 status codes)
  - `GET /api/serp/ranking-trends` - Returns 7d/30d/90d trend changes for all tracked keywords
- **Trend Indicators**: AdminSERP.tsx now displays color-coded trend arrows (green ↑ improvements, red ↓ declines, gray ↔ no change)
- **Auto-Save**: Rankings are automatically saved to database when checked, with null position filtering
- **Error Handling**: HTTP 207 Multi-Status for partial failures with toast notifications
- **Trend Calculation**: (old position - current position) = positive means improvement (ranking higher)

### December 5, 2025 - Comprehensive SEO Optimization for 25 Priority Keywords
- **SEO Title/Meta Optimization**: Updated 15+ landing pages with optimized titles under 60 characters including "2025", "#1 Rated" messaging
- **Internal Linking Strategy**: Added strategic internal links from Home.tsx and ServicesPage.tsx to all priority SEO pages
- **Telepsychiatry Support Blog**: Created "Why Choose Telepsychiatry in Orlando: 5 Key Advantages in 2025" with multiple anchor text links to combat rank #2 decline
- **Canonical URL Fixes**: Corrected self-referencing canonical URLs on standalone pages (e.g., AnxietyPsychiatristOrlando.tsx)
- **Pages Updated**: PsychiatristOrlando.tsx, AnxietyPsychiatristOrlando.tsx, PsychiatryClinicOrlando.tsx, TelepsychiatryOrlando.tsx, and landingPageConfigs.ts
- **Blog Slug Cache**: Now at 213 slugs (new telepsychiatry blog added)

### December 5, 2025 - "Text Us" Feature Implementation
- **Added SMS text messaging option** for patient scheduling (lower-barrier contact method for anxious patients)
- **TextUsButton component** (`client/src/components/TextUsButton.tsx`):
  - Mobile: Opens native SMS app with prefilled message via `sms:` protocol
  - Desktop: Opens clean modal with phone number and copy button
  - GA4 tracking: `click_text_us` event with location parameter
  - Accessibility: Proper aria-labels and screen reader support
- **Updated StickyMobileCTA** to include Text button between Request Appointment and Call
- **Updated LandingPageTemplate** hero section with third CTA option
- **Phone number for texting**: (407) 635-1021 (configurable via props)
- **Safety disclaimers**: Business hours notice and emergency guidance in modal

### December 4, 2025 - New SEO Landing Pages for Missing Keywords
- **Added 5 new landing pages** targeting missing high-volume keywords:
  - `/psychiatrist-accepting-new-patients-orlando` (480 monthly searches)
  - `/online-psychiatrist-orlando` (390 monthly searches)
  - `/best-psychiatrist-orlando` (320 monthly searches)
  - `/online-psychiatrist-florida` (260 monthly searches)
  - `/mental-health-doctor-orlando` (210 monthly searches)
- **Fixed ADHD redirect conflict**: Removed redirect from `/adhd-testing-orlando` (it's a real page), changed `/adhd-evaluation-orlando` to redirect to `/adhd-testing-orlando`
- **Files Modified**: `client/src/config/landingPageConfigs.ts`, `client/src/App.tsx`, `server/redirect-config.ts`, and 5 new page components
- **Pattern**: All pages use `LandingPageTemplate` with full SEO metadata, JSON-LD schemas, FAQs, and conversion tracking

### December 4, 2025 - GCLID Preservation for Clarity Tracking
- **Problem**: Microsoft Clarity wasn't recording Google Ads sessions because GCLID was lost during SPA navigation
- **Solution**: Implemented multi-layer GCLID persistence:
  - Added sessionStorage for GCLID (`gclid_session` key) - persists during SPA navigation
  - Reordered analytics initialization: UTM tracking now runs BEFORE Clarity
  - Updated Clarity tagging to read from URL → sessionStorage → localStorage (always merges UTM fields)
- **Files Modified**: `client/src/lib/utm-tracker.ts`, `client/src/lib/analytics.ts`, `client/src/App.tsx`
- **Testing**: Verified GCLID persists in sessionStorage after SPA navigation, UTM params merge correctly