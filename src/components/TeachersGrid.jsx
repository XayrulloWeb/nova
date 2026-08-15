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

  const renderCard = (teacher, index) => {
    const layoutType = (index % 5) + 1;
    const name = teacher.name?.[lang] || '';
    const title = teacher.title?.[lang] || teacher.subject?.[lang] || '';
    const desc = teacher.desc?.[lang] || '';
    const tags = teacher.tags?.[lang] ? teacher.tags[lang].split(',').map(tag => tag.trim()).filter(Boolean) : [];
    const imageUrl = teacher.image_url ? `${teacher.image_url}` : null;

    // Premium Image Component
    const TeacherImage = ({ className }) => (
      <div className={`relative overflow-hidden rounded-[20px] bg-surface-container-highest shadow-inner ${className}`}>
        {imageUrl ? (
          <img className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" alt={name} src={imageUrl} />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-surface-container-highest to-primary/5 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-500">
             <span className="material-symbols-outlined text-[48px] text-on-surface-variant/20">school</span>
          </div>
        )}
      </div>
    );

    if (layoutType === 1) {
      return (
        <div key={teacher.id} className="glass-card bento-item-1 p-8 md:p-10 flex flex-col md:flex-row items-stretch justify-between relative overflow-hidden group shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-outline-variant/30 hover:border-primary/30 transition-colors duration-500 bg-surface">
          <div className="z-20 md:w-[55%] flex flex-col justify-center pr-0 md:pr-8 mb-8 md:mb-0">
            <div className="text-primary font-label-caps text-xs md:text-sm mb-4 uppercase tracking-widest font-semibold">{title}</div>
            <h2 className="text-[32px] md:text-[42px] font-extrabold text-on-surface mb-4 leading-tight tracking-tight">{name}</h2>
            <p className="text-body-md text-on-surface-variant mb-8 line-clamp-4 leading-relaxed">{desc}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {tags.map((tag, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface text-[11px] font-label-caps uppercase font-semibold tracking-wider shadow-sm border border-outline-variant/50">{tag}</span>
              ))}
            </div>
          </div>
          <div className="relative md:w-[45%] h-[300px] md:h-auto flex-shrink-0">
            <TeacherImage className="w-full h-full" />
          </div>
        </div>
      );
    }

    if (layoutType === 2 || layoutType === 3) {
      return (
        <div key={teacher.id} className={`glass-card bento-item-${layoutType} p-6 flex flex-col relative overflow-hidden group min-h-[450px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-outline-variant/30 hover:border-primary/30 transition-colors duration-500 bg-surface`}>
          <TeacherImage className="w-full h-[220px] mb-6 flex-shrink-0" />
          <div className="z-20 relative flex flex-col flex-grow">
            <div className="text-primary font-label-caps text-[10px] mb-2 uppercase tracking-widest font-semibold">{title}</div>
            <h3 className="text-[22px] font-bold text-on-surface mb-3 leading-tight tracking-tight">{name}</h3>
            <p className="text-body-sm text-on-surface-variant mb-6 line-clamp-3 leading-relaxed">{desc}</p>
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {tags.slice(0, 3).map((tag, i) => (
                <span key={i} className="px-2 py-1 rounded-md bg-surface-container text-on-surface text-[9px] font-label-caps uppercase font-semibold tracking-wider shadow-sm border border-outline-variant/50">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (layoutType === 4 || layoutType === 5) {
      const isReverse = layoutType === 5;
      return (
        <div key={teacher.id} className={`glass-card bento-item-${layoutType} p-6 flex flex-col sm:flex-row items-stretch relative overflow-hidden group min-h-[260px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-outline-variant/30 hover:border-primary/30 transition-colors duration-500 bg-surface gap-6 ${isReverse ? 'sm:flex-row-reverse' : ''}`}>
          <TeacherImage className="w-full sm:w-[40%] h-[200px] sm:h-auto flex-shrink-0" />
          <div className={`z-20 flex flex-col justify-center w-full sm:w-[60%] ${isReverse ? 'sm:text-right' : 'sm:text-left'}`}>
            <div className="text-primary font-label-caps text-[10px] mb-2 uppercase tracking-widest font-semibold">{title}</div>
            <h3 className="text-[22px] font-bold text-on-surface mb-3 leading-tight tracking-tight">{name}</h3>
            <p className="text-body-sm text-on-surface-variant mb-6 line-clamp-3 leading-relaxed">{desc}</p>
            <div className={`flex flex-wrap gap-1.5 mt-auto ${isReverse ? 'sm:justify-end' : 'sm:justify-start'}`}>
              {tags.slice(0, 4).map((tag, i) => (
                <span key={i} className="px-2 py-1 rounded-md bg-surface-container text-on-surface text-[9px] font-label-caps uppercase font-semibold tracking-wider shadow-sm border border-outline-variant/50">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      );
    }
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
          <div className="bento-grid w-full">
            {teachers.slice(0, 5).map((teacher, index) => renderCard(teacher, index))}
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
