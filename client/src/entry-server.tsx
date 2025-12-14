import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { memoryLocation } from "wouter/memory-location";

// Import all page components for SSR (non-lazy for prerendering)
import Home from "@/pages/Home";
import Insurance from "@/pages/Insurance";
import Therapy from "@/pages/Therapy";
import TeamPage from "@/pages/TeamPage";
import ServicesPage from "@/pages/ServicesPage";
import RequestAppointment from "@/pages/RequestAppointment";
import NewPatients from "@/pages/NewPatients";
import Pricing from "@/pages/Pricing";
import AffordableCare from "@/pages/AffordableCare";
import StressManagement from "@/pages/StressManagement";
import PsychotherapistOrlando from "@/pages/PsychotherapistOrlando";
import MentalHealthServicesOrlando from "@/pages/MentalHealthServicesOrlando";
import TherapistMaitland from "@/pages/TherapistMaitland";
import EMDRTherapy from "@/pages/EMDRTherapy";
import TMSTreatment from "@/pages/TMSTreatment";
import TraumaSpecialist from "@/pages/TraumaSpecialist";
import FemaleTherapistOrlando from "@/pages/FemaleTherapistOrlando";
import BlackPsychiatristOrlando from "@/pages/BlackPsychiatristOrlando";
import VirtualTherapy from "@/pages/VirtualTherapy";
import CrisisTherapy from "@/pages/CrisisTherapy";
import DepressionCounseling from "@/pages/DepressionCounseling";
import DepressionTreatment from "@/pages/DepressionTreatment";
import AnxietyTherapy from "@/pages/AnxietyTherapy";
import AnxietyTreatment from "@/pages/AnxietyTreatment";
import CognitiveBehavioralTherapy from "@/pages/CognitiveBehavioralTherapy";
import CouplesCounseling from "@/pages/CouplesCounseling";
import CounselorNearMe from "@/pages/CounselorNearMe";
import MentalHealthNearMe from "@/pages/MentalHealthNearMe";
import TherapyNearMe from "@/pages/TherapyNearMe";
import CounselingOrlando from "@/pages/CounselingOrlando";
import TherapyOviedo from "@/pages/TherapyOviedo";
import Psychiatrist from "@/pages/Psychiatrist";
import PsychiatricServices from "@/pages/PsychiatricServices";
import PsychiatricEvaluation from "@/pages/PsychiatricEvaluation";
import PsychiatristOrlando from "@/pages/PsychiatristOrlando";
import PsychiatryClinicOrlando from "@/pages/PsychiatryClinicOrlando";
import PsychiatristNearMe from "@/pages/PsychiatristNearMe";
import PsychiatryNearMe from "@/pages/PsychiatryNearMe";
import ADHDPsychiatristOrlando from "@/pages/ADHDPsychiatristOrlando";
import AnxietyPsychiatristOrlando from "@/pages/AnxietyPsychiatristOrlando";
import BipolarPsychiatristOrlando from "@/pages/BipolarPsychiatristOrlando";
import DepressionPsychiatristOrlando from "@/pages/DepressionPsychiatristOrlando";
import PTSDPsychiatristOrlando from "@/pages/PTSDPsychiatristOrlando";
import UrgentPsychiatricCareOrlando from "@/pages/UrgentPsychiatricCareOrlando";
import PsychiatristOrlandoAcceptsUMR from "@/pages/PsychiatristOrlandoAcceptsUMR";
import ChildPsychiatristOrlando from "@/pages/ChildPsychiatristOrlando";
import MedicationManagementOrlando from "@/pages/MedicationManagementOrlando";
import TelepsychiatryOrlando from "@/pages/TelepsychiatryOrlando";
import SameDayPsychiatristOrlando from "@/pages/SameDayPsychiatristOrlando";
import PsychiatristForAnxietyNearMe from "@/pages/PsychiatristForAnxietyNearMe";
import PsychiatristForDepressionNearMe from "@/pages/PsychiatristForDepressionNearMe";
import PsychiatricEvaluationOrlando from "@/pages/PsychiatricEvaluationOrlando";
import TherapistOrlando from "@/pages/TherapistOrlando";
import MentalHealthClinicOrlando from "@/pages/MentalHealthClinicOrlando";
import MedicareTherapyOrlando from "@/pages/MedicareTherapyOrlando";
import MedicarePsychiatristOrlando from "@/pages/MedicarePsychiatristOrlando";
import PsychologistOrlando from "@/pages/PsychologistOrlando";
import TherapistAcceptsUMR from "@/pages/TherapistAcceptsUMR";
import TherapistAcceptsOscarHealth from "@/pages/TherapistAcceptsOscarHealth";
import PsychiatristOrlandoAcceptsBCBS from "@/pages/PsychiatristOrlandoAcceptsBCBS";
import PsychiatristOrlandoAcceptsCigna from "@/pages/PsychiatristOrlandoAcceptsCigna";
import PsychiatristOrlandoAcceptsAetna from "@/pages/PsychiatristOrlandoAcceptsAetna";
import PsychiatristOrlandoAcceptsUnitedHealthcare from "@/pages/PsychiatristOrlandoAcceptsUnitedHealthcare";
import PsychiatryOrlando from "@/pages/PsychiatryOrlando";
import OcdPsychiatristOrlando from "@/pages/OcdPsychiatristOrlando";
import SchizophreniaPsychiatristOrlando from "@/pages/SchizophreniaPsychiatristOrlando";
import InsomniaPsychiatristOrlando from "@/pages/InsomniaPsychiatristOrlando";
import SunshineHealthTherapy from "@/pages/SunshineHealthTherapy";
import ADHDTestingOrlando from "@/pages/ADHDTestingOrlando";
import TraumaPsychiatristOrlando from "@/pages/TraumaPsychiatristOrlando";
import PsychiatristNearUcf from "@/pages/PsychiatristNearUcf";
import BestPsychiatristOrlando from "@/pages/BestPsychiatristOrlando";
import OnlinePsychiatristOrlando from "@/pages/OnlinePsychiatristOrlando";
import OnlinePsychiatristFlorida from "@/pages/OnlinePsychiatristFlorida";
import MentalHealthDoctorOrlando from "@/pages/MentalHealthDoctorOrlando";
import PsychiatristAcceptingNewPatientsOrlando from "@/pages/PsychiatristAcceptingNewPatientsOrlando";

// Route to component mapping for SSR
const routeComponents: Record<string, () => JSX.Element> = {
  "/": () => <Home />,
  "/insurance": () => <Insurance />,
  "/therapy": () => <Therapy />,
  "/team": () => <TeamPage />,
  "/services": () => <ServicesPage />,
  "/request-appointment": () => <RequestAppointment />,
  "/new-patients": () => <NewPatients />,
  "/pricing": () => <Pricing />,
  "/affordable-care": () => <AffordableCare />,
  "/stress-management": () => <StressManagement />,
  "/psychotherapist-orlando": () => <PsychotherapistOrlando />,
  "/mental-health-services-orlando": () => <MentalHealthServicesOrlando />,
  "/therapist-maitland": () => <TherapistMaitland />,
  "/emdr-therapy": () => <EMDRTherapy />,
  "/tms-treatment": () => <TMSTreatment />,
  "/trauma-specialist-near-me": () => <TraumaSpecialist />,
  "/female-therapist-orlando": () => <FemaleTherapistOrlando />,
  "/black-psychiatrist-orlando": () => <BlackPsychiatristOrlando />,
  "/virtual-therapy": () => <VirtualTherapy />,
  "/crisis-therapy": () => <CrisisTherapy />,
  "/depression-counseling": () => <DepressionCounseling />,
  "/depression-treatment": () => <DepressionTreatment />,
  "/anxiety-therapy": () => <AnxietyTherapy />,
  "/anxiety-treatment": () => <AnxietyTreatment />,
  "/cognitive-behavioral-therapy": () => <CognitiveBehavioralTherapy />,
  "/couples-counseling": () => <CouplesCounseling />,
  "/counselor-near-me": () => <CounselorNearMe />,
  "/mental-health-near-me": () => <MentalHealthNearMe />,
  "/therapy-near-me": () => <TherapyNearMe />,
  "/counseling-orlando": () => <CounselingOrlando />,
  "/therapy-oviedo": () => <TherapyOviedo />,
  "/psychiatrist": () => <Psychiatrist />,
  "/psychiatric-services": () => <PsychiatricServices />,
  "/psychiatric-evaluation": () => <PsychiatricEvaluation />,
  "/psychiatrist-orlando": () => <PsychiatristOrlando />,
  "/psychiatry-clinic-orlando": () => <PsychiatryClinicOrlando />,
  "/psychiatrist-near-me": () => <PsychiatristNearMe />,
  "/psychiatry-near-me": () => <PsychiatryNearMe />,
  "/adhd-psychiatrist-orlando": () => <ADHDPsychiatristOrlando />,
  "/anxiety-psychiatrist-orlando": () => <AnxietyPsychiatristOrlando />,
  "/bipolar-psychiatrist-orlando": () => <BipolarPsychiatristOrlando />,
  "/depression-psychiatrist-orlando": () => <DepressionPsychiatristOrlando />,
  "/ptsd-psychiatrist-orlando": () => <PTSDPsychiatristOrlando />,
  "/urgent-psychiatric-care-orlando": () => <UrgentPsychiatricCareOrlando />,
  "/psychiatrist-orlando-accepts-umr": () => <PsychiatristOrlandoAcceptsUMR />,
  "/child-psychiatrist-orlando": () => <ChildPsychiatristOrlando />,
  "/medication-management-orlando": () => <MedicationManagementOrlando />,
  "/telepsychiatry-orlando": () => <TelepsychiatryOrlando />,
  "/same-day-psychiatrist-orlando": () => <SameDayPsychiatristOrlando />,
  "/psychiatrist-for-anxiety-near-me": () => <PsychiatristForAnxietyNearMe />,
  "/psychiatrist-for-depression-near-me": () => <PsychiatristForDepressionNearMe />,
  "/psychiatric-evaluation-orlando": () => <PsychiatricEvaluationOrlando />,
  "/therapist-orlando": () => <TherapistOrlando />,
  "/mental-health-clinic-orlando": () => <MentalHealthClinicOrlando />,
  "/medicare-therapy-orlando": () => <MedicareTherapyOrlando />,
  "/medicare-psychiatrist-orlando": () => <MedicarePsychiatristOrlando />,
  "/psychologist-orlando": () => <PsychologistOrlando />,
  "/therapist-accepts-umr": () => <TherapistAcceptsUMR />,
  "/therapist-accepts-oscar-health": () => <TherapistAcceptsOscarHealth />,
  "/psychiatrist-orlando-accepts-bcbs": () => <PsychiatristOrlandoAcceptsBCBS />,
  "/psychiatrist-orlando-accepts-cigna": () => <PsychiatristOrlandoAcceptsCigna />,
  "/psychiatrist-orlando-accepts-aetna": () => <PsychiatristOrlandoAcceptsAetna />,
  "/psychiatrist-orlando-accepts-united-healthcare": () => <PsychiatristOrlandoAcceptsUnitedHealthcare />,
  "/psychiatry-orlando": () => <PsychiatryOrlando />,
  "/ocd-psychiatrist-orlando": () => <OcdPsychiatristOrlando />,
  "/schizophrenia-psychiatrist-orlando": () => <SchizophreniaPsychiatristOrlando />,
  "/insomnia-psychiatrist-orlando": () => <InsomniaPsychiatristOrlando />,
  "/sunshine-health-therapy": () => <SunshineHealthTherapy />,
  "/adhd-testing-orlando": () => <ADHDTestingOrlando />,
  "/trauma-psychiatrist-orlando": () => <TraumaPsychiatristOrlando />,
  "/psychiatrist-near-ucf": () => <PsychiatristNearUcf />,
  "/best-psychiatrist-orlando": () => <BestPsychiatristOrlando />,
  "/online-psychiatrist-orlando": () => <OnlinePsychiatristOrlando />,
  "/online-psychiatrist-florida": () => <OnlinePsychiatristFlorida />,
  "/mental-health-doctor-orlando": () => <MentalHealthDoctorOrlando />,
  "/psychiatrist-accepting-new-patients-orlando": () => <PsychiatristAcceptingNewPatientsOrlando />,
};

// Export list of routes for prerendering
export const prerenderRoutes = Object.keys(routeComponents);

// Server-side render function
export function render(url: string): string {
  const PageComponent = routeComponents[url];
  
  if (!PageComponent) {
    return "";
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        retry: false,
      },
    },
  });

  // Create a static memory location for SSR
  const { hook } = memoryLocation({ path: url, static: true });

  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router hook={hook}>
          <PageComponent />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );

  return html;
}
