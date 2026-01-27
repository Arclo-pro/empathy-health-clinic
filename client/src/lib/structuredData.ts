const PREFERRED_DOMAIN = "https://www.empathyhealthclinic.com";

const CLINIC_INFO = {
  name: "Empathy Health Clinic",
  telephone: "+1-386-848-8751",
  email: "providers@empathyhealthclinic.com",
  streetAddress: "2281 Lee Rd Suite 102",
  addressLocality: "Winter Park",
  addressRegion: "FL",
  postalCode: "32810",
  addressCountry: "US",
  latitude: 28.59544,
  longitude: -81.36537,
  priceRange: "$$",
  foundingDate: "2023-01-01",
  founderName: "Alex Regan, PA-C",
};

const SOCIAL_PROFILES = [
  "https://www.facebook.com/profile.php?id=100083226165903",
  "https://x.com/clinicempathy12",
  "https://www.instagram.com/empathyhealthfl/?hl=en",
  "https://www.tiktok.com/@empathy.health.cl",
  "https://www.linkedin.com/company/empathy-health-clinic/",
  "https://www.youtube.com/@EmpathyHealthClinic"
];

const ACCEPTED_INSURANCE = [
  "Blue Cross Blue Shield",
  "Aetna",
  "Cigna",
  "United Healthcare",
  "Medicare",
  "Tricare",
  "UMR",
  "Oscar Health"
];

const OPENING_HOURS = {
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  opens: "09:00",
  closes: "17:00"
};

interface ArticleSchemaOptions {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface PhysicianInfo {
  name: string;
  credentials: string;
  image?: string;
  specialties: string[];
  bio?: string;
  slug: string;
  licenseNumber?: string;
  sameAs?: string[];
}

interface InsurancePageOptions {
  insuranceName: string;
  url: string;
}

interface LocalBusinessOptions {
  city: string;
  serviceType: "psychiatry" | "therapy";
  description: string;
  slug: string;
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "MedicalClinic", "LocalBusiness", "MedicalOrganization"],
    "@id": `${PREFERRED_DOMAIN}/#organization`,
    "name": CLINIC_INFO.name,
    "description": "Board-certified psychiatric care in Orlando, FL. Expert treatment for anxiety, depression, ADHD, bipolar disorder, and other mental health conditions. Same-week appointments available.",
    "url": PREFERRED_DOMAIN,
    "logo": {
      "@type": "ImageObject",
      "url": `${PREFERRED_DOMAIN}/logo/empathy-health-clinic.png`,
      "width": 512,
      "height": 512
    },
    "image": `${PREFERRED_DOMAIN}/logo/empathy-health-clinic.png`,
    "telephone": CLINIC_INFO.telephone,
    "email": CLINIC_INFO.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": CLINIC_INFO.streetAddress,
      "addressLocality": CLINIC_INFO.addressLocality,
      "addressRegion": CLINIC_INFO.addressRegion,
      "postalCode": CLINIC_INFO.postalCode,
      "addressCountry": CLINIC_INFO.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": CLINIC_INFO.latitude,
      "longitude": CLINIC_INFO.longitude
    },
    "areaServed": [
      { "@type": "City", "name": "Orlando", "containedInPlace": { "@type": "State", "name": "Florida" }},
      { "@type": "City", "name": "Winter Park", "containedInPlace": { "@type": "State", "name": "Florida" }},
      { "@type": "City", "name": "Lake Mary", "containedInPlace": { "@type": "State", "name": "Florida" }},
      { "@type": "City", "name": "Altamonte Springs", "containedInPlace": { "@type": "State", "name": "Florida" }},
      { "@type": "City", "name": "Maitland", "containedInPlace": { "@type": "State", "name": "Florida" }},
      { "@type": "City", "name": "Casselberry", "containedInPlace": { "@type": "State", "name": "Florida" }},
      { "@type": "City", "name": "Sanford", "containedInPlace": { "@type": "State", "name": "Florida" }},
      { "@type": "City", "name": "Kissimmee", "containedInPlace": { "@type": "State", "name": "Florida" }}
    ],
    "founder": {
      "@type": "Person",
      "name": CLINIC_INFO.founderName
    },
    "foundingDate": CLINIC_INFO.foundingDate,
    "priceRange": CLINIC_INFO.priceRange,
    "currenciesAccepted": "USD",
    "paymentAccepted": "Insurance, Credit Card, Cash",
    "isAcceptingNewPatients": true,
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": OPENING_HOURS.dayOfWeek,
      "opens": OPENING_HOURS.opens,
      "closes": OPENING_HOURS.closes
    }],
    "medicalSpecialty": ["Psychiatric", "MentalHealth"],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "350",
      "bestRating": "5",
      "worstRating": "1"
    },
    "healthPlanNetworkId": ACCEPTED_INSURANCE,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mental Health Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Psychiatric Evaluation" }},
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Medication Management" }},
        { "@type": "Offer", "itemOffered": { "@type": "MedicalTherapy", "name": "Psychotherapy" }},
        { "@type": "Offer", "itemOffered": { "@type": "MedicalTherapy", "name": "Cognitive Behavioral Therapy" }},
        { "@type": "Offer", "itemOffered": { "@type": "MedicalTherapy", "name": "EMDR Therapy" }},
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "TMS Treatment" }}
      ]
    },
    "sameAs": SOCIAL_PROFILES,
    "potentialAction": [
      {
        "@type": "ReserveAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${PREFERRED_DOMAIN}/request-appointment`,
          "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
        },
        "result": { "@type": "Reservation", "name": "Appointment Request" }
      },
      {
        "@type": "CommunicateAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `tel:${CLINIC_INFO.telephone}`,
          "actionPlatform": ["http://schema.org/MobileWebPlatform"]
        }
      }
    ]
  };
}

export function buildArticleSchema(options: ArticleSchemaOptions) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": options.headline.slice(0, 110),
    "description": options.description,
    "url": options.url,
    "datePublished": options.datePublished,
    "author": {
      "@type": "Person",
      "name": options.authorName || "Empathy Health Editorial Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": CLINIC_INFO.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${PREFERRED_DOMAIN}/site-assets/logos/empathy-logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": options.url
    }
  };

  if (options.image) {
    schema.image = {
      "@type": "ImageObject",
      "url": options.image
    };
  }

  if (options.dateModified) {
    schema.dateModified = options.dateModified;
  }

  return schema;
}

export function buildFAQSchema(faqs: FAQItem[]) {
  if (!faqs || faqs.length === 0) return null;

  const validFaqs = faqs.filter(faq => 
    faq.question && faq.question.trim() && 
    faq.answer && faq.answer.trim()
  );

  if (validFaqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": validFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question.trim(),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.trim().replace(/<[^>]*>/g, '')
      }
    }))
  };
}

export function buildPhysicianSchema(physician: PhysicianInfo) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": physician.name,
    "image": physician.image || `${PREFERRED_DOMAIN}/site-assets/stock_images/peaceful_green_fores_98e1a8d8.jpg`,
    "url": `${PREFERRED_DOMAIN}/team/${physician.slug}`,
    "description": physician.bio || `${physician.name} is a mental health provider at Empathy Health Clinic.`,
    "worksFor": {
      "@type": "MedicalClinic",
      "name": CLINIC_INFO.name,
      "url": PREFERRED_DOMAIN,
      "telephone": CLINIC_INFO.telephone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": CLINIC_INFO.streetAddress,
        "addressLocality": CLINIC_INFO.addressLocality,
        "addressRegion": CLINIC_INFO.addressRegion,
        "postalCode": CLINIC_INFO.postalCode,
        "addressCountry": CLINIC_INFO.addressCountry
      }
    },
    "medicalSpecialty": [
      "Psychiatry",
      "Mental Health",
      ...physician.specialties
    ],
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "name": physician.credentials,
      "credentialCategory": "MedicalCredential"
    },
    "identifier": {
      "@type": "PropertyValue",
      "propertyID": "FL License",
      "value": physician.licenseNumber || "Florida Licensed APRN/PMHNP"
    },
    "isAcceptingNewPatients": true,
    "availableService": [
      { "@type": "MedicalProcedure", "name": "Psychiatric Evaluation" },
      { "@type": "MedicalTherapy", "name": "Medication Management" },
      { "@type": "MedicalTherapy", "name": "Psychotherapy" }
    ],
    "sameAs": physician.sameAs || []
  };
}

export function buildLocalBusinessSchema(options: LocalBusinessOptions) {
  const cityGeoCoordinates: Record<string, { latitude: number; longitude: number; postalCode: string }> = {
    "Orlando": { latitude: 28.5383, longitude: -81.3792, postalCode: "32801" },
    "Winter Park": { latitude: 28.5999, longitude: -81.3392, postalCode: "32789" },
    "Altamonte Springs": { latitude: 28.6611, longitude: -81.3656, postalCode: "32701" },
    "Lake Mary": { latitude: 28.7589, longitude: -81.3178, postalCode: "32746" },
    "Sanford": { latitude: 28.8029, longitude: -81.2731, postalCode: "32771" },
    "Maitland": { latitude: 28.6275, longitude: -81.3631, postalCode: "32751" },
    "Casselberry": { latitude: 28.6778, longitude: -81.3278, postalCode: "32707" },
    "Kissimmee": { latitude: 28.2920, longitude: -81.4076, postalCode: "34741" },
    "Apopka": { latitude: 28.6934, longitude: -81.5322, postalCode: "32703" }
  };

  const geoData = cityGeoCoordinates[options.city] || cityGeoCoordinates["Orlando"];

  return {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": `${PREFERRED_DOMAIN}/locations/${options.slug}`,
    "name": `Empathy Health Clinic - ${options.city}`,
    "description": options.description,
    "url": `${PREFERRED_DOMAIN}/locations/${options.slug}`,
    "logo": `${PREFERRED_DOMAIN}/site-assets/logos/empathy-logo.png`,
    "image": `${PREFERRED_DOMAIN}/site-assets/stock_images/peaceful_green_fores_98e1a8d8.jpg`,
    "telephone": CLINIC_INFO.telephone,
    "email": CLINIC_INFO.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": CLINIC_INFO.streetAddress,
      "addressLocality": options.city,
      "addressRegion": "FL",
      "postalCode": geoData.postalCode,
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": geoData.latitude,
      "longitude": geoData.longitude
    },
    "priceRange": CLINIC_INFO.priceRange,
    "currenciesAccepted": "USD",
    "paymentAccepted": "Insurance, Credit Card, Cash",
    "isAcceptingNewPatients": true,
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": OPENING_HOURS.dayOfWeek,
      "opens": OPENING_HOURS.opens,
      "closes": OPENING_HOURS.closes
    }],
    "medicalSpecialty": "Psychiatric",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": options.serviceType === "psychiatry" ? "Psychiatric Services" : "Therapy & Counseling Services",
      "itemListElement": options.serviceType === "psychiatry" ? [
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Psychiatric Evaluation" }},
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Medication Management" }},
        { "@type": "Offer", "itemOffered": { "@type": "MedicalTherapy", "name": "Mental Health Treatment" }}
      ] : [
        { "@type": "Offer", "itemOffered": { "@type": "MedicalTherapy", "name": "Psychotherapy" }},
        { "@type": "Offer", "itemOffered": { "@type": "MedicalTherapy", "name": "Cognitive Behavioral Therapy" }},
        { "@type": "Offer", "itemOffered": { "@type": "MedicalTherapy", "name": "Individual Counseling" }}
      ]
    },
    "sameAs": SOCIAL_PROFILES
  };
}

export function buildInsurancePageSchema(options: InsurancePageOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${PREFERRED_DOMAIN}/#insurance-${options.insuranceName.toLowerCase().replace(/\s+/g, '-')}`,
    "name": CLINIC_INFO.name,
    "description": `${CLINIC_INFO.name} accepts ${options.insuranceName} insurance for psychiatric and mental health services in Orlando, FL.`,
    "url": options.url,
    "telephone": CLINIC_INFO.telephone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": CLINIC_INFO.streetAddress,
      "addressLocality": CLINIC_INFO.addressLocality,
      "addressRegion": CLINIC_INFO.addressRegion,
      "postalCode": CLINIC_INFO.postalCode,
      "addressCountry": CLINIC_INFO.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": CLINIC_INFO.latitude,
      "longitude": CLINIC_INFO.longitude
    },
    "healthPlanNetworkId": [options.insuranceName, ...ACCEPTED_INSURANCE],
    "isAcceptingNewPatients": true,
    "medicalSpecialty": "Psychiatric",
    "priceRange": CLINIC_INFO.priceRange
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function buildWebPageSchema(options: { title: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": options.title,
    "description": options.description,
    "url": options.url,
    "isPartOf": {
      "@type": "WebSite",
      "name": CLINIC_INFO.name,
      "url": PREFERRED_DOMAIN
    },
    "publisher": {
      "@type": "Organization",
      "name": CLINIC_INFO.name,
      "url": PREFERRED_DOMAIN
    }
  };
}

export function buildMedicalWebPageSchema(options: {
  title: string;
  description: string;
  url: string;
  medicalCondition?: string;
  medicalSpecialty?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": options.title,
    "description": options.description,
    "url": options.url,
    "about": options.medicalCondition ? {
      "@type": "MedicalCondition",
      "name": options.medicalCondition
    } : undefined,
    "specialty": options.medicalSpecialty ? {
      "@type": "MedicalSpecialty",
      "name": options.medicalSpecialty
    } : undefined,
    "lastReviewed": new Date().toISOString().split('T')[0],
    "reviewedBy": {
      "@type": "Person",
      "name": CLINIC_INFO.founderName
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": CLINIC_INFO.name,
      "url": PREFERRED_DOMAIN
    }
  };
}

export function buildMedicalProcedureSchema(options: {
  name: string;
  description: string;
  url: string;
  procedureType?: "Therapeutic" | "Diagnostic" | "Surgical" | "Palliative";
  bodyLocation?: string;
  indication?: string;
  outcome?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": options.name,
    "description": options.description,
    "url": options.url,
    "procedureType": options.procedureType ? {
      "@type": "MedicalProcedureType",
      "name": options.procedureType
    } : undefined,
    "bodyLocation": options.bodyLocation ? {
      "@type": "AnatomicalStructure",
      "name": options.bodyLocation
    } : undefined,
    "indication": options.indication ? {
      "@type": "MedicalIndication",
      "name": options.indication
    } : undefined,
    "outcome": options.outcome,
    "howPerformed": "By licensed mental health professionals including psychiatrists, psychologists, and licensed clinical social workers.",
    "status": "http://schema.org/ActiveActionStatus",
    "performer": {
      "@type": "Organization",
      "name": CLINIC_INFO.name,
      "url": PREFERRED_DOMAIN
    }
  };
}

export function buildMedicalTherapySchema(options: {
  name: string;
  description: string;
  url: string;
  therapyType: string;
  indication?: string;
  contraindication?: string;
  sideEffect?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    "name": options.name,
    "description": options.description,
    "url": options.url,
    "therapyType": options.therapyType,
    "indication": options.indication ? {
      "@type": "MedicalIndication",
      "name": options.indication
    } : undefined,
    "contraindication": options.contraindication ? {
      "@type": "MedicalContraindication",
      "name": options.contraindication
    } : undefined,
    "sideEffect": options.sideEffect?.map(effect => ({
      "@type": "MedicalSignOrSymptom",
      "name": effect
    })),
    "relevantSpecialty": {
      "@type": "MedicalSpecialty",
      "name": "Psychiatric"
    },
    "provider": {
      "@type": "Organization",
      "name": CLINIC_INFO.name,
      "url": PREFERRED_DOMAIN,
      "telephone": CLINIC_INFO.telephone
    }
  };
}

export interface ReviewItem {
  authorName: string;
  reviewBody: string;
  ratingValue: number;
  datePublished: string;
  reviewLocation?: string;
}

export function buildReviewSchema(reviews: ReviewItem[]) {
  return reviews.map((review, index) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": `${PREFERRED_DOMAIN}/#review-${index}`,
    "author": {
      "@type": "Person",
      "name": review.authorName
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.ratingValue,
      "bestRating": 5,
      "worstRating": 1
    },
    "reviewBody": review.reviewBody,
    "datePublished": review.datePublished,
    "itemReviewed": {
      "@type": "MedicalBusiness",
      "@id": `${PREFERRED_DOMAIN}/#organization`,
      "name": CLINIC_INFO.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": CLINIC_INFO.streetAddress,
        "addressLocality": review.reviewLocation || CLINIC_INFO.addressLocality,
        "addressRegion": CLINIC_INFO.addressRegion,
        "postalCode": CLINIC_INFO.postalCode
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Google",
      "sameAs": "https://www.google.com"
    }
  }));
}

export function buildAggregateRatingSchema(options: {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "itemReviewed": {
      "@type": "MedicalBusiness",
      "@id": `${PREFERRED_DOMAIN}/#organization`,
      "name": CLINIC_INFO.name
    },
    "ratingValue": options.ratingValue,
    "reviewCount": options.reviewCount,
    "bestRating": options.bestRating || 5,
    "worstRating": options.worstRating || 1
  };
}

export function buildServiceSchema(options: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  areaServed?: string[];
  offers?: {
    priceCurrency?: string;
    price?: string;
    priceRange?: string;
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": options.name,
    "description": options.description,
    "url": options.url,
    "serviceType": options.serviceType,
    "provider": {
      "@type": "MedicalBusiness",
      "@id": `${PREFERRED_DOMAIN}/#organization`,
      "name": CLINIC_INFO.name,
      "url": PREFERRED_DOMAIN,
      "telephone": CLINIC_INFO.telephone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": CLINIC_INFO.streetAddress,
        "addressLocality": CLINIC_INFO.addressLocality,
        "addressRegion": CLINIC_INFO.addressRegion,
        "postalCode": CLINIC_INFO.postalCode,
        "addressCountry": CLINIC_INFO.addressCountry
      }
    },
    "areaServed": (options.areaServed || ["Orlando", "Winter Park", "Central Florida"]).map(city => ({
      "@type": "City",
      "name": city,
      "containedInPlace": { "@type": "State", "name": "Florida" }
    })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": options.name,
      "itemListElement": [{
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": options.name
        },
        "priceCurrency": options.offers?.priceCurrency || "USD",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "USD",
          "price": options.offers?.price || "Contact for pricing"
        }
      }]
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `${PREFERRED_DOMAIN}/request-appointment`,
      "servicePhone": CLINIC_INFO.telephone,
      "availableLanguage": {
        "@type": "Language",
        "name": "English"
      }
    },
    "termsOfService": `${PREFERRED_DOMAIN}/privacy-policy`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "350",
      "bestRating": "5"
    }
  };
}

export function buildHealthcareServiceSchema(options: {
  name: string;
  description: string;
  url: string;
  medicalSpecialty: string;
  healthConditions?: string[];
  isAvailableGenerically?: boolean;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalService",
    "name": options.name,
    "description": options.description,
    "url": options.url,
    "serviceType": "Mental Health Service",
    "relevantSpecialty": {
      "@type": "MedicalSpecialty",
      "name": options.medicalSpecialty
    },
    "availableService": options.healthConditions?.map(condition => ({
      "@type": "MedicalTherapy",
      "name": `${condition} Treatment`,
      "relevantSpecialty": {
        "@type": "MedicalSpecialty",
        "name": "Psychiatry"
      }
    })),
    "provider": {
      "@type": "MedicalBusiness",
      "@id": `${PREFERRED_DOMAIN}/#organization`,
      "name": CLINIC_INFO.name,
      "url": PREFERRED_DOMAIN,
      "telephone": CLINIC_INFO.telephone,
      "medicalSpecialty": ["Psychiatric", "MentalHealth"],
      "isAcceptingNewPatients": true
    },
    "areaServed": [
      { "@type": "City", "name": "Orlando", "containedInPlace": { "@type": "State", "name": "Florida" }},
      { "@type": "City", "name": "Winter Park", "containedInPlace": { "@type": "State", "name": "Florida" }},
      { "@type": "City", "name": "Central Florida" }
    ],
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `${PREFERRED_DOMAIN}/request-appointment`,
      "servicePhone": CLINIC_INFO.telephone,
      "serviceSmsNumber": CLINIC_INFO.telephone
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "USD"
      },
      "acceptedPaymentMethod": ["Insurance", "Credit Card", "Cash"]
    }
  };
}

export { PREFERRED_DOMAIN, CLINIC_INFO, SOCIAL_PROFILES, ACCEPTED_INSURANCE };
