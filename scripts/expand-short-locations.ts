import OpenAI from 'openai';
import * as fs from 'fs/promises';

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
  targetWords: number;
}

const shortLocations: Location[] = [
  { city: "Winter Park", serviceType: "therapy", targetWords: 310 },
  { city: "Orlando", serviceType: "psychiatry", targetWords: 310 },
  { city: "Winter Park", serviceType: "counseling", targetWords: 310 },
  { city: "Altamonte Springs", serviceType: "psychiatry", targetWords: 310 },
  { city: "Casselberry", serviceType: "psychiatry", targetWords: 310 },
  { city: "Orlando", serviceType: "therapy", targetWords: 310 }
];

async function expandLocationDescription(location: Location): Promise<string> {
  const serviceLabel = location.serviceType === 'psychiatry' ? 'psychiatric services' : 
                       location.serviceType === 'therapy' ? 'therapy and counseling services' :
                       'counseling services';
  
  const prompt = `You are writing SEO-optimized location page content for Empathy Health Clinic, a mental health clinic serving ${location.city}, Florida.

Write a ${location.targetWords}-word description for their ${serviceLabel} in ${location.city}, FL that includes:

1. Opening paragraph establishing Empathy Health Clinic's presence and expertise in ${location.city}
2. Description of specific services offered (${location.serviceType})
3. Local relevance - mention proximity to ${location.city} landmarks, neighborhoods, or accessibility
4. Patient-centered, empathetic tone emphasizing compassionate care
5. Clear call-to-action encouraging ${location.city} residents to schedule an appointment

CRITICAL REQUIREMENTS:
- EXACTLY ${location.targetWords} words (±5 words maximum)
- Natural, conversational tone
- Focus on benefits to ${location.city} residents
- Include specific mental health conditions treated
- Professional yet warm language
- DO NOT use emojis
- DO NOT use placeholder text or brackets
- Write in single-paragraph form (no line breaks)

Return ONLY the description text, no title or formatting. COUNT YOUR WORDS CAREFULLY.`;

  const completion = await getOpenAI().chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are an expert medical content writer specializing in SEO-optimized, clinically accurate mental health content. You MUST write exactly the number of words requested."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 700
  });

  return completion.choices[0].message.content?.trim() || '';
}

async function main() {
  console.log(`Regenerating ${shortLocations.length} descriptions to meet 300+ word minimum...\n`);
  
  const results: { city: string; serviceType: string; description: string; words: number }[] = [];
  
  for (const location of shortLocations) {
    console.log(`Processing: ${location.city} - ${location.serviceType}...`);
    const expandedDescription = await expandLocationDescription(location);
    
    // Remove newlines and normalize spaces
    const cleanDescription = expandedDescription.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    const wordCount = cleanDescription.split(/\s+/).length;
    
    results.push({
      city: location.city,
      serviceType: location.serviceType,
      description: cleanDescription,
      words: wordCount
    });
    
    const status = wordCount >= 300 ? '✅' : '⚠️';
    console.log(`  ${status} Expanded to ${wordCount} words\n`);
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Save results
  await fs.writeFile(
    'scripts/short-locations-expanded.json',
    JSON.stringify(results, null, 2)
  );
  
  console.log('\n✅ All short location descriptions regenerated!');
  console.log('Results saved to scripts/short-locations-expanded.json');
  
  // Summary
  console.log('\nWord Count Summary:');
  let allPass = true;
  results.forEach(r => {
    const status = r.words >= 300 ? '✅' : '⚠️';
    allPass = allPass && (r.words >= 300);
    console.log(`${status} ${r.city} (${r.serviceType}): ${r.words} words`);
  });
  
  if (allPass) {
    console.log('\n✅ All descriptions meet 300+ word requirement!');
  } else {
    console.log('\n⚠️ Some descriptions still below 300 words');
  }
}

main().catch(console.error);
