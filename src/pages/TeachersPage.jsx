import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { i18n, t } = useTranslation();
  const lang = i18n.language.startsWith('uz') ? 'uz' : 'ru';

  useEffect(() => {
    fetch('/api/public/teachers')
      .then(res => res.json())
      .then(data => {
        setTeachers(data.data || data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <SEO 
        title={`${t('teachers.title')} | NOVA`} 
        description={t('teachers.desc')} 
      />
      <PageHeader 
        title={t('teachers.title')} 
        subtitle={t('teachers.desc')} 
      />

      <section className="py-20 px-margin-mobile md:px-margin-desktop max-w-[1600px] mx-auto">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
          </div>
        ) : teachers.length === 0 ? (
          <p className="text-on-surface-variant text-center py-20">
            {t('teachers.empty')}
          </p>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {teachers.map((teacher) => {
              const name = teacher.name?.[lang] || '';
              const title = teacher.title?.[lang] || teacher.subject?.[lang] || '';
              const desc = teacher.desc?.[lang] || '';
              const tags = teacher.tags?.[lang] ? teacher.tags[lang].split(',').map(tag => tag.trim()) : [];
              const imageUrl = teacher.image_url ? `${teacher.image_url}` : null;

              return (
                <motion.div 
                  key={teacher.id} 
                  variants={itemVariants}
                  className="group relative flex flex-col bg-surface-container overflow-hidden rounded-[2rem] border border-outline-variant/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:border-primary/50 transition-colors duration-500 hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface-container-highest/50 z-10 pointer-events-none"></div>
                  
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-container-highest">
                    {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt={name} 
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-on-surface-variant opacity-20 bg-surface-container-high">
                        <svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Glow overlay */}
                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  <div className="relative z-20 flex-1 flex flex-col p-6 bg-surface-container">
                    <div className="text-primary font-label-caps text-[10px] uppercase tracking-widest mb-2">{title}</div>
                    <h3 className="text-xl md:text-2xl font-bold text-on-surface mb-3 line-clamp-2 leading-tight">{name}</h3>
                    
                    {desc && (
                      <p className="text-body-sm text-on-surface-variant mb-6 line-clamp-3">
                        {desc}
                      </p>
                    )}
                    
                    <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-outline-variant/20">
                      {tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-label-caps uppercase tracking-wider shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </section>
    </div>
  );
}
