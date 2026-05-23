'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Users, BookOpen, Activity, Brain, Shield, Settings, Heart, Calendar, ChevronRight, Bell } from 'lucide-react';
import { getUser, getPulseStreak, getShowingUpDays, markShowedUp, getPulseEntries } from '@/lib/storage';
import { getGreeting } from '@/lib/mockData';

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function DashboardPage() {
  const [user, setUserState] = useState(null);
  const [streak, setStreak] = useState(0);
  const [showingUpDays, setShowingUpDays] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    setMounted(true);
    const userData = getUser();
    if (!userData) {
      window.location.href = '/signup';
      return;
    }
    setUserState(userData);
    setStreak(getPulseStreak());
    setShowingUpDays(getShowingUpDays());
    markShowedUp();

    // Check if pulse not done and it's after 7pm
    const hour = new Date().getHours();
    const today = new Date().toISOString().split('T')[0];
    const pulseEntries = getPulseEntries();
    const doneTodayPulse = pulseEntries.some(e => e.createdAt && e.createdAt.split('T')[0] === today);
    if (hour >= 19 && !doneTodayPulse) {
      setShowNotification(true);
    }
  }, []);

  if (!mounted || !user) return null;

  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1);
  
  const weekDays = DAYS_OF_WEEK.map((name, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    return {
      name,
      date: dateStr,
      active: showingUpDays.includes(dateStr),
      isToday: dateStr === today.toISOString().split('T')[0],
    };
  });

  const daysShowedUp = weekDays.filter(d => d.active).length;

  return (
    <div className="page-wrapper" style={{ background: 'var(--bg-warm)' }}>
      {/* Navbar */}
      <nav className="navbar" id="dashboard-navbar">
        <div className="navbar-logo">
          <div className="logo-mark">S</div>
          The Saathy
        </div>
        <div className="navbar-actions">
          <span style={{ fontSize: '0.8rem', color: 'var(--charcoal-muted)' }}>
            Hi, {user.name.split(' ')[0]}
          </span>
          <Link href="/safety" className="btn btn-icon btn-ghost" id="nav-safety">
            <Shield size={20} />
          </Link>
          <Link href="/profile" className="btn btn-icon btn-ghost" id="nav-profile">
            <Settings size={20} />
          </Link>
        </div>
      </nav>

      <div className="page-content" style={{ maxWidth: 'var(--max-width-narrow)', margin: '0 auto' }}>
        {/* Greeting */}
        <div className="greeting-section" id="greeting-section">
          <h1 className="greeting-text">{getGreeting(user.name)}</h1>
          <p className="greeting-sub">How are you showing up for yourself today?</p>
        </div>

        {/* Gentle notification */}
        {showNotification && (
          <div className="card card-saffron animate-fadeInUp" id="pulse-reminder" 
            style={{ marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <Bell size={20} style={{ color: 'var(--saffron)', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>Your Saathy check-in is open</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-soft)' }}>30 seconds only. Just say how you feel.</p>
            </div>
            <Link href="/pulse" className="btn btn-primary btn-sm btn-pill">Check in</Link>
          </div>
        )}

        {/* Quick Actions Grid */}
        <div className="dashboard-grid" id="dashboard-grid">
          {/* Daily Pulse */}
          <Link href="/pulse" className="dashboard-card card-saffron" id="card-pulse" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="dashboard-card-icon" style={{ background: 'var(--saffron-glow)', color: 'var(--saffron)' }}>
              <Activity size={20} />
            </div>
            <h4>Daily Pulse</h4>
            <p>30-second check-in</p>
            {streak > 0 && (
              <div className="badge badge-saffron" style={{ marginTop: 'var(--space-2)' }}>
                🔥 {streak} day streak
              </div>
            )}
          </Link>

          {/* Saathy AI */}
          <Link href="/chat" className="dashboard-card card-teal" id="card-ai" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="dashboard-card-icon" style={{ background: 'var(--teal-glow)', color: 'var(--teal)' }}>
              <Sparkles size={20} />
            </div>
            <h4>Saathy AI</h4>
            <p>Talk to your companion</p>
          </Link>

          {/* Book a Listener */}
          <Link href="/book-listener" className="dashboard-card" id="card-listener" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="dashboard-card-icon" style={{ background: 'rgba(196, 99, 61, 0.1)', color: 'var(--terracotta)' }}>
              <Users size={20} />
            </div>
            <h4>Book a Listener</h4>
            <p>Human connection</p>
            <div className="badge badge-success" style={{ marginTop: 'var(--space-2)' }}>
              3 available now
            </div>
          </Link>

          {/* Journal */}
          <Link href="/journal" className="dashboard-card" id="card-journal" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="dashboard-card-icon" style={{ background: 'var(--info-light)', color: 'var(--info)' }}>
              <BookOpen size={20} />
            </div>
            <h4>Journal</h4>
            <p>Write freely, privately</p>
          </Link>

          {/* Memory */}
          <Link href="/memory" className="dashboard-card full-width" id="card-memory" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div className="dashboard-card-icon" style={{ background: 'var(--gold-light)', color: 'var(--gold)', marginBottom: 0 }}>
                <Brain size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <h4>Saathy Memory</h4>
                <p>View what Saathy remembers about you</p>
              </div>
              <ChevronRight size={20} style={{ color: 'var(--charcoal-muted)' }} />
            </div>
          </Link>
        </div>

        {/* Showing Up Path */}
        <div className="card" style={{ marginTop: 'var(--space-4)' }} id="showing-up-section">
          <h4 style={{ marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Heart size={16} style={{ color: 'var(--saffron)' }} />
            Showing Up Path
          </h4>
          <div className="showing-up-path">
            {weekDays.map((day, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1 }}>
                <div className={`day-dot ${day.active ? 'active' : ''} ${day.isToday ? 'today' : ''}`}>
                  {day.active ? '✓' : day.name.charAt(0)}
                </div>
                <span style={{ fontSize: '0.65rem', color: 'var(--charcoal-muted)' }}>{day.name}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-soft)', marginTop: 'var(--space-2)', textAlign: 'center' }}>
            You showed up for yourself <strong>{daysShowedUp} {daysShowedUp === 1 ? 'day' : 'days'}</strong> this week.
          </p>
        </div>

        {/* Safety Quick Access */}
        <Link href="/safety" className="card" id="safety-quick-access" style={{ 
          marginTop: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
          textDecoration: 'none', color: 'inherit', marginBottom: 'var(--space-4)'
        }}>
          <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--danger-light)', color: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '0.9rem' }}>Safety Net</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-muted)' }}>Helplines, report, and support — always free</p>
          </div>
          <ChevronRight size={18} style={{ color: 'var(--charcoal-muted)' }} />
        </Link>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav" id="bottom-nav">
        <Link href="/dashboard" className="bottom-nav-item active" id="bnav-home">
          <Activity size={22} />
          Home
        </Link>
        <Link href="/chat" className="bottom-nav-item" id="bnav-chat">
          <Sparkles size={22} />
          Saathy AI
        </Link>
        <Link href="/pulse" className="bottom-nav-item" id="bnav-pulse">
          <Heart size={22} />
          Pulse
        </Link>
        <Link href="/journal" className="bottom-nav-item" id="bnav-journal">
          <BookOpen size={22} />
          Journal
        </Link>
        <Link href="/profile" className="bottom-nav-item" id="bnav-profile">
          <Settings size={22} />
          Profile
        </Link>
      </nav>
    </div>
  );
}
