import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function Schedule() {
  const { t, i18n } = useTranslation();
  
  const items = t('schedule.items', { returnObjects: true });
  const schedule = Array.isArray(items) ? items : [];

  const getEventMeta = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('завтрак') || lowerName.includes('nonushta') || lowerName.includes('кофе') || lowerName.includes('kofe')) {
      return { icon: 'coffee', color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200' };
    }
    if (lowerName.includes('обед') || lowerName.includes('tushlik')) {
      return { icon: 'restaurant', color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' };
    }
    if (lowerName.includes('урок') || lowerName.includes('dars') || lowerName.includes('задание') || lowerName.includes('vazifa')) {
      return { icon: 'menu_book', color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' };
    }
    if (lowerName.includes('перемена') || lowerName.includes('tanaffus')) {
      return { icon: 'sports_esports', color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' };
    }
    if (lowerName.includes('кружок') || lowerName.includes('to\'garak')) {
      return { icon: 'palette', color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200' };
    }
    if (lowerName.includes('домой') || lowerName.includes('uyga')) {
      return { icon: 'home', color: 'text-slate-500', bg: 'bg-slate-50', border: 'border-slate-200' };
    }
    return { icon: 'schedule', color: 'text-primary', bg: 'bg-primary/5', border: 'border-primary/20' };
  };

  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary mb-6 font-bold text-sm tracking-widest uppercase"
          >
            <span className="material-symbols-outlined text-lg">today</span>
            {t('schedule.title')}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-on-surface tracking-tight"
          >
            {i18n.language?.startsWith('uz') ? 'Kun tartibi' : 'Распорядок дня'}
          </motion.h2>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-4 border-outline/10 ml-4 md:ml-12 pl-8 md:pl-16 py-8">
          
          {schedule.map((item, idx) => {
            const meta = getEventMeta(item.name);
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="relative mb-12 last:mb-0 group"
              >
                {/* Timeline Node (Icon on the line) */}
                <div className={`absolute -left-[3.25rem] md:-left-[5.25rem] w-12 h-12 md:w-14 md:h-14 rounded-2xl ${meta.bg} border-2 ${meta.border} shadow-sm flex items-center justify-center z-10 transform group-hover:scale-110 transition-transform duration-300 group-hover:shadow-md`}>
                  <span className={`material-symbols-outlined text-2xl md:text-3xl ${meta.color}`}>
                    {meta.icon}
                  </span>
                </div>

                {/* Timeline Card */}
                <div className="bg-white border border-outline/5 shadow-sm hover:shadow-xl transition-shadow duration-300 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-on-surface mb-2">{item.name}</h3>
                    <div className="inline-flex items-center gap-2 text-on-surface-variant font-medium bg-surface-container px-3 py-1.5 rounded-xl">
                      <span className="material-symbols-outlined text-[18px]">schedule</span>
                      {item.time}
                    </div>
                  </div>
                  
                  {/* Visual flare for hover */}
                  <div className="hidden md:flex w-12 h-12 rounded-full bg-surface-container-highest items-center justify-center group-hover:bg-primary group-hover:text-primary-on transition-colors duration-300 cursor-pointer text-on-surface-variant">
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
