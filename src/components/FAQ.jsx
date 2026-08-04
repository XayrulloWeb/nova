import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const { t } = useTranslation();
  const faqs = t('faq.list', { returnObjects: true });

  return (
    <section className="py-24 bg-background relative z-10 border-t border-outline/10" id="faq">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center pb-16">
          <span className="text-primary font-label-caps uppercase tracking-widest block mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            {t('faq.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight">
            {t('faq.title')}
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`glass-panel rounded-2xl overflow-hidden transition-all duration-300 ${
                activeIndex === idx 
                  ? 'border-primary/40 shadow-[0_4px_24px_rgba(0,0,0,0.1)] bg-white/5 dark:bg-white/5' 
                  : 'border-outline/10 hover:border-outline/30'
              }`}
            >
              <button 
                className="w-full px-6 md:px-8 py-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
              >
                <span className={`font-bold text-lg md:text-xl transition-colors duration-300 ${activeIndex === idx ? 'text-primary' : 'text-on-surface'}`}>
                  {faq.q}
                </span>
                <span className={`material-symbols-outlined text-2xl transition-transform duration-300 ${activeIndex === idx ? 'rotate-180 text-primary' : 'text-on-surface-variant'}`}>
                  expand_more
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === idx ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 md:px-8 pb-6 text-on-surface-variant leading-relaxed">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
