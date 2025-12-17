#!/bin/bash
# Production Build Script with Mandatory Prerendering
# This script builds the application AND generates prerendered HTML for SEO crawlability.
# Used by Replit deployment: build = ["bash", "scripts/build-production.sh"]
#
# CRITICAL: This script MUST complete successfully or the build fails.
# No partial publishes - every route must have a valid snapshot.

set -e  # Exit on any error

echo "=========================================="
echo "Production Build with Prerendering"
echo "=========================================="
echo ""

# Configuration
MIN_ROUTES=250        # Minimum expected routes (safety check)
MIN_FILE_SIZE=5000    # Minimum bytes for valid snapshot (not just React shell)
MIN_HOMEPAGE_LINKS=50 # Minimum links on homepage
PORT=5000

# Step 1: Install dependencies (ensure clean state)
echo "Step 1: Installing dependencies..."
npm ci --legacy-peer-deps || npm install --legacy-peer-deps
echo ""

# Step 2: Standard Vite + esbuild build
echo "Step 2: Building frontend and backend..."
npm run build
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

# Step 5: Start server temporarily for prerendering
echo "Step 5: Starting temporary server for prerendering..."
NODE_ENV=production node dist/index.js &
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

# Step 6: Run prerender script
echo ""
echo "Step 6: Prerendering all routes..."
PRERENDER_URL=http://localhost:$PORT npx tsx scripts/prerender-puppeteer.ts

# Stop the temporary server
echo ""
echo "Stopping temporary server..."
kill $SERVER_PID 2>/dev/null || true
wait $SERVER_PID 2>/dev/null || true
echo ""

# Step 7: Verify prerender completeness (uses manifest)
echo "Step 7: Verifying prerender completeness (manifest check)..."
npx tsx scripts/verify-prerender.ts
echo ""

# Step 8: Additional quality checks
echo "Step 8: Running quality checks..."

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

# Step 9: Final summary
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
