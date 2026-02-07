import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CookiesPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Cookies Policy | Empathy Health Clinic"
        description="Learn about how Empathy Health Clinic uses cookies and similar tracking technologies on our website. Understand your choices regarding cookie usage."
        keywords={["cookies policy", "website cookies", "tracking technologies", "privacy", "empathy health clinic"]}
        canonicalPath="/cookies-policy"
      />
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-6">
            Cookies Policy
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Last Updated: January 29, 2026
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">What Are Cookies?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site. Cookies help us improve your experience on our website and allow us to understand how visitors use our site.
                </p>
                <p>
                  This Cookies Policy explains what cookies are, how we use them on empathyhealthclinic.com, the types of cookies we use, and how you can manage your cookie preferences.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">How We Use Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>Empathy Health Clinic uses cookies and similar technologies for the following purposes:</p>
                <ul className="space-y-2 list-disc pl-6">
                  <li><strong>Essential cookies:</strong> These cookies are necessary for the website to function properly. They enable basic functions like page navigation, secure access to certain areas of the website, and form submission. The website cannot function properly without these cookies.</li>
                  <li><strong>Analytics cookies:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve the way our website works and the content we provide.</li>
                  <li><strong>Functionality cookies:</strong> These cookies allow the website to remember choices you make (such as your preferred language or the region you are in) and provide enhanced, more personalized features.</li>
                  <li><strong>Marketing cookies:</strong> These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Types of Cookies We Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p className="font-semibold text-foreground">Strictly Necessary Cookies</p>
                <p>
                  These cookies are essential for you to browse the website and use its features. Without these cookies, services like form submissions and account login cannot be provided.
                </p>

                <p className="font-semibold text-foreground">Performance and Analytics Cookies</p>
                <p>
                  We use Google Analytics and similar tools to collect information about how visitors use our website. These cookies collect information in an aggregated form, including the number of visitors, where visitors have come to the site from, and the pages they visited. We use this information to help improve the website and understand how effective our content and marketing efforts are.
                </p>

                <p className="font-semibold text-foreground">Functional Cookies</p>
                <p>
                  These cookies allow our website to remember choices you have made in the past, like which language you prefer, what region you are in, or what your username and password are so you can automatically log in.
                </p>

                <p className="font-semibold text-foreground">Advertising and Targeting Cookies</p>
                <p>
                  These cookies are used to deliver advertisements that are relevant to you and your interests. They are also used to limit the number of times you see an advertisement as well as help measure the effectiveness of an advertising campaign. They remember that you have visited a website, and this information may be shared with other organizations such as advertisers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Third-Party Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  In some cases, we use third-party services that may set their own cookies on your device. These third parties include:
                </p>
                <ul className="space-y-2 list-disc pl-6">
                  <li><strong>Google Analytics:</strong> For website traffic analysis and reporting</li>
                  <li><strong>Google Ads:</strong> For advertising measurement and remarketing</li>
                  <li><strong>Facebook Pixel:</strong> For advertising measurement and audience targeting</li>
                  <li><strong>Calendly / Scheduling tools:</strong> For appointment scheduling functionality</li>
                </ul>
                <p>
                  We do not control these third-party cookies. Please refer to the privacy policies of these third parties for more information about how they use cookies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Managing Your Cookie Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  You have the right to decide whether to accept or reject cookies. You can manage your cookie preferences in the following ways:
                </p>

                <p className="font-semibold text-foreground">Browser Settings</p>
                <p>
                  Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or delete certain cookies. The following links provide information on how to modify cookie settings for popular browsers:
                </p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Google Chrome: Settings &gt; Privacy and security &gt; Cookies</li>
                  <li>Mozilla Firefox: Options &gt; Privacy &amp; Security</li>
                  <li>Safari: Preferences &gt; Privacy</li>
                  <li>Microsoft Edge: Settings &gt; Cookies and site permissions</li>
                </ul>

                <p className="font-semibold text-foreground mt-4">Opt-Out of Analytics</p>
                <p>
                  You can opt out of Google Analytics by installing the{" "}
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Google Analytics Opt-out Browser Add-on
                  </a>.
                </p>

                <p>
                  Please note that disabling cookies may affect the functionality of our website. Some features may not work properly if cookies are disabled.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">HIPAA and Cookie Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  As a healthcare provider, we take your privacy seriously. We want to assure you that:
                </p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Cookies used on our website do not collect Protected Health Information (PHI)</li>
                  <li>No clinical or treatment data is stored in cookies</li>
                  <li>Our use of analytics and advertising technologies complies with HIPAA requirements</li>
                  <li>We do not share any health-related information through cookie-based advertising systems</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Changes to This Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We may update this Cookies Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to periodically review this page for the latest information on our cookie practices.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>If you have questions about our use of cookies, please contact us:</p>
                <p className="font-semibold text-foreground">
                  Empathy Health Clinic<br />
                  1850 Lee Road, Suite 215<br />
                  Winter Park, FL 32810<br />
                  Phone: (407) 745-5915<br />
                  Email: contact@empathyhealthclinic.com
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
