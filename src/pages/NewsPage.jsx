import React from 'react';
import PageHeader from '../components/PageHeader';
import { useTranslation } from 'react-i18next';
import LatestNews from '../components/LatestNews';
import Gallery from '../components/Gallery';

export default function NewsPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <PageHeader 
        title={t('pages.news.title')} 
        subtitle={t('pages.news.subtitle')} 
      />
      <LatestNews showAll={true} />
      <Gallery />
    </div>
  );
}
