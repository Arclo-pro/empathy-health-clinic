import sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const TO_EMAIL = 'providers@empathyhealthclinic.com';
const FROM_EMAIL = 'noreply@empathyhealthclinic.com';

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export interface LeadEmailData {
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
        New Lead from Empathy Health Clinic Website
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
          <strong>Next Steps:</strong> Please respond to this lead within 24 hours for best results.
        </p>
      </div>

      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
        <p>Empathy Health Clinic | 2281 Lee Rd Suite 102, Winter Park FL | (386) 848-8751</p>
      </div>
    </div>
  `;

  const textContent = `
New Lead from Empathy Health Clinic Website

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
Next Steps: Please respond to this lead within 24 hours for best results.

Empathy Health Clinic | 2281 Lee Rd Suite 102, Winter Park FL | (386) 848-8751
  `.trim();

  const msg = {
    to: TO_EMAIL,
    from: FROM_EMAIL,
    subject: `New Lead: ${fullName} - Empathy Health Clinic`,
    text: textContent,
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
    console.log(`Lead notification email sent successfully to ${TO_EMAIL}`);
  } catch (error: any) {
    console.error('Error sending lead notification email:', error);
    if (error.response) {
      console.error('SendGrid error response:', error.response.body);
    }
    throw error;
  }
}
