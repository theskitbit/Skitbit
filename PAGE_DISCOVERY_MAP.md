# Page Discovery Map - Skitbit International

**Updated**: May 20, 2026  
**Total Pages**: 25+ static pages pre-rendered at build time  
**Sitemap**: `/sitemap.xml` (auto-generated)  
**Sitemap Index**: `/sitemap-index` (human-readable list of all pages)

---

## Discovery Flow

All pages are discoverable through multiple paths:

```
Google Crawler/LLM Bot
       ↓
/robots.txt → points to /sitemap.xml
       ↓
/sitemap.xml (dynamic, auto-generated from lib/public-routes.ts)
       ↓
All 25+ pages with priority & change frequency
       ↓
/sitemap-index (human-readable page for additional link discovery)
       ↓
Links to ALL pages organized by category
```

---

## Footer Link Structure

All pages are linked from the global footer component (`components/footer.tsx`), which appears on every page:

### Primary Categories

**3D Rendering Section** (5 services)
- `/services/3d-rendering-beauty`
- `/services/3d-rendering-wellness`
- `/services/luxury-watches`
- `/services/fine-jewelry`
- `/services/seed-startups`

**Growth Assets Section** (4 services)
- `/services/social-ads-beauty`
- `/services/supplement-explainers`
- `/services/amazon-wellness`
- `/services/luxury-brand-films`

**Markets Section** (10 country pages)
- `/us` (United States)
- `/uk` (United Kingdom)
- `/ca` (Canada)
- `/au` (Australia)
- `/ae` (UAE)
- `/de` (Germany)
- `/fr` (France)
- `/nl` (Netherlands)
- `/se` (Sweden)
- `/ch` (Switzerland)

**Europe & Other Markets Section**
- All 5 European country pages (de, fr, nl, se, ch)

**Studio Locations Section**
- `/locations` (main locations hub with links to all location pages)
- `/services` (services overview)
- `/pricing`
- `/contact`

**Systems Section**
- `/llms.txt` (AI systems file)
- `/robots.txt` (robots configuration)
- `/sitemap.xml` (XML sitemap)

---

## Static Pages (8 pages)

These are hardcoded in `lib/public-routes.ts` and appear in `/sitemap.xml`:

| Page | Path | Priority | Change Frequency |
|------|------|----------|------------------|
| Homepage | `/` | 1.0 | Weekly |
| Services Hub | `/services` | 0.9 | Weekly |
| Pricing | `/pricing` | 0.8 | Weekly |
| Locations Hub | `/locations` | 0.8 | Weekly |
| Contact | `/contact` | 0.8 | Monthly |
| Sitemap Index | `/sitemap-index` | 0.8 | Weekly |
| AI Systems | `/llms.txt` | 1.0 | Monthly |
| XML Sitemap | `/sitemap.xml` | - | Dynamic |

---

## Country Pages (10 pages)

Auto-generated from `data/country-pages.ts`:

| Country | Path | Priority | Markets |
|---------|------|----------|---------|
| United States | `/us` | 0.9 | North America |
| United Kingdom | `/uk` | 0.9 | Europe |
| Canada | `/ca` | 0.9 | North America |
| Australia | `/au` | 0.9 | APAC |
| UAE | `/ae` | 0.9 | Middle East |
| Germany | `/de` | 0.9 | Europe |
| France | `/fr` | 0.9 | Europe |
| Netherlands | `/nl` | 0.9 | Europe |
| Sweden | `/se` | 0.9 | Europe |
| Switzerland | `/ch` | 0.9 | Europe |

---

## Service Pages (8+ pages)

Auto-generated from `data/services-data.ts`:

- `/services/3d-rendering-beauty`
- `/services/3d-rendering-wellness`
- `/services/luxury-watches`
- `/services/fine-jewelry`
- `/services/seed-startups`
- `/services/social-ads-beauty`
- `/services/supplement-explainers`
- `/services/luxury-brand-films`
- `/services/amazon-wellness`
- `/services/amazon-beauty-aplus`
- `/services/performance-retainer`

---

## Location Pages (5 pages)

Auto-generated from `data/locations.ts`:

- `/locations/mumbai-video-production`
- `/locations/bangalore-digital-marketing`
- `/locations/london-video-production`
- `/locations/mumbai-3d-animation`
- `/locations/toronto-animation-studios`

All linked from `/locations` main hub page.

---

## Sitemap Generation

The sitemap is **dynamically generated** at build time:

**Source**: `app/sitemap.ts`
**Config**: `lib/public-routes.ts`
**Output**: `/sitemap.xml`

```typescript
// Automatically includes:
- All STATIC_ROUTES (8 pages)
- All country pages from countryPages data (10 pages)
- All services from servicesData (8+ pages)
- All locations from locations data (5 pages)

// Total: 25+ pages with proper priority and change frequency
```

---

## How Crawlers Find All Pages

1. **Primary Route**: Crawler hits `/robots.txt`
2. **Directed to Sitemap**: Points to `https://www.theskitbit.com/sitemap.xml`
3. **Complete Index**: Sitemap lists 25+ pages with metadata
4. **Secondary Discovery**: Crawler follows footer links on each page
5. **Tertiary Fallback**: `/sitemap-index` provides human-readable directory

---

## Page Count Summary

- **Static Pages**: 8
- **Country Pages**: 10
- **Service Pages**: 8+
- **Location Pages**: 5
- **System Files**: 2 (robots.txt, sitemap.xml)

**Total Pre-rendered**: 25+ pages at build time

---

## Adding New Pages

### To Add a Static Page

1. Create page file: `/app/your-page/page.tsx`
2. Add to `lib/public-routes.ts`:
   ```typescript
   {
     path: '/your-page',
     priority: 0.8,
     changeFrequency: 'weekly',
     lastModified: new Date(),
   }
   ```
3. Add link to footer: `components/footer.tsx`
4. Rebuild and deploy

### To Add a Country Page

1. Add country config to `data/country-pages.ts`
2. Page automatically appears at `/{countryCode}`
3. Footer automatically updated

### To Add a Service

1. Add to `data/services-data.ts`
2. Page automatically appears at `/services/{slug}`
3. Footer link auto-generated

### To Add a Location

1. Add to `data/locations.ts`
2. Page automatically appears at `/locations/{slug}`
3. Locations hub automatically updated

---

## SEO Verification

✅ All pages in `/sitemap.xml`
✅ Footer links on every page enable crawlers
✅ `/sitemap-index` provides additional discovery
✅ Proper priority levels (homepage 1.0, core pages 0.9, others 0.8)
✅ Change frequencies set appropriately
✅ Schema markup on major pages (LocalBusiness, Organization, FAQPage, etc.)
✅ Breadcrumbs on all content pages
✅ Hreflang tags for international pages

---

## Files Modified

- `components/footer.tsx` - Added comprehensive footer navigation
- `lib/public-routes.ts` - Central route configuration
- `app/sitemap.ts` - Dynamic sitemap generation
- `app/robots.ts` - Updated with detailed documentation
- `app/sitemap-index/page.tsx` - New human-readable sitemap index

---

## Monitoring Crawl Coverage

To verify Google discovers all pages:

1. Submit `/sitemap.xml` to Google Search Console
2. Monitor coverage report (should show 25+ pages)
3. Check Search Console Index Coverage section
4. Verify specific pages are indexed:
   - Market pages (e.g., `/us`, `/uk`)
   - Service pages (e.g., `/services/3d-rendering-beauty`)
   - Location pages (e.g., `/locations/mumbai-video-production`)
