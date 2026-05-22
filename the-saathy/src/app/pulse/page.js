'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, Mic, MicOff } from 'lucide-react';
import { getUser, addPulseEntry, getPulseStreak, getPulseEntries, markShowedUp } from '@/lib/storage';
import { MOOD_OPTIONS, getDailyPrompt } from '@/lib/mockData';
import { getAIResponse } from '@/lib/aiResponses';

const TOTAL_STEPS = 7;

export default function PulsePage() {
  const [user, setUserState] = useState(null);
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState(null);
  const [loneliness, setLoneliness] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [promptResponse, setPromptResponse] = useState('');
  const [voiceMode, setVoiceMode] = useState(false);
  const [aiReflection, setAiReflection] = useState('');
  const [tinyAction, setTinyAction] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [highLonelinessWarning, setHighLonelinessWarning] = useState(false);

  const dailyPrompt = getDailyPrompt();

  useEffect(() => {
    setMounted(true);
    const userData = getUser();
    if (!userData) { window.location.href = '/signup'; return; }
    setUserState(userData);

    // Check for 3-day high loneliness
    const entries = getPulseEntries();
    const recent3 = entries.slice(0, 3);
    if (recent3.length >= 3 && recent3.every(e => (e.loneliness || 0) >= 4)) {
      setHighLonelinessWarning(true);
    }
  }, []);

  const nextStep = async () => {
    if (step < TOTAL_STEPS - 3) {
      setStep(step + 1);
    } else if (step === TOTAL_STEPS - 3) {
      // Step 5: after prompt response, generate AI reflection
      setStep(step + 1);
      setIsLoading(true);
      try {
        const moodLabel = MOOD_OPTIONS.find(m => m.value === mood)?.label || '';
        const context = `User's mood: ${moodLabel}, loneliness: ${loneliness}/5, energy: ${energy}. Today's prompt response: "${promptResponse}"`;
        const reflection = await getAIResponse(context, 'default', []);
        setAiReflection(reflection);
      } catch {
        setAiReflection('You showed up today, and that matters. Take one moment to appreciate yourself for checking in.');
      }
      setIsLoading(false);
    } else if (step === TOTAL_STEPS - 2) {
      // Generate tiny action
      setStep(step + 1);
      const actions = [
        'Take 3 slow, deep breaths right now. Just 3.',
        'Step away from your screen for 5 minutes. Notice something beautiful.',
        'Drink a full glass of water. Your body will thank you.',
        'Send a simple message to someone you care about.',
        'Write down one thing you are grateful for today.',
        'Listen to a song that makes you feel something good.',
      ];
      setTinyAction(actions[Math.floor(Math.random() * actions.length)]);
    } else {
      // Complete
      addPulseEntry({ mood, loneliness, energy, promptResponse, dailyPrompt });
      markShowedUp();
      setCompleted(true);
    }
  };

  const canProceed = () => {
    if (step === 0) return mood !== null;
    if (step === 1) return loneliness !== null;
    if (step === 2) return energy !== null;
    return true;
  };

  if (!mounted) return null;

  if (completed) {
    return (
      <div className="pulse-wrapper" style={{ background: 'var(--bg-warm)' }}>
        <div className="pulse-card animate-fadeInUp" id="pulse-complete">
          <div style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>✨</div>
          <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>
            Check-in saved.
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--charcoal-soft)', marginBottom: 'var(--space-2)' }}>
            You showed up today.
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-muted)', marginBottom: 'var(--space-6)' }}>
            🔥 {getPulseStreak()} day streak
          </p>

          {highLonelinessWarning && (
            <div className="card card-saffron" style={{ marginBottom: 'var(--space-4)', textAlign: 'left' }} id="loneliness-warning">
              <p style={{ fontSize: '0.9rem', fontWeight: 500, marginBottom: 'var(--space-2)' }}>
                Your loneliness score has been high for 3 days.
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-soft)', marginBottom: 'var(--space-3)' }}>
                Would you like to talk to a Saathy Listener or do a 5-minute grounding check-in?
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <Link href="/book-listener" className="btn btn-primary btn-sm btn-pill">Talk to Listener</Link>
                <Link href="/chat" className="btn btn-secondary btn-sm btn-pill">Grounding Check-in</Link>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
            <Link href="/dashboard" className="btn btn-primary btn-pill">Go to Dashboard</Link>
            <Link href="/journal" className="btn btn-secondary btn-pill">Write in Journal</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-warm)', minHeight: '100vh' }}>
      {/* Header */}
      <nav className="navbar" id="pulse-navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Link href="/dashboard" className="btn btn-icon btn-ghost">
            <ArrowLeft size={20} />
          </Link>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>Daily Pulse</span>
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--charcoal-muted)' }}>
          {step + 1} / {TOTAL_STEPS}
        </span>
      </nav>

      {/* Progress bar */}
      <div style={{ position: 'fixed', top: 'var(--header-height)', left: 0, right: 0, height: '3px', background: 'var(--bg-sand)', zIndex: 50 }}>
        <div style={{ height: '100%', width: `${((step + 1) / TOTAL_STEPS) * 100}%`, background: 'var(--saffron)', transition: 'width 0.3s ease', borderRadius: '0 2px 2px 0' }} />
      </div>

      <div className="pulse-wrapper" style={{ paddingTop: 'calc(var(--header-height) + var(--space-4))' }}>
        <div className="pulse-card">

          {/* Step 1: Mood */}
          {step === 0 && (
            <div className="animate-fadeInUp" id="step-mood">
              <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>
                How are you feeling today?
              </h2>
              <p style={{ color: 'var(--charcoal-soft)', marginBottom: 'var(--space-4)' }}>
                No right or wrong answer. Just honest.
              </p>
              <div className="mood-scale">
                {MOOD_OPTIONS.map(opt => (
                  <button key={opt.value} className={`mood-option ${mood === opt.value ? 'selected' : ''}`}
                    onClick={() => setMood(opt.value)} id={`mood-${opt.value}`}>
                    <span className="mood-emoji">{opt.emoji}</span>
                    <span className="mood-label">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Loneliness */}
          {step === 1 && (
            <div className="animate-fadeInUp" id="step-loneliness">
              <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>
                How lonely do you feel today?
              </h2>
              <p style={{ color: 'var(--charcoal-soft)', marginBottom: 'var(--space-4)' }}>
                It is okay to admit this. That is what Saathy is here for.
              </p>
              <div className="scale-slider">
                <div className="scale-track">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button key={n} className={`scale-point ${loneliness === n ? 'selected' : ''}`}
                      onClick={() => setLoneliness(n)} id={`lonely-${n}`}>
                      {n}
                    </button>
                  ))}
                </div>
                <div className="scale-labels">
                  <span>Not at all</span>
                  <span>Very lonely</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Energy */}
          {step === 2 && (
            <div className="animate-fadeInUp" id="step-energy">
              <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>
                Energy level?
              </h2>
              <div className="energy-options">
                {[
                  { value: 'low', icon: '🔋', label: 'Low' },
                  { value: 'medium', icon: '⚡', label: 'Medium' },
                  { value: 'high', icon: '🚀', label: 'High' },
                ].map(opt => (
                  <button key={opt.value} className={`energy-option ${energy === opt.value ? 'selected' : ''}`}
                    onClick={() => setEnergy(opt.value)} id={`energy-${opt.value}`}>
                    <span className="energy-icon">{opt.icon}</span>
                    <span className="energy-label">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Guided prompt */}
          {step === 3 && (
            <div className="animate-fadeInUp" id="step-prompt">
              <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)', fontSize: '1.3rem' }}>
                {dailyPrompt}
              </h2>
              <textarea
                className="input-field"
                placeholder="Write or speak your answer... (optional)"
                value={promptResponse}
                onChange={e => setPromptResponse(e.target.value)}
                style={{ minHeight: '120px', width: '100%' }}
                id="prompt-response"
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-2)' }}>
                <button className={`btn btn-sm ${voiceMode ? 'btn-danger' : 'btn-ghost'}`}
                  onClick={() => setVoiceMode(!voiceMode)} id="btn-voice-pulse">
                  {voiceMode ? <><MicOff size={14} /> Stop</> : <><Mic size={14} /> Voice</>}
                </button>
              </div>
            </div>
          )}

          {/* Step 5: AI Reflection */}
          {step === 4 && (
            <div className="animate-fadeInUp" id="step-reflection">
              <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)' }}>
                Saathy reflects
              </h2>
              {isLoading ? (
                <div style={{ textAlign: 'center', padding: 'var(--space-6)' }}>
                  <div className="typing-indicator" style={{ justifyContent: 'center' }}>
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                  <p style={{ color: 'var(--charcoal-muted)', marginTop: 'var(--space-3)', fontSize: '0.9rem' }}>
                    Saathy is reflecting on your answers...
                  </p>
                </div>
              ) : (
                <div className="card card-teal" style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--charcoal-soft)' }}>
                    {aiReflection}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 6: Tiny Action */}
          {step === 5 && (
            <div className="animate-fadeInUp" id="step-tinyaction">
              <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-3)' }}>🌱</div>
              <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-3)' }}>
                Your Tiny Action for today
              </h2>
              <div className="card card-saffron" style={{ textAlign: 'left' }}>
                <p style={{ fontSize: '1rem', lineHeight: 1.6, fontWeight: 500 }}>
                  {tinyAction}
                </p>
              </div>
            </div>
          )}

          {/* Step 7: Save */}
          {step === 6 && (
            <div className="animate-fadeInUp" id="step-save">
              <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-3)' }}>💛</div>
              <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>
                Ready to save?
              </h2>
              <p style={{ color: 'var(--charcoal-soft)', marginBottom: 'var(--space-4)' }}>
                Your check-in will be saved privately. Only you can see it.
              </p>
              <div className="card" style={{ textAlign: 'left', marginBottom: 'var(--space-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--charcoal-muted)' }}>Mood</span>
                  <span>{MOOD_OPTIONS.find(m => m.value === mood)?.emoji} {MOOD_OPTIONS.find(m => m.value === mood)?.label}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--charcoal-muted)' }}>Loneliness</span>
                  <span>{loneliness} / 5</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--charcoal-muted)' }}>Energy</span>
                  <span style={{ textTransform: 'capitalize' }}>{energy}</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)', justifyContent: 'center' }}>
            {step > 0 && (
              <button className="btn btn-ghost" onClick={() => setStep(step - 1)} id="pulse-back">
                <ArrowLeft size={16} /> Back
              </button>
            )}
            <button className="btn btn-primary btn-pill" onClick={nextStep} disabled={!canProceed() || isLoading} id="pulse-next">
              {step === TOTAL_STEPS - 1 ? (
                <><Check size={16} /> Save Check-in</>
              ) : (
                <> Next <ArrowRight size={16} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
