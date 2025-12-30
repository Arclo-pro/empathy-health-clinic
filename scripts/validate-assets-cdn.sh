#!/bin/bash
# Validate assets against CDN
# Usage: EXTERNAL_ASSET_URL=https://your-cdn.com npm run validate:assets:cdn
#   or:  EXTERNAL_ASSET_URL=https://your-cdn.com bash scripts/validate-assets-cdn.sh

set -e

if [ -z "$EXTERNAL_ASSET_URL" ]; then
  echo "Error: EXTERNAL_ASSET_URL environment variable is required"
  echo ""
  echo "Usage:"
  echo "  EXTERNAL_ASSET_URL=https://cdn.example.com npm run validate:assets:cdn"
  exit 1
fi

echo "Validating assets against CDN: $EXTERNAL_ASSET_URL"
npx tsx scripts/validate-assets.ts --cdn
