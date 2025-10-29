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
- **Backend:** Express.js REST API with in-memory storage (MemStorage) and Zod validation.
- **Content Management:** Full CRUD operations via an admin panel (`/admin`) for diverse content types (treatments, therapies, conditions, team, testimonials, insurance, blog, leads).
- **Email Notifications:** SendGrid integration for lead notification emails.
- **SEO Features:** Unique meta tags, canonical tags, structured data (Organization/LocalBusiness, Article schema), auto-generated XML sitemap, robots.txt, SEO-friendly URLs, rich content optimization, mobile-first design, image alt text.
- **Dynamic Content:** Real-time content updates from the API.
- **Blog System:** Comprehensive blog with listing (`/blog`) and individual post pages (`/blog/:slug`), including SEO metadata, JSON-LD, related articles, author bios, and social sharing.
- **Analytics System:** Core Web Vitals tracking (LCP, INP, CLS, FCP, TTFB), Google Analytics 4, page view tracking, conversion event tracking, and an admin analytics dashboard (`/admin/analytics`).
- **SEO Optimization Dashboard:** Strategic SEO tools at `/admin/seo` with Search Console guidance, content gap analysis, internal linking recommendations, and actionable checklists.

### Feature Specifications
- **Core Pages:** Comprehensive Landing Page, Services Page (`/services`), SEO-optimized landing pages for 12 Insurance Providers, 9 Psychiatric Treatments, 15 Therapy Services, and 10 Conditions.
- **Blog Section (`/blog`):** 165 migrated and 7 new SEO-optimized articles with features like category filters and JSON-LD.
- **Team Page (`/team`):** Displays staff with bios and credentials.
- **Admin Panel (`/admin`):** CMS for content editing and lead management.
- **Analytics Dashboard (`/admin/analytics`):** Monitors key performance metrics.
- **SEO Optimization Dashboard (`/admin/seo`):** Provides strategic SEO insights and tools.
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
- **web-vitals:** Core Web Vitals measurement.
- **Lucide-react:** Icon library.