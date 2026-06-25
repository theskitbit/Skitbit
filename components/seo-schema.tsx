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
      // 2. ORGANIZATION (Brand & Social)
      {
        "@type": "Organization",
        "@id": "https://theskitbit.com/#organization",
        "name": "SKITBIT",
        "url": "https://theskitbit.com",
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
      // 3. PRODUCT (Clears "Non-Critical" Warnings)
      {
        "@type": "Product",
        "name": "3D Product Rendering Service",
        "image": "https://theskitbit.com/skien.jpg",
        "description": "High-end 3D product visuals designed for performance. Create consistent creatives across ads and social.",
        "brand": { "@type": "Brand", "name": "SKITBIT" },
        "sku": "SKIT-001",
        "offers": {
          "@type": "Offer",
          "url": "https://theskitbit.com",
          "priceCurrency": "USD",
          "price": "0", // 0 implies consultation-based
          "priceValidUntil": "2027-01-01",
          "availability": "https://schema.org/InStock"
        }
      },
      // 4. FAQ (Rich Snippets)
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is 3D product rendering?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "3D product rendering creates photorealistic digital images using 3D modeling, perfect for e-commerce and marketing."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use 3D renders for ads?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Our renders are designed for high-performance ads, PDPs, and social media."
            }
          }
        ]
      },
      // 5. BREADCRUMBS (Site Structure)
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://theskitbit.com" },
          { "@type": "ListItem", "position": 2, "name": "Pricing", "item": "https://theskitbit.com/pricing" }
        ]
      },
      // 6. LOCAL BUSINESS (Trust Signals)
      {
        "@type": "LocalBusiness",
        "name": "SKITBIT",
        "image": "https://theskitbit.com/images/Black-icon.svg",
        "url": "https://theskitbit.com",
        "priceRange": "$$",
        "telephone": "+1-contact-us",
        "areaServed": ["US", "CA", "UK", "AU"]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
    />
  );
}