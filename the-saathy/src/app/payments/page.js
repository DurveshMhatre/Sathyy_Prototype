'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Shield, Sparkles } from 'lucide-react';
import { PLANS } from '@/lib/mockData';
import { getUser, setItem } from '@/lib/storage';

export default function PaymentsPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [user, setUserState] = useState(null);
  const [activePlan, setActivePlan] = useState(null);

  // Auth guard
  useEffect(() => {
    const userData = getUser();
    if (!userData) {
      window.location.href = '/login';
      return;
    }
    setUserState(userData);
  }, []);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const selectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowCheckout(true);
    setPaymentMethod('');
    setPaymentError('');
  };

  const handlePayment = () => {
    if (!window.Razorpay) {
      setPaymentError('Payment system is loading. Please try again in a moment.');
      return;
    }

    setPaymentLoading(true);
    setPaymentError('');

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: selectedPlan.price * 100, // Razorpay uses paise
      currency: 'INR',
      name: 'The Saathy',
      description: `${selectedPlan.name} Plan`,
      image: '',
      handler: function (response) {
        // Payment success callback
        setPaymentLoading(false);
        setPaymentSuccess(true);
        setShowCheckout(false);

        // Save plan to localStorage
        setItem('activePlan', selectedPlan);
        setActivePlan(selectedPlan);

        console.log('Payment successful:', response.razorpay_payment_id);
      },
      prefill: {
        name: user?.name || '',
        contact: user?.mobile || '',
      },
      theme: {
        color: '#E8884A', // Saffron — matches var(--saffron)
      },
      modal: {
        ondismiss: () => {
          setPaymentLoading(false);
          setPaymentError('Payment was cancelled. You can try again anytime.');
        }
      }
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        setPaymentLoading(false);
        setPaymentError(`Payment failed: ${response.error.description}. Please try again.`);
      });
      rzp.open();
    } catch (err) {
      setPaymentLoading(false);
      setPaymentError('Could not initialize payment. Please refresh and try again.');
    }
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
        {/* Payment Success State */}
        {paymentSuccess && (
          <div className="card" style={{ textAlign: 'center', marginTop: 'var(--space-6)', padding: 'var(--space-6)' }} id="payment-success">
            <Check size={32} style={{ color: 'var(--success)', margin: '0 auto var(--space-3)' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>
              Payment Successful!
            </h3>
            <p style={{ color: 'var(--charcoal-soft)', marginBottom: 'var(--space-4)' }}>
              Your {activePlan?.name} plan is now active. Welcome to your Saathy journey.
            </p>
            <Link href="/dashboard" className="btn btn-primary btn-pill">
              Go to Dashboard
            </Link>
          </div>
        )}

        {!paymentSuccess && (
          <>
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
          </>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckout && selectedPlan && (
        <div className="modal-overlay" id="checkout-modal">
          <div className="modal">
            <div className="modal-header">
              <h3 style={{ fontFamily: 'var(--font-display)' }}>Complete Payment</h3>
              <button className="modal-close" onClick={() => { setShowCheckout(false); setPaymentError(''); }}>✕</button>
            </div>

            <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span>{selectedPlan.name} Plan</span>
                <span style={{ fontWeight: 600, color: 'var(--saffron)' }}>₹{selectedPlan.price}</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--charcoal-muted)' }}>{selectedPlan.description}</div>
            </div>

            {/* Test Mode Notice */}
            <div style={{
              background: 'var(--warning-light)',
              border: '1px solid var(--warning)',
              borderRadius: 'var(--radius-sm)',
              padding: 'var(--space-2) var(--space-3)',
              fontSize: '0.8rem',
              color: 'var(--charcoal-soft)',
              marginBottom: 'var(--space-3)',
            }}>
              🧪 <strong>Test Mode:</strong> Use card number <code>4111 1111 1111 1111</code>, any future expiry, any CVV, any OTP.
            </div>

            <div className="input-group" style={{ marginBottom: 'var(--space-3)' }}>
              <label className="input-label">Payment Method</label>
              <div className="choice-group">
                {['UPI (GPay / PhonePe / PayTM)', 'Credit / Debit Card', 'Net Banking'].map(method => (
                  <button
                    key={method}
                    className={`choice-btn ${paymentMethod === method ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod(method)}
                    style={{ fontSize: '0.9rem' }}
                  >
                    <span className="choice-radio" /> {method}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="btn btn-primary btn-full btn-lg btn-pill"
              id="btn-pay"
              onClick={handlePayment}
              disabled={paymentLoading || !paymentMethod}
            >
              {paymentLoading ? (
                'Opening payment...'
              ) : (
                <><Sparkles size={18} /> Pay ₹{selectedPlan.price}</>
              )}
            </button>

            {paymentError && (
              <p style={{ color: 'var(--danger)', fontSize: '0.8rem', textAlign: 'center', marginTop: 'var(--space-2)' }}>
                {paymentError}
              </p>
            )}

            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--charcoal-muted)', marginTop: 'var(--space-3)' }}>
              Secured by Razorpay • Cancel anytime
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
