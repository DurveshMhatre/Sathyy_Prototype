'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Brain, Shield, Database, Clock, FileText, Check } from 'lucide-react';
import { getConsents, setConsents, getMemoryItems, getUser } from '@/lib/storage';
import { MOCK_SESSIONS } from '@/lib/mockData';

export default function PrivacyPage() {
  const [consents, setConsentsState] = useState({});
  const [mounted, setMounted] = useState(false);
  const [grievance, setGrievance] = useState('');
  const [grievanceSubmitted, setGrievanceSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const userData = getUser();
    if (!userData) { window.location.href = '/signup'; return; }
    setConsentsState(getConsents());
  }, []);

  const toggleConsent = (key) => {
    const updated = { ...consents, [key]: !consents[key] };
    setConsentsState(updated);
    setConsents(updated);
  };

  const submitGrievance = () => {
    if (!grievance.trim()) return;
    setGrievanceSubmitted(true);
    setGrievance('');
  };

  if (!mounted) return null;

  const memoryCount = getMemoryItems().length;

  return (
    <div style={{ background: 'var(--bg-warm)', minHeight: '100vh' }}>
      <nav className="navbar" id="privacy-navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Link href="/dashboard" className="btn btn-icon btn-ghost"><ArrowLeft size={20} /></Link>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>Privacy Center</span>
        </div>
      </nav>

      <div className="page-content" style={{ maxWidth: 'var(--max-width-narrow)', margin: '0 auto' }}>
        {/* Section 1: My Memory */}
        <div className="privacy-section" id="section-memory">
          <div className="privacy-section-header">
            <div className="privacy-section-icon" style={{ background: 'var(--gold-light)', color: 'var(--gold)' }}>
              <Brain size={20} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)' }}>My Memory</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-muted)' }}>{memoryCount} items saved</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/memory" className="btn btn-outline btn-sm btn-pill">View & Manage Memory</Link>
          </div>
        </div>

        {/* Section 2: My Consents */}
        <div className="privacy-section" id="section-consents">
          <div className="privacy-section-header">
            <div className="privacy-section-icon" style={{ background: 'var(--teal-glow)', color: 'var(--teal)' }}>
              <Shield size={20} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)' }}>My Consents</h3>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { key: 'rememberContext', label: 'Remember conversation context' },
              { key: 'sessionSummaries', label: 'Create session summaries' },
              { key: 'voiceToText', label: 'Voice-to-text transcription' },
              { key: 'listenerSummaryAccess', label: 'Listener access to summaries' },
              { key: 'crisisSafetyReview', label: 'Crisis/safety review' },
              { key: 'reminders', label: 'Reminders and notifications' },
            ].map(consent => (
              <div className="toggle-wrapper" key={consent.key}>
                <label className="toggle">
                  <input type="checkbox" checked={consents[consent.key] || false} onChange={() => toggleConsent(consent.key)} />
                  <span className="toggle-track" />
                </label>
                <span className="toggle-label">{consent.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: My Data */}
        <div className="privacy-section" id="section-data">
          <div className="privacy-section-header">
            <div className="privacy-section-icon" style={{ background: 'var(--info-light)', color: 'var(--info)' }}>
              <Database size={20} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)' }}>My Data</h3>
          </div>
          <div className="flex flex-col gap-2">
            <button className="btn btn-outline btn-full" style={{ justifyContent: 'flex-start' }}>
              <Database size={16} /> Request full data export
            </button>
            <button className="btn btn-danger btn-full" style={{ justifyContent: 'flex-start' }}>
              <Database size={16} /> Request account & data deletion
            </button>
            <p style={{ fontSize: '0.75rem', color: 'var(--charcoal-muted)' }}>
              Data deletion complies with the Digital Personal Data Protection Act, 2023.
            </p>
          </div>
        </div>

        {/* Section 4: Session Records */}
        <div className="privacy-section" id="section-sessions">
          <div className="privacy-section-header">
            <div className="privacy-section-icon" style={{ background: 'var(--saffron-glow)', color: 'var(--saffron)' }}>
              <Clock size={20} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)' }}>Session Records</h3>
          </div>
          <div className="flex flex-col gap-2">
            {MOCK_SESSIONS.map(session => (
              <div className="card" key={session.id} style={{ padding: 'var(--space-3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{session.type}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--charcoal-muted)' }}>
                    {session.date} • {session.duration} {session.listener && `• ${session.listener}`}
                  </div>
                </div>
                {session.hasSummary && <span className="badge badge-teal">Summary saved</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Grievance */}
        <div className="privacy-section" id="section-grievance" style={{ marginBottom: 'var(--space-8)' }}>
          <div className="privacy-section-header">
            <div className="privacy-section-icon" style={{ background: 'var(--danger-light)', color: 'var(--danger)' }}>
              <FileText size={20} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)' }}>Grievance</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-soft)', marginBottom: 'var(--space-3)' }}>
            Submit a complaint. Required under the IT Act for compliance.
          </p>
          {grievanceSubmitted ? (
            <div className="card card-teal" style={{ textAlign: 'center' }}>
              <Check size={24} style={{ color: 'var(--success)', margin: '0 auto var(--space-2)' }} />
              <p style={{ fontWeight: 500 }}>Grievance submitted</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-soft)' }}>You will receive a response within 48 hours.</p>
            </div>
          ) : (
            <div>
              <textarea className="input-field" placeholder="Describe your complaint..."
                value={grievance} onChange={e => setGrievance(e.target.value)}
                style={{ width: '100%', minHeight: '100px', marginBottom: 'var(--space-3)' }} id="grievance-input" />
              <button className="btn btn-primary btn-pill" onClick={submitGrievance} disabled={!grievance.trim()} id="btn-submit-grievance">
                Submit Grievance
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
