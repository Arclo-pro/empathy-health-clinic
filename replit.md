# Empathy Health Clinic - Content Management System

## Project Overview

A modern, fast website with a content management system for Empathy Health Clinic, replacing WordPress/Elementor with a lightweight Replit-based solution.

## Architecture

**Frontend:**
- React SPA with TypeScript
- Tailwind CSS + Shadcn UI components
- TanStack Query for data fetching
- Wouter for routing
- Professional healthcare design with light/dark mode

**Backend:**
- Express.js REST API
- In-memory storage (MemStorage)
- Zod validation on all endpoints
- Full CRUD operations for all content types

**Key Features:**
- ✅ Beautiful landing page with all sections
- ✅ SEO-optimized insurance provider landing pages with custom URLs
- ✅ SEO-optimized treatment landing pages with comprehensive content
- ✅ SEO-optimized therapy landing pages with comprehensive content
- ✅ High-converting lead capture forms on therapy pages
- ✅ Patient Portal at `/admin` for editing all content
- ✅ Real-time content updates from API
- ✅ Mobile-responsive design
- ✅ Dark mode support

## Content Structure

The CMS manages the following content types:

1. **Site Content** - Hero section, footer info, about text
2. **Treatments** - Treatment services with comprehensive landing pages
3. **Therapies** - Therapy modalities with comprehensive landing pages
4. **Team Members** - Staff profiles with photos and credentials
5. **Testimonials** - Patient reviews with ratings
6. **Insurance Providers** - Accepted insurance companies with detailed landing pages
7. **Conditions** - Mental health conditions treated
8. **Leads** - Contact form submissions from therapy landing pages

## Insurance Provider Pages

Each insurance provider has a dedicated SEO-optimized landing page:

- **Main Insurance Page:** `/insurance` - Overview of all accepted providers
- **Provider Pages:** `/{provider}-{provider}-coverage` - Detailed coverage information

### Provider Page Content:
- Custom hero section with provider logo and title
- Full description of the partnership
- Coverage details and plan information
- Frequently Asked Questions (FAQs)
- Services offered
- Contact information and appointment scheduling

### SEO Features:
- Custom page titles for search engines
- Provider-specific URLs preserving WordPress SEO structure
- Rich content for each insurance provider
- Mobile-responsive design

## Treatment Landing Pages

Each treatment service has its own comprehensive SEO-optimized landing page:

- **Treatment Pages:** `/{treatment-slug}` - Full treatment information pages

### Treatment Page Content:
- Custom hero section with treatment title and overview
- Detailed treatment description
- "Who Can Benefit" section targeting specific symptoms/conditions
- "What to Expect" section explaining the treatment process
- Frequently Asked Questions (FAQs) specific to each treatment
- Treatment approach and methodology
- Insurance information
- Contact and scheduling options

### Available Treatment Pages:
- `/bipolar-disorder-treatment` - Bipolar Disorder Treatment
- `/ptsd-treatment` - PTSD Treatment
- `/anger-management-treatment` - Anger Management

### SEO Features:
- Custom page titles optimized for search engines
- SEO-friendly URL slugs
- Rich, keyword-optimized content
- Structured FAQ sections
- Mobile-responsive design

## Therapy Landing Pages

Each therapy modality has its own comprehensive SEO-optimized landing page:

- **Main Therapy Page:** `/therapy` - Overview of all therapy services
- **Therapy Pages:** `/{therapy-slug}` - Full therapy information pages

### Therapy Page Content:
- Custom hero section with therapy title and overview
- Detailed therapy description
- "Who Can Benefit" section targeting specific conditions
- "What to Expect" section explaining the therapy process
- Frequently Asked Questions (FAQs) specific to each therapy
- Therapy approach and methodology
- Insurance information
- Contact and scheduling options

### Available Therapy Pages:
- Therapies can be added/edited via the admin panel
- Examples: CBT, DBT, EMDR, Psychodynamic Therapy, etc.

### SEO Features:
- Custom page titles optimized for search engines
- SEO-friendly URL slugs
- Rich, keyword-optimized content
- Structured FAQ sections
- Mobile-responsive design

### Lead Capture Forms:
- High-converting sidebar form on all therapy pages
- Minimal friction: Only name, email, phone required
- Trust signals: Insurance acceptance, same-week appointments, licensed professionals
- Success state with thank you message
- Alternative call-to-action (phone button)
- Privacy/security reassurance
- Mobile-optimized sticky positioning

## How to Edit Your Website

### Access Patient Portal

1. Navigate to your site
2. Click "Patient Portal" in the header (or visit `/admin`)
3. Use the tabs to edit different sections

### Adding Insurance Provider Logos

Your insurance logos from WordPress need to be uploaded to this project:

1. **Download from WordPress:**
   - Log into your WordPress admin
   - Go to Media Library
   - Download each insurance logo (BCBS, Aetna, Cigna, etc.)

2. **Upload to Replit:**
   - In this project, create folder: `attached_assets/insurance/`
   - Upload your logo files there
   - Recommended naming: `bcbs-logo.png`, `aetna-logo.png`, etc.

3. **Update Patient Portal:**
   - Go to `/admin` → Insurance tab
   - Click "Edit" on each provider
   - Update "Logo Path" to match your uploaded files
   - Example: `/attached_assets/insurance/bcbs-logo.png`

Until you upload the logos, the insurance section will display provider names as text.

### Edit Content

**Site Content Tab:**
- Edit hero title, subtitle, and hero image path
- Update review count and rating text
- Change footer contact information
- Modify about text

**Treatments Tab:**
- Add, edit, or delete treatment services
- Each treatment includes:
  - Title and short description (for cards)
  - Icon (Lucide icon name)
  - URL slug (for SEO-friendly URLs)
  - Page title (for browser tab and search results)
  - Hero section (title and description)
  - Full description
  - "Who Can Benefit" section
  - "What to Expect" section
  - FAQs in JSON format: `[{"question": "...", "answer": "..."}]`
  - Display order
- Click "Learn More" on treatment cards to view full landing pages
- Edit comprehensive content for each treatment service

**Therapies Tab:**
- Add, edit, or delete therapy modalities
- Each therapy includes:
  - Title and short description (for cards)
  - Icon (Lucide icon name)
  - URL slug (for SEO-friendly URLs)
  - Page title (for browser tab and search results)
  - Hero section (title and description)
  - Full description
  - "Who Can Benefit" section
  - "What to Expect" section
  - FAQs in JSON format: `[{"question": "...", "answer": "..."}]`
  - Order (display sequence)
- Click "Learn More" on therapy cards to view full landing pages
- Edit comprehensive content for each therapy service

**Team Tab:**
- All 10 staff members from empathyhealthclinic.com
- Shows 8 members initially with "Show More" button to reveal all
- Professional headshot images for each team member
- Add/remove team members
- Update names, credentials, and image paths
- Reorder team member display

**Testimonials Tab:**
- Add new patient reviews
- Edit existing testimonials
- Set ratings (1-5 stars)
- Reorder testimonials

**Insurance Tab:**
- Add or remove insurance providers
- Edit provider landing page content:
  - Provider name and logo
  - URL slug (for SEO-friendly URLs)
  - Page title and hero section
  - Full description
  - Coverage details
  - FAQs (in JSON format)
  - Display order

**Conditions Tab:**
- Add/remove conditions you treat
- Edit condition descriptions
- Reorder the list

### Important Notes

- **Changes are instant** - Content updates immediately upon saving
- **No database setup needed** - Uses in-memory storage (resets on server restart)
- **Image paths** - Currently using placeholder image paths from `attached_assets/`
- To use custom images, you'll need to add them to the project and reference their paths

## API Endpoints

All endpoints are prefixed with `/api`:

- `GET /api/site-content` - Get site content
- `PUT /api/site-content` - Update site content
- `GET /api/treatments` - List all treatments
- `GET /api/treatments/:id` - Get treatment by ID
- `GET /api/treatments/slug/:slug` - Get treatment by SEO-friendly slug
- `POST /api/treatments` - Create treatment
- `PUT /api/treatments/:id` - Update treatment
- `DELETE /api/treatments/:id` - Delete treatment
- `GET /api/therapies` - List all therapies
- `GET /api/therapies/:id` - Get therapy by ID
- `GET /api/therapies/slug/:slug` - Get therapy by SEO-friendly slug
- `POST /api/therapies` - Create therapy
- `PUT /api/therapies/:id` - Update therapy
- `DELETE /api/therapies/:id` - Delete therapy
- Similar CRUD endpoints for: `/team-members`, `/testimonials`, `/insurance-providers`, `/conditions`
- `GET /api/insurance-providers/slug/:slug` - Get provider by SEO-friendly slug

## Project Structure

```
client/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── admin/          # Admin panel editors
│   │   │   ├── TreatmentsEditor.tsx
│   │   │   ├── TherapiesEditor.tsx
│   │   │   └── ...
│   │   ├── ui/             # Shadcn components
│   │   ├── TreatmentsSection.tsx # Treatment cards on home page
│   │   └── *Section.tsx    # Other landing page sections
│   ├── pages/              # Route pages
│   │   ├── Home.tsx        # Landing page
│   │   ├── Admin.tsx       # Admin panel (7 tabs)
│   │   ├── Insurance.tsx   # Main insurance page
│   │   ├── ProviderCoverage.tsx # Individual provider pages
│   │   ├── TreatmentDetail.tsx  # Individual treatment pages
│   │   ├── Therapy.tsx     # Main therapy listing page
│   │   ├── TherapyDetail2.tsx   # Individual therapy pages
│   │   └── PageBySlug.tsx  # Smart router for slug-based pages
│   └── hooks/              # Custom React hooks
server/
├── routes.ts               # API route handlers
└── storage.ts              # In-memory data storage
shared/
└── schema.ts               # TypeScript types & Zod schemas
```

## Future Enhancements

Potential improvements:
- Add password protection to admin panel
- Implement image upload functionality
- Add PostgreSQL database for persistent storage
- Export/import content as JSON
- Version history for content changes
- Preview changes before publishing

## Development

The application runs on port 5000 with:
- Frontend: Vite dev server
- Backend: Express API server

Changes to code auto-restart the development server.
