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

// Services/Treatments
export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  link: text("link").notNull(),
  order: integer("order").notNull(),
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
});

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

// Team Members
export const teamMembers = pgTable("team_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  credentials: text("credentials").notNull(),
  image: text("image").notNull(),
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
  order: integer("order").notNull(),
});

export const insertInsuranceProviderSchema = createInsertSchema(insuranceProviders).omit({
  id: true,
});

export type InsertInsuranceProvider = z.infer<typeof insertInsuranceProviderSchema>;
export type InsuranceProvider = typeof insuranceProviders.$inferSelect;

// Conditions we treat
export const conditions = pgTable("conditions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  description: text("description").notNull(),
  order: integer("order").notNull(),
});

export const insertConditionSchema = createInsertSchema(conditions).omit({
  id: true,
});

export type InsertCondition = z.infer<typeof insertConditionSchema>;
export type Condition = typeof conditions.$inferSelect;
