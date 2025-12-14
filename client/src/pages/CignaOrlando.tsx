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
  Heart
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import InsuranceSchema from "@/components/InsuranceSchema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function CignaOrlandoPage() {
  return (
    <>
      <SEOHead
        title="Psychiatrist Orlando Accepts Cigna | In-Network 2025"
        description="Psychiatrist Orlando accepts Cigna - In-network provider for anxiety, depression, ADHD, bipolar. Same-week appointments, verified benefits. Call (386) 848-8751."
        keywords={["Orlando psychiatrist Cigna", "Cigna mental health Orlando", "psychiatry Cigna coverage", "Orlando Cigna psychiatrist"]}
        canonicalPath="/psychiatrist-orlando-takes-cigna"
      />
      <InsuranceSchema 
        insuranceName="Cigna" 
        url="https://empathyhealthclinic.com/psychiatrist-orlando-takes-cigna" 
      />

      <SiteHeader />
      
      <div className="min-h-screen bg-background">
        <section className="bg-gradient-to-br from-primary/10 via-background to-background border-b">
          <div className="container mx-auto px-4 py-16 max-w-7xl">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Compassionate Orlando Psychiatrists Who Accept Cigna Insurance
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Expert psychiatric care in Orlando, fully covered by Cigna insurance. 
                Same-day appointments available.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" data-testid="button-schedule-psychiatrist-orlando-takes-cigna">
                    <Calendar className="mr-2 h-5 w-5" />
                    Schedule Appointment
                  </Button>
                </Link>
                <a href="tel:386-848-8751">
                  <Button size="lg" variant="outline" data-testid="button-call-psychiatrist-orlando-takes-cigna">
                    <Phone className="mr-2 h-5 w-5" />
                    Call (386) 848-8751
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <Shield className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Cigna Network Provider</h3>
                  <p className="text-muted-foreground">
                    In-network with Cigna. Maximized benefits, lower out-of-pocket costs.
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

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2>Why Choose Empathy Health Clinic for Cigna Patients</h2>
              <p>
                At Empathy Health Clinic, we specialize in providing exceptional psychiatric care 
                to Cigna insurance holders in Orlando and throughout Central Florida. Our board-certified 
                providers offer comprehensive mental health services with minimal wait times.
              </p>
            </div>
          </div>
        </section>

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
                      <Button data-testid="button-get-directions-psychiatrist-orlando-takes-cigna">
                        Get Directions
                      </Button>
                    </Link>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Insurance Verification</h2>
                    <p className="mb-4">
                      We verify your Cigna benefits before your first appointment. 
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

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Services</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <Link href="/psychiatrist-orlando">
                <Card className="hover-elevate cursor-pointer border-primary/30 bg-primary/5">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-primary">Psychiatrist Orlando</h3>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/adhd-testing-orlando">
                <Card className="hover-elevate cursor-pointer">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold">ADHD Testing</h3>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/virtual-therapy">
                <Card className="hover-elevate cursor-pointer">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold">Virtual Therapy</h3>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/services">
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
      
      <SiteFooter />
    </>
  );
}
