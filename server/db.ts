import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

// Configure pool with proper timeout and error handling
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 10000, // Return an error if connection takes longer than 10 seconds
});

// Handle pool errors to prevent crashes
pool.on('error', (err) => {
  console.error('⚠️ Unexpected database pool error:', err);
});

export const db = drizzle(pool, { schema });

// Initialize database tables on startup (creates missing tables)
export async function initializeDatabase(): Promise<void> {
  console.log('🔧 Checking database tables...');
  
  try {
    // Create leads table if missing (matches shared/schema.ts)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        sms_opt_in TEXT DEFAULT 'false',
        service TEXT,
        form_type TEXT NOT NULL DEFAULT 'short',
        conditions TEXT DEFAULT '[]',
        symptoms TEXT DEFAULT '[]',
        medications TEXT,
        preferred_day TEXT,
        payment_method TEXT,
        insurance_provider TEXT,
        insured_name TEXT,
        insured_dob TEXT,
        member_id TEXT,
        landing_page TEXT,
        source TEXT,
        utm_source TEXT,
        utm_medium TEXT,
        utm_campaign TEXT,
        utm_term TEXT,
        utm_content TEXT,
        gclid TEXT,
        fbclid TEXT,
        status TEXT DEFAULT 'new',
        rejection_reason TEXT,
        notes TEXT,
        contacted_at TEXT,
        converted_at TEXT,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP::text
      )
    `);
    
    // Create blog_posts table if missing
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        content TEXT,
        excerpt TEXT,
        featured_image TEXT,
        author TEXT,
        status TEXT DEFAULT 'draft',
        published_at TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP::text,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP::text
      )
    `);
    
    // Create analytics tables if missing (matches shared/schema.ts)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS page_views (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
        path TEXT NOT NULL,
        timestamp TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP::text,
        user_agent TEXT,
        referrer TEXT,
        utm_source TEXT,
        utm_medium TEXT,
        utm_campaign TEXT,
        utm_term TEXT,
        utm_content TEXT
      )
    `);
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS web_vitals (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
        metric_name TEXT NOT NULL,
        value TEXT NOT NULL,
        rating TEXT NOT NULL,
        metric_id TEXT NOT NULL,
        navigation_type TEXT,
        page_design_type TEXT,
        timestamp TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP::text
      )
    `);
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS analytics_events (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
        event_type TEXT NOT NULL,
        event_category TEXT NOT NULL,
        event_label TEXT,
        value TEXT,
        path TEXT NOT NULL,
        timestamp TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP::text
      )
    `);
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS conversion_events (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
        conversion_type TEXT NOT NULL,
        conversion_value DECIMAL,
        source TEXT,
        url TEXT,
        session_id TEXT,
        timestamp TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP::text
      )
    `);
    
    console.log('✅ Database tables verified');
  } catch (error) {
    console.error('⚠️ Database initialization warning:', error);
    // Don't throw - app can still run with partial functionality
  }
}
