import React from 'react';
import { Link } from 'react-router-dom';

export default function OverlayMenu({ isOpen, onClose }) {
  return (
    <div 
      className={`fixed inset-0 z-50 backdrop-blur-xl bg-black/80 flex flex-col px-margin-mobile md:px-margin-desktop py-24 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="absolute top-8 right-margin-mobile md:right-margin-desktop">
        <button 
          className="text-primary hover:opacity-70 transition-opacity duration-500 cursor-pointer flex items-center justify-center p-2 rounded-full glass-panel" 
          onClick={onClose}
          onMouseOut={(e) => e.currentTarget.style.transform='scale(1)'} 
          onMouseOver={(e) => e.currentTarget.style.transform='scale(1.05)'} 
          style={{ transformOrigin: 'center' }}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>close</span>
        </button>
      </div>
      <nav className="flex-1 flex flex-col justify-center items-center space-y-8">
        <Link to="/" onClick={onClose} className="font-headline-lg text-4xl md:text-5xl uppercase tracking-wider text-on-surface hover:text-primary transition-colors duration-300">Bosh sahifa</Link>
        <Link to="/about" onClick={onClose} className="font-headline-lg text-4xl md:text-5xl uppercase tracking-wider text-on-surface hover:text-primary transition-colors duration-300">Maktab haqida</Link>
        <Link to="/parents" onClick={onClose} className="font-headline-lg text-4xl md:text-5xl uppercase tracking-wider text-on-surface hover:text-primary transition-colors duration-300">Ota-onalarga</Link>
        <Link to="/students" onClick={onClose} className="font-headline-lg text-4xl md:text-5xl uppercase tracking-wider text-on-surface hover:text-primary transition-colors duration-300">O'quvchilarga</Link>
        <Link to="/news" onClick={onClose} className="font-headline-lg text-4xl md:text-5xl uppercase tracking-wider text-on-surface hover:text-primary transition-colors duration-300">Yangiliklar</Link>
        <Link to="/contacts" onClick={onClose} className="font-headline-lg text-4xl md:text-5xl uppercase tracking-wider text-on-surface hover:text-primary transition-colors duration-300">Aloqa</Link>
        <Link to="/apply" onClick={onClose} className="font-headline-lg text-4xl md:text-5xl uppercase tracking-wider text-primary hover:text-on-surface transition-colors duration-300 mt-4">Ariza topshirish</Link>
      </nav>
      <div className="flex justify-center space-x-12 mt-auto pb-8 font-label-caps tracking-widest uppercase">
        <a className="text-on-surface-variant hover:text-primary transition-colors duration-300" href="#">Telegram</a>
        <a className="text-on-surface-variant hover:text-primary transition-colors duration-300" href="#">Instagram</a>
        <a className="text-on-surface-variant hover:text-primary transition-colors duration-300" href="#">YouTube</a>
      </div>
    </div>
  );
}
