import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 lg:px-8 pt-16 md:pt-24 pb-24">
        <div className="eyebrow mb-4">Journal</div>
        <h1 className="display text-white text-5xl md:text-6xl mb-8">ব্লগ</h1>
        <p className="text-lg" style={{ color: '#A8B5CC' }}>
          শীঘ্রই আসছে — শেখার গল্প, ক্যারিয়ার গাইড, ও ইন্ডাস্ট্রি ইনসাইট।
        </p>
        <div className="card p-12 mt-12 text-center" style={{ color: '#7C8AA3' }}>
          এখনো কোনো পোস্ট নেই
        </div>
      </main>
      <Footer />
    </>
  );
}
