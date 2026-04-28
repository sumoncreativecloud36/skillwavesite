import { useSite } from '../context/SiteContext.jsx';

export default function Hero() {
  const { settings } = useSite();
  const badgeOn = String(settings.hero_badge_visible) === 'true';

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A2540, #00D4FF15)' }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 md:py-24 grid md:grid-cols-5 gap-10 items-center">
        <div className="md:col-span-3 space-y-6">
          {badgeOn && settings.hero_badge_text && (
            <span className="pill-badge font-medium">{settings.hero_badge_text}</span>
          )}
          <h1 className="gradient-text font-bold text-4xl md:text-5xl leading-tight">
            {settings.hero_headline}
          </h1>
          <p className="text-ink-muted text-base md:text-lg max-w-xl">
            {settings.hero_description}
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={settings.hero_btn1_url || '#'} className="btn-primary">
              {settings.hero_btn1_label}
            </a>
            <a href={settings.hero_btn2_url || '#'} className="btn-outline">
              {settings.hero_btn2_label}
            </a>
          </div>
        </div>
        <div className="md:col-span-2">
          {settings.hero_image_url ? (
            <img
              src={settings.hero_image_url}
              alt="hero"
              className="w-full rounded-xl object-cover shadow-glow"
              style={{ aspectRatio: '4/3' }}
            />
          ) : (
            <div
              className="w-full rounded-xl shadow-glow flex items-center justify-center"
              style={{
                aspectRatio: '4/3',
                background: 'linear-gradient(135deg, #0D1526, #0A2540)',
                border: '1px solid #00D4FF22',
              }}
            >
              <span className="text-cyan-glow text-6xl font-bold opacity-30">SW</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
