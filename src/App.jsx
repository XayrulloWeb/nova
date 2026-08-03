import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ThemeProvider>
      <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
        <BrowserRouter>
          <div className="bg-surface-container-lowest text-on-surface antialiased min-h-screen flex flex-col font-body-md overflow-x-hidden">
            <CustomCursor />
            <Header onOpenMenu={() => setMenuOpen(true)} />
            <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
            
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/parents" element={<ParentsPage />} />
                <Route path="/students" element={<StudentsPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/apply" element={<ApplyPage />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </BrowserRouter>
      </ReactLenis>
    </ThemeProvider>
  );
}

export default App;
