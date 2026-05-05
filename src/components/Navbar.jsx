import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSite } from '../context/SiteContext.jsx';
import { supabase } from '../lib/supabase.js';
import { SearchIcon, MenuIcon, CloseIcon } from './Icons.jsx';
import Avatar from './Avatar.jsx';

const links = [
  { to: '/',          label: 'হোম' },
  { to: '/courses',   label: 'কোর্স' },
  { to: '/bundles',   label: 'বান্ডেল' },
  { to: '/workshops', label: 'ওয়ার্কশপ' },
  { to: '/ebooks',    label: 'ই-বুক' },
  { to: '/blog',      label: 'ব্লগ' },
];

const MENU = [
  { to: '/account',         icon: '👤', label: 'My Profile' },
  { to: '/account/courses', icon: '📚', label: 'My Courses' },
  { to: '/account/ebooks',  icon: '📖', label: 'My Ebooks' },
  { to: '/account/edit',    icon: '⚙️', label: 'Settings' },
];

function BellIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function ThemeSwitch({ theme, onToggle }) {
  const isDark = theme === 'dark';
  return (
    <button
      onClick={onToggle}
      aria-label="toggle dark mode"
      className="relative inline-flex items-center transition-colors"
      style={{
        width: 44,
        height: 24,
        borderRadius: 999,
        background: isDark ? 'linear-gradient(45deg, #6B6ECA, #41B9F8)' : '#E5E7EB',
        padding: 2,
      }}
    >
      <span
        className="flex items-center justify-center transition-transform"
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: '#FFFFFF',
          color: isDark ? '#1F2937' : '#F59E0B',
          boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
          transform: isDark ? 'translateX(20px)' : 'translateX(0)',
          fontSize: 11,
        }}
      >
        {isDark ? '🌙' : '☀'}
      </span>
    </button>
  );
}

export default function Navbar() {
  const nav = useNavigate();
  const { settings } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('skillwave_theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('skillwave_theme', theme);
  }, [theme]);

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

  const isDark = theme === 'dark';
  const navBg = scrolled ? (isDark ? '#060A14EE' : '#FFFFFFEE') : (isDark ? '#060A14CC' : '#FFFFFFCC');
  const borderClr = isDark ? '#1F2937' : '#E5E7EB';
  const linkInactive = isDark ? '#D4DCE8' : '#374151';
  const iconBtnBg = isDark ? '#0E1726' : '#FFFFFF';

  return (
    <header
      className="sticky top-0 z-50 transition-all"
      style={{
        background: navBg,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: scrolled ? `1px solid ${borderClr}` : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 24px -8px rgba(1,2,2,0.08)' : 'none',
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

        <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm mx-1 lg:mx-2">
          <div className="relative w-full">
            <SearchIcon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#41B9F8' }} />
            <input
              className="input-dark pl-10 !py-2"
              style={{ borderRadius: 999, background: iconBtnBg, border: `1px solid ${borderClr}` }}
              placeholder="Search..."
              aria-label="search"
            />
          </div>
        </div>

        <nav
          className="hidden lg:flex items-center gap-1 rounded-full px-2 py-1.5"
          style={{
            background: iconBtnBg,
            border: `1px solid ${borderClr}`,
            boxShadow: '0 4px 14px -8px rgba(107,110,202,0.18)',
          }}
        >
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              end={l.to === '/'}
              className="rounded-full px-3 py-1.5 transition-all text-[13px]"
              style={({ isActive }) => ({
                fontFamily: 'Poppins, Hind Siliguri',
                fontWeight: 500,
                color: isActive ? '#FFFFFF' : linkInactive,
                background: isActive ? 'linear-gradient(45deg, #6B6ECA, #41B9F8)' : 'transparent',
                boxShadow: isActive ? '0 4px 12px -4px rgba(65,185,248,0.5)' : 'none',
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:gap-3">
          <button
            className="hidden md:inline-flex w-10 h-10 rounded-full items-center justify-center transition-colors"
            style={{ background: iconBtnBg, border: `1px solid ${borderClr}`, color: linkInactive }}
            aria-label="notifications"
            title="Notifications"
          >
            <BellIcon />
          </button>

          <div className="hidden md:inline-flex">
            <ThemeSwitch theme={theme} onToggle={() => setTheme(isDark ? 'light' : 'dark')} />
          </div>

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
                    background: iconBtnBg,
                    border: `1px solid ${borderClr}`,
                    boxShadow: '0 24px 56px -16px rgba(1,2,2,0.18)',
                  }}
                >
                  <div className="p-4 flex items-center gap-3" style={{ background: 'linear-gradient(45deg, rgba(107,110,202,0.08), rgba(65,185,248,0.08))', borderBottom: `1px solid ${borderClr}` }}>
                    <Avatar user={user} size={48} />
                    <div className="min-w-0">
                      <div style={{ color: linkInactive === '#374151' ? '#010202' : '#FFFFFF', fontSize: 14, fontWeight: 600, fontFamily: 'Poppins' }} className="truncate">
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
                        style={{ color: linkInactive === '#374151' ? '#010202' : '#FFFFFF' }}
                      >
                        <span className="w-7 text-center text-base">{m.icon}</span>
                        <span>{m.label}</span>
                      </Link>
                    ))}
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm transition-colors hover:bg-red-50"
                    style={{ color: '#DC2626', borderTop: `1px solid ${borderClr}` }}
                  >
                    <span className="w-7 text-center text-base">↪</span>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signup" className="hidden sm:inline-flex btn-gradient text-sm">
              সাইন আপ / লগইন
            </Link>
          )}

          <button className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center" style={{ background: iconBtnBg, border: `1px solid ${borderClr}`, color: linkInactive }} onClick={() => setOpen((v) => !v)} aria-label="menu">
            {open ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t" style={{ borderColor: borderClr, background: navBg }}>
          <div className="px-4 py-4 flex flex-col gap-3">
            <div className="relative">
              <SearchIcon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#41B9F8' }} />
              <input className="input-dark pl-10" style={{ borderRadius: 999 }} placeholder="Search..." />
            </div>
            <div className="flex items-center justify-between gap-3 py-1">
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: iconBtnBg, border: `1px solid ${borderClr}`, color: linkInactive }}
                aria-label="notifications"
              >
                <BellIcon />
              </button>
              <ThemeSwitch theme={theme} onToggle={() => setTheme(isDark ? 'light' : 'dark')} />
            </div>
            <div className="rounded-2xl p-2 flex flex-wrap gap-1" style={{ border: `1px solid ${borderClr}`, background: iconBtnBg }}>
              {links.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  className="rounded-full px-3 py-1.5 text-[13px]"
                  style={{ color: linkInactive, fontFamily: 'Poppins, Hind Siliguri', fontWeight: 500 }}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            {!user ? (
              <Link to="/signup" className="btn-gradient justify-center" onClick={() => setOpen(false)}>সাইন আপ / লগইন</Link>
            ) : (
              <div className="pt-2" style={{ borderTop: `1px solid ${borderClr}` }}>
                {MENU.map((m) => (
                  <Link key={m.to} to={m.to} onClick={() => setOpen(false)} className="flex items-center gap-3 py-2.5 text-sm" style={{ color: linkInactive }}>
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
