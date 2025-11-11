import sgMail from '@sendgrid/mail';
import { storage } from './storage';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const TO_EMAILS = ['providers@empathyhealthclinic.com', 'kevin.mease@gmail.com'];
// Using domain-authenticated FROM address
const FROM_EMAIL = 'noreply@empathyhealthclinic.com';

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export interface LeadEmailData {
  leadId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  smsOptIn?: string | null;
  service?: string | null;
  formType?: string;
  conditions?: string | null;
  symptoms?: string | null;
  medications?: string | null;
  preferredDay?: string | null;
  paymentMethod?: string | null;
  insuranceProvider?: string | null;
  insuredName?: string | null;
  insuredDob?: string | null;
  memberId?: string | null;
}

export async function sendLeadNotification(data: LeadEmailData): Promise<void> {
  if (!SENDGRID_API_KEY) {
    console.warn('SendGrid API key not configured. Email not sent.');
    return;
  }

  const { 
    firstName, 
    lastName, 
    email, 
    phone, 
    smsOptIn,
    service, 
    formType,
    conditions,
    symptoms,
    medications,
    preferredDay,
    paymentMethod,
    insuranceProvider,
    insuredName,
    insuredDob,
    memberId
  } = data;

  const fullName = `${firstName} ${lastName}`;
  const isLongForm = formType === 'long';
  const formTypeDisplay = formType || 'short';

  // Parse conditions and symptoms if they're JSON strings
  let conditionsList: string[] = [];
  let symptomsList: string[] = [];
  try {
    if (conditions) conditionsList = JSON.parse(conditions);
    if (symptoms) symptomsList = JSON.parse(symptoms);
  } catch (e) {
    // If not JSON, treat as regular strings
    if (conditions) conditionsList = [conditions];
    if (symptoms) symptomsList = [symptoms];
  }

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
        Appointment Request from Empathy Health Clinic Website
      </h2>
      
      <div style="margin: 20px 0;">
        <h3 style="color: #1e40af; margin-bottom: 15px;">Contact Information</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; background-color: #f3f4f6; font-weight: bold; width: 140px;">Name:</td>
            <td style="padding: 8px; background-color: #f9fafb;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; background-color: #f3f4f6; font-weight: bold;">Email:</td>
            <td style="padding: 8px; background-color: #f9fafb;">
              <a href="mailto:${email}" style="color: #2563eb;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px; background-color: #f3f4f6; font-weight: bold;">Phone:</td>
            <td style="padding: 8px; background-color: #f9fafb;">
              <a href="tel:${phone}" style="color: #2563eb;">${phone}</a>
            </td>
          </tr>
          ${smsOptIn === 'true' ? `
          <tr>
            <td style="padding: 8px; background-color: #f3f4f6; font-weight: bold;">SMS Opt-in:</td>
            <td style="padding: 8px; background-color: #f9fafb;">Yes ✓</td>
          </tr>
          ` : ''}
          ${service ? `
          <tr>
            <td style="padding: 8px; background-color: #f3f4f6; font-weight: bold;">Interested In:</td>
            <td style="padding: 8px; background-color: #f9fafb;">${service}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px; background-color: #f3f4f6; font-weight: bold;">Form Type:</td>
            <td style="padding: 8px; background-color: #f9fafb;">${formTypeDisplay === 'long' ? 'Detailed Contact Form' : 'Quick Contact Form'}</td>
          </tr>
        </table>
      </div>

      ${isLongForm ? `
      <div style="margin: 20px 0;">
        <h3 style="color: #1e40af; margin-bottom: 15px;">Additional Information</h3>
        <table style="width: 100%; border-collapse: collapse;">
          ${conditionsList.length > 0 ? `
          <tr>
            <td style="padding: 8px; background-color: #f3f4f6; font-weight: bold; width: 140px; vertical-align: top;">Conditions:</td>
            <td style="padding: 8px; background-color: #f9fafb;">${conditionsList.join(', ')}</td>
          </tr>
          ` : ''}
          ${symptomsList.length > 0 ? `
          <tr>
            <td style="padding: 8px; background-color: #f3f4f6; font-weight: bold; vertical-align: top;">Symptoms:</td>
            <td style="padding: 8px; background-color: #f9fafb;">${symptomsList.join(', ')}</td>
          </tr>
          ` : ''}
          ${medications ? `
          <tr>
            <td style="padding: 8px; background-color: #f3f4f6; font-weight: bold; vertical-align: top;">Current Medications:</td>
            <td style="padding: 8px; background-color: #f9fafb;">${medications}</td>
          </tr>
          ` : ''}
          ${preferredDay ? `
          <tr>
            <td style="padding: 8px; background-color: #f3f4f6; font-weight: bold;">Preferred Day:</td>
            <td style="padding: 8px; background-color: #f9fafb;">${preferredDay}</td>
          </tr>
          ` : ''}
          ${paymentMethod ? `
          <tr>
            <td style="padding: 8px; background-color: #f3f4f6; font-weight: bold;">Payment Method:</td>
            <td style="padding: 8px; background-color: #f9fafb;">${paymentMethod === 'insurance' ? 'Insurance' : 'Self-Pay'}</td>
          </tr>
          ` : ''}
          ${insuranceProvider ? `
          <tr>
            <td style="padding: 8px; background-color: #f3f4f6; font-weight: bold;">Insurance Provider:</td>
            <td style="padding: 8px; background-color: #f9fafb;">${insuranceProvider}</td>
          </tr>
          ` : ''}
          ${insuredName ? `
          <tr>
            <td style="padding: 8px; background-color: #f3f4f6; font-weight: bold;">Insured Name:</td>
            <td style="padding: 8px; background-color: #f9fafb;">${insuredName}</td>
          </tr>
          ` : ''}
          ${insuredDob ? `
          <tr>
            <td style="padding: 8px; background-color: #f3f4f6; font-weight: bold;">Insured DOB:</td>
            <td style="padding: 8px; background-color: #f9fafb;">${insuredDob}</td>
          </tr>
          ` : ''}
          ${memberId ? `
          <tr>
            <td style="padding: 8px; background-color: #f3f4f6; font-weight: bold;">Member ID:</td>
            <td style="padding: 8px; background-color: #f9fafb;">${memberId}</td>
          </tr>
          ` : ''}
        </table>
      </div>
      ` : ''}

      <div style="margin-top: 30px; padding: 15px; background-color: #eff6ff; border-radius: 5px;">
        <p style="margin: 0; color: #1e40af; font-size: 14px;">
          <strong>Next Steps:</strong> Please respond to this appointment request within 24 hours for best results.
        </p>
      </div>

      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
        <p>Empathy Health Clinic | 2281 Lee Rd Suite 102, Winter Park FL | (386) 848-8751</p>
      </div>
    </div>
  `;

  const textContent = `
Appointment Request from Empathy Health Clinic Website

Contact Information:
Name: ${fullName}
Email: ${email}
Phone: ${phone}
${smsOptIn === 'true' ? 'SMS Opt-in: Yes' : ''}
${service ? `Interested In: ${service}` : ''}
Form Type: ${formTypeDisplay === 'long' ? 'Detailed Contact Form' : 'Quick Contact Form'}

${isLongForm && (conditionsList.length > 0 || symptomsList.length > 0 || medications || preferredDay || paymentMethod) ? `
Additional Information:
${conditionsList.length > 0 ? `Conditions: ${conditionsList.join(', ')}` : ''}
${symptomsList.length > 0 ? `Symptoms: ${symptomsList.join(', ')}` : ''}
${medications ? `Current Medications: ${medications}` : ''}
${preferredDay ? `Preferred Day: ${preferredDay}` : ''}
${paymentMethod ? `Payment Method: ${paymentMethod === 'insurance' ? 'Insurance' : 'Self-Pay'}` : ''}
${insuranceProvider ? `Insurance Provider: ${insuranceProvider}` : ''}
${insuredName ? `Insured Name: ${insuredName}` : ''}
${insuredDob ? `Insured DOB: ${insuredDob}` : ''}
${memberId ? `Member ID: ${memberId}` : ''}
` : ''}

---
Next Steps: Please respond to this appointment request within 24 hours for best results.

Empathy Health Clinic | 2281 Lee Rd Suite 102, Winter Park FL | (386) 848-8751
  `.trim();

  const msg = {
    to: TO_EMAILS,
    from: {
      email: FROM_EMAIL,
      name: 'Empathy Health Clinic'
    },
    replyTo: 'providers@empathyhealthclinic.com',
    subject: `New Appointment Request: ${fullName}`,
    text: textContent,
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
    console.log(`Lead notification email sent successfully to ${TO_EMAILS.join(', ')}`);
  } catch (error: any) {
    console.error('Error sending lead notification email:', error);
    
    const errorMessage = error.message || 'Unknown email sending error';
    const errorDetails = error.response?.body ? JSON.stringify(error.response.body) : JSON.stringify(error);
    
    if (error.response) {
      console.error('SendGrid error response:', error.response.body);
    }
    
    for (const recipientEmail of TO_EMAILS) {
      try {
        await storage.logEmailFailure({
          leadId: data.leadId || null,
          emailType: 'lead_notification',
          recipientEmail,
          errorMessage,
          errorDetails,
          retryCount: 0,
          lastRetryAt: null,
          resolved: false,
          resolvedAt: null,
        });
        console.log(`📝 Email failure logged for recipient: ${recipientEmail}`);
      } catch (dbError) {
        console.error('Failed to log email failure to database:', dbError);
      }
    }
    
    throw error;
  }
}

export async function sendNewsletterEmail(
  subscribers: Array<{ id: string; email: string; subscribedAt: string; status: string }>,
  blogPosts: Array<{ id: string; title: string; slug: string; excerpt: string; publishedDate: string; author: string; category: string }>
): Promise<void> {
  if (!SENDGRID_API_KEY) {
    console.warn('SendGrid API key not configured. Newsletter not sent.');
    return;
  }

  // Get the latest 5 blog posts
  const latestPosts = blogPosts.slice(0, 5);

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
      <!-- Header -->
      <div style="background-color: #2563eb; color: white; padding: 30px 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px;">Empathy Health Clinic</h1>
        <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Mental Health & Wellness Newsletter</p>
      </div>

      <!-- Content -->
      <div style="padding: 30px 20px;">
        <p style="font-size: 16px; color: #374151; margin-bottom: 25px;">
          Hello from Empathy Health Clinic! Here are the latest articles from our blog to support your mental health and wellness journey.
        </p>

        <!-- Blog Posts -->
        ${latestPosts.map(post => `
          <div style="margin-bottom: 30px; padding-bottom: 30px; border-bottom: 1px solid #e5e7eb;">
            <h2 style="color: #1e40af; margin: 0 0 10px 0; font-size: 22px;">
              ${post.title}
            </h2>
            <p style="color: #6b7280; font-size: 13px; margin: 0 0 12px 0;">
              ${new Date(post.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} • ${post.category}
            </p>
            <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0 0 15px 0;">
              ${post.excerpt}
            </p>
            <a href="https://empathyhealthclinic.com/blog/${post.slug}" 
               style="display: inline-block; background-color: #2563eb; color: white; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-weight: bold; font-size: 14px;">
              Read More
            </a>
          </div>
        `).join('')}

        <!-- Call to Action -->
        <div style="background-color: #eff6ff; padding: 25px; border-radius: 8px; margin-top: 30px; text-align: center;">
          <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 20px;">Need Support?</h3>
          <p style="color: #4b5563; margin: 0 0 20px 0; font-size: 15px;">
            Our team is here to help with psychiatric evaluation, therapy, and counseling services.
          </p>
          <a href="https://empathyhealthclinic.com/request-appointment" 
             style="display: inline-block; background-color: #2563eb; color: white; text-decoration: none; padding: 14px 28px; border-radius: 5px; font-weight: bold; font-size: 15px; margin: 0 10px 10px 0;">
            Request Appointment
          </a>
          <a href="tel:386-848-8751" 
             style="display: inline-block; background-color: #10b981; color: white; text-decoration: none; padding: 14px 28px; border-radius: 5px; font-weight: bold; font-size: 15px;">
            Call: 386-848-8751
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
          <strong>Empathy Health Clinic</strong><br>
          1800 Pembrook Dr, Suite 300<br>
          Orlando, FL 32810<br>
          (386) 848-8751
        </p>
        <p style="margin: 15px 0 0 0; color: #9ca3af; font-size: 12px;">
          You're receiving this email because you subscribed to our newsletter.<br>
          <a href="https://empathyhealthclinic.com" style="color: #2563eb; text-decoration: none;">Visit Website</a>
        </p>
      </div>
    </div>
  `;

  const textContent = `
Empathy Health Clinic - Mental Health & Wellness Newsletter

Hello from Empathy Health Clinic! Here are the latest articles from our blog to support your mental health and wellness journey.

${latestPosts.map(post => `
${post.title}
${new Date(post.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} • ${post.category}

${post.excerpt}

Read more: https://empathyhealthclinic.com/blog/${post.slug}
`).join('\n---\n\n')}

---

Need Support?
Our team is here to help with psychiatric evaluation, therapy, and counseling services.

Request Appointment: https://empathyhealthclinic.com/request-appointment
Call: 386-848-8751

Empathy Health Clinic
1800 Pembrook Dr, Suite 300
Orlando, FL 32810
(386) 848-8751

You're receiving this email because you subscribed to our newsletter.
Visit Website: https://empathyhealthclinic.com
  `.trim();

  // Send to all subscribers
  const promises = subscribers.map(subscriber => {
    const msg = {
      to: subscriber.email,
      from: {
        email: FROM_EMAIL,
        name: 'Empathy Health Clinic'
      },
      replyTo: 'providers@empathyhealthclinic.com',
      subject: 'Latest Mental Health & Wellness Articles',
      text: textContent,
      html: htmlContent,
    };

    return sgMail.send(msg).catch(error => {
      console.error(`Failed to send newsletter to ${subscriber.email}:`, error);
      // Don't throw - continue sending to other subscribers
    });
  });

  try {
    await Promise.all(promises);
    console.log(`Newsletter sent to ${subscribers.length} subscribers`);
  } catch (error: any) {
    console.error('Error sending newsletter emails:', error);
    throw error;
  }
}
