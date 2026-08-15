import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function TeachersGrid() {
  const [teachers, setTeachers] = useState([]);
  const { i18n, t } = useTranslation();
  const lang = i18n.language.startsWith('uz') ? 'uz' : 'ru';

  useEffect(() => {
    fetch('/api/public/teachers')
      .then(res => res.json())
      .then(data => setTeachers(data.data || data))
      .catch(err => console.error(err));
  }, []);

  const renderCard = (teacher) => {
    const name = teacher.name?.[lang] || '';
    const title = teacher.title?.[lang] || teacher.subject?.[lang] || '';
    const desc = teacher.desc?.[lang] || '';
    const tags = teacher.tags?.[lang] ? teacher.tags[lang].split(',').map(tag => tag.trim()).filter(Boolean) : [];
    const imageUrl = teacher.image_url ? `${teacher.image_url}` : null;

    return (
      <div key={teacher.id} className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden group shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 bg-surface-container border border-outline-variant/30 hover:border-primary/50">
        
        {/* Background Image or Fallback */}
        {imageUrl ? (
          <img className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110" alt={name} src={imageUrl} />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-surface-container to-primary/5 flex items-center justify-center transition-transform duration-1000 group-hover:scale-110">
             <span className="material-symbols-outlined text-[80px] text-primary/30">school</span>
          </div>
        )}

        {/* Dark Overlays */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-500 z-10 pointer-events-none"></div>
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/95 via-black/60 to-transparent z-10 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:h-full group-hover:from-black/95 group-hover:via-black/80 pointer-events-none"></div>

        {/* Content Box */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-8 flex flex-col justify-end pointer-events-none">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
            
            {/* Title & Name */}
            <div className="text-primary font-label-caps text-[11px] mb-3 uppercase tracking-[0.2em] font-extrabold drop-shadow-md">{title}</div>
            <h3 className="text-[28px] sm:text-[32px] font-extrabold text-white leading-tight drop-shadow-lg mb-1">{name}</h3>
            
            {/* Expandable Description & Tags */}
            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] pointer-events-auto">
              <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <div className="pt-5">
                  <p className="text-white/80 text-sm mb-6 line-clamp-4 leading-relaxed font-medium drop-shadow-sm">{desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 4).map((tag, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-label-caps uppercase font-bold tracking-widest shadow-lg">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="flex-grow pt-[160px] pb-[160px] px-margin-mobile md:px-margin-desktop bg-surface-container-lowest" id="teachers">
      <header className="mb-20 max-w-4xl mx-auto md:mx-0">
        <h1 className="text-[40px] md:text-headline-lg font-extrabold text-on-surface mb-4 uppercase tracking-tighter">
          {t('teachers.title')}
        </h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl">
          {t('teachers.desc')}
        </p>
      </header>
      
      {teachers.length === 0 ? (
        <p className="text-on-surface-variant text-center py-20">
          {t('teachers.empty')}
        </p>
      ) : (
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 w-full max-w-[1400px] mx-auto">
            {teachers.slice(0, 6).map((teacher) => renderCard(teacher))}
          </div>
          
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
            <Link 
              to="/teachers" 
              className="relative overflow-hidden group inline-flex items-center justify-center px-8 py-4 bg-surface-container-highest border border-outline-variant/30 rounded-full hover:border-primary/50 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(var(--brand-green-rgb),0.2)]"
            >
              <div className="absolute inset-0 w-0 bg-primary transition-all duration-[400ms] ease-out group-hover:w-full rounded-full"></div>
              <span className="relative z-10 text-on-surface font-label-caps uppercase tracking-widest text-sm group-hover:text-on-primary transition-colors duration-300 flex items-center gap-3">
                {t('teachers.seeAll')}
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
