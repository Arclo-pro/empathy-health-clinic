import {
  type User,
  type InsertUser,
  type SiteContent,
  type InsertSiteContent,
  type Treatment,
  type InsertTreatment,
  type TeamMember,
  type InsertTeamMember,
  type Testimonial,
  type InsertTestimonial,
  type InsuranceProvider,
  type InsertInsuranceProvider,
  type Therapy,
  type InsertTherapy,
  type Condition,
  type InsertCondition,
  type Lead,
  type InsertLead,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Site content methods
  getSiteContent(): Promise<SiteContent | undefined>;
  updateSiteContent(content: InsertSiteContent): Promise<SiteContent>;

  // Treatment methods
  getAllTreatments(): Promise<Treatment[]>;
  getTreatment(id: string): Promise<Treatment | undefined>;
  getTreatmentBySlug(slug: string): Promise<Treatment | undefined>;
  createTreatment(treatment: InsertTreatment): Promise<Treatment>;
  updateTreatment(id: string, treatment: Partial<InsertTreatment>): Promise<Treatment>;
  deleteTreatment(id: string): Promise<void>;

  // Team member methods
  getAllTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: string): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: string, member: Partial<InsertTeamMember>): Promise<TeamMember>;
  deleteTeamMember(id: string): Promise<void>;

  // Testimonial methods
  getAllTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: string): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial>;
  deleteTestimonial(id: string): Promise<void>;

  // Insurance provider methods
  getAllInsuranceProviders(): Promise<InsuranceProvider[]>;
  getInsuranceProvider(id: string): Promise<InsuranceProvider | undefined>;
  getInsuranceProviderBySlug(slug: string): Promise<InsuranceProvider | undefined>;
  createInsuranceProvider(provider: InsertInsuranceProvider): Promise<InsuranceProvider>;
  updateInsuranceProvider(id: string, provider: Partial<InsertInsuranceProvider>): Promise<InsuranceProvider>;
  deleteInsuranceProvider(id: string): Promise<void>;

  // Therapy methods
  getAllTherapies(): Promise<Therapy[]>;
  getTherapy(id: string): Promise<Therapy | undefined>;
  getTherapyBySlug(slug: string): Promise<Therapy | undefined>;
  createTherapy(therapy: InsertTherapy): Promise<Therapy>;
  updateTherapy(id: string, therapy: Partial<InsertTherapy>): Promise<Therapy>;
  deleteTherapy(id: string): Promise<void>;

  // Condition methods
  getAllConditions(): Promise<Condition[]>;
  getCondition(id: string): Promise<Condition | undefined>;
  getConditionBySlug(slug: string): Promise<Condition | undefined>;
  createCondition(condition: InsertCondition): Promise<Condition>;
  updateCondition(id: string, condition: Partial<InsertCondition>): Promise<Condition>;
  deleteCondition(id: string): Promise<void>;

  // Lead methods
  createLead(lead: InsertLead): Promise<Lead>;
  getAllLeads(): Promise<Lead[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private siteContent: SiteContent | undefined;
  private treatments: Map<string, Treatment>;
  private teamMembers: Map<string, TeamMember>;
  private testimonials: Map<string, Testimonial>;
  private insuranceProviders: Map<string, InsuranceProvider>;
  private therapies: Map<string, Therapy>;
  private conditions: Map<string, Condition>;
  private leads: Map<string, Lead>;

  constructor() {
    this.users = new Map();
    this.treatments = new Map();
    this.teamMembers = new Map();
    this.testimonials = new Map();
    this.insuranceProviders = new Map();
    this.therapies = new Map();
    this.conditions = new Map();
    this.leads = new Map();
    this.initializeDefaultContent();
  }

  private initializeDefaultContent() {
    // Initialize default site content
    this.siteContent = {
      id: randomUUID(),
      heroTitle: "Healing Begins with Empathy",
      heroSubtitle: "Psychiatry, Psychotherapy & Counseling Clinic in Winter Park, Orlando, Florida",
      heroImage: "/attached_assets/stock_images/professional_therapi_f037aa5d.jpg",
      reviewCount: 65,
      reviewRating: "EXCELLENT",
      footerPhone: "386-848-8751",
      footerEmail: "info@empathyhealthclinic.com",
      footerAddress: "Winter Park, Orlando, Florida",
      aboutText: "At Empathy Health Clinic, our mission is to serve the community of Orlando, FL, with a range of affordable mental health services. Whether you need to speak with a professional or seek more comprehensive treatment, we can guide you toward the best solution for your needs and well-being.",
    };

    // Initialize default treatments
    const defaultTreatments: InsertTreatment[] = [
      {
        title: "Bipolar Disorder Treatment",
        shortDescription: "Personalized plans to stabilize mood and manage bipolar disorder effectively.",
        icon: "Brain",
        slug: "bipolar-disorder-treatment",
        pageTitle: "Bipolar Disorder Treatment in Winter Park, FL | Empathy Health Clinic",
        heroTitle: "Expert Bipolar Disorder Treatment",
        heroDescription: "Comprehensive psychiatric care for bipolar disorder in Winter Park, FL. Our experienced team provides personalized medication management and therapy to help you achieve mood stability and improve your quality of life.",
        description: "At Empathy Health Clinic, we understand that living with bipolar disorder can be challenging. Our specialized treatment program combines evidence-based medication management with supportive therapy to help you manage mood swings, reduce symptoms, and maintain stability. We work closely with each patient to develop a personalized treatment plan that addresses your unique needs.",
        whoCanBenefit: "Our bipolar disorder treatment helps individuals experiencing extreme mood swings between manic highs and depressive lows. If you struggle with energy fluctuations, impulsive behavior during manic episodes, or periods of severe depression, our specialized care can help you find balance and stability.",
        whatToExpect: "Treatment begins with a comprehensive psychiatric evaluation to understand your specific symptoms and history. We'll develop a personalized medication plan, often including mood stabilizers, and provide ongoing monitoring. Many patients also benefit from psychotherapy to develop coping strategies and recognize early warning signs of mood episodes.",
        faqs: JSON.stringify([
          { question: "How long does bipolar treatment take?", answer: "Bipolar disorder is a lifelong condition, but with proper treatment, most people achieve significant stability within 3-6 months. Ongoing medication management and periodic therapy help maintain long-term wellness." },
          { question: "What medications are used?", answer: "Common medications include mood stabilizers like lithium or valproate, atypical antipsychotics, and sometimes antidepressants. Your psychiatrist will find the right combination for your specific needs." },
          { question: "Can therapy help bipolar disorder?", answer: "Yes! While medication is essential, therapy helps you recognize triggers, develop coping skills, maintain medication compliance, and improve relationships affected by the disorder." }
        ]),
        order: 1,
      },
      {
        title: "PTSD Treatment",
        shortDescription: "Expert care to help overcome trauma and regain control of your life.",
        icon: "Heart",
        slug: "ptsd-treatment",
        pageTitle: "PTSD Treatment in Winter Park, FL | Trauma-Informed Care",
        heroTitle: "Compassionate PTSD Treatment",
        heroDescription: "Specialized trauma-informed care for PTSD in Winter Park, FL. Our experienced clinicians provide evidence-based therapy and medication management to help you heal from traumatic experiences and reclaim your life.",
        description: "Post-Traumatic Stress Disorder (PTSD) can develop after experiencing or witnessing traumatic events. At Empathy Health Clinic, we offer trauma-informed care that recognizes the impact of trauma on your mental health and wellbeing. Our comprehensive approach combines specialized therapy techniques with medication when needed to help you process traumatic memories and reduce symptoms.",
        whoCanBenefit: "Our PTSD treatment is designed for individuals experiencing flashbacks, nightmares, severe anxiety, or intrusive thoughts related to past trauma. Whether your trauma stems from military service, accidents, assault, natural disasters, or other experiences, we provide compassionate support tailored to your needs.",
        whatToExpect: "Treatment typically involves trauma-focused therapy such as Cognitive Processing Therapy (CPT) or Eye Movement Desensitization and Reprocessing (EMDR). Some patients also benefit from medication to manage anxiety, depression, or sleep difficulties. We create a safe, supportive environment where you can process trauma at your own pace.",
        faqs: JSON.stringify([
          { question: "How effective is PTSD treatment?", answer: "Evidence-based treatments for PTSD are highly effective. Studies show that 60-80% of people experience significant improvement with trauma-focused therapy. Many people achieve full recovery or substantial symptom reduction." },
          { question: "Do I have to talk about my trauma?", answer: "While discussing trauma is part of effective treatment, we work at your pace in a safe, supportive environment. Our therapists are trained in trauma-informed care and will never push you beyond what you're ready to handle." },
          { question: "Can PTSD be cured?", answer: "Many people fully recover from PTSD with proper treatment. Others learn to manage symptoms effectively so they no longer interfere with daily life. Early treatment generally leads to better outcomes." }
        ]),
        order: 2,
      },
      {
        title: "Anger Management",
        shortDescription: "Guided techniques to manage anger and improve emotional regulation.",
        icon: "Users",
        slug: "anger-management-treatment",
        pageTitle: "Anger Management Treatment in Winter Park, FL | Empathy Health",
        heroTitle: "Effective Anger Management Treatment",
        heroDescription: "Professional anger management therapy in Winter Park, FL. Learn healthy coping strategies, improve relationships, and gain control over anger responses with our expert guidance.",
        description: "Anger is a natural emotion, but when it becomes overwhelming or leads to destructive behavior, professional help can make a significant difference. At Empathy Health Clinic, our anger management program teaches practical skills to identify triggers, manage intense emotions, and respond to frustration in healthier ways. We help you understand the root causes of anger and develop lasting coping strategies.",
        whoCanBenefit: "Our program helps individuals who struggle with frequent angry outbursts, difficulty controlling temper, relationship problems due to anger, or legal/work issues related to anger. If anger is affecting your personal relationships, career, or overall quality of life, our specialized treatment can help.",
        whatToExpect: "Treatment involves individual or group therapy sessions where you'll learn to recognize anger triggers, understand the physiological and emotional components of anger, and practice new coping skills. We use cognitive-behavioral techniques, stress management, and communication training to help you respond to challenges more effectively.",
        faqs: JSON.stringify([
          { question: "How long is anger management treatment?", answer: "Most people see improvement within 8-12 weeks of consistent therapy. The exact duration depends on individual needs, severity of anger issues, and your commitment to practicing new skills." },
          { question: "Is anger management just for people with violent tendencies?", answer: "No! Anger management helps anyone whose anger negatively impacts their life, relationships, or wellbeing. You don't need to be violent to benefit from learning better emotional regulation skills." },
          { question: "Will I ever feel angry again?", answer: "Yes, and that's healthy! The goal isn't to eliminate anger but to respond to it appropriately. You'll learn to express anger constructively without damaging relationships or your wellbeing." }
        ]),
        order: 3,
      },
    ];

    defaultTreatments.forEach((treatment) => {
      const id = randomUUID();
      this.treatments.set(id, { id, ...treatment });
    });

    // Initialize default team members
    const defaultTeamMembers: InsertTeamMember[] = [
      {
        name: "Alex Regan",
        credentials: "Psychiatric PA-C",
        image: "/attached_assets/stock_images/professional_healthc_117c18e3.jpg",
        order: 1,
      },
      {
        name: "Melissa DiPaolis",
        credentials: "MSN, APRN, FNP-BC",
        image: "/attached_assets/stock_images/professional_healthc_8344522b.jpg",
        order: 2,
      },
      {
        name: "Dr. Robert Glenn",
        credentials: "MD",
        image: "/attached_assets/stock_images/professional_healthc_7e52cf74.jpg",
        order: 3,
      },
      {
        name: "Keith Harryhill",
        credentials: "MS, LMHC",
        image: "/attached_assets/stock_images/professional_healthc_767b59b6.jpg",
        order: 4,
      },
      {
        name: "Marjorie Felix",
        credentials: "MSN, APRN, PMHNP-BC",
        image: "/attached_assets/stock_images/professional_healthc_a9a89fbd.jpg",
        order: 5,
      },
      {
        name: "Rachel Coalburn",
        credentials: "LCSW",
        image: "/attached_assets/stock_images/professional_healthc_1753b5e3.jpg",
        order: 6,
      },
      {
        name: "Monique Walen",
        credentials: "MSN, APRN, PMHNP-BC",
        image: "/attached_assets/image_1761603840896.png",
        order: 7,
      },
      {
        name: "Marsha D. Hassell",
        credentials: "MS, PLMHC",
        image: "/attached_assets/stock_images/professional_healthc_99dd0856.jpg",
        order: 8,
      },
      {
        name: "Christine Orr",
        credentials: "LCSW",
        image: "/attached_assets/stock_images/professional_healthc_ae2cb43f.jpg",
        order: 9,
      },
      {
        name: "Karla McLeod",
        credentials: "Licensed Mental Health Counselor",
        image: "/attached_assets/stock_images/professional_healthc_955227e9.jpg",
        order: 10,
      },
    ];

    defaultTeamMembers.forEach((member) => {
      const id = randomUUID();
      this.teamMembers.set(id, { id, ...member });
    });

    // Initialize default testimonials
    const defaultTestimonials: InsertTestimonial[] = [
      {
        name: "Chris B.",
        date: "October 10, 2025",
        text: "Marjorie spends more time and a more holistic approach to psychiatric care than any other practitioner I have worked with. She works with you to find the best personal treatment.",
        rating: 5,
        order: 1,
      },
      {
        name: "Cindy K.",
        date: "October 1, 2025",
        text: "Empathy Health Clinic is great! From Chantal in the office to the Medication Managers Tony & Monique, to the quality therapists, especially Christine Orr, I would highly recommend Empathy to anyone.",
        rating: 5,
        order: 2,
      },
      {
        name: "Louise",
        date: "September 3, 2025",
        text: "Excellent psych medical management. Depression and anxiety are so much more manageable, fewer episodes, finally sleeping through the night. Alex provides exceptional care.",
        rating: 5,
        order: 3,
      },
    ];

    defaultTestimonials.forEach((testimonial) => {
      const id = randomUUID();
      this.testimonials.set(id, { id, ...testimonial });
    });

    // Initialize default insurance providers
    const defaultInsurance: InsertInsuranceProvider[] = [
      { 
        name: "Blue Cross Blue Shield", 
        logo: "/attached_assets/stock_images/blue_cross_blue_shie_824de69a.jpg",
        slug: "blue-cross-blue-shield-blue-cross-blue-shield-coverage",
        pageTitle: "Find a Psychiatrist That Accepts Blue Cross Blue Shield",
        heroTitle: "Find a Psychiatrist That Accepts Blue Cross Blue Shield",
        heroDescription: "Expert psychiatrist that takes Blue Cross Blue Shield in Winter Park, FL. Our mental health clinic offers comprehensive psychiatric care, medication management, and anxiety and depression treatment for Blue Cross Blue Shield members in the Orlando area.",
        description: "At Empathy Health Clinic, we're proud to accept Blue Cross Blue Shield insurance for all our mental health services. Our experienced team of psychiatrists and therapists work directly with Blue Cross Blue Shield to ensure you receive the care you need with minimal out-of-pocket costs. We understand that navigating insurance can be complex, which is why our billing team handles all the details for you.",
        coverageDetails: "Blue Cross Blue Shield insurance provides comprehensive mental health coverage. Most patients pay their standard specialist copay per visit. We accept all Blue Cross Blue Shield plans including PPO, HMO, and POS options.",
        faqs: JSON.stringify([
          { question: "What Blue Cross Blue Shield plans do you accept?", answer: "We accept all Blue Cross Blue Shield plans including PPO, HMO, EPO, and POS options. Our team will verify your specific coverage before your first appointment." },
          { question: "What is my copay?", answer: "Copays vary by plan but typically range from $25-50 for behavioral health specialist visits. We'll verify your exact copay when we check your benefits." },
          { question: "Do I need a referral?", answer: "Referral requirements depend on your specific Blue Cross Blue Shield plan. HMO plans typically require a referral, while PPO plans usually do not. We can help determine if you need one." }
        ]),
        order: 1 
      },
      { 
        name: "Aetna", 
        logo: "/attached_assets/stock_images/aetna_insurance_logo_11478061.jpg",
        slug: "aetna-aetna-coverage",
        pageTitle: "Find a Psychiatrist That Accepts Aetna",
        heroTitle: "Find a Psychiatrist That Accepts Aetna",
        heroDescription: "Expert psychiatrist that takes Aetna in Winter Park, FL. Our mental health clinic offers comprehensive psychiatric care, medication management, and anxiety and depression treatment for Aetna members in the Orlando area.",
        description: "Empathy Health Clinic is in-network with Aetna insurance plans. Our psychiatrists and therapists provide expert mental health care covered by your Aetna benefits. We work closely with Aetna to streamline the authorization process and ensure you get the treatment you need.",
        coverageDetails: "Aetna insurance provides comprehensive mental health coverage. Most patients pay their standard specialist copay per visit. We accept all Aetna plans including PPO, HMO, and POS options.",
        faqs: JSON.stringify([
          { question: "Does Aetna cover mental health services?", answer: "Yes, Aetna provides comprehensive behavioral health coverage for psychiatric evaluations, medication management, and therapy services." },
          { question: "What is the copay for Aetna members?", answer: "Copays typically range from $25-50 per visit depending on your specific Aetna plan. We verify your benefits before your first appointment." },
          { question: "Do I need prior authorization?", answer: "Some Aetna plans require prior authorization for ongoing therapy. Our team handles all authorization requests on your behalf." }
        ]),
        order: 2 
      },
      { 
        name: "Optum", 
        logo: "/attached_assets/stock_images/optum_health_insuran_ff80d625.jpg",
        slug: "optum-optum-coverage",
        pageTitle: "Find a Psychiatrist That Accepts Optum",
        heroTitle: "Find a Psychiatrist That Accepts Optum",
        heroDescription: "Expert psychiatrist that takes Optum in Winter Park, FL. Our mental health clinic offers comprehensive psychiatric care, medication management, and anxiety and depression treatment for Optum members in the Orlando area.",
        description: "As an Optum provider, Empathy Health Clinic offers accessible mental health services to Optum members throughout the Orlando area. Our team is experienced in working with Optum's behavioral health network to provide seamless care coordination.",
        coverageDetails: "Optum insurance provides comprehensive mental health coverage. Most patients pay their standard specialist copay per visit. We accept all Optum plans including PPO, HMO, and POS options.",
        faqs: JSON.stringify([
          { question: "Are you in the Optum network?", answer: "Yes, Empathy Health Clinic is an in-network provider with Optum behavioral health." },
          { question: "What services are covered by Optum?", answer: "Optum covers psychiatric evaluations, medication management, individual therapy, and telehealth visits." },
          { question: "How do I schedule with my Optum insurance?", answer: "Simply call our office and provide your Optum insurance information. We'll verify your benefits and get you scheduled." }
        ]),
        order: 3 
      },
      { 
        name: "Cigna", 
        logo: "/attached_assets/stock_images/cigna_insurance_logo_eff54096.jpg",
        slug: "cigna-cigna-coverage",
        pageTitle: "Find a Psychiatrist That Accepts Cigna",
        heroTitle: "Find a Psychiatrist That Accepts Cigna",
        heroDescription: "Expert psychiatrist that takes Cigna in Winter Park, FL. Our mental health clinic offers comprehensive psychiatric care, medication management, and anxiety and depression treatment for Cigna members in the Orlando area.",
        description: "Empathy Health Clinic proudly accepts Cigna insurance for mental health services. Our experienced providers work within Cigna's network to deliver high-quality psychiatric care with excellent coverage and minimal paperwork for you.",
        coverageDetails: "Cigna insurance provides comprehensive mental health coverage. Most patients pay their standard specialist copay per visit. We accept all Cigna plans including PPO, HMO, and POS options.",
        faqs: JSON.stringify([
          { question: "What Cigna plans do you accept?", answer: "We accept all Cigna plans including Open Access Plus, HMO, PPO, and POS plans." },
          { question: "Does Cigna require a referral for psychiatry?", answer: "PPO and Open Access plans typically don't require a referral. HMO plans may require one from your primary care doctor." },
          { question: "What's my cost with Cigna insurance?", answer: "Most Cigna members pay a specialist copay of $25-50 per visit. We verify your exact cost during benefits verification." }
        ]),
        order: 4 
      },
      { 
        name: "AdventHealth", 
        logo: "/attached_assets/stock_images/adventhealth_insuran_3d39d3e5.jpg",
        slug: "adventhealth-adventhealth-coverage",
        pageTitle: "Find a Psychiatrist That Accepts AdventHealth",
        heroTitle: "Find a Psychiatrist That Accepts AdventHealth",
        heroDescription: "Expert psychiatrist that takes AdventHealth in Winter Park, FL. Our mental health clinic offers comprehensive psychiatric care, medication management, and anxiety and depression treatment for AdventHealth members in the Orlando area.",
        description: "Empathy Health Clinic partners with AdventHealth to provide whole-person mental health care. We share AdventHealth's commitment to treating the whole person - mind, body, and spirit - delivering compassionate psychiatric services to AdventHealth plan members.",
        coverageDetails: "AdventHealth insurance reflects their whole-person care philosophy, integrating physical, mental, and spiritual wellness. Their behavioral health coverage emphasizes comprehensive, compassionate psychiatric care. AdventHealth plan members typically pay $25-50 for behavioral health specialist visits.",
        faqs: JSON.stringify([
          { question: "Are you in-network with AdventHealth plans?", answer: "Yes, we are in-network with AdventHealth insurance plans and share their commitment to whole-person care." },
          { question: "What services are covered?", answer: "AdventHealth covers psychiatric evaluations, medication management, therapy sessions, and crisis intervention services." },
          { question: "How does AdventHealth's mental health coverage work?", answer: "AdventHealth provides comprehensive behavioral health benefits with copays typically ranging from $25-50 per specialist visit." }
        ]),
        order: 5 
      },
      { 
        name: "UMR", 
        logo: "/attached_assets/stock_images/umr_unitedhealthcare_0443c629.jpg",
        slug: "umr-umr-coverage",
        pageTitle: "Find a Psychiatrist That Accepts UMR",
        heroTitle: "Find a Psychiatrist That Accepts UMR",
        heroDescription: "Expert psychiatrist that takes UMR in Winter Park, FL. Our mental health clinic offers comprehensive psychiatric care, medication management, and anxiety and depression treatment for UMR members in the Orlando area.",
        description: "As a UMR network provider, Empathy Health Clinic offers comprehensive mental health services to UMR members. We understand UMR's focus on value-based care and work to provide high-quality psychiatric treatment efficiently.",
        coverageDetails: "UMR insurance provides comprehensive mental health coverage. Most patients pay their standard specialist copay per visit. We accept all UMR plans including PPO, HMO, and POS options.",
        faqs: JSON.stringify([
          { question: "Do you accept UMR insurance?", answer: "Yes, Empathy Health Clinic is a UMR network provider for mental health services." },
          { question: "What's the copay with UMR?", answer: "UMR copays vary by employer plan but typically range from $25-50 for behavioral health specialist visits." },
          { question: "Does UMR cover telehealth appointments?", answer: "Yes, UMR covers telehealth mental health appointments at the same copay rate as in-person visits." }
        ]),
        order: 6 
      },
      { 
        name: "UnitedHealthcare", 
        logo: "/attached_assets/stock_images/unitedhealthcare_ins_b1c0510b.jpg",
        slug: "unitedhealthcare-unitedhealthcare-coverage",
        pageTitle: "Find a Psychiatrist That Accepts UnitedHealthcare",
        heroTitle: "Find a Psychiatrist That Accepts UnitedHealthcare",
        heroDescription: "Expert psychiatrist that takes UnitedHealthcare in Winter Park, FL. Our mental health clinic offers comprehensive psychiatric care, medication management, and anxiety and depression treatment for UnitedHealthcare members in the Orlando area.",
        description: "Empathy Health Clinic is proud to serve UnitedHealthcare members with expert psychiatric care. As an in-network UnitedHealthcare provider, we make it easy to access quality mental health treatment with your existing benefits.",
        coverageDetails: "UnitedHealthcare insurance provides comprehensive mental health coverage. Most patients pay their standard specialist copay per visit. We accept all UnitedHealthcare plans including PPO, HMO, and POS options.",
        faqs: JSON.stringify([
          { question: "Are you in-network with UnitedHealthcare?", answer: "Yes, we are in-network with UnitedHealthcare and accept all UHC plans including Choice Plus, Options PPO, and HMO plans." },
          { question: "What's my copay with UnitedHealthcare?", answer: "UnitedHealthcare copays typically range from $25-50 for behavioral health specialist visits. We'll verify your exact copay before your appointment." },
          { question: "Does UnitedHealthcare cover medication management?", answer: "Yes, UnitedHealthcare covers psychiatric medication management services with the same copay as other mental health visits." }
        ]),
        order: 7 
      },
      { 
        name: "Oscar Health", 
        logo: "/attached_assets/generated_images/Oscar_Health_logo_fabb7b6b.png",
        slug: "oscar-health-oscar-health-coverage",
        pageTitle: "Find a Psychiatrist That Accepts Oscar Health",
        heroTitle: "Find a Psychiatrist That Accepts Oscar Health",
        heroDescription: "Expert psychiatrist that takes Oscar Health in Winter Park, FL. Our mental health clinic offers comprehensive psychiatric care, medication management, and anxiety and depression treatment for Oscar Health members in the Orlando area.",
        description: "Empathy Health Clinic is proud to accept Oscar Health insurance for all our mental health services. Our experienced team works with Oscar Health to provide accessible, high-quality psychiatric care with transparent pricing and seamless coverage.",
        coverageDetails: "Oscar Health insurance provides comprehensive mental health coverage. Most patients pay their standard specialist copay per visit. We accept all Oscar Health plans.",
        faqs: JSON.stringify([
          { question: "Do you accept Oscar Health insurance?", answer: "Yes, we are in-network with Oscar Health and accept all their plans." },
          { question: "What is my copay with Oscar Health?", answer: "Copays typically range from $25-50 per visit depending on your specific Oscar Health plan. We verify your benefits before your first appointment." },
          { question: "Does Oscar Health cover telehealth?", answer: "Yes, Oscar Health covers telehealth mental health appointments at the same rate as in-person visits." }
        ]),
        order: 8 
      },
      { 
        name: "First Health", 
        logo: "/attached_assets/generated_images/First_Health_logo_b3859bf9.png",
        slug: "first-health-first-health-coverage",
        pageTitle: "Find a Psychiatrist That Accepts First Health",
        heroTitle: "Find a Psychiatrist That Accepts First Health",
        heroDescription: "Expert psychiatrist that takes First Health in Winter Park, FL. Our mental health clinic offers comprehensive psychiatric care, medication management, and anxiety and depression treatment for First Health members in the Orlando area.",
        description: "As a First Health network provider, Empathy Health Clinic offers comprehensive mental health services to First Health members. We understand the importance of accessible mental health care and work to provide excellent psychiatric treatment.",
        coverageDetails: "First Health insurance provides comprehensive mental health coverage. Most patients pay their standard specialist copay per visit. We accept all First Health plans.",
        faqs: JSON.stringify([
          { question: "Are you in the First Health network?", answer: "Yes, Empathy Health Clinic is a First Health network provider for mental health services." },
          { question: "What's the copay with First Health?", answer: "First Health copays vary by employer plan but typically range from $25-50 for behavioral health specialist visits." },
          { question: "What services are covered?", answer: "First Health covers psychiatric evaluations, medication management, therapy sessions, and telehealth appointments." }
        ]),
        order: 9 
      },
      { 
        name: "Medicare", 
        logo: "/attached_assets/generated_images/Medicare_logo_637d5df1.png",
        slug: "medicare-medicare-coverage",
        pageTitle: "Find a Psychiatrist That Accepts Medicare",
        heroTitle: "Find a Psychiatrist That Accepts Medicare",
        heroDescription: "Expert psychiatrist that takes Medicare in Winter Park, FL. Our mental health clinic offers comprehensive psychiatric care, medication management, and anxiety and depression treatment for Medicare beneficiaries in the Orlando area.",
        description: "Empathy Health Clinic is proud to serve Medicare beneficiaries with expert psychiatric care. We accept Medicare and work to ensure you receive the mental health treatment you need with your Medicare benefits.",
        coverageDetails: "Medicare Part B covers outpatient mental health services including psychiatric evaluations, medication management, and therapy. After you meet your deductible, you typically pay 20% of the Medicare-approved amount.",
        faqs: JSON.stringify([
          { question: "Do you accept Medicare?", answer: "Yes, we accept Medicare and are experienced in working with Medicare beneficiaries for mental health services." },
          { question: "What does Medicare cover for mental health?", answer: "Medicare Part B covers psychiatric evaluations, medication management, individual therapy, and telehealth appointments for mental health." },
          { question: "What is my cost with Medicare?", answer: "After meeting your Part B deductible, you typically pay 20% of the Medicare-approved amount for outpatient mental health services." }
        ]),
        order: 10 
      },
      { 
        name: "Curative Health", 
        logo: "/attached_assets/generated_images/Curative_Health_logo_f2a91a7b.png",
        slug: "curative-health-curative-health-coverage",
        pageTitle: "Find a Psychiatrist That Accepts Curative Health",
        heroTitle: "Find a Psychiatrist That Accepts Curative Health",
        heroDescription: "Expert psychiatrist that takes Curative Health in Winter Park, FL. Our mental health clinic offers comprehensive psychiatric care, medication management, and anxiety and depression treatment for Curative Health members in the Orlando area.",
        description: "Empathy Health Clinic partners with Curative Health to provide accessible mental health services. We're committed to delivering high-quality psychiatric care to Curative Health members throughout the Orlando area.",
        coverageDetails: "Curative Health insurance provides comprehensive mental health coverage. Most patients pay their standard specialist copay per visit. We accept all Curative Health plans.",
        faqs: JSON.stringify([
          { question: "Do you accept Curative Health insurance?", answer: "Yes, we are in-network with Curative Health and accept all their plans." },
          { question: "What services are covered?", answer: "Curative Health covers psychiatric evaluations, medication management, individual therapy, and telehealth visits." },
          { question: "What is my copay?", answer: "Copays typically range from $25-50 per visit depending on your specific Curative Health plan." }
        ]),
        order: 11 
      },
      { 
        name: "More Providers", 
        logo: "/attached_assets/stock_images/medical_health_insur_80f2befe.jpg",
        slug: "more-providers-more-providers-coverage",
        pageTitle: "Find a Psychiatrist That Accepts Your Insurance",
        heroTitle: "Find a Psychiatrist That Accepts Your Insurance",
        heroDescription: "Expert psychiatrist in Winter Park, FL accepting most insurance plans. Our mental health clinic offers comprehensive psychiatric care, medication management, and anxiety and depression treatment in the Orlando area.",
        description: "In addition to our major insurance partnerships, Empathy Health Clinic works with many other insurance providers to make mental health care accessible. Contact us to verify coverage for your specific plan.",
        coverageDetails: "We accept most major insurance plans. Contact us to verify your specific coverage. Most patients pay their standard specialist copay per visit.",
        faqs: JSON.stringify([
          { question: "What other insurance do you accept?", answer: "We accept many additional plans including Humana, Tricare, Florida Blue, and others. Contact us to verify your specific plan." },
          { question: "What if my insurance isn't listed?", answer: "We're constantly adding new insurance partnerships. Call us to check if we accept your plan or discuss self-pay options." },
          { question: "Do you offer self-pay rates?", answer: "Yes, we offer competitive self-pay rates for patients without insurance or those who prefer not to use insurance." }
        ]),
        order: 12 
      },
    ];

    defaultInsurance.forEach((provider) => {
      const id = randomUUID();
      this.insuranceProviders.set(id, { id, ...provider });
    });

    // Initialize default therapies
    const defaultTherapies: InsertTherapy[] = [
      {
        title: "Cognitive Behavioral Therapy (CBT)",
        shortDescription: "Evidence-based therapy to change negative thought patterns and improve mental health.",
        icon: "Brain",
        slug: "cognitive-behavioral-therapy",
        pageTitle: "Cognitive Behavioral Therapy (CBT) in Winter Park, FL | Empathy Health",
        heroTitle: "Cognitive Behavioral Therapy (CBT)",
        heroDescription: "Transform your mental health with evidence-based cognitive behavioral therapy in Winter Park, FL. Our experienced therapists help you identify and change negative thought patterns, develop healthier coping strategies, and achieve lasting improvement in your wellbeing.",
        description: "Cognitive Behavioral Therapy (CBT) is one of the most extensively researched and effective forms of psychotherapy. At Empathy Health Clinic, our CBT specialists work with you to identify negative thought patterns that contribute to emotional distress and problematic behaviors. Through structured sessions, you'll learn practical skills to challenge and reframe these thoughts, leading to healthier emotional responses and behaviors.",
        whoCanBenefit: "CBT is highly effective for depression, anxiety disorders, PTSD, OCD, panic disorder, phobias, eating disorders, and substance abuse. If you struggle with negative thinking patterns, self-defeating behaviors, or difficulty managing stress and emotions, CBT can provide the tools and strategies you need for lasting change.",
        whatToExpect: "CBT sessions are typically structured and goal-oriented. You'll work collaboratively with your therapist to identify specific problems, set measurable goals, and develop practical strategies. Expect homework assignments between sessions to practice new skills. Most people see significant improvement within 12-20 sessions, though duration varies based on individual needs.",
        faqs: JSON.stringify([
          { question: "How is CBT different from regular talk therapy?", answer: "CBT is more structured and focused on present-day problems rather than extensive exploration of the past. It's goal-oriented and teaches specific skills you can use immediately to change thoughts and behaviors." },
          { question: "Will I have homework?", answer: "Yes, practicing skills between sessions is crucial to CBT's effectiveness. Homework might include thought records, behavioral experiments, or relaxation exercises. Your therapist will work with you to ensure assignments are manageable." },
          { question: "How long does CBT take?", answer: "Most people experience significant improvement within 12-20 sessions. Some conditions may require longer treatment, while others improve more quickly. Your therapist will regularly assess progress with you." }
        ]),
        order: 1,
      },
      {
        title: "Dialectical Behavior Therapy (DBT)",
        shortDescription: "Comprehensive therapy combining mindfulness, distress tolerance, and emotion regulation skills.",
        icon: "Heart",
        slug: "dialectical-behavior-therapy",
        pageTitle: "Dialectical Behavior Therapy (DBT) in Winter Park, FL | Empathy Health",
        heroTitle: "Dialectical Behavior Therapy (DBT)",
        heroDescription: "Master emotional regulation and interpersonal effectiveness with dialectical behavior therapy in Winter Park, FL. Our DBT program combines individual therapy, skills training, and coaching to help you build a life worth living.",
        description: "Dialectical Behavior Therapy (DBT) was originally developed for individuals with borderline personality disorder but has proven highly effective for various conditions involving emotional dysregulation. At Empathy Health Clinic, our comprehensive DBT program teaches four key skill modules: mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness. These skills help you manage intense emotions, reduce self-destructive behaviors, and improve relationships.",
        whoCanBenefit: "DBT is especially effective for borderline personality disorder, chronic suicidal ideation, self-harm behaviors, emotional dysregulation, intense relationship conflicts, and co-occurring disorders. If you experience intense emotions that feel overwhelming, engage in impulsive behaviors, or struggle with unstable relationships, DBT can provide life-changing skills.",
        whatToExpect: "Comprehensive DBT includes weekly individual therapy, a skills training group, phone coaching for crisis situations, and therapist consultation meetings. Skills training covers mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness. Treatment typically lasts 6-12 months, with ongoing maintenance as needed. You'll practice skills between sessions and track your progress.",
        faqs: JSON.stringify([
          { question: "What makes DBT different from CBT?", answer: "While DBT is based on CBT principles, it places greater emphasis on acceptance and mindfulness alongside change strategies. DBT is more comprehensive, including group skills training and phone coaching, making it especially effective for severe emotional dysregulation." },
          { question: "Do I have to attend group sessions?", answer: "Skills training groups are a core component of comprehensive DBT. The group provides a supportive environment to learn and practice skills with others facing similar challenges. Individual therapy alone may be offered if comprehensive DBT isn't available." },
          { question: "How long does DBT treatment last?", answer: "Standard DBT is a year-long commitment, though some people benefit from longer treatment. The structured timeline allows time to learn all four skill modules and apply them to real-life situations with therapist support." }
        ]),
        order: 2,
      },
      {
        title: "Psychodynamic Therapy",
        shortDescription: "Insight-oriented therapy exploring unconscious patterns affecting current relationships and behaviors.",
        icon: "Users",
        slug: "psychodynamic-therapy",
        pageTitle: "Psychodynamic Therapy in Winter Park, FL | Empathy Health Clinic",
        heroTitle: "Psychodynamic Therapy",
        heroDescription: "Gain deep self-understanding through psychodynamic therapy in Winter Park, FL. Our therapists help you uncover unconscious patterns from your past that influence your current relationships, emotions, and behaviors, leading to lasting personal growth.",
        description: "Psychodynamic therapy is an insight-oriented approach that explores how unconscious patterns from your past affect your present life. At Empathy Health Clinic, our psychodynamic therapists create a safe space for you to explore your inner world, understand the roots of your difficulties, and develop greater self-awareness. This deeper understanding leads to meaningful changes in how you relate to yourself and others.",
        whoCanBenefit: "Psychodynamic therapy is effective for depression, anxiety, relationship difficulties, chronic feelings of emptiness, repetitive patterns in relationships, low self-esteem, and identity issues. If you find yourself repeating the same patterns in relationships, struggle with understanding your emotions, or want deeper self-understanding beyond symptom relief, psychodynamic therapy can be transformative.",
        whatToExpect: "Psychodynamic therapy sessions are typically less structured than CBT or DBT. You'll discuss whatever feels important, and your therapist will help you notice patterns and connections you may not see. Treatment focuses on your relationship with the therapist as a window into your other relationships. Sessions may explore childhood experiences, dreams, and fantasies. Treatment length varies widely based on goals and depth of work desired.",
        faqs: JSON.stringify([
          { question: "Do I have to talk about my childhood?", answer: "While exploring early experiences can be helpful, psychodynamic therapy focuses on patterns that are currently causing difficulty. Your therapist will follow your lead and only explore what feels relevant to your current concerns." },
          { question: "How is this different from psychoanalysis?", answer: "Psychodynamic therapy is less intensive than traditional psychoanalysis (1-2 sessions per week vs. 4-5) and typically shorter in duration. It uses psychoanalytic concepts but in a more flexible, practical format suited to modern life." },
          { question: "How long does psychodynamic therapy take?", answer: "Treatment length varies widely. Some people benefit from short-term work (6-12 months), while others engage in longer-term therapy (2+ years) for deeper character change. Your therapist will discuss treatment length based on your goals." }
        ]),
        order: 3,
      },
    ];

    defaultTherapies.forEach((therapy) => {
      const id = randomUUID();
      this.therapies.set(id, { id, ...therapy });
    });

    // Initialize default conditions
    const defaultConditions: InsertCondition[] = [
      {
        title: "Anxiety Disorders",
        description: "Anxiety disorders, such as generalized anxiety disorder (GAD), social anxiety disorder (SAD) or phobias",
        slug: "anxiety-disorders",
        pageTitle: "Anxiety Disorder Treatment in Winter Park, FL | Empathy Health",
        heroTitle: "Expert Anxiety Disorder Treatment",
        heroDescription: "Comprehensive anxiety treatment in Winter Park, FL. Our experienced team provides evidence-based therapy and medication management for all types of anxiety disorders including GAD, social anxiety, panic disorder, and phobias.",
        fullDescription: "Anxiety disorders are among the most common mental health conditions, affecting millions of people. At Empathy Health Clinic, we understand that anxiety can be debilitating, interfering with work, relationships, and daily life. Our comprehensive approach combines evidence-based therapies with medication management when needed to help you regain control and reduce anxiety symptoms. We treat generalized anxiety disorder (GAD), social anxiety disorder, panic disorder, specific phobias, and other anxiety-related conditions.",
        symptoms: "Common anxiety symptoms include excessive worrying, restlessness, difficulty concentrating, muscle tension, sleep problems, racing thoughts, panic attacks, avoidance of situations, physical symptoms like rapid heartbeat or sweating, and persistent fear or dread.",
        relatedTreatments: JSON.stringify([]),
        relatedTherapies: JSON.stringify(["cognitive-behavioral-therapy", "dialectical-behavior-therapy"]),
        faqs: JSON.stringify([
          { question: "Is anxiety treatable?", answer: "Yes, anxiety disorders are highly treatable. Most people see significant improvement with therapy, medication, or a combination of both. CBT is particularly effective for anxiety." },
          { question: "Do I need medication for anxiety?", answer: "Not everyone needs medication. Many people benefit from therapy alone. Your psychiatrist will help determine if medication could be helpful based on your symptoms and preferences." },
          { question: "How long does treatment take?", answer: "Many people see improvement within a few months of starting treatment. The timeline varies based on severity and the type of anxiety disorder." }
        ]),
        order: 1,
      },
      {
        title: "Depression",
        description: "Depression and depressive disorders",
        slug: "depression",
        pageTitle: "Depression Treatment in Winter Park, FL | Empathy Health Clinic",
        heroTitle: "Compassionate Depression Treatment",
        heroDescription: "Professional depression treatment in Winter Park, FL. Our psychiatric team offers comprehensive care including therapy, medication management, and support for major depression, persistent depressive disorder, and other mood disorders.",
        fullDescription: "Depression is more than just feeling sad—it's a serious medical condition that affects how you feel, think, and handle daily activities. At Empathy Health Clinic, we provide compassionate, evidence-based treatment for all forms of depression. Our psychiatrists and therapists work collaboratively to develop a personalized treatment plan that may include medication management, psychotherapy, or both. We understand that depression affects every aspect of your life, and we're here to support your journey to wellness.",
        symptoms: "Depression symptoms include persistent sadness or empty mood, loss of interest in activities you once enjoyed, changes in appetite or weight, sleep problems (insomnia or oversleeping), fatigue, feelings of worthlessness or guilt, difficulty concentrating, and thoughts of death or suicide.",
        relatedTreatments: JSON.stringify([]),
        relatedTherapies: JSON.stringify(["cognitive-behavioral-therapy", "psychodynamic-therapy", "dialectical-behavior-therapy"]),
        faqs: JSON.stringify([
          { question: "How do I know if I have depression or just sadness?", answer: "Clinical depression persists for at least two weeks and significantly interferes with daily functioning. If you're unsure, a psychiatric evaluation can help determine if you're experiencing depression." },
          { question: "Will I need to take antidepressants forever?", answer: "Not necessarily. Treatment duration varies by individual. Some people benefit from short-term medication, while others need longer-term treatment to prevent relapse. Your psychiatrist will work with you to find the right approach." },
          { question: "Can therapy really help depression?", answer: "Absolutely. Psychotherapy, particularly CBT and psychodynamic therapy, has strong evidence for treating depression. Many people benefit from therapy alone or combined with medication." }
        ]),
        order: 2,
      },
      {
        title: "Bipolar Disorder",
        description: "Bipolar disorder with manic and depressive episodes",
        slug: "bipolar-disorder",
        pageTitle: "Bipolar Disorder Treatment in Winter Park, FL | Empathy Health",
        heroTitle: "Specialized Bipolar Disorder Treatment",
        heroDescription: "Expert bipolar disorder treatment in Winter Park, FL. Our psychiatric team provides comprehensive mood stabilization, therapy, and ongoing support for Bipolar I, Bipolar II, and cyclothymic disorder.",
        fullDescription: "Bipolar disorder is characterized by extreme mood swings that include emotional highs (mania or hypomania) and lows (depression). At Empathy Health Clinic, our psychiatrists specialize in bipolar disorder treatment, offering careful medication management to stabilize moods and prevent episodes. We combine pharmacological treatment with psychotherapy to help you understand your condition, recognize warning signs of mood episodes, and develop strategies for maintaining stability. Our goal is to help you live a full, productive life while managing bipolar disorder.",
        symptoms: "Bipolar symptoms include manic episodes (elevated mood, increased energy, decreased need for sleep, racing thoughts, risky behavior), hypomanic episodes (similar but less severe), and depressive episodes (low mood, fatigue, hopelessness). Mood swings can occur rarely or multiple times per year.",
        relatedTreatments: JSON.stringify(["bipolar-disorder-treatment"]),
        relatedTherapies: JSON.stringify(["dialectical-behavior-therapy", "cognitive-behavioral-therapy"]),
        faqs: JSON.stringify([
          { question: "What's the difference between Bipolar I and Bipolar II?", answer: "Bipolar I involves full manic episodes that may require hospitalization, while Bipolar II involves less severe hypomanic episodes along with major depressive episodes. Both require treatment but may have different medication needs." },
          { question: "Do I have to take medication for bipolar disorder?", answer: "Medication is typically essential for managing bipolar disorder and preventing dangerous manic or depressive episodes. Mood stabilizers, antipsychotics, or other medications help regulate mood swings." },
          { question: "Can bipolar disorder be cured?", answer: "Bipolar disorder is a chronic condition that requires ongoing management, but it's highly treatable. With proper medication and therapy, most people with bipolar disorder can lead stable, fulfilling lives." }
        ]),
        order: 3,
      },
      {
        title: "PTSD & Trauma",
        description: "Post-traumatic stress disorder and trauma-related conditions",
        slug: "ptsd-trauma",
        pageTitle: "PTSD & Trauma Treatment in Winter Park, FL | Empathy Health",
        heroTitle: "Trauma-Informed PTSD Treatment",
        heroDescription: "Specialized PTSD and trauma treatment in Winter Park, FL. Our compassionate team offers evidence-based therapies including EMDR, CBT, and medication management to help you heal from traumatic experiences.",
        fullDescription: "Post-traumatic stress disorder (PTSD) can develop after experiencing or witnessing a traumatic event. At Empathy Health Clinic, we provide trauma-informed care in a safe, supportive environment. Our therapists are trained in specialized treatments for PTSD and trauma, including EMDR (Eye Movement Desensitization and Reprocessing), trauma-focused CBT, and other evidence-based approaches. We understand that healing from trauma takes time, and we work at your pace to help you process difficult experiences and reclaim your life.",
        symptoms: "PTSD symptoms include intrusive memories or flashbacks, nightmares, severe emotional distress, avoidance of trauma reminders, negative changes in thinking and mood, feeling emotionally numb, hypervigilance, being easily startled, difficulty sleeping, and irritability or angry outbursts.",
        relatedTreatments: JSON.stringify(["ptsd-treatment"]),
        relatedTherapies: JSON.stringify(["cognitive-behavioral-therapy", "dialectical-behavior-therapy"]),
        faqs: JSON.stringify([
          { question: "How long after a traumatic event does PTSD develop?", answer: "PTSD symptoms typically begin within three months of trauma but can appear years later. Not everyone who experiences trauma develops PTSD—it depends on many factors including trauma severity and individual resilience." },
          { question: "Can PTSD be treated without medication?", answer: "Many people successfully treat PTSD through trauma-focused therapy alone, particularly EMDR or CBT. However, medication can be helpful for managing severe symptoms like depression, anxiety, or sleep problems alongside therapy." },
          { question: "Will talking about trauma make it worse?", answer: "With a trained trauma therapist, processing trauma in a controlled, safe way actually helps reduce symptoms. Your therapist will help you work through traumatic memories at a pace that feels manageable." }
        ]),
        order: 4,
      },
      {
        title: "Personality Disorders",
        description: "Personality disorders, such as borderline personality disorder (BPD) and antisocial personality disorder (ASPD)",
        slug: "personality-disorders",
        pageTitle: "Personality Disorder Treatment in Winter Park, FL | Empathy Health",
        heroTitle: "Specialized Personality Disorder Treatment",
        heroDescription: "Expert treatment for personality disorders in Winter Park, FL. We offer comprehensive care including DBT, psychodynamic therapy, and medication management for BPD, ASPD, and other personality disorders.",
        fullDescription: "Personality disorders involve persistent patterns of thinking, feeling, and behaving that differ significantly from cultural expectations and cause distress or functional impairment. At Empathy Health Clinic, we specialize in treating various personality disorders, particularly borderline personality disorder (BPD). Our team offers evidence-based treatments like Dialectical Behavior Therapy (DBT), which is specifically designed for BPD, along with psychodynamic therapy and medication management. We provide long-term, consistent care to help you develop healthier patterns and improve your quality of life.",
        symptoms: "Symptoms vary by type but may include unstable relationships, intense emotions, fear of abandonment, impulsive behaviors, chronic feelings of emptiness, identity disturbance, difficulty trusting others, and problems with anger or emotional regulation.",
        relatedTreatments: JSON.stringify([]),
        relatedTherapies: JSON.stringify(["dialectical-behavior-therapy", "psychodynamic-therapy", "cognitive-behavioral-therapy"]),
        faqs: JSON.stringify([
          { question: "Can personality disorders be treated?", answer: "Yes, while personality disorders are chronic conditions, they're treatable. DBT has particularly strong evidence for borderline personality disorder. Psychotherapy is the primary treatment, sometimes combined with medication for specific symptoms." },
          { question: "How long does treatment take?", answer: "Treating personality disorders typically requires longer-term therapy (1-3 years or more) to create lasting change in deeply ingrained patterns. However, many people see symptom improvement within months of starting treatment." },
          { question: "Do I need medication for a personality disorder?", answer: "There's no medication specifically for personality disorders, but medications can help manage co-occurring conditions like depression, anxiety, or mood instability. Psychotherapy is the cornerstone of treatment." }
        ]),
        order: 5,
      },
    ];

    defaultConditions.forEach((condition) => {
      const id = randomUUID();
      this.conditions.set(id, { id, ...condition });
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Site content methods
  async getSiteContent(): Promise<SiteContent | undefined> {
    return this.siteContent;
  }

  async updateSiteContent(content: InsertSiteContent): Promise<SiteContent> {
    const id = this.siteContent?.id || randomUUID();
    this.siteContent = { id, ...content };
    return this.siteContent;
  }

  // Treatment methods
  async getAllTreatments(): Promise<Treatment[]> {
    return Array.from(this.treatments.values()).sort((a, b) => a.order - b.order);
  }

  async getTreatment(id: string): Promise<Treatment | undefined> {
    return this.treatments.get(id);
  }

  async getTreatmentBySlug(slug: string): Promise<Treatment | undefined> {
    return Array.from(this.treatments.values()).find(t => t.slug === slug);
  }

  async createTreatment(treatment: InsertTreatment): Promise<Treatment> {
    const id = randomUUID();
    const newTreatment: Treatment = { id, ...treatment };
    this.treatments.set(id, newTreatment);
    return newTreatment;
  }

  async updateTreatment(
    id: string,
    treatment: Partial<InsertTreatment>
  ): Promise<Treatment> {
    const existing = this.treatments.get(id);
    if (!existing) throw new Error("Treatment not found");
    const updated = { ...existing, ...treatment };
    this.treatments.set(id, updated);
    return updated;
  }

  async deleteTreatment(id: string): Promise<void> {
    this.treatments.delete(id);
  }

  // Team member methods
  async getAllTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values()).sort(
      (a, b) => a.order - b.order
    );
  }

  async getTeamMember(id: string): Promise<TeamMember | undefined> {
    return this.teamMembers.get(id);
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const id = randomUUID();
    const newMember: TeamMember = { id, ...member };
    this.teamMembers.set(id, newMember);
    return newMember;
  }

  async updateTeamMember(
    id: string,
    member: Partial<InsertTeamMember>
  ): Promise<TeamMember> {
    const existing = this.teamMembers.get(id);
    if (!existing) throw new Error("Team member not found");
    const updated = { ...existing, ...member };
    this.teamMembers.set(id, updated);
    return updated;
  }

  async deleteTeamMember(id: string): Promise<void> {
    this.teamMembers.delete(id);
  }

  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).sort(
      (a, b) => a.order - b.order
    );
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const newTestimonial: Testimonial = { id, ...testimonial };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }

  async updateTestimonial(
    id: string,
    testimonial: Partial<InsertTestimonial>
  ): Promise<Testimonial> {
    const existing = this.testimonials.get(id);
    if (!existing) throw new Error("Testimonial not found");
    const updated = { ...existing, ...testimonial };
    this.testimonials.set(id, updated);
    return updated;
  }

  async deleteTestimonial(id: string): Promise<void> {
    this.testimonials.delete(id);
  }

  // Insurance provider methods
  async getAllInsuranceProviders(): Promise<InsuranceProvider[]> {
    return Array.from(this.insuranceProviders.values()).sort(
      (a, b) => a.order - b.order
    );
  }

  async getInsuranceProvider(id: string): Promise<InsuranceProvider | undefined> {
    return this.insuranceProviders.get(id);
  }

  async getInsuranceProviderBySlug(slug: string): Promise<InsuranceProvider | undefined> {
    return Array.from(this.insuranceProviders.values()).find(p => p.slug === slug);
  }

  async createInsuranceProvider(
    provider: InsertInsuranceProvider
  ): Promise<InsuranceProvider> {
    const id = randomUUID();
    const newProvider: InsuranceProvider = { id, ...provider };
    this.insuranceProviders.set(id, newProvider);
    return newProvider;
  }

  async updateInsuranceProvider(
    id: string,
    provider: Partial<InsertInsuranceProvider>
  ): Promise<InsuranceProvider> {
    const existing = this.insuranceProviders.get(id);
    if (!existing) throw new Error("Insurance provider not found");
    const updated = { ...existing, ...provider };
    this.insuranceProviders.set(id, updated);
    return updated;
  }

  async deleteInsuranceProvider(id: string): Promise<void> {
    this.insuranceProviders.delete(id);
  }

  // Therapy methods
  async getAllTherapies(): Promise<Therapy[]> {
    return Array.from(this.therapies.values()).sort((a, b) => a.order - b.order);
  }

  async getTherapy(id: string): Promise<Therapy | undefined> {
    return this.therapies.get(id);
  }

  async getTherapyBySlug(slug: string): Promise<Therapy | undefined> {
    return Array.from(this.therapies.values()).find(t => t.slug === slug);
  }

  async createTherapy(therapy: InsertTherapy): Promise<Therapy> {
    const id = randomUUID();
    const newTherapy: Therapy = { id, ...therapy };
    this.therapies.set(id, newTherapy);
    return newTherapy;
  }

  async updateTherapy(
    id: string,
    therapy: Partial<InsertTherapy>
  ): Promise<Therapy> {
    const existing = this.therapies.get(id);
    if (!existing) throw new Error("Therapy not found");
    const updated = { ...existing, ...therapy };
    this.therapies.set(id, updated);
    return updated;
  }

  async deleteTherapy(id: string): Promise<void> {
    this.therapies.delete(id);
  }

  // Condition methods
  async getAllConditions(): Promise<Condition[]> {
    return Array.from(this.conditions.values()).sort((a, b) => a.order - b.order);
  }

  async getCondition(id: string): Promise<Condition | undefined> {
    return this.conditions.get(id);
  }

  async getConditionBySlug(slug: string): Promise<Condition | undefined> {
    return Array.from(this.conditions.values()).find(c => c.slug === slug);
  }

  async createCondition(condition: InsertCondition): Promise<Condition> {
    const id = randomUUID();
    const newCondition: Condition = { id, ...condition };
    this.conditions.set(id, newCondition);
    return newCondition;
  }

  async updateCondition(
    id: string,
    condition: Partial<InsertCondition>
  ): Promise<Condition> {
    const existing = this.conditions.get(id);
    if (!existing) throw new Error("Condition not found");
    const updated = { ...existing, ...condition };
    this.conditions.set(id, updated);
    return updated;
  }

  async deleteCondition(id: string): Promise<void> {
    this.conditions.delete(id);
  }

  // Lead methods
  async createLead(lead: InsertLead): Promise<Lead> {
    const id = randomUUID();
    const now = new Date().toISOString();
    const newLead: Lead = { id, ...lead, createdAt: now };
    this.leads.set(id, newLead);
    return newLead;
  }

  async getAllLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}

export const storage = new MemStorage();
