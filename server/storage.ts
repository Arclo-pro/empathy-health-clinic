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
      heroImage: "/assets/generated_images/Calming_clinic_waiting_room_1ebe2eda.png",
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
      { name: "Blue Cross Blue Shield", order: 1 },
      { name: "Aetna", order: 2 },
      { name: "Optum", order: 3 },
      { name: "Cigna", order: 4 },
      { name: "AdventHealth", order: 5 },
      { name: "UMR", order: 6 },
      { name: "UnitedHealthcare", order: 7 },
      { name: "More Providers", order: 8 },
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
