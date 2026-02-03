#!/bin/bash
# Production Build Script - Deployment-Safe with Non-Blocking Prerender
# 
# CRITICAL: Prerender NEVER blocks deployment. App must deploy even if prerender fails.
# 
# Modes:
#   PRERENDER_MODE=priority (default) - ~50 critical SEO pages, fast and reliable
#   PRERENDER_MODE=full - All 310+ pages (use locally, may timeout in deploy)
#   PRERENDER_MODE=off - Skip prerender entirely
#
# Usage:
#   npm run build                          # Default priority mode
#   PRERENDER_MODE=full npm run build      # Full prerender (local only)
#   PRERENDER_MODE=off npm run build       # CI/dev quick build

set -e  # Exit on error for core build steps

# Cleanup trap
trap 'pkill -P $$ 2>/dev/null || true; kill $(jobs -p) 2>/dev/null || true' EXIT

# ============================================
# DEPLOY DIAGNOSTICS
# ============================================
echo "=========================================="
echo "DEPLOY DIAGNOSTICS"
echo "=========================================="
echo "Timestamp: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo "Node: $(node -v 2>/dev/null || echo 'not found')"
echo "NPM: $(npm -v 2>/dev/null || echo 'not found')"
echo "PRERENDER_MODE: ${PRERENDER_MODE:-priority}"
echo "PRERENDER_CONCURRENCY: ${PRERENDER_CONCURRENCY:-10}"
echo "NODE_ENV: ${NODE_ENV:-not set}"
echo "CI: ${CI:-not set}"
echo ""

# Configuration
PORT=5002
PRERENDER_MODE="${PRERENDER_MODE:-priority}"
PRERENDER_SUCCESS=true

echo "=========================================="
echo "PHASE 1: Core Build (BLOCKING)"
echo "=========================================="
echo "These steps MUST succeed for deployment"
echo ""

# Step 0: Skip redirect sync - redirects handled server-side by canonicalization middleware
# The sync script was adding 400+ redirects to vercel.json which blocked deployments
echo "Step 0: Redirects handled server-side (skipping vercel.json sync)"
echo ""

# Step 1: Database setup (non-blocking - runtime will handle it)
echo "Step 1: Database setup..."
if [ "${SKIP_DB_CHECK}" != "true" ]; then
    npm run db:push 2>&1 || echo "  WARNING: db:push failed - runtime will handle"
    npx tsx scripts/create-analytics-tables.ts 2>&1 || echo "  WARNING: analytics tables - runtime will handle"
fi
echo ""

# Step 2: Build frontend and backend (BLOCKING - must succeed)
echo "Step 2: Building frontend and backend..."
npx vite build
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
echo "  Build complete"
echo ""

# Step 2b: Copy static assets to dist/public
echo "Step 2b: Copying static assets..."
if [ -d "attached_assets" ]; then
    cp -r attached_assets dist/public/attached_assets
    echo "  Copied attached_assets to dist/public/"
else
    echo "  No attached_assets folder found, skipping"
fi
echo ""

# Step 2c: Generate sitemaps with database content
echo "Step 2c: Generating sitemaps..."
npx tsx scripts/generate-sitemap.ts 2>&1 || echo "  WARNING: Sitemap generation failed (static fallback in public/)"
echo ""

# If prerender mode is off, run lightweight SSR prerender (no Puppeteer needed)
if [ "$PRERENDER_MODE" = "off" ]; then
    echo "=========================================="
    echo "PHASE 2: Lightweight SSR Prerender"
    echo "=========================================="
    echo "Generating static HTML using React renderToString (no Chrome needed)"
    echo ""

    # Build the SSR bundle
    echo "Step 3: Building SSR bundle..."
    if npx vite build --config vite.config.ssr.ts 2>&1; then
        echo "  SSR bundle built"
    else
        echo "  WARNING: SSR build failed — site will serve SPA shell"
        echo ""
        echo "=========================================="
        echo "BUILD COMPLETE (SSR prerender failed)"
        echo "=========================================="
        exit 0
    fi
    echo ""

    # Run the lightweight SSR prerender
    echo "Step 4: Prerendering routes with SSR..."
    node scripts/prerender-ssr.mjs 2>&1 || echo "  WARNING: SSR prerender had errors (SPA fallback active)"
    echo ""

    SSR_COUNT=$(find dist/public -name "index.html" -not -path "dist/public/index.html" 2>/dev/null | wc -l | tr -d ' ' || echo "0")
    echo "=========================================="
    echo "BUILD COMPLETE (SSR prerender)"
    echo "=========================================="
    echo "  Backend: dist/index.js"
    echo "  Frontend: dist/public/"
    echo "  SSR Prerendered: $SSR_COUNT pages"
    echo ""
    exit 0
fi

echo "=========================================="
echo "PHASE 2: Prerender (NON-BLOCKING)"
echo "=========================================="
echo "Prerender failures will NOT block deployment"
echo ""

# Disable exit-on-error for prerender phase
set +e

# Step 3: Install Chrome for Puppeteer
echo "Step 3: Installing Chrome..."
if ! npx puppeteer browsers install chrome 2>&1; then
    echo "  WARNING: Chrome install failed - prerender will be skipped"
    PRERENDER_SUCCESS=false
fi
echo ""

# Step 4: Generate route manifest
if [ "$PRERENDER_SUCCESS" = true ]; then
    echo "Step 4: Generating route manifest..."
    if ! npx tsx scripts/buildRouteManifest.ts 2>&1; then
        echo "  WARNING: Manifest generation failed"
        PRERENDER_SUCCESS=false
    elif [ ! -f "routes/allRoutes.json" ]; then
        echo "  WARNING: Manifest file not created"
        PRERENDER_SUCCESS=false
    else
        ROUTE_COUNT=$(cat routes/allRoutes.json | grep -o '"/' | wc -l || echo "0")
        echo "  Manifest: ~$ROUTE_COUNT routes"
    fi
    echo ""
fi

# Step 5: Start server and prerender
if [ "$PRERENDER_SUCCESS" = true ]; then
    echo "Step 5: Starting temporary server..."
    NODE_ENV=production PORT=$PORT node dist/index.js &
    SERVER_PID=$!
    
    # Wait for server (max 30 seconds - faster timeout)
    SERVER_READY=false
    for i in {1..30}; do
        if curl -s http://localhost:$PORT/ > /dev/null 2>&1; then
            echo "  Server ready on port $PORT"
            SERVER_READY=true
            break
        fi
        sleep 1
    done
    
    if [ "$SERVER_READY" = false ]; then
        echo "  WARNING: Server failed to start - skipping prerender"
        kill $SERVER_PID 2>/dev/null || true
        PRERENDER_SUCCESS=false
    fi
    echo ""
fi

# Step 6: Run prerender
if [ "$PRERENDER_SUCCESS" = true ]; then
    echo "Step 6: Prerendering routes (mode: $PRERENDER_MODE)..."
    
    PRERENDER_CMD="PRERENDER_URL=http://localhost:$PORT npx tsx scripts/prerender-puppeteer.ts"
    if [ "$PRERENDER_MODE" = "priority" ]; then
        PRERENDER_CMD="$PRERENDER_CMD --priority"
    elif [ "$PRERENDER_MODE" = "full" ]; then
        PRERENDER_CMD="$PRERENDER_CMD --force"
    fi
    
    if ! eval $PRERENDER_CMD 2>&1; then
        echo "  WARNING: Prerender had errors (continuing anyway)"
        # Don't set PRERENDER_SUCCESS=false - partial success is OK
    fi
    
    # Stop server
    echo "  Stopping server..."
    kill $SERVER_PID 2>/dev/null || true
    wait $SERVER_PID 2>/dev/null || true
    echo ""
fi

# Step 7: Fix asset references (best effort)
echo "Step 7: Fixing asset references..."
if npx tsx scripts/fix-prerender-assets.ts 2>&1; then
    echo "  Asset references updated"
elif node scripts/fix-prerender-assets.mjs 2>&1; then
    echo "  Asset references updated (fallback)"
else
    echo "  WARNING: Could not fix asset references"
fi
echo ""

# Step 8: Verify (informational only - never blocks)
echo "Step 8: Verification (informational)..."
PRERENDER_COUNT=$(find dist/prerendered -name "index.html" 2>/dev/null | wc -l | tr -d ' ' || echo "0")
echo "  Prerendered files: $PRERENDER_COUNT"

if [ "$PRERENDER_MODE" = "priority" ]; then
    EXPECTED=40
else
    EXPECTED=250
fi

if [ "$PRERENDER_COUNT" -lt "$EXPECTED" ]; then
    echo "  WARNING: Expected ~$EXPECTED files, got $PRERENDER_COUNT"
    echo "  React CSR will handle missing routes"
else
    echo "  Verification passed"
fi
echo ""

# Re-enable exit-on-error
set -e

echo "=========================================="
echo "BUILD COMPLETE"
echo "=========================================="
echo "  Backend: dist/index.js"
echo "  Frontend: dist/public/"
echo "  Prerendered: $PRERENDER_COUNT pages"
if [ "$PRERENDER_SUCCESS" = true ]; then
    echo "  Prerender: SUCCESS"
else
    echo "  Prerender: PARTIAL (app will use React CSR for missing pages)"
fi
echo ""
echo "Ready for deployment!"
echo ""
