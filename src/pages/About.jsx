import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 lg:px-8 pt-16 md:pt-24 pb-24">
        <div className="text-xs uppercase tracking-[0.18em] font-semibold mb-4 gradient-text" style={{ fontFamily: 'Poppins' }}>
          About SkillWave
        </div>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 'clamp(36px, 6vw, 60px)', lineHeight: 1.05, color: '#010202' }}>
          বাংলায় শেখার <span className="gradient-text">নতুন ঢেউ</span>
        </h1>
        <p className="text-lg leading-relaxed mb-6 mt-8" style={{ color: '#374151', fontFamily: 'Inter' }}>
          SkillWave একটি বাংলাদেশি অনলাইন লার্নিং প্ল্যাটফর্ম। আমাদের লক্ষ্য — দেশের প্রতিটি শিক্ষার্থীর হাতে বিশ্বমানের কোর্স, ই-বুক ও মেন্টরশিপ পৌঁছে দেওয়া। বাংলায়, সহজভাবে, দক্ষ ইন্ডাস্ট্রি এক্সপার্টদের কাছ থেকে।
        </p>
        <p className="text-lg leading-relaxed mb-12" style={{ color: '#374151', fontFamily: 'Inter' }}>
          প্রতিটি কোর্স তৈরি হয় বাস্তব কাজের অভিজ্ঞতা থেকে — তত্ত্ব নয়, কাজে লাগানোর মতো স্কিল। আজই শুরু করুন আপনার ক্যারিয়ার যাত্রা।
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { v: '১০K+', l: 'সক্রিয় শিক্ষার্থী' },
            { v: '২০০+', l: 'কোর্স ও ই-বুক' },
            { v: '৪.৯/৫', l: 'গড় রেটিং' },
          ].map((s) => (
            <div key={s.l} className="card p-6">
              <div className="gradient-text" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 36, lineHeight: 1.1 }}>{s.v}</div>
              <div className="text-xs uppercase tracking-[0.18em] font-semibold mt-2" style={{ color: '#6B7280' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
