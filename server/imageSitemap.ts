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
      { loc: '/empathy-health-clinic-logo.png', title: 'Empathy Health Clinic Logo - Orlando Psychiatry and Mental Health', geoLocation: GEO_LOCATION },
    ]
  },
  {
    loc: '/about',
    images: [
      { loc: '/empathy-health-clinic-logo.png', title: 'Empathy Health Clinic Logo - Orlando Mental Health Provider', geoLocation: GEO_LOCATION },
    ]
  }
];

const HOMEPAGE_IMAGES: ImageEntry[] = [
  {
    loc: '/',
    images: [
      { loc: '/attached_assets/stock_images/peaceful_green_fores_98e1a8d8.jpg', title: 'Empathy Health Clinic - Mental Health Services Orlando FL', geoLocation: GEO_LOCATION },
    ]
  }
];

const PROVIDER_IMAGES: ImageEntry[] = [
  {
    loc: '/team',
    images: [
      { loc: '/attached_assets/stock_images/professional_healthc_955227e9.jpg', title: 'Mental Health Providers Orlando FL - Empathy Health Clinic Team', geoLocation: GEO_LOCATION },
    ]
  },
  {
    loc: '/team/alex-regan',
    images: [
      { loc: '/attached_assets/stock_images/professional_healthc_0f3a0b64.jpg', title: 'Alex Regan PA-C - Founder Empathy Health Clinic Orlando', geoLocation: GEO_LOCATION },
    ]
  },
  {
    loc: '/team/marjorie-felix',
    images: [
      { loc: '/attached_assets/stock_images/calm_peaceful_therap_89f82c5d.jpg', title: 'Marjorie Felix PMHNP - Psychiatric Nurse Practitioner Orlando', geoLocation: GEO_LOCATION },
    ]
  },
  {
    loc: '/team/christine-orr',
    images: [
      { loc: '/attached_assets/stock_images/calm_peaceful_therap_ae20056a.jpg', title: 'Christine Orr LCSW - Licensed Therapist Winter Park FL', geoLocation: 'Winter Park, Florida, USA' },
    ]
  }
];

const SERVICE_PAGE_IMAGES: ImageEntry[] = [
  {
    loc: '/psychiatrist-orlando',
    images: [
      { loc: '/attached_assets/stock_images/depression_anxiety_m_12ef3176.jpg', title: 'Psychiatrist Orlando FL - Expert Mental Health Care', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/therapist-orlando',
    images: [
      { loc: '/attached_assets/stock_images/calm_peaceful_therap_b118766b.jpg', title: 'Licensed Therapist Orlando FL - Counseling Services', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/services',
    images: [
      { loc: '/attached_assets/stock_images/depression_anxiety_m_263ac057.jpg', title: 'Mental Health Services Orlando FL - Psychiatry and Therapy', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/anxiety-therapy',
    images: [
      { loc: '/attached_assets/stock_images/anxiety_depression_w_182b3f55.jpg', title: 'Anxiety Treatment Orlando FL - Expert Care', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/depression-treatment',
    images: [
      { loc: '/attached_assets/stock_images/depression_anxiety_s_044376ce.jpg', title: 'Depression Treatment Orlando FL - Compassionate Care', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/adhd-testing-orlando',
    images: [
      { loc: '/attached_assets/stock_images/anxiety_depression_w_609c7e20.jpg', title: 'ADHD Testing Orlando FL - Comprehensive Evaluation', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/tms-treatment',
    images: [
      { loc: '/attached_assets/stock_images/depression_anxiety_m_36a0e057.jpg', title: 'TMS Treatment Orlando FL - FDA Approved Depression Therapy', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/emdr-therapy',
    images: [
      { loc: '/attached_assets/stock_images/calm_peaceful_therap_c2e99a65.jpg', title: 'EMDR Therapy Orlando FL - Trauma Treatment', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/services',
    images: [
      { loc: '/attached_assets/stock_images/depression_anxiety_m_4f8ec540.jpg', title: 'Medication Management Orlando FL - Psychiatric Care', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/virtual-therapy',
    images: [
      { loc: '/attached_assets/stock_images/depression_anxiety_m_9ea51f2f.jpg', title: 'Virtual Therapy Florida - Telehealth Mental Health Services', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/child-psychiatrist-orlando',
    images: [
      { loc: '/attached_assets/stock_images/anxiety_depression_w_a4e7146d.jpg', title: 'Child Psychiatrist Orlando FL - Pediatric Mental Health', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/adhd-psychiatrist-orlando',
    images: [
      { loc: '/attached_assets/stock_images/anxiety_depression_w_a9b6f405.jpg', title: 'ADHD Psychiatrist Orlando FL - Adult ADHD Treatment', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/anxiety-therapy',
    images: [
      { loc: '/attached_assets/stock_images/anxiety_depression_w_b382fbe7.jpg', title: 'Anxiety Therapy Orlando FL - Counseling Services', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/depression-counseling',
    images: [
      { loc: '/attached_assets/stock_images/depression_anxiety_s_0f6a6996.jpg', title: 'Depression Counseling Orlando FL - Supportive Care', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/cognitive-behavioral-therapy',
    images: [
      { loc: '/attached_assets/stock_images/calm_peaceful_therap_3749281a.jpg', title: 'CBT Therapy Orlando FL - Cognitive Behavioral Therapy', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/psychiatrist-near-me',
    images: [
      { loc: '/attached_assets/stock_images/depression_anxiety_s_2088ecc0.jpg', title: 'Psychiatrist Near Me Orlando FL - Local Mental Health Care', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/psychotherapist-orlando',
    images: [
      { loc: '/attached_assets/stock_images/depression_anxiety_s_326301ee.jpg', title: 'Psychotherapist Orlando FL - Professional Counseling', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/couples-counseling',
    images: [
      { loc: '/attached_assets/stock_images/depression_anxiety_s_42c27c00.jpg', title: 'Couples Counseling Orlando FL - Relationship Therapy', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/counselor-near-me',
    images: [
      { loc: '/attached_assets/stock_images/depression_anxiety_s_6f337a21.jpg', title: 'Counselor Near Me Orlando FL - Local Mental Health', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/mental-health-near-me',
    images: [
      { loc: '/attached_assets/stock_images/depression_anxiety_s_9c3c72d6.jpg', title: 'Mental Health Near Me Orlando FL - Local Care', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/therapy-near-me',
    images: [
      { loc: '/attached_assets/stock_images/depression_anxiety_s_b7cb96ff.jpg', title: 'Therapy Near Me Orlando FL - Local Counseling', geoLocation: GEO_LOCATION }
    ]
  }
];

const LOCATION_IMAGES: ImageEntry[] = [
  {
    loc: '/psychiatrist-winter-park',
    images: [
      { loc: '/attached_assets/stock_images/calm_forest_trees_me_0c56a0e8.jpg', title: 'Psychiatrist Winter Park FL - Mental Health Services', geoLocation: 'Winter Park, Florida, USA' }
    ]
  },
  {
    loc: '/locations/winter-park',
    images: [
      { loc: '/attached_assets/stock_images/calm_forest_trees_me_36147574.jpg', title: 'Mental Health Clinic Winter Park FL', geoLocation: 'Winter Park, Florida, USA' }
    ]
  },
  {
    loc: '/locations/orlando',
    images: [
      { loc: '/attached_assets/stock_images/calm_forest_trees_me_62fae749.jpg', title: 'Mental Health Clinic Orlando FL', geoLocation: GEO_LOCATION }
    ]
  },
  {
    loc: '/locations/altamonte-springs',
    images: [
      { loc: '/attached_assets/stock_images/calm_forest_trees_me_b28b1751.jpg', title: 'Psychiatrist Altamonte Springs FL - Mental Health Services', geoLocation: 'Altamonte Springs, Florida, USA' }
    ]
  },
  {
    loc: '/locations/kissimmee',
    images: [
      { loc: '/attached_assets/stock_images/calm_forest_trees_me_c92dd644.jpg', title: 'Psychiatrist Kissimmee FL - Mental Health Services', geoLocation: 'Kissimmee, Florida, USA' }
    ]
  },
  {
    loc: '/locations/apopka',
    images: [
      { loc: '/attached_assets/stock_images/anxiety_depression_w_c541cd23.jpg', title: 'Psychiatrist Apopka FL - Mental Health Services', geoLocation: 'Apopka, Florida, USA' }
    ]
  },
  {
    loc: '/services',
    images: [
      { loc: '/attached_assets/stock_images/anxiety_depression_w_e1574448.jpg', title: 'Psychiatrist Lake Mary FL - Mental Health Services', geoLocation: 'Lake Mary, Florida, USA' }
    ]
  },
  {
    loc: '/locations/sanford',
    images: [
      { loc: '/attached_assets/stock_images/anxiety_depression_w_f1c2a0b4.jpg', title: 'Psychiatrist Sanford FL - Mental Health Services', geoLocation: 'Sanford, Florida, USA' }
    ]
  },
  {
    loc: '/locations/maitland',
    images: [
      { loc: '/attached_assets/stock_images/anxiety_depression_w_f6543290.jpg', title: 'Psychiatrist Maitland FL - Mental Health Services', geoLocation: 'Maitland, Florida, USA' }
    ]
  },
  {
    loc: '/locations/casselberry',
    images: [
      { loc: '/attached_assets/stock_images/anxiety_depression_w_23f72e6e.jpg', title: 'Psychiatrist Casselberry FL - Mental Health Services', geoLocation: 'Casselberry, Florida, USA' }
    ]
  }
];

const INSURANCE_IMAGES: ImageEntry[] = [
  {
    loc: '/insurance',
    images: [
      { loc: '/attached_assets/stock_images/blue_cross_blue_shie_824de69a.jpg', title: 'Insurance Accepted - Empathy Health Clinic Orlando', geoLocation: GEO_LOCATION },
    ]
  },
  {
    loc: '/insurance/aetna',
    images: [
      { loc: '/attached_assets/stock_images/aetna_insurance_logo_11478061.jpg', title: 'Aetna Insurance Psychiatrist Orlando FL', geoLocation: GEO_LOCATION },
    ]
  },
  {
    loc: '/insurance/blue-cross-blue-shield',
    images: [
      { loc: '/attached_assets/stock_images/blue_cross_blue_shie_c8ce8283.jpg', title: 'Blue Cross Blue Shield Psychiatrist Orlando FL', geoLocation: GEO_LOCATION },
    ]
  },
  {
    loc: '/cigna-orlando',
    images: [
      { loc: '/attached_assets/stock_images/cigna_insurance_logo_eff54096.jpg', title: 'Cigna Psychiatrist Orlando FL', geoLocation: GEO_LOCATION },
    ]
  },
  {
    loc: '/insurance/united-healthcare',
    images: [
      { loc: '/attached_assets/united-healthcare_1761610722363.webp', title: 'UnitedHealthcare Psychiatrist Orlando FL', geoLocation: GEO_LOCATION },
    ]
  },
  {
    loc: '/insurance/cigna',
    images: [
      { loc: '/attached_assets/stock_images/depression_anxiety_s_bd66d948.jpg', title: 'Cigna Mental Health Coverage Orlando FL', geoLocation: GEO_LOCATION },
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
