'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Shield, Check } from 'lucide-react';
import { setUser, setConsents } from '@/lib/storage';
import { ONBOARDING_REASONS, EMOTIONAL_INTAKE_OPTIONS } from '@/lib/mockData';

const STEPS = ['Account', 'Profile', 'Consent', 'Emotional Intake'];

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '', mobile: '', age: '', language: [], city: '',
    gender: '', genderPreference: '', reason: '',
    consents: {
      rememberContext: false, sessionSummaries: false,
      voiceToText: false, listenerSummaryAccess: false,
      crisisSafetyReview: false, reminders: false,
    },
    whyHere: '', startWith: '', anonymous: '', sameLlistener: '',
  });
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const toggleLanguage = (lang) => {
    setFormData(prev => ({
      ...prev,
      language: prev.language.includes(lang) 
        ? prev.language.filter(l => l !== lang)
        : [...prev.language, lang]
    }));
  };

  const toggleConsent = (key) => {
    setFormData(prev => ({
      ...prev,
      consents: { ...prev.consents, [key]: !prev.consents[key] }
    }));
  };

  const validateStep = () => {
    const errs = {};
    if (step === 0) {
      if (!formData.name.trim()) errs.name = 'Please enter your name or nickname';
      if (!formData.mobile.trim()) errs.mobile = 'Please enter your mobile or email';
      if (!formData.age) errs.age = 'Please enter your age';
      else if (parseInt(formData.age) < 18) errs.age = 'You must be 18 or older to use The Saathy';
      if (formData.language.length === 0) errs.language = 'Please select at least one language';
    }
    if (step === 1) {
      if (!formData.gender) errs.gender = 'Please select your gender';
      if (!formData.reason) errs.reason = 'Please select your primary reason';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (step < STEPS.length - 1) setStep(step + 1);
      else completeOnboarding();
    }
  };

  const completeOnboarding = () => {
    const user = {
      name: formData.name,
      mobile: formData.mobile,
      age: formData.age,
      language: formData.language,
      city: formData.city,
      gender: formData.gender,
      genderPreference: formData.genderPreference,
      reason: formData.reason,
      whyHere: formData.whyHere,
      startWith: formData.startWith,
      anonymous: formData.anonymous === 'yes',
      sameListener: formData.sameListener === 'yes',
      createdAt: new Date().toISOString(),
    };
    setUser(user);
    setConsents(formData.consents);
    router.push('/dashboard');
  };

  return (
    <div className="onboarding-wrapper" style={{ background: 'var(--bg-warm)' }}>
      <div className="onboarding-card">
        {/* Progress */}
        <div className="onboarding-progress" id="onboarding-progress">
          {STEPS.map((_, i) => (
            <div key={i} className={`progress-dot ${i === step ? 'active' : i < step ? 'completed' : ''}`} />
          ))}
        </div>

        {/* Step 1: Account */}
        {step === 0 && (
          <div className="animate-fadeInUp" id="step-account">
            <h2 className="onboarding-step-title">Welcome to The Saathy</h2>
            <p className="onboarding-step-sub">Let us get to know you a little. Nothing too personal.</p>

            <div className="flex flex-col gap-4">
              <div className="input-group">
                <label className="input-label">Name or nickname</label>
                <input className="input-field" id="input-name" placeholder="What should Saathy call you?" value={formData.name} onChange={e => updateField('name', e.target.value)} />
                {errors.name && <span className="input-error">{errors.name}</span>}
              </div>

              <div className="input-group">
                <label className="input-label">Mobile number or email</label>
                <input className="input-field" id="input-mobile" placeholder="For your account" value={formData.mobile} onChange={e => updateField('mobile', e.target.value)} />
                {errors.mobile && <span className="input-error">{errors.mobile}</span>}
              </div>

              <div className="input-group">
                <label className="input-label">Age</label>
                <input className="input-field" id="input-age" type="number" min="1" placeholder="Must be 18+" value={formData.age} onChange={e => updateField('age', e.target.value)} />
                {errors.age && <span className="input-error" style={parseInt(formData.age) < 18 && formData.age ? { color: 'var(--danger)', fontWeight: 600 } : {}}>{errors.age}</span>}
                {parseInt(formData.age) < 18 && formData.age && (
                  <div className="card card-danger" style={{ padding: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--danger)' }}>
                      <Shield size={14} style={{ display: 'inline', marginRight: '4px' }} />
                      The Saathy is only available for adults aged 18 and above. If you need support, please reach out to a trusted adult or call Childline at 1098.
                    </p>
                  </div>
                )}
              </div>

              <div className="input-group">
                <label className="input-label">Language preference</label>
                <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
                  {['English', 'Hindi', 'Hinglish'].map(lang => (
                    <button key={lang} className={`choice-btn ${formData.language.includes(lang) ? 'selected' : ''}`}
                      onClick={() => toggleLanguage(lang)}
                      style={{ flex: 'none', padding: 'var(--space-2) var(--space-4)' }}
                      id={`lang-${lang.toLowerCase()}`}>
                      {formData.language.includes(lang) && <Check size={14} />} {lang}
                    </button>
                  ))}
                </div>
                {errors.language && <span className="input-error">{errors.language}</span>}
              </div>

              <div className="input-group">
                <label className="input-label">City (optional)</label>
                <input className="input-field" id="input-city" placeholder="Where are you based?" value={formData.city} onChange={e => updateField('city', e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Profile */}
        {step === 1 && (
          <div className="animate-fadeInUp" id="step-profile">
            <h2 className="onboarding-step-title">A little more about you</h2>
            <p className="onboarding-step-sub">This helps Saathy personalize your experience.</p>

            <div className="flex flex-col gap-5">
              <div className="input-group">
                <label className="input-label">Gender</label>
                <div className="choice-group">
                  {['Man', 'Woman', 'Non-binary', 'Prefer not to say'].map(g => (
                    <button key={g} className={`choice-btn ${formData.gender === g ? 'selected' : ''}`}
                      onClick={() => updateField('gender', g)} id={`gender-${g.toLowerCase().replace(/\s/g, '-')}`}>
                      <span className="choice-radio" /> {g}
                    </button>
                  ))}
                </div>
                {errors.gender && <span className="input-error">{errors.gender}</span>}
              </div>

              <div className="input-group">
                <label className="input-label">Listener gender comfort</label>
                <div className="choice-group">
                  {['Any', 'Prefer same gender', 'Women only'].map(pref => (
                    <button key={pref} className={`choice-btn ${formData.genderPreference === pref ? 'selected' : ''}`}
                      onClick={() => updateField('genderPreference', pref)} id={`pref-${pref.toLowerCase().replace(/\s/g, '-')}`}>
                      <span className="choice-radio" /> {pref}
                    </button>
                  ))}
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Primary reason for joining</label>
                <div className="choice-group">
                  {ONBOARDING_REASONS.map(reason => (
                    <button key={reason} className={`choice-btn ${formData.reason === reason ? 'selected' : ''}`}
                      onClick={() => updateField('reason', reason)} id={`reason-${reason.toLowerCase().replace(/\s/g, '-')}`}>
                      <span className="choice-radio" /> {reason}
                    </button>
                  ))}
                </div>
                {errors.reason && <span className="input-error">{errors.reason}</span>}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Consent */}
        {step === 2 && (
          <div className="animate-fadeInUp" id="step-consent">
            <h2 className="onboarding-step-title">Your privacy, your control</h2>
            <p className="onboarding-step-sub">Choose what you are comfortable with. All toggles are off by default.</p>

            <div className="flex flex-col gap-3">
              {[
                { key: 'rememberContext', label: 'Allow Saathy to remember my conversation context', desc: 'Saathy will reference past conversations to provide continuity.' },
                { key: 'sessionSummaries', label: 'Allow Saathy to create session summaries', desc: 'Short summaries of your sessions, always reviewed by you first.' },
                { key: 'voiceToText', label: 'Allow voice-to-text for safety and continuity', desc: 'Your voice messages will be transcribed. Audio is never stored.' },
                { key: 'listenerSummaryAccess', label: 'Allow human listener to see my past summaries', desc: 'Your approved summaries help listeners understand your journey.' },
                { key: 'crisisSafetyReview', label: 'Allow crisis/safety review if serious risk is detected', desc: 'If Saathy detects you may be in danger, a safety team member reviews.' },
                { key: 'reminders', label: 'Allow reminders and check-in notifications', desc: 'Gentle daily nudges to check in with how you are feeling.' },
              ].map(consent => (
                <div className="toggle-wrapper" key={consent.key} id={`consent-${consent.key}`}>
                  <label className="toggle">
                    <input type="checkbox" checked={formData.consents[consent.key]} onChange={() => toggleConsent(consent.key)} />
                    <span className="toggle-track" />
                  </label>
                  <div className="toggle-content">
                    <span className="toggle-label">{consent.label}</span>
                    <span className="toggle-desc">{consent.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-muted)', marginTop: 'var(--space-4)', textAlign: 'center' }}>
              You can change these at any time in your Privacy Settings.
            </p>
          </div>
        )}

        {/* Step 4: Emotional Intake */}
        {step === 3 && (
          <div className="animate-fadeInUp" id="step-intake">
            <h2 className="onboarding-step-title">How can Saathy help today?</h2>
            <p className="onboarding-step-sub">No right or wrong answers. Just start where you are.</p>

            <div className="flex flex-col gap-5">
              <div className="input-group">
                <label className="input-label">Why are you here today?</label>
                <div className="choice-group">
                  {EMOTIONAL_INTAKE_OPTIONS.map(option => (
                    <button key={option} className={`choice-btn ${formData.whyHere === option ? 'selected' : ''}`}
                      onClick={() => updateField('whyHere', option)} id={`why-${option.slice(0, 10).replace(/\s/g, '-')}`}>
                      <span className="choice-radio" /> {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">What would you like to start with?</label>
                <div className="choice-group">
                  {[
                    { value: 'ai', label: '💛 AI chat with Saathy' },
                    { value: 'listener', label: '👤 Human listener session' },
                    { value: 'journal', label: '📝 Journaling' },
                    { value: 'pulse', label: '💫 Daily Pulse check-in' },
                  ].map(opt => (
                    <button key={opt.value} className={`choice-btn ${formData.startWith === opt.value ? 'selected' : ''}`}
                      onClick={() => updateField('startWith', opt.value)} id={`start-${opt.value}`}>
                      <span className="choice-radio" /> {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Do you want to stay anonymous?</label>
                <div className="choice-group">
                  <button className={`choice-btn ${formData.anonymous === 'yes' ? 'selected' : ''}`}
                    onClick={() => updateField('anonymous', 'yes')} id="anon-yes">
                    <span className="choice-radio" /> Yes — listeners will see a random alias
                  </button>
                  <button className={`choice-btn ${formData.anonymous === 'no' ? 'selected' : ''}`}
                    onClick={() => updateField('anonymous', 'no')} id="anon-no">
                    <span className="choice-radio" /> No — use my name or nickname
                  </button>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Same-listener continuity?</label>
                <div className="choice-group">
                  <button className={`choice-btn ${formData.sameListener === 'yes' ? 'selected' : ''}`}
                    onClick={() => updateField('sameListener', 'yes')} id="same-yes">
                    <span className="choice-radio" /> Yes — match me with the same listener each time
                  </button>
                  <button className={`choice-btn ${formData.sameListener === 'no' ? 'selected' : ''}`}
                    onClick={() => updateField('sameListener', 'no')} id="same-no">
                    <span className="choice-radio" /> No / Not sure yet
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="onboarding-actions">
          {step > 0 && (
            <button className="btn btn-ghost" onClick={() => setStep(step - 1)} id="btn-back">
              <ArrowLeft size={16} /> Back
            </button>
          )}
          <div style={{ flex: 1 }} />
          <button 
            className="btn btn-primary btn-pill" 
            onClick={nextStep} 
            id="btn-next"
            disabled={step === 0 && parseInt(formData.age) < 18 && formData.age !== ''}
          >
            {step < STEPS.length - 1 ? (
              <> Next <ArrowRight size={16} /> </>
            ) : (
              <> Start my journey <ArrowRight size={16} /> </>
            )}
          </button>
        </div>

        {step === 0 && (
          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--charcoal-muted)', marginTop: 'var(--space-3)' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: 'var(--saffron)', fontWeight: 600 }}>Log in</Link>
          </p>
        )}

        {/* Step indicator */}
        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--charcoal-muted)', marginTop: 'var(--space-3)' }}>
          Step {step + 1} of {STEPS.length} — {STEPS[step]}
        </p>
      </div>
    </div>
  );
}
