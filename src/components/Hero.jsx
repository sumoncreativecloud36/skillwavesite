import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext.jsx';

export default function Hero() {
  const { settings } = useSite();
  const badgeOn = String(settings.hero_badge_visible) === 'true';

  return (
    <section className="relative overflow-hidden">
      <div className="glow-orb" style={{ width: 520, height: 520, background: '#00D4FF', top: -120, right: -120 }} />
      <div className="glow-orb" style={{ width: 420, height: 420, background: '#1E3A8A', bottom: -160, left: -120, opacity: 0.35 }} />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-20 md:pt-28 pb-20 md:pb-28 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7 space-y-7">
          {badgeOn && settings.hero_badge_text && (
            <span className="pill-badge">{settings.hero_badge_text}</span>
          )}
          <h1 className="display text-white text-5xl md:text-7xl">
            {settings.hero_headline}
          </h1>
          <p className="text-[17px] md:text-lg max-w-2xl" style={{ color: '#A8B5CC' }}>
            {settings.hero_description}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link to={settings.hero_btn1_url || '/signup'} className="btn-primary">
              {settings.hero_btn1_label}
            </Link>
            <Link to="/about" className="btn-outline">
              {settings.hero_btn2_label}
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 pt-8">
            <Stat value="১০K+" label="শিক্ষার্থী" />
            <Stat value="২০০+" label="কোর্স" />
            <Stat value="৪.৯/৫" label="রেটিং" />
          </div>
        </div>

        <div className="md:col-span-5">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: '4/5', border: '1px solid #FFFFFF14', background: 'linear-gradient(140deg, #0E1726, #0A2540)' }}
          >
            {settings.hero_image_url ? (
              <img src={settings.hero_image_url} alt="hero" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="display text-7xl" style={{ color: '#00D4FF22' }}>SW</span>
              </div>
            )}
            <div
              className="absolute inset-x-0 bottom-0 p-5"
              style={{ background: 'linear-gradient(180deg, transparent, #060A14EE)' }}
            >
              <div className="eyebrow mb-1">Live Now</div>
              <div className="text-white font-semibold">নতুন ব্যাচ — ভর্তি চলছে</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="display text-white text-2xl md:text-3xl">{value}</div>
      <div className="text-xs uppercase tracking-widest mt-1" style={{ color: '#7C8AA3' }}>{label}</div>
    </div>
  );
}
