import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Header({ onOpenMenu }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-background/80 backdrop-blur-lg border-b border-outline/10' : 'py-6'} text-on-background pointer-events-none`}>
      <div className="max-w-[1920px] mx-auto px-margin-mobile md:px-margin-desktop flex items-center justify-between pointer-events-auto">
        
        {/* Logo */}
        <Link to="/" className="font-headline-md tracking-tighter hover:opacity-70 transition-opacity">
          NOVA
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={`text-label-caps font-label-caps tracking-widest hover:opacity-70 transition-opacity ${location.pathname === '/' ? 'opacity-100' : 'opacity-70'}`}>
            O'QUV DASTURI
          </Link>
          <Link to="/admissions" className={`text-label-caps font-label-caps tracking-widest hover:opacity-70 transition-opacity ${location.pathname === '/admissions' ? 'opacity-100' : 'opacity-70'}`}>
            QABUL
          </Link>
          <Link to="/labs" className="text-label-caps font-label-caps tracking-widest hover:opacity-70 transition-opacity opacity-70">
            LABORATORIYALAR
          </Link>
        </nav>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="hover:opacity-70 transition-opacity flex items-center justify-center p-2 rounded-full">
            <span className="material-symbols-outlined">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
          </button>
          
          <Link to="/admissions" className="hidden md:flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-label-caps text-label-caps tracking-widest hover:bg-gray-200 transition-all duration-300 magnetic-btn">
            ARIZA TOPSHIRISH
          </Link>
          <button 
            onClick={onOpenMenu}
            className="md:hidden hover:opacity-70 transition-opacity"
          >
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>

      </div>
    </header>
  );
}
