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

# Step 1: Skip npm install - Replit handles this during provisioning
echo "Step 1: Dependencies already installed by Replit provisioning"
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

# Step 8: Verify asset integrity (prevents blank pages after deploy)
echo "Step 8: Verifying asset integrity..."
npx tsx scripts/verify-asset-integrity.ts
if [ $? -ne 0 ]; then
    echo "ERROR: Asset integrity check failed"
    echo "  HTML references assets that don't exist or are inconsistent"
    exit 1
fi
echo ""

# Step 9: Additional quality checks
echo "Step 9: Running quality checks..."

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

# Step 10: JS-Disabled Smoke Test (ensures crawlers see content)
echo "Step 10: Running JS-disabled smoke test..."
# Start temporary server again for smoke test
NODE_ENV=production node dist/index.js &
SMOKE_SERVER_PID=$!
sleep 5

# Wait for server
for i in {1..30}; do
  if curl -s http://localhost:$PORT/ > /dev/null 2>&1; then
    break
  fi
  sleep 1
done

# Run smoke test
npx tsx scripts/js-disabled-smoke-test.ts
SMOKE_EXIT_CODE=$?

# Stop server
kill $SMOKE_SERVER_PID 2>/dev/null || true
wait $SMOKE_SERVER_PID 2>/dev/null || true

if [ $SMOKE_EXIT_CODE -ne 0 ]; then
    echo "ERROR: JS-disabled smoke test failed"
    echo "  Some pages don't render content without JavaScript"
    echo "  This will cause crawlers to see blank pages"
    exit 1
fi
echo ""

# Step 11: QA Redirect Validation (prevent soft 404s)
echo "Step 11: Running QA redirect validation..."

# Start server for QA validation
NODE_ENV=production node dist/index.js &
QA_SERVER_PID=$!
sleep 5

# Wait for server
for i in {1..30}; do
  if curl -s http://localhost:$PORT/ > /dev/null 2>&1; then
    break
  fi
  sleep 1
done

# Run QA validation with any available CSV
QA_CSV=""
if [ -f "attached_assets/Table_1766600276696.csv" ]; then
    QA_CSV="--csv attached_assets/Table_1766600276696.csv"
fi

npx tsx scripts/qa/validate-redirects.ts $QA_CSV
QA_EXIT_CODE=$?

# Stop server
kill $QA_SERVER_PID 2>/dev/null || true
wait $QA_SERVER_PID 2>/dev/null || true

if [ $QA_EXIT_CODE -ne 0 ]; then
    echo "ERROR: QA redirect validation failed"
    echo "  Some redirects don't resolve to valid pages"
    echo "  Check qa-validation-report.json for details"
    exit 1
fi
echo ""

# Step 12: Screaming Frog Issue Validation
echo "Step 12: Running Screaming Frog issue validation..."
npx tsx scripts/qa/screaming-frog-validator.ts
SF_EXIT_CODE=$?

if [ $SF_EXIT_CODE -ne 0 ]; then
    echo "ERROR: Screaming Frog validation failed"
    echo "  Critical SEO issues found (low links, canonical mismatches)"
    echo "  Check screaming-frog-validation-report.json for details"
    exit 1
fi
echo ""

# Step 13: GSC Indexing Issue Validation
echo "Step 13: Running GSC indexing issue validation..."

# Start server for GSC validation
NODE_ENV=production node dist/index.js &
GSC_SERVER_PID=$!
sleep 5

# Wait for server
for i in {1..30}; do
  if curl -s http://localhost:$PORT/ > /dev/null 2>&1; then
    break
  fi
  sleep 1
done

npx tsx scripts/qa/gsc-indexing-validator.ts
GSC_EXIT_CODE=$?

# Stop server
kill $GSC_SERVER_PID 2>/dev/null || true
wait $GSC_SERVER_PID 2>/dev/null || true

if [ $GSC_EXIT_CODE -ne 0 ]; then
    echo "ERROR: GSC indexing validation failed"
    echo "  Critical indexing issues found (soft 404s, broken links)"
    echo "  Check gsc-indexing-report.json for details"
    exit 1
fi
echo ""

# Step 14: Final summary
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
