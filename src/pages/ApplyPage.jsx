import React, { useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import MultiStepForm from '../components/MultiStepForm';

export default function ApplyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-surface-container-lowest flex flex-col">
      <PageHeader 
        title="Ariza topshirish" 
        subtitle="NOVA maktabiga o'qishga kirish uchun onlayn ariza qoldiring." 
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
