#!/usr/bin/env tsx
/**
 * Database Table Validation Script
 * Ensures all critical database tables exist before deployment.
 * This prevents regressions where schema changes aren't synced to the database.
 */

import { neon } from '@neondatabase/serverless';

const REQUIRED_TABLES = [
  'leads',
  'blog_posts',
];

const OPTIONAL_TABLES = [
  'page_views',
  'web_vitals',
  'analytics_events',
  'conversion_events',
];

async function validateDatabaseTables(): Promise<void> {
  console.log('🔍 Validating database tables...\n');

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  try {
    const result = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;

    const existingTables = new Set(result.map(row => row.table_name));
    
    console.log(`📋 Found ${existingTables.size} tables in database:`);
    console.log(`   ${Array.from(existingTables).sort().join(', ')}\n`);

    const missingRequired: string[] = [];
    const missingOptional: string[] = [];

    for (const table of REQUIRED_TABLES) {
      if (existingTables.has(table)) {
        console.log(`   ✅ ${table} (required)`);
      } else {
        console.log(`   ❌ ${table} (required) - MISSING`);
        missingRequired.push(table);
      }
    }

    console.log('');

    for (const table of OPTIONAL_TABLES) {
      if (existingTables.has(table)) {
        console.log(`   ✅ ${table} (optional)`);
      } else {
        console.log(`   ⚠️  ${table} (optional) - missing`);
        missingOptional.push(table);
      }
    }

    console.log('');

    if (missingRequired.length > 0) {
      console.error(`\n❌ VALIDATION FAILED: ${missingRequired.length} required table(s) missing:`);
      console.error(`   ${missingRequired.join(', ')}`);
      console.error('\n   To fix: Run "npm run db:push" or create tables manually with SQL.\n');
      process.exit(1);
    }

    if (missingOptional.length > 0) {
      console.warn(`\n⚠️  Warning: ${missingOptional.length} optional table(s) missing (non-blocking)`);
    }

    console.log('\n✅ Database table validation passed!\n');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

validateDatabaseTables().catch(error => {
  console.error('❌ Validation script failed:', error);
  process.exit(1);
});
