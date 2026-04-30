import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSite } from '../context/SiteContext.jsx';
import { SearchIcon, MenuIcon, CloseIcon } from './Icons.jsx';

const links = [
  { to: '/', label: 'হোম' },
  { to: '/courses', label: 'কোর্স' },
  { to: '/ebooks', label: 'ই-বুক' },
  { to: '/blog', label: 'ব্লগ' },
  { to: '/about', label: 'আমাদের সম্পর্কে' },
];

export default function Navbar() {
  const { settings } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

        <Link to="/signup" className="hidden md:inline-flex btn-primary text-sm">
          এখনই ভর্তি হন →
        </Link>

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
