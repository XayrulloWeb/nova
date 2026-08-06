import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Exams() {
  const { t } = useTranslation();
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[32px] md:text-headline-lg font-bold text-on-surface mb-12 text-center">{t('exams.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-10 rounded-3xl border-t-4 border-t-primary">
            <h3 className="text-2xl font-bold text-on-surface mb-4">{t('exams.stateExams')}</h3>
            <p className="text-on-surface-variant mb-6">{t('exams.stateExamsDesc')}</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">done</span>
                <span className="text-on-surface">{t('exams.individualPath')}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">done</span>
                <span className="text-on-surface">{t('exams.experts')}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">done</span>
                <span className="text-on-surface">{t('exams.psyPrep')}</span>
              </li>
            </ul>
          </div>
          <div className="glass-card p-10 rounded-3xl border-t-4 border-t-primary">
            <h3 className="text-2xl font-bold text-on-surface mb-4">{t('exams.olympiads')}</h3>
            <p className="text-on-surface-variant mb-6">{t('exams.olympiadsDesc')}</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">done</span>
                <span className="text-on-surface">{t('exams.specialCourses')}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">done</span>
                <span className="text-on-surface">{t('exams.visitingSchools')}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">done</span>
                <span className="text-on-surface">{t('exams.stem')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
