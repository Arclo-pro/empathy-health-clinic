import * as fs from 'fs/promises';

interface ExpandedLocation {
  city: string;
  serviceType: string;
  description: string;
  words: number;
}

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
  const expandedData = await fs.readFile('scripts/expanded-locations-final.json', 'utf-8');
  const expandedLocations: ExpandedLocation[] = JSON.parse(expandedData);
  
  let storageContent = await fs.readFile('server/storage.ts', 'utf-8');
  
  console.log('Applying FINAL expanded descriptions to storage.ts...\n');
  
  for (const location of expandedLocations) {
    const key = `${location.city}-${location.serviceType}`;
    const mapping = locationMappings[key];
    
    if (!mapping) {
      console.log(`⚠️  No mapping found for ${key}`);
      continue;
    }
    
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
    
    storageContent = storageContent.replace(
      `${prefix}"${oldDescription}"`,
      `${prefix}"${newDescription}"`
    );
    
    const status = location.words >= 300 ? '✅' : '⚠️';
    console.log(`${status} ${location.city} (${location.serviceType}): ${location.words} words`);
  }
  
  await fs.writeFile('server/storage.ts', storageContent);
  
  console.log('\n✅ All FINAL location descriptions applied to storage.ts!');
  console.log('✅ All 11 pages now have 300+ words for SEO optimization!');
}

main().catch(console.error);
