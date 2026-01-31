import type { Express } from 'express';

interface ImageEntry {
  loc: string;
  images: {
    loc: string;
    title?: string;
    caption?: string;
    geoLocation?: string;
  }[];
}

const BASE_URL = 'https://www.empathyhealthclinic.com';
const GEO_LOCATION = 'Orlando, Florida, USA';

const LOGO_IMAGES: ImageEntry[] = [
  {
    loc: '/',
    images: [
      { loc: '/logo/empathy-health-clinic.png', title: 'Empathy Health Clinic Logo - Orlando Psychiatry and Mental Health', geoLocation: GEO_LOCATION },
    ]
  },
  {
    loc: '/about',
    images: [
      { loc: '/logo/empathy-health-clinic.png', title: 'Empathy Health Clinic Logo - Orlando Mental Health Provider', geoLocation: GEO_LOCATION },
    ]
  }
];

const HOMEPAGE_IMAGES: ImageEntry[] = [
  {
    loc: '/',
    images: [
      { loc: '/site-assets/stock_images/peaceful_green_fores_98e1a8d8.webp', title: 'Empathy Health Clinic - Mental Health Services Orlando FL', geoLocation: GEO_LOCATION },
    ]
  }
];

const PROVIDER_IMAGES: ImageEntry[] = [
  {
    loc: '/team',
    images: [
      { loc: '/site-assets/stock_images/professional_healthc_955227e9.webp', title: 'Mental Health Providers Orlando FL - Empathy Health Clinic Team', geoLocation: GEO_LOCATION },
    ]
  },
  {
    loc: '/team/alex-regan',
    images: [
      { loc: '/site-assets/stock_images/professional_healthc_0f3a0b64.webp', title: 'Alex Regan PA-C - Founder Empathy Health Clinic Orlando', geoLocation: GEO_LOCATION },
    ]
  },
  {
    loc: '/team/marjorie-felix',
    images: [
      { loc: '/site-assets/stock_images/calm_peaceful_therap_89f82c5d.webp', title: 'Marjorie Felix PMHNP - Psychiatric Nurse Practitioner Orlando', geoLocation: GEO_LOCATION },
    ]
  },
  {
    loc: '/team/christine-orr',
    images: [
      { loc: '/site-assets/stock_images/calm_peaceful_therap_ae20056a.webp', title: 'Christine Orr LCSW - Licensed Therapist Winter Park FL', geoLocation: 'Winter Park, Florida, USA' },
    ]
  }
];

const SERVICE_PAGE_IMAGES: ImageEntry[] = [
  {
    loc: '/psychiatrist-orlando',
    images: [
      { loc: '/site-assets/stock_images/depression_anxiety_m_12ef3176.webp', title: 'Psychiatrist Orlando FL - Expert Mental Health Care', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/therapist-orlando',
    images: [
      { loc: '/site-assets/stock_images/calm_peaceful_therap_b118766b.webp', title: 'Licensed Therapist Orlando FL - Counseling Services', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/services',
    images: [
      { loc: '/site-assets/stock_images/depression_anxiety_m_263ac057.webp', title: 'Mental Health Services Orlando FL - Psychiatry and Therapy', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/anxiety-therapy',
    images: [
      { loc: '/site-assets/stock_images/anxiety_depression_w_182b3f55.webp', title: 'Anxiety Treatment Orlando FL - Expert Care', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/depression-treatment',
    images: [
      { loc: '/site-assets/stock_images/depression_anxiety_s_044376ce.webp', title: 'Depression Treatment Orlando FL - Compassionate Care', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/adhd-testing-orlando',
    images: [
      { loc: '/site-assets/stock_images/anxiety_depression_w_609c7e20.webp', title: 'ADHD Testing Orlando FL - Comprehensive Evaluation', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/tms-treatment',
    images: [
      { loc: '/site-assets/stock_images/depression_anxiety_m_36a0e057.webp', title: 'TMS Treatment Orlando FL - FDA Approved Depression Therapy', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/emdr-therapy',
    images: [
      { loc: '/site-assets/stock_images/calm_peaceful_therap_c2e99a65.webp', title: 'EMDR Therapy Orlando FL - Trauma Treatment', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/services',
    images: [
      { loc: '/site-assets/stock_images/depression_anxiety_m_4f8ec540.webp', title: 'Medication Management Orlando FL - Psychiatric Care', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/virtual-therapy',
    images: [
      { loc: '/site-assets/stock_images/depression_anxiety_m_9ea51f2f.webp', title: 'Virtual Therapy Florida - Telehealth Mental Health Services', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/child-psychiatrist-orlando',
    images: [
      { loc: '/site-assets/stock_images/anxiety_depression_w_a4e7146d.webp', title: 'Child Psychiatrist Orlando FL - Pediatric Mental Health', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/adhd-psychiatrist-orlando',
    images: [
      { loc: '/site-assets/stock_images/anxiety_depression_w_a9b6f405.webp', title: 'ADHD Psychiatrist Orlando FL - Adult ADHD Treatment', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/anxiety-therapy',
    images: [
      { loc: '/site-assets/stock_images/anxiety_depression_w_b382fbe7.webp', title: 'Anxiety Therapy Orlando FL - Counseling Services', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/depression-counseling',
    images: [
      { loc: '/site-assets/stock_images/depression_anxiety_s_0f6a6996.webp', title: 'Depression Counseling Orlando FL - Supportive Care', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/cognitive-behavioral-therapy',
    images: [
      { loc: '/site-assets/stock_images/calm_peaceful_therap_3749281a.webp', title: 'CBT Therapy Orlando FL - Cognitive Behavioral Therapy', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/psychiatrist-near-me',
    images: [
      { loc: '/site-assets/stock_images/depression_anxiety_s_2088ecc0.webp', title: 'Psychiatrist Near Me Orlando FL - Local Mental Health Care', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/psychotherapist-orlando',
    images: [
      { loc: '/site-assets/stock_images/depression_anxiety_s_326301ee.webp', title: 'Psychotherapist Orlando FL - Professional Counseling', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/couples-counseling',
    images: [
      { loc: '/site-assets/stock_images/depression_anxiety_s_42c27c00.webp', title: 'Couples Counseling Orlando FL - Relationship Therapy', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/counselor-near-me',
    images: [
      { loc: '/site-assets/stock_images/depression_anxiety_s_6f337a21.webp', title: 'Counselor Near Me Orlando FL - Local Mental Health', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/mental-health-near-me',
    images: [
      { loc: '/site-assets/stock_images/depression_anxiety_s_9c3c72d6.webp', title: 'Mental Health Near Me Orlando FL - Local Care', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/therapy-near-me',
    images: [
      { loc: '/site-assets/stock_images/depression_anxiety_s_b7cb96ff.webp', title: 'Therapy Near Me Orlando FL - Local Counseling', geoLocation: GEO_LOCATION }
    ]
  }
];

const LOCATION_IMAGES: ImageEntry[] = [
  {
    loc: '/psychiatrist-winter-park',
    images: [
      { loc: '/site-assets/stock_images/calm_forest_trees_me_0c56a0e8.webp', title: 'Psychiatrist Winter Park FL - Mental Health Services', geoLocation: 'Winter Park, Florida, USA' }
    ]
  },
  {
    loc: '/locations/winter-park',
    images: [
      { loc: '/site-assets/stock_images/calm_forest_trees_me_36147574.webp', title: 'Mental Health Clinic Winter Park FL', geoLocation: 'Winter Park, Florida, USA' }
    ]
  },
  {
    loc: '/locations/orlando',
    images: [
      { loc: '/site-assets/stock_images/calm_forest_trees_me_62fae749.webp', title: 'Mental Health Clinic Orlando FL', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/locations/altamonte-springs',
    images: [
      { loc: '/site-assets/stock_images/calm_forest_trees_me_b28b1751.webp', title: 'Psychiatrist Altamonte Springs FL - Mental Health Services', geoLocation: 'Altamonte Springs, Florida, USA' }
    ]
  },
  {
    loc: '/locations/kissimmee',
    images: [
      { loc: '/site-assets/stock_images/calm_forest_trees_me_c92dd644.webp', title: 'Psychiatrist Kissimmee FL - Mental Health Services', geoLocation: 'Kissimmee, Florida, USA' }
    ]
  },
  {
    loc: '/locations/apopka',
    images: [
      { loc: '/site-assets/stock_images/anxiety_depression_w_c541cd23.webp', title: 'Psychiatrist Apopka FL - Mental Health Services', geoLocation: 'Apopka, Florida, USA' }
    ]
  },
  {
    loc: '/services',
    images: [
      { loc: '/site-assets/stock_images/anxiety_depression_w_e1574448.webp', title: 'Psychiatrist Lake Mary FL - Mental Health Services', geoLocation: 'Lake Mary, Florida, USA' }
    ]
  },
  {
    loc: '/locations/sanford',
    images: [
      { loc: '/site-assets/stock_images/anxiety_depression_w_f1c2a0b4.webp', title: 'Psychiatrist Sanford FL - Mental Health Services', geoLocation: 'Sanford, Florida, USA' }
    ]
  },
  {
    loc: '/locations/maitland',
    images: [
      { loc: '/site-assets/stock_images/anxiety_depression_w_f6543290.webp', title: 'Psychiatrist Maitland FL - Mental Health Services', geoLocation: 'Maitland, Florida, USA' }
    ]
  },
  {
    loc: '/locations/casselberry',
    images: [
      { loc: '/site-assets/stock_images/anxiety_depression_w_23f72e6e.webp', title: 'Psychiatrist Casselberry FL - Mental Health Services', geoLocation: 'Casselberry, Florida, USA' }
    ]
  }
];

const INSURANCE_IMAGES: ImageEntry[] = [
  {
    loc: '/insurance',
    images: [
      { loc: '/site-assets/stock_images/blue_cross_blue_shie_824de69a.webp', title: 'Insurance Accepted - Empathy Health Clinic Orlando', geoLocation: GEO_LOCATION },
    ]
  },
  {
    loc: '/insurance/aetna',
    images: [
      { loc: '/site-assets/stock_images/aetna_insurance_logo_11478061.webp', title: 'Aetna Insurance Psychiatrist Orlando FL', geoLocation: GEO_LOCATION },
    ]
  },
  {
    loc: '/insurance/blue-cross-blue-shield',
    images: [
      { loc: '/site-assets/stock_images/blue_cross_blue_shie_c8ce8283.webp', title: 'Blue Cross Blue Shield Psychiatrist Orlando FL', geoLocation: GEO_LOCATION },
    ]
  },
  {
    loc: '/cigna-orlando',
    images: [
      { loc: '/site-assets/stock_images/cigna_insurance_logo_eff54096.webp', title: 'Cigna Psychiatrist Orlando FL', geoLocation: GEO_LOCATION },
    ]
  },
  {
    loc: '/insurance/united-healthcare',
    images: [
      { loc: '/site-assets/united-healthcare_1761610722363.webp', title: 'UnitedHealthcare Psychiatrist Orlando FL', geoLocation: GEO_LOCATION },
    ]
  },
  {
    loc: '/insurance/cigna',
    images: [
      { loc: '/site-assets/stock_images/depression_anxiety_s_bd66d948.webp', title: 'Cigna Mental Health Coverage Orlando FL', geoLocation: GEO_LOCATION },
    ]
  }
];

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateImageSitemapXML(): string {
  const allEntries: ImageEntry[] = [
    ...LOGO_IMAGES,
    ...HOMEPAGE_IMAGES,
    ...PROVIDER_IMAGES,
    ...SERVICE_PAGE_IMAGES,
    ...LOCATION_IMAGES,
    ...INSURANCE_IMAGES
  ];

  const addedUrls = new Set<string>();
  const addedImages = new Set<string>();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  for (const entry of allEntries) {
    const fullUrl = `${BASE_URL}${entry.loc}`;
    if (addedUrls.has(fullUrl)) continue;
    addedUrls.add(fullUrl);

    xml += `  <url>
    <loc>${escapeXml(fullUrl)}</loc>
`;
    for (const image of entry.images) {
      const imageUrl = `${BASE_URL}${image.loc}`;
      if (addedImages.has(imageUrl)) continue;
      addedImages.add(imageUrl);
      
      xml += `    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
`;
      if (image.title) {
        xml += `      <image:title>${escapeXml(image.title)}</image:title>
`;
      }
      if (image.caption) {
        xml += `      <image:caption>${escapeXml(image.caption)}</image:caption>
`;
      }
      if (image.geoLocation) {
        xml += `      <image:geo_location>${escapeXml(image.geoLocation)}</image:geo_location>
`;
      }
      xml += `    </image:image>
`;
    }
    xml += `  </url>
`;
  }

  xml += `</urlset>`;
  return xml;
}

export function registerImageSitemap(app: Express): void {
  app.get('/image-sitemap.xml', (_req, res) => {
    const xml = generateImageSitemapXML();
    res.set('Content-Type', 'application/xml');
    res.set('Cache-Control', 'public, max-age=86400');
    res.send(xml);
  });
}

export { generateImageSitemapXML };
