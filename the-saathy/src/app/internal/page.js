'use client';
import Link from 'next/link';
import { Users, Shield, ArrowLeft, Headphones, Eye } from 'lucide-react';

export default function InternalPage() {
  return (
    <div style={{ background: 'var(--bg-warm)', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav className="navbar" id="internal-navbar">
        <div className="navbar-logo">
          <div className="logo-mark">S</div>
          The Saathy
        </div>
      </nav>

      <div className="page-content" style={{ maxWidth: '720px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>
            Saathy Internal Tools
          </h1>
          <p style={{ color: 'var(--charcoal-soft)', maxWidth: '480px', margin: '0 auto', fontSize: '0.9rem' }}>
            For authorized Saathy team members only. For testing and demo purposes.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {/* Listener Dashboard Card */}
          <div className="card" id="card-listener-dashboard" style={{ padding: 'var(--space-6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
              <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--teal-glow)', color: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Headphones size={22} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 2 }}>Saathy Listener Dashboard</h3>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-soft)', marginBottom: 'var(--space-3)', lineHeight: 1.5 }}>
              View incoming session queue, accept sessions, access user-approved memory summaries, and write session notes.
            </p>
            <div style={{ 
              background: 'var(--teal-glow)', 
              borderRadius: 'var(--radius-sm)', 
              padding: 'var(--space-2) var(--space-3)', 
              fontSize: '0.8rem', 
              color: 'var(--charcoal-soft)', 
              marginBottom: 'var(--space-4)',
              display: 'inline-block'
            }}>
              Demo login: <code style={{ fontWeight: 600, color: 'var(--teal)' }}>listener@saathy.in</code>
            </div>
            <div>
              <Link href="/listener-dashboard" className="btn btn-primary btn-pill" id="btn-open-listener">
                Open Listener Dashboard →
              </Link>
            </div>
          </div>

          {/* Moderator Dashboard Card */}
          <div className="card" id="card-moderator-dashboard" style={{ padding: 'var(--space-6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
              <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--danger-light)', color: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Shield size={22} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 2 }}>Safety Moderator Dashboard</h3>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-soft)', marginBottom: 'var(--space-3)', lineHeight: 1.5 }}>
              Review safety flags, resolve reports, manage grievances, and view the audit log.
            </p>
            <div style={{ 
              background: 'var(--danger-light)', 
              borderRadius: 'var(--radius-sm)', 
              padding: 'var(--space-2) var(--space-3)', 
              fontSize: '0.8rem', 
              color: 'var(--charcoal-soft)', 
              marginBottom: 'var(--space-4)',
              display: 'inline-block'
            }}>
              Demo login: <code style={{ fontWeight: 600, color: 'var(--danger)' }}>moderator@saathy.in</code>
            </div>
            <div>
              <Link href="/moderator-dashboard" className="btn btn-primary btn-pill" id="btn-open-moderator">
                Open Moderator Dashboard →
              </Link>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div style={{ textAlign: 'center', marginTop: 'var(--space-8)', marginBottom: 'var(--space-8)' }}>
          <Link href="/" style={{ color: 'var(--charcoal-muted)', fontSize: '0.9rem', textDecoration: 'none' }} id="link-back-to-site">
            <ArrowLeft size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
            Return to main site
          </Link>
        </div>
      </div>
    </div>
  );
}
