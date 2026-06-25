export type PublicRoute = {
  path: string
  priority?: number
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  lastModified?: Date
}

export const getAllPublicRoutes = async (): Promise<PublicRoute[]> => {
  return [
    { path: "/", priority: 1, changeFrequency: "daily" },
    { path: "/blog", priority: 0.9, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/performance-creative-management", priority: 0.8, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact-form", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact-success", priority: 0.5, changeFrequency: "monthly" },
    { path: "/sitemap-index", priority: 0.5, changeFrequency: "monthly" },
    { path: "/privacy-policy", priority: 0.5, changeFrequency: "monthly" },
    { path: "/terms-of-service", priority: 0.5, changeFrequency: "monthly" },
  ]
}