export default function EbookCard({ ebook }) {
  return (
    <div className="card card-hover overflow-hidden flex flex-col">
      <div className="overflow-hidden" style={{ aspectRatio: '1 / 1.4', background: '#0B1220' }}>
        {ebook.cover_url ? (
          <img src={ebook.cover_url} alt={ebook.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center display text-2xl" style={{ color: '#00D4FF22' }}>SW</div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <h3 className="font-semibold text-[15px] text-white line-clamp-2 leading-snug">{ebook.title}</h3>
        <div className="text-[13px]" style={{ color: '#7C8AA3' }}>{ebook.author}</div>
        <div className="display text-white text-base mt-auto">৳{ebook.price}</div>
        <a
          href={ebook.purchase_url || '#'}
          className="text-[12px] font-medium self-start mt-2 transition-colors"
          style={{ color: '#00D4FF' }}
        >
          বিস্তারিত →
        </a>
      </div>
    </div>
  );
}
