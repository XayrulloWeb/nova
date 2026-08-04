import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Advantages() {
  const { t } = useTranslation();
  
  const advantages = t('advantages.list', { returnObjects: true }).map((a, i) => ({
    ...a,
    icon: ['smart_toy', 'self_improvement', 'restaurant', 'apartment', 'cast_for_education', 'stacked_bar_chart'][i]
  }));

  return (
    <section className="py-24 bg-surface-container relative z-10" id="advantages">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center pb-16">
          <span className="text-primary font-label-caps uppercase tracking-widest block mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            {t('advantages.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight max-w-2xl">
            {t('advantages.title')}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((item, idx) => (
            <div 
              key={idx} 
              className="glass-card rounded-[32px] p-8 md:p-10 flex flex-col items-start relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-500 pointer-events-none"></div>
              
              <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center text-primary mb-8 border border-outline/10 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-4xl">{item.icon}</span>
              </div>
              
              <h3 className="text-2xl font-bold text-on-surface mb-4 relative z-10">
                {item.title}
              </h3>
              
              <p className="text-on-surface-variant leading-relaxed text-base relative z-10">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
