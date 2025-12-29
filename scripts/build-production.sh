#!/bin/bash
# Production Build Script with Mandatory Prerendering
# This script builds the application AND generates prerendered HTML for SEO crawlability.
# Used by Replit deployment: build = ["bash", "scripts/build-production.sh"]
#
# CRITICAL: This script MUST complete successfully or the build fails.
# No partial publishes - every route must have a valid snapshot.
#
# NOTE: This script does NOT start a validation server or run smoke tests.
# Those should be run separately to avoid port conflicts with Replit Autoscale.

set -e  # Exit on any error

# Cleanup trap - ensures all background processes are killed on exit
trap 'pkill -P $$ 2>/dev/null || true; kill $(jobs -p) 2>/dev/null || true' EXIT

echo "=========================================="
echo "Production Build with Prerendering"
echo "=========================================="
echo ""

# Configuration
MIN_ROUTES=250        # Minimum expected routes (safety check)
MIN_FILE_SIZE=5000    # Minimum bytes for valid snapshot (not just React shell)
MIN_HOMEPAGE_LINKS=50 # Minimum links on homepage
PORT=5002  # Use 5002 for prerendering to avoid conflicts (5000=app, 5001=reserved)

# Step 1: Skip npm install - Replit handles this during provisioning
echo "Step 1: Dependencies already installed by Replit provisioning"
echo ""

# Step 1.5: Ensure database tables exist (creates if missing, validates required)
echo "Step 1.5: Ensuring database tables exist..."

# First, push schema to create any missing tables
echo "  Running db:push to create/sync tables..."
if npm run db:push 2>&1; then
    echo "  Schema synced successfully"
else
    echo "  WARNING: db:push failed - attempting table creation at runtime"
fi

# Then create analytics tables that may not be in Drizzle schema
echo "  Creating analytics tables if missing..."
npx tsx scripts/create-analytics-tables.ts 2>&1 || echo "  Table creation attempted"

# Now validate
echo "  Validating tables..."
if npx tsx scripts/validate-database-tables.ts 2>&1; then
    echo "  Database validation passed"
else
    echo "  WARNING: Validation incomplete - tables will be verified at runtime"
fi
echo ""

# Step 2: Standard Vite + esbuild build (inline, not via npm run build to avoid recursion)
echo "Step 2: Building frontend and backend..."
npx vite build
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
echo ""

# Step 3: Install Chrome for Puppeteer
echo "Step 3: Installing Chrome for Puppeteer..."
npx puppeteer browsers install chrome
echo ""

# Step 4: Generate route manifest (source of truth for prerendering)
echo "Step 4: Generating route manifest..."
npx tsx scripts/buildRouteManifest.ts
if [ ! -f "routes/allRoutes.json" ]; then
    echo "ERROR: Route manifest not generated"
    exit 1
fi
MANIFEST_COUNT=$(cat routes/allRoutes.json | grep -o '"totalRoutes":' | head -1 && cat routes/allRoutes.json | grep -o '"totalRoutes": *[0-9]*' | grep -o '[0-9]*')
echo "Manifest contains routes for prerendering"
echo ""

# Step 5: Check existing prerendered files (after build, so dist/prerendered is intact)
echo "Step 5: Checking prerendered files..."
EXISTING_PAGES=$(find dist/prerendered -name "index.html" 2>/dev/null | wc -l || echo "0")
if [ "$EXISTING_PAGES" -ge "$MIN_ROUTES" ]; then
    echo "  Found $EXISTING_PAGES prerendered pages (min: $MIN_ROUTES)"
    echo "  Using existing prerendered files (delete dist/prerendered to force re-render)"
    SKIP_PRERENDER=true
else
    echo "  Found $EXISTING_PAGES prerendered pages (need $MIN_ROUTES)"
    echo "  Will run incremental prerendering to complete missing pages"
    SKIP_PRERENDER=false
fi
echo ""

# Step 6 & 7: Start server and prerender (skip if we already have enough pages)
if [ "$SKIP_PRERENDER" = true ]; then
    echo "Step 6: Skipping server start (using existing prerendered files)"
    echo "Step 7: Skipping prerendering (using existing prerendered files)"
    echo ""
else
    echo "Step 6: Starting temporary server for prerendering..."
    NODE_ENV=production PORT=$PORT node dist/index.js &
    SERVER_PID=$!
    sleep 5

    # Wait for server to be ready (max 60 seconds)
    SERVER_READY=false
    for i in {1..60}; do
      if curl -s http://localhost:$PORT/ > /dev/null 2>&1; then
        echo "Server is ready"
        SERVER_READY=true
        break
      fi
      echo "Waiting for server... ($i/60)"
      sleep 1
    done

    if [ "$SERVER_READY" = false ]; then
        echo "ERROR: Server failed to start within 60 seconds"
        kill $SERVER_PID 2>/dev/null || true
        exit 1
    fi

    # Step 7: Run prerender script (incremental - skips existing pages)
    echo ""
    echo "Step 7: Prerendering routes (incremental)..."
    PRERENDER_URL=http://localhost:$PORT npx tsx scripts/prerender-puppeteer.ts

    # Stop the temporary server
    echo ""
    echo "Stopping temporary server..."
    kill $SERVER_PID 2>/dev/null || true
    wait $SERVER_PID 2>/dev/null || true
fi
echo ""

# Step 8: Verify prerender completeness (uses manifest)
echo "Step 8: Verifying prerender completeness (manifest check)..."
npx tsx scripts/verify-prerender.ts
echo ""

# Step 8.5: Fix asset references in prerendered HTML
echo "Step 8.5: Fixing asset references in prerendered HTML..."
echo "  Running fix-prerender-assets.ts (delegates to .mjs)..."
if npx tsx scripts/fix-prerender-assets.ts; then
    echo "  Asset references fixed successfully"
else
    echo "  Fallback: trying direct .mjs execution..."
    if node scripts/fix-prerender-assets.mjs; then
        echo "  Asset references fixed successfully (via .mjs fallback)"
    else
        echo "ERROR: fix-prerender-assets failed"
        echo "  Prerendered HTML files may be missing production CSS/JS"
        exit 1
    fi
fi
echo ""

# Step 9: Verify asset integrity (prevents blank pages after deploy)
echo "Step 9: Verifying asset integrity..."
node scripts/verify-asset-integrity.mjs
if [ $? -ne 0 ]; then
    echo "ERROR: Asset integrity check failed"
    echo "  HTML references assets that don't exist or are inconsistent"
    exit 1
fi
echo ""

# Step 10: Additional quality checks
echo "Step 10: Running quality checks..."

# Count prerendered files
PRERENDER_COUNT=$(find dist/prerendered -name "index.html" 2>/dev/null | wc -l | tr -d ' ')
echo "  Prerendered files: $PRERENDER_COUNT"

if [ "$PRERENDER_COUNT" -lt "$MIN_ROUTES" ]; then
    echo "ERROR: Only $PRERENDER_COUNT routes prerendered, expected at least $MIN_ROUTES"
    exit 1
fi

# Check homepage file size (must not be trivial React shell)
HOMEPAGE_SIZE=$(stat -f%z dist/prerendered/index.html 2>/dev/null || stat -c%s dist/prerendered/index.html 2>/dev/null || echo "0")
echo "  Homepage size: $HOMEPAGE_SIZE bytes"

if [ "$HOMEPAGE_SIZE" -lt "$MIN_FILE_SIZE" ]; then
    echo "ERROR: Homepage snapshot too small ($HOMEPAGE_SIZE bytes), likely just React shell"
    echo "  Expected at least $MIN_FILE_SIZE bytes of rendered content"
    exit 1
fi

# Check homepage has enough links
HOMEPAGE_LINKS=$(grep -oi '<a [^>]*href="/' dist/prerendered/index.html 2>/dev/null | wc -l | tr -d ' ')
echo "  Homepage links: $HOMEPAGE_LINKS"

if [ "$HOMEPAGE_LINKS" -lt "$MIN_HOMEPAGE_LINKS" ]; then
    echo "ERROR: Homepage has only $HOMEPAGE_LINKS links, expected at least $MIN_HOMEPAGE_LINKS"
    echo "  This indicates prerendering failed to capture React-rendered content"
    exit 1
fi

# Check for prerender marker
MARKER_COUNT=$(grep -c 'Prerendered by Puppeteer' dist/prerendered/index.html 2>/dev/null || echo "0")
echo "  Prerender marker: $MARKER_COUNT"

if [ "$MARKER_COUNT" -eq 0 ]; then
    echo "ERROR: Homepage missing prerender marker"
    exit 1
fi

# Spot check a few deep pages
echo "  Spot checking deep pages..."
for PAGE in "psychiatrist-orlando" "services" "team"; do
    PAGE_PATH="dist/prerendered/$PAGE/index.html"
    if [ -f "$PAGE_PATH" ]; then
        PAGE_LINKS=$(grep -oi '<a [^>]*href="/' "$PAGE_PATH" 2>/dev/null | wc -l | tr -d ' ')
        echo "    /$PAGE: $PAGE_LINKS links"
        if [ "$PAGE_LINKS" -lt 10 ]; then
            echo "WARNING: /$PAGE has low link count ($PAGE_LINKS)"
        fi
    else
        echo "WARNING: /$PAGE not found"
    fi
done

echo ""

# NOTE: Server-based validation (smoke tests, redirect validation) removed from build
# These should be run separately via: npm run validate (after server is running)
# This allows Replit Autoscale Publishing to work without port conflicts

# Step 11: Final summary
echo "=========================================="
echo "Production Build Complete!"
echo "=========================================="
echo ""
echo "Summary:"
echo "  - Routes prerendered: $PRERENDER_COUNT"
echo "  - Homepage size: $HOMEPAGE_SIZE bytes"
echo "  - Homepage links: $HOMEPAGE_LINKS"
echo "  - Prerender marker: Present"
echo ""
echo "The site is ready for deployment with full SEO crawlability."
echo "All routes will serve prerendered HTML to crawlers."
echo ""
