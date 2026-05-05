import { Link } from 'react-router-dom';

const EBOOK_FALLBACKS = [
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80',
];
function fallbackFor(id = '') {
  const i = String(id).split('').reduce((a, c) => a + c.charCodeAt(0), 0) % EBOOK_FALLBACKS.length;
  return EBOOK_FALLBACKS[i];
}

export default function EbookCard({ ebook }) {
  const cover = ebook.cover_url || fallbackFor(ebook.id);
  return (
    <Link
      to={`/ebooks/${ebook.id}`}
      className="card card-hover overflow-hidden flex flex-col group"
    >
      <div className="overflow-hidden flex items-center justify-center" style={{ aspectRatio: '512 / 800', background: '#F3F4F6' }}>
        <img
          src={cover}
          alt={ebook.title}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          style={{ background: '#F3F4F6' }}
        />
      </div>
      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <h3 className="font-head line-clamp-2" style={{ color: '#010202', fontWeight: 600, fontSize: 15, lineHeight: 1.3 }}>
          {ebook.title}
        </h3>
        <div style={{ color: '#6B7280', fontSize: 13 }}>{ebook.author}</div>
        <div className="gradient-text mt-auto" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 17 }}>
          ৳{ebook.price}
        </div>
        <span className="btn-outline !px-3 !py-1 self-start mt-2" style={{ fontSize: 12 }}>
          বিস্তারিত →
        </span>
      </div>
    </Link>
  );
}
