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

  const msg = {
    to: ['providers@empathyhealthclinic.com', 'kevin.mease@gmail.com'],
    from: 'noreply@empathyhealthclinic.com',
    subject: `New Lead: ${lead.name}`,
    html: `
      <h2>New Appointment Request</h2>
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Phone:</strong> ${lead.phone || 'Not provided'}</p>
      <p><strong>Message:</strong> ${lead.message || 'None'}</p>
      <p><strong>Source:</strong> ${lead.source || 'Website'}</p>
      <p><strong>Page:</strong> ${lead.page_url || 'Unknown'}</p>
    `
  };

  try {
    await sgMail.send(msg);
    console.log('Lead notification email sent');
  } catch (error) {
    console.error('Failed to send email:', error);
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
      return res.status(200).json({ status: 'ok', timestamp: Date.now() });
    }

    const sql = getDb();

    if (path === '/api/treatments') {
      const result = await sql`SELECT * FROM treatments ORDER BY name`;
      return res.status(200).json(result);
    }

    if (path === '/api/therapies') {
      const result = await sql`SELECT * FROM therapies ORDER BY name`;
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
      const result = await sql`SELECT * FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC`;
      return res.status(200).json(result);
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
      const result = await sql`SELECT * FROM conditions ORDER BY name`;
      return res.status(200).json(result);
    }

    if (path === '/api/insurance-providers') {
      const result = await sql`SELECT * FROM insurance_providers ORDER BY name`;
      return res.status(200).json(result);
    }

    if (path === '/api/locations') {
      const result = await sql`SELECT * FROM locations ORDER BY name`;
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
      const result = await sql`
        INSERT INTO leads (name, email, phone, message, source, page_url, utm_source, utm_medium, utm_campaign, utm_term, utm_content)
        VALUES (${body.name}, ${body.email}, ${body.phone || null}, ${body.message || null}, ${body.source || null}, ${body.pageUrl || null}, ${body.utmSource || null}, ${body.utmMedium || null}, ${body.utmCampaign || null}, ${body.utmTerm || null}, ${body.utmContent || null})
        RETURNING *
      `;
      const lead = result[0];
      
      // Send email notification
      await sendLeadEmail(lead);
      
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
