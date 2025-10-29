import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendLeadNotification } from "./email";
import {
  insertSiteContentSchema,
  insertTreatmentSchema,
  insertTeamMemberSchema,
  insertTestimonialSchema,
  insertInsuranceProviderSchema,
  insertTherapySchema,
  insertConditionSchema,
  insertLocationSchema,
  insertLeadSchema,
  insertBlogPostSchema,
  insertNewsletterSubscriberSchema,
  insertPageViewSchema,
  insertAnalyticsEventSchema,
  insertWebVitalSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Site content routes
  app.get("/api/site-content", async (_req, res) => {
    try {
      const content = await storage.getSiteContent();
      res.json(content);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/site-content", async (req, res) => {
    try {
      const validated = insertSiteContentSchema.parse(req.body);
      const content = await storage.updateSiteContent(validated);
      res.json(content);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Treatment routes
  app.get("/api/treatments", async (_req, res) => {
    try {
      const treatments = await storage.getAllTreatments();
      res.json(treatments);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/treatments/:id", async (req, res) => {
    try {
      const treatment = await storage.getTreatment(req.params.id);
      if (!treatment) {
        return res.status(404).json({ error: "Treatment not found" });
      }
      res.json(treatment);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/treatments/slug/:slug", async (req, res) => {
    try {
      const treatment = await storage.getTreatmentBySlug(req.params.slug);
      if (!treatment) {
        return res.status(404).json({ error: "Treatment not found" });
      }
      res.json(treatment);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/treatments", async (req, res) => {
    try {
      const validated = insertTreatmentSchema.parse(req.body);
      const treatment = await storage.createTreatment(validated);
      res.json(treatment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/treatments/:id", async (req, res) => {
    try {
      const validated = insertTreatmentSchema.partial().parse(req.body);
      const treatment = await storage.updateTreatment(req.params.id, validated);
      res.json(treatment);
    } catch (error: any) {
      if (error.message === "Treatment not found") {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/treatments/:id", async (req, res) => {
    try {
      await storage.deleteTreatment(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Team member routes
  app.get("/api/team-members", async (_req, res) => {
    try {
      const members = await storage.getAllTeamMembers();
      res.json(members);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/team-members/:id", async (req, res) => {
    try {
      const member = await storage.getTeamMember(req.params.id);
      if (!member) {
        return res.status(404).json({ error: "Team member not found" });
      }
      res.json(member);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/team-members/slug/:slug", async (req, res) => {
    try {
      const member = await storage.getTeamMemberBySlug(req.params.slug);
      if (!member) {
        return res.status(404).json({ error: "Team member not found" });
      }
      res.json(member);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/team-members", async (req, res) => {
    try {
      const validated = insertTeamMemberSchema.parse(req.body);
      const member = await storage.createTeamMember(validated);
      res.json(member);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/team-members/:id", async (req, res) => {
    try {
      const validated = insertTeamMemberSchema.partial().parse(req.body);
      const member = await storage.updateTeamMember(req.params.id, validated);
      res.json(member);
    } catch (error: any) {
      if (error.message === "Team member not found") {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/team-members/:id", async (req, res) => {
    try {
      await storage.deleteTeamMember(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Testimonial routes
  app.get("/api/testimonials", async (_req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/testimonials/:id", async (req, res) => {
    try {
      const testimonial = await storage.getTestimonial(req.params.id);
      if (!testimonial) {
        return res.status(404).json({ error: "Testimonial not found" });
      }
      res.json(testimonial);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const validated = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validated);
      res.json(testimonial);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/testimonials/:id", async (req, res) => {
    try {
      const validated = insertTestimonialSchema.partial().parse(req.body);
      const testimonial = await storage.updateTestimonial(req.params.id, validated);
      res.json(testimonial);
    } catch (error: any) {
      if (error.message === "Testimonial not found") {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/testimonials/:id", async (req, res) => {
    try {
      await storage.deleteTestimonial(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Insurance provider routes
  app.get("/api/insurance-providers", async (_req, res) => {
    try {
      const providers = await storage.getAllInsuranceProviders();
      res.json(providers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/insurance-providers/:id", async (req, res) => {
    try {
      const provider = await storage.getInsuranceProvider(req.params.id);
      if (!provider) {
        return res.status(404).json({ error: "Insurance provider not found" });
      }
      res.json(provider);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/insurance-providers/slug/:slug", async (req, res) => {
    try {
      const provider = await storage.getInsuranceProviderBySlug(req.params.slug);
      if (!provider) {
        return res.status(404).json({ error: "Insurance provider not found" });
      }
      res.json(provider);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/insurance-providers", async (req, res) => {
    try {
      const validated = insertInsuranceProviderSchema.parse(req.body);
      const provider = await storage.createInsuranceProvider(validated);
      res.json(provider);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/insurance-providers/:id", async (req, res) => {
    try {
      const validated = insertInsuranceProviderSchema.partial().parse(req.body);
      const provider = await storage.updateInsuranceProvider(req.params.id, validated);
      res.json(provider);
    } catch (error: any) {
      if (error.message === "Insurance provider not found") {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/insurance-providers/:id", async (req, res) => {
    try {
      await storage.deleteInsuranceProvider(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Therapy routes
  app.get("/api/therapies", async (_req, res) => {
    try {
      const therapies = await storage.getAllTherapies();
      res.json(therapies);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/therapies/:id", async (req, res) => {
    try {
      const therapy = await storage.getTherapy(req.params.id);
      if (!therapy) {
        return res.status(404).json({ error: "Therapy not found" });
      }
      res.json(therapy);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/therapies/slug/:slug", async (req, res) => {
    try {
      const therapy = await storage.getTherapyBySlug(req.params.slug);
      if (!therapy) {
        return res.status(404).json({ error: "Therapy not found" });
      }
      res.json(therapy);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/therapies", async (req, res) => {
    try {
      const validated = insertTherapySchema.parse(req.body);
      const therapy = await storage.createTherapy(validated);
      res.json(therapy);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/therapies/:id", async (req, res) => {
    try {
      const validated = insertTherapySchema.partial().parse(req.body);
      const therapy = await storage.updateTherapy(req.params.id, validated);
      res.json(therapy);
    } catch (error: any) {
      if (error.message === "Therapy not found") {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/therapies/:id", async (req, res) => {
    try {
      await storage.deleteTherapy(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Condition routes
  app.get("/api/conditions", async (_req, res) => {
    try {
      const conditions = await storage.getAllConditions();
      res.json(conditions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/conditions/:id", async (req, res) => {
    try {
      const condition = await storage.getCondition(req.params.id);
      if (!condition) {
        return res.status(404).json({ error: "Condition not found" });
      }
      res.json(condition);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/conditions/slug/:slug", async (req, res) => {
    try {
      const condition = await storage.getConditionBySlug(req.params.slug);
      if (!condition) {
        return res.status(404).json({ error: "Condition not found" });
      }
      res.json(condition);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/conditions", async (req, res) => {
    try {
      const validated = insertConditionSchema.parse(req.body);
      const condition = await storage.createCondition(validated);
      res.json(condition);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/conditions/:id", async (req, res) => {
    try {
      const validated = insertConditionSchema.partial().parse(req.body);
      const condition = await storage.updateCondition(req.params.id, validated);
      res.json(condition);
    } catch (error: any) {
      if (error.message === "Condition not found") {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/conditions/:id", async (req, res) => {
    try {
      await storage.deleteCondition(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Location routes
  app.get("/api/locations", async (_req, res) => {
    try {
      const locations = await storage.getAllLocations();
      res.json(locations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/locations/:id", async (req, res) => {
    try {
      const location = await storage.getLocation(req.params.id);
      if (!location) {
        return res.status(404).json({ error: "Location not found" });
      }
      res.json(location);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/locations/slug/:slug", async (req, res) => {
    try {
      const location = await storage.getLocationBySlug(req.params.slug);
      if (!location) {
        return res.status(404).json({ error: "Location not found" });
      }
      res.json(location);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/locations", async (req, res) => {
    try {
      const validated = insertLocationSchema.parse(req.body);
      const location = await storage.createLocation(validated);
      res.json(location);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/locations/:id", async (req, res) => {
    try {
      const validated = insertLocationSchema.partial().parse(req.body);
      const location = await storage.updateLocation(req.params.id, validated);
      res.json(location);
    } catch (error: any) {
      if (error.message === "Location not found") {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/locations/:id", async (req, res) => {
    try {
      await storage.deleteLocation(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Lead routes
  app.post("/api/leads", async (req, res) => {
    try {
      const validated = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validated);
      
      // Send email notification asynchronously (don't wait for it to complete)
      sendLeadNotification({
        firstName: validated.firstName,
        lastName: validated.lastName,
        email: validated.email,
        phone: validated.phone,
        smsOptIn: validated.smsOptIn,
        service: validated.service,
        formType: validated.formType,
        conditions: validated.conditions,
        symptoms: validated.symptoms,
        medications: validated.medications,
        preferredDay: validated.preferredDay,
        paymentMethod: validated.paymentMethod,
        insuranceProvider: validated.insuranceProvider,
        insuredName: validated.insuredName,
        insuredDob: validated.insuredDob,
        memberId: validated.memberId,
      }).catch(error => {
        console.error('Failed to send lead notification email:', error);
        // Don't fail the request if email fails
      });
      
      res.json(lead);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getAllLeads();
      res.json(leads);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Blog post routes
  app.get("/api/blog-posts", async (_req, res) => {
    try {
      const blogPosts = await storage.getAllBlogPosts();
      res.json(blogPosts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/blog-posts/:id", async (req, res) => {
    try {
      const blogPost = await storage.getBlogPost(req.params.id);
      if (!blogPost) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(blogPost);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/blog-posts/slug/:slug", async (req, res) => {
    try {
      const blogPost = await storage.getBlogPostBySlug(req.params.slug);
      if (!blogPost) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(blogPost);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/blog-posts", async (req, res) => {
    try {
      const validated = insertBlogPostSchema.parse(req.body);
      const blogPost = await storage.createBlogPost(validated);
      res.json(blogPost);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/blog-posts/:id", async (req, res) => {
    try {
      const validated = insertBlogPostSchema.partial().parse(req.body);
      const blogPost = await storage.updateBlogPost(req.params.id, validated);
      res.json(blogPost);
    } catch (error: any) {
      if (error.message === "Blog post not found") {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/blog-posts/:id", async (req, res) => {
    try {
      await storage.deleteBlogPost(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Newsletter subscriber routes
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const validated = insertNewsletterSubscriberSchema.parse(req.body);
      const subscriber = await storage.createNewsletterSubscriber(validated);
      res.json({ success: true, subscriber });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/newsletter/subscribers", async (req, res) => {
    try {
      const subscribers = await storage.getAllNewsletterSubscribers();
      res.json(subscribers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/newsletter/send", async (req, res) => {
    try {
      // Get active subscribers
      const subscribers = await storage.getActiveNewsletterSubscribers();
      
      if (subscribers.length === 0) {
        return res.status(400).json({ error: "No active subscribers" });
      }

      // Get latest blog posts
      const blogPosts = await storage.getAllBlogPosts();
      
      if (blogPosts.length === 0) {
        return res.status(400).json({ error: "No blog posts to send" });
      }

      // Send newsletter to all subscribers
      // Note: We'll implement the actual email sending in the email.ts file
      const { sendNewsletterEmail } = await import("./email");
      await sendNewsletterEmail(subscribers, blogPosts);
      
      res.json({ 
        success: true, 
        sentTo: subscribers.length,
        message: `Newsletter sent to ${subscribers.length} subscriber${subscribers.length !== 1 ? 's' : ''}`
      });
    } catch (error: any) {
      console.error('Failed to send newsletter:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Analytics routes
  app.post("/api/analytics/page-view", async (req, res) => {
    try {
      const validated = insertPageViewSchema.parse(req.body);
      const pageView = await storage.trackPageView(validated);
      res.json(pageView);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/analytics/event", async (req, res) => {
    try {
      const validated = insertAnalyticsEventSchema.parse(req.body);
      const event = await storage.trackEvent(validated);
      res.json(event);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/analytics/vitals", async (req, res) => {
    try {
      const validated = insertWebVitalSchema.parse(req.body);
      const vital = await storage.trackWebVital(validated);
      res.json(vital);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/analytics/page-views", async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const pageViews = await storage.getPageViews(
        startDate as string | undefined,
        endDate as string | undefined
      );
      res.json(pageViews);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/analytics/page-views/summary", async (_req, res) => {
    try {
      const summary = await storage.getPageViewsByPath();
      res.json(summary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/analytics/events", async (req, res) => {
    try {
      const { eventType, startDate, endDate } = req.query;
      const events = await storage.getEvents(
        eventType as string | undefined,
        startDate as string | undefined,
        endDate as string | undefined
      );
      res.json(events);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/analytics/events/summary", async (_req, res) => {
    try {
      const summary = await storage.getEventCounts();
      res.json(summary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/analytics/forms", async (_req, res) => {
    try {
      const metrics = await storage.getFormConversionMetrics();
      res.json(metrics);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/analytics/vitals", async (req, res) => {
    try {
      const { metricName } = req.query;
      const vitals = await storage.getWebVitals(metricName as string | undefined);
      res.json(vitals);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/analytics/vitals/summary", async (_req, res) => {
    try {
      const summary = await storage.getAverageWebVitals();
      res.json(summary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/analytics/dashboard", async (_req, res) => {
    try {
      const now = new Date();
      const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

      const [
        allPageViews,
        pageViews7d,
        pageViews30d,
        topPages,
        allEvents,
        eventSummary,
        vitalsSummary,
        leads
      ] = await Promise.all([
        storage.getPageViews(),
        storage.getPageViews(last7Days),
        storage.getPageViews(last30Days),
        storage.getPageViewsByPath(),
        storage.getEvents(),
        storage.getEventCounts(),
        storage.getAverageWebVitals(),
        storage.getAllLeads()
      ]);

      res.json({
        pageViews: {
          total: allPageViews.length,
          last7Days: pageViews7d.length,
          last30Days: pageViews30d.length,
          topPages: topPages.slice(0, 10)
        },
        events: {
          total: allEvents.length,
          summary: eventSummary,
          recent: allEvents.slice(0, 20)
        },
        vitals: vitalsSummary,
        conversions: {
          totalLeads: leads.length,
          formSubmissions: eventSummary.find(e => e.eventType === 'form_submission')?.count || 0,
          phoneClicks: eventSummary.find(e => e.eventType === 'phone_click')?.count || 0,
          virtualVisitRequests: eventSummary.find(e => e.eventType === 'virtual_visit_click')?.count || 0
        }
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // SEO Routes - XML Sitemap
  app.get("/sitemap.xml", async (_req, res) => {
    try {
      const [treatments, therapies, conditions, insuranceProviders, blogPosts, locations] = await Promise.all([
        storage.getAllTreatments(),
        storage.getAllTherapies(),
        storage.getAllConditions(),
        storage.getAllInsuranceProviders(),
        storage.getAllBlogPosts(),
        storage.getAllLocations()
      ]);

      const baseUrl = process.env.REPLIT_DEPLOYMENT === "1" 
        ? `https://${process.env.REPLIT_DOMAINS?.split(',')[0] || 'empathyhealthclinic.com'}`
        : "https://empathyhealthclinic.com";

      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

      // Homepage
      xml += `  <url>\n    <loc>${baseUrl}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;

      // Main pages
      const mainPages = ['/services', '/insurance', '/team', '/blog', '/therapy', '/new-patients', '/virtual-visit', '/request-appointment'];
      mainPages.forEach(page => {
        xml += `  <url>\n    <loc>${baseUrl}${page}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
      });

      // Treatment pages
      treatments.forEach(treatment => {
        xml += `  <url>\n    <loc>${baseUrl}/${treatment.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
      });

      // Therapy pages
      therapies.forEach(therapy => {
        xml += `  <url>\n    <loc>${baseUrl}/${therapy.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
      });

      // Condition pages
      conditions.forEach(condition => {
        xml += `  <url>\n    <loc>${baseUrl}/${condition.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
      });

      // Insurance provider pages
      insuranceProviders.forEach(provider => {
        xml += `  <url>\n    <loc>${baseUrl}/${provider.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
      });

      // Blog posts
      blogPosts.forEach(post => {
        const lastMod = post.lastUpdated || post.publishedDate;
        xml += `  <url>\n    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
        if (lastMod) {
          xml += `    <lastmod>${new Date(lastMod).toISOString().split('T')[0]}</lastmod>\n`;
        }
        xml += `    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
      });

      // Location pages
      locations.forEach(location => {
        xml += `  <url>\n    <loc>${baseUrl}/locations/${location.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
      });

      xml += '</urlset>';

      res.header('Content-Type', 'application/xml');
      res.send(xml);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Robots.txt
  app.get("/robots.txt", (_req, res) => {
    const baseUrl = process.env.REPLIT_DEPLOYMENT === "1" 
      ? `https://${process.env.REPLIT_DOMAINS?.split(',')[0] || 'empathyhealthclinic.com'}`
      : "https://empathyhealthclinic.com";

    const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${baseUrl}/sitemap.xml
`;

    res.header('Content-Type', 'text/plain');
    res.send(robotsTxt);
  });

  const httpServer = createServer(app);
  return httpServer;
}
