import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext.jsx';

const HERO_FALLBACK =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80';

export default function Hero() {
  const { settings } = useSite();
  const badgeOn = String(settings.hero_badge_visible) === 'true';
  const heroImg = settings.hero_image_url || HERO_FALLBACK;

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A2540, #00D4FF15)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(600px 400px at 85% 20%, #00D4FF22, transparent 60%), radial-gradient(500px 350px at 10% 90%, #1E3A8A33, transparent 60%)',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-16 md:py-24 grid md:grid-cols-5 gap-10 items-center">
        <div className="md:col-span-3 space-y-6">
          {badgeOn && settings.hero_badge_text && (
            <span className="pill-badge font-medium" style={{ fontWeight: 500 }}>
              {settings.hero_badge_text}
            </span>
          )}
          <h1
            className="gradient-text font-head"
            style={{ fontWeight: 700, fontSize: 'clamp(32px, 5vw, 44px)', lineHeight: 1.2 }}
          >
            {settings.hero_headline}
          </h1>
          <p className="font-body" style={{ color: '#A0AEC0', fontSize: 16, lineHeight: 1.65, maxWidth: 560 }}>
            {settings.hero_description}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link to={settings.hero_btn1_url || '/signup'} className="btn-primary">
              {settings.hero_btn1_label}
            </Link>
            <Link to={settings.hero_btn2_url?.startsWith('/') ? settings.hero_btn2_url : '/about'} className="btn-outline">
              {settings.hero_btn2_label}
            </Link>
          </div>
        </div>

        <div className="md:col-span-2 relative">
          <div
            className="relative rounded-xl overflow-hidden shadow-glow"
            style={{ aspectRatio: '4/3', border: '1px solid #00D4FF22' }}
          >
            <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-90" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(140deg, rgba(13,21,38,0.55), rgba(10,37,64,0.25) 60%, rgba(0,212,255,0.08))',
              }}
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 p-3 rounded-lg" style={{
              background: '#0D1526CC',
              border: '1px solid #00D4FF22',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#00D4FF22', color: '#00D4FF', border: '1px solid #00D4FF55' }}>▶</div>
              <div>
                <div className="text-white text-sm font-semibold font-head">নতুন ব্যাচ</div>
                <div className="text-xs" style={{ color: '#A0AEC0' }}>ভর্তি চলছে — সীমিত আসন</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
