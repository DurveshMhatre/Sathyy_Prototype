'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Shield, Sparkles } from 'lucide-react';
import { PLANS } from '@/lib/mockData';

export default function PaymentsPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const selectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowCheckout(true);
  };

  return (
    <div style={{ background: 'var(--bg-warm)', minHeight: '100vh' }}>
      <nav className="navbar" id="payments-navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Link href="/dashboard" className="btn btn-icon btn-ghost"><ArrowLeft size={20} /></Link>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>Plans & Pricing</span>
        </div>
      </nav>

      <div className="page-content" style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>
            Choose your Saathy plan
          </h1>
          <p style={{ color: 'var(--charcoal-soft)', maxWidth: '480px', margin: '0 auto' }}>
            Start with ₹1. Upgrade anytime. Crisis resources are always free.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-4)' }} id="plans-grid">
          {PLANS.map(plan => (
            <div className={`plan-card ${plan.featured ? 'featured' : ''}`} key={plan.id} id={`plan-${plan.id}`}>
              <div className="plan-name">{plan.name}</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-soft)', marginBottom: 'var(--space-3)' }}>{plan.description}</p>
              <div className="plan-price">
                <span className="currency">₹</span>{plan.price}
                <span className="period">{plan.period}</span>
              </div>

              <div className="plan-features">
                {plan.features.map((feature, i) => (
                  <div className="plan-feature" key={i}>
                    <Check size={16} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`btn btn-full btn-pill ${plan.featured ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => selectPlan(plan)}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Free tier note */}
        <div className="card" style={{ marginTop: 'var(--space-6)', textAlign: 'center', marginBottom: 'var(--space-4)' }} id="free-tier-note">
          <Shield size={20} style={{ color: 'var(--success)', margin: '0 auto var(--space-2)' }} />
          <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-soft)' }}>
            <strong>Always free:</strong> Crisis resources, report button, block button, data deletion, privacy controls, safety escalation, and emergency guidance.
          </p>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && selectedPlan && (
        <div className="modal-overlay" id="checkout-modal">
          <div className="modal">
            <div className="modal-header">
              <h3 style={{ fontFamily: 'var(--font-display)' }}>Complete Payment</h3>
              <button className="modal-close" onClick={() => setShowCheckout(false)}>✕</button>
            </div>

            <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span>{selectedPlan.name} Plan</span>
                <span style={{ fontWeight: 600, color: 'var(--saffron)' }}>₹{selectedPlan.price}</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--charcoal-muted)' }}>{selectedPlan.description}</div>
            </div>

            <div className="input-group" style={{ marginBottom: 'var(--space-3)' }}>
              <label className="input-label">Payment Method</label>
              <div className="choice-group">
                {['UPI (GPay / PhonePe / PayTM)', 'Credit / Debit Card', 'Net Banking'].map(method => (
                  <button key={method} className="choice-btn" style={{ fontSize: '0.9rem' }}>
                    <span className="choice-radio" /> {method}
                  </button>
                ))}
              </div>
            </div>

            <button className="btn btn-primary btn-full btn-lg btn-pill" id="btn-pay">
              <Sparkles size={18} /> Pay ₹{selectedPlan.price}
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--charcoal-muted)', marginTop: 'var(--space-3)' }}>
              Secured by Razorpay • Cancel anytime
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
