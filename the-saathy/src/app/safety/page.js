'use client';
import Link from 'next/link';
import { ArrowLeft, Phone, Shield, Flag, Ban, Trash2, AlertTriangle, Heart, ExternalLink } from 'lucide-react';
import { getHelplines } from '@/lib/safety';

export default function SafetyPage() {
  const helplines = getHelplines();

  return (
    <div style={{ background: 'var(--bg-warm)', minHeight: '100vh' }}>
      <nav className="navbar" id="safety-navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Link href="/dashboard" className="btn btn-icon btn-ghost"><ArrowLeft size={20} /></Link>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>Safety Net</span>
        </div>
      </nav>

      <div className="page-content" style={{ maxWidth: 'var(--max-width-narrow)', margin: '0 auto' }}>
        {/* Hero */}
        <div className="safety-hero animate-fadeInUp" id="safety-hero">
          <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-full)', background: 'var(--danger-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)' }}>
            <Heart size={32} style={{ color: 'var(--danger)' }} />
          </div>
          <h1>You are not alone. Help is here.</h1>
          <p style={{ color: 'var(--charcoal-soft)', marginTop: 'var(--space-2)' }}>
            These resources are always free. No paywall. No login required.
          </p>
        </div>

        {/* Emergency Numbers */}
        <div id="emergency-numbers">
          <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <AlertTriangle size={18} style={{ color: 'var(--danger)' }} />
            India Emergency Resources
          </h3>
          <div className="flex flex-col gap-3">
            {helplines.map((h, i) => (
              <a key={i} href={`tel:${h.number.replace(/[^0-9]/g, '')}`} className="emergency-card" id={`helpline-${i}`}
                style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-full)', background: 'rgba(217,79,79,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={22} style={{ color: 'var(--danger)' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{h.name}</div>
                  <div className="emergency-number" style={{ fontSize: '1.4rem' }}>{h.number}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--charcoal-soft)' }}>{h.description}</div>
                </div>
                <ExternalLink size={16} style={{ color: 'var(--charcoal-muted)' }} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginTop: 'var(--space-8)' }} id="safety-actions">
          <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-3)' }}>Quick Actions</h3>
          <div className="flex flex-col gap-3">
            <button className="card card-interactive" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', textAlign: 'left', width: '100%', cursor: 'pointer' }} id="btn-report">
              <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--warning-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--warning)', flexShrink: 0 }}>
                <Flag size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Report a Saathy Listener or user</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--charcoal-muted)' }}>Always free, always accessible</div>
              </div>
            </button>

            <button className="card card-interactive" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', textAlign: 'left', width: '100%', cursor: 'pointer' }} id="btn-block">
              <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--danger-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--danger)', flexShrink: 0 }}>
                <Ban size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Block a user</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--charcoal-muted)' }}>Always free, always accessible</div>
              </div>
            </button>

            <Link href="/privacy" className="card card-interactive" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', textDecoration: 'none', color: 'inherit' }} id="btn-delete-data">
              <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--info-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--info)', flexShrink: 0 }}>
                <Trash2 size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Delete my data</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--charcoal-muted)' }}>Go to privacy dashboard</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Legal copy */}
        <div className="card" style={{ marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)', textAlign: 'center' }} id="safety-legal">
          <Shield size={20} style={{ color: 'var(--charcoal-muted)', margin: '0 auto var(--space-2)' }} />
          <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-muted)', lineHeight: 1.5 }}>
            Saathy is not an emergency or medical service. If you are in immediate danger, 
            contact emergency services or a trusted person near you.
          </p>
        </div>
      </div>
    </div>
  );
}
