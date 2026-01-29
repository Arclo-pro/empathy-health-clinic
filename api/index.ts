import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from "@neondatabase/serverless";
import sgMail from '@sendgrid/mail';

function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not configured');
  }
  return neon(process.env.DATABASE_URL);
}

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const EMAIL_RECIPIENTS = ['providers@empathyhealthclinic.com', 'kevin.mease@gmail.com'];

// Fallback data when database is empty
const FALLBACK_TEAM_MEMBERS = [
  { id: "1", name: "Melissa DiPaolis", credentials: "MSN, APRN, FNP-BC", image: "/site-assets/providers/image_1761612547677.webp", doxyUrl: "https://doxy.me/empathy1", slug: "melissa-dipaolis", pageTitle: "Melissa DiPaolis, MSN, APRN, FNP-BC | Family Nurse Practitioner | Winter Park, FL", bio: "Melissa DiPaolis is a dedicated Family Nurse Practitioner with extensive experience in providing comprehensive mental health care.", specialties: "Depression, Anxiety, ADHD, Medication Management, Wellness Care", education: "Master of Science in Nursing (MSN), Board Certified Family Nurse Practitioner (FNP-BC)", approach: "Melissa believes in treating the whole person, not just symptoms.", order: 1 },
  { id: "2", name: "Marjorie Felix", credentials: "MSN, APRN, PMHNP-BC", image: "/site-assets/providers/image_1761613541242.webp", doxyUrl: "https://doxy.me/empathy1", slug: "marjorie-felix", pageTitle: "Marjorie Felix, MSN, APRN, PMHNP-BC | Psychiatric Nurse Practitioner | Winter Park, FL", bio: "Marjorie Felix is a board-certified Psychiatric Mental Health Nurse Practitioner with a passion for helping individuals achieve mental wellness.", specialties: "Depression, Anxiety, Bipolar Disorder, PTSD, Medication Management", education: "Master of Science in Nursing (MSN), Board Certified PMHNP-BC", approach: "Marjorie takes a holistic, patient-centered approach to mental health care.", order: 2 },
  { id: "3", name: "Marsha D. Hassell", credentials: "MS, PLMHC", image: "/site-assets/providers/image_1761613347362.webp", doxyUrl: "https://doxy.me/empathy1", slug: "marsha-hassell", pageTitle: "Marsha D. Hassell, MS, PLMHC | Licensed Mental Health Counselor | Winter Park, FL", bio: "Marsha D. Hassell is a Pre-Licensed Mental Health Counselor dedicated to providing compassionate, effective therapy.", specialties: "Individual Therapy, Anxiety, Depression, Life Transitions, CBT", education: "Master of Science in Mental Health Counseling (MS)", approach: "Marsha believes in creating a safe, non-judgmental therapeutic space.", order: 3 },
  { id: "4", name: "Alex Regan", credentials: "Psychiatric PA-C, Medical Director", image: "/site-assets/providers/image_1761612254512.webp", doxyUrl: "https://doxy.me/empathy1", slug: "alex-regan", pageTitle: "Alex Regan, PA-C, Medical Director | Psychiatric Physician Assistant | Winter Park, FL", bio: "Alex Regan is a skilled Psychiatric Physician Assistant and Medical Director.", specialties: "Depression, Anxiety, ADHD, Medication Management, Psychiatric Evaluation", education: "Physician Assistant Studies, Board Certified PA-C", approach: "Alex provides thorough psychiatric evaluations and evidence-based medication management.", order: 4 },
  { id: "5", name: "Dr. Robert Glenn", credentials: "MD, Supervising Physician", image: "/site-assets/providers/dr_glenn_headshot_square_1761613083513.webp", doxyUrl: "https://doxy.me/empathy1", slug: "dr-robert-glenn", pageTitle: "Dr. Robert Glenn, MD | Supervising Physician | Winter Park, FL", bio: "Dr. Robert Glenn is a compassionate physician with extensive experience helping individuals overcome mental health challenges.", specialties: "Medical Oversight, Individual Therapy, Depression, Anxiety, Trauma", education: "Doctor of Medicine (MD)", approach: "Dr. Glenn employs an integrative therapeutic approach.", order: 5 },
  { id: "6", name: "Karla McLeod", credentials: "Licensed Mental Health Counselor", image: "/site-assets/providers/carla_headshot_square_v2_1761619702991.webp", doxyUrl: "https://doxy.me/empathy1", slug: "karla-mcleod", pageTitle: "Karla McLeod, LMHC | Licensed Mental Health Counselor | Winter Park, FL", bio: "Karla McLeod is an experienced Licensed Mental Health Counselor.", specialties: "Individual Therapy, Anxiety, Depression, Self-Esteem, Life Transitions", education: "Master's degree in Mental Health Counseling, LMHC", approach: "Karla believes therapy should be a collaborative journey of self-discovery.", order: 7 },
  { id: "7", name: "Christine Orr", credentials: "LCSW", image: "/site-assets/providers/image_1761614480890.webp", doxyUrl: "https://doxy.me/empathy1", slug: "christine-orr", pageTitle: "Christine Orr, LCSW | Licensed Clinical Social Worker | Winter Park, FL", bio: "Christine Orr is a compassionate Licensed Clinical Social Worker.", specialties: "Individual Therapy, Depression, Anxiety, Grief and Loss, CBT", education: "Master of Social Work (MSW), LCSW", approach: "Christine provides a warm, supportive therapeutic environment.", order: 8 },
  { id: "8", name: "Monique Walen", credentials: "MSN, APRN, PMHNP-BC", image: "/site-assets/providers/image_1761603840896.webp", doxyUrl: "https://doxy.me/empathy1", slug: "monique-walen", pageTitle: "Monique Walen, MSN, APRN, PMHNP-BC | Psychiatric Nurse Practitioner | Winter Park, FL", bio: "Monique Walen is a board-certified Psychiatric Mental Health Nurse Practitioner.", specialties: "Medication Management, Depression, Anxiety, Bipolar Disorder, ADHD", education: "Master of Science in Nursing (MSN), PMHNP-BC", approach: "Monique provides comprehensive psychiatric evaluations and expert medication management.", order: 9 },
  { id: "9", name: "Batese Mitchell", credentials: "LMHC", image: "/site-assets/providers/Headshot (1)_1764630281211.jpg", doxyUrl: "https://doxy.me/empathy1", slug: "batese-mitchell", pageTitle: "Batese Mitchell, LMHC | Licensed Mental Health Counselor | Winter Park, FL", bio: "Batese Mitchell is a Licensed Mental Health Counselor dedicated to providing compassionate, evidence-based care.", specialties: "Individual Therapy, Anxiety, Depression and Mood Disorders, Emotional Regulation", education: "Master's Degree in Mental Health Counseling, LMHC", approach: "Batese uses a person-centered, strength-based approach.", order: 10 },
];

const FALLBACK_TESTIMONIALS = [
  { id: "1", name: "Chris B.", date: "October 10, 2025", text: "Marjorie spends more time and a more holistic approach to psychiatric care than any other practitioner I have worked with. She works with you to find the best personal treatment.", rating: 5, profileImage: null, order: 1 },
  { id: "2", name: "Cindy K.", date: "October 1, 2025", text: "Empathy Health Clinic is great! From Chantal in the office to the Medication Managers Tony & Monique, to the quality therapists, especially Christine Orr, I would highly recommend Empathy to anyone.", rating: 5, profileImage: null, order: 2 },
  { id: "3", name: "Louise", date: "September 3, 2025", text: "Excellent psych medical management. Depression and anxiety are so much more manageable, fewer episodes, finally sleeping through the night. Alex provides exceptional care.", rating: 5, profileImage: null, order: 3 },
];

interface EmailDeliveryResult {
  recipient: string;
  success: boolean;
  messageId?: string;
  error?: string;
  timestamp: string;
}

async function sendLeadEmail(lead: any): Promise<EmailDeliveryResult[]> {
  const results: EmailDeliveryResult[] = [];
  const timestamp = new Date().toISOString();

  const sendGridKey = process.env.SENDGRID_API_KEY;
  if (!sendGridKey) {
    console.error(`[${timestamp}] ❌ SENDGRID_API_KEY not configured - email notifications disabled`);
    console.error(`[${timestamp}] ❌ Available env vars: ${Object.keys(process.env).filter(k => k.includes('SEND') || k.includes('GRID') || k.includes('EMAIL')).join(', ') || 'none matching'}`);
    throw new Error('SendGrid not configured - please add SENDGRID_API_KEY environment variable in Vercel');
  }

  // Validate API key format (should start with SG.)
  if (!sendGridKey.startsWith('SG.')) {
    console.error(`[${timestamp}] ❌ SENDGRID_API_KEY appears malformed - should start with "SG."`);
    throw new Error('SendGrid API key appears invalid - should start with "SG."');
  }

  console.log(`[${timestamp}] ✅ SendGrid API key found (length: ${sendGridKey.length}, prefix: SG.***)`);

  // Re-initialize SendGrid with the key to ensure it's set
  sgMail.setApiKey(sendGridKey);

  const fullName = `${lead.first_name} ${lead.last_name}`.trim();
  console.log(`[${timestamp}] 📧 Starting email delivery for lead: ${fullName} (${lead.email})`);
  console.log(`[${timestamp}] 📧 Recipients: ${EMAIL_RECIPIENTS.join(', ')}`);

  // Plain text version for better deliverability
  const textContent = `
New Appointment Request - Empathy Health Clinic

Patient Information:
- Name: ${fullName}
- Email: ${lead.email}
- Phone: ${lead.phone || 'Not provided'}
- Service Requested: ${lead.service || 'General Inquiry'}
- Form Type: ${lead.form_type || 'short'}
- Landing Page: ${lead.landing_page || 'Direct'}
- Source: ${lead.source || 'Website'}
${lead.utm_source ? `- UTM Source: ${lead.utm_source}` : ''}
${lead.utm_campaign ? `- Campaign: ${lead.utm_campaign}` : ''}
${lead.utm_term ? `- Keyword: ${lead.utm_term}` : ''}

Please follow up with this lead promptly.

--
Empathy Health Clinic
www.empathyhealthclinic.com
  `.trim();

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">New Appointment Request</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold;">Name:</td><td style="padding: 8px 0;">${fullName}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${lead.phone}">${lead.phone || 'Not provided'}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Service:</td><td style="padding: 8px 0;">${lead.service || 'General Inquiry'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Form Type:</td><td style="padding: 8px 0;">${lead.form_type || 'short'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Landing Page:</td><td style="padding: 8px 0;">${lead.landing_page || 'Direct'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Source:</td><td style="padding: 8px 0;">${lead.source || 'Website'}</td></tr>
          ${lead.utm_source ? `<tr><td style="padding: 8px 0; font-weight: bold;">UTM Source:</td><td style="padding: 8px 0;">${lead.utm_source}</td></tr>` : ''}
          ${lead.utm_campaign ? `<tr><td style="padding: 8px 0; font-weight: bold;">Campaign:</td><td style="padding: 8px 0;">${lead.utm_campaign}</td></tr>` : ''}
          ${lead.utm_term ? `<tr><td style="padding: 8px 0; font-weight: bold;">Keyword:</td><td style="padding: 8px 0;">${lead.utm_term}</td></tr>` : ''}
        </table>
        <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
          Please follow up with this lead promptly.
        </p>
        <p style="color: #999; font-size: 12px;">
          Empathy Health Clinic | <a href="https://www.empathyhealthclinic.com">www.empathyhealthclinic.com</a>
        </p>
      </div>
    </body>
    </html>
  `;

  // Send to each recipient separately for individual tracking
  for (const recipient of EMAIL_RECIPIENTS) {
    const sendTimestamp = new Date().toISOString();
    console.log(`[${sendTimestamp}] 📤 Attempting to send email to: ${recipient}`);

    const msg = {
      to: recipient,
      from: {
        email: 'noreply@empathyhealthclinic.com',
        name: 'Empathy Health Clinic'
      },
      replyTo: lead.email,
      subject: `New Appointment Request from ${fullName}`,
      text: textContent,
      html: htmlContent
    };

    try {
      const response = await sgMail.send(msg);
      const messageId = response[0]?.headers?.['x-message-id'] || 'unknown';
      const statusCode = response[0]?.statusCode || 'unknown';

      console.log(`[${sendTimestamp}] ✅ SUCCESS: Email sent to ${recipient}`);
      console.log(`[${sendTimestamp}]    - Status Code: ${statusCode}`);
      console.log(`[${sendTimestamp}]    - Message ID: ${messageId}`);

      results.push({
        recipient,
        success: true,
        messageId,
        timestamp: sendTimestamp
      });
    } catch (error: any) {
      const errorMessage = error?.message || 'Unknown error';
      const errorCode = error?.code || 'unknown';
      const errorResponse = error?.response?.body ? JSON.stringify(error.response.body) : 'No response body';

      console.error(`[${sendTimestamp}] ❌ FAILED: Email to ${recipient}`);
      console.error(`[${sendTimestamp}]    - Error: ${errorMessage}`);
      console.error(`[${sendTimestamp}]    - Code: ${errorCode}`);
      console.error(`[${sendTimestamp}]    - Response: ${errorResponse}`);

      results.push({
        recipient,
        success: false,
        error: `${errorCode}: ${errorMessage}`,
        timestamp: sendTimestamp
      });
    }
  }

  // Log summary
  const successCount = results.filter(r => r.success).length;
  const failCount = results.filter(r => !r.success).length;
  console.log(`[${timestamp}] 📊 Email delivery summary: ${successCount} succeeded, ${failCount} failed`);
  results.forEach(r => {
    console.log(`[${timestamp}]    - ${r.recipient}: ${r.success ? '✅ Sent' : '❌ Failed'} ${r.messageId || r.error || ''}`);
  });

  // Only throw if ALL emails failed
  if (successCount === 0) {
    throw new Error(`All email deliveries failed: ${results.map(r => `${r.recipient}: ${r.error}`).join('; ')}`);
  }

  return results;
}

// ============================================================
// SEO file handlers (robots.txt, sitemap.xml, etc.)
// These MUST be served by the serverless function because
// Vercel's catch-all route sends everything to index.html (SPA).
// Without these handlers, Google receives HTML instead of
// robots.txt/sitemap XML, causing complete de-indexing.
// ============================================================

function generateRobotsTxt(): string {
  const baseUrl = "https://www.empathyhealthclinic.com";
  return `# Empathy Health Clinic - robots.txt

User-agent: *
Allow: /

# Disallow admin and utility pages
Disallow: /admin/
Disallow: /login
Disallow: /auth/
Disallow: /config/
Disallow: /debug/
Disallow: /examples/
Disallow: /test/

# Disallow search and filter pages (crawl waste)
Disallow: /search
Disallow: /*?search=
Disallow: /*?q=

# Allow blog pagination (for rel=prev/next SEO)
Allow: /blog?page=

# Disallow other pagination (crawl waste on non-blog pages)
Disallow: /*?page=
Disallow: /*?tag=
Disallow: /*?category=

# Disallow API endpoints
Disallow: /api/

# Disallow legacy WordPress paths
Disallow: /wp-*
Disallow: /wp-admin/
Disallow: /wp-content/
Disallow: /wp-includes/

# Disallow attachment and media pages (WordPress legacy)
Disallow: /attachment/
Disallow: /uploads/
Disallow: /media/

# Disallow UTM and tracking parameters
Disallow: /*?utm_*
Disallow: /*?fbclid=
Disallow: /*?gclid=
Disallow: /*?ref=
Disallow: /*?source=

# Allow AI crawlers for AI Search visibility
User-agent: Google-Extended
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: GPTBot
Allow: /

User-agent: CCBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Anthropic-AI
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap_index.xml
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/image-sitemap.xml

# AI Crawler Resources (LLMs.txt standard)
# https://llmstxt.org/
LLM: ${baseUrl}/llms.txt
LLM-Full: ${baseUrl}/llms-full.txt
`;
}

function generateSitemapIndex(): string {
  const baseUrl = "https://www.empathyhealthclinic.com";
  const today = new Date().toISOString().split('T')[0];
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/image-sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;
}

async function generateSitemapXml(sql: ReturnType<typeof neon>): Promise<string> {
  const baseUrl = "https://www.empathyhealthclinic.com";
  const today = new Date().toISOString().split('T')[0];
  const addedUrls = new Set<string>();

  const NOINDEX_PATHS = [
    '/admin', '/login', '/auth', '/config', '/debug',
    '/examples', '/test', '/preview',
    '/privacy', '/terms', '/disclaimer',
    '/thank-you', '/confirmed', '/appointment-confirmed',
    '/404', '/500', '/error',
    '/search', '/filter',
    '/api', '/attachment', '/uploads', '/media',
    '/wp-includes', '/wp-content', '/wp-admin',
  ];

  const CANONICAL_CONSOLIDATION_PATHS: Record<string, string> = {
    '/psychiatry-orlando': '/psychiatrist-orlando',
    '/psychiatry-clinic-orlando': '/psychiatrist-orlando',
  };

  const shouldInclude = (path: string): boolean => {
    const normalized = path.toLowerCase().replace(/\/+$/, '');
    if (NOINDEX_PATHS.some(p => normalized.startsWith(p))) return false;
    if (normalized in CANONICAL_CONSOLIDATION_PATHS) return false;
    if (normalized.includes('page=')) return false;
    if (normalized.includes('?')) return false;
    if (normalized.includes('attachment')) return false;
    if (normalized.includes('wp-')) return false;
    return true;
  };

  const escapeXml = (text: string): string => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  const addUrl = (path: string, changefreq: string, priority: number, lastmod?: string): string => {
    const fullUrl = `${baseUrl}${path}`;
    if (addedUrls.has(fullUrl)) return '';
    if (!shouldInclude(path)) return '';
    addedUrls.add(fullUrl);

    let xml = `  <url>\n`;
    xml += `    <loc>${escapeXml(fullUrl)}</loc>\n`;
    if (lastmod) {
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
    }
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority.toFixed(1)}</priority>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="en-us" href="${escapeXml(fullUrl)}" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(fullUrl)}" />\n`;
    xml += `  </url>\n`;
    return xml;
  };

  const PAGE_LASTMOD: Record<string, string> = {
    '/': today,
    '/services': '2025-11-15',
    '/psychiatrist-orlando': '2025-11-20',
    '/therapist-orlando': '2025-11-18',
    '/team': '2025-11-25',
    '/insurance': '2025-11-10',
    '/blog': today,
    '/new-patients': '2025-11-01',
    '/virtual-therapy': '2025-11-12',
    '/request-appointment': '2025-11-05',
    '/therapy': '2025-11-08',
    '/psychotherapist-orlando': '2025-11-15',
    '/couples-counseling': '2025-10-20',
    '/counselor-near-me': '2025-10-25',
    '/mental-health-near-me': '2025-10-25',
    '/therapy-near-me': '2025-10-25',
    '/psychiatrist-near-me': '2025-11-22',
    '/counseling-orlando': '2025-10-15',
    '/adhd-psychiatrist-orlando': '2025-11-18',
    '/anxiety-psychiatrist-orlando': '2025-11-18',
    '/depression-psychiatrist-orlando': '2025-11-18',
    '/bipolar-psychiatrist-orlando': '2025-11-18',
    '/telepsychiatry-orlando': '2025-11-18',
    '/same-day-psychiatrist-orlando': '2025-11-18',
    '/medication-management-orlando': '2025-11-18',
    '/ptsd-psychiatrist-orlando': '2025-11-28',
    '/urgent-psychiatric-care-orlando': '2025-11-28',
    '/psychiatrist-orlando-accepts-umr': '2025-11-28',
    '/anxiety-therapy': '2025-10-10',
    '/depression-counseling': '2025-10-10',
    '/cognitive-behavioral-therapy': '2025-09-15',
    '/emdr-therapy': '2025-09-20',
    '/tms-treatment': '2025-11-01',
    '/adhd-testing-orlando': '2025-11-15',
    '/depression-treatment': '2025-10-05',
    '/psychiatric-services': '2025-10-01',
    '/psychiatrist-winter-park': '2025-10-20',
    '/therapy-oviedo': '2025-09-01',
    '/therapist-maitland': '2025-09-01',
    '/providers': today,
    '/providers/orlando': today,
    '/what-we-treat': today,
    '/what-we-treat/adhd': today,
    '/what-we-treat/anxiety': today,
    '/what-we-treat/depression': today,
    '/what-we-treat/bipolar-disorder': today,
    '/what-we-treat/ptsd': today,
    '/what-we-treat/ocd': today,
    '/psychiatrist-lake-nona': today,
    '/psychiatrist-winter-garden': today,
    '/psychiatrist-casselberry': today,
    '/psychiatrist-longwood': today,
    '/psychiatrist-downtown-orlando': today,
    '/telehealth': today,
    '/adult-adhd-treatment-orlando': today,
    '/suboxone-treatment-orlando': today,
    '/medicaid-psychiatrist-orlando': today,
  };

  const staticPages = [
    { path: '/services', changefreq: 'weekly', priority: 0.9 },
    { path: '/psychiatrist-orlando', changefreq: 'weekly', priority: 0.95 },
    { path: '/therapist-orlando', changefreq: 'weekly', priority: 0.85 },
    { path: '/team', changefreq: 'weekly', priority: 0.85 },
    { path: '/insurance', changefreq: 'weekly', priority: 0.8 },
    { path: '/blog', changefreq: 'daily', priority: 0.8 },
    { path: '/new-patients', changefreq: 'weekly', priority: 0.8 },
    { path: '/virtual-therapy', changefreq: 'weekly', priority: 0.8 },
    { path: '/request-appointment', changefreq: 'weekly', priority: 0.85 },
    { path: '/therapy', changefreq: 'weekly', priority: 0.8 },
    { path: '/psychotherapist-orlando', changefreq: 'weekly', priority: 0.8 },
    { path: '/couples-counseling', changefreq: 'weekly', priority: 0.75 },
    { path: '/counselor-near-me', changefreq: 'weekly', priority: 0.75 },
    { path: '/mental-health-near-me', changefreq: 'weekly', priority: 0.75 },
    { path: '/therapy-near-me', changefreq: 'weekly', priority: 0.75 },
    { path: '/psychiatrist-near-me', changefreq: 'weekly', priority: 0.9 },
    { path: '/counseling-orlando', changefreq: 'weekly', priority: 0.75 },
    { path: '/adhd-psychiatrist-orlando', changefreq: 'weekly', priority: 0.85 },
    { path: '/anxiety-psychiatrist-orlando', changefreq: 'weekly', priority: 0.85 },
    { path: '/depression-psychiatrist-orlando', changefreq: 'weekly', priority: 0.85 },
    { path: '/bipolar-psychiatrist-orlando', changefreq: 'weekly', priority: 0.85 },
    { path: '/telepsychiatry-orlando', changefreq: 'weekly', priority: 0.85 },
    { path: '/same-day-psychiatrist-orlando', changefreq: 'weekly', priority: 0.85 },
    { path: '/medication-management-orlando', changefreq: 'weekly', priority: 0.8 },
    { path: '/ptsd-psychiatrist-orlando', changefreq: 'weekly', priority: 0.85 },
    { path: '/urgent-psychiatric-care-orlando', changefreq: 'weekly', priority: 0.85 },
    { path: '/psychiatrist-orlando-accepts-umr', changefreq: 'weekly', priority: 0.8 },
    { path: '/anxiety-therapy', changefreq: 'weekly', priority: 0.8 },
    { path: '/depression-counseling', changefreq: 'weekly', priority: 0.8 },
    { path: '/cognitive-behavioral-therapy', changefreq: 'monthly', priority: 0.75 },
    { path: '/emdr-therapy', changefreq: 'monthly', priority: 0.8 },
    { path: '/tms-treatment', changefreq: 'monthly', priority: 0.8 },
    { path: '/adhd-testing-orlando', changefreq: 'weekly', priority: 0.85 },
    { path: '/depression-treatment', changefreq: 'weekly', priority: 0.8 },
    { path: '/psychiatric-services', changefreq: 'weekly', priority: 0.8 },
    { path: '/psychiatrist-winter-park', changefreq: 'weekly', priority: 0.8 },
    { path: '/therapy-oviedo', changefreq: 'monthly', priority: 0.7 },
    { path: '/therapist-maitland', changefreq: 'monthly', priority: 0.7 },
    { path: '/providers', changefreq: 'weekly', priority: 0.85 },
    { path: '/providers/orlando', changefreq: 'weekly', priority: 0.85 },
    { path: '/what-we-treat', changefreq: 'weekly', priority: 0.9 },
    { path: '/what-we-treat/adhd', changefreq: 'weekly', priority: 0.85 },
    { path: '/what-we-treat/anxiety', changefreq: 'weekly', priority: 0.85 },
    { path: '/what-we-treat/depression', changefreq: 'weekly', priority: 0.85 },
    { path: '/what-we-treat/bipolar-disorder', changefreq: 'weekly', priority: 0.85 },
    { path: '/what-we-treat/ptsd', changefreq: 'weekly', priority: 0.85 },
    { path: '/what-we-treat/ocd', changefreq: 'weekly', priority: 0.85 },
    { path: '/psychiatrist-lake-nona', changefreq: 'weekly', priority: 0.8 },
    { path: '/psychiatrist-winter-garden', changefreq: 'weekly', priority: 0.8 },
    { path: '/psychiatrist-casselberry', changefreq: 'weekly', priority: 0.8 },
    { path: '/psychiatrist-longwood', changefreq: 'weekly', priority: 0.8 },
    { path: '/psychiatrist-downtown-orlando', changefreq: 'weekly', priority: 0.85 },
    { path: '/telehealth', changefreq: 'weekly', priority: 0.85 },
    { path: '/adult-adhd-treatment-orlando', changefreq: 'weekly', priority: 0.85 },
    { path: '/suboxone-treatment-orlando', changefreq: 'weekly', priority: 0.8 },
    { path: '/medicaid-psychiatrist-orlando', changefreq: 'weekly', priority: 0.8 },
  ];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  xml += addUrl('/', 'daily', 1.0, today);

  staticPages.forEach(page => {
    xml += addUrl(page.path, page.changefreq, page.priority, PAGE_LASTMOD[page.path] || today);
  });

  // Dynamic content from database
  try {
    const [treatments, therapies, conditions, insuranceProviders, blogPosts, locations, teamMembers] = await Promise.all([
      sql`SELECT slug FROM treatments ORDER BY "order"`,
      sql`SELECT slug FROM therapies ORDER BY "order"`,
      sql`SELECT slug FROM conditions ORDER BY "order"`,
      sql`SELECT slug FROM insurance_providers ORDER BY "order"`,
      sql`SELECT slug, published_at, updated_at FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC`,
      sql`SELECT slug FROM locations ORDER BY title`,
      sql`SELECT slug FROM team_members ORDER BY "order", name`,
    ]);

    treatments.forEach((t: any) => { xml += addUrl(`/${t.slug}`, 'monthly', 0.7, today); });
    therapies.forEach((t: any) => { xml += addUrl(`/${t.slug}`, 'monthly', 0.7, today); });
    conditions.forEach((c: any) => { xml += addUrl(`/${c.slug}`, 'monthly', 0.7, today); });
    insuranceProviders.forEach((p: any) => { xml += addUrl(`/${p.slug}`, 'monthly', 0.6, today); });
    blogPosts.forEach((post: any) => {
      const lastMod = post.updated_at || post.published_at;
      const lastModStr = lastMod ? new Date(lastMod).toISOString().split('T')[0] : today;
      xml += addUrl(`/blog/${post.slug}`, 'weekly', 0.5, lastModStr);
    });
    locations.forEach((l: any) => { xml += addUrl(`/locations/${l.slug}`, 'monthly', 0.7, today); });
    teamMembers.forEach((m: any) => { xml += addUrl(`/team/${m.slug}`, 'monthly', 0.7, today); });
  } catch (dbError) {
    console.error('Sitemap: Database query failed, serving static pages only:', dbError);
  }

  xml += '</urlset>';
  return xml;
}

async function generateImageSitemap(sql: ReturnType<typeof neon>): Promise<string> {
  const baseUrl = "https://www.empathyhealthclinic.com";

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

  try {
    const teamMembers = await sql`SELECT name, slug, image FROM team_members WHERE image IS NOT NULL ORDER BY "order", name`;
    teamMembers.forEach((member: any) => {
      if (member.image) {
        const imageUrl = member.image.startsWith('http') ? member.image : `${baseUrl}${member.image}`;
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/team/${member.slug}</loc>\n`;
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${imageUrl}</image:loc>\n`;
        xml += `      <image:title>${member.name} - Empathy Health Clinic</image:title>\n`;
        xml += `    </image:image>\n`;
        xml += `  </url>\n`;
      }
    });
  } catch (dbError) {
    console.error('Image sitemap: Database query failed:', dbError);
  }

  xml += '</urlset>';
  return xml;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { url, method } = req;
  const path = url?.split('?')[0] || '';

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // ---- SEO files (routed here via vercel.json) ----
    if (path === '/robots.txt') {
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      return res.status(200).send(generateRobotsTxt());
    }

    if (path === '/sitemap_index.xml') {
      res.setHeader('Content-Type', 'application/xml');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      return res.status(200).send(generateSitemapIndex());
    }

    if (path === '/sitemap.xml') {
      const sql = getDb();
      const xml = await generateSitemapXml(sql);
      res.setHeader('Content-Type', 'application/xml');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      return res.status(200).send(xml);
    }

    if (path === '/image-sitemap.xml') {
      const sql = getDb();
      const xml = await generateImageSitemap(sql);
      res.setHeader('Content-Type', 'application/xml');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      return res.status(200).send(xml);
    }

    // ---- API routes ----
    if (path === '/api/health') {
      return res.status(200).json({
        ok: true,
        ts: Date.now(),
        hasDb: !!process.env.DATABASE_URL,
        hasSendGrid: !!process.env.SENDGRID_API_KEY,
        sendGridKeyLength: process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY.length : 0
      });
    }

    const sql = getDb();

    if (path === '/api/treatments') {
      const result = await sql`SELECT * FROM treatments ORDER BY "order"`;
      return res.status(200).json(result);
    }

    if (path === '/api/therapies') {
      const result = await sql`SELECT * FROM therapies ORDER BY "order"`;
      return res.status(200).json(result);
    }

    if (path === '/api/team-members') {
      const result = await sql`SELECT * FROM team_members ORDER BY "order", name`;
      // Use fallback data if database is empty
      if (result.length === 0) {
        return res.status(200).json(FALLBACK_TEAM_MEMBERS);
      }
      return res.status(200).json(result);
    }

    if (path.startsWith('/api/team-members/')) {
      const id = path.replace('/api/team-members/', '');
      const result = await sql`SELECT * FROM team_members WHERE id = ${id} OR slug = ${id} LIMIT 1`;
      if (result.length === 0) {
        // Try fallback data
        const fallbackMember = FALLBACK_TEAM_MEMBERS.find(m => m.id === id || m.slug === id);
        if (fallbackMember) {
          return res.status(200).json(fallbackMember);
        }
        return res.status(404).json({ error: "Team member not found" });
      }
      return res.status(200).json(result[0]);
    }

    if (path === '/api/blog-posts') {
      const urlObj = new URL(url || '', `http://${req.headers.host}`);
      const page = parseInt(urlObj.searchParams.get('page') || '1');
      const pageSize = parseInt(urlObj.searchParams.get('pageSize') || '12');
      const category = urlObj.searchParams.get('category');
      const offset = (page - 1) * pageSize;
      
      let posts;
      let totalCount;
      
      if (category) {
        posts = await sql`SELECT * FROM blog_posts WHERE status = 'published' AND category = ${category} ORDER BY published_at DESC LIMIT ${pageSize} OFFSET ${offset}`;
        const countResult = await sql`SELECT COUNT(*) FROM blog_posts WHERE status = 'published' AND category = ${category}`;
        totalCount = parseInt(countResult[0].count);
      } else {
        posts = await sql`SELECT * FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC LIMIT ${pageSize} OFFSET ${offset}`;
        const countResult = await sql`SELECT COUNT(*) FROM blog_posts WHERE status = 'published'`;
        totalCount = parseInt(countResult[0].count);
      }
      
      const totalPages = Math.ceil(totalCount / pageSize);
      const transformedPosts = posts.map((post: any) => ({
        ...post,
        publishedDate: post.published_date,
        featuredImage: post.featured_image,
        isFeatured: post.is_featured,
        metaTitle: post.meta_title,
        metaDescription: post.meta_description,
        canonicalSlug: post.canonical_slug,
        ogImage: post.og_image
      }));
      return res.status(200).json({ posts: transformedPosts, totalPages, total: totalCount, page, pageSize });
    }

    if (path.startsWith('/api/blog-posts/slug/')) {
      const slug = path.replace('/api/blog-posts/slug/', '');
      const result = await sql`SELECT * FROM blog_posts WHERE slug = ${slug} LIMIT 1`;
      if (result.length === 0) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      const dbPost = result[0];
      const post = {
        ...dbPost,
        publishedDate: dbPost.published_date,
        featuredImage: dbPost.featured_image,
        isFeatured: dbPost.is_featured,
        metaTitle: dbPost.meta_title,
        metaDescription: dbPost.meta_description,
        canonicalSlug: dbPost.canonical_slug,
        ogImage: dbPost.og_image
      };
      return res.status(200).json({ post });
    }

    if (path.startsWith('/api/blog-posts/')) {
      const slug = path.replace('/api/blog-posts/', '');
      const result = await sql`SELECT * FROM blog_posts WHERE slug = ${slug} LIMIT 1`;
      if (result.length === 0) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      const dbPost = result[0];
      const post = {
        ...dbPost,
        publishedDate: dbPost.published_date,
        featuredImage: dbPost.featured_image,
        isFeatured: dbPost.is_featured,
        metaTitle: dbPost.meta_title,
        metaDescription: dbPost.meta_description,
        canonicalSlug: dbPost.canonical_slug,
        ogImage: dbPost.og_image
      };
      return res.status(200).json({ post });
    }

    if (path === '/api/conditions') {
      const result = await sql`SELECT * FROM conditions ORDER BY "order"`;
      return res.status(200).json(result);
    }

    if (path === '/api/insurance-providers') {
      const result = await sql`SELECT * FROM insurance_providers ORDER BY "order"`;

      // Normalize logo paths to ensure they point to correct location
      const logoMap: Record<string, string> = {
        'blue cross blue shield': '/site-assets/logos/bluecross.webp',
        'aetna': '/site-assets/logos/aetna.webp',
        'optum': '/site-assets/logos/optum.webp',
        'cigna': '/site-assets/logos/cigna.webp',
        'adventhealth': '/site-assets/logos/adventhealth.webp',
        'umr': '/site-assets/logos/umr.webp',
        'unitedhealthcare': '/site-assets/logos/unitedhealthcare.webp',
        'oscar health': '/site-assets/logos/oscar.webp',
        'oscar': '/site-assets/logos/oscar.webp',
        'first health': '/site-assets/logos/firsthealth.jpg',
        'medicare': '/site-assets/logos/medicare.webp',
      };

      const normalizedProviders = result.map((provider: any) => {
        const nameLower = provider.name?.toLowerCase() || '';
        const mappedLogo = logoMap[nameLower];

        // Use mapped logo if available, otherwise keep original
        return {
          ...provider,
          logo: mappedLogo || provider.logo
        };
      });

      return res.status(200).json(normalizedProviders);
    }

    if (path === '/api/locations') {
      const result = await sql`SELECT * FROM locations ORDER BY title`;
      return res.status(200).json(result);
    }

    if (path === '/api/testimonials') {
      const result = await sql`SELECT * FROM testimonials ORDER BY "order"`;
      // Use fallback data if database is empty
      if (result.length === 0) {
        return res.status(200).json(FALLBACK_TESTIMONIALS);
      }
      return res.status(200).json(result);
    }

    if (path === '/api/site-content') {
      const result = await sql`SELECT * FROM site_content LIMIT 1`;
      return res.status(200).json(result[0] || {});
    }

    // Test email endpoint for debugging
    if (path === '/api/test-email' && method === 'POST') {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] 🧪 Test email endpoint called`);

      const sendGridKey = process.env.SENDGRID_API_KEY;

      // Diagnostic info
      const diagnostics = {
        hasSendGridKey: !!sendGridKey,
        keyLength: sendGridKey?.length || 0,
        keyPrefix: sendGridKey?.substring(0, 3) || 'N/A',
        keyValid: sendGridKey?.startsWith('SG.') || false,
        recipients: EMAIL_RECIPIENTS,
        fromEmail: 'noreply@empathyhealthclinic.com',
        timestamp
      };

      if (!sendGridKey) {
        return res.status(400).json({
          success: false,
          error: 'SENDGRID_API_KEY not configured',
          diagnostics
        });
      }

      if (!sendGridKey.startsWith('SG.')) {
        return res.status(400).json({
          success: false,
          error: 'SENDGRID_API_KEY is malformed (should start with SG.)',
          diagnostics
        });
      }

      // Initialize SendGrid
      sgMail.setApiKey(sendGridKey);

      // Send test email to kevin.mease@gmail.com only
      const testRecipient = 'kevin.mease@gmail.com';
      const msg = {
        to: testRecipient,
        from: {
          email: 'noreply@empathyhealthclinic.com',
          name: 'Empathy Health Clinic'
        },
        subject: `[TEST] Email Configuration Test - ${timestamp}`,
        text: `This is a test email sent at ${timestamp} to verify email delivery is working.`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #2563eb;">Email Configuration Test</h2>
            <p>This is a test email sent at <strong>${timestamp}</strong> to verify email delivery is working.</p>
            <p>If you received this email, your SendGrid configuration is correct!</p>
            <hr style="margin: 20px 0;">
            <p style="color: #666; font-size: 12px;">Sent from Empathy Health Clinic Vercel deployment</p>
          </div>
        `
      };

      try {
        console.log(`[${timestamp}] 📤 Sending test email to ${testRecipient}...`);
        const response = await sgMail.send(msg);
        const statusCode = response[0]?.statusCode;
        const messageId = response[0]?.headers?.['x-message-id'];

        console.log(`[${timestamp}] ✅ Test email sent successfully!`);
        console.log(`[${timestamp}]    Status: ${statusCode}`);
        console.log(`[${timestamp}]    Message ID: ${messageId}`);

        return res.status(200).json({
          success: true,
          message: 'Test email sent successfully!',
          details: {
            recipient: testRecipient,
            statusCode,
            messageId,
            timestamp
          },
          diagnostics
        });
      } catch (error: any) {
        const errorMessage = error?.message || 'Unknown error';
        const errorCode = error?.code || 'unknown';
        const sendGridErrors = error?.response?.body?.errors || [];

        console.error(`[${timestamp}] ❌ Test email FAILED`);
        console.error(`[${timestamp}]    Error: ${errorMessage}`);
        console.error(`[${timestamp}]    Code: ${errorCode}`);
        if (error?.response?.body) {
          console.error(`[${timestamp}]    SendGrid Response:`, JSON.stringify(error.response.body));
        }

        return res.status(500).json({
          success: false,
          error: errorMessage,
          errorCode,
          sendGridErrors,
          fullError: error?.response?.body || null,
          diagnostics,
          troubleshooting: [
            'Check that your SendGrid API key has "Mail Send" permissions',
            'Verify that noreply@empathyhealthclinic.com is verified as a sender in SendGrid',
            'Check if your domain empathyhealthclinic.com is authenticated in SendGrid',
            'Ensure your SendGrid account is not suspended or restricted'
          ]
        });
      }
    }

    if (path === '/api/leads' && method === 'POST') {
      const body = req.body;
      
      if (!body.email) {
        return res.status(400).json({ error: "Email is required" });
      }
      if (!body.firstName) {
        return res.status(400).json({ error: "First name is required" });
      }
      if (!body.lastName) {
        return res.status(400).json({ error: "Last name is required" });
      }
      if (!body.phone) {
        return res.status(400).json({ error: "Phone is required" });
      }
      
      const result = await sql`
        INSERT INTO leads (
          first_name, last_name, email, phone, sms_opt_in, service, form_type,
          landing_page, source, utm_source, utm_medium, utm_campaign, utm_term, utm_content,
          gclid, fbclid, status
        )
        VALUES (
          ${body.firstName},
          ${body.lastName},
          ${body.email},
          ${body.phone},
          ${body.smsOptIn || 'false'},
          ${body.service || null},
          ${body.formType || 'short'},
          ${body.landingPage || null},
          ${body.source || body.landingPage || null},
          ${body.utmSource || null},
          ${body.utmMedium || null},
          ${body.utmCampaign || null},
          ${body.utmTerm || null},
          ${body.utmContent || null},
          ${body.gclid || null},
          ${body.fbclid || null},
          'new'
        )
        RETURNING *
      `;
      const lead = result[0];

      // Check if SendGrid is configured before attempting to send
      const hasSendGrid = !!process.env.SENDGRID_API_KEY;
      console.log(`[${new Date().toISOString()}] 📋 Lead saved: ${lead.id}, SendGrid configured: ${hasSendGrid}`);

      if (!hasSendGrid) {
        console.error(`[${new Date().toISOString()}] ⚠️ SENDGRID_API_KEY not set - skipping email notification`);
        return res.status(201).json({
          ...lead,
          emailDelivery: {
            success: false,
            error: 'Email notifications disabled - SENDGRID_API_KEY environment variable not configured in Vercel',
            configured: false
          }
        });
      }

      try {
        const emailResults = await sendLeadEmail(lead);
        console.log(`[${new Date().toISOString()}] ✅ Email sent successfully for lead ${lead.id}`);
        return res.status(201).json({
          ...lead,
          emailDelivery: {
            success: true,
            results: emailResults,
            configured: true
          }
        });
      } catch (emailError: any) {
        console.error(`[${new Date().toISOString()}] ❌ Email failed for lead ${lead.id}:`, emailError?.message);
        if (emailError?.response?.body) {
          console.error(`[${new Date().toISOString()}] SendGrid response:`, JSON.stringify(emailError.response.body));
        }
        return res.status(201).json({
          ...lead,
          emailDelivery: {
            success: false,
            error: emailError?.message || 'Email notification failed',
            configured: true,
            details: emailError?.response?.body?.errors || null
          }
        });
      }
    }

    if (path === '/api/analytics/page-view' && method === 'POST') {
      return res.status(201).json({ success: true });
    }

    if (path === '/api/analytics/event' && method === 'POST') {
      return res.status(201).json({ success: true });
    }

    if (path === '/api/analytics/web-vital' && method === 'POST') {
      return res.status(201).json({ success: true });
    }

    if (path === '/api/analytics/vitals' && method === 'POST') {
      return res.status(201).json({ success: true });
    }

    if (path === '/api/user') {
      return res.status(401).json({ error: "Not authenticated" });
    }

    return res.status(404).json({ error: "Not found" });
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
