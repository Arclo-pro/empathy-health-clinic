export interface TeamMember {
  id: string;
  name: string;
  credentials: string;
  image: string;
  doxyUrl: string;
  slug: string;
  pageTitle: string;
  bio: string;
  specialties: string;
  education: string;
  approach: string;
  order: number;
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
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
    id: "4",
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
    id: "5",
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
    id: "6",
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
    id: "7",
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
    id: "8",
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
    id: "9",
    name: "Batese Mitchell",
    credentials: "LMHC",
    image: "/site-assets/providers/Headshot (1)_1764630281211.webp",
    doxyUrl: "https://doxy.me/empathy1",
    slug: "batese-mitchell",
    pageTitle: "Batese Mitchell, LMHC | Licensed Mental Health Counselor | Winter Park, FL",
    bio: "Batese Mitchell is a Licensed Mental Health Counselor who is dedicated to providing compassionate, evidence-based care that supports healing and personal growth. Batese is committed to creating a warm, nonjudgmental space where clients feel empowered and safe to explore their experiences.",
    specialties: "Individual Therapy, Anxiety, Depression and Mood Disorders, Emotional Regulation, Psychosocial Stressors",
    education: "Master's Degree in Mental Health Counseling, Licensed Mental Health Counselor (LMHC)",
    approach: "Batese uses a person-centered, strength-based approach grounded in evidence-based practices such as Cognitive Behavioral Therapy and Mindfulness techniques. Batese focuses on helping clients build insight, develop healthy coping skills, and create meaningful change at a pace that feels comfortable and empowering for them. Batese creates a collaborative, warm and supportive space aimed at helping clients feel heard, understood and equipped to navigate life's challenges.",
    order: 10,
  },
].sort((a, b) => a.order - b.order);

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find(member => member.slug === slug);
}
