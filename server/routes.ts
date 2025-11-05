import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendLeadNotification } from "./email";
import * as googleAdsService from "./google-ads-service";
import { blogGeneratorService } from "./blog-generator-service";
import { ContentAnalyzerService } from "./content-analyzer-service";
import { db } from "./db";
import { sql } from "drizzle-orm";
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
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes (/api/register, /api/login, /api/logout, /api/user)
  setupAuth(app);
  // Specific treatment redirects (must come BEFORE catch-all)
  app.get("/treatments/psychiatric-services", (req, res) => {
    res.redirect(301, "/services");
  });
  app.get("/treatments/psychiatric-services/", (req, res) => {
    res.redirect(301, "/services");
  });
  
  // Legacy URL redirects for SEO (catch-all patterns)
  app.get("/treatments/:slug", (req, res) => {
    res.redirect(301, `/${req.params.slug}`);
  });
  
  app.get("/therapies/:slug", (req, res) => {
    res.redirect(301, `/${req.params.slug}`);
  });
  
  app.get("/conditions/:slug", (req, res) => {
    res.redirect(301, `/${req.params.slug}`);
  });
  
  app.get("/insurance/:slug", (req, res) => {
    res.redirect(301, `/${req.params.slug}`);
  });
  
  // WordPress URL redirects
  app.get("/psychiatric-services", (req, res) => {
    res.redirect(301, "/services");
  });
  
  app.get("/psychiatric-services/", (req, res) => {
    res.redirect(301, "/services");
  });
  
  app.get("/locations/psychiatry-orlando", (req, res) => {
    res.redirect(301, "/services");
  });
  
  app.get("/locations/psychiatry-orlando/", (req, res) => {
    res.redirect(301, "/services");
  });
  
  app.get("/find-a-psychiatrist-that-takes-medicare-medicare-coverage", (req, res) => {
    res.redirect(301, "/insurance");
  });
  
  app.get("/find-a-psychiatrist-that-takes-medicare-medicare-coverage/", (req, res) => {
    res.redirect(301, "/insurance");
  });
  
  // Blog post redirects for WordPress guest posts (accessed without /blog/ prefix)
  const guestPostSlugs = [
    '8-physical-signs-stress-is-impacting-your-body',
    'it-service-providers-driving-healthcare-innovation-2025',
    'bbp-certification-worker-safety',
    'how-psychiatry-clinics-improve-revenue',
    'balancing-career-growth-with-a-busy-life-a-guide-for-working-nurses',
    'wellness-guide-for-counselors',
    'finding-comfort-self-care-tips-for-those-who-are-grieving',
    'ltr-relationship-meaning-guide',
    'hidden-anxiety-treatment-dbt-skills-you-can-use-at-home'
  ];
  
  guestPostSlugs.forEach(slug => {
    app.get(`/${slug}`, (req, res) => {
      res.redirect(301, `/blog/${slug}`);
    });
  });

  // Old blog post feed URLs - redirect to main blog
  app.get("/mindful-dating-a-guide-to-building-strong-connections/feed/", (req, res) => {
    res.redirect(301, "/blog");
  });

  // Old health-and-wellness-blog redirect
  app.get("/health-and-wellness-blog/", (req, res) => {
    res.redirect(301, "/blog");
  });

  // Location page redirects - old location naming patterns
  const locationRedirects = {
    // Therapy services locations that don't exist - redirect to main Orlando therapy page
    'therapy-services-oviedo': 'therapy-services-orlando',
    'therapy-services-richmond-heights': 'therapy-services-orlando',
    'therapy-services-apopka': 'therapy-services-orlando',
    
    // Psychiatry locations - redirect to correct slug or closest alternative
    'psychiatry-aloma': 'psychiatrist-orlando',
    'psychiatry-fairview-shores': 'psychiatrist-orlando',
    'psychiatry-pine-hills': 'psychiatrist-orlando',
    'psychiatry-richmond-heights': 'psychiatrist-orlando',
    
    // Fix old naming pattern (psychiatry vs psychiatrist)
    'psychiatry-altamonte-springs': 'psychiatrist-altamonte-springs',
    'psychiatry-casselberry': 'psychiatrist-casselberry',
    'psychiatry-lake-mary': 'psychiatrist-lake-mary',
    'psychiatry-maitland': 'psychiatrist-maitland',
    'psychiatry-winter-park': 'winter-park'
  };
  
  Object.entries(locationRedirects).forEach(([oldSlug, newSlug]) => {
    app.get(`/locations/${oldSlug}`, (req, res) => {
      res.redirect(301, `/locations/${newSlug}`);
    });
    app.get(`/locations/${oldSlug}/`, (req, res) => {
      res.redirect(301, `/locations/${newSlug}`);
    });
  });

  // Old assessment pages - redirect to services or request appointment
  app.get("/anxiety-assessment/", (req, res) => {
    res.redirect(301, "/anxiety-therapy");
  });
  app.get("/adhd-assessment-page/", (req, res) => {
    res.redirect(301, "/adhd-treatment");
  });
  app.get("/adhd-test", (req, res) => {
    res.redirect(301, "/adhd-treatment");
  });
  app.get("/adhd-test/", (req, res) => {
    res.redirect(301, "/adhd-treatment");
  });
  app.get("/psychological-assessment", (req, res) => {
    res.redirect(301, "/services");
  });

  // Old treatment/therapy URLs with different patterns
  app.get("/trauma-therapy", (req, res) => {
    res.redirect(301, "/therapy");
  });
  app.get("/supplements/", (req, res) => {
    res.redirect(301, "/services");
  });

  // FAQ page (if it doesn't exist as a route)
  app.get("/faq", (req, res) => {
    res.redirect(301, "/services");
  });

  // Old "our-approach" page
  app.get("/our-approach-1", (req, res) => {
    res.redirect(301, "/services");
  });

  // Additional WordPress legacy redirects from Google Search Console
  app.get("/contact", (req, res) => {
    res.redirect(301, "/services");
  });
  app.get("/contact/", (req, res) => {
    res.redirect(301, "/services");
  });
  
  app.get("/home", (req, res) => {
    res.redirect(301, "/");
  });
  app.get("/home/", (req, res) => {
    res.redirect(301, "/");
  });
  
  app.get("/pricing", (req, res) => {
    res.redirect(301, "/services");
  });
  app.get("/pricing/", (req, res) => {
    res.redirect(301, "/services");
  });
  
  app.get("/mood-disorder-questionnaire", (req, res) => {
    res.redirect(301, "/bipolar-disorder-treatment");
  });
  app.get("/mood-disorder-questionnaire/", (req, res) => {
    res.redirect(301, "/bipolar-disorder-treatment");
  });
  
  // Condition page short URLs without -treatment suffix
  app.get("/adhd", (req, res) => {
    res.redirect(301, "/adhd-treatment");
  });
  app.get("/adhd/", (req, res) => {
    res.redirect(301, "/adhd-treatment");
  });
  
  app.get("/anxiety", (req, res) => {
    res.redirect(301, "/anxiety-treatment");
  });
  app.get("/anxiety/", (req, res) => {
    res.redirect(301, "/anxiety-treatment");
  });
  
  app.get("/bipolar-disorder", (req, res) => {
    res.redirect(301, "/bipolar-disorder-treatment");
  });
  app.get("/bipolar-disorder/", (req, res) => {
    res.redirect(301, "/bipolar-disorder-treatment");
  });
  
  app.get("/depression", (req, res) => {
    res.redirect(301, "/depression-treatment");
  });
  app.get("/depression/", (req, res) => {
    res.redirect(301, "/depression-treatment");
  });
  
  // DBT typo/old URL - redirect to CBT
  app.get("/dialectical-behavioral-therapy", (req, res) => {
    res.redirect(301, "/cognitive-behavioral-therapy");
  });
  app.get("/dialectical-behavioral-therapy/", (req, res) => {
    res.redirect(301, "/cognitive-behavioral-therapy");
  });
  
  // Old WordPress blog post URLs accessed without /blog/ prefix
  app.get("/understanding-cognitive-behavioral-therapy-cbt-a-guide-to-mental-wellness", (req, res) => {
    res.redirect(301, "/blog/understanding-cognitive-behavioral-therapy-cbt-a-guide-to-mental-wellness");
  });
  app.get("/understanding-cognitive-behavioral-therapy-cbt-a-guide-to-mental-wellness/", (req, res) => {
    res.redirect(301, "/blog/understanding-cognitive-behavioral-therapy-cbt-a-guide-to-mental-wellness");
  });
  
  app.get("/overcoming-social-anxiety", (req, res) => {
    res.redirect(301, "/blog/overcoming-social-anxiety");
  });
  app.get("/overcoming-social-anxiety/", (req, res) => {
    res.redirect(301, "/blog/overcoming-social-anxiety");
  });
  
  app.get("/practical-strategies-for-managing-anxiety-in-daily-life", (req, res) => {
    res.redirect(301, "/blog/practical-strategies-for-managing-anxiety-in-daily-life");
  });
  app.get("/practical-strategies-for-managing-anxiety-in-daily-life/", (req, res) => {
    res.redirect(301, "/blog/practical-strategies-for-managing-anxiety-in-daily-life");
  });
  
  app.get("/cpr-first-aid-certification-that-covers-medical-and-non-medical-scenarios", (req, res) => {
    res.redirect(301, "/blog/cpr-first-aid-certification-that-covers-medical-and-non-medical-scenarios");
  });
  app.get("/cpr-first-aid-certification-that-covers-medical-and-non-medical-scenarios/", (req, res) => {
    res.redirect(301, "/blog/cpr-first-aid-certification-that-covers-medical-and-non-medical-scenarios");
  });
  
  app.get("/who-cheats-more-men-or-women", (req, res) => {
    res.redirect(301, "/blog/who-cheats-more-men-or-women");
  });
  app.get("/who-cheats-more-men-or-women/", (req, res) => {
    res.redirect(301, "/blog/who-cheats-more-men-or-women");
  });
  
  // More blog posts without /blog/ prefix
  const blogPostRedirects = [
    'understanding-the-anatomy-of-a-panic-attack',
    'how-to-focus-better-with-adhd',
    'deciphering-the-differences-therapy-vs-counseling',
    'title-understanding-the-different-types-of-anxiety-disorders',
    'the-power-of-cognitive-behavioral-therapy-cbt',
    'grief-self-care-tips-for-grieving',
    'signs-of-being-gay',
    'is-codependency-bad',
    '6-effective-tips-for-fighting-anxiety-and-regaining-control',
    'understanding-adhd-diagnosis-treatment-and-coping-strategies',
    'post-traumatic-stress-disorder-ptsd-understanding-symptoms-and-treatment'
  ];
  
  blogPostRedirects.forEach(slug => {
    app.get(`/${slug}`, (req, res) => {
      res.redirect(301, `/blog/${slug}`);
    });
    app.get(`/${slug}/`, (req, res) => {
      res.redirect(301, `/blog/${slug}`);
    });
  });
  
  // Double slash typo fix
  app.get("/what-is-mental-breakdown//", (req, res) => {
    res.redirect(301, "/blog/what-is-mental-breakdown");
  });
  
  // Old therapy URL patterns
  app.get("/therapy/lgbt-therapy-services", (req, res) => {
    res.redirect(301, "/lgbtq-therapy");
  });
  app.get("/therapy/lgbt-therapy-services/", (req, res) => {
    res.redirect(301, "/lgbtq-therapy");
  });
  
  app.get("/therapy/intimacy-therapy-sexual-wellness", (req, res) => {
    res.redirect(301, "/intimacy-therapy");
  });
  app.get("/therapy/intimacy-therapy-sexual-wellness/", (req, res) => {
    res.redirect(301, "/intimacy-therapy");
  });
  
  app.get("/therapy/in-person-therapy-orlando", (req, res) => {
    res.redirect(301, "/in-person-therapy");
  });
  app.get("/therapy/in-person-therapy-orlando/", (req, res) => {
    res.redirect(301, "/in-person-therapy");
  });
  
  app.get("/treatments/in-person-therapy-orlando", (req, res) => {
    res.redirect(301, "/in-person-therapy");
  });
  app.get("/treatments/in-person-therapy-orlando/", (req, res) => {
    res.redirect(301, "/in-person-therapy");
  });
  
  // WordPress date archive URLs - redirect to blog
  const dateArchivePatterns = [
    '/2025/10/06/', '/2025/09/30/', '/2025/09/28/', '/2025/09/25/', '/2025/09/27/', '/2025/09/29/', '/2025/10/01/',
    '/2025/05/02/', '/2025/04/13/', '/2025/04/29/', '/2025/06/25/', '/2025/05/28/', '/2025/05/27/'
  ];
  dateArchivePatterns.forEach(pattern => {
    app.get(pattern, (req, res) => {
      res.redirect(301, "/blog");
    });
  });
  
  // WordPress query string URLs
  app.get("/", (req, res, next) => {
    // WordPress attachment IDs - redirect to homepage
    if (req.query.attachment_id) {
      return res.redirect(301, "/");
    }
    // WordPress page IDs - redirect to homepage
    if (req.query.page_id) {
      return res.redirect(301, "/");
    }
    next();
  });
  
  // WordPress query strings on treatment pages
  app.get("/treatments/:slug", (req, res, next) => {
    if (req.query.page_id) {
      return res.redirect(301, `/${req.params.slug}`);
    }
    next();
  });
  
  // Additional location redirects - non-existent locations
  app.get("/locations/psychiatry-wekiwa-springs", (req, res) => {
    res.redirect(301, "/locations/psychiatrist-orlando");
  });
  app.get("/locations/psychiatry-wekiwa-springs/", (req, res) => {
    res.redirect(301, "/locations/psychiatrist-orlando");
  });
  
  app.get("/locations/therapy-services-pine-hills", (req, res) => {
    res.redirect(301, "/therapy-services-orlando");
  });
  app.get("/locations/therapy-services-pine-hills/", (req, res) => {
    res.redirect(301, "/therapy-services-orlando");
  });
  
  // Lockhart - redirect to Orlando
  app.get("/locations/therapy-services-lockhart", (req, res) => {
    res.redirect(301, "/therapy-services-orlando");
  });
  app.get("/locations/therapy-services-lockhart/", (req, res) => {
    res.redirect(301, "/therapy-services-orlando");
  });
  app.get("/locations/psychiatry-lockhart", (req, res) => {
    res.redirect(301, "/locations/psychiatrist-orlando");
  });
  app.get("/locations/psychiatry-lockhart/", (req, res) => {
    res.redirect(301, "/locations/psychiatrist-orlando");
  });
  
  // Apopka - redirect to Orlando
  app.get("/locations/psychiatry-apopka", (req, res) => {
    res.redirect(301, "/locations/psychiatrist-orlando");
  });
  app.get("/locations/psychiatry-apopka/", (req, res) => {
    res.redirect(301, "/locations/psychiatrist-orlando");
  });
  
  // Maitland/Casselberry - redirect to existing pages
  app.get("/locations/therapy-services-maitland", (req, res) => {
    res.redirect(301, "/locations/psychiatrist-maitland");
  });
  app.get("/locations/therapy-services-maitland/", (req, res) => {
    res.redirect(301, "/locations/psychiatrist-maitland");
  });
  app.get("/locations/therapy-services-casselberry", (req, res) => {
    res.redirect(301, "/locations/psychiatrist-casselberry");
  });
  app.get("/locations/therapy-services-casselberry/", (req, res) => {
    res.redirect(301, "/locations/psychiatrist-casselberry");
  });
  app.get("/locations/psychiatry-maitland", (req, res) => {
    res.redirect(301, "/locations/psychiatrist-maitland");
  });
  app.get("/locations/psychiatry-maitland/", (req, res) => {
    res.redirect(301, "/locations/psychiatrist-maitland");
  });
  
  // Old WordPress category/service pages
  app.get("/therapy-approaches", (req, res) => {
    res.redirect(301, "/therapy");
  });
  app.get("/therapy-approaches/", (req, res) => {
    res.redirect(301, "/therapy");
  });
  
  app.get("/therapy/relationship-and-family", (req, res) => {
    res.redirect(301, "/couples-therapy");
  });
  app.get("/therapy/relationship-and-family/", (req, res) => {
    res.redirect(301, "/couples-therapy");
  });
  
  app.get("/treatments/conditions-we-treat", (req, res) => {
    res.redirect(301, "/conditions");
  });
  app.get("/treatments/conditions-we-treat/", (req, res) => {
    res.redirect(301, "/conditions");
  });
  
  app.get("/treatments/medical-services", (req, res) => {
    res.redirect(301, "/services");
  });
  app.get("/treatments/medical-services/", (req, res) => {
    res.redirect(301, "/services");
  });
  
  // WordPress utility pages - redirect to homepage or services
  app.get("/thank-you", (req, res) => {
    res.redirect(301, "/");
  });
  app.get("/thank-you/", (req, res) => {
    res.redirect(301, "/");
  });
  
  app.get("/terms-and-conditions", (req, res) => {
    res.redirect(301, "/services");
  });
  app.get("/terms-and-conditions/", (req, res) => {
    res.redirect(301, "/services");
  });
  
  app.get("/authorization-form", (req, res) => {
    res.redirect(301, "/services");
  });
  app.get("/authorization-form/", (req, res) => {
    res.redirect(301, "/services");
  });
  
  // Testimonial pages - redirect to homepage
  app.get("/testimonials/:slug", (req, res) => {
    res.redirect(301, "/");
  });
  app.get("/testimonials/:slug/", (req, res) => {
    res.redirect(301, "/");
  });
  
  // WordPress tag pages - redirect all to blog
  app.get("/tag/:tagslug", (req, res) => {
    res.redirect(301, "/blog");
  });
  app.get("/tag/:tagslug/", (req, res) => {
    res.redirect(301, "/blog");
  });
  
  // WordPress author pages - redirect all to blog
  app.get("/author/:authorslug", (req, res) => {
    res.redirect(301, "/blog");
  });
  app.get("/author/:authorslug/", (req, res) => {
    res.redirect(301, "/blog");
  });
  app.get("/author/:authorslug/feed", (req, res) => {
    res.redirect(301, "/blog");
  });
  app.get("/author/:authorslug/feed/", (req, res) => {
    res.redirect(301, "/blog");
  });
  
  // WordPress RSS feed URLs - redirect to blog or parent page
  app.get("/comments/feed", (req, res) => {
    res.redirect(301, "/blog");
  });
  app.get("/comments/feed/", (req, res) => {
    res.redirect(301, "/blog");
  });
  
  // Catch-all for any /feed/ URLs not already handled
  app.get("/tag/:tagslug/feed", (req, res) => {
    res.redirect(301, "/blog");
  });
  app.get("/tag/:tagslug/feed/", (req, res) => {
    res.redirect(301, "/blog");
  });
  
  // Blog post feed URLs - redirect to the blog post itself (remove /feed/ suffix)
  app.get("/blog/:slug/feed", (req, res) => {
    res.redirect(301, `/blog/${req.params.slug}`);
  });
  app.get("/blog/:slug/feed/", (req, res) => {
    res.redirect(301, `/blog/${req.params.slug}`);
  });
  
  // Legacy blog post feed URLs accessed without /blog/ prefix
  const legacyBlogPostFeeds = [
    'dbt-therapy-winter-park-emotional-regulation-skills',
    'when-anxiety-hurts-your-love-life-how-emdr-and-dbt-can-rebuild-confidence',
    'emdr-therapy-a-guide-to-healing-from-past-relationship-trauma',
    'it-service-providers-driving-healthcare-innovation-2025',
    'school-psychology-career-guide'
  ];
  
  legacyBlogPostFeeds.forEach(slug => {
    app.get(`/${slug}/feed`, (req, res) => {
      res.redirect(301, `/blog/${slug}`);
    });
    app.get(`/${slug}/feed/`, (req, res) => {
      res.redirect(301, `/blog/${slug}`);
    });
  });

  // Insurance provider slug fixes - remove duplicate naming
  const insuranceSlugRedirects = {
    'optum-optum-coverage': 'optum-coverage',
    'cigna-cigna-coverage': 'cigna-coverage',
    'adventhealth-adventhealth-coverage': 'adventhealth-coverage',
    'umr-umr-coverage': 'umr-coverage',
    'unitedhealthcare-unitedhealthcare-coverage': 'unitedhealthcare-coverage',
    'oscar-health-oscar-health-coverage': 'oscar-health-coverage'
  };
  
  Object.entries(insuranceSlugRedirects).forEach(([oldSlug, newSlug]) => {
    app.get(`/${oldSlug}`, (req, res) => {
      res.redirect(301, `/${newSlug}`);
    });
    app.get(`/${oldSlug}/`, (req, res) => {
      res.redirect(301, `/${newSlug}`);
    });
  });

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
      
      // Send email notification asynchronously ONLY for form submissions (not phone clicks)
      if (validated.formType !== 'phone_click') {
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
          console.error('❌ FAILED to send lead notification email:', error);
          if (error.response?.body) {
            console.error('SendGrid error details:', JSON.stringify(error.response.body, null, 2));
          }
          // Don't fail the request if email fails
        });
      } else {
        console.log(`📞 Phone click lead tracked: ${validated.phone || 'No phone'} from ${validated.source || 'Unknown source'}`);
      }
      
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

  // Resend email notification for a specific lead
  app.post("/api/leads/:id/resend-email", async (req, res) => {
    try {
      const leads = await storage.getAllLeads();
      const lead = leads.find(l => l.id === req.params.id);
      
      if (!lead) {
        return res.status(404).json({ error: "Lead not found" });
      }

      await sendLeadNotification({
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        phone: lead.phone,
        smsOptIn: lead.smsOptIn,
        service: lead.service,
        formType: lead.formType,
        conditions: lead.conditions,
        symptoms: lead.symptoms,
        medications: lead.medications,
        preferredDay: lead.preferredDay,
        paymentMethod: lead.paymentMethod,
        insuranceProvider: lead.insuranceProvider,
        insuredName: lead.insuredName,
        insuredDob: lead.insuredDob,
        memberId: lead.memberId,
      });

      console.log(`✅ Resent email notification for lead: ${lead.firstName} ${lead.lastName}`);
      res.json({ success: true, message: "Email notification resent successfully" });
    } catch (error: any) {
      console.error('❌ Failed to resend lead notification:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Blog post routes
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 15;
      const offset = parseInt(req.query.offset as string) || 0;
      const featured = req.query.featured === 'true';
      
      let blogPosts = await storage.getAllBlogPosts();
      
      // Filter by category if specified
      if (category && category !== 'All') {
        blogPosts = blogPosts.filter(post => post.category === category);
      }
      
      // Filter for featured posts if requested
      if (featured) {
        // Return only posts marked as featured
        blogPosts = blogPosts.filter(post => post.isFeatured === true);
        return res.json({ posts: blogPosts, total: blogPosts.length, page: 1, pageSize: blogPosts.length });
      }
      
      // Apply offset (useful for skipping featured posts in latest section)
      if (offset > 0) {
        blogPosts = blogPosts.slice(offset);
      }
      
      const total = blogPosts.length;
      const totalPages = Math.ceil(total / pageSize);
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedPosts = blogPosts.slice(startIndex, endIndex);
      
      res.json({
        posts: paginatedPosts,
        total,
        page,
        pageSize,
        totalPages
      });
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

  // Generate clickbait titles from keywords
  app.post("/api/generate-title", async (req, res) => {
    try {
      const { keywords, city } = req.body;

      if (!keywords) {
        return res.status(400).json({ error: "Keywords are required" });
      }

      console.log(`📝 Generating title for keywords: ${keywords}`);
      
      const title = await blogGeneratorService.generateTitle(keywords, city);

      res.json({
        success: true,
        title,
      });
    } catch (error: any) {
      console.error("❌ Title generation error:", error);
      res.status(500).json({ 
        error: error.message || "Title generation failed",
      });
    }
  });

  // Autonomous content analysis routes
  const contentAnalyzer = new ContentAnalyzerService(storage);

  // Get all content gaps (strategic blog opportunities)
  app.get("/api/content-gaps", async (_req, res) => {
    try {
      console.log("🔍 Analyzing content gaps...");
      const gaps = await contentAnalyzer.getContentGaps();
      
      res.json({
        success: true,
        gaps,
        count: gaps.length,
      });
    } catch (error: any) {
      console.error("❌ Content gap analysis error:", error);
      res.status(500).json({ 
        error: error.message || "Content gap analysis failed",
      });
    }
  });

  // Auto-suggest next strategic blog topic
  app.get("/api/suggest-topic", async (_req, res) => {
    try {
      console.log("🎯 Auto-suggesting strategic blog topic...");
      const suggestion = await contentAnalyzer.analyzeSiteAndSuggestTopic();
      
      res.json({
        success: true,
        suggestion,
      });
    } catch (error: any) {
      console.error("❌ Topic suggestion error:", error);
      res.status(500).json({ 
        error: error.message || "Topic suggestion failed",
      });
    }
  });

  // Auto-generate blog with suggested topic (fully autonomous)
  app.post("/api/auto-generate-blog", async (_req, res) => {
    try {
      console.log("🤖 Starting autonomous blog generation...");
      
      // Step 1: Analyze site and suggest best topic
      const suggestion = await contentAnalyzer.analyzeSiteAndSuggestTopic();
      console.log(`✨ Selected topic: "${suggestion.topic}"`);
      console.log(`   Keywords: ${suggestion.keywords}`);
      console.log(`   Reasoning: ${suggestion.reasoning}`);
      
      // Step 2: Generate blog with suggested topic
      const result = await blogGeneratorService.generateBlog({
        topic: suggestion.topic,
        keywords: suggestion.keywords,
        city: 'Orlando',
        imageStyle: 'professional mental health therapy',
      });

      // CRITICAL: Quality & HIPAA gate - reject low-quality or non-compliant blogs
      const MINIMUM_QUALITY_SCORE = 80;
      const validationResults = result.validationResults as any;
      const hasHIPAAViolation = validationResults?.noHIPAAViolations === false;
      const issues = validationResults?.issues || [];

      if (result.seoScore < MINIMUM_QUALITY_SCORE) {
        console.error(`❌ QUALITY GATE FAILED: Score ${result.seoScore}/100 is below minimum threshold of ${MINIMUM_QUALITY_SCORE}`);
        return res.status(400).json({
          success: false,
          error: `Blog quality too low (${result.seoScore}/100). Minimum required: ${MINIMUM_QUALITY_SCORE}/100`,
          seoScore: result.seoScore,
          issues,
          suggestion,
        });
      }

      if (hasHIPAAViolation) {
        console.error("❌ HIPAA GATE FAILED: Content contains patient identifiers");
        return res.status(400).json({
          success: false,
          error: "CRITICAL: Generated content contains HIPAA violations (patient identifiers). Generation aborted for compliance.",
          seoScore: result.seoScore,
          issues,
          suggestion,
        });
      }

      // Only return success if quality and compliance checks pass
      console.log(`✅ QUALITY GATE PASSED: Score ${result.seoScore}/100, HIPAA compliant`);

      res.json({
        success: true,
        data: result,
        suggestion,
        message: `Autonomous blog generated! Topic: "${suggestion.topic}" | SEO Score: ${result.seoScore}/100`,
      });
    } catch (error: any) {
      console.error("❌ Autonomous blog generation error:", error);
      res.status(500).json({ 
        error: error.message || "Autonomous blog generation failed",
        details: error instanceof Error ? error.stack : undefined
      });
    }
  });

  // ⚠️ EXPERIMENTAL: Progressive blog generation - NOT RECOMMENDED FOR PRODUCTION
  // Adds validation rules incrementally across 8 separate API calls, but produces poor quality
  // (typically 0-20/100 score vs 80+/100 from 3-stage generator) due to context loss.
  // Use /api/generate-blog instead for production-quality blogs.
  app.post("/api/generate-blog-progressive", async (req, res) => {
    try {
      const { topic, keywords, city, imageStyle } = req.body;

      if (!topic || !keywords) {
        return res.status(400).json({ error: "Topic and keywords are required" });
      }

      console.log(`⚠️ EXPERIMENTAL: PROGRESSIVE blog generation: ${topic}`);
      console.log(`   This is an experimental endpoint that typically produces low-quality output`);
      console.log(`   Recommend using /api/generate-blog instead`);
      
      const result = await blogGeneratorService.generateBlogProgressive({
        topic,
        keywords,
        city,
        imageStyle,
      });

      res.json(result);
    } catch (error: any) {
      console.error("❌ Progressive blog generation failed:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Blog generation with AI (follows all 32 best practices)
  app.post("/api/generate-blog", async (req, res) => {
    try {
      const { topic, keywords, city, imageStyle } = req.body;

      if (!topic || !keywords) {
        return res.status(400).json({ error: "Topic and keywords are required" });
      }

      console.log(`📝 Generating blog: ${topic}`);
      
      const result = await blogGeneratorService.generateBlog({
        topic,
        keywords,
        city,
        imageStyle,
      });

      res.json({
        success: true,
        data: result,
        message: `Blog generated successfully! SEO Score: ${result.seoScore}/100`,
      });
    } catch (error: any) {
      console.error("❌ Blog generation error:", error);
      res.status(500).json({ 
        error: error.message || "Blog generation failed",
        details: error instanceof Error ? error.stack : undefined
      });
    }
  });

  // Improve existing blog with user-provided instructions
  app.post("/api/improve-blog", async (req, res) => {
    try {
      const { currentBlog, improvementInstructions, keywords } = req.body;

      if (!currentBlog || !improvementInstructions) {
        return res.status(400).json({ error: "Current blog and improvement instructions are required" });
      }

      console.log(`🔧 Improving blog: ${currentBlog.title}`);
      console.log(`   Instructions: ${improvementInstructions.substring(0, 100)}...`);
      
      const result = await blogGeneratorService.improveBlog(
        currentBlog,
        improvementInstructions,
        keywords
      );

      res.json({
        success: true,
        data: result,
        message: `Blog improved! New SEO Score: ${result.seoScore}/100`,
      });
    } catch (error: any) {
      console.error("❌ Blog improvement error:", error);
      res.status(500).json({ 
        error: error.message || "Blog improvement failed",
        details: error instanceof Error ? error.stack : undefined
      });
    }
  });

  // Publish generated blog directly to CMS
  app.post("/api/publish-generated-blog", async (req, res) => {
    try {
      const blogData = req.body;

      // Create blog post with all the generated content
      // Mark new blogs as featured by default
      const blogPost = await storage.createBlogPost({
        title: blogData.title,
        slug: blogData.slug,
        excerpt: blogData.excerpt,
        content: blogData.content,
        author: "Empathy Health Clinic",
        publishedDate: new Date().toISOString(),
        category: "Mental Health",
        featuredImage: blogData.featuredImage,
        isFeatured: true, // Mark new blogs as featured
        metaTitle: blogData.title,
        metaDescription: blogData.metaDescription,
        keywords: blogData.keywords || [],
        order: 0,
      });

      // Update used images to associate them with this blog post
      // Images are already marked as used during generation, but now we link them to the post
      const allImageUrls = [
        blogData.featuredImage,
        ...(blogData.contentImages || []).map((img: any) => img.url)
      ].filter(Boolean);

      for (const imageUrl of allImageUrls) {
        await db.execute(sql`
          UPDATE used_blog_images 
          SET used_in_blog_post_id = ${blogPost.id}
          WHERE image_url = ${imageUrl}
        `);
      }

      res.json({
        success: true,
        blogPost,
        message: "Blog published successfully!",
      });
    } catch (error: any) {
      console.error("❌ Blog publishing error:", error);
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

  app.get("/api/analytics/forms", async (req, res) => {
    try {
      const timeRange = req.query.timeRange as string || 'today';
      const now = new Date();
      
      // Helper function to convert Date to PostgreSQL format (stored as text)
      const toPgFormat = (date: Date): string => {
        return date.toISOString()
          .replace('T', ' ')
          .replace('Z', '+00')
          .replace(/\.\d{3}/, (match) => match); // Keep milliseconds
      };
      
      // Calculate date filters based on time range  
      let startDate: string | undefined;
      let endDate: string | undefined;
      
      if (timeRange === 'today') {
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        startDate = toPgFormat(todayStart);
        endDate = toPgFormat(todayEnd);
      } else if (timeRange === '7d') {
        startDate = toPgFormat(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000));
      } else if (timeRange === '30d') {
        startDate = toPgFormat(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000));
      }
      // 'all' means no filter (undefined startDate)
      
      const metrics = await storage.getFormConversionMetrics(startDate, endDate);
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

  app.get("/api/analytics/dashboard", async (req, res) => {
    try {
      const timeRange = req.query.timeRange as string || 'all';
      const now = new Date();
      
      // Calculate date filters based on time range
      let startDate: string | undefined;
      if (timeRange === 'today') {
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        startDate = todayStart.toISOString();
      } else if (timeRange === '7d') {
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      } else if (timeRange === '30d') {
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
      }
      // 'all' means no filter (undefined startDate)

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
        storage.getPageViews(startDate),
        storage.getPageViews(last7Days),
        storage.getPageViews(last30Days),
        storage.getPageViewsByPath(startDate),
        storage.getEvents(undefined, startDate),
        storage.getEventCounts(startDate),
        storage.getAverageWebVitals(startDate),
        storage.getAllLeads()
      ]);

      // Filter leads by time range
      const filteredLeads = startDate 
        ? leads.filter(lead => new Date(lead.createdAt || '').toISOString() >= startDate!)
        : leads;

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
          totalLeads: filteredLeads.length,
          formSubmissions: filteredLeads.length, // Count actual leads, not analytics events
          phoneClicks: eventSummary.find(e => e.eventType === 'phone_click')?.count || 0,
          virtualVisitRequests: eventSummary.find(e => e.eventType === 'virtual_visit_click')?.count || 0
        }
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // UTM Analytics routes
  app.get("/api/analytics/utm/leads-by-source", async (_req, res) => {
    try {
      const data = await storage.getLeadsByUTMSource();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/analytics/utm/leads-by-campaign", async (_req, res) => {
    try {
      const data = await storage.getLeadsByUTMCampaign();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/analytics/utm/leads-by-term", async (_req, res) => {
    try {
      const data = await storage.getLeadsByUTMTerm();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/analytics/utm/leads-by-landing-page", async (_req, res) => {
    try {
      const data = await storage.getLeadsByLandingPage();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/analytics/utm/page-views-by-source", async (_req, res) => {
    try {
      const data = await storage.getPageViewsByUTMSource();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/analytics/utm/page-views-by-campaign", async (_req, res) => {
    try {
      const data = await storage.getPageViewsByUTMCampaign();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Google Ads API Routes
  app.get("/api/google-ads/status", async (_req, res) => {
    try {
      const hasBasicConfig = googleAdsService.hasBasicConfig();
      const isFullyConfigured = googleAdsService.isConfigured();
      
      res.json({
        hasBasicConfig,
        isFullyConfigured,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/google-ads/oauth-url", async (req, res) => {
    try {
      const redirectUri = req.query.redirectUri as string;
      if (!redirectUri) {
        return res.status(400).json({ error: 'redirectUri is required' });
      }

      // Generate state for CSRF protection
      const state = googleAdsService.generateOAuthState();
      const url = googleAdsService.getOAuthUrl(redirectUri, state);
      res.json({ url });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/google-ads/oauth-callback", async (req, res) => {
    try {
      const { code, redirectUri, state } = req.body;
      if (!code || !redirectUri) {
        return res.status(400).json({ error: 'code and redirectUri are required' });
      }

      // Validate state parameter for CSRF protection
      if (!state || !googleAdsService.validateOAuthState(state)) {
        return res.status(403).json({ error: 'Invalid or expired state parameter - possible CSRF attack' });
      }

      const tokens = await googleAdsService.exchangeCodeForToken(code, redirectUri);
      res.json(tokens);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/google-ads/test", async (_req, res) => {
    try {
      const result = await googleAdsService.testConnection();
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/google-ads/conversions", async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      
      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate and endDate are required' });
      }

      const conversions = await googleAdsService.getConversionData(
        startDate as string,
        endDate as string
      );
      
      res.json(conversions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/google-ads/campaigns", async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      
      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate and endDate are required' });
      }

      const campaigns = await googleAdsService.getCampaignPerformance(
        startDate as string,
        endDate as string
      );
      
      res.json(campaigns);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // SEO Routes - XML Sitemap
  app.get("/sitemap.xml", async (_req, res) => {
    try {
      const [treatments, therapies, conditions, insuranceProviders, blogPosts, locations, teamMembers] = await Promise.all([
        storage.getAllTreatments(),
        storage.getAllTherapies(),
        storage.getAllConditions(),
        storage.getAllInsuranceProviders(),
        storage.getAllBlogPosts(),
        storage.getAllLocations(),
        storage.getAllTeamMembers()
      ]);

      // Always use production domain for sitemap (required for Google Search Console)
      const baseUrl = "https://empathyhealthclinic.com";

      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

      // Homepage
      xml += `  <url>\n    <loc>${baseUrl}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;

      // Main pages
      const mainPages = ['/services', '/insurance', '/team', '/blog', '/therapy', '/new-patients', '/virtual-visit', '/request-appointment', '/psychotherapist-orlando'];
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

      // Team member pages
      teamMembers.forEach(member => {
        xml += `  <url>\n    <loc>${baseUrl}/team/${member.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
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
    // Always use production domain for robots.txt (required for Google Search Console)
    const baseUrl = "https://empathyhealthclinic.com";

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
