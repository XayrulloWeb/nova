import React from 'react';
import PageHeader from '../components/PageHeader';
import { useTranslation } from 'react-i18next';
import SchoolHistory from '../components/SchoolHistory';
import Administration from '../components/Administration';
import TeachersGrid from '../components/TeachersGrid';
import Documents from '../components/Documents';

export default function AboutPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen">
      <PageHeader 
        title={t('pages.about.title')} 
        subtitle={t('pages.about.subtitle')} 
      />
      <SchoolHistory />
      <Administration />
      <TeachersGrid />
      <Documents />
    </div>
  );
}
