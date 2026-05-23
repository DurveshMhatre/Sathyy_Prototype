'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Heart, LogIn, Sparkles } from 'lucide-react';
import { getUser, setUser } from '@/lib/storage';

const DEMO_USER = {
  name: 'Demo User',
  mobile: 'demo@saathy.in',
  age: '28',
  language: ['English', 'Hinglish'],
  city: 'Mumbai',
  gender: 'Prefer not to say',
  genderPreference: 'Any',
  reason: 'Just want to talk',
  whyHere: 'I want to understand myself better',
  startWith: 'ai',
  anonymous: false,
  sameListener: false,
  createdAt: new Date().toISOString(),
};

export default function LoginPage() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const existingUser = getUser();

    if (existingUser && existingUser.mobile === mobile) {
      // Match found — log in
      window.location.href = '/dashboard';
    } else {
      setLoading(false);
      setError('We could not find an account with those details. Please check your information or sign up.');
    }
  };

  const handleDemoLogin = () => {
    const existingUser = getUser();
    if (!existingUser) {
      setUser(DEMO_USER);
    }
    window.location.href = '/dashboard';
  };

  return (
    <div className="onboarding-wrapper" style={{ background: 'var(--bg-warm)' }}>
      <div className="onboarding-card">
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <div className="logo-mark" style={{ margin: '0 auto var(--space-3)', width: 48, height: 48, fontSize: '1.2rem' }}>S</div>
          <h2 className="onboarding-step-title">Welcome back to Saathy</h2>
          <p className="onboarding-step-sub">Log in to continue your journey.</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-4">
            <div className="input-group">
              <label className="input-label">Name or nickname</label>
              <input
                className="input-field"
                id="login-name"
                placeholder="What should Saathy call you?"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Mobile number or email</label>
              <input
                className="input-field"
                id="login-mobile"
                placeholder="The one you signed up with"
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="card card-danger" style={{ padding: 'var(--space-3)' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--danger)' }}>{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-pill btn-full"
              id="btn-login"
              disabled={loading || !name.trim() || !mobile.trim()}
            >
              <LogIn size={16} /> {loading ? 'Logging in...' : 'Log In'}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', margin: 'var(--space-5) 0' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--bg-sand)' }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--charcoal-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>or</span>
          <div style={{ flex: 1, height: 1, background: 'var(--bg-sand)' }} />
        </div>

        {/* Demo Login */}
        <button
          className="btn btn-ghost btn-full"
          id="btn-demo-login"
          onClick={handleDemoLogin}
          style={{ border: '1px dashed var(--charcoal-muted)', color: 'var(--charcoal-soft)' }}
        >
          <Sparkles size={16} /> [Demo] Log in as test user
        </button>

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--charcoal-muted)', marginTop: 'var(--space-2)' }}>
          Creates a demo account if none exists. For testing only.
        </p>

        {/* Sign up link */}
        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--charcoal-muted)', marginTop: 'var(--space-5)' }}>
          Don&apos;t have an account?{' '}
          <Link href="/signup" style={{ color: 'var(--saffron)', fontWeight: 600 }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
