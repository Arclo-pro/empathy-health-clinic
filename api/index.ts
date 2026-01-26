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

  if (!process.env.SENDGRID_API_KEY) {
    console.error(`[${timestamp}] ❌ SENDGRID_API_KEY not configured - email notifications disabled`);
    throw new Error('SendGrid not configured - please add SENDGRID_API_KEY environment variable in Vercel');
  }

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
    if (path === '/api/health') {
      return res.status(200).json({ 
        ok: true, 
        ts: Date.now(),
        hasDb: !!process.env.DATABASE_URL,
        hasSendGrid: !!process.env.SENDGRID_API_KEY
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
      const result = await sql`SELECT * FROM team_members ORDER BY name`;
      return res.status(200).json(result);
    }

    if (path.startsWith('/api/team-members/')) {
      const id = path.replace('/api/team-members/', '');
      const result = await sql`SELECT * FROM team_members WHERE id = ${id} OR slug = ${id} LIMIT 1`;
      if (result.length === 0) {
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
      const result = await sql`SELECT * FROM testimonials`;
      return res.status(200).json(result);
    }

    if (path === '/api/site-content') {
      const result = await sql`SELECT * FROM site_content LIMIT 1`;
      return res.status(200).json(result[0] || {});
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

      try {
        const emailResults = await sendLeadEmail(lead);
        return res.status(201).json({
          ...lead,
          emailDelivery: {
            success: true,
            results: emailResults
          }
        });
      } catch (emailError: any) {
        console.error('Email failed but lead saved:', emailError?.message);
        return res.status(201).json({
          ...lead,
          emailDelivery: {
            success: false,
            error: emailError?.message || 'Email notification failed'
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
