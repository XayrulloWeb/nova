import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function LatestNews() {
  const { i18n } = useTranslation();
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/public/news')
      .then(res => res.json())
      .then(data => {
        const arr = data.data || data;
        setNews(arr.slice(0, 3)); // Show only 3 on homepage
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="py-24 bg-background border-t border-outline/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="text-primary font-label-caps uppercase tracking-widest block mb-2">Mediamarkaz</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight">So'nggi yangiliklar</h2>
          </div>
          <Link to="/news" className="text-primary hover:text-primary-container font-semibold flex items-center gap-2 transition-colors mt-6 md:mt-0">
            Barcha yangiliklar <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.length === 0 && <p className="text-on-surface-variant">Yangiliklar topilmadi.</p>}
          {news.map((item) => {
            const isUz = i18n.language?.startsWith('uz');
            const title = isUz ? item.title_uz : item.title_ru;
            const desc = isUz ? item.content_uz : item.content_ru;
            const dateStr = new Date(item.created_at).toLocaleDateString();

            return (
              <Link to="/news" key={item.id} className="group flex flex-col glass-card rounded-[24px] overflow-hidden hover:shadow-[0_0_30px_rgba(0,219,233,0.1)] hover:-translate-y-2 transition-all duration-500">
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
                  <p className="text-on-surface-variant text-sm mb-6 flex-1 line-clamp-3">{desc}</p>
                <div className="mt-auto">
                  <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors flex items-center gap-1">
                    O'qish <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">east</span>
                  </span>
                </div>
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
