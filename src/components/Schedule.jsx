import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Schedule() {
  const { t } = useTranslation();
  
  // Try to load items from translation, fallback to empty array if not found
  const items = t('schedule.items', { returnObjects: true });
  const schedule = Array.isArray(items) ? items : [];

  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="material-symbols-outlined text-4xl text-primary">schedule</span>
          <h2 className="text-[32px] md:text-headline-lg font-bold text-on-surface">{t('schedule.title')}</h2>
        </div>
        <div className="glass-card rounded-3xl overflow-hidden">
          {schedule.map((item, idx) => (
            <div key={idx} className={`flex flex-col sm:flex-row sm:items-center justify-between p-6 ${idx !== schedule.length - 1 ? 'border-b border-outline/10' : ''} hover:bg-primary/5 transition-colors`}>
              <span className="font-label-caps text-primary tracking-widest text-lg mb-2 sm:mb-0">{item.time}</span>
              <span className="text-on-surface font-bold text-lg">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
