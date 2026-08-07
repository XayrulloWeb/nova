import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title = "NOVA - Xususiy Maktabi", 
  description = "NOVA xususiy maktabi klassik akademik an'analarni 21-asrning ilg'or texnologiyalari bilan birlashtiradi.", 
  name = "NOVA School",
  image = "https://nova-maktab.uz/logo.webp"
}) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      
      {/* Open Graph tags for social sharing */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={name} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
