import React from 'react';
import PageHeader from '../components/PageHeader';
import Admissions from '../components/Admissions';
import MealsAndUniform from '../components/MealsAndUniform';
import ElectronicDiary from '../components/ElectronicDiary';

export default function ParentsPage() {
  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <PageHeader 
        title="Ota-onalarga" 
        subtitle="NOVA xususiy maktabi o'quvchilarining ota-onalari uchun barcha kerakli ma'lumotlar." 
      />
      <ElectronicDiary />
      <div className="pt-24">
        <Admissions />
      </div>
      <MealsAndUniform />
    </div>
  );
}
