import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title = "NOVA - Xususiy Maktabi", 
  description = "NOVA xususiy maktabi klassik akademik an'analarni 21-asrning ilg'or texnologiyalari bilan birlashtiradi.", 
  name = "NOVA School",
  image = "https://nova-maktab.uz/logo.webp",
  keywords = "nova, xususiy maktab, chastniy shkola, ai school, urganch",
  structuredData = null
}) {
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": name,
    "description": description,
    "url": "https://nova-maktab.uz",
    "logo": image,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Urgench",
      "addressRegion": "Khorezm",
      "addressCountry": "UZ"
    }
  };

  const schemaData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      
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

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
}
