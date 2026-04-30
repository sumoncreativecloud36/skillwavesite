import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import CourseCard from '../components/CourseCard.jsx';
import { supabase } from '../lib/supabase.js';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
      setCourses(data || []);
      setLoading(false);
    })();
  }, []);

  const filtered = q
    ? courses.filter((c) =>
        [c.title, c.instructor, c.description].some((v) => (v || '').toLowerCase().includes(q.toLowerCase()))
      )
    : courses;

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-12 md:pt-16 pb-20">
        <SectionHeader
          eyebrow="All courses"
          title="সব কোর্স ব্রাউজ করুন"
          subtitle="বিভিন্ন ক্যাটাগরিতে এক্সপার্টদের তৈরি কোর্স। নিজের গতিতে শিখুন।"
          align="left"
        />

        <div className="mb-10">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="input-dark max-w-md"
            placeholder="কোর্স খুঁজুন..."
          />
        </div>

        {loading ? (
          <div className="text-center py-20" style={{ color: '#7C8AA3' }}>লোড হচ্ছে...</div>
        ) : filtered.length === 0 ? (
          <div className="card p-12 text-center" style={{ color: '#7C8AA3' }}>
            কোনো কোর্স পাওয়া যায়নি
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => <CourseCard key={c.id} course={c} withActions />)}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
