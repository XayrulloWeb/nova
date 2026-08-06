import React, { useState } from 'react';
import DashboardModal from './DashboardModal';
import { useTranslation } from 'react-i18next';

export default function ElectronicDiary() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-primary text-on-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="material-symbols-outlined text-6xl mb-6">laptop_chromebook</span>
        <h2 className="text-[32px] md:text-[48px] font-bold mb-6">{t('diary.title')}</h2>
        <p className="text-lg opacity-90 mb-10 max-w-2xl mx-auto">
          {t('diary.desc')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-surface text-primary px-8 py-4 rounded-full font-bold font-label-caps tracking-widest hover:bg-surface/90 transition-colors shadow-lg w-full sm:w-auto"
          >
            {t('diary.loginBtn')}
          </button>
          <button className="border-2 border-surface text-surface px-8 py-4 rounded-full font-bold font-label-caps tracking-widest hover:bg-surface/10 transition-colors w-full sm:w-auto">
            {t('diary.downloadAppBtn')}
          </button>
        </div>
      </div>
      
      <DashboardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
