import { NavLink, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase.js';
import BrandingPanel from '../admin/BrandingPanel.jsx';
import HeroPanel from '../admin/HeroPanel.jsx';
import CoursesPanel from '../admin/CoursesPanel.jsx';
import EbooksPanel from '../admin/EbooksPanel.jsx';
import ReviewsPanel from '../admin/ReviewsPanel.jsx';
import SectionsPanel from '../admin/SectionsPanel.jsx';

const items = [
  { to: 'branding', label: 'ব্র্যান্ডিং' },
  { to: 'hero', label: 'হিরো ব্যানার' },
  { to: 'courses', label: 'কোর্স' },
  { to: 'ebooks', label: 'ই-বুক' },
  { to: 'reviews', label: 'রিভিউ' },
  { to: 'sections', label: 'সেকশন সেটিংস' },
];

export default function AdminDashboard() {
  const nav = useNavigate();
  async function logout() {
    await supabase.auth.signOut();
    nav('/admin/login', { replace: true });
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside
        className="md:w-64 shrink-0 p-4 md:min-h-screen"
        style={{ background: '#0A2540', borderRight: '1px solid #00D4FF22' }}
      >
        <div className="text-cyan-glow font-head font-bold text-xl mb-6">SkillWave অ্যাডমিন</div>
        <nav className="flex md:flex-col gap-2 overflow-x-auto">
          {items.map((i) => (
            <NavLink
              key={i.to}
              to={i.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  isActive ? 'bg-cyan-glow/20 text-cyan-glow' : 'text-ink-muted hover:text-cyan-glow'
                }`
              }
              style={({ isActive }) => isActive ? { background: '#00D4FF22', color: '#00D4FF' } : {}}
            >
              {i.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={logout}
          className="mt-6 w-full text-left px-3 py-2 rounded-lg text-sm text-ink-muted hover:text-red-400"
        >
          লগআউট
        </button>
      </aside>
      <main className="flex-1 p-6 md:p-10 overflow-x-auto">
        <Routes>
          <Route index element={<Navigate to="branding" replace />} />
          <Route path="branding" element={<BrandingPanel />} />
          <Route path="hero" element={<HeroPanel />} />
          <Route path="courses" element={<CoursesPanel />} />
          <Route path="ebooks" element={<EbooksPanel />} />
          <Route path="reviews" element={<ReviewsPanel />} />
          <Route path="sections" element={<SectionsPanel />} />
        </Routes>
      </main>
    </div>
  );
}
