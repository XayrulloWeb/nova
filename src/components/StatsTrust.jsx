import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function StatsTrust() {
  const { t } = useTranslation();
  const [stats, setStats] = useState({ students_count: '...', experience_years: '...', graduates_count: '...' });

  useEffect(() => {
    fetch('http://localhost:5000/api/public/stats')
      .then(res => res.json())
      .then(data => {
        if (data && data.students_count) {
          setStats(data);
        }
      })
      .catch(err => console.error(err));
  }, []);
  return (
    <section className="w-full py-24 md:py-32 bg-background relative z-10" id="stats-trust">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center pb-16 md:pb-24">
          <span className="text-primary font-label-caps uppercase tracking-widest block mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">{t('stats.badge')}</span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-on-surface tracking-tight max-w-3xl">{t('stats.title')}</h2>
        </div>
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Main Stat Card */}
            <div className="md:col-span-12 lg:col-span-8 glass-card rounded-[32px] p-10 md:p-16 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-primary/30 transition-colors duration-700"></div>
                <div>
                    <div className="flex items-baseline gap-2 mb-6 relative z-10">
                        <span className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-on-surface to-on-surface-variant tracking-tighter leading-none">{stats.students_count}</span>
                        <span className="text-4xl font-bold text-primary">*</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-on-surface mb-4 relative z-10">{t('stats.uniTitle')}</h3>
                </div>
                <p className="text-body-lg text-on-surface-variant max-w-lg mt-8 relative z-10 font-medium">{t('stats.uniDesc')}</p>
            </div>

            {/* Smaller Stats */}
            <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-8">
                <div className="glass-card rounded-[32px] p-8 flex-1 flex flex-col justify-center relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                    <div className="text-5xl md:text-6xl font-black text-on-surface mb-3 tracking-tighter">{stats.experience_years}</div>
                    <div className="text-body-md text-primary font-bold uppercase tracking-widest mb-2">{t('stats.expLabel')}</div>
                    <div className="text-sm text-on-surface-variant leading-relaxed">{t('stats.expDesc')}</div>
                </div>
                <div className="glass-card rounded-[32px] p-8 flex-1 flex flex-col justify-center relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                    <div className="text-5xl md:text-6xl font-black text-on-surface mb-3 tracking-tighter">{stats.graduates_count}</div>
                    <div className="text-body-md text-primary font-bold uppercase tracking-widest mb-2">{t('stats.alumniLabel')}</div>
                    <div className="text-sm text-on-surface-variant leading-relaxed">{t('stats.alumniDesc')}</div>
                </div>
            </div>

        </div>
        
        {/* Trust / Partners Block */}
        <div className="mt-24 pt-16 border-t border-outline/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="w-full md:w-1/3 text-center md:text-left">
              <p className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-2">{t('stats.partnersSubtitle')}</p>
              <h3 className="text-2xl font-semibold text-on-surface">{t('stats.partnersTitle')}</h3>
            </div>
            <div className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center opacity-60">
              <img className="h-8 md:h-10 w-auto mx-auto object-contain filter grayscale hover:grayscale-0 hover:brightness-200 transition-all duration-300" alt="Partner 1" src="/partners/partner-1.png" />
              <img className="h-8 md:h-10 w-auto mx-auto object-contain filter grayscale hover:grayscale-0 hover:brightness-200 transition-all duration-300" alt="Partner 2" src="/partners/partner-2.png" />
              <img className="h-8 md:h-10 w-auto mx-auto object-contain filter grayscale hover:grayscale-0 hover:brightness-200 transition-all duration-300" alt="Partner 3" src="/partners/partner-3.png" />
              <img className="h-8 md:h-10 w-auto mx-auto object-contain filter grayscale hover:grayscale-0 hover:brightness-200 transition-all duration-300" alt="Partner 4" src="/partners/partner-4.png" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
