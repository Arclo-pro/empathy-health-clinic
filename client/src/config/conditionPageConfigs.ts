export type PageType = 'condition-treatment' | 'condition-location' | 'insurance-condition' | 'comparison' | 'symptom';

export interface FAQ {
  question: string;
  answer: string;
}

export interface InternalLinks {
  up?: string;
  siblings?: string[];
  down?: string[];
  cross?: string[];
}

export interface ConditionPageConfig {
  slug: string;
  path: string;
  title: string;
  description: string;
  h1: string;
  pageType: PageType;
  outline: string[];
  faqs: FAQ[];
  internalLinks: InternalLinks;
  keywords?: string[];
}

// A) CONDITION × TREATMENT PAGES (20 pages)
const conditionTreatmentPages: ConditionPageConfig[] = [
  {
    slug: 'adhd-psychiatry',
    path: '/conditions/adhd/psychiatry',
    title: 'ADHD Psychiatry in Orlando | Empathy Health Clinic',
    description: 'Expert ADHD evaluation and psychiatry care in Orlando. Evidence-based treatment plans, supportive approach, and convenient scheduling.',
    h1: 'ADHD Psychiatry in Orlando',
    pageType: 'condition-treatment',
    outline: [
      'ADHD psychiatry: what it includes',
      'Who benefits from ADHD psychiatric care',
      'Evaluation process and what to expect',
      'Treatment plan approach',
      'Telepsychiatry options',
      'Cost and insurance basics',
      'Book an appointment',
    ],
    faqs: [
      { question: 'How do I know if I have ADHD?', answer: 'Common signs include difficulty focusing, impulsivity, restlessness, and trouble completing tasks. A comprehensive psychiatric evaluation can help determine if you have ADHD and create an effective treatment plan.' },
      { question: 'What happens in an ADHD evaluation?', answer: 'An ADHD evaluation includes a detailed discussion of your symptoms, medical history, and how ADHD impacts your daily life. We use evidence-based assessment tools to provide an accurate diagnosis.' },
      { question: 'Can adults be treated for ADHD?', answer: 'Yes, absolutely. Many adults discover they have ADHD later in life. We specialize in adult ADHD evaluation and treatment with personalized care plans.' },
      { question: 'Do you offer online appointments?', answer: 'Yes, we offer secure telepsychiatry appointments for ADHD care, allowing you to meet with our psychiatrists from the comfort of your home.' },
    ],
    internalLinks: {
      up: '/conditions/adhd',
      siblings: ['/conditions/adhd/therapy', '/conditions/adhd/telepsychiatry', '/conditions/adhd/online-treatment'],
      down: ['/conditions/adhd/orlando'],
    },
    keywords: ['adhd psychiatry orlando', 'adhd psychiatrist', 'adhd evaluation', 'adult adhd treatment'],
  },
  {
    slug: 'adhd-therapy',
    path: '/conditions/adhd/therapy',
    title: 'Therapy for ADHD in Orlando | Empathy Health Clinic',
    description: 'ADHD-focused therapy to build routines, improve focus, and reduce overwhelm. Personalized support for adults and families.',
    h1: 'Therapy for ADHD in Orlando',
    pageType: 'condition-treatment',
    outline: [
      'How therapy helps ADHD',
      'Skills-focused treatment goals',
      'What sessions look like',
      'ADHD + anxiety/overwhelm overlap',
      'Online therapy availability',
      'Getting started',
    ],
    faqs: [
      { question: 'Is therapy effective for adult ADHD?', answer: 'Yes, therapy is highly effective for adult ADHD. It helps develop coping strategies, organizational skills, and ways to manage symptoms in daily life.' },
      { question: 'How long does ADHD therapy take?', answer: 'Treatment length varies by individual needs. Many clients see improvements within 8-12 sessions, with some continuing for ongoing support.' },
      { question: "What if I'm not sure it's ADHD?", answer: 'We can help you understand your symptoms during an initial evaluation. Whether it turns out to be ADHD or another condition, we will develop an appropriate treatment plan.' },
    ],
    internalLinks: {
      up: '/conditions/adhd',
      siblings: ['/conditions/adhd/psychiatry', '/conditions/adhd/telepsychiatry'],
      cross: ['/symptoms/cant-focus-at-work'],
    },
    keywords: ['adhd therapy orlando', 'adhd counseling', 'adhd coping skills', 'adhd support'],
  },
  {
    slug: 'adhd-telepsychiatry',
    path: '/conditions/adhd/telepsychiatry',
    title: 'ADHD Telepsychiatry in Orlando | Empathy Health Clinic',
    description: 'Meet with an ADHD-focused clinician from home. Secure telepsychiatry appointments with clear next steps and support.',
    h1: 'ADHD Telepsychiatry in Orlando',
    pageType: 'condition-treatment',
    outline: [
      'How telepsychiatry works',
      "Who it's best for",
      'Tech requirements + privacy',
      'Evaluation process via telehealth',
      'Follow-ups and continuity of care',
      'Scheduling',
    ],
    faqs: [
      { question: 'Is telepsychiatry private?', answer: 'Yes, our telepsychiatry platform is fully HIPAA-compliant and encrypted. Your sessions are private and secure.' },
      { question: 'What if I prefer in-person?', answer: 'We offer both options. You can choose in-person visits at our Winter Park office or continue with telepsychiatry based on your preference.' },
      { question: 'Can I start care online?', answer: 'Yes, you can complete your initial ADHD evaluation and begin treatment entirely through our telepsychiatry platform.' },
    ],
    internalLinks: {
      up: '/conditions/adhd',
      siblings: ['/conditions/adhd/psychiatry', '/conditions/adhd/therapy'],
      cross: ['/compare/telepsychiatry-vs-in-person'],
    },
    keywords: ['adhd telepsychiatry', 'online adhd psychiatrist', 'virtual adhd care', 'adhd telehealth'],
  },
  {
    slug: 'adhd-online-treatment',
    path: '/conditions/adhd/online-treatment',
    title: 'Online ADHD Treatment in Orlando | Empathy Health Clinic',
    description: 'Online ADHD care that combines evaluation, support, and therapy options. Convenient scheduling with clear next steps.',
    h1: 'Online ADHD Treatment in Orlando',
    pageType: 'condition-treatment',
    outline: [
      'What "online treatment" includes',
      'Psychiatry vs therapy (and when each helps)',
      'Step-by-step: getting started online',
      'What to expect in the first visit',
      'Insurance and payment basics',
    ],
    faqs: [
      { question: 'Is online care as effective?', answer: 'Research shows that online psychiatric care is just as effective as in-person care for many conditions, including ADHD. Our telepsychiatry platform provides the same quality of care.' },
      { question: "What's the first step?", answer: 'Contact us to schedule an initial evaluation. We will guide you through the process and help you get started with online ADHD care.' },
      { question: 'Do you accept insurance?', answer: 'Yes, we accept most major insurance plans including Aetna, BCBS, Cigna, and UnitedHealthcare. We can verify your benefits before your first appointment.' },
    ],
    internalLinks: {
      siblings: ['/conditions/adhd/telepsychiatry', '/conditions/adhd/therapy'],
      cross: ['/compare/online-psychiatry-vs-in-person'],
    },
    keywords: ['online adhd treatment', 'virtual adhd care orlando', 'adhd treatment from home'],
  },
  {
    slug: 'anxiety-psychiatry',
    path: '/conditions/anxiety/psychiatry',
    title: 'Anxiety Psychiatry in Orlando | Empathy Health Clinic',
    description: 'Anxiety can be exhausting. Get a thoughtful psychiatry evaluation and a personalized treatment plan in Orlando.',
    h1: 'Anxiety Psychiatry in Orlando',
    pageType: 'condition-treatment',
    outline: [
      'Types of anxiety we help with',
      'Psychiatry evaluation for anxiety',
      'Treatment planning',
      'When therapy is recommended',
      'Telepsychiatry option',
    ],
    faqs: [
      { question: 'Is this anxiety or stress?', answer: 'While stress is a normal response to challenges, anxiety persists even without a clear trigger and can interfere with daily life. A psychiatric evaluation can help distinguish between the two.' },
      { question: 'What happens in an anxiety evaluation?', answer: 'We discuss your symptoms, their duration, and impact on your life. We also explore any underlying conditions and develop a personalized treatment approach.' },
      { question: 'Can you help with panic?', answer: 'Yes, we specialize in treating panic disorder and panic attacks. Our psychiatrists can develop effective treatment plans to help reduce and manage panic symptoms.' },
    ],
    internalLinks: {
      up: '/conditions/anxiety',
      siblings: ['/conditions/anxiety/therapy', '/conditions/anxiety/telepsychiatry'],
      cross: ['/symptoms/panic-attacks'],
    },
    keywords: ['anxiety psychiatry orlando', 'anxiety psychiatrist', 'anxiety evaluation', 'panic disorder treatment'],
  },
  {
    slug: 'anxiety-therapy',
    path: '/conditions/anxiety/therapy',
    title: 'Therapy for Anxiety in Orlando | Empathy Health Clinic',
    description: 'Anxiety therapy designed to reduce worry, calm your nervous system, and improve daily functioning. In-person or online.',
    h1: 'Therapy for Anxiety in Orlando',
    pageType: 'condition-treatment',
    outline: [
      'What anxiety therapy targets',
      'Common therapy approaches',
      'What sessions look like',
      'How progress is measured',
      'Online options',
    ],
    faqs: [
      { question: 'How long until I feel better?', answer: 'Many clients notice improvements within 4-8 sessions. However, lasting change takes time, and we work at a pace that feels right for you.' },
      { question: 'Do I need psychiatry or therapy?', answer: 'It depends on your symptoms and preferences. Therapy addresses thought patterns and coping skills, while psychiatry may include additional treatment options. Many benefit from both.' },
      { question: 'Can therapy help panic attacks?', answer: 'Yes, therapy is very effective for panic attacks. We teach techniques to manage panic symptoms and address the underlying anxiety.' },
    ],
    internalLinks: {
      up: '/conditions/anxiety',
      cross: ['/compare/psychiatry-vs-therapy', '/symptoms/racing-thoughts-at-night'],
    },
    keywords: ['anxiety therapy orlando', 'anxiety counseling', 'cbt for anxiety', 'anxiety treatment'],
  },
  {
    slug: 'anxiety-telepsychiatry',
    path: '/conditions/anxiety/telepsychiatry',
    title: 'Anxiety Telepsychiatry in Orlando | Empathy Health Clinic',
    description: 'Convenient anxiety care from home with secure telepsychiatry visits. Supportive evaluation and next-step planning.',
    h1: 'Anxiety Telepsychiatry in Orlando',
    pageType: 'condition-treatment',
    outline: [
      'What telepsychiatry addresses for anxiety',
      "Who it's best for",
      'What to expect (first visit + follow-up)',
      'Privacy and technology',
    ],
    faqs: [
      { question: "What if I'm having panic symptoms?", answer: 'Our telepsychiatry platform allows us to provide support during difficult moments. If you experience panic during a session, we can work through it together.' },
      { question: 'Can I do therapy online too?', answer: 'Yes, we offer both telepsychiatry and online therapy. You can receive comprehensive anxiety care entirely through our virtual platform.' },
    ],
    internalLinks: {
      siblings: ['/conditions/anxiety/psychiatry', '/conditions/anxiety/therapy'],
      cross: ['/compare/telepsychiatry-vs-in-person'],
    },
    keywords: ['anxiety telepsychiatry', 'online anxiety treatment', 'virtual anxiety care'],
  },
  {
    slug: 'anxiety-online-treatment',
    path: '/conditions/anxiety/online-treatment',
    title: 'Online Anxiety Treatment in Orlando | Empathy Health Clinic',
    description: 'Online anxiety care combining evaluation, therapy options, and practical support. Flexible scheduling for Orlando-area clients.',
    h1: 'Online Anxiety Treatment in Orlando',
    pageType: 'condition-treatment',
    outline: [
      'What online anxiety care includes',
      'Care paths (therapy vs psychiatry)',
      'Getting started + first appointment',
      'Building coping routines between sessions',
    ],
    faqs: [
      { question: 'Do I need a diagnosis to start?', answer: 'No, you do not need a prior diagnosis. We can evaluate your symptoms during your first appointment and develop an appropriate treatment plan.' },
      { question: 'What if my anxiety is work-related?', answer: 'Work-related anxiety is common and treatable. We can help you develop strategies to manage workplace stress and anxiety.' },
    ],
    internalLinks: {
      siblings: ['/conditions/anxiety/therapy', '/conditions/anxiety/telepsychiatry'],
      cross: ['/compare/online-psychiatry-vs-in-person'],
    },
    keywords: ['online anxiety treatment', 'virtual anxiety care', 'anxiety treatment from home'],
  },
  {
    slug: 'depression-psychiatry',
    path: '/conditions/depression/psychiatry',
    title: 'Depression Psychiatry in Orlando | Empathy Health Clinic',
    description: "If life feels heavy, you're not alone. Get a depression evaluation and a personalized plan in Orlando.",
    h1: 'Depression Psychiatry in Orlando',
    pageType: 'condition-treatment',
    outline: [
      'Signs of depression vs burnout',
      'Psychiatric evaluation overview',
      'Treatment planning',
      'When therapy helps most',
    ],
    faqs: [
      { question: 'How do I know it\'s depression?', answer: 'Depression often involves persistent sadness, loss of interest in activities, changes in sleep or appetite, and difficulty functioning. An evaluation can help clarify your symptoms.' },
      { question: 'What happens in the first visit?', answer: 'We conduct a thorough evaluation of your symptoms, history, and goals. Together, we develop a personalized treatment plan tailored to your needs.' },
      { question: 'Can I do online appointments?', answer: 'Yes, we offer telepsychiatry appointments for depression care. You can receive the same quality care from the comfort of your home.' },
    ],
    internalLinks: {
      up: '/conditions/depression',
      cross: ['/conditions/depression/burnout-vs-depression', '/symptoms/feeling-burned-out'],
    },
    keywords: ['depression psychiatry orlando', 'depression psychiatrist', 'depression evaluation', 'depression treatment'],
  },
  {
    slug: 'depression-therapy',
    path: '/conditions/depression/therapy',
    title: 'Therapy for Depression in Orlando | Empathy Health Clinic',
    description: 'Depression therapy focused on relief, re-engagement, and practical steps forward. Supportive care in Orlando or online.',
    h1: 'Therapy for Depression in Orlando',
    pageType: 'condition-treatment',
    outline: [
      'What therapy targets in depression',
      'What sessions look like',
      'Measuring progress',
      'Online therapy options',
    ],
    faqs: [
      { question: 'Is therapy enough?', answer: 'For many people, therapy alone is effective for depression. However, some benefit from combining therapy with other treatment approaches. We can discuss what might work best for you.' },
      { question: 'What if I feel numb or unmotivated?', answer: 'Feeling numb or unmotivated is common with depression. We work at your pace and use approaches designed to help you re-engage with activities and emotions gradually.' },
    ],
    internalLinks: {
      up: '/conditions/depression',
      cross: ['/compare/psychiatry-vs-therapy'],
    },
    keywords: ['depression therapy orlando', 'depression counseling', 'cbt for depression'],
  },
  {
    slug: 'depression-telepsychiatry',
    path: '/conditions/depression/telepsychiatry',
    title: 'Depression Telepsychiatry in Orlando | Empathy Health Clinic',
    description: 'Meet with a clinician from home. Secure depression telepsychiatry visits with clear support and follow-up planning.',
    h1: 'Depression Telepsychiatry in Orlando',
    pageType: 'condition-treatment',
    outline: [
      'Telepsychiatry for depression',
      "Who it's right for",
      'What to expect',
      'Safety and support planning',
    ],
    faqs: [
      { question: "What if I'm in crisis?", answer: 'If you are in crisis, please call 988 (Suicide & Crisis Lifeline) or go to your nearest emergency room. For ongoing care, our telepsychiatry platform includes safety planning and support.' },
      { question: 'Can online care work long-term?', answer: 'Yes, many clients continue with telepsychiatry for ongoing depression care. It provides consistent, accessible support without the need to travel.' },
    ],
    internalLinks: {
      siblings: ['/conditions/depression/psychiatry', '/conditions/depression/therapy'],
      cross: ['/compare/telepsychiatry-vs-in-person'],
    },
    keywords: ['depression telepsychiatry', 'online depression treatment', 'virtual depression care'],
  },
  {
    slug: 'depression-online-treatment',
    path: '/conditions/depression/online-treatment',
    title: 'Online Depression Treatment in Orlando | Empathy Health Clinic',
    description: 'Online depression care with evaluation and therapy options. Convenient scheduling and compassionate support for Orlando-area clients.',
    h1: 'Online Depression Treatment in Orlando',
    pageType: 'condition-treatment',
    outline: [
      'What online care includes',
      'Choosing therapy vs psychiatry',
      'First appointment steps',
      'Building routines between sessions',
    ],
    faqs: [
      { question: 'Do I need a referral?', answer: 'No referral is needed. You can contact us directly to schedule an evaluation and begin treatment.' },
      { question: 'How soon can I be seen?', answer: 'We typically offer same-week appointments for new patients. Contact us to check current availability.' },
    ],
    internalLinks: {
      siblings: ['/conditions/depression/therapy', '/conditions/depression/telepsychiatry'],
      cross: ['/compare/online-psychiatry-vs-in-person'],
    },
    keywords: ['online depression treatment', 'virtual depression care', 'depression treatment from home'],
  },
  {
    slug: 'bipolar-psychiatry',
    path: '/conditions/bipolar/psychiatry',
    title: 'Bipolar Psychiatry in Orlando | Empathy Health Clinic',
    description: 'Thoughtful bipolar evaluation and ongoing psychiatry support in Orlando. Clear care plans and consistent follow-up.',
    h1: 'Bipolar Psychiatry in Orlando',
    pageType: 'condition-treatment',
    outline: [
      'Bipolar symptoms and patterns (education)',
      'Why evaluation matters',
      'Ongoing monitoring and support plan',
      'Coordinating therapy and lifestyle supports',
    ],
    faqs: [
      { question: 'How is bipolar diagnosed?', answer: 'Bipolar diagnosis involves a comprehensive evaluation of your mood patterns, history, and symptoms. We look for patterns of mood episodes and their impact on your life.' },
      { question: "What if I'm not sure it's bipolar?", answer: 'Uncertainty is common. A thorough evaluation can help distinguish bipolar from other conditions like depression or anxiety, ensuring you receive appropriate care.' },
    ],
    internalLinks: {
      up: '/conditions/bipolar',
      down: ['/conditions/bipolar/orlando'],
    },
    keywords: ['bipolar psychiatry orlando', 'bipolar psychiatrist', 'bipolar evaluation', 'bipolar treatment'],
  },
  {
    slug: 'bipolar-therapy',
    path: '/conditions/bipolar/therapy',
    title: 'Therapy for Bipolar Disorder in Orlando | Empathy Health Clinic',
    description: 'Therapy support for bipolar disorder focused on stability, routines, relationships, and early-warning awareness.',
    h1: 'Therapy for Bipolar Disorder in Orlando',
    pageType: 'condition-treatment',
    outline: [
      'How therapy supports bipolar care',
      'Recognizing patterns and triggers',
      'Building structure and support',
      'Online options',
    ],
    faqs: [
      { question: 'Can therapy help with mood swings?', answer: 'Yes, therapy helps you recognize early warning signs of mood episodes and develop strategies to maintain stability. It complements other aspects of bipolar care.' },
      { question: 'What if I have anxiety too?', answer: 'Anxiety commonly co-occurs with bipolar disorder. We can address both conditions in your treatment plan to provide comprehensive care.' },
    ],
    internalLinks: {
      up: '/conditions/bipolar',
      cross: ['/compare/psychiatry-vs-therapy'],
    },
    keywords: ['bipolar therapy orlando', 'bipolar counseling', 'bipolar support', 'mood disorder therapy'],
  },
  {
    slug: 'ocd-psychiatry',
    path: '/conditions/ocd/psychiatry',
    title: 'OCD Psychiatry in Orlando | Empathy Health Clinic',
    description: 'OCD can be relentless. Get an OCD evaluation and a clear care plan in Orlando with supportive, structured follow-up.',
    h1: 'OCD Psychiatry in Orlando',
    pageType: 'condition-treatment',
    outline: [
      'What OCD looks like (obsessions/compulsions)',
      'How evaluation works',
      'Treatment planning',
      'When therapy is recommended',
    ],
    faqs: [
      { question: 'Is this OCD or anxiety?', answer: 'While OCD and anxiety overlap, OCD involves specific obsessions (intrusive thoughts) and compulsions (repetitive behaviors). An evaluation can help distinguish between them.' },
      { question: 'What should I expect in an evaluation?', answer: 'We discuss your symptoms, their patterns, and impact on daily life. We use evidence-based assessment tools to understand your OCD and develop an effective treatment plan.' },
    ],
    internalLinks: {
      up: '/conditions/ocd',
      siblings: ['/conditions/ocd/therapy'],
    },
    keywords: ['ocd psychiatry orlando', 'ocd psychiatrist', 'ocd evaluation', 'ocd treatment'],
  },
  {
    slug: 'ocd-therapy',
    path: '/conditions/ocd/therapy',
    title: 'Therapy for OCD in Orlando | Empathy Health Clinic',
    description: 'OCD therapy focused on reducing compulsions, building tolerance of uncertainty, and improving daily life. Orlando or online.',
    h1: 'Therapy for OCD in Orlando',
    pageType: 'condition-treatment',
    outline: [
      'OCD therapy goals',
      'What sessions look like',
      'Measuring progress',
      'Online therapy',
    ],
    faqs: [
      { question: 'How long does OCD therapy take?', answer: 'Treatment length varies, but many clients see significant improvement within 12-20 sessions of structured therapy. We work at a pace that feels manageable for you.' },
      { question: 'Can treatment be online?', answer: 'Yes, OCD therapy can be highly effective through our secure telehealth platform. Many clients prefer the convenience of online sessions.' },
    ],
    internalLinks: {
      up: '/conditions/ocd',
      siblings: ['/conditions/ocd/psychiatry'],
      cross: ['/compare/psychiatry-vs-therapy'],
    },
    keywords: ['ocd therapy orlando', 'ocd counseling', 'erp therapy', 'ocd treatment'],
  },
  {
    slug: 'anxiety-panic-attacks-treatment',
    path: '/conditions/anxiety/panic-attacks-treatment',
    title: 'Panic Attack Treatment in Orlando | Empathy Health Clinic',
    description: 'Panic attacks are frightening but treatable. Get an evaluation and a plan to reduce attacks and regain confidence.',
    h1: 'Panic Attack Treatment in Orlando',
    pageType: 'condition-treatment',
    outline: [
      'What panic attacks feel like',
      'Rule-outs and evaluation',
      'Therapy-focused strategies',
      'When psychiatry evaluation is helpful',
    ],
    faqs: [
      { question: 'Is a panic attack dangerous?', answer: 'While panic attacks feel terrifying, they are not physically dangerous. However, they are distressing and treatable, and we can help you reduce their frequency and intensity.' },
      { question: 'How do I stop panic attacks?', answer: 'Treatment focuses on understanding triggers, learning coping techniques, and addressing underlying anxiety. With proper care, many people significantly reduce or eliminate panic attacks.' },
    ],
    internalLinks: {
      up: '/conditions/anxiety',
      cross: ['/symptoms/panic-attacks'],
    },
    keywords: ['panic attack treatment orlando', 'panic disorder treatment', 'panic attacks help'],
  },
  {
    slug: 'adhd-adult-treatment',
    path: '/conditions/adhd/adult-adhd-treatment',
    title: 'Adult ADHD Treatment in Orlando | Empathy Health Clinic',
    description: 'Adult ADHD often shows up as overwhelm, disorganization, and focus issues. Get evaluation and support in Orlando or online.',
    h1: 'Adult ADHD Treatment in Orlando',
    pageType: 'condition-treatment',
    outline: [
      'How adult ADHD differs',
      'Common adult impacts (work, relationships)',
      'Evaluation process',
      'Therapy + psychiatry pathways',
    ],
    faqs: [
      { question: 'Can ADHD appear later in life?', answer: 'ADHD is typically present from childhood, but many adults are not diagnosed until later. Life changes or increased demands often bring symptoms to the forefront.' },
      { question: "What's the first step?", answer: 'Schedule an evaluation with our team. We will assess your symptoms, history, and goals to create a personalized treatment plan.' },
    ],
    internalLinks: {
      up: '/conditions/adhd',
      cross: ['/symptoms/cant-focus-at-work'],
    },
    keywords: ['adult adhd treatment orlando', 'adult adhd evaluation', 'adhd in adults'],
  },
  {
    slug: 'depression-burnout-vs-depression',
    path: '/conditions/depression/burnout-vs-depression',
    title: 'Burnout vs Depression | Empathy Health Clinic',
    description: 'Burnout and depression can look similar. Learn key differences, when to seek help, and how to get an evaluation.',
    h1: 'Burnout vs Depression: How to Tell the Difference',
    pageType: 'condition-treatment',
    outline: [
      'Similarities',
      'Key differences',
      'When to seek professional help',
      'What an evaluation looks like',
    ],
    faqs: [
      { question: 'Can burnout turn into depression?', answer: 'Yes, prolonged burnout can develop into clinical depression. Early intervention helps prevent this progression and supports recovery.' },
      { question: 'When should I talk to a clinician?', answer: 'If symptoms persist for more than a few weeks, affect your daily functioning, or include feelings of hopelessness, it is time to seek professional evaluation.' },
    ],
    internalLinks: {
      up: '/conditions/depression',
      cross: ['/symptoms/feeling-burned-out'],
    },
    keywords: ['burnout vs depression', 'burnout symptoms', 'am i burned out or depressed'],
  },
];

// B) CONDITION × LOCATION PAGES (15 pages)
const conditionLocationPages: ConditionPageConfig[] = [
  {
    slug: 'adhd-orlando',
    path: '/conditions/adhd/orlando',
    title: 'ADHD Treatment in Orlando | Empathy Health Clinic',
    description: 'ADHD support for adults and families in Orlando. Evaluation and care planning with in-person and online options.',
    h1: 'ADHD Treatment in Orlando',
    pageType: 'condition-location',
    outline: [
      'ADHD care in Orlando',
      'Evaluation and next steps',
      'Therapy and psychiatry options',
      'Online appointments for Orlando',
    ],
    faqs: [
      { question: 'Do you treat adult ADHD in Orlando?', answer: 'Yes, we specialize in adult ADHD evaluation and treatment. Our Orlando-area clinic provides comprehensive care for adults of all ages.' },
      { question: 'Can I start online?', answer: 'Yes, you can begin your ADHD care entirely online through our telepsychiatry platform, or visit us in person at our Winter Park location.' },
    ],
    internalLinks: {
      up: '/conditions/adhd',
      down: ['/conditions/adhd/psychiatry', '/conditions/adhd/therapy', '/conditions/adhd/telepsychiatry'],
    },
    keywords: ['adhd treatment orlando', 'adhd orlando', 'adhd doctor orlando', 'adhd specialist orlando'],
  },
  {
    slug: 'adhd-winter-park',
    path: '/conditions/adhd/winter-park',
    title: 'ADHD Treatment in Winter Park | Empathy Health Clinic',
    description: 'ADHD evaluation and supportive care for Winter Park clients. Clear next steps and flexible appointment options.',
    h1: 'ADHD Treatment in Winter Park',
    pageType: 'condition-location',
    outline: [
      'ADHD care in Winter Park',
      'Evaluation and next steps',
      'Therapy and psychiatry options',
      'Online appointments available',
    ],
    faqs: [
      { question: 'Do you treat adult ADHD in Winter Park?', answer: 'Yes, our Winter Park clinic specializes in adult ADHD evaluation and treatment with comprehensive care options.' },
      { question: 'Can I start online?', answer: 'Yes, we offer convenient telepsychiatry appointments for Winter Park residents.' },
    ],
    internalLinks: {
      up: '/conditions/adhd',
      siblings: ['/conditions/adhd/orlando', '/conditions/adhd/lake-nona'],
    },
    keywords: ['adhd treatment winter park', 'adhd winter park', 'adhd doctor winter park'],
  },
  {
    slug: 'adhd-lake-nona',
    path: '/conditions/adhd/lake-nona',
    title: 'ADHD Treatment in Lake Nona | Empathy Health Clinic',
    description: 'ADHD evaluation and support for Lake Nona clients with convenient online options and clear care planning.',
    h1: 'ADHD Treatment in Lake Nona',
    pageType: 'condition-location',
    outline: [
      'ADHD care for Lake Nona residents',
      'Evaluation and next steps',
      'Telepsychiatry options',
      'Getting started',
    ],
    faqs: [
      { question: 'Do you serve Lake Nona?', answer: 'Yes, we serve Lake Nona residents through our convenient telepsychiatry platform and our Winter Park office.' },
      { question: 'Can I start online?', answer: 'Yes, telepsychiatry makes it easy to begin ADHD care from Lake Nona.' },
    ],
    internalLinks: {
      up: '/conditions/adhd',
      cross: ['/conditions/adhd/telepsychiatry'],
    },
    keywords: ['adhd treatment lake nona', 'adhd lake nona', 'adhd doctor lake nona'],
  },
  {
    slug: 'anxiety-orlando',
    path: '/conditions/anxiety/orlando',
    title: 'Anxiety Treatment in Orlando | Empathy Health Clinic',
    description: 'Anxiety care in Orlando with therapy and psychiatry options. Support for worry, panic symptoms, and overwhelm.',
    h1: 'Anxiety Treatment in Orlando',
    pageType: 'condition-location',
    outline: [
      'Anxiety care in Orlando',
      'Therapy vs psychiatry',
      'Panic symptom support',
      'Online options',
    ],
    faqs: [
      { question: 'Do you help with panic attacks?', answer: 'Yes, we specialize in treating panic attacks and panic disorder. Our Orlando team provides comprehensive anxiety and panic care.' },
      { question: 'Is online care available?', answer: 'Yes, we offer telepsychiatry and online therapy for Orlando-area residents who prefer virtual appointments.' },
    ],
    internalLinks: {
      up: '/conditions/anxiety',
      down: ['/conditions/anxiety/therapy', '/conditions/anxiety/psychiatry', '/conditions/anxiety/telepsychiatry'],
    },
    keywords: ['anxiety treatment orlando', 'anxiety orlando', 'anxiety doctor orlando', 'anxiety specialist orlando'],
  },
  {
    slug: 'anxiety-winter-park',
    path: '/conditions/anxiety/winter-park',
    title: 'Anxiety Treatment in Winter Park | Empathy Health Clinic',
    description: 'Anxiety support for Winter Park clients with therapy and psychiatry options plus convenient telehealth visits.',
    h1: 'Anxiety Treatment in Winter Park',
    pageType: 'condition-location',
    outline: [
      'Anxiety care in Winter Park',
      'Therapy and psychiatry options',
      'Panic symptom support',
      'Telehealth availability',
    ],
    faqs: [
      { question: 'Do you help with panic attacks?', answer: 'Yes, we provide comprehensive care for panic attacks and anxiety disorders at our Winter Park clinic.' },
      { question: 'Is online care available?', answer: 'Yes, we offer telehealth appointments for all anxiety services.' },
    ],
    internalLinks: {
      up: '/conditions/anxiety',
      siblings: ['/conditions/anxiety/orlando', '/conditions/anxiety/maitland'],
    },
    keywords: ['anxiety treatment winter park', 'anxiety winter park', 'anxiety therapist winter park'],
  },
  {
    slug: 'anxiety-maitland',
    path: '/conditions/anxiety/maitland',
    title: 'Anxiety Treatment in Maitland | Empathy Health Clinic',
    description: 'Anxiety care for Maitland clients with supportive evaluation, therapy options, and secure telehealth appointments.',
    h1: 'Anxiety Treatment in Maitland',
    pageType: 'condition-location',
    outline: [
      'Anxiety care for Maitland residents',
      'Evaluation and treatment options',
      'Telehealth availability',
      'Getting started',
    ],
    faqs: [
      { question: 'Do you serve Maitland?', answer: 'Yes, we serve Maitland residents through our Winter Park office and convenient telehealth options.' },
      { question: 'Can I do appointments online?', answer: 'Yes, we offer secure telehealth appointments for anxiety care.' },
    ],
    internalLinks: {
      up: '/conditions/anxiety',
      cross: ['/conditions/anxiety/telepsychiatry'],
    },
    keywords: ['anxiety treatment maitland', 'anxiety maitland', 'anxiety therapist maitland'],
  },
  {
    slug: 'depression-orlando',
    path: '/conditions/depression/orlando',
    title: 'Depression Treatment in Orlando | Empathy Health Clinic',
    description: 'Depression support in Orlando with therapy and psychiatry options. Compassionate care and clear next steps.',
    h1: 'Depression Treatment in Orlando',
    pageType: 'condition-location',
    outline: [
      'Depression care in Orlando',
      'Burnout vs depression',
      'Therapy and psychiatry pathways',
      'Online options',
    ],
    faqs: [
      { question: "How do I know if it's depression?", answer: 'Persistent sadness, loss of interest, sleep changes, and difficulty functioning are common signs. An evaluation can help clarify your symptoms and guide treatment.' },
      { question: 'Can I start with therapy?', answer: 'Yes, you can begin with therapy and add other treatment approaches as needed based on your progress and preferences.' },
    ],
    internalLinks: {
      up: '/conditions/depression',
      down: ['/conditions/depression/therapy', '/conditions/depression/psychiatry'],
      cross: ['/conditions/depression/burnout-vs-depression'],
    },
    keywords: ['depression treatment orlando', 'depression orlando', 'depression doctor orlando', 'depression specialist orlando'],
  },
  {
    slug: 'depression-winter-park',
    path: '/conditions/depression/winter-park',
    title: 'Depression Treatment in Winter Park | Empathy Health Clinic',
    description: 'Depression care for Winter Park clients with therapy and psychiatry options and flexible telehealth scheduling.',
    h1: 'Depression Treatment in Winter Park',
    pageType: 'condition-location',
    outline: [
      'Depression care in Winter Park',
      'Therapy and psychiatry options',
      'Burnout vs depression',
      'Telehealth availability',
    ],
    faqs: [
      { question: "How do I know if it's depression?", answer: 'Common signs include persistent sadness, loss of interest, and changes in sleep or energy. We can help you understand your symptoms through an evaluation.' },
      { question: 'Can I start with therapy?', answer: 'Yes, therapy is often an excellent starting point for depression treatment.' },
    ],
    internalLinks: {
      up: '/conditions/depression',
      siblings: ['/conditions/depression/orlando', '/conditions/depression/college-park'],
    },
    keywords: ['depression treatment winter park', 'depression winter park', 'depression therapist winter park'],
  },
  {
    slug: 'depression-college-park',
    path: '/conditions/depression/college-park',
    title: 'Depression Treatment in College Park | Empathy Health Clinic',
    description: 'Depression support for College Park clients. Evaluation and therapy options with secure online visits available.',
    h1: 'Depression Treatment in College Park',
    pageType: 'condition-location',
    outline: [
      'Depression care for College Park residents',
      'Evaluation and treatment options',
      'Telehealth availability',
      'Getting started',
    ],
    faqs: [
      { question: 'Do you serve College Park?', answer: 'Yes, we serve College Park residents through our Winter Park office and convenient telehealth options.' },
      { question: 'Can I do appointments online?', answer: 'Yes, we offer secure telehealth appointments for depression care.' },
    ],
    internalLinks: {
      up: '/conditions/depression',
      cross: ['/conditions/depression/telepsychiatry'],
    },
    keywords: ['depression treatment college park', 'depression college park', 'depression therapist college park'],
  },
  {
    slug: 'bipolar-orlando',
    path: '/conditions/bipolar/orlando',
    title: 'Bipolar Disorder Treatment in Orlando | Empathy Health Clinic',
    description: 'Bipolar evaluation and ongoing support in Orlando with structured follow-up and therapy coordination options.',
    h1: 'Bipolar Disorder Treatment in Orlando',
    pageType: 'condition-location',
    outline: [
      'Bipolar care in Orlando',
      'Evaluation and ongoing monitoring',
      'Therapy support',
      'Online options',
    ],
    faqs: [
      { question: 'How is bipolar diagnosed?', answer: 'Bipolar diagnosis involves a comprehensive evaluation of your mood patterns, history, and symptoms. We look for patterns of mood episodes over time.' },
      { question: 'What should I track between visits?', answer: 'Tracking mood, sleep, energy levels, and any triggers helps us monitor your progress and adjust your care plan as needed.' },
    ],
    internalLinks: {
      up: '/conditions/bipolar',
      down: ['/conditions/bipolar/psychiatry', '/conditions/bipolar/therapy'],
    },
    keywords: ['bipolar treatment orlando', 'bipolar orlando', 'bipolar doctor orlando', 'bipolar specialist orlando'],
  },
  {
    slug: 'bipolar-altamonte-springs',
    path: '/conditions/bipolar/altamonte-springs',
    title: 'Bipolar Treatment in Altamonte Springs | Empathy Health Clinic',
    description: 'Bipolar support for Altamonte Springs clients with structured evaluation and secure telehealth options.',
    h1: 'Bipolar Disorder Treatment in Altamonte Springs',
    pageType: 'condition-location',
    outline: [
      'Bipolar care for Altamonte Springs residents',
      'Evaluation and monitoring',
      'Telehealth options',
      'Getting started',
    ],
    faqs: [
      { question: 'Do you serve Altamonte Springs?', answer: 'Yes, we serve Altamonte Springs residents through our Winter Park office and convenient telehealth options.' },
      { question: 'Can I do appointments online?', answer: 'Yes, we offer secure telehealth appointments for bipolar care.' },
    ],
    internalLinks: {
      up: '/conditions/bipolar',
      cross: ['/conditions/bipolar/psychiatry'],
    },
    keywords: ['bipolar treatment altamonte springs', 'bipolar altamonte springs', 'bipolar doctor altamonte springs'],
  },
  {
    slug: 'ocd-orlando',
    path: '/conditions/ocd/orlando',
    title: 'OCD Treatment in Orlando | Empathy Health Clinic',
    description: 'OCD evaluation and therapy support in Orlando. Learn what OCD looks like and how treatment can help.',
    h1: 'OCD Treatment in Orlando',
    pageType: 'condition-location',
    outline: [
      'OCD care in Orlando',
      'Evaluation process',
      'Therapy options',
      'Online options',
    ],
    faqs: [
      { question: 'Is this OCD or anxiety?', answer: 'OCD and anxiety can overlap, but OCD specifically involves obsessions and compulsions. An evaluation can help distinguish between them.' },
      { question: 'Can therapy be online?', answer: 'Yes, OCD therapy is highly effective through our telehealth platform.' },
    ],
    internalLinks: {
      up: '/conditions/ocd',
      down: ['/conditions/ocd/therapy', '/conditions/ocd/psychiatry'],
    },
    keywords: ['ocd treatment orlando', 'ocd orlando', 'ocd doctor orlando', 'ocd specialist orlando'],
  },
  {
    slug: 'ocd-winter-park',
    path: '/conditions/ocd/winter-park',
    title: 'OCD Treatment in Winter Park | Empathy Health Clinic',
    description: 'OCD support for Winter Park clients with evaluation and therapy options plus secure online visits.',
    h1: 'OCD Treatment in Winter Park',
    pageType: 'condition-location',
    outline: [
      'OCD care in Winter Park',
      'Evaluation and treatment options',
      'Therapy options',
      'Telehealth availability',
    ],
    faqs: [
      { question: 'Is this OCD or anxiety?', answer: 'We can help distinguish between OCD and anxiety through a comprehensive evaluation.' },
      { question: 'Can therapy be online?', answer: 'Yes, we offer secure telehealth appointments for OCD treatment.' },
    ],
    internalLinks: {
      up: '/conditions/ocd',
      siblings: ['/conditions/ocd/orlando'],
    },
    keywords: ['ocd treatment winter park', 'ocd winter park', 'ocd therapist winter park'],
  },
];

// C) INSURANCE × CONDITION PAGES (6 pages)
const insuranceConditionPages: ConditionPageConfig[] = [
  {
    slug: 'aetna-adhd',
    path: '/insurance/aetna/adhd',
    title: 'Aetna ADHD Coverage | Empathy Health Clinic',
    description: 'Learn how Aetna coverage may apply to ADHD evaluation and treatment. Steps to verify benefits and get started.',
    h1: 'Aetna Coverage for ADHD Treatment',
    pageType: 'insurance-condition',
    outline: [
      'What "coverage" usually means (no promises)',
      'What to ask Aetna (deductible, copay, telehealth)',
      'How we support verification',
      'Next steps to schedule',
    ],
    faqs: [
      { question: 'How do I verify my benefits?', answer: 'Call the number on your Aetna card and ask about mental health coverage, specifically for ADHD evaluation and treatment. Ask about deductibles, copays, and telehealth coverage.' },
      { question: 'Is telehealth covered?', answer: 'Many Aetna plans cover telehealth visits. Contact your plan directly to confirm your specific coverage for virtual ADHD care.' },
    ],
    internalLinks: {
      cross: ['/insurance', '/conditions/adhd'],
    },
    keywords: ['aetna adhd coverage', 'aetna adhd treatment', 'aetna mental health coverage adhd'],
  },
  {
    slug: 'aetna-anxiety',
    path: '/insurance/aetna/anxiety',
    title: 'Aetna Anxiety Coverage | Empathy Health Clinic',
    description: 'How Aetna may cover anxiety therapy or psychiatry visits. What to ask your plan and how to start care.',
    h1: 'Aetna Coverage for Anxiety Treatment',
    pageType: 'insurance-condition',
    outline: [
      'What coverage typically includes',
      'Questions to ask Aetna',
      'How we help with verification',
      'Getting started',
    ],
    faqs: [
      { question: 'How do I verify my benefits?', answer: 'Call your Aetna member services and ask about mental health coverage for anxiety treatment, including therapy and psychiatry visits.' },
      { question: 'Is telehealth covered?', answer: 'Most Aetna plans include telehealth coverage. Check with your specific plan for details about virtual anxiety care.' },
    ],
    internalLinks: {
      cross: ['/insurance', '/conditions/anxiety'],
    },
    keywords: ['aetna anxiety coverage', 'aetna anxiety treatment', 'aetna mental health coverage anxiety'],
  },
  {
    slug: 'blue-cross-adhd',
    path: '/insurance/blue-cross/adhd',
    title: 'Blue Cross ADHD Coverage | Empathy Health Clinic',
    description: 'Understand how Blue Cross plans may apply to ADHD care. Benefit-check steps and appointment options.',
    h1: 'Blue Cross Coverage for ADHD Treatment',
    pageType: 'insurance-condition',
    outline: [
      'Understanding BCBS coverage for ADHD',
      'Questions to ask Blue Cross',
      'How we support verification',
      'Scheduling your appointment',
    ],
    faqs: [
      { question: 'How do I verify my benefits?', answer: 'Call Blue Cross member services and inquire about mental health coverage, specifically for ADHD evaluation and ongoing treatment.' },
      { question: 'Is telehealth covered?', answer: 'Many Blue Cross plans cover telehealth mental health services. Contact your plan to confirm your coverage for virtual ADHD care.' },
    ],
    internalLinks: {
      cross: ['/insurance', '/conditions/adhd'],
    },
    keywords: ['blue cross adhd coverage', 'bcbs adhd treatment', 'blue cross mental health coverage'],
  },
  {
    slug: 'blue-cross-depression',
    path: '/insurance/blue-cross/depression',
    title: 'Blue Cross Depression Coverage | Empathy Health Clinic',
    description: 'How Blue Cross plans may apply to depression therapy or psychiatry visits. Steps to verify benefits.',
    h1: 'Blue Cross Coverage for Depression Treatment',
    pageType: 'insurance-condition',
    outline: [
      'Understanding BCBS coverage for depression',
      'Questions to ask Blue Cross',
      'Verification support',
      'Getting started',
    ],
    faqs: [
      { question: 'How do I verify my benefits?', answer: 'Contact Blue Cross member services to ask about your mental health coverage for depression treatment, including therapy and psychiatry visits.' },
      { question: 'Is telehealth covered?', answer: 'Most Blue Cross plans include telehealth coverage for mental health services. Verify with your specific plan.' },
    ],
    internalLinks: {
      cross: ['/insurance', '/conditions/depression'],
    },
    keywords: ['blue cross depression coverage', 'bcbs depression treatment', 'blue cross mental health coverage'],
  },
  {
    slug: 'cigna-anxiety',
    path: '/insurance/cigna/anxiety',
    title: 'Cigna Anxiety Coverage | Empathy Health Clinic',
    description: 'Learn what to ask your Cigna plan about anxiety care, telehealth, and therapy benefits before scheduling.',
    h1: 'Cigna Coverage for Anxiety Treatment',
    pageType: 'insurance-condition',
    outline: [
      'Understanding Cigna coverage for anxiety',
      'Questions to ask your plan',
      'How we help with verification',
      'Next steps',
    ],
    faqs: [
      { question: 'How do I verify my benefits?', answer: 'Call Cigna member services to ask about your mental health coverage for anxiety treatment, including therapy, psychiatry, and telehealth options.' },
      { question: 'Is telehealth covered?', answer: 'Many Cigna plans cover telehealth mental health services. Contact your plan to confirm coverage for virtual anxiety care.' },
    ],
    internalLinks: {
      cross: ['/insurance', '/conditions/anxiety'],
    },
    keywords: ['cigna anxiety coverage', 'cigna anxiety treatment', 'cigna mental health coverage'],
  },
  {
    slug: 'uhc-depression',
    path: '/insurance/uhc/depression',
    title: 'UHC Depression Coverage | Empathy Health Clinic',
    description: 'Steps to understand UHC coverage for depression care and telehealth options. Verify benefits and schedule.',
    h1: 'UHC Coverage for Depression Treatment',
    pageType: 'insurance-condition',
    outline: [
      'Understanding UHC coverage for depression',
      'Questions to ask UnitedHealthcare',
      'Verification support',
      'Getting started',
    ],
    faqs: [
      { question: 'How do I verify my benefits?', answer: 'Contact UnitedHealthcare member services to ask about mental health coverage for depression treatment, including therapy and psychiatry visits.' },
      { question: 'Is telehealth covered?', answer: 'Most UHC plans include telehealth coverage. Verify your specific coverage for virtual depression care with your plan.' },
    ],
    internalLinks: {
      cross: ['/insurance', '/conditions/depression'],
    },
    keywords: ['uhc depression coverage', 'unitedhealthcare depression treatment', 'uhc mental health coverage'],
  },
];

// D) COMPARISON PAGES (5 pages)
const comparisonPages: ConditionPageConfig[] = [
  {
    slug: 'psychiatry-vs-therapy',
    path: '/compare/psychiatry-vs-therapy',
    title: 'Psychiatry vs Therapy | Empathy Health Clinic',
    description: 'Not sure whether you need psychiatry or therapy? Learn differences, when each helps, and how to choose.',
    h1: 'Psychiatry vs Therapy: Which Should You Choose?',
    pageType: 'comparison',
    outline: [
      'The simplest difference',
      'When psychiatry is a better fit',
      'When therapy is a better fit',
      'When both help most',
      'How to decide in one appointment',
    ],
    faqs: [
      { question: 'Can I start with therapy first?', answer: 'Yes, many people start with therapy and add psychiatry if needed. Your therapist can help you determine if a psychiatric evaluation would be beneficial.' },
      { question: "What if I'm not sure what I need?", answer: "That's completely normal. Schedule an evaluation and we will help you understand your symptoms and recommend the best approach for your situation." },
    ],
    internalLinks: {
      cross: ['/conditions/anxiety', '/conditions/depression'],
    },
    keywords: ['psychiatry vs therapy', 'therapist vs psychiatrist', 'do i need therapy or psychiatry'],
  },
  {
    slug: 'telepsychiatry-vs-in-person',
    path: '/compare/telepsychiatry-vs-in-person',
    title: 'Telepsychiatry vs In-Person | Empathy Health Clinic',
    description: 'Compare telepsychiatry and in-person visits for convenience, privacy, and effectiveness. Choose the best fit.',
    h1: "Telepsychiatry vs In-Person: What's Best?",
    pageType: 'comparison',
    outline: [
      'Differences in experience',
      'Privacy and comfort',
      'Who telepsychiatry fits best',
      'Who in-person fits best',
      'How to start either way',
    ],
    faqs: [
      { question: 'Is telepsychiatry secure?', answer: 'Yes, our telepsychiatry platform is fully HIPAA-compliant with end-to-end encryption. Your sessions are private and secure.' },
      { question: 'Can I switch later?', answer: 'Absolutely. You can switch between telepsychiatry and in-person visits based on your preferences and needs.' },
    ],
    internalLinks: {
      cross: ['/conditions/anxiety/telepsychiatry', '/conditions/adhd/telepsychiatry'],
    },
    keywords: ['telepsychiatry vs in person', 'online psychiatry vs office visit', 'virtual psychiatry comparison'],
  },
  {
    slug: 'psychiatrist-vs-psychologist',
    path: '/compare/psychiatrist-vs-psychologist',
    title: 'Psychiatrist vs Psychologist | Empathy Health Clinic',
    description: 'Understand psychiatrist vs psychologist roles, training, and how to choose the right support for your needs.',
    h1: 'Psychiatrist vs Psychologist: Differences and When to See Each',
    pageType: 'comparison',
    outline: [
      'Roles and training',
      'Common reasons to see each',
      'How they can work together',
      'What to expect at first visit',
    ],
    faqs: [
      { question: 'Do I need a referral?', answer: 'No referral is required to see either a psychiatrist or psychologist at our clinic. You can contact us directly to schedule.' },
      { question: 'Can I see both?', answer: 'Yes, many people benefit from seeing both a psychiatrist and a psychologist or therapist. They work together to provide comprehensive care.' },
    ],
    internalLinks: {
      cross: ['/compare/psychiatry-vs-therapy'],
    },
    keywords: ['psychiatrist vs psychologist', 'difference between psychiatrist and psychologist', 'which doctor for mental health'],
  },
  {
    slug: 'online-psychiatry-vs-in-person',
    path: '/compare/online-psychiatry-vs-in-person',
    title: 'Online Psychiatry vs In-Person | Empathy Health Clinic',
    description: 'Decide between online and in-person psychiatry based on convenience, privacy, and clinical needs.',
    h1: 'Online Psychiatry vs In-Person: Pros, Cons, and Fit',
    pageType: 'comparison',
    outline: [
      'Core pros/cons',
      'Scheduling and follow-up',
      'Privacy and environment',
      'How to choose quickly',
    ],
    faqs: [
      { question: 'What tech do I need?', answer: 'You need a device with a camera and microphone (smartphone, tablet, or computer) and a stable internet connection. We will send you a link to join your session.' },
      { question: 'Is online care effective?', answer: 'Research shows online psychiatric care is just as effective as in-person care for most conditions. Many patients prefer the convenience and accessibility of online visits.' },
    ],
    internalLinks: {
      cross: ['/conditions/adhd/online-treatment', '/conditions/anxiety/online-treatment'],
    },
    keywords: ['online psychiatry vs in person', 'virtual psychiatry effectiveness', 'telehealth psychiatry comparison'],
  },
  {
    slug: 'therapy-vs-coaching',
    path: '/compare/therapy-vs-coaching',
    title: 'Therapy vs Coaching | Empathy Health Clinic',
    description: 'Therapy and coaching serve different needs. Learn the differences, when therapy is recommended, and next steps.',
    h1: 'Therapy vs Coaching: Which Support Is Right?',
    pageType: 'comparison',
    outline: [
      'Definitions',
      'Best fit scenarios',
      'Boundaries and safety',
      'How to decide',
    ],
    faqs: [
      { question: 'Can coaching replace therapy?', answer: 'Coaching is not a substitute for therapy when dealing with mental health conditions. If you have symptoms of anxiety, depression, or other conditions, therapy is the appropriate choice.' },
      { question: 'What if I\'m dealing with anxiety or depression?', answer: 'For anxiety, depression, or other mental health concerns, therapy is recommended. Our licensed therapists can provide evidence-based treatment tailored to your needs.' },
    ],
    internalLinks: {
      cross: ['/therapy'],
    },
    keywords: ['therapy vs coaching', 'life coach vs therapist', 'when to see a therapist'],
  },
];

// E) SYMPTOM PAGES (4 pages) - Bonus pages from the brief
const symptomPages: ConditionPageConfig[] = [
  {
    slug: 'cant-focus-at-work',
    path: '/symptoms/cant-focus-at-work',
    title: "Can't Focus at Work | Empathy Health Clinic",
    description: 'Trouble focusing at work can come from stress, ADHD, anxiety, or burnout. Learn patterns and next steps.',
    h1: "Can't Focus at Work? Common Causes and When to Get Help",
    pageType: 'symptom',
    outline: [
      'Common causes',
      'Self-check questions',
      'When to seek evaluation',
      'How we help (psychiatry/therapy)',
    ],
    faqs: [
      { question: 'Is this ADHD or stress?', answer: 'Both ADHD and stress can cause focus issues. ADHD is typically a lifelong pattern, while stress-related focus problems often have a clear trigger. An evaluation can help determine the cause.' },
      { question: 'How do I prepare for an evaluation?', answer: 'Think about when your focus problems started, what makes them worse or better, and how they affect your work and daily life. This information helps us understand your situation.' },
    ],
    internalLinks: {
      cross: ['/conditions/adhd', '/conditions/anxiety', '/conditions/adhd/psychiatry'],
    },
    keywords: ['cant focus at work', 'trouble concentrating', 'focus problems', 'adhd work issues'],
  },
  {
    slug: 'racing-thoughts-at-night',
    path: '/symptoms/racing-thoughts-at-night',
    title: 'Racing Thoughts at Night | Empathy Health Clinic',
    description: 'Nighttime racing thoughts can be linked to anxiety, stress, or mood changes. Learn strategies and when to seek help.',
    h1: 'Racing Thoughts at Night: Why It Happens and What Helps',
    pageType: 'symptom',
    outline: [
      'What racing thoughts feel like',
      'Common contributors',
      'Practical steps tonight',
      'When to get professional support',
    ],
    faqs: [
      { question: 'Why does it get worse at night?', answer: 'At night, without daily distractions, your mind has more space to process worries and thoughts. This is why anxiety often feels worse when trying to fall asleep.' },
      { question: 'When is it a sign of anxiety?', answer: 'If racing thoughts happen frequently, interfere with sleep, or are accompanied by worry and physical symptoms like a racing heart, it may indicate an anxiety condition worth evaluating.' },
    ],
    internalLinks: {
      cross: ['/conditions/anxiety', '/conditions/depression', '/conditions/anxiety/therapy'],
    },
    keywords: ['racing thoughts at night', 'cant sleep racing mind', 'anxiety at night', 'nighttime anxiety'],
  },
  {
    slug: 'panic-attacks',
    path: '/symptoms/panic-attacks',
    title: 'Panic Attacks: Symptoms and Help | Empathy Health Clinic',
    description: 'Panic attacks are intense and scary, but treatable. Learn symptoms, common triggers, and how to get support.',
    h1: 'Panic Attacks: Symptoms, Triggers, and When to Get Help',
    pageType: 'symptom',
    outline: [
      'What panic attacks are',
      'Common triggers',
      'Rule-outs and safety',
      'Treatment paths (therapy vs psychiatry)',
    ],
    faqs: [
      { question: 'How do I know it\'s a panic attack?', answer: 'Panic attacks typically involve sudden, intense fear with physical symptoms like racing heart, shortness of breath, sweating, and feeling like you might die or lose control. They usually peak within 10 minutes.' },
      { question: 'Should I go to urgent care?', answer: 'If you are unsure whether symptoms are a panic attack or a medical emergency (like a heart attack), seek medical attention. Once cleared, we can help you manage and prevent future panic attacks.' },
    ],
    internalLinks: {
      cross: ['/conditions/anxiety', '/conditions/anxiety/panic-attacks-treatment'],
    },
    keywords: ['panic attack symptoms', 'panic attack help', 'panic disorder', 'anxiety attack'],
  },
  {
    slug: 'feeling-burned-out',
    path: '/symptoms/feeling-burned-out',
    title: 'Feeling Burned Out | Empathy Health Clinic',
    description: 'Burnout can look like exhaustion, numbness, and low motivation. Learn next steps and when to get evaluated.',
    h1: 'Feeling Burned Out? Signs, Causes, and What to Do Next',
    pageType: 'symptom',
    outline: [
      'Signs of burnout',
      'Burnout vs depression',
      'Practical first steps',
      'When to seek professional help',
    ],
    faqs: [
      { question: 'Can burnout become depression?', answer: 'Yes, prolonged burnout can develop into clinical depression. Early intervention helps prevent this progression and supports recovery.' },
      { question: "What if I'm functioning but miserable?", answer: 'High-functioning burnout is real. Just because you are getting through the day does not mean you do not deserve support. Treatment can help you feel better, not just function.' },
    ],
    internalLinks: {
      cross: ['/conditions/depression/burnout-vs-depression', '/conditions/depression'],
    },
    keywords: ['feeling burned out', 'burnout symptoms', 'work burnout', 'burnout help'],
  },
];

// Export all configurations combined
export const allConditionPageConfigs: ConditionPageConfig[] = [
  ...conditionTreatmentPages,
  ...conditionLocationPages,
  ...insuranceConditionPages,
  ...comparisonPages,
  ...symptomPages,
];

// Helper function to get config by path
export function getConditionPageConfig(path: string): ConditionPageConfig | undefined {
  return allConditionPageConfigs.find(config => config.path === path);
}

// Helper function to get all paths for routing
export function getAllConditionPagePaths(): string[] {
  return allConditionPageConfigs.map(config => config.path);
}

// Export individual arrays for specific use cases
export {
  conditionTreatmentPages,
  conditionLocationPages,
  insuranceConditionPages,
  comparisonPages,
  symptomPages,
};
