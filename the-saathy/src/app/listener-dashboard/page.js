'use client';
import { useState } from 'react';
import { Users, MessageSquare, AlertTriangle, Clock, Check, Eye, ChevronRight, Phone, Video, Brain, LogOut } from 'lucide-react';

const MOCK_QUEUE = [
  { id: 'Q1', alias: 'User_A847', format: 'chat', intent: 'Feeling overwhelmed with work stress and isolation', hasMemory: true, waiting: '2 min' },
  { id: 'Q2', alias: 'User_C291', format: 'audio', intent: 'Going through a breakup, needs to talk', hasMemory: false, waiting: '5 min' },
  { id: 'Q3', alias: 'User_D104', format: 'video', intent: 'First session — feeling lonely after moving to new city', hasMemory: true, waiting: '1 min' },
];

const MOCK_MEMORY_SUMMARY = [
  { type: 'Current Concern', text: 'User is feeling isolated after moving to Pune for work.' },
  { type: 'Emotional Pattern', text: 'Loneliness increases at night, especially weekends.' },
  { type: 'Support Preference', text: 'Prefers gentle listening, not advice. Likes when listener asks follow-ups.' },
  { type: 'Boundary', text: 'Does not want family discussion unless they bring it up first.' },
  { type: 'Follow-up', text: 'Ask about job interview stress in next session.' },
];

export default function ListenerDashboard() {
  const [activeTab, setActiveTab] = useState('queue');
  const [activeSession, setActiveSession] = useState(null);
  const [sessionNote, setSessionNote] = useState('');
  const [showMemory, setShowMemory] = useState(false);

  const startSession = (item) => {
    setActiveSession(item);
    setActiveTab('session');
  };

  return (
    <div className="internal-layout" id="listener-dashboard">
      {/* Sidebar */}
      <aside className="internal-sidebar">
        <div className="internal-sidebar-logo">
          <div style={{ width: 28, height: 28, borderRadius: 'var(--radius-sm)', background: 'var(--saffron)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem', fontWeight: 700 }}>S</div>
          Saathy Listener
        </div>

        <nav>
          {[
            { id: 'queue', icon: Users, label: 'Session Queue' },
            { id: 'session', icon: MessageSquare, label: 'Active Session' },
            { id: 'history', icon: Clock, label: 'Past Sessions' },
          ].map(item => (
            <div key={item.id} className={`internal-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}>
              <item.icon size={18} /> {item.label}
            </div>
          ))}
        </nav>

        <div style={{ position: 'absolute', bottom: 'var(--space-6)', left: 'var(--space-6)', right: 'var(--space-6)' }}>
          <div
            className="internal-nav-item"
            style={{ color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}
            onClick={() => window.location.href = '/internal'}
          >
            <LogOut size={18} /> Exit Dashboard
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="internal-main">
        {activeTab === 'queue' && (
          <div id="listener-queue">
            <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>Incoming Sessions</h2>
            <p style={{ color: 'var(--charcoal-soft)', marginBottom: 'var(--space-4)', fontSize: '0.9rem' }}>
              {MOCK_QUEUE.length} users waiting for support
            </p>

            <div className="flex flex-col gap-3">
              {MOCK_QUEUE.map(item => (
                <div className="queue-item" key={item.id}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.alias}</span>
                      <span className="badge badge-muted">
                        {item.format === 'chat' ? <MessageSquare size={10} /> : item.format === 'audio' ? <Phone size={10} /> : <Video size={10} />}
                        {' '}{item.format}
                      </span>
                      {item.hasMemory && <span className="badge badge-teal"><Brain size={10} /> Memory</span>}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-soft)' }}>{item.intent}</p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--charcoal-muted)' }}>
                      <Clock size={10} style={{ display: 'inline' }} /> Waiting {item.waiting}
                    </span>
                  </div>
                  <button className="btn btn-primary btn-sm btn-pill" onClick={() => startSession(item)}>
                    Accept
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'session' && !activeSession && (
          <div id="no-active-session" style={{ textAlign: 'center', padding: 'var(--space-12) var(--space-4)', color: 'var(--charcoal-muted)' }}>
            <MessageSquare size={48} style={{ opacity: 0.2, marginBottom: 'var(--space-4)' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)', color: 'var(--charcoal-soft)' }}>
              No active session
            </h3>
            <p style={{ fontSize: '0.9rem', marginBottom: 'var(--space-4)' }}>
              Accept a session from the queue to start supporting a user.
            </p>
            <button className="btn btn-primary btn-pill" onClick={() => setActiveTab('queue')}>
              View Session Queue
            </button>
          </div>
        )}

        {activeTab === 'session' && activeSession && (
          <div id="active-session">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-1)' }}>Session with {activeSession.alias}</h2>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <span className="badge badge-success">In progress</span>
                  <span className="badge badge-muted">{activeSession.format}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                {activeSession.hasMemory && (
                  <button className="btn btn-outline btn-sm" onClick={() => setShowMemory(!showMemory)}>
                    <Brain size={14} /> {showMemory ? 'Hide' : 'View'} Memory
                  </button>
                )}
                <button className="btn btn-danger btn-sm">
                  <AlertTriangle size={14} /> Escalate
                </button>
              </div>
            </div>

            {/* Memory Summary */}
            {showMemory && (
              <div className="card card-teal" style={{ marginBottom: 'var(--space-4)' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-3)' }}>
                  <Brain size={16} style={{ display: 'inline', marginRight: '4px' }} /> Approved Memory Summary
                </h4>
                {MOCK_MEMORY_SUMMARY.map((item, i) => (
                  <div key={i} style={{ marginBottom: 'var(--space-2)' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--teal)', textTransform: 'uppercase' }}>{item.type}</span>
                    <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-soft)' }}>{item.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Chat simulation area */}
            <div className="card" style={{ minHeight: '300px', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--charcoal-muted)' }}>
              <div style={{ textAlign: 'center' }}>
                <MessageSquare size={32} style={{ opacity: 0.3, marginBottom: 'var(--space-2)' }} />
                <p>Session interface active</p>
                <p style={{ fontSize: '0.8rem' }}>{activeSession.format} session in progress</p>
              </div>
            </div>

            {/* Session Note */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>Session Note</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-muted)', marginBottom: 'var(--space-2)' }}>
                3-5 sentences max. This will be submitted to the user for approval before saving.
              </p>
              <textarea className="input-field" placeholder="Write your session note..."
                value={sessionNote} onChange={e => setSessionNote(e.target.value)}
                style={{ width: '100%', minHeight: '100px' }} />
              <button className="btn btn-teal btn-pill" style={{ marginTop: 'var(--space-2)' }} disabled={!sessionNote.trim()}>
                <Check size={14} /> Submit Note for User Approval
              </button>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div id="listener-history">
            <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)' }}>Past Sessions</h2>
            {[
              { alias: 'User_F201', date: '20 May 2025', duration: '28 min', format: 'chat', noteApproved: true },
              { alias: 'User_G455', date: '19 May 2025', duration: '45 min', format: 'audio', noteApproved: false },
              { alias: 'User_H789', date: '18 May 2025', duration: '15 min', format: 'chat', noteApproved: true },
            ].map((session, i) => (
              <div className="queue-item" key={i}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{session.alias}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--charcoal-muted)' }}>
                    {session.date} • {session.duration} • {session.format}
                  </div>
                </div>
                {session.noteApproved ? (
                  <span className="badge badge-success">Note approved</span>
                ) : (
                  <span className="badge badge-warning">Awaiting approval</span>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
