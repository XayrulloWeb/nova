import React from 'react';
import Hero from '../components/Hero';
import Announcements from '../components/Announcements';
import QuickLinks from '../components/QuickLinks';
import LatestNews from '../components/LatestNews';
import StatsTrust from '../components/StatsTrust';

export default function HomePage() {
  return (
    <div className="relative z-10">
      <Hero />
      <Announcements />
      <QuickLinks />
      <LatestNews />
      <StatsTrust />
    </div>
  );
}
