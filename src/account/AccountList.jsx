import { Link } from 'react-router-dom';

export default function AccountList({ icon, title, emptyText, browseTo, browseLabel, items = [] }) {
  return (
    <div
      className="rounded-2xl p-7"
      style={{ background: '#0D1526CC', border: '1px solid #00D4FF22', backdropFilter: 'blur(8px)' }}
    >
      <h1 className="text-white flex items-center gap-3 mb-6" style={{ fontFamily: 'Hind Siliguri, Poppins', fontWeight: 700, fontSize: 28 }}>
        <span>{icon}</span> {title}
      </h1>
      {items.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4 opacity-50">{icon}</div>
          <p className="mb-6" style={{ color: '#A0AEC0' }}>{emptyText}</p>
          {browseTo && (
            <Link to={browseTo} className="btn-primary">{browseLabel || 'ব্রাউজ করুন'} →</Link>
          )}
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((it, i) => (
            <li key={i} className="p-4 rounded-xl" style={{ background: '#0B0F1980', border: '1px solid #00D4FF15' }}>
              {it}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
