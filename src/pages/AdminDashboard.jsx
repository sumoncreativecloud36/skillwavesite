import { NavLink, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase.js';
import BrandingPanel from '../admin/BrandingPanel.jsx';
import HeroPanel from '../admin/HeroPanel.jsx';
import CoursesPanel from '../admin/CoursesPanel.jsx';
import EbooksPanel from '../admin/EbooksPanel.jsx';
import ReviewsPanel from '../admin/ReviewsPanel.jsx';
import SectionsPanel from '../admin/SectionsPanel.jsx';

const items = [
  { to: 'branding', label: 'ব্র্যান্ডিং', icon: '🎨' },
  { to: 'hero',     label: 'হিরো ব্যানার', icon: '🌟' },
  { to: 'courses',  label: 'কোর্স', icon: '📚' },
  { to: 'ebooks',   label: 'ই-বুক', icon: '📖' },
  { to: 'reviews',  label: 'রিভিউ', icon: '⭐' },
  { to: 'sections', label: 'সেকশন সেটিংস', icon: '⚙️' },
];

export default function AdminDashboard() {
  const nav = useNavigate();
  async function logout() {
    await supabase.auth.signOut();
    try { localStorage.removeItem('sw_admin_cache_v1'); } catch { /* ignore */ }
    nav('/admin/login', { replace: true });
  }

  return (
    <div className="admin-shell min-h-screen flex flex-col md:flex-row" style={{ background: '#0B1220' }}>
      <aside
        className="md:w-64 shrink-0 p-4 md:min-h-screen"
        style={{ background: '#111827', borderRight: '1px solid #1F2937' }}
      >
        <div
          className="gradient-text mb-6"
          style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 22, letterSpacing: '-0.01em' }}
        >
          SkillWave অ্যাডমিন
        </div>
        <nav className="flex md:flex-col gap-2 overflow-x-auto">
          {items.map((i) => (
            <NavLink
              key={i.to}
              to={i.to}
              className="px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors flex items-center gap-2"
              style={({ isActive }) =>
                isActive
                  ? { background: 'linear-gradient(45deg, rgba(107,110,202,0.18), rgba(65,185,248,0.18))', color: '#41B9F8', boxShadow: 'inset 3px 0 0 #41B9F8' }
                  : { color: '#9CA3AF' }
              }
            >
              <span>{i.icon}</span>
              <span>{i.label}</span>
            </NavLink>
          ))}
        </nav>
        <button
          onClick={logout}
          className="mt-6 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
          style={{ color: '#9CA3AF' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
        >
          <span>↪</span> লগআউট
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
