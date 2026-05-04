import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase.js';

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) nav('/account', { replace: true });
    });
  }, [nav]);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setErr('');
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
    setBusy(false);
    if (error) setErr(error.message);
    else nav('/account', { replace: true });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <Link to="/" className="mb-8" style={{ color: '#00D4FF', fontFamily: 'Poppins', fontWeight: 700, fontSize: 28 }}>
        SkillWave
      </Link>
      <form
        onSubmit={submit}
        className="w-full max-w-md p-8 space-y-5 rounded-2xl"
        style={{ background: '#0D1526CC', border: '1px solid #00D4FF22', backdropFilter: 'blur(8px)' }}
      >
        <div className="text-center">
          <h1 className="text-white" style={{ fontFamily: 'Hind Siliguri, Poppins', fontWeight: 700, fontSize: 28 }}>
            Login
          </h1>
          <p className="text-sm mt-1" style={{ color: '#A0AEC0' }}>আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
        </div>
        <label className="block">
          <span className="text-sm" style={{ color: '#A0AEC0' }}>ইমেইল</span>
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="input-dark mt-1" placeholder="you@example.com"
          />
        </label>
        <label className="block">
          <span className="text-sm" style={{ color: '#A0AEC0' }}>পাসওয়ার্ড</span>
          <input
            type="password" required value={pw} onChange={(e) => setPw(e.target.value)}
            className="input-dark mt-1" placeholder="••••••••"
          />
        </label>
        {err && <div className="text-red-400 text-sm">{err}</div>}
        <button type="submit" disabled={busy} className="btn-primary w-full justify-center">
          {busy ? 'লগইন হচ্ছে...' : 'Login'}
        </button>
        <div className="h-px w-full" style={{ background: '#00D4FF22' }} />
        <p className="text-center text-sm" style={{ color: '#A0AEC0' }}>
          অ্যাকাউন্ট নেই?{' '}
          <Link to="/signup" style={{ color: '#00D4FF', fontWeight: 600 }}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
