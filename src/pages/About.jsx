import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 lg:px-8 pt-16 md:pt-24 pb-24">
        <div className="eyebrow mb-4">About SkillWave</div>
        <h1 className="display text-white text-5xl md:text-6xl mb-8">
          বাংলায় শেখার <span className="gradient-text">নতুন ঢেউ</span>
        </h1>
        <p className="text-lg leading-relaxed mb-6" style={{ color: '#A8B5CC' }}>
          SkillWave একটি বাংলাদেশি অনলাইন লার্নিং প্ল্যাটফর্ম। আমাদের লক্ষ্য — দেশের প্রতিটি শিক্ষার্থীর হাতে বিশ্বমানের কোর্স, ই-বুক ও মেন্টরশিপ পৌঁছে দেওয়া। বাংলায়, সহজভাবে, দক্ষ ইন্ডাস্ট্রি এক্সপার্টদের কাছ থেকে।
        </p>
        <p className="text-lg leading-relaxed mb-12" style={{ color: '#A8B5CC' }}>
          প্রতিটি কোর্স তৈরি হয় বাস্তব কাজের অভিজ্ঞতা থেকে — তত্ত্ব নয়, কাজে লাগানোর মতো স্কিল। আজই শুরু করুন আপনার ক্যারিয়ার যাত্রা।
        </p>

        <div className="divider-soft my-12" />

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { v: '১০K+', l: 'সক্রিয় শিক্ষার্থী' },
            { v: '২০০+', l: 'কোর্স ও ই-বুক' },
            { v: '৪.৯/৫', l: 'গড় রেটিং' },
          ].map((s) => (
            <div key={s.l} className="card p-6">
              <div className="display text-white text-4xl">{s.v}</div>
              <div className="eyebrow mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
