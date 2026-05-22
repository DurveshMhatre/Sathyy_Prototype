/* Mock data for The Saathy MVP — simulated listeners, sessions, prompts */

export const MOCK_LISTENERS = [
  {
    id: 'L001',
    name: 'Priya M.',
    initials: 'PM',
    gender: 'Woman',
    languages: ['English', 'Hindi', 'Hinglish'],
    bio: 'Warm and patient listener with 3 years of experience. I believe everyone deserves to be heard without judgment.',
    available: true,
    nextAvailable: null,
    sessionsCompleted: 342,
    rating: 4.8,
  },
  {
    id: 'L002',
    name: 'Arjun S.',
    initials: 'AS',
    gender: 'Man',
    languages: ['English', 'Hindi'],
    bio: 'Former corporate professional who understands work stress deeply. I listen with empathy and patience.',
    available: true,
    nextAvailable: null,
    sessionsCompleted: 218,
    rating: 4.7,
  },
  {
    id: 'L003',
    name: 'Kavya R.',
    initials: 'KR',
    gender: 'Woman',
    languages: ['English', 'Hindi', 'Tamil'],
    bio: 'I create a safe space for you to share without fear. Trained in active listening and emotional support.',
    available: false,
    nextAvailable: '15 minutes',
    sessionsCompleted: 156,
    rating: 4.9,
  },
  {
    id: 'L004',
    name: 'Rohan K.',
    initials: 'RK',
    gender: 'Man',
    languages: ['English', 'Hinglish'],
    bio: 'Your feelings are valid, always. I am here to walk alongside you, not ahead of you.',
    available: true,
    nextAvailable: null,
    sessionsCompleted: 89,
    rating: 4.6,
  },
  {
    id: 'L005',
    name: 'Meera D.',
    initials: 'MD',
    gender: 'Woman',
    languages: ['English', 'Hindi', 'Marathi'],
    bio: 'I specialize in supporting people through transitions — new cities, new jobs, new phases of life.',
    available: false,
    nextAvailable: '30 minutes',
    sessionsCompleted: 201,
    rating: 4.8,
  }
];

export const DAILY_PROMPTS = [
  'What is one thing you wish someone understood about you today?',
  'What are you carrying right now that feels too heavy to hold alone?',
  'What would make tomorrow feel even slightly better?',
  'If you could tell someone how you really feel today, what would you say?',
  'What is something you did today that took courage, even if it was small?',
  'What moment today made you feel most like yourself?',
  'Is there something you have been avoiding thinking about?',
  'What would feel like a small win today?',
  'If Saathy could do one thing for you right now, what would it be?',
  'What do you need right now that you are not getting?',
  'How do you feel about the way today started?',
  'What is one kind thing you can do for yourself before today ends?',
  'If your feelings today had a weather, what would it be?',
  'What is the heaviest thought on your mind right now?',
  'Who made you feel seen today? If no one, know that Saathy sees you.',
];

export const MOOD_OPTIONS = [
  { emoji: '😞', label: 'Very low', value: 1 },
  { emoji: '😔', label: 'Low', value: 2 },
  { emoji: '😐', label: 'Okay', value: 3 },
  { emoji: '🙂', label: 'Good', value: 4 },
  { emoji: '😊', label: 'Very good', value: 5 },
];

export const MOOD_TAGS = [
  'Anxious', 'Lonely', 'Grateful', 'Overwhelmed', 'Hopeful',
  'Frustrated', 'Peaceful', 'Sad', 'Excited', 'Tired',
  'Confused', 'Loved', 'Angry', 'Motivated', 'Numb',
  'Nostalgic', 'Restless', 'Content', 'Scared', 'Proud'
];

export const ONBOARDING_REASONS = [
  'Feeling lonely',
  'Work stress',
  'Relationship difficulty',
  'Just want to talk',
  'Going through a hard time',
  'Something else'
];

export const EMOTIONAL_INTAKE_OPTIONS = [
  'I need to vent',
  'I want someone to listen',
  'I feel alone',
  'I want to understand myself better',
  'I\'m going through something hard'
];

export const CHAT_MODES = [
  { id: 'default', label: 'Compassionate Friend', icon: '💛', description: 'Warm, caring companion who listens with empathy' },
  { id: 'mentor', label: 'Mentor', icon: '🌟', description: 'Thoughtful guide offering gentle wisdom' },
  { id: 'elder_sibling', label: 'Elder Sibling', icon: '🤗', description: 'Like a caring didi or bhaiya who understands' },
  { id: 'future_self', label: 'Future Self', icon: '🔮', description: 'Your wiser, calmer future self' },
  { id: 'interview_prep', label: 'Interview Prep', icon: '💼', description: 'Practice job interviews with feedback' },
  { id: 'difficult_convo', label: 'Difficult Conversation', icon: '🗣️', description: 'Rehearse tough conversations safely' },
];

export const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 1,
    period: 'one-time',
    description: 'Try The Saathy for just ₹1',
    features: [
      'AI check-in conversation',
      'Basic journal access',
      'Limited Daily Pulse',
      'Safety resources (always free)',
    ],
    cta: 'Start with ₹1',
    featured: false,
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 199,
    period: '/month',
    description: 'Your daily emotional companion',
    features: [
      'Unlimited Saathy AI conversations',
      'Full journal with AI reflections',
      'Daily Pulse with pattern insights',
      'Saathy Memory continuity',
      'Safety resources (always free)',
    ],
    cta: 'Choose Basic',
    featured: false,
  },
  {
    id: 'listener',
    name: 'Listener Pack',
    price: 499,
    period: 'one-time',
    description: '60 minutes of human connection',
    features: [
      '60 minutes of listener sessions',
      'Chat, audio, or video format',
      'Session notes & summaries',
      'Everything in Basic plan',
      'Safety resources (always free)',
    ],
    cta: 'Get Listener Pack',
    featured: true,
  },
  {
    id: 'weekly',
    name: 'Weekly Saathy',
    price: 299,
    period: '/week',
    description: 'Fixed weekly listener support',
    features: [
      'Weekly scheduled listener session',
      'Same-listener continuity option',
      'Deep memory summaries',
      'Everything in Basic plan',
      'Safety resources (always free)',
    ],
    cta: 'Choose Weekly',
    featured: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 999,
    period: '/month',
    description: 'Complete Saathy experience',
    features: [
      'Unlimited AI + listener sessions',
      'Dedicated Saathy Anchor option',
      'Deep emotional memory & patterns',
      'Priority listener matching',
      'Weekly emotional summaries',
      'Safety resources (always free)',
    ],
    cta: 'Go Premium',
    featured: false,
  }
];

export const MOCK_SESSIONS = [
  { id: 'S001', date: '2025-05-20', type: 'AI Chat', duration: '15 min', listener: null, hasSummary: true },
  { id: 'S002', date: '2025-05-19', type: 'Listener Chat', duration: '30 min', listener: 'Priya M.', hasSummary: true },
  { id: 'S003', date: '2025-05-18', type: 'AI Chat', duration: '8 min', listener: null, hasSummary: false },
  { id: 'S004', date: '2025-05-17', type: 'Listener Audio', duration: '45 min', listener: 'Arjun S.', hasSummary: true },
  { id: 'S005', date: '2025-05-15', type: 'Daily Pulse', duration: '2 min', listener: null, hasSummary: false },
];

export const MOCK_SAFETY_FLAGS = [
  {
    id: 'F001',
    type: 'AI Detection',
    severity: 'critical',
    category: 'Self-harm language',
    userAlias: 'User_A847',
    message: '[Flagged content hidden for review]',
    timestamp: '2025-05-20T14:23:00Z',
    sessionType: 'AI Chat',
    status: 'pending',
    accountAge: '14 days',
  },
  {
    id: 'F002',
    type: 'User Report',
    severity: 'high',
    category: 'Harassment',
    userAlias: 'User_B291',
    message: 'User reported listener for inappropriate comments',
    timestamp: '2025-05-20T11:05:00Z',
    sessionType: 'Listener Chat',
    listenerName: 'Listener_X',
    status: 'pending',
    accountAge: '45 days',
  },
  {
    id: 'F003',
    type: 'AI Detection',
    severity: 'medium',
    category: 'Contact sharing attempt',
    userAlias: 'User_C104',
    message: '[Phone number detected and blocked]',
    timestamp: '2025-05-19T22:30:00Z',
    sessionType: 'Listener Chat',
    status: 'resolved',
    accountAge: '7 days',
    resolvedBy: 'Mod_Anika',
    resolvedAt: '2025-05-19T23:15:00Z',
  }
];

export const MOCK_GRIEVANCES = [
  {
    id: 'G001',
    subject: 'Listener was dismissive',
    description: 'During my session, the listener seemed distracted and kept giving generic advice.',
    status: 'under_review',
    submittedAt: '2025-05-19T10:00:00Z',
    userAlias: 'User_D562',
  },
  {
    id: 'G002',
    subject: 'Data deletion request',
    description: 'I want all my conversation data deleted permanently.',
    status: 'resolved',
    submittedAt: '2025-05-17T08:30:00Z',
    resolvedAt: '2025-05-18T14:00:00Z',
    userAlias: 'User_E890',
  }
];

export function getDailyPrompt() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return DAILY_PROMPTS[dayOfYear % DAILY_PROMPTS.length];
}

export function getGreeting(name) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : hour < 21 ? 'Good evening' : 'Hey';
  return `${greeting}, ${name || 'there'}`;
}

export function getTimeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}
