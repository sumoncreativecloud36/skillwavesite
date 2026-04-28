import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase.js';

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) nav('/admin', { replace: true });
    });
  }, [nav]);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setErr('');
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
    setBusy(false);
    if (error) setErr(error.message);
    else nav('/admin', { replace: true });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={submit}
        className="card w-full max-w-md p-8 space-y-5"
        style={{ background: '#0D1526' }}
      >
        <div className="text-center">
          <h1 className="gradient-text font-bold text-2xl">SkillWave অ্যাডমিন</h1>
          <p className="text-ink-muted text-sm mt-2">লগইন করুন আপনার অ্যাকাউন্টে</p>
        </div>
        <div className="space-y-3">
          <label className="block">
            <span className="text-sm text-ink-muted">ইমেইল</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-dark mt-1"
              placeholder="admin@skillwave.com"
            />
          </label>
          <label className="block">
            <span className="text-sm text-ink-muted">পাসওয়ার্ড</span>
            <input
              type="password"
              required
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="input-dark mt-1"
              placeholder="••••••••"
            />
          </label>
        </div>
        {err && <div className="text-red-400 text-sm">{err}</div>}
        <button type="submit" disabled={busy} className="btn-primary w-full justify-center">
          {busy ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
        </button>
      </form>
    </div>
  );
}
