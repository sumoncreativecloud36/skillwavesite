export default function SectionHeader({ title, subtitle, eyebrow, align = 'center' }) {
  const wrap = align === 'left' ? 'mb-10' : 'mb-12 text-center max-w-2xl mx-auto';
  return (
    <div className={wrap}>
      {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
      <h2 className="display text-white text-3xl md:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-[15px]" style={{ color: '#A8B5CC' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
