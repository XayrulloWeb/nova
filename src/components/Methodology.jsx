import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Methodology() {
  const { t } = useTranslation();
  const stepsData = t('methodology.steps', { returnObjects: true });
  const steps = Array.isArray(stepsData) ? stepsData : [];

  return (
    <section className="py-24 md:py-32 bg-background relative z-10 border-t border-outline/10" id="methodology">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-12 items-end justify-between mb-20 relative z-10">
          <div className="max-w-3xl">
            <span className="text-primary font-label-caps uppercase tracking-widest block mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 inline-block">
              {t('methodology.badge')}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface tracking-tight mb-6">
              {t('methodology.title')}
            </h2>
            <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed">
              {t('methodology.desc')}
            </p>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 relative z-10">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group flex flex-col sm:flex-row gap-6 md:gap-8 items-start p-6 rounded-[32px] glass-panel hover:border-primary/30 transition-colors duration-500">
              <div className="text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-primary/30 to-transparent leading-none tracking-tighter sm:-mt-4 select-none group-hover:from-primary/60 transition-all duration-500">
                {step.num}
              </div>
              <div className="flex-1 mt-2 sm:mt-0">
                <h3 className="text-2xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
