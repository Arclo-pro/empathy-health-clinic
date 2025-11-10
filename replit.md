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
- **SEO Features:** Comprehensive SEO implementation including unique meta tags, canonical tags, 100% structured data coverage (Organization/LocalBusiness, Article/BlogPosting, Physician, automatic FAQ schema detection), auto-generated XML sitemap, robots.txt, llms.txt, SEO-friendly URLs, rich content optimization, mobile-first design, image alt text, and strategic internal linking.
- **Google Maps Integration:** Embedded map on the homepage for local SEO.
- **Blog System:** Comprehensive blog with listing and individual post pages, SEO metadata, Article/BlogPosting schema with conditional AggregateRating support, automatic FAQ schema detection, related articles, author bios, social sharing, category filtering, and Markdown link support.
- **Analytics System:** PostgreSQL-backed analytics tracking Core Web Vitals, GA4, Facebook Pixel, Microsoft Clarity, page views, conversion events, and Google Ads conversions, with a dedicated admin dashboard and Google Ads API integration.
- **Link & Performance Monitor (`/admin/link-monitor`):** Comprehensive bounce rate tracking dashboard with Microsoft Clarity API integration.
- **SEO Optimization Dashboard:** Strategic SEO tools at `/admin/seo` for Search Console guidance, content gap analysis, and internal linking recommendations.
- **Blog SEO Optimizer (`/admin/blog-seo`):** Comprehensive blog post optimization tool with real-time SEO scoring based on SEMrush criteria, supporting metadata, content, and ratings editing.
- **Performance Optimizations:** Mobile-first approach with code splitting, analytics deferral, resource hints, script optimization, and hero image preloading.
- **Email Deliverability:** SendGrid sender configuration with comprehensive DNS authentication guidance.
- **Google Indexing Strategy:** Implemented comprehensive action plan to address unindexed URLs and soft 404 errors through 301 redirects, enhanced internal linking, and improved site structure.
- **URL Redirects:** Comprehensive 301 permanent redirects for domain consistency, old WordPress URLs, legacy location patterns, and deprecated treatment URLs.

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