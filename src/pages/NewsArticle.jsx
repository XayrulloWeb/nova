import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { motion, useScroll, useSpring } from 'framer-motion';
import api from '../api/axios';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader'; // fallback if no image

export default function NewsArticle() {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('uz') ? 'uz' : 'ru';

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const { data: newsItem, isLoading, isError } = useQuery({
    queryKey: ['news', id],
    queryFn: async () => {
      const response = await api.get(`/public/news/${id}`);
      return response.data;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="w-full h-[60vh] bg-surface-container-high animate-pulse"></div>
        <div className="max-w-3xl mx-auto w-full px-6 py-12">
          <div className="h-12 bg-surface-container w-3/4 rounded-xl mb-6 animate-pulse"></div>
          <div className="h-6 bg-surface-container w-1/4 rounded-xl mb-12 animate-pulse"></div>
          <div className="space-y-4">
            <div className="h-4 bg-surface-container rounded animate-pulse w-full"></div>
            <div className="h-4 bg-surface-container rounded animate-pulse w-full"></div>
            <div className="h-4 bg-surface-container rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-surface-container rounded animate-pulse w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !newsItem || newsItem.error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-bold text-on-surface mb-6">
          {lang === 'uz' ? 'Yangilik topilmadi' : 'Новость не найдена'}
        </h2>
        <Link to="/news" className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold hover:shadow-[0_0_20px_rgba(0,219,233,0.3)] transition-all">
          {lang === 'uz' ? 'Barcha yangiliklarga qaytish' : 'Вернуться ко всем новостям'}
        </Link>
      </div>
    );
  }

  const title = newsItem.title?.[lang] || '';
  const content = newsItem.content?.[lang] || '';
  const dateStr = new Date(newsItem.created_at).toLocaleDateString();

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/30 selection:text-primary">
      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100] shadow-[0_0_10px_rgba(0,219,233,0.8)]" 
        style={{ scaleX }} 
      />

      <SEO 
        title={`${title} | NOVA`} 
        description={content.replace(/<[^>]+>/g, '').substring(0, 150) + '...'}
        image={newsItem.image_url ? `https://nova-maktab.uz${newsItem.image_url}` : "https://nova-maktab.uz/og-image.webp"}
      />

      {/* Floating Back Button */}
      <div className="fixed top-32 left-8 lg:left-12 z-50 hidden md:block">
        <Link 
          to="/news" 
          className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface-container-high transition-all border border-outline/10 shadow-lg group"
          title={lang === 'uz' ? 'Orqaga' : 'Назад'}
        >
          <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
        </Link>
      </div>

      {newsItem.image_url ? (
        <div className="relative w-full h-[60vh] md:h-[75vh] flex items-end justify-center overflow-hidden">
          {/* Parallax Background */}
          <motion.div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${newsItem.image_url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          {/* Gradient overlay so text is readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10 opacity-90"></div>
          
          {/* Title Container intersecting the image */}
          <div className="relative z-20 w-full max-w-4xl mx-auto px-6 lg:px-8 pb-16 translate-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card rounded-[32px] p-8 md:p-12 border border-outline/10 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-bold uppercase tracking-wider border border-primary/20">NOVA</span>
                <span className="text-on-surface-variant font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">calendar_month</span> {dateStr}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-on-surface leading-tight">
                {title}
              </h1>
            </motion.div>
          </div>
        </div>
      ) : (
        <PageHeader 
          title={lang === 'uz' ? 'Yangiliklar' : 'Новости'} 
          subtitle={title} 
        />
      )}
      
      <section className="py-24 bg-background relative z-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          
          {/* Mobile Back Button */}
          <div className="mb-12 md:hidden">
            <Link to="/news" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-bold text-sm bg-surface-container py-2 px-4 rounded-full">
              <span className="material-symbols-outlined text-xl">arrow_back</span>
              {lang === 'uz' ? 'Barcha yangiliklar' : 'Все новости'}
            </Link>
          </div>

          <motion.article 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="prose prose-lg md:prose-xl prose-invert max-w-none text-on-surface-variant
                       prose-headings:text-on-surface prose-headings:font-bold
                       prose-a:text-primary hover:prose-a:text-primary-container
                       prose-img:rounded-3xl prose-img:shadow-2xl prose-img:border prose-img:border-outline/10
                       prose-p:leading-relaxed prose-p:mb-8
                       prose-p:first-of-type:first-letter:float-left prose-p:first-of-type:first-letter:text-6xl prose-p:first-of-type:first-letter:pr-4 prose-p:first-of-type:first-letter:font-extrabold prose-p:first-of-type:first-letter:text-primary
                       prose-blockquote:border-l-primary prose-blockquote:bg-surface-container-low prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-on-surface"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className="mt-20 pt-10 border-t border-outline/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-on-surface-variant font-medium">{lang === 'uz' ? 'Ulashish:' : 'Поделиться:'}</span>
              <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors" title={lang === 'uz' ? "Nusxa olish" : "Копировать ссылку"}>
                <span className="material-symbols-outlined text-sm">link</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
