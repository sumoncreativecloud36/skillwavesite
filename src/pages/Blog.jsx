import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 lg:px-8 pt-16 md:pt-24 pb-24">
        <div className="text-xs uppercase tracking-[0.18em] font-semibold mb-4 gradient-text" style={{ fontFamily: 'Poppins' }}>
          Journal
        </div>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 'clamp(36px, 6vw, 60px)', color: '#010202' }} className="mb-6">
          ব্লগ
        </h1>
        <p className="text-lg" style={{ color: '#374151', fontFamily: 'Inter' }}>
          শীঘ্রই আসছে — শেখার গল্প, ক্যারিয়ার গাইড, ও ইন্ডাস্ট্রি ইনসাইট।
        </p>
        <div className="card p-12 mt-12 text-center" style={{ color: '#6B7280' }}>
          এখনো কোনো পোস্ট নেই
        </div>
      </main>
      <Footer />
    </>
  );
}
