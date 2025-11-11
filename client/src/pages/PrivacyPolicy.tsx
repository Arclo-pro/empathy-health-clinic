import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Privacy Policy | Psychiatrist Orlando FL | Empathy Health Clinic"
        description="Privacy Policy for Empathy Health Clinic, a psychiatry practice serving Orlando, FL. Learn how we protect your mental health information."
        keywords={["privacy policy", "HIPAA compliance", "psychiatrist Orlando", "mental health privacy", "patient confidentiality"]}
        canonicalPath="/privacy-policy"
      />
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Last Updated: November 10, 2025
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Introduction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Empathy Health Clinic ("we," "our," or "us") is a board-certified psychiatry practice serving Orlando, FL and Central Florida. 
                  As your trusted psychiatrist in Orlando, we are committed to protecting the privacy and confidentiality of your personal health 
                  information in accordance with the Health Insurance Portability and Accountability Act (HIPAA) and applicable state and federal laws.
                </p>
                <p>
                  This Privacy Policy describes how our Orlando psychiatrists and mental health professionals collect, use, disclose, and safeguard 
                  your information when you visit our website (empathyhealthclinic.com) or receive psychiatric services at our practice.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">HIPAA Compliance & Protected Health Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  As a psychiatry practice in Orlando, FL, we are a covered entity under HIPAA and must comply with strict privacy and security 
                  regulations regarding your Protected Health Information (PHI). PHI includes any information about your mental health status, 
                  psychiatric treatment, medication management, therapy sessions, or payment for psychiatric services that could identify you.
                </p>
                <p className="font-semibold text-foreground">
                  How We Use and Disclose Your PHI:
                </p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>
                    <strong>Treatment:</strong> Our psychiatrists in Orlando may use your PHI to provide, coordinate, or manage your psychiatric 
                    care and related services, including consultation with other healthcare providers.
                  </li>
                  <li>
                    <strong>Payment:</strong> We may use and disclose PHI to bill and collect payment for psychiatric services from you, your 
                    insurance company, or other third parties.
                  </li>
                  <li>
                    <strong>Healthcare Operations:</strong> We may use PHI for quality assessment, staff training, and other operational activities 
                    at our Orlando psychiatry clinic.
                  </li>
                  <li>
                    <strong>Your Authorization:</strong> Uses and disclosures not described above will only occur with your written authorization, 
                    which you may revoke at any time.
                  </li>
                </ul>
                <p>
                  You have the right to receive a Notice of Privacy Practices that provides a more detailed description of how we use and disclose 
                  your PHI. You will receive this notice at your first psychiatric appointment at our Orlando clinic.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p className="font-semibold text-foreground">Personal Information:</p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Name, email address, phone number, and mailing address</li>
                  <li>Date of birth, insurance information, and emergency contact details</li>
                  <li>Medical history, psychiatric symptoms, and treatment information</li>
                  <li>Medication lists and allergies</li>
                  <li>Information collected during psychiatric evaluations and therapy sessions</li>
                </ul>
                <p className="font-semibold text-foreground mt-4">Website Information:</p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Usage data (pages visited, time spent, referring website)</li>
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Form submissions (appointment requests, contact inquiries)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>Our Orlando psychiatry practice uses your information to:</p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Provide psychiatric services, medication management, and psychotherapy</li>
                  <li>Schedule and confirm appointments with our psychiatrists</li>
                  <li>Communicate about your treatment, test results, and follow-up care</li>
                  <li>Process payments and insurance claims for psychiatric services</li>
                  <li>Send appointment reminders and mental health education materials</li>
                  <li>Improve our website, services, and patient experience</li>
                  <li>Comply with legal and regulatory requirements</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Information Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  As a psychiatrist in Orlando, FL, we implement administrative, physical, and technical safeguards to protect your personal 
                  and health information from unauthorized access, use, or disclosure. These measures include:
                </p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Encrypted electronic health records (EHR) systems</li>
                  <li>Secure, password-protected databases and servers</li>
                  <li>SSL/TLS encryption for website communications</li>
                  <li>Limited access to PHI on a need-to-know basis</li>
                  <li>Regular staff training on privacy and security practices</li>
                  <li>Physical security controls at our Orlando clinic location</li>
                </ul>
                <p>
                  While we strive to protect your information, no method of electronic transmission or storage is 100% secure. 
                  We cannot guarantee absolute security but continually work to maintain the highest standards of data protection.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Your Privacy Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>Under HIPAA and applicable laws, you have the following rights regarding your health information:</p>
                <ul className="space-y-2 list-disc pl-6">
                  <li><strong>Right to Access:</strong> Request copies of your psychiatric records and treatment notes</li>
                  <li><strong>Right to Amend:</strong> Request corrections to your health information</li>
                  <li><strong>Right to Accounting:</strong> Receive a list of disclosures of your PHI</li>
                  <li><strong>Right to Restrict:</strong> Request limitations on uses and disclosures of your PHI</li>
                  <li><strong>Right to Confidential Communications:</strong> Request communications by alternative means or locations</li>
                  <li><strong>Right to Notification:</strong> Be notified of any breach of your unsecured PHI</li>
                </ul>
                <p>
                  To exercise these rights, please contact our Orlando psychiatry clinic at 386-848-8751 or 
                  providers@empathyhealthclinic.com.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these 
                  external sites. We encourage you to review their privacy policies before providing any personal information.
                </p>
                <p>
                  We may use third-party service providers (e.g., insurance verification, billing services, cloud hosting) to support our 
                  Orlando psychiatry practice. These providers have access to your information only to perform services on our behalf and are 
                  obligated to protect your information in accordance with HIPAA and our privacy standards.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Our Orlando psychiatry services are provided to adults 18 years and older. We do not knowingly collect personal information 
                  from individuals under 18 without parental consent. If you believe we have inadvertently collected such information, please 
                  contact us immediately.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Changes to This Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
                  We will post the updated policy on our website with a new "Last Updated" date. We encourage you to review this policy 
                  periodically.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  If you have questions about this Privacy Policy or our privacy practices at our Orlando psychiatry clinic, please contact us:
                </p>
                <div className="space-y-2">
                  <p><strong>Empathy Health Clinic</strong></p>
                  <p>2281 Lee Rd Suite 102<br />Winter Park, FL 32810</p>
                  <p>Phone: <a href="tel:3868488751" className="text-primary hover:underline">386-848-8751</a></p>
                  <p>Email: <a href="mailto:providers@empathyhealthclinic.com" className="text-primary hover:underline">providers@empathyhealthclinic.com</a></p>
                </div>
                <p className="mt-4">
                  As your trusted psychiatrist in Orlando, FL, we are committed to maintaining the highest standards of privacy and 
                  confidentiality in all aspects of your psychiatric care.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
