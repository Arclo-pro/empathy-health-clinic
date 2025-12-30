# Image Migration Strategy: Reducing Repo Size Without SEO Impact

## Current State Analysis

### Image Inventory
- **Total Images**: 13,241 files
- **Total Size**: 1.1GB
- **Location**: `attached_assets/` directory
- **Subdirectories**:
  - `blog_images_batch_01` through `blog_images_batch_10`
  - `blog_images_batch_2024_03` through `blog_images_batch_2024_12`
  - `stock_images/`
  - Root-level images (logos, misc)

### How Images Are Referenced

| Source | Pattern | Count |
|--------|---------|-------|
| Blog Posts | `featuredImage: "/attached_assets/..."` | 173 posts |
| Image Sitemap | `/attached_assets/stock_images/...` | ~50 entries |
| Landing Pages | `img src="/attached_assets/..."` | ~100 pages |
| Structured Data | Schema.org image references | All pages |

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `EXTERNAL_ASSET_URL` | *(unset)* | CDN base URL (e.g., `https://cdn.example.com`) |
| `ASSET_PROXY_MODE` | `cdn-first` when CDN set | `cdn-first` or `local-first` |
| `ASSET_REDIRECT_PERMANENT` | `false` | Set to `true` for 301 redirects |

### Proxy Modes

| Mode | Behavior |
|------|----------|
| **local** | No CDN configured. Serve from `attached_assets/` (default) |
| **cdn-first** | Redirect all images to CDN. Default when `EXTERNAL_ASSET_URL` is set |
| **local-first** | Serve local if file exists, CDN only if missing |

### Cache Headers

| Redirect Type | Cache-Control |
|---------------|---------------|
| 302 (temporary) | `public, max-age=600` (10 minutes) |
| 301 (permanent) | `public, max-age=31536000` (1 year) |

### Querystring Preservation

All querystrings are preserved during redirects:
```
/attached_assets/image.jpg?v=123
→ https://cdn.example.com/attached_assets/image.jpg?v=123
```

---

## SEO Safety Confirmation

| Aspect | Status |
|--------|--------|
| Public URLs | **UNCHANGED** - `/attached_assets/*` paths preserved |
| Blog Post Data | **NO CHANGES** - featuredImage fields unchanged |
| Image Sitemap | **NO CHANGES** - same URLs |
| Structured Data | **NO CHANGES** - same image references |
| Robots.txt | **NO CHANGES** |
| Canonical Tags | **NO CHANGES** |
| Meta Tags | **NO CHANGES** |

---

## Commands

### Manifest Generation
```bash
# Generate inventory of all images (output: scripts/asset-manifest.json)
npx tsx scripts/generate-asset-manifest.ts

# With MD5 checksums (slower)
CALCULATE_MD5=true npx tsx scripts/generate-asset-manifest.ts
```

**Note**: `scripts/asset-manifest.json` is gitignored. Regenerate as needed.

### Validation
```bash
# Validate against local files
bash scripts/validate-assets-local.sh

# Validate against CDN
EXTERNAL_ASSET_URL=https://your-cdn.com bash scripts/validate-assets-cdn.sh
```

### Repo Size Check
```bash
node scripts/check-repo-size.mjs
```

---

## Migration Phases

### Phase 1: Code Ready (DONE)
- [x] Asset proxy middleware implemented
- [x] Manifest generation script
- [x] Validation scripts
- [x] Repo size guardrails

### Phase 2: External Setup (User Action)

#### Recommended: Cloudflare R2
```bash
# Install rclone
brew install rclone  # or apt install rclone

# Configure R2 (follow rclone prompts)
rclone config

# Upload images (exclude macOS junk folders)
rclone sync attached_assets/ r2:your-bucket/attached_assets/ \
  --exclude "__MACOSX/**" \
  --exclude "*.docx" \
  --exclude "*.csv" \
  --exclude "*.xml"
```

### Phase 3: Enable CDN

```bash
# Set in Replit Secrets (or .env)
EXTERNAL_ASSET_URL=https://your-cdn-domain.com
ASSET_PROXY_MODE=cdn-first
```

### Phase 4: Validate

```bash
# Validate CDN accessibility
EXTERNAL_ASSET_URL=https://your-cdn.com bash scripts/validate-assets-cdn.sh
```

### Phase 5: Monitor

Wait 24-48 hours and check:
- [ ] No new 404 errors in Google Search Console
- [ ] No crawl errors in image sitemap
- [ ] Blog images loading correctly
- [ ] Landing page images loading correctly

### Phase 6: Enable Permanent Redirects

```bash
ASSET_REDIRECT_PERMANENT=true
```

### Phase 7: Git Cleanup (LOCAL MACHINE ONLY)

**WARNING**: Only proceed after Phase 5 monitoring is complete.

```bash
# On your LOCAL machine (not Replit)
git clone your-repo
cd your-repo

# Install filter-repo
pip install git-filter-repo

# Remove attached_assets from git history
git filter-repo --path attached_assets --invert-paths

# Force push (coordinate with team)
git push origin main --force
```

---

## Rollback Plan

| Step | Action | Time |
|------|--------|------|
| 1 | Remove `EXTERNAL_ASSET_URL` from environment | 30 sec |
| 2 | Restart server | 30 sec |
| 3 | Images immediately served from local files | Instant |

**Total rollback time: ~1 minute**

No code changes, no data changes, no URL changes required.

---

## Pre-Filter-Repo Checklist

Only run `git filter-repo` when ALL of these are true:

- [ ] All 13,241 images uploaded to CDN
- [ ] `EXTERNAL_ASSET_URL` configured and active
- [ ] `bash scripts/validate-assets-cdn.sh` passes
- [ ] Spot-checked 10+ blog posts for working images
- [ ] Spot-checked 5+ landing pages for working images
- [ ] Image sitemap URLs resolve (check in browser)
- [ ] Monitored for 24-48 hours minimum
- [ ] Google Search Console shows no new crawl errors
- [ ] `ASSET_REDIRECT_PERMANENT=true` enabled
- [ ] Team notified of upcoming force push
- [ ] Local backup of attached_assets/ created

---

## Files Summary

| File | Purpose |
|------|---------|
| `server/asset-proxy-middleware.ts` | CDN redirect logic |
| `server/index.ts` | Middleware registration |
| `scripts/generate-asset-manifest.ts` | Image inventory |
| `scripts/validate-assets.ts` | Validation logic |
| `scripts/validate-assets-local.sh` | Local validation wrapper |
| `scripts/validate-assets-cdn.sh` | CDN validation wrapper |
| `scripts/check-repo-size.mjs` | Repo size guardrail |
| `docs/IMAGE_MIGRATION_STRATEGY.md` | This document |
