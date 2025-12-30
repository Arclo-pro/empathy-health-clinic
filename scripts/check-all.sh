#!/bin/bash
# Run All Validation Checks
# Combines: check:repo, check:db, check:seo, check:assets

set -e

echo "=========================================="
echo "Running All Validation Checks"
echo "=========================================="
echo ""

FAILED=0

# Check 1: Repository size
echo ">>> Check 1: Repository Size"
if node scripts/check-repo-size.mjs 2>&1; then
    echo "  ✅ PASSED"
else
    echo "  ❌ FAILED"
    FAILED=1
fi
echo ""

# Check 2: Database
echo ">>> Check 2: Database"
if bash scripts/check-db.sh 2>&1; then
    echo "  ✅ PASSED"
else
    echo "  ❌ FAILED"
    FAILED=1
fi
echo ""

# Check 3: SEO
echo ">>> Check 3: SEO"
if bash scripts/check-seo.sh 2>&1; then
    echo "  ✅ PASSED"
else
    echo "  ⚠️ WARNINGS (non-fatal)"
fi
echo ""

# Check 4: Assets (only if build exists)
echo ">>> Check 4: Assets"
if [ -d "dist/public" ]; then
    if bash scripts/check-assets.sh 2>&1; then
        echo "  ✅ PASSED"
    else
        echo "  ❌ FAILED"
        FAILED=1
    fi
else
    echo "  ⚠️ SKIPPED (no build found)"
fi
echo ""

echo "=========================================="
if [ "$FAILED" -eq 0 ]; then
    echo "All Checks Passed!"
else
    echo "Some Checks Failed!"
    exit 1
fi
echo "=========================================="
