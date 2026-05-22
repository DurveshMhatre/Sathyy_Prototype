'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Mic, MicOff, Sparkles, Trash2, X, BookOpen } from 'lucide-react';
import { getUser, getJournalEntries, addJournalEntry, deleteJournalEntry } from '@/lib/storage';
import { MOOD_TAGS } from '@/lib/mockData';
import { getAIJournalReflection } from '@/lib/aiResponses';

export default function JournalPage() {
  const [user, setUserState] = useState(null);
  const [entries, setEntries] = useState([]);
  const [isWriting, setIsWriting] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [voiceMode, setVoiceMode] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const [reflection, setReflection] = useState('');
  const [viewEntry, setViewEntry] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const userData = getUser();
    if (!userData) { window.location.href = '/signup'; return; }
    setUserState(userData);
    setEntries(getJournalEntries());
  }, []);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const saveEntry = () => {
    if (!body.trim()) return;
    const newEntries = addJournalEntry({
      title: title.trim() || null,
      body: body.trim(),
      moodTags: selectedTags,
    });
    setEntries(newEntries);
    setTitle('');
    setBody('');
    setSelectedTags([]);
    setIsWriting(false);
  };

  const removeEntry = (id) => {
    const updated = deleteJournalEntry(id);
    setEntries(updated);
    setViewEntry(null);
  };

  const askReflection = (text) => {
    const ref = getAIJournalReflection(text);
    setReflection(ref);
    setShowReflection(true);
  };

  if (!mounted) return null;

  // Viewing a single entry
  if (viewEntry) {
    return (
      <div style={{ background: 'var(--bg-warm)', minHeight: '100vh' }}>
        <nav className="navbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <button className="btn btn-icon btn-ghost" onClick={() => setViewEntry(null)}>
              <ArrowLeft size={20} />
            </button>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>Journal Entry</span>
          </div>
          <button className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }} onClick={() => removeEntry(viewEntry.id)}>
            <Trash2 size={16} /> Delete
          </button>
        </nav>
        <div className="page-content" style={{ maxWidth: 'var(--max-width-narrow)', margin: '0 auto' }}>
          <div className="animate-fadeInUp">
            <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-muted)', marginBottom: 'var(--space-3)' }}>
              {new Date(viewEntry.createdAt).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            {viewEntry.title && (
              <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-3)' }}>{viewEntry.title}</h2>
            )}
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--charcoal-soft)', whiteSpace: 'pre-wrap' }}>{viewEntry.body}</p>
            {viewEntry.moodTags && viewEntry.moodTags.length > 0 && (
              <div className="journal-mood-tags" style={{ marginTop: 'var(--space-4)' }}>
                {viewEntry.moodTags.map(tag => (
                  <span className="mood-tag selected" key={tag}>{tag}</span>
                ))}
              </div>
            )}
            <button className="btn btn-teal btn-pill" style={{ marginTop: 'var(--space-6)' }}
              onClick={() => askReflection(viewEntry.body)}>
              <Sparkles size={16} /> Ask Saathy to reflect on this
            </button>
          </div>

          {showReflection && (
            <div className="card card-teal animate-fadeInUp" style={{ marginTop: 'var(--space-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--teal)' }}>SAATHY REFLECTS</span>
                <button className="btn btn-icon btn-ghost" style={{ width: 24, height: 24 }} onClick={() => setShowReflection(false)}>
                  <X size={14} />
                </button>
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--charcoal-soft)' }}>{reflection}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Writing mode
  if (isWriting) {
    return (
      <div style={{ background: 'var(--bg-warm)', minHeight: '100vh' }}>
        <nav className="navbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <button className="btn btn-icon btn-ghost" onClick={() => setIsWriting(false)}>
              <X size={20} />
            </button>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>New Entry</span>
          </div>
          <button className="btn btn-primary btn-sm btn-pill" onClick={saveEntry} disabled={!body.trim()}>
            Save
          </button>
        </nav>
        <div className="page-content" style={{ maxWidth: 'var(--max-width-narrow)', margin: '0 auto' }}>
          <div className="journal-editor animate-fadeInUp">
            <input className="journal-title-input" placeholder="Title (optional)" value={title} 
              onChange={e => setTitle(e.target.value)} id="journal-title" />
            <textarea className="journal-body-input" placeholder="What is on your mind today? Write freely..." 
              value={body} onChange={e => setBody(e.target.value)} id="journal-body" />
            
            {/* Voice toggle */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-2)', borderTop: '1px solid var(--bg-sand)', paddingTop: 'var(--space-3)' }}>
              <button className={`btn btn-sm ${voiceMode ? 'btn-danger' : 'btn-ghost'}`}
                onClick={() => setVoiceMode(!voiceMode)}>
                {voiceMode ? <><MicOff size={14} /> Stop recording</> : <><Mic size={14} /> Voice journal</>}
              </button>
            </div>

            {voiceMode && (
              <div className="card card-saffron" style={{ marginTop: 'var(--space-3)', fontSize: '0.85rem' }}>
                <p>🎙️ Voice journal active — your words will be transcribed here.</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--charcoal-muted)', marginTop: '4px' }}>
                  Audio is never stored. Only the transcription is saved with your consent.
                </p>
              </div>
            )}

            {/* Mood tags */}
            <div style={{ marginTop: 'var(--space-4)' }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 500, marginBottom: 'var(--space-2)' }}>
                Mood tags (choose up to 3)
              </p>
              <div className="journal-mood-tags">
                {MOOD_TAGS.map(tag => (
                  <button key={tag} className={`mood-tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
                    onClick={() => toggleTag(tag)} id={`tag-${tag.toLowerCase()}`}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Journal list view
  return (
    <div style={{ background: 'var(--bg-warm)', minHeight: '100vh' }}>
      <nav className="navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Link href="/dashboard" className="btn btn-icon btn-ghost">
            <ArrowLeft size={20} />
          </Link>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>Saathy Journal</span>
        </div>
        <button className="btn btn-primary btn-sm btn-pill" onClick={() => setIsWriting(true)} id="btn-new-entry">
          <Plus size={16} /> New Entry
        </button>
      </nav>

      <div className="page-content" style={{ maxWidth: 'var(--max-width-narrow)', margin: '0 auto' }}>
        {/* Privacy notice */}
        <div className="card card-teal" style={{ marginBottom: 'var(--space-4)', fontSize: '0.85rem' }} id="journal-privacy-notice">
          <p>🔒 Only you can see this. Saathy AI may offer reflections if you ask. Nothing is stored in your memory without your permission.</p>
        </div>

        {entries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-12)', color: 'var(--charcoal-muted)' }} id="journal-empty">
            <BookOpen size={48} style={{ opacity: 0.3, marginBottom: 'var(--space-3)' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--charcoal)', marginBottom: 'var(--space-2)' }}>
              Your journal is waiting
            </h3>
            <p style={{ fontSize: '0.9rem', marginBottom: 'var(--space-4)' }}>
              No one reads this unless you share it. Write freely.
            </p>
            <button className="btn btn-primary btn-pill" onClick={() => setIsWriting(true)}>
              <Plus size={16} /> Write your first entry
            </button>
          </div>
        ) : (
          <div>
            {entries.map(entry => (
              <div className="journal-entry" key={entry.id} onClick={() => setViewEntry(entry)} id={`entry-${entry.id}`}>
                <div className="journal-entry-date">
                  {new Date(entry.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                {entry.title && <div className="journal-entry-title">{entry.title}</div>}
                <div className="journal-entry-preview">{entry.body}</div>
                {entry.moodTags && entry.moodTags.length > 0 && (
                  <div className="journal-mood-tags">
                    {entry.moodTags.map(tag => (
                      <span className="mood-tag selected" key={tag}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
