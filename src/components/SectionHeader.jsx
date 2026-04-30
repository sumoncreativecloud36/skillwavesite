export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-10 max-w-2xl mx-auto">
      <h2
        className="gradient-text font-head"
        style={{ fontWeight: 700, fontSize: 'clamp(24px, 3.5vw, 30px)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 font-body" style={{ color: '#A0AEC0', fontSize: 15, lineHeight: 1.65 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
