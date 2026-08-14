import React from 'react';
import SEO from '../components/SEO';
import { useTranslation } from 'react-i18next';
import LatestNews from '../components/LatestNews';
import Gallery from '../components/Gallery';

export default function NewsPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <SEO title={`${t('pages.news.title')} | NOVA`} />
      <LatestNews showAll={true} />
      <Gallery />
    </div>
  );
}
