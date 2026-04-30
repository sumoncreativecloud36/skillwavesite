import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CoursesPage from './pages/Courses.jsx';
import EbooksPage from './pages/Ebooks.jsx';
import AboutPage from './pages/About.jsx';
import BlogPage from './pages/Blog.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import SignUp from './pages/SignUp.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import RequireAuth from './admin/RequireAuth.jsx';
import { SiteProvider } from './context/SiteContext.jsx';

export default function App() {
  return (
    <SiteProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/ebooks" element={<EbooksPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <RequireAuth>
              <AdminDashboard />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteProvider>
  );
}
