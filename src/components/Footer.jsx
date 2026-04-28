import { useSite } from '../context/SiteContext.jsx';
import { FacebookIcon, YouTubeIcon, LinkedInIcon } from './Icons.jsx';

export default function Footer() {
  const { settings } = useSite();
  return (
    <footer style={{ background: '#0A2540', borderTop: '1px solid #00D4FF22' }} className="pt-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid md:grid-cols-4 gap-10 pb-10">
        <div className="space-y-4">
          {settings.logo_url ? (
            <img src={settings.logo_url} alt="SkillWave" className="h-10 w-auto" />
          ) : (
            <span className="text-cyan-glow font-head font-bold text-2xl">SkillWave</span>
          )}
          <p className="text-ink-muted text-sm leading-relaxed">{settings.tagline}</p>
          <div className="flex gap-4 text-cyan-glow">
            <a href="#" aria-label="Facebook"><FacebookIcon className="w-5 h-5" /></a>
            <a href="#" aria-label="YouTube"><YouTubeIcon className="w-5 h-5" /></a>
            <a href="#" aria-label="LinkedIn"><LinkedInIcon className="w-5 h-5" /></a>
          </div>
        </div>

        <FooterCol title="এক্সপ্লোর" links={['কোর্স', 'ই-বুক', 'বান্ডেল', 'ব্লগ']} />
        <FooterCol title="সাপোর্ট" links={['FAQ', 'যোগাযোগ', 'প্রাইভেসি পলিসি', 'শর্তাবলী']} />

        <div className="space-y-3">
          <h4 className="text-white font-semibold text-base">পেমেন্ট</h4>
          <div
            className="rounded-lg p-3 flex flex-wrap gap-2"
            style={{ border: '1px solid #00D4FF22', background: '#0D152680' }}
          >
            {['VISA', 'bKash', 'Nagad'].map((m) => (
              <span
                key={m}
                className="text-xs px-3 py-1.5 rounded font-semibold text-cyan-glow"
                style={{ background: '#00D4FF15', border: '1px solid #00D4FF33' }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div
        className="text-center text-ink-muted text-[13px] py-5 px-4"
        style={{ borderTop: '1px solid #00D4FF15' }}
      >
        © ২০২৬ SkillWave. সর্বস্বত্ব সংরক্ষিত।
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div className="space-y-3">
      <h4 className="text-white font-semibold text-base">{title}</h4>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-ink-muted hover:text-cyan-glow text-sm transition-colors">{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
