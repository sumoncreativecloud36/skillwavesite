import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CoursesPage from './pages/Courses.jsx';
import EbooksPage from './pages/Ebooks.jsx';
import BundlesPage from './pages/Bundles.jsx';
import WorkshopsPage from './pages/Workshops.jsx';
import AboutPage from './pages/About.jsx';
import BlogPage from './pages/Blog.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';
import AccountLayout from './account/AccountLayout.jsx';
import AccountDashboard from './account/AccountDashboard.jsx';
import AccountList from './account/AccountList.jsx';
import AccountEdit from './account/AccountEdit.jsx';
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
        <Route path="/bundles" element={<BundlesPage />} />
        <Route path="/workshops" element={<WorkshopsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route path="/account" element={<AccountLayout />}>
          <Route index element={<AccountDashboard />} />
          <Route path="courses"      element={<AccountList icon="📚" title="My Courses"    emptyText="এখনো কোনো কোর্সে ভর্তি হননি" browseTo="/courses" browseLabel="কোর্স ব্রাউজ করুন" />} />
          <Route path="workshops"    element={<AccountList icon="👥" title="My Workshops"  emptyText="কোনো ওয়ার্কশপে নিবন্ধন নেই" />} />
          <Route path="ebooks"       element={<AccountList icon="📖" title="My Ebooks"     emptyText="এখনো কোনো ই-বুক কেনেননি" browseTo="/ebooks" browseLabel="ই-বুক ব্রাউজ করুন" />} />
          <Route path="bundles"      element={<AccountList icon="📦" title="My Bundles"    emptyText="কোনো বান্ডেল কেনা নেই" />} />
          <Route path="certificates" element={<AccountList icon="🏅" title="Certificates" emptyText="এখনো কোনো সার্টিফিকেট অর্জন হয়নি" />} />
          <Route path="orders"       element={<AccountList icon="🧾" title="My Orders"     emptyText="কোনো অর্ডার নেই" />} />
          <Route path="edit"         element={<AccountEdit />} />
        </Route>

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
