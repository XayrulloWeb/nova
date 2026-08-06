import React from 'react';
import { useTranslation } from 'react-i18next';

export default function SchoolHistory() {
  const { t } = useTranslation();
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-[32px] md:text-headline-lg font-bold text-on-surface mb-8">{t('history.title')}</h2>
        <div className="glass-card p-8 rounded-3xl">
          <p className="text-body-lg text-on-surface-variant mb-6 whitespace-pre-line">
            {t('history.desc')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div>
              <h3 className="font-label-caps text-primary mb-2">{t('history.foundersLabel')}</h3>
              <p className="text-on-surface">{t('history.foundersValue')}</p>
            </div>
            <div>
              <h3 className="font-label-caps text-primary mb-2">{t('history.hoursLabel')}</h3>
              <p className="text-on-surface whitespace-pre-line">{t('history.hoursValue')}</p>
            </div>
            <div>
              <h3 className="font-label-caps text-primary mb-2">{t('history.langsLabel')}</h3>
              <p className="text-on-surface">{t('history.langsValue')}</p>
            </div>
            <div>
              <h3 className="font-label-caps text-primary mb-2">{t('history.infraLabel')}</h3>
              <p className="text-on-surface">{t('history.infraValue')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
