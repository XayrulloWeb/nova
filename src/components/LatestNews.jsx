import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import api from '../api/axios';
import NewsCard from './ui/NewsCard';

export default function LatestNews({ showAll = false }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('uz') ? 'uz' : 'ru';
  const [page, setPage] = useState(1);
  const limit = showAll ? 7 : 4; // 1 hero + 6 regular = 7, or 1 hero + 3 regular = 4

  const { data, isLoading, isError } = useQuery({
    queryKey: ['news', page, limit],
    queryFn: async () => {
      const response = await api.get(`/public/news?page=${page}&limit=${limit}`);
      return response.data;
    }
  });

  const news = data?.data || [];
  const totalPages = data?.totalPages || 1;

  // Render skeletons
  const renderSkeletons = () => (
    Array.from({ length: limit }).map((_, i) => (
      <div 
        key={i} 
        className={`flex flex-col glass-card rounded-[32px] overflow-hidden ${i === 0 && page === 1 ? 'md:col-span-3 min-h-[500px]' : 'min-h-[400px]'}`}
      >
        <div className="h-full w-full bg-surface-container-high animate-pulse absolute inset-0"></div>
      </div>
    ))
  );

  return (
    <section className="py-24 bg-background border-t border-outline/5 relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest block mb-4 text-sm">{lang?.startsWith('uz') ? 'Mediamarkaz' : 'Медиацентр'}</span>
            <h2 className="text-5xl md:text-6xl font-extrabold text-on-surface tracking-tight">{t('header.news') || (lang?.startsWith('uz') ? "Yangiliklar" : "Новости")}</h2>
          </div>
          
          {!showAll && (
            <div className="flex items-center gap-4 mt-8 md:mt-0">
              <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center relative">
                <div className="absolute inset-0 border border-primary/50 rounded-full animate-ping opacity-20"></div>
                <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(0,219,233,1)]"></div>
              </div>
              
              <Link to="/news" className="group px-6 py-3 border-2 border-on-surface/20 text-on-surface rounded-full font-bold flex items-center gap-3 transition-all duration-300 hover:border-primary hover:text-primary hover:bg-primary/5">
                {lang?.startsWith('uz') ? "Barcha yangiliklar" : "Все новости"} 
                <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr">
          {isLoading ? (
            renderSkeletons()
          ) : isError ? (
            <p className="text-error col-span-3 text-center py-12">
              {i18n.language?.startsWith('uz') ? 'Yangiliklarni yuklashda xatolik yuz berdi' : 'Ошибка загрузки новостей'}
            </p>
          ) : news.length === 0 ? (
            <p className="text-on-surface-variant col-span-3 py-12">{lang?.startsWith('uz') ? "Yangiliklar topilmadi." : "Новости не найдены."}</p>
          ) : (
            news.map((item, index) => {
              // First item on page 1 is the Hero
              const isHero = index === 0 && page === 1;
              
              // Custom Bento Grid classes for variety
              let bentoClass = "";
              if (!isHero) {
                // Example: index 1 and 2 take 1 col each, index 3 takes 2 cols on wide screens (if it exists)
                if (index === 3) bentoClass = "md:col-span-2";
                if (index === 6) bentoClass = "md:col-span-2";
              }

              return (
                <NewsCard 
                  key={item.id}
                  item={item}
                  index={index}
                  variant={isHero ? 'hero' : 'standard'}
                  className={bentoClass}
                />
              );
            })
          )}
        </div>

        {/* Elegant Pagination Controls */}
        {showAll && totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 flex justify-center"
          >
            <div className="flex items-center gap-2 bg-surface-container-high/50 p-2 rounded-full border border-outline/10 backdrop-blur-md">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-12 h-12 rounded-full flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-container transition-colors text-on-surface"
              >
                <span className="material-symbols-outlined">west</span>
              </button>
              
              <div className="flex items-center px-4 gap-2 font-medium">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all ${
                      page === i + 1 
                        ? 'bg-primary text-on-primary font-bold shadow-[0_0_15px_rgba(0,219,233,0.4)]' 
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-12 h-12 rounded-full flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-container transition-colors text-on-surface"
              >
                <span className="material-symbols-outlined">east</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
