import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Header({ onOpenMenu }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none p-4 transition-all duration-300">
      <header className={`transition-all duration-500 ease-out pointer-events-auto w-full max-w-[1920px] ${isScrolled ? 'max-w-5xl bg-surface-container-low/80 backdrop-blur-xl border border-outline/10 shadow-lg rounded-full py-3 px-6 mt-2' : 'bg-transparent py-4 px-margin-mobile md:px-margin-desktop'}`}>
        <div className="flex items-center justify-between w-full">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-on-primary font-bold shadow-[0_0_15px_rgba(0,219,233,0.4)] group-hover:scale-110 transition-transform">
              N
            </div>
            <span className={`font-headline-md tracking-tight font-extrabold text-on-background transition-opacity ${isScrolled ? 'hidden sm:block' : 'block'}`}>
              NOVA
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <Link to="/about" className={`text-sm font-semibold tracking-wide hover:text-primary transition-colors ${location.pathname === '/about' ? 'text-primary' : 'text-on-surface-variant'}`}>
              Maktab haqida
            </Link>
            <Link to="/parents" className={`text-sm font-semibold tracking-wide hover:text-primary transition-colors ${location.pathname === '/parents' ? 'text-primary' : 'text-on-surface-variant'}`}>
              Ota-onalarga
            </Link>
            <Link to="/students" className={`text-sm font-semibold tracking-wide hover:text-primary transition-colors ${location.pathname === '/students' ? 'text-primary' : 'text-on-surface-variant'}`}>
              O'quvchilarga
            </Link>
            <Link to="/news" className={`text-sm font-semibold tracking-wide hover:text-primary transition-colors ${location.pathname === '/news' ? 'text-primary' : 'text-on-surface-variant'}`}>
              Yangiliklar
            </Link>
            <Link to="/contacts" className={`text-sm font-semibold tracking-wide hover:text-primary transition-colors ${location.pathname === '/contacts' ? 'text-primary' : 'text-on-surface-variant'}`}>
              Aloqa
            </Link>
          </nav>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center p-2 rounded-full bg-white/5 hover:bg-white/10">
              <span className="material-symbols-outlined text-sm">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
            </button>
            
            <Link to="/apply" className="hidden lg:flex items-center justify-center bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold text-sm tracking-wide hover:bg-primary-container transition-all duration-300 shadow-[0_0_15px_rgba(0,219,233,0.2)] hover:shadow-[0_0_25px_rgba(0,219,233,0.4)] hover:-translate-y-0.5">
              ARIZA TOPSHIRISH
            </Link>
            
            <button 
              onClick={onOpenMenu}
              className="lg:hidden text-on-surface hover:text-primary transition-colors p-2 bg-white/5 rounded-full"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>

        </div>
      </header>
    </div>
  );
}
