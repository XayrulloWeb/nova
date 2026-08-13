import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

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
    const name = teacher[`name_${lang}`];
    const title = teacher[`title_${lang}`] || teacher[`subject_${lang}`];
    const desc = teacher[`desc_${lang}`];
    const tags = teacher[`tags_${lang}`] ? teacher[`tags_${lang}`].split(',').map(tag => tag.trim()) : [];
    const imageUrl = teacher.image_url ? `${teacher.image_url}` : null;

    if (layoutType === 1) {
      return (
        <div key={teacher.id} className="glass-card bento-item-1 p-10 flex flex-col md:flex-row items-end md:items-center justify-between relative overflow-hidden group shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 md:hidden"></div>
          <div className="z-20 md:w-1/2 relative">
            <div className="text-primary-container font-label-caps text-label-caps mb-4 uppercase tracking-widest">{title}</div>
            <h2 className="text-[32px] md:text-[48px] font-bold text-on-surface mb-4">{name}</h2>
            <p className="text-body-md text-on-surface-variant mb-8">{desc}</p>
            <div className="flex flex-wrap gap-2 mt-6 mb-6">
              {tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-label-caps uppercase border border-outline-variant/20">{tag}</span>
              ))}
            </div>
          </div>
          <div className="absolute md:relative md:w-1/2 h-full flex items-end justify-end pt-10">
            {imageUrl && <img className="w-full h-auto object-contain max-h-[400px] object-bottom blend-adaptive opacity-80 group-hover:opacity-100 transition-opacity duration-500" alt={name} src={imageUrl} />}
          </div>
        </div>
      );
    }

    if (layoutType === 2 || layoutType === 3) {
      return (
        <div key={teacher.id} className={`glass-card bento-item-${layoutType} p-8 flex flex-col justify-end relative overflow-hidden group min-h-[400px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]`}>
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent z-10"></div>
          {imageUrl && <img className="absolute inset-0 w-full h-full object-cover object-top blend-adaptive opacity-70 group-hover:opacity-90 transition-opacity duration-500 z-0" alt={name} src={imageUrl} />}
          <div className="z-20 relative mt-auto">
            <div className="text-primary-container font-label-caps text-xs mb-2 uppercase tracking-widest">{title}</div>
            <h3 className="text-[24px] font-bold text-on-surface mb-2">{name}</h3>
            <p className="text-body-md text-on-surface-variant text-sm">{desc}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag, i) => (
                <span key={i} className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-label-caps uppercase border border-outline-variant/20">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (layoutType === 4) {
      return (
        <div key={teacher.id} className="glass-card bento-item-4 p-8 flex flex-row items-center relative overflow-hidden group min-h-[250px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <div className="w-1/3 h-full relative">
            {imageUrl && <img className="absolute inset-0 w-full h-full object-cover object-center blend-adaptive opacity-70 group-hover:opacity-100 transition-opacity duration-500" alt={name} src={imageUrl} />}
          </div>
          <div className="w-2/3 pl-8 z-20">
            <div className="text-primary-container font-label-caps text-xs mb-2 uppercase tracking-widest">{title}</div>
            <h3 className="text-[24px] font-bold text-on-surface mb-2">{name}</h3>
            <p className="text-body-md text-on-surface-variant mb-4 text-sm">{desc}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, i) => (
                <span key={i} className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-label-caps uppercase border border-outline-variant/20">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (layoutType === 5) {
      return (
        <div key={teacher.id} className="glass-card bento-item-5 p-8 flex flex-row items-center relative overflow-hidden group min-h-[250px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <div className="w-2/3 pr-8 z-20 text-right">
            <div className="text-primary-container font-label-caps text-xs mb-2 uppercase tracking-widest">{title}</div>
            <h3 className="text-[24px] font-bold text-on-surface mb-2">{name}</h3>
            <p className="text-body-md text-on-surface-variant mb-4 text-sm">{desc}</p>
            <div className="flex flex-wrap gap-2 mb-4 justify-end">
              {tags.map((tag, i) => (
                <span key={i} className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-label-caps uppercase border border-outline-variant/20">{tag}</span>
              ))}
            </div>
          </div>
          <div className="w-1/3 h-full relative">
            {imageUrl && <img className="absolute inset-0 w-full h-full object-cover object-center blend-adaptive opacity-70 group-hover:opacity-100 transition-opacity duration-500" alt={name} src={imageUrl} />}
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
        <div className="bento-grid">
          {teachers.map((teacher, index) => renderCard(teacher, index))}
        </div>
      )}
    </section>
  );
}
