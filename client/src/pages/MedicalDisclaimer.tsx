import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function MedicalDisclaimer() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Medical Disclaimer | Psychiatrist Orlando FL | Empathy Health Clinic"
        description="Medical Disclaimer for Empathy Health Clinic, a psychiatry practice in Orlando, FL. Important information about our psychiatric services and website content."
        keywords={["medical disclaimer", "psychiatrist Orlando", "mental health information", "psychiatric services disclaimer", "Orlando psychiatry"]}
        canonicalPath="/medical-disclaimer"
      />
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="h-10 w-10 text-yellow-500" />
            <h1 className="text-4xl md:text-5xl font-sans font-bold text-foreground">
              Medical Disclaimer
            </h1>
          </div>
          <p className="text-lg text-muted-foreground mb-8">
            Last Updated: November 10, 2025
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <Card className="border-yellow-500/20 bg-yellow-50 dark:bg-yellow-950/10">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2 text-yellow-900 dark:text-yellow-200">
                  <AlertTriangle className="h-6 w-6" />
                  Important Notice
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-yellow-900 dark:text-yellow-100">
                <p className="font-semibold">
                  The information provided on this website is for educational and informational purposes only and is not intended to be a 
                  substitute for professional medical advice, psychiatric diagnosis, or mental health treatment.
                </p>
                <p>
                  If you are experiencing a mental health crisis or emergency, please call 911 or go to your nearest emergency room immediately. 
                  For non-emergency support, call the National Suicide Prevention Lifeline at 988.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">No Doctor-Patient Relationship</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  The content on this website, including blog posts, articles, and informational pages, does not create a doctor-patient 
                  relationship between you and Empathy Health Clinic or any of our Orlando-based psychiatrists. Use of this website and 
                  communication through our contact forms or email does not establish a therapeutic or professional relationship.
                </p>
                <p>
                  A formal doctor-patient relationship is established only when you schedule and attend an in-person or telehealth psychiatric 
                  appointment with one of our licensed psychiatrists in Orlando, FL, and we agree to provide professional psychiatric services to you.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Educational Content Only</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  All content on this website—including articles about depression, anxiety, ADHD, PTSD, medication management, and other 
                  psychiatric topics—is provided for general educational purposes. This information is not intended to:
                </p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Diagnose any mental health condition or psychiatric disorder</li>
                  <li>Provide specific medical advice or psychiatric treatment recommendations</li>
                  <li>Replace consultation with a qualified psychiatrist or mental health professional</li>
                  <li>Recommend specific medications, dosages, or treatment protocols</li>
                  <li>Serve as a guide for self-diagnosis or self-treatment</li>
                </ul>
                <p>
                  Mental health conditions are complex and vary significantly from person to person. What works for one individual may not be 
                  appropriate for another. Always consult with a board-certified psychiatrist in Orlando or your local area for personalized 
                  psychiatric evaluation and treatment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Not a Substitute for Professional Care</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  The information on this website should never be used as a substitute for professional psychiatric care, mental health treatment, 
                  or medical advice from a qualified healthcare provider. As a psychiatry practice serving Orlando, FL, we strongly encourage 
                  individuals experiencing mental health symptoms to:
                </p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Schedule an appointment with a licensed psychiatrist or mental health professional</li>
                  <li>Seek immediate emergency care for suicidal thoughts, self-harm, or psychiatric emergencies</li>
                  <li>Never discontinue or alter psychiatric medications without consulting your prescribing psychiatrist</li>
                  <li>Discuss any questions or concerns about your mental health with a qualified professional</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Accuracy of Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  While our Orlando psychiatrists and mental health professionals strive to provide accurate, current, and evidence-based 
                  information, medical and psychiatric knowledge is constantly evolving. We make reasonable efforts to ensure the accuracy 
                  of content on this website, but we cannot guarantee:
                </p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>That all information is complete, current, or error-free</li>
                  <li>That research findings cited reflect the most recent scientific consensus</li>
                  <li>That treatment approaches described are appropriate for your specific situation</li>
                  <li>That medication information is comprehensive or applicable to your case</li>
                </ul>
                <p>
                  Psychiatric treatment guidelines, medication protocols, and diagnostic criteria may change as new research emerges. 
                  Always verify any medical or psychiatric information with a qualified healthcare professional before making treatment decisions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Third-Party Links and Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Our website may contain links to third-party websites, resources, or organizations related to mental health, psychiatry, 
                  or healthcare. These links are provided for informational purposes only. Empathy Health Clinic does not endorse, control, 
                  or assume responsibility for:
                </p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>The content, accuracy, or opinions expressed on external websites</li>
                  <li>Products, services, or treatments offered by third parties</li>
                  <li>The privacy practices or security of external sites</li>
                  <li>Any damages or issues arising from your use of third-party resources</li>
                </ul>
                <p>
                  Use of external websites and resources is at your own risk. We encourage you to review the terms of use and privacy policies 
                  of any third-party sites you visit.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  To the fullest extent permitted by law, Empathy Health Clinic, our Orlando psychiatrists, staff, and affiliates shall not be 
                  liable for any direct, indirect, incidental, consequential, or punitive damages arising from:
                </p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Your use or reliance on information provided on this website</li>
                  <li>Errors, omissions, or inaccuracies in website content</li>
                  <li>Decisions made based on information found on this site</li>
                  <li>Delays in treatment or adverse outcomes related to website content</li>
                  <li>Technical issues, website downtime, or data loss</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Medication and Treatment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Information about psychiatric medications, treatments, or therapeutic approaches is provided for general educational purposes only. 
                  As a psychiatrist in Orlando, FL, we emphasize that:
                </p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Psychiatric medications must be prescribed and monitored by a licensed psychiatrist</li>
                  <li>Medication effects, dosages, and side effects vary significantly between individuals</li>
                  <li>Never start, stop, or change psychiatric medications without consulting your psychiatrist</li>
                  <li>Drug interactions and contraindications require professional evaluation</li>
                  <li>Treatment outcomes cannot be guaranteed and vary by individual</li>
                </ul>
                <p>
                  If you have questions about psychiatric medications or treatment options, please schedule an appointment with one of our 
                  board-certified psychiatrists in Orlando for a comprehensive evaluation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Emergency Situations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p className="font-semibold text-foreground">
                  If you are experiencing a mental health emergency, psychiatric crisis, or thoughts of self-harm or suicide:
                </p>
                <ul className="space-y-2 list-disc pl-6">
                  <li><strong>Call 911</strong> or go to your nearest emergency room immediately</li>
                  <li><strong>Call the National Suicide Prevention Lifeline:</strong> 988 (available 24/7)</li>
                  <li><strong>Text "HELLO" to 741741</strong> for the Crisis Text Line</li>
                  <li><strong>Contact your local crisis center</strong> or mobile crisis team</li>
                </ul>
                <p>
                  Our Orlando psychiatry clinic is not equipped to handle psychiatric emergencies through our website, email, or phone system. 
                  Do not use our contact forms or appointment request system for emergency situations. Always seek immediate emergency care.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Scope of Practice</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Empathy Health Clinic provides psychiatric services to adults 18 years and older. Our board-certified psychiatrists in Orlando 
                  are licensed to practice medicine in the state of Florida. Our services include:
                </p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Psychiatric evaluations and diagnostic assessments</li>
                  <li>Medication management for mental health conditions</li>
                  <li>Individual psychotherapy and counseling</li>
                  <li>Treatment for depression, anxiety, ADHD, PTSD, and related disorders</li>
                  <li>Telehealth psychiatric services for Florida residents</li>
                </ul>
                <p>
                  We do not provide emergency psychiatric services, inpatient psychiatric care, or services for individuals under 18 years of age. 
                  If you need services outside our scope of practice, we can provide appropriate referrals.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Changes to This Disclaimer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We may update this Medical Disclaimer from time to time to reflect changes in our practice, legal requirements, or standards of care. 
                  We will post the updated disclaimer on our website with a new "Last Updated" date. Your continued use of this website after changes 
                  constitutes acceptance of the revised disclaimer.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Contact Our Orlando Psychiatrists</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  If you have questions about this Medical Disclaimer or would like to schedule a psychiatric appointment at our Orlando clinic, 
                  please contact us:
                </p>
                <div className="space-y-2">
                  <p><strong>Empathy Health Clinic</strong></p>
                  <p>Board-Certified Psychiatrist in Orlando, FL</p>
                  <p>2281 Lee Rd Suite 102<br />Winter Park, FL 32810</p>
                  <p>Phone: <a href="tel:3868488751" className="text-primary hover:underline">386-848-8751</a></p>
                  <p>Email: <a href="mailto:providers@empathyhealthclinic.com" className="text-primary hover:underline">providers@empathyhealthclinic.com</a></p>
                </div>
                <div className="pt-6 border-t">
                  <p className="font-semibold text-foreground mb-3">Ready to Get Started?</p>
                  <p className="mb-4">
                    Schedule a comprehensive psychiatric evaluation with our experienced Orlando psychiatrists today.
                  </p>
                  <Button asChild size="lg" data-testid="button-request-appointment">
                    <Link href="/request-appointment">
                      Request Appointment
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground italic">
                <strong>Disclaimer:</strong> This Medical Disclaimer is provided in good faith and for general information only. 
                As a psychiatry practice serving Orlando, FL and Central Florida, we are committed to providing high-quality, 
                evidence-based psychiatric care while ensuring our patients understand the limitations of online information. 
                Always consult with a qualified healthcare professional for medical advice specific to your situation.
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
