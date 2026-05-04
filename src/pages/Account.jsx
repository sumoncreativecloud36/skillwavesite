import { useEffect, useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { supabase } from '../lib/supabase.js';

function initials(name = '', email = '') {
  const src = name || email || '';
  return src.trim().split(/\s+|@/).slice(0, 2).map((s) => s[0]?.toUpperCase()).join('') || 'SW';
}

export default function Account() {
  const nav = useNavigate();
  const [state, setState] = useState({ loading: true, user: null });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setState({ loading: false, user: data.session?.user || null });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setState({ loading: false, user: session?.user || null });
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    nav('/', { replace: true });
  }

  if (state.loading) {
    return <div className="min-h-screen flex items-center justify-center" style={{ color: '#A0AEC0' }}>লোড হচ্ছে...</div>;
  }
  if (!state.user) return <Navigate to="/login" replace />;

  const u = state.user;
  const name = u.user_metadata?.full_name || u.email?.split('@')[0] || 'Student';

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 lg:px-8 pt-12 pb-20">
        <div className="text-sm mb-6" style={{ color: '#A0AEC0' }}>
          <Link to="/" className="hover:text-cyan-glow">Home</Link>
          <span className="mx-2">›</span>
          <span style={{ color: '#fff' }}>Profile</span>
        </div>

        <div
          className="rounded-2xl p-8 mb-6"
          style={{ background: '#0D1526CC', border: '1px solid #00D4FF22', backdropFilter: 'blur(8px)' }}
        >
          <div className="flex items-center gap-6 flex-wrap">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold"
              style={{ background: '#00D4FF22', color: '#00D4FF', border: '2px solid #00D4FF', fontFamily: 'Poppins' }}
            >
              {initials(name, u.email)}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-white" style={{ fontFamily: 'Hind Siliguri, Poppins', fontWeight: 700, fontSize: 32 }}>
                {name}
              </h1>
              <div className="flex flex-wrap gap-x-8 gap-y-2 mt-3 text-sm" style={{ color: '#A0AEC0' }}>
                {u.email && <span>✉ {u.email}</span>}
                {u.phone && <span>📞 +{u.phone}</span>}
              </div>
            </div>
          </div>
        </div>

        <div
          className="rounded-2xl p-8"
          style={{ background: '#0D1526CC', border: '1px solid #00D4FF22', backdropFilter: 'blur(8px)' }}
        >
          <h2 className="text-white mb-4" style={{ fontFamily: 'Hind Siliguri, Poppins', fontWeight: 600, fontSize: 20 }}>
            🛡️ Verification Status
          </h2>
          <Row label={u.phone ? `+${u.phone}` : 'ফোন যোগ করুন'} verified={!!u.phone_confirmed_at} />
          <Row label={u.email || ''} verified={!!u.email_confirmed_at} />
        </div>

        <button
          onClick={logout}
          className="mt-6 text-sm font-semibold"
          style={{ color: '#EF4444' }}
        >
          ↪ Logout
        </button>
      </main>
      <Footer />
    </>
  );
}

function Row({ label, verified }) {
  return (
    <div className="flex items-center justify-between py-3 flex-wrap gap-3" style={{ borderTop: '1px solid #00D4FF15' }}>
      <div className="text-white">{label}</div>
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
  );
}
