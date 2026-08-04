import React from 'react';
import { useTranslation } from 'react-i18next';

export default function SchoolFeatures() {
  const { t } = useTranslation();
  
  const features = t('features', { returnObjects: true }).map((f, i) => ({
    ...f,
    icon: ['location_on', 'school', 'public', 'language'][i]
  }));

  return (
    <div className="py-16 md:py-24 bg-background relative z-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => (
            <div key={idx} className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">{item.title}</h3>
              <p className="text-on-surface-variant leading-relaxed text-sm font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
