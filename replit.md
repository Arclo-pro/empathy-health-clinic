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
- **SEO Features:** Comprehensive SEO implementation including unique meta tags, canonical tags, 100% structured data coverage (Organization/LocalBusiness, Article/BlogPosting, Physician, automatic FAQ schema detection), auto-generated XML sitemap, robots.txt, llms.txt, SEO-friendly URLs, rich content optimization, mobile-first design, image alt text, and strategic internal linking. Enhanced LocalBusiness schema with @type: ["MedicalClinic", "Psychiatrist"], complete social media profiles (Facebook, X/Twitter, Instagram, TikTok, LinkedIn, YouTube), geo coordinates, and areaServed covering Winter Park, Orlando, Lake Mary, and Altamonte Springs for improved local SEO and "near me" search visibility. **Robots.txt Fix (Nov 2025):** Resolved SEMrush crawlability error by removing conflicting static robots.txt file with outdated WordPress paths. System now serves clean dynamic robots.txt via Express route that properly allows crawling while protecting admin panel and correctly references sitemap_index.xml.
- **Google Maps Integration:** Embedded map on the homepage for local SEO.
- **Blog System:** Comprehensive blog with listing and individual post pages, SEO metadata, Article/BlogPosting schema with conditional AggregateRating support, automatic FAQ schema detection, related articles, author bios, social sharing, category filtering, and Markdown link support. Blog content rendering includes automatic HTML-to-markdown conversion and GPT artifact removal to ensure clean, professional display of AI-generated content. **Internal Linking (Dec 2024):** Comprehensive internal linking strategy implemented across ALL 176 blog posts (100% coverage) to address SEMrush's 503 missing internal link recommendations. Each post includes minimum 4 strategic internal links to key pages (/therapy, /services, /request-appointment, /team). High-priority posts feature contextual inline links; all posts include standardized "Professional Mental Health Support" resources section. This implementation reduces bounce rates and strengthens site-wide SEO through improved link equity distribution. **Featured Resources Section (Nov 2025):** Added "Featured Mental Health Resources" section to homepage providing authoritative internal links to 24 high-priority blog posts identified in SEMrush report as lacking sufficient inbound links (high bounce rate, low time on page). Section displays grid of 24 cards linking to posts on relationships, anxiety, ADHD, mental health conditions, and career wellness topics. This homepage placement provides high-authority backlinks to address SEMrush's internal linking recommendations. **Content Formatting Improvements (Jan 2025):** Enhanced content formatting on 6 high-bounce-rate blog posts (what-is-love-bombing, prodromal-stage-mental-health, what-is-mental-breakdown, open-relationship-guide, signs-of-crippling-anxiety, understanding-social-exhaustion-adhd-brain) to reduce bounce rates. Improvements include: scannable bullet lists, shortened paragraphs, strategic mid-article CTAs, Quick Self-Check sections, better subheadings, and improved visual hierarchy—all using emoji-free formatting that complies with design guidelines. **SEMrush Blog Optimization (Nov 2025):** Optimized 4 high-priority blog posts per SEMrush recommendations: bipolar-psychosis-symptoms-treatment-recovery, petulant-bpd-symptoms-and-treatment, deciphering-the-differences-therapy-vs-counseling, and top-10-best-low-stress-jobs. Implemented comprehensive SEO enhancements including target keyword optimization (title, H1, meta tags, body content with 8+ mentions), semantic keyword integration (20+ related terms per post), long-form content rewrites (1900-2200 words), comparison tables, FAQs, strategic CTAs, and aggregate ratings (4.8-4.9 stars) for SERP rich snippets. **AggregateRating Schema (Nov 2025):** Extended BlogPost schema with optional AggregateRating fields (averageRating, ratingCount, bestRating, worstRating) to enable star ratings in search results. BlogPosting structured data conditionally includes AggregateRating when rating data is present, improving SERP features and click-through rates.
- **Analytics System:** PostgreSQL-backed analytics tracking Core Web Vitals, GA4, Facebook Pixel, Microsoft Clarity (heatmaps & session recordings), page views, conversion events, and Google Ads conversions, with a dedicated admin dashboard and Google Ads API integration.
- **Link & Performance Monitor (`/admin/link-monitor`):** Comprehensive bounce rate tracking dashboard with Microsoft Clarity API integration (10 calls/day limit, 24-hour caching). Displays high bounce rate pages (70%+) and medium bounce rate pages (40-70%) with actionable recommendations. Includes graceful fallback to local analytics when Clarity API unavailable. Features per-endpoint cache isolation to prevent data corruption across different API surfaces.
- **SEO Optimization Dashboard:** Strategic SEO tools at `/admin/seo` for Search Console guidance, content gap analysis, and internal linking recommendations.
- **Blog SEO Optimizer (`/admin/blog-seo`):** Comprehensive blog post optimization tool with real-time SEO scoring (0-100%) based on SEMrush criteria. Features include: (1) Post listing view with color-coded SEO scores (Excellent 80%+, Good 60-79%, Fair 40-59%, Poor <40%); (2) Three-tab editor for Metadata (title, meta title, meta description, keywords), Content (markdown), and Ratings (aggregate ratings for SERP features); (3) Real-time SEO analysis tracking word count (1800+ target), keyword usage in title/H1/body (0.5-2.5% density), readability (60%+ target), meta description length (120+ chars), and AggregateRating presence; (4) Character counters for meta fields and live star rating preview. Algorithm defaults to first keyword from post.keywords array for accurate scoring in list view. Directly addresses SEMrush recommendations for keyword optimization, content enrichment, and structured data enhancement.
- **Performance Optimizations:** Mobile-first approach with code splitting, analytics deferral, resource hints, script optimization, and hero image preloading. **LiveChat Removal (Nov 2025):** Completely removed all LiveChat scripts and CSS to eliminate unnecessary overhead and improve page load performance.
- **Email Deliverability:** SendGrid sender configuration with comprehensive DNS authentication guidance.
- **Google Indexing Strategy (Nov 2025):** Comprehensive action plan (GOOGLE_INDEXING_STRATEGY.md) created and IMPLEMENTED to address 67 unindexed URLs and 28 soft 404 errors. **Changes made:** (1) Fixed 28 soft 404 errors with 301 permanent redirects for old WordPress blog URLs, tag pages, author pages, date archives, and legacy location patterns; (2) Added "Specialized Therapy Services" section to homepage with 8-card grid linking to high-priority unindexed pages (CBT, anger management, PTSD, ESA letter, focus therapy, virtual counseling, in-person therapy); (3) Updated /services page to display ALL therapies instead of limiting to 6; (4) Added "Locations" section to footer with links to Winter Park, Altamonte Springs, Sanford, Orlando, and Lake Mary. Result: All 67 unindexed pages now have 2-5 internal links each from homepage, footer, and services page.
- **URL Redirects:** Comprehensive 301 permanent redirects for domain consistency, old WordPress URLs, legacy location patterns, and deprecated treatment URLs to preserve SEO value.

### Feature Specifications
- **Core Pages:** Comprehensive landing pages for services, insurance providers, psychiatric treatments, therapy services, and conditions.
- **Google Ads Landing Pages:** 5 dedicated, highly optimized landing pages (e.g., EMDR Therapy, Virtual Psychiatry), with critical pages optimized for local "near me" searches.
- **Location Pages:** 11 city-specific landing pages optimized for local SEO, featuring unique content and LocalBusiness schema, with the Winter Park page featuring a high-conversion design.
- **Blog Section:** Over 170 SEO-optimized articles.
- **AI Blog Generator (`/admin/blog`):** Automated blog generation using OpenAI GPT-4o capable of producing 2,000-word, SEO-optimized, HIPAA-compliant blogs with strategic internal linking, image deduplication, Unsplash API integration, 100-point SEO scoring, and one-click publishing. Includes an Autonomous Blog Generation system with quality gates. Features a 3-Stage Generator (Planner → Drafter → Formatter) with an intelligent retry system and a guaranteed word count adjustment pipeline (1800-2200 words) using GPT-4o verification, deterministic fallback, and hard word-by-word adjustment.
- **Social Media Integration:** Links to major social platforms.
- **Team Page:** Displays staff bios and credentials.
- **Admin Panel:** CMS for content and lead management.
- **Analytics Dashboard:** Monitors key performance metrics.
- **Link & Performance Monitor:** Dashboard at `/admin/link-monitor` tracking bounce rates and identifying problematic pages. Color-coded badges (red for high bounce, secondary for medium), external tool links, and comprehensive recommendations for improving page performance.
- **Google Ads Setup:** OAuth setup page for Google Ads account connection.
- **Competitive Comparison Section:** Homepage section highlighting differentiators.
- **Homepage About Section:** Keyword-rich "About" section for improved SEO.
- **Homepage FAQ Section:** Accordion-based FAQ section.
- **Lead Capture:** High-converting forms with automated email notifications. **Mobile & Duplicate Submission Fix (Nov 2025):** Resolved form hanging and duplicate submission issues by replacing window.location.href with Wouter's setLocation() across all three lead forms (hero, detailed contact, lead capture), eliminating full page reload delays. Added backend deduplication layer that prevents duplicate leads from same email+phone within 5-minute window, protecting against rapid resubmissions and duplicate email notifications.
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
- **Microsoft Clarity API:** Optional integration for enhanced link monitoring and dead link detection (rate limited to 10 calls/day).