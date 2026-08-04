import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

import Header from './components/Header';
import OverlayMenu from './components/OverlayMenu';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ParentsPage from './pages/ParentsPage';
import StudentsPage from './pages/StudentsPage';
import NewsPage from './pages/NewsPage';
import ContactsPage from './pages/ContactsPage';
import ApplyPage from './pages/ApplyPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import ApplicationsManager from './pages/admin/ApplicationsManager';
import NewsManager from './pages/admin/NewsManager';
import TeacherManager from './pages/admin/TeacherManager';
import StatsManager from './pages/admin/StatsManager';
import AdministrationManager from './pages/admin/AdministrationManager';

function AppContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="bg-surface-container-lowest text-on-surface antialiased min-h-screen flex flex-col font-body-md overflow-x-hidden">
      <CustomCursor />
      {!isAdminRoute && <Header onOpenMenu={() => setMenuOpen(true)} />}
      {!isAdminRoute && <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/parents" element={<ParentsPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/apply" element={<ApplyPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="dashboard" element={<ApplicationsManager />} />
            <Route path="news" element={<NewsManager />} />
            <Route path="teachers" element={<TeacherManager />} />
            <Route path="administration" element={<AdministrationManager />} />
            <Route path="stats" element={<StatsManager />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ReactLenis>
    </ThemeProvider>
  );
}

export default App;
