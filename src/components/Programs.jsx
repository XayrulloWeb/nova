import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Programs() {
  const { t } = useTranslation();
  const stagesData = t('programs.stages', { returnObjects: true });
  const stages = Array.isArray(stagesData) ? stagesData : [];

  return (
    <section className="py-24 bg-surface-container relative z-10 border-y border-outline/10" id="programs">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center pb-16">
          <span className="text-primary font-label-caps uppercase tracking-widest block mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            {t('programs.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight max-w-2xl">
            {t('programs.title')}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stages.map((stage, idx) => (
            <div 
              key={idx} 
              className="glass-card rounded-[32px] p-8 md:p-10 flex flex-col relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 border border-outline/10"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors duration-500 pointer-events-none"></div>
              
              <div className="mb-8 relative z-10">
                <div className="inline-block px-5 py-2 rounded-full bg-primary text-on-primary font-bold tracking-wider mb-5 shadow-lg shadow-primary/20">
                  {stage.grades}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-on-surface">
                  {stage.title}
                </h3>
              </div>
              
              <ul className="space-y-4 flex-1 relative z-10 border-t border-outline/10 pt-6 mt-2">
                {stage.subjects.map((subject, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-xl mt-0.5">check_circle</span>
                    <span className="text-on-surface-variant font-medium leading-relaxed">{subject}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
