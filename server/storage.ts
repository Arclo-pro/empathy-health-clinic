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
        title: "Psychiatric Evaluation",
        shortDescription: "Comprehensive mental health assessments to diagnose and create personalized treatment plans.",
        icon: "Brain",
        slug: "psychiatric-evaluation",
        pageTitle: "Psychiatric Evaluation in Winter Park, FL | Mental Health Assessment",
        heroTitle: "Comprehensive Psychiatric Evaluation",
        heroDescription: "Thorough mental health evaluations in Winter Park, FL. Our experienced psychiatrists provide detailed assessments to accurately diagnose conditions and develop effective treatment plans tailored to your needs.",
        description: "A psychiatric evaluation is the foundation of effective mental health treatment. At Empathy Health Clinic, our comprehensive evaluations include a detailed review of your symptoms, medical history, family history, and current life circumstances. We take the time to understand your unique situation and provide an accurate diagnosis that guides your personalized treatment plan.",
        whoCanBenefit: "Anyone experiencing mental health concerns, changes in mood or behavior, or seeking a second opinion can benefit from a psychiatric evaluation. Whether you're struggling with anxiety, depression, mood swings, or other symptoms, an evaluation provides clarity and direction for treatment.",
        whatToExpect: "Your initial evaluation typically lasts 60-90 minutes. We'll discuss your symptoms, medical and psychiatric history, current medications, and treatment goals. This comprehensive assessment allows us to provide an accurate diagnosis and recommend the most effective treatment approach, whether that includes medication, therapy, or both.",
        faqs: JSON.stringify([
          { question: "How long does an evaluation take?", answer: "Initial psychiatric evaluations typically take 60-90 minutes. This allows us to gather comprehensive information and provide an accurate assessment." },
          { question: "Will I get a diagnosis?", answer: "Yes, if appropriate. We'll discuss our findings with you and explain any diagnoses, along with recommended treatment options tailored to your needs." },
          { question: "Do I need a referral?", answer: "No referral is needed. You can schedule directly with our clinic for a psychiatric evaluation." }
        ]),
        order: 1,
      },
      {
        title: "Medication Management",
        shortDescription: "Expert psychiatric medication management for optimal mental health and symptom control.",
        icon: "Activity",
        slug: "medication-management",
        pageTitle: "Psychiatric Medication Management | Winter Park, FL",
        heroTitle: "Psychiatric Medication Management",
        heroDescription: "Specialized medication management services in Winter Park, FL. Our psychiatrists expertly prescribe and monitor psychiatric medications to help you achieve optimal mental health with minimal side effects.",
        description: "Medication can be a crucial component of mental health treatment. Our psychiatric providers specialize in medication management for depression, anxiety, bipolar disorder, ADHD, and other conditions. We carefully select medications based on your specific symptoms, medical history, and treatment goals, then provide ongoing monitoring to ensure effectiveness and minimize side effects.",
        whoCanBenefit: "Medication management helps individuals with moderate to severe mental health conditions, those who haven't responded well to therapy alone, or anyone needing expert guidance on psychiatric medications. Our providers work with you to find the right medication at the right dose.",
        whatToExpect: "After your initial evaluation, we'll discuss medication options if appropriate. We start with conservative doses and adjust based on your response. Follow-up appointments monitor your progress, adjust medications as needed, and address any side effects. Most patients see improvement within 4-6 weeks.",
        faqs: JSON.stringify([
          { question: "How often will I need appointments?", answer: "Initially, you'll see your provider every 2-4 weeks. Once stable, appointments are typically monthly or quarterly for medication management." },
          { question: "Can I stop medications once I feel better?", answer: "Never stop psychiatric medications without consulting your provider. We'll work with you to determine the right duration of treatment and safely taper when appropriate." },
          { question: "What about side effects?", answer: "We carefully select medications to minimize side effects and monitor you closely. Most side effects are mild and temporary. We'll adjust your treatment if side effects are concerning." }
        ]),
        order: 2,
      },
      {
        title: "Depression Treatment",
        shortDescription: "Evidence-based treatment for depression including therapy and medication management.",
        icon: "Heart",
        slug: "depression-treatment",
        pageTitle: "Depression Treatment in Winter Park, FL | Empathy Health Clinic",
        heroTitle: "Effective Depression Treatment",
        heroDescription: "Comprehensive depression treatment in Winter Park, FL. Our experienced team provides evidence-based therapy, medication management, and supportive care to help you overcome depression and reclaim your life.",
        description: "Depression affects millions of people, but with the right treatment, recovery is possible. At Empathy Health Clinic, we offer comprehensive depression treatment combining medication management, psychotherapy, and lifestyle interventions. Our compassionate team understands that depression is a medical condition, not a personal weakness, and we're here to support your recovery.",
        whoCanBenefit: "Our depression treatment helps individuals experiencing persistent sadness, loss of interest in activities, changes in sleep or appetite, low energy, difficulty concentrating, or thoughts of self-harm. Whether you have mild, moderate, or severe depression, we provide the level of care you need.",
        whatToExpect: "Treatment typically includes an initial psychiatric evaluation, followed by a personalized treatment plan that may include antidepressant medication, therapy, or both. Most people begin to feel better within 4-8 weeks. We provide ongoing support and adjust treatment as needed to ensure the best outcomes.",
        faqs: JSON.stringify([
          { question: "How long does depression treatment take?", answer: "Most people see improvement within 4-8 weeks of starting treatment. Full recovery often takes 3-6 months, though some people benefit from longer-term treatment to prevent relapse." },
          { question: "Do I need medication for depression?", answer: "Not everyone with depression needs medication. For mild depression, therapy may be sufficient. Moderate to severe depression often responds best to a combination of medication and therapy." },
          { question: "Will depression come back?", answer: "Depression can recur, but treatment significantly reduces this risk. Many people successfully manage depression long-term with maintenance medication, therapy skills, and lifestyle changes." }
        ]),
        order: 3,
      },
      {
        title: "Anxiety Treatment",
        shortDescription: "Specialized care for anxiety disorders including GAD, panic disorder, and social anxiety.",
        icon: "Brain",
        slug: "anxiety-treatment",
        pageTitle: "Anxiety Treatment in Winter Park, FL | Anxiety Disorder Care",
        heroTitle: "Expert Anxiety Treatment",
        heroDescription: "Comprehensive anxiety treatment in Winter Park, FL. Our specialists provide evidence-based therapy and medication management for all types of anxiety disorders, helping you find relief and peace of mind.",
        description: "Anxiety disorders are among the most common mental health conditions, but they're also highly treatable. Empathy Health Clinic offers specialized treatment for generalized anxiety disorder (GAD), panic disorder, social anxiety, and specific phobias. We combine proven therapies like CBT with medication when needed to help you manage anxiety and live fully.",
        whoCanBenefit: "Our anxiety treatment helps people experiencing excessive worry, panic attacks, social anxiety, avoidance behaviors, physical symptoms like rapid heartbeat or shortness of breath, or anxiety that interferes with daily life. If anxiety is holding you back, we can help.",
        whatToExpect: "Treatment begins with a comprehensive evaluation to understand your specific type of anxiety. We may recommend cognitive-behavioral therapy (CBT), exposure therapy, medication, or a combination approach. You'll learn practical skills to manage anxious thoughts and physical symptoms while addressing the root causes of your anxiety.",
        faqs: JSON.stringify([
          { question: "What's the difference between normal anxiety and an anxiety disorder?", answer: "Everyone feels anxious sometimes. An anxiety disorder involves persistent, excessive worry that interferes with daily life, lasts for months, and doesn't improve on its own." },
          { question: "Can anxiety be cured?", answer: "While anxiety disorders are chronic conditions, they're highly treatable. Many people achieve full symptom relief with proper treatment and learn skills to prevent future anxiety episodes." },
          { question: "How quickly will I feel better?", answer: "Many people notice improvement within 2-4 weeks of starting treatment. Full benefit from medication typically takes 4-6 weeks, while therapy skills develop over 8-12 weeks." }
        ]),
        order: 4,
      },
      {
        title: "ADHD Treatment",
        shortDescription: "Comprehensive ADHD diagnosis and treatment for children, teens, and adults.",
        icon: "Activity",
        slug: "adhd-treatment",
        pageTitle: "ADHD Treatment in Winter Park, FL | Adult & Child ADHD Care",
        heroTitle: "ADHD Diagnosis & Treatment",
        heroDescription: "Expert ADHD treatment for all ages in Winter Park, FL. Our specialists provide thorough evaluations, medication management, and behavioral strategies to help you or your child thrive with ADHD.",
        description: "Attention-Deficit/Hyperactivity Disorder (ADHD) affects both children and adults, impacting focus, organization, and impulse control. At Empathy Health Clinic, we provide comprehensive ADHD assessments and evidence-based treatment including stimulant and non-stimulant medications, behavioral strategies, and coaching to help you succeed at school, work, and in relationships.",
        whoCanBenefit: "Our ADHD treatment helps children, teens, and adults who struggle with inattention, hyperactivity, impulsivity, difficulty completing tasks, time management challenges, or academic/work performance issues. Whether newly diagnosed or seeking better symptom control, we can help.",
        whatToExpect: "ADHD evaluation includes detailed symptom assessment, often with rating scales from multiple sources. If diagnosed, treatment typically involves medication management with stimulants or non-stimulants, plus strategies for organization, time management, and behavior modification. Regular follow-ups ensure optimal medication dosing and symptom control.",
        faqs: JSON.stringify([
          { question: "Is ADHD overdiagnosed?", answer: "When properly evaluated by trained professionals, ADHD is accurately diagnosed. We use comprehensive assessments and standardized criteria to ensure accurate diagnosis." },
          { question: "Are ADHD medications safe?", answer: "ADHD medications are safe and effective when properly prescribed and monitored. We start with low doses, adjust carefully, and monitor for any side effects." },
          { question: "Can adults have ADHD?", answer: "Yes! Many adults have ADHD, often undiagnosed since childhood. Adult ADHD is common and very treatable with proper care." }
        ]),
        order: 5,
      },
      {
        title: "Bipolar Disorder Treatment",
        shortDescription: "Specialized mood stabilization and comprehensive care for bipolar disorder.",
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
        order: 6,
      },
      {
        title: "OCD Treatment",
        shortDescription: "Evidence-based treatment for obsessive-compulsive disorder including therapy and medication.",
        icon: "Brain",
        slug: "ocd-treatment",
        pageTitle: "OCD Treatment in Winter Park, FL | Obsessive-Compulsive Disorder Care",
        heroTitle: "Effective OCD Treatment",
        heroDescription: "Specialized OCD treatment in Winter Park, FL. Our experienced team provides evidence-based therapy and medication management to help you overcome intrusive thoughts and compulsive behaviors.",
        description: "Obsessive-Compulsive Disorder (OCD) can be overwhelming, but with proper treatment, you can regain control of your life. At Empathy Health Clinic, we offer specialized OCD treatment combining exposure and response prevention (ERP) therapy with medication management when needed. Our compassionate providers understand the challenges of OCD and are committed to helping you break free from the cycle of obsessions and compulsions.",
        whoCanBenefit: "Our OCD treatment helps individuals experiencing persistent intrusive thoughts (obsessions), repetitive behaviors or mental rituals (compulsions), excessive fears of contamination, need for symmetry or order, or distressing unwanted thoughts. If OCD is interfering with your daily life, work, or relationships, we can help.",
        whatToExpect: "Treatment typically begins with a thorough evaluation to understand your specific OCD symptoms. We'll develop a personalized treatment plan that may include exposure and response prevention (ERP) therapy, cognitive-behavioral therapy (CBT), and medication such as SSRIs. Most people see significant improvement within 8-12 weeks of consistent treatment.",
        faqs: JSON.stringify([
          { question: "What is ERP therapy?", answer: "Exposure and Response Prevention (ERP) is the gold-standard treatment for OCD. It involves gradually exposing yourself to anxiety-triggering situations while learning to resist compulsive behaviors. It's highly effective when done properly with a trained therapist." },
          { question: "Do I need medication for OCD?", answer: "Not everyone with OCD needs medication, but many people benefit from SSRIs in combination with therapy. Medication can help reduce the intensity of obsessions and make therapy more effective." },
          { question: "How long does OCD treatment take?", answer: "Most people see improvement within 8-12 weeks of starting treatment. Full recovery often takes 6-12 months of consistent therapy and medication management. Maintenance treatment helps prevent relapse." }
        ]),
        order: 7,
      },
      {
        title: "PTSD Treatment",
        shortDescription: "Trauma-focused treatment for post-traumatic stress disorder and trauma recovery.",
        icon: "Heart",
        slug: "ptsd-treatment",
        pageTitle: "PTSD Treatment in Winter Park, FL | Trauma Therapy & Recovery",
        heroTitle: "Comprehensive PTSD Treatment",
        heroDescription: "Specialized PTSD and trauma treatment in Winter Park, FL. Our trauma-informed providers offer evidence-based therapies and medication management to help you heal from traumatic experiences and reclaim your life.",
        description: "Post-Traumatic Stress Disorder (PTSD) can develop after experiencing or witnessing traumatic events. At Empathy Health Clinic, we provide trauma-informed care using evidence-based approaches including trauma-focused cognitive behavioral therapy (TF-CBT), EMDR, and medication management. Our compassionate team creates a safe environment where you can process trauma and develop healthy coping strategies.",
        whoCanBenefit: "Our PTSD treatment helps individuals experiencing flashbacks, nightmares, avoidance of trauma reminders, hypervigilance, emotional numbness, or difficulty trusting others after traumatic experiences. Whether you've experienced military combat, assault, accidents, natural disasters, or other trauma, we provide specialized care for recovery.",
        whatToExpect: "Treatment begins with a comprehensive trauma assessment in a safe, supportive environment. We'll develop a personalized treatment plan that may include trauma-focused therapy, EMDR (Eye Movement Desensitization and Reprocessing), medication for symptoms like anxiety and insomnia, and skills training for emotional regulation. Recovery is possible, and we're here to support you every step of the way.",
        faqs: JSON.stringify([
          { question: "Will I have to talk about my trauma?", answer: "Trauma-focused therapy does involve processing traumatic memories, but we go at your pace in a safe, controlled manner. Some treatments like EMDR can be effective without detailed verbal descriptions of trauma." },
          { question: "Can PTSD be cured?", answer: "While PTSD is a chronic condition, many people achieve full recovery with proper treatment. Evidence-based treatments like TF-CBT and EMDR have high success rates in significantly reducing or eliminating PTSD symptoms." },
          { question: "How long does PTSD treatment take?", answer: "Treatment duration varies, but many people see significant improvement within 3-6 months of trauma-focused therapy. Some individuals benefit from longer-term treatment, especially if they've experienced multiple traumas." }
        ]),
        order: 8,
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
        image: "/attached_assets/image_1761612254512.png",
        order: 1,
      },
      {
        name: "Melissa DiPaolis",
        credentials: "MSN, APRN, FNP-BC",
        image: "/attached_assets/image_1761612547677.png",
        order: 2,
      },
      {
        name: "Dr. Robert Glenn",
        credentials: "MD",
        image: "/attached_assets/dr_glenn_headshot_square_1761613083513.png",
        order: 3,
      },
      {
        name: "Keith Harryhill",
        credentials: "MS, LMHC",
        image: "/attached_assets/stock_images/professional_male_do_25305d14.jpg",
        order: 4,
      },
      {
        name: "Marjorie Felix",
        credentials: "MSN, APRN, PMHNP-BC",
        image: "/attached_assets/stock_images/professional_female__6d45674d.jpg",
        order: 5,
      },
      {
        name: "Rachel Coalburn",
        credentials: "LCSW",
        image: "/attached_assets/stock_images/professional_female__0892cd68.jpg",
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
        image: "/attached_assets/image_1761613347362.png",
        order: 8,
      },
      {
        name: "Christine Orr",
        credentials: "LCSW",
        image: "/attached_assets/stock_images/professional_male_do_d7ac4a30.jpg",
        order: 9,
      },
      {
        name: "Karla McLeod",
        credentials: "Licensed Mental Health Counselor",
        image: "/attached_assets/stock_images/professional_male_do_381973f4.jpg",
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
        logo: "/attached_assets/image_1761605756361.png",
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
        logo: "/attached_assets/Aetna-Logo-1024x640_1761603073153.png",
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
        logo: "/attached_assets/optum_1761610670721.webp",
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
        logo: "/attached_assets/Cigna-Logo-1024x576_1761603078566.png",
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
        logo: "/attached_assets/AdventHealth_Logo.svg_1761603073152.png",
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
        logo: "/attached_assets/image_1761611627164.png",
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
        logo: "/attached_assets/united-healthcare_1761610722363.webp",
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
        logo: "/attached_assets/oscar-logo-1_1761610777161.png",
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
        logo: "/attached_assets/First-Health-Logo_1761603088941.jpg",
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
        logo: "/attached_assets/Medicare-Logo-1536x864_1761603097276.png",
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
        logo: "/attached_assets/Curative_Logo_(002)_1761610862397.jpg",
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
        title: "Cognitive Behavioral Therapy",
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
        title: "Concentration and Focus Therapy",
        shortDescription: "Specialized therapy to improve attention, concentration, and cognitive performance.",
        icon: "Activity",
        slug: "concentration-and-focus-therapy",
        pageTitle: "Concentration and Focus Therapy in Winter Park, FL | ADHD & Focus Treatment",
        heroTitle: "Concentration and Focus Therapy",
        heroDescription: "Improve your concentration and focus with specialized therapy in Winter Park, FL. Our therapists provide targeted strategies and interventions to enhance attention, productivity, and cognitive performance for ADHD and focus challenges.",
        description: "Concentration and focus therapy at Empathy Health Clinic helps individuals struggling with attention difficulties, whether related to ADHD, stress, anxiety, or other factors. Our specialized approach combines cognitive training, behavioral strategies, and mindfulness techniques to improve your ability to focus, organize tasks, and maintain attention. We work with both children and adults to develop personalized strategies for success.",
        whoCanBenefit: "This therapy benefits individuals with ADHD, difficulty maintaining attention at work or school, problems with task completion, chronic procrastination, or focus issues related to anxiety or stress. If you struggle to concentrate, get easily distracted, or have difficulty following through on tasks, our specialized focus therapy can help.",
        whatToExpect: "Treatment includes assessment of your specific attention challenges, development of personalized focus strategies, cognitive exercises to strengthen attention, organizational skills training, and techniques for managing distractions. Sessions may include mindfulness practice, time management tools, and behavioral strategies. Progress is regularly monitored with adjustments made to optimize your improvement.",
        faqs: JSON.stringify([
          { question: "Is this only for people with ADHD?", answer: "No, while we work with many ADHD patients, concentration therapy benefits anyone struggling with focus, whether due to stress, anxiety, life transitions, or other causes." },
          { question: "Will I need medication?", answer: "Not necessarily. Many people improve focus through therapy techniques alone. If appropriate, we can coordinate with our psychiatric team to discuss medication options." },
          { question: "How quickly will I see improvement?", answer: "Many people notice improvements within 4-6 weeks as they learn and apply new strategies. Building strong concentration skills takes practice and consistency." }
        ]),
        order: 2,
      },
      {
        title: "Grief Counseling Services",
        shortDescription: "Compassionate support for coping with loss, bereavement, and the grieving process.",
        icon: "Heart",
        slug: "grief-counseling-services",
        pageTitle: "Grief Counseling in Winter Park, FL | Bereavement Support",
        heroTitle: "Grief Counseling Services",
        heroDescription: "Find compassionate grief counseling in Winter Park, FL. Our experienced therapists provide supportive bereavement counseling to help you navigate loss, process emotions, and find meaning while honoring your loved one's memory.",
        description: "Grief is a natural response to loss, but it can feel overwhelming and isolating. At Empathy Health Clinic, our grief counselors provide a safe, compassionate space to process the death of a loved one, relationship endings, job loss, or other significant losses. We understand that grief is unique for each person and respect your individual journey through the stages of mourning.",
        whoCanBenefit: "Grief counseling helps those experiencing bereavement, complicated grief, anticipatory grief (when a loved one is terminally ill), disenfranchised grief (losses not socially recognized), or difficulty coping with any significant loss. If grief is interfering with daily functioning, causing depression, or you feel stuck in the grieving process, counseling can provide essential support.",
        whatToExpect: "Grief counseling provides a supportive space to express emotions, share memories, process your loss, and gradually adjust to life after loss. Your therapist will help you understand the grieving process, validate your feelings, develop coping strategies, and address complicated emotions like guilt or anger. We honor your unique grieving style and timeline, never rushing you through the process.",
        faqs: JSON.stringify([
          { question: "How long does grief last?", answer: "Grief has no timeline. While acute grief typically lessens over months, the grieving process can take years. Counseling helps you move through grief at your own pace while learning to live with loss." },
          { question: "Is it normal to feel angry or guilty?", answer: "Yes, anger and guilt are common grief reactions. Counseling provides a safe space to explore these difficult emotions without judgment and work through them constructively." },
          { question: "When should I seek grief counseling?", answer: "Seek help if grief interferes with daily functioning, you have thoughts of self-harm, experience severe depression, feel stuck in grief, or need support navigating loss. There's no 'wrong time' to seek help." }
        ]),
        order: 3,
      },
      {
        title: "Anger Management",
        shortDescription: "Learn healthy ways to manage anger, reduce outbursts, and improve relationships.",
        icon: "Brain",
        slug: "anger-management",
        pageTitle: "Anger Management Therapy in Winter Park, FL | Control Anger",
        heroTitle: "Anger Management Therapy",
        heroDescription: "Master anger management with professional therapy in Winter Park, FL. Our therapists teach proven techniques to control anger, communicate effectively, and build healthier relationships at home and work.",
        description: "Anger is a normal emotion, but when it becomes overwhelming or leads to destructive behavior, it's time to seek help. At Empathy Health Clinic, our anger management program teaches you to recognize anger triggers, manage intense emotions, communicate assertively without aggression, and develop healthy coping strategies. We work with individuals, couples, and families to transform anger from a destructive force into a constructive emotion.",
        whoCanBenefit: "Anger management helps individuals who experience frequent angry outbursts, difficulty controlling temper, relationship problems due to anger, workplace conflicts, legal issues related to anger, or physical symptoms of anger like headaches or high blood pressure. If anger is affecting your relationships, career, or wellbeing, we can help you regain control.",
        whatToExpect: "Treatment includes identifying anger triggers and warning signs, understanding the roots of your anger, learning relaxation and stress management techniques, developing assertive communication skills, and practicing healthier responses to frustration. You'll receive practical tools to use immediately and homework to practice new skills. Most people see improvement within 8-12 weeks.",
        faqs: JSON.stringify([
          { question: "Does anger management really work?", answer: "Yes! Research shows anger management therapy is highly effective. Most people see significant improvement in controlling anger and reducing outbursts with consistent practice of learned techniques." },
          { question: "Will I have to stop feeling angry?", answer: "No, anger is a normal emotion. The goal is to manage anger appropriately, express it constructively, and prevent it from controlling you or damaging relationships." },
          { question: "Is anger management just for people with 'anger issues'?", answer: "No, anyone wanting to handle frustration better, improve communication, or reduce stress-related anger can benefit. You don't need to have severe problems to benefit from these skills." }
        ]),
        order: 4,
      },
      {
        title: "Depression Therapy",
        shortDescription: "Evidence-based therapy for depression to restore hope, energy, and enjoyment in life.",
        icon: "Heart",
        slug: "depression-therapy",
        pageTitle: "Depression Therapy in Winter Park, FL | Depression Counseling",
        heroTitle: "Depression Therapy",
        heroDescription: "Overcome depression with professional therapy in Winter Park, FL. Our compassionate therapists provide evidence-based treatment including CBT and interpersonal therapy to help you regain joy, energy, and hope.",
        description: "Depression can make everything feel hopeless, but effective treatment can help you recover. At Empathy Health Clinic, our depression therapy specialists use evidence-based approaches including cognitive behavioral therapy (CBT), interpersonal therapy, and behavioral activation to address the thoughts, emotions, and behaviors that maintain depression. We provide a supportive, non-judgmental environment where you can heal and rediscover your strengths.",
        whoCanBenefit: "Depression therapy helps individuals experiencing persistent sadness, loss of interest in activities, low energy, sleep problems, difficulty concentrating, feelings of worthlessness, or thoughts of self-harm. Whether you have major depression, persistent depressive disorder, or depression related to life circumstances, therapy can provide relief and lasting recovery.",
        whatToExpect: "Your therapist will help you identify and change negative thought patterns, increase engagement in enjoyable activities, improve problem-solving skills, address relationship issues contributing to depression, and develop healthy coping strategies. Therapy is typically weekly at first, with sessions becoming less frequent as you improve. Many people notice improvement within 6-8 weeks, with continued progress over 3-6 months.",
        faqs: JSON.stringify([
          { question: "Do I need medication or therapy?", answer: "Research shows therapy alone is effective for mild to moderate depression. For more severe depression, combining therapy with medication often provides the best results. We'll work with our psychiatric team if medication is appropriate." },
          { question: "How is depression therapy different from just talking to a friend?", answer: "Therapists use evidence-based techniques proven to treat depression. We provide objective feedback, teach specific skills, identify patterns you may not see, and create a structured path to recovery." },
          { question: "What if I don't feel better?", answer: "If you're not improving, we'll adjust our approach, consider other treatment options, or coordinate with our psychiatric team for additional support. Recovery is possible, and we won't give up on finding what works for you." }
        ]),
        order: 5,
      },
      {
        title: "Bipolar Disorder Therapy",
        shortDescription: "Specialized therapy to manage mood swings, prevent episodes, and improve quality of life.",
        icon: "Activity",
        slug: "bipolar-disorder-therapy",
        pageTitle: "Bipolar Disorder Therapy in Winter Park, FL | Mood Disorder Treatment",
        heroTitle: "Bipolar Disorder Therapy",
        heroDescription: "Achieve mood stability with specialized bipolar disorder therapy in Winter Park, FL. Our experienced therapists provide comprehensive treatment to manage manic and depressive episodes, improve functioning, and enhance quality of life.",
        description: "Living with bipolar disorder requires ongoing management, but with the right therapy, you can achieve stability and thrive. At Empathy Health Clinic, our bipolar disorder specialists provide evidence-based psychotherapy that complements medication management. We focus on recognizing early warning signs of mood episodes, developing coping strategies, maintaining medication adherence, and improving relationships affected by bipolar disorder.",
        whoCanBenefit: "Bipolar therapy benefits individuals with bipolar I, bipolar II, or cyclothymic disorder. If you experience mood swings between depression and mania/hypomania, difficulty maintaining relationships or employment due to mood episodes, or struggle with medication adherence, specialized therapy can improve stability and quality of life.",
        whatToExpect: "Therapy includes education about bipolar disorder, identifying your personal warning signs of mood episodes, developing a crisis plan, learning skills to manage both depressive and manic symptoms, improving sleep and daily routines, and addressing relationship impacts. Family therapy may be included to improve support systems. Treatment typically involves regular sessions coordinated with medication management.",
        faqs: JSON.stringify([
          { question: "Can therapy replace medication for bipolar disorder?", answer: "No, medication is essential for bipolar disorder. However, combining medication with therapy provides the best outcomes, helping prevent relapses and improve functioning beyond what medication alone achieves." },
          { question: "What type of therapy works best for bipolar disorder?", answer: "Cognitive behavioral therapy (CBT), interpersonal and social rhythm therapy, and family-focused therapy have all shown effectiveness for bipolar disorder. We'll tailor treatment to your needs." },
          { question: "How long will I need therapy?", answer: "Bipolar disorder is a chronic condition requiring ongoing management. Initial intensive therapy may last 6-12 months, followed by maintenance therapy and periodic check-ins to maintain stability." }
        ]),
        order: 6,
      },
      {
        title: "OCD Therapy",
        shortDescription: "Specialized exposure and response prevention therapy for obsessive-compulsive disorder.",
        icon: "Brain",
        slug: "ocd-therapy",
        pageTitle: "OCD Therapy in Winter Park, FL | ERP Therapy for OCD",
        heroTitle: "OCD Therapy",
        heroDescription: "Break free from OCD with specialized exposure and response prevention (ERP) therapy in Winter Park, FL. Our OCD specialists provide evidence-based treatment to reduce obsessions and compulsions, helping you reclaim your life.",
        description: "Obsessive-Compulsive Disorder (OCD) can be debilitating, but exposure and response prevention (ERP) therapy is highly effective. At Empathy Health Clinic, our OCD specialists are trained in ERP, the gold-standard treatment for OCD. We create a gradual, systematic approach to facing your fears while resisting compulsions, leading to significant reduction in OCD symptoms and improved quality of life.",
        whoCanBenefit: "OCD therapy helps individuals with contamination fears, checking compulsions, intrusive thoughts, need for symmetry or order, counting rituals, or any obsessive thoughts and compulsive behaviors interfering with daily life. If OCD is consuming hours of your day or causing significant distress, specialized therapy can provide relief.",
        whatToExpect: "ERP therapy involves gradually exposing yourself to feared situations while learning to resist compulsive responses. Your therapist will work with you to create a fear hierarchy, starting with less challenging exposures and progressing gradually. Sessions include both in-session exposures and homework assignments. While initially anxiety-provoking, ERP is highly effective, with most people experiencing 50-80% symptom reduction within 12-20 sessions.",
        faqs: JSON.stringify([
          { question: "Is ERP therapy scary?", answer: "ERP can feel challenging at first, but we proceed at your pace and never force you into situations you're not ready for. Most people find the anxiety during exposures is less intense than they expected and decreases rapidly." },
          { question: "Do I need medication with ERP?", answer: "Not always. Many people successfully treat OCD with ERP alone. However, combining medication with ERP can be helpful for severe OCD or when starting therapy feels overwhelming." },
          { question: "Will my OCD come back after treatment?", answer: "Some people experience symptom fluctuations, but ERP teaches skills you can use whenever needed. Periodic 'booster' sessions can help maintain progress. Most people maintain significant improvement long-term." }
        ]),
        order: 7,
      },
      {
        title: "EMDR Therapy",
        shortDescription: "Eye Movement Desensitization and Reprocessing therapy for trauma, PTSD, and distressing memories.",
        icon: "Heart",
        slug: "emdr-therapy",
        pageTitle: "EMDR Therapy in Winter Park, FL | Trauma Treatment",
        heroTitle: "EMDR Therapy",
        heroDescription: "Heal from trauma with EMDR therapy in Winter Park, FL. Our EMDR-trained therapists provide effective treatment for PTSD, traumatic memories, and distressing life experiences using this evidence-based approach.",
        description: "Eye Movement Desensitization and Reprocessing (EMDR) is a specialized therapy for trauma and PTSD. At Empathy Health Clinic, our EMDR-trained therapists use this evidence-based approach to help you process traumatic memories and distressing experiences. Unlike traditional talk therapy, EMDR uses bilateral stimulation (eye movements, tapping, or sounds) to help your brain reprocess traumatic memories, reducing their emotional impact.",
        whoCanBenefit: "EMDR is highly effective for PTSD, single-incident trauma, childhood trauma, complex trauma, anxiety disorders, panic attacks, phobias, and disturbing life experiences. If you have traumatic memories that feel 'stuck' or continue to cause distress, EMDR can help you process these experiences and move forward.",
        whatToExpect: "EMDR treatment begins with history-taking and preparation, teaching you coping skills before processing begins. During processing sessions, you'll focus on traumatic memories while following bilateral stimulation (typically eye movements). This helps your brain reprocess memories, reducing emotional distress. You don't need to discuss traumatic details extensively. Many people experience significant improvement in 6-12 sessions, though complex trauma may require longer treatment.",
        faqs: JSON.stringify([
          { question: "Do I have to talk about my trauma in detail?", answer: "No, one advantage of EMDR is that you don't need to describe traumatic experiences in detail. Brief acknowledgment of what happened is sufficient for processing to occur." },
          { question: "How is EMDR different from regular therapy?", answer: "EMDR uses bilateral stimulation to facilitate brain processing of traumatic memories. It's often faster than traditional talk therapy for trauma and doesn't require extensive verbal processing or homework." },
          { question: "Does EMDR really work?", answer: "Yes! EMDR is recognized by the American Psychiatric Association and the World Health Organization as an effective trauma treatment. Research shows it's as effective as or more effective than other PTSD treatments." }
        ]),
        order: 8,
      },
      {
        title: "Couples Therapy",
        shortDescription: "Relationship counseling to improve communication, resolve conflicts, and strengthen your partnership.",
        icon: "Users",
        slug: "couples-therapy",
        pageTitle: "Couples Therapy in Winter Park, FL | Marriage Counseling",
        heroTitle: "Couples Therapy",
        heroDescription: "Strengthen your relationship with couples therapy in Winter Park, FL. Our experienced therapists help partners improve communication, resolve conflicts, rebuild trust, and create deeper emotional connection.",
        description: "Relationships require work, and couples therapy provides the tools and support to build a stronger partnership. At Empathy Health Clinic, our couples therapists help partners improve communication, resolve recurring conflicts, rebuild trust after betrayal, navigate life transitions, and deepen emotional intimacy. Whether you're considering separation or simply want to strengthen your relationship, couples therapy can help.",
        whoCanBenefit: "Couples therapy helps partners experiencing communication problems, frequent conflicts, infidelity recovery, emotional disconnection, sexual difficulties, parenting disagreements, or consideration of separation. You don't need to be in crisis—preventive couples therapy can strengthen already good relationships and teach skills for future challenges.",
        whatToExpect: "Initial sessions focus on understanding your relationship patterns, identifying core issues, and establishing therapy goals. Your therapist will help both partners feel heard, improve communication skills, understand each other's perspectives, address underlying issues, and develop new relationship patterns. Sessions are typically weekly or biweekly. Many couples see improvement in 8-12 sessions, though deeper work may take longer.",
        faqs: JSON.stringify([
          { question: "Will the therapist take sides?", answer: "No, our therapists remain impartial. We're on the side of your relationship, helping both partners feel heard and understood while working together toward your goals." },
          { question: "What if my partner won't come?", answer: "While couples therapy works best with both partners, individual therapy can still improve relationship dynamics. We can discuss strategies to encourage your partner's participation." },
          { question: "Is it too late if we're considering separation?", answer: "No, couples therapy can help whether you're trying to save your relationship or need support in separating respectfully. Many couples on the brink of separation find their relationship can improve with proper help." }
        ]),
        order: 9,
      },
      {
        title: "Intimacy Therapy",
        shortDescription: "Specialized therapy to enhance emotional and physical intimacy in relationships.",
        icon: "Heart",
        slug: "intimacy-therapy",
        pageTitle: "Intimacy Therapy in Winter Park, FL | Sexual & Emotional Intimacy Counseling",
        heroTitle: "Intimacy Therapy",
        heroDescription: "Enhance intimacy in your relationship with specialized therapy in Winter Park, FL. Our therapists address emotional connection, sexual concerns, and barriers to intimacy, helping couples build deeper, more fulfilling relationships.",
        description: "Intimacy issues can strain even strong relationships. At Empathy Health Clinic, our intimacy therapy specialists help couples address both emotional and physical intimacy concerns. We create a safe, non-judgmental space to discuss sensitive topics like sexual difficulties, emotional disconnection, desire discrepancies, and intimacy barriers. Our goal is to help you and your partner build greater closeness and satisfaction.",
        whoCanBenefit: "Intimacy therapy helps couples experiencing decreased sexual desire, mismatched libidos, difficulty with emotional vulnerability, sexual dysfunction, intimacy avoidance, impact of past trauma on intimacy, or lack of physical affection. If you want to deepen connection but aren't sure how, intimacy therapy provides guidance and tools.",
        whatToExpect: "Treatment includes assessment of emotional and physical intimacy, education about sexuality and attachment, addressing communication about intimacy needs, exploring barriers to closeness, developing skills for emotional vulnerability, and creating plans to rebuild intimacy. We address both partners' perspectives and needs, working toward mutual satisfaction and connection. Treatment length varies based on complexity of issues.",
        faqs: JSON.stringify([
          { question: "Is intimacy therapy just about sex?", answer: "No, while we address sexual concerns, intimacy therapy encompasses emotional connection, vulnerability, affection, and overall closeness. Sexual issues often improve when emotional intimacy strengthens." },
          { question: "Will we have to do uncomfortable exercises?", answer: "We never ask you to do anything you're uncomfortable with. Any exercises or homework are suggested, not required, and we proceed at a pace that feels safe for both partners." },
          { question: "Can intimacy be rebuilt after it's been lost?", answer: "Yes! Many couples successfully rebuild intimacy with proper support. It requires commitment and willingness from both partners, but recovery is possible even after prolonged disconnection." }
        ]),
        order: 10,
      },
      {
        title: "Orlando Marriage Counseling",
        shortDescription: "Professional marriage counseling to navigate challenges and build a stronger, lasting partnership.",
        icon: "Users",
        slug: "orlando-marriage-counseling",
        pageTitle: "Marriage Counseling in Orlando & Winter Park, FL | Save Your Marriage",
        heroTitle: "Orlando Marriage Counseling",
        heroDescription: "Save and strengthen your marriage with professional counseling in Orlando and Winter Park, FL. Our marriage counselors help couples overcome challenges, improve communication, and build lasting love and partnership.",
        description: "Marriage faces unique challenges, and professional counseling can make the difference between divorce and renewal. At Empathy Health Clinic, our Orlando marriage counselors specialize in helping couples navigate infidelity, financial stress, parenting conflicts, in-law issues, and loss of connection. We use evidence-based approaches including Gottman Method and Emotionally Focused Therapy to help couples rebuild their marriage on stronger foundations.",
        whoCanBenefit: "Marriage counseling helps couples considering separation, recovering from infidelity, experiencing constant conflict, feeling like roommates rather than partners, disagreeing about major life decisions, or struggling through major life transitions. Whether you're in crisis or want to strengthen your marriage, professional guidance can help.",
        whatToExpect: "We begin with comprehensive assessment of your marriage strengths and challenges. Treatment focuses on improving communication, resolving conflicts constructively, rebuilding trust and intimacy, aligning on shared goals, and developing healthy relationship patterns. We may address individual issues affecting the marriage and help you develop a shared vision for your future. Most couples attend weekly or biweekly sessions for 3-6 months.",
        faqs: JSON.stringify([
          { question: "How do we know if we need marriage counseling?", answer: "Consider counseling if you're constantly fighting, feel disconnected, have difficulty resolving issues, are considering separation, or simply want to strengthen your marriage. Early intervention often prevents more serious problems." },
          { question: "What's your success rate?", answer: "Success depends on both partners' commitment. Research shows 70% of couples who complete therapy report significant improvement. Earlier you seek help, better the outcomes tend to be." },
          { question: "How long does marriage counseling take?", answer: "Most couples see improvement within 3-6 months of weekly sessions. Severe issues like infidelity may require 6-12 months. Periodic 'maintenance' sessions can help sustain improvements." }
        ]),
        order: 11,
      },
      {
        title: "Toxic Relationship Therapy",
        shortDescription: "Support and guidance for recognizing, addressing, and healing from toxic relationship patterns.",
        icon: "Heart",
        slug: "toxic-relationship-therapy",
        pageTitle: "Toxic Relationship Therapy in Winter Park, FL | Narcissistic Abuse Recovery",
        heroTitle: "Toxic Relationship Therapy",
        heroDescription: "Heal from toxic relationships with specialized therapy in Winter Park, FL. Our therapists help you recognize unhealthy patterns, set boundaries, make informed decisions, and recover from emotional abuse and narcissistic relationships.",
        description: "Toxic relationships can damage self-esteem and wellbeing. At Empathy Health Clinic, our therapists specialize in helping individuals recognize toxic relationship patterns, understand dynamics of emotional abuse and manipulation, develop healthy boundaries, make informed decisions about staying or leaving, and heal from relationship trauma. We provide a safe, validating space to explore your experiences without judgment.",
        whoCanBenefit: "This therapy helps individuals in relationships with narcissistic partners, experiencing emotional abuse or manipulation, dealing with controlling behaviors, struggling with codependency, considering leaving but feeling trapped, or recovering after leaving a toxic relationship. If you feel diminished, controlled, or constantly walking on eggshells in your relationship, therapy can help.",
        whatToExpect: "Treatment includes education about healthy vs. toxic relationship dynamics, validation of your experiences, development of safety planning if needed, boundary-setting skills, support in decision-making about the relationship, trauma processing if you've experienced abuse, and rebuilding self-esteem and sense of self. We empower you to make informed decisions about your relationship and future.",
        faqs: JSON.stringify([
          { question: "Will you tell me to leave my relationship?", answer: "No, we don't tell you what to do. We help you understand dynamics, see patterns clearly, and make informed decisions that align with your wellbeing and values. The choice is always yours." },
          { question: "What if I'm not sure my relationship is really 'toxic'?", answer: "That's a common question. Therapy can help you evaluate your relationship objectively, understand healthy relationship standards, and determine whether patterns are problematic or abusive." },
          { question: "Can a toxic relationship be fixed?", answer: "It depends. If both partners recognize problems and commit to change, some relationships improve. However, truly toxic dynamics—especially involving narcissism or abuse—rarely change. We'll help you assess realistically." }
        ]),
        order: 12,
      },
      {
        title: "LGBTQ Therapy",
        shortDescription: "Affirming therapy for LGBTQ+ individuals and couples addressing identity, relationships, and mental health.",
        icon: "Heart",
        slug: "lgbtq-therapy",
        pageTitle: "LGBTQ Therapy in Winter Park, FL | Affirming Mental Health Care",
        heroTitle: "LGBTQ Therapy",
        heroDescription: "Find affirming LGBTQ therapy in Winter Park, FL. Our LGBTQ-friendly therapists provide inclusive mental health care for issues related to identity, coming out, relationships, discrimination, and overall wellbeing.",
        description: "At Empathy Health Clinic, we provide affirming, inclusive therapy for LGBTQ+ individuals and couples. Our therapists understand the unique challenges faced by LGBTQ+ community members, including coming out, identity exploration, discrimination, family rejection, relationship concerns, and mental health issues disproportionately affecting the LGBTQ+ population. We create a safe space where you can be your authentic self without fear of judgment.",
        whoCanBenefit: "LGBTQ therapy helps individuals exploring gender or sexual identity, navigating coming out, coping with discrimination or rejection, addressing relationship issues in same-sex partnerships, dealing with transgender-specific concerns, coping with minority stress, or experiencing depression, anxiety, or trauma related to LGBTQ experiences. All LGBTQ+ individuals seeking supportive, affirming mental health care are welcome.",
        whatToExpect: "Therapy is tailored to your specific needs. We may address identity exploration and affirmation, coming out process, family dynamics, relationship issues, coping with discrimination, building resilience, addressing mental health concerns, and connecting with community resources. Your therapist will use your chosen name and pronouns, respect your identity, and provide culturally competent care informed by understanding of LGBTQ+ experiences.",
        faqs: JSON.stringify([
          { question: "Are all your therapists LGBTQ-friendly?", answer: "Yes, all our therapists are trained in LGBTQ-affirming care and committed to providing inclusive, non-discriminatory services. We believe in creating safe spaces for all gender identities and sexual orientations." },
          { question: "Do I have to identify as LGBTQ to see you?", answer: "No, our LGBTQ-affirming therapists work with clients of all identities and orientations. If you're questioning your identity, we provide supportive exploration without pressure to label yourself." },
          { question: "Will you try to change my sexual orientation or gender identity?", answer: "Absolutely not. We firmly oppose conversion therapy and similar practices. Our therapy is affirming and supportive of your identity, helping you live authentically and healthily." }
        ]),
        order: 13,
      },
      {
        title: "In Person Therapy",
        shortDescription: "Traditional face-to-face therapy sessions in our comfortable Winter Park office.",
        icon: "Users",
        slug: "in-person-therapy",
        pageTitle: "In Person Therapy in Winter Park, FL | Face-to-Face Counseling",
        heroTitle: "In Person Therapy",
        heroDescription: "Experience the benefits of traditional in-person therapy at our Winter Park, FL office. Our comfortable, private setting provides the ideal environment for meaningful therapeutic work and personal growth.",
        description: "There's something powerful about meeting face-to-face with your therapist. At Empathy Health Clinic's Winter Park location, we provide in-person therapy in comfortable, private rooms designed to put you at ease. Many people find that in-person sessions create deeper therapeutic connection, allow for better nonverbal communication, and provide dedicated time away from distractions. We offer flexible scheduling including evening appointments to accommodate your needs.",
        whoCanBenefit: "In-person therapy benefits anyone preferring traditional face-to-face counseling, those wanting separation between therapy space and home, individuals who find deeper connection in person, people with confidentiality concerns about virtual therapy, or those without reliable internet access. In-person therapy can be particularly valuable for couples therapy, EMDR, and other approaches benefiting from in-person interaction.",
        whatToExpect: "You'll meet with your therapist in a private, comfortable office at our Winter Park clinic. Sessions are typically 45-50 minutes. We maintain strict confidentiality and HIPAA compliance. Our office provides a quiet, professional environment free from distractions. You can focus entirely on your therapeutic work without the technical issues or home interruptions that can occur with telehealth.",
        faqs: JSON.stringify([
          { question: "Do you offer both in-person and virtual options?", answer: "Yes, many of our therapists offer both in-person and telehealth appointments, giving you flexibility to choose based on your preference and schedule." },
          { question: "Where is your office located?", answer: "Our office is conveniently located in Winter Park, FL, with easy access from Orlando and surrounding areas. Contact us for specific location details and directions." },
          { question: "Is in-person therapy better than virtual?", answer: "Neither is inherently better—it depends on your preferences and needs. In-person offers face-to-face connection, while virtual provides convenience. We can help you decide what works best for you." }
        ]),
        order: 14,
      },
      {
        title: "Virtual Counseling Services",
        shortDescription: "Convenient, secure telehealth therapy from the comfort of your home.",
        icon: "Activity",
        slug: "virtual-counseling-services",
        pageTitle: "Virtual Counseling in Winter Park, FL | Online Therapy & Telehealth",
        heroTitle: "Virtual Counseling Services",
        heroDescription: "Access professional therapy from anywhere with virtual counseling services. Our secure telehealth platform provides convenient, effective mental health care from the comfort and privacy of your home.",
        description: "Virtual counseling at Empathy Health Clinic brings professional mental health care directly to you through secure, HIPAA-compliant video sessions. Whether you have a busy schedule, transportation challenges, live far from our office, or simply prefer the convenience of virtual care, our therapists provide the same quality treatment online as in person. Research shows telehealth therapy is as effective as in-person for most conditions.",
        whoCanBenefit: "Virtual counseling benefits busy professionals, parents with childcare responsibilities, individuals with transportation limitations, people with mobility issues or health concerns, those living outside the Winter Park area, or anyone preferring the convenience and comfort of home-based therapy. Virtual therapy is effective for anxiety, depression, relationship issues, and most mental health concerns.",
        whatToExpect: "You'll receive a secure link to join your video session from any device with internet and a camera. Find a private, quiet space where you feel comfortable. Sessions are 45-50 minutes, just like in-person therapy. Your therapist can see and hear you clearly, allowing for meaningful therapeutic connection. We use encrypted, HIPAA-compliant platforms to protect your privacy and confidentiality.",
        faqs: JSON.stringify([
          { question: "Is virtual therapy as effective as in-person?", answer: "Yes! Research shows that for most concerns—including anxiety, depression, and relationship issues—virtual therapy is as effective as in-person treatment. Many people find it even more convenient and comfortable." },
          { question: "Do I need special equipment?", answer: "Just a device with internet, camera, and microphone—smartphone, tablet, or computer all work. We'll send you a secure link to join sessions. No special software download required." },
          { question: "What if my internet connection is bad?", answer: "If connection issues occur, we can switch to phone temporarily or reschedule. We also offer in-person appointments if you find virtual sessions aren't working well for you." }
        ]),
        order: 15,
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
