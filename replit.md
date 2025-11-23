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
- **URL Management:** Unified canonicalization middleware for www removal, trailing slash normalization, and content redirects, with a dynamic blog redirect system.

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