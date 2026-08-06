import React from 'react';
import PageHeader from '../components/PageHeader';
import { useTranslation } from 'react-i18next';
import Admissions from '../components/Admissions';
import MealsAndUniform from '../components/MealsAndUniform';
import ElectronicDiary from '../components/ElectronicDiary';

export default function ParentsPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <PageHeader 
        title={t('pages.parents.title')} 
        subtitle={t('pages.parents.subtitle')} 
      />
      <ElectronicDiary />
      <div className="pt-24">
        <Admissions />
      </div>
      <MealsAndUniform />
    </div>
  );
}
