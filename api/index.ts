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

async function sendLeadEmail(lead: any) {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('SendGrid not configured, skipping email');
    return;
  }

  const fullName = `${lead.first_name} ${lead.last_name}`.trim();
  const msg = {
    to: ['providers@empathyhealthclinic.com', 'kevin.mease@gmail.com'],
    from: 'noreply@empathyhealthclinic.com',
    subject: `New Lead: ${fullName}`,
    html: `
      <h2>New Appointment Request</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Phone:</strong> ${lead.phone || 'Not provided'}</p>
      <p><strong>Service:</strong> ${lead.service || 'General Inquiry'}</p>
      <p><strong>Form Type:</strong> ${lead.form_type || 'short'}</p>
      <p><strong>Landing Page:</strong> ${lead.landing_page || 'Unknown'}</p>
      <p><strong>Source:</strong> ${lead.source || 'Website'}</p>
      ${lead.utm_source ? `<p><strong>UTM Source:</strong> ${lead.utm_source}</p>` : ''}
      ${lead.utm_campaign ? `<p><strong>Campaign:</strong> ${lead.utm_campaign}</p>` : ''}
      ${lead.utm_term ? `<p><strong>Keyword:</strong> ${lead.utm_term}</p>` : ''}
      ${lead.gclid ? `<p><strong>Google Ads Click ID:</strong> ${lead.gclid}</p>` : ''}
    `
  };

  try {
    await sgMail.send(msg);
    console.log('Lead notification email sent successfully to:', msg.to);
  } catch (error: any) {
    console.error('Failed to send email:', error?.message || error);
    if (error?.response?.body) {
      console.error('SendGrid error details:', JSON.stringify(error.response.body));
    }
    throw error;
  }
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
        env: {
          hasDb: !!process.env.DATABASE_URL,
          hasSendGrid: !!process.env.SENDGRID_API_KEY
        }
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
      return res.status(200).json({ posts, totalPages, total: totalCount, page, pageSize });
    }

    if (path.startsWith('/api/blog-posts/')) {
      const slug = path.replace('/api/blog-posts/', '');
      const result = await sql`SELECT * FROM blog_posts WHERE slug = ${slug} LIMIT 1`;
      if (result.length === 0) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      return res.status(200).json(result[0]);
    }

    if (path === '/api/conditions') {
      const result = await sql`SELECT * FROM conditions ORDER BY "order"`;
      return res.status(200).json(result);
    }

    if (path === '/api/insurance-providers') {
      const result = await sql`SELECT * FROM insurance_providers ORDER BY "order"`;
      return res.status(200).json(result);
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
        await sendLeadEmail(lead);
      } catch (emailError: any) {
        console.error('Email failed but lead saved:', emailError?.message);
        return res.status(201).json({ ...lead, emailError: 'Email notification failed' });
      }
      
      return res.status(201).json(lead);
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
