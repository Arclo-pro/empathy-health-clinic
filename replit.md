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