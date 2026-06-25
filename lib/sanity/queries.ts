import { groq } from "next-sanity"

/* =========================
   BLOG LISTING PAGE
   Used by: app/blog/page.tsx
   ========================= */

export const BLOG_POSTS_QUERY = groq`
  *[_type == "blogPost" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    title,
    slug,
    excerpt,
    "publishedAt": coalesce(publishedAt, _createdAt),
    "author": coalesce(author, "Skitbit Team"),
    categories,
    readTime,
    image
  }
`

/* =========================
   BLOG DETAIL PAGE
   Used by: app/blog/[slug]/page.tsx
   ========================= */

export const BLOG_POST_QUERY = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    "publishedAt": coalesce(publishedAt, _createdAt),
    "author": coalesce(author, "Skitbit Team"),
    authorRole,
    authorBio,
    authorImage,
    categories,
    readTime,
    image,
    imageCaption,
    imageCredit,
    heroMediaType,
    youtubeUrl,
    overviewItems,
    newsletterTitle,
    newsletterDescription,
    newsletterPlaceholder,
    newsletterButtonLabel,
    seoTitle,
    seoDescription,
    "body": coalesce(body, content)
  }
`

export const BLOG_SLUGS_QUERY = groq`
  *[_type == "blogPost" && defined(slug.current)][].slug.current
`

export const RELATED_BLOG_POSTS_QUERY = groq`
  *[
    _type == "blogPost" &&
    defined(slug.current) &&
    slug.current != $slug
  ] | order(coalesce(publishedAt, _createdAt) desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    "publishedAt": coalesce(publishedAt, _createdAt),
    "author": coalesce(author, "Skitbit Team"),
    categories,
    readTime,
    image
  }
`

/* =========================
   BACKWARD-COMPATIBLE BLOG NAMES
   Keeps old imports from breaking if any file still uses them.
   ========================= */

export const BLOG_POST_BY_SLUG_QUERY = BLOG_POST_QUERY

export const BLOG_POST_SLUGS_QUERY = groq`
  *[_type == "blogPost" && defined(slug.current)] {
    "slug": slug.current
  }
`

/* =========================
   LOCATIONS
   Do not touch existing location route.
   ========================= */

export const LOCATION_BY_SLUG_QUERY = groq`
  *[_type == "location" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    address,
    content
  }
`

export const LOCATIONS_QUERY = groq`
  *[_type == "location"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    address
  }
`
export const SERVICE_PAGE_BY_SLUG_QUERY = `
  *[_type == "servicePage" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    eyebrow,
    heroTitle,
    heroDescription,
    heroImage,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
    body,
    serviceHighlights,
    faqs,
    seoTitle,
    seoDescription,
    _updatedAt
  }
`

export const SERVICE_PAGE_SLUGS_QUERY = `
  *[_type == "servicePage" && defined(slug.current)][].slug.current
`