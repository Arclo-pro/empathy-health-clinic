#!/bin/bash
# Production Build Script with Configurable Prerendering
# This script builds the application and optionally generates prerendered HTML for SEO.
# Used by Replit deployment: build = ["bash", "scripts/build-production.sh"]
#
# Environment Variables:
#   PRERENDER_MODE=full|off|incremental (default: full for production)
#     - full: Full prerendering with all validations (production default)
#     - off: Skip prerendering entirely (CI/dev builds)
#     - incremental: Only prerender missing/changed routes
#   PRERENDER_CONCURRENCY=N (default: 2)
#     - Number of concurrent browser pages for prerendering
#   SKIP_DB_CHECK=true (default: false)
#     - Skip database validation step
#
# Usage:
#   npm run build:full               # Full production build
#   PRERENDER_MODE=off npm run build # CI/dev quick build
#   npm run build:fast               # Compile only (no prerender)

set -e  # Exit on any error

# Cleanup trap - ensures all background processes are killed on exit
trap 'pkill -P $$ 2>/dev/null || true; kill $(jobs -p) 2>/dev/null || true' EXIT

# Configuration
MIN_ROUTES=250        # Minimum expected routes (safety check)
MIN_FILE_SIZE=5000    # Minimum bytes for valid snapshot (not just React shell)
MIN_HOMEPAGE_LINKS=50 # Minimum links on homepage
PORT=5002             # Use 5002 for prerendering to avoid conflicts

# Prerender mode (default: full for production)
PRERENDER_MODE="${PRERENDER_MODE:-full}"

echo "=========================================="
echo "Production Build"
echo "=========================================="
echo "PRERENDER_MODE: $PRERENDER_MODE"
echo "PRERENDER_CONCURRENCY: ${PRERENDER_CONCURRENCY:-2}"
echo ""

# Step 1: Dependencies handled by Replit
echo "Step 1: Dependencies (handled by Replit provisioning)"
echo ""

# Step 1.5: Database validation (can be skipped for CI)
if [ "${SKIP_DB_CHECK}" = "true" ]; then
    echo "Step 1.5: Skipping database check (SKIP_DB_CHECK=true)"
else
    echo "Step 1.5: Ensuring database tables exist..."
    
    echo "  Running db:push to create/sync tables..."
    if npm run db:push 2>&1; then
        echo "  Schema synced successfully"
    else
        echo "  WARNING: db:push failed - attempting table creation at runtime"
    fi
    
    echo "  Creating analytics tables if missing..."
    npx tsx scripts/create-analytics-tables.ts 2>&1 || echo "  Table creation attempted"
    
    echo "  Validating tables..."
    if npx tsx scripts/validate-database-tables.ts 2>&1; then
        echo "  Database validation passed"
    else
        echo "  WARNING: Validation incomplete - tables will be verified at runtime"
    fi
fi
echo ""

# Step 2: Standard Vite + esbuild build
echo "Step 2: Building frontend and backend..."
npx vite build
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
echo ""

# If PRERENDER_MODE=off, skip all prerendering steps
if [ "$PRERENDER_MODE" = "off" ]; then
    echo "=========================================="
    echo "Build Complete (PRERENDER_MODE=off)"
    echo "=========================================="
    echo ""
    echo "Prerendering skipped. Output:"
    echo "  - dist/index.js (backend)"
    echo "  - dist/public/ (frontend assets)"
    echo ""
    echo "For full production with SEO, run:"
    echo "  PRERENDER_MODE=full npm run build"
    echo ""
    exit 0
fi

# Step 3: Install Chrome for Puppeteer
echo "Step 3: Installing Chrome for Puppeteer..."
npx puppeteer browsers install chrome
echo ""

# Step 4: Generate route manifest
echo "Step 4: Generating route manifest..."
npx tsx scripts/buildRouteManifest.ts
if [ ! -f "routes/allRoutes.json" ]; then
    echo "ERROR: Route manifest not generated"
    exit 1
fi
echo "Manifest generated"
echo ""

# Step 5: Check existing prerendered files
echo "Step 5: Checking prerendered files..."
EXISTING_PAGES=$(find dist/prerendered -name "index.html" 2>/dev/null | wc -l || echo "0")

if [ "$PRERENDER_MODE" = "incremental" ] && [ "$EXISTING_PAGES" -ge "$MIN_ROUTES" ]; then
    echo "  Found $EXISTING_PAGES prerendered pages (min: $MIN_ROUTES)"
    echo "  PRERENDER_MODE=incremental: Using existing files"
    SKIP_PRERENDER=true
elif [ "$PRERENDER_MODE" = "full" ]; then
    echo "  Found $EXISTING_PAGES prerendered pages"
    echo "  PRERENDER_MODE=full: Will prerender all routes"
    SKIP_PRERENDER=false
else
    echo "  Found $EXISTING_PAGES prerendered pages (need $MIN_ROUTES)"
    echo "  Will run incremental prerendering"
    SKIP_PRERENDER=false
fi
echo ""

# Step 6 & 7: Start server and prerender
if [ "$SKIP_PRERENDER" = true ]; then
    echo "Step 6: Skipping server start (using existing files)"
    echo "Step 7: Skipping prerendering (using existing files)"
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

    # Step 7: Run prerender script
    echo ""
    echo "Step 7: Prerendering routes..."
    PRERENDER_URL=http://localhost:$PORT npx tsx scripts/prerender-puppeteer.ts

    # Stop the temporary server
    echo ""
    echo "Stopping temporary server..."
    kill $SERVER_PID 2>/dev/null || true
    wait $SERVER_PID 2>/dev/null || true
fi
echo ""

# Step 8: Verify prerender completeness
echo "Step 8: Verifying prerender completeness..."
npx tsx scripts/verify-prerender.ts
echo ""

# Step 8.5: Fix asset references in prerendered HTML
echo "Step 8.5: Fixing asset references in prerendered HTML..."
if npx tsx scripts/fix-prerender-assets.ts; then
    echo "  Asset references fixed successfully"
else
    if node scripts/fix-prerender-assets.mjs; then
        echo "  Asset references fixed successfully (via .mjs fallback)"
    else
        echo "ERROR: fix-prerender-assets failed"
        exit 1
    fi
fi
echo ""

# Step 9: Verify asset integrity
echo "Step 9: Verifying asset integrity..."
node scripts/verify-asset-integrity.mjs
if [ $? -ne 0 ]; then
    echo "ERROR: Asset integrity check failed"
    exit 1
fi
echo ""

# Step 10: Quality checks
echo "Step 10: Running quality checks..."

PRERENDER_COUNT=$(find dist/prerendered -name "index.html" 2>/dev/null | wc -l | tr -d ' ')
echo "  Prerendered files: $PRERENDER_COUNT"

if [ "$PRERENDER_COUNT" -lt "$MIN_ROUTES" ]; then
    echo "ERROR: Only $PRERENDER_COUNT routes prerendered, expected at least $MIN_ROUTES"
    exit 1
fi

HOMEPAGE_SIZE=$(stat -f%z dist/prerendered/index.html 2>/dev/null || stat -c%s dist/prerendered/index.html 2>/dev/null || echo "0")
echo "  Homepage size: $HOMEPAGE_SIZE bytes"

if [ "$HOMEPAGE_SIZE" -lt "$MIN_FILE_SIZE" ]; then
    echo "ERROR: Homepage snapshot too small ($HOMEPAGE_SIZE bytes)"
    exit 1
fi

HOMEPAGE_LINKS=$(grep -oi '<a [^>]*href="/' dist/prerendered/index.html 2>/dev/null | wc -l | tr -d ' ')
echo "  Homepage links: $HOMEPAGE_LINKS"

if [ "$HOMEPAGE_LINKS" -lt "$MIN_HOMEPAGE_LINKS" ]; then
    echo "ERROR: Homepage has only $HOMEPAGE_LINKS links, expected at least $MIN_HOMEPAGE_LINKS"
    exit 1
fi

MARKER_COUNT=$(grep -c 'Prerendered by Puppeteer' dist/prerendered/index.html 2>/dev/null || echo "0")
echo "  Prerender marker: $MARKER_COUNT"

if [ "$MARKER_COUNT" -eq 0 ]; then
    echo "ERROR: Homepage missing prerender marker"
    exit 1
fi

# Spot check deep pages
echo "  Spot checking deep pages..."
for PAGE in "psychiatrist-orlando" "services" "team"; do
    PAGE_PATH="dist/prerendered/$PAGE/index.html"
    if [ -f "$PAGE_PATH" ]; then
        PAGE_LINKS=$(grep -oi '<a [^>]*href="/' "$PAGE_PATH" 2>/dev/null | wc -l | tr -d ' ')
        echo "    /$PAGE: $PAGE_LINKS links"
    else
        echo "    WARNING: /$PAGE not found"
    fi
done
echo ""

# Step 11: Final summary
echo "=========================================="
echo "Production Build Complete!"
echo "=========================================="
echo ""
echo "Summary:"
echo "  - PRERENDER_MODE: $PRERENDER_MODE"
echo "  - Routes prerendered: $PRERENDER_COUNT"
echo "  - Homepage size: $HOMEPAGE_SIZE bytes"
echo "  - Homepage links: $HOMEPAGE_LINKS"
echo ""
echo "The site is ready for deployment with full SEO crawlability."
echo ""
