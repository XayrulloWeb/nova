import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-surface-container-lowest flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <SEO title="404 - Sahifa topilmadi | NOVA" />
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-3xl max-h-3xl bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 glass-panel p-10 md:p-16 rounded-[40px] max-w-2xl w-full border border-outline/10 shadow-xl">
        <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/40 mb-6 drop-shadow-sm">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-4">
          Kechirasiz, sahifa topilmadi
        </h2>
        <p className="text-on-surface-variant text-lg mb-10 max-w-md mx-auto">
          Siz qidirayotgan sahifa o'chirilgan, nomi o'zgartirilgan yoki vaqtincha mavjud emas.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
        >
          <span className="material-symbols-outlined">home</span>
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  );
}
