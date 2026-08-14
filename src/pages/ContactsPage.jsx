import React from 'react';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import { useTranslation } from 'react-i18next';
import ContactsMap from '../components/ContactsMap';
import ContactForm from '../components/ContactForm';

export default function ContactsPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <SEO 
        title={`${t('pages.contacts.title')} | NOVA`} 
        description={t('pages.contacts.subtitle')} 
      />
      <PageHeader 
        title={t('pages.contacts.title')} 
        subtitle={t('pages.contacts.subtitle')} 
      />
      <ContactsMap />
      <ContactForm />
    </div>
  );
}
