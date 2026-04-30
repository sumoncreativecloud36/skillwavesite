import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext.jsx';
import { FacebookIcon, YouTubeIcon, LinkedInIcon } from './Icons.jsx';

export default function Footer() {
  const { settings } = useSite();
  return (
    <footer className="mt-24" style={{ borderTop: '1px solid #FFFFFF0F' }}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid md:grid-cols-12 gap-10 py-16">
        <div className="md:col-span-5 space-y-5">
          {settings.logo_url ? (
            <img src={settings.logo_url} alt="SkillWave" className="h-9 w-auto" />
          ) : (
            <span className="display text-2xl" style={{ color: '#fff' }}>
              Skill<span style={{ color: '#00D4FF' }}>Wave</span>
            </span>
          )}
          <p className="text-[15px] leading-relaxed max-w-sm" style={{ color: '#A8B5CC' }}>
            {settings.tagline}
          </p>
          <div className="flex gap-3 pt-2">
            {[FacebookIcon, YouTubeIcon, LinkedInIcon].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{ border: '1px solid #FFFFFF14', color: '#A8B5CC' }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol
          title="এক্সপ্লোর"
          links={[
            { label: 'কোর্স', to: '/courses' },
            { label: 'ই-বুক', to: '/ebooks' },
            { label: 'ব্লগ', to: '/blog' },
            { label: 'আমাদের সম্পর্কে', to: '/about' },
          ]}
        />
        <FooterCol
          title="অ্যাকাউন্ট"
          links={[
            { label: 'সাইন আপ', to: '/signup' },
            { label: 'লগইন', to: '/admin/login' },
          ]}
        />

        <div className="md:col-span-3 space-y-3">
          <h4 className="eyebrow">পেমেন্ট</h4>
          <div className="flex flex-wrap gap-2">
            {['VISA', 'bKash', 'Nagad'].map((m) => (
              <span
                key={m}
                className="text-[11px] tracking-wider uppercase px-3 py-1.5 rounded-md"
                style={{ background: '#FFFFFF08', border: '1px solid #FFFFFF14', color: '#BFE9F5' }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="divider-soft" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 text-[13px] flex flex-wrap items-center justify-between gap-3" style={{ color: '#7C8AA3' }}>
        <div>© ২০২৬ SkillWave. সর্বস্বত্ব সংরক্ষিত।</div>
        <div className="flex gap-5">
          <a href="#" className="hover:text-white transition-colors">প্রাইভেসি</a>
          <a href="#" className="hover:text-white transition-colors">শর্তাবলী</a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div className="md:col-span-2 space-y-3">
      <h4 className="eyebrow">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-[14px] transition-colors hover:text-white" style={{ color: '#A8B5CC' }}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
