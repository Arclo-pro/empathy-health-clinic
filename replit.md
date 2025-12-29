# Empathy Health Clinic - Content Management System

## Overview
This project delivers a modern, high-performance CMS and website for Empathy Health Clinic. Its primary purpose is to streamline content management, enhance site performance, improve online visibility, and drive patient acquisition for mental health services. The system supports SEO-optimized landing pages, comprehensive analytics, and automated SEO workflows to establish the clinic as a leading provider.

## User Preferences
I want the agent to prioritize high-level features and architectural decisions. Please do not delve into granular implementation details unless specifically asked. I prefer a concise communication style. When making changes, focus on the most impactful elements first.

## System Architecture
### UI/UX Decisions
The frontend is a responsive React SPA built with TypeScript, Tailwind CSS, and Shadcn UI, featuring a professional healthcare design, full dark mode support, aggressive cross-linking, prominent trust factors, and high-conversion lead capture forms.

### Technical Implementations
- **Frontend Stack:** React SPA with TypeScript, Tailwind CSS, Shadcn UI, TanStack Query, and Wouter for routing.
- **Backend Stack:** Express.js REST API with hybrid storage (in-memory for content, PostgreSQL for analytics/leads) and Zod for validation.
- **Content Management:** Full CRUD operations via an admin panel for various content types, including a comprehensive blog system with AI Blog Generation.
- **SEO Features:** Comprehensive SEO implementation including unique meta tags, canonical tags, structured data, auto-generated XML sitemap, robots.txt, SEO-friendly URLs, strategic internal linking, real-time Google ranking tracking, competitor analysis, and an autonomous SEO task executor via a webhook endpoint (`/api/seo/implement`).
- **Analytics System:** PostgreSQL-backed analytics tracking for Core Web Vitals, GA4, Facebook Pixel, Microsoft Clarity, page views, conversion events, and Google Ads conversions, with an admin dashboard.
- **Admin Dashboards:** Includes Link & Performance Monitor, SEO Optimization Dashboard, Blog SEO Optimizer, and SEMrush Keyword Optimizer.
- **Performance Optimizations:** Mobile-first approach with code splitting, analytics deferral, resource hints, script optimization, hero image preloading, JavaScript optimization (Gzip, dynamic script guards).
- **URL Management:** Unified canonicalization middleware for www removal, trailing slash normalization, content redirects, query parameter stripping, and dynamic blog redirect system with SEO-safe slug normalization.
- **SEO Tag Optimization:** Enforced character limits and Title Case normalization for titles and meta descriptions, limited and normalized meta keywords with geo-specific terms, and centrally formatted H1/H2 tags with character limits and contextual suffixes.
- **Security Hardening:** YMYL-compliant security headers and rate limiting for form submissions and API endpoints.
- **Robots Directives & Indexing Control:** Comprehensive robots directive system via `SEOHead.tsx` noindex logic, X-Robots-Tag headers, and `robots.txt` rules, including pagination noindex and hreflang internationalization.
- **Structured Data Architecture:** Unified schema generation (`StructuredDataBuilder`) for various healthcare-related schemas (Organization, LocalBusiness, Physician, FAQ, Article, etc.), with duplicate prevention.
- **YMYL Content Audit Implementation:** Comprehensive YMYL compliance via reusable components for authoritative sources, localized content, and contextual internal linking.
- **Universal HTML-Only Crawlability:** Ensures the site is fully crawlable by search engines in "HTML-only" mode through a prerendering system that serves static HTML snapshots.
- **Pre-deployment Quality Checks:** Multi-layer validation system blocks publishing on regressions:
  - **Database Table Validation** (`scripts/validate-database-tables.ts`): Verifies critical database tables (leads, blog_posts) exist before build; prevents lead form breakage
  - **Asset Integrity Verification** (`scripts/verify-asset-integrity.ts`): Ensures HTML references match actual production assets; prevents blank pages after deploy
  - **JS-Disabled Smoke Test** (`scripts/js-disabled-smoke-test.ts`): Verifies pages render content without JavaScript; catches empty prerendered content
  - **Prerender Validation** (`scripts/validate-prerender.ts`): Validates minimum route count, file sizes, and link counts
  - **QA Redirect Validation** (`scripts/qa/validate-redirects.ts`): Tests all 388+ redirects resolve to 200 status pages; validates problem URLs from Screaming Frog/GSC CSV exports; blocks deployment on 4xx/redirect loops
  - **Screaming Frog Issue Validation** (`scripts/qa/screaming-frog-validator.ts`): Checks for critical SEO issues including pages without internal outlinks, canonical mismatches, H1/H2 issues, and meta description length problems
  - **GSC Indexing Issue Validation** (`scripts/qa/gsc-indexing-validator.ts`): Validates against Google Search Console indexing issues including soft 404s, redirect links, noindex tags, canonical mismatches, and duplicate content
  - **Build Pipeline Gates** (`scripts/build-production.sh`): 15-step build process with `exit 1` on any failure; blocks publishing on regressions
  - All gates are enforced automatically during `npm run build:production`

### Feature Specifications
- **Core Pages:** Comprehensive landing pages for services, insurance providers, psychiatric treatments, therapy services, conditions, and city-specific landing pages (e.g., Orlando).
- **High-Intent Landing Pages:** Optimized pages for high-volume keywords (e.g., "psychiatrist near me") and condition-specific searches, featuring above-the-fold forms.
- **Treatment Landing Pages:** Dedicated pages for treatments like EMDR therapy and TMS treatment, detailing FAQs, evidence, and coverage.
- **Lead Capture:** High-converting forms with automated email notifications and backend deduplication.
- **Trust Factors:** Integration of HIPAA compliance and other credibility indicators.
- **Accessibility:** Mobile responsiveness and dark mode.
- **Redirect Management:** Comprehensive redirect configuration to resolve legacy URLs and soft 404 errors.
- **"Text Us" Feature:** Implemented an SMS text messaging option for patient scheduling, with mobile/desktop specific interactions and GA4 tracking.

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