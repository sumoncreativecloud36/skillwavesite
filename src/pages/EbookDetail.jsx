import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { StarIcon } from '../components/Icons.jsx';
import { supabase } from '../lib/supabase.js';

const FALLBACK_FAQ = [
  {
    q: 'এই ইবুকটি কাদের জন্য?',
    a: 'যারা ChatGPT, Gemini বা অন্যান্য AI টুল আরও কার্যকরভাবে ব্যবহার করতে চান — শিক্ষার্থী, প্রফেশনাল, ফ্রিল্যান্সার সবার জন্য।',
  },
  {
    q: 'ইবুকটি কি বাংলায়?',
    a: 'হ্যাঁ, পুরো ইবুকটি সহজ বাংলায় লেখা — উদাহরণসহ ব্যাখ্যা করা হয়েছে যাতে সবাই বুঝতে পারে।',
  },
  {
    q: 'ইবুক কীভাবে পাব?',
    a: 'পেমেন্ট সম্পন্ন হওয়ার সাথে সাথে আপনার অ্যাকাউন্টে ডাউনলোড লিংক পাঠানো হবে। আজীবন অ্যাক্সেস।',
  },
];

export default function EbookDetail() {
  const { id } = useParams();
  const [ebook, setEbook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase.from('ebooks').select('*').eq('id', id).maybeSingle();
      setEbook(data);
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-[60vh] flex items-center justify-center" style={{ color: '#6B7280' }}>লোড হচ্ছে...</main>
        <Footer />
      </>
    );
  }
  if (!ebook) {
    return (
      <>
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 py-24 text-center">
          <h1 style={{ fontFamily: 'Poppins', fontSize: 32, fontWeight: 700, color: '#010202' }}>ইবুক পাওয়া যায়নি</h1>
          <Link to="/ebooks" className="btn-gradient mt-6 inline-flex">সব ইবুক দেখুন</Link>
        </main>
        <Footer />
      </>
    );
  }

  const sale = Number(ebook.price) || 0;
  const orig = Number(ebook.original_price) || 0;
  const discount = orig > 0 && sale < orig ? Math.round(((orig - sale) / orig) * 100) : 0;
  const faq = Array.isArray(ebook.faq) && ebook.faq.length ? ebook.faq : FALLBACK_FAQ;

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        <div className="text-sm mb-6 flex items-center gap-2 flex-wrap" style={{ color: '#6B7280', fontFamily: 'Inter' }}>
          <Link to="/" className="hover:text-[#41B9F8]">🏠 Home</Link>
          <span>›</span>
          <Link to="/ebooks" className="hover:text-[#41B9F8]">ই-বুক</Link>
          <span>›</span>
          <span style={{ color: '#010202', fontWeight: 500 }} className="truncate max-w-[200px] sm:max-w-none">{ebook.title}</span>
        </div>

        <div className="grid lg:grid-cols-[440px,1fr] gap-8 lg:gap-12">
          <div className="space-y-4">
            <div
              className="rounded-2xl overflow-hidden flex items-center justify-center"
              style={{
                aspectRatio: '512 / 800',
                background: 'linear-gradient(135deg, rgba(107,110,202,0.05), rgba(65,185,248,0.05))',
                border: '1px solid #E8EAF2',
                boxShadow: '0 24px 60px -20px rgba(107,110,202,0.30)',
              }}
            >
              {ebook.cover_url ? (
                <img src={ebook.cover_url} alt={ebook.title} className="w-full h-full object-contain" />
              ) : (
                <div className="text-5xl opacity-30">📖</div>
              )}
            </div>
          </div>

          <div className="space-y-5">
            <h1 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.15, color: '#010202' }}>
              {ebook.title}
            </h1>
            {ebook.author && (
              <div className="text-base" style={{ color: '#6B7280' }}>লেখক: <span style={{ color: '#010202', fontWeight: 500 }}>{ebook.author}</span></div>
            )}
            {ebook.description && (
              <p className="text-[15px] leading-relaxed" style={{ color: '#374151', fontFamily: 'Inter' }}>
                {ebook.description}
              </p>
            )}

            <div
              className="rounded-2xl p-5 flex items-center gap-4 flex-wrap"
              style={{
                background: 'linear-gradient(135deg, rgba(107,110,202,0.07), rgba(65,185,248,0.07)), #FFFFFF',
                border: '1px solid #E8EAF2',
                boxShadow: '0 6px 20px -10px rgba(107,110,202,0.18)',
              }}
            >
              <div className="gradient-text" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 32, lineHeight: 1 }}>
                ৳{sale}
              </div>
              {orig > 0 && (
                <div style={{ color: '#9CA3AF', fontSize: 18, textDecoration: 'line-through' }}>৳{orig}</div>
              )}
              {discount > 0 && (
                <span
                  className="rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{
                    background: 'linear-gradient(45deg, #6B6ECA, #41B9F8)',
                    color: '#fff',
                    padding: '5px 12px',
                  }}
                >
                  {discount}% ছাড়
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="btn-outline">
                🛒 Add To Cart
              </button>
              <a href={ebook.purchase_url || '#'} className="btn-gradient">
                Buy Now →
              </a>
            </div>

            <ul className="grid grid-cols-2 gap-3 pt-2">
              {[
                { icon: '✓', label: 'আজীবন অ্যাক্সেস' },
                { icon: '✓', label: 'মোবাইল-ফ্রেন্ডলি PDF' },
                { icon: '✓', label: 'নিয়মিত আপডেট' },
                { icon: '✓', label: '২৪/৭ সাপোর্ট' },
              ].map((it) => (
                <li key={it.label} className="flex items-center gap-2 text-sm" style={{ color: '#374151' }}>
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                    style={{ background: 'rgba(65,185,248,0.15)', color: '#41B9F8', border: '1px solid rgba(65,185,248,0.4)' }}
                  >
                    {it.icon}
                  </span>
                  {it.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <SectionTitle>বিস্তারিত</SectionTitle>
        <div className="card p-6 sm:p-8 mt-4 max-w-4xl">
          <p className="text-[15px] leading-loose whitespace-pre-line" style={{ color: '#374151', fontFamily: 'Inter' }}>
            {ebook.long_description ||
              `আপনার জানা AI নলেজ কি ৩ মাস আগের? তাহলে আপনি পিছিয়ে আছেন! AI দিয়ে এখন অনেক কিছুই করা যায়!\n\nঅনেকেই চ্যাটজিপিটি বা Gemini এর মতো চ্যাটবট সলিউশনে শুধুমাত্র চ্যাট করে... কিন্তু চ্যাট করলে উত্তর পাবেন, আর ইঞ্জিনিয়ারিং করলে পাবেন 'সলিউশন'। কীভাবে সাধারণ চ্যাটবটকে আপনার পার্সোনাল অ্যাসিস্ট্যান্ট বানাবেন, তার A-to-Z গাইডলাইন থাকছে এই ইবুকে!`}
          </p>
        </div>

        <SectionTitle>সচরাচর জিজ্ঞাসা</SectionTitle>
        <div className="card mt-4 max-w-4xl divide-y" style={{ borderColor: '#E8EAF2' }}>
          {faq.map((item, i) => <FaqItem key={i} q={item.q} a={item.a} />)}
        </div>

        <SectionTitle>Reviews</SectionTitle>
        <ReviewsBlock ebookId={ebook.id} />
      </main>
      <Footer />
    </>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="mt-12 mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 26, color: '#010202' }}>
      {children}
    </h2>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-left p-5 transition-colors hover:bg-gray-50"
      >
        <span style={{ color: '#010202', fontFamily: 'Poppins', fontWeight: 500, fontSize: 15 }}>{q}</span>
        <span
          className="ml-4 w-7 h-7 rounded-full flex items-center justify-center transition-transform shrink-0"
          style={{
            background: open ? 'linear-gradient(45deg, #6B6ECA, #41B9F8)' : '#F3F4F6',
            color: open ? '#fff' : '#6B7280',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            fontSize: 18,
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: '#374151', fontFamily: 'Inter' }}>
          {a}
        </div>
      )}
    </div>
  );
}

function ReviewsBlock() {
  const [tab, setTab] = useState('recent');
  const buckets = [5, 4, 3, 2, 1];
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  const total = 0;
  const avg = 0;

  return (
    <div className="card p-6 sm:p-8 mt-4 max-w-4xl">
      <div className="grid sm:grid-cols-[180px,1fr] gap-6 sm:gap-10 items-center">
        <div className="text-center">
          <div className="gradient-text" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 56, lineHeight: 1 }}>
            {avg.toFixed(1)}
          </div>
          <div className="flex justify-center gap-1 my-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <StarIcon key={i} filled={i < Math.round(avg)} className="w-4 h-4" style={{ color: '#41B9F8' }} />
            ))}
          </div>
          <div className="text-sm" style={{ color: '#6B7280' }}>({total})</div>
        </div>
        <div className="space-y-2">
          {buckets.map((b) => {
            const pct = total ? (counts[b] / total) * 100 : 0;
            return (
              <div key={b} className="flex items-center gap-3">
                <span className="text-sm w-4" style={{ color: '#374151' }}>{b}</span>
                <StarIcon filled className="w-3.5 h-3.5" style={{ color: '#41B9F8' }} />
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#F3F4F6' }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #6B6ECA, #41B9F8)' }} />
                </div>
                <span className="text-xs w-8 text-right" style={{ color: '#6B7280' }}>({counts[b]})</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex gap-2 flex-wrap" style={{ borderTop: '1px solid #E8EAF2', paddingTop: 20 }}>
        {[
          { k: 'all', label: 'All Review' },
          { k: 'recent', label: 'Most Recent' },
        ].map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
            style={
              tab === t.k
                ? { background: 'linear-gradient(45deg, #6B6ECA, #41B9F8)', color: '#fff' }
                : { background: '#F3F4F6', color: '#374151' }
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 text-center py-10" style={{ color: '#6B7280' }}>
        এখনো কোনো রিভিউ নেই — প্রথম রিভিউ লিখুন!
      </div>
    </div>
  );
}
