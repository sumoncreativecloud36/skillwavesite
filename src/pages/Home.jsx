import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Footer from '../components/Footer.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import CourseCard from '../components/CourseCard.jsx';
import EbookCard from '../components/EbookCard.jsx';
import ReviewCard from '../components/ReviewCard.jsx';
import { supabase } from '../lib/supabase.js';
import { useSite } from '../context/SiteContext.jsx';

const SECTION_DEFAULTS = {
  top_selling: { heading: 'টপ সেলিং কোর্স', subtitle: 'সবচেয়ে জনপ্রিয় কোর্সগুলো এক নজরে' },
  featured_courses: { heading: 'ফিচার্ড কোর্স', subtitle: 'এক্সপার্টদের নির্বাচিত সেরা কোর্স' },
  featured_ebooks: { heading: 'ফিচার্ড ই-বুক', subtitle: 'আপনার পথচলার সঙ্গী সেরা বইগুলো' },
  reviews: { heading: 'শিক্ষার্থীদের মতামত', subtitle: 'যারা আমাদের সাথে শিখছেন তাদের অভিজ্ঞতা' },
};

function useSectionMeta(key) {
  const { sections } = useSite();
  const def = SECTION_DEFAULTS[key] || {};
  const row = sections[key];
  return {
    visible: row ? row.is_visible : true,
    heading: row?.heading || def.heading,
    subtitle: row?.subtitle || def.subtitle,
  };
}

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [ebooks, setEbooks] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    (async () => {
      const [{ data: c }, { data: e }, { data: r }] = await Promise.all([
        supabase.from('courses').select('*').order('created_at', { ascending: false }),
        supabase.from('ebooks').select('*').order('created_at', { ascending: false }),
        supabase.from('reviews').select('*').eq('is_approved', true).order('created_at', { ascending: false }),
      ]);
      setCourses(c || []);
      setEbooks(e || []);
      setReviews(r || []);
    })();
  }, []);

  const topSelling = courses.filter((c) => Number(c.review_count) > 0).slice(0, 3).length
    ? courses.filter((c) => Number(c.review_count) > 0).slice(0, 3)
    : courses.slice(0, 3);
  const featured = courses.filter((c) => c.is_featured).slice(0, 6);
  const featuredEbooks = ebooks.filter((e) => e.is_featured).slice(0, 8);

  const top = useSectionMeta('top_selling');
  const feat = useSectionMeta('featured_courses');
  const eb = useSectionMeta('featured_ebooks');
  const rv = useSectionMeta('reviews');

  return (
    <>
      <Navbar />
      <Hero />

      {top.visible && (
        <section id="courses" className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
          <SectionHeader title={top.heading} subtitle={top.subtitle} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topSelling.map((c) => <CourseCard key={c.id} course={c} />)}
            {topSelling.length === 0 && <EmptyHint label="এখনো কোনো কোর্স যোগ হয়নি" />}
          </div>
        </section>
      )}

      {feat.visible && (
        <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
          <SectionHeader title={feat.heading} subtitle={feat.subtitle} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((c) => <CourseCard key={c.id} course={c} withActions />)}
            {featured.length === 0 && <EmptyHint label="ফিচার্ড কোর্স যোগ করুন অ্যাডমিন প্যানেল থেকে" />}
          </div>
          {featured.length > 0 && (
            <div className="text-center mt-10">
              <a href="#all-courses" className="btn-primary">আরও দেখুন →</a>
            </div>
          )}
        </section>
      )}

      {eb.visible && (
        <section id="ebooks" className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
          <SectionHeader title={eb.heading} subtitle={eb.subtitle} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredEbooks.map((e) => <EbookCard key={e.id} ebook={e} />)}
            {featuredEbooks.length === 0 && <EmptyHint label="এখনো কোনো ই-বুক যোগ হয়নি" />}
          </div>
          {featuredEbooks.length > 0 && (
            <div className="text-center mt-10">
              <a href="#all-ebooks" className="btn-primary">আরও দেখুন →</a>
            </div>
          )}
        </section>
      )}

      {rv.visible && (
        <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
          <SectionHeader title={rv.heading} subtitle={rv.subtitle} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.slice(0, 8).map((r) => <ReviewCard key={r.id} review={r} />)}
            {reviews.length === 0 && <EmptyHint label="রিভিউ আসছে শীঘ্রই" />}
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}

function EmptyHint({ label }) {
  return (
    <div className="col-span-full text-center text-ink-muted py-12 card border-dashed">
      {label}
    </div>
  );
}
