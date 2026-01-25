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
  type BlogPost,
  type InsertBlogPost,
  type PageView,
  type InsertPageView,
  type AnalyticsEvent,
  type InsertAnalyticsEvent,
  type WebVital,
  type InsertWebVital,
  type NewsletterSubscriber,
  type InsertNewsletterSubscriber,
  type Location,
  type InsertLocation,
  type EmailFailure,
  type InsertEmailFailure,
  leads,
  webVitals,
  analyticsEvents,
  pageViews,
  blogPosts,
  emailFailures,
} from "@shared/schema";
import { randomUUID } from "crypto";
import blogPostsData from "./blog-posts-data.json";
import { db } from "./db";
import { eq, sql, and, or, gte, lte, desc } from "drizzle-orm";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // Session store for authentication
  sessionStore: session.Store;

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
  getTeamMemberBySlug(slug: string): Promise<TeamMember | undefined>;
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

  // Location methods
  getAllLocations(): Promise<Location[]>;
  getLocation(id: string): Promise<Location | undefined>;
  getLocationBySlug(slug: string): Promise<Location | undefined>;
  createLocation(location: InsertLocation): Promise<Location>;
  updateLocation(id: string, location: Partial<InsertLocation>): Promise<Location>;
  deleteLocation(id: string): Promise<void>;

  // Lead methods
  createLead(lead: InsertLead): Promise<Lead>;
  getAllLeads(): Promise<Lead[]>;

  // Blog post methods
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: string): Promise<void>;

  // Newsletter subscriber methods
  createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  getAllNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;
  getActiveNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;

  // Analytics methods
  trackPageView(data: InsertPageView): Promise<PageView>;
  getPageViews(startDate?: string, endDate?: string): Promise<PageView[]>;
  getPageViewsByPath(startDate?: string, endDate?: string): Promise<{path: string, count: number}[]>;
  trackEvent(data: InsertAnalyticsEvent): Promise<AnalyticsEvent>;
  getEvents(eventType?: string, startDate?: string, endDate?: string): Promise<AnalyticsEvent[]>;
  getEventCounts(startDate?: string, endDate?: string): Promise<{eventType: string, count: number}[]>;
  getFormConversionMetrics(startDate?: string, endDate?: string): Promise<{
    shortFormStarts: number;
    shortFormSubmissions: number;
    longFormStarts: number;
    longFormSubmissions: number;
    shortFormDropOffRate: number;
    longFormDropOffRate: number;
    totalDropOffRate: number;
  }>;
  trackWebVital(data: InsertWebVital): Promise<WebVital>;
  getWebVitals(metricName?: string): Promise<WebVital[]>;
  getAverageWebVitals(startDate?: string, endDate?: string): Promise<{metricName: string, avgValue: number, rating: string}[]>;
  
  // UTM Analytics methods
  getLeadsByUTMSource(): Promise<{utmSource: string | null, count: number}[]>;
  getLeadsByUTMCampaign(): Promise<{utmCampaign: string | null, count: number}[]>;
  getLeadsByUTMTerm(): Promise<{utmTerm: string | null, count: number}[]>;
  getLeadsByLandingPage(): Promise<{landingPage: string | null, count: number}[]>;
  getPageViewsByUTMSource(): Promise<{utmSource: string | null, count: number}[]>;
  getPageViewsByUTMCampaign(): Promise<{utmCampaign: string | null, count: number}[]>;
  
  // Link Monitor methods
  getPageBounceRates(): Promise<{path: string, views: number, bounces: number, bounceRate: number}[]>;
  
  // Email failure tracking methods
  logEmailFailure(failure: InsertEmailFailure): Promise<EmailFailure>;
  getEmailFailures(resolved?: boolean): Promise<EmailFailure[]>;
  retryEmailFailure(id: string): Promise<EmailFailure>;
  resolveEmailFailure(id: string): Promise<EmailFailure>;
}

export class MemStorage implements IStorage {
  public sessionStore: session.Store;
  private users: Map<string, User>;
  private siteContent: SiteContent | undefined;
  private treatments: Map<string, Treatment>;
  private teamMembers: Map<string, TeamMember>;
  private testimonials: Map<string, Testimonial>;
  private insuranceProviders: Map<string, InsuranceProvider>;
  private therapies: Map<string, Therapy>;
  private conditions: Map<string, Condition>;
  private locations: Map<string, Location>;
  private leads: Map<string, Lead>;
  private newsletterSubscribers: Map<string, NewsletterSubscriber>;
  private pageViews: PageView[];
  private analyticsEvents: AnalyticsEvent[];
  private webVitals: WebVital[];

  constructor() {
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // Prune expired entries every 24h
    });
    this.users = new Map();
    this.treatments = new Map();
    this.teamMembers = new Map();
    this.testimonials = new Map();
    this.insuranceProviders = new Map();
    this.therapies = new Map();
    this.conditions = new Map();
    this.locations = new Map();
    this.leads = new Map();
    this.newsletterSubscribers = new Map();
    this.pageViews = [];
    this.analyticsEvents = [];
    this.webVitals = [];
    this.initializeDefaultContent();
  }

  private initializeDefaultContent() {
    // Initialize default admin user
    const adminId = randomUUID();
    this.users.set(adminId, {
      id: adminId,
      username: "providers@empathyhealthclinic.com",
      password: "Milly2025",
    });

    // Initialize default site content
    this.siteContent = {
      id: randomUUID(),
      heroTitle: "Healing Begins with Empathy",
      heroSubtitle: "Psychiatry, Psychotherapy & Counseling Clinic Serving Orlando and Winter Park, Florida",
      heroImage: "/site-assets/stock_images/professional_therapi_f037aa5d.jpg",
      reviewCount: 65,
      reviewRating: "EXCELLENT",
      footerPhone: "386-848-8751",
      footerEmail: "providers@empathyhealthclinic.com",
      footerAddress: "2281 Lee Rd Suite 102, Winter Park FL",
      aboutText: "At Empathy Health Clinic, our mission is to serve the communities of Orlando and Winter Park, FL, with a range of affordable mental health services. Whether you need to speak with a professional or seek more comprehensive treatment, we can guide you toward the best solution for your needs and well-being.",
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
        description: "A psychiatric evaluation is the cornerstone of effective mental health treatment and provides the essential foundation for your healing journey. At Empathy Health Clinic in Winter Park, FL, our comprehensive psychiatric evaluations go far beyond a simple consultation—they represent a thorough, compassionate assessment designed to understand your unique mental health needs.\n\nDuring your psychiatric evaluation, our board-certified psychiatric providers conduct a detailed clinical interview that explores multiple dimensions of your mental health. We carefully review your current symptoms, their duration and intensity, and how they impact your daily life, relationships, work, and overall functioning. Your medical history receives thorough attention, including past psychiatric treatment, previous medications and their effectiveness, any hospitalizations, and current medical conditions that may affect mental health. Family psychiatric history is examined to identify genetic predispositions to conditions like depression, bipolar disorder, anxiety disorders, or ADHD. We discuss your life circumstances, stressors, support systems, and personal goals to develop a complete picture of your situation.\n\nOur psychiatric evaluation process includes validated assessment tools and screening questionnaires tailored to your specific concerns. These evidence-based instruments help us accurately identify conditions such as major depressive disorder, generalized anxiety disorder, bipolar disorder, PTSD, ADHD, OCD, and other mental health conditions. We also assess for co-occurring disorders, as many people experience multiple conditions simultaneously that require integrated treatment approaches.\n\nThe information gathered during your evaluation allows our psychiatric team to provide an accurate diagnosis based on DSM-5 criteria and develop a personalized, evidence-based treatment plan. This plan may include medication management, psychotherapy referrals, lifestyle modifications, or a combination of approaches tailored specifically to your needs, preferences, and treatment goals. We believe in collaborative care and will discuss all findings and recommendations with you in clear, understandable terms, ensuring you're an active participant in decisions about your mental health treatment. Your psychiatric evaluation sets the stage for effective, targeted interventions that address the root causes of your symptoms and support lasting recovery and wellness.",
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
        slug: "services",
        pageTitle: "Psychiatric Medication Management | Winter Park, FL",
        heroTitle: "Psychiatric Medication Management",
        heroDescription: "Specialized medication management services in Winter Park, FL. Our psychiatrists expertly prescribe and monitor psychiatric medications to help you achieve optimal mental health with minimal side effects.",
        description: "Medication management is often a vital component of effective mental health treatment, offering hope and relief for individuals navigating challenging conditions. At Empathy Health Clinic in Winter Park, our experienced psychiatric providers are committed to helping you achieve greater emotional well-being through personalized care. We specialize in medication management for a wide range of mental health concerns, including depression, anxiety, bipolar disorder, ADHD, and other complex conditions. Our approach is rooted in compassion and collaboration, ensuring that your unique needs, goals, and experiences guide every decision we make.\n\nWhen you begin medication management with us, you can expect a thoughtful and comprehensive process tailored to your specific situation. We start by gaining a deep understanding of your symptoms, medical history, lifestyle, and treatment goals. This allows us to carefully select the most appropriate medications for you, always prioritizing safety and effectiveness. By addressing your mental health challenges with precision, we aim to help you restore balance, improve daily functioning, and regain a sense of control in your life.\n\nAt Empathy Health Clinic, we understand that medications are not a one-size-fits-all solution. That’s why we provide ongoing monitoring and support throughout your treatment journey. Our providers work closely with you to assess how your prescribed medications are affecting your symptoms, mood, and overall well-being. If adjustments are needed, we make them promptly and thoughtfully to optimize your results while minimizing potential side effects. This individualized approach ensures that your treatment remains aligned with your evolving needs, whether you’re managing a longstanding condition or addressing new mental health challenges.\n\nMedication management can empower you to overcome obstacles that may feel insurmountable on your own. For many patients, it serves as a foundation for healing and growth, often complementing other therapeutic approaches such as counseling or lifestyle changes. Our team is here to guide you through this process, offering expertise and empathy every step of the way. We believe in fostering open communication, creating a safe environment where you can express concerns, ask questions, and feel supported as you navigate your mental health journey.\n\nAt our Winter Park clinic, we are dedicated to providing compassionate, evidence-based care that helps you live a more fulfilling and balanced life. Whether you’re seeking relief from persistent symptoms or exploring new treatment options, medication management could play a meaningful role in achieving your goals. Let us partner with you as you take this important step toward improved mental health.",
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
        description: "Depression is a complex and challenging mental health condition that affects millions of people each year, but it is also highly treatable with the right care and support. At Empathy Health Clinic in Winter Park, we take a personalized and compassionate approach to depression treatment, offering evidence-based solutions designed to help you regain control of your life and improve your emotional well-being. Our experienced team understands that depression is not a personal failing but a medical condition that requires specialized attention, and we are dedicated to walking alongside you on your journey to recovery.\n\nWhen you seek depression treatment at Empathy Health Clinic, you can expect a comprehensive and individualized approach tailored to your unique needs. We incorporate a combination of medication management, psychotherapy, and lifestyle interventions to address the many facets of depression. If medication is a suitable option for you, our skilled providers will work closely with you to find the right prescription and dosage to alleviate symptoms like persistent sadness, fatigue, loss of interest in activities, and difficulty concentrating. We monitor your progress carefully, ensuring that your treatment plan is continually adjusted to maximize its effectiveness and minimize any side effects.\n\nPsychotherapy is another powerful tool in managing depression, and at Empathy Health Clinic, we offer a range of therapeutic approaches to support your mental health. Whether you benefit from cognitive-behavioral therapy (CBT) to challenge negative thought patterns, interpersonal therapy to enhance relationships, or other evidence-based modalities, our therapists provide a safe and nonjudgmental environment to help you process emotions, build resilience, and rediscover hope. We also emphasize the importance of lifestyle changes, such as incorporating physical activity, improving sleep hygiene, and practicing mindfulness, which can complement medical and therapeutic interventions to promote long-term wellness.\n\nAt Empathy Health Clinic, we believe that healing begins with understanding and support. From the moment you connect with us, our compassionate team is here to listen, guide, and empower you. We know that living with depression can feel isolating, but you do not have to face it alone. Our goal is to provide you with the tools, resources, and encouragement you need to move forward and embrace life with renewed energy and optimism.\n\nIf you or someone you care about is struggling with depression, Empathy Health Clinic in Winter Park is here to help. Reach out today to take the first step toward brighter days and a healthier, happier you.",
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
        slug: "anxiety-therapy",
        pageTitle: "Anxiety Treatment in Winter Park, FL | Anxiety Disorder Care",
        heroTitle: "Expert Anxiety Treatment",
        heroDescription: "Comprehensive anxiety treatment in Winter Park, FL. Our specialists provide evidence-based therapy and medication management for all types of anxiety disorders, helping you find relief and peace of mind.",
        description: "Anxiety disorders are among the most common mental health conditions, affecting millions of individuals, yet they are also highly treatable. At Empathy Health Clinic in Winter Park, we understand how overwhelming anxiety can feel and are dedicated to helping you regain control of your life. Whether you’re dealing with generalized anxiety disorder (GAD), panic disorder, social anxiety, or specific phobias, our compassionate team offers tailored anxiety treatment to address your unique needs and guide you toward lasting relief.\n\nOur approach begins with understanding you as an individual. Anxiety manifests differently for everyone; for some, it may involve persistent worry or racing thoughts, while others may experience physical symptoms such as a rapid heartbeat, difficulty breathing, or gastrointestinal distress. At Empathy Health Clinic, we take the time to explore how anxiety is affecting your daily life, relationships, and overall mental health. By creating a safe, supportive environment, we aim to help you feel heard and understood as we work together toward effective solutions.\n\nOur anxiety treatment strategies are evidence-based and designed to empower you. We utilize proven therapies such as cognitive-behavioral therapy (CBT), which focuses on identifying and reshaping negative thought patterns that contribute to anxiety. CBT is highly effective in helping you develop healthier coping mechanisms, reduce excessive worry, and build resilience in the face of stress. For individuals who may require additional support, we offer medication management as part of a comprehensive treatment plan. When appropriate, medication can help regulate brain chemistry and ease symptoms, allowing you to focus on progress in therapy and daily life.\n\nChoosing anxiety treatment at Empathy Health Clinic means prioritizing your mental health and investing in a brighter future. Our skilled clinicians are committed to helping you reduce anxiety symptoms, improve emotional well-being, and restore balance in your life. Through consistent care, you can expect to feel more equipped to face challenges, enjoy meaningful connections, and engage in activities that once felt out of reach due to anxiety.\n\nLocated in the heart of Winter Park, Empathy Health Clinic is here to support you every step of the way. We believe that with the right guidance and treatment, you can overcome anxiety and achieve the peace of mind you deserve. Let us help you move forward with confidence, one step at a time. Reach out today to begin your journey toward healing and discover the difference personalized care can make in your mental health.",
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
        title: "ADHD Testing & Evaluation",
        shortDescription: "Expert ADHD testing, diagnosis, and treatment in Winter Park. Same-week appointments available.",
        icon: "Activity",
        slug: "adhd-treatment",
        pageTitle: "ADHD Testing Near Me Orlando FL | ADHD Evaluation Winter Park",
        heroTitle: "ADHD Testing Near You in Orlando & Winter Park",
        heroDescription: "Looking for ADHD testing near you in Orlando? Our board-certified ADHD specialists provide comprehensive ADHD evaluations, accurate diagnosis, and personalized treatment for children, teens, and adults. Same-week appointments available. Most insurance accepted. Call 386-848-8751 today.",
        description: "If you're struggling with focus, organization, or completing tasks, it may feel like these challenges are constantly holding you back in your daily life. At Empathy Health Clinic in Winter Park, FL—serving Orlando, Maitland, Altamonte Springs, and all of Central Florida—we understand how overwhelming it can be to manage these symptoms without answers or support. That's why we offer comprehensive ADHD Testing & Evaluation services designed to give you clarity, confidence, and a path forward. Whether you suspect ADHD or are seeking a second opinion, our caring team of mental health professionals is here to guide you every step of the way.\n\n## ADHD Evaluation Process in Orlando\n\nSearching for \"ADHD evaluation near me\" in Orlando? Our board-certified ADHD specialists provide thorough diagnostic assessments for children, teens, and adults throughout the Greater Orlando area. An ADHD evaluation is more than just a simple screening—it's a comprehensive diagnostic assessment that examines your attention, focus, impulse control, and executive functioning through evidence-based clinical tools and detailed interviews.\n\nOur ADHD diagnostic process in Orlando includes:\n\n**Clinical Interview:** We begin your ADHD evaluation with an in-depth discussion of your symptoms, medical history, family psychiatric history, and how ADHD symptoms impact your daily life at work, school, or home. This comprehensive interview helps us understand your unique challenges and rule out other conditions that may mimic ADHD, such as anxiety, depression, or sleep disorders.\n\n**Standardized ADHD Rating Scales:** Our Orlando ADHD specialists use validated assessment tools specifically designed to measure ADHD symptoms in children and adults. These evidence-based rating scales help us objectively evaluate inattention, hyperactivity, and impulsivity based on DSM-5 diagnostic criteria.\n\n**Behavioral Observations:** During your assessment, our trained clinicians observe patterns in attention, focus, and behavior that may indicate ADHD. For children and teens, we may also utilize collateral reports from teachers and parents to understand how symptoms present across different settings.\n\n**Computer-Based Attention Testing:** When appropriate, we may use computerized continuous performance tests to measure sustained attention, impulse control, and response variability. These objective measures provide additional data to support an accurate ADHD diagnosis.\n\n**Differential Diagnosis:** ADHD symptoms can overlap with anxiety, depression, sleep disorders, or learning disabilities. Our comprehensive diagnostic approach in Orlando ensures we identify the correct diagnosis so you receive the most effective treatment. We also assess for co-occurring conditions that may require integrated treatment.\n\n**Functional Impairment Analysis:** Beyond symptom identification, we evaluate how ADHD affects your academic performance, work productivity, relationships, and daily functioning. Understanding the real-world impact of ADHD helps us develop treatment recommendations tailored to your specific needs and goals.\n\n## Why Choose Empathy Health Clinic for ADHD Evaluation in Orlando?\n\nOur ADHD psychiatrists and specialists are highly trained in using evidence-based assessment tools to deliver accurate diagnoses for children, teens, and adults across Orlando and Central Florida. You can expect a thorough, personalized evaluation tailored to your unique needs. From identifying symptoms to understanding how ADHD may be impacting your life, we take the time to listen to your concerns and provide meaningful insights. We don't just focus on diagnosis; we focus on helping you understand yourself better and empowering you to thrive. ADHD testing and evaluation at Empathy Health Clinic is not a one-size-fits-all approach—it's a compassionate process designed around you.\n\nFollowing your diagnostic assessment, our team works closely with you to develop a treatment plan that fits your lifestyle and goals. Treatment options may include FDA-approved ADHD medication management, behavioral strategies, coaching services, and practical tools to improve focus, organization, and emotional regulation. We believe effective ADHD treatment goes beyond symptom management—it's about helping you build the skills and confidence needed to succeed at school, work, and home. Our mental health specialists provide ongoing support and follow-up care, ensuring that your treatment evolves as your needs change.\n\n## Convenient ADHD Evaluation Appointments in Orlando\n\nScheduling ADHD testing and evaluation at Empathy Health Clinic is simple and convenient for Orlando residents. We accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, and UnitedHealthcare, and offer same-week appointments, making it easy for you to get the comprehensive ADHD assessment you need without unnecessary delays. Our Winter Park location is easily accessible from downtown Orlando, College Park, Baldwin Park, Lake Nona, UCF, Oviedo, and surrounding Central Florida communities. \n\nWe also offer telehealth ADHD evaluations for patients throughout Florida who prefer virtual appointments. Whether you choose in-person or online assessment, you'll receive the same high-quality, evidence-based diagnostic evaluation from our experienced ADHD specialists. Our team understands the challenges ADHD can bring to daily life, and we are committed to making this evaluation process as seamless and stress-free as possible for children, teens, and adults.\n\nAt Empathy Health Clinic, we're more than just a mental health clinic—we're a partner in your wellness journey. If you're ready to take the first step toward understanding and managing ADHD, contact us today at 386-848-8751 to schedule your ADHD evaluation in Orlando. You deserve compassionate care and effective solutions that help you lead a fulfilling, balanced life. Let us help you unlock your potential and take control of your mental health serving Orlando, Winter Park, and Central Florida.\n",
        whoCanBenefit: "Our ADHD testing and evaluation helps anyone in Winter Park, Orlando, or Central Florida experiencing: difficulty focusing or paying attention, restlessness or hyperactivity, impulsivity, trouble completing tasks, poor time management, academic or work performance problems, forgetfulness, or relationship difficulties due to ADHD symptoms. We provide ADHD assessments for children (ages 6+), teens, college students, and adults who suspect undiagnosed ADHD.",
        whatToExpect: "Your ADHD evaluation begins with a comprehensive psychiatric assessment by our board-certified specialists. We review your medical history, symptoms, and how ADHD affects your daily life. Testing includes standardized ADHD rating scales, behavioral assessments, and may involve input from family members or teachers. Most patients receive their ADHD diagnosis and treatment plan during the same visit or within one week. If diagnosed with ADHD, we'll discuss treatment options including FDA-approved ADHD medications (stimulants and non-stimulants), behavioral strategies, coaching, and ongoing medication management to ensure optimal results.",
        faqs: JSON.stringify([
          { question: "How much does ADHD testing cost in Winter Park?", answer: "ADHD evaluation costs vary by insurance. We accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, and Humana. Self-pay rates available. Call 386-848-8751 for pricing." },
          { question: "How long does ADHD testing take?", answer: "A comprehensive ADHD evaluation typically takes 60-90 minutes. Most patients receive their diagnosis and treatment plan the same day or within one week of their assessment." },
          { question: "Do I need a referral for ADHD testing?", answer: "No referral needed! You can schedule your ADHD evaluation directly with our Winter Park specialists. We offer same-week appointments for new patients." },
          { question: "Can adults get tested for ADHD?", answer: "Absolutely! Many adults have undiagnosed ADHD from childhood. We specialize in adult ADHD testing and treatment. Adult ADHD is very common and highly treatable with proper diagnosis and care." },
          { question: "What makes a good ADHD specialist?", answer: "Look for board-certified psychiatrists with extensive ADHD experience. Our specialists have years of experience diagnosing and treating ADHD in both children and adults, use evidence-based assessment tools, and provide ongoing medication management." },
          { question: "Do you accept insurance for ADHD testing?", answer: "Yes! We accept most major insurance plans. Contact our Winter Park office at 386-848-8751 to verify your coverage before your ADHD evaluation." }
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
        description: "At Empathy Health Clinic, we recognize the profound impact bipolar disorder can have on your daily life, relationships, and overall well-being. Living with the unpredictable mood swings and emotional challenges of bipolar disorder can feel overwhelming, but you don’t have to navigate it alone. Our dedicated team, located in Winter Park, is committed to providing compassionate and comprehensive Bipolar Disorder Treatment designed to empower you to regain control and achieve greater stability. We believe that every person deserves to live a balanced, fulfilling life, and we’re here to help you take meaningful steps toward better mental health.\n\nOur specialized treatment program for bipolar disorder combines evidence-based approaches tailored to your individual needs. Medication management plays a key role in reducing the intensity of mood episodes and stabilizing your emotional state. We work closely with you to identify the medications that best support your unique situation, ensuring effective symptom management while minimizing side effects. By working together, we strive to help you feel more in control, allowing you to focus on the aspects of life that matter most to you.\n\nTherapy is another cornerstone of our approach, offering a safe and supportive space for you to better understand your emotions, triggers, and behaviors. Through individualized counseling sessions, our skilled mental health professionals explore coping strategies and techniques to help you navigate the ups and downs of bipolar disorder. Whether you’re managing depressive lows, manic highs, or the complexities of mixed episodes, therapy can help you develop tools to foster emotional resilience and improve your quality of life. We aim to create a partnership built on trust and understanding, ensuring you feel heard and supported at every step of your journey.\n\nAt Empathy Health Clinic, we know that no two individuals experience bipolar disorder in the same way. That’s why we emphasize personalized care, taking the time to fully understand your unique challenges, goals, and preferences. When you choose our Bipolar Disorder Treatment program in Winter Park, you can expect a compassionate team that prioritizes your needs, respects your experiences, and works collaboratively with you to create a treatment plan that aligns with your life. Our holistic approach not only addresses the symptoms of bipolar disorder but also seeks to improve your overall mental health, allowing you to thrive in ways you may not have thought possible.\n\nIf you are ready to take the next step toward healing and stability, Empathy Health Clinic is here to support you. Together, we can help you manage bipolar disorder, so you can focus on building a brighter, healthier future.",
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
        description: "Our Orlando OCD specialists help patients understand their symptoms and develop strategies that support clarity and daily function.\n\nObsessive-Compulsive Disorder (OCD) can significantly impact your daily life, making it difficult to feel in control of your thoughts and actions. At Empathy Health Clinic in Winter Park, we understand how overwhelming OCD can be, and we are here to provide effective, compassionate care tailored to your needs. Our specialized OCD treatment combines evidence-based therapies and medication management to help you break free from the persistent cycle of obsessions and compulsions, allowing you to regain a sense of peace and balance in your life.\n\nOne of the primary approaches we use is exposure and response prevention (ERP) therapy, widely recognized as the gold standard for OCD treatment. ERP involves gradually and safely exposing you to situations or thoughts that trigger your obsessions while teaching you how to resist the compulsive behaviors that often follow. This therapy empowers you to retrain your brain, reducing the distress associated with obsessive thoughts and eliminating the need for compulsions. Over time, you’ll develop healthier coping mechanisms and learn how to navigate challenges without being controlled by OCD symptoms.\n\nMedication management can also play an important role in your treatment plan. For some individuals, medications such as selective serotonin reuptake inhibitors (SSRIs) can help regulate the chemical imbalances in the brain that contribute to OCD symptoms. At Empathy Health Clinic, our experienced providers take a personalized approach to medication management, working closely with you to determine the right options for your unique needs and ensuring that any prescribed medications are closely monitored for effectiveness and tolerability.\n\nWhen you begin OCD treatment at Empathy Health Clinic, you can expect a warm, welcoming environment where your mental health journey is treated with the utmost care and respect. Our providers are deeply experienced in working with individuals affected by OCD, and we prioritize building a trusting relationship with you to create a safe space for healing and growth. We understand that seeking help can feel daunting, but we are here to support you every step of the way with compassion, understanding, and proven treatment methods.\n\nYou don’t have to let OCD define your life. At our Winter Park clinic, we are committed to helping you break free from the grip of obsessive thoughts and compulsive behaviors, so you can focus on the things that truly matter to you. Reach out to Empathy Health Clinic today and take the first step toward reclaiming your mental health and well-being.",
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
        description: "Our Orlando trauma-informed team supports individuals coping with PTSD, intrusive thoughts, stress reactions, and recovery needs.\n\nPost-Traumatic Stress Disorder (PTSD) is a complex mental health condition that can arise after experiencing or witnessing deeply distressing events. It often brings feelings of fear, anxiety, and emotional numbness that can interfere with your daily life, relationships, and sense of self. At Empathy Health Clinic in Winter Park, we understand how overwhelming PTSD can feel, and we are dedicated to helping you regain control and find relief. Our specialized PTSD treatment is designed to meet your unique needs with compassion, care, and evidence-based approaches.\n\nAt Empathy Health Clinic, our trauma-informed care prioritizes creating a safe, nonjudgmental environment where you can begin to heal. Our team of experienced mental health professionals uses proven therapeutic techniques, such as trauma-focused cognitive behavioral therapy (TF-CBT) and Eye Movement Desensitization and Reprocessing (EMDR). These methods are highly effective in helping you process traumatic memories, reduce the intensity of emotional triggers, and develop healthier ways to cope. TF-CBT works to address negative thought patterns and emotional responses, while EMDR helps reframe distressing memories and alleviate their impact on your mental health. For individuals who may benefit from additional support, we also offer medication management as part of a comprehensive treatment plan, ensuring you receive the care that best fits your needs.\n\nWhen you choose PTSD treatment at Empathy Health Clinic, you can expect a personalized approach tailored to your experiences and goals. We believe healing is not a one-size-fits-all process, which is why we take the time to understand your story and work collaboratively with you to build a treatment plan that feels right for you. From your first visit, you will be supported by a compassionate team that prioritizes your comfort and emotional well-being. Our goal is to empower you to process trauma in a way that feels safe and manageable, helping you move toward a life of greater resilience and peace.\n\nPTSD can feel isolating, but you don’t have to face it alone. At our Winter Park clinic, we are committed to walking alongside you in your healing journey. With the right care and support, it is possible to reduce PTSD symptoms, strengthen your coping skills, and rediscover hope. Let us help you take the first step toward lasting recovery—contact Empathy Health Clinic today to learn more about our PTSD treatment options and start your path to healing.",
        whoCanBenefit: "Our PTSD treatment helps individuals experiencing flashbacks, nightmares, avoidance of trauma reminders, hypervigilance, emotional numbness, or difficulty trusting others after traumatic experiences. Whether you've experienced military combat, assault, accidents, natural disasters, or other trauma, we provide specialized care for recovery.",
        whatToExpect: "Treatment begins with a comprehensive trauma assessment in a safe, supportive environment. We'll develop a personalized treatment plan that may include trauma-focused therapy, EMDR (Eye Movement Desensitization and Reprocessing), medication for symptoms like anxiety and insomnia, and skills training for emotional regulation. Recovery is possible, and we're here to support you every step of the way.",
        faqs: JSON.stringify([
          { question: "Will I have to talk about my trauma?", answer: "Trauma-focused therapy does involve processing traumatic memories, but we go at your pace in a safe, controlled manner. Some treatments like EMDR can be effective without detailed verbal descriptions of trauma." },
          { question: "Can PTSD be cured?", answer: "While PTSD is a chronic condition, many people achieve full recovery with proper treatment. Evidence-based treatments like TF-CBT and EMDR have high success rates in significantly reducing or eliminating PTSD symptoms." },
          { question: "How long does PTSD treatment take?", answer: "Treatment duration varies, but many people see significant improvement within 3-6 months of trauma-focused therapy. Some individuals benefit from longer-term treatment, especially if they've experienced multiple traumas." }
        ]),
        order: 8,
      },
      {
        title: "ESA Letter",
        shortDescription: "Emotional Support Animal documentation for housing and travel accommodations.",
        icon: "Heart",
        slug: "services",
        pageTitle: "ESA Letter in Winter Park, FL | Emotional Support Animal Letter",
        heroTitle: "Emotional Support Animal (ESA) Letter",
        heroDescription: "Get your legitimate ESA letter from licensed mental health professionals in Winter Park, FL. Our compassionate providers evaluate your need for an emotional support animal and provide proper documentation for housing and travel accommodations.",
        description: "An Emotional Support Animal (ESA) can be an invaluable part of your mental health journey, offering comfort and stability during challenging times. For individuals living with conditions such as anxiety, depression, PTSD, or other emotional disorders, an ESA provides a consistent source of companionship and support that can enhance emotional well-being. At Empathy Health Clinic in Winter Park, we understand how vital these connections can be in promoting healing and improving your overall quality of life. Our licensed mental health professionals specialize in evaluating whether an ESA could complement your treatment plan, ensuring that this option aligns with your specific needs and therapeutic goals.\n\nYour mental health is unique, and so is our approach to assessing the potential benefits of an Emotional Support Animal. During a compassionate, personalized evaluation, our clinicians take the time to understand your mental health history, current challenges, and treatment progress. We listen to your experiences and explore how an ESA might contribute to your emotional stability and sense of security. If an ESA is deemed appropriate for you, we provide legitimate ESA Letters that meet the legal requirements outlined in the Fair Housing Act and Air Carrier Access Act. These letters grant you the ability to keep your support animal in housing and travel with them, even in situations where pets are typically restricted.\n\nAn ESA can help reduce feelings of loneliness, provide a calming presence, and foster a sense of purpose, all of which are vital components of effective mental health care. Whether you’re managing daily stress or navigating more complex emotional challenges, the unconditional love and companionship of an ESA can play a powerful role in your healing process. At Empathy Health Clinic, we are committed to ensuring that your experience with an ESA is seamless and beneficial, empowering you to live a more fulfilling and balanced life.\n\nWhen you visit our Winter Park clinic to explore the possibility of an ESA, you can expect empathetic guidance and professional care every step of the way. We pride ourselves on creating a safe, welcoming environment where your needs are prioritized. Our team works with you to ensure your ESA Letter is tailored to your situation, offering peace of mind and the ability to access the support you need. Let us help you discover how an Emotional Support Animal can transform your mental health journey and provide comfort, connection, and hope as you move forward.",
        whoCanBenefit: "Our ESA letter service helps individuals with diagnosed mental health conditions such as anxiety, depression, PTSD, panic disorder, or other conditions where an emotional support animal would provide therapeutic benefit. You must have a legitimate mental health condition and a genuine need for an ESA - we do not provide letters for convenience or to bypass pet policies.",
        whatToExpect: "Your ESA evaluation includes a clinical assessment with a licensed mental health professional to discuss your mental health condition, treatment history, and how an emotional support animal would specifically help your symptoms. If clinically appropriate, we'll provide a legitimate ESA letter that includes all required elements for housing and travel accommodations. The process typically takes one appointment.",
        faqs: JSON.stringify([
          { question: "Is an ESA letter legitimate?", answer: "Yes! Our ESA letters are provided by licensed mental health professionals after a proper clinical evaluation. They comply with Fair Housing Act requirements and are recognized for housing accommodations." },
          { question: "What's the difference between an ESA and a service dog?", answer: "Service dogs are trained to perform specific tasks for people with disabilities and have public access rights. ESAs provide emotional support and companionship but don't require special training and have different legal protections - primarily for housing and air travel." },
          { question: "Will my landlord have to accept my ESA?", answer: "Under the Fair Housing Act, landlords must make reasonable accommodations for ESAs, even in no-pet housing. However, you need a legitimate ESA letter from a licensed healthcare provider who has evaluated you. There may be exceptions for certain housing types." },
          { question: "How long does an ESA letter last?", answer: "ESA letters are typically valid for one year. We recommend annual re-evaluation to ensure your ESA continues to provide therapeutic benefit and to maintain current documentation." }
        ]),
        order: 9,
      },
    ];

    defaultTreatments.forEach((treatment) => {
      const id = randomUUID();
      this.treatments.set(id, { id, ...treatment });
    });

    // Initialize default team members
    const defaultTeamMembers: InsertTeamMember[] = [
      {
        name: "Melissa DiPaolis",
        credentials: "MSN, APRN, FNP-BC",
        image: "/site-assets/providers/image_1761612547677.webp",
        doxyUrl: "https://doxy.me/empathy1",
        slug: "melissa-dipaolis",
        pageTitle: "Melissa DiPaolis, MSN, APRN, FNP-BC | Family Nurse Practitioner | Winter Park, FL",
        bio: "Melissa DiPaolis is a dedicated Family Nurse Practitioner with extensive experience in providing comprehensive mental health care to patients of all ages. With her warm, compassionate approach and clinical expertise, Melissa helps individuals navigate their mental health journey with confidence and support.",
        specialties: "Depression, Anxiety, ADHD, Medication Management, Wellness Care",
        education: "Master of Science in Nursing (MSN), Board Certified Family Nurse Practitioner (FNP-BC)",
        approach: "Melissa believes in treating the whole person, not just symptoms. Her patient-centered approach combines evidence-based medication management with lifestyle counseling and preventive care. She takes time to listen, understand each patient's unique circumstances, and develop personalized treatment plans that promote long-term wellness.",
        order: 1,
      },
      {
        name: "Marjorie Felix",
        credentials: "MSN, APRN, PMHNP-BC",
        image: "/site-assets/providers/image_1761613541242.webp",
        doxyUrl: "https://doxy.me/empathy1",
        slug: "marjorie-felix",
        pageTitle: "Marjorie Felix, MSN, APRN, PMHNP-BC | Psychiatric Nurse Practitioner | Winter Park, FL",
        bio: "Marjorie Felix is a board-certified Psychiatric Mental Health Nurse Practitioner with a passion for helping individuals achieve mental wellness. Known for her holistic approach and genuine care, Marjorie provides comprehensive psychiatric evaluations and medication management for a wide range of mental health conditions.",
        specialties: "Depression, Anxiety, Bipolar Disorder, PTSD, Medication Management, Holistic Mental Health",
        education: "Master of Science in Nursing (MSN), Board Certified Psychiatric Mental Health Nurse Practitioner (PMHNP-BC)",
        approach: "Marjorie takes a holistic, patient-centered approach to mental health care. She spends quality time with each patient to understand their unique needs, medical history, and treatment goals. Her comprehensive evaluations and personalized treatment plans combine medication management with lifestyle recommendations to support overall mental and physical wellness.",
        order: 2,
      },
      {
        name: "Marsha D. Hassell",
        credentials: "MS, PLMHC",
        image: "/site-assets/providers/image_1761613347362.webp",
        doxyUrl: "https://doxy.me/empathy1",
        slug: "marsha-hassell",
        pageTitle: "Marsha D. Hassell, MS, PLMHC | Licensed Mental Health Counselor | Winter Park, FL",
        bio: "Marsha D. Hassell is a Pre-Licensed Mental Health Counselor dedicated to providing compassionate, effective therapy to individuals facing life's challenges. With her empathetic approach and evidence-based techniques, Marsha helps clients develop coping skills and achieve meaningful personal growth.",
        specialties: "Individual Therapy, Anxiety, Depression, Life Transitions, Stress Management, CBT",
        education: "Master of Science in Mental Health Counseling (MS), Pre-Licensed Mental Health Counselor (PLMHC)",
        approach: "Marsha believes in creating a safe, non-judgmental therapeutic space where clients can explore their thoughts and feelings openly. She uses evidence-based approaches including Cognitive Behavioral Therapy (CBT) and mindfulness techniques to help clients develop practical skills for managing stress, anxiety, and depression. Her collaborative approach empowers clients to take an active role in their healing journey.",
        order: 3,
      },
      {
        name: "Alex Regan",
        credentials: "Psychiatric PA-C, Medical Director",
        image: "/site-assets/providers/image_1761612254512.webp",
        doxyUrl: "https://doxy.me/empathy1",
        slug: "alex-regan",
        pageTitle: "Alex Regan, PA-C, Medical Director | Psychiatric Physician Assistant | Winter Park, FL",
        bio: "Alex Regan is a skilled Psychiatric Physician Assistant and Medical Director with a commitment to providing exceptional mental health care. With expertise in medication management and psychiatric evaluations, Alex helps patients achieve symptom relief and improve their quality of life through personalized treatment plans.",
        specialties: "Depression, Anxiety, ADHD, Medication Management, Psychiatric Evaluation",
        education: "Physician Assistant Studies, Board Certified Physician Assistant (PA-C), Specialized training in Psychiatry",
        approach: "Alex provides thorough psychiatric evaluations and evidence-based medication management with a focus on patient education and shared decision-making. She takes time to explain treatment options, monitor progress carefully, and adjust medications as needed to ensure optimal outcomes with minimal side effects. Her approachable demeanor helps patients feel comfortable discussing their mental health concerns.",
        order: 4,
      },
      {
        name: "Dr. Robert Glenn",
        credentials: "MD, Supervising Physician",
        image: "/site-assets/providers/dr_glenn_headshot_square_1761613083513.webp",
        doxyUrl: "https://doxy.me/empathy1",
        slug: "dr-robert-glenn",
        pageTitle: "Dr. Robert Glenn, MD | Supervising Physician | Winter Park, FL",
        bio: "Dr. Robert Glenn is a compassionate physician with extensive experience helping individuals overcome mental health challenges. As our Supervising Physician, Dr. Glenn provides medical oversight and ensures the highest quality of care across our practice.",
        specialties: "Medical Oversight, Individual Therapy, Depression, Anxiety, Trauma, Relationship Issues",
        education: "Doctor of Medicine (MD)",
        approach: "Dr. Glenn employs an integrative therapeutic approach, drawing from CBT, psychodynamic therapy, and solution-focused techniques. He creates a collaborative therapeutic relationship where clients feel heard, understood, and empowered. Dr. Glenn helps clients identify patterns, develop coping strategies, and work toward their personal goals in a supportive, non-judgmental environment.",
        order: 5,
      },
      {
        name: "Karla McLeod",
        credentials: "Licensed Mental Health Counselor",
        image: "/site-assets/providers/carla_headshot_square_v2_1761619702991.webp",
        doxyUrl: "https://doxy.me/empathy1",
        slug: "karla-mcleod",
        pageTitle: "Karla McLeod, LMHC | Licensed Mental Health Counselor | Winter Park, FL",
        bio: "Karla McLeod is an experienced Licensed Mental Health Counselor who brings warmth, empathy, and clinical expertise to her therapeutic work. Karla is passionate about helping clients discover their inner strength and develop the tools they need to live more fulfilling lives.",
        specialties: "Individual Therapy, Anxiety, Depression, Self-Esteem, Life Transitions, Mindfulness",
        education: "Master's degree in Mental Health Counseling, Licensed Mental Health Counselor (LMHC)",
        approach: "Karla believes therapy should be a collaborative journey of self-discovery and growth. She integrates various therapeutic approaches including CBT, mindfulness-based techniques, and person-centered therapy to meet each client's unique needs. Karla creates a warm, accepting space where clients can explore their thoughts and feelings while developing practical skills for managing life's challenges.",
        order: 7,
      },
      {
        name: "Christine Orr",
        credentials: "LCSW",
        image: "/site-assets/providers/image_1761614480890.webp",
        doxyUrl: "https://doxy.me/empathy1",
        slug: "christine-orr",
        pageTitle: "Christine Orr, LCSW | Licensed Clinical Social Worker | Winter Park, FL",
        bio: "Christine Orr is a compassionate Licensed Clinical Social Worker with extensive experience in mental health treatment. Known for her empathetic listening and practical guidance, Christine helps clients navigate depression, anxiety, and life transitions with evidence-based therapeutic approaches.",
        specialties: "Individual Therapy, Depression, Anxiety, Grief and Loss, Life Transitions, CBT",
        education: "Master of Social Work (MSW), Licensed Clinical Social Worker (LCSW)",
        approach: "Christine provides a warm, supportive therapeutic environment where clients feel safe to explore their challenges and work toward positive change. She uses evidence-based approaches including Cognitive Behavioral Therapy and solution-focused techniques to help clients develop insight, build coping skills, and achieve their therapeutic goals. Christine is particularly skilled in helping clients navigate grief, loss, and major life transitions.",
        order: 8,
      },
      {
        name: "Monique Walen",
        credentials: "MSN, APRN, PMHNP-BC",
        image: "/site-assets/providers/image_1761603840896.webp",
        doxyUrl: "https://doxy.me/empathy1",
        slug: "monique-walen",
        pageTitle: "Monique Walen, MSN, APRN, PMHNP-BC | Psychiatric Nurse Practitioner | Winter Park, FL",
        bio: "Monique Walen is a board-certified Psychiatric Mental Health Nurse Practitioner with a strong commitment to providing compassionate, high-quality mental health care. With her clinical expertise and caring approach, Monique helps patients manage complex psychiatric conditions and improve their overall quality of life.",
        specialties: "Medication Management, Depression, Anxiety, Bipolar Disorder, ADHD, Psychiatric Evaluation",
        education: "Master of Science in Nursing (MSN), Board Certified Psychiatric Mental Health Nurse Practitioner (PMHNP-BC)",
        approach: "Monique provides comprehensive psychiatric evaluations and expert medication management with a focus on building strong therapeutic relationships. She takes time to understand each patient's unique situation, carefully monitors treatment progress, and adjusts medications to optimize effectiveness while minimizing side effects. Her compassionate, patient-centered approach helps individuals achieve mental wellness and live fuller lives.",
        order: 9,
      },
      {
        name: "Batese Mitchell",
        credentials: "LMHC",
        image: "/site-assets/providers/Headshot (1)_1764630281211.jpg",
        doxyUrl: "https://doxy.me/empathy1",
        slug: "batese-mitchell",
        pageTitle: "Batese Mitchell, LMHC | Licensed Mental Health Counselor | Winter Park, FL",
        bio: "Batese Mitchell is a Licensed Mental Health Counselor who is dedicated to providing compassionate, evidence-based care that supports healing and personal growth. Batese is committed to creating a warm, nonjudgmental space where clients feel empowered and safe to explore their experiences.",
        specialties: "Individual Therapy, Anxiety, Depression and Mood Disorders, Emotional Regulation, Psychosocial Stressors",
        education: "Master's Degree in Mental Health Counseling, Licensed Mental Health Counselor (LMHC)",
        approach: "Batese uses a person-centered, strength-based approach grounded in evidence-based practices such as Cognitive Behavioral Therapy and Mindfulness techniques. Batese focuses on helping clients build insight, develop healthy coping skills, and create meaningful change at a pace that feels comfortable and empowering for them. Batese creates a collaborative, warm and supportive space aimed at helping clients feel heard, understood and equipped to navigate life's challenges.",
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
        profileImage: null, // Will use initials
        order: 1,
      },
      {
        name: "Cindy K.",
        date: "October 1, 2025",
        text: "Empathy Health Clinic is great! From Chantal in the office to the Medication Managers Tony & Monique, to the quality therapists, especially Christine Orr, I would highly recommend Empathy to anyone.",
        rating: 5,
        profileImage: null, // Will use initials
        order: 2,
      },
      {
        name: "Louise",
        date: "September 3, 2025",
        text: "Excellent psych medical management. Depression and anxiety are so much more manageable, fewer episodes, finally sleeping through the night. Alex provides exceptional care.",
        rating: 5,
        profileImage: null, // Will use initials
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
        logo: "/site-assets/logos/bluecross.webp",
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
        logo: "/site-assets/logos/aetna.webp",
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
        logo: "/site-assets/logos/optum.webp",
        slug: "optum-coverage",
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
        logo: "/site-assets/logos/cigna.webp",
        slug: "cigna-coverage",
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
        logo: "/site-assets/logos/adventhealth.webp",
        slug: "adventhealth-coverage",
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
        logo: "/site-assets/logos/umr.webp",
        slug: "umr-coverage",
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
        logo: "/site-assets/logos/unitedhealthcare.webp",
        slug: "unitedhealthcare-coverage",
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
        logo: "/site-assets/logos/oscar.webp",
        slug: "oscar-health-coverage",
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
        logo: "/site-assets/logos/firsthealth.jpg",
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
        logo: "/site-assets/logos/medicare.webp",
        slug: "medicare-medicare-coverage",
        pageTitle: "We Accept Medicare - Mental Health Services in Winter Park FL",
        heroTitle: "We Accept Medicare",
        heroDescription: "Expert psychiatry and therapy services for Medicare beneficiaries in Winter Park, FL. Comprehensive mental health care, medication management, and anxiety and depression treatment covered by Medicare in the Orlando area.",
        description: "Empathy Health Clinic is proud to serve Medicare beneficiaries with expert psychiatric care. We accept Original Medicare (Part B), Medicare Advantage plans, and Medicare supplemental insurance. Our experienced team works to ensure you receive the mental health treatment you need with your Medicare benefits, making quality psychiatric care accessible and affordable for seniors and eligible individuals.",
        coverageDetails: "Medicare Part B covers outpatient mental health services including psychiatric evaluations (typically 80% coverage after deductible), medication management visits, individual therapy sessions, and telehealth appointments. We accept Original Medicare, Medicare Advantage (Part C) plans from major carriers including Humana, UnitedHealthcare, and Aetna, and Medicare Supplement (Medigap) policies. After you meet your Part B deductible ($240 for 2024), you typically pay 20% of the Medicare-approved amount for outpatient mental health services. Many Medicare Advantage plans offer enhanced mental health benefits with lower copays.",
        faqs: JSON.stringify([
          { question: "Do you accept Medicare?", answer: "Yes, we accept Original Medicare Part B, Medicare Advantage plans, and Medicare Supplement insurance. We're experienced in working with Medicare beneficiaries for comprehensive mental health services." },
          { question: "What Medicare plans do you accept?", answer: "We accept Original Medicare (Part B), Medicare Advantage plans from carriers like Humana, UnitedHealthcare, and Aetna, and Medicare Supplement (Medigap) policies. Call us to verify your specific plan coverage." },
          { question: "What does Medicare cover for mental health?", answer: "Medicare Part B covers 80% of psychiatric evaluations, medication management, individual therapy, and telehealth appointments after you meet your deductible. Mental health services are covered the same as other medical services." },
          { question: "What is my cost with Medicare?", answer: "After meeting your Part B deductible ($240 for 2024), you typically pay 20% of the Medicare-approved amount for outpatient mental health services. Medicare Advantage plans may have different copay structures, often with lower out-of-pocket costs." },
          { question: "Does Medicare cover telehealth mental health services?", answer: "Yes! Medicare covers telehealth appointments for mental health services. You can meet with our psychiatrists and therapists from home via secure video visits, with the same coverage as in-person appointments." }
        ]),
        order: 10 
      },
      { 
        name: "Curative Health", 
        logo: "/site-assets/logos/curative.jpg",
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
        logo: "",
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
        description: "Cognitive Behavioral Therapy (CBT) is a highly effective and evidence-based approach to psychotherapy, recognized for its ability to help individuals navigate a wide range of mental health challenges. At Empathy Health Clinic in Winter Park, we specialize in providing personalized CBT treatment to empower you on your journey toward emotional well-being. Whether you’re struggling with anxiety, depression, stress, or other concerns, our compassionate therapists are here to guide you through this transformative process in a safe and supportive environment.\n\nCBT is centered on the connection between your thoughts, emotions, and behaviors. Often, negative thought patterns can become deeply ingrained, making it difficult to break free from cycles of emotional distress or self-sabotaging behaviors. Through CBT, you’ll work closely with our skilled therapists to identify and understand these patterns. Together, you’ll explore how certain thoughts influence your feelings and actions, uncovering the root causes of your challenges. As you gain insight into these connections, you’ll also learn practical techniques to challenge and reframe unhelpful thoughts, enabling you to respond to situations in healthier and more adaptive ways.\n\nOne of the greatest benefits of Cognitive Behavioral Therapy is its structured and solution-focused nature. Sessions are tailored to your unique needs and goals, ensuring that your treatment aligns with your personal experiences. You’ll engage in collaborative discussions, exercises, and homework assignments designed to reinforce the skills you learn in therapy. Over time, you’ll build a toolkit of strategies to manage stress, regulate emotions, and approach life’s challenges with greater resilience. Many patients find that these skills not only improve their mental health but also lead to enhanced relationships, productivity, and overall quality of life.\n\nAt Empathy Health Clinic, we understand that seeking help for your mental health can feel daunting, but our team is dedicated to providing care that prioritizes your comfort and growth. You can expect a warm and nonjudgmental atmosphere where you feel heard and supported every step of the way. From your first session, we work to create an environment of trust, encouraging open dialogue so that you feel fully engaged in your treatment process. \n\nIf you’re ready to take meaningful steps toward better mental health, Cognitive Behavioral Therapy at Empathy Health Clinic in Winter Park offers a powerful path forward. Let us help you break free from the patterns holding you back and discover a brighter, more balanced future.",
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
        description: "Concentration and Focus Therapy at Empathy Health Clinic in Winter Park offers a compassionate and comprehensive approach to help individuals overcome attention-related challenges and unlock their full potential. Struggling with concentration can impact various aspects of your life, from school or work performance to personal relationships and daily responsibilities. Whether your difficulties stem from ADHD, anxiety, stress, or other mental health factors, our therapy is tailored to address your unique concerns with care and precision. We understand how frustrating and overwhelming it can feel when your mind struggles to stay organized or focused on tasks, and we are here to provide effective solutions that support your mental health and overall well-being.\n\nOur specialized treatment combines evidence-based cognitive training, behavioral strategies, and mindfulness techniques to help you enhance your ability to focus, organize, and complete tasks with greater ease. Through these approaches, you can expect to not only strengthen your concentration skills but also reduce mental distractions and improve your capacity to stay present in the moment. At Empathy Health Clinic, we take the time to fully understand your individual needs and develop personalized strategies that align with your goals. By working together, we aim to build tools that empower you to navigate attention difficulties with confidence and resilience.\n\nThis therapy is available to both children and adults, as struggles with focus and organization can affect individuals of all ages. For children, treatment often incorporates playful and engaging activities designed to foster attention and focus in a supportive environment. For adults, therapy is tailored to address the unique challenges of managing responsibilities, deadlines, and daily stressors that may interfere with concentration. Regardless of your age or background, our approach is rooted in empathy and a deep commitment to helping you achieve measurable improvements in your mental health and daily functioning.\n\nWhen you begin Concentration and Focus Therapy at our Winter Park clinic, you can expect a nurturing and nonjudgmental environment that prioritizes your comfort and growth. Our therapists are dedicated to helping you explore the root causes of your difficulties and develop practical solutions that work for you. With consistent guidance and support, you can experience greater clarity, improved productivity, and an enhanced sense of control over your thoughts and actions. Concentration and Focus Therapy is not just about addressing attention challenges—it’s about empowering you to thrive in every area of your life. At Empathy Health Clinic, we are here to walk alongside you on your journey toward improved mental health and lasting success.",
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
        description: "Grief is a natural yet deeply personal response to loss, and it can often feel overwhelming, isolating, and unpredictable. Whether you’re mourning the death of a loved one, struggling with the end of a meaningful relationship, coping with job loss, or navigating another significant life change, grief can impact every aspect of your mental health and daily functioning. At Empathy Health Clinic in Winter Park, we offer specialized grief counseling services designed to support you through this painful journey with compassion, understanding, and expert care.\n\nWe recognize that no two experiences of grief are the same. Your emotions, thoughts, and reactions are unique to your situation, and our approach honors your individuality. Some days may bring a sense of acceptance, while others may feel weighed down by sadness, anger, or confusion. Our grief counselors provide a safe and nonjudgmental space where you can explore these feelings openly, helping you make sense of your emotions and begin to heal at your own pace.\n\nThrough our grief counseling services, you’ll find support in navigating the complex stages of mourning, whether you are experiencing denial, anger, bargaining, depression, acceptance, or a combination of emotions. We work collaboratively with you to identify coping strategies tailored to your needs, empowering you to face the challenges of loss while fostering emotional resilience. Our counselors integrate evidence-based therapeutic approaches, including cognitive-behavioral therapy (CBT) and mindfulness techniques, to help you manage the emotional toll of grief and rebuild your sense of well-being.\n\nIn addition to addressing the emotional aspects of grief, we help you explore the deeper impacts of loss on your mental health, relationships, and sense of identity. Grief can bring up feelings of guilt, loneliness, or even physical symptoms like fatigue or difficulty concentrating. By engaging in counseling, you can begin to process these challenges constructively, rediscovering purpose and connection in your life.\n\nAt Empathy Health Clinic, we are committed to providing compassionate care to residents of Winter Park and the surrounding areas. Seeking support is not a sign of weakness—it’s a courageous step toward healing. Our team is here to walk alongside you as you navigate this difficult time, offering guidance, understanding, and hope. If you’re ready to take the next step in your journey, our grief counseling services are here to help you regain balance and begin moving forward.",
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
        slug: "therapy",
        pageTitle: "Anger Management Therapy in Winter Park, FL | Control Anger",
        heroTitle: "Anger Management Therapy",
        heroDescription: "Master anger management with professional therapy in Winter Park, FL. Our therapists teach proven techniques to control anger, communicate effectively, and build healthier relationships at home and work.",
        description: "Anger is a natural and necessary emotion, but when it becomes overwhelming or starts to negatively impact your relationships, work, or daily life, it may be a sign that professional support is needed. At Empathy Health Clinic in Winter Park, our anger management program is designed to help you regain control and channel your emotions in healthier, more constructive ways. We understand that anger can stem from a variety of sources, including stress, unresolved trauma, or difficulties in communication, and our goal is to provide you with the tools to address these underlying issues in a safe and supportive environment.\n\nOur specialized anger management program focuses on helping you recognize the triggers that spark intense emotions, whether they stem from external circumstances or internal struggles. With the guidance of our compassionate mental health professionals, you’ll learn to identify the patterns and moments when your anger begins to escalate, allowing you to intervene before it becomes unmanageable. We also teach practical techniques to regulate your emotions, such as mindfulness exercises, relaxation methods, and cognitive reframing strategies, empowering you to respond to challenges with clarity and confidence rather than frustration or aggression.\n\nEffective communication is another cornerstone of our approach. When anger becomes overwhelming, it can hinder your ability to express yourself constructively, leading to misunderstandings and conflict. At Empathy Health Clinic, we work with you to develop assertive communication skills so you can share your thoughts and feelings without resorting to hostility. By fostering healthier interactions, you’ll be better equipped to build stronger relationships with those around you, whether it’s family members, friends, or colleagues.\n\nOur anger management services are tailored to meet your unique needs. We offer individual therapy to focus on your personal journey, couples therapy to address anger-related challenges within intimate relationships, and family counseling to promote harmony and understanding among loved ones. Whatever your situation, our experienced team is here to support you in transforming anger from a destructive force into an opportunity for growth and self-awareness.\n\nWhen you choose Empathy Health Clinic in Winter Park, you can expect a compassionate and nonjudgmental atmosphere where your mental health is our priority. Together, we’ll work toward developing healthier coping mechanisms, improving your emotional resilience, and creating lasting change in your life. Take the first step toward managing your anger and reclaiming your peace of mind by contacting us today.",
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
        description: "Depression can make even the simplest tasks feel overwhelming, leaving you isolated, hopeless, and unsure of how to move forward. At Empathy Health Clinic in Winter Park, we understand the profound impact depression can have on your life, and we are committed to helping you find relief and regain a sense of purpose. Our depression therapy specialists use evidence-based approaches tailored to your unique needs, guiding you toward healing with compassion and expertise. Whether your depression stems from life circumstances, past trauma, or biological factors, our team is here to support you in uncovering the root causes and creating meaningful change.\n\nThrough proven methods such as cognitive behavioral therapy (CBT), interpersonal therapy, and behavioral activation, we address the intricate connection between your thoughts, emotions, and behaviors. These therapies are designed to help you challenge unhelpful thought patterns, develop healthier coping strategies, and re-engage with activities that bring fulfillment and joy. Depression therapy at our Winter Park clinic provides a safe, non-judgmental space where you can openly explore your struggles without fear of stigma. Our therapists work collaboratively with you, empowering you to rediscover your strengths and build a foundation for emotional resilience.\n\nWhen you begin treatment at Empathy Health Clinic, you can expect personalized care focused on your individual journey. We’ll start by understanding your experiences and identifying the factors contributing to your depression. From there, we’ll create a treatment plan tailored to your goals, whether it’s achieving symptom relief, improving relationships, or finding motivation in everyday life. Therapy sessions are structured to help you gain insight into your emotional patterns and develop practical tools to navigate challenges. Over time, you’ll discover new ways to connect with yourself and others, fostering a greater sense of balance and well-being.\n\nSeeking depression therapy is a courageous step toward reclaiming your mental health, and at Empathy Health Clinic, we honor that courage with unwavering support. Our experienced therapists are dedicated to helping you feel heard, understood, and cared for as you work toward recovery. No matter how long you’ve been struggling, effective treatment is available, and you don’t have to face this alone. Located in the heart of Winter Park, our clinic is here to provide compassionate, expert care that empowers you to heal and move forward with confidence. Let us help you rediscover hope and take the first step toward a brighter tomorrow.",
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
        description: "Living with bipolar disorder can be challenging, but with the right support and treatment, it’s possible to achieve stability, improve your quality of life, and thrive. At Empathy Health Clinic, located in Winter Park, we understand the complexities of bipolar disorder and are committed to helping you navigate your journey toward better mental health. Our specialized approach to bipolar disorder therapy is designed to empower you with the tools you need to manage mood episodes, enhance your daily functioning, and foster meaningful connections with others.\n\nOur experienced mental health professionals provide evidence-based psychotherapy tailored to meet your unique needs. Bipolar disorder therapy at Empathy Health Clinic goes beyond simply addressing symptoms; we work with you to build a deeper understanding of your condition. Through therapy, you’ll learn to recognize early warning signs of mood fluctuations, whether they involve depressive lows or manic highs. Identifying these signs is a crucial step toward preventing mood episodes from escalating and maintaining emotional balance.\n\nWe also prioritize the development of effective coping strategies to help you manage stress and regulate your emotions. Bipolar disorder can often feel overwhelming, but having practical tools to navigate challenges can make a significant difference in your daily life. Therapy sessions may explore techniques such as mindfulness, cognitive restructuring, or problem-solving skills to promote resilience and stability. Additionally, our therapists focus on improving medication adherence, which is essential in maintaining consistent management of bipolar disorder. We work collaboratively with you to ensure your treatment plan aligns with your needs and goals.\n\nRelationships can be deeply impacted by the ups and downs associated with bipolar disorder. Whether it’s difficulties in communication or misunderstandings stemming from mood changes, therapy can help you rebuild trust and connection with loved ones. At Empathy Health Clinic, we help you address these challenges, foster healthy relationships, and strengthen your support system, as this network can play a vital role in your overall recovery.\n\nWhen you choose Empathy Health Clinic in Winter Park for bipolar disorder therapy, you can expect compassionate care in a safe, judgment-free environment. Our team is dedicated to providing personalized support, helping you feel heard and understood every step of the way. With the right strategies in place, you can regain control, find stability, and live a fulfilling life despite the challenges of bipolar disorder. Let us help you take the first step toward lasting wellness.",
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
        description: "Obsessive-Compulsive Disorder (OCD) can profoundly impact your daily life, making it difficult to feel in control of your thoughts, emotions, and behaviors. If you’re struggling with intrusive thoughts and compulsive actions, know that effective, evidence-based help is available. At Empathy Health Clinic in Winter Park, we specialize in OCD therapy, using exposure and response prevention (ERP) as the gold-standard treatment to help you regain control and find relief. ERP therapy is rooted in decades of research and has been shown to significantly reduce OCD symptoms, empowering you to live with greater freedom and ease.\n\nOur approach to ERP is designed to meet you where you are, offering compassionate, personalized care tailored to your unique needs. ERP works by gradually exposing you to situations or thoughts that trigger anxiety, while teaching you how to resist the urge to engage in compulsive behaviors. This process occurs in a structured, supportive environment, allowing you to build confidence and resilience at your own pace. Our OCD specialists understand how overwhelming the process might feel at first, which is why we take the time to create a safe, collaborative space where you feel understood and respected. Together, we’ll work to gently challenge your fears and break the cycle of obsessions and compulsions.\n\nAs you progress through therapy, you’ll begin to notice meaningful changes in how you respond to triggers. Instead of feeling trapped by intrusive thoughts or rituals, you’ll develop healthier coping mechanisms and gain the tools to manage your anxiety effectively. ERP therapy doesn’t eliminate your fears overnight, but it equips you with the skills needed to face them head-on, fostering resilience and long-term relief. Patients who commit to ERP often experience significant improvements in their overall mental health, relationships, and quality of life.\n\nAt Empathy Health Clinic, we believe in the importance of trust and connection in the therapeutic process. Our team in Winter Park is dedicated to providing compassionate care that puts your well-being first. Overcoming OCD can be challenging, but with specialized OCD therapy and the right support, recovery is possible. You don’t have to navigate this journey alone. Let us help you take the first step toward reclaiming your life and living with greater peace of mind. Reach out today to begin your path to healing.",
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
        description: "Eye Movement Desensitization and Reprocessing (EMDR) therapy is an innovative and highly effective treatment designed to help individuals struggling with trauma, PTSD, and other distressing emotional challenges. At Empathy Health Clinic in Winter Park, our dedicated EMDR-trained therapists provide compassionate, evidence-based care to help you move forward from painful experiences that may be holding you back. EMDR therapy offers a unique approach to healing by going beyond traditional talk therapy, using bilateral stimulation techniques such as guided eye movements, gentle tapping, or auditory cues to assist your brain in reprocessing traumatic memories. This process helps to reduce the emotional intensity of these memories, allowing you to regain a sense of control and peace.\n\nTrauma can deeply impact your mental health, affecting not only your emotions but also your thoughts, behaviors, and physical well-being. EMDR therapy works by addressing the way traumatic experiences are stored in your brain, helping you process them in a healthier and less distressing way. Many individuals find that EMDR provides relief where other treatments may not have fully resolved their symptoms. The goal is not to erase your memories but to help you experience them in a way that no longer causes overwhelming pain, anxiety, or fear. Over time, this can lead to improved emotional resilience, better mental health, and a renewed ability to engage more fully in your life.\n\nWhen you choose EMDR therapy at Empathy Health Clinic in Winter Park, you can expect a safe, supportive, and nonjudgmental environment where your healing journey is the priority. During your sessions, your therapist will guide you through a structured eight-phase process, tailored to your unique needs. This begins with an initial assessment to understand your personal history and identify the specific memories or triggers impacting your mental health. As therapy progresses, your therapist will use bilateral stimulation techniques to help you access and reprocess these memories in a way that feels manageable and empowering. Throughout the process, your therapist will provide ongoing support to ensure you feel comfortable and confident in your progress.\n\nEMDR therapy has helped countless individuals find relief from the burdens of trauma, anxiety, and emotional pain. With the guidance of our skilled therapists at Empathy Health Clinic, you can begin to move toward healing and reclaim your sense of well-being. If you’re ready to take the next step in your mental health journey, our Winter Park team is here to support you every step of the way.",
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
        description: "Relationships are complex and require ongoing care and attention to thrive. Couples therapy offers a supportive and structured environment to address challenges, repair strained connections, and cultivate a healthier, more fulfilling partnership. At Empathy Health Clinic in Winter Park, we understand how vital relationships are to your mental health and overall well-being. Our experienced couples therapists are dedicated to helping you and your partner navigate difficulties, strengthen your bond, and rediscover the joy in your relationship.\n\nCouples therapy can be valuable at any stage of a relationship. Whether you’re experiencing frequent conflicts, struggling with communication, facing feelings of disconnection, or recovering from betrayals, therapy provides tools and insights to address these challenges. Life transitions, such as parenthood, career changes, or retirement, can also put unique pressures on your relationship. Through couples therapy, you’ll develop healthier ways to approach these changes together, fostering resilience and mutual support. Even if your relationship feels stable, therapy can help deepen emotional intimacy and strengthen the foundation of your partnership.\n\nOur therapists use evidence-based approaches tailored to your unique needs. Techniques such as Emotionally Focused Therapy (EFT) and Cognitive Behavioral Therapy (CBT) can help you identify negative patterns, express your thoughts and feelings more effectively, and cultivate empathy and understanding. You’ll learn practical strategies to improve communication, resolve recurring conflicts, and rebuild trust. In a safe and nonjudgmental space, you can explore the underlying issues that may be contributing to struggles, allowing healing to take place. Therapy isn’t about assigning blame; it’s about working collaboratively to create positive change.\n\nWhen you begin couples therapy at Empathy Health Clinic, you can expect an environment of compassion and respect. Your therapist will guide you through conversations that promote connection and mutual understanding, empowering you both to work toward shared goals. Each session is an opportunity to gain insight, build new skills, and rediscover the strengths of your partnership. While the process may take time, many couples find the experience transformative, leaving therapy with greater clarity, trust, and emotional closeness. \n\nAt Empathy Health Clinic in Winter Park, we believe every relationship has the potential to grow and flourish with the right support. Whether you’re considering separation, struggling with specific challenges, or simply looking to enhance your relationship, couples therapy can help you and your partner move forward together. Let us guide you toward healing, understanding, and a stronger, more connected future.",
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
        description: "Intimacy issues can deeply impact your relationship, creating emotional distance and reducing feelings of connection with your partner. At Empathy Health Clinic in Winter Park, we understand the challenges couples face when navigating these sensitive concerns. Our intimacy therapy specialists provide compassionate, evidence-based support tailored to your unique needs, helping you and your partner address both emotional and physical intimacy challenges in a safe and supportive environment. Whether you’re experiencing sexual difficulties, emotional disconnection, mismatched levels of desire, or barriers to intimacy, we are here to guide you toward greater understanding and closeness.\n\nIntimacy therapy focuses on uncovering the root causes of the issues you’re facing, whether they stem from past experiences, communication breakdowns, stress, or mental health factors. During sessions, we create a non-judgmental space for open dialogue, allowing both partners to express their feelings, fears, and desires without hesitation. By fostering honest communication, we aim to help you rebuild trust and nurture vulnerability, which are essential for healthy, fulfilling relationships. Our therapists may also incorporate mindfulness techniques, behavioral strategies, and psychoeducation to address emotional disconnects, improve physical intimacy, and reignite passion.\n\nMany couples fear that discussing intimacy concerns will lead to discomfort or conflict, but we approach these conversations with empathy and respect, ensuring that both partners feel heard and valued. Through therapy, you can expect to learn practical tools for enhancing emotional closeness, navigating sexual challenges, and overcoming barriers to intimacy. We believe that intimacy is deeply intertwined with mental health, and by addressing these concerns holistically, you and your partner can rediscover joy and satisfaction in your relationship.\n\nAt Empathy Health Clinic, we are committed to helping couples in Winter Park strengthen their connection and build a foundation for lasting happiness. Intimacy therapy can empower you to let go of shame or frustration and replace it with a renewed sense of partnership and mutual understanding. Whether you’re seeking to deepen your bond or repair a strained relationship, our therapists are here to guide you through this journey with compassion and expertise. Take the first step toward greater emotional and physical closeness by reaching out to our clinic today. Together, we can help you create a relationship that feels truly fulfilling and meaningful.",
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
        description: "Marriage is a deeply rewarding partnership, but it is not without its challenges. As life evolves, couples often encounter obstacles that can strain their connection, leaving them feeling overwhelmed, isolated, or uncertain about the future of their relationship. At Empathy Health Clinic in Winter Park, our Orlando marriage counseling services are designed to support you in navigating these difficulties with compassion, professionalism, and evidence-based care. Whether your marriage is struggling due to infidelity, financial stress, parenting conflicts, in-law dynamics, or a sense of emotional disconnection, we are here to help you rediscover the strength and connection that brought you together.\n\nOur experienced marriage counselors understand that no two relationships are the same. We take the time to get to know you as individuals and as a couple, tailoring our therapeutic approach to meet your unique needs. Using proven methods such as the Gottman Method and Emotionally Focused Therapy, we guide you in identifying and addressing the core issues affecting your marriage. The Gottman Method emphasizes practical tools to improve communication, resolve conflict, and build trust. Emotionally Focused Therapy helps couples explore their emotional patterns and deepen their connection, fostering a secure and supportive bond. These evidence-based approaches empower you to rebuild your relationship with greater understanding, empathy, and resilience.\n\nSeeking professional marriage counseling is an act of courage and commitment to your relationship. At Empathy Health Clinic, we provide a safe and nonjudgmental space where you can express your concerns, share your feelings, and work toward meaningful change. Our goal is to help you and your partner develop healthier communication patterns, strengthen emotional intimacy, and create a shared vision for your future together. Whether you are facing a specific crisis or simply want to enhance the foundation of your marriage, our counselors are dedicated to helping you cultivate a deeper connection and a more fulfilling partnership.\n\nWhen you choose Empathy Health Clinic for Orlando marriage counseling, you can expect personalized care, practical guidance, and unwavering support from professionals who truly understand the complexities of relationships. We are passionate about helping couples in Winter Park and the greater Orlando area find hope and healing, even in the face of life’s most difficult challenges. Your marriage deserves the opportunity to thrive, and we are here to walk alongside you every step of the way. Let us help you turn conflict into connection and pain into progress, guiding you toward a stronger, healthier future together.",
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
        description: "Toxic relationships can deeply impact your mental health, self-esteem, and overall well-being. Whether you’re experiencing emotional abuse, manipulation, or unhealthy patterns, it can be difficult to navigate these dynamics on your own. At Empathy Health Clinic in Winter Park, our compassionate therapists are dedicated to helping you uncover the effects of toxic relationships and empowering you to take meaningful steps toward healing. Through specialized toxic relationship therapy, we provide a safe and supportive environment where you can explore your experiences without fear of judgment.\n\nOur therapists understand that toxic relationships often leave you feeling trapped, confused, or drained. You may feel unsure about how to set boundaries, whether to stay or leave, or how to recover from the emotional pain you’ve endured. At Empathy Health Clinic, we work with you to identify unhealthy patterns within your relationships and help you recognize the signs of emotional abuse and manipulation. Therapy is tailored to your unique situation, allowing you to gain insight into the dynamics of your relationships while building skills to protect your emotional health. Together, we focus on fostering self-awareness, strengthening your resilience, and helping you regain control over your life.\n\nToxic relationship therapy can be transformative, offering you the tools to develop healthy boundaries and make informed choices that align with your values and needs. Whether you’re navigating a challenging romantic relationship, family conflict, or friendships that harm your emotional well-being, our therapists are here to support you. Treatment may involve exploring past experiences that shaped your understanding of relationships, processing trauma associated with emotional abuse, and learning strategies to build healthier connections moving forward. Through this process, you can begin to repair your self-esteem, rediscover your sense of worth, and cultivate relationships that nurture and empower you.\n\nSeeking help for toxic relationships takes courage, and at Empathy Health Clinic, we honor your bravery by creating a warm and validating space for your healing journey. From your first session, you can expect to feel heard, respected, and supported as you work toward emotional recovery. Our goal is to equip you with the tools you need to break free from harmful cycles and embrace a future filled with healthy, fulfilling relationships. If you’re ready to take the first step toward reclaiming your mental health and well-being, our Winter Park therapists are here to help you find clarity, healing, and hope.",
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
        description: "At Empathy Health Clinic in Winter Park, we are deeply committed to providing affirming, inclusive therapy for LGBTQ+ individuals and couples. We understand that navigating life as a member of the LGBTQ+ community comes with unique experiences and challenges that deserve compassionate care tailored to your needs. Whether you are working through issues related to coming out, exploring your identity, facing discrimination, healing from family rejection, or addressing relationship concerns, our therapists are here to support you. We recognize that mental health struggles, including depression, anxiety, trauma, and minority stress, disproportionately affect LGBTQ+ individuals, and we aim to create a space where you can find healing and empowerment.\n\nYour mental health journey is personal, and at Empathy Health Clinic, we prioritize creating a safe, nonjudgmental environment where you can express yourself freely and authentically. Our therapists are trained in evidence-based approaches to LGBTQ therapy, which may include cognitive-behavioral therapy (CBT), acceptance and commitment therapy (ACT), and mindfulness-based techniques. We also integrate trauma-informed care to ensure that past experiences of discrimination or rejection are handled with sensitivity and understanding. Our team works collaboratively with you to explore your feelings, strengthen your resilience, and develop coping strategies that align with your goals and values.\n\nWe believe that therapy is not just about overcoming challenges—it’s about fostering growth, self-acceptance, and connection. Through LGBTQ therapy at our Winter Park clinic, you can expect to gain deeper insight into your identity and relationships while learning how to navigate societal pressures with confidence. For couples, therapy provides an opportunity to build stronger communication, address conflicts, and deepen intimacy within the context of shared and individual experiences. Our therapists honor the diversity of relationships and identities within the LGBTQ+ community and are dedicated to helping you create a life that reflects your true self.\n\nAt Empathy Health Clinic, we know the importance of finding a therapist who genuinely understands your lived experiences. We are here to help you move beyond fear and stigma, empowering you to embrace your identity and cultivate emotional well-being. Whether you are seeking support for immediate concerns or long-term growth, our LGBTQ therapy services in Winter Park offer a compassionate, affirming foundation for your mental health journey. You are not alone, and together, we can navigate the path to healing and fulfillment.",
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
        description: "There's a unique and transformative power in meeting face-to-face with your therapist, a connection that fosters openness and trust. At Empathy Health Clinic in Winter Park, we provide in-person therapy in a calm, welcoming environment designed to support your mental health journey. Our private therapy rooms are thoughtfully arranged to help you feel safe, comfortable, and free from outside distractions, allowing you to focus entirely on your healing and personal growth. In-person therapy offers a meaningful way to connect with your therapist, as the immediacy of being in the same space often enhances communication and builds a stronger therapeutic relationship.\n\nMany people find that in-person sessions provide a deeper sense of connection compared to other formats, thanks to the ability to engage in richer, more nuanced nonverbal communication. Subtle cues, such as body language and facial expressions, play a significant role in fostering understanding between you and your therapist, helping them to better interpret your needs and emotions. This heightened level of engagement often leads to more effective support during your sessions, allowing you to explore challenges and breakthroughs in a more dynamic way. In-person therapy also offers you the valuable opportunity to step away from daily distractions, giving you uninterrupted time to invest in your mental health and well-being.\n\nWe understand that life can be busy, which is why Empathy Health Clinic offers flexible scheduling options, including evening appointments, to ensure that therapy fits seamlessly into your routine. Whether you're managing anxiety, depression, trauma, relationship challenges, or other mental health concerns, in-person therapy provides a tailored approach to meet your unique needs. Our compassionate therapists utilize evidence-based methods such as cognitive behavioral therapy (CBT), mindfulness practices, psychodynamic therapy, and other specialized techniques to empower you in your journey toward emotional resilience and self-discovery.\n\nWhen you choose in-person therapy at our Winter Park location, you can expect a warm, supportive environment where your needs and goals are prioritized. From the moment you walk through our doors, we are committed to helping you feel heard, valued, and understood. Every session is an opportunity to build trust, gain clarity, and take meaningful steps forward in your mental health journey. At Empathy Health Clinic, we believe that healing begins with connection, and we are here to provide the personalized care and support you deserve.",
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
        description: "Virtual counseling services at Empathy Health Clinic in Winter Park bring professional mental health care directly to your home or preferred private setting through secure, HIPAA-compliant video sessions. We understand that life’s demands can make it challenging to prioritize your mental health, whether it’s due to a busy schedule, transportation difficulties, physical distance from our office, or simply the desire for the added convenience of virtual care. That’s why we are committed to providing the same quality of personalized, compassionate treatment online as we do in person.\n\nVirtual counseling empowers you to focus on your mental well-being without the stress of commuting or rearranging your day-to attend an appointment. From the comfort of your own space, you can connect with skilled therapists who are trained in a variety of evidence-based approaches to help you navigate challenges like anxiety, depression, stress management, relationship difficulties, trauma, and other mental health concerns. Research consistently demonstrates that telehealth therapy is as effective as in-person care for most conditions, meaning you can trust that your treatment remains impactful and tailored to your needs.\n\nDuring virtual sessions, you can expect a warm, professional environment where your privacy and comfort are prioritized. Our therapists use tools like cognitive-behavioral therapy (CBT), dialectical behavior therapy (DBT), mindfulness techniques, and other proven methods to support you in reaching your goals. Whether you are seeking to build resilience, process emotions, develop healthier coping strategies, or improve communication within relationships, virtual counseling provides a safe space for meaningful growth and healing. \n\nAt Empathy Health Clinic, we recognize that mental health care should be accessible to everyone, regardless of circumstance. Our virtual counseling services remove barriers, ensuring you receive the help you need with ease and flexibility. Whether you’re logging on during a lunch break, after work, or from the comfort of your living room, you’ll find the same high standard of care and connection that defines our approach to therapy. Your mental health is important, and we are here to support you every step of the way, offering a seamless, compassionate experience tailored to your unique needs. If you’re seeking professional mental health care in Winter Park, virtual counseling can be the ideal solution to help you prioritize your well-being and take meaningful steps toward a healthier, more balanced life.",
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
        description: "Expert anxiety treatment in Orlando, FL. Evidence-based care for GAD, panic disorder, social anxiety, and phobias.",
        slug: "anxiety-therapy",
        pageTitle: "Anxiety Treatment in Orlando, FL | Anxiety Disorder Therapy | Empathy Health",
        heroTitle: "Expert Anxiety Treatment in Orlando, FL",
        heroDescription: "Comprehensive anxiety treatment in Orlando. Our experienced psychiatrists and therapists provide evidence-based care for all types of anxiety disorders including GAD, panic disorder, social anxiety, and phobias.",
        fullDescription: "Anxiety disorders are among the most common mental health conditions in Orlando and across the United States, affecting over 40 million adults annually. At Empathy Health Clinic, we understand that anxiety is more than just occasional worry—it can be a debilitating condition that interferes with work, relationships, and daily activities. Our specialized team provides comprehensive anxiety treatment using evidence-based therapies and medication management to help Orlando residents regain control over their lives.\n\nWe treat all forms of anxiety disorders including Generalized Anxiety Disorder (GAD), which involves persistent, excessive worry about everyday situations; Panic Disorder, characterized by sudden panic attacks and fear of future attacks; Social Anxiety Disorder, marked by intense fear of social situations and judgment; Specific Phobias, including fears of heights, flying, animals, or medical procedures; and Agoraphobia, fear of situations where escape might be difficult.\n\nOur treatment approach combines evidence-based psychotherapy with medication management when appropriate. Cognitive Behavioral Therapy (CBT) is particularly effective for anxiety, helping you identify and change thought patterns that fuel anxiety. Through CBT, you'll learn practical coping strategies, relaxation techniques, and exposure methods to gradually face feared situations. Many Orlando patients see significant improvement within 12-16 weeks of consistent therapy.\n\nFor some individuals, medication can provide relief from severe anxiety symptoms while you work through therapy. Our psychiatrists carefully evaluate whether anti-anxiety medications, SSRIs, or other options might benefit you. We monitor your progress closely and adjust treatment as needed to achieve optimal results with minimal side effects.\n\nLiving with an anxiety disorder in Orlando doesn't mean you have to struggle alone. With proper treatment, most people with anxiety disorders experience significant symptom reduction and improved quality of life. Our team creates a safe, judgment-free environment where you can explore the roots of your anxiety and develop lasting coping skills. We accept most major insurance plans and offer both in-person and telehealth appointments for your convenience.\n\nIf anxiety is interfering with your life, we encourage you to request an appointment with our Orlando anxiety specialists. Early treatment leads to better outcomes, and our compassionate team is here to support your journey to wellness. The National Institute of Mental Health provides additional resources about anxiety disorders at nimh.nih.gov.",
        symptoms: "Common anxiety symptoms include excessive worrying that's difficult to control, restlessness or feeling on edge, fatigue, difficulty concentrating or mind going blank, irritability, muscle tension, sleep disturbances including trouble falling or staying asleep, panic attacks with rapid heartbeat and sweating, avoidance of anxiety-triggering situations, persistent fear or dread, physical symptoms like nausea or dizziness, and significant distress that interferes with daily functioning.",
        relatedTreatments: JSON.stringify([]),
        relatedTherapies: JSON.stringify(["cognitive-behavioral-therapy", "dialectical-behavior-therapy"]),
        faqs: JSON.stringify([
          { question: "Is anxiety treatable?", answer: "Yes, anxiety disorders are highly treatable. According to the Anxiety and Depression Association of America, most people see significant improvement with therapy, medication, or a combination of both. CBT is particularly effective for anxiety, with research showing 60-80% of patients experience substantial symptom reduction." },
          { question: "Do I need medication for anxiety?", answer: "Not everyone needs medication. Many people benefit from therapy alone, particularly CBT or exposure therapy. Your psychiatrist will help determine if medication could be helpful based on your symptom severity, previous treatment history, and personal preferences." },
          { question: "How long does anxiety treatment take in Orlando?", answer: "Many people see improvement within 8-12 weeks of starting treatment, though this varies based on severity and type of anxiety disorder. Some individuals need several months of therapy to develop strong coping skills and see lasting results." }
        ]),
        order: 1,
      },
      {
        title: "Depression",
        description: "Professional depression treatment in Orlando, FL. Evidence-based therapy and medication for major depression and mood disorders.",
        slug: "depression-treatment",
        pageTitle: "Depression Treatment in Orlando, FL | Major Depression Therapy | Empathy Health",
        heroTitle: "Compassionate Depression Treatment in Orlando, FL",
        heroDescription: "Professional depression treatment in Orlando. Our psychiatric team offers comprehensive care including therapy, medication management, and ongoing support for major depression, persistent depressive disorder, and other mood disorders.",
        fullDescription: "Depression is more than just feeling sad or going through a difficult period—it's a serious medical condition that affects millions of people in Orlando and nationwide. According to the National Institute of Mental Health, major depressive disorder affects approximately 17.3 million American adults each year. At Empathy Health Clinic, we provide compassionate, evidence-based treatment for all forms of depression, helping our Orlando patients reclaim their lives and rediscover joy.\n\nDepression affects how you feel, think, and handle daily activities. It can drain your energy, interfere with sleep, impact your appetite, and make it difficult to concentrate or make decisions. For many people, depression feels like being trapped in a dark tunnel with no way out. But with proper treatment, recovery is absolutely possible. Our specialized team understands the biological, psychological, and social factors that contribute to depression, and we develop personalized treatment plans tailored to your unique situation.\n\nWe treat several types of depression including Major Depressive Disorder (MDD), characterized by persistent low mood and loss of interest; Persistent Depressive Disorder (dysthymia), a chronic form lasting two years or longer; Seasonal Affective Disorder (SAD), depression that occurs during specific seasons; Postpartum Depression, affecting new mothers; and depression co-occurring with other conditions like anxiety or chronic pain.\n\nOur comprehensive treatment approach combines evidence-based psychotherapy with medication management when appropriate. Cognitive Behavioral Therapy (CBT) helps you identify and change negative thought patterns that fuel depression, while Interpersonal Therapy (IPT) addresses relationship issues and life transitions. For more severe depression, medication such as antidepressants can restore chemical balance in the brain and provide relief from debilitating symptoms. Many Orlando patients benefit from a combination of therapy and medication for optimal results.\n\nWe know that seeking help for depression takes courage. Our psychiatrists and therapists create a safe, non-judgmental environment where you can openly discuss your struggles. We'll work collaboratively with you to develop coping strategies, set achievable goals, and build resilience against future depressive episodes. Treatment timelines vary—some people feel better within weeks, while others need several months of consistent care to achieve lasting recovery.\n\nIf you're experiencing depression in Orlando, please don't wait to seek help. Early intervention leads to better outcomes and faster recovery. We accept most major insurance plans and offer flexible scheduling including telehealth appointments. Request an appointment today to take the first step toward healing. For more information about depression, visit the National Institute of Mental Health at nimh.nih.gov.",
        symptoms: "Depression symptoms include persistent sadness, emptiness, or hopelessness lasting most of the day nearly every day; loss of interest or pleasure in activities you once enjoyed; significant weight loss or gain, or changes in appetite; insomnia or sleeping too much; physical restlessness or feeling slowed down; fatigue and loss of energy; feelings of worthlessness or excessive guilt; difficulty thinking, concentrating, or making decisions; and recurrent thoughts of death or suicide. Symptoms must last at least two weeks and cause significant distress or functional impairment.",
        relatedTreatments: JSON.stringify([]),
        relatedTherapies: JSON.stringify(["cognitive-behavioral-therapy", "psychodynamic-therapy", "dialectical-behavior-therapy"]),
        faqs: JSON.stringify([
          { question: "How do I know if I have depression or just sadness?", answer: "Clinical depression persists for at least two weeks and significantly interferes with daily functioning, affecting your ability to work, maintain relationships, or care for yourself. Normal sadness usually relates to specific events and improves over time. If you're unsure, a psychiatric evaluation can provide clarity." },
          { question: "Will I need to take antidepressants forever?", answer: "Not necessarily. Treatment duration varies by individual. For a first depressive episode, medication is typically continued for 6-12 months after symptom improvement. Those with recurrent depression may benefit from longer-term treatment. Your psychiatrist will work with you to find the right approach and safely taper medication when appropriate." },
          { question: "Can therapy really help depression in Orlando?", answer: "Absolutely. Research shows that psychotherapy, particularly CBT and interpersonal therapy, is as effective as medication for mild to moderate depression. Many people benefit from therapy alone or combined with medication for more severe symptoms. Therapy provides lasting skills to prevent future episodes." }
        ]),
        order: 2,
      },
      {
        title: "Bipolar Disorder",
        description: "Expert bipolar disorder treatment in Orlando, FL. Comprehensive mood stabilization and therapy for Bipolar I and II.",
        slug: "bipolar-disorder-treatment",
        pageTitle: "Bipolar Disorder Treatment in Orlando, FL | Mood Stabilization | Empathy Health",
        heroTitle: "Specialized Bipolar Disorder Treatment in Orlando, FL",
        heroDescription: "Expert bipolar disorder treatment in Orlando. Our psychiatric team provides comprehensive mood stabilization, therapy, and ongoing support for Bipolar I, Bipolar II, and cyclothymic disorder.",
        fullDescription: "Bipolar disorder affects approximately 2.8% of U.S. adults, causing extreme mood swings that cycle between emotional highs (mania or hypomania) and devastating lows (depression). At Empathy Health Clinic in Orlando, our psychiatrists specialize in bipolar disorder treatment, providing the expert care needed to achieve mood stability and prevent dangerous episodes. We understand that bipolar disorder is a lifelong condition requiring ongoing management, and we're committed to helping our Orlando patients live full, productive lives.\n\nBipolar I Disorder involves full-blown manic episodes lasting at least seven days or requiring immediate hospitalization, often followed by depressive episodes. During mania, individuals may experience euphoric or irritable mood, significantly decreased need for sleep, racing thoughts, rapid speech, grandiose beliefs, increased risky behavior, and impaired judgment. These episodes can damage relationships, careers, and finances. Bipolar II Disorder involves milder hypomanic episodes that don't require hospitalization, alternating with major depressive episodes. While hypomania may feel productive initially, it typically precedes severe depression.\n\nCyclothymic Disorder involves numerous periods of hypomanic and depressive symptoms lasting at least two years, though symptoms don't meet full criteria for hypomanic or major depressive episodes. This chronic mood instability still causes significant distress and functional impairment.\n\nMedication is the cornerstone of bipolar disorder treatment. Mood stabilizers like lithium, valproic acid (Depakote), and lamotrigine (Lamictal) help prevent both manic and depressive episodes. Atypical antipsychotics such as olanzapine, quetiapine, or aripiprazole can treat acute mania and prevent recurrence. Some people need combinations of medications for optimal mood stability. Our psychiatrists carefully monitor medication levels, side effects, and treatment response, making adjustments as needed.\n\nPsychotherapy is essential alongside medication. Psychoeducation helps you understand bipolar disorder, recognize early warning signs of mood episodes, and maintain treatment adherence. Cognitive Behavioral Therapy (CBT) addresses negative thought patterns during depression and teaches skills to manage hypomanic symptoms. Family-Focused Therapy involves loved ones in understanding the condition and providing support. Interpersonal and Social Rhythm Therapy (IPSRT) emphasizes maintaining regular daily routines, sleep schedules, and social rhythms to prevent mood episodes.\n\nUntreated bipolar disorder has severe consequences including damaged relationships, job loss, financial problems, substance abuse, and tragically, one of the highest suicide rates among mental health conditions. However, with proper treatment, most people with bipolar disorder achieve significant mood stabilization. Our Orlando patients maintain successful careers, healthy relationships, and fulfilling lives while managing their condition. Regular medication adherence, therapy participation, stress management, and maintaining healthy sleep routines are key to long-term stability.\n\nRecognizing early warning signs prevents full-blown episodes. Manic warning signs include decreased sleep without fatigue, increased talkativeness, racing thoughts, and increased goal-directed activity. Depressive warning signs include loss of interest in activities, fatigue, withdrawal from others, and hopelessness. When caught early, medication adjustments can prevent escalation.\n\nIf you're experiencing mood swings, irritability, unusual energy levels, or depression, we encourage you to request an appointment for a comprehensive evaluation. Bipolar disorder often goes undiagnosed for years, particularly if manic episodes haven't caused obvious problems. Early diagnosis and treatment prevent the devastating consequences of untreated bipolar disorder. Learn more about bipolar disorder at the National Institute of Mental Health website: nimh.nih.gov.",
        symptoms: "Bipolar disorder symptoms include manic episodes with elevated or irritable mood, increased energy and activity, decreased need for sleep (feeling rested after only 3 hours), racing thoughts and rapid speech, grandiosity or inflated self-esteem, increased goal-directed activity, excessive involvement in pleasurable activities with potential consequences, and impaired judgment. Hypomanic episodes show similar symptoms but are less severe. Depressive episodes include persistent sadness, hopelessness, loss of interest in activities, fatigue, sleep disturbances, appetite changes, difficulty concentrating, feelings of worthlessness, and thoughts of death.",
        relatedTreatments: JSON.stringify(["bipolar-disorder-treatment"]),
        relatedTherapies: JSON.stringify(["dialectical-behavior-therapy", "cognitive-behavioral-therapy"]),
        faqs: JSON.stringify([
          { question: "What's the difference between Bipolar I and Bipolar II in Orlando patients?", answer: "Bipolar I involves full manic episodes lasting at least seven days or severe enough to require hospitalization, often with psychotic features. Bipolar II involves less severe hypomanic episodes (at least 4 days) that don't impair functioning as dramatically, alternating with major depressive episodes. Both conditions are serious and require treatment, though medication strategies may differ." },
          { question: "Do I have to take medication for bipolar disorder forever?", answer: "Bipolar disorder is a chronic, lifelong condition that typically requires ongoing medication to prevent mood episodes. Attempting to stop medication, even when feeling well, commonly leads to relapse. Some people may successfully reduce dosages under careful psychiatric supervision, but complete medication discontinuation usually isn't recommended given the high relapse risk." },
          { question: "Can bipolar disorder be cured in Orlando?", answer: "Bipolar disorder cannot be cured, but it's highly treatable. With proper medication, therapy, and lifestyle management, most people with bipolar disorder achieve stable moods and lead fulfilling lives. The key is viewing it as a chronic condition requiring consistent management, similar to diabetes or hypertension." }
        ]),
        order: 3,
      },
      {
        title: "PTSD & Trauma",
        description: "Expert PTSD treatment in Orlando, FL. Trauma-informed therapy including EMDR and CBT for post-traumatic stress disorder.",
        slug: "ptsd-psychiatrist-orlando",
        pageTitle: "PTSD Treatment in Orlando, FL | Trauma Therapy | Empathy Health",
        heroTitle: "Trauma-Informed PTSD Treatment in Orlando, FL",
        heroDescription: "Specialized PTSD and trauma treatment in Orlando. Our compassionate team offers evidence-based therapies including EMDR, trauma-focused CBT, and medication management to help you heal from traumatic experiences.",
        fullDescription: "Post-Traumatic Stress Disorder (PTSD) affects approximately 6% of the U.S. population at some point in their lives, developing after experiencing or witnessing traumatic events such as combat, sexual assault, serious accidents, natural disasters, or sudden loss of loved ones. At Empathy Health Clinic in Orlando, we provide specialized, trauma-informed care using evidence-based therapies proven effective for PTSD and complex trauma. Our compassionate team understands that trauma affects every aspect of your life, and healing is possible with the right support.\n\nPTSD occurs when the normal recovery process after trauma gets disrupted. Instead of gradually processing and integrating the traumatic experience, your brain remains stuck in survival mode. Trauma memories feel as vivid and threatening as if the event is happening now, triggering your body's fight-flight-freeze response even in safe situations. This creates a cycle where reminders of trauma cause overwhelming distress, leading to avoidance behaviors that prevent natural healing. Without treatment, PTSD symptoms often worsen over time and increase risk for depression, substance abuse, and other mental health problems.\n\nWe recognize that trauma manifests differently for each person. Combat veterans may struggle with hypervigilance, irritability, and difficulty transitating to civilian life. Sexual assault survivors often experience profound shame, trust issues, and avoidance of intimacy. Childhood trauma survivors may have difficulty regulating emotions and maintaining stable relationships. Our individualized treatment addresses your specific trauma history and current challenges.\n\nEye Movement Desensitization and Reprocessing (EMDR) is a highly effective, evidence-based therapy specifically designed for trauma. During EMDR, you focus on traumatic memories while following bilateral stimulation (typically eye movements or tapping). This process helps your brain reprocess traumatic memories, reducing their emotional intensity and allowing natural healing to occur. Many Orlando patients experience significant PTSD symptom reduction within 8-12 EMDR sessions, though treatment length varies based on trauma complexity.\n\nTrauma-Focused Cognitive Behavioral Therapy (TF-CBT) helps you identify and change trauma-related thought patterns that maintain PTSD symptoms. Through gradual exposure to trauma memories in a safe, controlled environment, TF-CBT reduces avoidance and helps you develop healthier beliefs about yourself, others, and the world. Prolonged Exposure (PE) therapy uses similar principles, gradually facing trauma memories and safe situations you've been avoiding to reduce PTSD symptoms.\n\nCognitive Processing Therapy (CPT) specifically addresses the negative beliefs that develop after trauma, such as \"I'm permanently damaged,\" \"The world is completely dangerous,\" or \"I can't trust anyone.\" By challenging and modifying these beliefs, CPT reduces PTSD symptoms and improves functioning.\n\nMedication can complement therapy for PTSD. SSRIs like sertraline (Zoloft) and paroxetine (Paxil) are FDA-approved for PTSD and help reduce symptoms of depression, anxiety, and hyperarousal. Prazosin can reduce trauma nightmares and improve sleep. Our psychiatrists carefully evaluate whether medication might enhance your therapy outcomes and monitor your response.\n\nUntreated PTSD significantly impairs quality of life, damaging relationships, careers, and physical health. However, with evidence-based treatment, most people with PTSD experience substantial symptom reduction. Our Orlando patients report decreased flashbacks, improved sleep, better emotional regulation, restored relationships, and the ability to engage fully in life again. Healing from trauma is challenging but absolutely possible with proper support.\n\nIf you're experiencing PTSD symptoms after a traumatic event, we encourage you to request an appointment for a trauma evaluation. You don't have to continue suffering alone. We accept most insurance plans and offer flexible scheduling including telehealth options. Learn more about PTSD from the National Institute of Mental Health at nimh.nih.gov.",
        symptoms: "PTSD symptoms include intrusive memories, flashbacks, or nightmares about the traumatic event; severe emotional distress or physical reactions when reminded of trauma; avoidance of people, places, activities, or conversations that trigger trauma memories; negative changes in thinking such as hopelessness about the future, negative beliefs about yourself or others, difficulty experiencing positive emotions; feeling emotionally numb or detached from loved ones; hypervigilance and constantly scanning for danger; being easily startled; difficulty concentrating; irritability or angry outbursts; sleep disturbances; and reckless or self-destructive behavior.",
        relatedTreatments: JSON.stringify(["ptsd-treatment"]),
        relatedTherapies: JSON.stringify(["cognitive-behavioral-therapy", "dialectical-behavior-therapy"]),
        faqs: JSON.stringify([
          { question: "How long after a traumatic event does PTSD develop in Orlando patients?", answer: "PTSD symptoms typically begin within three months of trauma, though they can emerge years later. Most people experience some distress immediately after trauma, but PTSD is diagnosed when symptoms persist beyond one month and significantly impair functioning. Not everyone who experiences trauma develops PTSD—factors like trauma severity, personal history, and available support influence PTSD risk." },
          { question: "Can PTSD be treated without medication?", answer: "Yes, many people successfully treat PTSD through trauma-focused therapy alone, particularly EMDR, CPT, or Prolonged Exposure therapy. These evidence-based therapies have strong research support for PTSD treatment. However, medication can be helpful for managing severe symptoms like depression, panic, or sleep problems alongside therapy, and some people benefit most from combining therapy with medication." },
          { question: "Will talking about trauma in Orlando make my PTSD worse?", answer: "This is a common concern, but with a trained trauma therapist using evidence-based approaches, processing trauma in a controlled, safe way actually reduces symptoms. Your therapist will help you work through traumatic memories at a manageable pace, using techniques that prevent retraumatization. Most people feel worse temporarily during active trauma processing, but experience significant long-term symptom reduction." }
        ]),
        order: 4,
      },
      {
        title: "Personality Disorders",
        description: "Personality disorders, such as borderline personality disorder (BPD) and antisocial personality disorder (ASPD)",
        slug: "services",
        pageTitle: "Personality Disorder Treatment in Winter Park, FL | Empathy Health",
        heroTitle: "Specialized Personality Disorder Treatment",
        heroDescription: "Expert treatment for personality disorders in Winter Park, FL. We offer comprehensive care including DBT, psychodynamic therapy, and medication management for BPD, ASPD, and other personality disorders.",
        fullDescription: "Personality disorders are complex mental health conditions characterized by enduring patterns of thinking, feeling, and behaving that deviate significantly from cultural norms. These patterns often lead to distress and impairment in various areas of life, including relationships, work, and personal well-being. People with personality disorders may struggle with rigid ways of reacting to situations, difficulties in emotional regulation, and challenges in maintaining stable interpersonal connections. At Empathy Health Clinic in Winter Park, near Orlando, we are dedicated to providing compassionate, evidence-based care to individuals affected by these conditions, helping them achieve meaningful improvement in their mental health and overall quality of life.\n\nPersonality disorders encompass a range of conditions, each with distinct features. Borderline Personality Disorder (BPD), for example, is marked by intense emotional instability, fear of abandonment, impulsivity, and difficulties in maintaining relationships. Other personality disorders, such as narcissistic, avoidant, or obsessive-compulsive personality disorder, present unique challenges that can deeply affect how individuals perceive themselves and interact with the world around them. Symptoms vary widely, but they often include patterns of behavior and thought that feel overwhelming or disruptive to the person experiencing them. These challenges can lead to feelings of isolation, frustration, or hopelessness, but it’s important to know that effective treatment options are available.\n\nPersonality disorders can affect individuals of any age, gender, or background. While the exact causes are not fully understood, research suggests that a combination of genetic, environmental, and psychological factors contributes to their development. For many, early life experiences, such as trauma or neglect, may play a significant role. Regardless of the cause, seeking professional help is critical to managing symptoms and finding relief. At Empathy Health Clinic, we understand the deeply personal and often painful nature of these struggles, and we are here to help you navigate them with care and understanding.\n\nOur clinic in Winter Park offers specialized treatment for personality disorders, particularly borderline personality disorder (BPD), through a combination of evidence-based therapies tailored to your unique needs. We specialize in Dialectical Behavior Therapy (DBT), a highly effective approach designed specifically for individuals with BPD. DBT focuses on teaching skills such as emotional regulation, distress tolerance, interpersonal effectiveness, and mindfulness, empowering individuals to manage their symptoms and build healthier, more fulfilling lives. In addition to DBT, we provide psychodynamic therapy, which explores underlying emotional patterns and experiences to foster personal growth and insight. Medication management is also available for those who may benefit from it as part of a comprehensive treatment plan. Our team works collaboratively to create a supportive and consistent environment for long-term care, ensuring that your journey toward recovery is met with empathy and dedication.\n\nAt Empathy Health Clinic, we believe that healing is possible. With the right treatment and support, individuals with personality disorders can develop healthier patterns of thinking and behaving, strengthen their relationships, and improve their overall quality of life. If you or a loved one are struggling, our mental health professionals in Winter Park and Orlando are here to walk alongside you. Let us help you take the first step toward lasting change and a brighter future.",
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
      {
        title: "ADHD (Attention-Deficit/Hyperactivity Disorder)",
        description: "Expert ADHD treatment in Orlando, FL. Comprehensive evaluation and medication management for adults, teens, and children.",
        slug: "adhd-treatment",
        pageTitle: "ADHD Treatment in Orlando, FL | Adult & Teen ADHD Testing | Empathy Health",
        heroTitle: "Comprehensive ADHD Treatment in Orlando, FL",
        heroDescription: "Expert ADHD diagnosis and treatment in Orlando. Our psychiatric team offers thorough evaluations, medication management, and therapy for adults and adolescents struggling with attention, focus, and executive function challenges.",
        fullDescription: "Attention-Deficit/Hyperactivity Disorder (ADHD) is a neurodevelopmental condition that affects approximately 4-5% of adults and 8-10% of children in the United States. At Empathy Health Clinic in Orlando, we specialize in comprehensive ADHD evaluation and treatment for adults, adolescents, and children who struggle with inattention, hyperactivity, impulsivity, and executive function challenges. Our experienced team understands that ADHD is not simply a lack of willpower—it's a legitimate brain-based disorder that significantly impacts daily life.\n\nMany Orlando adults seek our services after years of undiagnosed ADHD. Common experiences include chronic disorganization, difficulty completing projects at work, struggles maintaining relationships, frequent job changes, and persistent feelings of underachievement despite high intelligence. Childhood ADHD symptoms may have been overlooked, particularly in girls who tend to present with inattentive symptoms rather than hyperactivity. Our thorough diagnostic process includes clinical interviews, standardized rating scales, and sometimes computerized testing to accurately identify ADHD and rule out conditions with similar symptoms.\n\nWe recognize three presentations of ADHD: Predominantly Inattentive Type, characterized by difficulty sustaining attention, frequent distractibility, forgetfulness, and organizational challenges; Predominantly Hyperactive-Impulsive Type, marked by excessive fidgeting, difficulty sitting still, talking excessively, and acting without considering consequences; and Combined Type, which includes symptoms from both categories. Understanding your specific ADHD presentation helps us develop the most effective treatment plan.\n\nMedication is often a cornerstone of ADHD treatment. Stimulant medications like methylphenidate (Ritalin, Concerta) and amphetamines (Adderall, Vyvanse) increase dopamine and norepinephrine in the brain, improving focus, impulse control, and task completion. For those who don't tolerate stimulants or prefer alternatives, non-stimulant medications like atomoxetine (Strattera), guanfacine, or bupropion can be effective. Our psychiatrists carefully monitor medication response, adjusting dosage and timing to optimize benefits while minimizing side effects.\n\nBeyond medication, we offer ADHD coaching and therapy to develop practical life skills. Cognitive Behavioral Therapy adapted for ADHD teaches organizational systems, time management techniques, and strategies for managing emotional dysregulation often accompanying ADHD. We help Orlando patients create sustainable routines, use tools like planners and reminder systems effectively, and develop coping strategies for ADHD-related challenges at work, school, and home.\n\nUntreated ADHD in Orlando adults often leads to underemployment, relationship difficulties, low self-esteem, and increased risk for anxiety and depression. With proper treatment, however, most people with ADHD see dramatic improvements in functioning and quality of life. Our patients report better job performance, improved relationships, reduced stress, and increased self-confidence. We work collaboratively with you to find the treatment approach that fits your lifestyle and goals.\n\nIf you suspect you or your child has ADHD, we encourage you to request an appointment for an evaluation. Early diagnosis and treatment prevent years of unnecessary struggle. We accept most insurance plans and offer flexible scheduling including telehealth appointments for medication management follow-ups. Learn more about ADHD from the National Institute of Mental Health at nimh.nih.gov.",
        symptoms: "ADHD symptoms include difficulty sustaining attention on tasks or conversations, making careless mistakes in work or schoolwork, trouble organizing tasks and managing time, frequent forgetfulness in daily activities, easily distracted by unrelated thoughts or stimuli, difficulty following through on instructions or completing projects, fidgeting or restlessness even in situations requiring stillness, talking excessively or interrupting conversations, difficulty waiting your turn in conversations or activities, acting impulsively without considering consequences, losing important items frequently, and avoiding tasks requiring sustained mental effort.",
        relatedTreatments: JSON.stringify(["adhd-treatment"]),
        relatedTherapies: JSON.stringify(["cognitive-behavioral-therapy", "individual-therapy"]),
        faqs: JSON.stringify([
          { question: "Can adults have ADHD, or is it just a childhood disorder?", answer: "ADHD often continues into adulthood, with approximately 60% of children with ADHD continuing to have symptoms as adults. Many Orlando adults are diagnosed for the first time when ADHD symptoms create problems at work or in relationships. Adult ADHD is real, common, and highly treatable." },
          { question: "Are ADHD medications safe for long-term use in Orlando?", answer: "Yes, ADHD medications including stimulants like Adderall or Vyvanse and non-stimulants like Strattera are safe for long-term use when prescribed and monitored by a psychiatrist. We carefully evaluate your health history, monitor blood pressure and heart rate, and watch for side effects. Most people tolerate ADHD medications well with proper management." },
          { question: "Will I need ADHD medication forever?", answer: "Treatment duration varies significantly. Some adults benefit from long-term medication to maintain consistent functioning. Others use medication strategically during demanding periods like graduate school or high-pressure work projects. Your psychiatrist will work with you to determine the best long-term approach based on your specific needs and response to treatment." },
          { question: "Can therapy help ADHD without medication?", answer: "Behavioral therapy and ADHD coaching can improve organizational skills, time management, and coping strategies. For mild ADHD, therapy alone may be sufficient. However, research shows that combining medication with therapy provides the most comprehensive symptom improvement for moderate to severe ADHD." }
        ]),
        order: 6,
      },
      {
        title: "OCD (Obsessive-Compulsive Disorder)",
        description: "Expert OCD treatment in Orlando, FL. Specialized ERP therapy and medication for obsessive-compulsive disorder.",
        slug: "ocd-obsessive-compulsive-disorder",
        pageTitle: "OCD Treatment in Orlando, FL | Obsessive-Compulsive Disorder Therapy | Empathy Health",
        heroTitle: "Specialized OCD Treatment in Orlando, FL",
        heroDescription: "Expert OCD treatment in Orlando. Our team provides evidence-based care including ERP therapy, medication management, and comprehensive support for obsessive-compulsive disorder and related conditions.",
        fullDescription: "Obsessive-Compulsive Disorder (OCD) affects approximately 2-3% of the population, causing unwanted, intrusive thoughts (obsessions) that drive repetitive behaviors or mental acts (compulsions) performed to reduce overwhelming anxiety. At Empathy Health Clinic in Orlando, we specialize in treating OCD using Exposure and Response Prevention (ERP) therapy, considered the gold standard treatment, often combined with medication management. OCD is not about being neat or organized—it's a serious, debilitating condition that can consume hours daily and severely interfere with work, relationships, and quality of life.\n\nOCD manifests in numerous ways. Contamination OCD involves fear of germs, illness, or contamination, driving excessive hand washing, cleaning, or avoidance of perceived contaminated objects. Checking OCD includes intrusive doubts about safety (\"Did I lock the door?\", \"Did I turn off the stove?\") leading to repetitive checking behaviors. Symmetry and ordering OCD involves intense distress when things aren't \"just right,\" causing arranging, counting, or repeating behaviors until perfect. Harm OCD includes disturbing thoughts about causing harm to yourself or others, despite having no desire to do so. Relationship OCD (ROCD) involves obsessive doubts about relationships. Pure-O OCD involves primarily mental compulsions like reviewing, analyzing, or seeking reassurance, without obvious behavioral rituals.\n\nThe OCD cycle works like this: An intrusive thought triggers intense anxiety. To reduce anxiety, you perform a compulsion. The compulsion temporarily reduces anxiety, reinforcing the belief that the compulsion was necessary. This strengthens the OCD cycle, making obsessions more frequent and compulsions more rigid. Without treatment, OCD typically worsens over time as the brain learns that compulsions \"work\" to reduce anxiety, even though they actually maintain the disorder.\n\nExposure and Response Prevention (ERP) is the most effective therapy for OCD. ERP systematically exposes you to anxiety-triggering situations while preventing compulsive responses. For example, someone with contamination OCD might touch a doorknob and then resist hand washing for increasing periods. This teaches your brain that anxiety naturally decreases without compulsions, that feared consequences don't actually occur, and that you can tolerate uncomfortable feelings. While ERP feels challenging initially, most Orlando patients experience significant OCD symptom reduction within 12-20 sessions when they consistently practice exposures between sessions.\n\nInhibitory Learning approaches enhance traditional ERP by emphasizing learning that fear predictions are false rather than just habituating to anxiety. This newer approach often produces faster, more durable results.\n\nMedication significantly helps many people with OCD. SSRIs (selective serotonin reuptake inhibitors) like fluoxetine, sertraline, and fluvoxamine are first-line medications, typically requiring higher doses than used for depression. Some people need augmentation with low-dose antipsychotics for treatment-resistant OCD. Our psychiatrists carefully monitor medication response and work collaboratively with your therapist for optimal outcomes. Research shows that combining ERP therapy with medication produces better results than either treatment alone for moderate to severe OCD.\n\nUntreated OCD severely impacts quality of life, consuming hours daily in rituals, causing significant distress, damaging relationships when loved ones are pulled into accommodating compulsions, and increasing risk for depression and other mental health conditions. However, with proper treatment, most people with OCD experience 50-80% symptom reduction and regain their lives. Our Orlando patients report spending dramatically less time on obsessions and compulsions, improved relationships, better work performance, and restored enjoyment in life.\n\nIf intrusive thoughts and repetitive behaviors are interfering with your life in Orlando, we encourage you to request an appointment for an OCD evaluation. Many people suffer for years before seeking specialized treatment. Our compassionate team understands OCD and provides evidence-based care without judgment. Learn more about OCD at the National Institute of Mental Health: nimh.nih.gov.",
        symptoms: "OCD symptoms include persistent, unwanted, intrusive thoughts, images, or urges that cause significant anxiety or distress; repetitive behaviors or mental acts performed to reduce anxiety or prevent feared outcomes; recognizing that obsessions and compulsions are excessive or unreasonable; spending at least one hour daily on obsessions and compulsions (often much more); significant distress when prevented from performing compulsions; interference with work, relationships, or daily activities. Common compulsions include excessive hand washing or cleaning, repeated checking behaviors, counting or tapping rituals, arranging objects, seeking reassurance, and mental rituals like reviewing or analyzing.",
        relatedTreatments: JSON.stringify(["ocd-treatment"]),
        relatedTherapies: JSON.stringify(["cognitive-behavioral-therapy", "individual-therapy"]),
        faqs: JSON.stringify([
          { question: "What's the difference between OCD and just being organized in Orlando?", answer: "Being organized or particular about cleanliness is a preference that doesn't cause distress. OCD involves unwanted, intrusive thoughts that cause significant anxiety and time-consuming rituals you feel compelled to perform. People with OCD typically recognize their thoughts are excessive but can't stop them. OCD consumes significant time (often hours daily), causes severe distress, and interferes with functioning." },
          { question: "What is ERP therapy for OCD?", answer: "Exposure and Response Prevention (ERP) is the gold-standard therapy for OCD. It gradually exposes you to anxiety-triggering situations (the obsession) while preventing the compulsive response. For example, touching a doorknob without washing hands afterward. This teaches your brain that anxiety decreases naturally without rituals and that feared consequences don't occur. While challenging, ERP has strong research support showing 60-80% symptom reduction for most people." },
          { question: "Will medication cure my OCD in Orlando?", answer: "OCD cannot be cured, but medication (typically SSRIs at higher doses than used for depression) can significantly reduce symptom severity. Combined with ERP therapy, most people with OCD experience substantial improvement. Some people successfully reduce or discontinue medication after completing intensive ERP therapy, while others benefit from long-term medication management. Your treatment team will help find the best approach." },
          { question: "How long does OCD treatment take?", answer: "Many Orlando patients see noticeable improvement within 12-20 weeks of starting intensive ERP therapy with 1-2 sessions weekly. However, OCD is a chronic condition, and ongoing maintenance therapy or occasional booster sessions may be needed to maintain gains. The good news is that skills learned in ERP provide lasting tools for managing OCD throughout life." }
        ]),
        order: 7,
      },
      {
        title: "Eating Disorders",
        description: "Anorexia nervosa, bulimia nervosa, binge eating disorder, and other eating disorders",
        slug: "services",
        pageTitle: "Eating Disorder Treatment in Winter Park, FL | Empathy Health Clinic",
        heroTitle: "Compassionate Eating Disorder Treatment",
        heroDescription: "Specialized eating disorder treatment in Winter Park, FL. Our multidisciplinary team provides comprehensive care for anorexia, bulimia, binge eating disorder, and other eating disorders with therapy, medical monitoring, and nutritional support coordination.",
        fullDescription: "Eating disorders are serious and complex mental health conditions characterized by persistent disruptions in eating behaviors, thoughts about food, weight, and body image. These conditions often stem from a combination of biological, psychological, and environmental factors, and they can significantly impact physical health, emotional well-being, and social functioning. At Empathy Health Clinic, located in Winter Park near Orlando, we recognize the profound challenges that come with eating disorders and are committed to providing individualized, compassionate care to support recovery.\n\nEating disorders can manifest in various forms, including anorexia nervosa, bulimia nervosa, binge eating disorder, and avoidant/restrictive food intake disorder (ARFID). Anorexia nervosa involves extreme restriction of food intake due to an intense fear of weight gain, often leading to severe weight loss and malnutrition. Bulimia nervosa is characterized by cycles of binge eating followed by compensatory behaviors such as vomiting, excessive exercise, or fasting. Binge eating disorder involves recurrent episodes of consuming large quantities of food, often accompanied by feelings of shame or distress, but without purging behaviors. ARFID, on the other hand, is marked by an avoidance of certain foods or food groups, typically due to sensory sensitivities or fear of adverse consequences, which can result in nutritional deficiencies and impaired growth in children or adolescents.\n\nEating disorders can affect individuals of all genders, ages, and backgrounds, though they often emerge during adolescence and young adulthood. These disorders are not a choice or a result of vanity; they are complex illnesses that frequently co-occur with other mental health conditions such as anxiety, depression, obsessive-compulsive disorder (OCD), and trauma-related disorders. Left untreated, eating disorders can lead to severe medical complications, including electrolyte imbalances, heart problems, gastrointestinal issues, and osteoporosis. However, recovery is possible with the right support and intervention.\n\nAt Empathy Health Clinic, we take a holistic and patient-centered approach to eating disorder treatment, recognizing the importance of addressing both the physical and psychological aspects of these conditions. Our multidisciplinary team includes psychiatrists, therapists, nutritionists, and medical providers who collaborate to create personalized treatment plans tailored to each patient’s unique needs. Treatment modalities available at our clinic include evidence-based therapies such as cognitive-behavioral therapy (CBT), dialectical behavior therapy (DBT), and family-based therapy (FBT), along with psychiatric care to address co-occurring mental health concerns. Nutritional counseling is also a key component of our approach, as it helps patients rebuild a healthy relationship with food while restoring physical health.\n\nWe prioritize creating a safe, non-judgmental environment where patients feel understood and supported throughout their recovery journey. Healing from an eating disorder requires time, patience, and compassionate care, and our team is dedicated to empowering individuals to regain control of their lives. By addressing not only eating behaviors but also the underlying emotional and psychological factors, our goal is to help patients achieve lasting recovery and improve their overall mental health and quality of life. If you or a loved one in Winter Park or the greater Orlando area is struggling with an eating disorder, we encourage you to reach out to Empathy Health Clinic. Recovery is possible, and we are here to help you take that first step toward healing.",
        symptoms: "Eating disorder symptoms vary but may include: preoccupation with weight, food, calories, or body shape; restrictive eating or food rituals; binge eating episodes; purging through vomiting, laxatives, or excessive exercise; distorted body image; fear of weight gain; withdrawal from social activities; mood changes, anxiety, or depression; and physical signs like weight changes, fatigue, dizziness, or digestive issues.",
        relatedTreatments: JSON.stringify([]),
        relatedTherapies: JSON.stringify(["cognitive-behavioral-therapy", "dialectical-behavior-therapy", "individual-therapy"]),
        faqs: JSON.stringify([
          { question: "Can eating disorders be cured?", answer: "While eating disorders are serious conditions, full recovery is possible with appropriate treatment. Many people achieve complete recovery, while others manage symptoms successfully with ongoing support." },
          { question: "Do I need to be underweight to have an eating disorder?", answer: "No. Eating disorders occur at all body sizes. Bulimia, binge eating disorder, and other eating disorders often present at normal or above-average weights. Weight doesn't determine the severity or validity of an eating disorder." },
          { question: "What types of therapy work for eating disorders?", answer: "Cognitive-behavioral therapy (CBT), especially CBT-E designed for eating disorders, is highly effective. Dialectical behavior therapy (DBT) and family-based therapy are also evidence-based treatments depending on the disorder and age." },
          { question: "Will I need to be hospitalized?", answer: "Most eating disorder treatment occurs in outpatient settings. Hospitalization is only necessary if there's medical instability, severe malnutrition, or immediate safety concerns. We coordinate care levels based on your needs." }
        ]),
        order: 8,
      },
      {
        title: "Substance Use Disorders & Addiction",
        description: "Compassionate addiction treatment in Orlando, FL. Medication-assisted treatment and therapy for drug and alcohol addiction.",
        slug: "substance-use-disorders-addiction",
        pageTitle: "Substance Use Disorder Treatment in Orlando, FL | Addiction Recovery | Empathy Health",
        heroTitle: "Compassionate Substance Use Disorder Treatment in Orlando, FL",
        heroDescription: "Evidence-based addiction treatment in Orlando. Our psychiatric team provides medication-assisted treatment, therapy, and comprehensive support for alcohol and drug addiction alongside co-occurring mental health conditions.",
        fullDescription: "Substance use disorders affect approximately 20.4 million Americans aged 12 and older, involving problematic patterns of alcohol, prescription medication, or illicit drug use that lead to significant impairment and distress. At Empathy Health Clinic in Orlando, we provide comprehensive psychiatric care for substance use disorders, recognizing that addiction is a medical condition—not a moral failing—and is highly treatable with proper support. Our compassionate team specializes in medication-assisted treatment (MAT), evidence-based therapy, and integrated care for co-occurring mental health conditions.\n\nSubstance use disorder exists on a spectrum from mild to severe. Early stages may involve occasional excessive use and missing obligations, while severe addiction dominates daily life, causes health problems, damages relationships, and continues despite devastating consequences. Common substances include alcohol, opioids (prescription painkillers or heroin), stimulants (cocaine, methamphetamine, prescription stimulants), benzodiazepines, marijuana, and others. Each substance has unique effects, withdrawal symptoms, and treatment approaches.\n\nCo-occurring disorders—having both substance use disorder and mental health conditions like depression, anxiety, PTSD, or bipolar disorder—affect over 50% of people with addiction. Substance use may begin as self-medication for underlying mental health symptoms, while chronic substance use also worsens mental health. Integrated treatment addressing both conditions simultaneously produces significantly better outcomes than treating them separately. Our psychiatrists understand this complex interplay and develop comprehensive treatment plans for lasting recovery.\n\nMedication-Assisted Treatment (MAT) combines FDA-approved medications with counseling and behavioral therapies. For opioid use disorder, medications like buprenorphine (Suboxone), methadone, or naltrexone reduce cravings, prevent withdrawal, block opioid effects, and normalize brain chemistry disrupted by chronic opioid use. Research consistently shows MAT cuts overdose deaths in half and helps people stay in treatment longer. For alcohol use disorder, naltrexone, acamprosate, or disulfiram reduce drinking, prevent relapse, and support abstinence. These medications are not \"replacing one addiction with another\"—they're prescribed medical treatments that restore normal brain function.\n\nEvidence-based psychotherapy is essential for addiction recovery. Cognitive Behavioral Therapy (CBT) helps identify and change thought patterns and behaviors that maintain addiction, develop healthy coping skills for triggers and cravings, and prevent relapse. Motivational Interviewing explores ambivalence about change and strengthens commitment to recovery. Dialectical Behavior Therapy (DBT) teaches emotional regulation skills particularly helpful for people with co-occurring conditions. Family therapy involves loved ones in understanding addiction and creating supportive home environments. Group therapy provides peer support and accountability.\n\nRelapse prevention is crucial. We help Orlando patients identify personal triggers (people, places, situations, emotions) that increase relapse risk, develop specific coping strategies for high-risk situations, create emergency action plans for cravings, build healthy routines and support systems, and recognize early warning signs of relapse. Relapse is common in recovery but doesn't mean failure—it's an opportunity to adjust treatment and strengthen coping skills.\n\nUntreated substance use disorders devastate lives through damaged relationships, job loss, financial ruin, legal problems, serious health consequences including liver disease, heart problems, infectious diseases, and overdose deaths. However, with proper treatment, full recovery is achievable. Many Orlando patients in our care maintain long-term sobriety, repair relationships, rebuild careers, and rediscover joy in life. Recovery is a journey, not a destination, and we're here to support you every step.\n\nAddiction carries stigma that prevents many people from seeking help. At Empathy Health Clinic, we provide judgment-free, evidence-based care in a supportive environment. We understand that reaching out for help takes tremendous courage. Whether you're struggling with alcohol, opioids, stimulants, or other substances, we're here to help. We accept most insurance plans and offer flexible scheduling including telehealth appointments for medication management and therapy. Request an appointment today to begin your recovery journey. Learn more about substance use disorders from SAMHSA (Substance Abuse and Mental Health Services Administration) at samhsa.gov.",
        symptoms: "Substance use disorder symptoms include inability to cut down or control use despite desire to quit; spending excessive time obtaining, using, or recovering from substances; intense cravings or urges to use; continued use despite causing relationship, work, or health problems; neglecting important responsibilities; giving up activities you once enjoyed; tolerance requiring increased amounts for the same effect; withdrawal symptoms when stopping including anxiety, tremors, nausea, sweating; using in dangerous situations like driving; failed attempts to cut down or quit; and persistent use despite knowing it's causing harm.",
        relatedTreatments: JSON.stringify([]),
        relatedTherapies: JSON.stringify(["cognitive-behavioral-therapy", "dialectical-behavior-therapy", "individual-therapy", "family-therapy"]),
        faqs: JSON.stringify([
          { question: "Do I really need treatment for addiction in Orlando, or can I quit on my own?", answer: "While some people with mild substance use problems quit independently, professional treatment dramatically increases success rates for moderate to severe addiction. Treatment provides medical supervision during withdrawal, addresses underlying mental health issues, teaches relapse prevention skills, and offers accountability and support. Attempting to quit severe addiction alone can be medically dangerous and has high failure rates." },
          { question: "What is medication-assisted treatment (MAT)?", answer: "MAT combines FDA-approved medications (like Suboxone for opioid addiction or naltrexone for alcohol dependence) with counseling and behavioral therapy. MAT medications reduce cravings, prevent painful withdrawal, normalize brain chemistry, and block euphoric effects of substances. Research shows MAT significantly improves treatment retention, reduces overdose deaths by 50%, and supports long-term recovery better than therapy alone for opioid and alcohol use disorders." },
          { question: "Will taking addiction medication just replace one drug with another?", answer: "Absolutely not. MAT medications are prescribed by doctors, taken at therapeutic doses that don't produce euphoria, are safe when used as prescribed, and help restore normal brain function disrupted by addiction. They're evidence-based medical treatments, not replacement addictions. This myth prevents many people from accessing life-saving treatment." },
          { question: "Can you treat my addiction and mental health issues together in Orlando?", answer: "Yes, and we strongly recommend it. Over 50% of people with addiction have co-occurring mental health conditions like depression, anxiety, PTSD, or bipolar disorder. Integrated treatment addressing both conditions simultaneously produces significantly better outcomes than treating them separately. Our psychiatrists specialize in co-occurring disorders and develop comprehensive treatment plans." }
        ]),
        order: 9,
      },
      {
        title: "Postpartum Depression & Perinatal Mood Disorders",
        description: "Depression and anxiety during pregnancy and after childbirth",
        slug: "postpartum-depression-perinatal-mood-disorders",
        pageTitle: "Postpartum Depression Treatment in Winter Park, FL | Empathy Health",
        heroTitle: "Compassionate Postpartum Depression Treatment",
        heroDescription: "Specialized perinatal mental health care in Winter Park, FL. Our team provides safe, effective treatment for postpartum depression, anxiety, and other mood disorders during pregnancy and after childbirth.",
        fullDescription: "Postpartum depression and perinatal mood disorders affect up to 1 in 7 new mothers, making them one of the most common complications associated with pregnancy and childbirth. These conditions can also impact expectant mothers during pregnancy, presenting unique challenges during what is often expected to be a joyful time. At Empathy Health Clinic, located in Winter Park and serving the greater Orlando area, we specialize in providing compassionate care for postpartum depression, postpartum anxiety, pregnancy-related depression, and postpartum OCD. These conditions are not a reflection of a mother’s ability or love for her child; they are medical issues that deserve attention, support, and effective treatment.\n\nPostpartum depression is characterized by feelings of sadness, hopelessness, irritability, or emotional numbness that persist beyond the typical “baby blues” period, which usually lasts a few weeks. Symptoms may also include fatigue, difficulty bonding with the baby, changes in appetite, sleep disruptions, and feelings of guilt or inadequacy. Postpartum anxiety, on the other hand, can manifest as constant worry, racing thoughts, or a sense of dread that interferes with daily life and parenting. Postpartum OCD often involves intrusive, distressing thoughts or compulsive behaviors related to the baby’s safety. These conditions can affect anyone, regardless of socioeconomic background, age, or prior mental health history. While risk factors such as hormonal changes, sleep deprivation, previous mental health challenges, and lack of social support may contribute, it’s important to recognize that these disorders are medical conditions—not personal failings.\n\nAt Empathy Health Clinic, we understand the profound impact that postpartum depression and perinatal mood disorders can have on mothers and families. We offer evidence-based treatment that is tailored to the unique needs of mothers during pregnancy and postpartum. Our approach combines psychotherapy, medication management when appropriate, and holistic support to help mothers regain balance and well-being. In therapy, we use modalities such as cognitive-behavioral therapy (CBT) and interpersonal therapy (IPT) to address the emotional challenges, negative thought patterns, and relational dynamics that often accompany perinatal mood disorders. For mothers who require medication, we prioritize options that are safe during pregnancy and breastfeeding, carefully evaluating each individual’s needs while ensuring the health of both mother and baby. Additionally, Empathy Health Clinic offers psychoeducation and coping strategies to empower mothers and their families throughout the recovery process.\n\nSeeking treatment for postpartum depression and perinatal mood disorders is an act of strength and love—not a sign of weakness. Mothers who receive proper care often experience significant improvements in mood, energy, and overall quality of life, allowing them to enjoy the precious moments of early motherhood. At Empathy Health Clinic, we are committed to providing nonjudgmental care that validates the experiences of mothers and supports their mental health journey. You deserve to feel like yourself again, and reaching out for help is a courageous step toward healing. If you are in Winter Park, Orlando, or the surrounding areas, contact Empathy Health Clinic today to learn more about how we can help you navigate postpartum depression and perinatal mood disorders with care, understanding, and expert treatment.",
        symptoms: "Postpartum depression symptoms include persistent sadness, crying spells, feeling overwhelmed or unable to cope, loss of interest in the baby or excessive worry about the baby, difficulty bonding, withdrawal from loved ones, changes in sleep or appetite, irritability or anger, feelings of worthlessness or guilt, difficulty concentrating, scary intrusive thoughts about harming the baby, and thoughts of self-harm.",
        relatedTreatments: JSON.stringify([]),
        relatedTherapies: JSON.stringify(["cognitive-behavioral-therapy", "individual-therapy", "couples-marriage-therapy"]),
        faqs: JSON.stringify([
          { question: "Is postpartum depression different from 'baby blues'?", answer: "Yes. Baby blues involve mild mood swings and tearfulness in the first two weeks after birth and resolve on their own. Postpartum depression is more severe, lasts longer (beyond two weeks), and requires treatment. If you're struggling, reach out." },
          { question: "Can I take antidepressants while breastfeeding?", answer: "Many antidepressants are safe during breastfeeding. Your psychiatrist will discuss options that have extensive safety data. Untreated postpartum depression poses risks too, so treatment is important for both you and baby." },
          { question: "Will postpartum depression affect my ability to be a good mother?", answer: "Postpartum depression is a medical condition, not a reflection of your love for your child or your ability to parent. With treatment, you'll feel better and be more present for your baby. Treatment makes you a better parent." },
          { question: "How long does postpartum depression last?", answer: "Without treatment, postpartum depression can last months or even years. With appropriate treatment (therapy and/or medication), most women start feeling significantly better within 6-8 weeks." }
        ]),
        order: 10,
      },
      {
        title: "Schizophrenia & Psychotic Disorders",
        description: "Schizophrenia, schizoaffective disorder, and other psychotic disorders with hallucinations and delusions",
        slug: "services",
        pageTitle: "Schizophrenia Treatment in Winter Park, FL | Psychotic Disorder Care | Empathy Health",
        heroTitle: "Specialized Schizophrenia & Psychotic Disorder Treatment",
        heroDescription: "Expert schizophrenia treatment in Winter Park, FL. Our psychiatric team provides comprehensive medication management, therapy, and ongoing support for schizophrenia, schizoaffective disorder, and other psychotic disorders.",
        fullDescription: "Schizophrenia and psychotic disorders are complex and serious mental health conditions that profoundly affect thought processes, perceptions, emotional regulation, and social functioning. These disorders, which include schizophrenia, schizoaffective disorder, and other psychotic spectrum conditions, can disrupt nearly every aspect of a person’s life. At Empathy Health Clinic, located in Winter Park near Orlando, we understand the challenges these conditions present and offer expert, patient-centered care to help individuals regain stability and achieve a better quality of life.\n\nSchizophrenia and psychotic disorders are characterized by symptoms such as hallucinations, delusions, disorganized thinking, and impaired reality testing. Hallucinations often involve hearing voices or seeing things that aren’t there, while delusions are fixed, false beliefs that remain despite evidence to the contrary. Other symptoms may include difficulty concentrating, emotional withdrawal, reduced motivation, and impaired communication. These conditions can vary significantly in severity and may fluctuate over time, making consistent and personalized treatment essential. Though psychotic disorders can occur in individuals of any age, they often emerge in late adolescence or early adulthood, and affect both men and women. While the exact causes are not fully understood, a combination of genetic, neurobiological, and environmental factors is believed to contribute to their development.\n\nAt Empathy Health Clinic, we specialize in treating schizophrenia and psychotic disorders with a comprehensive, evidence-based approach. Our treatment plans are tailored to meet the unique needs of each patient and often include a combination of antipsychotic medications, psychotherapy, and supportive services. Medication plays a vital role in reducing symptoms such as hallucinations and delusions, and our experienced psychiatrists carefully select and adjust prescriptions to optimize effectiveness while minimizing side effects. In addition to medication management, we offer individual therapy to help patients develop coping skills, address emotional challenges, and improve overall functioning. Cognitive Behavioral Therapy (CBT) and supportive therapy are particularly effective in addressing distorted thinking patterns and fostering emotional resilience.\n\nRecognizing that living with schizophrenia or a psychotic disorder can be overwhelming, we also emphasize the importance of family involvement and psychoeducation. Our team works closely with patients and their loved ones to ensure they understand the condition, the treatment process, and strategies to navigate daily life. We offer group therapy and peer support opportunities to promote connection and reduce feelings of isolation. For individuals facing acute crises or significant instability, we provide intensive outpatient programs designed to deliver focused care while allowing patients to remain in their communities.\n\nAt Empathy Health Clinic, we are deeply committed to helping individuals with schizophrenia and psychotic disorders achieve meaningful recovery. While these conditions often require long-term care, our goal is to empower patients to lead fulfilling lives by reducing symptoms, improving social and occupational functioning, and fostering emotional well-being. Serving Winter Park, Orlando, and surrounding areas, our clinic is a trusted resource for compassionate, expert mental health treatment. We are dedicated to walking alongside you on your treatment journey and supporting you every step of the way.",
        symptoms: "Schizophrenia symptoms include hallucinations (seeing or hearing things that aren't there), delusions (false beliefs), disorganized thinking and speech, extremely disorganized or abnormal motor behavior, flat affect or reduced emotional expression, social withdrawal, difficulty concentrating, lack of motivation, and impaired functioning in work, relationships, or self-care.",
        relatedTreatments: JSON.stringify(["medication-management"]),
        relatedTherapies: JSON.stringify(["individual-therapy"]),
        faqs: JSON.stringify([
          { question: "Is schizophrenia treatable?", answer: "Yes. While schizophrenia is a chronic condition, it's highly treatable with antipsychotic medications and therapy. Most people with schizophrenia can manage their symptoms effectively and live fulfilling lives with proper treatment and support." },
          { question: "Will I need to take medication forever?", answer: "Most people with schizophrenia require long-term medication to prevent relapse and manage symptoms. Stopping medication typically leads to symptom return. Your psychiatrist will work with you to find the right medication with the fewest side effects." },
          { question: "What are the side effects of antipsychotic medications?", answer: "Side effects vary by medication but may include weight gain, drowsiness, or movement issues. Newer antipsychotics tend to have fewer side effects. We monitor closely and can adjust medications to minimize unwanted effects while maintaining symptom control." },
          { question: "Can therapy help schizophrenia?", answer: "Yes. While medication is the primary treatment, therapy helps with coping strategies, medication adherence, social skills, and managing daily life challenges. Family therapy can also be beneficial for support and education." }
        ]),
        order: 11,
      },
    ];

    defaultConditions.forEach((condition) => {
      const id = randomUUID();
      this.conditions.set(id, { id, ...condition });
    });

    // Initialize location pages
    const defaultLocations: InsertLocation[] = [
      {
        title: "Psychiatry Services in Winter Park, FL",
        slug: "psychiatry-winter-park",
        city: "Winter Park",
        serviceType: "psychiatry",
        pageTitle: "Psychiatrist in Winter Park, FL | Empathy Health Clinic",
        metaDescription: "Looking for a psychiatrist in Winter Park? Empathy Health Clinic offers comprehensive psychiatric evaluation, medication management, and mental health treatment. Same-week appointments available.",
        heroTitle: "Trusted Psychiatry Services in Winter Park",
        heroDescription: "Expert psychiatric care in Winter Park, FL. Our board-certified psychiatrists provide comprehensive mental health evaluations, medication management, and personalized treatment for depression, anxiety, ADHD, bipolar disorder, and more.",
        description: "Empathy Health Clinic is proud to serve the Winter Park, FL community with expert psychiatric care designed to support your mental health journey. As a trusted resource for individuals and families, we specialize in providing personalized, evidence-based treatments that empower you to live your best life. Conveniently located in Winter Park, our clinic is committed to creating a safe, welcoming environment where you feel heard and understood. Our comprehensive psychiatric services are tailored to meet the unique needs of each patient. We treat a wide range of mental health conditions, including anxiety, depression, bipolar disorder, ADHD, PTSD, and obsessive-compulsive disorder (OCD). Whether you’re navigating daily stress or managing a complex condition, our board-certified psychiatrists work closely with you to develop effective treatment plans. We offer medication management, diagnostic evaluations, and ongoing support to ensure you experience lasting relief and improved well-being. At Empathy Health Clinic, your mental health is our priority, and we are here to help you achieve stability and resilience. Located in the heart of Winter Park, our clinic is easily accessible to residents in nearby neighborhoods such as Baldwin Park, College Park, and Maitland. Just minutes from iconic landmarks like Rollins College and Winter Park’s scenic Park Avenue, our location makes it simple for you to prioritize your mental health without straying far from home. We understand the importance of convenience and accessibility, which is why we strive to serve our Winter Park community with care that fits seamlessly into your busy life. At Empathy Health Clinic, we believe every patient deserves compassionate, individualized care. If you’re ready to take the first step toward better mental health, we encourage you to contact us today to schedule an appointment. Our dedicated team is here to support you every step of the way. Let us help you find hope, healing, and a brighter tomorrow.",
        servicesOffered: JSON.stringify([
          "Psychiatric Evaluation & Diagnosis",
          "Medication Management",
          "Depression Treatment",
          "Anxiety Treatment",
          "ADHD Treatment",
          "Bipolar Disorder Treatment",
          "PTSD Treatment",
          "Telehealth Psychiatry"
        ]),
        whyChooseUs: "Our Winter Park psychiatry practice combines clinical excellence with compassionate care. We take time to listen, provide thorough evaluations, and develop personalized treatment plans that work for your lifestyle. With convenient telehealth options and same-week appointments, getting quality mental health care in Winter Park has never been easier.",
        faqs: JSON.stringify([
          { question: "Do you accept insurance in Winter Park?", answer: "Yes, we accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, Humana, UnitedHealthcare, and more. We also offer self-pay options." },
          { question: "Can I see a psychiatrist via telehealth in Winter Park?", answer: "Absolutely! We offer secure video visits that let you meet with our psychiatrists from home. Telehealth appointments are just as effective as in-person visits for medication management and follow-ups." },
          { question: "How quickly can I get an appointment in Winter Park?", answer: "We typically offer same-week appointments for new patients. Call us at 386-848-8751 to schedule your psychiatric evaluation." },
          { question: "What's the difference between a psychiatrist and a therapist?", answer: "Psychiatrists are medical doctors who can prescribe medication and provide medical treatment for mental health conditions. We also offer therapy services through our licensed counselors for comprehensive care." }
        ]),
        order: 1,
      },
      {
        title: "Therapy Services in Winter Park, FL",
        slug: "therapy-services-winter-park",
        city: "Winter Park",
        serviceType: "therapy-services",
        pageTitle: "Therapy & Counseling in Winter Park, FL | Empathy Health Clinic",
        metaDescription: "Professional therapy and counseling services in Winter Park, FL. CBT, couples therapy, EMDR, depression counseling, and anxiety treatment. Accepting new patients.",
        heroTitle: "Compassionate Therapy Services in Winter Park",
        heroDescription: "Transform your life with expert therapy in Winter Park, FL. Our licensed therapists specialize in CBT, couples counseling, trauma therapy, depression treatment, and anxiety management. In-person and online sessions available.",
        description: "Empathy Health Clinic is proud to be a trusted resource for mental health care in Winter Park, FL. Located in the heart of this vibrant community, we are dedicated to helping individuals achieve emotional well-being and live fulfilling lives. Our experienced team of licensed therapists and counselors offers personalized care tailored to your unique needs, ensuring you feel supported every step of the way. At Empathy Health Clinic, we provide a wide range of therapy and counseling services to address various mental health challenges. Whether you're struggling with anxiety, depression, trauma, relationship issues, or stress management, our compassionate professionals are here to help. We specialize in evidence-based approaches, including cognitive-behavioral therapy (CBT), trauma-focused therapy, and mindfulness-based practices, to empower you with the tools and strategies needed to overcome life’s challenges. We also offer specialized care for individuals navigating grief, postpartum mental health, or major life transitions. Conveniently located near Winter Park landmarks like the Mead Botanical Garden and Park Avenue, our clinic is easily accessible to residents throughout the area. Whether you’re from the charming neighborhoods of Orwin Manor, Baldwin Park, or College Park, our central location makes getting the care you need simple and stress-free. With flexible scheduling options and a welcoming environment, we strive to make your therapy experience as smooth and comfortable as possible. At Empathy Health Clinic, we believe everyone deserves compassionate, patient-centered care. Our mission is to create a safe space where you feel heard, valued, and empowered to thrive. If you’re ready to take the first step toward better mental health, we’re here to guide you. Winter Park residents are encouraged to contact us today to schedule an appointment and begin your journey toward healing. Let us help you rediscover your inner strength and achieve lasting emotional wellness. We understand that seeking therapy is a courageous step, and we're committed to making your experience comfortable and confidential. Our team stays current with the latest research and therapeutic techniques to provide you with the most effective, evidence-based care available.",
        servicesOffered: JSON.stringify([
          "Cognitive Behavioral Therapy (CBT)",
          "Individual Therapy",
          "Couples Therapy & Marriage Counseling",
          "EMDR Therapy for Trauma",
          "Depression Counseling",
          "Anxiety Therapy",
          "Grief Counseling",
          "LGBTQ+ Affirming Therapy",
          "Virtual Counseling Services"
        ]),
        whyChooseUs: "Our Winter Park therapists are committed to providing personalized, evidence-based care in a warm, non-judgmental environment. We accept most insurance plans, offer flexible scheduling with evening appointments, and provide both in-person and virtual therapy sessions to fit your lifestyle.",
        faqs: JSON.stringify([
          { question: "How do I choose the right therapist in Winter Park?", answer: "We'll help match you with a therapist who specializes in your specific concerns. During your first session, you'll discuss your goals and determine if it's a good fit. You can always request to see a different therapist if needed." },
          { question: "Does insurance cover therapy in Winter Park?", answer: "Most major insurance plans cover therapy services. We're in-network with Aetna, Blue Cross Blue Shield, Cigna, Humana, and UnitedHealthcare. Our team can verify your benefits before your first appointment." },
          { question: "Do you offer virtual therapy for Winter Park residents?", answer: "Yes! We provide secure, HIPAA-compliant video therapy sessions that are just as effective as in-person counseling. Perfect for busy schedules or those who prefer therapy from home." },
          { question: "How long does therapy take?", answer: "The length of therapy varies based on your goals and needs. Some people benefit from short-term therapy (6-12 sessions), while others prefer ongoing support. Your therapist will work with you to create a personalized treatment plan." }
        ]),
        order: 2,
      },
      {
        title: "Therapy & Counseling Services in Sanford, FL",
        slug: "therapy-services-sanford",
        city: "Sanford",
        serviceType: "therapy-services",
        pageTitle: "Therapist in Sanford, FL | Counseling Services | Empathy Health",
        metaDescription: "Professional therapy and counseling in Sanford, FL. Expert treatment for depression, anxiety, trauma, and relationship issues. Telehealth and in-person sessions available.",
        heroTitle: "Expert Therapy & Counseling in Sanford",
        heroDescription: "Quality mental health therapy serving Sanford, FL. Our licensed counselors provide CBT, trauma therapy, couples counseling, and treatment for depression and anxiety. Same-week appointments available.",
        description: "Empathy Health Clinic is proud to serve the Sanford, Florida community with expert mental health care tailored to meet the unique needs of each individual. Conveniently located in the heart of Sanford, our clinic is committed to helping residents find hope and healing through compassionate, evidence-based therapy and counseling services. With a team of highly trained and empathetic therapists, we are here to support you on your journey toward improved mental health and overall well-being. At Empathy Health Clinic, we offer a wide range of therapy and counseling services designed to address various mental health concerns. Whether you’re struggling with anxiety, depression, trauma, bipolar disorder, or relationship challenges, our licensed professionals are here to provide personalized care in a safe and supportive environment. We specialize in individual therapy, couples counseling, family therapy, and group sessions, ensuring that all of our patients receive the attention and care they deserve. Using proven therapeutic approaches such as cognitive-behavioral therapy (CBT), dialectical behavior therapy (DBT), and mindfulness-based techniques, we empower you to develop healthier coping strategies and achieve lasting positive change. Our clinic is easily accessible for Sanford residents, located near popular landmarks such as the Sanford Riverwalk and downtown Sanford neighborhoods. With convenient parking and proximity to major routes, including US-17/92 and SR-46, visiting Empathy Health Clinic is simple and stress-free. We’re proud to be a trusted mental health resource for those living in Sanford and surrounding areas, including Lake Mary, Heathrow, and Midway. At Empathy Health Clinic, we understand that seeking therapy can be a big step, and we’re here to walk alongside you every step of the way. If you’re ready to take control of your mental health and start feeling like yourself again, contact us today to schedule an appointment. Let us help you discover a brighter future—call now to begin your journey to better mental health.",
        servicesOffered: JSON.stringify([
          "Individual Counseling",
          "Couples Therapy",
          "Family Therapy",
          "CBT for Depression & Anxiety",
          "Trauma & PTSD Therapy",
          "Grief Counseling",
          "Anger Management",
          "Telehealth Counseling"
        ]),
        whyChooseUs: "Serving Sanford with personalized, judgment-free therapy that fits your schedule. We accept most insurance plans and offer both virtual and in-person sessions to accommodate your needs. Our therapists have extensive experience helping Sanford residents overcome challenges and build healthier, happier lives.",
        faqs: JSON.stringify([
          { question: "Do you have therapists who see Sanford patients?", answer: "Yes! We serve Sanford residents through convenient telehealth sessions and can also arrange in-person appointments. Our therapists are licensed in Florida and experienced in treating a wide range of mental health concerns." },
          { question: "How much does therapy cost in Sanford?", answer: "Costs vary based on your insurance coverage. We accept most major insurance plans. For self-pay patients, we offer competitive rates and can discuss payment options during your consultation." },
          { question: "Can I do therapy online if I live in Sanford?", answer: "Absolutely! Virtual therapy is a great option for Sanford residents. You'll meet with your therapist via secure video chat from the comfort of home. It's private, convenient, and just as effective as in-person sessions." }
        ]),
        order: 3,
      },
      {
        title: "Therapy & Counseling Services in Lake Mary, FL",
        slug: "therapy-services-lake-mary",
        city: "Lake Mary",
        serviceType: "therapy-services",
        pageTitle: "Therapist in Lake Mary, FL | Counseling Services | Empathy Health",
        metaDescription: "Professional therapy and counseling in Lake Mary, FL. Licensed therapists providing CBT, couples therapy, anxiety treatment, and depression counseling. Accepting new patients.",
        heroTitle: "Compassionate Therapy Services in Lake Mary",
        heroDescription: "Trusted mental health therapy for Lake Mary, FL residents. Our licensed counselors offer individual therapy, couples counseling, and specialized treatment for anxiety, depression, trauma, and relationship issues.",
        description: "Empathy Health Clinic is proud to serve the Lake Mary, Florida community with expert mental health care designed to support individuals, couples, and families. Our experienced team of licensed therapists is dedicated to helping you navigate life’s challenges with compassion, professionalism, and personalized care. Whether you’re seeking support for ongoing mental health concerns or simply need guidance during a difficult time, Empathy Health Clinic is here to help you find hope and healing. At Empathy Health Clinic, we offer a wide range of therapy and counseling services tailored to meet your unique needs. We specialize in treating anxiety, depression, trauma, grief, relationship issues, stress management, and more. Our evidence-based approaches include cognitive-behavioral therapy (CBT), mindfulness-based therapy, and solution-focused techniques, ensuring you receive the care that works best for you. We also offer couples counseling, family therapy, and individual therapy sessions to address a variety of concerns in a safe and supportive environment. No matter where you are on your mental health journey, our team is committed to helping you achieve emotional well-being. Conveniently located near the heart of Lake Mary, Empathy Health Clinic is easily accessible to residents from nearby neighborhoods such as Heathrow, Timacuan, and Crystal Lake Estates. We’re just a short drive from popular landmarks like Lake Mary Boulevard and the Lake Mary City Hall, making it easy for you to prioritize your mental health without disrupting your daily routine. Our comfortable and welcoming office is designed to provide a calming atmosphere where you can feel at ease. At Empathy Health Clinic, your well-being is our top priority. If you’re ready to take the first step toward a healthier, more balanced life, we invite you to schedule an appointment today. Contact us to learn more or book your session—we’re here to support you every step of the way.",
        servicesOffered: JSON.stringify([
          "Individual Therapy",
          "Marriage & Couples Counseling",
          "CBT Therapy",
          "Anxiety Counseling",
          "Depression Treatment",
          "Stress Management",
          "Life Coaching",
          "Virtual Therapy Sessions"
        ]),
        whyChooseUs: "Our Lake Mary therapists combine clinical expertise with genuine compassion. We take time to understand your unique situation and develop treatment plans that align with your goals. With evening appointments available and convenient telehealth options, getting the support you need has never been easier.",
        faqs: JSON.stringify([
          { question: "Are your therapists licensed to practice in Lake Mary?", answer: "Yes, all our therapists are licensed in Florida and provide services to Lake Mary residents both in-person and via telehealth." },
          { question: "What types of therapy do you offer in Lake Mary?", answer: "We offer a wide range of therapy approaches including CBT, EMDR, solution-focused therapy, couples counseling, and more. During your consultation, we'll match you with a therapist who specializes in your specific needs." },
          { question: "Do you accept insurance for Lake Mary patients?", answer: "Yes, we accept most major insurance plans including Aetna, BCBS, Cigna, Humana, and UnitedHealthcare. We can verify your benefits before your first appointment." }
        ]),
        order: 4,
      },
      {
        title: "Counseling Services in Winter Park, FL",
        slug: "counseling-winter-park",
        city: "Winter Park",
        serviceType: "counseling",
        pageTitle: "Counselor in Winter Park, FL | Mental Health Counseling | Empathy Health",
        metaDescription: "Professional mental health counseling in Winter Park, FL. Licensed counselors providing individual therapy, family counseling, and support for anxiety, depression, and life challenges.",
        heroTitle: "Professional Counseling Services in Winter Park",
        heroDescription: "Experienced mental health counselors serving Winter Park, FL. Get support for anxiety, depression, stress, relationships, and life transitions. Compassionate, evidence-based counseling tailored to your needs.",
        description: "Empathy Health Clinic is proud to be a trusted provider of mental health counseling services in Winter Park, FL. Conveniently located in the heart of this vibrant community, our clinic is dedicated to helping individuals and families achieve emotional well-being through compassionate, evidence-based care. With a team of licensed therapists and counselors, we offer a safe, supportive space for you to explore your feelings, overcome challenges, and build resilience. Our counseling services are designed to address a variety of mental health concerns, including anxiety, depression, trauma, relationship conflicts, grief, and stress management. Whether you’re navigating a difficult life transition, coping with a chronic mental health condition, or seeking guidance for personal growth, we tailor our approach to meet your unique needs and goals. At Empathy Health Clinic, we specialize in individual therapy, couples counseling, family therapy, and group sessions. By combining proven therapeutic techniques with genuine empathy, we empower our patients to find clarity, healing, and renewed purpose. Located just minutes from Winter Park landmarks like Rollins College and Central Park, our clinic is easily accessible to residents across the area, including nearby neighborhoods like Baldwin Park, Park Avenue, and Orwin Manor. We understand the importance of convenience, which is why we strive to provide flexible scheduling options to accommodate your busy lifestyle. At Empathy Health Clinic, we believe mental health care should always be personalized and compassionate. From the moment you walk through our doors, you’ll be met with understanding and support by professionals who truly care about your well-being. If you’re a Winter Park resident seeking expert counseling services in a welcoming environment, we invite you to take the first step toward a healthier, happier future. Contact us today to schedule your appointment and begin your journey to emotional wellness. We offer both short-term focused counseling and long-term therapeutic support depending on your goals. Our counselors are trained in culturally sensitive practices and create an inclusive environment where all individuals feel welcomed and respected.",
        servicesOffered: JSON.stringify([
          "Individual Counseling",
          "Family Counseling",
          "Anxiety Counseling",
          "Depression Counseling",
          "Stress Management",
          "Grief & Loss Support",
          "Life Transitions Counseling",
          "Telehealth Counseling"
        ]),
        whyChooseUs: "Our Winter Park counselors are dedicated to helping you achieve your mental health goals in a warm, judgment-free environment. We offer flexible scheduling including evening appointments, accept most insurance plans, and provide both in-person and virtual counseling options for your convenience.",
        faqs: JSON.stringify([
          { question: "What's the difference between a counselor and a therapist?", answer: "The terms are often used interchangeably. Both counselors and therapists are licensed mental health professionals who provide talk therapy. Our team includes Licensed Mental Health Counselors (LMHCs) who are highly trained to help with a wide range of mental health concerns." },
          { question: "How do I know if counseling is right for me?", answer: "If you're feeling overwhelmed, struggling with relationships, experiencing anxiety or depression, or simply want support during a difficult time, counseling can help. We offer a consultation to discuss your needs and determine if our services are a good fit." },
          { question: "Can I see a counselor online in Winter Park?", answer: "Yes! We offer secure, HIPAA-compliant online counseling sessions that are convenient and just as effective as in-person visits. Many Winter Park residents prefer the flexibility of virtual counseling." }
        ]),
        order: 5,
      },
      {
        title: "Therapy & Counseling Services in Orlando, FL",
        slug: "therapy-services-orlando",
        city: "Orlando",
        serviceType: "therapy-services",
        pageTitle: "Therapy Services in Orlando | Mental Health Therapy | Empathy Health Clinic",
        metaDescription: "Affordable therapy Orlando with most insurance accepted. Mental health therapy Orlando for anxiety, depression, trauma, and relationships. Licensed therapists, same-week appointments.",
        heroTitle: "Therapy Services in Orlando – Empathy Health Clinic",
        heroDescription: "Quality mental health therapy Orlando residents trust. Our licensed therapists provide affordable therapy Orlando with most insurance accepted. Individual counseling, couples therapy, CBT, EMDR, and specialized treatment for anxiety, depression, and trauma. Same-week appointments available.",
        description: "Empathy Health Clinic is proud to be a trusted provider of mental health therapy and counseling services in the heart of Orlando, Florida. Our team of licensed therapists and mental health professionals is dedicated to helping individuals and families navigate life’s challenges with compassion and evidence-based care. Whether you’re seeking support for anxiety, depression, trauma, or relationship difficulties, our personalized approach ensures you receive the highest level of care tailored to your unique needs. At Empathy Health Clinic, we offer a wide range of therapy services designed to support your mental health journey. Our specialties include individual therapy for overcoming stress and anxiety, couples counseling to strengthen relationships, and family therapy to improve communication and resolve conflicts. We also provide treatment for conditions such as PTSD, bipolar disorder, ADHD, and grief. Using proven therapeutic modalities like cognitive behavioral therapy (CBT), dialectical behavior therapy (DBT), and mindfulness-based approaches, we empower you to build resilience and achieve lasting emotional well-being. Conveniently located near downtown Orlando, Empathy Health Clinic serves residents across the city and surrounding neighborhoods, including Thornton Park, Baldwin Park, and College Park. Our office is easily accessible, whether you’re visiting from nearby attractions like Lake Eola Park or commuting from other parts of Orlando. We strive to create a welcoming environment where every patient feels valued and supported on their path to mental wellness. At Empathy Health Clinic, we believe in treating the whole person with empathy, respect, and a commitment to your healing. Our compassionate team is here to listen, guide, and help you discover the tools you need to thrive. If you’re ready to make your mental health a priority, contact us today to schedule an appointment. Let us partner with you on your journey toward a brighter, healthier future. Our therapists accept most major insurance plans and offer sliding scale fees to ensure mental health care remains accessible to all Orlando residents. We provide a safe, confidential space where you can explore your thoughts and feelings without judgment.",
        servicesOffered: JSON.stringify([
          "Individual Therapy",
          "Couples & Marriage Counseling",
          "Cognitive Behavioral Therapy (CBT)",
          "EMDR Therapy for Trauma",
          "Anxiety & Depression Treatment",
          "Family Therapy",
          "Grief & Loss Counseling",
          "LGBTQ+ Affirming Therapy",
          "Affordable Therapy Options",
          "Telehealth & Virtual Counseling"
        ]),
        whyChooseUs: "Our Orlando therapists combine clinical expertise with genuine compassion to help you achieve your mental health goals. We accept most insurance plans including Aetna, Blue Cross Blue Shield, Cigna, and UnitedHealthcare, making quality therapy affordable. With flexible scheduling, evening appointments, and convenient virtual therapy options, accessing mental health care in Orlando has never been easier.",
        faqs: JSON.stringify([
          { question: "How much does therapy cost in Orlando?", answer: "Therapy costs vary based on your insurance coverage. We accept most major insurance plans, and our staff can verify your benefits before your first appointment. For self-pay patients, we offer competitive rates and can discuss payment options during your consultation." },
          { question: "Do you offer affordable therapy options in Orlando?", answer: "Yes! We work with most insurance providers to keep therapy affordable. We're in-network with Aetna, Blue Cross Blue Shield, Cigna, Humana, UnitedHealthcare, and more. Our team can help you understand your coverage and out-of-pocket costs." },
          { question: "Can I do therapy online if I live in Orlando?", answer: "Absolutely! We offer secure, HIPAA-compliant virtual therapy sessions that are convenient and just as effective as in-person visits. Many Orlando residents prefer telehealth therapy for its flexibility and accessibility." },
          { question: "What types of therapy do you offer in Orlando?", answer: "We offer a wide range of evidence-based therapies including CBT, EMDR, individual counseling, couples therapy, family therapy, and specialized treatment for anxiety, depression, trauma, and relationship issues. We'll match you with a therapist who specializes in your specific needs." }
        ]),
        order: 6,
      },
      {
        title: "Psychiatrist in Orlando, FL",
        slug: "psychiatrist-orlando",
        city: "Orlando",
        serviceType: "psychiatry",
        pageTitle: "Psychiatrist in Orlando, FL | Mental Health Treatment | Empathy Health",
        metaDescription: "Experienced psychiatrist in Orlando, FL. Board-certified psychiatric care for depression, anxiety, ADHD, bipolar disorder. Medication management, evaluations, and telehealth options available.",
        heroTitle: "Psychiatrist in Orlando, FL",
        heroDescription: "Expert psychiatric care in Orlando. Our board-certified psychiatrists provide comprehensive mental health evaluations, medication management, and personalized treatment for depression, anxiety, ADHD, and more.",
        description: "Empathy Health Clinic proudly serves the Orlando community with expert psychiatric care tailored to meet the unique needs of each individual. Conveniently located in the heart of Orlando, our clinic is committed to providing compassionate, patient-centered mental health services to help you navigate life’s challenges. Our team of highly skilled psychiatrists and mental health professionals is dedicated to offering evidence-based treatment in a warm, supportive environment, ensuring every patient feels heard and understood. At Empathy Health Clinic, our psychiatric services are designed to address a wide range of mental health concerns. Whether you’re struggling with anxiety, depression, bipolar disorder, ADHD, or PTSD, we offer personalized treatment plans to help you regain control of your mental health. Our services include psychiatric evaluations, medication management, and therapy referrals. We take the time to understand your unique situation and provide care that prioritizes your well-being and long-term mental health goals. With a focus on holistic care, we collaborate with you to create a plan that fosters healing and resilience. Located just a short drive from Orlando’s iconic neighborhoods, such as College Park, Thornton Park, and Lake Eola Heights, Empathy Health Clinic is easily accessible to residents throughout the city. Whether you’re near the bustling downtown area or closer to local landmarks like Universal Studios or the Orlando Science Center, our clinic is here to serve you. We strive to make quality psychiatric care convenient and stress-free for all Orlando residents. At Empathy Health Clinic, we believe everyone deserves compassionate mental health care in a safe and welcoming space. If you or a loved one is seeking professional psychiatric services in Orlando, we are here to help. Take the first step toward better mental health by scheduling an appointment today. Contact us to start your journey toward a brighter, healthier future. Our psychiatrists collaborate with primary care physicians and other healthcare providers to ensure comprehensive, coordinated care. We offer flexible appointment times including evenings and weekends to accommodate busy schedules throughout the greater Orlando area.",
        servicesOffered: JSON.stringify([
          "Psychiatric Evaluations",
          "Medication Management",
          "Depression Treatment",
          "Anxiety Disorder Treatment",
          "ADHD Diagnosis & Treatment",
          "Bipolar Disorder Management",
          "PTSD Treatment",
          "Telehealth Psychiatry Services"
        ]),
        whyChooseUs: "Our Orlando psychiatrists combine years of experience with a patient-centered approach. We accept most major insurance plans, offer flexible scheduling including telehealth visits, and provide compassionate care focused on your recovery and well-being.",
        faqs: JSON.stringify([
          { question: "What does a psychiatrist do?", answer: "Psychiatrists are medical doctors specializing in mental health. They diagnose mental health conditions, prescribe and manage medications, and provide comprehensive psychiatric care. At Empathy Health, our psychiatrists work with you to develop personalized treatment plans." },
          { question: "Do I need a referral to see a psychiatrist in Orlando?", answer: "No referral needed! You can schedule directly with our Orlando psychiatrists by calling 386-848-8751." },
          { question: "Does insurance cover psychiatry visits in Orlando?", answer: "Yes, we accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, Humana, and UnitedHealthcare. Our staff can verify your benefits before your appointment." },
          { question: "Can I see an Orlando psychiatrist via telehealth?", answer: "Absolutely! We offer secure video visits that allow you to meet with our psychiatrists from home. Telehealth appointments are convenient, private, and just as effective for medication management and follow-ups." }
        ]),
        order: 7,
      },
      {
        title: "Psychiatrist in Altamonte Springs, FL",
        slug: "psychiatrist-altamonte-springs",
        city: "Altamonte Springs",
        serviceType: "psychiatry",
        pageTitle: "Psychiatrist in Altamonte Springs, FL | Empathy Health Clinic",
        metaDescription: "Find a trusted psychiatrist in Altamonte Springs, FL. Expert treatment for depression, anxiety, ADHD, and bipolar disorder. Accepting new patients with most insurance accepted.",
        heroTitle: "Psychiatrist in Altamonte Springs, FL",
        heroDescription: "Compassionate psychiatric care serving Altamonte Springs. Our experienced psychiatrists provide medication management, mental health evaluations, and treatment for depression, anxiety, ADHD, and more.",
        description: "Empathy Health Clinic is proud to provide expert psychiatric services to the Altamonte Springs, Florida community. Located in the heart of this vibrant city, our team is committed to helping residents achieve better mental health through compassionate, personalized care. With years of experience and a dedication to understanding each patient’s unique needs, we aim to empower individuals to take control of their mental health and lead fulfilling lives. At Empathy Health Clinic, our psychiatric services are designed to address a wide range of mental health conditions, including depression, anxiety, bipolar disorder, post-traumatic stress disorder (PTSD), ADHD, and more. Our skilled psychiatrists specialize in diagnosing and treating these conditions with evidence-based approaches, including medication management and comprehensive treatment planning. Whether you’re seeking help for yourself or a loved one, our team works closely with you to create a customized care plan tailored to your goals and challenges. Conveniently located near Altamonte Springs landmarks like Cranes Roost Park and the Altamonte Mall, our clinic is easily accessible to residents across the city. Whether you live in nearby neighborhoods such as Spring Valley, Sanlando Springs, or within the bustling downtown area, Empathy Health Clinic is just a short drive away. With ample parking and a welcoming atmosphere, we strive to make your visit as stress-free as possible. At Empathy Health Clinic, we understand that seeking mental health care can feel overwhelming. That’s why we prioritize creating a safe, supportive environment where you feel heard and valued. Our compassionate approach ensures that every patient receives the care they deserve, with a focus on improving quality of life and overall well-being. Altamonte Springs residents seeking expert psychiatric care are encouraged to take the first step toward healing today. Contact Empathy Health Clinic to schedule an appointment and start your journey toward better mental health. We accept most major insurance plans and offer transparent pricing for self-pay patients. Our practice is conveniently located with ample parking and easy access from I-4 and the Altamonte Mall area, making it simple for residents throughout Seminole County to receive quality psychiatric care.",
        servicesOffered: JSON.stringify([
          "Comprehensive Psychiatric Evaluations",
          "Medication Management & Monitoring",
          "Depression & Anxiety Treatment",
          "ADHD Testing & Management",
          "Bipolar Disorder Care",
          "OCD Treatment",
          "Virtual Psychiatry Appointments",
          "Same-Week Appointments Available"
        ]),
        whyChooseUs: "Our Altamonte Springs psychiatrists are dedicated to providing exceptional, personalized care. We offer flexible scheduling, telehealth convenience, and accept most insurance plans to make quality mental health care accessible to everyone in the Altamonte Springs community.",
        faqs: JSON.stringify([
          { question: "How quickly can I see a psychiatrist in Altamonte Springs?", answer: "We typically offer same-week appointments for new patients. Call 386-848-8751 to schedule your psychiatric evaluation." },
          { question: "What should I bring to my first psychiatry appointment?", answer: "Bring your insurance card, photo ID, list of current medications, and any relevant medical records. It's also helpful to write down your symptoms and questions beforehand." },
          { question: "Do you offer virtual psychiatry for Altamonte Springs residents?", answer: "Yes! We provide secure telehealth appointments that let you meet with our psychiatrists from the comfort of your home. Virtual visits are perfect for medication management and follow-up appointments." },
          { question: "How much does it cost to see a psychiatrist in Altamonte Springs?", answer: "Costs vary based on insurance coverage. We accept most major insurance plans. Our staff can verify your benefits and explain costs before your first appointment." }
        ]),
        order: 8,
      },
      {
        title: "Psychiatrist in Maitland, FL",
        slug: "psychiatrist-maitland",
        city: "Maitland",
        serviceType: "psychiatry",
        pageTitle: "Psychiatrist in Maitland, FL | Mental Health Care | Empathy Health",
        metaDescription: "Board-certified psychiatrist in Maitland, FL. Expert psychiatric evaluations, medication management for depression, anxiety, ADHD. Telehealth and in-person appointments available.",
        heroTitle: "Psychiatrist in Maitland, FL",
        heroDescription: "Quality psychiatric care for Maitland residents. Our psychiatrists specialize in treating depression, anxiety, ADHD, bipolar disorder, and other mental health conditions with personalized, evidence-based care.",
        description: "Empathy Health Clinic is proud to provide expert psychiatric care to the Maitland, Florida community. As a trusted mental health clinic, we specialize in delivering personalized care tailored to your unique needs. Whether you're seeking support for anxiety, depression, ADHD, or other mental health challenges, our team of experienced psychiatric providers is dedicated to helping you find relief and regain control of your life. Located right in the heart of Maitland, we are committed to serving our neighbors with compassionate and effective mental health solutions. Our psychiatric services are designed to address a wide range of mental health conditions. At Empathy Health Clinic, we provide comprehensive evaluations, medication management, and ongoing support for conditions such as anxiety disorders, major depression, bipolar disorder, PTSD, ADHD, and more. We understand that mental health struggles can feel overwhelming, but with the right care, healing is possible. Our providers work closely with you to develop a treatment plan that aligns with your goals and focuses on improving your overall well-being. With evidence-based practices and a patient-centered approach, we strive to ensure you feel heard, respected, and supported every step of the way. Conveniently located near Maitland landmarks like Lake Lily Park and accessible from neighborhoods such as Dommerich Estates and Eatonville, Empathy Health Clinic is proud to be a part of your community. We understand the importance of accessible mental health care, and our clinic is designed with your comfort and convenience in mind. Whether you’re new to psychiatric care or looking for a trusted provider closer to home, our team is here to help. At Empathy Health Clinic, your mental health matters. Take the first step toward healing today by scheduling an appointment with our compassionate psychiatric team. Call us or visit our website to learn more about how we can support you on your journey to wellness.",
        servicesOffered: JSON.stringify([
          "Psychiatric Evaluations & Diagnosis",
          "Expert Medication Management",
          "Depression Treatment",
          "Anxiety Disorder Care",
          "ADHD Evaluation & Treatment",
          "Mood Disorder Management",
          "Telepsychiatry Services",
          "Personalized Treatment Plans"
        ]),
        whyChooseUs: "Our Maitland psychiatrists combine clinical excellence with genuine compassion. We take time to understand your unique situation and work collaboratively with you to achieve your mental health goals. With convenient telehealth visits and same-week appointments, quality psychiatric care is always within reach.",
        faqs: JSON.stringify([
          { question: "What's the difference between a psychiatrist and a psychologist?", answer: "Psychiatrists are medical doctors who can prescribe medication and provide medical treatment for mental health conditions. Psychologists focus on therapy and counseling but cannot prescribe medication. At Empathy Health, we offer both psychiatry and therapy services for comprehensive care." },
          { question: "Does insurance cover psychiatry in Maitland?", answer: "Yes, we accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, Humana, and UnitedHealthcare. We'll verify your benefits before your first appointment." },
          { question: "Can I see a Maitland psychiatrist online?", answer: "Absolutely! We offer secure telehealth appointments for your convenience. Many Maitland residents prefer virtual visits for ongoing medication management and follow-ups." },
          { question: "How long are psychiatry appointments?", answer: "Initial evaluations typically last 60-90 minutes. Follow-up medication management appointments are usually 20-30 minutes. Your psychiatrist will spend the time needed to address your concerns thoroughly." }
        ]),
        order: 9,
      },
      {
        title: "Psychiatrist in Casselberry, FL",
        slug: "psychiatrist-casselberry",
        city: "Casselberry",
        serviceType: "psychiatry",
        pageTitle: "Psychiatrist in Casselberry, FL | Empathy Health Clinic",
        metaDescription: "Trusted psychiatrist in Casselberry, FL. Comprehensive mental health care for depression, anxiety, ADHD, and more. Telehealth available. Most insurance accepted.",
        heroTitle: "Psychiatrist in Casselberry, FL",
        heroDescription: "Expert psychiatric services for Casselberry residents. Our psychiatrists provide thorough evaluations, medication management, and compassionate treatment for all mental health conditions.",
        description: "Empathy Health Clinic is proud to provide exceptional psychiatric care to the residents of Casselberry, Florida. As a trusted mental health clinic in the area, we are committed to helping individuals of all ages achieve emotional wellness and a better quality of life. With a team of compassionate, highly trained psychiatric professionals, Empathy Health Clinic offers evidence-based care tailored to meet the unique needs of each patient. Our psychiatric services in Casselberry include comprehensive evaluations, medication management, and treatment for a wide range of mental health conditions. Whether you’re struggling with anxiety, depression, bipolar disorder, ADHD, or PTSD, our experienced psychiatrists are here to help. We also offer specialized care for individuals navigating complex mental health challenges, such as schizophrenia or obsessive-compulsive disorder (OCD). At Empathy Health Clinic, we believe that effective mental health treatment starts with understanding your story, and we take the time to develop personalized care plans designed to empower you on your journey to recovery. Conveniently located near Casselberry neighborhoods like Deer Run and Crystal Bowl Circle, Empathy Health Clinic is easily accessible to residents across the community. We’re just a short drive from popular landmarks like Secret Lake Park, making us a central and convenient option for those seeking psychiatric care in Casselberry. Our welcoming environment and patient-focused approach ensure that every individual feels supported and heard from the moment they walk through our doors. If you’re ready to take the next step toward better mental health, the team at Empathy Health Clinic is here to guide you. Casselberry residents can trust us for compassionate care that prioritizes your well-being. Contact us today to schedule an appointment and start your journey toward a healthier, happier life. We look forward to being part of your mental health journey. Beyond medication management, our psychiatrists provide psychoeducation to help you understand your condition and treatment options. We believe in shared decision-making and work collaboratively with you to develop a treatment plan that aligns with your values and lifestyle.",
        servicesOffered: JSON.stringify([
          "Complete Psychiatric Evaluations",
          "Medication Management Services",
          "Depression & Mood Disorder Treatment",
          "Anxiety Treatment",
          "ADHD Diagnosis & Management",
          "Bipolar Disorder Treatment",
          "PTSD Care",
          "Telehealth Psychiatry"
        ]),
        whyChooseUs: "Our Casselberry psychiatrists are committed to providing personalized, effective mental health care. We listen carefully, take time to understand your needs, and develop treatment plans that fit your life. With flexible telehealth options and evening appointments available, we make it easy to prioritize your mental health.",
        faqs: JSON.stringify([
          { question: "Do you accept new patients in Casselberry?", answer: "Yes! We're currently accepting new patients in Casselberry. Call 386-848-8751 to schedule your psychiatric evaluation. We typically have same-week availability." },
          { question: "What conditions do Casselberry psychiatrists treat?", answer: "We treat a wide range of mental health conditions including depression, anxiety, ADHD, bipolar disorder, PTSD, OCD, panic disorder, and more. Our psychiatrists have expertise in both common and complex psychiatric conditions." },
          { question: "Can I get psychiatric care via telehealth in Casselberry?", answer: "Yes! We offer secure video appointments that allow you to meet with our psychiatrists from home. Telehealth is convenient, private, and clinically effective for psychiatric care." },
          { question: "What insurance do you accept in Casselberry?", answer: "We accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, Humana, Medicare, and UnitedHealthcare. Self-pay options are also available." }
        ]),
        order: 10,
      },
      {
        title: "Psychiatrist in Lake Mary, FL",
        slug: "psychiatrist-lake-mary",
        city: "Lake Mary",
        serviceType: "psychiatry",
        pageTitle: "Psychiatrist in Lake Mary, FL | Mental Health Treatment | Empathy Health",
        metaDescription: "Experienced psychiatrist in Lake Mary, FL. Comprehensive psychiatric care for depression, anxiety, ADHD, bipolar disorder. Telehealth appointments available. Insurance accepted.",
        heroTitle: "Psychiatrist in Lake Mary, FL",
        heroDescription: "Professional psychiatric care serving Lake Mary. Our psychiatrists offer expert mental health evaluations, medication management, and personalized treatment for depression, anxiety, ADHD, and more.",
        description: "Empathy Health Clinic is proud to serve the Lake Mary community with expert psychiatric care tailored to meet your unique mental health needs. Conveniently located in the heart of Lake Mary, our clinic is dedicated to helping individuals and families navigate challenges such as anxiety, depression, ADHD, bipolar disorder, and more. With our patient-centered approach and a team of compassionate professionals, we aim to provide a safe space where healing and growth begin. Our psychiatric services are designed to address a wide range of mental health conditions, ensuring residents of Lake Mary receive the specialized care they deserve. From comprehensive mental health evaluations to medication management, we work closely with you to develop personalized treatment plans that fit your life. Whether you're seeking support for mood disorders, navigating the complexities of trauma, or managing the symptoms of OCD, Empathy Health Clinic is here to guide you every step of the way. Our skilled psychiatrists are committed to helping you achieve balance and regain control of your mental well-being. Situated near popular Lake Mary landmarks such as the Lake Mary City Hall and Seminole State College, our clinic is easily accessible from surrounding neighborhoods like Heathrow, Timacuan, and Magnolia Plantation. We understand the importance of convenience, which is why we’ve made it simple for residents of Lake Mary and nearby areas to connect with the care they need—right in their own community. At Empathy Health Clinic, we believe mental health care should be compassionate and empowering. We take the time to listen to your concerns, answer your questions, and collaborate with you on your journey toward wellness. If you or a loved one are ready to take the next step in prioritizing your mental health, contact us today to schedule an appointment. Empathy Health Clinic is here to support Lake Mary residents in achieving healthier, happier lives.",
        servicesOffered: JSON.stringify([
          "Psychiatric Evaluations",
          "Medication Management & Adjustment",
          "Depression Treatment",
          "Anxiety & Panic Disorder Care",
          "ADHD Testing & Treatment",
          "Bipolar Disorder Management",
          "OCD & PTSD Treatment",
          "Virtual Psychiatry Appointments"
        ]),
        whyChooseUs: "Our Lake Mary psychiatrists provide personalized care focused on your unique needs and goals. We offer same-week appointments, flexible telehealth options, and accept most insurance plans to make quality psychiatric care accessible. Our team is dedicated to helping you achieve lasting mental wellness.",
        faqs: JSON.stringify([
          { question: "How do I schedule with a psychiatrist in Lake Mary?", answer: "Simply call 386-848-8751 to schedule your appointment. We typically have same-week availability for new patients and offer both in-person and telehealth options." },
          { question: "What happens during a psychiatric evaluation?", answer: "Your psychiatrist will discuss your symptoms, medical history, current medications, and treatment goals. The evaluation typically lasts 60-90 minutes and helps us understand your needs and develop an effective treatment plan." },
          { question: "Will I need to take medication?", answer: "Not necessarily. Your psychiatrist will discuss all treatment options with you. For some conditions, medication is the most effective treatment. For others, therapy or a combination approach works best. Treatment decisions are always made collaboratively." },
          { question: "Do Lake Mary psychiatrists offer telehealth?", answer: "Yes! We provide secure video appointments for your convenience. Telehealth works well for psychiatric evaluations, medication management, and follow-up visits. Many Lake Mary patients prefer the flexibility of virtual appointments." }
        ]),
        order: 11,
      },
    ];

    defaultLocations.forEach((location) => {
      const id = randomUUID();
      this.locations.set(id, { id, ...location });
    });

    // Initialize default blog posts from JSON file into PostgreSQL
    this.initializeBlogPosts();
  }

  private async initializeBlogPosts() {
    try {
      // Check if blog posts already exist in database
      const existingPosts = await db.select().from(blogPosts).limit(1);
      
      if (existingPosts.length === 0) {
        // Database is empty, seed from JSON file
        console.log('📝 Seeding blog posts from JSON file into PostgreSQL...');
        const defaultBlogPosts: InsertBlogPost[] = blogPostsData;
        
        if (defaultBlogPosts.length > 0) {
          await db.insert(blogPosts).values(defaultBlogPosts);
          console.log(`✅ Successfully seeded ${defaultBlogPosts.length} blog posts into database`);
        }
      } else {
        console.log('✅ Blog posts already exist in database, skipping seed');
      }
    } catch (error) {
      console.error('❌ Error initializing blog posts:', error);
    }
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

  async getTeamMemberBySlug(slug: string): Promise<TeamMember | undefined> {
    return Array.from(this.teamMembers.values()).find((m) => m.slug === slug);
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

  // Location methods
  async getAllLocations(): Promise<Location[]> {
    return Array.from(this.locations.values()).sort((a, b) => a.order - b.order);
  }

  async getLocation(id: string): Promise<Location | undefined> {
    return this.locations.get(id);
  }

  async getLocationBySlug(slug: string): Promise<Location | undefined> {
    return Array.from(this.locations.values()).find(l => l.slug === slug);
  }

  async createLocation(location: InsertLocation): Promise<Location> {
    const id = randomUUID();
    const newLocation: Location = { id, ...location };
    this.locations.set(id, newLocation);
    return newLocation;
  }

  async updateLocation(
    id: string,
    location: Partial<InsertLocation>
  ): Promise<Location> {
    const existing = this.locations.get(id);
    if (!existing) throw new Error("Location not found");
    const updated = { ...existing, ...location };
    this.locations.set(id, updated);
    return updated;
  }

  async deleteLocation(id: string): Promise<void> {
    this.locations.delete(id);
  }

  // Lead methods
  async createLead(lead: InsertLead): Promise<Lead> {
    const [newLead] = await db.insert(leads).values(lead).returning();
    return newLead;
  }

  async getAllLeads(): Promise<Lead[]> {
    return await db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  // Blog post methods - NOW USING POSTGRESQL FOR PERSISTENCE
  async getAllBlogPosts(): Promise<BlogPost[]> {
    const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.order));
    return posts;
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    // Update blog slug cache
    addBlogSlugToCache(newPost.slug);
    return newPost;
  }

  async updateBlogPost(
    id: string,
    post: Partial<InsertBlogPost>
  ): Promise<BlogPost> {
    // Get old slug if the slug is being updated
    let oldSlug: string | undefined;
    if (post.slug) {
      const [existing] = await db.select({ slug: blogPosts.slug }).from(blogPosts).where(eq(blogPosts.id, id));
      oldSlug = existing?.slug;
    }
    
    const [updated] = await db
      .update(blogPosts)
      .set(post)
      .where(eq(blogPosts.id, id))
      .returning();
    
    if (!updated) throw new Error("Blog post not found");
    
    // Update blog slug cache if slug changed
    if (oldSlug && post.slug && oldSlug !== post.slug) {
      updateBlogSlugInCache(oldSlug, post.slug);
    }
    
    return updated;
  }

  async deleteBlogPost(id: string): Promise<void> {
    // Get the slug before deleting
    const [existing] = await db.select({ slug: blogPosts.slug }).from(blogPosts).where(eq(blogPosts.id, id));
    
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
    
    // Remove from blog slug cache
    if (existing?.slug) {
      removeBlogSlugFromCache(existing.slug);
    }
  }

  // Newsletter subscriber methods
  async createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    // Check if email already exists
    const existing = Array.from(this.newsletterSubscribers.values()).find(
      s => s.email.toLowerCase() === subscriber.email.toLowerCase()
    );
    
    if (existing) {
      // If already exists and is active, return it
      if (existing.status === 'active') {
        return existing;
      }
      // If unsubscribed, reactivate
      existing.status = 'active';
      this.newsletterSubscribers.set(existing.id, existing);
      return existing;
    }
    
    // Create new subscriber
    const id = randomUUID();
    const now = new Date().toISOString();
    const newSubscriber: NewsletterSubscriber = { 
      id, 
      email: subscriber.email,
      subscribedAt: now,
      status: subscriber.status || 'active'
    };
    this.newsletterSubscribers.set(id, newSubscriber);
    return newSubscriber;
  }

  async getAllNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return Array.from(this.newsletterSubscribers.values()).sort(
      (a, b) => new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime()
    );
  }

  async getActiveNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return Array.from(this.newsletterSubscribers.values())
      .filter(s => s.status === 'active')
      .sort((a, b) => new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime());
  }

  // Analytics methods
  async trackPageView(data: InsertPageView): Promise<PageView> {
    const [newPageView] = await db.insert(pageViews).values(data).returning();
    return newPageView;
  }

  async getPageViews(startDate?: string, endDate?: string): Promise<PageView[]> {
    const conditions = [];
    
    if (startDate) {
      conditions.push(gte(pageViews.timestamp, startDate));
    }
    if (endDate) {
      conditions.push(lte(pageViews.timestamp, endDate));
    }
    
    if (conditions.length > 0) {
      return await db.select().from(pageViews).where(and(...conditions)).orderBy(desc(pageViews.timestamp));
    }
    
    return await db.select().from(pageViews).orderBy(desc(pageViews.timestamp));
  }

  async getPageViewsByPath(startDate?: string, endDate?: string): Promise<{path: string, count: number}[]> {
    const conditions = [];
    
    if (startDate) {
      conditions.push(gte(pageViews.timestamp, startDate));
    }
    if (endDate) {
      conditions.push(lte(pageViews.timestamp, endDate));
    }

    const result = await db.select({
      path: pageViews.path,
      count: sql<number>`count(*)::int`
    })
    .from(pageViews)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .groupBy(pageViews.path)
    .orderBy(desc(sql`count(*)`));
    
    return result;
  }

  async trackEvent(data: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    const [newEvent] = await db.insert(analyticsEvents).values(data).returning();
    return newEvent;
  }

  async getEvents(
    eventType?: string, 
    startDate?: string, 
    endDate?: string
  ): Promise<AnalyticsEvent[]> {
    const conditions = [];
    
    if (eventType) {
      conditions.push(eq(analyticsEvents.eventType, eventType));
    }
    if (startDate) {
      conditions.push(gte(analyticsEvents.timestamp, startDate));
    }
    if (endDate) {
      conditions.push(lte(analyticsEvents.timestamp, endDate));
    }
    
    if (conditions.length > 0) {
      return await db.select().from(analyticsEvents).where(and(...conditions)).orderBy(desc(analyticsEvents.timestamp));
    }
    
    return await db.select().from(analyticsEvents).orderBy(desc(analyticsEvents.timestamp));
  }

  async getEventCounts(startDate?: string, endDate?: string): Promise<{eventType: string, count: number}[]> {
    const conditions = [];
    
    if (startDate) {
      conditions.push(gte(analyticsEvents.timestamp, startDate));
    }
    if (endDate) {
      conditions.push(lte(analyticsEvents.timestamp, endDate));
    }

    const result = await db.select({
      eventType: analyticsEvents.eventType,
      count: sql<number>`count(*)::int`
    })
    .from(analyticsEvents)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .groupBy(analyticsEvents.eventType)
    .orderBy(desc(sql`count(*)`));
    
    return result;
  }

  async getFormConversionMetrics(startDate?: string, endDate?: string): Promise<{
    shortFormStarts: number;
    shortFormSubmissions: number;
    longFormStarts: number;
    longFormSubmissions: number;
    shortFormDropOffRate: number;
    longFormDropOffRate: number;
    totalDropOffRate: number;
  }> {
    // Build date filter conditions
    const eventConditions = [];
    const leadConditions = [];
    
    if (startDate) {
      eventConditions.push(gte(analyticsEvents.timestamp, startDate));
      leadConditions.push(gte(leads.createdAt, startDate));
    }
    if (endDate) {
      eventConditions.push(lte(analyticsEvents.timestamp, endDate));
      leadConditions.push(lte(leads.createdAt, endDate));
    }
    
    // Count form starts by type (from analytics events)
    const shortFormStartsQuery = db.select({ count: sql<number>`count(*)::int` })
      .from(analyticsEvents);
    
    const shortFormStartsWhere = eventConditions.length > 0
      ? and(
          eq(analyticsEvents.eventType, 'form_started'),
          eq(analyticsEvents.value, 'short'),
          and(...eventConditions)
        )
      : and(
          eq(analyticsEvents.eventType, 'form_started'),
          eq(analyticsEvents.value, 'short')
        );
    
    const shortFormStartsResult = await shortFormStartsQuery.where(shortFormStartsWhere);
    
    const longFormStartsQuery = db.select({ count: sql<number>`count(*)::int` })
      .from(analyticsEvents);
    
    const longFormStartsWhere = eventConditions.length > 0
      ? and(
          eq(analyticsEvents.eventType, 'form_started'),
          eq(analyticsEvents.value, 'long'),
          and(...eventConditions)
        )
      : and(
          eq(analyticsEvents.eventType, 'form_started'),
          eq(analyticsEvents.value, 'long')
        );
    
    const longFormStartsResult = await longFormStartsQuery.where(longFormStartsWhere);
    
    // Count form submissions by type (from leads table)
    // Note: "hero" and "short" both count as short form submissions
    const shortFormQuery = db.select({ count: sql<number>`count(*)::int` })
      .from(leads);
    
    const shortFormWhere = leadConditions.length > 0
      ? and(
          or(eq(leads.formType, 'short'), eq(leads.formType, 'hero')),
          and(...leadConditions)
        )
      : or(eq(leads.formType, 'short'), eq(leads.formType, 'hero'));
    
    const shortFormSubmissionsResult = await shortFormQuery.where(shortFormWhere);
    
    const longFormQuery = db.select({ count: sql<number>`count(*)::int` })
      .from(leads);
    
    const longFormWhere = leadConditions.length > 0
      ? and(
          eq(leads.formType, 'long'),
          and(...leadConditions)
        )
      : eq(leads.formType, 'long');
    
    const longFormSubmissionsResult = await longFormQuery.where(longFormWhere);
    
    const shortFormStarts = shortFormStartsResult[0]?.count || 0;
    const longFormStarts = longFormStartsResult[0]?.count || 0;
    const shortFormSubmissions = shortFormSubmissionsResult[0]?.count || 0;
    const longFormSubmissions = longFormSubmissionsResult[0]?.count || 0;
    
    // Calculate drop-off rates
    const shortFormDropOffRate = shortFormStarts > 0
      ? ((shortFormStarts - shortFormSubmissions) / shortFormStarts) * 100
      : 0;
    
    const longFormDropOffRate = longFormStarts > 0
      ? ((longFormStarts - longFormSubmissions) / longFormStarts) * 100
      : 0;
    
    const totalStarts = shortFormStarts + longFormStarts;
    const totalSubmissions = shortFormSubmissions + longFormSubmissions;
    const totalDropOffRate = totalStarts > 0
      ? ((totalStarts - totalSubmissions) / totalStarts) * 100
      : 0;
    
    return {
      shortFormStarts,
      shortFormSubmissions,
      longFormStarts,
      longFormSubmissions,
      shortFormDropOffRate,
      longFormDropOffRate,
      totalDropOffRate,
    };
  }

  async trackWebVital(data: InsertWebVital): Promise<WebVital> {
    const [newWebVital] = await db.insert(webVitals).values(data).returning();
    return newWebVital;
  }

  async getWebVitals(metricName?: string): Promise<WebVital[]> {
    if (metricName) {
      return await db.select().from(webVitals).where(eq(webVitals.metricName, metricName)).orderBy(desc(webVitals.timestamp));
    }
    
    return await db.select().from(webVitals).orderBy(desc(webVitals.timestamp));
  }

  async getAverageWebVitals(startDate?: string, endDate?: string): Promise<{metricName: string, avgValue: number, rating: string}[]> {
    const conditions = [];
    
    if (startDate) {
      conditions.push(gte(webVitals.timestamp, startDate));
    }
    if (endDate) {
      conditions.push(lte(webVitals.timestamp, endDate));
    }

    const result = await db.select({
      metricName: webVitals.metricName,
      avgValue: sql<number>`AVG(CAST(${webVitals.value} AS NUMERIC))`,
      rating: sql<string>`MODE() WITHIN GROUP (ORDER BY ${webVitals.rating})`
    })
    .from(webVitals)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .groupBy(webVitals.metricName);
    
    // Ensure avgValue is a number, not a string
    return result.map(r => ({
      ...r,
      avgValue: typeof r.avgValue === 'string' ? parseFloat(r.avgValue) : r.avgValue
    }));
  }

  // UTM Analytics methods
  async getLeadsByUTMSource(): Promise<{utmSource: string | null, count: number}[]> {
    const result = await db.select({
      utmSource: leads.utmSource,
      count: sql<number>`COUNT(*)::int`
    })
    .from(leads)
    .groupBy(leads.utmSource)
    .orderBy(sql`COUNT(*) DESC`);
    
    return result.map(r => ({
      ...r,
      count: typeof r.count === 'string' ? parseInt(r.count) : r.count
    }));
  }

  async getLeadsByUTMCampaign(): Promise<{utmCampaign: string | null, count: number}[]> {
    const result = await db.select({
      utmCampaign: leads.utmCampaign,
      count: sql<number>`COUNT(*)::int`
    })
    .from(leads)
    .groupBy(leads.utmCampaign)
    .orderBy(sql`COUNT(*) DESC`);
    
    return result.map(r => ({
      ...r,
      count: typeof r.count === 'string' ? parseInt(r.count) : r.count
    }));
  }

  async getLeadsByUTMTerm(): Promise<{utmTerm: string | null, count: number}[]> {
    const result = await db.select({
      utmTerm: leads.utmTerm,
      count: sql<number>`COUNT(*)::int`
    })
    .from(leads)
    .groupBy(leads.utmTerm)
    .orderBy(sql`COUNT(*) DESC`);
    
    return result.map(r => ({
      ...r,
      count: typeof r.count === 'string' ? parseInt(r.count) : r.count
    }));
  }

  async getLeadsByLandingPage(): Promise<{landingPage: string | null, count: number}[]> {
    const result = await db.select({
      landingPage: leads.landingPage,
      count: sql<number>`COUNT(*)::int`
    })
    .from(leads)
    .groupBy(leads.landingPage)
    .orderBy(sql`COUNT(*) DESC`);
    
    return result.map(r => ({
      ...r,
      count: typeof r.count === 'string' ? parseInt(r.count) : r.count
    }));
  }

  async getPageViewsByUTMSource(): Promise<{utmSource: string | null, count: number}[]> {
    const result = await db.select({
      utmSource: pageViews.utmSource,
      count: sql<number>`COUNT(*)::int`
    })
    .from(pageViews)
    .groupBy(pageViews.utmSource)
    .orderBy(sql`COUNT(*) DESC`);
    
    return result.map(r => ({
      ...r,
      count: typeof r.count === 'string' ? parseInt(r.count) : r.count
    }));
  }

  async getPageViewsByUTMCampaign(): Promise<{utmCampaign: string | null, count: number}[]> {
    const result = await db.select({
      utmCampaign: pageViews.utmCampaign,
      count: sql<number>`COUNT(*)::int`
    })
    .from(pageViews)
    .groupBy(pageViews.utmCampaign)
    .orderBy(sql`COUNT(*) DESC`);
    
    return result.map(r => ({
      ...r,
      count: typeof r.count === 'string' ? parseInt(r.count) : r.count
    }));
  }

  async getPageBounceRates(): Promise<{path: string, views: number, bounces: number, bounceRate: number}[]> {
    // Get all page views grouped by path
    const viewsByPath = await db.select({
      path: pageViews.path,
      views: sql<number>`COUNT(*)::int`
    })
    .from(pageViews)
    .groupBy(pageViews.path)
    .orderBy(sql`COUNT(*) DESC`);

    // Calculate estimated bounce rate
    // A "bounce" is when there's only 1 page view from a session
    // Since we don't have session IDs yet, we'll estimate using referrer data
    // Pages with no internal referrer are likely entry points
    const bounceEstimates = await db.select({
      path: pageViews.path,
      bounces: sql<number>`COUNT(CASE WHEN ${pageViews.referrer} IS NULL OR ${pageViews.referrer} NOT LIKE '%empathyhealthclinic%' THEN 1 END)::int`
    })
    .from(pageViews)
    .groupBy(pageViews.path);

    // Combine the data
    const bounceMap = new Map(bounceEstimates.map(b => [b.path, b.bounces || 0]));
    
    const result = viewsByPath.map(v => {
      const views = typeof v.views === 'string' ? parseInt(v.views) : v.views;
      const bounces = bounceMap.get(v.path) || 0;
      const bounceRate = views > 0 ? Math.round((bounces / views) * 100) : 0;
      
      return {
        path: v.path,
        views,
        bounces,
        bounceRate
      };
    });

    // Return pages sorted by bounce rate (highest first), showing only pages with significant traffic
    return result
      .filter(r => r.views >= 5) // Only show pages with at least 5 views
      .sort((a, b) => b.bounceRate - a.bounceRate);
  }

  async logEmailFailure(failure: InsertEmailFailure): Promise<EmailFailure> {
    const [result] = await db.insert(emailFailures).values(failure).returning();
    return result;
  }

  async getEmailFailures(resolved?: boolean): Promise<EmailFailure[]> {
    if (resolved !== undefined) {
      return db.select().from(emailFailures).where(eq(emailFailures.resolved, resolved)).orderBy(desc(emailFailures.createdAt));
    }
    return db.select().from(emailFailures).orderBy(desc(emailFailures.createdAt));
  }

  async retryEmailFailure(id: string): Promise<EmailFailure> {
    const [result] = await db.update(emailFailures)
      .set({ 
        retryCount: sql`${emailFailures.retryCount} + 1`,
        lastRetryAt: new Date().toISOString()
      })
      .where(eq(emailFailures.id, id))
      .returning();
    return result;
  }

  async resolveEmailFailure(id: string): Promise<EmailFailure> {
    const [result] = await db.update(emailFailures)
      .set({ 
        resolved: true,
        resolvedAt: new Date().toISOString()
      })
      .where(eq(emailFailures.id, id))
      .returning();
    return result;
  }
}

export const storage = new MemStorage();

// Blog slug cache for fast redirect lookups
// This cache is loaded at startup and kept in sync with storage operations
const blogSlugCache = new Set<string>();

/**
 * Initialize the blog slug cache by loading all blog post slugs from the database
 * Call this at application startup
 */
export async function initBlogSlugCache(): Promise<void> {
  try {
    const posts = await db.select({ slug: blogPosts.slug }).from(blogPosts);
    blogSlugCache.clear();
    posts.forEach(post => blogSlugCache.add(post.slug));
    console.log(`[Blog Slug Cache] Loaded ${blogSlugCache.size} blog slugs`);
  } catch (error) {
    console.error('[Blog Slug Cache] Failed to initialize:', error);
  }
}

/**
 * Check if a slug exists in the blog post cache
 * Returns true if the slug matches a blog post
 */
export function isBlogPostSlug(slug: string): boolean {
  return blogSlugCache.has(slug);
}

/**
 * Add a blog slug to the cache
 * Called after creating a new blog post
 */
export function addBlogSlugToCache(slug: string): void {
  blogSlugCache.add(slug);
}

/**
 * Update a blog slug in the cache
 * Called when updating a blog post's slug
 */
export function updateBlogSlugInCache(oldSlug: string, newSlug: string): void {
  blogSlugCache.delete(oldSlug);
  blogSlugCache.add(newSlug);
}

/**
 * Remove a blog slug from the cache
 * Called when deleting a blog post
 */
export function removeBlogSlugFromCache(slug: string): void {
  blogSlugCache.delete(slug);
}
