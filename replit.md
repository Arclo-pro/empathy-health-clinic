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
- ✅ Admin panel at `/admin` for editing all content
- ✅ Real-time content updates from API
- ✅ Mobile-responsive design
- ✅ Dark mode support

## Content Structure

The CMS manages the following content types:

1. **Site Content** - Hero section, footer info, about text
2. **Services** - Treatment services with icons and descriptions
3. **Team Members** - Staff profiles with photos and credentials
4. **Testimonials** - Patient reviews with ratings
5. **Insurance Providers** - Accepted insurance companies
6. **Conditions** - Mental health conditions treated

## How to Edit Your Website

### Access Admin Panel

1. Navigate to your site
2. Click "Admin" in the header (or visit `/admin`)
3. Use the tabs to edit different sections

### Edit Content

**Site Content Tab:**
- Edit hero title, subtitle, and hero image path
- Update review count and rating text
- Change footer contact information
- Modify about text

**Services Tab:**
- Add, edit, or delete treatment services
- Change service titles, descriptions, and icons
- Reorder services with the order field

**Team Tab:**
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
- Reorder provider display

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
- `GET /api/services` - List all services
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service
- Similar CRUD endpoints for: `/team-members`, `/testimonials`, `/insurance-providers`, `/conditions`

## Project Structure

```
client/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── admin/          # Admin panel editors
│   │   ├── ui/             # Shadcn components
│   │   └── *Section.tsx    # Landing page sections
│   ├── pages/              # Route pages
│   │   ├── Home.tsx        # Landing page
│   │   └── Admin.tsx       # Admin panel
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
