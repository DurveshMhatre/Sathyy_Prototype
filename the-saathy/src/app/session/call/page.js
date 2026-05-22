'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Clock, AlertTriangle, MessageSquare } from 'lucide-react';

export default function ListenerCallSession() {
  const [timer, setTimer] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callState, setCallState] = useState('connecting');
  const [showEndConfirm, setShowEndConfirm] = useState(false);

  useEffect(() => {
    // Simulate connection
    setTimeout(() => setCallState('connected'), 2500);
  }, []);

  useEffect(() => {
    if (callState !== 'connected') return;
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [callState]);

  const formatTime = (s) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  const endCall = () => {
    setCallState('ended');
    setTimeout(() => { window.location.href = '/dashboard'; }, 2000);
  };

  return (
    <div className="call-screen" id="call-screen">
      {/* Connecting state */}
      {callState === 'connecting' && (
        <div className="animate-fadeInUp" style={{ textAlign: 'center' }}>
          <div className="call-avatar-lg">🎧</div>
          <p style={{ fontSize: '1.2rem', fontWeight: 500 }}>Connecting to your listener...</p>
          <p style={{ opacity: 0.6, marginTop: 'var(--space-2)' }}>Please wait</p>
        </div>
      )}

      {/* Connected state */}
      {callState === 'connected' && (
        <div className="animate-fadeInUp" style={{ textAlign: 'center' }}>
          <div className="call-avatar-lg">PM</div>
          <div className="call-name">Priya M.</div>
          <div className="call-timer" id="call-timer">
            <Clock size={14} style={{ display: 'inline', marginRight: '4px' }} />
            {formatTime(timer)}
          </div>

          <div className="call-controls">
            <button className={`call-btn ${isMuted ? 'call-btn-active' : 'call-btn-default'}`}
              onClick={() => setIsMuted(!isMuted)} id="btn-mute">
              {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
            </button>
            <button className={`call-btn ${isVideoOff ? 'call-btn-active' : 'call-btn-default'}`}
              onClick={() => setIsVideoOff(!isVideoOff)} id="btn-video">
              {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
            </button>
            <Link href="/session/chat" className="call-btn call-btn-default" id="btn-switch-chat">
              <MessageSquare size={24} />
            </Link>
            <button className="call-btn call-btn-end" onClick={() => setShowEndConfirm(true)} id="btn-end-call">
              <PhoneOff size={28} />
            </button>
          </div>

          <button className="btn btn-ghost" style={{ marginTop: 'var(--space-8)', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
            <AlertTriangle size={14} /> Emergency Escalation
          </button>
        </div>
      )}

      {/* Ended state */}
      {callState === 'ended' && (
        <div className="animate-fadeInUp" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: 'var(--space-3)' }}>💛</div>
          <h2 style={{ fontFamily: 'var(--font-display)' }}>Session ended</h2>
          <p style={{ opacity: 0.7, marginTop: 'var(--space-2)' }}>Thank you for showing up. Duration: {formatTime(timer)}</p>
        </div>
      )}

      {/* End call confirmation */}
      {showEndConfirm && (
        <div className="modal-overlay">
          <div className="modal" style={{ textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-3)' }}>End this session?</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-soft)', marginBottom: 'var(--space-4)' }}>
              Would you like to save a summary of this session?
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexDirection: 'column' }}>
              <button className="btn btn-primary btn-full btn-pill" onClick={endCall}>End & Save Summary</button>
              <button className="btn btn-outline btn-full btn-pill" onClick={endCall}>End Without Saving</button>
              <button className="btn btn-ghost btn-full" onClick={() => setShowEndConfirm(false)}>Continue Session</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
