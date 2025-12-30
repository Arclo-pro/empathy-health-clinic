#!/bin/bash
# Validate assets against local files
# Usage: npm run validate:assets
#   or:  bash scripts/validate-assets-local.sh

set -e

echo "Validating assets (local mode)..."
npx tsx scripts/validate-assets.ts

echo ""
echo "To validate against CDN, run:"
echo "  EXTERNAL_ASSET_URL=https://your-cdn.com npm run validate:assets:cdn"
