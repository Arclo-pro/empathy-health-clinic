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

### How Images Are Served
```typescript
// server/index.ts line 220
app.use("/attached_assets", express.static(attachedAssetsPath));
```

Images are served as static files via Express at the `/attached_assets` path prefix.

---

## Strategy Comparison

### Strategy A: CDN Proxy (RECOMMENDED - Safest)
**Keep same public URLs, serve from external storage**

```
User Request: GET /attached_assets/stock_images/photo.jpg
                    ↓
           Express Middleware
                    ↓
    Check EXTERNAL_ASSET_URL env var
           ↓               ↓
        Not Set          Set to CDN
           ↓               ↓
    Serve from         302 Redirect OR
    local disk         Proxy to CDN
```

| Aspect | Impact |
|--------|--------|
| **Public URLs** | NO CHANGE - `/attached_assets/*` stays same |
| **SEO Risk** | ZERO - Google sees same URLs |
| **Image Sitemap** | NO CHANGE needed |
| **Structured Data** | NO CHANGE needed |
| **Blog Post Data** | NO CHANGE needed |
| **Rollback** | Instant - just unset env var |

**Implementation:**
1. Add middleware to check `EXTERNAL_ASSET_URL`
2. If set: redirect/proxy to `${EXTERNAL_ASSET_URL}${path}`
3. If not set: serve from local `attached_assets/`

---

### Strategy B: 301 Redirects (Higher Risk)
**Change URLs, add permanent redirects**

```
Old URL: /attached_assets/stock_images/photo.jpg
         ↓ 301 Redirect
New URL: https://cdn.empathyhealthclinic.com/images/stock_images/photo.jpg
```

| Aspect | Impact |
|--------|--------|
| **Public URLs** | CHANGED to CDN URLs |
| **SEO Risk** | LOW but requires redirect processing |
| **Image Sitemap** | MUST UPDATE all URLs |
| **Structured Data** | MUST UPDATE all image refs |
| **Blog Post Data** | MUST UPDATE 173 featuredImage fields |
| **Rollback** | Complex - must restore old URLs everywhere |

**Why Not Recommended:**
- Requires updating data in multiple places
- 301s take time for Google to process
- Higher risk of broken images during transition
- More complex rollback procedure

---

## Recommended Implementation: Strategy A

### Phase 1: Code Changes (In This Repo)

#### 1. Add Asset Proxy Middleware
Create middleware that checks `EXTERNAL_ASSET_URL` environment variable.

#### 2. Migration Script
Generate manifest of all images with checksums for verification.

#### 3. Validation Script
Check that all referenced images resolve (local or CDN).

### Phase 2: External Setup (User Action Required)

#### Option A: Cloudflare R2 (Recommended)
- Cost: ~$0.015/GB storage, $0.36/million requests
- No egress fees
- Native Cloudflare CDN integration

#### Option B: AWS S3 + CloudFront
- Cost: ~$0.023/GB storage + CloudFront fees
- More complex setup

#### Option C: Cloudinary
- Cost: Free tier (25GB bandwidth/month)
- Built-in image optimization
- Simpler setup

### Phase 3: Upload & Verify

1. Upload all images to chosen CDN
2. Verify all images accessible at CDN URLs
3. Set `EXTERNAL_ASSET_URL` environment variable
4. Run validation script to confirm no 404s
5. Monitor for 24-48 hours

### Phase 4: Git Cleanup (Local Machine)

After CDN is verified working:
```bash
# On local machine (NOT on Replit)
pip install git-filter-repo

# Remove attached_assets from git history
git filter-repo --path attached_assets --invert-paths

# Force push to remote
git push origin main --force
```

---

## Rollback Plan

| Step | Action |
|------|--------|
| 1 | Unset `EXTERNAL_ASSET_URL` environment variable |
| 2 | Restart server |
| 3 | Images immediately served from local `attached_assets/` |
| 4 | No data changes required |
| 5 | No URL changes required |

---

## File Changes Summary

| File | Change |
|------|--------|
| `server/asset-proxy-middleware.ts` | NEW - CDN proxy middleware |
| `server/index.ts` | Add asset proxy middleware registration |
| `scripts/generate-asset-manifest.ts` | NEW - Generate image inventory |
| `scripts/validate-assets.ts` | NEW - Verify all images resolve |

---

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `EXTERNAL_ASSET_URL` | CDN base URL (optional) | `https://cdn.empathyhealthclinic.com` |

When not set, images serve from local `attached_assets/` directory (current behavior).

---

## Validation Checklist

Before removing images from git:
- [ ] All 13,241 images uploaded to CDN
- [ ] `EXTERNAL_ASSET_URL` configured
- [ ] `npm run validate:assets` passes
- [ ] Spot-check 10 random blog posts for images
- [ ] Spot-check image sitemap URLs
- [ ] Monitor for 24-48 hours
- [ ] Check Google Search Console for crawl errors
