import Link from "next/link"
import { Metadata } from "next"
import { groq } from "next-sanity"

import { getAllPublicRoutes } from "@/lib/public-routes"
import { client } from "@/lib/sanity/client"

export const metadata: Metadata = {
  title: "Sitemap Index | Skitbit",
  description:
    "Complete sitemap of all Skitbit pages including services, locations, blog posts, and market-specific landing pages.",
  robots: {
    index: true,
    follow: true,
  },
}

type PublicRoute = {
  path: string
  priority?: number
  changeFrequency?: string
  lastModified?: Date
}

type BlogPost = {
  title: string
  slug: string
  publishedAt?: string
}

type SanityLocation = {
  title?: string
  slug: string
}

const BLOG_POSTS_QUERY = groq`
  *[_type == "blogPost" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) {
    title,
    "slug": slug.current,
    "publishedAt": coalesce(publishedAt, _createdAt)
  }
`

const SANITY_LOCATIONS_QUERY = groq`
  *[_type == "location" && defined(slug.current)] | order(coalesce(pageTitle, name, title, slug.current) asc) {
    "title": coalesce(pageTitle, name, title, slug.current),
    "slug": slug.current
  }
`

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await client.fetch<BlogPost[]>(
      BLOG_POSTS_QUERY,
      {},
      {
        cache: "no-store",
      }
    )

    return Array.isArray(posts) ? posts : []
  } catch (error) {
    console.error("Failed to fetch blog posts for sitemap index:", error)
    return []
  }
}

async function getSanityLocations(): Promise<SanityLocation[]> {
  try {
    const locations = await client.fetch<SanityLocation[]>(
      SANITY_LOCATIONS_QUERY,
      {},
      {
        cache: "no-store",
      }
    )

    return Array.isArray(locations) ? locations : []
  } catch (error) {
    console.error("Failed to fetch Sanity locations for sitemap index:", error)
    return []
  }
}

function dedupeRoutes(routes: PublicRoute[]) {
  return Array.from(new Map(routes.map((route) => [route.path, route])).values())
}

function formatTitleFromPath(path: string) {
  if (!path || path === "/") return "Home"

  return path
    .split("/")
    .filter(Boolean)
    .pop()
    ?.replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function formatDate(date?: string) {
  if (!date) return "Recently"

  try {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date))
  } catch {
    return "Recently"
  }
}

function RouteCard({
  href,
  title,
  subtitle,
}: {
  href: string
  title: string
  subtitle?: string
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-border bg-card p-4 transition hover:bg-muted"
    >
      <div className="truncate text-sm font-semibold text-foreground">
        {title}
      </div>

      {subtitle && (
        <div className="mt-1 truncate text-xs text-muted-foreground">
          {subtitle}
        </div>
      )}
    </Link>
  )
}

export default async function SitemapIndex() {
  const routes = dedupeRoutes(await getAllPublicRoutes())
  const blogPosts = await getBlogPosts()
  const sanityLocations = await getSanityLocations()

  const groupedRoutes = {
    static: routes.filter(
      (route) =>
        !route.path.includes("/services") &&
        !route.path.includes("/locations") &&
        !/^\/[a-z]{2}$/.test(route.path)
    ),
    countries: routes.filter((route) => /^\/[a-z]{2}$/.test(route.path)),
    services: routes.filter((route) => route.path.startsWith("/services/")),
    locations: routes.filter((route) => route.path.startsWith("/locations/")),
  }

  const allLocationSlugs = Array.from(
    new Map(
      [
        ...groupedRoutes.locations.map((route) => ({
          title: formatTitleFromPath(route.path) || route.path,
          slug: route.path.replace("/locations/", ""),
        })),
        ...sanityLocations,
      ].map((location) => [location.slug, location])
    ).values()
  )

  const totalPages =
    groupedRoutes.static.length +
    groupedRoutes.countries.length +
    groupedRoutes.services.length +
    allLocationSlugs.length +
    blogPosts.length

  return (
    <main className="min-h-screen bg-background py-20 text-foreground">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-[-0.05em]">
            Sitemap Index
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            Complete index of public Skitbit pages, including services,
            locations, blog posts, and market-specific landing pages.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link
              href="/sitemap.xml"
              className="rounded-full bg-foreground px-4 py-2 font-semibold text-background"
            >
              Open XML Sitemap
            </Link>

            <Link
              href="/blog"
              className="rounded-full border border-border bg-card px-4 py-2 font-semibold text-foreground"
            >
              Open Blog
            </Link>
          </div>
        </div>

        {groupedRoutes.static.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-6 text-2xl font-bold tracking-[-0.04em]">
              Static Pages ({groupedRoutes.static.length})
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {groupedRoutes.static.map((route) => (
                <RouteCard
                  key={route.path}
                  href={route.path}
                  title={formatTitleFromPath(route.path) || route.path}
                  subtitle={`Priority: ${route.priority ?? 0.7}`}
                />
              ))}
            </div>
          </section>
        )}

        {blogPosts.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-6 text-2xl font-bold tracking-[-0.04em]">
              Blog Posts ({blogPosts.length})
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {blogPosts.map((post) => (
                <RouteCard
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  title={post.title}
                  subtitle={`Published: ${formatDate(post.publishedAt)}`}
                />
              ))}
            </div>
          </section>
        )}

        {groupedRoutes.countries.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-6 text-2xl font-bold tracking-[-0.04em]">
              Market Pages ({groupedRoutes.countries.length})
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {groupedRoutes.countries.map((route) => (
                <RouteCard
                  key={route.path}
                  href={route.path}
                  title={route.path.replace("/", "").toUpperCase()}
                  subtitle="Regional page"
                />
              ))}
            </div>
          </section>
        )}

        {groupedRoutes.services.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-6 text-2xl font-bold tracking-[-0.04em]">
              Service Pages ({groupedRoutes.services.length})
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {groupedRoutes.services.map((route) => (
                <RouteCard
                  key={route.path}
                  href={route.path}
                  title={formatTitleFromPath(route.path) || route.path}
                  subtitle={route.path}
                />
              ))}
            </div>
          </section>
        )}

        {allLocationSlugs.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-6 text-2xl font-bold tracking-[-0.04em]">
              Location Pages ({allLocationSlugs.length})
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {allLocationSlugs.map((location) => (
                <RouteCard
                  key={location.slug}
                  href={`/locations/${location.slug}`}
                  title={location.title || location.slug}
                  subtitle={`/locations/${location.slug}`}
                />
              ))}
            </div>
          </section>
        )}

        <section className="rounded-2xl border border-border bg-card p-6">
          <h3 className="mb-4 text-xl font-bold tracking-[-0.04em]">
            Summary
          </h3>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              Total Pages:{" "}
              <span className="font-semibold text-foreground">
                {totalPages}
              </span>
            </li>

            <li>
              Static Pages:{" "}
              <span className="font-semibold text-foreground">
                {groupedRoutes.static.length}
              </span>
            </li>

            <li>
              Blog Posts:{" "}
              <span className="font-semibold text-foreground">
                {blogPosts.length}
              </span>
            </li>

            <li>
              Market Landing Pages:{" "}
              <span className="font-semibold text-foreground">
                {groupedRoutes.countries.length}
              </span>
            </li>

            <li>
              Service Pages:{" "}
              <span className="font-semibold text-foreground">
                {groupedRoutes.services.length}
              </span>
            </li>

            <li>
              Location Pages:{" "}
              <span className="font-semibold text-foreground">
                {allLocationSlugs.length}
              </span>
            </li>
          </ul>
        </section>
      </div>
    </main>
  )
}