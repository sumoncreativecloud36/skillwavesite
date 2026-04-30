import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import EbookCard from '../components/EbookCard.jsx';
import { supabase } from '../lib/supabase.js';

export default function EbooksPage() {
  const [ebooks, setEbooks] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('ebooks').select('*').order('created_at', { ascending: false });
      setEbooks(data || []);
      setLoading(false);
    })();
  }, []);

  const filtered = q
    ? ebooks.filter((b) =>
        [b.title, b.author, b.description].some((v) => (v || '').toLowerCase().includes(q.toLowerCase()))
      )
    : ebooks;

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-12 md:pt-16 pb-20">
        <SectionHeader
          eyebrow="Library"
          title="ই-বুক লাইব্রেরি"
          subtitle="শেখার যাত্রায় সঙ্গী, সেরা লেখকদের নির্বাচিত ই-বুক।"
          align="left"
        />

        <div className="mb-10">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="input-dark max-w-md"
            placeholder="ই-বুক খুঁজুন..."
          />
        </div>

        {loading ? (
          <div className="text-center py-20" style={{ color: '#7C8AA3' }}>লোড হচ্ছে...</div>
        ) : filtered.length === 0 ? (
          <div className="card p-12 text-center" style={{ color: '#7C8AA3' }}>
            কোনো ই-বুক পাওয়া যায়নি
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((b) => <EbookCard key={b.id} ebook={b} />)}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
