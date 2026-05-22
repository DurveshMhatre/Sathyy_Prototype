'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Brain, Pencil, Trash2, Pause, Play, Eye, Clock } from 'lucide-react';
import { getMemoryItems, deleteMemoryItem, setMemoryItems, getUser } from '@/lib/storage';

export default function MemoryPage() {
  const [user, setUserState] = useState(null);
  const [items, setItems] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const userData = getUser();
    if (!userData) { window.location.href = '/signup'; return; }
    setUserState(userData);
    setItems(getMemoryItems());
  }, []);

  const deleteItem = (id) => {
    const updated = deleteMemoryItem(id);
    setItems(updated);
  };

  const deleteAll = () => {
    setMemoryItems([]);
    setItems([]);
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditText(item.text);
  };

  const saveEdit = (id) => {
    const updated = items.map(i => i.id === id ? { ...i, text: editText } : i);
    setMemoryItems(updated);
    setItems(updated);
    setEditingId(null);
  };

  if (!mounted) return null;

  const auditLog = [
    { who: 'Saathy AI', action: 'Created memory item', when: '2 days ago' },
    { who: 'You', action: 'Approved session summary', when: '3 days ago' },
    { who: 'Listener Priya M.', action: 'Viewed memory (with consent)', when: '5 days ago' },
  ];

  return (
    <div style={{ background: 'var(--bg-warm)', minHeight: '100vh' }}>
      <nav className="navbar" id="memory-navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Link href="/dashboard" className="btn btn-icon btn-ghost"><ArrowLeft size={20} /></Link>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>Saathy Memory</span>
        </div>
        <button className={`btn btn-sm btn-pill ${isPaused ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setIsPaused(!isPaused)} id="btn-pause-memory">
          {isPaused ? <><Play size={14} /> Resume</> : <><Pause size={14} /> Pause</>}
        </button>
      </nav>

      <div className="page-content" style={{ maxWidth: 'var(--max-width-narrow)', margin: '0 auto' }}>
        {isPaused && (
          <div className="card card-saffron" style={{ marginBottom: 'var(--space-4)' }} id="memory-paused-notice">
            <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>⏸ Memory is paused</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-soft)' }}>Saathy will not save any new memory items until you resume.</p>
          </div>
        )}

        <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-soft)', marginBottom: 'var(--space-4)' }}>
          These are summaries Saathy has saved — never raw conversations. You approved each one before saving.
        </p>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-12)', color: 'var(--charcoal-muted)' }} id="memory-empty">
            <Brain size={48} style={{ opacity: 0.3, marginBottom: 'var(--space-3)' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--charcoal)', marginBottom: 'var(--space-2)' }}>
              No memories yet
            </h3>
            <p style={{ fontSize: '0.9rem' }}>
              As you use Saathy, conversation summaries will appear here — always with your approval first.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-3" id="memory-items">
              {items.map(item => (
                <div className="memory-item" key={item.id} style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', border: '1px solid rgba(237,228,212,0.6)' }}>
                  <div className="memory-item-type">{item.type || 'Memory'}</div>
                  {editingId === item.id ? (
                    <div>
                      <textarea className="input-field" value={editText} onChange={e => setEditText(e.target.value)}
                        style={{ width: '100%', minHeight: '80px', marginBottom: 'var(--space-2)' }} />
                      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                        <button className="btn btn-primary btn-sm" onClick={() => saveEdit(item.id)}>Save</button>
                        <button className="btn btn-ghost btn-sm" onClick={() => setEditingId(null)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="memory-item-text">{item.text}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--charcoal-muted)', marginTop: 'var(--space-2)' }}>
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : ''}
                      </div>
                      <div className="memory-item-actions">
                        <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.75rem' }} onClick={() => startEdit(item)}>
                          <Pencil size={12} /> Edit
                        </button>
                        <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.75rem', color: 'var(--danger)' }} onClick={() => deleteItem(item.id)}>
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <button className="btn btn-danger btn-full" style={{ marginTop: 'var(--space-6)' }} onClick={deleteAll} id="btn-delete-all">
              <Trash2 size={16} /> Delete All Memory
            </button>
          </>
        )}

        {/* Audit Log */}
        <div style={{ marginTop: 'var(--space-8)' }} id="audit-log">
          <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Eye size={18} /> Access Log
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-muted)', marginBottom: 'var(--space-3)' }}>
            Who has accessed your memory
          </p>
          <div className="flex flex-col gap-2">
            {auditLog.map((entry, i) => (
              <div key={i} className="card" style={{ padding: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <Clock size={14} style={{ color: 'var(--charcoal-muted)', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 500, fontSize: '0.85rem' }}>{entry.who}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--charcoal-soft)' }}> — {entry.action}</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--charcoal-muted)' }}>{entry.when}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
