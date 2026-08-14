import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { ThemeProvider } from './context/ThemeContext';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SocketProvider } from './providers/SocketProvider';
import { Toaster } from 'react-hot-toast';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

import Header from './components/Header';
import OverlayMenu from './components/OverlayMenu';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';

// Lazy load Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ParentsPage = lazy(() => import('./pages/ParentsPage'));
const StudentsPage = lazy(() => import('./pages/StudentsPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const NewsArticle = lazy(() => import('./pages/NewsArticle'));
const ContactsPage = lazy(() => import('./pages/ContactsPage'));
const ApplyPage = lazy(() => import('./pages/ApplyPage'));
const TeachersPage = lazy(() => import('./pages/TeachersPage'));
const AdminProfilePage = lazy(() => import('./pages/AdminProfilePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Lazy load Admin Pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const ApplicationsManager = lazy(() => import('./pages/admin/ApplicationsManager'));
const NewsManager = lazy(() => import('./pages/admin/NewsManager'));
const TeacherManager = lazy(() => import('./pages/admin/TeacherManager'));
const StatsManager = lazy(() => import('./pages/admin/StatsManager'));
const AdministrationManager = lazy(() => import('./pages/admin/AdministrationManager'));
const GalleryManager = lazy(() => import('./pages/admin/GalleryManager'));
const StudentsManager = lazy(() => import('./pages/admin/StudentsManager'));

function AppContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin' || location.pathname.startsWith('/admin/');

  return (
    <>
      <div className="min-h-screen bg-background text-on-surface font-sans selection:bg-primary/30">
        <Helmet>
          <title>NOVA | International AI School</title>
          <meta name="description" content="Умная школа будущего в сердце Хорезма. Международная школа с углубленным изучением IT, робототехники и искусственного интеллекта." />
          <meta property="og:title" content="NOVA | International AI School" />
          <meta property="og:description" content="Умная школа будущего в сердце Хорезма. Международная школа с углубленным изучением IT, робототехники и искусственного интеллекта." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://nova-maktab.uz" />
          <meta property="og:image" content="https://nova-maktab.uz/og-image.webp" />
        </Helmet>
        <ScrollToTop />
        {!isAdminRoute && <Preloader />}
        <CustomCursor />
        {!isAdminRoute && <Header onOpenMenu={() => setMenuOpen(true)} />}
        {!isAdminRoute && <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />}
        
        <main className="flex-grow relative">
          <Suspense fallback={
            <div className="absolute inset-0 flex items-center justify-center min-h-[50vh]">
              <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/parents" element={<ParentsPage />} />
              <Route path="/students" element={<StudentsPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:id" element={<NewsArticle />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/apply" element={<ApplyPage />} />
              <Route path="/teachers" element={<TeachersPage />} />
              <Route path="/administration/:id" element={<AdminProfilePage />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/*" element={<AdminLayout />}>
                <Route path="dashboard" element={<ApplicationsManager />} />
                <Route path="students" element={<StudentsManager />} />
                <Route path="news" element={<NewsManager />} />
                <Route path="teachers" element={<TeacherManager />} />
                <Route path="administration" element={<AdministrationManager />} />
                <Route path="gallery" element={<GalleryManager />} />
                <Route path="stats" element={<StatsManager />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>

        {!isAdminRoute && <Footer />}
      </div>
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <SocketProvider>
          <ThemeProvider>
            <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
              <BrowserRouter>
                <Toaster position="bottom-right" reverseOrder={false} />
                <AppContent />
              </BrowserRouter>
            </ReactLenis>
          </ThemeProvider>
        </SocketProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
