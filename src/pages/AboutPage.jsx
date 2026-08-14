import React from 'react';
import SEO from '../components/SEO';
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
      <SEO 
        title={`${t('pages.about.title')} | NOVA`} 
        description={t('pages.about.subtitle')} 
      />
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
