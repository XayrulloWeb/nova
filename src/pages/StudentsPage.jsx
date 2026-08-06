import React from 'react';
import PageHeader from '../components/PageHeader';
import { useTranslation } from 'react-i18next';
import Schedule from '../components/Schedule';
import Exams from '../components/Exams';

export default function StudentsPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <PageHeader 
        title={t('pages.students.title')} 
        subtitle={t('pages.students.subtitle')} 
      />
      <Schedule />
      <Exams />
    </div>
  );
}
