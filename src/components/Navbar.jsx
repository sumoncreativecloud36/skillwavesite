import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSite } from '../context/SiteContext.jsx';
import { supabase } from '../lib/supabase.js';
import { SearchIcon, MenuIcon, CloseIcon } from './Icons.jsx';

function userInitials(u) {
  const src = u?.user_metadata?.full_name || u?.email || '';
  return src.trim().split(/\s+|@/).slice(0, 2).map((s) => s[0]?.toUpperCase()).join('') || 'SW';
}

const links = [
  { to: '/', label: 'হোম' },
  { to: '/courses', label: 'কোর্স' },
  { to: '/ebooks', label: 'ই-বুক' },
  { to: '/blog', label: 'ব্লগ' },
  { to: '/about', label: 'আমাদের সম্পর্কে' },
];

export default function Navbar() {
  const nav = useNavigate();
  const { settings } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user || null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user || null));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [menuOpen]);

  async function logout() {
    await supabase.auth.signOut();
    setMenuOpen(false);
    nav('/');
  }

  return (
    <header
      className="sticky top-0 z-50 transition-all"
      style={{
        background: scrolled ? '#0B0F19CC' : 'transparent',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid #00D4FF22',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          {settings.logo_url ? (
            <img src={settings.logo_url} alt="SkillWave" className="h-9 w-auto" />
          ) : (
            <span
              style={{ color: '#00D4FF', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 24, letterSpacing: '-0.02em' }}
            >
              SkillWave
            </span>
          )}
        </Link>

        <div className="hidden md:flex flex-1 max-w-md mx-2">
          <div className="relative w-full">
            <SearchIcon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#00D4FF' }} />
            <input
              className="input-dark pl-10"
              style={{ borderRadius: 24 }}
              placeholder="কোর্স খুঁজুন..."
              aria-label="search"
            />
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              end={l.to === '/'}
              className="font-head transition-colors"
              style={({ isActive }) => ({
                fontSize: 14,
                fontWeight: 500,
                color: isActive ? '#00D4FF' : '#A0AEC0',
                borderBottom: isActive ? '2px solid #00D4FF' : '2px solid transparent',
                paddingBottom: 4,
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {user ? (
          <div className="hidden md:block relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="w-10 h-10 rounded-full flex items-center justify-center font-semibold"
              style={{ background: '#00D4FF22', color: '#00D4FF', border: '2px solid #00D4FF', fontFamily: 'Poppins' }}
            >
              {userInitials(user)}
            </button>
            {menuOpen && (
              <div
                className="absolute right-0 mt-2 w-72 rounded-xl overflow-hidden"
                style={{ background: '#0D1526EE', border: '1px solid #00D4FF22', backdropFilter: 'blur(12px)', boxShadow: '0 12px 40px #00000088' }}
              >
                <div className="p-4 flex items-center gap-3" style={{ borderBottom: '1px solid #00D4FF15' }}>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-semibold"
                    style={{ background: '#00D4FF22', color: '#00D4FF', border: '2px solid #00D4FF', fontFamily: 'Poppins' }}
                  >
                    {userInitials(user)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-white text-sm font-semibold truncate">
                      {user.user_metadata?.full_name || 'Student'}
                    </div>
                    <div className="text-xs truncate" style={{ color: '#A0AEC0' }}>{user.email}</div>
                  </div>
                </div>
                <Link to="/account" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm hover:bg-white/5" style={{ color: '#fff' }}>
                  👤 My Profile
                </Link>
                <Link to="/courses" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm hover:bg-white/5" style={{ color: '#fff' }}>
                  📚 My Courses
                </Link>
                <Link to="/ebooks" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm hover:bg-white/5" style={{ color: '#fff' }}>
                  📖 My Ebooks
                </Link>
                <button onClick={logout} className="block w-full text-left px-4 py-3 text-sm hover:bg-red-500/10" style={{ color: '#EF4444', borderTop: '1px solid #00D4FF15' }}>
                  ↪ Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="hidden md:inline-flex text-sm" style={{ color: '#A0AEC0' }}>
              লগইন
            </Link>
            <Link to="/signup" className="hidden md:inline-flex btn-primary text-sm">
              এখনই ভর্তি হন →
            </Link>
          </>
        )}

        <button
          className="lg:hidden ml-auto"
          style={{ color: '#A0AEC0' }}
          onClick={() => setOpen((v) => !v)}
          aria-label="menu"
        >
          {open ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t" style={{ borderColor: '#00D4FF22', background: '#0B0F19EE' }}>
          <div className="px-4 py-4 flex flex-col gap-3">
            <div className="relative">
              <SearchIcon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#00D4FF' }} />
              <input className="input-dark pl-10" style={{ borderRadius: 24 }} placeholder="কোর্স খুঁজুন..." />
            </div>
            {links.map((l) => (
              <Link key={l.label} to={l.to} className="py-1" style={{ color: '#A0AEC0' }} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link to="/signup" className="btn-primary justify-center" onClick={() => setOpen(false)}>
              এখনই ভর্তি হন →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
