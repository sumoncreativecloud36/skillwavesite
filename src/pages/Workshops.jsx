import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { Link } from 'react-router-dom';

export default function WorkshopsPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 lg:px-8 pt-16 md:pt-24 pb-24">
        <div className="text-xs uppercase tracking-[0.18em] font-semibold mb-4 gradient-text" style={{ fontFamily: 'Poppins' }}>
          Workshops
        </div>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 'clamp(36px, 6vw, 60px)', color: '#010202' }} className="mb-6">
          লাইভ ওয়ার্কশপ
        </h1>
        <p className="text-lg" style={{ color: '#374151', fontFamily: 'Inter' }}>
          ইন্ডাস্ট্রি এক্সপার্টদের সাথে লাইভ সেশন। শীঘ্রই আসছে।
        </p>
        <div className="card p-12 mt-12 text-center" style={{ color: '#6B7280' }}>
          <p className="mb-6">এখনো কোনো ওয়ার্কশপ নেই</p>
          <Link to="/courses" className="btn-gradient">কোর্স দেখুন →</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
