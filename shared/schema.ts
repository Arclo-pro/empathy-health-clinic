import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Site content for hero, footer, etc.
export const siteContent = pgTable("site_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heroTitle: text("hero_title").notNull(),
  heroSubtitle: text("hero_subtitle").notNull(),
  heroImage: text("hero_image").notNull(),
  reviewCount: integer("review_count").notNull(),
  reviewRating: text("review_rating").notNull(),
  footerPhone: text("footer_phone").notNull(),
  footerEmail: text("footer_email").notNull(),
  footerAddress: text("footer_address").notNull(),
  aboutText: text("about_text").notNull(),
});

export const insertSiteContentSchema = createInsertSchema(siteContent).omit({
  id: true,
});

export type InsertSiteContent = z.infer<typeof insertSiteContentSchema>;
export type SiteContent = typeof siteContent.$inferSelect;

// Treatments
export const treatments = pgTable("treatments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  shortDescription: text("short_description").notNull(),
  icon: text("icon").notNull(),
  slug: text("slug").notNull(),
  pageTitle: text("page_title").notNull(),
  heroTitle: text("hero_title").notNull(),
  heroDescription: text("hero_description").notNull(),
  description: text("description").notNull(),
  whoCanBenefit: text("who_can_benefit").notNull(),
  whatToExpect: text("what_to_expect").notNull(),
  faqs: text("faqs").notNull().default('[]'),
  order: integer("order").notNull(),
});

export const insertTreatmentSchema = createInsertSchema(treatments).omit({
  id: true,
});

export type InsertTreatment = z.infer<typeof insertTreatmentSchema>;
export type Treatment = typeof treatments.$inferSelect;

// Team Members
export const teamMembers = pgTable("team_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  credentials: text("credentials").notNull(),
  image: text("image").notNull(),
  doxyUrl: text("doxy_url").notNull().default("https://doxy.me/empathy1"),
  slug: text("slug").notNull(),
  bio: text("bio").notNull(),
  specialties: text("specialties").notNull(),
  education: text("education").notNull(),
  approach: text("approach").notNull(),
  pageTitle: text("page_title").notNull(),
  order: integer("order").notNull(),
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true,
});

export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  date: text("date").notNull(),
  text: text("text").notNull(),
  rating: integer("rating").notNull(),
  profileImage: text("profile_image"), // URL to profile image or null for initial-based avatar
  order: integer("order").notNull(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// Insurance Providers
export const insuranceProviders = pgTable("insurance_providers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  logo: text("logo").notNull(),
  slug: text("slug").notNull(),
  pageTitle: text("page_title").notNull(),
  heroTitle: text("hero_title").notNull(),
  heroDescription: text("hero_description").notNull(),
  description: text("description").notNull(),
  coverageDetails: text("coverage_details").notNull(),
  faqs: text("faqs").notNull().default('[]'),
  order: integer("order").notNull(),
});

export const insertInsuranceProviderSchema = createInsertSchema(insuranceProviders).omit({
  id: true,
});

export type InsertInsuranceProvider = z.infer<typeof insertInsuranceProviderSchema>;
export type InsuranceProvider = typeof insuranceProviders.$inferSelect;

// Therapies
export const therapies = pgTable("therapies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  shortDescription: text("short_description").notNull(),
  icon: text("icon").notNull(),
  slug: text("slug").notNull(),
  pageTitle: text("page_title").notNull(),
  heroTitle: text("hero_title").notNull(),
  heroDescription: text("hero_description").notNull(),
  description: text("description").notNull(),
  whoCanBenefit: text("who_can_benefit").notNull(),
  whatToExpect: text("what_to_expect").notNull(),
  faqs: text("faqs").notNull().default('[]'),
  order: integer("order").notNull(),
});

export const insertTherapySchema = createInsertSchema(therapies).omit({
  id: true,
});

export type InsertTherapy = z.infer<typeof insertTherapySchema>;
export type Therapy = typeof therapies.$inferSelect;

// Conditions we treat
export const conditions = pgTable("conditions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  slug: text("slug").notNull(),
  pageTitle: text("page_title").notNull(),
  heroTitle: text("hero_title").notNull(),
  heroDescription: text("hero_description").notNull(),
  fullDescription: text("full_description").notNull(),
  symptoms: text("symptoms").notNull(),
  relatedTreatments: text("related_treatments").notNull().default('[]'),
  relatedTherapies: text("related_therapies").notNull().default('[]'),
  faqs: text("faqs").notNull().default('[]'),
  order: integer("order").notNull(),
});

export const insertConditionSchema = createInsertSchema(conditions).omit({
  id: true,
});

export type InsertCondition = z.infer<typeof insertConditionSchema>;
export type Condition = typeof conditions.$inferSelect;

// Leads from therapy landing pages and contact forms
export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  smsOptIn: text("sms_opt_in").default("false"),
  service: text("service"),
  formType: text("form_type").notNull().default("short"), // 'short' or 'long'
  // Long form fields
  conditions: text("conditions").default('[]'),
  symptoms: text("symptoms").default('[]'),
  medications: text("medications"),
  preferredDay: text("preferred_day"),
  paymentMethod: text("payment_method"), // 'insurance' or 'self-pay'
  insuranceProvider: text("insurance_provider"),
  insuredName: text("insured_name"),
  insuredDob: text("insured_dob"),
  memberId: text("member_id"),
  // UTM tracking for Google Ads attribution
  landingPage: text("landing_page"), // First page they landed on
  source: text("source"), // Page where lead was generated (form submitted or phone clicked)
  utmSource: text("utm_source"), // e.g., "google", "facebook"
  utmMedium: text("utm_medium"), // e.g., "cpc", "organic"
  utmCampaign: text("utm_campaign"), // Campaign name
  utmTerm: text("utm_term"), // Keyword clicked (most important for Google Ads!)
  utmContent: text("utm_content"), // Ad variation
  gclid: text("gclid"), // Google Ads Click ID (critical for conversion attribution)
  fbclid: text("fbclid"), // Facebook Click ID
  // Conversion tracking
  status: text("status").default("new"), // new, contacted, signed_up, rejected, no_show
  rejectionReason: text("rejection_reason"), // Insurance issues, requires specific provider, etc.
  notes: text("notes"), // Internal notes about the lead
  contactedAt: text("contacted_at"), // When we first contacted them
  convertedAt: text("converted_at"), // When they signed up
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

// Blog posts
export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull().default("Empathy Health Clinic"),
  publishedDate: text("published_date").notNull(),
  category: text("category").notNull().default("Mental Health"),
  featuredImage: text("featured_image"),
  isFeatured: boolean("is_featured").notNull().default(false),
  // SEO fields
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  keywords: text("keywords").array(),
  ogImage: text("og_image"),
  canonicalSlug: text("canonical_slug"),
  lastUpdated: text("last_updated"),
  // AggregateRating fields for SERP features (optional)
  averageRating: real("average_rating"), // e.g., 4.8 out of 5
  ratingCount: integer("rating_count"), // Number of ratings
  bestRating: integer("best_rating"), // Typically 5
  worstRating: integer("worst_rating"), // Typically 1
  order: integer("order").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
});

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

// Blog Image Tracking (for global deduplication across all blogs)
export const usedBlogImages = pgTable("used_blog_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  imageUrl: text("image_url").notNull().unique(),
  description: text("description").notNull(),
  altText: text("alt_text").notNull(),
  source: text("source").notNull().default("unsplash"), // 'unsplash', 'stock', 'generated'
  usedInBlogPostId: varchar("used_in_blog_post_id"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const insertUsedBlogImageSchema = createInsertSchema(usedBlogImages).omit({
  id: true,
  createdAt: true,
});

export type InsertUsedBlogImage = z.infer<typeof insertUsedBlogImageSchema>;
export type UsedBlogImage = typeof usedBlogImages.$inferSelect;

// Analytics - Page Views
export const pageViews = pgTable("page_views", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  path: text("path").notNull(),
  timestamp: text("timestamp").notNull().default(sql`CURRENT_TIMESTAMP`),
  userAgent: text("user_agent"),
  referrer: text("referrer"),
  // UTM tracking for Google Ads attribution
  utmSource: text("utm_source"), // e.g., "google", "facebook"
  utmMedium: text("utm_medium"), // e.g., "cpc", "organic"
  utmCampaign: text("utm_campaign"), // Campaign name
  utmTerm: text("utm_term"), // Keyword clicked
  utmContent: text("utm_content"), // Ad variation
});

export const insertPageViewSchema = createInsertSchema(pageViews).omit({
  id: true,
  timestamp: true,
});

export type InsertPageView = z.infer<typeof insertPageViewSchema>;
export type PageView = typeof pageViews.$inferSelect;

// Analytics - Events (form submissions, calls, clicks, etc.)
export const analyticsEvents = pgTable("analytics_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventType: text("event_type").notNull(), // 'form_submission', 'phone_click', 'virtual_visit', etc.
  eventCategory: text("event_category").notNull(), // 'conversion', 'engagement', etc.
  eventLabel: text("event_label"), // Additional context
  value: text("value"), // Event value (e.g., form name, phone number)
  path: text("path").notNull(), // Where the event occurred
  timestamp: text("timestamp").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const insertAnalyticsEventSchema = createInsertSchema(analyticsEvents).omit({
  id: true,
  timestamp: true,
});

export type InsertAnalyticsEvent = z.infer<typeof insertAnalyticsEventSchema>;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;

// Analytics - Web Vitals (Core Web Vitals tracking)
export const webVitals = pgTable("web_vitals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  metricName: text("metric_name").notNull(), // 'LCP', 'INP', 'CLS', 'FCP', 'TTFB'
  value: text("value").notNull(), // Numeric value as string
  rating: text("rating").notNull(), // 'good', 'needs-improvement', 'poor'
  metricId: text("metric_id").notNull(), // Unique ID for this measurement
  navigationType: text("navigation_type"), // 'navigate', 'reload', 'back-forward', etc.
  pageDesignType: text("page_design_type"), // 'A-treatment', 'B-location', 'C-insurance', 'D-grid', 'E-custom'
  timestamp: text("timestamp").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const insertWebVitalSchema = createInsertSchema(webVitals).omit({
  id: true,
  timestamp: true,
});

export type InsertWebVital = z.infer<typeof insertWebVitalSchema>;
export type WebVital = typeof webVitals.$inferSelect;

// Newsletter Subscribers
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  subscribedAt: text("subscribed_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  status: text("status").notNull().default("active"), // 'active' or 'unsubscribed'
});

export const insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribers).omit({
  id: true,
  subscribedAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
});

export type InsertNewsletterSubscriber = z.infer<typeof insertNewsletterSubscriberSchema>;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;

// Location Pages (city-specific landing pages)
export const locations = pgTable("locations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  city: text("city").notNull(), // e.g., "Winter Park", "Sanford", "Lake Mary"
  serviceType: text("service_type").notNull(), // e.g., "psychiatry", "therapy-services", "counseling"
  pageTitle: text("page_title").notNull(),
  metaDescription: text("meta_description").notNull(),
  heroTitle: text("hero_title").notNull(),
  heroDescription: text("hero_description").notNull(),
  description: text("description").notNull(),
  servicesOffered: text("services_offered").notNull().default('[]'),
  whyChooseUs: text("why_choose_us").notNull(),
  faqs: text("faqs").notNull().default('[]'),
  order: integer("order").notNull(),
});

export const insertLocationSchema = createInsertSchema(locations).omit({
  id: true,
});

export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type Location = typeof locations.$inferSelect;

export const emailFailures = pgTable("email_failures", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  leadId: varchar("lead_id"),
  emailType: text("email_type").notNull(),
  recipientEmail: text("recipient_email").notNull(),
  errorMessage: text("error_message").notNull(),
  errorDetails: text("error_details"),
  retryCount: integer("retry_count").notNull().default(0),
  lastRetryAt: text("last_retry_at"),
  resolved: boolean("resolved").notNull().default(false),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  resolvedAt: text("resolved_at"),
});

export const insertEmailFailureSchema = createInsertSchema(emailFailures).omit({
  id: true,
  createdAt: true,
});

export type InsertEmailFailure = z.infer<typeof insertEmailFailureSchema>;
export type EmailFailure = typeof emailFailures.$inferSelect;
