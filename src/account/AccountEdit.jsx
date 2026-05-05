import { useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Avatar from '../components/Avatar.jsx';
import { supabase, uploadFile } from '../lib/supabase.js';

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
    <div className="space-y-5 sm:space-y-6">
      <AvatarUpload user={user} />
      <form
        onSubmit={saveProfile}
        className="rounded-2xl p-5 sm:p-7 space-y-5"
        style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 6px 20px -10px rgba(107,110,202,0.18)' }}
      >
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 22, color: '#010202' }}>
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
        <button type="submit" disabled={busy} className="btn-gradient">
          {busy ? 'সংরক্ষণ হচ্ছে...' : 'Save Changes'}
        </button>
      </form>

      <form
        onSubmit={changePassword}
        className="rounded-2xl p-5 sm:p-7 space-y-5"
        style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 6px 20px -10px rgba(107,110,202,0.18)' }}
      >
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 18, color: '#010202' }}>
          🔒 Change Password
        </h2>
        <Field label="New Password">
          <input type="password" className="input-dark" value={pw} onChange={(e) => setPw(e.target.value)} />
        </Field>
        <Field label="Confirm Password">
          <input type="password" className="input-dark" value={pw2} onChange={(e) => setPw2(e.target.value)} />
        </Field>
        <button type="submit" disabled={busy || !pw} className="btn-gradient">
          {busy ? '...' : 'Update Password'}
        </button>
      </form>

      {msg && <div className="text-sm" style={{ color: '#059669' }}>{msg}</div>}
      {err && <div className="text-sm text-red-600">{err}</div>}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium" style={{ color: '#374151' }}>{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function AvatarUpload({ user }) {
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  async function handle(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true); setErr('');
    try {
      const url = await uploadFile(file, 'avatars');
      const { error } = await supabase.auth.updateUser({ data: { avatar_url: url } });
      if (error) throw error;
      window.location.reload();
    } catch (ex) {
      setErr(ex.message || 'Upload failed');
    } finally {
      setBusy(false);
    }
  }

  async function removeAvatar() {
    setBusy(true); setErr('');
    const { error } = await supabase.auth.updateUser({ data: { avatar_url: null } });
    setBusy(false);
    if (error) setErr(error.message);
    else window.location.reload();
  }

  return (
    <div
      className="rounded-2xl p-5 sm:p-7 flex items-center gap-4 sm:gap-6 flex-wrap"
      style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 6px 20px -10px rgba(107,110,202,0.18)' }}
    >
      <Avatar user={user} size={88} />
      <div className="flex-1 min-w-0">
        <div className="font-semibold mb-1" style={{ fontFamily: 'Poppins', fontSize: 16, color: '#010202' }}>
          Profile Picture
        </div>
        <div className="text-xs mb-3" style={{ color: '#6B7280' }}>
          JPG, PNG বা GIF (সর্বোচ্চ ~2MB)
        </div>
        <div className="flex gap-2 flex-wrap">
          <button type="button" onClick={() => fileRef.current?.click()} disabled={busy} className="btn-gradient text-sm">
            {busy ? 'আপলোড হচ্ছে...' : '📷 ছবি আপলোড'}
          </button>
          {user.user_metadata?.avatar_url && (
            <button type="button" onClick={removeAvatar} disabled={busy} className="btn-outline text-sm">
              মুছুন
            </button>
          )}
        </div>
        {err && <div className="text-xs mt-2 text-red-600">{err}</div>}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handle} />
      </div>
    </div>
  );
}
