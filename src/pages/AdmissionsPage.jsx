import React from 'react';
import Programs from '../components/Programs';
import Admissions from '../components/Admissions';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';

export default function AdmissionsPage() {
  return (
    <div className="relative z-10">
      <Programs />
      <Admissions />
      <Testimonials />
      <FAQ />
    </div>
  );
}
