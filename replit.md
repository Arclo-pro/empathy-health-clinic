# Empathy Health Clinic - Content Management System

## Overview
This project delivers a modern, high-performance CMS and website for Empathy Health Clinic. Its primary goals are to streamline content management, enhance site performance, provide SEO-optimized landing pages for healthcare services and conditions, and offer a high-converting user experience to improve online visibility and patient acquisition.

## User Preferences
I want the agent to prioritize high-level features and architectural decisions. Please do not delve into granular implementation details unless specifically asked. I prefer a concise communication style. When making changes, focus on the most impactful elements first.

## System Architecture

### UI/UX Decisions
The frontend is a responsive React SPA built with TypeScript, Tailwind CSS, and Shadcn UI for a professional healthcare design, featuring full dark mode support and Inter font. It emphasizes aggressive cross-linking, prominent trust factors, and high-conversion lead capture forms.

### Technical Implementations
- **Frontend:** React SPA, TypeScript, Tailwind CSS, Shadcn UI, TanStack Query, Wouter.
- **Backend:** Express.js REST API with hybrid storage: in-memory (MemStorage) for content, PostgreSQL for analytics/leads, and Zod validation.
- **Content Management:** Full CRUD operations via an admin panel (`/admin`) for diverse content types (treatments, therapies, conditions, team, testimonials, insurance, blog, leads).
- **Email Notifications:** SendGrid integration for lead notification emails.
- **SEO Features:** Unique meta tags, canonical tags, structured data (Organization/LocalBusiness, Article schema), auto-generated XML sitemap, robots.txt, SEO-friendly URLs, rich content optimization, mobile-first design, image alt text.
- **Google Maps Integration:** Embedded map on homepage showing clinic location with address, hours, contact info, and directions link for improved local SEO and user experience. Footer map conditionally hidden on `/request-appointment` page to prevent duplicate display.
- **Dynamic Content:** Real-time content updates from the API.
- **Blog System:** Comprehensive blog with listing (`/blog`) and individual post pages (`/blog/:slug`), including SEO metadata, JSON-LD, related articles, author bios, and social sharing. Features hybrid organization with 2 featured posts, 9 latest articles (non-featured), and paginated archive with category filtering (Anxiety, Depression). Category filters don't trigger page scroll; only pagination scrolls to top.
- **Analytics System:** PostgreSQL-backed analytics with Core Web Vitals tracking (LCP, INP, CLS, FCP, TTFB), Google Analytics 4, Facebook Pixel tracking, page view tracking, conversion event tracking, Google Ads conversion tracking (phone clicks & form submissions), Google Ads API integration for paid vs organic attribution with auto-refresh 3x daily (every 8 hours), and an admin analytics dashboard (`/admin/analytics`). Phone call tracking includes automatic event capture when users click phone links on the website, plus a manual "+ Add Phone Call" button in the analytics dashboard for logging calls from external sources (e.g., Google Ads call conversions).
- **SEO Optimization Dashboard:** Strategic SEO tools at `/admin/seo` with Search Console guidance, content gap analysis, internal linking recommendations, and actionable checklists.
- **Performance Optimizations (Mobile-First):**
  - **Code Splitting:** All pages (except Home) lazy-loaded with React.lazy() and Suspense boundaries to reduce initial bundle size
  - **Analytics Deferral:** GA4, web-vitals, and UTM tracking load via requestIdleCallback with 2s timeout (Safari fallback: 1.5s setTimeout)
  - **Resource Hints:** dns-prefetch and preconnect for Google Fonts, Google Maps, GTM, and Ahrefs for faster external resource loading
  - **Script Optimization:** Ahrefs analytics deferred instead of async to prevent parser blocking
  - **Hero Image Preload:** Critical hero image preloaded with fetchpriority="high" for optimal LCP
- **URL Redirects:** 301 permanent redirects configured in `server/index.ts`:
  - **www to non-www redirect:** Preserves 100% domain authority after domain change
  - **Old WordPress blog URLs:** Redirects broken backlinks to preserve SEO value:
    - `/blog/finding-comfort-self-care-tips-for-those-who-are-grieving/` → grief counseling post
    - `/understanding-4-types-of-bpd/` → comprehensive BPD types guide
    - `/narcissistic-behavior-in-a-relationship/` → narcissistic relationships recovery guide

### Feature Specifications
- **Core Pages:** Comprehensive Landing Page, Services Page (`/services`), SEO-optimized landing pages for 12 Insurance Providers, 9 Psychiatric Treatments, 15 Therapy Services, and 10 Conditions.
- **Google Ads Landing Pages:** 5 dedicated pages to improve Quality Scores: EMDR Therapy (`/emdr-therapy`), Virtual/Telehealth Psychiatry (`/virtual-therapy`), Crisis/Urgent Care Therapy (`/crisis-therapy`), Depression Counseling (`/depression-counseling`), and Anxiety Therapy (`/anxiety-therapy`). Each optimized for specific keyword clusters with comprehensive content, lead capture forms, FAQ sections, and trust factors.
- **Location Pages (`/locations`):** 11 city-specific landing pages optimized for local SEO including psychiatry services in Winter Park, Orlando, Altamonte Springs, Maitland, Casselberry, and Lake Mary. Each page features unique city-specific content, LocalBusiness schema with Winter Park address and areaServed array, internal links to services and appointment pages, and city-targeted meta descriptions.
- **Blog Section (`/blog`):** 172 total SEO-optimized articles including 165 migrated posts and 14 new posts (high-value content targeting keyword gaps: BPD types, narcissistic relationships, ADHD combined type, anxiety disorders, psychotic depression, nocturnal panic attacks, and chronic anxiety) with features like category filters and JSON-LD.
- **AI Blog Generator (`/admin/blog`):** Automated blog generation system using Replit AI Integrations (OpenAI GPT-4o) that creates 2,000-word SEO-optimized, HIPAA-compliant blogs following 32 quality standards with comprehensive automated validation. Features include clickbait title generator, global image deduplication (PostgreSQL-backed), Unsplash API integration for professional stock images, link validation to prevent 404s, 100-point SEO scoring system with 22 automated quality checks, and one-click publishing to CMS.
  
  **Autonomous Blog Generation (New):** Fully autonomous content strategy system that analyzes empathyhealthclinic.com site structure, identifies content gaps by comparing existing 172 blog articles against 9 treatments, 15 therapies, and 11 conditions, automatically selects the highest-priority strategic topic based on SEO value and service alignment, and generates complete blogs with zero manual input. Features strict quality gates requiring minimum 70/100 SEO score and zero HIPAA violations before publication, ensuring only compliant content is surfaced. API endpoints: `/api/suggest-topic` (returns auto-suggested topic), `/api/content-gaps` (lists all strategic opportunities), `/api/auto-generate-blog` (one-click autonomous generation). 
  
  **Automated Validation Checks (22/32 standards):**
  1. Meta description length (150-160 chars) - 25 point penalty
  2. Word count (2000±5 words) - 25 point penalty
  3. Exactly one H1 tag - 20 point penalty
  4. Minimum 6 H2 subheadings - 5 point penalty
  5. H3 heading hierarchy (proper nesting) - 3 point penalty
  6. Minimum 4 internal links - 10 point penalty
  7. Minimum 3 external links - 7 point penalty
  8. Unique anchor text (no duplicates) - 10 point penalty
  9. Title length (≤60 chars) - 10 point penalty
  10. Primary keyword in title - 8 point penalty
  11. Primary keyword in meta description - 8 point penalty
  12. Primary keyword in first paragraph - 5 point penalty
  13. Keyword density (0.5-3%) - 7 point penalty
  14. HIPAA compliance (no patient identifiers) - 25 point penalty total
  15. Local SEO mentions (2+ Orlando/Winter Park) - 12 point penalty total
  16. Authoritative external links (NIMH, APA, SAMHSA, etc.) - 15 point penalty total
  17. Proper HTML structure - 5 point penalty
  18. No placeholder text ([brackets], "TODO", etc.) - 15 point penalty
  19. Call-to-action (CTA) presence - 8 point penalty
  20. Internal link destination validation - 5 point penalty
  21. Adult-only content indicator (18+) - 5 point penalty
  22. Link format validation - varies
  
  **GPT-4o Prompt-Enforced (10 remaining standards):**
  - Complete sentences (no truncation)
  - Professional structure (intro, 6-8 sections, conclusion)
  - Image count (1 featured + 3-4 content images)
  - HIPAA-compliant imagery
  - Professional stock photos
  - Image alt text
  - Natural keyword distribution
  - Mental health specialization focus
  - Accessibility specifics
  - Mobile-friendly formatting
  
  **Quality Threshold:** Blogs scoring below 70/100 trigger console warnings with detailed issue lists to prevent low-quality content publication.
- **Social Media Integration:** Footer includes links to Facebook, Twitter/X, Instagram, TikTok, LinkedIn, YouTube, and ZocDoc for comprehensive social presence and patient engagement.
- **Team Page (`/team`):** Displays staff with bios and credentials.
- **Admin Panel (`/admin`):** CMS for content editing and lead management.
- **Analytics Dashboard (`/admin/analytics`):** Monitors key performance metrics including paid vs organic conversion breakdown.
- **Google Ads Setup (`/admin/google-ads-setup`):** OAuth setup page for connecting Google Ads account to enable paid conversion tracking and ROI analytics.
- **SEO Optimization Dashboard (`/admin/seo`):** Provides strategic SEO insights and tools.
- **Competitive Comparison Section:** "Why Choose Empathy Health Clinic?" section on homepage comparing Empathy Health Clinic vs Healing Psychiatry of Florida across 3 key differentiators (Personalized Care, Faster Access, Telehealth Statewide) with high-converting CTA.
- **Lead Capture:** High-converting forms with automated email notifications.
- **Trust Factors:** Integration of credibility indicators like HIPAA compliance.
- **Accessibility:** Mobile responsiveness and dark mode support.
- **Contact Information:** Prominent display of phone (386-848-8751) and email (providers@empathyhealthclinic.com).

### System Design Choices
The system uses an in-memory storage solution for simplified deployment, resulting in data reset on server restarts. The project structure separates client, server, and shared concerns for modularity. Content types are rigorously defined to support detailed and SEO-rich pages.

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

## Google Ads Integration
The system includes a complete Google Ads API integration for tracking paid vs organic conversions:

### Configuration Required
1. **Basic Credentials** (already configured in Replit Secrets):
   - `GOOGLE_ADS_CLIENT_ID`: OAuth 2.0 Client ID
   - `GOOGLE_ADS_CLIENT_SECRET`: OAuth 2.0 Client Secret
   - `GOOGLE_ADS_CUSTOMER_ID`: Google Ads Account ID (4749499368)
   - `GOOGLE_ADS_DEVELOPER_TOKEN`: API Developer Token

2. **OAuth Refresh Token** (needs to be generated):
   - Visit `/admin/google-ads-setup` to complete OAuth flow
   - Authorize with Google Ads account
   - Copy the refresh token to Replit Secrets as `GOOGLE_ADS_REFRESH_TOKEN`

### Features
- **Paid vs Organic Attribution:** Analytics Dashboard shows breakdown of conversions from paid ads vs organic search
- **ROI Tracking:** Displays ad spend, cost per conversion, and campaign performance
- **Real-time Metrics:** Fetches conversion data directly from Google Ads API with configurable time ranges
- **Conversion Comparison:** Visual comparison of paid and organic conversion rates

### Architecture
- **Backend Service (`server/google-ads-service.ts`):** Encapsulates OAuth flow, API authentication, and data fetching
- **API Routes (`server/routes.ts`):** RESTful endpoints for status checks, OAuth callbacks, and conversion data
- **Setup Page (`/admin/google-ads-setup`):** Admin interface for OAuth authentication
- **Analytics Dashboard (`/admin/analytics`):** Displays paid vs organic conversion metrics with cost analysis