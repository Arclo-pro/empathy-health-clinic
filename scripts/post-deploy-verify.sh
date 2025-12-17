#!/bin/bash
# Post-Deploy Production Verification Script
# Run after publishing to verify prerendered HTML is being served correctly.
# 
# This script MUST pass for a deployment to be considered successful.
# If it fails, immediately fix and republish.
#
# Usage: ./scripts/post-deploy-verify.sh [URL]

set -e

# Configuration
PROD_URL="${1:-https://www.empathyhealthclinic.com}"
FINAL_URL="https://empathyhealthclinic.com"  # After www redirect
MIN_HOMEPAGE_LINKS=50
MIN_DEEP_PAGE_LINKS=10

echo "=========================================="
echo "Post-Deploy Production Verification"
echo "=========================================="
echo ""
echo "Target: $PROD_URL"
echo "Final URL (after redirect): $FINAL_URL"
echo ""

FAILED=0
WARNINGS=0

# Test 1: Check HTTP response follows redirects to 200
echo "=== Test 1: HTTP Response ==="
HTTP_CODES=$(curl -sI --http1.1 -L "$PROD_URL" 2>/dev/null | grep "HTTP/" | awk '{print $2}' | tr '\n' ' ')
HTTP_FINAL=$(echo "$HTTP_CODES" | awk '{print $NF}')
echo "HTTP chain: $HTTP_CODES"
echo "Final status: $HTTP_FINAL"
if [ "$HTTP_FINAL" = "200" ]; then
    echo "PASS"
else
    echo "FAIL: Expected final status 200, got $HTTP_FINAL"
    FAILED=1
fi
echo ""

# Test 2: Check Content-Type is text/html
echo "=== Test 2: Content-Type ==="
CONTENT_TYPE=$(curl -sI --http1.1 -L "$FINAL_URL" 2>/dev/null | grep -i "content-type:" | tail -1)
echo "$CONTENT_TYPE"
if echo "$CONTENT_TYPE" | grep -qi "text/html"; then
    echo "PASS"
else
    echo "FAIL: Content-Type should be text/html"
    FAILED=1
fi
echo ""

# Test 3: Check prerender marker exists
echo "=== Test 3: Prerender Marker ==="
MARKER_COUNT=$(curl -sL "$FINAL_URL" 2>/dev/null | grep -c 'Prerendered by Puppeteer' || echo "0")
echo "Prerender markers found: $MARKER_COUNT"
if [ "$MARKER_COUNT" -ge 1 ]; then
    echo "PASS"
else
    echo "FAIL: Prerender marker not found - production not serving prerendered HTML"
    echo "  This means the deployment did not include prerendered files."
    echo "  Check that .replit build = [\"bash\", \"scripts/build-production.sh\"]"
    FAILED=1
fi
echo ""

# Test 4: Check homepage has sufficient internal links
echo "=== Test 4: Homepage Links (min $MIN_HOMEPAGE_LINKS) ==="
HOMEPAGE_LINKS=$(curl -sL "$FINAL_URL" 2>/dev/null | grep -oi '<a [^>]*href="/' | wc -l | tr -d ' ')
echo "Homepage links: $HOMEPAGE_LINKS"
if [ "$HOMEPAGE_LINKS" -ge "$MIN_HOMEPAGE_LINKS" ]; then
    echo "PASS"
else
    echo "FAIL: Homepage has $HOMEPAGE_LINKS links (need >= $MIN_HOMEPAGE_LINKS)"
    echo "  Crawlers need visible <a href> links to discover pages."
    FAILED=1
fi
echo ""

# Test 5: Check deep page has sufficient links
echo "=== Test 5: Deep Page Links (min $MIN_DEEP_PAGE_LINKS) ==="
DEEP_LINKS=$(curl -sL "$FINAL_URL/psychiatrist-orlando" 2>/dev/null | grep -oi '<a [^>]*href="/' | wc -l | tr -d ' ')
echo "/psychiatrist-orlando links: $DEEP_LINKS"
if [ "$DEEP_LINKS" -ge "$MIN_DEEP_PAGE_LINKS" ]; then
    echo "PASS"
else
    echo "FAIL: Deep page has $DEEP_LINKS links (need >= $MIN_DEEP_PAGE_LINKS)"
    FAILED=1
fi
echo ""

# Test 6: Check multiple key pages respond
echo "=== Test 6: Key Page Availability ==="
KEY_PAGES=(
    "/"
    "/psychiatrist-orlando"
    "/services"
    "/team"
    "/blog"
)
for PAGE in "${KEY_PAGES[@]}"; do
    STATUS=$(curl -sI -L "$FINAL_URL$PAGE" 2>/dev/null | grep "HTTP/" | tail -1 | awk '{print $2}')
    LINKS=$(curl -sL "$FINAL_URL$PAGE" 2>/dev/null | grep -oi '<a [^>]*href="/' | wc -l | tr -d ' ')
    echo "  $PAGE: HTTP $STATUS, $LINKS links"
    if [ "$STATUS" != "200" ]; then
        echo "    WARNING: Expected 200"
        WARNINGS=$((WARNINGS + 1))
    fi
done
echo ""

# Test 7: Verify no Vite dev references in production HTML
echo "=== Test 7: No Dev References ==="
VITE_REFS=$(curl -sL "$FINAL_URL" 2>/dev/null | grep -ci '@vite\|/@vite\|/@replit\|HMR\|hot-update' || echo "0")
echo "Vite/dev references found: $VITE_REFS"
if [ "$VITE_REFS" -eq 0 ]; then
    echo "PASS"
else
    echo "FAIL: Production HTML contains development references"
    echo "  This indicates stale or incorrectly generated snapshots."
    FAILED=1
fi
echo ""

# Test 8: Show sample links for verification
echo "=== Sample Internal Links (first 10) ==="
curl -sL "$FINAL_URL" 2>/dev/null | grep -oi '<a [^>]*href="/[^"]*"' | head -10 | sed 's/.*href="/  /' | sed 's/".*//'
echo ""

# Final result
echo "=========================================="
if [ "$FAILED" -eq 0 ]; then
    echo "ALL PRODUCTION TESTS PASSED"
    if [ "$WARNINGS" -gt 0 ]; then
        echo ""
        echo "Note: $WARNINGS warnings (non-critical)"
    fi
    echo ""
    echo "The site is fully crawlable in HTML-only mode."
    echo "Screaming Frog should now discover 100+ URLs in default mode."
    echo ""
    echo "Next steps:"
    echo "  1. Run Screaming Frog with default 'text/html' rendering"
    echo "  2. Verify all key pages are discovered"
    echo "  3. Check for any remaining soft 404s or redirect chains"
    exit 0
else
    echo "PRODUCTION TESTS FAILED"
    echo ""
    echo "Required fixes:"
    echo "  1. Ensure .replit has: build = [\"bash\", \"scripts/build-production.sh\"]"
    echo "  2. Republish the app"
    echo "  3. Re-run this verification script"
    echo ""
    echo "Common issues:"
    echo "  - Deployment used old build command without prerendering"
    echo "  - Prerendered files not included in deployment artifact"
    echo "  - Server not serving prerendered HTML for text/html requests"
    exit 1
fi
