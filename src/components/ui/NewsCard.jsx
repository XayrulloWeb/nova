import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from 'react-i18next';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const stripHtml = (html) => {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

export default function NewsCard({ item, variant = 'standard', className, index = 0 }) {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('uz') ? 'uz' : 'ru';
  
  const title = item.title?.[lang] || '';
  const desc = stripHtml(item.content?.[lang] || '');
  const dateStr = new Date(item.created_at).toLocaleDateString();

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (index % 10) * 0.1 }
    }
  };

  const isHero = variant === 'hero';

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "group relative flex flex-col rounded-[32px] overflow-hidden glass-card transition-all duration-500",
        "hover:shadow-[0_0_40px_rgba(0,219,233,0.15)] hover:-translate-y-2 border border-outline/10",
        isHero ? "md:col-span-3 min-h-[500px] md:min-h-[600px]" : "h-full min-h-[400px]",
        className
      )}
    >
      <Link to={`/news/${item.id}`} className="absolute inset-0 z-20">
        <span className="sr-only">Read {title}</span>
      </Link>

      {/* Image Background */}
      <div className={cn(
        "relative overflow-hidden bg-surface-container-high",
        isHero ? "absolute inset-0 h-full w-full" : "h-64 md:h-72 w-full"
      )}>
        {item.image_url ? (
          <img 
            src={item.image_url} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-surface-variant to-background"></div>
        )}
        
        {/* Overlays */}
        <div className={cn(
          "absolute inset-0 transition-opacity duration-500",
          isHero ? "bg-gradient-to-t from-background via-background/80 to-transparent opacity-90 group-hover:opacity-100" 
                 : "bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100"
        )}></div>
      </div>

      {/* Content */}
      <div className={cn(
        "flex flex-col flex-1 relative z-10",
        isHero ? "justify-end p-8 md:p-16 mt-auto" : "p-6 md:p-8 bg-surface/40 backdrop-blur-sm"
      )}>
        <div className="flex items-center gap-4 mb-4">
          <span className="px-3 py-1 rounded-full bg-primary/20 text-primary backdrop-blur-md text-xs font-bold uppercase tracking-wider border border-primary/20">
            NOVA
          </span>
          <span className={cn(
            "text-sm font-medium",
            isHero ? "text-on-surface" : "text-on-surface-variant"
          )}>
            {dateStr}
          </span>
        </div>

        <h3 className={cn(
          "font-bold text-on-surface mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-3",
          isHero ? "text-3xl md:text-5xl leading-tight" : "text-xl md:text-2xl"
        )}>
          {title}
        </h3>

        <p className={cn(
          "flex-1 line-clamp-3",
          isHero ? "text-on-surface-variant md:text-xl max-w-3xl mb-8" : "text-on-surface-variant text-sm mb-6"
        )}>
          {desc}
        </p>

        <div className="mt-auto">
          <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors flex items-center gap-2">
            {lang === 'uz' ? "O'qish" : "Читать"} 
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">east</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
