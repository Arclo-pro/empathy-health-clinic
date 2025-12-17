#!/bin/bash
# SEO Smoke Test - Validates crawlability requirements
# Usage: npm run seo:smoke or ./scripts/seo-smoke-test.sh

set -e

BASE_URL="${1:-http://localhost:5000}"
MIN_HOMEPAGE_LINKS=50
MIN_SUBPAGE_LINKS=10
REQUIRED_PAGES=("/" "/psychiatrist-orlando" "/services" "/team" "/blog" "/contact")

echo "=========================================="
echo "SEO Crawlability Smoke Test"
echo "=========================================="
echo ""
echo "Base URL: $BASE_URL"
echo ""

FAILED=0

# Test A1: Homepage has crawlable links
echo "=== A1: View Source contains crawlable links ==="
HOMEPAGE_LINKS=$(curl -s "$BASE_URL/" | grep -oP '<a [^>]*href="/[a-zA-Z][^"]*"' | wc -l)
echo "Homepage links: $HOMEPAGE_LINKS (minimum: $MIN_HOMEPAGE_LINKS)"
if [ "$HOMEPAGE_LINKS" -lt "$MIN_HOMEPAGE_LINKS" ]; then
    echo "FAIL: Homepage has fewer than $MIN_HOMEPAGE_LINKS links"
    FAILED=1
else
    echo "PASS"
fi
echo ""

# Test A2: Title and meta tags exist
echo "=== A2: Title and Meta Tags ==="
TITLE_COUNT=$(curl -s "$BASE_URL/" | grep -c '<title>' || echo "0")
if [ "$TITLE_COUNT" -ge 1 ]; then
    echo "PASS: Title tag present"
else
    echo "FAIL: Title tag missing"
    FAILED=1
fi

META_DESC=$(curl -s "$BASE_URL/" | grep -c 'name="description"' || echo "0")
if [ "$META_DESC" -ge 1 ]; then
    echo "PASS: Meta description present"
else
    echo "FAIL: Meta description missing"
    FAILED=1
fi

CANONICAL=$(curl -s "$BASE_URL/" | grep -c 'rel="canonical"' || echo "0")
if [ "$CANONICAL" -ge 1 ]; then
    echo "PASS: Canonical tag present"
else
    echo "FAIL: Canonical tag missing"
    FAILED=1
fi
echo ""

# Test A3: Key pages have links
echo "=== A3: Key pages have crawlable links ==="
for PAGE in "/psychiatrist-orlando" "/services" "/team"; do
    LINKS=$(curl -s "$BASE_URL$PAGE" | grep -oP '<a [^>]*href="/[a-zA-Z][^"]*"' | wc -l)
    echo "$PAGE: $LINKS links"
    if [ "$LINKS" -lt "$MIN_SUBPAGE_LINKS" ]; then
        echo "FAIL: $PAGE has fewer than $MIN_SUBPAGE_LINKS links"
        FAILED=1
    fi
done
echo ""

# Test B3: Snapshot file exists
echo "=== B3: Prerendered files exist ==="
PRERENDER_COUNT=$(find dist/prerendered -name "index.html" 2>/dev/null | wc -l)
echo "Prerendered files: $PRERENDER_COUNT"
if [ "$PRERENDER_COUNT" -lt 100 ]; then
    echo "FAIL: Fewer than 100 prerendered files"
    FAILED=1
else
    echo "PASS"
fi
echo ""

# Test B4: Homepage snapshot quality
echo "=== B4: Homepage snapshot quality ==="
if [ -f "dist/prerendered/index.html" ]; then
    FILE_LINKS=$(grep -oP '<a [^>]*href="/[a-zA-Z][^"]*"' dist/prerendered/index.html | wc -l)
    echo "Homepage file links: $FILE_LINKS"
    if [ "$FILE_LINKS" -lt "$MIN_HOMEPAGE_LINKS" ]; then
        echo "FAIL: Homepage snapshot has fewer than $MIN_HOMEPAGE_LINKS links"
        FAILED=1
    else
        echo "PASS"
    fi
else
    echo "FAIL: Homepage snapshot missing"
    FAILED=1
fi
echo ""

# Test C3: Content-Type header
echo "=== C3: Content-Type header ==="
CONTENT_TYPE=$(curl -sI "$BASE_URL/" | grep -i 'content-type:' | head -1)
echo "$CONTENT_TYPE"
if echo "$CONTENT_TYPE" | grep -qi 'text/html'; then
    echo "PASS"
else
    echo "FAIL: Content-Type is not text/html"
    FAILED=1
fi
echo ""

# Final result
echo "=========================================="
if [ "$FAILED" -eq 0 ]; then
    echo "ALL TESTS PASSED"
    exit 0
else
    echo "SOME TESTS FAILED"
    exit 1
fi
