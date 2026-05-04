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

export default function Footer() {
  const { settings } = useSite();
  return (
    <footer
      className="mt-20 sm:mt-24"
      style={{ background: '#0A2540', borderTop: '1px solid #00D4FF22', paddingTop: 48 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 pb-10 sm:pb-12
                      grid-cols-1 sm:grid-cols-2 lg:grid-cols-12">
        <div className="sm:col-span-2 lg:col-span-4 space-y-4">
          {settings.logo_url ? (
            <img src={settings.logo_url} alt="SkillWave" className="h-10 w-auto" />
          ) : (
            <span style={{ color: '#00D4FF', fontFamily: 'Poppins', fontWeight: 700, fontSize: 26 }}>
              SkillWave
            </span>
          )}
          <p className="font-body" style={{ color: '#A0AEC0', fontSize: 14, lineHeight: 1.65, maxWidth: 320 }}>
            {settings.tagline}
          </p>
          <div className="flex gap-3 pt-1">
            {[FacebookIcon, YouTubeIcon, LinkedInIcon].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{ background: '#0D152680', border: '1px solid #00D4FF33', color: '#00D4FF' }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {COLS.map((col) => (
          <FooterCol key={col.title} title={col.title} items={col.items} />
        ))}

        <div className="lg:col-span-2 space-y-3">
          <h4 className="font-head text-white" style={{ fontSize: 16, fontWeight: 600 }}>Contact</h4>
          <ul className="space-y-2.5">
            <li>
              <a
                href="tel:01321642842"
                className="flex items-center gap-2 transition-colors hover:text-cyan-glow"
                style={{ color: '#A0AEC0', fontSize: 14 }}
              >
                <span style={{ color: '#00D4FF' }}>📞</span> 01321642842
              </a>
            </li>
            <li>
              <a
                href="mailto:joinskillwave@gmail.com"
                className="flex items-center gap-2 transition-colors hover:text-cyan-glow break-all"
                style={{ color: '#A0AEC0', fontSize: 14 }}
              >
                <span style={{ color: '#00D4FF' }}>✉</span> joinskillwave@gmail.com
              </a>
            </li>
          </ul>
          <div className="pt-3">
            <h4 className="font-head text-white mb-2" style={{ fontSize: 14, fontWeight: 600 }}>Payment</h4>
            <div className="flex flex-wrap gap-2">
              {['VISA', 'bKash', 'Nagad'].map((m) => (
                <span
                  key={m}
                  style={{
                    fontSize: 11,
                    padding: '5px 10px',
                    borderRadius: 6,
                    fontWeight: 600,
                    color: '#00D4FF',
                    background: '#00D4FF15',
                    border: '1px solid #00D4FF33',
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="text-center font-body"
        style={{
          borderTop: '1px solid #00D4FF15',
          color: '#A0AEC0',
          fontSize: 13,
          fontWeight: 400,
          padding: '18px 16px',
        }}
      >
        © ২০২৬ SkillWave. সর্বস্বত্ব সংরক্ষিত।
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div className="lg:col-span-2 space-y-3">
      <h4 className="font-head text-white" style={{ fontSize: 16, fontWeight: 600 }}>{title}</h4>
      <ul className="space-y-2.5">
        {items.map((it) => (
          <li key={it.label}>
            <Link
              to={it.to}
              className="font-body transition-colors hover:text-cyan-glow"
              style={{ color: '#A0AEC0', fontSize: 14, fontWeight: 400 }}
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
