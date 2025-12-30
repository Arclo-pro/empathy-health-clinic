#!/bin/bash
# Database Validation Script
# Ensures required database tables exist and are properly configured

set -e

echo "=========================================="
echo "Database Validation"
echo "=========================================="
echo ""

# Push schema to create/sync tables
echo "Step 1: Syncing database schema..."
if npm run db:push 2>&1; then
    echo "  ✅ Schema synced"
else
    echo "  ⚠️ Schema sync had warnings"
fi
echo ""

# Create analytics tables if missing
echo "Step 2: Creating analytics tables if missing..."
if npx tsx scripts/create-analytics-tables.ts 2>&1; then
    echo "  ✅ Analytics tables ready"
else
    echo "  ⚠️ Analytics table creation had warnings"
fi
echo ""

# Validate required tables
echo "Step 3: Validating required tables..."
if npx tsx scripts/validate-database-tables.ts 2>&1; then
    echo "  ✅ All required tables validated"
else
    echo "  ❌ Table validation failed"
    exit 1
fi
echo ""

echo "=========================================="
echo "Database Validation Complete!"
echo "=========================================="
