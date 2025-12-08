import { useEffect, lazy, Suspense } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAnalytics } from "@/hooks/use-analytics";
import { Loader2 } from "lucide-react";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";

// Only load Home page immediately for fast initial render
import Home from "@/pages/Home";

// Lazy load all public pages for optimal performance
const Insurance = lazy(() => import("@/pages/Insurance"));
const Therapy = lazy(() => import("@/pages/Therapy"));
const TeamPage = lazy(() => import("@/pages/TeamPage"));
const TeamMemberDetail = lazy(() => import("@/pages/TeamMemberDetail"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const RequestAppointment = lazy(() => import("@/pages/RequestAppointment"));
const NewPatients = lazy(() => import("@/pages/NewPatients"));
const AffordableCare = lazy(() => import("@/pages/AffordableCare"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const StressManagement = lazy(() => import("@/pages/StressManagement"));
const AltamonteSprings = lazy(() => import("@/pages/AltamonteSprings"));
const WinterPark = lazy(() => import("@/pages/WinterPark"));
const Orlando = lazy(() => import("@/pages/Orlando"));
const Kissimmee = lazy(() => import("@/pages/Kissimmee"));
const PsychotherapistOrlando = lazy(() => import("@/pages/PsychotherapistOrlando"));
const MentalHealthServicesOrlando = lazy(() => import("@/pages/MentalHealthServicesOrlando"));
const TherapistMaitland = lazy(() => import("@/pages/TherapistMaitland"));
const ThankYou = lazy(() => import("@/pages/ThankYou"));
const LocationDetail = lazy(() => import("@/pages/LocationDetail"));
const PageBySlug = lazy(() => import("@/pages/PageBySlug"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Auth page
const AuthPage = lazy(() => import("@/pages/AuthPage"));

// Admin pages
const Admin = lazy(() => import("@/pages/Admin"));
const AnalyticsDashboard = lazy(() => import("@/pages/AnalyticsDashboard"));
const SEOOptimization = lazy(() => import("@/pages/SEOOptimization"));
const GoogleAdsPerformance = lazy(() => import("@/pages/GoogleAdsPerformance"));
const GoogleAdsSetup = lazy(() => import("@/pages/GoogleAdsSetup"));
const LeadInsights = lazy(() => import("@/pages/LeadInsights"));
const AdminLinkMonitor = lazy(() => import("@/pages/AdminLinkMonitor"));
const AdminBlogGenerator = lazy(() => import("@/pages/AdminBlogGenerator"));
const BlogSEOOptimizer = lazy(() => import("@/pages/BlogSEOOptimizer"));
const SEMrushOptimizer = lazy(() => import("@/pages/SEMrushOptimizer"));
const AdminUTMTracker = lazy(() => import("@/pages/AdminUTMTracker"));
const AdminEmailFailures = lazy(() => import("@/pages/AdminEmailFailures"));
const AdminSERP = lazy(() => import("@/pages/AdminSERP"));

// Blog pages
const BlogListingPage = lazy(() => import("@/pages/BlogListingPage"));
const BlogDetailPage = lazy(() => import("@/pages/BlogDetailPage"));

// Google Ads Landing Pages
const EMDRTherapy = lazy(() => import("@/pages/EMDRTherapy"));
const TMSTreatment = lazy(() => import("@/pages/TMSTreatment"));
const TraumaSpecialist = lazy(() => import("@/pages/TraumaSpecialist"));
const FemaleTherapistOrlando = lazy(() => import("@/pages/FemaleTherapistOrlando"));
const BlackPsychiatristOrlando = lazy(() => import("@/pages/BlackPsychiatristOrlando"));
const VirtualTherapy = lazy(() => import("@/pages/VirtualTherapy"));
const CrisisTherapy = lazy(() => import("@/pages/CrisisTherapy"));
const DepressionCounseling = lazy(() => import("@/pages/DepressionCounseling"));
const DepressionTreatment = lazy(() => import("@/pages/DepressionTreatment"));
const AnxietyTherapy = lazy(() => import("@/pages/AnxietyTherapy"));
const AnxietyTreatment = lazy(() => import("@/pages/AnxietyTreatment"));
const CognitiveBehavioralTherapy = lazy(() => import("@/pages/CognitiveBehavioralTherapy"));
const CouplesCounseling = lazy(() => import("@/pages/CouplesCounseling"));
const CounselorNearMe = lazy(() => import("@/pages/CounselorNearMe"));
const MentalHealthNearMe = lazy(() => import("@/pages/MentalHealthNearMe"));
const TherapyNearMe = lazy(() => import("@/pages/TherapyNearMe"));
const CounselingOrlando = lazy(() => import("@/pages/CounselingOrlando"));
const TherapyOviedo = lazy(() => import("@/pages/TherapyOviedo"));

// Orlando Service Landing Pages
const Psychiatrist = lazy(() => import("@/pages/Psychiatrist"));
const PsychiatricServices = lazy(() => import("@/pages/PsychiatricServices"));
const PsychiatricEvaluation = lazy(() => import("@/pages/PsychiatricEvaluation"));
const PsychiatristOrlando = lazy(() => import("@/pages/PsychiatristOrlando"));
const PsychiatryClinicOrlando = lazy(() => import("@/pages/PsychiatryClinicOrlando"));
const PsychiatristNearMe = lazy(() => import("@/pages/PsychiatristNearMe"));
const PsychiatryNearMe = lazy(() => import("@/pages/PsychiatryNearMe"));
const ADHDPsychiatristOrlando = lazy(() => import("@/pages/ADHDPsychiatristOrlando"));
const AnxietyPsychiatristOrlando = lazy(() => import("@/pages/AnxietyPsychiatristOrlando"));
const BipolarPsychiatristOrlando = lazy(() => import("@/pages/BipolarPsychiatristOrlando"));
const DepressionPsychiatristOrlando = lazy(() => import("@/pages/DepressionPsychiatristOrlando"));
const PTSDPsychiatristOrlando = lazy(() => import("@/pages/PTSDPsychiatristOrlando"));
const UrgentPsychiatricCareOrlando = lazy(() => import("@/pages/UrgentPsychiatricCareOrlando"));
const PsychiatristOrlandoAcceptsUMR = lazy(() => import("@/pages/PsychiatristOrlandoAcceptsUMR"));
const ChildPsychiatristOrlando = lazy(() => import("@/pages/ChildPsychiatristOrlando"));
const MedicationManagementOrlando = lazy(() => import("@/pages/MedicationManagementOrlando"));
const TelepsychiatryOrlando = lazy(() => import("@/pages/TelepsychiatryOrlando"));
const SameDayPsychiatristOrlando = lazy(() => import("@/pages/SameDayPsychiatristOrlando"));
const PsychiatristForAnxietyNearMe = lazy(() => import("@/pages/PsychiatristForAnxietyNearMe"));
const PsychiatristForDepressionNearMe = lazy(() => import("@/pages/PsychiatristForDepressionNearMe"));

// New Google Ads Landing Pages (Template-based)
const PsychiatricEvaluationOrlando = lazy(() => import("@/pages/PsychiatricEvaluationOrlando"));
const TherapistOrlando = lazy(() => import("@/pages/TherapistOrlando"));
const MentalHealthClinicOrlando = lazy(() => import("@/pages/MentalHealthClinicOrlando"));
const MedicareTherapyOrlando = lazy(() => import("@/pages/MedicareTherapyOrlando"));
const MedicarePsychiatristOrlando = lazy(() => import("@/pages/MedicarePsychiatristOrlando"));
const PsychologistOrlando = lazy(() => import("@/pages/PsychologistOrlando"));
const TherapistAcceptsUMR = lazy(() => import("@/pages/TherapistAcceptsUMR"));
const TherapistAcceptsOscarHealth = lazy(() => import("@/pages/TherapistAcceptsOscarHealth"));
const SunshineHealthTherapy = lazy(() => import("@/pages/SunshineHealthTherapy"));
const PsychiatristOrlandoAcceptsBCBS = lazy(() => import("@/pages/PsychiatristOrlandoAcceptsBCBS"));
const PsychiatristOrlandoAcceptsCigna = lazy(() => import("@/pages/PsychiatristOrlandoAcceptsCigna"));
const PsychiatristOrlandoAcceptsAetna = lazy(() => import("@/pages/PsychiatristOrlandoAcceptsAetna"));
const PsychiatristOrlandoAcceptsUnitedHealthcare = lazy(() => import("@/pages/PsychiatristOrlandoAcceptsUnitedHealthcare"));
const PsychiatryOrlando = lazy(() => import("@/pages/PsychiatryOrlando"));
const OcdPsychiatristOrlando = lazy(() => import("@/pages/OcdPsychiatristOrlando"));
const SchizophreniaPsychiatristOrlando = lazy(() => import("@/pages/SchizophreniaPsychiatristOrlando"));
const InsomniaPsychiatristOrlando = lazy(() => import("@/pages/InsomniaPsychiatristOrlando"));

// Location Pages
const PsychiatristAltamonteSprings = lazy(() => import("@/pages/locations/AltamonteSprings"));
const PsychiatristKissimmee = lazy(() => import("@/pages/locations/Kissimmee"));
const PsychiatristApopka = lazy(() => import("@/pages/locations/Apopka"));
const PsychiatristWinterPark = lazy(() => import("@/pages/locations/WinterPark"));

// Additional Landing Pages
const ADHDTestingOrlando = lazy(() => import("@/pages/ADHDTestingOrlando"));
const BlueCrossBlueShieldTherapy = lazy(() => import("@/pages/BlueCrossBlueShieldTherapy"));
const PsychiatristAcceptingNewPatientsOrlando = lazy(() => import("@/pages/PsychiatristAcceptingNewPatientsOrlando"));
const OnlinePsychiatristOrlando = lazy(() => import("@/pages/OnlinePsychiatristOrlando"));
const BestPsychiatristOrlando = lazy(() => import("@/pages/BestPsychiatristOrlando"));
const OnlinePsychiatristFlorida = lazy(() => import("@/pages/OnlinePsychiatristFlorida"));
const MentalHealthDoctorOrlando = lazy(() => import("@/pages/MentalHealthDoctorOrlando"));
const TraumaPsychiatristOrlando = lazy(() => import("@/pages/TraumaPsychiatristOrlando"));
const PsychiatristNearUcf = lazy(() => import("@/pages/PsychiatristNearUcf"));

// Legal & Info Pages
const About = lazy(() => import("@/pages/About"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const MedicalDisclaimer = lazy(() => import("@/pages/MedicalDisclaimer"));

// Components
const StickyMobileCTA = lazy(() => import("@/components/StickyMobileCTA"));

function Router() {
  const [location] = useLocation();
  useAnalytics();
  
  // Don't show sticky CTA on admin pages, thank you page, or request appointment page
  const showStickyCTA = !location.startsWith('/admin') && 
                        location !== '/thank-you' && 
                        location !== '/request-appointment';
  
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/auth">
          <Suspense fallback={<LoadingFallback />}>
            <AuthPage />
          </Suspense>
        </Route>
        <ProtectedRoute path="/admin" component={() => (
          <Suspense fallback={<LoadingFallback />}>
            <Admin />
          </Suspense>
        )} />
        <ProtectedRoute path="/admin/analytics" component={() => (
          <Suspense fallback={<LoadingFallback />}>
            <AnalyticsDashboard />
          </Suspense>
        )} />
        <ProtectedRoute path="/admin/seo" component={() => (
          <Suspense fallback={<LoadingFallback />}>
            <SEOOptimization />
          </Suspense>
        )} />
        <ProtectedRoute path="/admin/google-ads" component={() => (
          <Suspense fallback={<LoadingFallback />}>
            <GoogleAdsPerformance />
          </Suspense>
        )} />
        <ProtectedRoute path="/admin/google-ads-setup" component={() => (
          <Suspense fallback={<LoadingFallback />}>
            <GoogleAdsSetup />
          </Suspense>
        )} />
        <ProtectedRoute path="/admin/lead-insights" component={() => (
          <Suspense fallback={<LoadingFallback />}>
            <LeadInsights />
          </Suspense>
        )} />
        <ProtectedRoute path="/admin/link-monitor" component={() => (
          <Suspense fallback={<LoadingFallback />}>
            <AdminLinkMonitor />
          </Suspense>
        )} />
        <ProtectedRoute path="/admin/blog" component={() => (
          <Suspense fallback={<LoadingFallback />}>
            <AdminBlogGenerator />
          </Suspense>
        )} />
        <ProtectedRoute path="/admin/blog-seo" component={() => (
          <Suspense fallback={<LoadingFallback />}>
            <BlogSEOOptimizer />
          </Suspense>
        )} />
        <ProtectedRoute path="/admin/semrush" component={() => (
          <Suspense fallback={<LoadingFallback />}>
            <SEMrushOptimizer />
          </Suspense>
        )} />
        <ProtectedRoute path="/admin/utm-tracker" component={() => (
          <Suspense fallback={<LoadingFallback />}>
            <AdminUTMTracker />
          </Suspense>
        )} />
        <ProtectedRoute path="/admin/email-failures" component={() => (
          <Suspense fallback={<LoadingFallback />}>
            <AdminEmailFailures />
          </Suspense>
        )} />
        <ProtectedRoute path="/admin/serp" component={() => (
          <Suspense fallback={<LoadingFallback />}>
            <AdminSERP />
          </Suspense>
        )} />
        <Route path="/insurance">
          <Suspense fallback={<LoadingFallback />}>
            <Insurance />
          </Suspense>
        </Route>
        <Route path="/therapy">
          <Suspense fallback={<LoadingFallback />}>
            <Therapy />
          </Suspense>
        </Route>
        <Route path="/team">
          <Suspense fallback={<LoadingFallback />}>
            <TeamPage />
          </Suspense>
        </Route>
        <Route path="/team/:slug">
          <Suspense fallback={<LoadingFallback />}>
            <TeamMemberDetail />
          </Suspense>
        </Route>
        <Route path="/services">
          <Suspense fallback={<LoadingFallback />}>
            <ServicesPage />
          </Suspense>
        </Route>
        <Route path="/request-appointment">
          <Suspense fallback={<LoadingFallback />}>
            <RequestAppointment />
          </Suspense>
        </Route>
        <Route path="/new-patients">
          <Suspense fallback={<LoadingFallback />}>
            <NewPatients />
          </Suspense>
        </Route>
        <Route path="/pricing">
          <Suspense fallback={<LoadingFallback />}>
            <Pricing />
          </Suspense>
        </Route>
        <Route path="/affordable-care">
          <Suspense fallback={<LoadingFallback />}>
            <AffordableCare />
          </Suspense>
        </Route>
        <Route path="/stress-management">
          <Suspense fallback={<LoadingFallback />}>
            <StressManagement />
          </Suspense>
        </Route>
        <Route path="/psychotherapist-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <PsychotherapistOrlando />
          </Suspense>
        </Route>
        <Route path="/mental-health-services-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <MentalHealthServicesOrlando />
          </Suspense>
        </Route>
        <Route path="/therapist-maitland">
          <Suspense fallback={<LoadingFallback />}>
            <TherapistMaitland />
          </Suspense>
        </Route>
        <Route path="/locations/altamonte-springs">
          <Suspense fallback={<LoadingFallback />}>
            <AltamonteSprings />
          </Suspense>
        </Route>
        <Route path="/locations/winter-park">
          <Suspense fallback={<LoadingFallback />}>
            <PsychiatristWinterPark />
          </Suspense>
        </Route>
        <Route path="/psychiatrist-winter-park">
          <Suspense fallback={<LoadingFallback />}>
            <PsychiatristWinterPark />
          </Suspense>
        </Route>
        <Route path="/locations/kissimmee">
          <Suspense fallback={<LoadingFallback />}>
            <PsychiatristKissimmee />
          </Suspense>
        </Route>
        <Route path="/locations/apopka">
          <Suspense fallback={<LoadingFallback />}>
            <PsychiatristApopka />
          </Suspense>
        </Route>
        <Route path="/locations/orlando">
          <Suspense fallback={<LoadingFallback />}>
            <Orlando />
          </Suspense>
        </Route>
        <Route path="/locations/kissimmee">
          <Suspense fallback={<LoadingFallback />}>
            <Kissimmee />
          </Suspense>
        </Route>
        <Route path="/thank-you">
          <Suspense fallback={<LoadingFallback />}>
            <ThankYou />
          </Suspense>
        </Route>
        <Route path="/blog">
          <Suspense fallback={<LoadingFallback />}>
            <BlogListingPage />
          </Suspense>
        </Route>
        <Route path="/blog/:slug">
          <Suspense fallback={<LoadingFallback />}>
            <BlogDetailPage />
          </Suspense>
        </Route>
        <Route path="/emdr-therapy">
          <Suspense fallback={<LoadingFallback />}>
            <EMDRTherapy />
          </Suspense>
        </Route>
        <Route path="/tms-treatment">
          <Suspense fallback={<LoadingFallback />}>
            <TMSTreatment />
          </Suspense>
        </Route>
        <Route path="/trauma-specialist-near-me">
          <Suspense fallback={<LoadingFallback />}>
            <TraumaSpecialist />
          </Suspense>
        </Route>
        <Route path="/female-therapist-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <FemaleTherapistOrlando />
          </Suspense>
        </Route>
        <Route path="/black-psychiatrist-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <BlackPsychiatristOrlando />
          </Suspense>
        </Route>
        <Route path="/virtual-therapy">
          <Suspense fallback={<LoadingFallback />}>
            <VirtualTherapy />
          </Suspense>
        </Route>
        <Route path="/crisis-therapy">
          <Suspense fallback={<LoadingFallback />}>
            <CrisisTherapy />
          </Suspense>
        </Route>
        <Route path="/depression-counseling">
          <Suspense fallback={<LoadingFallback />}>
            <DepressionCounseling />
          </Suspense>
        </Route>
        <Route path="/depression-treatment">
          <Suspense fallback={<LoadingFallback />}>
            <DepressionTreatment />
          </Suspense>
        </Route>
        <Route path="/anxiety-therapy">
          <Suspense fallback={<LoadingFallback />}>
            <AnxietyTherapy />
          </Suspense>
        </Route>
        <Route path="/anxiety-treatment">
          <Suspense fallback={<LoadingFallback />}>
            <AnxietyTreatment />
          </Suspense>
        </Route>
        <Route path="/cognitive-behavioral-therapy">
          <Suspense fallback={<LoadingFallback />}>
            <CognitiveBehavioralTherapy />
          </Suspense>
        </Route>
        <Route path="/couples-counseling">
          <Suspense fallback={<LoadingFallback />}>
            <CouplesCounseling />
          </Suspense>
        </Route>
        <Route path="/counselor-near-me">
          <Suspense fallback={<LoadingFallback />}>
            <CounselorNearMe />
          </Suspense>
        </Route>
        <Route path="/mental-health-near-me">
          <Suspense fallback={<LoadingFallback />}>
            <MentalHealthNearMe />
          </Suspense>
        </Route>
        <Route path="/therapy-near-me">
          <Suspense fallback={<LoadingFallback />}>
            <TherapyNearMe />
          </Suspense>
        </Route>
        <Route path="/counseling-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <CounselingOrlando />
          </Suspense>
        </Route>
        <Route path="/therapy-oviedo">
          <Suspense fallback={<LoadingFallback />}>
            <TherapyOviedo />
          </Suspense>
        </Route>
        <Route path="/psychiatrist">
          <Suspense fallback={<LoadingFallback />}>
            <Psychiatrist />
          </Suspense>
        </Route>
        <Route path="/psychiatric-services">
          <Suspense fallback={<LoadingFallback />}>
            <PsychiatricServices />
          </Suspense>
        </Route>
        <Route path="/psychiatric-evaluation">
          <Suspense fallback={<LoadingFallback />}>
            <PsychiatricEvaluation />
          </Suspense>
        </Route>
        <Route path="/psychiatrist-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <PsychiatristOrlando />
          </Suspense>
        </Route>
        <Route path="/psychiatry-clinic-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <PsychiatryClinicOrlando />
          </Suspense>
        </Route>
        <Route path="/psychiatrist-near-me">
          <Suspense fallback={<LoadingFallback />}>
            <PsychiatristNearMe />
          </Suspense>
        </Route>
        <Route path="/psychiatry-near-me">
          <Suspense fallback={<LoadingFallback />}>
            <PsychiatryNearMe />
          </Suspense>
        </Route>
        <Route path="/adhd-psychiatrist-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <ADHDPsychiatristOrlando />
          </Suspense>
        </Route>
        <Route path="/anxiety-psychiatrist-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <AnxietyPsychiatristOrlando />
          </Suspense>
        </Route>
        <Route path="/bipolar-psychiatrist-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <BipolarPsychiatristOrlando />
          </Suspense>
        </Route>
        <Route path="/depression-psychiatrist-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <DepressionPsychiatristOrlando />
          </Suspense>
        </Route>
        <Route path="/ptsd-psychiatrist-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <PTSDPsychiatristOrlando />
          </Suspense>
        </Route>
        <Route path="/urgent-psychiatric-care-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <UrgentPsychiatricCareOrlando />
          </Suspense>
        </Route>
        <Route path="/psychiatrist-orlando-accepts-umr">
          <Suspense fallback={<LoadingFallback />}>
            <PsychiatristOrlandoAcceptsUMR />
          </Suspense>
        </Route>
        <Route path="/child-psychiatrist-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <ChildPsychiatristOrlando />
          </Suspense>
        </Route>
        <Route path="/medication-management-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <MedicationManagementOrlando />
          </Suspense>
        </Route>
        <Route path="/telepsychiatry-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <TelepsychiatryOrlando />
          </Suspense>
        </Route>
        <Route path="/same-day-psychiatrist-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <SameDayPsychiatristOrlando />
          </Suspense>
        </Route>
        <Route path="/psychiatrist-for-anxiety-near-me">
          <Suspense fallback={<LoadingFallback />}>
            <PsychiatristForAnxietyNearMe />
          </Suspense>
        </Route>
        <Route path="/psychiatrist-for-depression-near-me">
          <Suspense fallback={<LoadingFallback />}>
            <PsychiatristForDepressionNearMe />
          </Suspense>
        </Route>
        <Route path="/psychiatric-evaluation-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <PsychiatricEvaluationOrlando />
          </Suspense>
        </Route>
        <Route path="/therapist-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <TherapistOrlando />
          </Suspense>
        </Route>
        <Route path="/mental-health-clinic-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <MentalHealthClinicOrlando />
          </Suspense>
        </Route>
        <Route path="/medicare-therapy-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <MedicareTherapyOrlando />
          </Suspense>
        </Route>
        <Route path="/medicare-psychiatrist-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <MedicarePsychiatristOrlando />
          </Suspense>
        </Route>
        <Route path="/psychologist-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <PsychologistOrlando />
          </Suspense>
        </Route>
        <Route path="/therapist-accepts-umr">
          <Suspense fallback={<LoadingFallback />}>
            <TherapistAcceptsUMR />
          </Suspense>
        </Route>
        <Route path="/therapist-accepts-oscar-health">
          <Suspense fallback={<LoadingFallback />}>
            <TherapistAcceptsOscarHealth />
          </Suspense>
        </Route>
        <Route path="/psychiatrist-orlando-accepts-bcbs">
          <Suspense fallback={<LoadingFallback />}>
            <PsychiatristOrlandoAcceptsBCBS />
          </Suspense>
        </Route>
        <Route path="/psychiatrist-orlando-accepts-cigna">
          <Suspense fallback={<LoadingFallback />}>
            <PsychiatristOrlandoAcceptsCigna />
          </Suspense>
        </Route>
        <Route path="/psychiatrist-orlando-accepts-aetna">
          <Suspense fallback={<LoadingFallback />}>
            <PsychiatristOrlandoAcceptsAetna />
          </Suspense>
        </Route>
        <Route path="/psychiatrist-orlando-accepts-united-healthcare">
          <Suspense fallback={<LoadingFallback />}>
            <PsychiatristOrlandoAcceptsUnitedHealthcare />
          </Suspense>
        </Route>
        <Route path="/psychiatry-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <PsychiatryOrlando />
          </Suspense>
        </Route>
        <Route path="/ocd-psychiatrist-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <OcdPsychiatristOrlando />
          </Suspense>
        </Route>
        <Route path="/schizophrenia-psychiatrist-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <SchizophreniaPsychiatristOrlando />
          </Suspense>
        </Route>
        <Route path="/insomnia-psychiatrist-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <InsomniaPsychiatristOrlando />
          </Suspense>
        </Route>
        <Route path="/sunshine-health-therapy">
          <Suspense fallback={<LoadingFallback />}>
            <SunshineHealthTherapy />
          </Suspense>
        </Route>
        <Route path="/locations/altamonte-springs">
          <Suspense fallback={<LoadingFallback />}>
            <PsychiatristAltamonteSprings />
          </Suspense>
        </Route>
        <Route path="/adhd-testing-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <ADHDTestingOrlando />
          </Suspense>
        </Route>
        <Route path="/psychiatrist-accepting-new-patients-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <PsychiatristAcceptingNewPatientsOrlando />
          </Suspense>
        </Route>
        <Route path="/online-psychiatrist-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <OnlinePsychiatristOrlando />
          </Suspense>
        </Route>
        <Route path="/best-psychiatrist-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <BestPsychiatristOrlando />
          </Suspense>
        </Route>
        <Route path="/online-psychiatrist-florida">
          <Suspense fallback={<LoadingFallback />}>
            <OnlinePsychiatristFlorida />
          </Suspense>
        </Route>
        <Route path="/mental-health-doctor-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <MentalHealthDoctorOrlando />
          </Suspense>
        </Route>
        <Route path="/trauma-psychiatrist-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <TraumaPsychiatristOrlando />
          </Suspense>
        </Route>
        <Route path="/psychiatrist-near-ucf">
          <Suspense fallback={<LoadingFallback />}>
            <PsychiatristNearUcf />
          </Suspense>
        </Route>
        <Route path="/blue-cross-blue-shield-therapy-orlando">
          <Suspense fallback={<LoadingFallback />}>
            <BlueCrossBlueShieldTherapy />
          </Suspense>
        </Route>
        <Route path="/about">
          <Suspense fallback={<LoadingFallback />}>
            <About />
          </Suspense>
        </Route>
        <Route path="/privacy-policy">
          <Suspense fallback={<LoadingFallback />}>
            <PrivacyPolicy />
          </Suspense>
        </Route>
        <Route path="/medical-disclaimer">
          <Suspense fallback={<LoadingFallback />}>
            <MedicalDisclaimer />
          </Suspense>
        </Route>
        <Route path="/locations/:slug">
          <Suspense fallback={<LoadingFallback />}>
            <LocationDetail />
          </Suspense>
        </Route>
        <Route path="/:slug">
          <Suspense fallback={<LoadingFallback />}>
            <PageBySlug />
          </Suspense>
        </Route>
        <Route>
          <Suspense fallback={<LoadingFallback />}>
            <NotFound />
          </Suspense>
        </Route>
      </Switch>
      {showStickyCTA && (
        <Suspense fallback={null}>
          <StickyMobileCTA />
        </Suspense>
      )}
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

function App() {
  useEffect(() => {
    const loadAnalytics = () => {
      Promise.all([
        import("@/lib/analytics"),
        import("@/lib/web-vitals-tracker"),
        import("@/lib/utm-tracker")
      ]).then(([analytics, webVitals, utm]) => {
        // CRITICAL: Run UTM tracking FIRST to save GCLID before Clarity tags session
        // This ensures GCLID is in sessionStorage when Clarity reads attribution data
        utm.initUTMTracking();
        
        // Then initialize analytics (Clarity will read from sessionStorage after delay)
        analytics.initGA();
        analytics.initFacebookPixel();
        analytics.initMicrosoftClarity();
        webVitals.initWebVitals();
      }).catch((error) => {
        console.error('Failed to load analytics:', error);
      });
    };

    // CRITICAL TBT OPTIMIZATION: Delay ALL analytics until after page is fully loaded
    // This prevents analytics from blocking main thread during critical rendering phase
    // Reduces TBT from ~400ms to <200ms
    if (document.readyState === 'complete') {
      // Page already loaded, delay slightly with requestIdleCallback
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => loadAnalytics(), { timeout: 1000 });
      } else {
        setTimeout(() => loadAnalytics(), 500);
      }
    } else {
      // Wait for full page load, THEN use requestIdleCallback
      window.addEventListener('load', () => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => loadAnalytics(), { timeout: 1000 });
        } else {
          setTimeout(() => loadAnalytics(), 500);
        }
      }, { once: true });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
