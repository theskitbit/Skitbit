# Sitemap Architecture Documentation

## Overview

The Skitbit website now has a **centralized, automated sitemap system** that dynamically includes all public pages. When you add new pages to data files or static routes, the sitemap automatically updates at build time.

## Files Changed

### 1. **Created: `/lib/public-routes.ts`** (133 lines)
Central configuration file that serves as the single source of truth for all public routes.

**Key Features:**
- `STATIC_ROUTES`: Manual entries for core pages (homepage, /work, /services, /pricing, /contact, /locations, /llms.txt)
- `getAllPublicRoutes()`: Async function that combines:
  - Static pages from `STATIC_ROUTES`
  - Country pages from `data/country-pages.ts` (auto-generates /us, /uk, /ca, /au, /ae, /de, /fr, /nl, /se, /ch)
  - Service pages from `data/services-data.ts` (auto-generates /services/[slug] for all services)
  - Location pages from `data/locations.ts` (auto-generates /locations/[slug] for all locations)
- `EXCLUDED_ROUTES`: Routes that are NOT included in the sitemap (admin, API, test, staging)

**Usage:**
```typescript
import { getAllPublicRoutes } from '@/lib/public-routes'
const routes = await getAllPublicRoutes()
```

### 2. **Updated: `/app/sitemap.ts`** (30 lines, down from 80)
Simplified dynamic sitemap generation.

**Before:** Manually hardcoded service slugs, geo pages, and route logic
**After:** Imports routes from central config and generates sitemap dynamically

**New Implementation:**
- Imports `getAllPublicRoutes()` from `lib/public-routes.ts`
- Maps all routes to sitemap entries with proper metadata
- Uses `https://www.theskitbit.com` as canonical domain (with www)
- Applies correct priorities and change frequencies

### 3. **Updated: `/app/robots.ts`** (48 lines, with documentation)
Added comprehensive comments explaining sitemap integration.

**Points to:** `https://www.theskitbit.com/sitemap.xml` (already correct)

## How It Works

### Static Pages (Manually Added)
Add new static pages to `lib/public-routes.ts` in the `STATIC_ROUTES` array:

```typescript
export const STATIC_ROUTES: RouteConfig[] = [
  {
    path: '/my-new-page',
    priority: 0.8,
    changeFrequency: 'weekly',
    lastModified: new Date(),
  },
]
```

### Auto-Generated Pages

#### Country Pages (10 countries)
From `data/country-pages.ts`:
- Routes: `/us`, `/uk`, `/ca`, `/au`, `/ae`, `/de`, `/fr`, `/nl`, `/se`, `/ch`
- Priority: 0.9
- Change Frequency: weekly
- **No manual entry needed** — automatically picked up

#### Service Pages (11+ services)
From `data/services-data.ts`:
- Example routes: `/services/3d-rendering-beauty`, `/services/luxury-watches`, etc.
- Priority: 0.85
- Change Frequency: monthly
- **No manual entry needed** — automatically picked up

#### Location Pages (5 locations)
From `data/locations.ts`:
- Example routes: `/locations/mumbai-video-production`, `/locations/london-video-production`, etc.
- Priority: 0.8
- Change Frequency: monthly
- **No manual entry needed** — automatically picked up

## Pages Included in Sitemap

### Static Pages
- `/` — Homepage (priority: 1.0)
- `/work` — Work/Portfolio (priority: 0.9)
- `/services` — Services Index (priority: 0.9)
- `/pricing` — Pricing Page (priority: 0.8)
- `/contact` — Contact Page (priority: 0.8)
- `/locations` — Locations Index (priority: 0.8)
- `/llms.txt` — AI Control File (priority: 1.0)

### Country Pages (10 total)
- `/us`, `/uk`, `/ca`, `/au`, `/ae`, `/de`, `/fr`, `/nl`, `/se`, `/ch` (priority: 0.9 each)

### Service Pages (11 total)
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

### Location Pages (5 total)
- `/locations/mumbai-video-production`
- `/locations/bangalore-digital-marketing`
- `/locations/london-video-production`
- `/locations/mumbai-3d-animation`
- `/locations/toronto-animation-studios`

**Total: 38+ pages in sitemap**

## Pages Excluded from Sitemap

✗ `/admin` and `/admin/*` — Admin routes
✗ `/private` and `/private/*` — Private routes
✗ `/api/*` — API routes
✗ `/test/*` — Test routes
✗ `/staging/*` — Staging routes
✗ `/internal/*` — Internal routes
✗ Pages with `noindex` metadata

## SEO Metadata by Page Type

| Page Type | Priority | Change Frequency |
|-----------|----------|------------------|
| Homepage | 1.0 | weekly |
| AI Control File | 1.0 | monthly |
| Country Pages | 0.9 | weekly |
| Work/Services Index | 0.9 | weekly |
| Service Detail Pages | 0.85 | monthly |
| Pricing/Contact | 0.8 | weekly |
| Locations Index/Detail | 0.8 | monthly |

## Canonical Domain

All sitemap URLs use the **www subdomain**:
```
https://www.theskitbit.com/[path]
```

NOT:
```
https://theskitbit.com/[path]
```

## How to Add New Pages

### Option 1: Static Page (Manual)
For pages that don't come from data files:

1. Create your page route (e.g., `/app/about/page.tsx`)
2. Add to `lib/public-routes.ts` `STATIC_ROUTES`:
```typescript
{
  path: '/about',
  priority: 0.9,
  changeFrequency: 'monthly',
  lastModified: new Date(),
}
```
3. Rebuild and deploy — sitemap auto-updates

### Option 2: Country Page
1. Add country code to `data/country-pages.ts` countryPages object
2. Create dynamic route at `/app/[country]/page.tsx` (already exists)
3. Rebuild and deploy — sitemap auto-includes at `/[countryCode]`

### Option 3: Service Page
1. Add service slug and data to `data/services-data.ts`
2. Create dynamic route at `/app/services/[slug]/page.tsx` (already exists)
3. Rebuild and deploy — sitemap auto-includes at `/services/[slug]`

### Option 4: Location Page
1. Add location slug and data to `data/locations.ts`
2. Create dynamic route at `/app/locations/[slug]/page.tsx` (already exists)
3. Rebuild and deploy — sitemap auto-includes at `/locations/[slug]`

## Build Verification

✓ Sitemap builds successfully at `/sitemap.xml`
✓ All 10 country pages generated and included
✓ All 11 service pages generated and included
✓ All 5 location pages generated and included
✓ All static pages included
✓ No duplicate entries
✓ Canonical domain (www) used throughout
✓ Robots.txt points to correct sitemap URL

## Testing

To verify the sitemap:

1. Build the project:
   ```bash
   pnpm build
   ```

2. Start dev server:
   ```bash
   pnpm dev
   ```

3. Visit sitemap:
   ```
   http://localhost:3000/sitemap.xml
   ```

4. Check in production:
   ```
   https://www.theskitbit.com/sitemap.xml
   ```

## Technical Details

- **Framework:** Next.js 16 App Router
- **Route Type:** Dynamic (`/app/sitemap.ts`)
- **Return Type:** `MetadataRoute.Sitemap`
- **Async:** Yes (uses async `getAllPublicRoutes()`)
- **Update Frequency:** At build/deploy time
- **Dependencies:**
  - `data/country-pages.ts` — country routing
  - `data/services-data.ts` — service routing
  - `data/locations.ts` — location routing

## Summary

| Metric | Value |
|--------|-------|
| Files Created | 1 (`lib/public-routes.ts`) |
| Files Updated | 2 (`app/sitemap.ts`, `app/robots.ts`) |
| Lines of Code (Public Routes) | 133 |
| Sitemap Entries | 38+ |
| Build Status | ✓ Success |
| Time to Update Sitemap | At deploy time |

The sitemap system is now **fully automated, centralized, and scalable**.
