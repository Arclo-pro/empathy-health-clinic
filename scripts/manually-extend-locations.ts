import * as fs from 'fs/promises';

// Read the fixed locations and add manual extensions to short ones
async function main() {
  const data = await fs.readFile('scripts/expanded-locations-fixed.json', 'utf-8');
  const locations = JSON.parse(data);
  
  // Define extensions for pages below 300 words
  const extensions: Record<string, string> = {
    "Winter Park-therapy": " We understand that seeking therapy is a courageous step, and we're committed to making your experience comfortable and confidential. Our team stays current with the latest research and therapeutic techniques to provide you with the most effective, evidence-based care available.",
    "Orlando-psychiatry": " Our psychiatrists collaborate with primary care physicians and other healthcare providers to ensure comprehensive, coordinated care. We offer flexible appointment times including evenings and weekends to accommodate busy schedules throughout the greater Orlando area.",
    "Winter Park-counseling": " We offer both short-term focused counseling and long-term therapeutic support depending on your goals. Our counselors are trained in culturally sensitive practices and create an inclusive environment where all individuals feel welcomed and respected.",
    "Altamonte Springs-psychiatry": " We accept most major insurance plans and offer transparent pricing for self-pay patients. Our practice is conveniently located with ample parking and easy access from I-4 and the Altamonte Mall area, making it simple for residents throughout Seminole County to receive quality psychiatric care.",
    "Casselberry-psychiatry": " Beyond medication management, our psychiatrists provide psychoeducation to help you understand your condition and treatment options. We believe in shared decision-making and work collaboratively with you to develop a treatment plan that aligns with your values and lifestyle.",
    "Orlando-therapy": " Our therapists accept most major insurance plans and offer sliding scale fees to ensure mental health care remains accessible to all Orlando residents. We provide a safe, confidential space where you can explore your thoughts and feelings without judgment."
  };
  
  const extendedLocations = locations.map((loc: any) => {
    const key = `${loc.city}-${loc.serviceType}`;
    const extension = extensions[key];
    
    if (extension && loc.words < 300) {
      const newDescription = loc.description + extension;
      const newWords = newDescription.split(/\s+/).length;
      console.log(`✅ ${loc.city} (${loc.serviceType}): ${loc.words} → ${newWords} words (+${newWords - loc.words})`);
      return {
        ...loc,
        description: newDescription,
        words: newWords
      };
    }
    
    return loc;
  });
  
  await fs.writeFile(
    'scripts/expanded-locations-final.json',
    JSON.stringify(extendedLocations, null, 2)
  );
  
  console.log('\n✅ Extended locations saved to expanded-locations-final.json');
  
  // Verify all are 300+
  let allPass = true;
  console.log('\nFinal Word Counts:');
  extendedLocations.forEach((loc: any) => {
    const status = loc.words >= 300 ? '✅' : '⚠️';
    allPass = allPass && (loc.words >= 300);
    console.log(`${status} ${loc.city} (${loc.serviceType}): ${loc.words} words`);
  });
  
  console.log(`\n${allPass ? '✅ ALL PAGES MEET 300+ WORD REQUIREMENT!' : '⚠️ Some pages still need work'}`);
}

main().catch(console.error);
