import React from 'react';
import PageHeader from '../components/PageHeader';
import Schedule from '../components/Schedule';
import Exams from '../components/Exams';

export default function StudentsPage() {
  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <PageHeader 
        title="O'quvchilarga" 
        subtitle="Dars jadvali, to'garaklar va imtihonlarga tayyorgarlik." 
      />
      <Schedule />
      <Exams />
    </div>
  );
}
