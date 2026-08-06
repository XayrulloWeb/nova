import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import CampusPreview from '../components/CampusPreview';
import SchoolUniform from '../components/SchoolUniform';
import SchoolFeatures from '../components/SchoolFeatures';
import Advantages from '../components/Advantages';
import Methodology from '../components/Methodology';
import Programs from '../components/Programs';
import FAQ from '../components/FAQ';
import Announcements from '../components/Announcements';
import QuickLinks from '../components/QuickLinks';
import LatestNews from '../components/LatestNews';
import StatsTrust from '../components/StatsTrust';

export default function HomePage() {
  return (
    <div className="relative z-10">
      <SEO title="NOVA-INTERNATIONAL AI SCHOOL" />
      <Hero />
      <CampusPreview />
      <SchoolUniform />
      <SchoolFeatures />
      <Advantages />
      <Methodology />
      <Programs />
      <FAQ />
      <Announcements />
      <QuickLinks />
      <LatestNews />
      <StatsTrust />
    </div>
  );
}
