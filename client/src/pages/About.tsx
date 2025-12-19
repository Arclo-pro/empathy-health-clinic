import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SEOHead from "@/components/SEOHead";
import InternalLinkBlock from "@/components/InternalLinkBlock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Heart, Users, Award, MapPin, Brain } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="About Us | Psychiatrist Orlando FL | Empathy Health Clinic"
        description="Learn about Empathy Health Clinic, a leading psychiatry practice serving Orlando, FL. Our board-certified psychiatrists provide compassionate mental health care."
        keywords={["about empathy health clinic", "psychiatrist Orlando", "mental health clinic Orlando", "psychiatry practice Florida", "Winter Park psychiatrist"]}
        canonicalPath="/about"
      />
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-4">
              About Empathy Health Clinic
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Your trusted psychiatrist in Orlando, FL, providing compassionate mental health care since our founding
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Brain className="h-6 w-6 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Empathy Health Clinic is a board-certified psychiatry practice serving Orlando, Winter Park, and Central Florida. 
                  As a leading psychiatrist in Orlando, FL, we are committed to providing accessible, compassionate, and evidence-based 
                  mental health care to adults seeking support for depression, anxiety, ADHD, PTSD, and other psychiatric conditions.
                </p>
                <p>
                  Our Orlando-based psychiatrists and licensed therapists understand that seeking mental health treatment requires courage. 
                  We've built our practice on the foundation of empathy, clinical excellence, and personalized care. Whether you're looking 
                  for medication management, psychotherapy, or comprehensive psychiatric evaluation, our team is here to support your journey 
                  toward wellness.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Compassionate Care</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Our psychiatrists in Orlando provide judgment-free, patient-centered psychiatric care 
                tailored to your unique needs and goals.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Board-Certified</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                All our psychiatrists are board-certified with extensive training in psychiatric 
                medicine, psychotherapy, and medication management.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Experienced Team</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Our Orlando mental health professionals bring years of clinical experience treating 
                diverse psychiatric conditions across all age groups.
              </CardContent>
            </Card>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" />
                Serving Orlando & Central Florida
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Our psychiatry clinic is conveniently located in Winter Park, just minutes from downtown Orlando, 
                Lake Nona, Dr. Phillips, and surrounding communities. We proudly serve as a trusted psychiatrist 
                for Orlando residents seeking high-quality mental health care close to home.
              </p>
              <p>
                In addition to in-person psychiatric appointments at our Winter Park office, we offer secure 
                telehealth services throughout Florida, making it easier than ever to access psychiatric care 
                from the comfort of your home.
              </p>
            </CardContent>
          </Card>

          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-6">Our Approach to Psychiatry</h2>
            <p className="text-muted-foreground mb-4">
              As a psychiatrist in Orlando, FL, we believe in a holistic, patient-first approach to mental health treatment. 
              Our psychiatric services include:
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc pl-6">
              <li>Comprehensive psychiatric evaluations and diagnostic assessments</li>
              <li>Medication management for depression, anxiety, ADHD, bipolar disorder, and more</li>
              <li>Individual psychotherapy using evidence-based techniques (CBT, DBT, EMDR)</li>
              <li>Trauma-informed care for PTSD and complex trauma</li>
              <li>Collaborative treatment planning with your input and goals</li>
              <li>Coordination with primary care providers and specialists</li>
            </ul>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Why Choose Our Orlando Psychiatrists?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                When searching for a psychiatrist in Orlando, you have many options. What sets Empathy Health Clinic apart 
                is our unwavering commitment to personalized psychiatric care, clinical excellence, and patient satisfaction.
              </p>
              <ul className="space-y-2 list-disc pl-6">
                <li>Same-week appointments available for new patients</li>
                <li>Most major insurance plans accepted, including Medicare</li>
                <li>Flexible scheduling with in-person and telehealth options</li>
                <li>Convenient Orlando-area location with easy I-4 access</li>
                <li>Comprehensive psychiatric services under one roof</li>
                <li>Warm, welcoming environment designed for your comfort</li>
              </ul>
            </CardContent>
          </Card>

          <div className="mt-12 mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">Explore Our Services</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/psychiatrist-orlando" className="text-primary hover:underline">
                Psychiatrist Orlando
              </Link>
              <Link href="/services" className="text-primary hover:underline">
                All Services
              </Link>
              <Link href="/anxiety-therapy" className="text-primary hover:underline">
                Anxiety Treatment
              </Link>
              <Link href="/adhd-treatment" className="text-primary hover:underline">
                ADHD Treatment
              </Link>
              <Link href="/depression-counseling" className="text-primary hover:underline">
                Depression Treatment
              </Link>
              <Link href="/therapy" className="text-primary hover:underline">
                Therapy Services
              </Link>
              <Link href="/ptsd-treatment" className="text-primary hover:underline">
                PTSD Treatment
              </Link>
              <Link href="/insurance" className="text-primary hover:underline">
                Insurance Accepted
              </Link>
            </div>
          </div>

          <div className="text-center mt-12 pt-8 border-t">
            <h3 className="text-2xl font-sans font-bold text-foreground mb-4">
              Ready to Take the First Step?
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our Orlando psychiatrists are here to help. Contact us today to schedule your psychiatric evaluation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" data-testid="button-request-appointment">
                <Link href="/request-appointment">
                  Request Appointment
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" data-testid="button-view-team">
                <Link href="/team">
                  Meet Our Psychiatrists
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
