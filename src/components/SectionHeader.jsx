export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-10 max-w-2xl mx-auto">
      <h2
        className="gradient-text"
        style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 'clamp(26px, 4vw, 36px)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3" style={{ color: '#6B7280', fontSize: 16, lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
