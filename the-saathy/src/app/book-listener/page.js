'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, MessageSquare, Phone, Video, Check, Clock, Star, Globe } from 'lucide-react';
import { getUser } from '@/lib/storage';
import { MOCK_LISTENERS } from '@/lib/mockData';

const STEPS = ['Format', 'Preference', 'Choose Listener', 'Intent', 'Confirm'];

export default function BookListenerPage() {
  const [user, setUserState] = useState(null);
  const [step, setStep] = useState(0);
  const [format, setFormat] = useState('');
  const [preference, setPreference] = useState('');
  const [selectedListener, setSelectedListener] = useState(null);
  const [intent, setIntent] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const userData = getUser();
    if (!userData) { window.location.href = '/signup'; return; }
    setUserState(userData);
  }, []);

  const filteredListeners = MOCK_LISTENERS.filter(l => {
    if (preference === 'Same gender as me' && user) return l.gender === user.gender;
    if (preference === 'Women only') return l.gender === 'Woman';
    return true;
  });

  const canProceed = () => {
    if (step === 0) return !!format;
    if (step === 1) return !!preference;
    if (step === 2) return !!selectedListener;
    return true;
  };

  const nextStep = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const confirmBooking = () => {
    const route = format === 'chat' ? '/session/chat' : '/session/call';
    window.location.href = `${route}?listener=${selectedListener?.id}`;
  };

  if (!mounted) return null;

  return (
    <div style={{ background: 'var(--bg-warm)', minHeight: '100vh' }}>
      <nav className="navbar" id="book-navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Link href="/dashboard" className="btn btn-icon btn-ghost"><ArrowLeft size={20} /></Link>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>Book a Listener</span>
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--charcoal-muted)' }}>Step {step + 1}/{STEPS.length}</span>
      </nav>

      <div className="page-content" style={{ maxWidth: 'var(--max-width-narrow)', margin: '0 auto' }}>
        {/* Progress */}
        <div className="onboarding-progress" style={{ marginBottom: 'var(--space-6)' }}>
          {STEPS.map((_, i) => (
            <div key={i} className={`progress-dot ${i === step ? 'active' : i < step ? 'completed' : ''}`} />
          ))}
        </div>

        {/* Step 1: Format */}
        {step === 0 && (
          <div className="animate-fadeInUp" id="step-format">
            <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>Choose your format</h2>
            <p style={{ color: 'var(--charcoal-soft)', marginBottom: 'var(--space-4)' }}>How would you like to connect with your listener?</p>
            <div className="format-options">
              {[
                { value: 'chat', icon: MessageSquare, label: 'Saathy Chat', desc: 'Text-based, lower pressure' },
                { value: 'audio', icon: Phone, label: 'Audio Call', desc: 'Voice conversation' },
                { value: 'video', icon: Video, label: 'Video Call', desc: 'Face-to-face connection' },
              ].map(opt => (
                <button key={opt.value} className={`format-card ${format === opt.value ? 'selected' : ''}`}
                  onClick={() => setFormat(opt.value)} id={`format-${opt.value}`}>
                  <opt.icon size={28} />
                  <h4 style={{ fontSize: '0.95rem', marginTop: 'var(--space-2)' }}>{opt.label}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--charcoal-muted)', marginTop: '4px' }}>{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Preference */}
        {step === 1 && (
          <div className="animate-fadeInUp" id="step-preference">
            <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>Listener preference</h2>
            <p style={{ color: 'var(--charcoal-soft)', marginBottom: 'var(--space-4)' }}>Choose who you feel comfortable talking to.</p>
            <div className="choice-group">
              {['Any available listener', 'Same gender as me', 'Women only', 'My Saathy Anchor'].map(pref => (
                <button key={pref} className={`choice-btn ${preference === pref ? 'selected' : ''}`}
                  onClick={() => setPreference(pref)} id={`pref-${pref.slice(0,10).replace(/\s/g,'-')}`}>
                  <span className="choice-radio" />
                  <span>
                    {pref}
                    {pref === 'My Saathy Anchor' && (
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--charcoal-muted)' }}>If assigned</span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Choose Listener */}
        {step === 2 && (
          <div className="animate-fadeInUp" id="step-choose-listener">
            <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>Available listeners</h2>
            <p style={{ color: 'var(--charcoal-soft)', marginBottom: 'var(--space-4)' }}>
              {filteredListeners.filter(l => l.available).length} listeners available now
            </p>
            <div className="flex flex-col gap-3">
              {filteredListeners.map(listener => (
                <div key={listener.id} className={`listener-card ${selectedListener?.id === listener.id ? 'selected' : ''}`}
                  onClick={() => setSelectedListener(listener)} id={`listener-${listener.id}`}>
                  <div className="listener-avatar">{listener.initials}</div>
                  <div className="listener-info">
                    <div className="listener-name">{listener.name}</div>
                    <div className="listener-bio">{listener.bio}</div>
                    <div className="listener-meta">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <Globe size={10} /> {listener.languages.join(', ')}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <Star size={10} /> {listener.rating}
                      </span>
                      {listener.available ? (
                        <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>Available now</span>
                      ) : (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                          <Clock size={10} /> In {listener.nextAvailable}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Intent */}
        {step === 3 && (
          <div className="animate-fadeInUp" id="step-intent">
            <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>What brings you here today?</h2>
            <p style={{ color: 'var(--charcoal-soft)', marginBottom: 'var(--space-4)' }}>
              This helps your listener prepare. Only shared with them.
            </p>
            <textarea className="input-field" placeholder="Optional — you can also share during the session..."
              value={intent} onChange={e => setIntent(e.target.value)}
              style={{ minHeight: '120px', width: '100%' }} id="session-intent" />
          </div>
        )}

        {/* Step 5: Confirm */}
        {step === 4 && (
          <div className="animate-fadeInUp" id="step-confirm">
            <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)' }}>Confirm your session</h2>
            <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                <div className="listener-avatar">{selectedListener?.initials}</div>
                <div>
                  <div style={{ fontWeight: 600 }}>{selectedListener?.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--charcoal-muted)' }}>{selectedListener?.languages.join(', ')}</div>
                </div>
              </div>
              <div style={{ borderTop: '1px solid var(--bg-sand)', paddingTop: 'var(--space-3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--charcoal-muted)' }}>Format</span>
                  <span style={{ textTransform: 'capitalize', fontWeight: 500 }}>{format}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--charcoal-muted)' }}>Duration</span>
                  <span style={{ fontWeight: 500 }}>30 minutes</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--charcoal-muted)' }}>Price</span>
                  <span style={{ fontWeight: 600, color: 'var(--saffron)' }}>₹1 <span style={{ fontSize: '0.75rem', color: 'var(--charcoal-muted)', fontWeight: 400 }}>(first session)</span></span>
                </div>
              </div>
            </div>

            <button className="btn btn-primary btn-full btn-lg btn-pill" onClick={confirmBooking} id="btn-confirm-book">
              <Check size={18} /> Confirm & Start Session
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--charcoal-muted)', marginTop: 'var(--space-3)' }}>
              ₹1 starter session for first-time users
            </p>
          </div>
        )}

        {/* Navigation */}
        {step < 4 && (
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
            {step > 0 && (
              <button className="btn btn-ghost" onClick={() => setStep(step - 1)}>
                <ArrowLeft size={16} /> Back
              </button>
            )}
            <div style={{ flex: 1 }} />
            <button className="btn btn-primary btn-pill" onClick={nextStep} disabled={!canProceed()}>
              Next <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
