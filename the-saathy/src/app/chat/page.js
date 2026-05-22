'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Mic, MicOff, Brain, X, Trash2, Pencil, Pause, AlertTriangle, Phone } from 'lucide-react';
import { getUser, getChatHistory, addChatMessage, clearChatHistory, getConsents, addMemoryItem, getMemoryItems, deleteMemoryItem } from '@/lib/storage';
import { getAIResponse, getSessionEndMessage } from '@/lib/aiResponses';
import { detectSafetyRisk, getHelplines, getGroundingExercise } from '@/lib/safety';
import { CHAT_MODES } from '@/lib/mockData';

export default function ChatPage() {
  const [user, setUserState] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('default');
  const [isTyping, setIsTyping] = useState(false);
  const [showMemory, setShowMemory] = useState(false);
  const [memoryItems, setMemItems] = useState([]);
  const [voiceActive, setVoiceActive] = useState(false);
  const [crisisAlert, setCrisisAlert] = useState(null);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const userData = getUser();
    if (!userData) { window.location.href = '/signup'; return; }
    setUserState(userData);
    const history = getChatHistory();
    setMessages(history);
    setMemItems(getMemoryItems());
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = { sender: 'user', text: input.trim() };
    
    // Safety check
    const risk = detectSafetyRisk(input);
    if (risk) {
      setCrisisAlert(risk);
    }
    
    const updatedMessages = addChatMessage(userMsg);
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getAIResponse(input.trim(), mode, updatedMessages);
      const aiMsg = { sender: 'ai', text: response };
      const finalMessages = addChatMessage(aiMsg);
      setMessages(finalMessages);
    } catch (err) {
      const errorMsg = { sender: 'ai', text: 'I\'m here for you. Could you say that again? I want to make sure I understand.' };
      const finalMessages = addChatMessage(errorMsg);
      setMessages(finalMessages);
    }
    
    setIsTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const deleteMemory = (id) => {
    const updated = deleteMemoryItem(id);
    setMemItems(updated);
  };

  if (!mounted) return null;

  const currentMode = CHAT_MODES.find(m => m.id === mode) || CHAT_MODES[0];

  return (
    <div style={{ background: 'var(--bg-warm)', height: '100vh', overflow: 'hidden' }}>
      {/* Header */}
      <nav className="navbar" id="chat-navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Link href="/dashboard" className="btn btn-icon btn-ghost" id="chat-back">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem' }}>
              Saathy AI
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--charcoal-muted)', display: 'block', marginTop: '-2px' }}>
              {currentMode.icon} {currentMode.label}
            </span>
          </div>
        </div>
        <div className="navbar-actions">
          <button className="btn btn-icon btn-ghost" onClick={() => setShowMemory(!showMemory)} id="btn-memory">
            <Brain size={20} />
          </button>
        </div>
      </nav>

      <div className="chat-wrapper">
        {/* Legal disclaimer */}
        <div className="chat-disclaimer" id="chat-disclaimer">
          Saathy AI is a compassionate companion, not a therapist, doctor, or crisis service. 
          If you are in immediate danger, please contact emergency services (112).
        </div>

        {/* Mode selector */}
        <div className="chat-mode-bar" id="chat-mode-bar">
          {CHAT_MODES.map(m => (
            <button key={m.id} className={`chat-mode-chip ${mode === m.id ? 'active' : ''}`}
              onClick={() => setMode(m.id)} id={`mode-${m.id}`}>
              {m.icon} {m.label}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="chat-messages" id="chat-messages">
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--charcoal-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: 'var(--space-3)' }}>💛</div>
              <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)', color: 'var(--charcoal)' }}>
                You showed up. That took courage.
              </h3>
              <p style={{ fontSize: '0.9rem' }}>
                You do not have to explain everything. Just tell Saathy how today felt.
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`chat-bubble ${msg.sender}`}>
              <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
              <div className="bubble-time">
                {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : ''}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-bubble ai">
              <div className="typing-indicator">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Voice indicator */}
        {voiceActive && (
          <div style={{ 
            padding: 'var(--space-2) var(--space-4)', 
            background: 'var(--danger-light)', 
            display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
            fontSize: '0.8rem', color: 'var(--danger)'
          }}>
            <Mic size={14} /> Voice active — listening...
          </div>
        )}

        {/* Input bar */}
        <div className="chat-input-bar" id="chat-input-bar">
          <button className={`btn btn-icon ${voiceActive ? 'btn-danger' : 'btn-ghost'}`}
            onClick={() => setVoiceActive(!voiceActive)} id="btn-voice">
            {voiceActive ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <input 
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tell Saathy how you feel..."
            id="chat-input"
          />
          <button className="btn btn-icon btn-primary" onClick={sendMessage} disabled={!input.trim() || isTyping} id="btn-send">
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Memory Panel */}
      {showMemory && (
        <>
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 199 }} onClick={() => setShowMemory(false)} />
          <div className="memory-panel" id="memory-panel">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)' }}>Saathy Memory</h3>
              <button className="btn btn-icon btn-ghost" onClick={() => setShowMemory(false)}>
                <X size={20} />
              </button>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-muted)', marginBottom: 'var(--space-4)' }}>
              What Saathy remembers about you. You can edit or delete anything.
            </p>

            {memoryItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 'var(--space-6)', color: 'var(--charcoal-muted)' }}>
                <Brain size={32} style={{ opacity: 0.3, marginBottom: 'var(--space-2)' }} />
                <p style={{ fontSize: '0.9rem' }}>No memories saved yet.</p>
                <p style={{ fontSize: '0.8rem' }}>Saathy will ask before saving anything.</p>
              </div>
            ) : (
              memoryItems.map(item => (
                <div className="memory-item" key={item.id}>
                  <div className="memory-item-type">{item.type || 'Note'}</div>
                  <div className="memory-item-text">{item.text}</div>
                  <div className="memory-item-actions">
                    <button className="btn btn-ghost btn-sm" style={{ padding: '2px 6px', fontSize: '0.75rem' }}>
                      <Pencil size={12} /> Edit
                    </button>
                    <button className="btn btn-ghost btn-sm" style={{ padding: '2px 6px', fontSize: '0.75rem', color: 'var(--danger)' }}
                      onClick={() => deleteMemory(item.id)}>
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              ))
            )}

            <button className="btn btn-outline btn-full" style={{ marginTop: 'var(--space-4)', fontSize: '0.85rem' }}>
              <Pause size={14} /> Pause Memory
            </button>
          </div>
        </>
      )}

      {/* Crisis Alert Modal */}
      {crisisAlert && (
        <div className="crisis-overlay" id="crisis-modal">
          <div className="crisis-modal">
            <div className="crisis-icon">
              <AlertTriangle size={32} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>
              {crisisAlert.response.message}
            </h2>
            
            {crisisAlert.response.helplines && (
              <div style={{ margin: 'var(--space-4) 0' }}>
                {crisisAlert.response.helplines.map((h, i) => (
                  <a key={i} href={`tel:${h.number.replace(/[^0-9]/g, '')}`}
                    className="card" style={{ 
                      display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                      marginBottom: 'var(--space-2)', textDecoration: 'none', color: 'inherit'
                    }}>
                    <Phone size={18} style={{ color: 'var(--danger)' }} />
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{h.name}</div>
                      <div style={{ fontSize: '1.1rem', color: 'var(--danger)', fontWeight: 700 }}>{h.number}</div>
                      {h.available && <div style={{ fontSize: '0.75rem', color: 'var(--charcoal-muted)' }}>{h.available}</div>}
                    </div>
                  </a>
                ))}
              </div>
            )}

            {crisisAlert.response.grounding && (
              <div className="card card-teal" style={{ margin: 'var(--space-4) 0', textAlign: 'left' }}>
                {crisisAlert.response.grounding.map((step, i) => (
                  <p key={i} style={{ fontSize: '0.9rem', marginBottom: 'var(--space-2)', color: 'var(--charcoal-soft)' }}>
                    {step}
                  </p>
                ))}
              </div>
            )}

            <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-soft)', marginBottom: 'var(--space-4)' }}>
              {crisisAlert.response.action}
            </p>
            
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexDirection: 'column' }}>
              <button className="btn btn-primary btn-full btn-pill" onClick={() => setCrisisAlert(null)}>
                I understand, continue talking
              </button>
              <Link href="/safety" className="btn btn-outline btn-full btn-pill">
                Go to Safety Resources
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
