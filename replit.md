# Empathy Health Clinic - Content Management System

## Overview
This project delivers a modern, fast Content Management System (CMS) and website for Empathy Health Clinic, replacing their existing WordPress/Elementor setup. The core purpose is to streamline content updates, enhance site performance, provide SEO-optimized landing pages for healthcare services and conditions, and offer a high-converting user experience. It aims to support comprehensive content management and improve online visibility and patient acquisition.

## User Preferences
I want the agent to prioritize high-level features and architectural decisions. Please do not delve into granular implementation details unless specifically asked. I prefer a concise communication style. When making changes, focus on the most impactful elements first.

## System Architecture

### UI/UX Decisions
The frontend is a React Single Page Application (SPA) built with TypeScript, utilizing Tailwind CSS and Shadcn UI components for a professional healthcare design. It features a responsive layout with full dark mode support. Typography uses Inter font exclusively, loaded via modern Google Fonts API with preconnect optimization. Aggressive cross-linking is implemented across all content types to enhance user navigation and SEO. Trust factors are prominently displayed throughout the site, and lead capture forms are designed for high conversion.

### Technical Implementations
- **Frontend:** React SPA, TypeScript, Tailwind CSS, Shadcn UI, TanStack Query for data fetching, Wouter for routing.
- **Backend:** Express.js REST API with an in-memory storage (MemStorage) for content. All API endpoints include Zod validation.
- **Content Management:** Full CRUD operations via an admin panel (`/admin`) for managing site content, including treatments, therapies, conditions, team members, testimonials, insurance providers, blog posts, and leads.
- **Email Notifications:** SendGrid integration sends lead notification emails to specified recipients upon form submission.
- **SEO Features:** Comprehensive SEO optimization including unique meta tags, structured data (Organization/LocalBusiness, Article schema), auto-generated XML sitemap, proper robots.txt, SEO-friendly URLs, rich content optimization, mobile-first design, and image alt text.
- **Dynamic Content:** Real-time content updates are pulled from the API.
- **Blog System:** Complete blog with listing page (`/blog`) and individual post pages (`/blog/:slug`), featuring extensive SEO metadata, JSON-LD, related articles, author bios, and social sharing. Blog content from WordPress has been migrated, converted to Markdown, and enhanced with internal links and optimized imagery.
- **Analytics System:** Site health monitoring with Core Web Vitals tracking (LCP, INP, CLS, FCP, TTFB), Google Analytics 4 integration, page view tracking, conversion event tracking, and an admin analytics dashboard at `/admin/analytics`.
- **SEO Optimization Dashboard:** Comprehensive SEO strategy tools at `/admin/seo` including Search Console integration guidance, content gap analysis for "almost ranking" keywords, internal linking recommendations using hub-and-spoke methodology, and actionable week-by-week implementation checklists. Complete SEO guide available at `SEO_OPTIMIZATION_GUIDE.md`.

### Feature Specifications
- **Landing Page:** Comprehensive and conversion-focused.
- **Services Page (`/services`):** Overview of all offerings with cross-links.
- **SEO-optimized Landing Pages:** Dedicated pages for 12 Insurance Providers, 9 Psychiatric Treatments, 15 Therapy Services, and 10 Conditions.
- **Blog Section (`/blog`):** 165 migrated and 7 initially created SEO-optimized mental health articles with featured posts, category filters, JSON-LD, meta tags, related articles, author bios, and social sharing.
- **Team Page (`/team`):** Displays staff members with photos, credentials, and bios.
- **Patient Portal (`/admin`):** Comprehensive CMS for content editing and lead management.
- **Analytics Dashboard (`/admin/analytics`):** Monitors Core Web Vitals, GA4 status, page views, and conversion metrics.
- **SEO Optimization Dashboard (`/admin/seo`):** Strategic SEO tools providing Search Console access, content gap opportunities (targeting keywords in positions 11-30), internal linking strategy recommendations, and actionable checklists for improving organic search performance.
- **Lead Capture:** High-converting forms with automated email notifications.
- **Trust Factors:** Credibility indicators like HIPAA compliance messaging and insurance logos are strategically placed.
- **Mobile Responsiveness & Dark Mode:** Full support across devices and user preferences.
- **Contact Information:** Prominent display of phone number (386-848-8751) and email (providers@empathyhealthclinic.com).

### System Design Choices
The system uses an in-memory storage solution for simplified deployment, though this means data resets on server restarts. The project structure separates client, server, and shared concerns for modularity. Content types are rigorously defined to support detailed and SEO-rich pages.

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
- **web-vitals:** Core Web Vitals measurement.
- **Lucide-react:** Icon library.

## Environment Secrets
- **SENDGRID_API_KEY:** Required for email notifications to providers@empathyhealthclinic.com and kevin.mease@gmail.com
- **SESSION_SECRET:** Required for admin session management
- **VITE_GA_MEASUREMENT_ID** (Optional): Google Analytics 4 Measurement ID for enhanced tracking and reporting. Get this from your Google Analytics account (Admin > Property > Data Streams > Web). Format: G-XXXXXXXXXX
- **VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION** (Optional): Google Search Console verification code for site ownership verification and SEO monitoring.

## Google Search Console Setup Instructions

To enable Google Search Console monitoring for SEO insights:

1. **Go to Google Search Console:** Visit https://search.google.com/search-console
2. **Add Property:** Click "Add Property" and enter your domain: `empathyhealthclinic.com`
3. **Choose HTML Tag Verification:** Select the "HTML tag" verification method
4. **Copy Verification Code:** You'll see a meta tag like: `<meta name="google-site-verification" content="XXXXXXXXXX" />`
5. **Add to Replit Secrets:** 
   - Go to your Replit project's Secrets tab (🔒 icon)
   - Add a new secret named: `VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION`
   - Paste ONLY the content value (the XXXXXXXXXX part, not the entire meta tag)
6. **Publish Your Site:** Use the "Publish" button in Replit to deploy your changes
7. **Verify in Search Console:** Return to Google Search Console and click "Verify"

Once verified, you'll get access to:
- Search performance data (impressions, clicks, average position)
- Index coverage reports
- Mobile usability insights
- Security issues alerts
- Sitemap submission and monitoring