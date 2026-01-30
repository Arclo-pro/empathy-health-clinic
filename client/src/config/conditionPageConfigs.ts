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
  // PTSD condition-treatment pages
  {
    slug: 'ptsd-psychiatry',
    path: '/conditions/ptsd/psychiatry',
    title: 'PTSD Psychiatry in Orlando | Empathy Health Clinic',
    description: 'Trauma-informed psychiatric evaluation and PTSD treatment in Orlando. Evidence-based care with compassionate, structured support.',
    h1: 'PTSD Psychiatry in Orlando',
    pageType: 'condition-treatment',
    outline: [
      'What PTSD looks like in adults',
      'Trauma-informed psychiatric evaluation',
      'Treatment planning and approach',
      'When therapy is also recommended',
      'Telepsychiatry options for PTSD',
    ],
    faqs: [
      { question: 'How is PTSD diagnosed?', answer: 'PTSD diagnosis involves a comprehensive evaluation of your trauma history, current symptoms, and how they affect your daily life. We use evidence-based assessment tools in a safe, supportive environment.' },
      { question: 'Can PTSD develop years after a traumatic event?', answer: 'Yes, PTSD symptoms can emerge months or even years after a trauma. Life changes, stress, or new reminders can trigger symptoms that were previously manageable.' },
      { question: 'Do you offer EMDR for PTSD?', answer: 'Yes, we offer EMDR (Eye Movement Desensitization and Reprocessing) along with other evidence-based approaches for PTSD treatment.' },
    ],
    internalLinks: {
      up: '/conditions/ptsd',
      siblings: ['/conditions/ptsd/therapy'],
      down: ['/conditions/ptsd/orlando'],
    },
    keywords: ['ptsd psychiatry orlando', 'ptsd psychiatrist', 'ptsd evaluation', 'trauma treatment orlando'],
  },
  {
    slug: 'ptsd-therapy',
    path: '/conditions/ptsd/therapy',
    title: 'Therapy for PTSD in Orlando | Empathy Health Clinic',
    description: 'PTSD therapy in Orlando with evidence-based approaches including EMDR and trauma-focused CBT. In-person or online.',
    h1: 'Therapy for PTSD in Orlando',
    pageType: 'condition-treatment',
    outline: [
      'How therapy helps PTSD',
      'Evidence-based approaches we use',
      'What sessions look like',
      'Online therapy options for PTSD',
    ],
    faqs: [
      { question: 'What type of therapy works best for PTSD?', answer: 'Evidence-based therapies like EMDR and trauma-focused CBT have strong research support for PTSD. We work with you to find the approach that fits your needs and goals.' },
      { question: 'How long does PTSD therapy take?', answer: 'Treatment length varies by individual. Some clients see significant improvement within 8-16 sessions, while others benefit from longer-term support. We work at a pace that feels safe for you.' },
    ],
    internalLinks: {
      up: '/conditions/ptsd',
      siblings: ['/conditions/ptsd/psychiatry'],
      cross: ['/compare/psychiatry-vs-therapy'],
    },
    keywords: ['ptsd therapy orlando', 'trauma therapy', 'emdr therapy orlando', 'ptsd counseling'],
  },
  // Medication Management condition-treatment pages
  {
    slug: 'medication-management-psychiatry',
    path: '/conditions/medication-management/psychiatry',
    title: 'Psychiatric Medication Management in Orlando | Empathy Health Clinic',
    description: 'Expert psychiatric medication management in Orlando. Ongoing monitoring, dosage optimization, and coordinated care from board-certified psychiatrists.',
    h1: 'Psychiatric Medication Management in Orlando',
    pageType: 'condition-treatment',
    outline: [
      'What medication management includes',
      'How we approach medication decisions',
      'Ongoing monitoring and adjustments',
      'Coordinating with your care team',
      'Telehealth medication management',
    ],
    faqs: [
      { question: 'What conditions do you manage medications for?', answer: 'We provide medication management for ADHD, anxiety, depression, bipolar disorder, OCD, PTSD, insomnia, and other psychiatric conditions. Our psychiatrists create personalized medication plans for each patient.' },
      { question: 'How often will I have follow-up appointments?', answer: 'Initially, follow-ups are typically every 2-4 weeks to monitor your response. Once stable, appointments move to monthly or quarterly depending on your needs.' },
      { question: 'Can I do medication management via telehealth?', answer: 'Yes, medication management appointments work very well through our secure telehealth platform. Many patients prefer the convenience of virtual follow-ups.' },
    ],
    internalLinks: {
      up: '/conditions/medication-management',
      cross: ['/compare/psychiatry-vs-therapy', '/conditions/adhd/psychiatry'],
    },
    keywords: ['medication management orlando', 'psychiatric medication management', 'psychiatrist medication management orlando'],
  },
];

// B) CONDITION × LOCATION PAGES — Generated from city/condition matrix
// Covers all service-area cities × 7 conditions (ADHD, Anxiety, Depression, Bipolar, OCD, PTSD, Medication Management)

interface CityData {
  slug: string;
  name: string;
  isOfficeLocation: boolean; // true for Winter Park (our office)
  nearbyNote: string; // how we serve this city
}

interface ConditionData {
  slug: string;
  name: string;
  fullName: string; // e.g., "Bipolar Disorder" vs "Bipolar"
  descriptions: Record<string, string>; // city-type specific descriptions
  outlines: {
    office: string[];
    nearby: string[];
  };
  faqs: {
    general: FAQ[];
    remote: FAQ[];
  };
  treatmentLinks: string[];
  keywords: (city: string, citySlug: string) => string[];
}

const serviceCities: CityData[] = [
  { slug: 'orlando', name: 'Orlando', isOfficeLocation: false, nearbyNote: 'Our Winter Park office is centrally located to serve Orlando residents, with same-week telehealth also available.' },
  { slug: 'winter-park', name: 'Winter Park', isOfficeLocation: true, nearbyNote: 'Visit us at our Winter Park office at 2281 Lee Rd Suite 102, or connect through secure telehealth.' },
  { slug: 'lake-nona', name: 'Lake Nona', isOfficeLocation: false, nearbyNote: 'We serve Lake Nona residents through our Winter Park office and convenient telehealth appointments.' },
  { slug: 'maitland', name: 'Maitland', isOfficeLocation: false, nearbyNote: 'Maitland is just minutes from our Winter Park office, and telehealth appointments are also available.' },
  { slug: 'college-park', name: 'College Park', isOfficeLocation: false, nearbyNote: 'We serve College Park residents through our nearby Winter Park office and secure telehealth visits.' },
  { slug: 'altamonte-springs', name: 'Altamonte Springs', isOfficeLocation: false, nearbyNote: 'Altamonte Springs residents can visit our Winter Park office or connect through telehealth.' },
  { slug: 'casselberry', name: 'Casselberry', isOfficeLocation: false, nearbyNote: 'Casselberry is a short drive from our Winter Park clinic, and we also offer telehealth appointments.' },
  { slug: 'kissimmee', name: 'Kissimmee', isOfficeLocation: false, nearbyNote: 'We serve Kissimmee residents through telehealth and in-person visits at our Winter Park location.' },
  { slug: 'apopka', name: 'Apopka', isOfficeLocation: false, nearbyNote: 'Apopka residents can access care through our telehealth platform or visit our Winter Park office.' },
  { slug: 'longwood', name: 'Longwood', isOfficeLocation: false, nearbyNote: 'Longwood is close to our Winter Park office, and telehealth is available for added convenience.' },
  { slug: 'winter-garden', name: 'Winter Garden', isOfficeLocation: false, nearbyNote: 'We serve Winter Garden residents through telehealth and in-person visits at our Winter Park clinic.' },
  { slug: 'oviedo', name: 'Oviedo', isOfficeLocation: false, nearbyNote: 'Oviedo residents can connect through our telehealth platform or visit our Winter Park location.' },
  { slug: 'sanford', name: 'Sanford', isOfficeLocation: false, nearbyNote: 'We serve Sanford residents through convenient telehealth and in-person visits at our Winter Park office.' },
  { slug: 'lake-mary', name: 'Lake Mary', isOfficeLocation: false, nearbyNote: 'Lake Mary residents can access care through telehealth or at our Winter Park office location.' },
  { slug: 'downtown-orlando', name: 'Downtown Orlando', isOfficeLocation: false, nearbyNote: 'Downtown Orlando is a short drive from our Winter Park clinic, and telehealth is always available.' },
];

const conditionDefinitions: ConditionData[] = [
  {
    slug: 'adhd',
    name: 'ADHD',
    fullName: 'ADHD',
    descriptions: {
      office: 'Comprehensive ADHD evaluation and treatment at our Winter Park clinic. Personalized care plans with in-person and telehealth options.',
      nearby: 'ADHD evaluation and supportive care for {city} residents. Evidence-based treatment with in-person and telehealth flexibility.',
    },
    outlines: {
      office: ['ADHD care at our Winter Park clinic', 'Comprehensive evaluation process', 'Therapy and psychiatry options', 'Telehealth appointments available'],
      nearby: ['ADHD care for {city} residents', 'Evaluation and next steps', 'Therapy and psychiatry options', 'Telehealth and in-person flexibility'],
    },
    faqs: {
      general: [
        { question: 'Do you treat adult ADHD?', answer: 'Yes, we specialize in adult ADHD evaluation and treatment. Our team provides comprehensive care including evaluation, therapy, and ongoing support.' },
        { question: 'What does an ADHD evaluation involve?', answer: 'An ADHD evaluation includes a detailed discussion of your symptoms, history, and daily challenges. We use evidence-based assessment tools to provide an accurate diagnosis and personalized treatment plan.' },
      ],
      remote: [
        { question: 'Do you serve {city}?', answer: 'Yes, we serve {city} residents through our Winter Park office and convenient telehealth appointments.' },
        { question: 'Can I start ADHD care online?', answer: 'Yes, you can begin your ADHD evaluation and treatment entirely through our secure telehealth platform from {city}.' },
      ],
    },
    treatmentLinks: ['/conditions/adhd/psychiatry', '/conditions/adhd/therapy', '/conditions/adhd/telepsychiatry'],
    keywords: (city, citySlug) => [`adhd treatment ${citySlug.replace(/-/g, ' ')}`, `adhd ${citySlug.replace(/-/g, ' ')}`, `adhd doctor ${citySlug.replace(/-/g, ' ')}`, `adhd specialist ${city.toLowerCase()}`],
  },
  {
    slug: 'anxiety',
    name: 'Anxiety',
    fullName: 'Anxiety',
    descriptions: {
      office: 'Anxiety treatment at our Winter Park clinic including therapy, psychiatry, and panic disorder support. Same-week appointments available.',
      nearby: 'Anxiety care for {city} residents with therapy and psychiatry options. Support for worry, panic symptoms, and overwhelm.',
    },
    outlines: {
      office: ['Anxiety care at our Winter Park clinic', 'Therapy vs psychiatry for anxiety', 'Panic symptom support', 'Telehealth and in-person options'],
      nearby: ['Anxiety care for {city} residents', 'Therapy and psychiatry options', 'Panic and overwhelm support', 'Telehealth availability'],
    },
    faqs: {
      general: [
        { question: 'Do you help with panic attacks?', answer: 'Yes, we specialize in treating panic attacks and panic disorder. Our team provides comprehensive anxiety and panic care with therapy and psychiatry options.' },
        { question: 'What types of anxiety do you treat?', answer: 'We treat generalized anxiety, social anxiety, panic disorder, health anxiety, and other anxiety-related conditions. An evaluation helps determine the best approach for your symptoms.' },
      ],
      remote: [
        { question: 'Do you serve {city}?', answer: 'Yes, we serve {city} residents through our Winter Park office and secure telehealth appointments for anxiety care.' },
        { question: 'Is online anxiety treatment available?', answer: 'Yes, we offer telepsychiatry and online therapy for {city} residents who prefer virtual appointments.' },
      ],
    },
    treatmentLinks: ['/conditions/anxiety/therapy', '/conditions/anxiety/psychiatry', '/conditions/anxiety/telepsychiatry'],
    keywords: (city, citySlug) => [`anxiety treatment ${citySlug.replace(/-/g, ' ')}`, `anxiety ${citySlug.replace(/-/g, ' ')}`, `anxiety doctor ${citySlug.replace(/-/g, ' ')}`, `anxiety therapist ${city.toLowerCase()}`],
  },
  {
    slug: 'depression',
    name: 'Depression',
    fullName: 'Depression',
    descriptions: {
      office: 'Depression treatment at our Winter Park clinic with therapy and psychiatry options. Compassionate care and clear next steps.',
      nearby: 'Depression support for {city} residents with therapy and psychiatry options. Compassionate evaluation and flexible scheduling.',
    },
    outlines: {
      office: ['Depression care at our Winter Park clinic', 'Burnout vs depression', 'Therapy and psychiatry pathways', 'Online appointment options'],
      nearby: ['Depression care for {city} residents', 'Recognizing depression vs burnout', 'Treatment options available', 'Telehealth and in-person flexibility'],
    },
    faqs: {
      general: [
        { question: "How do I know if it's depression?", answer: 'Persistent sadness, loss of interest in activities, changes in sleep or appetite, and difficulty functioning are common signs. An evaluation can help clarify your symptoms and guide treatment.' },
        { question: 'Can I start with therapy?', answer: 'Yes, therapy is often an excellent starting point for depression treatment. You can add other approaches as needed based on your progress.' },
      ],
      remote: [
        { question: 'Do you serve {city}?', answer: 'Yes, we serve {city} residents through our Winter Park office and convenient telehealth options for depression care.' },
        { question: 'Can I do depression treatment online?', answer: 'Yes, we offer secure telehealth appointments for depression evaluation and ongoing care from {city}.' },
      ],
    },
    treatmentLinks: ['/conditions/depression/therapy', '/conditions/depression/psychiatry', '/conditions/depression/telepsychiatry'],
    keywords: (city, citySlug) => [`depression treatment ${citySlug.replace(/-/g, ' ')}`, `depression ${citySlug.replace(/-/g, ' ')}`, `depression doctor ${citySlug.replace(/-/g, ' ')}`, `depression therapist ${city.toLowerCase()}`],
  },
  {
    slug: 'bipolar',
    name: 'Bipolar',
    fullName: 'Bipolar Disorder',
    descriptions: {
      office: 'Bipolar disorder evaluation and ongoing psychiatry support at our Winter Park clinic. Structured care plans and consistent follow-up.',
      nearby: 'Bipolar disorder support for {city} residents with structured evaluation, ongoing monitoring, and telehealth options.',
    },
    outlines: {
      office: ['Bipolar care at our Winter Park clinic', 'Evaluation and ongoing monitoring', 'Therapy coordination', 'Telehealth follow-up options'],
      nearby: ['Bipolar care for {city} residents', 'Evaluation and monitoring', 'Treatment coordination options', 'Telehealth availability'],
    },
    faqs: {
      general: [
        { question: 'How is bipolar disorder diagnosed?', answer: 'Bipolar diagnosis involves a comprehensive evaluation of your mood patterns, history, and symptoms. We look for patterns of mood episodes and their impact on your life.' },
        { question: 'What should I track between visits?', answer: 'Tracking mood, sleep, energy levels, and any triggers helps us monitor your progress and adjust your care plan as needed.' },
      ],
      remote: [
        { question: 'Do you serve {city}?', answer: 'Yes, we serve {city} residents through our Winter Park office and convenient telehealth options for bipolar care.' },
        { question: 'Can I do bipolar treatment online?', answer: 'Yes, we offer secure telehealth appointments for bipolar evaluation and ongoing monitoring from {city}.' },
      ],
    },
    treatmentLinks: ['/conditions/bipolar/psychiatry', '/conditions/bipolar/therapy'],
    keywords: (city, citySlug) => [`bipolar treatment ${citySlug.replace(/-/g, ' ')}`, `bipolar ${citySlug.replace(/-/g, ' ')}`, `bipolar doctor ${citySlug.replace(/-/g, ' ')}`, `bipolar specialist ${city.toLowerCase()}`],
  },
  {
    slug: 'ocd',
    name: 'OCD',
    fullName: 'OCD',
    descriptions: {
      office: 'OCD evaluation and therapy at our Winter Park clinic. Structured treatment plans for obsessions, compulsions, and related symptoms.',
      nearby: 'OCD evaluation and therapy support for {city} residents. Learn what OCD looks like and how structured treatment helps.',
    },
    outlines: {
      office: ['OCD care at our Winter Park clinic', 'Evaluation process', 'Therapy-focused treatment', 'Telehealth options available'],
      nearby: ['OCD care for {city} residents', 'Evaluation process', 'Therapy options', 'Telehealth availability'],
    },
    faqs: {
      general: [
        { question: 'Is this OCD or anxiety?', answer: 'OCD and anxiety can overlap, but OCD specifically involves obsessions (intrusive thoughts) and compulsions (repetitive behaviors). An evaluation can help distinguish between them.' },
        { question: 'How effective is OCD treatment?', answer: 'OCD treatment is highly effective. Many clients see significant improvement with structured therapy, and our team creates personalized plans for each individual.' },
      ],
      remote: [
        { question: 'Do you serve {city}?', answer: 'Yes, we serve {city} residents through our Winter Park office and secure telehealth appointments for OCD care.' },
        { question: 'Can OCD therapy be done online?', answer: 'Yes, OCD therapy is highly effective through our secure telehealth platform for {city} residents.' },
      ],
    },
    treatmentLinks: ['/conditions/ocd/therapy', '/conditions/ocd/psychiatry'],
    keywords: (city, citySlug) => [`ocd treatment ${citySlug.replace(/-/g, ' ')}`, `ocd ${citySlug.replace(/-/g, ' ')}`, `ocd doctor ${citySlug.replace(/-/g, ' ')}`, `ocd therapist ${city.toLowerCase()}`],
  },
  {
    slug: 'ptsd',
    name: 'PTSD',
    fullName: 'PTSD',
    descriptions: {
      office: 'PTSD evaluation and trauma-informed treatment at our Winter Park clinic. Evidence-based care with therapy and psychiatry options.',
      nearby: 'PTSD treatment for {city} residents with trauma-informed evaluation, therapy, and psychiatry support.',
    },
    outlines: {
      office: ['PTSD care at our Winter Park clinic', 'Trauma-informed evaluation process', 'Therapy and psychiatry options', 'Telehealth appointments available'],
      nearby: ['PTSD care for {city} residents', 'Trauma-informed evaluation', 'Therapy and psychiatry options', 'Telehealth and in-person flexibility'],
    },
    faqs: {
      general: [
        { question: 'What does PTSD treatment involve?', answer: 'PTSD treatment typically includes a comprehensive evaluation followed by evidence-based therapy approaches. We create personalized treatment plans that address your specific trauma history and symptoms.' },
        { question: 'Do I need a formal diagnosis to start?', answer: 'No, you do not need a prior diagnosis. We can evaluate your symptoms during your first appointment and determine the best treatment approach for your situation.' },
      ],
      remote: [
        { question: 'Do you serve {city}?', answer: 'Yes, we serve {city} residents through our Winter Park office and secure telehealth appointments for PTSD care.' },
        { question: 'Can PTSD treatment be done online?', answer: 'Yes, many aspects of PTSD treatment can be effectively delivered through our secure telehealth platform for {city} residents.' },
      ],
    },
    treatmentLinks: ['/conditions/ptsd/psychiatry', '/conditions/ptsd/therapy'],
    keywords: (city, citySlug) => [`ptsd treatment ${citySlug.replace(/-/g, ' ')}`, `ptsd ${citySlug.replace(/-/g, ' ')}`, `ptsd doctor ${citySlug.replace(/-/g, ' ')}`, `trauma therapist ${city.toLowerCase()}`],
  },
  {
    slug: 'medication-management',
    name: 'Medication Management',
    fullName: 'Medication Management',
    descriptions: {
      office: 'Psychiatric medication management at our Winter Park clinic. Ongoing monitoring, dosage adjustments, and coordinated care with your treatment team.',
      nearby: 'Medication management for {city} residents with ongoing psychiatric monitoring, dosage adjustments, and coordinated care.',
    },
    outlines: {
      office: ['Medication management at our Winter Park clinic', 'What medication management includes', 'Ongoing monitoring and adjustments', 'Telehealth follow-up options'],
      nearby: ['Medication management for {city} residents', 'What to expect from medication management', 'Ongoing monitoring and adjustments', 'Telehealth and in-person flexibility'],
    },
    faqs: {
      general: [
        { question: 'What is psychiatric medication management?', answer: 'Medication management involves working with a psychiatrist to find the right medication and dosage for your condition. It includes regular follow-up appointments to monitor effectiveness, adjust dosages, and manage any side effects.' },
        { question: 'How often are medication management appointments?', answer: 'Initially, appointments may be every 2-4 weeks as we find the right approach. Once stabilized, follow-up visits are typically monthly or quarterly depending on your needs.' },
      ],
      remote: [
        { question: 'Do you serve {city}?', answer: 'Yes, we serve {city} residents through our Winter Park office and convenient telehealth appointments for medication management.' },
        { question: 'Can medication management be done via telehealth?', answer: 'Yes, medication management appointments work well through our secure telehealth platform, making it convenient for {city} residents.' },
      ],
    },
    treatmentLinks: ['/conditions/medication-management/psychiatry'],
    keywords: (city, citySlug) => [`medication management ${citySlug.replace(/-/g, ' ')}`, `psychiatric medication ${citySlug.replace(/-/g, ' ')}`, `psychiatrist medication management ${city.toLowerCase()}`],
  },
];

function generateConditionLocationPages(): ConditionPageConfig[] {
  const pages: ConditionPageConfig[] = [];

  for (const condition of conditionDefinitions) {
    const citySlugs = serviceCities.map(c => c.slug);

    for (const city of serviceCities) {
      const slug = `${condition.slug}-${city.slug}`;
      const path = `/conditions/${condition.slug}/${city.slug}`;

      const descTemplate = city.isOfficeLocation ? condition.descriptions.office : condition.descriptions.nearby;
      const description = descTemplate.replace(/\{city\}/g, city.name);

      const outlineTemplate = city.isOfficeLocation ? condition.outlines.office : condition.outlines.nearby;
      const outline = outlineTemplate.map(item => item.replace(/\{city\}/g, city.name));

      const faqs = [
        ...condition.faqs.general,
        ...(city.isOfficeLocation ? [] : condition.faqs.remote.map(faq => ({
          question: faq.question.replace(/\{city\}/g, city.name),
          answer: faq.answer.replace(/\{city\}/g, city.name),
        }))),
      ];

      // Build sibling links (other cities for same condition, max 4)
      const siblingCities = citySlugs.filter(s => s !== city.slug).slice(0, 4);
      const siblings = siblingCities.map(s => `/conditions/${condition.slug}/${s}`);

      const titleName = condition.fullName === 'Bipolar Disorder'
        ? `Bipolar Disorder Treatment in ${city.name}`
        : `${condition.name} Treatment in ${city.name}`;

      pages.push({
        slug,
        path,
        title: `${titleName} | Empathy Health Clinic`,
        description,
        h1: titleName,
        pageType: 'condition-location',
        outline,
        faqs,
        internalLinks: {
          up: `/conditions/${condition.slug}`,
          siblings,
          down: condition.treatmentLinks,
        },
        keywords: condition.keywords(city.name, city.slug),
      });
    }
  }

  return pages;
}

const conditionLocationPages: ConditionPageConfig[] = generateConditionLocationPages();

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
