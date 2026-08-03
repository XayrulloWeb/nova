import React from 'react';
import PageHeader from '../components/PageHeader';
import ContactsMap from '../components/ContactsMap';
import ContactForm from '../components/ContactForm';

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <PageHeader 
        title="Aloqa" 
        subtitle="Biz har doim muloqotga ochiqmiz." 
      />
      <ContactsMap />
      <ContactForm />
    </div>
  );
}
