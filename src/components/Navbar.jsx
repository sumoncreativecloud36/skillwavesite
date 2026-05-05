import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSite } from '../context/SiteContext.jsx';
import { supabase } from '../lib/supabase.js';
import { SearchIcon, MenuIcon, CloseIcon } from './Icons.jsx';
import Avatar from './Avatar.jsx';

const links = [
  { to: '/', label: 'হোম' },
  { to: '/courses', label: 'কোর্স' },
  { to: '/ebooks', label: 'ই-বুক' },
  { to: '/blog', label: 'ব্লগ' },
  { to: '/about', label: 'আমাদের সম্পর্কে' },
];

const MENU = [
  { to: '/account',          icon: '👤', label: 'My Profile' },
  { to: '/account/courses',  icon: '📚', label: 'My Courses' },
  { to: '/account/ebooks',   icon: '📖', label: 'My Ebooks' },
  { to: '/account/edit',     icon: '⚙️', label: 'Settings' },
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
        background: scrolled ? '#FFFFFFEE' : '#FFFFFFCC',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: scrolled ? '1px solid #E5E7EB' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 24px -8px rgba(1,2,2,0.06)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3 lg:gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          {settings.logo_url ? (
            <img src={settings.logo_url} alt="SkillWave" className="h-8 lg:h-9 w-auto" />
          ) : (
            <span className="gradient-text" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 24, letterSpacing: '-0.02em' }}>
              SkillWave
            </span>
          )}
        </Link>

        <div className="hidden md:flex flex-1 max-w-md mx-2">
          <div className="relative w-full">
            <SearchIcon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#41B9F8' }} />
            <input
              className="input-dark pl-10"
              style={{ borderRadius: 999, background: '#F3F4F6', border: '1px solid transparent' }}
              placeholder="কোর্স খুঁজুন..."
              aria-label="search"
            />
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              end={l.to === '/'}
              className="font-head transition-colors"
              style={({ isActive }) => ({
                fontSize: 14,
                fontWeight: 500,
                color: isActive ? '#41B9F8' : '#374151',
                borderBottom: isActive ? '2px solid #41B9F8' : '2px solid transparent',
                paddingBottom: 4,
                fontFamily: 'Poppins',
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:gap-3">
          {user ? (
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="rounded-full transition-transform hover:scale-105"
                aria-label="account menu"
              >
                <Avatar user={user} size={40} />
              </button>
              {menuOpen && (
                <div
                  className="absolute right-0 mt-3 w-72 rounded-2xl overflow-hidden"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 24px 56px -16px rgba(1,2,2,0.18)',
                  }}
                >
                  <div className="p-4 flex items-center gap-3" style={{ background: 'linear-gradient(45deg, rgba(107,110,202,0.08), rgba(65,185,248,0.08))', borderBottom: '1px solid #E5E7EB' }}>
                    <Avatar user={user} size={48} />
                    <div className="min-w-0">
                      <div style={{ color: '#010202', fontSize: 14, fontWeight: 600, fontFamily: 'Poppins' }} className="truncate">
                        {user.user_metadata?.full_name || 'Student'}
                      </div>
                      <div className="text-xs truncate" style={{ color: '#6B7280' }}>{user.email}</div>
                    </div>
                  </div>
                  <div className="py-1">
                    {MENU.map((m) => (
                      <Link
                        key={m.to}
                        to={m.to}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-gray-50"
                        style={{ color: '#010202' }}
                      >
                        <span className="w-7 text-center text-base">{m.icon}</span>
                        <span>{m.label}</span>
                      </Link>
                    ))}
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm transition-colors hover:bg-red-50"
                    style={{ color: '#DC2626', borderTop: '1px solid #E5E7EB' }}
                  >
                    <span className="w-7 text-center text-base">↪</span>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="hidden sm:inline-flex text-sm font-semibold" style={{ color: '#374151', fontFamily: 'Poppins' }}>
                লগইন
              </Link>
              <Link to="/signup" className="hidden sm:inline-flex btn-gradient text-sm">
                ভর্তি হন →
              </Link>
            </>
          )}

          <button className="lg:hidden" style={{ color: '#374151' }} onClick={() => setOpen((v) => !v)} aria-label="menu">
            {open ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t" style={{ borderColor: '#E5E7EB', background: '#FFFFFFF8' }}>
          <div className="px-4 py-4 flex flex-col gap-3">
            <div className="relative">
              <SearchIcon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#41B9F8' }} />
              <input className="input-dark pl-10" style={{ borderRadius: 999, background: '#F3F4F6', border: '1px solid transparent' }} placeholder="কোর্স খুঁজুন..." />
            </div>
            {links.map((l) => (
              <Link key={l.label} to={l.to} className="py-2" style={{ color: '#374151', fontFamily: 'Poppins', fontWeight: 500 }} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            {!user ? (
              <>
                <Link to="/login" className="btn-outline justify-center" onClick={() => setOpen(false)}>লগইন</Link>
                <Link to="/signup" className="btn-gradient justify-center" onClick={() => setOpen(false)}>ভর্তি হন →</Link>
              </>
            ) : (
              <div className="pt-2" style={{ borderTop: '1px solid #E5E7EB' }}>
                {MENU.map((m) => (
                  <Link key={m.to} to={m.to} onClick={() => setOpen(false)} className="flex items-center gap-3 py-2.5 text-sm" style={{ color: '#010202' }}>
                    <span className="w-6 text-center">{m.icon}</span>{m.label}
                  </Link>
                ))}
                <button onClick={() => { setOpen(false); logout(); }} className="flex items-center gap-3 py-2.5 text-sm w-full text-left" style={{ color: '#DC2626' }}>
                  <span className="w-6 text-center">↪</span> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
