/* Safety Detection Engine — Keyword-based detection for MVP
   Monitors for self-harm, suicide, abuse, panic, harassment patterns */

const CRISIS_PATTERNS = {
  selfHarm: {
    keywords: [
      'cut myself', 'cutting myself', 'hurt myself', 'harm myself',
      'self harm', 'self-harm', 'burn myself', 'hitting myself',
      'punish myself', 'starve myself', 'want to bleed'
    ],
    severity: 'critical',
    response: {
      type: 'selfHarm',
      message: 'We hear you, and we care about your safety.',
      helplines: [
        { name: 'KIRAN Mental Health Helpline', number: '1800-599-0019', available: '24/7, Free' },
        { name: 'Tele-MANAS', number: '14416', available: '24/7' },
      ],
      action: 'Would you like to talk to a Saathy Safety Moderator?'
    }
  },
  suicide: {
    keywords: [
      'kill myself', 'want to die', 'end my life', 'no reason to live',
      'better off dead', 'suicide', 'suicidal', 'end it all',
      'take my life', 'not worth living', 'jump off', 'hang myself',
      'overdose', 'slit my', 'don\'t want to be alive'
    ],
    severity: 'emergency',
    response: {
      type: 'suicide',
      message: 'Your life matters. Please reach out right now.',
      helplines: [
        { name: 'Emergency', number: '112', available: 'Immediate' },
        { name: 'KIRAN Mental Health Helpline', number: '1800-599-0019', available: '24/7, Free' },
        { name: 'Tele-MANAS', number: '14416 / 1800-891-4416', available: '24/7' },
      ],
      action: 'We are alerting a Saathy Safety team member now.'
    }
  },
  abuse: {
    keywords: [
      'being hit', 'hits me', 'beats me', 'abused', 'abusing me',
      'molested', 'raped', 'forced me', 'domestic violence',
      'sexually assault', 'touching me', 'threatens to kill',
      'locked me', 'won\'t let me leave'
    ],
    severity: 'critical',
    response: {
      type: 'abuse',
      message: 'You are not alone. What you are going through is not okay.',
      helplines: [
        { name: 'Emergency', number: '112', available: 'Immediate' },
        { name: 'Women Helpline', number: '181', available: '24/7' },
        { name: 'KIRAN Mental Health Helpline', number: '1800-599-0019', available: '24/7, Free' },
      ],
      action: 'Can you reach a trusted person near you? Would you like us to connect you with support?'
    }
  },
  panic: {
    keywords: [
      'panic attack', 'can\'t breathe', 'cannot breathe', 'heart racing',
      'going to faint', 'losing control', 'going crazy', 'losing my mind',
      'trembling', 'shaking uncontrollably', 'feel like dying',
      'walls closing in', 'everything is spinning'
    ],
    severity: 'high',
    response: {
      type: 'panic',
      message: 'Let\'s pause together. You are safe right now.',
      grounding: [
        'Take a slow breath in... hold for 4 counts... and breathe out slowly.',
        'Name 5 things you can see around you right now.',
        'Feel your feet on the ground. You are here. You are safe.',
      ],
      action: 'Would you like to connect with a Saathy Listener right now?'
    }
  },
  harassment: {
    keywords: [
      'threatening me', 'stalking me', 'harassing me', 'blackmail',
      'sharing my photos', 'revenge porn', 'cyberbullying',
      'death threat', 'will find you', 'i know where you live'
    ],
    severity: 'high',
    response: {
      type: 'harassment',
      message: 'This is not acceptable. You can report and block immediately.',
      action: 'report_block'
    }
  },
  financial: {
    keywords: [
      'send me money', 'pay me', 'transfer money', 'give me your account',
      'bank details', 'upi id', 'gpay me', 'paytm me'
    ],
    severity: 'medium',
    response: {
      type: 'financial',
      message: 'For your safety, financial transactions are not allowed on The Saathy.',
      action: 'flag_escalate'
    }
  },
  contactSharing: {
    keywords: [
      'my number is', 'call me at', 'whatsapp me', 'whatsapp number',
      'phone number', 'text me on', 'instagram id', 'add me on',
      'meet me', 'come to my', 'let\'s meet offline'
    ],
    severity: 'medium',
    response: {
      type: 'contactSharing',
      message: 'For your safety, sharing personal contact information is not allowed on The Saathy. All communication stays on-platform.',
      action: 'block_message'
    }
  }
};

export function detectSafetyRisk(message) {
  if (!message || typeof message !== 'string') return null;
  
  const lowerMessage = message.toLowerCase().trim();
  
  // Check each category in order of severity
  const priorityOrder = ['suicide', 'selfHarm', 'abuse', 'panic', 'harassment', 'financial', 'contactSharing'];
  
  for (const category of priorityOrder) {
    const pattern = CRISIS_PATTERNS[category];
    for (const keyword of pattern.keywords) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        return {
          category,
          severity: pattern.severity,
          matchedKeyword: keyword,
          response: pattern.response
        };
      }
    }
  }
  
  return null;
}

export function getHelplines() {
  return [
    { name: 'Emergency', number: '112', description: 'Police / Fire / Ambulance' },
    { name: 'Tele-MANAS Mental Health', number: '14416 / 1800-891-4416', description: 'Government mental health helpline' },
    { name: 'KIRAN Mental Health Helpline', number: '1800-599-0019', description: '24/7 free mental health support' },
    { name: 'Women Helpline', number: '181', description: 'Women in distress' },
    { name: 'Child Helpline', number: '1098', description: 'Children in distress' },
  ];
}

export function getGroundingExercise() {
  const exercises = [
    {
      title: 'Box Breathing',
      steps: [
        'Breathe in slowly for 4 counts...',
        'Hold your breath for 4 counts...',
        'Breathe out slowly for 4 counts...',
        'Hold for 4 counts...',
        'Repeat 3 more times.'
      ]
    },
    {
      title: '5-4-3-2-1 Grounding',
      steps: [
        'Name 5 things you can SEE around you.',
        'Name 4 things you can TOUCH.',
        'Name 3 things you can HEAR.',
        'Name 2 things you can SMELL.',
        'Name 1 thing you can TASTE.'
      ]
    },
    {
      title: 'Body Scan',
      steps: [
        'Feel your feet on the ground.',
        'Notice your hands — are they tense?',
        'Relax your shoulders away from your ears.',
        'Unclench your jaw.',
        'Take one slow, deep breath.'
      ]
    }
  ];
  
  return exercises[Math.floor(Math.random() * exercises.length)];
}
