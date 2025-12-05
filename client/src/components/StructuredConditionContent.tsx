import { CheckCircle2, AlertCircle, Stethoscope, Pill, Phone, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface ConditionSection {
  symptoms?: string[];
  causes?: string[];
  diagnosis?: string[];
  treatments?: string[];
  whenToSeekHelp?: string[];
}

interface StructuredConditionContentProps {
  conditionName: string;
  sections: ConditionSection;
  ctaText?: string;
  ctaPhone?: string;
  className?: string;
}

export default function StructuredConditionContent({ 
  conditionName, 
  sections,
  ctaText = "Schedule Appointment",
  ctaPhone = "386-848-8751",
  className = "" 
}: StructuredConditionContentProps) {
  return (
    <div className={`space-y-8 ${className}`} data-testid="structured-condition-content">
      {sections.symptoms && sections.symptoms.length > 0 && (
        <section>
          <h2 className="text-2xl font-sans font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-primary" />
            Common {conditionName} Symptoms
          </h2>
          <p className="text-muted-foreground mb-4">
            Recognizing the symptoms of {conditionName.toLowerCase()} is the first step toward getting help. 
            Common symptoms include:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sections.symptoms.map((symptom, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{symptom}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {sections.causes && sections.causes.length > 0 && (
        <section>
          <h2 className="text-2xl font-sans font-bold text-foreground mb-4 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            What Causes {conditionName}?
          </h2>
          <p className="text-muted-foreground mb-4">
            {conditionName} can develop from a combination of factors. Understanding the causes helps 
            guide effective treatment:
          </p>
          <ul className="space-y-2">
            {sections.causes.map((cause, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span className="text-foreground">{cause}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {sections.diagnosis && sections.diagnosis.length > 0 && (
        <section>
          <h2 className="text-2xl font-sans font-bold text-foreground mb-4 flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-primary" />
            How Is {conditionName} Diagnosed?
          </h2>
          <p className="text-muted-foreground mb-4">
            Our board-certified psychiatrists use comprehensive evaluation methods to accurately diagnose {conditionName.toLowerCase()}:
          </p>
          <ol className="space-y-3">
            {sections.diagnosis.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white text-sm font-bold flex-shrink-0">
                  {idx + 1}
                </span>
                <span className="text-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {sections.treatments && sections.treatments.length > 0 && (
        <section>
          <h2 className="text-2xl font-sans font-bold text-foreground mb-4 flex items-center gap-2">
            <Pill className="h-6 w-6 text-primary" />
            {conditionName} Treatment Options
          </h2>
          <p className="text-muted-foreground mb-4">
            Evidence-based treatment approaches for {conditionName.toLowerCase()} include:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sections.treatments.map((treatment, idx) => (
              <div key={idx} className="flex items-start gap-2 p-3 bg-card border rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{treatment}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {sections.whenToSeekHelp && sections.whenToSeekHelp.length > 0 && (
        <section className="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <h2 className="text-2xl font-sans font-bold text-foreground mb-4 flex items-center gap-2">
            <Phone className="h-6 w-6 text-primary" />
            When to Seek Help for {conditionName}
          </h2>
          <p className="text-muted-foreground mb-4">
            Consider reaching out to a mental health professional if you experience:
          </p>
          <ul className="space-y-2 mb-6">
            {sections.whenToSeekHelp.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{point}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" data-testid="button-condition-cta">
              <a href="#contact-form">{ctaText}</a>
            </Button>
            <Button variant="outline" size="lg" asChild data-testid="button-condition-phone">
              <a href={`tel:${ctaPhone.replace(/-/g, '')}`}>Call {ctaPhone}</a>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}

export const CONDITION_CONTENT: Record<string, ConditionSection> = {
  anxiety: {
    symptoms: [
      "Excessive worry or fear that's difficult to control",
      "Restlessness or feeling on edge",
      "Rapid heartbeat or palpitations",
      "Sweating, trembling, or shaking",
      "Difficulty concentrating or mind going blank",
      "Sleep problems (trouble falling or staying asleep)",
      "Muscle tension or physical discomfort",
      "Avoiding situations that trigger anxiety"
    ],
    causes: [
      "Genetic factors - anxiety disorders often run in families",
      "Brain chemistry imbalances affecting neurotransmitters",
      "Traumatic or stressful life experiences",
      "Medical conditions (thyroid problems, heart conditions)",
      "Substance use or withdrawal effects",
      "Personality traits and temperament"
    ],
    diagnosis: [
      "Comprehensive psychiatric evaluation with symptom assessment",
      "Review of medical history and current medications",
      "Screening for co-occurring conditions (depression, PTSD)",
      "Physical examination to rule out medical causes",
      "Standardized anxiety assessment questionnaires"
    ],
    treatments: [
      "SSRI/SNRI antidepressant medications",
      "Non-benzodiazepine anti-anxiety medications",
      "Cognitive Behavioral Therapy (CBT)",
      "Exposure therapy for phobias",
      "Relaxation techniques and mindfulness",
      "Lifestyle modifications (exercise, sleep hygiene)"
    ],
    whenToSeekHelp: [
      "Anxiety interferes with work, school, or relationships",
      "You avoid activities or places due to fear",
      "Physical symptoms like panic attacks occur regularly",
      "You use alcohol or drugs to cope with anxiety",
      "Anxiety persists for weeks without improvement"
    ]
  },
  adhd: {
    symptoms: [
      "Difficulty sustaining attention on tasks or activities",
      "Easily distracted by unrelated thoughts or stimuli",
      "Trouble following through on instructions",
      "Poor organizational skills and time management",
      "Frequently losing items needed for tasks",
      "Fidgeting, restlessness, or inability to sit still",
      "Talking excessively or interrupting others",
      "Impulsive decision-making without thinking of consequences"
    ],
    causes: [
      "Genetic factors - ADHD is highly heritable",
      "Differences in brain structure and function",
      "Premature birth or low birth weight",
      "Prenatal exposure to alcohol, tobacco, or toxins",
      "Early childhood exposure to environmental toxins",
      "Brain injuries affecting frontal regions"
    ],
    diagnosis: [
      "Comprehensive clinical interview about symptoms and history",
      "ADHD-specific rating scales and questionnaires",
      "Review of childhood symptoms (ADHD begins before age 12)",
      "Assessment of symptoms across multiple settings",
      "Ruling out other conditions that mimic ADHD"
    ],
    treatments: [
      "Stimulant medications (Adderall, Vyvanse, Ritalin)",
      "Non-stimulant medications (Strattera, Intuniv, Qelbree)",
      "Behavioral therapy and coaching",
      "Organizational skills training",
      "Parent training and family therapy",
      "Educational accommodations and support"
    ],
    whenToSeekHelp: [
      "ADHD symptoms significantly impact work or school performance",
      "Relationships suffer due to inattention or impulsivity",
      "You struggle with time management and organization daily",
      "Self-esteem is affected by ongoing challenges",
      "Current treatments aren't providing adequate symptom control"
    ]
  },
  depression: {
    symptoms: [
      "Persistent sad, anxious, or 'empty' mood",
      "Loss of interest in activities once enjoyed",
      "Significant changes in appetite or weight",
      "Sleep disturbances (insomnia or oversleeping)",
      "Fatigue and decreased energy",
      "Difficulty concentrating or making decisions",
      "Feelings of worthlessness or excessive guilt",
      "Thoughts of death or suicide"
    ],
    causes: [
      "Brain chemistry imbalances (serotonin, norepinephrine, dopamine)",
      "Genetic predisposition to mood disorders",
      "Traumatic or stressful life events",
      "Chronic medical conditions",
      "Certain medications as side effects",
      "Hormonal changes (postpartum, menopause)"
    ],
    diagnosis: [
      "Comprehensive psychiatric evaluation",
      "Standardized depression screening tools (PHQ-9)",
      "Assessment of symptom duration and severity",
      "Medical evaluation to rule out underlying conditions",
      "Review of medication and substance use history"
    ],
    treatments: [
      "Antidepressant medications (SSRIs, SNRIs, other classes)",
      "Psychotherapy (CBT, interpersonal therapy)",
      "Combination medication and therapy approach",
      "TMS therapy for treatment-resistant depression",
      "Lifestyle interventions (exercise, sleep, nutrition)",
      "Support groups and peer support"
    ],
    whenToSeekHelp: [
      "Depressed mood persists for more than two weeks",
      "Daily activities become difficult to manage",
      "Thoughts of self-harm or suicide occur",
      "Physical symptoms like chronic pain accompany low mood",
      "Previous treatments have stopped working"
    ]
  },
  bipolar: {
    symptoms: [
      "Manic episodes with elevated or irritable mood",
      "Decreased need for sleep during manic periods",
      "Racing thoughts and rapid speech",
      "Grandiosity or inflated self-esteem",
      "Increased goal-directed activity or agitation",
      "Depressive episodes with low mood and hopelessness",
      "Significant changes in energy levels",
      "Impulsive or risky behavior during mania"
    ],
    causes: [
      "Strong genetic component - runs in families",
      "Brain structure and function differences",
      "Neurotransmitter imbalances",
      "Stressful life events triggering episodes",
      "Sleep disruption as a trigger",
      "Substance use affecting mood stability"
    ],
    diagnosis: [
      "Detailed psychiatric evaluation of mood history",
      "Assessment of manic and depressive episode patterns",
      "Family history review for mood disorders",
      "Ruling out medical conditions and substance effects",
      "Mood charting and symptom tracking"
    ],
    treatments: [
      "Mood stabilizers (lithium, Depakote, Lamictal)",
      "Atypical antipsychotics for mood stabilization",
      "Careful use of antidepressants when indicated",
      "Psychoeducation about the condition",
      "Cognitive behavioral therapy adapted for bipolar",
      "Regular sleep schedule and routine maintenance"
    ],
    whenToSeekHelp: [
      "You experience extreme mood swings affecting function",
      "Sleep patterns are severely disrupted",
      "Impulsive decisions lead to negative consequences",
      "Current medications aren't controlling symptoms",
      "Warning signs of manic or depressive episode emerge"
    ]
  },
  ptsd: {
    symptoms: [
      "Intrusive memories or flashbacks of trauma",
      "Nightmares related to traumatic events",
      "Severe emotional distress when reminded of trauma",
      "Avoidance of trauma-related thoughts or reminders",
      "Negative changes in mood and thinking",
      "Feeling detached or estranged from others",
      "Hypervigilance and being easily startled",
      "Difficulty sleeping and concentrating"
    ],
    causes: [
      "Exposure to traumatic events (combat, assault, accidents)",
      "Witnessing violence or death",
      "Childhood abuse or neglect",
      "Natural disasters or terrorism",
      "Sudden loss of a loved one",
      "Medical trauma (serious illness, procedures)"
    ],
    diagnosis: [
      "Clinical interview assessing trauma exposure",
      "Evaluation using PTSD-specific screening tools",
      "Assessment of symptom duration (over 1 month)",
      "Review of functional impairment",
      "Screening for co-occurring depression and anxiety"
    ],
    treatments: [
      "EMDR (Eye Movement Desensitization and Reprocessing)",
      "Trauma-focused cognitive behavioral therapy",
      "SSRI/SNRI medications (Zoloft, Paxil, Effexor)",
      "Prazosin for trauma-related nightmares",
      "Prolonged exposure therapy",
      "Supportive counseling and group therapy"
    ],
    whenToSeekHelp: [
      "Trauma symptoms persist for more than one month",
      "Flashbacks or nightmares significantly disrupt life",
      "You avoid places, people, or activities due to trauma",
      "Relationships or work performance suffer",
      "You use substances to cope with symptoms"
    ]
  },
  ocd: {
    symptoms: [
      "Unwanted, intrusive thoughts (obsessions)",
      "Fear of contamination or germs",
      "Need for symmetry or exactness",
      "Aggressive or disturbing thoughts",
      "Excessive cleaning or handwashing (compulsions)",
      "Checking behaviors (locks, appliances, etc.)",
      "Counting, ordering, or arranging rituals",
      "Mental rituals to neutralize obsessions"
    ],
    causes: [
      "Genetic factors - higher risk with family history",
      "Brain structure differences in frontal cortex",
      "Serotonin system dysfunction",
      "Environmental factors and stress",
      "Childhood strep infections (PANDAS)",
      "Learning and conditioning experiences"
    ],
    diagnosis: [
      "Clinical interview assessing obsessions and compulsions",
      "Yale-Brown Obsessive Compulsive Scale (Y-BOCS)",
      "Assessment of time spent on symptoms daily",
      "Evaluation of functional impairment",
      "Ruling out other anxiety disorders"
    ],
    treatments: [
      "SSRI medications at higher doses",
      "Exposure and Response Prevention (ERP) therapy",
      "Cognitive behavioral therapy for OCD",
      "Combination medication and therapy approach",
      "Acceptance and Commitment Therapy (ACT)",
      "Support groups for OCD"
    ],
    whenToSeekHelp: [
      "Obsessions or compulsions take up more than 1 hour daily",
      "Rituals interfere with work, school, or relationships",
      "You recognize thoughts are excessive but can't stop",
      "Avoidance behaviors limit your activities",
      "Distress from symptoms affects quality of life"
    ]
  }
};
