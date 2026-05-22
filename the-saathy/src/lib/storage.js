/* localStorage helpers for The Saathy MVP */

const PREFIX = 'saathy_';

export function getItem(key, defaultValue = null) {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(PREFIX + key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setItem(key, value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.warn('localStorage setItem failed:', e);
  }
}

export function removeItem(key) {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PREFIX + key);
}

export function clearAll() {
  if (typeof window === 'undefined') return;
  const keys = Object.keys(localStorage).filter(k => k.startsWith(PREFIX));
  keys.forEach(k => localStorage.removeItem(k));
}

/* User profile helpers */
export function getUser() {
  return getItem('user', null);
}

export function setUser(userData) {
  setItem('user', userData);
}

export function getConsents() {
  return getItem('consents', {
    rememberContext: false,
    sessionSummaries: false,
    voiceToText: false,
    listenerSummaryAccess: false,
    crisisSafetyReview: false,
    reminders: false,
  });
}

export function setConsents(consents) {
  setItem('consents', consents);
}

export function getMemoryItems() {
  return getItem('memory', []);
}

export function setMemoryItems(items) {
  setItem('memory', items);
}

export function addMemoryItem(item) {
  const items = getMemoryItems();
  items.push({
    id: Date.now().toString(),
    ...item,
    createdAt: new Date().toISOString(),
  });
  setMemoryItems(items);
  return items;
}

export function deleteMemoryItem(id) {
  const items = getMemoryItems().filter(i => i.id !== id);
  setMemoryItems(items);
  return items;
}

export function getJournalEntries() {
  return getItem('journal', []);
}

export function addJournalEntry(entry) {
  const entries = getJournalEntries();
  entries.unshift({
    id: Date.now().toString(),
    ...entry,
    createdAt: new Date().toISOString(),
  });
  setItem('journal', entries);
  return entries;
}

export function deleteJournalEntry(id) {
  const entries = getJournalEntries().filter(e => e.id !== id);
  setItem('journal', entries);
  return entries;
}

export function getPulseEntries() {
  return getItem('pulse', []);
}

export function addPulseEntry(entry) {
  const entries = getPulseEntries();
  entries.unshift({
    id: Date.now().toString(),
    ...entry,
    createdAt: new Date().toISOString(),
  });
  setItem('pulse', entries);
  return entries;
}

export function getPulseStreak() {
  const entries = getPulseEntries();
  if (entries.length === 0) return 0;
  
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < 30; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - i);
    const dateStr = checkDate.toISOString().split('T')[0];
    
    const hasEntry = entries.some(e => 
      e.createdAt && e.createdAt.split('T')[0] === dateStr
    );
    
    if (hasEntry) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  
  return streak;
}

export function getChatHistory() {
  return getItem('chatHistory', []);
}

export function addChatMessage(message) {
  const history = getChatHistory();
  history.push({
    id: Date.now().toString(),
    ...message,
    timestamp: new Date().toISOString(),
  });
  setItem('chatHistory', history);
  return history;
}

export function clearChatHistory() {
  setItem('chatHistory', []);
}

export function getShowingUpDays() {
  return getItem('showingUpDays', []);
}

export function markShowedUp() {
  const days = getShowingUpDays();
  const today = new Date().toISOString().split('T')[0];
  if (!days.includes(today)) {
    days.push(today);
    setItem('showingUpDays', days);
  }
  return days;
}
