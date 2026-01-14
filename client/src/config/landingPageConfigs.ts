import type { LandingPageConfig } from "@/types/landingPage";
const heroImage = "/attached_assets/stock_images/professional_healthc_955227e9.jpg";
import { FileText, Brain, Shield, Award, Calendar, Video, MessageCircle, Users, CheckCircle, Heart, DollarSign, CreditCard, Clock } from "lucide-react";

export const psychiatricEvaluationConfig: LandingPageConfig = {
  seo: {
    title: "Psychiatric Evaluation Orlando FL | Same-Week Apts",
    description: "Expert psychiatric evaluations in Orlando by board-certified psychiatrists. Accurate diagnosis and treatment planning. Same-week appointments. Call 386-848-8751.",
    keywords: ["psychiatric evaluation orlando", "psych evaluation near me", "mental evaluation orlando", "psychological testing orlando", "psychiatric assessment orlando fl", "mental health evaluation orlando", "psychiatrist evaluation orlando"],
    canonicalPath: "/psychiatric-evaluation-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness", "Psychiatrist"],
    "name": "Psychiatric Evaluation Orlando FL - Empathy Health Clinic",
    "description": "Comprehensive psychiatric evaluations in Orlando, FL by board-certified psychiatrists.",
    "url": "https://empathyhealthclinic.com/psychiatric-evaluation-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "medicalSpecialty": "Psychiatry"
  },
  hero: {
    title: "Psychiatric Evaluation in Orlando, FL",
    subtitle: "Comprehensive mental health assessments by board-certified psychiatrists. Accurate diagnosis, personalized treatment planning, and same-week appointments available. In-person and telehealth options. Most insurance accepted.",
    ctaPrimary: "Schedule Evaluation",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Same-Week Appointments Available", "Telehealth & In-Person Options"],
  },
  location: {
    title: "Orlando Metro Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth & in-person available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Comprehensive Psychiatric Evaluations in Orlando",
    introduction: [
      "A comprehensive psychiatric evaluation is the first step toward understanding and improving your mental health. At Empathy Health Clinic, our board-certified psychiatrists in Orlando provide thorough, compassionate mental health assessments that form the foundation for effective treatment.",
      "Whether you're seeking help for the first time or looking for a second opinion, our Orlando psychiatric evaluations provide accurate diagnoses and personalized treatment recommendations. We serve patients throughout Orlando, Winter Park, Altamonte Springs, and surrounding areas with both in-person and telehealth appointments.",
      "Same-week appointments are typically available, because we understand that when you're ready to seek help, waiting weeks or months isn't an option."
    ],
    conditionsHeading: "Conditions We Evaluate & Diagnose",
    conditions: [
      { name: "Anxiety & Panic Disorders" },
      { name: "Depression & Mood Disorders" },
      { name: "ADHD", description: "Adult & Adolescent" },
      { name: "Bipolar Disorder" },
      { name: "OCD & Obsessive Disorders" },
      { name: "PTSD & Trauma Disorders" },
      { name: "Eating Disorders" },
      { name: "Personality Disorders" },
      { name: "Schizophrenia & Psychotic Disorders" },
      { name: "Substance Use Disorders" },
    ],
    servicesHeading: "What's Included in Your Evaluation",
    services: [
      {
        icon: FileText,
        title: "Comprehensive Symptom Review",
        description: "Detailed discussion of your current symptoms, when they started, and how they impact your daily life."
      },
      {
        icon: Brain,
        title: "Mental Status Examination",
        description: "Professional assessment of your mood, thought patterns, cognitive function, and overall mental state."
      },
      {
        icon: Shield,
        title: "Accurate Diagnosis & Treatment Plan",
        description: "Clear explanation of your condition based on DSM-5 criteria with personalized treatment recommendations."
      },
    ],
    whyChooseHeading: "Why Choose Empathy Health Clinic?",
    whyChoosePoints: [
      {
        icon: Award,
        title: "Board-Certified Psychiatrists",
        description: "All evaluations conducted by psychiatrists board-certified by the American Board of Psychiatry and Neurology, ensuring the highest diagnostic accuracy."
      },
      {
        icon: Calendar,
        title: "Same-Week Appointments",
        description: "Unlike many Orlando psychiatry practices with months-long wait times, we typically offer same-week appointments for new patient evaluations."
      },
      {
        icon: Video,
        title: "Telehealth & In-Person Options",
        description: "Choose the evaluation format that works best for you. Our HIPAA-compliant telehealth platform provides the same thorough assessment as in-person visits."
      },
    ],
  },
  faqs: [
    {
      question: "How long does a psychiatric evaluation take?",
      answer: "Initial psychiatric evaluations typically last 45-60 minutes. This gives your psychiatrist adequate time to thoroughly understand your symptoms, history, and needs, and to develop an effective treatment plan."
    },
    {
      question: "Do I need a referral for a psychiatric evaluation?",
      answer: "No referral is required to schedule a psychiatric evaluation. You can call our office directly at 386-848-8751. However, some insurance plans may require a referral for coverage, so check with your insurance provider."
    },
    {
      question: "Will I get a prescription at my first appointment?",
      answer: "If medication is recommended as part of your treatment plan, your psychiatrist can prescribe it during your first evaluation. Prescriptions are sent electronically to your preferred pharmacy the same day."
    },
    {
      question: "How much does a psychiatric evaluation cost in Orlando?",
      answer: "Cost depends on your insurance coverage. We accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, and Humana. We'll verify your benefits before your appointment. For self-pay patients, please call for pricing."
    },
  ],
  sidebar: {
    formHeading: "Schedule Your Evaluation",
    formSubheading: "Same-week appointments available. Most insurance accepted.",
    formType: "psychiatric_evaluation",
    quickLinks: [
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/adhd-psychiatrist-orlando", label: "ADHD Psychiatrist" },
      { href: "/anxiety-psychiatrist-orlando", label: "Anxiety Psychiatrist" },
      { href: "/medication-management-orlando", label: "Medication Management" },
      { href: "/telepsychiatry-orlando", label: "Telepsychiatry" },
      { href: "/new-patients", label: "New Patients" },
      { href: "/best-psychiatrist-orlando", label: "Best Psychiatrist Orlando" },
      { href: "/mental-health-doctor-orlando", label: "Mental Health Doctor" },
      { href: "/online-psychiatrist-florida", label: "Online Psychiatrist FL" },
    ],
  },
  analytics: {
    pageName: "Psychiatric Evaluation Orlando Page",
    conversionCategory: "psychiatric_eval",
  },
};

export const therapistOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Therapist Orlando FL | Licensed Counselors Near You",
    description: "Licensed therapists in Orlando, FL. CBT, DBT, EMDR for anxiety, depression, trauma. Same-week appointments, telehealth available. Call 386-848-8751.",
    keywords: ["therapist orlando", "therapist near me", "therapist orlando fl", "licensed therapist orlando", "counselor orlando", "therapy orlando fl", "orlando therapist", "therapists in orlando fl"],
    canonicalPath: "/therapist-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness", "Psychologist"],
    "name": "Therapist Orlando FL - Empathy Health Clinic",
    "description": "Licensed therapists in Orlando providing CBT, DBT, EMDR therapy for anxiety, depression, trauma, and couples counseling.",
    "url": "https://empathyhealthclinic.com/therapist-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1155 Louisiana Ave Suite 202",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32789",
      "addressCountry": "US"
    }
  },
  hero: {
    title: "Licensed Therapist in Orlando, FL",
    subtitle: "Expert counseling for anxiety, depression, trauma, relationships, and life transitions. Evidence-based CBT, DBT, and EMDR therapy. Same-week appointments available with flexible in-person and telehealth options. Most insurance accepted.",
    ctaPrimary: "Request Appointment",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Same-Week Appointments", "In-Person & Telehealth"],
  },
  location: {
    title: "Our Orlando Location",
    address: "1155 Louisiana Ave Suite 202",
    city: "Winter Park",
    state: "FL",
    zip: "32789",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth & in-person available",
    mapUrl: "https://maps.google.com/?q=1155+Louisiana+Ave+Suite+202+Winter+Park+FL+32789",
  },
  content: {
    mainHeading: "Expert Therapy Services in Orlando",
    introduction: [
      "Finding the right therapist in Orlando can feel overwhelming. At Empathy Health Clinic, our licensed therapists provide evidence-based counseling tailored to your unique needs. Whether you're struggling with anxiety, depression, relationship issues, or life transitions, we're here to help.",
      "Our Orlando therapists are trained in the most effective therapeutic approaches, including Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), EMDR for trauma, and couples therapy. We create a safe, non-judgmental space where you can explore your thoughts and feelings, develop coping strategies, and work toward meaningful change.",
      "Same-week appointments are typically available for new clients. We offer both in-person sessions at our Winter Park office (convenient to Orlando) and secure telehealth appointments throughout Florida."
    ],
    conditionsHeading: "What We Treat",
    conditions: [
      { name: "Anxiety Disorders", description: "GAD, panic disorder, social anxiety, phobias" },
      { name: "Depression & Mood Issues" },
      { name: "Trauma & PTSD" },
      { name: "Relationship Problems" },
      { name: "Stress Management" },
      { name: "Life Transitions" },
      { name: "Grief & Loss" },
      { name: "Self-Esteem Issues" },
      { name: "Anger Management" },
      { name: "Eating Disorders" },
    ],
    servicesHeading: "Our Therapy Services",
    services: [
      {
        icon: Brain,
        title: "Cognitive Behavioral Therapy (CBT)",
        description: "Evidence-based approach helping you identify and change negative thought patterns and behaviors. Particularly effective for anxiety and depression."
      },
      {
        icon: Heart,
        title: "EMDR for Trauma",
        description: "Eye Movement Desensitization and Reprocessing (EMDR) is a powerful therapy for processing traumatic memories and reducing PTSD symptoms."
      },
      {
        icon: Users,
        title: "Couples & Relationship Therapy",
        description: "Strengthen your relationship through improved communication, conflict resolution, and emotional connection with your partner."
      },
      {
        icon: Video,
        title: "Telehealth Therapy",
        description: "Convenient online therapy sessions from the comfort of your Orlando home. Same quality care as in-person therapy with added flexibility."
      },
    ],
    whyChooseHeading: "Why Choose Our Orlando Therapists?",
    whyChoosePoints: [
      {
        icon: Award,
        title: "Licensed, Experienced Therapists",
        description: "All our therapists are licensed mental health counselors (LMHC) or licensed clinical social workers (LCSW) with years of experience helping Orlando residents."
      },
      {
        icon: CheckCircle,
        title: "Evidence-Based Approaches",
        description: "We use proven therapeutic methods backed by research, including CBT, DBT, EMDR, and solution-focused therapy tailored to your specific needs."
      },
      {
        icon: Calendar,
        title: "Flexible Scheduling",
        description: "Same-week appointments typically available. Evening and weekend slots offered to accommodate your work schedule."
      },
    ],
  },
  faqs: [
    {
      question: "How do I know if I need therapy?",
      answer: "If you're experiencing persistent sadness, anxiety, relationship problems, or difficulty coping with life stressors, therapy can help. You don't need to be in crisis to benefit from counseling - many people use therapy as a tool for personal growth and self-improvement."
    },
    {
      question: "What's the difference between a therapist and a psychiatrist?",
      answer: "Therapists (counselors, LMHCs, LCSWs) provide talk therapy and counseling but cannot prescribe medications. Psychiatrists are medical doctors who can prescribe medications and provide medical treatment. Many people benefit from seeing both - a therapist for counseling and a psychiatrist for medication management."
    },
    {
      question: "Do you offer in-person or online therapy in Orlando?",
      answer: "We offer both! You can choose in-person sessions at our Winter Park office (convenient to all of Orlando) or secure telehealth therapy from anywhere in Florida."
    },
    {
      question: "What insurance do you accept?",
      answer: "We accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, Humana, and more. Contact our office to verify your specific plan coverage."
    },
  ],
  sidebar: {
    formHeading: "Start Therapy Today",
    formSubheading: "Same-week appointments available. Most insurance accepted.",
    formType: "therapy",
    quickLinks: [
      { href: "/therapy", label: "Therapy Services" },
      { href: "/anxiety-therapy", label: "Anxiety Therapy" },
      { href: "/depression-counseling", label: "Depression Counseling" },
      { href: "/emdr-therapy", label: "EMDR Therapy" },
      { href: "/virtual-therapy", label: "Virtual Therapy" },
      { href: "/psychiatrist-orlando-accepts-bcbs", label: "BCBS Insurance" },
      { href: "/psychiatrist-orlando-accepts-cigna", label: "Cigna Insurance" },
      { href: "/psychiatrist-orlando-accepts-aetna", label: "Aetna Insurance" },
    ],
  },
  analytics: {
    pageName: "Therapist Orlando Page",
    conversionCategory: "therapist_orlando",
  },
};

export const mentalHealthClinicConfig: LandingPageConfig = {
  seo: {
    title: "Mental Health Clinic Orlando FL | #1 Rated 2025",
    description: "Looking for a mental health clinic in Orlando? Board-certified psychiatrists & licensed therapists. Same-week appointments for anxiety, depression, ADHD. 4.8★ rating. BCBS, Cigna, Medicare. Call (386) 848-8751.",
    keywords: ["mental health clinic orlando", "mental health clinic orlando fl", "psychiatric clinic orlando", "mental health center orlando", "orlando mental health clinic", "mental health services orlando", "mental health clinic near me", "best mental health clinic orlando"],
    canonicalPath: "/mental-health-clinic-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness"],
    "name": "Mental Health Clinic Orlando FL - Empathy Health Clinic",
    "description": "Comprehensive mental health services including psychiatry and therapy in Orlando, FL.",
    "url": "https://empathyhealthclinic.com/mental-health-clinic-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    }
  },
  hero: {
    title: "Mental Health Clinic in Orlando, FL",
    subtitle: "Comprehensive psychiatric and therapy services for adults and adolescents. Board-certified psychiatrists, licensed therapists, medication management, and evidence-based counseling. Same-week appointments available with in-person and telehealth options.",
    ctaPrimary: "Schedule Appointment",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Board-Certified Providers", "Same-Week Appointments", "Telehealth Available"],
  },
  location: {
    title: "Orlando Mental Health Clinic",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth & in-person available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Comprehensive Mental Health Care in Orlando",
    introduction: [
      "Empathy Health Clinic is a full-service mental health clinic serving Orlando, Winter Park, and surrounding areas. We provide integrated psychiatric and therapy services under one roof, making it easy to get comprehensive care for your mental health needs.",
      "Our Orlando mental health clinic combines board-certified psychiatrists for medication management with licensed therapists for counseling, creating a coordinated treatment approach that addresses all aspects of your wellbeing. Whether you need psychiatric evaluation, medication management, individual therapy, or couples counseling, we're here to help.",
      "We treat adults and adolescents for anxiety, depression, ADHD, bipolar disorder, trauma, and many other mental health conditions. Same-week appointments are typically available, and we offer both in-person and secure telehealth services."
    ],
    conditionsHeading: "Mental Health Conditions We Treat",
    conditions: [
      { name: "Anxiety & Panic Disorders" },
      { name: "Depression & Mood Disorders" },
      { name: "ADHD", description: "Children, teens, and adults" },
      { name: "Bipolar Disorder" },
      { name: "OCD" },
      { name: "PTSD & Trauma" },
      { name: "Eating Disorders" },
      { name: "Personality Disorders" },
      { name: "Schizophrenia" },
      { name: "Substance Use Support" },
    ],
    servicesHeading: "Our Mental Health Services",
    services: [
      {
        icon: Brain,
        title: "Psychiatry & Medication Management",
        description: "Board-certified psychiatrists provide psychiatric evaluations, medication management, and ongoing monitoring for optimal mental health treatment."
      },
      {
        icon: MessageCircle,
        title: "Individual Therapy",
        description: "Licensed therapists offer CBT, DBT, EMDR, and other evidence-based therapies for anxiety, depression, trauma, and personal growth."
      },
      {
        icon: Users,
        title: "Couples & Family Therapy",
        description: "Strengthen relationships through improved communication, conflict resolution, and emotional connection with trained relationship therapists."
      },
      {
        icon: Video,
        title: "Telehealth Services",
        description: "Access our full range of mental health services from anywhere in Florida through secure, HIPAA-compliant video appointments."
      },
    ],
    whyChooseHeading: "Why Choose Empathy Health Clinic?",
    whyChoosePoints: [
      {
        icon: Award,
        title: "Integrated Care Team",
        description: "Our psychiatrists and therapists work together to provide coordinated, comprehensive mental health care. If you need both medication and therapy, we make it easy to get both in one place."
      },
      {
        icon: Calendar,
        title: "Same-Week Appointments",
        description: "Unlike many Orlando mental health clinics with months-long wait times, we typically offer same-week appointments for new patients."
      },
      {
        icon: Shield,
        title: "Most Insurance Accepted",
        description: "We accept Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, Humana, and many other major insurance plans serving Orlando residents."
      },
    ],
  },
  faqs: [
    {
      question: "What services does your mental health clinic provide?",
      answer: "We provide comprehensive mental health services including psychiatric evaluations, medication management, individual therapy (CBT, DBT, EMDR), couples therapy, family therapy, ADHD testing, and telehealth appointments. Our board-certified psychiatrists and licensed therapists work together to provide integrated care."
    },
    {
      question: "Do I need a referral to come to your clinic?",
      answer: "No referral is required. You can call our Orlando mental health clinic directly at 386-848-8751 to schedule an appointment. However, some insurance plans may require a referral for coverage, so check with your insurance provider."
    },
    {
      question: "Can I see both a psychiatrist and a therapist at your clinic?",
      answer: "Yes! Many of our patients benefit from seeing both a psychiatrist for medication management and a therapist for counseling. Our integrated care model makes this convenient and ensures your providers communicate about your treatment."
    },
    {
      question: "What insurance plans do you accept?",
      answer: "We accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, Humana, and more. Contact our office to verify coverage for your specific plan."
    },
  ],
  sidebar: {
    formHeading: "Get Started Today",
    formSubheading: "Same-week appointments available. Most insurance accepted.",
    formType: "mental_health_clinic",
    quickLinks: [
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/therapist-orlando", label: "Therapist Orlando" },
      { href: "/psychiatric-evaluation-orlando", label: "Psychiatric Evaluation" },
      { href: "/anxiety-therapy", label: "Anxiety Therapy" },
      { href: "/adhd-psychiatrist-orlando", label: "ADHD Treatment" },
      { href: "/new-patients", label: "New Patients" },
      { href: "/best-psychiatrist-orlando", label: "Best Psychiatrist Orlando" },
      { href: "/mental-health-doctor-orlando", label: "Mental Health Doctor" },
      { href: "/online-psychiatrist-florida", label: "Online Psychiatrist FL" },
      { href: "/depression-psychiatrist-orlando", label: "Depression Psychiatrist" },
    ],
  },
  analytics: {
    pageName: "Mental Health Clinic Orlando Page",
    conversionCategory: "mental_health_clinic",
  },
};

// Medicare Therapy Orlando
export const medicareTherapyOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Medicare Therapy Orlando FL | Part B Therapists",
    description: "Orlando therapists accepting Medicare Part B. CBT, EMDR, trauma therapy. Same-week appointments, in-person & telehealth. Call 386-848-8751.",
    keywords: ["medicare therapy orlando", "therapist accepts medicare orlando", "medicare counseling orlando", "medicare part b therapy orlando", "medicare mental health orlando"],
    canonicalPath: "/medicare-therapy-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness"],
    "name": "Medicare Therapy Orlando FL - Empathy Health Clinic",
    "description": "Therapy services in Orlando accepting Medicare Part B coverage.",
    "url": "https://empathyhealthclinic.com/medicare-therapy-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    }
  },
  hero: {
    title: "Medicare Therapy Services in Orlando",
    subtitle: "Licensed mental health counselors and therapists accepting Medicare Part B in Orlando, FL. Evidence-based therapy including CBT, EMDR, and trauma-focused counseling. Same-week appointments for Medicare beneficiaries. Call to verify your coverage.",
    ctaPrimary: "Verify Medicare Coverage",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Medicare Part B Accepted", "Same-Week Appointments"],
  },
  location: {
    title: "Orlando Metro Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nMedicare appointments available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Therapy Services Accepting Medicare in Orlando",
    introduction: [
      "Finding a qualified therapist who accepts Medicare Part B can be challenging in Orlando. At Empathy Health Clinic, our licensed mental health counselors (LMHC) and clinical social workers (LCSW) provide evidence-based therapy services covered by Medicare Part B for eligible beneficiaries.",
      "Medicare Part B covers outpatient mental health services, including individual therapy and counseling. Our therapists specialize in treating anxiety, depression, grief, trauma, and adjustment disorders common among older adults. We accept Medicare assignment, which means we accept the Medicare-approved amount as full payment.",
    ],
    conditionsHeading: "Conditions We Treat with Medicare Coverage",
    conditions: [
      { name: "Depression in Older Adults" },
      { name: "Anxiety & Worry" },
      { name: "Grief & Bereavement" },
      { name: "Chronic Illness Adjustment" },
      { name: "Caregiver Stress" },
      { name: "Life Transitions & Retirement" },
      { name: "Isolation & Loneliness" },
      { name: "PTSD & Trauma" },
    ],
    servicesHeading: "Therapy Services Covered by Medicare",
    services: [
      {
        icon: Brain,
        title: "Cognitive Behavioral Therapy (CBT)",
        description: "Evidence-based approach helping you identify and change negative thought patterns. Particularly effective for depression and anxiety in older adults."
      },
      {
        icon: Heart,
        title: "Grief & Bereavement Counseling",
        description: "Compassionate support for processing loss and adjusting to life changes. Specialized therapy for seniors dealing with loss of spouse, friends, or independence."
      },
      {
        icon: Video,
        title: "Telehealth Therapy (Medicare Covered)",
        description: "Medicare covers telehealth mental health services. Attend therapy from home using your computer, tablet, or smartphone with secure video calls."
      },
    ],
    whyChooseHeading: "Why Choose Our Medicare Therapy Services?",
    whyChoosePoints: [
      {
        icon: CreditCard,
        title: "Medicare Assignment Accepted",
        description: "We accept Medicare assignment, meaning we accept the Medicare-approved amount as full payment. You'll typically only pay your Part B deductible and 20% coinsurance."
      },
      {
        icon: Award,
        title: "Licensed, Experienced Therapists",
        description: "All our therapists are licensed mental health counselors (LMHC) or licensed clinical social workers (LCSW) with experience treating older adults and Medicare patients."
      },
      {
        icon: Calendar,
        title: "Flexible Scheduling",
        description: "Same-week appointments typically available for Medicare beneficiaries. Daytime appointments and telehealth options for convenience and accessibility."
      },
    ],
  },
  faqs: [
    {
      question: "Does Medicare cover therapy in Orlando?",
      answer: "Yes. Medicare Part B covers outpatient mental health services including individual therapy and counseling sessions. You typically pay 20% of the Medicare-approved amount after meeting your Part B deductible."
    },
    {
      question: "How many therapy sessions does Medicare cover per year?",
      answer: "Medicare Part B doesn't limit the number of therapy sessions, as long as they're medically necessary and ordered by your doctor. Your therapist will work with you and Medicare to ensure your treatment is covered."
    },
    {
      question: "Do I need a referral for Medicare therapy?",
      answer: "Original Medicare doesn't require a referral for outpatient mental health services. However, if you have a Medicare Advantage plan, check with your specific plan as they may require referrals."
    },
    {
      question: "Can I use telehealth for therapy with Medicare?",
      answer: "Yes! Medicare covers telehealth mental health services. You can attend therapy sessions from home using video calls, which is especially convenient for seniors with mobility issues or transportation challenges."
    },
  ],
  sidebar: {
    formHeading: "Verify Your Medicare Coverage",
    formSubheading: "Our billing team will check your Medicare Part B coverage and explain your costs.",
    formType: "medicare_therapy",
    quickLinks: [
      { href: "/therapist-orlando", label: "Orlando Therapist" },
      { href: "/medicare-psychiatrist-orlando", label: "Medicare Psychiatrist" },
      { href: "/mental-health-clinic-orlando", label: "Mental Health Clinic" },
    ],
  },
  analytics: {
    pageName: "Medicare Therapy Orlando Page",
    conversionCategory: "medicare_therapy",
  },
};

// Medicare Psychiatrist Orlando
export const medicarePsychiatristOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Medicare Psychiatrist Orlando FL | Part B Accepted",
    description: "Orlando psychiatrists accepting Medicare Part B. Psychiatric evaluations, medication management. Same-week appointments. Call 386-848-8751.",
    keywords: ["medicare psychiatrist orlando", "psychiatrist accepts medicare orlando", "medicare mental health orlando", "medicare medication management orlando"],
    canonicalPath: "/medicare-psychiatrist-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness", "Psychiatrist"],
    "name": "Medicare Psychiatrist Orlando FL - Empathy Health Clinic",
    "description": "Board-certified psychiatrists in Orlando accepting Medicare Part B for psychiatric care.",
    "url": "https://empathyhealthclinic.com/medicare-psychiatrist-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "medicalSpecialty": "Psychiatry"
  },
  hero: {
    title: "Medicare Psychiatrist in Orlando, FL",
    subtitle: "Board-certified psychiatrists accepting Medicare Part B in Orlando. Comprehensive psychiatric evaluations, medication management, and ongoing care for depression, anxiety, and other mental health conditions. Same-week appointments for Medicare beneficiaries.",
    ctaPrimary: "Verify Medicare Coverage",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Medicare Part B Accepted", "Board-Certified Psychiatrists"],
  },
  location: {
    title: "Orlando Metro Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nMedicare appointments available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Psychiatry Services Accepting Medicare in Orlando",
    introduction: [
      "Medicare Part B covers medically necessary psychiatric services including evaluations, medication management, and follow-up care. Our board-certified psychiatrists in Orlando accept Medicare assignment and provide comprehensive mental health care for seniors and Medicare beneficiaries.",
      "We specialize in treating depression, anxiety, bipolar disorder, and other mental health conditions common in older adults. Our psychiatrists understand the unique challenges of mental health in aging, including medication interactions, cognitive changes, and chronic illness management.",
    ],
    conditionsHeading: "Psychiatric Conditions We Treat",
    conditions: [
      { name: "Depression in Older Adults" },
      { name: "Anxiety Disorders" },
      { name: "Bipolar Disorder" },
      { name: "Dementia-Related Behavioral Issues" },
      { name: "Sleep Disorders" },
      { name: "Chronic Pain & Mental Health" },
      { name: "Post-Stroke Depression" },
    ],
    servicesHeading: "Medicare-Covered Psychiatric Services",
    services: [
      {
        icon: FileText,
        title: "Psychiatric Evaluations",
        description: "Comprehensive mental health assessments covered by Medicare Part B. Includes diagnostic evaluation, mental status examination, and treatment planning."
      },
      {
        icon: Brain,
        title: "Medication Management",
        description: "Careful monitoring and adjustment of psychiatric medications with attention to drug interactions, side effects, and coordination with other medical providers."
      },
      {
        icon: Video,
        title: "Telehealth Psychiatry",
        description: "Medicare covers telehealth psychiatric appointments. See your psychiatrist from home for evaluations, medication management, and follow-up care."
      },
    ],
    whyChooseHeading: "Why Choose Our Medicare Psychiatry Services?",
    whyChoosePoints: [
      {
        icon: CreditCard,
        title: "Medicare Assignment Accepted",
        description: "We accept Medicare assignment, billing Medicare directly and accepting their approved amount. You pay only your Part B deductible and 20% coinsurance."
      },
      {
        icon: Award,
        title: "Board-Certified Psychiatrists",
        description: "All our psychiatrists are board-certified by the American Board of Psychiatry and Neurology with experience treating Medicare-age patients and complex medical conditions."
      },
      {
        icon: Shield,
        title: "Coordinated Care",
        description: "We coordinate with your primary care doctor and other specialists to ensure comprehensive care, especially important when managing multiple medications and conditions."
      },
    ],
  },
  faqs: [
    {
      question: "Does Medicare cover psychiatrist visits in Orlando?",
      answer: "Yes. Medicare Part B covers psychiatric evaluations, medication management, and follow-up appointments with psychiatrists. You typically pay 20% of the Medicare-approved amount after meeting your Part B deductible."
    },
    {
      question: "Will Medicare cover my psychiatric medications?",
      answer: "Medicare Part D covers most psychiatric medications. We'll work with your Part D plan to prescribe covered medications and help with prior authorizations if needed."
    },
    {
      question: "How often can I see a psychiatrist with Medicare?",
      answer: "Medicare covers as many psychiatrist visits as are medically necessary. Initially, you might see your psychiatrist monthly for medication management, then quarterly once stable."
    },
    {
      question: "Do you accept Medicare Advantage plans?",
      answer: "Yes, we accept many Medicare Advantage plans in addition to Original Medicare. Call our office to verify we're in-network with your specific Medicare Advantage plan."
    },
  ],
  sidebar: {
    formHeading: "Verify Your Medicare Coverage",
    formSubheading: "Our billing team will check your Medicare Part B coverage and explain your costs.",
    formType: "medicare_psychiatrist",
    quickLinks: [
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/medicare-therapy-orlando", label: "Medicare Therapy" },
      { href: "/medication-management-orlando", label: "Medication Management" },
    ],
  },
  analytics: {
    pageName: "Medicare Psychiatrist Orlando Page",
    conversionCategory: "medicare_psychiatrist",
  },
};

// Psychologist Orlando
export const psychologistOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Psychologist Orlando FL | Testing & Therapy",
    description: "Licensed clinical psychologists in Orlando, FL. ADHD testing, autism evaluations, psychological assessments, and therapy. Same-week appointments. Call 386-848-8751.",
    keywords: ["psychologist orlando", "clinical psychologist orlando fl", "psychological testing orlando", "adhd testing orlando", "neuropsychologist orlando"],
    canonicalPath: "/psychologist-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness", "Psychologist"],
    "name": "Psychologist Orlando FL - Empathy Health Clinic",
    "description": "Licensed clinical psychologists providing testing and therapy in Orlando, FL.",
    "url": "https://empathyhealthclinic.com/psychologist-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "medicalSpecialty": "Psychology"
  },
  hero: {
    title: "Licensed Psychologists in Orlando, FL",
    subtitle: "Comprehensive psychological services including diagnostic testing, therapy, and assessments. Our licensed clinical psychologists provide ADHD evaluations, autism assessments, neuropsychological testing, and evidence-based therapy. Same-week appointments available.",
    ctaPrimary: "Schedule Appointment",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Licensed Clinical Psychologists", "Comprehensive Testing Available"],
  },
  location: {
    title: "Orlando Metro Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nPsychological testing & therapy available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Comprehensive Psychology Services in Orlando",
    introduction: [
      "Whether you need psychological testing, diagnostic assessment, or therapy, our licensed clinical psychologists in Orlando provide comprehensive, evidence-based mental health services. We specialize in complex diagnostic evaluations and provide expert psychological testing for ADHD, autism, learning disabilities, and neuropsychological conditions.",
      "Our psychologists work collaboratively with psychiatrists and therapists at Empathy Health Clinic to provide integrated mental health care. This means if you need both psychological testing and medication management, we can coordinate your care seamlessly.",
    ],
    conditionsHeading: "Psychological Services We Provide",
    conditions: [
      { name: "ADHD Testing & Diagnosis" },
      { name: "Autism Spectrum Evaluations" },
      { name: "Learning Disability Assessments" },
      { name: "Neuropsychological Testing" },
      { name: "IQ & Cognitive Testing" },
      { name: "Personality Assessments" },
      { name: "Pre-Surgical Psychological Evaluations" },
    ],
    servicesHeading: "Our Psychology Services",
    services: [
      {
        icon: FileText,
        title: "Psychological Testing & Assessment",
        description: "Comprehensive testing batteries for ADHD, autism, learning disabilities, and cognitive functioning. Includes standardized tests, clinical interviews, and detailed diagnostic reports."
      },
      {
        icon: Brain,
        title: "Therapy & Counseling",
        description: "Evidence-based psychotherapy including CBT, DBT, and other approaches. Our psychologists provide individual therapy for adults, adolescents, and couples."
      },
      {
        icon: Award,
        title: "Diagnostic Evaluations",
        description: "Complex diagnostic assessments when diagnosis is unclear or multiple conditions may be present. Expert evaluation by doctoral-level psychologists."
      },
    ],
    whyChooseHeading: "Why Choose Our Orlando Psychologists?",
    whyChoosePoints: [
      {
        icon: Award,
        title: "Doctoral-Level Psychologists",
        description: "All our psychologists hold doctoral degrees (Ph.D. or Psy.D.) and are licensed by the Florida Board of Psychology. Specialized training in psychological testing and assessment."
      },
      {
        icon: CheckCircle,
        title: "Comprehensive Testing",
        description: "We use the latest validated psychological tests and assessment tools. Detailed written reports provided for schools, employers, disability claims, or personal use."
      },
      {
        icon: Users,
        title: "Integrated Care Model",
        description: "Our psychologists work alongside psychiatrists and therapists, allowing for comprehensive care. If testing reveals ADHD, for example, you can see a psychiatrist for medication in the same clinic."
      },
    ],
  },
  faqs: [
    {
      question: "What's the difference between a psychologist and a psychiatrist?",
      answer: "Psychologists have doctoral degrees (Ph.D. or Psy.D.) and specialize in psychological testing and therapy but cannot prescribe medication. Psychiatrists are medical doctors (M.D. or D.O.) who can prescribe medication and provide medical treatment. At our clinic, both work together for comprehensive care."
    },
    {
      question: "Does insurance cover psychological testing in Orlando?",
      answer: "Many insurance plans cover psychological testing when medically necessary. ADHD testing, autism evaluations, and neuropsychological assessments are often covered. We'll verify your coverage before scheduling testing."
    },
    {
      question: "How long does ADHD testing take?",
      answer: "Comprehensive ADHD testing typically takes 2-4 hours spread across one or two appointments. This includes clinical interviews, standardized tests, computerized attention tests, and questionnaires. You'll receive a detailed written report with diagnostic conclusions and treatment recommendations."
    },
    {
      question: "Can psychologists prescribe medication in Florida?",
      answer: "No, psychologists in Florida cannot prescribe medication. However, our psychologists work closely with our psychiatrists. If psychological testing reveals a condition that may benefit from medication (like ADHD), we can schedule you with a psychiatrist in the same clinic."
    },
  ],
  sidebar: {
    formHeading: "Schedule Psychology Services",
    formSubheading: "Psychological testing, therapy, and assessments available. Most insurance accepted.",
    formType: "psychologist",
    quickLinks: [
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/therapist-orlando", label: "Therapist Orlando" },
      { href: "/adhd-psychiatrist-orlando", label: "ADHD Testing" },
      { href: "/psychiatric-evaluation-orlando", label: "Psychiatric Evaluation" },
      { href: "/psychiatrist-orlando-accepts-bcbs", label: "BCBS Insurance" },
      { href: "/psychiatrist-orlando-accepts-cigna", label: "Cigna Insurance" },
      { href: "/psychiatrist-orlando-accepts-aetna", label: "Aetna Insurance" },
    ],
  },
  analytics: {
    pageName: "Psychologist Orlando Page",
    conversionCategory: "psychologist",
  },
};

// Insurance-specific page factory helper
function createInsuranceTherapyConfig(
  insuranceName: string,
  urlSlug: string,
  specificBenefits: string[] = [],
): LandingPageConfig {
  return {
    seo: {
      title: `${insuranceName} Therapy Orlando FL | Therapist Accepting ${insuranceName} | Same-Week Appointments`,
      description: `Therapy services in Orlando, FL accepting ${insuranceName} insurance. Licensed therapists provide CBT, EMDR, trauma therapy, and more. In-network providers, same-week appointments. Call 386-848-8751 to verify ${insuranceName} coverage.`,
      keywords: [`${insuranceName.toLowerCase()} therapy orlando`, `therapist accepts ${insuranceName.toLowerCase()} orlando`, `${insuranceName.toLowerCase()} mental health orlando`],
      canonicalPath: `/${urlSlug}`,
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": ["MedicalBusiness", "LocalBusiness"],
      "name": `${insuranceName} Therapy Orlando FL - Empathy Health Clinic`,
      "description": `Therapy services in Orlando accepting ${insuranceName} insurance.`,
      "url": `https://empathyhealthclinic.com/${urlSlug}`,
      "telephone": "+1-386-848-8751",
      "email": "providers@empathyhealthclinic.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2281 Lee Rd Suite 102",
        "addressLocality": "Winter Park",
        "addressRegion": "FL",
        "postalCode": "32810",
        "addressCountry": "US"
      }
    },
    hero: {
      title: `${insuranceName} Therapy Services in Orlando`,
      subtitle: `Licensed mental health counselors and therapists accepting ${insuranceName} insurance in Orlando, FL. Evidence-based therapy including CBT, EMDR, and trauma-focused counseling. In-network providers with same-week appointments available.`,
      ctaPrimary: `Verify ${insuranceName} Coverage`,
      ctaSecondary: "Call 386-848-8751",
      heroImage: heroImage,
    },
    proofBar: {
      googleRating: 4.8,
      showVerifiedBadge: true,
      highlights: [`${insuranceName} In-Network`, "Same-Week Appointments"],
    },
    location: {
      title: "Orlando Metro Location",
      address: "2281 Lee Rd Suite 102",
      city: "Winter Park",
      state: "FL",
      zip: "32810",
      phone: "3868488751",
      phoneDisplay: "386-848-8751",
      hours: `Mon-Fri: 9:00 AM - 6:00 PM\n${insuranceName} appointments available`,
      mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
    },
    content: {
      mainHeading: `Therapy Services Accepting ${insuranceName} in Orlando`,
      introduction: [
        `Finding a qualified therapist who accepts your ${insuranceName} insurance can be challenging. At Empathy Health Clinic, our licensed mental health counselors (LMHC) and clinical social workers (LCSW) are in-network providers for ${insuranceName}, making quality mental health care accessible and affordable.`,
        `We provide evidence-based therapy services covered by ${insuranceName} including individual therapy, couples counseling, and specialized treatments for anxiety, depression, trauma, and more. Our Orlando therapists understand ${insuranceName} benefits and will help you maximize your coverage.`,
      ],
      conditionsHeading: "Conditions We Treat",
      conditions: [
        { name: "Depression & Mood Disorders" },
        { name: "Anxiety & Panic Disorders" },
        { name: "PTSD & Trauma" },
        { name: "Relationship Issues" },
        { name: "Stress & Burnout" },
        { name: "Grief & Loss" },
        { name: "Life Transitions" },
        { name: "Self-Esteem Issues" },
      ],
      servicesHeading: `Therapy Services Covered by ${insuranceName}`,
      services: [
        {
          icon: Brain,
          title: "Cognitive Behavioral Therapy (CBT)",
          description: `Evidence-based approach helping you identify and change negative thought patterns. Covered by ${insuranceName} for anxiety, depression, and other conditions.`
        },
        {
          icon: Heart,
          title: "EMDR for Trauma",
          description: `Eye Movement Desensitization and Reprocessing (EMDR) is a powerful therapy for processing traumatic memories and reducing PTSD symptoms. ${insuranceName} typically covers EMDR therapy.`
        },
        {
          icon: Users,
          title: "Couples & Relationship Therapy",
          description: `Strengthen your relationship through improved communication and conflict resolution. Check your ${insuranceName} plan for couples therapy coverage.`
        },
        {
          icon: Video,
          title: "Telehealth Therapy",
          description: `Convenient online therapy sessions covered by ${insuranceName}. Same quality care as in-person therapy with added flexibility and convenience.`
        },
      ],
      whyChooseHeading: "Why Choose Our Therapists?",
      whyChoosePoints: [
        {
          icon: CreditCard,
          title: `${insuranceName} In-Network Provider`,
          description: `We're in-network with ${insuranceName}, which means lower out-of-pocket costs for you. We bill ${insuranceName} directly and handle all the paperwork.`
        },
        {
          icon: Award,
          title: "Licensed, Experienced Therapists",
          description: `All our therapists are licensed mental health counselors (LMHC) or licensed clinical social workers (LCSW) with years of experience treating ${insuranceName} patients.`
        },
        {
          icon: Calendar,
          title: "Flexible Scheduling",
          description: `Same-week appointments typically available for ${insuranceName} members. Evening and weekend slots offered to accommodate your work schedule.`
        },
      ],
    },
    faqs: [
      {
        question: `How do I use my ${insuranceName} insurance for therapy?`,
        answer: `Simply call our office at 386-848-8751 and mention you have ${insuranceName}. We'll verify your benefits, confirm coverage, and schedule your first appointment. We handle all billing and claims with ${insuranceName} directly.`
      },
      {
        question: `What's my copay with ${insuranceName}?`,
        answer: `Copays vary by ${insuranceName} plan. Most plans have copays between $10-$50 per therapy session. We'll check your specific plan and tell you your exact copay before your first appointment.`
      },
      {
        question: `Do I need a referral for therapy with ${insuranceName}?`,
        answer: `Most ${insuranceName} plans don't require a referral for outpatient mental health services, but some plans do. We'll check your specific plan requirements when you call to schedule.`
      },
      {
        question: `Does ${insuranceName} cover telehealth therapy?`,
        answer: `Yes, ${insuranceName} covers telehealth mental health services. You can attend therapy sessions from home using video calls, which many ${insuranceName} members find more convenient than in-person visits.`
      },
    ],
    sidebar: {
      formHeading: `Verify Your ${insuranceName} Coverage`,
      formSubheading: `Our billing team will check your ${insuranceName} benefits and confirm your copay.`,
      formType: `${urlSlug.replace(/-/g, '_')}`,
      quickLinks: [
        { href: "/therapist-orlando", label: "Orlando Therapist" },
        { href: "/mental-health-clinic-orlando", label: "Mental Health Clinic" },
        { href: "/anxiety-therapy", label: "Anxiety Therapy" },
      ],
    },
    analytics: {
      pageName: `${insuranceName} Therapy Orlando Page`,
      conversionCategory: urlSlug.replace(/-/g, '_'),
    },
  };
}

// UMR Psychiatry Orlando - Optimized for "psychiatrist orlando accepts umr" (Rank 5)
export const umrTherapyOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Psychiatrist Orlando Accepts UMR | In-Network 2025",
    description: "Psychiatrist Orlando accepts UMR insurance - In-network for anxiety, depression, ADHD, bipolar disorder. Same-week appointments available. Call (386) 848-8751.",
    keywords: ["psychiatrist orlando accepts umr", "umr psychiatrist orlando", "psychiatrist takes umr orlando fl", "umr mental health orlando", "in-network psychiatrist umr orlando", "umr covered psychiatrist orlando", "psychiatrist near me umr insurance", "psychiatrist that accepts umr orlando"],
    canonicalPath: "/therapist-accepts-umr",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "UMR Psychiatrist Orlando FL - Empathy Health Clinic",
    "description": "Board-certified psychiatrists in Orlando accepting UMR insurance for medication management and psychiatric care.",
    "url": "https://empathyhealthclinic.com/therapist-accepts-umr",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Orlando",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.59544,
      "longitude": -81.36537
    },
    "medicalSpecialty": "Psychiatry",
    "insuranceAccepted": "UMR"
  },
  hero: {
    title: "Psychiatrists Accepting UMR in Orlando, FL",
    subtitle: "Board-certified psychiatrists in-network with UMR insurance. Expert medication management for anxiety, depression, ADHD, bipolar disorder. Same-week psychiatric appointments available in Orlando.",
    ctaPrimary: "Verify UMR Coverage",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["UMR In-Network", "Board-Certified Psychiatrists", "Same-Week Appointments"],
  },
  location: {
    title: "Orlando UMR Psychiatry Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nUMR appointments available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Board-Certified Psychiatrists Accepting UMR in Orlando",
    introduction: [
      "Finding a qualified psychiatrist who accepts your UMR insurance doesn't have to be complicated. At Empathy Health Clinic, our board-certified psychiatrists are in-network providers for UMR plans, making expert psychiatric care accessible and affordable in Orlando, FL.",
      "We provide comprehensive psychiatric services covered by UMR including medication management, psychiatric evaluations, and treatment for anxiety, depression, ADHD, bipolar disorder, and more. Our psychiatrists understand UMR benefits and will help you maximize your insurance coverage for mental health treatment.",
    ],
    conditionsHeading: "Psychiatric Conditions We Treat with UMR Coverage",
    conditions: [
      { name: "Anxiety & Panic Disorders" },
      { name: "Depression & Mood Disorders" },
      { name: "ADHD (Adults & Adolescents)" },
      { name: "Bipolar Disorder" },
      { name: "OCD & Related Disorders" },
      { name: "PTSD & Trauma" },
      { name: "Insomnia & Sleep Disorders" },
      { name: "Medication Management" },
    ],
    servicesHeading: "UMR-Covered Psychiatric Services in Orlando",
    services: [
      {
        title: "Psychiatric Evaluations",
        description: "Comprehensive mental health assessments to diagnose conditions and create treatment plans. UMR typically covers initial psychiatric evaluations with minimal copay or coinsurance."
      },
      {
        title: "Medication Management",
        description: "Expert psychiatric medication prescribing and monitoring. UMR covers ongoing medication management appointments for anxiety, depression, ADHD, bipolar disorder, and other conditions."
      },
      {
        title: "ADHD Treatment",
        description: "Complete ADHD evaluations, stimulant and non-stimulant medication management. UMR covers ADHD psychiatric care for adults and adolescents in Orlando."
      },
      {
        title: "Anxiety & Depression Treatment",
        description: "Medication-based treatment for anxiety disorders, panic disorder, GAD, social anxiety, and major depression. Covered by most UMR plans."
      },
      {
        title: "Bipolar Disorder Management",
        description: "Specialized psychiatric care for bipolar I, bipolar II, and mood stabilization. UMR typically covers mood disorder treatment with board-certified psychiatrists."
      },
      {
        title: "Telepsychiatry Options",
        description: "Virtual psychiatry appointments covered by UMR. See your Orlando psychiatrist online from home with the same insurance benefits as in-person visits."
      },
    ],
    faqHeading: "UMR Psychiatry Insurance FAQs",
    faqs: [
      {
        question: "Does Empathy Health Clinic accept UMR insurance?",
        answer: "Yes, our board-certified psychiatrists in Orlando are in-network providers for UMR insurance plans. We accept UMR PPO, HMO, and other UMR plans. Call 386-848-8751 to verify your specific UMR plan coverage before your appointment."
      },
      {
        question: "What does UMR cover for psychiatric services?",
        answer: "UMR typically covers psychiatric evaluations, medication management appointments, and mental health treatment. Coverage varies by your specific UMR plan, but most plans cover 80-100% of psychiatric services after your deductible is met. Copays typically range from $10-50 per visit depending on your plan."
      },
      {
        question: "Do I need a referral from my primary care doctor to see a psychiatrist with UMR?",
        answer: "It depends on your UMR plan type. UMR PPO plans typically do not require a referral to see a psychiatrist. UMR HMO plans may require a referral from your primary care physician. Check your UMR benefits or call us at 386-848-8751 and we'll help you determine if a referral is needed."
      },
      {
        question: "How do I verify my UMR coverage for psychiatry?",
        answer: "Call our office at 386-848-8751 with your UMR member ID number and we'll verify your benefits before your first appointment. Our team will check your deductible status, copay amount, and confirm psychiatry coverage under your specific UMR plan."
      },
      {
        question: "Does UMR cover telepsychiatry (virtual psychiatrist appointments)?",
        answer: "Yes, most UMR plans cover telepsychiatry appointments at the same rate as in-person visits. Virtual psychiatry allows you to see your Orlando psychiatrist from home via secure video, fully covered by your UMR insurance benefits."
      },
      {
        question: "How quickly can I see a UMR psychiatrist in Orlando?",
        answer: "We offer same-week appointments for UMR patients. Many patients are able to see one of our board-certified psychiatrists within 3-5 business days. Call 386-848-8751 to schedule your first UMR-covered appointment."
      },
    ],
    quickLinks: [
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/anxiety-psychiatrist-orlando", label: "Anxiety Psychiatrist" },
      { href: "/adhd-psychiatrist-orlando", label: "ADHD Psychiatrist" },
      { href: "/medication-management-orlando", label: "Medication Management" },
      { href: "/telepsychiatry-orlando", label: "Telepsychiatry" },
      { href: "/insurance", label: "Insurance Information" },
      { href: "/psychiatrist-orlando-accepts-bcbs", label: "BCBS Insurance" },
      { href: "/psychiatrist-orlando-accepts-cigna", label: "Cigna Insurance" },
      { href: "/psychiatrist-orlando-accepts-aetna", label: "Aetna Insurance" },
    ],
  },
  analytics: {
    pageName: "UMR Psychiatrist Orlando Page",
    conversionCategory: "umr_psychiatrist",
  },
};

// Oscar Health Therapy Orlando  
export const oscarHealthTherapyOrlandoConfig: LandingPageConfig = createInsuranceTherapyConfig(
  "Oscar Health",
  "therapist-accepts-oscar-health"
);

// Sunshine Health Therapy Orlando
export const sunshineHealthTherapyOrlandoConfig: LandingPageConfig = createInsuranceTherapyConfig(
  "Sunshine Health",
  "sunshine-health-therapy"
);

// Cigna Psychiatrist Orlando - Optimized for "psychiatrist orlando accepts cigna" (Rank 7)
export const cignaPsychiatristOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Psychiatrist Orlando Accepts Cigna | In-Network",
    description: "Psychiatrist in Orlando that accepts Cigna insurance. In-network for anxiety, ADHD, depression, bipolar. Same-week appointments. Call (386) 848-8751.",
    keywords: ["psychiatrist orlando accepts cigna", "cigna psychiatrist orlando", "psychiatrist takes cigna orlando fl", "cigna mental health orlando", "in-network psychiatrist cigna orlando", "cigna covered psychiatrist orlando", "psychiatrist that accepts cigna orlando"],
    canonicalPath: "/psychiatrist-orlando-accepts-cigna",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "Cigna Psychiatrist Orlando FL - Empathy Health Clinic",
    "description": "Board-certified psychiatrists in Orlando accepting Cigna insurance for medication management and psychiatric care.",
    "url": "https://empathyhealthclinic.com/psychiatrist-orlando-accepts-cigna",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Orlando",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.59544,
      "longitude": -81.36537
    },
    "medicalSpecialty": "Psychiatry",
    "insuranceAccepted": "Cigna"
  },
  hero: {
    title: "Psychiatrists Accepting Cigna in Orlando, FL",
    subtitle: "Board-certified psychiatrists in-network with Cigna insurance. Expert medication management for anxiety, depression, ADHD, bipolar disorder. Same-week appointments available in Orlando.",
    ctaPrimary: "Verify Cigna Coverage",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Cigna In-Network", "Board-Certified Psychiatrists", "Same-Week Appointments"],
  },
  location: {
    title: "Orlando Cigna Psychiatry Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nCigna appointments available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Board-Certified Psychiatrists Accepting Cigna in Orlando",
    introduction: [
      "Looking for a psychiatrist in Orlando who accepts Cigna insurance? Empathy Health Clinic's board-certified psychiatrists are in-network Cigna providers, making quality psychiatric care affordable and accessible.",
      "We provide comprehensive psychiatric services covered by Cigna including medication management, psychiatric evaluations, and treatment for anxiety, depression, ADHD, bipolar disorder, and more. Our team understands Cigna benefits and will help you maximize your insurance coverage.",
    ],
    conditionsHeading: "Psychiatric Conditions We Treat with Cigna Coverage",
    conditions: [
      { name: "Anxiety & Panic Disorders" },
      { name: "Depression & Mood Disorders" },
      { name: "ADHD (Adults & Adolescents)" },
      { name: "Bipolar Disorder" },
      { name: "OCD & Related Disorders" },
      { name: "PTSD & Trauma" },
      { name: "Insomnia & Sleep Disorders" },
      { name: "Medication Management" },
    ],
    servicesHeading: "Cigna-Covered Psychiatric Services",
    services: [
      {
        title: "Psychiatric Evaluations",
        description: "Comprehensive mental health assessments covered by Cigna with minimal copay. Get an accurate diagnosis and personalized treatment plan."
      },
      {
        title: "Medication Management",
        description: "Ongoing psychiatric medication management for anxiety, depression, ADHD, and bipolar disorder. Cigna typically covers follow-up appointments."
      },
      {
        title: "ADHD Treatment",
        description: "Complete ADHD evaluations and medication management covered by most Cigna plans for adults and adolescents."
      },
      {
        title: "Telepsychiatry Options",
        description: "Virtual psychiatry appointments covered by Cigna at the same rate as in-person visits. See your psychiatrist from home."
      },
    ],
    quickLinks: [
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/anxiety-psychiatrist-orlando", label: "Anxiety Psychiatrist" },
      { href: "/adhd-psychiatrist-orlando", label: "ADHD Psychiatrist" },
      { href: "/telepsychiatry-orlando", label: "Telepsychiatry" },
      { href: "/insurance", label: "Insurance Information" },
      { href: "/psychiatrist-orlando-accepts-bcbs", label: "BCBS Insurance" },
      { href: "/psychiatrist-orlando-accepts-aetna", label: "Aetna Insurance" },
    ],
  },
  sidebar: {
    formHeading: "Verify Your Cigna Coverage",
    formSubheading: "Our team will verify your Cigna benefits and explain your costs.",
    formType: "cigna_insurance",
    quickLinks: [
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/anxiety-psychiatrist-orlando", label: "Anxiety Psychiatrist" },
      { href: "/adhd-psychiatrist-orlando", label: "ADHD Psychiatrist" },
      { href: "/psychiatrist-orlando-accepts-bcbs", label: "BCBS Insurance" },
      { href: "/psychiatrist-orlando-accepts-aetna", label: "Aetna Insurance" },
      { href: "/insurance", label: "All Insurance" },
    ],
  },
  faqs: [
    {
      question: "Does Empathy Health Clinic accept Cigna insurance?",
      answer: "Yes, our board-certified psychiatrists are in-network providers for Cigna insurance plans. We accept Cigna PPO, HMO, and other Cigna plans. Call 386-848-8751 to verify your specific plan coverage."
    },
    {
      question: "What does Cigna cover for psychiatric services?",
      answer: "Cigna typically covers psychiatric evaluations, medication management, and mental health treatment. Coverage varies by plan, but most Cigna plans cover 80-100% of psychiatric services after deductible. Copays typically range from $10-50 per visit."
    },
    {
      question: "Do I need a referral to see a psychiatrist with Cigna?",
      answer: "It depends on your Cigna plan type. Cigna PPO plans typically do not require a referral. Cigna HMO plans may require a referral from your primary care physician. Call us at 386-848-8751 to help determine if you need a referral."
    },
    {
      question: "How quickly can I see a Cigna psychiatrist in Orlando?",
      answer: "We offer same-week appointments for Cigna patients. Most patients can be seen within 3-5 business days. Call 386-848-8751 to schedule your Cigna-covered appointment."
    },
  ],
  analytics: {
    pageName: "Cigna Psychiatrist Orlando Page",
    conversionCategory: "cigna_psychiatrist",
  },
};

// Aetna Psychiatrist Orlando - Optimized for "psychiatrist orlando accepts aetna" (Rank 5)
export const aetnaPsychiatristOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Psychiatrist Orlando Accepts Aetna | In-Network Provider",
    description: "Board-certified psychiatrist Orlando accepts Aetna. In-network for anxiety, ADHD, depression, bipolar. Same-week appointments. Low copays. Call (386) 848-8751.",
    keywords: ["psychiatrist orlando accepts aetna", "aetna psychiatrist orlando", "psychiatrist takes aetna orlando fl", "aetna mental health orlando", "in-network psychiatrist aetna orlando", "aetna covered psychiatrist orlando", "psychiatrist that accepts aetna orlando"],
    canonicalPath: "/psychiatrist-orlando-accepts-aetna",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "Aetna Psychiatrist Orlando FL - Empathy Health Clinic",
    "description": "Board-certified psychiatrists in Orlando accepting Aetna insurance for medication management and psychiatric care.",
    "url": "https://empathyhealthclinic.com/psychiatrist-orlando-accepts-aetna",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Orlando",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.59544,
      "longitude": -81.36537
    },
    "medicalSpecialty": "Psychiatry",
    "insuranceAccepted": "Aetna"
  },
  hero: {
    title: "Psychiatrists Accepting Aetna in Orlando, FL",
    subtitle: "Board-certified psychiatrists in-network with Aetna insurance. Expert medication management for anxiety, depression, ADHD, bipolar disorder. Same-week appointments available in Orlando.",
    ctaPrimary: "Verify Aetna Coverage",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Aetna In-Network", "Board-Certified Psychiatrists", "Same-Week Appointments"],
  },
  location: {
    title: "Orlando Aetna Psychiatry Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nAetna appointments available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Board-Certified Psychiatrists Accepting Aetna in Orlando",
    introduction: [
      "Need a psychiatrist in Orlando who accepts Aetna insurance? Empathy Health Clinic's board-certified psychiatrists are in-network Aetna providers, making quality psychiatric care affordable and accessible.",
      "We provide comprehensive psychiatric services covered by Aetna including medication management, psychiatric evaluations, and treatment for anxiety, depression, ADHD, bipolar disorder, and more. Our team understands Aetna benefits and will help you maximize your insurance coverage.",
    ],
    conditionsHeading: "Psychiatric Conditions We Treat with Aetna Coverage",
    conditions: [
      { name: "Anxiety & Panic Disorders" },
      { name: "Depression & Mood Disorders" },
      { name: "ADHD (Adults & Adolescents)" },
      { name: "Bipolar Disorder" },
      { name: "OCD & Related Disorders" },
      { name: "PTSD & Trauma" },
      { name: "Insomnia & Sleep Disorders" },
      { name: "Medication Management" },
    ],
    servicesHeading: "Aetna-Covered Psychiatric Services",
    services: [
      {
        title: "Psychiatric Evaluations",
        description: "Comprehensive mental health assessments covered by Aetna with minimal copay. Get an accurate diagnosis and personalized treatment plan."
      },
      {
        title: "Medication Management",
        description: "Ongoing psychiatric medication management for anxiety, depression, ADHD, and bipolar disorder. Aetna typically covers follow-up appointments."
      },
      {
        title: "ADHD Treatment",
        description: "Complete ADHD evaluations and medication management covered by most Aetna plans for adults and adolescents."
      },
      {
        title: "Telepsychiatry Options",
        description: "Virtual psychiatry appointments covered by Aetna at the same rate as in-person visits. See your psychiatrist from home."
      },
    ],
    quickLinks: [
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/anxiety-psychiatrist-orlando", label: "Anxiety Psychiatrist" },
      { href: "/adhd-psychiatrist-orlando", label: "ADHD Psychiatrist" },
      { href: "/telepsychiatry-orlando", label: "Telepsychiatry" },
      { href: "/insurance", label: "Insurance Information" },
      { href: "/psychiatrist-orlando-accepts-bcbs", label: "BCBS Insurance" },
      { href: "/psychiatrist-orlando-accepts-cigna", label: "Cigna Insurance" },
    ],
  },
  faqs: [
    {
      question: "Does Empathy Health Clinic accept Aetna insurance?",
      answer: "Yes, our board-certified psychiatrists are in-network providers for Aetna insurance plans. We accept Aetna PPO, HMO, and other Aetna plans. Call 386-848-8751 to verify your specific plan coverage."
    },
    {
      question: "What does Aetna cover for psychiatric services?",
      answer: "Aetna typically covers psychiatric evaluations, medication management, and mental health treatment. Coverage varies by plan, but most Aetna plans cover 80-100% of psychiatric services after deductible. Copays typically range from $10-50 per visit."
    },
    {
      question: "Do I need a referral to see a psychiatrist with Aetna?",
      answer: "It depends on your Aetna plan type. Aetna PPO plans typically do not require a referral. Aetna HMO plans may require a referral from your primary care physician. Call us at 386-848-8751 to help determine if you need a referral."
    },
    {
      question: "How quickly can I see an Aetna psychiatrist in Orlando?",
      answer: "We offer same-week appointments for Aetna patients. Most patients can be seen within 3-5 business days. Call 386-848-8751 to schedule your Aetna-covered appointment."
    },
  ],
  analytics: {
    pageName: "Aetna Psychiatrist Orlando Page",
    conversionCategory: "aetna_psychiatrist",
  },
};

// BCBS Psychiatrist Orlando - Optimized for "psychiatrist orlando accepts bcbs" (Rank 11)
export const bcbsPsychiatristOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Psychiatrist Orlando Accepts BCBS | In-Network 2025",
    description: "Psychiatrist Orlando accepts BCBS - In-network Blue Cross Blue Shield provider for anxiety, depression, ADHD. Same-week appointments. Call (386) 848-8751.",
    keywords: ["psychiatrist orlando accepts bcbs", "bcbs psychiatrist orlando", "blue cross blue shield psychiatrist orlando", "psychiatrist takes bcbs orlando fl", "bcbs mental health orlando", "in-network psychiatrist bcbs orlando"],
    canonicalPath: "/psychiatrist-orlando-accepts-bcbs",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "BCBS Psychiatrist Orlando FL - Empathy Health Clinic",
    "description": "Board-certified psychiatrists in Orlando accepting Blue Cross Blue Shield (BCBS) insurance for medication management and psychiatric care.",
    "url": "https://empathyhealthclinic.com/psychiatrist-orlando-accepts-bcbs",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Orlando",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.59544,
      "longitude": -81.36537
    },
    "medicalSpecialty": "Psychiatry",
    "insuranceAccepted": "Blue Cross Blue Shield (BCBS)"
  },
  hero: {
    title: "Psychiatrists Accepting BCBS in Orlando, FL",
    subtitle: "Board-certified psychiatrists in-network with Blue Cross Blue Shield (BCBS) insurance. Expert medication management for anxiety, depression, ADHD, bipolar disorder. Same-week appointments available in Orlando.",
    ctaPrimary: "Verify BCBS Coverage",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["BCBS In-Network", "Board-Certified Psychiatrists", "Same-Week Appointments"],
  },
  location: {
    title: "Orlando BCBS Psychiatry Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nBCBS appointments available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Board-Certified Psychiatrists Accepting BCBS in Orlando",
    introduction: [
      "Finding a qualified psychiatrist who accepts your Blue Cross Blue Shield (BCBS) insurance can be frustrating. At Empathy Health Clinic, our board-certified psychiatrists are in-network providers for BCBS plans, making expert psychiatric care accessible and affordable in Orlando, FL.",
      "We provide comprehensive psychiatric services covered by BCBS including medication management, psychiatric evaluations, and treatment for anxiety, depression, ADHD, bipolar disorder, and more. Our psychiatrists understand BCBS benefits and will help you maximize your insurance coverage for mental health treatment.",
    ],
    conditionsHeading: "Psychiatric Conditions We Treat with BCBS Coverage",
    conditions: [
      { name: "Anxiety & Panic Disorders" },
      { name: "Depression & Mood Disorders" },
      { name: "ADHD (Adults & Adolescents)" },
      { name: "Bipolar Disorder" },
      { name: "OCD & Related Disorders" },
      { name: "PTSD & Trauma" },
      { name: "Insomnia & Sleep Disorders" },
      { name: "Medication Management" },
    ],
    servicesHeading: "BCBS-Covered Psychiatric Services in Orlando",
    services: [
      {
        title: "Psychiatric Evaluations",
        description: "Comprehensive mental health assessments to diagnose conditions and create treatment plans. BCBS typically covers initial psychiatric evaluations with minimal copay or coinsurance."
      },
      {
        title: "Medication Management",
        description: "Expert psychiatric medication prescribing and monitoring. BCBS covers ongoing medication management appointments for anxiety, depression, ADHD, bipolar disorder, and other conditions."
      },
      {
        title: "ADHD Treatment",
        description: "Complete ADHD evaluations, stimulant and non-stimulant medication management. BCBS covers ADHD psychiatric care for adults and adolescents in Orlando."
      },
      {
        title: "Anxiety & Depression Treatment",
        description: "Medication-based treatment for anxiety disorders, panic disorder, GAD, social anxiety, and major depression. Covered by most BCBS plans."
      },
      {
        title: "Bipolar Disorder Management",
        description: "Specialized psychiatric care for bipolar I, bipolar II, and mood stabilization. BCBS typically covers mood disorder treatment with board-certified psychiatrists."
      },
      {
        title: "Telepsychiatry Options",
        description: "Virtual psychiatry appointments covered by BCBS. See your Orlando psychiatrist online from home with the same insurance benefits as in-person visits."
      },
    ],
    faqHeading: "BCBS Psychiatry Insurance FAQs",
    faqs: [
      {
        question: "Does Empathy Health Clinic accept Blue Cross Blue Shield (BCBS) insurance?",
        answer: "Yes, our board-certified psychiatrists in Orlando are in-network providers for Blue Cross Blue Shield (BCBS) insurance plans. We accept most BCBS plans including PPO, HMO, and EPO options. Call 386-848-8751 to verify your specific BCBS plan coverage before your appointment."
      },
      {
        question: "What does BCBS cover for psychiatric services?",
        answer: "BCBS typically covers psychiatric evaluations, medication management appointments, and mental health treatment. Coverage varies by your specific BCBS plan, but most plans cover 80-100% of psychiatric services after your deductible is met. Copays range from $10-50 per visit depending on your plan."
      },
      {
        question: "Do I need a referral from my primary care doctor to see a psychiatrist with BCBS?",
        answer: "It depends on your BCBS plan type. PPO plans typically do not require a referral to see a psychiatrist. HMO and EPO plans may require a referral from your primary care physician. Check your BCBS benefits or call us at 386-848-8751 and we'll help you determine if a referral is needed."
      },
      {
        question: "How do I verify my BCBS coverage for psychiatry?",
        answer: "Call our office at 386-848-8751 with your BCBS member ID number and we'll verify your benefits before your first appointment. Our team will check your deductible status, copay amount, and confirm psychiatry coverage under your specific BCBS plan."
      },
      {
        question: "Does BCBS cover telepsychiatry (virtual psychiatrist appointments)?",
        answer: "Yes, most BCBS plans cover telepsychiatry appointments at the same rate as in-person visits. Virtual psychiatry allows you to see your Orlando psychiatrist from home via secure video, fully covered by your BCBS insurance benefits."
      },
      {
        question: "What BCBS plans do you accept in Orlando?",
        answer: "We accept most Blue Cross Blue Shield plans including BCBS Florida, Anthem BCBS, and national BCBS PPO plans. We are in-network providers for BCBS PPO, HMO, and EPO plans. Call 386-848-8751 to confirm we accept your specific BCBS plan."
      },
      {
        question: "How quickly can I see a BCBS psychiatrist in Orlando?",
        answer: "We offer same-week appointments for BCBS patients. Many patients are able to see one of our board-certified psychiatrists within 3-5 business days. Call 386-848-8751 to schedule your first BCBS-covered appointment."
      },
      {
        question: "What should I bring to my first appointment with BCBS insurance?",
        answer: "Please bring your BCBS insurance card, a valid photo ID, and any referral documentation if required by your plan. We'll handle BCBS billing and claims directly so you only pay your copay or coinsurance at the time of service."
      },
    ],
    quickLinks: [
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/anxiety-psychiatrist-orlando", label: "Anxiety Psychiatrist" },
      { href: "/adhd-psychiatrist-orlando", label: "ADHD Psychiatrist" },
      { href: "/medication-management-orlando", label: "Medication Management" },
      { href: "/telepsychiatry-orlando", label: "Telepsychiatry" },
      { href: "/insurance", label: "Insurance Information" },
      { href: "/psychiatrist-orlando-accepts-cigna", label: "Cigna Insurance" },
      { href: "/psychiatrist-orlando-accepts-aetna", label: "Aetna Insurance" },
    ],
  },
  analytics: {
    pageName: "BCBS Psychiatrist Orlando Page",
    conversionCategory: "bcbs_psychiatrist",
  },
};

// Psychiatry Orlando - Optimized for "psychiatry orlando" (720 volume)
export const psychiatryOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Psychiatry Orlando FL | #1 Rated | Accepting Patients 2025",
    description: "Looking for psychiatry in Orlando? Top-rated psychiatry clinic with board-certified psychiatrists. ADHD, anxiety, depression, bipolar treatment. Same-week appointments. 4.8★ rating. BCBS, Cigna, Medicare. Call (386) 848-8751.",
    keywords: ["psychiatry orlando", "psychiatry orlando fl", "psychiatric services orlando", "orlando psychiatry", "psychiatry clinic orlando", "psychiatric care orlando", "mental health psychiatry orlando", "best psychiatry orlando", "psychiatry near me orlando", "orlando psychiatric services", "psychiatry accepting new patients orlando"],
    canonicalPath: "/psychiatry-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "Psychiatry Orlando FL - Empathy Health Clinic",
    "description": "Comprehensive psychiatry services in Orlando, FL including medication management, psychiatric evaluations, and expert mental health treatment.",
    "url": "https://empathyhealthclinic.com/psychiatry-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Orlando",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.59544,
      "longitude": -81.36537
    },
    "areaServed": [
      { "@type": "City", "name": "Orlando" },
      { "@type": "City", "name": "Winter Park" },
      { "@type": "City", "name": "Altamonte Springs" },
      { "@type": "City", "name": "Lake Mary" },
      { "@type": "City", "name": "Maitland" }
    ],
    "medicalSpecialty": "Psychiatry"
  },
  hero: {
    title: "Psychiatry Services Orlando",
    subtitle: "Board-certified psychiatrists providing expert mental health care in Orlando. Medication management, psychiatric evaluations, and treatment for anxiety, depression, ADHD, bipolar disorder, and more. Same-week appointments available with in-person and telehealth options.",
    ctaPrimary: "Schedule Appointment",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Board-Certified Psychiatrists", "Same-Week Appointments", "Most Insurance Accepted"],
  },
  location: {
    title: "Orlando Psychiatry Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth & in-person available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Psychiatry Orlando: Expert Mental Health Treatment",
    introduction: [
      "Empathy Health Clinic provides comprehensive psychiatry services in Orlando, FL with board-certified psychiatrists who specialize in diagnosing and treating mental health conditions. Our psychiatric care combines expert medication management, thorough evaluations, and personalized treatment plans to help you achieve lasting mental wellness.",
      "Whether you're seeking treatment for anxiety, depression, ADHD, bipolar disorder, or other mental health concerns, our Orlando psychiatry team offers evidence-based care with same-week appointments, flexible scheduling, and both in-person and telehealth options.",
    ],
    conditionsHeading: "Mental Health Conditions We Treat",
    conditions: [
      { name: "Anxiety Disorders & Panic Attacks" },
      { name: "Depression & Mood Disorders" },
      { name: "ADHD (Adults & Adolescents)" },
      { name: "Bipolar Disorder" },
      { name: "OCD & Related Disorders" },
      { name: "PTSD & Trauma" },
      { name: "Insomnia & Sleep Disorders" },
      { name: "Schizophrenia & Psychotic Disorders" },
    ],
    servicesHeading: "Comprehensive Psychiatry Services in Orlando",
    services: [
      {
        icon: FileText,
        title: "Psychiatric Evaluations",
        description: "Comprehensive mental health assessments to accurately diagnose conditions and create personalized treatment plans. Our psychiatrists conduct thorough evaluations considering your symptoms, medical history, and life circumstances."
      },
      {
        icon: Brain,
        title: "Medication Management",
        description: "Expert psychiatric medication prescribing and monitoring. Our board-certified psychiatrists help you find the right medication and dosage to effectively manage your symptoms while minimizing side effects."
      },
      {
        icon: Brain,
        title: "ADHD Psychiatry",
        description: "Specialized ADHD diagnosis and treatment for adults, adolescents, and children. Stimulant and non-stimulant medication options with ongoing monitoring and adjustment for optimal symptom control."
      },
      {
        icon: Heart,
        title: "Anxiety & Depression Treatment",
        description: "Evidence-based psychiatric treatment for all types of anxiety disorders and depression. Medication options including SSRIs, SNRIs, and other effective treatments tailored to your specific condition."
      },
      {
        icon: Brain,
        title: "Bipolar Disorder Management",
        description: "Specialized care for bipolar I, bipolar II, and cyclothymic disorder. Mood stabilization medication management and ongoing monitoring to prevent manic and depressive episodes."
      },
      {
        icon: Video,
        title: "Telepsychiatry Services",
        description: "Convenient virtual psychiatry appointments from home. Same quality care as in-person visits with added flexibility and convenience. Most insurance plans cover telepsychiatry at the same rate as office visits."
      },
    ],
    faqHeading: "Psychiatry Orlando FAQs",
    faqs: [
      {
        question: "What is the difference between psychiatry and therapy?",
        answer: "Psychiatrists are medical doctors (MDs or DOs) who can prescribe medication and provide medical treatment for mental health conditions. Psychiatry focuses on the biological and medical aspects of mental health, including medication management. Therapists (like psychologists, counselors, or social workers) provide talk therapy and counseling but cannot prescribe medication in most states. At Empathy Health Clinic, we offer both psychiatry and therapy services."
      },
      {
        question: "Do I need a referral to see a psychiatrist in Orlando?",
        answer: "It depends on your insurance plan. Most PPO plans do not require a referral to see a psychiatrist. HMO and some other plans may require a referral from your primary care physician. Call us at 386-848-8751 and we'll help you determine if you need a referral based on your specific insurance plan."
      },
      {
        question: "What can I expect at my first psychiatry appointment?",
        answer: "Your first appointment (typically 60 minutes) includes a comprehensive psychiatric evaluation where your psychiatrist will discuss your symptoms, medical history, current medications, and life circumstances. They'll work with you to develop a personalized treatment plan which may include medication, therapy referrals, or other interventions. Follow-up medication management appointments are typically 15-30 minutes."
      },
      {
        question: "How quickly can I see a psychiatrist in Orlando?",
        answer: "We offer same-week appointments for new patients at our Orlando psychiatry clinic. Many patients can be seen within 3-5 business days. We understand that mental health concerns are urgent, and we prioritize getting you in quickly. Call 386-848-8751 to schedule your first appointment."
      },
      {
        question: "Does insurance cover psychiatry services?",
        answer: "Yes, most health insurance plans cover psychiatry services including psychiatric evaluations and medication management appointments. We accept most major insurance plans including Blue Cross Blue Shield, UMR, Medicare, Aetna, Cigna, and many others. Call our office at 386-848-8751 to verify your specific insurance coverage before your appointment."
      },
      {
        question: "Do you offer telepsychiatry (virtual appointments)?",
        answer: "Yes, we offer telepsychiatry appointments for Orlando patients who prefer virtual care. Telepsychiatry provides the same quality psychiatric care as in-person visits but from the convenience of your home. Most insurance plans cover telepsychiatry at the same rate as office visits. Both initial evaluations and follow-up medication management can be conducted via secure video."
      },
      {
        question: "What areas of Orlando do you serve?",
        answer: "Our Orlando psychiatry clinic is located in Winter Park and serves patients throughout the Greater Orlando area including Orlando, Winter Park, Altamonte Springs, Maitland, Lake Mary, Casselberry, Oviedo, and surrounding communities. We also offer telepsychiatry for patients anywhere in Florida."
      },
      {
        question: "Are your psychiatrists board-certified?",
        answer: "Yes, all psychiatrists at Empathy Health Clinic are board-certified by the American Board of Psychiatry and Neurology. Our providers have extensive training and experience in diagnosing and treating the full spectrum of mental health conditions with evidence-based psychiatric care."
      },
    ],
  },
  faqs: [
    {
      question: "What is the difference between psychiatry and therapy?",
      answer: "Psychiatrists are medical doctors (MDs or DOs) who can prescribe medication and provide medical treatment for mental health conditions. Psychiatry focuses on the biological and medical aspects of mental health, including medication management. Therapists (like psychologists, counselors, or social workers) provide talk therapy and counseling but cannot prescribe medication in most states. At Empathy Health Clinic, we offer both psychiatry and therapy services."
    },
    {
      question: "Do I need a referral to see a psychiatrist in Orlando?",
      answer: "It depends on your insurance plan. Most PPO plans do not require a referral to see a psychiatrist. HMO and some other plans may require a referral from your primary care physician. Call us at 386-848-8751 and we'll help you determine if you need a referral based on your specific insurance plan."
    },
    {
      question: "What can I expect at my first psychiatry appointment?",
      answer: "Your first appointment (typically 60 minutes) includes a comprehensive psychiatric evaluation where your psychiatrist will discuss your symptoms, medical history, current medications, and life circumstances. They'll work with you to develop a personalized treatment plan which may include medication, therapy referrals, or other interventions. Follow-up medication management appointments are typically 15-30 minutes."
    },
    {
      question: "How quickly can I see a psychiatrist in Orlando?",
      answer: "We offer same-week appointments for new patients at our Orlando psychiatry clinic. Many patients can be seen within 3-5 business days. We understand that mental health concerns are urgent, and we prioritize getting you in quickly. Call 386-848-8751 to schedule your first appointment."
    },
    {
      question: "Does insurance cover psychiatry services?",
      answer: "Yes, most health insurance plans cover psychiatry services including psychiatric evaluations and medication management appointments. We accept most major insurance plans including Blue Cross Blue Shield, UMR, Medicare, Aetna, Cigna, and many others. Call our office at 386-848-8751 to verify your specific insurance coverage before your appointment."
    },
    {
      question: "Do you offer telepsychiatry (virtual appointments)?",
      answer: "Yes, we offer telepsychiatry appointments for Orlando patients who prefer virtual care. Telepsychiatry provides the same quality psychiatric care as in-person visits but from the convenience of your home. Most insurance plans cover telepsychiatry at the same rate as office visits. Both initial evaluations and follow-up medication management can be conducted via secure video."
    },
    {
      question: "What areas of Orlando do you serve?",
      answer: "Our Orlando psychiatry clinic is located in Winter Park and serves patients throughout the Greater Orlando area including Orlando, Winter Park, Altamonte Springs, Maitland, Lake Mary, Casselberry, Oviedo, and surrounding communities. We also offer telepsychiatry for patients anywhere in Florida."
    },
    {
      question: "Are your psychiatrists board-certified?",
      answer: "Yes, all psychiatrists at Empathy Health Clinic are board-certified by the American Board of Psychiatry and Neurology. Our providers have extensive training and experience in diagnosing and treating the full spectrum of mental health conditions with evidence-based psychiatric care."
    },
  ],
  sidebar: {
    formHeading: "Schedule Your Psychiatry Appointment",
    formSubheading: "Take the first step toward better mental health with expert psychiatric care in Orlando.",
    formType: "contact",
    quickLinks: [
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/anxiety-psychiatrist-orlando", label: "Anxiety Psychiatrist" },
      { href: "/adhd-psychiatrist-orlando", label: "ADHD Psychiatrist" },
      { href: "/medication-management-orlando", label: "Medication Management" },
      { href: "/telepsychiatry-orlando", label: "Telepsychiatry" },
      { href: "/psychiatric-evaluation-orlando", label: "Psychiatric Evaluation" },
      { href: "/psychiatrist-orlando-accepts-bcbs", label: "BCBS Insurance" },
      { href: "/psychiatrist-orlando-accepts-cigna", label: "Cigna Insurance" },
      { href: "/psychiatrist-orlando-accepts-aetna", label: "Aetna Insurance" },
    ],
  },
  analytics: {
    pageName: "Psychiatry Orlando Page",
    conversionCategory: "psychiatry_orlando",
  },
};

// Psychiatrist Orlando - Optimized for "psychiatrist orlando" (Rank 10)
export const psychiatristOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Psychiatrist Orlando | Anxiety, ADHD & Mental Health Treatment",
    description: "Top-rated psychiatrist in Orlando for anxiety, ADHD, depression & medication management. Same-week appointments. Most insurance accepted.",
    keywords: ["psychiatrist orlando", "psychiatrist orlando fl", "orlando psychiatrist", "psychiatrists in orlando", "find psychiatrist orlando", "best psychiatrist orlando", "board certified psychiatrist orlando", "top psychiatrist orlando", "psychiatrist near me orlando", "orlando fl psychiatrist", "anxiety psychiatrist orlando", "adhd psychiatrist orlando", "medication management orlando"],
    canonicalPath: "/psychiatrist-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "Psychiatrist Orlando FL - Empathy Health Clinic",
    "description": "Board-certified psychiatrists in Orlando, FL providing expert mental health treatment and medication management.",
    "url": "https://empathyhealthclinic.com/psychiatrist-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Orlando",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.59544,
      "longitude": -81.36537
    },
    "areaServed": [
      { "@type": "City", "name": "Orlando" },
      { "@type": "City", "name": "Winter Park" },
      { "@type": "City", "name": "Altamonte Springs" },
      { "@type": "City", "name": "Lake Mary" },
      { "@type": "City", "name": "Maitland" }
    ],
    "medicalSpecialty": "Psychiatry",
    "sameAs": [
      "https://www.facebook.com/empathyhealthclinic",
      "https://www.instagram.com/empathyhealthclinic",
      "https://www.linkedin.com/company/empathy-health-clinic",
      "https://www.psychologytoday.com/us/psychiatrists/empathy-health-clinic-winter-park-fl",
      "https://www.healthgrades.com/group-directory/fl-florida/winter-park/empathy-health-clinic",
      "https://www.zocdoc.com/practice/empathy-health-clinic"
    ]
  },
  hero: {
    title: "Psychiatrist Orlando",
    subtitle: "Connect with board-certified psychiatrists in Orlando for comprehensive mental health treatment. Medication management, psychiatric evaluations, and treatment for anxiety, depression, ADHD, bipolar disorder, and more. Same-week appointments with in-person and telehealth options.",
    ctaPrimary: "Schedule Appointment",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Board-Certified Psychiatrists", "Same-Week Appointments", "Most Insurance Accepted"],
  },
  location: {
    title: "Orlando Psychiatrist Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth & in-person available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Psychiatrist Orlando: Board-Certified Mental Health Experts",
    introduction: [
      "Finding the right psychiatrist in Orlando is essential for effective mental health treatment. At Empathy Health Clinic, our board-certified psychiatrists provide expert care for a wide range of mental health conditions including anxiety, depression, ADHD, bipolar disorder, and more.",
      "Our Orlando psychiatrists combine years of medical training with compassionate, patient-centered care to deliver personalized treatment plans that address your unique needs. Whether you need medication management, psychiatric evaluations, or ongoing mental health support, our team is here to help you achieve lasting wellness.",
    ],
    conditionsHeading: "Mental Health Conditions Our Psychiatrists Treat",
    conditions: [
      { name: "Anxiety Disorders & Panic Attacks" },
      { name: "Depression & Mood Disorders" },
      { name: "ADHD (Adults & Adolescents)" },
      { name: "Bipolar Disorder" },
      { name: "OCD & Related Disorders" },
      { name: "PTSD & Trauma-Related Disorders" },
      { name: "Insomnia & Sleep Disorders" },
      { name: "Schizophrenia & Psychotic Disorders" },
    ],
    authoritativeSources: [
      { source: "APA" as const, topic: "What is a Psychiatrist?" },
      { source: "NIMH" as const, topic: "Mental Health Information" },
    ],
    internalLinksCategory: "conditions" as const,
    showTrustFactors: true,
    servicesHeading: "Orlando Psychiatry Services",
    services: [
      {
        icon: FileText,
        title: "Comprehensive Psychiatric Evaluations",
        description: "Thorough mental health assessments to accurately diagnose your condition. Our psychiatrists take time to understand your symptoms, medical history, and life circumstances to create an effective treatment plan tailored to your needs."
      },
      {
        icon: Brain,
        title: "Medication Management",
        description: "Expert psychiatric medication prescribing and ongoing monitoring. Our board-certified psychiatrists help you find the right medication and dosage to manage your symptoms effectively while minimizing side effects through careful monitoring and adjustments."
      },
      {
        icon: Brain,
        title: "ADHD Treatment",
        description: "Specialized ADHD diagnosis and treatment for adults, adolescents, and children. Both stimulant and non-stimulant medication options with ongoing monitoring to optimize symptom control and improve daily functioning."
      },
      {
        icon: Heart,
        title: "Anxiety & Depression Care",
        description: "Evidence-based treatment for all types of anxiety and depression. Medication options including SSRIs, SNRIs, and other proven treatments customized to your specific diagnosis and symptom profile."
      },
      {
        icon: Brain,
        title: "Bipolar Disorder Treatment",
        description: "Expert care for bipolar I, bipolar II, and cyclothymic disorder. Mood stabilization through carefully managed medication regimens and ongoing monitoring to prevent manic and depressive episodes."
      },
      {
        icon: Video,
        title: "Telepsychiatry Options",
        description: "Convenient virtual appointments with Orlando psychiatrists from the comfort of your home. Same quality psychiatric care as in-person visits with added flexibility. Most insurance covers telepsychiatry at the same rate."
      },
    ],
  },
  faqs: [
    {
      question: "How do I choose the right psychiatrist in Orlando?",
      answer: "When choosing a psychiatrist in Orlando, look for board certification, experience with your specific condition, convenient location, insurance acceptance, and appointment availability. At Empathy Health Clinic, all our psychiatrists are board-certified and experienced in treating a wide range of mental health conditions. We offer same-week appointments and accept most major insurance plans."
    },
    {
      question: "What's the difference between a psychiatrist and a therapist?",
      answer: "Psychiatrists are medical doctors (MD or DO) who can prescribe medication and provide medical treatment for mental health conditions. They focus on the biological aspects of mental health including medication management. Therapists (psychologists, counselors, social workers) provide talk therapy and counseling but typically cannot prescribe medication. Many patients benefit from seeing both a psychiatrist for medication and a therapist for counseling."
    },
    {
      question: "How quickly can I see a psychiatrist in Orlando?",
      answer: "At Empathy Health Clinic, we offer same-week appointments for new patients. Many people can schedule their first appointment within 3-5 business days. We understand that mental health needs are urgent, and we prioritize getting you in to see a psychiatrist quickly. Call 386-848-8751 to schedule your appointment."
    },
    {
      question: "Does insurance cover psychiatrist appointments?",
      answer: "Yes, most health insurance plans cover psychiatrist appointments including initial evaluations and medication management follow-ups. We accept most major insurance including Blue Cross Blue Shield, UMR, Medicare, Aetna, Cigna, and many others. Contact our office at 386-848-8751 to verify your specific insurance coverage."
    },
    {
      question: "Do I need a referral to see a psychiatrist?",
      answer: "It depends on your insurance plan. Most PPO plans do not require a referral to see a psychiatrist. HMO and some other insurance plans may require a referral from your primary care doctor. Call us at 386-848-8751 and we'll help you determine if you need a referral based on your insurance."
    },
    {
      question: "What should I expect at my first psychiatrist appointment?",
      answer: "Your first appointment (typically 60 minutes) includes a comprehensive psychiatric evaluation. Your psychiatrist will discuss your symptoms, mental health history, current medications, medical conditions, and life circumstances. Together you'll develop a personalized treatment plan which may include medication, lifestyle changes, or therapy referrals. Follow-up appointments are typically 15-30 minutes for medication management."
    },
    {
      question: "Do Orlando psychiatrists offer virtual appointments?",
      answer: "Yes, our Orlando psychiatrists offer telepsychiatry (virtual appointments) for patients who prefer remote care. Telepsychiatry provides the same quality psychiatric care as in-person visits but with added convenience. Most insurance plans cover telepsychiatry at the same rate as office visits."
    },
    {
      question: "Are your psychiatrists board-certified?",
      answer: "Yes, all psychiatrists at Empathy Health Clinic are board-certified by the American Board of Psychiatry and Neurology. Our providers have completed extensive medical training including medical school, psychiatry residency, and ongoing continuing education to stay current with the latest evidence-based treatments."
    },
  ],
  sidebar: {
    formHeading: "Schedule with a Psychiatrist",
    formSubheading: "Connect with an expert psychiatrist in Orlando for comprehensive mental health care.",
    formType: "contact",
    quickLinks: [
      { href: "/psychiatrist-near-me", label: "Psychiatrist Near Me" },
      { href: "/psychiatrist-winter-park", label: "Psychiatrist Winter Park" },
      { href: "/medication-management-orlando", label: "Medication Management" },
      { href: "/anxiety-psychiatrist-orlando", label: "Anxiety Treatment" },
      { href: "/adhd-psychiatrist-orlando", label: "ADHD Psychiatrist" },
      { href: "/new-patients", label: "New Patients" },
      { href: "/best-psychiatrist-orlando", label: "Best Psychiatrist Orlando" },
      { href: "/mental-health-doctor-orlando", label: "Mental Health Doctor" },
      { href: "/online-psychiatrist-florida", label: "Online Psychiatrist FL" },
      { href: "/depression-psychiatrist-orlando", label: "Depression Psychiatrist" },
      { href: "/psychiatrist-for-anxiety-near-me", label: "Anxiety Psychiatrist Near Me" },
    ],
  },
  analytics: {
    pageName: "Psychiatrist Orlando Page",
    conversionCategory: "psychiatrist_orlando",
  },
};

// ADHD Psychiatrist Orlando - Optimized for "adhd psychiatrist orlando" (590 volume)
export const adhdPsychiatristOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "ADHD Psychiatrist Orlando | Adult & Child ADHD Specialists",
    description: "ADHD psychiatrist Orlando specialists for adults & children. Board-certified ADHD doctors prescribing Adderall, Vyvanse, Concerta, non-stimulants. Same-week ADHD evaluations. 4.8★ rated. BCBS, Cigna, Medicare. (386) 848-8751.",
    keywords: ["adhd psychiatrist orlando", "adhd psychiatrist orlando fl", "adhd doctor orlando", "adhd specialist orlando", "adult adhd psychiatrist orlando", "child adhd psychiatrist orlando", "add doctor orlando", "adhd medication management orlando", "adhd diagnosis orlando", "best adhd psychiatrist orlando", "adhd psychiatrist near me", "adhd medication orlando"],
    canonicalPath: "/adhd-psychiatrist-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "ADHD Psychiatrist Orlando FL - Empathy Health Clinic",
    "description": "Specialized ADHD diagnosis and treatment in Orlando, FL for adults, teens, and children by board-certified psychiatrists.",
    "url": "https://empathyhealthclinic.com/adhd-psychiatrist-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Orlando",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.59544,
      "longitude": -81.36537
    },
    "areaServed": [
      { "@type": "City", "name": "Orlando" },
      { "@type": "City", "name": "Winter Park" },
      { "@type": "City", "name": "Altamonte Springs" },
      { "@type": "City", "name": "Lake Mary" },
      { "@type": "City", "name": "Maitland" }
    ],
    "medicalSpecialty": "Psychiatry"
  },
  hero: {
    title: "ADHD Psychiatrist Orlando",
    subtitle: "Specialized ADHD diagnosis and treatment by board-certified psychiatrists. Comprehensive evaluations, medication management, and personalized treatment plans for adults, teens, and children with ADHD. Same-week appointments available with in-person and telehealth options.",
    ctaPrimary: "Schedule ADHD Evaluation",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["ADHD Specialists", "Adult & Child Treatment", "Same-Week Appointments"],
  },
  location: {
    title: "ADHD Psychiatry Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth & in-person available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "ADHD Psychiatrist Orlando: Specialized ADHD Treatment",
    introduction: [
      "Finding an experienced ADHD psychiatrist in Orlando is crucial for effective ADHD treatment. At Empathy Health Clinic, our board-certified psychiatrists specialize in diagnosing and treating ADHD in adults, adolescents, and children with evidence-based approaches tailored to each patient's unique needs.",
      "Our ADHD specialists in Orlando provide comprehensive evaluations, medication management with both stimulant and non-stimulant options, and ongoing support to help you or your child thrive with ADHD. We understand the challenges of living with ADHD and are committed to helping you achieve better focus, organization, and overall quality of life. Need to get tested first? Schedule your <a href='/adhd-testing-orlando' class='text-primary hover:underline font-medium'>ADHD testing in Orlando</a> to receive a comprehensive evaluation before starting treatment.",
    ],
    conditionsHeading: "ADHD Types We Treat",
    conditions: [
      { name: "ADHD - Inattentive Type" },
      { name: "ADHD - Hyperactive-Impulsive Type" },
      { name: "ADHD - Combined Type" },
      { name: "Adult ADHD" },
      { name: "Child & Adolescent ADHD" },
      { name: "ADD (Attention Deficit Disorder)" },
    ],
    authoritativeSources: [
      { source: "NIMH" as const, topic: "Attention-Deficit/Hyperactivity Disorder" },
      { source: "APA" as const, topic: "ADHD Diagnosis and Treatment" },
    ],
    internalLinksCategory: "services" as const,
    showTrustFactors: true,
    servicesHeading: "ADHD Psychiatry Services in Orlando",
    services: [
      {
        icon: FileText,
        title: "Comprehensive ADHD Evaluations",
        description: "Thorough ADHD assessments using validated diagnostic tools and clinical interviews. Our psychiatrists evaluate symptoms, rule out other conditions, and determine the best treatment approach for your specific ADHD presentation."
      },
      {
        icon: Brain,
        title: "ADHD Medication Management",
        description: "Expert prescribing and monitoring of ADHD medications including stimulants (Adderall, Vyvanse, Ritalin, Concerta) and non-stimulants (Strattera, Intuniv, Qelbree). We work with you to find the right medication and dosage for optimal symptom control with minimal side effects."
      },
      {
        icon: Users,
        title: "Adult ADHD Treatment",
        description: "Specialized care for adults with ADHD including late diagnosis, workplace accommodations, and managing ADHD alongside other mental health conditions. Our psychiatrists understand the unique challenges adults face with ADHD."
      },
      {
        icon: Heart,
        title: "Child & Teen ADHD Care",
        description: "Age-appropriate ADHD treatment for children and adolescents. We work closely with parents, schools, and other providers to create comprehensive treatment plans that support academic success and social development."
      },
      {
        icon: CheckCircle,
        title: "Stimulant Medication Options",
        description: "Carefully managed stimulant medications for ADHD including short-acting and long-acting formulations. Ongoing monitoring to ensure effectiveness and adjust dosage as needed for optimal symptom control throughout the day."
      },
      {
        icon: Brain,
        title: "Non-Stimulant Alternatives",
        description: "Non-stimulant ADHD medication options for patients who don't respond to stimulants, have contraindications, or prefer non-stimulant treatment. Options include Strattera, Intuniv, and Qelbree with proven effectiveness for ADHD symptoms."
      },
    ],
  },
  faqs: [
    {
      question: "How is ADHD diagnosed by a psychiatrist?",
      answer: "ADHD diagnosis involves a comprehensive psychiatric evaluation including detailed symptom history, standardized ADHD rating scales, review of childhood symptoms (for adults), and ruling out other conditions. Our psychiatrists use DSM-5 criteria and validated assessment tools to ensure accurate diagnosis. The evaluation typically takes 60 minutes and includes discussion of symptoms in multiple settings (home, work, school)."
    },
    {
      question: "What ADHD medications do Orlando psychiatrists prescribe?",
      answer: "Our psychiatrists prescribe both stimulant and non-stimulant ADHD medications. Stimulants include Adderall, Vyvanse, Ritalin, Concerta, and Focalin. Non-stimulants include Strattera, Intuniv, Qelbree, and Wellbutrin. The choice depends on your symptoms, medical history, lifestyle needs, and response to treatment. We start with low doses and adjust as needed."
    },
    {
      question: "Can adults be diagnosed with ADHD?",
      answer: "Yes, many adults are diagnosed with ADHD for the first time in adulthood. Adult ADHD is common and often goes undiagnosed until symptoms significantly impact work, relationships, or daily functioning. Our psychiatrists specialize in adult ADHD diagnosis and can help determine if your symptoms are ADHD or another condition."
    },
    {
      question: "How quickly can I see an ADHD psychiatrist in Orlando?",
      answer: "We offer same-week appointments for ADHD evaluations. Many patients can be seen within 3-5 business days. We understand that ADHD symptoms can significantly impact your life, and we prioritize getting you in quickly for evaluation and treatment. Call 386-848-8751 to schedule your ADHD evaluation."
    },
    {
      question: "Does insurance cover ADHD treatment?",
      answer: "Yes, most health insurance plans cover ADHD diagnosis and treatment including psychiatric evaluations and medication management appointments. We accept most major insurance plans including Blue Cross Blue Shield, UMR, Medicare, Aetna, Cigna, and many others. Contact us at 386-848-8751 to verify your coverage."
    },
    {
      question: "What's the difference between ADD and ADHD?",
      answer: "ADD (Attention Deficit Disorder) is an outdated term. The current diagnosis is ADHD with three types: predominantly inattentive (what used to be called ADD), predominantly hyperactive-impulsive, and combined type. Our psychiatrists use the current DSM-5 diagnostic criteria to accurately identify your ADHD subtype and create an appropriate treatment plan."
    },
    {
      question: "Do you offer ADHD medication management without prior diagnosis?",
      answer: "If you don't have a confirmed ADHD diagnosis, you'll need a comprehensive ADHD evaluation first. This typically takes 60 minutes and includes symptom assessment, medical history, and diagnostic testing. Once diagnosed, follow-up medication management appointments are typically 15-30 minutes. If you were previously diagnosed elsewhere, bring documentation and we may be able to proceed directly to medication management."
    },
    {
      question: "Can ADHD be treated without medication?",
      answer: "While medication is often the most effective treatment for ADHD, some patients benefit from non-medication approaches or combination treatment. Our psychiatrists can discuss all options including behavioral strategies, therapy referrals, and lifestyle modifications. However, for moderate to severe ADHD, medication is typically recommended as the first-line treatment based on extensive research evidence."
    },
  ],
  sidebar: {
    formHeading: "Schedule ADHD Evaluation",
    formSubheading: "Get expert ADHD diagnosis and treatment from specialized psychiatrists in Orlando.",
    formType: "contact",
    quickLinks: [
      { href: "/adhd-testing-orlando", label: "ADHD Testing in Orlando" },
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/psychiatry-orlando", label: "Psychiatry Services" },
      { href: "/anxiety-psychiatrist-orlando", label: "Anxiety Treatment" },
      { href: "/medication-management-orlando", label: "Medication Management" },
      { href: "/new-patients", label: "New Patients" },
      { href: "/best-psychiatrist-orlando", label: "Best Psychiatrist Orlando" },
      { href: "/mental-health-doctor-orlando", label: "Mental Health Doctor" },
      { href: "/online-psychiatrist-florida", label: "Online Psychiatrist FL" },
      { href: "/depression-psychiatrist-orlando", label: "Depression Psychiatrist" },
    ],
  },
  analytics: {
    pageName: "ADHD Psychiatrist Orlando Page",
    conversionCategory: "adhd_psychiatrist_orlando",
  },
};

// Bipolar Psychiatrist Orlando - Optimized for "bipolar psychiatrist orlando" (not in top 20)
export const bipolarPsychiatristOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Bipolar Psychiatrist Orlando | Mood Disorder Experts",
    description: "Top bipolar psychiatrist in Orlando, FL. Expert mood stabilization for Bipolar I, II. Lithium, Lamictal, Seroquel. Same-week appointments. Call (386) 848-8751.",
    keywords: ["bipolar psychiatrist orlando", "bipolar psychiatrist orlando fl", "bipolar disorder treatment orlando", "bipolar doctor orlando", "mood disorder specialist orlando", "bipolar medication management orlando", "manic depression treatment orlando", "bipolar 2 psychiatrist orlando", "best bipolar psychiatrist orlando"],
    canonicalPath: "/bipolar-psychiatrist-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "Bipolar Psychiatrist Orlando FL - Empathy Health Clinic",
    "description": "Specialized bipolar disorder treatment in Orlando, FL by board-certified psychiatrists with expertise in mood stabilization.",
    "url": "https://empathyhealthclinic.com/bipolar-psychiatrist-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Orlando",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.59544,
      "longitude": -81.36537
    },
    "areaServed": [
      { "@type": "City", "name": "Orlando" },
      { "@type": "City", "name": "Winter Park" },
      { "@type": "City", "name": "Altamonte Springs" },
      { "@type": "City", "name": "Lake Mary" },
      { "@type": "City", "name": "Maitland" }
    ],
    "medicalSpecialty": "Psychiatry"
  },
  hero: {
    title: "Bipolar Psychiatrist Orlando",
    subtitle: "Specialized treatment for bipolar disorder by board-certified psychiatrists. Expert mood stabilization, medication management, and comprehensive care for bipolar I, bipolar II, and cyclothymia. Same-week appointments with in-person and telehealth options.",
    ctaPrimary: "Schedule Appointment",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Mood Disorder Specialists", "Evidence-Based Treatment", "Same-Week Appointments"],
  },
  location: {
    title: "Bipolar Treatment Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth & in-person available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Bipolar Psychiatrist Orlando: Specialized Mood Disorder Care",
    introduction: [
      "Living with bipolar disorder requires specialized psychiatric care from experienced mood disorder specialists. At Empathy Health Clinic, our board-certified psychiatrists in Orlando provide expert treatment for bipolar I, bipolar II, and cyclothymic disorder with evidence-based medication management and comprehensive care.",
      "Our bipolar disorder specialists understand the complex nature of mood disorders and work closely with you to achieve mood stabilization, prevent manic and depressive episodes, and improve your overall quality of life through personalized treatment plans and ongoing support.",
    ],
    conditionsHeading: "Bipolar Disorders We Treat",
    conditions: [
      { name: "Bipolar I Disorder" },
      { name: "Bipolar II Disorder" },
      { name: "Cyclothymic Disorder" },
      { name: "Rapid Cycling Bipolar" },
      { name: "Manic Episodes" },
      { name: "Depressive Episodes" },
      { name: "Mixed Episodes" },
    ],
    authoritativeSources: [
      { source: "NIMH" as const, topic: "Bipolar Disorder" },
      { source: "APA" as const, topic: "Bipolar and Related Disorders" },
    ],
    internalLinksCategory: "services" as const,
    showTrustFactors: true,
    servicesHeading: "Bipolar Disorder Treatment Services",
    services: [
      {
        icon: Brain,
        title: "Mood Stabilization",
        description: "Expert medication management with mood stabilizers including lithium, Depakote, Lamictal, and atypical antipsychotics. Careful monitoring and dosage adjustments to achieve stable mood and prevent both manic and depressive episodes."
      },
      {
        icon: FileText,
        title: "Comprehensive Evaluations",
        description: "Thorough psychiatric assessments to accurately diagnose bipolar disorder type and distinguish from other mood disorders. Our psychiatrists conduct detailed evaluations of mood patterns, episode history, and symptom severity to guide treatment."
      },
      {
        icon: Heart,
        title: "Manic Episode Management",
        description: "Specialized treatment for manic episodes including medication adjustments, crisis intervention, and hospitalization coordination when needed. Our psychiatrists are experienced in managing acute mania and preventing future manic episodes."
      },
      {
        icon: Brain,
        title: "Depression Treatment",
        description: "Evidence-based treatment for bipolar depression using mood stabilizers and carefully selected antidepressants. Our psychiatrists understand the unique challenges of treating depression in bipolar disorder to avoid triggering mania."
      },
      {
        icon: CheckCircle,
        title: "Medication Monitoring",
        description: "Ongoing medication management with regular follow-ups to monitor effectiveness, side effects, and blood levels (when applicable). Our psychiatrists make timely adjustments to maintain mood stability and minimize side effects."
      },
      {
        icon: Video,
        title: "Telepsychiatry for Bipolar",
        description: "Convenient virtual psychiatry appointments for ongoing bipolar disorder management. Regular telepsychiatry visits ensure continuity of care and early intervention if mood symptoms emerge. Most insurance covers telepsychiatry."
      },
    ],
  },
  faqs: [
    {
      question: "What is the difference between bipolar I and bipolar II?",
      answer: "Bipolar I disorder involves at least one manic episode (elevated mood lasting 7+ days or requiring hospitalization). Bipolar II involves at least one hypomanic episode (milder elevated mood lasting 4+ days) and at least one major depressive episode, but no full manic episodes. Both require treatment by a psychiatrist, but medication approaches may differ. Our psychiatrists will diagnose your specific bipolar type and create an appropriate treatment plan."
    },
    {
      question: "What medications are used to treat bipolar disorder?",
      answer: "Bipolar disorder is typically treated with mood stabilizers (lithium, Depakote, Lamictal), atypical antipsychotics (Abilify, Seroquel, Latuda, Zyprexa), and sometimes antidepressants (with caution to avoid triggering mania). The specific medication depends on your bipolar type, symptom pattern, medical history, and treatment response. Our psychiatrists carefully select and monitor medications to achieve mood stability."
    },
    {
      question: "How is bipolar disorder diagnosed?",
      answer: "Bipolar disorder diagnosis involves a comprehensive psychiatric evaluation including detailed mood history, family history, episode patterns, and symptom assessment. Our psychiatrists use DSM-5 criteria and look for patterns of manic/hypomanic episodes and depressive episodes. Accurate diagnosis is essential as bipolar disorder is often misdiagnosed as depression, requiring different treatment approaches."
    },
    {
      question: "Can bipolar disorder be cured?",
      answer: "Bipolar disorder is a chronic condition that cannot be cured, but it can be effectively managed with proper treatment. Most people with bipolar disorder achieve good mood stability with the right medication regimen and ongoing psychiatric care. Our psychiatrists work with you long-term to maintain mood stability, prevent episodes, and help you live a full, productive life."
    },
    {
      question: "What are the warning signs of a manic episode?",
      answer: "Warning signs of mania include decreased need for sleep, racing thoughts, rapid speech, increased energy, impulsive behavior, excessive spending, risky behavior, and inflated self-esteem or grandiosity. If you notice these symptoms emerging, contact your psychiatrist immediately for medication adjustment to prevent a full manic episode. Our psychiatrists provide education on recognizing early warning signs."
    },
    {
      question: "How quickly can I see a bipolar psychiatrist in Orlando?",
      answer: "We offer same-week appointments for bipolar disorder treatment. Many patients can be seen within 3-5 business days. For urgent situations involving severe mania or suicidal depression, we prioritize same-day or next-day appointments when possible. Call 386-848-8751 to schedule your appointment."
    },
    {
      question: "Does insurance cover bipolar disorder treatment?",
      answer: "Yes, health insurance typically covers bipolar disorder treatment as it is a recognized medical condition. This includes psychiatric evaluations, medication management appointments, and laboratory monitoring (like lithium levels). We accept most major insurance plans. Contact us at 386-848-8751 to verify your coverage."
    },
    {
      question: "Do I need therapy in addition to medication?",
      answer: "While medication is the cornerstone of bipolar disorder treatment, many patients also benefit from therapy. Evidence-based therapies for bipolar disorder include cognitive behavioral therapy (CBT), interpersonal and social rhythm therapy (IPSRT), and family-focused therapy. Our psychiatrists can provide therapy referrals to complement your medication management."
    },
  ],
  sidebar: {
    formHeading: "Schedule Bipolar Treatment",
    formSubheading: "Get expert care for bipolar disorder from specialized psychiatrists in Orlando.",
    formType: "contact",
    quickLinks: [
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/psychiatry-orlando", label: "Psychiatry Services" },
      { href: "/anxiety-psychiatrist-orlando", label: "Anxiety Treatment" },
      { href: "/medication-management-orlando", label: "Medication Management" },
      { href: "/telepsychiatry-orlando", label: "Telepsychiatry" },
      { href: "/psychiatric-evaluation-orlando", label: "Psychiatric Evaluation" },
      { href: "/psychiatrist-orlando-accepts-bcbs", label: "BCBS Insurance" },
      { href: "/psychiatrist-orlando-accepts-cigna", label: "Cigna Insurance" },
      { href: "/psychiatrist-orlando-accepts-aetna", label: "Aetna Insurance" },
    ],
  },
  analytics: {
    pageName: "Bipolar Psychiatrist Orlando Page",
    conversionCategory: "bipolar_psychiatrist_orlando",
  },
};

// Medication Management Orlando - Optimized for "medication management orlando" (480 volume)
export const medicationManagementOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Medication Management Orlando FL | 2025",
    description: "Looking for medication management in Orlando? Board-certified psychiatrists for psychiatric medication prescribing & monitoring. Anxiety, depression, ADHD, bipolar. Same-week appointments. BCBS, Cigna, Medicare. Call (386) 848-8751.",
    keywords: ["medication management orlando", "medication management psychiatrist orlando", "psychiatric medication management orlando fl", "medication management orlando fl", "psychiatric medication management orlando", "mental health medication orlando", "psych meds orlando", "medication monitoring orlando", "psychiatric medication prescribing orlando", "medication management near me"],
    canonicalPath: "/medication-management-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "Medication Management Orlando FL - Empathy Health Clinic",
    "description": "Expert psychiatric medication management in Orlando, FL by board-certified psychiatrists for mental health conditions.",
    "url": "https://empathyhealthclinic.com/medication-management-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Orlando",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.59544,
      "longitude": -81.36537
    },
    "areaServed": [
      { "@type": "City", "name": "Orlando" },
      { "@type": "City", "name": "Winter Park" },
      { "@type": "City", "name": "Altamonte Springs" },
      { "@type": "City", "name": "Lake Mary" },
      { "@type": "City", "name": "Maitland" }
    ],
    "medicalSpecialty": "Psychiatry"
  },
  hero: {
    title: "Medication Management Orlando",
    subtitle: "Professional psychiatric medication management by board-certified psychiatrists. Expert prescribing, monitoring, and adjustment of mental health medications for anxiety, depression, ADHD, bipolar disorder, and more. Same-week appointments with in-person and telehealth options.",
    ctaPrimary: "Schedule Appointment",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Board-Certified Psychiatrists", "Expert Medication Monitoring", "Same-Week Appointments"],
  },
  location: {
    title: "Medication Management Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth & in-person available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Medication Management Orlando: Expert Psychiatric Medication Care",
    introduction: [
      "Effective medication management is essential for treating mental health conditions. At Empathy Health Clinic, our board-certified psychiatrists in Orlando provide expert medication management services including careful prescribing, ongoing monitoring, dosage adjustments, and side effect management to help you achieve optimal mental health outcomes.",
      "Whether you're starting a new medication, need ongoing medication monitoring, or want a second opinion on your current medication regimen, our Orlando psychiatrists offer personalized medication management with same-week appointments and flexible scheduling options including telepsychiatry.",
    ],
    conditionsHeading: "Conditions We Treat with Medication Management",
    conditions: [
      { name: "Anxiety Disorders" },
      { name: "Depression & Mood Disorders" },
      { name: "ADHD" },
      { name: "Bipolar Disorder" },
      { name: "OCD" },
      { name: "PTSD" },
      { name: "Insomnia & Sleep Disorders" },
      { name: "Schizophrenia & Psychotic Disorders" },
    ],
    authoritativeSources: [
      { source: "APA" as const, topic: "Psychiatric Medications" },
      { source: "NIH" as const, topic: "Mental Health Medications" },
    ],
    internalLinksCategory: "conditions" as const,
    showTrustFactors: true,
    servicesHeading: "Medication Management Services in Orlando",
    services: [
      {
        icon: Brain,
        title: "Psychiatric Medication Prescribing",
        description: "Expert prescribing of mental health medications including antidepressants, anti-anxiety medications, mood stabilizers, ADHD medications, and antipsychotics. Our psychiatrists carefully select medications based on your diagnosis, symptoms, medical history, and treatment goals."
      },
      {
        icon: CheckCircle,
        title: "Ongoing Medication Monitoring",
        description: "Regular follow-up appointments (typically 15-30 minutes) to monitor medication effectiveness, assess side effects, check symptom improvement, and make dosage adjustments as needed. Continuous monitoring ensures optimal results with minimal side effects."
      },
      {
        icon: FileText,
        title: "Medication Reviews & Optimization",
        description: "Comprehensive review of your current medication regimen to ensure optimal effectiveness. Our psychiatrists can simplify complex medication regimens, eliminate unnecessary medications, and optimize dosages to improve symptom control and reduce side effects."
      },
      {
        icon: Brain,
        title: "Side Effect Management",
        description: "Proactive management of medication side effects through dosage adjustments, medication changes, or addition of supportive medications. Our psychiatrists work with you to minimize side effects while maintaining therapeutic benefits."
      },
      {
        icon: Heart,
        title: "Medication Changes & Transitions",
        description: "Safe management of medication changes including cross-tapering between medications, discontinuation when appropriate, and switching to more effective alternatives. Our psychiatrists ensure smooth transitions to minimize withdrawal symptoms and maintain stability."
      },
      {
        icon: Video,
        title: "Telepsychiatry Medication Management",
        description: "Convenient virtual medication management appointments from home. Our psychiatrists can prescribe and monitor most psychiatric medications via telepsychiatry. Same quality care as in-person visits with added convenience. Most insurance covers telepsychiatry."
      },
    ],
  },
  faqs: [
    {
      question: "What is psychiatric medication management?",
      answer: "Psychiatric medication management involves prescribing, monitoring, and adjusting mental health medications by a psychiatrist. This includes initial medication selection, dosage optimization, side effect monitoring, effectiveness assessment, and making changes as needed. Medication management appointments are typically 15-30 minutes and occur monthly or as needed to ensure your medication is working optimally."
    },
    {
      question: "How often do I need medication management appointments?",
      answer: "Initially, medication management appointments are typically every 2-4 weeks to monitor your response and make adjustments. Once stable on medication, appointments are usually monthly or every 2-3 months. Frequency depends on your condition, medication stability, and individual needs. Our psychiatrists determine the appropriate schedule for your situation."
    },
    {
      question: "Can I get medication management without an initial evaluation?",
      answer: "If you're a new patient without a recent psychiatric evaluation, you'll need a comprehensive initial evaluation (typically 60 minutes) before starting medication management. This ensures accurate diagnosis and appropriate medication selection. If you're transferring care from another psychiatrist, bring medical records and we may be able to proceed directly to medication management."
    },
    {
      question: "What types of medications do psychiatrists prescribe?",
      answer: "Psychiatrists prescribe antidepressants (SSRIs, SNRIs, etc.), anti-anxiety medications, ADHD medications (stimulants and non-stimulants), mood stabilizers, antipsychotics, and sleep medications. The specific medication depends on your diagnosis, symptoms, medical history, and treatment goals. Our psychiatrists use evidence-based guidelines to select the most appropriate medication."
    },
    {
      question: "How quickly can I schedule medication management in Orlando?",
      answer: "We offer same-week appointments for medication management. New patients needing initial evaluations can typically be seen within 3-5 business days. Follow-up medication management appointments are scheduled based on your needs, typically 2-4 weeks initially, then monthly. Call 386-848-8751 to schedule."
    },
    {
      question: "Does insurance cover medication management?",
      answer: "Yes, most health insurance plans cover psychiatric medication management appointments. These are typically billed as follow-up psychiatric visits and are covered under mental health benefits. We accept most major insurance including Blue Cross Blue Shield, UMR, Medicare, Aetna, Cigna, and many others. Contact us at 386-848-8751 to verify your coverage."
    },
    {
      question: "Can medication management be done via telehealth?",
      answer: "Yes, medication management can be effectively conducted via telepsychiatry for most patients and medications. Our psychiatrists can prescribe and monitor most psychiatric medications through secure video appointments. Telepsychiatry offers the same quality care as in-person visits with added convenience. Most insurance covers telepsychiatry at the same rate as office visits."
    },
    {
      question: "What should I bring to my medication management appointment?",
      answer: "Bring a list of current medications (including dosages), any medications you've tried in the past (with results), recent lab work if applicable, and questions or concerns about your current treatment. It's helpful to track your symptoms between appointments so you can report on medication effectiveness. If this is your first visit, bring previous psychiatric records if available."
    },
  ],
  sidebar: {
    formHeading: "Schedule Medication Management",
    formSubheading: "Expert psychiatric medication management to help you achieve optimal mental health.",
    formType: "contact",
    quickLinks: [
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/psychiatrist-winter-park", label: "Psychiatrist Winter Park" },
      { href: "/psychiatrist-near-me", label: "Psychiatrist Near Me" },
      { href: "/anxiety-psychiatrist-orlando", label: "Anxiety Treatment" },
      { href: "/adhd-psychiatrist-orlando", label: "ADHD Treatment" },
      { href: "/telepsychiatry-orlando", label: "Telepsychiatry" },
      { href: "/psychiatric-evaluation-orlando", label: "Psychiatric Evaluation" },
      { href: "/psychiatrist-orlando-accepts-bcbs", label: "BCBS Insurance" },
      { href: "/psychiatrist-orlando-accepts-cigna", label: "Cigna Insurance" },
      { href: "/psychiatrist-orlando-accepts-aetna", label: "Aetna Insurance" },
    ],
  },
  analytics: {
    pageName: "Medication Management Orlando Page",
    conversionCategory: "medication_management_orlando",
  },
};

export const cognitiveBehavioralTherapyConfig: LandingPageConfig = {
  seo: {
    title: "CBT Therapy Orlando FL | Cognitive Behavioral Therapy",
    description: "Expert CBT therapy in Orlando, FL. Evidence-based treatment for anxiety, depression, OCD, PTSD. Same-week appointments. Call 386-848-8751.",
    keywords: ["cbt therapy orlando", "cognitive behavioral therapy orlando", "cbt therapy near me", "cognitive behavioral counseling", "cbt therapist orlando", "cognitive therapy orlando", "behavioral therapy orlando fl", "cbt mental health therapy"],
    canonicalPath: "/cognitive-behavioral-therapy",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness", "Psychologist"],
    "name": "CBT Therapy Orlando FL - Empathy Health Clinic",
    "description": "Evidence-based cognitive behavioral therapy (CBT) in Orlando for anxiety, depression, OCD, PTSD, and other mental health conditions.",
    "url": "https://empathyhealthclinic.com/cognitive-behavioral-therapy",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1155 Louisiana Ave Suite 202",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32789",
      "addressCountry": "US"
    },
    "medicalSpecialty": "Psychology"
  },
  hero: {
    title: "Cognitive Behavioral Therapy (CBT) in Orlando, FL",
    subtitle: "Evidence-based CBT therapy for anxiety, depression, OCD, PTSD, and more. Licensed therapists providing practical tools to change negative thought patterns and behaviors. Same-week appointments with flexible in-person and telehealth options. Most insurance accepted.",
    ctaPrimary: "Schedule CBT Session",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Evidence-Based CBT Therapy", "Same-Week Appointments Available"],
  },
  location: {
    title: "Orlando CBT Therapy Location",
    address: "1155 Louisiana Ave Suite 202",
    city: "Winter Park",
    state: "FL",
    zip: "32789",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Sat: 9:00 AM - 6:00 PM\nTelehealth & in-person CBT available",
    mapUrl: "https://maps.google.com/?q=1155+Louisiana+Ave+Suite+202+Winter+Park+FL+32789",
  },
  content: {
    mainHeading: "What is Cognitive Behavioral Therapy (CBT)?",
    introduction: [
      "Cognitive Behavioral Therapy (CBT) is a highly effective, evidence-based form of psychotherapy that helps you identify and change negative thought patterns and behaviors. Unlike traditional talk therapy, CBT is goal-oriented and focuses on practical skills you can use immediately to improve your mental health.",
      "At Empathy Health Clinic in Orlando, our licensed CBT therapists use proven techniques to help you develop healthier thinking patterns, manage difficult emotions, and change behaviors that aren't serving you. CBT is one of the most extensively researched forms of therapy and has been proven effective for anxiety, depression, OCD, PTSD, panic disorders, and many other mental health conditions.",
      "Whether you're dealing with racing thoughts, overwhelming worry, persistent sadness, or unhelpful behaviors, CBT therapy provides you with practical tools to take control of your mental health. We offer both in-person CBT therapy in our Orlando office and convenient telehealth sessions."
    ],
    conditionsHeading: "Conditions Treated with CBT Therapy",
    conditions: [
      { name: "Anxiety Disorders", description: "Generalized anxiety, social anxiety, phobias" },
      { name: "Depression & Mood Disorders" },
      { name: "OCD", description: "Obsessive-Compulsive Disorder" },
      { name: "PTSD & Trauma" },
      { name: "Panic Disorder" },
      { name: "Eating Disorders" },
      { name: "Insomnia & Sleep Issues" },
      { name: "Anger Management" },
      { name: "Chronic Pain & Health Anxiety" },
      { name: "Substance Use & Addiction" },
    ],
    servicesHeading: "What to Expect from CBT Therapy",
    services: [
      {
        icon: Brain,
        title: "Identify Negative Thought Patterns",
        description: "Learn to recognize automatic negative thoughts, cognitive distortions, and unhelpful thinking patterns that fuel anxiety, depression, and other mental health challenges."
      },
      {
        icon: FileText,
        title: "Challenge & Restructure Thoughts",
        description: "Develop skills to examine the evidence for and against negative thoughts, then replace them with more balanced, realistic perspectives that improve your mood and reduce anxiety."
      },
      {
        icon: CheckCircle,
        title: "Behavioral Activation & Exposure",
        description: "Gradually face feared situations, break cycles of avoidance, and increase engagement in meaningful activities to overcome anxiety and depression."
      },
      {
        icon: MessageCircle,
        title: "Practical Skill Building",
        description: "Learn concrete coping strategies including relaxation techniques, problem-solving skills, assertiveness training, and emotion regulation tools you can use every day."
      },
      {
        icon: Heart,
        title: "Goal-Oriented Treatment",
        description: "Work collaboratively with your therapist to set specific, measurable goals and track your progress throughout treatment. Most clients see significant improvements within 12-20 sessions."
      },
      {
        icon: Video,
        title: "Flexible CBT Sessions",
        description: "Access CBT therapy through convenient telehealth appointments or in-person sessions at our Winter Park office near Orlando. Most insurance plans cover CBT therapy."
      },
    ],
    whyChooseHeading: "Why Choose Our Orlando CBT Therapists?",
    whyChoosePoints: [
      {
        icon: Award,
        title: "Licensed, Specialized CBT Therapists",
        description: "Our therapists have advanced training in cognitive behavioral therapy and years of experience treating anxiety, depression, OCD, PTSD, and other conditions with evidence-based CBT techniques."
      },
      {
        icon: Calendar,
        title: "Same-Week Appointments Available",
        description: "We understand that when you're struggling with anxiety or depression, waiting weeks for help isn't an option. We typically offer same-week appointments for new CBT therapy clients in Orlando."
      },
      {
        icon: Video,
        title: "Telehealth CBT Therapy",
        description: "Access high-quality CBT therapy from the comfort of your home with secure telehealth appointments. Research shows telehealth CBT is just as effective as in-person therapy for most conditions."
      },
      {
        icon: DollarSign,
        title: "Insurance Accepted",
        description: "We accept most major insurance plans including Blue Cross Blue Shield, UMR, Aetna, Cigna, United Healthcare, Medicare, and many others. Our team will verify your CBT therapy benefits."
      },
      {
        icon: Users,
        title: "Compassionate, Judgment-Free Care",
        description: "Our Orlando CBT therapists create a safe, supportive environment where you can explore your thoughts and feelings without judgment while learning practical skills to improve your mental health."
      },
      {
        icon: Heart,
        title: "Evidence-Based Treatment",
        description: "CBT is backed by decades of research showing its effectiveness for anxiety, depression, and many other mental health conditions. We use proven protocols adapted to your unique needs and goals."
      },
    ],
  },
  faqs: [
    {
      question: "How does CBT therapy work?",
      answer: "Cognitive Behavioral Therapy (CBT) is based on the principle that our thoughts, feelings, and behaviors are interconnected. CBT helps you identify negative or distorted thought patterns (like catastrophizing or black-and-white thinking), examine the evidence for these thoughts, and develop more balanced, realistic perspectives. You'll also work on changing unhelpful behaviors through techniques like behavioral activation and gradual exposure. Your CBT therapist will teach you practical skills and assign homework between sessions to help you practice these techniques in real-life situations. Most clients notice improvements within the first few weeks of treatment."
    },
    {
      question: "What conditions can CBT treat?",
      answer: "CBT is one of the most versatile and evidence-based therapies available. It's highly effective for anxiety disorders (generalized anxiety, social anxiety, panic disorder, phobias), depression, OCD, PTSD, eating disorders, insomnia, anger management, chronic pain, health anxiety, and substance use disorders. Research consistently shows CBT produces significant improvements for these conditions, often with lasting results that continue even after therapy ends. Your CBT therapist will tailor the approach to your specific condition and goals."
    },
    {
      question: "How long does CBT therapy take?",
      answer: "CBT is typically a short-term, goal-oriented therapy. Most clients see significant improvements within 12-20 weekly sessions, though this varies depending on the condition being treated and individual needs. Some people with specific phobias or acute anxiety may need as few as 6-8 sessions, while those with more complex issues like chronic depression or OCD may benefit from 20-30 sessions. Unlike open-ended talk therapy, CBT focuses on teaching you skills to manage your own mental health, so you can eventually 'graduate' from therapy with tools to maintain your progress."
    },
    {
      question: "Is CBT therapy covered by insurance?",
      answer: "Yes, most health insurance plans cover CBT therapy as part of their mental health benefits. We accept most major insurance including Blue Cross Blue Shield, UMR, Aetna, Cigna, United Healthcare, Medicare, Humana, and many others. CBT is typically billed as outpatient psychotherapy and covered at the same rate as other forms of counseling. Our team will verify your specific CBT therapy benefits and explain your coverage before your first appointment. Contact us at 386-848-8751 to verify your insurance."
    },
    {
      question: "What's the difference between CBT and regular therapy?",
      answer: "Unlike traditional psychotherapy that may focus on exploring past experiences and insights, CBT is present-focused and action-oriented. CBT therapists actively teach you specific skills and techniques to change your thinking and behavior right now. Sessions are structured with clear goals and homework assignments. CBT is typically shorter-term (12-20 sessions vs. years), focuses on solving current problems, and emphasizes teaching you tools to become your own therapist. That said, CBT therapists are still warm, empathetic, and supportive - the therapeutic relationship is important, but the focus is on practical skill-building."
    },
    {
      question: "Can CBT be done via telehealth?",
      answer: "Yes, CBT is highly effective when delivered via telehealth. Research shows that online CBT therapy produces similar outcomes to in-person CBT for conditions like anxiety, depression, OCD, and PTSD. Telehealth CBT offers the same evidence-based techniques and therapeutic relationship as office visits, with added convenience of attending from home. You'll use a secure video platform, and your therapist can still assign worksheets, practice exercises, and homework. Most insurance covers telehealth CBT at the same rate as in-person sessions. Many clients prefer telehealth for its flexibility and comfort."
    },
    {
      question: "How is CBT different from medication?",
      answer: "CBT and medication work differently but can be complementary. Psychiatric medications (like antidepressants or anti-anxiety medications) work by altering brain chemistry to reduce symptoms. CBT works by teaching you skills to change your thought patterns and behaviors, which in turn changes your brain function over time. Research shows CBT has longer-lasting effects than medication alone - when medication is stopped, symptoms often return, but CBT skills remain. Many people benefit from combining CBT with medication, especially for moderate to severe anxiety or depression. Your treatment team can help you decide what's right for you."
    },
    {
      question: "What happens in the first CBT therapy session?",
      answer: "Your first CBT session will focus on getting to know you and your goals. Your therapist will ask about your current symptoms, what brings you to therapy, your history with the problem, and what you hope to achieve. Together, you'll identify specific, measurable goals for treatment. Your therapist will explain how CBT works and may teach you your first skill or technique. You might complete brief assessments to measure symptom severity (which helps track progress over time). Most importantly, this session is about building a collaborative relationship and creating a personalized treatment plan tailored to your needs."
    },
    {
      question: "Do I have to do homework with CBT?",
      answer: "Yes, homework is a key component of effective CBT therapy. Between sessions, you'll practice the skills you're learning by completing worksheets, tracking thoughts or behaviors, or gradually facing feared situations. Research shows that clients who complete CBT homework assignments improve faster and maintain their gains better than those who don't. The homework isn't busy work - it's practical application of skills to your real life. Your therapist will work with you to create manageable assignments that fit your schedule. Think of it like physical therapy - practice between sessions is essential for progress."
    },
    {
      question: "Will I need therapy forever?",
      answer: "No, CBT is designed to teach you skills to manage your own mental health so you don't need ongoing therapy indefinitely. The goal of CBT is to help you become your own therapist by learning to identify and challenge negative thoughts, use coping strategies, and solve problems independently. Most people complete CBT in 12-20 sessions and then maintain their progress on their own. Some clients return for brief 'booster' sessions during stressful life transitions, but CBT aims to give you lasting skills rather than creating dependency on therapy. Your therapist will work with you to plan for ending treatment and maintaining gains."
    },
  ],
  sidebar: {
    formHeading: "Start CBT Therapy Today",
    formSubheading: "Evidence-based cognitive behavioral therapy to help you overcome anxiety, depression, and other mental health challenges.",
    formType: "contact",
    quickLinks: [
      { href: "/anxiety-therapy", label: "Anxiety Therapy" },
      { href: "/depression-counseling", label: "Depression Treatment" },
      { href: "/therapist-orlando", label: "Therapist Orlando" },
      { href: "/therapy", label: "All Therapy Services" },
      { href: "/anxiety-therapy", label: "PTSD & Trauma Therapy" },
      { href: "/virtual-therapy", label: "Online Therapy" },
      { href: "/psychiatrist-orlando-accepts-bcbs", label: "BCBS Insurance" },
      { href: "/psychiatrist-orlando-accepts-cigna", label: "Cigna Insurance" },
      { href: "/psychiatrist-orlando-accepts-aetna", label: "Aetna Insurance" },
    ],
  },
  analytics: {
    pageName: "CBT Therapy Orlando Page",
    conversionCategory: "cbt_therapy_orlando",
  },
};

// United Healthcare Psychiatrist Orlando - Optimized for "psychiatrist orlando accepts united healthcare"
export const unitedHealthcarePsychiatristOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Psychiatrist Orlando Accepts United Healthcare | 2025",
    description: "Psychiatrist Orlando accepts United Healthcare - In-network UHC provider for anxiety, ADHD, depression, bipolar. Same-week appointments. Call (386) 848-8751.",
    keywords: ["psychiatrist orlando accepts united healthcare", "united healthcare psychiatrist orlando", "uhc psychiatrist orlando", "psychiatrist takes united healthcare orlando fl", "united healthcare mental health orlando", "in-network psychiatrist uhc orlando", "psychiatrist that accepts uhc orlando"],
    canonicalPath: "/psychiatrist-orlando-accepts-united-healthcare",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "United Healthcare Psychiatrist Orlando FL - Empathy Health Clinic",
    "description": "Board-certified psychiatrists in Orlando accepting United Healthcare (UHC) insurance for medication management and psychiatric care.",
    "url": "https://empathyhealthclinic.com/psychiatrist-orlando-accepts-united-healthcare",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Orlando",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.59544,
      "longitude": -81.36537
    },
    "medicalSpecialty": "Psychiatry",
    "insuranceAccepted": "United Healthcare (UHC)"
  },
  hero: {
    title: "Psychiatrists Accepting United Healthcare in Orlando, FL",
    subtitle: "Board-certified psychiatrists in-network with United Healthcare (UHC) insurance. Expert medication management for anxiety, depression, ADHD, bipolar disorder. Same-week appointments available in Orlando.",
    ctaPrimary: "Verify UHC Coverage",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["United Healthcare In-Network", "Board-Certified Psychiatrists", "Same-Week Appointments"],
  },
  location: {
    title: "Orlando UHC Psychiatry Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nUnited Healthcare appointments available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Board-Certified Psychiatrists Accepting United Healthcare in Orlando",
    introduction: [
      "Looking for a psychiatrist in Orlando who accepts United Healthcare insurance? Empathy Health Clinic's board-certified psychiatrists are in-network UHC providers, making quality psychiatric care affordable and accessible for United Healthcare members.",
      "We provide comprehensive psychiatric services covered by United Healthcare including medication management, psychiatric evaluations, and treatment for anxiety, depression, ADHD, bipolar disorder, and more. Our team understands UHC benefits and will help you maximize your insurance coverage.",
    ],
    conditionsHeading: "Psychiatric Conditions We Treat with UHC Coverage",
    conditions: [
      { name: "Anxiety & Panic Disorders" },
      { name: "Depression & Mood Disorders" },
      { name: "ADHD (Adults & Adolescents)" },
      { name: "Bipolar Disorder" },
      { name: "OCD & Related Disorders" },
      { name: "PTSD & Trauma" },
      { name: "Insomnia & Sleep Disorders" },
      { name: "Medication Management" },
    ],
    servicesHeading: "United Healthcare-Covered Psychiatric Services",
    services: [
      {
        title: "Psychiatric Evaluations",
        description: "Comprehensive mental health assessments covered by United Healthcare with minimal copay. Get an accurate diagnosis and personalized treatment plan."
      },
      {
        title: "Medication Management",
        description: "Ongoing psychiatric medication management for anxiety, depression, ADHD, and bipolar disorder. UHC typically covers follow-up appointments."
      },
      {
        title: "ADHD Treatment",
        description: "Complete ADHD evaluations and medication management covered by most United Healthcare plans for adults and adolescents."
      },
      {
        title: "Telepsychiatry Options",
        description: "Virtual psychiatry appointments covered by United Healthcare at the same rate as in-person visits. See your psychiatrist from home."
      },
    ],
    quickLinks: [
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/anxiety-psychiatrist-orlando", label: "Anxiety Psychiatrist" },
      { href: "/adhd-psychiatrist-orlando", label: "ADHD Psychiatrist" },
      { href: "/telepsychiatry-orlando", label: "Telepsychiatry" },
      { href: "/insurance", label: "Insurance Information" },
      { href: "/psychiatrist-orlando-accepts-bcbs", label: "BCBS Insurance" },
      { href: "/psychiatrist-orlando-accepts-cigna", label: "Cigna Insurance" },
      { href: "/psychiatrist-orlando-accepts-aetna", label: "Aetna Insurance" },
    ],
  },
  faqs: [
    {
      question: "Does Empathy Health Clinic accept United Healthcare insurance?",
      answer: "Yes, our board-certified psychiatrists are in-network providers for United Healthcare insurance plans. We accept UHC PPO, HMO, and other United Healthcare plans. Call 386-848-8751 to verify your specific plan coverage."
    },
    {
      question: "What does United Healthcare cover for psychiatric services?",
      answer: "United Healthcare typically covers psychiatric evaluations, medication management, and mental health treatment. Coverage varies by plan, but most UHC plans cover 80-100% of psychiatric services after deductible. Copays typically range from $10-50 per visit."
    },
    {
      question: "Do I need a referral to see a psychiatrist with United Healthcare?",
      answer: "It depends on your UHC plan type. United Healthcare PPO plans typically do not require a referral. UHC HMO plans may require a referral from your primary care physician. Call us at 386-848-8751 to help determine if you need a referral."
    },
    {
      question: "How quickly can I see a United Healthcare psychiatrist in Orlando?",
      answer: "We offer same-week appointments for United Healthcare patients. Most patients can be seen within 3-5 business days. Call 386-848-8751 to schedule your UHC-covered appointment."
    },
    {
      question: "Does United Healthcare cover telepsychiatry appointments?",
      answer: "Yes, United Healthcare covers telepsychiatry (virtual psychiatry) appointments at the same rate as in-person visits. This makes it convenient to see your psychiatrist from home while still using your UHC benefits."
    },
  ],
  analytics: {
    pageName: "United Healthcare Psychiatrist Orlando Page",
    conversionCategory: "uhc_psychiatrist",
  },
};

export const ptsdPsychiatristOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "PTSD Psychiatrist Orlando FL | Trauma Specialist",
    description: "PTSD psychiatrist Orlando - Board-certified trauma specialists. Expert treatment for PTSD, acute stress, complex trauma. Same-week appointments. Call 386-848-8751.",
    keywords: ["ptsd psychiatrist orlando", "ptsd psychiatrist orlando fl", "trauma psychiatrist orlando", "ptsd doctor orlando", "ptsd treatment orlando", "trauma specialist orlando", "complex ptsd treatment orlando", "ptsd medication management orlando", "best ptsd psychiatrist orlando"],
    canonicalPath: "/ptsd-psychiatrist-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "PTSD Psychiatrist Orlando FL - Empathy Health Clinic",
    "description": "Specialized PTSD and trauma treatment in Orlando, FL by board-certified psychiatrists with expertise in trauma-informed care.",
    "url": "https://empathyhealthclinic.com/ptsd-psychiatrist-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Orlando",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.59544,
      "longitude": -81.36537
    },
    "areaServed": [
      { "@type": "City", "name": "Orlando" },
      { "@type": "City", "name": "Winter Park" },
      { "@type": "City", "name": "Altamonte Springs" },
      { "@type": "City", "name": "Lake Mary" },
      { "@type": "City", "name": "Maitland" }
    ],
    "medicalSpecialty": "Psychiatry - Trauma Specialist"
  },
  hero: {
    title: "PTSD Psychiatrist Orlando",
    subtitle: "Board-certified psychiatrists specializing in PTSD and trauma treatment. Expert medication management combined with evidence-based therapies for PTSD, acute stress disorder, and complex trauma. Same-week appointments with in-person and telehealth options.",
    ctaPrimary: "Schedule PTSD Evaluation",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Trauma Specialists", "Evidence-Based Treatment", "Same-Week Appointments"],
  },
  location: {
    title: "PTSD Treatment Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth & in-person available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "PTSD Psychiatrist Orlando: Trauma-Informed Care",
    introduction: [
      "Post-Traumatic Stress Disorder requires specialized psychiatric care from experienced trauma specialists. At Empathy Health Clinic, our board-certified psychiatrists in Orlando provide comprehensive PTSD treatment combining expert medication management with evidence-based therapeutic approaches.",
      "Our PTSD specialists understand the complex nature of trauma and work closely with you to reduce symptoms, process traumatic experiences, and reclaim your life through personalized treatment plans and ongoing support.",
    ],
    conditionsHeading: "Trauma Conditions We Treat",
    conditions: [
      { name: "PTSD (Post-Traumatic Stress Disorder)" },
      { name: "Complex PTSD" },
      { name: "Acute Stress Disorder" },
      { name: "Combat-Related Trauma" },
      { name: "Sexual Trauma" },
      { name: "Childhood Trauma" },
      { name: "First Responder Trauma" },
      { name: "Accident-Related Trauma" },
    ],
    authoritativeSources: [
      { source: "NIMH" as const, topic: "Post-Traumatic Stress Disorder" },
      { source: "APA" as const, topic: "Trauma and Stressor-Related Disorders" },
    ],
    internalLinksCategory: "conditions" as const,
    servicesHeading: "Our PTSD Treatment Services",
    services: [
      {
        icon: Brain,
        title: "Psychiatric Evaluation for PTSD",
        description: "Comprehensive trauma-informed assessment to accurately diagnose PTSD and identify co-occurring conditions like depression and anxiety."
      },
      {
        icon: Shield,
        title: "Medication Management",
        description: "Expert prescribing of FDA-approved PTSD medications including SSRIs, prazosin for nightmares, and other targeted treatments."
      },
      {
        icon: Heart,
        title: "Integrated Treatment Approach",
        description: "Coordination with EMDR therapists and trauma-focused CBT specialists for comprehensive healing."
      },
    ],
    whyChooseHeading: "Why Choose Our PTSD Psychiatrists",
    whyChoosePoints: [
      {
        icon: Award,
        title: "Trauma-Trained Psychiatrists",
        description: "Our psychiatrists have specialized training in trauma-informed care and PTSD treatment protocols."
      },
      {
        icon: Calendar,
        title: "Same-Week Appointments",
        description: "We understand trauma waits for no one. Get seen within days, not months."
      },
      {
        icon: Video,
        title: "Telehealth & In-Person Options",
        description: "Choose the setting where you feel most comfortable and safe for your PTSD treatment."
      },
    ],
  },
  faqs: [
    {
      question: "What medications are used to treat PTSD?",
      answer: "FDA-approved medications for PTSD include sertraline (Zoloft) and paroxetine (Paxil). Our psychiatrists also prescribe prazosin for PTSD-related nightmares, and may recommend other medications based on your specific symptoms and needs."
    },
    {
      question: "How long does PTSD treatment take?",
      answer: "PTSD treatment duration varies by individual. Many patients see significant improvement within 3-6 months of starting medication, though ongoing treatment may be beneficial. We work with you to create a personalized treatment timeline."
    },
    {
      question: "Do you treat military veterans with PTSD?",
      answer: "Yes, we treat military veterans and first responders with PTSD. Our psychiatrists understand the unique aspects of combat-related and occupational trauma and provide specialized care."
    },
    {
      question: "Can I do telehealth for PTSD treatment?",
      answer: "Yes, we offer secure telehealth appointments for PTSD medication management. Many patients find telehealth more comfortable for trauma treatment as they can attend from a safe environment."
    },
  ],
  sidebar: {
    formHeading: "Start Your PTSD Treatment",
    formSubheading: "Same-week appointments. Trauma-informed care.",
    formType: "ptsd_psychiatrist",
    quickLinks: [
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/emdr-therapy", label: "EMDR Therapy" },
      { href: "/trauma-specialist-near-me", label: "Trauma Specialist" },
      { href: "/anxiety-psychiatrist-orlando", label: "Anxiety Psychiatrist" },
      { href: "/depression-treatment", label: "Depression Treatment" },
      { href: "/medication-management-orlando", label: "Medication Management" },
    ],
  },
  analytics: {
    pageName: "PTSD Psychiatrist Orlando Page",
    conversionCategory: "ptsd_psychiatrist",
  },
};

export const urgentPsychiatricCareOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Urgent Psychiatric Care Orlando FL | Same-Day Psychiatrist",
    description: "Urgent psychiatric care Orlando - Same-day and next-day psychiatric appointments. Crisis stabilization, medication adjustments. Call 386-848-8751 now.",
    keywords: ["urgent psychiatric care orlando", "same day psychiatrist orlando", "emergency psychiatrist orlando", "urgent psychiatrist orlando", "psychiatric urgent care orlando", "crisis psychiatrist orlando", "walk in psychiatrist orlando", "immediate psychiatric care orlando", "urgent mental health care orlando"],
    canonicalPath: "/urgent-psychiatric-care-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "Urgent Psychiatric Care Orlando FL - Empathy Health Clinic",
    "description": "Same-day and urgent psychiatric care in Orlando, FL for crisis stabilization and immediate mental health needs.",
    "url": "https://empathyhealthclinic.com/urgent-psychiatric-care-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Orlando",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.59544,
      "longitude": -81.36537
    },
    "areaServed": [
      { "@type": "City", "name": "Orlando" },
      { "@type": "City", "name": "Winter Park" },
      { "@type": "City", "name": "Altamonte Springs" },
      { "@type": "City", "name": "Lake Mary" },
      { "@type": "City", "name": "Maitland" }
    ],
    "medicalSpecialty": "Psychiatry - Urgent Care"
  },
  hero: {
    title: "Urgent Psychiatric Care Orlando",
    subtitle: "Same-day and next-day psychiatric appointments for urgent mental health needs. Crisis stabilization, medication adjustments, and rapid evaluations. When you need help now, we're here. Call immediately for urgent appointments.",
    ctaPrimary: "Call Now: 386-848-8751",
    ctaSecondary: "Request Urgent Appointment",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Same-Day Appointments", "Crisis Stabilization", "Board-Certified Psychiatrists"],
  },
  location: {
    title: "Orlando Urgent Psychiatric Care",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nCall for urgent availability",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Urgent Psychiatric Care in Orlando: Same-Day Appointments",
    introduction: [
      "Mental health emergencies don't wait for scheduled appointments. At Empathy Health Clinic, we provide urgent psychiatric care in Orlando with same-day and next-day appointments for patients experiencing acute symptoms, medication crises, or sudden worsening of mental health conditions.",
      "Our board-certified psychiatrists are available for rapid evaluations, crisis stabilization, and urgent medication adjustments when you need immediate psychiatric care in the Orlando area.",
    ],
    conditionsHeading: "Urgent Psychiatric Situations We Handle",
    conditions: [
      { name: "Severe Anxiety or Panic Attacks" },
      { name: "Worsening Depression" },
      { name: "Medication Side Effects" },
      { name: "Manic Episodes" },
      { name: "Acute Psychosis" },
      { name: "Medication Refill Emergencies" },
      { name: "Crisis Stabilization" },
      { name: "Suicidal Ideation (Non-Emergency)" },
    ],
    authoritativeSources: [
      { source: "NIMH" as const, topic: "Mental Health Crisis Resources" },
      { source: "APA" as const, topic: "Psychiatric Emergency Care" },
    ],
    internalLinksCategory: "services" as const,
    servicesHeading: "Our Urgent Care Services",
    services: [
      {
        icon: Calendar,
        title: "Same-Day Appointments",
        description: "Priority scheduling for urgent psychiatric needs. Call in the morning for same-day availability when possible."
      },
      {
        icon: Shield,
        title: "Crisis Stabilization",
        description: "Rapid psychiatric evaluation and immediate intervention for acute mental health symptoms."
      },
      {
        icon: Brain,
        title: "Emergency Medication Adjustments",
        description: "Quick medication changes when current treatments aren't working or causing problematic side effects."
      },
    ],
    whyChooseHeading: "Why Choose Our Urgent Psychiatric Care",
    whyChoosePoints: [
      {
        icon: Clock,
        title: "Rapid Access",
        description: "Same-day and next-day appointments available. Don't wait weeks when you need help now."
      },
      {
        icon: Award,
        title: "Board-Certified Psychiatrists",
        description: "Urgent care provided by experienced, board-certified psychiatrists, not just nurse practitioners."
      },
      {
        icon: Video,
        title: "Telehealth Available",
        description: "Can't leave home? Urgent telehealth appointments available for immediate psychiatric care."
      },
    ],
  },
  faqs: [
    {
      question: "What qualifies as urgent psychiatric care?",
      answer: "Urgent psychiatric care is for severe symptoms that need attention within 24-48 hours but are not immediately life-threatening. This includes severe panic attacks, worsening depression, concerning medication side effects, or running out of critical psychiatric medications."
    },
    {
      question: "How quickly can I be seen for urgent psychiatric care?",
      answer: "We offer same-day and next-day appointments for urgent psychiatric needs. Call 386-848-8751 as early as possible to check same-day availability. Morning calls have the best chance of same-day appointments."
    },
    {
      question: "Is this emergency room care?",
      answer: "No. For life-threatening emergencies, suicidal intent with a plan, or psychotic breaks, call 911 or go to the nearest ER. Our urgent care is for serious but non-emergency psychiatric needs that require rapid outpatient attention."
    },
    {
      question: "Do you accept insurance for urgent appointments?",
      answer: "Yes, we accept the same insurance plans for urgent appointments as regular visits, including Aetna, BCBS, Cigna, UnitedHealthcare, and Humana. Call to verify your coverage."
    },
  ],
  sidebar: {
    formHeading: "Request Urgent Appointment",
    formSubheading: "Call 386-848-8751 for fastest response",
    formType: "urgent_psychiatric",
    quickLinks: [
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/same-day-psychiatrist-orlando", label: "Same-Day Psychiatrist" },
      { href: "/medication-management-orlando", label: "Medication Management" },
      { href: "/telepsychiatry-orlando", label: "Telepsychiatry" },
      { href: "/anxiety-psychiatrist-orlando", label: "Anxiety Psychiatrist" },
      { href: "/crisis-therapy", label: "Crisis Therapy" },
    ],
  },
  analytics: {
    pageName: "Urgent Psychiatric Care Orlando Page",
    conversionCategory: "urgent_psychiatric",
  },
};

export const psychiatristOrlandoAcceptsUmrConfig: LandingPageConfig = {
  seo: {
    title: "Psychiatrist Orlando Accepts UMR | In-Network Provider",
    description: "UMR psychiatrist Orlando - In-network psychiatric care for UMR insurance. Same-week appointments, medication management. Call 386-848-8751 to verify coverage.",
    keywords: ["psychiatrist orlando accepts umr", "umr psychiatrist orlando", "umr mental health orlando", "psychiatrist that accepts umr orlando", "umr psychiatrist near me", "umr covered psychiatrist orlando", "umr in network psychiatrist orlando"],
    canonicalPath: "/psychiatrist-orlando-accepts-umr",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "UMR Psychiatrist Orlando FL - Empathy Health Clinic",
    "description": "In-network UMR psychiatrist in Orlando, FL providing covered psychiatric services including medication management and evaluations.",
    "url": "https://empathyhealthclinic.com/psychiatrist-orlando-accepts-umr",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Orlando",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "medicalSpecialty": "Psychiatry"
  },
  hero: {
    title: "Psychiatrist Orlando Accepts UMR",
    subtitle: "In-network UMR psychiatrist in Orlando for covered psychiatric care. Board-certified psychiatrists, same-week appointments, and comprehensive mental health services. We verify your UMR benefits before your first visit.",
    ctaPrimary: "Verify UMR Coverage",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["UMR In-Network", "Same-Week Appointments", "Free Benefits Verification"],
  },
  location: {
    title: "UMR Psychiatrist Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth & in-person available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "UMR Psychiatrist Orlando: In-Network Mental Health Care",
    introduction: [
      "Finding a psychiatrist who accepts UMR insurance in Orlando shouldn't be difficult. At Empathy Health Clinic, our board-certified psychiatrists are in-network UMR providers, offering covered psychiatric evaluations, medication management, and ongoing mental health care.",
      "We verify your UMR benefits before your first appointment, so you know exactly what's covered. Most UMR plans cover psychiatric services with affordable copays, allowing you to get the mental health care you need.",
    ],
    conditionsHeading: "Conditions We Treat with UMR Coverage",
    conditions: [
      { name: "Anxiety Disorders" },
      { name: "Depression" },
      { name: "ADHD" },
      { name: "Bipolar Disorder" },
      { name: "PTSD" },
      { name: "OCD" },
      { name: "Panic Disorder" },
      { name: "Insomnia" },
    ],
    servicesHeading: "UMR-Covered Psychiatric Services",
    services: [
      {
        icon: Brain,
        title: "Psychiatric Evaluations",
        description: "Comprehensive initial evaluations covered by UMR to diagnose mental health conditions and create treatment plans."
      },
      {
        icon: Shield,
        title: "Medication Management",
        description: "Ongoing medication monitoring and adjustments covered under your UMR mental health benefits."
      },
      {
        icon: Video,
        title: "Telepsychiatry",
        description: "UMR covers telehealth psychiatric appointments at the same rate as in-person visits."
      },
    ],
    whyChooseHeading: "Why Choose Our UMR-Accepting Psychiatrists",
    whyChoosePoints: [
      {
        icon: DollarSign,
        title: "Free Benefits Verification",
        description: "We verify your UMR coverage before your appointment so there are no billing surprises."
      },
      {
        icon: Calendar,
        title: "Same-Week Appointments",
        description: "Unlike many UMR providers with months-long waits, we offer same-week appointments."
      },
      {
        icon: Award,
        title: "Board-Certified Psychiatrists",
        description: "All care provided by board-certified psychiatrists with extensive experience."
      },
    ],
  },
  faqs: [
    {
      question: "Does Empathy Health Clinic accept UMR insurance?",
      answer: "Yes, our board-certified psychiatrists are in-network providers for UMR insurance plans. We accept various UMR plans for psychiatric services. Call 386-848-8751 to verify your specific plan coverage."
    },
    {
      question: "What does UMR cover for psychiatric services?",
      answer: "UMR typically covers psychiatric evaluations, medication management, and follow-up appointments. Coverage varies by plan, but most UMR plans have mental health benefits. We verify your specific benefits before your first visit."
    },
    {
      question: "Do I need a referral to see a psychiatrist with UMR?",
      answer: "It depends on your specific UMR plan. Some UMR plans require referrals while others don't. Call us at 386-848-8751 and we'll help determine if you need a referral based on your plan type."
    },
    {
      question: "How do I verify my UMR mental health benefits?",
      answer: "Simply call our office at 386-848-8751 and we'll verify your UMR benefits for you at no charge. We'll let you know your copay, deductible status, and any authorization requirements before your first appointment."
    },
  ],
  sidebar: {
    formHeading: "Verify UMR Coverage",
    formSubheading: "Free benefits verification. Same-week appointments.",
    formType: "umr_psychiatrist",
    quickLinks: [
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/psychiatrist-orlando-accepts-bcbs", label: "BCBS Psychiatrist" },
      { href: "/psychiatrist-orlando-accepts-cigna", label: "Cigna Psychiatrist" },
      { href: "/psychiatrist-orlando-accepts-aetna", label: "Aetna Psychiatrist" },
      { href: "/psychiatrist-orlando-accepts-united-healthcare", label: "UHC Psychiatrist" },
      { href: "/insurance", label: "All Insurance Accepted" },
    ],
  },
  analytics: {
    pageName: "UMR Psychiatrist Orlando Page",
    conversionCategory: "umr_psychiatrist",
  },
};

// Psychiatrist for Anxiety Near Me - Optimized for "psychiatrist for anxiety near me" (1,300 volume)
export const psychiatristForAnxietyNearMeConfig: LandingPageConfig = {
  seo: {
    title: "Psychiatrist for Anxiety Near Me | Orlando 2025",
    description: "Looking for a psychiatrist for anxiety near me? Board-certified anxiety specialists in Orlando, FL. Expert treatment for GAD, panic attacks, social anxiety. Same-week appointments. 4.8★ rating. BCBS, Cigna, Medicare accepted. Call (386) 848-8751.",
    keywords: ["psychiatrist for anxiety near me", "anxiety psychiatrist near me", "psychiatrist anxiety near me", "anxiety psychiatrist", "psychiatrist for anxiety", "anxiety doctor near me", "psychiatrist for panic attacks near me", "anxiety medication psychiatrist", "psychiatrist for social anxiety near me", "best anxiety psychiatrist near me", "anxiety specialist near me"],
    canonicalPath: "/psychiatrist-for-anxiety-near-me",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "Psychiatrist for Anxiety Near Me - Empathy Health Clinic Orlando",
    "description": "Board-certified psychiatrists specializing in anxiety disorders including GAD, panic disorder, and social anxiety in Orlando, FL.",
    "url": "https://empathyhealthclinic.com/psychiatrist-for-anxiety-near-me",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Orlando",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.59544,
      "longitude": -81.36537
    },
    "areaServed": [
      { "@type": "City", "name": "Orlando" },
      { "@type": "City", "name": "Winter Park" },
      { "@type": "City", "name": "Altamonte Springs" },
      { "@type": "City", "name": "Lake Mary" },
      { "@type": "City", "name": "Maitland" }
    ],
    "medicalSpecialty": "Psychiatry - Anxiety Disorders"
  },
  hero: {
    title: "Find a Psychiatrist for Anxiety Near Me",
    subtitle: "Expert anxiety treatment by board-certified psychiatrists in Orlando, FL. Specialized care for generalized anxiety disorder (GAD), panic attacks, social anxiety, and phobias. Same-week appointments available with medication management and personalized treatment plans. In-person and telehealth options.",
    ctaPrimary: "Schedule Anxiety Evaluation",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Anxiety Specialists", "Same-Week Appointments", "Telehealth Available"],
  },
  location: {
    title: "Anxiety Psychiatrist Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth & in-person available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Psychiatrist for Anxiety Near Me: Expert Anxiety Treatment in Orlando",
    introduction: [
      "If you're searching for a psychiatrist for anxiety near me, you've found the right place. At Empathy Health Clinic in Orlando, our board-certified psychiatrists specialize in diagnosing and treating all types of anxiety disorders with evidence-based medication management and comprehensive psychiatric care.",
      "Anxiety disorders are among the most common mental health conditions, affecting millions of Americans. Whether you're experiencing constant worry from generalized anxiety disorder (GAD), sudden panic attacks, debilitating social anxiety, or specific phobias, our anxiety psychiatrists can help you regain control and live without fear.",
      "Unlike general practitioners who may not have specialized training in psychiatric medication, our psychiatrists are experts in anxiety medications including SSRIs, SNRIs, benzodiazepines, and newer treatment options. We create personalized treatment plans that address your specific symptoms and concerns, with same-week appointments available.",
    ],
    conditionsHeading: "Anxiety Disorders We Treat",
    conditions: [
      { name: "Generalized Anxiety Disorder (GAD)", description: "Persistent, excessive worry about everyday things" },
      { name: "Panic Disorder", description: "Recurrent panic attacks and fear of future attacks" },
      { name: "Social Anxiety Disorder", description: "Intense fear of social situations and judgment" },
      { name: "Specific Phobias", description: "Extreme fear of specific objects or situations" },
      { name: "Agoraphobia", description: "Fear of places or situations that might cause panic" },
      { name: "Health Anxiety", description: "Excessive worry about having a serious illness" },
      { name: "Separation Anxiety", description: "Fear of being away from attachment figures" },
      { name: "Anxiety with Depression", description: "Co-occurring anxiety and depressive symptoms" },
    ],
    authoritativeSources: [
      { source: "NIMH" as const, topic: "Anxiety Disorders" },
      { source: "APA" as const, topic: "Anxiety Treatment Guidelines" },
    ],
    internalLinksCategory: "conditions" as const,
    showTrustFactors: true,
    servicesHeading: "Anxiety Psychiatry Services",
    services: [
      {
        icon: Brain,
        title: "Comprehensive Anxiety Evaluation",
        description: "Thorough psychiatric assessment to accurately diagnose your anxiety type, identify triggers, and rule out other conditions. Our evaluation examines your symptoms, medical history, and any co-occurring mental health conditions to create the most effective treatment plan."
      },
      {
        icon: Shield,
        title: "Anxiety Medication Management",
        description: "Expert prescribing and monitoring of anti-anxiety medications including SSRIs, SNRIs, non-benzodiazepine options, and when appropriate, short-term relief medications. We carefully adjust medications to maximize effectiveness while minimizing side effects."
      },
      {
        icon: Heart,
        title: "Panic Disorder Treatment",
        description: "Specialized treatment for panic attacks and panic disorder. Our psychiatrists understand the urgency of stopping panic attacks and can provide fast-acting and long-term medication solutions to help you regain confidence and function normally."
      },
      {
        icon: Users,
        title: "Social Anxiety Treatment",
        description: "Medication management specifically for social anxiety disorder, helping you feel more comfortable in social and professional situations. We can prescribe medications that reduce physical symptoms and excessive self-consciousness."
      },
      {
        icon: Video,
        title: "Telehealth Anxiety Treatment",
        description: "Convenient online psychiatric appointments for anxiety from the comfort of your home. Ideal for patients with social anxiety or agoraphobia who find it difficult to travel to appointments. Same quality care as in-person visits."
      },
      {
        icon: Calendar,
        title: "Ongoing Medication Monitoring",
        description: "Regular follow-up appointments to track your progress, adjust medication dosages, manage side effects, and ensure your anxiety treatment continues to be effective over time."
      },
    ],
    whyChooseHeading: "Why Choose a Psychiatrist for Anxiety Treatment?",
    whyChoosePoints: [
      {
        icon: Award,
        title: "Medical Expertise in Anxiety Medications",
        description: "Psychiatrists are medical doctors with specialized training in brain chemistry and psychiatric medications. Unlike general practitioners, we understand the nuances of different anxiety medications and can find the right medication faster."
      },
      {
        icon: Brain,
        title: "Accurate Diagnosis of Anxiety Types",
        description: "Different anxiety disorders require different treatments. Our psychiatrists accurately diagnose whether you have GAD, panic disorder, social anxiety, or another condition to ensure you receive the most effective treatment."
      },
      {
        icon: Shield,
        title: "Safe Medication Management",
        description: "We carefully monitor your medications, watch for interactions, manage side effects, and make informed adjustments. Our expertise ensures you're on the safest, most effective medication regimen."
      },
      {
        icon: CheckCircle,
        title: "Treatment of Complex Cases",
        description: "If you have anxiety along with depression, ADHD, or other conditions, a psychiatrist can manage all your medications together, avoiding dangerous interactions and ensuring coordinated care."
      },
    ],
  },
  faqs: [
    {
      question: "What does a psychiatrist for anxiety do?",
      answer: "A psychiatrist for anxiety is a medical doctor who specializes in diagnosing and treating anxiety disorders with medication. They conduct comprehensive evaluations to determine your specific anxiety type, prescribe anti-anxiety medications, monitor your response to treatment, adjust dosages as needed, and manage any side effects. Unlike therapists who provide talk therapy, psychiatrists focus on the biological and medication aspects of anxiety treatment."
    },
    {
      question: "What medications do psychiatrists prescribe for anxiety?",
      answer: "Psychiatrists commonly prescribe SSRIs, SNRIs, non-benzodiazepine anti-anxiety medications, and in some cases short-term relief medications. The choice of medication depends on your specific anxiety type, symptom severity, other medications you take, and medical history. Our psychiatrists take time to find the right medication with the fewest side effects for your situation."
    },
    {
      question: "How quickly can I see an anxiety psychiatrist near me?",
      answer: "At Empathy Health Clinic, we typically offer same-week appointments for new patients seeking anxiety treatment. Many patients can be seen within 3-5 business days. We understand that anxiety symptoms can be debilitating and prioritize getting you in quickly. Call 386-848-8751 to schedule your appointment."
    },
    {
      question: "Should I see a psychiatrist or therapist for anxiety?",
      answer: "Both can be helpful, and many patients benefit from seeing both. Psychiatrists are medical doctors who prescribe and manage medications. Therapists provide talk therapy like CBT to help you develop coping skills. If your anxiety is moderate to severe, significantly impacts daily functioning, or hasn't improved with therapy alone, seeing a psychiatrist for medication can be very effective. We can also refer you to therapists who specialize in anxiety."
    },
    {
      question: "Does insurance cover anxiety psychiatry appointments?",
      answer: "Yes, most health insurance plans cover psychiatric services for anxiety disorders. We accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, Humana, and more. Contact our office at 386-848-8751 to verify your specific coverage before your appointment."
    },
    {
      question: "How long does anxiety medication take to work?",
      answer: "It depends on the medication type. Some medications like SSRIs and SNRIs take 2-4 weeks to reach full effectiveness because they work by gradually changing brain chemistry. Other medications can provide relief within 30-60 minutes for acute symptoms. Our psychiatrists will explain what to expect with your specific medication and schedule follow-ups to monitor your progress."
    },
  ],
  sidebar: {
    formHeading: "Schedule Anxiety Evaluation",
    formSubheading: "Same-week appointments available. Most insurance accepted.",
    formType: "anxiety_psychiatrist",
    quickLinks: [
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/anxiety-psychiatrist-orlando", label: "Anxiety Psychiatrist Orlando" },
      { href: "/anxiety-therapy", label: "Anxiety Treatment" },
      { href: "/anxiety-therapy", label: "Anxiety Therapy" },
      { href: "/medication-management-orlando", label: "Medication Management" },
      { href: "/new-patients", label: "New Patients" },
      { href: "/best-psychiatrist-orlando", label: "Best Psychiatrist Orlando" },
      { href: "/mental-health-doctor-orlando", label: "Mental Health Doctor" },
      { href: "/online-psychiatrist-florida", label: "Online Psychiatrist FL" },
      { href: "/psychiatrist-for-depression-near-me", label: "Depression Psychiatrist Near Me" },
    ],
  },
  analytics: {
    pageName: "Psychiatrist for Anxiety Near Me Page",
    conversionCategory: "anxiety_psychiatrist_near_me",
  },
};

export const psychiatristForDepressionNearMeConfig: LandingPageConfig = {
  seo: {
    title: "Psychiatrist for Depression Near Me | Orlando 2025",
    description: "Looking for a psychiatrist for depression near me? Board-certified depression specialists in Orlando, FL. Expert antidepressant medication management. Same-week appointments. 4.8★ rating. BCBS, Cigna, Medicare accepted. Call (386) 848-8751.",
    keywords: ["psychiatrist for depression near me", "depression psychiatrist near me", "psychiatrist depression near me", "depression medication doctor near me", "antidepressant psychiatrist near me", "major depression psychiatrist", "treatment resistant depression doctor", "best depression psychiatrist near me", "depression doctor near me"],
    canonicalPath: "/psychiatrist-for-depression-near-me",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness", "Psychiatrist"],
    "name": "Psychiatrist for Depression Near Me - Empathy Health Clinic Orlando",
    "description": "Board-certified psychiatrists specializing in depression treatment, antidepressant medication management, and treatment-resistant depression care in Orlando, FL.",
    "url": "https://empathyhealthclinic.com/psychiatrist-for-depression-near-me",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "medicalSpecialty": "Psychiatry",
    "availableService": {
      "@type": "MedicalTherapy",
      "name": "Depression Medication Management",
      "description": "Psychiatric evaluation and medication management for major depressive disorder, treatment-resistant depression, and other depressive conditions."
    }
  },
  hero: {
    title: "Find a Psychiatrist for Depression Near Me",
    subtitle: "Struggling with depression? Our board-certified psychiatrists specialize in depression medication management, antidepressant prescriptions, and treatment-resistant depression care. Same-week appointments available with in-person and telehealth options throughout Orlando. Most insurance accepted.",
    ctaPrimary: "Schedule Depression Evaluation",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Same-Week Appointments", "Depression Specialists", "Telehealth Available"],
  },
  location: {
    title: "Orlando Metro Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth & in-person available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Expert Depression Psychiatrists Near You in Orlando",
    introduction: [
      "If you're searching for a psychiatrist for depression near me, Empathy Health Clinic offers specialized care from board-certified psychiatrists who focus on treating major depressive disorder, persistent depressive disorder, and treatment-resistant depression. We understand how debilitating depression can be, and we're here to help you find relief.",
      "Our Orlando depression psychiatrists provide comprehensive medication management, including the latest antidepressants and evidence-based treatment protocols. Whether you've tried medications before without success or are seeking help for the first time, our psychiatrists will create a personalized treatment plan tailored to your unique needs.",
      "Same-week appointments are typically available because we know that when you're struggling with depression, every day matters. We offer both in-person appointments at our Winter Park office and secure telehealth visits throughout Florida."
    ],
    conditionsHeading: "Depression Conditions We Treat",
    conditions: [
      { name: "Major Depressive Disorder (MDD)", description: "Clinical depression with persistent symptoms" },
      { name: "Treatment-Resistant Depression", description: "When standard treatments haven't worked" },
      { name: "Persistent Depressive Disorder", description: "Dysthymia, chronic low-grade depression" },
      { name: "Postpartum Depression", description: "Depression following childbirth" },
      { name: "Seasonal Affective Disorder (SAD)", description: "Depression related to seasonal changes" },
      { name: "Depression with Anxiety", description: "Co-occurring depression and anxiety disorders" },
      { name: "Bipolar Depression", description: "Depressive episodes in bipolar disorder" },
      { name: "Grief-Related Depression" },
    ],
    authoritativeSources: [
      { source: "NIMH" as const, topic: "Depression" },
      { source: "APA" as const, topic: "Depression Treatment Guidelines" },
    ],
    internalLinksCategory: "conditions" as const,
    servicesHeading: "Depression Psychiatry Services",
    services: [
      {
        icon: Brain,
        title: "Comprehensive Depression Evaluation",
        description: "Thorough psychiatric assessment to accurately diagnose your depression type, identify any co-occurring conditions, review your medical history, and develop an effective treatment plan tailored to your needs."
      },
      {
        icon: Shield,
        title: "Antidepressant Medication Management",
        description: "Expert prescription and monitoring of antidepressants including SSRIs, SNRIs, bupropion, mirtazapine, and other medications. We carefully track your response and adjust treatment for optimal results with minimal side effects."
      },
      {
        icon: Award,
        title: "Treatment-Resistant Depression Care",
        description: "For patients who haven't responded to standard treatments, we offer advanced medication strategies, combination therapies, and referrals for treatments like TMS or ketamine/esketamine therapy."
      },
      {
        icon: Calendar,
        title: "Ongoing Depression Monitoring",
        description: "Regular follow-up appointments to track your progress, adjust medication dosages, manage side effects, and ensure your depression treatment continues to be effective over time."
      },
    ],
    whyChooseHeading: "Why See a Psychiatrist for Depression?",
    whyChoosePoints: [
      {
        icon: Award,
        title: "Medical Expertise in Depression Medications",
        description: "Psychiatrists are medical doctors with specialized training in brain chemistry and psychiatric medications. Unlike general practitioners, we have deep expertise in antidepressants and can find the right medication combination faster."
      },
      {
        icon: Brain,
        title: "Accurate Diagnosis of Depression Types",
        description: "Different types of depression require different treatments. Our psychiatrists accurately diagnose whether you have major depression, bipolar depression, or another condition to ensure you receive the most effective treatment."
      },
      {
        icon: Shield,
        title: "Safe Medication Management",
        description: "We carefully monitor your antidepressants, watch for interactions with other medications, manage side effects, and make informed adjustments. Our expertise ensures you're on the safest, most effective medication regimen."
      },
      {
        icon: CheckCircle,
        title: "Treatment of Complex Depression Cases",
        description: "If you have depression along with anxiety, ADHD, or other conditions, a psychiatrist can manage all your medications together, avoiding dangerous interactions and ensuring coordinated care for better outcomes."
      },
    ],
  },
  faqs: [
    {
      question: "What does a psychiatrist for depression do?",
      answer: "A psychiatrist for depression is a medical doctor who specializes in diagnosing and treating depressive disorders with medication. They conduct comprehensive evaluations to determine your specific depression type, prescribe antidepressants, monitor your response to treatment, adjust dosages as needed, and manage any side effects. Unlike therapists who provide talk therapy, psychiatrists focus on the biological and medication aspects of depression treatment."
    },
    {
      question: "What medications do psychiatrists prescribe for depression?",
      answer: "Psychiatrists commonly prescribe SSRIs (like Lexapro, Zoloft, Prozac, Celexa), SNRIs (like Effexor, Cymbalta, Pristiq), bupropion (Wellbutrin), mirtazapine (Remeron), and tricyclic antidepressants. For treatment-resistant depression, we may consider augmentation strategies or newer treatments. The choice depends on your specific symptoms, side effect concerns, other medications, and medical history."
    },
    {
      question: "How quickly can I see a depression psychiatrist near me?",
      answer: "At Empathy Health Clinic, we typically offer same-week appointments for new patients seeking depression treatment. Many patients can be seen within 3-5 business days. We understand that depression symptoms are serious and prioritize getting you in quickly. Call 386-848-8751 to schedule your appointment."
    },
    {
      question: "What is treatment-resistant depression?",
      answer: "Treatment-resistant depression is when depression doesn't adequately respond to at least two different antidepressant medications tried at adequate doses for sufficient duration. Our psychiatrists specialize in treating treatment-resistant depression using advanced medication strategies, combination therapies, and can refer for treatments like TMS (transcranial magnetic stimulation) or ketamine/esketamine therapy."
    },
    {
      question: "Should I see a psychiatrist or therapist for depression?",
      answer: "Both can be very helpful, and many patients benefit from seeing both. Psychiatrists are medical doctors who prescribe and manage medications like antidepressants. Therapists provide talk therapy like CBT or IPT to help you develop coping skills and address underlying issues. If your depression is moderate to severe, significantly impacts daily functioning, or hasn't improved with therapy alone, seeing a psychiatrist for medication is often very effective."
    },
    {
      question: "How long does antidepressant medication take to work?",
      answer: "Most antidepressants take 2-4 weeks to start working and 6-8 weeks to reach full effectiveness. This is because they work by gradually changing brain chemistry. Some people notice improvements in sleep, appetite, or energy before mood improves. Our psychiatrists will explain what to expect with your specific medication and schedule regular follow-ups to monitor your progress and make adjustments as needed."
    },
  ],
  sidebar: {
    formHeading: "Schedule Depression Evaluation",
    formSubheading: "Same-week appointments available. Most insurance accepted.",
    formType: "depression_psychiatrist",
    quickLinks: [
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/depression-treatment", label: "Depression Treatment" },
      { href: "/depression-counseling", label: "Depression Counseling" },
      { href: "/medication-management-orlando", label: "Medication Management" },
      { href: "/new-patients", label: "New Patients" },
      { href: "/best-psychiatrist-orlando", label: "Best Psychiatrist Orlando" },
      { href: "/mental-health-doctor-orlando", label: "Mental Health Doctor" },
      { href: "/online-psychiatrist-florida", label: "Online Psychiatrist FL" },
      { href: "/depression-psychiatrist-orlando", label: "Depression Psychiatrist" },
      { href: "/psychiatrist-for-anxiety-near-me", label: "Anxiety Psychiatrist Near Me" },
    ],
  },
  analytics: {
    pageName: "Psychiatrist for Depression Near Me Page",
    conversionCategory: "depression_psychiatrist_near_me",
  },
};

export const depressionPsychiatristOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Depression Psychiatrist Orlando FL | #1 Rated | 2025",
    description: "Looking for a depression psychiatrist in Orlando? Board-certified depression specialists. Expert treatment for major depression, treatment-resistant depression. Same-week appointments. 4.8★ rating. BCBS, Cigna, Medicare. Call (386) 848-8751.",
    keywords: ["depression psychiatrist orlando", "depression psychiatrist orlando fl", "psychiatrist for depression orlando", "depression doctor orlando", "depression specialist orlando", "antidepressant psychiatrist orlando", "major depression treatment orlando", "best depression psychiatrist orlando"],
    canonicalPath: "/depression-psychiatrist-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "Depression Psychiatrist Orlando FL - Empathy Health Clinic",
    "description": "Expert depression treatment in Orlando, FL by board-certified psychiatrists specializing in major depression and treatment-resistant depression.",
    "url": "https://empathyhealthclinic.com/depression-psychiatrist-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Orlando",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.59544,
      "longitude": -81.36537
    },
    "areaServed": [
      { "@type": "City", "name": "Orlando" },
      { "@type": "City", "name": "Winter Park" },
      { "@type": "City", "name": "Altamonte Springs" },
      { "@type": "City", "name": "Lake Mary" },
      { "@type": "City", "name": "Maitland" }
    ],
    "medicalSpecialty": "Psychiatry"
  },
  hero: {
    title: "Depression Psychiatrist Orlando",
    subtitle: "Expert depression treatment by board-certified psychiatrists in Orlando. Specialized care for major depression, treatment-resistant depression, and medication management. Same-week appointments available with in-person and telehealth options. Most insurance accepted.",
    ctaPrimary: "Schedule Appointment",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Depression Specialists", "Same-Week Appointments", "Most Insurance Accepted"],
  },
  location: {
    title: "Depression Psychiatry Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth & in-person available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Depression Psychiatrist Orlando: Expert Depression Treatment",
    introduction: [
      "Finding an experienced depression psychiatrist in Orlando is essential for effective treatment. At Empathy Health Clinic, our board-certified psychiatrists specialize in diagnosing and treating all forms of depression, including major depressive disorder, persistent depressive disorder, and treatment-resistant depression.",
      "Our Orlando depression specialists provide comprehensive psychiatric evaluations, personalized medication management, and ongoing support to help you overcome depression and reclaim your quality of life. We understand that depression affects every aspect of daily living and are committed to finding the treatment approach that works best for you.",
      "Same-week appointments are typically available because we know that when you're struggling with depression, every day matters. We offer both in-person visits at our Winter Park office and telehealth appointments throughout Florida."
    ],
    conditionsHeading: "Depression Conditions We Treat",
    conditions: [
      { name: "Major Depressive Disorder", description: "Clinical depression with persistent symptoms" },
      { name: "Treatment-Resistant Depression", description: "Depression that hasn't responded to previous treatments" },
      { name: "Persistent Depressive Disorder", description: "Dysthymia and chronic depression" },
      { name: "Postpartum Depression" },
      { name: "Seasonal Affective Disorder (SAD)" },
      { name: "Bipolar Depression", description: "Depressive episodes in bipolar disorder" },
    ],
    authoritativeSources: [
      { source: "NIMH" as const, topic: "Depression" },
      { source: "APA" as const, topic: "Depression Treatment" },
    ],
    internalLinksCategory: "conditions" as const,
    showTrustFactors: true,
    servicesHeading: "Depression Psychiatry Services in Orlando",
    services: [
      {
        icon: FileText,
        title: "Comprehensive Depression Evaluation",
        description: "Thorough psychiatric assessment to accurately diagnose your specific type of depression, identify contributing factors, and rule out other conditions. Our evaluation includes symptom history, medical history review, and validated depression screening tools."
      },
      {
        icon: Brain,
        title: "Antidepressant Medication Management",
        description: "Expert prescribing and monitoring of antidepressants including SSRIs (Lexapro, Zoloft, Prozac), SNRIs (Effexor, Cymbalta), and other medications. We work with you to find the right medication and dosage for optimal symptom relief with minimal side effects."
      },
      {
        icon: Shield,
        title: "Treatment-Resistant Depression Care",
        description: "Specialized approaches for depression that hasn't responded to standard treatments. Options include medication optimization, combination therapy, augmentation strategies, and referrals for TMS or ketamine therapy when appropriate."
      },
      {
        icon: Video,
        title: "Telehealth Depression Treatment",
        description: "Convenient online psychiatric appointments from anywhere in Florida. Our secure telehealth platform provides the same quality care as in-person visits, making it easier to maintain consistent treatment even when depression makes leaving home difficult."
      },
    ],
    whyChooseHeading: "Why Choose Our Orlando Depression Psychiatrists?",
    whyChoosePoints: [
      {
        icon: Award,
        title: "Board-Certified Depression Specialists",
        description: "Our psychiatrists are board-certified by the American Board of Psychiatry and Neurology with extensive experience treating all types of depression, including complex and treatment-resistant cases."
      },
      {
        icon: Calendar,
        title: "Same-Week Appointments",
        description: "Unlike many Orlando psychiatrists with months-long waitlists, we typically offer same-week appointments for new patients. When you're struggling with depression, waiting isn't acceptable."
      },
      {
        icon: Heart,
        title: "Compassionate, Personalized Care",
        description: "We understand that depression is deeply personal. Our psychiatrists take time to listen, explain treatment options, and work collaboratively with you to develop a treatment plan that fits your life and preferences."
      },
    ],
  },
  faqs: [
    {
      question: "What medications do psychiatrists prescribe for depression in Orlando?",
      answer: "Our Orlando psychiatrists commonly prescribe SSRIs (Lexapro, Zoloft, Prozac, Celexa), SNRIs (Effexor, Cymbalta, Pristiq), bupropion (Wellbutrin), mirtazapine (Remeron), and other antidepressants. For treatment-resistant depression, we may use augmentation strategies or newer treatments. The choice depends on your specific symptoms, medical history, and any previous medication trials."
    },
    {
      question: "How quickly can I see a depression psychiatrist in Orlando?",
      answer: "At Empathy Health Clinic, we typically offer same-week appointments for depression evaluations. Many patients can be seen within 3-5 business days. We understand that depression symptoms are serious and prioritize getting you in quickly. Call 386-848-8751 to schedule your appointment."
    },
    {
      question: "What is the difference between a depression psychiatrist and a therapist?",
      answer: "A psychiatrist is a medical doctor who can prescribe and manage medications like antidepressants. A therapist provides talk therapy (like CBT) to help develop coping skills. Many patients benefit from both - a psychiatrist for medication management and a therapist for counseling. Our clinic can help coordinate both types of care."
    },
    {
      question: "How long does antidepressant medication take to work?",
      answer: "Most antidepressants take 2-4 weeks to start showing effects and 6-8 weeks to reach full effectiveness. Some people notice improvements in sleep, energy, or appetite before their mood lifts. Our psychiatrists schedule regular follow-ups during this period to monitor your progress and make adjustments as needed."
    },
    {
      question: "What is treatment-resistant depression?",
      answer: "Treatment-resistant depression is when depression doesn't adequately respond to at least two different antidepressant medications tried at proper doses for sufficient duration. Our psychiatrists specialize in treating treatment-resistant depression using advanced medication strategies, combination therapies, and can refer for treatments like TMS or ketamine when appropriate."
    },
    {
      question: "Does insurance cover depression psychiatry in Orlando?",
      answer: "Yes, most health insurance plans cover psychiatric evaluations and medication management for depression. We accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, Humana, and Medicare. Contact us at 386-848-8751 to verify your specific coverage before your appointment."
    },
  ],
  sidebar: {
    formHeading: "Schedule Depression Evaluation",
    formSubheading: "Same-week appointments available. Most insurance accepted.",
    formType: "depression_psychiatrist",
    quickLinks: [
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/depression-treatment", label: "Depression Treatment" },
      { href: "/depression-counseling", label: "Depression Counseling" },
      { href: "/medication-management-orlando", label: "Medication Management" },
      { href: "/new-patients", label: "New Patients" },
      { href: "/best-psychiatrist-orlando", label: "Best Psychiatrist Orlando" },
      { href: "/mental-health-doctor-orlando", label: "Mental Health Doctor" },
      { href: "/online-psychiatrist-florida", label: "Online Psychiatrist FL" },
      { href: "/psychiatrist-for-anxiety-near-me", label: "Anxiety Psychiatrist Near Me" },
      { href: "/psychiatrist-for-depression-near-me", label: "Depression Psychiatrist Near Me" },
    ],
  },
  analytics: {
    pageName: "Depression Psychiatrist Orlando Page",
    conversionCategory: "depression_psychiatrist_orlando",
  },
};

// Psychiatrist Accepting New Patients Orlando
export const psychiatristAcceptingNewPatientsOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Psychiatrist Accepting New Patients Orlando | 2025",
    description: "Orlando psychiatrist accepting new patients now. No waitlist, same-week appointments available. Board-certified psychiatrists for anxiety, depression, ADHD. Call 386-848-8751.",
    keywords: ["psychiatrist accepting new patients orlando", "psychiatrist taking new patients orlando", "psychiatrist near me accepting new patients", "orlando psychiatrist accepting patients", "new patient psychiatrist orlando fl", "psychiatrist open to new patients orlando"],
    canonicalPath: "/psychiatrist-accepting-new-patients-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness", "Psychiatrist"],
    "name": "Psychiatrist Accepting New Patients Orlando FL - Empathy Health Clinic",
    "description": "Board-certified psychiatrist in Orlando accepting new patients with same-week appointment availability.",
    "url": "https://empathyhealthclinic.com/psychiatrist-accepting-new-patients-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "medicalSpecialty": "Psychiatry"
  },
  hero: {
    title: "Psychiatrist Accepting New Patients in Orlando",
    subtitle: "Skip the months-long waitlist. Our board-certified psychiatrists are actively accepting new patients with same-week appointment availability. In-person and telehealth options. Comprehensive psychiatric care for anxiety, depression, ADHD, and more. Most insurance accepted.",
    ctaPrimary: "Request Appointment",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Accepting New Patients Now", "Same-Week Appointments", "No Waitlist"],
  },
  location: {
    title: "Orlando Metro Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth & in-person available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Orlando Psychiatrist Accepting New Patients Now",
    introduction: [
      "Tired of calling psychiatrists in Orlando only to hear 'we're not accepting new patients' or 'our next opening is in three months'? At Empathy Health Clinic, we're actively accepting new patients and typically offer same-week appointments.",
      "Our board-certified psychiatrists understand that when you're ready to seek help for your mental health, waiting months isn't an option. That's why we maintain open availability for new patients seeking psychiatric evaluations, medication management, and ongoing care for conditions like anxiety, depression, ADHD, and bipolar disorder.",
      "Whether you need a new psychiatrist because you've moved to Orlando, your previous provider retired, or you're seeking mental health care for the first time, we're here to help. Call today and you could be seen this week."
    ],
    conditionsHeading: "Conditions We Treat for New Patients",
    conditions: [
      { name: "Anxiety Disorders", description: "GAD, panic disorder, social anxiety" },
      { name: "Depression", description: "Major depression, persistent depression" },
      { name: "ADHD", description: "Adult and adolescent ADHD" },
      { name: "Bipolar Disorder" },
      { name: "OCD" },
      { name: "PTSD & Trauma" },
      { name: "Insomnia & Sleep Disorders" },
      { name: "Medication Management" },
    ],
    servicesHeading: "New Patient Psychiatric Services",
    services: [
      {
        icon: Calendar,
        title: "Same-Week New Patient Appointments",
        description: "Unlike many Orlando psychiatrists with months-long waitlists, we prioritize new patient access. Most new patients are seen within 3-5 business days of calling."
      },
      {
        icon: FileText,
        title: "Comprehensive Initial Evaluation",
        description: "Your first appointment includes a thorough 45-60 minute psychiatric evaluation to understand your symptoms, history, and treatment goals. We develop a personalized treatment plan tailored to your needs."
      },
      {
        icon: Brain,
        title: "Medication Management",
        description: "If medication is recommended, prescriptions can be sent to your pharmacy the same day. We provide ongoing medication management with regular follow-up appointments."
      },
      {
        icon: Video,
        title: "In-Person or Telehealth",
        description: "Choose the appointment format that works best for you. We offer both in-person visits at our Winter Park office and convenient telehealth appointments throughout Florida."
      },
    ],
    whyChooseHeading: "Why New Patients Choose Us",
    whyChoosePoints: [
      {
        icon: Clock,
        title: "No Waitlist - Seen This Week",
        description: "We understand the frustration of calling multiple psychiatrists only to be told they aren't accepting new patients. At Empathy Health Clinic, we maintain open availability and typically see new patients within the same week."
      },
      {
        icon: Award,
        title: "Board-Certified Psychiatrists",
        description: "All our psychiatrists are board-certified by the American Board of Psychiatry and Neurology. You'll receive expert care from day one."
      },
      {
        icon: Shield,
        title: "Smooth Transition of Care",
        description: "If you're transferring from another provider, we make the transition seamless. We can coordinate with your previous psychiatrist or primary care doctor to ensure continuity of care and medication."
      },
    ],
  },
  faqs: [
    {
      question: "Are you currently accepting new psychiatric patients in Orlando?",
      answer: "Yes! Empathy Health Clinic is actively accepting new psychiatric patients. Unlike many Orlando psychiatrists with closed panels or months-long waitlists, we prioritize accessibility. Call 386-848-8751 to schedule your appointment - most new patients are seen within the same week."
    },
    {
      question: "How quickly can I get an appointment as a new patient?",
      answer: "Most new patients are scheduled within 3-5 business days of calling. We understand that when you've made the decision to seek psychiatric help, waiting months isn't acceptable. Same-day appointments may occasionally be available for urgent situations."
    },
    {
      question: "What should I bring to my first psychiatric appointment?",
      answer: "Please bring your insurance card, photo ID, a list of current medications (including dosages), and any relevant medical records if available. If you're transferring from another psychiatrist, having records of previous medications tried and their outcomes is helpful but not required."
    },
    {
      question: "Do I need a referral to see your psychiatrist as a new patient?",
      answer: "No referral is required to become a new patient at our practice. You can call us directly at 386-848-8751 to schedule. However, some insurance plans may require a referral for coverage, so we recommend checking with your insurance provider."
    },
    {
      question: "What insurance do you accept for new patients?",
      answer: "We accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, Humana, and more. We verify your insurance benefits before your first appointment so you know your costs upfront."
    },
  ],
  sidebar: {
    formHeading: "New Patient Appointment",
    formSubheading: "Accepting new patients now. Same-week appointments available.",
    formType: "new_patient_psychiatrist",
    quickLinks: [
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/psychiatric-evaluation-orlando", label: "Psychiatric Evaluation" },
      { href: "/adhd-psychiatrist-orlando", label: "ADHD Psychiatrist" },
      { href: "/anxiety-psychiatrist-orlando", label: "Anxiety Psychiatrist" },
      { href: "/medication-management-orlando", label: "Medication Management" },
      { href: "/telepsychiatry-orlando", label: "Telepsychiatry" },
      { href: "/psychiatrist-orlando-accepts-bcbs", label: "BCBS Insurance" },
      { href: "/psychiatrist-orlando-accepts-aetna", label: "Aetna Insurance" },
    ],
  },
  analytics: {
    pageName: "Psychiatrist Accepting New Patients Orlando Page",
    conversionCategory: "new_patient_psychiatrist_orlando",
  },
};

// Online Psychiatrist Orlando - Optimized for "online psychiatrist orlando" (390 volume)
export const onlinePsychiatristOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Online Psychiatrist Orlando FL | Telehealth | Same-Week 2025",
    description: "Looking for an online psychiatrist in Orlando? HIPAA-compliant telehealth psychiatry. Same-week video appointments for anxiety, depression, ADHD. 4.8★ rating. BCBS, Cigna, Medicare. Prescriptions sent same day. Call (386) 848-8751.",
    keywords: ["online psychiatrist orlando", "telepsychiatry orlando", "virtual psychiatrist orlando", "telehealth psychiatrist orlando fl", "online psychiatric services orlando", "video psychiatry orlando", "remote psychiatrist orlando", "online psychiatrist near me"],
    canonicalPath: "/online-psychiatrist-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness", "Psychiatrist"],
    "name": "Online Psychiatrist Orlando FL - Empathy Health Clinic",
    "description": "HIPAA-compliant online psychiatry services for Orlando residents via secure video appointments.",
    "url": "https://empathyhealthclinic.com/online-psychiatrist-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "medicalSpecialty": "Psychiatry"
  },
  hero: {
    title: "Online Psychiatrist in Orlando, FL",
    subtitle: "Expert psychiatric care from the comfort of your home. Our board-certified psychiatrists provide HIPAA-compliant telehealth appointments for anxiety, depression, ADHD, and more. Same-week video appointments available. Prescriptions sent directly to your pharmacy. Most insurance accepted.",
    ctaPrimary: "Schedule Telehealth Visit",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["HIPAA-Compliant Platform", "Same-Week Telehealth", "Prescriptions Sent Same Day"],
  },
  location: {
    title: "Serving All of Orlando via Telehealth",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth appointments available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Convenient Online Psychiatry for Orlando Residents",
    introduction: [
      "Access expert psychiatric care without leaving your home. Our online psychiatry services bring board-certified psychiatrists directly to you through secure, HIPAA-compliant video appointments. Perfect for busy professionals, parents, students, or anyone who prefers the convenience of virtual healthcare.",
      "Our Orlando-based telepsychiatry services provide the same quality of care as in-person visits. You'll meet face-to-face with your psychiatrist via video, discuss your symptoms and concerns, receive an accurate diagnosis, and get prescriptions sent directly to your local pharmacy - all from your couch, office, or anywhere with a private internet connection.",
      "Whether you're seeking treatment for anxiety, depression, ADHD, or other mental health conditions, our online psychiatrists are here to help. Same-week telehealth appointments are typically available."
    ],
    conditionsHeading: "Conditions Treated via Telehealth",
    conditions: [
      { name: "Anxiety Disorders", description: "GAD, panic disorder, social anxiety" },
      { name: "Depression", description: "Major depression, dysthymia" },
      { name: "ADHD", description: "Adult and adolescent" },
      { name: "Bipolar Disorder" },
      { name: "OCD" },
      { name: "PTSD" },
      { name: "Insomnia" },
      { name: "Medication Refills" },
    ],
    servicesHeading: "Our Online Psychiatry Services",
    services: [
      {
        icon: Video,
        title: "Secure Video Appointments",
        description: "Meet with your psychiatrist face-to-face through our HIPAA-compliant telehealth platform. Our video technology is secure, encrypted, and designed specifically for healthcare to protect your privacy."
      },
      {
        icon: FileText,
        title: "Online Psychiatric Evaluations",
        description: "Comprehensive initial evaluations conducted entirely via video. Your psychiatrist will thoroughly assess your symptoms, review your history, and develop a personalized treatment plan - all through your screen."
      },
      {
        icon: Brain,
        title: "Virtual Medication Management",
        description: "Ongoing medication management appointments via telehealth. Discuss how your medications are working, adjust dosages, address side effects, and get refills sent to your pharmacy electronically."
      },
      {
        icon: Shield,
        title: "Same-Day Prescriptions",
        description: "When medication is prescribed or refilled during your online appointment, we send it electronically to your preferred pharmacy the same day. No waiting, no extra trips."
      },
    ],
    whyChooseHeading: "Why Choose Our Online Psychiatry Services",
    whyChoosePoints: [
      {
        icon: Clock,
        title: "Convenient & Time-Saving",
        description: "No commuting, no parking, no waiting rooms. Connect with your psychiatrist from home, your office, or anywhere private. Our online appointments fit into your busy life."
      },
      {
        icon: Shield,
        title: "HIPAA-Compliant & Secure",
        description: "Your privacy is protected with enterprise-grade encryption and HIPAA-compliant video technology. Your sessions are private and secure, just like an in-person visit."
      },
      {
        icon: Award,
        title: "Same Quality as In-Person",
        description: "Our board-certified psychiatrists provide the same thorough, compassionate care via telehealth as they do in person. Video appointments allow for face-to-face connection and comprehensive evaluation."
      },
    ],
  },
  faqs: [
    {
      question: "Is online psychiatry as effective as in-person visits?",
      answer: "Yes, research shows that telepsychiatry is equally effective as in-person psychiatric care for most conditions. Our video platform allows for face-to-face interaction, clear communication, and thorough evaluation. Many patients actually prefer telehealth for its convenience and comfort."
    },
    {
      question: "What technology do I need for an online psychiatry appointment?",
      answer: "You need a device with a camera and microphone (smartphone, tablet, laptop, or computer), a stable internet connection, and a private space for your appointment. We'll send you a simple link to join your video session - no special software to download."
    },
    {
      question: "Can online psychiatrists prescribe medication?",
      answer: "Yes, our board-certified psychiatrists can prescribe most psychiatric medications during telehealth appointments, including antidepressants, anti-anxiety medications, ADHD medications, and mood stabilizers. Prescriptions are sent electronically to your preferred pharmacy the same day."
    },
    {
      question: "Is my online psychiatry appointment private and secure?",
      answer: "Absolutely. We use a HIPAA-compliant telehealth platform with end-to-end encryption to protect your privacy. Your video session is as confidential as an in-person office visit. We recommend you find a private, quiet space for your appointment."
    },
    {
      question: "Do you accept insurance for telehealth psychiatry?",
      answer: "Yes, most insurance plans now cover telehealth psychiatric services at the same rate as in-person visits. We accept Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, Humana, and more. We'll verify your telehealth benefits before your appointment."
    },
  ],
  sidebar: {
    formHeading: "Schedule Online Appointment",
    formSubheading: "HIPAA-compliant telehealth. Same-week availability.",
    formType: "online_psychiatrist",
    quickLinks: [
      { href: "/telepsychiatry-orlando", label: "Telepsychiatry" },
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/psychiatric-evaluation-orlando", label: "Psychiatric Evaluation" },
      { href: "/adhd-psychiatrist-orlando", label: "ADHD Psychiatrist" },
      { href: "/new-patients", label: "New Patients" },
      { href: "/best-psychiatrist-orlando", label: "Best Psychiatrist Orlando" },
      { href: "/mental-health-doctor-orlando", label: "Mental Health Doctor" },
      { href: "/online-psychiatrist-florida", label: "Online Psychiatrist FL" },
      { href: "/depression-psychiatrist-orlando", label: "Depression Psychiatrist" },
      { href: "/psychiatrist-for-anxiety-near-me", label: "Anxiety Psychiatrist Near Me" },
    ],
  },
  analytics: {
    pageName: "Online Psychiatrist Orlando Page",
    conversionCategory: "online_psychiatrist_orlando",
  },
};

// Best Psychiatrist Orlando - Optimized for "best psychiatrist orlando" (320 volume)
export const bestPsychiatristOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Best Psychiatrist Orlando FL | 4.8★ Rated | 2025",
    description: "Looking for the best psychiatrist in Orlando? 4.8-star rated, board-certified psychiatrists. 200+ positive reviews. Expert care for anxiety, depression, ADHD. Same-week appointments. BCBS, Cigna, Medicare. Call (386) 848-8751.",
    keywords: ["best psychiatrist orlando", "top psychiatrist orlando", "top rated psychiatrist orlando fl", "best psychiatrist near me", "highly rated psychiatrist orlando", "best mental health doctor orlando", "orlando best psychiatrist", "#1 psychiatrist orlando"],
    canonicalPath: "/best-psychiatrist-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness", "Psychiatrist"],
    "name": "Best Psychiatrist Orlando FL - Empathy Health Clinic",
    "description": "Top-rated, board-certified psychiatrists in Orlando, FL with excellent patient reviews and extensive experience.",
    "url": "https://empathyhealthclinic.com/best-psychiatrist-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "medicalSpecialty": "Psychiatry",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "200"
    }
  },
  hero: {
    title: "Best Psychiatrist in Orlando, FL",
    subtitle: "Board-certified psychiatrists with 4.8-star ratings and hundreds of positive patient reviews. Our top-rated team delivers exceptional psychiatric care for anxiety, depression, ADHD, and more. Experience the difference that expertise and compassion make. Same-week appointments available.",
    ctaPrimary: "Book Top-Rated Care",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["4.8 Star Google Rating", "Board-Certified Psychiatrists", "200+ Patient Reviews"],
  },
  location: {
    title: "Orlando Metro Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth & in-person available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Why We're Rated Among Orlando's Best Psychiatrists",
    introduction: [
      "When searching for the best psychiatrist in Orlando, you deserve more than just credentials - you deserve exceptional care from providers who truly listen, understand, and deliver results. At Empathy Health Clinic, our board-certified psychiatrists have earned a 4.8-star rating through their commitment to clinical excellence and patient-centered care.",
      "What makes a psychiatrist 'the best' isn't just medical training - it's the combination of diagnostic expertise, genuine compassion, clear communication, and a treatment approach tailored to each individual. Our patients consistently praise our psychiatrists for taking time to listen, explaining treatment options thoroughly, and achieving real improvements in their mental health.",
      "Our top-rated Orlando psychiatrists specialize in anxiety, depression, ADHD, bipolar disorder, and other conditions. We accept most major insurance plans and offer same-week appointments because excellent psychiatric care shouldn't require a months-long wait."
    ],
    conditionsHeading: "Conditions Treated by Our Top-Rated Team",
    conditions: [
      { name: "Anxiety Disorders", description: "GAD, panic disorder, social anxiety" },
      { name: "Depression", description: "Major depression, treatment-resistant depression" },
      { name: "ADHD", description: "Adult and adolescent" },
      { name: "Bipolar Disorder" },
      { name: "OCD" },
      { name: "PTSD & Trauma" },
      { name: "Personality Disorders" },
      { name: "Medication Optimization" },
    ],
    servicesHeading: "What Sets Our Psychiatrists Apart",
    services: [
      {
        icon: Award,
        title: "Board-Certified Excellence",
        description: "All our psychiatrists are board-certified by the American Board of Psychiatry and Neurology, representing the highest standard of psychiatric training, knowledge, and ongoing education in the field."
      },
      {
        icon: Heart,
        title: "Patient-Centered Approach",
        description: "We believe the best psychiatric care happens when patients feel heard and understood. Our psychiatrists take time to listen to your concerns, explain diagnoses clearly, and involve you in treatment decisions."
      },
      {
        icon: Brain,
        title: "Evidence-Based Treatment",
        description: "Our treatment recommendations are grounded in the latest psychiatric research and clinical evidence. We stay current with advances in psychopharmacology to provide you with the most effective treatments available."
      },
      {
        icon: CheckCircle,
        title: "Proven Patient Outcomes",
        description: "Our 4.8-star rating reflects real patient experiences and outcomes. We measure our success by your improvement - reduced symptoms, better functioning, and improved quality of life."
      },
    ],
    whyChooseHeading: "Why Patients Rate Us Among Orlando's Best",
    whyChoosePoints: [
      {
        icon: Award,
        title: "Exceptional Credentials",
        description: "Our psychiatrists hold board certification, have completed residency training at top programs, and bring years of clinical experience. You receive care from providers who are true experts in their field."
      },
      {
        icon: MessageCircle,
        title: "Outstanding Patient Reviews",
        description: "With a 4.8-star Google rating and hundreds of positive reviews, our patients consistently praise our thorough evaluations, compassionate care, effective treatments, and responsive communication."
      },
      {
        icon: Calendar,
        title: "Accessibility Despite Demand",
        description: "Even with high demand, we maintain same-week appointment availability. Being the best doesn't mean being unavailable - we believe everyone deserves timely access to excellent psychiatric care."
      },
    ],
  },
  faqs: [
    {
      question: "What makes a psychiatrist the 'best' in Orlando?",
      answer: "The best psychiatrists combine board certification, extensive clinical experience, excellent diagnostic skills, and genuine compassion for patients. At Empathy Health Clinic, our 4.8-star rating reflects our commitment to all these qualities. We also prioritize clear communication, patient involvement in treatment decisions, and measurable improvement in symptoms and quality of life."
    },
    {
      question: "How do I know if your psychiatrists are highly rated?",
      answer: "Our psychiatrists maintain a 4.8-star average rating on Google with over 200 patient reviews. You can read real patient experiences on our Google Business listing. Our patients frequently mention thorough evaluations, effective treatment, compassionate care, and improved mental health outcomes."
    },
    {
      question: "Are your psychiatrists board-certified?",
      answer: "Yes, all our psychiatrists are board-certified by the American Board of Psychiatry and Neurology (ABPN). Board certification requires completing an accredited psychiatry residency, passing rigorous examinations, and maintaining ongoing education. This certification represents the highest standard of psychiatric expertise."
    },
    {
      question: "Can I see a top-rated psychiatrist quickly or is there a long wait?",
      answer: "Despite being highly rated, we maintain same-week appointment availability for new patients. We believe that excellent psychiatric care should be accessible when you need it. Call 386-848-8751 to schedule - most new patients are seen within 3-5 business days."
    },
    {
      question: "What conditions do your best-rated psychiatrists treat?",
      answer: "Our top-rated psychiatrists treat a full range of mental health conditions including anxiety disorders, depression, ADHD, bipolar disorder, OCD, PTSD, personality disorders, and more. We're experienced in complex cases and treatment-resistant conditions where previous treatments haven't worked."
    },
  ],
  sidebar: {
    formHeading: "See Our Top-Rated Team",
    formSubheading: "4.8-star rated care. Same-week appointments available.",
    formType: "best_psychiatrist",
    quickLinks: [
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/psychiatric-evaluation-orlando", label: "Psychiatric Evaluation" },
      { href: "/adhd-psychiatrist-orlando", label: "ADHD Psychiatrist" },
      { href: "/anxiety-psychiatrist-orlando", label: "Anxiety Psychiatrist" },
      { href: "/new-patients", label: "New Patients" },
      { href: "/mental-health-doctor-orlando", label: "Mental Health Doctor" },
      { href: "/online-psychiatrist-florida", label: "Online Psychiatrist FL" },
      { href: "/depression-psychiatrist-orlando", label: "Depression Psychiatrist" },
      { href: "/psychiatrist-for-anxiety-near-me", label: "Anxiety Psychiatrist Near Me" },
      { href: "/psychiatrist-for-depression-near-me", label: "Depression Psychiatrist Near Me" },
    ],
  },
  analytics: {
    pageName: "Best Psychiatrist Orlando Page",
    conversionCategory: "best_psychiatrist_orlando",
  },
};

// Online Psychiatrist Florida - Optimized for "online psychiatrist florida" (260 volume)
export const onlinePsychiatristFloridaConfig: LandingPageConfig = {
  seo: {
    title: "Online Psychiatrist Florida | Statewide Telehealth | 2025",
    description: "Looking for an online psychiatrist in Florida? Florida-licensed psychiatrists serving all FL residents via telehealth. Orlando, Miami, Tampa, Jacksonville. Same-week appointments. 4.8★ rating. Most insurance. Call (386) 848-8751.",
    keywords: ["online psychiatrist florida", "florida online psychiatrist", "telehealth psychiatrist florida", "virtual psychiatrist fl", "online mental health florida", "psychiatrist telehealth florida", "florida telepsychiatry", "online psychiatrist fl"],
    canonicalPath: "/online-psychiatrist-florida",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness", "Psychiatrist"],
    "name": "Online Psychiatrist Florida - Empathy Health Clinic",
    "description": "Florida-licensed online psychiatrists providing statewide telehealth psychiatric care to residents throughout Florida.",
    "url": "https://empathyhealthclinic.com/online-psychiatrist-florida",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "State",
      "name": "Florida"
    },
    "medicalSpecialty": "Psychiatry"
  },
  hero: {
    title: "Online Psychiatrist for Florida Residents",
    subtitle: "Florida-licensed psychiatrists providing virtual mental health care statewide. Whether you're in Orlando, Miami, Tampa, Jacksonville, or Fort Lauderdale, receive expert psychiatric treatment from the comfort of your home. Same-week telehealth appointments available. Most insurance accepted.",
    ctaPrimary: "Start Telehealth Visit",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Serving All of Florida", "Same-Week Telehealth Appointments", "HIPAA-Compliant Video"],
  },
  location: {
    title: "Serving All of Florida",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth available statewide",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Virtual Psychiatric Care Anywhere in Florida",
    introduction: [
      "Access board-certified psychiatrists from anywhere in Florida through our secure telehealth platform. Empathy Health Clinic's online psychiatry services bring expert mental health care directly to you, whether you're in Orlando, Tampa, Miami, Jacksonville, Fort Lauderdale, or any Florida community.",
      "Our Florida-licensed psychiatrists provide comprehensive virtual psychiatric care including evaluations, medication management, and ongoing treatment. You receive the same quality care as an in-person visit, with the convenience of connecting from your home, office, or anywhere with a private internet connection.",
      "No more long drives to appointments or taking time off work. With same-week telehealth availability and flexible scheduling, getting expert psychiatric care has never been more accessible for Florida residents."
    ],
    conditionsHeading: "Conditions We Treat Online",
    conditions: [
      { name: "Anxiety Disorders", description: "GAD, panic disorder, social anxiety" },
      { name: "Depression & Mood Disorders" },
      { name: "ADHD", description: "Adult & adolescent" },
      { name: "Bipolar Disorder" },
      { name: "OCD" },
      { name: "PTSD & Trauma" },
      { name: "Insomnia & Sleep Disorders" },
      { name: "Panic Attacks" },
      { name: "Medication Management" },
      { name: "Treatment-Resistant Depression" },
    ],
    servicesHeading: "Our Online Psychiatry Services",
    services: [
      {
        icon: Video,
        title: "Secure Video Appointments",
        description: "HIPAA-compliant telehealth platform providing private, face-to-face psychiatric care. Connect from any device with a camera and internet connection."
      },
      {
        icon: Brain,
        title: "Psychiatric Evaluations",
        description: "Comprehensive initial evaluations conducted virtually to accurately diagnose your condition and develop a personalized treatment plan."
      },
      {
        icon: FileText,
        title: "Medication Management",
        description: "Expert medication prescribing and monitoring. Prescriptions sent electronically to your local Florida pharmacy the same day."
      },
      {
        icon: Calendar,
        title: "Flexible Follow-Up Care",
        description: "Convenient virtual follow-up appointments to monitor your progress, adjust medications, and ensure optimal treatment outcomes."
      },
    ],
    whyChooseHeading: "Why Choose Our Online Psychiatry?",
    whyChoosePoints: [
      {
        icon: Award,
        title: "Florida-Licensed Psychiatrists",
        description: "All our psychiatrists are licensed to practice in Florida and board-certified by the American Board of Psychiatry and Neurology, ensuring you receive expert care that meets Florida's medical standards."
      },
      {
        icon: Shield,
        title: "Statewide Coverage",
        description: "From the Panhandle to the Keys, we serve patients throughout Florida. Whether you're in Orlando, Tampa, Miami, Jacksonville, Fort Lauderdale, or rural communities, quality psychiatric care is just a video call away."
      },
      {
        icon: CheckCircle,
        title: "Same Quality as In-Person",
        description: "Research shows telehealth psychiatry is just as effective as in-person care for most conditions. You receive the same thorough evaluation, expert treatment, and compassionate care through our secure video platform."
      },
    ],
  },
  faqs: [
    {
      question: "Can I see an online psychiatrist if I live anywhere in Florida?",
      answer: "Yes! Our Florida-licensed psychiatrists can treat patients anywhere in the state via telehealth. Whether you're in Orlando, Miami, Tampa, Jacksonville, Fort Lauderdale, Tallahassee, or any Florida community, you can access our online psychiatric services."
    },
    {
      question: "Is online psychiatry as effective as in-person visits?",
      answer: "Research consistently shows that telehealth psychiatry is equally effective as in-person care for most mental health conditions. You receive the same comprehensive evaluation, accurate diagnosis, and effective treatment through our secure video platform. Many patients prefer the convenience and privacy of virtual visits."
    },
    {
      question: "Can online psychiatrists prescribe medications in Florida?",
      answer: "Yes, our Florida-licensed psychiatrists can prescribe all appropriate psychiatric medications including controlled substances when clinically indicated. Prescriptions are sent electronically to your local Florida pharmacy the same day as your appointment."
    },
    {
      question: "What do I need for a telehealth psychiatry appointment?",
      answer: "You need a smartphone, tablet, or computer with a camera, a reliable internet connection, and a private location where you feel comfortable speaking openly. We'll send you a secure link before your appointment - no special software downloads required."
    },
    {
      question: "Does insurance cover online psychiatry in Florida?",
      answer: "Most major insurance plans cover telehealth psychiatry at the same rate as in-person visits. We accept Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, Humana, and many other plans. Our team will verify your telehealth benefits before your appointment."
    },
  ],
  sidebar: {
    formHeading: "Start Your Telehealth Visit",
    formSubheading: "Serving all Florida residents. Same-week appointments.",
    formType: "online_psychiatrist_florida",
    quickLinks: [
      { href: "/telepsychiatry-orlando", label: "Telepsychiatry Orlando" },
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/medication-management-orlando", label: "Medication Management" },
      { href: "/adhd-psychiatrist-orlando", label: "ADHD Treatment" },
      { href: "/new-patients", label: "New Patients" },
      { href: "/best-psychiatrist-orlando", label: "Best Psychiatrist Orlando" },
      { href: "/mental-health-doctor-orlando", label: "Mental Health Doctor" },
      { href: "/depression-psychiatrist-orlando", label: "Depression Psychiatrist" },
      { href: "/psychiatrist-for-anxiety-near-me", label: "Anxiety Psychiatrist Near Me" },
      { href: "/psychiatrist-for-depression-near-me", label: "Depression Psychiatrist Near Me" },
    ],
  },
  analytics: {
    pageName: "Online Psychiatrist Florida Page",
    conversionCategory: "online_psychiatrist_florida",
  },
};

// Mental Health Doctor Orlando - Optimized for "mental health doctor orlando" (210 volume)
export const mentalHealthDoctorOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Mental Health Doctor Orlando FL | #1 Rated | 2025",
    description: "Looking for a mental health doctor in Orlando? Board-certified psychiatric physicians for depression, anxiety, ADHD treatment. Same-week appointments. 4.8★ rating. BCBS, Cigna, Medicare. Call (386) 848-8751.",
    keywords: ["mental health doctor orlando", "mental health doctor near me", "mental health physician orlando", "psychiatric doctor orlando", "doctor for mental health orlando", "mental health md orlando", "orlando mental health doctor", "best mental health doctor orlando"],
    canonicalPath: "/mental-health-doctor-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness", "Physician"],
    "name": "Mental Health Doctor Orlando FL - Empathy Health Clinic",
    "description": "Board-certified mental health doctors providing medical psychiatric treatment in Orlando, FL.",
    "url": "https://empathyhealthclinic.com/mental-health-doctor-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "medicalSpecialty": "Psychiatry"
  },
  hero: {
    title: "Mental Health Doctor in Orlando, FL",
    subtitle: "Board-certified psychiatric physicians providing medical treatment for mental health conditions. Expert diagnosis and medication management for depression, anxiety, ADHD, bipolar disorder, and more. Same-week appointments available with telehealth and in-person options.",
    ctaPrimary: "See a Mental Health Doctor",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Board-Certified Physicians", "Same-Week Appointments", "Medical Treatment Approach"],
  },
  location: {
    title: "Orlando Mental Health Physician",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth & in-person available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Expert Mental Health Physicians in Orlando",
    introduction: [
      "When you need a doctor for your mental health, you deserve a physician who understands both the medical and psychological aspects of your condition. At Empathy Health Clinic, our mental health doctors are board-certified psychiatric physicians who provide comprehensive medical treatment for mental health conditions.",
      "Unlike therapists or counselors, our mental health doctors are medical physicians (MDs/DOs) with specialized training in psychiatry. This means they can diagnose conditions, prescribe medications, order lab tests, and coordinate your mental health care with your other medical providers.",
      "Whether you're experiencing depression, anxiety, ADHD, bipolar disorder, or other mental health challenges, our Orlando mental health doctors provide thorough medical evaluations and evidence-based treatment. Same-week appointments are typically available."
    ],
    conditionsHeading: "Conditions Our Mental Health Doctors Treat",
    conditions: [
      { name: "Clinical Depression", description: "Major depressive disorder, treatment-resistant depression" },
      { name: "Anxiety Disorders", description: "Generalized anxiety, panic disorder, social anxiety" },
      { name: "ADHD", description: "Comprehensive evaluation and medication management" },
      { name: "Bipolar Disorder", description: "Bipolar I, Bipolar II, mood stabilization" },
      { name: "OCD" },
      { name: "PTSD & Trauma" },
      { name: "Insomnia & Sleep Disorders" },
      { name: "Psychotic Disorders" },
      { name: "Personality Disorders" },
      { name: "Substance Use Disorders" },
    ],
    servicesHeading: "Our Medical Approach to Mental Health",
    services: [
      {
        icon: Brain,
        title: "Comprehensive Medical Evaluation",
        description: "Thorough psychiatric assessment including medical history review, mental status examination, and consideration of medical conditions that may affect mental health."
      },
      {
        icon: FileText,
        title: "Accurate Psychiatric Diagnosis",
        description: "Expert diagnosis based on DSM-5 criteria by physicians with specialized psychiatric training. Rule out medical causes of psychiatric symptoms."
      },
      {
        icon: Shield,
        title: "Medication Management",
        description: "Evidence-based prescribing of psychiatric medications with careful monitoring for effectiveness and side effects. Adjustments made for optimal outcomes."
      },
      {
        icon: Heart,
        title: "Integrated Care Coordination",
        description: "Your mental health doctor can coordinate with your primary care physician, therapist, and other specialists to ensure comprehensive, integrated care."
      },
    ],
    whyChooseHeading: "Why See a Mental Health Doctor?",
    whyChoosePoints: [
      {
        icon: Award,
        title: "Physician-Level Expertise",
        description: "Our mental health doctors are board-certified psychiatric physicians who completed medical school and residency training. They understand how medical conditions and medications interact with mental health."
      },
      {
        icon: Brain,
        title: "Medical Treatment Capability",
        description: "Unlike therapists or counselors, mental health doctors can prescribe medications, order laboratory tests, and provide medical treatment for psychiatric conditions."
      },
      {
        icon: CheckCircle,
        title: "Comprehensive Diagnostic Skills",
        description: "Mental health doctors can differentiate between psychiatric conditions and medical conditions that mimic mental illness, ensuring accurate diagnosis and appropriate treatment."
      },
    ],
  },
  faqs: [
    {
      question: "What is a mental health doctor?",
      answer: "A mental health doctor is a physician (MD or DO) who specializes in diagnosing and treating mental health conditions. Unlike therapists or counselors, mental health doctors are medical physicians who can prescribe medications, order laboratory tests, and provide medical treatment. Psychiatrists are the most common type of mental health doctor."
    },
    {
      question: "When should I see a mental health doctor vs. a therapist?",
      answer: "See a mental health doctor when you need medication, want a comprehensive medical evaluation, or when your symptoms are severe or not responding to therapy alone. Many patients benefit from seeing both - a mental health doctor for medication management and a therapist for counseling. At Empathy Health Clinic, we offer both services."
    },
    {
      question: "Can a mental health doctor prescribe medication?",
      answer: "Yes! Mental health doctors are medical physicians who can prescribe all types of psychiatric medications including antidepressants, anti-anxiety medications, mood stabilizers, ADHD medications, and when appropriate, controlled substances. Prescriptions are sent electronically to your pharmacy."
    },
    {
      question: "How is a mental health doctor different from a primary care doctor?",
      answer: "While primary care doctors can prescribe some psychiatric medications, mental health doctors (psychiatrists) have specialized training specifically in diagnosing and treating mental health conditions. They have more expertise in complex cases, medication combinations, and treatment-resistant conditions."
    },
    {
      question: "Do you accept insurance for mental health doctor visits?",
      answer: "Yes, we accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, Humana, and more. Our team will verify your mental health benefits before your appointment."
    },
  ],
  sidebar: {
    formHeading: "See a Mental Health Doctor",
    formSubheading: "Board-certified physicians. Same-week appointments.",
    formType: "mental_health_doctor",
    quickLinks: [
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/psychiatric-evaluation-orlando", label: "Psychiatric Evaluation" },
      { href: "/medication-management-orlando", label: "Medication Management" },
      { href: "/adhd-psychiatrist-orlando", label: "ADHD Doctor" },
      { href: "/new-patients", label: "New Patients" },
      { href: "/best-psychiatrist-orlando", label: "Best Psychiatrist Orlando" },
      { href: "/online-psychiatrist-florida", label: "Online Psychiatrist FL" },
      { href: "/depression-psychiatrist-orlando", label: "Depression Psychiatrist" },
      { href: "/psychiatrist-for-anxiety-near-me", label: "Anxiety Psychiatrist Near Me" },
      { href: "/psychiatrist-for-depression-near-me", label: "Depression Psychiatrist Near Me" },
    ],
  },
  analytics: {
    pageName: "Mental Health Doctor Orlando Page",
    conversionCategory: "mental_health_doctor_orlando",
  },
};

export const traumaPsychiatristOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Trauma Psychiatrist Orlando FL | PTSD Treatment",
    description: "Trauma psychiatrist in Orlando providing PTSD and complex trauma treatment. Board-certified care. Same-week appointments. Call 386-848-8751.",
    keywords: ["trauma psychiatrist orlando", "trauma therapy orlando", "ptsd psychiatrist orlando", "trauma treatment orlando"],
    canonicalPath: "/trauma-psychiatrist-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "Trauma Psychiatrist Orlando FL - Empathy Health Clinic",
    "description": "Board-certified trauma psychiatrist in Orlando providing specialized treatment for PTSD, complex trauma, and childhood trauma.",
    "url": "https://empathyhealthclinic.com/trauma-psychiatrist-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "medicalSpecialty": "Psychiatry"
  },
  hero: {
    title: "Trauma Psychiatrist in Orlando, FL",
    subtitle: "Compassionate, trauma-informed psychiatric care for PTSD, complex trauma, and childhood trauma. Our board-certified psychiatrists combine medication management with evidence-based approaches. Same-week appointments available with in-person and telehealth options.",
    ctaPrimary: "Schedule Consultation",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Trauma-Informed Care", "Same-Week Appointments"],
  },
  location: {
    title: "Orlando Trauma Psychiatry",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth & in-person available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Specialized Trauma Psychiatry in Orlando",
    introduction: [
      "Trauma affects the brain and body in profound ways, and healing requires specialized care. At Empathy Health Clinic, our board-certified trauma psychiatrists in Orlando understand the unique challenges faced by those living with PTSD, complex trauma, and the lasting effects of childhood trauma.",
      "We provide trauma-informed psychiatric care that goes beyond simply managing symptoms. Our approach combines careful medication management with an understanding of how trauma affects the nervous system, helping you find relief while supporting your overall healing journey.",
      "Whether you've experienced a single traumatic event, ongoing trauma, or are struggling with childhood experiences that still affect you today, our Orlando trauma psychiatrists offer compassionate, expert care. Same-week appointments are available because we know trauma survivors often need help urgently."
    ],
    conditionsHeading: "Trauma Conditions We Treat",
    conditions: [
      { name: "PTSD", description: "Post-Traumatic Stress Disorder" },
      { name: "Complex PTSD", description: "C-PTSD from prolonged trauma" },
      { name: "Childhood Trauma", description: "Developmental trauma effects" },
      { name: "Acute Stress Disorder" },
      { name: "Trauma-Related Anxiety" },
      { name: "Trauma-Related Depression" },
      { name: "Dissociative Disorders" },
      { name: "Survivor Guilt" },
      { name: "Military & Combat Trauma" },
      { name: "Sexual Assault Trauma" },
    ],
    servicesHeading: "Our Trauma Psychiatry Services",
    services: [
      {
        icon: Brain,
        title: "Trauma-Informed Evaluation",
        description: "Comprehensive psychiatric assessment designed specifically for trauma survivors, conducted in a safe and supportive environment."
      },
      {
        icon: Shield,
        title: "PTSD Medication Management",
        description: "Expert medication management using FDA-approved treatments for PTSD and trauma-related symptoms, including SSRIs, prazosin for nightmares, and other evidence-based options."
      },
      {
        icon: Heart,
        title: "Integrated Care Coordination",
        description: "Collaboration with trauma therapists and EMDR specialists to provide comprehensive treatment addressing both biological and psychological aspects of trauma."
      },
    ],
    whyChooseHeading: "Why Choose Our Trauma Psychiatrists?",
    whyChoosePoints: [
      {
        icon: Award,
        title: "Trauma-Specialized Expertise",
        description: "Our psychiatrists have specialized training in trauma-informed care, understanding how trauma affects the brain and body differently than other conditions."
      },
      {
        icon: Calendar,
        title: "Same-Week Appointments",
        description: "We understand that trauma survivors often can't wait months for care. We typically offer same-week appointments for new patients."
      },
      {
        icon: Video,
        title: "Safe Treatment Options",
        description: "Choose in-person or telehealth appointments based on what feels safest for you. Many trauma survivors appreciate the option to begin treatment from home."
      },
    ],
  },
  faqs: [
    {
      question: "What is a trauma psychiatrist?",
      answer: "A trauma psychiatrist is a medical doctor specializing in the biological and psychological treatment of trauma-related conditions like PTSD. Unlike therapists, trauma psychiatrists can prescribe medications to help manage symptoms such as flashbacks, nightmares, hypervigilance, and anxiety. They often work alongside trauma therapists to provide comprehensive care."
    },
    {
      question: "What medications help with PTSD and trauma?",
      answer: "Several medications are FDA-approved or commonly used for PTSD treatment. These include SSRIs like sertraline (Zoloft) and paroxetine (Paxil), prazosin for nightmares, and other medications to address specific symptoms. Your trauma psychiatrist will work with you to find the right medication approach based on your specific symptoms and needs."
    },
    {
      question: "Do I need both a trauma psychiatrist and a therapist?",
      answer: "Many trauma survivors benefit from both psychiatric medication management and trauma-focused therapy (like EMDR or CPT). The psychiatrist addresses the biological aspects of trauma, while the therapist helps process traumatic memories. At Empathy Health Clinic, we offer both services and can coordinate your care."
    },
    {
      question: "How do I know if I have PTSD or trauma symptoms?",
      answer: "Common signs include intrusive memories or flashbacks, nightmares, avoiding reminders of the trauma, feeling on edge or easily startled, emotional numbness, and difficulty sleeping or concentrating. If you've experienced a traumatic event and have ongoing symptoms affecting your daily life, a trauma psychiatrist can provide a proper evaluation."
    },
    {
      question: "Do you accept insurance for trauma psychiatry?",
      answer: "Yes, we accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, and Humana. Our team will verify your mental health benefits before your appointment."
    },
  ],
  sidebar: {
    formHeading: "Get Trauma-Informed Care",
    formSubheading: "Same-week appointments. Compassionate, specialized care.",
    formType: "trauma_psychiatry",
    quickLinks: [
      { href: "/psychiatrist-near-me", label: "Psychiatrist Near Me" },
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/ptsd-psychiatrist-orlando", label: "PTSD Treatment" },
      { href: "/anxiety-psychiatrist-orlando", label: "Anxiety Psychiatrist" },
      { href: "/depression-psychiatrist-orlando", label: "Depression Psychiatrist" },
      { href: "/new-patients", label: "New Patients" },
      { href: "/telepsychiatry-orlando", label: "Telepsychiatry Orlando" },
      { href: "/emdr-therapy", label: "EMDR Therapy" },
      { href: "/psychiatric-evaluation-orlando", label: "Psychiatric Evaluation" },
      { href: "/medication-management-orlando", label: "Medication Management" },
    ],
  },
  analytics: {
    pageName: "Trauma Psychiatrist Orlando Page",
    conversionCategory: "trauma_psychiatrist_orlando",
  },
};

export const psychiatristNearUcfConfig: LandingPageConfig = {
  seo: {
    title: "Psychiatrist Near UCF | Orlando FL | Same-Week Apts",
    description: "Psychiatrist near UCF campus serving students & faculty. ADHD, anxiety, depression treatment. Same-week appointments, telehealth available. Call 386-848-8751.",
    keywords: ["psychiatrist near ucf", "ucf psychiatrist", "psychiatrist near university of central florida", "college psychiatrist orlando", "ucf mental health", "psychiatrist for college students orlando"],
    canonicalPath: "/psychiatrist-near-ucf",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "Psychiatrist Near UCF - Empathy Health Clinic",
    "description": "Board-certified psychiatrist serving UCF students, faculty, and the Orlando community. Expert treatment for ADHD, anxiety, depression, and more.",
    "url": "https://empathyhealthclinic.com/psychiatrist-near-ucf",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "medicalSpecialty": "Psychiatry"
  },
  hero: {
    title: "Psychiatrist Near UCF Campus",
    subtitle: "Convenient psychiatric care for UCF students, faculty, and the Orlando community. Expert treatment for ADHD, anxiety, depression, and other conditions common in college life. Same-week appointments with in-person and telehealth options. Most insurance accepted.",
    ctaPrimary: "Schedule Appointment",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Near UCF Campus", "Same-Week Appointments"],
  },
  location: {
    title: "Conveniently Near UCF",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth & in-person available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Psychiatric Care for UCF Students & Faculty",
    introduction: [
      "College life brings unique mental health challenges. At Empathy Health Clinic, we understand the pressures UCF students and faculty face—academic stress, exam anxiety, difficulty concentrating, sleep problems, and the transition to independent living. Our board-certified psychiatrists provide expert care tailored to the needs of the university community.",
      "Located conveniently near UCF in Winter Park, we offer same-week appointments so you don't have to wait weeks or months to get help. Whether you're struggling with ADHD that's affecting your grades, anxiety about exams, depression, or other mental health concerns, we're here to help you thrive academically and personally.",
      "We offer both in-person appointments at our Winter Park office and secure telehealth visits—perfect for busy students who need flexible scheduling between classes."
    ],
    conditionsHeading: "Common Conditions We Treat",
    conditions: [
      { name: "ADHD", description: "Focus issues affecting academics" },
      { name: "Anxiety Disorders", description: "Test anxiety, social anxiety, GAD" },
      { name: "Depression" },
      { name: "Academic Burnout" },
      { name: "Sleep Disorders", description: "Insomnia, irregular sleep" },
      { name: "Stress Management" },
      { name: "Adjustment Disorders" },
      { name: "Panic Attacks" },
      { name: "OCD" },
      { name: "Bipolar Disorder" },
    ],
    servicesHeading: "Our Services for UCF Students & Faculty",
    services: [
      {
        icon: Brain,
        title: "ADHD Evaluation & Treatment",
        description: "Comprehensive ADHD assessment and medication management to help you focus, improve academic performance, and manage daily responsibilities."
      },
      {
        icon: Shield,
        title: "Anxiety & Depression Treatment",
        description: "Evidence-based treatment for anxiety and depression that's common among college students dealing with academic pressure and life transitions."
      },
      {
        icon: Video,
        title: "Telehealth Psychiatry",
        description: "Convenient video appointments from your dorm, apartment, or between classes. Same quality care as in-person visits with added flexibility."
      },
    ],
    whyChooseHeading: "Why UCF Students Choose Us",
    whyChoosePoints: [
      {
        icon: Calendar,
        title: "Same-Week Appointments",
        description: "We understand that mental health can't wait. Unlike UCF counseling services with long waitlists, we typically offer same-week appointments for new patients."
      },
      {
        icon: Award,
        title: "Board-Certified Psychiatrists",
        description: "Our psychiatrists are board-certified with experience treating college students and young adults facing academic and life challenges."
      },
      {
        icon: Clock,
        title: "Flexible Scheduling",
        description: "Evening appointments and telehealth options work around your class schedule. No need to miss lectures for your mental health care."
      },
    ],
  },
  faqs: [
    {
      question: "Do you accept UCF student insurance?",
      answer: "We accept most major insurance plans that UCF students commonly have, including Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, and many others. Contact our office at 386-848-8751 to verify your specific plan. We can also provide documentation for FSA/HSA accounts."
    },
    {
      question: "How far is your office from UCF campus?",
      answer: "Our Winter Park office is approximately 15-20 minutes from UCF's main campus. We're located at 2281 Lee Rd Suite 102, easily accessible via University Blvd or SR-417. We also offer telehealth appointments for students who prefer video visits."
    },
    {
      question: "Can you prescribe ADHD medication for college students?",
      answer: "Yes. After a thorough evaluation to confirm an ADHD diagnosis, our psychiatrists can prescribe FDA-approved ADHD medications including stimulants and non-stimulant options. We follow best practices for ADHD treatment and monitor your progress regularly."
    },
    {
      question: "What's the difference between seeing you vs. UCF Counseling Services?",
      answer: "UCF Counseling Services offers valuable support but often has limited availability and may not prescribe medications. As a private psychiatric practice, we can provide same-week appointments, prescribe medications when appropriate, and offer ongoing psychiatric care throughout your time at UCF and beyond."
    },
    {
      question: "Do you offer telehealth appointments?",
      answer: "Yes! We offer secure, HIPAA-compliant video appointments that are perfect for busy students. You can meet with your psychiatrist from your dorm, apartment, or anywhere in Florida. Telehealth appointments are available for both initial evaluations and follow-up visits."
    },
  ],
  sidebar: {
    formHeading: "Schedule Your Appointment",
    formSubheading: "Same-week appointments available. Most insurance accepted.",
    formType: "ucf_psychiatrist",
    quickLinks: [
      { href: "/psychiatrist-near-me", label: "Psychiatrist Near Me" },
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/adhd-psychiatrist-orlando", label: "ADHD Psychiatrist" },
      { href: "/anxiety-psychiatrist-orlando", label: "Anxiety Psychiatrist" },
      { href: "/new-patients", label: "New Patients" },
      { href: "/telepsychiatry-orlando", label: "Telepsychiatry Orlando" },
      { href: "/depression-psychiatrist-orlando", label: "Depression Psychiatrist" },
      { href: "/psychiatric-evaluation-orlando", label: "Psychiatric Evaluation" },
      { href: "/medication-management-orlando", label: "Medication Management" },
    ],
  },
  analytics: {
    pageName: "Psychiatrist Near UCF Page",
    conversionCategory: "psychiatrist_near_ucf",
  },
};

// OCD Psychiatrist Orlando
export const ocdPsychiatristOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "OCD Psychiatrist Orlando FL | Expert Treatment 2025",
    description: "Expert OCD psychiatrist in Orlando, FL. Specialized treatment for obsessive-compulsive disorder including medication management and ERP therapy support. Same-week appointments. Call 386-848-8751.",
    keywords: ["ocd psychiatrist orlando", "ocd treatment orlando", "ocd therapy orlando", "obsessive compulsive disorder orlando", "ocd specialist orlando", "ocd medication orlando", "ocd doctor orlando", "ocd psychiatrist near me"],
    canonicalPath: "/ocd-psychiatrist-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "OCD Psychiatrist Orlando FL - Empathy Health Clinic",
    "description": "Board-certified psychiatrists specializing in OCD treatment in Orlando, FL. Expert medication management for obsessive-compulsive disorder.",
    "url": "https://empathyhealthclinic.com/ocd-psychiatrist-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "medicalSpecialty": "Psychiatry - OCD Specialist"
  },
  hero: {
    title: "OCD Psychiatrist in Orlando, FL",
    subtitle: "Board-certified psychiatrists specializing in obsessive-compulsive disorder treatment. Expert medication management, ERP therapy support, and comprehensive care for all types of OCD. Same-week appointments available with in-person and telehealth options.",
    ctaPrimary: "Schedule OCD Consultation",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["OCD Specialists", "Same-Week Appointments", "Telehealth Available"],
  },
  location: {
    title: "Orlando Metro Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth & in-person available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Expert OCD Treatment in Orlando",
    introduction: [
      "Obsessive-compulsive disorder (OCD) can be overwhelming, with intrusive thoughts and compulsive behaviors that disrupt daily life. At Empathy Health Clinic, our board-certified psychiatrists in Orlando specialize in OCD treatment, providing expert medication management and comprehensive psychiatric care for adults struggling with obsessions and compulsions.",
      "We understand that OCD is more than just being 'neat' or 'organized'—it's a serious mental health condition that causes significant distress. Our Orlando OCD psychiatrists work collaboratively with you to develop personalized treatment plans that combine psychiatric medication with evidence-based therapy approaches like Exposure and Response Prevention (ERP).",
      "Same-week appointments are typically available because we know that when OCD is controlling your life, you need help now—not weeks from now. We offer both in-person and telehealth appointments throughout Florida."
    ],
    conditionsHeading: "Types of OCD We Treat",
    conditions: [
      { name: "Contamination OCD", description: "Fear of germs, dirt, or illness" },
      { name: "Checking OCD", description: "Repeated checking of locks, stoves, etc." },
      { name: "Symmetry & Ordering OCD", description: "Need for things to be 'just right'" },
      { name: "Harm OCD", description: "Intrusive thoughts about harming self or others" },
      { name: "Pure O (Pure Obsessional)", description: "Primarily mental rituals" },
      { name: "Relationship OCD", description: "Doubts about romantic relationships" },
      { name: "Scrupulosity", description: "Religious or moral obsessions" },
      { name: "Hoarding Disorder" },
      { name: "Body-Focused OCD", description: "Somatic obsessions" },
      { name: "Just Right OCD", description: "Things must feel 'complete'" },
    ],
    servicesHeading: "Our OCD Treatment Services",
    services: [
      {
        icon: Brain,
        title: "Comprehensive OCD Evaluation",
        description: "Thorough psychiatric assessment to accurately diagnose OCD, identify obsession and compulsion patterns, and rule out other conditions. We use validated assessment tools to understand your specific OCD presentation."
      },
      {
        icon: Shield,
        title: "OCD Medication Management",
        description: "Expert prescribing and monitoring of FDA-approved OCD medications including SSRIs, clomipramine, and augmentation strategies. We optimize medication dosing for OCD, which often requires higher doses than depression treatment."
      },
      {
        icon: Heart,
        title: "ERP Therapy Coordination",
        description: "Collaborative care with ERP therapists to combine medication with the gold-standard therapy for OCD. Research shows the combination of medication and ERP often provides the best outcomes."
      },
      {
        icon: Video,
        title: "Telehealth OCD Treatment",
        description: "Convenient video appointments from anywhere in Florida. Our secure telehealth platform provides the same quality OCD psychiatric care as in-person visits."
      },
    ],
    whyChooseHeading: "Why Choose Our Orlando OCD Psychiatrists?",
    whyChoosePoints: [
      {
        icon: Award,
        title: "OCD Expertise",
        description: "Our board-certified psychiatrists have specialized training in OCD treatment, understanding the nuances of different OCD subtypes and the most effective medication strategies."
      },
      {
        icon: Calendar,
        title: "Same-Week Appointments",
        description: "Unlike many Orlando psychiatry practices with months-long wait times, we typically offer same-week appointments for new OCD patients."
      },
      {
        icon: Users,
        title: "Collaborative Care Approach",
        description: "We work closely with OCD therapists and ERP specialists to provide integrated treatment, ensuring your medication and therapy work together effectively."
      },
    ],
  },
  faqs: [
    {
      question: "What medications are used to treat OCD?",
      answer: "The first-line medications for OCD are SSRIs (selective serotonin reuptake inhibitors) such as fluoxetine (Prozac), sertraline (Zoloft), fluvoxamine (Luvox), paroxetine (Paxil), and escitalopram (Lexapro). Clomipramine (Anafranil), a tricyclic antidepressant, is also FDA-approved for OCD. OCD often requires higher doses than depression treatment, and it may take 8-12 weeks to see full benefits."
    },
    {
      question: "Do I need both medication and therapy for OCD?",
      answer: "Research shows that combining medication with Exposure and Response Prevention (ERP) therapy often provides the best outcomes for OCD. Medication can reduce the intensity of obsessions, making it easier to engage in ERP therapy. Our psychiatrists work collaboratively with OCD therapists to provide integrated treatment."
    },
    {
      question: "How long does OCD treatment take?",
      answer: "OCD treatment is typically long-term. Medication may take 8-12 weeks to reach full effectiveness, and many people continue medication for a year or longer to prevent relapse. ERP therapy usually involves 12-20 sessions. We'll work with you to develop a treatment timeline based on your specific situation."
    },
    {
      question: "Can OCD be cured?",
      answer: "While there's no 'cure' for OCD, it can be effectively managed with proper treatment. Many people experience significant reduction in symptoms—often 50-70% improvement—with medication and ERP therapy. The goal is to reduce OCD's impact on your daily life so you can live fully and freely."
    },
    {
      question: "What if my current OCD medication isn't working?",
      answer: "If your current medication isn't providing adequate relief, there are several options. We may increase the dose (OCD often requires higher doses), try a different SSRI, add an augmentation medication, or explore other treatment approaches. Our psychiatrists specialize in treatment-resistant OCD and can develop a new strategy."
    },
  ],
  sidebar: {
    formHeading: "Schedule OCD Consultation",
    formSubheading: "Same-week appointments available. Most insurance accepted.",
    formType: "ocd_psychiatrist",
    quickLinks: [
      { href: "/psychiatrist-near-me", label: "Psychiatrist Near Me" },
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/anxiety-psychiatrist-orlando", label: "Anxiety Psychiatrist" },
      { href: "/medication-management-orlando", label: "Medication Management" },
      { href: "/new-patients", label: "New Patients" },
      { href: "/telepsychiatry-orlando", label: "Telepsychiatry Orlando" },
      { href: "/psychiatric-evaluation-orlando", label: "Psychiatric Evaluation" },
      { href: "/depression-psychiatrist-orlando", label: "Depression Psychiatrist" },
    ],
  },
  analytics: {
    pageName: "OCD Psychiatrist Orlando Page",
    conversionCategory: "ocd_psychiatrist_orlando",
  },
};

export const schizophreniaPsychiatristOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Schizophrenia Psychiatrist Orlando | Treatment 2025",
    description: "Compassionate schizophrenia treatment in Orlando by board-certified psychiatrists. Antipsychotic medication management, family support. Call 386-848-8751.",
    keywords: ["schizophrenia psychiatrist orlando", "schizophrenia treatment orlando", "psychosis treatment orlando", "schizoaffective disorder orlando"],
    canonicalPath: "/schizophrenia-psychiatrist-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "Schizophrenia Psychiatrist Orlando - Empathy Health Clinic",
    "description": "Expert schizophrenia and psychosis treatment in Orlando, FL by board-certified psychiatrists.",
    "url": "https://empathyhealthclinic.com/schizophrenia-psychiatrist-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "medicalSpecialty": "Psychiatry"
  },
  hero: {
    title: "Schizophrenia Psychiatrist in Orlando, FL",
    subtitle: "Compassionate, evidence-based treatment for schizophrenia and psychotic disorders. Our board-certified psychiatrists specialize in antipsychotic medication management, early intervention, and family support. Same-week appointments available with in-person and telehealth options.",
    ctaPrimary: "Schedule Consultation",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Same-Week Appointments", "Telehealth Available"],
  },
  location: {
    title: "Orlando Metro Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth & in-person available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Expert Schizophrenia Treatment in Orlando",
    introduction: [
      "Living with schizophrenia or a psychotic disorder can be overwhelming for both patients and their families. At Empathy Health Clinic, our board-certified psychiatrists in Orlando provide compassionate, specialized care for individuals experiencing schizophrenia, schizoaffective disorder, and other psychotic conditions.",
      "We understand that seeking treatment takes courage. Our approach combines evidence-based antipsychotic medication management with comprehensive support to help you or your loved one achieve stability, manage symptoms, and improve quality of life.",
      "Early intervention is key in treating psychotic disorders. Whether you're experiencing your first episode or seeking better management of an ongoing condition, our Orlando psychiatrists are here to help with same-week appointments available."
    ],
    conditionsHeading: "Conditions We Treat",
    conditions: [
      { name: "Schizophrenia", description: "All types including paranoid, disorganized, catatonic" },
      { name: "Schizoaffective Disorder", description: "Bipolar and depressive types" },
      { name: "Psychosis NOS", description: "Psychotic symptoms not otherwise specified" },
      { name: "Brief Psychotic Disorder" },
      { name: "Delusional Disorder" },
      { name: "First Episode Psychosis" },
      { name: "Treatment-Resistant Schizophrenia" },
      { name: "Medication Side Effect Management" },
    ],
    servicesHeading: "Our Treatment Approach",
    services: [
      {
        icon: Brain,
        title: "Antipsychotic Medication Management",
        description: "Expert prescribing and monitoring of antipsychotic medications including second-generation options with careful attention to minimizing side effects."
      },
      {
        icon: Users,
        title: "Family Education & Support",
        description: "We involve family members in treatment planning and provide education about schizophrenia to build a supportive home environment."
      },
      {
        icon: Shield,
        title: "Early Intervention Programs",
        description: "Specialized care for first-episode psychosis to improve long-term outcomes through early, aggressive treatment."
      },
      {
        icon: Video,
        title: "Telehealth Appointments",
        description: "Convenient virtual visits for medication management and follow-up care, reducing barriers to consistent treatment."
      },
    ],
    whyChooseHeading: "Why Choose Empathy Health Clinic?",
    whyChoosePoints: [
      {
        icon: Award,
        title: "Specialized Expertise",
        description: "Our psychiatrists have extensive experience treating schizophrenia and psychotic disorders, including complex and treatment-resistant cases."
      },
      {
        icon: Calendar,
        title: "Same-Week Appointments",
        description: "We understand the urgency of psychiatric care. New patients can typically be seen within the same week of calling."
      },
      {
        icon: Heart,
        title: "Compassionate, Stigma-Free Care",
        description: "We treat every patient with dignity and respect, creating a safe environment where you can discuss your experiences openly."
      },
    ],
  },
  faqs: [
    {
      question: "What medications are used to treat schizophrenia?",
      answer: "Schizophrenia is primarily treated with antipsychotic medications. Second-generation (atypical) antipsychotics like risperidone, olanzapine, quetiapine, aripiprazole, and ziprasidone are commonly used as first-line treatments due to their effectiveness and generally more favorable side effect profiles. For treatment-resistant cases, clozapine may be considered. Our psychiatrists work with you to find the medication that provides the best symptom control with minimal side effects."
    },
    {
      question: "Can schizophrenia be cured?",
      answer: "While there is currently no cure for schizophrenia, it can be effectively managed with proper treatment. Many people with schizophrenia lead fulfilling lives with the right combination of medication, therapy, and support. Early intervention and consistent treatment significantly improve long-term outcomes. Our goal is to help you achieve stability and the best possible quality of life."
    },
    {
      question: "How long does schizophrenia treatment take?",
      answer: "Schizophrenia is typically a lifelong condition requiring ongoing treatment. Antipsychotic medication is usually needed long-term to prevent relapse. After an initial stabilization period (often 6-12 months), we focus on maintenance treatment and monitoring. Regular follow-up appointments help ensure medications remain effective and allow us to address any concerns promptly."
    },
    {
      question: "What should I expect at my first appointment?",
      answer: "Your first appointment will be a comprehensive psychiatric evaluation lasting 45-60 minutes. We'll discuss your symptoms, medical history, family history, and treatment goals. If appropriate, we may start medication at this visit. We encourage family members to attend if you're comfortable, as their input can be valuable in developing your treatment plan."
    },
    {
      question: "Do you offer telehealth for schizophrenia treatment?",
      answer: "Yes, we offer HIPAA-compliant telehealth appointments for medication management and follow-up care. While initial evaluations are often best done in person, telehealth can be an excellent option for ongoing treatment, especially for patients who have achieved stability. This helps ensure consistent care even when in-person visits are difficult."
    },
  ],
  sidebar: {
    formHeading: "Schedule Your Consultation",
    formSubheading: "Same-week appointments available. Most insurance accepted.",
    formType: "schizophrenia_psychiatrist",
    quickLinks: [
      { href: "/psychiatrist-near-me", label: "Psychiatrist Near Me" },
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/medication-management-orlando", label: "Medication Management" },
      { href: "/psychiatric-evaluation-orlando", label: "Psychiatric Evaluation" },
      { href: "/new-patients", label: "New Patients" },
      { href: "/telepsychiatry-orlando", label: "Telepsychiatry Orlando" },
    ],
  },
  analytics: {
    pageName: "Schizophrenia Psychiatrist Orlando Page",
    conversionCategory: "schizophrenia_psychiatrist_orlando",
  },
};

export const insomniaPsychiatristOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Insomnia Psychiatrist Orlando FL | Sleep Treatment",
    description: "Expert insomnia psychiatrist in Orlando treating chronic sleep disorders. Medication management, CBT-I referrals. Same-week appointments. Call 386-848-8751.",
    keywords: ["insomnia psychiatrist orlando", "sleep psychiatrist orlando", "sleep disorder treatment orlando", "sleep medication orlando", "chronic insomnia treatment orlando", "sleep anxiety psychiatrist orlando"],
    canonicalPath: "/insomnia-psychiatrist-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["Psychiatrist", "MedicalBusiness", "LocalBusiness"],
    "name": "Insomnia Psychiatrist Orlando FL - Empathy Health Clinic",
    "description": "Board-certified psychiatrist specializing in insomnia and sleep disorder treatment in Orlando, FL.",
    "url": "https://empathyhealthclinic.com/insomnia-psychiatrist-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "medicalSpecialty": "Psychiatry"
  },
  hero: {
    title: "Insomnia Psychiatrist in Orlando, FL",
    subtitle: "Board-certified psychiatrists specializing in chronic insomnia and sleep disorder treatment. We address underlying anxiety, depression, and mental health conditions affecting your sleep. Same-week appointments available with in-person and telehealth options.",
    ctaPrimary: "Schedule Consultation",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Sleep Disorder Specialists", "Same-Week Appointments"],
  },
  location: {
    title: "Orlando Metro Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth & in-person available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Expert Insomnia Treatment in Orlando",
    introduction: [
      "Chronic insomnia affects millions of Americans, impacting their daily functioning, mood, and overall health. At Empathy Health Clinic, our board-certified psychiatrists in Orlando specialize in treating sleep disorders by addressing both the symptoms and the underlying mental health conditions that often contribute to poor sleep.",
      "Unlike sleep clinics that focus solely on sleep mechanics, our psychiatric approach examines the connection between your sleep problems and conditions like anxiety, depression, PTSD, and bipolar disorder. Many patients find that treating these underlying conditions significantly improves their sleep quality.",
      "We offer comprehensive insomnia treatment including medication management and referrals for Cognitive Behavioral Therapy for Insomnia (CBT-I), the gold-standard non-medication treatment. Same-week appointments are typically available."
    ],
    conditionsHeading: "Sleep Conditions We Treat",
    conditions: [
      { name: "Chronic Insomnia", description: "Difficulty falling or staying asleep" },
      { name: "Sleep-Onset Insomnia" },
      { name: "Sleep Maintenance Insomnia" },
      { name: "Sleep Anxiety", description: "Fear or worry about sleeping" },
      { name: "Circadian Rhythm Disorders" },
      { name: "Insomnia with Depression" },
      { name: "Insomnia with Anxiety" },
      { name: "PTSD-Related Sleep Disturbance" },
    ],
    servicesHeading: "Our Insomnia Treatment Services",
    services: [
      {
        icon: Brain,
        title: "Comprehensive Sleep Evaluation",
        description: "Thorough psychiatric assessment of your sleep patterns, mental health history, and lifestyle factors contributing to insomnia."
      },
      {
        icon: Shield,
        title: "Medication Management",
        description: "Expert prescribing of sleep medications and treatment of underlying conditions like anxiety and depression that affect sleep."
      },
      {
        icon: Heart,
        title: "CBT-I Referrals",
        description: "Coordination with therapists specializing in Cognitive Behavioral Therapy for Insomnia, the most effective non-medication treatment."
      },
      {
        icon: Video,
        title: "Telehealth Appointments",
        description: "Convenient virtual appointments for ongoing medication management and follow-up care throughout Florida."
      },
    ],
    whyChooseHeading: "Why Choose Our Orlando Insomnia Psychiatrists?",
    whyChoosePoints: [
      {
        icon: Award,
        title: "Psychiatric Sleep Expertise",
        description: "Our psychiatrists understand the complex relationship between mental health and sleep, providing holistic treatment for lasting results."
      },
      {
        icon: Calendar,
        title: "Same-Week Appointments",
        description: "Don't spend another sleepless week. We typically offer same-week appointments for new patients struggling with insomnia."
      },
      {
        icon: Shield,
        title: "Beyond Sleep Aids",
        description: "We treat the root causes of insomnia, not just the symptoms. Addressing underlying anxiety or depression often resolves chronic sleep issues."
      },
    ],
  },
  faqs: [
    {
      question: "What causes chronic insomnia?",
      answer: "Chronic insomnia often has multiple contributing factors including anxiety, depression, stress, poor sleep habits, medical conditions, and certain medications. Our psychiatrists evaluate all potential causes to create an effective treatment plan that addresses the root of your sleep problems."
    },
    {
      question: "What medications are used to treat insomnia?",
      answer: "We may prescribe sleep medications like trazodone, hydroxyzine, or other non-habit-forming options. When underlying anxiety or depression is present, treating these conditions with SSRIs or other medications often significantly improves sleep. We prioritize non-addictive options and combine medications with behavioral strategies."
    },
    {
      question: "What is CBT-I and how does it help insomnia?",
      answer: "Cognitive Behavioral Therapy for Insomnia (CBT-I) is the gold-standard treatment for chronic insomnia. It helps you identify and change thoughts and behaviors that interfere with sleep. We can refer you to therapists specializing in CBT-I while managing any medication needs."
    },
    {
      question: "How long does insomnia treatment take?",
      answer: "Many patients see improvement within 2-4 weeks of starting treatment, though this varies based on the underlying causes. CBT-I typically takes 6-8 sessions. We monitor your progress closely and adjust treatment as needed to help you achieve restful sleep."
    },
    {
      question: "Do you accept insurance for insomnia treatment?",
      answer: "Yes, we accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, and Humana. Contact our office to verify your specific plan coverage before your appointment."
    },
  ],
  sidebar: {
    formHeading: "Get Help for Insomnia",
    formSubheading: "Same-week appointments available. Most insurance accepted.",
    formType: "insomnia_psychiatrist",
    quickLinks: [
      { href: "/psychiatrist-near-me", label: "Psychiatrist Near Me" },
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/anxiety-psychiatrist-orlando", label: "Anxiety Psychiatrist" },
      { href: "/medication-management-orlando", label: "Medication Management" },
      { href: "/depression-psychiatrist-orlando", label: "Depression Psychiatrist" },
      { href: "/new-patients", label: "New Patients" },
      { href: "/telepsychiatry-orlando", label: "Telepsychiatry Orlando" },
    ],
  },
  analytics: {
    pageName: "Insomnia Psychiatrist Orlando Page",
    conversionCategory: "insomnia_psychiatrist_orlando",
  },
};

// Telehealth Page Config
export const telehealthConfig: LandingPageConfig = {
  seo: {
    title: "Telehealth Psychiatry Orlando FL | Online Therapy",
    description: "Virtual psychiatry and therapy appointments in Florida. See a board-certified psychiatrist or licensed therapist from home. Same-week appointments. Call 386-848-8751.",
    keywords: ["telehealth psychiatry orlando", "telehealth therapy florida", "online mental health orlando", "virtual psychiatrist florida", "telehealth counseling orlando", "online therapy orlando fl", "virtual mental health services"],
    canonicalPath: "/telehealth",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness"],
    "name": "Telehealth Psychiatry & Therapy - Empathy Health Clinic",
    "description": "Virtual psychiatry and therapy appointments in Florida. Board-certified psychiatrists and licensed therapists available online.",
    "url": "https://empathyhealthclinic.com/telehealth",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "State",
      "name": "Florida"
    },
    "medicalSpecialty": ["Psychiatry", "Psychology"]
  },
  hero: {
    title: "Telehealth Psychiatry & Therapy in Florida",
    subtitle: "Access board-certified psychiatrists and licensed therapists from the comfort of your home. HIPAA-compliant video appointments for medication management, therapy, and mental health evaluations. Same-week appointments available throughout Florida.",
    ctaPrimary: "Schedule Telehealth Visit",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["100% Virtual Appointments", "HIPAA-Compliant Platform", "Same-Week Availability"],
  },
  location: {
    title: "Serving All of Florida",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\n100% telehealth available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Virtual Mental Health Care From Home",
    introduction: [
      "Telehealth has revolutionized mental health care, making it easier than ever to access board-certified psychiatrists and licensed therapists without leaving your home. At Empathy Health Clinic, we offer comprehensive virtual mental health services throughout Florida, providing the same quality care as in-person visits with added convenience and accessibility.",
      "Whether you're seeking psychiatric medication management, therapy for anxiety or depression, ADHD treatment, or couples counseling, our HIPAA-compliant telehealth platform connects you with experienced providers via secure video appointments. Research consistently shows that telehealth is equally effective as in-person care for most mental health conditions.",
      "Same-week appointments are typically available, and our virtual services eliminate commute time, parking hassles, and waiting rooms. You can attend from your home, office, or any private location with internet access."
    ],
    conditionsHeading: "Conditions We Treat via Telehealth",
    conditions: [
      { name: "Depression & Mood Disorders" },
      { name: "Anxiety & Panic Disorders" },
      { name: "ADHD", description: "Adult and adolescent" },
      { name: "Bipolar Disorder" },
      { name: "PTSD & Trauma" },
      { name: "OCD" },
      { name: "Insomnia & Sleep Disorders" },
      { name: "Relationship Issues" },
      { name: "Stress Management" },
      { name: "Grief & Loss" },
    ],
    servicesHeading: "Our Telehealth Services",
    services: [
      {
        icon: Brain,
        title: "Virtual Psychiatry",
        description: "Board-certified psychiatrists provide psychiatric evaluations, medication management, and ongoing treatment via secure video appointments."
      },
      {
        icon: Heart,
        title: "Online Therapy",
        description: "Licensed therapists offer CBT, DBT, EMDR, and other evidence-based therapies through convenient telehealth sessions."
      },
      {
        icon: Video,
        title: "HIPAA-Compliant Platform",
        description: "Our secure, user-friendly video platform protects your privacy. No downloads required - just click your appointment link."
      },
      {
        icon: Calendar,
        title: "Flexible Scheduling",
        description: "Same-week appointments with morning, afternoon, and evening availability to fit your schedule."
      },
    ],
    whyChooseHeading: "Why Choose Telehealth?",
    whyChoosePoints: [
      {
        icon: Clock,
        title: "No Commute Required",
        description: "Eliminate travel time and attend appointments from anywhere in Florida with a private internet connection."
      },
      {
        icon: Shield,
        title: "Same Quality Care",
        description: "Research shows telehealth is equally effective as in-person visits for most psychiatric and therapy services."
      },
      {
        icon: CheckCircle,
        title: "Insurance Accepted",
        description: "Most major insurance plans cover telehealth services. We accept Aetna, BCBS, Cigna, UnitedHealthcare, and more."
      },
    ],
    internalLinksCategory: "services",
  },
  faqs: [
    {
      question: "How does telehealth work?",
      answer: "After scheduling your appointment, you'll receive a secure link via email or text. At your appointment time, click the link to join a video call with your provider. You'll need a smartphone, tablet, or computer with a camera, microphone, and internet connection. Technical support is available if you have any difficulties."
    },
    {
      question: "Is telehealth as effective as in-person appointments?",
      answer: "Yes, research consistently shows that telehealth is equally effective as in-person care for most mental health conditions. Studies demonstrate similar outcomes for medication management, therapy, and psychiatric evaluations conducted via video."
    },
    {
      question: "What technology do I need for telehealth?",
      answer: "You need a device with a camera and microphone (smartphone, tablet, laptop, or desktop computer) and a stable internet connection. Our platform works in most web browsers without requiring software downloads."
    },
    {
      question: "Can you prescribe medications via telehealth?",
      answer: "Yes, our psychiatrists can prescribe all psychiatric medications including controlled substances like ADHD medications when medically appropriate. E-prescriptions are sent directly to your preferred pharmacy."
    },
    {
      question: "Does insurance cover telehealth appointments?",
      answer: "Most major insurance plans cover telehealth services, often at the same rate as in-person visits. We accept Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, Humana, and many other plans. Contact us to verify your coverage."
    },
    {
      question: "What if I have technical difficulties during my appointment?",
      answer: "Our support team can help troubleshoot connection issues. If video fails, your provider may continue via phone for that session. We recommend testing your connection before your first appointment."
    },
  ],
  sidebar: {
    formHeading: "Start Telehealth Today",
    formSubheading: "Same-week virtual appointments. Most insurance accepted.",
    formType: "telehealth",
    quickLinks: [
      { href: "/telepsychiatry-orlando", label: "Telepsychiatry Orlando" },
      { href: "/virtual-therapy", label: "Virtual Therapy" },
      { href: "/services", label: "All Services" },
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/therapist-orlando", label: "Therapist Orlando" },
      { href: "/new-patients", label: "New Patients" },
    ],
  },
  analytics: {
    pageName: "Telehealth Page",
    conversionCategory: "telehealth",
  },
};

// Adult ADHD Treatment Orlando Config
export const adultADHDTreatmentOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Adult ADHD Treatment Orlando FL | Expert Psychiatrist 2025",
    description: "Specialized adult ADHD treatment in Orlando. Board-certified psychiatrists for ADHD diagnosis, medication management, and comprehensive care. Call 386-848-8751.",
    keywords: ["adult adhd treatment orlando", "adult adhd psychiatrist orlando", "adhd medication management adults", "adult adhd diagnosis orlando", "adhd treatment for adults orlando fl", "adult add treatment orlando"],
    canonicalPath: "/adult-adhd-treatment-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness", "Psychiatrist"],
    "name": "Adult ADHD Treatment Orlando FL - Empathy Health Clinic",
    "description": "Specialized adult ADHD diagnosis and treatment in Orlando by board-certified psychiatrists.",
    "url": "https://empathyhealthclinic.com/adult-adhd-treatment-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "medicalSpecialty": "Psychiatry"
  },
  hero: {
    title: "Adult ADHD Treatment in Orlando, FL",
    subtitle: "Specialized ADHD diagnosis and treatment for adults by board-certified psychiatrists. Comprehensive evaluations, personalized medication management, and evidence-based strategies to help you thrive. Same-week appointments available.",
    ctaPrimary: "Schedule ADHD Evaluation",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Adult ADHD Specialists", "Same-Week Appointments", "Stimulant & Non-Stimulant Options"],
  },
  location: {
    title: "Orlando Metro Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth & in-person available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Expert Adult ADHD Care in Orlando",
    introduction: [
      "ADHD doesn't end in childhood - millions of adults live with undiagnosed or undertreated ADHD that affects their careers, relationships, and daily functioning. At Empathy Health Clinic, our board-certified psychiatrists specialize in diagnosing and treating adult ADHD with personalized, comprehensive care.",
      "Adult ADHD often presents differently than childhood ADHD. You may struggle with procrastination, disorganization, time management, or difficulty completing projects. Many adults with ADHD also experience anxiety, depression, or low self-esteem as secondary effects of living with untreated symptoms.",
      "Our Orlando psychiatrists conduct thorough evaluations to accurately diagnose ADHD and rule out other conditions. We offer both stimulant and non-stimulant medication options, tailored to your specific symptoms, lifestyle, and any co-occurring conditions. Same-week appointments are typically available."
    ],
    conditionsHeading: "Adult ADHD Symptoms We Treat",
    conditions: [
      { name: "Difficulty Concentrating", description: "Trouble focusing at work or on tasks" },
      { name: "Disorganization", description: "Chronic clutter and missed deadlines" },
      { name: "Time Management Issues" },
      { name: "Impulsivity" },
      { name: "Restlessness", description: "Internal restlessness, not hyperactivity" },
      { name: "Procrastination" },
      { name: "Forgetfulness" },
      { name: "Emotional Dysregulation" },
    ],
    servicesHeading: "Our Adult ADHD Services",
    services: [
      {
        icon: Brain,
        title: "Comprehensive ADHD Evaluation",
        description: "Thorough psychiatric assessment including symptom history, developmental background, and screening for co-occurring conditions like anxiety or depression."
      },
      {
        icon: Shield,
        title: "Medication Management",
        description: "Expert prescribing and monitoring of ADHD medications including stimulants (Adderall, Vyvanse, Concerta) and non-stimulants (Strattera, Wellbutrin)."
      },
      {
        icon: Users,
        title: "Combination Treatment",
        description: "Integration of medication with therapy referrals for ADHD coaching, CBT, and organizational skills training when appropriate."
      },
      {
        icon: Video,
        title: "Telehealth Appointments",
        description: "Convenient virtual visits for ADHD follow-ups and medication management from anywhere in Florida."
      },
    ],
    whyChooseHeading: "Why Choose Us for Adult ADHD?",
    whyChoosePoints: [
      {
        icon: Award,
        title: "Adult ADHD Expertise",
        description: "Our psychiatrists understand that adult ADHD is different from childhood ADHD and requires specialized evaluation and treatment approaches."
      },
      {
        icon: Calendar,
        title: "Same-Week Appointments",
        description: "Don't wait months for an ADHD evaluation. We typically offer same-week appointments for new patients."
      },
      {
        icon: Heart,
        title: "Personalized Treatment",
        description: "We tailor medication choices and dosing to your unique symptoms, lifestyle, work schedule, and any co-occurring conditions."
      },
    ],
    internalLinksCategory: "conditions",
  },
  faqs: [
    {
      question: "How is adult ADHD different from childhood ADHD?",
      answer: "Adult ADHD often presents as internal restlessness rather than hyperactivity, chronic disorganization, difficulty completing projects, time management struggles, and problems with follow-through. Many adults develop coping mechanisms that mask symptoms, making diagnosis more complex."
    },
    {
      question: "What does an adult ADHD evaluation involve?",
      answer: "Our comprehensive evaluation includes a detailed symptom history, review of childhood behaviors, assessment of current functioning in work and relationships, screening for co-occurring conditions, and clinical interview. We may use standardized rating scales to support diagnosis."
    },
    {
      question: "What medications are used for adult ADHD?",
      answer: "We prescribe both stimulant medications (Adderall, Vyvanse, Concerta, Ritalin) and non-stimulant options (Strattera, Wellbutrin, Qelbree). The best choice depends on your symptoms, medical history, and lifestyle. We start at low doses and adjust carefully."
    },
    {
      question: "Can ADHD be diagnosed without childhood symptoms?",
      answer: "ADHD symptoms must have been present before age 12 for diagnosis, though they may not have been recognized. Many adults realize their childhood struggles were actually ADHD symptoms. Our evaluation explores your developmental history thoroughly."
    },
    {
      question: "Do you treat ADHD with co-occurring anxiety or depression?",
      answer: "Yes, we commonly treat ADHD alongside anxiety, depression, or other conditions. In fact, addressing all conditions together often leads to better outcomes. We carefully select medications and approaches that address your complete symptom picture."
    },
    {
      question: "How quickly can ADHD medications work?",
      answer: "Stimulant medications typically show effects within the first dose or two. Non-stimulants like Strattera take 4-6 weeks to reach full effect. We schedule regular follow-ups to monitor your response and adjust treatment as needed."
    },
    {
      question: "Does insurance cover adult ADHD treatment?",
      answer: "Yes, most insurance plans cover psychiatric evaluations and medication management for ADHD. We accept Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, Humana, and many other plans. Contact us to verify your coverage."
    },
  ],
  sidebar: {
    formHeading: "Get ADHD Evaluation",
    formSubheading: "Same-week appointments. Most insurance accepted.",
    formType: "adult_adhd",
    quickLinks: [
      { href: "/adhd-psychiatrist-orlando", label: "ADHD Psychiatrist Orlando" },
      { href: "/adhd-testing-orlando", label: "ADHD Testing Orlando" },
      { href: "/what-we-treat/adhd", label: "What We Treat: ADHD" },
      { href: "/medication-management-orlando", label: "Medication Management" },
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/new-patients", label: "New Patients" },
    ],
  },
  analytics: {
    pageName: "Adult ADHD Treatment Orlando Page",
    conversionCategory: "adult_adhd_treatment",
  },
};

// Suboxone Treatment Orlando Config
export const suboxoneTreatmentOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Suboxone Treatment Orlando FL | MAT for Opioid Addiction",
    description: "Suboxone and medication-assisted treatment (MAT) for opioid addiction in Orlando. Compassionate, confidential care from board-certified providers. Call 386-848-8751.",
    keywords: ["suboxone treatment orlando", "suboxone doctor orlando", "MAT orlando", "medication assisted treatment orlando", "opioid addiction treatment orlando", "buprenorphine orlando", "suboxone clinic orlando fl"],
    canonicalPath: "/suboxone-treatment-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness"],
    "name": "Suboxone Treatment Orlando FL - Empathy Health Clinic",
    "description": "Medication-assisted treatment (MAT) for opioid addiction using Suboxone in Orlando, FL.",
    "url": "https://empathyhealthclinic.com/suboxone-treatment-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "medicalSpecialty": "Addiction Medicine"
  },
  hero: {
    title: "Suboxone Treatment in Orlando, FL",
    subtitle: "Compassionate, confidential medication-assisted treatment (MAT) for opioid addiction. Our board-certified providers help you break free from opioid dependence with Suboxone and comprehensive support. Same-week appointments available.",
    ctaPrimary: "Start Recovery Today",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Confidential Care", "Same-Week Start", "Insurance Accepted"],
  },
  location: {
    title: "Orlando Metro Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth & in-person available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Medication-Assisted Treatment for Opioid Recovery",
    introduction: [
      "Opioid addiction is a medical condition that requires medical treatment. At Empathy Health Clinic, we provide compassionate, evidence-based Suboxone treatment to help Orlando residents overcome opioid dependence and reclaim their lives. Our confidential MAT program combines medication with supportive care for lasting recovery.",
      "Suboxone (buprenorphine/naloxone) is an FDA-approved medication that reduces cravings, prevents withdrawal symptoms, and blocks the effects of other opioids. It's one of the most effective treatments for opioid use disorder, with research showing it significantly improves recovery rates and reduces overdose risk.",
      "Our board-certified providers are experienced in addiction medicine and understand the courage it takes to seek help. We offer a judgment-free environment with same-week appointments, flexible scheduling, and both in-person and telehealth options."
    ],
    conditionsHeading: "Conditions We Treat",
    conditions: [
      { name: "Opioid Use Disorder" },
      { name: "Prescription Opioid Dependence", description: "Oxycodone, hydrocodone, etc." },
      { name: "Heroin Addiction" },
      { name: "Fentanyl Dependence" },
      { name: "Opioid Withdrawal" },
      { name: "Chronic Pain with Opioid Dependence" },
    ],
    servicesHeading: "Our MAT Services",
    services: [
      {
        icon: Shield,
        title: "Suboxone Prescribing",
        description: "Board-certified providers prescribe and manage Suboxone (buprenorphine/naloxone) to reduce cravings and prevent withdrawal symptoms."
      },
      {
        icon: Brain,
        title: "Comprehensive Assessment",
        description: "Thorough evaluation of your opioid use history, medical conditions, and mental health to create a personalized treatment plan."
      },
      {
        icon: Heart,
        title: "Supportive Care",
        description: "Ongoing monitoring, counseling referrals, and support throughout your recovery journey. We treat you as a whole person, not just an addiction."
      },
      {
        icon: Video,
        title: "Telehealth MAT",
        description: "Convenient virtual appointments for ongoing Suboxone management, reducing barriers to consistent care."
      },
    ],
    whyChooseHeading: "Why Choose Our Suboxone Program?",
    whyChoosePoints: [
      {
        icon: Award,
        title: "Experienced Providers",
        description: "Our board-certified providers are specially trained in addiction medicine and have helped many Orlando residents achieve lasting recovery."
      },
      {
        icon: Shield,
        title: "Confidential & Judgment-Free",
        description: "Your privacy is protected. We provide compassionate care in a professional medical setting without stigma or judgment."
      },
      {
        icon: Calendar,
        title: "Same-Week Start",
        description: "When you're ready to start recovery, we're ready to help. Same-week appointments typically available for new patients."
      },
    ],
    internalLinksCategory: "services",
  },
  faqs: [
    {
      question: "What is Suboxone and how does it work?",
      answer: "Suboxone contains buprenorphine (a partial opioid agonist) and naloxone (an opioid blocker). Buprenorphine reduces cravings and withdrawal symptoms without producing the high of full opioids. Naloxone discourages misuse. Together, they help you focus on recovery while feeling stable."
    },
    {
      question: "How long will I need to take Suboxone?",
      answer: "Treatment duration varies by individual. Some patients take Suboxone for months, others for years. Research shows longer treatment is often associated with better outcomes. We'll work with you to determine the right timeline based on your progress and goals."
    },
    {
      question: "Is Suboxone just replacing one addiction with another?",
      answer: "No. Suboxone is a medication that treats the medical condition of opioid use disorder, similar to how insulin treats diabetes. When taken as prescribed, it stabilizes brain chemistry, doesn't produce a high, and allows you to function normally while working on recovery."
    },
    {
      question: "What happens at the first appointment?",
      answer: "Your first visit includes a comprehensive assessment of your opioid use history, medical conditions, and mental health. If appropriate, you may start Suboxone the same day. We'll discuss your treatment plan, answer questions, and schedule follow-up appointments."
    },
    {
      question: "Does insurance cover Suboxone treatment?",
      answer: "Most insurance plans cover medication-assisted treatment for opioid addiction, including Suboxone prescriptions and provider visits. We accept many major insurance plans. Contact us to verify your specific coverage."
    },
    {
      question: "Can I receive Suboxone treatment via telehealth?",
      answer: "Yes, we offer telehealth appointments for Suboxone management, making it easier to stay consistent with treatment. Initial evaluations may be conducted in-person or virtually depending on your situation."
    },
  ],
  sidebar: {
    formHeading: "Start Your Recovery",
    formSubheading: "Confidential help. Same-week appointments.",
    formType: "suboxone_treatment",
    quickLinks: [
      { href: "/services", label: "All Services" },
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/request-appointment", label: "Request Appointment" },
      { href: "/insurance", label: "Insurance Accepted" },
      { href: "/new-patients", label: "New Patients" },
    ],
  },
  analytics: {
    pageName: "Suboxone Treatment Orlando Page",
    conversionCategory: "suboxone_treatment",
  },
};

// Medicaid Psychiatrist Orlando Config
export const medicaidPsychiatristOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Medicaid Psychiatrist Orlando FL | Accepting New Patients",
    description: "Find a psychiatrist in Orlando that accepts Medicaid. Board-certified providers accepting Florida Medicaid plans including Sunshine Health, Molina, Simply Healthcare. Call 386-848-8751.",
    keywords: ["medicaid psychiatrist orlando", "psychiatrist that accepts medicaid orlando", "medicaid mental health orlando", "florida medicaid psychiatrist", "sunshine health psychiatrist orlando", "molina psychiatrist orlando", "medicaid psychiatric services orlando"],
    canonicalPath: "/medicaid-psychiatrist-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness", "Psychiatrist"],
    "name": "Medicaid Psychiatrist Orlando FL - Empathy Health Clinic",
    "description": "Board-certified psychiatrist in Orlando accepting Florida Medicaid plans.",
    "url": "https://empathyhealthclinic.com/medicaid-psychiatrist-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "medicalSpecialty": "Psychiatry",
    "paymentAccepted": ["Medicaid", "Florida Medicaid"]
  },
  hero: {
    title: "Medicaid Psychiatrist in Orlando, FL",
    subtitle: "Board-certified psychiatrists accepting Florida Medicaid plans. Quality mental health care shouldn't depend on your insurance. We accept Sunshine Health, Molina, Simply Healthcare, and other Medicaid plans. Same-week appointments available.",
    ctaPrimary: "Schedule Appointment",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Medicaid Accepted", "Same-Week Appointments", "Board-Certified Psychiatrists"],
  },
  location: {
    title: "Orlando Metro Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth & in-person available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Quality Psychiatric Care for Medicaid Patients",
    introduction: [
      "Finding a psychiatrist who accepts Medicaid in Orlando can be challenging, but quality mental health care should be accessible to everyone. At Empathy Health Clinic, we proudly accept Florida Medicaid plans and provide the same excellent care to all patients regardless of insurance status.",
      "Our board-certified psychiatrists treat depression, anxiety, ADHD, bipolar disorder, PTSD, and other mental health conditions for Medicaid patients. We believe financial barriers shouldn't prevent anyone from receiving the mental health treatment they need.",
      "Same-week appointments are typically available for new Medicaid patients. We offer both in-person visits at our Winter Park office (convenient to all of Orlando) and telehealth appointments throughout Florida."
    ],
    conditionsHeading: "Conditions We Treat",
    conditions: [
      { name: "Depression & Mood Disorders" },
      { name: "Anxiety & Panic Disorders" },
      { name: "ADHD", description: "Adult and adolescent" },
      { name: "Bipolar Disorder" },
      { name: "PTSD & Trauma" },
      { name: "OCD" },
      { name: "Schizophrenia" },
      { name: "Personality Disorders" },
    ],
    servicesHeading: "Services Covered by Medicaid",
    services: [
      {
        icon: Brain,
        title: "Psychiatric Evaluations",
        description: "Comprehensive mental health assessments to diagnose conditions and develop personalized treatment plans, covered by Medicaid."
      },
      {
        icon: Shield,
        title: "Medication Management",
        description: "Ongoing prescription and monitoring of psychiatric medications. Generic medications are typically fully covered by Medicaid."
      },
      {
        icon: Video,
        title: "Telehealth Appointments",
        description: "Virtual psychiatric visits covered by Medicaid, making it easier to access care without transportation barriers."
      },
      {
        icon: Heart,
        title: "Integrated Care",
        description: "Coordination with therapists and primary care providers to ensure comprehensive treatment."
      },
    ],
    whyChooseHeading: "Why Choose Empathy Health Clinic?",
    whyChoosePoints: [
      {
        icon: Award,
        title: "Board-Certified Psychiatrists",
        description: "Our psychiatrists are board-certified with extensive experience treating diverse patient populations. Medicaid patients receive the same quality care as all our patients."
      },
      {
        icon: Calendar,
        title: "Same-Week Appointments",
        description: "Unlike many clinics with months-long waits for Medicaid patients, we typically offer same-week appointments."
      },
      {
        icon: DollarSign,
        title: "No Balance Billing",
        description: "We accept Medicaid assignment, meaning you pay only your Medicaid copay with no surprise bills."
      },
    ],
    internalLinksCategory: "insurance",
  },
  faqs: [
    {
      question: "Which Medicaid plans do you accept?",
      answer: "We accept most Florida Medicaid managed care plans including Sunshine Health, Molina Healthcare, Simply Healthcare, Prestige Health Choice, Staywell, and others. Contact our office to verify we accept your specific Medicaid plan before scheduling."
    },
    {
      question: "Do I need a referral to see a psychiatrist with Medicaid?",
      answer: "Referral requirements depend on your specific Medicaid plan. Some plans require a referral from your primary care provider, while others allow direct access to mental health specialists. We recommend checking with your plan or calling our office for guidance."
    },
    {
      question: "What services does Medicaid cover for mental health?",
      answer: "Florida Medicaid covers psychiatric evaluations, medication management visits, and many prescription medications. Coverage for therapy varies by plan. Our staff can help verify your specific benefits before your appointment."
    },
    {
      question: "Are there any out-of-pocket costs with Medicaid?",
      answer: "Medicaid patients typically have no or very low copays for psychiatric services. We accept Medicaid assignment and do not balance bill, so you'll only pay your plan's required copay, if any."
    },
    {
      question: "Can I get ADHD treatment with Medicaid?",
      answer: "Yes, Medicaid covers ADHD evaluation and treatment. Some ADHD medications may require prior authorization. Our staff is experienced in navigating Medicaid requirements for ADHD medications."
    },
    {
      question: "Do you offer telehealth for Medicaid patients?",
      answer: "Yes, Florida Medicaid covers telehealth psychiatric appointments. This makes it easier to attend appointments if you have transportation challenges or live farther from our office."
    },
  ],
  sidebar: {
    formHeading: "Schedule Medicaid Visit",
    formSubheading: "Medicaid accepted. Same-week appointments.",
    formType: "medicaid_psychiatrist",
    quickLinks: [
      { href: "/insurance", label: "All Insurance Accepted" },
      { href: "/affordable-care", label: "Affordable Care Options" },
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/sunshine-health-therapy", label: "Sunshine Health" },
      { href: "/new-patients", label: "New Patients" },
      { href: "/telepsychiatry-orlando", label: "Telehealth Services" },
    ],
  },
  analytics: {
    pageName: "Medicaid Psychiatrist Orlando Page",
    conversionCategory: "medicaid_psychiatrist",
  },
};

// Psychiatrists Orlando (plural) - Google Ads Quality Score page
export const psychiatristsOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Psychiatrists in Orlando FL | Board-Certified 2025",
    description: "Find experienced psychiatrists in Orlando, FL. Board-certified psychiatric care for anxiety, depression, ADHD, bipolar disorder. Same-week appointments. BCBS, Cigna, Medicare accepted. Call (386) 848-8751.",
    keywords: ["psychiatrists orlando", "psychiatrists in orlando", "orlando psychiatrists", "psychiatrists orlando fl", "psychiatrist doctors orlando", "mental health psychiatrists orlando"],
    canonicalPath: "/psychiatrists-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness", "Psychiatrist"],
    "name": "Psychiatrists in Orlando FL - Empathy Health Clinic",
    "description": "Board-certified psychiatrists in Orlando providing comprehensive mental health treatment.",
    "url": "https://empathyhealthclinic.com/psychiatrists-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "medicalSpecialty": "Psychiatry",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "120"
    }
  },
  hero: {
    title: "Psychiatrists in Orlando",
    subtitle: "Board-certified psychiatrists in Orlando providing expert care for anxiety, depression, ADHD, bipolar disorder, and other mental health conditions. Same-week appointments available with in-person and telehealth options. Most major insurance accepted.",
    ctaPrimary: "Schedule Appointment",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Same-Week Appointments", "Board-Certified Psychiatrists", "BCBS, Cigna, Medicare"],
  },
  location: {
    title: "Orlando Metro Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth & in-person available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Expert Psychiatrists Serving Orlando",
    introduction: [
      "Finding experienced psychiatrists in Orlando is the first step toward better mental health. At Empathy Health Clinic, our team of board-certified psychiatrists provides comprehensive psychiatric care for adults throughout the Orlando metro area.",
      "Our Orlando psychiatrists specialize in diagnosing and treating a wide range of mental health conditions, from anxiety and depression to ADHD and bipolar disorder. We combine medication management with evidence-based approaches to deliver personalized care that produces real results.",
      "With same-week appointments, telehealth options, and acceptance of most major insurance plans, accessing quality psychiatric care in Orlando has never been easier."
    ],
    conditionsHeading: "Conditions Our Psychiatrists Treat",
    conditions: [
      { name: "Anxiety Disorders", description: "GAD, panic, social anxiety" },
      { name: "Depression", description: "Major depression, persistent depression" },
      { name: "ADHD", description: "Adult diagnosis & treatment" },
      { name: "Bipolar Disorder" },
      { name: "OCD" },
      { name: "PTSD & Trauma" },
      { name: "Insomnia & Sleep Disorders" },
      { name: "Medication Management" },
    ],
    servicesHeading: "Psychiatric Services in Orlando",
    services: [
      {
        icon: Brain,
        title: "Psychiatric Evaluations",
        description: "Comprehensive assessments by board-certified psychiatrists to accurately diagnose mental health conditions and develop effective treatment plans."
      },
      {
        icon: Shield,
        title: "Medication Management",
        description: "Expert medication prescribing and monitoring to optimize your treatment. Our psychiatrists carefully adjust dosages and medications based on your response."
      },
      {
        icon: Video,
        title: "Telehealth Psychiatry",
        description: "Convenient video appointments from home. Same quality psychiatric care as in-person visits with added flexibility for your schedule."
      },
    ],
    whyChooseHeading: "Why Choose Our Orlando Psychiatrists",
    whyChoosePoints: [
      {
        icon: Award,
        title: "Board-Certified Excellence",
        description: "All our psychiatrists are board-certified by the American Board of Psychiatry and Neurology, ensuring the highest standard of care."
      },
      {
        icon: Calendar,
        title: "Same-Week Availability",
        description: "We understand the urgency of mental health concerns. Most new patients can be seen within the same week of calling."
      },
      {
        icon: CreditCard,
        title: "Insurance Accepted",
        description: "We accept most major insurance plans including Blue Cross Blue Shield, Cigna, Aetna, UnitedHealthcare, and Medicare."
      },
    ],
  },
  faqs: [
    {
      question: "How do I find a good psychiatrist in Orlando?",
      answer: "Look for board-certified psychiatrists with positive patient reviews who specialize in your condition. At Empathy Health Clinic, our psychiatrists are board-certified and have extensive experience treating anxiety, depression, ADHD, and other conditions. Call 386-848-8751 to schedule."
    },
    {
      question: "Do your Orlando psychiatrists accept insurance?",
      answer: "Yes, we accept most major insurance plans including Blue Cross Blue Shield, Cigna, Aetna, UnitedHealthcare, Humana, and Medicare. We verify your benefits before your appointment."
    },
    {
      question: "How quickly can I see a psychiatrist in Orlando?",
      answer: "Most new patients can be scheduled within the same week. We prioritize getting you care quickly because we know waiting months isn't acceptable when you need help."
    },
    {
      question: "Do you offer telehealth psychiatry in Orlando?",
      answer: "Yes, we offer HIPAA-compliant video appointments for patients throughout Florida. Many patients find telehealth convenient for follow-up medication management visits."
    },
  ],
  sidebar: {
    formHeading: "Schedule with a Psychiatrist",
    formSubheading: "Same-week appointments available.",
    formType: "psychiatrists_orlando",
    quickLinks: [
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/psychiatric-services", label: "Psychiatric Services" },
      { href: "/telepsychiatry-orlando", label: "Telehealth Psychiatry" },
      { href: "/insurance", label: "Insurance Accepted" },
      { href: "/request-appointment", label: "Request Appointment" },
    ],
  },
  analytics: {
    pageName: "Psychiatrists Orlando Page",
    conversionCategory: "psychiatrists_orlando",
  },
};

// Psychology Orlando - Google Ads Quality Score page
export const psychologyOrlandoConfig: LandingPageConfig = {
  seo: {
    title: "Psychology in Orlando FL | Mental Health Services 2025",
    description: "Psychology services in Orlando, FL. Expert psychological care including therapy, psychiatric evaluations, and mental health treatment. Board-certified providers. Same-week appointments. Call (386) 848-8751.",
    keywords: ["psychology orlando", "psychology services orlando", "orlando psychology", "psychology orlando fl", "mental health psychology orlando", "psychological services orlando"],
    canonicalPath: "/psychology-orlando",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness"],
    "name": "Psychology Services Orlando FL - Empathy Health Clinic",
    "description": "Comprehensive psychology and mental health services in Orlando, FL.",
    "url": "https://empathyhealthclinic.com/psychology-orlando",
    "telephone": "+1-386-848-8751",
    "email": "providers@empathyhealthclinic.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2281 Lee Rd Suite 102",
      "addressLocality": "Winter Park",
      "addressRegion": "FL",
      "postalCode": "32810",
      "addressCountry": "US"
    },
    "medicalSpecialty": ["Psychiatry", "Psychology"]
  },
  hero: {
    title: "Psychology in Orlando",
    subtitle: "Comprehensive psychology and mental health services in Orlando. Our team provides expert care including psychiatric evaluations, therapy, and medication management. Evidence-based treatment for anxiety, depression, ADHD, and more. Same-week appointments available.",
    ctaPrimary: "Schedule Consultation",
    ctaSecondary: "Call 386-848-8751",
    heroImage: heroImage,
  },
  proofBar: {
    googleRating: 4.8,
    showVerifiedBadge: true,
    highlights: ["Same-Week Appointments", "Evidence-Based Treatment", "Most Insurance Accepted"],
  },
  location: {
    title: "Orlando Metro Location",
    address: "2281 Lee Rd Suite 102",
    city: "Winter Park",
    state: "FL",
    zip: "32810",
    phone: "3868488751",
    phoneDisplay: "386-848-8751",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nTelehealth & in-person available",
    mapUrl: "https://maps.google.com/?q=2281+Lee+Rd+Suite+102+Winter+Park+FL+32810",
  },
  content: {
    mainHeading: "Psychology Services in Orlando",
    introduction: [
      "Psychology in Orlando encompasses a range of mental health services designed to help you understand your thoughts, emotions, and behaviors. At Empathy Health Clinic, we provide comprehensive psychological care that addresses the root causes of mental health challenges.",
      "Our Orlando psychology services include psychiatric evaluations, individual therapy, cognitive behavioral therapy (CBT), and medication management when needed. We take a holistic approach to mental health, combining psychological insights with medical expertise.",
      "Whether you're struggling with anxiety, depression, trauma, or relationship issues, our experienced team can help you develop the tools and strategies needed for lasting improvement."
    ],
    conditionsHeading: "What We Treat",
    conditions: [
      { name: "Anxiety & Stress", description: "Worry, panic, social anxiety" },
      { name: "Depression", description: "Sadness, hopelessness, motivation" },
      { name: "ADHD", description: "Focus, organization, impulsivity" },
      { name: "Trauma & PTSD" },
      { name: "OCD" },
      { name: "Relationship Issues" },
      { name: "Life Transitions" },
      { name: "Self-Esteem & Identity" },
    ],
    servicesHeading: "Our Psychology Services",
    services: [
      {
        icon: Brain,
        title: "Psychological Assessment",
        description: "Comprehensive evaluations to understand your mental health needs and develop a personalized treatment plan that addresses your specific concerns."
      },
      {
        icon: MessageCircle,
        title: "Individual Therapy",
        description: "One-on-one sessions with experienced therapists using evidence-based approaches like CBT, DBT, and EMDR to help you process emotions and develop coping skills."
      },
      {
        icon: Shield,
        title: "Integrated Treatment",
        description: "When appropriate, we combine psychological therapy with psychiatric medication management for comprehensive care that addresses both mind and brain."
      },
    ],
    whyChooseHeading: "Why Choose Empathy Health Clinic",
    whyChoosePoints: [
      {
        icon: Award,
        title: "Expert Providers",
        description: "Our team includes board-certified psychiatrists and licensed therapists with extensive training in psychological assessment and treatment."
      },
      {
        icon: Heart,
        title: "Compassionate Care",
        description: "We believe in treating the whole person, not just symptoms. Our providers take time to understand your unique experiences and goals."
      },
      {
        icon: Calendar,
        title: "Convenient Access",
        description: "Same-week appointments, telehealth options, and acceptance of most major insurance plans make quality psychology services accessible."
      },
    ],
  },
  faqs: [
    {
      question: "What's the difference between psychology and psychiatry?",
      answer: "Psychology focuses on understanding thoughts, emotions, and behaviors through therapy and assessment. Psychiatry is a medical specialty focused on diagnosing and treating mental illness, often with medication. At Empathy Health Clinic, we offer both, providing integrated care."
    },
    {
      question: "Do you offer psychological testing in Orlando?",
      answer: "Yes, we provide comprehensive psychiatric evaluations and assessments. For specialized psychological testing like ADHD assessments, our board-certified psychiatrists conduct thorough evaluations to provide accurate diagnoses."
    },
    {
      question: "What types of therapy do you offer?",
      answer: "We offer individual therapy using evidence-based approaches including Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), and EMDR for trauma. Our therapists tailor treatment to your specific needs."
    },
    {
      question: "Is psychology covered by insurance?",
      answer: "Yes, most insurance plans cover mental health and psychology services. We accept Blue Cross Blue Shield, Cigna, Aetna, UnitedHealthcare, and Medicare. We verify your benefits before your first appointment."
    },
  ],
  sidebar: {
    formHeading: "Schedule Consultation",
    formSubheading: "Psychology services in Orlando.",
    formType: "psychology_orlando",
    quickLinks: [
      { href: "/psychiatric-services", label: "Psychiatric Services" },
      { href: "/therapy", label: "Therapy Services" },
      { href: "/psychiatrist-orlando", label: "Psychiatrist Orlando" },
      { href: "/anxiety-therapy-orlando", label: "Anxiety Therapy" },
      { href: "/depression-counseling-orlando", label: "Depression Counseling" },
    ],
  },
  analytics: {
    pageName: "Psychology Orlando Page",
    conversionCategory: "psychology_orlando",
  },
};
