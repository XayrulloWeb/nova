import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function Header({ onOpenMenu }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language.startsWith('uz') ? 'ru' : 'uz');
  };

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
          
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <img src="/logo.webp" alt="NOVA Logo" className="h-10 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <Link to="/about" className={`text-sm font-semibold tracking-wide hover:text-primary transition-colors ${location.pathname === '/about' ? 'text-primary' : 'text-on-surface-variant'}`}>
              {t('header.about')}
            </Link>
            <Link to="/parents" className={`text-sm font-semibold tracking-wide hover:text-primary transition-colors ${location.pathname === '/parents' ? 'text-primary' : 'text-on-surface-variant'}`}>
              {t('header.parents')}
            </Link>
            <Link to="/students" className={`text-sm font-semibold tracking-wide hover:text-primary transition-colors ${location.pathname === '/students' ? 'text-primary' : 'text-on-surface-variant'}`}>
              {t('header.students')}
            </Link>
            <Link to="/news" className={`text-sm font-semibold tracking-wide hover:text-primary transition-colors ${location.pathname === '/news' ? 'text-primary' : 'text-on-surface-variant'}`}>
              {t('header.news')}
            </Link>
            <Link to="/contacts" className={`text-sm font-semibold tracking-wide hover:text-primary transition-colors ${location.pathname === '/contacts' ? 'text-primary' : 'text-on-surface-variant'}`}>
              {t('header.contacts')}
            </Link>
          </nav>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button onClick={toggleLanguage} className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center p-2 rounded-full bg-white/5 hover:bg-white/10 font-bold uppercase text-xs w-9 h-9">
              {i18n.language?.startsWith('uz') ? 'UZ' : 'RU'}
            </button>
            <button onClick={toggleTheme} className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center p-2 rounded-full bg-white/5 hover:bg-white/10 w-9 h-9">
              <span className="material-symbols-outlined text-sm">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
            </button>
            
            <Link to="/apply" className="hidden lg:flex items-center justify-center bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold text-sm tracking-wide hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 shadow-[0_0_15px_rgba(0,219,233,0.2)] hover:shadow-[0_0_25px_rgba(0,219,233,0.4)] hover:-translate-y-0.5">
              {t('header.applyBtn')}
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
