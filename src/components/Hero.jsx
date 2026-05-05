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
      style={{ background: 'linear-gradient(45deg, #6B6ECA 0%, #41B9F8 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(700px 380px at 80% 25%, #FFFFFF33, transparent 60%), radial-gradient(500px 360px at 5% 90%, #00000022, transparent 60%)',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-5 gap-10 items-center">
        <div className="md:col-span-3 space-y-6">
          {badgeOn && settings.hero_badge_text && (
            <span
              className="inline-flex items-center gap-2 rounded-full text-sm font-semibold"
              style={{ background: '#FFFFFF22', border: '1px solid #FFFFFF55', color: '#fff', padding: '6px 16px', backdropFilter: 'blur(8px)' }}
            >
              {settings.hero_badge_text}
            </span>
          )}
          <h1
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(34px, 5.5vw, 56px)',
              lineHeight: 1.08,
              color: '#fff',
              letterSpacing: '-0.02em',
            }}
          >
            {settings.hero_headline}
          </h1>
          <p style={{ color: '#FFFFFFD0', fontSize: 17, lineHeight: 1.65, maxWidth: 600, fontFamily: 'Inter, sans-serif' }}>
            {settings.hero_description}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to={settings.hero_btn1_url || '/signup'}
              className="rounded-[10px] font-semibold transition-all"
              style={{
                background: '#FFFFFF',
                color: '#41B9F8',
                padding: '12px 26px',
                fontFamily: 'Poppins, sans-serif',
                boxShadow: '0 10px 24px -8px rgba(0,0,0,0.25)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              {settings.hero_btn1_label}
            </Link>
            <Link
              to={settings.hero_btn2_url?.startsWith('/') ? settings.hero_btn2_url : '/about'}
              className="rounded-[10px] font-semibold transition-all"
              style={{
                background: 'transparent',
                border: '1.5px solid #FFFFFFAA',
                color: '#fff',
                padding: '10.5px 24px',
                fontFamily: 'Poppins, sans-serif',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              {settings.hero_btn2_label}
            </Link>
          </div>
        </div>

        <div className="md:col-span-2 relative">
          <div
            className="relative rounded-2xl overflow-hidden shadow-glow"
            style={{ aspectRatio: '4/3', border: '1px solid #FFFFFF44' }}
          >
            <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(1,2,2,0.45))' }} />
            <div
              className="absolute bottom-4 left-4 right-4 flex items-center gap-3 p-3 rounded-xl"
              style={{ background: '#FFFFFFEE', backdropFilter: 'blur(8px)' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(45deg, #6B6ECA, #41B9F8)', color: '#fff' }}
              >
                ▶
              </div>
              <div>
                <div className="font-head font-semibold" style={{ color: '#010202', fontSize: 14 }}>নতুন ব্যাচ</div>
                <div className="text-xs" style={{ color: '#6B7280' }}>ভর্তি চলছে — সীমিত আসন</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
