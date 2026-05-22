'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, AlertTriangle, Flag, Ban, Clock } from 'lucide-react';
import { detectSafetyRisk } from '@/lib/safety';

export default function ListenerChatSession() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [timer, setTimer] = useState(0);
  const [blocked, setBlocked] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    // Simulated listener greeting
    setTimeout(() => {
      setMessages([{ sender: 'listener', text: 'Hi there! Thank you for reaching out. I\'m here to listen. Take your time — there\'s no rush. How are you feeling today?', time: new Date() }]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const formatTime = (s) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  const sendMessage = () => {
    if (!input.trim()) return;
    // Contact sharing detection
    const risk = detectSafetyRisk(input);
    if (risk && risk.category === 'contactSharing') {
      setBlocked(risk.response.message);
      setInput('');
      setTimeout(() => setBlocked(''), 5000);
      return;
    }
    setMessages(prev => [...prev, { sender: 'user', text: input.trim(), time: new Date() }]);
    setInput('');
    // Simulated listener response
    setTimeout(() => {
      const responses = [
        'I hear you. That sounds really difficult. Can you tell me more about what happened?',
        'Thank you for sharing that with me. It takes courage. I\'m here.',
        'I can understand why you\'d feel that way. You\'re not alone in this.',
        'That must be really tough. What would help you feel even slightly better right now?',
      ];
      setMessages(prev => [...prev, { sender: 'listener', text: responses[Math.floor(Math.random() * responses.length)], time: new Date() }]);
    }, 2000 + Math.random() * 3000);
  };

  return (
    <div style={{ background: 'var(--bg-warm)', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <nav className="navbar" id="session-chat-navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Link href="/dashboard" className="btn btn-icon btn-ghost"><ArrowLeft size={20} /></Link>
          <div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.95rem' }}>Listener Session</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--charcoal-muted)' }}>
              <Clock size={10} /> {formatTime(timer)}
            </span>
          </div>
        </div>
        <div className="navbar-actions">
          <button className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>
            <Flag size={14} /> Report
          </button>
          <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.8rem' }}>
            <Ban size={14} /> Block
          </button>
        </div>
      </nav>

      <div className="chat-wrapper">
        <div className="chat-disclaimer">
          All communication stays on-platform. Sharing personal contact information is not allowed.
        </div>

        {blocked && (
          <div style={{ padding: 'var(--space-2) var(--space-4)', background: 'var(--danger-light)', fontSize: '0.85rem', color: 'var(--danger)', textAlign: 'center' }}>
            ⚠️ {blocked}
          </div>
        )}

        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'ai'}`}>
              {msg.text}
              <div className="bubble-time">{msg.time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-bar">
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..." id="listener-chat-input" />
          <button className="btn btn-icon btn-primary" onClick={sendMessage} disabled={!input.trim()}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
