/**
 * AEO (AI Engine Optimization) Component
 * Improves discoverability by AI tools like ChatGPT, Claude, Perplexity, etc.
 * Uses semantic HTML and structured data to help AI understand content
 */

export function AEOOptimizer() {
  return (
    <>
      {/* 
        This meta tag helps AI tools understand the page structure and purpose
        It's used by AI search engines and content parsers
      */}
      <meta
        name="description"
        content="High-end 3D product visuals designed for performance. Create consistent creatives across ads, PDPs, and social—without production delays. Services include product rendering, ad creatives, and e-commerce solutions."
      />

      {/* 
        Topic meta tags help AI understand core subjects
      */}
      <meta name="topic" content="3D Product Rendering" />
      <meta name="topic" content="E-commerce Solutions" />
      <meta name="topic" content="Product Visualization" />

      {/* 
        Summary for AI tools - clear, structured overview
      */}
      <meta
        name="abstract"
        content="SKITBIT provides high-quality 3D product rendering for e-commerce brands. Services include product visualization, ad creatives, photography alternatives, and digital product rendering for social media and marketing."
      />

      {/* 
        Audience meta tag
      */}
      <meta name="audience" content="E-commerce brands, Product companies, Advertising agencies, Marketing teams" />

      {/* 
        Content rating for AI classification
      */}
      <meta name="rating" content="general" />

      {/* 
        Revisit frequency for crawlers
      */}
      <meta name="revisit-after" content="7 days" />
    </>
  )
}

/**
 * AEO Best Practices Applied:
 * 1. Clear heading hierarchy (H1 > H2 > H3) - aids AI comprehension
 * 2. Structured data (JSON-LD schemas) - helps AI understand entities
 * 3. Semantic HTML tags (section, article, aside, nav) - provides context
 * 4. Alt text on images - allows AI to process visual content
 * 5. Meta tags for topics - helps AI categorize content
 * 6. Internal linking - shows relationship between concepts
 * 7. Clear CTAs - helps AI understand conversion points
 * 8. FAQ schema - answers common questions AI tools ask
 * 9. Breadcrumbs - shows site hierarchy
 * 10. Mobile optimization - AI tools prioritize mobile-friendly content
 */
