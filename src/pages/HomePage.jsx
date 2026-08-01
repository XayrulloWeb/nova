import React from 'react';
import Hero from '../components/Hero';
import TechnologyGeometricParallax from '../components/TechnologyGeometricParallax';
import MentorsBentoGrid from '../components/MentorsBentoGrid';
import StatsTrust from '../components/StatsTrust';

export default function HomePage() {
  return (
    <div className="relative z-10">
      <Hero />
      <MentorsBentoGrid />
      <TechnologyGeometricParallax />
      <StatsTrust />
    </div>
  );
}
