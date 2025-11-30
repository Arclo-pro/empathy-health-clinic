# Empathy Health Clinic - Content Management System

## Overview
This project delivers a modern, high-performance CMS and website for Empathy Health Clinic. Its primary purpose is to streamline content management, enhance site performance, improve online visibility, and drive patient acquisition for mental health services, aiming to establish the clinic as a leading provider. The system supports SEO-optimized landing pages, comprehensive analytics, and automated SEO workflows to achieve these goals.

## User Preferences
I want the agent to prioritize high-level features and architectural decisions. Please do not delve into granular implementation details unless specifically asked. I prefer a concise communication style. When making changes, focus on the most impactful elements first.

## System Architecture
### UI/UX Decisions
The frontend is a responsive React SPA built with TypeScript, Tailwind CSS, and Shadcn UI. It features a professional healthcare design, full dark mode support, the Inter font, aggressive cross-linking, prominent trust factors, and high-conversion lead capture forms.

### Technical Implementations
- **Frontend:** React SPA with TypeScript, Tailwind CSS, Shadcn UI, TanStack Query, and Wouter for routing.
- **Backend:** Express.js REST API with hybrid storage (in-memory for content, PostgreSQL for analytics/leads) and Zod for validation.
- **Content Management:** Full CRUD operations via an admin panel for various content types, including a comprehensive blog system with AI Blog Generation.
- **SEO Features:** Comprehensive SEO implementation with unique meta tags, canonical tags, structured data, auto-generated XML sitemap, robots.txt, SEO-friendly URLs, and strategic internal linking. Includes real-time Google ranking tracking, competitor analysis, and an autonomous SEO task executor.
- **SEO Webhook Endpoint:** Automated SEO task implementation via `/api/seo/implement` webhook. Receives prioritized tasks from external schedulers and automatically executes landing page creation, optimization, and technical fixes using TypeScript scripts. Requires `SEO_WEBHOOK_SECRET` for authentication.
- **Analytics System:** PostgreSQL-backed analytics tracking Core Web Vitals, GA4, Facebook Pixel, Microsoft Clarity, page views, conversion events, and Google Ads conversions, with a dedicated admin dashboard and Google Ads API integration.
- **Admin Dashboards:** Includes a Link & Performance Monitor, SEO Optimization Dashboard, Blog SEO Optimizer, and SEMrush Keyword Optimizer.
- **Performance Optimizations:** Mobile-first approach with code splitting, analytics deferral, resource hints, script optimization, and hero image preloading.
- **JavaScript Optimization (November 2025):** Comprehensive JS audit implementation:
  - **Compression**: Gzip middleware (level 6) enabled in server/index.ts
  - **Code Splitting**: React.lazy for 100+ pages with Suspense fallbacks
  - **Analytics Deferral**: requestIdleCallback for GA4, Facebook Pixel, Microsoft Clarity
  - **Resource Hints**: modulepreload for main.tsx, dns-prefetch for all third-party scripts (GTM, Clarity, GA, Facebook)
  - **Script Guards**: All dynamic script injections have duplicate prevention
  - **No Inline Handlers**: All event handlers use React onClick (not HTML onclick)
  - **No WordPress Legacy**: All wp-includes/wp-content scripts removed (410 Gone responses)
  - **Note**: vite.config.ts is write-protected; chunk size budgeting not configurable
- **URL Management:** Unified canonicalization middleware for www removal, trailing slash normalization, content redirects, and comprehensive query parameter stripping (40+ tracking params). Dynamic blog redirect system with SEO-safe slug normalization.
- **Title & Meta Description Optimization (November 2025):** SEOHead.tsx now enforces: titles max 60 chars with Title Case normalization and automatic brand suffix; meta descriptions max 160 chars with 80-char minimum and YMYL-compliant fallback generation. Applied to document.title, og:title/description, twitter:title/description.
- **Meta Keywords Optimization (November 2025):** formatKeywords() enforces 3-7 keyword limit with: utility page suppression, canonical consolidation path exclusion, lowercase normalization, deduplication, and automatic backfilling. GEO_KEYWORD_MAP provides path-specific geo terms for 9 Central Florida locations (Orlando, Winter Park, Kissimmee, Altamonte Springs, Lake Mary, Sanford, Apopka, Maitland, Casselberry).
- **H1 Tag Optimization (November 2025):** Centralized H1 formatting via `formatH1()` in seoHelpers.ts. Enforces 20-70 char limits, Title Case with uppercase abbreviation preservation (FL, ADHD, CBT, etc.), pipe symbol replacement. LandingPageTemplate applies formatH1 to all hero titles. Orlando cluster H1s differentiated: "Psychiatrist Orlando", "ADHD Psychiatrist Orlando", "Bipolar Psychiatrist Orlando", etc. to prevent keyword cannibalization.
- **H2 Tag Optimization (November 2025):** Centralized H2 formatting via `formatH2()` in seoHelpers.ts. Enforces 25-70 char limits for ALL inputs, Title Case with uppercase abbreviation preservation (ADHD, CBT, TMS, EMDR, GAD, OCD, PTSD, etc.), generic heading prevention, and automatic contextual suffix addition (" in Orlando, FL" or " - Expert Care in Orlando, FL") for short headings. Includes recursion guards for safe fallback handling. LandingPageTemplate applies formatH2 to all H2 headings. Unique H2 maps defined for Orlando cluster, location, insurance, and condition pages to prevent cannibalization. Added validateH2() for validation and isGenericH2() for detection.
- **Security Hardening (November 2025):** YMYL-compliant security headers (X-Frame-Options DENY, X-Content-Type-Options nosniff, CSP, Referrer-Policy, Permissions-Policy). Rate limiting: 10 requests/15min for form submissions, 100 requests/min for API endpoints. Enhanced structured data with medical qualifications, founder info, and isAcceptingNewPatients flags.
- **Robots Directives & Indexing Control (November 2025):** Comprehensive robots directive system with:
  - **SEOHead.tsx noindex logic**: Expanded NOINDEX_PATHS for admin/auth, legal/utility, confirmation/thank-you, error, development/test, and attachment/media pages. Enhanced isNoindexPage() handles API endpoints, JSON files, and debug routes.
  - **Canonical + Robots alignment**: Consolidated pages (Orlando cluster pointing to /psychiatrist-orlando) now get noindex with NO canonical tag to prevent SEO contradictions.
  - **X-Robots-Tag headers**: Server middleware for admin, auth, config, debug, examples, test, API endpoints, static assets (.json, .csv, .js, .css), and attachment/media pages.
  - **robots.txt**: Comprehensive disallow rules for admin, utility, search/filter, API, attachment/media, and UTM parameters. AI crawler allowances (Google-Extended, GPTBot, ChatGPT-User, PerplexityBot, Claude-Web, Anthropic-AI). All three sitemaps referenced (sitemap_index.xml, sitemap.xml, image-sitemap.xml).
  - **Pagination noindex**: Paginated pages (?page=N) get noindex,follow with canonical to base path.
  - **Hreflang Internationalization**: Dual hreflang tags (en-us, x-default) for all indexable pages. Reuses canonicalUrl directly for guaranteed alignment with preferredDomain normalization. Skipped for noindex, paginated, search/filter, and consolidated pages. Includes proper cleanup on component unmount.
- **Structured Data Architecture (November 2025):** Unified schema generation via `client/src/lib/structuredData.ts` (StructuredDataBuilder):
  - **Consolidated Builders**: Organization, LocalBusiness, Physician, FAQ, Article, Insurance, Breadcrumb, WebPage, MedicalWebPage schema builders with builder-level filtering for empty fields
  - **Multi-Type Schemas**: Organization uses ["MedicalClinic", "LocalBusiness", "MedicalOrganization"] with geo coordinates, opening hours, and sameAs social links
  - **Schema Components**: OrganizationSchema, LocalBusinessSchema, PhysicianSchema, FAQSchema, InsuranceSchema all use unified builders
  - **Duplicate Prevention**: Unique data-schema identifiers ("organization", "local-business-{path}", "faq", etc.) with cleanup on route changes
  - **Blog Article Schema**: Includes url, isPartOf, ImageObject structure, and publisher/author references
  - **Insurance Pages**: InsuranceSchema component for insurance landing pages with proper InsuranceAgency/HealthInsurancePlan types
- **YMYL Content Audit Implementation (November 2025):** Comprehensive YMYL compliance via reusable components:
  - `AuthoritativeSource.tsx` / `AuthoritativeSourcesBlock` - Citations to NIMH, APA, NIH for medical content credibility
  - `LocalizedContent.tsx` - Neighborhood details, landmarks, and drive times for location pages (accepts custom props or falls back to CITY_DATA)
  - `InternalLinkBlock.tsx` - Contextual internal links with 5+ entries per category (services, conditions, treatments, locations, insurance)
  - Orlando cluster configs updated with authoritativeSources and internalLinksCategory fields
  - All 4 location pages (Altamonte Springs, Kissimmee, Apopka, Winter Park) enhanced with localized content, internal links, and 3 authoritative sources (NIMH, APA, NIH)
  - All condition pages (AnxietyTherapy, DepressionCounseling, EMDRTherapy, ADHDTestingOrlando, TMSTreatment) include AuthoritativeSourcesBlock for YMYL compliance

### Feature Specifications
- **Core Pages:** Comprehensive landing pages for services, insurance providers, psychiatric treatments, therapy services, and conditions, including Google Ads and city-specific landing pages.
- **Orlando Landing Pages:** Nine SEO-optimized Orlando-specific psychiatry landing pages with LocalBusiness/MedicalBusiness schema and strategic internal linking. Primary target: **/psychiatry-clinic-orlando** (exact H1 "Psychiatry Clinic in Orlando") for #1 ranking goal. Additional pages: /psychiatrist-orlando, /adhd-psychiatrist-orlando, /anxiety-psychiatrist-orlando, /child-psychiatrist-orlando, /bipolar-psychiatrist-orlando, /medication-management-orlando, /telepsychiatry-orlando, /same-day-psychiatrist-orlando. Internal linking: Homepage "Orlando Psychiatry Specialists" section and Footer "Orlando Psychiatry Services" band (both feature /psychiatry-clinic-orlando as first link with emphasized styling).
- **High-Intent Landing Pages:** **/psychiatrist-near-me** - Optimized for the #1 high-intent search term with above-the-fold contact form (not just CTA link), medication management emphasis, insurance badges, and same-week appointment messaging. Expected to increase conversion rate by 25-60% vs. generic therapy page routing.
- **Treatment Landing Pages:** **/emdr-therapy** - EMDR trauma treatment with detailed FAQs and evidence-based information. **/tms-treatment** - Transcranial Magnetic Stimulation for treatment-resistant depression, highlighting FDA approval, non-invasive nature, minimal side effects, and insurance coverage (November 2025).
- **Lead Capture:** High-converting forms with automated email notifications, backend deduplication, and email failure tracking.
- **Trust Factors:** Integration of HIPAA compliance and other credibility indicators.
- **Accessibility:** Mobile responsiveness and dark mode.
- **Redirect Management:** Comprehensive redirect configuration with 100+ mappings covering legacy WordPress URLs, duplicate content, therapy/location/insurance pages, and blog posts. All Soft 404 errors from Google Search Console resolved (November 2025).

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
- **Microsoft Clarity API:** Optional integration for enhanced link monitoring and dead link detection.