import { MapPin, Car, Clock, Building2 } from "lucide-react";
import { Link } from "wouter";

interface CityInfo {
  name: string;
  neighborhoods?: string[];
  landmarks?: string[];
  highways?: string[];
  driveTime?: string;
  description?: string;
  slug?: string;
}

const CITY_DATA: Record<string, CityInfo> = {
  orlando: {
    name: "Orlando",
    neighborhoods: ["Downtown Orlando", "College Park", "Thornton Park", "Mills 50", "SODO", "Audubon Park"],
    landmarks: ["Orlando Regional Medical Center", "Orlando Health", "AdventHealth Orlando"],
    highways: ["I-4", "SR 408 (East-West Expressway)", "SR 50"],
    driveTime: "10-15 minutes",
    description: "Central Florida's largest metropolitan area and healthcare hub",
    slug: "/psychiatrist-orlando"
  },
  "winter-park": {
    name: "Winter Park",
    neighborhoods: ["Park Avenue", "Hannibal Square", "Baldwin Park", "Winter Park Village", "Cady Way"],
    landmarks: ["AdventHealth Winter Park", "Rollins College", "Park Avenue shops"],
    highways: ["I-4", "SR 436", "Fairbanks Avenue"],
    driveTime: "5-10 minutes",
    description: "Charming city known for its tree-lined streets and cultural attractions",
    slug: "/psychiatrist-winter-park"
  },
  "altamonte-springs": {
    name: "Altamonte Springs",
    neighborhoods: ["Uptown Altamonte", "Spring Oaks", "Wekiva Springs", "Forest City"],
    landmarks: ["AdventHealth Altamonte", "Altamonte Mall", "Cranes Roost Park"],
    highways: ["I-4", "SR 436", "SR 434"],
    driveTime: "15-20 minutes",
    description: "Growing suburban community with excellent healthcare access",
    slug: "/locations/altamonte-springs"
  },
  "lake-mary": {
    name: "Lake Mary",
    neighborhoods: ["Colonial TownPark", "Timacuan", "Heathrow", "Lake Mary Woods"],
    landmarks: ["Orlando Health South Lake Hospital", "Lake Mary Town Center", "AAA headquarters"],
    highways: ["I-4", "SR 46A", "Lake Mary Boulevard"],
    driveTime: "20-25 minutes",
    description: "Affluent community with growing healthcare infrastructure",
    slug: "/locations/lake-mary"
  },
  sanford: {
    name: "Sanford",
    neighborhoods: ["Historic Downtown Sanford", "Mayfair", "Lake Monroe", "Ravenna Park"],
    landmarks: ["Central Florida Regional Hospital", "Sanford SunRail Station", "Lake Monroe waterfront"],
    highways: ["I-4", "SR 46", "US 17-92"],
    driveTime: "25-30 minutes",
    description: "Historic city with waterfront charm and growing mental health services",
    slug: "/locations/sanford"
  },
  kissimmee: {
    name: "Kissimmee",
    neighborhoods: ["Downtown Kissimmee", "Poinciana", "Celebration", "Hunter's Creek"],
    landmarks: ["Osceola Regional Medical Center", "Old Town", "Celebration Health"],
    highways: ["I-4", "US 192", "SR 535"],
    driveTime: "25-35 minutes",
    description: "Gateway to Central Florida with diverse healthcare options",
    slug: "/locations/kissimmee"
  },
  maitland: {
    name: "Maitland",
    neighborhoods: ["Downtown Maitland", "Dommerich Estates", "Lake Maitland area"],
    landmarks: ["RDV Sportsplex", "Lake Lily Park", "Maitland Art Center"],
    highways: ["I-4", "US 17-92", "Maitland Boulevard"],
    driveTime: "10-15 minutes",
    description: "Small city nestled between Winter Park and Altamonte Springs",
    slug: "/therapist-maitland"
  },
  apopka: {
    name: "Apopka",
    neighborhoods: ["Rock Springs", "Wekiwa Springs", "Kelly Park area", "Downtown Apopka"],
    landmarks: ["AdventHealth Apopka", "Wekiwa Springs State Park", "Northwest Recreation Complex"],
    highways: ["US 441", "SR 436", "SR 429"],
    driveTime: "20-30 minutes",
    description: "Growing northwest Orange County community with expanding services",
    slug: "/locations/apopka"
  },
  casselberry: {
    name: "Casselberry",
    neighborhoods: ["Fern Park", "Lake Howell", "Winter Springs border"],
    landmarks: ["Secret Lake Park", "Casselberry Golf Club"],
    highways: ["US 17-92", "SR 436", "Red Bug Lake Road"],
    driveTime: "15-20 minutes",
    description: "Suburban community in Seminole County with easy access to healthcare",
    slug: "/locations/casselberry"
  }
};

interface LocalizedContentProps {
  city: string;
  variant?: "full" | "compact" | "inline";
  showDriveTime?: boolean;
  showLink?: boolean;
  className?: string;
  neighborhoods?: string[];
  nearbyLandmarks?: string[];
  driveTimeMinutes?: number;
  highways?: string[];
  description?: string;
  slug?: string;
}

export default function LocalizedContent({ 
  city, 
  variant = "full", 
  showDriveTime = true,
  showLink = true,
  className = "",
  neighborhoods: customNeighborhoods,
  nearbyLandmarks: customLandmarks,
  driveTimeMinutes,
  highways: customHighways,
  description: customDescription,
  slug: customSlug
}: LocalizedContentProps) {
  const cityKey = city.toLowerCase().replace(/\s+/g, '-');
  
  const hasCustomContent = customNeighborhoods || customLandmarks || driveTimeMinutes || 
    customHighways || customDescription || customSlug;
  
  const baseInfo = hasCustomContent ? null : CITY_DATA[cityKey];
  
  const info: CityInfo = {
    name: city,
    neighborhoods: customNeighborhoods || baseInfo?.neighborhoods || [],
    landmarks: customLandmarks || baseInfo?.landmarks || [],
    highways: customHighways || baseInfo?.highways || [],
    driveTime: driveTimeMinutes ? `${driveTimeMinutes}-${driveTimeMinutes + 10} minutes` : baseInfo?.driveTime || "",
    description: customDescription || baseInfo?.description || `Mental health services for ${city} residents`,
    slug: customSlug || baseInfo?.slug
  };
  
  if (!info.name) return null;

  if (variant === "inline") {
    return (
      <span className={className}>
        We serve patients in {info.name}, including the neighborhoods of {info.neighborhoods?.slice(0, 3).join(", ")}. 
        {info.landmarks && ` Conveniently located near ${info.landmarks[0]}`}
        {info.highways && `, with easy access from ${info.highways[0]}`}.
      </span>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-4 text-sm text-muted-foreground ${className}`}>
        <span className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          {info.name}
        </span>
        {showDriveTime && info.driveTime && (
          <span className="flex items-center gap-1">
            <Car className="h-4 w-4" />
            {info.driveTime} from our office
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`p-4 bg-card border rounded-lg ${className}`} data-testid={`localized-content-${cityKey}`}>
      <div className="flex items-start gap-3 mb-3">
        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-foreground">
            Serving {info.name} Patients
            {showLink && info.slug && (
              <Link href={info.slug} className="ml-2 text-sm text-primary hover:underline font-normal">
                View Location
              </Link>
            )}
          </h3>
          {info.description && (
            <p className="text-sm text-muted-foreground mt-1">{info.description}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        {info.neighborhoods && info.neighborhoods.length > 0 && (
          <div className="flex items-start gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-foreground">Neighborhoods: </span>
              <span className="text-muted-foreground">{info.neighborhoods.join(", ")}</span>
            </div>
          </div>
        )}
        
        {info.highways && info.highways.length > 0 && (
          <div className="flex items-start gap-2">
            <Car className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-foreground">Access via: </span>
              <span className="text-muted-foreground">{info.highways.join(", ")}</span>
            </div>
          </div>
        )}
        
        {showDriveTime && info.driveTime && (
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-foreground">Drive time: </span>
              <span className="text-muted-foreground">{info.driveTime} from our Winter Park office</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function LocalizedContentMultiple({ 
  cities, 
  className = "" 
}: { 
  cities: string[];
  className?: string;
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-lg font-semibold text-foreground">Areas We Serve</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {cities.map(city => (
          <LocalizedContent key={city} city={city} variant="compact" />
        ))}
      </div>
    </div>
  );
}

export { CITY_DATA };
