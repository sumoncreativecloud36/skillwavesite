import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase.js';

export default function SignUp() {
  const nav = useNavigate();
  const [method, setMethod] = useState('phone'); // 'phone' | 'email'
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr('');
    if (pw !== pw2) {
      setErr('Passwords do not match');
      return;
    }
    setBusy(true);
    try {
      const credentials =
        method === 'phone'
          ? { phone: `+88${phone.replace(/^\+?88/, '')}`, password: pw }
          : { email, password: pw };
      const { error } = await supabase.auth.signUp({
        ...credentials,
        options: { data: { full_name: fullName } },
      });
      if (error) throw error;
      nav('/admin/login', { replace: true });
    } catch (e2) {
      setErr(e2.message || 'Sign up failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-10"
      style={{ background: 'linear-gradient(160deg, #061722 0%, #0A2540 60%, #0B3A4A 100%)' }}
    >
      <div className="flex items-center gap-2 mb-8">
        <GlobeIcon />
        <span className="text-[#FF8A3D] font-bold text-xl tracking-wide">Learning Bangladesh</span>
      </div>

      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-2xl p-8 space-y-5 shadow-2xl"
        style={{ background: '#0D1526', border: '1px solid #00D4FF22' }}
      >
        <div className="text-center">
          <h1 className="text-white font-bold text-3xl">Sign Up</h1>
          <p className="text-ink-muted text-sm mt-1" style={{ color: '#9AA8BD' }}>
            Create your account
          </p>
        </div>

        <div
          className="grid grid-cols-2 p-1 rounded-full"
          style={{ background: '#0A1220', border: '1px solid #00D4FF22' }}
        >
          <button
            type="button"
            onClick={() => setMethod('phone')}
            className="py-2 rounded-full text-sm font-semibold transition"
            style={
              method === 'phone'
                ? { background: 'linear-gradient(90deg, #00D4FF, #1E3A8A)', color: '#fff' }
                : { color: '#9AA8BD', background: 'transparent' }
            }
          >
            Via Phone
          </button>
          <button
            type="button"
            onClick={() => setMethod('email')}
            className="py-2 rounded-full text-sm font-semibold transition"
            style={
              method === 'email'
                ? { background: 'linear-gradient(90deg, #00D4FF, #1E3A8A)', color: '#fff' }
                : { color: '#9AA8BD', background: 'transparent' }
            }
          >
            Via Email
          </button>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="input-dark"
            placeholder="Full Name"
          />

          <div
            className="flex items-stretch rounded-[10px] overflow-hidden"
            style={{ border: '1px solid #00D4FF33', background: '#0D1526' }}
          >
            <span className="flex items-center gap-1 px-3 text-white text-sm border-r border-[#00D4FF22]">
              <span>🇧🇩</span>
              <span>+88</span>
            </span>
            <input
              type="tel"
              required={method === 'phone'}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 bg-transparent px-3 py-[10px] text-white outline-none"
              placeholder="Phone Number"
            />
          </div>

          <input
            type="email"
            required={method === 'email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-dark"
            placeholder={method === 'email' ? 'Email' : 'Email (optional)'}
          />

          <PasswordField
            value={pw}
            onChange={setPw}
            show={showPw}
            toggle={() => setShowPw((s) => !s)}
            placeholder="Password"
          />
          <PasswordField
            value={pw2}
            onChange={setPw2}
            show={showPw2}
            toggle={() => setShowPw2((s) => !s)}
            placeholder="Confirm Password"
          />
        </div>

        {err && <div className="text-red-400 text-sm">{err}</div>}

        <button type="submit" disabled={busy} className="btn-primary w-full justify-center">
          {busy ? 'Signing up...' : 'Sign Up'}
        </button>

        <div className="h-px w-full" style={{ background: '#00D4FF22' }} />

        <p className="text-center text-sm" style={{ color: '#9AA8BD' }}>
          Already have an account?{' '}
          <Link to="/admin/login" style={{ color: '#00D4FF' }} className="font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

function PasswordField({ value, onChange, show, toggle, placeholder }) {
  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-dark pr-11"
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9AA8BD] hover:text-white"
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF8A3D" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a19.86 19.86 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 7 11 7a19.7 19.7 0 0 1-3.16 4.19M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <path d="M1 1l22 22" />
    </svg>
  );
}
