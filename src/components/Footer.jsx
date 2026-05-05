import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext.jsx';
import { FacebookIcon, YouTubeIcon, LinkedInIcon } from './Icons.jsx';

const COLS = [
  {
    title: 'About Us',
    items: [
      { label: 'Meet The Team',       to: '/about' },
      { label: 'Student Success',     to: '/about' },
      { label: 'Become an Instructor', to: '/about' },
      { label: 'Affiliate',           to: '/about' },
      { label: 'Contact Us',          to: '/about' },
    ],
  },
  {
    title: 'Explore',
    items: [
      { label: 'Courses',           to: '/courses' },
      { label: 'Bundles',           to: '/courses' },
      { label: 'Services',          to: '/about' },
      { label: 'E-Books',           to: '/ebooks' },
      { label: 'Blogs',             to: '/blog' },
      { label: 'Verify Certificate', to: '/about' },
    ],
  },
  {
    title: 'Support',
    items: [
      { label: 'Terms & Conditions', to: '#' },
      { label: 'Privacy Policy',     to: '#' },
      { label: 'Refund Policy',      to: '#' },
    ],
  },
];

const FG = '#D1D5DB';
const FG_HEAD = '#FFFFFF';
const FG_LINK_HOVER = '#41B9F8';

export default function Footer() {
  return (
    <footer
      className="mt-20 sm:mt-24"
      style={{ background: '#010202', paddingTop: 56 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-12">
        <div className="mb-8 lg:hidden">
          <BrandBlock />
        </div>

        <div className="grid gap-6 sm:gap-8 lg:gap-10 grid-cols-4 lg:grid-cols-12">
          <div className="hidden lg:block lg:col-span-4 space-y-4">
            <BrandBlock />
          </div>

          {COLS.map((col) => (
            <FooterCol key={col.title} title={col.title} items={col.items} />
          ))}

          <ContactCol />
        </div>
      </div>

      <div
        className="text-center"
        style={{
          borderTop: '1px solid #1F2937',
          color: '#9CA3AF',
          fontSize: 13,
          padding: '18px 16px',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        © ২০২৬ SkillWave. সর্বস্বত্ব সংরক্ষিত।
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div className="lg:col-span-2 space-y-2.5 sm:space-y-3 min-w-0">
      <h4 className="font-head text-sm sm:text-base" style={{ color: FG_HEAD, fontWeight: 600, fontFamily: 'Poppins' }}>{title}</h4>
      <ul className="space-y-1.5 sm:space-y-2.5">
        {items.map((it) => (
          <li key={it.label}>
            <Link
              to={it.to}
              className="block transition-colors text-[12px] sm:text-sm leading-snug"
              style={{ color: FG, fontFamily: 'Inter' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = FG_LINK_HOVER)}
              onMouseLeave={(e) => (e.currentTarget.style.color = FG)}
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BrandBlock() {
  const { settings } = useSite();
  return (
    <div className="space-y-4">
      {settings.logo_url ? (
        <img src={settings.logo_url} alt="SkillWave" className="h-10 w-auto" />
      ) : (
        <span className="gradient-text" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 28 }}>
          SkillWave
        </span>
      )}
      <p style={{ color: FG, fontSize: 14, lineHeight: 1.65, maxWidth: 320, fontFamily: 'Inter' }}>
        {settings.tagline}
      </p>
      <div className="flex gap-3 pt-1">
        {[FacebookIcon, YouTubeIcon, LinkedInIcon].map((Icon, i) => (
          <a
            key={i}
            href="#"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
            style={{ background: '#1F2937', border: '1px solid #1F2937', color: FG }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(45deg, #6B6ECA, #41B9F8)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#1F2937'; e.currentTarget.style.color = FG; }}
          >
            <Icon className="w-4 h-4" />
          </a>
        ))}
      </div>
    </div>
  );
}

function ContactCol() {
  return (
    <div className="lg:col-span-2 space-y-2.5 sm:space-y-3 min-w-0">
      <h4 className="font-head text-sm sm:text-base" style={{ color: FG_HEAD, fontWeight: 600, fontFamily: 'Poppins' }}>Contact</h4>
      <ul className="space-y-1.5 sm:space-y-2.5">
        <li>
          <a href="tel:01321642842" className="flex items-center gap-1.5 transition-colors text-[12px] sm:text-sm" style={{ color: FG }}>
            <span style={{ color: '#41B9F8' }}>📞</span> 01321642842
          </a>
        </li>
        <li>
          <a href="mailto:joinskillwave@gmail.com" className="flex items-start gap-1.5 transition-colors break-all text-[12px] sm:text-sm" style={{ color: FG }}>
            <span style={{ color: '#41B9F8' }}>✉</span>
            <span>joinskillwave@gmail.com</span>
          </a>
        </li>
      </ul>
      <div className="pt-2">
        <h4 className="font-head mb-1.5 text-[12px] sm:text-sm" style={{ color: FG_HEAD, fontWeight: 600, fontFamily: 'Poppins' }}>Payment</h4>
        <div className="flex flex-wrap gap-1.5">
          {['VISA', 'bKash', 'Nagad'].map((m) => (
            <span
              key={m}
              style={{
                fontSize: 10,
                padding: '4px 8px',
                borderRadius: 6,
                fontWeight: 600,
                color: '#fff',
                background: 'linear-gradient(45deg, #6B6ECA, #41B9F8)',
              }}
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
