export default function EbookCard({ ebook }) {
  return (
    <div className="card card-hover overflow-hidden flex flex-col">
      <div className="overflow-hidden bg-bg-base" style={{ aspectRatio: '1 / 1.4' }}>
        {ebook.cover_url ? (
          <img src={ebook.cover_url} alt={ebook.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-cyan-glow opacity-30 text-2xl font-bold">SW</div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <h3 className="font-semibold text-[15px] text-white line-clamp-2">{ebook.title}</h3>
        <div className="text-[13px] text-ink-muted font-light">{ebook.author}</div>
        <div className="text-cyan-glow font-bold text-base mt-auto">৳{ebook.price}</div>
        <a
          href={ebook.purchase_url || '#'}
          className="btn-outline !px-3 !py-1 !text-[12px] self-start mt-2"
        >
          বিস্তারিত →
        </a>
      </div>
    </div>
  );
}
