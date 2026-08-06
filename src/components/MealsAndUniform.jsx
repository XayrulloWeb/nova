import React from 'react';
import { useTranslation } from 'react-i18next';

export default function MealsAndUniform() {
  const { t } = useTranslation();
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Meals */}
        <div className="glass-card p-10 rounded-3xl group">
          <div className="flex items-center gap-4 mb-8">
            <span className="material-symbols-outlined text-5xl text-primary">restaurant</span>
            <h2 className="text-3xl font-bold text-on-surface">{t('meals.mealsTitle')}</h2>
          </div>
          <p className="text-body-lg text-on-surface-variant mb-8">{t('meals.mealsDesc')}</p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              <span className="text-on-surface">{t('meals.freshProducts')}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              <span className="text-on-surface">{t('meals.customMenu')}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              <span className="text-on-surface">{t('meals.ownBakery')}</span>
            </li>
          </ul>
          <button className="text-primary font-label-caps tracking-widest text-sm hover:opacity-70 transition-opacity">{t('meals.viewMenu')} &rarr;</button>
        </div>

        {/* Uniform */}
        <div className="glass-card p-10 rounded-3xl group">
          <div className="flex items-center gap-4 mb-8">
            <span className="material-symbols-outlined text-5xl text-primary">checkroom</span>
            <h2 className="text-3xl font-bold text-on-surface">{t('meals.uniformTitle')}</h2>
          </div>
          <p className="text-body-lg text-on-surface-variant mb-8">{t('meals.uniformDesc')}</p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              <span className="text-on-surface">{t('meals.everydayUniform')}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              <span className="text-on-surface">{t('meals.festiveUniform')}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              <span className="text-on-surface">{t('meals.sportsUniform')}</span>
            </li>
          </ul>
          <button className="text-primary font-label-caps tracking-widest text-sm hover:opacity-70 transition-opacity">{t('meals.uniformReqs')} &rarr;</button>
        </div>
      </div>
    </section>
  );
}
