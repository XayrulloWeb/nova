import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

import Header from './components/Header';
import OverlayMenu from './components/OverlayMenu';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import AdmissionsPage from './pages/AdmissionsPage';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ThemeProvider>
      <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
        <BrowserRouter>
          <div className="bg-surface-container-lowest text-on-surface antialiased min-h-screen flex flex-col font-body-md overflow-x-hidden">
            <Header onOpenMenu={() => setMenuOpen(true)} />
            <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
            
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admissions" element={<AdmissionsPage />} />
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
