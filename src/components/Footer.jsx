import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext.jsx';
import { FacebookIcon, YouTubeIcon, LinkedInIcon } from './Icons.jsx';

export default function Footer() {
  const { settings } = useSite();
  return (
    <footer style={{ background: '#0A2540', borderTop: '1px solid #00D4FF22', paddingTop: 60 }} className="mt-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid md:grid-cols-4 gap-10 pb-12">
        <div className="space-y-4">
          {settings.logo_url ? (
            <img src={settings.logo_url} alt="SkillWave" className="h-10 w-auto" />
          ) : (
            <span style={{ color: '#00D4FF', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 26 }}>
              SkillWave
            </span>
          )}
          <p className="font-body" style={{ color: '#A0AEC0', fontSize: 14, lineHeight: 1.65, maxWidth: 260 }}>
            {settings.tagline}
          </p>
          <div className="flex gap-4" style={{ color: '#00D4FF' }}>
            <a href="#" aria-label="Facebook" className="hover:opacity-80"><FacebookIcon className="w-5 h-5" /></a>
            <a href="#" aria-label="YouTube" className="hover:opacity-80"><YouTubeIcon className="w-5 h-5" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:opacity-80"><LinkedInIcon className="w-5 h-5" /></a>
          </div>
        </div>

        <FooterCol
          title="এক্সপ্লোর"
          items={[
            { label: 'কোর্স', to: '/courses' },
            { label: 'ই-বুক', to: '/ebooks' },
            { label: 'বান্ডেল', to: '/courses' },
            { label: 'ব্লগ', to: '/blog' },
          ]}
        />
        <FooterCol
          title="সাপোর্ট"
          items={[
            { label: 'FAQ', to: '/about' },
            { label: 'যোগাযোগ', to: '/about' },
            { label: 'প্রাইভেসি পলিসি', to: '#' },
            { label: 'শর্তাবলী', to: '#' },
          ]}
        />

        <div className="space-y-3">
          <h4 className="font-head text-white" style={{ fontSize: 16, fontWeight: 600 }}>পেমেন্ট</h4>
          <div
            className="rounded-lg p-3 flex flex-wrap gap-2"
            style={{ border: '1px solid #00D4FF22', background: '#0D152680' }}
          >
            {['VISA', 'bKash', 'Nagad'].map((m) => (
              <span
                key={m}
                style={{
                  fontSize: 12,
                  padding: '6px 12px',
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
      <div
        className="text-center font-body"
        style={{
          borderTop: '1px solid #00D4FF15',
          color: '#A0AEC0',
          fontSize: 13,
          fontWeight: 400,
          padding: '20px 16px',
        }}
      >
        © ২০২৬ SkillWave. সর্বস্বত্ব সংরক্ষিত।
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div className="space-y-3">
      <h4 className="font-head text-white" style={{ fontSize: 16, fontWeight: 600 }}>{title}</h4>
      <ul className="space-y-2">
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
