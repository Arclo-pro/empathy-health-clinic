#!/usr/bin/env tsx
/**
 * Create Insurance Provider Landing Page
 * 
 * Automatically generates Orlando insurance landing pages based on
 * existing templates. Uses GPT-5 to create SEO-optimized content.
 * 
 * Uses Replit AI Integrations for OpenAI access (no API key required)
 */

import { parseArgs } from "node:util";
import fs from "fs/promises";
import path from "path";
import OpenAI from "openai";

interface PageData {
  provider: string;
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  content: string;
}

async function generateInsuranceLandingContent(provider: string): Promise<PageData> {
  const slug = `psychiatrist-orlando-takes-${provider.toLowerCase().replace(/\s+/g, '-')}`;
  
  // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
  const openai = new OpenAI({
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
    apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
  });

  const prompt = `Create SEO-optimized content for a landing page:

Title: "Orlando Psychiatrists Who Accept ${provider} Insurance (2025)"

Generate:
1. Meta description (150-160 chars, include "Orlando", "${provider}", "psychiatrist")
2. H1 heading (compelling, includes ${provider} and Orlando)
3. Main content (1200-1400 words) covering:
   - Why choose Empathy Health Clinic for ${provider} patients
   - Insurance verification process
   - Services covered by ${provider}
   - Conditions treated
   - How to schedule with ${provider}
   - Provider network benefits
   
Format as JSON:
{
  "metaDescription": "...",
  "h1": "...",
  "introSection": "...",
  "whyChooseSection": "...",
  "servicesSection": "...",
  "conditionsSection": "...",
  "insuranceProcessSection": "...",
  "ctaSection": "..."
}

Use professional, empathetic tone. Include keywords naturally. Focus on patient benefits.`;

  const response = await openai.chat.completions.create({
    model: "gpt-5",
    messages: [
      { role: "system", content: "You are an expert SEO content writer specializing in healthcare marketing." },
      { role: "user", content: prompt }
    ],
    max_completion_tokens: 8192,
    response_format: { type: "json_object" }
  });

  const contentJson = JSON.parse(response.choices[0]?.message?.content || '{}');

  return {
    provider,
    slug,
    title: `Orlando Psychiatrists Who Accept ${provider} Insurance (2025)`,
    metaDescription: contentJson.metaDescription,
    h1: contentJson.h1,
    content: JSON.stringify(contentJson, null, 2)
  };
}

async function createReactComponent(data: PageData): Promise<string> {
  // Find project root (go up from scripts/ directory if needed)
  const cwd = process.cwd();
  const projectRoot = cwd.endsWith('/scripts') ? path.dirname(cwd) : cwd;
  
  // Read template from existing Orlando page
  const templatePath = path.join(projectRoot, "client/src/pages/PsychiatristOrlando.tsx");
  const template = await fs.readFile(templatePath, "utf-8");
  
  // Simple template replacement (we'll improve this)
  const component = `import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  CheckCircle, 
  Clock, 
  Shield, 
  Phone,
  MapPin,
  Calendar,
  Heart,
  Award
} from "lucide-react";

export default function ${data.provider.replace(/\s+/g, '')}OrlandoPage() {
  return (
    <>
      <Helmet>
        <title>${data.title} | Empathy Health Clinic</title>
        <meta name="description" content="${data.metaDescription}" />
        <meta name="keywords" content="Orlando psychiatrist ${data.provider}, ${data.provider} mental health Orlando, psychiatry ${data.provider} coverage, Orlando ${data.provider} psychiatrist" />
        <link rel="canonical" href="https://empathyhealthclinic.com/${data.slug}" />
        
        {/* Open Graph */}
        <meta property="og:title" content="${data.title}" />
        <meta property="og:description" content="${data.metaDescription}" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://empathyhealthclinic.com/${data.slug}" />
        
        {/* Structured Data - LocalBusiness + MedicalBusiness */}
        <script type="application/ld+json">
          {\`
            {
              "@context": "https://schema.org",
              "@type": ["MedicalBusiness", "LocalBusiness"],
              "name": "Empathy Health Clinic - ${data.provider} Psychiatry",
              "description": "${data.metaDescription}",
              "url": "https://empathyhealthclinic.com/${data.slug}",
              "telephone": "386-848-8751",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "2281 Lee Rd Suite 102",
                "addressLocality": "Winter Park",
                "addressRegion": "FL",
                "postalCode": "32810",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 28.5939,
                "longitude": -81.3432
              },
              "paymentAccepted": ["${data.provider}", "Cash", "Credit Card"],
              "priceRange": "$$",
              "openingHours": "Mo-Fr 09:00-17:00"
            }
          \`}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-background border-b">
          <div className="container mx-auto px-4 py-16 max-w-7xl">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                ${data.h1}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Expert psychiatric care in Orlando, fully covered by ${data.provider} insurance. 
                Same-day appointments available.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" data-testid="button-schedule-${data.slug}">
                    <Calendar className="mr-2 h-5 w-5" />
                    Schedule Appointment
                  </Button>
                </Link>
                <a href="tel:386-848-8751">
                  <Button size="lg" variant="outline" data-testid="button-call-${data.slug}">
                    <Phone className="mr-2 h-5 w-5" />
                    Call (386) 848-8751
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <Shield className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">${data.provider} Network Provider</h3>
                  <p className="text-muted-foreground">
                    In-network with ${data.provider}. Maximized benefits, lower out-of-pocket costs.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <Clock className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Same-Day Appointments</h3>
                  <p className="text-muted-foreground">
                    Urgent psychiatric care available. We understand mental health can't wait.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <Heart className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Comprehensive Care</h3>
                  <p className="text-muted-foreground">
                    Medication management, therapy, and telepsychiatry all under one roof.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Content - AI Generated sections would go here */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2>Why Choose Empathy Health Clinic for ${data.provider} Patients</h2>
              <p>
                At Empathy Health Clinic, we specialize in providing exceptional psychiatric care 
                to ${data.provider} insurance holders in Orlando and throughout Central Florida...
              </p>
              {/* Content sections will be dynamically generated */}
            </div>
          </div>
        </section>

        {/* Location & Contact */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">
                      <MapPin className="inline h-6 w-6 mr-2 text-primary" />
                      Our Orlando Location
                    </h2>
                    <p className="text-lg mb-2">2281 Lee Rd Suite 102</p>
                    <p className="text-lg mb-2">Winter Park, FL 32810</p>
                    <p className="text-lg mb-4">
                      <a href="tel:386-848-8751" className="text-primary hover:underline">
                        (386) 848-8751
                      </a>
                    </p>
                    <p className="text-muted-foreground mb-6">
                      Conveniently located in Winter Park, serving Orlando and surrounding areas.
                    </p>
                    <Link href="/contact">
                      <Button data-testid="button-get-directions-${data.slug}">
                        Get Directions
                      </Button>
                    </Link>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Insurance Verification</h2>
                    <p className="mb-4">
                      We verify your ${data.provider} benefits before your first appointment. 
                      Our team handles all the insurance paperwork.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>Verification within 24 hours</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>Clear explanation of benefits</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>No surprise billing</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Services</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <Link href="/psychiatrist-orlando">
                <Card className="hover-elevate cursor-pointer">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold">General Psychiatry</h3>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/adhd-psychiatrist-orlando">
                <Card className="hover-elevate cursor-pointer">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold">ADHD Treatment</h3>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/telepsychiatry-orlando">
                <Card className="hover-elevate cursor-pointer">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold">Telepsychiatry</h3>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/medication-management-orlando">
                <Card className="hover-elevate cursor-pointer">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold">Medication Management</h3>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}`;

  return component;
}

async function main() {
  try {
    const { values } = parseArgs({
      options: {
        provider: { type: "string", short: "p" },
        slug: { type: "string", short: "s" }
      }
    });

    const provider = values.provider;
    const slug = values.slug;

    if (!provider || !slug) {
      console.error("Usage: create-insurance-landing.ts --provider <provider> --slug <slug>");
      process.exit(1);
    }

    console.log(`Creating landing page for ${provider}...`);

    // Generate content
    const pageData = await generateInsuranceLandingContent(provider);

    // Create React component
    const component = await createReactComponent(pageData);

    // Write to file
    const componentName = provider.replace(/\s+/g, '') + 'Orlando';
    const fileName = componentName + '.tsx';
    
    // Find project root (go up from scripts/ directory if needed)
    const cwd = process.cwd();
    const projectRoot = cwd.endsWith('/scripts') ? path.dirname(cwd) : cwd;
    const filePath = path.join(projectRoot, `client/src/pages/${fileName}`);
    
    await fs.writeFile(filePath, component);

    console.log(`✅ Created ${filePath}`);
    console.log(`📝 Next steps:`);
    console.log(`   1. Add route to client/src/App.tsx:`);
    console.log(`      <Route path="/${slug}" component={${componentName}Page} />`);
    console.log(`   2. Update server/routes.ts if needed for redirects`);
    console.log(`   3. Test the page at /${slug}`);

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

main();
