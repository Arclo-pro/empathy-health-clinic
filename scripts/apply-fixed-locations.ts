import * as fs from 'fs/promises';

interface ExpandedLocation {
  city: string;
  serviceType: string;
  description: string;
  words: number;
}

// Map service types to slugs and page identifiers
const locationMappings: Record<string, { slug: string; identifier: string }> = {
  "Winter Park-therapy": { slug: "therapy-services-winter-park", identifier: 'title: "Therapy Services in Winter Park, FL"' },
  "Lake Mary-therapy": { slug: "therapy-services-lake-mary", identifier: 'title: "Therapy & Counseling Services in Lake Mary, FL"' },
  "Orlando-psychiatry": { slug: "psychiatry-orlando", identifier: 'title: "Psychiatrist in Orlando, FL"' },
  "Sanford-therapy": { slug: "therapy-services-sanford", identifier: 'title: "Therapy & Counseling Services in Sanford, FL"' },
  "Winter Park-psychiatry": { slug: "psychiatry-winter-park", identifier: 'title: "Psychiatry Services in Winter Park, FL"' },
  "Winter Park-counseling": { slug: "counseling-winter-park", identifier: 'title: "Counseling Services in Winter Park, FL"' },
  "Altamonte Springs-psychiatry": { slug: "psychiatry-altamonte-springs", identifier: 'title: "Psychiatrist in Altamonte Springs, FL"' },
  "Maitland-psychiatry": { slug: "psychiatry-maitland", identifier: 'title: "Psychiatrist in Maitland, FL"' },
  "Casselberry-psychiatry": { slug: "psychiatry-casselberry", identifier: 'title: "Psychiatrist in Casselberry, FL"' },
  "Lake Mary-psychiatry": { slug: "psychiatry-lake-mary", identifier: 'title: "Psychiatrist in Lake Mary, FL"' },
  "Orlando-therapy": { slug: "therapy-services-orlando", identifier: 'title: "Therapy & Counseling Services in Orlando, FL"' }
};

async function main() {
  // Read fixed locations
  const expandedData = await fs.readFile('scripts/expanded-locations-fixed.json', 'utf-8');
  const expandedLocations: ExpandedLocation[] = JSON.parse(expandedData);
  
  // Read storage.ts
  let storageContent = await fs.readFile('server/storage.ts', 'utf-8');
  
  console.log('Applying fixed descriptions to storage.ts...\n');
  
  for (const location of expandedLocations) {
    const key = `${location.city}-${location.serviceType}`;
    const mapping = locationMappings[key];
    
    if (!mapping) {
      console.log(`⚠️  No mapping found for ${key}`);
      continue;
    }
    
    // Create regex to find description field for this page
    // Match the title and then find the description field
    const pagePattern = new RegExp(
      `(${mapping.identifier.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?description:\\s*)"([^"]*?)"`,
      'm'
    );
    
    const match = storageContent.match(pagePattern);
    
    if (!match) {
      console.log(`⚠️  Could not find page: ${mapping.identifier}`);
      continue;
    }
    
    const prefix = match[1];
    const oldDescription = match[2];
    const newDescription = location.description;
    
    // Replace with properly escaped description
    storageContent = storageContent.replace(
      `${prefix}"${oldDescription}"`,
      `${prefix}"${newDescription}"`
    );
    
    console.log(`✅ ${location.city} (${location.serviceType}): ${location.words} words`);
  }
  
  // Write updated storage.ts
  await fs.writeFile('server/storage.ts', storageContent);
  
  console.log('\n✅ All fixed location descriptions applied to storage.ts!');
}

main().catch(console.error);
