# Empathy Health Clinic - Content Management System

## Overview
This project delivers a modern, fast Content Management System (CMS) and website for Empathy Health Clinic, replacing their existing WordPress/Elementor setup. The system provides a lightweight, Replit-based solution with a focus on SEO, comprehensive content management, and a high-converting user experience. The core purpose is to streamline content updates, enhance site performance, and provide detailed, SEO-optimized landing pages for various healthcare services and conditions.

## User Preferences
I want the agent to prioritize high-level features and architectural decisions. Please do not delve into granular implementation details unless specifically asked. I prefer a concise communication style. When making changes, focus on the most impactful elements first.

## System Architecture

### UI/UX Decisions
The frontend is a React Single Page Application (SPA) built with TypeScript, utilizing Tailwind CSS and Shadcn UI components for a professional healthcare design. It features a responsive layout with full dark mode support. Aggressive cross-linking is implemented across all content types to enhance user navigation and SEO. Trust factors are prominently displayed throughout the site to build credibility. Lead capture forms on therapy pages are designed for high conversion with minimal friction.

### Technical Implementations
- **Frontend:** React SPA, TypeScript, Tailwind CSS, Shadcn UI, TanStack Query for data fetching, Wouter for routing.
- **Backend:** Express.js REST API with an in-memory storage (MemStorage) for content. All API endpoints include Zod validation.
- **Content Management:** Full CRUD operations are available via an admin panel (`/admin`) for managing site content, treatments, therapies, conditions, team members, testimonials, insurance providers, blog posts, and leads.
- **Email Notifications:** SendGrid integration automatically sends lead notification emails to providers@empathyhealthclinic.com when forms are submitted. Emails include all contact details and form data in a professional HTML format.
- **SEO Features:** Custom page titles, SEO-friendly URLs (preserving WordPress structure where needed), rich keyword-optimized content, structured FAQ sections, and mobile-responsive design are central to all landing pages (Insurance, Treatment, Therapy, Condition).
- **Dynamic Content:** Real-time content updates are pulled from the API.
- **Blog System:** Complete blog with listing page (`/blog`) and individual post pages (`/blog/:slug`). 7 comprehensive mental health articles migrated from existing site.
- **LiveChat Integration:** Site-wide LiveChat widget (license 17225574) for instant customer support on all pages.

### Feature Specifications
- **Landing Page:** Beautiful, comprehensive landing page.
- **Services Page (`/services`):** Overview of all offerings, categorized with cross-links to treatment/therapy pages.
- **SEO-optimized Landing Pages:** 
  - 12 Insurance Provider pages with comprehensive coverage details
  - 9 Psychiatric Treatment pages (including ESA Letter service)
  - 15 Therapy Service pages
  - 10 Condition pages (Anxiety, Depression, Bipolar, PTSD, Personality Disorders, ADHD, OCD, Eating Disorders, Substance Use Disorders, Postpartum Depression)
- **Blog Section (`/blog`):** 7 comprehensive mental health articles covering topics like nervous breakdowns, anxiety careers, infidelity psychology, counselor wellness, sexuality identity, falling in love timelines, and psychotherapy basics.
- **Team Page (`/team`):** Displays all 9 staff members with professional photos, credentials, and individual bio pages.
- **Patient Portal (`/admin`):** A comprehensive CMS for editing all content types (including blog posts) and viewing leads.
- **Lead Capture:** High-converting forms on therapy pages with automatic email notifications to providers@empathyhealthclinic.com.
- **Trust Factors:** Credibility indicators strategically placed throughout the site.
- **LiveChat Widget:** Site-wide instant chat support for immediate customer assistance.
- **Mobile Responsiveness & Dark Mode:** Full support for various devices and user preferences.
- **Contact Information:** Prominent phone number (386-848-8751) in sticky header, visible on all pages. Email: providers@empathyhealthclinic.com.

### System Design Choices
The system uses an in-memory storage solution, simplifying deployment by removing the need for a separate database setup, though this means data resets on server restarts. The project structure separates client, server, and shared (schemas) concerns, promoting modularity. Content types are rigorously defined to support detailed and SEO-rich pages, including specialized sections like "Who Can Benefit" and "What to Expect."

## External Dependencies
- **React:** Frontend library.
- **TypeScript:** Superset of JavaScript for type safety.
- **Tailwind CSS:** Utility-first CSS framework.
- **Shadcn UI:** Reusable UI components.
- **TanStack Query:** Data fetching and caching library.
- **Wouter:** Lightweight React router.
- **Express.js:** Backend web application framework.
- **Zod:** Schema declaration and validation library.
- **SendGrid:** Email delivery service for lead notifications.
- **LiveChat:** Real-time customer support chat widget.
- **Lucide-react:** Icon library for UI elements.

## Environment Secrets
- **SENDGRID_API_KEY:** Required for email notifications to providers@empathyhealthclinic.com
- **SESSION_SECRET:** Required for admin session management