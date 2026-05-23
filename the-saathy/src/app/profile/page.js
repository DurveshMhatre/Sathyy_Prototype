'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, CreditCard, Brain, Settings, ChevronRight, LogOut, Trash2, Bell, AlertTriangle } from 'lucide-react';
import { getUser, clearAll } from '@/lib/storage';

export default function ProfilePage() {
  const [user, setUserState] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    setMounted(true);
    const userData = getUser();
    if (!userData) { window.location.href = '/signup'; return; }
    setUserState(userData);
  }, []);

  const handleLogout = () => {
    clearAll();
    window.location.href = '/';
  };

  if (!mounted || !user) return null;

  const menuItems = [
    { icon: Lock, label: 'Privacy Center', desc: 'Consents, data, sessions', href: '/privacy', color: 'var(--teal-glow)', iconColor: 'var(--teal)' },
    { icon: Brain, label: 'Saathy Memory', desc: 'View & manage what Saathy remembers', href: '/memory', color: 'var(--gold-light)', iconColor: 'var(--gold)' },
    { icon: Shield, label: 'Safety Net', desc: 'Helplines, report, and support', href: '/safety', color: 'var(--danger-light)', iconColor: 'var(--danger)' },
    { icon: CreditCard, label: 'Plans & Payments', desc: 'Manage your subscription', href: '/payments', color: 'var(--saffron-glow)', iconColor: 'var(--saffron)' },
    { icon: Bell, label: 'Notifications', desc: 'Check-in reminders and alerts', href: '#', color: 'var(--info-light)', iconColor: 'var(--info)' },
    { icon: Settings, label: 'App Settings', desc: 'Language, display, accessibility', href: '#', color: 'var(--bg-sand)', iconColor: 'var(--charcoal-soft)' },
  ];

  return (
    <div style={{ background: 'var(--bg-warm)', minHeight: '100vh' }}>
      <nav className="navbar" id="profile-navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Link href="/dashboard" className="btn btn-icon btn-ghost"><ArrowLeft size={20} /></Link>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>Profile & Settings</span>
        </div>
      </nav>

      <div className="page-content" style={{ maxWidth: 'var(--max-width-narrow)', margin: '0 auto' }}>
        {/* Profile Card */}
        <div className="card animate-fadeInUp" style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }} id="profile-card">
          <div className="profile-avatar">{user.name?.charAt(0)?.toUpperCase() || '?'}</div>
          <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-1)' }}>{user.name}</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-muted)' }}>
            {user.anonymous ? 'Anonymous mode' : user.mobile}
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center', marginTop: 'var(--space-3)', flexWrap: 'wrap' }}>
            {user.language?.map(lang => (
              <span className="badge badge-teal" key={lang}>{lang}</span>
            ))}
            {user.city && <span className="badge badge-muted">{user.city}</span>}
          </div>
        </div>

        {/* Profile details */}
        <div className="card" style={{ marginBottom: 'var(--space-4)' }} id="profile-details">
          <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-3)' }}>Your Info</h4>
          <div className="profile-item">
            <span className="profile-item-label">Gender</span>
            <span className="profile-item-value">{user.gender || 'Not set'}</span>
          </div>
          <div className="profile-item">
            <span className="profile-item-label">Reason for joining</span>
            <span className="profile-item-value">{user.reason || 'Not set'}</span>
          </div>
          <div className="profile-item">
            <span className="profile-item-label">Listener preference</span>
            <span className="profile-item-value">{user.genderPreference || 'Any'}</span>
          </div>
          <div className="profile-item" style={{ borderBottom: 'none' }}>
            <span className="profile-item-label">Same listener continuity</span>
            <span className="profile-item-value">{user.sameListener ? 'Yes' : 'No'}</span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-2" id="profile-menu">
          {menuItems.map((item, i) => (
            <Link key={i} href={item.href} className="card card-interactive" 
              style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', textDecoration: 'none', color: 'inherit', padding: 'var(--space-3) var(--space-4)' }}
              id={`menu-${item.label.toLowerCase().replace(/\s/g, '-')}`}>
              <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: item.color, color: item.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <item.icon size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{item.label}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--charcoal-muted)' }}>{item.desc}</div>
              </div>
              <ChevronRight size={16} style={{ color: 'var(--charcoal-muted)' }} />
            </Link>
          ))}
        </div>

        {/* Internal Tools (Development & Testing) */}
        <div className="card" style={{ marginTop: 'var(--space-4)', borderTop: '2px dashed var(--bg-sand)', paddingTop: 'var(--space-4)' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--charcoal-muted)', marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Development & Testing
          </p>
          <Link href="/internal" className="btn btn-outline btn-sm btn-full" style={{ marginBottom: 'var(--space-2)' }}>
            Internal Tools (Demo)
          </Link>
        </div>

        {/* Logout */}
        <div style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
          {!showLogoutConfirm ? (
            <button className="btn btn-outline btn-full" onClick={() => setShowLogoutConfirm(true)} id="btn-logout"
              style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>
              <LogOut size={16} /> Sign Out
            </button>
          ) : (
            <div className="card" style={{ border: '1px solid var(--danger)', padding: 'var(--space-4)' }} id="logout-confirm">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <AlertTriangle size={20} style={{ color: 'var(--warning)', flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-soft)' }}>
                  Logging out will clear your local session. Your data is safe and you can log back in.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <button className="btn btn-outline btn-full" onClick={() => setShowLogoutConfirm(false)}
                  style={{ flex: 1 }}>
                  Cancel
                </button>
                <button className="btn btn-full" onClick={handleLogout}
                  style={{ flex: 1, background: 'var(--danger)', color: 'white', border: 'none' }}>
                  <LogOut size={14} /> Confirm Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
