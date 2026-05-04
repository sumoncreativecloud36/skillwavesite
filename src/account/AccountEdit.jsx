import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { supabase } from '../lib/supabase.js';

export default function AccountEdit() {
  const { user } = useOutletContext();
  const [fullName, setFullName] = useState(user.user_metadata?.full_name || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  async function saveProfile(e) {
    e.preventDefault();
    setBusy(true); setMsg(''); setErr('');
    const updates = { data: { full_name: fullName } };
    if (phone && phone !== user.phone) updates.phone = phone;
    const { error } = await supabase.auth.updateUser(updates);
    setBusy(false);
    if (error) setErr(error.message);
    else setMsg('প্রোফাইল আপডেট হয়েছে।');
  }

  async function changePassword(e) {
    e.preventDefault();
    setErr(''); setMsg('');
    if (pw !== pw2) { setErr('পাসওয়ার্ড মিলছে না'); return; }
    if (pw.length < 6) { setErr('পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে'); return; }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setBusy(false);
    if (error) setErr(error.message);
    else { setMsg('পাসওয়ার্ড পরিবর্তন হয়েছে।'); setPw(''); setPw2(''); }
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={saveProfile}
        className="rounded-2xl p-7 space-y-5"
        style={{ background: '#0D1526CC', border: '1px solid #00D4FF22', backdropFilter: 'blur(8px)' }}
      >
        <h1 className="text-white" style={{ fontFamily: 'Hind Siliguri, Poppins', fontWeight: 700, fontSize: 24 }}>
          ✏️ Edit Profile
        </h1>
        <Field label="Full Name">
          <input className="input-dark" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </Field>
        <Field label="Email (read-only)">
          <input className="input-dark opacity-60" value={user.email || ''} readOnly />
        </Field>
        <Field label="Phone">
          <input className="input-dark" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="8801XXXXXXXXX" />
        </Field>
        <button type="submit" disabled={busy} className="btn-primary">
          {busy ? 'সংরক্ষণ হচ্ছে...' : 'Save Changes'}
        </button>
      </form>

      <form
        onSubmit={changePassword}
        className="rounded-2xl p-7 space-y-5"
        style={{ background: '#0D1526CC', border: '1px solid #00D4FF22', backdropFilter: 'blur(8px)' }}
      >
        <h2 className="text-white" style={{ fontFamily: 'Hind Siliguri, Poppins', fontWeight: 600, fontSize: 20 }}>
          🔒 Change Password
        </h2>
        <Field label="New Password">
          <input type="password" className="input-dark" value={pw} onChange={(e) => setPw(e.target.value)} />
        </Field>
        <Field label="Confirm Password">
          <input type="password" className="input-dark" value={pw2} onChange={(e) => setPw2(e.target.value)} />
        </Field>
        <button type="submit" disabled={busy || !pw} className="btn-primary">
          {busy ? '...' : 'Update Password'}
        </button>
      </form>

      {msg && <div className="text-sm" style={{ color: '#10B981' }}>{msg}</div>}
      {err && <div className="text-sm text-red-400">{err}</div>}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm" style={{ color: '#A0AEC0' }}>{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
