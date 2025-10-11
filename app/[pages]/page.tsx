'use client'

import About from '@/components/About/About';
import AIF from '@/components/AIF/AIF';
import Contact from '@/components/Contact/Contact';
import CorporateAdvisory from '@/components/CorporateAdvisory/CorporateAdvisory';
import Insight from '@/components/Insight/Insight';
import PMS from '@/components/PMS/PMS';
import Team from '@/components/Teams/Team';
import React from 'react'

// Props interface for the dynamic page
interface DynamicPageProps {
  params: Promise<{
    pages: string;
  }>;
}

const DynamicPage: React.FC<DynamicPageProps> = ({ params }) => {
  // Unwrap params Promise using React.use()
  const { pages } = React.use(params);

  // Check params and render appropriate component
  if (pages === 'team') {
    return <Team />;
  }

  if (pages === 'pms') {
    return <PMS />;
  }

  if (pages === 'corporate-advisory') {
    return <CorporateAdvisory />;
  }

  if (pages === 'aif') {
    return <AIF />;
  }

  if (pages === 'contact') {
    return <Contact />;
  }

  if (pages === 'about') {
    return <About />;
  }

  if (pages === 'insights') {
    return <Insight />;
  }

  // If page not found, show 404
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600">The page &quot;{pages}&quot; doesn`&apos;t exist.</p>
      </div>
    </div>
  );
};

export default DynamicPage;