import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext.jsx';

const HERO_FALLBACK =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80';

const VIDEO_EXT = /\.(mp4|webm|ogg|mov|m4v)(\?|$)/i;

export default function Hero() {
  const { settings } = useSite();
  const badgeOn = String(settings.hero_badge_visible) === 'true';
  const mediaUrl = settings.hero_video_url || settings.hero_image_url || HERO_FALLBACK;
  const isVideo = settings.hero_video_url || VIDEO_EXT.test(mediaUrl);

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(45deg, #6B6ECA 0%, #41B9F8 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(700px 380px at 80% 25%, rgba(255,255,255,0.18), transparent 60%), radial-gradient(500px 360px at 5% 90%, rgba(0,0,0,0.18), transparent 60%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div className="space-y-6 order-2 lg:order-1">
          {badgeOn && settings.hero_badge_text && (
            <span
              className="inline-flex items-center gap-2 rounded-full text-sm font-semibold"
              style={{
                background: 'rgba(255,255,255,0.18)',
                border: '1px solid rgba(255,255,255,0.4)',
                color: '#fff',
                padding: '6px 16px',
                backdropFilter: 'blur(8px)',
              }}
            >
              {settings.hero_badge_text}
            </span>
          )}
          <h1
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(32px, 5.2vw, 54px)',
              lineHeight: 1.08,
              color: '#fff',
              letterSpacing: '-0.02em',
            }}
          >
            {settings.hero_headline}
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.88)',
              fontSize: 17,
              lineHeight: 1.65,
              maxWidth: 560,
              fontFamily: 'Inter, sans-serif',
            }}
          >
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
                border: '1.5px solid rgba(255,255,255,0.7)',
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

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-4">
            {[
              { v: '১০K+', l: 'শিক্ষার্থী' },
              { v: '২০০+', l: 'কোর্স' },
              { v: '৪.৯/৫', l: 'রেটিং' },
            ].map((s) => (
              <div key={s.l}>
                <div style={{ fontFamily: 'Poppins', fontWeight: 700, color: '#fff', fontSize: 22, lineHeight: 1.1 }}>
                  {s.v}
                </div>
                <div className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div
            className="relative rounded-2xl overflow-hidden w-full"
            style={{
              aspectRatio: '16 / 9',
              border: '1px solid rgba(255,255,255,0.35)',
              boxShadow: '0 24px 60px -20px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.1)',
              background: '#0E1726',
            }}
          >
            {isVideo ? (
              <video
                src={mediaUrl}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <img src={mediaUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
            )}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(1,2,2,0.35))' }}
            />
            {!isVideo && (
              <button
                aria-label="play"
                className="absolute inset-0 flex items-center justify-center group"
                style={{ background: 'transparent' }}
              >
                <span
                  className="flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.92)',
                    color: '#41B9F8',
                    boxShadow: '0 14px 32px -10px rgba(0,0,0,0.35)',
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
