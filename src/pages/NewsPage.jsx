import React from 'react';
import PageHeader from '../components/PageHeader';
import LatestNews from '../components/LatestNews';
import Gallery from '../components/Gallery';

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <PageHeader 
        title="Yangiliklar" 
        subtitle="Maktab hayoti, tadbirlar va fotogalereya." 
      />
      <LatestNews />
      <Gallery />
    </div>
  );
}
