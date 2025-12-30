#!/bin/bash
# Fast Build Script - Compile Only
# This script builds the frontend and backend WITHOUT prerendering or heavy validations.
# Use for: CI, development testing, quick iterations
#
# For production deployment, use: npm run build:full

set -e

echo "=========================================="
echo "Fast Build (Compile Only)"
echo "=========================================="
echo ""
echo "Mode: COMPILE ONLY - no prerender, no heavy validations"
echo "Use 'npm run build:full' for production builds"
echo ""

# Step 1: Build frontend with Vite
echo "Step 1: Building frontend..."
npx vite build
echo ""

# Step 2: Build backend with esbuild
echo "Step 2: Building backend..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
echo ""

# Step 3: Quick sanity check
echo "Step 3: Verifying build output..."
if [ ! -f "dist/index.js" ]; then
    echo "ERROR: Backend build missing (dist/index.js)"
    exit 1
fi
if [ ! -d "dist/public" ]; then
    echo "ERROR: Frontend build missing (dist/public)"
    exit 1
fi
echo "  ✅ dist/index.js exists"
echo "  ✅ dist/public exists"
echo ""

echo "=========================================="
echo "Fast Build Complete!"
echo "=========================================="
echo ""
echo "Output:"
echo "  - dist/index.js (backend)"
echo "  - dist/public/ (frontend assets)"
echo ""
echo "Note: Prerendered pages not generated."
echo "For production with SEO, run: npm run build:full"
echo ""
