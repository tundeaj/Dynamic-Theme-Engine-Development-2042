import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../contexts/ThemeContext';

function SEOHead({ 
  title = 'Dynamic Theme Engine', 
  description = 'Professional theme engine with role-based controls and monetization',
  keywords = 'themes, ui, ux, design, monetization',
  canonicalUrl = window.location.href 
}) {
  const { getCurrentThemeData } = useTheme();
  const currentTheme = getCurrentThemeData();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "description": description,
    "url": canonicalUrl,
    "applicationCategory": "DesignApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Dynamic Theme Engine" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Dynamic Theme Engine" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Theme-specific meta tags */}
      {currentTheme && (
        <>
          <meta name="theme-color" content={currentTheme.cssVariables['primary-color']} />
          <meta name="msapplication-navbutton-color" content={currentTheme.cssVariables['primary-color']} />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        </>
      )}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Performance and Accessibility */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
    </Helmet>
  );
}

export default SEOHead;