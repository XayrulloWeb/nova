import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import { useTranslation } from 'react-i18next';
import MultiStepForm from '../components/MultiStepForm';

export default function ApplyPage() {
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-surface-container-lowest flex flex-col">
      <SEO 
        title={`${t('pages.apply.title')} | NOVA`} 
        description={t('pages.apply.subtitle')} 
      />
      <PageHeader 
        title={t('pages.apply.title')} 
        subtitle={t('pages.apply.subtitle')} 
      />
      
      <section className="flex-grow py-24 px-margin-mobile md:px-margin-desktop relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <MultiStepForm />
        </div>
      </section>
    </div>
  );
}
