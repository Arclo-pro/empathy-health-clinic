import {
  type User,
  type InsertUser,
  type SiteContent,
  type InsertSiteContent,
  type Service,
  type InsertService,
  type TeamMember,
  type InsertTeamMember,
  type Testimonial,
  type InsertTestimonial,
  type InsuranceProvider,
  type InsertInsuranceProvider,
  type Condition,
  type InsertCondition,
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

  // Service methods
  getAllServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: string, service: Partial<InsertService>): Promise<Service>;
  deleteService(id: string): Promise<void>;

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

  // Condition methods
  getAllConditions(): Promise<Condition[]>;
  getCondition(id: string): Promise<Condition | undefined>;
  createCondition(condition: InsertCondition): Promise<Condition>;
  updateCondition(id: string, condition: Partial<InsertCondition>): Promise<Condition>;
  deleteCondition(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private siteContent: SiteContent | undefined;
  private services: Map<string, Service>;
  private teamMembers: Map<string, TeamMember>;
  private testimonials: Map<string, Testimonial>;
  private insuranceProviders: Map<string, InsuranceProvider>;
  private conditions: Map<string, Condition>;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.teamMembers = new Map();
    this.testimonials = new Map();
    this.insuranceProviders = new Map();
    this.conditions = new Map();
    this.initializeDefaultContent();
  }

  private initializeDefaultContent() {
    // Initialize default site content
    this.siteContent = {
      id: randomUUID(),
      heroTitle: "Healing Begins with Empathy",
      heroSubtitle: "Psychiatry, Psychotherapy & Counseling Clinic in Winter Park, Orlando, Florida",
      heroImage: "/attached_assets/generated_images/Therapist_right_side_forest_35157883.png",
      reviewCount: 65,
      reviewRating: "EXCELLENT",
      footerPhone: "386-848-8751",
      footerEmail: "info@empathyhealthclinic.com",
      footerAddress: "Winter Park, Orlando, Florida",
      aboutText: "At Empathy Health Clinic, our mission is to serve the community of Orlando, FL, with a range of affordable mental health services. Whether you need to speak with a professional or seek more comprehensive treatment, we can guide you toward the best solution for your needs and well-being.",
    };

    // Initialize default services
    const defaultServices: InsertService[] = [
      {
        title: "Bipolar Disorder Treatment",
        description: "Personalized plans to stabilize mood and manage bipolar disorder effectively.",
        icon: "Brain",
        link: "#bipolar",
        order: 1,
      },
      {
        title: "PTSD Treatment",
        description: "Expert care to help overcome trauma and regain control of your life.",
        icon: "Heart",
        link: "#ptsd",
        order: 2,
      },
      {
        title: "Anger Management Treatment",
        description: "Guided techniques to manage anger and improve emotional regulation.",
        icon: "Users",
        link: "#anger",
        order: 3,
      },
    ];

    defaultServices.forEach((service) => {
      const id = randomUUID();
      this.services.set(id, { id, ...service });
    });

    // Initialize default team members
    const defaultTeamMembers: InsertTeamMember[] = [
      {
        name: "Alex Regan",
        credentials: "Psychiatric PA-C",
        image: "/assets/generated_images/Team_member_headshot_1_2f59af5e.png",
        order: 1,
      },
      {
        name: "Dr. Robert Glenn",
        credentials: "MD",
        image: "/assets/generated_images/Team_member_headshot_2_6581239e.png",
        order: 2,
      },
      {
        name: "Marjorie Felix",
        credentials: "MSN, APRN, PMHNP-BC",
        image: "/assets/generated_images/Team_member_headshot_3_9a01950e.png",
        order: 3,
      },
      {
        name: "Christine Orr",
        credentials: "LCSW",
        image: "/assets/generated_images/Team_member_headshot_4_0db076a8.png",
        order: 4,
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
        logo: "/attached_assets/insurance/bcbs-logo.png",
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
        logo: "/attached_assets/insurance/aetna-logo.png",
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
        logo: "/attached_assets/insurance/optum-logo.png",
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
        logo: "/attached_assets/insurance/cigna-logo.png",
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
        logo: "/attached_assets/insurance/adventhealth-logo.png",
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
        logo: "/attached_assets/insurance/umr-logo.png",
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
        logo: "/attached_assets/insurance/uhc-logo.png",
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
        name: "More Providers", 
        logo: "/attached_assets/insurance/more-logo.png",
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
        order: 8 
      },
    ];

    defaultInsurance.forEach((provider) => {
      const id = randomUUID();
      this.insuranceProviders.set(id, { id, ...provider });
    });

    // Initialize default conditions
    const defaultConditions: InsertCondition[] = [
      {
        description: "Anxiety disorders, such as generalized anxiety disorder (GAD), social anxiety disorder (SAD) or phobias",
        order: 1,
      },
      {
        description: "Depression and depressive disorders",
        order: 2,
      },
      {
        description: "Personality disorders, such as antisocial personality disorder (ASPD) or borderline personality disorder (BPD)",
        order: 3,
      },
      {
        description: "Conditions on the schizophrenia spectrum, such as schizoaffective disorders",
        order: 4,
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

  // Service methods
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values()).sort((a, b) => a.order - b.order);
  }

  async getService(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(service: InsertService): Promise<Service> {
    const id = randomUUID();
    const newService: Service = { id, ...service };
    this.services.set(id, newService);
    return newService;
  }

  async updateService(
    id: string,
    service: Partial<InsertService>
  ): Promise<Service> {
    const existing = this.services.get(id);
    if (!existing) throw new Error("Service not found");
    const updated = { ...existing, ...service };
    this.services.set(id, updated);
    return updated;
  }

  async deleteService(id: string): Promise<void> {
    this.services.delete(id);
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

  // Condition methods
  async getAllConditions(): Promise<Condition[]> {
    return Array.from(this.conditions.values()).sort((a, b) => a.order - b.order);
  }

  async getCondition(id: string): Promise<Condition | undefined> {
    return this.conditions.get(id);
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
}

export const storage = new MemStorage();
