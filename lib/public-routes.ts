import { countryPages } from '@/data/country-pages'
// ✅ Changed from 'services' to 'servicesData'
import { servicesData } from '@/data/services-data' 
import { locations } from '@/data/locations'

export type RouteConfig = {
  path: string;
  priority: number;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  lastModified?: Date;
}

// 1. Core Static Pages
export const STATIC_ROUTES: RouteConfig[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly', lastModified: new Date() },
  { path: '/work', priority: 0.9, changeFrequency: 'weekly', lastModified: new Date() },
  { path: '/services', priority: 0.9, changeFrequency: 'weekly', lastModified: new Date() },
  { path: '/pricing', priority: 0.8, changeFrequency: 'weekly', lastModified: new Date() },
  { path: '/contact', priority: 0.8, changeFrequency: 'weekly', lastModified: new Date() },
  { path: '/locations', priority: 0.8, changeFrequency: 'monthly', lastModified: new Date() },
  { path: '/llms.txt', priority: 1.0, changeFrequency: 'monthly', lastModified: new Date() },
]

// 2. Routes strictly blocked from the sitemap
export const EXCLUDED_ROUTES = ['/admin', '/private', '/api', '/test', '/staging', '/internal']

// 3. The compiler function
export async function getAllPublicRoutes(): Promise<RouteConfig[]> {
  const routes: RouteConfig[] = [...STATIC_ROUTES]

  // Map Country Pages
  if (countryPages) {
    Object.keys(countryPages).forEach(countryCode => {
      routes.push({
        path: `/${countryCode.toLowerCase()}`,
        priority: 0.9,
        changeFrequency: 'weekly',
        lastModified: new Date(),
      })
    })
  }

  // Map Service Pages
  // ✅ Updated to use servicesData
  if (servicesData) {
    servicesData.forEach((service: any) => {
      if (service.slug) {
        routes.push({
          path: `/services/${service.slug}`,
          priority: 0.85,
          changeFrequency: 'monthly',
          lastModified: new Date(),
        })
      }
    })
  }

  // Map Location Pages
  if (locations) {
    locations.forEach((location: any) => {
      if (location.slug) {
        routes.push({
          path: `/locations/${location.slug}`,
          priority: 0.8,
          changeFrequency: 'monthly',
          lastModified: new Date(),
        })
      }
    })
  }

  return routes
}