#!/bin/bash
# Asset Validation Script
# Validates production assets and prerendered HTML integrity

set -e

echo "=========================================="
echo "Asset Validation"
echo "=========================================="
echo ""

# Check production build exists
echo "Step 1: Checking production build..."
if [ -d "dist/public/assets" ]; then
    ASSET_COUNT=$(ls -1 dist/public/assets/ 2>/dev/null | wc -l | tr -d ' ')
    echo "  ✅ Found $ASSET_COUNT assets in dist/public/assets"
else
    echo "  ❌ Production assets not found (run build first)"
    exit 1
fi
echo ""

# Run asset integrity verification
echo "Step 2: Verifying asset integrity..."
if [ -f "dist/prerendered/index.html" ]; then
    if node scripts/verify-asset-integrity.mjs 2>&1; then
        echo "  ✅ Asset integrity verified"
    else
        echo "  ❌ Asset integrity check failed"
        echo "  Run: node scripts/fix-prerender-assets.mjs"
        exit 1
    fi
else
    echo "  ⚠️ No prerendered files to verify"
fi
echo ""

# Check repo size
echo "Step 3: Checking repository size..."
if node scripts/check-repo-size.mjs 2>&1; then
    echo "  ✅ Repository size OK"
else
    echo "  ⚠️ Repository may be too large"
fi
echo ""

echo "=========================================="
echo "Asset Validation Complete!"
echo "=========================================="
