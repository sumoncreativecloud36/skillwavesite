import { useEffect, useState } from 'react';
import { Link, NavLink, Navigate, Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Avatar from '../components/Avatar.jsx';
import { supabase } from '../lib/supabase.js';

const NAV = [
  { to: '/account',              label: 'Dashboard',     icon: '▦', tone: '#00D4FF' },
  { to: '/account/courses',      label: 'My Courses',    icon: '📚', tone: '#10B981', count: 'courses' },
  { to: '/account/workshops',    label: 'My Workshops',  icon: '👥', tone: '#8B5CF6', count: 'workshops' },
  { to: '/account/ebooks',       label: 'My Ebooks',     icon: '📖', tone: '#A855F7', count: 'ebooks' },
  { to: '/account/bundles',      label: 'My Bundles',    icon: '📦', tone: '#F97316', count: 'bundles' },
  { to: '/account/certificates', label: 'Certificates',  icon: '🏅', tone: '#EF4444', count: 'certs' },
  { to: '/account/orders',       label: 'My Orders',     icon: '🧾', tone: '#06B6D4' },
  { to: '/account/edit',         label: 'Edit Profile',  icon: '⚙️', tone: '#A0AEC0' },
];

const PAGE_TITLES = {
  '/account': 'Dashboard',
  '/account/courses': 'My Courses',
  '/account/workshops': 'My Workshops',
  '/account/ebooks': 'My Ebooks',
  '/account/bundles': 'My Bundles',
  '/account/certificates': 'Certificates',
  '/account/orders': 'My Orders',
  '/account/edit': 'Settings',
};

export default function AccountLayout() {
  const loc = useLocation();
  const [state, setState] = useState({ loading: true, user: null });
  const [counts, setCounts] = useState({ courses: 0, workshops: 0, ebooks: 0, bundles: 0, certs: 0 });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setState({ loading: false, user: data.session?.user || null });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setState({ loading: false, user: s?.user || null });
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!state.user) return;
    const uid = state.user.id;
    async function safeCount(table) {
      const { count, error } = await supabase
        .from(table).select('*', { count: 'exact', head: true }).eq('user_id', uid);
      return error ? 0 : (count || 0);
    }
    Promise.all([
      safeCount('enrollments'),
      safeCount('workshop_signups'),
      safeCount('ebook_purchases'),
      safeCount('bundle_purchases'),
      safeCount('certificates'),
    ]).then(([c, w, e, b, ct]) => setCounts({ courses: c, workshops: w, ebooks: e, bundles: b, certs: ct }));
  }, [state.user]);

  if (state.loading) {
    return <div className="min-h-screen flex items-center justify-center" style={{ color: '#A0AEC0' }}>লোড হচ্ছে...</div>;
  }
  if (!state.user) return <Navigate to="/login" replace />;

  const u = state.user;
  const name = u.user_metadata?.full_name || u.email?.split('@')[0] || 'Student';
  const pageTitle = PAGE_TITLES[loc.pathname] || 'Profile';

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-16 sm:pb-20">
        <div className="text-sm mb-5 sm:mb-6 flex items-center gap-2 flex-wrap" style={{ color: '#A0AEC0' }}>
          <Link to="/" className="hover:text-cyan-glow flex items-center gap-1">🏠 Home</Link>
          <span>›</span>
          <span style={{ color: '#fff' }}>{pageTitle}</span>
        </div>

        <div className="grid lg:grid-cols-[300px,1fr] xl:grid-cols-[320px,1fr] gap-5 lg:gap-6">
          <aside className="space-y-4">
            <div
              className="rounded-2xl p-4 sm:p-5 flex items-center gap-3"
              style={{
                background: 'linear-gradient(135deg, #0D1526CC, #0A2540AA)',
                border: '1px solid #00D4FF22',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              <Avatar user={u} size={56} />
              <div className="min-w-0">
                <div className="text-white font-semibold truncate" style={{ fontFamily: 'Hind Siliguri, Poppins' }}>
                  {name}
                </div>
                <div className="text-xs truncate" style={{ color: '#A0AEC0' }}>{u.email}</div>
              </div>
            </div>

            <nav
              className="rounded-2xl p-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-1"
              style={{
                background: '#0D1526CC',
                border: '1px solid #00D4FF22',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/account'}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
                  style={({ isActive }) => ({
                    background: isActive
                      ? 'linear-gradient(90deg, #00D4FF22, #00D4FF05)'
                      : 'transparent',
                    color: isActive ? '#00D4FF' : '#fff',
                    boxShadow: isActive ? 'inset 3px 0 0 #00D4FF' : 'none',
                  })}
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-sm shrink-0 transition-transform"
                        style={{
                          background: isActive ? '#00D4FF22' : item.tone + '1A',
                          color: isActive ? '#00D4FF' : item.tone,
                          border: `1px solid ${isActive ? '#00D4FF55' : item.tone + '40'}`,
                          transform: isActive ? 'scale(1.05)' : 'scale(1)',
                        }}
                      >
                        {item.icon}
                      </span>
                      <span
                        className="flex-1 font-medium truncate"
                        style={{ fontFamily: 'Hind Siliguri, Poppins', fontSize: 14 }}
                      >
                        {item.label}
                      </span>
                      {item.count != null && (
                        <span
                          className="text-xs font-semibold rounded-full min-w-[22px] h-[22px] flex items-center justify-center px-2 shrink-0"
                          style={{ background: item.tone, color: '#fff' }}
                        >
                          {counts[item.count] || 0}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </aside>

          <section className="min-w-0">
            <Outlet context={{ user: u, counts }} />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
