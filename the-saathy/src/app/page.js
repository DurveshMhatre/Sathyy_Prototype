'use client';
import { Heart, Shield, MessageCircle, Users, Brain, BookOpen, Activity, PhoneCall, Lock, Eye, UserCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

const trustItems = [
  { icon: Lock, text: 'Private by default.', desc: 'Your conversations stay yours. Always.' },
  { icon: Shield, text: 'Not therapy. Not dating. Not social media.', desc: 'Just warm, human companionship.' },
  { icon: Eye, text: 'Talk anonymously if you want.', desc: 'No one needs to know your real name.' },
  { icon: UserCheck, text: 'Human listeners available.', desc: 'Trained people who genuinely listen.' },
  { icon: PhoneCall, text: 'Serious concerns routed to support resources.', desc: 'Crisis resources always free.' },
  { icon: Brain, text: 'Your memory stays in your control.', desc: 'Edit, pause, or delete anytime.' },
];

const services = [
  { icon: Sparkles, name: 'Saathy AI', desc: 'AI companion available anytime. Warm, empathetic, and remembers your story.', color: 'var(--saffron-glow)', iconColor: 'var(--saffron)' },
  { icon: Users, name: 'Saathy Listeners', desc: 'Trained human listeners via chat, audio, or video. Real human connection.', color: 'var(--teal-glow)', iconColor: 'var(--teal)' },
  { icon: Heart, name: 'Saathy Anchor', desc: 'Your recurring dedicated listener who remembers your story.', color: 'rgba(196, 99, 61, 0.1)', iconColor: 'var(--terracotta)' },
  { icon: Activity, name: 'Saathy Daily Pulse', desc: '30-second daily emotional check-in. Know how you feel, track patterns.', color: 'var(--success-light)', iconColor: 'var(--success)' },
  { icon: BookOpen, name: 'Saathy Journal', desc: 'Private space to write freely. AI reflections if you ask.', color: 'var(--info-light)', iconColor: 'var(--info)' },
  { icon: MessageCircle, name: 'Saathy Circles', desc: 'Small safe groups of 3-5 people. Coming soon.', color: 'var(--warning-light)', iconColor: 'var(--warning)' },
  { icon: Brain, name: 'Saathy Memory', desc: 'Consent-based emotional continuity across sessions.', color: 'var(--gold-light)', iconColor: 'var(--gold)' },
  { icon: Shield, name: 'Saathy Safety Net', desc: 'Safety detection, crisis routing, and helpline access. Always free.', color: 'var(--danger-light)', iconColor: 'var(--danger)' },
];

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--bg-warm)', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav className="navbar" id="landing-navbar">
        <div className="navbar-logo">
          <div className="logo-mark">S</div>
          The Saathy
        </div>
        <div className="navbar-actions">
          <Link href="/safety" className="btn btn-ghost btn-sm" id="nav-safety-link">
            <Shield size={16} /> Safety
          </Link>
          <Link href="/login" className="btn btn-outline btn-sm btn-pill" id="nav-login-link">
            Log In
          </Link>
          <Link href="/signup" className="btn btn-primary btn-sm btn-pill" id="nav-signup-link">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero" id="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Heart size={14} />
            Human + AI Companionship for India
          </div>
          <h1 className="hero-headline">
            Feel heard when <span className="highlight">loneliness feels heavy.</span>
          </h1>
          <p className="hero-sub">
            The Saathy is a Human + AI companionship platform where you can talk to Saathy AI, 
            connect with trained listeners, join safe circles, and build a daily emotional support routine.
          </p>
          <div className="hero-actions">
            <Link href="/signup" className="btn btn-primary btn-lg btn-pill" id="hero-cta-primary">
              Start with ₹1
            </Link>
            <Link href="/signup?start=ai" className="btn btn-secondary btn-lg btn-pill" id="hero-cta-secondary">
              <Sparkles size={18} />
              Talk to Saathy AI
            </Link>
          </div>
          <p style={{ marginTop: 'var(--space-5)', fontSize: '0.85rem', color: 'var(--charcoal-muted)' }}>
            No credit card required • Cancel anytime • Crisis resources always free
          </p>
          <p style={{ fontSize: '0.82rem', color: 'var(--charcoal-muted)', marginTop: 'var(--space-3)' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: 'var(--saffron)', fontWeight: 600 }}>Log in here</Link>
          </p>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section" id="trust-section">
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>Built on trust. Designed for safety.</h2>
          <p style={{ color: 'var(--charcoal-soft)', maxWidth: '560px', margin: '0 auto' }}>
            Your emotional wellbeing deserves a safe space. Here is what The Saathy promises.
          </p>
        </div>
        <div className="trust-grid">
          {trustItems.map((item, i) => (
            <div className="trust-card" key={i} id={`trust-card-${i}`} style={{ animationDelay: `${i * 100}ms` }}>
              <div className="trust-icon">
                <item.icon size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '4px' }}>{item.text}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-soft)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section" id="services-section">
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>Everything you need to feel less alone.</h2>
          <p style={{ color: 'var(--charcoal-soft)', maxWidth: '560px', margin: '0 auto' }}>
            AI companion + Human listeners + Daily check-ins + Memory continuity. All working together.
          </p>
        </div>
        <div className="services-grid">
          {services.map((service, i) => (
            <div className="service-card" key={i} id={`service-card-${i}`}>
              <div className="service-icon" style={{ background: service.color, color: service.iconColor }}>
                <service.icon size={24} />
              </div>
              <h3>{service.name}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta-section" style={{ 
        padding: 'var(--space-16) var(--space-4)', 
        textAlign: 'center',
        background: 'linear-gradient(135deg, var(--saffron-glow) 0%, var(--teal-glow) 100%)',
      }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-3)' }}>
            You do not have to explain everything.
          </h2>
          <p style={{ color: 'var(--charcoal-soft)', marginBottom: 'var(--space-6)', fontSize: '1.05rem' }}>
            Just tell Saathy how today felt. Start with ₹1. Cancel anytime.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" className="btn btn-primary btn-lg btn-pill" id="footer-cta-primary">
              Start with ₹1
            </Link>
            <Link href="/safety" className="btn btn-outline btn-lg btn-pill" id="footer-cta-safety">
              <Shield size={18} />
              View Safety Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="landing-footer" style={{
        padding: 'var(--space-8) var(--space-4)',
        textAlign: 'center',
        borderTop: '1px solid var(--bg-sand)',
      }}>
        <div className="navbar-logo" style={{ justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
          <div className="logo-mark">S</div>
          The Saathy
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-muted)', marginBottom: 'var(--space-3)', maxWidth: '500px', margin: '0 auto var(--space-3)' }}>
          The Saathy is a companionship platform, not a medical or therapeutic service. 
          If you are in immediate danger, please contact emergency services (112).
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.85rem' }}>
          <Link href="/safety">Safety Resources</Link>
          <Link href="/privacy">Privacy</Link>
          <span style={{ color: 'var(--charcoal-muted)' }}>© 2025 The Saathy</span>
        </div>
      </footer>
    </div>
  );
}
