export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-10 max-w-2xl mx-auto">
      <h2 className="gradient-text font-bold text-2xl md:text-3xl">{title}</h2>
      {subtitle && <p className="mt-3 text-ink-muted text-[15px]">{subtitle}</p>}
    </div>
  );
}
