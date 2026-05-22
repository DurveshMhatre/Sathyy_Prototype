'use client';
import { useState } from 'react';
import { Shield, AlertTriangle, Flag, Clock, Check, X, Eye, Users, FileText, ChevronDown, LogOut, Ban, MessageSquare, Phone } from 'lucide-react';
import { MOCK_SAFETY_FLAGS, MOCK_GRIEVANCES, getTimeAgo } from '@/lib/mockData';

export default function ModeratorDashboard() {
  const [activeTab, setActiveTab] = useState('flags');
  const [flags, setFlags] = useState(MOCK_SAFETY_FLAGS);
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [showAudit, setShowAudit] = useState(false);

  const resolveFlag = (id) => {
    setFlags(flags.map(f => f.id === id ? { ...f, status: 'resolved', resolvedAt: new Date().toISOString() } : f));
    setSelectedFlag(null);
  };

  const pendingFlags = flags.filter(f => f.status === 'pending');
  const resolvedFlags = flags.filter(f => f.status === 'resolved');

  return (
    <div className="internal-layout" id="moderator-dashboard">
      {/* Sidebar */}
      <aside className="internal-sidebar">
        <div className="internal-sidebar-logo">
          <div style={{ width: 28, height: 28, borderRadius: 'var(--radius-sm)', background: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem', fontWeight: 700 }}>
            <Shield size={14} />
          </div>
          Safety Moderator
        </div>

        <nav>
          {[
            { id: 'flags', icon: AlertTriangle, label: 'Safety Flags', count: pendingFlags.length },
            { id: 'grievances', icon: FileText, label: 'Grievances', count: MOCK_GRIEVANCES.filter(g => g.status !== 'resolved').length },
            { id: 'audit', icon: Eye, label: 'Audit Log' },
          ].map(item => (
            <div key={item.id} className={`internal-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}>
              <item.icon size={18} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.count > 0 && (
                <span style={{ background: 'var(--danger)', color: 'white', width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>
                  {item.count}
                </span>
              )}
            </div>
          ))}
        </nav>

        <div style={{ position: 'absolute', bottom: 'var(--space-6)', left: 'var(--space-6)', right: 'var(--space-6)' }}>
          <div style={{ padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', background: 'rgba(217,79,79,0.1)', marginBottom: 'var(--space-3)' }}>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>
              SLA Reminder: Crisis flags must be resolved within 4 hours. General within 24 hours.
            </p>
          </div>
          <div className="internal-nav-item" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <LogOut size={18} /> Sign Out
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="internal-main">
        {/* Safety Flags Tab */}
        {activeTab === 'flags' && (
          <div id="safety-flags">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-1)' }}>Safety Flag Queue</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-soft)' }}>
                  {pendingFlags.length} pending • {resolvedFlags.length} resolved today
                </p>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <span className="badge badge-danger">{pendingFlags.filter(f => f.severity === 'critical').length} Critical</span>
                <span className="badge badge-warning">{pendingFlags.filter(f => f.severity === 'high').length} High</span>
              </div>
            </div>

            {/* Pending Flags */}
            {pendingFlags.length > 0 && (
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: 'var(--space-3)' }}>⚠️ Pending Review</h3>
                <div className="flex flex-col gap-3">
                  {pendingFlags.map(flag => (
                    <div className="queue-item" key={flag.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedFlag(flag)}>
                      <div className={`queue-priority ${flag.severity}`} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{flag.userAlias}</span>
                          <span className={`badge badge-${flag.severity === 'critical' ? 'danger' : flag.severity === 'high' ? 'warning' : 'muted'}`}>
                            {flag.severity}
                          </span>
                          <span className="badge badge-muted">{flag.type}</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-soft)' }}>{flag.category}</p>
                        <div style={{ fontSize: '0.75rem', color: 'var(--charcoal-muted)', marginTop: '4px' }}>
                          {flag.sessionType} • Account age: {flag.accountAge} • {getTimeAgo(flag.timestamp)}
                        </div>
                      </div>
                      <ChevronDown size={16} style={{ color: 'var(--charcoal-muted)', transform: 'rotate(-90deg)' }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resolved Flags */}
            {resolvedFlags.length > 0 && (
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: 'var(--space-3)', color: 'var(--charcoal-soft)' }}>✅ Resolved</h3>
                <div className="flex flex-col gap-3">
                  {resolvedFlags.map(flag => (
                    <div className="queue-item" key={flag.id} style={{ opacity: 0.7 }}>
                      <div className={`queue-priority ${flag.severity}`} style={{ opacity: 0.5 }} />
                      <div style={{ flex: 1 }}>
                        <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{flag.userAlias}</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--charcoal-muted)' }}> — {flag.category}</span>
                        {flag.resolvedBy && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--charcoal-muted)' }}>
                            Resolved by {flag.resolvedBy}
                          </div>
                        )}
                      </div>
                      <span className="badge badge-success">Resolved</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Grievances Tab */}
        {activeTab === 'grievances' && (
          <div id="grievances-tab">
            <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)' }}>Grievance Queue</h2>
            <div className="flex flex-col gap-3">
              {MOCK_GRIEVANCES.map(g => (
                <div className="queue-item" key={g.id}>
                  <div className={`queue-priority ${g.status === 'resolved' ? 'low' : 'high'}`} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{g.userAlias}</span>
                      <span className={`badge ${g.status === 'resolved' ? 'badge-success' : 'badge-warning'}`}>
                        {g.status === 'resolved' ? 'Resolved' : 'Under Review'}
                      </span>
                    </div>
                    <p style={{ fontWeight: 500, fontSize: '0.9rem' }}>{g.subject}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-soft)' }}>{g.description}</p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--charcoal-muted)' }}>
                      Submitted {getTimeAgo(g.submittedAt)}
                    </span>
                  </div>
                  {g.status !== 'resolved' && (
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <button className="btn btn-teal btn-sm">Respond</button>
                      <button className="btn btn-outline btn-sm">Resolve</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Audit Log Tab */}
        {activeTab === 'audit' && (
          <div id="audit-tab">
            <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)' }}>Audit Log</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-soft)', marginBottom: 'var(--space-4)' }}>
              Every action taken on every flag, with timestamp and moderator ID.
            </p>
            <div className="flex flex-col gap-2">
              {[
                { action: 'Resolved safety flag F003', mod: 'Mod_Anika', time: '19 May, 23:15' },
                { action: 'Sent safety message to User_B291', mod: 'Mod_Ravi', time: '20 May, 11:30' },
                { action: 'Suspended Listener_X for harassment report', mod: 'Mod_Anika', time: '20 May, 12:00' },
                { action: 'Routed User_A847 to KIRAN helpline', mod: 'Mod_Ravi', time: '20 May, 14:45' },
                { action: 'Resolved grievance G002 — data deletion completed', mod: 'Mod_Anika', time: '18 May, 14:00' },
              ].map((entry, i) => (
                <div className="card" key={i} style={{ padding: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <Clock size={14} style={{ color: 'var(--charcoal-muted)', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.85rem' }}>{entry.action}</span>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--charcoal-muted)', whiteSpace: 'nowrap' }}>
                    <div>{entry.mod}</div>
                    <div>{entry.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Flag Detail Modal */}
      {selectedFlag && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: '560px' }}>
            <div className="modal-header">
              <h3 style={{ fontFamily: 'var(--font-display)' }}>Safety Flag — {selectedFlag.id}</h3>
              <button className="modal-close" onClick={() => setSelectedFlag(null)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                <span className={`badge badge-${selectedFlag.severity === 'critical' ? 'danger' : 'warning'}`}>{selectedFlag.severity}</span>
                <span className="badge badge-muted">{selectedFlag.type}</span>
                <span className="badge badge-muted">{selectedFlag.sessionType}</span>
              </div>
              
              <div className="card" style={{ marginBottom: 'var(--space-3)', background: 'var(--bg-cream)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--charcoal-muted)', marginBottom: 'var(--space-1)' }}>Flagged Content</div>
                <p style={{ fontSize: '0.9rem' }}>{selectedFlag.message}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', fontSize: '0.85rem' }}>
                <div><span style={{ color: 'var(--charcoal-muted)' }}>User:</span> {selectedFlag.userAlias}</div>
                <div><span style={{ color: 'var(--charcoal-muted)' }}>Account age:</span> {selectedFlag.accountAge}</div>
                <div><span style={{ color: 'var(--charcoal-muted)' }}>Category:</span> {selectedFlag.category}</div>
                <div><span style={{ color: 'var(--charcoal-muted)' }}>Time:</span> {getTimeAgo(selectedFlag.timestamp)}</div>
              </div>
            </div>

            <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-3)' }}>Actions</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
              <button className="btn btn-teal btn-sm" onClick={() => resolveFlag(selectedFlag.id)}>
                <Check size={14} /> Resolve
              </button>
              <button className="btn btn-outline btn-sm">
                <AlertTriangle size={14} /> Escalate
              </button>
              <button className="btn btn-outline btn-sm" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>
                <Ban size={14} /> Suspend User
              </button>
              <button className="btn btn-outline btn-sm">
                <MessageSquare size={14} /> Send Safety Msg
              </button>
              <button className="btn btn-outline btn-sm" style={{ gridColumn: '1 / -1' }}>
                <Phone size={14} /> Route to Helpline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
