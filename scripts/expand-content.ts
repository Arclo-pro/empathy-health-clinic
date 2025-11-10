import OpenAI from "openai";

// Using Replit's AI Integrations for OpenAI access
let openai: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!openai) {
    if (!process.env.AI_INTEGRATIONS_OPENAI_API_KEY || !process.env.AI_INTEGRATIONS_OPENAI_BASE_URL) {
      throw new Error("Replit AI Integrations not configured");
    }
    openai = new OpenAI({
      baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
    });
  }
  return openai;
}

interface ContentItem {
  title: string;
  currentDescription: string;
  slug: string;
  type: 'treatment' | 'therapy' | 'condition';
}

async function expandDescription(item: ContentItem): Promise<string> {
  const client = getOpenAI();
  
  const prompt = `You are an expert medical content writer for Empathy Health Clinic, a mental health clinic in Winter Park, FL. 

TASK: Expand the following ${item.type} description from its current length (~50 words) to 300-500 words of high-quality, SEO-optimized content.

CURRENT SHORT DESCRIPTION:
"${item.currentDescription}"

REQUIREMENTS:
- Expand to 300-500 words (target: 400 words)
- Maintain clinical accuracy and professional medical tone
- Include SEO keywords: "${item.title}", "Winter Park", "mental health", "treatment"
- Use second person ("you", "your") to engage patients
- Include specific benefits, treatment approaches, and what patients can expect
- Add details about symptoms addressed, who can benefit, and treatment outcomes
- Maintain empathetic, compassionate tone consistent with Empathy Health Clinic's brand
- Do NOT use emojis, bullet points, or headers - write flowing paragraphs
- Do NOT include medical disclaimers or "consult your doctor" language
- Focus on being informative, supportive, and actionable

Write the expanded description as continuous prose (no formatting):`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert mental health content writer creating SEO-optimized, patient-focused content for a psychiatric clinic."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const expandedContent = completion.choices[0]?.message?.content?.trim() || "";
    
    // Validate word count
    const wordCount = expandedContent.split(/\s+/).length;
    console.log(`  ✓ Expanded ${item.slug}: ${wordCount} words`);
    
    if (wordCount < 250) {
      console.warn(`  ⚠️  Warning: ${item.slug} only has ${wordCount} words (target: 300-500)`);
    }
    
    return expandedContent;
  } catch (error) {
    console.error(`  ❌ Error expanding ${item.slug}:`, error);
    throw error;
  }
}

// Define all content items that need expansion
const contentItems: ContentItem[] = [
  // Treatments (9 items - under 100 words each)
  {
    title: "Depression Treatment",
    currentDescription: "Depression affects millions of people, but with the right treatment, recovery is possible. At Empathy Health Clinic, we offer comprehensive depression treatment combining medication management, psychotherapy, and lifestyle interventions. Our compassionate team understands that depression is a medical condition, not a personal weakness, and we're here to support your recovery.",
    slug: "depression-treatment",
    type: "treatment"
  },
  {
    title: "Anxiety Treatment",
    currentDescription: "Anxiety disorders are among the most common mental health conditions, but they're also highly treatable. Empathy Health Clinic offers specialized treatment for generalized anxiety disorder (GAD), panic disorder, social anxiety, and specific phobias. We combine proven therapies like CBT with medication when needed to help you manage anxiety and live fully.",
    slug: "anxiety-treatment",
    type: "treatment"
  },
  {
    title: "Medication Management",
    currentDescription: "Medication can be a crucial component of mental health treatment. Our psychiatric providers specialize in medication management for depression, anxiety, bipolar disorder, ADHD, and other conditions. We carefully select medications based on your specific symptoms, medical history, and treatment goals, then provide ongoing monitoring to ensure effectiveness and minimize side effects.",
    slug: "medication-management",
    type: "treatment"
  },
  {
    title: "Bipolar Disorder Treatment",
    currentDescription: "At Empathy Health Clinic, we understand that living with bipolar disorder can be challenging. Our specialized treatment program combines evidence-based medication management with supportive therapy to help you manage mood swings, reduce symptoms, and maintain stability. We work closely with each patient to develop a personalized treatment plan that addresses your unique needs.",
    slug: "bipolar-disorder-treatment",
    type: "treatment"
  },
  {
    title: "OCD Treatment",
    currentDescription: "Obsessive-Compulsive Disorder (OCD) can be overwhelming, but with proper treatment, you can regain control of your life. At Empathy Health Clinic, we offer specialized OCD treatment combining exposure and response prevention (ERP) therapy with medication management when needed. Our compassionate providers understand the challenges of OCD and are committed to helping you break free from the cycle of obsessions and compulsions.",
    slug: "ocd-treatment",
    type: "treatment"
  },
  {
    title: "PTSD Treatment",
    currentDescription: "Post-Traumatic Stress Disorder (PTSD) can develop after experiencing or witnessing a traumatic event. At Empathy Health Clinic, we provide specialized trauma-focused treatment combining evidence-based therapies like EMDR and CPT with supportive medication management. Our trauma-informed approach helps you process traumatic memories, reduce symptoms, and reclaim your life from the grip of PTSD.",
    slug: "ptsd-treatment",
    type: "treatment"
  },
  // Therapies (prioritize lowest word counts - 15 items total, focusing on the lowest)
  {
    title: "Toxic Relationship Therapy",
    currentDescription: "Toxic relationships can take a serious toll on your mental health and wellbeing. Our therapists help individuals recognize unhealthy relationship patterns, set boundaries, and develop the skills needed to build healthier connections. Whether you're in a toxic relationship or recovering from one, we provide the support and tools you need to protect your emotional health.",
    slug: "toxic-relationship-therapy",
    type: "therapy"
  },
  {
    title: "Bipolar Disorder Therapy",
    currentDescription: "While medication is essential for bipolar disorder, therapy plays a crucial role in long-term stability. Our specialized bipolar therapy helps you recognize triggers, develop coping strategies, maintain medication adherence, and improve relationships. We use evidence-based approaches to help you manage mood episodes and live a balanced, fulfilling life.",
    slug: "bipolar-disorder-therapy",
    type: "therapy"
  },
  {
    title: "Couples Therapy",
    currentDescription: "Every relationship faces challenges. Our couples therapy provides a safe, neutral space where you and your partner can improve communication, resolve conflicts, rebuild trust, and strengthen your connection. Whether you're dealing with specific issues or want to enhance your relationship, our experienced therapists help you create positive change together.",
    slug: "couples-therapy",
    type: "therapy"
  },
  {
    title: "OCD Therapy",
    currentDescription: "Therapy, particularly Exposure and Response Prevention (ERP), is the gold-standard treatment for OCD. Our specialized therapists help you gradually confront anxiety-triggering situations while resisting compulsive behaviors. This evidence-based approach helps you break the OCD cycle and regain control over your thoughts and actions.",
    slug: "ocd-therapy",
    type: "therapy"
  },
  {
    title: "Depression Therapy",
    currentDescription: "Therapy is a powerful tool for overcoming depression. Our therapists use evidence-based approaches like Cognitive Behavioral Therapy (CBT) to help you challenge negative thought patterns, develop healthy coping skills, and address the root causes of depression. Therapy provides lasting benefits that extend beyond symptom relief.",
    slug: "depression-therapy",
    type: "therapy"
  },
  // Conditions (4 items under 100 words)
  {
    title: "Personality Disorders",
    currentDescription: "Personality disorders involve enduring patterns of thinking, feeling, and behaving that differ significantly from cultural expectations and cause distress or impairment. Common types include borderline personality disorder (BPD), narcissistic personality disorder, antisocial personality disorder, and others. At Empathy Health Clinic, we provide compassionate, evidence-based treatment including dialectical behavior therapy (DBT), schema therapy, and medication management to help individuals with personality disorders improve relationships, emotional regulation, and quality of life.",
    slug: "personality-disorders",
    type: "condition"
  },
  {
    title: "Eating Disorders",
    currentDescription: "Eating disorders like anorexia nervosa, bulimia nervosa, and binge eating disorder are serious mental health conditions that affect both physical and psychological wellbeing. These complex disorders involve distorted body image, unhealthy eating behaviors, and intense preoccupation with food, weight, or shape. At Empathy Health Clinic, we provide comprehensive treatment combining nutrition counseling, therapy, and medical monitoring to address the physical and emotional aspects of eating disorders and support full recovery.",
    slug: "eating-disorders",
    type: "condition"
  },
  {
    title: "Schizophrenia & Psychotic Disorders",
    currentDescription: "Schizophrenia and psychotic disorders involve disruptions in thinking, perception, emotions, and behavior. Symptoms may include hallucinations, delusions, disorganized thinking, and reduced motivation. These serious mental illnesses require specialized psychiatric care. At Empathy Health Clinic, our experienced providers offer comprehensive treatment including antipsychotic medication management, supportive therapy, and coordinated care to help individuals with psychotic disorders achieve stability, manage symptoms, and improve functioning.",
    slug: "schizophrenia-psychotic-disorders",
    type: "condition"
  },
  {
    title: "Postpartum Depression & Perinatal Mood Disorders",
    currentDescription: "Postpartum depression and perinatal mood disorders affect many new mothers during pregnancy and after childbirth. Symptoms include severe sadness, anxiety, exhaustion, difficulty bonding with baby, and intrusive thoughts. These are medical conditions, not signs of weakness or poor parenting. At Empathy Health Clinic, we provide specialized perinatal mental health treatment including therapy, medication management safe for pregnancy and breastfeeding, and compassionate support to help new mothers recover and bond with their babies.",
    slug: "postpartum-depression-perinatal-mood-disorders",
    type: "condition"
  },
];

async function main() {
  console.log(`\n🚀 Starting content expansion for ${contentItems.length} items...\n`);
  
  const results: { [key: string]: string } = {};
  
  for (const item of contentItems) {
    console.log(`Expanding: ${item.title} (${item.type})`);
    try {
      const expandedDescription = await expandDescription(item);
      results[item.slug] = expandedDescription;
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Failed to expand ${item.slug}:`, error);
      results[item.slug] = item.currentDescription; // Keep original on failure
    }
  }
  
  console.log(`\n✅ Content expansion complete!`);
  console.log(`\n📝 Expanded descriptions saved. Copy and paste into server/storage.ts:\n`);
  
  // Output results in easy-to-copy format
  for (const [slug, description] of Object.entries(results)) {
    console.log(`\n=== ${slug} ===`);
    console.log(description);
    console.log(`\n`);
  }
}

main().catch(console.error);
