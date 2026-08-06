import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const stripHtml = (html) => {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

export default function LatestNews({ showAll = false }) {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/public/news')
      .then(res => res.json())
      .then(data => {
        const arr = data.data || data;
        if (Array.isArray(arr)) {
          setNews(showAll ? arr : arr.slice(0, 3));
        } else {
          setNews([]);
        }
      })
      .catch(err => {
        console.error(err);
        setNews([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [showAll]);

  return (
    <section className="py-24 bg-background border-t border-outline/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="text-primary font-label-caps uppercase tracking-widest block mb-2">{i18n.language?.startsWith('uz') ? 'Mediamarkaz' : 'Медиацентр'}</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight">{t('header.news') || (i18n.language?.startsWith('uz') ? "Yangiliklar" : "Новости")}</h2>
          </div>
          
          {!showAll && (
            <div className="flex items-center gap-4 mt-6 md:mt-0">
              {/* Decorative dot from mockup */}
              <div className="w-12 h-12 rounded-full border border-primary/50 flex items-center justify-center">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
              </div>
              
              <Link to="/news" className="group px-6 py-3 border-2 border-on-surface text-on-surface rounded-xl font-bold flex items-center gap-3 transition-all duration-300 hover:bg-on-surface hover:text-background">
                {i18n.language?.startsWith('uz') ? "Barcha yangiliklar" : "Все новости"} 
                <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: showAll ? 6 : 3 }).map((_, i) => (
              <div key={i} className="flex flex-col glass-card rounded-[24px] overflow-hidden">
                <div className="h-64 bg-surface-container-high animate-pulse"></div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-6 rounded-full bg-primary/20 animate-pulse"></div>
                    <div className="w-24 h-4 rounded bg-surface-container-highest animate-pulse"></div>
                  </div>
                  <div className="w-full h-6 rounded bg-surface-container-highest mb-3 animate-pulse"></div>
                  <div className="w-3/4 h-6 rounded bg-surface-container-highest mb-6 animate-pulse"></div>
                  <div className="w-full h-4 rounded bg-surface-container-high mb-2 animate-pulse"></div>
                  <div className="w-full h-4 rounded bg-surface-container-high mb-2 animate-pulse"></div>
                  <div className="w-2/3 h-4 rounded bg-surface-container-high mb-6 animate-pulse"></div>
                  <div className="mt-auto w-20 h-5 rounded bg-surface-container-highest animate-pulse"></div>
                </div>
              </div>
            ))
          ) : news.length === 0 ? (
            <p className="text-on-surface-variant">{i18n.language?.startsWith('uz') ? "Yangiliklar topilmadi." : "Новости не найдены."}</p>
          ) : (
            news.map((item) => {
            const isUz = i18n.language?.startsWith('uz');
            const title = isUz ? item.title_uz : item.title_ru;
            const desc = isUz ? item.content_uz : item.content_ru;
            const dateStr = new Date(item.created_at).toLocaleDateString();

            return (
              <Link to={`/news/${item.id}`} key={item.id} className="group flex flex-col glass-card rounded-[24px] overflow-hidden hover:shadow-[0_0_30px_rgba(0,219,233,0.1)] hover:-translate-y-2 transition-all duration-500">
                <div className="relative h-64 overflow-hidden bg-surface-container-high">
                  {item.image_url && <img src={`http://localhost:5000${item.image_url}`} alt={title} className="absolute inset-0 w-full h-full object-cover z-0" />}
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {/* Fallback image background in case src fails */}
                  <div className="absolute inset-0 bg-gradient-to-br from-surface-variant to-background z-[-1]"></div>
                </div>
                <div className="p-8 flex flex-col flex-1 relative z-20">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">NOVA</span>
                    <span className="text-on-surface-variant text-sm">{dateStr}</span>
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">{title}</h3>
                  <p className="text-on-surface-variant text-sm mb-6 flex-1 line-clamp-3">{stripHtml(desc)}</p>
                <div className="mt-auto">
                  <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors flex items-center gap-1">
                    {i18n.language?.startsWith('uz') ? "O'qish" : "Читать"} <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">east</span>
                  </span>
                </div>
              </div>
            </Link>
            );
            })
          )}
        </div>
      </div>
    </section>
  );
}
