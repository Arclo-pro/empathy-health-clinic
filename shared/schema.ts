import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
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
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
