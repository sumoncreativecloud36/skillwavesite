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
      className="sticky top-0 z-50 backdrop-blur-xl transition-colors"
      style={{
        background: scrolled ? '#060A14CC' : 'transparent',
        borderBottom: scrolled ? '1px solid #FFFFFF0F' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          {settings.logo_url ? (
            <img src={settings.logo_url} alt="SkillWave" className="h-8 w-auto" />
          ) : (
            <span className="display text-2xl tracking-tight" style={{ color: '#fff' }}>
              Skill<span style={{ color: '#00D4FF' }}>Wave</span>
            </span>
          )}
        </Link>

        <nav className="hidden lg:flex items-center gap-7 ml-2">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `text-[14px] font-medium transition-colors ${
                  isActive ? 'text-white' : 'hover:text-white'
                }`
              }
              style={({ isActive }) => ({ color: isActive ? '#fff' : '#A8B5CC' })}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex flex-1 max-w-xs ml-auto">
          <div className="relative w-full">
            <SearchIcon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#7C8AA3' }} />
            <input
              className="input-dark pl-10 rounded-full !py-2 !text-sm"
              placeholder="খুঁজুন..."
              aria-label="search"
            />
          </div>
        </div>

        <Link to="/admin/login" className="hidden md:inline-flex text-[13px] font-medium" style={{ color: '#A8B5CC' }}>
          লগইন
        </Link>
        <Link to="/signup" className="hidden md:inline-flex btn-primary text-sm">
          ভর্তি হন →
        </Link>

        <button
          className="lg:hidden ml-auto"
          style={{ color: '#A8B5CC' }}
          onClick={() => setOpen((v) => !v)}
          aria-label="menu"
        >
          {open ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t" style={{ borderColor: '#FFFFFF0F', background: '#060A14EE' }}>
          <div className="px-4 py-4 flex flex-col gap-3">
            <div className="relative">
              <SearchIcon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#7C8AA3' }} />
              <input className="input-dark pl-10 rounded-full" placeholder="খুঁজুন..." />
            </div>
            {links.map((l) => (
              <Link key={l.label} to={l.to} className="py-1.5" style={{ color: '#A8B5CC' }} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link to="/admin/login" className="py-1.5" style={{ color: '#A8B5CC' }} onClick={() => setOpen(false)}>
              লগইন
            </Link>
            <Link to="/signup" className="btn-primary justify-center" onClick={() => setOpen(false)}>
              ভর্তি হন →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
