import OpenAI from 'openai';

let openai: OpenAI;

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

interface Location {
  city: string;
  serviceType: string;
  currentDescription: string;
}

const locationsToExpand: Location[] = [
  {
    city: "Winter Park",
    serviceType: "therapy",
    currentDescription: "Therapy Services in Winter Park, FL - short description"
  },
  {
    city: "Lake Mary",
    serviceType: "therapy",
    currentDescription: "Therapy & Counseling Services in Lake Mary, FL - short description"
  },
  {
    city: "Orlando",
    serviceType: "psychiatry",
    currentDescription: "Psychiatrist in Orlando, FL - short description"
  },
  {
    city: "Sanford",
    serviceType: "therapy",
    currentDescription: "Therapy & Counseling Services in Sanford, FL - short description"
  },
  {
    city: "Winter Park",
    serviceType: "psychiatry",
    currentDescription: "Psychiatry Services in Winter Park, FL - short description"
  },
  {
    city: "Winter Park",
    serviceType: "counseling",
    currentDescription: "Counseling Services in Winter Park, FL - short description"
  },
  {
    city: "Altamonte Springs",
    serviceType: "psychiatry",
    currentDescription: "Psychiatrist in Altamonte Springs, FL - short description"
  },
  {
    city: "Maitland",
    serviceType: "psychiatry",
    currentDescription: "Psychiatrist in Maitland, FL - short description"
  },
  {
    city: "Casselberry",
    serviceType: "psychiatry",
    currentDescription: "Psychiatrist in Casselberry, FL - short description"
  },
  {
    city: "Lake Mary",
    serviceType: "psychiatry",
    currentDescription: "Psychiatrist in Lake Mary, FL - short description"
  },
  {
    city: "Orlando",
    serviceType: "therapy",
    currentDescription: "Therapy & Counseling Services in Orlando, FL - short description"
  }
];

async function expandLocationDescription(location: Location): Promise<string> {
  const serviceLabel = location.serviceType === 'psychiatry' ? 'psychiatric services' : 
                       location.serviceType === 'therapy' ? 'therapy and counseling services' :
                       'counseling services';
  
  const prompt = `You are writing SEO-optimized location page content for Empathy Health Clinic, a mental health clinic serving ${location.city}, Florida.

Write a 300-350 word description for their ${serviceLabel} in ${location.city}, FL that includes:

1. Opening paragraph establishing Empathy Health Clinic's presence and expertise in ${location.city}
2. Description of specific services offered (${location.serviceType})
3. Local relevance - mention proximity to ${location.city} landmarks, neighborhoods, or accessibility
4. Patient-centered, empathetic tone emphasizing compassionate care
5. Clear call-to-action encouraging ${location.city} residents to schedule an appointment

Requirements:
- 300-350 words total
- Natural, conversational tone
- Focus on benefits to ${location.city} residents
- Include specific mental health conditions treated
- Professional yet warm language
- DO NOT use emojis
- DO NOT use placeholder text or brackets
- Write in paragraph form, not bullet points

Return ONLY the description text, no title or formatting.`;

  const completion = await getOpenAI().chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are an expert medical content writer specializing in SEO-optimized, clinically accurate mental health content."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 600
  });

  return completion.choices[0].message.content?.trim() || '';
}

async function main() {
  console.log(`Expanding ${locationsToExpand.length} location descriptions...\n`);
  
  const results: { city: string; serviceType: string; description: string; words: number }[] = [];
  
  for (const location of locationsToExpand) {
    console.log(`Processing: ${location.city} - ${location.serviceType}...`);
    const expandedDescription = await expandLocationDescription(location);
    const wordCount = expandedDescription.split(/\s+/).length;
    
    results.push({
      city: location.city,
      serviceType: location.serviceType,
      description: expandedDescription,
      words: wordCount
    });
    
    console.log(`  ✅ Expanded to ${wordCount} words\n`);
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Save results to JSON file
  const fs = await import('fs/promises');
  await fs.writeFile(
    'scripts/expanded-locations.json',
    JSON.stringify(results, null, 2)
  );
  
  console.log('\n✅ All location descriptions expanded!');
  console.log('Results saved to scripts/expanded-locations.json');
  
  // Summary
  console.log('\nWord Count Summary:');
  results.forEach(r => {
    const status = r.words >= 300 ? '✅' : '⚠️';
    console.log(`${status} ${r.city} (${r.serviceType}): ${r.words} words`);
  });
}

main().catch(console.error);
