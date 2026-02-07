import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NoSurprisesAct() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="No Surprises Act | Patient Billing Rights | Empathy Health Clinic"
        description="Learn about your rights under the No Surprises Act at Empathy Health Clinic. Understand protections against surprise medical billing for mental health and psychiatric services."
        keywords={["No Surprises Act", "surprise billing", "patient billing rights", "good faith estimate", "psychiatrist Orlando", "mental health billing"]}
        canonicalPath="/no-surprises-act"
      />
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-6">
            No Surprises Act
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Your Rights and Protections Against Surprise Medical Bills
          </p>
          <p className="text-muted-foreground mb-8">
            Effective January 1, 2022
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">What Is the No Surprises Act?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  The No Surprises Act is a federal law that went into effect on January 1, 2022. It protects patients from unexpected medical bills, also known as "surprise bills," that can occur when you unknowingly receive care from out-of-network providers. This law applies to emergency services, certain non-emergency services at in-network facilities, and air ambulance services.
                </p>
                <p>
                  At Empathy Health Clinic, we are committed to transparent billing practices and want you to understand your rights under this important federal protection.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Your Protections Under the No Surprises Act</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p className="font-semibold text-foreground">If You Have Health Insurance</p>
                <p>When you receive mental health or psychiatric services, you are protected from:</p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>
                    <strong>Surprise billing:</strong> If you receive care from an out-of-network provider at an in-network facility without prior knowledge, you cannot be billed more than your in-network cost-sharing amount.
                  </li>
                  <li>
                    <strong>Balance billing:</strong> Out-of-network providers generally cannot bill you for the difference between the billed charge and what your insurance pays (known as "balance billing") in protected situations.
                  </li>
                  <li>
                    <strong>Emergency services:</strong> Emergency mental health services are protected regardless of whether the provider or facility is in-network.
                  </li>
                </ul>

                <p className="font-semibold text-foreground mt-6">If You Are Uninsured or Self-Pay</p>
                <p>
                  If you do not have insurance or choose not to use your insurance, you have the right to receive a Good Faith Estimate of the cost of your care before your appointment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Good Faith Estimate</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Under the No Surprises Act, health care providers are required to give patients who do not have insurance or who are not using insurance an estimate of expected charges for medical services, including psychiatric and mental health services.
                </p>

                <p className="font-semibold text-foreground">Your Right to a Good Faith Estimate</p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>You have the right to receive a Good Faith Estimate for the total expected cost of any non-emergency health care services, including psychiatric evaluations, therapy sessions, medication management, and related services.</li>
                  <li>You can request a Good Faith Estimate before you schedule a service, or at any time during your treatment.</li>
                  <li>If you schedule a service at least 3 business days in advance, we will provide you with a Good Faith Estimate within 1 business day after scheduling. If you schedule a service at least 10 business days in advance, we will provide the estimate within 3 business days after scheduling.</li>
                  <li>The Good Faith Estimate will include the expected charges for the primary service and any other services you may reasonably be expected to receive as part of that care (such as lab work, assessments, or follow-up visits).</li>
                </ul>

                <p className="font-semibold text-foreground mt-6">If Your Bill Is Substantially Higher Than Your Good Faith Estimate</p>
                <p>
                  If you receive a bill that is at least $400 more than your Good Faith Estimate, you can dispute the bill. You have the right to initiate a patient-provider dispute resolution process. Make sure to save a copy or picture of your Good Faith Estimate.
                </p>
                <p>
                  For questions or more information about your right to a Good Faith Estimate, visit{" "}
                  <a href="https://www.cms.gov/nosurprises" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    www.cms.gov/nosurprises
                  </a>{" "}
                  or call (800) 985-3059.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">How Empathy Health Clinic Complies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>At Empathy Health Clinic, we are committed to the following practices in compliance with the No Surprises Act:</p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>We provide Good Faith Estimates to all uninsured and self-pay patients before scheduled services.</li>
                  <li>We clearly communicate our fees and billing practices during the scheduling process.</li>
                  <li>We verify your insurance coverage and inform you of any potential out-of-network costs before your appointment.</li>
                  <li>We provide clear, itemized bills for all services rendered.</li>
                  <li>We have a patient-friendly billing dispute process in place.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Your Right to Consent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  In certain situations, if you choose to see an out-of-network provider, you may be asked to sign a consent form acknowledging that you understand you may be billed at higher, out-of-network rates. This consent must:
                </p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Be provided to you at least 72 hours before the scheduled service (or on the day of service for services scheduled fewer than 72 hours in advance)</li>
                  <li>Include a Good Faith Estimate of the charges</li>
                  <li>Clearly state that you are giving up your surprise billing protections</li>
                  <li>Not be required as a condition of receiving care</li>
                </ul>
                <p>
                  You always have the right to refuse to sign this consent and instead seek care from an in-network provider.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Questions or Concerns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>If you have questions about the No Surprises Act or your billing rights, please contact us:</p>
                <p className="font-semibold text-foreground">
                  Empathy Health Clinic<br />
                  1850 Lee Road, Suite 215<br />
                  Winter Park, FL 32810<br />
                  Phone: (407) 745-5915<br />
                  Email: contact@empathyhealthclinic.com
                </p>
                <p>
                  For more information about the No Surprises Act, visit the Centers for Medicare & Medicaid Services at{" "}
                  <a href="https://www.cms.gov/nosurprises" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    www.cms.gov/nosurprises
                  </a>.
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
