import { useRef, useState } from 'react';
import { uploadFile } from '../lib/supabase.js';

export function PanelHeader({ title, desc }) {
  return (
    <div className="mb-6">
      <h1 className="gradient-text font-bold text-2xl">{title}</h1>
      {desc && <p className="text-ink-muted text-sm mt-1">{desc}</p>}
    </div>
  );
}

export function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="text-sm text-ink-muted">{label}</span>
      <div className="mt-1">{children}</div>
      {hint && <span className="text-xs text-ink-muted mt-1 block">{hint}</span>}
    </label>
  );
}

export function ImageUploader({ value, onChange, folder = 'uploads', label = 'ছবি আপলোড' }) {
  const ref = useRef();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

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
      <div className="flex items-center gap-3 flex-wrap">
        {value && <img src={value} alt="" className="w-20 h-20 object-cover rounded-lg" style={{ border: '1px solid #00D4FF33' }} />}
        <input ref={ref} type="file" accept="image/*" onChange={handle} className="hidden" />
        <button type="button" onClick={() => ref.current?.click()} className="btn-outline !text-sm" disabled={busy}>
          {busy ? 'আপলোড হচ্ছে...' : label}
        </button>
        {value && (
          <button type="button" onClick={() => onChange('')} className="text-sm text-red-400 hover:underline">
            মুছুন
          </button>
        )}
      </div>
      {err && <div className="text-red-400 text-xs">{err}</div>}
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
      className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg text-sm"
      style={{ background: '#0D1526', border: '1px solid #00D4FF', color: '#00D4FF' }}
    >
      {msg}
    </div>
  );
}
