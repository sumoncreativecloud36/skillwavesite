import { useRef, useState } from 'react';
import { uploadFile } from '../lib/supabase.js';

export function PanelHeader({ title, desc }) {
  return (
    <div className="mb-6">
      <h1 className="gradient-text" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 26 }}>
        {title}
      </h1>
      {desc && <p className="text-sm mt-1" style={{ color: '#9CA3AF' }}>{desc}</p>}
    </div>
  );
}

export function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="text-sm font-medium" style={{ color: '#D1D5DB' }}>{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="text-xs mt-1 block" style={{ color: '#6B7280' }}>{hint}</span>}
    </label>
  );
}

const PREVIEW_BY_FOLDER = {
  ebooks: { width: 96, aspectRatio: '512 / 800', objectFit: 'contain', background: '#0F172A' },
  courses: { width: 144, aspectRatio: '16 / 9', objectFit: 'cover', background: '#0F172A' },
  hero: { width: 160, aspectRatio: '16 / 9', objectFit: 'cover', background: '#0F172A' },
};

export function ImageUploader({ value, onChange, folder = 'uploads', label = 'ছবি আপলোড' }) {
  const ref = useRef();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const preview = PREVIEW_BY_FOLDER[folder] || { width: 96, aspectRatio: '1 / 1', objectFit: 'cover', background: '#0F172A' };

  async function handle(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr('');
    try {
      const url = await uploadFile(file, folder);
      onChange(url);
    } catch (ex) {
      setErr(ex.message || 'আপলোড ব্যর্থ');
    }
    setBusy(false);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-4 flex-wrap">
        <div
          className="rounded-lg overflow-hidden flex items-center justify-center shrink-0"
          style={{
            width: preview.width,
            aspectRatio: preview.aspectRatio,
            background: preview.background,
            border: `1px dashed ${value ? '#41B9F855' : '#374151'}`,
          }}
        >
          {value ? (
            <img src={value} alt="" className="w-full h-full" style={{ objectFit: preview.objectFit }} />
          ) : (
            <span className="text-3xl opacity-40">🖼</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input ref={ref} type="file" accept="image/*" onChange={handle} className="hidden" />
          <button type="button" onClick={() => ref.current?.click()} className="btn-outline !text-sm" disabled={busy}>
            {busy ? 'আপলোড হচ্ছে...' : (value ? '🔄 পরিবর্তন' : `📷 ${label}`)}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-sm rounded-lg px-3 py-1.5 transition-colors"
              style={{ background: 'rgba(239,68,68,0.10)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.35)' }}
            >
              🗑 মুছুন
            </button>
          )}
        </div>
      </div>
      {err && <div className="text-xs" style={{ color: '#F87171' }}>{err}</div>}
      {value && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input-dark !text-xs"
          placeholder="বা একটি URL পেস্ট করুন"
        />
      )}
    </div>
  );
}

export function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div
      className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg text-sm shadow-lg"
      style={{ background: '#111827', border: '1px solid #41B9F8', color: '#41B9F8' }}
    >
      {msg}
    </div>
  );
}
