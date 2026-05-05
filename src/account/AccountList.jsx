import { Link } from 'react-router-dom';

export default function AccountList({ icon, title, emptyText, browseTo, browseLabel, items = [] }) {
  return (
    <div
      className="rounded-2xl p-5 sm:p-7"
      style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 6px 20px -10px rgba(107,110,202,0.18)' }}
    >
      <h1 className="flex items-center gap-3 mb-6" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 26, color: '#010202' }}>
        <span>{icon}</span> {title}
      </h1>
      {items.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4 opacity-40">{icon}</div>
          <p className="mb-6" style={{ color: '#6B7280', fontFamily: 'Inter' }}>{emptyText}</p>
          {browseTo && (
            <Link to={browseTo} className="btn-gradient">{browseLabel || 'ব্রাউজ করুন'} →</Link>
          )}
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((it, i) => (
            <li key={i} className="p-4 rounded-xl" style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}>
              {it}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
