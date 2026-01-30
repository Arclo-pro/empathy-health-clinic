import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HipaaNotice() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="HIPAA Notice of Privacy Practices | Empathy Health Clinic"
        description="Read Empathy Health Clinic's HIPAA Notice of Privacy Practices. Learn how we protect your health information as required by federal law at our Orlando psychiatry practice."
        keywords={["HIPAA notice", "privacy practices", "protected health information", "psychiatrist Orlando", "patient rights", "mental health privacy"]}
        canonicalPath="/hipaa"
      />
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-6">
            HIPAA Notice of Privacy Practices
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Effective Date: January 29, 2026
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">This Notice Describes How Medical Information About You May Be Used and Disclosed and How You Can Get Access to This Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Empathy Health Clinic is committed to protecting your health information. This Notice of Privacy Practices ("Notice") describes how we may use and disclose your Protected Health Information (PHI) to carry out treatment, payment, or health care operations, and for other purposes permitted or required by law. It also describes your rights regarding your health information and how you can exercise those rights.
                </p>
                <p>
                  We are required by law to maintain the privacy and security of your PHI, provide you with this Notice of our legal duties and privacy practices, notify you following a breach of your unsecured PHI, and follow the terms of the Notice currently in effect.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">How We May Use and Disclose Your Health Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p className="font-semibold text-foreground">Treatment</p>
                <p>
                  We may use and disclose your PHI to provide, coordinate, or manage your psychiatric care and mental health treatment. This includes sharing information with other health care providers involved in your care, such as your primary care physician, therapists, or specialists. For example, your psychiatrist may discuss your treatment plan with a therapist who is also providing you care.
                </p>

                <p className="font-semibold text-foreground">Payment</p>
                <p>
                  We may use and disclose your PHI to bill and collect payment for the psychiatric services and treatment we provide. This may include contacting your health insurance company, managed care organization, or other third-party payer to verify coverage, submit claims, and receive payment. For example, we may share your diagnosis and treatment information with your insurance company to obtain prior authorization for medication or to process a claim.
                </p>

                <p className="font-semibold text-foreground">Health Care Operations</p>
                <p>
                  We may use and disclose your PHI for our health care operations, which include quality assessment, employee training, licensing, accreditation activities, and other administrative functions necessary to run our practice and ensure quality care.
                </p>

                <p className="font-semibold text-foreground">Other Uses and Disclosures Permitted or Required by Law</p>
                <ul className="space-y-2 list-disc pl-6">
                  <li><strong>As required by law:</strong> We will disclose your PHI when required by federal, state, or local law.</li>
                  <li><strong>Public health activities:</strong> We may disclose your PHI for public health activities, such as reporting communicable diseases or suspected abuse or neglect.</li>
                  <li><strong>Health oversight activities:</strong> We may disclose your PHI to a health oversight agency for activities authorized by law, such as audits, investigations, and inspections.</li>
                  <li><strong>Judicial and administrative proceedings:</strong> We may disclose your PHI in response to a court order, subpoena, or other lawful process.</li>
                  <li><strong>Law enforcement:</strong> We may disclose your PHI to law enforcement officials in certain limited situations, such as in response to a warrant or to report a crime occurring on our premises.</li>
                  <li><strong>To avert a serious threat:</strong> We may use and disclose your PHI when necessary to prevent a serious and imminent threat to your health or safety or the health or safety of the public or another person.</li>
                  <li><strong>Workers' compensation:</strong> We may disclose your PHI as authorized by workers' compensation laws.</li>
                  <li><strong>Coroners, funeral directors, and organ donation:</strong> We may disclose your PHI to coroners, medical examiners, or funeral directors, and for cadaveric organ, eye, or tissue donation purposes.</li>
                  <li><strong>Research:</strong> Under certain conditions, we may use or disclose your PHI for research that has been approved by an institutional review board or privacy board.</li>
                  <li><strong>Military and veterans:</strong> If you are a member of the armed forces, we may disclose your PHI as required by military command authorities.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Psychotherapy Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We will obtain your written authorization before using or disclosing psychotherapy notes, except in limited circumstances permitted by law. Psychotherapy notes are notes recorded by a mental health professional during a counseling session that are separated from the rest of your medical record. They do not include medication prescription and monitoring, session start and stop times, treatment modalities, frequency of treatment, clinical test results, or summaries of diagnosis, functional status, treatment plan, symptoms, prognosis, and progress.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Uses and Disclosures Requiring Your Authorization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Other than the situations described above, we will ask for your written authorization before using or disclosing your PHI. This includes:
                </p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Marketing purposes</li>
                  <li>Sale of your PHI</li>
                  <li>Most uses and disclosures of psychotherapy notes</li>
                  <li>Other uses and disclosures not described in this Notice</li>
                </ul>
                <p>
                  You may revoke an authorization in writing at any time, except to the extent we have already taken action based on the authorization.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Your Rights Regarding Your Health Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>You have the following rights regarding the PHI we maintain about you:</p>

                <p className="font-semibold text-foreground">Right to Inspect and Copy</p>
                <p>
                  You have the right to inspect and obtain a copy of your PHI contained in a designated record set. To request access, submit a written request to our Privacy Officer. We may charge a reasonable, cost-based fee for copies. In certain limited circumstances, we may deny your request, and you may request a review of the denial.
                </p>

                <p className="font-semibold text-foreground">Right to Amend</p>
                <p>
                  You have the right to request that we amend your PHI if you believe it is incorrect or incomplete. Submit your request in writing with the reason for the amendment. We may deny your request under certain circumstances, and you have the right to submit a statement of disagreement.
                </p>

                <p className="font-semibold text-foreground">Right to an Accounting of Disclosures</p>
                <p>
                  You have the right to request an accounting of certain disclosures of your PHI made in the six years prior to your request. This accounting will not include disclosures made for treatment, payment, or health care operations, or certain other disclosures.
                </p>

                <p className="font-semibold text-foreground">Right to Request Restrictions</p>
                <p>
                  You have the right to request restrictions on how we use or disclose your PHI for treatment, payment, or health care operations, or disclosures to individuals involved in your care. We are not required to agree to your request unless you are asking us to restrict disclosures to a health plan for services you have paid for in full out of pocket.
                </p>

                <p className="font-semibold text-foreground">Right to Request Confidential Communications</p>
                <p>
                  You have the right to request that we communicate with you about your health information in a specific way or at a specific location. For example, you may ask that we contact you only at a particular phone number or address. We will accommodate reasonable requests.
                </p>

                <p className="font-semibold text-foreground">Right to a Paper Copy of This Notice</p>
                <p>
                  You have the right to receive a paper copy of this Notice at any time, even if you have agreed to receive it electronically. Contact our office to request a paper copy.
                </p>

                <p className="font-semibold text-foreground">Right to Be Notified of a Breach</p>
                <p>
                  You have the right to be notified if there is a breach of your unsecured PHI. We will notify you as required by law.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Changes to This Notice</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We reserve the right to change this Notice and to make the revised Notice effective for PHI we already have about you as well as any information we receive in the future. We will post the current Notice on our website and make copies available at our office.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Complaints</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  If you believe your privacy rights have been violated, you may file a complaint with our practice or with the U.S. Department of Health and Human Services Office for Civil Rights. To file a complaint with us, contact our Privacy Officer at the address or phone number listed below. You will not be retaliated against for filing a complaint.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>For questions about this Notice or to exercise your rights, contact:</p>
                <p className="font-semibold text-foreground">
                  Empathy Health Clinic<br />
                  Privacy Officer<br />
                  1850 Lee Road, Suite 215<br />
                  Winter Park, FL 32789<br />
                  Phone: (407) 745-5915<br />
                  Email: contact@empathyhealthclinic.com
                </p>
                <p>
                  You may also file a complaint with the U.S. Department of Health and Human Services Office for Civil Rights by visiting{" "}
                  <a href="https://www.hhs.gov/hipaa/filing-a-complaint/index.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    www.hhs.gov/hipaa/filing-a-complaint
                  </a>{" "}
                  or calling 1-877-696-6775.
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
