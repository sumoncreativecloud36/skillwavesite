import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase.js';

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) return;
      const { data: row } = await supabase
        .from('admins').select('user_id').eq('user_id', data.session.user.id).maybeSingle();
      if (row) nav('/admin', { replace: true });
    })();
  }, [nav]);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setErr('');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: pw });
    if (error) {
      setBusy(false);
      setErr(error.message);
      return;
    }
    const { data: row } = await supabase
      .from('admins').select('user_id').eq('user_id', data.user.id).maybeSingle();
    setBusy(false);
    if (!row) {
      await supabase.auth.signOut();
      setErr('এই অ্যাকাউন্টের অ্যাডমিন অ্যাক্সেস নেই।');
      return;
    }
    nav('/admin', { replace: true });
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(45deg, rgba(107,110,202,0.10), rgba(65,185,248,0.10))' }}
    >
      <form
        onSubmit={submit}
        className="w-full max-w-md p-8 space-y-5 rounded-2xl"
        style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 24px 60px -20px rgba(107,110,202,0.25)' }}
      >
        <div className="text-center">
          <h1 className="gradient-text" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 26 }}>
            SkillWave অ্যাডমিন
          </h1>
          <p className="text-sm mt-2" style={{ color: '#6B7280' }}>
            শুধু অ্যাডমিনদের জন্য। স্টুডেন্টরা <Link to="/login" className="gradient-text" style={{ fontWeight: 600 }}>এখানে</Link> লগইন করুন।
          </p>
        </div>
        <label className="block">
          <span className="text-sm font-medium" style={{ color: '#374151' }}>ইমেইল</span>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input-dark mt-1" placeholder="admin@skillwave.com" />
        </label>
        <label className="block">
          <span className="text-sm font-medium" style={{ color: '#374151' }}>পাসওয়ার্ড</span>
          <input type="password" required value={pw} onChange={(e) => setPw(e.target.value)} className="input-dark mt-1" placeholder="••••••••" />
        </label>
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <button type="submit" disabled={busy} className="btn-gradient w-full justify-center">
          {busy ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
        </button>
      </form>
    </div>
  );
}
