import * as fs from 'fs/promises';

async function main() {
  // Read the expanded locations
  const expandedData = await fs.readFile('scripts/expanded-locations.json', 'utf-8');
  const expandedLocations = JSON.parse(expandedData);
  
  // Fix descriptions by replacing newlines with spaces
  const fixedLocations = expandedLocations.map((loc: any) => ({
    ...loc,
    description: loc.description.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
  }));
  
  // Save fixed version
  await fs.writeFile(
    'scripts/expanded-locations-fixed.json',
    JSON.stringify(fixedLocations, null, 2)
  );
  
  console.log('✅ Fixed descriptions saved to expanded-locations-fixed.json');
}

main().catch(console.error);
