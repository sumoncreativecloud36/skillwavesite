import { useRef, useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import Avatar from '../components/Avatar.jsx';
import { supabase, uploadFile } from '../lib/supabase.js';

export default function AccountDashboard() {
  const { user } = useOutletContext();
  const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Student';

  return (
    <div className="space-y-5 sm:space-y-6">
      <ProfileHeader user={user} name={name} />
      <VerificationCard user={user} />
    </div>
  );
}

function ProfileHeader({ user, name }) {
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  async function handleFile(e) {
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

  return (
    <div
      className="rounded-2xl p-5 sm:p-7 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0D1526CC, #0A2540AA)',
        border: '1px solid #00D4FF22',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{ background: 'radial-gradient(400px 200px at 0% 0%, #00D4FF18, transparent 70%)' }}
      />
      <div className="relative flex items-center gap-4 sm:gap-6 flex-wrap">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="relative shrink-0 group"
          aria-label="edit photo"
          title="ছবি পরিবর্তন"
        >
          <Avatar user={user} size={96} />
          <span
            className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: '#0B0F1980' }}
          >
            <PencilIcon />
          </span>
          <span
            className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center"
            style={{
              background: '#0D1526',
              border: '1.5px solid #00D4FF',
              color: '#00D4FF',
              boxShadow: '0 0 0 2px #0B0F19',
            }}
          >
            {busy ? '…' : <PencilIcon size={12} />}
          </span>
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        <div className="flex-1 min-w-0">
          <h1 className="text-white" style={{ fontFamily: 'Hind Siliguri, Poppins', fontWeight: 700, fontSize: 'clamp(22px, 4.5vw, 32px)', lineHeight: 1.2 }}>
            {name}
          </h1>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-y-1 gap-x-6 mt-2 text-sm" style={{ color: '#A0AEC0' }}>
            {user.email && <span className="truncate">✉ {user.email}</span>}
            {user.phone && <span className="truncate">📞 +{user.phone}</span>}
          </div>
          {err && <div className="text-xs mt-2 text-red-400">{err}</div>}
        </div>
      </div>
    </div>
  );
}

function VerificationCard({ user }) {
  const [busy, setBusy] = useState(null);
  const [msg, setMsg] = useState('');

  async function verifyEmail() {
    setBusy('email'); setMsg('');
    const { error } = await supabase.auth.resend({ type: 'signup', email: user.email });
    setBusy(null);
    setMsg(error ? `Error: ${error.message}` : 'যাচাইকরণ ইমেইল পাঠানো হয়েছে। ইনবক্স দেখুন।');
  }
  async function verifyPhone() {
    setBusy('phone'); setMsg('');
    const { error } = await supabase.auth.signInWithOtp({ phone: '+' + user.phone });
    setBusy(null);
    setMsg(error ? `Error: ${error.message}` : 'OTP পাঠানো হয়েছে আপনার ফোনে।');
  }

  return (
    <div
      className="rounded-2xl p-5 sm:p-7"
      style={{ background: '#0D1526CC', border: '1px solid #00D4FF22', backdropFilter: 'blur(8px)' }}
    >
      <h2 className="text-white mb-4 sm:mb-5 flex items-center gap-2" style={{ fontFamily: 'Hind Siliguri, Poppins', fontWeight: 600, fontSize: 20 }}>
        <ShieldOutlineIcon /> Verification Status
      </h2>
      {user.phone && (
        <Row
          label={`+${user.phone}`}
          icon="📞"
          verified={!!user.phone_confirmed_at}
          onVerify={verifyPhone}
          busy={busy === 'phone'}
          actionLabel="Verify Phone"
        />
      )}
      <Row
        label={user.email}
        icon="✉"
        verified={!!user.email_confirmed_at}
        onVerify={verifyEmail}
        busy={busy === 'email'}
        actionLabel="Verify Email"
      />
      {msg && <div className="text-sm mt-4" style={{ color: '#A0AEC0' }}>{msg}</div>}

      <div className="mt-6 pt-5" style={{ borderTop: '1px solid #00D4FF15' }}>
        <Link to="/account/edit" className="text-sm font-semibold inline-flex items-center gap-1 hover:underline" style={{ color: '#00D4FF' }}>
          ⚙️ Edit Profile & Settings →
        </Link>
      </div>
    </div>
  );
}

function PencilIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );
}

function ShieldOutlineIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function Row({ label, icon, verified, onVerify, busy, actionLabel }) {
  return (
    <div className="flex items-center justify-between py-3 sm:py-4 flex-wrap gap-3" style={{ borderTop: '1px solid #00D4FF15' }}>
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <span style={{ color: '#A0AEC0' }}>{icon}</span>
        <span className="text-white text-sm sm:text-base truncate">{label}</span>
        <span
          className="text-xs px-3 py-1 rounded-full font-semibold shrink-0"
          style={
            verified
              ? { background: '#10B98122', color: '#10B981', border: '1px solid #10B98155' }
              : { background: '#F9731622', color: '#F97316', border: '1px solid #F9731655' }
          }
        >
          {verified ? '✓ Verified' : 'ⓘ Not Verified'}
        </span>
      </div>
      {!verified && (
        <button onClick={onVerify} disabled={busy} className="btn-primary text-xs sm:text-sm">
          {busy ? '...' : actionLabel}
        </button>
      )}
    </div>
  );
}
