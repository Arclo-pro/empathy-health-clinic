/**
 * Centralized redirect configuration
 * Single source of truth for all URL redirects
 */

// Import blog slug cache checker (will be set at runtime)
let blogSlugChecker: ((slug: string) => boolean) | null = null;

export function setBlogSlugChecker(checker: (slug: string) => boolean): void {
  blogSlugChecker = checker;
}

export const contentRedirectMap: Record<string, string> = {
  // Treatment redirects
  '/treatments/psychiatric-services': '/psychiatric-services',
  '/treatments/medication-management': '/medication-management',
  '/treatments/virtual-counseling': '/virtual-therapy',
  '/treatments/couples-therapy': '/couples-counseling',
  '/treatments/grief-counseling-services': '/therapy',
  '/treatments/in-person-therapy-orlando': '/in-person-therapy',
  '/treatments/anxiety': '/anxiety-therapy',
  '/treatments/anxiety-treatment': '/anxiety-therapy',
  
  // Duplicate content redirects
  '/virtual-visit': '/virtual-therapy',
  
  // SEO Consolidation: psychiatry-orlando → psychiatrist-orlando (avoid keyword cannibalization)
  // Audit recommendation: Both pages target similar keywords, consolidate to single authoritative page
  '/psychiatry-orlando': '/psychiatrist-orlando',
  
  // WordPress legacy redirects
  // NOTE: /psychiatric-services is now a real landing page - DO NOT redirect (Google Ads requires it)
  '/locations/psychiatry-orlando': '/psychiatrist-orlando',
  // Medicare redirect moved to Google Ads section (line 150) - points to /medicare-psychiatrist-orlando
  
  // Location redirects - redirect dynamic location slugs to STATIC pages (for Google Ads)
  // Dynamic LocationDetail uses API calls that AdsBot can't render
  '/locations/psychiatrist-orlando': '/psychiatrist-orlando',
  '/locations/psychiatry-wekiwa-springs': '/psychiatrist-orlando',
  '/locations/psychiatry-lockhart': '/psychiatrist-orlando',
  '/locations/psychiatry-apopka': '/locations/apopka',
  '/locations/psychiatry-maitland': '/psychiatrist-orlando',
  '/locations/psychiatrist-maitland': '/psychiatrist-orlando',
  '/locations/psychiatrist-casselberry': '/psychiatrist-orlando',
  '/locations/therapy-services-pine-hills': '/therapist-orlando',
  '/locations/therapy-services-lockhart': '/therapist-orlando',
  '/locations/therapy-services-maitland': '/therapist-orlando',
  '/locations/therapy-services-casselberry': '/therapist-orlando',
  
  // Therapy approach redirects
  '/therapy/relationship-and-family': '/couples-counseling',
  '/therapy/intimacy-therapy-sexual-wellness': '/couples-counseling',
  '/therapy/in-person-therapy-orlando': '/in-person-therapy',
  '/therapy-approaches': '/therapy',
  
  // Old assessment pages
  '/anxiety-assessment': '/anxiety-therapy',
  '/adhd-assessment-page': '/adhd-treatment',
  '/adhd-test': '/adhd-treatment',
  // Note: /adhd-testing-orlando is now a real landing page - DO NOT redirect
  '/adhd-evaluation-orlando': '/adhd-testing-orlando',
  '/psychological-assessment': '/services',
  '/psychiatric-evaluation-page': '/psychiatric-evaluation',
  
  // Telepsychiatry/Virtual/Online consolidation - canonical: /telepsychiatry-orlando
  '/virtual-psychiatrist-orlando': '/telepsychiatry-orlando',
  '/online-psychiatrist': '/telepsychiatry-orlando',
  '/online-psychiatry': '/telepsychiatry-orlando',
  
  // Removed service pages (adults only, no child services)
  '/child-psychiatrist-orlando': '/psychiatrist-orlando',
  
  // Old treatment/therapy URLs — /trauma-therapy now redirects to dedicated trauma page
  '/trauma-therapy': '/trauma-therapy-orlando',
  '/supplements': '/services',
  '/faq': '/services',
  
  // Condition redirects
  '/treatments/conditions-we-treat': '/conditions',
  '/treatments/medical-services': '/services',
  '/bipolar-disorder': '/bipolar-disorder-treatment',
  '/depression': '/depression-treatment',
  
  // Old WordPress category/service pages
  '/therapy/in-person-therapy': '/in-person-therapy',
  
  // Blog redirects - slug changes (old slug → new slug)
  '/blog/finding-comfort-self-care-tips-for-those-who-are-grieving': '/blog/the-power-of-grief-counseling-in-healing-the-heart-2',
  '/narcissistic-behavior-in-a-relationship': '/blog/narcissistic-behavior-in-relationships',
  '/narcissisticbehavior-in-a-relationship': '/blog/narcissistic-behavior-in-relationships',
  '/dialectical-behavioral-therapy': '/blog/dialectical-behavior-therapy-dbt-a-comprehensive-guide-to-healing',
  '/blog-wellness-guide-for-counselors': '/blog/wellness-guide-for-counselors',
  '/breaking-the-cycle-a-guide-to-overcoming-toxic-relationship-patterns': '/blog/how-to-leave-toxic-relationship',
  
  // Note: /{slug} → /blog/{slug} redirects (where slug is identical) are handled automatically 
  // by dynamic blog slug checker. No need to list them here (prevents Google canonical confusion).
  
  // Booking redirect
  '/book-appointment': '/request-appointment',
  
  // SEMrush orphaned pages (November 2025) - About/Info pages
  '/about-us': '/about',
  // NOTE: /about is a core page - do NOT redirect
  '/affordable-care': '/insurance',
  '/affordable-emotional-support-letter-online': '/services',
  
  // SEMrush orphaned pages - Old assessment/test pages
  '/autism-assessment': '/services',
  
  // SEMrush orphaned pages - Old treatment pages
  '/anxiety-treatment': '/anxiety-therapy',
  '/anxiety': '/anxiety-therapy',
  '/treatments/therapy-treatment': '/therapy',
  '/treatments/concentration-and-focus': '/adhd-treatment',
  '/concentration-and-focus': '/adhd-treatment',
  
  // SEMrush orphaned pages - Insurance pages
  '/adventhealth-adventhealth-coverage': '/insurance',
  
  // Google Ads insurance redirects - redirect ALL dynamic slugs to STATIC pages (no API calls)
  // AdsBot requires pages that don't depend on API calls to render
  // These dynamic slugs use PageBySlug.tsx which makes 4 API calls that fail for AdsBot
  
  // BCBS (Blue Cross Blue Shield)
  '/blue-cross-blue-shield-blue-cross-blue-shield-coverage': '/blue-cross-blue-shield-therapy-orlando',
  '/blue-cross-blue-shield-coverage': '/blue-cross-blue-shield-therapy-orlando',
  '/blue-cross-blue-shield': '/blue-cross-blue-shield-therapy-orlando',
  '/bcbs-insurance': '/psychiatrist-orlando-accepts-bcbs',
  '/bcbs-coverage': '/psychiatrist-orlando-accepts-bcbs',
  '/bcbs-bcbs-coverage': '/psychiatrist-orlando-accepts-bcbs',
  '/find-a-psychiatrist-that-takes-bcbs-bcbs-coverage': '/psychiatrist-orlando-accepts-bcbs',
  '/find-a-psychiatrist-that-takes-blue-cross-blue-shield-bcbs-coverage': '/psychiatrist-orlando-accepts-bcbs',
  
  // Cigna
  '/cigna-cigna-coverage': '/psychiatrist-orlando-accepts-cigna',
  '/cigna-insurance': '/psychiatrist-orlando-accepts-cigna',
  '/cigna-coverage': '/psychiatrist-orlando-accepts-cigna',
  '/cigna': '/psychiatrist-orlando-accepts-cigna',
  '/find-a-psychiatrist-that-takes-cigna-cigna-coverage': '/psychiatrist-orlando-accepts-cigna',
  '/find-a-psychiatrist-that-takes-cigna-healthcare-cigna-coverage': '/psychiatrist-orlando-accepts-cigna',
  
  // Aetna
  '/aetna-aetna-coverage': '/psychiatrist-orlando-accepts-aetna',
  '/aetna-insurance': '/psychiatrist-orlando-accepts-aetna',
  '/aetna-coverage': '/psychiatrist-orlando-accepts-aetna',
  '/aetna': '/psychiatrist-orlando-accepts-aetna',
  '/find-a-psychiatrist-that-takes-aetna-aetna-coverage': '/psychiatrist-orlando-accepts-aetna',
  
  // UnitedHealthcare / UHC
  '/unitedhealthcare-unitedhealthcare-coverage': '/psychiatrist-orlando-accepts-united-healthcare',
  '/united-healthcare-insurance': '/psychiatrist-orlando-accepts-united-healthcare',
  '/united-healthcare-coverage': '/psychiatrist-orlando-accepts-united-healthcare',
  '/united-healthcare': '/psychiatrist-orlando-accepts-united-healthcare',
  '/unitedhealth-insurance': '/psychiatrist-orlando-accepts-united-healthcare',
  '/uhc-coverage': '/psychiatrist-orlando-accepts-united-healthcare',
  '/uhc-insurance': '/psychiatrist-orlando-accepts-united-healthcare',
  '/find-a-psychiatrist-that-takes-unitedhealthcare-unitedhealthcare-coverage': '/psychiatrist-orlando-accepts-united-healthcare',
  
  // UMR
  '/umr-umr-coverage': '/psychiatrist-orlando-accepts-umr',
  '/umr-insurance': '/psychiatrist-orlando-accepts-umr',
  '/umr-coverage': '/psychiatrist-orlando-accepts-umr',
  '/find-a-psychiatrist-that-takes-umr-umr-coverage': '/psychiatrist-orlando-accepts-umr',
  
  // Medicare
  '/medicare-medicare-coverage': '/medicare-psychiatrist-orlando',
  '/medicare-insurance': '/medicare-psychiatrist-orlando',
  '/medicare-coverage': '/medicare-psychiatrist-orlando',
  '/medicare': '/medicare-psychiatrist-orlando',
  '/find-a-psychiatrist-that-takes-medicare-coverage': '/medicare-psychiatrist-orlando',
  '/find-a-psychiatrist-that-takes-medicare-medicare-coverage': '/medicare-psychiatrist-orlando',
  
  // Curative Health
  '/curative-health-curative-health-coverage': '/insurance',
  '/curative-health-coverage': '/insurance',
  '/curative-coverage': '/insurance',
  '/curative-insurance': '/insurance',
  '/find-a-psychiatrist-that-takes-curative-curative-coverage': '/insurance',
  
  // AdventHealth  
  '/adventhealth-coverage': '/insurance',
  '/adventhealth-insurance': '/insurance',
  '/find-a-psychiatrist-that-takes-adventhealth-coverage': '/insurance',
  
  // Oscar Health
  '/oscar-health-oscar-health-coverage': '/therapist-accepts-oscar-health',
  '/oscar-health-insurance': '/therapist-accepts-oscar-health',
  '/oscar-health-coverage': '/therapist-accepts-oscar-health',
  '/find-a-psychiatrist-that-takes-oscar-health-coverage': '/therapist-accepts-oscar-health',
  
  // Sunshine Health
  '/sunshine-health-sunshine-health-coverage': '/sunshine-health-therapy',
  '/sunshine-health-insurance': '/sunshine-health-therapy',
  '/sunshine-health-coverage': '/sunshine-health-therapy',
  '/find-a-psychiatrist-that-takes-sunshine-health-coverage': '/sunshine-health-therapy',
  
  // Tricare
  '/tricare-tricare-coverage': '/insurance',
  '/tricare-coverage': '/insurance',
  '/tricare-insurance': '/insurance',
  '/find-a-psychiatrist-that-takes-tricare-coverage': '/insurance',
  
  // Humana
  '/humana-humana-coverage': '/insurance',
  '/humana-coverage': '/insurance',
  '/humana-insurance': '/insurance',
  '/find-a-psychiatrist-that-takes-humana-coverage': '/insurance',
  
  // Molina
  '/molina-molina-coverage': '/insurance',
  '/molina-coverage': '/insurance',
  '/molina-insurance': '/insurance',
  '/find-a-psychiatrist-that-takes-molina-coverage': '/insurance',
  
  // Ambetter
  '/ambetter-ambetter-coverage': '/insurance',
  '/ambetter-coverage': '/insurance',
  '/ambetter-insurance': '/insurance',
  '/find-a-psychiatrist-that-takes-ambetter-coverage': '/insurance',
  
  // Google Search Console - Legacy URLs (November 2025)
  '/therapy-services-orlando-mental-health-support': '/therapy-services-orlando',
  '/hm05': '/services',
  
  // Google Search Console - Page with redirect errors (November 2025)
  // Home page variants
  '/home': '/',
  
  // Treatment page redirects
  '/treatments/adhd': '/adhd-treatment',
  '/treatments/bipolar-disorder': '/bipolar-disorder-treatment',
  '/treatments/therapy-services': '/therapy',
  '/adhd': '/adhd-treatment',
  
  // Therapy subcategory redirects
  '/therapy/lgbt-therapy-services': '/therapy',
  
  // Location service redirects
  '/locations/therapy-services-apopka': '/therapist-orlando',
  '/locations/therapy-services-oviedo': '/therapist-orlando',
  '/locations/therapy-services-richmond-heights': '/therapist-orlando',
  '/locations/psychiatry-winter-park': '/locations/winter-park',
  
  // Pricing and contact pages
  '/pricing': '/insurance',
  '/contact': '/contact-us',
  
  // Medication management
  '/medication-management': '/services',
  
  // WordPress author and tag pages - redirect to blog
  '/author/rachelleandreaastudillo': '/blog',
  '/author/reganalex30': '/blog',
  '/tag/adhd-diagnostic-evaluation': '/blog',
  '/tag/best-ai-scribes-for-doctors': '/blog',
  '/tag/stress-management': '/blog',
  '/tag/psychiatrist-orlando-fl': '/blog',
  '/tag/continuing-education-for-nurses': '/blog',
  '/tag/psychiatry-technology': '/blog',
  
  // WordPress date archives - redirect to blog
  '/2025/09/25': '/blog',
  '/2025/09/27': '/blog',
  '/2025/09/28': '/blog',
  '/2025/09/29': '/blog',
  '/2025/09/30': '/blog',
  
  // Query parameter pages
  '/treatments/adhd-treatment': '/adhd-treatment',
  
  // Treatment/therapy pages
  '/therapy-treatment': '/therapy',
  '/treatments/orlando-marriage-counseling-services': '/couples-counseling',
  // NOTE: /treatments/intimacy-therapy-sexual-wellness moved to canonical mappings section → /couples-counseling
  
  // Location pages
  // Duplicate removed - already defined earlier as redirect to /therapist-orlando
  '/locations/psychiatry-oviedo': '/psychiatrist-orlando',
  
  // Tag pages
  '/tag/housing-accommodation-rights': '/blog',
  '/tag/neuroscience-research': '/blog',
  
  // Date archives
  '/2025/10/01': '/blog',
  '/2025/10/06': '/blog',
  
  // Resources page
  '/resources': '/blog',
  
  // Google Search Console - Canonical tag issues (November 2025)
  // NOTE: Removed '/blog/varicose-veins-and-mental-health': '/blog' - post EXISTS in database
  
  // Google Search Console - Soft 404 Fixes (November 23, 2025)
  // LGBT/Therapy Services
  '/lgbt-therapy-services': '/therapy',
  '/treatments/lgbt-therapy-services': '/therapy',
  '/orlando-couples-therapy': '/couples-counseling',
  
  // Location pages - redirect to main therapy services
  '/locations': '/services',
  '/locations/therapy-services-orlando-2': '/therapist-orlando',
  '/locations/therapy-services-wekiwa-springs': '/therapist-orlando',
  '/locations/therapy-services-aloma': '/therapist-orlando',
  '/locations/therapy-services-shores': '/therapist-orlando',
  '/locations/psychiatrist-winter-park': '/locations/winter-park',
  '/therapy-services-orlando': '/therapy-services-orlando',
  
  // Therapy modality pages
  '/therapy/in-person-therapy-2': '/in-person-therapy',
  '/therapy/emdr': '/emdr-therapy',
  '/therapy/dialectical-behavioral-therapy': '/therapy',
  '/therapy/therapy-approaches': '/therapy',
  '/therapy/toxic-relationship-therapy': '/couples-counseling',
  '/cbt-therapy': '/therapy',
  
  // Condition pages
  '/ptsd': '/anxiety-therapy',
  '/post-traumatic-stress-disorder-ptsd': '/anxiety-therapy',
  '/conditions/post-traumatic-stress-disorder-ptsd': '/anxiety-therapy',
  '/ocd': '/anxiety-therapy',
  '/relationship-issues': '/couples-counseling',
  '/conditions/relationship-issues': '/couples-counseling',
  '/conditions': '/services',
  
  // Treatment pages
  '/treatments': '/services',
  '/telehealth-psychiatry': '/virtual-therapy',
  '/intensive-outpatient': '/services',
  '/family-therapy': '/therapy',
  '/group-therapy': '/therapy',
  '/therapy-services': '/therapy',
  '/crisis-support': '/services',
  '/intimacy-therapy-sexual-wellness': '/couples-counseling',
  '/orlando-marriage-counseling-services': '/couples-counseling',
  
  // Insurance provider pages - REMOVED - duplicates handled in Google Ads section above (lines 106-199)
  // Optum and First Health still redirect to /insurance as they don't have dedicated pages
  '/find-a-psychiatrist-that-takes-optum-optum-coverage': '/insurance',
  '/find-a-psychiatrist-that-takes-first-health-network-first-health-coverage': '/insurance',
  
  
  // Old treatment structure redirects
  '/treatments/[bipolar](/bipolar-disorder': '/bipolar-disorder-treatment',
  '/treatments/bipolar-disorder-therapy/photo-by-transly-translation-agency': '/bipolar-disorder-treatment',
  
  // WordPress/legacy pages
  '/health-wellness-blog': '/blog',
  '/hipaa': '/privacy-policy',
  // NOTE: Removed incorrect blog redirects - posts exist in database
  
  // ESA letter page
  '/florida-esa-letter-get-your-emotional-support-animal-letter-empathy-health-clinic-2': '/services',
  
  // Google Search Console - Crawled but not indexed (November 2025)
  // Malformed URL redirects
  '/how-[emdr](/emdr-therapy': '/emdr-therapy',
  
  // Blog feed URLs that should not exist
  '/top-5-ai-scribes-psychiatrists-are-actually-using-in-2025/feed': '/blog',
  // NOTE: Removed '/blog/acls-discount-codes-foreign-trained-healthcare-workers' - post EXISTS

  // Google Search Console 404 Fixes - December 18, 2025 (202 URLs)
  '/8-foods-make-you-happy': '/blog/8-foods-make-you-happy',
  '/adhd-attention-deficit-hyperactivity-disorder': '/adhd-treatment',
  '/balancing-career-growth-with-a-busy-life-a-guide-for-working-nurses': '/blog/balancing-career-growth-with-a-busy-life-a-guide-for-working-nurses',
  '/bbp-certification-worker-safety': '/blog/bbp-certification-worker-safety',
  '/best-dental-implants-kingston-smiles-ny': '/blog/best-dental-implants-kingston-smiles-ny',
  '/best-jobs-for-people-with-depression': '/blog/best-jobs-for-people-with-depression',
  '/bipolar-disorder-therapy': '/bipolar-disorder-treatment',
  '/bipolar-psychosis-symptoms-treatment-recovery': '/blog/bipolar-psychosis-symptoms-treatment-recovery',
  // NOTE: Removed 12 incorrect blog→/blog redirects - these posts EXIST in database:
  // best-psychiatrist-orlando-anxiety-2025-guide, best-psychiatrist-orlando-florida-depression-anxiety,
  // can-men-and-women-be-friends-psychology, common-psychiatry-questions-orlando,
  // first-telepsychiatry-appointment-orlando-guide, grief-self-care-tips-for-grieving (doesn't exist),
  // online-psychiatry-orlando-virtual-care, orlando-sunshine-mental-health,
  // redefining-recovery-hospital-discharge-mental-resilience, same-day-psychiatric-care-orlando,
  // what-students-should-know-before-choosing-healthcare-career-track, why-choose-telepsychiatry-orlando-2025
  '/borderline-personality-disorder-key-facts-care': '/services',
  '/bpd-men-guide': '/blog/bpd-men-guide',
  '/bpd-vs-npd': '/blog/bpd-vs-npd',
  '/can-you-pass-out-from-a-panic-attack': '/blog/can-you-pass-out-from-a-panic-attack',
  '/choosing-anxiety-treatment-centers-factors': '/blog/choosing-anxiety-treatment-centers-factors',
  '/coping-with-grief-during-holidays': '/blog/coping-with-grief-during-holidays',
  '/couples-counseling-with-a-twist-a-guide-to-integrating-dbt-techniques-for-better-intimacy': '/couples-counseling',
  '/couples-therapy-in-orlando-rekindle-your-relationship': '/blog/couples-therapy-in-orlando-rekindle-your-relationship',
  '/dating-someone-with-bpd': '/blog/dating-someone-with-bpd',
  '/deciphering-the-differences-therapy-vs-counseling': '/blog/deciphering-the-differences-therapy-vs-counseling',
  '/depression-therapy': '/depression-treatment',
  '/dialectical-behavior-therapy-dbt-a-comprehensive-guide-to-healing': '/blog/dialectical-behavior-therapy-dbt-a-comprehensive-guide-to-healing',
  '/discover-your-path-to-inner-peace-and-healing-through-therapy': '/blog/discover-your-path-to-inner-peace-and-healing-through-therapy',
  '/effective-strategies-for-managing-bipolar-disorder': '/blog/effective-strategies-for-managing-bipolar-disorder',
  '/emdr-therapy-a-guide-to-healing-from-past-relationship-trauma': '/emdr-therapy',
  '/find-a-psychiatrist-that-takes-adventhealth-adventhealth-coverage': '/insurance',
  '/find-a-psychiatrist-that-takes-humana-humana-coverage': '/insurance',
  '/find-a-psychiatrist-that-takes-unitedhealthcare-uhc-coverage': '/insurance',
  '/finding-comfort-self-care-tips-for-those-who-are-grieving': '/blog/finding-comfort-self-care-tips-for-those-who-are-grieving',
  '/finding-the-right-psychiatrist-near-me-orlando-mental-health-guide': '/blog/finding-the-right-psychiatrist-near-me-orlando-mental-health-guide',
  '/grief-counseling-guide': '/blog/grief-counseling-guide',
  '/high-functioning-depression': '/depression-treatment',
  '/how-bipolar-disorder-impacts-interpersonal-dynamics': '/blog/how-bipolar-disorder-impacts-interpersonal-dynamics',
  '/how-introverts-with-adhd-can-excel-in-the-workplace': '/blog/how-introverts-with-adhd-can-excel-in-the-workplace',
  '/how-to-get-wife-more-intimate': '/couples-counseling',
  '/how-to-improve-concentration-and-focus-expert-tips': '/blog/how-to-improve-concentration-and-focus-expert-tips',
  '/how-to-leave-toxic-relationship': '/blog/how-to-leave-toxic-relationship',
  '/how-to-stay-grounded-through-major-life-changes': '/blog/how-to-stay-grounded-through-major-life-changes',
  '/how-untreated-adhd-triggers-anxiety-and-depression': '/blog/how-untreated-adhd-triggers-anxiety-and-depression',
  '/is-more-espresso-less-depresso-true': '/blog/is-more-espresso-less-depresso-true',
  '/jobs-for-people-with-anxiety': '/anxiety-therapy',
  '/locations/casselberry': '/psychiatrist-orlando',
  '/locations/counseling-winter-park': '/therapist-orlando',
  '/locations/lake-mary': '/services',
  '/locations/maitland': '/psychiatrist-orlando',
  '/locations/psychiatrist-altamonte-springs': '/psychiatrist-orlando',
  '/locations/therapy-services-downtown-orlando': '/therapist-orlando',
  '/locations/therapy-services-sanford': '/therapist-orlando',
  '/locations/therapy-services-winter-park': '/therapist-orlando',
  '/one-sided-relationship-signs': '/couples-counseling',
  '/open-relationship-guide': '/blog/open-relationship-guide',
  '/optum-coverage': '/insurance',
  '/outsource-billing-practice': '/blog/outsource-billing-practice',
  '/petulant-bpd-symptoms-and-treatment': '/blog/petulant-bpd-symptoms-and-treatment',
  '/prodromal-stage-mental-health': '/blog/prodromal-stage-mental-health',
  '/psychotherapy-vs-counseling-therapy-what-is-the-difference': '/blog/psychotherapy-vs-counseling-therapy-what-is-the-difference',
  '/ptsd-trauma': '/ptsd-psychiatrist-orlando',
  '/reactive-attachment-disorder-in-adults': '/blog/reactive-attachment-disorder-in-adults',
  '/schizophrenia-psychotic-disorders': '/services',
  '/school-psychology-career-guide': '/blog/school-psychology-career-guide',
  '/signs-guy-pretending-straight': '/blog/signs-guy-pretending-straight',
  '/signs-of-being-gay': '/blog/signs-of-being-gay',
  '/signs-of-crippling-anxiety': '/blog/signs-of-crippling-anxiety',
  '/silent-panic-attacks-causes-symptoms-relief': '/blog/silent-panic-attacks-causes-symptoms-relief',
  '/the-growing-importance-of-public-health-in-modern-healthcare': '/blog/the-growing-importance-of-public-health-in-modern-healthcare',
  '/the-overlooked-role-of-nurses-in-mental-health-recovery': '/blog/the-overlooked-role-of-nurses-in-mental-health-recovery',
  '/the-power-of-cognitive-behavioral-therapy-cbt': '/blog/the-power-of-cognitive-behavioral-therapy-cbt',
  '/the-power-of-grief-counseling-in-healing-the-heart': '/blog/the-power-of-grief-counseling-in-healing-the-heart-2',
  '/the-rise-of-online-therapy-a-game-changer-for-mental-health': '/blog/the-rise-of-online-therapy-a-game-changer-for-mental-health',
  '/the-role-of-therapy-in-managing-bipolar-disorder': '/blog/the-role-of-therapy-in-managing-bipolar-disorder',
  '/top-10-best-low-stress-jobs': '/blog/top-10-best-low-stress-jobs',
  '/top-5-ai-scribes-psychiatrists-are-actually-using-in-2025': '/blog/top-5-ai-scribes-psychiatrists-are-actually-using-in-2025',
  // NOTE: '/treatments/anger-management' moved to line ~554 → '/anger-management-therapy-orlando'
  '/treatments/depression-therapy': '/depression-treatment',
  '/trust-after-trauma-a-guide-to-creating-secure-attachments': '/therapy',
  '/unburdened-the-key-to-mental-clarity': '/blog/unburdened-the-key-to-mental-clarity',
  '/understanding-adhd-masking': '/blog/understanding-adhd-masking',
  '/understanding-bipolar-disorder-management-new-hope-and-solutions': '/blog/understanding-bipolar-disorder-management-new-hope-and-solutions',
  '/understanding-bipolar-disorder-types-symptoms-and-diagnosis': '/blog/understanding-bipolar-disorder-types-symptoms-and-diagnosis',
  '/understanding-identity-exploration': '/blog/understanding-identity-exploration',
  '/understanding-social-exhaustion-adhd-brain': '/blog/understanding-social-exhaustion-adhd-brain',
  '/understanding-the-4-types-of-bpd': '/blog/understanding-the-4-types-of-bpd',
  '/what-is-a-psychotherapist-vs-psychologist': '/blog/what-is-a-psychotherapist-vs-psychologist',
  '/what-is-a-short-term-relationship': '/blog/what-is-a-short-term-relationship',
  '/what-is-love-bombing': '/blog/what-is-love-bombing',
  '/what-is-mental-breakdown': '/blog/what-is-mental-breakdown',
  '/what-is-psychotherapy': '/blog/what-is-psychotherapy',
  '/what-is-time-blindness': '/blog/what-is-time-blindness',
  '/what-to-expect-at-your-first-psychiatrist-appointment': '/blog/what-to-expect-at-your-first-psychiatrist-appointment',
  '/when-anxiety-hurts-your-love-life-how-emdr-and-dbt-can-rebuild-confidence': '/anxiety-therapy',
  '/who-cheats-more-men-or-women': '/blog/who-cheats-more-men-or-women',
  '/why-are-so-many-young-adults-struggling-with-mental-health': '/blog/why-are-so-many-young-adults-struggling-with-mental-health',
  '/why-healthcare-practices-need-a-good-credentialing-partner': '/blog/why-healthcare-practices-need-a-good-credentialing-partner',
  '/types-of-anxiety-disorders-explained': '/blog/types-of-anxiety-disorders-explained',
  '/it-service-providers-driving-healthcare-innovation-2025': '/blog/it-service-providers-driving-healthcare-innovation-2025',
  '/how-psychiatry-clinics-improve-revenue': '/blog/how-psychiatry-clinics-improve-revenue',
  // NOTE: Removed incorrect /blog/slug → /blog redirects - posts EXIST in database
  
  // WordPress attachment ID URLs - December 2025
  '/?attachment_id=9425': '/',
  '/?attachment_id=9374': '/',
  
  // Root-level blog slugs that need redirects
  '/dental-anxiety-treatment-for-stress-free-visits-in-maitland-fl': '/blog/dental-anxiety-treatment-for-stress-free-visits-in-maitland-fl',
  '/cpr-first-aid-certification-that-covers-medical-and-non-medical-scenarios': '/blog/cpr-first-aid-certification-that-covers-medical-and-non-medical-scenarios',
  '/couples-therapy': '/couples-counseling',
  '/blog/how-does-phsychotherapy-work': '/blog/how-does-phsychotherapy-work',
  '/blog/nervous-breakdown': '/blog/what-is-mental-breakdown',
  
  // Google Search Console - Not Found 404 Errors - December 2025
  // NOTE: Do NOT redirect /@vite/client - it breaks development prerendering
  '/locations/therapy-services-lake-mary': '/therapist-orlando',
  '/treatments/psychiatry-maitland': '/psychiatrist-orlando',
  '/understanding-4-types-of-bpd': '/blog/understanding-the-4-types-of-bpd',
  '/locations/psychiatry-fairview-shores': '/psychiatrist-orlando',
  '/treatments/depression-treatment': '/depression-treatment',
  '/locations/psychiatry-casselberry': '/psychiatrist-orlando',
  '/locations/psychiatry-altamonte-springs': '/psychiatrist-orlando',
  '/locations/psychiatry-richmond-heights': '/psychiatrist-orlando',
  '/locations/psychiatry-pine-hills': '/psychiatrist-orlando',
  '/locations/psychiatry-lake-mary': '/psychiatrist-orlando',
  '/treatments/bipolar-disorder-treatment': '/bipolar-disorder-treatment',
  '/our-approach-1': '/services',
  '/blog/ltr-relationship-meaning-guide': '/blog/what-is-a-short-term-relationship',
  
  // Google Search Console - Soft 404 Fixes (December 24, 2025)
  // Condition pages that need redirects
  '/anger-management': '/therapy',
  '/anxiety-disorders': '/anxiety-therapy',
  '/personality-disorders': '/services',
  '/eating-disorders': '/services',
  '/lgbtq-therapy': '/therapy',
  
  // NOTE: REMOVED 20+ incorrect blog→/blog redirects that were causing traffic loss
  // These blog posts EXIST in database and should NOT redirect to /blog index
  // Removed: silent-panic-attacks, bpd-men-guide, how-to-leave-toxic-relationship,
  // reactive-attachment-disorder-in-adults, understanding-adhd-masking, what-is-time-blindness,
  // jobs-for-people-with-anxiety, understanding-social-exhaustion-adhd-brain,
  // how-bipolar-disorder-impacts-interpersonal-dynamics, who-cheats-more-men-or-women,
  // lgbtqia2s-identity-explained, signs-of-attention-seeking-behavior, how-to-stop-people-pleasing,
  // overcoming-flight-anxiety, one-sided-relationship-signs, mindfulness-and-relaxation-exercises,
  // how-understanding-patient-perspectives, 8-physical-signs-stress, what-are-the-goals-of-psychotherapy,
  // how-to-get-over-someone-and-move-on-with-your-life, how-debilitating-anxiety-impacts-overall-health,
  // online-cpr-certification, how-to-be-productive, head-trauma-memory-loss-recovery,
  // chronic-anxiety-treatment-orlando, cbt-therapy-improving-mental-health-in-winter-park,
  // future-of-healthcare, from-tension-to-relief-everyday-tips-for-a-healthier-body
  
  // Insurance page variants
  '/cigna-orlando': '/psychiatrist-orlando-accepts-cigna',
  '/find-a-psychiatrist-that-takes-curative-health-insurance-curative-coverage': '/insurance',
  
  // Treatment page variants - canonical mappings (deduplicated)
  '/treatments/ocd-therapy': '/ocd-treatment',
  '/treatments/ocd-treatment': '/ocd-treatment',
  '/treatments/bipolar-disorder-therapy': '/bipolar-disorder-treatment',
  
  // Root-level blog slugs with trailing slashes (normalized by middleware)
  '/dbt-skills-for-healthy-communication-and-conflict-resolution-in-dating': '/couples-counseling',
  '/from-heartbreak-to-healing-emdr-strategies-for-moving-on-after-a-breakup': '/emdr-therapy',
  '/how-emdr-helps-with-anxiety-depression': '/emdr-therapy',
  '/how-long-after-car-accident-can-you-claim-injury': '/services',
  '/how-long-does-it-take-to-fall-in-love-timelines-what-to-expect': '/blog/how-long-does-it-take-to-fall-in-love-timelines-what-to-expect',
  '/how-to-prepare-for-your-first-virtual-counseling-session': '/virtual-therapy',
  '/how-to-stop-panic-attacks-at-night': '/anxiety-therapy',
  
  // Feed URLs - redirect to blog
  '/head-trauma-memory-loss-recovery/feed': '/blog',
  
  // Google Search Console - 404 Fixes (January 2026)
  // Condition pages that need redirects (no dedicated pages exist)
  '/substance-use-disorders-addiction': '/services',
  '/postpartum-depression-perinatal-mood-disorders': '/services',
  '/ocd-obsessive-compulsive-disorder': '/ocd-treatment',
  '/mood-disorder-questionnaire': '/services',
  // NOTE: /ocd-treatment, /ocd-therapy, /bipolar-disorder-treatment are standalone pages - DO NOT redirect
  
  // Treatment pages - redirect to canonical standalone pages
  '/treatments/ptsd-treatment': '/ptsd-treatment',
  '/treatments/intimacy-therapy-sexual-wellness': '/couples-counseling',
  '/treatments/cognitive-behavioral-therapy': '/cognitive-behavioral-therapy',
  '/treatments/trauma-therapy': '/trauma-therapy-orlando',
  '/treatments/psychosis': '/psychosis-treatment-orlando',
  '/treatments/schizophrenia': '/schizophrenia-psychiatrist-orlando',
  '/treatments/sleep-disorders': '/insomnia-psychiatrist-orlando',
  '/treatments/eating-disorders': '/eating-disorder-treatment-orlando',
  '/treatments/anger-management': '/anger-management-therapy-orlando',
  '/treatments/addiction-treatment': '/addiction-treatment-orlando',
  '/treatments/paranoia': '/paranoia-treatment-orlando',
  '/treatments/pharmacogenetic-testing': '/pharmacogenetic-testing-orlando',
  '/treatments/neuropsychological-testing': '/neuropsychological-testing-orlando',
  '/treatments/dbt-therapy': '/dbt-therapy-orlando',
  '/treatments/cognitive-decline': '/dementia-treatment-orlando',
  
  // NOTE: Do NOT add redirects for location pages - they should be self-canonical
  // and handled by LocationDetail.tsx or dedicated static pages
  
  
  // Oscar Health and UHC variants with trailing slashes (normalized)
  '/find-a-psychiatrist-that-takes-oscar-health-oscar-coverage': '/therapist-accepts-oscar-health',

  // GSC 404 Fixes - January 2026 batch
  // Location variations that don't have dedicated pages
  '/locations/sanford': '/services',
  '/locations/lake-nona': '/psychiatrist-lake-nona',
  '/locations/oviedo': '/therapy-oviedo',
  '/locations/downtown-orlando': '/psychiatrist-downtown-orlando',
  '/locations/longwood': '/psychiatrist-longwood',

  // Therapy services location variations
  '/therapy-services-winter-park': '/therapist-orlando',
  '/therapy-services-lake-mary': '/therapist-orlando',
  '/therapy-services-altamonte-springs': '/therapist-orlando',

  // Psychiatry service variations
  '/psychiatry-services-orlando': '/psychiatrist-orlando',
  '/psychiatry-services': '/psychiatric-services',

  // Common misspellings and variations
  '/physiatrist-orlando': '/psychiatrist-orlando',
  '/phychiatrist-orlando': '/psychiatrist-orlando',
  '/pyschiatrist-orlando': '/psychiatrist-orlando',
  '/phsychiatrist-orlando': '/psychiatrist-orlando',

  // Old category/archive pages
  '/category/mental-health': '/blog',
  '/category/wellness': '/blog',
  '/category/therapy': '/blog',
  '/category/psychiatry': '/blog',
  '/categories': '/blog',

  // Services variations
  '/mental-health-services': '/services',
  '/psychiatric-treatment': '/psychiatric-services',
  // NOTE: /therapy-services already defined above (line 332)

  // Additional condition page redirects
  '/anxiety-disorder': '/anxiety-therapy',
  '/depression-disorder': '/depression-treatment',
  '/adhd-disorder': '/adhd-treatment',
  '/bipolar': '/bipolar-disorder-treatment',
  '/ptsd-disorder': '/ptsd-treatment',
  '/ocd-disorder': '/ocd-treatment',

  // Team/provider variations
  '/our-team': '/team',
  '/our-providers': '/team',
  '/meet-our-team': '/team',
  '/staff': '/team',
  '/doctors': '/team',
  '/therapists': '/team',
  '/psychiatrists': '/team',

  // Google Search Console - Soft 404 Fixes (February 2026)
  // Root-level blog slugs that need explicit redirects (not caught by dynamic blog slug checker in production)
  '/mindful-dating-a-guide-to-building-strong-connections': '/couples-counseling',
  '/grief-self-care-tips-for-grieving': '/blog/the-power-of-grief-counseling-in-healing-the-heart-2',
  '/neuropharmacology-dmaa-nefiracetam-comparative-insights': '/blog/neuropharmacology-dmaa-nefiracetam-comparative-insights',
  '/managing-holiday-anxiety-effective-treatment-in-orlando': '/anxiety-therapy',
  '/holiday-anxiety-effective-treatment-in-orlando': '/anxiety-therapy',
  '/hidden-anxiety-treatment-dbt-skills-you-can-use-at-home': '/anxiety-therapy',
  '/mental-health-challenges-in-nursing-how-to-overcome-them': '/blog/mental-health-challenges-in-nursing-how-to-overcome-them',
  '/from-tension-to-relief-everyday-tips-for-a-healthier-body': '/blog/from-tension-to-relief-everyday-tips-for-a-healthier-body',
  '/the-transformative-power-of-counseling-understanding-its-benefits': '/blog/the-transformative-power-of-counseling-understanding-its-benefits',
  '/lgbtqia2s-identity-explained': '/therapy',
  '/8-physical-signs-stress-is-impacting-your-body': '/blog/8-physical-signs-stress-is-impacting-your-body',
  '/understanding-cognitive-behavioral-therapy-cbt-a-guide-to-mental-wellness': '/blog/understanding-cognitive-behavioral-therapy-cbt-a-guide-to-mental-wellness',
  '/overcoming-flight-anxiety-in-orlando-fl-how-treatment-can-help': '/blog/overcoming-flight-anxiety-in-orlando-fl-how-treatment-can-help',
  '/psychiatrist-vs-psychologist-whats-the-difference': '/blog/psychiatrist-vs-psychologist-whats-the-difference',
  '/psychotherapist-services-types-benefits-what-to-expect': '/blog/psychotherapist-services-types-benefits-what-to-expect',
  '/how-to-get-over-someone-and-move-on-with-your-life': '/blog/how-to-get-over-someone-and-move-on-with-your-life',

  // Treatment/therapy page variants
  '/concentration-and-focus-therapy': '/adhd-treatment',
  '/virtual-counseling-services': '/virtual-therapy',
  '/ocd-therapy': '/ocd-treatment',

  // Insurance variant
  '/optum-optum-coverage': '/insurance',
};

/**
 * Normalize a URL path by:
 * 1. Removing trailing slashes (except root)
 * 2. Collapsing duplicate slashes
 * 3. Decoding URI components
 */
export function normalizePath(path: string): string {
  if (path === '/') return path;
  
  // Collapse duplicate slashes
  let normalized = path.replace(/\/+/g, '/');
  
  // Remove trailing slash for non-root paths
  if (normalized.endsWith('/') && normalized.length > 1) {
    normalized = normalized.slice(0, -1);
  }
  
  return normalized;
}

/**
 * Query parameters that should be stripped for SEO purposes (DENYLIST approach)
 * These are tracking/analytics parameters that don't affect page content
 * 
 * IMPORTANT: gclid, fbclid, and UTM params are PRESERVED for analytics tracking!
 * These are needed by Clarity, GA4, and conversion tracking before client JS runs.
 * Google/Facebook don't penalize their own tracking params in URLs.
 * The canonical tag in SEOHead still points to the clean URL for SEO.
 * 
 * This list covers:
 * - Email marketing (Mailchimp, HubSpot)
 * - Affiliate/referral tracking
 * - Session tracking
 * - Social sharing parameters
 */
const STRIP_QUERY_PARAMS = new Set([
  // NOTE: UTM and click IDs are intentionally NOT stripped - needed for analytics
  // 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id',
  // 'gclid', 'gbraid', 'wbraid', 'dclid', 'gclsrc',
  // 'fbclid', 'fbc', 'fbp',
  
  // Microsoft/Bing Click IDs (less common, can strip)
  'msclkid', 'mscampid',
  // Twitter
  'twclid',
  // LinkedIn
  'li_fat_id',
  // Instagram
  'igshid',
  // TikTok
  'ttclid',
  // Email marketing - Mailchimp
  'mc_cid', 'mc_eid',
  // Email marketing - HubSpot (all lowercase for case-insensitive matching)
  'hs_ctaclickedid', 'hsctaTracking'.toLowerCase(),
  'hsa_acc', 'hsa_cam', 'hsa_grp', 'hsa_ad', 'hsa_src', 'hsa_tgt', 'hsa_kw', 'hsa_mt', 'hsa_net', 'hsa_ver',
  // Affiliate/referral
  'ref', 'referer', 'referrer', 'source', 'partner', 'affiliate', 'aff_id',
  'click_id', 'tracking_id', 'campaign', 'share',
  // Analytics session IDs (internal GA params, not conversion tracking)
  '_ga', '_gl', '_gid', '_gac', 'sid', 'session_id',
  // Misc tracking
  'oly_enc_id', 'oly_anon_id', 'vero_id', 'sc_src', 'sc_cid', 'sscid',
  'mktcid', 'mkt_tok', 'trk', 'mtm_source', 'mtm_medium', 'mtm_campaign',
  // WordPress legacy query params (should never affect page content)
  'page_id', 'p', 'attachment_id', 'preview', 'preview_id', 'preview_nonce',
]);

/**
 * Strip tracking query parameters for clean canonical URLs
 * 
 * Uses DENYLIST approach: removes known tracking params, preserves functional params
 * This is safer than allowlist for content sites that may add pagination/filters later
 */
function stripTrackingParams(query: string): string {
  if (!query || query === '?' || !query.startsWith('?')) {
    return '';
  }
  
  const params = new URLSearchParams(query.slice(1));
  const cleanParams = new URLSearchParams();
  
  for (const [key, value] of params.entries()) {
    const lowerKey = key.toLowerCase();
    // Keep parameter only if it's NOT in the strip list
    if (!STRIP_QUERY_PARAMS.has(lowerKey)) {
      cleanParams.set(key, value);
    }
  }
  
  const cleanQuery = cleanParams.toString();
  return cleanQuery ? `?${cleanQuery}` : '';
}

/**
 * Get the canonical URL for a given request
 * Returns null if already canonical, otherwise returns the canonical URL
 */
export function getCanonicalUrl(
  protocol: string,
  host: string,
  path: string,
  query: string
): string | null {
  // Step 1: Force HTTPS (but skip for localhost in development)
  const isLocalhost = host.includes('localhost') || host.includes('127.0.0.1');
  const canonicalProtocol = isLocalhost ? protocol : 'https';
  
  // Step 2: Ensure www subdomain (www is canonical host)
  // Skip for localhost and Vercel preview domains
  const isVercelPreview = host.includes('.vercel.app');
  let canonicalHost = host;
  if (!isLocalhost && !isVercelPreview) {
    // For production domain, ensure www prefix
    canonicalHost = host.startsWith('www.') ? host : `www.${host}`;
  }
  
  // Step 3: Normalize path (remove trailing slash, collapse duplicates)
  const normalizedPath = normalizePath(path);
  
  // Step 4: Strip tracking query parameters
  const cleanQuery = stripTrackingParams(query);
  
  // Step 5: Check for content redirects in the map
  let canonicalPath = contentRedirectMap[normalizedPath];
  
  // Step 6: Check if this is a blog post slug (dynamic redirect)
  if (!canonicalPath && blogSlugChecker) {
    const segments = normalizedPath.split('/').filter(s => s.length > 0);
    
    // Only check single-segment paths (e.g., /foo but not /foo/bar)
    if (segments.length === 1) {
      const slug = segments[0];
      
      // Check if this slug matches a blog post
      if (blogSlugChecker(slug)) {
        canonicalPath = `/blog/${slug}`;
      }
    }
  }
  
  // If no redirect found, use the normalized path
  if (!canonicalPath) {
    canonicalPath = normalizedPath;
  }
  
  // Construct the canonical URL
  const canonical = `${canonicalProtocol}://${canonicalHost}${canonicalPath}${cleanQuery}`;
  const current = `${protocol}://${host}${path}${query}`;
  
  // Return canonical URL only if it differs from current
  return canonical !== current ? canonical : null;
}
