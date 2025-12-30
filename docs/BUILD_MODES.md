# Build Modes Documentation

This document explains the different build modes available for the Empathy Health Clinic website.

## Quick Reference

| Command | Time | Use Case |
|---------|------|----------|
| `npm run build:fast` | ~30s | CI, development, quick iterations |
| `npm run build:ci` | ~30s | CI pipelines (alias for PRERENDER_MODE=off) |
| `npm run build` | ~5-10min | Production deployment (full prerender) |
| `npm run build:full` | ~5-10min | Same as build (explicit full mode) |

## Build Modes Explained

### build:fast
**Compile only, no prerendering or validations.**

```bash
npm run build:fast
# Or directly:
bash scripts/build-fast.sh
```

Use for:
- CI pipelines that just need to verify compilation
- Development testing
- Quick iterations

Output:
- `dist/index.js` (backend)
- `dist/public/` (frontend assets)

Does NOT produce:
- Prerendered HTML files
- SEO-ready pages for crawlers

### build:ci
**Same as build:fast but via the full script with PRERENDER_MODE=off.**

```bash
npm run build:ci
# Or directly:
PRERENDER_MODE=off bash scripts/build-production.sh
```

### build / build:full
**Full production build with prerendering and all validations.**

```bash
npm run build
# Or explicitly:
npm run build:full
```

Use for:
- Production deployments
- Publishing to Replit
- SEO-critical releases

Output:
- `dist/index.js` (backend)
- `dist/public/` (frontend assets)
- `dist/prerendered/` (310+ prerendered HTML pages)

## Environment Variables

### PRERENDER_MODE

Controls prerendering behavior:

| Value | Description |
|-------|-------------|
| `full` | Prerender all routes (default for production) |
| `off` | Skip prerendering entirely |
| `incremental` | Only prerender if files are missing |

Examples:
```bash
# Skip prerender for CI
PRERENDER_MODE=off npm run build

# Full prerender for production
PRERENDER_MODE=full npm run build

# Use existing prerendered files if available
PRERENDER_MODE=incremental npm run build
```

### PRERENDER_CONCURRENCY

Number of concurrent browser pages for prerendering:

```bash
# Default (2 concurrent pages - safe for Replit)
npm run build

# Higher concurrency (faster but may cause issues)
PRERENDER_CONCURRENCY=4 npm run build

# Single-threaded (most stable)
PRERENDER_CONCURRENCY=1 npm run build
```

### SKIP_DB_CHECK

Skip database validation during build:

```bash
# Skip db validation
SKIP_DB_CHECK=true npm run build
```

## Validation Scripts

Separate validation scripts are available:

```bash
# Check repository size
npm run check:repo

# Validate database tables
npm run check:db

# Check SEO elements (routes, prerendered files)
npm run check:seo

# Verify production assets
npm run check:assets

# Run all checks
npm run check:all
```

## CI Configuration

For CI pipelines, use:

```yaml
# GitHub Actions example
- name: Build (compile only)
  run: npm run build:fast

# Or with the production script:
- name: Build (no prerender)
  run: PRERENDER_MODE=off npm run build
```

## Production vs Development

| Aspect | Development | Production |
|--------|-------------|------------|
| Build command | `build:fast` | `build` or `build:full` |
| Prerendering | None | Full (310+ pages) |
| Database validation | Optional | Required |
| Asset verification | Optional | Required |
| Time | ~30 seconds | ~5-10 minutes |

## Why Prerendering Matters

Prerendering generates static HTML snapshots of all pages for:

1. **SEO Crawlability** - Search engines see fully rendered content
2. **Core Web Vitals** - Faster First Contentful Paint
3. **Social Sharing** - Correct meta tags in link previews
4. **Accessibility** - Content visible without JavaScript

Without prerendering, search engines may not index the site correctly.

## Troubleshooting

### Build is slow
Use `build:fast` for development, `build:full` only for production.

### Prerendering times out
Reduce concurrency: `PRERENDER_CONCURRENCY=1 npm run build`

### CI is timing out
Use `PRERENDER_MODE=off` or `build:fast` for CI builds.

### Missing prerendered pages
Delete `dist/prerendered` and run `npm run build:full` to regenerate.

## Package.json Scripts to Add

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "build:fast": "bash scripts/build-fast.sh",
    "build:full": "bash scripts/build-production.sh",
    "build:ci": "PRERENDER_MODE=off bash scripts/build-production.sh",
    "check:repo": "node scripts/check-repo-size.mjs",
    "check:db": "bash scripts/check-db.sh",
    "check:seo": "bash scripts/check-seo.sh",
    "check:assets": "bash scripts/check-assets.sh",
    "check:all": "bash scripts/check-all.sh"
  }
}
```
