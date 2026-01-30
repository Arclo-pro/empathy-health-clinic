import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Heart, Users, GraduationCap, MapPin, Clock } from "lucide-react";

export default function Careers() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Careers | Join Our Mental Health Team | Empathy Health Clinic"
        description="Join the Empathy Health Clinic team in Winter Park, FL. We're hiring psychiatrists, therapists, and mental health professionals passionate about patient-centered care."
        keywords={["mental health careers", "psychiatrist jobs Orlando", "therapist jobs Orlando", "mental health jobs Florida", "empathy health clinic careers", "psychiatry jobs"]}
        canonicalPath="/careers"
      />
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-6">
              Careers at Empathy Health Clinic
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our team of dedicated mental health professionals making a difference in the lives of adults across Central Florida.
            </p>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-8 text-center">
            Why Work at Empathy Health Clinic?
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Heart className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Patient-Centered Culture</h3>
                    <p className="text-muted-foreground">
                      We prioritize compassionate, evidence-based care. Our team is united by a commitment to improving mental health outcomes for every patient we serve.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Users className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Collaborative Team</h3>
                    <p className="text-muted-foreground">
                      Work alongside board-certified psychiatrists, licensed therapists, and dedicated support staff in a collaborative, supportive environment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <GraduationCap className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Professional Growth</h3>
                    <p className="text-muted-foreground">
                      We invest in our team's development through continuing education support, training opportunities, and a culture of professional mentorship.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Great Location</h3>
                    <p className="text-muted-foreground">
                      Our office is conveniently located in Winter Park, FL — a vibrant community in the heart of Central Florida with excellent quality of life.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Current Openings */}
          <h2 className="text-3xl font-sans font-bold text-foreground mb-8 text-center">
            Current Openings
          </h2>

          <div className="space-y-6 mb-12">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle className="text-xl mb-2">Licensed Therapist (LMHC / LCSW / LMFT)</CardTitle>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> Winter Park, FL</span>
                      <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> Full-Time</span>
                      <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> Clinical</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We are seeking a licensed therapist to join our growing practice. The ideal candidate is passionate about providing evidence-based therapy to adults dealing with anxiety, depression, ADHD, trauma, and other mental health conditions.
                </p>
                <p className="font-semibold text-foreground">Requirements:</p>
                <ul className="space-y-1 list-disc pl-6">
                  <li>Active Florida license (LMHC, LCSW, or LMFT)</li>
                  <li>Experience working with adult populations</li>
                  <li>Proficiency in evidence-based therapeutic modalities (CBT, DBT, EMDR, etc.)</li>
                  <li>Strong communication and interpersonal skills</li>
                  <li>Experience with EHR systems</li>
                </ul>
                <p className="font-semibold text-foreground">Benefits:</p>
                <ul className="space-y-1 list-disc pl-6">
                  <li>Competitive compensation</li>
                  <li>Flexible scheduling options</li>
                  <li>Continuing education support</li>
                  <li>Collaborative clinical environment</li>
                  <li>Administrative support for scheduling and billing</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle className="text-xl mb-2">Psychiatric Nurse Practitioner (PMHNP)</CardTitle>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> Winter Park, FL</span>
                      <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> Full-Time</span>
                      <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> Clinical</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We are looking for a Psychiatric Mental Health Nurse Practitioner to provide psychiatric evaluations, medication management, and ongoing care for adult patients. This role works closely with our psychiatrists and therapists to deliver comprehensive mental health care.
                </p>
                <p className="font-semibold text-foreground">Requirements:</p>
                <ul className="space-y-1 list-disc pl-6">
                  <li>Master's or Doctoral degree in Nursing with PMHNP certification</li>
                  <li>Active Florida APRN license with prescriptive authority</li>
                  <li>Experience in outpatient psychiatric care preferred</li>
                  <li>Knowledge of psychopharmacology and evidence-based treatments</li>
                  <li>Excellent clinical judgment and patient communication skills</li>
                </ul>
                <p className="font-semibold text-foreground">Benefits:</p>
                <ul className="space-y-1 list-disc pl-6">
                  <li>Competitive salary</li>
                  <li>Flexible work schedule</li>
                  <li>Continuing education allowance</li>
                  <li>Supportive clinical team</li>
                  <li>Modern office and telehealth infrastructure</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* General Application */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Don't See the Right Fit?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground text-center">
              <p>
                We're always interested in connecting with talented mental health professionals. If you're passionate about patient-centered psychiatric care and would like to be considered for future openings, we'd love to hear from you.
              </p>
              <p>
                Send your CV and a brief cover letter to:
              </p>
              <p className="font-semibold text-foreground text-lg">
                contact@empathyhealthclinic.com
              </p>
              <p className="text-sm">
                Please include "Career Inquiry" in the subject line.
              </p>
              <div className="pt-4">
                <Button asChild size="lg">
                  <a href="mailto:contact@empathyhealthclinic.com?subject=Career%20Inquiry">
                    Send Your Application
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Equal Opportunity */}
          <div className="mt-12 text-center text-sm text-muted-foreground">
            <p>
              Empathy Health Clinic is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees. All qualified applicants will receive consideration for employment without regard to race, color, religion, gender, gender identity or expression, sexual orientation, national origin, genetics, disability, age, or veteran status.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
