/* Saathy AI Response Engine
   Uses free LLM APIs with fallback to pre-written responses */

const AI_SYSTEM_PROMPTS = {
  default: `You are Saathy, a warm and compassionate AI companion from India. You speak in simple, warm Hindi-influenced English. You are NOT a therapist, doctor, or crisis service. You listen deeply, reflect emotions back, ask gentle follow-up questions one at a time, and never rush or shame. At the end of sessions, suggest a "Tiny Action" — one small practical step. Never give medical advice. Never diagnose. Always be warm, human, and present.`,
  
  mentor: `You are Saathy in Mentor mode. You are a thoughtful, experienced guide who offers gentle wisdom. You share perspectives without being preachy. You use relatable Indian examples. Ask "What do you think about this?" instead of telling. Still warm, still Saathy.`,
  
  elder_sibling: `You are Saathy in Elder Sibling mode. You talk like a caring didi or bhaiya who genuinely understands. You use casual, warm language. You share what you'd do in their shoes. You tease gently sometimes. You always have their back. Still warm, still Saathy.`,
  
  future_self: `You are Saathy in Future Self mode. You speak as if you are the user's wiser, calmer future self writing back from 5 years ahead. You offer perspective and reassurance that this moment passes. Use phrases like "I remember when we went through this..." Still warm, still Saathy.`,
  
  interview_prep: `You are Saathy in Interview Prep mode. You act as a supportive interview coach. You ask common interview questions, give feedback on answers, and help build confidence. Be encouraging but honest. Help them practice introductions, behavioral questions, and salary discussions. Still warm, still Saathy.`,
  
  difficult_convo: `You are Saathy in Difficult Conversation Practice mode. Help the user rehearse tough conversations — with their boss, partner, parent, friend. Play the role they need you to play. Give feedback on tone and approach. Help them find their words. Still warm, still Saathy.`,
};

// Pre-written responses for when AI API is unavailable
const FALLBACK_RESPONSES = {
  greeting: [
    "Hello! I'm glad you're here. How are you feeling today? Take your time — there's no rush.",
    "Welcome to Saathy. I'm here to listen. What's on your mind today?",
    "Hey, it's nice to see you. How has your day been so far?",
    "I'm here for you. What would you like to talk about today?",
  ],
  emotional: [
    "I hear you. That sounds really heavy to carry. You don't have to hold all of that alone.",
    "Thank you for sharing that with me. It takes courage to say what you're feeling. I'm here.",
    "I can understand why you feel that way. Your feelings are completely valid.",
    "That sounds tough. Would you like to tell me more about what happened?",
    "You're not alone in feeling this way. Many people carry similar weight. Let's talk about it.",
  ],
  followup: [
    "How long have you been feeling this way?",
    "What does your day usually look like when this happens?",
    "Is there someone in your life who knows about this?",
    "What would feel even slightly better right now?",
    "Have you noticed any patterns — certain times or situations when this gets heavier?",
  ],
  supportive: [
    "You showed up today. That itself is something to be proud of.",
    "Remember, it's okay to not be okay sometimes. What matters is that you're here.",
    "One step at a time. You don't need to figure everything out right now.",
    "I believe in you. Even on the hard days, you're doing better than you think.",
  ],
  tinyAction: [
    "Here's your Tiny Action for today: Take 3 slow, deep breaths right now. Just 3. You've got this.",
    "Tiny Action: Before bed tonight, write down one thing that went okay today. Just one.",
    "Tiny Action: Step away from your screen for 5 minutes. Look outside. Notice something beautiful.",
    "Tiny Action: Send a simple 'thinking of you' message to someone you care about today.",
    "Tiny Action: Drink a full glass of water right now. Your body will thank you.",
  ],
};

function getRandomResponse(category) {
  const responses = FALLBACK_RESPONSES[category];
  return responses[Math.floor(Math.random() * responses.length)];
}

export async function getAIResponse(message, mode = 'default', conversationHistory = []) {
  // Try the environment variable first, then fallback to localStorage
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 
    (typeof window !== 'undefined' ? localStorage.getItem('saathy_ai_api_key') : null);
  
  if (apiKey) {
    try {
      const response = await callGeminiAPI(apiKey, message, mode, conversationHistory);
      if (response) return response;
    } catch (error) {
      console.warn('AI API call failed, using fallback responses:', error.message);
    }
  }
  
  // Fallback to pre-written responses
  return generateFallbackResponse(message, conversationHistory);
}

async function callGeminiAPI(apiKey, message, mode, history) {
  const systemPrompt = AI_SYSTEM_PROMPTS[mode] || AI_SYSTEM_PROMPTS.default;
  
  const contents = [
    {
      role: 'user',
      parts: [{ text: systemPrompt }]
    },
    {
      role: 'model',
      parts: [{ text: 'I understand. I am Saathy, and I will respond with warmth, empathy, and care. I will listen deeply, reflect emotions, and never rush or shame.' }]
    }
  ];
  
  // Add conversation history
  for (const msg of history.slice(-10)) {
    contents.push({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    });
  }
  
  // Add current message
  contents.push({
    role: 'user',
    parts: [{ text: message }]
  });
  
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 300,
          topP: 0.9,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
        ]
      })
    }
  );
  
  if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);
  
  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('No response from Gemini');
  
  return text;
}

function generateFallbackResponse(message, history) {
  const lower = message.toLowerCase();
  
  // Check if this is a greeting
  if (history.length <= 1 || /^(hi|hello|hey|namaste|hola|good morning|good evening)/.test(lower)) {
    return getRandomResponse('greeting');
  }
  
  // Check for emotional keywords
  const emotionalKeywords = ['lonely', 'sad', 'stressed', 'anxious', 'worried', 'scared', 'angry', 'frustrated', 'tired', 'exhausted', 'overwhelmed', 'depressed', 'hurt', 'pain', 'cry', 'crying', 'alone', 'helpless', 'hopeless', 'lost', 'confused', 'broken'];
  
  if (emotionalKeywords.some(k => lower.includes(k))) {
    // Reflect emotion + follow up
    return getRandomResponse('emotional') + '\n\n' + getRandomResponse('followup');
  }
  
  // Check for positive keywords
  const positiveKeywords = ['better', 'good', 'great', 'happy', 'grateful', 'thankful', 'improved', 'smile', 'progress'];
  
  if (positiveKeywords.some(k => lower.includes(k))) {
    return getRandomResponse('supportive');
  }
  
  // Check if conversation has been going for a while — offer tiny action
  if (history.length > 6) {
    return getRandomResponse('emotional') + '\n\n' + getRandomResponse('tinyAction');
  }
  
  // Default empathetic response
  return getRandomResponse('emotional');
}

export function getSessionEndMessage() {
  return getRandomResponse('tinyAction') + '\n\nWould you like to save a summary of this conversation to your Saathy Memory?';
}

export function getAIJournalReflection(entryText) {
  const lower = entryText.toLowerCase();
  
  if (lower.includes('work') || lower.includes('job') || lower.includes('boss') || lower.includes('office')) {
    return "I notice work comes up a lot in your writing. It sounds like it carries real weight for you. Would you like to explore what specifically about work feels heaviest right now?";
  }
  
  if (lower.includes('alone') || lower.includes('lonely') || lower.includes('no one')) {
    return "You've mentioned feeling alone. That takes courage to write down. Sometimes naming it is the first step toward shifting it. Would you like to talk about this with your Saathy?";
  }
  
  if (lower.includes('family') || lower.includes('parent') || lower.includes('mother') || lower.includes('father')) {
    return "Family can be both our greatest comfort and our deepest complexity. I can see this is important to you. Would you like to explore this further?";
  }
  
  return "Thank you for writing this. Putting your thoughts on paper is an act of self-care. I notice some strong emotions here. Would you like to reflect on any part of this?";
}

export function getWeeklySummary(pulseEntries, journalEntries) {
  const avgMood = pulseEntries.length > 0 
    ? (pulseEntries.reduce((sum, e) => sum + (e.mood || 3), 0) / pulseEntries.length).toFixed(1)
    : null;
  
  const avgLoneliness = pulseEntries.length > 0
    ? (pulseEntries.reduce((sum, e) => sum + (e.loneliness || 3), 0) / pulseEntries.length).toFixed(1)
    : null;
  
  return {
    daysCheckedIn: pulseEntries.length,
    averageMood: avgMood,
    averageLoneliness: avgLoneliness,
    journalEntries: journalEntries.length,
    summary: avgMood 
      ? `This week you checked in ${pulseEntries.length} times. Your average mood was ${avgMood}/5 and loneliness averaged ${avgLoneliness}/5. ${Number(avgLoneliness) >= 4 ? 'Your loneliness has been high — would you like to talk to a listener?' : 'Keep showing up for yourself.'}`
      : 'Start checking in daily to see your weekly patterns here.'
  };
}
