// components/seo-schema.tsx
export function SEOSchema() {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. WEBSITE (Site Name Identity)
      {
        "@type": "WebSite",
        "@id": "https://theskitbit.com/#website",
        "url": "https://theskitbit.com/",
        "name": "SKITBIT",
        "alternateName": "Skitbit International",
        "publisher": { "@id": "https://theskitbit.com/#organization" }
      },
      // 2. SITE NAVIGATION (Helps search engines understand primary sitelinks)
      {
        "@type": "ItemList",
        "@id": "https://theskitbit.com/#site-navigation",
        "name": "Skitbit primary navigation",
        "itemListElement": [
          {
            "@type": "SiteNavigationElement",
            "position": 1,
            "name": "Services",
            "description": "Explore Skitbit's 3D product animation, CGI rendering, and creative services.",
            "url": "https://theskitbit.com/services"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 2,
            "name": "Work",
            "description": "View Skitbit's portfolio of 3D product visuals and CGI campaigns.",
            "url": "https://theskitbit.com/works"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 3,
            "name": "Pricing",
            "description": "Explore Skitbit's product visualization pricing and project options.",
            "url": "https://theskitbit.com/pricing"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 4,
            "name": "Contact",
            "description": "Contact Skitbit to discuss your next 3D product visualization project.",
            "url": "https://theskitbit.com/contact-form"
          }
        ]
      },
      // 3. ORGANIZATION (Brand & Social)
      {
        "@type": "Organization",
        "@id": "https://theskitbit.com/#organization",
        "name": "SKITBIT",
        "url": "https://theskitbit.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://theskitbit.com/images/Black-icon.svg"
        },
        "description": "High-end 3D product rendering for e-commerce brands.",
        "sameAs": [
          "https://www.linkedin.com/company/skitbit",
          "https://www.instagram.com/skitbit",
          "https://twitter.com/skitbit"
        ]
      },
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
    />
  );
}
