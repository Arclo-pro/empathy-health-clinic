# Empathy Health Clinic - Mental Health Practice Website

## Overview

This is a full-stack web application for Empathy Health Clinic, a mental health practice serving the Orlando/Winter Park, Florida area. The application provides:

- Patient-facing website with service pages, provider information, and appointment booking
- Blog system with automated content generation and SEO optimization
- Admin dashboard for analytics, blog management, and SEO monitoring
- Automated SEO pipeline including prerendering for search engine crawlability
- Lead capture forms with analytics tracking
- Insurance verification and coverage information pages

The site is built for high SEO performance with server-side rendering, prerendered HTML snapshots for crawlers, structured data markup, and comprehensive internal linking.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **Build Tool**: Vite with separate SSR configuration
- **State Management**: TanStack React Query for server state
- **Forms**: React Hook Form with Zod validation

The frontend uses a component-based architecture with reusable templates for landing pages, blog posts, and service pages. Key patterns include:
- `LandingPageTemplate` for service/condition pages
- `SEOHead` component for meta tags and structured data
- Shared UI components from shadcn/ui in `client/src/components/ui/`

### Backend Architecture

- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful endpoints under `/api/`
- **Session Management**: connect-pg-simple for PostgreSQL-backed sessions

The server handles:
- API routes for leads, analytics, blog content, and admin functions
- Prerender middleware that serves static HTML snapshots to crawlers
- Static file serving for the built frontend
- Email notifications via SendGrid

### Database

- **ORM**: Drizzle ORM
- **Database**: PostgreSQL (Neon serverless)
- **Schema Location**: `shared/schema.ts`
- **Migrations**: `migrations/` directory, managed via `drizzle-kit push`

### SSR and Prerendering

The site uses a hybrid rendering approach:
1. **Development**: Vite dev server with HMR
2. **Production**: 
   - Vite builds client bundle to `dist/public/`
   - SSR entry point builds to `dist/server/`
   - Puppeteer prerenders all routes to `dist/prerendered/`
   - Server serves prerendered HTML when available, falls back to SPA shell

Build pipeline is controlled by `scripts/build-production.sh` which:
- Builds frontend and server bundles
- Generates route manifest from `routes/allRoutes.json`
- Runs Puppeteer prerendering
- Validates output completeness
- Fixes asset references in prerendered HTML

### SEO Infrastructure

- Structured data (JSON-LD) for MedicalOrganization, LocalBusiness, FAQPage
- Canonical URLs and meta tags via `SEOHead` component
- XML sitemap generation
- Automated internal linking between related pages
- Blog post automation with keyword targeting

## External Dependencies

### Third-Party Services

- **Database**: Neon PostgreSQL (`@neondatabase/serverless`)
- **Email**: SendGrid (`@sendgrid/mail`) for transactional emails and notifications
- **Analytics**: Microsoft Clarity, Google Analytics 4, Google Tag Manager
- **Search Console**: Google Search Console API for SEO monitoring
- **Image CDN**: Unsplash API for blog images

### APIs Consumed

- PageSpeed Insights API for performance monitoring
- Google Ads conversion tracking
- Axios for HTTP requests

### Key NPM Dependencies

- `drizzle-orm` + `drizzle-kit`: Database ORM and migrations
- `puppeteer`: Headless Chrome for prerendering
- `compression`: Response compression middleware
- `wouter`: Client-side routing
- Full Radix UI component primitives for accessible UI
- `lucide-react`: Icon library

### Environment Variables Required

- `DATABASE_URL`: PostgreSQL connection string
- `SENDGRID_API_KEY`: For email notifications
- `GA_MEASUREMENT_ID`, `GA_API_SECRET`: Google Analytics
- SMTP credentials for email delivery
- Various API keys for SEO tools