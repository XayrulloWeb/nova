import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';

export default function NewsArticle() {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/public/news/${id}`)
      .then(res => res.json())
      .then(data => {
        setNewsItem(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
      </div>
    );
  }

  if (!newsItem || newsItem.error) {
    return (
      <div className="min-h-screen bg-surface-container-lowest flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-bold text-on-surface mb-4">
          {i18n.language?.startsWith('uz') ? 'Yangilik topilmadi' : 'Новость не найдена'}
        </h2>
        <Link to="/news" className="text-primary hover:underline">
          {i18n.language?.startsWith('uz') ? 'Barcha yangiliklarga qaytish' : 'Вернуться ко всем новостям'}
        </Link>
      </div>
    );
  }

  const isUz = i18n.language?.startsWith('uz');
  const title = isUz ? newsItem.title_uz : newsItem.title_ru;
  const content = isUz ? newsItem.content_uz : newsItem.content_ru;
  const dateStr = new Date(newsItem.created_at).toLocaleDateString();

  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <PageHeader 
        title={i18n.language?.startsWith('uz') ? 'Yangiliklar' : 'Новости'} 
        subtitle={title} 
      />
      
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          
          <div className="mb-12">
            <Link to="/news" className="inline-flex items-center gap-2 text-primary hover:text-primary-container transition-colors mb-8 font-bold uppercase tracking-wider text-sm">
              <span className="material-symbols-outlined text-xl">arrow_back</span>
              {i18n.language?.startsWith('uz') ? 'Barcha yangiliklarga qaytish' : 'Все новости'}
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider">NOVA</span>
              <span className="text-on-surface-variant font-medium">{dateStr}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface leading-tight mb-8">
              {title}
            </h1>
          </div>

          {newsItem.image_url && (
            <div className="w-full h-[400px] md:h-[600px] rounded-[32px] overflow-hidden mb-16 relative glass-card shadow-2xl">
              <img 
                src={`http://localhost:5000${newsItem.image_url}`} 
                alt={title} 
                className="w-full h-full object-cover" 
              />
            </div>
          )}

          <article 
            className="prose prose-lg prose-invert max-w-none text-on-surface-variant
                       prose-headings:text-on-surface prose-a:text-primary hover:prose-a:text-primary-container
                       prose-img:rounded-2xl prose-img:shadow-xl"
            dangerouslySetInnerHTML={{ __html: content }}
          />

        </div>
      </section>
    </div>
  );
}
