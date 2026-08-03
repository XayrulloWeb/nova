import React from 'react';
import PageHeader from '../components/PageHeader';
import SchoolHistory from '../components/SchoolHistory';
import Administration from '../components/Administration';
import TeachersGrid from '../components/TeachersGrid';
import Documents from '../components/Documents';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Maktab haqida" 
        subtitle="Ta'lim tashkiloti haqida ma'lumot" 
      />
      <SchoolHistory />
      <Administration />
      <TeachersGrid />
      <Documents />
    </div>
  );
}
