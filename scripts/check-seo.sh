#!/bin/bash
# SEO Validation Script
# Validates SEO-critical elements without running full prerender

set -e

echo "=========================================="
echo "SEO Validation"
echo "=========================================="
echo ""

# Check route manifest exists
echo "Step 1: Checking route manifest..."
if [ -f "routes/allRoutes.json" ]; then
    ROUTE_COUNT=$(grep -o '"totalRoutes": *[0-9]*' routes/allRoutes.json | grep -o '[0-9]*')
    echo "  ✅ Route manifest found: $ROUTE_COUNT routes"
else
    echo "  ⚠️ Route manifest not found, generating..."
    npx tsx scripts/buildRouteManifest.ts
    echo "  ✅ Route manifest generated"
fi
echo ""

# Check prerendered files if they exist
echo "Step 2: Checking prerendered files..."
if [ -d "dist/prerendered" ]; then
    PRERENDER_COUNT=$(find dist/prerendered -name "index.html" 2>/dev/null | wc -l | tr -d ' ')
    echo "  Found $PRERENDER_COUNT prerendered pages"
    
    if [ "$PRERENDER_COUNT" -ge 250 ]; then
        echo "  ✅ Prerender count OK (min: 250)"
    else
        echo "  ⚠️ Prerender count low (need at least 250)"
    fi
else
    echo "  ⚠️ No prerendered files found (run build:full to generate)"
fi
echo ""

# Check homepage size if prerendered
echo "Step 3: Checking homepage quality..."
if [ -f "dist/prerendered/index.html" ]; then
    HOMEPAGE_SIZE=$(stat -f%z dist/prerendered/index.html 2>/dev/null || stat -c%s dist/prerendered/index.html 2>/dev/null || echo "0")
    HOMEPAGE_LINKS=$(grep -oi '<a [^>]*href="/' dist/prerendered/index.html 2>/dev/null | wc -l | tr -d ' ')
    echo "  Homepage size: $HOMEPAGE_SIZE bytes"
    echo "  Homepage links: $HOMEPAGE_LINKS"
    
    if [ "$HOMEPAGE_SIZE" -ge 5000 ] && [ "$HOMEPAGE_LINKS" -ge 50 ]; then
        echo "  ✅ Homepage quality OK"
    else
        echo "  ⚠️ Homepage may need re-prerendering"
    fi
else
    echo "  ⚠️ Homepage not prerendered"
fi
echo ""

echo "=========================================="
echo "SEO Validation Complete!"
echo "=========================================="
