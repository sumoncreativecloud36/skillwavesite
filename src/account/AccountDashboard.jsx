import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { supabase } from '../lib/supabase.js';

function initials(name = '', email = '') {
  const src = name || email || '';
  return src.trim().split(/\s+|@/).slice(0, 2).map((s) => s[0]?.toUpperCase()).join('') || 'SW';
}

export default function AccountDashboard() {
  const { user } = useOutletContext();
  const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Student';

  return (
    <div className="space-y-6">
      <div
        className="rounded-2xl p-7"
        style={{ background: '#0D1526CC', border: '1px solid #00D4FF22', backdropFilter: 'blur(8px)' }}
      >
        <div className="flex items-center gap-6 flex-wrap">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center font-bold shrink-0"
            style={{ background: '#00D4FF22', color: '#00D4FF', border: '2px solid #00D4FF', fontFamily: 'Poppins', fontSize: 36 }}
          >
            {initials(name, user.email)}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-white" style={{ fontFamily: 'Hind Siliguri, Poppins', fontWeight: 700, fontSize: 32 }}>
              {name}
            </h1>
            <div className="flex flex-wrap gap-x-8 gap-y-2 mt-3 text-sm" style={{ color: '#A0AEC0' }}>
              {user.email && <span>✉ {user.email}</span>}
              {user.phone && <span>📞 +{user.phone}</span>}
            </div>
          </div>
        </div>
      </div>

      <VerificationCard user={user} />
    </div>
  );
}

function VerificationCard({ user }) {
  const [busy, setBusy] = useState(null);
  const [msg, setMsg] = useState('');

  async function verifyEmail() {
    setBusy('email');
    setMsg('');
    const { error } = await supabase.auth.resend({ type: 'signup', email: user.email });
    setBusy(null);
    setMsg(error ? `Error: ${error.message}` : 'যাচাইকরণ ইমেইল পাঠানো হয়েছে। ইনবক্স দেখুন।');
  }
  async function verifyPhone() {
    setBusy('phone');
    setMsg('');
    const { error } = await supabase.auth.signInWithOtp({ phone: '+' + user.phone });
    setBusy(null);
    setMsg(error ? `Error: ${error.message}` : 'OTP পাঠানো হয়েছে আপনার ফোনে।');
  }

  return (
    <div
      className="rounded-2xl p-7"
      style={{ background: '#0D1526CC', border: '1px solid #00D4FF22', backdropFilter: 'blur(8px)' }}
    >
      <h2 className="text-white mb-5 flex items-center gap-2" style={{ fontFamily: 'Hind Siliguri, Poppins', fontWeight: 600, fontSize: 20 }}>
        🛡️ Verification Status
      </h2>
      {user.phone && (
        <Row
          label={`+${user.phone}`}
          verified={!!user.phone_confirmed_at}
          onVerify={verifyPhone}
          busy={busy === 'phone'}
          actionLabel="Verify Phone"
        />
      )}
      <Row
        label={user.email}
        verified={!!user.email_confirmed_at}
        onVerify={verifyEmail}
        busy={busy === 'email'}
        actionLabel="Verify Email"
      />
      {msg && <div className="text-sm mt-4" style={{ color: '#A0AEC0' }}>{msg}</div>}
    </div>
  );
}

function Row({ label, verified, onVerify, busy, actionLabel }) {
  return (
    <div className="flex items-center justify-between py-4 flex-wrap gap-3" style={{ borderTop: '1px solid #00D4FF15' }}>
      <div className="flex items-center gap-3">
        <span className="text-white">{label}</span>
        <span
          className="text-xs px-3 py-1 rounded-full font-semibold"
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
        <button onClick={onVerify} disabled={busy} className="btn-primary text-sm">
          {busy ? '...' : actionLabel}
        </button>
      )}
    </div>
  );
}
